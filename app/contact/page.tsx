import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  FileText,
  LifeBuoy,
  Mail,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react'
import { Sidebar } from '@/components/platform/sidebar'

export const metadata: Metadata = {
  title: 'Contact | DeepMind Resources',
  description:
    'Contact DeepMind Resources for general enquiries, business AI training, account support, privacy requests, and workspace questions.',
  alternates: {
    canonical: '/contact',
  },
}

type ContactRoute = {
  title: string
  email: string
  description: string
  label: string
  icon: LucideIcon
  subject: string
}

const contactRoutes: ContactRoute[] = [
  {
    title: 'General enquiries',
    email: 'hello@deepmindresources.pro',
    description:
      'For platform questions, partnership conversations, product feedback, or anything that does not fit a specialist route.',
    label: 'General',
    icon: Mail,
    subject: 'DeepMind%20Resources%20general%20enquiry',
  },
  {
    title: 'Business AI training',
    email: 'business@deepmindresources.pro',
    description:
      'For team training, business AI adoption, workflow enablement, professional upskilling, and future enterprise workspace questions.',
    label: 'Business',
    icon: BriefcaseBusiness,
    subject: 'DeepMind%20Resources%20business%20training%20enquiry',
  },
  {
    title: 'Account support',
    email: 'support@deepmindresources.pro',
    description:
      'For login issues, account access, password recovery questions, workspace problems, or support with your DeepMind Resources account.',
    label: 'Support',
    icon: LifeBuoy,
    subject: 'DeepMind%20Resources%20account%20support',
  },
  {
    title: 'Privacy and deletion requests',
    email: 'privacy@deepmindresources.pro',
    description:
      'For privacy questions, account data requests, deletion requests, policy questions, or anything connected to your personal data.',
    label: 'Privacy',
    icon: ShieldCheck,
    subject: 'DeepMind%20Resources%20privacy%20request',
  },
]

const guidanceItems = [
  'Use the email route that best matches your request so it can be reviewed in the right context.',
  'Include the email address linked to your account if your message is about login, support, privacy, or deletion.',
  'For business enquiries, include the organisation name, team size, and the AI workflows you want training to support.',
]

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-obsidian text-sand">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at top right, rgba(69, 201, 255, 0.24), transparent 34rem), radial-gradient(circle at top left, rgba(18, 59, 255, 0.14), transparent 30rem), linear-gradient(180deg, #F4FBFF 0%, #EAF7FF 48%, #F4FBFF 100%)',
        }}
        aria-hidden="true"
      />

      <Sidebar />

      <main className="relative z-10 min-h-screen pt-16 md:pl-64 md:pt-0">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <header className="rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                  Contact DeepMind Resources
                </span>

                <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-sand sm:text-5xl lg:text-6xl">
                  Reach the right route for your AI competency workspace.
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-8 text-sand/65">
                  Contact DeepMind Resources for platform questions, business AI training,
                  account support, privacy requests, or workspace guidance. Every published route
                  uses the verified deepmindresources.pro domain.
                </p>
              </div>

              <aside className="space-y-5">
                <div className="rounded-[1.5rem] border border-sand/10 bg-white p-5 shadow-sm">
                  <Image
                    src="/brand/deepmind-resources-banner.png"
                    alt="DeepMind Resources"
                    width={1200}
                    height={630}
                    priority
                    sizes="(max-width: 768px) 100vw, 520px"
                    className="h-auto w-full object-contain"
                  />
                </div>

                <div className="rounded-[1.5rem] bg-[#123BFF] p-6 text-white shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/75">
                    Professional contact routes
                  </p>
                  <h2 className="mt-3 text-2xl font-bold tracking-tight">
                    The right message reaches the right workspace.
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-white/82">
                    General enquiries, business training, account support, and privacy requests
                    each have a dedicated DeepMind Resources address so conversations stay clear,
                    traceable, and aligned with the right area of the platform.
                  </p>
                </div>
              </aside>
            </div>
          </header>

          <section className="mt-8 grid gap-6 lg:grid-cols-2">
            {contactRoutes.map((route) => {
              const Icon = route.icon

              return (
                <article
                  key={route.email}
                  className="rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <span className="inline-flex rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                        {route.label}
                      </span>

                      <h2 className="mt-5 text-2xl font-bold tracking-tight text-sand">
                        {route.title}
                      </h2>
                    </div>

                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-sand/65">{route.description}</p>

                  <a
                    href={`mailto:${route.email}?subject=${route.subject}`}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF] sm:w-auto"
                  >
                    {route.email}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </article>
              )
            })}
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <Clock3 className="h-4 w-4" aria-hidden="true" />
                What to include
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand">
                Help us route your request cleanly.
              </h2>

              <div className="mt-6 grid gap-3">
                {guidanceItems.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl bg-[#EAF7FF] p-4">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#123BFF]"
                      aria-hidden="true"
                    />
                    <p className="text-sm leading-7 text-sand/70">{item}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <FileText className="h-4 w-4" aria-hidden="true" />
                Policy routes
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand">
                Privacy, terms, and account deletion.
              </h2>

              <p className="mt-4 text-sm leading-7 text-sand/65">
                Privacy questions and account deletion requests should go to
                privacy@deepmindresources.pro. You can also review the public policy pages before
                contacting us.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/privacy"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#EAF7FF] px-5 py-3 text-sm font-bold text-[#123BFF] shadow-sm transition hover:bg-[#123BFF] hover:text-white"
                >
                  Privacy Policy
                </Link>

                <Link
                  href="/terms"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#EAF7FF] px-5 py-3 text-sm font-bold text-[#123BFF] shadow-sm transition hover:bg-[#123BFF] hover:text-white"
                >
                  Terms of Service
                </Link>
              </div>
            </article>
          </section>
        </div>
      </main>
    </div>
  )
}