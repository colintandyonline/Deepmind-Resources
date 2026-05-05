import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  CheckCircle2,
  Circle,
  ClipboardCheck,
  FileQuestion,
  FlaskConical,
  LockKeyhole,
  Route,
  ShieldCheck,
} from 'lucide-react'
import { aiFundamentalsLearningPath } from '@/lib/academy/fundamentals'

export const metadata: Metadata = {
  title: 'AI Fundamentals Modules | DeepMind Resources Academy',
  description:
    'Work through the AI Fundamentals learning modules with structured lessons, knowledge checks, sandbox tasks, and skill evidence.',
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
  return `${sensitivity.charAt(0).toUpperCase()}${sensitivity.slice(1)} update sensitivity`
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

  const moduleOne = modules[0]

  return (
    <main className="min-h-screen bg-[#eef7ff] text-slate-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <header className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-4xl">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
                Academy training
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                AI Fundamentals module map
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                Work through the foundation path in order. Each module has focused lessons, a knowledge check, a
                progress effect, and practical sandbox evidence where required.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm sm:min-w-72">
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
                Signed-in learner
              </p>
              <p className="mt-2 break-words font-black text-slate-950">{user.email ?? 'Authenticated account'}</p>
              <Link
                href="/dashboard"
                className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
              >
                Return to dashboard
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="rounded-3xl border border-blue-700 bg-blue-600 p-4 text-white shadow-sm sm:p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-100">
              Current path
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight">{aiFundamentalsLearningPath.title}</h2>
            <p className="mt-3 text-sm leading-6 text-blue-50">{aiFundamentalsLearningPath.summary}</p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-100">Modules</p>
                <p className="mt-2 text-3xl font-black text-white">{modules.length}</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-100">Lessons</p>
                <p className="mt-2 text-3xl font-black text-white">{totalLessons}</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-100">Required sandbox</p>
                <p className="mt-2 text-3xl font-black text-white">{requiredSandboxTasks}</p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/15 bg-white/10 p-4">
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-100">
                Next training action
              </p>
              <p className="mt-2 text-lg font-black text-white">
                Module 1: {moduleOne?.title ?? 'AI Orientation and Baseline'}
              </p>
              <p className="mt-2 text-sm leading-6 text-blue-50">
                Start with orientation, baseline confidence, and the learning model before the first required sandbox
                evidence appears in Module 2.
              </p>
            </div>
          </aside>

          <section className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">
                  Learning sequence
                </p>
                <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
                  Modules, checks, and sandbox evidence
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-600">
                Reading alone does not complete this path. Progress is earned through lesson work, checks, sandbox
                evidence, and the final skill assessment.
              </p>
            </div>

            <div className="mt-5 space-y-3">
              {modules.map((module) => {
                const isFirstModule = module.moduleNumber === 1
                const sandboxRequired =
                  module.sandboxTask.requirement === 'required' ||
                  module.sandboxTask.requirement === 'final_required'

                return (
                  <article
                    key={module.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                      <div className="flex gap-4">
                        <span
                          className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-black ${
                            isFirstModule
                              ? 'bg-blue-600 text-white'
                              : 'border border-slate-200 bg-white text-slate-500'
                          }`}
                        >
                          {module.moduleNumber}
                        </span>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-black tracking-tight text-slate-950">
                              {module.title}
                            </h3>
                            {isFirstModule ? (
                              <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white">
                                Start here
                              </span>
                            ) : (
                              <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
                                Sequential
                              </span>
                            )}
                          </div>

                          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{module.purpose}</p>

                          <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                            <div className="rounded-xl border border-slate-200 bg-white p-3">
                              <div className="flex items-center gap-2 text-slate-500">
                                <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
                                <p className="text-[11px] font-black uppercase tracking-[0.12em]">Lessons</p>
                              </div>
                              <p className="mt-2 text-sm font-black text-slate-950">{module.lessons.length}</p>
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-white p-3">
                              <div className="flex items-center gap-2 text-slate-500">
                                <FileQuestion className="h-4 w-4" aria-hidden="true" />
                                <p className="text-[11px] font-black uppercase tracking-[0.12em]">Check</p>
                              </div>
                              <p className="mt-2 text-sm font-black text-slate-950">{module.knowledgeCheck.title}</p>
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-white p-3">
                              <div className="flex items-center gap-2 text-slate-500">
                                <FlaskConical className="h-4 w-4" aria-hidden="true" />
                                <p className="text-[11px] font-black uppercase tracking-[0.12em]">Sandbox</p>
                              </div>
                              <p className="mt-2 text-sm font-black text-slate-950">
                                {sandboxRequired ? 'Required' : 'Optional'}
                              </p>
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-white p-3">
                              <div className="flex items-center gap-2 text-slate-500">
                                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                                <p className="text-[11px] font-black uppercase tracking-[0.12em]">Updates</p>
                              </div>
                              <p className="mt-2 text-sm font-black text-slate-950">
                                {formatSensitivity(module.brainUpdateSensitivity)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full rounded-2xl border border-slate-200 bg-white p-3 xl:w-72">
                        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
                          Module outcome
                        </p>
                        <ul className="mt-3 space-y-2">
                          {module.studentOutcome.slice(0, 3).map((outcome) => (
                            <li key={outcome} className="flex gap-2 text-sm leading-5 text-slate-600">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
                        Lesson sequence
                      </p>
                      <div className="mt-3 grid gap-2 md:grid-cols-2">
                        {module.lessons.map((lesson) => (
                          <div key={lesson.id} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
                            <Circle className="mt-1 h-3 w-3 shrink-0 text-blue-600" aria-hidden="true" />
                            <div>
                              <p className="text-sm font-black text-slate-950">{lesson.title}</p>
                              <p className="mt-1 text-xs leading-5 text-slate-600">{lesson.outcome}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm sm:p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">
              Completion evidence
            </p>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
              What this path requires
            </h2>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {aiFundamentalsLearningPath.requiredCompletionEvidence.map((item) => (
                <article key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex gap-3">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
                    <p className="text-sm font-bold leading-6 text-slate-700">{item}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm sm:p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">
              Final assessment
            </p>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
              {aiFundamentalsLearningPath.finalSkillCheck.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {aiFundamentalsLearningPath.finalSkillCheck.scenario}
            </p>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-slate-500">
                <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
                <p className="text-[11px] font-black uppercase tracking-[0.16em]">Passing evidence</p>
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
          </section>
        </section>

        <footer className="flex flex-col gap-3 rounded-3xl border border-blue-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div>
            <p className="text-sm font-black text-slate-950">Next build step</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Create the Module 1 training screen and connect it to the first lesson sequence.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
            >
              Dashboard
            </Link>
            <span className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-500">
              <LockKeyhole className="h-4 w-4" aria-hidden="true" />
              Module screen next
            </span>
          </div>
        </footer>
      </div>
    </main>
  )
}
