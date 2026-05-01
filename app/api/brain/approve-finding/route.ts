import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const BRAIN_ADMIN_EMAIL = 'colintandy@gmail.com'

const allowedConfidenceLevels = ['high', 'medium', 'low', 'unreviewed'] as const

type AgentFinding = {
  id: string
  title: string
  summary: string
  finding_type: string
  confidence_level: string
  validation_status: string
  recommended_action: string | null
  related_source_id: string | null
  related_master_brain_record_id: string | null
  raw_payload: Record<string, unknown> | null
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

function cleanString(value: unknown) {
  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()

  return trimmed ? trimmed : null
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

function mapFindingTypeToRecordType(findingType: string) {
  if (findingType === 'model_release') {
    return 'model_release_note'
  }

  if (findingType === 'api_change') {
    return 'api_change'
  }

  if (findingType === 'pricing_change') {
    return 'pricing_note'
  }

  if (findingType === 'tool_capability_change' || findingType === 'tool_launch') {
    return 'tool_capability'
  }

  if (findingType === 'tool_limitation') {
    return 'tool_limitation'
  }

  if (findingType === 'tool_deprecation') {
    return 'deprecation_record'
  }

  if (findingType === 'documentation_update') {
    return 'documentation_summary'
  }

  if (findingType === 'safety_update') {
    return 'safety_note'
  }

  if (findingType === 'lesson_update_candidate') {
    return 'lesson_material'
  }

  if (findingType === 'sandbox_task_candidate') {
    return 'sandbox_task'
  }

  if (findingType === 'tool_comparison_candidate') {
    return 'tool_comparison'
  }

  if (findingType === 'business_ai_workflow_update') {
    return 'business_training_note'
  }

  return 'verified_claim'
}

function getPayloadString(payload: Record<string, unknown> | null, key: string) {
  if (!payload) {
    return null
  }

  const value = payload[key]

  return typeof value === 'string' && value.trim() ? value.trim() : null
}

async function archiveRelatedSourceSignal(
  supabase: Awaited<ReturnType<typeof createClient>>,
  sourceUrl: string | null,
) {
  if (!sourceUrl) {
    return {
      archived: false,
      error: null as string | null,
    }
  }

  const sourceSignalColumns = ['item_url', 'canonical_url', 'external_id'] as const
  let archived = false

  for (const column of sourceSignalColumns) {
    const { data, error } = await supabase
      .from('source_feed_items')
      .update({
        relevance_status: 'archived',
        review_status: 'archived',
      })
      .eq(column, sourceUrl)
      .select('id')

    if (error) {
      return {
        archived,
        error: error.message,
      }
    }

    if (data && data.length > 0) {
      archived = true
    }
  }

  return {
    archived,
    error: null as string | null,
  }
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

  const findingId = cleanString((payload as { findingId?: unknown }).findingId)

  if (!findingId) {
    return NextResponse.json(
      {
        ok: false,
        error: 'missing_finding_id',
      },
      { status: 400 },
    )
  }

  const supabase = await createClient()

  const { data: finding, error: findingError } = await supabase
    .from('agent_findings')
    .select(
      'id, title, summary, finding_type, confidence_level, validation_status, recommended_action, related_source_id, related_master_brain_record_id, raw_payload',
    )
    .eq('id', findingId)
    .single()

  if (findingError || !finding) {
    return NextResponse.json(
      {
        ok: false,
        error: 'finding_not_found',
        detail: findingError?.message ?? null,
      },
      { status: 404 },
    )
  }

  const agentFinding = finding as AgentFinding
  const sourceSignalUrl = getPayloadString(agentFinding.raw_payload, 'source_url')

  if (agentFinding.related_master_brain_record_id) {
    const sourceSignalArchiveResult = await archiveRelatedSourceSignal(supabase, sourceSignalUrl)

    revalidatePath('/brain')

    return NextResponse.json({
      ok: true,
      alreadyApproved: true,
      masterBrainRecordId: agentFinding.related_master_brain_record_id,
      sourceSignalArchived: sourceSignalArchiveResult.archived,
      sourceSignalArchiveError: sourceSignalArchiveResult.error,
    })
  }

  const now = new Date().toISOString()
  const businessImpact = getPayloadString(agentFinding.raw_payload, 'business_impact')
  const lessonImpact = getPayloadString(agentFinding.raw_payload, 'lesson_impact')
  const sandboxImpact = getPayloadString(agentFinding.raw_payload, 'sandbox_impact')
  const sourceNote = getPayloadString(agentFinding.raw_payload, 'source_note')
  const practicalMeaning = [
    agentFinding.recommended_action ? `Recommended action: ${agentFinding.recommended_action}` : null,
    businessImpact ? `Business impact: ${businessImpact}` : null,
    lessonImpact ? `Lesson impact: ${lessonImpact}` : null,
    sandboxImpact ? `Sandbox impact: ${sandboxImpact}` : null,
  ]
    .filter(Boolean)
    .join('\n\n')

  const { data: brainRecord, error: brainRecordError } = await supabase
    .from('master_brain_records')
    .insert({
      record_type: mapFindingTypeToRecordType(agentFinding.finding_type),
      title: agentFinding.title,
      summary: agentFinding.summary,
      practical_meaning: practicalMeaning || agentFinding.summary,
      structured_content: {
        promoted_from: 'agent_finding',
        agent_finding_id: agentFinding.id,
        finding_type: agentFinding.finding_type,
        source_note: sourceNote,
        business_impact: businessImpact,
        lesson_impact: lessonImpact,
        sandbox_impact: sandboxImpact,
        recommended_action: agentFinding.recommended_action,
        raw_payload: agentFinding.raw_payload,
      },
      confidence_level: readAllowedValue(
        agentFinding.confidence_level,
        allowedConfidenceLevels,
        'unreviewed',
      ),
      validation_status: 'verified',
      publication_status: 'internal_only',
      business_relevance: businessImpact,
      uncertainty_notes:
        'Promoted from a private Scout finding. Keep source evidence and publication impact under review before public use.',
      created_by: adminCheck.userId,
      reviewed_by: adminCheck.userId,
      reviewed_at: now,
      last_checked_at: now,
    })
    .select('id')
    .single()

  if (brainRecordError || !brainRecord) {
    return NextResponse.json(
      {
        ok: false,
        error: 'brain_record_create_failed',
        detail: brainRecordError?.message ?? null,
      },
      { status: 500 },
    )
  }

  if (agentFinding.related_source_id) {
    const { error: sourceLinkError } = await supabase.from('master_brain_record_sources').insert({
      master_brain_record_id: brainRecord.id,
      source_id: agentFinding.related_source_id,
      source_role: 'supporting',
      notes: 'Linked from the source associated with the promoted Scout finding.',
    })

    if (sourceLinkError) {
      return NextResponse.json(
        {
          ok: false,
          error: 'source_link_create_failed',
          detail: sourceLinkError.message,
          masterBrainRecordId: brainRecord.id,
        },
        { status: 500 },
      )
    }
  }

  const { error: updateFindingError } = await supabase
    .from('agent_findings')
    .update({
      validation_status: 'verified',
      related_master_brain_record_id: brainRecord.id,
    })
    .eq('id', agentFinding.id)

  if (updateFindingError) {
    return NextResponse.json(
      {
        ok: false,
        error: 'finding_update_failed',
        detail: updateFindingError.message,
        masterBrainRecordId: brainRecord.id,
      },
      { status: 500 },
    )
  }

  const sourceSignalArchiveResult = await archiveRelatedSourceSignal(supabase, sourceSignalUrl)

  revalidatePath('/brain')

  return NextResponse.json({
    ok: true,
    masterBrainRecordId: brainRecord.id,
    sourceSignalArchived: sourceSignalArchiveResult.archived,
    sourceSignalArchiveError: sourceSignalArchiveResult.error,
  })
}
