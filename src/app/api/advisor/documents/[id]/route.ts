import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

async function canAccessDocument(documentId: string, userId: string, role: string) {
  const document = await prisma.document.findUnique({
    where: { id: documentId },
    include: { user: { select: { advisorId: true } } },
  })

  if (!document) return null
  if (role === 'admin' || document.user.advisorId === userId) return document
  return null
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !['admin', 'advisor'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const document = await canAccessDocument(params.id, session.user.id, session.user.role)
    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    const { status } = await request.json()
    if (!['pending', 'verified', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const updated = await prisma.document.update({
      where: { id: params.id },
      data: { status },
    })

    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'review',
        entity: 'document',
        entityId: updated.id,
        details: JSON.stringify({ status }),
      },
    })

    return NextResponse.json({ success: true, document: updated })
  } catch (error) {
    console.error('Error updating advisor document:', error)
    return NextResponse.json({ error: 'Failed to update document' }, { status: 500 })
  }
}
