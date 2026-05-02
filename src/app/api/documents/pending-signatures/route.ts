import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const requests = await prisma.signatureRequest.findMany({
      where: {
        recipientId: session.user.id,
        status: { in: ['pending', 'viewed'] },
      },
      include: {
        document: {
          select: {
            originalName: true,
            filename: true,
          },
        },
        requestedBy: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      requests: requests.map((request) => ({
        id: request.id,
        accessToken: request.accessToken,
        status: request.status,
        message: request.message,
        createdAt: request.createdAt,
        expiresAt: request.expiresAt,
        document: {
          title: request.document.originalName,
          fileName: request.document.filename,
        },
        requestedBy: request.requestedBy,
      })),
    })
  } catch (error) {
    console.error('Error fetching pending signatures:', error)
    return NextResponse.json({ error: 'Failed to fetch pending signatures' }, { status: 500 })
  }
}
