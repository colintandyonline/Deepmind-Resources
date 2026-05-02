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
  Code2,
  Compass,
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
import { Sidebar } from '@/components/platform/sidebar'

export const metadata: Metadata = {
  title: 'AI Academy | DeepMind Resources',
  description:
    'DeepMind Resources Academy provides structured AI learning pathways, guided sandbox practice, tool-selection training, and business-ready AI skills that stay current as AI changes.',
  alternates: {
    canonical: '/academy',
  },
  keywords: [
    'AI Academy',
    'AI training',
    'AI learning paths',
    'prompt engineering training',
    'AI tool selection',
    'business AI training',
    'AI sandbox practice',
    'AI agents training',
    'RAG training',
    'professional AI training',
  ],
  openGraph: {
    title: 'AI Academy | DeepMind Resources',
    description:
      'Professional AI learning pathways, guided sandbox practice, tool intelligence, and business-ready training for individuals, builders, and teams.',
    url: 'https://deepmindresources.pro/academy',
    siteName: 'DeepMind Resources',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'AI Academy | DeepMind Resources',
    description:
      'Build practical AI skills through structured learning pathways, guided sandbox practice, tool intelligence, and business-ready training.',
  },
}

type LearningTrack = {
  title: string
  label: string
  description: string
  icon: LucideIcon
  outcomes: string[]
}

type PathwayStep = {
  title: string
  description: string
  icon: LucideIcon
}

type CurriculumArea = {
  title: string
  level: string
  description: string
}

type AudienceCard = {
  title: string
  description: string
  icon: LucideIcon
}

type MembershipTier = {
  title: string
  label: string
  description: string
  features: string[]
}

type FaqItem = {
  question: string
  answer: string
}

const learningTracks: LearningTrack[] = [
  {
    title: 'AI Fundamentals',
    label: 'Beginner',
    description:
      'Build a confident foundation in how AI tools work, where they fail, and how to use them safely in real tasks.',
    icon: BrainCircuit,
    outcomes: ['Understand core AI concepts', 'Recognise weak outputs', 'Use AI tools safely'],
  },
  {
    title: 'Prompt Engineering',
    label: 'Core skill',
    description:
      'Learn how to turn vague requests into clear instructions with context, constraints, examples, formats, and review rules.',
    icon: Sparkles,
    outcomes: ['Write stronger prompts', 'Control output quality', 'Create reusable prompt patterns'],
  },
  {
    title: 'AI Tool Selection',
    label: 'Decision skill',
    description:
      'Compare AI tools by use case, skill level, workflow fit, privacy needs, cost, and practical business value.',
    icon: Radar,
    outcomes: ['Choose tools by scenario', 'Avoid hype-led decisions', 'Build tool scorecards'],
  },
  {
    title: 'AI for Business Productivity',
    label: 'Business',
    description:
      'Train teams to apply AI to meetings, documents, research, support, operations, and everyday business workflows.',
    icon: BriefcaseBusiness,
    outcomes: ['Map workplace tasks', 'Improve team workflows', 'Apply safe-use habits'],
  },
  {
    title: 'AI Agents and Workflows',
    label: 'Builder',
    description:
      'Move beyond single prompts into tool calling, RAG, workflow design, agent boundaries, review gates, and automation patterns.',
    icon: Workflow,
    outcomes: ['Design safer agents', 'Understand workflow stages', 'Add human review points'],
  },
  {
    title: 'AI Safety and Validation',
    label: 'Trust',
    description:
      'Learn how to check AI answers, validate claims, spot hallucinations, protect sensitive data, and review outputs before use.',
    icon: ShieldCheck,
    outcomes: ['Validate AI output', 'Spot unsupported claims', 'Reduce business risk'],
  },
]

const pathwaySteps: PathwayStep[] = [
  {
    title: 'Learn the concept',
    description:
      'Each pathway starts with clear explanations, practical examples, and the vocabulary needed to work confidently with AI.',
    icon: BookOpenCheck,
  },
  {
    title: 'Apply it to a real scenario',
    description:
      'Lessons move quickly from theory into workplace, builder, research, content, automation, and tool-selection scenarios.',
    icon: Target,
  },
  {
    title: 'Practise in the sandbox',
    description:
      'Guided tasks help users improve prompts, map workflows, compare tools, check AI answers, and build safer processes.',
    icon: Route,
  },
  {
    title: 'Build measurable skill',
    description:
      'Progress should be based on practical evidence: completed tasks, better outputs, stronger judgement, and safer decisions.',
    icon: BadgeCheck,
  },
]

