'use client'

import { useState } from 'react'
import { MapPin, Phone, Envelope, Clock, PaperPlaneTilt, CheckCircle, ChatCircle } from '@phosphor-icons/react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    value: '(800) 555-1234',
    description: 'Mon-Fri 8am-8pm, Sat 9am-5pm EST',
  },
  {
    icon: Envelope,
    title: 'Email',
    value: 'support@bestustax.com',
    description: 'We respond within 24 hours',
  },
  {
    icon: MapPin,
    title: 'Address',
    value: '123 Tax Street, Suite 100',
    description: 'Austin, TX 78701',
  },
  {
    icon: Clock,
    title: 'Office Hours',
    value: 'Mon-Fri: 8am-8pm EST',
    description: 'Sat: 9am-5pm EST',
  },
]

const faqs = [
  {
    question: 'How quickly can I expect a response?',
    answer: 'We aim to respond to all inquiries within 24 hours during business days. During tax season (January-April), response times may be slightly longer.',
  },
  {
    question: 'Do you offer in-person consultations?',
    answer: 'Yes! We offer both in-person consultations at our Austin office and virtual meetings via video call. Schedule an appointment through our online booking system.',
  },
  {
    question: 'What information should I have ready when I call?',
    answer: 'Please have your name, contact information, and a brief description of your tax situation ready. If you\'re an existing client, have your account number available.',
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
      <section className="py-16 bg-gradient-to-br from-light-bg-primary to-light-bg-secondary dark:from-dark-bg-primary dark:to-dark-bg-secondary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Have questions? We're here to help. Reach out to our team and we'll
              get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {contactInfo.map((info) => (
              <Card key={info.title} hover className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-light-accent-primary/10 dark:bg-dark-accent-primary/10 flex items-center justify-center">
                  <info.icon weight="fill" className="w-6 h-6 text-light-accent-primary dark:text-dark-accent-primary" />
                </div>
                <h3 className="font-bold mb-1">{info.title}</h3>
                <p className="text-light-accent-primary dark:text-dark-accent-primary font-medium">
                  {info.value}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {info.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQs */}
      <section className="py-16 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <ChatCircle weight="fill" className="w-6 h-6 text-light-accent-primary dark:text-dark-accent-primary" />
                <h2 className="text-2xl font-bold">Send Us a Message</h2>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-light-success/10 dark:bg-dark-success/10 flex items-center justify-center">
                    <CheckCircle weight="fill" className="w-8 h-8 text-light-success dark:text-dark-success" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
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
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary"
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
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary resize-none"
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

            {/* FAQs */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <Card key={faq.question} className="p-6">
                    <h3 className="font-bold mb-2">{faq.question}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {faq.answer}
                    </p>
                  </Card>
                ))}
              </div>

              {/* Quick Links */}
              <Card className="p-6 mt-6 bg-gradient-to-r from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-success">
                <h3 className="text-xl font-bold text-white mb-4">
                  Need Immediate Help?
                </h3>
                <p className="text-white/90 mb-4">
                  Check out our resources for quick answers:
                </p>
                <div className="space-y-2">
                  <a
                    href="/resources/guides"
                    className="block text-white hover:underline"
                  >
                    → Tax Guides & Resources
                  </a>
                  <a
                    href="/resources/forms"
                    className="block text-white hover:underline"
                  >
                    → Tax Forms Library
                  </a>
                  <a
                    href="/tools/refund-estimator"
                    className="block text-white hover:underline"
                  >
                    → Tax Calculator Tools
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Visit Our <span className="gradient-text">Office</span>
            </h2>
            <Card className="overflow-hidden">
              <div className="h-64 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <MapPin weight="fill" className="w-12 h-12 mx-auto mb-4 text-light-accent-primary dark:text-dark-accent-primary" />
                  <p className="text-gray-600 dark:text-gray-400">
                    123 Tax Street, Suite 100<br />
                    Austin, TX 78701
                  </p>
                </div>
              </div>
            </Card>
            <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
              Free parking available. Wheelchair accessible.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
