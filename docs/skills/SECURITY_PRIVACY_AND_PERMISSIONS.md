# Security, Privacy and Permissions Skill

This skill defines how DeepMindResources should handle secrets, user data, business/team data, Supabase permissions, sandbox safety, agent boundaries, and public/private content separation.

Security and privacy must be considered before building accounts, progress tracking, team dashboards, business training, agent workflows, or Master Brain automation.

---

## Core Purpose

DeepMindResources will eventually store user progress, sandbox activity, tool intelligence, source records, business/team data, and agent findings.

That data must be protected properly.

The platform should be useful without exposing secrets, private learning records, business data, or internal validation notes.

---

## Core Rule

Never expose secrets, private data, internal credentials, or sensitive business information in public pages, client-side code, logs, screenshots, generated content, or agent outputs.

Security and privacy are part of the definition of done.

---

## Secrets and Environment Variables

Secrets must stay server-side.

Do not expose:

- API keys
- Service role keys
- Database passwords
- Webhook secrets
- Tokens
- Private credentials
- Agent credentials
- Internal admin keys

Environment variable names may be referenced, but secret values must not be pasted, logged, committed, or shown in the UI.

Public environment variables should only contain values that are intended to be public.

---

## Supabase Security Rules

When using Supabase, assume row-level security and permissions matter.

Before creating user-facing tables, ask:

- Who can read this row?
- Who can write this row?
- Is this user-owned, team-owned, admin-only, or public?
- Does row-level security need to be enabled?
- Does the frontend need this data?
- Could this expose another user or business team?
- Does this require server-side access only?

Do not rely on frontend hiding as a security boundary.

---

## Public vs Private Data

Public data may include:

- Published lessons
- Published sandbox tasks
- Published tool pages
- Published comparison pages
- Published AI intelligence items
- Public methodology pages

Private data may include:

- User progress
- User assessment results
- Sandbox submissions
- Team progress
- Business training records
- Internal validation notes
- Agent findings under review
- Unverified signals
- Admin-only content

Private data should never be exposed through public pages or unauthorised API routes.

---

## User Progress Privacy

User progress should be private by default.

Progress data may include:

- Lessons completed
- Sandbox tasks attempted
- Assessment results
- Confidence ratings
- Skill gaps
- Next recommendations

Only the user should see their own personal progress unless they are part of a business/team account with clear team permissions.

---

## Business and Team Data Rules

Business/team data needs extra care.

Business data may include:

- Team members
- Staff training progress
- Role assignments
- Manager reports
- Business workflows
- Tool recommendations
- Risk notes
- AI policy records
- Company-specific training plans

Only authorised team admins or managers should access team-level reporting.

Do not expose business data to other users, teams, or public pages.

---

## Agent Data Boundaries

Agents should only access the data needed for their task.

Agent outputs must not expose:

- User private data
- Business private data
- Secrets
- Internal credentials
- Sensitive source notes
- Unreviewed private records

Agent-generated public content should pass validation and privacy review before publication.

---

## Sandbox Safety Rules

Sandbox tasks should avoid unsafe or sensitive data use.

Use synthetic, sample, or anonymised data by default.

Do not require users to paste:

- Customer data
- Employee data
- Financial records
- Legal documents
- Medical information
- Credentials
- Proprietary code
- Confidential company strategy
- Private contracts

If a sandbox task involves business workflows, include privacy and approval warnings where useful.

---

## Logging Rules

Logs should help debugging without exposing sensitive data.

Do not log:

- Secret values
- Full tokens
- User private data
- Sensitive business data
- Raw private sandbox submissions
- Service role credentials

Where needed, log safe metadata such as:

- Record ID
- Status
- Timestamp
- Error code
- Non-sensitive route name
- Sanitised summary

---

## API Route Rules

API routes should enforce access checks server-side.

Before adding an API route, ask:

- Is this route public or private?
- Does it require authentication?
- Does it require team/admin permissions?
- Can the user access the requested record?
- Does the route expose sensitive fields?
- Should this run server-side only?

Never trust client-provided user IDs without verifying permissions.

---

## Public Content Safety

Public pages should not expose:

- Internal review notes
- Unverified private signals
- User progress
- Business data
- Agent scratch work
- Admin-only records
- Secret values

Public content should be intentionally selected, reviewed, and safe to publish.

---

## File and Repository Rules

Do not commit:

- `.env.local`
- Secret files
- API keys
- Tokens
- Private exports
- Database dumps with private data
- Sensitive screenshots

Documentation may mention environment variable names, but not secret values.

---

## Permission Categories

Useful permission categories may include:

- Public visitor
- Authenticated user
- Team member
- Team manager
- Team admin
- Platform admin
- Internal reviewer
- Agent/service workflow

Permissions should be explicit, not assumed.

---

## Data Minimisation Rules

Only store data that supports the product.

Before storing data, ask:

- Why do we need this?
- Who can access it?
- How long should we keep it?
- Is it sensitive?
- Can it be anonymised?
- Does it improve learning, safety, progress, or business training?

Avoid collecting private data just because it might be useful later.

---

## Review Rules

Security-sensitive features should be reviewed before release.

Review especially:

- User accounts
- Progress tracking
- Business/team dashboards
- Agent workflows
- Supabase tables
- API routes
- File uploads
- Sandbox submissions
- Admin tools
- Public/private content boundaries

---

## Definition of Done

A security-sensitive feature is complete when it has:

- Clear data ownership
- Clear access rules
- No exposed secrets
- No public leak of private records
- Server-side permission checks where needed
- Supabase/RLS plan where needed
- Safe logging
- Privacy-aware sandbox behaviour
- Public/private content separation

---

## Locked Rule

DeepMindResources should be trusted not only because its AI content is verified, but because user and business data is handled carefully.

No feature is complete if it creates avoidable privacy or security risk.
