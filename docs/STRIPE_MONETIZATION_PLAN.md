# DeepMindResources Stripe Monetization Plan

## Purpose

This document defines the initial Stripe monetization plan for DeepMindResources.

DeepMindResources is a living AI training and tool-intelligence platform. Monetization must support individual learners, business teams, tool intelligence, sandbox access, staff progress tracking, and future enterprise training features without mixing billing secrets into public code or weakening access control.

This plan follows:

- `docs/DATABASE_ARCHITECTURE_PLAN.md`
- `docs/AUTH_AND_ACCESS_CONTROL_PLAN.md`

---

## Current Planning Scope

This is an architecture planning document, not a final Stripe implementation.

No Stripe products, prices, webhooks, checkout sessions, SQL migrations, or code changes have been created from this document.

The goal is to define the monetization model before building:

- Stripe Checkout
- Customer Portal
- Webhooks
- Subscription state sync
- Entitlements
- Individual plans
- Business team plans
- Gated academy and sandbox access
- Business training dashboards

---

## Core Monetization Principles

### 1. Sell current AI capability, not static courses

DeepMindResources must not sell a stale course library.

The product value is that learning content, tool intelligence, sandbox tasks, and business training recommendations stay current as AI changes.

The commercial promise is:

AI update → verified meaning → practical lesson → sandbox task → user skill gain

### 2. Entitlements control product access

Stripe should manage payment state.

The app should manage access using internal entitlement records.

The app should not call Stripe on every protected page load to decide access.

### 3. Stripe IDs are safe references, secrets are not

The database may store Stripe customer IDs, subscription IDs, price IDs, and product IDs.

The database must not store Stripe secret keys.

Secret values must not be committed.

Only environment variable names should be referenced in code and documentation.

### 4. Webhooks are the billing source of truth

Stripe webhook events should update subscription and entitlement state in the app database.

Client-side redirects after Checkout are useful for user experience, but they should not be trusted as the final source of billing truth.

### 5. Business billing must be organisation-aware

Business subscriptions should attach to an organisation, not just an individual user.

A business owner may pay, but the entitlement belongs to the organisation so team members can inherit access through active membership.

### 6. Access should degrade safely

If a subscription is cancelled, expired, unpaid, or disputed, paid access should reduce safely without deleting learning progress.

Users should keep their account and historical progress, but paid features may become locked.

---

## Product Packaging Direction

DeepMindResources should support both individual learning and business training.

The strongest commercial angle is business AI training and reskilling, but individual plans can validate demand and build audience.

Initial packages should stay simple.

---

## Suggested Plan Structure

### 1. Free

Purpose:

Let users understand the platform, try basic learning, and see the value of current AI training.

Possible access:

- Public marketing pages
- Limited academy lessons
- Basic learning dashboard
- Limited progress tracking
- Selected public tool intelligence summaries
- Limited sandbox examples or previews

Possible entitlement keys:

- `academy_free`
- `sandbox_preview`

### 2. Individual Pro

Purpose:

Paid plan for solo learners who want structured AI training and practical sandbox access.

Possible access:

- Full individual academy access
- Version-aware lesson progress
- Pro sandbox tasks
- Tool intelligence summaries
- AI update explanations
- Practical learning paths
- Personal progress tracking

Possible entitlement keys:

- `academy_pro`
- `sandbox_pro`
- `tool_intelligence`
- `live_ai_intelligence_feed`

### 3. Business Team

Purpose:

Main commercial product for businesses training staff on current AI tools and workflows.

Possible access:

- Team learning dashboard
- Staff training assignments
- Staff progress tracking
- Business-focused learning paths
- Business AI tool recommendations
- Retraining flags after major AI updates
- Team sandbox tasks
- Manager/admin views

Possible entitlement keys:

- `team_training`
- `business_dashboard`
- `academy_pro`
- `sandbox_basic`
- `live_ai_intelligence_feed`
- `business_training_modules`

### 4. Business Pro / Enterprise Later

Purpose:

Higher-value business tier for larger organisations, deeper reporting, and custom training.

Possible access:

- Everything in Business Team
- Advanced reporting
- Department/team segmentation
- Custom learning paths
- Custom AI tool recommendations
- Advanced retraining alerts
- Priority support
- Possible future SSO
- Possible custom onboarding

Possible entitlement keys:

- `business_dashboard`
- `team_training`
- `advanced_team_reporting`
- `advanced_tool_intelligence`
- `custom_training_paths`
- `priority_support`

