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
    <div className="min-h-screen bg-obsidian">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="min-h-screen pt-16 md:pl-64 md:pt-0">
        <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
          {/* Hero Section */}
          <HeroSection />

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
          <section className="mt-10 lg:mt-12">
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-sand">Continue Learning</h2>
                <p className="text-sand/50 mt-1">
                  Pick up where you left off or start a new module
                </p>
              </div>
              <button className="w-fit text-sm text-signal-green hover:text-signal-green/80 font-medium transition-colors">
                View All Modules
              </button>
            </div>
            <ContentCardGrid modules={featuredModules} />
          </section>

          {/* Code Sandbox Section */}
          <section className="mt-10 lg:mt-12">
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-sand">Agentic Sandbox</h2>
                <p className="text-sand/50 mt-1">
                  Practice building AI agents in a live environment
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-signal-green/10 text-signal-green text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-signal-green animate-pulse" />
                  Live
                </span>
              </div>
            </div>
            <CodeSandbox />
          </section>

          {/* Footer */}
          <footer className="mt-12 pb-8 border-t border-sand/10 pt-8 lg:mt-16">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center justify-center gap-2 text-sand/40 text-sm sm:justify-start">
                <span>DeepMindResources</span>
                <span className="text-sand/20">|</span>
                <span>AI Technical Training Platform</span>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <a href="#" className="text-sand/40 hover:text-signal-green transition-colors">
                  Documentation
                </a>
                <a href="#" className="text-sand/40 hover:text-signal-green transition-colors">
                  Support
                </a>
                <a href="#" className="text-sand/40 hover:text-signal-green transition-colors">
                  Privacy
                </a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}
