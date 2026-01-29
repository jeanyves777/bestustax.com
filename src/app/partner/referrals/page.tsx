'use client'

import { useState, useEffect } from 'react'
import {
  Users,
  MagnifyingGlass,
  Plus,
  EnvelopeSimple,
  Phone,
  Calendar,
  SpinnerGap,
  X,
  Check
} from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface Referral {
  id: string
  name: string
  email: string
  phone: string | null
  status: string
  source: string | null
  notes: string | null
  commission: number | null
  createdAt: string
}

export default function PartnerReferralsPage() {
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    fetchReferrals()
  }, [statusFilter])

  const fetchReferrals = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.append('status', statusFilter)
      const response = await fetch(`/api/partner/referrals?${params}`)
      const data = await response.json()
      setReferrals(data.referrals || [])
    } catch (error) {
      console.error('Error fetching referrals:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'contacted':
        return 'bg-blue-100 text-blue-800'
      case 'converted':
        return 'bg-green-100 text-green-800'
      case 'lost':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredReferrals = referrals.filter(
    (ref) =>
      ref.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ref.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Referrals</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your client referrals
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)} leftIcon={<Plus weight="bold" />} glow>
          Add Referral
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card
          className={`p-4 text-center cursor-pointer transition-all ${
            statusFilter === 'all' ? 'ring-2 ring-green-500' : ''
          }`}
          onClick={() => setStatusFilter('all')}
        >
          <div className="text-2xl font-bold">{referrals.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
        </Card>
        <Card
          className={`p-4 text-center cursor-pointer transition-all ${
            statusFilter === 'pending' ? 'ring-2 ring-yellow-500' : ''
          }`}
          onClick={() => setStatusFilter('pending')}
        >
          <div className="text-2xl font-bold text-yellow-600">
            {referrals.filter((r) => r.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
        </Card>
        <Card
          className={`p-4 text-center cursor-pointer transition-all ${
            statusFilter === 'contacted' ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => setStatusFilter('contacted')}
        >
          <div className="text-2xl font-bold text-blue-600">
            {referrals.filter((r) => r.status === 'contacted').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Contacted</div>
        </Card>
        <Card
          className={`p-4 text-center cursor-pointer transition-all ${
            statusFilter === 'converted' ? 'ring-2 ring-green-500' : ''
          }`}
          onClick={() => setStatusFilter('converted')}
        >
          <div className="text-2xl font-bold text-green-600">
            {referrals.filter((r) => r.status === 'converted').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Converted</div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4 mb-6">
        <Input
          placeholder="Search referrals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftIcon={<MagnifyingGlass />}
        />
      </Card>

      {/* Referrals List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <SpinnerGap className="w-8 h-8 animate-spin text-green-600" />
        </div>
      ) : filteredReferrals.length === 0 ? (
        <Card className="p-12 text-center">
          <Users weight="thin" className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 mb-4">No referrals found</p>
          <Button onClick={() => setShowAddModal(true)}>
            Add Your First Referral
          </Button>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-bg-tertiary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commission
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredReferrals.map((referral) => (
                  <tr key={referral.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                    <td className="px-6 py-4">
                      <div className="font-medium">{referral.name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <EnvelopeSimple className="w-3 h-3" />
                          {referral.email}
                        </span>
                        {referral.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {referral.phone}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(referral.status)}`}>
                        {referral.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {referral.source || 'Direct'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(referral.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                      {referral.commission ? (
                        <span className="text-green-600">${referral.commission.toLocaleString()}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Add Referral Modal */}
      {showAddModal && (
        <AddReferralModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false)
            fetchReferrals()
          }}
        />
      )}
    </div>
  )
}

function AddReferralModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
    source: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/partner/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        onSuccess()
      }
    } catch (error) {
      console.error('Error adding referral:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Add Referral</h2>
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
            label="Phone (Optional)"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="(555) 123-4567"
          />
          <Input
            label="Source (Optional)"
            value={formData.source}
            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
            placeholder="Website, Social Media, etc."
          />
          <div>
            <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary"
              placeholder="Any additional information..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <SpinnerGap className="w-4 h-4 animate-spin" /> : 'Add Referral'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
