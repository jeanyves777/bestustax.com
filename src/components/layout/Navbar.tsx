'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X, CaretDown } from '@phosphor-icons/react'
import { ThemeToggle } from './ThemeToggle'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import type { NavLink } from '@/types'
import { useTheme } from 'next-themes'

const navigation: NavLink[] = [
  {
    label: 'Services',
    href: '/services',
    subLinks: [
      {
        label: 'Personal Tax',
        href: '/services/personal-tax',
        description: 'Individual tax filing and optimization',
      },
      {
        label: 'Business Tax',
        href: '/services/business-tax',
        description: 'Business tax solutions and planning',
      },
      {
        label: 'Tax Planning',
        href: '/services/tax-planning',
        description: 'Year-round strategic tax planning',
      },
      {
        label: 'Audit Support',
        href: '/services/audit-support',
        description: 'IRS audit assistance and representation',
      },
      {
        label: 'Bookkeeping',
        href: '/services/bookkeeping',
        description: 'Professional bookkeeping services',
      },
    ],
  },
  {
    label: 'Tax Tools',
    href: '/tools',
    subLinks: [
      {
        label: 'Refund Estimator',
        href: '/tools/refund-estimator',
        description: 'Calculate your potential tax refund',
      },
      {
        label: 'Withholding Calculator',
        href: '/tools/withholding',
        description: 'Optimize your W-4 withholding',
      },
      {
        label: 'Self-Employment Tax',
        href: '/tools/self-employment',
        description: 'Estimate self-employment taxes',
      },
      {
        label: 'Tax Bracket Visualizer',
        href: '/tools/tax-brackets',
        description: 'Understand your tax bracket',
      },
    ],
  },
  {
    label: 'Resources',
    href: '/resources',
    subLinks: [
      {
        label: 'Tax Guides',
        href: '/resources/guides',
        description: 'Comprehensive tax information',
      },
      {
        label: 'IRS Forms',
        href: '/resources/forms',
        description: 'Download tax forms',
      },
      {
        label: 'Tax Calendar',
        href: '/resources/calendar',
        description: 'Important tax dates',
      },
      {
        label: 'Blog',
        href: '/resources/blog',
        description: 'Tax tips and updates',
      },
    ],
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 dark:bg-dark-bg-primary/80 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            {mounted && (
              <Image
                src={theme === 'dark' ? '/logos/logo-gold.svg' : '/logos/logo-blue.svg'}
                alt="BEST"
                width={140}
                height={40}
                className="h-10 w-auto transition-transform group-hover:scale-105"
                priority
              />
            )}
            {!mounted && (
              <div className="h-10 w-28 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.subLinks && setActiveDropdown(item.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-1',
                    'text-gray-700 dark:text-gray-300',
                    'hover:text-light-accent-primary dark:hover:text-dark-accent-primary',
                    'hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                >
                  {item.label}
                  {item.subLinks && (
                    <CaretDown
                      weight="bold"
                      className={cn(
                        'w-4 h-4 transition-transform',
                        activeDropdown === item.label && 'rotate-180'
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.subLinks && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-72 glass rounded-xl shadow-2xl overflow-hidden"
                    >
                      {item.subLinks.map((subLink, index) => (
                        <Link
                          key={subLink.href}
                          href={subLink.href}
                          className="block px-4 py-3 hover:bg-light-accent-primary/10 dark:hover:bg-dark-accent-primary/10 transition-colors border-b border-gray-200 dark:border-gray-700 last:border-0"
                        >
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {subLink.label}
                          </div>
                          {subLink.description && (
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                              {subLink.description}
                            </div>
                          )}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:inline-flex"
              >
                Client Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" glow className="hidden md:inline-flex">
                Get Started
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X weight="bold" className="w-6 h-6" />
              ) : (
                <List weight="bold" className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-dark-bg-secondary border-t border-gray-200 dark:border-gray-800"
          >
            <div className="container-custom py-4 space-y-2">
              {navigation.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="block px-4 py-3 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => !item.subLinks && setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.subLinks && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.subLinks.map((subLink) => (
                        <Link
                          key={subLink.href}
                          href={subLink.href}
                          className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-2">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Client Login
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full" glow>
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
