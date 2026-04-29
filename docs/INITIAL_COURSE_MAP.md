# DeepMindResources Initial Course Map

## Purpose

This document defines the initial course map for DeepMindResources.

DeepMindResources is not a static course website. It is a living AI training and tool-intelligence platform where lessons, sandbox tasks, tool recommendations, and business training material can evolve as AI changes.

The course map must support the product promise:

AI update → verified meaning → practical lesson → sandbox task → user skill gain

This plan follows:

- `docs/PRODUCT_BLUEPRINT.md`
- `docs/DATABASE_ARCHITECTURE_PLAN.md`
- `docs/AUTH_AND_ACCESS_CONTROL_PLAN.md`
- `docs/STRIPE_MONETIZATION_PLAN.md`

---

## Current Planning Scope

This is an initial curriculum planning document, not a final content script.

No course data, database seed files, page content, lesson UI, or sandbox task code has been created from this document.

The goal is to define a first structured learning map before building:

- Course pages
- Lesson records
- Lesson versions
- Sandbox tasks
- Progress tracking
- Business learning paths
- Tool-intelligence pages
- Update-to-lesson refresh workflows

---

## Core Curriculum Principles

### 1. Start beginner-friendly, but do not stay shallow

DeepMindResources should take a user from AI beginner to professional-level AI workflow builder.

The platform should explain concepts simply, then build toward real-world tool use, automation, RAG, agents, validation, and business deployment.

### 2. Every lesson should have practical value

A lesson should not exist just to explain a buzzword.

Each lesson should help the user do at least one of these:

- Understand an AI concept clearly
- Choose the right AI tool for a real situation
- Improve prompting or workflow quality
- Build or debug a practical AI task
- Reduce hallucination or quality risk
- Apply AI safely in a business setting

### 3. Lessons should connect to sandbox practice

Where possible, lessons should connect to a practical sandbox task.

The sandbox is where learning becomes skill.

### 4. Versioning is required from day one

Lessons and sandbox tasks must be designed as versioned content.

The platform must eventually be able to show:

- Lesson completed before update
- Refresher recommended
- New sandbox task available
- Business staff retraining required

### 5. Business training should be built into the map

Business AI training should not be bolted on later.

Some courses can be individual-focused, but the map should also support business learners, managers, and staff training dashboards.

### 6. Tool intelligence should be part of learning

Users should learn not only AI concepts, but also which tools fit which scenarios.

Tool comparison should be practical and use-case based, not generic ranking content.

---

## Course Architecture Pattern

The curriculum should use this structure:

Learning Path → Module → Lesson → Lesson Version → Sandbox Task Version

### Learning Path

A major journey, such as AI Fundamentals or AI Agents.

### Module

A focused section inside a learning path.

### Lesson

A stable lesson identity, such as "What is a language model?"

### Lesson Version

The actual lesson content at a point in time.

### Sandbox Task Version

The practical exercise connected to a lesson or update.

This structure allows the content to change without losing historical progress.

---

## Initial Learning Paths

The first full map should cover these learning paths:

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

Not all paths need to be fully built at launch.

The first launch should prove the learning model with a smaller set of high-quality, version-aware lessons and sandbox tasks.

---

## Launch Priority

### Launch Track 1: Beginner to Practical AI User

Purpose:

Help beginners understand AI and start using tools properly.

Suggested paths:

- AI Fundamentals
- Prompt Engineering
- AI Tool Selection
- AI for Business Productivity

### Launch Track 2: Builder Foundation

Purpose:

Help technical and semi-technical users start building AI workflows.

Suggested paths:

- Tool Calling and Functions
- AI Agents
- RAG and Knowledge Systems

### Launch Track 3: Trust and Business Readiness

Purpose:

Help users apply AI safely and in business contexts.

Suggested paths:

- AI Safety, Validation, and Hallucination Control
- AI for Business Productivity
- AI Tool Selection

---

## Learning Path 1: AI Fundamentals

### Purpose

Teach users what AI is, how modern AI tools work, what language models can and cannot do, and how to think clearly about AI without hype.

### Audience

- Beginners
- Business staff
- Non-technical learners
- Users who feel overwhelmed by AI tools

### Outcome

The learner understands core AI concepts, knows the limits of AI tools, and can start learning more advanced skills with confidence.

