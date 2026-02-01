'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ShieldCheck,
  Warning,
  ShieldWarning,
  LockKey,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
} from '@phosphor-icons/react'
import Card from '@/components/ui/Card'

const securityStats = [
  { name: 'Login Attempts', value: '12,458', change: 'Last 30 days' },
  { name: 'Failed Logins', value: '234', change: '1.9% failure rate' },
  { name: 'Active Sessions', value: '156', change: 'Currently active' },
  { name: 'Security Alerts', value: '8', change: 'Requires attention' },
]

const recentEvents = [
  { type: 'success', event: 'Successful login', user: 'admin@bestustax.com', ip: '192.168.1.1', time: '2 min ago' },
  { type: 'warning', event: 'Password reset requested', user: 'john@example.com', ip: '10.0.0.45', time: '15 min ago' },
  { type: 'success', event: 'Successful login', user: 'sarah@bestustax.com', ip: '192.168.1.25', time: '25 min ago' },
  { type: 'error', event: 'Failed login attempt', user: 'unknown@test.com', ip: '203.0.113.50', time: '1 hour ago' },
  { type: 'warning', event: '2FA disabled', user: 'mike@bestustax.com', ip: '192.168.1.30', time: '2 hours ago' },
  { type: 'success', event: 'Successful login', user: 'client@example.com', ip: '172.16.0.100', time: '3 hours ago' },
  { type: 'error', event: 'Multiple failed attempts', user: 'unknown', ip: '198.51.100.25', time: '4 hours ago' },
]

const blockedIPs = [
  { ip: '203.0.113.50', reason: 'Brute force attempt', blockedAt: '2 hours ago', attempts: 15 },
  { ip: '198.51.100.25', reason: 'Suspicious activity', blockedAt: '4 hours ago', attempts: 23 },
  { ip: '192.0.2.100', reason: 'Known malicious IP', blockedAt: '1 day ago', attempts: 8 },
]

export default function SecurityAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d')

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" weight="fill" />
      case 'warning':
        return <Warning className="w-5 h-5 text-yellow-500" weight="fill" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" weight="fill" />
      default:
        return <ShieldCheck className="w-5 h-5 text-gray-500" />
    }
  }

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
            <h1 className="text-3xl font-bold mb-2">Security Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor security events and protect your platform
            </p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {securityStats.map((stat) => (
          <Card key={stat.name} className="p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.name}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Security Events */}
        <Card className="overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h3 className="font-semibold">Recent Security Events</h3>
            <Eye className="w-5 h-5 text-gray-400" />
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
            {recentEvents.map((event, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                <div className="flex items-start gap-3">
                  {getEventIcon(event.type)}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{event.event}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {event.user}
                    </p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                      <span>IP: {event.ip}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Blocked IPs */}
        <Card className="overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h3 className="font-semibold">Blocked IP Addresses</h3>
            <ShieldWarning className="w-5 h-5 text-red-500" />
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {blockedIPs.map((blocked, index) => (
              <div key={index} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono font-medium">{blocked.ip}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {blocked.reason}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Blocked {blocked.blockedAt} • {blocked.attempts} attempts
                    </p>
                  </div>
                  <button className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                    Unblock
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full py-2 text-sm text-light-accent-primary dark:text-dark-accent-primary hover:underline">
              View all blocked IPs
            </button>
          </div>
        </Card>
      </div>

      {/* Security Recommendations */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <LockKey className="w-5 h-5 text-light-accent-primary" />
          Security Recommendations
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <Warning className="w-5 h-5 text-yellow-600 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">8 users have 2FA disabled</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Enforce 2FA for better security
              </p>
            </div>
            <button className="px-3 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-400 rounded hover:bg-yellow-200">
              Review
            </button>
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" weight="fill" />
            <div className="flex-1">
              <p className="text-sm font-medium">SSL certificate is valid</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Expires in 89 days
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" weight="fill" />
            <div className="flex-1">
              <p className="text-sm font-medium">Database backups are current</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Last backup: 2 hours ago
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
