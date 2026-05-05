import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpenCheck,
  Brain,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  GraduationCap,
  Layers3,
  LockKeyhole,
  Radar,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Workflow,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

type WorkspaceCard = {
  label: string
  title: string
  description: string
  icon: LucideIcon
}

type PathwayCard = {
  title: string
  label: string
  status: string
  description: string
  href: string
  icon: LucideIcon
  points: string[]
}

type ProofItem = {
  title: string
  status: string
  description: string
  icon: LucideIcon
}

async function signOut() {
  'use server'

  const supabase = await createClient()
  await supabase.auth.signOut()

  redirect('/')
}

const workspaceCards: WorkspaceCard[] = [
  {
    label: 'Academy',
    title: 'Learn AI step by step',
    description:
      'Follow structured Academy pathways from AI fundamentals through prompting, tool intelligence, agent architecture, and workflow validation.',
    icon: GraduationCap,
  },
  {
    label: 'Sandbox',
    title: 'Practise with real tasks',
    description:
      'Move from passive learning into prompt checks, workflow mapping, tool-choice exercises, and production-aware sandbox practice.',
    icon: Code2,
  },
  {
    label: 'Intelligence',
    title: 'Stay current as AI changes',
    description:
      'Use DeepMind Resources to keep training aligned with important AI updates, tool changes, and source-aware guidance.',
    icon: Radar,
  },
]

const pathwayCards: PathwayCard[] = [
  {
    title: 'AI Fundamentals',
    label: 'Foundation',
    status: 'Ready to start',
    description:
      'Build the operating base for practical AI work: model behaviour, safe-use boundaries, prompt basics, and output review.',
    href: '/academy/path/fundamentals',
    icon: Brain,
    points: ['Core concepts', 'Safe-use judgement', 'Beginner sandbox practice'],
  },
  {
    title: 'Prompt Engineering',
    label: 'Core execution',
    status: 'Next pathway',
    description:
      'Turn vague requests into controlled instructions with context, constraints, examples, review rules, and repeatable prompt patterns.',
    href: '/academy/path/prompting',
    icon: Sparkles,
    points: ['Structured prompts', 'Output control', 'Reusable patterns'],
  },
  {
    title: 'Agent Architecture',
    label: 'Builder path',
    status: 'Build after prompting',
    description:
      'Understand goals, tools, permissions, memory, review gates, and the boundaries needed for controlled agentic systems.',
    href: '/academy/path/agents',
    icon: Workflow,
    points: ['Agent boundaries', 'Tool permissions', 'Human review gates'],
  },
  {
    title: 'Multi-Agent Systems',
    label: 'Advanced builder',
    status: 'Advanced route',
    description:
      'Learn how specialist agents coordinate through roles, handoffs, shared state, validation layers, and escalation rules.',
    href: '/academy/path/multi-agent-systems',
    icon: Layers3,
    points: ['Specialist roles', 'Agent handoffs', 'Validation workflows'],
  },
]

