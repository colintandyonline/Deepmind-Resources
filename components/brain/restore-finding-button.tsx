'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, RotateCcw, XCircle } from 'lucide-react'

type RestoreStatus = 'idle' | 'restoring' | 'success' | 'error'

type RestoreFindingButtonProps = {
  findingId: string
  disabled?: boolean
}

type RestoreFindingResponse = {
  ok: boolean
  alreadyActive?: boolean
  restored?: boolean
  error?: string
  detail?: string | null
}

function formatRestoreError(error: string | undefined) {
  if (!error) {
    return 'The finding could not be restored. Please try again.'
  }

  if (error === 'not_authenticated') {
    return 'You must be signed in before restoring a finding.'
  }

  if (error === 'not_brain_admin') {
    return 'Only the configured Brain admin account can restore findings.'
  }

  if (error === 'missing_finding_id') {
    return 'The finding ID was missing.'
  }

  if (error === 'finding_not_found') {
    return 'The finding could not be found.'
  }

  if (error === 'cannot_restore_promoted_finding') {
    return 'This finding is already linked to a Master Brain record and should remain as verified review history.'
  }

  if (error === 'restore_failed') {
    return 'The finding could not be restored in Supabase.'
  }

  return error.replaceAll('_', ' ')
}

export function RestoreFindingButton({ findingId, disabled = false }: RestoreFindingButtonProps) {
  const router = useRouter()
  const [status, setStatus] = useState<RestoreStatus>('idle')
  const [message, setMessage] = useState<string | null>(null)

  async function restoreFinding() {
    setStatus('restoring')
    setMessage('Restoring finding to the active review queue.')

    try {
      const response = await fetch('/api/brain/restore-finding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          findingId,
        }),
      })

      const result = (await response.json()) as RestoreFindingResponse

      if (!response.ok || !result.ok) {
        setStatus('error')
        setMessage(formatRestoreError(result.error))
        return
      }

      setStatus('success')
      setMessage(
        result.alreadyActive
          ? 'This finding is already active.'
          : 'Finding restored to the active review queue.',
      )

      router.refresh()
    } catch {
      setStatus('error')
      setMessage('The restore request could not be sent. Please check the connection and try again.')
    }
  }

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={restoreFinding}
        disabled={disabled || status === 'restoring' || status === 'success'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF] disabled:cursor-not-allowed disabled:bg-[#123BFF]/45 sm:w-auto"
      >
        {status === 'restoring'
          ? 'Restoring'
          : status === 'success'
            ? 'Restored'
            : 'Restore to review'}
        {status === 'restoring' ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
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
            ) : status === 'restoring' ? (
              <Loader2 className="mt-0.5 h-5 w-5 shrink-0 animate-spin" aria-hidden="true" />
            ) : (
              <RotateCcw className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            )}
            <p>{message}</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
