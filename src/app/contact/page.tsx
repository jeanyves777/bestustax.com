'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  MapPin,
  Phone,
  Envelope,
  Clock,
  PaperPlaneTilt,
  CheckCircle,
  ChatCircle,
  ArrowRight,
  CalendarCheck,
  Headset,
  Globe,
  WhatsappLogo,
  VideoCamera
} from '@phosphor-icons/react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    value: '1-800-555-0123',
    description: 'Mon-Fri 8am-8pm, Sat 9am-5pm EST',
    action: 'tel:1-800-555-0123',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Envelope,
    title: 'Email',
    value: 'support@bestustax.com',
    description: 'We respond within 24 hours',
    action: 'mailto:support@bestustax.com',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: WhatsappLogo,
    title: 'WhatsApp',
    value: '+1 (555) 123-4567',
    description: 'Chat with us instantly',
    action: '#',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: VideoCamera,
    title: 'Video Call',
    value: 'Schedule a Call',
    description: 'Face-to-face consultation',
    action: '/book-appointment',
    color: 'from-orange-500 to-red-500',
  },
]

const offices = [
  {
    city: 'Austin (HQ)',
    address: '123 Tax Street, Suite 100',
    zip: 'Austin, TX 78701',
    phone: '(512) 555-0123',
    hours: 'Mon-Fri: 8am-6pm',
  },
  {
    city: 'Miami',
    address: '456 Financial Ave, Floor 12',
    zip: 'Miami, FL 33131',
    phone: '(305) 555-0123',
    hours: 'Mon-Fri: 9am-5pm',
  },
  {
    city: 'New York',
    address: '789 Broadway, Suite 500',
    zip: 'New York, NY 10003',
    phone: '(212) 555-0123',
    hours: 'Mon-Fri: 8am-7pm',
  },
]

const faqs = [
  {
    question: 'How quickly can I expect a response?',
    answer: 'We aim to respond to all inquiries within 24 hours during business days. During tax season (January-April), response times may be slightly longer.',
  },
  {
    question: 'Do you offer in-person consultations?',
    answer: 'Yes! We offer both in-person consultations at our offices and virtual meetings via video call. Schedule an appointment through our online booking system.',
  },
  {
    question: 'What information should I have ready when I call?',
    answer: 'Please have your name, contact information, and a brief description of your tax situation ready. If you\'re an existing client, have your account number available.',
  },
  {
    question: 'Can I get help outside business hours?',
    answer: 'Yes! During tax season, we offer extended hours including evenings and Sundays. Our online resources are available 24/7.',
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-brand-blue via-brand-blue-light to-brand-blue dark:from-brand-blue-dark dark:via-brand-blue dark:to-brand-blue-dark overflow-hidden">
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

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold mb-6"
            >
              Contact Us
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold mb-6 text-white"
            >
              We're Here to <span className="text-brand-gold">Help</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/90 mb-8"
            >
              Have questions about your taxes? Our team of experts is ready to assist you.
              Reach out through any channel that works best for you.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a href="tel:1-800-555-0123">
                <Button size="lg" className="bg-brand-gold hover:bg-brand-gold-dark text-white" leftIcon={<Phone weight="fill" />}>
                  Call Now: 1-800-555-0123
                </Button>
              </a>
              <Link href="/book-appointment">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" leftIcon={<CalendarCheck weight="bold" />}>
                  Schedule a Call
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path
              d="M0 48L60 56C120 64 240 80 360 80C480 80 600 64 720 56C840 48 960 48 1080 56C1200 64 1320 80 1380 88L1440 96V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V48Z"
              className="fill-white dark:fill-dark-bg-primary"
            />
          </svg>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.action}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="p-6 text-center h-full group cursor-pointer">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <info.icon weight="fill" className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold mb-1">{info.title}</h3>
                  <p className="text-brand-blue dark:text-brand-gold font-medium">
                    {info.value}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {info.description}
                  </p>
                </Card>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQs */}
      <section className="py-16 bg-gray-50 dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-gold flex items-center justify-center">
                    <ChatCircle weight="fill" className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Send Us a Message</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">We'll get back to you within 24 hours</p>
                  </div>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <CheckCircle weight="fill" className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Smith"
                      />
                      <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                      />
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Subject
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg-tertiary text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-blue dark:focus:ring-brand-gold"
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="tax-prep">Tax Preparation</option>
                          <option value="business">Business Services</option>
                          <option value="support">Technical Support</option>
                          <option value="billing">Billing Question</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="How can we help you?"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg-tertiary text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-blue dark:focus:ring-brand-gold resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      glow
                      className="w-full"
                      isLoading={isSubmitting}
                      rightIcon={<PaperPlaneTilt weight="fill" />}
                    >
                      Send Message
                    </Button>
                  </form>
                )}
              </Card>
            </motion.div>

            {/* FAQs */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold mb-4">
                  FAQ
                </span>
                <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card hover className="p-6">
                      <h3 className="font-bold mb-2">{faq.question}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {faq.answer}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Quick Links */}
              <Card className="p-6 mt-6 bg-gradient-to-br from-brand-blue to-brand-blue-dark overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Headset weight="fill" className="w-8 h-8 text-brand-gold" />
                    <h3 className="text-xl font-bold text-white">
                      Need Immediate Help?
                    </h3>
                  </div>
                  <p className="text-white/80 mb-4">
                    Check out our resources for quick answers:
                  </p>
                  <div className="space-y-3">
                    {[
                      { href: '/faq', label: 'Complete FAQ' },
                      { href: '/resources/guides', label: 'Tax Guides & Resources' },
                      { href: '/tools/refund-estimator', label: 'Tax Calculator Tools' },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-2 text-white hover:text-brand-gold transition-colors group"
                      >
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-24 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold mb-4">
              Our Locations
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Visit Our <span className="gradient-text">Offices</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We have offices across the country to serve you better.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {offices.map((office, index) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-gold flex items-center justify-center">
                      <MapPin weight="fill" className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">{office.city}</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <Globe className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">{office.address}</p>
                        <p className="text-gray-600 dark:text-gray-400">{office.zip}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <a href={`tel:${office.phone}`} className="text-brand-blue dark:text-brand-gold hover:underline">
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <p className="text-gray-600 dark:text-gray-400">{office.hours}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button variant="outline" size="sm" className="w-full">
                      Get Directions
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-gold">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Ready to Get Started?
              </h2>
              <p className="text-white/90">
                Start your tax return today and maximize your refund.
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-white text-brand-gold hover:bg-gray-100">
                  Start Now
                </Button>
              </Link>
              <a href="tel:1-800-555-0123">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Call Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
