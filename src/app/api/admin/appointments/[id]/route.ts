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
    const { status, date, time, type, duration, location, notes, advisorId } = body

    const updated = await prisma.appointment.update({
      where: { id: params.id },
      data: {
        ...(status ? { status } : {}),
        ...(date ? { date: new Date(date) } : {}),
        ...(time ? { time } : {}),
        ...(type ? { type } : {}),
        ...(duration !== undefined ? { duration: Number(duration) } : {}),
        ...(location !== undefined ? { location } : {}),
        ...(notes !== undefined ? { notes } : {}),
        ...(advisorId !== undefined ? { advisorId: advisorId || null } : {}),
      },
      include: {
        client: {
          select: { id: true, name: true, email: true, phone: true },
        },
        advisor: {
          select: { id: true, name: true, email: true },
        },
      },
    })

    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'admin_update',
        entity: 'appointment',
        entityId: params.id,
        details: JSON.stringify(body),
      },
    })

    return NextResponse.json({
      success: true,
      appointment: {
        ...updated,
        date: updated.date.toISOString().split('T')[0],
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
      },
    })
  } catch (error) {
    console.error('Error updating appointment:', error)
    return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 })
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

    await prisma.appointment.delete({ where: { id: params.id } })

    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'admin_delete',
        entity: 'appointment',
        entityId: params.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting appointment:', error)
    return NextResponse.json({ error: 'Failed to delete appointment' }, { status: 500 })
  }
}
