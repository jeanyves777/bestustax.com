'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Handshake,
  Users,
  CurrencyDollar,
  TrendUp,
  ChartBar,
  ArrowsClockwise,
} from '@phosphor-icons/react'
import Card from '@/components/ui/Card'

const partnerStats = [
  { name: 'Total Partners', value: '48', change: '+5 this month' },
  { name: 'Total Referrals', value: '892', change: '+156 this month' },
  { name: 'Conversion Rate', value: '34%', change: '+2.5% vs last month' },
  { name: 'Commission Paid', value: '$28,450', change: 'This month' },
]

const topPartners = [
  { name: 'ABC Financial', referrals: 145, conversions: 52, revenue: '$8,200', rate: '35.8%' },
  { name: 'Smith & Associates', referrals: 128, conversions: 48, revenue: '$7,400', rate: '37.5%' },
  { name: 'Tax Solutions Inc', referrals: 98, conversions: 35, revenue: '$5,600', rate: '35.7%' },
  { name: 'Premier Accounting', referrals: 87, conversions: 28, revenue: '$4,200', rate: '32.2%' },
  { name: 'Financial Partners LLC', referrals: 76, conversions: 24, revenue: '$3,800', rate: '31.6%' },
]

export default function PartnerAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d')

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/analytics"
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-light-accent-primary dark:hover:text-dark-accent-primary mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Analytics
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Partner Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track referral performance and partner contributions
            </p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {partnerStats.map((stat) => (
          <Card key={stat.name} className="p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.name}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Referrals Over Time</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg">
            <div className="text-center text-gray-500">
              <ChartBar className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Chart visualization</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Conversion Funnel</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg">
            <div className="text-center text-gray-500">
              <ArrowsClockwise className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Funnel visualization</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Partners Table */}
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold">Top Performing Partners</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-bg-tertiary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Partner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Referrals
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conv. Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {topPartners.map((partner, index) => (
                <tr key={partner.name} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <Handshake className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-medium">{partner.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      {partner.referrals}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{partner.conversions}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded text-sm">
                      {partner.rate}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-green-600">
                    {partner.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
