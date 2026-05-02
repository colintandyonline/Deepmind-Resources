import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BrainCircuit,
  Database,
  FileSearch,
  GitBranch,
  Layers3,
  Link2,
  LockKeyhole,
  Network,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Tags,
  Workflow,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

const BRAIN_ADMIN_EMAIL = 'colintandy@gmail.com'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'AI Catalogue | DeepMind Resources',
  description:
    'Private DeepMind Resources AI catalogue index for reviewing companies, platforms, model families, models, capabilities, comparison groups, and catalogue relationships.',
  robots: {
    index: false,
    follow: false,
  },
}

type CataloguePageSearchParams = {
  entity?: string
  search?: string
  type?: string
}

type CatalogueRecord = Record<string, unknown>

type CatalogueTableName =
  | 'ai_catalog_entities'
  | 'ai_catalog_entity_links'
  | 'ai_catalog_capabilities'
  | 'ai_catalog_entity_capabilities'
  | 'ai_catalog_comparison_groups'
  | 'ai_catalog_entity_comparison_groups'

type CatalogueCountCard = {
  table: CatalogueTableName
  label: string
  description: string
  icon: typeof Database
  baseline: string
}

type CataloguePageProps = {
  searchParams?: Promise<CataloguePageSearchParams>
}

const catalogueCountCards: CatalogueCountCard[] = [
  {
    table: 'ai_catalog_entities',
    label: 'Catalogue entities',
    description:
      'Companies, platforms, model families, and individual models in the AI landscape map.',
    icon: Database,
    baseline: '503 expected from current seed',
  },
  {
    table: 'ai_catalog_entity_links',
    label: 'Entity relationship links',
    description:
      'Relationship spine connecting companies, platforms, model families, and models.',
    icon: GitBranch,
    baseline: 'Relationship spine',
  },
  {
    table: 'ai_catalog_capabilities',
    label: 'Capabilities',
    description:
      'Training routing taxonomy for what entities can do and where they matter.',
    icon: Tags,
    baseline: '42 expected',
  },
  {
    table: 'ai_catalog_entity_capabilities',
    label: 'Entity capability links',
    description:
      'Connections between catalogue entities and useful training capability areas.',
    icon: Network,
    baseline: '197 expected',
  },
  {
    table: 'ai_catalog_comparison_groups',
    label: 'Comparison groups',
    description:
      'Scenario-based comparison buckets for Academy lessons and sandbox tasks.',
    icon: Layers3,
    baseline: '28 expected',
  },
  {
    table: 'ai_catalog_entity_comparison_groups',
    label: 'Entity comparison links',
    description:
      'Connections between entities and the comparison groups they belong to.',
    icon: Workflow,
    baseline: '182 expected',
  },
]

const priorityFieldKeys = [
  'id',
  'name',
  'title',
  'slug',
  'entity_type',
  'type',
  'catalog_entity_type',
  'provider_name',
  'product_name',
  'model_name',
  'model_family',
  'website_url',
  'official_source_url',
  'source_group',
  'tool_category',
  'product_area',
  'capability_area',
  'training_department',
  'primary_use_case',
  'audience_level',
  'discovery_status',
  'signal_quality',
  'validation_status',
  'publication_status',
  'status',
  'created_at',
  'updated_at',
]

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function formatCount(value: number) {
  return new Intl.NumberFormat('en-GB').format(value)
}

function getRecordId(record: CatalogueRecord) {
  const value = record.id

  return isNonEmptyString(value) ? value : null
}

function getFirstText(record: CatalogueRecord, keys: string[]) {
  for (const key of keys) {
    const value = record[key]

    if (isNonEmptyString(value)) {
      return value.trim()
    }
  }

  return null
}

function getEntityName(record: CatalogueRecord) {
  return (
    getFirstText(record, [
      'name',
      'title',
      'display_name',
      'entity_name',
      'provider_name',
      'product_name',
      'model_name',
      'model_family',
      'slug',
    ]) ??
    getRecordId(record) ??
    'Untitled catalogue entry'
  )
}

