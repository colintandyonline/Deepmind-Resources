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
  LockKeyhole,
  Radar,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
  WandSparkles,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'DeepMind Resources | Professional AI Training and Tool Intelligence',
  description:
    'DeepMind Resources is a professional AI training and tool-intelligence platform for practical lessons, sandbox tasks, business-ready learning, and update-aware AI skills.',
  alternates: {
    canonical: '/',
  },
  keywords: [
    'AI training',
    'professional AI training',
    'business AI training',
    'AI tool intelligence',
    'AI sandbox',
    'prompt engineering training',
    'AI skills',
    'AI workflow training',
    'AI learning platform',
    'agentic AI training',
  ],
  openGraph: {
    title: 'DeepMind Resources | Professional AI Training and Tool Intelligence',
    description:
      'Build practical AI skills with verified lessons, sandbox tasks, tool intelligence, and business-ready learning paths.',
    url: 'https://deepmindresources.pro',
    siteName: 'DeepMind Resources',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'DeepMind Resources | Professional AI Training and Tool Intelligence',
    description:
      'Professional AI training, tool intelligence, sandbox practice, and business-ready learning paths.',
  },
}

type Feature = {
  title: string
  description: string
  icon: LucideIcon
}

type Pathway = {
  label: string
  title: string
  description: string
  icon: LucideIcon
  points: string[]
}

type MethodStep = {
  step: string
  title: string
  description: string
}

const platformFeatures: Feature[] = [
  {
    title: 'Verified AI learning',
    description:
      'Turn important AI changes into clear lessons that explain what changed, why it matters, and how to use it in practice.',
    icon: BookOpenCheck,
  },
  {
    title: 'Tool intelligence',
    description:
      'Understand which AI tools are useful, where they fit, what they are good at, and what teams should check before relying on them.',
    icon: Radar,
  },
  {
    title: 'Sandbox practice',
    description:
      'Build confidence with guided tasks for prompts, workflows, reviews, tool use, automation planning, and real business scenarios.',
    icon: Code2,
  },
  {
    title: 'Business-ready training',
    description:
      'Support individuals and teams with practical AI habits for accuracy, workflow quality, safer adoption, and continuous skill growth.',
    icon: BriefcaseBusiness,
  },
]

const learningPathways: Pathway[] = [
  {
    label: 'Academy',
    title: 'Learn AI step by step',
    description:
      'Structured lessons for people who want to understand AI clearly before using it in real work.',
    icon: GraduationCap,
    points: [
      'AI foundations and key terms',
      'Prompting and output review',
      'Tool selection and practical use',
      'Workflow thinking and repeatable habits',
    ],
  },
  {
    label: 'Sandbox',
    title: 'Practise useful tasks',
    description:
      'Hands-on exercises that turn learning into skill, confidence, and better working judgement.',
    icon: WandSparkles,
    points: [
      'Prompt improvement tasks',
      'Research and summary workflows',
      'Business writing and planning practice',
      'Quality checks before real-world use',
    ],
  },
  {
    label: 'Business',
    title: 'Train teams properly',
    description:
      'Professional AI training for teams that need practical workflows, shared standards, and safer adoption.',
    icon: UsersRound,
    points: [
      'Team Starter training',
      'Business Pro workflow training',
      'Enterprise Training pathways',
      'Role-aware AI learning support',
    ],
  },
]

