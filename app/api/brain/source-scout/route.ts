import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const BRAIN_ADMIN_EMAIL = 'colintandy@gmail.com'
const DEFAULT_SCOUT_MODEL = 'gpt-4.1-mini'

const allowedFindingTypes = [
  'model_release',
  'api_change',
  'pricing_change',
  'tool_capability_change',
  'tool_limitation',
  'tool_launch',
  'tool_deprecation',
  'documentation_update',
  'agent_framework_update',
  'rag_update',
  'business_ai_workflow_update',
  'safety_update',
  'lesson_update_candidate',
  'sandbox_task_candidate',
  'tool_comparison_candidate',
  'noise',
  'other',
] as const

const allowedConfidenceLevels = ['high', 'medium', 'low', 'unreviewed'] as const
const allowedValidationStatuses = ['unverified_signal', 'needs_review'] as const

type ScoutFinding = {
  finding_type?: string
  title?: string
  summary?: string
  confidence_level?: string
  validation_status?: string
  recommended_action?: string
  source_note?: string
  business_impact?: string
  lesson_impact?: string
  sandbox_impact?: string
}

type ScoutResponse = {
  findings?: ScoutFinding[]
}

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

function readAllowedValue<T extends readonly string[]>(
  value: string | null | undefined,
  allowedValues: T,
  fallback: T[number],
) {
  if (!value) {
    return fallback
  }

  return allowedValues.find((allowedValue) => allowedValue === value) ?? fallback
}

function cleanString(value: unknown) {
  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()

  return trimmed ? trimmed : null
}

function isValidUrl(value: string) {
  try {
    const parsedUrl = new URL(value)

    return parsedUrl.protocol === 'https:' || parsedUrl.protocol === 'http:'
  } catch {
    return false
  }
}

function normalizeScoutText(value: string | null | undefined) {
  if (!value) {
    return ''
  }

  return value
    .trim()
    .toLowerCase()
    .replace(/[^\w\s.-]/g, '')
    .replace(/\s+/g, ' ')
}

function getFindingTypePriority(findingType: string | null | undefined) {
  if (findingType === 'model_release') {
    return 1
  }

  if (findingType === 'api_change') {
    return 2
  }

  if (findingType === 'tool_capability_change') {
    return 3
  }

  if (findingType === 'documentation_update') {
    return 4
  }

  if (findingType === 'business_ai_workflow_update') {
    return 5
  }

  if (findingType === 'lesson_update_candidate') {
    return 6
  }

  if (findingType === 'sandbox_task_candidate') {
    return 7
  }

  if (findingType === 'tool_comparison_candidate') {
    return 8
  }

  return 20
}

function dedupeScoutFindings(findings: ScoutFinding[]) {
  const findingsByKey = new Map<string, ScoutFinding>()

  for (const finding of findings) {
    const titleKey = normalizeScoutText(finding.title)
    const summaryKey = normalizeScoutText(finding.summary)

    if (!titleKey || !summaryKey) {
      continue
    }

    const duplicateKey = `${titleKey}::${summaryKey}`
    const existingFinding = findingsByKey.get(duplicateKey)

    if (
      !existingFinding ||
      getFindingTypePriority(finding.finding_type) <
        getFindingTypePriority(existingFinding.finding_type)
    ) {
      findingsByKey.set(duplicateKey, finding)
    }
  }

  return Array.from(findingsByKey.values())
}

function extractResponseText(responseJson: Record<string, unknown>) {
  const outputText = responseJson.output_text

  if (typeof outputText === 'string') {
    return outputText
  }

  const output = responseJson.output

  if (!Array.isArray(output)) {
    return ''
  }

  const textParts: string[] = []

  for (const item of output) {
    if (!item || typeof item !== 'object') {
      continue
    }

    const content = (item as { content?: unknown }).content

    if (!Array.isArray(content)) {
      continue
    }

    for (const contentItem of content) {
      if (!contentItem || typeof contentItem !== 'object') {
        continue
      }

      const text = (contentItem as { text?: unknown }).text

      if (typeof text === 'string') {
        textParts.push(text)
      }
    }
  }

  return textParts.join('\n').trim()
}

