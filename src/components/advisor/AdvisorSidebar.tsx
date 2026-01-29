'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import {
  House,
  Users,
  Calendar,
  FileText,
  ChatCircle,
  Gear,
  SignOut,
  List,
  X,
  UserCircle,
  ChartLine
} from '@phosphor-icons/react'

const navigation = [
  { name: 'Dashboard', href: '/advisor', icon: House },
  { name: 'My Clients', href: '/advisor/clients', icon: Users },
  { name: 'Appointments', href: '/advisor/appointments', icon: Calendar },
  { name: 'Documents', href: '/advisor/documents', icon: FileText },
  { name: 'Tax Returns', href: '/advisor/tax-returns', icon: ChartLine },
  { name: 'Messages', href: '/advisor/messages', icon: ChatCircle },
  { name: 'Settings', href: '/advisor/settings', icon: Gear },
]

export default function AdvisorSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-dark-bg-secondary border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/advisor" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-light-accent-primary to-light-accent-secondary bg-clip-text text-transparent">
              BestUSTax
            </span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Advisor</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <List className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col bg-white dark:bg-dark-bg-secondary border-r border-gray-200 dark:border-gray-700">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
            <Link href="/advisor" className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-light-accent-primary to-light-accent-secondary bg-clip-text text-transparent">
                BestUSTax
              </span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Advisor</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                      : 'hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <item.icon className="w-5 h-5" weight={isActive ? 'fill' : 'regular'} />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <UserCircle className="w-6 h-6 text-blue-600" weight="fill" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{session?.user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{session?.user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary rounded-lg transition-colors"
            >
              <SignOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
