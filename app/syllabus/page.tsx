import type { Metadata } from 'next'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  Database,
  GitCompareArrows,
  GraduationCap,
  Layers3,
  Lightbulb,
  Radar,
  Route,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
  WandSparkles,
  Workflow,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Syllabus | DeepMind Resources',
  description:
    'Explore the DeepMind Resources AI syllabus: practical learning paths for AI foundations, prompting, tool intelligence, agents, sandbox practice, business productivity, RAG, workflow automation, and AI safety.',
  alternates: {
    canonical: '/syllabus',
  },
  keywords: [
    'AI syllabus',
    'AI learning path',
    'AI training syllabus',
    'prompt engineering syllabus',
    'AI agents training',
    'business AI training syllabus',
    'AI sandbox practice',
    'AI tool intelligence',
    'professional AI training',
    'AI business productivity',
    'RAG training',
    'AI workflow automation',
    'AI safety training',
    'AI tool comparison',
  ],
  openGraph: {
    title: 'AI Syllabus | DeepMind Resources',
    description:
      'A practical AI syllabus for learning foundations, prompts, tool intelligence, agents, workflows, sandbox tasks, business productivity, RAG, and AI safety.',
    url: 'https://deepmindresources.pro/syllabus',
    siteName: 'DeepMind Resources',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'AI Syllabus | DeepMind Resources',
    description:
      'Explore practical AI learning paths for foundations, prompts, agents, sandbox practice, tool intelligence, business productivity, and AI safety.',
  },
}

type SyllabusTrack = {
  label: string
  title: string
  description: string
  icon: LucideIcon
  outcomes: string[]
}

type ModuleGroup = {
  title: string
  description: string
  icon: LucideIcon
  modules: string[]
}

type CapabilityArea = {
  title: string
  description: string
  icon: LucideIcon
  capabilities: string[]
}

type LearningStep = {
  step: string
  title: string
  description: string
}

type PathwayMilestone = {
  title: string
  subtitle: string
  label: string
  icon: LucideIcon
}

type OversightStage = {
  title: string
  description: string
  label: string
}

type RefreshStage = {
  title: string
  description: string
  label: string
}

const syllabusTracks: SyllabusTrack[] = [
  {
    label: 'Foundations',
    title: 'AI Fundamentals',
    description:
      'Build the language, confidence, and judgement needed to understand what modern AI tools can and cannot do.',
    icon: BrainCircuit,
    outcomes: [
      'Understand core AI concepts in plain English',
      'Recognise useful AI tasks and poor-fit use cases',
      'Learn how models respond to instructions and context',
      'Build safer habits for checking AI outputs',
    ],
  },
  {
    label: 'Prompting',
    title: 'Prompt Engineering',
    description:
      'Learn how to give clearer instructions, improve outputs, structure tasks, and review responses before using them.',
    icon: WandSparkles,
    outcomes: [
      'Write better prompts for practical work',
      'Use context, constraints, examples, and review steps',
      'Improve weak responses through iteration',
      'Create reusable prompting patterns',
    ],
  },
  {
    label: 'Tools',
    title: 'Tool Intelligence',
    description:
      'Understand which AI tools fit different workflows, what changes matter, and how to choose tools more intelligently.',
    icon: Radar,
    outcomes: [
      'Compare tools by real-world usefulness',
      'Understand feature changes and workflow impact',
      'Avoid tool overload and unclear adoption',
      'Connect tool choice to practical outcomes',
    ],
  },
  {
    label: 'Agents',
    title: 'Agentic AI Systems',
    description:
      'Move from simple prompts into tool-using systems, workflow design, retrieval, memory, and agent-style task planning.',
    icon: Route,
    outcomes: [
      'Understand what makes a system agentic',
      'Plan tool use, memory, and workflow steps',
      'Learn where automation needs human review',
      'Practise agent design in sandbox tasks',
    ],
  },
]

