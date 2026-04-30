import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

function getStringMetadataValue(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const firstName = getStringMetadataValue(user.user_metadata?.first_name)
        const lastName = getStringMetadataValue(user.user_metadata?.last_name)
        const fullName = getStringMetadataValue(user.user_metadata?.full_name)
        const accountType = getStringMetadataValue(user.user_metadata?.account_type)
        const jobTitle = getStringMetadataValue(user.user_metadata?.job_title)

        const displayName = fullName ?? [firstName, lastName].filter(Boolean).join(' ').trim()

        await supabase.from('user_profiles').upsert({
          id: user.id,
          first_name: firstName,
          last_name: lastName,
          display_name: displayName || null,
          account_type: accountType === 'business' ? 'business' : 'individual',
          job_title: jobTitle,
          onboarding_status: 'complete',
          onboarding_completed_at: new Date().toISOString(),
          last_activity_at: new Date().toISOString(),
        })
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/error`)
}
