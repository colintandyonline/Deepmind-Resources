# Data Model and Schema Skill

This skill defines how DeepMindResources should design data models, database tables, content schemas, Master Brain records, agent outputs, lessons, sandbox tasks, and tool intelligence records.

The data model is the structure that lets the platform become a living AI training and tool-intelligence system rather than a loose collection of pages.

---

## Core Purpose

The data model should support the DeepMindResources product loop:

AI update → verified meaning → practical lesson → sandbox task → user skill gain

Every important object should be structured enough to connect updates, sources, tools, lessons, sandbox tasks, users, progress, and business training.

---

## Core Rule

Do not store important platform knowledge as unstructured blobs only.

Use clear schemas with fields for:

- Source references
- Confidence scores
- Validation status
- Affected tools or models
- Affected skills
- Lesson links
- Sandbox task links
- Business relevance
- Update history
- Publication status

Structured data allows agents and pages to work reliably.

---

## Main Data Areas

DeepMindResources will likely need data models for:

- Users
- Teams
- Lessons
- Learning paths
- Modules
- Skills
- Sandbox tasks
- Tool records
- Tool capabilities
- Tool comparisons
- AI updates
- Sources
- Verified claims
- Master Brain records
- Agent findings
- Validation reviews
- Business training paths
- Progress tracking
- Assessments
- Notifications or update queues

Start simple, but design with these relationships in mind.

---

## Required Record Principles

Important records should include:

- Unique ID
- Human-readable title
- Short summary
- Detailed description where needed
- Status
- Created date
- Updated date
- Source references where relevant
- Confidence or validation state where relevant
- Related records where relevant

Avoid records that cannot be traced, validated, or connected to platform actions.

---

## Master Brain Record Schema

A Master Brain record should include:

- ID
- Record type
- Title
- Summary
- Practical meaning
- Source references
- Source quality level
- Confidence score
- Validation status
- Publication status
- Date detected
- Date checked
- Date last updated
- Affected tool
- Affected model
- Affected platform
- Affected skill area
- Affected lesson IDs
- Affected sandbox task IDs
- Business relevance
- Notes on uncertainty
- Review history

Master Brain records should connect knowledge to action.

---

## Source Record Schema

A source record should include:

- ID
- Source title
- Source URL
- Source owner or publisher
- Source type
- Publication date where available
- Date checked
- Source quality level
- Extracted claim summary
- Related Master Brain record IDs
- Notes on limitations

Source text should not be blindly treated as truth.

Sources support validation; they are not the final product by themselves.

---

## Verified Claim Schema

A verified claim should include:

- ID
- Claim text
- Claim type
- Related source IDs
- Confidence score
- Validation status
- Date checked
- Affected tool/model/platform
- Affected use case
- Practical meaning
- Related lesson IDs
- Related sandbox task IDs
- Notes on uncertainty

Claims should be specific and testable where possible.

---

## Tool Record Schema

A tool record should include:

- ID
- Tool name
- Tool category
- Official website
- Official documentation URL
- Pricing URL where available
- Short description
- Primary use cases
- Target users
- Capabilities
- Limitations
- Integrations
- Business suitability
- Technical suitability
- Last checked date
- Confidence score
- Related comparison IDs
- Related lesson IDs
- Related sandbox task IDs

Tool records should avoid vague claims such as “best for productivity” without use-case detail.

---

## Tool Capability Schema

A tool capability record should include:

- ID
- Tool ID
- Capability name
- Capability description
- Use case
- Evidence source IDs
- Confidence score
- Plan or pricing dependency
- Limitations
- Date checked
- Related comparison IDs
- Related sandbox task IDs

Capabilities should be specific, sourced, and current.

---

## Tool Comparison Schema

A comparison record should include:

- ID
- Comparison title
- Use case
- Audience
- Tools compared
- Evaluation criteria
- Recommendation summary
- Strengths and weaknesses
- Pricing caveats
- Evidence source IDs
- Confidence score
- Date checked
- Related lessons
- Related sandbox tasks
- Publication status

Comparisons must be use-case based, not universal rankings.

---

## Lesson Schema

A lesson record should include:

- ID
- Title
- Slug
- Summary
- Skill area
- Difficulty level
- Audience
- Learning outcomes
- Lesson body or content blocks
- Related source IDs
- Related Master Brain records
- Related sandbox task IDs
- Status
- SEO title
- Meta description
- Date created
- Date updated
- Review date

