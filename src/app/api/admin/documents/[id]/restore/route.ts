import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const document = await prisma.document.update({
      where: { id: params.id },
      data: {
        status: 'pending',
        deletedAt: null,
      },
    })

    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'restore',
        entity: 'document',
        entityId: document.id,
      },
    })

    return NextResponse.json({ success: true, document })
  } catch (error) {
    console.error('Error restoring document:', error)
    return NextResponse.json({ error: 'Failed to restore document' }, { status: 500 })
  }
}
