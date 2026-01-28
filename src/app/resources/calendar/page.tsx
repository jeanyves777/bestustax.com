import { Metadata } from 'next'
import { Calendar, Bell, CheckCircle, Warning, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Tax Calendar & Deadlines | BestUsTax',
  description:
    '2024 tax calendar with all important IRS deadlines. Never miss a filing deadline or estimated tax payment.',
}

const months = [
  {
    month: 'January 2024',
    events: [
      { date: 'Jan 16', title: 'Q4 2023 Estimated Tax Due', type: 'payment', description: 'Final quarterly estimated tax payment for 2023' },
      { date: 'Jan 31', title: 'W-2s & 1099s Due', type: 'deadline', description: 'Employers must send W-2s; businesses must send 1099-NEC' },
    ],
  },
  {
    month: 'February 2024',
    events: [
      { date: 'Feb 15', title: '1099-B & 1099-S Due', type: 'deadline', description: 'Brokers and real estate transactions reporting' },
      { date: 'Feb 28', title: 'Paper 1099s to IRS', type: 'deadline', description: 'Deadline for paper filing of information returns' },
    ],
  },
  {
    month: 'March 2024',
    events: [
      { date: 'Mar 15', title: 'S-Corp & Partnership Returns', type: 'deadline', description: 'Form 1120-S and Form 1065 due' },
      { date: 'Mar 15', title: 'S-Corp Election Deadline', type: 'deadline', description: 'Form 2553 due for current year election' },
    ],
  },
  {
    month: 'April 2024',
    events: [
      { date: 'Apr 15', title: 'Individual Tax Returns Due', type: 'major', description: 'Form 1040 filing deadline' },
      { date: 'Apr 15', title: 'Q1 Estimated Tax Due', type: 'payment', description: 'First quarterly payment for 2024' },
      { date: 'Apr 15', title: 'Extension Deadline', type: 'deadline', description: 'File Form 4868 for 6-month extension' },
      { date: 'Apr 15', title: 'C-Corp Returns Due', type: 'deadline', description: 'Form 1120 due for calendar-year corps' },
      { date: 'Apr 15', title: 'IRA Contribution Deadline', type: 'deadline', description: 'Last day to contribute to IRA for 2023' },
    ],
  },
  {
    month: 'May 2024',
    events: [
      { date: 'May 15', title: 'Exempt Org Returns', type: 'deadline', description: 'Form 990 due for tax-exempt organizations' },
    ],
  },
  {
    month: 'June 2024',
    events: [
      { date: 'Jun 17', title: 'Q2 Estimated Tax Due', type: 'payment', description: 'Second quarterly payment for 2024' },
      { date: 'Jun 17', title: 'Expat Returns Due', type: 'deadline', description: 'U.S. citizens abroad auto-extension deadline' },
    ],
  },
  {
    month: 'September 2024',
    events: [
      { date: 'Sep 16', title: 'Q3 Estimated Tax Due', type: 'payment', description: 'Third quarterly payment for 2024' },
      { date: 'Sep 16', title: 'Extended S-Corp/Partnership', type: 'deadline', description: 'Extended Form 1120-S and 1065 due' },
    ],
  },
  {
    month: 'October 2024',
    events: [
      { date: 'Oct 15', title: 'Extended Returns Due', type: 'major', description: 'Extended individual returns (Form 1040) due' },
      { date: 'Oct 15', title: 'Extended C-Corp Returns', type: 'deadline', description: 'Extended Form 1120 due' },
    ],
  },
  {
    month: 'December 2024',
    events: [
      { date: 'Dec 31', title: 'Tax Planning Deadline', type: 'deadline', description: 'Last day for 2024 tax planning moves' },
      { date: 'Dec 31', title: 'RMD Deadline', type: 'deadline', description: 'Required Minimum Distributions due' },
    ],
  },
  {
    month: 'January 2025',
    events: [
      { date: 'Jan 15', title: 'Q4 2024 Estimated Tax Due', type: 'payment', description: 'Final quarterly payment for 2024' },
    ],
  },
]

const upcomingDeadlines = [
  { date: 'April 15, 2024', title: 'Individual Tax Returns Due', daysLeft: 77, type: 'major' },
  { date: 'April 15, 2024', title: 'Q1 Estimated Payment', daysLeft: 77, type: 'payment' },
  { date: 'June 17, 2024', title: 'Q2 Estimated Payment', daysLeft: 140, type: 'payment' },
  { date: 'September 16, 2024', title: 'Q3 Estimated Payment', daysLeft: 231, type: 'payment' },
]

