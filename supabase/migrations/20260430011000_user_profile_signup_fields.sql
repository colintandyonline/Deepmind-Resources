-- DeepMindResources Migration 007
-- User profile signup fields.
-- Extends the existing MVP user_profiles table safely.
-- Does not create auth UI, organisation signup flow, or Stripe logic.

begin;

create extension if not exists pgcrypto;

-- Shared updated_at trigger function for DeepMindResources tables.
create or replace function public.deepmind_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

alter table public.user_profiles
add column if not exists first_name text;

alter table public.user_profiles
add column if not exists last_name text;

alter table public.user_profiles
add column if not exists account_type text not null default 'individual';

alter table public.user_profiles
add column if not exists job_title text;

alter table public.user_profiles
add column if not exists onboarding_status text not null default 'profile_needed';

alter table public.user_profiles
add column if not exists onboarding_completed_at timestamptz;

alter table public.user_profiles
drop constraint if exists user_profiles_account_type_check;

alter table public.user_profiles
add constraint user_profiles_account_type_check
check (
  account_type in (
    'individual',
    'business'
  )
);

alter table public.user_profiles
drop constraint if exists user_profiles_onboarding_status_check;

alter table public.user_profiles
add constraint user_profiles_onboarding_status_check
check (
  onboarding_status in (
    'profile_needed',
    'complete'
  )
);

drop trigger if exists set_user_profiles_updated_at on public.user_profiles;

create trigger set_user_profiles_updated_at
before update on public.user_profiles
for each row
execute function public.deepmind_set_updated_at();

create index if not exists user_profiles_account_type_idx
on public.user_profiles (account_type);

create index if not exists user_profiles_onboarding_status_idx
on public.user_profiles (onboarding_status);

commit;
