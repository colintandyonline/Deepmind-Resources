# Update Review and Publication Workflow Skill

This skill defines how DeepMindResources should move information from an initial AI signal through validation, Master Brain storage, practical interpretation, and eventual publication.

It is the workflow bridge between source ingestion, validation, lessons, sandbox tasks, tool comparisons, business training, and public-facing content.

---

## Core Purpose

DeepMindResources should not publish raw AI news, hype, rumours, or tool marketing claims directly.

Every important update should move through a controlled workflow:

Signal detected → source classified → claim validated → Master Brain updated → practical action decided → public content updated where useful

This protects the platform from becoming noisy, stale, or untrustworthy.

---

## Core Rule

No ingested update should become public content until it has a clear validation status, source quality level, confidence score, and practical purpose.

Publishing should happen because the update helps users learn, choose tools, practise skills, or make better business decisions.

---

## Standard Workflow

A normal update should move through these stages:

1. Source signal detected
2. Source classified
3. Duplicate check completed
4. Noise filter applied
5. Claim extracted
6. Validation review completed
7. Confidence score assigned
8. Master Brain record created or updated
9. Practical meaning written
10. Lesson impact reviewed
11. Sandbox impact reviewed
12. Tool comparison impact reviewed
13. Business training impact reviewed
14. Publication decision made
15. Public page/feed/lesson/task updated where useful

Each stage should be traceable.

---

## Workflow Statuses

Use clear workflow statuses.

Suggested statuses:

- Signal detected
- Needs source check
- Duplicate candidate
- Rejected as noise
- Needs validation
- Partially verified
- Verified
- Conflicting evidence
- Master Brain queued
- Master Brain updated
- Lesson update pending
- Sandbox task pending
- Tool comparison update pending
- Business training update pending
- Public draft ready
- Published
- Archived
- Deprecated

Avoid vague statuses that hide whether something is trusted or public-ready.

---

## Stage 1: Signal Detection

Signals may come from:

- Official documentation
- Official release notes
- Changelogs
- GitHub repositories
- Engineering blogs
- Product pages
- Pricing pages
- Trusted technical publications
- Direct testing
- Community reports
- Weak discovery sources

At this stage, the signal is not verified.

It should be treated as a lead for review.

---

## Stage 2: Source Classification

Every source should be classified by quality.

Basic levels:

- Official primary source
- Technical primary evidence
- Trusted secondary source
- Weak or noisy source

Source classification should determine how much validation is needed before publication.

---

## Stage 3: Duplicate Check

Before creating a new update topic, check whether the claim already exists.

Look for:

- Existing AI update record
- Existing Master Brain record
- Existing source record
- Existing lesson update task
- Existing tool comparison note
- Existing sandbox task candidate

If the topic exists, attach the new source rather than creating a duplicate update.

---

## Stage 4: Noise Filtering

Weak signals should pass through noise filtering before they reach validation.

Reject or downgrade:

- Affiliate hype
- Unsupported rankings
- Reposted rumours
- Old information presented as new
- Thin listicles
- Misleading benchmark claims
- Marketing claims with no technical support
- Repeated stories with no practical value

Some weak signals may still be useful if they lead to stronger sources.

---

## Stage 5: Claim Extraction

A source may contain many claims.

Extract specific claims such as:

- A model was released
- A feature changed
- A tool added a capability
- Pricing changed
- API behaviour changed
- A tool was deprecated
- A workflow is now possible
- A limitation exists
- A safety concern exists

Claims should be clear enough to validate.

Avoid vague claims such as “this tool is better” unless the use case and evidence are defined.

---

## Stage 6: Validation Review

Validation should check:

- Is there an official source?
- Is the source current?
- Does the claim apply to all users or only a plan, region, beta, or API version?
- Can the claim be reproduced?
- Do trusted sources agree?
- Are there conflicting sources?
- Is the claim practically useful?

Validation should produce a confidence score and notes on uncertainty.

---

## Stage 7: Master Brain Update

Verified or useful partially verified claims should update the Master Brain.

