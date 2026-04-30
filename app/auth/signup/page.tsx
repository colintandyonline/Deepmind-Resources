'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { ArrowRight, BriefcaseBusiness, GraduationCap, ShieldCheck, Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type AccountType = 'individual' | 'business'
type FormStatus = 'idle' | 'loading' | 'sent' | 'error'

export default function SignupPage() {
  const [accountType, setAccountType] = useState<AccountType>('individual')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [message, setMessage] = useState('')

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
        shouldCreateUser: true,
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

    setStatus('sent')
    setMessage('Check your email for your secure sign-in link.')
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
              Start building professional AI skills
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-8 text-sand/65">
              Create your account to access structured AI learning, practical sandbox work, and
              tool intelligence designed for people and teams who want to stay current as AI
              changes.
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
                  Learn AI, practise skills, and track your progress.
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
                  Explore AI training and tool guidance for your team.
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
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-base text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
                />
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

              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'loading' ? 'Sending secure link...' : 'Create account'}
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
                <h2 className="text-xl font-bold text-sand">Learn what matters now</h2>
                <p className="mt-2 text-sm leading-7 text-sand/65">
                  DeepMind Resources is designed around AI training that can stay current as tools,
                  models, workflows, and business use cases change.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-sand">Practise with purpose</h2>
                <p className="mt-2 text-sm leading-7 text-sand/65">
                  The platform is being shaped around practical sandbox tasks for prompts, tool
                  use, validation, workflows, automation, and agentic systems.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-sand">Choose tools with confidence</h2>
                <p className="mt-2 text-sm leading-7 text-sand/65">
                  Tool intelligence and comparisons help individuals and teams understand which AI
                  tools fit real scenarios, not just which tools are trending.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-sand/10 bg-[#EAF7FF] p-5">
              <p className="text-sm font-bold text-sand">Professional AI learning starts here.</p>
              <p className="mt-2 text-sm leading-7 text-sand/65">
                Use your account to build skills, follow updates, and prepare for practical AI work
                on deepmindresources.pro.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
