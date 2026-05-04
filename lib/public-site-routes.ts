import fs from 'node:fs'
import path from 'node:path'

export const SITE_URL = 'https://deepmindresources.pro'

type ChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'

export type PublicSiteRoute = {
  path: string
  url: string
  title: string
  description: string
  group: string
  priority: number
  changeFrequency: ChangeFrequency
  lastModified: Date
}

type RouteDetails = {
  title: string
  description: string
  group: string
  priority: number
  changeFrequency: ChangeFrequency
}

const APP_DIR = path.join(process.cwd(), 'app')

const PRIVATE_ROUTE_SEGMENTS = new Set([
  'account',
  'admin',
  'api',
  'auth',
  'brain',
  'dashboard',
  'editor',
  'onboarding',
  'progress',
  'settings',
  'validation',
])

const ROUTE_DETAILS: Record<string, RouteDetails> = {
  '/': {
    title: 'Mastering Agentic AI: Systems & Sandboxes',
    description:
      'DeepMind Resources turns verified AI updates into practical lessons, sandbox tasks, tool intelligence, and business-ready AI training paths.',
    group: 'Core platform',
    priority: 1,
    changeFrequency: 'weekly',
  },
  '/academy': {
    title: 'Academy',
    description:
      'Deterministic AI learning paths with verified guidance, source-aware training, sandbox tasks, and production-ready AI skills.',
    group: 'Academy',
    priority: 0.9,
    changeFrequency: 'weekly',
  },
  '/syllabus': {
    title: 'Syllabus',
    description:
      'A public map of DeepMind Resources learning paths, AI competency areas, modules, and version-aware training structure.',
    group: 'Academy',
    priority: 0.85,
    changeFrequency: 'weekly',
  },
  '/path/fundamentals': {
    title: 'AI Fundamentals Pathway',
    description:
      'Build practical AI foundations with safe-use habits, prompt basics, tool judgement, and verified sandbox practice.',
    group: 'Learning pathways',
    priority: 0.85,
    changeFrequency: 'weekly',
  },
  '/path/prompting': {
    title: 'Prompt Engineering Pathway',
    description:
      'Learn structured prompt systems, context, constraints, output validation, workflow control, and reusable prompt patterns.',
    group: 'Learning pathways',
    priority: 0.85,
    changeFrequency: 'weekly',
  },
  '/path/agents': {
    title: 'Agent Architecture Pathway',
    description:
      'Learn bounded AI agent architecture with goals, tools, permissions, memory rules, review gates, and practical deployment thinking.',
    group: 'Learning pathways',
    priority: 0.85,
    changeFrequency: 'weekly',
  },
  '/path/multi-agent-systems': {
    title: 'Multi-Agent Systems Pathway',
    description:
      'Learn specialist agent roles, handoffs, shared state, validation layers, escalation logic, and reviewable multi-agent workflows.',
    group: 'Learning pathways',
    priority: 0.85,
    changeFrequency: 'weekly',
  },
  '/sandbox': {
    title: 'Agentic Sandbox',
    description:
      'Practise prompt workflows, RAG exercises, tool-calling tasks, agent design, validation drills, and sandbox-based AI skill development.',
    group: 'Sandbox',
    priority: 0.9,
    changeFrequency: 'weekly',
  },
  '/platform': {
    title: 'Platform',
    description:
      'Explore the DeepMind Resources platform for structured AI learning, tool intelligence, verified sandbox tasks, and release-aware training.',
    group: 'Core platform',
    priority: 0.85,
    changeFrequency: 'weekly',
  },
  '/methodology': {
    title: 'AI Training Methodology',
    description:
      'The DeepMind Resources methodology for turning verified AI updates into practical lessons, sandbox tasks, tool intelligence, and measurable AI competency.',
    group: 'Trust',
    priority: 0.75,
    changeFrequency: 'monthly',
  },
  '/business-ai-training': {
    title: 'Business AI Training',
    description:
      'Business-ready AI training for staff onboarding, workforce capability, role-based workflow practice, privacy-aware adoption, and team readiness.',
    group: 'Business training',
    priority: 0.9,
    changeFrequency: 'weekly',
  },
  '/contact': {
    title: 'Contact',
    description:
      'Contact DeepMind Resources for business onboarding, platform questions, support, and professional AI training enquiries.',
    group: 'Company',
    priority: 0.65,
    changeFrequency: 'monthly',
  },
  '/privacy': {
    title: 'Privacy',
    description:
      'Privacy information for individuals and businesses evaluating DeepMind Resources as an independent AI training platform.',
    group: 'Trust',
    priority: 0.55,
    changeFrequency: 'monthly',
  },
  '/terms': {
    title: 'Terms',
    description:
      'Terms information for visitors, users, and future members of the DeepMind Resources platform.',
    group: 'Trust',
    priority: 0.55,
    changeFrequency: 'monthly',
  },
  '/sitemap': {
    title: 'HTML Sitemap',
    description:
      'A human-readable map of public DeepMind Resources pages for search engines, AI systems, and visitors.',
    group: 'Trust',
    priority: 0.5,
    changeFrequency: 'weekly',
  },
}

