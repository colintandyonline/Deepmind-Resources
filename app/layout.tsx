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
    default: 'DeepMindResources | Live AI Training and Tool Intelligence',
    template: '%s | DeepMindResources',
  },
  description:
    'DeepMindResources is a living AI training and tool-intelligence platform that turns verified AI updates into practical lessons, sandbox tasks, and business-ready learning paths.',
  applicationName: 'DeepMindResources',
  generator: 'DeepMindResources',
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
  ],
  openGraph: {
    title: 'DeepMindResources | Live AI Training and Tool Intelligence',
    description:
      'Learn AI from beginner to agentic systems with verified lessons, live AI intelligence, tool comparisons, and practical sandbox training.',
    url: 'https://deepmindresources.pro',
    siteName: 'DeepMindResources',
    images: [
      {
        url: '/brand/deepmind-resources-logo.png',
        width: 512,
        height: 512,
        alt: 'DeepMindResources logo',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'DeepMindResources | Live AI Training and Tool Intelligence',
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