'use client'

import { useState, useEffect } from 'react'
import {
  CurrencyDollar,
  TrendUp,
  Clock,
  CheckCircle,
  ArrowDown,
  Calendar,
  SpinnerGap,
  Bank
} from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface EarningsStats {
  totalEarnings: number
  thisMonth: number
  pendingPayout: number
  lastPayout: number
  lastPayoutDate: string | null
}

interface Transaction {
  id: string
  type: 'commission' | 'payout'
  amount: number
  description: string
  status: string
  createdAt: string
  referralName?: string
}

export default function PartnerEarningsPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<EarningsStats>({
    totalEarnings: 0,
    thisMonth: 0,
    pendingPayout: 0,
    lastPayout: 0,
    lastPayoutDate: null,
  })
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filter, setFilter] = useState<'all' | 'commissions' | 'payouts'>('all')

  useEffect(() => {
    fetchEarnings()
  }, [filter])

  const fetchEarnings = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/partner/earnings?filter=${filter}`)
      const data = await response.json()
      setStats(data.stats || stats)
      setTransactions(data.transactions || [])
    } catch (error) {
      console.error('Error fetching earnings:', error)
    } finally {
      setLoading(false)
    }
  }

  const requestPayout = async () => {
    if (stats.pendingPayout < 100) {
      alert('Minimum payout amount is $100')
      return
    }

    try {
      const response = await fetch('/api/partner/payout', {
        method: 'POST',
      })

      if (response.ok) {
        fetchEarnings()
        alert('Payout request submitted successfully!')
      }
    } catch (error) {
      console.error('Error requesting payout:', error)
    }
  }

  const filteredTransactions = transactions.filter((t) => {
    if (filter === 'all') return true
    if (filter === 'commissions') return t.type === 'commission'
    if (filter === 'payouts') return t.type === 'payout'
    return true
  })

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Earnings</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your commissions and payouts
          </p>
        </div>
        <Button
          onClick={requestPayout}
          disabled={stats.pendingPayout < 100}
          leftIcon={<Bank weight="bold" />}
          glow={stats.pendingPayout >= 100}
        >
          Request Payout
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CurrencyDollar className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Earnings</p>
              <p className="text-2xl font-bold">${stats.totalEarnings.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <TrendUp className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">This Month</p>
              <p className="text-2xl font-bold">${stats.thisMonth.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Payout</p>
              <p className="text-2xl font-bold">${stats.pendingPayout.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Payout</p>
              <p className="text-2xl font-bold">${stats.lastPayout.toLocaleString()}</p>
              {stats.lastPayoutDate && (
                <p className="text-xs text-gray-400">
                  {new Date(stats.lastPayoutDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Payout Info */}
      {stats.pendingPayout > 0 && stats.pendingPayout < 100 && (
        <Card className="p-4 mb-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-yellow-600" />
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Minimum payout is $100. You need ${(100 - stats.pendingPayout).toFixed(2)} more to request a payout.
            </p>
          </div>
        </Card>
      )}

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {(['all', 'commissions', 'payouts'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
              filter === f
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 dark:bg-dark-bg-tertiary hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Transactions */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <SpinnerGap className="w-8 h-8 animate-spin text-green-600" />
        </div>
      ) : filteredTransactions.length === 0 ? (
        <Card className="p-12 text-center">
          <CurrencyDollar weight="thin" className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No transactions found</p>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-bg-tertiary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                    <td className="px-6 py-4">
                      <div className="font-medium">{transaction.description}</div>
                      {transaction.referralName && (
                        <div className="text-sm text-gray-500">From: {transaction.referralName}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          transaction.type === 'commission'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          transaction.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : transaction.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span
                        className={`font-bold ${
                          transaction.type === 'commission' ? 'text-green-600' : 'text-blue-600'
                        }`}
                      >
                        {transaction.type === 'commission' ? '+' : '-'}${transaction.amount.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}
