import PortalLayout from '@/components/portal/shared/PortalLayout'

export default async function PartnerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PortalLayout role="partner" allowedRoles={['partner', 'admin']}>
      {children}
    </PortalLayout>
  )
}
