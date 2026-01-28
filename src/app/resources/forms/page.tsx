import { Metadata } from 'next'
import { FileText, Download, MagnifyingGlass, ArrowSquareOut } from '@phosphor-icons/react/dist/ssr'
import Button from '@/components/ui/Button'
import Card, { CardContent } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Tax Forms & Documents | BestUsTax',
  description:
    'Download IRS tax forms, schedules, and instructions. Find the forms you need to file your federal income tax return.',
}

const commonForms = [
  {
    form: '1040',
    title: 'U.S. Individual Income Tax Return',
    description: 'The main form used to file your federal income tax return.',
    category: 'Individual',
  },
  {
    form: '1040-SR',
    title: 'U.S. Tax Return for Seniors',
    description: 'Alternative to Form 1040 for taxpayers 65 and older.',
    category: 'Individual',
  },
  {
    form: 'W-2',
    title: 'Wage and Tax Statement',
    description: 'Reports wages and taxes withheld by your employer.',
    category: 'Information',
  },
  {
    form: 'W-4',
    title: 'Employee\'s Withholding Certificate',
    description: 'Tell your employer how much tax to withhold from your pay.',
    category: 'Withholding',
  },
  {
    form: '1099-NEC',
    title: 'Nonemployee Compensation',
    description: 'Reports payments to independent contractors and freelancers.',
    category: 'Information',
  },
  {
    form: '1099-INT',
    title: 'Interest Income',
    description: 'Reports interest income from banks and investments.',
    category: 'Information',
  },
]

const formCategories = [
  {
    name: 'Individual Tax Forms',
    forms: [
      { form: '1040', title: 'U.S. Individual Income Tax Return' },
      { form: '1040-SR', title: 'U.S. Tax Return for Seniors' },
      { form: '1040-X', title: 'Amended U.S. Individual Income Tax Return' },
      { form: '1040-ES', title: 'Estimated Tax for Individuals' },
      { form: '1040-V', title: 'Payment Voucher' },
    ],
  },
  {
    name: 'Schedules',
    forms: [
      { form: 'Schedule A', title: 'Itemized Deductions' },
      { form: 'Schedule B', title: 'Interest and Ordinary Dividends' },
      { form: 'Schedule C', title: 'Profit or Loss From Business' },
      { form: 'Schedule D', title: 'Capital Gains and Losses' },
      { form: 'Schedule E', title: 'Supplemental Income and Loss' },
      { form: 'Schedule SE', title: 'Self-Employment Tax' },
    ],
  },
  {
    name: 'Business Forms',
    forms: [
      { form: '1120', title: 'U.S. Corporation Income Tax Return' },
      { form: '1120-S', title: 'U.S. Income Tax Return for an S Corporation' },
      { form: '1065', title: 'U.S. Return of Partnership Income' },
      { form: '941', title: 'Employer\'s Quarterly Federal Tax Return' },
      { form: '940', title: 'Employer\'s Annual Federal Unemployment Tax Return' },
    ],
  },
  {
    name: 'Information Returns',
    forms: [
      { form: 'W-2', title: 'Wage and Tax Statement' },
      { form: '1099-NEC', title: 'Nonemployee Compensation' },
      { form: '1099-MISC', title: 'Miscellaneous Income' },
      { form: '1099-INT', title: 'Interest Income' },
      { form: '1099-DIV', title: 'Dividends and Distributions' },
      { form: '1099-B', title: 'Proceeds From Broker Transactions' },
    ],
  },
  {
    name: 'Credits & Deductions',
    forms: [
      { form: '8812', title: 'Credits for Qualifying Children' },
      { form: '8863', title: 'Education Credits' },
      { form: '8880', title: 'Credit for Qualified Retirement Savings' },
      { form: '5695', title: 'Residential Energy Credits' },
      { form: '2441', title: 'Child and Dependent Care Expenses' },
    ],
  },
  {
    name: 'Retirement & HSA',
    forms: [
      { form: '8606', title: 'Nondeductible IRAs' },
      { form: '5329', title: 'Additional Taxes on Qualified Plans' },
      { form: '8889', title: 'Health Savings Accounts (HSAs)' },
      { form: '1099-R', title: 'Distributions From Retirement Plans' },
    ],
  },
]

