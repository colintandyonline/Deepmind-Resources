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
  UsersRound,
  Workflow,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

type DashboardStat = {
  label: string
  value: string
  description: string
  icon: LucideIcon
}

type DashboardTab = {
  label: string
  status: string
  active?: boolean
}

type PathwayStatus = {
  title: string
  label: string
  status: string
  progress: string
  href: string
  icon: LucideIcon
  locked?: boolean
}

type WorkspacePanel = {
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

const dashboardTabs: DashboardTab[] = [
  {
    label: 'Overview',
    status: 'Active',
    active: true,
  },
  {
    label: 'Academy',
    status: 'Prepared',
  },
  {
    label: 'Sandbox',
    status: 'Prepared',
  },
  {
    label: 'Intelligence',
    status: 'Prepared',
  },
  {
    label: 'Awards',
    status: 'Prepared',
  },
  {
    label: 'Business',
    status: 'Workspace-ready',
  },
]

const progressStats: DashboardStat[] = [
  {
    label: 'Academy progress',
    value: '0%',
    description: 'No pathway progress recorded yet.',
    icon: GraduationCap,
  },
  {
    label: 'Lessons completed',
    value: '0',
    description: 'Lesson completion records will appear here.',
    icon: BookOpenCheck,
  },
  {
    label: 'Sandbox tasks',
    value: '0',
    description: 'No sandbox evidence submitted yet.',
    icon: Code2,
  },
  {
    label: 'Awards earned',
    value: '0',
    description: 'Badges unlock after lesson and task completion.',
    icon: Award,
  },
]

const pathwayStatuses: PathwayStatus[] = [
  {
    title: 'AI Fundamentals',
    label: 'Foundation',
    status: 'Ready to start',
    progress: '0 / 4 modules',
    href: '/academy/path/fundamentals',
    icon: Brain,
  },
  {
    title: 'Prompt Engineering',
    label: 'Core execution',
    status: 'Next after foundations',
    progress: 'Locked',
    href: '/academy/path/prompting',
    icon: Sparkles,
    locked: true,
  },
  {
    title: 'Agent Architecture',
    label: 'Builder path',
    status: 'Build after prompting',
    progress: 'Locked',
    href: '/academy/path/agents',
    icon: Workflow,
    locked: true,
  },
  {
    title: 'Multi-Agent Systems',
    label: 'Advanced builder',
    status: 'Advanced route',
    progress: 'Locked',
    href: '/academy/path/multi-agent-systems',
    icon: Layers3,
    locked: true,
  },
]

const workspacePanels: WorkspacePanel[] = [
  {
    title: 'Sandbox status',
    status: 'Not started',
    description:
      'Sandbox evidence will show practical work: prompt control, workflow judgement, validation checks, and tool-choice tasks.',
    icon: Route,
  },
  {
    title: 'AI update alerts',
    status: 'No refreshers pending',
    description:
      'When a lesson or tool recommendation changes, refresher alerts will appear here before old guidance becomes stale.',
    icon: Bell,
  },
  {
    title: 'Assessment status',
    status: 'Locked until lesson progress',
    description:
      'Knowledge checks and practical assessments unlock after the relevant lesson modules are available and completed.',
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
                  Individual workspace
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl lg:text-5xl">
                {displayName ? `${displayName}'s AI workspace` : 'Your AI workspace'}
              </h1>

              <p className="mt-4 max-w-3xl text-base leading-8 text-sand/65">
                This is your operating dashboard for Academy progress, current lesson status,
                sandbox evidence, AI update alerts, awards, and future business workspace access.
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
              {dashboardTabs.map((tab) => (
                <div
                  key={tab.label}
                  className={`rounded-2xl px-4 py-3 ${
                    tab.active ? 'bg-[#123BFF] text-white shadow-sm' : 'bg-white text-sand shadow-sm'
                  }`}
                >
                  <p className="text-sm font-bold">{tab.label}</p>
                  <p
                    className={`mt-1 text-[10px] font-bold uppercase tracking-[0.14em] ${
                      tab.active ? 'text-white/70' : 'text-[#123BFF]'
                    }`}
                  >
                    {tab.status}
                  </p>
                </div>
              ))}
            </div>
          </nav>
        </header>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
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
                Ready to start
              </span>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-4">
              {[
                'Modern AI systems',
                'Safe-use boundaries',
                'Prompt foundations',
                'Output review',
              ].map((module, index) => (
                <div key={module} className="rounded-2xl border border-sand/10 bg-[#F8FCFF] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                    Module {index + 1}
                  </p>
                  <p className="mt-2 text-sm font-bold leading-6 text-sand">{module}</p>
                  <p className="mt-3 text-xs font-semibold text-sand/45">Not started</p>
                </div>
              ))}
            </div>

            <div className="mt-7">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-bold text-sand">Lesson progress</p>
                <p className="text-sm font-bold text-[#123BFF]">0%</p>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-sand/10">
                <div className="h-full w-0 rounded-full bg-[#123BFF]" />
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
          </article>

          <aside className="grid gap-6">
            <div className="rounded-3xl border border-sand/10 bg-[#123BFF] p-6 text-white shadow-sm sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                <TrendingUp className="h-4 w-4" aria-hidden="true" />
                Workspace state
              </span>

              <h2 className="mt-5 text-2xl font-bold tracking-tight">
                Personal learning mode is active.
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/80">
                Company workspaces will use the same account foundation, but with staff onboarding,
                assignments, team progress, sandbox review, and business reporting.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  'Individual workspace active',
                  'Business workspace not connected',
                  'Progress records pending lesson system',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/10 p-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" aria-hidden="true" />
                    <p className="text-sm font-semibold leading-6 text-white/90">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF] shadow-sm">
                  <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
                </span>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                    Business workspace
                  </p>
                  <h3 className="text-lg font-bold text-sand">Prepared for company accounts</h3>
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-sand/65">
                Company dashboards need staff invites, roles, assigned training, manager visibility,
                sandbox reviews, and retraining alerts. This overview is now structured to support
                that split.
              </p>

              <Link
                href="/business-ai-training"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#EAF7FF] px-5 py-3 text-sm font-bold text-[#123BFF] shadow-sm transition hover:bg-[#DDF2FF]"
              >
                View business training
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {progressStats.map((stat) => {
            const Icon = stat.icon

            return (
              <article key={stat.label} className="rounded-3xl border border-sand/10 bg-white/90 p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>

                  <p className="text-3xl font-bold tracking-tight text-sand">{stat.value}</p>
                </div>

                <h3 className="mt-4 text-base font-bold text-sand">{stat.label}</h3>
                <p className="mt-2 text-sm leading-6 text-sand/60">{stat.description}</p>
              </article>
            )
          })}
        </section>

        <section id="academy" className="mt-8" aria-labelledby="academy-status-title">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
                Academy status
              </span>

              <h2
                id="academy-status-title"
                className="mt-4 text-3xl font-bold tracking-tight text-sand sm:text-4xl"
              >
                Pathways at a glance.
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
            {pathwayStatuses.map((pathway) => {
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

                    <span
                      className={`rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] shadow-sm ${
                        pathway.locked ? 'bg-[#F1F5F9] text-sand/55' : 'bg-[#123BFF] text-white'
                      }`}
                    >
                      {pathway.label}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold tracking-tight text-sand">
                    {pathway.title}
                  </h3>

                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                    {pathway.status}
                  </p>

                  <div className="mt-5 rounded-2xl bg-[#F7FBFF] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-bold text-sand">Progress</p>
                      <p className="text-sm font-bold text-[#123BFF]">{pathway.progress}</p>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-sand/10">
                      <div className="h-full w-0 rounded-full bg-[#123BFF]" />
                    </div>
                  </div>

                  <Link
                    href={pathway.href}
                    className={`mt-6 inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold shadow-sm transition ${
                      pathway.locked
                        ? 'border border-sand/10 bg-white text-sand hover:border-[#123BFF]/30 hover:text-[#123BFF]'
                        : 'bg-[#123BFF] text-white hover:bg-[#0A63FF]'
                    }`}
                  >
                    {pathway.locked ? 'Preview pathway' : 'Start pathway'}
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
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Operational overview
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand">
              Dashboard areas are now separated.
            </h2>

            <p className="mt-4 text-base leading-8 text-sand/65">
              Overview stays focused on the next action, progress, alerts, and workspace state.
              Academy, Sandbox, Intelligence, Awards, and Business can now become proper dashboard
              sections instead of being mixed into one long information page.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                'Overview: next action and account state',
                'Academy: pathways, lessons, and modules',
                'Sandbox: assigned practice and evidence',
                'Business: staff, roles, invites, and reports',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-[#EAF7FF] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#123BFF]" aria-hidden="true" />
                  <p className="text-sm font-semibold leading-6 text-sand/75">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {workspacePanels.map((panel) => {
              const Icon = panel.icon

              return (
                <article key={panel.title} className="rounded-3xl border border-sand/10 bg-white/90 p-5 shadow-sm">
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

        <section className="mt-8 rounded-3xl bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                <UsersRound className="h-4 w-4" aria-hidden="true" />
                Next build direction
              </span>

              <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                Build individual and business workspaces from the same dashboard foundation.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 sm:text-base">
                The next layer should define workspace roles, staff onboarding, company invites,
                assigned training, team progress, and manager review without disrupting the
                individual learner experience.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/academy/path/fundamentals"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-[#123BFF] shadow-sm transition hover:bg-[#EAF7FF]"
              >
                Start AI Fundamentals
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                href="/business-ai-training"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-white/20"
              >
                Business training
                <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}