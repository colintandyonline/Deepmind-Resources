import Link from 'next/link'
import { Brain, Mail, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SignUpSuccessPage() {
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

        {/* Success Card */}
        <div className="glass-card rounded-2xl p-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-signal-green/20 flex items-center justify-center">
              <Mail className="w-8 h-8 text-signal-green" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-sand mb-3">Check Your Email</h1>
          <p className="text-sand/60 mb-6">
            We&apos;ve sent you a confirmation link. Please check your email and click the link to
            activate your account.
          </p>

          <div className="p-4 rounded-xl bg-sand/5 border border-sand/10 mb-6">
            <p className="text-sm text-sand/50">
              Didn&apos;t receive the email? Check your spam folder or try signing up again.
            </p>
          </div>

          <Button asChild className="w-full bg-signal-green text-obsidian hover:bg-signal-green/90 font-semibold">
            <Link href="/auth/login">
              Continue to Login
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
