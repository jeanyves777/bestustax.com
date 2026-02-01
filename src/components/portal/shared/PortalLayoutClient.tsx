'use client'

import PortalSidebar from './PortalSidebar'
import { getPortalConfig, type PortalRole } from './navigation'

interface PortalUser {
  name?: string | null
  email?: string | null
  image?: string | null
}

interface PortalLayoutClientProps {
  children: React.ReactNode
  role: PortalRole
  user: PortalUser
}

export default function PortalLayoutClient({
  children,
  role,
  user,
}: PortalLayoutClientProps) {
  const config = getPortalConfig(role)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg-primary flex">
      <PortalSidebar config={config} user={user} />
      <main className="flex-1 lg:pl-0 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
