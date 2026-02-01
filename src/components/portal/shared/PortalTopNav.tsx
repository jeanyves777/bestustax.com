'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { signOut } from 'next-auth/react'
import {
  Bell,
  User,
  Gear,
  SignOut,
  CaretDown,
  Moon,
  Sun,
  Check,
  X,
} from '@phosphor-icons/react'
import { cn } from '@/lib/cn'
import { type PortalRole } from './types'

interface PortalUser {
  name?: string | null
  email?: string | null
  image?: string | null
}

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
}

interface PortalTopNavProps {
  user: PortalUser
  role: PortalRole
  basePath: string
}

// Mock notifications - in production, fetch from API
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Message',
    message: 'You have a new message from support',
    time: '5 min ago',
    read: false,
  },
  {
    id: '2',
    title: 'Document Uploaded',
    message: 'Your W-2 has been processed',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    title: 'Appointment Reminder',
    message: 'You have an appointment tomorrow at 2 PM',
    time: '2 hours ago',
    read: true,
  },
]

export default function PortalTopNav({ user, role, basePath }: PortalTopNavProps) {
  const { theme, setTheme } = useTheme()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [notifications, setNotifications] = useState(mockNotifications)

  const notificationRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const getSettingsPath = () => {
    return `${basePath}/settings`
  }

  const getProfilePath = () => {
    if (role === 'client') return `${basePath}/profile`
    return `${basePath}/settings`
  }

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-30 h-16 bg-white dark:bg-dark-bg-secondary border-b border-gray-200 dark:border-gray-700">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between">
        {/* Logo for mobile */}
        <div className="lg:hidden flex items-center pl-12">
          <Image
            src={theme === 'dark' ? '/logos/logo-gold.svg' : '/logos/logo-blue.svg'}
            alt="BestUsTax"
            width={100}
            height={28}
            priority
          />
        </div>

        {/* Spacer for desktop */}
        <div className="hidden lg:block" />

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>

          {/* Notifications Dropdown */}
          <div ref={notificationRef} className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications)
                setShowProfile(false)
              }}
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Panel */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-dark-bg-secondary rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <h3 className="font-semibold">Notifications</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-light-accent-primary dark:text-dark-accent-primary hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          'p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer',
                          !notification.read && 'bg-blue-50/50 dark:bg-blue-900/10'
                        )}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {notification.time}
                            </p>
                          </div>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    href={`${basePath}/notifications`}
                    className="block text-center text-sm text-light-accent-primary dark:text-dark-accent-primary hover:underline"
                    onClick={() => setShowNotifications(false)}
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => {
                setShowProfile(!showProfile)
                setShowNotifications(false)
              }}
              className="flex items-center gap-2 p-1.5 pr-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-accent-secondary flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">
                  {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium truncate max-w-[120px]">
                  {user.name || 'User'}
                </p>
              </div>
              <CaretDown className="w-4 h-4 text-gray-400 hidden md:block" />
            </button>

            {/* Profile Panel */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-dark-bg-secondary rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* User Info */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-light-accent-primary to-light-success dark:from-dark-accent-primary dark:to-dark-accent-secondary flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-medium">
                        {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{user.name || 'User'}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <Link
                    href={getProfilePath()}
                    onClick={() => setShowProfile(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <User className="w-5 h-5 text-gray-500" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    href={getSettingsPath()}
                    onClick={() => setShowProfile(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Gear className="w-5 h-5 text-gray-500" />
                    <span>Settings</span>
                  </Link>
                </div>

                {/* Logout */}
                <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <SignOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
