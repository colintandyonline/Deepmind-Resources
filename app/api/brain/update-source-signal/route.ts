import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const BRAIN_ADMIN_EMAIL = 'colintandy@gmail.com'

const allowedActions = ['archive', 'duplicate', 'ignore', 'restore'] as const

type SourceSignalAction = (typeof allowedActions)[number]

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

type SourceFeedItem = {
  id: string
  relevance_status: string
  review_status: string
}

function cleanString(value: unknown) {
  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()

  return trimmed ? trimmed : null
}

function isSourceSignalAction(value: string): value is SourceSignalAction {
  return allowedActions.includes(value as SourceSignalAction)
}

function getStatusUpdate(action: SourceSignalAction) {
  if (action === 'archive') {
    return {
      relevance_status: 'archived',
      review_status: 'archived',
    }
  }

  if (action === 'duplicate') {
    return {
      relevance_status: 'duplicate',
      review_status: 'duplicate',
    }
  }

  if (action === 'ignore') {
    return {
      relevance_status: 'ignored',
      review_status: 'ignored',
    }
  }

  return {
    relevance_status: 'new_signal',
    review_status: 'unreviewed',
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

  const signalId = cleanString((payload as { signalId?: unknown }).signalId)
  const action = cleanString((payload as { action?: unknown }).action)

  if (!signalId) {
    return NextResponse.json(
      {
        ok: false,
        error: 'missing_signal_id',
      },
      { status: 400 },
    )
  }

  if (!action || !isSourceSignalAction(action)) {
    return NextResponse.json(
      {
        ok: false,
        error: 'invalid_signal_action',
        allowedActions,
      },
      { status: 400 },
    )
  }

  const supabase = await createClient()

  const { data: signal, error: signalError } = await supabase
    .from('source_feed_items')
    .select('id, relevance_status, review_status')
    .eq('id', signalId)
    .single()

  if (signalError || !signal) {
    return NextResponse.json(
      {
        ok: false,
        error: 'signal_not_found',
        detail: signalError?.message ?? null,
      },
      { status: 404 },
    )
  }

  const sourceSignal = signal as SourceFeedItem
  const statusUpdate = getStatusUpdate(action)

  if (
    sourceSignal.relevance_status === statusUpdate.relevance_status &&
    sourceSignal.review_status === statusUpdate.review_status
  ) {
    revalidatePath('/brain')

    return NextResponse.json({
      ok: true,
      signalId,
      action,
      alreadyUpdated: true,
      relevanceStatus: sourceSignal.relevance_status,
      reviewStatus: sourceSignal.review_status,
    })
  }

  const { error: updateError } = await supabase
    .from('source_feed_items')
    .update(statusUpdate)
    .eq('id', signalId)

  if (updateError) {
    return NextResponse.json(
      {
        ok: false,
        error: 'source_signal_update_failed',
        detail: updateError.message,
      },
      { status: 500 },
    )
  }

  revalidatePath('/brain')

  return NextResponse.json({
    ok: true,
    signalId,
    action,
    updated: true,
    relevanceStatus: statusUpdate.relevance_status,
    reviewStatus: statusUpdate.review_status,
  })
}
