import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const BRAIN_ADMIN_EMAIL = 'colintandy@gmail.com'

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const discoveryActionMap = {
  worth_tracking: {
    discovery_status: 'worth_tracking',
    signal_quality: 'credible',
    rejection_reason: null,
  },
  reject_hype: {
    discovery_status: 'rejected_hype',
    signal_quality: 'hype',
    rejection_reason: 'Rejected as hype or a low-value discovery signal.',
  },
  mark_duplicate: {
    discovery_status: 'duplicate',
    signal_quality: 'duplicate',
    rejection_reason: 'Marked as a duplicate discovery candidate.',
  },
  needs_official_source: {
    discovery_status: 'needs_official_source',
    signal_quality: 'unreviewed',
    rejection_reason: null,
  },
} as const

type DiscoveryAction = keyof typeof discoveryActionMap

type UpdateDiscoveryItemBody = {
  discoveryItemId?: unknown
  action?: unknown
}

function isDiscoveryAction(value: unknown): value is DiscoveryAction {
  return typeof value === 'string' && value in discoveryActionMap
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Authentication required.',
      },
      { status: 401 },
    )
  }

  const adminEmail = user.email?.trim().toLowerCase()

  if (adminEmail !== BRAIN_ADMIN_EMAIL) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Brain admin access required.',
      },
      { status: 403 },
    )
  }

  let body: UpdateDiscoveryItemBody | null = null

  try {
    body = (await request.json()) as UpdateDiscoveryItemBody
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: 'Invalid request body.',
      },
      { status: 400 },
    )
  }

  const discoveryItemId = body?.discoveryItemId

  if (typeof discoveryItemId !== 'string' || !uuidPattern.test(discoveryItemId)) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Valid discovery item ID is required.',
      },
      { status: 400 },
    )
  }

  if (!isDiscoveryAction(body?.action)) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Valid discovery action is required.',
      },
      { status: 400 },
    )
  }

  const updatePayload = {
    ...discoveryActionMap[body.action],
    reviewed_by: user.id,
    reviewed_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('ai_discovery_items')
    .update(updatePayload)
    .eq('id', discoveryItemId)
    .select('id, discovery_status, signal_quality, updated_at')
    .single()

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Discovery item could not be updated.',
      },
      { status: 500 },
    )
  }

  return NextResponse.json({
    ok: true,
    item: data,
  })
}
