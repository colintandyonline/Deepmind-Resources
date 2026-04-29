# DeepMindResources Database Architecture Plan

## Purpose

This document defines the first database architecture plan for DeepMindResources.

DeepMindResources must not become a static course website. The database must support a living AI training system where courses, lessons, sandbox tasks, tool intelligence, AI updates, validation records, and user progress can evolve as the AI landscape changes.

The product promise is:

AI update → verified meaning → practical lesson → sandbox task → user skill gain

The database must preserve that loop from the beginning.

---

## Current Planning Scope

This is an architecture planning document, not a final migration file.

No SQL has been executed from this document.

The goal is to define the core data model before building:

- Authentication and access control
- Stripe monetisation
- Business dashboards
- Agent automation
- Course publishing workflows
- User progress tracking
- Master Brain knowledge workflows

---

## Core Architecture Principles

### 1. Living content, not static content

Courses, modules, lessons, sandbox tasks, and assessments must be versioned.

The platform must be able to tell whether a user completed a lesson before or after a meaningful update.

The database should support states such as:

- Lesson completed before update
- Refresher recommended
- New sandbox task available
- Business staff retraining required
- Lesson revision pending validation
- Lesson retired or superseded

### 2. Verified knowledge first

DeepMindResources should not publish unverified AI slop.

The database must separate raw findings from validated knowledge.

A future agent may discover a claim, but that claim should not automatically become a published lesson, tool recommendation, or comparison.

### 3. Source-backed records

Important claims, updates, comparisons, and recommendations should be traceable to sources.

Sources should store enough metadata to support trust, review, and revalidation.

### 4. Human-reviewable automation

The long-term system may use specialist agents, but the first database should allow staged review states rather than assuming fully automated publishing.

### 5. Business training support from day one

Even if business dashboards come later, the data model should support teams, organisations, staff assignments, progress tracking, and retraining flags.

### 6. Supabase-first, Postgres-compatible design

The project uses Supabase, so the schema should work well with:

- PostgreSQL tables
- UUID primary keys
- Row Level Security
- Supabase Auth user IDs
- timestamps
- JSONB metadata where flexible structure is needed
- future edge functions or server actions

---

## Primary Entity Groups

The database should be organised around these core groups:

1. Identity and organisations
2. Academy structure
3. Lesson versioning
4. Sandbox tasks
5. Progress and completion tracking
6. Live AI intelligence feed
7. Tool intelligence and comparisons
8. Source and validation records
9. Master Brain knowledge records
10. Agent findings and review queues
11. Business training and retraining records
12. Billing and entitlement references

---

## 1. Identity and Organisations

Authentication itself should be handled through Supabase Auth.

Application tables should reference Supabase Auth users by `auth.users.id`.

### profiles

Stores public and app-level user profile information.

Suggested fields:

- `id` uuid primary key, references `auth.users.id`
- `display_name` text
- `email` text
- `role` text
- `learning_level` text
- `primary_goal` text
- `created_at` timestamptz
- `updated_at` timestamptz

Initial role values could include:

- `learner`
- `business_admin`
- `team_member`
- `editor`
- `validator`
- `admin`

Notes:

- Email may also exist in Supabase Auth. If stored here, it should be for app convenience only.
- Permissions should not rely on client-side role checks alone.

### organisations

Represents businesses, teams, or client organisations.

Suggested fields:

- `id` uuid primary key
- `name` text
- `slug` text unique
- `organisation_type` text
- `status` text
- `created_at` timestamptz
- `updated_at` timestamptz

Status values could include:

- `active`
- `trial`
- `suspended`
- `cancelled`

### organisation_memberships

Connects users to organisations.

Suggested fields:

- `id` uuid primary key
- `organisation_id` uuid references `organisations.id`
- `user_id` uuid references `auth.users.id`
- `membership_role` text
- `status` text
- `invited_by` uuid references `auth.users.id`
- `joined_at` timestamptz
- `created_at` timestamptz
- `updated_at` timestamptz

