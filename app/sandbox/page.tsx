import type { Metadata } from 'next'
import Link from 'next/link'
import { SandboxGuideAgent } from '@/components/sandbox/sandbox-guide-agent'
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  Code2,
  FlaskConical,
  GitBranch,
  Layers3,
  LockKeyhole,
  Network,
  Radar,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Sandbox Practice | DeepMind Resources',
  description:
    'Explore the DeepMind Resources AI sandbox layer for prompt practice, workflow simulations, RAG exercises, agent tasks, validation drills, and business-ready AI skill development.',
  alternates: {
    canonical: 'https://deepmindresources.pro/sandbox',
  },
  openGraph: {
    title: 'AI Sandbox Practice | DeepMind Resources',
    description:
      'Practise AI skills through verified sandbox tasks for prompts, workflows, agents, retrieval, validation, and business-ready AI training.',
    url: 'https://deepmindresources.pro/sandbox',
    siteName: 'DeepMind Resources',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Sandbox Practice | DeepMind Resources',
    description:
      'Practise AI skills through verified sandbox tasks for prompts, workflows, agents, retrieval, validation, and business-ready AI training.',
  },
}

const sandboxLayers = [
  {
    icon: Sparkles,
    title: 'Prompt practice',
    description:
      'Turn weak prompts into structured instructions with context, constraints, output formats, examples, and evaluation rules.',
  },
  {
    icon: Workflow,
    title: 'Workflow simulations',
    description:
      'Map real tasks into repeatable AI workflows with clear inputs, review points, outputs, and human approval steps.',
  },
  {
    icon: Code2,
    title: 'Tool-calling exercises',
    description:
      'Practise when an AI system should call a tool, what data it should pass, and how to validate the result before action.',
  },
  {
    icon: Network,
    title: 'RAG and knowledge tasks',
    description:
      'Work through retrieval, source grounding, answer quality checks, and knowledge-base design using safe sample scenarios.',
  },
  {
    icon: BrainCircuit,
    title: 'Agent design tasks',
    description:
      'Design bounded agent workflows with goals, tools, permissions, stop conditions, logs, and review gates.',
  },
  {
    icon: ShieldCheck,
    title: 'Validation drills',
    description:
      'Identify weak claims, hallucinations, missing sources, privacy risks, and unsafe assumptions before outputs are trusted.',
  },
]

const taskFamilies = [
  {
    label: 'Beginner',
    title: 'Prompt improvement task',
    detail:
      'Rewrite a vague request into a clear prompt with role, task, context, constraints, and a measurable output format.',
  },
  {
    label: 'Intermediate',
    title: 'Tool selection scenario',
    detail:
      'Compare two AI tools for a defined business or learning task, then explain the trade-offs and safe next step.',
  },
  {
    label: 'Advanced',
    title: 'Agent workflow design',
    detail:
      'Design a controlled agent workflow with tool boundaries, approval checkpoints, failure handling, and evaluation criteria.',
  },
  {
    label: 'Business',
    title: 'Workflow readiness exercise',
    detail:
      'Convert a workplace task into an AI-assisted process with privacy rules, staff responsibilities, and review standards.',
  },
]

const operatingPrinciples = [
  'Every task practises a real AI skill.',
  'Every task has a clear output and success criteria.',
  'Sample data is used before sensitive business data.',
  'Validation, privacy, and human review are part of the workflow.',
  'Sandbox practice connects back to lessons, tool intelligence, and progress tracking.',
]

const accessSteps = [
  {
    title: 'Learn the concept',
    description:
      'Start with a practical lesson or AI update explanation that shows what changed, why it matters, and how the skill is used.',
  },
  {
    title: 'Enter the sandbox',
    description:
      'Practise the skill in a guided task with a scenario, instructions, starting input, expected output, and review checklist.',
  },
  {
    title: 'Prove the skill',
    description:
      'Use the success criteria to check the work, spot mistakes, and build evidence of practical AI competency.',
  },
]

