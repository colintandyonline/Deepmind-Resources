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
  Workflow,
  Zap,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Agent Architecture Training Path | DeepMind Resources',
  description:
    'Learn AI agent architecture with bounded goals, tool permissions, memory rules, RAG context, review gates, validation layers, and production-ready workflow design.',
  alternates: {
    canonical: 'https://deepmindresources.pro/path/agents',
  },
  keywords: [
    'AI agent architecture',
    'AI agents training',
    'agentic AI systems',
    'AI tool calling',
    'agent workflow design',
    'RAG agents',
    'AI agent safety',
    'human review gates',
    'agent sandbox tasks',
    'production AI agents',
  ],
  openGraph: {
    title: 'AI Agent Architecture Training Path | DeepMind Resources',
    description:
      'A practical training path for designing bounded AI agents with tools, memory, RAG context, permissions, review gates, validation, and production workflow discipline.',
    url: 'https://deepmindresources.pro/path/agents',
    siteName: 'DeepMind Resources',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Agent Architecture Training Path | DeepMind Resources',
    description:
      'Learn bounded AI agent architecture with tool permissions, memory rules, RAG context, review gates, validation layers, and verified sandbox practice.',
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
    title: 'Bounded autonomy',
    description:
      'Define what the agent can decide, what it can only recommend, and where human approval is required before action.',
    icon: ShieldCheck,
  },
  {
    title: 'Tool permissions',
    description:
      'Map each tool to a safe purpose, allowed inputs, expected outputs, failure states, and review rules before deployment.',
    icon: LockKeyhole,
  },
  {
    title: 'State and memory control',
    description:
      'Design what the agent may remember, what should expire, what must be retrieved, and what should never enter context.',
    icon: BrainCircuit,
  },
  {
    title: 'Observable workflows',
    description:
      'Build traceable steps, logs, checkpoints, escalation rules, and validation criteria so agent behaviour can be inspected.',
    icon: Radar,
  },
]

const routeSteps: RouteStep[] = [
  {
    label: '01',
    title: 'Define the operating boundary',
    description:
      'Clarify the goal, user, risk level, data boundary, tool access, review owner, and what the agent must never do.',
  },
  {
    label: '02',
    title: 'Design the tool and context layer',
    description:
      'Connect prompts, tools, retrieval, memory, and workflow state with explicit rules for when each component is used.',
  },
  {
    label: '03',
    title: 'Add review gates and failure controls',
    description:
      'Create approval points, uncertainty handling, fallback behaviour, logging, and escalation before the workflow reaches production.',
  },
  {
    label: '04',
    title: 'Test behaviour in the sandbox',
    description:
      'Practise agent design against realistic scenarios so users can spot unsafe autonomy, weak tool boundaries, and missing validation.',
  },
]

const learningAreas: Card[] = [
  {
    title: 'Agent mental models',
    description:
      'Understand the difference between chatbots, workflows, assistants, tool-calling systems, and genuinely agentic patterns.',
    icon: Bot,
  },
  {
    title: 'Instruction architecture',
    description:
      'Build role, goal, tool, memory, planning, refusal, escalation, and review instructions that agents can follow consistently.',
    icon: Sparkles,
  },
  {
    title: 'Tool-calling control',
    description:
      'Decide when tools are needed, what parameters are allowed, how outputs are validated, and when action must pause.',
    icon: Zap,
  },
  {
    title: 'RAG and knowledge context',
    description:
      'Use retrieval carefully so agents act from source-aware context instead of relying on unsupported memory or invented facts.',
    icon: Layers3,
  },
  {
    title: 'Workflow orchestration',
    description:
      'Connect task steps, state, handoffs, queues, approvals, and retries into controlled agentic workflows.',
    icon: Workflow,
  },
  {
    title: 'Reliability and safety',
    description:
      'Inspect agent output, tool use, autonomy level, sensitive data exposure, hidden failure modes, and production readiness.',
    icon: FileCheck2,
  },
]

const sandboxTasks: Card[] = [
  {
    title: 'Design a bounded research agent',
    description:
      'Set goal, source rules, allowed tools, memory limits, and review gates for a research workflow before any output is trusted.',
    icon: Radar,
  },
  {
    title: 'Audit unsafe agent autonomy',
    description:
      'Review a flawed agent design and identify missing approval steps, risky tool access, vague goals, and weak stop conditions.',
    icon: ShieldCheck,
  },
  {
    title: 'Map tool calls to workflow decisions',
    description:
      'Decide which tool should be called, which input is allowed, how results should be validated, and when to escalate.',
    icon: GitBranch,
  },
  {
    title: 'Create a human-in-the-loop checkpoint',
    description:
      'Add review logic so the agent pauses before sending, saving, buying, deleting, updating, or publishing anything important.',
    icon: BadgeCheck,
  },
]

