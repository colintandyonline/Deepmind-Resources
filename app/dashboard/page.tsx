import type { ReactNode } from 'react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'

type LessonProgressRow = {
  status: string | null
  progress_percentage: number | null
  started_at: string | null
  completed_at: string | null
  last_seen_at: string | null
  refresher_recommended_at: string | null
  lesson_id: string | null
  lesson_version_id: string | null
}

type SandboxAttemptRow = {
  status: string | null
  submitted_at: string | null
  reviewed_at: string | null
  sandbox_task_id: string | null
  sandbox_task_version_id: string | null
}

type SubscriptionRow = {
  plan_key: string | null
  status: string | null
  current_period_end: string | null
  cancel_at_period_end: boolean | null
}

type EntitlementRow = {
  entitlement_key: string | null
  status: string | null
  ends_at: string | null
}

type DashboardMetric = {
  label: string
  value: string
  detail: string
  state: 'active' | 'empty' | 'ready' | 'locked'
}

type DashboardTask = {
  label: string
  status: string
  detail: string
}

type PathModule = {
  title: string
  status: string
  detail: string
}

const navItems = [
  { label: 'Overview', href: '#overview' },
  { label: 'Academy', href: '#academy' },
  { label: 'Sandbox', href: '#sandbox' },
  { label: 'Intelligence', href: '#intelligence' },
  { label: 'Awards', href: '#awards' },
  { label: 'Account', href: '#account' },
  { label: 'Settings', href: '#settings' },
  { label: 'Payments', href: '#payments' },
]

const academyPaths = [
  {
    title: 'AI Fundamentals',
    status: 'Active path',
    href: '/academy/path/fundamentals',
    detail: 'Start here. Core concepts, safe use, tool basics, and first sandbox proof.',
  },
  {
    title: 'Prompt Engineering',
    status: 'Next path',
    href: '/academy/path/prompting',
    detail: 'Structured prompting, constraints, examples, iteration, and output review.',
  },
  {
    title: 'Agent Architecture',
    status: 'Preview route',
    href: '/academy/path/agents',
    detail: 'Agent boundaries, tools, planning, handoffs, and review gates.',
  },
  {
    title: 'Multi-Agent Systems',
    status: 'Advanced route',
    href: '/academy/path/multi-agent-systems',
    detail: 'Specialist agents, coordination, validation, and operating controls.',
  },
]

const pathModules: PathModule[] = [
  {
    title: 'Module 1',
    status: 'Ready',
    detail: 'Modern AI systems',
  },
  {
    title: 'Module 2',
    status: 'Locked',
    detail: 'Safe-use boundaries',
  },
  {
    title: 'Module 3',
    status: 'Locked',
    detail: 'Prompt foundations',
  },
  {
    title: 'Module 4',
    status: 'Locked',
    detail: 'Output review',
  },
]

function getSupabaseKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

async function createSupabaseServerClient() {
  const cookieStore = await cookies()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = getSupabaseKey()

  if (!supabaseUrl || !supabaseKey) {
    return null
  }

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch {
          // Server components cannot always write cookies during render.
          // Auth middleware / server actions handle writable cookie contexts.
        }
      },
    },
  })
}

async function signOut() {
  'use server'

  const supabase = await createSupabaseServerClient()

  if (supabase) {
    await supabase.auth.signOut()
  }

  redirect('/auth/login')
}

function formatCount(count: number, singular: string, plural: string) {
  return `${count} ${count === 1 ? singular : plural}`
}

function getCompletedLessons(rows: LessonProgressRow[]) {
  return rows.filter((row) => row.status === 'completed' || row.completed_at).length
}

function getStartedLessons(rows: LessonProgressRow[]) {
  return rows.filter(
    (row) =>
      row.status === 'in_progress' ||
      row.started_at ||
      row.last_seen_at ||
      (row.progress_percentage ?? 0) > 0,
  ).length
}

