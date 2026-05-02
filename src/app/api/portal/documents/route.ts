import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { saveUploadedDocument } from '@/lib/document-storage'

export const runtime = 'nodejs'

function toPortalDocument(document: {
  id: string
  originalName: string
  mimeType: string
  type: string
  fileSize: number
  status: string
  createdAt: Date
  year: number
}) {
  return {
    id: document.id,
    name: document.originalName,
    type: document.mimeType,
    category: document.type,
    size: document.fileSize,
    url: `/api/portal/documents/${document.id}/download`,
    status: document.status,
    uploadedAt: document.createdAt.toISOString(),
    year: document.year,
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const documents = await prisma.document.findMany({
      where: {
        userId: session.user.id,
        status: { not: 'deleted' },
        ...(category && category !== 'all' ? { type: category } : {}),
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(
      { documents: documents.map(toPortalDocument) },
      { headers: { 'Cache-Control': 'no-store' } }
    )
  } catch (error) {
    console.error('Error fetching portal documents:', error)
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file')
    const category = formData.get('category')?.toString() || 'other'
    const year = Number(formData.get('year')?.toString()) || new Date().getFullYear()

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 })
    }

    const stored = await saveUploadedDocument(file, year)
    const document = await prisma.document.create({
      data: {
        userId: session.user.id,
        uploadedById: session.user.id,
        type: category,
        filename: stored.filename,
        originalName: stored.originalName,
        filePath: stored.filePath,
        fileSize: stored.fileSize,
        mimeType: stored.mimeType,
        year,
        status: 'pending',
      },
    })

    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'upload',
        entity: 'document',
        entityId: document.id,
        details: JSON.stringify({ originalName: stored.originalName, category }),
      },
    })

    return NextResponse.json({ success: true, document: toPortalDocument(document) }, { status: 201 })
  } catch (error) {
    console.error('Error uploading portal document:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload document' },
      { status: 500 }
    )
  }
}
