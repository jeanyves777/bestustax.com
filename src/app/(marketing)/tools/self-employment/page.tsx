import { Metadata } from 'next'
import { SelfEmploymentCalculator } from '@/components/calculators/SelfEmploymentCalculator'
import { CheckCircle, Info, CalendarCheck } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'Self-Employment Tax Calculator | BestUsTax',
  description:
    'Calculate your self-employment tax and quarterly estimated payments. Includes Social Security, Medicare, and income tax for freelancers and independent contractors.',
}

const tips = [
  'Set aside 25-30% of your income for taxes',
  'Keep detailed records of all business expenses',
  'Consider opening a SEP IRA to reduce taxable income',
  'Deduct your health insurance premiums',
  'Track mileage for business use of your vehicle',
  'Pay quarterly to avoid penalties',
]

const deadlines = [
  { quarter: 'Q1', period: 'Jan 1 - Mar 31', due: 'April 15, 2024' },
  { quarter: 'Q2', period: 'Apr 1 - May 31', due: 'June 17, 2024' },
  { quarter: 'Q3', period: 'Jun 1 - Aug 31', due: 'Sept 16, 2024' },
  { quarter: 'Q4', period: 'Sep 1 - Dec 31', due: 'Jan 15, 2025' },
]

const deductions = [
  { name: 'Home Office', description: 'Dedicated workspace in your home' },
  { name: 'Health Insurance', description: '100% deductible for self-employed' },
  { name: 'Retirement Contributions', description: 'SEP IRA, SIMPLE IRA, Solo 401(k)' },
  { name: 'Business Equipment', description: 'Computers, software, tools' },
  { name: 'Vehicle Expenses', description: 'Mileage or actual expenses' },
  { name: 'Professional Services', description: 'Legal, accounting, consulting' },
]

const faqs = [
  {
    question: 'What is self-employment tax?',
    answer: 'Self-employment tax is the Social Security and Medicare tax for people who work for themselves. It\'s 15.3% of your net earnings (12.4% Social Security up to the wage base, plus 2.9% Medicare on all earnings).',
  },
  {
    question: 'Do I have to pay estimated taxes quarterly?',
    answer: 'If you expect to owe $1,000 or more in taxes for the year, you\'re required to make quarterly estimated payments to avoid penalties. This includes both self-employment tax and income tax.',
  },
  {
    question: 'What is the SE tax deduction?',
    answer: 'You can deduct half of your self-employment tax when calculating your adjusted gross income. This reduces your income tax liability but does not reduce the SE tax itself.',
  },
  {
    question: 'How do I reduce my self-employment tax?',
    answer: 'Consider forming an S-Corporation if your net income exceeds $50,000-$60,000. With an S-Corp, you pay yourself a reasonable salary (subject to payroll taxes) and take remaining profits as distributions (not subject to SE tax).',
  },
]

export default function SelfEmploymentPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-light-bg-primary to-light-bg-secondary dark:from-dark-bg-primary dark:to-dark-bg-secondary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Self-Employment <span className="gradient-text">Tax Calculator</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Calculate your self-employment tax, income tax, and quarterly estimated payments.
              For freelancers, independent contractors, and small business owners.
            </p>
          </div>

          {/* Calculator */}
          <SelfEmploymentCalculator />
        </div>
      </section>

      {/* Quarterly Deadlines */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <CalendarCheck weight="fill" className="w-6 h-6 text-light-accent-primary dark:text-dark-accent-primary" />
              <h2 className="text-2xl font-bold">Quarterly Payment Deadlines</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              {deadlines.map((deadline) => (
                <div
                  key={deadline.quarter}
                  className="p-4 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg text-center"
                >
                  <div className="text-2xl font-bold gradient-text mb-1">{deadline.quarter}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{deadline.period}</div>
                  <div className="font-medium text-light-accent-primary dark:text-dark-accent-primary">
                    Due: {deadline.due}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Info weight="fill" className="w-6 h-6 text-light-accent-primary dark:text-dark-accent-primary" />
              <h2 className="text-2xl font-bold">Tips for Self-Employed Taxpayers</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tips.map((tip) => (
                <div
                  key={tip}
                  className="flex items-start gap-3 p-4 bg-white dark:bg-dark-bg-primary rounded-lg"
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

      {/* Common Deductions */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Common <span className="gradient-text">Deductions</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {deductions.map((deduction) => (
                <div
                  key={deduction.name}
                  className="p-4 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg"
                >
                  <h3 className="font-bold text-light-accent-primary dark:text-dark-accent-primary mb-1">
                    {deduction.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {deduction.description}
                  </p>
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
            This calculator provides estimates for federal self-employment taxes only.
            State taxes and local taxes are not included. Your actual tax liability may differ.
            Consult with a qualified tax professional for accurate tax planning and filing.
          </p>
        </div>
      </section>
    </div>
  )
}
