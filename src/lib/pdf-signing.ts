import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import { PDFDocument, rgb } from 'pdf-lib'

interface FieldToStamp {
  type: string
  page: number
  x: number
  y: number
  width: number
  height: number
  value: string
}

export async function stampPdfWithSignatures(
  originalPdfPath: string,
  fieldsToStamp: FieldToStamp[]
) {
  const pdfBuffer = fs.readFileSync(originalPdfPath)
  const pdfDoc = await PDFDocument.load(pdfBuffer)
  const pages = pdfDoc.getPages()

  for (const field of fieldsToStamp) {
    const page = pages[field.page - 1]
    if (!page || !field.value) continue

    const { width: pageWidth, height: pageHeight } = page.getSize()
    const absX = (field.x / 100) * pageWidth
    const absWidth = (field.width / 100) * pageWidth
    const absHeight = (field.height / 100) * pageHeight
    const absY = pageHeight - (field.y / 100) * pageHeight - absHeight

    if (field.type === 'signature' || field.type === 'initials') {
      const base64Data = field.value.replace(/^data:image\/\w+;base64,/, '')
      const imageBytes = Buffer.from(base64Data, 'base64')
      const image = await pdfDoc.embedPng(imageBytes)

      page.drawImage(image, {
        x: absX,
        y: absY,
        width: absWidth,
        height: absHeight,
      })
    } else if (field.type === 'date' || field.type === 'text') {
      const fontSize = Math.min(absHeight * 0.5, 11)
      page.drawText(field.value, {
        x: absX + 4,
        y: absY + (absHeight - fontSize) / 2,
        size: fontSize,
        color: rgb(0, 0, 0),
      })
    }
  }

  return Buffer.from(await pdfDoc.save())
}

export function saveSignedPdf(pdfBuffer: Buffer) {
  const uploadsDir = path.join(process.cwd(), 'uploads', 'signed')
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true })
  }

  const filename = `signed_${crypto.randomUUID()}.pdf`
  const filepath = path.join(uploadsDir, filename)
  fs.writeFileSync(filepath, pdfBuffer)

  return { filename, filepath }
}

export function resolveSignedPdfPath(filename: string) {
  const signedRoot = path.resolve(process.cwd(), 'uploads', 'signed')
  const resolved = path.resolve(signedRoot, filename)

  if (!resolved.startsWith(signedRoot)) {
    throw new Error('Invalid signed document path')
  }

  return resolved
}
