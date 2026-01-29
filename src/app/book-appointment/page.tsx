'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, User, EnvelopeSimple, Phone, CheckCircle, SpinnerGap, Warning } from '@phosphor-icons/react'
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

export default function BookAppointmentPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [bookedSlots, setBookedSlots] = useState<string[]>([])

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

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  const isWeekend = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDay()
    return day === 0 || day === 6
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
        <div className="max-w-2xl mx-auto">
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

                  <div className="mb-6">
                    <Input
                      label="Select Date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => {
                        const date = e.target.value
                        if (isWeekend(date)) {
                          setError('We are closed on weekends. Please select a weekday.')
                          return
                        }
                        setError('')
                        setFormData({ ...formData, date, time: '' })
                      }}
                      min={getMinDate()}
                      required
                    />
                  </div>

                  {formData.date && !isWeekend(formData.date) && (
                    <div>
                      <label className="block text-sm font-medium mb-3">Select Time</label>
                      <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map((time) => {
                          const isBooked = bookedSlots.includes(time)
                          return (
                            <button
                              key={time}
                              type="button"
                              onClick={() => !isBooked && setFormData({ ...formData, time })}
                              disabled={isBooked}
                              className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                                formData.time === time
                                  ? 'border-light-accent-primary bg-light-accent-primary text-white'
                                  : isBooked
                                  ? 'border-red-200 bg-red-50 text-red-400 cursor-not-allowed'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-light-accent-primary'
                              }`}
                            >
                              {time}
                              {isBooked && (
                                <span className="block text-xs">Booked</span>
                              )}
                            </button>
                          )
                        })}
                      </div>
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
                <div>
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
                        <strong>Date:</strong> {new Date(formData.date).toLocaleDateString()}
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
