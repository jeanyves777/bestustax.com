import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import AuthProvider from '@/components/providers/AuthProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'BestUSTax - Maximum Tax Refunds with Expert Accountant Support',
    template: '%s | BestUSTax',
  },
  description:
    'Modern tax filing with expert accountant support. Maximize your refund with confidence. Professional tax services for individuals and businesses.',
  keywords: [
    'tax filing',
    'tax refund',
    'accountant',
    'tax services',
    'tax calculator',
    'IRS',
    'tax preparation',
    'business taxes',
    'personal taxes',
  ],
  authors: [{ name: 'BestUSTax' }],
  creator: 'BestUSTax',
  publisher: 'BestUSTax',
  metadataBase: new URL('https://bestustax.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bestustax.com',
    siteName: 'BestUSTax',
    title: 'BestUSTax - Maximum Tax Refunds with Expert Accountant Support',
    description:
      'Modern tax filing with expert accountant support. Maximize your refund with confidence.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BestUSTax - Tax Excellence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BestUSTax - Maximum Tax Refunds with Expert Accountant Support',
    description:
      'Modern tax filing with expert accountant support. Maximize your refund with confidence.',
    images: ['/twitter-image.png'],
    creator: '@bestustax',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#00D9FF" />
      </head>
      <body className={inter.variable}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