Membership roles could include:

- `owner`
- `admin`
- `manager`
- `learner`

This table will be important for business dashboards, staff assignment, and team progress reporting.

---

## 2. Academy Structure

The Academy needs structured learning paths without hard-coding the course map into the UI.

### learning_paths

Represents major learning journeys.

Examples:

- AI Fundamentals
- Prompt Engineering
- AI Tool Selection
- AI for Business Productivity
- Tool Calling and Functions
- AI Agents
- RAG and Knowledge Systems
- Agentic Workflows
- Multi-Agent Systems
- AI Safety, Validation, and Hallucination Control

Suggested fields:

- `id` uuid primary key
- `slug` text unique
- `title` text
- `short_description` text
- `long_description` text
- `level` text
- `audience` text
- `status` text
- `sort_order` integer
- `current_version_id` uuid nullable
- `created_at` timestamptz
- `updated_at` timestamptz

Status values could include:

- `draft`
- `published`
- `archived`

### modules

Represents sections within a learning path.

Suggested fields:

- `id` uuid primary key
- `learning_path_id` uuid references `learning_paths.id`
- `slug` text
- `title` text
- `description` text
- `level` text
- `status` text
- `sort_order` integer
- `current_version_id` uuid nullable
- `created_at` timestamptz
- `updated_at` timestamptz

### lessons

Represents a stable lesson identity.

A lesson record should not be overwritten every time content changes. Instead, lesson content should live in `lesson_versions`.

Suggested fields:

- `id` uuid primary key
- `module_id` uuid references `modules.id`
- `slug` text
- `title` text
- `summary` text
- `level` text
- `status` text
- `sort_order` integer
- `current_version_id` uuid nullable
- `created_at` timestamptz
- `updated_at` timestamptz

Status values could include:

- `draft`
- `published`
- `needs_update`
- `retired`
- `archived`

---

## 3. Lesson Versioning

Versioning is essential because AI changes quickly.

### lesson_versions

Stores the actual versioned lesson content.

Suggested fields:

- `id` uuid primary key
- `lesson_id` uuid references `lessons.id`
- `version_number` integer
- `title` text
- `summary` text
- `content_markdown` text
- `content_json` jsonb
- `difficulty` text
- `estimated_minutes` integer
- `change_summary` text
- `change_reason` text
- `source_update_id` uuid nullable references `ai_updates.id`
- `validation_status` text
- `publication_status` text
- `published_at` timestamptz nullable
- `created_by` uuid nullable references `auth.users.id`
- `reviewed_by` uuid nullable references `auth.users.id`
- `created_at` timestamptz
- `updated_at` timestamptz

Validation status values could include:

- `unreviewed`
- `needs_sources`
- `in_review`
- `validated`
- `rejected`

Publication status values could include:

- `draft`
- `scheduled`
- `published`
- `superseded`
- `archived`

Rules:

- A lesson may have many versions.
- Only one version should be treated as current for normal learners.
- Older versions should remain available for progress history and audit.
- If a user completed an old version, the system should be able to compare that completion to the current version.

### lesson_version_sources

Connects lesson versions to supporting sources.

Suggested fields:

- `id` uuid primary key
- `lesson_version_id` uuid references `lesson_versions.id`
- `source_id` uuid references `sources.id`
- `source_role` text
- `created_at` timestamptz

Source roles could include:

- `primary`
- `supporting`
- `contradictory`
- `background`

---

## 4. Sandbox Tasks

The Agentic Sandbox should be connected to lessons and updates.

### sandbox_tasks

Represents a stable sandbox task identity.

Suggested fields:

- `id` uuid primary key
- `slug` text unique
- `title` text
- `summary` text
- `task_type` text
- `level` text
- `status` text
- `current_version_id` uuid nullable
- `created_at` timestamptz
- `updated_at` timestamptz

Task types could include:

- `prompt_test`
- `tool_calling`
- `agent_building`
- `rag_example`
- `workflow_simulation`
- `model_comparison`
- `debugging`
- `business_automation`