const moduleGroups: ModuleGroup[] = [
  {
    title: 'Beginner pathway',
    description:
      'For learners who want a clear, practical foundation before using AI in important work.',
    icon: GraduationCap,
    modules: [
      'Introduction to modern AI',
      'How large language models respond',
      'Prompting basics',
      'Checking accuracy and usefulness',
      'Using AI for research and summaries',
    ],
  },
  {
    title: 'Practical workflow pathway',
    description:
      'For people who want to use AI in daily tasks such as writing, planning, research, operations, and support.',
    icon: ClipboardCheck,
    modules: [
      'Prompt patterns for work',
      'AI-assisted writing and editing',
      'Research workflows',
      'Task planning and decision support',
      'Review loops and quality control',
    ],
  },
  {
    title: 'Builder pathway',
    description:
      'For learners who want to understand agents, tool use, retrieval, workflow automation, and AI system design.',
    icon: Code2,
    modules: [
      'Tool calling concepts',
      'Retrieval and knowledge workflows',
      'Memory and context management',
      'Single-agent task design',
      'Multi-step workflow orchestration',
    ],
  },
  {
    title: 'Business pathway',
    description:
      'For teams that need shared standards, safer adoption, workflow confidence, and role-aware AI training.',
    icon: BriefcaseBusiness,
    modules: [
      'Business AI foundations',
      'Team prompting standards',
      'Tool selection for departments',
      'Sandbox practice for workplace tasks',
      'Governance habits and responsible use',
    ],
  },
]

const capabilityAreas: CapabilityArea[] = [
  {
    title: 'AI Tool Selection',
    description:
      'Learn how to choose the right AI platform or tool for the job instead of chasing every new release or subscription.',
    icon: SearchCheck,
    capabilities: [
      'Coding and development use cases',
      'Research and knowledge work',
      'Writing, content, and communication',
      'Automation, support, and operations',
    ],
  },
  {
    title: 'Business Productivity',
    description:
      'Use AI across real workplace tasks, not just demos: admin, operations, planning, documentation, marketing, sales, and support.',
    icon: BriefcaseBusiness,
    capabilities: [
      'Admin and process improvement',
      'Marketing and content workflows',
      'Sales and customer response quality',
      'Meeting, reporting, and planning tasks',
    ],
  },
  {
    title: 'RAG & Knowledge Systems',
    description:
      'Understand how AI can work with internal knowledge, source-backed answers, retrieval workflows, and company documentation.',
    icon: Database,
    capabilities: [
      'Internal knowledge bases',
      'Document search and retrieval',
      'Source-backed answer patterns',
      'Onboarding and policy support',
    ],
  },
  {
    title: 'Agentic Workflows',
    description:
      'Move beyond one-off prompts into tool-connected workflows, approval loops, task chains, and practical automation patterns.',
    icon: Workflow,
    capabilities: [
      'Tool calling and functions',
      'Workflow simulations',
      'Human review and approval loops',
      'Business automation exercises',
    ],
  },
  {
    title: 'Data & Decision Support',
    description:
      'Use AI to support analysis, research, spreadsheet thinking, summaries, competitor review, scenarios, and management reporting.',
    icon: BarChart3,
    capabilities: [
      'Research and competitor analysis',
      'Spreadsheet and data assistance',
      'Scenario and planning support',
      'Executive summaries and reports',
    ],
  },
  {
    title: 'AI Safety & Validation',
    description:
      'Build practical habits for checking claims, controlling hallucinations, protecting sensitive data, and knowing what not to automate.',
    icon: ShieldCheck,
    capabilities: [
      'Hallucination control',
      'Source checking and review steps',
      'Privacy and sensitive data habits',
      'Risk-aware automation decisions',
    ],
  },
  {
    title: 'Live Release Intelligence',
    description:
      'Stay current as major AI models, tools, platforms, APIs, coding assistants, automation tools, and agent frameworks change.',
    icon: Radar,
    capabilities: [
      'New model and platform updates',
      'API and feature changes',
      'Tool deprecations and new tools',
      'Lesson and sandbox refreshes',
    ],
  },
  {
    title: 'Tool Comparison Intelligence',
    description:
      'Compare AI tools by real scenarios so learners and businesses understand what each tool is actually good for.',
    icon: GitCompareArrows,
    capabilities: [
      'Best tool for coding or research',
      'Best tool for business automation',
      'Best tool for internal knowledge',
      'Best tool for non-technical staff',
    ],
  },
]

