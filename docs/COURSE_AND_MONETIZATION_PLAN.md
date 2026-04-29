# DeepMindResources Course and Monetization Plan

This document defines how DeepMindResources should structure courses, learning paths, progress tracking, business training, user dashboards, business dashboards, and monetization.

DeepMindResources is not a video course platform.

It is a living AI training and tool-intelligence platform that turns verified AI updates into practical learning, sandbox tasks, skill evidence, and business-ready AI capability.

---

## Core Product Promise

AI update → verified meaning → practical lesson → sandbox task → user skill gain

For business users:

AI update → verified business meaning → staff training → workflow practice → team capability gain

This product promise should guide the course structure, dashboard design, monetization model, and future agent architecture.

---

## No-Video Learning Model

DeepMindResources should not rely on video courses.

Videos become outdated quickly and are harder to update when AI tools, models, APIs, and workflows change.

Preferred learning formats:

- Written lessons
- Interactive explanations
- Diagrams
- Graphs
- Images
- Comparison tables
- Scenario exercises
- Sandbox tasks
- Tool configuration examples
- Prompt exercises
- RAG examples
- Agent workflow simulations
- Knowledge checks
- Skill assessments

The goal is active learning, not passive watching.

---

## Why This Platform Exists

AI changes too quickly for normal courses to remain current.

Most AI courses follow this pattern:

Course created → course published → course slowly becomes outdated

DeepMindResources should follow this pattern:

AI world changes → scouts detect signals → sources are validated → Master Brain updates → affected lessons are identified → sandbox tasks are refreshed → user progress is rechecked → businesses see who needs retraining

This is the core difference between DeepMindResources and normal AI training products.

---

## Course Architecture

Courses should be structured learning systems, not static pages.

Recommended hierarchy:

Course
→ Module
→ Lesson
→ Knowledge Check
→ Sandbox Task
→ Assessment
→ Skill Evidence
→ Progress Event

Each course should include:

- Clear audience
- Skill level
- Learning outcome
- Ordered modules
- Lessons
- Sandbox tasks
- Assessment points
- Related tools/models/platforms
- Related Master Brain records
- Version history
- Review status
- Business relevance where useful

---

## Core Course Areas

Initial course areas should include:

1. AI Fundamentals
2. Prompt Engineering
3. AI Tool Selection
4. AI for Business Productivity
5. Tool Calling and Functions
6. AI Agents
7. RAG and Knowledge Systems
8. Agentic Workflows
9. Multi-Agent Systems
10. AI Safety, Validation, and Hallucination Control

These should map to the Academy, Sandbox, Tool Intelligence, Master Brain, and Business Training sections.

---

## Lesson Structure

A lesson should not be marked complete just because a user opened or read it.

A strong lesson should include:

- Lesson title
- Skill area
- Difficulty level
- Audience
- Short summary
- Learning outcome
- Plain-English explanation
- Practical example
- Common mistake
- Knowledge check
- Sandbox task link where useful
- Related tools
- Related Master Brain records
- Version number
- Last reviewed date
- Review status

A lesson is strongest when it leads to a practical action.

---

## Lesson Versioning

Lessons must be versioned because AI changes quickly.

Each lesson should eventually track:

- Lesson ID
- Version number
- Current version
- User completed version
- Date completed
- Last reviewed date
- Update reason
- Refresh required status
- Related AI update
- Related Master Brain records

Example logic:

A user completes Prompt Engineering Basics v1.1.

Three months later, verified model behaviour changes the recommended best practice.

The lesson becomes v1.2.

The user's dashboard should show:

- Completed before update
- Refresher recommended
- New sandbox task available

This is one of the most important product mechanics.

---

## Sandbox Task Structure

Sandbox tasks are how users prove practical skill.

A sandbox task should include:

- Task title
- Skill area
- Difficulty level
- Related lesson
- Scenario
- Starting input
- Instructions
- Expected output
- Success criteria
- Common mistakes
- Review checklist
- Tool/model assumptions
- Safety/privacy note
- Assessment result
- Version number

Sandbox tasks may include:

- Prompt testing
- Prompt improvement
- Model comparison
- Tool calling
- Function calling
- Agent building
- Agent debugging
- RAG retrieval
- Workflow automation
- Business workflow simulations
- Source validation
- Hallucination detection

---

## Sandbox Versioning

Sandbox tasks should also be versioned.

A sandbox task may need updating when:

- Model behaviour changes
- Tool calling behaviour changes
- API syntax changes
- A tool is deprecated
- A better workflow becomes available
- A business safety recommendation changes
- A lesson is updated

The system should be able to show:

- Task completed
- Task updated since completion
- Recheck recommended
- New task version available

---

## User Account Requirements

Proper user accounts are required for the product to work correctly.

The platform needs accounts to track:

- Learning paths
- Lesson progress
- Sandbox submissions
- Assessments
- Skill confidence
- Skill badges
- Updated lessons
- Refreshers needed
- Subscription access
- Public skill trace options

Recommended auth provider:

- Supabase Auth

Important requirements:

- Secure user sessions
- Private user progress
- Row-level security
- No exposure of user records
- Stripe subscription mapping
- Future business/team membership support

---

## User Dashboard Requirements

Each user should have a dashboard that shows real learning progress.

Dashboard sections may include:

- Current learning path
- Continue learning
- Completed lessons
- Sandbox tasks completed
- Skill areas
- Skill confidence
- Assessments
- Verified skill evidence
- Lessons updated since completion
- Refreshers recommended
- Next recommended task
- Subscription status
- Skill badges or Skill Trace status

The dashboard should answer:

- What am I learning?
- How far have I progressed?
- What can I actually do now?
- What has changed since I completed a lesson?
- What should I do next?

---

## Progress Tracking Principles

Progress should measure practical ability, not just page views.

Progress signals may include:

- Lesson completed
- Knowledge check passed
- Sandbox task completed
- Assessment passed
- Prompt improved successfully
- Tool comparison completed
- Source validation challenge passed
- Agent workflow built
- Business workflow simulation completed
- Refresher completed after lesson update

Progress should map to skill areas.

Skill areas may include:

- AI fundamentals
- Prompt engineering
- AI tool selection
- Tool calling
- AI agents
- RAG
- Agentic workflows
- Multi-agent systems
- AI safety
- Source validation
- Business AI productivity
- AI automation

---

## Skill Evidence

DeepMindResources should track evidence of skill.

Evidence may include:

- Completed sandbox tasks
- Passed assessments
- Saved prompt improvements
- Model comparison results
- Tool selection scenario results
- Agent workflow outputs
- RAG validation results
- Business workflow plans
- Manager-reviewed team tasks

This evidence can later support Verified Skill Trace pages.

---

## Verified Skill Trace

A normal certificate is weak.

A Verified Skill Trace is stronger because it shows what a user actually completed.

A future public skill page may include:

- User name
- Skill path completed
- Date completed
- Lesson versions completed
- Sandbox tasks completed
- Assessment results
- Skill evidence summary
- Current or outdated status
- Verification link

Recommended naming:

- Verified AI Skill Trace
- DMR Verified Skill Trace
- DeepMindResources Verified Skill Trace

Avoid using wording that could imply an official connection to Google DeepMind.

---

## Business Workspace Requirements

Business accounts are a major product opportunity.

A business should be able to:

- Create an organisation account
- Add staff members
- Assign learning paths
- Monitor progress
- Track sandbox completions
- Track AI safety training
- See team skill gaps
- Review staff achievements
- Manage billing seats
- View updated lessons that require retraining
- Export or view reports

This is the core B2B upskilling product.

---

## Business Dashboard Requirements

A business dashboard should answer:

- Who is AI-ready?
- Who has completed safety training?
- Who has passed practical sandbox tasks?
- Which staff need refreshers?
- Which teams are behind?
- Which skills are strongest?
- Which skills need attention?
- Which lessons changed recently?
- Which tools are suitable for this team?
- What should managers assign next?

Recommended dashboard sections:

- Team Overview
- Staff Members
- Assigned Learning Paths
- Skill Progress
- Sandbox Results
- AI Safety Status
- Tool Readiness
- Refreshers Needed
- Skill Evidence
- Billing and Seats

---

## Business Roles

Business accounts may include roles such as:

- Organisation owner
- Team admin
- Manager
- Staff member
- Viewer/reporting user

Permissions should control who can:

- Invite users
- Assign paths
- View progress
- View reports
- Manage billing
- Edit organisation settings

---

## Monetization Strategy

The strongest commercial angle is business AI training and reskilling.

Primary money engine:

B2B AI training and team upskilling

Secondary money engine:

Individual Pro membership

Additional revenue:

- Founder Pass
- Verified Skill Trace payments
- Prompt-as-code / agent template library
- Affiliate stack recommendations
- Future custom business training

---

## Tier 1: Free Explorer

Purpose:

Traffic, trust, and discovery.

Possible access:

- Homepage
- Limited Academy previews
- Limited Live AI Intelligence feed
- Beginner lesson samples
- Limited tool comparison previews
- One or two sandbox demos
- No full progress tracking or limited progress tracking

Goal:

Help users understand the value of DeepMindResources and convert serious learners into paid users.

---

## Tier 2: Individual Architect

Purpose:

Paid individual learning.

Possible price:

£19 to £29 per month

Possible access:

- Full Academy
- Full learning paths
- Agentic Sandbox
- Tool comparisons
- Live AI Intelligence explanations
- Progress dashboard
- Skill tracking
- Template library
- Refresher alerts
- Verified Skill Trace discounts or included allowance

Target users:

- AI learners
- Developers
- Freelancers
- Consultants
- Prompt engineers
- Automation builders
- Business owners learning personally

---

## Tier 3: Business Team

Purpose:

Main revenue tier.

Possible price:

£49 to £99 per user per month

Possible access:

- Organisation dashboard
- Staff invites
- Assigned learning paths
- Team progress tracking
- AI safety training
- Business tool recommendations
- Staff sandbox results
- Skill gap reporting
- Refresher tracking after major AI updates
- Business training modules
- Manager reports

Target customers:

- Agencies
- Small businesses
- Internal departments
- Operations teams
- Marketing teams
- Customer service teams
- Training managers
- AI transformation leads

---

## Tier 4: Enterprise / Custom

Purpose:

Higher-ticket business support.

Possible access:

- Custom learning paths
- Private staff onboarding
- Custom workflow training
- Internal tool comparison support
- Private reporting
- Priority support
- Advanced team analytics
- SSO later
- Custom AI policy training

Pricing:

Custom

---

## Founder Pass

A Founder Pass can generate early revenue and build a committed early community.

Possible offer:

- Lifetime individual access
- Early supporter badge
- Access to full Academy as it grows
- Access to sandbox features
- Access to template library
- Discount on future certifications or Skill Trace pages

Possible price:

£199 one-time

Recommendation:

Limit it to a fixed number of seats, such as the first 100 users.

This prevents the lifetime offer becoming a long-term revenue problem.

---

## Prompt-as-Code / Agent Template Library

DeepMindResources may sell practical templates.

These should not be weak prompt packs.

They should be structured templates such as:

- Prompt systems
- Agent configuration files
- JSON templates
- YAML templates
- Workflow blueprints
- Tool-calling examples
- RAG evaluation checklists
- Business automation templates

Possible pricing:

- £9 per template
- Included in Individual Architect
- Included or expanded in Business Team

Templates should be verified and updated when model or tool behaviour changes.

---

## Affiliate Stack Recommendations

Affiliate revenue can be useful, but it should not control recommendations.

Possible feature:

Agentic Stack Optimizer

This could help users estimate the cost of an AI workflow using tools such as:

- Hosting
- Database
- Vector database
- Automation platform
- AI model/API usage
- Monitoring
- Deployment tools

Affiliate links may be included where appropriate, but recommendations must remain transparent and use-case based.

The Tool Comparison and Trust Methodology skills should govern this.

---

## Stripe Requirements

