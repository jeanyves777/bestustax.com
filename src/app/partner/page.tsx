'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import {
  Users,
  CurrencyDollar,
  ChartLineUp,
  ArrowRight,
  Copy,
  Check,
  SpinnerGap,
  TrendUp,
  Clock
} from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface DashboardStats {
  totalReferrals: number
  activeReferrals: number
  totalEarnings: number
  pendingPayout: number
  conversionRate: number
}

interface RecentReferral {
  id: string
  name: string
  email: string
  status: string
  createdAt: string
  commission: number | null
}

export default function PartnerDashboard() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [stats, setStats] = useState<DashboardStats>({
    totalReferrals: 0,
    activeReferrals: 0,
    totalEarnings: 0,
    pendingPayout: 0,
    conversionRate: 0,
  })
  const [recentReferrals, setRecentReferrals] = useState<RecentReferral[]>([])
  const [referralCode, setReferralCode] = useState('')

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/partner/dashboard')
      const data = await response.json()

      setStats(data.stats || stats)
      setRecentReferrals(data.recentReferrals || [])
      setReferralCode(data.referralCode || '')
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyReferralLink = () => {
    const link = `${window.location.origin}/?ref=${referralCode}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'converted':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <SpinnerGap className="w-8 h-8 animate-spin text-green-600" />
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {session?.user?.name?.split(' ')[0]}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your referrals and earnings
        </p>
      </div>

      {/* Referral Link Card */}
      <Card className="p-6 mb-8 bg-gradient-to-r from-green-500/10 to-green-600/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-1">Your Referral Link</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Share this link with potential clients to earn commissions
            </p>
            <div className="flex items-center gap-2">
              <code className="px-3 py-1.5 bg-white dark:bg-dark-bg-secondary rounded-lg text-sm">
                {`${typeof window !== 'undefined' ? window.location.origin : ''}/?ref=${referralCode}`}
              </code>
            </div>
          </div>
          <Button onClick={copyReferralLink} leftIcon={copied ? <Check /> : <Copy />}>
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalReferrals}</p>
              <p className="text-sm text-gray-500">Total Referrals</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <ChartLineUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.activeReferrals}</p>
              <p className="text-sm text-gray-500">Active</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <TrendUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.conversionRate}%</p>
              <p className="text-sm text-gray-500">Conversion</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <CurrencyDollar className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">${stats.totalEarnings.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Total Earned</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">${stats.pendingPayout.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Pending</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Referrals */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Referrals</h2>
          <Link href="/partner/referrals">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight />}>
              View All
            </Button>
          </Link>
        </div>

        {recentReferrals.length === 0 ? (
          <div className="text-center py-8">
            <Users weight="thin" className="w-12 h-12 mx-auto text-gray-300 mb-2" />
            <p className="text-gray-500">No referrals yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Share your referral link to start earning commissions
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 font-medium">Client</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium text-right">Commission</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentReferrals.map((referral) => (
                  <tr key={referral.id}>
                    <td className="py-3">
                      <div className="font-medium">{referral.name}</div>
                      <div className="text-sm text-gray-500">{referral.email}</div>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(referral.status)}`}>
                        {referral.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-500">
                      {new Date(referral.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 text-right font-medium">
                      {referral.commission ? `$${referral.commission.toLocaleString()}` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
