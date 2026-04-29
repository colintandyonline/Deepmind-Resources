-- DeepMindResources Migration 002
-- Version-aware user progress and sandbox attempts.
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
-- User lesson progress
-- --------------------------------------------------------------------

create table if not exists public.user_lesson_progress (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null references auth.users(id) on delete cascade,

  lesson_id uuid not null references public.lessons(id) on delete cascade,
  lesson_version_id uuid not null references public.lesson_versions(id) on delete cascade,

  status text not null default 'not_started',
  progress_percentage integer not null default 0,

  score numeric,
  notes text,

  started_at timestamptz,
  completed_at timestamptz,
  last_seen_at timestamptz,

  refresher_recommended_at timestamptz,
  refresher_reason text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint user_lesson_progress_status_check
    check (
      status in (
        'not_started',
        'in_progress',
        'completed',
        'needs_refresher',
        'superseded_completion'
      )
    ),

  constraint user_lesson_progress_percentage_check
    check (progress_percentage >= 0 and progress_percentage <= 100),

  constraint user_lesson_progress_score_check
    check (score is null or score >= 0),

  constraint user_lesson_progress_unique_version
    unique (user_id, lesson_id, lesson_version_id)
);

drop trigger if exists set_user_lesson_progress_updated_at on public.user_lesson_progress;

create trigger set_user_lesson_progress_updated_at
before update on public.user_lesson_progress
for each row
execute function public.deepmind_set_updated_at();

alter table public.user_lesson_progress enable row level security;

drop policy if exists "Users can view own lesson progress" on public.user_lesson_progress;
drop policy if exists "Users can insert own lesson progress" on public.user_lesson_progress;
drop policy if exists "Users can update own lesson progress" on public.user_lesson_progress;
drop policy if exists "Users can delete own lesson progress" on public.user_lesson_progress;

create policy "Users can view own lesson progress"
on public.user_lesson_progress
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert own lesson progress"
on public.user_lesson_progress
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update own lesson progress"
on public.user_lesson_progress
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own lesson progress"
on public.user_lesson_progress
for delete
to authenticated
using (auth.uid() = user_id);

-- --------------------------------------------------------------------
-- Sandbox attempts
-- --------------------------------------------------------------------

create table if not exists public.sandbox_attempts (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null references auth.users(id) on delete cascade,

  sandbox_task_id uuid not null references public.sandbox_tasks(id) on delete cascade,
  sandbox_task_version_id uuid not null references public.sandbox_task_versions(id) on delete cascade,

  status text not null default 'started',

  input_payload jsonb,
  output_payload jsonb,
  self_reflection text,

  score numeric,
  feedback text,

  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  reviewed_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint sandbox_attempts_status_check
    check (
      status in (
        'started',
        'submitted',
        'reviewed',
        'passed',
        'needs_retry'
      )
    ),

  constraint sandbox_attempts_score_check
    check (score is null or score >= 0)
);

drop trigger if exists set_sandbox_attempts_updated_at on public.sandbox_attempts;

create trigger set_sandbox_attempts_updated_at
before update on public.sandbox_attempts
for each row
execute function public.deepmind_set_updated_at();

alter table public.sandbox_attempts enable row level security;

drop policy if exists "Users can view own sandbox attempts" on public.sandbox_attempts;
drop policy if exists "Users can insert own sandbox attempts" on public.sandbox_attempts;
drop policy if exists "Users can update own sandbox attempts" on public.sandbox_attempts;
drop policy if exists "Users can delete own sandbox attempts" on public.sandbox_attempts;

create policy "Users can view own sandbox attempts"
on public.sandbox_attempts
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert own sandbox attempts"
on public.sandbox_attempts
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update own sandbox attempts"
on public.sandbox_attempts
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own sandbox attempts"
on public.sandbox_attempts
for delete
to authenticated
using (auth.uid() = user_id);

-- --------------------------------------------------------------------
-- Indexes
-- --------------------------------------------------------------------

create index if not exists user_lesson_progress_user_status_idx
on public.user_lesson_progress (user_id, status);

create index if not exists user_lesson_progress_user_lesson_idx
on public.user_lesson_progress (user_id, lesson_id);

create index if not exists user_lesson_progress_lesson_version_idx
on public.user_lesson_progress (lesson_version_id);

create index if not exists user_lesson_progress_refresher_idx
on public.user_lesson_progress (user_id, refresher_recommended_at)
where refresher_recommended_at is not null;

create index if not exists sandbox_attempts_user_status_idx
on public.sandbox_attempts (user_id, status);

create index if not exists sandbox_attempts_user_task_idx
on public.sandbox_attempts (user_id, sandbox_task_id);

create index if not exists sandbox_attempts_task_version_idx
on public.sandbox_attempts (sandbox_task_version_id);

create index if not exists sandbox_attempts_submitted_idx
on public.sandbox_attempts (submitted_at)
where submitted_at is not null;

commit;
