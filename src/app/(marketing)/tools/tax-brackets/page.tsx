import { Metadata } from 'next'
import { Info, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Button from '@/components/ui/Button'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: '2024 Federal Tax Brackets | BestUsTax',
  description:
    'Complete 2024 federal income tax brackets and rates for all filing statuses. Standard deductions, capital gains rates, and more.',
}

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
  { status: 'Single', amount: '$14,600', increase: '+$750 from 2023' },
  { status: 'Married Filing Jointly', amount: '$29,200', increase: '+$1,500 from 2023' },
  { status: 'Married Filing Separately', amount: '$14,600', increase: '+$750 from 2023' },
  { status: 'Head of Household', amount: '$21,900', increase: '+$1,100 from 2023' },
]

const capitalGainsRates = [
  { rate: '0%', single: '$0 - $47,025', married: '$0 - $94,050' },
  { rate: '15%', single: '$47,026 - $518,900', married: '$94,051 - $583,750' },
  { rate: '20%', single: '$518,901+', married: '$583,751+' },
]

const additionalInfo = [
  { title: 'FICA Tax', description: 'Social Security (6.2% up to $168,600) + Medicare (1.45%)' },
  { title: 'Additional Medicare Tax', description: '0.9% on income over $200,000 (single) or $250,000 (married)' },
  { title: 'Net Investment Income Tax', description: '3.8% on investment income for high earners' },
  { title: 'Alternative Minimum Tax', description: 'Exemption: $85,700 (single), $133,300 (married)' },
]

function BracketTable({ brackets, title }: { brackets: typeof singleBrackets; title: string }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-success">
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full">
          <thead className="bg-light-bg-secondary dark:bg-dark-bg-secondary">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Rate</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Taxable Income</th>
              <th className="px-4 py-3 text-left text-sm font-semibold hidden md:table-cell">Tax Calculation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {brackets.map((bracket) => (
              <tr key={bracket.rate + bracket.range} className="hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors">
                <td className="px-4 py-3">
                  <span className="font-bold text-light-accent-primary dark:text-dark-accent-primary">
                    {bracket.rate}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium">{bracket.range}</td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hidden md:table-cell">
                  {bracket.tax}
                </td>
              </tr>
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
      <section className="py-16 bg-gradient-to-br from-light-bg-primary to-light-bg-secondary dark:from-dark-bg-primary dark:to-dark-bg-secondary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              2024 Federal <span className="gradient-text">Tax Brackets</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Complete guide to federal income tax rates for the 2024 tax year.
              Understand your marginal and effective tax rates.
            </p>
            <Button size="lg" glow rightIcon={<ArrowRight weight="bold" />}>
              Calculate Your Taxes
            </Button>
          </div>
        </div>
      </section>

      {/* Standard Deductions */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-8">
            2024 <span className="gradient-text">Standard Deductions</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {standardDeductions.map((item) => (
              <Card key={item.status} hover className="p-6 text-center">
                <div className="text-3xl font-bold gradient-text mb-2">{item.amount}</div>
                <div className="font-medium mb-1">{item.status}</div>
                <div className="text-sm text-light-success dark:text-dark-success">{item.increase}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tax Bracket Tables */}
      <section className="py-16 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-4">
            Federal Income <span className="gradient-text">Tax Rates</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            The U.S. uses a progressive tax system. You only pay each rate on the income that falls
            within that bracket, not your entire income.
          </p>

          <div className="space-y-8 max-w-5xl mx-auto">
            <BracketTable brackets={singleBrackets} title="Single Filers" />
            <BracketTable brackets={marriedJointBrackets} title="Married Filing Jointly" />
            <BracketTable brackets={headOfHouseholdBrackets} title="Head of Household" />
          </div>
        </div>
      </section>

      {/* Capital Gains Rates */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-8">
            Long-Term <span className="gradient-text">Capital Gains Rates</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead className="bg-light-bg-secondary dark:bg-dark-bg-secondary">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Rate</th>
                      <th className="px-6 py-4 text-left font-semibold">Single</th>
                      <th className="px-6 py-4 text-left font-semibold">Married Filing Jointly</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {capitalGainsRates.map((rate) => (
                      <tr key={rate.rate}>
                        <td className="px-6 py-4">
                          <span className="font-bold text-light-accent-primary dark:text-dark-accent-primary text-lg">
                            {rate.rate}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium">{rate.single}</td>
                        <td className="px-6 py-4 font-medium">{rate.married}</td>
                      </tr>
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
      <section className="py-16 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <div className="flex items-center gap-3 justify-center mb-8">
            <Info weight="fill" className="w-6 h-6 text-light-accent-primary dark:text-dark-accent-primary" />
            <h2 className="text-2xl font-bold">Additional Tax Information</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {additionalInfo.map((info) => (
              <Card key={info.title} className="p-6">
                <h3 className="font-bold text-light-accent-primary dark:text-dark-accent-primary mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{info.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Marginal vs Effective Rate */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Marginal vs Effective <span className="gradient-text">Tax Rate</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-light-accent-primary dark:text-dark-accent-primary">
                  Marginal Tax Rate
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Your marginal tax rate is the rate you pay on your last dollar of income.
                  It's the highest tax bracket your income falls into.
                </p>
                <div className="p-4 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg">
                  <p className="text-sm">
                    <strong>Example:</strong> If you're single with $60,000 taxable income,
                    your marginal rate is 22%—but you don't pay 22% on all $60,000.
                  </p>
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-light-accent-primary dark:text-dark-accent-primary">
                  Effective Tax Rate
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Your effective tax rate is the average rate you pay across all your income.
                  It's your total tax divided by your total income.
                </p>
                <div className="p-4 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg">
                  <p className="text-sm">
                    <strong>Example:</strong> With $60,000 taxable income, your federal tax
                    is about $8,252—an effective rate of roughly 13.8%.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-success">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Calculate Your Tax Liability
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Use our free tax calculator to see exactly how much you'll owe or get back.
          </p>
          <Button
            size="xl"
            variant="secondary"
            className="bg-white text-light-accent-primary hover:bg-gray-100"
          >
            Try Our Tax Calculator
          </Button>
        </div>
      </section>
    </div>
  )
}
