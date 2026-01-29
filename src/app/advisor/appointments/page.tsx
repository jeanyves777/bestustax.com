'use client'

import { useState, useEffect } from 'react'
import {
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  MagnifyingGlass,
  Check,
  X,
  SpinnerGap,
  CaretLeft,
  CaretRight,
  User as UserIcon
} from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface Appointment {
  id: string
  client: {
    id: string
    name: string
    email: string
  }
  type: string
  service: string
  date: string
  time: string
  status: string
  notes: string | null
  meetingUrl: string | null
}

export default function AdvisorAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<'upcoming' | 'today' | 'past'>('upcoming')
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    fetchAppointments()
  }, [filter])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/advisor/appointments?filter=${filter}`)
      const data = await response.json()
      setAppointments(data.appointments || [])
    } catch (error) {
      console.error('Error fetching appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateAppointmentStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/advisor/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      fetchAppointments()
    } catch (error) {
      console.error('Error updating appointment:', error)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />
      case 'phone':
        return <Phone className="w-4 h-4" />
      default:
        return <MapPin className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.service.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Group appointments by date
  const groupedAppointments = filteredAppointments.reduce((acc, apt) => {
    const date = apt.date
    if (!acc[date]) acc[date] = []
    acc[date].push(apt)
    return acc
  }, {} as Record<string, Appointment[]>)

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Appointments</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your client appointments
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex gap-2">
          {(['today', 'upcoming', 'past'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-dark-bg-tertiary hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<MagnifyingGlass />}
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <SpinnerGap className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : Object.keys(groupedAppointments).length === 0 ? (
        <Card className="p-12 text-center">
          <Calendar weight="thin" className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No appointments found</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedAppointments)
            .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
            .map(([date, dateAppointments]) => (
              <div key={date}>
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <h3 className="font-semibold">
                    {new Date(date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {dateAppointments.length} appointment{dateAppointments.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="space-y-4">
                  {dateAppointments
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((apt) => (
                      <Card key={apt.id} className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                              <UserIcon className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{apt.client.name}</h4>
                              <p className="text-sm text-gray-500">{apt.service}</p>
                              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {apt.time}
                                </span>
                                <span className="flex items-center gap-1">
                                  {getTypeIcon(apt.type)}
                                  {apt.type}
                                </span>
                                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(apt.status)}`}>
                                  {apt.status}
                                </span>
                              </div>
                              {apt.notes && (
                                <p className="text-sm text-gray-400 mt-2">{apt.notes}</p>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            {apt.status === 'scheduled' && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateAppointmentStatus(apt.id, 'confirmed')}
                                  leftIcon={<Check />}
                                >
                                  Confirm
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-red-600"
                                  onClick={() => updateAppointmentStatus(apt.id, 'cancelled')}
                                  leftIcon={<X />}
                                >
                                  Cancel
                                </Button>
                              </>
                            )}
                            {(apt.status === 'scheduled' || apt.status === 'confirmed') &&
                              apt.meetingUrl && (
                                <Button
                                  size="sm"
                                  onClick={() => window.open(apt.meetingUrl!, '_blank')}
                                  leftIcon={<Video />}
                                >
                                  Join
                                </Button>
                              )}
                            {apt.status === 'confirmed' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateAppointmentStatus(apt.id, 'completed')}
                              >
                                Mark Complete
                              </Button>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
