import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { FileText, Calendar, Folder, ChatCircle, ArrowRight, CheckCircle, Clock, Warning } from '@phosphor-icons/react/dist/ssr'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

async function getClientStats(userId: string) {
  const now = new Date()

  const [
    taxReturns,
    upcomingAppointments,
    documentsCount,
    unreadMessages,
    activeTaxReturn,
  ] = await Promise.all([
    prisma.taxReturn.findMany({
      where: { userId },
      orderBy: { year: 'desc' },
      take: 1,
    }),
    prisma.appointment.findMany({
      where: {
        clientId: userId,
        date: { gte: now },
        status: { in: ['scheduled', 'confirmed'] },
      },
      orderBy: { date: 'asc' },
      take: 3,
    }),
    prisma.document.count({
      where: { userId },
    }),
    prisma.message.count({
      where: { receiverId: userId, read: false },
    }),
    prisma.taxReturn.findFirst({
      where: {
        userId,
        status: { in: ['draft', 'in-review', 'pending-signature'] },
      },
      orderBy: { year: 'desc' },
    }),
  ])

  return {
    taxReturn: taxReturns[0] || null,
    upcomingAppointments,
    documentsCount,
    unreadMessages,
    activeTaxReturn,
  }
}

const getStatusInfo = (status: string) => {
  switch (status) {
    case 'draft':
      return { color: 'text-yellow-600 bg-yellow-100', label: 'In Progress', icon: Clock }
    case 'in-review':
      return { color: 'text-blue-600 bg-blue-100', label: 'Under Review', icon: Clock }
    case 'pending-signature':
      return { color: 'text-orange-600 bg-orange-100', label: 'Needs Signature', icon: Warning }
    case 'filed':
      return { color: 'text-purple-600 bg-purple-100', label: 'Filed', icon: CheckCircle }
    case 'completed':
      return { color: 'text-green-600 bg-green-100', label: 'Completed', icon: CheckCircle }
    default:
      return { color: 'text-gray-600 bg-gray-100', label: status, icon: Clock }
  }
}

export default async function PortalDashboard() {
  const session = await getServerSession(authOptions)
  const stats = await getClientStats(session!.user.id)

  const statusInfo = stats.activeTaxReturn ? getStatusInfo(stats.activeTaxReturn.status) : null

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {session?.user?.name?.split(' ')[0] || 'there'}!</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's an overview of your tax account
        </p>
      </div>

      {/* Tax Return Status Banner */}
      {stats.activeTaxReturn && statusInfo && (
        <Card className="p-6 mb-8 border-l-4 border-light-accent-primary">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${statusInfo.color}`}>
                <statusInfo.icon weight="fill" className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold">
                  {stats.activeTaxReturn.year} Tax Return
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Status: <span className="font-medium">{statusInfo.label}</span>
                </p>
              </div>
            </div>
            <Link href="/portal/tax-filing">
              <Button rightIcon={<ArrowRight weight="bold" />}>
                {stats.activeTaxReturn.status === 'draft' ? 'Continue Filing' : 'View Details'}
              </Button>
            </Link>
          </div>

          {/* Progress Bar */}
          {stats.activeTaxReturn.status === 'draft' && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-400">Filing Progress</span>
                <span className="font-medium">
                  Step {stats.activeTaxReturn.currentStep} of 9
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-light-accent-primary to-light-success"
                  style={{ width: `${(stats.activeTaxReturn.currentStep / 9) * 100}%` }}
                />
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link href="/portal/tax-filing">
          <Card hover className="p-4">
            <FileText weight="fill" className="w-8 h-8 text-light-accent-primary dark:text-dark-accent-primary mb-2" />
            <div className="text-2xl font-bold">{stats.taxReturn ? '1' : '0'}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Tax Returns</div>
          </Card>
        </Link>
        <Link href="/portal/appointments">
          <Card hover className="p-4">
            <Calendar weight="fill" className="w-8 h-8 text-light-accent-primary dark:text-dark-accent-primary mb-2" />
            <div className="text-2xl font-bold">{stats.upcomingAppointments.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Upcoming</div>
          </Card>
        </Link>
        <Link href="/portal/documents">
          <Card hover className="p-4">
            <Folder weight="fill" className="w-8 h-8 text-light-accent-primary dark:text-dark-accent-primary mb-2" />
            <div className="text-2xl font-bold">{stats.documentsCount}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Documents</div>
          </Card>
        </Link>
        <Link href="/portal/messages">
          <Card hover className="p-4 relative">
            <ChatCircle weight="fill" className="w-8 h-8 text-light-accent-primary dark:text-dark-accent-primary mb-2" />
            <div className="text-2xl font-bold">{stats.unreadMessages}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Unread Messages</div>
            {stats.unreadMessages > 0 && (
              <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full" />
            )}
          </Card>
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upcoming Appointments */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Upcoming Appointments</h2>
            <Link href="/portal/appointments">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight />}>
                View All
              </Button>
            </Link>
          </div>

          {stats.upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {stats.upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg"
                >
                  <div className="text-center min-w-[60px]">
                    <div className="text-sm text-gray-500">
                      {new Date(appointment.date).toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                    <div className="text-2xl font-bold">
                      {new Date(appointment.date).getDate()}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{appointment.type}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {appointment.time}
                    </div>
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
            <div className="text-center py-8">
              <Calendar weight="thin" className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 mb-4">No upcoming appointments</p>
              <Link href="/portal/appointments">
                <Button size="sm">Book Appointment</Button>
              </Link>
            </div>
          )}
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/portal/tax-filing" className="block">
              <div className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-light-accent-primary transition-colors">
                <div className="p-3 bg-light-accent-primary/10 rounded-lg">
                  <FileText weight="fill" className="w-6 h-6 text-light-accent-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Start Tax Filing</div>
                  <div className="text-sm text-gray-500">Begin your {new Date().getFullYear()} tax return</div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </Link>

            <Link href="/portal/documents?action=upload" className="block">
              <div className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-light-accent-primary transition-colors">
                <div className="p-3 bg-light-accent-primary/10 rounded-lg">
                  <Folder weight="fill" className="w-6 h-6 text-light-accent-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Upload Documents</div>
                  <div className="text-sm text-gray-500">Add W-2s, 1099s, and more</div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </Link>

            <Link href="/portal/appointments?action=book" className="block">
              <div className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-light-accent-primary transition-colors">
                <div className="p-3 bg-light-accent-primary/10 rounded-lg">
                  <Calendar weight="fill" className="w-6 h-6 text-light-accent-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Book Appointment</div>
                  <div className="text-sm text-gray-500">Schedule a consultation</div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </Link>

            <Link href="/portal/messages" className="block">
              <div className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-light-accent-primary transition-colors">
                <div className="p-3 bg-light-accent-primary/10 rounded-lg">
                  <ChatCircle weight="fill" className="w-6 h-6 text-light-accent-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Contact Advisor</div>
                  <div className="text-sm text-gray-500">Send a message to your tax advisor</div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
