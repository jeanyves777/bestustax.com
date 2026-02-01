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
} from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface Notification {
  id: string
  type: 'success' | 'warning' | 'info'
  title: string
  message: string
  time: string
  read: boolean
}

const initialNotifications: Notification[] = [
  { id: '1', type: 'info', title: 'New Client Assigned', message: 'Sarah Johnson has been assigned to you for tax preparation.', time: '10 minutes ago', read: false },
  { id: '2', type: 'warning', title: 'Appointment in 1 Hour', message: 'Reminder: Meeting with John Smith at 2:00 PM.', time: '30 minutes ago', read: false },
  { id: '3', type: 'success', title: 'Document Received', message: 'Client Mike Brown uploaded their W-2 form.', time: '2 hours ago', read: false },
  { id: '4', type: 'info', title: 'New Message', message: 'You have a new message from client Emily Davis.', time: '3 hours ago', read: true },
  { id: '5', type: 'success', title: 'Tax Return Approved', message: 'Return #3245 has been approved and filed.', time: '5 hours ago', read: true },
  { id: '6', type: 'warning', title: 'Document Missing', message: 'Client James Wilson is missing 1099 form.', time: '1 day ago', read: true },
]

export default function AdvisorNotificationsPage() {
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
