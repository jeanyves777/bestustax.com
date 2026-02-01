'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Users,
  Star,
  FileText,
  Clock,
  TrendUp,
  ChartBar,
} from '@phosphor-icons/react'
import Card from '@/components/ui/Card'

const advisorStats = [
  { name: 'Total Advisors', value: '24', change: '+3 this month' },
  { name: 'Avg. Returns/Advisor', value: '53', change: '+12% vs last month' },
  { name: 'Avg. Rating', value: '4.8', change: 'Based on 1,240 reviews' },
  { name: 'Active This Week', value: '22', change: '92% activity rate' },
]

const topAdvisors = [
  { name: 'Sarah Johnson', returns: 127, rating: 4.9, revenue: '$45,200', clients: 89 },
  { name: 'Michael Chen', returns: 115, rating: 4.8, revenue: '$41,800', clients: 76 },
  { name: 'Emily Davis', returns: 98, rating: 4.9, revenue: '$38,500', clients: 65 },
  { name: 'James Wilson', returns: 92, rating: 4.7, revenue: '$35,200', clients: 58 },
  { name: 'Lisa Thompson', returns: 87, rating: 4.8, revenue: '$32,100', clients: 52 },
]

export default function AdvisorAnalyticsPage() {
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
            <h1 className="text-3xl font-bold mb-2">Advisor Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Performance metrics and insights for your tax advisors
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
        {advisorStats.map((stat) => (
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
          <h3 className="font-semibold mb-4">Returns by Advisor</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg">
            <div className="text-center text-gray-500">
              <ChartBar className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Chart visualization</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Client Satisfaction Trend</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg">
            <div className="text-center text-gray-500">
              <TrendUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Chart visualization</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Advisors Table */}
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold">Top Performing Advisors</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-bg-tertiary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Advisor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Returns Filed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clients
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {topAdvisors.map((advisor, index) => (
                <tr key={advisor.name} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-light-accent-primary/20 flex items-center justify-center">
                        <span className="text-sm font-medium text-light-accent-primary">
                          {index + 1}
                        </span>
                      </div>
                      <span className="font-medium">{advisor.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      {advisor.returns}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" weight="fill" />
                      {advisor.rating}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-green-600">
                    {advisor.revenue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      {advisor.clients}
                    </div>
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
