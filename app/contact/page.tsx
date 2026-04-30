import type { Metadata } from 'next'
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
    'Contact DeepMind Resources for general enquiries, business intelligence, system support, privacy requests, and workspace questions.',
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
    title: 'General Enquiries',
    email: 'hello@deepmindresources.pro',
    description:
      'For broad system information, platform direction, partnership conversations, and high-level guidance on the DeepMind Resources operating layer.',
    label: 'General',
    icon: Mail,
    subject: 'DeepMind%20Resources%20general%20enquiry',
  },
  {
    title: 'Business Intelligence',
    email: 'business@deepmindresources.pro',
    description:
      'Dedicated to enterprise-scale AI training, team-wide competency deployments, business workflow adoption, and professional upskilling strategy.',
    label: 'Business',
    icon: BriefcaseBusiness,
    subject: 'DeepMind%20Resources%20business%20intelligence%20enquiry',
  },
  {
    title: 'System Support',
    email: 'support@deepmindresources.pro',
    description:
      'Technical assistance for account synchronization, workspace settings, login access, password recovery, and sandbox performance questions.',
    label: 'Support',
    icon: LifeBuoy,
    subject: 'DeepMind%20Resources%20system%20support',
  },
  {
    title: 'Data Protocols',
    email: 'privacy@deepmindresources.pro',
    description:
      'Formal requests regarding privacy, identity protection, account data, deletion requests, and future skill-trace management.',
    label: 'Privacy',
    icon: ShieldCheck,
    subject: 'DeepMind%20Resources%20data%20protocol%20request',
  },
]

const guidanceItems = [
  'Use the email route that best matches your request so it can be reviewed in the correct operational context.',
  'Include the email address linked to your account if your message concerns login, support, privacy, or deletion.',
  'For enterprise enquiries, include your organisation name, team size, current AI stack, and the workflows you want training to support.',
]

const protocolItems = [
  {
    title: 'General Enquiries',
    description: 'For broad system information and high-level platform guidance.',
  },
  {
    title: 'Business Intelligence',
    description:
      'Dedicated to enterprise-scale AI training and team-wide competency deployments.',
  },
  {
    title: 'System Support',
    description:
      'Technical assistance for account synchronization, workspace settings, and sandbox performance.',
  },
  {
    title: 'Data Protocols',
    description:
      'Formal requests regarding privacy, identity protection, and skill-trace management.',
  },
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
                  Direct Your Query to the Correct Protocol.
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-8 text-sand/65">
                  Ensure your communication reaches the intended workspace by selecting the
                  appropriate routing channel. DeepMind Resources provides dedicated pathways for
                  platform architecture, enterprise training, and system support—maintaining a
                  deterministic and traceable record for every interaction.
                </p>
              </div>

              <aside className="rounded-[1.5rem] bg-[#123BFF] p-6 text-white shadow-sm sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/75">
                  Professional Communication Routes
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                  The Right Message for the Right Workspace.
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/82">
                  To ensure clarity and alignment with our platform’s core architecture, we utilize
                  specialized addresses. Select the route that corresponds to your specific
                  requirement:
                </p>

                <div className="mt-6 grid gap-3">
                  {protocolItems.map((item) => (
                    <div key={item.title} className="rounded-2xl bg-white/10 p-4">
                      <h3 className="text-sm font-bold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-white/76">{item.description}</p>
                    </div>
                  ))}
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
                Submission Guidance
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand">
                Give the protocol enough context to route cleanly.
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
                Policy Routes
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