import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { sendEmail, getAppointmentConfirmationTemplate, getAdminNotificationTemplate } from '@/lib/email'

const serviceTypes: Record<string, { label: string; duration: number }> = {
  'tax-preparation': { label: 'Tax Preparation', duration: 60 },
  'tax-planning': { label: 'Tax Planning Consultation', duration: 45 },
  'business-tax': { label: 'Business Tax Services', duration: 60 },
  bookkeeping: { label: 'Bookkeeping Consultation', duration: 30 },
  general: { label: 'General Consultation', duration: 30 },
  'document-review': { label: 'Document Review', duration: 30 },
}

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

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      clientId,
      clientName,
      clientEmail,
      clientPhone,
      type = 'general',
      date,
      time,
      duration,
      notes,
      location,
      advisorId,
    } = body

    if (!date || !time || !type) {
      return NextResponse.json({ error: 'Date, time, and service type are required' }, { status: 400 })
    }

    const appointmentDate = parseDateOnly(date)
    if (!appointmentDate) {
      return NextResponse.json({ error: 'Invalid date' }, { status: 400 })
    }

    if (!clientId && !clientEmail) {
      return NextResponse.json({ error: 'Client email is required' }, { status: 400 })
    }

    const normalizedTime = normalizeTime(time)
    const appointmentsForDay = await prisma.appointment.findMany({
      where: {
        date: appointmentDate,
        status: { in: ['scheduled', 'confirmed'] },
      },
      include: {
        client: {
          select: { name: true, email: true },
        },
      },
    })

    const existingAppointment = appointmentsForDay.find(
      (appointment) => normalizeTime(appointment.time) === normalizedTime
    )

    if (existingAppointment) {
      return NextResponse.json(
        {
          error: `This slot is already booked by ${existingAppointment.client.name || existingAppointment.client.email}.`,
        },
        { status: 409 }
      )
    }

    let client = clientId
      ? await prisma.user.findUnique({ where: { id: clientId } })
      : null

    if (!client && clientEmail) {
      client = await prisma.user.upsert({
        where: { email: clientEmail.toLowerCase() },
        update: {
          ...(clientName ? { name: clientName } : {}),
          ...(clientPhone ? { phone: clientPhone } : {}),
        },
        create: {
          email: clientEmail.toLowerCase(),
          name: clientName || null,
          phone: clientPhone || null,
          role: 'client',
          status: 'active',
        },
      })
    }

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    const service = serviceTypes[type] || serviceTypes.general
    const appointment = await prisma.appointment.create({
      data: {
        clientId: client.id,
        advisorId: advisorId || null,
        date: appointmentDate,
        time: normalizedTime,
        duration: Number(duration) || service.duration,
        type,
        status: 'scheduled',
        notes: notes || null,
        location: location || 'Virtual / Remote Consultation',
      },
      include: {
        client: {
          select: { id: true, name: true, email: true, phone: true },
        },
        advisor: {
          select: { id: true, name: true, email: true },
        },
      },
    })

    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'admin_create',
        entity: 'appointment',
        entityId: appointment.id,
        details: JSON.stringify({
          clientEmail: appointment.client.email,
          date,
          time: normalizedTime,
          type,
        }),
      },
    })

    const formattedDate = formatDate(appointmentDate)
    const clientTemplate = getAppointmentConfirmationTemplate(appointment.client.name || 'Valued Client', {
      type: service.label,
      date: formattedDate,
      time: normalizedTime,
      location: appointment.location || 'Virtual / Remote Consultation',
    })

    await sendEmail({
      to: appointment.client.email,
      subject: clientTemplate.subject,
      html: clientTemplate.html,
    })

    const adminEmail = process.env.ADMIN_EMAIL
    if (adminEmail) {
      const adminTemplate = getAdminNotificationTemplate('new_appointment', {
        'Client Name': appointment.client.name || 'N/A',
        'Client Email': appointment.client.email,
        'Client Phone': appointment.client.phone || 'N/A',
        Service: service.label,
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
        appointment: {
          ...appointment,
          date: appointment.date.toISOString().split('T')[0],
          createdAt: appointment.createdAt.toISOString(),
          updatedAt: appointment.updatedAt.toISOString(),
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating admin appointment:', error)
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 })
  }
}
