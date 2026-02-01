import { Metadata } from 'next'
import { WithholdingCalculator } from '@/components/calculators/WithholdingCalculator'
import { CheckCircle, Info, Warning } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'W-4 Withholding Calculator | BestUsTax',
  description:
    'Calculate your paycheck withholding and take-home pay. Adjust your W-4 to avoid owing taxes or getting too large a refund.',
}

const tips = [
  'Review your withholding when you have major life changes',
  'Getting married? Update your W-4 with your employer',
  'Having a baby? Claim the child tax credit on your W-4',
  'Check withholding mid-year to avoid surprises',
]

const commonMistakes = [
  {
    mistake: 'Claiming too many allowances',
    consequence: 'You may owe money at tax time',
  },
  {
    mistake: 'Not updating after marriage',
    consequence: 'Withholding may not match your new tax situation',
  },
  {
    mistake: 'Ignoring multiple jobs',
    consequence: 'Combined income may push you into a higher bracket',
  },
  {
    mistake: 'Forgetting pre-tax deductions',
    consequence: 'Your withholding estimate may be too high',
  },
]

const faqs = [
  {
    question: 'What is a W-4 form?',
    answer: 'Form W-4 tells your employer how much federal income tax to withhold from your paycheck. You fill it out when you start a new job and should update it when your tax situation changes.',
  },
  {
    question: 'How do I update my W-4?',
    answer: 'Contact your HR or payroll department to request a new W-4 form. You can update it any time during the year—there\'s no limit on how often you can change it.',
  },
  {
    question: 'Should I claim allowances on my W-4?',
    answer: 'The 2020 W-4 form eliminated allowances. Instead, you now enter specific dollar amounts for credits, deductions, and additional income. Our calculator helps you determine the right amounts.',
  },
  {
    question: 'What if I have multiple jobs?',
    answer: 'If you have multiple jobs or your spouse works, you should use the IRS\'s Tax Withholding Estimator or check the "Multiple Jobs" box on your W-4 to ensure proper withholding.',
  },
]

export default function WithholdingPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-light-bg-primary to-light-bg-secondary dark:from-dark-bg-primary dark:to-dark-bg-secondary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              W-4 <span className="gradient-text">Withholding Calculator</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Calculate your paycheck withholding and take-home pay. Make sure you're
              not withholding too much or too little.
            </p>
          </div>

          {/* Calculator */}
          <WithholdingCalculator />
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Info weight="fill" className="w-6 h-6 text-light-accent-primary dark:text-dark-accent-primary" />
              <h2 className="text-2xl font-bold">Withholding Tips</h2>
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

      {/* Common Mistakes Section */}
      <section className="py-16 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Warning weight="fill" className="w-6 h-6 text-light-warning dark:text-dark-warning" />
              <h2 className="text-2xl font-bold">Common Mistakes to Avoid</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {commonMistakes.map((item) => (
                <div
                  key={item.mistake}
                  className="p-4 bg-white dark:bg-dark-bg-primary rounded-lg border-l-4 border-light-warning dark:border-dark-warning"
                >
                  <h3 className="font-bold text-light-error dark:text-dark-error mb-1">
                    {item.mistake}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.consequence}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-xl p-6"
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
      <section className="py-8 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-3xl mx-auto">
            This calculator provides estimates for informational purposes only. State and local taxes
            are not included. Your actual withholding may differ based on your specific W-4 elections
            and employer payroll settings. Consult with a tax professional for personalized advice.
          </p>
        </div>
      </section>
    </div>
  )
}
