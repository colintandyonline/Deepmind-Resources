'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Sidebar } from '@/components/platform/sidebar'
import { SiteFooter } from '@/components/platform/site-footer'

type NavigationShellProps = {
  children: ReactNode
}

const publicRoutes = [
  '/',
  '/academy',
  '/business-ai-training',
  '/contact',
  '/methodology',
  '/platform',
  '/sandbox',
  '/syllabus',
  '/tool-intelligence',
]

function isPublicMarketingRoute(pathname: string) {
  if (pathname.startsWith('/auth')) {
    return true
  }

  return publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))
}

export function NavigationShell({ children }: NavigationShellProps) {
  const pathname = usePathname()
  const usePublicMarketingShell = isPublicMarketingRoute(pathname)

  if (usePublicMarketingShell) {
    return (
      <>
        {children}
        <div className="relative z-10">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <SiteFooter />
          </div>
        </div>
      </>
    )
  }

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