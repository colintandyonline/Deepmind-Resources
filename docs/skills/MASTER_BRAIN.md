# Master Brain Skill

This skill defines the rules for the DeepMindResources Master Brain.

The Master Brain is the central verified knowledge base for the platform. It stores source-backed AI intelligence and connects that intelligence to lessons, sandbox tasks, tool comparisons, and business training material.

---

## Core Purpose

The Master Brain exists to turn AI noise into structured, trustworthy training intelligence.

It should store:

- AI platform knowledge
- Tool capabilities
- Model release notes
- Official documentation summaries
- Tool comparisons
- Verified claims
- Source references
- Confidence scores
- Update history
- Lesson material
- Sandbox task links
- Business training implications

The Master Brain should not be a dumping ground for raw scraped content.

It should store interpreted, validated, structured knowledge.

---

## Product Promise Connection

Every Master Brain record should support the product loop:

AI update → verified meaning → practical lesson → sandbox task → user skill gain

A record is more valuable when it can answer:

- What changed?
- Why does it matter?
- Who should care?
- What skill does this affect?
- Should a lesson be updated?
- Should a sandbox task be created?
- Does this affect a tool comparison?
- Does this affect business training?

---

## Knowledge Object Types

The Master Brain should support structured object types.

Initial object types:

- Platform
- Tool
- Model
- Feature
- API change
- Release note
- Documentation summary
- Verified claim
- Source record
- Tool capability
- Tool limitation
- Use case
- Comparison record
- Lesson reference
- Sandbox task reference
- Business training note
- Deprecation record
- Safety note
- Pricing note

Each object should be connected to sources and confidence where relevant.

---

## Required Record Fields

A Master Brain record should include:

- Record ID
- Record type
- Title
- Short summary
- Full practical meaning
- Source references
- Source quality level
- Confidence score
- Date created
- Date last checked
- Date last updated
- Affected platform/tool/model
- Affected skill area
- Affected academy lesson, if any
- Affected sandbox task, if any
- Business relevance, if any
- Publication status
- Validation status
- Notes on uncertainty

---

## Confidence and Validation

The Master Brain should never treat all records equally.

Each record should have a validation status:

- Unverified signal
- Needs review
- Partially verified
- Verified
- Conflicting evidence
- Deprecated
- Archived

Each record should also have a confidence score:

- High
- Medium
- Low

High-confidence records can influence public pages, lessons, and recommendations.

Low-confidence records should be kept as investigation signals only.

---

## Source Requirements

Every factual record should link back to sources.

Preferred source types:

- Official documentation
- Official changelogs
- Official release notes
- Official GitHub repositories
- Official pricing pages
- Product tests
- Trusted technical analysis

Weak sources should be marked clearly and should not drive public recommendations by themselves.

---

## Update History

The Master Brain should preserve update history.

When a record changes, store:

- What changed
- Why it changed
- Source used
- Date changed
- Agent or reviewer responsible
- Whether downstream pages or lessons need updates

This helps the platform explain why lesson material has changed over time.

---

## Relationships Between Records

Master Brain records should be connected.

Examples:

- A model release connects to affected lessons.
- An API change connects to sandbox tasks.
- A tool feature connects to use cases.
- A pricing change connects to business recommendations.
- A deprecation connects to older lessons that need updates.
- A safety note connects to validation and hallucination-control lessons.

Relationships should be explicit, not hidden in plain text only.

---

## Lesson Update Rules

A Master Brain record should trigger a lesson update recommendation when it changes what users need to learn or practise.

Examples:

- A model gains or loses a capability.
- A tool changes its workflow.
- An API changes syntax or behaviour.
- A platform deprecates a feature.
- A safety issue changes best practice.
- A tool comparison changes for a major use case.

Do not trigger lesson updates for noise with no practical learning value.

---

## Sandbox Task Rules

A Master Brain record should trigger a sandbox task recommendation when the change can be practised.

Good candidates include:

- Tool-calling changes
- Agent behaviour changes
- RAG workflow updates
- Model comparison opportunities
- Prompting changes
- Debugging exercises
- Business workflow simulations

Sandbox tasks should be practical and testable.

---

## Publication Status

Records should have publication status values:

- Internal only
- Draft public summary
- Ready for publication
- Published
- Needs recheck
- Retired

Do not publish internal notes automatically.

Agents can recommend publication, but validation should happen first.

---

## Agent Responsibilities

### Scout Agent

Finds possible records and creates unverified signals.

### Validator Agent

Checks claims, sources, and confidence.

### Tool Agent

Updates tool capability and limitation records.

### Comparison Agent

Connects records to use-case comparisons.

### Lesson Builder Agent

Uses verified records to create or update lessons.

### Sandbox Builder Agent

Uses verified records to create practice tasks.

### Business Training Agent

Maps verified records to workplace implications.

---

## Master Brain Must Avoid

Do not store:

- Unlabelled scraped content
- Unverified claims as facts
- Marketing copy as truth
- Duplicate noisy records
- Outdated claims without status
- Tool recommendations without use-case context
- Confidence-free assertions
- Source-free comparisons

---

## Definition of Done

A Master Brain record is complete when it has:

- Clear title
- Accurate summary
- Structured type
- Source references
- Validation status
- Confidence score
- Practical meaning
- Affected skill or lesson area
- Publication recommendation
- Review date
- Notes on uncertainty

---

## Locked Rule

The Master Brain is the trust layer of DeepMindResources.

If the Master Brain is messy, unverified, or hype-driven, the product fails.