function getEntityType(record: CatalogueRecord) {
  return getFirstText(record, [
    'entity_type',
    'catalog_entity_type',
    'type',
    'kind',
    'category',
    'source_group',
  ])
}

function getEntitySummary(record: CatalogueRecord) {
  return getFirstText(record, [
    'summary',
    'description',
    'short_description',
    'discovery_summary',
    'practical_training_value',
    'notes',
    'taxonomy_notes',
  ])
}

function getEntityStatus(record: CatalogueRecord) {
  return getFirstText(record, [
    'validation_status',
    'publication_status',
    'discovery_status',
    'signal_quality',
    'status',
  ])
}

function getReadableLabel(value: string) {
  return value
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase())
}

function formatValue(value: unknown) {
  if (value === null || value === undefined) {
    return '—'
  }

  if (typeof value === 'string') {
    return value.trim() || '—'
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }

  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return String(value)
  }
}

function getSearchableText(record: CatalogueRecord) {
  return Object.values(record)
    .filter((value) => value !== null && value !== undefined)
    .map((value) => formatValue(value))
    .join(' ')
    .toLowerCase()
}

function recordMatchesSearch(record: CatalogueRecord, searchQuery: string) {
  if (!searchQuery.trim()) {
    return true
  }

  return getSearchableText(record).includes(searchQuery.trim().toLowerCase())
}

function recordMatchesType(record: CatalogueRecord, typeFilter: string | null) {
  if (!typeFilter) {
    return true
  }

  return getEntityType(record) === typeFilter
}

function buildCatalogueHref(params: {
  entity?: string | null
  search?: string | null
  type?: string | null
}) {
  const query = new URLSearchParams()

  if (params.entity) {
    query.set('entity', params.entity)
  }

  if (params.search) {
    query.set('search', params.search)
  }

  if (params.type) {
    query.set('type', params.type)
  }

  const queryString = query.toString()

  return queryString ? `/brain/catalog?${queryString}` : '/brain/catalog'
}

function getPriorityFields(record: CatalogueRecord) {
  return priorityFieldKeys
    .filter((key) => Object.prototype.hasOwnProperty.call(record, key))
    .map((key) => [key, record[key]] as const)
}

function getRemainingFields(record: CatalogueRecord) {
  return Object.entries(record).filter(([key]) => !priorityFieldKeys.includes(key))
}

function recordContainsExactValue(record: CatalogueRecord, selectedId: string) {
  return Object.entries(record).some(([key, value]) => {
    if (key === 'id') {
      return false
    }

    return value === selectedId
  })
}

function getLinkedIds(record: CatalogueRecord, selectedId: string) {
  return Object.entries(record)
    .filter(([key, value]) => {
      if (key === 'id') {
        return false
      }

      return key.toLowerCase().includes('id') && isNonEmptyString(value) && value !== selectedId
    })
    .map(([key, value]) => ({
      key,
      value: value as string,
    }))
}

function getRelationshipLabel(record: CatalogueRecord) {
  return (
    getFirstText(record, [
      'relationship_type',
      'relation_type',
      'link_type',
      'relationship',
      'type',
      'status',
    ]) ?? 'relationship'
  )
}

function getMatchingRecordsFromLinks(
  linkRows: CatalogueRecord[],
  records: CatalogueRecord[],
  selectedId: string,
  keyIncludes: string[],
) {
  const matchedIds = new Set<string>()

  for (const row of linkRows) {
    for (const [key, value] of Object.entries(row)) {
      const lowerKey = key.toLowerCase()
      const matchesKey = keyIncludes.some((keyword) => lowerKey.includes(keyword))

      if (matchesKey && isNonEmptyString(value) && value !== selectedId) {
        matchedIds.add(value)
      }
    }
  }

  return records.filter((record) => {
    const id = getRecordId(record)

    return Boolean(id && matchedIds.has(id))
  })
}

function getDisplayNameById(records: CatalogueRecord[], id: string) {
  const match = records.find((record) => getRecordId(record) === id)

  return match ? getEntityName(match) : id
}

