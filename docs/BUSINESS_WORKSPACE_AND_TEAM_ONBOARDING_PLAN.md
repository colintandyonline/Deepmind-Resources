# Business Workspace and Team Onboarding Plan

## Purpose

This document defines the business workspace and team onboarding model for DeepMind Resources.

Important correction:

The product may use the phrase "business workspace" in user-facing copy, but the database source of truth is the existing organisation model.

Do not create a separate `workspaces` table.

Business workspace, in product language, means:

    a signed-in organisation context powered by organisations and organisation_memberships

This document exists to keep future dashboard routing, business onboarding, staff invites, assignments, progress reporting, billing, and retraining work aligned with the database that already exists.

---

## Current Confirmed Database Direction

The Supabase audit confirmed that the project already has a business and learning foundation.

The existing business-related database model includes:

    organisations
    organisation_memberships
    entitlements
    subscriptions
    training_assignments

The existing learning and practice model includes:

    user_lesson_progress
    learning_progress
    sandbox_tasks
    sandbox_task_versions
    lesson_sandbox_tasks
    sandbox_attempts
    sandbox_sessions

The existing helper function found during audit:

    deepmind_is_org_member(target_organisation_id uuid)

This means the correct next build path is to extend the organisation model, not replace it with workspace tables.

---

## Critical Build Rule

Do not create these duplicate tables:

    workspaces
    workspace_members
    workspace_invites
    workspace_seats
    workspace_learning_assignments
    workspace_staff_progress
    workspace_sandbox_results
    workspace_retraining_alerts

Those names would duplicate or conflict with the existing organisation-based model.

Use organisation-based naming instead:

    organisations
    organisation_memberships
    organisation_invitations
    organisation_seats
    organisation_sandbox_reviews
    organisation_retraining_alerts

Where an existing generic table already supports the feature, use it instead of creating an organisation-specific duplicate.

Examples:

    training_assignments already exists.
    user_lesson_progress already exists.
    sandbox_attempts already exists.
    entitlements already exists.
    subscriptions already exists.

---

## Product Language vs Database Language

The product may still use "workspace" in the interface because it is a familiar user-facing concept.

For example:

    Personal workspace
    Business workspace
    Switch workspace
    Active workspace
    Individual Academy workspace

But internally, the database model should map this as:

    Personal workspace -> individual user context
    Business workspace -> organisation context
    Workspace member -> organisation_memberships row
    Workspace role -> organisation_memberships.membership_role
    Workspace entitlement -> entitlements row scoped to user_id or organisation_id
    Workspace subscription -> subscriptions row scoped to user_id or organisation_id
    Workspace assignment -> training_assignments row scoped to organisation_id

The user-facing word "workspace" is allowed.

The database table prefix "workspace_" is not the current direction.

---

## Core Product Decision

DeepMind Resources supports both individual learners and business teams.

The correct model is:

    User account
      -> personal learning context
      -> zero, one, or many organisation contexts
      -> role-based access inside each organisation

A single authenticated user may therefore have multiple contexts.

Examples:

    Colin as an individual learner
    Colin as owner of the DeepMind Resources organisation
    Sarah as a staff learner inside Acme Ltd
    A manager supervising a team inside Acme Ltd
    An admin managing invites and assignments for Acme Ltd

This allows one user account to move between personal learning and business training without duplicating identity.

---

## Current Dashboard Position

The current `/dashboard` route is personal-only while the individual learning experience is being built.

Current personal dashboard scope:

    current learning pathway
    current lesson
    lesson progress
    sandbox evidence
    refresher status
    awards or skill proof
    account state
    settings
    payments

The personal dashboard must not include:

    business workspace controls
    staff progress panels
    team onboarding
    seat management
    manager reports
    staff invite controls
    business billing owner controls
    business assignment panels
    fake team statistics
    fake company activity

Business dashboard work should be separate.

Later, `/dashboard` may become context-aware, but only after organisation membership routing is implemented properly.

---

## Existing Organisation Model

The existing `organisations` table is the business workspace table.

Confirmed fields include:

    id
    name
    slug
    organisation_type
    status
    created_by
    created_at
    updated_at

Purpose:

    Stores businesses, teams, or organisation-level learning contexts.

Likely usage:

    organisation_type distinguishes the kind of organisation or account.
    status controls whether the organisation is active, suspended, cancelled, or similar.
    created_by identifies the user who created or initiated the organisation.

Do not add a separate `workspaces` table to represent the same concept.

---

## Existing Organisation Membership Model

The existing `organisation_memberships` table connects users to organisations.