const proofItems: ProofItem[] = [
  {
    title: 'Foundation badge',
    status: 'Not earned yet',
    description:
      'Awarded when the AI Fundamentals lesson path, core checks, and first sandbox task are completed.',
    icon: Award,
  },
  {
    title: 'Sandbox proof',
    status: 'Not submitted yet',
    description:
      'Used to show practical evidence of prompt control, workflow judgement, or validation skill.',
    icon: BadgeCheck,
  },
  {
    title: 'Assessment status',
    status: 'Locked until lesson completion',
    description:
      'Knowledge checks and review tasks unlock as the Academy lesson structure comes online.',
    icon: LockKeyhole,
  },
]

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('first_name, display_name')
    .eq('id', user.id)
    .maybeSingle()

  const profileFirstName =
    typeof profile?.first_name === 'string' && profile.first_name.trim()
      ? profile.first_name.trim()
      : null

  const profileDisplayName =
    typeof profile?.display_name === 'string' && profile.display_name.trim()
      ? profile.display_name.trim()
      : null

  const metadataFirstName =
    typeof user.user_metadata?.first_name === 'string' && user.user_metadata.first_name.trim()
      ? user.user_metadata.first_name.trim()
      : null

  const metadataFullName =
    typeof user.user_metadata?.full_name === 'string' && user.user_metadata.full_name.trim()
      ? user.user_metadata.full_name.trim()
      : null

  const displayName =
    profileFirstName ?? profileDisplayName ?? metadataFirstName ?? metadataFullName ?? null

  return (
    <main className="min-h-screen bg-obsidian px-4 py-8 text-sand sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <header className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <Brain className="h-4 w-4" aria-hidden="true" />
                  Member dashboard
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF7FF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Academy workspace
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl lg:text-5xl">
                Your AI learning workspace
              </h1>

              <p className="mt-4 max-w-3xl text-base leading-8 text-sand/65">
                {displayName ? `Welcome back, ${displayName}. ` : 'Welcome back. '}
                This is your home base for Academy pathways, lesson progress, sandbox practice,
                tool intelligence, and update-aware training as DeepMind Resources expands.
              </p>
            </div>

            <form action={signOut}>
              <button
                type="submit"
                className="rounded-2xl border border-sand/10 bg-white px-5 py-3 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
              >
                Sign out
              </button>
            </form>
          </div>
        </header>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          {workspaceCards.map((card) => {
            const Icon = card.icon

            return (
              <article
                key={card.title}
                className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>

                  <span className="inline-flex rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                    {card.label}
                  </span>
                </div>

                <h2 className="mt-5 text-2xl font-bold tracking-tight text-sand">{card.title}</h2>

                <p className="mt-4 text-sm leading-7 text-sand/65">{card.description}</p>
              </article>
            )
          })}
        </section>

        <section className="mt-8 rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <TrendingUp className="h-4 w-4" aria-hidden="true" />
                Current pathway
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                Start with AI Fundamentals.
              </h2>

              <p className="mt-4 max-w-3xl text-base leading-8 text-sand/65">
                The first Academy route builds the operating base for everything that follows:
                model behaviour, safe-use boundaries, prompt foundations, tool judgement, and
                beginner sandbox practice.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-[#EAF7FF] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                    Lesson 1
                  </p>
                  <p className="mt-2 text-sm font-bold text-sand">AI Operating Base</p>
                </div>

                <div className="rounded-2xl bg-[#EAF7FF] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                    Modules
                  </p>
                  <p className="mt-2 text-sm font-bold text-sand">4 planned steps</p>
                </div>

                <div className="rounded-2xl bg-[#EAF7FF] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                    Status
                  </p>
                  <p className="mt-2 text-sm font-bold text-sand">Ready to start</p>
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/academy/path/fundamentals"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                >
                  Open AI Fundamentals
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/sandbox"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-5 py-3 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                >
                  Open Sandbox
                  <Route className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-sand/10 bg-[#EAF7FF] p-5">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#123BFF] shadow-sm">
                  <BookOpenCheck className="h-5 w-5" aria-hidden="true" />
                </span>

                <h3 className="text-lg font-bold text-sand">Lesson 1 structure</h3>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  'Module 1: What modern AI systems are and are not',
                  'Module 2: Safe-use boundaries before real workflows',
                  'Module 3: Prompt foundations and controlled instructions',
                  'Module 4: First output review and sandbox preparation',
                ].map((module) => (
                  <div key={module} className="flex items-start gap-3 rounded-2xl bg-white p-3">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#123BFF]"
                      aria-hidden="true"
                    />
                    <p className="text-sm leading-6 text-sand/70">{module}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8" aria-labelledby="academy-pathways-title">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
                Academy pathways
              </span>

              <h2
                id="academy-pathways-title"
                className="mt-4 text-3xl font-bold tracking-tight text-sand sm:text-4xl"
              >
                Your learning paths.
              </h2>
            </div>

            <Link
              href="/syllabus"
              className="inline-flex w-fit items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-5 py-3 text-sm font-bold text-[#123BFF] shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#0A63FF]"
            >
              View syllabus
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {pathwayCards.map((pathway) => {
              const Icon = pathway.icon

              return (
                <article
                  key={pathway.title}
                  className="flex h-full flex-col rounded-3xl border border-sand/10 bg-white/90 p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF] shadow-sm">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>

                    <span className="rounded-full bg-[#123BFF] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-sm">
                      {pathway.label}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold tracking-tight text-sand">
                    {pathway.title}
                  </h3>

                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                    {pathway.status}
                  </p>

                  <p className="mt-3 text-sm leading-7 text-sand/65">{pathway.description}</p>

                  <div className="mt-5 grid gap-3">
                    {pathway.points.map((point) => (
                      <div key={point} className="flex items-start gap-3 rounded-2xl bg-[#F7FBFF] p-3">
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#123BFF]"
                          aria-hidden="true"
                        />
                        <p className="text-sm leading-6 text-sand/70">{point}</p>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={pathway.href}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                  >
                    Open pathway
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              )
            })}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Progress and proof
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand">
                Build evidence of practical AI skill.
              </h2>

              <p className="mt-4 max-w-3xl text-base leading-8 text-sand/65">
                The dashboard is where lessons, sandbox practice, assessments, badges, and refreshed
                training will come together as the Academy becomes a full learning system.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/academy"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                >
                  View Academy
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/tool-intelligence"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-5 py-3 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                >
                  Tool Intelligence
                  <Radar className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              {proofItems.map((item) => {
                const Icon = item.icon

                return (
                  <article key={item.title} className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                          {item.status}
                        </p>
                        <h3 className="mt-2 text-lg font-bold text-sand">{item.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-sand/65">{item.description}</p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                <Target className="h-4 w-4" aria-hidden="true" />
                Next best action
              </span>

              <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                Start with the foundation route.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 sm:text-base">
                Open AI Fundamentals first, then move into sandbox practice once lesson progress and
                assessment records are connected.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/academy/path/fundamentals"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-[#123BFF] shadow-sm transition hover:bg-[#EAF7FF]"
              >
                Open AI Fundamentals
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-white/20"
              >
                Return home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}