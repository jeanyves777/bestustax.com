'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ChartLine,
  MagnifyingGlass,
  User as UserIcon,
  FileText,
  Clock,
  Check,
  ArrowRight,
  SpinnerGap,
  Eye,
  PencilSimple
} from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface TaxReturn {
  id: string
  year: number
  status: string
  currentStep: number
  totalIncome: number | null
  createdAt: string
  updatedAt: string
  user: {
    id: string
    name: string
    email: string
  }
}

const statusSteps = [
  { value: 'draft', label: 'Draft' },
  { value: 'in-review', label: 'In Review' },
  { value: 'pending-signature', label: 'Pending Signature' },
  { value: 'filed', label: 'Filed' },
  { value: 'completed', label: 'Completed' },
]

export default function AdvisorTaxReturnsPage() {
  const [taxReturns, setTaxReturns] = useState<TaxReturn[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    fetchTaxReturns()
  }, [statusFilter])

  const fetchTaxReturns = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.append('status', statusFilter)
      const response = await fetch(`/api/advisor/tax-returns?${params}`)
      const data = await response.json()
      setTaxReturns(data.taxReturns || [])
    } catch (error) {
      console.error('Error fetching tax returns:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/advisor/tax-returns/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      fetchTaxReturns()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      case 'in-review':
        return 'bg-yellow-100 text-yellow-800'
      case 'pending-signature':
        return 'bg-blue-100 text-blue-800'
      case 'filed':
        return 'bg-purple-100 text-purple-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getNextStatus = (currentStatus: string) => {
    const currentIndex = statusSteps.findIndex((s) => s.value === currentStatus)
    if (currentIndex < statusSteps.length - 1) {
      return statusSteps[currentIndex + 1]
    }
    return null
  }

  const filteredReturns = taxReturns.filter(
    (ret) =>
      ret.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ret.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Tax Returns</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Review and manage client tax returns
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {statusSteps.map((step) => {
          const count = taxReturns.filter((r) => r.status === step.value).length
          return (
            <Card
              key={step.value}
              className={`p-4 text-center cursor-pointer transition-all ${
                statusFilter === step.value ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setStatusFilter(statusFilter === step.value ? 'all' : step.value)}
            >
              <div className="text-2xl font-bold">{count}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{step.label}</div>
            </Card>
          )
        })}
      </div>

      {/* Search & Filter */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by client name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<MagnifyingGlass />}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary"
          >
            <option value="all">All Statuses</option>
            {statusSteps.map((step) => (
              <option key={step.value} value={step.value}>
                {step.label}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Returns List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <SpinnerGap className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : filteredReturns.length === 0 ? (
        <Card className="p-12 text-center">
          <ChartLine weight="thin" className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No tax returns found</p>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-bg-tertiary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Income
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredReturns.map((taxReturn) => {
                  const nextStatus = getNextStatus(taxReturn.status)
                  return (
                    <tr key={taxReturn.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <UserIcon className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">{taxReturn.user.name}</div>
                            <div className="text-sm text-gray-500">{taxReturn.user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium">{taxReturn.year}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(taxReturn.status)}`}>
                          {taxReturn.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${(taxReturn.currentStep / 9) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-500">
                            {taxReturn.currentStep}/9
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {taxReturn.totalIncome ? (
                          <span className="font-medium">
                            ${taxReturn.totalIncome.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(taxReturn.updatedAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="ghost" leftIcon={<Eye />}>
                            View
                          </Button>
                          {nextStatus && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateStatus(taxReturn.id, nextStatus.value)}
                              rightIcon={<ArrowRight />}
                            >
                              {nextStatus.label}
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
        </Card>
      )}
    </div>
  )
}
