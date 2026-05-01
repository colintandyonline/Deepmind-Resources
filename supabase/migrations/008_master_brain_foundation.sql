-- 008_master_brain_foundation.sql
-- DeepMind Resources Master Brain foundation.
-- Creates the private command-centre data layer for verified AI intelligence,
-- source records, validation reviews, agent runs, agent findings, and publication queues.
--
-- This migration creates structure only.
-- It does not insert fake records, demo data, or public-facing content.

create extension if not exists pgcrypto;

create or replace function public.is_master_brain_admin()
returns boolean
language sql
stable
security invoker
set search_path = public
as $$
  select coalesce((auth.jwt() ->> 'email') = 'colintandy@gmail.com', false);
$$;

grant execute on function public.is_master_brain_admin() to authenticated;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.sources (
  id uuid primary key default gen_random_uuid(),
  source_type text not null,
  title text not null,
  url text,
  publisher text,
  author text,
  published_at timestamptz,
  retrieved_at timestamptz not null default now(),
  trust_level text not null default 'unreviewed',
  summary text,
  raw_excerpt text,
  content_hash text,
  status text not null default 'new',
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint sources_source_type_check check (
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
  constraint sources_trust_level_check check (
    trust_level in (
      'official',
      'trusted',
      'mixed',
      'weak',
      'untrusted',
      'unreviewed'
    )
  ),
  constraint sources_status_check check (
    status in (
      'new',
      'triaged',
      'needs_validation',
      'validated',
      'rejected',
      'archived'
    )
  )
);

create table if not exists public.master_brain_records (
  id uuid primary key default gen_random_uuid(),
  record_type text not null,
  title text not null,
  summary text not null,
  practical_meaning text,
  structured_content jsonb not null default '{}'::jsonb,
  confidence_level text not null default 'unreviewed',
  validation_status text not null default 'needs_review',
  publication_status text not null default 'internal_only',
  affected_platform text,
  affected_tool text,
  affected_model text,
  affected_skill_area text,
  affected_lesson_ids uuid[] not null default '{}'::uuid[],
  affected_sandbox_task_ids uuid[] not null default '{}'::uuid[],
  business_relevance text,
  uncertainty_notes text,
  current_version_number integer not null default 1,
  superseded_by_record_id uuid references public.master_brain_records(id) on delete set null,
  last_checked_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint master_brain_records_record_type_check check (
    record_type in (
      'platform_knowledge',
      'tool_capability',
      'tool_limitation',
      'model_release_note',
      'api_change',
      'documentation_summary',
      'verified_claim',
      'source_record',
      'tool_comparison',
      'lesson_material',
      'sandbox_task',
      'business_training_note',
      'pricing_note',
      'safety_note',
      'deprecation_record',
      'other'
    )
  ),
  constraint master_brain_records_confidence_level_check check (
    confidence_level in (
      'high',
      'medium',
      'low',
      'unreviewed'
    )
  ),
  constraint master_brain_records_validation_status_check check (
    validation_status in (
      'unverified_signal',
      'needs_review',
      'partially_verified',
      'verified',
      'conflicting_evidence',
      'deprecated',
      'rejected',
      'archived'
    )
  ),
  constraint master_brain_records_publication_status_check check (
    publication_status in (
      'internal_only',
      'draft_public_summary',
      'ready_for_publication',
      'published',
      'needs_recheck',
      'retired',
      'archived'
    )
  )
);

create table if not exists public.master_brain_record_sources (
  id uuid primary key default gen_random_uuid(),
  master_brain_record_id uuid not null references public.master_brain_records(id) on delete cascade,
  source_id uuid not null references public.sources(id) on delete cascade,
  source_role text not null default 'supporting',
  notes text,
  created_at timestamptz not null default now(),
  constraint master_brain_record_sources_unique unique (master_brain_record_id, source_id),
  constraint master_brain_record_sources_source_role_check check (
    source_role in (
      'primary',
      'supporting',
      'contradictory',
      'background',
      'verification',
      'other'
    )
  )
);

create table if not exists public.validation_reviews (
  id uuid primary key default gen_random_uuid(),
  review_target_type text not null,
  review_target_id uuid not null,
  review_status text not null default 'pending',
  confidence_level text not null default 'unreviewed',
  review_summary text,
  issues_found jsonb not null default '[]'::jsonb,
  recommendation text,
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint validation_reviews_target_type_check check (
    review_target_type in (
      'ai_update',
      'source',
      'master_brain_record',
      'lesson_version',
      'sandbox_task_version',
      'tool_capability_version',
      'tool_comparison_version',
      'agent_finding',
      'business_training_note',
      'other'
    )
  ),
  constraint validation_reviews_status_check check (
    review_status in (
      'pending',
      'validated',
      'rejected',
      'needs_more_sources',
      'conflicting_sources',
      'deprecated',
      'archived'
    )
  ),
  constraint validation_reviews_confidence_level_check check (
    confidence_level in (
      'high',
      'medium',
      'low',
      'unreviewed'
    )
  )
);

create table if not exists public.agent_runs (
  id uuid primary key default gen_random_uuid(),
  agent_type text not null,
  status text not null default 'queued',
  started_at timestamptz,
  finished_at timestamptz,
  input_payload jsonb not null default '{}'::jsonb,
  output_summary text,
  error_message text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint agent_runs_agent_type_check check (
    agent_type in (
      'scout',
      'noise_filter',
      'validator',
      'tool',
      'use_case',
      'comparison',
      'lesson_builder',
      'sandbox_builder',
      'business_training',
      'master_brain',
      'other'
    )
  ),
  constraint agent_runs_status_check check (
    status in (
      'queued',
      'running',
      'completed',
      'failed',
      'cancelled',
      'archived'
    )
  )
);

create table if not exists public.agent_findings (
  id uuid primary key default gen_random_uuid(),
  agent_run_id uuid references public.agent_runs(id) on delete set null,
  finding_type text not null,
  title text not null,
  summary text not null,
  raw_payload jsonb not null default '{}'::jsonb,
  confidence_level text not null default 'unreviewed',
  validation_status text not null default 'unverified_signal',
  recommended_action text,
  related_source_id uuid references public.sources(id) on delete set null,
  related_master_brain_record_id uuid references public.master_brain_records(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint agent_findings_finding_type_check check (
    finding_type in (
      'model_release',
      'api_change',
      'pricing_change',
      'tool_capability_change',
      'tool_limitation',
      'tool_launch',
      'tool_deprecation',
      'documentation_update',
      'agent_framework_update',
      'rag_update',
      'business_ai_workflow_update',
      'safety_update',
      'lesson_update_candidate',
      'sandbox_task_candidate',
      'tool_comparison_candidate',
      'noise',
      'other'
    )
  ),
  constraint agent_findings_confidence_level_check check (
    confidence_level in (
      'high',
      'medium',
      'low',
      'unreviewed'
    )
  ),
  constraint agent_findings_validation_status_check check (
    validation_status in (
      'unverified_signal',
      'needs_review',
      'partially_verified',
      'verified',
      'conflicting_evidence',
      'deprecated',
      'rejected',
      'archived'
    )
  )
);

create table if not exists public.publication_queue (
  id uuid primary key default gen_random_uuid(),
  queue_item_type text not null,
  queue_item_id uuid not null,
  status text not null default 'queued',
  priority text not null default 'normal',
  publication_target text not null default 'internal_review',
  title text not null,
  summary text,
  assigned_to uuid references auth.users(id) on delete set null,
  created_by uuid references auth.users(id) on delete set null,
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  scheduled_for timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint publication_queue_item_type_check check (
    queue_item_type in (
      'master_brain_record',
      'agent_finding',
      'validation_review',
      'lesson_update',
      'sandbox_task',
      'tool_comparison',
      'business_training_note',
      'other'
    )
  ),
  constraint publication_queue_status_check check (
    status in (
      'queued',
      'in_review',
      'needs_changes',
      'ready',
      'published',
      'rejected',
      'archived'
    )
  ),
  constraint publication_queue_priority_check check (
    priority in (
      'low',
      'normal',
      'high',
      'critical'
    )
  ),
  constraint publication_queue_target_check check (
    publication_target in (
      'internal_review',
      'public_page',
      'lesson',
      'sandbox_task',
      'tool_comparison',
      'business_training',
      'live_ai_intelligence',
      'other'
    )
  )
);

create index if not exists sources_source_type_idx on public.sources(source_type);
create index if not exists sources_status_idx on public.sources(status);
create index if not exists sources_trust_level_idx on public.sources(trust_level);
create index if not exists sources_retrieved_at_idx on public.sources(retrieved_at desc);

create index if not exists master_brain_records_record_type_idx on public.master_brain_records(record_type);
create index if not exists master_brain_records_validation_status_idx on public.master_brain_records(validation_status);
create index if not exists master_brain_records_publication_status_idx on public.master_brain_records(publication_status);
create index if not exists master_brain_records_confidence_level_idx on public.master_brain_records(confidence_level);
create index if not exists master_brain_records_updated_at_idx on public.master_brain_records(updated_at desc);

create index if not exists master_brain_record_sources_record_idx on public.master_brain_record_sources(master_brain_record_id);
create index if not exists master_brain_record_sources_source_idx on public.master_brain_record_sources(source_id);

create index if not exists validation_reviews_target_idx on public.validation_reviews(review_target_type, review_target_id);
create index if not exists validation_reviews_status_idx on public.validation_reviews(review_status);

create index if not exists agent_runs_agent_type_idx on public.agent_runs(agent_type);
create index if not exists agent_runs_status_idx on public.agent_runs(status);
create index if not exists agent_runs_created_at_idx on public.agent_runs(created_at desc);

create index if not exists agent_findings_finding_type_idx on public.agent_findings(finding_type);
create index if not exists agent_findings_validation_status_idx on public.agent_findings(validation_status);
create index if not exists agent_findings_created_at_idx on public.agent_findings(created_at desc);

create index if not exists publication_queue_status_idx on public.publication_queue(status);
create index if not exists publication_queue_priority_idx on public.publication_queue(priority);
create index if not exists publication_queue_item_idx on public.publication_queue(queue_item_type, queue_item_id);

drop trigger if exists set_sources_updated_at on public.sources;
create trigger set_sources_updated_at
before update on public.sources
for each row
execute function public.set_updated_at();

drop trigger if exists set_master_brain_records_updated_at on public.master_brain_records;
create trigger set_master_brain_records_updated_at
before update on public.master_brain_records
for each row
execute function public.set_updated_at();

drop trigger if exists set_validation_reviews_updated_at on public.validation_reviews;
create trigger set_validation_reviews_updated_at
before update on public.validation_reviews
for each row
execute function public.set_updated_at();

drop trigger if exists set_agent_runs_updated_at on public.agent_runs;
create trigger set_agent_runs_updated_at
before update on public.agent_runs
for each row
execute function public.set_updated_at();

drop trigger if exists set_agent_findings_updated_at on public.agent_findings;
create trigger set_agent_findings_updated_at
before update on public.agent_findings
for each row
execute function public.set_updated_at();

drop trigger if exists set_publication_queue_updated_at on public.publication_queue;
create trigger set_publication_queue_updated_at
before update on public.publication_queue
for each row
execute function public.set_updated_at();

alter table public.sources enable row level security;
alter table public.master_brain_records enable row level security;
alter table public.master_brain_record_sources enable row level security;
alter table public.validation_reviews enable row level security;
alter table public.agent_runs enable row level security;
alter table public.agent_findings enable row level security;
alter table public.publication_queue enable row level security;

revoke all on public.sources from anon;
revoke all on public.master_brain_records from anon;
revoke all on public.master_brain_record_sources from anon;
revoke all on public.validation_reviews from anon;
revoke all on public.agent_runs from anon;
revoke all on public.agent_findings from anon;
revoke all on public.publication_queue from anon;

grant select, insert, update, delete on public.sources to authenticated;
grant select, insert, update, delete on public.master_brain_records to authenticated;
grant select, insert, update, delete on public.master_brain_record_sources to authenticated;
grant select, insert, update, delete on public.validation_reviews to authenticated;
grant select, insert, update, delete on public.agent_runs to authenticated;
grant select, insert, update, delete on public.agent_findings to authenticated;
grant select, insert, update, delete on public.publication_queue to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'sources'
      and policyname = 'Master Brain admin can manage sources'
  ) then
    create policy "Master Brain admin can manage sources"
    on public.sources
    for all
    to authenticated
    using (public.is_master_brain_admin())
    with check (public.is_master_brain_admin());
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'master_brain_records'
      and policyname = 'Master Brain admin can manage records'
  ) then
    create policy "Master Brain admin can manage records"
    on public.master_brain_records
    for all
    to authenticated
    using (public.is_master_brain_admin())
    with check (public.is_master_brain_admin());
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'master_brain_record_sources'
      and policyname = 'Master Brain admin can manage record sources'
  ) then
    create policy "Master Brain admin can manage record sources"
    on public.master_brain_record_sources
    for all
    to authenticated
    using (public.is_master_brain_admin())
    with check (public.is_master_brain_admin());
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'validation_reviews'
      and policyname = 'Master Brain admin can manage validation reviews'
  ) then
    create policy "Master Brain admin can manage validation reviews"
    on public.validation_reviews
    for all
    to authenticated
    using (public.is_master_brain_admin())
    with check (public.is_master_brain_admin());
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'agent_runs'
      and policyname = 'Master Brain admin can manage agent runs'
  ) then
    create policy "Master Brain admin can manage agent runs"
    on public.agent_runs
    for all
    to authenticated
    using (public.is_master_brain_admin())
    with check (public.is_master_brain_admin());
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'agent_findings'
      and policyname = 'Master Brain admin can manage agent findings'
  ) then
    create policy "Master Brain admin can manage agent findings"
    on public.agent_findings
    for all
    to authenticated
    using (public.is_master_brain_admin())
    with check (public.is_master_brain_admin());
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'publication_queue'
      and policyname = 'Master Brain admin can manage publication queue'
  ) then
    create policy "Master Brain admin can manage publication queue"
    on public.publication_queue
    for all
    to authenticated
    using (public.is_master_brain_admin())
    with check (public.is_master_brain_admin());
  end if;
end $$;

comment on table public.sources is
'Private Master Brain source records for official docs, release notes, trusted sources, weak signals, and validation evidence.';

comment on table public.master_brain_records is
'Private structured knowledge records connecting verified AI intelligence to lessons, sandbox tasks, tool intelligence, and business training.';

comment on table public.master_brain_record_sources is
'Join table connecting Master Brain records to supporting, primary, contradictory, or background sources.';

comment on table public.validation_reviews is
'Private validation review records for sources, claims, Master Brain records, agent findings, lessons, sandbox tasks, and tool intelligence.';

comment on table public.agent_runs is
'Private execution records for future DeepMind Resources specialist agents.';

comment on table public.agent_findings is
'Private candidate findings created by agents before validation or publication.';

comment on table public.publication_queue is
'Private review queue for items that may become lessons, sandbox tasks, tool comparisons, business training, or public summaries.';

notify pgrst, 'reload schema';
