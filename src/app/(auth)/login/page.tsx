'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eye, EyeSlash, SignIn, SpinnerGap, ShieldCheck, CheckCircle, Star } from '@phosphor-icons/react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'

const benefits = [
  'Secure 256-bit encryption',
  'Access your tax documents anytime',
  'Track your refund status',
  'Message your tax advisor',
]

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/portal'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [twoFactorCode, setTwoFactorCode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [show2FA, setShow2FA] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        twoFactorCode: show2FA ? twoFactorCode : undefined,
        redirect: false,
      })

      if (result?.error) {
        if (result.error === '2FA_REQUIRED') {
          setShow2FA(true)
          setError('')
        } else {
          setError(result.error)
        }
      } else if (result?.ok) {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center bg-white dark:bg-dark-bg-primary py-12 px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-gold flex items-center justify-center">
                <span className="text-white font-bold text-xl">BU</span>
              </div>
              <span className="text-2xl font-bold">
                Best<span className="gradient-text">UsTax</span>
              </span>
            </Link>
          </div>

          {/* Form Card */}
          <Card className="p-8">
            <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
              Sign in to access your tax portal
            </p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {show2FA && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  <Input
                    label="Two-Factor Authentication Code"
                    type="text"
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    required
                  />
                </motion.div>
              )}

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-brand-blue dark:text-brand-gold hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                glow
                disabled={loading}
                leftIcon={loading ? <SpinnerGap className="animate-spin" /> : <SignIn weight="bold" />}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link href="/register" className="text-brand-blue dark:text-brand-gold font-medium hover:underline">
                Create one
              </Link>
            </div>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <span className="mx-2">·</span>
            <Link href="/terms-of-service" className="hover:underline">Terms of Service</Link>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Info */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-brand-blue via-brand-blue-light to-brand-blue dark:from-brand-blue-dark dark:via-brand-blue dark:to-brand-blue-dark relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl"
            animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-16">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-brand-gold flex items-center justify-center mb-8">
              <ShieldCheck weight="fill" className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Your Tax Portal Awaits
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-md">
              Access all your tax documents, track your refund, and communicate with your tax advisor in one secure place.
            </p>

            <div className="space-y-4 mb-12">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 text-white/90"
                >
                  <CheckCircle weight="fill" className="w-5 h-5 text-brand-gold" />
                  {benefit}
                </motion.div>
              ))}
            </div>

            {/* Testimonial */}
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/10">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} weight="fill" className="w-4 h-4 text-brand-gold" />
                ))}
              </div>
              <p className="text-white/90 mb-4">
                "BestUsTax made filing my taxes so easy. The portal is intuitive and I got my refund faster than ever!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-gold to-brand-blue flex items-center justify-center text-white font-bold text-sm">
                  SM
                </div>
                <div>
                  <div className="text-white font-medium">Sarah M.</div>
                  <div className="text-white/60 text-sm">Verified Client</div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
