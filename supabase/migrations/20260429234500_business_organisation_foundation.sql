-- DeepMindResources Migration 005
-- Business organisation foundation.
-- This does not modify existing dashboard/MVP tables.
-- This does not add Stripe billing logic.

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
-- Organisations
-- --------------------------------------------------------------------

create table if not exists public.organisations (
  id uuid primary key default gen_random_uuid(),

  name text not null,
  slug text not null unique,

  organisation_type text not null default 'business',
  status text not null default 'active',

  created_by uuid references auth.users(id) on delete set null,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint organisations_type_check
    check (
      organisation_type in (
        'business',
        'team',
        'education',
        'internal',
        'other'
      )
    ),

  constraint organisations_status_check
    check (
      status in (
        'active',
        'trial',
        'suspended',
        'cancelled',
        'archived'
      )
    )
);

drop trigger if exists set_organisations_updated_at on public.organisations;

create trigger set_organisations_updated_at
before update on public.organisations
for each row
execute function public.deepmind_set_updated_at();

alter table public.organisations enable row level security;

-- --------------------------------------------------------------------
-- Organisation memberships
-- --------------------------------------------------------------------

create table if not exists public.organisation_memberships (
  id uuid primary key default gen_random_uuid(),

  organisation_id uuid not null references public.organisations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,

  membership_role text not null default 'learner',
  status text not null default 'active',

  invited_by uuid references auth.users(id) on delete set null,
  joined_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint organisation_memberships_role_check
    check (
      membership_role in (
        'owner',
        'admin',
        'manager',
        'learner'
      )
    ),

  constraint organisation_memberships_status_check
    check (
      status in (
        'invited',
        'active',
        'suspended',
        'removed'
      )
    ),

  constraint organisation_memberships_unique_user_org
    unique (organisation_id, user_id)
);

drop trigger if exists set_organisation_memberships_updated_at on public.organisation_memberships;

create trigger set_organisation_memberships_updated_at
before update on public.organisation_memberships
for each row
execute function public.deepmind_set_updated_at();

alter table public.organisation_memberships enable row level security;

-- --------------------------------------------------------------------
-- Organisation access helper functions
-- --------------------------------------------------------------------
-- These functions are used by RLS policies to avoid recursive membership
-- policy checks. They only return true for the current authenticated user.

create or replace function public.deepmind_is_org_member(target_organisation_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.organisation_memberships om
    where om.organisation_id = target_organisation_id
      and om.user_id = auth.uid()
      and om.status = 'active'
  );
$$;

create or replace function public.deepmind_has_org_role(
  target_organisation_id uuid,
  allowed_roles text[]
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.organisation_memberships om
    where om.organisation_id = target_organisation_id
      and om.user_id = auth.uid()
      and om.status = 'active'
      and om.membership_role = any(allowed_roles)
  );
$$;

-- --------------------------------------------------------------------
-- Organisation policies
-- --------------------------------------------------------------------

drop policy if exists "Organisation members can view their organisations" on public.organisations;

create policy "Organisation members can view their organisations"
on public.organisations
for select
to authenticated
using (
  public.deepmind_is_org_member(id)
);

-- No client insert/update/delete policies yet.
-- Organisation creation and management should be handled later through
-- controlled server-side flows.

-- --------------------------------------------------------------------
-- Organisation membership policies
-- --------------------------------------------------------------------

drop policy if exists "Users can view relevant organisation memberships" on public.organisation_memberships;

create policy "Users can view relevant organisation memberships"
on public.organisation_memberships
for select
to authenticated
using (
  user_id = auth.uid()
  or public.deepmind_has_org_role(
    organisation_id,
    array['owner', 'admin', 'manager']
  )
);

-- No client insert/update/delete policies yet.
-- Membership creation and role changes should be handled later through
-- controlled server-side flows to prevent users granting themselves access.

-- --------------------------------------------------------------------
-- Training assignments
-- --------------------------------------------------------------------

