-- DeepMindResources Migration 004
-- Tool intelligence foundation.
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
-- AI tools
-- --------------------------------------------------------------------

create table if not exists public.ai_tools (
  id uuid primary key default gen_random_uuid(),

  slug text not null unique,
  name text not null,
  provider text,
  website_url text,

  tool_type text not null,
  status text not null default 'active',

  short_description text,
  current_capability_version_id uuid,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint ai_tools_tool_type_check
    check (
      tool_type in (
        'chat_assistant',
        'coding_assistant',
        'research_tool',
        'automation_tool',
        'agent_framework',
        'model_provider',
        'rag_tool',
        'business_productivity_tool',
        'other'
      )
    ),

  constraint ai_tools_status_check
    check (
      status in (
        'active',
        'deprecated',
        'retired',
        'watchlist',
        'archived'
      )
    )
);

drop trigger if exists set_ai_tools_updated_at on public.ai_tools;

create trigger set_ai_tools_updated_at
before update on public.ai_tools
for each row
execute function public.deepmind_set_updated_at();

alter table public.ai_tools enable row level security;

drop policy if exists "Active AI tools are publicly readable" on public.ai_tools;

create policy "Active AI tools are publicly readable"
on public.ai_tools
for select
to public
using (status = 'active');

-- --------------------------------------------------------------------
-- AI tool capability versions
-- --------------------------------------------------------------------

create table if not exists public.ai_tool_capability_versions (
  id uuid primary key default gen_random_uuid(),

  tool_id uuid not null references public.ai_tools(id) on delete cascade,
  version_number integer not null,

  capability_summary text,
  strengths jsonb,
  limitations jsonb,
  supported_use_cases jsonb,
  pricing_notes text,

  source_update_id uuid references public.ai_updates(id) on delete set null,
  primary_source_id uuid references public.sources(id) on delete set null,

  validation_status text not null default 'unreviewed',
  publication_status text not null default 'draft',

  published_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint ai_tool_capability_versions_version_number_positive
    check (version_number > 0),

  constraint ai_tool_capability_versions_validation_status_check
    check (
      validation_status in (
        'unreviewed',
        'needs_sources',
        'in_review',
        'validated',
        'rejected'
      )
    ),

  constraint ai_tool_capability_versions_publication_status_check
    check (
      publication_status in (
        'draft',
        'scheduled',
        'published',
        'superseded',
        'archived'
      )
    ),

  constraint ai_tool_capability_versions_tool_version_unique
    unique (tool_id, version_number)
);

alter table public.ai_tools
drop constraint if exists ai_tools_current_capability_version_id_fkey;

alter table public.ai_tools
add constraint ai_tools_current_capability_version_id_fkey
foreign key (current_capability_version_id)
references public.ai_tool_capability_versions(id)
on delete set null;

drop trigger if exists set_ai_tool_capability_versions_updated_at on public.ai_tool_capability_versions;

create trigger set_ai_tool_capability_versions_updated_at
before update on public.ai_tool_capability_versions
for each row
execute function public.deepmind_set_updated_at();

alter table public.ai_tool_capability_versions enable row level security;

drop policy if exists "Published AI tool capability versions are publicly readable" on public.ai_tool_capability_versions;

create policy "Published AI tool capability versions are publicly readable"
on public.ai_tool_capability_versions
for select
to public
using (
  publication_status = 'published'
  and validation_status = 'validated'
  and exists (
    select 1
    from public.ai_tools t
    where t.id = ai_tool_capability_versions.tool_id
      and t.status = 'active'
  )
);

-- --------------------------------------------------------------------
-- Use cases
-- --------------------------------------------------------------------

create table if not exists public.use_cases (
  id uuid primary key default gen_random_uuid(),

  slug text not null unique,
  title text not null,
  description text,
  audience text,

  status text not null default 'draft',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint use_cases_status_check
    check (
      status in (
        'draft',
        'published',
        'archived'
      )
    )
);

drop trigger if exists set_use_cases_updated_at on public.use_cases;

create trigger set_use_cases_updated_at
before update on public.use_cases
for each row
execute function public.deepmind_set_updated_at();

alter table public.use_cases enable row level security;

drop policy if exists "Published use cases are publicly readable" on public.use_cases;

create policy "Published use cases are publicly readable"
on public.use_cases
for select
to public
using (status = 'published');

-- --------------------------------------------------------------------
-- Tool comparisons
-- --------------------------------------------------------------------

