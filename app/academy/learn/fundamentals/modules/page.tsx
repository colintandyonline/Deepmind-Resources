import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import {
  ArrowLeft,
  BadgeCheck,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  FileQuestion,
  Code2,
  GraduationCap,
  Grid3X3,
  Layers3,
  LockKeyhole,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from 'lucide-react'
import { aiFundamentalsLearningPath } from '@/lib/academy/fundamentals'

export const metadata: Metadata = {
  title: 'AI Fundamentals Beginner Course | DeepMind Resources Academy',
  description:
    'A focused beginner Academy course for building AI fundamentals, safe-use judgement, prompt basics, tool selection, validation habits, sandbox practice, and final skill evidence.',
  alternates: {
    canonical: 'https://deepmindresources.pro/academy/learn/fundamentals/modules',
  },
  openGraph: {
    title: 'AI Fundamentals Beginner Course | DeepMind Resources Academy',
    description:
      'Build AI fundamentals from the ground up with beginner modules, safe-use judgement, prompt basics, tool awareness, validation habits, and sandbox practice.',
    url: 'https://deepmindresources.pro/academy/learn/fundamentals/modules',
    siteName: 'DeepMind Resources',
    type: 'website',
  },
}

type ProgressSummary = {
  lessonRecords: number
  completedLessons: number
  submittedSandboxAttempts: number
  reviewedSandboxAttempts: number
}

type LessonProgressRow = {
  status: string | null
  completed_at: string | null
}

type SandboxAttemptRow = {
  status: string | null
  submitted_at: string | null
  reviewed_at: string | null
}

type Module = (typeof aiFundamentalsLearningPath.modules)[number]

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
        }
      },
    },
  })
}

function getCompletedLessonCount(rows: LessonProgressRow[]) {
  return rows.filter((row) => row.status === 'completed' || row.completed_at).length
}

function getSubmittedSandboxCount(rows: SandboxAttemptRow[]) {
  return rows.filter((row) => row.status === 'submitted' || row.submitted_at).length
}

function getReviewedSandboxCount(rows: SandboxAttemptRow[]) {
  return rows.filter((row) => row.status === 'reviewed' || row.status === 'passed' || row.reviewed_at).length
}

function formatRequirement(requirement: string) {
  if (requirement === 'none') {
    return 'No task'
  }

  if (requirement === 'optional') {
    return 'Optional practice'
  }

  if (requirement === 'final_required') {
    return 'Final evidence'
  }

  return 'Required evidence'
}

function formatSensitivity(sensitivity: string) {
  return `${sensitivity.charAt(0).toUpperCase()}${sensitivity.slice(1)}`
}

