'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Globe,
  MapPin,
  Users,
  TrendUp,
  ChartBar,
} from '@phosphor-icons/react'
import Card from '@/components/ui/Card'

const geoStats = [
  { name: 'States Covered', value: '42', change: '+3 new states' },
  { name: 'Top State', value: 'California', change: '28% of clients' },
  { name: 'Fastest Growing', value: 'Texas', change: '+45% YoY' },
  { name: 'International', value: '156', change: 'Expat clients' },
]

const stateData = [
  { state: 'California', clients: 892, revenue: '$124,500', growth: '+12%' },
  { state: 'Texas', clients: 654, revenue: '$98,200', growth: '+45%' },
  { state: 'New York', clients: 543, revenue: '$87,600', growth: '+8%' },
  { state: 'Florida', clients: 421, revenue: '$65,400', growth: '+22%' },
  { state: 'Illinois', clients: 298, revenue: '$45,200', growth: '+15%' },
  { state: 'Pennsylvania', clients: 245, revenue: '$38,900', growth: '+10%' },
  { state: 'Ohio', clients: 198, revenue: '$31,200', growth: '+18%' },
  { state: 'Georgia', clients: 176, revenue: '$28,400', growth: '+25%' },
]

export default function GeographicAnalyticsPage() {
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
            <h1 className="text-3xl font-bold mb-2">Geographic Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Client distribution and regional market insights
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
        {geoStats.map((stat) => (
          <Card key={stat.name} className="p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.name}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
          </Card>
        ))}
      </div>

      {/* Map Placeholder */}
      <Card className="p-6 mb-8">
        <h3 className="font-semibold mb-4">Client Distribution Map</h3>
        <div className="h-80 flex items-center justify-center bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg">
          <div className="text-center text-gray-500">
            <Globe className="w-16 h-16 mx-auto mb-2 opacity-50" />
            <p>Interactive map visualization</p>
            <p className="text-sm">Integration with mapping service</p>
          </div>
        </div>
      </Card>

      {/* State Breakdown */}
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold">State-by-State Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-bg-tertiary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  State
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clients
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {stateData.map((row) => (
                <tr key={row.state} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-purple-500" />
                      <span className="font-medium">{row.state}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      {row.clients.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {row.revenue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-green-600">
                      <TrendUp className="w-4 h-4" />
                      {row.growth}
                    </span>
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