### Module 1.1: What AI Is and Is Not

Lessons:

1. What artificial intelligence means in practical terms
2. What large language models are
3. Why AI tools sound confident even when wrong
4. The difference between prediction, reasoning, retrieval, and automation
5. Common AI myths and how to avoid them

Sandbox ideas:

- Compare confident wrong answers with verified answers
- Identify AI myths in sample marketing claims

### Module 1.2: How Modern AI Tools Work

Lessons:

1. Tokens, context windows, and why they matter
2. Prompts, responses, and system instructions
3. Models, tools, files, memory, and retrieval
4. Why model updates can change behaviour
5. How AI apps differ from AI models

Sandbox ideas:

- Rewrite a vague prompt with context-window awareness
- Test how missing context changes AI output quality

### Module 1.3: AI Strengths, Limits, and Risks

Lessons:

1. What AI is good at
2. What AI is bad at
3. Hallucinations and weak claims
4. Bias, privacy, and sensitive data basics
5. When not to use AI

Sandbox ideas:

- Classify tasks as safe, risky, or unsuitable for AI
- Create a simple AI-use checklist for a workplace task

### Module 1.4: The AI Tool Landscape

Lessons:

1. Chatbots vs coding assistants vs automation tools
2. Research tools vs general assistants
3. Model providers vs product platforms
4. Open-source vs closed AI tools
5. How to choose a tool based on the job

Sandbox ideas:

- Match tools to real use cases
- Build a simple tool-selection decision table

---

## Learning Path 2: Prompt Engineering

### Purpose

Teach users how to communicate clearly with AI tools and produce more reliable, useful outputs.

### Audience

- Beginners
- Intermediate users
- Business staff
- Content, research, support, and operations teams

### Outcome

The learner can design prompts that include role, task, context, constraints, examples, evaluation rules, and iteration steps.

### Module 2.1: Prompting Foundations

Lessons:

1. What a prompt really does
2. The anatomy of a useful prompt
3. Role, task, context, format, and constraints
4. Why vague prompts produce weak answers
5. How to ask for reasoning without asking for fluff

Sandbox ideas:

- Improve a weak prompt
- Turn a vague request into a structured prompt

### Module 2.2: Context and Constraints

Lessons:

1. Giving the model the right background
2. Setting audience, tone, and purpose
3. Using examples and counterexamples
4. Defining output format
5. Preventing unwanted assumptions

Sandbox ideas:

- Create a prompt with strict output constraints
- Compare outputs with and without examples

### Module 2.3: Iteration and Debugging

Lessons:

1. How to inspect a poor AI response
2. Fixing missing context
3. Fixing wrong format
4. Fixing shallow answers
5. Creating reusable prompt templates

Sandbox ideas:

- Debug a bad AI answer
- Build a reusable prompt template for a business task

### Module 2.4: Advanced Prompt Patterns

Lessons:

1. Decomposition prompts
2. Evaluation prompts
3. Comparison prompts
4. Critique and revision prompts
5. Workflow prompts

Sandbox ideas:

- Create a two-step critique and revision workflow
- Compare two tools using the same structured prompt

---

## Learning Path 3: AI Tool Selection

### Purpose

Teach users how to choose the right AI tools for real scenarios instead of following hype or generic recommendations.

### Audience

- Individual learners
- Business owners
- Managers
- Teams choosing AI subscriptions
- Technical and non-technical users

### Outcome

The learner can evaluate tools based on task fit, reliability, cost, privacy, integrations, workflow needs, and evidence.

### Module 3.1: Tool Selection Framework

Lessons:

1. Start with the use case, not the tool
2. How to define the job-to-be-done
3. Feature claims vs practical capability
4. Cost, risk, integrations, and support
5. Creating a tool-selection scorecard

Sandbox ideas:

- Build a scorecard for choosing an AI writing tool
- Compare two tools for a defined business task

### Module 3.2: Tool Categories

Lessons:

1. General assistants: ChatGPT, Claude, Gemini, Grok
2. Research tools: Perplexity and search-grounded systems
3. Coding tools: Codex, Cursor, Replit, and related tools
4. Automation tools: n8n, Zapier, and workflow builders
5. Agent frameworks: LangChain, CrewAI, and emerging frameworks

Sandbox ideas:

- Match tool categories to user needs
- Identify when a general chatbot is not enough

### Module 3.3: Use-Case Comparisons

Lessons:

1. Best AI tool for coding tasks
2. Best AI tool for research workflows
3. Best AI tool for business automation
4. Best AI tool for customer service support
5. Best AI tool for internal company knowledge

Sandbox ideas:

- Compare tools for a mock business scenario
- Explain why a popular tool is not always the best fit

### Module 3.4: Avoiding Tool Hype

Lessons:

1. How affiliate hype distorts AI recommendations
2. How to read release notes and marketing pages critically
3. How to test a tool before subscribing
4. How to spot outdated tutorials
5. How to document tool decisions for a team

Sandbox ideas:

- Audit a fake AI tool recommendation
- Create a simple tool trial plan

---

## Learning Path 4: AI for Business Productivity

### Purpose

Teach practical AI use for everyday business work, team productivity, operations, and staff training.

### Audience

- Business owners
- Managers
- Staff
- Operations teams
- Support teams
- Marketing and admin teams

### Outcome

The learner can apply AI to business tasks safely, consistently, and with measurable value.

### Module 4.1: Business AI Foundations

Lessons:

1. Where AI helps in business
2. Where AI creates risk in business
3. Turning business tasks into AI workflows
4. Human review and quality control
5. Creating simple AI usage rules for staff

Sandbox ideas:

- Convert a business task into an AI workflow
- Create a staff AI-use checklist

### Module 4.2: Everyday Productivity Workflows

Lessons:

1. Email and communication support
2. Meeting notes and action summaries
3. Document drafting and rewriting
4. Research summaries
5. Planning and decision support

Sandbox ideas:

- Turn messy notes into a clear action plan
- Draft a safe AI-assisted customer email

### Module 4.3: Team Training and Adoption

Lessons:

1. Why staff need AI training, not just AI access
2. Creating role-based AI learning paths
3. Tracking staff progress
4. Retraining after major AI updates
5. Building trust in AI-assisted workflows

Sandbox ideas:

- Design a staff training assignment
- Map AI skills to business roles

### Module 4.4: Business Tool Selection

Lessons:

1. Choosing tools for non-technical staff
2. Choosing tools for customer support
3. Choosing tools for internal knowledge
4. Choosing tools for marketing and content
5. Avoiding wasted AI subscriptions

Sandbox ideas:

- Recommend tools for a small business team
- Create a basic AI subscription audit

---

## Learning Path 5: Tool Calling and Functions

### Purpose

Teach users how AI systems can call tools, use functions, pass structured data, and connect model outputs to real actions.

### Audience

- Intermediate learners
- Developers
- Automation builders
- Technical business users

### Outcome

The learner understands tool calling concepts and can design simple tool-enabled AI workflows.

### Module 5.1: Tool Calling Basics

Lessons:

1. What tool calling means
2. Why AI needs tools
3. Function schemas and structured inputs
4. Tool results and model responses
5. Tool calling vs normal prompting

Sandbox ideas:

- Design a simple function schema
- Decide when a tool call is needed

### Module 5.2: Structured Outputs

Lessons:

1. Why structured output matters
2. JSON basics for AI workflows
3. Validating model output
4. Handling missing or malformed fields
5. Turning structured output into app behaviour

Sandbox ideas:

- Convert a free-text request into structured JSON
- Validate a model response against a schema

### Module 5.3: Practical Tool Workflows

Lessons:

1. Search and retrieval tools
2. Calendar and email tools
3. Database lookup tools
4. Business automation tools
5. Safety checks before actions

Sandbox ideas:

- Design a safe customer-support tool workflow
- Add a confirmation step before a risky action

### Module 5.4: Debugging Tool Calls

Lessons:

1. Common tool-calling failures
2. Bad schemas and ambiguous fields
3. Wrong tool selection
4. Missing permissions
5. Logging and testing tool workflows

Sandbox ideas:

- Debug a broken tool-call payload
- Improve a tool-call workflow with validation steps

---

## Learning Path 6: AI Agents

### Purpose

Teach users what AI agents are, what they are not, and how to design simple agentic systems without falling for hype.

### Audience

- Intermediate learners
- Developers
- Automation builders
- Business users evaluating agents

### Outcome