Confirmed fields include:

    id
    organisation_id
    user_id
    membership_role
    status
    invited_by
    joined_at
    created_at
    updated_at

Purpose:

    Stores who belongs to which organisation and what role they have.

This table should power:

    business dashboard access
    staff dashboard access
    staff progress visibility
    invite acceptance
    owner/admin/manager permissions
    organisation-scoped learning assignments

Do not add `workspace_members`.

Use `organisation_memberships`.

---

## Existing Entitlement Model

The existing `entitlements` table controls access.

Confirmed fields include:

    id
    user_id
    organisation_id
    entitlement_key
    source
    status
    starts_at
    ends_at
    created_at
    updated_at

Purpose:

    Stores what a user or organisation is allowed to access.

This is important because roles and entitlements are different.

A role answers:

    What can this person do inside this organisation?

An entitlement answers:

    What paid or gated product access is active?

Examples of possible entitlement keys:

    academy_free
    academy_pro
    sandbox_basic
    sandbox_pro
    business_dashboard
    team_training
    live_ai_intelligence
    tool_intelligence

Business access should require both:

    active organisation membership
    required organisation entitlement

---

## Existing Subscription Model

The existing `subscriptions` table supports Stripe or billing-backed access.

Confirmed fields include:

    id
    user_id
    organisation_id
    plan_key
    status
    stripe_customer_id
    stripe_subscription_id
    stripe_price_id
    stripe_product_id
    current_period_start
    current_period_end
    trial_end
    cancel_at_period_end
    created_at
    updated_at

Purpose:

    Stores subscription state for users or organisations.

Business subscriptions should normally be attached to `organisation_id`.

Individual subscriptions may be attached to `user_id`.

Do not let browser clients directly modify subscription or entitlement state.

Billing writes should be server-side only.

---

## Existing Training Assignment Model

The existing `training_assignments` table already supports business learning assignments.

Confirmed fields include:

    id
    organisation_id
    assigned_by_user_id
    assigned_to_user_id
    target_type
    target_id
    required
    due_at
    status
    created_at
    updated_at

Purpose:

    Stores assigned learning paths, lessons, modules, or other training targets.

This table should power:

    staff assigned training
    required lessons
    optional training
    due dates
    owner/admin assignment flows
    staff dashboard assignment lists
    business dashboard assignment reports

Do not create `workspace_learning_assignments`.

Use `training_assignments`.

---

## Existing Lesson Progress Model

The audit found both `learning_progress` and `user_lesson_progress`.

The better future-facing table is `user_lesson_progress`.

Confirmed `user_lesson_progress` fields include:

    id
    user_id
    lesson_id
    lesson_version_id
    status
    progress_percentage
    started_at
    completed_at
    last_seen_at
    score
    notes
    refresher_recommended_at
    refresher_reason
    created_at
    updated_at

Purpose:

    Tracks lesson progress against specific lesson versions.

This is important because DeepMind Resources is a living learning system.

A user may complete version 1 of a lesson, then later need a refresher when version 2 is published.

Dashboard work should prefer `user_lesson_progress` where possible.

The older `learning_progress` table appears to be an earlier/simple module progress table.

Do not build new dashboard logic around `learning_progress` unless specifically maintaining backwards compatibility.

---

## Existing Sandbox Model

The audit confirmed a structured sandbox model.

Tables include:

    sandbox_tasks
    sandbox_task_versions
    lesson_sandbox_tasks
    sandbox_attempts
    sandbox_sessions

Confirmed `sandbox_attempts` fields include:

    id
    user_id
    sandbox_task_id
    sandbox_task_version_id
    status
    input_payload
    output_payload
    self_reflection
    score
    feedback
    started_at
    submitted_at
    reviewed_at
    created_at
    updated_at

Purpose:

    Tracks user attempts at practical sandbox tasks.

This should power:

    personal sandbox evidence
    staff sandbox submissions
    manager review queues later
    skill evidence
    business readiness reporting

Do not create `workspace_sandbox_results` yet.

If business-specific review state is needed later, extend with an organisation-scoped review table such as `organisation_sandbox_reviews`.

---

## Business Workspace Meaning

A business workspace is not a separate database table.

A business workspace is:

    an organisation record
    plus organisation membership records
    plus organisation entitlements
    plus organisation subscription state
    plus organisation-scoped assignments
    plus user progress and sandbox evidence viewed through permitted organisation membership

In product copy, it is fine to say:

    business workspace
    team workspace
    company workspace

In database and migrations, use:

    organisation
    organisation_membership
    organisation_invitations
    organisation entitlement
    organisation subscription

---

## Role Model

