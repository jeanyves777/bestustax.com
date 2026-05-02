import fs from 'fs'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { resolveSignedPdfPath } from '@/lib/pdf-signing'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !['admin', 'advisor'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const signatureRequest = await prisma.signatureRequest.findUnique({
      where: { id: params.id },
    })

    if (
      !signatureRequest ||
      signatureRequest.status !== 'signed' ||
      !signatureRequest.signedFileName
    ) {
      return NextResponse.json({ error: 'Signed document not found' }, { status: 404 })
    }

    const filePath = resolveSignedPdfPath(signatureRequest.signedFileName)
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Signed file not found on disk' }, { status: 404 })
    }

    const file = fs.readFileSync(filePath)

    return new NextResponse(file, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `${searchParams.get('inline') === 'true' ? 'inline' : 'attachment'}; filename="${signatureRequest.signedFileName}"`,
        'Cache-Control': 'private, no-store',
      },
    })
  } catch (error) {
    console.error('Error downloading signed document:', error)
    return NextResponse.json({ error: 'Failed to download signed document' }, { status: 500 })
  }
}
