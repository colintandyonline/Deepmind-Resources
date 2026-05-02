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
  ClipboardCheck,
  Database,
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
  title: 'AI Academy | DeepMind Resources',
  description:
    'Explore the DeepMind Resources AI Academy: release-aware learning paths, sandbox practice, tool intelligence, business training, and versioned AI skills that stay current as AI changes.',
  alternates: {
    canonical: '/academy',
  },
  keywords: [
    'AI Academy',
    'AI training academy',
    'AI learning paths',
    'prompt engineering academy',
    'AI tool selection training',
    'business AI training',
    'AI sandbox practice',
    'AI agents training',
    'RAG training',
    'AI safety training',
    'professional AI training',
    'AI skills platform',
  ],
  openGraph: {
    title: 'AI Academy | DeepMind Resources',
    description:
      'A release-aware AI Academy for practical learning paths, verified sandbox tasks, tool intelligence, business training, and skill progress that can refresh when AI changes.',
    url: 'https://deepmindresources.pro/academy',
    siteName: 'DeepMind Resources',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'AI Academy | DeepMind Resources',
    description:
      'Build practical AI competency with learning paths, sandbox practice, tool intelligence, and business-ready training that stays current as AI changes.',
  },
}

type Track = {
  label: string
  title: string
  description: string
  icon: LucideIcon
  paths: string[]
}

type SystemStep = {
  step: string
  title: string
  description: string
  icon: LucideIcon
}

type Level = {
  title: string
  description: string
  points: string[]
}

type Tier = {
  title: string
  label: string
  description: string
  features: string[]
}

type BrainSignal = {
  title: string
  description: string
  label: string
}

const tracks: Track[] = [
  {
    label: 'Beginner Core',
    title: 'Start with safe AI foundations',
    description:
      'For learners who need clear concepts, better prompting habits, tool-selection basics, and validation confidence before using AI in real work.',
    icon: GraduationCap,
    paths: [
      'AI Fundamentals',
      'Prompt Engineering',
      'AI Tool Selection',
      'AI Safety and Validation Basics',
    ],
  },
  {
    label: 'Business Readiness',
    title: 'Train staff for practical workplace AI',
    description:
      'For business owners, managers, and teams that need safer AI use, workflow training, staff readiness, and tool decisions that match real work.',
    icon: BriefcaseBusiness,
    paths: [
      'AI for Business Productivity',
      'AI Tool Selection for Teams',
      'Safe AI Use at Work',
      'AI Workflow Mapping',
    ],
  },
  {
    label: 'Builder Track',
    title: 'Move into systems, agents, and knowledge workflows',
    description:
      'For technical learners and operators who want to understand tool calling, RAG, agent design, workflow automation, and review gates.',
    icon: Workflow,
    paths: [
      'Tool Calling and Functions',
      'RAG and Knowledge Systems',
      'AI Agents',
      'Agentic Workflows',
    ],
  },
  {
    label: 'Tool Intelligence',
    title: 'Choose tools by use case, not hype',
    description:
      'For users comparing models, platforms, products, and workflows across coding, research, automation, business productivity, and creative work.',
    icon: Radar,
    paths: [
      'AI Tool Comparison',
      'Model and Platform Selection',
      'Capability-Based Tool Choice',
      'Business Tool Stack Planning',
    ],
  },
]

const systemSteps: SystemStep[] = [
  {
    step: '01',
    title: 'Learn the concept',
    description:
      'Lessons explain the idea in practical language, then connect it to tools, workflows, risks, and real usage scenarios.',
    icon: BookOpenCheck,
  },
  {
    step: '02',
    title: 'Practise in the sandbox',
    description:
      'The lesson becomes a task: improve a prompt, map a workflow, compare tools, validate output, or design a safer AI process.',
    icon: Route,
  },
  {
    step: '03',
    title: 'Prove the skill',
    description:
      'Progress should come from useful evidence: completed sandbox tasks, review checklists, skill confidence, and practical outputs.',
    icon: Target,
  },
  {
    step: '04',
    title: 'Refresh when AI changes',
    description:
      'When a verified update affects a lesson or task, the Academy can flag refreshers, updated content, or business retraining needs.',
    icon: Sparkles,
  },
]

