import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { documentDownloadHeaders, readStoredDocument } from '@/lib/document-storage'

export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  try {
    const signatureRequest = await prisma.signatureRequest.findUnique({
      where: { accessToken: params.token },
      include: { document: true },
    })

    if (!signatureRequest) {
      return NextResponse.json({ error: 'Invalid signing link' }, { status: 404 })
    }

    if (signatureRequest.status === 'cancelled') {
      return NextResponse.json({ error: 'Request cancelled' }, { status: 410 })
    }

    if (signatureRequest.expiresAt && new Date() > signatureRequest.expiresAt) {
      return NextResponse.json({ error: 'Request expired' }, { status: 410 })
    }

    if (signatureRequest.verificationCode && !signatureRequest.codeVerifiedAt) {
      return NextResponse.json({ error: 'Verification required' }, { status: 403 })
    }

    if (!signatureRequest.document.mimeType.includes('pdf')) {
      return NextResponse.json({ error: 'Document is not a PDF' }, { status: 400 })
    }

    const file = await readStoredDocument(signatureRequest.document.filePath)

    return new NextResponse(file, {
      headers: documentDownloadHeaders(
        signatureRequest.document.originalName,
        signatureRequest.document.mimeType,
        'inline'
      ),
    })
  } catch (error) {
    console.error('Error serving signing PDF:', error)
    return NextResponse.json({ error: 'Failed to serve PDF' }, { status: 500 })
  }
}
