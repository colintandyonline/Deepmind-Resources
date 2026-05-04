'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Sidebar } from '@/components/platform/sidebar'
import { SiteFooter } from '@/components/platform/site-footer'

type NavigationShellProps = {
  children: ReactNode
}

function shouldUseStandardSidebar(pathname: string) {
  if (pathname === '/') {
    return false
  }

  if (pathname.startsWith('/auth')) {
    return false
  }

  return true
}

export function NavigationShell({ children }: NavigationShellProps) {
  const pathname = usePathname()
  const useStandardSidebar = shouldUseStandardSidebar(pathname)

  if (pathname === '/') {
    return (
      <>
        {children}
        <div className="relative z-10 md:pl-64">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <SiteFooter />
          </div>
        </div>
      </>
    )
  }

  if (!useStandardSidebar) {
    return <>{children}</>
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
