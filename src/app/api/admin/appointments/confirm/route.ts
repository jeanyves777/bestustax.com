import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Appointment ID is required' }, { status: 400 })
    }

    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status: 'confirmed' },
      include: {
        client: {
          select: { name: true, email: true },
        },
      },
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'confirm',
        entity: 'appointment',
        entityId: id,
        details: JSON.stringify({ clientEmail: appointment.client.email }),
      },
    })

    // TODO: Send confirmation email to client

    return NextResponse.json({
      success: true,
      message: 'Appointment confirmed successfully',
      appointment,
    })
  } catch (error) {
    console.error('Error confirming appointment:', error)
    return NextResponse.json({ error: 'Failed to confirm appointment' }, { status: 500 })
  }
}