The learner can explain agent architecture, design simple agent workflows, and understand when agents are useful or risky.

### Module 6.1: Agent Foundations

Lessons:

1. What an AI agent is
2. Agents vs chatbots vs workflows
3. Goals, tools, memory, and planning
4. Autonomy levels
5. When not to use an agent

Sandbox ideas:

- Classify systems as chatbot, workflow, or agent
- Design an agent with clear boundaries

### Module 6.2: Agent Components

Lessons:

1. Instructions and role definition
2. Tool access and permissions
3. Memory and context
4. Planning and task decomposition
5. Evaluation and stop conditions

Sandbox ideas:

- Write a safe agent instruction set
- Define tool permissions for a business agent

### Module 6.3: Building Simple Agents

Lessons:

1. Single-agent task execution
2. Agent loops and state
3. Handling uncertainty
4. Human-in-the-loop review
5. Logging agent actions

Sandbox ideas:

- Build a simple research assistant workflow
- Add a human approval step to an agent task

### Module 6.4: Agent Risks and Reliability

Lessons:

1. Runaway actions and poor boundaries
2. Tool misuse
3. Hallucinated plans
4. Hidden failure modes
5. Safe deployment patterns

Sandbox ideas:

- Identify risks in an unsafe agent design
- Add guardrails to an agent workflow

---

## Learning Path 7: RAG and Knowledge Systems

### Purpose

Teach retrieval-augmented generation, internal knowledge systems, source grounding, and practical knowledge workflows.

### Audience

- Intermediate learners
- Developers
- Business teams
- Knowledge managers
- Support teams

### Outcome

The learner understands how AI systems use external knowledge and how to design basic RAG workflows with source awareness.

### Module 7.1: RAG Foundations

Lessons:

1. What RAG means
2. Why models need retrieval
3. Documents, chunks, embeddings, and search
4. Retrieval vs memory
5. Grounded answers and source references

Sandbox ideas:

- Explain which source supports an answer
- Design a small document retrieval workflow

### Module 7.2: Knowledge Base Design

Lessons:

1. Choosing documents for a knowledge base
2. Cleaning and organising knowledge
3. Chunking basics
4. Metadata and filters
5. Keeping knowledge fresh

Sandbox ideas:

- Plan a business knowledge base
- Identify poor source material for RAG

### Module 7.3: RAG Quality and Evaluation

Lessons:

1. Retrieval failure modes
2. Missing context and wrong chunks
3. Evaluating answer quality
4. Testing with known questions
5. Handling conflicting sources

Sandbox ideas:

- Diagnose a bad RAG answer
- Build an evaluation checklist for internal knowledge

### Module 7.4: Business Knowledge Systems

Lessons:

1. Internal policy assistants
2. Customer support knowledge assistants
3. Sales and product knowledge tools
4. Privacy and access boundaries
5. When RAG is not enough

Sandbox ideas:

- Design a company knowledge assistant
- Decide which documents should be excluded

---

## Learning Path 8: Agentic Workflows

### Purpose

Teach users how to combine prompts, tools, retrieval, state, validation, and human review into practical workflows.

### Audience

- Intermediate to advanced learners
- Developers
- Automation builders
- Business process owners

### Outcome

The learner can design multi-step AI workflows that are useful, testable, and controlled.

### Module 8.1: Workflow Thinking

Lessons:

1. From one prompt to a workflow
2. Inputs, steps, outputs, and checks
3. State and handoffs
4. Human approval points
5. Measuring workflow success

Sandbox ideas:

- Turn a business process into an AI workflow map
- Add checkpoints to a workflow

### Module 8.2: Workflow Patterns

Lessons:

1. Research and summarise
2. Draft and review
3. Extract and structure
4. Compare and recommend
5. Monitor and alert

Sandbox ideas:

- Design a draft-and-review workflow
- Build a compare-and-recommend workflow outline

### Module 8.3: Workflow Reliability

Lessons:

1. Error handling
2. Retry logic
3. Guardrails and constraints
4. Logging outputs
5. Testing workflow changes

Sandbox ideas:

- Add error handling to a workflow plan
- Create a workflow testing checklist

### Module 8.4: Business Automation Examples

Lessons:

1. Lead qualification workflow
2. Customer support triage workflow
3. Internal policy answer workflow
4. Research monitoring workflow
5. Staff training update workflow