function safeParseScoutResponse(rawText: string): ScoutResponse {
  try {
    return JSON.parse(rawText) as ScoutResponse
  } catch {
    const jsonStart = rawText.indexOf('{')
    const jsonEnd = rawText.lastIndexOf('}')

    if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
      return { findings: [] }
    }

    try {
      return JSON.parse(rawText.slice(jsonStart, jsonEnd + 1)) as ScoutResponse
    } catch {
      return { findings: [] }
    }
  }
}

function createScoutPrompt(sourceUrl: string, focus: string | null) {
  return `
You are the DeepMind Resources Source Scout.

Inspect this source URL and return private candidate findings for admin review.

Source URL:
${sourceUrl}

Scout focus:
${
  focus ??
  'Find AI updates that may affect lessons, sandbox tasks, business training, tool intelligence, user guidance, or workflow practice.'
}

Rules:
- Use the source URL as the primary source.
- Prefer official or source-owned information.
- Do not invent release notes, dates, claims, features, pricing, or model behaviour.
- Do not publish final training content.
- Do not create hype.
- If the source contains many small updates, return only the most practically important items.
- Do not return the same update more than once under different finding types.
- If one update could fit several finding types, choose the single best type.
- If nothing meaningful is found, return an empty findings array.
- Keep each finding concise and operational.
- Mark findings as "unverified_signal" or "needs_review".
- Return JSON only.

Allowed finding_type values:
${allowedFindingTypes.join(', ')}

Allowed confidence_level values:
${allowedConfidenceLevels.join(', ')}

Allowed validation_status values:
${allowedValidationStatuses.join(', ')}
`.trim()
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

async function runOpenAIScout(sourceUrl: string, focus: string | null) {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    return {
      ok: false,
      error: 'missing_openai_api_key',
      findings: [] as ScoutFinding[],
      rawError: null as unknown,
    }
  }

  const model = process.env.OPENAI_SCOUT_MODEL ?? DEFAULT_SCOUT_MODEL

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      input: createScoutPrompt(sourceUrl, focus),
      tools: [
        {
          type: 'web_search',
        },
      ],
      tool_choice: 'auto',
      include: ['web_search_call.action.sources'],
      max_output_tokens: 2200,
      text: {
        format: {
          type: 'json_schema',
          name: 'deepmind_resources_source_scout',
          strict: true,
          schema: {
            type: 'object',
            additionalProperties: false,
            required: ['findings'],
            properties: {
              findings: {
                type: 'array',
                items: {
                  type: 'object',
                  additionalProperties: false,
                  required: [
                    'finding_type',
                    'title',
                    'summary',
                    'confidence_level',
                    'validation_status',
                    'recommended_action',
                    'source_note',
                    'business_impact',
                    'lesson_impact',
                    'sandbox_impact',
                  ],
                  properties: {
                    finding_type: {
                      type: 'string',
                      enum: allowedFindingTypes,
                    },
                    title: {
                      type: 'string',
                    },
                    summary: {
                      type: 'string',
                    },
                    confidence_level: {
                      type: 'string',
                      enum: allowedConfidenceLevels,
                    },
                    validation_status: {
                      type: 'string',
                      enum: allowedValidationStatuses,
                    },
                    recommended_action: {
                      type: 'string',
                    },
                    source_note: {
                      type: 'string',
                    },
                    business_impact: {
                      type: 'string',
                    },
                    lesson_impact: {
                      type: 'string',
                    },
                    sandbox_impact: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
    }),
  })

  const responseJson = (await response.json()) as Record<string, unknown>

  if (!response.ok) {
    return {
      ok: false,
      error: 'openai_request_failed',
      findings: [] as ScoutFinding[],
      rawError: responseJson,
    }
  }

  const responseText = extractResponseText(responseJson)
  const parsedResponse = safeParseScoutResponse(responseText)

  return {
    ok: true,
    error: null,
    findings: Array.isArray(parsedResponse.findings) ? parsedResponse.findings.slice(0, 8) : [],
    rawError: null as unknown,
  }
}

export async function GET() {
  const adminCheck = await checkBrainAdmin()

  if (!adminCheck.ok) {
    return adminCheck.response
  }

  return NextResponse.json({
    ok: true,
    brainAdmin: true,
    openaiKeyConfigured: Boolean(process.env.OPENAI_API_KEY),
    scoutModel: process.env.OPENAI_SCOUT_MODEL ?? DEFAULT_SCOUT_MODEL,
  })
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

  const sourceUrl = cleanString((payload as { sourceUrl?: unknown }).sourceUrl)
  const focus = cleanString((payload as { focus?: unknown }).focus)

  if (!sourceUrl || !isValidUrl(sourceUrl)) {
    return NextResponse.json(
      {
        ok: false,
        error: 'invalid_source_url',
      },
      { status: 400 },
    )
  }

  const supabase = await createClient()

  const { data: relatedSource } = await supabase
    .from('sources')
    .select('id, title')
    .eq('url', sourceUrl)
    .limit(1)
    .maybeSingle()

  const { data: agentRun, error: agentRunError } = await supabase
    .from('agent_runs')
    .insert({
      agent_type: 'scout',
      status: 'running',
      started_at: new Date().toISOString(),
      input_payload: {
        source_url: sourceUrl,
        focus,
        related_source_id: relatedSource?.id ?? null,
      },
      created_by: adminCheck.userId,
    })
    .select('id')
    .single()

  if (agentRunError || !agentRun) {
    return NextResponse.json(
      {
        ok: false,
        error: 'agent_run_create_failed',
        detail: agentRunError?.message ?? null,
      },
      { status: 500 },
    )
  }

  const scoutResult = await runOpenAIScout(sourceUrl, focus)

  if (!scoutResult.ok) {
    await supabase
      .from('agent_runs')
      .update({
        status: 'failed',
        finished_at: new Date().toISOString(),
        error_message: scoutResult.error,
        output_summary: 'Source Scout did not complete successfully.',
      })
      .eq('id', agentRun.id)

    return NextResponse.json(
      {
        ok: false,
        error: scoutResult.error,
        rawError: scoutResult.rawError,
      },
      { status: 500 },
    )
  }

  const dedupedScoutFindings = dedupeScoutFindings(scoutResult.findings)

  const findingsToInsert = dedupedScoutFindings
    .filter((finding) => finding.title && finding.summary)
    .map((finding) => ({
      agent_run_id: agentRun.id,
      finding_type: readAllowedValue(finding.finding_type, allowedFindingTypes, 'other'),
      title: finding.title?.trim() ?? 'Untitled Scout finding',
      summary: finding.summary?.trim() ?? 'No summary returned.',
      confidence_level: readAllowedValue(
        finding.confidence_level,
        allowedConfidenceLevels,
        'unreviewed',
      ),
      validation_status: readAllowedValue(
        finding.validation_status,
        allowedValidationStatuses,
        'unverified_signal',
      ),
      recommended_action: finding.recommended_action?.trim() ?? null,
      related_source_id: relatedSource?.id ?? null,
      raw_payload: {
        source_url: sourceUrl,
        focus,
        related_source_title: relatedSource?.title ?? null,
        source_note: finding.source_note ?? null,
        business_impact: finding.business_impact ?? null,
        lesson_impact: finding.lesson_impact ?? null,
        sandbox_impact: finding.sandbox_impact ?? null,
      },
    }))

  if (findingsToInsert.length > 0) {
    const { error: findingsError } = await supabase.from('agent_findings').insert(findingsToInsert)

    if (findingsError) {
      await supabase
        .from('agent_runs')
        .update({
          status: 'failed',
          finished_at: new Date().toISOString(),
          error_message: findingsError.message,
          output_summary: 'Scout completed, but findings could not be stored.',
        })
        .eq('id', agentRun.id)

      return NextResponse.json(
        {
          ok: false,
          error: 'findings_insert_failed',
          detail: findingsError.message,
        },
        { status: 500 },
      )
    }
  }

  await supabase
    .from('agent_runs')
    .update({
      status: 'completed',
      finished_at: new Date().toISOString(),
      output_summary:
        findingsToInsert.length > 0
          ? `Scout created ${findingsToInsert.length} candidate finding(s).`
          : 'Scout completed with no candidate findings.',
    })
    .eq('id', agentRun.id)

  return NextResponse.json({
    ok: true,
    agentRunId: agentRun.id,
    findingsCreated: findingsToInsert.length,
  })
}

