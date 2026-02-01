'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ChartLine,
  ChartBar,
  Users,
  Handshake,
  Globe,
  ShieldCheck,
  TrendUp,
  TrendDown,
  ArrowRight,
  Calendar,
  CurrencyDollar,
  FileText,
} from '@phosphor-icons/react'
import Card from '@/components/ui/Card'

const stats = [
  {
    name: 'Total Revenue',
    value: '$284,520',
    change: '+12.5%',
    trend: 'up',
    icon: CurrencyDollar,
  },
  {
    name: 'Tax Returns Filed',
    value: '1,284',
    change: '+8.2%',
    trend: 'up',
    icon: FileText,
  },
  {
    name: 'Active Clients',
    value: '3,427',
    change: '+15.3%',
    trend: 'up',
    icon: Users,
  },
  {
    name: 'Avg. Processing Time',
    value: '2.4 days',
    change: '-18.5%',
    trend: 'up',
    icon: Calendar,
  },
]

const analyticsModules = [
  {
    name: 'Advisor Analytics',
    description: 'Performance metrics, client load, and revenue by advisor',
    href: '/admin/analytics/advisors',
    icon: Users,
    color: 'bg-blue-500',
  },
  {
    name: 'Partner Analytics',
    description: 'Referral tracking, conversion rates, and partner performance',
    href: '/admin/analytics/partners',
    icon: Handshake,
    color: 'bg-green-500',
  },
  {
    name: 'Geographic Analytics',
    description: 'Client distribution, regional trends, and market insights',
    href: '/admin/analytics/geographic',
    icon: Globe,
    color: 'bg-purple-500',
  },
  {
    name: 'Security Analytics',
    description: 'Login attempts, suspicious activity, and security events',
    href: '/admin/analytics/security',
    icon: ShieldCheck,
    color: 'bg-red-500',
  },
]

const recentActivity = [
  { type: 'return', message: 'Tax return #4521 filed successfully', time: '2 min ago' },
  { type: 'client', message: 'New client registered: John Smith', time: '15 min ago' },
  { type: 'payment', message: 'Payment received: $450.00', time: '1 hour ago' },
  { type: 'advisor', message: 'Advisor Sarah completed 5 returns today', time: '2 hours ago' },
  { type: 'partner', message: 'New referral from Partner ABC Corp', time: '3 hours ago' },
]

export default function AnalyticsOverviewPage() {
  const [dateRange, setDateRange] = useState('30d')

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics Overview</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor your business performance and key metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.name}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className="p-2 bg-light-accent-primary/10 dark:bg-dark-accent-primary/10 rounded-lg">
                <stat.icon className="w-6 h-6 text-light-accent-primary dark:text-dark-accent-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1">
              {stat.trend === 'up' ? (
                <TrendUp className="w-4 h-4 text-green-500" weight="bold" />
              ) : (
                <TrendDown className="w-4 h-4 text-red-500" weight="bold" />
              )}
              <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                {stat.change}
              </span>
              <span className="text-gray-500 text-sm">vs last period</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart Placeholder */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Revenue Overview</h3>
            <ChartLine className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg">
            <div className="text-center text-gray-500">
              <ChartBar className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Revenue chart will appear here</p>
              <p className="text-sm">Connect to analytics service</p>
            </div>
          </div>
        </Card>

        {/* Client Growth Chart Placeholder */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Client Growth</h3>
            <Users className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg">
            <div className="text-center text-gray-500">
              <ChartLine className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Growth chart will appear here</p>
              <p className="text-sm">Connect to analytics service</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Analytics Modules */}
      <h2 className="text-xl font-semibold mb-4">Analytics Modules</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {analyticsModules.map((module) => (
          <Link key={module.name} href={module.href}>
            <Card className="p-6 h-full hover:shadow-lg transition-shadow cursor-pointer group">
              <div className={`w-12 h-12 ${module.color} rounded-xl flex items-center justify-center mb-4`}>
                <module.icon className="w-6 h-6 text-white" weight="bold" />
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-light-accent-primary dark:group-hover:text-dark-accent-primary transition-colors">
                {module.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {module.description}
              </p>
              <div className="flex items-center text-sm text-light-accent-primary dark:text-dark-accent-primary">
                View Details
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-light-accent-primary dark:bg-dark-accent-primary" />
                <span className="text-sm">{activity.message}</span>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