Sandbox ideas:

- Design a customer support triage workflow
- Design a staff retraining alert workflow

---

## Learning Path 9: Multi-Agent Systems

### Purpose

Teach users how multiple agents can collaborate, where multi-agent systems are useful, and how to prevent complexity from creating unreliable systems.

### Audience

- Advanced learners
- Developers
- Automation architects
- Technical founders

### Outcome

The learner can design a simple multi-agent system with clear roles, handoffs, validation, and failure controls.

### Module 9.1: Multi-Agent Foundations

Lessons:

1. Why use more than one agent
2. Specialist agents vs one general agent
3. Coordination and handoffs
4. Shared state and memory
5. Multi-agent failure modes

Sandbox ideas:

- Split a complex task into agent roles
- Identify unnecessary agents in an overbuilt design

### Module 9.2: Agent Roles and Responsibilities

Lessons:

1. Scout agents
2. Tool agents
3. Validator agents
4. Lesson builder agents
5. Business training agents

Sandbox ideas:

- Design agent roles for an AI update workflow
- Create boundaries for a validator agent

### Module 9.3: Multi-Agent Workflow Design

Lessons:

1. Sequential workflows
2. Parallel research workflows
3. Debate and comparison workflows
4. Review and approval workflows
5. Escalation to humans

Sandbox ideas:

- Design a multi-agent validation workflow
- Add human review to a multi-agent system

### Module 9.4: Operating Multi-Agent Systems

Lessons:

1. Logging and traceability
2. Cost and latency
3. Evaluating outputs
4. Preventing agent drift
5. Safe production deployment

Sandbox ideas:

- Create a monitoring checklist for multi-agent workflows
- Diagnose a failed multi-agent handoff

---

## Learning Path 10: AI Safety, Validation, and Hallucination Control

### Purpose

Teach users how to evaluate AI outputs, reduce hallucination risk, validate claims, and apply AI responsibly.

### Audience

- All learners
- Business teams
- Editors
- Validators
- Developers
- Managers

### Outcome

The learner can spot weak AI outputs, validate claims against sources, and design safer AI workflows.

### Module 10.1: Hallucination Basics

Lessons:

1. What hallucination means
2. Why AI invents details
3. Confident tone vs verified truth
4. Risk levels by task type
5. How to respond to uncertain outputs

Sandbox ideas:

- Identify hallucinated claims
- Rewrite an answer with uncertainty labels

### Module 10.2: Source Validation

Lessons:

1. Official sources vs weak sources
2. Release notes and documentation
3. Multiple-source agreement
4. Contradictory sources
5. Creating a source-backed answer

Sandbox ideas:

- Rank sources by trust level
- Build a source validation checklist

### Module 10.3: Output Evaluation

Lessons:

1. Accuracy checks
2. Completeness checks
3. Relevance checks
4. Safety checks
5. Business impact checks

Sandbox ideas:

- Score an AI output with a rubric
- Improve a weak answer using an evaluation checklist

### Module 10.4: Safe AI Workflows

Lessons:

1. Human-in-the-loop controls
2. Approval gates
3. Sensitive data rules
4. Audit trails
5. When to escalate to an expert

Sandbox ideas:

- Add safety gates to a business AI workflow
- Create a safe-use policy for a team

---

## Initial Sandbox Task Families

Sandbox tasks should be reusable across learning paths.

### Prompt testing tasks

Examples:

- Improve a vague prompt
- Add constraints to a prompt
- Create a reusable prompt template
- Compare outputs from two prompt versions

### Tool-selection tasks

Examples:

- Match AI tools to real business use cases
- Build a tool scorecard
- Identify hype in a tool recommendation
- Choose between two tools for a scenario

### Validation tasks

Examples:

- Identify unsupported claims
- Rank source trust levels
- Add uncertainty labels
- Create a source-backed explanation

### Agent design tasks

Examples:

- Design a single-agent workflow
- Define agent tools and permissions
- Add stop conditions
- Add human approval steps

### RAG tasks

Examples:

- Design a basic knowledge base
- Choose documents for retrieval
- Diagnose poor retrieval
- Evaluate grounded answers

### Business automation tasks

Examples:

- Convert a business task into an AI workflow
- Design a customer support triage workflow
- Create a staff training assignment
- Build a retraining alert workflow

