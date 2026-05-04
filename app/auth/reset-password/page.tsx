'use client'

import { useEffect, useState, type FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type FormStatus = 'idle' | 'checking' | 'loading' | 'success' | 'error'

const MIN_PASSWORD_LENGTH = 8

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState<FormStatus>('checking')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setStatus('idle')
        return
      }

      setStatus('error')
      setMessage(
        'This reset link is not active. Request a new password reset link from the sign-in page.'
      )
    })
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (password.length < MIN_PASSWORD_LENGTH) {
      setStatus('error')
      setMessage(`Create a password with at least ${MIN_PASSWORD_LENGTH} characters.`)
      return
    }

    if (password !== confirmPassword) {
      setStatus('error')
      setMessage('The passwords do not match. Check them and try again.')
      return
    }

    setStatus('loading')
    setMessage('')

    const supabase = createClient()

    const { error } = await supabase.auth.updateUser({
      password,
    })

    if (error) {
      setStatus('error')
      setMessage(error.message || 'We could not update your password. Request a new reset link.')
      return
    }

    await supabase.auth.signOut()

    setStatus('success')
    setPassword('')
    setConfirmPassword('')
    setMessage('Password updated. Sign in with your new password to return to your workspace.')
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
        <div className="grid w-full gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <section className="rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-sand/10">
                <Image
                  src="/brand/deepmind-resources-emblem.png"
                  alt="DeepMind Resources"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </span>
              <span className="text-base font-bold tracking-tight text-sand">
                DeepMind Resources
              </span>
            </Link>

            <div className="mt-6 rounded-2xl border border-[#123BFF]/15 bg-[#EAF7FF] p-4 text-sm leading-7 text-sand/72">
              <p>
                Password recovery runs only on <span className="font-bold text-sand">deepmindresources.pro</span> and this service is <span className="font-bold text-sand">not affiliated with Google DeepMind</span>.
              </p>
            </div>

            <div className="mt-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <LockKeyhole className="h-4 w-4" aria-hidden="true" />
                Password recovery
              </span>

              <h1 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl lg:text-5xl">
                Set a new password for your workspace.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-8 text-sand/65">
                Create a new password for your DeepMind Resources account. Once updated, you can
                sign in securely and return to your AI competency workspace.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-sand">
                  New password
                </label>
                <div className="relative mt-2">
                  <LockKeyhole
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-sand/35"
                    aria-hidden="true"
                  />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={MIN_PASSWORD_LENGTH}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    disabled={status === 'checking' || status === 'loading' || status === 'success'}
                    className="w-full rounded-2xl border border-sand/10 bg-white py-3 pl-12 pr-4 text-base text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10 disabled:cursor-not-allowed disabled:bg-sand/5"
                  />
                </div>
                <p className="mt-2 text-xs leading-5 text-sand/45">
                  Use at least {MIN_PASSWORD_LENGTH} characters.
                </p>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-sand"
                >
                  Confirm new password
                </label>
                <div className="relative mt-2">
                  <LockKeyhole
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-sand/35"
                    aria-hidden="true"
                  />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={MIN_PASSWORD_LENGTH}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    disabled={status === 'checking' || status === 'loading' || status === 'success'}
                    className="w-full rounded-2xl border border-sand/10 bg-white py-3 pl-12 pr-4 text-base text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10 disabled:cursor-not-allowed disabled:bg-sand/5"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'checking' || status === 'loading' || status === 'success'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'checking'
                  ? 'Checking reset link...'
                  : status === 'loading'
                    ? 'Updating password...'
                    : 'Update password'}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              {message ? (
                <div
                  className={`rounded-2xl border px-4 py-3 text-sm ${
                    status === 'success'
                      ? 'border-[#123BFF]/20 bg-[#EAF7FF] text-sand'
                      : 'border-red-200 bg-red-50 text-red-700'
                  }`}
                >
                  {message}
                </div>
              ) : null}
            </form>

            <div className="mt-6 flex flex-col gap-3 border-t border-sand/10 pt-5 text-sm text-sand/55 sm:flex-row sm:items-center sm:justify-between">
              <span>Ready to return?</span>
              <Link href="/auth/login" className="font-bold text-[#123BFF] hover:text-[#0A63FF]">
                Sign in
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-sand/55">
              <Link href="/privacy" className="font-semibold text-[#123BFF] hover:text-[#0A63FF]">
                Privacy
              </Link>
              <Link href="/terms" className="font-semibold text-[#123BFF] hover:text-[#0A63FF]">
                Terms
              </Link>
              <Link href="/contact" className="font-semibold text-[#123BFF] hover:text-[#0A63FF]">
                Contact support
              </Link>
              <a href="mailto:support@deepmindresources.pro" className="font-semibold text-[#123BFF] hover:text-[#0A63FF]">
                support@deepmindresources.pro
              </a>
            </div>
          </section>

          <aside className="rounded-[2rem] border border-sand/10 bg-white/88 p-6 shadow-sm sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Secure recovery
              </span>

              <a href="https://deepmindresources.pro" className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sand/10">
                <Image
                  src="/brand/deepmind-resources-emblem.png"
                  alt="DeepMind Resources"
                  fill
                  sizes="56px"
                  className="object-contain p-1.5"
                />
              </a>
            </div>

            <div className="mt-8 rounded-[1.5rem] bg-[#123BFF] p-6 text-white shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/75">
                Account protection
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight">
                Recovery links are for sensitive account actions.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/82">
                Normal access happens on-site with your password. Email links are reserved for
                verification, recovery, password resets, and future security actions.
              </p>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                <div className="flex gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-sand">Choose a fresh password</h3>
                    <p className="mt-2 text-sm leading-7 text-sand/65">
                      Use a new password that is not shared with other accounts.
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
                    <h3 className="text-lg font-bold text-sand">Return to your workspace</h3>
                    <p className="mt-2 text-sm leading-7 text-sand/65">
                      After updating your password, sign in to continue your AI competency path.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}