function isPageFile(fileName: string) {
  return ['page.tsx', 'page.ts', 'page.jsx', 'page.js'].includes(fileName)
}

function isRouteGroup(segment: string) {
  return segment.startsWith('(') && segment.endsWith(')')
}

function shouldExcludeRoute(routeSegments: string[]) {
  return routeSegments.some((segment) => {
    if (!segment || isRouteGroup(segment)) {
      return false
    }

    if (segment.startsWith('[') && segment.endsWith(']')) {
      return true
    }

    return PRIVATE_ROUTE_SEGMENTS.has(segment)
  })
}

function routeFromPageFile(filePath: string) {
  const relativePath = path.relative(APP_DIR, filePath)
  const pathParts = relativePath.split(path.sep)
  const routeSegments = pathParts.slice(0, -1).filter((segment) => !isRouteGroup(segment))

  if (shouldExcludeRoute(routeSegments)) {
    return null
  }

  const routePath = routeSegments.length === 0 ? '/' : `/${routeSegments.join('/')}`

  return routePath
}

function walkPages(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return []
  }

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      if (entry.name.startsWith('_') || entry.name === 'node_modules') {
        return []
      }

      return walkPages(entryPath)
    }

    if (entry.isFile() && isPageFile(entry.name)) {
      return [entryPath]
    }

    return []
  })
}

function humanizeRoute(routePath: string) {
  if (routePath === '/') {
    return 'Home'
  }

  const lastSegment = routePath.split('/').filter(Boolean).at(-1) ?? routePath

  return lastSegment
    .split('-')
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ')
}

function fallbackRouteDetails(routePath: string): RouteDetails {
  const title = humanizeRoute(routePath)

  return {
    title,
    description: `${title} is a public DeepMind Resources page for verified AI learning, tool intelligence, sandbox practice, and practical AI competency.`,
    group: 'Other public pages',
    priority: 0.45,
    changeFrequency: 'monthly',
  }
}

export function getPublicSiteRoutes(): PublicSiteRoute[] {
  const discoveredRoutes = walkPages(APP_DIR)
    .map((filePath) => {
      const routePath = routeFromPageFile(filePath)

      if (!routePath) {
        return null
      }

      const details = ROUTE_DETAILS[routePath] ?? fallbackRouteDetails(routePath)
      const lastModified = fs.statSync(filePath).mtime

      return {
        path: routePath,
        url: new URL(routePath, SITE_URL).toString(),
        title: details.title,
        description: details.description,
        group: details.group,
        priority: details.priority,
        changeFrequency: details.changeFrequency,
        lastModified,
      }
    })
    .filter((route): route is PublicSiteRoute => Boolean(route))

  const routeMap = new Map<string, PublicSiteRoute>()

  discoveredRoutes.forEach((route) => {
    routeMap.set(route.path, route)
  })

  return Array.from(routeMap.values()).sort((a, b) => {
    if (a.priority !== b.priority) {
      return b.priority - a.priority
    }

    return a.path.localeCompare(b.path)
  })
}

export function getPublicSiteRouteGroups() {
  return getPublicSiteRoutes().reduce<Record<string, PublicSiteRoute[]>>((groups, route) => {
    if (!groups[route.group]) {
      groups[route.group] = []
    }

    groups[route.group].push(route)

    return groups
  }, {})
}