const importantDeadlines = [
  { date: 'January 31', description: 'W-2s and 1099s due to recipients' },
  { date: 'April 15', description: 'Individual tax returns due' },
  { date: 'April 15', description: 'Q1 estimated tax payment due' },
  { date: 'June 17', description: 'Q2 estimated tax payment due' },
  { date: 'September 16', description: 'Q3 estimated tax payment due' },
  { date: 'October 15', description: 'Extended returns due' },
]

export default function FormsPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-light-bg-primary to-light-bg-secondary dark:from-dark-bg-primary dark:to-dark-bg-secondary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-light-accent-primary/10 dark:bg-dark-accent-primary/10 rounded-full text-light-accent-primary dark:text-dark-accent-primary font-medium text-sm mb-6">
              <FileText weight="fill" className="w-4 h-4" />
              Official IRS Forms
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tax <span className="gradient-text">Forms & Documents</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Find and download the IRS forms you need. All forms link directly to
              the official IRS website.
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search forms (e.g., 1040, W-2, Schedule C)"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Forms */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8">
            Most <span className="gradient-text">Common Forms</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commonForms.map((form) => (
              <Card key={form.form} hover className="p-6 cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-light-accent-primary/10 dark:bg-dark-accent-primary/10 rounded-lg">
                    <FileText weight="fill" className="w-6 h-6 text-light-accent-primary dark:text-dark-accent-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-lg">Form {form.form}</span>
                      <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-xs rounded">
                        {form.category}
                      </span>
                    </div>
                    <h3 className="font-medium text-sm mb-2 text-gray-900 dark:text-gray-100">
                      {form.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {form.description}
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <Button size="sm" variant="outline" leftIcon={<Download className="w-4 h-4" />}>
                        PDF
                      </Button>
                      <Button size="sm" variant="ghost" leftIcon={<ArrowSquareOut className="w-4 h-4" />}>
                        Instructions
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Forms by Category */}
      <section className="py-16 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">
            All Forms by <span className="gradient-text">Category</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formCategories.map((category) => (
              <Card key={category.name} className="p-6">
                <h3 className="text-xl font-bold mb-4 text-light-accent-primary dark:text-dark-accent-primary">
                  {category.name}
                </h3>
                <ul className="space-y-3">
                  {category.forms.map((form) => (
                    <li key={form.form}>
                      <a
                        href="#"
                        className="flex items-center gap-3 group hover:text-light-accent-primary dark:hover:text-dark-accent-primary transition-colors"
                      >
                        <FileText className="w-4 h-4 text-gray-400 group-hover:text-light-accent-primary dark:group-hover:text-dark-accent-primary" />
                        <div>
                          <span className="font-medium">Form {form.form}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 block">
                            {form.title}
                          </span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Deadlines Sidebar */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-8">
                Filing <span className="gradient-text">Tips</span>
              </h2>
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-3">Gather Your Documents First</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Before you start filling out forms, collect all your W-2s, 1099s, and
                    other tax documents. Most employers and financial institutions send these
                    by January 31.
                  </p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-3">Choose the Right Form</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Most taxpayers use Form 1040. If you're 65 or older, you can use Form
                    1040-SR which has larger print. Make sure to attach all required schedules.
                  </p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-3">E-File for Faster Refunds</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Electronic filing is faster, more accurate, and you'll get your refund
                    sooner—typically within 21 days if you choose direct deposit.
                  </p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-3">Keep Copies for Your Records</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Always keep copies of your filed returns and supporting documents for at
                    least 3 years. You may need them if you're audited or need to file an amendment.
                  </p>
                </Card>
              </div>
            </div>
            <div>
              <Card className="p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">
                  2024 Key Deadlines
                </h3>
                <ul className="space-y-4">
                  {importantDeadlines.map((deadline) => (
                    <li key={deadline.date + deadline.description} className="flex items-start gap-3">
                      <span className="font-bold text-light-accent-primary dark:text-dark-accent-primary whitespace-nowrap">
                        {deadline.date}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {deadline.description}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Need more time? File Form 4868 by April 15 for an automatic 6-month extension.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* IRS Link */}
      <section className="py-16 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
            Visit the official IRS website for the complete library of tax forms,
            publications, and instructions.
          </p>
          <Button
            size="lg"
            variant="outline"
            rightIcon={<ArrowSquareOut weight="bold" />}
          >
            Visit IRS.gov Forms Page
          </Button>
        </div>
      </section>
    </div>
  )
}
