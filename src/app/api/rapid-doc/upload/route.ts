import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { saveUploadedDocument } from '@/lib/document-storage'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const sessionId = formData.get('sessionId')?.toString()
    const file = formData.get('file')
    const year = new Date().getFullYear()

    if (!sessionId) {
      return NextResponse.json({ error: 'Upload session is required' }, { status: 400 })
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 })
    }

    const access = await prisma.rapidDocAccess.findUnique({ where: { id: sessionId } })
    if (!access || access.completed || access.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Invalid or expired upload session' }, { status: 400 })
    }

    let user = access.userId
      ? await prisma.user.findUnique({ where: { id: access.userId } })
      : await prisma.user.findUnique({ where: { email: access.clientEmail.toLowerCase() } })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: access.clientEmail.toLowerCase(),
          name: access.clientName,
          role: 'client',
          status: 'active',
        },
      })
    }

    if (!access.userId) {
      await prisma.rapidDocAccess.update({
        where: { id: access.id },
        data: { userId: user.id },
      })
    }

    const stored = await saveUploadedDocument(file, year)
    const document = await prisma.document.create({
      data: {
        userId: user.id,
        uploadedById: user.id,
        type: 'rapid-upload',
        filename: stored.filename,
        originalName: stored.originalName,
        filePath: stored.filePath,
        fileSize: stored.fileSize,
        mimeType: stored.mimeType,
        year,
        status: 'pending',
        rapidDocAccessId: access.id,
      },
    })

    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'rapid_upload',
        entity: 'document',
        entityId: document.id,
        details: JSON.stringify({ originalName: stored.originalName }),
      },
    })

    return NextResponse.json({ success: true, documentId: document.id }, { status: 201 })
  } catch (error) {
    console.error('Error uploading rapid document:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload document' },
      { status: 500 }
    )
  }
}
