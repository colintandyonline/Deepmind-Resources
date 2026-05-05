'use client'

import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Network,
  Route,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const academyPaths = [
  {
    icon: BrainCircuit,
    label: 'Foundation route',
    title: 'AI Fundamentals',
    description:
      'Build the operating base: how AI works, where it fails, what needs review, and how to use it safely before real workflow use.',
    href: '/path/fundamentals',
  },
  {
    icon: Sparkles,
    label: 'Prompt control stack',
    title: 'Prompt Engineering',
    description:
      'Turn weak requests into structured instructions with context, constraints, output rules, and validation before production use.',
    href: '/path/prompting',
  },
  {
    icon: Bot,
    label: 'Agent control route',
    title: 'Agent Architecture',
    description:
      'Design bounded AI agents with defined goals, tool permissions, memory rules, escalation points, and human review gates.',
    href: '/path/agents',
  },
  {
    icon: Network,
    label: 'Orchestration route',
    title: 'Multi-Agent Systems',
    description:
      'Coordinate specialist agents with explicit roles, handoff contracts, shared state, validation layers, and reviewable workflow logic.',
    href: '/path/multi-agent-systems',
  },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative z-10 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="dmr-glass-panel dmr-orbit-dot rounded-[2rem] px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="relative z-10">
                <div className="mb-6 flex justify-start">
                  <div className="dmr-blue-pill px-4 py-2 text-[0.68rem] sm:text-xs">
                    LIVE AI INTELLIGENCE ONLINE
                  </div>
                </div>

                <h1 className="dmr-soft-heading text-balance text-4xl font-black leading-[0.96] tracking-[-0.06em] sm:text-5xl lg:text-6xl">
                  <span>Master the Art of</span>
                  <br />
                  <span className="dmr-gradient-text">Agentic AI Systems</span>
                </h1>

                <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-sand/65 sm:text-xl">
                  From AI beginner to multi-agent builder. Learn with verified lessons that evolve
                  as new models, tools, and platform updates change what matters.
                </p>

                <p className="mt-5 max-w-2xl text-pretty text-base leading-8 text-sand/60 sm:text-lg">
                  DeepMind Resources cuts through hype, compares AI tools for real scenarios, and turns
                  trusted updates into practical sandbox training for individuals, teams, and businesses.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="dmr-premium-button group w-full px-8 font-semibold sm:w-auto"
                  >
                    <Link href="/academy">
                      Explore Academy
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="dmr-secondary-button w-full px-8 font-semibold hover:border-[#123BFF]/30 hover:bg-white hover:text-[#123BFF] sm:w-auto"
                  >
                    <Link href="/syllabus">View Live Curriculum</Link>
                  </Button>
                </div>
              </div>

              <div className="dmr-node-map relative min-h-[26rem] rounded-[2rem] bg-gradient-to-br from-white/70 via-[#EAF7FF]/78 to-[#DDF3FF]/88 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] sm:p-6 lg:min-h-[34rem]">
                <div className="absolute inset-0 rounded-[2rem] border border-white/80" aria-hidden="true" />

                <div className="relative grid min-h-[24rem] gap-4 sm:grid-cols-2 lg:min-h-[32rem]">
                  <div className="flex flex-col gap-4">
                    <div className="dmr-floating-card rounded-[1.5rem] p-5">
                      <span className="dmr-icon-tile">
                        <Sparkles className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <p className="dmr-card-number mt-4">01 | Signal Grid</p>
                      <h2 className="mt-2 text-xl font-black tracking-tight text-sand">
                        Identify what matters
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-sand/62">
                        Track meaningful model, tool, workflow, and platform shifts before they become stale training.
                      </p>
                    </div>

                    <div className="dmr-floating-card rounded-[1.5rem] p-5">
                      <span className="dmr-icon-tile">
                        <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <p className="dmr-card-number mt-4">02 | Verification Gates</p>
                      <h2 className="mt-2 text-xl font-black tracking-tight text-sand">
                        Prove reliability
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-sand/62">
                        Separate verified guidance from hype, weak claims, and outdated AI advice.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 sm:pt-8">
                    <div className="dmr-floating-card rounded-[1.5rem] p-5">
                      <span className="dmr-icon-tile">
                        <Network className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <p className="dmr-card-number mt-4">03 | Tool Intelligence</p>
                      <h2 className="mt-2 text-xl font-black tracking-tight text-sand">
                        Choose with context
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-sand/62">
                        Map AI tools to real scenarios, roles, constraints, and production workflows.
                      </p>
                    </div>

                    <div className="dmr-hub-card rounded-[1.75rem] p-6">
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-white/75">
                        Core system layer
                      </p>
                      <h2 className="mt-3 text-2xl font-black tracking-tight">
                        AI update → verified meaning → practical skill.
                      </h2>
                      <div className="mt-5 grid gap-3">
                        {[
                          'Academy pathways',
                          'Verified sandbox tasks',
                          'Business-ready competency',
                        ].map((item) => (
                          <div key={item} className="rounded-2xl bg-white/12 px-4 py-3 text-sm font-bold text-white">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-7xl rounded-[2rem] border border-sand/10 bg-white/90 p-5 text-left shadow-sm backdrop-blur sm:p-6 lg:mt-10 lg:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <Route className="h-4 w-4" aria-hidden="true" />
                  Academy pathways
                </span>

                <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                  Start with the pathway that matches your AI work.
                </h2>

                <p className="mt-4 text-base leading-8 text-sand/65">
                  The Academy is organised around the four public learning routes that matter most:
                  foundations, prompt control, agent architecture, and multi-agent orchestration.
                </p>

                <div className="mt-6 grid gap-3">
                  {[
                    'Verified guidance before workflow use',
                    'Sandbox practice connected to each path',
                    'Production-ready skill gain for individuals and teams',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-[#EAF7FF] p-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#123BFF]" aria-hidden="true" />
                      <p className="text-sm font-semibold leading-6 text-sand/75">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {academyPaths.map((path) => {
                  const Icon = path.icon

                  return (
                    <Link
                      key={path.title}
                      href={path.href}
                      className="dmr-floating-card group rounded-3xl p-5"
                    >
                      <span className="dmr-icon-tile">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                        {path.label}
                      </p>
                      <h3 className="mt-2 text-lg font-bold tracking-tight text-sand">{path.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-sand/62">{path.description}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#123BFF]">
                        Open pathway
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
