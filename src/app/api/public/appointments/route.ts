import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { sendEmail, getAppointmentBookedTemplate, getAdminNotificationTemplate } from '@/lib/email'

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

    // Check if slot is already booked
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        date: new Date(date),
        time,
        status: { in: ['scheduled', 'confirmed'] },
      },
    })

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
        time,
        type,
        status: 'scheduled',
        notes,
        location: 'BestUsTax Office, 123 Tax Street, Austin, TX 78701',
      },
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'book',
        entity: 'appointment',
        entityId: appointment.id,
        details: JSON.stringify({ type, date, time }),
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
      time,
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
        Time: time,
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
          time: appointment.time,
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
