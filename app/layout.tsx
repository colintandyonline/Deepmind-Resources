import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { NavigationShell } from '@/components/platform/navigation-shell'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://deepmindresources.pro'),
  title: {
    default: 'Master Agentic AI Systems | DeepMind Resources',
    template: '%s | DeepMind Resources',
  },
  description:
    'DeepMind Resources turns verified AI updates into practical lessons, sandbox tasks, tool intelligence, and business-ready AI training paths.',
  applicationName: 'DeepMind Resources',
  generator: 'DeepMind Resources',
  keywords: [
    'AI training',
    'agentic AI systems',
    'AI tool comparison',
    'prompt engineering',
    'AI agents',
    'RAG training',
    'business AI training',
    'AI sandbox',
    'AI skills',
    'live AI intelligence',
    'verified AI learning',
    'AI competency',
    'tool intelligence',
    'verified sandbox tasks',
    'workforce AI training',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Master Agentic AI Systems | DeepMind Resources',
    description:
      'DeepMind Resources is a living AI training and tool-intelligence platform for verified guidance, practical lessons, sandbox tasks, and business-ready AI competency.',
    url: 'https://deepmindresources.pro',
    siteName: 'DeepMind Resources',
    images: [
      {
        url: '/brand/deepmind-resources-logo.png',
        width: 512,
        height: 512,
        alt: 'DeepMind Resources logo',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Master Agentic AI Systems | DeepMind Resources',
    description:
      'Verified AI updates turned into practical lessons, sandbox tasks, tool intelligence, and business-ready learning paths.',
    images: ['/brand/deepmind-resources-logo.png'],
  },
  icons: {
    icon: '/brand/deepmind-resources-emblem.png',
    apple: '/brand/deepmind-resources-emblem.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <NavigationShell>{children}</NavigationShell>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
