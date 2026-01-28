'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, TrendUp, TrendDown, Equals } from '@phosphor-icons/react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

const filingStatuses = [
  { value: 'single', label: 'Single' },
  { value: 'married-joint', label: 'Married Filing Jointly' },
  { value: 'married-separate', label: 'Married Filing Separately' },
  { value: 'head-of-household', label: 'Head of Household' },
] as const

const payFrequencies = [
  { value: 'weekly', label: 'Weekly', periods: 52 },
  { value: 'biweekly', label: 'Bi-weekly', periods: 26 },
  { value: 'semimonthly', label: 'Semi-monthly', periods: 24 },
  { value: 'monthly', label: 'Monthly', periods: 12 },
] as const

type FilingStatus = typeof filingStatuses[number]['value']
type PayFrequency = typeof payFrequencies[number]['value']

interface WithholdingInput {
  filingStatus: FilingStatus
  payFrequency: PayFrequency
  grossPayPerPeriod: number
  additionalWithholding: number
  allowances: number
  pretaxDeductions: number
}

interface WithholdingResult {
  annualGross: number
  annualTaxableIncome: number
  annualFederalTax: number
  federalWithholdingPerPeriod: number
  socialSecurityPerPeriod: number
  medicarePerPeriod: number
  totalWithholdingPerPeriod: number
  takeHomePerPeriod: number
}

