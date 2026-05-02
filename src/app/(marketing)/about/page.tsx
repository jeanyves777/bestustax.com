import { Metadata } from 'next'
import { CheckCircle, ArrowRight, Users, Medal, ShieldCheck, Heart } from '@phosphor-icons/react/dist/ssr'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us | BestUSTax',
  description:
    'Learn about BestUSTax - our mission, values, and the team of professional accountants dedicated to helping you succeed.',
}

const stats = [
  { value: '100%', label: 'Accuracy Guarantee' },
  { value: 'IRS', label: 'Authorized e-file' },
  { value: '24/7', label: 'Online Access' },
  { value: 'Fast', label: 'Turnaround Time' },
]

const values = [
  {
    icon: Medal,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from tax preparation accuracy to customer service.',
  },
  {
    icon: ShieldCheck,
    title: 'Integrity',
    description: 'We operate with complete transparency and honesty. Your trust is our most valuable asset.',
  },
  {
    icon: Users,
    title: 'Client-First',
    description: 'Your success is our success. We go above and beyond to maximize your tax outcomes.',
  },
  {
    icon: Heart,
    title: 'Compassion',
    description: 'Taxes can be stressful. We approach every client with empathy and understanding.',
  },
]

const team = [
  {
    name: 'Our Tax Experts',
    role: 'Professional Accountants',
    bio: 'Our team of professional accountants is dedicated to helping you navigate the tax system with confidence.',
  },
  {
    name: 'Enrolled Agents',
    role: 'IRS-Licensed Specialists',
    bio: 'Enrolled Agent Admitted to Represent TaxPayers before the IRS. Experts in business and individual taxation.',
  },
  {
    name: 'Client Support',
    role: 'Dedicated Support Team',
    bio: 'Our support team is here to ensure every client has a seamless experience from start to finish.',
  },
  {
    name: 'Tax Advisors',
    role: 'Strategic Planning',
    bio: 'Specializing in complex tax situations including multi-state filing and tax planning strategies.',
  },
]

const certifications = [
  'IRS-Authorized e-file Provider',
  'Better Business Bureau A+ Rating',
  'Professional Accountants',
  'Enrolled Agents (EA)',
  'QuickBooks ProAdvisors',
  'Member - National Association of Professional Accountants',
]


export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-light-bg-primary to-light-bg-secondary dark:from-dark-bg-primary dark:to-dark-bg-secondary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="gradient-text">BestUSTax</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              We're on a mission to make professional tax services accessible to everyone.
              Our team of professional accountants and Enrolled Agents are dedicated to maximizing your refund
              while minimizing your stress.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">
              Our <span className="gradient-text">Story</span>
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                BestUSTax was founded with a simple but powerful mission: make professional tax
                services accessible, affordable, and stress-free for everyday Americans.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We believe most taxpayers leave money on the table—not because they're trying to
                avoid taxes, but because they don't understand all the deductions and credits
                available to them. That's where we come in.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our team of professional accountants and Enrolled Agents combines expert knowledge
                with modern technology to maximize your refund and minimize your stress.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                We combine cutting-edge technology with human expertise to deliver the
                best possible outcomes for our clients. Every return is reviewed by a licensed
                professional, and every client has access to year-round support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-4">
            Our <span className="gradient-text">Values</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            These core values guide everything we do.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value) => (
              <Card key={value.title} hover className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-success flex items-center justify-center">
                  <value.icon weight="fill" className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-4">
            Meet Our <span className="gradient-text">Leadership</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Experienced professionals dedicated to your success.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member) => (
              <Card key={member.name} className="p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-success flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-light-accent-primary dark:text-dark-accent-primary text-sm font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {member.bio}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-center mb-8">
            Credentials & Certifications
          </h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark-bg-primary rounded-lg"
              >
                <CheckCircle weight="fill" className="w-5 h-5 text-light-success dark:text-dark-success" />
                <span className="font-medium text-sm">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-success">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience the BestUSTax Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experience the BestUSTax difference. Professional tax preparation
            with a personal touch. Schedule a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            <Link href="/contact">
              <Button
                size="xl"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
