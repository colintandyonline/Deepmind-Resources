import type { Metadata } from 'next'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Layers3,
  LockKeyhole,
  Network,
  Radar,
  ShieldCheck,
  Sparkles,
  UsersRound,
  WandSparkles,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Business AI Training for Workforce Capability | DeepMind Resources',
  description:
    'Train teams with source-aware AI guidance, verified sandbox tasks, role-based workflows, tool intelligence, and release-aware learning paths built for business AI competency.',
  alternates: {
    canonical: 'https://deepmindresources.pro/business-ai-training',
  },
  keywords: [
    'business AI training',
    'workforce AI training',
    'AI training for teams',
    'AI competency training',
    'business AI competency',
    'role-based AI training',
    'AI tool intelligence for business',
    'AI workflow training',
    'staff AI onboarding',
    'AI safety training for teams',
    'release-aware AI learning',
    'verified AI sandbox tasks',
  ],
  openGraph: {
    title: 'Business AI Training for Workforce Capability | DeepMind Resources',
    description:
      'DeepMind Resources turns AI change into workforce capability with business-ready training, verified sandbox tasks, tool intelligence, safe-use guidance, and team learning paths.',
    url: 'https://deepmindresources.pro/business-ai-training',
    siteName: 'DeepMind Resources',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business AI Training for Workforce Capability | DeepMind Resources',
    description:
      'Build workforce AI competency with business-ready training, verified sandbox tasks, source-aware guidance, tool intelligence, and role-based workflow practice.',
  },
}

type Feature = {
  title: string
  description: string
  icon: LucideIcon
}

type TrainingPackage = {
  name: string
  label: string
  description: string
  icon: LucideIcon
  bestFor: string
  includes: string[]
}

type ProcessStep = {
  step: string
  title: string
  description: string
}

const businessTrainingFeatures: Feature[] = [
  {
    title: 'Practical team skills',
    description:
      'Teach staff how to use AI for research, writing, planning, analysis, workflows, and daily business tasks without turning training into theory.',
    icon: GraduationCap,
  },
  {
    title: 'Tool intelligence',
    description:
      'Help teams understand which AI tools are useful, what changed, what matters, and where a tool fits inside real business work.',
    icon: Radar,
  },
  {
    title: 'Sandbox practice',
    description:
      'Move beyond watching lessons by giving teams guided tasks where they practise prompts, checks, outputs, and workflow decisions.',
    icon: WandSparkles,
  },
  {
    title: 'Business-ready standards',
    description:
      'Build confidence around accuracy checks, responsible use, repeatable processes, team adoption, and practical governance habits.',
    icon: ShieldCheck,
  },
]

const trainingPackages: TrainingPackage[] = [
  {
    name: 'Team Starter',
    label: 'Foundation package',
    description:
      'A clear starting point for small teams that need practical AI confidence, shared language, and safer everyday usage.',
    icon: UsersRound,
    bestFor: 'Small teams, founders, operations staff, and businesses beginning structured AI adoption.',
    includes: [
      'Core business AI foundations',
      'Prompting for everyday work',
      'Tool selection basics',
      'Sandbox tasks for common business workflows',
      'Practical checks for accuracy, tone, and usefulness',
    ],
  },
  {
    name: 'Business Pro',
    label: 'Workflow package',
    description:
      'A deeper programme for teams ready to connect AI training with business processes, productivity, and repeatable workflows.',
    icon: Building2,
    bestFor: 'Growing teams that want AI to support marketing, operations, admin, sales, support, and internal knowledge work.',
    includes: [
      'Role-based AI workflow training',
      'Tool intelligence and update awareness',
      'Reusable prompt and process patterns',
      'Sandbox practice for team-specific scenarios',
      'Guidance for review, approval, and quality control',
    ],
  },
  {
    name: 'Enterprise Training',
    label: 'Organisation package',
    description:
      'A structured training layer for larger organisations that need scalable learning, adoption support, and clearer AI operating habits.',
    icon: Network,
    bestFor: 'Larger teams, departments, agencies, and organisations that need structured AI capability across multiple roles.',
    includes: [
      'Department-aware training pathways',
      'Advanced workflow and automation planning',
      'AI tool evaluation and internal enablement support',
      'Sandbox exercises aligned to business use cases',
      'Governance, refreshers, and adoption reporting foundations',
    ],
  },
]

