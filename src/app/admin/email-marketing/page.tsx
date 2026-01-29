'use client'

import { useState, useEffect } from 'react'
import {
  EnvelopeSimple,
  MagnifyingGlass,
  Plus,
  PaperPlaneTilt,
  Users,
  ChartLine,
  Clock,
  Eye,
  PencilSimple,
  Trash,
  Copy,
  SpinnerGap,
  X,
  ArrowRight
} from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface EmailCampaign {
  id: string
  name: string
  subject: string
  content: string
  status: 'draft' | 'scheduled' | 'sent' | 'cancelled'
  recipientCount: number
  openRate: number | null
  clickRate: number | null
  scheduledAt: string | null
  sentAt: string | null
  createdAt: string
}

interface EmailContact {
  id: string
  email: string
  name: string | null
  subscribed: boolean
  tags: string[]
  createdAt: string
}

export default function EmailMarketingPage() {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'contacts' | 'templates'>('campaigns')
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([])
  const [contacts, setContacts] = useState<EmailContact[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)

  const [stats, setStats] = useState({
    totalContacts: 0,
    subscribedContacts: 0,
    campaignsSent: 0,
    avgOpenRate: 0,
  })

  useEffect(() => {
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/email-marketing?type=${activeTab}`)
      const data = await response.json()

      if (activeTab === 'campaigns') {
        setCampaigns(data.campaigns || [])
      } else if (activeTab === 'contacts') {
        setContacts(data.contacts || [])
      }
      setStats(data.stats || stats)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.name && contact.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'sent':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Email Marketing</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage email campaigns
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setShowContactModal(true)} variant="outline" leftIcon={<Users weight="bold" />}>
            Add Contact
          </Button>
          <Button onClick={() => setShowCreateModal(true)} leftIcon={<Plus weight="bold" />} glow>
            New Campaign
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold">{stats.totalContacts}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Contacts</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.subscribedContacts}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Subscribed</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.campaignsSent}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Campaigns Sent</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.avgOpenRate}%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Avg Open Rate</div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'campaigns'
              ? 'bg-light-accent-primary text-white'
              : 'bg-gray-100 dark:bg-dark-bg-tertiary hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Campaigns
        </button>
        <button
          onClick={() => setActiveTab('contacts')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'contacts'
              ? 'bg-light-accent-primary text-white'
              : 'bg-gray-100 dark:bg-dark-bg-tertiary hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Contacts
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'templates'
              ? 'bg-light-accent-primary text-white'
              : 'bg-gray-100 dark:bg-dark-bg-tertiary hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Templates
        </button>
      </div>

      {/* Search */}
      <Card className="p-4 mb-6">
        <Input
          placeholder={`Search ${activeTab}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftIcon={<MagnifyingGlass />}
        />
      </Card>

      {/* Content */}
      {activeTab === 'campaigns' && (
        <Card className="overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <SpinnerGap className="w-8 h-8 animate-spin text-light-accent-primary" />
            </div>
          ) : filteredCampaigns.length === 0 ? (
            <div className="text-center py-12">
              <EnvelopeSimple weight="thin" className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No campaigns found</p>
              <Button className="mt-4" onClick={() => setShowCreateModal(true)}>
                Create Your First Campaign
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-dark-bg-tertiary">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Campaign
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recipients
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-6 py-4">
                        <div className="font-medium">{campaign.name}</div>
                        <div className="text-sm text-gray-500">{campaign.subject}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(campaign.status)}`}>
                          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>{campaign.recipientCount}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {campaign.status === 'sent' ? (
                          <div className="text-sm">
                            <div className="flex items-center gap-2">
                              <Eye className="w-4 h-4 text-gray-400" />
                              <span>{campaign.openRate || 0}% opens</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <ArrowRight className="w-4 h-4 text-gray-400" />
                              <span>{campaign.clickRate || 0}% clicks</span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {campaign.sentAt ? (
                          <div className="text-gray-600">
                            Sent {new Date(campaign.sentAt).toLocaleDateString()}
                          </div>
                        ) : campaign.scheduledAt ? (
                          <div className="flex items-center gap-1 text-blue-600">
                            <Clock className="w-4 h-4" />
                            {new Date(campaign.scheduledAt).toLocaleDateString()}
                          </div>
                        ) : (
                          <div className="text-gray-400">Draft</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          {campaign.status === 'draft' && (
                            <>
                              <Button size="sm" variant="ghost" leftIcon={<PencilSimple />}>
                                Edit
                              </Button>
                              <Button size="sm" variant="ghost" leftIcon={<PaperPlaneTilt />}>
                                Send
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="ghost" leftIcon={<Copy />}>
                            Duplicate
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {activeTab === 'contacts' && (
        <Card className="overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <SpinnerGap className="w-8 h-8 animate-spin text-light-accent-primary" />
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="text-center py-12">
              <Users weight="thin" className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No contacts found</p>
              <Button className="mt-4" onClick={() => setShowContactModal(true)}>
                Add Your First Contact
              </Button>
            </div>
          ) : (
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
                      Tags
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Added
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredContacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-6 py-4">
                        <div className="font-medium">{contact.name || 'No name'}</div>
                        <div className="text-sm text-gray-500">{contact.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            contact.subscribed
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {contact.subscribed ? 'Subscribed' : 'Unsubscribed'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-1 flex-wrap">
                          {contact.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          {contact.tags.length > 3 && (
                            <span className="text-xs text-gray-500">+{contact.tags.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="ghost" leftIcon={<PencilSimple />}>
                            Edit
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-600" leftIcon={<Trash />}>
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {activeTab === 'templates' && (
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <EnvelopeSimple className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Welcome Email</h3>
            <p className="text-sm text-gray-500 mb-4">Send to new clients</p>
            <Button size="sm" variant="outline">Use Template</Button>
          </Card>
          <Card className="p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <ChartLine className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Tax Season Reminder</h3>
            <p className="text-sm text-gray-500 mb-4">Remind clients about deadlines</p>
            <Button size="sm" variant="outline">Use Template</Button>
          </Card>
          <Card className="p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <PaperPlaneTilt className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Newsletter</h3>
            <p className="text-sm text-gray-500 mb-4">Monthly tax tips</p>
            <Button size="sm" variant="outline">Use Template</Button>
          </Card>
        </div>
      )}

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <CreateCampaignModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false)
            fetchData()
          }}
        />
      )}

      {/* Add Contact Modal */}
      {showContactModal && (
        <AddContactModal
          onClose={() => setShowContactModal(false)}
          onSuccess={() => {
            setShowContactModal(false)
            fetchData()
          }}
        />
      )}
    </div>
  )
}

function CreateCampaignModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    content: '',
    recipientType: 'all',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/email-marketing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        onSuccess()
      }
    } catch (error) {
      console.error('Error creating campaign:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Create Email Campaign</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Campaign Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Q1 Tax Tips Newsletter"
            required
          />
          <Input
            label="Email Subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="Important Tax Updates for 2024"
            required
          />
          <div>
            <label className="block text-sm font-medium mb-2">Recipients</label>
            <select
              value={formData.recipientType}
              onChange={(e) => setFormData({ ...formData, recipientType: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary focus:ring-2 focus:ring-light-accent-primary"
            >
              <option value="all">All Subscribed Contacts</option>
              <option value="clients">Clients Only</option>
              <option value="leads">Leads Only</option>
              <option value="partners">Partners Only</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={8}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary focus:ring-2 focus:ring-light-accent-primary"
              placeholder="Write your email content here..."
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="outline" disabled={loading}>
              Save as Draft
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <SpinnerGap className="w-4 h-4 animate-spin" /> : 'Send Now'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

function AddContactModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    tags: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/email-marketing/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
        }),
      })

      if (response.ok) {
        onSuccess()
      }
    } catch (error) {
      console.error('Error adding contact:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Add Contact</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
            required
          />
          <Input
            label="Name (Optional)"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
          />
          <Input
            label="Tags (Optional)"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="client, vip, 2024"
            helperText="Separate multiple tags with commas"
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <SpinnerGap className="w-4 h-4 animate-spin" /> : 'Add Contact'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
