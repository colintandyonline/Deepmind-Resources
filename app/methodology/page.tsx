import type { Metadata } from 'next'
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
import { Sidebar } from '@/components/platform/sidebar'

export const metadata: Metadata = {
  title: 'AI Training Methodology | DeepMind Resources',
  description:
    'Explore the DeepMind Resources methodology for source-aware AI training: verified updates, practical meaning, refreshed lessons, sandbox tasks, tool intelligence, and measurable AI competency.',
  alternates: {
    canonical: 'https://deepmindresources.pro/methodology',
  },
  openGraph: {
    title: 'AI Training Methodology | DeepMind Resources',
    description:
      'DeepMind Resources turns verified AI updates into practical lessons, sandbox tasks, tool intelligence, and production-ready AI competency.',
    url: 'https://deepmindresources.pro/methodology',
    siteName: 'DeepMind Resources',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Training Methodology | DeepMind Resources',
    description:
      'A source-aware methodology for converting AI change into verified guidance, practical lessons, sandbox tasks, and workforce capability.',
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
    title: 'Track meaningful AI change',
    description:
      'Model releases, product changes, workflow shifts, tool updates, pricing changes, policy changes, and platform behaviour are treated as signals only when they can affect real capability.',
    icon: Radar,
  },
  {
    label: '02',
    title: 'Verify what changed',
    description:
      'The update is checked against source context, practical impact, affected workflows, risk level, and whether existing training assumptions need to change.',
    icon: FileCheck2,
  },
  {
    label: '03',
    title: 'Translate meaning into guidance',
    description:
      'Noise is converted into operational meaning: who should care, what skill is affected, what risk appears, what task changes, and what users should practise next.',
    icon: BrainCircuit,
  },
  {
    label: '04',
    title: 'Refresh the learning path',
    description:
      'Relevant Academy routes can be updated so learners are not working from stale advice, outdated tool assumptions, or generic course material frozen at publication.',
    icon: BookOpenCheck,
  },
  {
    label: '05',
    title: 'Create verified sandbox tasks',
    description:
      'Important changes become practical exercises, workflow simulations, tool comparisons, validation drills, prompt tests, or agent design tasks that prove usable skill.',
    icon: Route,
  },
  {
    label: '06',
    title: 'Improve recommendations',
    description:
      'The same intelligence improves tool selection, business training routes, skill priorities, and future guidance so the platform stays current instead of static.',
    icon: BadgeCheck,
  },
]

const principles: Principle[] = [
  {
    title: 'Source-aware before instructional',
    description:
      'Training should not start from hype. It starts from a verified change, a known workflow, or a clear capability gap that needs practical translation.',
    icon: ShieldCheck,
  },
  {
    title: 'Operational meaning over novelty',
    description:
      'New does not automatically mean useful. Updates are judged by how they affect prompts, agents, RAG, tools, workflows, risk, or workforce capability.',
    icon: Scale,
  },
  {
    title: 'Practice before production',
    description:
      'The Sandbox exists so learners can test controlled decisions before applying AI to sensitive, business-critical, or customer-facing work.',
    icon: ClipboardCheck,
  },
  {
    title: 'Release-aware learning paths',
    description:
      'AI competency changes as tools change. DeepMind Resources is built to support refresher logic, updated tasks, and current training routes.',
    icon: Workflow,
  },
]

const proofLayers: Principle[] = [
  {
    title: 'Lesson freshness',
    description:
      'A completed lesson can become stale when the underlying model, tool, API, workflow, or risk environment changes.',
    icon: BookOpenCheck,
  },
  {
    title: 'Sandbox evidence',
    description:
      'Skill is demonstrated through practical tasks: prompt control, validation, tool selection, workflow mapping, and agent boundary design.',
    icon: Route,
  },
  {
    title: 'Tool intelligence',
    description:
      'Recommendations are based on workflow fit, operational context, risk profile, capability, and production usefulness rather than generic rankings.',
    icon: Radar,
  },
  {
    title: 'Business readiness',
    description:
      'For teams, the method turns AI training into shared language, safe-use habits, role-based practice, and workforce capability.',
    icon: Layers3,
  },
]

export default function MethodologyPage() {
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
                  <Compass className="h-4 w-4" aria-hidden="true" />
                  Methodology
                </span>

                <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-sand sm:text-5xl lg:text-6xl">
                  The current training layer for AI competency.
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-8 text-sand/65 sm:text-lg">
                  DeepMind Resources is built around a simple operational loop: AI update to
                  verified meaning to practical lesson to sandbox task to user skill gain. The
                  methodology keeps training current, source-aware, and tied to production-ready
                  AI work.
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
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/75">
                  Core loop
                </p>

                <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                  AI update → verified meaning → practical task.
                </h2>

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
                Operating method
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                How AI change becomes usable skill.
              </h2>

              <p className="mt-4 text-base leading-8 text-sand/65">
                The platform does not treat AI training as a fixed library. It treats AI change as
                a signal that must be checked, translated, and converted into something learners
                can practise safely.
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
                Built to avoid stale guidance and unsupported hype.
              </h2>

              <p className="mt-4 text-sm leading-7 text-sand/65">
                AI training fails when it is generic, outdated, or disconnected from real workflow
                judgement. The methodology is designed to keep guidance practical, current, and
                transparent about uncertainty.
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
                  Proof layers
                </span>

                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                  Competency is measured through current practice.
                </h2>

                <p className="mt-4 text-base leading-8 text-white/80">
                  DeepMind Resources connects guidance to tasks. Learners should be able to see
                  why an update matters, what changed in the workflow, and how to practise the
                  skill before using it in real work.
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
                  See the methodology applied inside the Academy and Sandbox.
                </h2>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-sand/65">
                  The public methodology explains the operating model. The Academy turns that
                  model into deterministic learning paths, and the Sandbox turns it into practical
                  skill evidence.
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
    </div>
  )
}
