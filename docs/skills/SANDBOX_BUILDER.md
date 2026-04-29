# Sandbox Builder Skill

This skill defines how DeepMindResources should create hands-on sandbox tasks from verified AI intelligence, lessons, tool comparisons, and business workflows.

The Agentic Sandbox is where users practise and prove skill instead of only reading about AI.

---

## Core Purpose

The Sandbox Builder turns knowledge into practice.

It should create tasks that help users test prompts, compare tools, build agents, debug workflows, practise RAG, use tool calling, and simulate business automation.

The goal is not to create random coding exercises.

The goal is to create practical AI tasks that connect directly to lessons, skills, and real-world use cases.

---

## Product Promise Connection

Every sandbox task should support the DeepMindResources product loop:

AI update → verified meaning → practical lesson → sandbox task → user skill gain

A sandbox task should help the learner apply a verified concept or workflow.

---

## Sandbox Task Types

DeepMindResources may create sandbox tasks such as:

- Prompt testing task
- Prompt improvement task
- Model comparison task
- Tool-calling exercise
- Function-calling task
- Agent-building task
- Agent debugging task
- RAG retrieval task
- Knowledge-base task
- Workflow automation task
- Multi-agent simulation
- Business automation scenario
- Tool comparison experiment
- Hallucination detection task
- Source validation challenge
- Output evaluation task

---

## Required Sandbox Questions

Before creating a sandbox task, answer:

1. What skill does this task practise?
2. Which lesson does it support?
3. Which verified update or Master Brain record triggered it?
4. What should the learner build, test, compare, or debug?
5. What input does the learner receive?
6. What output should the learner produce?
7. What does a good result look like?
8. What common mistake should the task reveal?
9. How should the task be assessed?
10. Is the task beginner, intermediate, advanced, or business-facing?
11. Is the task safe and realistic?
12. Does the task require a specific tool, model, or API?
13. Are there cost, privacy, or setup concerns?

---

## Task Structure

A good sandbox task should include:

- Task title
- Skill area
- Difficulty level
- Short scenario
- Goal
- Instructions
- Starting input or template
- Expected output
- Success criteria
- Common mistakes
- Hint or guidance
- Review checklist
- Related lesson
- Related tool or model
- Source or verification note where relevant

---

## Difficulty Levels

### Beginner

Beginner tasks should:

- Be easy to understand
- Avoid unnecessary setup
- Teach one clear concept
- Provide examples
- Include simple success criteria

### Intermediate

Intermediate tasks should:

- Combine concepts
- Require judgment
- Include trade-offs
- Encourage comparison
- Include realistic constraints

### Advanced

Advanced tasks should:

- Include architecture decisions
- Require debugging
- Use tools, agents, APIs, or RAG
- Include validation criteria
- Reflect real technical workflows

### Business

Business tasks should:

- Simulate workplace use cases
- Avoid unnecessary code where possible
- Focus on process improvement
- Include risk, privacy, or approval considerations
- Be suitable for staff training

---

## Task Quality Rules

Sandbox tasks must be:

- Practical
- Testable
- Connected to a real skill
- Grounded in verified information
- Clear enough to complete
- Challenging enough to teach
- Safe for the intended user

Avoid tasks that are:

- Vague
- Pure theory
- Unrelated to lessons
- Based on unverified claims
- Too complex for the stated level
- Tool-specific without explaining why
- Fake productivity demos with no learning value

---

## Prompt Testing Tasks

Prompt tasks should help users understand how prompt design affects output.

They may practise:

- Role framing
- Context setting
- Constraints
- Output format control
- Iterative improvement
- Evaluation criteria
- Reducing hallucination
- Adapting prompts for different tools

A prompt task should include a clear success standard.

---

## Model Comparison Tasks

Model comparison tasks should compare models fairly.

They should define:

- Same input prompt
- Same task goal
- Evaluation criteria
- Output comparison method
- Strengths and weaknesses
- When one model is more suitable

Do not compare models vaguely.

Compare them for a specific task.

---

## Tool-Calling Tasks

Tool-calling and function-calling tasks should practise controlled use of external tools.

They should include:

- Tool purpose
- Function schema or plain-language equivalent
- Expected tool call
- Expected response handling
- Error handling scenario where useful
- Validation of final answer

Tasks should teach users when tool calling is useful and when it is unnecessary.

---

## Agent-Building Tasks

Agent tasks should teach structure, not magic.

They should define:

- Agent goal
- Available tools
- Boundaries
- Memory or context rules
- Success criteria
- Failure cases
- Validation approach

Avoid implying that agents should run freely without constraints.

---

## RAG and Knowledge Tasks

RAG tasks should teach retrieval quality and source grounding.

They may include:

- Chunking examples
- Retrieval testing
- Source relevance checks
- Answer grounding
- Hallucination detection
- Citation review
- Knowledge-base update simulation

RAG tasks should make clear that better retrieval usually matters more than flashy output.

---

## Business Workflow Tasks

Business workflow tasks should simulate real workplace needs.

Examples:

- Draft customer support triage workflow
- Compare automation options for onboarding
- Build a staff prompt checklist
- Evaluate AI tool risk for a team
- Map a repetitive process to an AI-assisted workflow
- Create a validation checklist for AI-generated reports

Business tasks should include practical constraints.

---

## Assessment Rules

Each sandbox task should include success criteria.

Possible assessment methods:

- Checklist
- Rubric
- Expected output comparison
- Error detection
- Reflection questions
- Automated tests where possible
- Peer or manager review for business tasks

The assessment should measure skill, not just completion.

---

## Safety and Privacy Rules

Sandbox tasks should not encourage unsafe behaviour.

Avoid tasks that require:

- Real private customer data
- Secret keys
- Sensitive company data
- Unapproved automation of business-critical systems
- Unsafe code execution
- Misleading or deceptive use of AI

Use synthetic or sample data unless a secure production workflow exists.

---

## Tool and Cost Rules

If a task requires a paid tool, API key, or external account, state that clearly.

Where possible, offer:

- No-code version
- Low-cost version
- Conceptual version
- Mock data version
- Local-only version

Do not assume users have access to every AI subscription.

---

## SEO and AI Search Rules

Public sandbox tasks should be understandable to search systems.

Each public task should include:

- Clear title
- Unique meta description
- Search intent
- Skill area
- Difficulty level
- Plain-English summary
- Related lesson
- Practical outcome

AI search systems should be able to understand what the task teaches and who it is for.

---

## Agent Responsibilities

### Sandbox Builder Agent

Creates sandbox tasks from verified records and lessons.

### Lesson Builder Agent

Provides learning objectives and supporting material.

### Validator Agent

Checks whether the task is accurate and safe.

### Tool Agent

Provides tool capability and limitation context.

### Business Training Agent

Adapts tasks for workplace training.

### Master Brain

Stores task relationships, source references, and update triggers.

---

## Definition of Done

A sandbox task is complete when it has:

- Clear skill target
- Clear difficulty level
- Related lesson or verified update
- Practical scenario
- Instructions
- Expected output
- Success criteria
- Common mistakes or hints
- Safety/privacy check
- Assessment method
- No unsupported claims

---

## Locked Rule

The Agentic Sandbox must turn AI knowledge into practical skill.

If a task does not help the user practise, test, compare, or validate something meaningful, it should not be built.
