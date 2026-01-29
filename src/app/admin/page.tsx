import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { CurrencyDollar, Users, Calendar, FileText, TrendUp, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

async function getStats() {
  const now = new Date()
  const startOfYear = new Date(now.getFullYear(), 0, 1)
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const [
    totalClients,
    activeClients,
    pendingAppointments,
    upcomingAppointments,
    documentsThisMonth,
    taxReturnsInProgress,
    recentActivities,
    todayAppointments,
  ] = await Promise.all([
    prisma.user.count({ where: { role: 'client' } }),
    prisma.user.count({ where: { role: 'client', status: 'active' } }),
    prisma.appointment.count({ where: { status: 'scheduled' } }),
    prisma.appointment.count({
      where: {
        date: { gte: now },
        status: { in: ['scheduled', 'confirmed'] },
      },
    }),
    prisma.document.count({
      where: { createdAt: { gte: startOfMonth } },
    }),
    prisma.taxReturn.count({
      where: { status: { in: ['draft', 'in-review'] } },
    }),
    prisma.activityLog.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true, email: true } } },
    }),
    prisma.appointment.findMany({
      where: {
        date: {
          gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
          lt: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
        },
        status: { in: ['scheduled', 'confirmed'] },
      },
      include: { client: { select: { name: true, email: true } } },
      orderBy: { time: 'asc' },
    }),
  ])

  return {
    totalClients,
    activeClients,
    pendingAppointments,
    upcomingAppointments,
    documentsThisMonth,
    taxReturnsInProgress,
    recentActivities,
    todayAppointments,
  }
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  const stats = await getStats()

  const statCards = [
    {
      title: 'Total Revenue',
      value: '$125,430',
      change: '+12.5%',
      changeType: 'positive',
      icon: CurrencyDollar,
      href: '/admin/analytics',
    },
    {
      title: 'Active Clients',
      value: stats.activeClients.toString(),
      change: `${stats.totalClients} total`,
      changeType: 'neutral',
      icon: Users,
      href: '/admin/users',
    },
    {
      title: 'Pending Appointments',
      value: stats.pendingAppointments.toString(),
      change: `${stats.upcomingAppointments} upcoming`,
      changeType: 'neutral',
      icon: Calendar,
      href: '/admin/appointments',
    },
    {
      title: 'Documents This Month',
      value: stats.documentsThisMonth.toString(),
      change: `${stats.taxReturnsInProgress} returns in progress`,
      changeType: 'neutral',
      icon: FileText,
      href: '/admin/documents',
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back, {session?.user?.name || 'Admin'}!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card hover className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-light-accent-primary/10 dark:bg-dark-accent-primary/10">
                  <stat.icon weight="fill" className="w-6 h-6 text-light-accent-primary dark:text-dark-accent-primary" />
                </div>
                {stat.changeType === 'positive' && (
                  <span className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                    <TrendUp className="w-4 h-4" />
                    {stat.change}
                  </span>
                )}
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</div>
              {stat.changeType === 'neutral' && (
                <div className="text-xs text-gray-500 mt-1">{stat.change}</div>
              )}
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Today's Appointments */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Today's Appointments</h2>
            <Link href="/admin/appointments">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight />}>
                View All
              </Button>
            </Link>
          </div>
          {stats.todayAppointments.length > 0 ? (
            <div className="space-y-4">
              {stats.todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg"
                >
                  <div className="text-center min-w-[60px]">
                    <div className="text-lg font-bold text-light-accent-primary dark:text-dark-accent-primary">
                      {appointment.time}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{appointment.client.name || appointment.client.email}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{appointment.type}</div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      appointment.status === 'confirmed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No appointments scheduled for today
            </div>
          )}
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Activity</h2>
            <Link href="/admin/activity">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight />}>
                View All
              </Button>
            </Link>
          </div>
          {stats.recentActivities.length > 0 ? (
            <div className="space-y-4">
              {stats.recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-3 hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary rounded-lg transition-colors"
                >
                  <div className="w-2 h-2 mt-2 rounded-full bg-light-accent-primary dark:bg-dark-accent-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm">
                      <span className="font-medium">{activity.user?.name || 'System'}</span>
                      <span className="text-gray-600 dark:text-gray-400"> {activity.action}</span>
                      {activity.entity && (
                        <span className="text-gray-600 dark:text-gray-400"> {activity.entity}</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(activity.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No recent activity
            </div>
          )}
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/admin/appointments?action=create">
            <Card hover className="p-4 text-center cursor-pointer">
              <Calendar weight="fill" className="w-8 h-8 mx-auto mb-2 text-light-accent-primary dark:text-dark-accent-primary" />
              <div className="font-medium text-sm">New Appointment</div>
            </Card>
          </Link>
          <Link href="/admin/users?action=create">
            <Card hover className="p-4 text-center cursor-pointer">
              <Users weight="fill" className="w-8 h-8 mx-auto mb-2 text-light-accent-primary dark:text-dark-accent-primary" />
              <div className="font-medium text-sm">Add User</div>
            </Card>
          </Link>
          <Link href="/admin/documents?action=upload">
            <Card hover className="p-4 text-center cursor-pointer">
              <FileText weight="fill" className="w-8 h-8 mx-auto mb-2 text-light-accent-primary dark:text-dark-accent-primary" />
              <div className="font-medium text-sm">Upload Document</div>
            </Card>
          </Link>
          <Link href="/admin/rapid-doc?action=create">
            <Card hover className="p-4 text-center cursor-pointer">
              <TrendUp weight="fill" className="w-8 h-8 mx-auto mb-2 text-light-accent-primary dark:text-dark-accent-primary" />
              <div className="font-medium text-sm">Rapid Doc Access</div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
