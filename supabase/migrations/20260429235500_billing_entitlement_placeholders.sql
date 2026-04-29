-- DeepMindResources Migration 006
-- Billing entitlement placeholders.
-- This does not modify existing dashboard/MVP tables.
-- This does not add Stripe API, checkout, webhook, or payment logic.
-- Store Stripe reference IDs only. Never store Stripe secret keys.

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
-- Subscriptions
-- --------------------------------------------------------------------

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),

  user_id uuid references auth.users(id) on delete cascade,
  organisation_id uuid references public.organisations(id) on delete cascade,

  stripe_customer_id text,
  stripe_subscription_id text,
  stripe_price_id text,
  stripe_product_id text,

  plan_key text not null,
  status text not null default 'incomplete',

  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  trial_end timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint subscriptions_has_user_or_organisation
    check (
      user_id is not null
      or organisation_id is not null
    ),

  constraint subscriptions_plan_key_check
    check (
      plan_key in (
        'free',
        'individual_pro_monthly',
        'individual_pro_yearly',
        'business_team_monthly',
        'business_team_yearly',
        'business_pro_monthly',
        'business_pro_yearly',
        'admin_grant',
        'trial',
        'custom'
      )
    ),

  constraint subscriptions_status_check
    check (
      status in (
        'trialing',
        'active',
        'past_due',
        'canceled',
        'unpaid',
        'incomplete',
        'incomplete_expired',
        'paused'
      )
    )
);

drop trigger if exists set_subscriptions_updated_at on public.subscriptions;

create trigger set_subscriptions_updated_at
before update on public.subscriptions
for each row
execute function public.deepmind_set_updated_at();

alter table public.subscriptions enable row level security;

drop policy if exists "Users can view own subscriptions" on public.subscriptions;
drop policy if exists "Organisation owners and admins can view organisation subscriptions" on public.subscriptions;

create policy "Users can view own subscriptions"
on public.subscriptions
for select
to authenticated
using (
  user_id = auth.uid()
);

create policy "Organisation owners and admins can view organisation subscriptions"
on public.subscriptions
for select
to authenticated
using (
  organisation_id is not null
  and public.deepmind_has_org_role(
    organisation_id,
    array['owner', 'admin']
  )
);

-- No client insert/update/delete policies yet.
-- Subscription writes must be handled later through trusted server-side billing
-- flows and Stripe webhook processing.

-- --------------------------------------------------------------------
-- Entitlements
-- --------------------------------------------------------------------

create table if not exists public.entitlements (
  id uuid primary key default gen_random_uuid(),

  user_id uuid references auth.users(id) on delete cascade,
  organisation_id uuid references public.organisations(id) on delete cascade,

  entitlement_key text not null,
  source text not null default 'stripe_subscription',
  status text not null default 'pending',

  starts_at timestamptz,
  ends_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint entitlements_has_user_or_organisation
    check (
      user_id is not null
      or organisation_id is not null
    ),

  constraint entitlements_key_check
    check (
      entitlement_key in (
        'academy_free',
        'academy_pro',
        'sandbox_preview',
        'sandbox_basic',
        'sandbox_pro',
        'tool_intelligence',
        'advanced_tool_intelligence',
        'live_ai_intelligence_feed',
        'business_dashboard',
        'team_training',
        'business_training_modules',
        'advanced_team_reporting',
        'custom_training_paths',
        'priority_support'
      )
    ),

  constraint entitlements_source_check
    check (
      source in (
        'stripe_subscription',
        'admin_grant',
        'trial',
        'promotion',
        'migration'
      )
    ),

  constraint entitlements_status_check
    check (
      status in (
        'active',
        'expired',
        'revoked',
        'pending'
      )
    )
);

drop trigger if exists set_entitlements_updated_at on public.entitlements;

create trigger set_entitlements_updated_at
before update on public.entitlements
for each row
execute function public.deepmind_set_updated_at();

alter table public.entitlements enable row level security;

drop policy if exists "Users can view own entitlements" on public.entitlements;
drop policy if exists "Organisation owners and admins can view organisation entitlements" on public.entitlements;

create policy "Users can view own entitlements"
on public.entitlements
for select
to authenticated
using (
  user_id = auth.uid()
);

create policy "Organisation owners and admins can view organisation entitlements"
on public.entitlements
for select
to authenticated
using (
  organisation_id is not null
  and public.deepmind_has_org_role(
    organisation_id,
    array['owner', 'admin']
  )
);

-- No client insert/update/delete policies yet.
-- Entitlement writes must be handled later through trusted server-side billing,
-- admin-grant, trial, or migration flows.

-- --------------------------------------------------------------------
-- Indexes
-- --------------------------------------------------------------------

create index if not exists subscriptions_user_status_idx
on public.subscriptions (user_id, status);

create index if not exists subscriptions_organisation_status_idx
on public.subscriptions (organisation_id, status);

create index if not exists subscriptions_stripe_customer_idx
on public.subscriptions (stripe_customer_id);

create unique index if not exists subscriptions_stripe_subscription_unique_idx
on public.subscriptions (stripe_subscription_id)
where stripe_subscription_id is not null;

create index if not exists subscriptions_plan_key_idx
on public.subscriptions (plan_key);

create index if not exists subscriptions_current_period_end_idx
on public.subscriptions (current_period_end)
where current_period_end is not null;

create index if not exists entitlements_user_status_idx
on public.entitlements (user_id, status);

create index if not exists entitlements_organisation_status_idx
on public.entitlements (organisation_id, status);

create index if not exists entitlements_key_status_idx
on public.entitlements (entitlement_key, status);

create index if not exists entitlements_user_key_idx
on public.entitlements (user_id, entitlement_key);

create index if not exists entitlements_organisation_key_idx
on public.entitlements (organisation_id, entitlement_key);

create index if not exists entitlements_active_user_key_idx
on public.entitlements (user_id, entitlement_key)
where status = 'active';

create index if not exists entitlements_active_organisation_key_idx
on public.entitlements (organisation_id, entitlement_key)
where status = 'active';

create index if not exists entitlements_ends_at_idx
on public.entitlements (ends_at)
where ends_at is not null;

commit;
