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

function PageSignalField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 opacity-[0.07]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(18, 59, 255, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(18, 59, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '46px 46px',
          }}
        />
      </div>

      <div className="absolute left-1/2 top-14 h-[34rem] w-[46rem] -translate-x-1/2 rounded-full bg-[#123BFF]/[0.09] blur-3xl" />
      <div className="absolute right-[5%] top-24 h-72 w-72 rounded-full bg-[#45C9FF]/[0.14] blur-3xl" />
      <div className="absolute left-[4%] top-44 h-64 w-64 rounded-full bg-[#0A63FF]/[0.10] blur-3xl" />

      <span className="dmr-page-burst dmr-page-burst-one" />
      <span className="dmr-page-burst dmr-page-burst-two" />
      <span className="dmr-page-burst dmr-page-burst-three" />
      <span className="dmr-page-burst dmr-page-burst-four" />
    </div>
  )
}

function HeroBurstLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[2rem]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(18,59,255,0.18),transparent_25rem)]" />

      <svg className="absolute inset-0 h-full w-full opacity-95" viewBox="0 0 1000 430" preserveAspectRatio="none">
        <defs>
          <linearGradient id="heroRouteA" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#123BFF" stopOpacity="0" />
            <stop offset="44%" stopColor="#123BFF" stopOpacity="0.52" />
            <stop offset="72%" stopColor="#45C9FF" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#45C9FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="heroRouteB" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#45C9FF" stopOpacity="0" />
            <stop offset="46%" stopColor="#45C9FF" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#123BFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="dmr-hero-route dmr-hero-route-one" d="M-80 130 C 130 48, 318 225, 506 140 S 772 68, 1080 154" fill="none" stroke="url(#heroRouteA)" strokeWidth="2.4" />
        <path className="dmr-hero-route dmr-hero-route-two" d="M-80 258 C 178 350, 302 112, 548 236 S 788 342, 1080 242" fill="none" stroke="url(#heroRouteB)" strokeWidth="2.2" />
        <path className="dmr-hero-route dmr-hero-route-three" d="M56 76 C 228 120, 324 40, 512 94 S 762 206, 946 82" fill="none" stroke="url(#heroRouteA)" strokeWidth="1.8" />
        <path className="dmr-hero-route dmr-hero-route-four" d="M62 354 C 226 284, 354 392, 542 326 S 750 246, 948 348" fill="none" stroke="url(#heroRouteB)" strokeWidth="1.8" />
      </svg>

      <span className="dmr-hero-packet dmr-hero-packet-one" />
      <span className="dmr-hero-packet dmr-hero-packet-two" />
      <span className="dmr-hero-packet dmr-hero-packet-three" />
      <span className="dmr-hero-packet dmr-hero-packet-four" />
      <span className="dmr-hero-packet dmr-hero-packet-five" />
      <span className="dmr-hero-packet dmr-hero-packet-six" />
      <span className="dmr-hero-packet dmr-hero-packet-seven" />
      <span className="dmr-hero-packet dmr-hero-packet-eight" />

      <span className="dmr-ring dmr-ring-one" />
      <span className="dmr-ring dmr-ring-two" />
      <span className="dmr-ring dmr-ring-three" />
      <span className="dmr-ring dmr-ring-four" />

      <span className="dmr-bit dmr-bit-one" />
      <span className="dmr-bit dmr-bit-two" />
      <span className="dmr-bit dmr-bit-three" />
      <span className="dmr-bit dmr-bit-four" />
      <span className="dmr-bit dmr-bit-five" />
      <span className="dmr-bit dmr-bit-six" />
      <span className="dmr-bit dmr-bit-seven" />
      <span className="dmr-bit dmr-bit-eight" />
      <span className="dmr-bit dmr-bit-nine" />
      <span className="dmr-bit dmr-bit-ten" />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#123BFF]/45 to-transparent dmr-hero-scan" />
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <PageSignalField />

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
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/20 px-4 py-7 shadow-[0_24px_90px_rgba(18,59,255,0.10)] backdrop-blur-sm sm:px-8 sm:py-9 lg:px-10">
            <HeroBurstLayer />

            <div className="pointer-events-none absolute inset-x-8 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#123BFF]/30 to-transparent" />

            <div className="relative z-20">
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

      <style>{`
        .dmr-page-burst {
          position: absolute;
          display: block;
          height: 2px;
          width: 18rem;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent, rgba(18, 59, 255, 0.28), rgba(69, 201, 255, 0.22), transparent);
          opacity: 0;
          box-shadow: 0 0 28px rgba(18, 59, 255, 0.18);
        }

        .dmr-page-burst-one { left: -10%; top: 18%; animation: dmr-page-burst-one 6.5s ease-in-out infinite; }
        .dmr-page-burst-two { right: -12%; top: 36%; animation: dmr-page-burst-two 7.5s ease-in-out 1s infinite; }
        .dmr-page-burst-three { left: 10%; bottom: 18%; animation: dmr-page-burst-three 8.5s ease-in-out 0.6s infinite; }
        .dmr-page-burst-four { right: 20%; bottom: 30%; animation: dmr-page-burst-four 9s ease-in-out 2s infinite; }

        .dmr-hero-route {
          stroke-dasharray: 14 20;
          animation: dmr-route-flow 6.5s linear infinite;
        }

        .dmr-hero-route-two { animation-duration: 8s; animation-direction: reverse; }
        .dmr-hero-route-three { animation-duration: 9s; }
        .dmr-hero-route-four { animation-duration: 10s; animation-direction: reverse; }

        .dmr-hero-packet {
          position: absolute;
          display: block;
          height: 4px;
          width: 5.5rem;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent, #123BFF 28%, #45C9FF 68%, transparent);
          box-shadow: 0 0 18px rgba(18, 59, 255, 0.44), 0 0 32px rgba(69, 201, 255, 0.26);
          opacity: 0;
        }

        .dmr-hero-packet::before,
        .dmr-hero-packet::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 0.34rem;
          height: 0.34rem;
          border-radius: 999px;
          background: #123BFF;
          transform: translateY(-50%);
          box-shadow: 0 0 14px rgba(18, 59, 255, 0.6);
        }

        .dmr-hero-packet::before { left: 1.15rem; }
        .dmr-hero-packet::after { right: 1.15rem; background: #45C9FF; }

        .dmr-hero-packet-one { left: -10%; top: 20%; animation: dmr-hero-packet-one 4.8s ease-in-out infinite; }
        .dmr-hero-packet-two { right: -12%; top: 31%; animation: dmr-hero-packet-two 5.4s ease-in-out 0.7s infinite; }
        .dmr-hero-packet-three { left: 2%; bottom: 25%; animation: dmr-hero-packet-three 5.8s ease-in-out 1.1s infinite; }
        .dmr-hero-packet-four { right: 4%; bottom: 20%; animation: dmr-hero-packet-four 6.2s ease-in-out 1.7s infinite; }
        .dmr-hero-packet-five { left: 24%; top: 9%; animation: dmr-hero-packet-five 5.2s ease-in-out 2.1s infinite; }
        .dmr-hero-packet-six { right: 26%; top: 48%; animation: dmr-hero-packet-six 5.6s ease-in-out 2.4s infinite; }
        .dmr-hero-packet-seven { left: 12%; top: 52%; animation: dmr-hero-packet-seven 4.6s ease-in-out 1.5s infinite; }
        .dmr-hero-packet-eight { right: 14%; top: 62%; animation: dmr-hero-packet-eight 5s ease-in-out 2.8s infinite; }

        .dmr-ring {
          position: absolute;
          display: block;
          height: 3.4rem;
          width: 3.4rem;
          border-radius: 999px;
          border: 1px solid rgba(18, 59, 255, 0.24);
          opacity: 0;
          box-shadow: inset 0 0 28px rgba(69, 201, 255, 0.12), 0 0 28px rgba(18, 59, 255, 0.12);
          animation: dmr-ring-burst 4.8s ease-out infinite;
        }

        .dmr-ring-one { left: 16%; top: 26%; }
        .dmr-ring-two { right: 18%; top: 33%; animation-delay: 1.1s; }
        .dmr-ring-three { left: 32%; bottom: 22%; animation-delay: 2.1s; }
        .dmr-ring-four { right: 34%; bottom: 26%; animation-delay: 3s; }

        .dmr-bit {
          position: absolute;
          display: block;
          height: 0.34rem;
          width: 0.34rem;
          border-radius: 999px;
          background: #123BFF;
          opacity: 0;
          box-shadow: 0 0 16px rgba(18, 59, 255, 0.42);
          animation: dmr-bit-pop 3.8s ease-in-out infinite;
        }

        .dmr-bit-two,
        .dmr-bit-four,
        .dmr-bit-six,
        .dmr-bit-eight,
        .dmr-bit-ten { background: #45C9FF; box-shadow: 0 0 16px rgba(69, 201, 255, 0.36); }

        .dmr-bit-one { left: 18%; top: 18%; }
        .dmr-bit-two { left: 24%; top: 38%; animation-delay: 0.4s; }
        .dmr-bit-three { right: 22%; top: 21%; animation-delay: 0.8s; }
        .dmr-bit-four { right: 30%; top: 47%; animation-delay: 1.2s; }
        .dmr-bit-five { left: 35%; bottom: 19%; animation-delay: 1.6s; }
        .dmr-bit-six { right: 16%; bottom: 23%; animation-delay: 2s; }
        .dmr-bit-seven { left: 12%; bottom: 35%; animation-delay: 2.4s; }
        .dmr-bit-eight { right: 12%; top: 58%; animation-delay: 2.8s; }
        .dmr-bit-nine { left: 50%; top: 15%; animation-delay: 3.2s; }
        .dmr-bit-ten { left: 58%; bottom: 18%; animation-delay: 3.6s; }

        .dmr-hero-scan { animation: dmr-hero-scan 5.5s ease-in-out infinite; }

        @keyframes dmr-route-flow { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -220; } }

        @keyframes dmr-page-burst-one { 0% { transform: translate3d(0,0,0) rotate(9deg); opacity: 0; } 12% { opacity: .75; } 48% { transform: translate3d(55vw,8vh,0) rotate(9deg); opacity: .4; } 100% { transform: translate3d(105vw,3vh,0) rotate(9deg); opacity: 0; } }
        @keyframes dmr-page-burst-two { 0% { transform: translate3d(0,0,0) rotate(-10deg); opacity: 0; } 14% { opacity: .65; } 52% { transform: translate3d(-50vw,9vh,0) rotate(-10deg); opacity: .36; } 100% { transform: translate3d(-104vw,2vh,0) rotate(-10deg); opacity: 0; } }
        @keyframes dmr-page-burst-three { 0% { transform: translate3d(0,0,0) rotate(-8deg); opacity: 0; } 16% { opacity: .48; } 56% { transform: translate3d(46vw,-6vh,0) rotate(-8deg); opacity: .26; } 100% { transform: translate3d(90vw,-2vh,0) rotate(-8deg); opacity: 0; } }
        @keyframes dmr-page-burst-four { 0% { transform: translate3d(0,0,0) rotate(7deg); opacity: 0; } 16% { opacity: .42; } 54% { transform: translate3d(-38vw,-5vh,0) rotate(7deg); opacity: .24; } 100% { transform: translate3d(-80vw,-1vh,0) rotate(7deg); opacity: 0; } }

        @keyframes dmr-hero-packet-one { 0% { transform: translate3d(0,0,0) rotate(8deg) scaleX(.72); opacity: 0; } 9% { opacity: .9; } 50% { transform: translate3d(54vw,3.6rem,0) rotate(8deg) scaleX(1); opacity: .66; } 100% { transform: translate3d(92vw,.5rem,0) rotate(8deg) scaleX(.75); opacity: 0; } }
        @keyframes dmr-hero-packet-two { 0% { transform: translate3d(0,0,0) rotate(-9deg) scaleX(.72); opacity: 0; } 10% { opacity: .82; } 52% { transform: translate3d(-52vw,4rem,0) rotate(-9deg) scaleX(1); opacity: .58; } 100% { transform: translate3d(-92vw,-.5rem,0) rotate(-9deg) scaleX(.75); opacity: 0; } }
        @keyframes dmr-hero-packet-three { 0% { transform: translate3d(0,0,0) rotate(-7deg) scaleX(.72); opacity: 0; } 12% { opacity: .78; } 54% { transform: translate3d(44vw,-3.8rem,0) rotate(-7deg) scaleX(1); opacity: .5; } 100% { transform: translate3d(82vw,-1rem,0) rotate(-7deg) scaleX(.75); opacity: 0; } }
        @keyframes dmr-hero-packet-four { 0% { transform: translate3d(0,0,0) rotate(10deg) scaleX(.72); opacity: 0; } 12% { opacity: .72; } 56% { transform: translate3d(-42vw,-4.2rem,0) rotate(10deg) scaleX(1); opacity: .46; } 100% { transform: translate3d(-80vw,-.5rem,0) rotate(10deg) scaleX(.75); opacity: 0; } }
        @keyframes dmr-hero-packet-five { 0% { transform: translate3d(-20vw,0,0) rotate(6deg) scaleX(.72); opacity: 0; } 14% { opacity: .74; } 60% { transform: translate3d(16vw,4.8rem,0) rotate(6deg) scaleX(1); opacity: .42; } 100% { transform: translate3d(44vw,1rem,0) rotate(6deg) scaleX(.75); opacity: 0; } }
        @keyframes dmr-hero-packet-six { 0% { transform: translate3d(22vw,0,0) rotate(-7deg) scaleX(.72); opacity: 0; } 14% { opacity: .7; } 58% { transform: translate3d(-18vw,-4.5rem,0) rotate(-7deg) scaleX(1); opacity: .4; } 100% { transform: translate3d(-48vw,-1rem,0) rotate(-7deg) scaleX(.75); opacity: 0; } }
        @keyframes dmr-hero-packet-seven { 0% { transform: translate3d(0,0,0) rotate(3deg) scaleX(.72); opacity: 0; } 11% { opacity: .62; } 55% { transform: translate3d(34vw,-.6rem,0) rotate(3deg) scaleX(1); opacity: .42; } 100% { transform: translate3d(58vw,.8rem,0) rotate(3deg) scaleX(.75); opacity: 0; } }
        @keyframes dmr-hero-packet-eight { 0% { transform: translate3d(0,0,0) rotate(-3deg) scaleX(.72); opacity: 0; } 11% { opacity: .6; } 55% { transform: translate3d(-34vw,.7rem,0) rotate(-3deg) scaleX(1); opacity: .4; } 100% { transform: translate3d(-58vw,-.8rem,0) rotate(-3deg) scaleX(.75); opacity: 0; } }

        @keyframes dmr-ring-burst { 0% { transform: scale(.35); opacity: 0; } 18% { opacity: .62; } 70% { opacity: .12; } 100% { transform: scale(1.9); opacity: 0; } }
        @keyframes dmr-bit-pop { 0%, 100% { transform: scale(.4); opacity: 0; } 28% { transform: scale(1.35); opacity: .86; } 42% { transform: scale(.82); opacity: .32; } }
        @keyframes dmr-hero-scan { 0%, 100% { transform: translateY(0); opacity: 0; } 12% { opacity: .55; } 48% { transform: translateY(19rem); opacity: .24; } 76% { opacity: 0; } }

        @media (max-width: 767px) {
          .dmr-page-burst-three,
          .dmr-page-burst-four,
          .dmr-hero-packet-five,
          .dmr-hero-packet-six,
          .dmr-hero-packet-eight,
          .dmr-ring-three,
          .dmr-ring-four,
          .dmr-bit-five,
          .dmr-bit-six,
          .dmr-bit-nine,
          .dmr-bit-ten { display: none; }

          .dmr-hero-packet { width: 3.4rem; height: 3px; }
          .dmr-ring { height: 2.4rem; width: 2.4rem; }
          .dmr-hero-route { stroke-width: 1.5; stroke-dasharray: 10 24; }
        }

        @media (prefers-reduced-motion: reduce) {
          .dmr-page-burst,
          .dmr-hero-route,
          .dmr-hero-packet,
          .dmr-ring,
          .dmr-bit,
          .dmr-hero-scan { animation: none !important; }

          .dmr-hero-packet,
          .dmr-ring,
          .dmr-bit { display: none; }
        }
      `}</style>
    </section>
  )
}