const curriculumAreas: CurriculumArea[] = [
  {
    title: 'AI Fundamentals',
    level: 'Beginner',
    description:
      'Understand what AI is, how modern AI tools work, and how to avoid common mistakes before using AI seriously.',
  },
  {
    title: 'Prompt Engineering',
    level: 'Beginner to intermediate',
    description:
      'Learn the structure of effective prompts and how to improve weak requests into reliable working instructions.',
  },
  {
    title: 'AI Tool Selection',
    level: 'Intermediate',
    description:
      'Compare assistants, research tools, coding tools, automation tools, and business platforms by practical use case.',
  },
  {
    title: 'Business AI Productivity',
    level: 'Business',
    description:
      'Apply AI to staff workflows, customer communication, meetings, research, documentation, and team processes.',
  },
  {
    title: 'Tool Calling and Functions',
    level: 'Builder',
    description:
      'Understand how AI systems connect to tools, structured data, function calls, and controlled actions.',
  },
  {
    title: 'RAG and Knowledge Systems',
    level: 'Builder',
    description:
      'Learn how retrieval, documents, sources, and knowledge bases improve AI answers for real information workflows.',
  },
  {
    title: 'AI Agents',
    level: 'Intermediate to advanced',
    description:
      'Design bounded agent workflows with clear goals, tool permissions, review points, and failure controls.',
  },
  {
    title: 'AI Safety and Validation',
    level: 'All levels',
    description:
      'Check claims, inspect outputs, reduce hallucination risk, and understand when human review is required.',
  },
]

const audiences: AudienceCard[] = [
  {
    title: 'Individual learners',
    description:
      'Build practical confidence with a clear pathway from AI basics to useful workflows, stronger prompts, and better tool decisions.',
    icon: GraduationCap,
  },
  {
    title: 'Builders and operators',
    description:
      'Move into RAG, agents, tool calling, workflow design, validation, and AI systems that need structure and judgement.',
    icon: Code2,
  },
  {
    title: 'Business teams',
    description:
      'Train staff, managers, and teams to apply AI safely, avoid wasted tool spend, and improve real workplace processes.',
    icon: UsersRound,
  },
]

const membershipTiers: MembershipTier[] = [
  {
    title: 'Free Preview',
    label: 'Explore',
    description:
      'For visitors who want to understand the Academy structure, preview the syllabus, and try public sandbox examples.',
    features: ['Academy overview', 'Syllabus preview', 'Public sandbox demo'],
  },
  {
    title: 'Individual Academy',
    label: 'Learn',
    description:
      'For learners who want structured paths, deeper lessons, sandbox practice, progress tracking, and practical AI skill development.',
    features: ['Full learning paths', 'Guided sandbox practice', 'Personal progress tracking'],
  },
  {
    title: 'Business Team',
    label: 'Train',
    description:
      'For organisations that need staff training, role-based pathways, safe-use practice, and team readiness visibility.',
    features: ['Team learning paths', 'Staff assignments', 'Business workflow practice'],
  },
  {
    title: 'Enterprise Training',
    label: 'Scale',
    description:
      'For larger teams that need custom training routes, onboarding support, governance alignment, and advanced reporting.',
    features: ['Custom role pathways', 'Private onboarding', 'Advanced training support'],
  },
]

