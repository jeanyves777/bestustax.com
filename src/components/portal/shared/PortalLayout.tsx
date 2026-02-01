import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import PortalLayoutClient from './PortalLayoutClient'
import { type PortalRole, getPortalConfigBase } from './types'

interface PortalLayoutProps {
  children: React.ReactNode
  role: PortalRole
  allowedRoles?: PortalRole[]
}

export default async function PortalLayout({
  children,
  role,
  allowedRoles,
}: PortalLayoutProps) {
  const session = await getServerSession(authOptions)

  // Check authentication
  if (!session) {
    const config = getPortalConfigBase(role)
    redirect(`/login?callbackUrl=${config.basePath}`)
  }

  const userRole = session.user.role as PortalRole
  const allowed = allowedRoles || [role]

  // Check authorization
  // Admin can access all portals
  if (userRole !== 'admin' && !allowed.includes(userRole)) {
    // Redirect to user's appropriate portal
    const userConfig = getPortalConfigBase(userRole === 'client' ? 'client' : userRole)
    redirect(userConfig.basePath)
  }

  return (
    <PortalLayoutClient role={role} user={session.user}>
      {children}
    </PortalLayoutClient>
  )
}
