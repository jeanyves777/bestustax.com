'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FileText, MagnifyingGlass, Eye, PencilSimple, SpinnerGap, CheckCircle, Clock, Warning, PaperPlaneTilt } from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface TaxReturn {
  id: string
  year: number
  filingStatus: string | null
  status: string
  totalIncome: number | null
  federalTax: number | null
  refundAmount: number | null
  amountOwed: number | null
  currentStep: number
  createdAt: string
  updatedAt: string
  client: {
    id: string
    name: string | null
    email: string
  }
  advisor: {
    name: string | null
  } | null
}

const statusConfig: Record<string, { color: string; icon: any; label: string }> = {
  draft: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Draft' },
  'in-review': { color: 'bg-blue-100 text-blue-800', icon: Eye, label: 'In Review' },
  'pending-signature': { color: 'bg-orange-100 text-orange-800', icon: Warning, label: 'Pending Signature' },
  filed: { color: 'bg-purple-100 text-purple-800', icon: PaperPlaneTilt, label: 'Filed' },
  completed: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Completed' },
}

export default function TaxReturnsPage() {
  const [taxReturns, setTaxReturns] = useState<TaxReturn[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [yearFilter, setYearFilter] = useState('all')

  const [stats, setStats] = useState({
    total: 0,
    draft: 0,
    inReview: 0,
    completed: 0,
  })

  useEffect(() => {
    fetchTaxReturns()
  }, [statusFilter, yearFilter])

  const fetchTaxReturns = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.append('status', statusFilter)
      if (yearFilter !== 'all') params.append('year', yearFilter)

      const response = await fetch(`/api/admin/tax-returns?${params}`)
      const data = await response.json()

      if (data.taxReturns) {
        setTaxReturns(data.taxReturns)
        setStats(data.stats || stats)
      }
    } catch (error) {
      console.error('Error fetching tax returns:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/tax-returns/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        fetchTaxReturns()
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const filteredReturns = taxReturns.filter(
    (tr) =>
      tr.client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tr.client.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentYear = new Date().getFullYear()
  const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tax Returns</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage all client tax returns
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Returns</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{stats.draft}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.inReview}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">In Review</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
        </Card>
      </div>

      {/* Filters */}
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
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary"
          >
            <option value="all">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="in-review">In Review</option>
            <option value="pending-signature">Pending Signature</option>
            <option value="filed">Filed</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary"
          >
            <option value="all">All Years</option>
            {years.map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Tax Returns Table */}
      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <SpinnerGap className="w-8 h-8 animate-spin text-light-accent-primary" />
          </div>
        ) : filteredReturns.length === 0 ? (
          <div className="text-center py-12">
            <FileText weight="thin" className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No tax returns found</p>
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
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Filing Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Income
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Refund/Owed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredReturns.map((taxReturn) => {
                  const statusInfo = statusConfig[taxReturn.status] || statusConfig.draft
                  const StatusIcon = statusInfo.icon

                  return (
                    <tr key={taxReturn.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">{taxReturn.client.name || 'N/A'}</div>
                        <div className="text-sm text-gray-500">{taxReturn.client.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-lg font-bold">{taxReturn.year}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="capitalize">
                          {taxReturn.filingStatus?.replace('-', ' ') || 'Not set'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {taxReturn.totalIncome
                          ? `$${taxReturn.totalIncome.toLocaleString()}`
                          : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {taxReturn.refundAmount ? (
                          <span className="text-green-600 font-medium">
                            +${taxReturn.refundAmount.toLocaleString()}
                          </span>
                        ) : taxReturn.amountOwed ? (
                          <span className="text-red-600 font-medium">
                            -${taxReturn.amountOwed.toLocaleString()}
                          </span>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${statusInfo.color}`}>
                          <StatusIcon weight="fill" className="w-3 h-3" />
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/tax-returns/${taxReturn.id}`}>
                            <Button size="sm" variant="ghost" title="View">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Link href={`/admin/tax-returns/${taxReturn.id}/edit`}>
                            <Button size="sm" variant="ghost" title="Edit">
                              <PencilSimple className="w-4 h-4" />
                            </Button>
                          </Link>
                          {taxReturn.status === 'draft' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusUpdate(taxReturn.id, 'in-review')}
                            >
                              Review
                            </Button>
                          )}
                          {taxReturn.status === 'in-review' && (
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() => handleStatusUpdate(taxReturn.id, 'pending-signature')}
                            >
                              Request Signature
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
    </div>
  )
}
