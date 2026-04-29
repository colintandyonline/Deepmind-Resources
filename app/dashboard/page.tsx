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
    <main className="min-h-screen bg-obsidian px-4 py-10 text-sand sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <header className="rounded-3xl border border-sand/10 bg-white/80 p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-signal-green">
                DeepMindResources dashboard
              </p>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                Welcome back
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-sand/60 sm:text-base">
                You are signed in as {user.email}. This dashboard is the protected starting point
                for version-aware AI lessons, sandbox practice, tool intelligence, and future
                business training features.
              </p>
            </div>

            <form action={signOut}>
              <button
                type="submit"
                className="rounded-2xl border border-sand/10 bg-white px-5 py-3 text-sm font-bold text-sand shadow-sm transition hover:border-signal-green/30 hover:text-signal-green"
              >
                Sign out
              </button>
            </form>
          </div>
        </header>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <article className="rounded-3xl border border-sand/10 bg-white/80 p-6 shadow-sm">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-green">
              Academy
            </p>
            <h2 className="mt-4 text-xl font-bold text-sand">Version-aware learning</h2>
            <p className="mt-3 text-sm leading-6 text-sand/60">
              The database foundation now supports learning paths, modules, lessons, lesson
              versions, and progress tied to the exact lesson version completed.
            </p>
          </article>

          <article className="rounded-3xl border border-sand/10 bg-white/80 p-6 shadow-sm">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-green">
              Sandbox
            </p>
            <h2 className="mt-4 text-xl font-bold text-sand">Practical AI skill practice</h2>
            <p className="mt-3 text-sm leading-6 text-sand/60">
              Sandbox task versions and sandbox attempts are ready in the database, so future
              practice tasks can evolve as AI tools and models change.
            </p>
          </article>

          <article className="rounded-3xl border border-sand/10 bg-white/80 p-6 shadow-sm">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-green">
              Intelligence
            </p>
            <h2 className="mt-4 text-xl font-bold text-sand">Verified AI updates</h2>
            <p className="mt-3 text-sm leading-6 text-sand/60">
              Source tracking, AI update records, tool intelligence, comparison versions, and
              validation reviews are now part of the foundation.
            </p>
          </article>
        </section>

        <section className="mt-8 rounded-3xl border border-sand/10 bg-white/80 p-6 shadow-sm sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-signal-green">
                Current build stage
              </p>

              <h2 className="mt-4 text-2xl font-bold text-sand">
                Database foundation complete, auth shell now starting
              </h2>

              <p className="mt-4 text-sm leading-7 text-sand/60 sm:text-base">
                The next stage is to carefully add account/profile pages, homepage login/logout
                controls, and small seed content without breaking the current front page or turning
                DeepMindResources into a static course website.
              </p>
            </div>

            <div className="rounded-2xl border border-sand/10 bg-white p-5">
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-sand/60">
                Next safe steps
              </h3>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-sand/60">
                <li>1. Add homepage sign-in/sign-out state.</li>
                <li>2. Add account/profile page.</li>
                <li>3. Brand Supabase email templates.</li>
                <li>4. Seed one tiny versioned lesson flow.</li>
                <li>5. Connect public Academy pages later.</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-2xl bg-signal-green px-5 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:bg-signal-green/90"
          >
            Return to homepage
          </Link>
        </div>
      </div>
    </main>
  )
}
