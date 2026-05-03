'use client'

import { useEffect, useState } from 'react'
import type { ElementType } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  BookOpen,
  Code,
  Activity,
  User,
  ChevronLeft,
  ChevronRight,
  Zap,
  Brain,
  Network,
  Layers,
  Mail,
  Menu,
  X,
  LogIn,
  UserPlus,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

interface NavItem {
  icon: ElementType
  label: string
  href: string
  badge?: string
}

const mainNavItems: NavItem[] = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: BookOpen, label: 'Academy', href: '/academy' },
  { icon: Layers, label: 'Platform', href: '/platform' },
  { icon: BookOpen, label: 'Syllabus', href: '/syllabus' },
  { icon: Mail, label: 'Contact', href: '/contact' },
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
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-dmr-sidebar-collapsed',
      isCollapsed ? 'true' : 'false'
    )

    return () => {
      document.documentElement.removeAttribute('data-dmr-sidebar-collapsed')
    }
  }, [isCollapsed])

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(Boolean(data.session))
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(Boolean(session))
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    let observer: IntersectionObserver | null = null
    let cancelled = false

    const setupScrollReveal = () => {
      if (cancelled) {
        return
      }

      const elements = Array.from(document.querySelectorAll<HTMLElement>('main section, main article'))

      if (!elements.length) {
        return
      }

      if (!('IntersectionObserver' in window)) {
        elements.forEach((element) => element.classList.add('dmr-in-view'))
        return
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('dmr-in-view')
              observer?.unobserve(entry.target)
            }
          })
        },
        {
          root: null,
          rootMargin: '0px 0px -8% 0px',
          threshold: 0.14,
        }
      )

      elements.forEach((element, index) => {
        element.classList.add('dmr-scroll-reveal')
        element.style.setProperty('--dmr-reveal-delay', `${Math.min(index * 45, 220)}ms`)
        observer?.observe(element)
      })
    }

    const timer = window.setTimeout(setupScrollReveal, 80)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
      observer?.disconnect()
    }
  }, [pathname])

  const bottomNavItems: NavItem[] = isLoggedIn
    ? [
        { icon: Activity, label: 'Dashboard', href: '/dashboard' },
        { icon: User, label: 'Account', href: '/account' },
      ]
    : [
        { icon: LogIn, label: 'Sign in', href: '/auth/login' },
        { icon: UserPlus, label: 'Create account', href: '/auth/signup' },
      ]

  const isNavItemActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }

    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const renderLogo = (showText: boolean) => (
    <Link href="/" className="flex items-center gap-3" onClick={() => setIsMobileOpen(false)}>
      <div className="relative flex items-center justify-center w-8 h-8 shrink-0">
        <div className="absolute inset-0 rounded-lg bg-signal-green/20 animate-pulse-signal" />
        <Brain className="w-5 h-5 text-signal-green relative z-10" />
      </div>
      {showText && (
        <span className="font-semibold text-sand tracking-tight">
          DeepMind <span className="text-signal-green">Resources</span>
        </span>
      )}
    </Link>
  )

  const renderSectionLabel = (label: string, isCollapsedLayout: boolean) => {
    if (isCollapsedLayout) {
      return null
    }

    return (
      <span className="inline-flex rounded-full bg-[#123BFF] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-sm">
        {label}
      </span>
    )
  }

  const renderNavItem = (item: NavItem, isCollapsedLayout: boolean, closeOnClick = false) => {
    const isActive = isNavItemActive(item.href)

    return (
      <Link
        key={item.label}
        href={item.href}
        onClick={() => closeOnClick && setIsMobileOpen(false)}
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
          'hover:bg-sidebar-accent group',
          isActive ? 'bg-sidebar-accent text-signal-green' : 'text-sand/70 hover:text-sand'
        )}
      >
        <item.icon
          className={cn(
            'w-5 h-5 shrink-0',
            isActive ? 'text-signal-green' : 'text-sand/50 group-hover:text-sand/80'
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
    )
  }

  const renderBottomNavItem = (
    item: NavItem,
    isCollapsedLayout: boolean,
    closeOnClick = false
  ) => {
    const isActive = isNavItemActive(item.href)

    return (
      <Link
        key={item.label}
        href={item.href}
        onClick={() => closeOnClick && setIsMobileOpen(false)}
        className={cn(
          'flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200',
          isActive ? 'bg-white text-[#123BFF]' : 'text-white/85 hover:bg-white/10 hover:text-white'
        )}
      >
        <item.icon
          className={cn(
            'w-5 h-5 shrink-0',
            isActive ? 'text-[#123BFF]' : 'text-white/75'
          )}
        />
        {!isCollapsedLayout && <span className="font-semibold">{item.label}</span>}
      </Link>
    )
  }

  const renderNavigation = (isCollapsedLayout: boolean, closeOnClick = false) => (
    <>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className={cn('mb-4', !isCollapsedLayout && 'px-2')}>
          {renderSectionLabel('Main', isCollapsedLayout)}
        </div>

        {mainNavItems.map((item) => renderNavItem(item, isCollapsedLayout, closeOnClick))}

        {/* Learning Paths Section */}
        <div className={cn('pt-6 mb-4', !isCollapsedLayout && 'px-2')}>
          {renderSectionLabel('Learning Paths', isCollapsedLayout)}
        </div>

        {learningPaths.map((item) => renderNavItem(item, isCollapsedLayout, closeOnClick))}
      </nav>

      {/* Bottom Account/Auth Section */}
      <div className="px-3 py-4 border-t border-sidebar-border">
        <div
          className={cn(
            'space-y-1 rounded-2xl bg-[#123BFF] p-2 shadow-sm',
            isCollapsedLayout && 'rounded-xl p-1.5'
          )}
        >
          {bottomNavItems.map((item) =>
            renderBottomNavItem(item, isCollapsedLayout, closeOnClick)
          )}
        </div>
      </div>
    </>
  )

  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          html[data-dmr-sidebar-collapsed="true"] .md\\:pl-64 {
            padding-left: 4rem !important;
          }

          html[data-dmr-sidebar-collapsed="false"] .md\\:pl-64 {
            padding-left: 16rem !important;
          }

          .md\\:pl-64 {
            transition: padding-left 300ms ease-in-out;
          }
        }

        img[src*="deepmind-resources-emblem"] {
          border-radius: 1.35rem !important;
          background: #ffffff;
          box-shadow: 0 12px 32px rgba(6, 27, 91, 0.12);
        }

        @media (prefers-reduced-motion: no-preference) {
          main section,
          main article {
            animation: none !important;
          }

          main .dmr-scroll-reveal {
            opacity: 0;
            transform: translateY(58px) scale(0.972);
            filter: blur(14px);
            transition:
              opacity 760ms ease,
              transform 760ms cubic-bezier(0.22, 1, 0.36, 1),
              filter 760ms ease,
              box-shadow 260ms ease,
              border-color 260ms ease;
            transition-delay: var(--dmr-reveal-delay, 0ms);
            will-change: opacity, transform, filter;
          }

          main .dmr-scroll-reveal.dmr-in-view {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }

          main a,
          main button {
            transition:
              transform 220ms ease,
              box-shadow 220ms ease,
              border-color 220ms ease,
              background-color 220ms ease,
              color 220ms ease;
          }

          main a:hover,
          main button:hover {
            transform: translateY(-2px);
          }
        }

        @media (hover: hover) and (prefers-reduced-motion: no-preference) {
          main article:hover {
            border-color: rgba(18, 59, 255, 0.32) !important;
            box-shadow: 0 22px 60px rgba(6, 27, 91, 0.14) !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          main .dmr-scroll-reveal,
          main .dmr-scroll-reveal.dmr-in-view {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            transition: none !important;
          }
        }

        @media (max-width: 767px) {
          [id*="popup"][role="dialog"],
          [id*="popup"][aria-modal="true"],
          #homepage-cta-popup,
          #academy-onboarding-popup,
          #prompting-onboarding-popup {
            align-items: flex-start !important;
            justify-content: flex-start !important;
            height: 100dvh !important;
            max-height: 100dvh !important;
            overflow-x: hidden !important;
            overflow-y: auto !important;
            overscroll-behavior: contain !important;
            padding: calc(env(safe-area-inset-top) + 0.75rem) 0.75rem calc(env(safe-area-inset-bottom) + 0.75rem) !important;
            -webkit-overflow-scrolling: touch;
          }

          [id*="popup"][role="dialog"] > div,
          [id*="popup"][aria-modal="true"] > div,
          #homepage-cta-popup > div,
          #academy-onboarding-popup > div,
          #prompting-onboarding-popup > div {
            display: block !important;
            width: calc(100vw - 1.5rem) !important;
            max-width: calc(100vw - 1.5rem) !important;
            max-height: calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 1.5rem) !important;
            overflow-x: hidden !important;
            overflow-y: auto !important;
            border-radius: 1.35rem !important;
            -webkit-overflow-scrolling: touch;
          }

          [id*="popup"] button[aria-label*="Close"],
          [id*="popup"] button[id*="close"],
          #homepage-cta-popup-close,
          #academy-onboarding-close,
          #prompting-onboarding-close {
            position: fixed !important;
            top: calc(env(safe-area-inset-top) + 0.75rem) !important;
            right: calc(env(safe-area-inset-right) + 0.75rem) !important;
            z-index: 99999 !important;
            width: 2.75rem !important;
            height: 2.75rem !important;
            min-height: 2.75rem !important;
            border-radius: 1rem !important;
            background: #ffffff !important;
            box-shadow: 0 12px 30px rgba(6, 27, 91, 0.22) !important;
          }

          [id*="popup"] h1,
          [id*="popup"] h2,
          [id*="popup"] h3 {
            overflow-wrap: anywhere;
          }

          [id*="popup"] a,
          [id*="popup"] button {
            min-height: 3.25rem;
          }
        }
      `}</style>

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
