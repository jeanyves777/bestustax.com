import { Metadata } from 'next'
import { ArrowRight, BookOpen, Star, Clock, User } from '@phosphor-icons/react/dist/ssr'
import Button from '@/components/ui/Button'
import Card, { CardContent } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Tax Guides & Resources | BestUsTax',
  description:
    'Free tax guides and educational resources to help you understand taxes, maximize deductions, and file with confidence.',
}

const featuredGuides = [
  {
    title: 'Complete Guide to Filing Your 2024 Taxes',
    description: 'Everything you need to know about filing your federal income tax return this year.',
    category: 'Getting Started',
    readTime: '15 min read',
    image: '/images/guides/filing-guide.jpg',
  },
  {
    title: 'Maximizing Your Tax Deductions',
    description: 'Learn about common deductions you might be missing and how to properly claim them.',
    category: 'Deductions',
    readTime: '12 min read',
    image: '/images/guides/deductions.jpg',
  },
  {
    title: 'Self-Employment Tax Guide',
    description: 'A comprehensive guide for freelancers, contractors, and small business owners.',
    category: 'Self-Employed',
    readTime: '20 min read',
    image: '/images/guides/self-employed.jpg',
  },
]

const guideCategories = [
  {
    name: 'Getting Started',
    guides: [
      { title: 'Tax Filing 101: A Beginner\'s Guide', readTime: '8 min' },
      { title: 'Understanding Your W-2 Form', readTime: '5 min' },
      { title: 'Choosing the Right Filing Status', readTime: '6 min' },
      { title: 'Standard vs. Itemized Deductions', readTime: '7 min' },
    ],
  },
  {
    name: 'Deductions & Credits',
    guides: [
      { title: 'Complete List of Tax Deductions', readTime: '15 min' },
      { title: 'Child Tax Credit Explained', readTime: '6 min' },
      { title: 'Education Tax Credits (AOTC & LLC)', readTime: '8 min' },
      { title: 'Home Office Deduction Guide', readTime: '10 min' },
    ],
  },
  {
    name: 'Self-Employed & Business',
    guides: [
      { title: 'Schedule C Step-by-Step Guide', readTime: '12 min' },
      { title: 'Quarterly Estimated Tax Payments', readTime: '8 min' },
      { title: 'Business Expense Tracking Tips', readTime: '7 min' },
      { title: 'Choosing Your Business Structure', readTime: '10 min' },
    ],
  },
  {
    name: 'Investments & Retirement',
    guides: [
      { title: 'Capital Gains Tax Explained', readTime: '9 min' },
      { title: 'IRA Contribution Strategies', readTime: '8 min' },
      { title: 'Understanding 401(k) Tax Benefits', readTime: '7 min' },
      { title: 'Crypto Tax Reporting Guide', readTime: '12 min' },
    ],
  },
  {
    name: 'Life Events',
    guides: [
      { title: 'Getting Married? Tax Implications', readTime: '8 min' },
      { title: 'Buying a Home: Tax Benefits', readTime: '10 min' },
      { title: 'Having a Baby: Tax Changes', readTime: '7 min' },
      { title: 'Divorce and Your Taxes', readTime: '9 min' },
    ],
  },
  {
    name: 'State Taxes',
    guides: [
      { title: 'States with No Income Tax', readTime: '5 min' },
      { title: 'Multi-State Tax Filing Guide', readTime: '12 min' },
      { title: 'Understanding State Tax Nexus', readTime: '8 min' },
      { title: 'Moving to a New State: Tax Tips', readTime: '7 min' },
    ],
  },
]

const popularGuides = [
  { title: 'How to File Taxes for Free', views: '45.2K' },
  { title: 'What to Do If You Owe Taxes', views: '38.1K' },
  { title: 'IRS Audit Red Flags to Avoid', views: '32.5K' },
  { title: 'Tax Refund Timeline 2024', views: '28.9K' },
  { title: 'Amended Tax Return Guide', views: '24.3K' },
]

