import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  Database,
  FileCheck2,
  GitBranch,
  Layers3,
  Radar,
  Route,
  Scale,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Tool Intelligence Platform | DeepMind Resources',
  description:
    'Explore the DeepMind Resources Tool Intelligence layer: source-aware AI tool evaluation, scout workflows, verified catalogue signals, sandbox tasks, and training guidance built around workflow fit.',
  alternates: {
    canonical: 'https://deepmindresources.pro/tool-intelligence',
  },
  openGraph: {
    title: 'AI Tool Intelligence Platform | DeepMind Resources',
    description:
      'DeepMind Resources evaluates AI tools through source-aware signals, workflow fit, verification, sandbox tasks, and production-ready training guidance.',
    url: 'https://deepmindresources.pro/tool-intelligence',
    siteName: 'DeepMind Resources',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tool Intelligence Platform | DeepMind Resources',
    description:
      'A source-aware AI tool intelligence layer for mapping AI tools to workflows, risks, sandbox tasks, and workforce capability.',
  },
}

type IntelligenceLayer = {
  label: string
  title: string
  description: string
  icon: LucideIcon
}

type Principle = {
  title: string
  description: string
  icon: LucideIcon
}

const intelligenceLayers: IntelligenceLayer[] = [
  {
    label: '01',
    title: 'Source signal monitoring',
    description:
      'DeepMind Resources tracks meaningful movement across AI models, tools, APIs, platforms, releases, policy changes, pricing shifts, and workflow behaviour. Not every update matters. The system is built to separate noise from operational signal.',
    icon: Radar,
  },
  {
    label: '02',
    title: 'Tool intelligence catalogue',
    description:
      'Signals are organised into a structured intelligence layer that records what a tool is for, where it fits, what roles it supports, what risks it introduces, and which workflows it can realistically improve.',
    icon: Database,
  },
  {
    label: '03',
    title: 'Scout workflows',
    description:
      'Scout workflows inspect new information, compare it with existing platform knowledge, flag changes worth reviewing, and help identify where training guidance may need to move.',
    icon: SearchCheck,
  },
  {
    label: '04',
    title: 'Verification and context checks',
    description:
      'A tool claim is not treated as training guidance until it has been placed in context: source quality, workflow relevance, capability evidence, limitations, adoption risk, and production usefulness.',
    icon: FileCheck2,
  },
  {
    label: '05',
    title: 'Training translation layer',
    description:
      'Verified meaning is translated into learning paths, role-based guidance, tool-selection judgement, prompt patterns, agent architecture decisions, and safe-use standards.',
    icon: BrainCircuit,
  },
  {
    label: '06',
    title: 'Sandbox task generation',
    description:
      'When an update should be practised, it becomes a verified sandbox task: a tool comparison, prompt test, RAG check, workflow simulation, validation drill, or agent design exercise.',
    icon: Route,
  },
]

const evaluationPrinciples: Principle[] = [
  {
    title: 'Workflow fit beats hype',
    description:
      'Tools are evaluated by what they help a person or team actually do: research, coding, writing, analysis, support, operations, automation, knowledge work, or controlled agent workflows.',
    icon: Workflow,
  },
  {
    title: 'Capability needs context',
    description:
      'A strong model or tool can still be wrong for a workflow if the cost, privacy profile, integration path, review burden, or user skill level does not fit.',
    icon: Scale,
  },
  {
    title: 'Training must stay current',
    description:
      'Tool guidance can expire quickly. The intelligence layer exists so lessons, comparisons, and sandbox tasks can move when the AI landscape changes.',
    icon: BookOpenCheck,
  },
  {
    title: 'Practice proves judgement',
    description:
      'The platform does not stop at explanation. Users practise tool selection, prompt design, validation, and workflow mapping before applying decisions in production.',
    icon: BadgeCheck,
  },
]

const businessApplications: Principle[] = [
  {
    title: 'Role-based tool selection',
    description:
      'Teams need different guidance for operators, managers, analysts, marketers, developers, support staff, and founders. Tool intelligence helps map recommendations to real roles.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Risk-aware adoption',
    description:
      'Business AI adoption needs more than enthusiasm. It needs privacy awareness, review gates, output validation, escalation rules, and practical boundaries.',
    icon: ShieldCheck,
  },
  {
    title: 'Capability gaps made visible',
    description:
      'The intelligence layer helps identify when a learner needs prompt foundations, RAG judgement, agent boundaries, tool comparison practice, or workflow design before using a tool at work.',
    icon: Layers3,
  },
]

