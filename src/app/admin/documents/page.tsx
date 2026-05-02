'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowCounterClockwise,
  Bell,
  Download,
  Eye,
  File,
  FileImage,
  FilePdf,
  FileText,
  FolderOpen,
  Lightning,
  MagnifyingGlass,
  Pen,
  SpinnerGap,
  Trash,
  Upload,
  Users,
  XCircle,
} from '@phosphor-icons/react'
import dynamic from 'next/dynamic'
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { SignatureStatusBadge } from '@/components/signature/SignatureStatusBadge'
import { cn } from '@/lib/cn'

const RequestSignatureModal = dynamic(
  () =>
    import('@/components/signature/RequestSignatureModal').then(
      (module) => module.RequestSignatureModal
    ),
  { ssr: false }
)

interface AdminDocument {
  id: string
  type: string
  category: string
  filename: string
  fileName: string
  originalName: string
  title: string
  fileType: string
  fileSize: number
  year: number
  status: string
  createdAt: string
  user: {
    id: string
    name: string | null
    email: string
  }
  uploadedBy: {
    id: string
    name: string | null
    email: string
  }
}

interface ClientUser {
  id: string
  name: string | null
  email: string
  role: string
  status: string
}

interface SignatureRequest {
  id: string
  documentId: string
  recipientId: string
  status: string
  signedFileName?: string | null
  createdAt: string
  recipient?: { name: string | null; email: string }
}

const VIEWED_USERS_KEY = 'bestustax_admin_viewed_doc_users'

const categoryOrder: Record<string, number> = {
  signature: 0,
  'rapid-upload': 1,
  w2: 2,
  '1099': 3,
  receipt: 4,
  receipts: 4,
  tax_return: 5,
  'tax-return': 5,
  other: 10,
}

const categoryLabels: Record<string, string> = {
  signature: 'Signature Requests',
  'rapid-upload': 'New Rapid Upload',
  w2: 'W-2 Forms',
  '1099': '1099 Forms',
  receipt: 'Receipts',
  receipts: 'Receipts',
  tax_return: 'Tax Returns',
  'tax-return': 'Tax Returns',
  business: 'Business Documents',
  'personal-id': 'Personal ID',
  other: 'Other Documents',
}

const categoryStyles: Record<string, string> = {
  signature: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
  'rapid-upload': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200',
  w2: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200',
  '1099': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
  receipt: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200',
  receipts: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200',
  tax_return: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200',
  'tax-return': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200',
  business: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-200',
  'personal-id': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200',
  other: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
}