function getReadErrorMessage(error: unknown) {
  if (!error) {
    return null
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    const message = (error as { message?: unknown }).message

    if (isNonEmptyString(message)) {
      return message
    }
  }

  return 'Unknown read error'
}

export default async function BrainCataloguePage({ searchParams }: CataloguePageProps) {
  const resolvedSearchParams = await searchParams
  const selectedEntityId = resolvedSearchParams?.entity ?? null
  const searchQuery = resolvedSearchParams?.search?.trim() ?? ''
  const typeFilter = resolvedSearchParams?.type?.trim() || null

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
    catalogueCountCards.map(async (card) => {
      const { count, error } = await supabase
        .from(card.table)
        .select('*', {
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

  const [
    entitiesResult,
    entityLinksResult,
    capabilitiesResult,
    entityCapabilitiesResult,
    comparisonGroupsResult,
    entityComparisonGroupsResult,
  ] = await Promise.all([
    supabase.from('ai_catalog_entities').select('*').limit(1000),
    supabase.from('ai_catalog_entity_links').select('*').limit(1000),
    supabase.from('ai_catalog_capabilities').select('*').limit(1000),
    supabase.from('ai_catalog_entity_capabilities').select('*').limit(1000),
    supabase.from('ai_catalog_comparison_groups').select('*').limit(1000),
    supabase.from('ai_catalog_entity_comparison_groups').select('*').limit(1000),
  ])

  const catalogueEntities = (entitiesResult.data ?? []) as CatalogueRecord[]
  const entityLinks = (entityLinksResult.data ?? []) as CatalogueRecord[]
  const capabilities = (capabilitiesResult.data ?? []) as CatalogueRecord[]
  const entityCapabilityLinks = (entityCapabilitiesResult.data ?? []) as CatalogueRecord[]
  const comparisonGroups = (comparisonGroupsResult.data ?? []) as CatalogueRecord[]
  const entityComparisonGroupLinks = (entityComparisonGroupsResult.data ?? []) as CatalogueRecord[]

  const catalogueTypes = Array.from(
    new Set(
      catalogueEntities
        .map((record) => getEntityType(record))
        .filter((value): value is string => Boolean(value)),
    ),
  ).sort((first, second) => first.localeCompare(second))

  const filteredEntities = catalogueEntities
    .filter((record) => recordMatchesSearch(record, searchQuery))
    .filter((record) => recordMatchesType(record, typeFilter))
    .slice(0, 120)

  const selectedEntity =
    catalogueEntities.find((record) => getRecordId(record) === selectedEntityId) ??
    filteredEntities[0] ??
    null

  const selectedId = selectedEntity ? getRecordId(selectedEntity) : null

  const selectedRelationshipLinks = selectedId
    ? entityLinks.filter((record) => recordContainsExactValue(record, selectedId))
    : []

  const selectedCapabilityLinks = selectedId
    ? entityCapabilityLinks.filter((record) => recordContainsExactValue(record, selectedId))
    : []

  const selectedComparisonLinks = selectedId
    ? entityComparisonGroupLinks.filter((record) => recordContainsExactValue(record, selectedId))
    : []

  const selectedCapabilities = selectedId
    ? getMatchingRecordsFromLinks(selectedCapabilityLinks, capabilities, selectedId, ['capability'])
    : []

  const selectedComparisonGroups = selectedId
    ? getMatchingRecordsFromLinks(selectedComparisonLinks, comparisonGroups, selectedId, [
        'comparison',
        'group',
      ])
    : []

  const totalCatalogueRows = liveCounts.reduce((total, item) => total + item.count, 0)
  const readErrors = liveCounts.filter((item) => item.hasError).length

  const readErrorMessages = [
    ['Entities', entitiesResult.error],
    ['Entity links', entityLinksResult.error],
    ['Capabilities', capabilitiesResult.error],
    ['Entity capabilities', entityCapabilitiesResult.error],
    ['Comparison groups', comparisonGroupsResult.error],
    ['Entity comparison groups', entityComparisonGroupsResult.error],
  ]
    .map(([label, error]) => {
      const message = getReadErrorMessage(error)

      return message ? `${label}: ${message}` : null
    })
    .filter((message): message is string => Boolean(message))

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
                  AI Catalogue
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF7FF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                  <LockKeyhole className="h-4 w-4" aria-hidden="true" />
                  Private catalogue index
                </span>
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-sand sm:text-5xl lg:text-6xl">
                Browse the AI catalogue spine.
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-sand/65 sm:text-lg">
                Search catalogue entities, open an individual entry, and inspect its raw fields,
                relationship links, capability links, and comparison-group links. This is still a
                private internal page, but it is structured like the future client-facing catalogue
                experience.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/brain"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
                >
                  Return to Master Brain
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
                <BarChart3 className="h-4 w-4" aria-hidden="true" />
                Live catalogue read
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight">
                {formatCount(totalCatalogueRows)} catalogue rows currently readable.
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/82">
                This total comes from the six catalogue foundation tables using read-only aggregate
                checks. No catalogue records are edited from this page.
              </p>

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm font-bold text-white">Access state</p>
                  <p className="mt-1 text-sm leading-6 text-white/75">
                    Server-protected and restricted to the configured Brain admin account.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm font-bold text-white">Read checks</p>
                  <p className="mt-1 text-sm leading-6 text-white/75">
                    {readErrors === 0 && readErrorMessages.length === 0
                      ? 'All catalogue table count and index reads returned successfully.'
                      : `${readErrors + readErrorMessages.length} catalogue read check${
                          readErrors + readErrorMessages.length === 1 ? '' : 's'
                        } need attention.`}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </header>

        {readErrorMessages.length > 0 ? (
          <section className="mt-8 rounded-[2rem] border border-red-200 bg-red-50 p-6 text-red-800 shadow-sm">
            <h2 className="text-xl font-bold">Catalogue read warning</h2>
            <ul className="mt-4 space-y-2 text-sm leading-7">
              {readErrorMessages.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {liveCounts.map((card) => {
            const Icon = card.icon

            return (
              <article
                key={card.table}
                className="rounded-3xl border border-sand/10 bg-white/92 p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${
                      card.hasError
                        ? 'bg-red-50 text-red-700'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {card.hasError ? 'Read check failed' : 'Read check passed'}
                  </span>
                </div>

                <p className="mt-6 text-4xl font-bold tracking-tight text-sand">
                  {formatCount(card.count)}
                </p>

                <h2 className="mt-3 text-xl font-bold tracking-tight text-sand">{card.label}</h2>

                <p className="mt-3 text-sm leading-7 text-sand/65">{card.description}</p>

                <div className="mt-5 rounded-2xl bg-[#EAF7FF] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                    Baseline
                  </p>
                  <p className="mt-2 text-sm font-semibold text-sand">{card.baseline}</p>
                </div>
              </article>
            )
          })}
        </section>

        <section className="mt-8 rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                <Search className="h-4 w-4" aria-hidden="true" />
                Catalogue index
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                Open any catalogue entry.
              </h2>

              <p className="mt-4 text-base leading-8 text-sand/65">
                Use the search and type filter to narrow the catalogue. Each item opens its own
                detail space on this page using the entity ID in the URL.
              </p>
            </div>

            <div className="rounded-3xl bg-[#EAF7FF] p-5 shadow-sm lg:max-w-sm">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#123BFF]">
                Showing
              </p>
              <p className="mt-3 text-2xl font-bold text-sand">
                {formatCount(filteredEntities.length)} of {formatCount(catalogueEntities.length)}
              </p>
              <p className="mt-2 text-sm leading-7 text-sand/65">
                The page reads up to 1,000 catalogue entities for this private index view.
              </p>
            </div>
          </div>

          <form className="mt-8 grid gap-4 rounded-3xl border border-sand/10 bg-white p-5 md:grid-cols-[1fr_0.5fr_auto]">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-sand/60">
                Search catalogue
              </span>
              <input
                name="search"
                defaultValue={searchQuery}
                placeholder="Search names, slugs, types, departments, notes..."
                className="mt-2 w-full rounded-2xl border border-sand/10 bg-[#F8FCFF] px-4 py-3 text-sm font-semibold text-sand outline-none transition placeholder:text-sand/35 focus:border-[#123BFF]/40"
              />
            </label>

            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-sand/60">
                Entity type
              </span>
              <select
                name="type"
                defaultValue={typeFilter ?? ''}
                className="mt-2 w-full rounded-2xl border border-sand/10 bg-[#F8FCFF] px-4 py-3 text-sm font-semibold text-sand outline-none transition focus:border-[#123BFF]/40"
              >
                <option value="">All types</option>
                {catalogueTypes.map((type) => (
                  <option key={type} value={type}>
                    {getReadableLabel(type)}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex items-end gap-3">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-[#123BFF] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF] md:w-auto"
              >
                Search
              </button>

              <Link
                href="/brain/catalog"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-sand/10 bg-white px-5 py-3 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF] md:w-auto"
              >
                Reset
              </Link>
            </div>
          </form>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <aside className="max-h-[44rem] overflow-y-auto rounded-3xl border border-sand/10 bg-[#F8FCFF] p-4">
              <div className="grid gap-3">
                {filteredEntities.length > 0 ? (
                  filteredEntities.map((record) => {
                    const id = getRecordId(record)
                    const isSelected = Boolean(id && selectedId === id)
                    const entityType = getEntityType(record)
                    const status = getEntityStatus(record)

                    return (
                      <Link
                        key={id ?? getEntityName(record)}
                        href={buildCatalogueHref({
                          entity: id,
                          search: searchQuery || null,
                          type: typeFilter,
                        })}
                        className={`block rounded-2xl border p-4 transition ${
                          isSelected
                            ? 'border-[#123BFF]/40 bg-[#EAF7FF] shadow-sm'
                            : 'border-sand/10 bg-white hover:border-[#123BFF]/30'
                        }`}
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          {entityType ? (
                            <span className="rounded-full bg-[#123BFF] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white">
                              {getReadableLabel(entityType)}
                            </span>
                          ) : null}

                          {status ? (
                            <span className="rounded-full bg-[#EAF7FF] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#123BFF]">
                              {getReadableLabel(status)}
                            </span>
                          ) : null}
                        </div>

                        <h3 className="mt-3 text-base font-bold leading-6 text-sand">
                          {getEntityName(record)}
                        </h3>

                        {getEntitySummary(record) ? (
                          <p className="mt-2 line-clamp-3 text-xs leading-6 text-sand/60">
                            {getEntitySummary(record)}
                          </p>
                        ) : null}
                      </Link>
                    )
                  })
                ) : (
                  <div className="rounded-2xl border border-sand/10 bg-white p-5">
                    <p className="text-sm font-bold text-sand">No catalogue entries matched.</p>
                    <p className="mt-2 text-sm leading-7 text-sand/65">
                      Reset the filters or search for a wider term.
                    </p>
                  </div>
                )}
              </div>
            </aside>

            <section className="rounded-3xl border border-sand/10 bg-white p-6 shadow-sm sm:p-7">
              {selectedEntity && selectedId ? (
                <div>
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        {getEntityType(selectedEntity) ? (
                          <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                            <Database className="h-4 w-4" aria-hidden="true" />
                            {getReadableLabel(getEntityType(selectedEntity) as string)}
                          </span>
                        ) : null}

                        {getEntityStatus(selectedEntity) ? (
                          <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF7FF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                            {getReadableLabel(getEntityStatus(selectedEntity) as string)}
                          </span>
                        ) : null}
                      </div>

                      <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
                        {getEntityName(selectedEntity)}
                      </h2>

                      <p className="mt-4 max-w-3xl text-sm leading-7 text-sand/65">
                        {getEntitySummary(selectedEntity) ??
                          'This catalogue entry does not yet have a populated summary field. The raw field table below shows the available database values.'}
                      </p>
                    </div>

                    <Link
                      href="/brain/catalog"
                      className="inline-flex items-center justify-center rounded-2xl border border-sand/10 bg-white px-5 py-3 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]"
                    >
                      Clear selection
                    </Link>
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    <article className="rounded-3xl border border-sand/10 bg-[#F8FCFF] p-5">
                      <p className="text-2xl font-bold text-[#123BFF]">
                        {formatCount(selectedRelationshipLinks.length)}
                      </p>
                      <h3 className="mt-2 text-sm font-bold text-sand">Relationship links</h3>
                      <p className="mt-2 text-xs leading-6 text-sand/60">
                        Catalogue entity links connected to this entry.
                      </p>
                    </article>

                    <article className="rounded-3xl border border-sand/10 bg-[#F8FCFF] p-5">
                      <p className="text-2xl font-bold text-[#123BFF]">
                        {formatCount(selectedCapabilityLinks.length)}
                      </p>
                      <h3 className="mt-2 text-sm font-bold text-sand">Capability links</h3>
                      <p className="mt-2 text-xs leading-6 text-sand/60">
                        Capability records connected through the catalogue mapping table.
                      </p>
                    </article>

                    <article className="rounded-3xl border border-sand/10 bg-[#F8FCFF] p-5">
                      <p className="text-2xl font-bold text-[#123BFF]">
                        {formatCount(selectedComparisonLinks.length)}
                      </p>
                      <h3 className="mt-2 text-sm font-bold text-sand">Comparison links</h3>
                      <p className="mt-2 text-xs leading-6 text-sand/60">
                        Comparison groups connected through the catalogue mapping table.
                      </p>
                    </article>
                  </div>

                  <div className="mt-8 grid gap-6 xl:grid-cols-2">
                    <section className="rounded-3xl border border-sand/10 bg-[#F8FCFF] p-5">
                      <div className="flex items-center gap-3">
                        <FileSearch className="h-5 w-5 text-[#123BFF]" aria-hidden="true" />
                        <h3 className="text-lg font-bold text-sand">Primary fields</h3>
                      </div>

                      <dl className="mt-5 grid gap-3">
                        {getPriorityFields(selectedEntity).map(([key, value]) => (
                          <div key={key} className="rounded-2xl bg-white p-4">
                            <dt className="text-xs font-bold uppercase tracking-[0.14em] text-sand/50">
                              {getReadableLabel(key)}
                            </dt>
                            <dd className="mt-2 whitespace-pre-wrap break-words text-sm font-semibold leading-7 text-sand">
                              {formatValue(value)}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </section>

                    <section className="rounded-3xl border border-sand/10 bg-[#F8FCFF] p-5">
                      <div className="flex items-center gap-3">
                        <Sparkles className="h-5 w-5 text-[#123BFF]" aria-hidden="true" />
                        <h3 className="text-lg font-bold text-sand">Connected training context</h3>
                      </div>

                      <div className="mt-5 grid gap-4">
                        <div className="rounded-2xl bg-white p-4">
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                            Capabilities
                          </p>

                          {selectedCapabilities.length > 0 ? (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {selectedCapabilities.map((record) => (
                                <span
                                  key={getRecordId(record) ?? getEntityName(record)}
                                  className="rounded-full bg-[#EAF7FF] px-3 py-1 text-xs font-bold text-[#123BFF]"
                                >
                                  {getEntityName(record)}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="mt-3 text-sm leading-7 text-sand/65">
                              No capability records were resolved from the current link rows.
                            </p>
                          )}
                        </div>

                        <div className="rounded-2xl bg-white p-4">
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                            Comparison groups
                          </p>

                          {selectedComparisonGroups.length > 0 ? (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {selectedComparisonGroups.map((record) => (
                                <span
                                  key={getRecordId(record) ?? getEntityName(record)}
                                  className="rounded-full bg-[#EAF7FF] px-3 py-1 text-xs font-bold text-[#123BFF]"
                                >
                                  {getEntityName(record)}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="mt-3 text-sm leading-7 text-sand/65">
                              No comparison group records were resolved from the current link rows.
                            </p>
                          )}
                        </div>

                        <div className="rounded-2xl bg-white p-4">
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF]">
                            Next content layer
                          </p>
                          <p className="mt-3 text-sm leading-7 text-sand/65">
                            This entry space can later expand into client-only detail pages with
                            source-backed summaries, capabilities, limitations, lessons, sandbox
                            tasks, comparison pages, and business training implications.
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>

                  <section className="mt-8 rounded-3xl border border-sand/10 bg-[#F8FCFF] p-5">
                    <div className="flex items-center gap-3">
                      <Link2 className="h-5 w-5 text-[#123BFF]" aria-hidden="true" />
                      <h3 className="text-lg font-bold text-sand">Relationship rows</h3>
                    </div>

                    {selectedRelationshipLinks.length > 0 ? (
                      <div className="mt-5 grid gap-3">
                        {selectedRelationshipLinks.slice(0, 24).map((record, index) => (
                          <article
                            key={`${getRelationshipLabel(record)}-${index}`}
                            className="rounded-2xl bg-white p-4"
                          >
                            <p className="text-sm font-bold text-sand">
                              {getReadableLabel(getRelationshipLabel(record))}
                            </p>

                            <div className="mt-3 grid gap-2">
                              {getLinkedIds(record, selectedId).map((linkedItem) => (
                                <p
                                  key={`${linkedItem.key}-${linkedItem.value}`}
                                  className="break-words text-xs leading-6 text-sand/65"
                                >
                                  <span className="font-bold text-sand">
                                    {getReadableLabel(linkedItem.key)}:
                                  </span>{' '}
                                  {getDisplayNameById(catalogueEntities, linkedItem.value)}
                                </p>
                              ))}
                            </div>
                          </article>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-5 rounded-2xl bg-white p-4 text-sm leading-7 text-sand/65">
                        No relationship rows are currently linked to this catalogue entry.
                      </p>
                    )}
                  </section>

                  <details className="mt-8 rounded-3xl border border-sand/10 bg-[#F8FCFF] p-5">
                    <summary className="cursor-pointer text-lg font-bold text-sand">
                      Raw remaining fields
                    </summary>

                    <dl className="mt-5 grid gap-3">
                      {getRemainingFields(selectedEntity).length > 0 ? (
                        getRemainingFields(selectedEntity).map(([key, value]) => (
                          <div key={key} className="rounded-2xl bg-white p-4">
                            <dt className="text-xs font-bold uppercase tracking-[0.14em] text-sand/50">
                              {getReadableLabel(key)}
                            </dt>
                            <dd className="mt-2 whitespace-pre-wrap break-words text-sm font-semibold leading-7 text-sand">
                              {formatValue(value)}
                            </dd>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-2xl bg-white p-4">
                          <p className="text-sm leading-7 text-sand/65">
                            No additional fields are available for this entry.
                          </p>
                        </div>
                      )}
                    </dl>
                  </details>
                </div>
              ) : (
                <div className="rounded-3xl bg-[#F8FCFF] p-6">
                  <h2 className="text-2xl font-bold tracking-tight text-sand">
                    Select a catalogue entry.
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-sand/65">
                    Choose an entity from the catalogue index to open its detail space.
                  </p>
                </div>
              )}
            </section>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Private by default
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand">
              Built as the future client catalogue shell.
            </h2>

            <p className="mt-4 text-sm leading-7 text-sand/65">
              This private index gives every catalogue entry a browsable space now. Later, those
              spaces can become polished client-only pages with verified summaries, tool details,
              model context, lessons, sandbox tasks, source confidence, and business relevance.
            </p>
          </article>

          <article className="rounded-[2rem] border border-sand/10 bg-[#123BFF] p-6 text-white shadow-sm sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white">
              <Route className="h-4 w-4" aria-hidden="true" />
              Catalogue route pattern
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight">
              One index now, individual pages later.
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/82">
              The current page uses URL query selection for safety and speed. The next route layer
              can split each entity into a proper detail route when the final public/client-only
              catalogue structure is ready.
            </p>
          </article>
        </section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/brain"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF]"
          >
            Return to Master Brain
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
    </main>
  )
}
