# Academy Module, Progress and Monetization Plan

## Purpose

This document defines the operating structure for the DeepMind Resources Academy before lesson pages, progress dashboards, awards, business workspaces, or monetized access tiers are built.

The Academy must not become a loose library of static lessons.

It must become a version-aware AI training system where learning paths, modules, lessons, knowledge checks, sandbox tasks, progress records, awards, business dashboards, and Brain-driven updates all work together.

The operating loop remains:

```text
AI update -> verified meaning -> practical lesson -> sandbox task -> user skill gain
```

For business users, the operating loop becomes:

```text
AI update -> verified business meaning -> staff training -> workflow practice -> team capability gain
```

---

## Staged Writing Plan

This document is designed to be reviewed in stages, but it can be installed as one file once the direction is approved.

### Stage 1: Academy operating foundation

Covers:

- Core Academy hierarchy
- Student onboarding levels
- Learning tracks
- Progress principles
- Dashboard direction
- Awards direction
- Monetization direction
- Business development direction
- Brain update direction
- Future build phases

### Stage 2: AI Fundamentals module map

Covers:

- Full AI Fundamentals learning path
- Module count
- Lesson count
- Module outcomes
- Lesson outcomes
- Knowledge checks
- Sandbox tasks
- Assessment rules
- Student movement rules

### Stage 3: Lesson template and assessment model

Covers:

- Lesson page structure
- Lesson block structure
- Knowledge check patterns
- Sandbox task patterns
- Assessment scoring
- Skill evidence capture
- Completion states

### Stage 4: Dashboard and award model

Covers:

- Learner dashboard sections
- Skill map
- Continue-learning logic
- Refresher alerts
- Skill evidence display
- Module badges
- Path badges
- Verified AI Skill Trace rules

### Stage 5: Monetization and business product model

Covers:

- Free Explorer
- Individual Architect
- Business Team
- Enterprise / Custom
- Founder Pass
- Skill Trace revenue
- Template revenue
- Business training packs
- Manager reporting
- Staff retraining alerts

### Stage 6: Brain update and data model bridge

Covers:

- Brain update impact mapping
- Lesson version update flow
- Sandbox task update flow
- Business retraining flow
- Required future tables
- Required status fields
- Publication review flow

---

## Core Academy Hierarchy

The Academy should use this hierarchy:

```text
Academy
  -> Track
    -> Learning Path
      -> Module
        -> Lesson
          -> Lesson Blocks
          -> Knowledge Check
          -> Sandbox Task
          -> Assessment
          -> Skill Evidence
          -> Progress Event
```

### Track

A track groups learning paths by learner goal or business context.

Examples:

- Beginner Core
- Practical AI User
- Builder Track
- Business Readiness

### Learning Path

A learning path is a structured journey around a major capability area.

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

### Module

A module is a focused section inside a learning path.

A module should teach one connected cluster of skills.

A module should usually include:

- Three to six lessons
- One knowledge check
- One practical sandbox task or scenario task
- One module outcome
- One progress event
- Optional business variant where useful

### Lesson

A lesson teaches one specific concept, decision, workflow, or skill.

A lesson should not be counted as completed just because the user opened it.

A lesson should usually include:

- Lesson title
- Skill area
- Difficulty level
- Audience
- Learning outcome
- Plain-English explanation
- Practical example
- Common mistake
- Knowledge check
- Related sandbox task
- Related tools or models where useful
- Related Brain records where useful
- Version number
- Review status

### Lesson Blocks

Lesson blocks are the reusable sections inside a lesson.

Recommended lesson blocks:

- Orientation
- Concept explanation
- Practical example
- Use-case mapping
- Common mistake
- Safety or validation note
- Business relevance where useful
- Quick recap
- Knowledge check
- Sandbox handoff
- Next step

### Knowledge Check

A knowledge check confirms that the learner understood the lesson or module.

Knowledge checks may include:

- Multiple-choice questions
- Scenario questions
- Classification tasks
- Short written answers
- Reflection checks
- Tool-selection questions
- Safety and validation questions

### Sandbox Task

A sandbox task proves practical application.

Sandbox tasks should include:

- Scenario
- Starting input
- Instructions
- Expected output
- Success criteria
- Common mistake
- Review checklist
- Skill area
- Difficulty level
- Related lesson
- Version number

### Assessment

An assessment decides whether the learner can move forward.

Assessments should test practical ability, not memory alone.

Assessment types may include:

- Quick checks
- Scenario questions
- Sandbox submissions
- Tool comparison exercises
- Source validation challenges
- Workflow plans
- Manager-reviewed business tasks

### Skill Evidence

Skill evidence records what the learner can actually do.

Examples:

- Completed sandbox task
- Improved prompt
- Tool selection decision
- Source validation result
- Safe workflow checklist
- Agent workflow outline
- Business workflow plan
- Manager-reviewed task

### Progress Event

A progress event records meaningful movement through the Academy.

Possible progress events:

- Lesson viewed
- Knowledge check passed
- Sandbox task started
- Sandbox task submitted
- Sandbox task passed
- Module completed
- Path completed
- Refresher recommended
- Skill recheck required

---

## Student Onboarding Levels

Student routing should be based on ability, goal, and context.

### Beginner

For users new to AI or overwhelmed by hype.

Needs:

- Simple explanations
- Safe usage rules
- AI vocabulary
- Prompting basics
- Tool category basics
- Confidence building

First recommended track:

```text
Beginner Core
```

First recommended path:

```text
AI Fundamentals
```

Dashboard emphasis:

- Continue learning
- Beginner progress
- Confidence
- Safety basics
- First sandbox task

### Practical AI User

For users who already use AI occasionally but need structure.

Needs:

- Better prompting
- Output validation
- Tool choice
- Repeatable workflows
- Safe productivity habits

First recommended track:

```text
Practical AI User
```

First recommended paths:

- Prompt Engineering
- AI Tool Selection
- AI for Business Productivity

Dashboard emphasis:

- Current workflow skill
- Tool comparison practice
- Prompt improvement
- Sandbox completion
- Output validation

### Power User

For users who want reusable AI workflows.

Needs:

- Prompt templates
- Workflow design
- Comparison tasks
- Evaluation checklists
- Tool chaining concepts

First recommended track:

```text
Practical AI User
```

Secondary track:

```text
Builder Track
```

Dashboard emphasis:

- Reusable templates
- Workflow practice
- Advanced sandbox tasks
- Skill evidence
- Tool fit

### Builder

For technical or semi-technical learners.

Needs:

- Tool calling
- Structured outputs
- RAG
- Agent workflows
- Multi-agent design
- Debugging and validation

First recommended track:

```text
Builder Track
```

First recommended paths:

- Tool Calling and Functions
- RAG and Knowledge Systems
- AI Agents
- Agentic Workflows

Dashboard emphasis:

- Builder progression
- Technical sandbox evidence
- Architecture skill map
- Debugging tasks
- Agent safety

### Manager

For users responsible for team adoption.

Needs:

- Staff readiness visibility
- Risk management
- Training assignment
- Progress reporting
- Tool selection
- Retraining alerts

First recommended track:

```text
Business Readiness
```

First recommended paths:

- Safe AI Use at Work
- AI Tool Selection for Teams
- Manager AI Readiness

Dashboard emphasis:

- Team readiness
- Staff progress
- Risk and safety status
- Training assignment
- Retraining flags

### Business Admin

For organisation owners or training leads.

Needs:

- Organisation workspace
- Staff invites
- Assigned paths
- Team dashboard
- Billing seats
- Skill gap reporting
- Business retraining workflow

First recommended track:

```text
Business Readiness
```

First recommended workspace:

```text
Business Team Workspace
```

Dashboard emphasis:

- Organisation overview
- Seat usage
- Team completion
- Skill gaps
- Manager reports
- Business retraining alerts

---

## Onboarding Questions

The onboarding flow should eventually ask:

```text
1. Are you learning for yourself or for a business/team?
2. What is your current AI level?
3. Are you technical, non-technical, or managing others?
4. What do you want to do first?
5. Which matters most: learning, tool choice, workflow building, or staff training?
6. Do you need progress tracking or team reporting?
```

These answers should route the learner into the correct track, path, and dashboard emphasis.

