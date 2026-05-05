import type { Metadata } from 'next'
import type { LucideIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
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
  Workflow,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Fundamentals Training Path | DeepMind Resources',
  description:
    'Build core AI competency with source-aware foundations, safe-use judgement, prompt basics, tool selection, validation habits, and verified sandbox practice.',
  alternates: {
    canonical: 'https://deepmindresources.pro/academy/path/fundamentals',
  },
  keywords: [
    'AI fundamentals training',
    'AI basics for professionals',
    'AI competency foundations',
    'AI safety basics',
    'AI tool selection basics',
    'prompt engineering foundations',
    'AI validation training',
    'source-aware AI training',
    'business AI foundations',
    'AI sandbox practice',
  ],
  openGraph: {
    title: 'AI Fundamentals Training Path | DeepMind Resources',
    description:
      'A practical AI fundamentals path for building safe-use judgement, prompt foundations, tool awareness, validation habits, and production-ready AI competency.',
    url: 'https://deepmindresources.pro/academy/path/fundamentals',
    siteName: 'DeepMind Resources',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Fundamentals Training Path | DeepMind Resources',
    description:
      'Build AI competency from the ground up with source-aware foundations, safe-use judgement, prompt basics, validation habits, and verified sandbox practice.',
  },
}

type Card = {
  title: string
  description: string
  icon: LucideIcon
}

type Outcome = {
  label: string
  title: string
  description: string
}

type FaqItem = {
  question: string
  answer: string
}

const fundamentalsPrinciples: Card[] = [
  {
    title: 'Competency before complexity',
    description:
      'Build the mental model first: what AI systems are good at, where they fail, and how to control their use before workflows scale.',
    icon: GraduationCap,
  },
  {
    title: 'Security-aware from day one',
    description:
      'Set the boundary early: sensitive data, unsupported claims, regulated decisions, and production workflows all need clear review rules.',
    icon: ShieldCheck,
  },
  {
    title: 'Tool intelligence over hype',
    description:
      'Learn how to separate model capability, product packaging, assistants, retrieval systems, and automation layers before choosing tools.',
    icon: Radar,
  },
  {
    title: 'Practice before production',
    description:
      'Move from understanding to execution inside verified sandbox tasks that test prompting, validation, risk judgement, and tool selection.',
    icon: Route,
  },
]

const pathwayOutcomes: Outcome[] = [
  {
    label: '01',
    title: 'Read the AI landscape with control',
    description:
      'Understand models, assistants, platforms, context windows, retrieval, automation, and why capability changes as the frontier moves.',
  },
  {
    label: '02',
    title: 'Know the boundary before the workflow',
    description:
      'Identify what can be delegated, what must be reviewed, what data should stay out, and where AI output cannot be trusted blindly.',
  },
  {
    label: '03',
    title: 'Turn prompts into operating instructions',
    description:
      'Move beyond casual requests and learn the structure behind reliable AI work: role, context, task, constraints, format, and review.',
  },
  {
    label: '04',
    title: 'Prepare for tool intelligence',
    description:
      'Build the judgement needed to compare AI tools by workflow fit, risk profile, production use, and measurable competency value.',
  },
]

const pathwayModules: Card[] = [
  {
    title: 'How AI systems behave',
    description:
      'Learn the practical operating model behind modern AI: prediction, reasoning-like output, context, retrieval, memory, and failure modes.',
    icon: BrainCircuit,
  },
  {
    title: 'The modern tool stack',
    description:
      'Map assistants, model APIs, research tools, coding systems, RAG platforms, agent workflows, and automation layers into one clear picture.',
    icon: Layers3,
  },
  {
    title: 'Risk, review, and reliability',
    description:
      'Set professional rules for privacy, hallucinations, source checking, regulated decisions, business approval, and safe AI adoption.',
    icon: FileCheck2,
  },
  {
    title: 'From foundation to execution',
    description:
      'Use the fundamentals route as the launch point for prompt systems, workflow mapping, tool intelligence, agents, and verified sandbox practice.',
    icon: Compass,
  },
]

