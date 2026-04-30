import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Ban,
  BriefcaseBusiness,
  CreditCard,
  FileText,
  KeyRound,
  Layers,
  Scale,
  ShieldCheck,
  TerminalSquare,
  Trash2,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service | DeepMind Resources',
  description:
    'Read the DeepMind Resources Terms of Service for account access, platform content, AI training, sandbox use, subscriptions, privacy, and account termination.',
  alternates: {
    canonical: '/terms',
  },
}

const termsSections = [
  {
    title: '1. System Access and Identity',
    icon: KeyRound,
    paragraphs: [
      'These Terms govern your access to DeepMind Resources at deepmindresources.pro. By creating an account, signing in, or using the platform, you agree to this Usage Protocol.',
      'DeepMind Resources provides a professional AI training and tool-intelligence workspace for individuals, professionals, and businesses building AI competency.',
    ],
    points: [
      'You are responsible for keeping login credentials secure and for activity that occurs through your account.',
      'You must be legally capable of entering into a binding agreement.',
      'If you use DeepMind Resources on behalf of a company or organisation, you confirm that you are authorised to accept these Terms on its behalf.',
    ],
  },
  {
    title: '2. Account Security',
    icon: ShieldCheck,
    paragraphs: [
      'Normal access to DeepMind Resources uses on-site email and password authentication. Email links may be used for account verification, password reset, account recovery, email change confirmation, and other sensitive security actions.',
    ],
    points: [
      'Do not share your password.',
      'Do not bypass account controls.',
      'Do not attempt to access another user’s workspace.',
      'If you believe your account has been compromised, reset your password and contact us as soon as possible.',
    ],
  },
  {
    title: '3. Intellectual Property and Platform Content',
    icon: Layers,
    paragraphs: [
      'DeepMind Resources owns or licenses the platform design, training architecture, lesson content, sandbox task structure, visual system, copy, software, workflows, and related materials.',
      'Subject to these Terms, you receive a limited, non-exclusive, non-transferable licence to access and use DeepMind Resources for personal learning, professional development, or authorised business training.',
    ],
    points: [
      'You may not copy, resell, redistribute, scrape, mass-export, reverse engineer, or republish platform content without written permission.',
      'You may use the training materials for your own learning, team enablement, and authorised professional development.',
      'You may not use DeepMind Resources to build a competing content library, scraper, or copied knowledge base.',
    ],
  },
  {
    title: '4. AI Training, Sandbox Use, and Agentic Workflows',
    icon: TerminalSquare,
    paragraphs: [
      'DeepMind Resources is designed to turn meaningful AI changes into structured learning, verified guidance, sandbox practice, and production-ready skill development.',
      'Sandbox tasks are for learning, testing, and controlled practice. If you implement AI workflows in your own production environment, you are responsible for testing, validation, compliance, review, and operational risk.',
    ],
    points: [
      'Do not use the platform to create or deploy harmful code.',
      'Do not attack, overload, scrape, or stress-test external systems.',
      'Do not bypass security controls or misuse agentic workflows.',
      'Do not upload sensitive data you are not authorised to use.',
      'Do not generate illegal, abusive, deceptive, or harmful outputs.',
    ],
  },
  {
    title: '5. Accuracy, Guidance, and Professional Use',
    icon: Scale,
    paragraphs: [
      'We aim to provide useful, current, and carefully structured AI training. However, AI tools, models, platforms, and business practices change quickly.',
      'DeepMind Resources does not guarantee that every lesson, recommendation, workflow, sandbox task, or tool comparison will be suitable for every organisation, jurisdiction, risk profile, or production environment.',
    ],
    points: [
      'You remain responsible for applying human judgement.',
      'You should review AI outputs, check facts, and validate workflows before production use.',
      'You must ensure AI use in your work complies with your own policies, contracts, regulations, and professional duties.',
    ],
  },
  {
    title: '6. Business Accounts and Team Use',
    icon: BriefcaseBusiness,
    paragraphs: [
      'Business features may allow organisations to manage training, team access, company profiles, workflow guidance, and future subscription access.',
    ],
    points: [
      'Business workspace managers are responsible for inviting authorised users only.',
      'Organisations are responsible for ensuring platform use complies with internal policies and applicable laws.',
      'Team, billing, permissions, and training-management features may change as the platform develops.',
    ],
  },
  {
    title: '7. Subscriptions, Billing, and Access',
    icon: CreditCard,
    paragraphs: [
      'Where paid plans are offered, subscription terms, billing periods, renewal rules, cancellations, and plan features will be shown at the point of purchase or in your account area.',
    ],
    points: [
      'You may cancel paid access according to the cancellation terms shown for your plan.',
      'Pricing, plan structure, and feature availability may change as the platform develops.',
      'Changes will not remove access already paid for during an active billing period unless required for legal, security, misuse, or operational reasons.',
    ],
  },
  {
    title: '8. Platform Availability and Maintenance',
    icon: FileText,
    paragraphs: [
      'We aim to keep DeepMind Resources reliable and useful, but we do not guarantee uninterrupted access.',
      'We may update, suspend, maintain, replace, or remove parts of the platform to improve security, performance, training quality, infrastructure, or product functionality.',
    ],
    points: [
      'Maintenance may affect access temporarily.',
      'Features may change as the product develops.',
      'The learning system may be updated as models, tools, workflows, and platform capabilities change.',
    ],
  },
  {
    title: '9. Termination and Account Deletion',
    icon: Trash2,
    paragraphs: [
      'You may request account deletion from your account area or through the contact route provided on the site.',
      'When an account is deleted, we will delete or anonymise personal workspace data where reasonably possible, except where retention is required for legal, security, fraud-prevention, tax, accounting, backup, or dispute-resolution purposes.',
    ],
    points: [
      'We may suspend or terminate accounts that violate these Terms.',
      'We may restrict accounts that misuse the platform, compromise security, infringe intellectual property, or create legal or operational risk.',
      'Deletion controls will be added to the protected account area as the account system matures.',
    ],
  },
  {
    title: '10. Privacy, Liability, and Changes',
    icon: Ban,
    paragraphs: [
      'Our Privacy Policy explains what personal data we collect, how we use it, who processes it, and how you can exercise your rights.',
      'To the fullest extent permitted by law, DeepMind Resources is not liable for indirect losses, lost profits, lost revenue, lost business opportunity, loss of data, or consequences arising from your implementation of AI workflows outside the platform. Nothing in these Terms limits liability that cannot legally be limited.',
      'We may update these Terms as the platform develops. If changes are material, we will take reasonable steps to notify users. The latest version will be available on deepmindresources.pro.',
    ],
    points: [
      'By using DeepMind Resources, you acknowledge that your data will be processed according to the Privacy Policy.',
      'Questions about these Terms, account access, or deletion requests should be sent through the contact route provided on deepmindresources.pro.',
    ],
  },
]

