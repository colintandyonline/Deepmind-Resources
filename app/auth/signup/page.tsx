'use client'

import { useEffect, useState, type FormEvent } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
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
      setMessage('Account created. Redirecting to your dashboard...')
      window.location.href = '/dashboard'
      return
    }

    setStatus('sent')
    setMessage(
      'Account created. Check your email to verify your account, then sign in with your password.'
    )
  }

  return (
    <main className="min-h-screen bg-obsidian px-4 py-10 text-sand sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <section className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Join DeepMind Resources
            </span>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl lg:text-5xl">
              Create your AI competency account
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-8 text-sand/65">
              Create your account with email and password access. DeepMind Resources is built for
              structured AI learning, verified sandbox tasks, and tool intelligence that stays
              useful as AI changes.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setAccountType('individual')}
                className={`rounded-2xl border p-4 text-left shadow-sm transition ${
                  accountType === 'individual'
                    ? 'border-[#123BFF] bg-[#EAF7FF]'
                    : 'border-sand/10 bg-white hover:border-[#123BFF]/30'
                }`}
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#123BFF] text-white">
                  <GraduationCap className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="mt-4 block text-sm font-bold text-sand">Individual</span>
                <span className="mt-1 block text-sm leading-6 text-sand/60">
                  Build AI competency, practise skills, and track your progress.
                </span>
              </button>

              <button
                type="button"
                onClick={() => setAccountType('business')}
                className={`rounded-2xl border p-4 text-left shadow-sm transition ${
                  accountType === 'business'
                    ? 'border-[#123BFF] bg-[#EAF7FF]'
                    : 'border-sand/10 bg-white hover:border-[#123BFF]/30'
                }`}
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#123BFF] text-white">
                  <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="mt-4 block text-sm font-bold text-sand">Business</span>
                <span className="mt-1 block text-sm leading-6 text-sand/60">
                  Start shaping current AI training and tool guidance for your team.
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
                disabled={status === 'loading'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'loading' ? 'Creating account...' : 'Create account'}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              {message ? (
                <div
                  className={`rounded-2xl border px-4 py-3 text-sm ${
                    status === 'error'
                      ? 'border-red-200 bg-red-50 text-red-700'
                      : 'border-[#123BFF]/20 bg-[#EAF7FF] text-sand'
                  }`}
                >
                  {message}
                </div>
              ) : null}
            </form>

            <div className="mt-6 border-t border-sand/10 pt-5 text-sm text-sand/55">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-bold text-[#123BFF] hover:text-[#0A63FF]">
                Sign in
              </Link>
            </div>
          </section>

          <aside className="rounded-3xl border border-sand/10 bg-white/80 p-6 shadow-sm sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Built for current AI skills
            </span>

            <div className="mt-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-sand">Create a secure workspace</h2>
                <p className="mt-2 text-sm leading-7 text-sand/65">
                  Your account gives you password-based access to DeepMind Resources, with email
                  links reserved for verification and recovery flows.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-sand">Build AI competency</h2>
                <p className="mt-2 text-sm leading-7 text-sand/65">
                  The platform is being shaped around practical training, verified sandbox tasks,
                  tool intelligence, and release-aware learning.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-sand">Support individual and business use</h2>
                <p className="mt-2 text-sm leading-7 text-sand/65">
                  Choose an individual account for personal learning or a business account for
                  team-focused AI training and workflow adoption.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-sand/10 bg-[#EAF7FF] p-5">
              <p className="text-sm font-bold text-sand">Email links still matter.</p>
              <p className="mt-2 text-sm leading-7 text-sand/65">
                Password reset, account recovery, and future account-security actions will use
                secure email links. Normal login will happen on-site with email and password.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}