'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CaretDown,
  MagnifyingGlass,
  Question,
  Calculator,
  FileText,
  Clock,
  CurrencyDollar,
  Shield,
  Users,
  Headset
} from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Link from 'next/link'

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

const categories = [
  { id: 'all', label: 'All Questions', icon: Question },
  { id: 'filing', label: 'Tax Filing', icon: FileText },
  { id: 'pricing', label: 'Pricing & Payments', icon: CurrencyDollar },
  { id: 'deadlines', label: 'Deadlines', icon: Clock },
  { id: 'refunds', label: 'Refunds', icon: Calculator },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'account', label: 'Account', icon: Users },
]

const faqs: FAQ[] = [
  // Tax Filing
  {
    id: '1',
    category: 'filing',
    question: 'What documents do I need to file my taxes?',
    answer: `To file your taxes, you'll typically need:

• W-2 forms from all employers
• 1099 forms for freelance/contract work, interest, dividends
• Social Security numbers for you and dependents
• Last year's tax return
• Records of deductible expenses (medical, charitable donations, etc.)
• Mortgage interest statement (Form 1098)
• Property tax records
• Investment statements

Our team will guide you through exactly what documents you need based on your specific situation.`,
  },
  {
    id: '2',
    category: 'filing',
    question: 'How long does it take to complete my tax return?',
    answer: `The time to complete your tax return depends on its complexity:

• Simple returns (W-2 only): 1-2 business days
• Moderate complexity: 3-5 business days
• Complex returns (business income, investments): 5-7 business days

Once we have all your documents, our advisors work efficiently to prepare your return while ensuring accuracy.`,
  },
  {
    id: '3',
    category: 'filing',
    question: 'Can you file state taxes as well as federal?',
    answer: `Yes! We file both federal and state tax returns. Our service covers all 50 states, and we're familiar with each state's specific tax requirements and deductions. State filing is included in our service packages at no additional cost.`,
  },
  {
    id: '4',
    category: 'filing',
    question: 'Do you handle amended returns?',
    answer: `Yes, we can prepare and file amended returns (Form 1040-X) if you need to correct a previously filed return. This might be needed if you:

• Discovered additional income
• Found additional deductions or credits
• Need to correct filing status
• Received corrected W-2 or 1099 forms

Our advisors will review your situation and determine if an amendment is beneficial.`,
  },

  // Pricing & Payments
  {
    id: '5',
    category: 'pricing',
    question: 'How much does your tax preparation service cost?',
    answer: `Our pricing is transparent and based on the complexity of your return:

• Basic (W-2 income only): Starting at $99
• Standard (multiple income sources): Starting at $199
• Premium (self-employed/business): Starting at $349

All packages include unlimited advisor support, accuracy guarantee, and audit protection. No hidden fees - the price quoted is what you pay.`,
  },
  {
    id: '6',
    category: 'pricing',
    question: 'Do you offer payment plans?',
    answer: `Yes! We offer flexible payment options:

• Pay from your refund - no upfront cost
• Split payments over 3 months
• Credit/debit card payment
• Bank transfer

There are no interest charges on our payment plans when you pay from your refund.`,
  },
  {
    id: '7',
    category: 'pricing',
    question: 'What is your refund guarantee?',
    answer: `We offer a Maximum Refund Guarantee - if you get a larger refund or smaller tax due from another tax preparation method using the same data, we'll refund your preparation fees AND pay you the difference, up to $100.

We're confident in our expertise and thoroughness in finding every deduction and credit you're entitled to.`,
  },

  // Deadlines
  {
    id: '8',
    category: 'deadlines',
    question: 'When is the tax filing deadline?',
    answer: `For most taxpayers, the federal tax filing deadline is April 15th. If this falls on a weekend or holiday, it's moved to the next business day.

Key dates to remember:
• January 31: W-2s and 1099s must be sent to taxpayers
• April 15: Federal tax filing deadline
• October 15: Extended filing deadline (if you filed for extension)

State deadlines may vary - our team will ensure you know all applicable deadlines.`,
  },
  {
    id: '9',
    category: 'deadlines',
    question: 'Can I get an extension to file my taxes?',
    answer: `Yes, you can file for an automatic 6-month extension (Form 4868), which moves your deadline to October 15th.

Important: An extension to file is NOT an extension to pay. You must estimate and pay any taxes owed by April 15th to avoid penalties and interest.

Our team can help you file for an extension and estimate your tax liability.`,
  },
  {
    id: '10',
    category: 'deadlines',
    question: 'What happens if I miss the tax deadline?',
    answer: `If you miss the deadline, you may face:

• Failure-to-file penalty: 5% of unpaid taxes per month (max 25%)
• Failure-to-pay penalty: 0.5% of unpaid taxes per month
• Interest charges on unpaid taxes

The sooner you file, the less you'll owe in penalties. Contact us immediately if you've missed the deadline - we can help minimize penalties and get you back on track.`,
  },

  // Refunds
  {
    id: '11',
    category: 'refunds',
    question: 'How long does it take to receive my refund?',
    answer: `Refund timing depends on how you file and receive:

• E-file with direct deposit: 7-21 days
• E-file with paper check: 3-4 weeks
• Paper filing with direct deposit: 6-8 weeks
• Paper filing with paper check: 8-12 weeks

We always recommend e-filing with direct deposit for the fastest refund. You can track your refund status using the IRS "Where's My Refund?" tool.`,
  },
  {
    id: '12',
    category: 'refunds',
    question: 'Why is my refund less than expected?',
    answer: `Several factors can reduce your refund:

• Offset for past-due taxes, student loans, or child support
• Errors on your return requiring adjustment
• Changes to tax law affecting deductions/credits
• Income not withheld properly

If your refund is offset, you'll receive a notice explaining the reduction. Our team can help you understand any discrepancies.`,
  },

  // Security
  {
    id: '13',
    category: 'security',
    question: 'How do you protect my personal information?',
    answer: `We take security seriously with multiple layers of protection:

• 256-bit SSL encryption for all data transmission
• SOC 2 Type II certified data centers
• Multi-factor authentication required
• Regular security audits and penetration testing
• Employee background checks and training
• Secure document upload portal

Your data is never sold or shared with third parties.`,
  },
  {
    id: '14',
    category: 'security',
    question: 'What if my identity is stolen during tax filing?',
    answer: `We provide Identity Theft Protection services:

• Real-time monitoring of your tax accounts
• Immediate alerts for suspicious activity
• Identity restoration assistance if needed
• IRS representation for identity theft cases

If you suspect identity theft, contact us immediately. We'll help you file Form 14039 (Identity Theft Affidavit) and resolve the issue.`,
  },

  // Account
  {
    id: '15',
    category: 'account',
    question: 'How do I create an account?',
    answer: `Creating an account is easy:

1. Click "Get Started" or "Sign Up" on our website
2. Enter your email address and create a password
3. Verify your email
4. Complete your profile information
5. Start your tax return!

You can also sign up using your Google account for faster access.`,
  },
  {
    id: '16',
    category: 'account',
    question: 'Can I access my previous years\' tax returns?',
    answer: `Yes! Once you create an account, you have access to:

• All tax returns we've prepared for you
• Historical documents you've uploaded
• Year-over-year comparison of your tax situation
• Downloadable PDF copies of all returns

Your tax history is securely stored for at least 7 years.`,
  },
  {
    id: '17',
    category: 'account',
    question: 'How do I contact my tax advisor?',
    answer: `You can reach your assigned tax advisor through multiple channels:

• Secure messaging in your client portal (24/7)
• Phone during business hours (M-F 8am-8pm, Sat 9am-5pm)
• Video call scheduling through your portal
• Email support

During tax season, we offer extended hours including Sundays.`,
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg-primary pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-dark-bg-secondary dark:to-dark-bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-400 mb-8"
            >
              Find answers to common questions about our tax services
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-xl mx-auto"
            >
              <Input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<MagnifyingGlass className="w-5 h-5" />}
                className="text-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Category Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <Card className="p-4 sticky top-24">
                <h3 className="font-semibold mb-4">Categories</h3>
                <nav className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-light-accent-primary/10 text-light-accent-primary'
                          : 'hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary'
                      }`}
                    >
                      <category.icon className="w-5 h-5" />
                      {category.label}
                    </button>
                  ))}
                </nav>
              </Card>
            </div>

            {/* FAQ List */}
            <div className="flex-1">
              {filteredFaqs.length === 0 ? (
                <Card className="p-12 text-center">
                  <Question weight="thin" className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 mb-4">No questions found matching your search</p>
                  <Button onClick={() => setSearchTerm('')}>Clear Search</Button>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredFaqs.map((faq) => (
                    <Card key={faq.id} className="overflow-hidden">
                      <button
                        onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                        className="w-full p-6 text-left flex items-center justify-between gap-4"
                      >
                        <h3 className="font-semibold pr-4">{faq.question}</h3>
                        <CaretDown
                          className={`w-5 h-5 flex-shrink-0 transition-transform ${
                            expandedId === faq.id ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {expandedId === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="px-6 pb-6 pt-0">
                              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-white dark:bg-dark-bg-secondary">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8 md:p-12 text-center bg-gradient-to-r from-light-accent-primary/10 to-light-accent-secondary/10">
            <Headset className="w-16 h-16 mx-auto text-light-accent-primary mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Our team of tax experts is ready to help. Contact us for personalized assistance
              with your specific tax situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" glow>
                  Contact Us
                </Button>
              </Link>
              <Link href="/book-appointment">
                <Button size="lg" variant="outline">
                  Schedule a Call
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
