import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

function toAdvisorDocument(document: any) {
  return {
    id: document.id,
    name: document.originalName,
    type: document.mimeType,
    category: document.type,
    size: document.fileSize,
    status: document.status,
    uploadedAt: document.createdAt.toISOString(),
    url: `/api/advisor/documents/${document.id}/download`,
    user: document.user,
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !['admin', 'advisor'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const where: any = {
      status: status && status !== 'all' ? status : { not: 'deleted' },
    }

    if (session.user.role === 'advisor') {
      where.user = { is: { advisorId: session.user.id } }
    }

    const documents = await prisma.document.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 500,
    })

    return NextResponse.json(
      { documents: documents.map(toAdvisorDocument) },
      { headers: { 'Cache-Control': 'no-store' } }
    )
  } catch (error) {
    console.error('Error fetching advisor documents:', error)
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 })
  }
}
