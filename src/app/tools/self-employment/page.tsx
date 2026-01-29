'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { SelfEmploymentCalculator } from '@/components/calculators/SelfEmploymentCalculator'
import { CheckCircle, Info, CalendarCheck, ArrowRight, Calculator, House, Heart, PiggyBank, Car, Briefcase, Scales, Question, Headset } from '@phosphor-icons/react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const tips = [
  { text: 'Set aside 25-30% of your income for taxes', icon: PiggyBank },
  { text: 'Keep detailed records of all business expenses', icon: Briefcase },
  { text: 'Consider opening a SEP IRA to reduce taxable income', icon: PiggyBank },
  { text: 'Deduct your health insurance premiums', icon: Heart },
  { text: 'Track mileage for business use of your vehicle', icon: Car },
  { text: 'Pay quarterly to avoid penalties', icon: CalendarCheck },
]

const deadlines = [
  { quarter: 'Q1', period: 'Jan 1 - Mar 31', due: 'April 15, 2024', color: 'from-blue-500 to-cyan-500' },
  { quarter: 'Q2', period: 'Apr 1 - May 31', due: 'June 17, 2024', color: 'from-green-500 to-emerald-500' },
  { quarter: 'Q3', period: 'Jun 1 - Aug 31', due: 'Sept 16, 2024', color: 'from-purple-500 to-pink-500' },
  { quarter: 'Q4', period: 'Sep 1 - Dec 31', due: 'Jan 15, 2025', color: 'from-orange-500 to-red-500' },
]

const deductions = [
  { name: 'Home Office', description: 'Dedicated workspace in your home', icon: House, color: 'from-blue-500 to-cyan-500' },
  { name: 'Health Insurance', description: '100% deductible for self-employed', icon: Heart, color: 'from-red-500 to-pink-500' },
  { name: 'Retirement Contributions', description: 'SEP IRA, SIMPLE IRA, Solo 401(k)', icon: PiggyBank, color: 'from-green-500 to-emerald-500' },
  { name: 'Business Equipment', description: 'Computers, software, tools', icon: Briefcase, color: 'from-purple-500 to-violet-500' },
  { name: 'Vehicle Expenses', description: 'Mileage or actual expenses', icon: Car, color: 'from-orange-500 to-yellow-500' },
  { name: 'Professional Services', description: 'Legal, accounting, consulting', icon: Scales, color: 'from-indigo-500 to-blue-500' },
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
      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 dark:from-purple-800 dark:via-purple-700 dark:to-pink-700 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" animate={{ y: [0, 30, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" animate={{ y: [0, -30, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
        </div>

        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold mb-6">
              <Calculator weight="fill" className="w-4 h-4" />
              Free Tax Tool
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Self-Employment <span className="text-yellow-300">Tax Calculator</span>
            </h1>
            <p className="text-xl text-white/90">
              Calculate your self-employment tax, income tax, and quarterly estimated payments.
              For freelancers, independent contractors, and small business owners.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 48L60 56C120 64 240 80 360 80C480 80 600 64 720 56C840 48 960 48 1080 56C1200 64 1320 80 1380 88L1440 96V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V48Z" className="fill-gray-50 dark:fill-dark-bg-secondary" />
          </svg>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 bg-gray-50 dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <SelfEmploymentCalculator />
        </div>
      </section>

      {/* Quarterly Deadlines */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <CalendarCheck weight="fill" className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Quarterly Payment Deadlines</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              {deadlines.map((deadline, index) => (
                <motion.div key={deadline.quarter} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <Card hover className="p-4 text-center h-full relative overflow-hidden">
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${deadline.color}`} />
                    <div className={`w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br ${deadline.color} flex items-center justify-center`}>
                      <span className="text-white font-bold">{deadline.quarter}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{deadline.period}</div>
                    <div className="font-bold text-purple-600 dark:text-purple-400">
                      Due: {deadline.due}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-gray-50 dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-gold flex items-center justify-center">
                <Info weight="fill" className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Tips for Self-Employed Taxpayers</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tips.map((tip, index) => (
                <motion.div key={tip.text} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                  <Card hover className="p-4 h-full">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                        <tip.icon weight="fill" className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium">{tip.text}</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Common Deductions */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold mb-4">
              Reduce Your Taxes
            </span>
            <h2 className="text-3xl font-bold mb-4">
              Common <span className="gradient-text">Deductions</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {deductions.map((deduction, index) => (
              <motion.div key={deduction.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Card hover className="p-6 h-full">
                  <div className={`w-14 h-14 mb-4 rounded-2xl bg-gradient-to-br ${deduction.color} flex items-center justify-center`}>
                    <deduction.icon weight="fill" className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-1">{deduction.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{deduction.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold mb-4">FAQ</span>
              <h2 className="text-3xl font-bold">
                Frequently Asked <span className="gradient-text">Questions</span>
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div key={faq.question} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <Card hover className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Question weight="bold" className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-500">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Self-Employed? Get Expert Help</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Our tax professionals specialize in helping freelancers and business owners maximize deductions and minimize tax liability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100" rightIcon={<ArrowRight weight="bold" />}>
                  Get Expert Help
                </Button>
              </Link>
              <Link href="/book-appointment">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" leftIcon={<Headset weight="bold" />}>
                  Free Consultation
                </Button>
              </Link>
            </div>
          </motion.div>
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
