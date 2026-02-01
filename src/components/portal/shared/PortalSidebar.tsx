'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/cn'
import {
  SignOut,
  List,
  X,
  CaretDown,
  CaretRight,
} from '@phosphor-icons/react'
import { type PortalConfig, type MenuItem } from './navigation'

interface PortalUser {
  name?: string | null
  email?: string | null
  image?: string | null
}

interface PortalSidebarProps {
  config: PortalConfig
  user: PortalUser
}

export default function PortalSidebar({ config, user }: PortalSidebarProps) {
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

  const SidebarContent = () => (
    <>
      {/* Logo & Portal Title */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <Link href={config.basePath} className="flex items-center gap-3">
          <Image
            src={theme === 'dark' ? '/logos/logo-gold.svg' : '/logos/logo-blue.svg'}
            alt="BestUsTax"
            width={120}
            height={32}
            priority
          />
        </Link>
        <span className={cn('inline-block mt-2 text-xs px-2 py-0.5 rounded', config.badgeColor)}>
          {config.title}
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {config.menuItems.map((item) => (
            <li key={item.name}>{renderMenuItem(item)}</li>
          ))}
        </ul>
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 px-4 py-2 mb-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-accent-secondary flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.name || 'User'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
        >
          <SignOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </>
  )

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

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-dark-bg-secondary border-r border-gray-200 dark:border-gray-700 flex flex-col transition-transform lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent />
      </aside>
    </>
  )
}
