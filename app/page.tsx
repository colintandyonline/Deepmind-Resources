import type { LucideIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Database,
  Radar,
  Route,
  Sparkles,
  Workflow,
} from 'lucid
                  <Link
                    href="/privacy"
                    className="rounded-full bg-[#EAF7FF] px-4 py-2 font-bold text-[#123BFF] shadow-sm transition hover:bg-[#123BFF] hover:text-white"
                  >
                    Privacy
                  </Link>
                  <Link
                    href="/terms"
                    className="rounded-full bg-[#EAF7FF] px-4 py-2 font-bold text-[#123BFF] shadow-sm transition hover:bg-[#123BFF] hover:text-white"
                  >
                    Terms
                  </Link>e-react'
import { Sidebar } from '@/components/platform/sidebar'
import { HeroSection } from '@/components/platform/hero-section'
import { CodeSandbox } from '@/components/platform/code-sandbox'
import { ContentCardGrid, type LessonModule } from '@/components/platform/content-card'

const featuredModules: LessonModule[] = [
  {
    id: '1',
    title: 'Introduction to LLMs',
    description: 'Understanding large language models, tokenization, and inference patterns.',
    duration: '45 min',
    status: 'completed',
    category: 'Fundamentals',
    progress: 100,
  },
  {
    id: '2',
    title: 'Prompt Engineering Mastery',
    description: 'Advanced techniques for crafting effective prompts and system messages.',
    duration: '1h 20min',
    status: 'completed',
    category: 'Prompting',
    progress: 100,
  },
  {
    id: '3',
    title: 'Building Your First Agent',
    description: 'Create an autonomous AI agent with tools, memory, and reasoning capabilities.',
    duration: '2h 15min',
    status: 'in_progress',
    category: 'Agents',
    progress: 67,
  },
  {
    id: '4',
    title: 'Tool Calling & Functions',
    description: 'Implement function calling to give your agents real-world capabilities.',
    duration: '1h 45min',
    status: 'available',
    category: 'Agents',
  },
  {
    id: '5',
    title: 'Memory Systems & RAG',
    description: 'Add long-term memory and retrieval-augmented generation to your agents.',
    duration: '2h 30min',
    status: 'available',
    category: 'Advanced',
  },
  {
    id: '6',
    title: 'Multi-Agent Orchestration',
    description: 'Design and coordinate systems of multiple specialized AI agents.',
    duration: '3h 00min',
    status: 'available',
    category: 'Expert',
  },
]

type PathwayStage = {
  title: string
  description: string
  label: string
  icon: LucideIcon
}

type IntelligenceSignal = {
  title: string
  description: string
  label: string
  icon: LucideIcon
}

const pathwayStages: PathwayStage[] = [
  {
    title: 'AI Fundamentals',
    description: 'Understand what modern AI can do and where human judgement still matters.',
    label: 'Core',
    icon: BrainCircuit,
  },
  {
    title: 'Prompt Engineering',
    description: 'Give clearer instructions, improve weak outputs, and build reusable prompt patterns.',
    label: 'Core',
    icon: Sparkles,
  },
  {
    title: 'Tool Intelligence',
    description: 'Choose the right AI tools for coding, research, writing, automation, and knowledge work.',
    label: 'Tools',
    icon: Radar,
  },
  {
    title: 'Workflow Design',
    description: 'Turn one-off AI use into repeatable processes with review and quality control.',
    label: 'Workflow',
    icon: Workflow,
  },
  {
    title: 'RAG & Knowledge Systems',
    description: 'Use internal documents, retrieval patterns, and source-backed knowledge workflows.',
    label: 'Knowledge',
    icon: Database,
  },
  {
    title: 'Business Productivity',
    description: 'Apply AI to admin, operations, marketing, sales, support, reporting, and planning.',
    label: 'Business',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Data & Decision Support',
    description: 'Use AI for analysis, summaries, spreadsheets, competitor research, and decision support.',
    label: 'Analysis',
    icon: BarChart3,
  },
  {
    title: 'Agentic Systems',
    description: 'Build practical understanding of tool calling, task chains, automation, and agent workflows.',
    label: 'Agents',
    icon: Route,
  },
]

