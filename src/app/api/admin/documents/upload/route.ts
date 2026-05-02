import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { saveUploadedDocument } from '@/lib/document-storage'

export const runtime = 'nodejs'

function toAdminDocument(document: {
  id: string
  type: string
  filename: string
  originalName: string
  fileSize: number
  mimeType: string
  description: string | null
  year: number
  status: string
  createdAt: Date
  updatedAt: Date
  user: { id: string; name: string | null; email: string }
  uploadedBy: { id: string; name: string | null; email: string }
}) {
  return {
    ...document,
    fileName: document.filename,
    title: document.description || document.originalName,
    fileType: document.mimeType,
    category: document.type,
    uploadedAt: document.createdAt.toISOString(),
    createdAt: document.createdAt.toISOString(),
    updatedAt: document.updatedAt.toISOString(),
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file')
    const userId = formData.get('userId')?.toString()
    const type = formData.get('type')?.toString() || formData.get('category')?.toString() || 'other'
    const description =
      formData.get('description')?.toString() || formData.get('title')?.toString() || null
    const year = Number(formData.get('year')?.toString()) || new Date().getFullYear()

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 })
    }

    if (!userId) {
      return NextResponse.json({ error: 'Client is required' }, { status: 400 })
    }

    const client = await prisma.user.findUnique({ where: { id: userId } })
    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    const stored = await saveUploadedDocument(file, year)

    const document = await prisma.document.create({
      data: {
        userId: client.id,
        uploadedById: session.user.id,
        type,
        filename: stored.filename,
        originalName: stored.originalName,
        filePath: stored.filePath,
        fileSize: stored.fileSize,
        mimeType: stored.mimeType,
        description,
        year,
        status: 'pending',
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        uploadedBy: { select: { id: true, name: true, email: true } },
      },
    })

    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'upload',
        entity: 'document',
        entityId: document.id,
        details: JSON.stringify({ clientEmail: client.email, originalName: stored.originalName }),
      },
    })

    const mappedDocument = toAdminDocument(document)

    return NextResponse.json({ success: true, document: mappedDocument, ...mappedDocument }, { status: 201 })
  } catch (error) {
    console.error('Error uploading admin document:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload document' },
      { status: 500 }
    )
  }
}
