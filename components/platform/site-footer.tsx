import Image from 'next/image'
import Link from 'next/link'

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

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-sand/10 pt-8 pb-8 lg:mt-16">
      <div className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm backdrop-blur sm:p-8 lg:p-10">
        <div className="grid gap-10 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
          <section className="rounded-[1.75rem] border border-sand/10 bg-white p-5 shadow-sm sm:p-6" aria-label="DeepMind Resources footer summary">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <Link href="/" aria-label="DeepMind Resources home" className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sand/10 transition hover:ring-[#123BFF]/30 sm:h-32 sm:w-32">
                <Image src="/brand/deepmind-resources-logo.png" alt="DeepMind Resources logo" fill sizes="128px" className="object-contain p-2" priority={false} />
              </Link>

              <div>
                <span className="inline-flex rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-sm">
                  Verified AI learning intelligence
                </span>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-sand">DeepMind Resources</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-sand/62 sm:text-base">
                  A living AI training and tool-intelligence platform that turns verified AI updates into practical lessons, sandbox tasks, and business-ready learning paths.
                </p>
              </div>
            </div>
          </section>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={`${column.title} footer links`} className="rounded-[1.5rem] border border-sand/10 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-sand">{column.title}</h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.href}`}>
                      <Link href={link.href} className="inline-flex text-sm font-semibold leading-6 text-sand/62 transition hover:text-[#123BFF]">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-[#123BFF] px-5 py-4 text-white shadow-sm">
          <div className="flex flex-col gap-3 text-center text-xs sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p>© 2026 DeepMind Resources. Built for verified AI skill gain.</p>
            <p>AI update → verified meaning → practical lesson → sandbox task.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
