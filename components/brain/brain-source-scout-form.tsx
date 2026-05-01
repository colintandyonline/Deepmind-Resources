'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, CheckCircle2, Loader2, Radar, XCircle } from 'lucide-react'

type ScoutStatus = 'idle' | 'running' | 'success' | 'error'

type ScoutResponse = {
  ok: boolean
  agentRunId?: string
  findingsCreated?: number
  error?: string
  detail?: string | null
}

function formatScoutError(error: string | undefined) {
  if (!error) {
    return 'The Source Scout could not complete. Please try again.'
  }

  if (error === 'invalid_source_url') {
    return 'Enter a valid source URL before running the Scout.'
  }

  if (error === 'not_authenticated') {
    return 'You must be signed in before running the Source Scout.'
  }

  if (error === 'not_brain_admin') {
    return 'Only the configured Brain admin account can run the Source Scout.'
  }

  if (error === 'missing_openai_api_key') {
    return 'OPENAI_API_KEY is not available to the server.'
  }

  if (error === 'agent_run_create_failed') {
    return 'The Scout could not create an agent run record in Supabase.'
  }

  if (error === 'openai_request_failed') {
    return 'The OpenAI Scout request failed. Check the server logs or model/tool settings.'
  }

  if (error === 'findings_insert_failed') {
    return 'The Scout completed, but candidate findings could not be saved.'
  }

  return error.replaceAll('_', ' ')
}

export function BrainSourceScoutForm() {
  const router = useRouter()
  const [sourceUrl, setSourceUrl] = useState('')
  const [focus, setFocus] = useState(
    'Find updates that affect business training, sandbox tasks, tool intelligence, or workflow practice.',
  )
  const [status, setStatus] = useState<ScoutStatus>('idle')
  const [message, setMessage] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setStatus('running')
    setMessage('Running Source Scout. This may take a moment while the source is checked.')

    try {
      const response = await fetch('/api/brain/source-scout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceUrl,
          focus,
        }),
      })

      const result = (await response.json()) as ScoutResponse

      if (!response.ok || !result.ok) {
        setStatus('error')
        setMessage(formatScoutError(result.error))
        return
      }

      const findingCount = result.findingsCreated ?? 0

      setStatus('success')
      setMessage(
        findingCount === 1
          ? 'Source Scout completed and created 1 candidate finding.'
          : `Source Scout completed and created ${findingCount} candidate findings.`,
      )

      router.refresh()
    } catch {
      setStatus('error')
      setMessage('The Source Scout request could not be sent. Please check the connection and try again.')
    }
  }

  return (
    <section className="mt-8 rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
            <Radar className="h-4 w-4" aria-hidden="true" />
            Source Scout
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
            Scout official sources before they become Brain records.
          </h2>

          <p className="mt-4 text-base leading-8 text-sand/65">
            Use the Scout to inspect one source URL and create private candidate findings for
            review. Findings are not published, not trusted automatically, and not turned into
            lessons until they pass validation.
          </p>

          <div className="mt-7 rounded-3xl bg-[#EAF7FF] p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#123BFF]">
              Manual trigger only
            </p>
            <p className="mt-3 text-sm leading-7 text-sand/65">
              This is a controlled admin action for source discovery and candidate extraction. It
              does not publish directly or treat model output as verified truth.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-sand/10 bg-white p-5 shadow-sm sm:p-6"
        >
          <label htmlFor="source_url" className="block text-sm font-semibold text-sand">
            Source URL
          </label>

          <input
            id="source_url"
            name="source_url"
            type="url"
            required
            value={sourceUrl}
            onChange={(event) => setSourceUrl(event.target.value)}
            placeholder="https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
            className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
          />

          <label htmlFor="focus" className="mt-5 block text-sm font-semibold text-sand">
            Scout focus
          </label>

          <textarea
            id="focus"
            name="focus"
            rows={5}
            value={focus}
            onChange={(event) => setFocus(event.target.value)}
            placeholder="Find updates that affect business training, sandbox tasks, tool intelligence, or workflow practice."
            className="mt-2 w-full resize-y rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm leading-7 text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
          />

          {message ? (
            <div
              className={`mt-5 rounded-2xl p-4 text-sm font-semibold leading-7 ${
                status === 'success'
                  ? 'border border-emerald-200 bg-emerald-50 text-emerald-800'
                  : status === 'error'
                    ? 'border border-red-200 bg-red-50 text-red-800'
                    : 'border border-[#123BFF]/15 bg-[#EAF7FF] text-sand/70'
              }`}
            >
              <div className="flex gap-3">
                {status === 'success' ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                ) : status === 'error' ? (
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                ) : (
                  <Loader2 className="mt-0.5 h-5 w-5 shrink-0 animate-spin" aria-hidden="true" />
                )}
                <p>{message}</p>
              </div>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={status === 'running'}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF] disabled:cursor-not-allowed disabled:bg-[#123BFF]/45 sm:w-auto"
          >
            {status === 'running' ? 'Running Scout' : 'Run Source Scout'}
            {status === 'running' ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </form>
      </div>
    </section>
  )
}
