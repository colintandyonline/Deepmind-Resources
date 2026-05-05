# Business Workspace and Team Onboarding Plan

## Purpose

This document defines the business workspace and team onboarding model for DeepMind Resources before business dashboard code, staff invites, assigned training, billing seats, workspace routing, manager reporting, or business progress views are built.

The goal is to prevent the product from mixing individual learner dashboards with business workspace dashboards.

DeepMind Resources must support both individual learners and business teams, but those are different product modes with different data, permissions, routes, dashboards, progress views, and monetisation rules.

The core product loop remains:

```text
AI update -> verified meaning -> practical lesson -> sandbox task -> user skill gain
```

For business accounts, the loop becomes:

```text
AI update -> verified business meaning -> staff training -> workflow practice -> team capability gain
```

This plan should guide future database design, Supabase row-level security, dashboard routing, business onboarding, staff invitations, assigned training, Stripe seat logic, staff progress reporting, sandbox review, retraining alerts, and workspace-aware product decisions.

---

## Core Product Decision

DeepMind Resources should use a workspace model.

The product should not treat a user as permanently either an individual user or a business user.

That binary model is too limited because one authenticated person may need several contexts.

The correct model is:

```text
User account
  -> personal workspace
  -> zero, one, or many business workspaces
  -> role-based access inside each workspace
```

A single authenticated user may therefore have multiple contexts.

Examples:

```text
Colin as an individual learner
Colin as owner of the DeepMind Resources business workspace
Sarah as a staff member inside Acme Ltd
A manager as department lead inside Acme Ltd
An admin managing invites and assignments for Acme Ltd
```

This keeps the product flexible and prevents business logic being hard-coded into the personal dashboard.

---

## Product Boundary

A personal dashboard and a business dashboard are not the same product screen.

### Personal dashboard

A personal dashboard answers:

- What am I learning?
- What is my current pathway?
- What lesson should I do next?
- How far through my own path am I?
- What sandbox evidence have I submitted?
- Do I need a refresher?
- Have I earned any individual award or verified skill proof?
- What is my own account or payment state?

### Business dashboard

A business dashboard answers:

- Who is onboarded?
- Who has accepted an invite?
- Who has started training?
- Who has completed assigned training?
- Which staff submitted sandbox evidence?
- Which submissions require manager review?
- Which staff need refreshers after an AI update?
- Which roles or departments are behind?
- Are we within our seat limit?
- What should the owner, admin, or manager do next?

These questions require different data models and different permissions.

---

## What This Model Prevents

The workspace model prevents these mistakes:

- building one giant dashboard that tries to serve every user type
- showing business panels to individual learners
- showing personal learning cards to business admins when they need staff reports
- giving users business access because they clicked a business signup button
- losing the ability for one user to belong to multiple companies later
- tying billing only to a user when business billing should belong to an organisation or workspace
- exposing team progress to staff who should only see their own training
- building seat logic before membership logic exists
- faking business dashboard data before database records support it
- using frontend labels as the security model
- mixing business onboarding into the personal Academy experience

The business product must be built from workspace records, membership records, entitlements, and row-level security.

---

## Current Dashboard Position

The current `/dashboard` route is personal-only while the individual learning product is being built.

Current personal dashboard scope:

- current learning pathway
- current lesson
- lesson progress
- sandbox evidence
- refresher status
- awards or skill proof
- account state
- settings
- payments

The personal dashboard must not include:

- business workspace controls
- staff progress panels
- team onboarding
- seat management
- manager reports
- staff invite controls
- business billing owner controls
- business assignment panels
- fake team statistics
- fake company activity
- business placeholder cards

Business dashboards should be planned and built separately.

Later, `/dashboard` may become workspace-aware once workspace and membership tables exist.

Until then, `/dashboard` remains the individual learner dashboard.

---

## Long-Term Dashboard Routing Model

Once workspace tables exist, dashboard behaviour should depend on the user's active workspace and role.

### Individual Learner

Default route:

```text
/dashboard
```

Shows:

- individual Academy workspace
- personal learning paths
- own lesson progress
- own sandbox evidence
- own awards
- own refresher status
- own payment/account state

This dashboard answers:

- What am I learning?
- How far through it am I?
- What lesson should I do next?
- What sandbox evidence have I submitted?
- Do I need a refresher?
- Have I earned any verified skill proof?

