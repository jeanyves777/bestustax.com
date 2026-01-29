'use client'

import { useState, useEffect } from 'react'
import { Lightning, MagnifyingGlass, Plus, Copy, SpinnerGap, X, Check, Clock, FileText } from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface RapidDocAccess {
  id: string
  clientName: string
  clientEmail: string
  code: string
  expiresAt: string
  used: boolean
  completed: boolean
  createdAt: string
  _count: {
    documents: number
  }
}

export default function RapidDocPage() {
  const [accesses, setAccesses] = useState<RapidDocAccess[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    completed: 0,
    expired: 0,
  })

  useEffect(() => {
    fetchAccesses()
  }, [])

  const fetchAccesses = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/rapid-doc')
      const data = await response.json()

      if (data.accesses) {
        setAccesses(data.accesses)
        setStats(data.stats || stats)
      }
    } catch (error) {
      console.error('Error fetching rapid doc accesses:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    alert('Code copied to clipboard!')
  }

  const getStatus = (access: RapidDocAccess) => {
    if (access.completed) return { label: 'Completed', color: 'bg-green-100 text-green-800' }
    if (new Date(access.expiresAt) < new Date()) return { label: 'Expired', color: 'bg-red-100 text-red-800' }
    if (access.used) return { label: 'In Progress', color: 'bg-blue-100 text-blue-800' }
    return { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' }
  }

  const filteredAccesses = accesses.filter(
    (access) =>
      access.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      access.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      access.code.includes(searchTerm.toUpperCase())
  )

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Rapid Doc Upload</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Quick document upload access for clients
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} leftIcon={<Plus weight="bold" />} glow>
          Create Access
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Created</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{stats.active}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{stats.expired}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Expired</div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4 mb-6">
        <Input
          placeholder="Search by name, email, or code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftIcon={<MagnifyingGlass />}
        />
      </Card>

      {/* Access List */}
      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <SpinnerGap className="w-8 h-8 animate-spin text-light-accent-primary" />
          </div>
        ) : filteredAccesses.length === 0 ? (
          <div className="text-center py-12">
            <Lightning weight="thin" className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No rapid doc accesses found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-bg-tertiary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documents
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expires
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredAccesses.map((access) => {
                  const status = getStatus(access)
                  const isExpired = new Date(access.expiresAt) < new Date()

                  return (
                    <tr key={access.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">{access.clientName}</div>
                        <div className="text-sm text-gray-500">{access.clientEmail}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-lg font-bold tracking-wider">
                            {access.code}
                          </span>
                          <button
                            onClick={() => copyCode(access.code)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                            title="Copy code"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span>{access._count.documents}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex items-center gap-1 text-sm ${isExpired ? 'text-red-500' : 'text-gray-500'}`}>
                          <Clock className="w-4 h-4" />
                          {new Date(access.expiresAt).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {!access.completed && !isExpired && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const link = `${window.location.origin}/rapid-doc-upload`
                              navigator.clipboard.writeText(link)
                              alert('Upload link copied!')
                            }}
                          >
                            Copy Link
                          </Button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Create Modal */}
      {showCreateModal && (
        <CreateAccessModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false)
            fetchAccesses()
          }}
        />
      )}
    </div>
  )
}

function CreateAccessModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [generatedCode, setGeneratedCode] = useState('')
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/rapid-doc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setGeneratedCode(data.code)
        setSuccess(true)
      }
    } catch (error) {
      console.error('Error creating access:', error)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <div className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Check weight="bold" className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">Access Created!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Share this code with {formData.clientName}
            </p>
            <div className="bg-gray-100 dark:bg-dark-bg-tertiary rounded-lg p-4 mb-4">
              <div className="text-3xl font-mono font-bold tracking-wider text-light-accent-primary">
                {generatedCode}
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Valid for 24 hours. An email has been sent to {formData.clientEmail}.
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(generatedCode)
                  alert('Code copied!')
                }}
                leftIcon={<Copy />}
              >
                Copy Code
              </Button>
              <Button onClick={onSuccess}>Done</Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Create Rapid Doc Access</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Create a temporary access code for a client to upload documents without logging in.
            The code will be valid for 24 hours.
          </p>

          <Input
            label="Client Name"
            value={formData.clientName}
            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
            placeholder="John Doe"
            required
          />
          <Input
            label="Client Email"
            type="email"
            value={formData.clientEmail}
            onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
            placeholder="john@example.com"
            helperText="An email with the access code will be sent to this address"
            required
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <SpinnerGap className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Lightning weight="fill" className="w-4 h-4 mr-2" />
                  Generate Code
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
