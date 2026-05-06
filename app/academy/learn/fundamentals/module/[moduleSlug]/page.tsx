import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  CheckCircle2,
  Code2,
  FileQuestion,
  GraduationCap,
  LockKeyhole,
  Route,
  ShieldCheck,
  Target,
} from 'lucide-react'
import { aiFundamentalsLearningPath } from '@/lib/academy/fundamentals'

type ModulePageParams = {
  moduleSlug: string
}

type ModulePageProps = {
  params: Promise<ModulePageParams>
}

type LessonProgressRow = {
  lesson_id: string | null
  status: string | null
  completed_at: string | null
}

type SandboxAttemptRow = {
  status: string | null
  submitted_at: string | null
  reviewed_at: string | null
}

type Module = (typeof aiFundamentalsLearningPath.modules)[number]
type Lesson = Module['lessons'][number]

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

function getModuleBySlug(moduleSlug: string) {
  return aiFundamentalsLearningPath.modules.find((module) => module.slug === moduleSlug)
}

function getCompletedLessonIds(rows: LessonProgressRow[]) {
  return new Set(
    rows
      .filter((row) => row.lesson_id && (row.status === 'completed' || row.completed_at))
      .map((row) => row.lesson_id as string),
  )
}

function getSubmittedSandboxCount(rows: SandboxAttemptRow[]) {
  return rows.filter(
    (row) =>
      row.status === 'submitted' ||
      row.status === 'reviewed' ||
      row.status === 'passed' ||
      row.submitted_at,
  ).length
}

function getReviewedSandboxCount(rows: SandboxAttemptRow[]) {
  return rows.filter((row) => row.status === 'reviewed' || row.status === 'passed' || row.reviewed_at)
    .length
}

function getSandboxRequirementLabel(requirement: string) {
  if (requirement === 'optional') {
    return 'Optional practice'
  }

  if (requirement === 'final_required') {
    return 'Final evidence'
  }

  if (requirement === 'required') {
    return 'Required practice'
  }

  return 'No practice task'
}

function getSensitivityLabel(module: Module) {
  if (module.brainUpdateSensitivity === 'high') {
    return 'High update sensitivity'
  }

  if (module.brainUpdateSensitivity === 'medium') {
    return 'Medium update sensitivity'
  }

  return 'Low update sensitivity'
}

function IconTile({ children, solid = false }: { children: ReactNode; solid?: boolean }) {
  return (
    <span
      className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-sm ${
        solid
          ? 'bg-white text-blue-700'
          : 'bg-gradient-to-br from-blue-600 to-[#0A63FF] text-white shadow-blue-900/20'
      }`}
    >
      {children}
    </span>
  )
}

function ProgressCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string
  value: string
  detail: string
  icon: ReactNode
}) {
  return (
    <article className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-900/5">
      <div className="flex items-center gap-3">
        <IconTile>{icon}</IconTile>
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-600">
            {label}
          </p>
          <p className="mt-1 text-3xl font-black tracking-tight text-slate-950">{value}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p>
        </div>
      </div>
    </article>
  )
}

function LessonCard({
  lesson,
  module,
  isFirstLesson,
  isCompleted,
}: {
  lesson: Lesson
  module: Module
  isFirstLesson: boolean
  isCompleted: boolean
}) {
  const lessonHref = `/academy/learn/fundamentals/module/${module.slug}/lesson/${lesson.slug}`

  return (
    <article className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-900/5">
      <div className="flex items-start gap-4">
        <span
          className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-black ${
            isCompleted ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700'
          }`}
        >
          {isCompleted ? <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> : lesson.sortOrder}
        </span>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] ${
                isFirstLesson ? 'bg-blue-600 text-white' : 'border border-slate-200 bg-slate-50 text-slate-600'
              }`}
            >
              {isFirstLesson ? 'Start here' : 'Sequential lesson'}
            </span>
            <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-blue-700">
              Version {lesson.versionNumber}
            </span>
          </div>

          <h2 className="mt-4 text-xl font-black tracking-tight text-slate-950">{lesson.title}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">{lesson.outcome}</p>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
              Practical example
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{lesson.practicalExample}</p>
          </div>

          <div className="mt-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
              Common mistake
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{lesson.commonMistake}</p>
          </div>

          <div className="mt-5">
            {isFirstLesson ? (
              <Link
                href={lessonHref}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-sm shadow-blue-900/20 transition hover:bg-blue-700"
              >
                Start lesson
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : (
              <span className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-5 py-3 text-sm font-black text-slate-500">
                <LockKeyhole className="h-4 w-4" aria-hidden="true" />
                Complete earlier lessons first
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export function generateStaticParams() {
  return aiFundamentalsLearningPath.modules.map((module) => ({
    moduleSlug: module.slug,
  }))
}

export async function generateMetadata({ params }: ModulePageProps): Promise<Metadata> {
  const { moduleSlug } = await params
  const module = getModuleBySlug(moduleSlug)

  if (!module) {
    notFound()
  }

  return {
    title: `${module.title} | AI Fundamentals Module | DeepMind Resources Academy`,
    description: module.purpose,
    alternates: {
      canonical: `https://deepmindresources.pro/academy/learn/fundamentals/module/${module.slug}`,
    },
    openGraph: {
      title: `${module.title} | AI Fundamentals Module`,
      description: module.purpose,
      url: `https://deepmindresources.pro/academy/learn/fundamentals/module/${module.slug}`,
      siteName: 'DeepMind Resources',
      type: 'website',
    },
  }
}