const skillLevels: Level[] = [
  {
    title: 'Beginner',
    description: 'For users building confidence with AI tools and safer working habits.',
    points: ['AI terms', 'Structured prompts', 'Basic tool choice', 'Simple sandbox tasks'],
  },
  {
    title: 'Intermediate',
    description: 'For users turning AI into repeatable workflows and better decisions.',
    points: ['Prompt systems', 'Tool comparisons', 'Workflow maps', 'Output validation'],
  },
  {
    title: 'Advanced',
    description: 'For builders working with agents, RAG, APIs, automation, and review systems.',
    points: ['Tool calling', 'RAG patterns', 'Agent design', 'Validation layers'],
  },
  {
    title: 'Business',
    description: 'For teams that need staff training, manager visibility, and practical AI adoption.',
    points: ['Safe use', 'Staff readiness', 'Tool approval', 'Retraining triggers'],
  },
]

const businessLevels: Level[] = [
  {
    title: 'Awareness',
    description: 'For staff who need to understand what AI can and cannot do.',
    points: ['Safe usage', 'Common risks', 'Data privacy', 'When to ask for review'],
  },
  {
    title: 'Practical User',
    description: 'For staff using AI in daily work such as writing, summaries, planning, and admin.',
    points: ['Prompting', 'Checking outputs', 'Approved tools', 'Workflow rules'],
  },
  {
    title: 'Power User',
    description: 'For team members who improve repeated processes and support others.',
    points: ['Workflow mapping', 'Tool comparison', 'Prompt templates', 'Validation checklists'],
  },
  {
    title: 'Manager',
    description: 'For leaders responsible for adoption, risk, staff progress, and tool decisions.',
    points: ['Staff readiness', 'Risk control', 'Tool spend', 'Retraining alerts'],
  },
]

const accessTiers: Tier[] = [
  {
    title: 'Free Explorer',
    label: 'Public preview',
    description:
      'For people evaluating the platform and learning how release-aware AI training works.',
    features: ['Academy overview', 'Syllabus preview', 'Public sandbox demo', 'Selected tool intelligence previews'],
  },
  {
    title: 'Individual Architect',
    label: 'Individual learning',
    description:
      'For learners who want full Academy access, practical tasks, saved progress, and refresher guidance.',
    features: ['Full Academy access', 'Full sandbox practice', 'Progress dashboard', 'Skill confidence tracking'],
  },
  {
    title: 'Business Team',
    label: 'Team training',
    description:
      'For teams that need staff paths, business-safe practice, progress reporting, and update-aware retraining.',
    features: ['Staff assignments', 'Team progress', 'Business sandbox tasks', 'Manager reporting'],
  },
  {
    title: 'Enterprise / Custom',
    label: 'Governed training',
    description:
      'For organisations that need custom paths, onboarding, reporting, and policy-aligned AI training.',
    features: ['Custom role paths', 'Private onboarding', 'Advanced reporting', 'Governance alignment'],
  },
]

