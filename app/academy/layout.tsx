import type { ReactNode } from 'react'

type AcademyLayoutProps = {
  children: ReactNode
}

export default function AcademyLayout({ children }: AcademyLayoutProps) {
  return (
    <div className="dmr-academy-route">
      {children}

      <style>
        {`
          .dmr-academy-route main section:first-of-type > div:last-child > div:first-child > span:first-child {
            display: flex !important;
            width: 5.5rem !important;
            height: 5.5rem !important;
            margin-left: auto !important;
            align-items: center !important;
            justify-content: center !important;
            flex-shrink: 0 !important;
            border-radius: 1.65rem !important;
            background-color: #ffffff !important;
            background-image: url('/brand/deepmind-resources-emblem.png') !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
            background-size: 4.25rem 4.25rem !important;
            box-shadow: 0 18px 42px rgba(6, 27, 91, 0.18) !important;
          }

          .dmr-academy-route main section:first-of-type > div:last-child > div:first-child > span:first-child svg {
            display: none !important;
          }

          .dmr-academy-route #academy-onboarding-close {
            font-size: 0 !important;
          }

          .dmr-academy-route #academy-onboarding-close::after {
            content: '×';
            display: block;
            color: #07152f;
            font-size: 1.5rem;
            font-weight: 700;
            line-height: 1;
          }

          @media (max-width: 640px) {
            .dmr-academy-route main section:first-of-type > div:last-child > div:first-child > span:first-child {
              width: 4.75rem !important;
              height: 4.75rem !important;
              border-radius: 1.35rem !important;
              background-size: 3.6rem 3.6rem !important;
            }
          }
        `}
      </style>
    </div>
  )
}
