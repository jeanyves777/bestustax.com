'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, TrendUp, TrendDown } from '@phosphor-icons/react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import type { TaxCalculatorInput, TaxCalculatorResult } from '@/types'

const filingStatuses = [
  { value: 'single', label: 'Single' },
  { value: 'married-joint', label: 'Married Filing Jointly' },
  { value: 'married-separate', label: 'Married Filing Separately' },
  { value: 'head-of-household', label: 'Head of Household' },
] as const

// 2024 Tax Brackets (simplified for demo)
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

function calculateTax(income: number, filingStatus: keyof typeof taxBrackets): number {
  const brackets = taxBrackets[filingStatus]
  let tax = 0
  let previousMax = 0

  for (const bracket of brackets) {
    if (income > bracket.min) {
      const taxableInBracket = Math.min(income, bracket.max) - bracket.min
      tax += taxableInBracket * bracket.rate
      previousMax = bracket.max
    } else {
      break
    }
  }

  return tax
}

export function TaxCalculator() {
  const [input, setInput] = useState<TaxCalculatorInput>({
    filingStatus: 'single',
    income: 75000,
    deductions: 14600,
    credits: 0,
    withheld: 0,
  })

  const [result, setResult] = useState<TaxCalculatorResult | null>(null)

  const handleCalculate = () => {
    const taxableIncome = Math.max(0, input.income - input.deductions)
    const federalTax = calculateTax(taxableIncome, input.filingStatus)
    const taxAfterCredits = Math.max(0, federalTax - input.credits)
    const refund = input.withheld - taxAfterCredits

    const effectiveRate = input.income > 0 ? (federalTax / input.income) * 100 : 0

    // Find marginal rate
    const brackets = taxBrackets[input.filingStatus]
    const marginalBracket = brackets.find(
      (b) => taxableIncome >= b.min && taxableIncome < b.max
    )
    const marginalRate = marginalBracket ? marginalBracket.rate * 100 : 0

    setResult({
      taxableIncome,
      federalTax: taxAfterCredits,
      effectiveRate,
      marginalRate,
      refund,
      taxBracket: `${marginalRate}%`,
    })
  }

  return (
    <Card variant="elevated" className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-success flex items-center justify-center">
            <Calculator weight="bold" className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle>Tax Refund Calculator</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Estimate your federal tax refund for 2024
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
                  filingStatus: e.target.value as TaxCalculatorInput['filingStatus'],
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

          {/* Income */}
          <Input
            label="Annual Income"
            type="number"
            value={input.income}
            onChange={(e) =>
              setInput({ ...input, income: Number(e.target.value) })
            }
            leftIcon={<span className="text-gray-600">$</span>}
          />

          {/* Deductions */}
          <Input
            label="Total Deductions"
            type="number"
            value={input.deductions}
            onChange={(e) =>
              setInput({ ...input, deductions: Number(e.target.value) })
            }
            leftIcon={<span className="text-gray-600">$</span>}
            helperText="Standard deduction or itemized"
          />

          {/* Credits */}
          <Input
            label="Tax Credits"
            type="number"
            value={input.credits}
            onChange={(e) =>
              setInput({ ...input, credits: Number(e.target.value) })
            }
            leftIcon={<span className="text-gray-600">$</span>}
            helperText="Child tax credit, EIC, etc."
          />

          {/* Withheld */}
          <Input
            label="Federal Tax Withheld"
            type="number"
            value={input.withheld}
            onChange={(e) =>
              setInput({ ...input, withheld: Number(e.target.value) })
            }
            leftIcon={<span className="text-gray-600">$</span>}
            helperText="From W-2 box 2"
          />
        </div>

        <Button onClick={handleCalculate} size="lg" glow className="w-full mb-6">
          Calculate My Refund
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
                {result.refund >= 0 ? 'Estimated Refund' : 'Amount Owed'}
              </div>
              <div className="text-5xl font-bold text-white mb-2">
                ${Math.abs(result.refund).toLocaleString()}
              </div>
              <div className="flex items-center justify-center gap-2 text-white/90">
                {result.refund >= 0 ? (
                  <>
                    <TrendUp weight="bold" className="w-5 h-5" />
                    <span className="text-sm">You're getting money back!</span>
                  </>
                ) : (
                  <>
                    <TrendDown weight="bold" className="w-5 h-5" />
                    <span className="text-sm">Additional payment required</span>
                  </>
                )}
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Taxable Income
                </div>
                <div className="text-2xl font-bold">
                  ${result.taxableIncome.toLocaleString()}
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Federal Tax
                </div>
                <div className="text-2xl font-bold">
                  ${result.federalTax.toLocaleString()}
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Effective Rate
                </div>
                <div className="text-2xl font-bold">
                  {result.effectiveRate.toFixed(2)}%
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Marginal Rate
                </div>
                <div className="text-2xl font-bold">{result.taxBracket}</div>
              </div>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              This is an estimate only. Actual results may vary. Consult with a
              tax professional for accurate filing.
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
