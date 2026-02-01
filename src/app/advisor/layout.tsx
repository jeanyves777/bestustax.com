import PortalLayout from '@/components/portal/shared/PortalLayout'

export default async function AdvisorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PortalLayout role="advisor" allowedRoles={['advisor', 'admin']}>
      {children}
    </PortalLayout>
  )
}