---

## Academy Tracks

### Beginner Core

Purpose:

Help new learners understand AI safely and clearly.

Initial paths:

- AI Fundamentals
- Prompt Engineering Basics
- AI Tool Selection Basics
- AI Safety and Validation Basics

Expected outcome:

The learner understands what AI is, how to use basic tools safely, how to write a structured prompt, and how to avoid unsupported claims.

### Practical AI User

Purpose:

Help users turn AI from occasional use into repeatable workflow support.

Initial paths:

- Prompt Engineering
- Workflow Design
- Tool Comparison
- AI for Business Productivity
- Output Validation

Expected outcome:

The learner can apply AI to real tasks, validate output, compare tools, and build simple repeatable workflows.

### Builder Track

Purpose:

Help technical and semi-technical learners build controlled AI systems.

Initial paths:

- Tool Calling and Functions
- RAG and Knowledge Systems
- AI Agents
- Agentic Workflows
- Multi-Agent Systems
- AI Coding Workflows

Expected outcome:

The learner understands how AI systems connect to tools, data, retrieval, agents, code, and validation layers.

### Business Readiness

Purpose:

Help organisations train staff safely and measure team capability.

Initial paths:

- Safe AI Use at Work
- Business AI Productivity
- AI Tool Selection for Teams
- Workflow Mapping
- Manager AI Readiness
- Staff Retraining After AI Updates

Expected outcome:

The business can assign training, monitor staff readiness, reduce unsafe AI use, and respond when important AI changes require retraining.

---

## First Learning Path: AI Fundamentals

AI Fundamentals is the first complete beginner foundation path.

It should not be a single lesson.

It should contain six modules and a final skill check.

```text
AI Fundamentals
  Module 1: AI Orientation and Baseline
  Module 2: What AI Is and Is Not
  Module 3: How Modern AI Tools Work
  Module 4: AI Strengths, Limits, and Risks
  Module 5: AI Tool Categories and Use Cases
  Module 6: Safe Practical AI Workflow
  Final: Fundamentals Skill Check and Sandbox Assessment
```

### Path Audience

AI Fundamentals is for:

- Beginners
- Non-technical learners
- Business staff
- Managers who need safe AI literacy
- Users who feel overwhelmed by AI tools
- Users who need a stable foundation before prompting, tool selection, or agents

### Path Outcome

By the end of AI Fundamentals, the learner should be able to:

- Explain what AI means in practical terms
- Understand that AI output is not automatically verified truth
- Identify basic AI tool categories
- Recognise where AI is useful and where it is risky
- Avoid sharing sensitive data in unsafe contexts
- Write a basic structured prompt
- Check output before using it
- Choose a tool category based on the task
- Complete beginner-level sandbox validation tasks

### Required Completion Evidence

A learner should complete AI Fundamentals only when they have:

- Completed all required module lessons
- Passed module knowledge checks
- Completed at least three sandbox tasks
- Passed the final scenario assessment
- Completed a confidence self-rating
- Earned an AI Fundamentals skill evidence record

---

## AI Fundamentals Module 1: AI Orientation and Baseline

### Purpose

Understand the learner's starting level and introduce the DeepMind Resources learning model.

### Lessons

1. What you will learn in AI Fundamentals
2. How DeepMind Resources teaches AI
3. AI skill levels: beginner, user, builder, manager
4. Baseline check: what do you already understand?

### Student Outcome

By the end of this module, the student knows:

- Where they are starting
- What path they are on
- What practical skill means
- How lessons, sandbox tasks, and updates connect

### Knowledge Check

Baseline diagnostic quiz.

This should identify confidence and prior understanding, not block progress.

### Sandbox Task

No required sandbox task for this module.

Optional task:

```text
Write your first AI learning goal and map it to one practical outcome.
```

### Progress Effect

The learner dashboard should show:

- Path started
- Baseline complete
- Recommended next module
- Initial confidence level

### Brain Update Sensitivity

Low.

This module explains the learning system rather than time-sensitive AI capability.

### Monetization Note

This module should be free or mostly free.

It helps users understand the platform and should support conversion into Individual Architect or Business Team plans.

