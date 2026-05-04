import type { Metadata } from 'next'
import type { LucideIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  FileCheck2,
  GitBranch,
  Layers3,
  LockKeyhole,
  Radar,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
  Workflow,
  Zap,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Multi-Agent Systems Training Path | DeepMind Resources',
  description:
    'Learn multi-agent systems with specialist roles, handoffs, shared state, orchestration logic, validation layers, escalation paths, and reviewable AI workflows.',
  alternates: {
    canonical: 'https://deepmindresources.pro/path/multi-agent-systems',
  },
  keywords: [
    'multi-agent systems training',
    'multi-agent AI workflows',
    'agent orchestration',
    'AI agent handoffs',
    'specialist AI agents',
    'multi-agent architecture',
    'AI workflow validation',
    'human-in-the-loop agents',
    'agentic orchestration training',
    'production multi-agent systems',
  ],
  openGraph: {
    title: 'Multi-Agent Systems Training Path | DeepMind Resources',
    description:
      'A professional training path for multi-agent systems: specialist roles, handoffs, orchestration logic, shared state, validation layers, escalation, and reviewable workflows.',
    url: 'https://deepmindresources.pro/path/multi-agent-systems',
    siteName: 'DeepMind Resources',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Multi-Agent Systems Training Path | DeepMind Resources',
    description:
      'Build multi-agent system competency with specialist roles, handoffs, orchestration logic, validation layers, escalation paths, and verified sandbox practice.',
  },
}

type Card = {
  title: string
  description: string
  icon: LucideIcon
}

type RouteStep = {
  label: string
  title: string
  description: string
}

type FaqItem = {
  question: string
  answer: string
}

const architecturePrinciples: Card[] = [
  {
    title: 'Specialist roles, not agent sprawl',
    description:
      'Define why each agent exists, what it owns, what it must never decide, and which output another layer must review.',
    icon: UsersRound,
  },
  {
    title: 'Explicit handoffs',
    description:
      'Control how work moves between agents with clear input contracts, output formats, escalation rules, and acceptance criteria.',
    icon: GitBranch,
  },
  {
    title: 'Validation before action',
    description:
      'Place validator, reviewer, and human approval gates before outputs influence tools, decisions, business workflows, or publication.',
    icon: BadgeCheck,
  },
  {
    title: 'Observable orchestration',
    description:
      'Track state, decisions, tool calls, failed handoffs, confidence gaps, and review history so the system can be inspected.',
    icon: Radar,
  },
]

const routeSteps: RouteStep[] = [
  {
    label: '01',
    title: 'Split the workflow into accountable roles',
    description:
      'Identify whether the task needs scout, planner, tool, reviewer, validator, business, or publication agents before adding complexity.',
  },
  {
    label: '02',
    title: 'Define contracts and handoffs',
    description:
      'Give every agent a narrow responsibility, input shape, output shape, confidence rule, and handoff condition.',
  },
  {
    label: '03',
    title: 'Add shared state and review controls',
    description:
      'Decide what the system can remember, what must be logged, which claims need validation, and when humans approve next actions.',
  },
  {
    label: '04',
    title: 'Test coordination in the sandbox',
    description:
      'Practise agent role design, failed handoffs, validation checks, and orchestration patterns before using multi-agent workflows for real work.',
  },
]

const learningAreas: Card[] = [
  {
    title: 'Multi-agent fundamentals',
    description:
      'Understand when several agents improve a workflow, when one agent is enough, and when the design is overbuilt.',
    icon: Bot,
  },
  {
    title: 'Agent role architecture',
    description:
      'Design scout, planner, executor, critic, validator, and business-review roles with narrow authority and clear responsibilities.',
    icon: UsersRound,
  },
  {
    title: 'Handoff protocols',
    description:
      'Build structured handoffs with task state, evidence, missing context, confidence labels, and next-action requirements.',
    icon: GitBranch,
  },
  {
    title: 'Shared memory and state',
    description:
      'Control what the system shares, persists, retrieves, discards, and isolates so agents do not pollute one another with weak context.',
    icon: BrainCircuit,
  },
  {
    title: 'Validation layers',
    description:
      'Add review agents, source checks, confidence thresholds, contradiction handling, and human approval before operational impact.',
    icon: FileCheck2,
  },
  {
    title: 'Workflow orchestration',
    description:
      'Coordinate specialist agents through queues, checkpoints, retries, escalation paths, and observability standards.',
    icon: Workflow,
  },
]