export default function ToolIntelligencePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-obsidian text-sand">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at top right, rgba(69, 201, 255, 0.24), transparent 34rem), radial-gradient(circle at top left, rgba(18, 59, 255, 0.14), transparent 30rem), linear-gradient(180deg, #F4FBFF 0%, #EAF7FF 48%, #F4FBFF 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <Radar className="h-4 w-4" aria-hidden="true" />
                Tool Intelligence
              </span>

              <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-sand sm:text-5xl lg:text-6xl">
                AI tool intelligence built for workflow decisions, not hype cycles.
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-sand/65 sm:text-lg">
                DeepMind Resources uses a private intelligence layer to turn AI tool movement into
                verified guidance, practical training decisions, and sandbox tasks. The goal is not
                to rank tools for attention. The goal is to understand which tools fit which work,
                which risks need review, and which skills users need next.
              </p>

              <p className="mt-4 max-w-3xl text-base leading-8 text-sand/65 sm:text-lg">
                This is the layer behind better AI training: source signals, catalogue structure,
                scout workflows, verification checks, training translation, and capability feedback
                working together without exposing private operational machinery.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/academy"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                >
                  Explore Academy
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/sandbox"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-6 py-4 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                >
                  View Sandbox
                  <Route className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <aside className="rounded-[1.5rem] bg-[#123BFF] p-6 text-white shadow-sm sm:p-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/75">
                    Intelligence layer
                  </p>

                  <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                    From tool signal to training action.
                  </h2>
                </div>

                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[1.35rem] bg-white p-2 shadow-xl shadow-[#061B5B]/20 ring-1 ring-white/50 sm:h-24 sm:w-24">
                  <Image
                    src="/brand/deepmind-resources-logo.png"
                    alt="DeepMind Resources"
                    fill
                    sizes="96px"
                    className="object-contain p-1"
                    priority
                  />
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-white/78">
                A private operating layer for source-aware tool intelligence, workflow context,
                verification, training translation, and sandbox evidence.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  'Tool movement tracked as operational signal',
                  'Catalogue context mapped to workflow fit',
                  'Scout workflows surface meaningful change',
                  'Verified updates become practical tasks',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/10 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" aria-hidden="true" />
                    <p className="text-sm font-semibold leading-6 text-white/90">{item}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </header>

        <section className="mt-8 rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
              <Compass className="h-4 w-4" aria-hidden="true" />
              How it works
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
              The public view of the intelligence system.
            </h2>

            <p className="mt-4 text-base leading-8 text-sand/65">
              DeepMind Resources does not publish internal systems or private scoring logic. What
              matters publicly is the method: important AI tool changes are detected, structured,
              verified, translated, and turned into better learning decisions.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {intelligenceLayers.map((layer) => {
              const Icon = layer.icon

              return (
                <article key={layer.title} className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                  <div className="flex gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-sm font-bold text-[#123BFF]">
                      {layer.label}
                    </span>

                    <div>
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-[#123BFF]" aria-hidden="true" />
                        <h3 className="text-lg font-bold text-sand">{layer.title}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-sand/65">{layer.description}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
              <Scale className="h-4 w-4" aria-hidden="true" />
              Evaluation principles
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand">
              The best tool is the one that fits the work.
            </h2>

            <p className="mt-4 text-sm leading-7 text-sand/65">
              Tool intelligence only matters when it improves judgement. DeepMind Resources
              evaluates AI tools through workflow fit, role suitability, review burden, privacy
              profile, cost context, capability evidence, and training readiness.
            </p>
          </article>

          <div className="grid gap-4 sm:grid-cols-2">
            {evaluationPrinciples.map((principle) => {
              const Icon = principle.icon

              return (
                <article key={principle.title} className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF] shadow-sm">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold tracking-tight text-sand">{principle.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-sand/65">{principle.description}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
                Business translation
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                Tool intelligence becomes workforce capability.
              </h2>

              <p className="mt-4 text-base leading-8 text-white/80">
                Teams do not need more random tool recommendations. They need role-based guidance,
                controlled workflows, risk-aware adoption, and practical tasks that help staff use
                AI confidently, safely, and consistently.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {businessApplications.map((application) => {
                const Icon = application.icon

                return (
                  <article key={application.title} className="rounded-3xl bg-white p-5 text-sand shadow-sm">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF] shadow-sm">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold tracking-tight text-sand">{application.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-sand/65">{application.description}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <GitBranch className="h-4 w-4" aria-hidden="true" />
                Training connection
              </span>

              <h2 className="mt-5 max-w-4xl text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                The intelligence layer feeds the Academy, Sandbox, and business training routes.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-sand/65">
                Tool intelligence is not a public scoreboard. It is the operating context behind
                better lessons, better sandbox tasks, better business guidance, and stronger
                production-ready AI competency.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/methodology"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
              >
                View Methodology
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                href="/business-ai-training"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-6 py-4 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
              >
                Business Training
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
