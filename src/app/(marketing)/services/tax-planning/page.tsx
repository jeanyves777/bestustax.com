import { Metadata } from 'next'
import { CheckCircle, ArrowRight, Strategy, TrendUp, ShieldCheck, Calendar } from '@phosphor-icons/react/dist/ssr'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tax Planning Services | BestUsTax',
  description:
    'Strategic tax planning to minimize your tax liability year-round. Proactive strategies for individuals and businesses.',
}

const strategies = [
  {
    title: 'Income Timing Strategies',
    description: 'Optimize when you receive income to minimize tax impact across tax years.',
    icon: Calendar,
  },
  {
    title: 'Investment Tax Efficiency',
    description: 'Asset location and tax-loss harvesting to maximize after-tax returns.',
    icon: TrendUp,
  },
  {
    title: 'Retirement Planning',
    description: 'Strategic contributions to 401(k), IRA, and other tax-advantaged accounts.',
    icon: Strategy,
  },
  {
    title: 'Entity Structure Optimization',
    description: 'Choose the right business structure (LLC, S-Corp, C-Corp) for tax efficiency.',
    icon: ShieldCheck,
  },
]

const services = [
  'Year-round tax optimization',
  'Quarterly tax projections',
  'Retirement contribution strategies',
  'Estate and gift tax planning',
  'Charitable giving strategies',
  'Real estate tax strategies',
  'Business succession planning',
  'Multi-state tax planning',
]

const results = [
  { metric: '$47K', label: 'Average Tax Savings', description: 'Per high-income client' },
  { metric: '28%', label: 'Effective Rate Reduction', description: 'Through strategic planning' },
  { metric: '500+', label: 'Strategies Implemented', description: 'This year alone' },
  { metric: '98%', label: 'Client Retention', description: 'Year over year' },
]

export default function TaxPlanningPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-light-bg-primary to-light-bg-secondary dark:from-dark-bg-primary dark:to-dark-bg-secondary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-light-accent-primary/10 dark:bg-dark-accent-primary/10 rounded-full text-light-accent-primary dark:text-dark-accent-primary font-medium text-sm mb-6">
              <Strategy weight="fill" className="w-4 h-4" />
              Proactive Tax Strategies
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Strategic <span className="gradient-text">Tax Planning</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Don't just file taxes—plan for them. Our proactive tax planning strategies help you
              keep more of what you earn, legally and ethically.
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

      {/* Results Section */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {results.map((result) => (
              <div key={result.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {result.metric}
                </div>
                <div className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {result.label}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {result.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategies Section */}
      <section className="py-24 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-4">
            Our <span className="gradient-text">Planning Approach</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            We analyze your complete financial picture to develop customized tax reduction strategies.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {strategies.map((strategy) => (
              <Card key={strategy.title} hover className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-light-accent-primary/10 dark:bg-dark-accent-primary/10 rounded-lg">
                    <strategy.icon weight="fill" className="w-8 h-8 text-light-accent-primary dark:text-dark-accent-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{strategy.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{strategy.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services List Section */}
      <section className="py-24 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">
            Planning <span className="gradient-text">Services</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {services.map((service) => (
              <div
                key={service}
                className="flex items-center gap-3 p-4 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg"
              >
                <CheckCircle
                  weight="fill"
                  className="w-6 h-6 text-light-success dark:text-dark-success flex-shrink-0"
                />
                <span className="font-medium">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Appointment Section */}
      <section className="py-24 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <Card className="max-w-4xl mx-auto p-8 md:p-12 text-center bg-gradient-to-r from-light-accent-primary/10 to-light-success/10">
            <Calendar weight="fill" className="w-16 h-16 mx-auto text-light-accent-primary dark:text-dark-accent-primary mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Schedule Your Free Tax Planning Session
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              The best time to start tax planning was yesterday. The second best time is now.
              Book a free consultation to discover how much you could save.
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
            Start Saving on Taxes Today
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Tax planning typically pays for itself many times over in tax savings.
            Schedule your free tax planning consultation today.
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
