'use client'

import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  ClipboardCheck,
  LockKeyhole,
  MessageSquareText,
  Route,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react'

type AgentMode = 'prompt' | 'workflow' | 'validation'

type GuideMode = {
  id: AgentMode
  label: string
  title: string
  description: string
  icon: typeof MessageSquareText
  starterPrompt: string
  userPromptLabel: string
  userPromptPlaceholder: string
  taskGoal: string
  successCriteria: string[]
  guidance: string[]
  exampleOutput: string
}

const guideModes: GuideMode[] = [
  {
    id: 'prompt',
    label: 'Prompt Coach',
    title: 'Improve a weak AI prompt',
    description:
      'Use the Sandbox Guide Agent to turn a vague request into a structured prompt with role, task, context, constraints, and output rules.',
    icon: MessageSquareText,
    starterPrompt: 'Write me something about AI for small businesses.',
    userPromptLabel: 'Paste or write a weak prompt',
    userPromptPlaceholder:
      'Example: Write me something about AI for small businesses.',
    taskGoal:
      'Rewrite the prompt so an AI system knows the audience, purpose, constraints, output format, and quality standard.',
    successCriteria: [
      'Defines the role the AI should take.',
      'Explains the audience and business context.',
      'Sets the required output format.',
      'Adds constraints, exclusions, or quality checks.',
      'Includes a clear success standard.',
    ],
    guidance: [
      'Start by naming the role: strategist, analyst, tutor, workflow designer, or reviewer.',
      'Add the audience: beginner, manager, staff team, developer, or business owner.',
      'State the output format before asking for content.',
      'Add constraints such as tone, length, assumptions to avoid, or required sections.',
      'Ask the model to include checks, risks, or next steps when the task affects real work.',
    ],
    exampleOutput:
      'Act as an AI workflow strategist for small business owners. Create a concise guide explaining five practical AI use cases for operations, support, marketing, research, and admin. Use plain English, avoid hype, include implementation cautions, and finish with a short next-step checklist.',
  },
  {
    id: 'workflow',
    label: 'Workflow Coach',
    title: 'Map a task into an AI-assisted workflow',
    description:
      'Use the Sandbox Guide Agent to convert a real task into a controlled workflow with inputs, AI steps, review gates, and safe outputs.',
    icon: Workflow,
    starterPrompt:
      'Our team wants to use AI to summarise meeting notes and create follow-up actions.',
    userPromptLabel: 'Describe a workflow you want to improve',
    userPromptPlaceholder:
      'Example: Our team wants to use AI to summarise meeting notes and create follow-up actions.',
    taskGoal:
      'Break the task into a safe AI-assisted workflow with inputs, processing steps, human review, and final output rules.',
    successCriteria: [
      'Identifies the starting input clearly.',
      'Separates AI-assisted steps from human decisions.',
      'Includes a review or approval gate.',
      'Defines the final output format.',
      'Flags privacy, accuracy, or business-risk checks.',
    ],
    guidance: [
      'Start with the current manual process before adding AI.',
      'List what data enters the workflow and whether it is sensitive.',
      'Use AI for drafting, structuring, summarising, comparing, or extracting.',
      'Keep judgement, approval, and risky actions under human control.',
      'Define how the output will be checked before it is used.',
    ],
    exampleOutput:
      'Input: meeting transcript or notes. Step 1: AI extracts decisions, risks, blockers, and actions. Step 2: AI drafts a follow-up summary. Step 3: meeting owner checks accuracy and removes sensitive content. Step 4: approved action list is shared with owners and deadlines. Review gate: no task is assigned until a human confirms it.',
  },
  {
    id: 'validation',
    label: 'Validation Coach',
    title: 'Review an AI answer before trusting it',
    description:
      'Use the Sandbox Guide Agent to inspect an AI output for unsupported claims, missing evidence, risk, and required human review.',
    icon: ClipboardCheck,
    starterPrompt:
      'This workflow is fully compliant, safe to automate, and will reduce operating time by 60%.',
    userPromptLabel: 'Paste an AI claim or output to review',
    userPromptPlaceholder:
      'Example: This workflow is fully compliant, safe to automate, and will reduce operating time by 60%.',
    taskGoal:
      'Identify which parts of the AI output need evidence, caution, source checking, or human approval.',
    successCriteria: [
      'Separates supported facts from unsupported claims.',
      'Flags overconfident or vague wording.',
      'Identifies privacy, compliance, or operational risk.',
      'States what evidence is needed.',
      'Recommends a safe next review step.',
    ],
    guidance: [
      'Look for absolute claims such as “fully compliant”, “safe”, “guaranteed”, or exact percentages.',
      'Ask what source, test, policy, or measurement supports each claim.',
      'Flag anything that affects legal, financial, customer, employee, or operational decisions.',
      'Replace overconfident conclusions with conditional language until verified.',
      'Recommend human review before the output is used in a real workflow.',
    ],
    exampleOutput:
      'The claim is not ready to trust. “Fully compliant” needs legal or policy evidence. “Safe to automate” needs a risk review and approval process. “Reduce operating time by 60%” needs measurement data. Safe next step: run a limited pilot with synthetic data, define success metrics, and require human approval before rollout.',
  },
]