---

## Skill Levels

The course map should use clear levels.

### Beginner

Learner can understand concepts and use AI tools safely for simple tasks.

### Intermediate

Learner can design prompts, workflows, comparisons, and basic automations.

### Advanced

Learner can build agentic workflows, RAG systems, multi-agent designs, and validation pipelines.

### Business

Learner can apply AI inside teams, choose tools, manage adoption, and track staff training.

These are not mutually exclusive. A business learner may be beginner, intermediate, or advanced technically.

---

## Suggested MVP Course Build

The first content build should avoid trying to create the entire academy at once.

A practical MVP could include:

### MVP Path A: AI Fundamentals

Initial lessons:

1. What artificial intelligence means in practical terms
2. What large language models are
3. Why AI tools sound confident even when wrong
4. Prompts, responses, and system instructions
5. What AI is good at and bad at

Initial sandbox tasks:

1. Identify a hallucinated claim
2. Improve a vague prompt
3. Match AI tasks to safe and risky use cases

### MVP Path B: Prompt Engineering

Initial lessons:

1. The anatomy of a useful prompt
2. Role, task, context, format, and constraints
3. Preventing unwanted assumptions
4. Debugging a poor AI response
5. Creating reusable prompt templates

Initial sandbox tasks:

1. Rewrite a weak prompt
2. Add constraints and output format
3. Debug a bad AI answer

### MVP Path C: AI Tool Selection

Initial lessons:

1. Start with the use case, not the tool
2. Feature claims vs practical capability
3. General assistants vs coding assistants vs automation tools
4. How to create a tool-selection scorecard
5. How to test a tool before subscribing

Initial sandbox tasks:

1. Match tools to use cases
2. Build a tool-selection scorecard
3. Audit a fake AI tool recommendation

### MVP Path D: AI Safety and Validation

Initial lessons:

1. What hallucination means
2. Official sources vs weak sources
3. Multiple-source agreement
4. Accuracy, completeness, relevance, and safety checks
5. Human-in-the-loop controls

Initial sandbox tasks:

1. Rank source trust levels
2. Score an AI output with a rubric
3. Add safety gates to a workflow

This MVP proves the core product pattern before deeper agent and RAG paths are built.

---

## Business Training Starter Map

Business training should begin with practical, role-aware modules.

### Business Starter Module 1: AI Basics for Staff

Lessons:

1. What AI can help with at work
2. What staff should not use AI for
3. How to write safe business prompts
4. How to check AI answers before using them
5. How to avoid sharing sensitive data

### Business Starter Module 2: AI Productivity Workflows

Lessons:

1. Summarising notes and documents
2. Drafting internal communications
3. Researching with source checks
4. Turning meetings into action plans
5. Creating reusable team prompts

### Business Starter Module 3: AI Tool Choice for Teams

Lessons:

1. Choosing tools by role and task
2. Avoiding duplicate subscriptions
3. Comparing general assistants and specialist tools
4. Testing tools before rollout
5. Documenting tool decisions

### Business Starter Module 4: AI Safety for Teams

Lessons:

1. Human review rules
2. Sensitive data rules
3. Hallucination checks
4. Source validation
5. Retraining after AI platform changes

Business sandbox tasks:

- Create a team AI-use checklist
- Design a role-based training assignment
- Create a tool subscription audit
- Build a staff retraining trigger scenario

---

## Update-to-Course Refresh Logic

Every significant AI update should be mapped against the course structure.

An update should answer:

- What changed?
- Why does it matter?
- Who should care?
- What skill does this affect?
- Should a lesson be updated?
- Should a new lesson be created?
- Should a sandbox task be created?
- Should business staff retraining be required?

### Example update impact

A major AI platform changes tool-calling behaviour.

Possible effects:

- Update Tool Calling and Functions lessons
- Create new sandbox task for revised tool schema behaviour
- Flag older completions as needing refresher
- Notify business users whose staff completed outdated tool-calling training

### Version significance

Lesson and task changes should eventually be classified as:

- `minor`
- `moderate`
- `major`
- `breaking`

Only meaningful changes should trigger refresher or retraining states.

---

## Content Trust Standards

Lessons should follow the validation principle from the product blueprint.

DeepMindResources should prefer:

- Official documentation
- Official release notes
- Trusted technical sources
- Reproducible tests
- Multiple-source agreement
- Clear practical value

Lessons should avoid:

- Unsupported claims
- Tool hype
- Affiliate-style recommendations
- Old information presented as current
- Comparisons without clear use cases
- Publishing raw agent output without review

---

## Initial Lesson Metadata Requirements

Every lesson should eventually include:

- Stable lesson slug
- Title
- Summary
- Learning path
- Module
- Level
- Audience
- Estimated minutes
- Current version number
- Last reviewed date
- Validation status
- Publication status
- Related tools
- Related skills
- Related sandbox tasks
- Source references where needed

This metadata supports AI-search intent, progress tracking, refresh logic, and trust.

---

## Initial Sandbox Metadata Requirements

Every sandbox task should eventually include:

- Stable task slug
- Title
- Summary
- Task type
- Level
- Related lesson
- Current version number
- Instructions
- Expected output
- Evaluation rubric
- Validation status
- Publication status
- Source update reference where relevant

This allows sandbox tasks to evolve as tools and models change.

---

## Suggested Public Page Strategy

Public pages should support SEO, AI-search intent, and trust.

Potential public pages:

- `/academy`
- `/academy/ai-fundamentals`
- `/academy/prompt-engineering`
- `/academy/ai-tool-selection`
- `/academy/ai-for-business-productivity`
- `/sandbox`
- `/tool-intelligence`
- `/business-ai-training`
- `/ai-safety-validation`

Public pages should explain:

- Who the path is for
- What the learner will be able to do
- How lessons stay current
- How sandbox practice works
- How the path connects to tool intelligence
- Whether the content is free, account-gated, or paid

---

## Suggested First Build Order After Planning

### Phase 1: Course data model and seed plan

Use the database architecture to create the first learning path, module, lesson, lesson version, sandbox task, and progress tables.

### Phase 2: MVP course content records

Seed or manually create first records for:

- AI Fundamentals
- Prompt Engineering
- AI Tool Selection
- AI Safety and Validation

### Phase 3: Public academy pages

Build public-facing pages for the initial paths with SEO and trust standards.

### Phase 4: Authenticated progress

Let signed-in users track progress against lesson versions.

### Phase 5: Sandbox MVP

Create simple sandbox tasks for prompt improvement, validation, and tool selection.

### Phase 6: Update-to-refresh proof

Create a simple manual update record that can flag a lesson as needing review or refresher.

This proves the living-learning model before full agent automation.

---

## Open Decisions

These decisions should be made before final course seeding:

1. Which learning paths are public at launch.
2. Which lessons are free vs account-gated vs paid.
3. Whether sandbox tasks require login from the beginning.
4. Whether business training appears as a separate path or a filtered version of existing lessons.
5. Whether lesson content is written as Markdown, structured JSON, or both.
6. Whether lessons include quizzes in the first version.
7. Whether sandbox evaluation is manual, self-scored, rubric-based, or automated at launch.
8. Whether tool comparisons are lessons, separate pages, or both.
9. Whether course levels should be beginner/intermediate/advanced or beginner/builder/business/pro.
10. How often lessons should be reviewed even without major AI updates.
11. Which AI platforms and tools should be tracked first.
12. Whether certification or completion badges are part of the first release.

---

## Non-Goals for the First Course Build

Do not build these first:

- Full certification system
- Fully automated AI-generated lesson publishing
- Complete multi-agent academy
- Complex course marketplace
- Live cohort training system
- Advanced quiz engine
- Enterprise-only custom curriculum builder
- Full model benchmark lab
- Public community discussion system

The first course build should prove:

- Clear beginner-to-practical learning paths
- Versioned lessons
- Version-aware progress
- Practical sandbox tasks
- Source-backed updates
- Tool-selection intelligence
- Business training direction

---

## Locked Direction

The initial DeepMindResources course map should teach AI from beginner to professional level while staying connected to tool intelligence, sandbox practice, validation, and business training.

The curriculum must support living updates, not static lessons.

The first course implementation should focus on quality, trust, and version-aware learning rather than trying to publish a huge academy immediately.

The foundation should make it possible to show:

- Lesson completed before update
- Refresher recommended
- New sandbox task available
- Business staff retraining required

That is the core course-map requirement.
