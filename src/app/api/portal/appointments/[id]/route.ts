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
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const appointment = await prisma.appointment.findUnique({
      where: { id: params.id },
    })

    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 })
    }

    if (appointment.clientId !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { date, time, type, notes, service } = body

    if (date && time) {
      const conflict = await prisma.appointment.findFirst({
        where: {
          date: new Date(date),
          time,
          status: { in: ['scheduled', 'confirmed'] },
          NOT: { id: params.id },
        },
      })
      if (conflict) {
        return NextResponse.json({ error: 'This time slot is no longer available' }, { status: 400 })
      }
    }

    const updated = await prisma.appointment.update({
      where: { id: params.id },
      data: {
        ...(date ? { date: new Date(date) } : {}),
        ...(time ? { time } : {}),
        ...(service ? { type: service } : type ? { type } : {}),
        ...(notes !== undefined ? { notes } : {}),
      },
    })

    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'update',
        entity: 'appointment',
        entityId: updated.id,
        details: JSON.stringify({ date, time, type, service }),
      },
    })

    return NextResponse.json({ success: true, appointment: updated })
  } catch (error) {
    console.error('Error updating portal appointment:', error)
    return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const appointment = await prisma.appointment.findUnique({
      where: { id: params.id },
    })

    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 })
    }

    if (appointment.clientId !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.appointment.update({
      where: { id: params.id },
      data: { status: 'cancelled' },
    })

    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'cancel',
        entity: 'appointment',
        entityId: params.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error cancelling portal appointment:', error)
    return NextResponse.json({ error: 'Failed to cancel appointment' }, { status: 500 })
  }
}
