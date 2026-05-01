'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Archive, Loader2, XCircle } from 'lucide-react'

type ArchiveStatus = 'idle' | 'archiving' | 'success' | 'error'

type ArchiveFindingButtonProps = {
  findingId: string
  disabled?: boolean
}

type ArchiveFindingResponse = {
  ok: boolean
  alreadyArchived?: boolean
  archived?: boolean
  error?: string
  detail?: string | null
}

function formatArchiveError(error: string | undefined) {
  if (!error) {
    return 'The finding could not be archived. Please try again.'
  }

  if (error === 'not_authenticated') {
    return 'You must be signed in before archiving a finding.'
  }

  if (error === 'not_brain_admin') {
    return 'Only the configured Brain admin account can archive findings.'
  }

  if (error === 'missing_finding_id') {
    return 'The finding ID was missing.'
  }

  if (error === 'finding_not_found') {
    return 'The finding could not be found.'
  }

  if (error === 'cannot_archive_promoted_finding') {
    return 'This finding is already linked to a Master Brain record and should remain as review history.'
  }

  if (error === 'archive_failed') {
    return 'The finding could not be archived in Supabase.'
  }

  return error.replaceAll('_', ' ')
}

export function ArchiveFindingButton({ findingId, disabled = false }: ArchiveFindingButtonProps) {
  const router = useRouter()
  const [status, setStatus] = useState<ArchiveStatus>('idle')
  const [message, setMessage] = useState<string | null>(null)

  async function archiveFinding() {
    setStatus('archiving')
    setMessage('Archiving finding and removing it from the active review queue.')

    try {
      const response = await fetch('/api/brain/archive-finding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          findingId,
        }),
      })

      const result = (await response.json()) as ArchiveFindingResponse

      if (!response.ok || !result.ok) {
        setStatus('error')
        setMessage(formatArchiveError(result.error))
        return
      }

      setStatus('success')
      setMessage(
        result.alreadyArchived
          ? 'This finding was already archived.'
          : 'Finding archived and removed from the active review queue.',
      )

      router.refresh()
    } catch {
      setStatus('error')
      setMessage('The archive request could not be sent. Please check the connection and try again.')
    }
  }

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={archiveFinding}
        disabled={disabled || status === 'archiving' || status === 'success'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF] disabled:cursor-not-allowed disabled:bg-sand/5 disabled:text-sand/35 sm:w-auto"
      >
        {status === 'archiving' ? 'Archiving' : status === 'success' ? 'Archived' : 'Archive finding'}
        {status === 'archiving' ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Archive className="h-4 w-4" aria-hidden="true" />
        )}
      </button>

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
            ) : status === 'archiving' ? (
              <Loader2 className="mt-0.5 h-5 w-5 shrink-0 animate-spin" aria-hidden="true" />
            ) : (
              <Archive className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            )}
            <p>{message}</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
