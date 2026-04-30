import { NextResponse } from 'next/server'

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

    console.log('[resend inbound] Email received', {
      type: payload.type,
      emailId: email.email_id ?? null,
      from: formatAddress(email.from),
      to: formatRecipients(email.to),
      subject: email.subject ?? null,
      createdAt: email.created_at ?? payload.created_at ?? null,
    })

    return NextResponse.json({
      ok: true,
      received: true,
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