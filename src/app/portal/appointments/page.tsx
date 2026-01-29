'use client'

import { useState, useEffect } from 'react'
import {
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  Plus,
  X,
  Check,
  SpinnerGap,
  CalendarBlank,
  CaretLeft,
  CaretRight
} from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface Appointment {
  id: string
  type: string
  service: string
  date: string
  time: string
  status: string
  notes: string | null
  advisor: {
    name: string
    email: string
  } | null
  meetingUrl: string | null
}

const services = [
  { id: 'tax-prep', name: 'Tax Preparation', duration: '60 min' },
  { id: 'tax-planning', name: 'Tax Planning', duration: '45 min' },
  { id: 'consultation', name: 'General Consultation', duration: '30 min' },
  { id: 'business', name: 'Business Tax Review', duration: '60 min' },
  { id: 'audit', name: 'Audit Support', duration: '60 min' },
]

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM'
]

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [filter, setFilter] = useState<'upcoming' | 'past' | 'all'>('upcoming')

  useEffect(() => {
    fetchAppointments()
  }, [filter])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/portal/appointments?filter=${filter}`)
      const data = await response.json()
      setAppointments(data.appointments || [])
    } catch (error) {
      console.error('Error fetching appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  const cancelAppointment = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return

    try {
      await fetch(`/api/portal/appointments/${id}`, {
        method: 'DELETE',
      })
      fetchAppointments()
    } catch (error) {
      console.error('Error canceling appointment:', error)
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

  const upcomingAppointments = appointments.filter(
    (apt) =>
      new Date(`${apt.date} ${apt.time}`) > new Date() &&
      apt.status !== 'cancelled' &&
      apt.status !== 'completed'
  )

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Appointments</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Schedule and manage your appointments
          </p>
        </div>
        <Button onClick={() => setShowScheduleModal(true)} leftIcon={<Plus weight="bold" />} glow>
          Schedule Appointment
        </Button>
      </div>

      {/* Next Appointment Card */}
      {upcomingAppointments.length > 0 && (
        <Card className="p-6 mb-6 bg-gradient-to-r from-light-accent-primary/10 to-transparent">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Your Next Appointment</p>
              <h3 className="text-xl font-semibold mb-2">{upcomingAppointments[0].service}</h3>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {new Date(upcomingAppointments[0].date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {upcomingAppointments[0].time}
                </span>
                <span className="flex items-center gap-1">
                  {getTypeIcon(upcomingAppointments[0].type)}
                  {upcomingAppointments[0].type.charAt(0).toUpperCase() + upcomingAppointments[0].type.slice(1)}
                </span>
              </div>
              {upcomingAppointments[0].advisor && (
                <p className="text-sm text-gray-500 mt-2">
                  With {upcomingAppointments[0].advisor.name}
                </p>
              )}
            </div>
            <div className="flex gap-3">
              {upcomingAppointments[0].meetingUrl && (
                <Button
                  onClick={() => window.open(upcomingAppointments[0].meetingUrl!, '_blank')}
                  leftIcon={<Video />}
                >
                  Join Meeting
                </Button>
              )}
              <Button variant="outline" onClick={() => cancelAppointment(upcomingAppointments[0].id)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {(['upcoming', 'past', 'all'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
              filter === f
                ? 'bg-light-accent-primary text-white'
                : 'bg-gray-100 dark:bg-dark-bg-tertiary hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <SpinnerGap className="w-8 h-8 animate-spin text-light-accent-primary" />
        </div>
      ) : appointments.length === 0 ? (
        <Card className="p-12 text-center">
          <CalendarBlank weight="thin" className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 mb-4">No appointments found</p>
          <Button onClick={() => setShowScheduleModal(true)}>
            Schedule Your First Appointment
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-light-accent-primary/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-light-accent-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{appointment.service}</h3>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(appointment.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {appointment.time}
                      </span>
                      <span className="flex items-center gap-1">
                        {getTypeIcon(appointment.type)}
                        {appointment.type}
                      </span>
                    </div>
                    {appointment.advisor && (
                      <p className="text-sm text-gray-500 mt-1">
                        Advisor: {appointment.advisor.name}
                      </p>
                    )}
                    {appointment.notes && (
                      <p className="text-sm text-gray-400 mt-2">{appointment.notes}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {appointment.status !== 'cancelled' &&
                    appointment.status !== 'completed' &&
                    new Date(`${appointment.date} ${appointment.time}`) > new Date() && (
                      <>
                        {appointment.meetingUrl && (
                          <Button
                            size="sm"
                            onClick={() => window.open(appointment.meetingUrl!, '_blank')}
                            leftIcon={<Video />}
                          >
                            Join
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => cancelAppointment(appointment.id)}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <ScheduleModal
          onClose={() => setShowScheduleModal(false)}
          onSuccess={() => {
            setShowScheduleModal(false)
            fetchAppointments()
          }}
        />
      )}
    </div>
  )
}

function ScheduleModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [selectedType, setSelectedType] = useState('video')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [notes, setNotes] = useState('')
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [currentMonth, setCurrentMonth] = useState(new Date())

  useEffect(() => {
    if (selectedDate) {
      fetchAvailability()
    }
  }, [selectedDate])

  const fetchAvailability = async () => {
    try {
      const response = await fetch(`/api/public/appointments/availability?date=${selectedDate}`)
      const data = await response.json()
      setBookedSlots(data.bookedSlots || [])
    } catch (error) {
      console.error('Error fetching availability:', error)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/portal/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: selectedService,
          type: selectedType,
          date: selectedDate,
          time: selectedTime,
          notes,
        }),
      })

      if (response.ok) {
        onSuccess()
      }
    } catch (error) {
      console.error('Error scheduling appointment:', error)
    } finally {
      setLoading(false)
    }
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days = []

    // Add empty days for padding
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }

    // Add actual days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const isDateAvailable = (date: Date | null) => {
    if (!date) return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date >= today && date.getDay() !== 0 && date.getDay() !== 6
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Schedule Appointment</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
          {/* Progress */}
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= s
                      ? 'bg-light-accent-primary text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}
                >
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-12 h-1 ${step > s ? 'bg-light-accent-primary' : 'bg-gray-200 dark:bg-gray-700'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div>
              <h3 className="font-semibold mb-4">Select Service</h3>
              <div className="space-y-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.name)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                      selectedService === service.name
                        ? 'border-light-accent-primary bg-light-accent-primary/10'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{service.name}</div>
                    <div className="text-sm text-gray-500">{service.duration}</div>
                  </button>
                ))}
              </div>

              <h3 className="font-semibold mb-4 mt-6">Appointment Type</h3>
              <div className="flex gap-3">
                {[
                  { id: 'video', label: 'Video Call', icon: Video },
                  { id: 'phone', label: 'Phone Call', icon: Phone },
                  { id: 'in-person', label: 'In Person', icon: MapPin },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`flex-1 p-4 rounded-lg border-2 text-center transition-colors ${
                      selectedType === type.id
                        ? 'border-light-accent-primary bg-light-accent-primary/10'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <type.icon className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="font-semibold mb-4">Select Date & Time</h3>

              {/* Calendar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <CaretLeft className="w-5 h-5" />
                  </button>
                  <h4 className="font-medium">
                    {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </h4>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <CaretRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="py-2 text-gray-500 font-medium">
                      {day}
                    </div>
                  ))}
                  {getDaysInMonth(currentMonth).map((date, index) => (
                    <button
                      key={index}
                      disabled={!isDateAvailable(date)}
                      onClick={() => date && setSelectedDate(date.toISOString().split('T')[0])}
                      className={`py-2 rounded-lg transition-colors ${
                        !date
                          ? ''
                          : !isDateAvailable(date)
                          ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                          : selectedDate === date.toISOString().split('T')[0]
                          ? 'bg-light-accent-primary text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {date?.getDate()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div>
                  <h4 className="font-medium mb-3">Available Times</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        disabled={bookedSlots.includes(slot)}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 px-3 rounded-lg text-sm transition-colors ${
                          bookedSlots.includes(slot)
                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                            : selectedTime === slot
                            ? 'bg-light-accent-primary text-white'
                            : 'bg-gray-100 dark:bg-dark-bg-tertiary hover:bg-gray-200'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="font-semibold mb-4">Confirm Details</h3>

              <Card className="p-4 bg-gray-50 dark:bg-dark-bg-tertiary mb-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Service</span>
                    <span className="font-medium">{selectedService}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type</span>
                    <span className="font-medium capitalize">{selectedType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date</span>
                    <span className="font-medium">
                      {new Date(selectedDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Time</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                </div>
              </Card>

              <div>
                <label className="block text-sm font-medium mb-2">Additional Notes (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary"
                  placeholder="Any specific topics you'd like to discuss..."
                />
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          ) : (
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}
          {step < 3 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={
                (step === 1 && !selectedService) ||
                (step === 2 && (!selectedDate || !selectedTime))
              }
            >
              Continue
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? <SpinnerGap className="w-4 h-4 animate-spin" /> : 'Schedule Appointment'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
