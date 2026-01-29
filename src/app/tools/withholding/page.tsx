'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { WithholdingCalculator } from '@/components/calculators/WithholdingCalculator'
import { CheckCircle, Info, Warning, ArrowRight, Calculator, Question, Headset } from '@phosphor-icons/react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const tips = [
  { text: 'Review your withholding when you have major life changes', icon: CheckCircle },
  { text: 'Getting married? Update your W-4 with your employer', icon: CheckCircle },
  { text: 'Having a baby? Claim the child tax credit on your W-4', icon: CheckCircle },
  { text: 'Check withholding mid-year to avoid surprises', icon: CheckCircle },
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
      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-br from-brand-blue via-brand-blue-light to-brand-blue dark:from-brand-blue-dark dark:via-brand-blue dark:to-brand-blue-dark overflow-hidden">
        <div className="absolute inset-0">
          <motion.div className="absolute top-10 left-10 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl" animate={{ y: [0, 30, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" animate={{ y: [0, -30, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
        </div>

        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold mb-6">
              <Calculator weight="fill" className="w-4 h-4" />
              Free Tax Tool
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              W-4 <span className="text-brand-gold">Withholding Calculator</span>
            </h1>
            <p className="text-xl text-white/90">
              Calculate your paycheck withholding and take-home pay. Make sure you're
              not withholding too much or too little.
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
          <WithholdingCalculator />
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-gold flex items-center justify-center">
                <Info weight="fill" className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Withholding Tips</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {tips.map((tip, index) => (
                <motion.div key={tip.text} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <Card hover className="p-4 h-full">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                        <tip.icon weight="fill" className="w-5 h-5 text-green-600" />
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

      {/* Common Mistakes Section */}
      <section className="py-16 bg-gray-50 dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <Warning weight="fill" className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Common Mistakes to Avoid</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {commonMistakes.map((item, index) => (
                <motion.div key={item.mistake} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <Card className="p-4 h-full border-l-4 border-yellow-500">
                    <h3 className="font-bold text-red-600 dark:text-red-400 mb-1">
                      {item.mistake}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.consequence}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
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
                      <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Question weight="bold" className="w-4 h-4 text-brand-blue" />
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
      <section className="py-16 bg-gradient-to-r from-brand-blue to-brand-blue-dark">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Need Help With Your W-4?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Our tax professionals can help you optimize your withholding and avoid surprises at tax time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-brand-gold hover:bg-brand-gold-dark text-white" rightIcon={<ArrowRight weight="bold" />}>
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
            This calculator provides estimates for informational purposes only. State and local taxes
            are not included. Your actual withholding may differ based on your specific W-4 elections
            and employer payroll settings. Consult with a tax professional for personalized advice.
          </p>
        </div>
      </section>
    </div>
  )
}
