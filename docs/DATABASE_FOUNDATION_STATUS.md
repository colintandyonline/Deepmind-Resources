# DeepMindResources Database Foundation Status

## Purpose

This document records the current live database foundation for DeepMindResources after the initial architecture planning and Supabase migration work.

It exists as a checkpoint so future auth, UI, Stripe, dashboard, and agent work stays aligned with the main product blueprint.

---

## Blueprint Alignment Check

The current database foundation was checked against `docs/PRODUCT_BLUEPRINT.md`.

The locked product direction is:

- DeepMindResources is a living AI training and tool-intelligence platform.
- It must not become a static course website.
- The core product loop is: AI update → verified meaning → practical lesson → sandbox task → user skill gain.
- The platform must support Academy learning paths, Agentic Sandbox practice, Live AI Intelligence, Tool Intelligence, source-backed validation, and future business AI training.
- Agents should come later, after the foundation is stable.

The current database foundation supports that direction.

---

## Safety Boundary Used

The database work so far followed these rules:

- Existing MVP/dashboard tables were not dropped, renamed, or overwritten.
- No Supabase connection string was shared.
- No secrets were exposed.
- No Stripe API/webhook code was added.
- No auth UI was added.
- No dashboard redesign was performed.
- No automated agent system was created.
- All new public-schema tables were created with Row Level Security enabled.
- Sensitive/internal tables were not given public access policies.

---

## Existing MVP Tables Preserved

These pre-existing tables remain in place:

- `learning_modules`
- `learning_progress`
- `sandbox_sessions`
- `system_calibration`
- `user_profiles`

They appear to support the earlier dashboard/MVP structure.

They should be left alone until the app code is inspected and a deliberate migration/compatibility plan is created.

---

## Applied Supabase Migrations

### Migration 001: Content Foundation

Saved as:

`supabase/migrations/20260429225000_content_foundation.sql`

Created:

- `learning_paths`
- `modules`
- `lessons`
- `lesson_versions`
- `sandbox_tasks`
- `sandbox_task_versions`
- `lesson_sandbox_tasks`

Purpose:

Create the version-aware content foundation for the Academy and Agentic Sandbox.

Supports:

- Learning paths
- Modules
- Stable lesson identities
- Versioned lesson content
- Stable sandbox task identities
- Versioned sandbox task instructions
- Lesson-to-sandbox mappings

Access model:

- Published learning paths, modules, lessons, sandbox tasks, and mappings are publicly readable.
- Published lesson versions and sandbox task versions must also be validated.
- Draft, archived, unreviewed, or rejected content is not publicly readable.

---

### Migration 002: Version-Aware Progress

Saved as:

`supabase/migrations/20260429231500_version_aware_progress.sql`

Created:

- `user_lesson_progress`
- `sandbox_attempts`

Purpose:

Create version-aware learner activity tracking beside the older MVP progress/session tables.

Supports:

- Progress tied to a specific lesson version
- Detecting stale completions later
- Refresher recommendations
- Sandbox attempts tied to sandbox task versions
- User-owned sandbox submissions and feedback

Access model:

- Authenticated users can only view, insert, update, or delete their own rows.
- No public access.

---

### Migration 003: Source and Update Intelligence

Saved as:

`supabase/migrations/20260429232500_source_update_intelligence.sql`

Created:

- `sources`
- `ai_updates`
- `ai_update_impacts`
- `lesson_version_sources`
- `validation_reviews`

Purpose:

Create the first database layer for Live AI Intelligence and source-backed validation.

Supports:

- Source records
- Trust levels
- AI update records
- Update impact mapping
- Lesson-version source references
- Validation review records

Access model:

- Public sources are readable only when `is_public = true`.
- AI updates are public only when `status = 'published'`.
- AI update impacts are public only when attached to published AI updates.
- Lesson version sources are public only when the lesson chain is published, the lesson version is published and validated, and the source is public.
- `validation_reviews` has RLS enabled and no public/client policies yet.

---

### Migration 004: Tool Intelligence

Saved as:

`supabase/migrations/20260429233500_tool_intelligence.sql`

Created:

- `ai_tools`
- `ai_tool_capability_versions`
- `use_cases`
- `tool_comparisons`
- `tool_comparison_versions`

Purpose:

Create the first Tool Intelligence and comparison foundation.

Supports:

- AI tools and platforms
- Versioned tool capability records
- Use-case-driven tool comparison
- Versioned comparison content
- Confidence scoring and source/update references

Access model:

- Active AI tools are publicly readable.
- Published use cases are publicly readable.
- Published tool comparisons are publicly readable when linked to published use cases.
- Tool capability versions and comparison versions are public only when published and validated.

---

### Migration 005: Business Organisation Foundation

Saved as:

`supabase/migrations/20260429234500_business_organisation_foundation.sql`

Created:

- `organisations`
- `organisation_memberships`
- `training_assignments`
- `retraining_flags`

Purpose:

Create the first business/team training foundation without adding Stripe logic.

