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
  Database,
  GitCompareArrows,
  GraduationCap,
  Layers3,
  Lightbulb,
  Radar,
  Route,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Platform | DeepMind Resources',
  description:
    'Discover the DeepMind Resources platform: professional AI training, tool intelligence, structured learning paths, sandbox practice, release-aware refreshers, and business-ready AI skill development.',
  alternates: {
    canonical: '/platform',
  },
  keywords: [
    'AI training platform',
    'professional AI training platform',
    'AI learning platform',
    'AI tool intelligence platform',
    'AI sandbox practice',
    'AI learning paths',
    'AI training for professionals',
    'business AI training platform',
    'prompt engineering platform',
    'agentic AI training',
    'AI workflow training',
    'release aware AI training',
  ],
  openGraph: {
    title: 'Platform | DeepMind Resources',
    description:
      'A professional AI training and tool-intelligence platform that turns important AI changes into clearer lessons, sandbox practice, and business-ready skills.',
    url: 'https://deepmindresources.pro/platform',
    siteName: 'DeepMind Resources',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Platform | DeepMind Resources',
    description:
      'Explore the DeepMind Resources platform for professional AI training, tool intelligence, sandbox practice, and practical AI skill development.',
  },
}

type PlatformPillar = {
  title: string
  description: string
  icon: LucideIcon
  points: string[]
}

type PlatformLoopStep = {
  step: string
  title: string
  description: string
  icon: LucideIcon
}

type CapabilityLayer = {
  label: string
  title: string
  description: string
  icon: LucideIcon
}

type AudiencePath = {
  title: string
  description: string
  icon: LucideIcon
  outcomes: string[]
}

type TrustPrinciple = {
  title: string
  description: string
  icon: LucideIcon
}

const platformPillars: PlatformPillar[] = [
  {
    title: 'Structured AI learning',
    description:
      'Clear learning paths help people move from AI foundations into prompt engineering, tool selection, workflow design, RAG, agents, validation, and business productivity.',
    icon: BookOpenCheck,
    points: [
      'Beginner-to-professional progression',
      'Practical capability areas',
      'Lessons connected to real work',
      'Refreshers when tools and practices change',
    ],
  },
  {
    title: 'Tool intelligence',
    description:
      'The platform is designed to help learners and businesses understand which AI tools fit real scenarios instead of following every trend or sales claim.',
    icon: Radar,
    points: [
      'Tool selection by use case',
      'Comparison-focused learning',
      'Workflow impact explained clearly',
      'Less wasted time on poor-fit tools',
    ],
  },
  {
    title: 'Sandbox practice',
    description:
      'Learning should turn into hands-on skill. Sandbox tasks are the bridge between understanding an AI concept and using it safely in real work.',
    icon: Code2,
    points: [
      'Prompt practice',
      'Workflow simulations',
      'Agent and tool-use exercises',
      'Review and validation habits',
    ],
  },
]

const platformLoopSteps: PlatformLoopStep[] = [
  {
    step: '01',
    title: 'AI update',
    description:
      'Important model releases, tool changes, workflow shifts, platform updates, and emerging AI capabilities are identified for practical learning impact.',
    icon: Radar,
  },
  {
    step: '02',
    title: 'Verified meaning',
    description:
      'The change is checked for usefulness, risk, affected workflows, learner relevance, and whether it should change existing guidance.',
    icon: SearchCheck,
  },
  {
    step: '03',
    title: 'Practical lesson',
    description:
      'Useful changes become clearer explanations, updated learning guidance, tool comparisons, business notes, or new skill modules.',
    icon: BookOpenCheck,
  },
  {
    step: '04',
    title: 'Sandbox task',
    description:
      'Learners practise the skill through guided prompts, workflow exercises, tool-use tasks, validation checks, or business scenarios.',
    icon: Code2,
  },
  {
    step: '05',
    title: 'Skill gain',
    description:
      'Progress becomes practical: better judgement, stronger prompts, clearer workflows, safer review habits, and more confident AI use.',
    icon: Target,
  },
]

