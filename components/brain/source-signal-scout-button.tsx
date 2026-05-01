'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Radar, XCircle } from 'lucide-react'

type ScoutStatus = 'idle' | 'scouting' | 'success' | 'error'

type SourceSignalScoutButtonProps = {
  sourceUrl: string
  signalTitle: string
  signalSummary?: string | null
  disabled?: boolean
}

type SourceScoutResponse = {
  ok: boolean
  agentRunId?: string
  findingsCreated?: number
  error?: string
  detail?: string | null
  rawError?: unknown
}

function formatScoutError(error: string | undefined, detail?: string | null) {
  if (detail) {
    return detail
  }

  if (!error) {
    return 'Source Scout could not inspect this signal. Please try again.'
  }

  if (error === 'not_authenticated') {
    return 'You must be signed in before running Source Scout.'
  }

  if (error === 'not_brain_admin') {
    return 'Only the configured Brain admin account can run Source Scout.'
  }

  if (error === 'invalid_source_url') {
    return 'The source URL for this signal is missing or invalid.'
  }

  if (error === 'missing_openai_api_key') {
    return 'OPENAI_API_KEY is not configured for Source Scout.'
  }

  if (error === 'agent_run_create_failed') {
    return 'The Scout agent run could not be created.'
  }

  if (error === 'openai_request_failed') {
    return 'OpenAI returned an error while Source Scout was inspecting this signal.'
  }

  if (error === 'findings_insert_failed') {
    return 'Source Scout completed, but the findings could not be saved.'
  }

  return error.replaceAll('_', ' ')
}

function createSignalFocus(signalTitle: string, signalSummary?: string | null) {
  return [
    'Inspect this specific source signal from the intake queue.',
    '',
    `Signal title: ${signalTitle}`,
    signalSummary ? `Signal summary: ${signalSummary}` : null,
    '',
    'Return only practically meaningful findings that may affect DeepMind Resources lessons, sandbox tasks, tool intelligence, model/tool comparisons, or business training.',
    'Do not create duplicate findings for the same update.',
  ]
    .filter(Boolean)
    .join('\n')
}

export function SourceSignalScoutButton({
  sourceUrl,
  signalTitle,
  signalSummary = null,
  disabled = false,
}: SourceSignalScoutButtonProps) {
  const router = useRouter()
  const [status, setStatus] = useState<ScoutStatus>('idle')
  const [message, setMessage] = useState<string | null>(null)

  async function scoutSignal() {
    setStatus('scouting')
    setMessage('Running Source Scout on this signal and creating review findings if useful.')

    try {
      const response = await fetch('/api/brain/source-scout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceUrl,
          focus: createSignalFocus(signalTitle, signalSummary),
        }),
      })

      const result = (await response.json()) as SourceScoutResponse

      if (!response.ok || !result.ok) {
        setStatus('error')
        setMessage(formatScoutError(result.error, result.detail))
        return
      }

      const findingsCreated = result.findingsCreated ?? 0

      setStatus('success')
      setMessage(
        findingsCreated > 0
          ? `Source Scout created ${findingsCreated} candidate finding${
              findingsCreated === 1 ? '' : 's'
            } for review.`
          : 'Source Scout completed and did not find a strong candidate finding for this signal.',
      )

      router.refresh()
    } catch {
      setStatus('error')
      setMessage('The Source Scout request could not be sent. Please check the connection and try again.')
    }
  }

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={scoutSignal}
        disabled={disabled || status === 'scouting' || status === 'success'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF] disabled:cursor-not-allowed disabled:bg-[#123BFF]/45 sm:w-auto"
      >
        {status === 'scouting'
          ? 'Scouting signal'
          : status === 'success'
            ? 'Signal scouted'
            : 'Scout this signal'}

        {status === 'scouting' ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Radar className="h-4 w-4" aria-hidden="true" />
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
            ) : status === 'scouting' ? (
              <Loader2 className="mt-0.5 h-5 w-5 shrink-0 animate-spin" aria-hidden="true" />
            ) : (
              <Radar className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            )}

            <p>{message}</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
