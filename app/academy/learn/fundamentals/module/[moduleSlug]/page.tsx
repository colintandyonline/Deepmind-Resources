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
  Sparkles,
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
  module_id: string | null
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

const academyProgressPathId = 'ai-fundamentals'

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

function getLearningProgressModulePrefix(moduleSlug: string) {
  return `${academyProgressPathId}|${moduleSlug}|`
}

function getLearningProgressLessonSlug(moduleId: string | null, moduleSlug: string) {
  if (!moduleId) {
    return null
  }

  const [pathId, rowModuleSlug, lessonSlug] = moduleId.split('|')

  if (pathId !== academyProgressPathId || rowModuleSlug !== moduleSlug || !lessonSlug) {
    return null
  }

  return lessonSlug
}

function getCompletedLessonSlugs(rows: LessonProgressRow[], moduleSlug: string) {
  return new Set(
    rows
      .filter((row) => row.status === 'completed' || row.completed_at)
      .map((row) => getLearningProgressLessonSlug(row.module_id, moduleSlug))
      .filter((lessonSlug): lessonSlug is string => Boolean(lessonSlug)),
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

  return 'Practice task'
}

function getLiveRelevanceLabel(module: Module) {
  if (module.brainUpdateSensitivity === 'high') {
    return 'Watch closely'
  }

  if (module.brainUpdateSensitivity === 'medium') {
    return 'Refresh when needed'
  }

  return 'Stable foundation'
}

function getLessonHref(module: Module, lesson: Lesson) {
  return `/academy/learn/fundamentals/module/${module.slug}/lesson/${lesson.slug}`
}

function isLessonAvailable(module: Module, lessonIndex: number, completedLessonSlugs: Set<string>) {
  if (lessonIndex === 0) {
    return true
  }

  const lesson = module.lessons[lessonIndex]

  if (completedLessonSlugs.has(lesson.slug)) {
    return true
  }

  const previousLesson = module.lessons[lessonIndex - 1]

  return previousLesson ? completedLessonSlugs.has(previousLesson.slug) : false
}

function getNextAvailableLesson(module: Module, completedLessonSlugs: Set<string>) {
  const nextIncompleteLesson = module.lessons.find((lesson, index) => {
    const available = isLessonAvailable(module, index, completedLessonSlugs)

    return available && !completedLessonSlugs.has(lesson.slug)
  })

  return nextIncompleteLesson ?? module.lessons[0] ?? null
}

function getLessonStatusLabel({
  isCompleted,
  isAvailable,
  isFirstLesson,
}: {
  isCompleted: boolean
  isAvailable: boolean
  isFirstLesson: boolean
}) {
  if (isCompleted) {
    return 'Completed'
  }

  if (isAvailable && isFirstLesson) {
    return 'Start here'
  }

  if (isAvailable) {
    return 'Ready next'
  }

  return 'Locked'
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
  tone = 'blue',
}: {
  label: string
  value: string
  detail: string
  icon: ReactNode
  tone?: 'blue' | 'emerald' | 'amber' | 'indigo'
}) {
  const toneClass =
    tone === 'emerald'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
      : tone === 'amber'
        ? 'border-amber-200 bg-amber-50 text-amber-700'
        : tone === 'indigo'
          ? 'border-indigo-200 bg-indigo-50 text-indigo-700'
          : 'border-blue-100 bg-blue-50 text-blue-700'

  return (
    <article className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-900/5">
      <div className="flex items-center gap-3">
        <span className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${toneClass}`}>
          {icon}
        </span>
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-600">
            {label}
          </p>
          <p className="mt-1 text-2xl font-black tracking-tight text-slate-950">{value}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p>
        </div>
      </div>
    </article>
  )
}

function ModuleStep({
  number,
  title,
  detail,
  icon,
}: {
  number: string
  title: string
  detail: string
  icon: ReactNode
}) {
  return (
    <article className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-900/5">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white">
          {number}
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              {icon}
            </span>
            <h2 className="text-base font-black tracking-tight text-slate-950">{title}</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">{detail}</p>
        </div>
      </div>
    </article>
  )
}

function LessonCard({
  lesson,
  module,
  lessonIndex,
  isAvailable,
  isCompleted,
}: {
  lesson: Lesson
  module: Module
  lessonIndex: number
  isAvailable: boolean
  isCompleted: boolean
}) {
  const lessonHref = getLessonHref(module, lesson)
  const statusLabel = getLessonStatusLabel({
    isCompleted,
    isAvailable,
    isFirstLesson: lessonIndex === 0,
  })

  const statusClass = isCompleted
    ? 'bg-emerald-600 text-white'
    : isAvailable
      ? 'bg-blue-600 text-white'
      : 'border border-slate-200 bg-slate-50 text-slate-500'

  const numberClass = isCompleted
    ? 'bg-emerald-600 text-white'
    : isAvailable
      ? 'bg-blue-50 text-blue-700'
      : 'bg-slate-100 text-slate-400'

  return (
    <article className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-900/5">
      <div className="flex items-start gap-4">
        <span
          className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-black ${numberClass}`}
        >
          {isCompleted ? <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> : lesson.sortOrder}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] ${statusClass}`}>
              {statusLabel}
            </span>
            <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-blue-700">
              Lesson {lessonIndex + 1}
            </span>
          </div>

          <h2 className="mt-4 text-xl font-black tracking-tight text-slate-950">{lesson.title}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">{lesson.outcome}</p>

          <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
              What this lesson builds
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              A practical habit you will use inside the lesson: learn the idea, try an input, review feedback, and sign off understanding.
            </p>
          </div>

          <div className="mt-5">
            {isAvailable ? (
              <Link
                href={lessonHref}
                className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-black text-white shadow-sm transition ${
                  isCompleted
                    ? 'bg-emerald-600 shadow-emerald-900/20 hover:bg-emerald-700'
                    : 'bg-blue-600 shadow-blue-900/20 hover:bg-blue-700'
                }`}
              >
                {isCompleted ? 'Review lesson' : 'Start lesson'}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : (
              <span className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-5 py-3 text-sm font-black text-slate-500">
                <LockKeyhole className="h-4 w-4" aria-hidden="true" />
                Complete the previous lesson first
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

  const [{ data: lessonRows, error: lessonError }, { data: sandboxRows }] = await Promise.all([
    supabase
      .from('learning_progress')
      .select('module_id, status, completed_at')
      .eq('user_id', user.id)
      .like('module_id', `${getLearningProgressModulePrefix(module.slug)}%`),
    supabase
      .from('sandbox_attempts')
      .select('status, submitted_at, reviewed_at')
      .eq('user_id', user.id)
      .eq('sandbox_task_id', module.sandboxTask.id),
  ])

  if (lessonError) {
    console.error('[Academy progress] Could not read module lesson progress', {
      moduleSlug: module.slug,
      error: lessonError.message,
    })
    throw new Error(`Could not read module lesson progress: ${lessonError.message}`)
  }

  const lessonProgressRows = (lessonRows ?? []) as LessonProgressRow[]
  const sandboxAttemptRows = (sandboxRows ?? []) as SandboxAttemptRow[]
  const completedLessonSlugs = getCompletedLessonSlugs(lessonProgressRows, module.slug)
  const completedLessonCount = completedLessonSlugs.size
  const submittedSandboxCount = getSubmittedSandboxCount(sandboxAttemptRows)
  const reviewedSandboxCount = getReviewedSandboxCount(sandboxAttemptRows)
  const moduleProgress =
    module.lessons.length > 0 ? Math.round((completedLessonCount / module.lessons.length) * 100) : 0
  const nextLesson = getNextAvailableLesson(module, completedLessonSlugs)
  const nextLessonHref = nextLesson ? getLessonHref(module, nextLesson) : '/academy/learn/fundamentals'
  const isModuleComplete = completedLessonCount === module.lessons.length

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
                Your module progress
              </p>

              <div className="mt-4 rounded-3xl border border-white/15 bg-white/10 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-bold text-blue-50">Lessons signed off</p>
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
                    Lesson progress
                  </p>
                  <p className="mt-2 text-2xl font-black text-white">
                    {completedLessonCount}/{module.lessons.length} signed off
                  </p>
                  <p className="mt-2 text-sm leading-6 text-blue-50">
                    Complete each lesson check to move through this module with evidence.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/15 bg-white/10 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-blue-100">
                    Practice progress
                  </p>
                  <p className="mt-2 text-2xl font-black text-white">
                    {submittedSandboxCount} submitted
                  </p>
                  <p className="mt-2 text-sm leading-6 text-blue-50">
                    {reviewedSandboxCount} practice attempt{reviewedSandboxCount === 1 ? '' : 's'} reviewed.
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
            detail={`${completedLessonCount} signed off`}
            icon={<BookOpenCheck className="h-5 w-5" aria-hidden="true" />}
            tone={isModuleComplete ? 'emerald' : 'blue'}
          />
          <ProgressCard
            label="Module review"
            value={module.knowledgeCheck.blocksProgressUntilPassed ? 'Required' : 'Guided'}
            detail={module.knowledgeCheck.title}
            icon={<FileQuestion className="h-5 w-5" aria-hidden="true" />}
            tone="amber"
          />
          <ProgressCard
            label="Practice"
            value={getSandboxRequirementLabel(module.sandboxTask.requirement)}
            detail={module.sandboxTask.title}
            icon={<Code2 className="h-5 w-5" aria-hidden="true" />}
            tone="indigo"
          />
          <ProgressCard
            label="Live relevance"
            value={getLiveRelevanceLabel(module)}
            detail="This module can be refreshed when AI behaviour changes."
            icon={<ShieldCheck className="h-5 w-5" aria-hidden="true" />}
            tone="emerald"
          />
        </section>

        <section className="mt-5 grid gap-4 md:grid-cols-3">
          <ModuleStep
            number="1"
            title="Learn the idea"
            detail="Open each lesson, work through the teaching, and use the practice input to test the skill."
            icon={<BookOpenCheck className="h-5 w-5" aria-hidden="true" />}
          />
          <ModuleStep
            number="2"
            title="Improve the input"
            detail="Use the feedback to tighten the prompt or workflow before signing off understanding."
            icon={<Sparkles className="h-5 w-5" aria-hidden="true" />}
          />
          <ModuleStep
            number="3"
            title="Prove understanding"
            detail="Complete the lesson check. Your dashboard progress updates when the lesson is completed."
            icon={<BadgeCheck className="h-5 w-5" aria-hidden="true" />}
          />
        </section>

        <section className="mt-6">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
                Module lessons
              </p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Work through the four lessons in order.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Each lesson now has its own teaching, practice input, feedback, and understanding check. Complete one lesson to unlock the next.
            </p>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            {module.lessons.map((lesson, index) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                module={module}
                lessonIndex={index}
                isAvailable={isLessonAvailable(module, index, completedLessonSlugs)}
                isCompleted={completedLessonSlugs.has(lesson.slug)}
              />
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-amber-200 bg-amber-50 p-5 shadow-sm shadow-amber-900/5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-amber-700 shadow-sm">
                <FileQuestion className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-amber-700">
                  Module review
                </p>
                <h2 className="text-2xl font-black tracking-tight text-slate-950">
                  {module.knowledgeCheck.title}
                </h2>
              </div>
            </div>

            <p className="mt-5 text-base leading-8 text-slate-700">{module.knowledgeCheck.purpose}</p>

            <div className="mt-5 rounded-3xl border border-amber-200 bg-white p-4">
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-amber-700">
                Use this to check yourself
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-700">{module.knowledgeCheck.prompt}</p>
            </div>

            <div className="mt-4 rounded-3xl border border-amber-200 bg-white p-4">
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-amber-700">
                You are ready when
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-700">{module.knowledgeCheck.passRule}</p>
            </div>
          </article>

          <article className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-5 shadow-sm shadow-indigo-900/5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-indigo-700 shadow-sm">
                <Code2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-indigo-700">
                  Sandbox practice
                </p>
                <h2 className="text-2xl font-black tracking-tight text-slate-950">
                  {module.sandboxTask.title}
                </h2>
              </div>
            </div>

            <p className="mt-5 text-base leading-8 text-slate-700">{module.sandboxTask.scenario}</p>

            <div className="mt-5 grid gap-3">
              {module.sandboxTask.successCriteria.slice(0, 3).map((criterion) => (
                <div key={criterion} className="rounded-2xl border border-indigo-200 bg-white p-4">
                  <div className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" aria-hidden="true" />
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
              <p className="text-sm font-black text-slate-950">
                {isModuleComplete ? 'Module lessons signed off.' : 'Continue your next available lesson.'}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                {isModuleComplete
                  ? 'Review the module check and sandbox practice, then return to the course overview when you are ready for the next module.'
                  : 'Complete the lesson check to unlock the next step and update your Academy progress.'}
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
              href={nextLessonHref}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-sm shadow-blue-900/20 transition hover:bg-blue-700"
            >
              {isModuleComplete ? 'Review first lesson' : 'Continue lesson'}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </footer>
      </div>
    </main>
  )
}