const sandboxTasks: Card[] = [
  {
    title: 'Classify workflow risk',
    description:
      'Decide whether real workplace scenarios are safe for AI, require review, contain sensitive data, or should stay outside automated workflows.',
    icon: ShieldCheck,
  },
  {
    title: 'Convert vague input into controlled instruction',
    description:
      'Rewrite weak prompts into structured operating instructions with context, constraints, output rules, and clear review expectations.',
    icon: Sparkles,
  },
  {
    title: 'Audit a confident AI answer',
    description:
      'Inspect output for unsupported claims, missing evidence, wrong assumptions, source gaps, and review requirements before it is used.',
    icon: BadgeCheck,
  },
  {
    title: 'Match tools to production use cases',
    description:
      'Build tool intelligence by choosing the right AI system type for a task instead of following hype, popularity, or generic recommendations.',
    icon: Target,
  },
]

const audienceCards: Card[] = [
  {
    title: 'Individual operators',
    description:
      'For learners who want to move from scattered AI experimentation into structured, current, production-aware capability.',
    icon: GraduationCap,
  },
  {
    title: 'Business teams',
    description:
      'For staff who need a shared AI operating standard across research, communication, admin, support, planning, and workflow execution.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Future builders',
    description:
      'For people preparing to move into prompt systems, RAG, tool calling, agentic workflows, validation, and multi-agent architecture.',
    icon: Workflow,
  },
]

const businessValue: Card[] = [
  {
    title: 'One operating language for AI',
    description:
      'Give staff a shared map for model behaviour, tool limits, privacy boundaries, review standards, and safe workplace use.',
    icon: BookOpenCheck,
  },
  {
    title: 'Safer adoption before scale',
    description:
      'Build the habits that keep AI away from sensitive data, unsupported decisions, uncontrolled outputs, and unmanaged workflow risk.',
    icon: LockKeyhole,
  },
  {
    title: 'Better tool decisions',
    description:
      'Train teams to define the workflow first, then select the AI system by production value, governance need, and measurable capability.',
    icon: Target,
  },
]