A Master Brain update should include:

- Claim summary
- Practical meaning
- Source references
- Confidence score
- Validation status
- Affected tool/model/platform
- Affected skill area
- Lesson impact
- Sandbox impact
- Tool comparison impact
- Business training impact
- Date checked

The Master Brain should store structured intelligence, not raw hype.

---

## Stage 8: Practical Impact Review

Every meaningful update should answer:

- What changed?
- Why does it matter?
- Who should care?
- What skill does this affect?
- Should a lesson be updated?
- Should a sandbox task be created?
- Should a tool comparison be updated?
- Should business training be updated?

If there is no practical impact, the update may be archived or stored internally only.

---

## Lesson Impact Rules

Create a lesson action when the update changes what users need to learn.

Possible actions:

- No lesson action needed
- Update existing lesson
- Create new beginner lesson
- Create new intermediate lesson
- Create new advanced lesson
- Create business lesson
- Mark old lesson for review

Do not update lessons for every minor announcement.

---

## Sandbox Impact Rules

Create a sandbox action when the update can become hands-on practice.

Possible actions:

- No sandbox action needed
- Create prompt test
- Create model comparison task
- Create tool-calling exercise
- Create agent task
- Create RAG task
- Create debugging task
- Create business workflow simulation
- Create validation challenge

Sandbox actions should be practical and testable.

---

## Tool Comparison Impact Rules

Update tool comparisons when the claim changes a recommendation, limitation, capability, pricing caveat, or use-case fit.

Possible actions:

- No comparison action needed
- Update capability table
- Update pricing note
- Add limitation
- Add new tool
- Recheck recommendation
- Mark tool as deprecated

Comparison updates must remain use-case based.

---

## Business Training Impact Rules

Business impact should be reviewed when the update affects:

- Staff training
- Tool spending
- Security or privacy
- Workflow adoption
- Non-technical users
- Team productivity
- Admin controls
- Risk management

Business-facing changes need extra caution before publication.

---

## Publication Decision Rules

Only publish when the update is useful and trusted enough.

Possible publication decisions:

- Internal only
- Store as weak signal
- Add to Master Brain only
- Create public AI intelligence item
- Update lesson
- Create sandbox task
- Update tool comparison
- Create business training note
- Archive as noise

Publication is not automatic.

---

## Public Content Requirements

Public content created from an update should include:

- Clear title
- Plain-English summary
- What changed
- Why it matters
- Who should care
- Confidence or validation note where useful
- Related lesson or task where available
- Tool or business implication where relevant
- Date checked where time-sensitive

Avoid publishing raw source summaries without practical interpretation.

---

## Review and Recheck Rules

Some content should be scheduled for review.

Recheck when:

- Pricing may change
- API behaviour may change
- A feature is in beta
- Model availability is limited
- Sources conflict
- A tool is changing rapidly
- Business recommendation depends on plan details

Review status should be visible internally.

---

## Agent Responsibilities

### Scout Agent

Detects source signals and creates initial records.

### Noise Filter Agent

Rejects or downgrades weak, repetitive, or hype-driven signals.

### Validator Agent

Checks claims, sources, and confidence.

### Master Brain Workflow

Stores structured validated intelligence.

### Tool Agent

Reviews tool and pricing implications.

### Lesson Builder Agent

Reviews lesson impact.

### Sandbox Builder Agent

Reviews practice task opportunities.

### Comparison Agent

Reviews comparison changes.

### Business Training Agent

Reviews workplace and team-training implications.

---

## Definition of Done

An update review is complete when it has:

- Source reference
- Source quality level
- Claim summary
- Validation status
- Confidence score
- Practical meaning
- Affected tool/model/platform
- Affected skill area
- Lesson action
- Sandbox action
- Tool comparison action
- Business training action
- Publication decision
- Notes on uncertainty

---

## Locked Rule

DeepMindResources should publish less, but publish better.

The goal is not to be first with AI news.

The goal is to turn verified AI change into practical learning intelligence.
