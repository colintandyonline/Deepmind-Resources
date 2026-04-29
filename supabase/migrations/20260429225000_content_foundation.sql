-- DeepMindResources Migration 001
-- Content foundation tables only.
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
-- Learning paths
-- --------------------------------------------------------------------

create table if not exists public.learning_paths (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_description text,
  long_description text,
  level text,
  audience text,
  status text not null default 'draft',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint learning_paths_status_check
    check (status in ('draft', 'published', 'archived'))
);

drop trigger if exists set_learning_paths_updated_at on public.learning_paths;

create trigger set_learning_paths_updated_at
before update on public.learning_paths
for each row
execute function public.deepmind_set_updated_at();

alter table public.learning_paths enable row level security;

drop policy if exists "Published learning paths are publicly readable" on public.learning_paths;

create policy "Published learning paths are publicly readable"
on public.learning_paths
for select
to public
using (status = 'published');

-- --------------------------------------------------------------------
-- Modules
-- --------------------------------------------------------------------

create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  learning_path_id uuid not null references public.learning_paths(id) on delete cascade,
  slug text not null,
  title text not null,
  description text,
  level text,
  status text not null default 'draft',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint modules_status_check
    check (status in ('draft', 'published', 'archived')),

  constraint modules_learning_path_slug_unique
    unique (learning_path_id, slug)
);

drop trigger if exists set_modules_updated_at on public.modules;

create trigger set_modules_updated_at
before update on public.modules
for each row
execute function public.deepmind_set_updated_at();

alter table public.modules enable row level security;

drop policy if exists "Published modules are publicly readable" on public.modules;

create policy "Published modules are publicly readable"
on public.modules
for select
to public
using (
  status = 'published'
  and exists (
    select 1
    from public.learning_paths lp
    where lp.id = modules.learning_path_id
      and lp.status = 'published'
  )
);

-- --------------------------------------------------------------------
-- Lessons
-- --------------------------------------------------------------------

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  slug text not null,
  title text not null,
  summary text,
  level text,
  status text not null default 'draft',
  sort_order integer not null default 0,
  current_version_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint lessons_status_check
    check (status in ('draft', 'published', 'needs_update', 'retired', 'archived')),

  constraint lessons_module_slug_unique
    unique (module_id, slug)
);

drop trigger if exists set_lessons_updated_at on public.lessons;

create trigger set_lessons_updated_at
before update on public.lessons
for each row
execute function public.deepmind_set_updated_at();

alter table public.lessons enable row level security;

drop policy if exists "Published lessons are publicly readable" on public.lessons;

create policy "Published lessons are publicly readable"
on public.lessons
for select
to public
using (
  status = 'published'
  and exists (
    select 1
    from public.modules m
    join public.learning_paths lp on lp.id = m.learning_path_id
    where m.id = lessons.module_id
      and m.status = 'published'
      and lp.status = 'published'
  )
);

-- --------------------------------------------------------------------
-- Lesson versions
-- --------------------------------------------------------------------

create table if not exists public.lesson_versions (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  version_number integer not null,
  title text not null,
  summary text,
  content_markdown text,
  content_json jsonb,
  difficulty text,
  estimated_minutes integer,
  change_summary text,
  change_reason text,
  validation_status text not null default 'unreviewed',
  publication_status text not null default 'draft',
  published_at timestamptz,
  created_by uuid,
  reviewed_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint lesson_versions_version_number_positive
    check (version_number > 0),

  constraint lesson_versions_estimated_minutes_positive
    check (estimated_minutes is null or estimated_minutes > 0),

  constraint lesson_versions_validation_status_check
    check (validation_status in ('unreviewed', 'needs_sources', 'in_review', 'validated', 'rejected')),

  constraint lesson_versions_publication_status_check
    check (publication_status in ('draft', 'scheduled', 'published', 'superseded', 'archived')),

  constraint lesson_versions_lesson_version_unique
    unique (lesson_id, version_number)
);

alter table public.lessons
drop constraint if exists lessons_current_version_id_fkey;

alter table public.lessons
add constraint lessons_current_version_id_fkey
foreign key (current_version_id)
references public.lesson_versions(id)
on delete set null;

drop trigger if exists set_lesson_versions_updated_at on public.lesson_versions;

create trigger set_lesson_versions_updated_at
before update on public.lesson_versions
for each row
execute function public.deepmind_set_updated_at();

alter table public.lesson_versions enable row level security;

drop policy if exists "Published lesson versions are publicly readable" on public.lesson_versions;

create policy "Published lesson versions are publicly readable"
on public.lesson_versions
for select
to public
using (
  publication_status = 'published'
  and validation_status = 'validated'
  and exists (
    select 1
    from public.lessons l
    join public.modules m on m.id = l.module_id
    join public.learning_paths lp on lp.id = m.learning_path_id
    where l.id = lesson_versions.lesson_id
      and l.status = 'published'
      and m.status = 'published'
      and lp.status = 'published'
  )
);

-- --------------------------------------------------------------------
-- Sandbox tasks
-- --------------------------------------------------------------------

create table if not exists public.sandbox_tasks (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text,
  task_type text not null,
  level text,
  status text not null default 'draft',
  current_version_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint sandbox_tasks_status_check
    check (status in ('draft', 'published', 'retired', 'archived')),

  constraint sandbox_tasks_task_type_check
    check (
      task_type in (
        'prompt_test',
        'tool_calling',
        'agent_building',
        'rag_example',
        'workflow_simulation',
        'model_comparison',
        'debugging',
        'business_automation',
        'validation',
        'tool_selection'
      )
    )
);

