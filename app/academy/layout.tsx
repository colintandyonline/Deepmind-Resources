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
          .dmr-academy-route main section:first-of-type > div:last-child > div:first-child {
            position: relative !important;
          }

          .dmr-academy-route main section:first-of-type > div:last-child > div:first-child > span:first-child {
            position: absolute !important;
            top: 4rem !important;
            right: 3.25rem !important;
            z-index: 2 !important;
            display: flex !important;
            width: 5.5rem !important;
            height: 5.5rem !important;
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

          .dmr-academy-route main section:first-of-type > div:last-child > div:first-child > p:first-of-type,
          .dmr-academy-route main section:first-of-type > div:last-child > div:first-child > h2:first-of-type {
            max-width: calc(100% - 7.25rem) !important;
          }

          .dmr-academy-route #academy-onboarding-close {
            font-size: 0 !important;
          }

          .dmr-academy-route #academy-onboarding-close::after {
            content: 'Ã—';
            display: block;
            color: #07152f;
            font-size: 1.5rem;
            font-weight: 700;
            line-height: 1;
          }

          /*
            Disable Academy scroll reveal animations on mobile.
            The sitewide reveal effect works well on marketing pages, but Academy lesson/module pages
            are dense learning interfaces and need instant rendering on small screens.
          */
          @media (max-width: 767px) {
            .dmr-academy-route main section,
            .dmr-academy-route main article {
              animation: none !important;
              animation-timeline: auto !important;
              animation-range: normal !important;
              opacity: 1 !important;
              transform: none !important;
              filter: none !important;
              will-change: auto !important;
            }

            .dmr-academy-route main a,
            .dmr-academy-route main button {
              transition:
                border-color 160ms ease,
                background-color 160ms ease,
                color 160ms ease,
                box-shadow 160ms ease !important;
            }

            .dmr-academy-route main a:hover,
            .dmr-academy-route main button:hover {
              transform: none !important;
            }
          }

          @media (max-width: 640px) {
            .dmr-academy-route main section:first-of-type > div:last-child > div:first-child > span:first-child {
              top: 3.75rem !important;
              right: 1.5rem !important;
              width: 4.75rem !important;
              height: 4.75rem !important;
              border-radius: 1.35rem !important;
              background-size: 3.6rem 3.6rem !important;
            }

            .dmr-academy-route main section:first-of-type > div:last-child > div:first-child > p:first-of-type,
            .dmr-academy-route main section:first-of-type > div:last-child > div:first-child > h2:first-of-type {
              max-width: calc(100% - 5.5rem) !important;
            }
          }
        `}
      </style>
    </div>
  )
}

