import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

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
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')

    if (!date) {
      return NextResponse.json(
        { error: 'Date is required' },
        { status: 400 }
      )
    }

    // Get all booked appointments for the given date
    const appointments = await prisma.appointment.findMany({
      where: {
        date: new Date(date),
        status: { in: ['scheduled', 'confirmed'] },
      },
      select: { time: true },
    })

    const bookedSlots = appointments.map((apt) => normalizeTime(apt.time))

    return NextResponse.json({ bookedSlots })
  } catch (error) {
    console.error('Error fetching availability:', error)
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    )
  }
}
