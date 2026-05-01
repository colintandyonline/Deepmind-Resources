import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  Database,
  FileSearch,
  GitBranch,
  Layers3,
  LockKeyhole,
  Network,
  Radar,
  Route,
  Rss,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react'
import { BrainSourceCreateForm } from '@/components/brain/brain-source-create-form'
import { AiDiscoveryCreateForm } from '@/components/brain/ai-discovery-create-form'
import { CheckFeedButton } from '@/components/brain/check-feed-button'
import { SourceSignalActionButton } from '@/components/brain/source-signal-action-button'
import { SourceSignalScoutButton } from '@/components/brain/source-signal-scout-button'
import { ArchiveFindingButton } from '@/components/brain/archive-finding-button'
import { ApproveFindingButton } from '@/components/brain/approve-finding-button'
import { RestoreFindingButton } from '@/components/brain/restore-finding-button'
import { BrainSourceScoutForm } from '@/components/brain/brain-source-scout-form'
import { createClient } from '@/lib/supabase/server'

const BRAIN_ADMIN_EMAIL = 'colintandy@gmail.com'

type BrainTableName =
  | 'sources'
  | 'master_brain_records'
  | 'master_brain_record_sources'
  | 'validation_reviews'
  | 'agent_runs'
  | 'agent_findings'
  | 'publication_queue'

type LatestBrainRecord = {
  id: string
  title: string
  record_type: string
  summary: string
  practical_meaning: string | null
  business_relevance: string | null
  uncertainty_notes: string | null
  structured_content: Record<string, unknown> | null
  validation_status: string
  publication_status: string
  updated_at: string
}

type LatestAgentFinding = {
  id: string
  related_master_brain_record_id: string | null
  title: string
  finding_type: string
  summary: string
  confidence_level: string
  validation_status: string
  recommended_action: string | null
  created_at: string
}

type SourceFeed = {
  id: string
  provider: string
  title: string
  feed_type: string
  source_type: string
  trust_level: string
  status: string
  poll_frequency_minutes: number
  last_checked_at: string | null
  last_success_at: string | null
  last_error: string | null
  source_group: string | null
  tool_category: string | null
  product_area: string | null
  training_department: string | null
  primary_use_case: string | null
  audience_level: string | null
  intake_priority: string | null
  academy_relevance: string | null
  business_relevance: string | null
  sandbox_relevance: string | null
  taxonomy_notes: string | null
}

type SourceFeedItem = {
  id: string
  provider: string
  signal_type: string
  title: string
  summary: string | null
  published_at: string | null
  detected_at: string | null
  relevance_status: string
  review_status: string
  item_url: string
}

type AiDiscoveryItem = {
  id: string
  provider_name: string
  product_name: string | null
  model_name: string | null
  model_family: string | null
  website_url: string | null
  official_source_url: string | null
  source_type: string | null
  suggested_feed_type: string | null
  source_group: string | null
  tool_category: string | null
  product_area: string | null
  capability_area: string | null
  training_department: string | null
  primary_use_case: string | null
  audience_level: string | null
  discovery_status: string
  signal_quality: string
  intake_priority: string
  academy_relevance: string | null
  business_relevance: string | null
  sandbox_relevance: string | null
  discovery_summary: string | null
  practical_training_value: string | null
  social_noise_notes: string | null
  verification_notes: string | null
  discovered_from: string | null
  discovered_url: string | null
  created_at: string
  updated_at: string
}

type AiDiscoverySummaryItem = {
  id: string
  source_group: string | null
  training_department: string | null
  discovery_status: string
  signal_quality: string
  intake_priority: string
}

type BrainPageProps = {
  searchParams?: Promise<{
    source?: string
    review?: string
    discovery?: string
  }>
}

export const metadata: Metadata = {
  title: 'Master Brain | DeepMind Resources',
  description:
    'Private DeepMind Resources Master Brain command centre for verified AI intelligence, sources, validation, lessons, sandbox tasks, and agent workflow planning.',
  robots: {
    index: false,
    follow: false,
  },
}

const brainPipeline = [
  {
    icon: Radar,
    title: 'Signal intake',
    description:
      'Capture important AI model, platform, tool, API, pricing, safety, and workflow changes before they influence public training.',
  },
  {
    icon: FileSearch,
    title: 'Source classification',
    description:
      'Separate official documentation, release notes, trusted technical sources, weak signals, marketing claims, and noise.',
  },
  {
    icon: ShieldCheck,
    title: 'Validation review',
    description:
      'Check whether a claim is verified, partially verified, conflicting, deprecated, or unsuitable for publication.',
  },
  {
    icon: BrainCircuit,
    title: 'Master Brain record',
    description:
      'Store the practical meaning, confidence level, affected skill area, source references, uncertainty notes, and downstream actions.',
  },
  {
    icon: Workflow,
    title: 'Learning action',
    description:
      'Decide whether a lesson, sandbox task, tool comparison, or business training item needs to be created or updated.',
  },
]

const brainCountCards: {
  table: BrainTableName
  label: string
  description: string
  icon: typeof Database
}[] = [
  {
    table: 'sources',
    label: 'Sources',
    description: 'Official docs, release notes, changelogs, trusted references, and weak signals.',
    icon: FileSearch,
  },
  {
    table: 'master_brain_records',
    label: 'Brain records',
    description: 'Structured intelligence records with confidence, validation, and skill impact.',
    icon: BrainCircuit,
  },
  {
    table: 'master_brain_record_sources',
    label: 'Source links',
    description: 'Connections between Brain records and supporting, primary, or conflicting sources.',
    icon: GitBranch,
  },
  {
    table: 'validation_reviews',
    label: 'Validation reviews',
    description: 'Review decisions for sources, claims, records, agent findings, and task candidates.',
    icon: ShieldCheck,
  },
  {
    table: 'agent_runs',
    label: 'Agent runs',
    description: 'Execution records for future Scout, Validator, Tool, Lesson, and Sandbox agents.',
    icon: Sparkles,
  },
  {
    table: 'agent_findings',
    label: 'Agent findings',
    description: 'Candidate findings created by agents before validation or publication.',
    icon: Network,
  },
  {
    table: 'publication_queue',
    label: 'Publication queue',
    description: 'Internal review queue for items that may become lessons, sandbox tasks, or updates.',
    icon: Layers3,
  },
]

const recordFields = [
  'Record type',
  'Title and summary',
  'Full practical meaning',
  'Source references',
  'Source quality level',
  'Confidence score',
  'Validation status',
  'Publication status',
  'Affected tool, model, or platform',
  'Affected skill area',
  'Lesson or sandbox impact',
  'Business relevance',
  'Review date',
  'Notes on uncertainty',
]

const agentRoles = [
  {
    title: 'Scout Agent',
    description:
      'Finds possible AI signals from official sources, documentation, changelogs, repositories, and trusted technical material.',
  },
  {
    title: 'Noise Filter Agent',
    description:
      'Downgrades hype, weak claims, affiliate-style repetition, old tutorials, and low-value signals before they pollute the Brain.',
  },
  {
    title: 'Validator Agent',
    description:
      'Checks sources, confidence, conflicts, freshness, and whether a claim is strong enough to influence training.',
  },
  {
    title: 'Tool Agent',
    description:
      'Maintains tool capability, limitation, pricing, integration, and use-case records with evidence attached.',
  },
  {
    title: 'Lesson Builder Agent',
    description:
      'Turns verified intelligence into clear lesson changes, new learning material, and practical explanations.',
  },
  {
    title: 'Sandbox Builder Agent',
    description:
      'Turns verified intelligence into practical tasks, review checklists, model comparisons, validation drills, and workflow exercises.',
  },
]

