# Academy Architecture Plan

## Purpose

This document defines the structure for the DeepMind Resources Academy before any new Academy pages are built.

The Academy must not become a static course library. It should become the structured learning layer that turns verified AI intelligence into practical skill development.

The core product loop remains:

```text
AI update → verified meaning → practical lesson → sandbox task → user skill gain
```

The Academy is where verified knowledge becomes organised training. The Sandbox is where training becomes practice. Progress tracking is where practice becomes measurable skill evidence.

---

## Current Catalogue Foundation

The catalogue foundation is now strong enough to support Academy planning.

Current known structure:

```text
Companies: 133
Platforms: 174
Model families: 104
Models: 100

Platform → Company links: 174 / 174 valid
Model → Company links: 100 / 100 valid
Model → Platform links: 100 / 100 valid
Model → Family links: 100 / 100 valid
Source-enriched platforms: 174 / 174
Invalid or missing catalogue links: 0
```

This means the catalogue can now support Academy routing by company, platform, model family, model, capability, comparison group, and training use case.

Important: catalogue enrichment does not automatically make something public-safe. Catalogue records can be Brain-ready while still blocked from public Academy or client-facing publication until review.

---

## Academy Product Role

The Academy should be the public and signed-in learning system for DeepMind Resources.

It should answer:

- What should a learner study first?
- Which AI skills matter for their role?
- Which tools, models, or workflows are relevant?
- Which lessons are current?
- Which lessons changed because AI changed?
- Which sandbox task proves the skill?
- Which business users need retraining?
- Which learning path should the user follow next?

The Academy should connect lessons, sandbox tasks, catalogue entities, verified Brain updates, business training, and progress evidence.

---

## What the Academy Is

The Academy is:

- A structured AI learning system.
- A source-aware training layer.
- A versioned lesson and practice framework.
- A bridge between verified AI updates and practical skill gain.
- A way for individuals to learn AI safely and progressively.
- A way for businesses to train staff, track readiness, and respond to AI changes.
- A route into Sandbox practice and measurable progress.

---

## What the Academy Is Not

The Academy is not:

- A generic blog.
- A static course marketplace.
- A random list of AI tutorials.
- A public dump of catalogue records.
- A hype-driven ranking site.
- An automatic publisher of unreviewed Brain data.
- A place where every model or tool instantly becomes a lesson.

Academy content should be structured, reviewed, useful, current, and connected to practical outcomes.

---

## Core Academy Hierarchy

The long-term Academy hierarchy should be:

```text
Academy
  → Learning path
    → Module
      → Lesson
        → Lesson version
          → Knowledge check
          → Sandbox task version
          → Skill evidence
          → Progress event
```

This structure allows lessons to be updated when the AI landscape changes without losing a user's history.

A user may have completed a lesson, but if the lesson changes because of a verified update, the system should be able to show:

```text
Completed before update
Refresher recommended
Updated lesson available
New sandbox task available
Skill recheck recommended
Business retraining required
```

---

## Main Academy Page Scope

The first Academy build should be a polished public overview page at:

```text
/app/academy/page.tsx
```

The first page should not be a full course player or database-heavy learning dashboard.

It should explain:

- What the Academy is.
- Who it is for.
- How learning paths work.
- How the Brain keeps lessons current.
- How Sandbox tasks prove skill.
- How business training fits in.
- Which tracks exist.
- Which levels exist.
- Which access tiers apply.
- What the user should do next.

The page should be public-facing, SEO-aware, mobile responsive, polished, and aligned with the current blue/white DeepMind Resources visual standard.

---

## Public Academy Page Recommended Structure

Recommended page structure:

```text
1. Hero
   - Pill: AI Academy
   - Headline: Build AI competency that stays current as the frontier moves.
   - Supporting copy: verified updates, learning paths, sandbox tasks, measurable skill.
   - CTAs: View syllabus, Try sandbox, Create workspace.

2. Why this Academy is different
   - Not static lessons.
   - Not generic AI tips.
   - Connected to verified Brain updates.
   - Designed around practical skill evidence.

3. Learning tracks
   - Beginner Core
   - Business Readiness
   - Builder Track
   - Tool Intelligence Track

4. How the Academy works
   - Learn the concept.
   - Practise in sandbox.
   - Prove the skill.
   - Refresh when AI changes.

5. Brain-connected learning
   - Verified updates can affect lessons, sandbox tasks, comparisons, and business retraining.

6. Levels and roles
   - Beginner, intermediate, advanced, business.
   - Individual learner, builder, staff member, manager, business admin.

7. Access and membership
   - Free Explorer.
   - Individual Architect.
   - Business Team.
   - Enterprise / Custom.

8. Trust and safety note
   - Source-aware learning.
   - Human review before publication.
   - No unreviewed catalogue dumping.

9. Final CTA
   - Start with the syllabus.
   - Explore the sandbox.
   - Create workspace.
```