const intelligenceSignals: IntelligenceSignal[] = [
  {
    title: 'AI release reviewed',
    description:
      'A major model, product, or platform change is checked for practical learning impact.',
    label: 'Track',
    icon: Radar,
  },
  {
    title: 'Practical meaning mapped',
    description:
      'The update is translated into what matters, who should care, and what work it affects.',
    label: 'Meaning',
    icon: BrainCircuit,
  },
  {
    title: 'Lesson guidance refreshed',
    description:
      'Relevant learning paths are updated so members are not working from stale tool advice.',
    label: 'Lesson',
    icon: BookOpenCheck,
  },
  {
    title: 'Sandbox task created',
    description:
      'The change becomes a practical exercise, workflow simulation, or tool comparison task.',
    label: 'Practice',
    icon: Code2,
  },
  {
    title: 'Business workflow applied',
    description:
      'The same intelligence becomes guidance for productivity, support, operations, and automation.',
    label: 'Apply',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Recommendations improved',
    description:
      'Tool comparisons and learning advice improve as stronger real-world workflows emerge.',
    label: 'Improve',
    icon: CheckCircle2,
  },
]

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-obsidian text-sand">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at top right, rgba(69, 201, 255, 0.24), transparent 34rem), radial-gradient(circle at top left, rgba(18, 59, 255, 0.14), transparent 30rem), radial-gradient(circle at 50% 32rem, rgba(69, 201, 255, 0.16), transparent 36rem), linear-gradient(180deg, #F4FBFF 0%, #EAF7FF 46%, #F4FBFF 100%)',
        }}
        aria-hidden="true"
      />

      <Sidebar />

      <main className="relative z-10 min-h-screen pt-16 md:pl-64 md:pt-0">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <HeroSection />

          <section className="mt-8 lg:mt-12">
            <div className="rounded-3xl border border-sand/10 bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                    <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
                    Business AI Training
                  </span>

                  <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                    Train your team to use AI confidently, safely, and practically.
                  </h2>

                  <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 sm:text-base">
                    Give your business a professional AI training path with clear lessons, tool
                    intelligence, sandbox practice, and practical workflow habits built for real
                    work.
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

          <section className="mt-8 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-3 lg:items-stretch">
            <div className="flex h-full flex-col rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm lg:col-span-1">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                    <Route className="h-4 w-4" aria-hidden="true" />
                    Learning pathway
                  </span>

                  <h2 className="mt-5 text-2xl font-bold tracking-tight text-sand">
                    Practical AI capability map
                  </h2>
                </div>

                <span className="rounded-2xl bg-[#EAF7FF] px-4 py-3 text-sm font-bold text-[#123BFF]">
                  8 stages
                </span>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-sand/10">
                <div className="h-full w-full rounded-full bg-[#123BFF]" />
              </div>

              <div className="mt-5 flex-1 overflow-hidden">
                <div className="mt-5 overflow-y-auto pr-2" style={{ height: "63rem" }}>
                  <div className="space-y-4">
                    {pathwayStages.map((stage, index) => {
                      const Icon = stage.icon

                      return (
                        <div key={stage.title} className="relative pl-16">
                          {index !== pathwayStages.length - 1 ? (
                            <span className="absolute left-[1.35rem] top-12 h-[calc(100%+0.75rem)] w-px bg-[#123BFF]/30" />
                          ) : null}

                          <span className="absolute left-0 top-0 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#123BFF]/20 bg-[#EAF7FF] text-[#123BFF]">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>

                          <div className="rounded-3xl border border-sand/10 bg-white p-4 shadow-sm">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="text-lg font-bold text-sand">{stage.title}</h3>
                                  <CheckCircle2
                                    className="h-5 w-5 text-[#123BFF]"
                                    aria-hidden="true"
                                  />
                                </div>

                                <p className="mt-1 text-sm leading-6 text-sand/60">
                                  {stage.description}
                                </p>
                              </div>

                              <span className="rounded-2xl bg-[#EAF7FF] px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#123BFF]">
                                {stage.label}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <Link
                href="/syllabus"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
              >
                View full syllabus
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm lg:col-span-2">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Live AI Intelligence
                  </span>

                  <h2 className="mt-5 text-2xl font-bold tracking-tight text-sand sm:text-3xl">
                    AI update â†’ verified meaning â†’ practical skill actions.
                  </h2>

                  <p className="mt-3 max-w-3xl text-sm leading-7 text-sand/65 sm:text-base">
                    DeepMind Resources turns important AI changes into clearer lessons, sandbox
                    tasks, tool comparisons, and business-ready workflow guidance.
                  </p>
                </div>

                <span className="w-fit rounded-2xl bg-[#EAF7FF] px-4 py-3 text-sm font-bold text-[#123BFF]">
                  Active
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-sand/10 bg-white p-4 shadow-sm">
                  <p className="text-2xl font-bold text-[#123BFF]">Live</p>
                  <p className="mt-1 text-sm leading-6 text-sand/60">release-aware learning</p>
                </div>
                <div className="rounded-2xl border border-sand/10 bg-white p-4 shadow-sm">
                  <p className="text-2xl font-bold text-[#123BFF]">8</p>
                  <p className="mt-1 text-sm leading-6 text-sand/60">capability areas tracked</p>
                </div>
                <div className="rounded-2xl border border-sand/10 bg-white p-4 shadow-sm">
                  <p className="text-2xl font-bold text-[#123BFF]">Real</p>
                  <p className="mt-1 text-sm leading-6 text-sand/60">workflows, not demos</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                {intelligenceSignals.map((signal, index) => {
                  const Icon = signal.icon

                  return (
                    <article
                      key={signal.title}
                      className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex gap-4">
                          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>

                          <div>
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-[#123BFF] text-xs font-bold text-white shadow-sm">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              <h3 className="text-lg font-bold text-sand">{signal.title}</h3>
                            </div>

                            <p className="mt-3 text-sm leading-7 text-sand/65">
                              {signal.description}
                            </p>
                          </div>
                        </div>

                        <span className="w-fit rounded-full bg-[#EAF7FF] px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                          {signal.label}
                        </span>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>

          <section id="learning" className="mt-10 lg:mt-12">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
                  Academy Modules
                </span>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-sand">
                  Continue Learning
                </h2>
                <p className="mt-2 text-sand/55">
                  Pick up where you left off or start a new module
                </p>
              </div>
              <Link
                href="/syllabus"
                className="inline-flex w-fit items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-4 py-2 text-sm font-bold text-[#123BFF] shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#0A63FF]"
              >
                View Full Syllabus
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <ContentCardGrid modules={featuredModules} />
          </section>

          <section id="sandbox" className="mt-10 lg:mt-12">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <Code2 className="h-4 w-4" aria-hidden="true" />
                  Live Sandbox
                </span>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-sand">
                  Agentic Sandbox
                </h2>
                <p className="mt-2 text-sand/55">
                  Practice building AI agents in a live environment
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-[#123BFF] px-4 py-2 text-sm font-bold text-white shadow-sm">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                  Live
                </span>
              </div>
            </div>
            <CodeSandbox />
          </section>

          <footer className="mt-12 border-t border-sand/10 pt-8 pb-8 lg:mt-16">
            <div className="glass-card rounded-2xl border border-sand/10 bg-white/80 p-6 shadow-sm sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
                <div className="flex justify-center lg:justify-start">
                  <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sand/10 sm:h-32 sm:w-32">
                    <Image
                      src="/brand/deepmind-resources-logo.png"
                      alt="DeepMind Resources logo"
                      fill
                      sizes="128px"
                      className="object-contain p-2"
                      priority={false}
                    />
                  </div>
                </div>

                <div className="text-center lg:text-left">
                  <span className="inline-flex rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-sm">
                    Verified AI learning intelligence
                  </span>

                  <h2 className="mt-4 text-2xl font-bold tracking-tight text-sand">
                    DeepMind Resources
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-sand/60 sm:text-base">
                    A living AI training and tool-intelligence platform that turns verified AI
                    updates into practical lessons, sandbox tasks, and business-ready learning
                    paths.
                  </p>

                  <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
                    <span className="rounded-full bg-[#EAF7FF] px-4 py-2 text-xs font-bold text-[#123BFF] shadow-sm">
                      Live AI Intelligence
                    </span>
                    <Link
                      href="/syllabus"
                      className="rounded-full bg-[#EAF7FF] px-4 py-2 text-xs font-bold text-[#123BFF] shadow-sm transition hover:bg-[#123BFF] hover:text-white"
                    >
                      AI Syllabus
                    </Link>
                    <span className="rounded-full bg-[#EAF7FF] px-4 py-2 text-xs font-bold text-[#123BFF] shadow-sm">
                      Agentic Sandbox
                    </span>
                    <Link
                      href="/business-ai-training"
                      className="rounded-full bg-[#EAF7FF] px-4 py-2 text-xs font-bold text-[#123BFF] shadow-sm transition hover:bg-[#123BFF] hover:text-white"
                    >
                      Business AI Training
                    </Link>
                  </div>
                </div>

                <div className="grid gap-3 text-center text-sm sm:grid-cols-3 lg:grid-cols-1 lg:text-right">
                  <Link
                    href="/syllabus"
                    className="rounded-full bg-[#EAF7FF] px-4 py-2 font-bold text-[#123BFF] shadow-sm transition hover:bg-[#123BFF] hover:text-white"
                  >
                    Academy
                  </Link>
                  <a
                    href="#sandbox"
                    className="rounded-full bg-[#EAF7FF] px-4 py-2 font-bold text-[#123BFF] shadow-sm transition hover:bg-[#123BFF] hover:text-white"
                  >
                    Sandbox
                  </a>
                  <Link
                    href="/business-ai-training"
                    className="rounded-full bg-[#EAF7FF] px-4 py-2 font-bold text-[#123BFF] shadow-sm transition hover:bg-[#123BFF] hover:text-white"
                  >
                    Business Training
                  </Link>
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-[#123BFF] px-5 py-4 text-white shadow-sm">
                <div className="flex flex-col gap-3 text-center text-xs sm:flex-row sm:items-center sm:justify-between sm:text-left">
                  <p>Â© 2026 DeepMind Resources. Built for verified AI skill gain.</p>
                  <p>AI update â†’ verified meaning â†’ practical lesson â†’ sandbox task.</p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}