const commandZones = [
  {
    title: 'Sources',
    description:
      'The source layer holds official docs, changelogs, release notes, repositories, pricing references, product tests, and trusted technical sources.',
  },
  {
    title: 'Verified claims',
    description:
      'Claims are stored with validation status, confidence, affected tools, affected skills, source links, and uncertainty notes.',
  },
  {
    title: 'Tool intelligence',
    description:
      'Tool records connect capabilities and limitations to use cases, comparison pages, lessons, and sandbox practice.',
  },
  {
    title: 'Lesson impact',
    description:
      'The Brain flags when a lesson should be updated, created, retired, or checked for stale guidance.',
  },
  {
    title: 'Sandbox impact',
    description:
      'The Brain flags when a verified change should become prompt practice, tool-calling work, RAG tasks, agent design, debugging, or validation drills.',
  },
  {
    title: 'Business impact',
    description:
      'The Brain identifies staff training implications, tool-spend risks, workflow changes, safety cautions, and business-ready guidance.',
  },
]

function formatCount(value: number) {
  return new Intl.NumberFormat('en-GB').format(value)
}

function formatLabel(value: string) {
  return value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function getStructuredString(content: Record<string, unknown> | null, key: string) {
  if (!content) {
    return null
  }

  const value = content[key]

  return typeof value === 'string' && value.trim() ? value.trim() : null
}

function splitParagraphs(value: string | null) {
  if (!value) {
    return []
  }

  return value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}


function getTopDiscoveryCounts(
  items: AiDiscoverySummaryItem[],
  key: 'source_group' | 'training_department',
) {
  const counts = new Map<string, number>()

  for (const item of items) {
    const value = item[key] ?? 'unclassified'
    counts.set(value, (counts.get(value) ?? 0) + 1)
  }

  return Array.from(counts.entries())
    .sort((first, second) => second[1] - first[1] || first[0].localeCompare(second[0]))
    .slice(0, 6)
}

function getPillClass(value: string) {
  const baseClass =
    'rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]'

  if (value === 'model_release' || value === 'model_release_note') {
    return `${baseClass} bg-[#E9F0FF] text-[#123BFF]`
  }

  if (value === 'api_change') {
    return `${baseClass} bg-[#EAF7FF] text-[#0A63FF]`
  }

  if (value === 'tool_capability_change' || value === 'tool_capability' || value === 'tool_launch') {
    return `${baseClass} bg-[#EFFFF7] text-[#047857]`
  }

  if (value === 'documentation_update' || value === 'documentation_summary') {
    return `${baseClass} bg-[#F5F3FF] text-[#6D28D9]`
  }

  if (value === 'business_ai_workflow_update' || value === 'business_training_note') {
    return `${baseClass} bg-[#FFF7ED] text-[#C2410C]`
  }

  if (value === 'lesson_update_candidate' || value === 'lesson_material') {
    return `${baseClass} bg-[#FEFCE8] text-[#A16207]`
  }

  if (value === 'sandbox_task_candidate' || value === 'sandbox_task') {
    return `${baseClass} bg-[#ECFEFF] text-[#0E7490]`
  }

  if (value === 'tool_comparison_candidate' || value === 'tool_comparison') {
    return `${baseClass} bg-[#FDF2F8] text-[#BE185D]`
  }

  if (value === 'pricing_change' || value === 'pricing_note') {
    return `${baseClass} bg-[#F0FDF4] text-[#15803D]`
  }

  if (value === 'safety_update' || value === 'safety_note') {
    return `${baseClass} bg-[#FEF2F2] text-[#B91C1C]`
  }

  if (value === 'tool_deprecation' || value === 'deprecation_record' || value === 'archived') {
    return `${baseClass} bg-[#F1F5F9] text-[#475569]`
  }

  if (value === 'verified') {
    return `${baseClass} bg-[#ECFDF5] text-[#047857]`
  }

  if (value === 'needs_review' || value === 'unverified_signal') {
    return `${baseClass} bg-[#FFFBEB] text-[#B45309]`
  }

  if (value === 'high') {
    return `${baseClass} bg-[#ECFDF5] text-[#047857]`
  }

  if (value === 'medium') {
    return `${baseClass} bg-[#FFFBEB] text-[#B45309]`
  }

  if (value === 'low' || value === 'unreviewed') {
    return `${baseClass} bg-[#F1F5F9] text-[#475569]`
  }

  if (value === 'internal_only') {
    return `${baseClass} bg-[#EEF2FF] text-[#4338CA]`
  }

  return `${baseClass} bg-[#EAF7FF] text-[#123BFF]`
}

export default async function BrainPage({ searchParams }: BrainPageProps) {
  const resolvedSearchParams = await searchParams
  const sourceStatus = resolvedSearchParams?.source ?? null
  const reviewView = resolvedSearchParams?.review === 'archived' ? 'archived' : 'active'

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const adminEmail = user.email?.trim().toLowerCase()

  if (adminEmail !== BRAIN_ADMIN_EMAIL) {
    redirect('/account')
  }

  const liveCounts = await Promise.all(
    brainCountCards.map(async (card) => {
      const { count, error } = await supabase
        .from(card.table)
        .select('id', {
          count: 'exact',
          head: true,
        })

      return {
        ...card,
        count: count ?? 0,
        hasError: Boolean(error),
      }
    }),
  )

  const { data: latestBrainRecords, error: latestBrainRecordsError } = await supabase
    .from('master_brain_records')
    .select('id, title, record_type, summary, practical_meaning, business_relevance, uncertainty_notes, structured_content, validation_status, publication_status, updated_at')
    .order('updated_at', { ascending: false })
    .limit(5)

  const { data: latestSourceFeeds, error: latestSourceFeedsError } = await supabase
    .from('source_feeds')
    .select('id, provider, title, feed_type, source_type, trust_level, status, poll_frequency_minutes, last_checked_at, last_success_at, last_error, source_group, tool_category, product_area, training_department, primary_use_case, audience_level, intake_priority, academy_relevance, business_relevance, sandbox_relevance, taxonomy_notes')
    .order('provider', { ascending: true })
    .order('title', { ascending: true })
    .limit(20)

  const { data: latestSourceFeedItems, error: latestSourceFeedItemsError } = await supabase
    .from('source_feed_items')
    .select('id, provider, signal_type, title, summary, published_at, detected_at, relevance_status, review_status, item_url')
    .order('detected_at', { ascending: false })
    .limit(12)

  const { data: latestDiscoveryItems, error: latestDiscoveryItemsError } = await supabase
    .from('ai_discovery_items')
    .select('id, provider_name, product_name, model_name, model_family, website_url, official_source_url, source_type, suggested_feed_type, source_group, tool_category, product_area, capability_area, training_department, primary_use_case, audience_level, discovery_status, signal_quality, intake_priority, academy_relevance, business_relevance, sandbox_relevance, discovery_summary, practical_training_value, social_noise_notes, verification_notes, discovered_from, discovered_url, created_at, updated_at')
    .order('created_at', { ascending: false })
    .limit(12)

  const { data: discoverySummaryItems, error: discoverySummaryItemsError } = await supabase
    .from('ai_discovery_items')
    .select('id, source_group, training_department, discovery_status, signal_quality, intake_priority')
    .order('created_at', { ascending: false })
    .limit(1000)

  let latestAgentFindingsQuery = supabase
    .from('agent_findings')
    .select('id, related_master_brain_record_id, title, finding_type, summary, confidence_level, validation_status, recommended_action, created_at')
    .is('related_master_brain_record_id', null)
    .order('created_at', { ascending: false })
    .limit(6)

  if (reviewView === 'archived') {
    latestAgentFindingsQuery = latestAgentFindingsQuery.eq('validation_status', 'archived')
  } else {
    latestAgentFindingsQuery = latestAgentFindingsQuery.in('validation_status', [
      'unverified_signal',
      'needs_review',
    ])
  }

  const { data: latestAgentFindings, error: latestAgentFindingsError } =
    await latestAgentFindingsQuery

  const latestRecords = (latestBrainRecords ?? []) as LatestBrainRecord[]
  const latestFindings = (latestAgentFindings ?? []) as LatestAgentFinding[]
  const sourceFeeds = (latestSourceFeeds ?? []) as SourceFeed[]
  const sourceFeedItems = (latestSourceFeedItems ?? []) as SourceFeedItem[]
  const discoveryItems = (latestDiscoveryItems ?? []) as AiDiscoveryItem[]
  const discoverySummaryRows = (discoverySummaryItems ?? []) as AiDiscoverySummaryItem[]
  const totalDiscoveryCandidates = discoverySummaryRows.length
  const needsOfficialSourceCandidates = discoverySummaryRows.filter(
    (item) => item.discovery_status === 'needs_official_source',
  ).length
  const worthTrackingCandidates = discoverySummaryRows.filter(
    (item) => item.discovery_status === 'worth_tracking',
  ).length
  const rejectedOrDuplicateCandidates = discoverySummaryRows.filter((item) =>
    ['rejected_hype', 'duplicate'].includes(item.discovery_status),
  ).length
  const highPriorityDiscoveryCandidates = discoverySummaryRows.filter(
    (item) => item.intake_priority === 'high',
  ).length
  const topDiscoverySourceGroups = getTopDiscoveryCounts(discoverySummaryRows, 'source_group')
  const topDiscoveryTrainingDepartments = getTopDiscoveryCounts(
    discoverySummaryRows,
    'training_department',
  )
  const totalBrainRows = liveCounts.reduce((total, item) => total + item.count, 0)
  const readErrors = liveCounts.filter((item) => item.hasError).length

  const [
    activeFindingsResult,
    archivedFindingsResult,
    failedAgentRunsResult,
    verifiedBrainRecordsResult,
  ] = await Promise.all([
    supabase
      .from('agent_findings')
      .select('id', {
        count: 'exact',
        head: true,
      })
      .in('validation_status', ['unverified_signal', 'needs_review'])
      .is('related_master_brain_record_id', null),
    supabase
      .from('agent_findings')
      .select('id', {
        count: 'exact',
        head: true,
      })
      .eq('validation_status', 'archived'),
    supabase
      .from('agent_runs')
      .select('id', {
        count: 'exact',
        head: true,
      })
      .eq('status', 'failed'),
    supabase
      .from('master_brain_records')
      .select('id', {
        count: 'exact',
        head: true,
      })
      .eq('validation_status', 'verified'),
  ])

  const brainHealthCards = [
    {
      label: 'Active review queue',
      count: activeFindingsResult.count ?? 0,
      description: 'Unresolved Scout findings waiting for approve, archive, or further review.',
      hasError: Boolean(activeFindingsResult.error),
    },
    {
      label: 'Verified Brain records',
      count: verifiedBrainRecordsResult.count ?? 0,
      description: 'Approved intelligence records available for internal learning decisions.',
      hasError: Boolean(verifiedBrainRecordsResult.error),
    },
    {
      label: 'Archived findings',
      count: archivedFindingsResult.count ?? 0,
      description: 'Retained Scout findings removed from the active review queue.',
      hasError: Boolean(archivedFindingsResult.error),
    },
    {
      label: 'Failed agent runs',
      count: failedAgentRunsResult.count ?? 0,
      description: 'Agent runs that need review before the Scout workflow is trusted at scale.',
      hasError: Boolean(failedAgentRunsResult.error),
    },
  ]

  const brainHealthReadErrors = brainHealthCards.filter((item) => item.hasError).length

  return (
    <main className="relative min-h-screen overflow-hidden bg-obsidian px-4 py-8 text-sand sm:px-6 lg:px-8">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at top right, rgba(69, 201, 255, 0.24), transparent 34rem), radial-gradient(circle at top left, rgba(18, 59, 255, 0.14), transparent 30rem), linear-gradient(180deg, #F4FBFF 0%, #EAF7FF 48%, #F4FBFF 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <header className="rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  <BrainCircuit className="h-4 w-4" aria-hidden="true" />
                  Master Brain
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF7FF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                  <LockKeyhole className="h-4 w-4" aria-hidden="true" />
                  Private command centre
                </span>
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-sand sm:text-5xl lg:text-6xl">
                Central command for verified AI intelligence.
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-sand/65 sm:text-lg">
                The Master Brain is the private operating layer that connects AI signals, source
                records, validation reviews, tool intelligence, lesson updates, sandbox tasks,
                business training actions, and future agent workflows.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/account"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                >
                  Return to account
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-2xl border border-sand/10 bg-white px-5 py-3.5 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                >
                  Open dashboard
                </Link>
              </div>
            </div>

            <aside className="rounded-[2rem] bg-[#123BFF] p-6 text-white shadow-sm sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white">
                <Route className="h-4 w-4" aria-hidden="true" />
                Live database state
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight">
                {formatCount(totalBrainRows)} Brain rows currently stored.
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/82">
                This count comes from the live Supabase Brain tables. Empty counts are expected at
                this stage because the structure is now ready before real source-backed records are
                added.
              </p>

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm font-bold text-white">Access state</p>
                  <p className="mt-1 text-sm leading-6 text-white/75">
                    Server-protected and restricted to the configured platform admin account.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm font-bold text-white">Read checks</p>
                  <p className="mt-1 text-sm leading-6 text-white/75">
                    {readErrors === 0
                      ? 'All Brain table count checks returned successfully.'
                      : `${readErrors} table count check needs attention.`}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </header>

        {sourceStatus === 'created' ? (
          <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-sm font-semibold leading-7 text-emerald-800 shadow-sm">
            Source record created. It is stored privately in the Brain source layer.
          </div>
        ) : null}

        {sourceStatus === 'missing-title' ? (
          <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-7 text-amber-800 shadow-sm">
            Source title is required before a source can be added to the Brain.
          </div>
        ) : null}

        {sourceStatus === 'error' ? (
          <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-5 text-sm font-semibold leading-7 text-red-800 shadow-sm">
            Source record could not be created. Check the Brain source table schema and admin-only RLS policy.
          </div>
        ) : null}

        {resolvedSearchParams?.discovery === 'created' ? (
          <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-sm font-semibold leading-7 text-emerald-800 shadow-sm">
            Discovery candidate created. It is now waiting in the AI Discovery Queue.
          </div>
        ) : null}

        {resolvedSearchParams?.discovery === 'missing-provider' ? (
          <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-7 text-amber-800 shadow-sm">
            Provider name is required before a discovery candidate can be added.
          </div>
        ) : null}

        {resolvedSearchParams?.discovery === 'error' ? (
          <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-5 text-sm font-semibold leading-7 text-red-800 shadow-sm">
            Discovery candidate could not be created. Check the AI discovery table schema and admin-only RLS policy.
          </div>
        ) : null}

        <details className="mt-8 rounded-[2rem] border border-[#123BFF]/15 bg-[#F7FBFF] p-4 shadow-sm">
          <summary className="cursor-pointer list-none rounded-2xl bg-white px-4 py-3 shadow-sm">
            <span className="block text-sm font-bold text-sand">
              Show/hide add discovery candidate form
            </span>
            <span className="mt-1 block text-sm leading-7 text-sand/60">
              Capture new AI tools, models, platforms, companies, or weak signals before they enter intake.
            </span>
          </summary>

          <div className="mt-4 [&>section]:mt-0">
            <AiDiscoveryCreateForm />
          </div>
        </details>

        <details className="mt-8 rounded-[2rem] border border-[#123BFF]/15 bg-[#F7FBFF] p-4 shadow-sm">
          <summary className="cursor-pointer list-none rounded-2xl bg-white px-4 py-3 shadow-sm">
            <span className="block text-sm font-bold text-sand">
              Show/hide create source form
            </span>
            <span className="mt-1 block text-sm leading-7 text-sand/60">
              Add official documentation, release notes, trusted sources, or weak source-backed signals.
            </span>
          </summary>

          <div className="mt-4 [&>section]:mt-0">
            <BrainSourceCreateForm />
          </div>
        </details>

        <BrainSourceScoutForm />

        <details className="mt-8 rounded-[2rem] border border-[#123BFF]/15 bg-[#F7FBFF] p-4 shadow-sm">
          <summary className="cursor-pointer list-none rounded-2xl bg-white px-4 py-3 shadow-sm">
            <span className="block text-sm font-bold text-sand">
              Show/hide AI Discovery Queue
            </span>
            <span className="mt-1 block text-sm leading-7 text-sand/60">
              Discovery summary, candidate tools, model records, platform signals, and source verification status.
            </span>
          </summary>

          <div className="mt-4 [&>section]:mt-0">
        <section className="mt-0 rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <Radar className="h-4 w-4" aria-hidden="true" />
                AI Discovery Queue
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                New AI tools, models, platforms, and weak signals before intake.
              </h2>

              <p className="mt-4 text-base leading-8 text-sand/65">
                The discovery queue is the layer before trusted feeds. It gives new AI companies,
                models, apps, and social discovery signals a place to be classified, verified, and
                routed before they become official source intake.
              </p>
            </div>

            <div className="rounded-3xl bg-[#EAF7FF] p-5 shadow-sm lg:max-w-md">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#123BFF]">
                Discovery rule
              </p>
              <p className="mt-3 text-sm leading-7 text-sand/65">
                New tools should not jump straight into training. First identify the provider,
                official source, tool category, likely audience, and whether the signal is useful or
                just hype.
              </p>
            </div>
          </div>

          {latestDiscoveryItemsError ? (
            <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm font-bold text-amber-900">
                AI discovery items could not be read.
              </p>
              <p className="mt-2 text-sm leading-7 text-amber-800">
                Check the ai_discovery_items table, schema cache, and admin-only RLS policy.
              </p>
            </div>
          ) : null}

          {discoverySummaryItemsError ? (
            <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm font-bold text-amber-900">
                AI discovery summary counts could not be read.
              </p>
              <p className="mt-2 text-sm leading-7 text-amber-800">
                Check the ai_discovery_items table, schema cache, and admin-only RLS policy.
              </p>
            </div>
          ) : null}

          <div className="mt-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF7FF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
              <Database className="h-4 w-4" aria-hidden="true" />
              Discovery Queue Summary
            </span>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {[
                {
                  label: 'Total candidates',
                  count: totalDiscoveryCandidates,
                  description: 'Discovery records currently held before source intake.',
                },
                {
                  label: 'Needs official source',
                  count: needsOfficialSourceCandidates,
                  description: 'Candidates that need official docs, release notes, or source proof.',
                },
                {
                  label: 'Worth tracking',
                  count: worthTrackingCandidates,
                  description: 'Candidates already marked as useful enough to monitor.',
                },
                {
                  label: 'Rejected or duplicate',
                  count: rejectedOrDuplicateCandidates,
                  description: 'Candidates retained as history but removed from active consideration.',
                },
                {
                  label: 'High priority',
                  count: highPriorityDiscoveryCandidates,
                  description: 'Candidates most likely to affect training, sandbox, or tool guidance.',
                },
              ].map((item) => (
                <article
                  key={item.label}
                  className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                    {item.label}
                  </p>
                  <p className="mt-3 text-3xl font-bold tracking-tight text-sand">
                    {formatCount(item.count)}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-sand/60">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <article className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                  Top source groups
                </p>

                <div className="mt-4 grid gap-3">
                  {topDiscoverySourceGroups.length > 0 ? (
                    topDiscoverySourceGroups.map(([label, count]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-4 rounded-2xl bg-[#F7FBFF] px-4 py-3"
                      >
                        <span className={getPillClass(label)}>{formatLabel(label)}</span>
                        <span className="text-sm font-bold text-sand">{formatCount(count)}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm leading-7 text-sand/60">
                      No source group classifications yet.
                    </p>
                  )}
                </div>
              </article>

              <article className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                  Top training departments
                </p>

                <div className="mt-4 grid gap-3">
                  {topDiscoveryTrainingDepartments.length > 0 ? (
                    topDiscoveryTrainingDepartments.map(([label, count]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-4 rounded-2xl bg-[#F7FBFF] px-4 py-3"
                      >
                        <span className={getPillClass(label)}>{formatLabel(label)}</span>
                        <span className="text-sm font-bold text-sand">{formatCount(count)}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm leading-7 text-sand/60">
                      No training department classifications yet.
                    </p>
                  )}
                </div>
              </article>
            </div>
          </div>

          <details open className="mt-8 rounded-3xl border border-[#123BFF]/15 bg-[#F7FBFF] p-4">
            <summary className="cursor-pointer list-none rounded-2xl bg-white px-4 py-3 shadow-sm">
              <span className="block text-sm font-bold text-sand">
                Show/hide discovery candidates
              </span>
              <span className="mt-1 block text-sm leading-7 text-sand/60">
                Candidate tools, models, platforms, and weak signals waiting for classification or
                source verification.
              </span>
            </summary>

            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {discoveryItems.length > 0 ? (
                discoveryItems.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-wrap gap-2">
                      <span className={getPillClass(item.discovery_status)}>
                        {formatLabel(item.discovery_status)}
                      </span>
                      <span className={getPillClass(item.signal_quality)}>
                        {formatLabel(item.signal_quality)}
                      </span>
                      <span className={getPillClass(item.intake_priority)}>
                        {formatLabel(item.intake_priority)}
                      </span>
                      {item.source_group ? (
                        <span className={getPillClass(item.source_group)}>
                          {formatLabel(item.source_group)}
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                      {item.provider_name}
                    </p>

                    <h3 className="mt-2 text-lg font-bold tracking-tight text-sand">
                      {[item.product_name, item.model_name].filter(Boolean).join(' — ') ||
                        item.provider_name}
                    </h3>

                    <div className="mt-4 grid gap-3 rounded-2xl bg-[#F7FBFF] p-4">
                      {item.tool_category ? (
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                            Tool category
                          </p>
                          <p className="mt-1 text-sm leading-7 text-sand/65">
                            {formatLabel(item.tool_category)}
                          </p>
                        </div>
                      ) : null}

                      {item.training_department ? (
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                            Training department
                          </p>
                          <p className="mt-1 text-sm leading-7 text-sand/65">
                            {formatLabel(item.training_department)}
                          </p>
                        </div>
                      ) : null}

                      {item.primary_use_case ? (
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                            Primary use case
                          </p>
                          <p className="mt-1 text-sm leading-7 text-sand/65">
                            {formatLabel(item.primary_use_case)}
                          </p>
                        </div>
                      ) : null}

                      {item.audience_level ? (
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                            Audience level
                          </p>
                          <p className="mt-1 text-sm leading-7 text-sand/65">
                            {formatLabel(item.audience_level)}
                          </p>
                        </div>
                      ) : null}

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                          Added
                        </p>
                        <p className="mt-1 text-sm leading-7 text-sand/65">
                          {new Date(item.created_at).toLocaleString('en-GB')}
                        </p>
                      </div>
                    </div>

                    {item.discovery_summary ? (
                      <p className="mt-4 text-sm leading-7 text-sand/65">
                        {item.discovery_summary}
                      </p>
                    ) : null}

                    {item.practical_training_value ? (
                      <div className="mt-4 rounded-2xl border border-[#123BFF]/15 bg-[#EAF7FF] p-4">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                          Practical training value
                        </p>
                        <p className="mt-2 text-sm leading-7 text-sand/70">
                          {item.practical_training_value}
                        </p>
                      </div>
                    ) : null}

                    {item.social_noise_notes ? (
                      <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-900">
                          Social noise notes
                        </p>
                        <p className="mt-2 text-sm leading-7 text-amber-900">
                          {item.social_noise_notes}
                        </p>
                      </div>
                    ) : null}

                    {item.official_source_url || item.website_url || item.discovered_url ? (
                      <a
                        href={item.official_source_url || item.website_url || item.discovered_url || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#123BFF]/15 bg-[#EAF7FF] px-4 py-3 text-sm font-bold text-[#123BFF] transition hover:border-[#123BFF]/35 hover:bg-[#DDF1FF] sm:w-auto"
                      >
                        Open discovery source
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    ) : null}
                  </article>
                ))
              ) : (
                <div className="rounded-3xl border border-[#123BFF]/15 bg-[#EAF7FF] p-5 md:col-span-2 xl:col-span-3">
                  <p className="text-sm font-bold text-sand">
                    No AI discovery candidates recorded yet.
                  </p>
                  <p className="mt-3 text-sm leading-7 text-sand/65">
                    New tools, models, companies, apps, and weak discovery signals will appear here
                    before they are verified as trusted intake sources.
                  </p>
                </div>
              )}
            </div>
          </details>
        </section>
          </div>
        </details>


        <details className="mt-8 rounded-[2rem] border border-[#123BFF]/15 bg-[#F7FBFF] p-4 shadow-sm">
          <summary className="cursor-pointer list-none rounded-2xl bg-white px-4 py-3 shadow-sm">
            <span className="block text-sm font-bold text-sand">
              Show/hide Trusted Intake Feeds
            </span>
            <span className="mt-1 block text-sm leading-7 text-sand/60">
              Registered source feeds, taxonomy routing, check buttons, polling status, and feed-level errors.
            </span>
          </summary>

          <div className="mt-4 [&>section]:mt-0">
        <section className="mt-0 rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <Rss className="h-4 w-4" aria-hidden="true" />
                Trusted Intake Feeds
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                Official sources ready for monitored intelligence intake.
              </h2>

              <p className="mt-4 text-base leading-8 text-sand/65">
                These feeds are registered as trusted intake sources. They do not publish content or
                update lessons directly. They provide source signals for later scouting, review,
                approval, and downstream learning actions.
              </p>
            </div>

            <div className="rounded-3xl bg-[#EAF7FF] p-5 shadow-sm lg:max-w-md">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#123BFF]">
                Intake rule
              </p>
              <p className="mt-3 text-sm leading-7 text-sand/65">
                Feed monitoring should detect changes early, but every useful signal still needs
                Scout extraction, human review, and validation before it can influence the Academy or
                Sandbox.
              </p>
            </div>
          </div>

          {latestSourceFeedsError ? (
            <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm font-bold text-amber-900">
                Source feeds could not be read.
              </p>
              <p className="mt-2 text-sm leading-7 text-amber-800">
                Check the source_feeds table, schema cache, and admin-only RLS policy.
              </p>
            </div>
          ) : null}

          <details open className="mt-8 rounded-3xl border border-[#123BFF]/15 bg-[#F7FBFF] p-4">
            <summary className="cursor-pointer list-none rounded-2xl bg-white px-4 py-3 shadow-sm">
              <span className="block text-sm font-bold text-sand">
                Show/hide trusted feed cards
              </span>
              <span className="mt-1 block text-sm leading-7 text-sand/60">
                Registered source feeds, check buttons, polling status, and feed-level errors.
              </span>
            </summary>

          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sourceFeeds.length > 0 ? (
              sourceFeeds.map((feed) => (
                <article
                  key={feed.id}
                  className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap gap-2">
                    <span className={getPillClass(feed.status)}>
                      {formatLabel(feed.status)}
                    </span>
                    <span className={getPillClass(feed.feed_type)}>
                      {formatLabel(feed.feed_type)}
                    </span>
                    <span className={getPillClass(feed.trust_level)}>
                      {formatLabel(feed.trust_level)}
                    </span>
                    {feed.intake_priority ? (
                      <span className={getPillClass(feed.intake_priority)}>
                        {formatLabel(feed.intake_priority)}
                      </span>
                    ) : null}
                    {feed.source_group ? (
                      <span className={getPillClass(feed.source_group)}>
                        {formatLabel(feed.source_group)}
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                    {feed.provider}
                  </p>

                  <h3 className="mt-2 text-lg font-bold tracking-tight text-sand">
                    {feed.title}
                  </h3>

                  <div className="mt-4 grid gap-3 rounded-2xl bg-[#F7FBFF] p-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                        Source type
                      </p>
                      <p className="mt-1 text-sm leading-7 text-sand/65">
                        {formatLabel(feed.source_type)}
                      </p>
                    </div>

                    {feed.tool_category ? (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                          Tool category
                        </p>
                        <p className="mt-1 text-sm leading-7 text-sand/65">
                          {formatLabel(feed.tool_category)}
                        </p>
                      </div>
                    ) : null}

                    {feed.training_department ? (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                          Training department
                        </p>
                        <p className="mt-1 text-sm leading-7 text-sand/65">
                          {formatLabel(feed.training_department)}
                        </p>
                      </div>
                    ) : null}

                    {feed.primary_use_case ? (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                          Primary use case
                        </p>
                        <p className="mt-1 text-sm leading-7 text-sand/65">
                          {formatLabel(feed.primary_use_case)}
                        </p>
                      </div>
                    ) : null}

                    {feed.audience_level ? (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                          Audience level
                        </p>
                        <p className="mt-1 text-sm leading-7 text-sand/65">
                          {formatLabel(feed.audience_level)}
                        </p>
                      </div>
                    ) : null}

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                        Check rhythm
                      </p>
                      <p className="mt-1 text-sm leading-7 text-sand/65">
                        Every {formatCount(feed.poll_frequency_minutes)} minutes
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                        Last checked
                      </p>
                      <p className="mt-1 text-sm leading-7 text-sand/65">
                        {feed.last_checked_at ? new Date(feed.last_checked_at).toLocaleString('en-GB') : 'Not checked yet'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                        Academy / business / sandbox relevance
                      </p>
                      <p className="mt-1 text-sm leading-7 text-sand/65">
                        {[feed.academy_relevance, feed.business_relevance, feed.sandbox_relevance]
                          .filter(Boolean)
                          .map((value) => formatLabel(value as string))
                          .join(' / ') || 'Not classified yet'}
                      </p>
                    </div>
                  </div>

                  {feed.last_error ? (
                    <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-900">
                        Last error
                      </p>
                      <p className="mt-2 text-sm leading-7 text-amber-900">
                        {feed.last_error}
                      </p>
                    </div>
                  ) : null}

                  <CheckFeedButton feedId={feed.id} feedType={feed.feed_type} />
                </article>
              ))
            ) : (
              <div className="rounded-3xl border border-[#123BFF]/15 bg-[#EAF7FF] p-5 md:col-span-2 xl:col-span-3">
                <p className="text-sm font-bold text-sand">No source feeds registered yet.</p>
                <p className="mt-3 text-sm leading-7 text-sand/65">
                  Add trusted source feeds in Supabase before building feed checks or automated
                  signal intake.
                </p>
              </div>
            )}
          </div>
          </details>
        </section>
          </div>
        </details>


        <section className="mt-8 rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <Rss className="h-4 w-4" aria-hidden="true" />
                Source Signals
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                Newest feed items waiting for review.
              </h2>

              <p className="mt-4 text-base leading-8 text-sand/65">
                Feed checks create source signals only. These items show what the intake layer has
                detected, but they still need Scout extraction, review, approval, and validation
                before they affect lessons, sandbox tasks, tool intelligence, or business training.
              </p>
            </div>

            <div className="rounded-3xl bg-[#EAF7FF] p-5 shadow-sm lg:max-w-md">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#123BFF]">
                Review boundary
              </p>
              <p className="mt-3 text-sm leading-7 text-sand/65">
                A feed item is not a Brain record. It is an intake signal that helps decide what the
                Scout workflow should inspect next.
              </p>
            </div>
          </div>

          {latestSourceFeedItemsError ? (
            <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm font-bold text-amber-900">
                Source signals could not be read.
              </p>
              <p className="mt-2 text-sm leading-7 text-amber-800">
                Check the source_feed_items table, schema cache, selected columns, and admin-only RLS
                policy.
              </p>
            </div>
          ) : null}

          <details open className="mt-8 rounded-3xl border border-[#123BFF]/15 bg-[#F7FBFF] p-4">
            <summary className="cursor-pointer list-none rounded-2xl bg-white px-4 py-3 shadow-sm">
              <span className="block text-sm font-bold text-sand">
                Show/hide source signal cards
              </span>
              <span className="mt-1 block text-sm leading-7 text-sand/60">
                Detected feed items, review statuses, and signal action controls.
              </span>
            </summary>

          <div className="mt-4 grid gap-4">
            {sourceFeedItems.length > 0 ? (
              sourceFeedItems.map((item) => (
                <article
                  key={item.id}
                  className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap gap-2">
                    <span className={getPillClass(item.signal_type)}>
                      {formatLabel(item.signal_type)}
                    </span>
                    <span className={getPillClass(item.relevance_status)}>
                      {formatLabel(item.relevance_status)}
                    </span>
                    <span className={getPillClass(item.review_status)}>
                      {formatLabel(item.review_status)}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
                    <div className="rounded-2xl bg-[#F7FBFF] p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                        Provider
                      </p>
                      <p className="mt-2 text-sm font-bold leading-7 text-sand">
                        {item.provider}
                      </p>

                      <div className="mt-4 grid gap-3">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                            Published
                          </p>
                          <p className="mt-1 text-sm leading-7 text-sand/65">
                            {item.published_at
                              ? new Date(item.published_at).toLocaleString('en-GB')
                              : 'No published date recorded'}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                            Detected
                          </p>
                          <p className="mt-1 text-sm leading-7 text-sand/65">
                            {item.detected_at
                              ? new Date(item.detected_at).toLocaleString('en-GB')
                              : 'No detected date recorded'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-sand">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-sand/65">
                        {item.summary ||
                          'No summary was supplied by the feed. Open the source item before scouting or reviewing this signal.'}
                      </p>

                      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start">
                        <a
                          href={item.item_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#123BFF]/15 bg-[#EAF7FF] px-4 py-3 text-sm font-bold text-[#123BFF] transition hover:border-[#123BFF]/35 hover:bg-[#DDF1FF] sm:w-auto"
                        >
                          Open source item
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </a>

                        {['archived', 'duplicate', 'ignored'].includes(item.review_status) ? (
                          <SourceSignalActionButton signalId={item.id} action="restore" />
                        ) : (
                          <>
                            <SourceSignalScoutButton
                              sourceUrl={item.item_url}
                              signalTitle={item.title}
                              signalSummary={item.summary}
                            />
                            <SourceSignalActionButton signalId={item.id} action="archive" />
                            <SourceSignalActionButton signalId={item.id} action="duplicate" />
                            <SourceSignalActionButton signalId={item.id} action="ignore" />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-3xl border border-[#123BFF]/15 bg-[#EAF7FF] p-5">
                <p className="text-sm font-bold text-sand">No source signals detected yet.</p>
                <p className="mt-3 text-sm leading-7 text-sand/65">
                  Use Check feed now on a supported trusted intake feed. New RSS, Atom, or GitHub
                  release items will appear here before they move into Scout review.
                </p>
              </div>
            )}
          </div>
          </details>
        </section>

        <section className="mt-8 rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Brain Health Summary
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                Operational health at a glance.
              </h2>

              <p className="mt-4 text-base leading-8 text-sand/65">
                This summary separates active review work from historical records, archived
                findings, verified intelligence, and failed agent activity.
              </p>
            </div>

            <div className="rounded-3xl bg-[#EAF7FF] p-5 shadow-sm lg:max-w-md">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#123BFF]">
                Queue rule
              </p>
              <p className="mt-3 text-sm leading-7 text-sand/65">
                Active review should stay small. Useful findings become Brain records; weak,
                duplicated, or low-priority findings are archived for audit history.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {brainHealthCards.map((item) => (
              <article
                key={item.label}
                className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                  {item.label}
                </p>

                <p className="mt-3 text-4xl font-bold tracking-tight text-sand">
                  {item.hasError ? '—' : formatCount(item.count)}
                </p>

                <p className="mt-3 text-sm leading-7 text-sand/65">
                  {item.hasError
                    ? 'This health check could not be read. Check schema cache or RLS policy.'
                    : item.description}
                </p>
              </article>
            ))}
          </div>

          {brainHealthReadErrors > 0 ? (
            <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm font-bold text-amber-900">
                One or more Brain health checks need attention.
              </p>
              <p className="mt-2 text-sm leading-7 text-amber-800">
                The Brain is still available, but one health metric could not be read from Supabase.
              </p>
            </div>
          ) : null}
        </section>

        <section className="mt-8 rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <Database className="h-4 w-4" aria-hidden="true" />
                Supabase Brain tables
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                The Brain foundation is live.
              </h2>

              <p className="mt-4 text-base leading-8 text-sand/65">
                These cards read from the actual Supabase tables behind the Brain. They should stay
                empty until real sources, records, reviews, and agent findings are created through
                controlled workflows.
              </p>
            </div>

            <div className="rounded-3xl bg-[#EAF7FF] p-5 shadow-sm lg:max-w-md">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#123BFF]">
                Data rule
              </p>
              <p className="mt-3 text-sm leading-7 text-sand/65">
                No fake seed data. The first Brain records should be source-backed, traceable, and
                useful enough to influence lessons, sandbox tasks, or tool intelligence.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {liveCounts.map((item) => {
              const Icon = item.icon

              return (
                <article
                  key={item.table}
                  className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>

                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                    {item.label}
                  </p>

                  <p className="mt-2 text-4xl font-bold tracking-tight text-sand">
                    {item.hasError ? '—' : formatCount(item.count)}
                  </p>

                  <p className="mt-3 text-sm leading-7 text-sand/65">
                    {item.hasError
                      ? 'Unable to read this table count. Check schema cache or RLS policy.'
                      : item.description}
                  </p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                {reviewView === 'archived' ? 'Archived Findings' : 'Active Review Queue'}
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                {reviewView === 'archived'
                  ? 'Restore archived Scout findings when they deserve another review.'
                  : 'Review active Scout findings before they become Brain records.'}
              </h2>

              <p className="mt-4 text-base leading-8 text-sand/65">
                {reviewView === 'archived'
                  ? 'Archived findings are retained for database health and audit history. Restore only the items that deserve another review pass.'
                  : 'Active Scout findings are private candidate signals. They are useful only after review: each one still needs validation, source judgement, and a decision about whether it should affect lessons, sandbox tasks, tool intelligence, or business training.'}
              </p>
            </div>

            <div className="rounded-3xl bg-[#EAF7FF] p-5 shadow-sm lg:max-w-md">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#123BFF]">
                {reviewView === 'archived' ? 'Archive rule' : 'Review rule'}
              </p>
              <p className="mt-3 text-sm leading-7 text-sand/65">
                {reviewView === 'archived'
                  ? 'Archived findings are hidden from the active queue but can be restored when their practical value becomes clearer.'
                  : 'Scout output is not published content. Active findings stay here for human review and later promotion into verified Master Brain records.'}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/brain?review=active"
              className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] shadow-sm transition ${
                reviewView === 'active'
                  ? 'bg-[#123BFF] text-white'
                  : 'bg-[#EAF7FF] text-[#123BFF] hover:bg-[#123BFF] hover:text-white'
              }`}
            >
              Active review queue
            </Link>

            <Link
              href="/brain?review=archived"
              className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] shadow-sm transition ${
                reviewView === 'archived'
                  ? 'bg-[#123BFF] text-white'
                  : 'bg-[#EAF7FF] text-[#123BFF] hover:bg-[#123BFF] hover:text-white'
              }`}
            >
              Archived findings
            </Link>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {latestFindings.length > 0 ? (
              latestFindings.map((finding) => (
                <article
                  key={finding.id}
                  className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap gap-2">
                    <span className={getPillClass(finding.finding_type)}>
                      {formatLabel(finding.finding_type)}
                    </span>
                    <span className={getPillClass(finding.validation_status)}>
                      {formatLabel(finding.validation_status)}
                    </span>
                    <span className={getPillClass(finding.confidence_level)}>
                      {formatLabel(finding.confidence_level)}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold tracking-tight text-sand">
                    {finding.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-sand/65">{finding.summary}</p>

                  {finding.recommended_action ? (
                    <div className="mt-5 rounded-2xl bg-[#EAF7FF] p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                        Recommended action
                      </p>
                      <p className="mt-2 text-sm leading-7 text-sand/65">
                        {finding.recommended_action}
                      </p>
                    </div>
                  ) : null}

                  {reviewView === 'archived' ? (
                    <RestoreFindingButton findingId={finding.id} />
                  ) : (
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                      <ApproveFindingButton
                        findingId={finding.id}
                        disabled={
                          finding.validation_status === 'verified' ||
                          Boolean(finding.related_master_brain_record_id)
                        }
                      />

                      <ArchiveFindingButton
                        findingId={finding.id}
                        disabled={
                          finding.validation_status === 'verified' ||
                          Boolean(finding.related_master_brain_record_id)
                        }
                      />
                    </div>
                  )}
                </article>
              ))
            ) : (
              <div className="rounded-3xl border border-[#123BFF]/15 bg-[#EAF7FF] p-5 lg:col-span-2">
                <p className="text-sm font-bold text-sand">
                  {reviewView === 'archived' ? 'No archived Scout findings.' : 'No active Scout findings.'}
                </p>
                <p className="mt-3 text-sm leading-7 text-sand/65">
                  {reviewView === 'archived'
                    ? 'Archived findings will appear here after low-priority, duplicated, or weak signals are removed from the active queue.'
                    : 'Run the Source Scout against an official source to create private candidate findings, or review the existing verified and archived history in Supabase.'}
                </p>
              </div>
            )}
          </div>

          {latestAgentFindingsError ? (
            <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm font-bold text-amber-900">
                Latest-findings read check needs attention.
              </p>
              <p className="mt-2 text-sm leading-7 text-amber-800">
                The Brain could not read recent agent findings. Check the agent_findings schema or
                RLS policy.
              </p>
            </div>
          ) : null}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
              <BrainCircuit className="h-4 w-4" aria-hidden="true" />
              Latest Brain records
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand">
              {latestRecords.length > 0 ? 'Most recent records.' : 'No Brain records yet.'}
            </h2>

            <p className="mt-4 text-base leading-8 text-sand/65">
              Master Brain records should only be created when a source-backed claim has practical
              meaning and a clear connection to lessons, sandbox tasks, tool intelligence, or
              business training.
            </p>

            <div className="mt-7 grid gap-4">
              {latestRecords.length > 0 ? (
                latestRecords.map((record, index) => {
                  const practicalMeaningParagraphs = splitParagraphs(record.practical_meaning)
                  const businessImpact =
                    getStructuredString(record.structured_content, 'business_impact') ||
                    record.business_relevance
                  const lessonImpact = getStructuredString(record.structured_content, 'lesson_impact')
                  const sandboxImpact = getStructuredString(record.structured_content, 'sandbox_impact')
                  const sourceNote = getStructuredString(record.structured_content, 'source_note')
                  const isMostRecent = index === 0

                  return (
                    <details
                      key={record.id}
                      open={isMostRecent}
                      className="group rounded-3xl border border-sand/10 bg-white p-5 shadow-sm"
                    >
                      <summary className="cursor-pointer list-none">
                        <div>
                          <div className="flex flex-wrap gap-2">
                            <span className={getPillClass(record.record_type)}>
                              {formatLabel(record.record_type)}
                            </span>
                            <span className={getPillClass(record.validation_status)}>
                              {formatLabel(record.validation_status)}
                            </span>
                            <span className={getPillClass(record.publication_status)}>
                              {formatLabel(record.publication_status)}
                            </span>

                            {!isMostRecent ? (
                              <span className="inline-flex items-center justify-center rounded-full bg-[#EAF7FF] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#123BFF] transition group-open:bg-[#123BFF] group-open:text-white">
                                <span className="group-open:hidden">Open</span>
                                <span className="hidden group-open:inline">Close</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center justify-center rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#047857]">
                                Most recent
                              </span>
                            )}
                          </div>

                          <h3 className="mt-4 text-lg font-bold tracking-tight text-sand">
                            {record.title}
                          </h3>

                          <p className="mt-3 text-sm leading-7 text-sand/65">
                            {record.summary}
                          </p>
                        </div>
                      </summary>

                      <div className="mt-5 border-t border-sand/10 pt-5">
                        {practicalMeaningParagraphs.length > 0 ? (
                          <div className="rounded-2xl bg-[#EAF7FF] p-4">
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                              Practical meaning
                            </p>
                            <div className="mt-2 grid gap-2">
                              {practicalMeaningParagraphs.map((paragraph) => (
                                <p key={paragraph} className="text-sm leading-7 text-sand/65">
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                          </div>
                        ) : null}

                        {businessImpact || lessonImpact || sandboxImpact ? (
                          <div className="mt-5 grid gap-3">
                            {businessImpact ? (
                              <div className="rounded-2xl border border-sand/10 bg-white p-4 shadow-sm">
                                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                                  Business impact
                                </p>
                                <p className="mt-2 text-sm leading-7 text-sand/65">
                                  {businessImpact}
                                </p>
                              </div>
                            ) : null}

                            {lessonImpact ? (
                              <div className="rounded-2xl border border-sand/10 bg-white p-4 shadow-sm">
                                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                                  Lesson impact
                                </p>
                                <p className="mt-2 text-sm leading-7 text-sand/65">
                                  {lessonImpact}
                                </p>
                              </div>
                            ) : null}

                            {sandboxImpact ? (
                              <div className="rounded-2xl border border-sand/10 bg-white p-4 shadow-sm">
                                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                                  Sandbox impact
                                </p>
                                <p className="mt-2 text-sm leading-7 text-sand/65">
                                  {sandboxImpact}
                                </p>
                              </div>
                            ) : null}
                          </div>
                        ) : null}

                        {sourceNote ? (
                          <div className="mt-5 rounded-2xl bg-[#F7FBFF] p-4">
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                              Source note
                            </p>
                            <p className="mt-2 text-sm leading-7 text-sand/65">{sourceNote}</p>
                          </div>
                        ) : null}

                        {record.uncertainty_notes ? (
                          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-900">
                              Review note
                            </p>
                            <p className="mt-2 text-sm leading-7 text-amber-900">
                              {record.uncertainty_notes}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </details>
                  )
                })
              ) : (
                <div className="rounded-3xl border border-[#123BFF]/15 bg-[#EAF7FF] p-5">
                  <p className="text-sm font-bold text-sand">Ready for the first verified record.</p>
                  <p className="mt-3 text-sm leading-7 text-sand/65">
                    Start with a source, classify its quality, extract the claim, then create a
                    Brain record only when it has practical learning or tool-intelligence value.
                  </p>
                </div>
              )}

              {latestBrainRecordsError ? (
                <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
                  <p className="text-sm font-bold text-amber-900">
                    Latest-record read check needs attention.
                  </p>
                  <p className="mt-2 text-sm leading-7 text-amber-800">
                    The page could read table counts, but the latest-record query needs schema or
                    RLS review.
                  </p>
                </div>
              ) : null}
            </div>
          </article>

          <article className="rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
              <GitBranch className="h-4 w-4" aria-hidden="true" />
              Intelligence pipeline
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand">
              From signal to skill action.
            </h2>

            <p className="mt-4 text-base leading-8 text-sand/65">
              The Brain makes every important AI update traceable: where it came from, how reliable
              it is, what it means, who it affects, and whether it should update lessons, sandbox
              tasks, tool comparisons, or business training.
            </p>

            <div className="mt-7 grid gap-4">
              {brainPipeline.map((item, index) => {
                const Icon = item.icon

                return (
                  <article
                    key={item.title}
                    className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm"
                  >
                    <div className="flex gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                          Step {index + 1}
                        </p>
                        <h3 className="mt-1 text-lg font-bold tracking-tight text-sand">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-sand/65">{item.description}</p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </article>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
              <Database className="h-4 w-4" aria-hidden="true" />
              Record schema
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand">
              Every Brain record needs structure.
            </h2>

            <p className="mt-4 text-base leading-8 text-sand/65">
              The database should not store loose notes. Each record needs enough structure to
              connect sources, confidence, validation, skills, lessons, sandbox tasks, and business
              implications.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {recordFields.map((field) => (
                <div key={field} className="rounded-2xl bg-[#EAF7FF] p-4">
                  <div className="flex gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#123BFF]"
                      aria-hidden="true"
                    />
                    <p className="text-sm font-semibold leading-7 text-sand/70">{field}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
              <Layers3 className="h-4 w-4" aria-hidden="true" />
              Command zones
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand">
              The Brain connects the product pillars.
            </h2>

            <p className="mt-4 text-base leading-8 text-sand/65">
              This command centre now has a live Supabase foundation. The next step is adding
              controlled actions for sources, validation, Brain records, and agent findings.
            </p>

            <div className="mt-7 grid gap-4">
              {commandZones.map((zone) => (
                <div key={zone.title} className="rounded-3xl border border-sand/10 bg-white p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                    {zone.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-sand/65">{zone.description}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <Network className="h-4 w-4" aria-hidden="true" />
                Agent map
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                Agents serve the Brain. The Brain does not publish blindly.
              </h2>

              <p className="mt-4 text-base leading-8 text-sand/65">
                Future agents should create candidate signals, classifications, recommendations, and
                tasks for review rather than publishing directly.
              </p>
            </div>

            <div className="rounded-3xl bg-[#EAF7FF] p-5 shadow-sm lg:max-w-md">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#123BFF]">
                Automation boundary
              </p>
              <p className="mt-3 text-sm leading-7 text-sand/65">
                Automated agents can recommend. Validation, publication, and business-sensitive
                guidance need controlled review and clear confidence status.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {agentRoles.map((agent) => (
              <article
                key={agent.title}
                className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                  <Sparkles className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-sand">{agent.title}</h3>
                <p className="mt-3 text-sm leading-7 text-sand/65">{agent.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                Next build step
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                Next: create the first controlled Brain action.
              </h2>

              <p className="mt-4 max-w-3xl text-base leading-8 text-white/80">
                The tables are live. The next implementation step is a private admin workflow for
                creating source records, then connecting a verified source to a Master Brain record.
              </p>
            </div>

            <div className="rounded-[2rem] bg-white p-6 text-sand shadow-sm">
              <h3 className="text-xl font-bold tracking-tight text-sand">
                Protected by account identity.
              </h3>
              <p className="mt-3 text-sm leading-7 text-sand/65">
                This page checks the signed-in Supabase user on the server and only allows the
                configured platform admin email to view the Brain.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/account"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                >
                  Account
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/sandbox"
                  className="inline-flex items-center justify-center rounded-2xl border border-sand/10 bg-white px-5 py-3 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                >
                  Sandbox
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
