This tier should not be overbuilt first.

---

## Initial Pricing Strategy Notes

Exact prices should be decided later in Stripe, after product scope is clearer.

The first implementation should avoid hard-coding prices into application logic.

Pricing should be driven by Stripe Price IDs and internal plan keys.

Possible plan keys:

- `free`
- `individual_pro_monthly`
- `individual_pro_yearly`
- `business_team_monthly`
- `business_team_yearly`
- `business_pro_monthly`
- `business_pro_yearly`

Important:

- Plan names and marketing copy can change.
- Entitlement keys should be more stable than display plan names.
- Stripe Price IDs should be environment variables or database configuration, not scattered through UI files.

---

## Stripe Object Mapping

### Stripe Product

Represents a sellable product category.

Suggested products:

- DeepMindResources Individual Pro
- DeepMindResources Business Team
- DeepMindResources Business Pro Later

### Stripe Price

Represents the billing amount and interval.

Suggested price types:

- Individual Pro monthly
- Individual Pro yearly
- Business Team monthly
- Business Team yearly
- Business Pro monthly later
- Business Pro yearly later

### Stripe Customer

Represents the payer.

For individual subscriptions:

- Stripe customer maps to a user.

For business subscriptions:

- Stripe customer may map to an organisation and optionally an owner user.

### Stripe Subscription

Represents recurring access.

Subscription state should be copied into the app database for access checks.

### Stripe Checkout Session

Used to start subscription checkout.

Checkout should be created server-side.

The client should not create Stripe Checkout Sessions directly.

### Stripe Customer Portal

Used by paying customers to manage billing.

Portal sessions should be created server-side.

---

## Database Tables Involved

The database architecture reserves these billing-related tables.

### subscriptions

Stores Stripe subscription references and app-level subscription state.

Suggested fields:

- `id` uuid primary key
- `user_id` uuid nullable references `auth.users.id`
- `organisation_id` uuid nullable references `organisations.id`
- `stripe_customer_id` text nullable
- `stripe_subscription_id` text nullable
- `stripe_price_id` text nullable
- `stripe_product_id` text nullable
- `plan_key` text
- `status` text
- `current_period_start` timestamptz nullable
- `current_period_end` timestamptz nullable
- `cancel_at_period_end` boolean default false
- `trial_end` timestamptz nullable
- `created_at` timestamptz
- `updated_at` timestamptz

Subscription statuses should mirror Stripe enough to support access decisions.

Possible statuses:

- `trialing`
- `active`
- `past_due`
- `canceled`
- `unpaid`
- `incomplete`
- `incomplete_expired`
- `paused`

Access should usually be granted for:

- `trialing`
- `active`

Access may be limited or grace-period based for:

- `past_due`

Access should generally not be granted for:

- `canceled`
- `unpaid`
- `incomplete_expired`

Final policy should be decided before implementation.

### entitlements

Stores product access rights derived from subscription state or admin grants.

Suggested fields:

- `id` uuid primary key
- `user_id` uuid nullable references `auth.users.id`
- `organisation_id` uuid nullable references `organisations.id`
- `entitlement_key` text
- `source` text
- `status` text
- `starts_at` timestamptz nullable
- `ends_at` timestamptz nullable
- `created_at` timestamptz
- `updated_at` timestamptz

Possible sources:

- `stripe_subscription`
- `admin_grant`
- `trial`
- `promotion`
- `migration`

Possible statuses:

- `active`
- `expired`
- `revoked`
- `pending`

Important:

- Access checks should read entitlements.
- Subscription records explain why entitlements exist.
- Entitlements should be updated by server-side code only.

---

## Plan-to-Entitlement Mapping

The app needs a clear mapping from plan keys to entitlement keys.

### Free

Plan key:

- `free`

Entitlements:

- `academy_free`
- `sandbox_preview`

### Individual Pro

Plan keys:

- `individual_pro_monthly`
- `individual_pro_yearly`

Entitlements:

- `academy_pro`
- `sandbox_pro`
- `tool_intelligence`
- `live_ai_intelligence_feed`

### Business Team

Plan keys:

- `business_team_monthly`
- `business_team_yearly`

Organisation entitlements:

- `team_training`
- `business_dashboard`
- `academy_pro`
- `sandbox_basic`
- `live_ai_intelligence_feed`
- `business_training_modules`

### Business Pro Later

Plan keys:

- `business_pro_monthly`
- `business_pro_yearly`

Organisation entitlements:

- `team_training`
- `business_dashboard`
- `academy_pro`
- `sandbox_pro`
- `live_ai_intelligence_feed`
- `business_training_modules`
- `advanced_team_reporting`
- `advanced_tool_intelligence`
- `custom_training_paths`
- `priority_support`

---

## Individual Subscription Flow

### Start Checkout

1. User signs in or creates an account.
2. User selects Individual Pro.
3. App calls a server-side route or server action to create a Stripe Checkout Session.
4. Server verifies the authenticated user.
5. Server creates or retrieves Stripe customer for the user.
6. Server creates Checkout Session using the correct Stripe Price ID.
7. User is redirected to Stripe Checkout.

### After Checkout

1. Stripe redirects user back to success or return URL.
2. App shows a pending or success screen.
3. Stripe webhook confirms subscription state.
4. Server updates `subscriptions` table.
5. Server grants relevant user entitlements.
6. User can access paid features.

Important:

- The success URL alone should not grant access.
- Webhook confirmation should update final access state.

---

## Business Subscription Flow

Business subscriptions need organisation context.

### Start Business Checkout

1. Authenticated user chooses Business Team.
2. User creates or selects organisation.
3. Server verifies user can purchase for that organisation.
4. Server creates or retrieves Stripe customer for the organisation.
5. Server creates Checkout Session with organisation metadata.
6. User completes checkout.

### After Checkout

1. Stripe webhook confirms subscription.
2. Server updates `subscriptions` with `organisation_id`.
3. Server grants organisation-level entitlements.
4. Organisation owner/admin can invite staff.
5. Active organisation members inherit access from organisation entitlements.

Important:

- Business access should not be tied only to the payer's user account.
- Organisation entitlements allow team members to access training without each member having a separate Stripe customer.

---

## Team Seat Planning

Seat billing can become complex.

Do not overbuild seat billing at the start unless needed immediately.

Possible seat models:

### Simple team plan first

- Business plan includes a fixed number of seats.
- Seat limit stored as plan metadata or database field later.
- Organisation admins can invite up to the allowed number.

### Per-seat billing later

- Stripe subscription quantity represents number of seats.
- Webhooks sync subscription quantity.
- Organisation member count is checked before invitation.

Suggested initial approach:

Start with a simple business plan and avoid complex per-seat billing until the product is validated.

Future field possibilities:

- `subscriptions.seat_limit`
- `subscriptions.seat_quantity`
- `organisations.seat_limit`

---

## Webhook Plan

Stripe webhooks should update billing and entitlement state.

Webhook route should be server-side only.

Possible route:

- `/api/stripe/webhook`

Important environment variable names:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

Do not expose these to the client.

### Webhook Events to Handle First

Initial events:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

### checkout.session.completed

Use this to connect the checkout result to the user or organisation.

Actions:

- Verify metadata
- Find user or organisation
- Store customer ID if needed
- Store subscription ID if included
- Wait for subscription event if needed

### customer.subscription.created

Actions:

- Create or update subscription row
- Set plan key from price mapping
- Grant entitlements when status allows access

### customer.subscription.updated

Actions:

- Update subscription row
- Update status
- Update current period dates
- Update cancel-at-period-end state
- Recalculate entitlements

### customer.subscription.deleted

Actions:

- Mark subscription cancelled
- Expire or revoke related entitlements
- Keep user progress and organisation data

### invoice.payment_succeeded

Actions:

- Confirm subscription remains paid
- Ensure entitlements are active
- Update period fields if useful

### invoice.payment_failed

Actions:

- Mark subscription as past due if applicable
- Optionally apply grace period rules
- Do not delete progress or organisation data

---

## Webhook Security Rules

Stripe webhook handling must be strict.

Rules:

- Verify Stripe webhook signatures.
- Use the raw request body for verification.
- Do not trust unsigned webhook payloads.
- Do not expose webhook secrets.
- Do not process events twice without idempotency protection.
- Log safe metadata only.
- Never log secret keys.

A future `stripe_events` table may be useful for idempotency.

### stripe_events Later

Possible fields:

- `id` uuid primary key
- `stripe_event_id` text unique
- `event_type` text
- `processed_at` timestamptz nullable
- `status` text
- `error_message` text nullable
- `created_at` timestamptz

This table is useful once webhook complexity grows.

---

## Customer Portal Plan