const sandboxTasks: Card[] = [
  {
    title: 'Design a Scout and Validator workflow',
    description:
      'Create separate roles for finding signals, filtering noise, checking claims, and deciding whether a record can move forward.',
    icon: Radar,
  },
  {
    title: 'Audit an overbuilt agent team',
    description:
      'Review a multi-agent design and remove unnecessary agents, weak handoffs, duplicated responsibilities, and uncontrolled autonomy.',
    icon: Target,
  },
  {
    title: 'Build a handoff contract',
    description:
      'Define the exact output one agent must produce before another agent can continue the workflow safely.',
    icon: GitBranch,
  },
  {
    title: 'Add validator and human approval gates',
    description:
      'Place source checks, confidence thresholds, contradiction handling, and final human review before publication or business action.',
    icon: ShieldCheck,
  },
]

const businessValue: Card[] = [
  {
    title: 'Safer automation planning',
    description:
      'Help teams understand where agent collaboration is useful and where a simpler workflow is safer, cheaper, and easier to govern.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Clear accountability',
    description:
      'Map agent roles to business ownership so managers know who reviews claims, approves actions, and handles failures.',
    icon: UsersRound,
  },
  {
    title: 'Validation-led operations',
    description:
      'Train staff to put validation, source checking, human approval, and audit trails at the centre of multi-agent workflows.',
    icon: LockKeyhole,
  },
]