const faqItems: FaqItem[] = [
  {
    question: 'Is the Academy for beginners or advanced users?',
    answer:
      'Both. The Academy starts with practical AI foundations, then moves into prompting, tool selection, business workflows, RAG, agents, validation, and advanced builder topics.',
  },
  {
    question: 'How is this different from a normal AI course site?',
    answer:
      'DeepMind Resources is designed around structured pathways, current tool intelligence, and sandbox practice. The goal is not passive watching; it is practical AI competency.',
  },
  {
    question: 'Does the Academy include business training?',
    answer:
      'Yes. Business pathways are designed for staff, managers, and teams that need safe AI use, workflow training, tool-selection judgement, and practical adoption support.',
  },
  {
    question: 'What role does the sandbox play?',
    answer:
      'The sandbox turns learning into practice. Users can work through guided examples, improve prompts, map workflows, compare tools, and learn how to validate AI output safely.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'AI Academy | DeepMind Resources',
  description:
    'Professional AI learning pathways, guided sandbox practice, tool intelligence, and business-ready training for individuals, builders, and teams.',
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
    <div className="relative min-h-screen overflow-hidden bg-obsidian text-sand">
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

      <Sidebar />

      <main className="relative z-10 min-h-screen pt-16 md:pl-64 md:pt-0">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <section className="relative overflow-hidden rounded-[2rem] border border-sand/10 bg-white/90 px-5 py-12 shadow-sm backdrop-blur sm:px-8 lg:px-12 lg:py-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(18,59,255,0.10),transparent_32rem)]" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <GraduationCap className="h-4 w-4" aria-hidden="true" />
                  DeepMind Resources Academy
                </span>

                <h1 className="mt-6 max-w-5xl text-4xl font-bold tracking-tight text-sand sm:text-5xl lg:text-6xl">
                  Professional AI training for people who need practical skill, not theory overload.
                </h1>

                <p className="mt-6 max-w-3xl text-base leading-8 text-sand/70 sm:text-lg">
                  Follow structured learning pathways, practise inside guided sandbox tasks, compare
                  tools by real use case, and build the judgement needed to use AI safely in modern
                  work.
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
                    Try the sandbox
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

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {['Structured pathways', 'Guided practice', 'Business-ready skills'].map((item) => (
                    <div key={item} className="rounded-2xl border border-sand/10 bg-white p-4 shadow-sm">
                      <CheckCircle2 className="h-5 w-5 text-[#123BFF]" aria-hidden="true" />
                      <p className="mt-3 text-sm font-bold text-sand">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-sand/10 bg-[#EAF7FF] p-5 shadow-sm sm:p-6">
                <div className="rounded-[1.5rem] bg-[#123BFF] p-6 text-white shadow-sm">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#123BFF] shadow-sm">
                    <Compass className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-white/75">
                    Academy pathway
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight">
                    A clear route from AI basics to confident workplace application.
                  </h2>

                  <div className="mt-6 grid gap-3">
                    {[
                      'Start with AI foundations and safe-use habits',
                      'Build stronger prompts and repeatable workflows',
                      'Choose tools by scenario, not popularity',
                      'Practise inside guided sandbox tasks',
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/10 p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" aria-hidden="true" />
                        <p className="text-sm font-semibold leading-6 text-white/90">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-[1.5rem] bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                      <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-sand">Designed for skill evidence</h3>
                      <p className="mt-2 text-sm leading-7 text-sand/65">
                        The Academy is built around learning that leads to action: better prompts,
                        safer workflows, stronger validation, and clearer tool decisions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8 grid gap-5 md:grid-cols-3 lg:mt-12" aria-label="Academy audiences">
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
          </section>

          <section id="tracks" className="mt-10 lg:mt-14" aria-labelledby="tracks-title">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <Layers3 className="h-4 w-4" aria-hidden="true" />
                  Learning pathways
                </span>
                <h2 id="tracks-title" className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                  Choose the AI skills that match your role, goals, and workflow.
                </h2>
              </div>

              <Link
                href="/syllabus"
                className="inline-flex w-fit items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-5 py-3 text-sm font-bold text-[#123BFF] shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#0A63FF]"
              >
                Explore full syllabus
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
                          {track.label}
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

          <section className="mt-10 lg:mt-14" aria-labelledby="method-title">
            <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                    <Route className="h-4 w-4" aria-hidden="true" />
                    How learning works
                  </span>

                  <h2 id="method-title" className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                    Learn the concept. Practise the workflow. Build the skill.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-sand/65">
                    The Academy is designed to move users from understanding to application. Each
                    pathway is shaped around practical outcomes, not passive content consumption.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {pathwaySteps.map((step, index) => {
                    const Icon = step.icon

                    return (
                      <article key={step.title} className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                        <div className="flex items-start gap-4">
                          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-sm font-bold text-[#123BFF]">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <div>
                            <Icon className="h-5 w-5 text-[#123BFF]" aria-hidden="true" />
                            <h3 className="mt-3 text-lg font-bold text-sand">{step.title}</h3>
                            <p className="mt-2 text-sm leading-7 text-sand/65">{step.description}</p>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="mt-10 lg:mt-14" aria-labelledby="curriculum-title">
            <div className="rounded-[2rem] border border-sand/10 bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                    <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
                    Curriculum preview
                  </span>

                  <h2 id="curriculum-title" className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                    A practical AI curriculum for modern work.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-white/80">
                    The Academy brings together essential AI skills, tool-selection judgement,
                    workflow training, and safe-use habits across individual, builder, and business
                    learning routes.
                  </p>

                  <Link
                    href="/syllabus"
                    className="mt-7 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-[#123BFF] shadow-sm transition hover:bg-[#EAF7FF]"
                  >
                    View syllabus
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {curriculumAreas.map((area) => (
                    <article key={area.title} className="rounded-3xl bg-white p-5 text-sand shadow-sm">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                        {area.level}
                      </p>
                      <h3 className="mt-3 text-lg font-bold text-sand">{area.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-sand/65">{area.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-[1fr_0.9fr]" aria-labelledby="business-title">
            <div className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
                Business AI training
              </span>

              <h2 id="business-title" className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                Train your team to use AI safely, consistently, and with a clear business purpose.
              </h2>

              <p className="mt-4 text-base leading-8 text-sand/65">
                Business training helps staff and managers understand where AI helps, where it
                creates risk, how to choose tools, and how to turn everyday work into safer
                AI-assisted workflows.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  'Staff AI onboarding',
                  'Prompting for workplace tasks',
                  'Tool selection for teams',
                  'Workflow mapping and review',
                  'Safe-use and privacy habits',
                  'Manager readiness reporting',
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
                Built for safe practice before real workplace use.
              </h3>

              <p className="mt-4 text-sm leading-7 text-sand/65">
                The Academy and Sandbox should encourage realistic practice using safe examples,
                clear review steps, and privacy-aware workflows before users apply AI to live
                business material.
              </p>

              <Link
                href="/business-ai-training"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
              >
                Explore business training
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </section>

          <section className="mt-10 lg:mt-14" aria-labelledby="membership-title">
            <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <UsersRound className="h-4 w-4" aria-hidden="true" />
                  Academy access
                </span>

                <h2 id="membership-title" className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                  Start with a preview, then move into deeper learning or team training.
                </h2>

                <p className="mt-4 text-base leading-8 text-sand/65">
                  DeepMind Resources is structured for free exploration, individual skill building,
                  business team training, and future enterprise learning routes.
                </p>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {membershipTiers.map((tier) => (
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

          <section className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-[0.95fr_1.05fr]" aria-labelledby="sandbox-title">
            <div className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <Code2 className="h-4 w-4" aria-hidden="true" />
                Guided sandbox practice
              </span>

              <h2 id="sandbox-title" className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                Practise AI workflows before relying on them.
              </h2>

              <p className="mt-4 text-base leading-8 text-sand/65">
                Sandbox tasks are where learners apply the Academy: improving weak prompts, mapping
                AI-assisted workflows, checking outputs, comparing tools, and designing safer review
                steps.
              </p>

              <Link
                href="/sandbox"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
              >
                Try sandbox
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Professional standard
              </span>

              <h3 className="mt-5 text-3xl font-bold tracking-tight text-sand">
                Learn with structure, context, and practical judgement.
              </h3>

              <p className="mt-4 text-base leading-8 text-sand/65">
                The Academy is designed to help users understand AI clearly, use it responsibly,
                select tools carefully, and build skills that hold up in real work.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  'Clear learning outcomes for each pathway',
                  'Practical examples instead of empty theory',
                  'Sandbox tasks connected to real skills',
                  'Business-safe guidance for workplace AI use',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-[#EAF7FF] p-4">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#123BFF]" aria-hidden="true" />
                    <p className="text-sm font-semibold leading-6 text-sand/75">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-10 lg:mt-14" aria-labelledby="faq-title">
            <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
                  Academy questions
                </span>

                <h2 id="faq-title" className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                  What learners and teams need to know.
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

          <section className="mt-10 lg:mt-14">
            <div className="rounded-[2rem] border border-sand/10 bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Start learning
                  </span>

                  <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                    Start with the syllabus, then practise inside the sandbox.
                  </h2>

                  <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 sm:text-base">
                    Choose a pathway, understand the skill, practise it safely, and build the
                    judgement needed for real AI work.
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
      </main>
    </div>
  )
}