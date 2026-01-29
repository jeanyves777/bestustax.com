'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  CheckCircle,
  ArrowRight,
  Users,
  Medal,
  ShieldCheck,
  Heart,
  Star,
  Trophy,
  Target,
  Lightbulb,
  Handshake,
  Buildings,
  GraduationCap,
  Certificate,
  LinkedinLogo,
  Play
} from '@phosphor-icons/react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const stats = [
  { value: '50,000+', label: 'Clients Served', icon: Users },
  { value: '$2.5B+', label: 'In Refunds Secured', icon: Trophy },
  { value: '15+', label: 'Years Experience', icon: Medal },
  { value: '4.9/5', label: 'Client Rating', icon: Star },
]

const values = [
  {
    icon: Medal,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from tax preparation accuracy to customer service.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: ShieldCheck,
    title: 'Integrity',
    description: 'We operate with complete transparency and honesty. Your trust is our most valuable asset.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users,
    title: 'Client-First',
    description: 'Your success is our success. We go above and beyond to maximize your tax outcomes.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Heart,
    title: 'Compassion',
    description: 'Taxes can be stressful. We approach every client with empathy and understanding.',
    color: 'from-red-500 to-rose-500',
  },
]

const team = [
  {
    name: 'Sarah Johnson, CPA',
    role: 'Founder & CEO',
    bio: '20+ years of tax experience. Former IRS Revenue Agent. Passionate about making taxes accessible to everyone.',
    credentials: ['CPA', 'Former IRS Agent', 'MBA Finance'],
  },
  {
    name: 'Michael Chen, EA',
    role: 'Director of Tax Services',
    bio: 'Enrolled Agent with expertise in business taxation. Specializes in S-Corp and partnership returns.',
    credentials: ['Enrolled Agent', 'Tax Specialist', '15+ Years'],
  },
  {
    name: 'Emily Rodriguez, CPA',
    role: 'Head of Client Success',
    bio: 'Dedicated to ensuring every client has a seamless experience. Expert in individual tax planning.',
    credentials: ['CPA', 'CFP', 'Client Advocate'],
  },
  {
    name: 'David Park, CPA',
    role: 'Senior Tax Manager',
    bio: 'Specializes in complex tax situations including multi-state filing and international tax issues.',
    credentials: ['CPA', 'International Tax', 'Multi-State Expert'],
  },
]

const certifications = [
  { name: 'IRS-Authorized e-file Provider', icon: ShieldCheck },
  { name: 'Better Business Bureau A+ Rating', icon: Trophy },
  { name: 'Certified Public Accountants (CPA)', icon: Certificate },
  { name: 'Enrolled Agents (EA)', icon: GraduationCap },
  { name: 'QuickBooks ProAdvisors', icon: Buildings },
  { name: 'Member - AICPA', icon: Handshake },
]