### sandbox_task_versions

Stores versioned sandbox task instructions and evaluation criteria.

Suggested fields:

- `id` uuid primary key
- `sandbox_task_id` uuid references `sandbox_tasks.id`
- `version_number` integer
- `instructions_markdown` text
- `starter_context` jsonb
- `expected_output` jsonb
- `evaluation_rubric` jsonb
- `related_lesson_version_id` uuid nullable references `lesson_versions.id`
- `source_update_id` uuid nullable references `ai_updates.id`
- `validation_status` text
- `publication_status` text
- `published_at` timestamptz nullable
- `created_at` timestamptz
- `updated_at` timestamptz

### lesson_sandbox_tasks

Maps lessons to sandbox tasks.

Suggested fields:

- `id` uuid primary key
- `lesson_id` uuid references `lessons.id`
- `sandbox_task_id` uuid references `sandbox_tasks.id`
- `relationship_type` text
- `sort_order` integer
- `created_at` timestamptz

Relationship types could include:

- `practice`
- `assessment`
- `optional_extension`
- `refresher`

---

## 5. Progress and Completion Tracking

Progress must be version-aware.

### lesson_progress

Tracks user progress against a specific lesson and lesson version.

Suggested fields:

- `id` uuid primary key
- `user_id` uuid references `auth.users.id`
- `lesson_id` uuid references `lessons.id`
- `lesson_version_id` uuid references `lesson_versions.id`
- `status` text
- `started_at` timestamptz nullable
- `completed_at` timestamptz nullable
- `last_seen_at` timestamptz nullable
- `score` numeric nullable
- `created_at` timestamptz
- `updated_at` timestamptz

Status values could include:

- `not_started`
- `in_progress`
- `completed`
- `needs_refresher`
- `superseded_completion`

Important logic:

- Completion is tied to `lesson_version_id`, not only `lesson_id`.
- If `lessons.current_version_id` changes after completion, the app can detect stale completion.

### sandbox_attempts

Tracks user attempts at sandbox tasks.

Suggested fields:

- `id` uuid primary key
- `user_id` uuid references `auth.users.id`
- `sandbox_task_id` uuid references `sandbox_tasks.id`
- `sandbox_task_version_id` uuid references `sandbox_task_versions.id`
- `status` text
- `input_payload` jsonb
- `output_payload` jsonb
- `self_reflection` text nullable
- `score` numeric nullable
- `feedback` text nullable
- `started_at` timestamptz nullable
- `submitted_at` timestamptz nullable
- `reviewed_at` timestamptz nullable
- `created_at` timestamptz
- `updated_at` timestamptz

Status values could include:

- `started`
- `submitted`
- `reviewed`
- `passed`
- `needs_retry`

### learning_path_progress

Stores roll-up progress by learning path.

Suggested fields:

- `id` uuid primary key
- `user_id` uuid references `auth.users.id`
- `learning_path_id` uuid references `learning_paths.id`
- `status` text
- `percent_complete` numeric
- `current_lesson_id` uuid nullable references `lessons.id`
- `started_at` timestamptz nullable
- `completed_at` timestamptz nullable
- `updated_at` timestamptz

This can be calculated from lesson progress, but a roll-up table may be useful for dashboards and performance.

---

## 6. Live AI Intelligence Feed

The intelligence feed tracks important AI updates and maps them to lessons, tools, skills, and sandbox tasks.

### ai_updates

Represents a meaningful AI update.

Suggested fields:

- `id` uuid primary key
- `slug` text unique
- `title` text
- `summary` text
- `update_type` text
- `provider` text
- `published_external_at` timestamptz nullable
- `detected_at` timestamptz
- `impact_level` text
- `audience` text
- `status` text
- `verified_meaning` text nullable
- `why_it_matters` text nullable
- `who_should_care` text nullable
- `recommended_action` text nullable
- `created_at` timestamptz
- `updated_at` timestamptz

Update types could include:

- `model_release`
- `platform_update`
- `api_change`
- `tool_release`
- `tool_deprecation`
- `pricing_change`
- `agent_framework_update`
- `coding_assistant_update`
- `business_automation_update`

Impact levels could include:

- `low`
- `medium`
- `high`
- `critical`

Status values could include:

- `detected`
- `researching`
- `needs_validation`
- `validated`
- `published`
- `ignored`
- `archived`

### ai_update_impacts

Maps updates to affected skills, lessons, tasks, or tools.

Suggested fields:

- `id` uuid primary key
- `ai_update_id` uuid references `ai_updates.id`
- `impact_target_type` text
- `impact_target_id` uuid nullable
- `impact_summary` text
- `recommended_change` text
- `requires_lesson_update` boolean
- `requires_new_lesson` boolean
- `requires_sandbox_task` boolean
- `requires_business_retraining` boolean
- `created_at` timestamptz

Target types could include:

- `learning_path`
- `module`
- `lesson`
- `sandbox_task`
- `tool`
- `skill`
- `business_training`

---

## 7. Tool Intelligence and Comparisons

Tool intelligence must support real-use-case comparison, not generic rankings.

### ai_tools

Represents tools and platforms.

Examples:

- ChatGPT
- Claude
- Codex
- Gemini
- Perplexity
- Cursor
- Replit
- Grok
- n8n
- Zapier
- LangChain
- CrewAI

Suggested fields:

- `id` uuid primary key
- `slug` text unique
- `name` text
- `provider` text
- `website_url` text nullable
- `tool_type` text
- `status` text
- `short_description` text
- `current_capability_version_id` uuid nullable
- `created_at` timestamptz
- `updated_at` timestamptz

Tool types could include:

- `chat_assistant`
- `coding_assistant`
- `research_tool`
- `automation_tool`
- `agent_framework`
- `model_provider`
- `rag_tool`
- `business_productivity_tool`

### ai_tool_capability_versions

Tracks changing tool capabilities over time.

Suggested fields:

- `id` uuid primary key
- `tool_id` uuid references `ai_tools.id`
- `version_number` integer
- `capability_summary` text
- `strengths` jsonb
- `limitations` jsonb
- `supported_use_cases` jsonb
- `pricing_notes` text nullable
- `source_update_id` uuid nullable references `ai_updates.id`
- `validation_status` text
- `published_at` timestamptz nullable
- `created_at` timestamptz
- `updated_at` timestamptz

### use_cases

Defines practical scenarios for comparison.

Suggested fields:

- `id` uuid primary key
- `slug` text unique
- `title` text
- `description` text
- `audience` text
- `status` text
- `created_at` timestamptz
- `updated_at` timestamptz

Examples:

- Best AI tool for coding
- Best AI tool for research
- Best AI tool for business automation
- Best AI tool for customer service
- Best AI tool for writing
- Best AI tool for data analysis
- Best AI tool for building agents
- Best AI tool for internal company knowledge
- Best AI tool for non-technical staff

### tool_comparisons

Represents a comparison for a specific use case.

Suggested fields:

- `id` uuid primary key
- `slug` text unique
- `use_case_id` uuid references `use_cases.id`
- `title` text
- `summary` text
- `status` text
- `current_version_id` uuid nullable
- `created_at` timestamptz
- `updated_at` timestamptz

### tool_comparison_versions

Stores versioned comparison content.

Suggested fields:

- `id` uuid primary key
- `tool_comparison_id` uuid references `tool_comparisons.id`
- `version_number` integer
- `comparison_markdown` text
- `ranking_json` jsonb
- `decision_matrix` jsonb
- `best_for` jsonb
- `not_recommended_for` jsonb
- `confidence_score` numeric
- `validation_status` text
- `publication_status` text
- `published_at` timestamptz nullable
- `created_at` timestamptz
- `updated_at` timestamptz

This versioning prevents old comparisons from silently remaining current after major tool changes.

---

## 8. Sources and Validation Records

### sources

Stores source metadata.

