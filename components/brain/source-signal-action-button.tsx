'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Archive, CopyCheck, EyeOff, Loader2, RotateCcw, XCircle } from 'lucide-react'

type SourceSignalAction = 'archive' | 'duplicate' | 'ignore' | 'restore'

type ActionStatus = 'idle' | 'updating' | 'success' | 'error'

type SourceSignalActionButtonProps = {
  signalId: string
  action: SourceSignalAction
  disabled?: boolean
}

type SourceSignalActionResponse = {
  ok: boolean
  signalId?: string
  action?: SourceSignalAction
  updated?: boolean
  alreadyUpdated?: boolean
  relevanceStatus?: string
  reviewStatus?: string
  error?: string
  detail?: string | null
}

const actionCopy = {
  archive: {
    label: 'Archive signal',
    updatingLabel: 'Archiving',
    successLabel: 'Archived',
    idleMessage: 'Archiving signal and removing it from the active intake queue.',
    successMessage: 'Signal archived and removed from the active intake queue.',
    alreadyMessage: 'This signal was already archived.',
    icon: Archive,
  },
  duplicate: {
    label: 'Mark duplicate',
    updatingLabel: 'Marking duplicate',
    successLabel: 'Marked duplicate',
    idleMessage: 'Marking signal as a duplicate intake item.',
    successMessage: 'Signal marked as duplicate.',
    alreadyMessage: 'This signal was already marked as duplicate.',
    icon: CopyCheck,
  },
  ignore: {
    label: 'Ignore signal',
    updatingLabel: 'Ignoring',
    successLabel: 'Ignored',
    idleMessage: 'Ignoring signal and removing it from the active intake queue.',
    successMessage: 'Signal ignored and removed from the active intake queue.',
    alreadyMessage: 'This signal was already ignored.',
    icon: EyeOff,
  },
  restore: {
    label: 'Restore signal',
    updatingLabel: 'Restoring',
    successLabel: 'Restored',
    idleMessage: 'Restoring signal to the active intake queue.',
    successMessage: 'Signal restored to the active intake queue.',
    alreadyMessage: 'This signal was already restored.',
    icon: RotateCcw,
  },
} satisfies Record<
  SourceSignalAction,
  {
    label: string
    updatingLabel: string
    successLabel: string
    idleMessage: string
    successMessage: string
    alreadyMessage: string
    icon: typeof Archive
  }
>

function formatSignalActionError(error: string | undefined) {
  if (!error) {
    return 'The source signal could not be updated. Please try again.'
  }

  if (error === 'not_authenticated') {
    return 'You must be signed in before updating a source signal.'
  }

  if (error === 'not_brain_admin') {
    return 'Only the configured Brain admin account can update source signals.'
  }

  if (error === 'missing_signal_id') {
    return 'The source signal ID was missing.'
  }

  if (error === 'invalid_signal_action') {
    return 'The requested source signal action is not supported.'
  }

  if (error === 'signal_not_found') {
    return 'The source signal could not be found.'
  }

  if (error === 'source_signal_update_failed') {
    return 'The source signal could not be updated in Supabase.'
  }

  return error.replaceAll('_', ' ')
}

export function SourceSignalActionButton({
  signalId,
  action,
  disabled = false,
}: SourceSignalActionButtonProps) {
  const router = useRouter()
  const [status, setStatus] = useState<ActionStatus>('idle')
  const [message, setMessage] = useState<string | null>(null)

  const copy = actionCopy[action]
  const Icon = copy.icon

  async function updateSourceSignal() {
    setStatus('updating')
    setMessage(copy.idleMessage)

    try {
      const response = await fetch('/api/brain/update-source-signal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          signalId,
          action,
        }),
      })

      const result = (await response.json()) as SourceSignalActionResponse

      if (!response.ok || !result.ok) {
        setStatus('error')
        setMessage(formatSignalActionError(result.error))
        return
      }

      setStatus('success')
      setMessage(result.alreadyUpdated ? copy.alreadyMessage : copy.successMessage)

      router.refresh()
    } catch {
      setStatus('error')
      setMessage('The source signal update request could not be sent. Please check the connection and try again.')
    }
  }

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={updateSourceSignal}
        disabled={disabled || status === 'updating' || status === 'success'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm font-bold text-sand shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF] disabled:cursor-not-allowed disabled:bg-sand/5 disabled:text-sand/35 sm:w-auto"
      >
        {status === 'updating'
          ? copy.updatingLabel
          : status === 'success'
            ? copy.successLabel
            : copy.label}

        {status === 'updating' ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
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
              <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            )}

            <p>{message}</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