function getAverageLessonProgress(rows: LessonProgressRow[]) {
  if (rows.length === 0) {
    return 0
  }

  const total = rows.reduce((sum, row) => sum + (row.progress_percentage ?? 0), 0)

  return Math.min(Math.round(total / rows.length), 100)
}

function getRefresherCount(rows: LessonProgressRow[]) {
  return rows.filter((row) => row.refresher_recommended_at).length
}

function getSubmittedSandboxAttempts(rows: SandboxAttemptRow[]) {
  return rows.filter(
    (row) =>
      row.status === 'submitted' ||
      row.status === 'reviewed' ||
      row.status === 'passed' ||
      row.submitted_at,
  ).length
}

function getReviewedSandboxAttempts(rows: SandboxAttemptRow[]) {
  return rows.filter((row) => row.status === 'reviewed' || row.status === 'passed' || row.reviewed_at)
    .length
}

function getProgressLabel(progressStorageAvailable: boolean, completedLessons: number, startedLessons: number) {
  if (!progressStorageAvailable) {
    return 'No saved records'
  }

  if (completedLessons > 0) {
    return 'In progress'
  }

  if (startedLessons > 0) {
    return 'Started'
  }

  return 'Not started'
}

function getBillingLabel(subscription: SubscriptionRow | null, activeEntitlements: EntitlementRow[]) {
  if (subscription?.plan_key) {
    return subscription.plan_key
  }

  if (activeEntitlements.length > 0) {
    return formatCount(activeEntitlements.length, 'active entitlement', 'active entitlements')
  }

  return 'No billing record'
}