const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Understand the team',
    description:
      'Start with the work your team already does, the tools they already use, and the AI skills they actually need.',
  },
  {
    step: '02',
    title: 'Train with clear lessons',
    description:
      'Turn AI concepts into plain-English learning that staff can understand, remember, and apply at work.',
  },
  {
    step: '03',
    title: 'Practise in the sandbox',
    description:
      'Use guided tasks to build confidence before teams rely on AI inside live customer, operational, or strategic workflows.',
  },
  {
    step: '04',
    title: 'Refresh as AI changes',
    description:
      'Keep skills useful with update-aware learning when tools, models, features, risks, and best practices move on.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Business AI Training',
  serviceType: 'Professional AI training for teams',
  provider: {
    '@type': 'Organization',
    name: 'DeepMind Resources',
    url: 'https://deepmindresources.pro',
  },
  areaServed: 'United Kingdom',
  description:
    'Professional business AI training with practical lessons, tool intelligence, sandbox practice, workflow training, and business-ready AI learning paths.',
  offers: trainingPackages.map((trainingPackage) => ({
    '@type': 'Offer',
    name: trainingPackage.name,
    description: trainingPackage.description,
    url: 'https://deepmindresources.pro/auth/signup?type=business',
  })),
}

export default function BusinessAiTrainingPage() {
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

            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="hidden rounded-2xl border border-sand/10 bg-white px-4 py-2.5 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF] sm:inline-flex"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup?type=business"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#123BFF] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
              >
                Business signup
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </nav>

          <div className="grid gap-8 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <Building2 className="h-4 w-4" aria-hidden="true" />
                Business AI Training
              </span>

              <h1 className="mt-6 max-w-5xl text-4xl font-bold tracking-tight text-sand sm:text-5xl lg:text-6xl">
                Professional AI training for teams that need practical business results.
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-sand/70 sm:text-lg">
                DeepMind Resources helps businesses turn AI curiosity into confident team capability:
                clear lessons, tool intelligence, sandbox practice, workflow training, and
                business-ready learning paths built for real work.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/auth/signup?type=business"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                >
                  Start business training
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <a
                  href="#packages"
                  className="inline-flex items-center justify-center rounded-2xl border border-sand/10 bg-white px-6 py-4 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                >
                  View packages
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  Tool intelligence
                </span>
                <span className="rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  Sandbox practice
                </span>
                <span className="rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  Business-ready learning
                </span>
              </div>
            </div>

            <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-5 shadow-sm sm:p-6 lg:p-8">
              <div className="rounded-[1.5rem] bg-[#EAF7FF] p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#123BFF] shadow-sm">
                    <Sparkles className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                      Built for .pro learning
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-sand">
                      AI update â†’ lesson â†’ sandbox task â†’ skill gain
                    </h2>
                  </div>
                </div>

                <div className="mt-6 grid gap-4">
                  <div className="rounded-2xl border border-white bg-white/85 p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#123BFF]" aria-hidden="true" />
                      <p className="text-sm leading-7 text-sand/70">
                        Train staff on what AI can actually do for their role, not just what the
                        latest tool claims it can do.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white bg-white/85 p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#123BFF]" aria-hidden="true" />
                      <p className="text-sm leading-7 text-sand/70">
                        Practise business scenarios safely before teams rely on AI inside live
                        workflows.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white bg-white/85 p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#123BFF]" aria-hidden="true" />
                      <p className="text-sm leading-7 text-sand/70">
                        Keep learning current as AI tools, risks, features, and best practices
                        change.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-sand/10 bg-white p-4 text-center shadow-sm">
                  <BookOpenCheck className="mx-auto h-6 w-6 text-[#123BFF]" aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold text-sand">Lessons</p>
                </div>
                <div className="rounded-2xl border border-sand/10 bg-white p-4 text-center shadow-sm">
                  <ClipboardCheck className="mx-auto h-6 w-6 text-[#123BFF]" aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold text-sand">Practice</p>
                </div>
                <div className="rounded-2xl border border-sand/10 bg-white p-4 text-center shadow-sm">
                  <LockKeyhole className="mx-auto h-6 w-6 text-[#123BFF]" aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold text-sand">Controls</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6 lg:px-8" aria-labelledby="business-ai-training">
        <div className="mx-auto w-full max-w-7xl">
          <div className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <Layers3 className="h-4 w-4" aria-hidden="true" />
                  Training model
                </span>

                <h2
                  id="business-ai-training"
                  className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl"
                >
                  Business AI training should be practical, current, and safe to apply.
                </h2>

                <p className="mt-4 text-base leading-8 text-sand/65">
                  Teams do not need vague AI hype. They need to know what to use, when to use it,
                  how to check the output, and how to turn AI into repeatable business workflows.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {businessTrainingFeatures.map((feature) => {
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

      <section id="packages" className="px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="package-structure">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Package structure
            </span>

            <h2
              id="package-structure"
              className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl"
            >
              Choose the right level of AI training for your team.
            </h2>

            <p className="mt-4 text-base leading-8 text-sand/65">
              Packages are structured around team size, current capability, workflow depth, and the
              level of support needed. Prices are not listed on this page.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {trainingPackages.map((trainingPackage) => {
              const Icon = trainingPackage.icon

              return (
                <article
                  key={trainingPackage.name}
                  className="flex h-full flex-col rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-7"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </span>

                    <span className="rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                      {trainingPackage.label}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-bold tracking-tight text-sand">
                    {trainingPackage.name}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-sand/65">
                    {trainingPackage.description}
                  </p>

                  <div className="mt-5 rounded-2xl bg-[#EAF7FF] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                      Best for
                    </p>
                    <p className="mt-2 text-sm leading-7 text-sand/70">
                      {trainingPackage.bestFor}
                    </p>
                  </div>

                  <ul className="mt-5 space-y-3 text-sm leading-7 text-sand/65">
                    {trainingPackage.includes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <CheckCircle2
                          className="mt-1 h-5 w-5 shrink-0 text-[#123BFF]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/auth/signup?type=business"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                  >
                    Select {trainingPackage.name}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="training-process">
        <div className="mx-auto w-full max-w-7xl">
          <div className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
                  Training pathway
                </span>

                <h2
                  id="training-process"
                  className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl"
                >
                  From AI awareness to confident workplace use.
                </h2>

                <p className="mt-4 text-base leading-8 text-sand/65">
                  DeepMind Resources is designed around the idea that AI training should not stop at
                  explanation. Staff need guided practice, useful habits, and refreshers when tools
                  change.
                </p>
              </div>

              <div className="grid gap-4">
                {processSteps.map((processStep) => (
                  <article
                    key={processStep.step}
                    className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm sm:p-6"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#123BFF] text-sm font-bold text-white shadow-sm">
                        {processStep.step}
                      </span>

                      <div>
                        <h3 className="text-xl font-bold text-sand">{processStep.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-sand/65">
                          {processStep.description}
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

      <section className="px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="business-outcomes">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-3">
            <article className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-7">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                <BookOpenCheck className="h-6 w-6" aria-hidden="true" />
              </span>

              <h2 id="business-outcomes" className="mt-5 text-2xl font-bold text-sand">
                Better AI judgement
              </h2>

              <p className="mt-4 text-sm leading-7 text-sand/65">
                Help staff understand when AI is useful, when it needs review, and when human
                expertise should lead the work.
              </p>
            </article>

            <article className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-7">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                <Layers3 className="h-6 w-6" aria-hidden="true" />
              </span>

              <h2 className="mt-5 text-2xl font-bold text-sand">Repeatable workflows</h2>

              <p className="mt-4 text-sm leading-7 text-sand/65">
                Move teams away from random prompting and towards reusable processes for research,
                drafting, checking, planning, and delivery.
              </p>
            </article>

            <article className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-7">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </span>

              <h2 className="mt-5 text-2xl font-bold text-sand">Safer adoption habits</h2>

              <p className="mt-4 text-sm leading-7 text-sand/65">
                Build sensible working habits around accuracy, privacy, review, team standards, and
                business risk before AI usage spreads informally.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 pb-14 sm:px-6 lg:px-8" aria-labelledby="business-signup">
        <div className="mx-auto w-full max-w-7xl">
          <div className="overflow-hidden rounded-[2rem] border border-sand/10 bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Business access
                </span>

                <h2
                  id="business-signup"
                  className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl"
                >
                  Start building practical AI capability across your team.
                </h2>

                <p className="mt-4 max-w-3xl text-base leading-8 text-white/80">
                  Use DeepMind Resources to give your team professional AI training, clear tool
                  intelligence, practical sandbox tasks, and a learning path that stays useful as AI
                  changes.
                </p>
              </div>

              <Link
                href="/auth/signup?type=business"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-[#123BFF] shadow-sm transition hover:bg-[#EAF7FF]"
              >
                Create business account
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
