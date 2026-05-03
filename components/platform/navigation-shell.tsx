'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Sidebar } from '@/components/platform/sidebar'

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

  if (!useStandardSidebar) {
    return <>{children}</>
  }

  return (
    <>
      <Sidebar />
      <div className="relative min-h-screen pt-16 md:pl-64 md:pt-0">
        {children}
      </div>
    </>
  )
}
