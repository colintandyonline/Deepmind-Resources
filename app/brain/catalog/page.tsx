import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BrainCircuit,
  Database,
  GitBranch,
  Layers3,
  LockKeyhole,
  Network,
  Route,
  ShieldCheck,
  Sparkles,
  Tags,
  Workflow,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

const BRAIN_ADMIN_EMAIL = 'colintandy@gmail.com'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'AI Catalogue | DeepMind Resources',
  description:
    'Private DeepMind Resources AI catalogue page for reviewing the company, platform, model, capability, and comparison-group foundation.',
  robots: {
    index: false,
    follow: false,
  },
}

type CatalogueTableName =
  | 'ai_catalog_entities'
  | 'ai_catalog_entity_links'
  | 'ai_catalog_capabilities'
  | 'ai_catalog_entity_capabilities'
  | 'ai_catalog_comparison_groups'
  | 'ai_catalog_entity_comparison_groups'

type CatalogueCountCard = {
  table: CatalogueTableName
  label: string
  description: string
  icon: typeof Database
  baseline: string
}

const catalogueCountCards: CatalogueCountCard[] = [
  {
    table: 'ai_catalog_entities',
    label: 'Catalogue entities',
    description:
      'Companies, platforms, model families, and individual models in the AI landscape map.',
    icon: Database,
    baseline: '503 expected from current seed',
  },
  {
    table: 'ai_catalog_entity_links',
    label: 'Entity relationship links',
    description:
      'Relationship spine connecting companies, platforms, model families, and models.',
    icon: GitBranch,
    baseline: 'Relationship spine',
  },
  {
    table: 'ai_catalog_capabilities',
    label: 'Capabilities',
    description:
      'Training routing taxonomy for what entities can do and where they matter.',
    icon: Tags,
    baseline: '42 expected',
  },
  {
    table: 'ai_catalog_entity_capabilities',
    label: 'Entity capability links',
    description:
      'Connections between catalogue entities and useful training capability areas.',
    icon: Network,
    baseline: '197 expected',
  },
  {
    table: 'ai_catalog_comparison_groups',
    label: 'Comparison groups',
    description:
      'Scenario-based comparison buckets for Academy lessons and sandbox tasks.',
    icon: Layers3,
    baseline: '28 expected',
  },
  {
    table: 'ai_catalog_entity_comparison_groups',
    label: 'Entity comparison links',
    description:
      'Connections between entities and the comparison groups they belong to.',
    icon: Workflow,
    baseline: '182 expected',
  },
]

const foundationStats = [
  {
    label: 'Company entities',
    value: '133',
    description: 'Providers and organisations that own, build, or publish AI products.',
  },
  {
    label: 'Platform entities',
    value: '174',
    description: 'Products and platforms mapped under their related companies.',
  },
  {
    label: 'Model family entities',
    value: '96',
    description: 'Families such as model lines, creative model groups, and provider model groups.',
  },
  {
    label: 'Model entities',
    value: '100',
    description: 'Individual model records linked back to the catalogue spine.',
  },
  {
    label: 'Capabilities',
    value: '42',
    description: 'Capability areas used to route entities into training and tool intelligence.',
  },
  {
    label: 'Comparison groups',
    value: '28',
    description: 'Scenario-based groups for comparing tools, models, and platforms.',
  },
  {
    label: 'Capability links',
    value: '197',
    description: 'Entity-to-capability relationships for training relevance.',
  },
  {
    label: 'Comparison links',
    value: '182',
    description: 'Entity-to-comparison-group relationships for practical comparisons.',
  },
  {
    label: 'Discovery links',
    value: '300',
    description:
      '200 company/platform discovery links plus 100 model discovery links from the current foundation.',
  },
]

