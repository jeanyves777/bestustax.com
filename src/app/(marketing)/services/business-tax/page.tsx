import { Metadata } from 'next'
import { CheckCircle, ArrowRight, Buildings, ChartLineUp, Briefcase } from '@phosphor-icons/react/dist/ssr'
import Button from '@/components/ui/Button'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Business Tax Services | BestUsTax',
  description:
    'Expert business tax preparation for corporations, LLCs, partnerships, and sole proprietors. Maximize deductions and minimize tax liability.',
}

const features = [
  'Corporate tax returns (Form 1120)',
  'S-Corporation filings (Form 1120-S)',
  'Partnership returns (Form 1065)',
  'Sole proprietor Schedule C',
  'Quarterly estimated taxes',
  'Payroll tax compliance',
  'Multi-state tax filings',
  'Business expense optimization',
]

const pricingTiers = [
  {
    name: 'Sole Proprietor',
    price: '$299',
    description: 'For freelancers and self-employed',
    features: [
      'Schedule C preparation',
      'Expense categorization',
      'Home office deduction',
      'Quarterly tax estimates',
      'Email support',
    ],
    icon: Briefcase,
  },
  {
    name: 'LLC / Partnership',
    price: '$599',
    description: 'For multi-member entities',
    features: [
      'Form 1065 preparation',
      'K-1 schedules for all partners',
      'Pass-through deductions',
      'Federal & state filings',
      'Priority support',
      'Tax planning consultation',
    ],
    popular: true,
    icon: Buildings,
  },
  {
    name: 'Corporation',
    price: '$899',
    description: 'For S-Corps and C-Corps',
    features: [
      'Form 1120/1120-S preparation',
      'Shareholder K-1 schedules',
      'Reasonable salary analysis',
      'Multi-state compliance',
      'Dedicated accountant',
      'Year-round support',
    ],
    icon: ChartLineUp,
  },
]

const benefits = [
  {
    title: 'Maximize Deductions',
    description: 'Our CPAs identify every legitimate business deduction to reduce your tax burden.',
  },
  {
    title: 'Stay Compliant',
    description: 'We ensure your business meets all federal, state, and local tax requirements.',
  },
  {
    title: 'Strategic Planning',
    description: 'Proactive tax strategies to minimize liability and improve cash flow.',
  },
  {
    title: 'Expert Support',
    description: 'Year-round access to experienced business tax professionals.',
  },
]

export default function BusinessTaxPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-light-bg-primary to-light-bg-secondary dark:from-dark-bg-primary dark:to-dark-bg-secondary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-light-accent-primary/10 dark:bg-dark-accent-primary/10 rounded-full text-light-accent-primary dark:text-dark-accent-primary font-medium text-sm mb-6">
              <Buildings weight="fill" className="w-4 h-4" />
              Trusted by 10,000+ Businesses
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Business <span className="gradient-text">Tax Services</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Professional tax preparation for businesses of all sizes. From sole proprietors
              to corporations, we help you minimize taxes and maximize growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" glow rightIcon={<ArrowRight weight="bold" />}>
                Get Started Today
              </Button>
              <Button size="xl" variant="outline">
                Free Business Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-4">
            Why Choose <span className="gradient-text">BestUsTax</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            We understand the unique challenges businesses face during tax season.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit) => (
              <Card key={benefit.title} hover className="p-6">
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">
            Comprehensive <span className="gradient-text">Business Tax Solutions</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 p-4 bg-white dark:bg-dark-bg-primary rounded-lg"
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

      {/* Pricing Section */}
      <section className="py-24 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-4">
            Business Tax <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Transparent pricing based on your business structure. No hidden fees.
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
                  <div className="flex items-center gap-3 mb-2">
                    <tier.icon weight="fill" className="w-8 h-8 text-light-accent-primary dark:text-dark-accent-primary" />
                    <CardTitle>{tier.name}</CardTitle>
                  </div>
                  <div className="text-4xl font-bold gradient-text mt-4">
                    {tier.price}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {tier.description}
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
                    Get Started
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
            Ready to Optimize Your Business Taxes?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation with our business tax experts and discover how much you could save.
          </p>
          <Button
            size="xl"
            variant="secondary"
            className="bg-white text-light-accent-primary hover:bg-gray-100"
          >
            Schedule Free Consultation
          </Button>
        </div>
      </section>
    </div>
  )
}
