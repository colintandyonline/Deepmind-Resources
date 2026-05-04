import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Database,
  Radar,
  Route,
  Sparkles,
  Workflow,
} from 'lucide-react'
import { Sidebar } from '@/components/platform/sidebar'
import { HeroSection } from '@/components/platform/hero-section'
import { CodeSandbox } from '@/components/platform/code-sandbox'
import { ContentCardGrid, type LessonModule } from '@/components/platform/content-card'

const featuredModules: LessonModule[] = [
  {
    id: '1',
    title: 'Introduction to LLMs',
    description: 'Understanding large language models, tokenization, and inference patterns.',
    duration: '45 min',
    status: 'completed',
    category: 'Fundamentals',
    progress: 100,
  },
  {
    id: '2',
    title: 'Prompt Engineering Mastery',
    description: 'Advanced techniques for crafting effective prompts and system messages.',
    duration: '1h 20min',
    status: 'completed',
    category: 'Prompting',
    progress: 100,
  },
  {
    id: '3',
    title: 'Building Your First Agent',
    description: 'Create an autonomous AI agent with tools, memory, and reasoning capabilities.',
    duration: '2h 15min',
    status: 'in_progress',
    category: 'Agents',
    progress: 67,
  },
  {
    id: '4',
    title: 'Tool Calling & Functions',
    description: 'Implement function calling to give your agents real-world capabilities.',
    duration: '1h 45min',
    status: 'available',
    category: 'Agents',
  },
  {
    id: '5',
    title: 'Memory Systems & RAG',
    description: 'Add long-term memory and retrieval-augmented generation to your agents.',
    duration: '2h 30min',
    status: 'available',
    category: 'Advanced',
  },
  {
    id: '6',
    title: 'Multi-Agent Orchestration',
    description: 'Design and coordinate systems of multiple specialized AI agents.',
    duration: '3h 00min',
    status: 'available',
    category: 'Expert',
  },
]

type PathwayStage = {
  title: string
  description: string
  label: string
  icon: LucideIcon
}

type IntelligenceSignal = {
  title: string
  description: string
  label: string
  icon: LucideIcon
}

const pathwayStages: PathwayStage[] = [
  {
    title: 'AI Fundamentals',
    description: 'Understand what modern AI can do and where human judgement still matters.',
    label: 'Core',
    icon: BrainCircuit,
  },
  {
    title: 'Prompt Engineering',
    description: 'Give clearer instructions, improve weak outputs, and build reusable prompt patterns.',
    label: 'Core',
    icon: Sparkles,
  },
  {
    title: 'Tool Intelligence',
    description: 'Choose the right AI tools for coding, research, writing, automation, and knowledge work.',
    label: 'Tools',
    icon: Radar,
  },
  {
    title: 'Workflow Design',
    description: 'Turn one-off AI use into repeatable processes with review and quality control.',
    label: 'Workflow',
    icon: Workflow,
  },
  {
    title: 'RAG & Knowledge Systems',
    description: 'Use internal documents, retrieval patterns, and source-backed knowledge workflows.',
    label: 'Knowledge',
    icon: Database,
  },
  {
    title: 'Business Productivity',
    description: 'Apply AI to admin, operations, marketing, sales, support, reporting, and planning.',
    label: 'Business',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Data & Decision Support',
    description: 'Use AI for analysis, summaries, spreadsheets, competitor research, and decision support.',
    label: 'Analysis',
    icon: BarChart3,
  },
  {
    title: 'Agentic Systems',
    description: 'Build practical understanding of tool calling, task chains, automation, and agent workflows.',
    label: 'Agents',
    icon: Route,
  },
]