Suggested fields:

- `id` uuid primary key
- `source_type` text
- `title` text
- `url` text nullable
- `publisher` text nullable
- `author` text nullable
- `published_at` timestamptz nullable
- `retrieved_at` timestamptz
- `trust_level` text
- `summary` text nullable
- `raw_excerpt` text nullable
- `content_hash` text nullable
- `created_at` timestamptz
- `updated_at` timestamptz

Source types could include:

- `official_docs`
- `release_notes`
- `api_docs`
- `github_repo`
- `research_paper`
- `trusted_article`
- `vendor_marketing`
- `social_post`
- `internal_test`

Trust levels could include:

- `official`
- `trusted`
- `mixed`
- `weak`
- `untrusted`

### validation_reviews

Stores validation decisions for updates, claims, lessons, comparisons, and tasks.

Suggested fields:

- `id` uuid primary key
- `review_target_type` text
- `review_target_id` uuid
- `review_status` text
- `confidence_score` numeric
- `review_summary` text
- `issues_found` jsonb
- `reviewed_by` uuid nullable references `auth.users.id`
- `reviewed_at` timestamptz nullable
- `created_at` timestamptz
- `updated_at` timestamptz

Review target types could include:

- `ai_update`
- `lesson_version`
- `sandbox_task_version`
- `tool_capability_version`
- `tool_comparison_version`
- `master_brain_record`
- `agent_finding`

Review statuses could include:

- `pending`
- `validated`
- `rejected`
- `needs_more_sources`
- `conflicting_sources`

---

## 9. Master Brain Knowledge Records

The Master Brain is the central verified knowledge base.

It should not be a loose pile of scraped data.

### master_brain_records

Stores validated knowledge units.

Suggested fields:

- `id` uuid primary key
- `record_type` text
- `title` text
- `summary` text
- `canonical_content` text
- `structured_content` jsonb
- `confidence_score` numeric
- `validation_status` text
- `publication_status` text
- `current_version_number` integer
- `superseded_by_record_id` uuid nullable references `master_brain_records.id`
- `created_at` timestamptz
- `updated_at` timestamptz

Record types could include:

- `platform_knowledge`
- `tool_capability`
- `model_release_note`
- `official_docs_summary`
- `lesson_material`
- `sandbox_task`
- `tool_comparison`
- `verified_claim`
- `update_history`

### master_brain_record_sources

Connects Master Brain records to sources.

Suggested fields:

- `id` uuid primary key
- `master_brain_record_id` uuid references `master_brain_records.id`
- `source_id` uuid references `sources.id`
- `source_role` text
- `created_at` timestamptz

---

## 10. Agent Findings and Review Queues

Agent automation should start small and be reviewable.

### agent_runs

Tracks each agent execution.

Suggested fields:

- `id` uuid primary key
- `agent_type` text
- `status` text
- `started_at` timestamptz
- `finished_at` timestamptz nullable
- `input_payload` jsonb
- `output_summary` text nullable
- `error_message` text nullable
- `created_at` timestamptz

Initial agent types:

- `scout`
- `tool`
- `use_case`
- `comparison`
- `lesson_builder`
- `sandbox_builder`
- `validator`
- `noise_filter`
- `business_training`

### agent_findings

Stores candidate findings before validation.

Suggested fields:

- `id` uuid primary key
- `agent_run_id` uuid references `agent_runs.id`
- `finding_type` text
- `title` text
- `summary` text
- `raw_payload` jsonb
- `confidence_score` numeric nullable
- `status` text
- `related_source_id` uuid nullable references `sources.id`
- `created_at` timestamptz
- `updated_at` timestamptz

Finding statuses could include:

- `new`
- `triaged`
- `needs_validation`
- `accepted`
- `rejected`
- `ignored`

### publication_queue

Stores items awaiting editorial or validation decisions.

Suggested fields:

- `id` uuid primary key
- `queue_target_type` text
- `queue_target_id` uuid
- `priority` text
- `status` text
- `assigned_to` uuid nullable references `auth.users.id`
- `notes` text nullable
- `created_at` timestamptz
- `updated_at` timestamptz

