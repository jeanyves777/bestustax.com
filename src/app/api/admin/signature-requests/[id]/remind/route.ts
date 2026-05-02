import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { sendEmail } from '@/lib/email'

const getAppUrl = () =>
  process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'https://bestustax.com'

const formatDateET = (date: Date) =>
  date.toLocaleDateString('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !['admin', 'advisor'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const signatureRequest = await prisma.signatureRequest.findUnique({
      where: { id: params.id },
      include: {
        document: true,
        recipient: { select: { name: true, email: true } },
      },
    })

    if (
      !signatureRequest ||
      (signatureRequest.status !== 'pending' && signatureRequest.status !== 'viewed')
    ) {
      return NextResponse.json({ error: 'No pending request found' }, { status: 404 })
    }

    const signingUrl = `${getAppUrl()}/sign/${signatureRequest.accessToken}`

    await sendEmail({
      to: signatureRequest.recipient.email,
      subject: `Reminder: Signature Required - ${signatureRequest.document.originalName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#1f2937;">
          <div style="background:#c7ae6a;color:#2e353d;padding:26px;border-radius:10px 10px 0 0;text-align:center;">
            <h1 style="margin:0;font-size:26px;">Signature Reminder</h1>
          </div>
          <div style="border:1px solid #e5e7eb;border-top:0;padding:28px;background:#f9fafb;">
            <p>Hello ${signatureRequest.recipient.name || signatureRequest.recipient.email},</p>
            <p>This is a reminder that <strong>${signatureRequest.document.originalName}</strong> is still waiting for your signature.</p>
            ${
              signatureRequest.expiresAt
                ? `<p><strong>Please sign by:</strong> ${formatDateET(signatureRequest.expiresAt)}</p>`
                : ''
            }
            <p style="text-align:center;margin:28px 0;">
              <a href="${signingUrl}" style="display:inline-block;background:#912501;color:white;padding:13px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">Sign Now</a>
            </p>
          </div>
        </div>
      `,
    })

    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'remind',
        entity: 'signatureRequest',
        entityId: signatureRequest.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending signature reminder:', error)
    return NextResponse.json({ error: 'Failed to send reminder' }, { status: 500 })
  }
}
