import { Metadata } from 'next'
import { CheckCircle, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Button from '@/components/ui/Button'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Personal Tax Filing Services',
  description:
    'Expert individual tax preparation services. Maximize your refund with professional accountant support.',
}

const features = [
  'W-2 and 1099 income reporting',
  'Standard and itemized deductions',
  'Tax credit optimization',
  'State and federal e-filing',
  'Prior year amendments',
  'IRS audit support',
]

const pricingTiers = [
  {
    name: 'Basic',
    price: '$89',
    description: 'Perfect for simple W-2 filers',
    features: [
      'Single W-2 income',
      'Standard deduction',
      'Basic tax credits',
      'Federal e-filing',
      'Email support',
    ],
  },
  {
    name: 'Plus',
    price: '$149',
    description: 'For most taxpayers',
    features: [
      'Multiple income sources',
      'Itemized deductions',
      'All tax credits',
      'Federal & state e-filing',
      'Priority email support',
      'Live chat support',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    price: '$249',
    description: 'Complex tax situations',
    features: [
      'Everything in Plus',
      'Investment income',
      'Rental properties',
      'Self-employment income',
      'Dedicated accountant review',
      'Phone support',
    ],
  },
]

export default function PersonalTaxPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-light-bg-primary to-light-bg-secondary dark:from-dark-bg-primary dark:to-dark-bg-secondary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Personal <span className="gradient-text">Tax Filing</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Expert tax preparation for individuals. Get your maximum refund
              with confidence and peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" glow rightIcon={<ArrowRight weight="bold" />}>
                Start Your Return
              </Button>
              <Button size="xl" variant="outline">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">
            What's <span className="gradient-text">Included</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
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

      {/* Pricing Section */}
      <section className="py-24 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-4">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Choose the plan that fits your tax situation. All plans include our
            maximum refund guarantee.
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
            Ready to File Your Taxes?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients and get your maximum refund
            today.
          </p>
          <Button
            size="xl"
            variant="secondary"
            className="bg-white text-light-accent-primary hover:bg-gray-100"
          >
            Start Your Tax Return Now
          </Button>
        </div>
      </section>
    </div>
  )
}
