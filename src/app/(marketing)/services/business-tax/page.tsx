import { Metadata } from 'next'
import { CheckCircle, ArrowRight, Buildings, Calendar } from '@phosphor-icons/react/dist/ssr'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Link from 'next/link'

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

const businessTypes = [
  {
    title: 'Sole Proprietors',
    description: 'Schedule C preparation, expense categorization, home office deductions, and quarterly tax estimates.',
  },
  {
    title: 'LLCs & Partnerships',
    description: 'Form 1065 preparation, K-1 schedules for all partners, and pass-through deduction optimization.',
  },
  {
    title: 'S-Corporations',
    description: 'Form 1120-S preparation, shareholder K-1s, reasonable salary analysis, and multi-state compliance.',
  },
  {
    title: 'C-Corporations',
    description: 'Form 1120 preparation, corporate tax planning, and strategic business structure optimization.',
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

      {/* Business Types Section */}
      <section className="py-24 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-4">
            We Serve <span className="gradient-text">All Business Types</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Expert tax services tailored to your business structure.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {businessTypes.map((type) => (
              <Card key={type.title} hover className="p-6">
                <h3 className="text-xl font-bold mb-3 text-light-accent-primary dark:text-dark-accent-primary">{type.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{type.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">
            Comprehensive <span className="gradient-text">Business Tax Solutions</span>
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

      {/* Book Appointment Section */}
      <section className="py-24 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <Card className="max-w-4xl mx-auto p-8 md:p-12 text-center bg-gradient-to-r from-light-accent-primary/10 to-light-success/10">
            <Calendar weight="fill" className="w-16 h-16 mx-auto text-light-accent-primary dark:text-dark-accent-primary mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Schedule Your Free Business Consultation
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Book a free appointment with our business tax experts. We'll analyze your
              situation and develop a tax strategy tailored to your business needs.
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
            Ready to Optimize Your Business Taxes?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation with our business tax experts and discover how much you could save.
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
