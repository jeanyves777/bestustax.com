'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/cn'
import {
  List,
  X,
  CaretDown,
  CaretRight,
} from '@phosphor-icons/react'
import { type PortalConfig, type MenuItem } from './navigation'

interface PortalSidebarProps {
  config: PortalConfig
}

export default function PortalSidebar({ config }: PortalSidebarProps) {
  const pathname = usePathname()
  const { theme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name)
  }

  const isActive = (href: string) => {
    if (href === config.basePath) {
      return pathname === config.basePath
    }
    return pathname.startsWith(href)
  }

  const closeMobileMenu = () => setMobileOpen(false)

  const renderMenuItem = (item: MenuItem) => {
    const active = isActive(item.href)
    const hasSubmenu = item.submenu && item.submenu.length > 0
    const isSubmenuOpen = openSubmenu === item.name

    if (hasSubmenu) {
      return (
        <div key={item.name}>
          <button
            onClick={() => toggleSubmenu(item.name)}
            className={cn(
              'w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
              isSubmenuOpen
                ? 'bg-light-accent-primary/10 text-light-accent-primary dark:bg-dark-accent-primary/10 dark:text-dark-accent-primary'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            )}
          >
            <span className="flex items-center gap-3">
              <item.icon weight={isSubmenuOpen ? 'fill' : 'regular'} className="w-5 h-5" />
              {item.name}
            </span>
            {isSubmenuOpen ? (
              <CaretDown className="w-4 h-4" />
            ) : (
              <CaretRight className="w-4 h-4" />
            )}
          </button>
          {isSubmenuOpen && item.submenu && (
            <ul className="mt-1 ml-8 space-y-1">
              {item.submenu.map((subItem) => (
                <li key={subItem.name}>
                  <Link
                    href={subItem.href}
                    onClick={closeMobileMenu}
                    className={cn(
                      'block px-4 py-2 rounded-lg text-sm transition-colors',
                      isActive(subItem.href)
                        ? 'bg-light-accent-primary text-white dark:bg-dark-accent-primary'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    )}
                  >
                    {subItem.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )
    }

    return (
      <Link
        key={item.name}
        href={item.href}
        onClick={closeMobileMenu}
        className={cn(
          'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
          active
            ? 'bg-light-accent-primary text-white dark:bg-dark-accent-primary'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
        )}
      >
        <item.icon weight={active ? 'fill' : 'regular'} className="w-5 h-5" />
        {item.name}
      </Link>
    )
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-dark-bg-secondary rounded-lg shadow-lg"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <List className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - Fixed on all screen sizes */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-dark-bg-secondary border-r border-gray-200 dark:border-gray-700 flex flex-col transition-transform lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo & Portal Title - Fixed Header */}
        <div className="flex-shrink-0 p-4 border-b border-gray-200 dark:border-gray-700">
          <Link href={config.basePath} className="flex items-center gap-3">
            <Image
              src={theme === 'dark' ? '/logos/logo-gold.svg' : '/logos/logo-blue.svg'}
              alt="BestUsTax"
              width={140}
              height={36}
              priority
            />
          </Link>
          <span className={cn('inline-block mt-2 text-xs px-2 py-0.5 rounded', config.badgeColor)}>
            {config.title}
          </span>
        </div>

        {/* Navigation - Scrollable, takes full remaining height */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {config.menuItems.map((item) => (
              <li key={item.name}>{renderMenuItem(item)}</li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}
