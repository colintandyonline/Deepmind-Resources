import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

async function signOut() {
  'use server'

  const supabase = await createClient()
  await supabase.auth.signOut()

  redirect('/')
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <main className="min-h-screen bg-obsidian px-4 py-8 text-sand sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <header className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-4xl">
              <span className="inline-flex rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                Member dashboard
              </span>

              <h1 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl lg:text-5xl">
                Your AI learning workspace
              </h1>

              <p className="mt-4 max-w-3xl text-base leading-8 text-sand/65">
                Welcome back{user.email ? `, ${user.email}` : ''}. Continue building practical AI
                skills with structured learning, sandbox practice, verified tool intelligence, and
                update-aware training designed to stay useful as AI changes.
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
        </header>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <article className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-7">
            <span className="inline-flex rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
              Academy
            </span>

            <h2 className="mt-5 text-2xl font-bold tracking-tight text-sand">
              Learn AI step by step
            </h2>

            <p className="mt-4 text-sm leading-7 text-sand/65">
              Follow clear learning paths from AI fundamentals through prompt engineering, tool
              selection, workflows, agents, RAG, and validation.
            </p>
          </article>

          <article className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-7">
            <span className="inline-flex rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
              Sandbox
            </span>

            <h2 className="mt-5 text-2xl font-bold tracking-tight text-sand">
              Practise with real tasks
            </h2>

            <p className="mt-4 text-sm leading-7 text-sand/65">
              Build skill through practical exercises for prompts, tool use, debugging, retrieval,
              workflow design, and business automation.
            </p>
          </article>

          <article className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-7">
            <span className="inline-flex rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
              Intelligence
            </span>

            <h2 className="mt-5 text-2xl font-bold tracking-tight text-sand">
              Stay current as AI changes
            </h2>

            <p className="mt-4 text-sm leading-7 text-sand/65">
              Track important AI updates, tool changes, source-backed recommendations, and learning
              refreshers that help you keep your skills relevant.
            </p>
          </article>
        </section>

        <section className="mt-8 rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-start">
            <div>
              <span className="inline-flex rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                Your progress
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand">
                Build practical AI confidence over time
              </h2>

              <p className="mt-4 max-w-3xl text-base leading-8 text-sand/65">
                DeepMindResources is designed around practical skill gain: understand what changed,
                learn what matters, practise the task, and keep your knowledge fresh when AI tools
                and platforms move on.
              </p>
            </div>

            <div className="rounded-2xl border border-sand/10 bg-[#EAF7FF] p-5">
              <h3 className="text-lg font-bold text-sand">What your workspace is for</h3>

              <ul className="mt-4 space-y-3 text-sm leading-7 text-sand/65">
                <li>Follow structured AI learning paths.</li>
                <li>Practise with sandbox tasks and workflow exercises.</li>
                <li>Keep track of important AI tool and platform changes.</li>
                <li>Refresh skills when lessons or tools are updated.</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-2xl bg-[#123BFF] px-5 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
          >
            Return to homepage
          </Link>
        </div>
      </div>
    </main>
  )
}
