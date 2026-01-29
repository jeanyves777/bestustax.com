'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Info, ArrowRight, Calculator, TrendUp, ChartLineUp, Headset, Question } from '@phosphor-icons/react'
import Button from '@/components/ui/Button'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

const singleBrackets = [
  { rate: '10%', range: '$0 - $11,600', tax: '10% of taxable income' },
  { rate: '12%', range: '$11,601 - $47,150', tax: '$1,160 + 12% of amount over $11,600' },
  { rate: '22%', range: '$47,151 - $100,525', tax: '$5,426 + 22% of amount over $47,150' },
  { rate: '24%', range: '$100,526 - $191,950', tax: '$17,168.50 + 24% of amount over $100,525' },
  { rate: '32%', range: '$191,951 - $243,725', tax: '$39,110.50 + 32% of amount over $191,950' },
  { rate: '35%', range: '$243,726 - $609,350', tax: '$55,678.50 + 35% of amount over $243,725' },
  { rate: '37%', range: '$609,351+', tax: '$183,647.25 + 37% of amount over $609,350' },
]

const marriedJointBrackets = [
  { rate: '10%', range: '$0 - $23,200', tax: '10% of taxable income' },
  { rate: '12%', range: '$23,201 - $94,300', tax: '$2,320 + 12% of amount over $23,200' },
  { rate: '22%', range: '$94,301 - $201,050', tax: '$10,852 + 22% of amount over $94,300' },
  { rate: '24%', range: '$201,051 - $383,900', tax: '$34,337 + 24% of amount over $201,050' },
  { rate: '32%', range: '$383,901 - $487,450', tax: '$78,221 + 32% of amount over $383,900' },
  { rate: '35%', range: '$487,451 - $731,200', tax: '$111,357 + 35% of amount over $487,450' },
  { rate: '37%', range: '$731,201+', tax: '$196,669.50 + 37% of amount over $731,200' },
]

const headOfHouseholdBrackets = [
  { rate: '10%', range: '$0 - $16,550', tax: '10% of taxable income' },
  { rate: '12%', range: '$16,551 - $63,100', tax: '$1,655 + 12% of amount over $16,550' },
  { rate: '22%', range: '$63,101 - $100,500', tax: '$7,241 + 22% of amount over $63,100' },
  { rate: '24%', range: '$100,501 - $191,950', tax: '$15,469 + 24% of amount over $100,500' },
  { rate: '32%', range: '$191,951 - $243,700', tax: '$37,417 + 32% of amount over $191,950' },
  { rate: '35%', range: '$243,701 - $609,350', tax: '$53,977 + 35% of amount over $243,700' },
  { rate: '37%', range: '$609,351+', tax: '$181,954.50 + 37% of amount over $609,350' },
]

const standardDeductions = [
  { status: 'Single', amount: '$14,600', increase: '+$750 from 2023', color: 'from-blue-500 to-cyan-500' },
  { status: 'Married Filing Jointly', amount: '$29,200', increase: '+$1,500 from 2023', color: 'from-green-500 to-emerald-500' },
  { status: 'Married Filing Separately', amount: '$14,600', increase: '+$750 from 2023', color: 'from-purple-500 to-pink-500' },
  { status: 'Head of Household', amount: '$21,900', increase: '+$1,100 from 2023', color: 'from-orange-500 to-red-500' },
]

const capitalGainsRates = [
  { rate: '0%', single: '$0 - $47,025', married: '$0 - $94,050' },
  { rate: '15%', single: '$47,026 - $518,900', married: '$94,051 - $583,750' },
  { rate: '20%', single: '$518,901+', married: '$583,751+' },
]

const additionalInfo = [
  { title: 'FICA Tax', description: 'Social Security (6.2% up to $168,600) + Medicare (1.45%)', icon: Calculator },
  { title: 'Additional Medicare Tax', description: '0.9% on income over $200,000 (single) or $250,000 (married)', icon: TrendUp },
  { title: 'Net Investment Income Tax', description: '3.8% on investment income for high earners', icon: ChartLineUp },
  { title: 'Alternative Minimum Tax', description: 'Exemption: $85,700 (single), $133,300 (married)', icon: Info },
]