export default async function AIFundamentalsModulePage({ params }: ModulePageProps) {
  const { moduleSlug } = await params
  const module = getModuleBySlug(moduleSlug)

  if (!module) {
    notFound()
  }

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

  const lessonIds = module.lessons.map((lesson) => lesson.id)
  const firstLesson = module.lessons[0]
  const firstLessonHref = firstLesson
    ? `/academy/learn/fundamentals/module/${module.slug}/lesson/${firstLesson.slug}`
    : '/academy/learn/fundamentals'

  const [{ data: lessonRows }, { data: sandboxRows }] = await Promise.all([
    supabase
      .from('user_lesson_progress')
      .select('lesson_id, status, completed_at')
      .eq('user_id', user.id)
      .in('lesson_id', lessonIds),
    supabase
      .from('sandbox_attempts')
      .select('status, submitted_at, reviewed_at')
      .eq('user_id', user.id)
      .eq('sandbox_task_id', module.sandboxTask.id),
  ])

  const lessonProgressRows = (lessonRows ?? []) as LessonProgressRow[]
  const sandboxAttemptRows = (sandboxRows ?? []) as SandboxAttemptRow[]
  const completedLessonIds = getCompletedLessonIds(lessonProgressRows)
  const completedLessonCount = completedLessonIds.size
  const submittedSandboxCount = getSubmittedSandboxCount(sandboxAttemptRows)
  const reviewedSandboxCount = getReviewedSandboxCount(sandboxAttemptRows)
  const moduleProgress =
    module.lessons.length > 0 ? Math.round((completedLessonCount / module.lessons.length) * 100) : 0

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: module.title,
      description: module.purpose,
      position: module.moduleNumber,
      isPartOf: {
        '@type': 'Course',
        name: aiFundamentalsLearningPath.title,
        url: 'https://deepmindresources.pro/academy/learn/fundamentals',
      },
      provider: {
        '@type': 'Organization',
        name: 'DeepMind Resources',
        url: 'https://deepmindresources.pro',
      },
      hasPart: module.lessons.map((lesson) => ({
        '@type': 'LearningResource',
        name: lesson.title,
        position: lesson.sortOrder,
        description: lesson.outcome,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Dashboard',
          item: 'https://deepmindresources.pro/dashboard',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'AI Fundamentals',
          item: 'https://deepmindresources.pro/academy/learn/fundamentals',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: module.title,
          item: `https://deepmindresources.pro/academy/learn/fundamentals/module/${module.slug}`,
        },
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-[#eef7ff] text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-16 w-full max-w-[1500px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/academy/learn/fundamentals" className="flex min-w-0 items-center gap-3">
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
              href="/academy/learn/fundamentals"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 sm:px-4 sm:text-sm"
            >
              Course
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 sm:px-4 sm:text-sm"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[2.25rem] border border-blue-100 bg-white shadow-sm shadow-blue-900/10">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
          <div className="absolute -bottom-24 right-56 h-64 w-64 rounded-full bg-cyan-100 blur-3xl" />

          <div className="relative z-10 grid gap-6 p-5 sm:p-7 xl:grid-cols-[minmax(0,1fr)_480px] xl:items-center">
            <div className="min-w-0">
              <Link
                href="/academy/learn/fundamentals"
                className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-blue-700 transition hover:border-blue-200 hover:bg-white"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to course overview
              </Link>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-white">
                Module {module.moduleNumber} of {aiFundamentalsLearningPath.modules.length}
              </div>

              <h1 className="mt-5 max-w-4xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                {module.title}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                {module.purpose}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {module.studentOutcome.slice(0, 4).map((outcome) => (
                  <div key={outcome} className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
                      <p className="text-sm font-semibold leading-6 text-slate-700">{outcome}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-[2rem] border border-blue-700 bg-blue-600 p-5 text-white shadow-2xl shadow-blue-900/25">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-100">
                Module progress
              </p>

              <div className="mt-4 rounded-3xl border border-white/15 bg-white/10 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-bold text-blue-50">Lesson completion</p>
                  <p className="text-3xl font-black text-white">{moduleProgress}%</p>
                </div>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-white"
                    style={{ width: `${moduleProgress}%` }}
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                <div className="rounded-3xl border border-white/15 bg-white/10 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-blue-100">
                    Current evidence
                  </p>
                  <p className="mt-2 text-2xl font-black text-white">
                    {completedLessonCount}/{module.lessons.length} lessons
                  </p>
                  <p className="mt-2 text-sm leading-6 text-blue-50">
                    Saved completion records for this module.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/15 bg-white/10 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-blue-100">
                    Practice evidence
                  </p>
                  <p className="mt-2 text-2xl font-black text-white">{submittedSandboxCount} submitted</p>
                  <p className="mt-2 text-sm leading-6 text-blue-50">
                    {reviewedSandboxCount} reviewed sandbox attempt{reviewedSandboxCount === 1 ? '' : 's'}.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-5 grid gap-4 md:grid-cols-4">
          <ProgressCard
            label="Lessons"
            value={String(module.lessons.length)}
            detail={`${completedLessonCount} completed`}
            icon={<BookOpenCheck className="h-5 w-5" aria-hidden="true" />}
          />
          <ProgressCard
            label="Knowledge check"
            value={module.knowledgeCheck.blocksProgressUntilPassed ? 'Required' : 'Diagnostic'}
            detail={module.knowledgeCheck.title}
            icon={<FileQuestion className="h-5 w-5" aria-hidden="true" />}
          />
          <ProgressCard
            label="Practice"
            value={getSandboxRequirementLabel(module.sandboxTask.requirement)}
            detail={module.sandboxTask.title}
            icon={<Code2 className="h-5 w-5" aria-hidden="true" />}
          />
          <ProgressCard
            label="Update state"
            value={getSensitivityLabel(module)}
            detail={`Version-aware learning path v${aiFundamentalsLearningPath.versionNumber}`}
            icon={<ShieldCheck className="h-5 w-5" aria-hidden="true" />}
          />
        </section>

        <section className="mt-6">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
                Module lessons
              </p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Four focused lessons for this module.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Start with the first lesson. The remaining lessons stay sequential until the lesson completion flow is wired into the full course player.
            </p>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            {module.lessons.map((lesson, index) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                module={module}
                isFirstLesson={index === 0}
                isCompleted={completedLessonIds.has(lesson.id)}
              />
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-900/10 sm:p-6">
            <div className="flex items-center gap-3">
              <IconTile>
                <FileQuestion className="h-5 w-5" aria-hidden="true" />
              </IconTile>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
                  Knowledge check
                </p>
                <h2 className="text-2xl font-black tracking-tight text-slate-950">
                  {module.knowledgeCheck.title}
                </h2>
              </div>
            </div>

            <p className="mt-5 text-base leading-8 text-slate-600">{module.knowledgeCheck.purpose}</p>

            <div className="mt-5 rounded-3xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
                Check prompt
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-700">{module.knowledgeCheck.prompt}</p>
            </div>

            <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
                Pass rule
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-700">{module.knowledgeCheck.passRule}</p>
            </div>
          </article>

          <article className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-900/10 sm:p-6">
            <div className="flex items-center gap-3">
              <IconTile>
                <Code2 className="h-5 w-5" aria-hidden="true" />
              </IconTile>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
                  Sandbox practice
                </p>
                <h2 className="text-2xl font-black tracking-tight text-slate-950">
                  {module.sandboxTask.title}
                </h2>
              </div>
            </div>

            <p className="mt-5 text-base leading-8 text-slate-600">{module.sandboxTask.scenario}</p>

            <div className="mt-5 grid gap-3">
              {module.sandboxTask.successCriteria.slice(0, 3).map((criterion) => (
                <div key={criterion} className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <div className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
                    <p className="text-sm font-semibold leading-6 text-slate-700">{criterion}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <footer className="mt-6 flex flex-col gap-3 rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-900/10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <IconTile>
              <Route className="h-5 w-5" aria-hidden="true" />
            </IconTile>
            <div>
              <p className="text-sm font-black text-slate-950">Continue the AI Fundamentals route.</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Return to the course overview or start the first lesson in this module.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href="/academy/learn/fundamentals"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
            >
              Course overview
            </Link>
            <Link
              href={firstLessonHref}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-sm shadow-blue-900/20 transition hover:bg-blue-700"
            >
              Start lesson
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </footer>
      </div>
    </main>
  )
}