---

## AI Fundamentals Module 2: What AI Is and Is Not

### Purpose

Remove hype and give the learner a practical mental model.

### Lessons

1. What artificial intelligence means in practical terms
2. What large language models are
3. Why AI sounds confident even when wrong
4. Prediction, reasoning, retrieval, and automation

### Student Outcome

By the end of this module, the student can explain:

- AI is not magic
- AI output is not automatically verified
- Different AI systems do different jobs
- Human judgement still matters
- Confident language does not prove correctness

### Knowledge Check

The learner classifies sample AI claims as:

- Supported
- Unsupported
- Needs source checking
- Unsafe to use without review

### Sandbox Task

```text
Compare a confident wrong answer with a verified answer.
```

The learner must identify why one answer is not safe to use and what source or review step would be required.

### Progress Effect

The learner dashboard should show:

- AI concept understanding improved
- Validation skill introduced
- First practical evidence available if sandbox task is passed

### Brain Update Sensitivity

Medium.

The basic concept is stable, but examples may need refreshing when model behaviour, retrieval systems, or tool interfaces change.

### Monetization Note

This module should be free or partially free.

It is the best trust-building entry point for new learners.

---

## AI Fundamentals Module 3: How Modern AI Tools Work

### Purpose

Explain the moving parts behind modern AI tools.

### Lessons

1. Prompts, context, and instructions
2. Models, apps, and platforms
3. Files, memory, retrieval, and search
4. Why model updates change behaviour

### Student Outcome

By the end of this module, the student understands:

- Why context changes output quality
- Why the same prompt can behave differently across tools
- Why AI apps are not the same as AI models
- Why model and platform updates matter
- Why retrieval and files are different from model memory

### Knowledge Check

The learner matches each concept to a practical example:

- Prompt
- Model
- App
- Platform
- Tool
- Retrieval
- Memory
- Context window
- Automation

### Sandbox Task

```text
Run the same task with missing context and complete context, then compare output quality.
```

The learner must explain why the better context produced a better answer.

### Progress Effect

The learner dashboard should show:

- Context skill introduced
- Tool structure understanding improved
- Sandbox evidence pending or complete

### Brain Update Sensitivity

High.

This module may need updates when tool interfaces, model behaviour, context windows, retrieval features, or memory features change.

### Monetization Note

This module should sit inside Individual Architect, with selected preview content available to Free Explorer.

---

## AI Fundamentals Module 4: AI Strengths, Limits, and Risks

### Purpose

Teach safe judgement before tool dependence.

### Lessons

1. What AI is good at
2. What AI is bad at
3. Hallucinations and weak claims
4. Privacy, bias, and sensitive data basics

### Student Outcome

By the end of this module, the student can:

- Choose low-risk AI tasks
- Spot risky AI outputs
- Avoid sharing sensitive information
- Know when human review is required
- Recognise weak or unsupported claims

### Knowledge Check

The learner classifies tasks as:

- Safe
- Needs review
- Do not use AI
- Use only with approved tools or policies

### Sandbox Task

```text
Audit three AI-generated outputs and mark which one is safe to use, which needs checking, and which should be rejected.
```

### Progress Effect

The learner dashboard should show:

- AI safety skill introduced
- Validation skill improved
- Privacy awareness recorded
- Business readiness relevance increased

### Brain Update Sensitivity

High.

This module may need updates when AI privacy rules, tool policies, product settings, or safety recommendations change.

### Monetization Note

This module should be available in Individual Architect and Business Team.

Business Team should include a staff-safe variant.

---

## AI Fundamentals Module 5: AI Tool Categories and Use Cases

### Purpose

Stop beginners thinking every AI product does the same thing.

### Lessons

1. Chatbots vs search tools vs coding assistants
2. Research tools vs general assistants
3. Automation tools vs agent systems
4. Choosing tools based on the job

### Student Outcome

By the end of this module, the student can:

- Identify what kind of AI tool they need
- Avoid choosing tools from hype
- Understand why one tool is not universally best
- Match tool categories to real use cases
- Start with the task instead of the brand name

### Knowledge Check

Tool matching quiz.

The learner chooses the best tool category for each scenario and explains why.