function StatusBadge({ state, children }: { state: DashboardMetric['state']; children: ReactNode }) {
  const className =
    state === 'active'
      ? 'border-blue-200 bg-blue-600 text-white'
      : state === 'ready'
        ? 'border-blue-100 bg-blue-50 text-blue-700'
        : state === 'locked'
          ? 'border-slate-200 bg-slate-100 text-slate-500'
          : 'border-slate-200 bg-white text-slate-600'

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ${className}`}
    >
      {children}
    </span>
  )
}

function MetricCard({ metric }: { metric: DashboardMetric }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">{metric.label}</p>
        <StatusBadge state={metric.state}>{metric.state === 'empty' ? 'Empty' : metric.state}</StatusBadge>
      </div>
      <p className="mt-4 text-3xl font-black tracking-tight text-slate-950">{metric.value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{metric.detail}</p>
    </article>
  )
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">{eyebrow}</p>
        <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">{title}</h2>
      </div>
      <p className="max-w-xl text-sm leading-6 text-slate-600">{description}</p>
    </div>
  )
}

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient()

  if (!supabase) {
    redirect('/auth/login')
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const [
    { data: lessonRows, error: lessonError },
    { data: sandboxRows, error: sandboxError },
    { data: subscriptionRows, error: subscriptionError },
    { data: entitlementRows, error: entitlementError },
  ] = await Promise.all([
    supabase
      .from('user_lesson_progress')
      .select(
        'status, progress_percentage, started_at, completed_at, last_seen_at, refresher_recommended_at, lesson_id, lesson_version_id',
      )
      .eq('user_id', user.id),
    supabase
      .from('sandbox_attempts')
      .select('status, submitted_at, reviewed_at, sandbox_task_id, sandbox_task_version_id')
      .eq('user_id', user.id),
    supabase
      .from('subscriptions')
      .select('plan_key, status, current_period_end, cancel_at_period_end')
      .eq('user_id', user.id)
      .is('organisation_id', null)
      .order('created_at', { ascending: false })
      .limit(1),
    supabase
      .from('entitlements')
      .select('entitlement_key, status, ends_at')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .order('created_at', { ascending: false }),
  ])

  const lessonProgressRows = (lessonRows ?? []) as LessonProgressRow[]
  const sandboxAttemptRows = (sandboxRows ?? []) as SandboxAttemptRow[]
  const personalSubscriptions = (subscriptionRows ?? []) as SubscriptionRow[]
  const activeEntitlements = (entitlementRows ?? []) as EntitlementRow[]

  const progressStorageAvailable = !lessonError && !sandboxError
  const billingStorageAvailable = !subscriptionError && !entitlementError

  const completedLessons = getCompletedLessons(lessonProgressRows)
  const startedLessons = getStartedLessons(lessonProgressRows)
  const trackedLessons = lessonProgressRows.length
  const averageLessonProgress = getAverageLessonProgress(lessonProgressRows)
  const refresherCount = getRefresherCount(lessonProgressRows)

  const submittedSandboxAttempts = getSubmittedSandboxAttempts(sandboxAttemptRows)
  const reviewedSandboxAttempts = getReviewedSandboxAttempts(sandboxAttemptRows)
  const latestSubscription = personalSubscriptions[0] ?? null

  const progressLabel = getProgressLabel(progressStorageAvailable, completedLessons, startedLessons)
  const billingLabel = billingStorageAvailable
    ? getBillingLabel(latestSubscription, activeEntitlements)
    : 'Billing unavailable'

  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0] ||
    'Learner'

  const metrics: DashboardMetric[] = [
    {
      label: 'Path progress',
      value: `${averageLessonProgress}%`,
      detail:
        trackedLessons === 0
          ? 'No saved lesson progress records found yet.'
          : `Average progress across ${formatCount(trackedLessons, 'saved lesson record', 'saved lesson records')}.`,
      state: averageLessonProgress > 0 ? 'active' : 'empty',
    },
    {
      label: 'Lessons completed',
      value: String(completedLessons),
      detail:
        completedLessons === 0
          ? 'No versioned lesson completion has been saved yet.'
          : `${formatCount(completedLessons, 'lesson completion', 'lesson completions')} saved.`,
      state: completedLessons > 0 ? 'active' : 'empty',
    },
    {
      label: 'Sandbox evidence',
      value: String(submittedSandboxAttempts),
      detail:
        submittedSandboxAttempts === 0
          ? 'No sandbox task evidence submitted yet.'
          : `${formatCount(reviewedSandboxAttempts, 'reviewed sandbox attempt', 'reviewed sandbox attempts')}.`,
      state: submittedSandboxAttempts > 0 ? 'active' : 'empty',
    },
    {
      label: 'Refreshers',
      value: String(refresherCount),
      detail:
        refresherCount === 0
          ? 'No saved lesson is currently marked for refresh.'
          : `${formatCount(refresherCount, 'saved lesson needs', 'saved lessons need')} a refresher.`,
      state: refresherCount > 0 ? 'active' : 'empty',
    },
  ]

  const dashboardTasks: DashboardTask[] = [
    {
      label: 'Current pathway',
      status: 'AI Fundamentals',
      detail: 'Default starting path for the individual Academy workspace.',
    },
    {
      label: 'Next lesson',
      status: 'AI Operating Base',
      detail: 'Recommended first lesson in AI Fundamentals.',
    },
    {
      label: 'Progress state',
      status: progressLabel,
      detail: progressStorageAvailable
        ? 'Progress is read from saved lesson and sandbox records.'
        : 'Progress records could not be read for this session.',
    },
    {
      label: 'Account access',
      status: billingLabel,
      detail: billingStorageAvailable
        ? 'Personal subscription and entitlement records checked.'
        : 'Billing records could not be read for this session.',
    },
  ]

  return (
    <main className="min-h-screen bg-[#eef7ff] text-slate-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
        <header className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
                Personal dashboard
              </p>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end">
                <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  {displayName}&apos;s learning dashboard
                </h1>
                <span className="mb-1 inline-flex w-fit rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  Individual Academy workspace
                </span>
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                A compact record of your pathway, lesson progress, sandbox evidence, refresher status, account access,
                and next action.
              </p>
            </div>

            <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm sm:min-w-72">
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold text-slate-500">Signed in</span>
                <span className="truncate font-bold text-slate-950">{user.email ?? 'Account verified'}</span>
              </div>
              <form action={signOut}>
                <button
                  type="submit"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>

          <nav className="mt-5 flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 p-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-xl px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-slate-600 transition hover:bg-white hover:text-blue-700"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </header>

        <section id="overview" className="grid gap-5 lg:grid-cols-[1.45fr_0.85fr]">
          <div className="space-y-5">
            <section className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm sm:p-5">
              <SectionHeader
                eyebrow="Overview"
                title="Progress report"
                description="Current personal learning status from saved lesson and sandbox records."
              />

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map((metric) => (
                  <MetricCard key={metric.label} metric={metric} />
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm sm:p-5">
              <SectionHeader
                eyebrow="Continue"
                title="Next learning action"
                description="Your dashboard should make the next action obvious before anything else."
              />

              <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <StatusBadge state="ready">Ready</StatusBadge>
                  <h3 className="mt-4 text-2xl font-black tracking-tight text-slate-950">
                    Start Lesson 1: AI Operating Base
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Begin with the operating base for modern AI systems, safe-use boundaries, prompt foundations, and
                    output review.
                  </p>

                  <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                    <Link
                      href="/academy/path/fundamentals"
                      className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-black text-white shadow-sm transition hover:bg-blue-700"
                    >
                      Open AI Fundamentals
                    </Link>
                    <a
                      href="#sandbox"
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
                    >
                      View sandbox evidence
                    </a>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {pathModules.map((module) => (
                    <article key={module.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                          {module.title}
                        </p>
                        <StatusBadge state={module.status === 'Ready' ? 'ready' : 'locked'}>
                          {module.status}
                        </StatusBadge>
                      </div>
                      <p className="mt-3 text-sm font-bold text-slate-950">{module.detail}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <aside className="rounded-3xl border border-blue-700 bg-blue-600 p-4 text-white shadow-sm sm:p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-100">Training record</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight">Individual record summary</h2>
            <p className="mt-3 text-sm leading-6 text-blue-50">
              This panel reports this account&apos;s individual learning state, access state, and next action.
            </p>

            <div className="mt-5 space-y-3">
              {dashboardTasks.map((task) => (
                <article key={task.label} className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-100">{task.label}</p>
                  <p className="mt-2 text-lg font-black text-white">{task.status}</p>
                  <p className="mt-1 text-sm leading-6 text-blue-50">{task.detail}</p>
                </article>
              ))}
            </div>
          </aside>
        </section>

        <section id="academy" className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm sm:p-5">
          <SectionHeader
            eyebrow="Academy"
            title="Personal pathway map"
            description="Only your personal Academy paths are shown here."
          />

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {academyPaths.map((path) => (
              <article key={path.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <StatusBadge state={path.status === 'Active path' ? 'active' : 'ready'}>{path.status}</StatusBadge>
                <h3 className="mt-4 text-lg font-black text-slate-950">{path.title}</h3>
                <p className="mt-2 min-h-20 text-sm leading-6 text-slate-600">{path.detail}</p>
                <Link
                  href={path.href}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-black text-white transition hover:bg-blue-700"
                >
                  Open pathway
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm sm:p-5">
            <SectionHeader
              eyebrow="Progress"
              title="Skill evidence"
              description="Progress is based on saved lesson records and sandbox submissions, not page views."
            />

            <div className="space-y-3">
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-black text-slate-950">Academy lessons</p>
                  <StatusBadge state={completedLessons > 0 ? 'active' : 'empty'}>
                    {completedLessons > 0 ? 'Recorded' : 'Not started'}
                  </StatusBadge>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {completedLessons === 0
                    ? 'No versioned lesson completion has been saved yet.'
                    : `${formatCount(completedLessons, 'lesson completion', 'lesson completions')} saved.`}
                </p>
              </article>

              <article id="sandbox" className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-black text-slate-950">Sandbox submissions</p>
                  <StatusBadge state={submittedSandboxAttempts > 0 ? 'active' : 'empty'}>
                    {submittedSandboxAttempts > 0 ? 'Submitted' : 'None submitted'}
                  </StatusBadge>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {submittedSandboxAttempts === 0
                    ? 'No practical task evidence has been submitted yet.'
                    : `${formatCount(submittedSandboxAttempts, 'sandbox attempt', 'sandbox attempts')} submitted.`}
                </p>
              </article>

              <article id="awards" className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-black text-slate-950">Awards</p>
                  <StatusBadge state="empty">Not earned</StatusBadge>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Verified skill awards will show here after the required lesson, sandbox, and review evidence exists.
                </p>
              </article>
            </div>
          </section>

          <section id="intelligence" className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm sm:p-5">
            <SectionHeader
              eyebrow="Intelligence"
              title="Refresh and review status"
              description="This keeps the dashboard focused on whether any saved learning record needs another pass."
            />

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-[0.16em] text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-black">Area</th>
                    <th className="px-4 py-3 font-black">Status</th>
                    <th className="px-4 py-3 font-black">Meaning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  <tr>
                    <td className="px-4 py-4 font-bold text-slate-950">AI Fundamentals</td>
                    <td className="px-4 py-4 text-slate-700">
                      {refresherCount > 0 ? 'Refresher recommended' : 'No action required'}
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {refresherCount > 0
                        ? `${formatCount(refresherCount, 'saved lesson is', 'saved lessons are')} marked for refresh.`
                        : 'No saved lesson is currently marked for refresh.'}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 font-bold text-slate-950">Sandbox practice</td>
                    <td className="px-4 py-4 text-slate-700">
                      {submittedSandboxAttempts > 0 ? 'Evidence submitted' : 'Available'}
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {submittedSandboxAttempts > 0
                        ? `${formatCount(reviewedSandboxAttempts, 'attempt has', 'attempts have')} been reviewed.`
                        : 'No evidence has been submitted yet.'}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 font-bold text-slate-950">Skill trace</td>
                    <td className="px-4 py-4 text-slate-700">Not earned</td>
                    <td className="px-4 py-4 text-slate-600">No verified skill proof is attached to this account.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          <section id="account" className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm sm:p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">Account</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">Personal access</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="font-bold text-slate-500">Email</p>
                <p className="mt-1 break-words font-black text-slate-950">{user.email ?? 'Verified account'}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="font-bold text-slate-500">Access state</p>
                <p className="mt-1 font-black text-slate-950">{billingLabel}</p>
              </div>
            </div>
          </section>

          <section id="settings" className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm sm:p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">Settings</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">Preferences</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="font-bold text-slate-500">Profile preferences</p>
                <p className="mt-1 text-slate-600">No preference changes saved in this dashboard view.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="font-bold text-slate-500">Notifications</p>
                <p className="mt-1 text-slate-600">
                  {refresherCount > 0 ? 'One or more saved lessons need review.' : 'No refresher notifications are active.'}
                </p>
              </div>
            </div>
          </section>

          <section id="payments" className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm sm:p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">Payments</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">Billing status</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="font-bold text-slate-500">Plan record</p>
                <p className="mt-1 font-black text-slate-950">{billingLabel}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="font-bold text-slate-500">Payment action</p>
                <p className="mt-1 text-slate-600">
                  {latestSubscription?.cancel_at_period_end
                    ? 'Subscription is marked to cancel at period end.'
                    : 'No payment action is required.'}
                </p>
              </div>
            </div>
          </section>
        </section>

        <footer className="flex flex-col gap-3 rounded-3xl border border-blue-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <p className="text-sm font-semibold text-slate-600">
            Next action: start the first AI Fundamentals lesson and create your first sandbox evidence record.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href="/academy/path/fundamentals"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-black text-white transition hover:bg-blue-700"
            >
              Open AI Fundamentals
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
            >
              Return home
            </Link>
          </div>
        </footer>
      </div>
    </main>
  )
}
