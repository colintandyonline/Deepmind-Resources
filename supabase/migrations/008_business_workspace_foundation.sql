-- 008_business_workspace_foundation.sql
-- DeepMind Resources business workspace foundation.
--
-- Purpose:
-- Create the first workspace tables needed for future business dashboards,
-- staff onboarding, workspace membership, invitations, and role-aware access.
--
-- Scope:
-- - workspaces
-- - workspace_members
-- - workspace_invites
-- - basic helper functions
-- - indexes
-- - row level security policies
--
-- This migration does not create business dashboard UI.
-- This migration does not create billing, seats, assignments, staff progress,
-- sandbox reviews, or retraining alerts yet.

create extension if not exists pgcrypto;

create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  type text not null default 'individual',
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  plan_tier text not null default 'free',
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint workspaces_type_check check (type in ('individual', 'business')),
  constraint workspaces_status_check check (status in ('active', 'trial', 'suspended', 'cancelled', 'archived')),
  constraint workspaces_plan_tier_check check (plan_tier in ('free', 'individual', 'business', 'enterprise'))
);

create table if not exists public.workspace_members (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member',
  status text not null default 'active',
  invited_by uuid references auth.users(id) on delete set null,
  joined_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint workspace_members_role_check check (role in ('owner', 'admin', 'manager', 'member')),
  constraint workspace_members_status_check check (status in ('active', 'invited', 'suspended', 'removed')),
  constraint workspace_members_workspace_user_unique unique (workspace_id, user_id)
);

create table if not exists public.workspace_invites (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  email text not null,
  role text not null default 'member',
  token_hash text not null unique,
  status text not null default 'pending',
  expires_at timestamptz not null default (now() + interval '7 days'),
  invited_by uuid references auth.users(id) on delete set null,
  accepted_by uuid references auth.users(id) on delete set null,
  accepted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint workspace_invites_role_check check (role in ('owner', 'admin', 'manager', 'member')),
  constraint workspace_invites_status_check check (status in ('pending', 'accepted', 'expired', 'revoked')),
  constraint workspace_invites_email_not_blank check (length(trim(email)) > 0)
);

create unique index if not exists workspace_invites_pending_email_unique
  on public.workspace_invites (workspace_id, lower(email))
  where status = 'pending';

create index if not exists workspaces_owner_user_id_idx
  on public.workspaces (owner_user_id);

create index if not exists workspaces_type_status_idx
  on public.workspaces (type, status);

create index if not exists workspace_members_workspace_id_idx
  on public.workspace_members (workspace_id);

create index if not exists workspace_members_user_id_idx
  on public.workspace_members (user_id);

create index if not exists workspace_members_role_status_idx
  on public.workspace_members (role, status);

create index if not exists workspace_invites_workspace_id_idx
  on public.workspace_invites (workspace_id);

create index if not exists workspace_invites_invited_by_idx
  on public.workspace_invites (invited_by);

create index if not exists workspace_invites_status_expires_at_idx
  on public.workspace_invites (status, expires_at);

create or replace function public.dmr_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists dmr_workspaces_set_updated_at on public.workspaces;
create trigger dmr_workspaces_set_updated_at
before update on public.workspaces
for each row
execute function public.dmr_set_updated_at();

drop trigger if exists dmr_workspace_members_set_updated_at on public.workspace_members;
create trigger dmr_workspace_members_set_updated_at
before update on public.workspace_members
for each row
execute function public.dmr_set_updated_at();

drop trigger if exists dmr_workspace_invites_set_updated_at on public.workspace_invites;
create trigger dmr_workspace_invites_set_updated_at
before update on public.workspace_invites
for each row
execute function public.dmr_set_updated_at();

create or replace function public.dmr_owns_workspace(target_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.workspaces w
    where w.id = target_workspace_id
      and w.owner_user_id = auth.uid()
      and w.status in ('active', 'trial')
  );
$$;