const reminderTips = [
  'Set calendar reminders 2 weeks before each deadline',
  'Mark payment deadlines for estimated taxes',
  'Track document arrival dates (W-2s, 1099s)',
  'Note extension deadlines if you might need more time',
]

function getEventColor(type: string) {
  switch (type) {
    case 'major':
      return 'bg-light-error dark:bg-dark-error text-white'
    case 'payment':
      return 'bg-light-warning dark:bg-dark-warning text-gray-900'
    case 'deadline':
      return 'bg-light-accent-primary dark:bg-dark-accent-primary text-white'
    default:
      return 'bg-gray-500 text-white'
  }
}

export default function CalendarPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-light-bg-primary to-light-bg-secondary dark:from-dark-bg-primary dark:to-dark-bg-secondary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-light-accent-primary/10 dark:bg-dark-accent-primary/10 rounded-full text-light-accent-primary dark:text-dark-accent-primary font-medium text-sm mb-6">
              <Calendar weight="fill" className="w-4 h-4" />
              2024 Tax Year
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tax <span className="gradient-text">Calendar & Deadlines</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Never miss an important tax deadline. View all IRS filing dates and
              payment deadlines for the 2024 tax year.
            </p>
            <Button size="lg" glow leftIcon={<Bell weight="fill" />}>
              Set Up Deadline Reminders
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Deadlines */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8">
            Upcoming <span className="gradient-text">Deadlines</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingDeadlines.map((deadline) => (
              <Card key={deadline.title} hover className="p-6 text-center">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${getEventColor(deadline.type)}`}>
                  {deadline.type === 'major' ? 'MAJOR' : deadline.type === 'payment' ? 'PAYMENT' : 'DEADLINE'}
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">
                  {deadline.daysLeft} days
                </div>
                <div className="font-medium mb-1">{deadline.title}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {deadline.date}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Full Calendar */}
      <section className="py-16 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">
            Full <span className="gradient-text">Tax Calendar</span>
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {months.map((monthData) => (
              <Card key={monthData.month} className="overflow-hidden">
                <div className="bg-gradient-to-r from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-success px-6 py-4">
                  <h3 className="text-xl font-bold text-white">{monthData.month}</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {monthData.events.map((event) => (
                      <div
                        key={event.date + event.title}
                        className="flex items-start gap-4 p-4 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg"
                      >
                        <div className="text-center min-w-[60px]">
                          <div className="text-sm font-bold text-light-accent-primary dark:text-dark-accent-primary">
                            {event.date.split(' ')[0]}
                          </div>
                          <div className="text-2xl font-bold">
                            {event.date.split(' ')[1]}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${getEventColor(event.type)}`}>
                              {event.type === 'major' ? 'MAJOR' : event.type === 'payment' ? 'PAYMENT' : 'DEADLINE'}
                            </span>
                          </div>
                          <h4 className="font-bold">{event.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {event.description}
                          </p>
                        </div>
                        {event.type === 'major' && (
                          <Warning weight="fill" className="w-6 h-6 text-light-error dark:text-dark-error flex-shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reminder Tips */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Bell weight="fill" className="w-6 h-6 text-light-accent-primary dark:text-dark-accent-primary" />
              <h2 className="text-2xl font-bold">Never Miss a Deadline</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {reminderTips.map((tip) => (
                <div
                  key={tip}
                  className="flex items-start gap-3 p-4 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg"
                >
                  <CheckCircle
                    weight="fill"
                    className="w-5 h-5 text-light-success dark:text-dark-success flex-shrink-0 mt-0.5"
                  />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Extension Info */}
      <section className="py-16 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">
                Need More Time? File an Extension
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                If you can't file by April 15, you can request an automatic 6-month extension
                by filing Form 4868. This gives you until October 15 to file your return.
              </p>
              <div className="p-4 bg-light-warning/10 dark:bg-dark-warning/10 border-l-4 border-light-warning dark:border-dark-warning rounded-r-lg mb-6">
                <p className="text-sm">
                  <strong>Important:</strong> An extension to file is NOT an extension to pay.
                  You must still pay any taxes owed by April 15 to avoid penalties and interest.
                </p>
              </div>
              <Button rightIcon={<ArrowRight />}>
                Learn About Filing Extensions
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-success">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Get Your Taxes Done On Time
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Don't wait until the last minute. Start your tax return today
            and file with confidence.
          </p>
          <Button
            size="xl"
            variant="secondary"
            className="bg-white text-light-accent-primary hover:bg-gray-100"
          >
            Start Your Tax Return
          </Button>
        </div>
      </section>
    </div>
  )
}