Stripe Customer Portal should allow users or organisation owners to manage billing.

Possible route:

- `/api/stripe/customer-portal`

Access rules:

### Individual user

Allowed when:

- User is authenticated.
- User owns the Stripe customer or subscription.

### Business owner/admin

Allowed when:

- User is authenticated.
- User has owner/admin membership in the organisation.
- Organisation has a Stripe customer ID.

The portal route should create the session server-side and redirect the user to Stripe.

---

## Environment Variable Names

Exact values must not be exposed or committed.

Likely server-side Stripe variables:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_INDIVIDUAL_PRO_MONTHLY`
- `STRIPE_PRICE_INDIVIDUAL_PRO_YEARLY`
- `STRIPE_PRICE_BUSINESS_TEAM_MONTHLY`
- `STRIPE_PRICE_BUSINESS_TEAM_YEARLY`

Likely public Stripe variable if client-side Stripe.js is needed later:

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

Important:

- `NEXT_PUBLIC_` variables are exposed to the browser.
- Secret keys must not use `NEXT_PUBLIC_`.
- Price IDs are not secret, but should still be managed carefully through configuration.

---

## Access Gating Strategy

Feature gates should check entitlements rather than Stripe directly.

### Example gates

#### Full Academy

Requires:

- `academy_pro` user entitlement, or
- `academy_pro` organisation entitlement through active membership

#### Pro Sandbox

Requires:

- `sandbox_pro` user entitlement, or
- `sandbox_pro` organisation entitlement through active membership

#### Tool Intelligence

Requires:

- `tool_intelligence` user entitlement, or
- `advanced_tool_intelligence` organisation entitlement where applicable

#### Business Dashboard

Requires:

- Active organisation membership
- Organisation role of owner/admin/manager as appropriate
- `business_dashboard` organisation entitlement

#### Staff Training Assignment

Requires:

- Active organisation membership
- Organisation role of owner/admin/manager as appropriate
- `team_training` organisation entitlement

---

## Subscription State and Access Rules

Final access rules should be written before implementation.

Suggested first rules:

### Grant paid access

Grant access when subscription status is:

- `active`
- `trialing`

### Grace access maybe

Consider temporary access when status is:

- `past_due`

Decision needed:

- Allow grace period or lock immediately?

### Remove paid access

Remove or expire access when status is:

- `canceled`
- `unpaid`
- `incomplete_expired`

### Incomplete checkout

Do not grant access when status is:

- `incomplete`

---

## Data Retention and Downgrade Behaviour

When a user or organisation loses paid access:

Do not delete:

- User profile
- Lesson progress
- Sandbox attempt history
- Organisation record
- Historical assignments
- Historical retraining flags

Restrict access to:

- Pro lessons
- Pro sandbox tasks
- Paid tool intelligence
- Business dashboard features
- Advanced reporting

The user experience should explain that paid access needs renewal without destroying trust.

---

## Trials and Promotions

Trials and promotions can be implemented through entitlements.

Possible approaches:

### Stripe trial

Stripe subscription has trial period.

Webhook sets subscription status to `trialing`.

Entitlements are active while trialing.

### Admin-granted trial

Admin creates entitlement with:

- `source`: `admin_grant` or `trial`
- `status`: `active`
- `ends_at`: trial end date

### Promotion code

Stripe promotion codes can be used for discounts.

The app should still rely on webhook subscription state and entitlements for access.

---

## Refunds, Failed Payments, and Disputes

These do not need full automation at launch, but the plan should not block them.

Future events to consider:

- `charge.refunded`
- `charge.dispute.created`
- `customer.subscription.paused`
- `customer.subscription.resumed`

Initial handling can be manual for refunds and disputes if volume is low.

Access should be reviewed carefully for disputed payments.

---

## Billing UI Pages

Suggested future pages:

### `/pricing`

Public pricing page.

Should show:

- Free
- Individual Pro
- Business Team
- Business Pro later or contact option

### `/account/billing`

User billing page.

Should show:

- Current individual plan
- Billing portal button
- Upgrade/downgrade options if supported

### `/business/billing`

Organisation billing page.

Should show:

- Organisation plan
- Seat/member summary if implemented
- Billing portal button for owner/admin

### `/upgrade`

Focused conversion page for locked features.

Should explain what the user unlocks.

---

## Public Pricing Page Trust Standards

The pricing page should not overclaim.

It should clearly explain:

- What is included
- Who the plan is for
- Whether content is updated
- Whether business features include staff tracking
- What is not included yet
- Whether prices are monthly or yearly
- Whether VAT/tax is handled by Stripe where applicable

The page should avoid vague AI hype.

It should connect pricing to practical value:

- Stay current as AI changes
- Learn with version-aware lessons
- Practise in sandbox tasks
- Get tool recommendations for real scenarios
- Train staff with retraining flags after major updates

---

## Admin and Support Considerations

Platform admin may need to:

- View subscription state
- View entitlement state
- Grant temporary access
- Revoke incorrect access
- Help a business owner identify the billing portal
- Check webhook processing status

Admin tools should not expose secret values.

Manual admin entitlement grants should be auditable later.

---

## Stripe Test Mode Plan

Implementation should start in Stripe test mode.

Before live mode:

- Test checkout success
- Test checkout cancellation
- Test subscription created event
- Test subscription updated event
- Test subscription cancelled event
- Test failed payment event
- Test customer portal session
- Confirm entitlements update correctly
- Confirm cancelled access degrades safely
- Confirm user progress remains intact
- Confirm business organisation entitlements work

Test cards and Stripe CLI can be used locally later.

---

## Security Risks to Avoid

Do not:

- Commit Stripe secret keys
- Put Stripe secret keys in client components
- Use `NEXT_PUBLIC_` for secret keys
- Trust success page redirects as proof of payment
- Let browser clients insert or update entitlements directly
- Let users change their own subscription status
- Let users grant themselves organisation access
- Log raw webhook secrets
- Skip webhook signature verification
- Hard-code live price IDs throughout the UI
- Delete user progress when subscription ends

---

## Suggested Initial Build Order

### Phase 1: Pricing and entitlement placeholders

Goals:

- Define plan keys
- Define entitlement keys
- Build pricing page copy later
- Add database tables for subscriptions and entitlements when migrations begin

No Stripe API integration yet.

### Phase 2: Individual Pro Checkout

Goals:

- Server-side Checkout Session creation
- Stripe customer mapping to user
- Webhook handling
- User subscription row
- User entitlements
- Basic account billing page

### Phase 3: Customer Portal

Goals:

- Individual users can manage billing in Stripe Customer Portal
- Subscription updates sync through webhooks

### Phase 4: Business Team Checkout

Goals:

- Organisation-aware Checkout
- Organisation subscription row
- Organisation entitlements
- Business owner/admin billing portal

### Phase 5: Team seat limits later

Goals:

- Seat quantity or fixed seat limit
- Invitation limit enforcement
- Optional per-seat billing

Do not build this before the first business subscription flow is proven.

---

## Open Decisions

These decisions should be made before Stripe implementation:

1. Exact first paid plan names.
2. Exact first prices.
3. Whether to launch Individual Pro first or Business Team first.
4. Whether Free users can save progress.
5. Whether Business Team includes full sandbox access or limited sandbox access.
6. Whether Business Team billing is fixed package or per-seat from the beginning.
7. Whether cancelled subscriptions keep access until period end.
8. Whether `past_due` subscriptions receive a grace period.
9. Whether public pricing shows Business Pro or uses a contact prompt.
10. Whether tax/VAT messaging is needed on pricing pages at launch.
11. Whether account deletion should cancel Stripe subscriptions automatically or require separate billing portal action.
12. Whether admin-granted entitlements need an audit table in the first implementation.

---

## Non-Goals for the First Stripe Build

Do not build these first:

- Complex enterprise billing
- Per-seat proration logic
- Coupon management UI
- Full invoice history UI
- Custom enterprise contracts
- SSO-based billing
- Multi-currency optimisation
- Usage-based billing
- Marketplace payments
- Affiliate tracking
- Advanced revenue analytics

The first Stripe build should prove:

- Paid user checkout
- Webhook-backed subscription sync
- Entitlement-based access control
- Safe cancellation/downgrade behaviour

---

## Locked Direction

DeepMindResources monetization should use Stripe for billing and internal entitlements for access control.

The first monetization architecture must support:

- Free users
- Individual Pro users
- Business team subscriptions
- Organisation-level access
- Staff training features
- Version-aware learning progress
- Gated sandbox access
- Tool intelligence access
- Safe cancellation and downgrade behaviour

Billing should never be allowed to leak secrets, bypass Row Level Security, or directly overwrite learning progress.

The paid product should be positioned around current, practical, verified AI training rather than static course access.