Business roles should be stored in `organisation_memberships.membership_role`.

The existing allowed values must be checked before writing migrations that depend on exact role names.

Desired long-term role model:

    owner
    admin
    manager
    learner

Product-facing labels may be:

    Owner
    Admin
    Manager
    Staff

Important:

    Staff in the UI should probably map to learner in the database.
    Do not introduce both member and learner unless we intentionally migrate role names.
    Do not assume role check constraints without auditing them first.

---

## Role Responsibilities

### Owner

The owner controls the organisation.

Responsibilities:

    owns the organisation context
    controls business billing later
    can invite and remove staff
    can assign admin or manager roles
    can view organisation-wide progress
    can view retraining requirements
    can manage assigned learning paths
    can view billing and seat information when wired

### Admin

The admin manages staff and training operations.

Responsibilities:

    invite staff
    manage staff status
    assign training
    view staff progress reports
    view sandbox submissions
    view retraining alerts
    manage learning assignments

Admins should not automatically control billing unless the billing model explicitly allows it.

### Manager

The manager supervises assigned staff, departments, or groups.

Responsibilities:

    view assigned team progress
    monitor completion status
    review sandbox evidence if required
    flag staff needing support
    track role-specific readiness
    check refresher requirements

Manager support can be added after the first business version.

### Learner / Staff

The learner is the staff member inside an organisation.

Responsibilities:

    complete assigned learning paths
    complete required lessons
    submit sandbox evidence
    respond to refreshers
    see own progress inside the organisation context
    see own review status

Learners should not see other staff progress unless a later permission explicitly allows it.

---

## Company Onboarding Flow

The intended organisation onboarding flow:

1. Company signs up.
2. Owner user account is created or authenticated.
3. Organisation row is created in `organisations`.
4. Owner membership row is created in `organisation_memberships`.
5. Organisation entitlement or subscription is created where relevant.
6. Owner lands on business dashboard.
7. Owner invites staff by email.
8. Staff accept invite.
9. Staff create or log into their account.
10. Staff are linked to the organisation through `organisation_memberships`.
11. Owner or admin assigns training through `training_assignments`.
12. Staff complete lessons and sandbox tasks.
13. Owner/admin dashboard shows progress, readiness, reviews, and retraining needs.

This flow must be server-controlled and protected by Supabase permissions.

The browser should not be able to grant business access directly.

---

## Staff Invitation Direction

The audit did not show an existing invitation table.

Future invitation table should use organisation naming:

    organisation_invitations

Do not create:

    workspace_invites

Suggested future fields:

    id
    organisation_id
    email
    invited_role
    token_hash
    status
    expires_at
    invited_by
    accepted_by
    accepted_at
    created_at
    updated_at

Invite status values:

    pending
    accepted
    expired
    revoked

Important rules:

    Store token hashes only.
    Do not store reusable raw invite tokens.
    Expired invites must not be reusable.
    Accepted invites must not be reusable.
    Invite acceptance must verify the authenticated user.
    Do not infer membership from email domain alone.

Email-domain matching may be added later as a controlled convenience feature, but it must not be the security boundary.

---

## Business Dashboard Sections

The business dashboard should show operational capability and workforce readiness.

It should not look like an individual course page.

### Team Onboarding

Shows:

    seats used
    seats available
    active staff
    invites pending
    staff not started
    recently joined staff
    removed or suspended staff where relevant

Primary questions:

    How many staff are active?
    Who has not accepted their invite?
    Are we near the seat limit?
    Who needs onboarding attention?

### Assigned Training

Powered by:

    training_assignments

Shows assigned training such as:

    AI Fundamentals
    Safe AI Use at Work
    Prompt Engineering for Teams
    Tool Selection for Teams
    Business Workflow Mapping
    AI Output Validation

Each assignment should show:

    assigned staff
    due date where applicable
    completion state
    staff not started
    staff in progress
    staff completed
    refresher required

### Readiness

Powered by:

    user_lesson_progress
    sandbox_attempts
    training_assignments
    organisation membership

Shows team capability states:

    completed
    in progress
    needs review
    refresher recommended
    not started
    overdue where due dates exist

### Sandbox Evidence

Powered by:

    sandbox_attempts
    sandbox_tasks
    sandbox_task_versions

Future review may require:

    organisation_sandbox_reviews

Shows:

    staff submissions
    manager review required
    approved tasks
    rejected or needs-improvement tasks
    pending reviews
    evidence attached to skill areas

### AI Update Impact

Future retraining alerts should use organisation naming.

Possible future table:

    organisation_retraining_alerts