const businessValue: Card[] = [
  {
    title: 'Controlled adoption',
    description:
      'Give teams a practical route for understanding agents without letting automation outrun policy, privacy, or review standards.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Workflow fit before tool spend',
    description:
      'Map the business process first, then decide whether an agent, workflow automation, RAG system, or standard assistant is actually needed.',
    icon: Target,
  },
  {
    title: 'Manager-visible risk gates',
    description:
      'Train staff to document agent decisions, approval points, sensitive-data boundaries, and escalation rules before operational use.',
    icon: FileCheck2,
  },
]

const faqItems: FaqItem[] = [
  {
    question: 'What does Agent Architecture mean in DeepMind Resources?',
    answer:
      'Agent Architecture means designing controlled AI systems with goals, tool permissions, memory rules, state, review gates, logs, and failure controls. It is not about letting an AI system act freely without boundaries.',
  },
  {
    question: 'Is this pathway for developers only?',
    answer:
      'No. Technical builders will use it deeply, but business operators and managers also need the judgement to understand when an agent is suitable, risky, overbuilt, or missing review controls.',
  },
  {
    question: 'How does this connect to Prompt Engineering?',
    answer:
      'Prompt Engineering creates controlled instructions. Agent Architecture extends that control into tools, memory, state, handoffs, approvals, and repeatable workflow behaviour.',
  },
  {
    question: 'Where does sandbox practice fit?',
    answer:
      'The Sandbox lets users test agent designs safely before production. Learners practise boundaries, tool calls, review gates, and failure handling with synthetic scenarios.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Agent Architecture Pathway | DeepMind Resources Academy',
  description:
    'A professional pathway for controlled AI agents, tool boundaries, orchestration patterns, human review gates, and verified sandbox practice.',
  url: 'https://deepmindresources.pro/path/agents',
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

export default function AgentArchitecturePathwayPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-obsidian text-sand">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div
        id="agents-onboarding-popup"
        className="hidden fixed inset-0 z-50 items-center justify-center bg-sand/30 px-4 py-6 backdrop-blur-sm"
        aria-hidden="true"
        role="dialog"
        aria-modal="true"
        aria-labelledby="agents-onboarding-title"
      >
        <div className="relative flex max-h-[calc(100vh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-[2rem] border border-sand/10 bg-white shadow-2xl">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-[#123BFF]" />

          <button
            id="agents-onboarding-close"
            type="button"
            className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-sand/10 bg-white text-sand/60 shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
            aria-label="Close Agent Architecture prompt"
          >
            &times;
          </button>

          <div className="overflow-y-auto">
            <div className="grid md:grid-cols-[0.95fr_1.05fr]">
              <div className="bg-[#123BFF] p-6 text-white sm:p-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                  <Bot className="h-4 w-4" aria-hidden="true" />
                  Agent control layer
                </span>

                <h2 id="agents-onboarding-title" className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
                  Design agents that stay inside the workflow boundary.
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
                  Build the operating map for goals, tools, memory, handoffs, human review, and production-safe agent behaviour.
                </p>

                <div className="mt-6 grid gap-3">
                  {[
                    'Bounded autonomy before action',
                    'Tool permissions and review gates',
                    'Verified sandbox practice before production use',
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
                  Move from prompt control into controlled agentic workflows.
                </h3>

                <p className="mt-3 text-sm leading-7 text-sand/65">
                  Start the pathway, practise the architecture in the Sandbox, or bring the same control layer into team training.
                </p>

                <div className="mt-6 grid gap-3">
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
              const popup = document.getElementById('agents-onboarding-popup');
              const closeButton = document.getElementById('agents-onboarding-close');
              const storageKey = 'dmr_agents_onboarding_popup_dismissed';
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
          <section className="grid gap-10 rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm backdrop-blur sm:p-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:p-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <Bot className="h-4 w-4" aria-hidden="true" />
                Agent Architecture Pathway
              </span>

              <h1 className="mt-6 max-w-5xl text-4xl font-bold tracking-tight text-sand sm:text-5xl lg:text-6xl">
                Agent Architecture: controlled AI systems for production-ready workflows.
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-sand/70 sm:text-lg">
                AI agents are not magic workers. They are controlled systems that need goals, tool permissions, memory rules, state, review gates, and observable workflow boundaries before they can support real work.
              </p>

              <p className="mt-4 max-w-3xl text-base leading-8 text-sand/70 sm:text-lg">
                DeepMind Resources turns agent hype into practical competency. This pathway teaches learners and teams how to design agentic workflows that remain source-aware, reviewable, and safe enough to practise before production use.
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
                  href="/path/prompting"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-6 py-4 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                >
                  Review Prompt Engineering
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-sand/10 bg-[#EAF7FF] p-5 shadow-sm sm:p-6 lg:p-7">
              <div className="rounded-[1.5rem] bg-[#123BFF] p-6 text-white shadow-sm">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/75">
                      Agent control route
                    </p>
                    <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                      From autonomous hype to controlled agent execution.
                    </h2>
                  </div>
                  <EmblemPulse />
                </div>

                <div className="mt-6 grid gap-3">
                  {[
                    'Define autonomy before action',
                    'Map tools, memory, state, and permissions',
                    'Add human review gates before workflow impact',
                    'Test agent behaviour inside verified sandbox tasks',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/10 p-4">
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
                    <h3 className="text-lg font-bold text-sand">Architecture before automation.</h3>
                    <p className="mt-2 text-sm leading-7 text-sand/65">
                      The pathway gives users a deterministic map for agent workflows before tools, memory, and autonomy reach business operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-8" aria-labelledby="agent-architecture-principles">
            <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <Compass className="h-4 w-4" aria-hidden="true" />
                  Why this pathway matters
                </span>

                <h2 id="agent-architecture-principles" className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                  Agents need architecture before they need autonomy.
                </h2>

                <p className="mt-4 text-base leading-8 text-sand/65">
                  Most agent failures begin before the first tool call: unclear goals, open-ended permissions, weak context, missing approval gates, and no way to inspect what happened. This pathway builds the control layer first.
                </p>
              </div>

              <div className="mt-8">
                <CardGrid items={architecturePrinciples} />
              </div>
            </div>
          </section>

          <section className="py-8" aria-labelledby="agent-route-title">
            <div className="rounded-[2rem] border border-sand/10 bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                    <Route className="h-4 w-4" aria-hidden="true" />
                    Execution route
                  </span>

                  <h2 id="agent-route-title" className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                    From agent concept to controlled workflow design.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-white/80">
                    The route moves from boundary definition into tool and context design, then into review gates, failure controls, and verified sandbox practice. The goal is not more autonomy. The goal is safer execution.
                  </p>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col">
                    <Link
                      href="/path/prompting"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-[#123BFF] shadow-sm transition hover:bg-[#EAF7FF]"
                    >
                      Revisit Prompt Engineering
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

          <section className="py-8" aria-labelledby="agent-learning-areas">
            <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                    <Layers3 className="h-4 w-4" aria-hidden="true" />
                    What the pathway builds
                  </span>

                  <h2 id="agent-learning-areas" className="mt-5 max-w-4xl text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                    Agent architecture for real tools, real data boundaries, and real review.
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

          <section className="py-8" aria-labelledby="agent-sandbox-practice">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Verified sandbox practice
                </span>

                <h2 id="agent-sandbox-practice" className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                  Prove the agent boundary before it reaches production.
                </h2>

                <p className="mt-4 text-base leading-8 text-sand/65">
                  Agent training becomes useful when users can test the design. Sandbox tasks let learners practise safe autonomy, tool selection, human approval, and failure handling without touching live systems.
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

          <section className="py-8" aria-labelledby="business-agent-training">
            <div className="rounded-[2rem] border border-sand/10 bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                    <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
                    Business-ready agent training
                  </span>

                  <h2 id="business-agent-training" className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                    Train teams to evaluate agents before adopting them.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-white/80">
                    Businesses do not need agent hype. They need staff who can judge workflow fit, tool access, privacy risk, escalation rules, and the cost of putting autonomy into real operations.
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

          <section className="py-8" aria-labelledby="agent-faq">
            <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <FileCheck2 className="h-4 w-4" aria-hidden="true" />
                Current competency notes
              </span>

              <h2 id="agent-faq" className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                How the Agent Architecture route works.
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
                    <Bot className="h-4 w-4" aria-hidden="true" />
                    Build the control layer
                  </span>

                  <h2 className="mt-5 max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl">
                    Start with agent architecture, then prove the workflow in verified sandbox practice.
                  </h2>

                  <p className="mt-4 max-w-3xl text-base leading-8 text-white/80">
                    Move from prompt systems into controlled agents with explicit tools, memory rules, human approval, and production-aware review standards.
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
