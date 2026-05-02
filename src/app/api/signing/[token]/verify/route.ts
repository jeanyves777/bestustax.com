import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(
  request: Request,
  { params }: { params: { token: string } }
) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json({ error: 'Verification code is required' }, { status: 400 })
    }

    const signatureRequest = await prisma.signatureRequest.findUnique({
      where: { accessToken: params.token },
    })

    if (!signatureRequest) {
      return NextResponse.json({ error: 'Invalid signing link' }, { status: 404 })
    }

    if (signatureRequest.expiresAt && new Date() > signatureRequest.expiresAt) {
      return NextResponse.json({ error: 'This signing request has expired' }, { status: 410 })
    }

    if (signatureRequest.status === 'cancelled') {
      return NextResponse.json({ error: 'This signing request has been cancelled' }, { status: 410 })
    }

    if (signatureRequest.status === 'signed') {
      return NextResponse.json({ error: 'This document has already been signed' }, { status: 200 })
    }

    if (signatureRequest.verificationCode !== String(code).trim()) {
      return NextResponse.json(
        { error: 'Invalid verification code. Please check the code in your email.' },
        { status: 403 }
      )
    }

    await prisma.signatureRequest.update({
      where: { id: signatureRequest.id },
      data: { codeVerifiedAt: new Date() },
    })

    return NextResponse.json({ verified: true })
  } catch (error) {
    console.error('Error verifying signing code:', error)
    return NextResponse.json({ error: 'Failed to verify code' }, { status: 500 })
  }
}