const learningSteps: LearningStep[] = [
  {
    step: '01',
    title: 'Learn the concept',
    description:
      'Start with plain-English explanations that make AI ideas usable without drowning the learner in jargon.',
  },
  {
    step: '02',
    title: 'See where it applies',
    description:
      'Connect each lesson to real tasks such as research, drafting, planning, analysis, operations, or team workflows.',
  },
  {
    step: '03',
    title: 'Practise in the sandbox',
    description:
      'Use guided exercises to test prompts, review outputs, compare approaches, and build practical confidence.',
  },
  {
    step: '04',
    title: 'Refresh when AI changes',
    description:
      'Keep learning current as tools, models, features, risks, and practical recommendations evolve.',
  },
  {
    step: '05',
    title: 'Compare the best tools',
    description:
      'Understand which tools are strongest for coding, writing, automation, research, knowledge work, and business productivity.',
  },
  {
    step: '06',
    title: 'Build repeatable AI habits',
    description:
      'Turn individual lessons into dependable working habits that can be reused across personal work, teams, and real business tasks.',
  },
]

const pathwayMilestones: PathwayMilestone[] = [
  {
    title: 'AI Fundamentals',
    subtitle: 'Understand what modern AI can do and where human judgement still matters.',
    label: 'Core',
    icon: BrainCircuit,
  },
  {
    title: 'Prompt Engineering',
    subtitle: 'Give clearer instructions, improve weak outputs, and build reusable prompt patterns.',
    label: 'Core',
    icon: WandSparkles,
  },
  {
    title: 'Tool Intelligence',
    subtitle: 'Choose the right AI tools for coding, research, writing, automation, and knowledge work.',
    label: 'Tools',
    icon: Radar,
  },
  {
    title: 'Workflow Design',
    subtitle: 'Turn one-off AI use into repeatable processes with review and quality control.',
    label: 'Workflow',
    icon: Workflow,
  },
  {
    title: 'RAG & Knowledge Systems',
    subtitle: 'Use internal documents, retrieval patterns, and source-backed knowledge workflows.',
    label: 'Knowledge',
    icon: Database,
  },
  {
    title: 'Business Productivity',
    subtitle: 'Apply AI to admin, operations, marketing, sales, support, reporting, and planning.',
    label: 'Business',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Data & Decision Support',
    subtitle: 'Use AI for analysis, summaries, spreadsheets, competitor research, and decision support.',
    label: 'Analysis',
    icon: BarChart3,
  },
  {
    title: 'Agentic Systems',
    subtitle: 'Build practical understanding of tool calling, task chains, automation, and agent workflows.',
    label: 'Agents',
    icon: Route,
  },
]

const oversightStages: OversightStage[] = [
  {
    title: 'Track important AI changes',
    description:
      'DeepMind Resources monitors major model releases, tool launches, platform updates, API changes, automation tools, coding assistants, and agent frameworks.',
    label: 'Track',
  },
  {
    title: 'Check what the change means',
    description:
      'Updates are judged by practical impact: who should care, what workflow it affects, what skill it changes, and whether it is worth learning.',
    label: 'Check',
  },
  {
    title: 'Turn updates into lessons',
    description:
      'Important changes become clear explanations, tool comparisons, practical examples, and learning-path updates.',
    label: 'Teach',
  },
  {
    title: 'Create sandbox practice',
    description:
      'Learners practise the new capability through guided tasks, workflow simulations, prompt challenges, and tool-use exercises.',
    label: 'Practise',
  },
  {
    title: 'Apply it to business work',
    description:
      'The same intelligence becomes workplace guidance for productivity, support, marketing, operations, internal knowledge, and automation.',
    label: 'Apply',
  },
  {
    title: 'Keep the syllabus current',
    description:
      'The learning path keeps improving as tools change, weak recommendations become outdated, and better ways of working appear.',
    label: 'Refresh',
  },
]