function IconShell({ children, solid = false }: { children: ReactNode; solid?: boolean }) {
  return (
    <span
      className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-sm ${
        solid
          ? 'bg-white text-blue-700'
          : 'border border-blue-100 bg-gradient-to-br from-blue-600 to-blue-500 text-white'
      }`}
    >
      {children}
    </span>
  )
}

function ProgressCard({
  label,
  value,
  icon,
}: {
  label: string
  value: string | number
  icon: ReactNode
}) {
  return (
    <article className="rounded-3xl border border-blue-100 bg-white/90 p-4 shadow-sm shadow-blue-900/5">
      <div className="flex items-center gap-3">
        <IconShell>{icon}</IconShell>
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">{label}</p>
          <p className="mt-1 text-3xl font-black tracking-tight text-slate-950">{value}</p>
        </div>
      </div>
    </article>
  )
}

function MethodStep({
  icon,
  title,
  detail,
}: {
  icon: ReactNode
  title: string
  detail: string
}) {
  return (
    <article className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-900/5">
      <div className="flex items-start gap-3">
        <IconShell>{icon}</IconShell>
        <div>
          <h3 className="text-sm font-black text-slate-950">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{detail}</p>
        </div>
      </div>
    </article>
  )
}

function ModuleStat({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-900/5">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          {icon}
        </span>
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">{label}</p>
          <p className="mt-1 text-lg font-black text-slate-950">{value}</p>
        </div>
      </div>
    </div>
  )
}

function ModulePanel({ module, index }: { module: Module; index: number }) {
  const sandboxRequirement = formatRequirement(module.sandboxTask.requirement)

  return (
    <article className={`module-panel module-panel-${index + 1}`}>
      <div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-900/10">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-600 to-[#0034d8] p-5 text-white sm:p-7">
          <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 right-24 h-28 w-28 rounded-full bg-cyan-300/20 blur-2xl" />

          <div className="relative z-10 flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sm font-black text-blue-700 shadow-sm">
                  {module.moduleNumber}
                </span>
                <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-blue-50">
                  Module {module.moduleNumber}
                </span>
                <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-blue-50">
                  {module.brainUpdateSensitivity} update sensitivity
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">{module.title}</h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-blue-50">{module.purpose}</p>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur xl:w-80">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-100">
                Training rhythm
              </p>
              <p className="mt-2 text-sm leading-6 text-blue-50">
                Read the lesson route, pass the check, then practise the skill in the sandbox where evidence is required.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-7">
          <section className="grid gap-3 md:grid-cols-3">
            <ModuleStat
              icon={<BookOpenCheck className="h-5 w-5" aria-hidden="true" />}
              label="Lessons"
              value={module.lessons.length}
            />
            <ModuleStat
              icon={<FileQuestion className="h-5 w-5" aria-hidden="true" />}
              label="Knowledge check"
              value={module.knowledgeCheck.blocksProgressUntilPassed ? 'Required' : 'Diagnostic'}
            />
            <ModuleStat
              icon={<Code2 className="h-5 w-5" aria-hidden="true" />}
              label="Sandbox practice"
              value={sandboxRequirement}
            />
          </section>

          <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
            <div className="min-w-0 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <IconShell>
                  <Route className="h-5 w-5" aria-hidden="true" />
                </IconShell>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-600">
                    Lesson sequence
                  </p>
                  <h3 className="text-xl font-black tracking-tight text-slate-950">Training route</h3>
                </div>
              </div>

              <ol className="mt-5 space-y-3">
                {module.lessons.map((lesson) => (
                  <li key={lesson.id} className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm">
                    <div className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white">
                        {lesson.sortOrder}
                      </span>
                      <div className="min-w-0">
                        <p className="text-base font-black leading-6 text-slate-950">{lesson.title}</p>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{lesson.outcome}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="space-y-4">
              <div className="rounded-[1.75rem] border border-blue-100 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <IconShell>
                    <Target className="h-5 w-5" aria-hidden="true" />
                  </IconShell>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-600">
                      Learner outcome
                    </p>
                    <h3 className="text-lg font-black tracking-tight text-slate-950">By the end</h3>
                  </div>
                </div>

                <ul className="mt-4 space-y-3">
                  {module.studentOutcome.map((outcome) => (
                    <li key={outcome} className="flex gap-3 text-sm leading-6 text-slate-600">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.75rem] border border-blue-100 bg-blue-50 p-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">
                    <FileQuestion className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
                      Knowledge check
                    </p>
                    <h3 className="text-base font-black leading-6 text-slate-950">
                      {module.knowledgeCheck.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-700">{module.knowledgeCheck.purpose}</p>
                <p className="mt-3 rounded-2xl border border-blue-100 bg-white p-3 text-sm font-bold leading-6 text-slate-700">
                  {module.knowledgeCheck.passRule}
                </p>
              </div>

              <div className="overflow-hidden rounded-[1.75rem] border border-blue-700 bg-gradient-to-br from-blue-600 to-[#0736db] p-5 text-white shadow-sm shadow-blue-900/20">
                <div className="flex items-center gap-3">
                  <IconShell solid>
                    <Code2 className="h-5 w-5" aria-hidden="true" />
                  </IconShell>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-100">
                      Sandbox practice
                    </p>
                    <h3 className="text-base font-black leading-6 text-white">{module.sandboxTask.title}</h3>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-blue-50">{module.sandboxTask.scenario}</p>

                <div className="mt-4 rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-100">
                    Success criteria
                  </p>
                  <ul className="mt-3 space-y-2">
                    {module.sandboxTask.successCriteria.slice(0, 3).map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-6 text-blue-50">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </section>

          <section className="mt-5 rounded-[1.75rem] border border-blue-100 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <IconShell>
                <Zap className="h-5 w-5" aria-hidden="true" />
              </IconShell>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-600">
                  Progress effect
                </p>
                <h3 className="text-lg font-black tracking-tight text-slate-950">What this module unlocks</h3>
              </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {module.progressEffect.unlocks.map((unlock) => (
                <div key={unlock} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-bold leading-6 text-slate-700">{unlock}</p>
                </div>
              ))}
              {module.progressEffect.dashboardSignals.slice(0, 3).map((signal) => (
                <div key={signal} className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <p className="text-sm font-bold leading-6 text-blue-800">{signal}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  )
}

function buildTabCss(modules: Module[]) {
  const moduleCss = modules
    .map((module, index) => {
      const tabNumber = index + 1

      return `
#module-tab-${tabNumber}:checked ~ .academy-module-shell .academy-module-panels .module-panel-${tabNumber} {
  display: block;
}

#module-tab-${tabNumber}:checked ~ .academy-module-shell .academy-module-tabs label[for="module-tab-${tabNumber}"] {
  border-color: transparent;
  background: linear-gradient(135deg, #123BFF 0%, #0A63FF 55%, #45C9FF 140%);
  color: #ffffff;
  box-shadow: 0 18px 45px rgba(18, 59, 255, 0.24);
}

#module-tab-${tabNumber}:checked ~ .academy-module-shell .academy-module-tabs label[for="module-tab-${tabNumber}"] .academy-tab-index {
  background: rgba(255, 255, 255, 0.96);
  color: #123BFF;
}

