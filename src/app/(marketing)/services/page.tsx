import { Metadata } from 'next'
import Link from 'next/link'
import {
  User,
  Briefcase,
  ChartLine,
  ShieldCheck,
  BookOpen,
  ArrowRight,
} from '@phosphor-icons/react/dist/ssr'
import Button from '@/components/ui/Button'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Our Services | BestUSTax',
  description:
    'Comprehensive tax services including individual and business tax filing, tax planning, audit support, and bookkeeping.',
}

const services = [
  {
    id: 'personal-tax',
    title: 'Best Individual Tax',
    description:
      'Expert tax preparation for individuals. Maximize deductions and get your biggest refund.',
    icon: User,
    features: ['W-2 & 1099 Support', 'Deduction Optimization', 'E-Filing Included'],
    href: '/services/personal-tax',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'business-tax',
    title: 'Best Business Tax',
    description:
      'Comprehensive tax services for businesses of all sizes. Stay compliant and minimize tax liability.',
    icon: Briefcase,
    features: ['Corporate', 'Partnership', 'Multi-State Filing'],
    href: '/services/business-tax',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'tax-planning',
    title: 'Best Tax Planning',
    description:
      'Strategic tax planning to reduce your tax burden. Make informed financial decisions.',
    icon: ChartLine,
    features: ['Tax Strategy', 'Retirement Planning', 'Investment Advice'],
    href: '/services/tax-planning',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'audit-support',
    title: 'Best Audit Support',
    description:
      'Professional representation and support during IRS audits. Navigate the process with confidence.',
    icon: ShieldCheck,
    features: ['Audit Defense', 'IRS Communication', 'Resolution Support'],
    href: '/services/audit-support',
    color: 'from-orange-500 to-amber-600',
  },
  {
    id: 'bookkeeping',
    title: 'Best Bookkeeping',
    description:
      'Keep your financial records organized and accurate. Focus on growing your business.',
    icon: BookOpen,
    features: ['Monthly Reconciliation', 'Financial Reports', 'Payroll Support'],
    href: '/services/bookkeeping',
    color: 'from-indigo-500 to-blue-500',
  },
]

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-to-br from-light-bg-primary to-light-bg-secondary dark:from-dark-bg-primary dark:to-dark-bg-secondary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Comprehensive tax solutions tailored to your needs. From individual
              returns to complex business taxes, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link key={service.id} href={service.href} className="block h-full">
                <Card hover className="h-full cursor-pointer group">
                  <CardHeader>
                    <div className="mb-4">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <service.icon weight="bold" className="w-8 h-8 text-white" />
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
                      <ArrowRight weight="bold" className="w-5 h-5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-success">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation with one of our tax experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-appointment">
              <Button
                size="xl"
                variant="secondary"
                className="bg-white text-light-accent-primary hover:bg-gray-100"
                rightIcon={<ArrowRight weight="bold" />}
              >
                Book Free Consultation
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="xl"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