export default function DocumentsManagementPage() {
  const [documents, setDocuments] = useState<AdminDocument[]>([])
  const [users, setUsers] = useState<ClientUser[]>([])
  const [signatureRequests, setSignatureRequests] = useState<SignatureRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [viewedUsers, setViewedUsers] = useState<Record<string, number>>({})
  const [isUploading, setIsUploading] = useState(false)
  const [isUploadingForSignature, setIsUploadingForSignature] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [signatureDoc, setSignatureDoc] = useState<AdminDocument | null>(null)
  const [signatureModalOpen, setSignatureModalOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const signatureFileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(VIEWED_USERS_KEY)
      if (stored) setViewedUsers(JSON.parse(stored))
    } catch {
      setViewedUsers({})
    }
  }, [])

  useEffect(() => {
    fetchAllData()
  }, [])

  useEffect(() => {
    if (!selectedUserId) return

    const timeout = window.setTimeout(() => {
      setViewedUsers((previous) => {
        const updated = { ...previous, [selectedUserId]: Date.now() }
        try {
          localStorage.setItem(VIEWED_USERS_KEY, JSON.stringify(updated))
        } catch {}
        return updated
      })
    }, 1500)

    return () => window.clearTimeout(timeout)
  }, [selectedUserId])

  const fetchAllData = async () => {
    try {
      setIsLoading(true)
      setError('')
      await Promise.all([fetchDocuments(), fetchUsers(), fetchSignatureRequests()])
    } finally {
      setIsLoading(false)
    }
  }

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/admin/documents')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch documents')
      }

      setDocuments(data.documents || [])
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Failed to fetch documents')
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users?role=client')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch clients')
      }

      setUsers(data.users || [])
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Failed to fetch clients')
    }
  }

  const fetchSignatureRequests = async () => {
    try {
      const response = await fetch('/api/admin/signature-requests')
      const data = await response.json()

      if (response.ok) {
        setSignatureRequests(data.signatureRequests || [])
      }
    } catch (fetchError) {
      console.error('Error fetching signature requests:', fetchError)
    }
  }

  const selectedUser = users.find((user) => user.id === selectedUserId) || null

  const documentsByUser = useMemo(() => {
    const grouped: Record<string, AdminDocument[]> = {}
    documents.forEach((document) => {
      if (!grouped[document.user.id]) grouped[document.user.id] = []
      grouped[document.user.id].push(document)
    })
    return grouped
  }, [documents])

  const signatureDocIds = useMemo(() => {
    const ids = new Set<string>()
    signatureRequests.forEach((request) => {
      if (['pending', 'viewed', 'signed'].includes(request.status)) {
        ids.add(request.documentId)
      }
    })
    return ids
  }, [signatureRequests])

  const usersForSidebar = useMemo(() => {
    return users
      .map((user) => {
        const userDocs = documentsByUser[user.id] || []
        const rapidDocs = userDocs.filter((document) => document.category === 'rapid-upload')
        const latestDocTime = userDocs.length
          ? Math.max(...userDocs.map((document) => new Date(document.createdAt).getTime()))
          : 0
        const latestRapidTime = rapidDocs.length
          ? Math.max(...rapidDocs.map((document) => new Date(document.createdAt).getTime()))
          : 0
        const hasUnviewedRapidUpload =
          latestRapidTime > 0 && latestRapidTime > (viewedUsers[user.id] || 0)

        return {
          ...user,
          docCount: userDocs.length,
          rapidUploadCount: rapidDocs.length,
          totalSize: userDocs.reduce((sum, document) => sum + document.fileSize, 0),
          latestDocTime,
          latestRapidTime,
          hasUnviewedRapidUpload,
        }
      })
      .filter((user) => {
        if (!searchQuery) return true
        const query = searchQuery.toLowerCase()
        return (
          displayName(user).toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
        )
      })
      .sort((a, b) => {
        if (a.hasUnviewedRapidUpload && !b.hasUnviewedRapidUpload) return -1
        if (!a.hasUnviewedRapidUpload && b.hasUnviewedRapidUpload) return 1
        if (a.docCount === 0 && b.docCount > 0) return 1
        if (a.docCount > 0 && b.docCount === 0) return -1
        if (a.latestRapidTime !== b.latestRapidTime) return b.latestRapidTime - a.latestRapidTime
        if (a.latestDocTime !== b.latestDocTime) return b.latestDocTime - a.latestDocTime
        return displayName(a).localeCompare(displayName(b))
      })
  }, [documentsByUser, searchQuery, users, viewedUsers])

  const selectedUserDocsByCategory = useMemo(() => {
    if (!selectedUserId) return {}

    const grouped: Record<string, AdminDocument[]> = {}
    const selectedDocs = documentsByUser[selectedUserId] || []

    selectedDocs.forEach((document) => {
      let category = document.category || document.type || 'other'

      if (signatureDocIds.has(document.id)) {
        category = 'signature'
      } else if (category === 'rapid-upload' && !isRecentDocument(document.createdAt)) {
        category = 'other'
      }

      if (!grouped[category]) grouped[category] = []
      grouped[category].push(document)
    })

    return grouped
  }, [documentsByUser, selectedUserId, signatureDocIds])

  const unviewedRapidUploadCount = usersForSidebar.filter((user) => user.hasUnviewedRapidUpload).length
  const selectedUserDocs = selectedUserId ? documentsByUser[selectedUserId] || [] : []

  const handleUpload = async (file: File) => {
    if (!selectedUserId) {
      setError('Select a client before uploading a document.')
      return
    }

    try {
      setIsUploading(true)
      setError('')
      const formData = new FormData()
      formData.append('file', file)
      formData.append('userId', selectedUserId)
      formData.append('category', 'other')
      formData.append('title', file.name)

      const response = await fetch('/api/admin/documents/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload document')
      }

      if (fileInputRef.current) fileInputRef.current.value = ''
      await fetchDocuments()
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Failed to upload document')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSignatureUpload = async (file: File) => {
    if (!selectedUserId) {
      setError('Select a client before requesting a signature.')
      return
    }

    if (!file.type.includes('pdf')) {
      setError('Only PDF files can be sent for signature.')
      if (signatureFileInputRef.current) signatureFileInputRef.current.value = ''
      return
    }

    try {
      setIsUploadingForSignature(true)
      setError('')
      const formData = new FormData()
      formData.append('file', file)
      formData.append('userId', selectedUserId)
      formData.append('category', 'other')
      formData.append('title', file.name)

      const response = await fetch('/api/admin/documents/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload PDF')
      }

      const uploadedDocument = (data.document || data) as AdminDocument
      await fetchDocuments()
      setSignatureDoc(uploadedDocument)
      setSignatureModalOpen(true)
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Failed to upload PDF')
    } finally {
      setIsUploadingForSignature(false)
      if (signatureFileInputRef.current) signatureFileInputRef.current.value = ''
    }
  }

  const handleDelete = async (documentId: string) => {
    if (!confirm('Delete this document from the active list?')) return

    try {
      setActionLoading(documentId)
      const response = await fetch(`/api/admin/documents/${documentId}`, { method: 'DELETE' })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete document')
      }

      await fetchDocuments()
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Failed to delete document')
    } finally {
      setActionLoading(null)
    }
  }

  const handleSendReminder = async (requestId: string) => {
    try {
      setActionLoading(requestId)
      const response = await fetch(`/api/admin/signature-requests/${requestId}/remind`, {
        method: 'POST',
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reminder')
      }
    } catch (reminderError) {
      setError(reminderError instanceof Error ? reminderError.message : 'Failed to send reminder')
    } finally {
      setActionLoading(null)
    }
  }

  const handleCancelRequest = async (requestId: string) => {
    if (!confirm('Cancel this signature request?')) return

    try {
      setActionLoading(requestId)
      const response = await fetch(`/api/admin/signature-requests/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to cancel request')
      }

      await fetchSignatureRequests()
    } catch (cancelError) {
      setError(cancelError instanceof Error ? cancelError.message : 'Failed to cancel request')
    } finally {
      setActionLoading(null)
    }
  }

  const getSignatureRequestsForDoc = (documentId: string) =>
    signatureRequests.filter((request) => request.documentId === documentId)

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <SpinnerGap className="mx-auto mb-4 h-12 w-12 animate-spin text-light-accent-primary" />
          <p className="text-gray-600 dark:text-gray-400">Loading documents...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Documents Management</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage client documents, rapid uploads, and signature requests.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={fetchAllData}
            leftIcon={<ArrowCounterClockwise className="h-4 w-4" />}
          >
            Refresh
          </Button>
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={!selectedUserId || isUploading}
            leftIcon={
              isUploading ? (
                <SpinnerGap className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" weight="bold" />
              )
            }
            glow
          >
            {isUploading ? 'Uploading...' : 'Upload Document'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="flex items-start justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">
          <span>{error}</span>
          <button type="button" onClick={() => setError('')} className="shrink-0">
            <XCircle className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<FolderOpen className="h-6 w-6" weight="bold" />}
          label="Total Documents"
          value={documents.length.toString()}
          tone="from-light-accent-primary to-brand-red"
        />
        <StatCard
          icon={<Users className="h-6 w-6" weight="bold" />}
          label="Clients With Docs"
          value={usersForSidebar.filter((user) => user.docCount > 0).length.toString()}
          tone="from-green-600 to-emerald-500"
        />
        <StatCard
          icon={<FileText className="h-6 w-6" weight="bold" />}
          label="Total Storage"
          value={formatFileSize(documents.reduce((sum, document) => sum + document.fileSize, 0))}
          tone="from-brand-slate to-brand-slate-light"
        />
        <StatCard
          icon={<Lightning className="h-6 w-6" weight="bold" />}
          label="Rapid Uploads"
          value={documents.filter((document) => document.category === 'rapid-upload').length.toString()}
          tone="from-orange-600 to-brand-gold"
          pulseCount={unviewedRapidUploadCount}
        />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) handleUpload(file)
        }}
      />
      <input
        ref={signatureFileInputRef}
        type="file"
        className="hidden"
        accept=".pdf"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) handleSignatureUpload(file)
        }}
      />

      <div className="grid gap-6 xl:grid-cols-12">
        <Card className="xl:col-span-4 2xl:col-span-3">
          <CardHeader className="p-5">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-lg">All Clients</CardTitle>
              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                {usersForSidebar.length}
              </span>
            </div>
            <Input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search clients..."
              leftIcon={<MagnifyingGlass className="h-4 w-4" />}
            />
          </CardHeader>
          <CardContent className="max-h-[640px] overflow-y-auto p-0">
            {usersForSidebar.length === 0 ? (
              <div className="p-8 text-center text-sm text-gray-500">No clients found.</div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {usersForSidebar.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => setSelectedUserId(user.id)}
                    className={cn(
                      'w-full border-l-4 px-4 py-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary',
                      selectedUserId === user.id
                        ? 'border-light-accent-primary bg-light-accent-primary/5'
                        : user.hasUnviewedRapidUpload
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/20'
                        : 'border-transparent'
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="truncate font-medium">{displayName(user)}</span>
                          {user.hasUnviewedRapidUpload && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-orange-600 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                              <Bell className="h-3 w-3" weight="bold" />
                              New
                            </span>
                          )}
                        </div>
                        <div className="truncate text-xs text-gray-500">{user.email}</div>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <div className="flex gap-1">
                          {user.rapidUploadCount > 0 && (
                            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold text-orange-700 dark:bg-orange-900/30 dark:text-orange-200">
                              {user.rapidUploadCount} rapid
                            </span>
                          )}
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                            {user.docCount}
                          </span>
                        </div>
                        <div className="text-[11px] text-gray-500">{formatFileSize(user.totalSize)}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="xl:col-span-8 2xl:col-span-9">
          {!selectedUserId || !selectedUser ? (
            <Card className="flex min-h-[520px] items-center justify-center">
              <div className="max-w-sm p-8 text-center">
                <Users className="mx-auto mb-4 h-16 w-16 text-gray-300" weight="thin" />
                <h2 className="mb-2 text-xl font-semibold">Select a Client</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose a client from the list to view documents, upload files, or request a
                  signature.
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-5">
              <Card>
                <div className="flex flex-col gap-4 bg-gradient-to-r from-light-accent-primary/10 to-brand-gold/20 p-5 dark:from-dark-accent-primary/20 dark:to-brand-gold/10 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="flex items-center gap-2 text-xl font-bold">
                      <Users className="h-5 w-5" weight="bold" />
                      {displayName(selectedUser)}
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {selectedUser.email} | {selectedUserDocs.length} documents |{' '}
                      {formatFileSize(selectedUserDocs.reduce((sum, doc) => sum + doc.fileSize, 0))}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => signatureFileInputRef.current?.click()}
                      disabled={isUploadingForSignature}
                      leftIcon={
                        isUploadingForSignature ? (
                          <SpinnerGap className="h-4 w-4 animate-spin" />
                        ) : (
                          <Pen className="h-4 w-4" weight="bold" />
                        )
                      }
                    >
                      {isUploadingForSignature ? 'Uploading...' : 'Request Signature'}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      leftIcon={
                        isUploading ? (
                          <SpinnerGap className="h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4" weight="bold" />
                        )
                      }
                    >
                      {isUploading ? 'Uploading...' : 'Upload'}
                    </Button>
                  </div>
                </div>
              </Card>

              <div className="max-h-[690px] space-y-4 overflow-y-auto pr-1">
                {Object.keys(selectedUserDocsByCategory).length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <FileText className="mx-auto mb-4 h-14 w-14 text-gray-300" weight="thin" />
                      <p className="mb-4 text-gray-600 dark:text-gray-400">
                        No documents found for this client.
                      </p>
                      <Button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        leftIcon={<Upload className="h-4 w-4" weight="bold" />}
                      >
                        Upload First Document
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  Object.entries(selectedUserDocsByCategory)
                    .sort(([categoryA], [categoryB]) => {
                      const a = categoryOrder[categoryA] ?? 9
                      const b = categoryOrder[categoryB] ?? 9
                      return a - b || categoryA.localeCompare(categoryB)
                    })
                    .map(([category, docs]) => (
                      <Card
                        key={category}
                        className={cn(
                          category === 'signature' && 'ring-2 ring-blue-300 dark:ring-blue-900',
                          category === 'rapid-upload' &&
                            'ring-2 ring-orange-300 dark:ring-orange-900'
                        )}
                      >
                        <div
                          className={cn(
                            'flex items-center justify-between border-b border-gray-100 p-4 dark:border-gray-800',
                            category === 'signature' &&
                              'bg-blue-50 dark:bg-blue-950/20',
                            category === 'rapid-upload' &&
                              'bg-orange-50 dark:bg-orange-950/20'
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <CategoryBadge category={category} />
                            <span className="text-sm text-gray-500">
                              {docs.length} file{docs.length === 1 ? '' : 's'}
                            </span>
                          </div>
                        </div>
                        <div className="divide-y divide-gray-100 dark:divide-gray-800">
                          {docs
                            .sort(
                              (a, b) =>
                                new Date(b.createdAt).getTime() -
                                new Date(a.createdAt).getTime()
                            )
                            .map((document) => (
                              <DocumentRow
                                key={document.id}
                                document={document}
                                category={category}
                                actionLoading={actionLoading}
                                signatureRequests={getSignatureRequestsForDoc(document.id)}
                                onDelete={() => handleDelete(document.id)}
                                onSendReminder={handleSendReminder}
                                onCancelRequest={handleCancelRequest}
                                onRequestSignature={() => {
                                  setSignatureDoc(document)
                                  setSignatureModalOpen(true)
                                }}
                              />
                            ))}
                        </div>
                      </Card>
                    ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {signatureDoc && selectedUser && (
        <RequestSignatureModal
          isOpen={signatureModalOpen}
          onClose={() => {
            setSignatureModalOpen(false)
            setSignatureDoc(null)
          }}
          document={signatureDoc}
          recipientId={selectedUser.id}
          recipientName={displayName(selectedUser)}
          onSuccess={async () => {
            await fetchSignatureRequests()
            await fetchDocuments()
          }}
        />
      )}
    </div>
  )
}

function DocumentRow({
  document,
  category,
  signatureRequests,
  actionLoading,
  onDelete,
  onSendReminder,
  onCancelRequest,
  onRequestSignature,
}: {
  document: AdminDocument
  category: string
  signatureRequests: SignatureRequest[]
  actionLoading: string | null
  onDelete: () => void
  onSendReminder: (requestId: string) => void
  onCancelRequest: (requestId: string) => void
  onRequestSignature: () => void
}) {
  const activeRequest = signatureRequests.find(
    (request) => request.status === 'pending' || request.status === 'viewed'
  )
  const signedRequest = signatureRequests.find((request) => request.status === 'signed')
  const FileIcon = getFileIcon(document.fileType)
  const canRequestSignature = document.fileType.includes('pdf') && !activeRequest && !signedRequest

  return (
    <div className="flex flex-col gap-4 p-4 transition-colors hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <FileIcon className="h-9 w-9 shrink-0 text-light-accent-primary" weight="fill" />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="max-w-[520px] truncate font-medium">{document.title || document.originalName}</h3>
            {isRecentDocument(document.createdAt) && (
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-green-700 dark:bg-green-900/30 dark:text-green-200">
                Recent
              </span>
            )}
            {document.category === 'rapid-upload' && category !== 'rapid-upload' && (
              <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-orange-700 dark:bg-orange-900/30 dark:text-orange-200">
                Rapid Upload
              </span>
            )}
            {activeRequest && <SignatureStatusBadge status={activeRequest.status} />}
            {signedRequest && <SignatureStatusBadge status="signed" />}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span>{formatFileSize(document.fileSize)}</span>
            <span>|</span>
            <span>{document.fileType || 'file'}</span>
            <span>|</span>
            <span>{formatDate(document.createdAt)}</span>
            <span>|</span>
            <span>Tax year {document.year}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 lg:justify-end">
        {activeRequest && (
          <>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => onSendReminder(activeRequest.id)}
              disabled={actionLoading === activeRequest.id}
              leftIcon={
                actionLoading === activeRequest.id ? (
                  <SpinnerGap className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowCounterClockwise className="h-4 w-4" />
                )
              }
            >
              Remind
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => onCancelRequest(activeRequest.id)}
              disabled={actionLoading === activeRequest.id}
              className="border-amber-600 text-amber-700 hover:bg-amber-50 dark:border-amber-400 dark:text-amber-300"
            >
              Cancel
            </Button>
          </>
        )}
        {signedRequest?.signedFileName && (
          <a
            href={`/api/admin/signature-requests/${signedRequest.id}/download`}
            className="inline-flex items-center gap-1.5 rounded-lg border-2 border-green-600 px-3 py-1.5 text-sm font-medium text-green-700 transition-colors hover:bg-green-50 dark:border-green-400 dark:text-green-300 dark:hover:bg-green-950/30"
          >
            <Download className="h-4 w-4" />
            Signed
          </a>
        )}
        {canRequestSignature && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={onRequestSignature}
            leftIcon={<Pen className="h-4 w-4" weight="bold" />}
          >
            Request
          </Button>
        )}
        <a
          href={
            signedRequest?.signedFileName
              ? `/api/admin/signature-requests/${signedRequest.id}/download?inline=true`
              : `/api/admin/documents/${document.id}/download?inline=true`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border-2 border-light-accent-primary px-3 py-1.5 text-sm font-medium text-light-accent-primary transition-colors hover:bg-light-accent-primary/10 dark:border-dark-accent-primary dark:text-dark-accent-primary"
        >
          <Eye className="h-4 w-4" />
          View
        </a>
        <a
          href={`/api/admin/documents/${document.id}/download`}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Download className="h-4 w-4" />
          Download
        </a>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={onDelete}
          disabled={actionLoading === document.id}
          className="text-amber-700 hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-amber-950/30"
          title="Delete document"
        >
          {actionLoading === document.id ? (
            <SpinnerGap className="h-4 w-4 animate-spin" />
          ) : (
            <Trash className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  tone,
  pulseCount,
}: {
  icon: React.ReactNode
  label: string
  value: string
  tone: string
  pulseCount?: number
}) {
  return (
    <Card className={pulseCount ? 'ring-2 ring-orange-300 dark:ring-orange-900' : ''}>
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              'relative flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br text-white',
              tone
            )}
          >
            {icon}
            {!!pulseCount && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-600 px-1 text-xs font-bold text-white">
                {pulseCount}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <div className="truncate text-2xl font-bold">{value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <span
      className={cn(
        'rounded-full px-3 py-1 text-sm font-semibold',
        categoryStyles[category] || categoryStyles.other
      )}
    >
      {categoryLabels[category] || category}
    </span>
  )
}

function getFileIcon(fileType: string) {
  if (fileType?.includes('pdf')) return FilePdf
  if (fileType?.startsWith('image/')) return FileImage
  if (fileType?.includes('word') || fileType?.includes('document')) return FileText
  return File
}

function isRecentDocument(dateString: string) {
  const createdAt = new Date(dateString).getTime()
  return Date.now() - createdAt < 24 * 60 * 60 * 1000
}

function formatFileSize(bytes: number) {
  if (!bytes) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const unitIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  return `${(bytes / Math.pow(1024, unitIndex)).toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function displayName(user: { name: string | null; email: string }) {
  return user.name || user.email
}