---

## Academy Tracks

The Academy should organise learning paths into clear tracks instead of presenting every course as an equal card.

### Beginner Core

For users who need safe, practical foundations.

Initial paths:

- AI Fundamentals
- Prompt Engineering
- AI Tool Selection
- AI Safety and Validation Basics

Goal:

```text
Help users understand AI concepts, write better prompts, choose suitable tools, and avoid common mistakes before using AI in real work.
```

### Business Readiness

For business owners, managers, and staff teams.

Initial paths:

- AI for Business Productivity
- AI Tool Selection for Teams
- Safe AI Use at Work
- AI Workflow Mapping
- AI Output Validation

Goal:

```text
Help businesses use AI safely, practically, and measurably without exposing sensitive information or adopting tools blindly.
```

### Builder Track

For technical learners, operators, and advanced users.

Initial paths:

- Tool Calling and Functions
- RAG and Knowledge Systems
- AI Agents
- Agentic Workflows
- Multi-Agent Systems
- AI Coding Workflows

Goal:

```text
Help builders understand how AI systems connect to tools, knowledge, workflows, agents, code, and validation layers.
```

### Tool Intelligence Track

For users who need to compare tools, models, platforms, and workflows.

Initial paths:

- AI Tool Comparison
- Model and Platform Selection
- Capability-Based Tool Choice
- Business Tool Stack Planning
- Research and Search Tool Evaluation

Goal:

```text
Help users avoid wasting time and money on tools that do not fit their actual scenario.
```

---

## Skill Levels

Skill level should be separate from customer type.

### Beginner

A beginner should be able to:

- Understand basic AI terms.
- Use AI tools safely.
- Write structured prompts.
- Recognise unsupported claims.
- Complete simple sandbox tasks.

### Intermediate

An intermediate user should be able to:

- Design better prompts for specific outcomes.
- Compare tools for a real scenario.
- Create simple AI-assisted workflows.
- Validate AI output before use.
- Complete practical sandbox tasks with review criteria.

### Advanced

An advanced user should be able to:

- Design agentic workflows.
- Work with tool-calling concepts.
- Understand RAG patterns.
- Compare model and platform trade-offs.
- Build validation and review systems.
- Understand where automation needs human gates.

### Business

A business learner should be able to:

- Apply AI safely in workplace tasks.
- Choose tools for staff workflows.
- Avoid sensitive data exposure.
- Validate outputs before business use.
- Follow company AI policy.
- Understand when retraining or manager review is required.

---

## Business Training Levels

Business training should use role-aware levels.

### Awareness Level

For staff who need to understand what AI can and cannot do.

Focus:

- Safe usage.
- Basic prompting.
- Common risks.
- Data privacy.
- When to ask for review.

### Practical User Level

For staff who will use AI in daily work.

Focus:

- Writing prompts.
- Summarising and drafting.
- Checking outputs.
- Using approved tools.
- Following workflow rules.

### Power User Level

For staff who will improve workflows.

Focus:

- Workflow mapping.
- Tool comparison.
- Prompt templates.
- Validation checklists.
- Team productivity patterns.

### Technical Builder Level

For technical staff and builders.

Focus:

- APIs.
- RAG.
- Agents.
- Tool calling.
- Data pipelines.
- System boundaries.

### Manager Level

For managers and business owners.

Focus:

- Staff readiness.
- Risk management.
- Tool approval.
- Team progress.
- Workflow adoption.
- Retraining triggers.

---

## User Types

The Academy should support these user types:

```text
Individual learner
Builder
Business staff member
Manager
Business admin
Enterprise stakeholder
```

Each user type may see different emphasis:

- Individual learners need a path and personal progress.
- Builders need technical depth and sandbox practice.
- Staff need safe usage and practical scenarios.
- Managers need readiness and risk visibility.
- Business admins need assignments, team progress, and reporting.
- Enterprise stakeholders need custom governance and training alignment.

---

## Monetization and Access Tiers

Academy structure should support monetization from the beginning without making the first public page feel like a hard sales page.

### Free Explorer

Public and limited access.

Includes:

- Academy overview.
- Syllabus preview.
- Selected beginner lessons.
- Public Sandbox demo.
- Limited tool intelligence previews.

Purpose:

```text
Show the learning system clearly enough for users to trust the platform and understand the upgrade value.
```

