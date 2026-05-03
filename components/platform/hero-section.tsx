'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  Database,
  Layers3,
  Network,
  Radar,
  Route,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const catalogueMetrics = [
  {
    icon: Database,
    label: 'Companies mapped',
    value: '133',
    description: 'AI companies structured into the catalogue spine.',
  },
  {
    icon: Network,
    label: 'Platforms indexed',
    value: '174',
    description: 'Products and platforms connected to owners and models.',
  },
  {
    icon: Layers3,
    label: 'Capability routes',
    value: '42',
    description: 'Capability areas used to route training and sandbox work.',
  },
  {
    icon: Radar,
    label: 'Comparison groups',
    value: '28',
    description: 'Use-case groups for tool intelligence and pathway planning.',
  },
]

const academyTracks = [
  {
    icon: BrainCircuit,
    eyebrow: 'Beginner Core',
    title: 'Build the operating base',
    description:
      'Start with AI fundamentals, prompt structure, safe-use boundaries, tool judgement, and the first verified sandbox behaviours.',
    href: '/path/fundamentals',
  },
  {
    icon: BriefcaseBusiness,
    eyebrow: 'Business Readiness',
    title: 'Train staff for real workflows',
    description:
      'Turn AI adoption into role-aware capability with privacy rules, review gates, manager visibility, and workflow-ready practice.',
    href: '/business-ai-training',
  },
  {
    icon: Workflow,
    eyebrow: 'Builder Track',
    title: 'Move into agentic systems',
    description:
      'Progress from prompt control into tool calling, RAG, agents, multi-agent systems, and production-aware orchestration.',
    href: '/path/agents',
  },
  {
    icon: ShieldCheck,
    eyebrow: 'Tool Intelligence Track',
    title: 'Choose tools by evidence and fit',
    description:
      'Use catalogue structure, capability groups, and comparison logic to avoid hype-driven tool decisions.',
    href: '/platform',
  },
]

export function HeroSection() {
  const [isLive, setIsLive] = useState(true)
  const [systemStatus] = useState('LIVE AI INTELLIGENCE ONLINE')

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLive((prev) => !prev)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.035]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(18, 59, 255, 0.18) 1px, transparent 1px),
              linear-gradient(90deg, rgba(18, 59, 255, 0.18) 1px, transparent 1px)
            `,
            backgroundSize: '52px 52px',
          }}
        />
      </div>

      {/* Scan Line Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#123BFF]/25 to-transparent animate-scan-line" />
      </div>

      <div className="relative z-10 py-16 lg:py-24">
        {/* Live Status Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-3 rounded-full border border-[#123BFF]/20 bg-white/75 px-4 py-2 shadow-sm backdrop-blur">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`absolute inline-flex h-full w-full rounded-full bg-[#123BFF] ${
                  isLive ? 'animate-ping' : ''
                } opacity-75`}
              />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#123BFF]" />
            </span>
            <span className="text-sm font-bold uppercase tracking-[0.14em] text-[#123BFF]">
              {systemStatus}
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-sand sm:text-5xl lg:text-6xl">
            AI competency that stays current as the frontier moves.
          </h1>

          <p className="mx-auto mb-6 max-w-3xl text-pretty text-lg leading-relaxed text-sand/62 sm:text-xl">
            DeepMind Resources is the current training layer for professional AI work. We turn
            catalogue-backed intelligence into deterministic learning paths, verified guidance,
            sandbox tasks, and production-ready skill gain.
          </p>

          <p className="mx-auto mb-10 max-w-3xl text-pretty text-base leading-relaxed text-sand/55 sm:text-lg">
            The system maps companies, platforms, models, capabilities, and comparison groups so
            learners and teams can stay ahead of the curve, not just in the queue.
          </p>

          {/* CTA Buttons */}
          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="group bg-[#123BFF] px-8 font-semibold text-white shadow-sm hover:bg-[#0A63FF]"
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
              className="border-sand/20 bg-white/70 px-8 font-semibold text-sand hover:border-[#123BFF]/30 hover:bg-white hover:text-[#123BFF]"
            >
              <Link href="/syllabus">View Live Curriculum</Link>
            </Button>
          </div>

          {/* Catalogue-backed metrics */}
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {catalogueMetrics.map((metric) => {
              const Icon = metric.icon

              return (
                <div
                  key={metric.label}
                  className="rounded-3xl border border-sand/10 bg-white/90 p-5 text-left shadow-sm transition-all duration-300 hover:border-[#123BFF]/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-mono text-3xl font-bold tracking-tight text-sand">
                        {metric.value}
                      </div>
                      <div className="mt-1 text-sm font-bold text-[#123BFF]">{metric.label}</div>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-sand/58">{metric.description}</p>
                </div>
              )
            })}
          </div>

          {/* Four learning tracks */}
          <div className="mx-auto mt-8 max-w-6xl rounded-[2rem] border border-sand/10 bg-white/88 p-5 text-left shadow-sm backdrop-blur sm:p-6 lg:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <Route className="h-4 w-4" aria-hidden="true" />
                  Academy structure
                </span>
                <h2 className="mt-5 text-2xl font-bold tracking-tight text-sand sm:text-3xl">
                  Four learning tracks built from the catalogue spine.
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-sand/62 sm:text-base">
                  The homepage now reflects the real platform structure: beginner competency,
                  business readiness, builder capability, and tool intelligence.
                </p>
              </div>

              <Link
                href="/syllabus"
                className="inline-flex w-fit items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-5 py-3 text-sm font-bold text-[#123BFF] shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#0A63FF]"
              >
                View syllabus
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {academyTracks.map((track) => {
                const Icon = track.icon

                return (
                  <Link
                    key={track.eyebrow}
                    href={track.href}
                    className="group rounded-3xl border border-sand/10 bg-white p-5 shadow-sm transition hover:border-[#123BFF]/30 hover:shadow-md"
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF] shadow-sm transition group-hover:bg-[#123BFF] group-hover:text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                      {track.eyebrow}
                    </p>
                    <h3 className="mt-2 text-lg font-bold tracking-tight text-sand">{track.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-sand/62">{track.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#123BFF]">
                      Open track
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                )
              })}
            </div>

            <div className="mt-6 rounded-2xl bg-[#EAF7FF] p-4 text-sm leading-7 text-sand/65">
              <span className="font-bold text-sand">Truthful platform signal:</span> these numbers
              describe the catalogue foundation and routing layer, not invented users, fake progress,
              or inflated activity claims.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
