'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Rss, XCircle } from 'lucide-react'

type CheckFeedStatus = 'idle' | 'checking' | 'success' | 'error'

type CheckFeedButtonProps = {
  feedId: string
  feedType: string
}

type CheckFeedResponse = {
  ok: boolean
  feedId?: string
  itemsRead?: number
  createdCount?: number
  duplicateCount?: number
  error?: string
  detail?: string | null
}

function formatCheckFeedError(error: string | undefined, detail?: string | null) {
  if (detail) {
    return detail
  }

  if (!error) {
    return 'The feed could not be checked. Please try again.'
  }

  if (error === 'not_authenticated') {
    return 'You must be signed in before checking a feed.'
  }

  if (error === 'not_brain_admin') {
    return 'Only the configured Brain admin account can check feeds.'
  }

  if (error === 'missing_feed_id') {
    return 'The feed ID was missing.'
  }

  if (error === 'feed_not_found') {
    return 'The feed could not be found.'
  }

  if (error === 'unsupported_feed_type') {
    return 'This feed type is registered, but automatic checking is not wired for it yet.'
  }

  if (error === 'feed_fetch_failed') {
    return 'The feed could not be fetched.'
  }

  if (error === 'feed_http_error') {
    return 'The feed returned an HTTP error.'
  }

  if (error === 'no_feed_items_found') {
    return 'No readable feed items were found.'
  }

  if (error === 'feed_item_insert_failed') {
    return 'A feed item could not be saved in Supabase.'
  }

  return error.replaceAll('_', ' ')
}

function canCheckFeedType(feedType: string) {
  return (
    feedType === 'rss' ||
    feedType === 'atom' ||
    feedType === 'github_releases' ||
    feedType === 'changelog_page'
  )
}

function getIdleMessage(feedType: string) {
  if (feedType === 'changelog_page') {
    return 'Checking changelog page and saving the top detected update signals.'
  }

  return 'Checking feed and saving new source signals.'
}

function getButtonLabel(feedType: string, status: CheckFeedStatus, isSupported: boolean) {
  if (!isSupported) {
    return 'Manual scout only'
  }

  if (status === 'checking') {
    return feedType === 'changelog_page' ? 'Checking top updates' : 'Checking feed'
  }

  return feedType === 'changelog_page' ? 'Check top 10 updates' : 'Check feed now'
}

function getSuccessMessage(feedType: string, result: CheckFeedResponse) {
  const createdCount = result.createdCount ?? 0
  const duplicateCount = result.duplicateCount ?? 0

  if (feedType === 'changelog_page') {
    return `Changelog checked. ${createdCount} top update signal${
      createdCount === 1 ? '' : 's'
    } saved. ${duplicateCount} duplicate${duplicateCount === 1 ? '' : 's'} skipped.`
  }

  return `Feed checked. ${createdCount} new signal${
    createdCount === 1 ? '' : 's'
  } saved. ${duplicateCount} duplicate${duplicateCount === 1 ? '' : 's'} skipped.`
}

export function CheckFeedButton({ feedId, feedType }: CheckFeedButtonProps) {
  const router = useRouter()
  const [status, setStatus] = useState<CheckFeedStatus>('idle')
  const [message, setMessage] = useState<string | null>(null)

  const isSupported = canCheckFeedType(feedType)

  async function checkFeed() {
    setStatus('checking')
    setMessage(getIdleMessage(feedType))

    try {
      const response = await fetch('/api/brain/check-feed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedId,
        }),
      })

      const result = (await response.json()) as CheckFeedResponse

      if (!response.ok || !result.ok) {
        setStatus('error')
        setMessage(formatCheckFeedError(result.error, result.detail))
        return
      }

      setStatus('success')
      setMessage(getSuccessMessage(feedType, result))

      router.refresh()
    } catch {
      setStatus('error')
      setMessage('The feed check request could not be sent. Please check the connection and try again.')
    }
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={checkFeed}
        disabled={!isSupported || status === 'checking'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF] disabled:cursor-not-allowed disabled:bg-[#123BFF]/45 sm:w-auto"
      >
        {getButtonLabel(feedType, status, isSupported)}
        {status === 'checking' ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Rss className="h-4 w-4" aria-hidden="true" />
        )}
      </button>

      {!isSupported ? (
        <p className="mt-3 text-xs font-semibold leading-6 text-sand/55">
          This source stays registered here, but it should be checked with Source Scout until
          automatic polling is wired safely.
        </p>
      ) : feedType === 'changelog_page' ? (
        <p className="mt-3 text-xs font-semibold leading-6 text-sand/55">
          This checks the source page for the top detected update links or headings and saves them
          as reviewable source signals.
        </p>
      ) : null}

      {message ? (
        <div
          className={`mt-4 rounded-2xl p-4 text-sm font-semibold leading-7 ${
            status === 'success'
              ? 'border border-emerald-200 bg-emerald-50 text-emerald-800'
              : status === 'error'
                ? 'border border-red-200 bg-red-50 text-red-800'
                : 'border border-[#123BFF]/15 bg-[#EAF7FF] text-sand/70'
          }`}
        >
          <div className="flex gap-3">
            {status === 'error' ? (
              <XCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            ) : status === 'checking' ? (
              <Loader2 className="mt-0.5 h-5 w-5 shrink-0 animate-spin" aria-hidden="true" />
            ) : (
              <Rss className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            )}
            <p>{message}</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
