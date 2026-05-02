'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Calendar,
  CalendarBlank,
  CaretLeft,
  CaretRight,
  Check,
  Clock,
  EnvelopeSimple,
  MagnifyingGlass,
  MapPin,
  PencilSimple,
  Phone,
  Plus,
  SpinnerGap,
  User,
  Warning,
  X,
} from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface Appointment {
  id: string
  date: string
  time: string
  duration: number
  type: string
  status: string
  notes: string | null
  location: string | null
  client: {
    id: string
    name: string | null
    email: string
    phone: string | null
  }
  advisor: {
    id: string
    name: string | null
    email: string
  } | null
}

interface Advisor {
  id: string
  name: string | null
  email: string
}

type CalendarMode = 'today' | 'week' | 'month'

const serviceTypes = [
  { value: 'tax-preparation', label: 'Tax Preparation', duration: 60 },
  { value: 'tax-planning', label: 'Tax Planning Consultation', duration: 45 },
  { value: 'business-tax', label: 'Business Tax Services', duration: 60 },
  { value: 'bookkeeping', label: 'Bookkeeping Consultation', duration: 30 },
  { value: 'general', label: 'General Consultation', duration: 30 },
  { value: 'document-review', label: 'Document Review', duration: 30 },
]

const timeSlots = [
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
  '5:00 PM',
]

const statusColors: Record<string, string> = {
  scheduled: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  confirmed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
}

const modeLabels: Record<CalendarMode, string> = {
  today: 'Today',
  week: 'Week',
  month: 'Month',
}

function parseDateOnly(date: string) {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(year, month - 1, day, 12)
}

function toDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function startOfWeek(date: Date) {
  const start = new Date(date)
  start.setHours(12, 0, 0, 0)
  start.setDate(start.getDate() - start.getDay())
  return start
}

function addDays(date: Date, days: number) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

function getVisibleDays(date: Date, mode: CalendarMode) {
  if (mode === 'today') return [new Date(date)]

  if (mode === 'week') {
    const start = startOfWeek(date)
    return Array.from({ length: 7 }, (_, index) => addDays(start, index))
  }

  const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1, 12)
  const gridStart = startOfWeek(firstOfMonth)
  return Array.from({ length: 42 }, (_, index) => addDays(gridStart, index))
}

function getServiceLabel(type: string) {
  return serviceTypes.find((service) => service.value === type)?.label || type
}

function parseTimeToMinutes(time: string) {
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!match) return 0
  let hours = Number(match[1])
  const minutes = Number(match[2])
  const period = match[3].toUpperCase()
  if (period === 'PM' && hours !== 12) hours += 12
  if (period === 'AM' && hours === 12) hours = 0
  return hours * 60 + minutes
}

function sameTimeSlot(left: string, right: string) {
  return parseTimeToMinutes(left) === parseTimeToMinutes(right)
}

function formatMinutes(totalMinutes: number) {
  const hours24 = Math.floor(totalMinutes / 60) % 24
  const minutes = totalMinutes % 60
  const period = hours24 >= 12 ? 'PM' : 'AM'
  const hours12 = hours24 % 12 || 12
  return `${hours12}:${String(minutes).padStart(2, '0')} ${period}`
}

function getEndTime(time: string, duration: number) {
  return formatMinutes(parseTimeToMinutes(time) + duration)
}

function formatDisplayDate(date: string | Date, options?: Intl.DateTimeFormatOptions) {
  const value = typeof date === 'string' ? parseDateOnly(date) : date
  return value.toLocaleDateString('en-US', options || { month: 'short', day: 'numeric', year: 'numeric' })
}

function escapeIcs(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
}

function buildAppointmentDate(date: string, time: string) {
  const dateValue = parseDateOnly(date)
  const minutes = parseTimeToMinutes(time)
  dateValue.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0)
  return dateValue
}

function formatICSDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [advisors, setAdvisors] = useState<Advisor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [advisorFilter, setAdvisorFilter] = useState('all')
  const [calendarMode, setCalendarMode] = useState<CalendarMode>('week')
  const [calendarDate, setCalendarDate] = useState(new Date())
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    scheduled: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  })

  useEffect(() => {
    fetchAdvisors()
  }, [])

  useEffect(() => {
    fetchAppointments()
  }, [statusFilter, dateFilter, advisorFilter])

  const visibleDays = useMemo(
    () => getVisibleDays(calendarDate, calendarMode),
    [calendarDate, calendarMode]
  )

  const calendarAppointments = useMemo(() => {
    const visibleKeys = new Set(visibleDays.map(toDateKey))
    return appointments
      .filter((appointment) => visibleKeys.has(appointment.date))
      .sort((a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time))
  }, [appointments, visibleDays])

  const visibleRangeLabel = useMemo(() => {
    if (calendarMode === 'today') {
      return formatDisplayDate(calendarDate, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    }

    if (calendarMode === 'week') {
      const start = visibleDays[0]
      const end = visibleDays[6]
      return `${formatDisplayDate(start, { month: 'short', day: 'numeric' })} - ${formatDisplayDate(end, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })}`
    }

    return calendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }, [calendarDate, calendarMode, visibleDays])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      setError('')

      const params = new URLSearchParams()
      params.set('limit', '1000')
      params.set('_t', Date.now().toString())
      if (statusFilter !== 'all') params.set('status', statusFilter)
      if (dateFilter !== 'all') params.set('dateRange', dateFilter)
      if (advisorFilter !== 'all') params.set('advisorId', advisorFilter)
      if (searchTerm.trim()) params.set('search', searchTerm.trim())

      const response = await fetch(`/api/admin/appointments?${params}`, { cache: 'no-store' })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch appointments')
      }

      setAppointments(data.appointments || [])
      setStats(data.stats || stats)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch appointments')
      setAppointments([])
    } finally {
      setLoading(false)
    }
  }

  const fetchAdvisors = async () => {
    try {
      const response = await fetch('/api/admin/users?role=advisor', { cache: 'no-store' })
      const data = await response.json()
      setAdvisors(data.users || [])
    } catch (error) {
      console.error('Error fetching advisors:', error)
    }
  }

  const navigateCalendar = (direction: 'previous' | 'next') => {
    const amount = direction === 'next' ? 1 : -1
    const next = new Date(calendarDate)

    if (calendarMode === 'today') next.setDate(next.getDate() + amount)
    if (calendarMode === 'week') next.setDate(next.getDate() + amount * 7)
    if (calendarMode === 'month') next.setMonth(next.getMonth() + amount)

    setCalendarDate(next)
  }

  const handleSearch = () => {
    fetchAppointments()
  }

  const updateAppointment = async (id: string, payload: Record<string, unknown>) => {
    setActionLoading(id)
    setError('')

    try {
      const response = await fetch(`/api/admin/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update appointment')
      }

      await fetchAppointments()
      setSelectedAppointment(null)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update appointment')
    } finally {
      setActionLoading(null)
    }
  }

  const confirmAppointment = async (id: string) => {
    setActionLoading(id)
    setError('')

    try {
      const response = await fetch('/api/admin/appointments/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to confirm appointment')
      }

      await fetchAppointments()
      setSelectedAppointment(null)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to confirm appointment')
    } finally {
      setActionLoading(null)
    }
  }

  const cancelAppointment = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return
    await updateAppointment(id, { status: 'cancelled' })
  }

  const downloadICS = (appointment: Appointment) => {
    const startDate = buildAppointmentDate(appointment.date, appointment.time)
    const endDate = new Date(startDate.getTime() + appointment.duration * 60 * 1000)
    const clientName = appointment.client.name || appointment.client.email
    const service = getServiceLabel(appointment.type)

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//BestUSTax//Admin Appointment//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${appointment.id}@bestustax.com
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:${escapeIcs(`${service} - ${clientName}`)}
DESCRIPTION:${escapeIcs(`Client: ${clientName}\nEmail: ${appointment.client.email}${appointment.client.phone ? `\nPhone: ${appointment.client.phone}` : ''}${appointment.notes ? `\n\nNotes: ${appointment.notes}` : ''}`)}
LOCATION:${escapeIcs(appointment.location || 'Virtual / Remote Consultation')}
STATUS:${appointment.status === 'cancelled' ? 'CANCELLED' : 'CONFIRMED'}
END:VEVENT
END:VCALENDAR`

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `bestustax-appointment-${appointment.date}-${appointment.id}.ics`
    link.click()
    URL.revokeObjectURL(url)
  }

  const getAppointmentsForDay = (day: Date) => {
    const key = toDateKey(day)
    return calendarAppointments.filter((appointment) => appointment.date === key)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Calendar, client requests, advisor assignments, and appointment actions.
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} leftIcon={<Plus weight="bold" />} glow>
          Create Appointment
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
          <Warning className="h-5 w-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-6">
        <StatBox label="Total" value={stats.total} />
        <StatBox label="Upcoming" value={stats.upcoming} tone="text-amber-600 dark:text-amber-300" />
        <StatBox label="Scheduled" value={stats.scheduled} tone="text-orange-600 dark:text-orange-300" />
        <StatBox label="Confirmed" value={stats.confirmed} tone="text-emerald-600 dark:text-emerald-300" />
        <StatBox label="Completed" value={stats.completed} tone="text-blue-600 dark:text-blue-300" />
        <StatBox label="Cancelled" value={stats.cancelled} tone="text-red-600 dark:text-red-300" />
      </div>

      <Card className="p-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_170px_170px_190px_auto]">
          <Input
            placeholder="Search client, email, phone, service, or notes..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleSearch()
            }}
            leftIcon={<MagnifyingGlass />}
          />

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 dark:border-gray-700 dark:bg-dark-bg-secondary dark:text-gray-100"
          >
            <option value="all">All statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={dateFilter}
            onChange={(event) => setDateFilter(event.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 dark:border-gray-700 dark:bg-dark-bg-secondary dark:text-gray-100"
          >
            <option value="all">All dates</option>
            <option value="today">Today</option>
            <option value="week">This week</option>
            <option value="month">This month</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>

          <select
            value={advisorFilter}
            onChange={(event) => setAdvisorFilter(event.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 dark:border-gray-700 dark:bg-dark-bg-secondary dark:text-gray-100"
          >
            <option value="all">All advisors</option>
            <option value="unassigned">Unassigned</option>
            {advisors.map((advisor) => (
              <option key={advisor.id} value={advisor.id}>
                {advisor.name || advisor.email}
              </option>
            ))}
          </select>

          <Button onClick={handleSearch} leftIcon={<MagnifyingGlass />}>
            Search
          </Button>
        </div>
      </Card>

      <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="overflow-hidden">
          <div className="border-b border-gray-200 p-4 dark:border-gray-800">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-light-accent-primary dark:text-dark-accent-primary">
                  <Calendar className="h-4 w-4" />
                  Admin Calendar
                </div>
                <h2 className="mt-1 text-xl font-semibold">{visibleRangeLabel}</h2>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1 dark:border-gray-800 dark:bg-dark-bg-tertiary">
                  {(Object.keys(modeLabels) as CalendarMode[]).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setCalendarMode(mode)}
                      className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                        calendarMode === mode
                          ? 'bg-white text-light-accent-primary shadow-sm dark:bg-dark-bg-secondary dark:text-dark-accent-primary'
                          : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                      }`}
                    >
                      {modeLabels[mode]}
                    </button>
                  ))}
                </div>

                <Button size="sm" variant="outline" onClick={() => navigateCalendar('previous')}>
                  <CaretLeft className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => setCalendarDate(new Date())}>
                  Today
                </Button>
                <Button size="sm" variant="outline" onClick={() => navigateCalendar('next')}>
                  <CaretRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-[420px] items-center justify-center">
              <SpinnerGap className="h-8 w-8 animate-spin text-light-accent-primary" />
            </div>
          ) : calendarMode === 'today' ? (
            <TodayCalendar
              day={visibleDays[0]}
              appointments={calendarAppointments}
              onOpen={setSelectedAppointment}
            />
          ) : calendarMode === 'week' ? (
            <WeekCalendar
              days={visibleDays}
              appointmentsForDay={getAppointmentsForDay}
              onOpen={setSelectedAppointment}
            />
          ) : (
            <MonthCalendar
              days={visibleDays}
              activeMonth={calendarDate.getMonth()}
              appointmentsForDay={getAppointmentsForDay}
              onOpen={setSelectedAppointment}
            />
          )}
        </Card>

        <Card className="overflow-hidden">
          <div className="border-b border-gray-200 p-4 dark:border-gray-800">
            <h2 className="text-lg font-semibold">Appointments in View</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {calendarAppointments.length} appointment{calendarAppointments.length === 1 ? '' : 's'}
            </p>
          </div>

          <div className="max-h-[720px] overflow-y-auto p-4">
            {calendarAppointments.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                No appointments for this calendar view.
              </div>
            ) : (
              <div className="space-y-3">
                {calendarAppointments.map((appointment) => (
                  <AppointmentListItem
                    key={appointment.id}
                    appointment={appointment}
                    onOpen={() => setSelectedAppointment(appointment)}
                    onConfirm={() => confirmAppointment(appointment.id)}
                    onDownload={() => downloadICS(appointment)}
                    actionLoading={actionLoading}
                  />
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="border-b border-gray-200 p-4 dark:border-gray-800">
          <h2 className="text-lg font-semibold">All Loaded Appointments</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Use this table when you need a full audit-style view.
          </p>
        </div>

        {appointments.length === 0 ? (
          <div className="p-10 text-center text-gray-500">No appointments found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-bg-tertiary">
                <tr>
                  <TableHead>Client</TableHead>
                  <TableHead>Date and Time</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Advisor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead align="right">Actions</TableHead>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                    <td className="px-6 py-4">
                      <div className="font-medium">{appointment.client.name || 'N/A'}</div>
                      <div className="text-sm text-gray-500">{appointment.client.email}</div>
                      {appointment.client.phone && (
                        <div className="text-xs text-gray-500">{appointment.client.phone}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{formatDisplayDate(appointment.date)}</div>
                      <div className="text-sm text-gray-500">
                        {appointment.time} - {getEndTime(appointment.time, appointment.duration)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getServiceLabel(appointment.type)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {appointment.advisor?.name || appointment.advisor?.email || (
                        <span className="text-gray-500">Unassigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={appointment.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {appointment.status === 'scheduled' && (
                          <Button
                            size="sm"
                            onClick={() => confirmAppointment(appointment.id)}
                            disabled={actionLoading === appointment.id}
                          >
                            {actionLoading === appointment.id ? (
                              <SpinnerGap className="h-4 w-4 animate-spin" />
                            ) : (
                              <Check className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                        <Button size="sm" variant="outline" onClick={() => setSelectedAppointment(appointment)}>
                          <PencilSimple className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => downloadICS(appointment)}>
                          <CalendarBlank className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {showCreateModal && (
        <CreateAppointmentModal
          advisors={advisors}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false)
            fetchAppointments()
          }}
        />
      )}

      {selectedAppointment && (
        <ManageAppointmentModal
          appointment={selectedAppointment}
          advisors={advisors}
          actionLoading={actionLoading}
          onClose={() => setSelectedAppointment(null)}
          onSave={updateAppointment}
          onConfirm={confirmAppointment}
          onComplete={(id) => updateAppointment(id, { status: 'completed' })}
          onCancel={cancelAppointment}
          onDownload={downloadICS}
        />
      )}
    </div>
  )
}

function StatBox({ label, value, tone = 'text-gray-900 dark:text-gray-100' }: { label: string; value: number; tone?: string }) {
  return (
    <Card className="p-4">
      <div className={`text-2xl font-bold ${tone}`}>{value}</div>
      <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{label}</div>
    </Card>
  )
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusColors[status] || statusColors.scheduled}`}>
      {status}
    </span>
  )
}

