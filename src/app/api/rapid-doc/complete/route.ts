import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { sendEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: 'Upload session is required' }, { status: 400 })
    }

    const access = await prisma.rapidDocAccess.update({
      where: { id: sessionId },
      data: { completed: true },
      include: {
        _count: { select: { documents: true } },
      },
    })

    const adminEmail = process.env.ADMIN_EMAIL
    if (adminEmail) {
      await sendEmail({
        to: adminEmail,
        subject: `Rapid upload completed - ${access.clientName}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1f2937;">
            <h1 style="color:#912501;">Rapid Upload Completed</h1>
            <p><strong>Client:</strong> ${access.clientName}</p>
            <p><strong>Email:</strong> ${access.clientEmail}</p>
            <p><strong>Documents uploaded:</strong> ${access._count.documents}</p>
            <p><a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://bestustax.com'}/admin/documents" style="display:inline-block;background:#912501;color:white;padding:12px 18px;border-radius:8px;text-decoration:none;">Review Documents</a></p>
          </div>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error completing rapid upload:', error)
    return NextResponse.json({ error: 'Failed to complete upload' }, { status: 500 })
  }
}
