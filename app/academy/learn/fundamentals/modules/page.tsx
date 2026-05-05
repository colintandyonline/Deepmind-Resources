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
  Circle,
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
    'A focused learner workspace for the AI Fundamentals module sequence, lesson outcomes, knowledge checks, sandbox evidence, and final skill check.',
  alternates: {
    canonical: 'https://deepmindresources.pro/academy/learn/fundamentals/modules',
  },
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

function formatAccessTier(tier: string) {
  return tier
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function formatSensitivity(sensitivity: string) {
  return `${sensitivity.charAt(0).toUpperCase()}${sensitivity.slice(1)}`
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

  const modules = aiFundamentalsLearningPath.modules
  const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0)
  const requiredSandboxTasks = modules.filter(
    (module) =>
      module.sandboxTask.requirement === 'required' ||
      module.sandboxTask.requirement === 'final_required',
  ).length
  const freePreviewModules = modules.filter((module) => module.accessTier.includes('free_explorer')).length
  const firstModule = modules[0]

  return (
    <main className="min-h-screen bg-[#f3f8ff] text-slate-950">
      <header className="sticky top-0 z-40 border-b border-blue-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-16 w-full max-w-[1800px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-600">
                DeepMind Resources Academy
              </p>
              <h1 className="truncate text-base font-black tracking-tight text-slate-950 sm:text-lg">
                AI Fundamentals module map
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

      <div className="mx-auto grid w-full max-w-[1800px] gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[290px_minmax(0,1fr)_330px] lg:px-8">
        <aside className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-600">
            Current path
          </p>
          <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950">
            {aiFundamentalsLearningPath.title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {aiFundamentalsLearningPath.track}
          </p>

          <div className="mt-4 grid gap-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                Modules
              </p>
              <p className="mt-1 text-2xl font-black text-slate-950">{modules.length}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                Lessons
              </p>
              <p className="mt-1 text-2xl font-black text-slate-950">{totalLessons}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                Required sandbox tasks
              </p>
              <p className="mt-1 text-2xl font-black text-slate-950">{requiredSandboxTasks}</p>
            </div>
          </div>

          <div className="mt-5 border-t border-slate-200 pt-4">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">
              Module sequence
            </p>
            <ol className="mt-3 space-y-2">
              {modules.map((module) => (
                <li key={module.id}>
                  <a
                    href={`#${module.slug}`}
                    className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-sm transition hover:border-blue-200 hover:bg-blue-50"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xs font-black text-white">
                      {module.moduleNumber}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-black leading-5 text-slate-950">{module.title}</span>
                      <span className="mt-1 block text-xs leading-5 text-slate-500">
                        {module.lessons.length} lessons
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <section className="min-w-0 space-y-4">
          <section className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm sm:p-5">
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-600">
                  Learner workspace
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                  Work through the foundation in order.
                </h2>
                <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">
                  This is the training map for the real Academy experience. Each module has a lesson sequence,
                  a knowledge check, a sandbox task where required, and a clear progress effect.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                  Signed in as
                </p>
                <p className="mt-2 break-words text-sm font-black text-slate-950">
                  {user.email ?? 'Authenticated learner'}
                </p>
                <p className="mt-3 text-xs leading-5 text-slate-600">
                  Progress records will attach to this account as lessons, checks, and sandbox attempts are wired.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            {modules.map((module) => {
              const sandboxRequired =
                module.sandboxTask.requirement === 'required' ||
                module.sandboxTask.requirement === 'final_required'
              const isFirstModule = module.moduleNumber === 1

              return (
                <article
                  id={module.slug}
                  key={module.id}
                  className="scroll-mt-24 rounded-3xl border border-blue-100 bg-white p-4 shadow-sm sm:p-5"
                >
                  <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white">
                          {module.moduleNumber}
                        </span>
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                          Module {module.moduleNumber}
                        </span>
                        {isFirstModule ? (
                          <span className="rounded-full border border-blue-100 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                            Start here
                          </span>
                        ) : null}
                      </div>

                      <h3 className="mt-4 text-xl font-black tracking-tight text-slate-950">
                        {module.title}
                      </h3>
                      <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">
                        {module.purpose}
                      </p>

                      <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                          <div className="flex items-center gap-2 text-slate-500">
                            <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
                            <p className="text-[10px] font-black uppercase tracking-[0.14em]">
                              Lessons
                            </p>
                          </div>
                          <p className="mt-2 text-sm font-black text-slate-950">
                            {module.lessons.length}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                          <div className="flex items-center gap-2 text-slate-500">
                            <FileQuestion className="h-4 w-4" aria-hidden="true" />
                            <p className="text-[10px] font-black uppercase tracking-[0.14em]">
                              Check
                            </p>
                          </div>
                          <p className="mt-2 text-sm font-black text-slate-950">
                            {module.knowledgeCheck.blocksProgressUntilPassed ? 'Required' : 'Diagnostic'}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                          <div className="flex items-center gap-2 text-slate-500">
                            <FlaskConical className="h-4 w-4" aria-hidden="true" />
                            <p className="text-[10px] font-black uppercase tracking-[0.14em]">
                              Sandbox
                            </p>
                          </div>
                          <p className="mt-2 text-sm font-black text-slate-950">
                            {sandboxRequired ? 'Required' : 'Optional'}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                          <div className="flex items-center gap-2 text-slate-500">
                            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                            <p className="text-[10px] font-black uppercase tracking-[0.14em]">
                              Update sensitivity
                            </p>
                          </div>
                          <p className="mt-2 text-sm font-black text-slate-950">
                            {formatSensitivity(module.brainUpdateSensitivity)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                          Lesson sequence
                        </p>
                        <ol className="mt-3 grid gap-2 xl:grid-cols-2">
                          {module.lessons.map((lesson) => (
                            <li
                              key={lesson.id}
                              className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3"
                            >
                              <div className="flex gap-3">
                                <Circle className="mt-1 h-3 w-3 shrink-0 text-blue-600" aria-hidden="true" />
                                <div className="min-w-0">
                                  <p className="text-sm font-black leading-5 text-slate-950">
                                    {lesson.title}
                                  </p>
                                  <p className="mt-1 text-xs leading-5 text-slate-600">
                                    {lesson.outcome}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    <aside className="space-y-3">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                          Module outcome
                        </p>
                        <ul className="mt-3 space-y-2">
                          {module.studentOutcome.slice(0, 4).map((outcome) => (
                            <li key={outcome} className="flex gap-2 text-xs leading-5 text-slate-600">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                          Sandbox task
                        </p>
                        <p className="mt-2 text-sm font-black leading-5 text-slate-950">
                          {module.sandboxTask.title}
                        </p>
                        <p className="mt-2 text-xs leading-5 text-slate-600">
                          {module.sandboxTask.scenario}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                          Access
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {module.accessTier.map((tier) => (
                            <span
                              key={tier}
                              className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-black text-blue-700"
                            >
                              {formatAccessTier(tier)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </aside>
                  </div>
                </article>
              )
            })}
          </section>

          <section className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm sm:p-5">
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-600">
                  Completion evidence
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                  What the path requires
                </h2>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {aiFundamentalsLearningPath.requiredCompletionEvidence.map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <div className="flex gap-2">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                        <p className="text-sm font-bold leading-5 text-slate-700">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                  Final assessment
                </p>
                <h3 className="mt-2 text-lg font-black leading-6 text-slate-950">
                  {aiFundamentalsLearningPath.finalSkillCheck.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {aiFundamentalsLearningPath.finalSkillCheck.scenario}
                </p>
                <div className="mt-4 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3">
                  <ClipboardCheck className="h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
                  <p className="text-sm font-black text-slate-950">
                    Award: {aiFundamentalsLearningPath.finalSkillCheck.award}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </section>

        <aside className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-600">
            Learning strategy
          </p>
          <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950">
            Progress is earned, not assumed.
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Lessons introduce the concept. Checks confirm understanding. Sandbox tasks prove practical application.
          </p>

          <div className="mt-5 space-y-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                First module
              </p>
              <p className="mt-2 text-sm font-black text-slate-950">
                {firstModule?.title ?? 'AI Orientation and Baseline'}
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                Start with orientation and baseline confidence before required sandbox evidence begins.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                Free preview modules
              </p>
              <p className="mt-2 text-2xl font-black text-slate-950">{freePreviewModules}</p>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                Preview access builds trust before paid progress, sandbox practice, and deeper training.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                Required evidence
              </p>
              <ul className="mt-3 space-y-2">
                <li className="flex gap-2 text-xs leading-5 text-slate-600">
                  <BookOpenCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                  <span>Lessons completed in sequence</span>
                </li>
                <li className="flex gap-2 text-xs leading-5 text-slate-600">
                  <FileQuestion className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                  <span>Knowledge checks passed</span>
                </li>
                <li className="flex gap-2 text-xs leading-5 text-slate-600">
                  <FlaskConical className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                  <span>Sandbox tasks submitted and passed</span>
                </li>
                <li className="flex gap-2 text-xs leading-5 text-slate-600">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                  <span>Final skill check completed</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                Status
              </p>
              <div className="mt-3 flex items-start gap-3">
                <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
                <p className="text-xs leading-5 text-slate-600">
                  Module screens and lesson screens are separate training views. This page only maps the sequence.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