const intelligenceSignals: IntelligenceSignal[] = [
  {
    title: 'AI release reviewed',
    description:
      'A major model, product, or platform change is checked for practical learning impact.',
    label: 'Track',
    icon: Radar,
  },
  {
    title: 'Practical meaning mapped',
    description:
      'The update is translated into what matters, who should care, and what work it affects.',
    label: 'Meaning',
    icon: BrainCircuit,
  },
  {
    title: 'Lesson guidance refreshed',
    description:
      'Relevant learning paths are updated so members are not working from stale tool advice.',
    label: 'Lesson',
    icon: BookOpenCheck,
  },
  {
    title: 'Sandbox task created',
    description:
      'The change becomes a practical exercise, workflow simulation, or tool comparison task.',
    label: 'Practice',
    icon: Code2,
  },
  {
    title: 'Business workflow applied',
    description:
      'The same intelligence becomes guidance for productivity, support, operations, and automation.',
    label: 'Apply',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Recommendations improved',
    description:
      'Tool comparisons and learning advice improve as stronger real-world workflows emerge.',
    label: 'Improve',
    icon: CheckCircle2,
  },
]

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-obsidian text-sand">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at top right, rgba(69, 201, 255, 0.24), transparent 34rem), radial-gradient(circle at top left, rgba(18, 59, 255, 0.14), transparent 30rem), radial-gradient(circle at 50% 32rem, rgba(69, 201, 255, 0.16), transparent 36rem), linear-gradient(180deg, #F4FBFF 0%, #EAF7FF 46%, #F4FBFF 100%)',
        }}
        aria-hidden="true"
      />

      <div
        id="homepage-cta-popup"
        className="hidden fixed inset-0 z-50 items-center justify-center bg-sand/35 px-4 py-6 backdrop-blur-sm"
        aria-hidden="true"
        role="dialog"
        aria-modal="true"
        aria-labelledby="homepage-cta-popup-title"
      >
        <div className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-sand/10 bg-white shadow-2xl">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-[#123BFF]" />

          <button
            id="homepage-cta-popup-close"
            type="button"
            className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-sand/10 bg-white text-sand/60 shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
            aria-label="Close signup prompt"
          >
            Ãƒâ€”
          </button>

          <div className="grid md:grid-cols-[0.95fr_1.05fr]">
            <div className="bg-[#123BFF] p-6 text-white sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Live AI Intelligence
              </span>

              <h2 id="homepage-cta-popup-title" className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
                Stop chasing AI updates. Turn them into workforce capability.
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/82 sm:text-base">
                DeepMind Resources maps frontier AI change into deterministic learning paths,
                verified sandbox tasks, tool intelligence, and production-ready skills.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  'AI update to verified meaning',
                  'Verified sandbox tasks',
                  'Business-ready training paths',
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
                Choose your route
              </p>

              <h3 className="mt-3 text-2xl font-bold tracking-tight text-sand">
                Start the Academy, or get your team onboarded.
              </h3>

              <p className="mt-3 text-sm leading-7 text-sand/65">
                Build individual AI competency, explore the live Academy, or move your business
                into structured workforce training.
              </p>

              <div className="mt-6 grid gap-3">
                <a
                  href="/academy"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                >
                  Explore the Academy
                  <span aria-hidden="true">Ã¢â€ â€™</span>
                </a>

                <a
                  href="/auth/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-5 py-4 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                >
                  Sign up and create workspace
                  <span aria-hidden="true">Ã¢â€ â€™</span>
                </a>

                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#EAF7FF] px-5 py-4 text-sm font-bold text-[#123BFF] shadow-sm transition hover:bg-[#DDF2FF]"
                >
                  Get your business onboarded
                  <span aria-hidden="true">Ã¢â€ â€™</span>
                </a>
              </div>

              <p className="mt-5 text-xs leading-6 text-sand/45">
                Close this and keep exploring if you are not ready yet.
              </p>
            </div>
          </div>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (() => {
              const popup = document.getElementById('homepage-cta-popup');
              const closeButton = document.getElementById('homepage-cta-popup-close');
              const storageKey = 'dmr_homepage_cta_popup_dismissed';
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

      <Sidebar />

      <main className="relative z-10 min-h-screen pt-16 md:pl-64 md:pt-0">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <HeroSection />

          <section className="mt-8 lg:mt-12">
            <div className="rounded-3xl border border-sand/10 bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                    <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
                    Business AI Training
                  </span>

                  <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                    Train your team to use AI confidently, safely, and practically.
                  </h2>

                  <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 sm:text-base">
                    Give your business a professional AI training path with clear lessons, tool
                    intelligence, sandbox practice, and practical workflow habits built for real
                    work.
                  </p>
                </div>

                <Link
                  href="/business-ai-training"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-[#123BFF] shadow-sm transition hover:bg-[#EAF7FF]"
                >
                  View business training
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>

          <section className="mt-8 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-3 lg:items-stretch">
            <div className="flex h-full flex-col rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm lg:col-span-1">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                    <Route className="h-4 w-4" aria-hidden="true" />
                    Learning pathway
                  </span>

                  <h2 className="mt-5 text-2xl font-bold tracking-tight text-sand">
                    Practical AI capability map
                  </h2>
                </div>

                <span className="rounded-2xl bg-[#EAF7FF] px-4 py-3 text-sm font-bold text-[#123BFF]">
                  8 stages
                </span>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-sand/10">
                <div className="h-full w-full rounded-full bg-[#123BFF]" />
              </div>

              <div className="mt-5 flex-1 overflow-hidden">
                <div className="mt-5 overflow-y-auto pr-2" style={{ height: "63rem" }}>
                  <div className="space-y-4">
                    {pathwayStages.map((stage, index) => {
                      const Icon = stage.icon

                      return (
                        <div key={stage.title} className="relative pl-16">
                          {index !== pathwayStages.length - 1 ? (
                            <span className="absolute left-[1.35rem] top-12 h-[calc(100%+0.75rem)] w-px bg-[#123BFF]/30" />
                          ) : null}

                          <span className="absolute left-0 top-0 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#123BFF]/20 bg-[#EAF7FF] text-[#123BFF]">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>

                          <div className="rounded-3xl border border-sand/10 bg-white p-4 shadow-sm">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="text-lg font-bold text-sand">{stage.title}</h3>
                                  <CheckCircle2
                                    className="h-5 w-5 text-[#123BFF]"
                                    aria-hidden="true"
                                  />
                                </div>

                                <p className="mt-1 text-sm leading-6 text-sand/60">
                                  {stage.description}
                                </p>
                              </div>

                              <span className="rounded-2xl bg-[#EAF7FF] px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#123BFF]">
                                {stage.label}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <Link
                href="/syllabus"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
              >
                View full syllabus
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm lg:col-span-2">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Live AI Intelligence
                  </span>

                  <h2 className="mt-5 text-2xl font-bold tracking-tight text-sand sm:text-3xl">
                    AI update → verified meaning → Agentic Sandbox Deployment.
                  </h2>

                  <p className="mt-3 max-w-3xl text-sm leading-7 text-sand/65 sm:text-base">
                    DeepMind Resources transforms verified AI updates into Agentic Systems,
                    sandbox tasks, and tool-intelligence training paths.
                  </p>
                </div>

                <span className="w-fit rounded-2xl bg-[#EAF7FF] px-4 py-3 text-sm font-bold text-[#123BFF]">
                  Active
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-sand/10 bg-white p-4 shadow-sm">
                  <p className="text-2xl font-bold text-[#123BFF]">Live</p>
                  <p className="mt-1 text-sm leading-6 text-sand/60">release-aware learning</p>
                </div>
                <div className="rounded-2xl border border-sand/10 bg-white p-4 shadow-sm">
                  <p className="text-2xl font-bold text-[#123BFF]">8</p>
                  <p className="mt-1 text-sm leading-6 text-sand/60">capability areas tracked</p>
                </div>
                <div className="rounded-2xl border border-sand/10 bg-white p-4 shadow-sm">
                  <p className="text-2xl font-bold text-[#123BFF]">Real</p>
                  <p className="mt-1 text-sm leading-6 text-sand/60">workflows, not demos</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                {intelligenceSignals.map((signal, index) => {
                  const Icon = signal.icon

                  return (
                    <article
                      key={signal.title}
                      className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex gap-4">
                          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>

                          <div>
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-[#123BFF] text-xs font-bold text-white shadow-sm">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              <h3 className="text-lg font-bold text-sand">{signal.title}</h3>
                            </div>

                            <p className="mt-3 text-sm leading-7 text-sand/65">
                              {signal.description}
                            </p>
                          </div>
                        </div>

                        <span className="w-fit rounded-full bg-[#EAF7FF] px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                          {signal.label}
                        </span>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>

          <section id="learning" className="mt-10 lg:mt-12">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
                  Academy Modules
                </span>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-sand">
                  Continue Learning
                </h2>
                <p className="mt-2 text-sand/55">
                  Pick up where you left off or start a new module
                </p>
              </div>
              <Link
                href="/syllabus"
                className="inline-flex w-fit items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-4 py-2 text-sm font-bold text-[#123BFF] shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#0A63FF]"
              >
                View Full Syllabus
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <ContentCardGrid modules={featuredModules} />
          </section>

          <section id="sandbox" className="mt-10 lg:mt-12">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <Code2 className="h-4 w-4" aria-hidden="true" />
                  Live Sandbox
                </span>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-sand">
                  Agentic Sandbox
                </h2>
                <p className="mt-2 text-sand/55">
                  Practice building AI agents in a live environment
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-[#123BFF] px-4 py-2 text-sm font-bold text-white shadow-sm">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                  Live
                </span>
              </div>
            </div>
            <CodeSandbox />
          </section>
        </div>
      </main>
    </div>
  )
}