create table if not exists public.tool_comparisons (
  id uuid primary key default gen_random_uuid(),

  slug text not null unique,
  use_case_id uuid not null references public.use_cases(id) on delete cascade,

  title text not null,
  summary text,

  status text not null default 'draft',
  current_version_id uuid,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint tool_comparisons_status_check
    check (
      status in (
        'draft',
        'published',
        'needs_update',
        'retired',
        'archived'
      )
    )
);

drop trigger if exists set_tool_comparisons_updated_at on public.tool_comparisons;

create trigger set_tool_comparisons_updated_at
before update on public.tool_comparisons
for each row
execute function public.deepmind_set_updated_at();

alter table public.tool_comparisons enable row level security;

drop policy if exists "Published tool comparisons are publicly readable" on public.tool_comparisons;

create policy "Published tool comparisons are publicly readable"
on public.tool_comparisons
for select
to public
using (
  status = 'published'
  and exists (
    select 1
    from public.use_cases uc
    where uc.id = tool_comparisons.use_case_id
      and uc.status = 'published'
  )
);

-- --------------------------------------------------------------------
-- Tool comparison versions
-- --------------------------------------------------------------------

create table if not exists public.tool_comparison_versions (
  id uuid primary key default gen_random_uuid(),

  tool_comparison_id uuid not null references public.tool_comparisons(id) on delete cascade,
  version_number integer not null,

  comparison_markdown text,
  ranking_json jsonb,
  decision_matrix jsonb,
  best_for jsonb,
  not_recommended_for jsonb,

  confidence_score numeric,

  source_update_id uuid references public.ai_updates(id) on delete set null,
  primary_source_id uuid references public.sources(id) on delete set null,

  validation_status text not null default 'unreviewed',
  publication_status text not null default 'draft',

  published_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint tool_comparison_versions_version_number_positive
    check (version_number > 0),

  constraint tool_comparison_versions_confidence_score_check
    check (
      confidence_score is null
      or (confidence_score >= 0 and confidence_score <= 1)
    ),

  constraint tool_comparison_versions_validation_status_check
    check (
      validation_status in (
        'unreviewed',
        'needs_sources',
        'in_review',
        'validated',
        'rejected'
      )
    ),

  constraint tool_comparison_versions_publication_status_check
    check (
      publication_status in (
        'draft',
        'scheduled',
        'published',
        'superseded',
        'archived'
      )
    ),

  constraint tool_comparison_versions_comparison_version_unique
    unique (tool_comparison_id, version_number)
);

alter table public.tool_comparisons
drop constraint if exists tool_comparisons_current_version_id_fkey;

alter table public.tool_comparisons
add constraint tool_comparisons_current_version_id_fkey
foreign key (current_version_id)
references public.tool_comparison_versions(id)
on delete set null;

drop trigger if exists set_tool_comparison_versions_updated_at on public.tool_comparison_versions;

create trigger set_tool_comparison_versions_updated_at
before update on public.tool_comparison_versions
for each row
execute function public.deepmind_set_updated_at();

alter table public.tool_comparison_versions enable row level security;

drop policy if exists "Published tool comparison versions are publicly readable" on public.tool_comparison_versions;

create policy "Published tool comparison versions are publicly readable"
on public.tool_comparison_versions
for select
to public
using (
  publication_status = 'published'
  and validation_status = 'validated'
  and exists (
    select 1
    from public.tool_comparisons tc
    join public.use_cases uc on uc.id = tc.use_case_id
    where tc.id = tool_comparison_versions.tool_comparison_id
      and tc.status = 'published'
      and uc.status = 'published'
  )
);

-- --------------------------------------------------------------------
-- Indexes
-- --------------------------------------------------------------------

create index if not exists ai_tools_status_type_idx
on public.ai_tools (status, tool_type);

create index if not exists ai_tools_provider_idx
on public.ai_tools (provider);

create index if not exists ai_tool_capability_versions_tool_version_idx
on public.ai_tool_capability_versions (tool_id, version_number);

create index if not exists ai_tool_capability_versions_publication_validation_idx
on public.ai_tool_capability_versions (publication_status, validation_status);

create index if not exists ai_tool_capability_versions_source_update_idx
on public.ai_tool_capability_versions (source_update_id);

create index if not exists use_cases_status_idx
on public.use_cases (status);

create index if not exists tool_comparisons_use_case_status_idx
on public.tool_comparisons (use_case_id, status);

create index if not exists tool_comparison_versions_comparison_version_idx
on public.tool_comparison_versions (tool_comparison_id, version_number);

create index if not exists tool_comparison_versions_publication_validation_idx
on public.tool_comparison_versions (publication_status, validation_status);

create index if not exists tool_comparison_versions_source_update_idx
on public.tool_comparison_versions (source_update_id);

commit;
