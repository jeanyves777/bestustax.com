import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      )
    }

    // Find user with this token
    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
        verificationExpires: { gt: new Date() },
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      )
    }

    // Update user status and clear token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        status: 'active',
        emailVerified: new Date(),
        verificationToken: null,
        verificationExpires: null,
      },
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'verify_email',
        entity: 'user',
        entityId: user.id,
        details: JSON.stringify({ email: user.email }),
      },
    })

    // Redirect to login with success message
    return NextResponse.redirect(
      new URL('/login?verified=true', process.env.NEXT_PUBLIC_APP_URL || 'https://bestustax.com')
    )
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'An error occurred during verification' },
      { status: 500 }
    )
  }
}
