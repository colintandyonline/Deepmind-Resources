'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap, Users, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'

const stats = [
  { icon: Users, label: 'Active Learners', value: '12,847' },
  { icon: Award, label: 'Verified Skill Paths', value: '3,291' },
  { icon: Zap, label: 'AI Updates Tracked', value: '89,432' },
]

export function HeroSection() {
  const [isLive, setIsLive] = useState(true)
  const [systemStatus] = useState('LIVE AI INTELLIGENCE ONLINE')

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLive((prev) => !prev)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.035]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(18, 59, 255, 0.18) 1px, transparent 1px),
              linear-gradient(90deg, rgba(18, 59, 255, 0.18) 1px, transparent 1px)
            `,
            backgroundSize: '52px 52px',
          }}
        />
      </div>

      {/* Scan Line Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-signal-green/25 to-transparent animate-scan-line" />
      </div>

      <div className="relative z-10 py-16 lg:py-24">
        {/* Live Status Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-signal-green/5 border border-signal-green/20 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`absolute inline-flex h-full w-full rounded-full bg-signal-green ${
                  isLive ? 'animate-ping' : ''
                } opacity-75`}
              />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-signal-green" />
            </span>
            <span className="text-sm font-mono text-signal-green">
              {systemStatus}
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center max-w-5xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
            <span className="text-sand">Master the Art of</span>
            <br />
            <span className="text-signal-green">Agentic AI Systems</span>
          </h1>

          <p className="text-lg sm:text-xl text-sand/60 max-w-3xl mx-auto mb-6 text-pretty leading-relaxed">
            From AI beginner to multi-agent builder. Learn with verified lessons that evolve
            as new models, tools, and platform updates change what matters.
          </p>

          <p className="text-base sm:text-lg text-sand/55 max-w-3xl mx-auto mb-10 text-pretty leading-relaxed">
            DeepMind Resources cuts through hype, compares AI tools for real scenarios, and turns
            trusted updates into practical sandbox training for individuals, teams, and businesses.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              asChild
              size="lg"
              className="bg-signal-green text-primary-foreground hover:bg-signal-green/90 font-semibold px-8 group shadow-sm"
            >
              <Link href="/academy">
                Explore Academy
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-sand/20 text-sand hover:bg-sand/5 hover:border-signal-green/30 font-semibold px-8 bg-white/60"
            >
              <Link href="/syllabus">
                View Live Curriculum
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card rounded-xl p-6 text-center group hover:border-signal-green/30 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="w-10 h-10 rounded-lg bg-signal-green/10 flex items-center justify-center group-hover:bg-signal-green/20 transition-colors">
                    <stat.icon className="w-5 h-5 text-signal-green" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-sand font-mono mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-sand/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
