import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

type ResendAddress =
  | string
  | {
      email?: string
      name?: string
    }

type ResendInboundPayload = {
  type?: string
  created_at?: string
  data?: {
    email_id?: string
    from?: ResendAddress
    to?: ResendAddress[] | ResendAddress
    subject?: string
    created_at?: string
  }
}

function createServiceClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing Supabase service environment variables')
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

function readAddressEmail(address: ResendAddress | undefined) {
  if (!address) {
    return null
  }

  if (typeof address === 'string') {
    return address
  }

  return address.email ?? null
}

function readAddressName(address: ResendAddress | undefined) {
  if (!address || typeof address === 'string') {
    return null
  }

  return address.name ?? null
}

function readPrimaryRecipient(recipients: ResendAddress[] | ResendAddress | undefined) {
  if (!recipients) {
    return null
  }

  const firstRecipient = Array.isArray(recipients) ? recipients[0] : recipients

  return readAddressEmail(firstRecipient)
}

function formatAddress(address: ResendAddress | undefined) {
  if (!address) {
    return null
  }

  if (typeof address === 'string') {
    return address
  }

  if (address.name && address.email) {
    return `${address.name} <${address.email}>`
  }

  return address.email ?? address.name ?? null
}

function formatRecipients(recipients: ResendAddress[] | ResendAddress | undefined) {
  if (!recipients) {
    return []
  }

  const list = Array.isArray(recipients) ? recipients : [recipients]

  return list.map(formatAddress).filter(Boolean)
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: 'DeepMind Resources Resend inbound webhook',
  })
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ResendInboundPayload

    if (payload.type !== 'email.received') {
      console.log('[resend inbound] Ignored webhook event', {
        type: payload.type ?? null,
      })

      return NextResponse.json({
        ok: true,
        ignored: true,
        type: payload.type ?? null,
      })
    }

    const email = payload.data ?? {}
    const resendEmailId = email.email_id ?? null
    const toEmail = readPrimaryRecipient(email.to)

    if (!resendEmailId || !toEmail) {
      console.error('[resend inbound] Missing required inbound email fields', {
        resendEmailId,
        toEmail,
        payload,
      })

      return NextResponse.json(
        {
          ok: false,
          error: 'Missing required inbound email fields',
        },
        {
          status: 400,
        }
      )
    }

    const supabase = createServiceClient()

    const { error } = await supabase.from('contact_messages').upsert(
      {
        resend_email_id: resendEmailId,
        from_email: readAddressEmail(email.from),
        from_name: readAddressName(email.from),
        to_email: toEmail,
        subject: email.subject ?? null,
        raw_payload: payload,
        status: 'received',
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'resend_email_id',
      }
    )

    if (error) {
      console.error('[resend inbound] Failed to store contact message', {
        error: error.message,
        resendEmailId,
      })

      return NextResponse.json(
        {
          ok: false,
          error: 'Failed to store contact message',
        },
        {
          status: 500,
        }
      )
    }

    console.log('[resend inbound] Email stored', {
      type: payload.type,
      emailId: resendEmailId,
      from: formatAddress(email.from),
      to: formatRecipients(email.to),
      subject: email.subject ?? null,
      createdAt: email.created_at ?? payload.created_at ?? null,
    })

    return NextResponse.json({
      ok: true,
      received: true,
      stored: true,
    })
  } catch (error) {
    console.error('[resend inbound] Invalid webhook payload', error)

    return NextResponse.json(
      {
        ok: false,
        error: 'Invalid webhook payload',
      },
      {
        status: 400,
      }
    )
  }
}