const refreshStages: RefreshStage[] = [
  {
    title: 'AI release or tool change',
    description:
      'A major model, platform, tool, API, coding assistant, automation product, or agent framework changes.',
    label: 'Signal',
  },
  {
    title: 'Practical meaning',
    description:
      'The change is translated into clear guidance: what matters, what does not, who should care, and what work it affects.',
    label: 'Meaning',
  },
  {
    title: 'Updated learning',
    description:
      'Relevant modules are refreshed so learners are not working from stale lessons or old tool advice.',
    label: 'Lesson',
  },
  {
    title: 'Guided practice',
    description:
      'The change becomes a sandbox task, prompt exercise, comparison challenge, workflow simulation, or business scenario.',
    label: 'Practice',
  },
  {
    title: 'Workplace application',
    description:
      'Learners connect the update to real tasks such as research, documentation, support, sales, operations, reporting, or automation.',
    label: 'Apply',
  },
  {
    title: 'Better future recommendations',
    description:
      'Tool comparisons and training guidance improve as the platform learns which tools and workflows are strongest for each scenario.',
    label: 'Improve',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'DeepMind Resources AI Syllabus',
  description:
    'A practical AI syllabus covering AI foundations, prompt engineering, tool intelligence, agentic AI systems, sandbox practice, business productivity, RAG, workflow automation, tool comparison, and AI safety.',
  itemListElement: [...syllabusTracks, ...capabilityAreas].map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.title,
    description: item.description,
  })),
}