Shows:

    lessons changed
    team retraining required
    new sandbox task available
    affected staff
    affected skill area
    recommended manager action

### Staff Progress

Powered by:

    organisation_memberships
    training_assignments
    user_lesson_progress
    sandbox_attempts

Shows:

    staff member
    role or department
    assigned paths
    lesson completion
    sandbox completion
    safety status
    last activity
    next required action

### Billing and Seats

Powered by:

    subscriptions
    entitlements

Future seat summary may be calculated from memberships and subscription plan.

Possible future table only if needed:

    organisation_seats

Do not show fake billing records before billing is wired.

---

## Staff Dashboard Sections

A staff member inside an organisation should see a focused learning dashboard.

Staff dashboard should show:

    assigned learning paths
    required lessons
    optional lessons where allowed
    lesson progress
    sandbox tasks assigned by the business
    submitted evidence
    manager review status
    refresher requirements
    due dates where applicable
    own awards or skill evidence
    safe-use guidance

Staff should not see:

    company-wide progress
    other staff member records
    billing controls
    invite controls
    admin settings
    seat management
    manager reports

---

## Dashboard Detection Logic

Once organisation-based routing is implemented, dashboard logic should follow this pattern:

1. Get authenticated user.
2. Get active organisation memberships from `organisation_memberships`.
3. If the user has no active organisation membership, show personal dashboard.
4. If the user has one organisation and role is owner or admin, route or offer business dashboard.
5. If the user has one organisation and role is manager, route or offer manager dashboard.
6. If the user has one organisation and role is learner, show staff learning dashboard.
7. If the user has multiple organisation memberships, show an organisation switcher.
8. Store active organisation preference if needed.

Current dashboard should remain personal-only until this model is implemented.

Do not half-wire business panels into the personal dashboard.

---

## Organisation Switcher Direction

Later, users with multiple contexts may need a switcher.

Example contexts:

    Personal learning
    DeepMind Resources organisation
    Acme Ltd staff account

Switcher should show:

    context name
    context type
    user role
    active state

Do not add this UI until organisation membership data exists.

---

## Business Training Assignments

Business training should be assignable by owners/admins.

Use the existing table:

    training_assignments

Assignment target options over time:

1. individual staff member
2. role
3. department
4. entire organisation

The current table supports:

    assigned_to_user_id
    target_type
    target_id
    organisation_id
    required
    due_at
    status

Initial build should start with individual assignment or whole-organisation assignment.

Do not overbuild departments before basic staff assignment works.

---

## Sandbox Review Model

Business sandbox tasks may need review.

The existing `sandbox_attempts` table stores:

    submitted_at
    reviewed_at
    score
    feedback
    status

For simple review, this may be enough.

For manager-specific review later, add an organisation-scoped table such as:

    organisation_sandbox_reviews

Possible fields:

    id
    organisation_id
    sandbox_attempt_id
    reviewer_user_id
    review_status
    review_feedback
    reviewed_at
    created_at
    updated_at

Review outcomes:

    approved
    needs_improvement
    rejected

A sandbox submission should not automatically become verified business skill evidence unless the task rules allow automatic scoring.

For business training, manager review is valuable because it proves workplace readiness.

---

## Retraining Logic

Retraining is one of the most important business features.

When a lesson, sandbox task, tool comparison, safety recommendation, or AI intelligence record changes, the system should be able to flag affected staff.

Future table should use organisation naming:

    organisation_retraining_alerts

Do not create:

    workspace_retraining_alerts

Example:

    Staff member completed Safe AI Use at Work v1.
    A verified update changes the recommended data handling policy.
    Lesson becomes v2.
    Business dashboard shows refresher recommended.
    Manager can assign updated lesson.
    Staff completion after update clears alert.

Retraining states should be version-aware.

Do not overwrite historical completions.

---

## Business Progress and Reporting States

Business reporting needs clear statuses.

Suggested assignment statuses:

    not_started
    in_progress
    completed
    needs_review
    approved
    needs_improvement
    refresher_recommended
    overdue

Suggested invitation statuses:

    pending
    accepted
    expired
    revoked

Suggested membership statuses:

    active
    invited
    suspended
    removed

Suggested sandbox review statuses:

    not_submitted
    submitted
    under_review
    approved
    needs_improvement
    rejected

Suggested retraining statuses:

    no_action_required
    refresher_recommended
    retraining_required
    manager_review_required
    completed_after_update

Before writing migrations that enforce status constraints, audit existing constraints and existing data.

---

## Monetisation and Seat Logic

Business monetisation should be organisation-based.

A business plan should attach to an organisation, not just a user.

Existing tables:

    subscriptions
    entitlements