function getGuideMode(mode: AgentMode) {
  return guideModes.find((item) => item.id === mode) ?? guideModes[0]
}

function countMatchedCriteria(value: string, criteria: string[]) {
  const cleanValue = value.toLowerCase()

  return criteria.filter((criterion) => {
    const importantWords = criterion
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(' ')
      .filter((word) => word.length > 5)

    return importantWords.some((word) => cleanValue.includes(word))
  }).length
}

export function SandboxGuideAgent() {
  const [selectedMode, setSelectedMode] = useState<AgentMode>('prompt')
  const [userInput, setUserInput] = useState('')
  const [showGuide, setShowGuide] = useState(false)

  const mode = getGuideMode(selectedMode)
  const Icon = mode.icon

  const userHasInput = userInput.trim().length > 0
  const matchedCriteria = useMemo(
    () => countMatchedCriteria(userInput, mode.successCriteria),
    [mode.successCriteria, userInput],
  )

  const readinessLabel = userHasInput
    ? matchedCriteria >= 3
      ? 'Strong starting point'
      : matchedCriteria >= 1
        ? 'Needs more structure'
        : 'Early draft'
    : 'Waiting for input'

  const readinessCopy = userHasInput
    ? matchedCriteria >= 3
      ? 'Your draft appears to include some useful structure. Use the checklist to tighten the output before saving or applying it.'
      : matchedCriteria >= 1
        ? 'Your draft has a useful start, but it needs clearer context, constraints, review rules, or success criteria.'
        : 'The input is still too vague for reliable sandbox practice. Use the guide steps to make the task testable.'
    : 'Choose a route, add a short example, then open the guide to see how this sandbox task should be improved.'

  return (
    <section className="mt-8 rounded-[2rem] border border-[#123BFF]/15 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
              <BrainCircuit className="h-4 w-4" aria-hidden="true" />
              Sandbox Guide Agent
            </span>

            <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF7FF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
              <LockKeyhole className="h-4 w-4" aria-hidden="true" />
              Public preview
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
            Meet the first guided sandbox agent.
          </h2>

          <p className="mt-4 text-base leading-8 text-sand/65">
            This preview agent guides users through safe demo tasks. It does not save attempts,
            score private work, or use real business data on the public page. Full agent-guided
            sandbox usage should stay inside protected account routes.
          </p>

          <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
              <p className="text-sm leading-7 text-amber-900">
                Use synthetic examples only. Do not paste customer data, employee data, credentials,
                confidential company material, private contracts, or sensitive business records into
                this public preview.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {guideModes.map((item) => {
              const ItemIcon = item.icon
              const isActive = selectedMode === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedMode(item.id)
                    setUserInput('')
                    setShowGuide(false)
                  }}
                  className={`rounded-3xl border p-5 text-left shadow-sm transition ${
                    isActive
                      ? 'border-[#123BFF] bg-[#EAF7FF]'
                      : 'border-sand/10 bg-white hover:border-[#123BFF]/30'
                  }`}
                >
                  <div className="flex gap-4">
                    <span
                      className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                        isActive ? 'bg-[#123BFF] text-white' : 'bg-[#EAF7FF] text-[#123BFF]'
                      }`}
                    >
                      <ItemIcon className="h-6 w-6" aria-hidden="true" />
                    </span>

                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                        {item.label}
                      </p>
                      <h3 className="mt-1 text-lg font-bold tracking-tight text-sand">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-sand/65">{item.description}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="rounded-[2rem] border border-sand/10 bg-white p-5 shadow-sm sm:p-6">
          <div className="rounded-[1.5rem] bg-[#123BFF] p-5 text-white shadow-sm">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#123BFF]">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/70">
                  {mode.label}
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight">{mode.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/82">{mode.taskGoal}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-3xl bg-[#F7FBFF] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
              Demo starter
            </p>
            <p className="mt-3 text-sm leading-7 text-sand/70">{mode.starterPrompt}</p>
            <button
              type="button"
              onClick={() => {
                setUserInput(mode.starterPrompt)
                setShowGuide(true)
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-[#123BFF] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
            >
              Use this demo
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-5">
            <label htmlFor="sandbox-agent-input" className="block text-sm font-bold text-sand">
              {mode.userPromptLabel}
            </label>
            <textarea
              id="sandbox-agent-input"
              value={userInput}
              onChange={(event) => setUserInput(event.target.value)}
              placeholder={mode.userPromptPlaceholder}
              rows={6}
              className="mt-2 w-full resize-y rounded-3xl border border-sand/10 bg-white px-4 py-4 text-sm leading-7 text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
            />
          </div>

          <div className="mt-5 rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                  Agent readout
                </p>
                <h4 className="mt-2 text-xl font-bold tracking-tight text-sand">
                  {readinessLabel}
                </h4>
                <p className="mt-2 text-sm leading-7 text-sand/65">{readinessCopy}</p>
              </div>

              <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#EAF7FF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                {matchedCriteria}/{mode.successCriteria.length} checks
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowGuide((current) => !current)}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF] sm:w-auto"
            >
              {showGuide ? 'Hide guidance' : 'Guide me through this task'}
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {showGuide ? (
            <div className="mt-5 grid gap-5">
              <div className="rounded-3xl bg-[#EAF7FF] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                  Guide steps
                </p>

                <div className="mt-4 grid gap-3">
                  {mode.guidance.map((item, index) => (
                    <div key={item} className="rounded-2xl bg-white p-4 shadow-sm">
                      <div className="flex gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[#123BFF] text-xs font-bold text-white">
                          {index + 1}
                        </span>
                        <p className="text-sm leading-7 text-sand/70">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                  Success criteria
                </p>

                <div className="mt-4 grid gap-3">
                  {mode.successCriteria.map((criterion) => (
                    <div key={criterion} className="flex gap-3 rounded-2xl bg-[#F7FBFF] p-3">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#123BFF]"
                        aria-hidden="true"
                      />
                      <p className="text-sm leading-6 text-sand/70">{criterion}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[#123BFF]/15 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                    <Route className="h-5 w-5" aria-hidden="true" />
                  </span>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                      Example target output
                    </p>
                    <p className="mt-3 text-sm leading-7 text-sand/70">{mode.exampleOutput}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-[#123BFF] p-5 text-white">
                <div className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                  <p className="text-sm leading-7 text-white/82">
                    Protected account access will later allow saved attempts, guided scoring,
                    progress tracking, assigned business tasks, and refreshed sandbox versions when
                    verified AI changes affect a skill.
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
