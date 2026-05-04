import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react'

const footerColumns = [
  {
    title: 'Platform',
    links: [
      { label: 'Academy', href: '/academy' },
      { label: 'Platform', href: '/platform' },
      { label: 'Syllabus', href: '/syllabus' },
      { label: 'Sandbox', href: '/sandbox' },
    ],
  },
  {
    title: 'Learning paths',
    links: [
      { label: 'AI Fundamentals', href: '/path/fundamentals' },
      { label: 'Prompt Engineering', href: '/path/prompting' },
      { label: 'Agent Architecture', href: '/path/agents' },
      { label: 'Multi-Agent Systems', href: '/path/multi-agent-systems' },
    ],
  },
  {
    title: 'Business',
    links: [
      { label: 'Business AI Training', href: '/business-ai-training' },
      { label: 'Create workspace', href: '/auth/signup' },
      { label: 'Sign in', href: '/auth/login' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Trust',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Verified guidance', href: '/platform' },
      { label: 'Sandbox practice', href: '/sandbox' },
    ],
  },
]

const footerHighlights = [
  {
    label: 'Academy',
    href: '/academy',
    icon: GraduationCap,
  },
  {
    label: 'Sandbox',
    href: '/sandbox',
    icon: Code2,
  },
  {
    label: 'Business training',
    href: '/business-ai-training',
    icon: BriefcaseBusiness,
  },
]

export function SiteFooter() {
  return (
    <footer className="relative z-20 mt-12 w-full min-w-0 pb-8 lg:mt-16" aria-label="Site footer">
      <div className="w-full min-w-0 overflow-hidden rounded-[2.25rem] border border-sand/10 bg-white shadow-[0_24px_80px_rgba(6,27,91,0.10)]">
        <section
          className="relative overflow-hidden bg-[#123BFF] p-6 text-white sm:p-8 lg:p-10"
          aria-label="DeepMind Resources footer summary"
        >
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
          <div className="absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-[#45C9FF]/20 blur-3xl" aria-hidden="true" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <Link
              href="/"
              aria-label="DeepMind Resources home"
              className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[1.75rem] bg-white shadow-xl shadow-[#061B5B]/20 ring-1 ring-white/50 transition hover:scale-[1.02] sm:h-32 sm:w-32"
            >
              <Image
                src="/brand/deepmind-resources-logo.png"
                alt="DeepMind Resources logo"
                fill
                sizes="128px"
                className="object-contain p-2"
                priority={false}
              />
            </Link>

            <div className="max-w-3xl">
              <span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#123BFF] shadow-sm">
                Verified AI learning intelligence
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                DeepMind Resources
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
                The current training layer for AI competency: verified guidance, practical lessons,
                sandbox tasks, and business-ready learning paths built for production workflows.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:w-[27rem] lg:grid-cols-1 xl:w-[34rem] xl:grid-cols-3">
              {footerHighlights.map((item) => {
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-2xl border border-white/15 bg-white/10 p-4 text-sm font-bold text-white shadow-sm transition hover:bg-white hover:text-[#123BFF]"
                  >
                    <Icon className="mb-3 h-5 w-5" aria-hidden="true" />
                    <span>{item.label}</span>
                    <ArrowRight className="mt-3 h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <section
          className="bg-gradient-to-br from-white via-white to-[#EAF7FF] p-6 sm:p-8 lg:p-10"
          aria-label="Footer navigation"
        >
          <div className="flex flex-col gap-4 border-b border-sand/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF7FF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Public navigation
              </span>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-sand sm:text-3xl">
                Find the right AI training route.
              </h2>
            </div>

            <Link
              href="/auth/signup"
              className="inline-flex w-fit items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
            >
              Create workspace
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-7 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {footerColumns.map((column) => (
              <nav
                key={column.title}
                aria-label={`${column.title} footer links`}
                className="rounded-[1.5rem] border border-sand/10 bg-white/78 p-5 shadow-sm"
              >
                <h3 className="text-xs font-black uppercase tracking-[0.18em] text-sand">
                  {column.title}
                </h3>

                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.href}`}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-2 text-sm font-semibold leading-6 text-sand/62 transition hover:text-[#123BFF]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#123BFF]/35 transition group-hover:bg-[#123BFF]" aria-hidden="true" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </section>

        <div className="border-t border-white/10 bg-[#07152F] px-5 py-4 text-white sm:px-8">
          <div className="flex flex-col gap-3 text-center text-xs sm:text-left">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p>© 2026 DeepMind Resources. Built for verified AI skill gain.</p>
              <p className="inline-flex items-center justify-center gap-2 sm:justify-end">
                <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
                AI update -&gt; verified meaning -&gt; practical lesson -&gt; sandbox task.
              </p>
            </div>
            <p className="text-white/68">
              DeepMind Resources is an independent platform at deepmindresources.pro and is not affiliated with Google DeepMind.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
