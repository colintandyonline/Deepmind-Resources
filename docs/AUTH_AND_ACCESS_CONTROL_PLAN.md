# DeepMindResources Auth and Access Control Plan

## Purpose

This document defines the initial authentication and access-control plan for DeepMindResources.

DeepMindResources is a living AI training and tool-intelligence platform. Auth and permissions must support individuals, businesses, staff training, editors, validators, future agents, and paid access without weakening security or exposing private data.

This plan follows the database direction in `docs/DATABASE_ARCHITECTURE_PLAN.md`.

---

## Current Planning Scope

This is an architecture planning document, not a final implementation file.

No Supabase policies, SQL migrations, server actions, or middleware changes have been executed from this document.

The goal is to define the permission model before building:

- User sign-up and login
- Account profiles
- Business team accounts
- Staff progress dashboards
- Paid entitlements
- Editor and validator workflows
- Agent review queues
- Stripe-backed access control

---

## Core Security Principles

### 1. Supabase Auth owns identity

Supabase Auth should be the source of truth for user identity.

Application tables should reference `auth.users.id` rather than inventing a separate identity system.

### 2. Row Level Security must be enabled for private app tables

Private user data, organisation data, progress records, billing references, draft content, validation queues, and agent findings must be protected with Row Level Security.

Client-side checks are not enough.

### 3. Public content and private operations must stay separate

Published learning content may be readable by unauthenticated or authenticated users depending on the route and entitlement.

Private operational content must not be publicly readable.

Private operational content includes:

- Draft lessons
- Unpublished lesson versions
- Agent findings
- Validation queues
- Internal source notes
- Billing references
- Organisation memberships
- Staff progress
- Sandbox submissions
- Admin/editor notes

### 4. Entitlements control paid access

Roles describe what a user can do.

Entitlements describe what a user can access.

A business admin may manage a team, but their organisation still needs the correct entitlement to access paid business features.

### 5. Business data must be organisation-scoped

Business admins should only see data for organisations they belong to and manage.

A business admin from one organisation must never see another organisation's members, assignments, retraining flags, or staff progress.

### 6. Editors and validators need limited operational access

Editors and validators should be able to manage content workflows without automatically receiving full admin or billing access.

### 7. Future agents should not bypass validation

Agent-created findings should enter review queues.

Agents should not directly publish public lessons, tool comparisons, or business training recommendations without validation rules.

---

## Identity Model

### Supabase Auth

Supabase Auth should handle:

- User accounts
- Email/password login if enabled
- OAuth providers if enabled later
- Password resets
- Session handling
- Auth user IDs

The application should not store password data.

### profiles

Every authenticated user should have one profile row linked to `auth.users.id`.

Profile access rules:

- Users can read their own profile.
- Users can update safe profile fields on their own profile.
- Admins can read all profiles.
- Organisation admins can read limited profile information for members of their organisation.
- Public users cannot read private profile records.

Recommended safe user-editable fields:

- `display_name`
- `learning_level`
- `primary_goal`

Fields such as app role, billing state, or organisation permissions should not be user-editable from the client.

---

## Role Model

Roles should be simple at first.

Initial application roles:

- `learner`
- `business_admin`
- `team_member`
- `editor`
- `validator`
- `admin`

### learner

Default individual user.

Can:

- View allowed published learning content
- Track own progress
- Submit own sandbox attempts
- View own dashboard
- Manage safe profile fields

Cannot:

- View other users' progress
- View organisation dashboards unless also a member
- View draft content
- Manage subscriptions directly in database tables
- Access agent findings or validation queues

### team_member

A learner who belongs to an organisation.

Can:

- Access assigned training if organisation entitlement allows it
- View own organisation assignments
- Complete assigned lessons and sandbox tasks
- View own progress inside the organisation context

Cannot:

- View other staff progress
- Manage organisation members
- Edit organisation settings
- View billing references

### business_admin