### Business Owner or Admin

Possible route:

```text
/business/dashboard
```

Alternative workspace-aware route later:

```text
/dashboard?workspace={workspace_id}
```

Shows:

- team overview
- staff onboarding
- seats used
- invites pending
- assigned learning paths
- staff progress
- sandbox review queue
- retraining alerts
- business billing status

This dashboard answers:

- Who is onboarded?
- Who has started training?
- Who is falling behind?
- Which staff submitted sandbox evidence?
- What needs manager review?
- Which staff need retraining after AI updates?
- Are we within our seat limit?
- What should the business do next?

### Staff Member

Possible route:

```text
/workspace/learning
```

Alternative workspace-aware route later:

```text
/dashboard?workspace={workspace_id}
```

Shows:

- assigned company training
- personal progress inside the business workspace
- required lessons
- assigned sandbox tasks
- manager review status
- refresher requirements
- own skill evidence

This dashboard answers:

- What has my company assigned me?
- What do I need to complete?
- What sandbox task do I need to submit?
- Has my submission been reviewed?
- Do I need to refresh anything?

The exact route structure can be decided later.

The access model must be workspace-driven.

---

## Workspace Model

The core object is a workspace.

A workspace represents a learning context.

A workspace can be:

- an individual learning context
- a business/team training context

### Workspace Types

Initial workspace types:

```text
individual
business
```

### Individual Workspace

Every standard learner should have a personal workspace.

The personal workspace stores or scopes:

- personal learning progress
- personal sandbox attempts
- personal awards
- personal payment entitlement
- personal settings

The individual workspace is owned by the user.

### Business Workspace

A business workspace represents a company, organisation, or team account.

The business workspace stores or scopes:

- staff members
- business roles
- staff invites
- assigned training
- team progress
- sandbox submissions
- manager reviews
- retraining alerts
- business entitlements
- seat limits
- billing owner state

The business workspace is owned by a business owner user.

---

## Workspace Membership Model

Users belong to workspaces through membership records.

A user should not receive business dashboard access because they selected a business option during signup.

Business access must come from an active workspace membership.

A membership should define:

- which workspace the user belongs to
- which user belongs to it
- what role the user has
- whether membership is active, invited, suspended, or removed
- who invited the user
- when the user joined

This makes permissions explicit.

---

## Required Business Roles

Business workspaces need role-based access.

The full role model should eventually support:

```text
owner
admin
manager
member
```

### Owner

The owner controls the company workspace.

Responsibilities:

- owns the business workspace
- controls billing and seats later
- can invite staff
- can remove staff
- can assign admin or manager roles
- can view company-wide progress
- can view staff training status
- can view sandbox review queues
- can view retraining requirements
- can manage assigned learning paths
- can access billing and seat information when billing is wired

The owner is the highest business-level role.

### Admin

The admin manages staff and training operations.

Responsibilities:

- invite staff
- manage staff status
- assign training
- view staff progress reports
- view sandbox submissions
- view retraining alerts
- manage learning assignments

Admins should not automatically control billing unless the billing model explicitly allows it.

### Manager

The manager supervises assigned staff, departments, or groups.

Responsibilities:

- view assigned team progress
- monitor completion status
- review sandbox evidence if required
- flag staff needing support
- track role-specific readiness
- check refresher requirements

Manager support can be added after the first business version.

### Member

The member is a staff learner.

Responsibilities:

- complete assigned learning paths
- complete required lessons
- submit sandbox evidence
- respond to refreshers
- see own progress inside the company workspace
- see own review status

Members should not see other staff progress unless a later permission explicitly allows it.

---

## Initial Role Simplification

The first version can start with:

```text
owner
admin
member
```

Later additions:

```text
manager
department_lead
viewer
billing_owner
```

This keeps the first implementation manageable while leaving room for business reporting.

---

## Company Onboarding Flow

The intended business onboarding flow:

1. Company signs up.
2. Owner user account is created or authenticated.
3. Business workspace is created.
4. Owner is added as workspace owner.
5. Owner lands on the business dashboard.
6. Owner invites staff by email.
7. Staff accept invite.
8. Staff create or log into their account.
9. Staff are linked to the business workspace.
10. Owner or admin assigns learning paths.
11. Staff complete lessons and sandbox tasks.
12. Owner/admin dashboard shows progress, readiness, reviews, and retraining needs.

