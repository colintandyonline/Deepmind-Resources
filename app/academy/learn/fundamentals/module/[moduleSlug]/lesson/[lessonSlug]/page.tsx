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
  Route,
  ShieldCheck,
  Sparkles,
  Target,
} from 'lucide-react'
import { aiFundamentalsLearningPath } from '@/lib/academy/fundamentals'

type LessonPageParams = {
  moduleSlug: string
  lessonSlug: string
}

type LessonPageProps = {
  params: Promise<LessonPageParams>
}

type LessonProgressRow = {
  status: string | null
  progress_percentage: number | null
  completed_at: string | null
  last_seen_at: string | null
}

type Module = (typeof aiFundamentalsLearningPath.modules)[number]
type Lesson = Module['lessons'][number]

type LessonContext = {
  module: Module
  lesson: Lesson
  lessonIndex: number
  flatIndex: number
  previousItem: FlatLessonItem | null
  nextItem: FlatLessonItem | null
}

type FlatLessonItem = {
  module: Module
  lesson: Lesson
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

function getFlatLessons() {
  return aiFundamentalsLearningPath.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({
      module,
      lesson,
    })),
  )
}

function getLessonContext(moduleSlug: string, lessonSlug: string): LessonContext | null {
  const module = aiFundamentalsLearningPath.modules.find((item) => item.slug === moduleSlug)

  if (!module) {
    return null
  }

  const lessonIndex = module.lessons.findIndex((item) => item.slug === lessonSlug)

  if (lessonIndex === -1) {
    return null
  }

  const lesson = module.lessons[lessonIndex]
  const flatLessons = getFlatLessons()
  const flatIndex = flatLessons.findIndex(
    (item) => item.module.slug === module.slug && item.lesson.slug === lesson.slug,
  )

  return {
    module,
    lesson,
    lessonIndex,
    flatIndex,
    previousItem: flatIndex > 0 ? flatLessons[flatIndex - 1] : null,
    nextItem: flatIndex >= 0 && flatIndex < flatLessons.length - 1 ? flatLessons[flatIndex + 1] : null,
  }
}

function getLessonHref(item: FlatLessonItem) {
  return `/academy/learn/fundamentals/module/${item.module.slug}/lesson/${item.lesson.slug}`
}

function getLessonVersionId(lesson: Lesson) {
  return `${lesson.id}-v${lesson.versionNumber}`
}

function getBlockLabel(block: string) {
  return block
    .split('_')
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ')
}

