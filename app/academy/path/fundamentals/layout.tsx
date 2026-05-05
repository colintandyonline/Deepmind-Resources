import type { ReactNode } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  Route,
} from 'lucide-react'

type FundamentalsLayoutProps = {
  children: ReactNode
}

export default function FundamentalsLayout({ children }: FundamentalsLayoutProps) {
  return (
    <>
      <div
        id="fundamentals-onboarding-popup"
        className="hidden fixed inset-0 z-50 items-center justify-center bg-sand/30 px-4 py-6 backdrop-blur-sm"
        aria-hidden="true"
        role="dialog"
        aria-modal="true"
        aria-labelledby="fundamentals-onboarding-title"
      >
        <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-sand/10 bg-white shadow-2xl">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-[#123BFF]" />

          <button
            id="fundamentals-onboarding-close"
            type="button"
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-sand/10 bg-white text-xl font-bold leading-none text-sand/60 shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
            aria-label="Close AI Fundamentals onboarding"
          >
            ×
          </button>

          <div className="grid md:grid-cols-[0.95fr_1.05fr]">
            <div className="bg-[#123BFF] p-6 text-white sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm">
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
                AI Fundamentals
              </span>

              <h2
                id="fundamentals-onboarding-title"
                className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Build the foundation before deeper AI workflows.
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
                Learn the core judgement behind safe prompting, tool choice, output review, and
                practical sandbox work.
              </p>

              <div className="mt-6 grid gap-3">
                <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" aria-hidden="true" />
                  <p className="text-sm font-semibold leading-6 text-white/90">
                    Core AI concepts
                  </p>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" aria-hidden="true" />
                  <p className="text-sm font-semibold leading-6 text-white/90">
                    Safe-use judgement
                  </p>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" aria-hidden="true" />
                  <p className="text-sm font-semibold leading-6 text-white/90">
                    Beginner sandbox practice
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#123BFF]">
                Choose your next step
              </p>

              <h3 className="mt-3 text-2xl font-bold tracking-tight text-sand">
                Start the pathway, then prove it in the Sandbox.
              </h3>

              <p className="mt-3 text-sm leading-7 text-sand/65">
                Create your workspace to begin AI Fundamentals, move into guided practice, and
                build practical AI competency.
              </p>

              <div className="mt-6 grid gap-3">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                >
                  Create your workspace
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/sandbox"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-5 py-4 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                >
                  Practise in the Sandbox
                  <Route className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/business-ai-training"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#EAF7FF] px-5 py-4 text-sm font-bold text-[#123BFF] shadow-sm transition hover:bg-[#DDF2FF]"
                >
                  Train your team
                  <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <p className="mt-5 text-xs leading-6 text-sand/45">
                Close this and keep exploring if you are not ready to start yet.
              </p>
            </div>
          </div>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (() => {
              const popup = document.getElementById('fundamentals-onboarding-popup');
              const closeButton = document.getElementById('fundamentals-onboarding-close');
              const storageKey = 'dmr_fundamentals_popup_closed';
              let shown = false;
              let timerId = null;

              if (!popup) return;

              const hasDismissed = () => {
                try {
                  return window.sessionStorage.getItem(storageKey) === 'true';
                } catch {
                  return false;
                }
              };

              const markDismissed = () => {
                try {
                  window.sessionStorage.setItem(storageKey, 'true');
                } catch {}
              };

              const showPopup = () => {
                if (shown || hasDismissed()) return;

                shown = true;
                popup.classList.remove('hidden');
                popup.classList.add('flex');
                popup.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';

                if (timerId) {
                  window.clearTimeout(timerId);
                }

                window.removeEventListener('scroll', handleScroll);
              };

              const closePopup = () => {
                markDismissed();
                popup.classList.add('hidden');
                popup.classList.remove('flex');
                popup.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
              };

              const handleScroll = () => {
                const doc = document.documentElement;
                const scrollableHeight = doc.scrollHeight - window.innerHeight;

                if (scrollableHeight <= 0) return;

                const scrollPercent = (window.scrollY / scrollableHeight) * 100;

                if (scrollPercent >= 20) {
                  showPopup();
                }
              };

              if (hasDismissed()) return;

              timerId = window.setTimeout(showPopup, 20000);
              window.addEventListener('scroll', handleScroll, { passive: true });

              if (closeButton) {
                closeButton.addEventListener('click', closePopup);
              }

              popup.addEventListener('click', (event) => {
                if (event.target === popup) {
                  closePopup();
                }
              });

              popup.querySelectorAll('a').forEach((link) => {
                link.addEventListener('click', markDismissed);
              });

              window.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && !popup.classList.contains('hidden')) {
                  closePopup();
                }
              });
            })();
          `,
        }}
      />

      {children}
    </>
  )
}