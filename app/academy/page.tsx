import type { Metadata } from 'next'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Compass,
  FileCheck2,
  GraduationCap,
  Layers3,
  LockKeyhole,
  Radar,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
  Workflow,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Academy | Professional AI Training | DeepMind Resources',
  description:
    'DeepMind Resources Academy is a professional AI training system that turns frontier AI change into deterministic learning paths, verified sandbox tasks, tool intelligence, and production-ready AI skills.',
  alternates: {
    canonical: '/academy',
  },
  keywords: [
    'AI Academy',
    'professional AI training',
    'AI competency training',
    'business AI training',
    'AI learning paths',
    'prompt engineering training',
    'AI tool selection',
    'AI sandbox tasks',
    'AI agents training',
    'RAG training',
    'workforce AI training',
    'production-ready AI skills',
  ],
  openGraph: {
    title: 'AI Academy | Professional AI Training | DeepMind Resources',
    description:
      'Professional AI training engineered for execution: deterministic learning paths, verified sandbox tasks, tool intelligence, and production-ready AI competency.',
    url: 'https://deepmindresources.pro/academy',
    siteName: 'DeepMind Resources',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'AI Academy | Professional AI Training | DeepMind Resources',
    description:
      'A real-time operating system for AI competency, turning frontier AI change into practical learning paths and verified sandbox tasks.',
  },
}

type Card = {
  title: string
  description: string
  icon: LucideIcon
}

type Track = {
  title: string
  level: string
  description: string
  outcomes: string[]
  icon: LucideIcon
}

type Tier = {
  title: string
  label: string
  description: string
  features: string[]
}

type FaqItem = {
  question: string
  answer: string
}

const competencyArchitecture: Card[] = [
  {
    title: 'Deterministic Learning Paths',
    description:
      'Follow a mapped route from frontier AI change to practical business application, technical execution, and measurable competency.',
    icon: Compass,
  },
  {
    title: 'Verified Sandbox Tasks',
    description:
      'Practise inside guided, risk-free environments that bridge the gap between knowing the concept and applying it in real work.',
    icon: Route,
  },
  {
    title: 'Tool Intelligence',
    description:
      'Compare models, tools, platforms, and protocols by workflow fit, operational context, risk profile, and real-world usefulness.',
    icon: Radar,
  },
  {
    title: 'Operational Judgement',
    description:
      'Build the professional framework needed to deploy AI safely, securely, and effectively across the modern workforce.',
    icon: ShieldCheck,
  },
]

const intelligencePipeline: Card[] = [
  {
    title: 'Frontier signal detected',
    description:
      'Important model, tool, protocol, API, pricing, and workflow changes are monitored as potential system updates.',
    icon: Radar,
  },
  {
    title: 'Meaning is distilled',
    description:
      'The noise is filtered into what actually matters for learners, builders, business teams, and tool decisions.',
    icon: BrainCircuit,
  },
  {
    title: 'Training path is refreshed',
    description:
      'Affected pathways can move from stale assumptions into current lessons, practical guidance, and updated skill routes.',
    icon: BookOpenCheck,
  },
  {
    title: 'Sandbox task is created',
    description:
      'Meaningful change becomes safe practice: prompt tests, workflow maps, validation checks, and tool comparison tasks.',
    icon: Route,
  },
]

const learningTracks: Track[] = [
  {
    title: 'AI Competency Foundations',
    level: 'Foundation',
    description:
      'Understand how modern AI systems behave, where they fail, and how to use them without importing risk into daily work.',
    outcomes: ['AI concepts that matter', 'Safe-use habits', 'Output review basics'],
    icon: GraduationCap,
  },
  {
    title: 'Prompt Engineering Systems',
    level: 'Core execution',
    description:
      'Move from casual prompting to structured instruction design with role, context, constraints, examples, and review criteria.',
    outcomes: ['Reusable prompt patterns', 'Output control', 'Prompt evaluation'],
    icon: Sparkles,
  },
  {
    title: 'Tool Intelligence and Selection',
    level: 'Decision layer',
    description:
      'Stop choosing tools from hype cycles. Match tools to workflows, team roles, privacy needs, and production constraints.',
    outcomes: ['Scenario-based comparison', 'Tool scorecards', 'Workflow fit'],
    icon: Radar,
  },
  {
    title: 'Business AI Workflows',
    level: 'Workforce training',
    description:
      'Train teams to apply AI to research, support, operations, documentation, meetings, and internal knowledge work.',
    outcomes: ['Role-based workflows', 'Staff AI onboarding', 'Manager visibility'],
    icon: BriefcaseBusiness,
  },
  {
    title: 'Agentic Orchestration',
    level: 'Builder track',
    description:
      'Learn how tool calling, review gates, RAG, workflow boundaries, and agent patterns fit into controlled AI systems.',
    outcomes: ['Agent boundaries', 'Tool-calling logic', 'Human review gates'],
    icon: Workflow,
  },
  {
    title: 'Validation and Risk Control',
    level: 'Professional standard',
    description:
      'Build the judgement to inspect claims, catch hallucinations, protect sensitive data, and review AI output before use.',
    outcomes: ['Claim validation', 'Source checking', 'Risk reduction'],
    icon: FileCheck2,
  },
]