const faqItems: FaqItem[] = [
  {
    question: 'What is a multi-agent system?',
    answer:
      'A multi-agent system uses several specialist agents or workflow roles to complete a task. In DeepMind Resources, the focus is controlled coordination: roles, handoffs, shared state, validation layers, and human review.',
  },
  {
    question: 'When should a team use multiple agents?',
    answer:
      'Multiple agents make sense when a workflow has distinct responsibilities, such as discovery, planning, execution, critique, validation, and business review. If the task does not need role separation, one controlled workflow may be better.',
  },
  {
    question: 'How does this connect to Agent Architecture?',
    answer:
      'Agent Architecture teaches how to design one controlled agent workflow. Multi-Agent Systems extends that into specialist roles, handoff contracts, shared state, and validation-led orchestration.',
  },
  {
    question: 'Where does sandbox practice fit?',
    answer:
      'The Sandbox lets users test coordination safely. Learners practise agent roles, handoff contracts, validator checks, failure handling, and review gates using synthetic workflows before applying the pattern to real operations.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Multi-Agent Systems Pathway | DeepMind Resources Academy',
  description:
    'A professional pathway for controlled multi-agent architecture, specialist agent roles, handoff contracts, shared state, validation layers, and verified sandbox practice.',
  url: 'https://deepmindresources.pro/path/multi-agent-systems',
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

function EmblemPulse() {
  return (
    <div className="relative inline-flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
      <span className="absolute inset-0 rounded-[2rem] bg-[#123BFF]/20 blur-xl" aria-hidden="true" />
      <span className="absolute inset-2 rounded-[1.75rem] border border-[#123BFF]/20 bg-[#123BFF]/10 animate-ping" aria-hidden="true" />
      <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-white p-3 shadow-xl shadow-[#123BFF]/25 sm:h-24 sm:w-24">
        <Image
          src="/brand/deepmind-resources-emblem.png"
          alt="DeepMind Resources"
          width={72}
          height={72}
          priority
          className="h-full w-full object-contain"
        />
      </span>
    </div>
  )
}

function CardGrid({ items, columns = 'xl:grid-cols-4' }: { items: Card[]; columns?: string }) {
  return (
    <div className={`grid gap-5 md:grid-cols-2 ${columns}`}>
      {items.map((item) => {
        const Icon = item.icon

        return (
          <article key={item.title} className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF] shadow-sm">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-lg font-bold tracking-tight text-sand">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-sand/65">{item.description}</p>
          </article>
        )
      })}
    </div>
  )
}

export default function MultiAgentSystemsPathwayPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-obsidian text-sand">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div
        id="multi-agent-onboarding-popup"
        className="hidden fixed inset-0 z-50 items-center justify-center bg-sand/30 px-4 py-6 backdrop-blur-sm"
        aria-hidden="true"
        role="dialog"
        aria-modal="true"
        aria-labelledby="multi-agent-onboarding-title"
      >
        <div className="relative flex max-h-[calc(100vh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-[2rem] border border-sand/10 bg-white shadow-2xl">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-[#123BFF]" />

          <button
            id="multi-agent-onboarding-close"
            type="button"
            className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-sand/10 bg-white text-sand/60 shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
            aria-label="Close Multi-Agent Systems prompt"
          >
            &times;
          </button>

          <div className="overflow-y-auto">
            <div className="grid md:grid-cols-[0.95fr_1.05fr]">
              <div className="bg-[#123BFF] p-6 text-white sm:p-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                  <UsersRound className="h-4 w-4" aria-hidden="true" />
                  Multi-agent control layer
                </span>

                <h2 id="multi-agent-onboarding-title" className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
                  Build agent teams with roles, handoffs, and validation gates.
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
                  Move beyond agent hype into controlled orchestration: specialist roles, shared state, review layers, and production-aware workflow design.
                </p>

                <div className="mt-4 grid gap-2 sm:mt-6 sm:gap-3">
                  {[
                    'Specialist agents with clear authority',
                    'Handoff contracts and shared state rules',
                    'Validator and human approval gates before action',
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
                  Move from one controlled agent into orchestrated AI systems.
                </h3>

                <p className="mt-3 text-sm leading-7 text-sand/65">
                  Start the pathway, test coordination in the Sandbox, or bring multi-agent workflow judgement into team training.
                </p>

                <div className="mt-4 grid gap-2 sm:mt-6 sm:gap-3">
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                  >
                    Create your workspace
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>

                  <Link
                    href="/sandbox"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-5 py-4 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                  >
                    Practise in the Sandbox
                    <Route className="h-4 w-4" aria-hidden="true" />
                  </Link>

                  <Link
                    href="/business-ai-training"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#EAF7FF] px-5 py-4 text-sm font-bold text-[#123BFF] shadow-sm transition hover:bg-[#DDF2FF]"
                  >
                    Train your team
                    <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>

                <p className="mt-5 text-xs leading-6 text-sand/45">
                  Close this and keep exploring if you are not ready to start yet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (() => {
              const popup = document.getElementById('multi-agent-onboarding-popup');
              const closeButton = document.getElementById('multi-agent-onboarding-close');
              const storageKey = 'dmr_multi_agent_onboarding_popup_dismissed';
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

                if (scrollPercent >= 20) {
                  showPopup();
                }
              };

              if (hasDismissed()) return;

              timerId = window.setTimeout(showPopup, 20000);
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
          <section className="grid gap-6 rounded-[1.5rem] border border-sand/10 bg-white/90 p-5 shadow-sm backdrop-blur sm:gap-10 sm:rounded-[2rem] sm:p-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:p-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <UsersRound className="h-4 w-4" aria-hidden="true" />
                Multi-Agent Systems Pathway
              </span>

              <h1 className="mt-5 max-w-5xl text-3xl font-bold tracking-tight text-sand sm:mt-6 sm:text-5xl lg:text-6xl">
                Multi-Agent Systems: orchestrated AI teams with controlled handoffs.
              </h1>

              <p className="mt-4 max-w-3xl text-base leading-8 text-sand/70 sm:mt-6 sm:text-lg">
                Multi-agent systems should not be a pile of bots talking to each other. They need specialist roles, handoff contracts, shared state rules, validation layers, and human approval before they influence production work.
              </p>

              <p className="mt-4 max-w-3xl text-base leading-8 text-sand/70 sm:text-lg">
                DeepMind Resources turns multi-agent complexity into practical AI competency. This pathway teaches learners and teams how to coordinate agents without losing control, evidence, accountability, or workflow safety.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                >
                  Create workspace
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/sandbox"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-6 py-4 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                >
                  Practise in the Sandbox
                  <Route className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/path/agents"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-6 py-4 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                >
                  Review Agent Architecture
                  <Bot className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-sand/10 bg-[#EAF7FF] p-4 shadow-sm sm:rounded-[2rem] sm:p-6 lg:p-7">
              <div className="rounded-[1.35rem] bg-[#123BFF] p-4 text-white shadow-sm sm:rounded-[1.5rem] sm:p-6">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/75">
                      Orchestration route
                    </p>
                    <h2 className="mt-3 text-xl font-bold tracking-tight sm:text-3xl">
                      From agent sprawl to coordinated AI execution.
                    </h2>
                  </div>
                  <EmblemPulse />
                </div>

                <div className="mt-4 grid gap-2 sm:mt-6 sm:gap-3">
                  {[
                    'Assign specialist roles with clear authority',
                    'Control handoffs, state, and evidence flow',
                    'Validate claims before actions move forward',
                    'Practise orchestration inside verified sandbox tasks',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/10 p-3 sm:p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" aria-hidden="true" />
                      <p className="text-sm font-semibold leading-6 text-white/90">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-[1.5rem] bg-white p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                    <Workflow className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-sand">Coordination before complexity.</h3>
                    <p className="mt-2 text-sm leading-7 text-sand/65">
                      The pathway helps users decide whether a workflow needs several agents, one controlled agent, or no agentic system at all.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-8" aria-labelledby="multi-agent-principles">
            <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <Compass className="h-4 w-4" aria-hidden="true" />
                  Why this pathway matters
                </span>

                <h2 id="multi-agent-principles" className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                  Multi-agent systems need accountability before scale.
                </h2>

                <p className="mt-4 text-base leading-8 text-sand/65">
                  As soon as several agents collaborate, mistakes can spread through handoffs, shared memory, tool calls, and unchecked assumptions. This pathway teaches orchestration that stays inspectable, validated, and fit for real workflows.
                </p>
              </div>

              <div className="mt-8">
                <CardGrid items={architecturePrinciples} />
              </div>
            </div>
          </section>

          <section className="py-8" aria-labelledby="multi-agent-route-title">
            <div className="rounded-[2rem] border border-sand/10 bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                    <Route className="h-4 w-4" aria-hidden="true" />
                    Execution route
                  </span>

                  <h2 id="multi-agent-route-title" className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                    From isolated agents to controlled AI coordination.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-white/80">
                    The route moves from role separation into handoff design, shared state, validation controls, and sandbox testing. The goal is not to add agents. The goal is to make each agent necessary, bounded, and reviewable.
                  </p>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col">
                    <Link
                      href="/path/agents"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-[#123BFF] shadow-sm transition hover:bg-[#EAF7FF]"
                    >
                      Revisit Agent Architecture
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>

                    <Link
                      href="/syllabus"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-white/15"
                    >
                      View full syllabus
                      <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                <div className="grid gap-4">
                  {routeSteps.map((step) => (
                    <article key={step.title} className="rounded-3xl bg-white p-5 text-sand shadow-sm">
                      <div className="flex gap-4">
                        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-sm font-bold text-[#123BFF]">
                          {step.label}
                        </span>
                        <div>
                          <h3 className="text-lg font-bold text-sand">{step.title}</h3>
                          <p className="mt-3 text-sm leading-7 text-sand/65">{step.description}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-8" aria-labelledby="multi-agent-learning-areas">
            <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                    <Layers3 className="h-4 w-4" aria-hidden="true" />
                    What the pathway builds
                  </span>

                  <h2 id="multi-agent-learning-areas" className="mt-5 max-w-4xl text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                    Multi-agent design for coordinated work, verified claims, and controlled action.
                  </h2>
                </div>

                <Link
                  href="/academy"
                  className="inline-flex w-fit items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-5 py-3 text-sm font-bold text-[#123BFF] shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#0A63FF]"
                >
                  Back to Academy
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-8">
                <CardGrid items={learningAreas} columns="xl:grid-cols-3" />
              </div>
            </div>
          </section>

          <section className="py-8" aria-labelledby="multi-agent-sandbox-practice">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Verified sandbox practice
                </span>

                <h2 id="multi-agent-sandbox-practice" className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                  Test the coordination layer before it reaches real operations.
                </h2>

                <p className="mt-4 text-base leading-8 text-sand/65">
                  Multi-agent learning becomes useful when users can test the handoffs. Sandbox tasks let learners practise specialist roles, review gates, contradiction handling, and workflow coordination without touching live business systems.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/sandbox"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                  >
                    Open the Sandbox
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>

                  <Link
                    href="/platform"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-6 py-4 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                  >
                    See the platform loop
                    <Workflow className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {sandboxTasks.map((task) => {
                  const Icon = task.icon

                  return (
                    <article key={task.title} className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF] shadow-sm">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <h3 className="mt-5 text-lg font-bold tracking-tight text-sand">{task.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-sand/65">{task.description}</p>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>

          <section className="py-8" aria-labelledby="business-multi-agent-training">
            <div className="rounded-[2rem] border border-sand/10 bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                    <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
                    Business-ready orchestration
                  </span>

                  <h2 id="business-multi-agent-training" className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                    Train teams to judge agent coordination before they scale it.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-white/80">
                    Multi-agent systems can multiply both capability and risk. Business training needs staff who can map roles, validate claims, control tool access, and recognise when simpler automation is the better decision.
                  </p>

                  <Link
                    href="/business-ai-training"
                    className="mt-7 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-[#123BFF] shadow-sm transition hover:bg-[#EAF7FF]"
                  >
                    Get your business onboarded
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>

                <div className="grid gap-4">
                  {businessValue.map((item) => {
                    const Icon = item.icon

                    return (
                      <article key={item.title} className="rounded-3xl bg-white p-5 text-sand shadow-sm">
                        <div className="flex gap-4">
                          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                            <Icon className="h-6 w-6" aria-hidden="true" />
                          </span>
                          <div>
                            <h3 className="text-lg font-bold text-sand">{item.title}</h3>
                            <p className="mt-3 text-sm leading-7 text-sand/65">{item.description}</p>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="py-8" aria-labelledby="multi-agent-faq">
            <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <FileCheck2 className="h-4 w-4" aria-hidden="true" />
                Current competency notes
              </span>

              <h2 id="multi-agent-faq" className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                How the Multi-Agent Systems route works.
              </h2>

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
            <div className="rounded-[2rem] bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                    <UsersRound className="h-4 w-4" aria-hidden="true" />
                    Build the orchestration layer
                  </span>

                  <h2 className="mt-5 max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl">
                    Start with controlled multi-agent design, then prove the coordination in verified sandbox practice.
                  </h2>

                  <p className="mt-4 max-w-3xl text-base leading-8 text-white/80">
                    Move from single-agent architecture into specialist agents, structured handoffs, shared state, validation layers, and business-ready orchestration standards.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-[#123BFF] shadow-sm transition hover:bg-[#EAF7FF]"
                  >
                    Create workspace
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>

                  <Link
                    href="/academy"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-white/15"
                  >
                    Back to Academy
                    <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
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


