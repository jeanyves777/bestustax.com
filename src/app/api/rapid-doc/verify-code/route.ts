import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { code, email } = await request.json()

    if (!code || !email) {
      return NextResponse.json(
        { error: 'Code and email are required' },
        { status: 400 }
      )
    }

    // Find the rapid doc access
    const access = await prisma.rapidDocAccess.findFirst({
      where: {
        code: code.toUpperCase(),
        clientEmail: email.toLowerCase(),
        expiresAt: { gt: new Date() },
        completed: false,
      },
    })

    if (!access) {
      return NextResponse.json(
        { error: 'Invalid or expired access code' },
        { status: 400 }
      )
    }

    // Mark as used
    await prisma.rapidDocAccess.update({
      where: { id: access.id },
      data: { used: true },
    })

    return NextResponse.json({
      success: true,
      sessionId: access.id,
      clientName: access.clientName,
    })
  } catch (error) {
    console.error('Error verifying code:', error)
    return NextResponse.json(
      { error: 'Failed to verify code' },
      { status: 500 }
    )
  }
}