### Sandbox Task

```text
Build a simple tool-selection decision table for five real tasks.
```

The learner must identify task, tool category, risk level, review requirement, and reason for choice.

### Progress Effect

The learner dashboard should show:

- Tool selection skill introduced
- Use-case thinking improved
- Related Tool Intelligence recommendations unlocked

### Brain Update Sensitivity

High.

This module depends on current tool categories, capabilities, and market changes.

### Monetization Note

Core concepts can be free, but full tool comparison practice should belong to Individual Architect or Business Team.

---

## AI Fundamentals Module 6: Safe Practical AI Workflow

### Purpose

Turn AI understanding into a repeatable habit.

### Lessons

1. Define the task before choosing the tool
2. Give context, constraints, and output format
3. Check the output before using it
4. Create a simple AI workflow checklist

### Student Outcome

By the end of this module, the student can:

- Use AI in a controlled workflow
- Write a basic structured prompt
- Check output quality
- Decide next steps safely
- Build a repeatable AI-use checklist

### Knowledge Check

Workflow design assessment.

Given a task, the learner defines:

- Input
- Tool category
- Prompt structure
- Review step
- Safe output use
- Escalation point

### Sandbox Task

```text
Create a safe AI-assisted workflow for summarising, drafting, researching, or planning.
```

The learner must include a human review step and a sensitive-data warning.

### Progress Effect

The learner dashboard should show:

- Beginner practical workflow skill gained
- AI Fundamentals path nearly complete
- Final skill check unlocked

### Brain Update Sensitivity

Medium.

The workflow structure is stable, but examples and tool recommendations may need updates.

### Monetization Note

This module should be paid for full completion because it creates practical workflow value.

---

## AI Fundamentals Final Skill Check

### Purpose

Confirm the learner can apply the full foundation.

### Scenario

A manager asks the learner to use AI to summarise customer feedback and recommend next actions.

### Student Must Demonstrate

The learner must:

- Identify privacy risks
- Pick a suitable AI tool category
- Write a structured prompt
- Add a human review step
- Explain what should not be pasted into the tool
- Decide whether the output is ready to use
- Explain how they would verify important claims

### Assessment Type

Scenario-based assessment with checklist scoring.

### Passing Evidence

To pass, the learner must produce:

- Task definition
- Tool category choice
- Prompt draft
- Risk checklist
- Review step
- Output validation plan

### Dashboard Effect

When passed, the dashboard should show:

- AI Fundamentals complete
- Beginner Core progress increased
- AI Fundamentals Badge awarded
- Next recommended path available
- Skill evidence record created

### Award

```text
AI Fundamentals Badge
```

### Skill Trace Effect

This path should contribute to future Verified AI Skill Trace eligibility, but should not by itself create a full public Skill Trace unless combined with sandbox evidence and account verification.

---

## Core Progress Principles

Progress must measure skill development, not passive reading.

A learner should move through these states:

```text
Not started
In progress
Lesson viewed
Knowledge check passed
Sandbox pending
Sandbox started
Sandbox submitted
Sandbox passed
Module complete
Path complete
Completed before update
Refresher recommended
Skill recheck recommended
```

### Movement Rules

A lesson can be marked as viewed when the learner opens or reaches the end of the lesson.

A lesson can be marked as understood when the knowledge check is passed.

A skill can be marked as practised when the sandbox task is submitted.

A module can be marked complete when the learner passes the module assessment or required sandbox task.

A path can be marked complete when all required modules, assessments, and sandbox tasks are complete.

A path can become outdated-aware when a verified Brain update changes lesson or sandbox task requirements.

---

## Student Dashboard Direction

The student dashboard should answer:

```text
1. What am I learning?
2. How far have I progressed?
3. What can I actually do now?
4. What needs practice?
5. What changed since I completed something?
6. What should I do next?
```

Core dashboard sections:

- Current learning path
- Continue learning
- Module progress
- Skill map
- Sandbox evidence
- Knowledge checks
- Refresher alerts
- Awards and Skill Trace
- Subscription or access state

### Current Learning Path

Shows the active path, current module, next lesson, progress percentage, and next required action.

Example:

```text
AI Fundamentals
Module 2 of 6
Next lesson: What large language models are
Next action: Knowledge check
Progress: 28%
```

### Continue Learning

Shows the next unlocked action.

This should not be a random list of lessons.

Priority order:

1. Required unfinished lesson
2. Required knowledge check
3. Required sandbox task
4. Module assessment
5. Final skill check
6. Refresher caused by Brain update

### Skill Map

Shows progress by skill area.

Example skill areas:

- AI fundamentals
- Prompt engineering
- Tool selection
- AI safety
- Output validation
- Business AI productivity
- Agentic workflows
- RAG and knowledge systems

### Sandbox Evidence

Shows completed and pending practical work.

Example:

```text
3 tasks completed
1 task awaiting review
2 tasks recommended next
```

### Refresher Alerts

Shows when a completed lesson, module, or path was updated after completion.

Example:

```text
Prompting Basics was updated after you completed it.
New sandbox task available.
```

---

## Award Direction

Awards should prove skill, not just attendance.

Possible awards:

- Module Badge
- Learning Path Badge
- Sandbox Proof
- AI Safety Readiness Badge
- Business Readiness Badge
- Manager-Reviewed Evidence
- Verified AI Skill Trace

Awards should be version-aware.

Example:

```text
AI Fundamentals Badge: valid
Prompt Engineering Badge: refresher recommended
Business AI Safety Badge: skill recheck required
```

### Module Badge

Awarded when a learner completes the required lessons, knowledge check, and sandbox or assessment for a module.

### Learning Path Badge

Awarded when a learner completes all required modules and the final assessment for a path.

### Sandbox Proof

Awarded when a learner passes a practical sandbox task.

### Business Readiness Badge

Awarded when a business learner completes a staff-safe path and required safety checks.

### Verified AI Skill Trace

A stronger future credential that shows:

- Path completed
- Lesson versions completed
- Sandbox tasks passed
- Assessment results
- Date completed
- Current or outdated status
- Verification link

---

## Monetization Direction

The monetization model should connect access to real product value.

### Free Explorer

Purpose:

Trust, discovery, and conversion.

Likely access:

- Academy overview
- Syllabus preview
- Limited beginner lessons
- Limited Live AI Intelligence previews
- One or two sandbox demos
- Limited tool intelligence previews
- Limited or no full progress tracking

Recommended price:

```text
Free
```

### Individual Architect

Purpose:

Paid individual learning.

Likely access:

- Full Academy
- Full individual learning paths
- Sandbox tasks
- Tool comparisons
- Live AI Intelligence explanations
- Personal progress dashboard
- Skill tracking
- Refresher alerts
- Template library
- Verified Skill Trace discount or allowance

Recommended price:

```text
£19 to £29 per month
```

### Business Team

Purpose:

Main revenue tier.

Likely access:

- Organisation workspace
- Staff invites
- Assigned learning paths
- Team progress dashboard
- Business-safe sandbox tasks
- AI safety training
- Skill gap reporting
- Manager reports
- Staff retraining alerts
- Business tool recommendations

Recommended price:

```text
£49 to £99 per user per month
```

### Enterprise / Custom

Purpose:

Higher-ticket training, governance, and business support.

Likely access:

- Custom learning paths
- Private onboarding
- Custom workflow training
- Advanced reporting
- Priority support
- Policy-aligned training
- Custom tool comparison support
- Enterprise review processes

Recommended price:

```text
Custom
```

### One-Off Revenue

Possible one-off products:

- Founder Pass
- Verified Skill Trace
- Prompt-as-code templates
- Agent workflow templates
- Business training packs
- Tool recommendation reports

---

## Business Development Direction

Business development should focus on workplace AI capability, not just seat sales.

### Staff AI Onboarding

For new AI users inside a company.

Includes:

- AI Fundamentals for Staff
- Safe AI Use at Work
- Prompting for Workplace Tasks
- Validation Basics
- Company Policy Check

### Team AI Readiness

For managers and team leads.

Includes:

- Assigned learning paths
- Skill dashboard
- Staff completion
- Safety status
- Sandbox completion
- Manager review

### Business Tool Selection