Organisation manager or owner.

Can:

- View organisation-level dashboard data
- Invite or manage team members, depending on final implementation
- Assign learning paths, lessons, or sandbox tasks
- View progress for users in their organisation
- View retraining flags for their organisation

Cannot:

- View private data from other organisations
- Manage platform-wide content unless also editor/admin
- Access raw billing secrets
- Access unrelated user profiles

### editor

Content operator.

Can:

- Create and edit draft learning content
- Create and edit draft lesson versions
- Create and edit sandbox task drafts
- View source-backed content workflows
- Send content for validation

Cannot:

- Publish content without validation if publication rules require validation
- Access billing records by default
- Access private organisation progress unless separately authorised
- Override admin-only permissions

### validator

Trust and review operator.

Can:

- Review AI updates
- Review lesson versions
- Review sandbox task versions
- Review tool capability versions
- Review tool comparison versions
- Create validation review records
- Mark items as validated, rejected, or needing more sources

Cannot:

- Manage billing records
- Manage organisation membership by default
- Access unrelated private user progress

### admin

Platform owner/admin.

Can:

- Manage platform configuration
- Manage roles
- Access operational review queues
- Manage published and draft content
- Review organisation-level support issues
- Access billing references needed for support

Admin access should be used sparingly.

---

## Organisation Membership Model

Business features should rely on `organisations` and `organisation_memberships`.

Membership roles:

- `owner`
- `admin`
- `manager`
- `learner`

### owner

Can manage the organisation at the highest level.

Likely permissions:

- Manage organisation profile
- Manage billing portal link when Stripe is implemented
- Manage admins and managers
- View organisation-wide progress
- View retraining flags
- Assign training

### admin

Can manage staff and training.

Likely permissions:

- Invite members
- Remove members, except owner depending on final rules
- Assign training
- View organisation-wide progress
- View retraining flags

### manager

Can supervise training for assigned staff or the organisation.

Likely permissions:

- View assigned team progress
- Assign training if allowed
- View retraining flags for relevant team members

### learner

Can complete assigned training.

Likely permissions:

- View own assignments
- Complete lessons and sandbox tasks
- View own progress

---

## Entitlement Model

Entitlements should decide access to paid or gated features.

This keeps billing separate from user roles.

Example entitlement keys:

- `academy_free`
- `academy_pro`
- `sandbox_basic`
- `sandbox_pro`
- `tool_intelligence`
- `business_dashboard`
- `team_training`
- `live_ai_intelligence_feed`
- `advanced_comparisons`

### Individual entitlement examples

A solo paid user may have:

- `academy_pro`
- `sandbox_pro`
- `tool_intelligence`

### Organisation entitlement examples

A business subscription may grant the organisation:

- `team_training`
- `business_dashboard`
- `academy_pro`
- `sandbox_basic`
- `live_ai_intelligence_feed`

Members inherit access through organisation membership only while their membership is active.

---

## Access Decision Pattern

Every protected feature should answer three questions:

1. Who is the user?
2. What role or organisation membership do they have?
3. What entitlement allows this feature?

Examples:

### View own lesson progress

Allowed when:

- Authenticated user ID matches the `lesson_progress.user_id`.

### View organisation staff progress

Allowed when:

- User belongs to the same organisation.
- Membership role is `owner`, `admin`, or allowed `manager`.
- Organisation has an active business/team entitlement.

### View published free lesson

Allowed when:

- Lesson version is published.
- Lesson is free or public.

### View published pro lesson

Allowed when:

- Lesson version is published.
- User or organisation has required entitlement.

### Edit lesson draft

Allowed when:

- User has `editor` or `admin` role.

### Validate lesson version

Allowed when:

- User has `validator` or `admin` role.

### Publish lesson version

Allowed when:

- User has `admin` role, or a future approved editor workflow permits publication.
- Validation requirements are satisfied.

---

## Route-Level Protection Plan