function TableHead({ children, align = 'left' }: { children: React.ReactNode; align?: 'left' | 'right' }) {
  return (
    <th
      className={`px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 ${
        align === 'right' ? 'text-right' : 'text-left'
      }`}
    >
      {children}
    </th>
  )
}

function MiniAppointment({ appointment, onOpen }: { appointment: Appointment; onOpen: () => void }) {
  const clientName = appointment.client.name || appointment.client.email

  return (
    <button
      type="button"
      onClick={onOpen}
      className="block w-full rounded-md border border-gray-200 bg-white p-2 text-left text-xs shadow-sm transition hover:border-light-accent-primary hover:bg-light-bg-secondary dark:border-gray-700 dark:bg-dark-bg-secondary dark:hover:border-dark-accent-primary dark:hover:bg-dark-bg-tertiary"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-semibold">{appointment.time}</span>
        <StatusBadge status={appointment.status} />
      </div>
      <div className="mt-1 truncate font-medium">{clientName}</div>
      <div className="truncate text-gray-500">{getServiceLabel(appointment.type)}</div>
    </button>
  )
}

function TodayCalendar({
  day,
  appointments,
  onOpen,
}: {
  day: Date
  appointments: Appointment[]
  onOpen: (appointment: Appointment) => void
}) {
  return (
    <div className="p-4">
      <div className="mb-4 text-sm font-medium text-gray-600 dark:text-gray-400">
        {formatDisplayDate(day, { weekday: 'long', month: 'long', day: 'numeric' })}
      </div>
      <div className="space-y-2">
        {timeSlots.map((slot) => {
          const slotAppointments = appointments.filter((appointment) => sameTimeSlot(appointment.time, slot))
          return (
            <div key={slot} className="grid min-h-[74px] grid-cols-[88px_1fr] gap-3 border-t border-gray-100 py-3 dark:border-gray-800">
              <div className="text-sm font-medium text-gray-500">{slot}</div>
              <div className="space-y-2">
                {slotAppointments.length === 0 ? (
                  <div className="h-full rounded-lg border border-dashed border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-dark-bg-tertiary" />
                ) : (
                  slotAppointments.map((appointment) => (
                    <MiniAppointment key={appointment.id} appointment={appointment} onOpen={() => onOpen(appointment)} />
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function WeekCalendar({
  days,
  appointmentsForDay,
  onOpen,
}: {
  days: Date[]
  appointmentsForDay: (day: Date) => Appointment[]
  onOpen: (appointment: Appointment) => void
}) {
  const todayKey = toDateKey(new Date())

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[980px]">
        <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-800">
          {days.map((day) => {
            const dayKey = toDateKey(day)
            return (
              <div key={dayKey} className={`p-3 text-center ${dayKey === todayKey ? 'bg-light-accent-primary/5 dark:bg-dark-accent-primary/10' : ''}`}>
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className={`mt-1 text-xl font-bold ${dayKey === todayKey ? 'text-light-accent-primary dark:text-dark-accent-primary' : ''}`}>
                  {day.getDate()}
                </div>
              </div>
            )
          })}
        </div>
        <div className="grid grid-cols-7">
          {days.map((day) => {
            const appointments = appointmentsForDay(day)
            const dayKey = toDateKey(day)
            return (
              <div key={dayKey} className="min-h-[520px] border-r border-gray-100 p-3 last:border-r-0 dark:border-gray-800">
                {appointments.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-gray-200 p-4 text-center text-xs text-gray-500 dark:border-gray-800">
                    Open
                  </div>
                ) : (
                  <div className="space-y-2">
                    {appointments.map((appointment) => (
                      <MiniAppointment key={appointment.id} appointment={appointment} onOpen={() => onOpen(appointment)} />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function MonthCalendar({
  days,
  activeMonth,
  appointmentsForDay,
  onOpen,
}: {
  days: Date[]
  activeMonth: number
  appointmentsForDay: (day: Date) => Appointment[]
  onOpen: (appointment: Appointment) => void
}) {
  const todayKey = toDateKey(new Date())

  return (
    <div>
      <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-dark-bg-tertiary">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="p-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day) => {
          const dayKey = toDateKey(day)
          const appointments = appointmentsForDay(day)
          const muted = day.getMonth() !== activeMonth
          return (
            <div
              key={dayKey}
              className={`min-h-[132px] border-r border-t border-gray-100 p-2 last:border-r-0 dark:border-gray-800 ${
                muted ? 'bg-gray-50/70 text-gray-400 dark:bg-dark-bg-tertiary/50' : ''
              }`}
            >
              <div
                className={`mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${
                  dayKey === todayKey ? 'bg-light-accent-primary text-white dark:bg-dark-accent-primary' : ''
                }`}
              >
                {day.getDate()}
              </div>
              <div className="space-y-1">
                {appointments.slice(0, 3).map((appointment) => (
                  <button
                    key={appointment.id}
                    type="button"
                    onClick={() => onOpen(appointment)}
                    className="block w-full truncate rounded bg-light-accent-primary/10 px-2 py-1 text-left text-xs font-medium text-light-accent-primary hover:bg-light-accent-primary/20 dark:bg-dark-accent-primary/15 dark:text-dark-accent-primary"
                  >
                    {appointment.time} {appointment.client.name || appointment.client.email}
                  </button>
                ))}
                {appointments.length > 3 && (
                  <div className="px-2 text-xs text-gray-500">+{appointments.length - 3} more</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function AppointmentListItem({
  appointment,
  onOpen,
  onConfirm,
  onDownload,
  actionLoading,
}: {
  appointment: Appointment
  onOpen: () => void
  onConfirm: () => void
  onDownload: () => void
  actionLoading: string | null
}) {
  return (
    <div className="rounded-lg border border-gray-200 p-3 dark:border-gray-800">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate font-semibold">{appointment.client.name || appointment.client.email}</div>
          <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            {formatDisplayDate(appointment.date, { month: 'short', day: 'numeric' })}, {appointment.time}
          </div>
        </div>
        <StatusBadge status={appointment.status} />
      </div>
      <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">{getServiceLabel(appointment.type)}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        {appointment.status === 'scheduled' && (
          <Button size="sm" onClick={onConfirm} disabled={actionLoading === appointment.id}>
            Confirm
          </Button>
        )}
        <Button size="sm" variant="outline" onClick={onOpen}>
          Manage
        </Button>
        <Button size="sm" variant="ghost" onClick={onDownload}>
          ICS
        </Button>
      </div>
    </div>
  )
}

function ManageAppointmentModal({
  appointment,
  advisors,
  actionLoading,
  onClose,
  onSave,
  onConfirm,
  onComplete,
  onCancel,
  onDownload,
}: {
  appointment: Appointment
  advisors: Advisor[]
  actionLoading: string | null
  onClose: () => void
  onSave: (id: string, payload: Record<string, unknown>) => void
  onConfirm: (id: string) => void
  onComplete: (id: string) => void
  onCancel: (id: string) => void
  onDownload: (appointment: Appointment) => void
}) {
  const [formData, setFormData] = useState({
    date: appointment.date,
    time: appointment.time,
    duration: appointment.duration,
    type: appointment.type,
    status: appointment.status,
    location: appointment.location || 'Virtual / Remote Consultation',
    advisorId: appointment.advisor?.id || '',
    notes: appointment.notes || '',
  })

  const isSaving = actionLoading === appointment.id

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <Card className="max-h-[92vh] w-full max-w-3xl overflow-y-auto">
        <div className="flex items-start justify-between gap-4 border-b border-gray-200 bg-light-accent-primary p-5 text-white dark:border-gray-800 dark:bg-dark-accent-primary">
          <div>
            <h2 className="text-xl font-bold">Manage Appointment</h2>
            <p className="text-sm text-white/80">{appointment.client.name || appointment.client.email}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-white/15">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 p-5">
          <div className="grid gap-3 md:grid-cols-3">
            <InfoLine icon={<User />} label="Client" value={appointment.client.name || 'N/A'} />
            <InfoLine icon={<EnvelopeSimple />} label="Email" value={appointment.client.email} />
            <InfoLine icon={<Phone />} label="Phone" value={appointment.client.phone || 'N/A'} />
          </div>

          <form
            className="grid gap-4 md:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault()
              onSave(appointment.id, {
                date: formData.date,
                time: formData.time,
                duration: formData.duration,
                type: formData.type,
                status: formData.status,
                location: formData.location,
                advisorId: formData.advisorId,
                notes: formData.notes,
              })
            }}
          >
            <Input
              label="Date"
              type="date"
              value={formData.date}
              onChange={(event) => setFormData({ ...formData, date: event.target.value })}
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Time</label>
              <select
                value={formData.time}
                onChange={(event) => setFormData({ ...formData, time: event.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 dark:border-gray-700 dark:bg-dark-bg-secondary dark:text-gray-100"
              >
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Service</label>
              <select
                value={formData.type}
                onChange={(event) => {
                  const service = serviceTypes.find((item) => item.value === event.target.value)
                  setFormData({ ...formData, type: event.target.value, duration: service?.duration || formData.duration })
                }}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 dark:border-gray-700 dark:bg-dark-bg-secondary dark:text-gray-100"
              >
                {serviceTypes.map((service) => (
                  <option key={service.value} value={service.value}>
                    {service.label}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Duration"
              type="number"
              min={15}
              step={15}
              value={formData.duration}
              onChange={(event) => setFormData({ ...formData, duration: Number(event.target.value) })}
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
              <select
                value={formData.status}
                onChange={(event) => setFormData({ ...formData, status: event.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 dark:border-gray-700 dark:bg-dark-bg-secondary dark:text-gray-100"
              >
                <option value="scheduled">Scheduled</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Advisor</label>
              <select
                value={formData.advisorId}
                onChange={(event) => setFormData({ ...formData, advisorId: event.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 dark:border-gray-700 dark:bg-dark-bg-secondary dark:text-gray-100"
              >
                <option value="">Unassigned</option>
                {advisors.map((advisor) => (
                  <option key={advisor.id} value={advisor.id}>
                    {advisor.name || advisor.email}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <Input
                label="Location"
                value={formData.location}
                onChange={(event) => setFormData({ ...formData, location: event.target.value })}
                leftIcon={<MapPin />}
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(event) => setFormData({ ...formData, notes: event.target.value })}
                rows={4}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:border-gray-700 dark:bg-dark-bg-secondary dark:text-gray-100 dark:focus:ring-dark-accent-primary"
              />
            </div>

            <div className="flex flex-wrap gap-2 md:col-span-2">
              <Button type="submit" disabled={isSaving} leftIcon={isSaving ? <SpinnerGap className="animate-spin" /> : <Check />}>
                Save Changes
              </Button>
              {appointment.status === 'scheduled' && (
                <Button type="button" variant="outline" onClick={() => onConfirm(appointment.id)} disabled={isSaving}>
                  Confirm
                </Button>
              )}
              {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                <Button type="button" variant="outline" onClick={() => onComplete(appointment.id)} disabled={isSaving}>
                  Complete
                </Button>
              )}
              <Button type="button" variant="ghost" onClick={() => onDownload(appointment)}>
                Download ICS
              </Button>
              {appointment.status !== 'cancelled' && (
                <Button type="button" variant="danger" onClick={() => onCancel(appointment.id)} disabled={isSaving}>
                  Cancel Appointment
                </Button>
              )}
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}

function InfoLine({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-200 p-3 dark:border-gray-800">
      <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
        <span className="text-light-accent-primary dark:text-dark-accent-primary">{icon}</span>
        {label}
      </div>
      <div className="truncate text-sm font-medium">{value}</div>
    </div>
  )
}

function CreateAppointmentModal({
  advisors,
  onClose,
  onSuccess,
}: {
  advisors: Advisor[]
  onClose: () => void
  onSuccess: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [clients, setClients] = useState<any[]>([])
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    type: 'tax-preparation',
    date: '',
    time: '',
    duration: 60,
    advisorId: '',
    location: 'Virtual / Remote Consultation',
    notes: '',
  })

  const searchClients = async () => {
    if (!searchQuery.trim()) return
    const response = await fetch(`/api/admin/users?search=${encodeURIComponent(searchQuery.trim())}&role=client`, {
      cache: 'no-store',
    })
    const data = await response.json()
    setClients(data.users || [])
  }

  const fetchBookedSlots = async (date: string, advisorId = formData.advisorId) => {
    if (!date) return
    const params = new URLSearchParams({ date })
    if (advisorId) params.set('advisorId', advisorId)
    const response = await fetch(`/api/admin/appointments/availability?${params}`, { cache: 'no-store' })
    const data = await response.json()
    setBookedSlots(data.bookedSlots || [])
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/appointments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: selectedClient?.id || null,
          ...formData,
        }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create appointment')
      }

      onSuccess()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create appointment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <Card className="max-h-[92vh] w-full max-w-3xl overflow-y-auto">
        <div className="flex items-start justify-between gap-4 border-b border-gray-200 p-5 dark:border-gray-800">
          <div>
            <h2 className="text-xl font-bold">Create Appointment</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Search an existing client or create the appointment from client details.
            </p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form className="space-y-6 p-5" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
              {error}
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Find Client</label>
            <div className="flex gap-2">
              <Input
                placeholder="Search by name, email, or phone"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    searchClients()
                  }
                }}
              />
              <Button type="button" onClick={searchClients}>
                Search
              </Button>
            </div>
            {clients.length > 0 && (
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                {clients.map((client) => (
                  <button
                    key={client.id}
                    type="button"
                    onClick={() => {
                      setSelectedClient(client)
                      setFormData({
                        ...formData,
                        clientName: client.name || '',
                        clientEmail: client.email,
                        clientPhone: client.phone || '',
                      })
                    }}
                    className={`rounded-lg border p-3 text-left transition ${
                      selectedClient?.id === client.id
                        ? 'border-light-accent-primary bg-light-accent-primary/10 dark:border-dark-accent-primary dark:bg-dark-accent-primary/10'
                        : 'border-gray-200 hover:border-light-accent-primary dark:border-gray-800 dark:hover:border-dark-accent-primary'
                    }`}
                  >
                    <div className="font-medium">{client.name || client.email}</div>
                    <div className="text-sm text-gray-500">{client.email}</div>
                    {client.phone && <div className="text-xs text-gray-500">{client.phone}</div>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Client Name"
              value={formData.clientName}
              onChange={(event) => setFormData({ ...formData, clientName: event.target.value })}
              placeholder="Client name"
            />
            <Input
              label="Client Email"
              type="email"
              value={formData.clientEmail}
              onChange={(event) => setFormData({ ...formData, clientEmail: event.target.value })}
              placeholder="client@example.com"
              required
            />
            <Input
              label="Client Phone"
              value={formData.clientPhone}
              onChange={(event) => setFormData({ ...formData, clientPhone: event.target.value })}
              placeholder="(413) 000-0000"
            />
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Service</label>
              <select
                value={formData.type}
                onChange={(event) => {
                  const service = serviceTypes.find((item) => item.value === event.target.value)
                  setFormData({
                    ...formData,
                    type: event.target.value,
                    duration: service?.duration || formData.duration,
                  })
                }}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 dark:border-gray-700 dark:bg-dark-bg-secondary dark:text-gray-100"
              >
                {serviceTypes.map((service) => (
                  <option key={service.value} value={service.value}>
                    {service.label}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Date"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={formData.date}
              onChange={(event) => {
                setFormData({ ...formData, date: event.target.value, time: '' })
                fetchBookedSlots(event.target.value)
              }}
              required
            />
            <Input
              label="Duration"
              type="number"
              min={15}
              step={15}
              value={formData.duration}
              onChange={(event) => setFormData({ ...formData, duration: Number(event.target.value) })}
            />
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Advisor</label>
              <select
                value={formData.advisorId}
                onChange={(event) => {
                  setFormData({ ...formData, advisorId: event.target.value, time: '' })
                  if (formData.date) fetchBookedSlots(formData.date, event.target.value)
                }}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 dark:border-gray-700 dark:bg-dark-bg-secondary dark:text-gray-100"
              >
                <option value="">Unassigned</option>
                {advisors.map((advisor) => (
                  <option key={advisor.id} value={advisor.id}>
                    {advisor.name || advisor.email}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Location"
              value={formData.location}
              onChange={(event) => setFormData({ ...formData, location: event.target.value })}
            />
          </div>

          {formData.date && (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Time</label>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                {timeSlots.map((time) => {
                  const booked = bookedSlots.some((slot) => sameTimeSlot(slot, time))
                  return (
                    <button
                      key={time}
                      type="button"
                      disabled={booked}
                      onClick={() => setFormData({ ...formData, time })}
                      className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                        formData.time === time
                          ? 'border-light-accent-primary bg-light-accent-primary text-white dark:border-dark-accent-primary dark:bg-dark-accent-primary'
                          : booked
                          ? 'cursor-not-allowed border-red-200 bg-red-50 text-red-400 line-through dark:border-red-900/60 dark:bg-red-950/30'
                          : 'border-gray-200 hover:border-light-accent-primary dark:border-gray-800 dark:hover:border-dark-accent-primary'
                      }`}
                    >
                      {time}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(event) => setFormData({ ...formData, notes: event.target.value })}
              rows={3}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:border-gray-700 dark:bg-dark-bg-secondary dark:text-gray-100 dark:focus:ring-dark-accent-primary"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.clientEmail || !formData.date || !formData.time}
              leftIcon={loading ? <SpinnerGap className="animate-spin" /> : <Plus />}
            >
              {loading ? 'Creating...' : 'Create Appointment'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