// 2024 Tax Brackets
const taxBrackets = {
  single: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
  'married-joint': [
    { min: 0, max: 23200, rate: 0.10 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383900, rate: 0.24 },
    { min: 383900, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: Infinity, rate: 0.37 },
  ],
  'married-separate': [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 365600, rate: 0.35 },
    { min: 365600, max: Infinity, rate: 0.37 },
  ],
  'head-of-household': [
    { min: 0, max: 16550, rate: 0.10 },
    { min: 16550, max: 63100, rate: 0.12 },
    { min: 63100, max: 100500, rate: 0.22 },
    { min: 100500, max: 191950, rate: 0.24 },
    { min: 191950, max: 243700, rate: 0.32 },
    { min: 243700, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
}

const standardDeductions: Record<FilingStatus, number> = {
  single: 14600,
  'married-joint': 29200,
  'married-separate': 14600,
  'head-of-household': 21900,
}

function calculateTax(income: number, filingStatus: FilingStatus): number {
  const brackets = taxBrackets[filingStatus]
  let tax = 0

  for (const bracket of brackets) {
    if (income > bracket.min) {
      const taxableInBracket = Math.min(income, bracket.max) - bracket.min
      tax += taxableInBracket * bracket.rate
    } else {
      break
    }
  }

  return tax
}

export function WithholdingCalculator() {
  const [input, setInput] = useState<WithholdingInput>({
    filingStatus: 'single',
    payFrequency: 'biweekly',
    grossPayPerPeriod: 3000,
    additionalWithholding: 0,
    allowances: 1,
    pretaxDeductions: 0,
  })

  const [result, setResult] = useState<WithholdingResult | null>(null)

  const handleCalculate = () => {
    const payPeriods = payFrequencies.find(p => p.value === input.payFrequency)?.periods || 26
    const annualGross = input.grossPayPerPeriod * payPeriods
    const annualPretax = input.pretaxDeductions * payPeriods
    const standardDeduction = standardDeductions[input.filingStatus]

    // Calculate taxable income
    const annualTaxableIncome = Math.max(0, annualGross - annualPretax - standardDeduction)

    // Calculate federal tax
    const annualFederalTax = calculateTax(annualTaxableIncome, input.filingStatus)
    const federalWithholdingPerPeriod = (annualFederalTax / payPeriods) + input.additionalWithholding

    // Social Security: 6.2% up to $168,600 (2024)
    const ssWageBase = 168600
    const annualSSWages = Math.min(annualGross, ssWageBase)
    const socialSecurityPerPeriod = (annualSSWages * 0.062) / payPeriods

    // Medicare: 1.45% (no wage base limit)
    const medicarePerPeriod = (annualGross * 0.0145) / payPeriods

    // Total withholding
    const totalWithholdingPerPeriod = federalWithholdingPerPeriod + socialSecurityPerPeriod + medicarePerPeriod + input.pretaxDeductions

    // Take home pay
    const takeHomePerPeriod = input.grossPayPerPeriod - totalWithholdingPerPeriod

    setResult({
      annualGross,
      annualTaxableIncome,
      annualFederalTax,
      federalWithholdingPerPeriod,
      socialSecurityPerPeriod,
      medicarePerPeriod,
      totalWithholdingPerPeriod,
      takeHomePerPeriod,
    })
  }

  const payFrequencyLabel = payFrequencies.find(p => p.value === input.payFrequency)?.label.toLowerCase() || 'pay period'

  return (
    <Card variant="elevated" className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-success flex items-center justify-center">
            <Calculator weight="bold" className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle>Withholding Calculator</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Calculate your paycheck withholding for 2024
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Filing Status */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Filing Status
            </label>
            <select
              value={input.filingStatus}
              onChange={(e) =>
                setInput({
                  ...input,
                  filingStatus: e.target.value as FilingStatus,
                })
              }
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary"
            >
              {filingStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          {/* Pay Frequency */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Pay Frequency
            </label>
            <select
              value={input.payFrequency}
              onChange={(e) =>
                setInput({
                  ...input,
                  payFrequency: e.target.value as PayFrequency,
                })
              }
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary"
            >
              {payFrequencies.map((freq) => (
                <option key={freq.value} value={freq.value}>
                  {freq.label} ({freq.periods} pay periods/year)
                </option>
              ))}
            </select>
          </div>

          {/* Gross Pay */}
          <Input
            label="Gross Pay Per Period"
            type="number"
            value={input.grossPayPerPeriod}
            onChange={(e) =>
              setInput({ ...input, grossPayPerPeriod: Number(e.target.value) })
            }
            leftIcon={<span className="text-gray-600">$</span>}
          />

          {/* Pre-tax Deductions */}
          <Input
            label="Pre-tax Deductions (401k, Health)"
            type="number"
            value={input.pretaxDeductions}
            onChange={(e) =>
              setInput({ ...input, pretaxDeductions: Number(e.target.value) })
            }
            leftIcon={<span className="text-gray-600">$</span>}
            helperText="Per pay period"
          />

          {/* Additional Withholding */}
          <Input
            label="Additional Federal Withholding"
            type="number"
            value={input.additionalWithholding}
            onChange={(e) =>
              setInput({ ...input, additionalWithholding: Number(e.target.value) })
            }
            leftIcon={<span className="text-gray-600">$</span>}
            helperText="Extra amount from W-4 line 4c"
          />
        </div>

        <Button onClick={handleCalculate} size="lg" glow className="w-full mb-6">
          Calculate Withholding
        </Button>

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Main Result */}
            <div className="p-6 bg-gradient-to-r from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-success rounded-2xl text-center">
              <div className="text-sm text-white/80 mb-2">
                Estimated Take-Home Pay ({payFrequencyLabel})
              </div>
              <div className="text-5xl font-bold text-white mb-2">
                ${result.takeHomePerPeriod.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
              <div className="flex items-center justify-center gap-2 text-white/90">
                <Equals weight="bold" className="w-5 h-5" />
                <span className="text-sm">
                  ${(result.takeHomePerPeriod * (payFrequencies.find(p => p.value === input.payFrequency)?.periods || 26)).toLocaleString(undefined, { maximumFractionDigits: 0 })} annually
                </span>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Federal Withholding
                </div>
                <div className="text-2xl font-bold">
                  ${result.federalWithholdingPerPeriod.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Social Security (6.2%)
                </div>
                <div className="text-2xl font-bold">
                  ${result.socialSecurityPerPeriod.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Medicare (1.45%)
                </div>
                <div className="text-2xl font-bold">
                  ${result.medicarePerPeriod.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Total Deductions
                </div>
                <div className="text-2xl font-bold">
                  ${result.totalWithholdingPerPeriod.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            {/* Annual Summary */}
            <div className="p-4 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg">
              <h4 className="font-bold mb-3">Annual Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Gross Income:</span>
                  <span className="float-right font-medium">${result.annualGross.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Taxable Income:</span>
                  <span className="float-right font-medium">${result.annualTaxableIncome.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Federal Tax:</span>
                  <span className="float-right font-medium">${result.annualFederalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              This estimate does not include state income taxes, local taxes, or other deductions.
              Actual withholding may vary.
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