export default function SyllabusPage() {
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
              <a href="#modules" className="transition hover:text-[#123BFF]">
                Modules
              </a>
              <a href="#capabilities" className="transition hover:text-[#123BFF]">
                Capabilities
              </a>
              <Link href="/business-ai-training" className="transition hover:text-[#123BFF]">
                Business
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="hidden rounded-2xl border border-sand/10 bg-white px-4 py-2.5 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF] sm:inline-flex"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#123BFF] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
              >
                Start learning
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </nav>

          <section className="grid gap-8 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
                AI Syllabus
              </span>

              <h1 className="mt-6 max-w-5xl text-4xl font-bold tracking-tight text-sand sm:text-5xl lg:text-6xl">
                A practical AI syllabus for real-world capability, not chatbot demos.
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-sand/70 sm:text-lg">
                DeepMind Resources gives learners a structured path from AI foundations to prompt
                engineering, tool intelligence, sandbox practice, agentic systems, business
                productivity, RAG, automation, and AI safety.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                >
                  Start the syllabus
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/business-ai-training"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-6 py-4 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                >
                  Business AI training
                  <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  Foundations
                </span>
                <span className="rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  Prompting
                </span>
                <span className="rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  Tool Intelligence
                </span>
                <span className="rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  Automation
                </span>
              </div>
            </div>

            <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-5 shadow-sm sm:p-6 lg:p-8">
              <div className="rounded-[1.5rem] bg-[#EAF7FF] p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#123BFF] shadow-sm">
                    <Route className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                      Learning route
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-sand">
                      Learn the idea, practise the task, then apply it in the real world.
                    </h2>
                  </div>
                </div>

                <div className="mt-6 grid gap-4">
                  <div className="rounded-2xl border border-white bg-white/85 p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-1 h-5 w-5 shrink-0 text-[#123BFF]"
                        aria-hidden="true"
                      />
                      <p className="text-sm leading-7 text-sand/70">
                        Follow a clear sequence from beginner concepts to more advanced AI workflows.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white bg-white/85 p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-1 h-5 w-5 shrink-0 text-[#123BFF]"
                        aria-hidden="true"
                      />
                      <p className="text-sm leading-7 text-sand/70">
                        Practise prompts, checks, tool choices, RAG patterns, automation, and
                        workflow tasks.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white bg-white/85 p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-1 h-5 w-5 shrink-0 text-[#123BFF]"
                        aria-hidden="true"
                      />
                      <p className="text-sm leading-7 text-sand/70">
                        Refresh your learning when AI tools, models, releases, and recommended
                        practices change.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-sand/10 bg-white p-4 text-center shadow-sm">
                  <BookOpenCheck className="mx-auto h-6 w-6 text-[#123BFF]" aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold text-sand">Learn</p>
                </div>
                <div className="rounded-2xl border border-sand/10 bg-white p-4 text-center shadow-sm">
                  <Code2 className="mx-auto h-6 w-6 text-[#123BFF]" aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold text-sand">Practise</p>
                </div>
                <div className="rounded-2xl border border-sand/10 bg-white p-4 text-center shadow-sm">
                  <Target className="mx-auto h-6 w-6 text-[#123BFF]" aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold text-sand">Apply</p>
                </div>
              </div>
            </div>
          </section>

          <section id="tracks" className="pb-8" aria-labelledby="tracks-title">
            <div className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                    <Layers3 className="h-4 w-4" aria-hidden="true" />
                    Core tracks
                  </span>

                  <h2
                    id="tracks-title"
                    className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl"
                  >
                    The syllabus is organised around practical AI capability.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-sand/65">
                    Each track builds a useful layer of skill: understand AI clearly, prompt it
                    better, choose tools wisely, and practise workflows that matter.
                  </p>

                  <div className="mt-6 rounded-2xl bg-[#EAF7FF] p-5">
                    <div className="flex items-start gap-3">
                      <Lightbulb
                        className="mt-1 h-5 w-5 shrink-0 text-[#123BFF]"
                        aria-hidden="true"
                      />
                      <p className="text-sm leading-7 text-sand/70">
                        This syllabus is designed for practical skill gain. Lessons are most useful
                        when paired with sandbox tasks, review habits, and real workflow examples.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-[1.75rem] border border-sand/10 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                          Learning pathway overview
                        </p>
                        <h3 className="mt-2 text-xl font-bold text-sand">
                          Practical AI capability map
                        </h3>
                      </div>
                      <span className="rounded-2xl bg-[#EAF7FF] px-4 py-3 text-sm font-bold text-[#123BFF]">
                        8 stages
                      </span>
                    </div>

                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-sand/10">
                      <div className="h-full w-full rounded-full bg-[#123BFF]" />
                    </div>

                    <div className="mt-5 max-h-[30rem] overflow-y-auto pr-2">
                      <div className="space-y-4">
                        {pathwayMilestones.map((milestone, index) => {
                          const Icon = milestone.icon

                          return (
                            <div key={milestone.title} className="relative pl-16">
                              {index !== pathwayMilestones.length - 1 ? (
                                <span className="absolute left-[1.35rem] top-12 h-[calc(100%+0.75rem)] w-px bg-[#123BFF]/30" />
                              ) : null}

                              <span className="absolute left-0 top-0 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#123BFF]/20 bg-[#EAF7FF] text-[#123BFF]">
                                <Icon className="h-5 w-5" aria-hidden="true" />
                              </span>

                              <div className="rounded-3xl border border-sand/10 bg-white p-4 shadow-sm">
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h4 className="text-lg font-bold text-sand">
                                        {milestone.title}
                                      </h4>
                                      <CheckCircle2
                                        className="h-5 w-5 text-[#123BFF]"
                                        aria-hidden="true"
                                      />
                                    </div>

                                    <p className="mt-1 text-sm leading-6 text-sand/60">
                                      {milestone.subtitle}
                                    </p>
                                  </div>

                                  <span className="rounded-2xl bg-[#EAF7FF] px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#123BFF]">
                                    {milestone.label}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {syllabusTracks.map((track) => {
                    const Icon = track.icon

                    return (
                      <article
                        key={track.title}
                        className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                            <Icon className="h-6 w-6" aria-hidden="true" />
                          </span>

                          <span className="rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                            {track.label}
                          </span>
                        </div>

                        <h3 className="mt-5 text-xl font-bold text-sand">{track.title}</h3>

                        <p className="mt-3 text-sm leading-7 text-sand/65">
                          {track.description}
                        </p>

                        <ul className="mt-4 space-y-3 text-sm leading-7 text-sand/65">
                          {track.outcomes.map((outcome) => (
                            <li key={outcome} className="flex gap-3">
                              <CheckCircle2
                                className="mt-1 h-5 w-5 shrink-0 text-[#123BFF]"
                                aria-hidden="true"
                              />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </article>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          <section id="modules" className="py-8" aria-labelledby="modules-title">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
                Module groups
              </span>

              <h2
                id="modules-title"
                className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl"
              >
                Clear routes for learners, builders, and business teams.
              </h2>

              <p className="mt-4 text-base leading-8 text-sand/65">
                The syllabus can support individual learning, practical workplace use, technical
                exploration, and team training without forcing every learner down the same route.
              </p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-4">
              {moduleGroups.map((group) => {
                const Icon = group.icon

                return (
                  <article
                    key={group.title}
                    className="flex h-full flex-col rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm"
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>

                    <h3 className="mt-5 text-xl font-bold tracking-tight text-sand">
                      {group.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-sand/65">{group.description}</p>

                    <ul className="mt-5 space-y-3 text-sm leading-7 text-sand/65">
                      {group.modules.map((module) => (
                        <li key={module} className="flex gap-3">
                          <CheckCircle2
                            className="mt-1 h-5 w-5 shrink-0 text-[#123BFF]"
                            aria-hidden="true"
                          />
                          <span>{module}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                )
              })}
            </div>
          </section>

          <section id="capabilities" className="py-8" aria-labelledby="capabilities-title">
            <div className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Real-world AI capability
                  </span>

                  <h2
                    id="capabilities-title"
                    className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl"
                  >
                    This is not a chatbot course. It is practical AI capability for modern work.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-sand/65">
                    DeepMind Resources is designed to help people understand where AI actually
                    improves work: tool choice, business productivity, internal knowledge, workflow
                    automation, data support, safety, validation, and release-aware learning.
                  </p>

                  <div className="mt-6 rounded-2xl bg-[#EAF7FF] p-5">
                    <div className="flex items-start gap-3">
                      <Radar
                        className="mt-1 h-5 w-5 shrink-0 text-[#123BFF]"
                        aria-hidden="true"
                      />
                      <p className="text-sm leading-7 text-sand/70">
                        The goal is to turn important AI releases and platform changes into useful
                        lessons, sandbox tasks, tool comparisons, and business-ready training
                        insights.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-[1.75rem] border border-sand/10 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                          Release-to-learning workflow
                        </p>
                        <h3 className="mt-2 text-xl font-bold text-sand">
                          How AI updates become useful skill
                        </h3>
                      </div>
                      <span className="rounded-2xl bg-[#EAF7FF] px-4 py-3 text-sm font-bold text-[#123BFF]">
                        Active
                      </span>
                    </div>

                    <div className="mt-5 max-h-[34rem] overflow-y-auto pr-2">
                      <div className="space-y-4">
                        {oversightStages.map((stage, index) => (
                          <div
                            key={stage.title}
                            className="rounded-3xl border border-sand/10 bg-white p-4 shadow-sm"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-3">
                                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[#123BFF] text-sm font-bold text-white shadow-sm">
                                    {String(index + 1).padStart(2, '0')}
                                  </span>
                                  <h4 className="text-base font-bold text-sand">{stage.title}</h4>
                                </div>

                                <p className="mt-3 text-sm leading-7 text-sand/65">
                                  {stage.description}
                                </p>
                              </div>

                              <span className="rounded-full bg-[#EAF7FF] px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                                {stage.label}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {capabilityAreas.map((area) => {
                    const Icon = area.icon

                    return (
                      <article
                        key={area.title}
                        className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm"
                      >
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </span>

                        <h3 className="mt-5 text-xl font-bold text-sand">{area.title}</h3>

                        <p className="mt-3 text-sm leading-7 text-sand/65">
                          {area.description}
                        </p>

                        <ul className="mt-4 space-y-3 text-sm leading-7 text-sand/65">
                          {area.capabilities.map((capability) => (
                            <li key={capability} className="flex gap-3">
                              <CheckCircle2
                                className="mt-1 h-5 w-5 shrink-0 text-[#123BFF]"
                                aria-hidden="true"
                              />
                              <span>{capability}</span>
                            </li>
                          ))}
                        </ul>
                      </article>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="py-8" aria-labelledby="method-title">
            <div className="rounded-3xl border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Learning method
                  </span>

                  <h2
                    id="method-title"
                    className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl"
                  >
                    The syllabus is built around a repeatable learning loop.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-sand/65">
                    AI learning works best when learners understand the concept, connect it to real
                    work, practise it safely, and then refresh when the tools change.
                  </p>

                  <div className="mt-6 rounded-[1.75rem] border border-sand/10 bg-white p-5 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                      Live learning cycle
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-sand">
                      How training stays current
                    </h3>

                    <div className="mt-5 space-y-4">
                      {refreshStages.map((stage, index) => (
                        <div key={stage.title} className="relative pl-14">
                          {index !== refreshStages.length - 1 ? (
                            <span className="absolute left-[1rem] top-10 h-[calc(100%+0.5rem)] w-px bg-[#123BFF]/30" />
                          ) : null}

                          <span className="absolute left-0 top-0 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#123BFF] text-xs font-bold text-white shadow-sm">
                            {index + 1}
                          </span>

                          <div className="rounded-2xl border border-sand/10 bg-[#F9FCFF] p-4">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <h4 className="text-sm font-bold text-sand">{stage.title}</h4>
                              <span className="rounded-full bg-[#EAF7FF] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                                {stage.label}
                              </span>
                            </div>
                            <p className="mt-2 text-sm leading-6 text-sand/60">
                              {stage.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-2xl bg-[#EAF7FF] p-5">
                      <div className="flex items-start gap-3">
                        <Lightbulb
                          className="mt-1 h-5 w-5 shrink-0 text-[#123BFF]"
                          aria-hidden="true"
                        />
                        <p className="text-sm leading-7 text-sand/70">
                          This is what keeps DeepMind Resources live and relevant: updates are not
                          just noticed, they are turned into clearer lessons, better practice, and
                          stronger real-world recommendations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  {learningSteps.map((learningStep) => (
                    <article
                      key={learningStep.step}
                      className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm sm:p-6"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#123BFF] text-sm font-bold text-white shadow-sm">
                          {learningStep.step}
                        </span>

                        <div>
                          <h3 className="text-xl font-bold text-sand">{learningStep.title}</h3>
                          <p className="mt-2 text-sm leading-7 text-sand/65">
                            {learningStep.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-8" aria-labelledby="business-syllabus-title">
            <div className="overflow-hidden rounded-[2rem] border border-sand/10 bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                    <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
                    Business training route
                  </span>

                  <h2
                    id="business-syllabus-title"
                    className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl"
                  >
                    Use the syllabus to build shared AI capability across your team.
                  </h2>

                  <p className="mt-4 max-w-3xl text-base leading-8 text-white/80">
                    Business AI training turns the syllabus into a team-ready path with practical
                    workflows, sandbox tasks, tool intelligence, release-aware updates, and safer
                    adoption habits.
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

          <section className="py-8 pb-14" aria-labelledby="start-title">
            <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                    <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                    Start learning
                  </span>

                  <h2
                    id="start-title"
                    className="mt-5 max-w-3xl text-3xl font-bold tracking-tight text-sand sm:text-4xl"
                  >
                    Build AI skill with a syllabus designed for practical use.
                  </h2>

                  <p className="mt-4 max-w-3xl text-base leading-8 text-sand/65">
                    Start with structured lessons, then move into sandbox practice, workflow
                    thinking, tool intelligence, release awareness, and business-ready AI habits.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                  >
                    Create account
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>

                  <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-2xl border border-sand/10 bg-white px-6 py-4 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                  >
                    Return home
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