import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { resolveStoredDocumentPath } from '@/lib/document-storage'
import { saveSignedPdf, stampPdfWithSignatures } from '@/lib/pdf-signing'
import { sendEmail } from '@/lib/email'

const getAppUrl = () =>
  process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'https://bestustax.com'

const formatET = (date: Date) =>
  date.toLocaleString('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

export async function POST(
  request: Request,
  { params }: { params: { token: string } }
) {
  try {
    const signatureRequest = await prisma.signatureRequest.findUnique({
      where: { accessToken: params.token },
      include: {
        document: true,
        recipient: { select: { name: true, email: true } },
        requestedBy: { select: { name: true, email: true } },
      },
    })

    if (!signatureRequest) {
      return NextResponse.json({ error: 'Invalid signing link' }, { status: 404 })
    }

    if (signatureRequest.status === 'signed') {
      return NextResponse.json({ error: 'Already signed' }, { status: 400 })
    }

    if (signatureRequest.status === 'cancelled') {
      return NextResponse.json({ error: 'Request cancelled' }, { status: 410 })
    }

    if (signatureRequest.expiresAt && new Date() > signatureRequest.expiresAt) {
      return NextResponse.json({ error: 'Request expired' }, { status: 410 })
    }

    if (signatureRequest.verificationCode && !signatureRequest.codeVerifiedAt) {
      return NextResponse.json({ error: 'Verification required' }, { status: 403 })
    }

    const { fieldValues } = await request.json()

    if (!Array.isArray(fieldValues)) {
      return NextResponse.json({ error: 'Field values are required' }, { status: 400 })
    }

    const fields = JSON.parse(signatureRequest.fields || '[]')
    const requiredFields = fields.filter((field: any) => field.required !== false)

    for (const field of requiredFields) {
      const submitted = fieldValues.find((value: any) => value.fieldId === field.id)
      if (!submitted?.value) {
        return NextResponse.json(
          { error: `Missing required field: ${field.label || field.type}` },
          { status: 400 }
        )
      }
    }

    const originalPdfPath = resolveStoredDocumentPath(signatureRequest.document.filePath)
    const fieldsToStamp = fieldValues.flatMap((fieldValue: any) => {
        const field = fields.find((candidate: any) => candidate.id === fieldValue.fieldId)
        if (!field) return []

        return [{
          type: field.type,
          page: field.page,
          x: field.x,
          y: field.y,
          width: field.width,
          height: field.height,
          value: fieldValue.value,
        }]
      })

    const signedPdfBuffer = await stampPdfWithSignatures(originalPdfPath, fieldsToStamp)
    const { filename: signedFileName } = saveSignedPdf(signedPdfBuffer)

    const ipAddress =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const signedAt = new Date()

    await prisma.signatureRequest.update({
      where: { id: signatureRequest.id },
      data: {
        status: 'signed',
        signatures: JSON.stringify(fieldValues),
        signedFileName,
        signedFileUrl: `/api/admin/signature-requests/${signatureRequest.id}/download`,
        signedAt,
        ipAddress,
        userAgent,
      },
    })

    await prisma.notification.create({
      data: {
        userId: signatureRequest.requestedById,
        type: 'signature_completed',
        title: 'Document Signed',
        message: `${signatureRequest.recipient.name || 'Client'} signed "${signatureRequest.document.originalName}"`,
        link: '/admin/documents',
      },
    })

    await sendEmail({
      to: signatureRequest.requestedBy.email,
      subject: `Document Signed: ${signatureRequest.document.originalName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#1f2937;">
          <div style="background:#15803d;color:white;padding:26px;border-radius:10px 10px 0 0;text-align:center;">
            <h1 style="margin:0;font-size:26px;">Document Signed</h1>
          </div>
          <div style="border:1px solid #e5e7eb;border-top:0;padding:28px;background:#f9fafb;">
            <p>Hello ${signatureRequest.requestedBy.name || signatureRequest.requestedBy.email},</p>
            <p>${signatureRequest.recipient.name || 'The client'} signed <strong>${signatureRequest.document.originalName}</strong>.</p>
            <p>Signed on ${formatET(signedAt)} ET.</p>
            <p style="text-align:center;margin:28px 0;">
              <a href="${getAppUrl()}/admin/documents" style="display:inline-block;background:#912501;color:white;padding:13px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">View Document</a>
            </p>
          </div>
        </div>
      `,
    })

    await sendEmail({
      to: signatureRequest.recipient.email,
      subject: `Signing Confirmation: ${signatureRequest.document.originalName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#1f2937;">
          <div style="background:#15803d;color:white;padding:26px;border-radius:10px 10px 0 0;text-align:center;">
            <h1 style="margin:0;font-size:26px;">Signing Confirmation</h1>
          </div>
          <div style="border:1px solid #e5e7eb;border-top:0;padding:28px;background:#f9fafb;">
            <p>Hello ${signatureRequest.recipient.name || signatureRequest.recipient.email},</p>
            <p>This confirms that you electronically signed <strong>${signatureRequest.document.originalName}</strong> on ${formatET(signedAt)} ET.</p>
            <p style="font-size:12px;color:#6b7280;">IP Address: ${ipAddress}<br>Signed at: ${formatET(signedAt)} ET</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error signing document:', error)
    return NextResponse.json({ error: 'Failed to sign document' }, { status: 500 })
  }
}
