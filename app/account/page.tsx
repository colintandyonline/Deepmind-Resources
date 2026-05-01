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

type AccountPageProps = {
  searchParams?: Promise<{
    save?: string
  }>
}

const learningLevelOptions = [
  'AI Beginner',
  'Practical AI User',
  'AI Workflow Builder',
  'Business AI Lead',
  'Advanced AI Operator',
]

const timezoneOptions = [
  { value: 'Europe/London', label: 'United Kingdom — London' },
  { value: 'Europe/Dublin', label: 'Ireland — Dublin' },
  { value: 'Europe/Paris', label: 'Central Europe — Paris, Berlin, Madrid' },
  { value: 'Europe/Athens', label: 'Eastern Europe — Athens' },
  { value: 'America/New_York', label: 'United States — New York' },
  { value: 'America/Chicago', label: 'United States — Chicago' },
  { value: 'America/Denver', label: 'United States — Denver' },
  { value: 'America/Los_Angeles', label: 'United States — Los Angeles' },
  { value: 'America/Toronto', label: 'Canada — Toronto' },
  { value: 'America/Vancouver', label: 'Canada — Vancouver' },
  { value: 'Australia/Sydney', label: 'Australia — Sydney' },
  { value: 'Australia/Perth', label: 'Australia — Perth' },
  { value: 'Asia/Dubai', label: 'United Arab Emirates — Dubai' },
  { value: 'Asia/Singapore', label: 'Singapore' },
  { value: 'Asia/Tokyo', label: 'Japan — Tokyo' },
  { value: 'Asia/Kolkata', label: 'India — Kolkata' },
]

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

