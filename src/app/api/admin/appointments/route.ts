import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

function startOfUtcDay(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
}

function addDays(date: Date, days: number) {
  const next = new Date(date)
  next.setUTCDate(next.getUTCDate() + days)
  return next
}

function parseDateOnly(value: string, endOfDay = false) {
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return null
  return new Date(Date.UTC(year, month - 1, day, endOfDay ? 23 : 0, endOfDay ? 59 : 0, endOfDay ? 59 : 0, endOfDay ? 999 : 0))
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const dateRange = searchParams.get('dateRange') || searchParams.get('dateFilter')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const advisorId = searchParams.get('advisorId')
    const search = searchParams.get('search')?.trim()
    const limit = Math.min(parseInt(searchParams.get('limit') || '500', 10) || 500, 1000)

    const now = new Date()
    const today = startOfUtcDay(now)
    let dateFilter: Record<string, unknown> = {}

    if (startDate && endDate) {
      const start = parseDateOnly(startDate)
      const end = parseDateOnly(endDate, true)
      if (start && end) {
        dateFilter = { date: { gte: start, lte: end } }
      }
    } else if (dateRange === 'today') {
      dateFilter = { date: { gte: today, lt: addDays(today, 1) } }
    } else if (dateRange === 'week') {
      const startOfWeek = addDays(today, -today.getUTCDay())
      dateFilter = { date: { gte: startOfWeek, lt: addDays(startOfWeek, 7) } }
    } else if (dateRange === 'month') {
      const startOfMonth = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1))
      const endOfMonth = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + 1, 1))
      dateFilter = { date: { gte: startOfMonth, lt: endOfMonth } }
    } else if (dateRange === 'upcoming') {
      dateFilter = { date: { gte: today } }
    } else if (dateRange === 'past') {
      dateFilter = { date: { lt: today } }
    }

    const where: any = {
      ...(status && status !== 'all' ? { status } : {}),
      ...(advisorId && advisorId !== 'all' ? advisorId === 'unassigned' ? { advisorId: null } : { advisorId } : {}),
      ...dateFilter,
    }

    if (search) {
      where.OR = [
        { type: { contains: search } },
        { notes: { contains: search } },
        { client: { is: { name: { contains: search } } } },
        { client: { is: { email: { contains: search } } } },
        { client: { is: { phone: { contains: search } } } },
      ]
    }

    const [appointments, total, upcoming, scheduled, confirmed, completed, cancelled] = await Promise.all([
      prisma.appointment.findMany({
        where,
        include: {
          client: {
            select: { id: true, name: true, email: true, phone: true },
          },
          advisor: {
            select: { id: true, name: true, email: true },
          },
        },
        orderBy: [{ date: 'asc' }, { createdAt: 'desc' }],
        take: limit,
      }),
      prisma.appointment.count(),
      prisma.appointment.count({
        where: { date: { gte: today }, status: { in: ['scheduled', 'confirmed'] } },
      }),
      prisma.appointment.count({ where: { status: 'scheduled' } }),
      prisma.appointment.count({ where: { status: 'confirmed' } }),
      prisma.appointment.count({ where: { status: 'completed' } }),
      prisma.appointment.count({ where: { status: 'cancelled' } }),
    ])

    const serializedAppointments = appointments.map((appointment) => ({
      ...appointment,
      date: appointment.date.toISOString().split('T')[0],
      createdAt: appointment.createdAt.toISOString(),
      updatedAt: appointment.updatedAt.toISOString(),
    }))

    return NextResponse.json(
      {
        appointments: serializedAppointments,
        stats: { total, upcoming, scheduled, confirmed, completed, cancelled },
      },
      {
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 })
  }
}
