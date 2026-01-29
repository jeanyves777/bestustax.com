'use client'

import { useState, useEffect } from 'react'
import { Handshake, MagnifyingGlass, Plus, Check, X as XIcon, SpinnerGap, Eye, CurrencyDollar, Users, Link as LinkIcon } from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface Partner {
  id: string
  businessName: string
  contactName: string
  email: string
  phone: string | null
  website: string | null
  status: string
  commissionRate: number
  totalRevenue: number
  totalLeads: number
  referralCode: string
  createdAt: string
  user: {
    name: string | null
    email: string
  }
}

const statusConfig: Record<string, { color: string; label: string }> = {
  pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
  active: { color: 'bg-green-100 text-green-800', label: 'Active' },
  suspended: { color: 'bg-red-100 text-red-800', label: 'Suspended' },
  rejected: { color: 'bg-gray-100 text-gray-800', label: 'Rejected' },
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    totalRevenue: 0,
  })

  useEffect(() => {
    fetchPartners()
  }, [statusFilter])

  const fetchPartners = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.append('status', statusFilter)

      const response = await fetch(`/api/admin/partners?${params}`)
      const data = await response.json()

      if (data.partners) {
        setPartners(data.partners)
        setStats(data.stats || stats)
      }
    } catch (error) {
      console.error('Error fetching partners:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id: string) => {
    setActionLoading(id)
    try {
      await fetch(`/api/admin/partners/${id}/approve`, { method: 'POST' })
      fetchPartners()
    } catch (error) {
      console.error('Error approving partner:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (id: string) => {
    if (!confirm('Are you sure you want to reject this partner?')) return
    setActionLoading(id)
    try {
      await fetch(`/api/admin/partners/${id}/reject`, { method: 'POST' })
      fetchPartners()
    } catch (error) {
      console.error('Error rejecting partner:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const handleSuspend = async (id: string) => {
    if (!confirm('Are you sure you want to suspend this partner?')) return
    setActionLoading(id)
    try {
      await fetch(`/api/admin/partners/${id}/suspend`, { method: 'POST' })
      fetchPartners()
    } catch (error) {
      console.error('Error suspending partner:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const handleReactivate = async (id: string) => {
    setActionLoading(id)
    try {
      await fetch(`/api/admin/partners/${id}/reactivate`, { method: 'POST' })
      fetchPartners()
    } catch (error) {
      console.error('Error reactivating partner:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const filteredPartners = partners.filter(
    (partner) =>
      partner.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Partners</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage referral partners
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} leftIcon={<Plus weight="bold" />} glow>
          Add Partner
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Partners</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold gradient-text">
            ${stats.totalRevenue.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by name, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<MagnifyingGlass />}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </Card>

      {/* Partners Table */}
      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <SpinnerGap className="w-8 h-8 animate-spin text-light-accent-primary" />
          </div>
        ) : filteredPartners.length === 0 ? (
          <div className="text-center py-12">
            <Handshake weight="thin" className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No partners found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-bg-tertiary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Partner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Leads / Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commission
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredPartners.map((partner) => {
                  const statusInfo = statusConfig[partner.status] || statusConfig.pending

                  return (
                    <tr key={partner.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">{partner.businessName}</div>
                        <div className="text-sm text-gray-500">
                          Code: <span className="font-mono">{partner.referralCode}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">{partner.contactName}</div>
                        <div className="text-sm text-gray-500">{partner.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-gray-400" />
                            {partner.totalLeads}
                          </span>
                          <span className="flex items-center gap-1 text-green-600">
                            <CurrencyDollar className="w-4 h-4" />
                            {partner.totalRevenue.toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium">{(partner.commissionRate * 100).toFixed(0)}%</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedPartner(partner)}
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {partner.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleApprove(partner.id)}
                                disabled={actionLoading === partner.id}
                                className="text-green-600"
                              >
                                <Check weight="bold" className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleReject(partner.id)}
                                disabled={actionLoading === partner.id}
                                className="text-red-600"
                              >
                                <XIcon weight="bold" className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          {partner.status === 'active' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSuspend(partner.id)}
                              disabled={actionLoading === partner.id}
                              className="text-red-600 border-red-600"
                            >
                              Suspend
                            </Button>
                          )}
                          {partner.status === 'suspended' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReactivate(partner.id)}
                              disabled={actionLoading === partner.id}
                            >
                              Reactivate
                            </Button>
                          )}
                        </div>
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
        <CreatePartnerModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false)
            fetchPartners()
          }}
        />
      )}

      {/* View Modal */}
      {selectedPartner && (
        <ViewPartnerModal
          partner={selectedPartner}
          onClose={() => setSelectedPartner(null)}
        />
      )}
    </div>
  )
}

function CreatePartnerModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    commissionRate: '10',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          commissionRate: parseFloat(formData.commissionRate) / 100,
        }),
      })

      if (response.ok) {
        onSuccess()
      }
    } catch (error) {
      console.error('Error creating partner:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Add New Partner</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Business Name"
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            required
          />
          <Input
            label="Contact Name"
            value={formData.contactName}
            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label="Phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <Input
            label="Website"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            placeholder="https://..."
          />
          <Input
            label="Commission Rate (%)"
            type="number"
            value={formData.commissionRate}
            onChange={(e) => setFormData({ ...formData, commissionRate: e.target.value })}
            min="0"
            max="50"
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <SpinnerGap className="w-4 h-4 animate-spin" /> : 'Add Partner'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

function ViewPartnerModal({ partner, onClose }: { partner: Partner; onClose: () => void }) {
  const referralLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/ref/${partner.referralCode}`

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink)
    alert('Referral link copied!')
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Partner Details</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-light-accent-primary to-light-success flex items-center justify-center">
              <Handshake weight="fill" className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{partner.businessName}</h3>
              <p className="text-gray-500">{partner.contactName}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-500">Email</span>
              <p className="font-medium">{partner.email}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Phone</span>
              <p className="font-medium">{partner.phone || 'N/A'}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Total Leads</span>
              <p className="font-medium">{partner.totalLeads}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Total Revenue</span>
              <p className="font-medium text-green-600">${partner.totalRevenue.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Commission Rate</span>
              <p className="font-medium">{(partner.commissionRate * 100).toFixed(0)}%</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Joined</span>
              <p className="font-medium">{new Date(partner.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div>
            <span className="text-sm text-gray-500 block mb-2">Referral Link</span>
            <div className="flex gap-2">
              <Input value={referralLink} readOnly className="flex-1 font-mono text-sm" />
              <Button variant="outline" onClick={copyLink}>
                <LinkIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