export default function SandboxPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AI Sandbox Practice',
    url: 'https://deepmindresources.pro/sandbox',
    description:
      'A public explainer for the DeepMind Resources AI sandbox layer, covering prompt practice, workflow simulations, RAG exercises, tool calling, agent tasks, validation drills, and business-ready AI practice.',
    publisher: {
      '@type': 'Organization',
      name: 'DeepMind Resources',
      url: 'https://deepmindresources.pro',
    },
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-obsidian px-4 py-8 text-sand sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at top right, rgba(69, 201, 255, 0.24), transparent 34rem), radial-gradient(circle at top left, rgba(18, 59, 255, 0.14), transparent 30rem), linear-gradient(180deg, #F4FBFF 0%, #EAF7FF 48%, #F4FBFF 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <header className="rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <FlaskConical className="h-4 w-4" aria-hidden="true" />
                  Agentic sandbox
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF7FF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                  <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                  Verified practice layer
                </span>
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-sand sm:text-5xl lg:text-6xl">
                Practise AI skills before they reach production workflows.
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-sand/65 sm:text-lg">
                The DeepMind Resources sandbox turns lessons, AI updates, and tool intelligence
                into guided practice. Work through prompts, workflow simulations, RAG exercises,
                tool-calling tasks, agent design, and validation drills inside a structured learning
                environment.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                >
                  Create workspace
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/syllabus"
                  className="inline-flex items-center justify-center rounded-2xl border border-sand/10 bg-white px-5 py-3.5 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                >
                  View syllabus
                </Link>
              </div>
            </div>

            <aside className="rounded-[2rem] bg-[#123BFF] p-6 text-white shadow-sm sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white">
                <Route className="h-4 w-4" aria-hidden="true" />
                Practice protocol
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight">
                Lessons become tasks. Tasks become evidence.
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/82">
                The sandbox is designed to help users move from reading about AI to practising the
                exact behaviours that matter: prompting clearly, choosing tools, validating outputs,
                designing workflows, and applying safeguards before real-world use.
              </p>

              <div className="mt-6 grid gap-3">
                {accessSteps.map((step, index) => (
                  <div key={step.title} className="rounded-2xl bg-white/10 p-4">
                    <div className="flex gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-bold text-[#123BFF]">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-white">{step.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-white/75">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </header>

        <SandboxGuideAgent />

        <section className="mt-8 rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <Layers3 className="h-4 w-4" aria-hidden="true" />
                What the sandbox covers
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                A structured practice layer for modern AI work.
              </h2>

              <p className="mt-4 text-base leading-8 text-sand/65">
                DeepMind Resources treats the sandbox as a skill system, not a toy demo. Each task
                is built around a scenario, a practical goal, success criteria, and a review
                checklist so users can practise deliberately.
              </p>

              <div className="mt-7 grid gap-3">
                <div className="rounded-2xl bg-[#EAF7FF] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                    Choose a route
                  </p>
                  <p className="mt-2 text-sm leading-7 text-sand/65">
                    Start with prompt design, workflow mapping, tool calling, RAG, agent structure,
                    or validation practice.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#EAF7FF] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                    Work from a scenario
                  </p>
                  <p className="mt-2 text-sm leading-7 text-sand/65">
                    Every exercise begins with a clear situation, safe sample input, and a practical
                    goal instead of open-ended play.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#EAF7FF] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                    Review the output
                  </p>
                  <p className="mt-2 text-sm leading-7 text-sand/65">
                    The sandbox helps users check structure, evidence, risk, privacy, assumptions,
                    and whether the result is ready for real work.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {sandboxLayers.map((layer) => {
                const Icon = layer.icon

                return (
                  <article
                    key={layer.title}
                    className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm"
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold tracking-tight text-sand">
                      {layer.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-sand/65">{layer.description}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-4">
          {taskFamilies.map((task) => (
            <article
              key={task.title}
              className="rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm"
            >
              <span className="inline-flex rounded-full bg-[#EAF7FF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                {task.label}
              </span>

              <h2 className="mt-5 text-xl font-bold tracking-tight text-sand">{task.title}</h2>

              <p className="mt-3 text-sm leading-7 text-sand/65">{task.detail}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <Target className="h-4 w-4" aria-hidden="true" />
                Skill evidence
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                The goal is practical competency, not page views.
              </h2>

              <p className="mt-4 text-base leading-8 text-sand/65">
                Sandbox tasks are designed to help users prove they can apply a skill. A completed
                task should show more than passive reading: it should demonstrate judgement,
                structure, validation, and safe execution.
              </p>

              <div className="mt-7 grid gap-3">
                {operatingPrinciples.map((principle) => (
                  <div key={principle} className="rounded-2xl bg-[#EAF7FF] p-4">
                    <div className="flex gap-3">
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-[#123BFF]"
                        aria-hidden="true"
                      />
                      <p className="text-sm leading-7 text-sand/70">{principle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-[2rem] border border-[#123BFF]/15 bg-[#EAF7FF] p-6 sm:p-8">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#123BFF] text-white shadow-sm">
                <GitBranch className="h-7 w-7" aria-hidden="true" />
              </span>

              <h3 className="mt-6 text-2xl font-bold tracking-tight text-sand">
                Built for versioned AI learning.
              </h3>

              <p className="mt-4 text-sm leading-7 text-sand/65">
                As AI tools, models, APIs, and workflows change, sandbox tasks can be refreshed
                alongside lessons. That allows DeepMind Resources to show when a skill needs a
                recheck, when a practice task has changed, and when a new workflow pattern matters.
              </p>

              <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#123BFF]">
                  Signed-in workspace
                </p>
                <p className="mt-3 text-sm leading-7 text-sand/65">
                  Signed-in users will see sandbox tasks as part of a private learning workspace:
                  assigned practice, saved attempts, progress status, review feedback, and refreshed
                  tasks when verified AI changes affect completed work.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white">
                <Radar className="h-4 w-4" aria-hidden="true" />
                Access path
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                Start with the learning path, then move into guided practice.
              </h2>

              <p className="mt-4 max-w-3xl text-base leading-8 text-white/75">
                The public sandbox page shows how guided practice works. Full sandbox tasks belong
                inside the signed-in DeepMind Resources workspace so attempts, progress, feedback,
                and business training context stay private to the right account.
              </p>
            </div>

            <div className="rounded-[2rem] bg-white p-6 text-sand shadow-sm">
              <div className="flex gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                  <LockKeyhole className="h-6 w-6" aria-hidden="true" />
                </span>

                <div>
                  <h3 className="text-xl font-bold tracking-tight text-sand">
                    Protected practice, public explanation.
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-sand/65">
                    Explore the public preview here, then use the signed-in workspace for private
                    attempts, saved progress, team tasks, and guided sandbox feedback.
                  </p>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/auth/signup"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                    >
                      Create workspace
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>

                    <Link
                      href="/auth/login"
                      className="inline-flex items-center justify-center rounded-2xl border border-sand/10 bg-white px-5 py-3 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}


