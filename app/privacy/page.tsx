import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Database,
  FileText,
  LockKeyhole,
  Mail,
  Server,
  ShieldCheck,
  Trash2,
  UserCheck,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | DeepMind Resources',
  description:
    'Read the DeepMind Resources privacy policy for account data, learning progress, security logs, email communications, subprocessors, retention, and deletion rights.',
  alternates: {
    canonical: '/privacy',
  },
}

const policySections = [
  {
    title: '1. Data Initialization',
    subtitle: 'What we collect',
    icon: Database,
    paragraphs: [
      'DeepMind Resources collects the information needed to operate your AI competency workspace, secure your account, and support structured learning, sandbox practice, and future business training features.',
    ],
    points: [
      'Identity data: name, email address, account type, company name, job title, password authentication records, and account verification status.',
      'Workspace data: profile settings, learning progress, current level, XP, streaks, onboarding status, future course completions, sandbox activity, and subscription status where applicable.',
      'System logs: security events, device and browser signals, IP address, timestamps, interaction logs, and technical diagnostics used to protect and improve the platform.',
      'Communication data: email preferences, account notifications, verification emails, password reset emails, product updates, and support messages.',
    ],
  },
  {
    title: '2. Processing Framework',
    subtitle: 'How we use your data',
    icon: UserCheck,
    paragraphs: [
      'We use personal data to operate DeepMind Resources as a secure, release-aware learning platform. The purpose is not passive data collection. The purpose is to maintain a reliable account layer, support AI competency tracking, and prepare the platform for verified learning and sandbox workflows.',
    ],
    points: [
      'Account access: create accounts, authenticate users, verify email addresses, reset passwords, and protect workspaces.',
      'Competency tracking: record progress, levels, completed training, sandbox activity, and future achievement data.',
      'Learning personalisation: adapt the workspace around account type, role, business context, progress, and relevant training signals.',
      'System optimisation: improve performance, reliability, security, user experience, and release-aware learning workflows.',
      'Communication: send account-critical messages, security emails, password reset links, service updates, and optional training/product updates.',
    ],
  },
  {
    title: '3. Data Integrity and Security',
    subtitle: 'How we protect the workspace',
    icon: ShieldCheck,
    paragraphs: [
      'DeepMind Resources is designed around controlled account access, secure infrastructure, and database protections. No online platform can guarantee absolute security, but we use appropriate technical and organisational safeguards for the data we process.',
    ],
    points: [
      'Workspace data is stored in a Supabase environment with Row Level Security policies for user-owned profile records.',
      'Authentication is handled through secure account flows, email verification, password reset links, and protected server-side routes.',
      'Operational hosting and deployment use professional infrastructure providers such as Vercel and Supabase.',
      'We do not sell personal data, learning progress, skill traces, or account information to third-party advertisers.',
    ],
  },
  {
    title: '4. Third-Party Processing Layer',
    subtitle: 'Who helps operate the platform',
    icon: Server,
    paragraphs: [
      'DeepMind Resources uses trusted technical providers to deliver authentication, database storage, hosting, email delivery, analytics, payment processing, and platform operations. These providers only process data as needed to deliver their services to us.',
    ],
    points: [
      'Supabase may process account, authentication, database, and profile data.',
      'Vercel may process hosting, deployment, routing, and infrastructure logs.',
      'Resend may process email delivery data for welcome emails, account messages, and future product communications.',
      'Payment and subscription providers may be added later for billing, receipts, invoices, plan access, and fraud prevention.',
      'We may add other processors as the platform develops, but we will only use them for legitimate operational purposes.',
    ],
  },
  {
    title: '5. Retention and Deletion',
    subtitle: 'How long data is kept',
    icon: Trash2,
    paragraphs: [
      'We keep account and workspace data for as long as your account remains active or as long as needed to provide the platform, meet legal obligations, protect security, resolve disputes, prevent misuse, and maintain business records.',
      'You may request deletion of your account and associated workspace data. We will delete or anonymise personal data where reasonably possible, except where retention is required for legal, security, accounting, fraud-prevention, backup, or dispute-resolution reasons.',
    ],
    points: [
      'Active account data is retained while your workspace remains active.',
      'Security logs may be retained for a limited period to protect the platform and investigate misuse.',
      'Payment or subscription records may be retained where required for tax, accounting, dispute, or compliance purposes.',
      'Backup copies may take additional time to expire from encrypted infrastructure backups.',
    ],
  },
  {
    title: '6. User Rights',
    subtitle: 'System access and control',
    icon: LockKeyhole,
    paragraphs: [
      'Depending on where you live, you may have rights over your personal data. These may include the right to access, correct, delete, restrict, object to processing, request portability, or withdraw consent where processing is based on consent.',
      'To exercise these rights, use the contact route provided on deepmindresources.pro. We may need to verify your identity before acting on a request.',
    ],
    points: [
      'Access: request a copy of personal data linked to your account.',
      'Correction: ask us to correct incomplete or inaccurate account data.',
      'Deletion: request account deletion and removal of associated workspace data where legally possible.',
      'Portability: request a structured copy of eligible account data where applicable.',
      'Objection or restriction: ask us to stop or limit certain types of processing where applicable.',
    ],
  },
]

export default function PrivacyPage() {
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

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <header className="rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <FileText className="h-4 w-4" aria-hidden="true" />
                Privacy Policy // System Protocol
              </span>

              <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-sand sm:text-5xl">
                How DeepMind Resources protects your account and workspace data.
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-sand/65">
                This policy explains how DeepMind Resources collects, uses, protects, shares, and
                deletes personal data across the AI competency workspace at deepmindresources.pro.
              </p>
            </div>

            <div className="rounded-3xl bg-[#EAF7FF] p-5 text-sm leading-7 text-sand/70 lg:max-w-xs">
              <p className="font-bold text-[#123BFF]">Last calibrated</p>
              <p>April 30, 2026</p>
              <p className="mt-3 text-xs leading-6 text-sand/55">
                This document should be reviewed before relying on it as final legal advice.
              </p>
            </div>
          </div>
        </header>

        <section className="mt-8 grid gap-6">
          {policySections.map((section) => {
            const Icon = section.icon

            return (
              <article
                key={section.title}
                className="rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <span className="inline-flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#123BFF]">
                      {section.subtitle}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-sand">
                      {section.title}
                    </h2>

                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-sm leading-7 text-sand/65">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    <ul className="mt-5 grid gap-3">
                      {section.points.map((point) => (
                        <li key={point} className="flex gap-3 rounded-2xl bg-[#EAF7FF] p-4">
                          <ShieldCheck
                            className="mt-0.5 h-5 w-5 shrink-0 text-[#123BFF]"
                            aria-hidden="true"
                          />
                          <span className="text-sm leading-7 text-sand/70">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            )
          })}
        </section>

        <section className="mt-8 rounded-[2rem] border border-sand/10 bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Contact and requests
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight">
                Need access, correction, export, or deletion?
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/82 sm:text-base">
                Use the contact route on deepmindresources.pro to make a privacy request. Account
                deletion controls will also be available from the protected account area as the
                workspace settings mature.
              </p>
            </div>

            <Link
              href="/terms"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-[#123BFF] shadow-sm transition hover:bg-[#EAF7FF]"
            >
              View Terms
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}