Business plans may include:

    seat limit
    included Academy access
    included Sandbox access
    business dashboard access
    staff progress tracking
    manager reports
    refresher tracking
    business training modules
    support level

Possible future seat states:

    seat_available
    seat_used
    invite_pending
    seat_over_limit

Seat counts may be calculated from:

    organisation_memberships
    organisation_invitations
    subscriptions
    entitlements

Only add a dedicated `organisation_seats` table if calculated seat logic becomes too slow or too complex.

Billing data should be controlled server-side.

Do not allow browser clients to modify billing state directly.

---

## Route Protection Rules

Business routes should require authentication and organisation membership.

Suggested future route groups:

    /business/dashboard
    /business/team
    /business/invites
    /business/assignments
    /business/progress
    /business/sandbox-reviews
    /business/retraining
    /business/billing

Access rules:

    owner/admin can access business settings, team, invites, assignments, and reports
    manager can access assigned reports and review queues where allowed
    learner can access assigned training and own progress only
    unauthenticated users redirect to login
    users without organisation membership cannot access the organisation dashboard
    users from another organisation cannot access unrelated organisation records

---

## Row Level Security Direction

Business data must be organisation-scoped.

Existing RLS already exists on:

    organisations
    organisation_memberships
    entitlements
    subscriptions
    training_assignments
    user_lesson_progress
    sandbox_attempts

Future RLS changes should ensure:

    users can read their own memberships
    organisation owners/admins can read members of their organisation
    organisation owners/admins can manage invites for their organisation
    staff can read their own assigned training
    staff can read their own progress
    staff cannot read other staff progress
    owners/admins can read staff progress inside their organisation
    users cannot access another organisation's data
    billing writes are server-side only

Service role keys must never be exposed to the browser.

---

## Migration Rules Going Forward

Before creating any new Supabase migration:

1. Audit existing tables.
2. Audit existing columns.
3. Audit existing policies.
4. Audit existing functions.
5. Check existing migration history.
6. Prefer extending existing organisation-based tables.
7. Do not create duplicate workspace-based tables.
8. Keep migrations small.
9. Make RLS explicit.
10. Do not run SQL until the migration has been reviewed.

The previously proposed workspace migration should not be applied.

If the file exists, remove it:

    supabase/migrations/008_business_workspace_foundation.sql

The correct future migration path is organisation-based.

---

## Business Dashboard Definition of Done

A business dashboard is ready only when it can show real organisation data or honest empty states.

It must show:

    organisation name
    user role
    active staff count
    pending invite count
    assigned training state
    staff progress state
    sandbox review state
    retraining state
    billing or seat state when available

It must not show:

    fake staff
    fake completion percentages
    fake revenue
    fake billing data
    fake AI update alerts
    placeholder demo companies
    public marketing copy

---

## Staff Dashboard Definition of Done

A staff dashboard is ready only when it can show assigned training or honest empty states.

It must show:

    assigned paths
    own progress
    next required lesson
    sandbox task status
    review status
    refresher status
    safe-use reminders where relevant

It must not show:

    other staff progress
    billing
    team management
    owner/admin controls
    fake tasks
    fake awards

---

## Correct Build Order

The corrected build order is:

1. Keep this document aligned with the existing organisation model.
2. Remove any duplicate workspace migration from the repo.
3. Audit exact constraints on `organisations` and `organisation_memberships`.
4. Audit whether an invitation table already exists outside the keyword search.
5. Create `organisation_invitations` only if no invite table exists.
6. Add RLS for invitations.
7. Add owner/admin invite creation flow.
8. Add invite acceptance flow.
9. Add organisation-aware dashboard detection.
10. Create separate business dashboard route.
11. Create honest business dashboard empty state.
12. Read assigned training from `training_assignments`.
13. Read staff progress from `user_lesson_progress`.
14. Read sandbox evidence from `sandbox_attempts`.
15. Add organisation-scoped sandbox review only if needed.
16. Add retraining alert model only after lesson version refresh logic is working.
17. Add billing and seat logic using `subscriptions` and `entitlements`.
18. Add organisation switcher for users with multiple organisation memberships.

Do not jump to business dashboard UI before organisation permissions and routing are understood.

---

## Near-Term Next Step

The next practical database step should not be `workspaces`.

The next practical database step should be one of:

    audit existing organisation constraints
    audit existing organisation role values
    audit existing training assignment statuses
    create organisation_invitations if missing
    align /dashboard with existing user_lesson_progress and sandbox_attempts

The safest next build step is to remove the duplicate workspace migration, then continue with organisation-based planning and dashboard wiring.
