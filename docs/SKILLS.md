# DeepMindResources Skills Index

This file is the master map for the DeepMindResources skill system.

The files in `docs/skills/` define how the platform should be built, validated, structured, published, secured, and improved over time.

These skills are the backbone of DeepMindResources.

They should guide:

- Page creation
- SEO and AI-search structure
- Lesson building
- Sandbox task creation
- Tool comparisons
- Live AI Intelligence updates
- Master Brain records
- Agent behaviour
- Business training material
- Data modelling
- Security and privacy
- Build and deployment QA

---

## Core Product Promise

DeepMindResources is a living AI training and tool-intelligence platform.

The platform promise is:

AI update → verified meaning → practical lesson → sandbox task → user skill gain

Every page, feature, agent, lesson, sandbox task, and data model should support this promise.

---

## Core Build Rule

Do not build random pages, generic dashboard sections, placeholder app screens, or unverified AI content.

Every public-facing page should have:

- A clear purpose
- A clear audience
- Correct SEO metadata
- AI-search readable structure
- Useful human-facing copy
- Mobile-responsive layout
- A clear next action
- No placeholder v0 metadata
- No unsupported AI hype

---

## Skill Files

### `docs/skills/AGENT_RULES.md`

Use this when defining or reviewing future specialist agents.

Covers:

- Agent roles
- Agent boundaries
- Scout Agent
- Validator Agent
- Noise Filter Agent
- Tool Agent
- Comparison Agent
- Lesson Builder Agent
- Sandbox Builder Agent
- Business Training Agent
- Master Brain workflow responsibilities

---

### `docs/skills/BUILD_DEPLOYMENT_AND_QA.md`

Use this when making, committing, deploying, or checking code changes.

Covers:

- Local build checks
- Git and GitHub workflow
- Vercel deployment checks
- Supabase/environment checks
- Mobile QA
- SEO QA
- Post-deploy verification
- Rollback awareness
- No secret exposure

---

### `docs/skills/BUSINESS_TRAINING.md`

Use this when creating business-facing AI training, staff learning paths, team material, or workplace AI guidance.

Covers:

- Staff AI onboarding
- Role-based training
- Business workflows
- Tool spend reduction
- Team dashboards
- Staff progress tracking
- Privacy and risk awareness
- Manager-facing AI training

---

### `docs/skills/CONTENT_ARCHITECTURE.md`

Use this when deciding where pages, lessons, tools, updates, sandbox tasks, and business content belong.

Covers:

- Content pillars
- User journeys
- Academy structure
- Tool pages
- Comparison pages
- Business pages
- Internal linking
- URL and slug rules
- Public vs internal content
- Content lifecycle

---

### `docs/skills/DATA_MODEL_AND_SCHEMA.md`

Use this when designing Supabase tables, data schemas, Master Brain records, lesson records, sandbox records, or agent output structures.

Covers:

- Master Brain schema
- Source records
- Verified claims
- Tool records
- Lessons
- Learning paths
- Sandbox tasks
- AI updates
- Agent findings
- User progress
- Business/team data

---

### `docs/skills/LESSON_BUILDER.md`

Use this when creating or updating Academy lessons.

Covers:

- Lesson structure
- Learning outcomes
- Beginner/intermediate/advanced levels
- Business lessons
- Source-backed learning
- Common mistakes
- Assessments
- Lesson-to-sandbox links

---

### `docs/skills/LIVE_AI_INTELLIGENCE.md`

Use this when building or reviewing the live AI update system.

Covers:

- AI update categories
- Verified updates
- Master Brain queue
- Tool signals
- Lesson updates pending
- Sandbox task candidates
- Business training impact
- Public feed rules

---

### `docs/skills/MASTER_BRAIN.md`

Use this when designing or updating the central verified knowledge base.

Covers:

- Master Brain records
- Source references
- Confidence scores
- Update history
- Verified claims
- Tool capabilities
- Lesson links
- Sandbox task links
- Business training implications

---

### `docs/skills/PROGRESS_TRACKING_AND_ASSESSMENT.md`

Use this when building progress tracking, assessments, team dashboards, or skill measurement.

Covers:

- Lesson progress
- Sandbox progress
- Skill confidence
- Assessments
- Evidence of skill
- Business team progress
- Manager reporting
- Updated-content rechecks

---

### `docs/skills/SANDBOX_BUILDER.md`

Use this when creating practical sandbox tasks.

Covers:

- Prompt tests
- Model comparisons
- Tool-calling tasks
- Agent-building tasks
- RAG exercises
- Debugging tasks
- Business workflow simulations
- Assessment criteria
- Sandbox safety

---

### `docs/skills/SECURITY_PRIVACY_AND_PERMISSIONS.md`

Use this when building anything involving user data, Supabase records, accounts, teams, agents, APIs, or private content.

Covers:

