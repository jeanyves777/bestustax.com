'use client'

import dynamic from 'next/dynamic'

const SigningPage = dynamic(
  () => import('@/components/signature/SigningPage').then((module) => module.SigningPage),
  { ssr: false }
)

export default function SignPage({ params }: { params: { token: string } }) {
  return <SigningPage token={params.token} />
}
