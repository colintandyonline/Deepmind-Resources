import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const BRAIN_ADMIN_EMAIL = 'colintandy@gmail.com'

export async function GET() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json(
      {
        ok: false,
        error: 'not_authenticated',
      },
      { status: 401 },
    )
  }

  const email = user.email?.trim().toLowerCase() ?? null

  if (email !== BRAIN_ADMIN_EMAIL) {
    return NextResponse.json(
      {
        ok: false,
        error: 'not_brain_admin',
      },
      { status: 403 },
    )
  }

  return NextResponse.json({
    ok: true,
    brainAdmin: true,
    openaiKeyConfigured: Boolean(process.env.OPENAI_API_KEY),
    scoutModel: process.env.OPENAI_SCOUT_MODEL ?? 'gpt-4.1-mini',
  })
}
