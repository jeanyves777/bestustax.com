'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Calendar, Clock, User, EnvelopeSimple, Phone, CheckCircle, SpinnerGap, Warning, CaretLeft, CaretRight } from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const serviceTypes = [
  { value: 'tax-preparation', label: 'Tax Preparation', duration: 60, description: 'Personal or business tax return preparation' },
  { value: 'tax-planning', label: 'Tax Planning Consultation', duration: 45, description: 'Strategic tax planning for the upcoming year' },
  { value: 'business-tax', label: 'Business Tax Services', duration: 60, description: 'Corporate, LLC, or partnership tax services' },
  { value: 'bookkeeping', label: 'Bookkeeping Consultation', duration: 30, description: 'Monthly bookkeeping and accounting setup' },
  { value: 'general', label: 'General Consultation', duration: 30, description: 'General tax questions and advice' },
  { value: 'document-review', label: 'Document Review', duration: 30, description: 'Review of tax documents and records' },
]

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM',
]

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

interface CalendarDay {
  date: Date
  day: number
  isCurrentMonth: boolean
  isToday: boolean
  isPast: boolean
  isWeekend: boolean
  dateString: string
}

function generateCalendarDays(year: number, month: number): CalendarDay[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())

  const days: CalendarDay[] = []
  const current = new Date(startDate)

  // Generate 42 days (6 weeks) to fill the calendar grid
  for (let i = 0; i < 42; i++) {
    const date = new Date(current)
    const dayOfWeek = date.getDay()
    days.push({
      date,
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === month,
      isToday: date.toDateString() === today.toDateString(),
      isPast: date <= today,
      isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
      dateString: date.toISOString().split('T')[0],
    })
    current.setDate(current.getDate() + 1)
  }

  return days
}

interface MonthCalendarProps {
  year: number
  month: number
  selectedDate: string
  onSelectDate: (dateString: string) => void
}

