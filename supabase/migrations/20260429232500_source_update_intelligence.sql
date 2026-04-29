-- DeepMindResources Migration 003
-- Source and AI update intelligence foundation.
-- This does not modify existing dashboard/MVP tables.

begin;

create extension if not exists pgcrypto;

-- Shared updated_at trigger function for new DeepMindResources tables.
create or replace function public.deepmind_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- --------------------------------------------------------------------
-- Sources
-- --------------------------------------------------------------------

create table if not exists public.sources (
  id uuid primary key default gen_random_uuid(),

  source_type text not null,
  title text not null,
  url text,
  publisher text,
  author text,

  published_at timestamptz,
  retrieved_at timestamptz not null default now(),

  trust_level text not null default 'mixed',
  summary text,
  raw_excerpt text,
  content_hash text,

  is_public boolean not null default false,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint sources_source_type_check
    check (
      source_type in (
        'official_docs',
        'release_notes',
        'api_docs',
        'github_repo',
        'research_paper',
        'trusted_article',
        'vendor_marketing',
        'social_post',
        'internal_test',
        'other'
      )
    ),

  constraint sources_trust_level_check
    check (
      trust_level in (
        'official',
        'trusted',
        'mixed',
        'weak',
        'untrusted'
      )
    )
);

drop trigger if exists set_sources_updated_at on public.sources;

create trigger set_sources_updated_at
before update on public.sources
for each row
execute function public.deepmind_set_updated_at();

alter table public.sources enable row level security;

drop policy if exists "Public sources are publicly readable" on public.sources;

create policy "Public sources are publicly readable"
on public.sources
for select
to public
using (is_public = true);

-- --------------------------------------------------------------------
-- AI updates
-- --------------------------------------------------------------------

create table if not exists public.ai_updates (
  id uuid primary key default gen_random_uuid(),

  slug text not null unique,
  title text not null,
  summary text,

  update_type text not null,
  provider text,

  primary_source_id uuid references public.sources(id) on delete set null,

  published_external_at timestamptz,
  detected_at timestamptz not null default now(),

  impact_level text not null default 'medium',
  audience text,
  status text not null default 'detected',

  verified_meaning text,
  why_it_matters text,
  who_should_care text,
  recommended_action text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint ai_updates_update_type_check
    check (
      update_type in (
        'model_release',
        'platform_update',
        'api_change',
        'tool_release',
        'tool_deprecation',
        'pricing_change',
        'agent_framework_update',
        'coding_assistant_update',
        'business_automation_update',
        'policy_update',
        'other'
      )
    ),

  constraint ai_updates_impact_level_check
    check (
      impact_level in (
        'low',
        'medium',
        'high',
        'critical'
      )
    ),

  constraint ai_updates_status_check
    check (
      status in (
        'detected',
        'researching',
        'needs_validation',
        'validated',
        'published',
        'ignored',
        'archived'
      )
    )
);

drop trigger if exists set_ai_updates_updated_at on public.ai_updates;

create trigger set_ai_updates_updated_at
before update on public.ai_updates
for each row
execute function public.deepmind_set_updated_at();

alter table public.ai_updates enable row level security;

drop policy if exists "Published AI updates are publicly readable" on public.ai_updates;

create policy "Published AI updates are publicly readable"
on public.ai_updates
for select
to public
using (status = 'published');

-- --------------------------------------------------------------------
-- AI update impacts
-- --------------------------------------------------------------------

create table if not exists public.ai_update_impacts (
  id uuid primary key default gen_random_uuid(),

  ai_update_id uuid not null references public.ai_updates(id) on delete cascade,

  impact_target_type text not null,
  impact_target_id uuid,

  impact_summary text,
  recommended_change text,

  requires_lesson_update boolean not null default false,
  requires_new_lesson boolean not null default false,
  requires_sandbox_task boolean not null default false,
  requires_business_retraining boolean not null default false,

  created_at timestamptz not null default now(),

  constraint ai_update_impacts_target_type_check
    check (
      impact_target_type in (
        'learning_path',
        'module',
        'lesson',
        'lesson_version',
        'sandbox_task',
        'sandbox_task_version',
        'tool',
        'skill',
        'business_training',
        'general'
      )
    )
);

alter table public.ai_update_impacts enable row level security;

drop policy if exists "Published AI update impacts are publicly readable" on public.ai_update_impacts;

