import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Compass, FileText, ShieldCheck, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'HTML Sitemap | DeepMind Resources',
  description:
    'Explore public DeepMind Resources pages, including Academy pathways, the Agentic Sandbox, business AI training, platform pages, and trust information.',
  alternates: {
    canonical: '/sitemap',
  },
  openGraph: {
    title: 'HTML Sitemap | DeepMind Resources',
    description:
      'A human-readable map of public DeepMind Resources pages for visitors, search engines, and AI search systems.',
    url: 'https://deepmindresources.pro/sitemap',
    siteName: 'DeepMind Resources',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'HTML Sitemap | DeepMind Resources',
    description:
      'A human-readable map of public DeepMind Resources pages for visitors, search engines, and AI search systems.',
  },
}

const sitemapGroups = [
  {
    name: 'Core platform',
    icon: Compass,
    pages: [
      {
        title: 'Home',
        path: '/',
        description:
          'The DeepMind Resources homepage for mastering agentic AI systems, sandbox practice, verified guidance, and business-ready learning paths.',
      },
      {
        title: 'Platform',
        path: '/platform',
        description:
          'Explore the structured AI learning platform, tool intelligence, verified sandbox tasks, and release-aware training layer.',
      },
      {
        title: 'Academy',
        path: '/academy',
        description:
          'Deterministic AI learning paths with verified guidance, source-aware training, sandbox tasks, and production-ready AI skills.',
      },
      {
        title: 'Syllabus',
        path: '/syllabus',
        description:
          'A public map of DeepMind Resources learning paths, AI competency areas, modules, and version-aware training structure.',
      },
    ],
  },
  {
    name: 'Learning pathways',
    icon: Sparkles,
    pages: [
      {
        title: 'AI Fundamentals',
        path: '/path/fundamentals',
        description:
          'Build practical AI foundations with safe-use habits, prompt basics, tool judgement, and verified sandbox practice.',
      },
      {
        title: 'Prompt Engineering',
        path: '/path/prompting',
        description:
          'Learn structured prompt systems, context, constraints, output validation, workflow control, and reusable prompt patterns.',
      },
      {
        title: 'Agent Architecture',
        path: '/path/agents',
        description:
          'Learn bounded AI agent architecture with goals, tools, permissions, memory rules, review gates, and practical deployment thinking.',
      },
      {
        title: 'Multi-Agent Systems',
        path: '/path/multi-agent-systems',
        description:
          'Learn specialist agent roles, handoffs, shared state, validation layers, escalation logic, and reviewable multi-agent workflows.',
      },
    ],
  },
  {
    name: 'Sandbox and business training',
    icon: FileText,
    pages: [
      {
        title: 'Agentic Sandbox',
        path: '/sandbox',
        description:
          'Practise prompt workflows, RAG exercises, tool-calling tasks, agent design, validation drills, and sandbox-based AI skill development.',
      },
      {
        title: 'Business AI Training',
        path: '/business-ai-training',
        description:
          'Business-ready AI training for staff onboarding, workforce capability, role-based workflow practice, privacy-aware adoption, and team readiness.',
      },
    ],
  },
  {
    name: 'Trust and company pages',
    icon: ShieldCheck,
    pages: [
      {
        title: 'Contact',
        path: '/contact',
        description:
          'Contact DeepMind Resources for business onboarding, platform questions, support, and professional AI training enquiries.',
      },
      {
        title: 'Privacy',
        path: '/privacy',
        description:
          'Privacy information for individuals and businesses evaluating DeepMind Resources as an independent AI training platform.',
      },
      {
        title: 'Terms',
        path: '/terms',
        description:
          'Terms information for visitors, users, and future members of the DeepMind Resources platform.',
      },
      {
        title: 'XML Sitemap',
        path: '/sitemap.xml',
        description:
          'Machine-readable XML sitemap for Google Search Console and other search engines.',
      },
    ],
  },
]

export default function HtmlSitemapPage() {
  return (
    <main className="min-h-screen bg-[#F4FBFF] px-4 py-6 text-sand sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <section className="overflow-hidden rounded-[1.5rem] border border-sand/10 bg-white shadow-sm sm:rounded-[2rem]">
          <div className="bg-[#123BFF] px-5 py-8 text-white sm:px-8 lg:px-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
              <Compass className="h-4 w-4" aria-hidden="true" />
              Public Sitemap
            </span>

            <div className="mt-6 max-w-4xl">
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                DeepMind Resources public sitemap.
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-white/82 sm:text-lg">
                A human-readable map of the public DeepMind Resources site: Academy pathways,
                Agentic Sandbox pages, platform guidance, business AI training, and trust pages.
              </p>
            </div>
          </div>

          <div className="px-5 py-6 sm:px-8 lg:px-10">
            <div className="grid gap-4 rounded-3xl border border-[#123BFF]/10 bg-[#EAF7FF] p-5 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-sand">XML sitemap for Google Search Console</h2>
                <p className="mt-2 text-sm leading-7 text-sand/65">
                  Submit the XML sitemap URL to Google Search Console. The XML sitemap is generated
                  from the public route registry during production builds.
                </p>
              </div>

              <Link
                href="/sitemap.xml"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
              >
                Open XML sitemap
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-7 grid gap-6">
              {sitemapGroups.map((group) => {
                const Icon = group.icon

                return (
                  <section key={group.name} className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>

                      <div>
                        <h2 className="text-2xl font-bold tracking-tight text-sand">{group.name}</h2>
                        <p className="mt-1 text-sm text-sand/55">
                          {group.pages.length} public {group.pages.length === 1 ? 'page' : 'pages'}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {group.pages.map((page) => (
                        <Link
                          key={page.path}
                          href={page.path}
                          className="group rounded-2xl border border-sand/10 bg-[#F8FCFF] p-4 shadow-sm transition hover:border-[#123BFF]/25 hover:bg-white"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-base font-bold text-sand transition group-hover:text-[#123BFF]">
                                {page.title}
                              </h3>

                              <p className="mt-2 text-sm leading-6 text-sand/60">
                                {page.description}
                              </p>

                              <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                                {page.path}
                              </p>
                            </div>

                            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#123BFF]" aria-hidden="true" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