const hierarchySteps = [
  {
    title: 'Company',
    description:
      'The organisation or provider behind an AI product, model, platform, or tool family.',
  },
  {
    title: 'Platform or product',
    description:
      'The user-facing product, API, assistant, creative tool, coding assistant, or workflow platform.',
  },
  {
    title: 'Model family',
    description:
      'The model line or family that groups related model releases and variants.',
  },
  {
    title: 'Model',
    description:
      'The individual model entity that can later connect to source signals, lessons, and sandbox tasks.',
  },
  {
    title: 'Capabilities',
    description:
      'The practical things an entity can do, such as coding, research, image generation, RAG, automation, or safety validation.',
  },
  {
    title: 'Comparison groups',
    description:
      'The scenario buckets used to compare models and tools for real workflows instead of universal rankings.',
  },
]

function formatCount(value: number) {
  return new Intl.NumberFormat('en-GB').format(value)
}

function getReadStatusLabel(hasError: boolean) {
  return hasError ? 'Read check failed' : 'Read check passed'
}

export default async function BrainCataloguePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const adminEmail = user.email?.trim().toLowerCase()

  if (adminEmail !== BRAIN_ADMIN_EMAIL) {
    redirect('/account')
  }

  const liveCounts = await Promise.all(
    catalogueCountCards.map(async (card) => {
      const { count, error } = await supabase
        .from(card.table)
        .select('*', {
          count: 'exact',
          head: true,
        })

      return {
        ...card,
        count: count ?? 0,
        hasError: Boolean(error),
      }
    }),
  )

  const totalCatalogueRows = liveCounts.reduce((total, item) => total + item.count, 0)
  const readErrors = liveCounts.filter((item) => item.hasError).length

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
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <BrainCircuit className="h-4 w-4" aria-hidden="true" />
                  AI Catalogue
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF7FF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                  <LockKeyhole className="h-4 w-4" aria-hidden="true" />
                  Private read-only page
                </span>
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-sand sm:text-5xl lg:text-6xl">
                Catalogue spine for the AI training system.
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-sand/65 sm:text-lg">
                This private catalogue page shows the current company, platform, model, capability,
                and comparison-group foundation behind DeepMind Resources. It is designed as a safe
                read-only view, so the catalogue can be checked without exposing secrets, private
                user data, or unverified source details.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/brain"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                >
                  Return to Master Brain
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-2xl border border-sand/10 bg-white px-5 py-3.5 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                >
                  Open dashboard
                </Link>
              </div>
            </div>

            <aside className="rounded-[2rem] bg-[#123BFF] p-6 text-white shadow-sm sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white">
                <BarChart3 className="h-4 w-4" aria-hidden="true" />
                Live catalogue read
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight">
                {formatCount(totalCatalogueRows)} catalogue rows currently readable.
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/82">
                This total comes from the six catalogue foundation tables using read-only aggregate
                checks. No catalogue records are edited from this page.
              </p>

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm font-bold text-white">Access state</p>
                  <p className="mt-1 text-sm leading-6 text-white/75">
                    Server-protected and restricted to the configured Brain admin account.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm font-bold text-white">Read checks</p>
                  <p className="mt-1 text-sm leading-6 text-white/75">
                    {readErrors === 0
                      ? 'All catalogue table count checks returned successfully.'
                      : `${readErrors} catalogue table count check${readErrors === 1 ? '' : 's'} need attention.`}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </header>

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {liveCounts.map((card) => {
            const Icon = card.icon

            return (
              <article
                key={card.table}
                className="rounded-3xl border border-sand/10 bg-white/92 p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${
                      card.hasError
                        ? 'bg-red-50 text-red-700'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {getReadStatusLabel(card.hasError)}
                  </span>
                </div>

                <p className="mt-6 text-4xl font-bold tracking-tight text-sand">
                  {formatCount(card.count)}
                </p>

                <h2 className="mt-3 text-xl font-bold tracking-tight text-sand">{card.label}</h2>

                <p className="mt-3 text-sm leading-7 text-sand/65">{card.description}</p>

                <div className="mt-5 rounded-2xl bg-[#EAF7FF] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                    Baseline
                  </p>
                  <p className="mt-2 text-sm font-semibold text-sand">{card.baseline}</p>
                </div>
              </article>
            )
          })}
        </section>

        <section className="mt-8 rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                Current foundation snapshot
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                The catalogue now has a structured map, not a flat list.
              </h2>

              <p className="mt-4 text-base leading-8 text-sand/65">
                These are the current seeded foundation numbers for the AI catalogue. They describe
                the internal catalogue map that will later support Academy lessons, sandbox
                exercises, tool comparisons, Live AI Intelligence, and business training decisions.
              </p>
            </div>

            <div className="rounded-3xl bg-[#EAF7FF] p-5 shadow-sm lg:max-w-sm">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#123BFF]">
                Read-only rule
              </p>
              <p className="mt-3 text-sm leading-7 text-sand/65">
                This page displays the catalogue foundation only. It does not create, update,
                approve, archive, or publish catalogue records.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {foundationStats.map((item) => (
              <article key={item.label} className="rounded-3xl border border-sand/10 bg-white p-5">
                <p className="text-3xl font-bold tracking-tight text-[#123BFF]">{item.value}</p>
                <h3 className="mt-3 text-lg font-bold text-sand">{item.label}</h3>
                <p className="mt-2 text-sm leading-7 text-sand/65">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
              <Route className="h-4 w-4" aria-hidden="true" />
              Catalogue hierarchy
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
              Company to model to training action.
            </h2>

            <p className="mt-4 text-base leading-8 text-sand/65">
              The catalogue spine lets DeepMind Resources connect an AI update to the exact company,
              platform, model, capability, comparison group, lesson, sandbox task, and business
              training implication it affects.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {hierarchySteps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#123BFF] text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-bold text-sand">{step.title}</h3>
                </div>

                <p className="mt-4 text-sm leading-7 text-sand/65">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Privacy and permissions
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand">
              Private by default.
            </h2>

            <p className="mt-4 text-sm leading-7 text-sand/65">
              The catalogue is an internal intelligence layer. This page uses server-side
              authentication, an admin email gate, noindex metadata, and aggregate read checks only.
              It does not expose source notes, user progress, business data, private validation
              records, credentials, or secret values.
            </p>

            <div className="mt-6 rounded-3xl bg-[#EAF7FF] p-5">
              <p className="text-sm font-bold text-sand">Safe page behaviour</p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-sand/65">
                <li>Requires an authenticated user.</li>
                <li>Requires the configured Brain admin email.</li>
                <li>Reads aggregate table counts only.</li>
                <li>Contains no forms or mutation buttons.</li>
                <li>Uses no public SEO indexing.</li>
              </ul>
            </div>
          </article>

          <article className="rounded-[2rem] border border-sand/10 bg-[#123BFF] p-6 text-white shadow-sm sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Why this matters
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight">
              The catalogue turns AI noise into training routes.
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/82">
              A future Scout signal should not float around as loose text. The catalogue gives every
              meaningful AI update a place: the company involved, the platform affected, the model
              or model family changed, the capability area touched, and the comparison group or
              lesson that may need review.
            </p>

            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm font-bold text-white">Academy impact</p>
                <p className="mt-1 text-sm leading-6 text-white/75">
                  Lessons can connect to entities, capabilities, source signals, and comparison
                  groups.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm font-bold text-white">Sandbox impact</p>
                <p className="mt-1 text-sm leading-6 text-white/75">
                  Practice tasks can compare models and tools inside the same capability area.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm font-bold text-white">Business impact</p>
                <p className="mt-1 text-sm leading-6 text-white/75">
                  Business training can identify which teams, workflows, and tool decisions are
                  affected.
                </p>
              </div>
            </div>
          </article>
        </section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/brain"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
          >
            Return to Master Brain
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-2xl border border-sand/10 bg-white px-5 py-3.5 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
          >
            Open dashboard
          </Link>
        </div>
      </div>
    </main>
  )
}
