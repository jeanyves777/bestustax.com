export type PortalRole = 'admin' | 'advisor' | 'partner' | 'client'

export interface PortalConfigBase {
  role: PortalRole
  title: string
  basePath: string
  accentColor: string
  badgeColor: string
}

export const portalConfigsBase: Record<PortalRole, PortalConfigBase> = {
  admin: {
    role: 'admin',
    title: 'Admin Portal',
    basePath: '/admin',
    accentColor: 'blue',
    badgeColor: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  },
  advisor: {
    role: 'advisor',
    title: 'Advisor Portal',
    basePath: '/advisor',
    accentColor: 'blue',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  },
  partner: {
    role: 'partner',
    title: 'Partner Portal',
    basePath: '/partner',
    accentColor: 'green',
    badgeColor: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  },
  client: {
    role: 'client',
    title: 'Client Portal',
    basePath: '/portal',
    accentColor: 'blue',
    badgeColor: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
  },
}

export function getPortalConfigBase(role: PortalRole): PortalConfigBase {
  return portalConfigsBase[role]
}
