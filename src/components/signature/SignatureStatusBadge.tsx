'use client'

import { Check, Clock, Eye, Warning, XCircle } from '@phosphor-icons/react'
import { cn } from '@/lib/cn'

const STATUS_CONFIG = {
  pending: {
    label: 'Pending',
    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200',
    icon: Clock,
  },
  viewed: {
    label: 'Viewed',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
    icon: Eye,
  },
  signed: {
    label: 'Signed',
    className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
    icon: Check,
  },
  expired: {
    label: 'Expired',
    className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200',
    icon: Warning,
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    icon: XCircle,
  },
}

export function SignatureStatusBadge({
  status,
  className,
}: {
  status: string
  className?: string
}) {
  const config = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.pending
  const Icon = config.icon

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
        config.className,
        className
      )}
    >
      <Icon className="h-3 w-3" weight="bold" />
      {config.label}
    </span>
  )
}
