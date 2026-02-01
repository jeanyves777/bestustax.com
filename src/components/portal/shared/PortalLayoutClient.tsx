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
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg-primary">
      <PortalSidebar config={config} user={user} />
      {/* Main content with left margin for fixed sidebar */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
