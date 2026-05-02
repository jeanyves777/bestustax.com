import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { status, role, name, phone, advisorId } = body

    const updated = await prisma.user.update({
      where: { id: params.id },
      data: {
        ...(status ? { status } : {}),
        ...(role ? { role } : {}),
        ...(name !== undefined ? { name } : {}),
        ...(phone !== undefined ? { phone } : {}),
        ...(advisorId !== undefined ? { advisorId } : {}),
      },
    })

    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'admin_update',
        entity: 'user',
        entityId: params.id,
        details: JSON.stringify(body),
      },
    })

    return NextResponse.json({ success: true, user: updated })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.user.update({
      where: { id: params.id },
      data: { status: 'suspended' },
    })

    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'admin_suspend',
        entity: 'user',
        entityId: params.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json({ error: 'Failed to suspend user' }, { status: 500 })
  }
}
