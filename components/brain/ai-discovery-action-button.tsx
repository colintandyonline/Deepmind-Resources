'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  CheckCircle2,
  CopyCheck,
  EyeOff,
  Loader2,
  RotateCcw,
  Target,
  XCircle,
} from 'lucide-react'

type AiDiscoveryAction =
  | 'worth_tracking'
  | 'reject_hype'
  | 'mark_duplicate'
  | 'needs_official_source'

type ActionStatus = 'idle' | 'updating' | 'success' | 'error'

type AiDiscoveryActionButtonProps = {
  discoveryItemId: string
  action: AiDiscoveryAction
  disabled?: boolean
}

type AiDiscoveryActionResponse = {
  ok: boolean
  item?: {
    id: string
    discovery_status: string
    signal_quality: string
    updated_at: string
  }
  error?: string
}

const actionCopy = {
  worth_tracking: {
    label: 'Mark worth tracking',
    updatingLabel: 'Marking useful',
    successLabel: 'Worth tracking',
    idleMessage: 'Marking this discovery candidate as useful enough to track.',
    successMessage: 'Discovery candidate marked as worth tracking.',
    icon: Target,
    className:
      'border-[#123BFF]/15 bg-[#123BFF] text-white hover:bg-[#0A63FF] disabled:bg-[#8EA2FF] disabled:text-white',
  },
  reject_hype: {
    label: 'Reject hype',
    updatingLabel: 'Rejecting hype',
    successLabel: 'Rejected hype',
    idleMessage: 'Rejecting this candidate as hype or a low-value discovery signal.',
    successMessage: 'Discovery candidate rejected as hype.',
    icon: EyeOff,
    className:
      'border-sand/10 bg-white text-sand hover:border-red-300 hover:text-red-700 disabled:bg-sand/5 disabled:text-sand/35',
  },
  mark_duplicate: {
    label: 'Mark duplicate',
    updatingLabel: 'Marking duplicate',
    successLabel: 'Marked duplicate',
    idleMessage: 'Marking this discovery candidate as a duplicate.',
    successMessage: 'Discovery candidate marked as duplicate.',
    icon: CopyCheck,
    className:
      'border-sand/10 bg-white text-sand hover:border-[#123BFF]/30 hover:text-[#123BFF] disabled:bg-sand/5 disabled:text-sand/35',
  },
  needs_official_source: {
    label: 'Reset review',
    updatingLabel: 'Resetting',
    successLabel: 'Review reset',
    idleMessage: 'Resetting this candidate to needs official source.',
    successMessage: 'Discovery candidate reset to needs official source.',
    icon: RotateCcw,
    className:
      'border-sand/10 bg-white text-sand hover:border-[#123BFF]/30 hover:text-[#123BFF] disabled:bg-sand/5 disabled:text-sand/35',
  },
} satisfies Record<
  AiDiscoveryAction,
  {
    label: string
    updatingLabel: string
    successLabel: string
    idleMessage: string
    successMessage: string
    icon: typeof Target
    className: string
  }
>

function formatDiscoveryActionError(error: string | undefined) {
  if (!error) {
    return 'The discovery candidate could not be updated. Please try again.'
  }

  if (error === 'Authentication required.') {
    return 'You must be signed in before updating a discovery candidate.'
  }

  if (error === 'Brain admin access required.') {
    return 'Only the configured Brain admin account can update discovery candidates.'
  }

  if (error === 'Valid discovery item ID is required.') {
    return 'The discovery candidate ID was missing or invalid.'
  }

  if (error === 'Valid discovery action is required.') {
    return 'The requested discovery action is not supported.'
  }

  if (error === 'Discovery item could not be updated.') {
    return 'The discovery candidate could not be updated in Supabase.'
  }

  return error
}

export function AiDiscoveryActionButton({
  discoveryItemId,
  action,
  disabled = false,
}: AiDiscoveryActionButtonProps) {
  const router = useRouter()
  const [status, setStatus] = useState<ActionStatus>('idle')
  const [message, setMessage] = useState<string | null>(null)

  const copy = actionCopy[action]
  const Icon = copy.icon

  async function updateDiscoveryCandidate() {
    setStatus('updating')
    setMessage(copy.idleMessage)

    try {
      const response = await fetch('/api/brain/update-discovery-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          discoveryItemId,
          action,
        }),
      })

      const result = (await response.json()) as AiDiscoveryActionResponse

      if (!response.ok || !result.ok) {
        setStatus('error')
        setMessage(formatDiscoveryActionError(result.error))
        return
      }

      setStatus('success')
      setMessage(copy.successMessage)

      router.refresh()
    } catch {
      setStatus('error')
      setMessage(
        'The discovery candidate update request could not be sent. Please check the connection and try again.',
      )
    }
  }

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={updateDiscoveryCandidate}
        disabled={disabled || status === 'updating' || status === 'success'}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-bold shadow-sm transition disabled:cursor-not-allowed sm:w-auto ${copy.className}`}
      >
        {status === 'updating'
          ? copy.updatingLabel
          : status === 'success'
            ? copy.successLabel
            : copy.label}

        {status === 'updating' ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : status === 'success' ? (
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Icon className="h-4 w-4" aria-hidden="true" />
        )}
      </button>

      {message ? (
        <div
          className={`mt-3 rounded-2xl p-4 text-sm font-semibold leading-7 ${
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
            ) : status === 'updating' ? (
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