---

## 11. Business Training and Retraining

Business support is a major commercial angle, so the database must support staff learning and retraining from the beginning.

### training_assignments

Assigns learning paths, lessons, or sandbox tasks to users or organisations.

Suggested fields:

- `id` uuid primary key
- `organisation_id` uuid nullable references `organisations.id`
- `assigned_to_user_id` uuid nullable references `auth.users.id`
- `assigned_by_user_id` uuid nullable references `auth.users.id`
- `target_type` text
- `target_id` uuid
- `required` boolean
- `due_at` timestamptz nullable
- `status` text
- `created_at` timestamptz
- `updated_at` timestamptz

Target types could include:

- `learning_path`
- `module`
- `lesson`
- `sandbox_task`

### retraining_flags

Flags users or organisations when AI updates affect already-completed training.

Suggested fields:

- `id` uuid primary key
- `organisation_id` uuid nullable references `organisations.id`
- `user_id` uuid nullable references `auth.users.id`
- `ai_update_id` uuid references `ai_updates.id`
- `affected_target_type` text
- `affected_target_id` uuid
- `reason` text
- `severity` text
- `status` text
- `created_at` timestamptz
- `resolved_at` timestamptz nullable

Severity values could include:

- `low`
- `medium`
- `high`
- `critical`

Status values could include:

- `open`
- `acknowledged`
- `completed`
- `dismissed`

---

## 12. Billing and Entitlement References

Stripe implementation will be planned in a separate document.

The database should still reserve a clean place for entitlement references.

### subscriptions

Stores Stripe subscription references and app-level subscription state.

Suggested fields:

- `id` uuid primary key
- `user_id` uuid nullable references `auth.users.id`
- `organisation_id` uuid nullable references `organisations.id`
- `stripe_customer_id` text nullable
- `stripe_subscription_id` text nullable
- `plan_key` text
- `status` text
- `current_period_start` timestamptz nullable
- `current_period_end` timestamptz nullable
- `created_at` timestamptz
- `updated_at` timestamptz

Important:

- Store Stripe IDs, not secret keys.
- Stripe webhook handling should be planned separately.

### entitlements

Stores what a user or organisation can access.

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

Entitlement examples:

- `academy_free`
- `academy_pro`
- `sandbox_basic`
- `sandbox_pro`
- `tool_intelligence`
- `business_dashboard`
- `team_training`

---

## Versioning and Refresh Logic

The most important technical rule is that progress must be tied to content versions.

### Lesson refresh detection

A user may have:

- Completed lesson version 1
- Current lesson version is now version 3
- Version 2 was a minor copy edit
- Version 3 changed the practical skill meaningfully

The system should be able to decide whether the user needs a refresher.

This likely requires a future field on lesson versions such as:

- `refresh_required_from_previous_versions` boolean
- `minimum_valid_previous_version` integer nullable
- `change_significance` text

Change significance values could include:

- `minor`
- `moderate`
- `major`
- `breaking`

### Sandbox refresh detection

If a lesson changes because a model, API, tool, or agent framework changes, related sandbox tasks may also need new versions.

The system should support:

- New task available
- Existing task still valid
- Existing task deprecated
- Existing task requires revised instructions

### Business retraining detection

For teams, major updates should be able to trigger retraining flags.

Example:

A business team completed an internal training module on AI tool selection. A major platform update changes the recommendation for customer service automation. The platform should flag affected users or teams for retraining.

---

## Suggested Initial Build Order

The first implementation should stay simple and avoid premature automation.

### Phase 1: Core foundation

Create tables for:

1. `profiles`
2. `learning_paths`
3. `modules`
4. `lessons`
5. `lesson_versions`
6. `sandbox_tasks`
7. `sandbox_task_versions`
8. `lesson_progress`
9. `sandbox_attempts`

Goal:

Support versioned lessons, versioned sandbox tasks, and version-aware progress.

