'use client'

import { useState, useEffect } from 'react'
import {
  Gear,
  EnvelopeSimple,
  Bell,
  Shield,
  Palette,
  Globe,
  CreditCard,
  Buildings,
  Check,
  SpinnerGap,
  Info
} from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface Settings {
  company: {
    name: string
    email: string
    phone: string
    address: string
    website: string
    taxId: string
  }
  email: {
    smtpHost: string
    smtpPort: string
    smtpUser: string
    smtpPassword: string
    fromEmail: string
    fromName: string
  }
  notifications: {
    newClient: boolean
    newAppointment: boolean
    documentUpload: boolean
    taxReturnSubmitted: boolean
    messageReceived: boolean
    leadCreated: boolean
  }
  security: {
    requireTwoFactor: boolean
    sessionTimeout: number
    passwordExpiry: number
    loginAttempts: number
  }
  branding: {
    primaryColor: string
    logo: string
    favicon: string
  }
  billing: {
    stripePublicKey: string
    stripeSecretKey: string
    taxRate: number
  }
}

const defaultSettings: Settings = {
  company: {
    name: 'BestUSTax',
    email: 'contact@bestustax.com',
    phone: '',
    address: '',
    website: 'https://bestustax.com',
    taxId: '',
  },
  email: {
    smtpHost: '',
    smtpPort: '587',
    smtpUser: '',
    smtpPassword: '',
    fromEmail: '',
    fromName: 'BestUSTax',
  },
  notifications: {
    newClient: true,
    newAppointment: true,
    documentUpload: true,
    taxReturnSubmitted: true,
    messageReceived: true,
    leadCreated: true,
  },
  security: {
    requireTwoFactor: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5,
  },
  branding: {
    primaryColor: '#00D9FF',
    logo: '',
    favicon: '',
  },
  billing: {
    stripePublicKey: '',
    stripeSecretKey: '',
    taxRate: 0,
  },
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('company')
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/settings')
      const data = await response.json()

      if (data.settings) {
        setSettings({ ...defaultSettings, ...data.settings })
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    try {
      setSaving(true)
      await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    { id: 'company', label: 'Company', icon: Buildings },
    { id: 'email', label: 'Email', icon: EnvelopeSimple },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'branding', label: 'Branding', icon: Palette },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <SpinnerGap className="w-8 h-8 animate-spin text-light-accent-primary" />
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Configure system settings and preferences
          </p>
        </div>
        <Button onClick={saveSettings} disabled={saving} glow>
          {saving ? (
            <SpinnerGap className="w-4 h-4 animate-spin mr-2" />
          ) : saved ? (
            <Check className="w-4 h-4 mr-2" />
          ) : (
            <Gear className="w-4 h-4 mr-2" />
          )}
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
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
                    ? 'bg-light-accent-primary/10 text-light-accent-primary'
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
          {activeTab === 'company' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Company Information</h2>
              <div className="space-y-4">
                <Input
                  label="Company Name"
                  value={settings.company.name}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      company: { ...settings.company, name: e.target.value },
                    })
                  }
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Email"
                    type="email"
                    value={settings.company.email}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        company: { ...settings.company, email: e.target.value },
                      })
                    }
                  />
                  <Input
                    label="Phone"
                    value={settings.company.phone}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        company: { ...settings.company, phone: e.target.value },
                      })
                    }
                  />
                </div>
                <Input
                  label="Address"
                  value={settings.company.address}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      company: { ...settings.company, address: e.target.value },
                    })
                  }
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Website"
                    value={settings.company.website}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        company: { ...settings.company, website: e.target.value },
                      })
                    }
                  />
                  <Input
                    label="Tax ID / EIN"
                    value={settings.company.taxId}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        company: { ...settings.company, taxId: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'email' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Email Configuration</h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6 flex gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Configure your SMTP settings to enable email notifications. Contact your email provider for these details.
                </p>
              </div>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="SMTP Host"
                    value={settings.email.smtpHost}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        email: { ...settings.email, smtpHost: e.target.value },
                      })
                    }
                    placeholder="smtp.example.com"
                  />
                  <Input
                    label="SMTP Port"
                    value={settings.email.smtpPort}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        email: { ...settings.email, smtpPort: e.target.value },
                      })
                    }
                    placeholder="587"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="SMTP Username"
                    value={settings.email.smtpUser}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        email: { ...settings.email, smtpUser: e.target.value },
                      })
                    }
                  />
                  <Input
                    label="SMTP Password"
                    type="password"
                    value={settings.email.smtpPassword}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        email: { ...settings.email, smtpPassword: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="From Email"
                    type="email"
                    value={settings.email.fromEmail}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        email: { ...settings.email, fromEmail: e.target.value },
                      })
                    }
                    placeholder="noreply@bestustax.com"
                  />
                  <Input
                    label="From Name"
                    value={settings.email.fromName}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        email: { ...settings.email, fromName: e.target.value },
                      })
                    }
                    placeholder="BestUSTax"
                  />
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
              <div className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                    <div>
                      <div className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      <div className="text-sm text-gray-500">
                        Receive notifications when a {key.replace(/([A-Z])/g, ' $1').toLowerCase().trim()} occurs
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            notifications: {
                              ...settings.notifications,
                              [key]: e.target.checked,
                            },
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-light-accent-primary/25 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-light-accent-primary"></div>
                    </label>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <div className="font-medium">Require Two-Factor Authentication</div>
                    <div className="text-sm text-gray-500">
                      Require all users to enable 2FA
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.security.requireTwoFactor}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          security: {
                            ...settings.security,
                            requireTwoFactor: e.target.checked,
                          },
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-light-accent-primary/25 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-light-accent-primary"></div>
                  </label>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <Input
                    label="Session Timeout (minutes)"
                    type="number"
                    value={settings.security.sessionTimeout.toString()}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        security: {
                          ...settings.security,
                          sessionTimeout: parseInt(e.target.value) || 30,
                        },
                      })
                    }
                  />
                  <Input
                    label="Password Expiry (days)"
                    type="number"
                    value={settings.security.passwordExpiry.toString()}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        security: {
                          ...settings.security,
                          passwordExpiry: parseInt(e.target.value) || 90,
                        },
                      })
                    }
                  />
                  <Input
                    label="Max Login Attempts"
                    type="number"
                    value={settings.security.loginAttempts.toString()}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        security: {
                          ...settings.security,
                          loginAttempts: parseInt(e.target.value) || 5,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'branding' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Branding</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Primary Color</label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={settings.branding.primaryColor}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          branding: { ...settings.branding, primaryColor: e.target.value },
                        })
                      }
                      className="w-12 h-12 rounded-lg cursor-pointer"
                    />
                    <Input
                      value={settings.branding.primaryColor}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          branding: { ...settings.branding, primaryColor: e.target.value },
                        })
                      }
                      className="flex-1"
                    />
                  </div>
                </div>
                <Input
                  label="Logo URL"
                  value={settings.branding.logo}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      branding: { ...settings.branding, logo: e.target.value },
                    })
                  }
                  placeholder="https://example.com/logo.png"
                />
                <Input
                  label="Favicon URL"
                  value={settings.branding.favicon}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      branding: { ...settings.branding, favicon: e.target.value },
                    })
                  }
                  placeholder="https://example.com/favicon.ico"
                />
              </div>
            </Card>
          )}

          {activeTab === 'billing' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Billing & Payments</h2>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mb-6 flex gap-3">
                <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Keep your Stripe keys secure. Never share your secret key publicly.
                </p>
              </div>
              <div className="space-y-4">
                <Input
                  label="Stripe Public Key"
                  value={settings.billing.stripePublicKey}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      billing: { ...settings.billing, stripePublicKey: e.target.value },
                    })
                  }
                  placeholder="pk_live_..."
                />
                <Input
                  label="Stripe Secret Key"
                  type="password"
                  value={settings.billing.stripeSecretKey}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      billing: { ...settings.billing, stripeSecretKey: e.target.value },
                    })
                  }
                  placeholder="sk_live_..."
                />
                <Input
                  label="Default Tax Rate (%)"
                  type="number"
                  value={settings.billing.taxRate.toString()}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      billing: {
                        ...settings.billing,
                        taxRate: parseFloat(e.target.value) || 0,
                      },
                    })
                  }
                />
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
