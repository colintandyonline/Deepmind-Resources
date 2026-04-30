'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type FormStatus = 'idle' | 'loading' | 'error'
type ResetStatus = 'idle' | 'loading' | 'sent' | 'error'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [message, setMessage] = useState('')
  const [isResetOpen, setIsResetOpen] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetStatus, setResetStatus] = useState<ResetStatus>('idle')
  const [resetMessage, setResetMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const cleanEmail = email.trim().toLowerCase()

    if (!cleanEmail || !password) {
      setStatus('error')
      setMessage('Enter your email address and password to sign in.')
      return
    }

    setStatus('loading')
    setMessage('')

    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    })

    if (error) {
      setStatus('error')
      setMessage(
        'We could not sign you in with those details. Check your email and password, or reset your password.'
      )
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  function openResetModal() {
    setResetEmail(email.trim().toLowerCase())
    setResetStatus('idle')
    setResetMessage('')
    setIsResetOpen(true)
  }

  async function handlePasswordReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const cleanResetEmail = resetEmail.trim().toLowerCase()

    if (!cleanResetEmail) {
      setResetStatus('error')
      setResetMessage('Enter the email address connected to your account.')
      return
    }

    setResetStatus('loading')
    setResetMessage('')

    const supabase = createClient()

    const redirectTo =
      typeof window !== 'undefined'
        ? `${window.location.origin}/auth/reset-password`
        : undefined

    const { error } = await supabase.auth.resetPasswordForEmail(cleanResetEmail, {
      redirectTo,
    })

    if (error) {
      setResetStatus('error')
      setResetMessage(error.message || 'We could not send the reset email. Please try again.')
      return
    }

    setResetStatus('sent')
    setResetMessage('Password reset link sent. Check your email to continue.')
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-obsidian px-4 py-10 text-sand sm:px-6 lg:px-8">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at top right, rgba(69, 201, 255, 0.24), transparent 34rem), radial-gradient(circle at top left, rgba(18, 59, 255, 0.14), transparent 30rem), linear-gradient(180deg, #F4FBFF 0%, #EAF7FF 48%, #F4FBFF 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full gap-8 lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
          <section className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#123BFF] text-white shadow-sm">
                <Brain className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="text-base font-bold tracking-tight text-sand">
                DeepMind Resources
              </span>
            </Link>

            <div className="mt-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <LockKeyhole className="h-4 w-4" aria-hidden="true" />
                Secure sign in
              </span>

              <h1 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl lg:text-5xl">
                Sign in to your AI competency workspace.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-8 text-sand/65">
                Access your DeepMind Resources dashboard with your email and password. Your
                workspace connects structured AI learning, verified sandbox practice, and
                release-aware training.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-sand">
                  Email address
                </label>
                <div className="relative mt-2">
                  <Mail
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-sand/35"
                    aria-hidden="true"
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-sand/10 bg-white py-3 pl-12 pr-4 text-base text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor="password" className="block text-sm font-semibold text-sand">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={openResetModal}
                    className="text-sm font-bold text-[#123BFF] hover:text-[#0A63FF]"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative mt-2">
                  <LockKeyhole
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-sand/35"
                    aria-hidden="true"
                  />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-2xl border border-sand/10 bg-white py-3 pl-12 pr-4 text-base text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'loading' ? 'Signing in...' : 'Sign in'}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              {message ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {message}
                </div>
              ) : null}
            </form>

            <div className="mt-6 border-t border-sand/10 pt-5 text-sm text-sand/55">
              New to DeepMind Resources?{' '}
              <Link href="/auth/signup" className="font-bold text-[#123BFF] hover:text-[#0A63FF]">
                Create an account
              </Link>
            </div>
          </section>

          <aside className="rounded-3xl border border-sand/10 bg-white/80 p-6 shadow-sm sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Account access
            </span>

            <div className="mt-6 space-y-5">
              <div className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                <div className="flex gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                    <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-sand">Secure workspace access</h2>
                    <p className="mt-2 text-sm leading-7 text-sand/65">
                      Sign in directly with your password. Recovery emails are reserved for
                      verification and account reset actions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                <div className="flex gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                    <Brain className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-sand">AI competency dashboard</h2>
                    <p className="mt-2 text-sm leading-7 text-sand/65">
                      Your dashboard is the protected layer for learning progress, account details,
                      and future verified sandbox activity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                <div className="flex gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-sand">Password recovery</h2>
                    <p className="mt-2 text-sm leading-7 text-sand/65">
                      If you forget your password, request a secure reset email and return to your
                      workspace with a new password.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-[#123BFF]/20 bg-[#EAF7FF] p-5">
              <p className="text-sm font-bold text-sand">Built for current AI skills.</p>
              <p className="mt-2 text-sm leading-7 text-sand/65">
                DeepMind Resources is designed to connect structured learning, tool intelligence,
                and verified sandbox practice into one professional AI training workspace.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {isResetOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-sand/25 px-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-password-title"
            className="w-full max-w-lg rounded-[2rem] border border-sand/10 bg-white p-6 text-sand shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#123BFF] text-white shadow-sm">
                <LockKeyhole className="h-7 w-7" aria-hidden="true" />
              </span>
              <button
                type="button"
                onClick={() => setIsResetOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-sand/10 text-sand/45 transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                aria-label="Close password reset"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <h2 id="reset-password-title" className="mt-6 text-2xl font-bold tracking-tight">
              Reset your password.
            </h2>

            <p className="mt-3 text-sm leading-7 text-sand/65">
              Enter the email address connected to your DeepMind Resources account. We will send a
              secure reset link using the branded recovery email.
            </p>

            <form onSubmit={handlePasswordReset} className="mt-6 space-y-4">
              <div>
                <label htmlFor="resetEmail" className="block text-sm font-semibold text-sand">
                  Account email
                </label>
                <div className="relative mt-2">
                  <Mail
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-sand/35"
                    aria-hidden="true"
                  />
                  <input
                    id="resetEmail"
                    name="resetEmail"
                    type="email"
                    autoComplete="email"
                    required
                    value={resetEmail}
                    onChange={(event) => setResetEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-sand/10 bg-white py-3 pl-12 pr-4 text-base text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={resetStatus === 'loading'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {resetStatus === 'loading' ? 'Sending reset link...' : 'Send reset link'}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              {resetMessage ? (
                <div
                  className={`rounded-2xl border px-4 py-3 text-sm ${
                    resetStatus === 'error'
                      ? 'border-red-200 bg-red-50 text-red-700'
                      : 'border-[#123BFF]/20 bg-[#EAF7FF] text-sand'
                  }`}
                >
                  {resetMessage}
                </div>
              ) : null}
            </form>
          </div>
        </div>
      ) : null}
    </main>
  )
}