- Secrets
- Environment variables
- Supabase/RLS thinking
- User progress privacy
- Business/team data
- Agent data boundaries
- Sandbox safety
- API route permissions
- Safe logging

---

### `docs/skills/SEO_AND_AI_SEARCH.md`

Use this when creating or reviewing any public-facing page.

Covers:

- SEO metadata
- Search intent
- AI-search readability
- Titles and descriptions
- H1/H2 structure
- LLM-readable summaries
- Tool comparison SEO
- Lesson SEO
- Business page SEO
- Structured data planning

---

### `docs/skills/SOURCE_INGESTION_AND_RESEARCH.md`

Use this when collecting or reviewing outside AI information before validation.

Covers:

- Official sources
- Weak sources
- Source classification
- Signal types
- Research questions
- Routing rules
- De-duplication
- Time-sensitive claims
- Noise filtering

---

### `docs/skills/TOOL_COMPARISON.md`

Use this when comparing AI tools, platforms, models, coding assistants, automation tools, or agent frameworks.

Covers:

- Scenario-based comparisons
- Use-case mapping
- Evidence requirements
- Tool strengths and weaknesses
- Pricing caveats
- Business fit
- Technical fit
- Non-technical user fit
- SEO for comparison pages

---

### `docs/skills/TRUST_METHODOLOGY_AND_TRANSPARENCY.md`

Use this when explaining how DeepMindResources verifies information and avoids AI slop.

Covers:

- Source transparency
- Confidence labels
- Public methodology pages
- Time-sensitive claims
- Tool comparison transparency
- Business transparency
- Honest uncertainty language
- Anti-hype rules

---

### `docs/skills/UI_MOBILE_AND_PAGE_EXPERIENCE.md`

Use this when building layouts, dashboards, navigation, mobile views, and user-facing components.

Covers:

- Mobile-first layout
- Responsive sidebars
- Hero sections
- Dashboard grids
- Cards
- Buttons
- Accessibility
- Empty states
- Status UI
- Page experience

---

### `docs/skills/UPDATE_REVIEW_AND_PUBLICATION_WORKFLOW.md`

Use this when moving an AI signal from discovery to possible publication.

Covers:

- Signal detection
- Source classification
- Duplicate checks
- Noise filtering
- Claim extraction
- Validation review
- Master Brain updates
- Lesson impact
- Sandbox impact
- Tool comparison impact
- Business training impact
- Publication decisions

---

### `docs/skills/VALIDATION_AND_SOURCES.md`

Use this when checking whether a claim is trustworthy enough to influence public content, lessons, recommendations, or the Master Brain.

Covers:

- Source quality levels
- Confidence scores
- Claim types
- Validation questions
- Noise filtering
- Publication rules
- Tool comparison validation
- Lesson update validation
- Sandbox task validation

---

## How to Use These Skills

Before building or changing anything, identify which skill files apply.

Examples:

- New public page → use `SEO_AND_AI_SEARCH.md`, `CONTENT_ARCHITECTURE.md`, and `UI_MOBILE_AND_PAGE_EXPERIENCE.md`
- New lesson → use `LESSON_BUILDER.md`, `VALIDATION_AND_SOURCES.md`, and `SANDBOX_BUILDER.md`
- New tool comparison → use `TOOL_COMPARISON.md`, `VALIDATION_AND_SOURCES.md`, and `SEO_AND_AI_SEARCH.md`
- New AI update workflow → use `SOURCE_INGESTION_AND_RESEARCH.md`, `UPDATE_REVIEW_AND_PUBLICATION_WORKFLOW.md`, and `MASTER_BRAIN.md`
- New user/team feature → use `SECURITY_PRIVACY_AND_PERMISSIONS.md`, `DATA_MODEL_AND_SCHEMA.md`, and `PROGRESS_TRACKING_AND_ASSESSMENT.md`
- New deployment or repo change → use `BUILD_DEPLOYMENT_AND_QA.md`

---

## Definition of Done

A DeepMindResources feature, page, lesson, task, or workflow is not complete unless it has been checked against the relevant skill files.

At minimum, check:

- Purpose
- Audience
- Search intent
- Source/validation needs
- Master Brain relationship
- Lesson or sandbox relationship
- Mobile layout
- SEO metadata
- Privacy and permissions
- Deployment/QA

---

## Locked Rule

The skill files are the operating system for DeepMindResources.

When in doubt, follow the relevant skill file before adding new content, features, pages, agents, data models, or public claims.

---

### `docs/skills/LAYOUT_AND_SPATIAL_DESIGN.md`

Use this when reviewing or improving page layout, spacing, visual hierarchy, card-grid rhythm, density, responsive structure, and spatial polish.

Covers:

- Spacing rhythm
- Visual hierarchy
- Grid and flex layout choices
- Card-grid monotony
- Responsive density
- Asymmetric layout opportunities
- Squint-test review
- Layout QA before visual polish