const executionModules: Card[] = [
  {
    title: 'Prompt system design',
    description:
      'Turn vague requests into reliable instructions with context, constraints, examples, formats, and review criteria.',
    icon: Sparkles,
  },
  {
    title: 'Workflow mapping',
    description:
      'Convert business tasks into AI-assisted workflows with inputs, processing steps, human review, and output rules.',
    icon: Workflow,
  },
  {
    title: 'Tool comparison',
    description:
      'Evaluate AI tools by operational fit, skill level, privacy needs, cost, integrations, and production usefulness.',
    icon: Target,
  },
  {
    title: 'Output validation',
    description:
      'Check AI answers for unsupported claims, missing evidence, weak reasoning, sensitive data, and review requirements.',
    icon: BadgeCheck,
  },
]

const audiences: Card[] = [
  {
    title: 'Ambitious learners',
    description:
      'Build structured AI competency without getting lost in scattered tutorials, tool hype, or outdated training.',
    icon: GraduationCap,
  },
  {
    title: 'Technical builders',
    description:
      'Move into tool calling, RAG, agentic workflows, workflow validation, and production-aware AI architecture.',
    icon: Code2,
  },
  {
    title: 'Business teams',
    description:
      'Keep staff current as tools, models, and workflows change, with training mapped directly to real business tasks.',
    icon: UsersRound,
  },
]

const accessTiers: Tier[] = [
  {
    title: 'Free Preview',
    label: 'Explore',
    description:
      'For visitors who want to inspect the Academy map, understand the training system, and try selected public sandbox demos.',
    features: ['Academy overview', 'Syllabus preview', 'Public sandbox demo'],
  },
  {
    title: 'Individual Academy',
    label: 'Build',
    description:
      'For learners who want structured AI competency, guided practice, tool judgement, and progress toward production-ready skills.',
    features: ['Full learning paths', 'Sandbox practice', 'Progress tracking'],
  },
  {
    title: 'Business Team',
    label: 'Train',
    description:
      'For teams that need staff AI training, workflow practice, tool-selection support, and measurable workforce capability.',
    features: ['Role-based paths', 'Team assignments', 'Business workflow tasks'],
  },
  {
    title: 'Enterprise Training',
    label: 'Scale',
    description:
      'For organisations that need custom learning routes, onboarding support, governance alignment, and advanced reporting.',
    features: ['Custom pathways', 'Private onboarding', 'Advanced support'],
  },
]

