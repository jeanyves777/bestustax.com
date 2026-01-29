import { Metadata } from 'next'
import { CheckCircle, ArrowRight, Users, Medal, ShieldCheck, Heart } from '@phosphor-icons/react/dist/ssr'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'About Us | BestUsTax',
  description:
    'Learn about BestUsTax - our mission, values, and the team of CPAs and tax professionals dedicated to helping you succeed.',
}

const stats = [
  { value: '50,000+', label: 'Clients Served' },
  { value: '$2.5B+', label: 'In Refunds Secured' },
  { value: '15+', label: 'Years Experience' },
  { value: '4.9/5', label: 'Client Rating' },
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
    name: 'Sarah Johnson, CPA',
    role: 'Founder & CEO',
    bio: '20+ years of tax experience. Former IRS Revenue Agent. Passionate about making taxes accessible to everyone.',
  },
  {
    name: 'Michael Chen, EA',
    role: 'Director of Tax Services',
    bio: 'Enrolled Agent with expertise in business taxation. Specializes in S-Corp and partnership returns.',
  },
  {
    name: 'Emily Rodriguez, CPA',
    role: 'Head of Client Success',
    bio: 'Dedicated to ensuring every client has a seamless experience. Expert in individual tax planning.',
  },
  {
    name: 'David Park, CPA',
    role: 'Senior Tax Manager',
    bio: 'Specializes in complex tax situations including multi-state filing and international tax issues.',
  },
]

const certifications = [
  'IRS-Authorized e-file Provider',
  'Better Business Bureau A+ Rating',
  'Certified Public Accountants (CPA)',
  'Enrolled Agents (EA)',
  'QuickBooks ProAdvisors',
  'Member - AICPA',
]

const milestones = [
  { year: '2009', event: 'BestUsTax founded in Austin, Texas' },
  { year: '2012', event: 'Expanded to serve clients nationwide' },
  { year: '2015', event: 'Launched online tax preparation platform' },
  { year: '2018', event: 'Reached 25,000 clients milestone' },
  { year: '2021', event: 'Introduced AI-powered deduction finder' },
  { year: '2024', event: 'Serving 50,000+ clients across all 50 states' },
]

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-light-bg-primary to-light-bg-secondary dark:from-dark-bg-primary dark:to-dark-bg-secondary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="gradient-text">BestUsTax</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              We're on a mission to make professional tax services accessible to everyone.
              Our team of CPAs and Enrolled Agents are dedicated to maximizing your refund
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
                BestUsTax was founded in 2009 by Sarah Johnson, a former IRS Revenue Agent who saw
                firsthand how confusing and intimidating the tax system can be for everyday Americans.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                After years of working inside the IRS, Sarah realized that most taxpayers were
                leaving money on the table—not because they were trying to avoid taxes, but because
                they simply didn't understand all the deductions and credits available to them.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                She founded BestUsTax with a simple mission: provide expert-level tax preparation
                at prices everyday families could afford. What started as a small practice in
                Austin, Texas has grown into a nationwide team of CPAs and Enrolled Agents serving
                over 50,000 clients.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Today, we combine cutting-edge technology with human expertise to deliver the
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

      {/* Timeline */}
      <section className="py-24 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">
            Our <span className="gradient-text">Journey</span>
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-success transform md:-translate-x-1/2" />

              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-center mb-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} pl-8 md:pl-0`}>
                    <div className="text-2xl font-bold gradient-text mb-1">
                      {milestone.year}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {milestone.event}
                    </div>
                  </div>
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-light-accent-primary dark:bg-dark-accent-primary rounded-full transform md:-translate-x-1/2 border-4 border-white dark:border-dark-bg-primary" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
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
            Ready to Experience the BestUsTax Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join the 50,000+ clients who trust us with their taxes every year.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="xl"
              variant="secondary"
              className="bg-white text-light-accent-primary hover:bg-gray-100"
              rightIcon={<ArrowRight weight="bold" />}
            >
              Start Your Tax Return
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