function getPrimaryTeachingCopy(lesson: Lesson) {
  if (lesson.blocks.includes('orientation')) {
    return 'Start by understanding the purpose of the lesson, the skill it supports, and how it connects to the wider AI Fundamentals route.'
  }

  if (lesson.blocks.includes('concept_explanation')) {
    return 'Focus on the core concept first. The goal is not to memorise terminology, but to understand how the idea affects real AI use.'
  }

  if (lesson.blocks.includes('use_case_mapping')) {
    return 'Map the lesson to a real task. A concept becomes useful when you can recognise where it applies and where it does not.'
  }

  if (lesson.blocks.includes('safety_or_validation_note')) {
    return 'Pay attention to the review step. AI output should be checked before it influences decisions, workflows, or business use.'
  }

  return 'Read the lesson outcome, connect it to the practical example, then use the recap to decide whether you are ready to continue.'
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

function LessonSection({
  eyebrow,
  title,
  children,
  icon,
}: {
  eyebrow: string
  title: string
  children: ReactNode
  icon: ReactNode
}) {
  return (
    <section className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-900/10 sm:p-6">
      <div className="flex items-center gap-3">
        <IconTile>{icon}</IconTile>
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
            {eyebrow}
          </p>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">{title}</h2>
        </div>
      </div>

      <div className="mt-5">{children}</div>
    </section>
  )
}

async function completeLesson(formData: FormData) {
  'use server'

  const moduleSlug = formData.get('moduleSlug')
  const lessonSlug = formData.get('lessonSlug')

  if (typeof moduleSlug !== 'string' || typeof lessonSlug !== 'string') {
    throw new Error('Missing lesson route data.')
  }

  const context = getLessonContext(moduleSlug, lessonSlug)

  if (!context) {
    throw new Error('Lesson could not be found.')
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

  const now = new Date().toISOString()
  const nextHref = context.nextItem ? getLessonHref(context.nextItem) : '/academy/learn/fundamentals'

  const { data: existingRows, error: readError } = await supabase
    .from('user_lesson_progress')
    .select('lesson_id')
    .eq('user_id', user.id)
    .eq('lesson_id', context.lesson.id)
    .limit(1)

  if (readError) {
    throw new Error(`Could not read lesson progress: ${readError.message}`)
  }

  if (existingRows && existingRows.length > 0) {
    const { error: updateError } = await supabase
      .from('user_lesson_progress')
      .update({
        lesson_version_id: getLessonVersionId(context.lesson),
        status: 'completed',
        progress_percentage: 100,
        completed_at: now,
        last_seen_at: now,
      })
      .eq('user_id', user.id)
      .eq('lesson_id', context.lesson.id)

    if (updateError) {
      throw new Error(`Could not update lesson progress: ${updateError.message}`)
    }
  } else {
    const { error: insertError } = await supabase.from('user_lesson_progress').insert({
      user_id: user.id,
      lesson_id: context.lesson.id,
      lesson_version_id: getLessonVersionId(context.lesson),
      status: 'completed',
      progress_percentage: 100,
      started_at: now,
      completed_at: now,
      last_seen_at: now,
    })

    if (insertError) {
      throw new Error(`Could not save lesson progress: ${insertError.message}`)
    }
  }

  redirect(nextHref)
}

export function generateStaticParams() {
  return aiFundamentalsLearningPath.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({
      moduleSlug: module.slug,
      lessonSlug: lesson.slug,
    })),
  )
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { moduleSlug, lessonSlug } = await params
  const context = getLessonContext(moduleSlug, lessonSlug)

  if (!context) {
    notFound()
  }

  return {
    title: `${context.lesson.title} | AI Fundamentals Lesson | DeepMind Resources Academy`,
    description: context.lesson.outcome,
    alternates: {
      canonical: `https://deepmindresources.pro/academy/learn/fundamentals/module/${context.module.slug}/lesson/${context.lesson.slug}`,
    },
    openGraph: {
      title: `${context.lesson.title} | AI Fundamentals Lesson`,
      description: context.lesson.outcome,
      url: `https://deepmindresources.pro/academy/learn/fundamentals/module/${context.module.slug}/lesson/${context.lesson.slug}`,
      siteName: 'DeepMind Resources',
      type: 'website',
    },
  }
}

