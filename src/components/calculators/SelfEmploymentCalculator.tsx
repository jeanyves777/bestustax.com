'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Briefcase, TrendDown } from '@phosphor-icons/react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

const filingStatuses = [
  { value: 'single', label: 'Single' },
  { value: 'married-joint', label: 'Married Filing Jointly' },
  { value: 'married-separate', label: 'Married Filing Separately' },
  { value: 'head-of-household', label: 'Head of Household' },
] as const

type FilingStatus = typeof filingStatuses[number]['value']

interface SelfEmploymentInput {
  filingStatus: FilingStatus
  netSelfEmploymentIncome: number
  otherIncome: number
  businessExpenses: number
  retirementContributions: number
  healthInsurancePremiums: number
}

interface SelfEmploymentResult {
  netEarnings: number
  selfEmploymentTax: number
  socialSecurityTax: number
  medicareTax: number
  deductibleHalf: number
  estimatedIncomeTax: number
  totalTaxLiability: number
  quarterlyPayment: number
  effectiveRate: number
}

// 2024 Tax Brackets (simplified)
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

function calculateIncomeTax(income: number, filingStatus: FilingStatus): number {
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

export function SelfEmploymentCalculator() {
  const [input, setInput] = useState<SelfEmploymentInput>({
    filingStatus: 'single',
    netSelfEmploymentIncome: 80000,
    otherIncome: 0,
    businessExpenses: 0,
    retirementContributions: 0,
    healthInsurancePremiums: 0,
  })

  const [result, setResult] = useState<SelfEmploymentResult | null>(null)

  const handleCalculate = () => {
    // Net earnings from self-employment
    const netEarnings = input.netSelfEmploymentIncome - input.businessExpenses

    // Self-employment tax calculation
    // Only 92.35% of net earnings are subject to SE tax
    const seEarningsBase = netEarnings * 0.9235

    // Social Security: 12.4% up to wage base ($168,600 in 2024)
    const ssWageBase = 168600
    const ssTaxableEarnings = Math.min(seEarningsBase, ssWageBase)
    const socialSecurityTax = ssTaxableEarnings * 0.124

    // Medicare: 2.9% on all earnings
    const medicareTax = seEarningsBase * 0.029

    // Additional Medicare Tax: 0.9% on earnings over $200,000 (single)
    const additionalMedicareThreshold = input.filingStatus === 'married-joint' ? 250000 : 200000
    const additionalMedicareTax = Math.max(0, seEarningsBase - additionalMedicareThreshold) * 0.009

    const selfEmploymentTax = socialSecurityTax + medicareTax + additionalMedicareTax

    // Deductible half of SE tax
    const deductibleHalf = selfEmploymentTax / 2

    // Calculate AGI
    const agi = netEarnings + input.otherIncome - deductibleHalf - input.retirementContributions - input.healthInsurancePremiums

    // Taxable income (after standard deduction)
    const standardDeduction = standardDeductions[input.filingStatus]
    const taxableIncome = Math.max(0, agi - standardDeduction)

    // Income tax
    const estimatedIncomeTax = calculateIncomeTax(taxableIncome, input.filingStatus)

    // Total tax liability
    const totalTaxLiability = selfEmploymentTax + estimatedIncomeTax

    // Quarterly estimated payment
    const quarterlyPayment = totalTaxLiability / 4

    // Effective rate
    const totalIncome = netEarnings + input.otherIncome
    const effectiveRate = totalIncome > 0 ? (totalTaxLiability / totalIncome) * 100 : 0

    setResult({
      netEarnings,
      selfEmploymentTax,
      socialSecurityTax,
      medicareTax: medicareTax + additionalMedicareTax,
      deductibleHalf,
      estimatedIncomeTax,
      totalTaxLiability,
      quarterlyPayment,
      effectiveRate,
    })
  }

  return (
    <Card variant="elevated" className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-success flex items-center justify-center">
            <Briefcase weight="bold" className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle>Self-Employment Tax Calculator</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Calculate your self-employment tax and quarterly payments for 2024
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

          {/* Net Self-Employment Income */}
          <Input
            label="Net Self-Employment Income"
            type="number"
            value={input.netSelfEmploymentIncome}
            onChange={(e) =>
              setInput({ ...input, netSelfEmploymentIncome: Number(e.target.value) })
            }
            leftIcon={<span className="text-gray-600">$</span>}
            helperText="From Schedule C (Line 31)"
          />

          {/* Business Expenses */}
          <Input
            label="Additional Business Expenses"
            type="number"
            value={input.businessExpenses}
            onChange={(e) =>
              setInput({ ...input, businessExpenses: Number(e.target.value) })
            }
            leftIcon={<span className="text-gray-600">$</span>}
            helperText="Not yet deducted"
          />

          {/* Other Income */}
          <Input
            label="Other Income (W-2, etc.)"
            type="number"
            value={input.otherIncome}
            onChange={(e) =>
              setInput({ ...input, otherIncome: Number(e.target.value) })
            }
            leftIcon={<span className="text-gray-600">$</span>}
          />

          {/* Retirement Contributions */}
          <Input
            label="Retirement Contributions (SEP/SIMPLE)"
            type="number"
            value={input.retirementContributions}
            onChange={(e) =>
              setInput({ ...input, retirementContributions: Number(e.target.value) })
            }
            leftIcon={<span className="text-gray-600">$</span>}
          />

          {/* Health Insurance */}
          <Input
            label="Self-Employed Health Insurance"
            type="number"
            value={input.healthInsurancePremiums}
            onChange={(e) =>
              setInput({ ...input, healthInsurancePremiums: Number(e.target.value) })
            }
            leftIcon={<span className="text-gray-600">$</span>}
          />
        </div>

        <Button onClick={handleCalculate} size="lg" glow className="w-full mb-6">
          Calculate Self-Employment Tax
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
                Quarterly Estimated Payment
              </div>
              <div className="text-5xl font-bold text-white mb-2">
                ${result.quarterlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div className="flex items-center justify-center gap-2 text-white/90">
                <Calculator weight="bold" className="w-5 h-5" />
                <span className="text-sm">
                  Due April 15, June 15, Sept 15, Jan 15
                </span>
              </div>
            </div>

            {/* Self-Employment Tax Breakdown */}
            <div className="p-4 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg">
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <Briefcase weight="fill" className="w-5 h-5 text-light-accent-primary dark:text-dark-accent-primary" />
                Self-Employment Tax Breakdown
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white dark:bg-dark-bg-primary rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Social Security (12.4%)</div>
                  <div className="text-xl font-bold">${result.socialSecurityTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
                <div className="p-3 bg-white dark:bg-dark-bg-primary rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Medicare (2.9%+)</div>
                  <div className="text-xl font-bold">${result.medicareTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
              </div>
              <div className="mt-3 p-3 bg-white dark:bg-dark-bg-primary rounded-lg">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total SE Tax</span>
                  <span className="font-bold">${result.selfEmploymentTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between mt-1 text-sm">
                  <span className="text-light-success dark:text-dark-success">Deductible (50%)</span>
                  <span className="text-light-success dark:text-dark-success">-${result.deductibleHalf.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            </div>

            {/* Total Tax Summary */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Income Tax
                </div>
                <div className="text-2xl font-bold">
                  ${result.estimatedIncomeTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Total Tax Liability
                </div>
                <div className="text-2xl font-bold gradient-text">
                  ${result.totalTaxLiability.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Effective Tax Rate
                </div>
                <div className="text-2xl font-bold">
                  {result.effectiveRate.toFixed(1)}%
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              This estimate is for federal taxes only. State taxes are not included.
              Consult with a tax professional for accurate tax planning.
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
