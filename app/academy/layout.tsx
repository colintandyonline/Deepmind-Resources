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
            width: 13.5rem !important;
            max-width: 100% !important;
            height: 4.75rem !important;
            margin-left: auto !important;
            align-items: center !important;
            justify-content: flex-end !important;
            border-radius: 1.35rem !important;
            background-color: #ffffff !important;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='210' height='72' viewBox='0 0 210 72'%3E%3Crect x='8' y='12' width='48' height='48' rx='16' fill='%23123BFF'/%3E%3Ctext x='32' y='43' text-anchor='middle' font-family='Arial,sans-serif' font-size='14' font-weight='900' fill='white'%3EDMR%3C/text%3E%3Ctext x='70' y='33' font-family='Arial,sans-serif' font-size='18' font-weight='900' fill='%2307152F'%3EDeepMind%3C/text%3E%3Ctext x='70' y='52' font-family='Arial,sans-serif' font-size='18' font-weight='900' fill='%23123BFF'%3EResources%3C/text%3E%3C/svg%3E") !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
            background-size: 12.5rem 4.3rem !important;
            box-shadow: 0 18px 42px rgba(6, 27, 91, 0.18) !important;
          }

          .dmr-academy-route main section:first-of-type > div:last-child > div:first-child > span:first-child svg {
            display: none !important;
          }

          .dmr-academy-route #academy-onboarding-close {
            font-size: 0 !important;
          }

          .dmr-academy-route #academy-onboarding-close::after {
            display: block;
            color: #07152f;
            font-size: 1.5rem;
            font-weight: 700;
            line-height: 1;
          }

          @media (max-width: 640px) {
            .dmr-academy-route main section:first-of-type > div:last-child > div:first-child > span:first-child {
              width: 11.75rem !important;
              height: 4.25rem !important;
              background-size: 11rem 3.8rem !important;
            }
          }
        `}
      </style>
    </div>
  )
}
