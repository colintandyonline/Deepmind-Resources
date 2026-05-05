import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Bell,
  BookOpenCheck,
  Brain,
  CheckCircle2,
  Code2,
  CreditCard,
  GraduationCap,
  Layers3,
  LockKeyhole,
  Radar,
  Route,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
  Workflow,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

type DashboardTab = {
  label: string
  href: string
}

type ProgressCard = {
  label: string
  value: string
  description: string
  icon: LucideIcon
}

type ModuleStep = {
  label: string
  title: string
  status: string
}

type PathwayCard = {
  title: string
  label: string
  status: string
  href: string
  icon: LucideIcon
}

type StatusPanel = {
  title: string
  status: string
  description: string
  icon: LucideIcon
}

type AccountPanel = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  details: string[]
}

async function signOut() {
  'use server'

  const supabase = await createClient()
  await supabase.auth.signOut()

  redirect('/')
}

const dashboardTabs: DashboardTab[] = [
  { label: 'Overview', href: '#overview' },
  { label: 'Academy', href: '#academy' },
  { label: 'Sandbox', href: '#sandbox' },
  { label: 'Intelligence', href: '#intelligence' },
  { label: 'Awards', href: '#awards' },
  { label: 'Account', href: '#account' },
  { label: 'Settings', href: '#settings' },
  { label: 'Payments', href: '#payments' },
]

const progressCards: ProgressCard[] = [
  {
    label: 'Current pathway',
    value: 'AI Fundamentals',
    description: 'Recommended starting point for your personal Academy record.',
    icon: GraduationCap,
  },
  {
    label: 'Current lesson',
    value: 'AI Operating Base',
    description: 'First lesson route for building safe, practical AI judgement.',
    icon: BookOpenCheck,
  },
  {
    label: 'Sandbox evidence',
    value: 'None submitted',
    description: 'Practical task evidence appears after sandbox work is submitted.',
    icon: Code2,
  },
  {
    label: 'Award status',
    value: 'Not earned',
    description: 'Awards unlock through completed lessons, checks, and sandbox tasks.',
    icon: Award,
  },
]

const moduleSteps: ModuleStep[] = [
  {
    label: 'Module 1',
    title: 'Modern AI systems',
    status: 'Ready',
  },
  {
    label: 'Module 2',
    title: 'Safe-use boundaries',
    status: 'After module 1',
  },
  {
    label: 'Module 3',
    title: 'Prompt foundations',
    status: 'After module 2',
  },
  {
    label: 'Module 4',
    title: 'Output review',
    status: 'After module 3',
  },
]

const pathwayCards: PathwayCard[] = [
  {
    title: 'AI Fundamentals',
    label: 'Foundation',
    status: 'Start here',
    href: '/academy/path/fundamentals',
    icon: Brain,
  },
  {
    title: 'Prompt Engineering',
    label: 'Core execution',
    status: 'Next route',
    href: '/academy/path/prompting',
    icon: Sparkles,
  },
  {
    title: 'Agent Architecture',
    label: 'Builder route',
    status: 'Preview route',
    href: '/academy/path/agents',
    icon: Workflow,
  },
  {
    title: 'Multi-Agent Systems',
    label: 'Advanced route',
    status: 'Preview route',
    href: '/academy/path/multi-agent-systems',
    icon: Layers3,
  },
]

const statusPanels: StatusPanel[] = [
  {
    title: 'Sandbox practice',
    status: 'Ready for first task',
    description:
      'Use sandbox exercises to prove prompt control, workflow judgement, validation, and tool-selection skill.',
    icon: Route,
  },
  {
    title: 'AI update refreshers',
    status: 'No action required',
    description:
      'Important AI changes that affect your learning route appear here as refresher actions.',
    icon: Bell,
  },
  {
    title: 'Assessment access',
    status: 'Linked to lesson progress',
    description:
      'Knowledge checks and practical reviews belong to the lesson route they assess.',
    icon: LockKeyhole,
  },
]

