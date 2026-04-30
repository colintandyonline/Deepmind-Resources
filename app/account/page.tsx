import Link from 'next/link'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import {
  ArrowRight,
  BadgeCheck,
  Brain,
  BriefcaseBusiness,
  CheckCircle2,
  CreditCard,
  KeyRound,
  Layers,
  Mail,
  ShieldCheck,
  User,
  Users,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

type ProfileRecord = Record<string, unknown> | null

function readString(source: ProfileRecord | undefined, key: string) {
  const value = source?.[key]

  return typeof value === 'string' && value.trim() ? value.trim() : null
}

function readBoolean(source: ProfileRecord | undefined, key: string) {
  const value = source?.[key]

  return typeof value === 'boolean' ? value : null
}

function cleanFormString(value: FormDataEntryValue | null) {
  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()

  return trimmed ? trimmed : null
}

function formatAccountType(value: string | null) {
  if (value === 'business') {
    return 'Business'
  }

  if (value === 'individual') {
    return 'Individual'
  }

  return 'Individual'
}

async function updateAccountProfile(formData: FormData) {
  'use server'

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const firstName = cleanFormString(formData.get('first_name'))
  const lastName = cleanFormString(formData.get('last_name'))
  const displayName = cleanFormString(formData.get('display_name'))
  const jobTitle = cleanFormString(formData.get('job_title'))
  const companyName = cleanFormString(formData.get('company_name'))
  const timezone = cleanFormString(formData.get('timezone'))
  const marketingEmailOptIn = formData.get('marketing_email_opt_in') === 'on'

  const { error } = await supabase
    .from('user_profiles')
    .update({
      first_name: firstName,
      last_name: lastName,
      display_name: displayName,
      job_title: jobTitle,
      company_name: companyName,
      timezone,
      marketing_email_opt_in: marketingEmailOptIn,
      onboarding_status: 'profile_complete',
      onboarding_completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/account')
  redirect('/account')
}

async function signOut() {
  'use server'

  const supabase = await createClient()
  await supabase.auth.signOut()

  redirect('/')
}

export default async function AccountPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle()

  const profileRecord = (profile ?? null) as ProfileRecord
  const metadata = (user.user_metadata ?? {}) as ProfileRecord

  const firstName = readString(profileRecord, 'first_name') ?? readString(metadata, 'first_name')
  const lastName = readString(profileRecord, 'last_name') ?? readString(metadata, 'last_name')
  const displayName =
    readString(profileRecord, 'display_name') ??
    readString(metadata, 'full_name') ??
    [firstName, lastName].filter(Boolean).join(' ') ??
    null

  const accountType =
    readString(profileRecord, 'account_type') ?? readString(metadata, 'account_type') ?? 'individual'

  const companyName =
    readString(profileRecord, 'company_name') ?? readString(metadata, 'company_name')

  const jobTitle = readString(profileRecord, 'job_title') ?? readString(metadata, 'job_title')
  const timezone = readString(profileRecord, 'timezone')
  const marketingEmailOptIn = readBoolean(profileRecord, 'marketing_email_opt_in') ?? true

  const currentLevel = readString(profileRecord, 'current_level') ?? 'AI Beginner'
  const email = user.email ?? 'No email found'
  const emailConfirmed = Boolean(user.email_confirmed_at)

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

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <header className="rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <User className="h-4 w-4" aria-hidden="true" />
                  Account
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF7FF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  Secure workspace
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl lg:text-5xl">
                Manage your DeepMind Resources account.
              </h1>

              <p className="mt-4 max-w-3xl text-base leading-8 text-sand/65">
                Your account is the control layer for profile details, secure access, business
                workspace settings, subscriptions, and future AI competency progress.
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

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                  Profile settings
                </span>

                <h2 className="mt-5 text-2xl font-bold tracking-tight text-sand">
                  {displayName || 'Your profile'}
                </h2>

                <p className="mt-3 text-sm leading-7 text-sand/65">
                  Keep your profile details current so DeepMind Resources can shape the account
                  experience around your individual or business training context.
                </p>
              </div>

              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                <Brain className="h-7 w-7" aria-hidden="true" />
              </span>
            </div>

            <form action={updateAccountProfile} className="mt-7 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-semibold text-sand">
                    First name
                  </label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    autoComplete="given-name"
                    defaultValue={firstName ?? ''}
                    className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-base text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
                  />
                </div>

                <div>
                  <label htmlFor="last_name" className="block text-sm font-semibold text-sand">
                    Last name
                  </label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    autoComplete="family-name"
                    defaultValue={lastName ?? ''}
                    className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-base text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="display_name" className="block text-sm font-semibold text-sand">
                  Display name
                </label>
                <input
                  id="display_name"
                  name="display_name"
                  type="text"
                  autoComplete="name"
                  defaultValue={displayName ?? ''}
                  className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-base text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
                />
                <p className="mt-2 text-xs leading-5 text-sand/45">
                  This is the name used across your DeepMind Resources workspace.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="company_name" className="block text-sm font-semibold text-sand">
                    Company name
                  </label>
                  <input
                    id="company_name"
                    name="company_name"
                    type="text"
                    autoComplete="organization"
                    defaultValue={companyName ?? ''}
                    className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-base text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
                  />
                </div>

                <div>
                  <label htmlFor="job_title" className="block text-sm font-semibold text-sand">
                    Job title
                  </label>
                  <input
                    id="job_title"
                    name="job_title"
                    type="text"
                    autoComplete="organization-title"
                    defaultValue={jobTitle ?? ''}
                    className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-base text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="timezone" className="block text-sm font-semibold text-sand">
                  Timezone
                </label>
                <input
                  id="timezone"
                  name="timezone"
                  type="text"
                  placeholder="Europe/London"
                  defaultValue={timezone ?? ''}
                  className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-base text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
                />
              </div>

              <label className="flex items-start gap-3 rounded-2xl border border-sand/10 bg-[#EAF7FF] p-4">
                <input
                  type="checkbox"
                  name="marketing_email_opt_in"
                  defaultChecked={marketingEmailOptIn}
                  className="mt-1 h-4 w-4 rounded border-sand/20 text-[#123BFF]"
                />
                <span>
                  <span className="block text-sm font-bold text-sand">
                    Receive product and training updates
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-sand/65">
                    Get release-aware learning updates, product notes, and future training alerts.
                    Account security emails will still be sent when needed.
                  </span>
                </span>
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF] sm:w-auto"
              >
                Save account details
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </article>

          <aside className="space-y-6">
            <article className="rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Account identity
              </span>

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-sand/10 bg-white p-4 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                    Email
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-sand">{email}</p>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        emailConfirmed
                          ? 'bg-[#EAF7FF] text-[#123BFF]'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {emailConfirmed ? 'Verified' : 'Verification pending'}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-sand/10 bg-white p-4 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                    Account type
                  </p>
                  <p className="mt-2 text-sm font-semibold text-sand">
                    {formatAccountType(accountType)}
                  </p>
                </div>

                <div className="rounded-2xl border border-sand/10 bg-white p-4 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                    Current level
                  </p>
                  <p className="mt-2 text-sm font-semibold text-sand">{currentLevel}</p>
                </div>
              </div>
            </article>

            <article className="rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
                Workspace
              </span>

              <h2 className="mt-5 text-2xl font-bold tracking-tight text-sand">
                {accountType === 'business'
                  ? 'Business workspace'
                  : 'Individual AI competency workspace'}
              </h2>

              <p className="mt-3 text-sm leading-7 text-sand/65">
                Your workspace will connect learning paths, subscriptions, course progress,
                achievements, and future business team access as the platform expands.
              </p>

              <div className="mt-6 rounded-3xl bg-[#123BFF] p-5 text-white shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/75">
                  Operating layer
                </p>
                <h3 className="mt-3 text-xl font-bold tracking-tight">
                  Account settings stay here, not scattered across the sidebar.
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/82">
                  Profile, security, email preferences, business details, team access, and billing
                  will be organised inside this account area as each system is added.
                </p>
              </div>
            </article>
          </aside>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <article className="rounded-3xl border border-sand/10 bg-white/92 p-6 shadow-sm">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
              <KeyRound className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-xl font-bold tracking-tight text-sand">Security</h2>
            <p className="mt-3 text-sm leading-7 text-sand/65">
              Password changes and sensitive account actions will live here. Reset links remain
              reserved for recovery and verification.
            </p>
          </article>

          <article className="rounded-3xl border border-sand/10 bg-white/92 p-6 shadow-sm">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
              <CreditCard className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-xl font-bold tracking-tight text-sand">Subscription</h2>
            <p className="mt-3 text-sm leading-7 text-sand/65">
              Billing, access level, subscription status, and plan management will connect here
              once monetisation is added.
            </p>
          </article>

          <article className="rounded-3xl border border-sand/10 bg-white/92 p-6 shadow-sm">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
              <Users className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-xl font-bold tracking-tight text-sand">Team access</h2>
            <p className="mt-3 text-sm leading-7 text-sand/65">
              Business users later gain company profile controls, team members, permissions, and
              training-management settings.
            </p>
          </article>
        </section>

        <section className="mt-8 rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-start">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <Layers className="h-4 w-4" aria-hidden="true" />
                Future account layers
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand">
                Built to support courses, levels, achievements, and subscriptions.
              </h2>

              <p className="mt-4 max-w-3xl text-base leading-8 text-sand/65">
                The account page is the foundation for the next product layer. Dashboard data,
                course completions, skill levels, sandbox records, business team access, and
                subscription status should connect back to this central account structure.
              </p>
            </div>

            <div className="grid gap-3">
              <div className="rounded-2xl bg-[#EAF7FF] p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#123BFF]" />
                  <p className="text-sm leading-7 text-sand/70">
                    Profile and security settings stay inside Account.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-[#EAF7FF] p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#123BFF]" />
                  <p className="text-sm leading-7 text-sand/70">
                    Dashboard becomes the live learning and progress workspace.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-[#EAF7FF] p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#123BFF]" />
                  <p className="text-sm leading-7 text-sand/70">
                    Business users later gain team, company, and training-management settings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
          >
            Go to dashboard
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-5 py-3 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
          >
            Return home
          </Link>
        </div>
      </div>
    </main>
  )
}