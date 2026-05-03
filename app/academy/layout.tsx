import type { ReactNode } from 'react'

type AcademyLayoutProps = {
  children: ReactNode
}

export default function AcademyLayout({ children }: AcademyLayoutProps) {
  return <>{children}</>
}