const methodSteps: MethodStep[] = [
  {
    step: '01',
    title: 'Track what changed',
    description:
      'Identify important AI updates, tool changes, workflow shifts, and new practical opportunities.',
  },
  {
    step: '02',
    title: 'Explain what matters',
    description:
      'Translate AI changes into plain-English lessons that focus on usefulness, risk, and real-world application.',
  },
  {
    step: '03',
    title: 'Practise the task',
    description:
      'Use sandbox exercises to turn knowledge into practical skill before applying it inside live work.',
  },
  {
    step: '04',
    title: 'Refresh the learning',
    description:
      'Keep skills current when AI tools, model behaviour, workflows, and recommended practices move on.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DeepMind Resources',
  url: 'https://deepmindresources.pro',
  description:
    'Professional AI training and tool intelligence for practical lessons, sandbox tasks, business-ready learning, and update-aware AI skills.',
  sameAs: [],
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-obsidian text-sand">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="relative overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[#45C9FF]/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-24 h-[28rem] w-[28rem] rounded-full bg-[#123BFF]/10 blur-3xl" />

        <div className="relative mx-auto w-full max-w-7xl">
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
              <a href="#platform" className="transition hover:text-[#123BFF]">
                Platform
              </a>
              <a href="#pathways" className="transition hover:text-[#123BFF]">
                Learning
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

          <div className="grid gap-8 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Professional AI learning
              </span>

              <h1 className="mt-6 max-w-5xl text-4xl font-bold tracking-tight text-sand sm:text-5xl lg:text-6xl">
                Learn AI properly with practical lessons, tool intelligence, and sandbox training.
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-sand/70 sm:text-lg">
                DeepMind Resources is a professional AI training platform built for people and
                teams who want practical AI skills, clearer tool choices, safer workflows, and
                learning that stays useful as AI changes.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                >
                  Start learning now
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
                  AI lessons
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
                    <Rocket className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                      The .pro learning model
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-sand">
                      AI update → verified meaning → practical lesson → sandbox task
                    </h2>
                  </div>
                </div>

                <div className="mt-6 grid gap-4">
                  <div className="rounded-2xl border border-white bg-white/85 p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#123BFF]" aria-hidden="true" />
                      <p className="text-sm leading-7 text-sand/70">
                        Learn what AI tools can actually do, not just what the headlines promise.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white bg-white/85 p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#123BFF]" aria-hidden="true" />
                      <p className="text-sm leading-7 text-sand/70">
                        Practise prompts, checks, workflows, and business tasks before using AI in
                        important work.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white bg-white/85 p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#123BFF]" aria-hidden="true" />
                      <p className="text-sm leading-7 text-sand/70">
                        Refresh your learning when tools, models, features, and best practices
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
          </div>
        </div>
      </section>

      <section id="platform" className="px-4 pb-8 sm:px-6 lg:px-8" aria-labelledby="platform-title">
        <div className="mx-auto w-full max-w-7xl">
          <div className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <Layers3 className="h-4 w-4" aria-hidden="true" />
                  Platform standard
                </span>

                <h2
                  id="platform-title"
                  className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl"
                >
                  Built for practical AI skill gain, not passive course watching.
                </h2>

                <p className="mt-4 text-base leading-8 text-sand/65">
                  DeepMind Resources connects learning, tool intelligence, and guided practice so AI
                  knowledge turns into useful working ability.
                </p>

                <div className="mt-6 rounded-2xl bg-[#EAF7FF] p-5">
                  <div className="flex items-start gap-3">
                    <LockKeyhole className="mt-1 h-5 w-5 shrink-0 text-[#123BFF]" aria-hidden="true" />
                    <p className="text-sm leading-7 text-sand/70">
                      The platform is designed around professional use: clear learning, safer
                      workflows, review habits, and practical standards for real work.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {platformFeatures.map((feature) => {
                  const Icon = feature.icon

                  return (
                    <article
                      key={feature.title}
                      className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm"
                    >
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>

                      <h3 className="mt-5 text-xl font-bold text-sand">{feature.title}</h3>

                      <p className="mt-3 text-sm leading-7 text-sand/65">
                        {feature.description}
                      </p>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pathways" className="px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="pathways-title">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              Learning pathways
            </span>

            <h2
              id="pathways-title"
              className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl"
            >
              Learn, practise, and apply AI with a clear structure.
            </h2>

            <p className="mt-4 text-base leading-8 text-sand/65">
              The platform is designed for individual learners and businesses that need a practical
              way to build useful AI capability over time.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {learningPathways.map((pathway) => {
              const Icon = pathway.icon

              return (
                <article
                  key={pathway.title}
                  className="flex h-full flex-col rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-7"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>

                    <span className="rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                      {pathway.label}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-bold tracking-tight text-sand">
                    {pathway.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-sand/65">{pathway.description}</p>

                  <ul className="mt-5 space-y-3 text-sm leading-7 text-sand/65">
                    {pathway.points.map((point) => (
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

      <section className="px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="business-training-title">
        <div className="mx-auto w-full max-w-7xl">
          <div className="overflow-hidden rounded-[2rem] border border-sand/10 bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                  <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
                  Business AI training
                </span>

                <h2
                  id="business-training-title"
                  className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl"
                >
                  Train your team to use AI confidently, safely, and practically.
                </h2>

                <p className="mt-4 max-w-3xl text-base leading-8 text-white/80">
                  Business training gives teams a structured way to learn AI, practise real
                  workplace tasks, choose tools more intelligently, and build better working habits
                  before AI use spreads informally.
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
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="method-title">
        <div className="mx-auto w-full max-w-7xl">
          <div className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
                  Learning method
                </span>

                <h2
                  id="method-title"
                  className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl"
                >
                  A clear loop for keeping AI skills useful.
                </h2>

                <p className="mt-4 text-base leading-8 text-sand/65">
                  AI changes quickly. DeepMind Resources is built around a living training model:
                  understand updates, learn what matters, practise the skill, and refresh when the
                  landscape changes.
                </p>
              </div>

              <div className="grid gap-4">
                {methodSteps.map((methodStep) => (
                  <article
                    key={methodStep.step}
                    className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm sm:p-6"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#123BFF] text-sm font-bold text-white shadow-sm">
                        {methodStep.step}
                      </span>

                      <div>
                        <h3 className="text-xl font-bold text-sand">{methodStep.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-sand/65">
                          {methodStep.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="trust-title">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-3">
            <article className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-7">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </span>

              <h2 id="trust-title" className="mt-5 text-2xl font-bold text-sand">
                Built for responsible use
              </h2>

              <p className="mt-4 text-sm leading-7 text-sand/65">
                Learn practical habits for checking outputs, protecting sensitive information, and
                knowing when human review matters.
              </p>
            </article>

            <article className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-7">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                <Layers3 className="h-6 w-6" aria-hidden="true" />
              </span>

              <h2 className="mt-5 text-2xl font-bold text-sand">Built for real workflows</h2>

              <p className="mt-4 text-sm leading-7 text-sand/65">
                Focus on practical use cases like research, content, operations, support, planning,
                analysis, and process improvement.
              </p>
            </article>

            <article className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-7">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                <Radar className="h-6 w-6" aria-hidden="true" />
              </span>

              <h2 className="mt-5 text-2xl font-bold text-sand">Built to stay current</h2>

              <p className="mt-4 text-sm leading-7 text-sand/65">
                Keep learning connected to AI updates so skills do not become stale as tools,
                models, and best practices evolve.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 pb-14 sm:px-6 lg:px-8" aria-labelledby="signup-title">
        <div className="mx-auto w-full max-w-7xl">
          <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Start building skill
                </span>

                <h2
                  id="signup-title"
                  className="mt-5 max-w-3xl text-3xl font-bold tracking-tight text-sand sm:text-4xl"
                >
                  Build practical AI confidence with training that is made for real work.
                </h2>

                <p className="mt-4 max-w-3xl text-base leading-8 text-sand/65">
                  Start with structured learning, then move into sandbox tasks, tool intelligence,
                  workflow practice, and business-ready AI habits.
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
                  href="/business-ai-training"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-6 py-4 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                >
                  Explore business training
                  <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          <footer className="mt-8 rounded-3xl border border-sand/10 bg-white/80 p-6 text-center shadow-sm sm:p-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#123BFF] text-white shadow-sm">
                  <BrainCircuit className="h-6 w-6" aria-hidden="true" />
                </span>
                <div className="text-left">
                  <p className="text-sm font-bold text-sand">DeepMind Resources</p>
                  <p className="text-xs text-sand/50">Professional AI training and tool intelligence.</p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4 text-sm font-bold text-sand/60">
                <Link href="/auth/login" className="transition hover:text-[#123BFF]">
                  Log in
                </Link>
                <Link href="/auth/signup" className="transition hover:text-[#123BFF]">
                  Sign up
                </Link>
                <Link href="/business-ai-training" className="transition hover:text-[#123BFF]">
                  Business AI training
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </main>
  )
}