create or replace function public.dmr_is_workspace_member(target_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.workspace_members wm
    where wm.workspace_id = target_workspace_id
      and wm.user_id = auth.uid()
      and wm.status = 'active'
  );
$$;

create or replace function public.dmr_is_workspace_admin(target_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.workspace_members wm
    where wm.workspace_id = target_workspace_id
      and wm.user_id = auth.uid()
      and wm.status = 'active'
      and wm.role in ('owner', 'admin')
  );
$$;

grant execute on function public.dmr_owns_workspace(uuid) to authenticated;
grant execute on function public.dmr_is_workspace_member(uuid) to authenticated;
grant execute on function public.dmr_is_workspace_admin(uuid) to authenticated;

alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.workspace_invites enable row level security;

drop policy if exists "Users can read their own workspaces" on public.workspaces;
create policy "Users can read their own workspaces"
on public.workspaces
for select
to authenticated
using (
  owner_user_id = auth.uid()
  or public.dmr_is_workspace_member(id)
);

drop policy if exists "Users can create owned workspaces" on public.workspaces;
create policy "Users can create owned workspaces"
on public.workspaces
for insert
to authenticated
with check (
  owner_user_id = auth.uid()
);

drop policy if exists "Workspace admins can update workspaces" on public.workspaces;
create policy "Workspace admins can update workspaces"
on public.workspaces
for update
to authenticated
using (
  public.dmr_is_workspace_admin(id)
)
with check (
  public.dmr_is_workspace_admin(id)
);

drop policy if exists "Users can read relevant workspace memberships" on public.workspace_members;
create policy "Users can read relevant workspace memberships"
on public.workspace_members
for select
to authenticated
using (
  user_id = auth.uid()
  or public.dmr_is_workspace_admin(workspace_id)
);

drop policy if exists "Workspace owners can create first owner membership" on public.workspace_members;
create policy "Workspace owners can create first owner membership"
on public.workspace_members
for insert
to authenticated
with check (
  (
    role = 'owner'
    and user_id = auth.uid()
    and public.dmr_owns_workspace(workspace_id)
  )
  or public.dmr_is_workspace_admin(workspace_id)
);

drop policy if exists "Workspace admins can update memberships" on public.workspace_members;
create policy "Workspace admins can update memberships"
on public.workspace_members
for update
to authenticated
using (
  public.dmr_is_workspace_admin(workspace_id)
)
with check (
  public.dmr_is_workspace_admin(workspace_id)
);

drop policy if exists "Workspace admins can read invites" on public.workspace_invites;
create policy "Workspace admins can read invites"
on public.workspace_invites
for select
to authenticated
using (
  public.dmr_is_workspace_admin(workspace_id)
);

drop policy if exists "Workspace admins can create invites" on public.workspace_invites;
create policy "Workspace admins can create invites"
on public.workspace_invites
for insert
to authenticated
with check (
  public.dmr_is_workspace_admin(workspace_id)
  and invited_by = auth.uid()
);

drop policy if exists "Workspace admins can update invites" on public.workspace_invites;
create policy "Workspace admins can update invites"
on public.workspace_invites
for update
to authenticated
using (
  public.dmr_is_workspace_admin(workspace_id)
)
with check (
  public.dmr_is_workspace_admin(workspace_id)
);

comment on table public.workspaces is 'Workspace records for individual and business learning contexts.';
comment on table public.workspace_members is 'Membership records connecting users to workspaces with role-aware access.';
comment on table public.workspace_invites is 'Business workspace invitation records. Stores token hashes only, not raw invite tokens.';
comment on function public.dmr_owns_workspace(uuid) is 'Checks whether the current authenticated user owns a workspace.';
comment on function public.dmr_is_workspace_member(uuid) is 'Checks whether the current authenticated user is an active member of a workspace.';
comment on function public.dmr_is_workspace_admin(uuid) is 'Checks whether the current authenticated user is an owner or admin of a workspace.';