const capabilityLayers: CapabilityLayer[] = [
  {
    label: 'Learn',
    title: 'AI foundations and prompting',
    description:
      'Understand how modern AI tools respond, where they help, where they fail, and how better instructions improve output quality.',
    icon: BrainCircuit,
  },
  {
    label: 'Choose',
    title: 'Tool and workflow intelligence',
    description:
      'Compare tools by the work they support: coding, research, writing, operations, internal knowledge, data, support, and automation.',
    icon: GitCompareArrows,
  },
  {
    label: 'Build',
    title: 'RAG, agents, and automation',
    description:
      'Move beyond single prompts into retrieval workflows, tool calling, approval loops, agentic task chains, and repeatable AI processes.',
    icon: Workflow,
  },
  {
    label: 'Check',
    title: 'Safety, validation, and review',
    description:
      'Develop practical habits for checking claims, protecting sensitive information, reducing hallucination risk, and keeping humans in control.',
    icon: ShieldCheck,
  },
  {
    label: 'Apply',
    title: 'Business-ready AI skills',
    description:
      'Turn AI learning into useful workplace skills for marketing, sales, support, leadership, operations, documentation, and team enablement.',
    icon: BriefcaseBusiness,
  },
  {
    label: 'Refresh',
    title: 'Release-aware learning',
    description:
      'Keep learning useful as AI models, platforms, assistants, automation tools, APIs, and best practices continue to change.',
    icon: Sparkles,
  },
]

const audiencePaths: AudiencePath[] = [
  {
    title: 'Individual learners',
    description:
      'A practical route for people who want to understand AI properly, build confidence, and avoid being overwhelmed by fast-moving tools.',
    icon: GraduationCap,
    outcomes: [
      'Start with clear foundations',
      'Build stronger prompt habits',
      'Practise with guided tasks',
      'Stay current as AI changes',
    ],
  },
  {
    title: 'Professionals and builders',
    description:
      'A deeper path for people using AI in real work, including tool choice, workflow design, automation, retrieval, agents, and review systems.',
    icon: Route,
    outcomes: [
      'Compare tools by use case',
      'Design repeatable workflows',
      'Understand agentic systems',
      'Improve output quality and checks',
    ],
  },
  {
    title: 'Teams and businesses',
    description:
      'A professional training layer for organisations that need shared AI standards, practical adoption, safer usage, and business-ready skills.',
    icon: BriefcaseBusiness,
    outcomes: [
      'Train staff by role and workflow',
      'Reduce tool confusion and wasted spend',
      'Build review and governance habits',
      'Refresh skills after important AI changes',
    ],
  },
]