create table if not exists public.training_assignments (
  id uuid primary key default gen_random_uuid(),

  organisation_id uuid references public.organisations(id) on delete cascade,
  assigned_to_user_id uuid references auth.users(id) on delete cascade,
  assigned_by_user_id uuid references auth.users(id) on delete set null,

  target_type text not null,
  target_id uuid not null,

  required boolean not null default true,
  due_at timestamptz,

  status text not null default 'assigned',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint training_assignments_target_type_check
    check (
      target_type in (
        'learning_path',
        'module',
        'lesson',
        'sandbox_task'
      )
    ),

  constraint training_assignments_status_check
    check (
      status in (
        'assigned',
        'in_progress',
        'completed',
        'overdue',
        'cancelled'
      )
    ),

  constraint training_assignments_has_target_user_or_org
    check (
      organisation_id is not null
      or assigned_to_user_id is not null
    )
);

drop trigger if exists set_training_assignments_updated_at on public.training_assignments;

create trigger set_training_assignments_updated_at
before update on public.training_assignments
for each row
execute function public.deepmind_set_updated_at();

alter table public.training_assignments enable row level security;

drop policy if exists "Users can view own or managed training assignments" on public.training_assignments;

create policy "Users can view own or managed training assignments"
on public.training_assignments
for select
to authenticated
using (
  assigned_to_user_id = auth.uid()
  or (
    organisation_id is not null
    and public.deepmind_has_org_role(
      organisation_id,
      array['owner', 'admin', 'manager']
    )
  )
);

-- No client insert/update/delete policies yet.
-- Assignment creation should be handled later through controlled server-side
-- business admin flows.

-- --------------------------------------------------------------------
-- Retraining flags
-- --------------------------------------------------------------------

create table if not exists public.retraining_flags (
  id uuid primary key default gen_random_uuid(),

  organisation_id uuid references public.organisations(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,

  ai_update_id uuid not null references public.ai_updates(id) on delete cascade,

  affected_target_type text not null,
  affected_target_id uuid not null,

  reason text not null,
  severity text not null default 'medium',
  status text not null default 'open',

  created_at timestamptz not null default now(),
  resolved_at timestamptz,

  constraint retraining_flags_affected_target_type_check
    check (
      affected_target_type in (
        'learning_path',
        'module',
        'lesson',
        'lesson_version',
        'sandbox_task',
        'sandbox_task_version',
        'tool',
        'tool_comparison',
        'business_training'
      )
    ),

  constraint retraining_flags_severity_check
    check (
      severity in (
        'low',
        'medium',
        'high',
        'critical'
      )
    ),

  constraint retraining_flags_status_check
    check (
      status in (
        'open',
        'acknowledged',
        'completed',
        'dismissed'
      )
    ),

  constraint retraining_flags_has_target_user_or_org
    check (
      organisation_id is not null
      or user_id is not null
    )
);

alter table public.retraining_flags enable row level security;

drop policy if exists "Users can view own or managed retraining flags" on public.retraining_flags;

create policy "Users can view own or managed retraining flags"
on public.retraining_flags
for select
to authenticated
using (
  user_id = auth.uid()
  or (
    organisation_id is not null
    and public.deepmind_has_org_role(
      organisation_id,
      array['owner', 'admin', 'manager']
    )
  )
);

-- No client insert/update/delete policies yet.
-- Retraining flags should be created later through trusted update/retraining
-- workflows, not direct browser writes.

-- --------------------------------------------------------------------
-- Indexes
-- --------------------------------------------------------------------

create index if not exists organisations_status_type_idx
on public.organisations (status, organisation_type);

create index if not exists organisations_created_by_idx
on public.organisations (created_by);

create index if not exists organisation_memberships_org_role_status_idx
on public.organisation_memberships (organisation_id, membership_role, status);

create index if not exists organisation_memberships_user_status_idx
on public.organisation_memberships (user_id, status);

create index if not exists training_assignments_org_status_idx
on public.training_assignments (organisation_id, status);

create index if not exists training_assignments_user_status_idx
on public.training_assignments (assigned_to_user_id, status);

create index if not exists training_assignments_target_idx
on public.training_assignments (target_type, target_id);

create index if not exists training_assignments_due_at_idx
on public.training_assignments (due_at)
where due_at is not null;

create index if not exists retraining_flags_org_status_idx
on public.retraining_flags (organisation_id, status);

create index if not exists retraining_flags_user_status_idx
on public.retraining_flags (user_id, status);

create index if not exists retraining_flags_ai_update_idx
on public.retraining_flags (ai_update_id);

create index if not exists retraining_flags_target_idx
on public.retraining_flags (affected_target_type, affected_target_id);

create index if not exists retraining_flags_open_severity_idx
on public.retraining_flags (severity, created_at)
where status = 'open';

commit;
