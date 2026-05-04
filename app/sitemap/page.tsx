import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Compass, FileText, ShieldCheck, Sparkles } from 'lucide-react'
import { getPublicSiteRouteGroups } from '@/lib/public-site-routes'

export const metadata: Metadata = {
  title: 'HTML Sitemap | DeepMind Resources',
  description:
    'Explore every public DeepMind Resources page, including Academy pathways, the Agentic Sandbox, business AI training, platform pages, and trust information.',
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

const groupIcons = {
  'Core platform': Compass,
  Academy: FileText,
  'Learning pathways': Sparkles,
  Sandbox: Sparkles,
  'Business training': Compass,
  Company: FileText,
  Trust: ShieldCheck,
  'Other public pages': FileText,
}

export default function HtmlSitemapPage() {
  const routeGroups = getPublicSiteRouteGroups()
  const groups = Object.entries(routeGroups)

  return (
    <main className="min-h-screen bg-[#F4FBFF] px-4 py-8 text-sand sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <section className="overflow-hidden rounded-[2rem] border border-sand/10 bg-white shadow-sm">
          <div className="bg-[#123BFF] px-6 py-10 text-white sm:px-8 lg:px-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
              <Compass className="h-4 w-4" aria-hidden="true" />
              Public Sitemap
            </span>

            <div className="mt-6 max-w-4xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                DeepMind Resources public sitemap.
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-white/82 sm:text-lg">
                A human-readable map of the public DeepMind Resources site: Academy pathways,
                Agentic Sandbox pages, platform guidance, business AI training, and trust pages.
                This page is generated from the same public route registry as the XML sitemap.
              </p>
            </div>
          </div>

          <div className="px-6 py-8 sm:px-8 lg:px-10">
            <div className="grid gap-4 rounded-3xl border border-[#123BFF]/10 bg-[#EAF7FF] p-5 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-sand">XML sitemap for Google Search Console</h2>
                <p className="mt-2 text-sm leading-7 text-sand/65">
                  Submit the XML sitemap URL to Google Search Console. It updates during each
                  production build as public pages are added or changed.
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

            <div className="mt-8 grid gap-6">
              {groups.map(([groupName, routes]) => {
                const Icon = groupIcons[groupName as keyof typeof groupIcons] ?? FileText

                return (
                  <section key={groupName} className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>

                      <div>
                        <h2 className="text-2xl font-bold tracking-tight text-sand">{groupName}</h2>
                        <p className="mt-1 text-sm text-sand/55">
                          {routes.length} public {routes.length === 1 ? 'page' : 'pages'}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {routes.map((route) => (
                        <Link
                          key={route.path}
                          href={route.path}
                          className="group rounded-2xl border border-sand/10 bg-[#F8FCFF] p-4 shadow-sm transition hover:border-[#123BFF]/25 hover:bg-white"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-base font-bold text-sand transition group-hover:text-[#123BFF]">
                                {route.title}
                              </h3>

                              <p className="mt-2 text-sm leading-6 text-sand/60">
                                {route.description}
                              </p>

                              <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                                {route.path}
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
