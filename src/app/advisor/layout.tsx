import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import AdvisorSidebar from '@/components/advisor/AdvisorSidebar'

export default async function AdvisorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  if (session.user.role !== 'advisor' && session.user.role !== 'admin') {
    redirect('/portal')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg-primary">
      <AdvisorSidebar />
      <div className="lg:pl-64">
        <main className="p-6 lg:p-8 pt-20 lg:pt-8">{children}</main>
      </div>
    </div>
  )
}
