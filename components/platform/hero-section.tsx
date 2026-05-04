'use client'

import { useEffect, useState } from 'react'
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

const signalNodes = [
  {
    label: 'AI update',
    className: 'left-[9%] top-[22%] hidden sm:flex',
  },
  {
    label: 'Verified meaning',
    className: 'right-[10%] top-[26%] hidden md:flex',
  },
  {
    label: 'Sandbox deployment',
    className: 'left-[13%] bottom-[24%] hidden lg:flex',
  },
  {
    label: 'Skill gain',
    className: 'right-[14%] bottom-[20%] hidden sm:flex',
  },
]

function SignalNetworkLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 opacity-[0.045]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(18, 59, 255, 0.22) 1px, transparent 1px),
              linear-gradient(90deg, rgba(18, 59, 255, 0.22) 1px, transparent 1px)
            `,
            backgroundSize: '44px 44px',
          }}
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(18,59,255,0.16),transparent_30rem)]" />

      <svg
        className="absolute inset-x-[-12%] top-8 h-[25rem] w-[124%] opacity-80 sm:top-4 sm:h-[32rem]"
        viewBox="0 0 1200 520"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="signalRoutePrimary" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#45C9FF" stopOpacity="0" />
            <stop offset="38%" stopColor="#123BFF" stopOpacity="0.32" />
            <stop offset="72%" stopColor="#0A63FF" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#45C9FF" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="signalRouteSecondary" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#123BFF" stopOpacity="0" />
            <stop offset="45%" stopColor="#45C9FF" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#123BFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          className="dmr-signal-route dmr-signal-route-one"
          d="M-40 235 C 190 120, 290 355, 520 244 S 920 122, 1240 230"
          fill="none"
          stroke="url(#signalRoutePrimary)"
          strokeWidth="2"
        />

        <path
          className="dmr-signal-route dmr-signal-route-two"
          d="M-30 335 C 210 408, 370 155, 620 282 S 930 390, 1230 300"
          fill="none"
          stroke="url(#signalRouteSecondary)"
          strokeWidth="2"
        />

        <path
          className="dmr-signal-route dmr-signal-route-three"
          d="M120 90 C 330 165, 400 52, 612 132 S 940 260, 1130 94"
          fill="none"
          stroke="url(#signalRoutePrimary)"
          strokeWidth="1.5"
        />
      </svg>

      <span className="dmr-signal-packet dmr-signal-packet-one" />
      <span className="dmr-signal-packet dmr-signal-packet-two" />
      <span className="dmr-signal-packet dmr-signal-packet-three" />
      <span className="dmr-signal-packet dmr-signal-packet-four" />

      {signalNodes.map((node) => (
        <span
          key={node.label}
          className={`absolute items-center gap-2 rounded-full border border-[#123BFF]/15 bg-white/70 px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#123BFF] shadow-sm backdrop-blur ${node.className}`}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#123BFF] opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#123BFF]" />
          </span>
          {node.label}
        </span>
      ))}

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#123BFF]/30 to-transparent dmr-scan-line" />

      <style>{`
        .dmr-signal-route {
          stroke-dasharray: 18 26;
          animation: dmr-route-flow 11s linear infinite;
        }

        .dmr-signal-route-two {
          animation-duration: 14s;
          animation-direction: reverse;
        }

        .dmr-signal-route-three {
          animation-duration: 16s;
        }

        .dmr-signal-packet {
          position: absolute;
          z-index: 1;
          display: block;
          height: 0.7rem;
          width: 0.7rem;
          border-radius: 9999px;
          background: #123BFF;
          box-shadow:
            0 0 0 0.45rem rgba(18, 59, 255, 0.08),
            0 0 1.5rem rgba(18, 59, 255, 0.38),
            0 0 2.75rem rgba(69, 201, 255, 0.28);
          opacity: 0;
        }

        .dmr-signal-packet::after {
          content: '';
          position: absolute;
          inset: -0.55rem;
          border-radius: 9999px;
          border: 1px solid rgba(69, 201, 255, 0.28);
        }

        .dmr-signal-packet-one {
          left: 8%;
          top: 32%;
          animation: dmr-packet-one 7s ease-in-out infinite;
        }

        .dmr-signal-packet-two {
          right: 12%;
          top: 36%;
          animation: dmr-packet-two 8.5s ease-in-out 1.4s infinite;
        }

        .dmr-signal-packet-three {
          left: 20%;
          bottom: 28%;
          animation: dmr-packet-three 9s ease-in-out 0.7s infinite;
        }

        .dmr-signal-packet-four {
          right: 24%;
          bottom: 34%;
          animation: dmr-packet-four 10s ease-in-out 2.1s infinite;
        }

        .dmr-scan-line {
          animation: dmr-scan-line 7s ease-in-out infinite;
        }

        @keyframes dmr-route-flow {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -220;
          }
        }

        @keyframes dmr-packet-one {
          0% {
            transform: translate3d(-1rem, 0, 0) scale(0.7);
            opacity: 0;
          }
          12% {
            opacity: 0.72;
          }
          58% {
            transform: translate3d(18vw, 5.5rem, 0) scale(1);
            opacity: 0.72;
          }
          78% {
            transform: translate3d(29vw, 2.25rem, 0) scale(0.9);
            opacity: 0.16;
          }
          100% {
            transform: translate3d(35vw, 1rem, 0) scale(0.7);
            opacity: 0;
          }
        }

        @keyframes dmr-packet-two {
          0% {
            transform: translate3d(0, 0, 0) scale(0.7);
            opacity: 0;
          }
          14% {
            opacity: 0.62;
          }
          54% {
            transform: translate3d(-20vw, 4rem, 0) scale(1);
            opacity: 0.66;
          }
          82% {
            transform: translate3d(-35vw, -1.5rem, 0) scale(0.86);
            opacity: 0.18;
          }
          100% {
            transform: translate3d(-42vw, -2.5rem, 0) scale(0.7);
            opacity: 0;
          }
        }

        @keyframes dmr-packet-three {
          0% {
            transform: translate3d(0, 0, 0) scale(0.7);
            opacity: 0;
          }
          12% {
            opacity: 0.56;
          }
          50% {
            transform: translate3d(22vw, -5rem, 0) scale(1);
            opacity: 0.64;
          }
          82% {
            transform: translate3d(42vw, -2rem, 0) scale(0.84);
            opacity: 0.14;
          }
          100% {
            transform: translate3d(50vw, -3rem, 0) scale(0.7);
            opacity: 0;
          }
        }

        @keyframes dmr-packet-four {
          0% {
            transform: translate3d(0, 0, 0) scale(0.7);
            opacity: 0;
          }
          18% {
            opacity: 0.58;
          }
          56% {
            transform: translate3d(-16vw, -5rem, 0) scale(1);
            opacity: 0.68;
          }
          84% {
            transform: translate3d(-34vw, 0.5rem, 0) scale(0.86);
            opacity: 0.16;
          }
          100% {
            transform: translate3d(-40vw, 1.5rem, 0) scale(0.7);
            opacity: 0;
          }
        }

        @keyframes dmr-scan-line {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0;
          }
          18% {
            opacity: 0.5;
          }
          50% {
            transform: translateY(18rem);
            opacity: 0.25;
          }
          80% {
            opacity: 0;
          }
        }

        @media (max-width: 640px) {
          .dmr-signal-route {
            stroke-width: 1.25;
            stroke-dasharray: 12 32;
          }

          .dmr-signal-packet {
            height: 0.5rem;
            width: 0.5rem;
          }

          .dmr-signal-packet-one {
            left: 6%;
            top: 27%;
          }

          .dmr-signal-packet-two,
          .dmr-signal-packet-four {
            display: none;
          }

          .dmr-signal-packet-three {
            left: 14%;
            bottom: 31%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .dmr-signal-route,
          .dmr-signal-packet,
          .dmr-scan-line {
            animation: none !important;
          }

          .dmr-signal-packet {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

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
      <SignalNetworkLayer />

      <div className="relative z-10 py-14 sm:py-16 lg:py-24">
        <div className="mb-7 flex items-center justify-center sm:mb-8">
          <div className="flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-full border border-[#123BFF]/20 bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span
                className={`absolute inline-flex h-full w-full rounded-full bg-[#123BFF] ${
                  isLive ? 'animate-ping' : ''
                } opacity-75`}
              />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#123BFF]" />
            </span>
            <span className="text-center text-xs font-bold uppercase tracking-[0.16em] text-[#123BFF] sm:text-sm">
              {systemStatus}
            </span>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 text-center">
          <div className="relative mx-auto max-w-5xl rounded-[2rem] border border-white/70 bg-white/28 px-4 py-7 shadow-[0_24px_90px_rgba(18,59,255,0.08)] backdrop-blur-sm sm:px-8 sm:py-9 lg:px-10">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#123BFF]/30 to-transparent" />

            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-sand">Master the Art of</span>
              <br />
              <span className="relative inline-flex text-[#123BFF]">
                Agentic AI Systems
                <span className="absolute -bottom-2 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#45C9FF]/60 to-transparent" />
              </span>
            </h1>

            <p className="mx-auto mb-6 max-w-3xl text-pretty text-lg leading-relaxed text-sand/60 sm:text-xl">
              From AI beginner to multi-agent builder. Learn with verified lessons that evolve
              as new models, tools, and platform updates change what matters.
            </p>

            <p className="mx-auto mb-10 max-w-3xl text-pretty text-base leading-relaxed text-sand/55 sm:text-lg">
              DeepMind Resources cuts through hype, compares AI tools for real scenarios, and turns
              trusted updates into practical sandbox training for individuals, teams, and businesses.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="group w-full bg-[#123BFF] px-8 font-semibold text-white shadow-sm hover:bg-[#0A63FF] sm:w-auto"
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
                className="w-full border-sand/20 bg-white/75 px-8 font-semibold text-sand hover:border-[#123BFF]/30 hover:bg-white hover:text-[#123BFF] sm:w-auto"
              >
                <Link href="/syllabus">View Live Curriculum</Link>
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-6xl rounded-[2rem] border border-sand/10 bg-white/90 p-5 text-left shadow-sm backdrop-blur sm:p-6 lg:p-8">
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
