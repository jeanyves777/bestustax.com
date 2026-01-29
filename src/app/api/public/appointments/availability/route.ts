import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

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

    const bookedSlots = appointments.map((apt) => apt.time)

    return NextResponse.json({ bookedSlots })
  } catch (error) {
    console.error('Error fetching availability:', error)
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    )
  }
}
