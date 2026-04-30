'use client'

import { useEffect, useState, type FormEvent } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Brain,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  LockKeyhole,
  Mail,
  Radar,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type AccountType = 'individual' | 'business'
type FormStatus = 'idle' | 'loading' | 'sent' | 'error'

const MIN_PASSWORD_LENGTH = 8

export default function SignupPage() {
  const [accountType, setAccountType] = useState<AccountType>('individual')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const searchParams = new URLSearchParams(window.location.search)
    const requestedType = searchParams.get('type')

    if (requestedType === 'business') {
      setAccountType('business')
    }
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const cleanFirstName = firstName.trim()
    const cleanLastName = lastName.trim()
    const cleanEmail = email.trim().toLowerCase()
    const cleanCompanyName = companyName.trim()
    const cleanJobTitle = jobTitle.trim()

    if (!cleanFirstName || !cleanLastName || !cleanEmail) {
      setStatus('error')
      setMessage('Enter your first name, last name, and email address to continue.')
      return
    }

    if (accountType === 'business' && !cleanCompanyName) {
      setStatus('error')
      setMessage('Enter your company name to continue with a business account.')
      return
    }

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

    const redirectTo =
      typeof window !== 'undefined'
        ? `${window.location.origin}/auth/callback?next=/dashboard`
        : undefined

    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        emailRedirectTo: redirectTo,
        data: {
          first_name: cleanFirstName,
          last_name: cleanLastName,
          full_name: `${cleanFirstName} ${cleanLastName}`,
          account_type: accountType,
          company_name: accountType === 'business' ? cleanCompanyName : null,
          job_title: accountType === 'business' && cleanJobTitle ? cleanJobTitle : null,
        },
      },
    })

    if (error) {
      setStatus('error')
      setMessage(error.message || 'Something went wrong. Please try again.')
      return
    }

    if (data.session && typeof window !== 'undefined') {
      setStatus('sent')
      setMessage('Account created. Opening your dashboard...')
      window.location.href = '/dashboard'
      return
    }

    setStatus('sent')
    setMessage('Workspace created. Check your email to activate your DeepMind Resources account.')
  }

  const cleanEmailForDisplay = email.trim().toLowerCase()

  return (
    <main className="relative min-h-screen overflow-hidden bg-obsidian px-4 py-8 text-sand sm:px-6 lg:px-8">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at top right, rgba(69, 201, 255, 0.24), transparent 34rem), radial-gradient(circle at top left, rgba(18, 59, 255, 0.14), transparent 30rem), linear-gradient(180deg, #F4FBFF 0%, #EAF7FF 48%, #F4FBFF 100%)',
        }}
        aria-hidden="true"
      />

      {status === 'sent' ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-sand/30 px-4 py-8 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="signup-success-title"
            className="w-full max-w-xl rounded-[2rem] border border-sand/10 bg-white p-6 text-center shadow-2xl sm:p-8"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
              <Mail className="h-8 w-8" aria-hidden="true" />
            </div>

            <span className="mt-6 inline-flex rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
              Workspace activation
            </span>

            <h2
              id="signup-success-title"
              className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl"
            >
              Check your email to activate your workspace.
            </h2>

            <p className="mt-4 text-base leading-8 text-sand/65">
              We have sent an activation email to{' '}
              <span className="font-bold text-sand">{cleanEmailForDisplay || 'your inbox'}</span>.
              Open the message from DeepMind Resources and confirm your email address to complete
              your account setup.
            </p>

            <div className="mt-6 rounded-3xl bg-[#EAF7FF] p-5 text-left">
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#123BFF]" />
                <p className="text-sm leading-7 text-sand/70">
                  After confirmation, return to the sign-in page and access your AI competency
                  workspace with your email and password.
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
              >
                Go to sign in
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="inline-flex items-center justify-center rounded-2xl border border-sand/10 bg-white px-5 py-3 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
              >
                Stay on this page
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center justify-center">
        <div className="grid w-full gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
          <section className="rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="flex items-start justify-between gap-4">
              <Link href="/" className="inline-flex items-center gap-3">
                <span className="inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-[#123BFF] p-2 shadow-sm">
                  <img
                    src="/brand/deepmind-resources-emblem.png"
                    alt="DeepMind Resources"
                    className="h-9 w-9 rounded-xl object-contain"
                  />
                </span>
                <span className="text-base font-bold tracking-tight text-sand">
                  DeepMind Resources
                </span>
              </Link>

              <span className="hidden rounded-full bg-[#EAF7FF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] sm:inline-flex">
                Secure signup
              </span>
            </div>

            <div className="mt-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Join DeepMind Resources
              </span>

              <h1 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight text-sand sm:text-5xl">
                Activate your AI competency workspace.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-8 text-sand/65">
                Create your workspace for structured AI training, verified sandbox practice, and
                release-aware guidance built to keep your skills current as models, tools, and
                workflows change.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setAccountType('individual')}
                className={`rounded-3xl border p-5 text-left shadow-sm transition ${
                  accountType === 'individual'
                    ? 'border-[#123BFF] bg-[#EAF7FF]'
                    : 'border-sand/10 bg-white hover:border-[#123BFF]/30'
                }`}
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#123BFF] text-white">
                  <GraduationCap className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="mt-5 block text-base font-bold text-sand">Individual</span>
                <span className="mt-2 block text-sm leading-7 text-sand/60">
                  Build practical AI competency through structured learning, tool judgement, and
                  sandbox-ready practice.
                </span>
              </button>

              <button
                type="button"
                onClick={() => setAccountType('business')}
                className={`rounded-3xl border p-5 text-left shadow-sm transition ${
                  accountType === 'business'
                    ? 'border-[#123BFF] bg-[#EAF7FF]'
                    : 'border-sand/10 bg-white hover:border-[#123BFF]/30'
                }`}
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#123BFF] text-white">
                  <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="mt-5 block text-base font-bold text-sand">Business</span>
                <span className="mt-2 block text-sm leading-7 text-sand/60">
                  Start shaping a current AI training layer for teams, workflows, tool selection,
                  and production-ready adoption.
                </span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-sand">
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-base text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-sand">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-base text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-sand">
                  {accountType === 'business' ? 'Work email address' : 'Email address'}
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

              {accountType === 'business' ? (
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-semibold text-sand">
                      Company name
                    </label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      autoComplete="organization"
                      required
                      value={companyName}
                      onChange={(event) => setCompanyName(event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-base text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
                    />
                  </div>

                  <div>
                    <label htmlFor="jobTitle" className="block text-sm font-semibold text-sand">
                      Job title
                    </label>
                    <input
                      id="jobTitle"
                      name="jobTitle"
                      type="text"
                      autoComplete="organization-title"
                      value={jobTitle}
                      onChange={(event) => setJobTitle(event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-base text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
                    />
                  </div>
                </div>
              ) : null}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-sand">
                    Password
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
                      className="w-full rounded-2xl border border-sand/10 bg-white py-3 pl-12 pr-4 text-base text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
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
                    Confirm password
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
                      className="w-full rounded-2xl border border-sand/10 bg-white py-3 pl-12 pr-4 text-base text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'loading' || status === 'sent'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'loading' ? 'Creating workspace...' : 'Create workspace'}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <p className="text-xs leading-6 text-sand/50">
                By creating a workspace, you agree to the{' '}
                <Link href="/terms" className="font-bold text-[#123BFF] hover:text-[#0A63FF]">
                  Terms of Service
                </Link>{' '}
                and acknowledge the{' '}
                <Link href="/privacy" className="font-bold text-[#123BFF] hover:text-[#0A63FF]">
                  Privacy Policy
                </Link>
                .
              </p>

              {message && status === 'error' ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {message}
                </div>
              ) : null}
            </form>

            <div className="mt-6 flex flex-col gap-3 border-t border-sand/10 pt-5 text-sm text-sand/55 sm:flex-row sm:items-center sm:justify-between">
              <span>Already have a workspace?</span>
              <Link href="/auth/login" className="font-bold text-[#123BFF] hover:text-[#0A63FF]">
                Sign in
              </Link>
            </div>
          </section>

          <aside className="flex flex-col rounded-[2rem] border border-sand/10 bg-white/88 p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="flex items-start justify-between gap-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Built for current AI skills
              </span>

              <a href="https://deepmindresources.pro" className="shrink-0">
                <img
                  src="/brand/deepmind-resources-emblem.png"
                  alt="DeepMind Resources"
                  className="h-14 w-14 rounded-2xl object-contain shadow-sm"
                />
              </a>
            </div>

            <div className="mt-8 rounded-[1.5rem] bg-[#123BFF] p-6 text-white shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/75">
                Operating layer
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight">
                Start with a workspace designed for AI competency.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/82">
                DeepMind Resources is engineered to turn AI change into structured learning,
                verified sandbox tasks, and production-ready skill development for individuals and
                teams.
              </p>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                <div className="flex gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                    <Radar className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-sand">Release-aware training</h3>
                    <p className="mt-2 text-sm leading-7 text-sand/65">
                      Keep your skill set aligned with meaningful model, tool, and workflow shifts.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                <div className="flex gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                    <Workflow className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-sand">Workflow-first competency</h3>
                    <p className="mt-2 text-sm leading-7 text-sand/65">
                      Learn AI through practical use cases: prompts, tools, retrieval, agents,
                      automation, validation, and review.
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
                    <h3 className="text-lg font-bold text-sand">Secure account recovery</h3>
                    <p className="mt-2 text-sm leading-7 text-sand/65">
                      Email links are used for verification and password recovery. Day-to-day access
                      happens securely on-site with your password.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <div className="rounded-3xl border border-[#123BFF]/20 bg-[#EAF7FF] p-5">
                <p className="text-sm font-bold text-sand">Business accounts are supported.</p>
                <p className="mt-2 text-sm leading-7 text-sand/65">
                  Select Business to prepare a team-focused workspace for professional AI training,
                  tool intelligence, and workflow adoption.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}