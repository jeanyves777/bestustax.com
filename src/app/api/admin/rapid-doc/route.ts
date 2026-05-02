import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { sendEmail } from '@/lib/email'

function generateCode() {
  return crypto.randomBytes(3).toString('hex').toUpperCase()
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const now = new Date()
    const accesses = await prisma.rapidDocAccess.findMany({
      include: {
        _count: { select: { documents: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 500,
    })

    const stats = {
      total: accesses.length,
      active: accesses.filter((access) => !access.completed && access.expiresAt > now).length,
      completed: accesses.filter((access) => access.completed).length,
      expired: accesses.filter((access) => !access.completed && access.expiresAt <= now).length,
    }

    return NextResponse.json({ accesses, stats }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('Error fetching rapid doc accesses:', error)
    return NextResponse.json({ error: 'Failed to fetch rapid doc accesses' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { clientName, clientEmail } = await request.json()
    if (!clientName || !clientEmail) {
      return NextResponse.json({ error: 'Client name and email are required' }, { status: 400 })
    }

    let code = generateCode()
    for (let attempts = 0; attempts < 5; attempts += 1) {
      const existing = await prisma.rapidDocAccess.findUnique({ where: { code } })
      if (!existing) break
      code = generateCode()
    }

    let user = await prisma.user.findUnique({ where: { email: clientEmail.toLowerCase() } })
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: clientEmail.toLowerCase(),
          name: clientName,
          role: 'client',
          status: 'active',
        },
      })
    }

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const access = await prisma.rapidDocAccess.create({
      data: {
        clientName,
        clientEmail: clientEmail.toLowerCase(),
        code,
        expiresAt,
        userId: user.id,
      },
    })

    const uploadUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://bestustax.com'}/rapid-doc-upload`
    await sendEmail({
      to: clientEmail,
      subject: 'Secure Document Upload Access - BestUSTax',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1f2937;">
          <h1 style="color:#912501;">BestUSTax Secure Upload</h1>
          <p>Hello ${clientName},</p>
          <p>Your secure document upload code is:</p>
          <div style="font-size:32px;font-weight:700;letter-spacing:6px;background:#f3f4f6;padding:18px;text-align:center;border-radius:10px;">${code}</div>
          <p>This code expires in 24 hours.</p>
          <p><a href="${uploadUrl}" style="display:inline-block;background:#912501;color:white;padding:12px 18px;border-radius:8px;text-decoration:none;">Upload Documents</a></p>
          <p style="font-size:13px;color:#6b7280;">If you did not request this, please contact BestUSTax.</p>
        </div>
      `,
    })

    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'create',
        entity: 'rapidDocAccess',
        entityId: access.id,
        details: JSON.stringify({ clientEmail: access.clientEmail }),
      },
    })

    return NextResponse.json({ success: true, code, access }, { status: 201 })
  } catch (error) {
    console.error('Error creating rapid doc access:', error)
    return NextResponse.json({ error: 'Failed to create access' }, { status: 500 })
  }
}
