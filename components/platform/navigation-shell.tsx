'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BrainCircuit, ChevronDown, Menu, Moon } from 'lucide-react'
import { Sidebar } from '@/components/platform/sidebar'
import { SiteFooter } from '@/components/platform/site-footer'

type NavigationShellProps = {
  children: ReactNode
}

const privateRoutes = [
  '/account',
  '/admin',
  '/brain',
  '/dashboard',
  '/settings',
]

const marketingNavItems = [
  {
    label: 'Academy',
    href: '/academy',
    hasDropdown: true,
  },
  {
    label: 'Curriculum',
    href: '/syllabus',
    hasDropdown: false,
  },
  {
    label: 'Tools',
    href: '/tool-intelligence',
    hasDropdown: true,
  },
  {
    label: 'Solutions',
    href: '/business-ai-training',
    hasDropdown: true,
  },
  {
    label: 'Resources',
    href: '/methodology',
    hasDropdown: true,
  },
  {
    label: 'Pricing',
    href: '/business-ai-training',
    hasDropdown: false,
  },
]

function isPrivateAppRoute(pathname: string) {
  return privateRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))
}

function PublicMarketingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#123BFF]/10 bg-white/86 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group inline-flex items-center gap-3" aria-label="DeepMind Resources home">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E8ECFF] text-[#123BFF] shadow-sm transition group-hover:bg-[#123BFF] group-hover:text-white">
            <BrainCircuit className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className="text-xl font-black tracking-[-0.04em] text-[#07152F]">
            DeepMind <span className="text-[#123BFF]">Resources</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {marketingNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#07152F]/78 transition hover:text-[#123BFF]"
            >
              {item.label}
              {item.hasDropdown ? <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" /> : null}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#123BFF]/10 bg-white text-[#07152F] shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
            aria-label="Toggle appearance"
          >
            <Moon className="h-4 w-4" aria-hidden="true" />
          </button>

          <Link
            href="/auth/login"
            className="text-sm font-bold text-[#07152F]/78 transition hover:text-[#123BFF]"
          >
            Log in
          </Link>

          <Link
            href="/auth/signup"
            className="inline-flex items-center justify-center rounded-xl bg-[#123BFF] px-5 py-3 text-sm font-black text-white shadow-[0_12px_30px_rgba(18,59,255,0.24)] transition hover:bg-[#0A63FF]"
          >
            Get Started
          </Link>
        </div>

        <details className="group relative lg:hidden">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-2xl border border-[#123BFF]/10 bg-white text-[#07152F] shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF] [&::-webkit-details-marker]:hidden">
            <Menu className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Open menu</span>
          </summary>

          <div className="absolute right-0 mt-3 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-[#123BFF]/10 bg-white p-3 shadow-[0_24px_70px_rgba(6,27,91,0.16)]">
            <nav className="grid gap-1" aria-label="Mobile navigation">
              {marketingNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-[#07152F]/78 transition hover:bg-[#EAF7FF] hover:text-[#123BFF]"
                >
                  {item.label}
                  {item.hasDropdown ? <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                </Link>
              ))}
            </nav>

            <div className="mt-3 grid gap-2 border-t border-[#123BFF]/10 pt-3">
              <Link
                href="/auth/login"
                className="rounded-2xl px-4 py-3 text-sm font-bold text-[#07152F]/78 transition hover:bg-[#EAF7FF] hover:text-[#123BFF]"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-2xl bg-[#123BFF] px-4 py-3 text-center text-sm font-black text-white shadow-sm transition hover:bg-[#0A63FF]"
              >
                Get Started
              </Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  )
}

export function NavigationShell({ children }: NavigationShellProps) {
  const pathname = usePathname()

  if (pathname.startsWith('/auth')) {
    return <>{children}</>
  }

  if (isPrivateAppRoute(pathname)) {
    return (
      <>
        <Sidebar />
        <div className="relative min-h-screen pt-16 md:pl-64 md:pt-0">
          {children}
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">
              <SiteFooter />
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <PublicMarketingHeader />
      {children}
      <div className="relative z-10">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <SiteFooter />
        </div>
      </div>
    </>
  )
}