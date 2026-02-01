import { Metadata } from 'next'
import { CheckCircle, ArrowRight, ShieldCheck, Clock, UserCircle, Calendar } from '@phosphor-icons/react/dist/ssr'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Link from 'next/link'

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

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Maximum Refund Guarantee',
    description: 'We find every deduction and credit you deserve.',
  },
  {
    icon: UserCircle,
    title: 'Expert Tax Advisors',
    description: 'Work with licensed CPAs and Enrolled Agents.',
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description: 'Most returns completed within 48 hours.',
  },
  {
    icon: Calendar,
    title: 'Year-Round Support',
    description: 'Tax questions answered any time of year.',
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
            We make tax filing simple, accurate, and stress-free.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit) => (
              <Card key={benefit.title} hover className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-success flex items-center justify-center">
                  <benefit.icon weight="fill" className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">
            What's <span className="gradient-text">Included</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
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

      {/* Book Appointment Section */}
      <section className="py-24 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <Card className="max-w-4xl mx-auto p-8 md:p-12 text-center bg-gradient-to-r from-light-accent-primary/10 to-light-success/10">
            <Calendar weight="fill" className="w-16 h-16 mx-auto text-light-accent-primary dark:text-dark-accent-primary mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Schedule Your Free Consultation
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Book a free appointment with one of our tax experts. We'll review your situation
              and create a personalized plan to maximize your refund.
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
            Ready to File Your Taxes?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients and get your maximum refund
            today. Schedule your free consultation now.
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
