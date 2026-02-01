'use client'

import PortalSidebar from './PortalSidebar'
import PortalTopNav from './PortalTopNav'
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
      {/* Fixed Sidebar */}
      <PortalSidebar config={config} />

      {/* Fixed Top Navigation */}
      <PortalTopNav user={user} role={role} basePath={config.basePath} />

      {/* Main content with margins for fixed sidebar and top nav */}
      <main className="lg:ml-64 pt-16 min-h-screen">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