export default async function AIFundamentalsLessonPage({ params }: LessonPageProps) {
  const { moduleSlug, lessonSlug } = await params
  const context = getLessonContext(moduleSlug, lessonSlug)

  if (!context) {
    notFound()
  }

  const { module, lesson, lessonIndex, flatIndex, previousItem, nextItem } = context
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

  const { data: progressRows } = await supabase
    .from('user_lesson_progress')
    .select('status, progress_percentage, completed_at, last_seen_at')
    .eq('user_id', user.id)
    .eq('lesson_id', lesson.id)
    .limit(1)

  const progress = ((progressRows ?? []) as LessonProgressRow[])[0] ?? null
  const isCompleted = progress?.status === 'completed' || Boolean(progress?.completed_at)
  const nextHref = nextItem ? getLessonHref(nextItem) : '/academy/learn/fundamentals'

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: lesson.title,
      description: lesson.outcome,
      position: flatIndex + 1,
      isPartOf: {
        '@type': 'Course',
        name: module.title,
        url: `https://deepmindresources.pro/academy/learn/fundamentals/module/${module.slug}`,
      },
      provider: {
        '@type': 'Organization',
        name: 'DeepMind Resources',
        url: 'https://deepmindresources.pro',
      },
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
        {
          '@type': 'ListItem',
          position: 4,
          name: lesson.title,
          item: `https://deepmindresources.pro/academy/learn/fundamentals/module/${module.slug}/lesson/${lesson.slug}`,
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
              href={`/academy/learn/fundamentals/module/${module.slug}`}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 sm:px-4 sm:text-sm"
            >
              Module
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

          <div className="relative z-10 grid gap-6 p-5 sm:p-7 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-center">
            <div className="min-w-0">
              <Link
                href={`/academy/learn/fundamentals/module/${module.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-blue-700 transition hover:border-blue-200 hover:bg-white"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to module
              </Link>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-white">
                  Lesson {lessonIndex + 1} of {module.lessons.length}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-blue-700">
                  Module {module.moduleNumber}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-slate-600">
                  Version {lesson.versionNumber}
                </span>
              </div>

              <h1 className="mt-5 max-w-4xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                {lesson.title}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                {lesson.outcome}
              </p>
            </div>

            <aside className="rounded-[2rem] border border-blue-700 bg-blue-600 p-5 text-white shadow-2xl shadow-blue-900/25">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-100">
                Lesson status
              </p>

              <div className="mt-4 rounded-3xl border border-white/15 bg-white/10 p-4">
                <div className="flex items-center gap-3">
                  <IconTile solid>
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <BookOpenCheck className="h-5 w-5" aria-hidden="true" />
                    )}
                  </IconTile>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-blue-100">
                      Progress
                    </p>
                    <p className="mt-1 text-2xl font-black text-white">
                      {isCompleted ? 'Completed' : 'In progress'}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-blue-50">
                  {isCompleted
                    ? 'This lesson has a saved completion record.'
                    : 'Complete the lesson action when you are ready to move forward.'}
                </p>
              </div>

              <div className="mt-4 rounded-3xl border border-white/15 bg-white/10 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-blue-100">
                  Next route
                </p>
                <p className="mt-2 text-sm font-bold leading-6 text-white">
                  {nextItem ? nextItem.lesson.title : 'Return to course overview'}
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-5 grid gap-4 md:grid-cols-4">
          <article className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-900/5">
            <IconTile>
              <Target className="h-5 w-5" aria-hidden="true" />
            </IconTile>
            <p className="mt-4 text-[11px] font-black uppercase tracking-[0.16em] text-blue-600">
              Outcome
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
              Understand and apply one clear AI Fundamentals skill.
            </p>
          </article>

          <article className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-900/5">
            <IconTile>
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </IconTile>
            <p className="mt-4 text-[11px] font-black uppercase tracking-[0.16em] text-blue-600">
              Teaching blocks
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
              {lesson.blocks.length} structured lesson sections.
            </p>
          </article>

          <article className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-900/5">
            <IconTile>
              <FileQuestion className="h-5 w-5" aria-hidden="true" />
            </IconTile>
            <p className="mt-4 text-[11px] font-black uppercase tracking-[0.16em] text-blue-600">
              Requirement
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
              {lesson.completionRequirement}
            </p>
          </article>

          <article className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-900/5">
            <IconTile>
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </IconTile>
            <p className="mt-4 text-[11px] font-black uppercase tracking-[0.16em] text-blue-600">
              Review state
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
              {lesson.reviewStatus.replace('_', ' ')}
            </p>
          </article>
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-5">
            <LessonSection
              eyebrow="Lesson teaching"
              title="Understand the core idea"
              icon={<BookOpenCheck className="h-5 w-5" aria-hidden="true" />}
            >
              <p className="text-base leading-8 text-slate-600">{getPrimaryTeachingCopy(lesson)}</p>

              <div className="mt-5 rounded-3xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
                  What this lesson teaches
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-700">{lesson.outcome}</p>
              </div>
            </LessonSection>

            <LessonSection
              eyebrow="Practical example"
              title="See the idea in use"
              icon={<Code2 className="h-5 w-5" aria-hidden="true" />}
            >
              <p className="text-base leading-8 text-slate-600">{lesson.practicalExample}</p>
            </LessonSection>

            <LessonSection
              eyebrow="Common mistake"
              title="Avoid the usual trap"
              icon={<ShieldCheck className="h-5 w-5" aria-hidden="true" />}
            >
              <p className="text-base leading-8 text-slate-600">{lesson.commonMistake}</p>
            </LessonSection>

            <LessonSection
              eyebrow="Quick recap"
              title="Before you continue"
              icon={<BadgeCheck className="h-5 w-5" aria-hidden="true" />}
            >
              <div className="grid gap-3">
                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
                    <p className="text-sm font-semibold leading-6 text-slate-700">
                      You should be able to explain the lesson outcome in your own words.
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
                    <p className="text-sm font-semibold leading-6 text-slate-700">
                      You should be able to connect the practical example to a real AI task.
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
                    <p className="text-sm font-semibold leading-6 text-slate-700">
                      You should be able to avoid the common mistake before moving on.
                    </p>
                  </div>
                </div>
              </div>
            </LessonSection>
          </div>

          <aside className="space-y-5">
            <section className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-900/10">
              <div className="flex items-center gap-3">
                <IconTile>
                  <Route className="h-5 w-5" aria-hidden="true" />
                </IconTile>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
                    Lesson route
                  </p>
                  <h2 className="text-xl font-black tracking-tight text-slate-950">Position in course</h2>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
                    Current module
                  </p>
                  <p className="mt-2 text-sm font-black leading-6 text-slate-950">{module.title}</p>
                </div>

                {previousItem ? (
                  <Link
                    href={getLessonHref(previousItem)}
                    className="block rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:bg-blue-50"
                  >
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
                      Previous lesson
                    </p>
                    <p className="mt-2 text-sm font-black leading-6 text-slate-950">
                      {previousItem.lesson.title}
                    </p>
                  </Link>
                ) : null}

                <Link
                  href={nextHref}
                  className="block rounded-2xl border border-blue-100 bg-blue-50 p-4 transition hover:border-blue-200 hover:bg-white"
                >
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
                    Next lesson
                  </p>
                  <p className="mt-2 text-sm font-black leading-6 text-slate-950">
                    {nextItem ? nextItem.lesson.title : 'Return to course overview'}
                  </p>
                </Link>
              </div>
            </section>

            <section className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-900/10">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
                Lesson blocks
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {lesson.blocks.map((block) => (
                  <span
                    key={block}
                    className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-700"
                  >
                    {getBlockLabel(block)}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-900/10">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
                Complete action
              </p>
              <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950">
                {isCompleted ? 'Lesson complete' : 'Save completion'}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {isCompleted
                  ? 'You can continue to the next lesson or revisit the module overview.'
                  : 'Save this lesson as complete when you have reviewed the teaching, example, mistake, and recap.'}
              </p>

              <form action={completeLesson} className="mt-5">
                <input type="hidden" name="moduleSlug" value={module.slug} />
                <input type="hidden" name="lessonSlug" value={lesson.slug} />
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-sm shadow-blue-900/20 transition hover:bg-blue-700"
                >
                  {isCompleted ? 'Continue to next lesson' : 'Complete lesson'}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>
            </section>
          </aside>
        </section>

        <footer className="mt-6 flex flex-col gap-3 rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-900/10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <IconTile>
              <Route className="h-5 w-5" aria-hidden="true" />
            </IconTile>
            <div>
              <p className="text-sm font-black text-slate-950">Continue your AI Fundamentals path.</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Move through one lesson at a time, then return to the module check and sandbox task.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href={`/academy/learn/fundamentals/module/${module.slug}`}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
            >
              Module overview
            </Link>
            <Link
              href={nextHref}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-sm shadow-blue-900/20 transition hover:bg-blue-700"
            >
              {nextItem ? 'Next lesson' : 'Course overview'}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </footer>
      </div>
    </main>
  )
}