function readMetadataString(source: Record<string, unknown>, key: string) {
  const value = source[key]

  return typeof value === 'string' && value.trim() ? value.trim() : null
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

function formatTimezone(value: string | null) {
  if (!value) {
    return 'Not selected yet'
  }

  const option = timezoneOptions.find((timezoneOption) => timezoneOption.value === value)

  return option?.label ?? value
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

  const { data: existingProfile } = await supabase
    .from('user_profiles')
    .select('account_type')
    .eq('id', user.id)
    .maybeSingle()

  const userMetadata = user.user_metadata ?? {}
  const existingProfileRecord = (existingProfile ?? null) as ProfileRecord

  const firstName = cleanFormString(formData.get('first_name'))
  const lastName = cleanFormString(formData.get('last_name'))
  const displayName = cleanFormString(formData.get('display_name'))
  const jobTitle = cleanFormString(formData.get('job_title'))
  const companyName = cleanFormString(formData.get('company_name'))
  const currentLevel = cleanFormString(formData.get('current_level'))
  const timezone = cleanFormString(formData.get('timezone'))
  const marketingEmailOptIn = formData.get('marketing_email_opt_in') === 'on'

  const accountType =
    readString(existingProfileRecord, 'account_type') ??
    readMetadataString(userMetadata, 'account_type') ??
    'individual'

  const now = new Date().toISOString()

  const profilePayload = {
    id: user.id,
    first_name: firstName,
    last_name: lastName,
    display_name: displayName,
    job_title: jobTitle,
    company_name: companyName,
    account_type: accountType,
    current_level: currentLevel,
    timezone,
    marketing_email_opt_in: marketingEmailOptIn,
    onboarding_status: 'complete',
    onboarding_completed_at: now,
    updated_at: now,
  }

  const { error } = await supabase
    .from('user_profiles')
    .upsert(profilePayload, {
      onConflict: 'id',
    })

  if (error) {
    const fallbackPayload = {
      id: user.id,
      first_name: firstName,
      last_name: lastName,
      display_name: displayName,
      job_title: jobTitle,
      company_name: companyName,
      account_type: accountType,
      marketing_email_opt_in: marketingEmailOptIn,
      onboarding_status: 'complete',
      onboarding_completed_at: now,
      updated_at: now,
    }

    const { error: fallbackError } = await supabase
      .from('user_profiles')
      .upsert(fallbackPayload, {
        onConflict: 'id',
      })

    if (fallbackError) {
      console.error('DeepMind Resources account save failed:', fallbackError.message)
      redirect('/account?save=error')
    }

    console.error('DeepMind Resources account optional fields failed:', error.message)
    revalidatePath('/account')
    redirect('/account?save=partial')
  }

  revalidatePath('/account')
  redirect('/account?save=success')
}

async function signOut() {
  'use server'

  const supabase = await createClient()
  await supabase.auth.signOut()

  redirect('/')
}

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const resolvedSearchParams = await searchParams
  const saveStatus = resolvedSearchParams?.save ?? null

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

  const currentLevel = readString(profileRecord, 'current_level')
  const email = user.email ?? 'No email found'
  const emailConfirmed = Boolean(user.email_confirmed_at)
  const isBrainAdmin = user.email?.trim().toLowerCase() === 'colintandy@gmail.com'

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
                Update your profile, confirm your account identity, manage your communication
                preferences, and keep your learning workspace ready for DeepMind Resources access.
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

        {saveStatus === 'success' ? (
          <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-sm font-semibold leading-7 text-emerald-800 shadow-sm">
            Account details saved.
          </div>
        ) : null}

        {saveStatus === 'partial' ? (
          <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-7 text-amber-800 shadow-sm">
            Your main account details were saved, but the learning level or timezone fields could
            not be saved yet. The account page is still usable.
          </div>
        ) : null}

        {saveStatus === 'error' ? (
          <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-5 text-sm font-semibold leading-7 text-red-800 shadow-sm">
            Your account details could not be saved. Please check the profile table permissions and
            try again.
          </div>
        ) : null}

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
                  Keep your profile details current so your account reflects how you use DeepMind
                  Resources as an individual learner or business user.
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
                  This is the name shown inside your DeepMind Resources workspace.
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
                <label htmlFor="current_level" className="block text-sm font-semibold text-sand">
                  Current AI level
                </label>
                <select
                  id="current_level"
                  name="current_level"
                  defaultValue={currentLevel ?? ''}
                  className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-base text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
                >
                  <option value="">Select your current level</option>
                  {learningLevelOptions.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs leading-5 text-sand/45">
                  Choose the level that best reflects your current confidence with AI tools,
                  workflows, and practical usage.
                </p>
              </div>

              <div>
                <label htmlFor="timezone" className="block text-sm font-semibold text-sand">
                  Timezone
                </label>
                <select
                  id="timezone"
                  name="timezone"
                  defaultValue={timezone ?? ''}
                  className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-base text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
                >
                  <option value="">Select your timezone</option>
                  {timezoneOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs leading-5 text-sand/45">
                  This helps DeepMind Resources show account timing, reminders, and business
                  workspace activity in the right region.
                </p>
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
                    Get DeepMind Resources learning updates, product notes, and training alerts.
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
                  <p className="mt-2 text-sm font-semibold text-sand">
                    {currentLevel || 'Not selected yet'}
                  </p>
                </div>

                <div className="rounded-2xl border border-sand/10 bg-white p-4 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                    Timezone
                  </p>
                  <p className="mt-2 text-sm font-semibold text-sand">
                    {formatTimezone(timezone)}
                  </p>
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
                Your workspace keeps your profile, account type, learning context, and business
                details in one clear place.
              </p>

              <div className="mt-6 rounded-3xl bg-[#123BFF] p-5 text-white shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/75">
                  Account hub
                </p>
                <h3 className="mt-3 text-xl font-bold tracking-tight">
                  Keep your account details accurate and ready to use.
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/82">
                  Use this page to maintain the profile and workspace details DeepMind Resources
                  uses for your account experience.
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
              Your password and sign-in access are handled securely through DeepMind Resources
              authentication. Use the reset-password flow if you need to recover access.
            </p>
          </article>

          <article className="rounded-3xl border border-sand/10 bg-white/92 p-6 shadow-sm">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
              <CreditCard className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-xl font-bold tracking-tight text-sand">Plan and access</h2>
            <p className="mt-3 text-sm leading-7 text-sand/65">
              Your account type helps determine the learning, sandbox, and business workspace
              experience available to you.
            </p>
          </article>

          <article className="rounded-3xl border border-sand/10 bg-white/92 p-6 shadow-sm">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
              <Users className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-xl font-bold tracking-tight text-sand">Business details</h2>
            <p className="mt-3 text-sm leading-7 text-sand/65">
              Business users can keep company and role information current so DeepMind Resources
              can support team-ready AI training and workspace context.
            </p>
          </article>
        </section>

        <section className="mt-8 rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-start">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <Layers className="h-4 w-4" aria-hidden="true" />
                Account support
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand">
                Need help with your DeepMind Resources account?
              </h2>

              <p className="mt-4 max-w-3xl text-base leading-8 text-sand/65">
                For account access, profile questions, business workspace support, or privacy
                requests, contact the right DeepMind Resources inbox and we will route your request
                clearly.
              </p>
            </div>

            <div className="grid gap-3">
              <div className="rounded-2xl bg-[#EAF7FF] p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#123BFF]" />
                  <p className="text-sm leading-7 text-sand/70">
                    Account and learning support: support@deepmindresources.pro
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-[#EAF7FF] p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#123BFF]" />
                  <p className="text-sm leading-7 text-sand/70">
                    Business training enquiries: business@deepmindresources.pro
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-[#EAF7FF] p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#123BFF]" />
                  <p className="text-sm leading-7 text-sand/70">
                    Privacy and data requests: privacy@deepmindresources.pro
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

          {isBrainAdmin ? (
            <Link
              href="/brain"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#123BFF]/20 bg-[#EAF7FF] px-5 py-3 text-sm font-bold text-[#123BFF] shadow-sm transition hover:border-[#123BFF]/40 hover:bg-white"
            >
              Open Master Brain
            </Link>
          ) : null}

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



