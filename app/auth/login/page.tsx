'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const cleanEmail = email.trim().toLowerCase()

    if (!cleanEmail) {
      setStatus('error')
      setMessage('Enter your email address to continue.')
      return
    }

    setStatus('loading')
    setMessage('')

    const supabase = createClient()

    const redirectTo =
      typeof window !== 'undefined'
        ? `${window.location.origin}/auth/callback?next=/dashboard`
        : undefined

    const { error } = await supabase.auth.signInWithOtp({
      email: cleanEmail,
      options: {
        emailRedirectTo: redirectTo,
      },
    })

    if (error) {
      setStatus('error')
      setMessage(error.message || 'Something went wrong. Please try again.')
      return
    }

    setStatus('sent')
    setMessage('Check your email for the sign-in link.')
  }

  return (
    <main className="min-h-screen bg-obsidian px-4 py-10 text-sand sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <section className="rounded-3xl border border-sand/10 bg-white/80 p-6 shadow-sm sm:p-8 lg:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-signal-green">
              DeepMindResources access
            </p>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
              Sign in to continue your AI learning path
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-sand/60 sm:text-base">
              Use your email to access the DeepMindResources dashboard. We will send you a
              secure sign-in link so you can continue with version-aware lessons, sandbox
              practice, and verified AI tool intelligence as these features are introduced.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-sand">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-base text-sand shadow-sm outline-none transition focus:border-signal-green focus:ring-4 focus:ring-signal-green/10"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-2xl bg-signal-green px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-signal-green/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'loading' ? 'Sending sign-in link...' : 'Send secure sign-in link'}
              </button>

              {message ? (
                <div
                  className={`rounded-2xl border px-4 py-3 text-sm ${
                    status === 'error'
                      ? 'border-red-200 bg-red-50 text-red-700'
                      : 'border-signal-green/20 bg-signal-green/10 text-signal-green'
                  }`}
                >
                  {message}
                </div>
              ) : null}
            </form>

            <div className="mt-6 border-t border-sand/10 pt-5 text-sm text-sand/50">
              <Link href="/" className="font-medium text-signal-green hover:text-signal-green/80">
                Return to homepage
              </Link>
            </div>
          </section>

          <aside className="rounded-3xl border border-sand/10 bg-white/70 p-6 shadow-sm sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-signal-green">
              Why sign in?
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <h2 className="text-lg font-bold text-sand">Version-aware learning</h2>
                <p className="mt-2 text-sm leading-6 text-sand/60">
                  DeepMindResources is being built so lesson progress can stay connected to the
                  exact version of training you completed.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-sand">Practical sandbox work</h2>
                <p className="mt-2 text-sm leading-6 text-sand/60">
                  Future sandbox tasks will help you practise prompts, tool use, validation, RAG,
                  workflows, and agentic systems.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-sand">Verified AI updates</h2>
                <p className="mt-2 text-sm leading-6 text-sand/60">
                  The platform is designed to turn trusted AI changes into practical lessons,
                  refreshers, and tool intelligence instead of static course content.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
