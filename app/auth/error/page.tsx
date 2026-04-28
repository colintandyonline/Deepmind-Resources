import Link from 'next/link'
import { Brain, AlertTriangle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(232, 227, 211, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(232, 227, 211, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-12 h-12">
              <div className="absolute inset-0 rounded-xl bg-signal-green/20 animate-pulse-signal" />
              <Brain className="w-7 h-7 text-signal-green relative z-10" />
            </div>
            <span className="text-2xl font-bold text-sand tracking-tight">
              DeepMind<span className="text-signal-green">Resources</span>
            </span>
          </Link>
        </div>

        {/* Error Card */}
        <div className="glass-card rounded-2xl p-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-destructive/20 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-sand mb-3">Authentication Error</h1>
          <p className="text-sand/60 mb-6">
            Something went wrong during authentication. This could be due to an expired link or
            invalid credentials.
          </p>

          <div className="flex flex-col gap-3">
            <Button asChild className="w-full bg-signal-green text-obsidian hover:bg-signal-green/90 font-semibold">
              <Link href="/auth/login">
                Try Again
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-sand/20 text-sand hover:bg-sand/5"
            >
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
