import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { documentDownloadHeaders, readStoredDocument } from '@/lib/document-storage'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const document = await prisma.document.findUnique({ where: { id: params.id } })
    if (!document || document.status === 'deleted') {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    const file = await readStoredDocument(document.filePath)
    return new NextResponse(file, {
      headers: documentDownloadHeaders(document.originalName, document.mimeType),
    })
  } catch (error) {
    console.error('Error downloading admin document:', error)
    return NextResponse.json({ error: 'Failed to download document' }, { status: 500 })
  }
}
