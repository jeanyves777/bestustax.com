'use client'

import { useState } from 'react'
import {
  Bell,
  Check,
  Trash,
  FunnelSimple,
  CheckCircle,
  Warning,
  Info,
  FileText,
} from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface Notification {
  id: string
  type: 'success' | 'warning' | 'info' | 'document'
  title: string
  message: string
  time: string
  read: boolean
}

const initialNotifications: Notification[] = [
  { id: '1', type: 'success', title: 'Tax Return Filed', message: 'Your 2024 tax return has been successfully filed with the IRS.', time: '1 hour ago', read: false },
  { id: '2', type: 'info', title: 'Refund Status Update', message: 'Your refund is being processed. Expected deposit in 5-7 days.', time: '3 hours ago', read: false },
  { id: '3', type: 'warning', title: 'Document Required', message: 'Please upload your 1099 form to complete your filing.', time: '1 day ago', read: false },
  { id: '4', type: 'document', title: 'Document Received', message: 'Your W-2 form has been received and verified.', time: '2 days ago', read: true },
  { id: '5', type: 'info', title: 'Appointment Confirmed', message: 'Your appointment with Sarah Johnson is confirmed for Feb 5.', time: '3 days ago', read: true },
  { id: '6', type: 'success', title: 'Refund Deposited', message: 'Your tax refund of $2,450 has been deposited to your account.', time: '1 week ago', read: true },
]

export default function ClientNotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const unreadCount = notifications.filter((n) => !n.read).length
  const filteredNotifications = filter === 'unread'
    ? notifications.filter((n) => !n.read)
    : notifications

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" weight="fill" />
      case 'warning':
        return <Warning className="w-5 h-5 text-yellow-500" weight="fill" />
      case 'document':
        return <FileText className="w-5 h-5 text-blue-500" weight="fill" />
      default:
        return <Info className="w-5 h-5 text-blue-500" weight="fill" />
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : 'All caught up!'}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0} leftIcon={<Check />}>
          Mark all read
        </Button>
      </div>

      <Card className="p-4 mb-6">
        <div className="flex items-center gap-4">
          <FunnelSimple className="w-5 h-5 text-gray-400" />
          <div className="flex gap-2">
            <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'all' ? 'bg-light-accent-primary text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
              All ({notifications.length})
            </button>
            <button onClick={() => setFilter('unread')} className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'unread' ? 'bg-light-accent-primary text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
              Unread ({unreadCount})
            </button>
          </div>
        </div>
      </Card>

      {filteredNotifications.length === 0 ? (
        <Card className="p-12 text-center">
          <Bell className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium mb-2">No notifications</h3>
          <p className="text-gray-500">{filter === 'unread' ? 'No unread notifications' : 'Your notification list is empty'}</p>
        </Card>
      ) : (
        <Card className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredNotifications.map((notification) => (
            <div key={notification.id} className={`p-4 hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary ${!notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-medium">{notification.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <button onClick={() => markAsRead(notification.id)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"><Check className="w-4 h-4" /></button>
                      )}
                      <button onClick={() => deleteNotification(notification.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"><Trash className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Card>
      )}
    </div>
  )
}