This flow should be server-controlled and protected by Supabase permissions.

The browser should not be able to grant business access directly.

---

## Staff Invite Flow

The staff invite flow should be explicit and secure.

Suggested flow:

1. Owner/admin enters staff email.
2. System creates a workspace invite record.
3. Invite stores a hashed token, not a raw reusable token.
4. Invite email is sent.
5. Staff member opens invite link.
6. Staff member signs up or logs in.
7. System validates invite token and expiry.
8. System creates active workspace membership.
9. Invite is marked accepted.
10. Staff member lands in assigned company training view.

Invites should support statuses:

```text
pending
accepted
expired
revoked
```

Do not infer membership from email domain alone.

Email-domain matching may be added later as a controlled convenience feature, but it must not be the security boundary.

---

## Business Dashboard Sections

The business dashboard should not look like an individual course page.

It should show operational capability and workforce readiness.

### Team Onboarding

Shows:

- seats used
- seats available
- active staff
- invites pending
- staff not started
- recently joined staff
- removed or suspended staff where relevant

Primary questions:

- How many staff are active?
- Who has not accepted their invite?
- Are we near the seat limit?
- Who needs onboarding attention?

### Assigned Training

Shows assigned learning paths such as:

- AI Fundamentals
- Safe AI Use at Work
- Prompt Engineering for Teams
- Tool Selection for Teams
- Business Workflow Mapping
- AI Output Validation

Each assignment should show:

- assigned staff
- due date where applicable
- completion rate
- staff not started
- staff in progress
- staff completed
- refresher required

Primary questions:

- What training has been assigned?
- Who has started?
- Who has finished?
- Who needs a reminder?
- Which training is now stale because AI changed?

### Readiness

Shows team capability states:

- completed
- in progress
- needs review
- refresher recommended
- not started
- overdue where due dates exist

Primary questions:

- Is the team ready to use AI safely?
- Which staff need more training?
- Which skill areas are weak?
- Which staff have practical evidence?

### Sandbox Evidence

Shows:

- staff submissions
- manager review required
- approved tasks
- rejected or needs-improvement tasks
- pending reviews
- evidence attached to skill areas

Primary questions:

- Who has submitted practical evidence?
- Which submissions need review?
- Which staff have proved applied skill?
- Which staff need to retry?

### AI Update Impact

Shows:

- lessons changed
- team retraining required
- new sandbox task available
- affected staff
- affected skill area
- recommended manager action

Primary questions:

- Did an AI update affect completed training?
- Which staff completed the old version?
- Who needs a refresher?
- What should managers assign next?

### Staff Progress

Shows:

- staff member
- role or department
- assigned paths
- lesson completion
- sandbox completion
- safety status
- last activity
- next required action

Primary questions:

- Who is active?
- Who is stuck?
- Who needs review?
- Who has completed required training?

### Billing and Seats

Shows later:

- plan tier
- seat limit
- seats used
- billing owner
- renewal state
- payment action required

Do not show fake billing records before billing is wired.

---

## Staff Dashboard Sections

A staff member inside a business workspace should see a focused learning dashboard.

Staff dashboard should show:

- assigned learning paths
- required lessons
- optional lessons where allowed
- lesson progress
- sandbox tasks assigned by the business
- submitted evidence
- manager review status
- refresher requirements
- due dates where applicable
- own awards or skill evidence
- safe-use guidance

Staff should not see:

- company-wide progress
- other staff member records
- billing controls
- invite controls
- admin settings
- seat management
- manager reports

---

## Business Progress and Reporting States

Business reporting needs clear statuses.

Suggested training statuses:

```text
not_started
in_progress
completed
needs_review
approved
needs_improvement
refresher_recommended
overdue
```

Suggested invite statuses:

```text
pending
accepted
expired
revoked
```

Suggested membership statuses:

```text
active
invited
suspended
removed
```

Suggested sandbox review statuses:

```text
not_submitted
submitted
under_review
approved
needs_improvement
rejected
```

Suggested retraining statuses:

```text
no_action_required
refresher_recommended
retraining_required
manager_review_required
completed_after_update
```

These should be stored as real data, not inferred from frontend labels only.

---

## Monetisation and Seat Logic

Business monetisation should be workspace-based.

A business plan should attach to a business workspace, not just a user.

