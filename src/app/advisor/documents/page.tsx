'use client'

import { useState, useEffect } from 'react'
import {
  FileText,
  MagnifyingGlass,
  Download,
  Eye,
  Check,
  X,
  SpinnerGap,
  User as UserIcon,
  Clock,
  FolderSimple,
  FilePdf,
  FileDoc,
  FileImage
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
  status: string
  uploadedAt: string
  url: string | null
  user: {
    id: string
    name: string
    email: string
  }
}

export default function AdvisorDocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('pending')

  useEffect(() => {
    fetchDocuments()
  }, [statusFilter])

  const fetchDocuments = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.append('status', statusFilter)
      const response = await fetch(`/api/advisor/documents?${params}`)
      const data = await response.json()
      setDocuments(data.documents || [])
    } catch (error) {
      console.error('Error fetching documents:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateDocumentStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/advisor/documents/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      fetchDocuments()
    } catch (error) {
      console.error('Error updating document:', error)
    }
  }

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <FilePdf className="w-6 h-6 text-red-500" />
    if (type.includes('word') || type.includes('doc')) return <FileDoc className="w-6 h-6 text-blue-500" />
    if (type.includes('image')) return <FileImage className="w-6 h-6 text-green-500" />
    return <FileText className="w-6 h-6 text-gray-500" />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'verified':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
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
      doc.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Group by client
  const groupedByClient = filteredDocuments.reduce((acc, doc) => {
    const clientId = doc.user.id
    if (!acc[clientId]) {
      acc[clientId] = {
        client: doc.user,
        documents: [],
      }
    }
    acc[clientId].documents.push(doc)
    return acc
  }, {} as Record<string, { client: Document['user']; documents: Document[] }>)

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Documents</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Review and verify client documents
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card
          className={`p-4 text-center cursor-pointer transition-all ${
            statusFilter === 'pending' ? 'ring-2 ring-yellow-500' : ''
          }`}
          onClick={() => setStatusFilter('pending')}
        >
          <div className="text-2xl font-bold text-yellow-600">
            {documents.filter((d) => d.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Pending Review</div>
        </Card>
        <Card
          className={`p-4 text-center cursor-pointer transition-all ${
            statusFilter === 'verified' ? 'ring-2 ring-green-500' : ''
          }`}
          onClick={() => setStatusFilter('verified')}
        >
          <div className="text-2xl font-bold text-green-600">
            {documents.filter((d) => d.status === 'verified').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Verified</div>
        </Card>
        <Card
          className={`p-4 text-center cursor-pointer transition-all ${
            statusFilter === 'all' ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => setStatusFilter('all')}
        >
          <div className="text-2xl font-bold">{documents.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4 mb-6">
        <Input
          placeholder="Search by document name, client, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftIcon={<MagnifyingGlass />}
        />
      </Card>

      {/* Documents */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <SpinnerGap className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : Object.keys(groupedByClient).length === 0 ? (
        <Card className="p-12 text-center">
          <FolderSimple weight="thin" className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No documents found</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.values(groupedByClient).map(({ client, documents: clientDocs }) => (
            <Card key={client.id} className="overflow-hidden">
              <div className="p-4 bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{client.name}</h3>
                    <p className="text-sm text-gray-500">{client.email}</p>
                  </div>
                  <span className="ml-auto text-sm text-gray-500">
                    {clientDocs.length} document{clientDocs.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {clientDocs.map((doc) => (
                  <div key={doc.id} className="p-4 hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {getFileIcon(doc.type)}
                        <div>
                          <h4 className="font-medium">{doc.name}</h4>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span>{formatFileSize(doc.size)}</span>
                            <span>{doc.category}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(doc.uploadedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>

                        <div className="flex gap-2">
                          {doc.url && (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => window.open(doc.url!, '_blank')}
                                leftIcon={<Eye />}
                              >
                                View
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => window.open(doc.url!, '_blank')}
                                leftIcon={<Download />}
                              />
                            </>
                          )}

                          {doc.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-green-600 border-green-300"
                                onClick={() => updateDocumentStatus(doc.id, 'verified')}
                                leftIcon={<Check />}
                              >
                                Verify
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 border-red-300"
                                onClick={() => updateDocumentStatus(doc.id, 'rejected')}
                                leftIcon={<X />}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