const milestones = [
  { year: '2009', event: 'BestUsTax founded in Austin, Texas', icon: Lightbulb },
  { year: '2012', event: 'Expanded to serve clients nationwide', icon: Target },
  { year: '2015', event: 'Launched online tax preparation platform', icon: Buildings },
  { year: '2018', event: 'Reached 25,000 clients milestone', icon: Users },
  { year: '2021', event: 'Introduced AI-powered deduction finder', icon: Star },
  { year: '2024', event: 'Serving 50,000+ clients across all 50 states', icon: Trophy },
]

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-brand-blue via-brand-blue-light to-brand-blue dark:from-brand-blue-dark dark:via-brand-blue dark:to-brand-blue-dark overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl"
            animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold mb-6"
            >
              About Us
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold mb-6 text-white"
            >
              Making Taxes <span className="text-brand-gold">Simple</span> for Everyone
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            >
              We're on a mission to make professional tax services accessible to everyone.
              Our team of CPAs and Enrolled Agents are dedicated to maximizing your refund
              while minimizing your stress.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href="/contact">
                <Button size="lg" className="bg-brand-gold hover:bg-brand-gold-dark text-white">
                  Get in Touch
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" leftIcon={<Play weight="fill" />}>
                Watch Our Story
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path
              d="M0 48L60 56C120 64 240 80 360 80C480 80 600 64 720 56C840 48 960 48 1080 56C1200 64 1320 80 1380 88L1440 96V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V48Z"
              className="fill-white dark:fill-dark-bg-primary"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-gold flex items-center justify-center">
                  <stat.icon weight="fill" className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-gray-50 dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold mb-4">
                Our Story
              </span>
              <h2 className="text-4xl font-bold mb-6">
                From IRS Agent to <span className="gradient-text">Tax Champion</span>
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  BestUsTax was founded in 2009 by Sarah Johnson, a former IRS Revenue Agent who saw
                  firsthand how confusing and intimidating the tax system can be for everyday Americans.
                </p>
                <p>
                  After years of working inside the IRS, Sarah realized that most taxpayers were
                  leaving money on the table—not because they were trying to avoid taxes, but because
                  they simply didn't understand all the deductions and credits available to them.
                </p>
                <p>
                  She founded BestUsTax with a simple mission: provide expert-level tax preparation
                  at prices everyday families could afford. What started as a small practice in
                  Austin, Texas has grown into a nationwide team of CPAs and Enrolled Agents serving
                  over 50,000 clients.
                </p>
                <p className="font-medium text-brand-blue dark:text-brand-gold">
                  Today, we combine cutting-edge technology with human expertise to deliver the
                  best possible outcomes for our clients.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Background shapes */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-brand-gold/10 rounded-3xl transform rotate-6" />
                <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 to-brand-blue/10 rounded-3xl transform -rotate-3" />

                {/* Main content card */}
                <Card className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-blue to-brand-gold flex items-center justify-center mb-6">
                    <Lightbulb weight="fill" className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    To make professional tax services accessible to everyone, ensuring every client
                    receives their maximum legal refund with zero stress.
                  </p>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold mb-4">
              Our Values
            </span>
            <h2 className="text-4xl font-bold mb-4">
              What <span className="gradient-text">Drives Us</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              These core values guide everything we do.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="p-6 text-center h-full">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center shadow-lg`}>
                    <value.icon weight="fill" className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-50 dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold mb-4">
              Our Team
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Meet Our <span className="gradient-text">Leadership</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experienced professionals dedicated to your success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="p-6 text-center h-full group">
                  <div className="relative mb-4">
                    <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-brand-blue to-brand-gold flex items-center justify-center group-hover:scale-105 transition-transform">
                      <span className="text-3xl font-bold text-white">
                        {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="flex gap-1">
                        {member.credentials.slice(0, 2).map((cred, i) => (
                          <span key={i} className="px-2 py-0.5 bg-brand-gold text-white text-xs font-medium rounded-full">
                            {cred}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mt-4">{member.name}</h3>
                  <p className="text-brand-gold text-sm font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {member.bio}
                  </p>
                  <button className="inline-flex items-center gap-2 text-brand-blue dark:text-brand-gold text-sm font-medium hover:gap-3 transition-all">
                    <LinkedinLogo weight="fill" className="w-5 h-5" />
                    Connect
                  </button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white dark:bg-dark-bg-primary overflow-hidden">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold mb-4">
              Our Journey
            </span>
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text">15 Years</span> of Excellence
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-blue via-brand-gold to-brand-blue transform md:-translate-x-1/2 rounded-full" />

              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center mb-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} pl-12 md:pl-0`}>
                    <Card hover className="inline-block p-4">
                      <div className="text-2xl font-bold gradient-text mb-1">
                        {milestone.year}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {milestone.event}
                      </div>
                    </Card>
                  </div>
                  <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-gradient-to-br from-brand-blue to-brand-gold rounded-full transform md:-translate-x-1/2 flex items-center justify-center shadow-lg">
                    <milestone.icon weight="fill" className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gray-50 dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold">
              Credentials & <span className="gradient-text">Certifications</span>
            </h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card hover className="flex items-center gap-3 px-4 py-3">
                  <cert.icon weight="fill" className="w-5 h-5 text-brand-gold" />
                  <span className="font-medium text-sm">{cert.name}</span>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-brand-blue to-brand-blue-dark relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl"
            animate={{ y: [0, 50, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Experience the BestUsTax Difference?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join the 50,000+ clients who trust us with their taxes every year.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button
                  size="xl"
                  className="bg-brand-gold hover:bg-brand-gold-dark text-white"
                  rightIcon={<ArrowRight weight="bold" />}
                >
                  Start Your Tax Return
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
          </motion.div>
        </div>
      </section>
    </div>
  )
}