export default function TermsPage() {
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
                Terms of Service // Usage Protocol
              </span>

              <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-sand sm:text-5xl">
                The operating terms for your DeepMind Resources workspace.
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-sand/65">
                These Terms define responsible access to the platform, protected training content,
                sandbox use, account security, business workspaces, subscriptions, and deletion
                requests.
              </p>
            </div>

            <div className="rounded-3xl bg-[#EAF7FF] p-5 text-sm leading-7 text-sand/70 lg:max-w-xs">
              <p className="font-bold text-[#123BFF]">Version</p>
              <p>1.0.4</p>
              <p className="mt-3 font-bold text-[#123BFF]">Operational date</p>
              <p>April 30, 2026</p>
            </div>
          </div>
        </header>

        <section className="mt-8 grid gap-6">
          {termsSections.map((section) => {
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
                    <h2 className="text-2xl font-bold tracking-tight text-sand">
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
              <span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                Privacy layer
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight">
                Review how your workspace data is handled.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/82 sm:text-base">
                The Privacy Policy explains the data collected for account access, competency
                tracking, platform security, email communications, subprocessors, retention, and
                deletion requests.
              </p>
            </div>

            <Link
              href="/privacy"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-[#123BFF] shadow-sm transition hover:bg-[#EAF7FF]"
            >
              View Privacy Policy
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}