The app should protect routes both in server logic and database policies.

Suggested route groups:

### Public marketing routes

Examples:

- `/`
- `/academy`
- `/sandbox`
- `/tool-intelligence`
- `/business-ai-training`
- `/pricing`

Access:

- Publicly visible.
- Should not expose private user data.

### Authenticated learner routes

Examples:

- `/dashboard`
- `/learning-path`
- `/sandbox/tasks`
- `/progress`
- `/settings`

Access:

- Requires authenticated user.
- Data scoped to current user.

### Business routes

Examples:

- `/business/dashboard`
- `/business/team`
- `/business/assignments`
- `/business/retraining`

Access:

- Requires authenticated user.
- Requires active organisation membership.
- Requires suitable organisation role.
- Requires business/team entitlement.

### Editor routes

Examples:

- `/editor/lessons`
- `/editor/sandbox-tasks`
- `/editor/updates`

Access:

- Requires `editor` or `admin` role.

### Validator routes

Examples:

- `/validation/queue`
- `/validation/sources`
- `/validation/reviews`

Access:

- Requires `validator` or `admin` role.

### Admin routes

Examples:

- `/admin`
- `/admin/users`
- `/admin/organisations`
- `/admin/entitlements`

Access:

- Requires `admin` role.

---

## Table-Level Access Planning

Detailed policies will be written as migrations later.

This section describes intended policy behaviour.

### profiles

Read:

- Own profile
- Admin can read all
- Organisation admins can read limited profiles for members of their organisation

Update:

- User can update safe fields on own profile
- Admin can update roles and administrative fields

Insert:

- Created automatically on user signup through trigger or server action

### organisations

Read:

- Organisation members can read their own organisation record
- Admin can read all

Update:

- Organisation owner/admin can update safe organisation fields
- Platform admin can update all

Insert:

- Controlled by server-side business onboarding flow

### organisation_memberships

Read:

- Users can read their own memberships
- Organisation owners/admins can read memberships for their organisation
- Platform admin can read all

Insert/update/delete:

- Organisation owner/admin through server-side controlled flow
- Platform admin

### learning_paths, modules, lessons

Read:

- Published records visible according to publication status and entitlement
- Draft records visible to editor, validator, admin as appropriate

Write:

- Editor/admin can create or update drafts
- Admin or approved workflow can publish

### lesson_versions

Read:

- Published versions visible according to entitlement
- Draft or review versions visible to editor, validator, admin

Write:

- Editor/admin can create draft versions
- Validator/admin can update validation status through controlled workflows
- Admin or approved workflow can update publication status

### sandbox_tasks and sandbox_task_versions

Read:

- Published tasks visible according to entitlement
- Draft/review tasks visible to editor, validator, admin

Write:

- Editor/admin can create draft task versions
- Validator/admin can validate
- Admin or approved workflow can publish

### lesson_progress

Read:

- User can read own progress
- Business admins/managers can read progress for organisation members where authorised
- Platform admin can read for support and operations

Write:

- User can create/update own progress through controlled app flows
- Server-side logic should control completion state where possible

### sandbox_attempts

Read:

- User can read own attempts
- Business admins/managers can read relevant organisation member attempts if enabled
- Platform admin can read for support and moderation

Write:

- User can create own attempts
- User can update own in-progress attempts
- Review/score fields should be controlled by server-side logic or authorised reviewer roles

### ai_updates

Read:

- Published updates may be public or gated
- Draft/review updates visible to editor, validator, admin

Write:

- Editor/admin can create or edit
- Agents can create candidate updates only through controlled server-side workflows
- Validator/admin can validate

### sources

Read:

- Public source summaries may be visible when attached to published content
- Internal source notes visible only to editor, validator, admin

Write:

- Editor, validator, admin, or trusted server-side agent workflows

### validation_reviews

Read:

- Validator/admin can read
- Editor may read reviews attached to content they can edit

Write:

- Validator/admin
- Future validator agent may create provisional reviews with separate status

### ai_tools and tool comparisons

Read:

- Published tool intelligence visible according to entitlement
- Draft/review records visible to editor, validator, admin

Write:

- Editor/admin for drafts
- Validator/admin for validation
- Admin or approved workflow for publication

### master_brain_records

Read:

- Published or approved records may support public pages
- Internal records visible to editor, validator, admin

Write:

- Controlled server-side workflows only
- Editor/admin can create and update draft records
- Validator/admin can validate

### agent_runs and agent_findings

Read:

- Admin can read all
- Editor/validator can read relevant review queues

Write:

- Server-side agent workflows only
- Users should not write directly to these tables from the browser

### subscriptions and entitlements

Read:

- User can read own entitlement summary if needed
- Organisation owner/admin can read organisation entitlement summary
- Platform admin can read all

Write:

- Stripe webhook/server-side billing code only
- Platform admin in controlled cases
- Browser clients should not directly modify billing state

---

## Server-Side Enforcement Plan

Important writes should go through server-side code rather than direct client writes.

Server-side enforcement is especially important for:

- Role changes
- Organisation membership changes
- Subscription state changes
- Entitlement changes
- Publishing content
- Validation decisions
- Agent findings
- Staff assignment creation
- Retaining audit integrity

Possible implementation layers:

- Supabase RLS policies
- Next.js server actions
- Route handlers
- Supabase service role usage only on server-side trusted code
- Stripe webhook handlers for billing state

Important:

- Service role keys must never be exposed to the client.
- Only environment variable names should be referenced in docs and code comments.
- Secret values must not be committed.

---

## Auth Middleware Direction

The Next.js app should eventually include middleware or server-side checks to protect authenticated pages.

Middleware should be used carefully.

It can help redirect unauthenticated users away from private app routes, but it should not be the only protection layer.

Database RLS and server-side checks still matter.

Suggested middleware route categories:

- Public routes: no auth required
- Learner app routes: authenticated user required
- Business routes: authenticated user required, then server checks membership and entitlement
- Editor routes: authenticated user required, then server checks role
- Validator routes: authenticated user required, then server checks role
- Admin routes: authenticated user required, then server checks role

---

## Session and Profile Bootstrap

When a new user signs up, the app should create a matching `profiles` row.

Possible approaches:

1. Supabase database trigger on `auth.users`
2. Server-side profile creation after first login
3. Hybrid: trigger creates minimal profile, app completes onboarding fields

Preferred starting approach:

- Use a Supabase trigger or safe server-side bootstrap to ensure every auth user has one profile.
- Keep the profile minimal at first.
- Collect learning preferences during onboarding later.

Initial profile defaults:

- `role`: `learner`
- `learning_level`: nullable or `beginner`
- `primary_goal`: nullable

---

## Business Onboarding Direction

Business accounts should not simply be normal users with a label.

They need organisation records and memberships.

Initial flow concept:

1. User creates account.
2. User starts business plan or requests business access.
3. Server-side flow creates organisation.
4. User becomes organisation owner.
5. Stripe subscription or admin grant creates organisation entitlements.
6. Organisation owner invites staff.
7. Staff accounts join through controlled invitation flow.

Important:

- Organisation membership should be explicit.
- Business dashboards should never infer organisation access from email domain alone.
- Email-domain matching may be added later only as a controlled convenience feature.

---

## Invitation Planning

A later invitation system may need an `organisation_invitations` table.

Possible fields:

- `id` uuid primary key
- `organisation_id` uuid references `organisations.id`
- `email` text
- `invited_role` text
- `invited_by` uuid references `auth.users.id`
- `token_hash` text
- `status` text
- `expires_at` timestamptz
- `accepted_by` uuid nullable references `auth.users.id`
- `accepted_at` timestamptz nullable
- `created_at` timestamptz

Important:

- Store invitation token hashes, not raw tokens.
- Expired and accepted invitations should not be reusable.

This table does not need to be part of the first database build unless team invites are being implemented immediately.

---

## Audit and Safety Planning

As the platform grows, audit logs will matter.

Potential future table:

### audit_events

Suggested fields:

- `id` uuid primary key
- `actor_user_id` uuid nullable references `auth.users.id`
- `actor_type` text
- `event_type` text
- `target_type` text
- `target_id` uuid nullable
- `organisation_id` uuid nullable references `organisations.id`
- `metadata` jsonb
- `created_at` timestamptz

Events worth auditing later:

- Role changes
- Organisation membership changes
- Entitlement changes
- Subscription state changes
- Lesson publication
- Lesson validation decisions
- Tool comparison publication
- Agent finding acceptance or rejection
- Business training assignment creation
- Retraining flag dismissal

Audit logging can come later, but the architecture should not block it.

---

## Access-Control Helper Concepts

The app should eventually centralise access checks instead of scattering logic everywhere.

Possible helper concepts:

- `getCurrentUserProfile()`
- `requireUser()`
- `requireAdmin()`
- `requireEditor()`
- `requireValidator()`
- `requireOrganisationMembership(organisationId)`
- `requireOrganisationRole(organisationId, allowedRoles)`
- `hasEntitlement(userId, entitlementKey)`
- `organisationHasEntitlement(organisationId, entitlementKey)`
- `canViewLesson(userId, lessonId)`
- `canViewBusinessDashboard(userId, organisationId)`

These helpers should be server-side where permissions matter.

---

## Public Content Access Strategy

DeepMindResources needs public-facing pages for SEO and trust, but the app should not leak paid content or private operations.

Suggested content access tiers:

### Public

Visible without login.

Examples:

- Marketing pages
- Public landing pages
- Selected free academy pages
- Public tool comparison summaries
- Trust methodology pages

### Free account

Requires login but not payment.

Examples:

- Basic dashboard
- Intro lessons
- Limited sandbox access
- Saved progress for free lessons

### Individual Pro

Requires user-level entitlement.

Examples:

- Full academy access
- Pro sandbox tasks
- Advanced tool intelligence
- Personal progress tracking

### Business Team

Requires organisation-level entitlement and membership.

Examples:

- Staff assignments
- Team progress dashboard
- Business training modules
- Retraining flags
- Organisation reports

### Internal Operations

Requires editor, validator, or admin role.

Examples:

- Draft lessons
- Source review
- Agent findings
- Publication queue
- Validation workflows

---

## RLS Policy Direction by Data Sensitivity

### Public-readable tables

Some rows may be public-readable when status is published.

Examples:

- Published learning paths
- Published modules
- Published lesson summaries
- Published public lesson versions
- Published public tool summaries

Policies should filter by publication status and access tier.

### Authenticated user-private tables

Rows are private to the user.

Examples:

- Lesson progress
- Sandbox attempts
- Settings/profile fields

Policies should compare `auth.uid()` to `user_id`.

### Organisation-private tables

Rows belong to an organisation.

Examples:

- Organisation memberships
- Training assignments
- Retraining flags
- Team progress rollups

Policies should verify active membership and allowed organisation role.

### Internal-only tables

Rows belong to operational workflows.

Examples:

- Agent findings
- Agent runs
- Publication queue
- Draft validation records
- Internal Master Brain records

Policies should restrict to editor, validator, admin, or server-side service role workflows.

### Billing-sensitive tables

Rows contain billing references.

Examples:

- Subscriptions
- Entitlements

Policies should allow limited read access and server-side writes only.

---

## Stripe Access-Control Boundary

Stripe will be planned in `docs/STRIPE_MONETIZATION_PLAN.md`.

Auth/access rules should still prepare for Stripe.

Important boundary rules:

