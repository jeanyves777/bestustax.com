import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { sendEmail, getAppointmentBookedTemplate, getAdminNotificationTemplate } from '@/lib/email'

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

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, date, time, name, email, phone, notes } = body

    // Validate required fields
    if (!type || !date || !time || !name || !email || !phone) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const normalizedTime = normalizeTime(time)

    // Check if slot is already booked
    const appointmentsForDay = await prisma.appointment.findMany({
      where: {
        date: new Date(date),
        status: { in: ['scheduled', 'confirmed'] },
      },
    })

    const existingAppointment = appointmentsForDay.find(
      (appointment) => normalizeTime(appointment.time) === normalizedTime
    )

    if (existingAppointment) {
      return NextResponse.json(
        { error: 'This time slot is no longer available' },
        { status: 400 }
      )
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          name,
          phone,
          role: 'client',
          status: 'active',
        },
      })
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        clientId: user.id,
        date: new Date(date),
        time: normalizedTime,
        type,
        status: 'scheduled',
        notes,
        location: 'Virtual / Remote Consultation',
      },
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'book',
        entity: 'appointment',
        entityId: appointment.id,
        details: JSON.stringify({ type, date, time: normalizedTime }),
      },
    })

    // Send confirmation email to client
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    const emailTemplate = getAppointmentBookedTemplate(name, {
      type,
      date: formattedDate,
      time: normalizedTime,
    })
    await sendEmail({
      to: email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
    })

    // Send notification to admin
    const adminEmail = process.env.ADMIN_EMAIL
    if (adminEmail) {
      const adminTemplate = getAdminNotificationTemplate('new_appointment', {
        'Client Name': name,
        'Client Email': email,
        'Client Phone': phone,
        Service: type,
        Date: formattedDate,
        Time: normalizedTime,
        Notes: notes || 'None',
      })
      await sendEmail({
        to: adminEmail,
        subject: adminTemplate.subject,
        html: adminTemplate.html,
      })
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Appointment booked successfully',
        appointment: {
          id: appointment.id,
          date: appointment.date,
          time: normalizedTime,
          type: appointment.type,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error booking appointment:', error)
    return NextResponse.json(
      { error: 'An error occurred while booking the appointment' },
      { status: 500 }
    )
  }
}
