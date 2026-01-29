'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Warning,
  FileText,
  UsersFour,
  Phone,
  Gavel,
  Scales,
  Handshake,
  Timer,
  Shield,
  ChatCircleDots,
  Star
} from '@phosphor-icons/react'
import Button from '@/components/ui/Button'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

const auditTypes = [
  {
    title: 'Correspondence Audit',
    description: 'The most common audit type. The IRS requests documentation by mail for specific items on your return.',
    severity: 'Low',
    icon: FileText,
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Office Audit',
    description: 'You\'re asked to bring documents to your local IRS office for an in-person review.',
    severity: 'Medium',
    icon: Warning,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    title: 'Field Audit',
    description: 'An IRS agent visits your home or business to conduct a comprehensive examination.',
    severity: 'High',
    icon: ShieldCheck,
    color: 'from-red-500 to-pink-500',
  },
]

const services = [
  { name: 'IRS correspondence response', icon: FileText },
  { name: 'Audit representation', icon: Gavel },
  { name: 'Document preparation', icon: FileText },
  { name: 'Appeal representation', icon: Scales },
  { name: 'Payment plan negotiation', icon: Handshake },
  { name: 'Penalty abatement', icon: Shield },
  { name: 'Innocent spouse relief', icon: UsersFour },
  { name: 'Offer in compromise', icon: ChatCircleDots },
]

const process = [
  {
    step: '1',
    title: 'Free Case Review',
    description: 'We analyze your IRS notice and explain your options.',
    icon: FileText,
  },
  {
    step: '2',
    title: 'Documentation Gathering',
    description: 'We help you compile all necessary records and receipts.',
    icon: Shield,
  },
  {
    step: '3',
    title: 'IRS Communication',
    description: 'We handle all correspondence and communication with the IRS.',
    icon: ChatCircleDots,
  },
  {
    step: '4',
    title: 'Resolution',
    description: 'We negotiate the best possible outcome and resolve your case.',
    icon: CheckCircle,
  },
]

const pricingTiers = [
  {
    name: 'Correspondence',
    price: '$399',
    description: 'For mail-based audits',
    features: [
      'IRS notice review',
      'Document organization',
      'Response letter drafting',
      'Follow-up correspondence',
      'Email support',
    ],
    color: 'from-gray-500 to-gray-600',
  },
  {
    name: 'Full Representation',
    price: '$1,999',
    description: 'Complete audit defense',
    features: [
      'Everything in Correspondence',
      'Power of Attorney filing',
      'Direct IRS communication',
      'Office/field audit attendance',
      'Negotiation & settlement',
      'Dedicated case manager',
    ],
    popular: true,
    color: 'from-brand-blue to-brand-gold',
  },
  {
    name: 'Complex Cases',
    price: 'Custom',
    description: 'Business & multi-year audits',
    features: [
      'Everything in Full Rep',
      'Multi-year examination',
      'Business entity audits',
      'Criminal referral defense',
      'Appeals representation',
      'Tax court preparation',
    ],
    color: 'from-purple-500 to-pink-500',
  },
]

const stats = [
  { value: '95%', label: 'Success Rate', icon: CheckCircle },
  { value: '2,500+', label: 'Audits Resolved', icon: FileText },
  { value: '$12M+', label: 'Penalties Abated', icon: Shield },
  { value: '15+', label: 'Years Experience', icon: Timer },
]

const testimonial = {
  quote: "When I got that IRS audit notice, I panicked. BestUsTax stepped in, handled everything, and got the case dismissed. Worth every penny!",
  author: "Michael R.",
  role: "Small Business Owner",
  rating: 5,
}

