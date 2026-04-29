import Link from 'next/link'

export default function AuthErrorPage() {
  return (
    <main className="min-h-screen bg-obsidian px-4 py-10 text-sand sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-3xl items-center justify-center">
        <section className="w-full rounded-3xl border border-sand/10 bg-white/80 p-6 text-center shadow-sm sm:p-8 lg:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-signal-green">
            Authentication issue
          </p>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
            We could not complete your sign-in
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-sand/60 sm:text-base">
            The sign-in link may have expired, already been used, or opened in a different browser.
            Please request a fresh secure sign-in link and try again.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/auth/login"
              className="rounded-2xl bg-signal-green px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-signal-green/90"
            >
              Try signing in again
            </Link>

            <Link
              href="/"
              className="rounded-2xl border border-sand/10 bg-white px-5 py-3 text-sm font-bold text-sand shadow-sm transition hover:border-signal-green/30 hover:text-signal-green"
            >
              Return to homepage
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
