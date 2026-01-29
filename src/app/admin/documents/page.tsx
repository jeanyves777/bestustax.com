'use client'

import { useState, useEffect, useRef } from 'react'
import { FileText, MagnifyingGlass, Upload, Download, Trash, Eye, ArrowCounterClockwise, SpinnerGap, X, FolderOpen } from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface Document {
  id: string
  type: string
  filename: string
  originalName: string
  fileSize: number
  year: number
  status: string
  createdAt: string
  user: {
    name: string | null
    email: string
  }
  uploadedBy: {
    name: string | null
  }
}

const documentTypes = [
  { value: 'all', label: 'All Documents' },
  { value: 'w2', label: 'W-2 Forms' },
  { value: '1099', label: '1099 Forms' },
  { value: 'business', label: 'Business Documents' },
  { value: 'personal-id', label: 'Personal ID' },
  { value: 'tax-return', label: 'Tax Returns' },
  { value: 'other', label: 'Other Documents' },
]

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [showDeleted, setShowDeleted] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const [stats, setStats] = useState({
    total: 0,
    thisMonth: 0,
    byType: {} as Record<string, number>,
  })

  useEffect(() => {
    fetchDocuments()
  }, [typeFilter, showDeleted])

  const fetchDocuments = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (typeFilter !== 'all') params.append('type', typeFilter)
      if (showDeleted) params.append('showDeleted', 'true')

      const response = await fetch(`/api/admin/documents?${params}`)
      const data = await response.json()

      if (data.documents) {
        setDocuments(data.documents)
        setStats(data.stats || stats)
      }
    } catch (error) {
      console.error('Error fetching documents:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return

    setActionLoading(id)
    try {
      const response = await fetch(`/api/admin/documents/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchDocuments()
      }
    } catch (error) {
      console.error('Error deleting document:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const handleRestore = async (id: string) => {
    setActionLoading(id)
    try {
      const response = await fetch(`/api/admin/documents/${id}/restore`, {
        method: 'POST',
      })

      if (response.ok) {
        fetchDocuments()
      }
    } catch (error) {
      console.error('Error restoring document:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const handleDownload = async (id: string, filename: string) => {
    try {
      const response = await fetch(`/api/admin/documents/${id}/download`)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading document:', error)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Documents</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage all client documents
          </p>
        </div>
        <Button onClick={() => setShowUploadModal(true)} leftIcon={<Upload weight="bold" />} glow>
          Upload Document
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Documents</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.thisMonth}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">This Month</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.byType?.['w2'] || 0}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">W-2 Forms</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.byType?.['1099'] || 0}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">1099 Forms</div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by filename or client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<MagnifyingGlass />}
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary"
          >
            {documentTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showDeleted}
              onChange={(e) => setShowDeleted(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-light-accent-primary"
            />
            <span className="text-sm">Show Deleted</span>
          </label>
        </div>
      </Card>

      {/* Documents Table */}
      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <SpinnerGap className="w-8 h-8 animate-spin text-light-accent-primary" />
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="text-center py-12">
            <FolderOpen weight="thin" className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No documents found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-bg-tertiary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uploaded
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredDocuments.map((doc) => (
                  <tr
                    key={doc.id}
                    className={`hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary ${
                      doc.status === 'deleted' ? 'opacity-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <FileText weight="fill" className="w-8 h-8 text-light-accent-primary" />
                        <div>
                          <div className="font-medium truncate max-w-[200px]">{doc.originalName}</div>
                          <div className="text-xs text-gray-500">{doc.year}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{doc.user.name || 'N/A'}</div>
                      <div className="text-sm text-gray-500">{doc.user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800">
                        {doc.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatFileSize(doc.fileSize)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDownload(doc.id, doc.originalName)}
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        {doc.status === 'deleted' ? (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRestore(doc.id)}
                            disabled={actionLoading === doc.id}
                            title="Restore"
                            className="text-green-600"
                          >
                            <ArrowCounterClockwise className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(doc.id)}
                            disabled={actionLoading === doc.id}
                            title="Delete"
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadDocumentModal
          onClose={() => setShowUploadModal(false)}
          onSuccess={() => {
            setShowUploadModal(false)
            fetchDocuments()
          }}
        />
      )}
    </div>
  )
}

function UploadDocumentModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false)
  const [clients, setClients] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [file, setFile] = useState<File | null>(null)
  const [documentType, setDocumentType] = useState('other')
  const [description, setDescription] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const searchClients = async () => {
    if (!searchQuery) return
    try {
      const response = await fetch(`/api/admin/users?search=${searchQuery}&role=client`)
      const data = await response.json()
      setClients(data.users || [])
    } catch (error) {
      console.error('Error searching clients:', error)
    }
  }

  const handleUpload = async () => {
    if (!selectedClient || !file) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('userId', selectedClient.id)
      formData.append('type', documentType)
      formData.append('description', description)

      const response = await fetch('/api/admin/documents/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        onSuccess()
      }
    } catch (error) {
      console.error('Error uploading document:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Upload Document</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Client Search */}
          <div>
            <label className="block text-sm font-medium mb-2">Select Client</label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Search by name or email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button onClick={searchClients}>Search</Button>
            </div>
            {clients.length > 0 && (
              <div className="max-h-32 overflow-y-auto space-y-1">
                {clients.map((client) => (
                  <div
                    key={client.id}
                    onClick={() => setSelectedClient(client)}
                    className={`p-2 rounded cursor-pointer ${
                      selectedClient?.id === client.id
                        ? 'bg-light-accent-primary/10 border border-light-accent-primary'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="font-medium text-sm">{client.name || client.email}</div>
                    <div className="text-xs text-gray-500">{client.email}</div>
                  </div>
                ))}
              </div>
            )}
            {selectedClient && (
              <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded text-sm">
                Selected: {selectedClient.name || selectedClient.email}
              </div>
            )}
          </div>

          {/* Document Type */}
          <div>
            <label className="block text-sm font-medium mb-2">Document Type</label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary"
            >
              <option value="w2">W-2 Form</option>
              <option value="1099">1099 Form</option>
              <option value="business">Business Document</option>
              <option value="personal-id">Personal ID</option>
              <option value="tax-return">Tax Return</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">File</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center cursor-pointer hover:border-light-accent-primary transition-colors"
            >
              {file ? (
                <div>
                  <FileText weight="fill" className="w-8 h-8 mx-auto mb-2 text-light-accent-primary" />
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              ) : (
                <div>
                  <Upload weight="thin" className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">Click to select a file</p>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <Input
            label="Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of the document"
          />
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={loading || !selectedClient || !file}
            leftIcon={loading ? <SpinnerGap className="animate-spin" /> : <Upload />}
          >
            {loading ? 'Uploading...' : 'Upload Document'}
          </Button>
        </div>
      </Card>
    </div>
  )
}