Supports:

- Business/team organisation records
- Organisation membership roles
- Training assignments
- Retraining flags triggered by AI updates later

Access model:

- Organisation members can view their own organisation.
- Users can view their own memberships.
- Organisation owners/admins/managers can view relevant organisation membership and training data.
- Users can view their own assignments and retraining flags.
- No public access.
- No client-side write policies were added for organisation creation, membership changes, assignments, or retraining flags.

---

### Migration 006: Billing Entitlement Placeholders

Saved as:

`supabase/migrations/20260429235500_billing_entitlement_placeholders.sql`

Created:

- `subscriptions`
- `entitlements`

Purpose:

Create the safe database layer for future Stripe-backed access control.

Supports:

- Stripe reference IDs later
- Individual subscription state later
- Organisation subscription state later
- User and organisation entitlements
- Plan keys and entitlement keys

Access model:

- Users can view their own subscriptions and entitlements.
- Organisation owners/admins can view organisation subscriptions and entitlements.
- No public access.
- No client-side insert/update/delete policies were added.
- No Stripe secret keys are stored.

---

## Current RLS Audit Result

A Supabase audit confirmed every public table currently has Row Level Security enabled.

This includes:

- Existing MVP tables
- New content tables
- New progress tables
- New source/update tables
- New tool intelligence tables
- New organisation tables
- New billing placeholder tables
- `validation_reviews`

Important:

`validation_reviews` intentionally has zero public/client policies. With RLS enabled, that keeps it locked down until editor, validator, and admin roles are implemented.

---

## Product Capabilities Now Supported by the Database

The database foundation now supports:

- Versioned learning paths, modules, lessons, and lesson versions
- Versioned sandbox tasks and sandbox task versions
- Lesson-to-sandbox task mappings
- User progress tied to lesson versions
- Sandbox attempts tied to sandbox task versions
- Refresher recommendation fields
- AI update records
- Update impact mapping
- Source references and trust levels
- Validation review records
- Tool records and capability versions
- Use-case-based tool comparisons
- Business organisations and memberships
- Staff training assignments
- Retraining flags
- Subscription and entitlement placeholders for future Stripe work

This supports the required states:

- Lesson completed before update
- Refresher recommended
- New sandbox task available
- Business staff retraining required

---

## What Has Not Been Built Yet

The following are intentionally not built yet:

- Auth UI
- Login/signup pages
- Profile bootstrap trigger
- Server-side access helper code in Next.js
- Stripe Checkout
- Stripe Customer Portal
- Stripe webhook handling
- Business dashboard UI
- Staff invite flow
- Editor dashboard
- Validator dashboard
- Agent automation
- Master Brain automation
- Update ingestion workflow
- Public academy pages connected to database data
- Seed content for the new tables

---

## Recommended Next Implementation Order

### Step 1: Save this checkpoint

This document records the live database foundation and product alignment.

### Step 2: Inspect current app code carefully

Before wiring the UI to the new tables, inspect current use of:

- `user_profiles`
- `learning_modules`
- `learning_progress`
- `sandbox_sessions`
- `system_calibration`

Do not remove or rename the existing MVP tables until the current app dependency is known.

### Step 3: Add profile/auth planning implementation

Next practical build area should be auth foundation, but still carefully:

- Confirm Supabase Auth URL settings
- Decide first login method
- Add profile bootstrap strategy
- Add server-side auth helpers
- Protect existing dashboard routes without redesigning them

### Step 4: Seed small public content set

After auth foundation is clear, create a tiny safe seed set for the new tables:

- One learning path
- One module
- One lesson
- One validated lesson version
- One sandbox task
- One validated sandbox task version

This should prove the content versioning model before adding lots of course content.

### Step 5: Build public-facing Academy pages

Build public pages properly with:

- SEO metadata
- AI-search intent
- mobile responsiveness
- trust positioning
- version-aware content language

Do not build placeholder app screens for public pages.

### Step 6: Add version-aware progress UI

Once auth is working, connect progress to `user_lesson_progress` rather than the older MVP `learning_progress` table.

### Step 7: Add update-to-refresh proof

Create one manual AI update record and use it to prove:

- update detected
- impact mapped to a lesson
- lesson marked as needing update or refresher
- sandbox task update recommended

### Step 8: Only then continue toward Stripe and business dashboards

Stripe and business dashboards should use the foundation already created, but should not be rushed before auth and access checks are reliable.

### Step 9: Agents come later

Automated agents should only be added after the foundation can handle validated updates, versioned lessons, source tracking, and human review.

---

## Locked Direction Reminder

Do not drift into building a generic course site.

Every major feature should support at least one of these blueprint goals:

1. Teach AI clearly from beginner to professional level.
2. Help users choose the right AI tools for real scenarios.
3. Track important AI platform and tool updates.
4. Verify information before publishing it.
5. Convert updates into practical lessons and sandbox tasks.
6. Support future business/team AI training.

The database foundation now supports this direction.