create policy "Published AI update impacts are publicly readable"
on public.ai_update_impacts
for select
to public
using (
  exists (
    select 1
    from public.ai_updates au
    where au.id = ai_update_impacts.ai_update_id
      and au.status = 'published'
  )
);

-- --------------------------------------------------------------------
-- Lesson version sources
-- --------------------------------------------------------------------

create table if not exists public.lesson_version_sources (
  id uuid primary key default gen_random_uuid(),

  lesson_version_id uuid not null references public.lesson_versions(id) on delete cascade,
  source_id uuid not null references public.sources(id) on delete cascade,

  source_role text not null default 'supporting',

  created_at timestamptz not null default now(),

  constraint lesson_version_sources_source_role_check
    check (
      source_role in (
        'primary',
        'supporting',
        'contradictory',
        'background'
      )
    ),

  constraint lesson_version_sources_unique
    unique (lesson_version_id, source_id, source_role)
);

alter table public.lesson_version_sources enable row level security;

drop policy if exists "Published lesson version sources are publicly readable" on public.lesson_version_sources;

create policy "Published lesson version sources are publicly readable"
on public.lesson_version_sources
for select
to public
using (
  exists (
    select 1
    from public.lesson_versions lv
    join public.lessons l on l.id = lv.lesson_id
    join public.modules m on m.id = l.module_id
    join public.learning_paths lp on lp.id = m.learning_path_id
    where lv.id = lesson_version_sources.lesson_version_id
      and lv.publication_status = 'published'
      and lv.validation_status = 'validated'
      and l.status = 'published'
      and m.status = 'published'
      and lp.status = 'published'
  )
  and exists (
    select 1
    from public.sources s
    where s.id = lesson_version_sources.source_id
      and s.is_public = true
  )
);

-- --------------------------------------------------------------------
-- Validation reviews
-- --------------------------------------------------------------------

create table if not exists public.validation_reviews (
  id uuid primary key default gen_random_uuid(),

  review_target_type text not null,
  review_target_id uuid not null,

  review_status text not null default 'pending',
  confidence_score numeric,

  review_summary text,
  issues_found jsonb,

  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint validation_reviews_target_type_check
    check (
      review_target_type in (
        'ai_update',
        'lesson_version',
        'sandbox_task_version',
        'tool_capability_version',
        'tool_comparison_version',
        'master_brain_record',
        'agent_finding',
        'source'
      )
    ),

  constraint validation_reviews_status_check
    check (
      review_status in (
        'pending',
        'validated',
        'rejected',
        'needs_more_sources',
        'conflicting_sources'
      )
    ),

  constraint validation_reviews_confidence_score_check
    check (
      confidence_score is null
      or (confidence_score >= 0 and confidence_score <= 1)
    )
);

drop trigger if exists set_validation_reviews_updated_at on public.validation_reviews;

create trigger set_validation_reviews_updated_at
before update on public.validation_reviews
for each row
execute function public.deepmind_set_updated_at();

alter table public.validation_reviews enable row level security;

-- No public policies for validation_reviews yet.
-- Internal/editor/validator/admin policies will be added after role design is implemented.

-- --------------------------------------------------------------------
-- Indexes
-- --------------------------------------------------------------------

create index if not exists sources_source_type_trust_level_idx
on public.sources (source_type, trust_level);

create index if not exists sources_url_idx
on public.sources (url);

create index if not exists sources_is_public_idx
on public.sources (is_public);

create index if not exists ai_updates_status_impact_level_idx
on public.ai_updates (status, impact_level);

create index if not exists ai_updates_provider_update_type_idx
on public.ai_updates (provider, update_type);

create index if not exists ai_updates_detected_at_idx
on public.ai_updates (detected_at desc);

create index if not exists ai_update_impacts_update_id_idx
on public.ai_update_impacts (ai_update_id);

create index if not exists ai_update_impacts_target_idx
on public.ai_update_impacts (impact_target_type, impact_target_id);

create index if not exists ai_update_impacts_retraining_idx
on public.ai_update_impacts (requires_business_retraining)
where requires_business_retraining = true;

create index if not exists lesson_version_sources_lesson_version_idx
on public.lesson_version_sources (lesson_version_id);

create index if not exists lesson_version_sources_source_idx
on public.lesson_version_sources (source_id);

create index if not exists validation_reviews_target_idx
on public.validation_reviews (review_target_type, review_target_id);

create index if not exists validation_reviews_status_idx
on public.validation_reviews (review_status);

create index if not exists validation_reviews_reviewed_by_idx
on public.validation_reviews (reviewed_by);

commit;
