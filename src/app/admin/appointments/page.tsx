'use client'

import { useState, useEffect } from 'react'
import { Calendar, MagnifyingGlass, Plus, Check, X, CalendarBlank, CaretDown, SpinnerGap } from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface Appointment {
  id: string
  date: string
  time: string
  type: string
  status: string
  notes: string | null
  client: {
    id: string
    name: string | null
    email: string
    phone: string | null
  }
  advisor: {
    name: string | null
  } | null
}

const statusColors: Record<string, string> = {
  scheduled: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  confirmed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
}

const serviceTypes = [
  { value: 'tax-preparation', label: 'Tax Preparation', duration: 60 },
  { value: 'tax-planning', label: 'Tax Planning Consultation', duration: 45 },
  { value: 'business-tax', label: 'Business Tax Services', duration: 60 },
  { value: 'bookkeeping', label: 'Bookkeeping Consultation', duration: 30 },
  { value: 'general', label: 'General Consultation', duration: 30 },
  { value: 'document-review', label: 'Document Review', duration: 30 },
]

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM',
]

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    confirmed: 0,
    cancelled: 0,
  })

  useEffect(() => {
    fetchAppointments()
  }, [statusFilter, dateFilter])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.append('status', statusFilter)
      if (dateFilter !== 'all') params.append('dateRange', dateFilter)

      const response = await fetch(`/api/admin/appointments?${params}`)
      const data = await response.json()

      if (data.appointments) {
        setAppointments(data.appointments)
        setStats(data.stats || stats)
      }
    } catch (error) {
      console.error('Error fetching appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleConfirm = async (id: string) => {
    setActionLoading(id)
    try {
      const response = await fetch('/api/admin/appointments/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        fetchAppointments()
      }
    } catch (error) {
      console.error('Error confirming appointment:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const handleComplete = async (id: string) => {
    setActionLoading(id)
    try {
      const response = await fetch(`/api/admin/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'completed' }),
      })

      if (response.ok) {
        fetchAppointments()
      }
    } catch (error) {
      console.error('Error completing appointment:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const handleCancel = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return

    setActionLoading(id)
    try {
      const response = await fetch(`/api/admin/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' }),
      })

      if (response.ok) {
        fetchAppointments()
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const downloadICS = (appointment: Appointment) => {
    const startDate = new Date(`${appointment.date}T${convertTo24Hour(appointment.time)}`)
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // 1 hour

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//BestUsTax//Appointment//EN
METHOD:REQUEST
BEGIN:VEVENT
UID:${appointment.id}@bestustax.com
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:${appointment.type} - ${appointment.client.name || appointment.client.email}
DESCRIPTION:Tax appointment with ${appointment.client.name || appointment.client.email}
LOCATION:BestUsTax Office, 123 Tax Street, Austin, TX 78701
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`

    const blob = new Blob([icsContent], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `appointment-${appointment.id}.ics`
    link.click()
    URL.revokeObjectURL(url)
  }

  const formatICSDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }

  const convertTo24Hour = (time: string) => {
    const [timePart, period] = time.split(' ')
    let [hours, minutes] = timePart.split(':').map(Number)
    if (period === 'PM' && hours !== 12) hours += 12
    if (period === 'AM' && hours === 12) hours = 0
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  }

  const filteredAppointments = appointments.filter((apt) =>
    apt.client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.client.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Appointments</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage all client appointments
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} leftIcon={<Plus weight="bold" />} glow>
          Create Appointment
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{stats.upcoming}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Upcoming</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Confirmed</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Cancelled</div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by client name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<MagnifyingGlass />}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary"
          >
            <option value="all">All Statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </Card>

      {/* Appointments Table */}
      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <SpinnerGap className="w-8 h-8 animate-spin text-light-accent-primary" />
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No appointments found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-bg-tertiary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{appointment.client.name || 'N/A'}</div>
                      <div className="text-sm text-gray-500">{appointment.client.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">
                        {new Date(appointment.date).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">{appointment.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">{appointment.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[appointment.status]}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        {appointment.status === 'scheduled' && (
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => handleConfirm(appointment.id)}
                            disabled={actionLoading === appointment.id}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            {actionLoading === appointment.id ? (
                              <SpinnerGap className="w-4 h-4 animate-spin" />
                            ) : (
                              <Check weight="bold" className="w-4 h-4" />
                            )}
                          </Button>
                        )}
                        {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleComplete(appointment.id)}
                              disabled={actionLoading === appointment.id}
                            >
                              Complete
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleCancel(appointment.id)}
                              disabled={actionLoading === appointment.id}
                              className="text-red-600 hover:bg-red-50"
                            >
                              <X weight="bold" className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => downloadICS(appointment)}
                          title="Download Calendar"
                        >
                          <CalendarBlank className="w-4 h-4" />
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

      {/* Create Modal would go here - simplified for this implementation */}
      {showCreateModal && (
        <CreateAppointmentModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false)
            fetchAppointments()
          }}
        />
      )}
    </div>
  )
}

// Create Appointment Modal Component
function CreateAppointmentModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [clients, setClients] = useState<any[]>([])
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [bookedSlots, setBookedSlots] = useState<string[]>([])

  const [formData, setFormData] = useState({
    clientId: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    type: 'tax-preparation',
    date: '',
    time: '',
    notes: '',
  })

  const searchClients = async () => {
    if (!searchQuery) return
    try {
      const response = await fetch(`/api/admin/users?search=${searchQuery}&role=client`)
      const data = await response.json()
      setClients(data.users || [])
    } catch (error) {
      console.error('Error searching clients:', error)
    }
  }

  const fetchBookedSlots = async (date: string) => {
    try {
      const response = await fetch(`/api/admin/appointments/availability?date=${date}`)
      const data = await response.json()
      setBookedSlots(data.bookedSlots || [])
    } catch (error) {
      console.error('Error fetching booked slots:', error)
    }
  }

  const handleDateChange = (date: string) => {
    setFormData({ ...formData, date, time: '' })
    fetchBookedSlots(date)
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/appointments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          clientId: selectedClient?.id || null,
        }),
      })

      if (response.ok) {
        onSuccess()
      }
    } catch (error) {
      console.error('Error creating appointment:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Create Appointment</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-2 mt-4">
            <div className={`flex-1 h-1 rounded-full ${step >= 1 ? 'bg-light-accent-primary' : 'bg-gray-200'}`} />
            <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-light-accent-primary' : 'bg-gray-200'}`} />
          </div>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div>
              <h3 className="font-medium mb-4">Step 1: Find Client</h3>
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Search by phone or email"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={searchClients}>Search</Button>
              </div>

              {clients.length > 0 && (
                <div className="space-y-2 mb-4">
                  {clients.map((client) => (
                    <div
                      key={client.id}
                      onClick={() => {
                        setSelectedClient(client)
                        setFormData({
                          ...formData,
                          clientId: client.id,
                          clientName: client.name || '',
                          clientEmail: client.email,
                          clientPhone: client.phone || '',
                        })
                      }}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedClient?.id === client.id
                          ? 'border-light-accent-primary bg-light-accent-primary/5'
                          : 'border-gray-200 dark:border-gray-700 hover:border-light-accent-primary'
                      }`}
                    >
                      <div className="font-medium">{client.name || client.email}</div>
                      <div className="text-sm text-gray-500">{client.email}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <p className="text-sm text-gray-500 mb-4">Or enter client details manually:</p>
                <div className="space-y-4">
                  <Input
                    label="Client Name"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="John Doe"
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                    placeholder="john@example.com"
                    required
                  />
                  <Input
                    label="Phone"
                    value={formData.clientPhone}
                    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button onClick={() => setStep(2)} disabled={!formData.clientEmail}>
                  Next
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="font-medium mb-4">Step 2: Schedule Appointment</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Service Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary"
                  >
                    {serviceTypes.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label} ({service.duration} min)
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleDateChange(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />

                {formData.date && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Time</label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((time) => {
                        const isBooked = bookedSlots.includes(time)
                        return (
                          <button
                            key={time}
                            onClick={() => !isBooked && setFormData({ ...formData, time })}
                            disabled={isBooked}
                            className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                              formData.time === time
                                ? 'border-light-accent-primary bg-light-accent-primary text-white'
                                : isBooked
                                ? 'border-red-300 bg-red-50 text-red-400 cursor-not-allowed'
                                : 'border-gray-200 dark:border-gray-700 hover:border-light-accent-primary'
                            }`}
                          >
                            {time}
                            {isBooked && <span className="block text-xs">Booked</span>}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                <Input
                  label="Notes (Optional)"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any additional notes..."
                />
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={loading || !formData.date || !formData.time}
                  leftIcon={loading ? <SpinnerGap className="animate-spin" /> : undefined}
                >
                  {loading ? 'Creating...' : 'Create Appointment'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
