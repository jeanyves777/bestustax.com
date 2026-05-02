import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'

const MAX_UPLOAD_SIZE = 25 * 1024 * 1024

export function sanitizeFilename(filename: string) {
  const ext = path.extname(filename)
  const base = path.basename(filename, ext)
  const safeBase = base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)

  return `${safeBase || 'document'}${ext.toLowerCase()}`
}

export function getUploadRoot() {
  return path.join(process.cwd(), 'uploads')
}

export async function saveUploadedDocument(file: File, year: number) {
  if (file.size > MAX_UPLOAD_SIZE) {
    throw new Error('File is too large. Maximum size is 25MB.')
  }

  const safeName = sanitizeFilename(file.name)
  const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}-${safeName}`
  const relativePath = path.join('uploads', 'documents', String(year), uniqueName)
  const absolutePath = path.join(process.cwd(), relativePath)

  await mkdir(path.dirname(absolutePath), { recursive: true })
  await writeFile(absolutePath, Buffer.from(await file.arrayBuffer()))

  return {
    filename: uniqueName,
    originalName: file.name,
    filePath: relativePath.replace(/\\/g, '/'),
    fileSize: file.size,
    mimeType: file.type || 'application/octet-stream',
  }
}

export function resolveStoredDocumentPath(filePath: string) {
  const root = path.resolve(getUploadRoot())
  const absolutePath = path.resolve(process.cwd(), filePath)

  if (!absolutePath.startsWith(root)) {
    throw new Error('Invalid document path')
  }

  return absolutePath
}

export async function readStoredDocument(filePath: string) {
  return readFile(resolveStoredDocumentPath(filePath))
}

export function documentDownloadHeaders(originalName: string, mimeType: string) {
  const safeName = originalName.replace(/"/g, '')
  return {
    'Content-Type': mimeType || 'application/octet-stream',
    'Content-Disposition': `attachment; filename="${safeName}"`,
    'Cache-Control': 'private, no-store',
  }
}
