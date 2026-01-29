'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle,
  Star,
  ShieldCheck,
  Clock,
  Headset,
  CurrencyDollar,
  ChartLineUp,
  Users,
  FileText,
  Lightning,
  Medal,
  Quotes,
  Play,
  Phone,
  CalendarCheck
} from '@phosphor-icons/react'
import { HeroSection } from '@/components/home/HeroSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { TaxCalculator } from '@/components/calculators/TaxCalculator'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const processSteps = [
  {
    step: '01',
    title: 'Upload Documents',
    description: 'Securely upload your W-2s, 1099s, and other tax documents through our encrypted portal.',
    icon: FileText,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    step: '02',
    title: 'Expert Review',
    description: 'A certified tax professional reviews your return and maximizes your deductions.',
    icon: Users,
    color: 'from-purple-500 to-pink-500',
  },
  {
    step: '03',
    title: 'You Approve',
    description: 'Review your completed return and approve it with our easy e-signature process.',
    icon: CheckCircle,
    color: 'from-green-500 to-emerald-500',
  },
  {
    step: '04',
    title: 'Get Your Refund',
    description: 'We e-file your return and you receive your maximum refund in as little as 8 days.',
    icon: CurrencyDollar,
    color: 'from-amber-500 to-orange-500',
  },
]

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Accuracy Guarantee',
    description: 'We guarantee 100% accuracy on your tax return or we pay any IRS penalties.',
  },
  {
    icon: CurrencyDollar,
    title: 'Maximum Refund',
    description: 'Our experts find every deduction and credit you deserve.',
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description: 'Most returns completed within 48 hours of receiving documents.',
  },
  {
    icon: Headset,
    title: 'Year-Round Support',
    description: 'Access to tax professionals 365 days a year, not just during tax season.',
  },
  {
    icon: Lightning,
    title: 'E-File Included',
    description: 'Free federal and state e-filing with every tax preparation.',
  },
  {
    icon: Medal,
    title: 'Audit Protection',
    description: 'Free audit support if the IRS questions your return.',
  },
]

const testimonials = [
  {
    name: 'Jennifer Martinez',
    location: 'Austin, TX',
    rating: 5,
    text: "BestUsTax found deductions I didn't even know existed. Got $2,300 more than when I filed myself last year!",
    image: 'JM',
  },
  {
    name: 'Michael Thompson',
    location: 'Miami, FL',
    rating: 5,
    text: 'As a small business owner, taxes used to stress me out. Now I just upload my docs and they handle everything.',
    image: 'MT',
  },
  {
    name: 'Sarah Chen',
    location: 'Seattle, WA',
    rating: 5,
    text: 'The team was incredibly helpful during my audit. They handled everything and I didn\'t owe a penny more.',
    image: 'SC',
  },
  {
    name: 'David Rodriguez',
    location: 'Phoenix, AZ',
    rating: 5,
    text: 'First time using a professional tax service. The process was smooth and my refund was way bigger than expected.',
    image: 'DR',
  },
]

const trustLogos = [
  'IRS Authorized e-File',
  'BBB A+ Rated',
  'AICPA Member',
  '256-bit Encryption',
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Trust Bar */}
      <section className="py-6 bg-gray-50 dark:bg-brand-blue-dark border-y border-gray-200 dark:border-white/10">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {trustLogos.map((logo, index) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
              >
                <ShieldCheck weight="fill" className="w-5 h-5 text-green-500" />
                <span className="font-medium text-sm">{logo}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-dark-bg-primary dark:to-dark-bg-secondary overflow-hidden">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold mb-4">
              Simple Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get your taxes done in 4 simple steps. No complicated software, no confusing forms.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 via-green-500 to-amber-500 transform -translate-y-1/2 rounded-full" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  <Card hover className="p-6 text-center relative z-10 bg-white dark:bg-dark-bg-secondary h-full">
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform`}>
                      <step.icon weight="bold" className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-5xl font-bold text-gray-100 dark:text-gray-800 absolute top-4 right-4">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/register">
              <Button size="xl" glow rightIcon={<ArrowRight weight="bold" />}>
                Start Your Tax Return Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-brand-blue dark:bg-brand-blue-dark relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold mb-4">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              The BestUsTax <span className="text-brand-gold">Advantage</span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Experience tax preparation done right with our industry-leading guarantees.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/10 hover:bg-white/15 transition-colors h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-gold flex items-center justify-center flex-shrink-0">
                      <benefit.icon weight="bold" className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                      <p className="text-white/70">{benefit.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tax Calculator Section */}
      <section className="py-24 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold mb-4">
              Free Tool
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-blue dark:text-white">
              Estimate Your <span className="text-brand-gold">Tax Refund</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Use our advanced tax calculator to get an instant estimate of your
              federal tax refund or amount owed.
            </p>
          </motion.div>
          <TaxCalculator />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white dark:bg-dark-bg-primary overflow-hidden">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold mb-4">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of satisfied clients who trust BestUsTax with their taxes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="p-6 h-full flex flex-col">
                  <Quotes weight="fill" className="w-10 h-10 text-brand-gold/30 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 flex-grow mb-6">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} weight="fill" className="w-5 h-5 text-brand-gold" />
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-blue to-brand-gold flex items-center justify-center text-white font-bold">
                      {testimonial.image}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.location}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-brand-blue via-brand-blue-light to-brand-blue dark:from-brand-blue-dark dark:via-brand-blue dark:to-brand-blue-dark relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl"
            animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Trusted by <span className="text-brand-gold">Thousands</span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Our track record speaks for itself
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50K+', label: 'Happy Clients', icon: Users },
              { value: '$2.5B+', label: 'Refunds Processed', icon: CurrencyDollar },
              { value: '4.9/5', label: 'Average Rating', icon: Star },
              { value: '15+', label: 'Years of Excellence', icon: Medal },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: 'spring' }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center">
                  <stat.icon weight="fill" className="w-8 h-8 text-brand-gold" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-dark-bg-secondary dark:to-dark-bg-primary relative overflow-hidden">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 md:p-12 bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white text-center relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-brand-gold flex items-center justify-center"
                  >
                    <ChartLineUp weight="bold" className="w-10 h-10 text-white" />
                  </motion.div>

                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Maximize Your Tax Refund?
                  </h2>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                    Start your tax return today and join thousands of satisfied clients
                    who trust BestUsTax for their tax needs.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <Link href="/register">
                      <Button size="xl" className="bg-brand-gold hover:bg-brand-gold-dark text-white w-full sm:w-auto" rightIcon={<ArrowRight weight="bold" />}>
                        Start Your Tax Return
                      </Button>
                    </Link>
                    <Link href="/book-appointment">
                      <Button size="xl" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto" leftIcon={<CalendarCheck weight="bold" />}>
                        Schedule Consultation
                      </Button>
                    </Link>
                  </div>

                  <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70">
                    <div className="flex items-center gap-2">
                      <CheckCircle weight="fill" className="w-5 h-5 text-brand-gold" />
                      No upfront payment
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle weight="fill" className="w-5 h-5 text-brand-gold" />
                      Maximum refund guarantee
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle weight="fill" className="w-5 h-5 text-brand-gold" />
                      Free audit support
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Bar */}
      <section className="py-8 bg-brand-gold">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-white">
              <Phone weight="fill" className="w-6 h-6" />
              <span className="font-semibold">Have questions? Call us at</span>
              <a href="tel:1-800-555-0123" className="font-bold text-lg hover:underline">
                1-800-555-0123
              </a>
            </div>
            <div className="text-white/90 text-sm">
              Available Mon-Fri 8am-8pm, Sat 9am-5pm EST
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
