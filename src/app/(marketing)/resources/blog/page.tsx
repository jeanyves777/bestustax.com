import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, ArrowRight, Newspaper } from '@phosphor-icons/react/dist/ssr'
import Button from '@/components/ui/Button'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Tax Blog | BestUSTax',
  description:
    'Tax tips, IRS updates, deductions, and planning insights from the BestUSTax team.',
}

const posts = [
  {
    slug: 'maximize-your-refund',
    title: 'How to Maximize Your Tax Refund This Year',
    excerpt:
      'A practical checklist of often-missed deductions and credits that can put more money back in your pocket.',
    date: 'Coming soon',
    category: 'Individual Tax',
  },
  {
    slug: 'small-business-deductions',
    title: 'Top Deductions Every Small Business Owner Should Know',
    excerpt:
      'From the home office deduction to vehicle expenses, here are the deductions that move the needle for small businesses.',
    date: 'Coming soon',
    category: 'Business Tax',
  },
  {
    slug: 'quarterly-estimated-taxes',
    title: 'Understanding Quarterly Estimated Taxes',
    excerpt:
      'Who has to pay them, how to calculate them, and how to avoid underpayment penalties.',
    date: 'Coming soon',
    category: 'Self-Employed',
  },
]

export default function BlogPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-to-br from-light-bg-primary to-light-bg-secondary dark:from-dark-bg-primary dark:to-dark-bg-secondary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <Newspaper weight="fill" className="w-16 h-16 mx-auto mb-6 text-light-accent-primary dark:text-dark-accent-primary" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Tax <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Tips, IRS updates, and tax-planning insights from our team.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {posts.map((post) => (
              <Card key={post.slug} hover className="h-full">
                <CardHeader>
                  <div className="text-xs font-semibold text-light-accent-primary dark:text-dark-accent-primary uppercase tracking-wider mb-2">
                    {post.category}
                  </div>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar weight="bold" className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-2xl mx-auto text-center mt-16 p-8 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">More Articles Coming Soon</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We're working on new content. In the meantime, explore our tax guides
              or reach out with a specific question.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/resources/guides">
                <Button variant="outline">Browse Tax Guides</Button>
              </Link>
              <Link href="/contact">
                <Button rightIcon={<ArrowRight weight="bold" />}>Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
