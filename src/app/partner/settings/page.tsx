'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import {
  Gear,
  Bell,
  Shield,
  Bank,
  Key,
  SignOut,
  Check,
  SpinnerGap,
  User as UserIcon,
  EnvelopeSimple,
  Phone,
  Camera
} from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function PartnerSettingsPage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('profile')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  })

  const [paymentInfo, setPaymentInfo] = useState({
    paymentMethod: 'bank',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    paypalEmail: '',
  })

  const [notifications, setNotifications] = useState({
    newReferral: true,
    referralConverted: true,
    payoutProcessed: true,
    monthlyReport: true,
  })

  useEffect(() => {
    if (session?.user) {
      setProfile({
        name: session.user.name || '',
        email: session.user.email || '',
        phone: '',
        company: '',
      })
    }
  }, [session])

  const saveProfile = async () => {
    setSaving(true)
    try {
      await fetch('/api/partner/settings/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      setSaving(false)
    }
  }

  const savePaymentInfo = async () => {
    setSaving(true)
    try {
      await fetch('/api/partner/settings/payment', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentInfo),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Error saving payment info:', error)
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'payment', label: 'Payment', icon: Bank },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your partner account
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <Card className="md:w-64 p-2 h-fit">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-600'
                    : 'hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </Card>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Profile Information</h2>

              <div className="flex items-center gap-6 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <UserIcon className="w-10 h-10 text-green-600" weight="fill" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold">{profile.name}</h3>
                  <p className="text-sm text-gray-500">Partner Account</p>
                </div>
              </div>

              <div className="space-y-4">
                <Input
                  label="Full Name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  leftIcon={<UserIcon />}
                />
                <Input
                  label="Email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  leftIcon={<EnvelopeSimple />}
                  disabled
                />
                <Input
                  label="Phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  leftIcon={<Phone />}
                  placeholder="(555) 123-4567"
                />
                <Input
                  label="Company (Optional)"
                  value={profile.company}
                  onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                  placeholder="Your company name"
                />

                <div className="flex justify-end pt-4">
                  <Button onClick={saveProfile} disabled={saving}>
                    {saving ? (
                      <SpinnerGap className="w-4 h-4 animate-spin mr-2" />
                    ) : saved ? (
                      <Check className="w-4 h-4 mr-2" />
                    ) : null}
                    {saved ? 'Saved!' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'payment' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Set up how you want to receive your commission payouts
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">Payment Method</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setPaymentInfo({ ...paymentInfo, paymentMethod: 'bank' })}
                      className={`p-4 rounded-lg border-2 text-center transition-colors ${
                        paymentInfo.paymentMethod === 'bank'
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <Bank className="w-8 h-8 mx-auto mb-2" />
                      <span className="font-medium">Bank Transfer</span>
                    </button>
                    <button
                      onClick={() => setPaymentInfo({ ...paymentInfo, paymentMethod: 'paypal' })}
                      className={`p-4 rounded-lg border-2 text-center transition-colors ${
                        paymentInfo.paymentMethod === 'paypal'
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <EnvelopeSimple className="w-8 h-8 mx-auto mb-2" />
                      <span className="font-medium">PayPal</span>
                    </button>
                  </div>
                </div>

                {paymentInfo.paymentMethod === 'bank' ? (
                  <div className="space-y-4">
                    <Input
                      label="Bank Name"
                      value={paymentInfo.bankName}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, bankName: e.target.value })}
                      placeholder="Chase Bank"
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="Account Number"
                        value={paymentInfo.accountNumber}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, accountNumber: e.target.value })}
                        placeholder="••••••••1234"
                      />
                      <Input
                        label="Routing Number"
                        value={paymentInfo.routingNumber}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, routingNumber: e.target.value })}
                        placeholder="021000021"
                      />
                    </div>
                  </div>
                ) : (
                  <Input
                    label="PayPal Email"
                    type="email"
                    value={paymentInfo.paypalEmail}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, paypalEmail: e.target.value })}
                    placeholder="your@email.com"
                  />
                )}

                <div className="flex justify-end pt-4">
                  <Button onClick={savePaymentInfo} disabled={saving}>
                    {saving ? (
                      <SpinnerGap className="w-4 h-4 animate-spin mr-2" />
                    ) : saved ? (
                      <Check className="w-4 h-4 mr-2" />
                    ) : null}
                    {saved ? 'Saved!' : 'Save Payment Info'}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>

              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                    <div>
                      <div className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      <div className="text-sm text-gray-500">
                        Get notified when {key.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          setNotifications({ ...notifications, [key]: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-500/25 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Security</h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Key className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Password</p>
                      <p className="text-sm text-gray-500">Change your password</p>
                    </div>
                  </div>
                  <Button variant="outline">
                    Change Password
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Add extra security</p>
                    </div>
                  </div>
                  <Button variant="outline">
                    Enable 2FA
                  </Button>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <SignOut className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">Sign Out</p>
                        <p className="text-sm text-gray-500">Sign out of your account</p>
                      </div>
                    </div>
                    <Button variant="outline" onClick={() => signOut({ callbackUrl: '/' })}>
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