Stripe will likely be used for payments.

Stripe needs to support:

- Individual subscriptions
- Business/team subscriptions
- Seat-based billing
- Founder Pass one-time payments
- Certification or Skill Trace one-time payments
- Template purchases later
- Subscription status syncing with Supabase

Do not build Stripe before the core access model and database model are clear.

---

## Access Control Requirements

The platform will need gated access.

Access may depend on:

- Free user
- Individual subscriber
- Business staff member
- Business manager
- Business admin
- Enterprise account
- Founder Pass holder
- One-off purchase

Access control should affect:

- Lessons
- Sandbox tasks
- Progress dashboards
- Tool comparison depth
- Template downloads
- Skill Trace publishing
- Business dashboards

---

## Course Update Architecture

When a verified AI update enters the system, it should trigger impact mapping.

Impact mapping should ask:

- Which course is affected?
- Which lesson is affected?
- Which sandbox task is affected?
- Which tool comparison is affected?
- Which business training path is affected?
- Does user progress need a refresher flag?
- Does a business dashboard need to show retraining required?

This is the main mechanism that keeps courses alive.

---

## Scout and Agent Workload

Scouts will be busy because the AI world changes constantly.

Scout output must not create chaos.

Scout output should become structured signals that flow through:

Source ingestion
→ Noise filtering
→ Validation
→ Master Brain
→ Impact mapping
→ Lesson/sandbox/comparison/business action

No scout signal should automatically become public content.

---

## Implementation Roadmap

### Phase 1: Planning and Architecture

- Course and monetization plan
- Database architecture plan
- Auth architecture plan
- Access control plan
- Initial course map
- Initial business training map

### Phase 2: Public Course Structure

- Academy overview
- Course pages
- Learning path pages
- Lesson page template
- Sandbox task template
- Tool comparison page template

### Phase 3: Auth and User Dashboard

- Supabase Auth
- User profiles
- User dashboard
- Lesson progress
- Sandbox progress
- Skill areas
- Updated lesson/refresher flags

### Phase 4: Course Data and Sandbox Completion

- Course tables
- Module tables
- Lesson tables
- Sandbox task tables
- Assessment records
- Skill evidence records

### Phase 5: Stripe Individual Subscription

- Stripe products
- Individual subscription
- Access gating
- Billing status sync
- Pro/Architect membership

### Phase 6: Business Workspaces

- Organisation accounts
- Staff invites
- Roles and permissions
- Assigned learning paths
- Team progress dashboard
- Manager reporting

### Phase 7: Business Billing

- Seat-based Stripe billing
- Business subscription status
- Team member limits
- Upgrade/downgrade handling

### Phase 8: Master Brain and Scout Automation

- Source ingestion queue
- Validation workflow
- Master Brain records
- Impact mapping
- Lesson update suggestions
- Sandbox task suggestions
- Business training impact

### Phase 9: Skill Trace and Template Revenue

- Verified Skill Trace pages
- Public proof links
- Template library
- One-off purchases
- Affiliate stack recommendations

---

## Immediate Next Technical Documents

After this plan, create:

1. `docs/DATABASE_ARCHITECTURE_PLAN.md`
2. `docs/AUTH_AND_ACCESS_CONTROL_PLAN.md`
3. `docs/STRIPE_MONETIZATION_PLAN.md`
4. `docs/INITIAL_COURSE_MAP.md`

These should be created before building auth, Stripe, business dashboards, or progress tables.

---

## Definition of Done

The course and monetization architecture is ready when it defines:

- No-video learning model
- Course hierarchy
- Lesson structure
- Lesson versioning
- Sandbox task structure
- Sandbox versioning
- User progress model
- User dashboard requirements
- Business workspace model
- Business dashboard requirements
- Monetization tiers
- Stripe requirements
- Access control requirements
- Course update architecture
- Scout/Master Brain impact mapping
- Implementation phases

---

## Locked Rule

DeepMindResources should not be a static AI course website.

It should be a living training system where verified AI change updates lessons, sandbox tasks, progress, business readiness, and tool intelligence over time.
