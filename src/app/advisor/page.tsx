'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import {
  Users,
  Calendar,
  FileText,
  ChatCircle,
  Clock,
  ArrowRight,
  ChartLine,
  CheckCircle,
  SpinnerGap
} from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface DashboardStats {
  totalClients: number
  activeReturns: number
  todayAppointments: number
  unreadMessages: number
  pendingDocuments: number
}

interface Appointment {
  id: string
  clientName: string
  service: string
  date: string
  time: string
  type: string
}

interface PendingTask {
  id: string
  type: string
  clientName: string
  description: string
  dueDate: string
}

export default function AdvisorDashboard() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    activeReturns: 0,
    todayAppointments: 0,
    unreadMessages: 0,
    pendingDocuments: 0,
  })
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([])
  const [pendingTasks, setPendingTasks] = useState<PendingTask[]>([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/advisor/dashboard')
      const data = await response.json()

      setStats(data.stats || stats)
      setTodayAppointments(data.todayAppointments || [])
      setPendingTasks(data.pendingTasks || [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <SpinnerGap className="w-8 h-8 animate-spin text-blue-600" />
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
          Here&apos;s an overview of your clients and tasks
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalClients}</p>
              <p className="text-sm text-gray-500">Clients</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <ChartLine className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.activeReturns}</p>
              <p className="text-sm text-gray-500">Active Returns</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.todayAppointments}</p>
              <p className="text-sm text-gray-500">Today&apos;s Appts</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.pendingDocuments}</p>
              <p className="text-sm text-gray-500">Pending Docs</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <ChatCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.unreadMessages}</p>
              <p className="text-sm text-gray-500">Messages</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Today&apos;s Appointments</h2>
            <Link href="/advisor/appointments">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight />}>
                View All
              </Button>
            </Link>
          </div>

          {todayAppointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar weight="thin" className="w-12 h-12 mx-auto text-gray-300 mb-2" />
              <p className="text-gray-500">No appointments today</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{apt.clientName}</p>
                      <p className="text-sm text-gray-500">{apt.service}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <Clock className="w-4 h-4" />
                      {apt.time}
                    </div>
                    <span className="text-xs text-gray-500 capitalize">{apt.type}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Pending Tasks */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Pending Tasks</h2>
            <span className="text-sm text-gray-500">{pendingTasks.length} tasks</span>
          </div>

          {pendingTasks.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle weight="thin" className="w-12 h-12 mx-auto text-green-300 mb-2" />
              <p className="text-gray-500">All caught up!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg"
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      task.type === 'document'
                        ? 'bg-yellow-100 dark:bg-yellow-900/30'
                        : task.type === 'review'
                        ? 'bg-blue-100 dark:bg-blue-900/30'
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}
                  >
                    <FileText
                      className={`w-4 h-4 ${
                        task.type === 'document'
                          ? 'text-yellow-600'
                          : task.type === 'review'
                          ? 'text-blue-600'
                          : 'text-gray-600'
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{task.description}</p>
                    <p className="text-xs text-gray-500">{task.clientName}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/advisor/clients">
            <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="font-medium">View Clients</p>
            </Card>
          </Link>
          <Link href="/advisor/documents">
            <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer text-center">
              <FileText className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
              <p className="font-medium">Review Documents</p>
            </Card>
          </Link>
          <Link href="/advisor/tax-returns">
            <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer text-center">
              <ChartLine className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="font-medium">Tax Returns</p>
            </Card>
          </Link>
          <Link href="/advisor/messages">
            <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer text-center">
              <ChatCircle className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="font-medium">Messages</p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
