import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const BRAIN_ADMIN_EMAIL = 'colintandy@gmail.com'

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
    .select('id, validation_status, related_master_brain_record_id')
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

  if (finding.related_master_brain_record_id) {
    return NextResponse.json(
      {
        ok: false,
        error: 'cannot_archive_promoted_finding',
        detail:
          'This finding is already linked to a Master Brain record. Keep it as review history.',
      },
      { status: 409 },
    )
  }

  if (finding.validation_status === 'archived') {
    return NextResponse.json({
      ok: true,
      alreadyArchived: true,
    })
  }

  const { error: updateError } = await supabase
    .from('agent_findings')
    .update({
      validation_status: 'archived',
    })
    .eq('id', findingId)

  if (updateError) {
    return NextResponse.json(
      {
        ok: false,
        error: 'archive_failed',
        detail: updateError.message,
      },
      { status: 500 },
    )
  }

  revalidatePath('/brain')

  return NextResponse.json({
    ok: true,
    archived: true,
  })
}
