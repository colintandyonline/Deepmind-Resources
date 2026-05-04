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

function IntelligenceBurstField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 opacity-[0.055]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(18, 59, 255, 0.18) 1px, transparent 1px),
              linear-gradient(90deg, rgba(18, 59, 255, 0.18) 1px, transparent 1px)
            `,
            backgroundSize: '46px 46px',
          }}
        />
      </div>

      <div className="absolute left-1/2 top-16 h-[32rem] w-[42rem] -translate-x-1/2 rounded-full bg-[#123BFF]/[0.075] blur-3xl" />
      <div className="absolute right-[8%] top-24 h-64 w-64 rounded-full bg-[#45C9FF]/[0.11] blur-3xl" />
      <div className="absolute left-[6%] top-44 h-56 w-56 rounded-full bg-[#0A63FF]/[0.08] blur-3xl" />

      <svg
        className="absolute left-1/2 top-6 h-[34rem] w-[118%] -translate-x-1/2 opacity-75"
        viewBox="0 0 1200 560"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="dmrBurstLineA" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#123BFF" stopOpacity="0" />
            <stop offset="48%" stopColor="#123BFF" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#45C9FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="dmrBurstLineB" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#45C9FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#45C9FF" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#123BFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          className="dmr-burst-route dmr-burst-route-a"
          d="M-80 250 C 160 112, 344 330, 560 224 S 945 120, 1280 238"
          fill="none"
          stroke="url(#dmrBurstLineA)"
          strokeWidth="1.6"
        />
        <path
          className="dmr-burst-route dmr-burst-route-b"
          d="M-70 366 C 190 460, 382 170, 630 304 S 950 416, 1270 314"
          fill="none"
          stroke="url(#dmrBurstLineB)"
          strokeWidth="1.4"
        />
        <path
          className="dmr-burst-route dmr-burst-route-c"
          d="M95 102 C 302 162, 440 56, 640 144 S 950 286, 1130 108"
          fill="none"
          stroke="url(#dmrBurstLineA)"
          strokeWidth="1.2"
        />
      </svg>

      <span className="dmr-data-burst dmr-data-burst-one" />
      <span className="dmr-data-burst dmr-data-burst-two" />
      <span className="dmr-data-burst dmr-data-burst-three" />
      <span className="dmr-data-burst dmr-data-burst-four" />
      <span className="dmr-data-burst dmr-data-burst-five" />
      <span className="dmr-data-burst dmr-data-burst-six" />

      <span className="dmr-signal-node dmr-signal-node-one" />
      <span className="dmr-signal-node dmr-signal-node-two" />
      <span className="dmr-signal-node dmr-signal-node-three" />
      <span className="dmr-signal-node dmr-signal-node-four" />

      <span className="dmr-data-shard left-[12%] top-[26%] rotate-[13deg]" />
      <span className="dmr-data-shard right-[16%] top-[31%] rotate-[-12deg]" />
      <span className="dmr-data-shard left-[21%] bottom-[27%] rotate-[-8deg]" />
      <span className="dmr-data-shard right-[24%] bottom-[31%] rotate-[9deg]" />
      <span className="dmr-data-shard left-[42%] top-[19%] rotate-[6deg]" />
      <span className="dmr-data-shard right-[38%] bottom-[21%] rotate-[-6deg]" />

      <style>{`
        .dmr-burst-route {
          stroke-dasharray: 10 30;
          animation: dmr-route-drift 16s linear infinite;
        }

        .dmr-burst-route-b {
          animation-duration: 19s;
          animation-direction: reverse;
        }

        .dmr-burst-route-c {
          animation-duration: 23s;
        }

        .dmr-data-burst {
          position: absolute;
          display: block;
          height: 0.34rem;
          width: 2.8rem;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent, rgba(18, 59, 255, 0.52), rgba(69, 201, 255, 0.34), transparent);
          box-shadow: 0 0 20px rgba(18, 59, 255, 0.18), 0 0 34px rgba(69, 201, 255, 0.12);
          opacity: 0;
        }

        .dmr-data-burst::before,
        .dmr-data-burst::after {
          content: '';
          position: absolute;
          top: 50%;
          height: 1px;
          border-radius: 999px;
          background: rgba(18, 59, 255, 0.22);
          transform: translateY(-50%);
        }

        .dmr-data-burst::before {
          left: -1.25rem;
          width: 1rem;
        }

        .dmr-data-burst::after {
          right: -1.55rem;
          width: 1.25rem;
        }

        .dmr-data-burst-one {
          left: -6%;
          top: 29%;
          animation: dmr-burst-one 8s ease-in-out infinite;
        }

        .dmr-data-burst-two {
          right: -8%;
          top: 35%;
          animation: dmr-burst-two 9.5s ease-in-out 1.1s infinite;
        }

        .dmr-data-burst-three {
          left: 14%;
          bottom: 31%;
          animation: dmr-burst-three 10.5s ease-in-out 0.6s infinite;
        }

        .dmr-data-burst-four {
          right: 20%;
          bottom: 26%;
          animation: dmr-burst-four 11s ease-in-out 2s infinite;
        }

        .dmr-data-burst-five {
          left: 38%;
          top: 16%;
          animation: dmr-burst-five 12s ease-in-out 1.7s infinite;
        }

        .dmr-data-burst-six {
          right: 38%;
          top: 48%;
          animation: dmr-burst-six 13s ease-in-out 2.8s infinite;
        }

        .dmr-signal-node {
          position: absolute;
          display: block;
          height: 0.48rem;
          width: 0.48rem;
          border-radius: 999px;
          background: #123BFF;
          box-shadow: 0 0 0 0.42rem rgba(18, 59, 255, 0.06), 0 0 1.6rem rgba(18, 59, 255, 0.26);
          opacity: 0.34;
          animation: dmr-node-pulse 5.5s ease-in-out infinite;
        }

        .dmr-signal-node-one {
          left: 18%;
          top: 33%;
        }

        .dmr-signal-node-two {
          right: 20%;
          top: 38%;
          animation-delay: 1.2s;
        }

        .dmr-signal-node-three {
          left: 31%;
          bottom: 29%;
          animation-delay: 2.1s;
        }

        .dmr-signal-node-four {
          right: 34%;
          bottom: 35%;
          animation-delay: 3s;
        }

        .dmr-data-shard {
          position: absolute;
          display: block;
          height: 1px;
          width: 3.4rem;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent, rgba(18, 59, 255, 0.24), transparent);
          animation: dmr-shard-flash 7s ease-in-out infinite;
          opacity: 0.18;
        }

        @keyframes dmr-route-drift {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -260;
          }
        }

        @keyframes dmr-burst-one {
          0% { transform: translate3d(0, 0, 0) rotate(8deg) scaleX(0.7); opacity: 0; }
          10% { opacity: 0.54; }
          22% { opacity: 0.18; }
          36% { opacity: 0.58; }
          64% { transform: translate3d(44vw, 4.5rem, 0) rotate(8deg) scaleX(1); opacity: 0.42; }
          100% { transform: translate3d(72vw, 1rem, 0) rotate(8deg) scaleX(0.78); opacity: 0; }
        }

        @keyframes dmr-burst-two {
          0% { transform: translate3d(0, 0, 0) rotate(-9deg) scaleX(0.72); opacity: 0; }
          14% { opacity: 0.44; }
          31% { opacity: 0.12; }
          45% { opacity: 0.48; }
          70% { transform: translate3d(-46vw, 4rem, 0) rotate(-9deg) scaleX(1); opacity: 0.34; }
          100% { transform: translate3d(-76vw, -0.6rem, 0) rotate(-9deg) scaleX(0.78); opacity: 0; }
        }

        @keyframes dmr-burst-three {
          0% { transform: translate3d(0, 0, 0) rotate(-7deg) scaleX(0.68); opacity: 0; }
          16% { opacity: 0.42; }
          40% { opacity: 0.16; }
          57% { opacity: 0.5; }
          78% { transform: translate3d(38vw, -4.2rem, 0) rotate(-7deg) scaleX(1); opacity: 0.24; }
          100% { transform: translate3d(62vw, -2rem, 0) rotate(-7deg) scaleX(0.76); opacity: 0; }
        }

        @keyframes dmr-burst-four {
          0% { transform: translate3d(0, 0, 0) rotate(10deg) scaleX(0.68); opacity: 0; }
          15% { opacity: 0.38; }
          35% { opacity: 0.12; }
          52% { opacity: 0.46; }
          78% { transform: translate3d(-34vw, -4.8rem, 0) rotate(10deg) scaleX(1); opacity: 0.22; }
          100% { transform: translate3d(-58vw, -1rem, 0) rotate(10deg) scaleX(0.76); opacity: 0; }
        }

        @keyframes dmr-burst-five {
          0% { transform: translate3d(-18vw, 0, 0) rotate(6deg) scaleX(0.7); opacity: 0; }
          18% { opacity: 0.34; }
          36% { opacity: 0.12; }
          54% { opacity: 0.42; }
          76% { transform: translate3d(12vw, 5.2rem, 0) rotate(6deg) scaleX(1); opacity: 0.22; }
          100% { transform: translate3d(34vw, 2rem, 0) rotate(6deg) scaleX(0.76); opacity: 0; }
        }

        @keyframes dmr-burst-six {
          0% { transform: translate3d(20vw, 0, 0) rotate(-6deg) scaleX(0.7); opacity: 0; }
          18% { opacity: 0.32; }
          42% { opacity: 0.1; }
          58% { opacity: 0.4; }
          78% { transform: translate3d(-12vw, -3.8rem, 0) rotate(-6deg) scaleX(1); opacity: 0.22; }
          100% { transform: translate3d(-34vw, -1rem, 0) rotate(-6deg) scaleX(0.76); opacity: 0; }
        }

        @keyframes dmr-node-pulse {
          0%, 100% { transform: scale(0.86); opacity: 0.24; }
          42% { transform: scale(1.18); opacity: 0.62; }
          58% { transform: scale(0.92); opacity: 0.32; }
        }

        @keyframes dmr-shard-flash {
          0%, 100% { opacity: 0.08; transform: translate3d(0, 0, 0); }
          44% { opacity: 0.34; transform: translate3d(0.8rem, -0.35rem, 0); }
          62% { opacity: 0.12; }
        }

        @media (max-width: 767px) {
          .dmr-burst-route {
            stroke-dasharray: 8 34;
            stroke-width: 1;
          }

          .dmr-data-burst {
            height: 0.28rem;
            width: 2rem;
          }

          .dmr-data-burst-two,
          .dmr-data-burst-four,
          .dmr-data-burst-six,
          .dmr-signal-node-two,
          .dmr-signal-node-four {
            display: none;
          }

          .dmr-data-shard {
            width: 2.2rem;
            opacity: 0.12;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .dmr-burst-route,
          .dmr-data-burst,
          .dmr-signal-node,
          .dmr-data-shard {
            animation: none !important;
          }

          .dmr-data-burst {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <IntelligenceBurstField />

      <div className="relative z-10 py-14 sm:py-16 lg:py-24">
        <div className="mb-7 flex items-center justify-center sm:mb-8">
          <div className="flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-full border border-[#123BFF]/20 bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#123BFF] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#123BFF]" />
            </span>
            <span className="text-center text-xs font-bold uppercase tracking-[0.16em] text-[#123BFF] sm:text-sm">
              LIVE AI INTELLIGENCE ONLINE
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
