'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  CheckCircle,
  ArrowRight,
  BookOpen,
  ChartBar,
  Receipt,
  CloudArrowUp,
  Clock,
  ShieldCheck,
  TrendUp,
  Users,
  Lightning,
  Star,
  Headset
} from '@phosphor-icons/react'
import Button from '@/components/ui/Button'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

const services = [
  {
    title: 'Monthly Bookkeeping',
    description: 'Regular transaction categorization, reconciliation, and financial statements.',
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Financial Reporting',
    description: 'Profit & loss statements, balance sheets, and cash flow reports.',
    icon: ChartBar,
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Expense Tracking',
    description: 'Receipt capture, expense categorization, and vendor management.',
    icon: Receipt,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Cloud Accounting',
    description: 'QuickBooks, Xero, and FreshBooks setup and management.',
    icon: CloudArrowUp,
    color: 'from-orange-500 to-red-500',
  },
]

const features = [
  { name: 'Transaction categorization', icon: BookOpen },
  { name: 'Bank reconciliation', icon: ShieldCheck },
  { name: 'Accounts payable management', icon: Receipt },
  { name: 'Accounts receivable tracking', icon: TrendUp },
  { name: 'Payroll processing', icon: Users },
  { name: 'Financial statements', icon: ChartBar },
  { name: 'Tax-ready reports', icon: CheckCircle },
  { name: '1099 preparation', icon: Receipt },
]

const pricingTiers = [
  {
    name: 'Starter',
    price: '$199',
    per: '/month',
    description: 'For new businesses',
    transactions: 'Up to 100 transactions',
    features: [
      'Monthly bookkeeping',
      'Bank reconciliation',
      'Basic financial reports',
      'Email support',
      'QuickBooks Online access',
    ],
    color: 'from-gray-500 to-gray-600',
  },
  {
    name: 'Growth',
    price: '$399',
    per: '/month',
    description: 'For growing businesses',
    transactions: 'Up to 300 transactions',
    features: [
      'Everything in Starter',
      'Accounts payable/receivable',
      'Expense categorization',
      'Monthly financial review call',
      'Priority support',
      'Cash flow forecasting',
    ],
    popular: true,
    color: 'from-brand-blue to-brand-gold',
  },
  {
    name: 'Enterprise',
    price: '$799',
    per: '/month',
    description: 'For established businesses',
    transactions: 'Unlimited transactions',
    features: [
      'Everything in Growth',
      'Dedicated bookkeeper',
      'Payroll processing',
      'Weekly reporting',
      'Multi-entity support',
      'Controller oversight',
    ],
    color: 'from-purple-500 to-pink-500',
  },
]

const benefits = [
  { value: '10+', label: 'Hours Saved Weekly', description: 'Focus on growing your business', icon: Clock },
  { value: '99.9%', label: 'Accuracy Rate', description: 'Error-free financial records', icon: ShieldCheck },
  { value: '48hr', label: 'Turnaround Time', description: 'For monthly close', icon: Lightning },
  { value: '0', label: 'Tax Surprises', description: 'Always prepared for tax season', icon: CheckCircle },
]

const platforms = [
  { name: 'QuickBooks Online', color: 'from-green-500 to-green-600' },
  { name: 'QuickBooks Desktop', color: 'from-green-600 to-green-700' },
  { name: 'Xero', color: 'from-blue-500 to-cyan-500' },
  { name: 'FreshBooks', color: 'from-blue-600 to-indigo-600' },
  { name: 'Wave', color: 'from-cyan-500 to-blue-500' },
  { name: 'Sage', color: 'from-emerald-500 to-green-500' },
]

const testimonial = {
  quote: "Switching to BestUsTax for bookkeeping was a game-changer. My books are always accurate, and tax time is now stress-free!",
  author: "Jennifer L.",
  role: "E-commerce Store Owner",
  rating: 5,
}

