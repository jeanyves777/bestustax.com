import { Metadata } from 'next'
import Link from 'next/link'
import { Calculator, Receipt, Briefcase, ChartBar, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Button from '@/components/ui/Button'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Free Tax Tools | BestUSTax',
  description:
    'Free tax tools including refund estimator, withholding calculator, self-employment tax calculator, and tax bracket visualizer.',
}

const tools = [
  {
    title: 'Refund Estimator',
    description: 'Calculate your potential federal tax refund in minutes.',
    icon: Calculator,
    href: '/tools/refund-estimator',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Withholding Calculator',
    description: 'Optimize your W-4 withholding and avoid surprises at tax time.',
    icon: Receipt,
    href: '/tools/withholding',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Self-Employment Tax',
    description: 'Estimate self-employment taxes for freelancers and contractors.',
    icon: Briefcase,
    href: '/tools/self-employment',
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Tax Bracket Visualizer',
    description: 'See how federal tax brackets apply to your income.',
    icon: ChartBar,
    href: '/tools/tax-brackets',
    color: 'from-orange-500 to-amber-600',
  },
]

export default function ToolsPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-to-br from-light-bg-primary to-light-bg-secondary dark:from-dark-bg-primary dark:to-dark-bg-secondary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Free <span className="gradient-text">Tax Tools</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Use our free calculators to estimate refunds, optimize withholding,
              and plan ahead. No signup required.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {tools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="block h-full">
                <Card hover className="h-full cursor-pointer group">
                  <CardHeader>
                    <div className="mb-4">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <tool.icon weight="bold" className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <CardTitle className="group-hover:gradient-text transition-all">
                      {tool.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {tool.description}
                    </p>
                    <div className="flex items-center gap-2 text-light-accent-primary dark:text-dark-accent-primary font-medium group-hover:gap-4 transition-all">
                      Open Tool
                      <ArrowRight weight="bold" className="w-5 h-5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-success">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Need Personalized Help?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our tax experts can review your situation and find every deduction.
          </p>
          <Link href="/book-appointment">
            <Button
              size="xl"
              variant="secondary"
              className="bg-white text-light-accent-primary hover:bg-gray-100"
              rightIcon={<ArrowRight weight="bold" />}
            >
              Book Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
