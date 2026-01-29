'use client'

import { useState, useEffect } from 'react'
import {
  UserCircle,
  MagnifyingGlass,
  Plus,
  PencilSimple,
  Trash,
  Users,
  Calendar,
  FileText,
  Star,
  SpinnerGap,
  X,
  Check,
  Phone,
  Envelope
} from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface Advisor {
  id: string
  name: string
  email: string
  phone: string | null
  status: string
  createdAt: string
  _count: {
    clients: number
    appointments: number
  }
  stats?: {
    completedReturns: number
    rating: number
  }
}

export default function AdvisorsPage() {
  const [advisors, setAdvisors] = useState<Advisor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingAdvisor, setEditingAdvisor] = useState<Advisor | null>(null)
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null)

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    totalClients: 0,
    avgRating: 0,
  })

  useEffect(() => {
    fetchAdvisors()
  }, [])

  const fetchAdvisors = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/advisors')
      const data = await response.json()

      if (data.advisors) {
        setAdvisors(data.advisors)
        setStats(data.stats || stats)
      }
    } catch (error) {
      console.error('Error fetching advisors:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteAdvisor = async (advisorId: string) => {
    if (!confirm('Are you sure you want to remove this advisor?')) return

    try {
      await fetch(`/api/admin/advisors/${advisorId}`, {
        method: 'DELETE',
      })
      fetchAdvisors()
    } catch (error) {
      console.error('Error deleting advisor:', error)
    }
  }

  const filteredAdvisors = advisors.filter(
    (advisor) =>
      advisor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      advisor.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Advisors</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your tax advisors and their clients
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} leftIcon={<Plus weight="bold" />} glow>
          Add Advisor
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Advisors</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.totalClients}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Clients</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center gap-1">
            {stats.avgRating.toFixed(1)}
            <Star weight="fill" className="w-5 h-5" />
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4 mb-6">
        <Input
          placeholder="Search advisors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftIcon={<MagnifyingGlass />}
        />
      </Card>

      {/* Advisors Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <SpinnerGap className="w-8 h-8 animate-spin text-light-accent-primary" />
        </div>
      ) : filteredAdvisors.length === 0 ? (
        <Card className="p-12 text-center">
          <UserCircle weight="thin" className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 mb-4">No advisors found</p>
          <Button onClick={() => setShowCreateModal(true)}>
            Add Your First Advisor
          </Button>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAdvisors.map((advisor) => (
            <Card key={advisor.id} className="overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-light-accent-primary/20 flex items-center justify-center">
                      <UserCircle className="w-8 h-8 text-light-accent-primary" weight="fill" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{advisor.name}</h3>
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          advisor.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {advisor.status}
                      </span>
                    </div>
                  </div>
                  {advisor.stats?.rating && (
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star weight="fill" className="w-4 h-4" />
                      <span className="text-sm font-medium">{advisor.stats.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Envelope className="w-4 h-4" />
                    {advisor.email}
                  </div>
                  {advisor.phone && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Phone className="w-4 h-4" />
                      {advisor.phone}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 py-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-lg font-semibold">
                      <Users className="w-4 h-4 text-gray-400" />
                      {advisor._count.clients}
                    </div>
                    <div className="text-xs text-gray-500">Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-lg font-semibold">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {advisor._count.appointments}
                    </div>
                    <div className="text-xs text-gray-500">Appointments</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-lg font-semibold">
                      <FileText className="w-4 h-4 text-gray-400" />
                      {advisor.stats?.completedReturns || 0}
                    </div>
                    <div className="text-xs text-gray-500">Returns</div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedAdvisor(advisor)}
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingAdvisor(advisor)}
                    leftIcon={<PencilSimple />}
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-600"
                    onClick={() => deleteAdvisor(advisor.id)}
                    leftIcon={<Trash />}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {(showCreateModal || editingAdvisor) && (
        <AdvisorModal
          advisor={editingAdvisor}
          onClose={() => {
            setShowCreateModal(false)
            setEditingAdvisor(null)
          }}
          onSuccess={() => {
            setShowCreateModal(false)
            setEditingAdvisor(null)
            fetchAdvisors()
          }}
        />
      )}

      {/* View Details Modal */}
      {selectedAdvisor && (
        <AdvisorDetailsModal
          advisor={selectedAdvisor}
          onClose={() => setSelectedAdvisor(null)}
        />
      )}
    </div>
  )
}

function AdvisorModal({
  advisor,
  onClose,
  onSuccess,
}: {
  advisor: Advisor | null
  onClose: () => void
  onSuccess: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: advisor?.name || '',
    email: advisor?.email || '',
    phone: advisor?.phone || '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = advisor ? `/api/admin/advisors/${advisor.id}` : '/api/admin/advisors'
      const method = advisor ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        onSuccess()
      }
    } catch (error) {
      console.error('Error saving advisor:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{advisor ? 'Edit Advisor' : 'Add Advisor'}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
            required
          />
          <Input
            label="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="(555) 123-4567"
          />
          {!advisor && (
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Temporary password"
              required
            />
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <SpinnerGap className="w-4 h-4 animate-spin" />
              ) : advisor ? (
                'Update Advisor'
              ) : (
                'Add Advisor'
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

function AdvisorDetailsModal({ advisor, onClose }: { advisor: Advisor; onClose: () => void }) {
  const [clients, setClients] = useState<{ id: string; name: string; email: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`/api/admin/advisors/${advisor.id}/clients`)
        const data = await response.json()
        setClients(data.clients || [])
      } catch (error) {
        console.error('Error fetching clients:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchClients()
  }, [advisor.id])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Advisor Details</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-light-accent-primary/20 flex items-center justify-center">
              <UserCircle className="w-10 h-10 text-light-accent-primary" weight="fill" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{advisor.name}</h3>
              <p className="text-gray-500">{advisor.email}</p>
              {advisor.phone && <p className="text-gray-500">{advisor.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="p-4 text-center bg-gray-50 dark:bg-dark-bg-tertiary">
              <div className="text-2xl font-bold">{advisor._count.clients}</div>
              <div className="text-sm text-gray-500">Clients</div>
            </Card>
            <Card className="p-4 text-center bg-gray-50 dark:bg-dark-bg-tertiary">
              <div className="text-2xl font-bold">{advisor._count.appointments}</div>
              <div className="text-sm text-gray-500">Appointments</div>
            </Card>
            <Card className="p-4 text-center bg-gray-50 dark:bg-dark-bg-tertiary">
              <div className="text-2xl font-bold flex items-center justify-center gap-1">
                {advisor.stats?.rating?.toFixed(1) || '-'}
                <Star weight="fill" className="w-4 h-4 text-yellow-500" />
              </div>
              <div className="text-sm text-gray-500">Rating</div>
            </Card>
          </div>

          <h4 className="font-semibold mb-4">Assigned Clients</h4>
          {loading ? (
            <div className="flex justify-center py-8">
              <SpinnerGap className="w-6 h-6 animate-spin text-light-accent-primary" />
            </div>
          ) : clients.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No clients assigned</p>
          ) : (
            <div className="space-y-2">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg"
                >
                  <div>
                    <div className="font-medium">{client.name}</div>
                    <div className="text-sm text-gray-500">{client.email}</div>
                  </div>
                  <Button size="sm" variant="ghost">
                    View
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" className="w-full" onClick={onClose}>
            Close
          </Button>
        </div>
      </Card>
    </div>
  )
}
