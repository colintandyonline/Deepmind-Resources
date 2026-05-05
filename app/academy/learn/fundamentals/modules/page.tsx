import type { Metadata } from 'next'
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
  FlaskConical,
  GraduationCap,
  LockKeyhole,
  Route,
  ShieldCheck,
} from 'lucide-react'
import { aiFundamentalsLearningPath } from '@/lib/academy/fundamentals'

export const metadata: Metadata = {
  title: 'AI Fundamentals Modules | DeepMind Resources Academy',
  description:
    'A focused learner workspace for the AI Fundamentals module sequence, lesson outcomes, checks, sandbox evidence, and final skill check.',
  alternates: {
    canonical: 'https://deepmindresources.pro/academy/learn/fundamentals/modules',
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
    return 'Optional'
  }

  if (requirement === 'final_required') {
    return 'Final'
  }

  return 'Required'
}

function moduleAvailabilityLabel(moduleNumber: number) {
  if (moduleNumber === 1) {
    return 'Start first'
  }

  return `After module ${moduleNumber - 1}`
}

function ModuleRow({
  module,
}: {
  module: (typeof aiFundamentalsLearningPath.modules)[number]
}) {
  const isFirstModule = module.moduleNumber === 1
  const sandboxLabel = formatRequirement(module.sandboxTask.requirement)

  return (
    <article
      id={module.slug}
      className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-black ${
                isFirstModule ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {module.moduleNumber}
            </span>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
              Module {module.moduleNumber}
            </span>

            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-slate-600">
              {moduleAvailabilityLabel(module.moduleNumber)}
            </span>
          </div>

          <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950">
            {module.title}
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">
            {module.purpose}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-slate-500">
                <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
                <p className="text-[11px] font-black uppercase tracking-[0.14em]">Lessons</p>
              </div>
              <p className="mt-2 text-lg font-black text-slate-950">{module.lessons.length}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-slate-500">
                <FileQuestion className="h-4 w-4" aria-hidden="true" />
                <p className="text-[11px] font-black uppercase tracking-[0.14em]">Check</p>
              </div>
              <p className="mt-2 text-sm font-black leading-5 text-slate-950">
                {module.knowledgeCheck.blocksProgressUntilPassed ? 'Required' : 'Diagnostic'}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-slate-500">
                <FlaskConical className="h-4 w-4" aria-hidden="true" />
                <p className="text-[11px] font-black uppercase tracking-[0.14em]">Sandbox</p>
              </div>
              <p className="mt-2 text-sm font-black leading-5 text-slate-950">{sandboxLabel}</p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
              Lesson sequence
            </p>

            <ol className="mt-3 space-y-3">
              {module.lessons.map((lesson) => (
                <li key={lesson.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-black text-blue-700">
                      {lesson.sortOrder}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-black leading-5 text-slate-950">{lesson.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{lesson.outcome}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <aside className="border-t border-slate-200 bg-slate-50 p-5 sm:p-6 xl:border-l xl:border-t-0">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
              Learner outcome
            </p>
            <ul className="mt-3 space-y-3">
              {module.studentOutcome.slice(0, 4).map((outcome) => (
                <li key={outcome} className="flex gap-2 text-sm leading-6 text-slate-600">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
              Knowledge check
            </p>
            <p className="mt-2 text-sm font-black leading-5 text-slate-950">
              {module.knowledgeCheck.title}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {module.knowledgeCheck.purpose}
            </p>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
              Sandbox task
            </p>
            <p className="mt-2 text-sm font-black leading-5 text-slate-950">
              {module.sandboxTask.title}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {module.sandboxTask.scenario}
            </p>
          </div>
        </aside>
      </div>
    </article>
  )
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

  const progressSummary: ProgressSummary = {
    lessonRecords: (lessonRows ?? []).length,
    completedLessons: getCompletedLessonCount((lessonRows ?? []) as LessonProgressRow[]),
    submittedSandboxAttempts: getSubmittedSandboxCount((sandboxRows ?? []) as SandboxAttemptRow[]),
    reviewedSandboxAttempts: getReviewedSandboxCount((sandboxRows ?? []) as SandboxAttemptRow[]),
  }

  const modules = aiFundamentalsLearningPath.modules
  const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0)
  const requiredSandboxTasks = modules.filter(
    (module) =>
      module.sandboxTask.requirement === 'required' ||
      module.sandboxTask.requirement === 'final_required',
  ).length
  const firstModule = modules[0]

  return (
    <main className="min-h-screen bg-[#f4f9ff] text-slate-950">
      <header className="sticky top-0 z-40 border-b border-blue-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-16 w-full max-w-[1500px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
                DeepMind Resources Academy
              </p>
              <h1 className="truncate text-base font-black tracking-tight text-slate-950 sm:text-lg">
                AI Fundamentals
              </h1>
            </div>
          </div>

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
              Gateway
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-start">
            <div className="min-w-0">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
                Learning path
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Work through the AI Fundamentals sequence.
              </h2>
              <p className="mt-4 max-w-4xl text-base leading-7 text-slate-600">
                Six modules take you from orientation and baseline confidence into AI concepts, modern tools,
                safety, tool selection, practical workflow design, and final skill evidence.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-600 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-white">
                  {modules.length} modules
                </span>
                <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-blue-700">
                  {totalLessons} lessons
                </span>
                <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-blue-700">
                  {requiredSandboxTasks} required sandbox tasks
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
                Your Academy record
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
                    Saved lessons
                  </p>
                  <p className="mt-1 text-2xl font-black text-slate-950">{progressSummary.lessonRecords}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
                    Completed
                  </p>
                  <p className="mt-1 text-2xl font-black text-slate-950">{progressSummary.completedLessons}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
                    Submitted
                  </p>
                  <p className="mt-1 text-2xl font-black text-slate-950">{progressSummary.submittedSandboxAttempts}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
                    Reviewed
                  </p>
                  <p className="mt-1 text-2xl font-black text-slate-950">{progressSummary.reviewedSandboxAttempts}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm lg:sticky lg:top-24 lg:self-start">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
              Path order
            </p>
            <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950">
              Start with Module 1.
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Follow the sequence. Later modules depend on the judgement and safety habits built earlier.
            </p>

            <ol className="mt-5 space-y-2">
              {modules.map((module) => (
                <li key={module.id}>
                  <a
                    href={`#${module.slug}`}
                    className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition hover:border-blue-200 hover:bg-blue-50"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xs font-black text-white">
                      {module.moduleNumber}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-black leading-5 text-slate-950">
                        {module.title}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-slate-500">
                        {module.lessons.length} lessons
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-blue-50 p-4">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
                First action
              </p>
              <p className="mt-2 text-sm font-black leading-5 text-slate-950">
                {firstModule?.title ?? 'AI Orientation and Baseline'}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Begin with orientation and baseline confidence before required sandbox evidence starts.
              </p>
            </div>
          </aside>

          <section className="min-w-0 space-y-5">
            {modules.map((module) => (
              <ModuleRow key={module.id} module={module} />
            ))}

            <section className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
                    Completion evidence
                  </p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                    What the path requires
                  </h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {aiFundamentalsLearningPath.requiredCompletionEvidence.map((item) => (
                      <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex gap-2">
                          <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                          <p className="text-sm font-bold leading-6 text-slate-700">{item}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
                    Final skill check
                  </p>
                  <h3 className="mt-2 text-lg font-black leading-6 text-slate-950">
                    {aiFundamentalsLearningPath.finalSkillCheck.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {aiFundamentalsLearningPath.finalSkillCheck.scenario}
                  </p>

                  <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center gap-2 text-slate-500">
                      <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
                      <p className="text-[11px] font-black uppercase tracking-[0.16em]">
                        Passing evidence
                      </p>
                    </div>
                    <ul className="mt-3 space-y-2">
                      {aiFundamentalsLearningPath.finalSkillCheck.passingEvidence.map((item) => (
                        <li key={item} className="flex gap-2 text-sm leading-5 text-slate-600">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-black text-slate-950">
                        Award: {aiFundamentalsLearningPath.finalSkillCheck.award}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Awarding should wait for the required lesson, check, sandbox, and assessment evidence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <Route className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  <h3 className="mt-3 text-sm font-black text-slate-950">Learn in order</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Modules build from orientation to workflow design.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <FileQuestion className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  <h3 className="mt-3 text-sm font-black text-slate-950">Pass checks</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Checks confirm understanding before skill evidence.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <FlaskConical className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  <h3 className="mt-3 text-sm font-black text-slate-950">Prove practice</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Sandbox work proves practical application.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2 border-t border-slate-200 pt-5 sm:flex-row sm:justify-between">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
                >
                  Dashboard
                </Link>
                <span className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-500">
                  <LockKeyhole className="h-4 w-4" aria-hidden="true" />
                  Module lessons unlock in sequence
                </span>
              </div>
            </section>
          </section>
        </section>
      </div>
    </main>
  )
}
