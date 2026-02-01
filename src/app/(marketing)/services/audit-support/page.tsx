import { Metadata } from 'next'
import { CheckCircle, ArrowRight, ShieldCheck, Warning, FileText, UsersFour } from '@phosphor-icons/react/dist/ssr'
import Button from '@/components/ui/Button'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'IRS Audit Support & Representation | BestUsTax',
  description:
    'Expert IRS audit representation and defense. Don\'t face the IRS alone. Our CPAs and Enrolled Agents protect your rights.',
}

const auditTypes = [
  {
    title: 'Correspondence Audit',
    description: 'The most common audit type. The IRS requests documentation by mail for specific items on your return.',
    severity: 'Low',
    icon: FileText,
  },
  {
    title: 'Office Audit',
    description: 'You\'re asked to bring documents to your local IRS office for an in-person review.',
    severity: 'Medium',
    icon: Warning,
  },
  {
    title: 'Field Audit',
    description: 'An IRS agent visits your home or business to conduct a comprehensive examination.',
    severity: 'High',
    icon: ShieldCheck,
  },
]

const services = [
  'IRS correspondence response',
  'Audit representation',
  'Document preparation',
  'Appeal representation',
  'Payment plan negotiation',
  'Penalty abatement',
  'Innocent spouse relief',
  'Offer in compromise',
]

const process = [
  {
    step: '1',
    title: 'Free Case Review',
    description: 'We analyze your IRS notice and explain your options.',
  },
  {
    step: '2',
    title: 'Documentation Gathering',
    description: 'We help you compile all necessary records and receipts.',
  },
  {
    step: '3',
    title: 'IRS Communication',
    description: 'We handle all correspondence and communication with the IRS.',
  },
  {
    step: '4',
    title: 'Resolution',
    description: 'We negotiate the best possible outcome and resolve your case.',
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
  },
]

const stats = [
  { value: '95%', label: 'Success Rate' },
  { value: '2,500+', label: 'Audits Resolved' },
  { value: '$12M+', label: 'Penalties Abated' },
  { value: '15+', label: 'Years Experience' },
]

export default function AuditSupportPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-light-bg-primary to-light-bg-secondary dark:from-dark-bg-primary dark:to-dark-bg-secondary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-light-error/10 dark:bg-dark-error/10 rounded-full text-light-error dark:text-dark-error font-medium text-sm mb-6">
              <Warning weight="fill" className="w-4 h-4" />
              Received an IRS Notice?
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              IRS <span className="gradient-text">Audit Support</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Don't face the IRS alone. Our experienced CPAs and Enrolled Agents provide
              expert representation to protect your rights and resolve your case.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" glow rightIcon={<ArrowRight weight="bold" />}>
                Get Free Case Review
              </Button>
              <Button size="xl" variant="outline">
                Call Now: (800) 555-1234
              </Button>
            </div>
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

      {/* Audit Types Section */}
      <section className="py-24 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-4">
            Types of <span className="gradient-text">IRS Audits</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Understanding your audit type helps us develop the right defense strategy.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {auditTypes.map((audit) => (
              <Card key={audit.title} hover className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    audit.severity === 'Low' ? 'bg-green-100 dark:bg-green-900/30' :
                    audit.severity === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                    'bg-red-100 dark:bg-red-900/30'
                  }`}>
                    <audit.icon weight="fill" className={`w-6 h-6 ${
                      audit.severity === 'Low' ? 'text-green-600 dark:text-green-400' :
                      audit.severity === 'Medium' ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-red-600 dark:text-red-400'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{audit.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{audit.description}</p>
                    <div className={`inline-block mt-3 px-2 py-1 rounded text-xs font-medium ${
                      audit.severity === 'Low' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' :
                      audit.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300' :
                      'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                    }`}>
                      {audit.severity} Severity
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-4">
            Our <span className="gradient-text">Process</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            We handle everything so you can focus on what matters most.
          </p>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {process.map((step, index) => (
              <div key={step.title} className="relative">
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-light-accent-primary to-transparent dark:from-dark-accent-primary" />
                )}
                <div className="relative bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-success flex items-center justify-center text-white font-bold text-xl">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">
            Audit <span className="gradient-text">Services</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {services.map((service) => (
              <div
                key={service}
                className="flex items-center gap-3 p-4 bg-white dark:bg-dark-bg-primary rounded-lg"
              >
                <CheckCircle
                  weight="fill"
                  className="w-6 h-6 text-light-success dark:text-dark-success flex-shrink-0"
                />
                <span className="font-medium">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-4">
            Audit Defense <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Clear, upfront pricing with no surprises. Free initial consultation.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier) => (
              <Card
                key={tier.name}
                variant={tier.popular ? 'bordered' : 'default'}
                className={tier.popular ? 'relative' : ''}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-success rounded-full text-white text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <CardHeader>
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
                        <CheckCircle
                          weight="fill"
                          className="w-5 h-5 text-light-success dark:text-dark-success flex-shrink-0 mt-0.5"
                        />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={tier.popular ? 'primary' : 'outline'}
                    glow={tier.popular}
                    className="w-full"
                  >
                    Get Free Consultation
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-success">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Don't Wait—Take Action Today
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            The longer you wait to respond to an IRS notice, the worse your situation can become.
            Get a free case review and protect your rights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="xl"
              variant="secondary"
              className="bg-white text-light-accent-primary hover:bg-gray-100"
            >
              Get Free Case Review
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              <UsersFour weight="fill" className="w-5 h-5 mr-2" />
              Speak to an Expert
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
