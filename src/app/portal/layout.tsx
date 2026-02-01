import PortalLayout from '@/components/portal/shared/PortalLayout'

export default async function ClientPortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PortalLayout role="client" allowedRoles={['client']}>
      {children}
    </PortalLayout>
  )
}
