import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const dateRange = searchParams.get('dateRange')

    const now = new Date()
    let dateFilter = {}

    if (dateRange === 'today') {
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
      dateFilter = { date: { gte: startOfDay, lt: endOfDay } }
    } else if (dateRange === 'week') {
      const startOfWeek = new Date(now)
      startOfWeek.setDate(now.getDate() - now.getDay())
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 7)
      dateFilter = { date: { gte: startOfWeek, lt: endOfWeek } }
    } else if (dateRange === 'month') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
      dateFilter = { date: { gte: startOfMonth, lt: endOfMonth } }
    }

    const where = {
      ...(status && status !== 'all' ? { status } : {}),
      ...dateFilter,
    }

    const [appointments, total, upcoming, confirmed, cancelled] = await Promise.all([
      prisma.appointment.findMany({
        where,
        include: {
          client: {
            select: { id: true, name: true, email: true, phone: true },
          },
          advisor: {
            select: { name: true },
          },
        },
        orderBy: { date: 'desc' },
      }),
      prisma.appointment.count(),
      prisma.appointment.count({
        where: { date: { gte: now }, status: { in: ['scheduled', 'confirmed'] } },
      }),
      prisma.appointment.count({ where: { status: 'confirmed' } }),
      prisma.appointment.count({ where: { status: 'cancelled' } }),
    ])

    return NextResponse.json({
      appointments,
      stats: { total, upcoming, confirmed, cancelled },
    })
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 })
  }
}