export default function BookkeepingPage() {
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold mb-6">
                <BookOpen weight="fill" className="w-4 h-4" />
                Professional Bookkeeping
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                Bookkeeping <span className="text-brand-gold">Services</span>
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Keep your books accurate, organized, and tax-ready year-round.
                Focus on growing your business while we handle the numbers.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/book-appointment">
                  <Button size="xl" className="bg-brand-gold hover:bg-brand-gold-dark text-white" rightIcon={<ArrowRight weight="bold" />}>
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="#pricing">
                  <Button size="xl" variant="outline" className="border-white text-white hover:bg-white/10">
                    See Pricing
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-6">
                {[{ icon: CheckCircle, text: '99.9% Accuracy' }, { icon: Lightning, text: '48hr Turnaround' }, { icon: Headset, text: 'Dedicated Support' }].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-white/80">
                    <item.icon weight="fill" className="w-5 h-5 text-brand-gold" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="hidden lg:block">
              <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-white/10 flex items-center justify-center">
                        <benefit.icon weight="fill" className="w-6 h-6 text-brand-gold" />
                      </div>
                      <div className="text-3xl font-bold text-white mb-1">{benefit.value}</div>
                      <div className="text-white/70 text-sm">{benefit.label}</div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 48L60 56C120 64 240 80 360 80C480 80 600 64 720 56C840 48 960 48 1080 56C1200 64 1320 80 1380 88L1440 96V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V48Z" className="fill-white dark:fill-dark-bg-primary" />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold mb-4">
              Our Services
            </span>
            <h2 className="text-4xl font-bold mb-4">
              What We <span className="gradient-text">Offer</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive bookkeeping services tailored to your business needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="p-6 text-center h-full">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                    <service.icon weight="fill" className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{service.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold mb-4">
              Features
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Included <span className="gradient-text">Features</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card hover className="p-4 h-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-blue to-brand-gold flex items-center justify-center flex-shrink-0">
                      <feature.icon weight="bold" className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium">{feature.name}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Platforms We <span className="gradient-text">Work With</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              We integrate with all major accounting platforms
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`px-6 py-3 rounded-xl bg-gradient-to-r ${platform.color} text-white font-medium shadow-lg`}
              >
                {platform.name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-gray-50 dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <Card className="p-8 md:p-12 text-center bg-gradient-to-br from-brand-blue/5 to-brand-gold/5">
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} weight="fill" className="w-6 h-6 text-brand-gold" />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-blue to-brand-gold flex items-center justify-center text-white font-bold">
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="text-left">
                  <div className="font-bold">{testimonial.author}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold mb-4">
              Pricing
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Simple, Predictable <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Monthly plans that scale with your business. No hidden fees.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className={`relative overflow-hidden h-full ${tier.popular ? 'ring-2 ring-brand-gold shadow-xl' : ''}`}>
                  {tier.popular && (
                    <div className="absolute top-0 left-0 right-0 py-2 bg-gradient-to-r from-brand-blue to-brand-gold text-white text-center text-sm font-bold">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className={tier.popular ? 'pt-12' : ''}>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}>
                      <BookOpen weight="bold" className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>{tier.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold gradient-text">{tier.price}</span>
                      <span className="text-gray-600 dark:text-gray-400">{tier.per}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      {tier.description}
                    </p>
                    <p className="text-sm font-medium text-brand-blue dark:text-brand-gold mt-2">
                      {tier.transactions}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle weight="fill" className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/book-appointment">
                      <Button variant={tier.popular ? 'primary' : 'outline'} glow={tier.popular} className="w-full">
                        Start Free Trial
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-brand-blue to-brand-blue-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl"
            animate={{ y: [0, 50, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Your Books in Order?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Start your free 14-day trial today. No credit card required.
              See how clean books can transform your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-appointment">
                <Button size="xl" className="bg-brand-gold hover:bg-brand-gold-dark text-white" rightIcon={<ArrowRight weight="bold" />}>
                  Start Free 14-Day Trial
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="xl" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
