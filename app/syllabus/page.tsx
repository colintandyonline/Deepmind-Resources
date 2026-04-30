import type { Metadata } from 'next'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  GraduationCap,
  Layers3,
  Lightbulb,
  Radar,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  WandSparkles,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Syllabus | DeepMind Resources',
  description:
    'Explore the DeepMind Resources AI syllabus: practical learning paths for AI foundations, prompting, tool intelligence, agents, sandbox practice, and business-ready AI skills.',
  alternates: {
    canonical: '/syllabus',
  },
  keywords: [
    'AI syllabus',
    'AI learning path',
    'AI training syllabus',
    'prompt engineering syllabus',
    'AI agents training',
    'business AI training syllabus',
    'AI sandbox practice',
    'AI tool intelligence',
    'professional AI training',
  ],
  openGraph: {
    title: 'AI Syllabus | DeepMind Resources',
    description:
      'A practical AI syllabus for learning foundations, prompts, tool intelligence, agents, workflows, sandbox tasks, and business-ready AI skills.',
    url: 'https://deepmindresources.pro/syllabus',
    siteName: 'DeepMind Resources',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'AI Syllabus | DeepMind Resources',
    description:
      'Explore practical AI learning paths for foundations, prompts, agents, sandbox practice, and business-ready AI skills.',
  },
}

type SyllabusTrack = {
  label: string
  title: string
  description: string
  icon: LucideIcon
  outcomes: string[]
}

type ModuleGroup = {
  title: string
  description: string
  icon: LucideIcon
  modules: string[]
}

type LearningStep = {
  step: string
  title: string
  description: string
}

const syllabusTracks: SyllabusTrack[] = [
  {
    label: 'Foundations',
    title: 'AI Fundamentals',
    description:
      'Build the language, confidence, and judgement needed to understand what modern AI tools can and cannot do.',
    icon: BrainCircuit,
    outcomes: [
      'Understand core AI concepts in plain English',
      'Recognise useful AI tasks and poor-fit use cases',
      'Learn how models respond to instructions and context',
      'Build safer habits for checking AI outputs',
    ],
  },
  {
    label: 'Prompting',
    title: 'Prompt Engineering',
    description:
      'Learn how to give clearer instructions, improve outputs, structure tasks, and review responses before using them.',
    icon: WandSparkles,
    outcomes: [
      'Write better prompts for practical work',
      'Use context, constraints, examples, and review steps',
      'Improve weak responses through iteration',
      'Create reusable prompting patterns',
    ],
  },
  {
    label: 'Tools',
    title: 'Tool Intelligence',
    description:
      'Understand which AI tools fit different workflows, what changes matter, and how to choose tools more intelligently.',
    icon: Radar,
    outcomes: [
      'Compare tools by real-world usefulness',
      'Understand feature changes and workflow impact',
      'Avoid tool overload and unclear adoption',
      'Connect tool choice to practical outcomes',
    ],
  },
  {
    label: 'Agents',
    title: 'Agentic AI Systems',
    description:
      'Move from simple prompts into tool-using systems, workflow design, retrieval, memory, and agent-style task planning.',
    icon: Route,
    outcomes: [
      'Understand what makes a system agentic',
      'Plan tool use, memory, and workflow steps',
      'Learn where automation needs human review',
      'Practise agent design in sandbox tasks',
    ],
  },
]

const moduleGroups: ModuleGroup[] = [
  {
    title: 'Beginner pathway',
    description:
      'For learners who want a clear, practical foundation before using AI in important work.',
    icon: GraduationCap,
    modules: [
      'Introduction to modern AI',
      'How large language models respond',
      'Prompting basics',
      'Checking accuracy and usefulness',
      'Using AI for research and summaries',
    ],
  },
  {
    title: 'Practical workflow pathway',
    description:
      'For people who want to use AI in daily tasks such as writing, planning, research, operations, and support.',
    icon: ClipboardCheck,
    modules: [
      'Prompt patterns for work',
      'AI-assisted writing and editing',
      'Research workflows',
      'Task planning and decision support',
      'Review loops and quality control',
    ],
  },
  {
    title: 'Builder pathway',
    description:
      'For learners who want to understand agents, tool use, retrieval, workflow automation, and AI system design.',
    icon: Code2,
    modules: [
      'Tool calling concepts',
      'Retrieval and knowledge workflows',
      'Memory and context management',
      'Single-agent task design',
      'Multi-step workflow orchestration',
    ],
  },
  {
    title: 'Business pathway',
    description:
      'For teams that need shared standards, safer adoption, workflow confidence, and role-aware AI training.',
    icon: BriefcaseBusiness,
    modules: [
      'Business AI foundations',
      'Team prompting standards',
      'Tool selection for departments',
      'Sandbox practice for workplace tasks',
      'Governance habits and responsible use',
    ],
  },
]