export default function GuidesPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-light-bg-primary to-light-bg-secondary dark:from-dark-bg-primary dark:to-dark-bg-secondary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-light-accent-primary/10 dark:bg-dark-accent-primary/10 rounded-full text-light-accent-primary dark:text-dark-accent-primary font-medium text-sm mb-6">
              <BookOpen weight="fill" className="w-4 h-4" />
              Free Tax Education
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tax <span className="gradient-text">Guides & Resources</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Learn everything you need to know about taxes with our comprehensive guides.
              Written by CPAs, designed for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8">
            Featured <span className="gradient-text">Guides</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredGuides.map((guide) => (
              <Card key={guide.title} hover className="overflow-hidden cursor-pointer group">
                <div className="h-48 bg-gradient-to-br from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-success flex items-center justify-center">
                  <BookOpen weight="thin" className="w-24 h-24 text-white/30 group-hover:scale-110 transition-transform" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-light-accent-primary/10 dark:bg-dark-accent-primary/10 text-light-accent-primary dark:text-dark-accent-primary text-xs font-medium rounded">
                      {guide.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Clock weight="fill" className="w-3 h-3" />
                      {guide.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-light-accent-primary dark:group-hover:text-dark-accent-primary transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {guide.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guide Categories */}
      <section className="py-16 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">
            Browse by <span className="gradient-text">Category</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guideCategories.map((category) => (
              <Card key={category.name} className="p-6">
                <h3 className="text-xl font-bold mb-4 text-light-accent-primary dark:text-dark-accent-primary">
                  {category.name}
                </h3>
                <ul className="space-y-3">
                  {category.guides.map((guide) => (
                    <li key={guide.title}>
                      <a
                        href="#"
                        className="flex items-center justify-between group hover:text-light-accent-primary dark:hover:text-dark-accent-primary transition-colors"
                      >
                        <span className="text-sm">{guide.title}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Clock weight="fill" className="w-3 h-3" />
                          {guide.readTime}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" size="sm" className="w-full mt-4" rightIcon={<ArrowRight />}>
                  View All
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Guides Sidebar */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-8">
                Latest <span className="gradient-text">Articles</span>
              </h2>
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Card key={i} hover className="p-6 cursor-pointer">
                    <div className="flex gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-light-accent-primary/10 dark:bg-dark-accent-primary/10 text-light-accent-primary dark:text-dark-accent-primary text-xs font-medium rounded">
                            Tax Tips
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Jan {20 - i}, 2024
                          </span>
                        </div>
                        <h3 className="text-lg font-bold mb-2 hover:text-light-accent-primary dark:hover:text-dark-accent-primary transition-colors">
                          {i === 1 && '10 Last-Minute Tax Deductions You Might Be Missing'}
                          {i === 2 && 'How to Maximize Your Tax Refund in 2024'}
                          {i === 3 && 'Understanding the New IRS Direct File Program'}
                          {i === 4 && 'Common Tax Mistakes to Avoid This Year'}
                          {i === 5 && 'Tax Changes for 2024: What You Need to Know'}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Learn the key strategies and tips to help you save money on your taxes this year...
                        </p>
                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <User weight="fill" className="w-4 h-4" />
                            Tax Team
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock weight="fill" className="w-4 h-4" />
                            {5 + i} min read
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  Load More Articles
                </Button>
              </div>
            </div>
            <div>
              <Card className="p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Star weight="fill" className="w-5 h-5 text-light-warning dark:text-dark-warning" />
                  Most Popular
                </h3>
                <ul className="space-y-4">
                  {popularGuides.map((guide, index) => (
                    <li key={guide.title}>
                      <a
                        href="#"
                        className="flex items-start gap-3 group hover:text-light-accent-primary dark:hover:text-dark-accent-primary transition-colors"
                      >
                        <span className="text-2xl font-bold text-gray-300 dark:text-gray-600 group-hover:text-light-accent-primary/50 dark:group-hover:text-dark-accent-primary/50">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <span className="font-medium block">{guide.title}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {guide.views} views
                          </span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-success">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated on Tax News
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Get weekly tax tips, deadline reminders, and new guide notifications
            delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <Button
              variant="secondary"
              className="bg-white text-light-accent-primary hover:bg-gray-100"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
