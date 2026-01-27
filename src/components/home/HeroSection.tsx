'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, TrendUp } from '@phosphor-icons/react'
import Button from '@/components/ui/Button'
import { FloatingNumbers } from '@/components/animations/FloatingNumbers'

const features = [
  'Maximum Refund Guarantee',
  'Expert Accountant Review',
  'Secure & Encrypted',
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-brand-blue pt-20">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#1E3A5F 1px, transparent 1px), linear-gradient(90deg, #1E3A5F 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Background Effects */}
      <FloatingNumbers />

      {/* Subtle Accent Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-blue/10 dark:bg-brand-gold/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-blue/10 dark:bg-brand-gold/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 dark:bg-white/10 border border-brand-blue/20 dark:border-white/20 mb-6"
            >
              <TrendUp weight="bold" className="w-4 h-4 text-brand-blue dark:text-white" />
              <span className="text-sm font-medium text-brand-blue dark:text-white">
                Trusted by 50,000+ Clients
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-brand-blue dark:text-white"
            >
              Get Your{' '}
              <span className="text-brand-gold">Maximum Refund</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Modern tax filing with expert accountant support. Save money, save time,
              and file with confidence.
            </motion.p>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8"
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-brand-blue dark:text-white"
                >
                  <CheckCircle
                    weight="fill"
                    className="w-5 h-5 text-brand-blue dark:text-brand-gold"
                  />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button size="xl" glow rightIcon={<ArrowRight weight="bold" />}>
                Start Your Tax Return
              </Button>
              <Button size="xl" variant="outline">
                Calculate Your Refund
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-12 pt-8 border-t border-gray-200 dark:border-white/20"
            >
              <div className="flex flex-wrap justify-center lg:justify-start gap-8">
                <div>
                  <div className="text-3xl font-bold text-brand-blue dark:text-brand-gold">4.9/5</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Client Rating
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-brand-blue dark:text-brand-gold">$2.5B+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Refunds Processed
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-brand-blue dark:text-brand-gold">50K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Happy Clients
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Animated Tax Form Visual */}
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Background Cards */}
              <motion.div
                className="absolute inset-0 bg-brand-blue/5 dark:bg-white/5 rounded-3xl shadow-xl"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ transform: 'translateX(20px) translateY(20px)' }}
              />

              {/* Main Card */}
              <motion.div
                className="absolute inset-0 bg-white dark:bg-brand-blue-light rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-white/10"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Tax Form Mockup */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <motion.div
                      className="text-2xl font-bold text-brand-blue dark:text-white"
                      animate={{ opacity: [1, 0.7, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      Tax Form 1040
                    </motion.div>
                    <motion.div
                      className="px-3 py-1 bg-brand-gold/20 dark:bg-brand-gold/20 rounded-full text-sm font-medium text-brand-gold"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Simplified
                    </motion.div>
                  </div>

                  {/* Form Fields Animation with Stagger */}
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.2, duration: 0.6 }}
                      className="space-y-2"
                    >
                      <motion.div
                        className="h-3 bg-brand-blue/20 dark:bg-white/20 rounded w-1/3"
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ delay: i * 0.5, duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className="h-10 bg-brand-blue/10 dark:bg-white/5 rounded-lg border-2 border-brand-blue/20 dark:border-white/10 relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-blue/10 dark:via-white/10 to-transparent"
                          animate={{ x: [-200, 400] }}
                          transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                        />
                      </motion.div>
                    </motion.div>
                  ))}

                  {/* Refund Amount with Enhanced Animation */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.2, type: 'spring', bounce: 0.5 }}
                    className="mt-8 p-6 bg-brand-gold rounded-2xl text-center relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: [-200, 400] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <div className="text-sm text-white/90 mb-2 relative z-10">
                      Estimated Refund
                    </div>
                    <motion.div
                      className="text-4xl font-bold text-white relative z-10"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      $3,245
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating Icons with Enhanced Movement */}
              <motion.div
                className="absolute -top-6 -right-6 w-20 h-20 bg-brand-gold rounded-2xl flex items-center justify-center shadow-lg"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <CheckCircle weight="fill" className="w-10 h-10 text-white" />
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-brand-blue dark:bg-brand-gold rounded-xl flex items-center justify-center shadow-lg"
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -10, 0],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <TrendUp weight="bold" className="w-8 h-8 text-white" />
              </motion.div>

              {/* Additional Floating Elements */}
              <motion.div
                className="absolute top-1/4 -left-8 w-12 h-12 bg-brand-blue/20 dark:bg-brand-gold/20 rounded-lg"
                animate={{
                  x: [0, -10, 0],
                  y: [0, 20, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />

              <motion.div
                className="absolute bottom-1/4 -right-8 w-16 h-16 bg-brand-gold/10 rounded-full"
                animate={{
                  x: [0, 10, 0],
                  y: [0, -20, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 48L60 56C120 64 240 80 360 80C480 80 600 64 720 56C840 48 960 48 1080 56C1200 64 1320 80 1380 88L1440 96V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V48Z"
            className="fill-light-bg-secondary dark:fill-brand-blue-dark"
          />
        </svg>
      </div>
    </section>
  )
}
