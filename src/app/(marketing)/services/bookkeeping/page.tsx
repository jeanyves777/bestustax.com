import { Metadata } from 'next'
import { CheckCircle, ArrowRight, BookOpen, ChartBar, Receipt, CloudArrowUp } from '@phosphor-icons/react/dist/ssr'
import Button from '@/components/ui/Button'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

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
  },
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
              <Button size="xl" glow rightIcon={<ArrowRight weight="bold" />}>
                Start Free Trial
              </Button>
              <Button size="xl" variant="outline">
                See Pricing
              </Button>
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

      {/* Pricing Section */}
      <section className="py-24 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-4">
            Simple, Predictable <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Monthly plans that scale with your business. No hidden fees.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier) => (
              <Card
                key={tier.name}
                variant={tier.popular ? 'bordered' : 'default'}
                className={tier.popular ? 'relative' : ''}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-success rounded-full text-white text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold gradient-text">{tier.price}</span>
                    <span className="text-gray-600 dark:text-gray-400">{tier.per}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {tier.description}
                  </p>
                  <p className="text-sm font-medium text-light-accent-primary dark:text-dark-accent-primary mt-2">
                    {tier.transactions}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle
                          weight="fill"
                          className="w-5 h-5 text-light-success dark:text-dark-success flex-shrink-0 mt-0.5"
                        />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={tier.popular ? 'primary' : 'outline'}
                    glow={tier.popular}
                    className="w-full"
                  >
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-success">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Your Books in Order?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Start your free 14-day trial today. No credit card required.
            See how clean books can transform your business.
          </p>
          <Button
            size="xl"
            variant="secondary"
            className="bg-white text-light-accent-primary hover:bg-gray-100"
          >
            Start Free 14-Day Trial
          </Button>
        </div>
      </section>
    </div>
  )
}
