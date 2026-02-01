'use client'

import { useState, useEffect } from 'react'
import {
  ClockCounterClockwise,
  MagnifyingGlass,
  User as UserIcon,
  FileText,
  Calendar,
  SignIn,
  SignOut,
  PencilSimple,
  Trash,
  Upload,
  Download,
  Eye,
  ChatCircle,
  Envelope,
  SpinnerGap,
  FunnelSimple,
  CaretDown
} from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface ActivityLog {
  id: string
  action: string
  entityType: string | null
  entityId: string | null
  details: string | null
  ipAddress: string | null
  userAgent: string | null
  userId: string
  user: {
    name: string
    email: string
    role: string
  }
  createdAt: string
}

const actionIcons: Record<string, React.ReactNode> = {
  login: <SignIn className="w-4 h-4" />,
  logout: <SignOut className="w-4 h-4" />,
  create: <PencilSimple className="w-4 h-4" />,
  update: <PencilSimple className="w-4 h-4" />,
  delete: <Trash className="w-4 h-4" />,
  upload: <Upload className="w-4 h-4" />,
  download: <Download className="w-4 h-4" />,
  view: <Eye className="w-4 h-4" />,
  message: <ChatCircle className="w-4 h-4" />,
  email: <Envelope className="w-4 h-4" />,
}

const actionColors: Record<string, string> = {
  login: 'bg-green-100 text-green-600',
  logout: 'bg-gray-100 text-gray-600',
  create: 'bg-blue-100 text-blue-600',
  update: 'bg-yellow-100 text-yellow-600',
  delete: 'bg-red-100 text-red-600',
  upload: 'bg-purple-100 text-purple-600',
  download: 'bg-cyan-100 text-cyan-600',
  view: 'bg-gray-100 text-gray-600',
  message: 'bg-indigo-100 text-indigo-600',
  email: 'bg-pink-100 text-pink-600',
}

export default function ActivityLogPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [actionFilter, setActionFilter] = useState<string>('all')
  const [entityFilter, setEntityFilter] = useState<string>('all')
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: '',
  })
  const [showFilters, setShowFilters] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    fetchLogs()
  }, [actionFilter, entityFilter, dateRange, page])

  const fetchLogs = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '50',
      })

      if (actionFilter !== 'all') params.append('action', actionFilter)
      if (entityFilter !== 'all') params.append('entityType', entityFilter)
      if (dateRange.start) params.append('startDate', dateRange.start)
      if (dateRange.end) params.append('endDate', dateRange.end)

      const response = await fetch(`/api/admin/activity-log?${params}`)
      const data = await response.json()

      if (data.logs) {
        if (page === 1) {
          setLogs(data.logs)
        } else {
          setLogs((prev) => [...prev, ...data.logs])
        }
        setHasMore(data.logs.length === 50)
      }
    } catch (error) {
      console.error('Error fetching activity logs:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredLogs = logs.filter(
    (log) =>
      log.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.details && log.details.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const getActionIcon = (action: string) => {
    const baseAction = action.split('_')[0]
    return actionIcons[baseAction] || <ClockCounterClockwise className="w-4 h-4" />
  }

  const getActionColor = (action: string) => {
    const baseAction = action.split('_')[0]
    return actionColors[baseAction] || 'bg-gray-100 text-gray-600'
  }

  const formatAction = (log: ActivityLog) => {
    const action = log.action.replace(/_/g, ' ')
    const entity = log.entityType ? ` ${log.entityType}` : ''
    return `${action}${entity}`
  }

  const groupLogsByDate = () => {
    const groups: Record<string, ActivityLog[]> = {}
    filteredLogs.forEach((log) => {
      const date = new Date(log.createdAt).toDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(log)
    })
    return groups
  }

  const logGroups = groupLogsByDate()

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Activity Log</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track all system activities and user actions
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          leftIcon={<FunnelSimple />}
          rightIcon={<CaretDown className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />}
        >
          Filters
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card className="p-4 mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Action Type</label>
              <select
                value={actionFilter}
                onChange={(e) => {
                  setActionFilter(e.target.value)
                  setPage(1)
                }}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary"
              >
                <option value="all">All Actions</option>
                <option value="login">Login</option>
                <option value="logout">Logout</option>
                <option value="create">Create</option>
                <option value="update">Update</option>
                <option value="delete">Delete</option>
                <option value="upload">Upload</option>
                <option value="download">Download</option>
                <option value="view">View</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Entity Type</label>
              <select
                value={entityFilter}
                onChange={(e) => {
                  setEntityFilter(e.target.value)
                  setPage(1)
                }}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary"
              >
                <option value="all">All Entities</option>
                <option value="user">User</option>
                <option value="document">Document</option>
                <option value="tax_return">Tax Return</option>
                <option value="appointment">Appointment</option>
                <option value="message">Message</option>
                <option value="lead">Lead</option>
                <option value="partner">Partner</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Start Date</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => {
                  setDateRange({ ...dateRange, start: e.target.value })
                  setPage(1)
                }}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">End Date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => {
                  setDateRange({ ...dateRange, end: e.target.value })
                  setPage(1)
                }}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary"
              />
            </div>
          </div>
        </Card>
      )}

      {/* Search */}
      <Card className="p-4 mb-6">
        <Input
          placeholder="Search by user, action, or details..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftIcon={<MagnifyingGlass />}
        />
      </Card>

      {/* Activity Timeline */}
      {loading && page === 1 ? (
        <div className="flex items-center justify-center py-12">
          <SpinnerGap className="w-8 h-8 animate-spin text-light-accent-primary" />
        </div>
      ) : Object.keys(logGroups).length === 0 ? (
        <Card className="p-12 text-center">
          <ClockCounterClockwise weight="thin" className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No activity logs found</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(logGroups).map(([date, dateLogs]) => (
            <div key={date}>
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-gray-400" />
                <h3 className="font-semibold text-gray-600 dark:text-gray-400">
                  {date === new Date().toDateString()
                    ? 'Today'
                    : date === new Date(Date.now() - 86400000).toDateString()
                    ? 'Yesterday'
                    : date}
                </h3>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              </div>

              <Card className="overflow-hidden">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {dateLogs.map((log) => (
                    <div key={log.id} className="p-4 hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${getActionColor(log.action)}`}>
                          {getActionIcon(log.action)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{log.user.name}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-500">{log.user.email}</span>
                            <span
                              className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                log.user.role === 'admin'
                                  ? 'bg-purple-100 text-purple-800'
                                  : log.user.role === 'advisor'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {log.user.role}
                            </span>
                          </div>
                          <p className="text-sm capitalize">{formatAction(log)}</p>
                          {log.details && (
                            <p className="text-sm text-gray-500 mt-1">{log.details}</p>
                          )}
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                            <span>{new Date(log.createdAt).toLocaleTimeString()}</span>
                            {log.ipAddress && <span>IP: {log.ipAddress}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ))}

          {hasMore && (
            <div className="flex justify-center pt-4">
              <Button
                variant="outline"
                onClick={() => setPage((p) => p + 1)}
                disabled={loading}
              >
                {loading ? (
                  <SpinnerGap className="w-4 h-4 animate-spin" />
                ) : (
                  'Load More'
                )}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
