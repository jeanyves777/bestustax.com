import { Metadata } from 'next'
import { TaxCalculator } from '@/components/calculators/TaxCalculator'
import { CheckCircle, Info } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'Tax Refund Estimator | BestUsTax',
  description:
    'Estimate your federal tax refund for 2024. Free tax refund calculator with accurate 2024 tax brackets.',
}

const tips = [
  'Enter your total annual income from all sources',
  'Use the standard deduction unless you itemize',
  'Include all eligible tax credits',
  'Enter total federal tax withheld from your W-2s',
]

const faqs = [
  {
    question: 'How accurate is this tax refund calculator?',
    answer: 'Our calculator uses current 2024 federal tax brackets and provides a reasonable estimate. However, actual results may vary based on your complete tax situation. For the most accurate calculation, consult with a tax professional.',
  },
  {
    question: 'What is the standard deduction for 2024?',
    answer: 'For 2024, the standard deduction is $14,600 for single filers, $29,200 for married filing jointly, $14,600 for married filing separately, and $21,900 for head of household.',
  },
  {
    question: 'When can I expect my refund?',
    answer: 'If you e-file and choose direct deposit, you can typically receive your refund within 21 days of the IRS accepting your return. Paper returns may take 6-8 weeks.',
  },
  {
    question: 'What if I owe money instead of getting a refund?',
    answer: 'If your calculated result shows you owe taxes, consider adjusting your W-4 withholding with your employer. You can also make estimated quarterly payments to avoid owing at tax time.',
  },
]

export default function RefundEstimatorPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-light-bg-primary to-light-bg-secondary dark:from-dark-bg-primary dark:to-dark-bg-secondary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tax <span className="gradient-text">Refund Estimator</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Get a quick estimate of your federal tax refund using our free calculator.
              Updated with 2024 tax brackets.
            </p>
          </div>

          {/* Calculator */}
          <TaxCalculator />
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Info weight="fill" className="w-6 h-6 text-light-accent-primary dark:text-dark-accent-primary" />
              <h2 className="text-2xl font-bold">Tips for Accurate Estimates</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {tips.map((tip) => (
                <div
                  key={tip}
                  className="flex items-start gap-3 p-4 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg"
                >
                  <CheckCircle
                    weight="fill"
                    className="w-5 h-5 text-light-success dark:text-dark-success flex-shrink-0 mt-0.5"
                  />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="bg-white dark:bg-dark-bg-primary rounded-xl p-6"
                >
                  <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-3xl mx-auto">
            This calculator provides estimates for informational purposes only and should not be
            considered tax advice. Tax laws are complex and your actual tax situation may differ.
            Consult with a qualified tax professional for accurate tax filing.
          </p>
        </div>
      </section>
    </div>
  )
}
