import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Prompt Engineering Pathway | DeepMind Resources Academy',
  description:
    'Learn prompt engineering with DeepMind Resources: structured instructions, context, constraints, reusable prompt systems, output validation, workflow control, and verified sandbox practice.',
  alternates: {
    canonical: '/path/prompting',
  },
  keywords: [
    'prompt engineering pathway',
    'prompt engineering training',
    'AI prompt systems',
    'structured prompting',
    'prompt validation',
    'AI workflow prompts',
    'reusable prompt patterns',
    'verified sandbox tasks',
    'AI competency',
    'DeepMind Resources Academy',
  ],
  openGraph: {
    title: 'Prompt Engineering Pathway | DeepMind Resources Academy',
    description:
      'Build production-ready prompt systems with structured instructions, workflow context, validation rules, and verified sandbox practice.',
    url: 'https://deepmindresources.pro/path/prompting',
    siteName: 'DeepMind Resources',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Prompt Engineering Pathway | DeepMind Resources Academy',
    description:
      'A professional pathway for prompt control, reusable instruction systems, workflow-ready AI output, and verified sandbox practice.',
  },
}

type PromptingLayoutProps = {
  children: ReactNode
}

export default function PromptingLayout({ children }: PromptingLayoutProps) {
  return (
    <div className="dmr-prompting-route">
      {children}

      <style>
        {`
          .dmr-prompting-route main section:first-of-type > div:last-child > div:first-child {
            position: relative !important;
          }

          .dmr-prompting-route main section:first-of-type > div:last-child > div:first-child::after {
            content: '';
            position: absolute;
            top: 4rem;
            right: 3.25rem;
            z-index: 2;
            display: block;
            width: 5.5rem;
            height: 5.5rem;
            border-radius: 1.65rem;
            background-color: #ffffff;
            background-image: url('/brand/deepmind-resources-emblem.png');
            background-position: center;
            background-repeat: no-repeat;
            background-size: 4.25rem 4.25rem;
            box-shadow: 0 18px 42px rgba(6, 27, 91, 0.18);
          }

          .dmr-prompting-route main section:first-of-type > div:last-child > div:first-child > p:first-of-type,
          .dmr-prompting-route main section:first-of-type > div:last-child > div:first-child > h2:first-of-type {
            max-width: calc(100% - 7.25rem) !important;
          }

          @media (max-width: 640px) {
            .dmr-prompting-route main section:first-of-type > div:last-child > div:first-child::after {
              top: 3.75rem;
              right: 1.5rem;
              width: 4.75rem;
              height: 4.75rem;
              border-radius: 1.35rem;
              background-size: 3.6rem 3.6rem;
            }

            .dmr-prompting-route main section:first-of-type > div:last-child > div:first-child > p:first-of-type,
            .dmr-prompting-route main section:first-of-type > div:last-child > div:first-child > h2:first-of-type {
              max-width: calc(100% - 5.5rem) !important;
            }
          }
        `}
      </style>
    </div>
  )
}
