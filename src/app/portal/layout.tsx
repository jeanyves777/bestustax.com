import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import PortalSidebar from '@/components/portal/PortalSidebar'

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login?callbackUrl=/portal')
  }

  // Redirect admins and advisors to their respective portals
  if (session.user.role === 'admin') {
    redirect('/admin')
  }

  if (session.user.role === 'advisor') {
    redirect('/advisor')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg-primary flex">
      <PortalSidebar user={session.user} />
      <main className="flex-1 lg:pl-0 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
