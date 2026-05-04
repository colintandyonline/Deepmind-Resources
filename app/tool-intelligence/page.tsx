import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  BadgeCheck,
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
  Target,
  Workflow,
  Zap,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Tool Intelligence Engine | DeepMind Resources',
  description:
    'DeepMind Resources maps AI tool change into verified guidance, workflow fit, sandbox tasks, and production-ready AI competency.',
  alternates: {
    canonical: 'https://deepmindresources.pro/tool-intelligence',
  },
  keywords: [
    'AI tool intelligence',
    'AI tool evaluation',
    'AI tools for business',
    'AI workflow tools',
    'AI training platform',
    'AI competency',
    'source-aware AI training',
    'verified AI guidance',
    'AI sandbox tasks',
    'AI tool selection',
    'AI workflow training',
    'agentic AI tools',
    'RAG tools',
    'business AI training',
    'workforce AI capability',
  ],
  openGraph: {
    title: 'AI Tool Intelligence Engine | DeepMind Resources',
    description:
      'See how DeepMind Resources turns AI tool movement into verified guidance, workflow intelligence, sandbox proof, and production-ready training decisions.',
    url: 'https://deepmindresources.pro/tool-intelligence',
    siteName: 'DeepMind Resources',
    images: ['/brand/deepmind-resources-logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tool Intelligence Engine | DeepMind Resources',
    description:
      'AI tool intelligence for mapping tool change to workflow fit, verified guidance, sandbox tasks, and workforce capability.',
    images: ['/brand/deepmind-resources-logo.png'],
  },
}

type SystemLayer = {
  label: string
  title: string
  description: string
  icon: LucideIcon
}

type ProofPoint = {
  title: string
  description: string
  icon: LucideIcon
}

const systemLayers: SystemLayer[] = [
  {
    label: 'Signal',
    title: 'The Signal Grid watches the frontier',
    description:
      'AI releases, model changes, tool updates, pricing shifts, new capabilities, policy moves, and workflow behaviour are tracked as live signals. The aim is simple: spot what matters before training goes stale.',
    icon: Radar,
  },
  {
    label: 'Atlas',
    title: 'The Tool Atlas gives every signal context',
    description:
      'A tool is not useful in isolation. The Atlas maps what it does, who it helps, where it fits, what it risks, what skills it demands, and which workflows it can actually improve.',
    icon: Database,
  },
  {
    label: 'Scouts',
    title: 'Scout workflows separate motion from meaning',
    description:
      'The Scout Network looks for the difference between noise and impact. It helps surface the changes worth reviewing, the claims worth checking, and the tools that may change real work.',
    icon: SearchCheck,
  },
  {
    label: 'Verify',
    title: 'Verification gates protect the training layer',
    description:
      'No tool claim becomes guidance just because it sounds impressive. It must pass context checks: source quality, practical relevance, workflow fit, risk, limitations, and production usefulness.',
    icon: FileCheck2,
  },
  {
    label: 'Train',
    title: 'Training Synthesis turns intelligence into skill',
    description:
      'Verified meaning becomes learning direction: clearer lessons, sharper pathway guidance, role-based tool judgement, prompt patterns, RAG checks, agent boundaries, and workflow decisions.',
    icon: BrainCircuit,
  },
  {
    label: 'Prove',
    title: 'The Sandbox Proof Layer turns knowing into doing',
    description:
      'When a tool shift matters, users should practise it. The result becomes a sandbox task: compare tools, test prompts, validate outputs, map workflows, inspect retrieval, or design safer agent behaviour.',
    icon: Route,
  },
]

const decisionPrinciples: ProofPoint[] = [
  {
    title: 'No hype rankings',
    description:
      'DeepMind Resources does not chase “best AI tool” lists. A tool is judged by the job, the user, the risk, the workflow, and the result it can reliably support.',
    icon: Scale,
  },
  {
    title: 'Workflow fit first',
    description:
      'The strongest tool is the one that fits the task: research, coding, analysis, writing, operations, support, automation, knowledge work, or controlled agent execution.',
    icon: Workflow,
  },
  {
    title: 'Skill gaps become visible',
    description:
      'The engine identifies when a learner needs prompt control, validation habits, RAG judgement, tool comparison practice, or agent architecture before using a tool in real work.',
    icon: Target,
  },
  {
    title: 'Current beats comfortable',
    description:
      'AI changes quickly. The platform is built to keep training current, not comfortable — so users stay ahead of the curve, not just in the queue.',
    icon: Zap,
  },
]

