import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpenCheck, BriefcaseBusiness, Code2 } from 'lucide-react'
import { Sidebar } from '@/components/platform/sidebar'
import { HeroSection } from '@/components/platform/hero-section'
import { LearningPath } from '@/components/platform/learning-path'
import { LiveFeed } from '@/components/platform/live-feed'
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
    status: 'locked',
    category: 'Advanced',
  },
  {
    id: '6',
    title: 'Multi-Agent Orchestration',
    description: 'Design and coordinate systems of multiple specialized AI agents.',
    duration: '3h 00min',
    status: 'locked',
    category: 'Expert',
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

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="relative z-10 min-h-screen pt-16 md:pl-64 md:pt-0">
        <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
          {/* Hero Section */}
          <HeroSection />

          {/* Business CTA */}
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

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 lg:mt-12">
            {/* Learning Path - Takes 1 column */}
            <div className="lg:col-span-1">
              <LearningPath />
            </div>

            {/* Live Feed - Takes 2 columns */}
            <div className="lg:col-span-2">
              <LiveFeed />
            </div>
          </div>

          {/* Featured Modules Section */}
          <section id="learning" className="mt-10 lg:mt-12">
            <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
                  Academy Modules
                </span>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-sand">
                  Continue Learning
                </h2>
                <p className="text-sand/55 mt-2">
                  Pick up where you left off or start a new module
                </p>
              </div>
              <button className="w-fit rounded-2xl border border-sand/10 bg-white px-4 py-2 text-sm font-bold text-signal-green shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#0A63FF]">
                View All Modules
              </button>
            </div>
            <ContentCardGrid modules={featuredModules} />
          </section>

          {/* Code Sandbox Section */}
          <section id="sandbox" className="mt-10 lg:mt-12">
            <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <Code2 className="h-4 w-4" aria-hidden="true" />
                  Live Sandbox
                </span>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-sand">
                  Agentic Sandbox
                </h2>
                <p className="text-sand/55 mt-2">
                  Practice building AI agents in a live environment
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#123BFF] text-white text-sm font-bold shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  Live
                </span>
              </div>
            </div>
            <CodeSandbox />
          </section>

          {/* Footer */}
          <footer className="mt-12 pb-8 border-t border-sand/10 pt-8 lg:mt-16">
            <div className="glass-card rounded-2xl border border-sand/10 bg-white/80 p-6 shadow-sm sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
                <div className="flex justify-center lg:justify-start">
                  <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sand/10 sm:h-32 sm:w-32">
                    <Image
                      src="/brand/deepmind-resources-logo.png"
                      alt="DeepMind Resources logo"
                      fill
                      sizes="128px"
                      className="object-contain p-2"
                      priority={false}
                    />
                  </div>
                </div>

                <div className="text-center lg:text-left">
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-signal-green">
                    Verified AI learning intelligence
                  </p>
                  <h2 className="mt-3 text-2xl font-bold tracking-tight text-sand">
                    DeepMind Resources
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-sand/60 sm:text-base">
                    A living AI training and tool-intelligence platform that turns verified AI
                    updates into practical lessons, sandbox tasks, and business-ready learning
                    paths.
                  </p>

                  <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
                    <span className="rounded-full bg-signal-green/10 px-3 py-1 text-xs font-medium text-signal-green">
                      Live AI Intelligence
                    </span>
                    <span className="rounded-full bg-signal-green/10 px-3 py-1 text-xs font-medium text-signal-green">
                      Agentic Sandbox
                    </span>
                    <Link
                      href="/business-ai-training"
                      className="rounded-full bg-signal-green/10 px-3 py-1 text-xs font-medium text-signal-green transition hover:bg-signal-green hover:text-white"
                    >
                      Business AI Training
                    </Link>
                  </div>
                </div>

                <div className="grid gap-3 text-center text-sm sm:grid-cols-3 lg:grid-cols-1 lg:text-right">
                  <a href="#learning" className="text-sand/50 hover:text-signal-green transition-colors">
                    Academy
                  </a>
                  <a href="#sandbox" className="text-sand/50 hover:text-signal-green transition-colors">
                    Sandbox
                  </a>
                  <Link
                    href="/business-ai-training"
                    className="text-sand/50 hover:text-signal-green transition-colors"
                  >
                    Business Training
                  </Link>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 border-t border-sand/10 pt-5 text-center text-xs text-sand/40 sm:flex-row sm:items-center sm:justify-between sm:text-left">
                <p>© 2026 DeepMind Resources. Built for verified AI skill gain.</p>
                <p>AI update → verified meaning → practical lesson → sandbox task.</p>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}