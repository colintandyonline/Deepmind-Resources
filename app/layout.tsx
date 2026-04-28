import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DeepMindResources | AI Technical Training & Agentic Workflows',
  description: 'Master AI engineering with expert-led training. From AI fundamentals to Multi-Agent Orchestration. Learn agentic workflows, LLM development, and production AI systems.',
  keywords: [
    'AI technical training',
    'agentic workflows',
    'AI engineering',
    'multi-agent systems',
    'LLM development',
    'machine learning course',
    'AI orchestration',
    'prompt engineering',
    'AI agents',
    'deep learning'
  ],
  authors: [{ name: 'DeepMindResources' }],
  creator: 'DeepMindResources',
  publisher: 'DeepMindResources',
  generator: 'Next.js',
  applicationName: 'DeepMindResources',
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://deepmindresources.com',
    siteName: 'DeepMindResources',
    title: 'DeepMindResources | AI Technical Training & Agentic Workflows',
    description: 'Master AI engineering with expert-led training. From AI fundamentals to Multi-Agent Orchestration.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DeepMindResources - AI Technical Training Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DeepMindResources | AI Technical Training',
    description: 'Master AI engineering from fundamentals to Multi-Agent Orchestration.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#070605',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-[#070605]">
      <body className="font-sans antialiased bg-[#070605] text-[#e8e3d3]">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
