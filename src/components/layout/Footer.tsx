'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import {
  EnvelopeSimple,
  Phone,
  MapPin,
  FacebookLogo,
  TwitterLogo,
  LinkedinLogo,
  InstagramLogo,
} from '@phosphor-icons/react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const footerLinks = {
  services: [
    { label: 'Personal Tax', href: '/services/personal-tax' },
    { label: 'Business Tax', href: '/services/business-tax' },
    { label: 'Tax Planning', href: '/services/tax-planning' },
    { label: 'Audit Support', href: '/services/audit-support' },
    { label: 'Bookkeeping', href: '/services/bookkeeping' },
  ],
  tools: [
    { label: 'Refund Estimator', href: '/tools/refund-estimator' },
    { label: 'Withholding Calculator', href: '/tools/withholding' },
    { label: 'Self-Employment Tax', href: '/tools/self-employment' },
    { label: 'Tax Brackets', href: '/tools/tax-brackets' },
  ],
  resources: [
    { label: 'Tax Guides', href: '/resources/guides' },
    { label: 'IRS Forms', href: '/resources/forms' },
    { label: 'Tax Calendar', href: '/resources/calendar' },
    { label: 'Blog', href: '/resources/blog' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Security', href: '/security' },
    { label: 'Accessibility', href: '/accessibility' },
    { label: 'Cookie Policy', href: '/cookies-policy' },
  ],
}

const socialLinks = [
  { icon: FacebookLogo, href: 'https://facebook.com', label: 'Facebook' },
  { icon: TwitterLogo, href: 'https://twitter.com', label: 'Twitter' },
  { icon: LinkedinLogo, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: InstagramLogo, href: 'https://instagram.com', label: 'Instagram' },
]

export function Footer() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <footer className="bg-white dark:bg-dark-bg-secondary border-t border-gray-200 dark:border-gray-800">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-success">
        <div className="container-custom py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Stay Updated on Tax News
            </h3>
            <p className="text-white/90 mb-6">
              Get the latest tax tips, deadlines, and financial insights
              delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white dark:bg-dark-bg-primary"
                required
              />
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                className="bg-white text-light-accent-primary hover:bg-gray-100 dark:bg-dark-bg-primary dark:text-dark-accent-primary"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              {mounted && (
                <Image
                  src={theme === 'dark' ? '/logos/logo-gold.svg' : '/logos/logo-blue.svg'}
                  alt="BEST"
                  width={140}
                  height={40}
                  className="h-8 w-auto"
                />
              )}
              {!mounted && (
                <div className="h-8 w-28 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              )}
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
              Professional bookkeeping, accounting, and tax services. Maximize
              your refund with confidence and expert support.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Phone weight="bold" className="w-5 h-5 text-light-accent-primary dark:text-dark-accent-primary" />
                <span className="text-gray-600 dark:text-gray-400">
                  (555) 123-4567
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <EnvelopeSimple weight="bold" className="w-5 h-5 text-light-accent-primary dark:text-dark-accent-primary" />
                <span className="text-gray-600 dark:text-gray-400">
                  info@bestustax.com
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin weight="bold" className="w-5 h-5 text-light-accent-primary dark:text-dark-accent-primary" />
                <span className="text-gray-600 dark:text-gray-400">
                  123 Tax Avenue, Suite 100
                  <br />
                  New York, NY 10001
                </span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-light-accent-primary dark:hover:text-dark-accent-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4">
              Tools
            </h4>
            <ul className="space-y-2">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-light-accent-primary dark:hover:text-dark-accent-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-light-accent-primary dark:hover:text-dark-accent-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-light-accent-primary dark:hover:text-dark-accent-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-light-accent-primary dark:hover:bg-dark-accent-primary hover:text-white transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon weight="fill" className="w-5 h-5" />
            </motion.a>
          ))}
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {footerLinks.legal.map((link, index) => (
            <span key={link.href} className="flex items-center">
              <Link
                href={link.href}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-light-accent-primary dark:hover:text-dark-accent-primary transition-colors"
              >
                {link.label}
              </Link>
              {index < footerLinks.legal.length - 1 && (
                <span className="mx-2 text-gray-400">•</span>
              )}
            </span>
          ))}
        </div>

        {/* IRS Circular 230 Disclosure */}
        <div className="max-w-4xl mx-auto mb-6 p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
            <strong>IRS Circular 230 Disclosure:</strong> To ensure compliance
            with requirements imposed by the IRS, we inform you that any U.S.
            federal tax advice contained in this communication is not intended
            or written to be used, and cannot be used, for the purpose of (i)
            avoiding penalties under the Internal Revenue Code or (ii) promoting,
            marketing or recommending to another party any transaction or matter
            addressed herein.
          </p>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} BestUSTax. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Built with modern technology for superior tax services
          </p>
        </div>
      </div>
    </footer>
  )
}