const learningSteps: LearningStep[] = [
  {
    step: '01',
    title: 'Learn the concept',
    description:
      'Start with plain-English explanations that make AI ideas usable without drowning the learner in jargon.',
  },
  {
    step: '02',
    title: 'See where it applies',
    description:
      'Connect each lesson to real tasks such as research, drafting, planning, analysis, operations, or team workflows.',
  },
  {
    step: '03',
    title: 'Practise in the sandbox',
    description:
      'Use guided exercises to test prompts, review outputs, compare approaches, and build practical confidence.',
  },
  {
    step: '04',
    title: 'Refresh when AI changes',
    description:
      'Keep learning current as tools, models, features, risks, and practical recommendations evolve.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'DeepMind Resources AI Syllabus',
  description:
    'A practical AI syllabus covering AI foundations, prompt engineering, tool intelligence, agentic AI systems, sandbox practice, and business-ready AI skills.',
  itemListElement: syllabusTracks.map((track, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: track.title,
    description: track.description,
  })),
}

export default function SyllabusPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-obsidian text-sand">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at top right, rgba(69, 201, 255, 0.24), transparent 34rem), radial-gradient(circle at top left, rgba(18, 59, 255, 0.14), transparent 30rem), radial-gradient(circle at 50% 32rem, rgba(69, 201, 255, 0.16), transparent 36rem), linear-gradient(180deg, #F4FBFF 0%, #EAF7FF 46%, #F4FBFF 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <nav className="flex items-center justify-between rounded-3xl border border-sand/10 bg-white/85 px-5 py-4 shadow-sm backdrop-blur sm:px-6">
            <Link href="/" className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#123BFF] text-white shadow-sm">
                <BrainCircuit className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="text-sm font-bold tracking-tight text-sand sm:text-base">
                DeepMind Resources
              </span>
            </Link>

            <div className="hidden items-center gap-6 text-sm font-bold text-sand/65 lg:flex">
              <Link href="/" className="transition hover:text-[#123BFF]">
                Home
              </Link>
              <a href="#tracks" className="transition hover:text-[#123BFF]">
                Tracks
              </a>
              <a href="#modules" className="transition hover:text-[#123BFF]">
                Modules
              </a>
              <Link href="/business-ai-training" className="transition hover:text-[#123BFF]">
                Business
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="hidden rounded-2xl border border-sand/10 bg-white px-4 py-2.5 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF] sm:inline-flex"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#123BFF] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
              >
                Start learning
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </nav>

          <section className="grid gap-8 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
                AI Syllabus
              </span>

              <h1 className="mt-6 max-w-5xl text-4xl font-bold tracking-tight text-sand sm:text-5xl lg:text-6xl">
                A practical AI syllabus for real skill, not passive watching.
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-sand/70 sm:text-lg">
                DeepMind Resources gives learners a structured path from AI foundations to prompt
                engineering, tool intelligence, sandbox practice, agentic systems, and business-ready
                AI workflows.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                >
                  Start the syllabus
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/business-ai-training"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-6 py-4 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                >
                  Business AI training
                  <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  Foundations
                </span>
                <span className="rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  Prompting
                </span>
                <span className="rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  Agents
                </span>
                <span className="rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  Sandbox
                </span>
              </div>
            </div>

            <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-5 shadow-sm sm:p-6 lg:p-8">
              <div className="rounded-[1.5rem] bg-[#EAF7FF] p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#123BFF] shadow-sm">
                    <Route className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                      Learning route
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-sand">
                      Learn the idea, practise the task, then apply it at work.
                    </h2>
                  </div>
                </div>

                <div className="mt-6 grid gap-4">
                  <div className="rounded-2xl border border-white bg-white/85 p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-1 h-5 w-5 shrink-0 text-[#123BFF]"
                        aria-hidden="true"
                      />
                      <p className="text-sm leading-7 text-sand/70">
                        Follow a clear sequence from beginner concepts to more advanced AI workflows.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white bg-white/85 p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-1 h-5 w-5 shrink-0 text-[#123BFF]"
                        aria-hidden="true"
                      />
                      <p className="text-sm leading-7 text-sand/70">
                        Practise useful prompts, checks, reviews, tool choices, and workflow tasks.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white bg-white/85 p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-1 h-5 w-5 shrink-0 text-[#123BFF]"
                        aria-hidden="true"
                      />
                      <p className="text-sm leading-7 text-sand/70">
                        Refresh your learning when AI tools, features, and recommended practices
                        change.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-sand/10 bg-white p-4 text-center shadow-sm">
                  <BookOpenCheck className="mx-auto h-6 w-6 text-[#123BFF]" aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold text-sand">Learn</p>
                </div>
                <div className="rounded-2xl border border-sand/10 bg-white p-4 text-center shadow-sm">
                  <Code2 className="mx-auto h-6 w-6 text-[#123BFF]" aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold text-sand">Practise</p>
                </div>
                <div className="rounded-2xl border border-sand/10 bg-white p-4 text-center shadow-sm">
                  <Target className="mx-auto h-6 w-6 text-[#123BFF]" aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold text-sand">Apply</p>
                </div>
              </div>
            </div>
          </section>

          <section id="tracks" className="pb-8" aria-labelledby="tracks-title">
            <div className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                    <Layers3 className="h-4 w-4" aria-hidden="true" />
                    Core tracks
                  </span>

                  <h2
                    id="tracks-title"
                    className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl"
                  >
                    The syllabus is organised around practical AI capability.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-sand/65">
                    Each track builds a useful layer of skill: understand AI clearly, prompt it
                    better, choose tools wisely, and practise workflows that matter.
                  </p>

                  <div className="mt-6 rounded-2xl bg-[#EAF7FF] p-5">
                    <div className="flex items-start gap-3">
                      <Lightbulb
                        className="mt-1 h-5 w-5 shrink-0 text-[#123BFF]"
                        aria-hidden="true"
                      />
                      <p className="text-sm leading-7 text-sand/70">
                        This syllabus is designed for practical skill gain. Lessons are most useful
                        when paired with sandbox tasks, review habits, and real workflow examples.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {syllabusTracks.map((track) => {
                    const Icon = track.icon

                    return (
                      <article
                        key={track.title}
                        className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                            <Icon className="h-6 w-6" aria-hidden="true" />
                          </span>

                          <span className="rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                            {track.label}
                          </span>
                        </div>

                        <h3 className="mt-5 text-xl font-bold text-sand">{track.title}</h3>

                        <p className="mt-3 text-sm leading-7 text-sand/65">
                          {track.description}
                        </p>

                        <ul className="mt-4 space-y-3 text-sm leading-7 text-sand/65">
                          {track.outcomes.map((outcome) => (
                            <li key={outcome} className="flex gap-3">
                              <CheckCircle2
                                className="mt-1 h-5 w-5 shrink-0 text-[#123BFF]"
                                aria-hidden="true"
                              />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </article>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          <section id="modules" className="py-8" aria-labelledby="modules-title">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
                Module groups
              </span>

              <h2
                id="modules-title"
                className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl"
              >
                Clear routes for learners, builders, and business teams.
              </h2>

              <p className="mt-4 text-base leading-8 text-sand/65">
                The syllabus can support individual learning, practical workplace use, technical
                exploration, and team training without forcing every learner down the same route.
              </p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-4">
              {moduleGroups.map((group) => {
                const Icon = group.icon

                return (
                  <article
                    key={group.title}
                    className="flex h-full flex-col rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm"
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>

                    <h3 className="mt-5 text-xl font-bold tracking-tight text-sand">
                      {group.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-sand/65">{group.description}</p>

                    <ul className="mt-5 space-y-3 text-sm leading-7 text-sand/65">
                      {group.modules.map((module) => (
                        <li key={module} className="flex gap-3">
                          <CheckCircle2
                            className="mt-1 h-5 w-5 shrink-0 text-[#123BFF]"
                            aria-hidden="true"
                          />
                          <span>{module}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                )
              })}
            </div>
          </section>

          <section className="py-8" aria-labelledby="method-title">
            <div className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Learning method
                  </span>

                  <h2
                    id="method-title"
                    className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl"
                  >
                    The syllabus is built around a repeatable learning loop.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-sand/65">
                    AI learning works best when learners understand the concept, connect it to real
                    work, practise it safely, and then refresh when the tools change.
                  </p>
                </div>

                <div className="grid gap-4">
                  {learningSteps.map((learningStep) => (
                    <article
                      key={learningStep.step}
                      className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm sm:p-6"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#123BFF] text-sm font-bold text-white shadow-sm">
                          {learningStep.step}
                        </span>

                        <div>
                          <h3 className="text-xl font-bold text-sand">{learningStep.title}</h3>
                          <p className="mt-2 text-sm leading-7 text-sand/65">
                            {learningStep.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-8" aria-labelledby="business-syllabus-title">
            <div className="overflow-hidden rounded-[2rem] border border-sand/10 bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                    <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
                    Business training route
                  </span>

                  <h2
                    id="business-syllabus-title"
                    className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl"
                  >
                    Use the syllabus to build shared AI capability across your team.
                  </h2>

                  <p className="mt-4 max-w-3xl text-base leading-8 text-white/80">
                    Business AI training turns the syllabus into a team-ready path with practical
                    workflows, sandbox tasks, tool intelligence, and safer adoption habits.
                  </p>
                </div>

                <Link
                  href="/business-ai-training"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-[#123BFF] shadow-sm transition hover:bg-[#EAF7FF]"
                >
                  View business training
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>

          <section className="py-8 pb-14" aria-labelledby="start-title">
            <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                    <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                    Start learning
                  </span>

                  <h2
                    id="start-title"
                    className="mt-5 max-w-3xl text-3xl font-bold tracking-tight text-sand sm:text-4xl"
                  >
                    Build AI skill with a syllabus designed for practical use.
                  </h2>

                  <p className="mt-4 max-w-3xl text-base leading-8 text-sand/65">
                    Start with structured lessons, then move into sandbox practice, workflow
                    thinking, tool intelligence, and business-ready AI habits.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                  >
                    Create account
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>

                  <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-2xl border border-sand/10 bg-white px-6 py-4 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                  >
                    Return home
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}