drop trigger if exists set_sandbox_tasks_updated_at on public.sandbox_tasks;

create trigger set_sandbox_tasks_updated_at
before update on public.sandbox_tasks
for each row
execute function public.deepmind_set_updated_at();

alter table public.sandbox_tasks enable row level security;

drop policy if exists "Published sandbox tasks are publicly readable" on public.sandbox_tasks;

create policy "Published sandbox tasks are publicly readable"
on public.sandbox_tasks
for select
to public
using (status = 'published');

-- --------------------------------------------------------------------
-- Sandbox task versions
-- --------------------------------------------------------------------

create table if not exists public.sandbox_task_versions (
  id uuid primary key default gen_random_uuid(),
  sandbox_task_id uuid not null references public.sandbox_tasks(id) on delete cascade,
  version_number integer not null,
  instructions_markdown text,
  starter_context jsonb,
  expected_output jsonb,
  evaluation_rubric jsonb,
  related_lesson_version_id uuid references public.lesson_versions(id) on delete set null,
  validation_status text not null default 'unreviewed',
  publication_status text not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint sandbox_task_versions_version_number_positive
    check (version_number > 0),

  constraint sandbox_task_versions_validation_status_check
    check (validation_status in ('unreviewed', 'needs_sources', 'in_review', 'validated', 'rejected')),

  constraint sandbox_task_versions_publication_status_check
    check (publication_status in ('draft', 'scheduled', 'published', 'superseded', 'archived')),

  constraint sandbox_task_versions_task_version_unique
    unique (sandbox_task_id, version_number)
);

alter table public.sandbox_tasks
drop constraint if exists sandbox_tasks_current_version_id_fkey;

alter table public.sandbox_tasks
add constraint sandbox_tasks_current_version_id_fkey
foreign key (current_version_id)
references public.sandbox_task_versions(id)
on delete set null;

drop trigger if exists set_sandbox_task_versions_updated_at on public.sandbox_task_versions;

create trigger set_sandbox_task_versions_updated_at
before update on public.sandbox_task_versions
for each row
execute function public.deepmind_set_updated_at();

alter table public.sandbox_task_versions enable row level security;

drop policy if exists "Published sandbox task versions are publicly readable" on public.sandbox_task_versions;

create policy "Published sandbox task versions are publicly readable"
on public.sandbox_task_versions
for select
to public
using (
  publication_status = 'published'
  and validation_status = 'validated'
  and exists (
    select 1
    from public.sandbox_tasks st
    where st.id = sandbox_task_versions.sandbox_task_id
      and st.status = 'published'
  )
);

-- --------------------------------------------------------------------
-- Lesson to sandbox task mapping
-- --------------------------------------------------------------------

create table if not exists public.lesson_sandbox_tasks (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  sandbox_task_id uuid not null references public.sandbox_tasks(id) on delete cascade,
  relationship_type text not null default 'practice',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),

  constraint lesson_sandbox_tasks_relationship_type_check
    check (relationship_type in ('practice', 'assessment', 'optional_extension', 'refresher')),

  constraint lesson_sandbox_tasks_unique
    unique (lesson_id, sandbox_task_id, relationship_type)
);

alter table public.lesson_sandbox_tasks enable row level security;

drop policy if exists "Published lesson sandbox mappings are publicly readable" on public.lesson_sandbox_tasks;

create policy "Published lesson sandbox mappings are publicly readable"
on public.lesson_sandbox_tasks
for select
to public
using (
  exists (
    select 1
    from public.lessons l
    join public.modules m on m.id = l.module_id
    join public.learning_paths lp on lp.id = m.learning_path_id
    where l.id = lesson_sandbox_tasks.lesson_id
      and l.status = 'published'
      and m.status = 'published'
      and lp.status = 'published'
  )
  and exists (
    select 1
    from public.sandbox_tasks st
    where st.id = lesson_sandbox_tasks.sandbox_task_id
      and st.status = 'published'
  )
);

-- --------------------------------------------------------------------
-- Indexes
-- --------------------------------------------------------------------

create index if not exists learning_paths_status_sort_order_idx
on public.learning_paths (status, sort_order);

create index if not exists modules_learning_path_sort_order_idx
on public.modules (learning_path_id, sort_order);

create index if not exists modules_status_idx
on public.modules (status);

create index if not exists lessons_module_sort_order_idx
on public.lessons (module_id, sort_order);

create index if not exists lessons_status_idx
on public.lessons (status);

create index if not exists lesson_versions_lesson_version_number_idx
on public.lesson_versions (lesson_id, version_number);

create index if not exists lesson_versions_publication_validation_idx
on public.lesson_versions (publication_status, validation_status);

create index if not exists sandbox_tasks_status_type_idx
on public.sandbox_tasks (status, task_type);

create index if not exists sandbox_task_versions_task_version_number_idx
on public.sandbox_task_versions (sandbox_task_id, version_number);

create index if not exists sandbox_task_versions_publication_validation_idx
on public.sandbox_task_versions (publication_status, validation_status);

create index if not exists lesson_sandbox_tasks_lesson_sort_order_idx
on public.lesson_sandbox_tasks (lesson_id, sort_order);

create index if not exists lesson_sandbox_tasks_sandbox_task_idx
on public.lesson_sandbox_tasks (sandbox_task_id);

commit;
