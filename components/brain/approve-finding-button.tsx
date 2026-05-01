'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, Loader2, XCircle } from 'lucide-react'

type ApproveStatus = 'idle' | 'approving' | 'success' | 'error'

type ApproveFindingButtonProps = {
  findingId: string
  disabled?: boolean
}

type ApproveFindingResponse = {
  ok: boolean
  alreadyApproved?: boolean
  masterBrainRecordId?: string
  error?: string
  detail?: string | null
}

function formatApproveError(error: string | undefined) {
  if (!error) {
    return 'The finding could not be approved. Please try again.'
  }

  if (error === 'not_authenticated') {
    return 'You must be signed in before approving a finding.'
  }

  if (error === 'not_brain_admin') {
    return 'Only the configured Brain admin account can approve findings.'
  }

  if (error === 'missing_finding_id') {
    return 'The finding ID was missing.'
  }

  if (error === 'finding_not_found') {
    return 'The finding could not be found.'
  }

  if (error === 'brain_record_create_failed') {
    return 'The Brain record could not be created.'
  }

  if (error === 'source_link_create_failed') {
    return 'The Brain record was created, but the source link could not be saved.'
  }

  if (error === 'finding_update_failed') {
    return 'The Brain record was created, but the original finding could not be updated.'
  }

  return error.replaceAll('_', ' ')
}

export function ApproveFindingButton({ findingId, disabled = false }: ApproveFindingButtonProps) {
  const router = useRouter()
  const [status, setStatus] = useState<ApproveStatus>('idle')
  const [message, setMessage] = useState<string | null>(null)

  async function approveFinding() {
    setStatus('approving')
    setMessage('Approving finding and creating a Master Brain record.')

    try {
      const response = await fetch('/api/brain/approve-finding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          findingId,
        }),
      })

      const result = (await response.json()) as ApproveFindingResponse

      if (!response.ok || !result.ok) {
        setStatus('error')
        setMessage(formatApproveError(result.error))
        return
      }

      setStatus('success')
      setMessage(
        result.alreadyApproved
          ? 'This finding was already linked to a Master Brain record.'
          : 'Finding approved and promoted to a Master Brain record.',
      )

      router.refresh()
    } catch {
      setStatus('error')
      setMessage('The approval request could not be sent. Please check the connection and try again.')
    }
  }

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={approveFinding}
        disabled={disabled || status === 'approving' || status === 'success'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF] disabled:cursor-not-allowed disabled:bg-[#123BFF]/45 sm:w-auto"
      >
        {status === 'approving' ? 'Approving' : status === 'success' ? 'Approved' : 'Approve to Brain Record'}
        {status === 'approving' ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
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
            ) : status === 'approving' ? (
              <Loader2 className="mt-0.5 h-5 w-5 shrink-0 animate-spin" aria-hidden="true" />
            ) : (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            )}
            <p>{message}</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
