'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  CheckCircle,
  ArrowRight,
  Strategy,
  TrendUp,
  ShieldCheck,
  Calendar,
  ChartLineUp,
  Wallet,
  House,
  PiggyBank,
  Headset,
  Lightning
} from '@phosphor-icons/react'
import Button from '@/components/ui/Button'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

const strategies = [
  { title: 'Income Timing', description: 'Optimize when you receive income to minimize tax impact across years.', icon: Calendar, color: 'from-blue-500 to-cyan-500' },
  { title: 'Investment Tax Efficiency', description: 'Asset location and tax-loss harvesting to maximize after-tax returns.', icon: TrendUp, color: 'from-green-500 to-emerald-500' },
  { title: 'Retirement Planning', description: 'Strategic contributions to 401(k), IRA, and other tax-advantaged accounts.', icon: PiggyBank, color: 'from-purple-500 to-pink-500' },
  { title: 'Entity Optimization', description: 'Choose the right business structure for maximum tax efficiency.', icon: Strategy, color: 'from-orange-500 to-red-500' },
  { title: 'Real Estate Strategies', description: 'Depreciation, 1031 exchanges, and rental income optimization.', icon: House, color: 'from-amber-500 to-yellow-500' },
  { title: 'Wealth Transfer', description: 'Estate and gift tax planning for generational wealth.', icon: Wallet, color: 'from-indigo-500 to-violet-500' },
]

const pricingTiers = [
  {
    name: 'Annual Review',
    price: '$499',
    description: 'One-time comprehensive review',
    features: ['Full tax situation analysis', 'Written recommendations report', 'One strategy session', 'Implementation guidance', '30-day email support'],
    color: 'from-gray-500 to-gray-600',
  },
  {
    name: 'Quarterly Planning',
    price: '$1,499',
    per: '/year',
    description: 'Ongoing optimization',
    features: ['Quarterly tax projections', 'Strategy adjustments', 'Four planning sessions', 'Tax law updates', 'Priority support', 'Mid-year review'],
    popular: true,
    color: 'from-brand-blue to-brand-gold',
  },
  {
    name: 'Comprehensive',
    price: '$3,499',
    per: '/year',
    description: 'Full-service planning',
    features: ['Everything in Quarterly', 'Monthly check-ins', 'Investment tax analysis', 'Estate planning coordination', 'Business entity optimization', 'Dedicated tax advisor'],
    color: 'from-purple-500 to-pink-500',
  },
]

const results = [
  { metric: '$47K', label: 'Average Tax Savings', icon: Wallet },
  { metric: '28%', label: 'Rate Reduction', icon: TrendUp },
  { metric: '500+', label: 'Strategies Used', icon: Strategy },
  { metric: '98%', label: 'Client Retention', icon: ShieldCheck },
]

export default function TaxPlanningPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-brand-blue via-brand-blue-light to-brand-blue dark:from-brand-blue-dark dark:via-brand-blue dark:to-brand-blue-dark overflow-hidden">
        <div className="absolute inset-0">
          <motion.div className="absolute top-20 left-10 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl" animate={{ y: [0, 30, 0], x: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" animate={{ y: [0, -30, 0], x: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold mb-6">
                <Strategy weight="fill" className="w-4 h-4" />
                Tax Planning Services
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                Strategic <span className="text-brand-gold">Tax Planning</span>
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Don't just file taxes—plan for them. Our proactive strategies help you keep more of what you earn, legally and ethically.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/book-appointment">
                  <Button size="xl" className="bg-brand-gold hover:bg-brand-gold-dark text-white" rightIcon={<ArrowRight weight="bold" />}>
                    Free Consultation
                  </Button>
                </Link>
                <Link href="/tools/refund-estimator">
                  <Button size="xl" variant="outline" className="border-white text-white hover:bg-white/10">
                    Calculate Savings
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-6">
                {[{ icon: CheckCircle, text: 'Proactive Strategies' }, { icon: Lightning, text: 'Year-Round Service' }, { icon: Headset, text: 'Dedicated Advisor' }].map((item) => (
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
                  {results.map((result, index) => (
                    <motion.div key={result.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.1 }} className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-white/10 flex items-center justify-center">
                        <result.icon weight="fill" className="w-6 h-6 text-brand-gold" />
                      </div>
                      <div className="text-3xl font-bold text-white mb-1">{result.metric}</div>
                      <div className="text-white/70 text-sm">{result.label}</div>
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

      {/* Strategies */}
      <section className="py-24 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold mb-4">
              Our Strategies
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Proven <span className="gradient-text">Tax Reduction</span> Strategies
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We analyze your complete financial picture to develop customized strategies.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {strategies.map((strategy, index) => (
              <motion.div key={strategy.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Card hover className="p-6 h-full">
                  <div className={`w-14 h-14 mb-4 rounded-2xl bg-gradient-to-br ${strategy.color} flex items-center justify-center`}>
                    <strategy.icon weight="fill" className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{strategy.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{strategy.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-gray-50 dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold mb-4">
              Pricing
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Investment in <span className="gradient-text">Your Future</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Tax planning typically pays for itself many times over in savings.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div key={tier.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Card hover className={`relative overflow-hidden h-full ${tier.popular ? 'ring-2 ring-brand-gold shadow-xl' : ''}`}>
                  {tier.popular && <div className="absolute top-0 left-0 right-0 py-2 bg-gradient-to-r from-brand-blue to-brand-gold text-white text-center text-sm font-bold">Best Value</div>}
                  <CardHeader className={tier.popular ? 'pt-12' : ''}>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}>
                      <Strategy weight="bold" className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>{tier.name}</CardTitle>
                    <div className="flex items-baseline gap-1 mt-4">
                      <span className="text-5xl font-bold gradient-text">{tier.price}</span>
                      {tier.per && <span className="text-gray-500">{tier.per}</span>}
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
                      <Button variant={tier.popular ? 'primary' : 'outline'} glow={tier.popular} className="w-full">Get Started</Button>
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Start Saving on Taxes Today</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              The best time to start tax planning was yesterday. The second best time is now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-appointment">
                <Button size="xl" className="bg-brand-gold hover:bg-brand-gold-dark text-white" rightIcon={<ArrowRight weight="bold" />}>
                  Free Consultation
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="xl" variant="outline" className="border-white text-white hover:bg-white/10">Contact Us</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