const faqItems: FaqItem[] = [
  {
    question: 'How is this different from a normal AI course?',
    answer:
      'Normal courses go stale. DeepMind Resources is built around live AI intelligence, tool shifts, verified guidance, and sandbox practice so training can stay aligned with the current frontier.',
  },
  {
    question: 'What does Live AI Intelligence do inside the Academy?',
    answer:
      'It tracks meaningful AI changes, distills what matters, maps the impact to skills and workflows, and turns important changes into updated lessons or verified sandbox tasks.',
  },
  {
    question: 'Is the Academy suitable for business teams?',
    answer:
      'Yes. The Academy is designed for workforce capability, including staff onboarding, role-based workflow training, tool selection, safe-use habits, and manager visibility.',
  },
  {
    question: 'Why does the sandbox matter?',
    answer:
      'The sandbox turns knowledge into evidence. Users practise prompts, workflows, validation, and tool decisions before applying AI to real business or production work.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'AI Academy | DeepMind Resources',
  description:
    'Professional AI training engineered for execution: deterministic learning paths, verified sandbox tasks, tool intelligence, and production-ready AI competency.',
  url: 'https://deepmindresources.pro/academy',
  publisher: {
    '@type': 'Organization',
    name: 'DeepMind Resources',
    url: 'https://deepmindresources.pro',
  },
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

export default function AcademyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-obsidian text-sand">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div
        id="academy-onboarding-popup"
        className="hidden fixed inset-0 z-50 items-center justify-center bg-sand/30 px-4 py-6 backdrop-blur-sm"
        aria-hidden="true"
        role="dialog"
        aria-modal="true"
        aria-labelledby="academy-onboarding-title"
      >
        <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-sand/10 bg-white shadow-2xl">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-[#123BFF]" />

          <button
            id="academy-onboarding-close"
            type="button"
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-sand/10 bg-white text-sand/60 shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
            aria-label="Close Academy onboarding"
          >
            Ãƒâ€”
          </button>

          <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
            <div className="bg-[#123BFF] p-6 text-white sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Start the competency path
              </span>

              <h2 id="academy-onboarding-title" className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to turn AI change into execution?
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
                Create your workspace to start structured AI training, or get your business
                onboarded so your team can build production-ready AI competency.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  'Deterministic learning paths',
                  'Verified sandbox tasks',
                  'Tool intelligence for real workflows',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/10 p-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" aria-hidden="true" />
                    <p className="text-sm font-semibold leading-6 text-white/90">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#123BFF]">
                Choose your next step
              </p>

              <h3 className="mt-3 text-2xl font-bold tracking-tight text-sand">
                Start as an individual, or upgrade your team.
              </h3>

              <p className="mt-3 text-sm leading-7 text-sand/65">
                DeepMind Resources is built for individual competency, team training,
                workforce readiness, and business-safe AI adoption.
              </p>

              <div className="mt-6 grid gap-3">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                >
                  Sign up and create workspace
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-5 py-4 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                >
                  Get your business onboarded
                  <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/business-ai-training"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#EAF7FF] px-5 py-4 text-sm font-bold text-[#123BFF] shadow-sm transition hover:bg-[#DDF2FF]"
                >
                  View business training
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <p className="mt-5 text-xs leading-6 text-sand/45">
                No pressure. Close this and keep exploring the Academy map.
              </p>
            </div>
          </div>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (() => {
              const popup = document.getElementById('academy-onboarding-popup');
              const closeButton = document.getElementById('academy-onboarding-close');
              const storageKey = 'dmr_academy_onboarding_popup_dismissed';
              let shown = false;
              let timerId = null;

              if (!popup) return;

              const hasDismissed = () => {
                try {
                  return window.sessionStorage.getItem(storageKey) === 'true';
                } catch {
                  return false;
                }
              };

              const markDismissed = () => {
                try {
                  window.sessionStorage.setItem(storageKey, 'true');
                } catch {}
              };

              const showPopup = () => {
                if (shown || hasDismissed()) return;

                shown = true;
                popup.classList.remove('hidden');
                popup.classList.add('flex');
                popup.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';

                if (timerId) {
                  window.clearTimeout(timerId);
                }

                window.removeEventListener('scroll', handleScroll);
              };

              const closePopup = () => {
                markDismissed();
                popup.classList.add('hidden');
                popup.classList.remove('flex');
                popup.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
              };

              const handleScroll = () => {
                const doc = document.documentElement;
                const scrollableHeight = doc.scrollHeight - window.innerHeight;

                if (scrollableHeight <= 0) return;

                const scrollPercent = (window.scrollY / scrollableHeight) * 100;

                if (scrollPercent >= 15) {
                  showPopup();
                }
              };

              if (hasDismissed()) return;

              timerId = window.setTimeout(showPopup, 15000);
              window.addEventListener('scroll', handleScroll, { passive: true });

              if (closeButton) {
                closeButton.addEventListener('click', closePopup);
              }

              popup.addEventListener('click', (event) => {
                if (event.target === popup) {
                  closePopup();
                }
              });

              popup.querySelectorAll('a').forEach((link) => {
                link.addEventListener('click', markDismissed);
              });

              window.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && !popup.classList.contains('hidden')) {
                  closePopup();
                }
              });
            })();
          `,
        }}
      />

      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at top right, rgba(69, 201, 255, 0.24), transparent 34rem), radial-gradient(circle at top left, rgba(18, 59, 255, 0.14), transparent 30rem), radial-gradient(circle at 50% 32rem, rgba(69, 201, 255, 0.16), transparent 36rem), linear-gradient(180deg, #F4FBFF 0%, #EAF7FF 46%, #F4FBFF 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <section className="grid gap-10 py-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
                AI Academy
              </span>

              <h1 className="mt-6 max-w-5xl text-4xl font-bold tracking-tight text-sand sm:text-5xl lg:text-6xl">
                Professional AI Training: Engineered for Execution.
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-sand/70 sm:text-lg">
                DeepMind Resources is the real-time operating system for AI competency. We
                distill the chaos of shifting models, protocols, tools, and workflows into
                deterministic learning paths designed for production-ready skills, not theory
                overload.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/syllabus"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                >
                  Start with the syllabus
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/sandbox"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-6 py-4 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                >
                  Enter the sandbox
                  <Route className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/business-ai-training"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-6 py-4 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                >
                  Train your team
                  <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {['Live intelligence layer', 'Verified sandbox tasks', 'Production-ready skills'].map((item) => (
                  <div key={item} className="rounded-2xl border border-sand/10 bg-white/90 p-4 shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-[#123BFF]" aria-hidden="true" />
                    <p className="mt-3 text-sm font-bold text-sand">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-5 shadow-sm sm:p-6 lg:p-7">
              <div className="rounded-[1.5rem] bg-[#123BFF] p-6 text-white shadow-sm">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#123BFF] shadow-sm">
                  <Compass className="h-7 w-7" aria-hidden="true" />
                </span>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-white/75">
                  The architecture of competency
                </p>

                <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                  From frontier change to workforce capability.
                </h2>

                <div className="mt-6 grid gap-3">
                  {[
                    'Mapped learning path',
                    'Verified practice task',
                    'Tool and workflow context',
                    'Measurable skill gain',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/10 p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" aria-hidden="true" />
                      <p className="text-sm font-semibold leading-6 text-white/90">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-[1.5rem] bg-[#EAF7FF] p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#123BFF]">
                    <Sparkles className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-sand">Ahead of the curve, not just in the queue.</h3>
                    <p className="mt-2 text-sm leading-7 text-sand/65">
                      The frontier is moving. The Academy gives users and teams a mapped route from
                      important AI change to practical execution.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pb-8" aria-labelledby="architecture-title">
            <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <Layers3 className="h-4 w-4" aria-hidden="true" />
                  The architecture of competency
                </span>

                <h2 id="architecture-title" className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                  A professional training layer for modern AI execution.
                </h2>

                <p className="mt-4 text-base leading-8 text-sand/65">
                  The Academy is not a passive course library. It is a structured system for turning
                  meaningful AI shifts into practical learning, verified sandbox practice, and
                  operational judgement.
                </p>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {competencyArchitecture.map((pillar) => {
                  const Icon = pillar.icon

                  return (
                    <article key={pillar.title} className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF] shadow-sm">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <h3 className="mt-5 text-lg font-bold tracking-tight text-sand">{pillar.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-sand/65">{pillar.description}</p>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>

          <section className="py-8" aria-labelledby="live-intelligence-title">
            <div className="rounded-[2rem] border border-sand/10 bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                    <Radar className="h-4 w-4" aria-hidden="true" />
                    Live AI Intelligence
                  </span>

                  <h2 id="live-intelligence-title" className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                    Stay ahead of the curve, not just in the queue.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-white/80">
                    Stop chasing the hype cycle. DeepMind Resources tracks meaningful AI change,
                    distills the operational meaning, and turns it into updated learning paths,
                    tool intelligence, and verified sandbox tasks.
                  </p>

                  <p className="mt-4 text-base leading-8 text-white/80">
                    This is the reason the Academy is different: training is connected to the
                    moving AI frontier instead of being frozen at the moment a course was recorded.
                  </p>
                </div>

                <div className="grid gap-4">
                  {intelligencePipeline.map((step, index) => {
                    const Icon = step.icon

                    return (
                      <article key={step.title} className="rounded-3xl bg-white p-5 text-sand shadow-sm">
                        <div className="flex gap-4">
                          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <div>
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-[#123BFF] text-xs font-bold text-white">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              <h3 className="text-lg font-bold text-sand">{step.title}</h3>
                            </div>
                            <p className="mt-3 text-sm leading-7 text-sand/65">{step.description}</p>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="py-8" aria-labelledby="tracks-title">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
                  Academy pathways
                </span>
                <h2 id="tracks-title" className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                  Deterministic learning paths for the skills that matter.
                </h2>
              </div>

              <Link
                href="/syllabus"
                className="inline-flex w-fit items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-5 py-3 text-sm font-bold text-[#123BFF] shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#0A63FF]"
              >
                View full syllabus
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {learningTracks.map((track) => {
                const Icon = track.icon

                return (
                  <article key={track.title} className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF] shadow-sm">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                          {track.level}
                        </p>
                        <h3 className="mt-2 text-xl font-bold tracking-tight text-sand">
                          {track.title}
                        </h3>
                      </div>
                    </div>

                    <p className="mt-5 text-sm leading-7 text-sand/65">{track.description}</p>

                    <div className="mt-5 grid gap-3">
                      {track.outcomes.map((outcome) => (
                        <div key={outcome} className="flex items-start gap-3 rounded-2xl bg-[#F7FBFF] p-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#123BFF]" aria-hidden="true" />
                          <p className="text-sm leading-6 text-sand/70">{outcome}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          <section className="py-8" aria-labelledby="execution-title">
            <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                    <Target className="h-4 w-4" aria-hidden="true" />
                    Engineered for execution
                  </span>

                  <h2 id="execution-title" className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                    Training that moves from concept to workflow.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-sand/65">
                    DeepMind Resources does not stop at explanation. The Academy is built to move
                    users into the execution layer: prompts, workflows, comparisons, validation,
                    sandbox practice, and production judgement.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {executionModules.map((module) => {
                    const Icon = module.icon

                    return (
                      <article key={module.title} className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <h3 className="mt-4 text-lg font-bold tracking-tight text-sand">{module.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-sand/65">{module.description}</p>
                      </article>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="py-8" aria-labelledby="business-title">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <div className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
                  Workforce AI competency
                </span>

                <h2 id="business-title" className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                  Keep your workforce current as AI changes.
                </h2>

                <p className="mt-4 text-base leading-8 text-sand/65">
                  DeepMind Resources turns frontier AI shifts into verified training, sandbox tasks,
                  tool intelligence, and production-ready team competency. Staff learn how to use AI
                  safely, managers understand capability gaps, and teams stop making tool decisions
                  from noise.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    'Staff AI onboarding',
                    'Role-based workflow training',
                    'Tool-spend judgement',
                    'Safe-use and privacy habits',
                    'Manager visibility',
                    'Verified sandbox practice',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-[#EAF7FF] p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#123BFF]" aria-hidden="true" />
                      <p className="text-sm font-semibold leading-6 text-sand/75">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF] shadow-sm">
                  <LockKeyhole className="h-7 w-7" aria-hidden="true" />
                </span>

                <h3 className="mt-5 text-2xl font-bold tracking-tight text-sand">
                  Safe practice before production workflows.
                </h3>

                <p className="mt-4 text-sm leading-7 text-sand/65">
                  Verified sandbox tasks let users test prompts, workflows, tool choices, and output
                  validation before AI reaches customer data, sensitive documents, business-critical
                  processes, or production systems.
                </p>

                <Link
                  href="/business-ai-training"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                >
                  Explore business training
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>

          <section className="py-8" aria-label="Academy audiences">
            <div className="grid gap-5 md:grid-cols-3">
              {audiences.map((audience) => {
                const Icon = audience.icon

                return (
                  <article key={audience.title} className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF] shadow-sm">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h2 className="mt-5 text-xl font-bold tracking-tight text-sand">{audience.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-sand/65">{audience.description}</p>
                  </article>
                )
              })}
            </div>
          </section>

          <section className="py-8" aria-labelledby="access-title">
            <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <UsersRound className="h-4 w-4" aria-hidden="true" />
                  Academy access
                </span>

                <h2 id="access-title" className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                  From individual competency to workforce capability.
                </h2>

                <p className="mt-4 text-base leading-8 text-sand/65">
                  Start with the Academy map, move into verified sandbox practice, then scale the
                  training layer across teams when AI competency becomes operationally important.
                </p>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {accessTiers.map((tier) => (
                  <article key={tier.title} className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                      {tier.label}
                    </p>
                    <h3 className="mt-3 text-xl font-bold text-sand">{tier.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-sand/65">{tier.description}</p>

                    <div className="mt-5 grid gap-3">
                      {tier.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#123BFF]" aria-hidden="true" />
                          <p className="text-sm leading-6 text-sand/70">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="py-8" aria-labelledby="faq-title">
            <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                  Academy questions
                </span>

                <h2 id="faq-title" className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                  What professionals and teams need to know.
                </h2>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {faqItems.map((item) => (
                  <article key={item.question} className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                    <h3 className="text-lg font-bold text-sand">{item.question}</h3>
                    <p className="mt-3 text-sm leading-7 text-sand/65">{item.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="py-8">
            <div className="rounded-[2rem] border border-sand/10 bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Start with execution
                  </span>

                  <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                    Start with the AI Competency Path, then move into verified sandbox tasks.
                  </h2>

                  <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 sm:text-base">
                    Stop chasing the hype cycle. Build the current training layer your team needs
                    to turn global AI breakthroughs into measurable workforce capability.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <Link
                    href="/syllabus"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-[#123BFF] shadow-sm transition hover:bg-[#EAF7FF]"
                  >
                    View syllabus
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/sandbox"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-white/20"
                  >
                    Try sandbox
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