const faqItems: FaqItem[] = [
  {
    question: 'How does this pathway stay current?',
    answer:
      'DeepMind Resources tracks meaningful AI shifts and translates them into verified guidance, refreshed pathway context, and new sandbox practice where the change affects real capability.',
  },
  {
    question: 'What does this pathway prepare users to do?',
    answer:
      'It prepares users to work with AI deliberately: understand model limits, protect sensitive workflows, structure better prompts, inspect outputs, and choose tools by production fit.',
  },
  {
    question: 'Where does sandbox practice fit?',
    answer:
      'The Sandbox turns foundation knowledge into controlled execution. Users practise risk classification, prompt structure, output validation, and tool-selection judgement before applying AI to real work.',
  },
  {
    question: 'Is this suitable for business teams?',
    answer:
      'Yes. The pathway gives teams a shared AI operating standard before they move into role-based workflows, business sandbox tasks, tool intelligence, and workforce training.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'AI Fundamentals Pathway | DeepMind Resources Academy',
  description:
    'A professional AI fundamentals pathway for building practical AI competency, safe-use habits, prompt foundations, tool judgement, and verified sandbox practice.',
  url: 'https://deepmindresources.pro/academy/path/fundamentals',
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
      <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-[#123BFF] p-3 shadow-xl shadow-[#123BFF]/25 sm:h-24 sm:w-24">
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

function CardGrid({ items }: { items: Card[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
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

export default function AIFundamentalsPathwayPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-obsidian text-sand">
      <div
        id="fundamentals-onboarding-popup"
        className="hidden fixed inset-0 z-50 items-center justify-center bg-sand/30 px-4 py-6 backdrop-blur-sm"
        aria-hidden="true"
        role="dialog"
        aria-modal="true"
        aria-labelledby="fundamentals-onboarding-title"
      >
        <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-sand/10 bg-white shadow-2xl">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-[#123BFF]" />

          <button
            id="fundamentals-onboarding-close"
            type="button"
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-sand/10 bg-white text-xl font-bold leading-none text-sand/60 shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
            aria-label="Close AI Fundamentals onboarding"
          >
            Ã—
          </button>

          <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
            <div className="bg-[#123BFF] p-6 text-white sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
                Foundation route
              </span>

              <h2 id="fundamentals-onboarding-title" className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
                Build the AI operating base before production work.
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
                Start with safe-use judgement, model behaviour, prompt foundations, tool awareness, and verified sandbox practice.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  'Core AI concepts before deeper workflows',
                  'Safe-use boundaries and output review',
                  'Sandbox practice before production use',
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
                Start the foundation, then prove it in the Sandbox.
              </h3>

              <p className="mt-3 text-sm leading-7 text-sand/65">
                Create your workspace to begin the pathway, save progress later, and move from concepts into practical AI competency.
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

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (() => {
              const popup = document.getElementById('fundamentals-onboarding-popup');
              const closeButton = document.getElementById('fundamentals-onboarding-close');
              const storageKey = 'dmr_fundamentals_popup_closed';
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
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
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
                Academy pathway
              </span>

              <h1 className="mt-6 max-w-5xl text-4xl font-bold tracking-tight text-sand sm:text-5xl lg:text-6xl">
                AI Fundamentals: the operating base for professional AI competency.
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-sand/70 sm:text-lg">
                The frontier is moving faster than static training can absorb. This pathway gives learners and teams the control layer: clear AI mental models, safe-use boundaries, tool judgement, and the first verified sandbox behaviours needed before AI touches production work.
              </p>

              <p className="mt-4 max-w-3xl text-base leading-8 text-sand/70 sm:text-lg">
                DeepMind Resources turns model and tool shifts into structured competency. AI Fundamentals is the entry route into that system: the foundation that lets every later pathway stay current, practical, and business-ready.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/syllabus"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                >
                  View syllabus
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/sandbox"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-6 py-4 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                >
                  Try sandbox practice
                  <Route className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-6 py-4 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                >
                  Create workspace
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-sand/10 bg-[#EAF7FF] p-5 shadow-sm sm:p-6 lg:p-7">
              <div className="rounded-[1.5rem] bg-[#123BFF] p-6 text-white shadow-sm">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/75">
                      Foundation route
                    </p>
                    <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                      From frontier confusion to controlled AI execution.
                    </h2>
                  </div>
                  <EmblemPulse />
                </div>

                <div className="mt-6 grid gap-3">
                  {[
                    'Map AI capability, limits, and failure modes',
                    'Set privacy and review boundaries before production work',
                    'Practise controlled prompts and output checks',
                    'Prepare for prompt systems, agents, RAG, and tool intelligence',
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
                    <Radar className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-sand">Connected to live AI intelligence.</h3>
                    <p className="mt-2 text-sm leading-7 text-sand/65">
                      When a meaningful model, protocol, tool, or workflow shift changes what professionals need to know, the Academy can route that update into refreshed guidance and new verified sandbox tasks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-8" aria-labelledby="why-this-pathway-matters">
            <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <Compass className="h-4 w-4" aria-hidden="true" />
                  Why this pathway matters
                </span>

                <h2 id="why-this-pathway-matters" className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                  The frontier is moving. The foundation has to be engineered.
                </h2>

                <p className="mt-4 text-base leading-8 text-sand/65">
                  AI adoption fails when teams collect tools before they build judgement. This path gives users a deterministic foundation for model behaviour, tool boundaries, sensitive data, review gates, and production-safe AI use.
                </p>
              </div>

              <div className="mt-8">
                <CardGrid items={fundamentalsPrinciples} />
              </div>
            </div>
          </section>

          <section className="py-8" aria-labelledby="pathway-outcomes">
            <div className="rounded-[2rem] border border-sand/10 bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                    <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                    Pathway outcomes
                  </span>

                  <h2 id="pathway-outcomes" className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                    From orientation to operational control.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-white/80">
                    AI Fundamentals is where users stop treating AI as a magic interface and start using it as a controlled system. Prompting, agents, RAG, automation, and validation all depend on this operating base.
                  </p>
                </div>

                <div className="grid gap-4">
                  {pathwayOutcomes.map((outcome) => (
                    <article key={outcome.title} className="rounded-3xl bg-white p-5 text-sand shadow-sm">
                      <div className="flex gap-4">
                        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-sm font-bold text-[#123BFF]">
                          {outcome.label}
                        </span>
                        <div>
                          <h3 className="text-lg font-bold text-sand">{outcome.title}</h3>
                          <p className="mt-3 text-sm leading-7 text-sand/65">{outcome.description}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-8" aria-labelledby="what-this-pathway-covers">
            <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
                  What this pathway covers
                </span>

                <h2 id="what-this-pathway-covers" className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                  The foundation layer for current AI competency.
                </h2>

                <p className="mt-4 text-base leading-8 text-sand/65">
                  This route defines the core operating map before deeper Academy tracks: model behaviour, tool categories, safe-use rules, prompt control, workflow boundaries, and first-pass output validation.
                </p>
              </div>

              <div className="mt-8">
                <CardGrid items={pathwayModules} />
              </div>
            </div>
          </section>

          <section className="py-8" aria-labelledby="sandbox-connection">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <Route className="h-4 w-4" aria-hidden="true" />
                  Verified sandbox practice
                </span>

                <h2 id="sandbox-connection" className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                  Verify the habit before it reaches the workflow.
                </h2>

                <p className="mt-4 text-base leading-8 text-sand/65">
                  The route points into guided sandbox tasks where users practise decisions they will need at work: classifying risk, structuring prompts, checking unsupported output, and selecting the right tool for the job.
                </p>

                <Link
                  href="/sandbox"
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                >
                  Explore sandbox
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
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

          <section className="py-8" aria-labelledby="who-this-is-for">
            <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <Target className="h-4 w-4" aria-hidden="true" />
                  Who this pathway is for
                </span>

                <h2 id="who-this-is-for" className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                  Built for serious learners, staff, and future AI operators.
                </h2>

                <p className="mt-4 text-base leading-8 text-sand/65">
                  This pathway gives individuals and teams the same professional base before they move into prompt engineering, tool intelligence, business workflows, agents, RAG, and multi-agent systems.
                </p>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {audienceCards.map((audience) => {
                  const Icon = audience.icon

                  return (
                    <article key={audience.title} className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF] shadow-sm">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <h3 className="mt-5 text-lg font-bold tracking-tight text-sand">{audience.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-sand/65">{audience.description}</p>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>

          <section className="py-8" aria-labelledby="business-value">
            <div className="rounded-[2rem] border border-sand/10 bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                    <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
                    Business-ready foundations
                  </span>

                  <h2 id="business-value" className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                    Give the workforce a current AI operating standard.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-white/80">
                    For businesses, AI Fundamentals creates the baseline your team needs before wider adoption: shared language, safe-use boundaries, output validation, tool judgement, and a route into role-based workflow training.
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

          <section className="py-8" aria-labelledby="fundamentals-faq">
            <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <FileCheck2 className="h-4 w-4" aria-hidden="true" />
                Current competency notes
              </span>

              <h2 id="fundamentals-faq" className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                How the AI Fundamentals route works.
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
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Start the foundation
                  </span>

                  <h2 className="mt-5 max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl">
                    Start with the operating base, then move into verified AI execution.
                  </h2>

                  <p className="mt-4 max-w-3xl text-base leading-8 text-white/80">
                    Use AI Fundamentals to establish the standard. Then move into prompt systems, tool intelligence, agents, RAG, validation, and verified sandbox practice.
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
                    href="/syllabus"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-white/15"
                  >
                    View syllabus
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
