'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  Clock,
  User,
  EnvelopeSimple,
  Phone,
  CheckCircle,
  SpinnerGap,
  Warning,
  ShieldCheck,
  Star,
  Headset,
  ArrowRight,
  ArrowLeft,
  MapPin
} from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const serviceTypes = [
  { value: 'tax-preparation', label: 'Tax Preparation', duration: 60, description: 'Personal or business tax return preparation', icon: '📋' },
  { value: 'tax-planning', label: 'Tax Planning Consultation', duration: 45, description: 'Strategic tax planning for the upcoming year', icon: '📊' },
  { value: 'business-tax', label: 'Business Tax Services', duration: 60, description: 'Corporate, LLC, or partnership tax services', icon: '🏢' },
  { value: 'bookkeeping', label: 'Bookkeeping Consultation', duration: 30, description: 'Monthly bookkeeping and accounting setup', icon: '📚' },
  { value: 'general', label: 'General Consultation', duration: 30, description: 'General tax questions and advice', icon: '💬' },
  { value: 'document-review', label: 'Document Review', duration: 30, description: 'Review of tax documents and records', icon: '📄' },
]

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM',
]

const benefits = [
  { icon: ShieldCheck, text: 'Free consultation' },
  { icon: Star, text: 'Expert advisors' },
  { icon: Headset, text: '24/7 support' },
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
    honeypot: '',
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-blue via-brand-blue-light to-brand-blue py-16 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg"
        >
          <Card className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
            >
              <CheckCircle weight="fill" className="w-10 h-10 text-green-600 dark:text-green-400" />
            </motion.div>
            <h1 className="text-2xl font-bold mb-2">Appointment Booked!</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We've sent a confirmation email to <strong>{formData.email}</strong> with your
              appointment details and a calendar invite.
            </p>
            <Card className="p-4 mb-6 bg-gray-50 dark:bg-dark-bg-tertiary text-left">
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
            </Card>
            <p className="text-sm text-gray-500 mb-6">
              Please arrive 5-10 minutes early. Bring any relevant tax documents.
            </p>
            <Link href="/">
              <Button glow>Return to Homepage</Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Info */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-brand-blue via-brand-blue-light to-brand-blue dark:from-brand-blue-dark dark:via-brand-blue dark:to-brand-blue-dark relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl"
            animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/" className="inline-flex items-center gap-2 mb-8">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white font-bold text-xl">BU</span>
              </div>
              <span className="text-2xl font-bold text-white">
                Best<span className="text-brand-gold">UsTax</span>
              </span>
            </Link>

            <h2 className="text-4xl font-bold text-white mb-4">
              Schedule Your Free Consultation
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-md">
              Meet with our expert tax advisors and get personalized guidance for your tax situation.
            </p>

            <div className="space-y-4 mb-12">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 text-white/90"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <benefit.icon weight="fill" className="w-5 h-5 text-brand-gold" />
                  </div>
                  <span className="font-medium">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Office Info */}
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-brand-gold flex items-center justify-center flex-shrink-0">
                  <MapPin weight="fill" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Our Office</h3>
                  <p className="text-white/80 text-sm">123 Tax Street</p>
                  <p className="text-white/80 text-sm">Austin, TX 78701</p>
                  <p className="text-white/60 text-sm mt-2">Mon - Fri: 9:00 AM - 5:00 PM CT</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center bg-white dark:bg-dark-bg-primary py-12 px-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-lg"
        >
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-blue to-brand-gold flex items-center justify-center">
                <span className="text-white font-bold">BU</span>
              </div>
              <span className="text-xl font-bold">BestUsTax</span>
            </Link>
            <h1 className="text-3xl font-bold mb-2">Book an Appointment</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Schedule a consultation with our tax professionals
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center gap-4 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                    step >= s
                      ? 'bg-gradient-to-br from-brand-blue to-brand-gold text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}
                  animate={{ scale: step === s ? [1, 1.1, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {step > s ? <CheckCircle weight="fill" /> : s}
                </motion.div>
                {s < 3 && (
                  <div className={`w-12 h-1 rounded-full ${step > s ? 'bg-brand-gold' : 'bg-gray-200 dark:bg-gray-700'}`} />
                )}
              </div>
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

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-center gap-2"
                  >
                    <Warning weight="fill" className="w-5 h-5 flex-shrink-0" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 1: Select Service */}
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Calendar weight="fill" className="w-6 h-6 text-brand-blue" />
                      Select a Service
                    </h2>
                    <div className="space-y-3">
                      {serviceTypes.map((service) => (
                        <label
                          key={service.value}
                          className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                            formData.serviceType === service.value
                              ? 'border-brand-blue bg-brand-blue/5 shadow-lg'
                              : 'border-gray-200 dark:border-gray-700 hover:border-brand-blue/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="serviceType"
                            value={service.value}
                            checked={formData.serviceType === service.value}
                            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                            className="mt-1 w-4 h-4 text-brand-blue"
                          />
                          <div className="flex-1">
                            <div className="font-bold flex items-center gap-2">
                              <span>{service.icon}</span> {service.label}
                            </div>
                            <div className="text-sm text-gray-500">{service.description}</div>
                          </div>
                          <div className="text-sm text-brand-blue font-medium">{service.duration} min</div>
                        </label>
                      ))}
                    </div>
                    <div className="mt-6 flex justify-end">
                      <Button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={!formData.serviceType}
                        rightIcon={<ArrowRight weight="bold" />}
                      >
                        Continue
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Select Date & Time */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Clock weight="fill" className="w-6 h-6 text-brand-blue" />
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
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
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
                                className={`px-3 py-2 text-sm rounded-lg border-2 transition-all ${
                                  formData.time === time
                                    ? 'border-brand-blue bg-brand-blue text-white shadow-lg'
                                    : isBooked
                                    ? 'border-red-200 bg-red-50 text-red-400 cursor-not-allowed'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-brand-blue'
                                }`}
                              >
                                {time}
                                {isBooked && <span className="block text-xs">Booked</span>}
                              </button>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}

                    <div className="mt-6 flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} leftIcon={<ArrowLeft weight="bold" />}>
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setStep(3)}
                        disabled={!formData.date || !formData.time}
                        rightIcon={<ArrowRight weight="bold" />}
                      >
                        Continue
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Contact Information */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <User weight="fill" className="w-6 h-6 text-brand-blue" />
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
                          className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Summary */}
                    <Card className="mt-6 p-4 bg-gradient-to-br from-brand-blue/5 to-brand-gold/5">
                      <h3 className="font-bold mb-3 flex items-center gap-2">
                        <CheckCircle weight="fill" className="w-5 h-5 text-brand-gold" />
                        Appointment Summary
                      </h3>
                      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                        <p>
                          <strong>Service:</strong>{' '}
                          {serviceTypes.find((s) => s.value === formData.serviceType)?.label}
                        </p>
                        <p>
                          <strong>Date:</strong> {new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        <p>
                          <strong>Time:</strong> {formData.time}
                        </p>
                        <p>
                          <strong>Duration:</strong> {serviceTypes.find((s) => s.value === formData.serviceType)?.duration} minutes
                        </p>
                      </div>
                    </Card>

                    <div className="mt-6 flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setStep(2)} leftIcon={<ArrowLeft weight="bold" />}>
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={loading || !formData.name || !formData.email || !formData.phone}
                        glow
                        leftIcon={loading ? <SpinnerGap className="animate-spin" /> : <CheckCircle weight="bold" />}
                      >
                        {loading ? 'Booking...' : 'Confirm Booking'}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Card>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-sm text-gray-500"
          >
            <p className="flex items-center justify-center gap-2">
              <Phone weight="fill" className="w-4 h-4" />
              Need immediate assistance? Call us at (800) 555-1234
            </p>
            <p className="mt-1">
              Office hours: Monday - Friday, 9:00 AM - 5:00 PM CT
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
