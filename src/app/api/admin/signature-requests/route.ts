import crypto from 'crypto'
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

const parseJson = (value: string | null) => {
  if (!value) return null
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !['admin', 'advisor'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { documentId, recipientId, fields, message, expiresAt } = await request.json()

    if (!documentId || !recipientId || !Array.isArray(fields) || fields.length === 0) {
      return NextResponse.json(
        { error: 'Document, recipient, and at least one field are required' },
        { status: 400 }
      )
    }

    const document = await prisma.document.findUnique({ where: { id: documentId } })
    if (!document || document.status === 'deleted') {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    if (!document.mimeType.includes('pdf')) {
      return NextResponse.json({ error: 'Only PDF documents can be sent for signature' }, { status: 400 })
    }

    const recipient = await prisma.user.findUnique({
      where: { id: recipientId },
      select: { id: true, name: true, email: true },
    })

    if (!recipient) {
      return NextResponse.json({ error: 'Recipient not found' }, { status: 404 })
    }

    const accessToken = crypto.randomBytes(32).toString('hex')
    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString()

    const signatureRequest = await prisma.signatureRequest.create({
      data: {
        documentId,
        requestedById: session.user.id,
        recipientId,
        fields: JSON.stringify(fields),
        message: message || null,
        accessToken,
        verificationCode,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
      include: {
        document: true,
        recipient: { select: { id: true, name: true, email: true } },
        requestedBy: { select: { id: true, name: true, email: true } },
      },
    })

    await prisma.notification.create({
      data: {
        userId: recipientId,
        type: 'signature_requested',
        title: 'Signature Required',
        message: `Please sign "${document.originalName}"`,
        link: `/sign/${accessToken}`,
      },
    })

    const signingUrl = `${getAppUrl()}/sign/${accessToken}`
    const requesterName = session.user.name || 'BestUSTax'

    await sendEmail({
      to: recipient.email,
      subject: `Signature Required: ${document.originalName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#1f2937;">
          <div style="background:#912501;color:white;padding:26px;border-radius:10px 10px 0 0;text-align:center;">
            <h1 style="margin:0;font-size:26px;">Signature Required</h1>
          </div>
          <div style="border:1px solid #e5e7eb;border-top:0;padding:28px;background:#f9fafb;">
            <p>Hello ${recipient.name || recipient.email},</p>
            <p>${requesterName} has sent you a BestUSTax document that requires your electronic signature.</p>
            <div style="background:white;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin:18px 0;">
              <p style="margin:0;"><strong>Document:</strong> ${document.originalName}</p>
              <p style="margin:8px 0 0;"><strong>Fields to complete:</strong> ${fields.length}</p>
              ${message ? `<p style="margin:8px 0 0;"><strong>Message:</strong> ${message}</p>` : ''}
              ${expiresAt ? `<p style="margin:8px 0 0;"><strong>Please sign by:</strong> ${formatDateET(new Date(expiresAt))}</p>` : ''}
            </div>
            <div style="background:#fff7ed;border:2px solid #c7ae6a;border-radius:10px;padding:16px;text-align:center;margin:20px 0;">
              <p style="margin:0 0 8px;font-size:13px;color:#912501;font-weight:bold;">Verification Code</p>
              <p style="margin:0;font-size:34px;letter-spacing:8px;font-family:monospace;font-weight:bold;color:#2e353d;">${verificationCode}</p>
              <p style="margin:8px 0 0;font-size:12px;color:#6b7280;">You will need this code before signing.</p>
            </div>
            <p style="text-align:center;margin:28px 0;">
              <a href="${signingUrl}" style="display:inline-block;background:#912501;color:white;padding:13px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">Review and Sign</a>
            </p>
            <p style="font-size:12px;color:#6b7280;">This link is unique to you. Do not forward it.</p>
          </div>
          <div style="text-align:center;color:#6b7280;font-size:13px;padding:18px;">
            BestUSTax<br>info@bestustax.com
          </div>
        </div>
      `,
    })

    return NextResponse.json({
      signatureRequest: {
        ...signatureRequest,
        fields,
        signatures: parseJson(signatureRequest.signatures),
      },
    })
  } catch (error) {
    console.error('Error creating signature request:', error)
    return NextResponse.json({ error: 'Failed to create signature request' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !['admin', 'advisor'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const documentId = searchParams.get('documentId')
    const recipientId = searchParams.get('recipientId')

    const signatureRequests = await prisma.signatureRequest.findMany({
      where: {
        ...(documentId ? { documentId } : {}),
        ...(recipientId ? { recipientId } : {}),
      },
      include: {
        document: {
          select: {
            id: true,
            originalName: true,
            filename: true,
            mimeType: true,
          },
        },
        recipient: { select: { id: true, name: true, email: true } },
        requestedBy: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 500,
    })

    return NextResponse.json({
      signatureRequests: signatureRequests.map((signatureRequest) => ({
        ...signatureRequest,
        fields: parseJson(signatureRequest.fields) || [],
        signatures: parseJson(signatureRequest.signatures),
      })),
    })
  } catch (error) {
    console.error('Error fetching signature requests:', error)
    return NextResponse.json({ error: 'Failed to fetch signature requests' }, { status: 500 })
  }
}
