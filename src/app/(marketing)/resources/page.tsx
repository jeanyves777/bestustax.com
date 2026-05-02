import { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, FileText, Calendar, Newspaper, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Button from '@/components/ui/Button'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Tax Resources | BestUSTax',
  description:
    'Tax guides, IRS forms, important tax dates, and our blog. Everything you need to stay informed about your taxes.',
}

const resources = [
  {
    title: 'Tax Guides',
    description: 'Comprehensive guides covering federal and state tax topics for individuals and businesses.',
    icon: BookOpen,
    href: '/resources/guides',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'IRS Forms',
    description: 'Quick links to the most-used IRS forms with instructions and filing deadlines.',
    icon: FileText,
    href: '/resources/forms',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Tax Calendar',
    description: 'Key tax deadlines and dates for individuals and businesses throughout the year.',
    icon: Calendar,
    href: '/resources/calendar',
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Blog',
    description: 'Tax tips, recent IRS updates, and insights from our team of tax professionals.',
    icon: Newspaper,
    href: '/resources/blog',
    color: 'from-orange-500 to-amber-600',
  },
]

export default function ResourcesPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-to-br from-light-bg-primary to-light-bg-secondary dark:from-dark-bg-primary dark:to-dark-bg-secondary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Tax <span className="gradient-text">Resources</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Free guides, forms, and tools to help you stay informed and prepared.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {resources.map((resource) => (
              <Link key={resource.href} href={resource.href} className="block h-full">
                <Card hover className="h-full cursor-pointer group">
                  <CardHeader>
                    <div className="mb-4">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${resource.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <resource.icon weight="bold" className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <CardTitle className="group-hover:gradient-text transition-all">
                      {resource.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {resource.description}
                    </p>
                    <div className="flex items-center gap-2 text-light-accent-primary dark:text-dark-accent-primary font-medium group-hover:gap-4 transition-all">
                      Browse
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
            Have a Specific Tax Question?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Talk to one of our experts and get answers tailored to your situation.
          </p>
          <Link href="/contact">
            <Button
              size="xl"
              variant="secondary"
              className="bg-white text-light-accent-primary hover:bg-gray-100"
              rightIcon={<ArrowRight weight="bold" />}
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