- Stripe is the billing event source.
- The app database stores subscription and entitlement state needed for access checks.
- Browser clients must not directly grant themselves entitlements.
- Webhook handlers should update subscriptions and entitlements server-side.
- Access checks should use app entitlements, not live Stripe API calls on every page load.

---

## Future Agent Access Boundary

Agents should operate through controlled server-side workflows.

Agent rules:

- Agents can create findings.
- Agents can suggest updates.
- Agents can draft lesson or sandbox content.
- Agents can create provisional validation notes if allowed.
- Agents should not directly publish content to public learners.
- Agents should not directly change billing or organisation access.
- Agents should not read private user progress unless a specific authorised business-training workflow requires it.

This keeps the platform from turning into unreviewed AI slop.

---

## Initial Implementation Phases

### Phase 1: Basic learner auth

Goals:

- Supabase Auth working in the app
- Profile bootstrap
- User can view own dashboard
- User can view own progress records
- RLS enabled on private user tables

Likely tables involved:

- `profiles`
- `lesson_progress`
- `sandbox_attempts`

### Phase 2: Published content access

Goals:

- Public users can view public pages
- Authenticated users can view free account content
- Pro content can be gated by entitlement placeholder logic

Likely tables involved:

- `learning_paths`
- `modules`
- `lessons`
- `lesson_versions`
- `entitlements`

### Phase 3: Business organisation access

Goals:

- Organisations exist
- Users can belong to organisations
- Organisation admins can view team members
- Organisation admins can view team training progress

Likely tables involved:

- `organisations`
- `organisation_memberships`
- `training_assignments`
- `retraining_flags`

### Phase 4: Editor and validator access

Goals:

- Editors can draft content
- Validators can review content
- Admins can publish approved content
- Agent findings remain internal

Likely tables involved:

- `lesson_versions`
- `sandbox_task_versions`
- `sources`
- `validation_reviews`
- `agent_findings`
- `publication_queue`

### Phase 5: Stripe-backed entitlements

Goals:

- Stripe webhook updates subscription state
- Entitlements are generated or updated server-side
- Access gates read entitlements from database

Likely tables involved:

- `subscriptions`
- `entitlements`

---

## Open Decisions

These decisions should be resolved before writing final migrations and route protection code:

1. Which login methods to enable first: email/password, magic link, OAuth, or a combination.
2. Whether free users can save progress or only paid users can save progress.
3. Whether public lessons are fully readable or only summaries are public.
4. Whether business admins can assign individual lessons, whole modules, or full learning paths at launch.
5. Whether managers can see all organisation members or only assigned teams.
6. Whether editor and validator roles are stored directly on `profiles.role` or in a separate role table.
7. Whether a single user can belong to multiple organisations at launch.
8. Whether organisation invitations are required in the first auth build.
9. Whether publication requires validator approval before admin publish.
10. Whether sandbox attempts are visible to business admins by default or only assessment-type attempts.
11. Whether staff can hide personal/non-assigned learning progress from business admins.
12. Whether entitlement checks should be implemented as database functions, server helpers, or both.

---

## Non-Goals for the First Auth Build

Do not build these first:

- Complex enterprise SSO
- Full role-management UI
- Advanced audit dashboards
- Multi-organisation switching UI unless needed immediately
- Fine-grained permission builder
- Fully automated agent publication permissions
- Complex certification permissions
- Public user directory
- Social/community features

The first auth build should prove:

- Secure login
- Profile creation
- Version-aware user progress privacy
- Published content access
- Basic entitlement-gated routes

---

## Locked Direction

DeepMindResources should use Supabase Auth for identity, Row Level Security for data protection, and app-level roles plus entitlements for access decisions.

The permission model must support:

- Individual learners
- Business teams
- Organisation admins
- Staff progress tracking
- Editors
- Validators
- Platform admins
- Future agent workflows
- Stripe-backed entitlements

The system must protect private data while still allowing public-facing SEO pages and published learning content.

Security should be designed before feature speed.