Future business plans may include:

- seat limit
- included Academy access
- included Sandbox access
- business dashboard access
- staff progress tracking
- manager reports
- refresher tracking
- business training modules
- support level

Possible seat states:

```text
seat_available
seat_used
invite_pending
seat_over_limit
```

The billing owner may be the same as the workspace owner, but the model should allow this to differ later.

Billing data should be controlled server-side.

Do not allow browser clients to modify billing state directly.

---

## Database Tables Needed

The first business workspace database model should likely include these tables.

### workspaces

Purpose:

Stores individual and business workspace records.

Possible fields:

```text
id
name
slug
type
owner_user_id
plan_tier
status
created_at
updated_at
```

Suggested type values:

```text
individual
business
```

Suggested status values:

```text
active
trial
suspended
cancelled
archived
```

### workspace_members

Purpose:

Connects users to workspaces.

Possible fields:

```text
id
workspace_id
user_id
role
status
invited_by
joined_at
created_at
updated_at
```

Suggested role values:

```text
owner
admin
manager
member
```

Suggested status values:

```text
active
invited
suspended
removed
```

### workspace_invites

Purpose:

Stores business staff invitations.

Possible fields:

```text
id
workspace_id
email
role
token_hash
status
expires_at
invited_by
accepted_by
accepted_at
created_at
updated_at
```

Important rules:

- Store token hashes.
- Do not store reusable raw invite tokens.
- Expired invites must not be reusable.
- Accepted invites must not be reusable.
- Invite acceptance must verify the authenticated user.

### workspace_seats

Purpose:

Tracks seat allocation where useful.

Possible fields:

```text
id
workspace_id
seat_limit
seats_used
pending_invites_count
plan_tier
status
created_at
updated_at
```

This may also be calculated from memberships and billing entitlement records instead of stored directly.

### workspace_learning_assignments

Purpose:

Stores assigned learning paths or lessons for staff.

Possible fields:

```text
id
workspace_id
assigned_by
assigned_to_user_id
assigned_to_group_id
learning_path_id
module_id
lesson_id
required
due_at
status
created_at
updated_at
```

Assignments may target individual users first.

Groups and departments can come later.

### workspace_staff_progress

Purpose:

Stores or materialises staff progress for reporting.

Possible fields:

```text
id
workspace_id
user_id
learning_path_id
lesson_id
lesson_version_id
status
completed_at
last_activity_at
refresher_required
created_at
updated_at
```

This may be derived from lesson progress tables, but a reporting table may be useful later.

### workspace_sandbox_results

Purpose:

Tracks sandbox evidence in a business context.

Possible fields:

```text
id
workspace_id
user_id
sandbox_task_id
sandbox_task_version_id
attempt_id
status
review_status
reviewed_by
reviewed_at
created_at
updated_at
```

### workspace_retraining_alerts

Purpose:

Tracks retraining needs caused by updated lessons, sandbox tasks, tool comparisons, safety recommendations, or AI intelligence.

Possible fields:

```text
id
workspace_id
affected_user_id
learning_path_id
lesson_id
lesson_version_id
source_update_id
alert_type
status
created_at
updated_at
```

Suggested alert types:

```text
lesson_updated
sandbox_updated
policy_updated
tool_recommendation_changed
business_training_changed
```

---

## Relationship to Existing Auth Model

Supabase Auth owns the user identity.

Application tables should reference authenticated user IDs.

A user profile is not enough to grant business access.

Business access should require:

1. authenticated user
2. active workspace membership
3. correct role
4. correct entitlement or plan state where needed

Frontend-only checks are not enough.

Database policies and server-side checks are required.

---

## Route Protection Rules

Business routes should require authentication and workspace membership.

Suggested future route groups:

```text
/business/dashboard
/business/team
/business/invites
/business/assignments
/business/progress
/business/sandbox-reviews
/business/retraining
/business/billing
```

Access rules:

- owner/admin can access business settings, team, invites, assignments, and reports
- manager can access assigned reports and review queues where allowed
- member can access assigned training and own progress only
- unauthenticated users redirect to login
- users without workspace membership cannot access the business workspace
- users from another workspace cannot access unrelated workspace records

---

## Row Level Security Direction

Business data must be workspace-scoped.

RLS policies should ensure:

- users can read their own memberships
- workspace owners/admins can read members of their workspace
- workspace owners/admins can manage invites for their workspace
- staff can read their own assigned training
- staff can read their own progress
- staff cannot read other staff progress
- owners/admins can read staff progress inside their workspace
- users cannot access another workspace's data
- billing writes are server-side only

Service role keys must never be exposed to the browser.

---

## Dashboard Detection Logic

Once workspace tables exist, dashboard logic should follow this pattern:

1. Get authenticated user.
2. Get user's active workspace memberships.
3. If user has no business workspace, show personal dashboard.
4. If user has one business workspace and role is owner/admin, route or offer business dashboard.
5. If user has one business workspace and role is member, show staff training dashboard.
6. If user has multiple workspaces, show workspace switcher.
7. Store active workspace preference if needed.

Current dashboard should remain personal-only until this model is implemented.

Do not half-wire business panels into the personal dashboard.

---

## Workspace Switcher Direction

Later, users with multiple contexts may need a workspace switcher.

Example contexts:

```text
Personal workspace
DeepMind Resources business workspace
Acme Ltd staff workspace
```

Switcher should show:

- workspace name
- workspace type
- user role
- active state

Do not add this UI until workspace membership data exists.

---

## Business Training Assignments

Business training should be assignable by owners/admins.

Assignment target options over time:

1. individual staff member
2. role
3. department
4. entire workspace

Initial build should start with individual assignment or whole-workspace assignment.

Assignment should include:

- learning path
- required or optional
- due date where useful
- status
- assigned by
- assigned at

Do not overbuild departments before basic staff assignment works.

---

## Sandbox Review Model

Business sandbox tasks may need review.

Reviewers may be:

- owner
- admin
- manager
- platform reviewer later

Review outcomes:

```text
approved
needs_improvement
rejected
```

A sandbox submission should not automatically become verified business skill evidence unless the task rules allow automatic scoring.

For business training, manager review is valuable because it proves workplace readiness.

---

## Retraining Logic

Retraining is one of the most important business features.

When a lesson, sandbox task, tool comparison, or business safety recommendation changes, the system should be able to flag affected staff.

Example:

```text
Staff member completed Safe AI Use at Work v1.
A verified update changes the recommended data handling policy.
Lesson becomes v2.
Business dashboard shows refresher recommended.
Manager can assign updated lesson.
Staff completion after update clears alert.
```

Retraining states should be version-aware.

Do not overwrite historical completions.

---

## Business Dashboard Definition of Done

A business dashboard is ready only when it can show real workspace data or honest empty states.

It must show:

- workspace name
- user role
- active staff count
- pending invite count
- assigned training state
- staff progress state
- sandbox review state
- retraining state
- billing/seat state when available

It must not show:

- fake staff
- fake completion percentages
- fake revenue
- fake billing data
- fake AI update alerts
- placeholder demo companies
- public marketing copy

---

## Staff Dashboard Definition of Done

A staff dashboard is ready only when it can show assigned training or honest empty states.

It must show:

- assigned paths
- own progress
- next required lesson
- sandbox task status
- review status
- refresher status
- safe-use reminders where relevant

It must not show:

- other staff progress
- billing
- team management
- owner/admin controls
- fake tasks
- fake awards

---

## Build Order

The recommended build order is:

1. Create this planning document.
2. Create database migration for `workspaces`, `workspace_members`, and `workspace_invites`.
3. Add RLS policies for workspace ownership and membership.
4. Create workspace bootstrap for individual users.
5. Create business workspace creation flow.
6. Add owner membership creation.
7. Add dashboard workspace detection.
8. Create separate business dashboard route.
9. Create honest business dashboard empty state.
10. Add staff invite creation flow.
11. Add invite acceptance flow.
12. Add assigned training records.
13. Add staff learning dashboard mode.
14. Add sandbox evidence reporting.
15. Add manager/admin review flow.
16. Add retraining alert model.
17. Add billing and seat logic.
18. Add workspace switcher for multi-workspace users.

Do not jump to business dashboard UI before workspace membership and permissions are planned.

---

## Near-Term Next Step

After this document is committed, the next practical build step should be a database planning or migration file for:

```text
workspaces
workspace_members
workspace_invites
```

That migration should be small, reviewed carefully, and RLS-aware.

Do not wire business dashboard UI into the personal dashboard.