const accountPanels: AccountPanel[] = [
  {
    id: 'account',
    title: 'Account',
    description:
      'Your personal learner account is the identity used for Academy progress, sandbox evidence, and awards.',
    icon: UserRound,
    details: ['Personal learner profile', 'Secure sign-in access', 'Workspace identity'],
  },
  {
    id: 'settings',
    title: 'Settings',
    description:
      'Manage personal workspace preferences, notifications, privacy choices, and learning controls.',
    icon: Settings,
    details: ['Profile preferences', 'Notification controls', 'Privacy settings'],
  },
  {
    id: 'payments',
    title: 'Payments',
    description:
      'Review personal plan access, billing controls, receipts, and subscription details from your account area.',
    icon: CreditCard,
    details: ['Plan access', 'Billing controls', 'Receipts'],
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

  const emailAddress = typeof user.email === 'string' ? user.email : 'Signed-in account'

  return (
    <main className="min-h-screen bg-obsidian px-4 py-8 text-sand sm:px-6 lg:px-8">
      <div id="overview" className="mx-auto w-full max-w-7xl">
        <header className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <Brain className="h-4 w-4" aria-hidden="true" />
                  Personal dashboard
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF7FF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Individual Academy workspace
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl lg:text-5xl">
                {displayName ? `${displayName}'s AI learning dashboard` : 'Your AI learning dashboard'}
              </h1>

              <p className="mt-4 max-w-3xl text-base leading-8 text-sand/65">
                Track your Academy route, continue the next lesson, practise in the Sandbox, review
                AI update actions, and manage your personal learning account.
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

          <nav className="mt-8 overflow-x-auto rounded-2xl border border-sand/10 bg-[#F7FBFF] p-2">
            <div className="flex min-w-max gap-2">
              {dashboardTabs.map((tab, index) => (
                <a
                  key={tab.label}
                  href={tab.href}
                  className={`rounded-2xl px-4 py-3 text-sm font-bold shadow-sm transition ${
                    index === 0
                      ? 'bg-[#123BFF] text-white'
                      : 'bg-white text-sand hover:text-[#123BFF]'
                  }`}
                >
                  {tab.label}
                </a>
              ))}
            </div>
          </nav>

          <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Personal progress snapshot">
            {progressCards.map((card) => {
              const Icon = card.icon

              return (
                <article
                  key={card.label}
                  className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>

                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                    {card.label}
                  </p>
                  <h2 className="mt-2 text-xl font-bold tracking-tight text-sand">{card.value}</h2>
                  <p className="mt-2 text-sm leading-6 text-sand/60">{card.description}</p>
                </article>
              )
            })}
          </section>
        </header>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <article className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <Target className="h-4 w-4" aria-hidden="true" />
                  Continue learning
                </span>

                <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                  Start Lesson 1: AI Operating Base.
                </h2>

                <p className="mt-4 max-w-3xl text-base leading-8 text-sand/65">
                  Begin with AI Fundamentals. This first route builds the judgement layer for model
                  behaviour, safe-use boundaries, controlled instructions, and first sandbox checks.
                </p>
              </div>

              <span className="w-fit rounded-2xl bg-[#EAF7FF] px-4 py-3 text-sm font-bold text-[#123BFF]">
                Ready
              </span>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-4">
              {moduleSteps.map((module) => (
                <div key={module.label} className="rounded-2xl border border-sand/10 bg-[#F8FCFF] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                    {module.label}
                  </p>
                  <p className="mt-2 text-sm font-bold leading-6 text-sand">{module.title}</p>
                  <p className="mt-3 text-xs font-semibold text-sand/45">{module.status}</p>
                </div>
              ))}
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
          </article>

          <aside className="rounded-3xl border border-sand/10 bg-[#123BFF] p-6 text-white shadow-sm sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Personal workspace
            </span>

            <h2 className="mt-5 text-2xl font-bold tracking-tight">
              Your individual training record starts here.
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/80">
              Lessons, sandbox practice, assessments, awards, and refresher actions are organised
              around your personal learning account.
            </p>

            <div className="mt-6 grid gap-3">
              {[
                'Academy route selected',
                'Sandbox practice available',
                'Account access verified',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/10 p-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" aria-hidden="true" />
                  <p className="text-sm font-semibold leading-6 text-white/90">{item}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section id="academy" className="mt-8" aria-labelledby="academy-status-title">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
                Academy
              </span>

              <h2
                id="academy-status-title"
                className="mt-4 text-3xl font-bold tracking-tight text-sand sm:text-4xl"
              >
                Personal pathway map.
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

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              Personal progress
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand">
              Progress, practice, and proof.
            </h2>

            <p className="mt-4 text-base leading-8 text-sand/65">
              Your dashboard separates learning from evidence. Academy pathways explain the skill,
              Sandbox tasks prove the skill, and awards mark completed progress.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                'Academy: lessons and module sequence',
                'Sandbox: practical task evidence',
                'Intelligence: update refreshers',
                'Awards: completed skill proof',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-[#EAF7FF] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#123BFF]" aria-hidden="true" />
                  <p className="text-sm font-semibold leading-6 text-sand/75">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {statusPanels.map((panel) => {
              const Icon = panel.icon
              const sectionId =
                panel.title === 'Sandbox practice'
                  ? 'sandbox'
                  : panel.title === 'AI update refreshers'
                    ? 'intelligence'
                    : 'awards'

              return (
                <article
                  key={panel.title}
                  id={sectionId}
                  className="rounded-3xl border border-sand/10 bg-white/90 p-5 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                        {panel.status}
                      </p>
                      <h3 className="mt-2 text-lg font-bold text-sand">{panel.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-sand/65">{panel.description}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          {accountPanels.map((panel) => {
            const Icon = panel.icon

            return (
              <article
                key={panel.id}
                id={panel.id}
                className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-7"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF] shadow-sm">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>

                <h2 className="mt-5 text-2xl font-bold tracking-tight text-sand">{panel.title}</h2>

                <p className="mt-3 text-sm leading-7 text-sand/65">{panel.description}</p>

                {panel.id === 'account' ? (
                  <div className="mt-5 rounded-2xl bg-[#F7FBFF] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                      Signed in as
                    </p>
                    <p className="mt-2 break-words text-sm font-bold text-sand">{emailAddress}</p>
                  </div>
                ) : null}

                <div className="mt-5 grid gap-3">
                  {panel.details.map((detail) => (
                    <div key={detail} className="flex items-start gap-3 rounded-2xl bg-[#F7FBFF] p-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#123BFF]" aria-hidden="true" />
                      <p className="text-sm leading-6 text-sand/70">{detail}</p>
                    </div>
                  ))}
                </div>
              </article>
            )
          })}
        </section>

        <section className="mt-8 rounded-3xl bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                <Radar className="h-4 w-4" aria-hidden="true" />
                Next action
              </span>

              <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                Begin with AI Fundamentals.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 sm:text-base">
                Start the foundation route, then move into sandbox practice when you are ready to
                test the skill with a practical task.
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
                className="inline-flex items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-white/20"
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