import {
  House,
  Calendar,
  Users,
  FileText,
  ChatCircle,
  Target,
  Handshake,
  Envelope,
  Article,
  Lightning,
  ChartBar,
  ClockCounterClockwise,
  Gear,
  UserCircle,
  Folder,
  User,
  CurrencyDollar,
  Link as LinkIcon,
  ChartLine,
  type Icon,
} from '@phosphor-icons/react'

export type PortalRole = 'admin' | 'advisor' | 'partner' | 'client'

export interface MenuItem {
  name: string
  href: string
  icon: Icon
  submenu?: { name: string; href: string }[]
}

export interface PortalConfig {
  role: PortalRole
  title: string
  basePath: string
  accentColor: string
  badgeColor: string
  menuItems: MenuItem[]
}

// Admin Portal Navigation
const adminMenuItems: MenuItem[] = [
  { name: 'Dashboard', href: '/admin', icon: House },
  { name: 'Appointments', href: '/admin/appointments', icon: Calendar },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Advisors', href: '/admin/advisors', icon: UserCircle },
  { name: 'Documents', href: '/admin/documents', icon: FileText },
  { name: 'Tax Returns', href: '/admin/tax-returns', icon: FileText },
  { name: 'Messages', href: '/admin/messages', icon: ChatCircle },
  { name: 'Leads', href: '/admin/leads', icon: Target },
  { name: 'Partners', href: '/admin/partners', icon: Handshake },
  { name: 'Email Marketing', href: '/admin/email-marketing', icon: Envelope },
  { name: 'Blog', href: '/admin/blog', icon: Article },
  { name: 'Rapid Doc', href: '/admin/rapid-doc', icon: Lightning },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: ChartBar,
    submenu: [
      { name: 'Overview', href: '/admin/analytics' },
      { name: 'Advisors', href: '/admin/analytics/advisors' },
      { name: 'Partners', href: '/admin/analytics/partners' },
      { name: 'Geographic', href: '/admin/analytics/geographic' },
      { name: 'Security', href: '/admin/analytics/security' },
    ],
  },
  { name: 'Activity Log', href: '/admin/activity', icon: ClockCounterClockwise },
  { name: 'Settings', href: '/admin/settings', icon: Gear },
]

// Advisor Portal Navigation
const advisorMenuItems: MenuItem[] = [
  { name: 'Dashboard', href: '/advisor', icon: House },
  { name: 'My Clients', href: '/advisor/clients', icon: Users },
  { name: 'Appointments', href: '/advisor/appointments', icon: Calendar },
  { name: 'Documents', href: '/advisor/documents', icon: FileText },
  { name: 'Tax Returns', href: '/advisor/tax-returns', icon: ChartLine },
  { name: 'Messages', href: '/advisor/messages', icon: ChatCircle },
  { name: 'Settings', href: '/advisor/settings', icon: Gear },
]

// Partner Portal Navigation
const partnerMenuItems: MenuItem[] = [
  { name: 'Dashboard', href: '/partner', icon: House },
  { name: 'Referrals', href: '/partner/referrals', icon: Users },
  { name: 'Earnings', href: '/partner/earnings', icon: CurrencyDollar },
  { name: 'Resources', href: '/partner/resources', icon: LinkIcon },
  { name: 'Settings', href: '/partner/settings', icon: Gear },
]

// Client Portal Navigation
const clientMenuItems: MenuItem[] = [
  { name: 'Dashboard', href: '/portal', icon: House },
  { name: 'Tax Filing', href: '/portal/tax-filing', icon: FileText },
  { name: 'Appointments', href: '/portal/appointments', icon: Calendar },
  { name: 'Documents', href: '/portal/documents', icon: Folder },
  { name: 'Messages', href: '/portal/messages', icon: ChatCircle },
  { name: 'Profile', href: '/portal/profile', icon: User },
  { name: 'Settings', href: '/portal/settings', icon: Gear },
]

// Portal configurations
export const portalConfigs: Record<PortalRole, PortalConfig> = {
  admin: {
    role: 'admin',
    title: 'Admin Portal',
    basePath: '/admin',
    accentColor: 'blue',
    badgeColor: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    menuItems: adminMenuItems,
  },
  advisor: {
    role: 'advisor',
    title: 'Advisor Portal',
    basePath: '/advisor',
    accentColor: 'blue',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    menuItems: advisorMenuItems,
  },
  partner: {
    role: 'partner',
    title: 'Partner Portal',
    basePath: '/partner',
    accentColor: 'green',
    badgeColor: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    menuItems: partnerMenuItems,
  },
  client: {
    role: 'client',
    title: 'Client Portal',
    basePath: '/portal',
    accentColor: 'blue',
    badgeColor: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
    menuItems: clientMenuItems,
  },
}

export function getPortalConfig(role: PortalRole): PortalConfig {
  return portalConfigs[role]
}