const brainSignals: BrainSignal[] = [
  {
    title: 'Verified AI update',
    description:
      'Important changes from models, platforms, tools, APIs, or workflows are checked before they influence training.',
    label: 'Verify',
  },
  {
    title: 'Impact mapped to learning',
    description:
      'The Brain identifies which paths, lessons, sandbox tasks, comparisons, or business training may be affected.',
    label: 'Map',
  },
  {
    title: 'Content version proposed',
    description:
      'A lesson refresh, new task, comparison update, or business retraining flag can be proposed for review.',
    label: 'Update',
  },
  {
    title: 'Human review before publication',
    description:
      'Catalogue and Brain intelligence can support planning, but public Academy material should be reviewed before release.',
    label: 'Review',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'AI Academy | DeepMind Resources',
  description:
    'A release-aware AI Academy for practical learning paths, sandbox practice, tool intelligence, business training, and versioned AI skill development.',
  url: 'https://deepmindresources.pro/academy',
  about: tracks.map((track) => track.label),
  publisher: {
    '@type': 'Organization',
    name: 'DeepMind Resources',
    url: 'https://deepmindresources.pro',
  },
}

export default function AcademyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-obsidian text-sand">
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

      <div className="relative z-10 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <nav className="flex items-center justify-between rounded-3xl border border-sand/10 bg-white/85 px-5 py-4 shadow-sm backdrop-blur sm:px-6">
            <Link href="/" className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#123BFF] text-white shadow-sm">
                <BrainCircuit className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="text-sm font-bold tracking-tight text-sand sm:text-base">
                DeepMind Resources
              </span>
            </Link>

            <div className="hidden items-center gap-6 text-sm font-bold text-sand/65 lg:flex">
              <Link href="/" className="transition hover:text-[#123BFF]">
                Home
              </Link>
              <a href="#tracks" className="transition hover:text-[#123BFF]">
                Tracks
              </a>
              <a href="#brain" className="transition hover:text-[#123BFF]">
                Brain
              </a>
              <a href="#levels" className="transition hover:text-[#123BFF]">
                Levels
              </a>
              <Link href="/sandbox" className="transition hover:text-[#123BFF]">
                Sandbox
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/syllabus"
                className="hidden rounded-2xl border border-sand/10 bg-white px-4 py-2.5 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF] sm:inline-flex"
              >
                View syllabus
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#123BFF] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
              >
                Create workspace
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </nav>

          <section className="grid gap-8 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
                AI Academy
              </span>

              <h1 className="mt-6 max-w-5xl text-4xl font-bold tracking-tight text-sand sm:text-5xl lg:text-6xl">
                Build AI competency that stays current as the frontier moves.
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-sand/70 sm:text-lg">
                DeepMind Resources Academy turns verified AI intelligence into structured learning
                paths, practical sandbox tasks, tool-selection judgement, and business-ready skill
                development.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
                  Try sandbox
                  <Route className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/business-ai-training"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-6 py-4 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                >
                  Business training
                  <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  Release-aware learning
                </span>
                <span className="rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  Verified sandbox tasks
                </span>
                <span className="rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  Tool intelligence
                </span>
              </div>
            </div>

            <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-5 shadow-sm sm:p-6 lg:p-8">
              <div className="rounded-[1.5rem] bg-[#EAF7FF] p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#123BFF] shadow-sm">
                    <Layers3 className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                      Living training system
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-sand">
                      From AI change to practical skill evidence.
                    </h2>
                  </div>
                </div>

                <div className="mt-6 grid gap-4">
                  {systemSteps.map((item) => {
                    const Icon = item.icon

                    return (
                      <div key={item.title} className="rounded-2xl border border-white bg-white/85 p-4 shadow-sm">
                        <div className="flex items-start gap-3">
                          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#123BFF] text-xs font-bold text-white shadow-sm">
                            {item.step}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4 text-[#123BFF]" aria-hidden="true" />
                              <h3 className="text-sm font-bold text-sand">{item.title}</h3>
                            </div>
                            <p className="mt-2 text-sm leading-7 text-sand/65">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="pb-8" aria-labelledby="different-title">
            <div className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                    <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                    Why it is different
                  </span>

                  <h2
                    id="different-title"
                    className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl"
                  >
                    Not static lessons. Not generic AI tips.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-sand/65">
                    The Academy is planned as a source-aware learning layer. It should teach stable
                    concepts while staying ready to update when models, platforms, tools, and safe
                    working patterns change.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                    <BadgeCheck className="h-7 w-7 text-[#123BFF]" aria-hidden="true" />
                    <h3 className="mt-4 text-lg font-bold text-sand">Source-aware training</h3>
                    <p className="mt-2 text-sm leading-7 text-sand/65">
                      Lessons should be influenced by verified intelligence, not raw scraped claims
                      or marketing hype.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                    <ClipboardCheck className="h-7 w-7 text-[#123BFF]" aria-hidden="true" />
                    <h3 className="mt-4 text-lg font-bold text-sand">Version-aware progress</h3>
                    <p className="mt-2 text-sm leading-7 text-sand/65">
                      Future progress can distinguish completed lessons from content that changed
                      after a meaningful AI update.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                    <Database className="h-7 w-7 text-[#123BFF]" aria-hidden="true" />
                    <h3 className="mt-4 text-lg font-bold text-sand">Catalogue-connected</h3>
                    <p className="mt-2 text-sm leading-7 text-sand/65">
                      Companies, platforms, models, capabilities, and comparison groups can route
                      lessons into better tool and workflow intelligence.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                    <UsersRound className="h-7 w-7 text-[#123BFF]" aria-hidden="true" />
                    <h3 className="mt-4 text-lg font-bold text-sand">Business-ready by design</h3>
                    <p className="mt-2 text-sm leading-7 text-sand/65">
                      The same learning system can support individuals, staff training, managers,
                      and future business retraining alerts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="tracks" className="py-8" aria-labelledby="tracks-title">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <Layers3 className="h-4 w-4" aria-hidden="true" />
                  Academy tracks
                </span>
                <h2 id="tracks-title" className="mt-4 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                  Four routes into practical AI capability.
                </h2>
              </div>
              <Link
                href="/syllabus"
                className="inline-flex w-fit items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-5 py-3 text-sm font-bold text-[#123BFF] shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#0A63FF]"
              >
                Explore syllabus
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {tracks.map((track) => {
                const Icon = track.icon

                return (
                  <article key={track.label} className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-7">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF] shadow-sm">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                          {track.label}
                        </p>
                        <h3 className="mt-2 text-xl font-bold tracking-tight text-sand">
                          {track.title}
                        </h3>
                      </div>
                    </div>

                    <p className="mt-5 text-sm leading-7 text-sand/65">{track.description}</p>

                    <div className="mt-5 grid gap-3">
                      {track.paths.map((path) => (
                        <div key={path} className="flex items-start gap-3 rounded-2xl bg-[#F7FBFF] p-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#123BFF]" aria-hidden="true" />
                          <p className="text-sm leading-6 text-sand/70">{path}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          <section id="brain" className="py-8" aria-labelledby="brain-title">
            <div className="rounded-[2rem] border border-sand/10 bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                    <BrainCircuit className="h-4 w-4" aria-hidden="true" />
                    Brain-connected learning
                  </span>

                  <h2 id="brain-title" className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                    The Brain guides the Academy, but does not publish blindly.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-white/80">
                    Verified intelligence can tell the Academy when a lesson, sandbox task, tool
                    comparison, or business training route may need review. Public learning material
                    should still pass a review boundary before publication.
                  </p>
                </div>

                <div className="grid gap-4">
                  {brainSignals.map((signal, index) => (
                    <div key={signal.title} className="rounded-3xl bg-white p-5 text-sand shadow-sm">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex gap-4">
                          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-sm font-bold text-[#123BFF]">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <div>
                            <h3 className="text-lg font-bold text-sand">{signal.title}</h3>
                            <p className="mt-2 text-sm leading-7 text-sand/65">
                              {signal.description}
                            </p>
                          </div>
                        </div>
                        <span className="w-fit rounded-full bg-[#EAF7FF] px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                          {signal.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="levels" className="py-8" aria-labelledby="levels-title">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <GraduationCap className="h-4 w-4" aria-hidden="true" />
                  Skill levels
                </span>

                <h2 id="levels-title" className="mt-5 text-3xl font-bold tracking-tight text-sand">
                  Skill level is separate from customer type.
                </h2>

                <div className="mt-6 grid gap-4">
                  {skillLevels.map((level) => (
                    <div key={level.title} className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                      <h3 className="text-lg font-bold text-sand">{level.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-sand/65">{level.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {level.points.map((point) => (
                          <span key={point} className="rounded-full bg-[#EAF7FF] px-3 py-2 text-xs font-bold text-[#123BFF]">
                            {point}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
                  Business levels
                </span>

                <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand">
                  Business training needs role-aware structure.
                </h2>

                <div className="mt-6 grid gap-4">
                  {businessLevels.map((level) => (
                    <div key={level.title} className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                      <h3 className="text-lg font-bold text-sand">{level.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-sand/65">{level.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {level.points.map((point) => (
                          <span key={point} className="rounded-full bg-[#EAF7FF] px-3 py-2 text-xs font-bold text-[#123BFF]">
                            {point}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-8" aria-labelledby="access-title">
            <div className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <LockKeyhole className="h-4 w-4" aria-hidden="true" />
                  Access and membership
                </span>

                <h2 id="access-title" className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                  Built for free previews, individual learning, and business teams.
                </h2>

                <p className="mt-4 text-base leading-8 text-sand/65">
                  The public Academy should explain the system clearly. Full progress, saved sandbox
                  attempts, refresher alerts, and team reporting belong behind the right account and
                  entitlement boundaries.
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

          <section className="py-8" aria-labelledby="trust-title">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-stretch">
              <div className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  Trust boundary
                </span>

                <h2 id="trust-title" className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                  Catalogue data supports training, but reviewed lessons remain the public layer.
                </h2>

                <p className="mt-4 text-base leading-8 text-sand/65">
                  The catalogue can map companies, platforms, model families, models, capabilities,
                  and comparison groups. The Academy should use that structure to plan better
                  lessons, not to expose unreviewed intelligence as public advice.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-[#EAF7FF] p-4">
                    <p className="text-sm font-bold text-[#123BFF]">Source-aware</p>
                    <p className="mt-2 text-sm leading-6 text-sand/65">Training should trace back to verified intelligence.</p>
                  </div>
                  <div className="rounded-2xl bg-[#EAF7FF] p-4">
                    <p className="text-sm font-bold text-[#123BFF]">Review-first</p>
                    <p className="mt-2 text-sm leading-6 text-sand/65">Brain outputs should not publish blindly.</p>
                  </div>
                  <div className="rounded-2xl bg-[#EAF7FF] p-4">
                    <p className="text-sm font-bold text-[#123BFF]">Practice-led</p>
                    <p className="mt-2 text-sm leading-6 text-sand/65">Useful lessons should lead to practical tasks.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF] shadow-sm">
                  <Route className="h-7 w-7" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-2xl font-bold tracking-tight text-sand">
                  The Sandbox is where learning becomes measurable.
                </h3>
                <p className="mt-4 text-sm leading-7 text-sand/65">
                  Lessons should point to tasks whenever useful: prompt rewrites, output checks,
                  tool comparisons, workflow maps, RAG quality reviews, and business safety
                  scenarios.
                </p>
                <Link
                  href="/sandbox"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                >
                  Explore sandbox
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>

          <section className="py-8">
            <div className="rounded-[2rem] border border-sand/10 bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Start with the map
                  </span>

                  <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                    Follow the syllabus, try the sandbox, then move into role-based AI training.
                  </h2>

                  <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 sm:text-base">
                    The Academy page is the front door. The syllabus shows the learning map. The
                    sandbox turns the map into practice. Business training turns practice into team
                    capability.
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
                    href="/auth/signup"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-white/20"
                  >
                    Create workspace
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
