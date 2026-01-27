'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  User,
  Briefcase,
  ChartLine,
  ShieldCheck,
  BookOpen,
  ArrowRight,
} from '@phosphor-icons/react'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const services = [
  {
    id: 'personal-tax',
    title: 'Year-Round Personal Tax Filing',
    description:
      'Expert tax preparation for individuals. Maximize deductions and get your biggest refund.',
    icon: User,
    features: ['W-2 & 1099 Support', 'Deduction Optimization', 'E-Filing Included'],
    href: '/services/personal-tax',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'business-tax',
    title: 'Business Tax Solutions',
    description:
      'Comprehensive tax services for businesses of all sizes. Stay compliant and minimize tax liability.',
    icon: Briefcase,
    features: ['Corporate', 'Partnership', 'Non-profit', 'Quarterly Estimates', 'Multi-State Filing'],
    href: '/services/business-tax',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'tax-planning',
    title: 'Tax Planning',
    description:
      'Strategic tax planning to reduce your tax burden. Make informed financial decisions.',
    icon: ChartLine,
    features: ['Tax Strategy', 'Retirement Planning', 'Investment Advice'],
    href: '/services/tax-planning',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'audit-support',
    title: 'IRS Audit Support',
    description:
      'Professional representation and support during IRS audits. Navigate the process with confidence.',
    icon: ShieldCheck,
    features: ['Audit Defense', 'IRS Communication', 'Resolution Support'],
    href: '/services/audit-support',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'bookkeeping',
    title: 'Accounting and Bookkeeping Services',
    description:
      'Keep your financial records organized and accurate. Focus on growing your business.',
    icon: BookOpen,
    features: ['Monthly Reconciliation', 'Financial Reports', 'Payroll Support'],
    href: '/services/bookkeeping',
    color: 'from-indigo-500 to-blue-500',
  },
]

export function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-24 bg-white dark:bg-dark-bg-primary">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Tax Services</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comprehensive tax solutions tailored to your needs. From individual
            returns to complex business taxes, we've got you covered.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={service.href} className="block h-full">
                <Card
                  hover
                  animate3d
                  className="h-full perspective-1000 cursor-pointer group"
                >
                  <CardHeader>
                    <div className="mb-4">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <service.icon
                          weight="bold"
                          className="w-8 h-8 text-white"
                        />
                      </div>
                    </div>
                    <CardTitle className="group-hover:gradient-text transition-all">
                      {service.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-light-accent-primary dark:bg-dark-accent-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-2 text-light-accent-primary dark:text-dark-accent-primary font-medium group-hover:gap-4 transition-all">
                      Learn More
                      <ArrowRight
                        weight="bold"
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: services.length * 0.1 }}
          >
            <Card
              variant="glass"
              className="h-full bg-gradient-to-br from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-success p-8 flex flex-col items-center justify-center text-center text-white"
            >
              <h3 className="text-2xl font-bold mb-4">
                Not Sure Which Service You Need?
              </h3>
              <p className="mb-6 text-white/90">
                Get a free consultation with our tax experts to determine the
                best solution for your situation.
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-light-accent-primary hover:bg-gray-100"
              >
                Schedule Consultation
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
