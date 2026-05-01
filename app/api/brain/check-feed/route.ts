import { createHash } from 'crypto'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const BRAIN_ADMIN_EMAIL = 'colintandy@gmail.com'

type BrainAdminCheck =
  | {
      ok: true
      userId: string
      email: string
    }
  | {
      ok: false
      response: NextResponse
    }

type SourceFeed = {
  id: string
  provider: string
  title: string
  feed_type: string
  feed_url: string
  source_type: string
  trust_level: string
}

type ParsedFeedItem = {
  title: string
  itemUrl: string
  externalId: string | null
  publishedAt: string | null
  summary: string | null
  rawPayload: Record<string, unknown>
  contentHash: string
}

function cleanString(value: unknown) {
  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()

  return trimmed ? trimmed : null
}

function decodeXml(value: string) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&apos;', "'")
}

function decodeHtml(value: string) {
  return decodeXml(value)
    .replaceAll('&nbsp;', ' ')
    .replaceAll('&mdash;', '—')
    .replaceAll('&ndash;', '–')
    .replaceAll('&rsquo;', "'")
    .replaceAll('&lsquo;', "'")
    .replaceAll('&rdquo;', '"')
    .replaceAll('&ldquo;', '"')
}

function stripTags(value: string) {
  return decodeHtml(value)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function createContentHash(value: string) {
  return createHash('sha256').update(value).digest('hex')
}

function createAbsoluteUrl(baseUrl: string, maybeUrl: string) {
  try {
    return new URL(maybeUrl, baseUrl).toString()
  } catch {
    return baseUrl
  }
}

function getTagValue(xml: string, tagName: string) {
  const match = xml.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i'))

  return match?.[1] ? decodeXml(match[1].trim()) : null
}

function getAtomEntryLink(entryXml: string) {
  const hrefMatch = entryXml.match(/<link[^>]+href=["']([^"']+)["'][^>]*>/i)

  if (hrefMatch?.[1]) {
    return decodeXml(hrefMatch[1].trim())
  }

  return getTagValue(entryXml, 'link')
}

function getRssItemLink(itemXml: string) {
  return getTagValue(itemXml, 'link') || getTagValue(itemXml, 'guid')
}

function splitXmlBlocks(xml: string, tagName: string) {
  const matches = xml.match(new RegExp(`<${tagName}[^>]*>[\\s\\S]*?<\\/${tagName}>`, 'gi'))

  return matches ?? []
}

function parseXmlFeed(xml: string) {
  const atomEntries = splitXmlBlocks(xml, 'entry')

  if (atomEntries.length > 0) {
    return atomEntries
      .map((entryXml) => {
        const title = stripTags(getTagValue(entryXml, 'title') ?? '')
        const itemUrl = getAtomEntryLink(entryXml)
        const externalId = getTagValue(entryXml, 'id')
        const publishedAt =
          getTagValue(entryXml, 'published') ||
          getTagValue(entryXml, 'updated') ||
          null
        const summary =
          stripTags(
            getTagValue(entryXml, 'summary') ||
              getTagValue(entryXml, 'content') ||
              '',
          ) || null

        if (!title || !itemUrl) {
          return null
        }

        return {
          title,
          itemUrl,
          externalId,
          publishedAt,
          summary,
          rawPayload: {
            parser: 'atom',
            entry: entryXml.slice(0, 4000),
          },
          contentHash: createContentHash(`${title}\n${itemUrl}\n${publishedAt ?? ''}\n${summary ?? ''}`),
        }
      })
      .filter(Boolean) as ParsedFeedItem[]
  }

  const rssItems = splitXmlBlocks(xml, 'item')

  return rssItems
    .map((itemXml) => {
      const title = stripTags(getTagValue(itemXml, 'title') ?? '')
      const itemUrl = getRssItemLink(itemXml)
      const externalId = getTagValue(itemXml, 'guid')
      const publishedAt = getTagValue(itemXml, 'pubDate') || null
      const summary =
        stripTags(
          getTagValue(itemXml, 'description') ||
            getTagValue(itemXml, 'content:encoded') ||
            '',
        ) || null

      if (!title || !itemUrl) {
        return null
      }

      return {
        title,
        itemUrl,
        externalId,
        publishedAt,
        summary,
        rawPayload: {
          parser: 'rss',
          item: itemXml.slice(0, 4000),
        },
        contentHash: createContentHash(`${title}\n${itemUrl}\n${publishedAt ?? ''}\n${summary ?? ''}`),
      }
    })
    .filter(Boolean) as ParsedFeedItem[]
}

function parseChangelogPage(html: string, pageUrl: string) {
  const cleanedHtml = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')

  const candidates: ParsedFeedItem[] = []
  const seenUrls = new Set<string>()
  const linkMatches = cleanedHtml.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)

  for (const match of linkMatches) {
    const href = cleanString(match[1])
    const label = stripTags(match[2] ?? '')

    if (!href || !label) {
      continue
    }

    if (
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('#') ||
      label.length < 8
    ) {
      continue
    }

    const itemUrl = createAbsoluteUrl(pageUrl, href)

    if (seenUrls.has(itemUrl)) {
      continue
    }

    const lowerLabel = label.toLowerCase()

    const looksLikeUpdate =
      lowerLabel.includes('release') ||
      lowerLabel.includes('changelog') ||
      lowerLabel.includes('update') ||
      lowerLabel.includes('model') ||
      lowerLabel.includes('api') ||
      lowerLabel.includes('sdk') ||
      lowerLabel.includes('claude') ||
      lowerLabel.includes('gpt') ||
      lowerLabel.includes('sonnet') ||
      lowerLabel.includes('opus') ||
      lowerLabel.includes('beta') ||
      /\b20\d{2}\b/.test(label) ||
      /\b\d{1,2}\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)/i.test(label)

    if (!looksLikeUpdate) {
      continue
    }

    seenUrls.add(itemUrl)

    candidates.push({
      title: label.slice(0, 220),
      itemUrl,
      externalId: itemUrl,
      publishedAt: null,
      summary: `Detected from changelog page: ${label.slice(0, 260)}`,
      rawPayload: {
        parser: 'changelog_page_links',
        label,
        href,
      },
      contentHash: createContentHash(`${label}\n${itemUrl}`),
    })

    if (candidates.length >= 10) {
      break
    }
  }

  if (candidates.length >= 10) {
    return candidates
  }

  const headingMatches = cleanedHtml.matchAll(/<h[1-4]\b[^>]*>([\s\S]*?)<\/h[1-4]>/gi)

  for (const match of headingMatches) {
    const heading = stripTags(match[1] ?? '')

    if (!heading || heading.length < 8) {
      continue
    }

    const headingUrl = `${pageUrl}#${heading
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80)}`

    if (seenUrls.has(headingUrl)) {
      continue
    }

    seenUrls.add(headingUrl)

    candidates.push({
      title: heading.slice(0, 220),
      itemUrl: headingUrl,
      externalId: headingUrl,
      publishedAt: null,
      summary: `Detected heading from changelog page: ${heading.slice(0, 260)}`,
      rawPayload: {
        parser: 'changelog_page_headings',
        heading,
      },
      contentHash: createContentHash(`${heading}\n${headingUrl}`),
    })

    if (candidates.length >= 10) {
      break
    }
  }

  return candidates
}