Lessons should connect to practice where possible.

---

## Learning Path Schema

A learning path record should include:

- ID
- Title
- Slug
- Summary
- Audience
- Skill level
- Ordered lesson IDs
- Related sandbox task IDs
- Estimated duration
- Progress rules
- Business/team version where applicable
- Status
- SEO metadata where public

Learning paths should move users from beginner understanding to practical skill.

---

## Sandbox Task Schema

A sandbox task record should include:

- ID
- Title
- Slug
- Summary
- Skill area
- Difficulty level
- Task type
- Scenario
- Instructions
- Starting input or template
- Expected output
- Success criteria
- Hints
- Common mistakes
- Related lesson IDs
- Related Master Brain record IDs
- Tool/model requirements
- Safety/privacy notes
- Assessment method
- Status
- SEO metadata where public

Sandbox tasks should be practical and testable.

---

## AI Update Schema

An AI update record should include:

- ID
- Title
- Summary
- Update category
- Source IDs
- Date detected
- Date checked
- Validation status
- Confidence score
- Affected tool/model/platform
- Affected skill area
- Practical meaning
- Lesson action
- Sandbox action
- Tool comparison action
- Business training action
- Queue status
- Publication status

AI updates should become structured intelligence, not just news snippets.

---

## Agent Finding Schema

An agent finding should include:

- ID
- Agent name
- Task type
- Finding summary
- Source IDs where relevant
- Confidence score
- Validation status
- Recommended action
- Related Master Brain record IDs
- Created date
- Reviewed date
- Reviewer or validation result

Agent findings should not become public facts without validation.

---

## User Progress Schema

User progress records should track real skill development.

Possible fields:

- User ID
- Lesson ID
- Sandbox task ID
- Learning path ID
- Completion status
- Score or assessment result
- Confidence rating
- Last activity date
- Skill area
- Evidence of completion
- Next recommended step

Progress should measure learning and application, not just page views.

---

## Business Team Schema

Business/team records may include:

- Team ID
- Organisation name
- Admin user IDs
- Team members
- Assigned learning paths
- Role-based training groups
- Progress summaries
- Tool recommendations
- Business use cases
- Risk or policy notes
- Reporting settings

Business data should be designed with privacy and permissions in mind.

---

## Status Values

Use clear status values across the platform.

Suggested status examples:

- Draft
- In review
- Needs validation
- Verified
- Published
- Archived
- Deprecated
- Rejected as noise
- Update pending
- Sandbox pending
- Lesson pending

Avoid unclear statuses such as “active” without context.

---

## Relationship Rules

Important records should be connected.

Examples:

- AI update → source records
- AI update → Master Brain record
- Master Brain record → lesson update
- Lesson → sandbox task
- Tool capability → tool comparison
- Tool comparison → business training page
- User progress → learning path

Relationships are what allow the platform to become intelligent over time.

---

## SEO Data Rules

Public content records should include SEO fields.

Useful fields:

- SEO title
- Meta description
- Slug
- Search intent
- Open Graph title
- Open Graph description
- Canonical URL where relevant

Do not leave metadata as an afterthought.

---

## Validation Data Rules

Time-sensitive and factual records should include:

- Source references
- Date checked
- Confidence score
- Validation status
- Reviewer or validation workflow
- Notes on uncertainty

This protects the platform from outdated or unsupported claims.

---

## Privacy and Security Rules

Do not store secrets in normal application tables.

Do not expose:

- API keys
- Tokens
- Private credentials
- Sensitive user data
- Sensitive business data

Use row-level security and permission-aware queries for user and team records.

---

## Migration Rules

Database changes should be deliberate.

Before adding a table or field, ask:

- What product purpose does this support?
- Which page, agent, lesson, or workflow needs it?
- Does it need validation fields?
- Does it need SEO fields?
- Does it need user/team permissions?
- Does it duplicate an existing concept?

Avoid schema sprawl.

---

## Definition of Done

A schema or data model is ready when it has:

- Clear purpose
- Required fields
- Relationship plan
- Validation/status fields where needed
- Source fields where needed
- SEO fields where public
- Privacy considerations
- No unnecessary duplication
- Support for future agent workflows

---

## Locked Rule

DeepMindResources needs structured, source-backed, relationship-aware data.

The data model is what turns the site from static content into a living AI intelligence platform.
