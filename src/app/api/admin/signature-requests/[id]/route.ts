import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

const parseJson = (value: string | null) => {
  if (!value) return null
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

export async function GET(
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
        recipient: { select: { id: true, name: true, email: true } },
        requestedBy: { select: { id: true, name: true, email: true } },
      },
    })

    if (!signatureRequest) {
      return NextResponse.json({ error: 'Signature request not found' }, { status: 404 })
    }

    return NextResponse.json({
      signatureRequest: {
        ...signatureRequest,
        fields: parseJson(signatureRequest.fields) || [],
        signatures: parseJson(signatureRequest.signatures),
      },
    })
  } catch (error) {
    console.error('Error fetching signature request:', error)
    return NextResponse.json({ error: 'Failed to fetch signature request' }, { status: 500 })
  }
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

    const body = await request.json()

    if (body.status !== 'cancelled') {
      return NextResponse.json({ error: 'Invalid update' }, { status: 400 })
    }

    const signatureRequest = await prisma.signatureRequest.update({
      where: { id: params.id },
      data: { status: 'cancelled' },
    })

    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'cancel',
        entity: 'signatureRequest',
        entityId: signatureRequest.id,
      },
    })

    return NextResponse.json({ signatureRequest })
  } catch (error) {
    console.error('Error updating signature request:', error)
    return NextResponse.json({ error: 'Failed to update signature request' }, { status: 500 })
  }
}
