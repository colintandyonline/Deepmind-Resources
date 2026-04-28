'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Brain, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
          `${window.location.origin}/auth/callback`,
        data: {
          display_name: displayName,
        },
      },
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
      return
    }

    router.push('/auth/sign-up-success')
  }

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

        {/* Sign Up Card */}
        <div className="glass-card rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-sand mb-2">Create Account</h1>
            <p className="text-sand/50">Start your AI learning journey today</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-sand/70 mb-2">
                  Display Name
                </label>
                <Input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="bg-sand/5 border-sand/10 text-sand placeholder:text-sand/30 focus:border-signal-green/50 focus:ring-signal-green/20"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-sand/70 mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="bg-sand/5 border-sand/10 text-sand placeholder:text-sand/30 focus:border-signal-green/50 focus:ring-signal-green/20"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-sand/70 mb-2">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  required
                  minLength={6}
                  className="bg-sand/5 border-sand/10 text-sand placeholder:text-sand/30 focus:border-signal-green/50 focus:ring-signal-green/20"
                />
                <p className="text-xs text-sand/40 mt-1">Minimum 6 characters</p>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-signal-green text-obsidian hover:bg-signal-green/90 font-semibold"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sand/50 text-sm">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-signal-green hover:text-signal-green/80 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sand/30 text-xs mt-6">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