### Individual Architect

Paid individual learning tier.

Includes:

- Full individual Academy access.
- Full Sandbox access.
- Saved progress.
- Skill confidence tracking.
- Refresher recommendations.
- Tool comparison practice.
- Personal learning dashboard.

Purpose:

```text
Help individuals build practical, current AI skill with structured guidance and measurable progress.
```

### Business Team

Paid team training tier.

Includes:

- Team learning paths.
- Staff assignments.
- Business-safe sandbox tasks.
- Manager progress reporting.
- AI safety training status.
- Workflow readiness tracking.
- Retraining alerts when AI changes affect completed training.

Purpose:

```text
Help companies train staff safely, track readiness, and respond when AI workflows or tools change.
```

### Enterprise / Custom

Custom training and governance tier.

Includes:

- Custom role-based paths.
- Private onboarding.
- Custom workflow training.
- Advanced reporting.
- Policy-aligned training.
- Enterprise review processes.

Purpose:

```text
Support larger organisations that need custom AI adoption, governance, training, and reporting.
```

### Founder Pass / Early Access

Optional early-access monetization layer.

Can include:

- Discounted lifetime or early subscription access.
- Early Academy access.
- Early Sandbox access.
- Feedback role in shaping paths.
- Limited availability.

This should not distract from the main long-term business model.

---

## Brain to Academy Interaction

The Brain should not publish directly to the Academy without review.

The intended flow:

```text
1. Source signal is collected.
2. Source is classified.
3. Source is verified.
4. Brain record is created or updated.
5. Brain record links to catalogue entities.
6. Impact mapping checks affected paths, lessons, sandbox tasks, comparisons, and business training.
7. A lesson update, new lesson, refresher, or review task is proposed.
8. Human/admin review approves publication.
9. Academy content version updates.
10. User and business progress records can show refresher or retraining needs.
```

---

## Brain Update Impact Types

A verified Brain update may affect:

```text
Learning path
Module
Lesson
Lesson version
Sandbox task
Tool comparison
Capability page
Business training path
Manager report
Progress state
Skill confidence recommendation
Publication queue item
```

Possible impact states:

```text
No action required
Minor content refresh
Lesson update required
Sandbox task update required
New lesson recommended
Tool comparison update required
Business retraining recommended
High-priority review required
```

---

## Lesson Versioning Rules

Lessons should be versioned so progress remains meaningful.

A lesson should have:

```text
lesson_id
lesson_version_id
version_number
source_update_id where relevant
catalogue_entity_ids where relevant
capability_ids where relevant
comparison_group_ids where relevant
skill_area
level
audience_type
status
published_at
reviewed_at
```

When a lesson is updated, the previous version should not be erased from the user's progress history.

Instead, progress should be able to show:

```text
Completed on version 1
Current version is version 2
Refresher recommended
New sandbox task available
```

---

## Sandbox Connection

Every important Academy lesson should eventually connect to a sandbox task, quick check, or practical exercise.

The Sandbox should prove the user can apply the skill.

Examples:

```text
Prompt lesson → prompt rewrite task
Tool selection lesson → tool comparison exercise
RAG lesson → retrieval quality check
AI safety lesson → hallucination spotting task
Business productivity lesson → workflow mapping task
Agent lesson → bounded agent design task
```

Sandbox tasks should include:

```text
task_id
task_version_id
related_lesson_id
skill_area
scenario
input data rules
expected output
success criteria
review checklist
risk notes
progress weight
```

---

## Progress and Skill Evidence

The Academy should measure practical skill, not just page views.

Useful evidence includes:

- Completed sandbox task.
- Improved prompt.
- Tool comparison decision.
- AI answer validation.
- Workflow map.
- RAG quality review.
- Agent design with review gates.
- Business workflow plan.
- Manager-reviewed team task.

Progress states may include:

```text
Not started
In progress
Completed
Needs review
Completed before update
Refresher recommended
Updated lesson available
Related sandbox task pending
Skill recheck recommended
```

---

## Catalogue Relationship Rules

Catalogue entities should support Academy routing but should not automatically become Academy lessons.

Catalogue records may connect to:

```text
Company
Platform
Model family
Model
Capability
Comparison group
Source signal
Brain record
Lesson
Sandbox task
Business training path
Publication queue item
```

Rules:

- A catalogue entity can be Brain-ready without being public-safe.
- A source-enriched entity can support internal planning before public release.
- A lesson should cite or reference reviewed Brain records, not raw catalogue enrichment alone.
- Tool comparisons should be use-case based, not universal rankings.
- Public pages should avoid exposing unreviewed internal assumptions.

