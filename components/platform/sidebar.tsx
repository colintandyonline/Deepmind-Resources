'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Home,
  BookOpen,
  Code,
  Activity,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  Zap,
  Brain,
  Network,
  Layers,
  Menu,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  icon: React.ElementType
  label: string
  href: string
  isActive?: boolean
  badge?: string
}

const mainNavItems: NavItem[] = [
  { icon: Home, label: 'Dashboard', href: '/', isActive: true },
  { icon: Layers, label: 'Platform', href: '/platform' },
  { icon: BookOpen, label: 'Syllabus', href: '/syllabus' },
  { icon: Code, label: 'Sandbox', href: '/sandbox', badge: 'LIVE' },
  { icon: Activity, label: 'Progress', href: '/progress' },
]

const learningPaths: NavItem[] = [
  { icon: Brain, label: 'AI Fundamentals', href: '/path/fundamentals' },
  { icon: Zap, label: 'Prompt Engineering', href: '/path/prompting' },
  { icon: Layers, label: 'Agent Architecture', href: '/path/agents' },
  { icon: Network, label: 'Multi-Agent Systems', href: '/path/multi-agent' },
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const renderLogo = (showText: boolean) => (
    <Link href="/" className="flex items-center gap-3" onClick={() => setIsMobileOpen(false)}>
      <div className="relative flex items-center justify-center w-8 h-8 shrink-0">
        <div className="absolute inset-0 rounded-lg bg-signal-green/20 animate-pulse-signal" />
        <Brain className="w-5 h-5 text-signal-green relative z-10" />
      </div>
      {showText && (
        <span className="font-semibold text-sand tracking-tight">
          DeepMind<span className="text-signal-green">Resources</span>
        </span>
      )}
    </Link>
  )

  const renderNavigation = (isCollapsedLayout: boolean, closeOnClick = false) => (
    <>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className={cn('mb-4', !isCollapsedLayout && 'px-2')}>
          {!isCollapsedLayout && (
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Main
            </span>
          )}
        </div>

        {mainNavItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => closeOnClick && setIsMobileOpen(false)}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
              'hover:bg-sidebar-accent group',
              item.isActive
                ? 'bg-sidebar-accent text-signal-green'
                : 'text-sand/70 hover:text-sand'
            )}
          >
            <item.icon
              className={cn(
                'w-5 h-5 shrink-0',
                item.isActive ? 'text-signal-green' : 'text-sand/50 group-hover:text-sand/80'
              )}
            />
            {!isCollapsedLayout && (
              <>
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded bg-signal-green/20 text-signal-green animate-pulse-signal">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </Link>
        ))}

        {/* Learning Paths Section */}
        <div className={cn('pt-6 mb-4', !isCollapsedLayout && 'px-2')}>
          {!isCollapsedLayout && (
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Learning Paths
            </span>
          )}
        </div>

        {learningPaths.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => closeOnClick && setIsMobileOpen(false)}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
              'hover:bg-sidebar-accent group',
              'text-sand/70 hover:text-sand'
            )}
          >
            <item.icon className="w-5 h-5 shrink-0 text-sand/50 group-hover:text-signal-green" />
            {!isCollapsedLayout && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="px-3 py-4 border-t border-sidebar-border space-y-1">
        <Link
          href="/settings"
          onClick={() => closeOnClick && setIsMobileOpen(false)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sand/70 hover:text-sand hover:bg-sidebar-accent transition-all"
        >
          <Settings className="w-5 h-5 shrink-0 text-sand/50" />
          {!isCollapsedLayout && <span className="font-medium">Settings</span>}
        </Link>
        <Link
          href="/profile"
          onClick={() => closeOnClick && setIsMobileOpen(false)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sand/70 hover:text-sand hover:bg-sidebar-accent transition-all"
        >
          <User className="w-5 h-5 shrink-0 text-sand/50" />
          {!isCollapsedLayout && <span className="font-medium">Profile</span>}
        </Link>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-sidebar-border bg-sidebar px-4 md:hidden">
        {renderLogo(true)}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-sidebar-border text-sand/70 hover:bg-sidebar-accent hover:text-signal-green transition-all"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cn(
          'fixed inset-0 z-50 md:hidden transition-all duration-300',
          isMobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        <div
          onClick={() => setIsMobileOpen(false)}
          className={cn(
            'absolute inset-0 bg-sand/20 backdrop-blur-sm transition-opacity duration-300',
            isMobileOpen ? 'opacity-100' : 'opacity-0'
          )}
        />
        <aside
          className={cn(
            'absolute left-0 top-0 flex h-screen w-[min(20rem,86vw)] flex-col bg-sidebar border-r border-sidebar-border shadow-2xl transition-transform duration-300 ease-out',
            isMobileOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
            {renderLogo(true)}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-sidebar-border text-sand/60 hover:bg-sidebar-accent hover:text-signal-green transition-all"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {renderNavigation(false, true)}
        </aside>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 hidden h-screen flex-col md:flex',
          'bg-sidebar border-r border-sidebar-border',
          'transition-all duration-300 ease-in-out',
          isCollapsed ? 'w-16' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
          {renderLogo(!isCollapsed)}
        </div>

        {renderNavigation(isCollapsed)}

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-sidebar border border-sidebar-border flex items-center justify-center text-sand/50 hover:text-signal-green hover:border-signal-green/30 transition-all"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </aside>
    </>
  )
}
