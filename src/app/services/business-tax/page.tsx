'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  CheckCircle,
  ArrowRight,
  Buildings,
  FileText,
  Calculator,
  ShieldCheck,
  Clock,
  CurrencyDollar,
  ChartLineUp,
  Headset,
  Receipt,
  Scales,
  Bank,
  Handshake,
  Briefcase,
  Users
} from '@phosphor-icons/react'
import Button from '@/components/ui/Button'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

const businessTypes = [
  { icon: Briefcase, title: 'Sole Proprietor', description: 'Schedule C filing, self-employment tax' },
  { icon: Users, title: 'Partnership', description: 'Form 1065, K-1 distributions' },
  { icon: Buildings, title: 'S-Corporation', description: 'Form 1120-S, shareholder wages' },
  { icon: Bank, title: 'C-Corporation', description: 'Form 1120, corporate tax planning' },
  { icon: Handshake, title: 'LLC', description: 'Flexible entity classification' },
  { icon: Scales, title: 'Non-Profit', description: 'Form 990, tax-exempt status' },
]

const features = [
  { icon: FileText, text: 'Business income & expense reporting' },
  { icon: Calculator, text: 'Depreciation & asset management' },
  { icon: CurrencyDollar, text: 'Payroll tax compliance' },
  { icon: Receipt, text: 'Quarterly estimated taxes' },
  { icon: ChartLineUp, text: 'Tax planning & projections' },
  { icon: ShieldCheck, text: 'IRS representation' },
]

const pricingTiers = [
  {
    name: 'Starter',
    price: '$349',
    description: 'For sole proprietors & freelancers',
    features: [
      'Schedule C preparation',
      'Basic expense categorization',
      'Quarterly tax estimates',
      'Federal & state filing',
      'Email support',
    ],
    color: 'from-gray-500 to-gray-600',
  },
  {
    name: 'Business',
    price: '$599',
    description: 'For LLCs & partnerships',
    features: [
      'Partnership/LLC returns',
      'K-1 preparation',
      'Full expense analysis',
      'Multi-state filing',
      'Dedicated accountant',
      'Phone support',
    ],
    popular: true,
    color: 'from-brand-blue to-brand-gold',
  },
  {
    name: 'Enterprise',
    price: '$999+',
    description: 'For corporations & complex entities',
    features: [
      'S-Corp or C-Corp returns',
      'Payroll tax filing',
      'Year-round planning',
      'Audit representation',
      'CFO advisory services',
      'Priority support',
    ],
    color: 'from-purple-500 to-pink-500',
  },
]

const benefits = [
  { value: '2,500+', label: 'Businesses Served' },
  { value: '$45K', label: 'Avg Tax Savings' },
  { value: '100%', label: 'Compliance Rate' },
  { value: '24/7', label: 'Support Available' },
]

export default function BusinessTaxPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-brand-blue via-brand-blue-light to-brand-blue dark:from-brand-blue-dark dark:via-brand-blue dark:to-brand-blue-dark overflow-hidden">
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
                <Buildings weight="fill" className="w-4 h-4" />
                Business Tax Services
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                Expert Tax Solutions for <span className="text-brand-gold">Your Business</span>
              </h1>
              <p className="text-xl text-white/90 mb-8">
                From startups to established corporations, we provide comprehensive tax services
                that save you money and keep you compliant.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/book-appointment">
                  <Button size="xl" className="bg-brand-gold hover:bg-brand-gold-dark text-white" rightIcon={<ArrowRight weight="bold" />}>
                    Free Consultation
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="xl" variant="outline" className="border-white text-white hover:bg-white/10">
                    Contact Us
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-6">
                {[
                  { icon: CheckCircle, text: 'Tax Savings Guarantee' },
                  { icon: ShieldCheck, text: 'Audit Protection' },
                  { icon: Headset, text: 'Year-Round Support' },
                ].map((item) => (
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
                    <motion.div key={benefit.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.1 }} className="text-center">
                      <div className="text-4xl font-bold text-brand-gold mb-1">{benefit.value}</div>
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

      {/* Business Types */}
      <section className="py-24 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold mb-4">
              All Entity Types
            </span>
            <h2 className="text-4xl font-bold mb-4">
              We Serve <span className="gradient-text">Every Business</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              No matter your business structure, our experts have you covered.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {businessTypes.map((type, index) => (
              <motion.div key={type.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Card hover className="p-6 h-full text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-gold flex items-center justify-center">
                    <type.icon weight="fill" className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{type.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gray-50 dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold mb-4">
              Full Service
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Comprehensive <span className="gradient-text">Tax Services</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div key={feature.text} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Card hover className="p-6 h-full">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                      <feature.icon weight="bold" className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-medium">{feature.text}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold mb-4">
              Pricing
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Transparent <span className="gradient-text">Business Pricing</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div key={tier.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Card hover className={`relative overflow-hidden h-full ${tier.popular ? 'ring-2 ring-brand-gold shadow-xl' : ''}`}>
                  {tier.popular && (
                    <div className="absolute top-0 left-0 right-0 py-2 bg-gradient-to-r from-brand-blue to-brand-gold text-white text-center text-sm font-bold">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className={tier.popular ? 'pt-12' : ''}>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}>
                      <Buildings weight="bold" className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>{tier.name}</CardTitle>
                    <div className="flex items-baseline gap-1 mt-4">
                      <span className="text-5xl font-bold gradient-text">{tier.price}</span>
                      <span className="text-gray-500">/year</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">{tier.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle weight="fill" className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/book-appointment">
                      <Button variant={tier.popular ? 'primary' : 'outline'} glow={tier.popular} className="w-full">
                        Get Started
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-brand-blue to-brand-blue-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl" animate={{ y: [0, 50, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Optimize Your Business Taxes?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Schedule a free consultation and discover how much you could save.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-appointment">
                <Button size="xl" className="bg-brand-gold hover:bg-brand-gold-dark text-white" rightIcon={<ArrowRight weight="bold" />}>
                  Free Consultation
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
