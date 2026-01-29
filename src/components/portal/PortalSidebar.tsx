'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/cn'
import {
  House,
  FileText,
  Calendar,
  Folder,
  ChatCircle,
  User,
  Gear,
  SignOut,
  List,
  X,
} from '@phosphor-icons/react'

const menuItems = [
  { name: 'Dashboard', href: '/portal', icon: House },
  { name: 'Tax Filing', href: '/portal/tax-filing', icon: FileText },
  { name: 'Appointments', href: '/portal/appointments', icon: Calendar },
  { name: 'Documents', href: '/portal/documents', icon: Folder },
  { name: 'Messages', href: '/portal/messages', icon: ChatCircle },
  { name: 'Profile', href: '/portal/profile', icon: User },
  { name: 'Settings', href: '/portal/settings', icon: Gear },
]

interface PortalSidebarProps {
  user: {
    name?: string | null
    email?: string | null
  }
}

export default function PortalSidebar({ user }: PortalSidebarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/portal') {
      return pathname === '/portal'
    }
    return pathname.startsWith(href)
  }

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <Link href="/portal" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-light-accent-primary to-light-success flex items-center justify-center">
            <span className="text-white font-bold">BU</span>
          </div>
          <div>
            <span className="font-bold text-lg">BestUsTax</span>
            <span className="block text-xs text-gray-500">Client Portal</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive(item.href)
                    ? 'bg-light-accent-primary text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                <item.icon weight={isActive(item.href) ? 'fill' : 'regular'} className="w-5 h-5" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 px-4 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-light-accent-primary to-light-success flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.name || 'Client'}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <SignOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-dark-bg-secondary rounded-lg shadow-lg"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <List className="w-6 h-6" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
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
