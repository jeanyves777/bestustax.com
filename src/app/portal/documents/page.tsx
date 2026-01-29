'use client'

import { useState, useEffect, useRef } from 'react'
import {
  FileText,
  MagnifyingGlass,
  Upload,
  Download,
  Trash,
  Eye,
  FolderSimple,
  File,
  FileDoc,
  FilePdf,
  FileImage,
  FileZip,
  SpinnerGap,
  X,
  CloudArrowUp,
  Check
} from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface Document {
  id: string
  name: string
  type: string
  category: string
  size: number
  url: string | null
  status: string
  uploadedAt: string
  year: number | null
}

const categories = [
  { id: 'all', label: 'All Documents' },
  { id: 'w2', label: 'W-2 Forms' },
  { id: '1099', label: '1099 Forms' },
  { id: 'receipts', label: 'Receipts' },
  { id: 'bank-statements', label: 'Bank Statements' },
  { id: 'investment', label: 'Investment Statements' },
  { id: 'property', label: 'Property Documents' },
  { id: 'other', label: 'Other' },
]

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [viewDocument, setViewDocument] = useState<Document | null>(null)

  useEffect(() => {
    fetchDocuments()
  }, [selectedCategory])

  const fetchDocuments = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory)
      }
      const response = await fetch(`/api/portal/documents?${params}`)
      const data = await response.json()
      setDocuments(data.documents || [])
    } catch (error) {
      console.error('Error fetching documents:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteDocument = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return

    try {
      await fetch(`/api/portal/documents/${id}`, {
        method: 'DELETE',
      })
      fetchDocuments()
    } catch (error) {
      console.error('Error deleting document:', error)
    }
  }

  const downloadDocument = (doc: Document) => {
    if (doc.url) {
      window.open(doc.url, '_blank')
    }
  }

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <FilePdf className="w-8 h-8 text-red-500" />
    if (type.includes('word') || type.includes('doc')) return <FileDoc className="w-8 h-8 text-blue-500" />
    if (type.includes('image') || type.includes('png') || type.includes('jpg'))
      return <FileImage className="w-8 h-8 text-green-500" />
    if (type.includes('zip') || type.includes('rar')) return <FileZip className="w-8 h-8 text-yellow-500" />
    return <File className="w-8 h-8 text-gray-500" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const groupedDocuments = filteredDocuments.reduce((acc, doc) => {
    const year = doc.year || new Date(doc.uploadedAt).getFullYear()
    if (!acc[year]) acc[year] = []
    acc[year].push(doc)
    return acc
  }, {} as Record<number, Document[]>)

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Documents</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload and manage your tax documents
          </p>
        </div>
        <Button onClick={() => setShowUploadModal(true)} leftIcon={<Upload weight="bold" />} glow>
          Upload Document
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold">{documents.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Documents</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {documents.filter((d) => d.status === 'verified').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Verified</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {documents.filter((d) => d.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Pending Review</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {formatFileSize(documents.reduce((acc, d) => acc + d.size, 0))}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Size</div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-light-accent-primary text-white'
                  : 'bg-gray-100 dark:bg-dark-bg-tertiary hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<MagnifyingGlass />}
          />
        </div>
      </div>

      {/* Documents List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <SpinnerGap className="w-8 h-8 animate-spin text-light-accent-primary" />
        </div>
      ) : filteredDocuments.length === 0 ? (
        <Card className="p-12 text-center">
          <FolderSimple weight="thin" className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 mb-4">No documents found</p>
          <Button onClick={() => setShowUploadModal(true)}>
            Upload Your First Document
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedDocuments)
            .sort(([a], [b]) => Number(b) - Number(a))
            .map(([year, docs]) => (
              <div key={year}>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FolderSimple className="w-5 h-5 text-light-accent-primary" />
                  Tax Year {year}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {docs.map((doc) => (
                    <Card key={doc.id} className="p-4 hover:shadow-lg transition-shadow">
                      <div className="flex items-start gap-4">
                        {getFileIcon(doc.type)}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate" title={doc.name}>
                            {doc.name}
                          </h4>
                          <div className="text-sm text-gray-500 mb-2">
                            {formatFileSize(doc.size)} • {new Date(doc.uploadedAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                doc.status === 'verified'
                                  ? 'bg-green-100 text-green-800'
                                  : doc.status === 'rejected'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {doc.status}
                            </span>
                            <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded">
                              {doc.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="flex-1"
                          onClick={() => setViewDocument(doc)}
                          leftIcon={<Eye />}
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="flex-1"
                          onClick={() => downloadDocument(doc)}
                          leftIcon={<Download />}
                        >
                          Download
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600"
                          onClick={() => deleteDocument(doc.id)}
                          leftIcon={<Trash />}
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onSuccess={() => {
            setShowUploadModal(false)
            fetchDocuments()
          }}
        />
      )}

      {/* View Document Modal */}
      {viewDocument && (
        <ViewDocumentModal
          document={viewDocument}
          onClose={() => setViewDocument(null)}
        />
      )}
    </div>
  )
}

function UploadModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [uploading, setUploading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [category, setCategory] = useState('other')
  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setUploading(true)
    try {
      for (const file of files) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('category', category)
        formData.append('year', year)

        await fetch('/api/portal/documents', {
          method: 'POST',
          body: formData,
        })
      }
      onSuccess()
    } catch (error) {
      console.error('Error uploading files:', error)
    } finally {
      setUploading(false)
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Upload Documents</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-light-accent-primary bg-light-accent-primary/10'
                : 'border-gray-300 dark:border-gray-600'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <CloudArrowUp className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Drag and drop files here, or
            </p>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              Browse Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
            />
            <p className="text-xs text-gray-400 mt-2">
              Supported: PDF, DOC, DOCX, JPG, PNG (Max 10MB each)
            </p>
          </div>

          {/* Selected Files */}
          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-sm truncate max-w-[200px]">{file.name}</div>
                      <div className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Category & Year */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary"
              >
                {categories.slice(1).map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tax Year</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary"
              >
                {[...Array(5)].map((_, i) => {
                  const y = new Date().getFullYear() - i
                  return (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={files.length === 0 || uploading}>
            {uploading ? (
              <SpinnerGap className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            Upload {files.length > 0 && `(${files.length})`}
          </Button>
        </div>
      </Card>
    </div>
  )
}

function ViewDocumentModal({ document, onClose }: { document: Document; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{document.name}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Category</span>
                <span className="font-medium">{document.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Size</span>
                <span className="font-medium">{(document.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Uploaded</span>
                <span className="font-medium">{new Date(document.uploadedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    document.status === 'verified'
                      ? 'bg-green-100 text-green-800'
                      : document.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {document.status}
                </span>
              </div>
            </div>
          </div>

          {document.url && document.type.includes('pdf') ? (
            <iframe src={document.url} className="w-full h-96 border rounded-lg" />
          ) : document.url && document.type.includes('image') ? (
            <img src={document.url} alt={document.name} className="max-w-full h-auto rounded-lg" />
          ) : (
            <div className="flex items-center justify-center h-48 bg-gray-100 dark:bg-dark-bg-tertiary rounded-lg">
              <div className="text-center">
                <FileText className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">Preview not available</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {document.url && (
            <Button onClick={() => window.open(document.url!, '_blank')} leftIcon={<Download />}>
              Download
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