function inferSignalType(feed: SourceFeed, title: string, summary: string | null) {
  const haystack = `${title} ${summary ?? ''}`.toLowerCase()

  if (
    haystack.includes('deprecat') ||
    haystack.includes('retire') ||
    haystack.includes('removed')
  ) {
    return 'tool_deprecation'
  }

  if (
    haystack.includes('pricing') ||
    haystack.includes('billing') ||
    haystack.includes('cost')
  ) {
    return 'pricing_change'
  }

  if (
    haystack.includes('safety') ||
    haystack.includes('policy') ||
    haystack.includes('privacy')
  ) {
    return 'safety_update'
  }

  if (
    haystack.includes('api') ||
    haystack.includes('endpoint') ||
    haystack.includes('sdk')
  ) {
    return 'api_change'
  }

  if (
    haystack.includes('model') ||
    haystack.includes('gpt') ||
    haystack.includes('claude') ||
    haystack.includes('sonnet') ||
    haystack.includes('opus')
  ) {
    return 'model_release'
  }

  if (
    haystack.includes('agent') ||
    haystack.includes('tool calling') ||
    haystack.includes('tool use')
  ) {
    return 'agent_framework_update'
  }

  if (
    haystack.includes('rag') ||
    haystack.includes('retrieval') ||
    haystack.includes('embedding')
  ) {
    return 'rag_update'
  }

  if (feed.feed_type === 'changelog_page') {
    return 'changelog_update'
  }

  if (feed.source_type === 'github_repo') {
    return 'documentation_update'
  }

  return 'unknown'
}

async function checkBrainAdmin(): Promise<BrainAdminCheck> {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return {
      ok: false,
      response: NextResponse.json(
        {
          ok: false,
          error: 'not_authenticated',
        },
        { status: 401 },
      ),
    }
  }

  const email = user.email?.trim().toLowerCase() ?? null

  if (email !== BRAIN_ADMIN_EMAIL) {
    return {
      ok: false,
      response: NextResponse.json(
        {
          ok: false,
          error: 'not_brain_admin',
        },
        { status: 403 },
      ),
    }
  }

  return {
    ok: true,
    userId: user.id,
    email,
  }
}

