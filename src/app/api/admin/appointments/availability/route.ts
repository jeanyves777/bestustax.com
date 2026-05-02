import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

function parseDateOnly(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return null
  return new Date(Date.UTC(year, month - 1, day))
}

function parseTimeToMinutes(value: string) {
  const match = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!match) return null
  let hours = Number(match[1])
  const minutes = Number(match[2])
  const period = match[3].toUpperCase()
  if (period === 'PM' && hours !== 12) hours += 12
  if (period === 'AM' && hours === 12) hours = 0
  return hours * 60 + minutes
}

function formatMinutes(totalMinutes: number) {
  const hours24 = Math.floor(totalMinutes / 60) % 24
  const minutes = totalMinutes % 60
  const period = hours24 >= 12 ? 'PM' : 'AM'
  const hours12 = hours24 % 12 || 12
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`
}

function normalizeTime(value: string) {
  const minutes = parseTimeToMinutes(value)
  return minutes === null ? value : formatMinutes(minutes)
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    const advisorId = searchParams.get('advisorId')

    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 })
    }

    const targetDate = parseDateOnly(date)
    if (!targetDate) {
      return NextResponse.json({ error: 'Invalid date' }, { status: 400 })
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        date: targetDate,
        status: { in: ['scheduled', 'confirmed'] },
        ...(advisorId && advisorId !== 'all' ? { advisorId } : {}),
      },
      select: {
        time: true,
        duration: true,
        client: {
          select: { name: true, email: true },
        },
      },
    })

    return NextResponse.json(
      {
        bookedSlots: appointments.map((appointment) => normalizeTime(appointment.time)),
        appointments,
      },
      {
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching admin appointment availability:', error)
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 })
  }
}