---

## Public vs Signed-In Experience

### Public Academy

Public pages should:

- Explain the learning system.
- Show available tracks.
- Preview selected paths.
- Build trust.
- Route users to syllabus, sandbox, business training, signup, or login.
- Avoid exposing private progress or unreviewed Brain records.

### Signed-In Academy

Signed-in pages should eventually show:

- Assigned paths.
- Lesson progress.
- Sandbox tasks.
- Saved attempts.
- Refresher alerts.
- Recommended next steps.
- Skill confidence.
- Business team assignments where relevant.

### Business Workspace

Business workspace pages should eventually show:

- Team members.
- Assigned learning paths.
- Staff progress.
- Sandbox completion.
- Skill readiness.
- AI safety training status.
- Manager review status.
- Retraining alerts.

---

## Route Strategy

Recommended public routes:

```text
/academy
/academy/fundamentals
/academy/prompt-engineering
/academy/tool-selection
/academy/business-ai-training
/academy/ai-safety-validation
/academy/ai-agents
/academy/rag-knowledge-systems
/academy/tool-intelligence
```

Recommended existing related routes:

```text
/syllabus
/sandbox
/business
/platform
/brain/catalog
```

The first build should only create:

```text
/app/academy/page.tsx
```

Additional path pages should come after the Academy architecture and public overview are stable.

---

## Academy Main Page Design Rules

The Academy main page should follow the current public visual standard:

- Blue/white crisp style.
- Soft blue faded background.
- Blue pill labels with white text.
- Polished icons where useful.
- Mobile responsive layout.
- No fake stats.
- No fake live data.
- No internal/admin/build-status copy.
- Strong trust language.
- Clear public-facing explanations.
- CTAs to syllabus, sandbox, business, signup, and login.

Customer-facing brand name:

```text
DeepMind Resources
```

Customer-facing domain:

```text
deepmindresources.pro
```

---

## First Build Scope

The first Academy build should include:

- Public `/academy` route.
- Metadata and canonical URL.
- SEO-aware copy.
- Learning track cards.
- Brain-connected learning explanation.
- Levels and roles section.
- Monetization/access tier section.
- Sandbox connection section.
- CTA section.

The first Academy build should not include:

- New database migrations.
- Auth-gated course player.
- Progress tracking UI.
- Business dashboard changes.
- Automatic lesson generation.
- Publication automation.
- New API routes.
- Large refactors.

---

## Future Build Phases

### Phase 1: Public Academy Foundation

Build:

```text
/academy
```

Goal:

```text
Explain the Academy clearly and route users into syllabus, sandbox, business training, and signup.
```

### Phase 2: Public Learning Path Pages

Build selected public path pages:

```text
/academy/fundamentals
/academy/prompt-engineering
/academy/tool-selection
/academy/business-ai-training
```

Goal:

```text
Create SEO-ready path pages that explain outcomes, modules, skill levels, and sandbox practice.
```

### Phase 3: Signed-In Academy MVP

Build private learning dashboard.

Goal:

```text
Let users see lessons, progress, sandbox tasks, and next recommended steps.
```

### Phase 4: Brain Update Integration

Connect verified Brain updates to lesson impact records.

Goal:

```text
Flag lessons and sandbox tasks when AI changes affect previous training.
```

### Phase 5: Business Training and Reporting

Build business team assignment and reporting tools.

Goal:

```text
Allow managers to assign paths, track staff readiness, and see retraining recommendations.
```

---

## Non-Goals for Now

Do not build yet:

- Full certification engine.
- Enterprise custom curriculum editor.
- Automated publication from Brain to Academy.
- Full quiz engine.
- Full business manager dashboard.
- Lesson marketplace.
- Public community features.
- Complex recommendation engine.

These may come later, but the first Academy build should stay focused and stable.

---

## Definition of Done for Academy Planning

Academy planning is ready for the first page build when:

```text
The main Academy purpose is clear.
Learning tracks are defined.
Skill levels are defined.
Business training levels are defined.
Monetization access tiers are defined.
Brain-to-Academy update flow is defined.
Catalogue relationship rules are defined.
Public vs signed-in boundaries are defined.
First build scope is limited to /academy.
```

---

## Immediate Next Step

Build the public Academy main page:

```text
app/academy/page.tsx
```

The page should be a polished customer-facing overview, not an internal planning screen.

Recommended primary CTA:

```text
View syllabus
```

Recommended secondary CTAs:

```text
Try sandbox
Business training
Create workspace
```

The page should make the Academy feel like a living AI training system connected to verified updates, practical lessons, sandbox tasks, progress, and business readiness.
