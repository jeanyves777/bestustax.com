import { Metadata } from 'next'
import { CheckCircle, ArrowRight, BookOpen, ChartBar, Receipt, CloudArrowUp, Calendar } from '@phosphor-icons/react/dist/ssr'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Bookkeeping Services | BestUsTax',
  description:
    'Professional bookkeeping services for small businesses. Keep your books accurate and tax-ready year-round.',
}

const services = [
  {
    title: 'Monthly Bookkeeping',
    description: 'Regular transaction categorization, reconciliation, and financial statements.',
    icon: BookOpen,
  },
  {
    title: 'Financial Reporting',
    description: 'Profit & loss statements, balance sheets, and cash flow reports.',
    icon: ChartBar,
  },
  {
    title: 'Expense Tracking',
    description: 'Receipt capture, expense categorization, and vendor management.',
    icon: Receipt,
  },
  {
    title: 'Cloud Accounting',
    description: 'QuickBooks, Xero, and FreshBooks setup and management.',
    icon: CloudArrowUp,
  },
]

const features = [
  'Transaction categorization',
  'Bank reconciliation',
  'Accounts payable management',
  'Accounts receivable tracking',
  'Payroll processing',
  'Financial statements',
  'Tax-ready reports',
  '1099 preparation',
]

const benefits = [
  { value: '10+', label: 'Hours Saved Weekly', description: 'Focus on growing your business' },
  { value: '99.9%', label: 'Accuracy Rate', description: 'Error-free financial records' },
  { value: '48hr', label: 'Turnaround Time', description: 'For monthly close' },
  { value: '0', label: 'Tax Surprises', description: 'Always prepared for tax season' },
]

const platforms = [
  'QuickBooks Online',
  'QuickBooks Desktop',
  'Xero',
  'FreshBooks',
  'Wave',
  'Sage',
]

export default function BookkeepingPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-light-bg-primary to-light-bg-secondary dark:from-dark-bg-primary dark:to-dark-bg-secondary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-light-accent-primary/10 dark:bg-dark-accent-primary/10 rounded-full text-light-accent-primary dark:text-dark-accent-primary font-medium text-sm mb-6">
              <BookOpen weight="fill" className="w-4 h-4" />
              Professional Bookkeeping
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Bookkeeping <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Keep your books accurate, organized, and tax-ready year-round.
              Focus on growing your business while we handle the numbers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-appointment">
                <Button size="xl" glow rightIcon={<ArrowRight weight="bold" />}>
                  Book Free Consultation
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="xl" variant="outline">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit) => (
              <div key={benefit.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {benefit.value}
                </div>
                <div className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {benefit.label}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-4">
            What We <span className="gradient-text">Offer</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Comprehensive bookkeeping services tailored to your business needs.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {services.map((service) => (
              <Card key={service.title} hover className="p-6 text-center">
                <div className="p-4 mx-auto w-fit bg-light-accent-primary/10 dark:bg-dark-accent-primary/10 rounded-xl mb-4">
                  <service.icon weight="fill" className="w-8 h-8 text-light-accent-primary dark:text-dark-accent-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">
            Included <span className="gradient-text">Features</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 p-4 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg"
              >
                <CheckCircle
                  weight="fill"
                  className="w-6 h-6 text-light-success dark:text-dark-success flex-shrink-0"
                />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-16 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-center mb-8">
            Platforms We Work With
          </h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {platforms.map((platform) => (
              <div
                key={platform}
                className="px-6 py-3 bg-white dark:bg-dark-bg-primary rounded-lg font-medium text-gray-700 dark:text-gray-300"
              >
                {platform}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Appointment Section */}
      <section className="py-24 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <Card className="max-w-4xl mx-auto p-8 md:p-12 text-center bg-gradient-to-r from-light-accent-primary/10 to-light-success/10">
            <Calendar weight="fill" className="w-16 h-16 mx-auto text-light-accent-primary dark:text-dark-accent-primary mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Schedule Your Free Bookkeeping Consultation
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Book a free appointment to discuss your bookkeeping needs. We'll analyze your
              situation and create a customized plan for your business.
            </p>
            <Link href="/book-appointment">
              <Button size="lg" glow rightIcon={<ArrowRight weight="bold" />}>
                Book Appointment Now
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-success">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Your Books in Order?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation and see how clean books can transform your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-appointment">
              <Button
                size="xl"
                variant="secondary"
                className="bg-white text-light-accent-primary hover:bg-gray-100"
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
