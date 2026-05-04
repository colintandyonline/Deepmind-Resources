import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { NavigationShell } from '@/components/platform/navigation-shell'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://deepmindresources.pro'),
  title: {
    default: 'Mastering Agentic AI: Systems & Sandboxes | DeepMind Resources',
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
    title: 'Mastering Agentic AI: Systems & Sandboxes | DeepMind Resources',
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
    title: 'Mastering Agentic AI: Systems & Sandboxes | DeepMind Resources',
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
      <head>
        {process.env.NODE_ENV === 'production' ? (
          <>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-WDBS5XWMYN"></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-WDBS5XWMYN');
                `,
              }}
            />
          </>
        ) : null}
      </head>
      <body className="font-sans antialiased">
        <NavigationShell>{children}</NavigationShell>
        {process.env.NODE_ENV === 'production' && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  )
}

