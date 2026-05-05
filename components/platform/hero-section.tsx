'use client'

import Image from 'next/image'
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
      <div className="relative z-10">
        <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-[#EAF7FF]">
          <Image
            src="/brand/homepage-system-hero.png"
            alt="DeepMind Resources connected AI training system with verification, tool intelligence, sandbox proof, academy pathways, and workforce capability nodes"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />

          <div
            className="absolute inset-0 bg-gradient-to-r from-white via-white/78 to-white/8"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-white/55 via-transparent to-[#EAF7FF]/72"
            aria-hidden="true"
          />

          <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center px-4 py-14 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <div className="mb-7 inline-flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-full border border-[#123BFF]/20 bg-white/86 px-4 py-2 shadow-sm backdrop-blur">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#123BFF] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#123BFF]" />
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#123BFF] sm:text-sm">
                  LIVE AI INTELLIGENCE ONLINE
                </span>
              </div>

              <h1 className="text-balance text-5xl font-black leading-[0.96] tracking-[-0.06em] text-sand sm:text-6xl lg:text-7xl">
                <span>Master the Art of</span>
                <br />
                <span className="text-[#123BFF]">Agentic AI Systems</span>
              </h1>

              <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-sand/66 sm:text-xl">
                From AI beginner to multi-agent builder. Learn with verified lessons that evolve
                as new models, tools, and platform updates change what matters.
              </p>

              <p className="mt-5 max-w-xl text-pretty text-base leading-8 text-sand/60 sm:text-lg">
                DeepMind Resources cuts through hype, compares AI tools for real scenarios, and turns
                trusted updates into practical sandbox training for individuals, teams, and businesses.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="group w-full rounded-xl bg-[#123BFF] px-8 font-semibold text-white shadow-[0_14px_34px_rgba(18,59,255,0.22)] hover:bg-[#0A63FF] sm:w-auto"
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
                  className="w-full rounded-xl border-sand/12 bg-white/82 px-8 font-semibold text-sand shadow-sm backdrop-blur hover:border-[#123BFF]/30 hover:bg-white hover:text-[#123BFF] sm:w-auto"
                >
                  <Link href="/syllabus">View Live Curriculum</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-5 text-left shadow-sm backdrop-blur sm:p-6 lg:p-8">
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
                      className="group rounded-3xl border border-sand/10 bg-white p-5 shadow-sm transition hover:border-[#123BFF]/30 hover:shadow-md"
                    >
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF] shadow-sm transition group-hover:bg-[#123BFF] group-hover:text-white">
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