### Phase 2: Source and update intelligence

Create tables for:

1. `sources`
2. `ai_updates`
3. `ai_update_impacts`
4. `lesson_version_sources`
5. `validation_reviews`

Goal:

Support the live AI intelligence loop and verified update-to-lesson workflow.

### Phase 3: Tool intelligence

Create tables for:

1. `ai_tools`
2. `ai_tool_capability_versions`
3. `use_cases`
4. `tool_comparisons`
5. `tool_comparison_versions`

Goal:

Support real scenario-based AI tool comparison.

### Phase 4: Business training

Create tables for:

1. `organisations`
2. `organisation_memberships`
3. `training_assignments`
4. `retraining_flags`

Goal:

Support business AI training, staff tracking, and retraining requirements.

### Phase 5: Master Brain and agents

Create tables for:

1. `master_brain_records`
2. `master_brain_record_sources`
3. `agent_runs`
4. `agent_findings`
5. `publication_queue`

Goal:

Support human-reviewable intelligence automation.

### Phase 6: Billing references

Create tables for:

1. `subscriptions`
2. `entitlements`

Goal:

Support Stripe-backed access control without mixing billing logic into learning content.

---

## Row Level Security Planning Notes

Detailed auth and access rules belong in `docs/AUTH_AND_ACCESS_CONTROL_PLAN.md`.

Initial RLS direction:

- Users can read and update their own profile.
- Users can read published learning content.
- Users can only read their own progress and sandbox attempts.
- Organisation admins can read progress for members of their organisation.
- Editors and validators can manage draft/review content.
- Public users should not be able to read unpublished lessons, agent findings, validation queues, billing records, or private organisation data.

---

## Indexing Notes

Likely important indexes:

- `profiles(id)`
- `organisation_memberships(organisation_id, user_id)`
- `learning_paths(slug)`
- `modules(learning_path_id, sort_order)`
- `lessons(module_id, sort_order)`
- `lesson_versions(lesson_id, version_number)`
- `lesson_progress(user_id, lesson_id)`
- `lesson_progress(user_id, lesson_version_id)`
- `sandbox_attempts(user_id, sandbox_task_id)`
- `ai_updates(status, impact_level)`
- `ai_updates(provider, update_type)`
- `sources(url)`
- `ai_tools(slug)`
- `tool_comparisons(use_case_id)`
- `training_assignments(organisation_id, status)`
- `retraining_flags(organisation_id, status)`

---

## Open Decisions

These need to be decided before final migrations:

1. Whether lesson content should be stored primarily as Markdown, structured JSON, or both.
2. Whether course/module/lesson versioning should be separate for each level or only at lesson level first.
3. Whether sandbox evaluation is manual first or automated from the start.
4. Whether organisations are required for business subscriptions only or also for personal teams.
5. Whether tool comparison rankings should be stored as JSONB or normalised into comparison item tables.
6. Whether Master Brain records should power published pages directly or act as a verified internal source for generated content.
7. Whether all validation reviews require a human user or whether validator agents can create provisional reviews.
8. How much raw source content should be stored versus only summaries and references.
9. How to distinguish a minor content update from an update that invalidates prior completions.
10. How long old lesson and sandbox versions should remain accessible.

---

## Non-Goals for the First Database Build

Do not build these first:

- Full agent automation
- Full Stripe subscription logic
- Complex business analytics dashboards
- Certification engine
- Public tool-ranking marketplace
- Fully automated content publishing
- Multi-agent orchestration
- Advanced recommendation engine

The first database build should prove the living-learning model:

Versioned lessons + versioned sandbox tasks + version-aware progress + source-backed AI updates.

---

## Locked Direction

The DeepMindResources database must support a living AI training and tool-intelligence platform.

The foundation should make stale content detectable, updates traceable, and progress version-aware.

This architecture should allow the product to show:

- Lesson completed before update
- Refresher recommended
- New sandbox task available
- Business staff retraining required

That is the core data-model requirement.
