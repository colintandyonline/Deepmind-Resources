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

const aiToolStrip = [
  {
    name: 'ChatGPT',
    logo: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="#EAF7FF" />
        <path
          d="M24 8.5c4.4 0 7.9 2.8 9.2 6.7 3.7.9 6.4 4.1 6.4 8 0 3.2-1.8 6-4.5 7.4-.4 4.2-3.9 7.5-8.2 7.5-2.3 0-4.3-.9-5.8-2.4-4 .5-7.7-2-8.9-5.9-3.1-1.4-5.2-4.5-5.2-8.1 0-3.8 2.4-7.1 5.8-8.3C14.3 10.4 18.8 8.5 24 8.5Zm0 4.2c-2.9 0-5.4 1.4-6.5 3.6l6.9 4 6-3.5c-.7-2.4-3.2-4.1-6.4-4.1Zm-9.7 5.3c-1.8.8-3.1 2.5-3.1 4.7 0 1.8.9 3.4 2.3 4.4v-8.3l.8-.8Zm17.6 1.3-6.8 4v7l6.8-3.9v-7.1Zm-14.9.1v7.5l6.7 3.9v-7.6L17 19.4Zm18.2 1.7v7.1l-6.8 3.9c1 .9 2.3 1.4 3.8 1.4 2.8 0 5.2-2.2 5.2-5.2 0-1.8-.8-3.5-2.2-4.5v-2.7Zm-20 9.2c.7 2.4 3.2 4.1 6.3 4.1 1.5 0 2.9-.4 4-1.1l-6.6-3.8-3.7.8Z"
          fill="#123BFF"
        />
      </svg>
    ),
  },
  {
    name: 'Claude',
    logo: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="#EAF7FF" />
        <path d="M24 9 39 38H29.5l-2.4-5.3H20.7L18.3 38H9L24 9Zm0 10.5-4.1 9.2h8.2L24 19.5Z" fill="#123BFF" />
      </svg>
    ),
  },
  {
    name: 'Gemini',
    logo: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="#EAF7FF" />
        <path d="M24 7c1.9 8.7 7.3 14.1 17 17-9.7 2.9-15.1 8.3-17 17-1.9-8.7-7.3-14.1-17-17 9.7-2.9 15.1-8.3 17-17Z" fill="#123BFF" />
        <path d="M24 14.5c1.1 4.7 4.1 7.7 9.5 9.5-5.4 1.8-8.4 4.8-9.5 9.5-1.1-4.7-4.1-7.7-9.5-9.5 5.4-1.8 8.4-4.8 9.5-9.5Z" fill="#45C9FF" />
      </svg>
    ),
  },
  {
    name: 'Perplexity',
    logo: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="#EAF7FF" />
        <path d="M14 10h20v8h5v20h-8l-7 6-7-6H9V18h5v-8Zm4 4v9l6-5.2L30 23v-9H18Zm-5 8v12h5.4l5.6 4.8 5.6-4.8H35V22h-4.7L24 27.5 17.7 22H13Z" fill="#123BFF" />
      </svg>
    ),
  },
  {
    name: 'Grok',
    logo: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="#EAF7FF" />
        <path d="M13 12h7.5l5.2 7.2 6.2-7.2H39L29.4 23.2 40 37h-7.6l-6.7-8.9L18 37h-7.1l11.3-13.1L13 12Zm5.3 4 14.3 17h2.1L20.4 16h-2.1Z" fill="#123BFF" />
      </svg>
    ),
  },
  {
    name: 'DeepSeek',
    logo: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="#EAF7FF" />
        <path d="M9 25.5c4.6-7.8 10.8-11.7 18.5-11.7 5.6 0 9.9 2.2 12.9 6.5-2.5-.9-5.1-1-7.7-.2 2.7 1.8 4.6 4.4 5.7 7.8-3.1-2.2-6.2-3.2-9.4-2.9 1.6 1.6 2.5 3.6 2.7 6-2.8-1.9-5.8-2.8-9-2.8-4.2 0-8.8 1.6-13.7 4.8 1.9-2.3 3.6-4.8 5-7.5H9Z" fill="#123BFF" />
        <path d="M18 23.2c3.8-1.8 7.5-2.4 11.1-1.6-3.4-3-7.1-3.1-11.1-.3v1.9Z" fill="#45C9FF" />
      </svg>
    ),
  },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative z-10">
        <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden rounded-[2rem] bg-[#EAF7FF]">
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

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-sand/10 bg-white/88 px-6 py-6 shadow-sm backdrop-blur">
            <p className="text-center text-xs font-black uppercase tracking-[0.18em] text-[#123BFF]">
              Tracking the AI models and tools shaping modern workflows
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {aiToolStrip.map((tool) => (
                <div
                  key={tool.name}
                  className="flex min-h-20 items-center justify-center gap-3 rounded-3xl border border-[#123BFF]/10 bg-white px-5 py-4 text-center shadow-sm transition hover:border-[#123BFF]/25 hover:shadow-md"
                >
                  {tool.logo}
                  <span className="text-lg font-black tracking-[-0.05em] text-sand/62">
                    {tool.name}
                  </span>
                </div>
              ))}
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