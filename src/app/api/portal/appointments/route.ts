import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const filter = searchParams.get('filter') || 'upcoming'
    const now = new Date()

    let where: any = { clientId: session.user.id }

    if (filter === 'upcoming') {
      where = {
        ...where,
        date: { gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()) },
        status: { in: ['scheduled', 'confirmed'] },
      }
    } else if (filter === 'past') {
      where = {
        ...where,
        OR: [
          { date: { lt: new Date(now.getFullYear(), now.getMonth(), now.getDate()) } },
          { status: { in: ['completed', 'cancelled'] } },
        ],
      }
    }

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        advisor: {
          select: { name: true, email: true },
        },
      },
      orderBy: { date: 'asc' },
    })

    const serialized = appointments.map((a) => ({
      id: a.id,
      type: a.type,
      service: a.type,
      date: a.date.toISOString().split('T')[0],
      time: a.time,
      status: a.status,
      notes: a.notes,
      advisor: a.advisor,
      meetingUrl: null,
    }))

    return NextResponse.json({ appointments: serialized })
  } catch (error) {
    console.error('Error fetching portal appointments:', error)
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { service, type, date, time, notes } = body

    if (!service || !type || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const conflict = await prisma.appointment.findFirst({
      where: {
        date: new Date(date),
        time,
        status: { in: ['scheduled', 'confirmed'] },
      },
    })

    if (conflict) {
      return NextResponse.json({ error: 'This time slot is no longer available' }, { status: 400 })
    }

    const appointment = await prisma.appointment.create({
      data: {
        clientId: session.user.id,
        date: new Date(date),
        time,
        type: service,
        status: 'scheduled',
        notes: notes || null,
        location: type === 'in-person' ? 'In Person' : type === 'phone' ? 'Phone Call' : 'Virtual / Remote Consultation',
      },
    })

    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'book',
        entity: 'appointment',
        entityId: appointment.id,
        details: JSON.stringify({ type, date, time }),
      },
    })

    return NextResponse.json({ success: true, appointment }, { status: 201 })
  } catch (error) {
    console.error('Error creating portal appointment:', error)
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 })
  }
}
