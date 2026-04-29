# Source Ingestion and Research Skill

This skill defines how DeepMindResources should discover, collect, classify, and prepare external AI information before it reaches validation, the Master Brain, lessons, sandbox tasks, tool comparisons, or business training material.

Source ingestion is the front door of the platform’s intelligence system.

If poor sources enter the system unlabelled, everything downstream becomes weaker.

---

## Core Purpose

The Source Ingestion and Research skill exists to help DeepMindResources find useful AI updates without becoming a noisy reposting machine.

It should support the product loop:

AI update → verified meaning → practical lesson → sandbox task → user skill gain

Ingestion is not publication.

A discovered source or signal is only the beginning of the validation process.

---

## Core Rule

Do not treat discovered information as verified truth.

Every ingested item should be classified, sourced, timestamped, and routed for validation before it affects public content, tool recommendations, lessons, sandbox tasks, or business advice.

---

## Preferred Source Types

Prioritise high-quality sources such as:

- Official documentation
- Official API documentation
- Official release notes
- Official changelogs
- Official engineering blogs
- Official GitHub repositories
- Official model cards or system cards
- Official pricing pages
- Official product pages
- Official status pages
- Official migration guides
- Trusted technical publications
- Reproducible product tests
- Maintainer comments on official repositories

Low-quality sources can be useful discovery signals, but they must be labelled as weak or unverified.

---

## Weak Source Types

Treat these as low-confidence unless confirmed elsewhere:

- Viral social media posts
- YouTube summaries
- Affiliate review pages
- Thin comparison articles
- Unsourced blog posts
- Marketing-heavy launch posts
- Screenshots without source links
- Rumours
- AI-generated listicles
- Reposted claims from other weak sources

Weak sources should not directly drive public recommendations.

---

## Ingestion Item Requirements

Every ingested source or signal should record:

- Source title
- Source URL
- Source owner or publisher
- Source type
- Date published where available
- Date detected
- Date checked where applicable
- Short source summary
- Claimed change or claim summary
- Related tool, model, platform, or topic
- Initial source quality level
- Initial confidence level
- Suggested validation action
- Suggested Master Brain record type
- Notes on uncertainty

---

## Signal Types

Classify incoming signals by type.

Common signal types:

- Model release
- API change
- Pricing change
- Tool capability change
- Tool limitation
- Tool launch
- Tool deprecation
- Agent framework update
- RAG or knowledge-system update
- Coding assistant update
- Automation tool update
- Business AI workflow update
- Safety or policy change
- Benchmark or evaluation claim
- Documentation update
- Community report
- Rumour or weak signal

Classification helps route the item to the right agent or workflow.

---

## Research Questions

When reviewing a source, ask:

1. Who published this?
2. Is it official, technical, secondary, or weak?
3. What exactly changed or is being claimed?
4. Is the claim time-sensitive?
5. Which tool, model, platform, or workflow is affected?
6. Which user group might care?
7. Which skill area might be affected?
8. Does this need validation?
9. Does this suggest a lesson update?
10. Does this suggest a sandbox task?
11. Does this affect a tool comparison?
12. Does this affect business training?
13. Is the source strong enough to use directly, or only as a discovery signal?

---

## Routing Rules

Ingested items should be routed based on their type.

Examples:

- Official model release → Validator Agent and Master Brain queue
- API change → Validator Agent, Tool Agent, Lesson Builder Agent
- Tool capability change → Tool Agent and Comparison Agent
- Pricing change → Tool Agent and Business Training Agent
- Agent framework update → Lesson Builder Agent and Sandbox Builder Agent
- Weak social signal → Noise Filter Agent before validation
- Business workflow claim → Business Training Agent and Validator Agent

No ingested signal should jump straight to publication.

---

## De-Duplication Rules

Avoid creating duplicate records for the same update.

Before storing a new signal, check whether there is already:

- A matching AI update record
- A related Master Brain record
- A related source record
- An existing validation queue item
- A related lesson update task

If a source is new but the claim is already known, attach it as an additional source rather than creating a duplicate topic.

---

## Time Sensitivity Rules

AI information changes quickly.

For time-sensitive information, record:

- Date detected
- Date checked
- Version where applicable
- Product plan where applicable
- Region or beta availability where applicable
- Whether recheck is needed

Time-sensitive categories include:

- Pricing
- API behaviour
- Model availability
- Tool capabilities
- Feature access
- Product limits
- Policy or safety rules
- Platform deprecations

---

## Summary Rules

Source summaries should be concise and practical.

A good ingestion summary should answer:

- What changed or was claimed?
- Why might it matter?
- What needs to be checked next?

Do not paste large raw source content into final records.

Store interpreted summaries with source references.

---

## Noise Filter Rules

The Noise Filter Agent should review noisy or weak signals before they enter the main validation queue.

Downgrade or reject sources that are:

- Repetitive
- Unsupported
- Affiliate-driven
- Pure hype
- Old information presented as new
- Misleading benchmark claims
- Tool rankings without evidence
- Claims copied from another weak source

Noise can be stored as a weak signal if it may lead to a real source, but it must not be treated as verified.

---

## Agent Responsibilities

### Scout Agent

Finds and records source signals.

### Noise Filter Agent

Filters weak, repetitive, or hype-driven items.

### Validator Agent

Checks claims against stronger sources and assigns confidence.

### Tool Agent

Maps tool-related signals to tool records and capabilities.

### Comparison Agent

Checks whether a signal affects tool comparisons.

### Lesson Builder Agent

Checks whether a signal affects lessons.

### Sandbox Builder Agent

Checks whether a signal can become practice.

### Business Training Agent

Checks business impact, risk, cost, and training relevance.

---

## Publication Boundary

Ingestion does not equal publication.

An ingested item may become:

- Rejected noise
- Weak signal
- Validation task
- Master Brain record
- Tool record update
- Lesson update task
- Sandbox task idea
- Tool comparison update
- Business training note
- Public AI intelligence item

Only validated and useful material should become public.

---

## Definition of Done

A source ingestion item is complete when it has:

- Source title
- Source URL
- Source type
- Date detected
- Short summary
- Claim or update classification
- Related tool/model/platform where relevant
- Initial source quality level
- Initial confidence level
- Routing recommendation
- Notes on uncertainty

---

## Locked Rule

DeepMindResources should collect signals widely but trust slowly.

Source ingestion should feed the intelligence system, not pollute it.
