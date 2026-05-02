import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

const parseFields = (fields: string) => {
  try {
    return JSON.parse(fields)
  } catch {
    return []
  }
}

export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  try {
    const signatureRequest = await prisma.signatureRequest.findUnique({
      where: { accessToken: params.token },
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
      },
    })

    if (!signatureRequest) {
      return NextResponse.json({ error: 'Invalid signing link' }, { status: 404 })
    }

    if (signatureRequest.expiresAt && new Date() > signatureRequest.expiresAt) {
      await prisma.signatureRequest.update({
        where: { id: signatureRequest.id },
        data: { status: 'expired' },
      })
      return NextResponse.json({ error: 'This signing request has expired' }, { status: 410 })
    }

    if (signatureRequest.status === 'cancelled') {
      return NextResponse.json({ error: 'This signing request has been cancelled' }, { status: 410 })
    }

    if (signatureRequest.status === 'signed') {
      return NextResponse.json(
        { error: 'This document has already been signed', alreadySigned: true },
        { status: 200 }
      )
    }

    if (signatureRequest.verificationCode && !signatureRequest.codeVerifiedAt) {
      return NextResponse.json({ requiresVerification: true })
    }

    if (signatureRequest.status === 'pending') {
      await prisma.signatureRequest.update({
        where: { id: signatureRequest.id },
        data: { status: 'viewed' },
      })
    }

    return NextResponse.json({
      signatureRequest: {
        id: signatureRequest.id,
        status: signatureRequest.status === 'pending' ? 'viewed' : signatureRequest.status,
        message: signatureRequest.message,
        expiresAt: signatureRequest.expiresAt,
        fields: parseFields(signatureRequest.fields),
        document: {
          id: signatureRequest.document.id,
          title: signatureRequest.document.originalName,
          fileName: signatureRequest.document.filename,
          fileType: signatureRequest.document.mimeType,
        },
        recipient: signatureRequest.recipient,
      },
    })
  } catch (error) {
    console.error('Error fetching signing session:', error)
    return NextResponse.json({ error: 'Failed to load signing session' }, { status: 500 })
  }
}