For owners, operations teams, and AI leads.

Includes:

- Tool selection lessons
- Tool-spend audit
- Use-case comparison
- Team-fit recommendations
- Privacy and admin-control notes

### Workflow Training Packs

For departments and repeatable business processes.

Examples:

- Customer support AI workflow
- Marketing content workflow
- Operations automation workflow
- Research workflow
- Internal knowledge workflow
- Meeting and document workflow

### AI Retraining Alerts

For businesses that need to stay current when AI changes.

Example dashboard message:

```text
This verified update affects:
- Customer support workflow training
- Prompt validation module
- Tool selection recommendation
- 12 staff completed an older version
- Refresher recommended
```

---

## Brain Update Direction

The Brain should recommend updates. It should not silently rewrite public lessons.

Intended workflow:

```text
1. Source signal detected.
2. Source classified.
3. Claim validated.
4. Brain record created or updated.
5. Brain record linked to company, platform, model, capability, or comparison group.
6. Impact mapping checks affected paths, modules, lessons, sandbox tasks, tool comparisons, and business training.
7. Update recommendation created.
8. Human or admin review approves.
9. New lesson or sandbox version is published.
10. Student dashboard flags affected progress.
11. Business dashboard flags retraining where needed.
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

## Future Data Objects

The following data objects will likely be needed later.

### Learning Objects

- tracks
- learning_paths
- modules
- lessons
- lesson_versions
- lesson_blocks
- knowledge_checks
- knowledge_check_questions
- sandbox_tasks
- sandbox_task_versions
- assessments

### Progress Objects

- lesson_progress
- module_progress
- learning_path_progress
- knowledge_check_attempts
- sandbox_attempts
- skill_evidence
- awards
- skill_trace_records
- refresher_recommendations

### Business Objects

- organisations
- organisation_memberships
- business_assignments
- team_progress_rollups
- manager_reviews
- business_retraining_alerts
- business_training_paths

### Brain Bridge Objects

- brain_lesson_impacts
- brain_sandbox_impacts
- brain_business_impacts
- lesson_update_recommendations
- sandbox_update_recommendations
- publication_review_queue

---

## Future Build Phases

### Phase 1: Planning Documents

- Academy module/progress/monetization plan
- AI Fundamentals module map
- Lesson template specification
- Dashboard and awards specification
- Brain update workflow specification

### Phase 2: Public Academy Structure

- Academy overview page
- Learning path page
- Module overview page
- Lesson page template
- Sandbox task template

### Phase 3: Progress Dashboard Mock

- Current path
- Module progress
- Skill map
- Sandbox evidence
- Refresher alerts
- Awards state

### Phase 4: Supabase Data Model

- Learning paths
- Modules
- Lessons
- Lesson versions
- Knowledge checks
- Sandbox tasks
- Sandbox versions
- Progress records
- Skill evidence records
- Award records

### Phase 5: Monetized Access

- Free Explorer access
- Individual Architect access
- Founder Pass access
- Stripe entitlement mapping
- Gated lesson and sandbox access

### Phase 6: Business Workspace

- Organisation workspace
- Staff invites
- Assigned paths
- Team progress
- Manager reports
- Business retraining alerts
- Seat-based billing

### Phase 7: Brain Impact Mapping

- Source signal to Brain record
- Brain record to lesson impact
- Brain record to sandbox impact
- Brain record to business retraining impact
- Admin review workflow

---

## Locked Decisions

1. Modules contain lessons. Lessons do not contain modules.
2. Lessons are versioned.
3. Sandbox tasks are versioned.
4. Reading alone does not equal skill.
5. Progress must track practical evidence.
6. Awards must be version-aware.
7. Business dashboards should show readiness, not just activity.
8. The Brain should recommend lesson updates, not publish directly.
9. Monetization should prioritise business team training and serious individual learners.
10. The Academy should remain a living AI training system, not a static course website.
11. AI Fundamentals should be the first full learning path.
12. AI Fundamentals should have six modules and a final skill check.
13. Free content should build trust; paid content should unlock depth, progress, sandbox practice, and business reporting.
14. Business products should focus on staff capability, tool fit, safety, and retraining as AI changes.