function MonthCalendar({ year, month, selectedDate, onSelectDate }: MonthCalendarProps) {
  const days = useMemo(() => generateCalendarDays(year, month), [year, month])

  return (
    <div className="bg-white dark:bg-dark-bg-secondary rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 sm:gap-3 mb-4">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="text-center text-sm sm:text-base font-semibold text-gray-500 dark:text-gray-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {days.map((day, index) => {
          const isDisabled = !day.isCurrentMonth || day.isPast || day.isWeekend
          const isSelected = day.dateString === selectedDate

          return (
            <button
              key={index}
              type="button"
              onClick={() => !isDisabled && onSelectDate(day.dateString)}
              disabled={isDisabled}
              className={`
                relative w-full aspect-square flex items-center justify-center text-base sm:text-lg font-medium rounded-xl transition-all
                ${!day.isCurrentMonth ? 'text-gray-300 dark:text-gray-600' : ''}
                ${day.isCurrentMonth && !isDisabled ? 'text-gray-900 dark:text-white hover:bg-light-accent-primary/10 hover:scale-105' : ''}
                ${day.isPast && day.isCurrentMonth ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' : ''}
                ${day.isWeekend && day.isCurrentMonth && !day.isPast ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' : ''}
                ${isSelected ? 'bg-light-accent-primary text-white hover:bg-light-accent-primary font-bold shadow-lg scale-105' : ''}
                ${day.isToday && !isSelected ? 'ring-2 ring-light-accent-primary ring-inset font-bold' : ''}
              `}
            >
              {day.day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function BookAppointmentPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [calendarOffset, setCalendarOffset] = useState(0) // Offset in months from current month

  const [formData, setFormData] = useState({
    serviceType: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
    honeypot: '', // Anti-bot field
  })

  // Calculate the current month to display based on offset
  const currentCalendarMonth = useMemo(() => {
    const today = new Date()
    const date = new Date(today.getFullYear(), today.getMonth() + calendarOffset, 1)
    return { year: date.getFullYear(), month: date.getMonth() }
  }, [calendarOffset])

  // Navigation functions
  const goToPreviousMonth = () => {
    if (calendarOffset > 0) {
      setCalendarOffset(calendarOffset - 1)
    }
  }

  const goToNextMonth = () => {
    if (calendarOffset < 11) { // Allow up to 12 months ahead
      setCalendarOffset(calendarOffset + 1)
    }
  }

  const goToToday = () => {
    setCalendarOffset(0)
  }

  useEffect(() => {
    if (formData.date) {
      fetchAvailability(formData.date)
    }
  }, [formData.date])

  const fetchAvailability = async (date: string) => {
    try {
      const response = await fetch(`/api/public/appointments/availability?date=${date}`)
      const data = await response.json()
      setBookedSlots(data.bookedSlots || [])
    } catch (error) {
      console.error('Error fetching availability:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot check - bots will fill this in
    if (formData.honeypot) {
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/public/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: formData.serviceType,
          date: formData.date,
          time: formData.time,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          notes: formData.notes,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to book appointment')
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleDateSelect = (dateString: string) => {
    setFormData({ ...formData, date: dateString, time: '' })
    setError('')
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-light-bg-primary to-light-bg-secondary dark:from-dark-bg-primary dark:to-dark-bg-secondary py-16">
        <div className="container-custom">
          <Card className="max-w-lg mx-auto p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle weight="fill" className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Appointment Booked!</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We've sent a confirmation email to <strong>{formData.email}</strong> with your
              appointment details and a calendar invite.
            </p>
            <div className="bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg p-4 mb-6 text-left">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Service:</span>
                  <p className="font-medium">
                    {serviceTypes.find((s) => s.value === formData.serviceType)?.label}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Date:</span>
                  <p className="font-medium">{new Date(formData.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-gray-500">Time:</span>
                  <p className="font-medium">{formData.time}</p>
                </div>
                <div>
                  <span className="text-gray-500">Location:</span>
                  <p className="font-medium">BestUsTax Office</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Please arrive 5-10 minutes early. Bring any relevant tax documents.
            </p>
            <Link href="/">
              <Button>Return to Homepage</Button>
            </Link>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-bg-primary to-light-bg-secondary dark:from-dark-bg-primary dark:to-dark-bg-secondary py-16">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-light-accent-primary to-light-success flex items-center justify-center">
                <span className="text-white font-bold">BU</span>
              </div>
              <span className="text-xl font-bold">BestUsTax</span>
            </Link>
            <h1 className="text-4xl font-bold mb-2">Book an Appointment</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Schedule a consultation with one of our tax professionals
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-24 h-1 rounded-full transition-colors ${
                  step >= s ? 'bg-light-accent-primary' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>

          <Card className="p-6 lg:p-8">
            <form onSubmit={handleSubmit}>
              {/* Hidden honeypot field */}
              <input
                type="text"
                name="website"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                  <Warning weight="fill" className="w-5 h-5 flex-shrink-0" />
                  {error}
                </div>
              )}

              {/* Step 1: Select Service */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Calendar weight="fill" className="w-6 h-6 text-light-accent-primary" />
                    Select a Service
                  </h2>
                  <div className="space-y-3">
                    {serviceTypes.map((service) => (
                      <label
                        key={service.value}
                        className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                          formData.serviceType === service.value
                            ? 'border-light-accent-primary bg-light-accent-primary/5'
                            : 'border-gray-200 dark:border-gray-700 hover:border-light-accent-primary'
                        }`}
                      >
                        <input
                          type="radio"
                          name="serviceType"
                          value={service.value}
                          checked={formData.serviceType === service.value}
                          onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                          className="mt-1 w-4 h-4 text-light-accent-primary"
                        />
                        <div className="flex-1">
                          <div className="font-medium">{service.label}</div>
                          <div className="text-sm text-gray-500">{service.description}</div>
                        </div>
                        <div className="text-sm text-gray-500">{service.duration} min</div>
                      </label>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={!formData.serviceType}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Select Date & Time */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Clock weight="fill" className="w-6 h-6 text-light-accent-primary" />
                    Select Date & Time
                  </h2>

                  {/* Single Month Calendar with Navigation */}
                  <div className="max-w-xl mx-auto mb-8">
                    {/* Calendar Navigation */}
                    <div className="flex items-center justify-between mb-6">
                      <button
                        type="button"
                        onClick={goToPreviousMonth}
                        disabled={calendarOffset === 0}
                        className={`flex items-center justify-center w-12 h-12 rounded-full transition-all ${
                          calendarOffset === 0
                            ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-light-accent-primary/10 hover:text-light-accent-primary'
                        }`}
                      >
                        <CaretLeft weight="bold" className="w-7 h-7" />
                      </button>

                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                          {MONTHS[currentCalendarMonth.month]} {currentCalendarMonth.year}
                        </h3>
                        {calendarOffset !== 0 && (
                          <button
                            type="button"
                            onClick={goToToday}
                            className="px-4 py-1.5 text-sm font-medium bg-light-accent-primary/10 text-light-accent-primary rounded-full hover:bg-light-accent-primary/20 transition-colors"
                          >
                            Today
                          </button>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={goToNextMonth}
                        disabled={calendarOffset >= 11}
                        className={`flex items-center justify-center w-12 h-12 rounded-full transition-all ${
                          calendarOffset >= 11
                            ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-light-accent-primary/10 hover:text-light-accent-primary'
                        }`}
                      >
                        <CaretRight weight="bold" className="w-7 h-7" />
                      </button>
                    </div>

                    {/* Calendar Legend */}
                    <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-lg bg-light-accent-primary"></div>
                        <span className="text-gray-600 dark:text-gray-400">Selected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-lg ring-2 ring-light-accent-primary ring-inset"></div>
                        <span className="text-gray-600 dark:text-gray-400">Today</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                        <span className="text-gray-600 dark:text-gray-400">Unavailable</span>
                      </div>
                    </div>

                    {/* Single Month Calendar */}
                    <MonthCalendar
                      year={currentCalendarMonth.year}
                      month={currentCalendarMonth.month}
                      selectedDate={formData.date}
                      onSelectDate={handleDateSelect}
                    />
                  </div>

                  {/* Time Slots */}
                  {formData.date && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Available Times for {new Date(formData.date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                      </h3>
                      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                        {timeSlots.map((time) => {
                          const isBooked = bookedSlots.includes(time)
                          const isSelected = formData.time === time
                          return (
                            <button
                              key={time}
                              type="button"
                              onClick={() => !isBooked && setFormData({ ...formData, time })}
                              disabled={isBooked}
                              className={`
                                px-3 py-2.5 text-sm rounded-lg border transition-all font-medium
                                ${isSelected
                                  ? 'border-light-accent-primary bg-light-accent-primary text-white shadow-md'
                                  : isBooked
                                  ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-red-400 dark:text-red-500 cursor-not-allowed line-through'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-light-accent-primary hover:bg-light-accent-primary/5'
                                }
                              `}
                            >
                              {time}
                            </button>
                          )
                        })}
                      </div>
                      {bookedSlots.length > 0 && (
                        <p className="mt-3 text-sm text-gray-500">
                          Crossed out times are already booked
                        </p>
                      )}
                    </div>
                  )}

                  {!formData.date && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Select a date from the calendar to see available time slots</p>
                    </div>
                  )}

                  <div className="mt-6 flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setStep(3)}
                      disabled={!formData.date || !formData.time}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Information */}
              {step === 3 && (
                <div className="max-w-2xl mx-auto">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <User weight="fill" className="w-6 h-6 text-light-accent-primary" />
                    Your Information
                  </h2>

                  <div className="space-y-4">
                    <Input
                      label="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      leftIcon={<User />}
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      leftIcon={<EnvelopeSimple />}
                      required
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 123-4567"
                      leftIcon={<Phone />}
                      required
                    />
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Any specific topics you'd like to discuss..."
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary focus:outline-none focus:ring-2 focus:ring-light-accent-primary"
                      />
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg">
                    <h3 className="font-medium mb-2">Appointment Summary</h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <p>
                        <strong>Service:</strong>{' '}
                        {serviceTypes.find((s) => s.value === formData.serviceType)?.label}
                      </p>
                      <p>
                        <strong>Date:</strong> {new Date(formData.date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                      <p>
                        <strong>Time:</strong> {formData.time}
                      </p>
                      <p>
                        <strong>Location:</strong> BestUsTax Office, 123 Tax Street, Austin, TX
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading || !formData.name || !formData.email || !formData.phone}
                      glow
                    >
                      {loading ? (
                        <>
                          <SpinnerGap className="w-4 h-4 animate-spin mr-2" />
                          Booking...
                        </>
                      ) : (
                        'Confirm Booking'
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </Card>

          {/* Contact Info */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Need immediate assistance? Call us at (800) 555-1234</p>
            <p className="mt-1">
              Office hours: Monday - Friday, 9:00 AM - 5:00 PM CT
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
