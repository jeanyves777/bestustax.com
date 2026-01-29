'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Users,
  MagnifyingGlass,
  User as UserIcon,
  EnvelopeSimple,
  Phone,
  FileText,
  Calendar,
  ChatCircle,
  SpinnerGap,
  Eye,
  ChartLine
} from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface Client {
  id: string
  name: string
  email: string
  phone: string | null
  status: string
  createdAt: string
  _count: {
    documents: number
    taxReturns: number
    appointments: number
  }
  latestReturn?: {
    status: string
    year: number
  }
}

export default function AdvisorClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all')

  useEffect(() => {
    fetchClients()
  }, [filter])

  const fetchClients = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/advisor/clients?filter=${filter}`)
      const data = await response.json()
      setClients(data.clients || [])
    } catch (error) {
      console.error('Error fetching clients:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getReturnStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600'
      case 'filed':
        return 'text-blue-600'
      case 'in-review':
        return 'text-yellow-600'
      case 'draft':
        return 'text-gray-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Clients</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and view your assigned clients
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex gap-2">
          {(['all', 'active', 'inactive'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-dark-bg-tertiary hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<MagnifyingGlass />}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold">{clients.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Clients</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {clients.filter((c) => c.status === 'active').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {clients.filter((c) => c.latestReturn?.status === 'in-review').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Returns In Review</div>
        </Card>
      </div>

      {/* Clients List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <SpinnerGap className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : filteredClients.length === 0 ? (
        <Card className="p-12 text-center">
          <Users weight="thin" className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No clients found</p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card key={client.id} className="overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <UserIcon className="w-6 h-6 text-blue-600" weight="fill" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{client.name}</h3>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(client.status)}`}>
                        {client.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <EnvelopeSimple className="w-4 h-4" />
                    <span className="truncate">{client.email}</span>
                  </div>
                  {client.phone && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Phone className="w-4 h-4" />
                      {client.phone}
                    </div>
                  )}
                </div>

                {client.latestReturn && (
                  <div className="mb-4 p-3 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Latest Return ({client.latestReturn.year})</span>
                      <span className={`text-sm font-medium capitalize ${getReturnStatusColor(client.latestReturn.status)}`}>
                        {client.latestReturn.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2 py-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-lg font-semibold">
                      <FileText className="w-4 h-4 text-gray-400" />
                      {client._count.documents}
                    </div>
                    <div className="text-xs text-gray-500">Docs</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-lg font-semibold">
                      <ChartLine className="w-4 h-4 text-gray-400" />
                      {client._count.taxReturns}
                    </div>
                    <div className="text-xs text-gray-500">Returns</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-lg font-semibold">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {client._count.appointments}
                    </div>
                    <div className="text-xs text-gray-500">Appts</div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Link href={`/advisor/clients/${client.id}`} className="flex-1">
                    <Button variant="outline" className="w-full" leftIcon={<Eye />}>
                      View Details
                    </Button>
                  </Link>
                  <Link href={`/advisor/messages?client=${client.id}`}>
                    <Button variant="ghost" leftIcon={<ChatCircle />} />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
