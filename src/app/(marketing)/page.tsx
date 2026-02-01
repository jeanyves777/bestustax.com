import { HeroSection } from '@/components/home/HeroSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { TaxCalculator } from '@/components/calculators/TaxCalculator'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Tax Calculator Section */}
      <section className="py-24 bg-light-bg-secondary dark:bg-brand-blue-dark">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-blue dark:text-white">
              Estimate Your <span className="text-brand-gold">Tax Refund</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Use our advanced tax calculator to get an instant estimate of your
              federal tax refund or amount owed.
            </p>
          </div>
          <TaxCalculator />
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-24 bg-white dark:bg-brand-blue">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-blue dark:text-white">
              Why Choose <span className="text-brand-gold">BestUSTax</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join thousands of satisfied clients who trust us with their taxes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-brand-blue dark:text-brand-gold mb-2">50K+</div>
              <div className="text-gray-600 dark:text-gray-300">
                Happy Clients
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-brand-blue dark:text-brand-gold mb-2">$2.5B+</div>
              <div className="text-gray-600 dark:text-gray-300">
                Refunds Processed
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-brand-blue dark:text-brand-gold mb-2">4.9/5</div>
              <div className="text-gray-600 dark:text-gray-300">
                Average Rating
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-brand-blue dark:text-brand-gold mb-2">15+</div>
              <div className="text-gray-600 dark:text-gray-300">
                Years of Excellence
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-blue dark:bg-brand-blue-dark">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Maximize Your Tax Refund?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation with our tax experts and discover how we can help
            you get the maximum refund you deserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-appointment">
              <button className="px-8 py-4 bg-brand-gold text-white rounded-lg font-bold text-lg hover:bg-brand-gold-dark transition-colors shadow-lg">
                Book Free Consultation
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white/10 transition-colors">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