const trustPrinciples: TrustPrinciple[] = [
  {
    title: 'Practical over theoretical',
    description:
      'The platform focuses on what people can actually use: clearer prompts, better tool choices, safer workflows, and stronger working habits.',
    icon: ClipboardCheck,
  },
  {
    title: 'Verified over hyped',
    description:
      'AI changes should be translated into useful learning only when they have practical value, not simply because they are trending.',
    icon: ShieldCheck,
  },
  {
    title: 'Current over static',
    description:
      'AI training must keep pace with real changes in tools, models, workflows, risks, and business adoption patterns.',
    icon: Radar,
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'DeepMind Resources Platform',
  url: 'https://deepmindresources.pro/platform',
  description:
    'DeepMind Resources is a professional AI training and tool-intelligence platform for structured learning, sandbox practice, release-aware refreshers, and business-ready AI skills.',
  publisher: {
    '@type': 'Organization',
    name: 'DeepMind Resources',
    url: 'https://deepmindresources.pro',
  },
  mainEntity: {
    '@type': 'Service',
    name: 'DeepMind Resources AI Training Platform',
    serviceType: 'Professional AI training and tool intelligence platform',
    description:
      'A platform that connects AI learning paths, tool intelligence, sandbox practice, release-aware updates, and business AI training.',
  },
}

export default function PlatformPage() {
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
              <Link href="/syllabus" className="transition hover:text-[#123BFF]">
                Syllabus
              </Link>
              <a href="#how-it-works" className="transition hover:text-[#123BFF]">
                How it works
              </a>
              <a href="#capabilities" className="transition hover:text-[#123BFF]">
                Capabilities
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
                <Layers3 className="h-4 w-4" aria-hidden="true" />
                Platform
              </span>

              <h1 className="mt-6 max-w-5xl text-4xl font-bold tracking-tight text-sand sm:text-5xl lg:text-6xl">
                Future-Proof Your Workforce at the Speed of AI.
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-sand/70 sm:text-lg">
                DeepMind Resources is the real-time operating system for AI competency. We distill the chaos of shifting models and protocols into a deterministic learning path for your team. From Agentic Orchestration to GraphRAG deployment, we turn global AI breakthroughs into production-ready skills and verified sandbox tasksâ€”ensuring your business stays ahead of the curve, not just in the queue.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                >
                  Start learning
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/syllabus"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-6 py-4 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                >
                  View syllabus
                  <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  Structured learning
                </span>
                <span className="rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  Tool intelligence
                </span>
                <span className="rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  Sandbox practice
                </span>
              </div>
            </div>

            <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-5 shadow-sm sm:p-6 lg:p-8">
              <div className="rounded-[1.5rem] bg-[#EAF7FF] p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#123BFF] shadow-sm">
                    <Sparkles className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                      Core platform loop
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-sand">
                      AI update Ã¢â€ â€™ verified meaning Ã¢â€ â€™ practical lesson Ã¢â€ â€™ sandbox task Ã¢â€ â€™ skill gain
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
                        Learn AI through clear capability paths instead of disconnected tips and
                        tutorials.
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
                        Understand which tools and workflows matter for real tasks before spending
                        time or money on the wrong setup.
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
                        Practise skills through guided tasks so learning becomes useful working
                        confidence.
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
                  <Radar className="mx-auto h-6 w-6 text-[#123BFF]" aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold text-sand">Compare</p>
                </div>
                <div className="rounded-2xl border border-sand/10 bg-white p-4 text-center shadow-sm">
                  <Code2 className="mx-auto h-6 w-6 text-[#123BFF]" aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold text-sand">Practise</p>
                </div>
              </div>
            </div>
          </section>

          <section className="pb-8" aria-labelledby="platform-pillars">
            <div className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <Layers3 className="h-4 w-4" aria-hidden="true" />
                  Platform layers
                </span>

                <h2
                  id="platform-pillars"
                  className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl"
                >
                  The operating layer behind AI competency.
                </h2>

                <p className="mt-4 text-base leading-8 text-sand/65">
                  DeepMind Resources is structured to connect what people learn with what they can
                  actually do: understand AI, choose better tools, practise workflows, and keep
                  skills current.
                </p>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-3">
                {platformPillars.map((pillar) => {
                  const Icon = pillar.icon

                  return (
                    <article
                      key={pillar.title}
                      className="flex h-full flex-col rounded-3xl border border-sand/10 bg-white p-6 shadow-sm"
                    >
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>

                      <h3 className="mt-5 text-xl font-bold text-sand">{pillar.title}</h3>

                      <p className="mt-3 text-sm leading-7 text-sand/65">{pillar.description}</p>

                      <ul className="mt-5 space-y-3 text-sm leading-7 text-sand/65">
                        {pillar.points.map((point) => (
                          <li key={point} className="flex gap-3">
                            <CheckCircle2
                              className="mt-1 h-5 w-5 shrink-0 text-[#123BFF]"
                              aria-hidden="true"
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>

          <section id="how-it-works" className="py-8" aria-labelledby="loop-title">
            <div className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                    <Workflow className="h-4 w-4" aria-hidden="true" />
                    How it works
                  </span>

                  <h2
                    id="loop-title"
                    className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl"
                  >
                    From model shift to workforce skill.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-sand/65">
                    Normal AI courses age quickly. DeepMind Resources is designed around an update
                    loop that can turn meaningful changes into clearer guidance, lesson refreshes,
                    sandbox tasks, and stronger tool recommendations.
                  </p>

                  <div className="mt-6 rounded-2xl bg-[#EAF7FF] p-5">
                    <div className="flex items-start gap-3">
                      <Lightbulb
                        className="mt-1 h-5 w-5 shrink-0 text-[#123BFF]"
                        aria-hidden="true"
                      />
                      <p className="text-sm leading-7 text-sand/70">
                        The aim is not to publish every AI headline. The aim is to identify what
                        genuinely changes what people should learn, practise, or use at work.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  {platformLoopSteps.map((loopStep, index) => {
                    const Icon = loopStep.icon

                    return (
                      <article key={loopStep.title} className="relative pl-14 sm:pl-16">
                        {index !== platformLoopSteps.length - 1 ? (
                          <span className="absolute left-[1.35rem] top-12 h-[calc(100%+0.75rem)] w-px bg-[#123BFF]/30" />
                        ) : null}

                        <span className="absolute left-0 top-0 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#123BFF]/20 bg-[#EAF7FF] text-[#123BFF]">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>

                        <div className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <div className="flex flex-wrap items-center gap-3">
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-[#123BFF] text-xs font-bold text-white shadow-sm">
                                  {loopStep.step}
                                </span>
                                <h3 className="text-xl font-bold text-sand">{loopStep.title}</h3>
                              </div>
                              <p className="mt-3 text-sm leading-7 text-sand/65">
                                {loopStep.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          <section id="capabilities" className="py-8" aria-labelledby="capabilities-title">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <BrainCircuit className="h-4 w-4" aria-hidden="true" />
                Capability map
              </span>

              <h2
                id="capabilities-title"
                className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl"
              >
                The AI capability map for production workflows.
              </h2>

              <p className="mt-4 text-base leading-8 text-sand/65">
                The public syllabus explains the learning map. The platform connects that map to
                tool judgement, practice, business use cases, and future refresh logic.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {capabilityLayers.map((layer) => {
                const Icon = layer.icon

                return (
                  <article
                    key={layer.title}
                    className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>

                      <span className="rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                        {layer.label}
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-bold text-sand">{layer.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-sand/65">{layer.description}</p>
                  </article>
                )
              })}
            </div>
          </section>

          <section className="py-8" aria-labelledby="audiences-title">
            <div className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                    <Target className="h-4 w-4" aria-hidden="true" />
                    Who it serves
                  </span>

                  <h2
                    id="audiences-title"
                    className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl"
                  >
                    Built for teams that cannot afford stale AI training.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-sand/65">
                    DeepMind Resources is shaped for people learning AI, professionals applying it
                    in real work, and businesses that need shared training standards across teams.
                  </p>
                </div>

                <div className="grid gap-4">
                  {audiencePaths.map((path) => {
                    const Icon = path.icon

                    return (
                      <article
                        key={path.title}
                        className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm sm:p-6"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                            <Icon className="h-6 w-6" aria-hidden="true" />
                          </span>

                          <div>
                            <h3 className="text-xl font-bold text-sand">{path.title}</h3>
                            <p className="mt-2 text-sm leading-7 text-sand/65">
                              {path.description}
                            </p>

                            <div className="mt-4 grid gap-2 sm:grid-cols-2">
                              {path.outcomes.map((outcome) => (
                                <div
                                  key={outcome}
                                  className="flex gap-2 rounded-2xl bg-[#EAF7FF] px-3 py-2 text-sm font-semibold text-sand/70"
                                >
                                  <CheckCircle2
                                    className="mt-0.5 h-4 w-4 shrink-0 text-[#123BFF]"
                                    aria-hidden="true"
                                  />
                                  <span>{outcome}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="py-8" aria-labelledby="trust-title">
            <div className="grid gap-6 lg:grid-cols-3">
              {trustPrinciples.map((principle, index) => {
                const Icon = principle.icon

                return (
                  <article
                    key={principle.title}
                    className={`rounded-3xl border border-sand/10 p-6 shadow-sm sm:p-7 ${
                      index === 1 ? 'bg-[#123BFF] text-white' : 'bg-white/90 text-sand'
                    }`}
                  >
                    <span
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${
                        index === 1 ? 'bg-white text-[#123BFF]' : 'bg-[#EAF7FF] text-[#123BFF]'
                      }`}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>

                    <h2
                      id={index === 0 ? 'trust-title' : undefined}
                      className="mt-5 text-2xl font-bold tracking-tight"
                    >
                      {principle.title}
                    </h2>

                    <p
                      className={`mt-4 text-sm leading-7 ${
                        index === 1 ? 'text-white/80' : 'text-sand/65'
                      }`}
                    >
                      {principle.description}
                    </p>
                  </article>
                )
              })}
            </div>
          </section>

          <section className="py-8 pb-14" aria-labelledby="platform-cta">
            <div className="overflow-hidden rounded-[2rem] border border-sand/10 bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Start building AI capability
                  </span>

                  <h2
                    id="platform-cta"
                    className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl"
                  >
                    Learn AI clearly, practise it properly, and keep improving as the tools change.
                  </h2>

                  <p className="mt-4 max-w-3xl text-base leading-8 text-white/80">
                    Explore the syllabus, create an account, or review business AI training options
                    for teams that need practical, professional AI skills.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-[#123BFF] shadow-sm transition hover:bg-[#EAF7FF]"
                  >
                    Create account
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>

                  <Link
                    href="/business-ai-training"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-white/15"
                  >
                    Business training
                    <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
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