function BracketTable({ brackets, title, color }: { brackets: typeof singleBrackets; title: string; color: string }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className={`bg-gradient-to-r ${color}`}>
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-dark-bg-secondary">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Rate</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Taxable Income</th>
              <th className="px-4 py-3 text-left text-sm font-semibold hidden md:table-cell">Tax Calculation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {brackets.map((bracket, index) => (
              <motion.tr
                key={bracket.rate + bracket.range}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 dark:hover:bg-dark-bg-secondary transition-colors"
              >
                <td className="px-4 py-3">
                  <span className="font-bold text-brand-blue dark:text-brand-gold text-lg">
                    {bracket.rate}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium">{bracket.range}</td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hidden md:table-cell">
                  {bracket.tax}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}

export default function TaxBracketsPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-brand-blue via-brand-blue-light to-brand-blue dark:from-brand-blue-dark dark:via-brand-blue dark:to-brand-blue-dark overflow-hidden">
        <div className="absolute inset-0">
          <motion.div className="absolute top-10 left-10 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl" animate={{ y: [0, 30, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" animate={{ y: [0, -30, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
        </div>

        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold mb-6">
              <ChartLineUp weight="fill" className="w-4 h-4" />
              2024 Tax Information
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              2024 Federal <span className="text-brand-gold">Tax Brackets</span>
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Complete guide to federal income tax rates for the 2024 tax year.
              Understand your marginal and effective tax rates.
            </p>
            <Link href="/tools/refund-estimator">
              <Button size="lg" className="bg-brand-gold hover:bg-brand-gold-dark text-white" rightIcon={<ArrowRight weight="bold" />}>
                Calculate Your Taxes
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 48L60 56C120 64 240 80 360 80C480 80 600 64 720 56C840 48 960 48 1080 56C1200 64 1320 80 1380 88L1440 96V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V48Z" className="fill-white dark:fill-dark-bg-primary" />
          </svg>
        </div>
      </section>

      {/* Standard Deductions */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold mb-4">
              Standard Deductions
            </span>
            <h2 className="text-3xl font-bold">
              2024 <span className="gradient-text">Standard Deductions</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {standardDeductions.map((item, index) => (
              <motion.div key={item.status} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Card hover className="p-6 text-center h-full relative overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`} />
                  <div className="text-3xl font-bold gradient-text mb-2">{item.amount}</div>
                  <div className="font-medium mb-1">{item.status}</div>
                  <div className="text-sm text-green-600 dark:text-green-400">{item.increase}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tax Bracket Tables */}
      <section className="py-16 bg-gray-50 dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold mb-4">
              Tax Rates
            </span>
            <h2 className="text-3xl font-bold mb-4">
              Federal Income <span className="gradient-text">Tax Rates</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The U.S. uses a progressive tax system. You only pay each rate on the income that falls
              within that bracket, not your entire income.
            </p>
          </motion.div>

          <div className="space-y-8 max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <BracketTable brackets={singleBrackets} title="Single Filers" color="from-blue-500 to-cyan-500" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <BracketTable brackets={marriedJointBrackets} title="Married Filing Jointly" color="from-green-500 to-emerald-500" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <BracketTable brackets={headOfHouseholdBrackets} title="Head of Household" color="from-purple-500 to-pink-500" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Capital Gains Rates */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold mb-4">
              Investment Income
            </span>
            <h2 className="text-3xl font-bold">
              Long-Term <span className="gradient-text">Capital Gains Rates</span>
            </h2>
          </motion.div>
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-brand-blue to-brand-gold text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Rate</th>
                      <th className="px-6 py-4 text-left font-semibold">Single</th>
                      <th className="px-6 py-4 text-left font-semibold">Married Filing Jointly</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {capitalGainsRates.map((rate, index) => (
                      <motion.tr key={rate.rate} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                        <td className="px-6 py-4">
                          <span className="font-bold text-brand-blue dark:text-brand-gold text-xl">
                            {rate.rate}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium">{rate.single}</td>
                        <td className="px-6 py-4 font-medium">{rate.married}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
              Long-term capital gains apply to assets held more than one year.
              Short-term gains are taxed as ordinary income.
            </p>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-gray-50 dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-brand-blue to-brand-gold flex items-center justify-center">
              <Info weight="fill" className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Additional Tax Information</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {additionalInfo.map((info, index) => (
              <motion.div key={info.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Card hover className="p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                      <info.icon weight="fill" className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-blue dark:text-brand-gold mb-1">
                        {info.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{info.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marginal vs Effective Rate */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold mb-4">
                Understanding Tax Rates
              </span>
              <h2 className="text-3xl font-bold">
                Marginal vs Effective <span className="gradient-text">Tax Rate</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <Card className="p-6 h-full border-t-4 border-brand-blue">
                  <h3 className="text-xl font-bold mb-4 text-brand-blue dark:text-brand-gold">
                    Marginal Tax Rate
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Your marginal tax rate is the rate you pay on your last dollar of income.
                    It's the highest tax bracket your income falls into.
                  </p>
                  <Card className="p-4 bg-gray-50 dark:bg-dark-bg-secondary">
                    <p className="text-sm">
                      <strong>Example:</strong> If you're single with $60,000 taxable income,
                      your marginal rate is 22%—but you don't pay 22% on all $60,000.
                    </p>
                  </Card>
                </Card>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <Card className="p-6 h-full border-t-4 border-brand-gold">
                  <h3 className="text-xl font-bold mb-4 text-brand-blue dark:text-brand-gold">
                    Effective Tax Rate
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Your effective tax rate is the average rate you pay across all your income.
                    It's your total tax divided by your total income.
                  </p>
                  <Card className="p-4 bg-gray-50 dark:bg-dark-bg-secondary">
                    <p className="text-sm">
                      <strong>Example:</strong> With $60,000 taxable income, your federal tax
                      is about $8,252—an effective rate of roughly 13.8%.
                    </p>
                  </Card>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-brand-blue to-brand-blue-dark">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-4">
              Calculate Your Tax Liability
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Use our free tax calculator to see exactly how much you'll owe or get back.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tools/refund-estimator">
                <Button size="lg" className="bg-brand-gold hover:bg-brand-gold-dark text-white" rightIcon={<ArrowRight weight="bold" />}>
                  Try Our Tax Calculator
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
    </div>
  )
}
