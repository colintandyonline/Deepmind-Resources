import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  CheckCircle2,
  ChevronDown,
  Code2,
  FileQuestion,
  GraduationCap,
  Grid3X3,
  LockKeyhole,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
} from 'lucide-react'
import { aiFundamentalsLearningPath } from '@/lib/academy/fundamentals'

export const metadata: Metadata = {
  title: 'AI Fundamentals Beginner Course | DeepMind Resources Academy',
  description:
    'A focused beginner Academy course for building AI fundamentals, safe-use judgement, prompt basics, tool awareness, output validation, sandbox practice, and final skill evidence.',
  alternates: {
    canonical: 'https://deepmindresources.pro/academy/learn/fundamentals',
  },
  openGraph: {
    title: 'AI Fundamentals Beginner Course | DeepMind Resources Academy',
    description:
      'Build AI fundamentals from the ground up with beginner modules, safe-use judgement, prompt basics, tool awareness, validation habits, and sandbox practice.',
    url: 'https://deepmindresources.pro/academy/learn/fundamentals',
    siteName: 'DeepMind Resources',
    type: 'website',
  },
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

type CourseMetric = {
  label: string
  value: string | number
  detail: string
  icon: ReactNode
  tone?: 'blue' | 'emerald' | 'amber' | 'indigo'
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

function getCompletedLessonIds(rows: LessonProgressRow[]) {
  return new Set(
    rows
      .filter((row) => row.lesson_id && (row.status === 'completed' || row.completed_at))
      .map((row) => row.lesson_id as string),
  )
}

function getSubmittedSandboxCount(rows: SandboxAttemptRow[]) {
  return rows.filter((row) => row.status === 'submitted' || row.submitted_at).length
}

function getReviewedSandboxCount(rows: SandboxAttemptRow[]) {
  return rows.filter((row) => row.status === 'reviewed' || row.status === 'passed' || row.reviewed_at).length
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

  return 'Practice task'
}

function getModuleSummary(module: Module) {
  if (module.moduleNumber === 1) {
    return 'Start here: orientation, baseline confidence, and the learning model for the course.'
  }

  if (module.moduleNumber === 2) {
    return 'Build the practical mental model for what AI systems can and cannot be trusted to do.'
  }

  if (module.moduleNumber === 3) {
    return 'Understand prompts, context, tools, files, memory, retrieval, and model behaviour.'
  }

  if (module.moduleNumber === 4) {
    return 'Build safe-use judgement, output review habits, privacy boundaries, and risk awareness.'
  }

  if (module.moduleNumber === 5) {
    return 'Match AI tool categories to real tasks instead of choosing from hype or habit.'
  }

  return 'Turn the foundation into a repeatable AI workflow with checks, review, and safe use.'
}

function getShortModuleLabel(module: Module) {
  if (module.moduleNumber === 1) {
    return 'Orientation'
  }

  if (module.moduleNumber === 2) {
    return 'AI basics'
  }

  if (module.moduleNumber === 3) {
    return 'Modern tools'
  }

  if (module.moduleNumber === 4) {
    return 'Safety'
  }

  if (module.moduleNumber === 5) {
    return 'Tool choice'
  }

  return 'Workflow'
}

function getLessonHref(module: Module, lesson: Lesson) {
  return `/academy/learn/fundamentals/module/${module.slug}/lesson/${lesson.slug}`
}

function getModuleHref(module: Module) {
  return `/academy/learn/fundamentals/module/${module.slug}`
}

function getModuleCompletedCount(module: Module, completedLessonIds: Set<string>) {
  return module.lessons.filter((lesson) => completedLessonIds.has(lesson.id)).length
}

function getModuleProgress(module: Module, completedLessonIds: Set<string>) {
  if (module.lessons.length === 0) {
    return 0
  }

  return Math.round((getModuleCompletedCount(module, completedLessonIds) / module.lessons.length) * 100)
}

function isModuleComplete(module: Module, completedLessonIds: Set<string>) {
  return module.lessons.length > 0 && module.lessons.every((lesson) => completedLessonIds.has(lesson.id))
}

function isModuleAvailable(modules: Module[], moduleIndex: number, completedLessonIds: Set<string>) {
  if (moduleIndex === 0) {
    return true
  }

  const previousModule = modules[moduleIndex - 1]

  return previousModule ? isModuleComplete(previousModule, completedLessonIds) : false
}

function getNextAvailableLesson(module: Module, completedLessonIds: Set<string>) {
  return module.lessons.find((lesson) => !completedLessonIds.has(lesson.id)) ?? module.lessons[0] ?? null
}

function getNextCourseTarget(modules: Module[], completedLessonIds: Set<string>) {
  for (let index = 0; index < modules.length; index += 1) {
    const module = modules[index]
    const available = isModuleAvailable(modules, index, completedLessonIds)

    if (!available) {
      continue
    }

    const nextLesson = getNextAvailableLesson(module, completedLessonIds)

    if (nextLesson && !isModuleComplete(module, completedLessonIds)) {
      return {
        module,
        lesson: nextLesson,
        href: getLessonHref(module, nextLesson),
        label: `Continue: ${nextLesson.title}`,
      }
    }
  }

  const firstModule = modules[0]
  const firstLesson = firstModule?.lessons[0]

  return {
    module: firstModule,
    lesson: firstLesson,
    href: firstModule && firstLesson ? getLessonHref(firstModule, firstLesson) : '/academy/learn/fundamentals',
    label: 'Review the first lesson',
  }
}

function getModuleStatusLabel({
  available,
  complete,
  moduleIndex,
}: {
  available: boolean
  complete: boolean
  moduleIndex: number
}) {
  if (complete) {
    return 'Completed'
  }

  if (available && moduleIndex === 0) {
    return 'Ready to start'
  }

  if (available) {
    return 'Ready next'
  }

  return 'Locked'
}

function getToneClasses(tone: CourseMetric['tone']) {
  if (tone === 'emerald') {
    return 'border-emerald-200 bg-emerald-50 text-emerald-700'
  }

  if (tone === 'amber') {
    return 'border-amber-200 bg-amber-50 text-amber-700'
  }

  if (tone === 'indigo') {
    return 'border-indigo-200 bg-indigo-50 text-indigo-700'
  }

  return 'border-blue-100 bg-blue-50 text-blue-700'
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

function CourseMetricCard({ metric }: { metric: CourseMetric }) {
  return (
    <article className="rounded-3xl border border-blue-100 bg-white/95 p-4 shadow-sm shadow-blue-900/5">
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${getToneClasses(
            metric.tone,
          )}`}
        >
          {metric.icon}
        </span>
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-600">
            {metric.label}
          </p>
          <p className="mt-1 text-3xl font-black tracking-tight text-slate-950">{metric.value}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">{metric.detail}</p>
        </div>
      </div>
    </article>
  )
}

function MethodCard({
  icon,
  title,
  detail,
  tone = 'blue',
}: {
  icon: ReactNode
  title: string
  detail: string
  tone?: CourseMetric['tone']
}) {
  return (
    <article className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-900/5">
      <div className="flex items-start gap-3">
        <span
          className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${getToneClasses(
            tone,
          )}`}
        >
          {icon}
        </span>
        <div>
          <h3 className="text-sm font-black text-slate-950">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{detail}</p>
        </div>
      </div>
    </article>
  )
}

function RouteRail({
  modules,
  completedLessonIds,
}: {
  modules: Module[]
  completedLessonIds: Set<string>
}) {
  return (
    <section className="mt-5 rounded-[2rem] border border-blue-100 bg-white p-4 shadow-sm shadow-blue-900/5">
      <div className="flex items-center gap-3">
        <IconTile>
          <Route className="h-5 w-5" aria-hidden="true" />
        </IconTile>
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">
            Course route
          </p>
          <h2 className="text-lg font-black tracking-tight text-slate-950">Six modules, one clear foundation.</h2>
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {modules.map((module, index) => {
          const complete = isModuleComplete(module, completedLessonIds)
          const available = isModuleAvailable(modules, index, completedLessonIds)

          return (
            <a
              key={module.id}
              href={`#module-${module.moduleNumber}`}
              className={`inline-flex min-w-fit items-center gap-2 rounded-2xl border px-3 py-2 text-xs font-black transition ${
                complete
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : available
                    ? 'border-blue-100 bg-blue-50 text-blue-700 hover:border-blue-200 hover:bg-white'
                    : 'border-slate-200 bg-slate-50 text-slate-500'
              }`}
            >
              <span
                className={`inline-flex h-7 w-7 items-center justify-center rounded-xl ${
                  complete
                    ? 'bg-emerald-600 text-white'
                    : available
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 text-slate-500'
                }`}
              >
                {complete ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : module.moduleNumber}
              </span>
              {getShortModuleLabel(module)}
            </a>
          )
        })}
        <span className="inline-flex min-w-fit items-center gap-2 rounded-2xl border border-blue-100 bg-white px-3 py-2 text-xs font-black text-blue-700">
          <Trophy className="h-4 w-4" aria-hidden="true" />
          Final check
        </span>
      </div>
    </section>
  )
}

function ModuleCard({
  module,
  moduleIndex,
  modules,
  completedLessonIds,
}: {
  module: Module
  moduleIndex: number
  modules: Module[]
  completedLessonIds: Set<string>
}) {
  const available = isModuleAvailable(modules, moduleIndex, completedLessonIds)
  const complete = isModuleComplete(module, completedLessonIds)
  const completedCount = getModuleCompletedCount(module, completedLessonIds)
  const moduleProgress = getModuleProgress(module, completedLessonIds)
  const requirementLabel = getSandboxRequirementLabel(module.sandboxTask.requirement)
  const moduleHref = getModuleHref(module)
  const nextLesson = getNextAvailableLesson(module, completedLessonIds)
  const nextLessonHref = nextLesson ? getLessonHref(module, nextLesson) : moduleHref
  const statusLabel = getModuleStatusLabel({ available, complete, moduleIndex })

  const statusClass = complete
    ? 'bg-emerald-600 text-white'
    : available
      ? 'bg-blue-600 text-white'
      : 'border border-slate-200 bg-white text-slate-600'

  return (
    <article
      id={`module-${module.moduleNumber}`}
      className="scroll-mt-24 overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-900/10"
    >
      <div className="border-b border-blue-100 bg-gradient-to-br from-white via-white to-blue-50 p-5 sm:p-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-black shadow-sm ${
                    complete
                      ? 'bg-emerald-600 text-white shadow-emerald-900/20'
                      : available
                        ? 'bg-blue-600 text-white shadow-blue-900/20'
                        : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {complete ? <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> : module.moduleNumber}
                </span>

                <span className={`rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] ${statusClass}`}>
                  {statusLabel}
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950">{module.title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{getModuleSummary(module)}</p>

              <div className="mt-4 rounded-2xl border border-blue-100 bg-white p-3">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">
                    Module progress
                  </p>
                  <p className="text-sm font-black text-slate-950">
                    {completedCount}/{module.lessons.length} lessons signed off
                  </p>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-blue-50">
                  <div
                    className={`h-full rounded-full ${complete ? 'bg-emerald-600' : 'bg-blue-600'}`}
                    style={{ width: `${moduleProgress}%` }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            <div className="flex min-w-full flex-wrap gap-2 sm:min-w-72 sm:justify-end">
              <span className="inline-flex items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-black text-blue-700">
                <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
                {module.lessons.length} lessons
              </span>
              <span className="inline-flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-black text-amber-700">
                <FileQuestion className="h-4 w-4" aria-hidden="true" />
                {module.knowledgeCheck.blocksProgressUntilPassed ? 'Module review' : 'Diagnostic'}
              </span>
              <span className="inline-flex items-center gap-2 rounded-2xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-black text-indigo-700">
                <Code2 className="h-4 w-4" aria-hidden="true" />
                {requirementLabel}
              </span>
            </div>
          </div>

          <details className="group rounded-3xl border border-blue-100 bg-white shadow-sm shadow-blue-900/5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white">
                  <BookOpenCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-600">
                    Lesson titles
                  </p>
                  <p className="text-sm font-black text-slate-950">Preview this module</p>
                </div>
              </div>
              <ChevronDown
                className="h-5 w-5 shrink-0 text-slate-500 transition group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>

            <ol className="grid gap-2 border-t border-blue-100 p-4 sm:grid-cols-2">
              {module.lessons.map((lesson) => {
                const lessonComplete = completedLessonIds.has(lesson.id)

                return (
                  <li
                    key={lesson.id}
                    className={`rounded-2xl border p-3 ${
                      lessonComplete
                        ? 'border-emerald-200 bg-emerald-50'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div className="flex gap-3">
                      <span
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl text-xs font-black ${
                          lessonComplete ? 'bg-emerald-600 text-white' : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        {lessonComplete ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : lesson.sortOrder}
                      </span>
                      <p className="text-sm font-black leading-5 text-slate-950">{lesson.title}</p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </details>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-2 text-sm leading-6 text-slate-600">
          {complete ? (
            <>
              <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
              <span>This module is signed off. Review it anytime from your dashboard path.</span>
            </>
          ) : available ? (
            <>
              <CheckCircle2 className="h-5 w-5 text-blue-600" aria-hidden="true" />
              <span>Continue the next lesson and sign off understanding to progress.</span>
            </>
          ) : (
            <>
              <LockKeyhole className="h-5 w-5 text-slate-400" aria-hidden="true" />
              <span>Complete the previous module before starting this one.</span>
            </>
          )}
        </div>

        {available ? (
          <Link
            href={complete ? moduleHref : nextLessonHref}
            className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-black text-white shadow-sm transition ${
              complete
                ? 'bg-emerald-600 shadow-emerald-900/20 hover:bg-emerald-700'
                : 'bg-blue-600 shadow-blue-900/20 hover:bg-blue-700'
            }`}
          >
            {complete ? 'Review module' : 'Continue module'}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        ) : (
          <span className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-5 py-3 text-sm font-black text-slate-500">
            <LockKeyhole className="h-4 w-4" aria-hidden="true" />
            Locked
          </span>
        )}
      </div>
    </article>
  )
}

export default async function AIFundamentalsCoursePage() {
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
      .select('lesson_id, status, completed_at')
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

  const lessonProgressRows = (lessonRows ?? []) as LessonProgressRow[]
  const sandboxAttemptRows = (sandboxRows ?? []) as SandboxAttemptRow[]

  const completedLessonIds = getCompletedLessonIds(lessonProgressRows)
  const completedLessons = completedLessonIds.size
  const submittedSandboxAttempts = getSubmittedSandboxCount(sandboxAttemptRows)
  const reviewedSandboxAttempts = getReviewedSandboxCount(sandboxAttemptRows)
  const completedModules = modules.filter((module) => isModuleComplete(module, completedLessonIds)).length
  const courseProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
  const nextTarget = getNextCourseTarget(modules, completedLessonIds)

  const metrics: CourseMetric[] = [
    {
      label: 'Modules',
      value: modules.length,
      detail: `${completedModules} signed off`,
      icon: <Grid3X3 className="h-5 w-5" aria-hidden="true" />,
      tone: completedModules > 0 ? 'emerald' : 'blue',
    },
    {
      label: 'Lessons',
      value: totalLessons,
      detail: `${completedLessons} signed off`,
      icon: <BookOpenCheck className="h-5 w-5" aria-hidden="true" />,
      tone: completedLessons > 0 ? 'emerald' : 'blue',
    },
    {
      label: 'Practice',
      value: requiredSandboxTasks,
      detail: `${submittedSandboxAttempts} submitted`,
      icon: <Code2 className="h-5 w-5" aria-hidden="true" />,
      tone: 'indigo',
    },
    {
      label: 'Review',
      value: reviewedSandboxAttempts,
      detail: 'Practice attempts reviewed',
      icon: <BadgeCheck className="h-5 w-5" aria-hidden="true" />,
      tone: 'amber',
    },
  ]

  const structuredData = [
    {
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
      hasPart: modules.map((module) => ({
        '@type': 'Course',
        name: module.title,
        position: module.moduleNumber,
        description: getModuleSummary(module),
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
          name: 'AI Fundamentals Beginner Course',
          item: 'https://deepmindresources.pro/academy/learn/fundamentals',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'AI Fundamentals modules',
      itemListElement: modules.map((module) => ({
        '@type': 'ListItem',
        position: module.moduleNumber,
        name: module.title,
        url: `https://deepmindresources.pro/academy/learn/fundamentals/module/${module.slug}`,
      })),
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

          <div className="relative z-10 grid gap-6 p-5 sm:p-7 xl:grid-cols-[minmax(0,1fr)_520px] xl:items-center">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-blue-700">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Beginner foundation path
              </div>

              <h1 className="mt-5 max-w-4xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                AI Fundamentals beginner course.
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                Build the foundation for safe, practical AI use before prompting, tools, agents, automation, and advanced workflow design.
              </p>

              <div className="mt-6 rounded-3xl border border-blue-100 bg-blue-50 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <IconTile>
                      <Target className="h-5 w-5" aria-hidden="true" />
                    </IconTile>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
                        Continue learning
                      </p>
                      <p className="mt-1 text-base font-black text-slate-950">
                        {nextTarget.label}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Complete each lesson check to unlock the next step and update your Academy progress.
                      </p>
                    </div>
                  </div>

                  <Link
                    href={nextTarget.href}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-sm shadow-blue-900/20 transition hover:bg-blue-700"
                  >
                    Continue learning
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-600 to-[#0736db] p-5 text-white shadow-2xl shadow-blue-900/25">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-100">
                Course progress
              </p>
              <div className="mt-4 rounded-3xl border border-white/15 bg-white/10 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-bold text-blue-50">Overall progress</p>
                  <p className="text-3xl font-black text-white">{courseProgress}%</p>
                </div>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-white"
                    style={{ width: `${courseProgress}%` }}
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {metrics.map((metric) => (
                  <article key={metric.label} className="rounded-3xl border border-white/15 bg-white/10 p-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-blue-700">
                        {metric.icon}
                      </span>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-blue-100">
                          {metric.label}
                        </p>
                        <p className="text-2xl font-black text-white">{metric.value}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-blue-50">{metric.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <RouteRail modules={modules} completedLessonIds={completedLessonIds} />

        <section className="mt-5 grid gap-3 md:grid-cols-4">
          <MethodCard
            icon={<ShieldCheck className="h-5 w-5" aria-hidden="true" />}
            title="Understand"
            detail="Build the concept before moving into tools and workflows."
            tone="blue"
          />
          <MethodCard
            icon={<FileQuestion className="h-5 w-5" aria-hidden="true" />}
            title="Check"
            detail="Sign off understanding before the next lesson or module opens."
            tone="amber"
          />
          <MethodCard
            icon={<Code2 className="h-5 w-5" aria-hidden="true" />}
            title="Practise"
            detail="Use practice feedback to improve the input, not just read the lesson."
            tone="indigo"
          />
          <MethodCard
            icon={<Trophy className="h-5 w-5" aria-hidden="true" />}
            title="Prove"
            detail="Complete the route with enough evidence to trust the progress."
            tone="emerald"
          />
        </section>

        <section id="course-modules" className="mt-6">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
                Course route
              </p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Your six-module foundation path.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Preview each module, open lesson titles when needed, and continue from the next available step. Modules unlock as earlier lessons are signed off.
            </p>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            {modules.map((module, index) => (
              <ModuleCard
                key={module.id}
                module={module}
                moduleIndex={index}
                modules={modules}
                completedLessonIds={completedLessonIds}
              />
            ))}
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-900/10">
          <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_300px]">
            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <IconTile>
                  <Trophy className="h-5 w-5" aria-hidden="true" />
                </IconTile>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
                    Final assessment
                  </p>
                  <h2 className="text-2xl font-black tracking-tight text-slate-950">
                    End-of-path skill check
                  </h2>
                </div>
              </div>

              <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600">
                At the end of this learning path, you complete a final assessment that brings together the skills built across the course: safe-use judgement, prompt structure, tool awareness, output validation, and sandbox practice.
              </p>
            </div>

            <div className="border-t border-blue-100 bg-gradient-to-br from-blue-600 to-[#0736db] p-5 text-white sm:p-6 xl:border-l xl:border-t-0">
              <IconTile solid>
                <BadgeCheck className="h-5 w-5" aria-hidden="true" />
              </IconTile>
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

        <footer className="mt-6 flex flex-col gap-3 rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-900/10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold leading-6 text-slate-600">
            Your next action: {nextTarget.label}
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
            >
              Dashboard
            </Link>
            <Link
              href={nextTarget.href}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-sm shadow-blue-900/20 transition hover:bg-blue-700"
            >
              Continue learning
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </footer>
      </div>
    </main>
  )
}
