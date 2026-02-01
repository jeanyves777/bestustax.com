import PortalLayout from '@/components/portal/shared/PortalLayout'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PortalLayout role="admin" allowedRoles={['admin']}>
      {children}
    </PortalLayout>
  )
}