export async function POST(request: Request) {
  const adminCheck = await checkBrainAdmin()

  if (!adminCheck.ok) {
    return adminCheck.response
  }

  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: 'invalid_json',
      },
      { status: 400 },
    )
  }

  const feedId = cleanString((payload as { feedId?: unknown }).feedId)

  if (!feedId) {
    return NextResponse.json(
      {
        ok: false,
        error: 'missing_feed_id',
      },
      { status: 400 },
    )
  }

  const supabase = await createClient()

  const { data: feed, error: feedError } = await supabase
    .from('source_feeds')
    .select('id, provider, title, feed_type, feed_url, source_type, trust_level')
    .eq('id', feedId)
    .single()

  if (feedError || !feed) {
    return NextResponse.json(
      {
        ok: false,
        error: 'feed_not_found',
        detail: feedError?.message ?? null,
      },
      { status: 404 },
    )
  }

  const sourceFeed = feed as SourceFeed

  if (!['rss', 'atom', 'github_releases', 'changelog_page'].includes(sourceFeed.feed_type)) {
    const unsupportedMessage =
      'This feed type is registered but not ready for automatic checking yet.'

    await supabase
      .from('source_feeds')
      .update({
        last_checked_at: new Date().toISOString(),
        last_error: unsupportedMessage,
      })
      .eq('id', sourceFeed.id)

    return NextResponse.json(
      {
        ok: false,
        error: 'unsupported_feed_type',
        detail: unsupportedMessage,
      },
      { status: 422 },
    )
  }

  let response: Response

  try {
    response = await fetch(sourceFeed.feed_url, {
      headers: {
        Accept:
          sourceFeed.feed_type === 'changelog_page'
            ? 'text/html, application/xhtml+xml'
            : 'application/atom+xml, application/rss+xml, application/xml, text/xml',
        'User-Agent': 'DeepMindResourcesBrain/1.0',
      },
      cache: 'no-store',
    })
  } catch {
    const errorMessage = 'The feed could not be fetched.'

    await supabase
      .from('source_feeds')
      .update({
        last_checked_at: new Date().toISOString(),
        last_error: errorMessage,
      })
      .eq('id', sourceFeed.id)

    return NextResponse.json(
      {
        ok: false,
        error: 'feed_fetch_failed',
        detail: errorMessage,
      },
      { status: 502 },
    )
  }

  if (!response.ok) {
    const errorMessage = `Feed returned HTTP ${response.status}.`

    await supabase
      .from('source_feeds')
      .update({
        last_checked_at: new Date().toISOString(),
        last_error: errorMessage,
      })
      .eq('id', sourceFeed.id)

    return NextResponse.json(
      {
        ok: false,
        error: 'feed_http_error',
        detail: errorMessage,
      },
      { status: 502 },
    )
  }

  const responseText = await response.text()
  const parsedItems =
    sourceFeed.feed_type === 'changelog_page'
      ? parseChangelogPage(responseText, sourceFeed.feed_url)
      : parseXmlFeed(responseText).slice(0, 12)

  if (parsedItems.length === 0) {
    const errorMessage =
      sourceFeed.feed_type === 'changelog_page'
        ? 'No readable changelog updates were found.'
        : 'No readable RSS or Atom items were found.'

    await supabase
      .from('source_feeds')
      .update({
        last_checked_at: new Date().toISOString(),
        last_error: errorMessage,
      })
      .eq('id', sourceFeed.id)

    return NextResponse.json(
      {
        ok: false,
        error: 'no_feed_items_found',
        detail: errorMessage,
      },
      { status: 422 },
    )
  }

  let createdCount = 0
  let duplicateCount = 0

  for (const item of parsedItems) {
    const { error: insertError } = await supabase.from('source_feed_items').insert({
      source_feed_id: sourceFeed.id,
      provider: sourceFeed.provider,
      title: item.title,
      item_url: item.itemUrl,
      canonical_url: item.itemUrl,
      external_id: item.externalId,
      published_at: item.publishedAt,
      summary: item.summary,
      raw_payload: item.rawPayload,
      content_hash: item.contentHash,
      signal_type: inferSignalType(sourceFeed, item.title, item.summary),
      relevance_status: 'new_signal',
      review_status: 'unreviewed',
    })

    if (insertError) {
      if (insertError.code === '23505') {
        duplicateCount += 1
      } else {
        const errorMessage = insertError.message

        await supabase
          .from('source_feeds')
          .update({
            last_checked_at: new Date().toISOString(),
            last_error: errorMessage,
          })
          .eq('id', sourceFeed.id)

        return NextResponse.json(
          {
            ok: false,
            error: 'feed_item_insert_failed',
            detail: errorMessage,
          },
          { status: 500 },
        )
      }
    } else {
      createdCount += 1
    }
  }

  await supabase
    .from('source_feeds')
    .update({
      last_checked_at: new Date().toISOString(),
      last_success_at: new Date().toISOString(),
      last_error: null,
    })
    .eq('id', sourceFeed.id)

  revalidatePath('/brain')

  return NextResponse.json({
    ok: true,
    feedId: sourceFeed.id,
    itemsRead: parsedItems.length,
    createdCount,
    duplicateCount,
  })
}