export default function AuditSupportPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-red-600 via-red-500 to-orange-500 dark:from-red-800 dark:via-red-700 dark:to-orange-700 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"
            animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"
            animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-6"
              >
                <Warning weight="fill" className="w-4 h-4 text-yellow-300" />
                Received an IRS Notice? Don't Panic.
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                IRS <span className="text-yellow-300">Audit Support</span>
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Don't face the IRS alone. Our experienced CPAs and Enrolled Agents provide
                expert representation to protect your rights and resolve your case.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/book-appointment">
                  <Button size="xl" className="bg-white text-red-600 hover:bg-gray-100" rightIcon={<ArrowRight weight="bold" />}>
                    Free Case Review
                  </Button>
                </Link>
                <Button size="xl" variant="outline" className="border-white text-white hover:bg-white/10" leftIcon={<Phone weight="bold" />}>
                  Call Now: (800) 555-1234
                </Button>
              </div>

              <div className="flex flex-wrap gap-6">
                {[{ icon: ShieldCheck, text: '95% Success Rate' }, { icon: Timer, text: 'Fast Response' }, { icon: Gavel, text: 'IRS Representation' }].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-white/90">
                    <item.icon weight="fill" className="w-5 h-5 text-yellow-300" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="hidden lg:block">
              <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-white/10 flex items-center justify-center">
                        <stat.icon weight="fill" className="w-6 h-6 text-yellow-300" />
                      </div>
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-white/70 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 48L60 56C120 64 240 80 360 80C480 80 600 64 720 56C840 48 960 48 1080 56C1200 64 1320 80 1380 88L1440 96V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V48Z" className="fill-white dark:fill-dark-bg-primary" />
          </svg>
        </div>
      </section>

      {/* Audit Types Section */}
      <section className="py-24 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-semibold mb-4">
              Know Your Audit
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Types of <span className="gradient-text">IRS Audits</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Understanding your audit type helps us develop the right defense strategy.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {auditTypes.map((audit, index) => (
              <motion.div
                key={audit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="p-6 h-full relative overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${audit.color}`} />
                  <div className={`w-14 h-14 mb-4 rounded-2xl bg-gradient-to-br ${audit.color} flex items-center justify-center`}>
                    <audit.icon weight="fill" className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{audit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{audit.description}</p>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    audit.severity === 'Low' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' :
                    audit.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300' :
                    'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                  }`}>
                    {audit.severity} Severity
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-50 dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold mb-4">
              Our Process
            </span>
            <h2 className="text-4xl font-bold mb-4">
              How We <span className="gradient-text">Protect You</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We handle everything so you can focus on what matters most.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {process.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-brand-blue to-transparent" />
                )}
                <Card hover className="p-6 text-center h-full">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-gold flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold mb-4">
              Our Services
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Comprehensive <span className="gradient-text">Audit Defense</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card hover className="p-4 h-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-blue to-brand-gold flex items-center justify-center flex-shrink-0">
                      <service.icon weight="bold" className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium">{service.name}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-gray-50 dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <Card className="p-8 md:p-12 text-center bg-gradient-to-br from-brand-blue/5 to-brand-gold/5">
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} weight="fill" className="w-6 h-6 text-brand-gold" />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-blue to-brand-gold flex items-center justify-center text-white font-bold">
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="text-left">
                  <div className="font-bold">{testimonial.author}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold mb-4">
              Pricing
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Audit Defense <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Clear, upfront pricing with no surprises. Free initial consultation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className={`relative overflow-hidden h-full ${tier.popular ? 'ring-2 ring-brand-gold shadow-xl' : ''}`}>
                  {tier.popular && (
                    <div className="absolute top-0 left-0 right-0 py-2 bg-gradient-to-r from-brand-blue to-brand-gold text-white text-center text-sm font-bold">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className={tier.popular ? 'pt-12' : ''}>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}>
                      <Shield weight="bold" className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>{tier.name}</CardTitle>
                    <div className="text-4xl font-bold gradient-text mt-4">
                      {tier.price}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      {tier.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle weight="fill" className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/book-appointment">
                      <Button variant={tier.popular ? 'primary' : 'outline'} glow={tier.popular} className="w-full">
                        Get Free Consultation
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-red-600 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            animate={{ y: [0, 50, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Don't Wait—Take Action Today
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              The longer you wait to respond to an IRS notice, the worse your situation can become.
              Get a free case review and protect your rights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-appointment">
                <Button size="xl" className="bg-white text-red-600 hover:bg-gray-100" rightIcon={<ArrowRight weight="bold" />}>
                  Get Free Case Review
                </Button>
              </Link>
              <Button size="xl" variant="outline" className="border-white text-white hover:bg-white/10" leftIcon={<UsersFour weight="fill" />}>
                Speak to an Expert
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