#module-tab-${tabNumber}:checked ~ .academy-module-shell .academy-module-tabs label[for="module-tab-${tabNumber}"] .academy-tab-detail,
#module-tab-${tabNumber}:checked ~ .academy-module-shell .academy-module-tabs label[for="module-tab-${tabNumber}"] .academy-tab-label {
  color: rgba(255, 255, 255, 0.9);
}
`
    })
    .join('\n')

  return `
.module-panel {
  display: none;
  animation: academyPanelRise 380ms ease both;
}

@keyframes academyPanelRise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes academyGlowFloat {
  0%, 100% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(0, -10px, 0);
  }
}

.academy-floating-node {
  animation: academyGlowFloat 6s ease-in-out infinite;
}

.academy-module-panels img[src*="/brand/"],
.academy-module-panels img[alt="DeepMind Resources"] {
  display: none !important;
}

${moduleCss}
`
}

export default async function AIFundamentalsModulesPage() {
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

  const [{ data: lessonRows }, { data: sandboxRows }] = await Promise.all([
    supabase
      .from('user_lesson_progress')
      .select('status, completed_at')
      .eq('user_id', user.id),
    supabase
      .from('sandbox_attempts')
      .select('status, submitted_at, reviewed_at')
      .eq('user_id', user.id),
  ])

  const modules = aiFundamentalsLearningPath.modules
  const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0)
  const requiredSandboxTasks = modules.filter(
    (module) =>
      module.sandboxTask.requirement === 'required' ||
      module.sandboxTask.requirement === 'final_required',
  ).length

  const progressSummary: ProgressSummary = {
    lessonRecords: (lessonRows ?? []).length,
    completedLessons: getCompletedLessonCount((lessonRows ?? []) as LessonProgressRow[]),
    submittedSandboxAttempts: getSubmittedSandboxCount((sandboxRows ?? []) as SandboxAttemptRow[]),
    reviewedSandboxAttempts: getReviewedSandboxCount((sandboxRows ?? []) as SandboxAttemptRow[]),
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'AI Fundamentals Beginner Course',
    description:
      'AI Fundamentals is the beginner Academy course for building practical AI competency, safe-use judgement, prompt foundations, tool awareness, validation habits, and verified sandbox practice.',
    provider: {
      '@type': 'Organization',
      name: 'DeepMind Resources',
      url: 'https://deepmindresources.pro',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: `${modules.length} modules, ${totalLessons} lessons, ${requiredSandboxTasks} required sandbox tasks`,
    },
  }

  return (
    <main className="min-h-screen bg-[#eef7ff] text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <style dangerouslySetInnerHTML={{ __html: buildTabCss(modules) }} />

      <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-16 w-full max-w-[1500px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/dashboard" className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm shadow-blue-900/20">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-black uppercase tracking-[0.22em] text-blue-600">
                DeepMind Resources Academy
              </span>
              <span className="block truncate text-base font-black tracking-tight text-slate-950 sm:text-lg">
                AI Fundamentals
              </span>
            </span>
          </Link>

          <nav className="flex shrink-0 items-center gap-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 sm:px-4 sm:text-sm"
            >
              Dashboard
            </Link>
            <Link
              href="/academy/path/fundamentals"
              className="hidden items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 sm:inline-flex"
            >
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Path overview
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[2.25rem] border border-blue-100 bg-white shadow-sm shadow-blue-900/10">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
          <div className="absolute -bottom-24 right-56 h-64 w-64 rounded-full bg-cyan-100 blur-3xl" />

          <div className="relative z-10 grid gap-6 p-5 sm:p-7 xl:grid-cols-[minmax(0,1fr)_440px] xl:items-center">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-blue-700">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Beginner foundation path
              </div>

              <h1 className="mt-5 max-w-4xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                AI Fundamentals beginner course.
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                Build the foundation before advanced AI work: safe-use judgement, prompt basics, tool awareness, output validation, sandbox practice, and verified skill evidence.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href="#module-tabs"
                  className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-sm shadow-blue-900/20 transition hover:bg-blue-700"
                >
                  Start Module 1
                </a>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
                >
                  View dashboard
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="academy-floating-node rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-600 to-[#0736db] p-5 text-white shadow-2xl shadow-blue-900/25">
                <div className="grid grid-cols-2 gap-3">
                  <ProgressCard
                    label="Modules"
                    value={modules.length}
                    icon={<Grid3X3 className="h-5 w-5" aria-hidden="true" />}
                  />
                  <ProgressCard
                    label="Lessons"
                    value={totalLessons}
                    icon={<BookOpenCheck className="h-5 w-5" aria-hidden="true" />}
                  />
                  <ProgressCard
                    label="Sandbox"
                    value={requiredSandboxTasks}
                    icon={<Code2 className="h-5 w-5" aria-hidden="true" />}
                  />
                  <ProgressCard
                    label="Completed"
                    value={progressSummary.completedLessons}
                    icon={<BadgeCheck className="h-5 w-5" aria-hidden="true" />}
                  />
                </div>

                <div className="mt-4 rounded-3xl border border-white/15 bg-white/10 p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-100">
                    Your saved record
                  </p>
                  <p className="mt-2 text-sm leading-6 text-blue-50">
                    {progressSummary.lessonRecords === 0
                      ? 'No lesson progress has been saved yet. Begin with Module 1.'
                      : `${progressSummary.lessonRecords} lesson record saved for this account.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-3 md:grid-cols-4">
          <MethodStep
            icon={<ShieldCheck className="h-5 w-5" aria-hidden="true" />}
            title="Understand"
            detail="Build the core concept before touching tools or workflows."
          />
          <MethodStep
            icon={<FileQuestion className="h-5 w-5" aria-hidden="true" />}
            title="Check"
            detail="Confirm the idea with a focused knowledge check."
          />
          <MethodStep
            icon={<Code2 className="h-5 w-5" aria-hidden="true" />}
            title="Practise"
            detail="Move into sandbox tasks where the skill becomes visible."
          />
          <MethodStep
            icon={<Trophy className="h-5 w-5" aria-hidden="true" />}
            title="Prove"
            detail="Final evidence becomes the route to skill recognition."
          />
        </section>

        <section id="module-tabs" className="mt-6">
          {modules.map((module, index) => (
            <input
              key={module.id}
              id={`module-tab-${index + 1}`}
              name="ai-fundamentals-module-tabs"
              type="radio"
              className="sr-only"
              defaultChecked={index === 0}
            />
          ))}

          <div className="academy-module-shell grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)]">
            <aside className="academy-module-tabs rounded-[2rem] border border-blue-100 bg-white p-3 shadow-sm shadow-blue-900/10 lg:sticky lg:top-24 lg:self-start">
              <div className="mb-3 px-2 pt-2">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
                  Training path
                </p>
                <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950">Follow the module path</h2>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
                {modules.map((module, index) => (
                  <label
                    key={module.id}
                    htmlFor={`module-tab-${index + 1}`}
                    className="min-w-[260px] cursor-pointer rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-950 transition hover:border-blue-200 hover:bg-blue-50 lg:min-w-0"
                  >
                    <span className="flex items-start gap-3">
                      <span className="academy-tab-index flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white">
                        {module.moduleNumber}
                      </span>
                      <span className="min-w-0">
                        <span className="academy-tab-label block text-[10px] font-black uppercase tracking-[0.16em] text-blue-600">
                          Module {module.moduleNumber}
                        </span>
                        <span className="mt-1 block text-sm font-black leading-5">{module.title}</span>
                        <span className="academy-tab-detail mt-1 block text-xs leading-5 text-slate-500">
                          {module.lessons.length} lessons · {formatRequirement(module.sandboxTask.requirement)}
                        </span>
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </aside>

            <section className="academy-module-panels min-w-0">
              {modules.map((module, index) => (
                <ModulePanel key={module.id} module={module} index={index} />
              ))}
            </section>
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-900/10">
          <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_420px]">
            <div className="p-5 sm:p-7">
              <div className="flex items-center gap-3">
                <IconShell>
                  <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
                </IconShell>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
                    Final skill check
                  </p>
                  <h2 className="text-2xl font-black tracking-tight text-slate-950">
                    {aiFundamentalsLearningPath.finalSkillCheck.title}
                  </h2>
                </div>
              </div>

              <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600">
                {aiFundamentalsLearningPath.finalSkillCheck.scenario}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {aiFundamentalsLearningPath.finalSkillCheck.passingEvidence.map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
                      <p className="text-sm font-bold leading-6 text-slate-700">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-blue-100 bg-gradient-to-br from-blue-600 to-[#0736db] p-5 text-white sm:p-7 xl:border-l xl:border-t-0">
              <IconShell solid>
                <BadgeCheck className="h-5 w-5" aria-hidden="true" />
              </IconShell>
              <p className="mt-5 text-[11px] font-black uppercase tracking-[0.22em] text-blue-100">
                Award target
              </p>
              <h3 className="mt-2 text-2xl font-black tracking-tight">
                {aiFundamentalsLearningPath.finalSkillCheck.award}
              </h3>
              <p className="mt-4 text-sm leading-7 text-blue-50">
                Earn this after the required lessons, checks, sandbox evidence, and final assessment are complete.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-900/10 sm:p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
              <BookOpenCheck className="h-6 w-6 text-blue-700" aria-hidden="true" />
              <h3 className="mt-4 text-base font-black text-slate-950">Learn with sequence</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Each module builds on the judgement, language, and safety habits from the previous step.
              </p>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
              <FileQuestion className="h-6 w-6 text-blue-700" aria-hidden="true" />
              <h3 className="mt-4 text-base font-black text-slate-950">Check understanding</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Knowledge checks keep progress connected to understanding, not just reading.
              </p>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
              <Code2 className="h-6 w-6 text-blue-700" aria-hidden="true" />
              <h3 className="mt-4 text-base font-black text-slate-950">Prove practice</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Sandbox tasks create the practical evidence that later powers progress, awards, and skill trace.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold leading-6 text-slate-600">
              Begin with Module 1, then complete each check and sandbox task in sequence.
            </p>
            <span className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-500">
              <LockKeyhole className="h-4 w-4" aria-hidden="true" />
              Lessons unlock in sequence
            </span>
          </div>
        </section>
      </div>
    </main>
  )
}