const capabilityLayers: ProofPoint[] = [
  {
    title: 'Individual learners',
    description:
      'Learners get clearer judgement: which tools matter, which skills to build, what to practise, and when a tool is not ready for their workflow.',
    icon: Sparkles,
  },
  {
    title: 'Technical builders',
    description:
      'Builders get sharper context around model behaviour, tool calling, RAG, agent design, validation layers, and workflow boundaries.',
    icon: GitBranch,
  },
  {
    title: 'Business teams',
    description:
      'Teams get role-based AI adoption: safe-use habits, practical workflow training, manager visibility, tool-selection confidence, and workforce capability.',
    icon: BriefcaseBusiness,
  },
]

const proofLoop = [
  'A tool update is detected.',
  'The signal is checked against real workflow impact.',
  'The Tool Atlas maps role fit, risk, and capability.',
  'Verification gates decide whether the change matters.',
  'Training guidance is refreshed where needed.',
  'A sandbox task proves the skill before production use.',
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
                Tool Intelligence Engine
              </span>

              <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-sand sm:text-5xl lg:text-6xl">
                The AI tool layer that keeps training ahead of the curve.
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-sand/65 sm:text-lg">
                AI tools change every week. New models arrive, features move, pricing shifts,
                capabilities jump, and old advice expires quietly. DeepMind Resources uses a
                private Tool Intelligence Engine to turn that movement into verified guidance,
                sharper learning paths, and practical sandbox proof.
              </p>

              <p className="mt-4 max-w-3xl text-base leading-8 text-sand/65 sm:text-lg">
                This is not a public scoreboard or a hype feed. It is the operating intelligence
                behind better AI training: what changed, why it matters, who it affects, what skill
                is needed, and what task proves the user is ready.
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
                    Intelligence flow
                  </p>

                  <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                    Signal → context → verification → training → proof.
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
                The engine watches the AI frontier, maps tools to real work, checks what matters,
                and turns verified intelligence into production-ready skill.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  'Source signals, not hype noise',
                  'Tool context mapped to real workflows',
                  'Verification gates before guidance',
                  'Sandbox tasks that prove capability',
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
              Inside the intelligence layer
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
              The technology stays private. The method stays clear.
            </h2>

            <p className="mt-4 text-base leading-8 text-sand/65">
              DeepMind Resources does not expose internal scoring logic, private datasets, or
              operational playbooks. What matters for learners and teams is the visible result:
              current guidance, better tool judgement, stronger sandbox tasks, and training that
              moves when AI moves.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {systemLayers.map((layer) => {
              const Icon = layer.icon

              return (
                <article key={layer.title} className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                  <div className="flex gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-xs font-black uppercase tracking-[0.12em] text-[#123BFF]">
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
              Decision discipline
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand">
              The right tool is not the loudest tool. It is the one that fits the work.
            </h2>

            <p className="mt-4 text-sm leading-7 text-sand/65">
              Tool intelligence is only valuable when it improves judgement. The engine looks at
              capability, workflow fit, role suitability, review burden, risk, cost context, and
              training readiness — because useful AI adoption depends on more than access.
            </p>
          </article>

          <div className="grid gap-4 sm:grid-cols-2">
            {decisionPrinciples.map((principle) => {
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
                Capability loop
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                Tool intelligence becomes workforce capability.
              </h2>

              <p className="mt-4 text-base leading-8 text-white/80">
                The point is not to tell people which tool is fashionable. The point is to help
                users and teams understand what to use, when to use it, how to check it, and what
                skill must exist before the tool touches real work.
              </p>

              <div className="mt-7 grid gap-3">
                {proofLoop.map((step) => (
                  <div key={step} className="flex items-start gap-3 rounded-2xl bg-white/10 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" aria-hidden="true" />
                    <p className="text-sm font-semibold leading-6 text-white/90">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {capabilityLayers.map((layer) => {
                const Icon = layer.icon

                return (
                  <article key={layer.title} className="rounded-3xl bg-white p-5 text-sand shadow-sm">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF] shadow-sm">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold tracking-tight text-sand">{layer.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-sand/65">{layer.description}</p>
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
                <Layers3 className="h-4 w-4" aria-hidden="true" />
                Training advantage
              </span>

              <h2 className="mt-5 max-w-4xl text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                The engine feeds the Academy, Sandbox, and business training routes.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-sand/65">
                This is how DeepMind Resources keeps learning practical, current, and operational:
                the intelligence layer finds the signal, the methodology verifies meaning, the
                Academy teaches the route, and the Sandbox proves the skill.
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