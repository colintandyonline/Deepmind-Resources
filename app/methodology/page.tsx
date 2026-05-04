import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BrainCircuit,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  FileCheck2,
  Layers3,
  Radar,
  Route,
  Scale,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Training Methodology | DeepMind Resources',
  description:
    'Explore the DeepMind Resources methodology for source-aware AI training: verified AI updates, practical lessons, sandbox tasks, tool intelligence, and measurable AI competency.',
  alternates: {
    canonical: 'https://deepmindresources.pro/methodology',
  },
  openGraph: {
    title: 'AI Training Methodology | DeepMind Resources',
    description:
      'DeepMind Resources turns verified AI updates into release-aware learning, practical lessons, verified sandbox tasks, tool intelligence, and production-ready AI competency.',
    url: 'https://deepmindresources.pro/methodology',
    siteName: 'DeepMind Resources',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Training Methodology | DeepMind Resources',
    description:
      'A source-aware methodology for converting AI change into verified guidance, sandbox practice, tool intelligence, and workforce capability.',
  },
}

type MethodStep = {
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

const methodologySteps: MethodStep[] = [
  {
    label: '01',
    title: 'Track frontier AI change',
    description:
      'Model releases, tool updates, policy shifts, workflow changes, pricing moves, and platform behaviour are watched as possible training signals — but only meaningful change moves forward.',
    icon: Radar,
  },
  {
    label: '02',
    title: 'Verify operational meaning',
    description:
      'Each signal is checked for source context, practical impact, affected roles, risk level, workflow relevance, and whether current training advice needs to be refreshed.',
    icon: FileCheck2,
  },
  {
    label: '03',
    title: 'Translate change into guidance',
    description:
      'Important updates are distilled into clear guidance: what changed, who should care, what skill is affected, what risk appears, and what action should happen next.',
    icon: BrainCircuit,
  },
  {
    label: '04',
    title: 'Refresh the learning path',
    description:
      'Relevant Academy pathways can move from stale assumptions into current lessons, updated examples, release-aware guidance, and sharper production judgement.',
    icon: BookOpenCheck,
  },
  {
    label: '05',
    title: 'Create verified sandbox tasks',
    description:
      'The change becomes practical work: prompt tests, workflow simulations, RAG checks, tool comparisons, validation drills, or agent design tasks users can prove.',
    icon: Route,
  },
  {
    label: '06',
    title: 'Improve tool intelligence',
    description:
      'The same intelligence strengthens recommendations, business training routes, workflow priorities, and future updates so learners stay ahead of the curve — not just in the queue.',
    icon: BadgeCheck,
  },
]

const principles: Principle[] = [
  {
    title: 'Verified before taught',
    description:
      'DeepMind Resources does not turn every AI headline into training. Guidance starts when a change has practical meaning, workflow impact, or capability value.',
    icon: ShieldCheck,
  },
  {
    title: 'Operational over ornamental',
    description:
      'The method favours usable judgement: prompts that hold shape, tools that fit the workflow, agents with boundaries, and tasks that build production-ready skill.',
    icon: Scale,
  },
  {
    title: 'Practice before deployment',
    description:
      'The Sandbox exists so learners can test decisions, outputs, validation steps, and workflow controls before applying AI to sensitive or business-critical work.',
    icon: ClipboardCheck,
  },
  {
    title: 'Current by design',
    description:
      'AI competency changes as the frontier moves. The platform is built around refresh logic, updated tasks, and release-aware learning paths rather than frozen course material.',
    icon: Workflow,
  },
]

const proofLayers: Principle[] = [
  {
    title: 'Release-aware lessons',
    description:
      'Training paths are designed to reflect meaningful changes in models, tools, APIs, workflows, risks, and real-world AI use.',
    icon: BookOpenCheck,
  },
  {
    title: 'Verified sandbox evidence',
    description:
      'Skill is demonstrated through practical tasks: prompt control, validation, tool selection, workflow mapping, and agent boundary design.',
    icon: Route,
  },
  {
    title: 'Tool intelligence',
    description:
      'Recommendations are shaped by workflow fit, operational context, risk profile, production usefulness, and capability — not generic rankings.',
    icon: Radar,
  },
  {
    title: 'Workforce capability',
    description:
      'For teams, the method turns AI training into shared language, safe-use habits, role-based practice, and measurable business readiness.',
    icon: Layers3,
  },
]

export default function MethodologyPage() {
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
                <Compass className="h-4 w-4" aria-hidden="true" />
                Methodology
              </span>

              <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-sand sm:text-5xl lg:text-6xl">
                The operating method behind current AI competency.
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-sand/65 sm:text-lg">
                DeepMind Resources is not a static course library. It is a release-aware training
                layer that turns meaningful AI change into verified guidance, practical lessons,
                sandbox tasks, and production-ready skill gain.
              </p>

              <p className="mt-4 max-w-3xl text-base leading-8 text-sand/65 sm:text-lg">
                The methodology is deliberately operational: track the update, verify what changed,
                translate the meaning, refresh the pathway, create the task, and improve the next
                recommendation.
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
                    Core loop
                  </p>

                  <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                    AI update → verified meaning → practical task.
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
                A deterministic system for keeping AI training current: source-aware updates,
                verified interpretation, practical instruction, and measurable sandbox evidence.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  'Verified guidance instead of hype',
                  'Deterministic learning paths',
                  'Verified sandbox tasks',
                  'Production-ready AI skills',
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
              <Workflow className="h-4 w-4" aria-hidden="true" />
              Operating system
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
              How frontier AI change becomes usable skill.
            </h2>

            <p className="mt-4 text-base leading-8 text-sand/65">
              Most AI training goes stale because it treats learning as a finished asset. DeepMind
              Resources treats AI change as an input: something to verify, translate, practise, and
              convert into capability.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {methodologySteps.map((step) => {
              const Icon = step.icon

              return (
                <article key={step.title} className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                  <div className="flex gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-sm font-bold text-[#123BFF]">
                      {step.label}
                    </span>

                    <div>
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-[#123BFF]" aria-hidden="true" />
                        <h3 className="text-lg font-bold text-sand">{step.title}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-sand/65">{step.description}</p>
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
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Trust principles
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand">
              Built to reject stale guidance, vague claims, and AI theatre.
            </h2>

            <p className="mt-4 text-sm leading-7 text-sand/65">
              The method keeps DeepMind Resources focused on what actually improves AI competency:
              verified meaning, controlled practice, source-aware judgement, and practical
              workflows that can survive real use.
            </p>
          </article>

          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map((principle) => {
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
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Capability proof
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                Competency is proven through current practice.
              </h2>

              <p className="mt-4 text-base leading-8 text-white/80">
                The platform connects guidance to work. Users should understand why an update
                matters, what changed in the workflow, what to practise, and how to prove the skill
                before using it in production.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {proofLayers.map((layer) => {
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
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                Next step
              </span>

              <h2 className="mt-5 max-w-4xl text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                See the method applied inside the Academy and Sandbox.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-sand/65">
                The methodology explains the operating model. The Academy turns it into
                deterministic learning paths. The Sandbox turns it into skill evidence.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/syllabus"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
              >
                View Syllabus
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                href="/platform"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-6 py-4 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
              >
                Explore Platform
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
