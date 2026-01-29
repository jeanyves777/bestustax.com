'use client'

import { useState } from 'react'
import {
  Link as LinkIcon,
  Copy,
  Check,
  FileText,
  Image as ImageIcon,
  Download,
  Globe,
  EnvelopeSimple,
  ShareNetwork
} from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface Resource {
  id: string
  title: string
  description: string
  type: 'link' | 'document' | 'image'
  url: string
}

const marketingResources: Resource[] = [
  {
    id: '1',
    title: 'Partner Marketing Guide',
    description: 'Complete guide to promoting BestUSTax services',
    type: 'document',
    url: '#',
  },
  {
    id: '2',
    title: 'Email Templates',
    description: 'Pre-written email templates for client outreach',
    type: 'document',
    url: '#',
  },
  {
    id: '3',
    title: 'Social Media Graphics',
    description: 'Ready-to-use graphics for social media',
    type: 'image',
    url: '#',
  },
  {
    id: '4',
    title: 'Banner Ads',
    description: 'Web banner ads in various sizes',
    type: 'image',
    url: '#',
  },
]

const educationalResources: Resource[] = [
  {
    id: '5',
    title: 'Tax Season Overview',
    description: 'Key dates and deadlines for tax season',
    type: 'document',
    url: '#',
  },
  {
    id: '6',
    title: 'Services Overview',
    description: 'Detailed breakdown of all our services',
    type: 'document',
    url: '#',
  },
  {
    id: '7',
    title: 'FAQ Document',
    description: 'Common questions and answers',
    type: 'document',
    url: '#',
  },
]

export default function PartnerResourcesPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const referralCode = 'PARTNER123' // This would come from the API

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const referralLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/?ref=${referralCode}`

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Resources</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Marketing materials and tools to help you succeed
        </p>
      </div>

      {/* Quick Links */}
      <Card className="p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Your Referral Links</h2>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Globe className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Main Referral Link</p>
                <code className="text-sm text-gray-500">{referralLink}</code>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => copyToClipboard(referralLink, 'main')}
              leftIcon={copiedId === 'main' ? <Check /> : <Copy />}
            >
              {copiedId === 'main' ? 'Copied!' : 'Copy'}
            </Button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <EnvelopeSimple className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Referral Code</p>
                <code className="text-sm text-gray-500">{referralCode}</code>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => copyToClipboard(referralCode, 'code')}
              leftIcon={copiedId === 'code' ? <Check /> : <Copy />}
            >
              {copiedId === 'code' ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Marketing Resources */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Marketing Materials</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {marketingResources.map((resource) => (
            <Card key={resource.id} className="p-4">
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg ${
                    resource.type === 'document'
                      ? 'bg-blue-100 dark:bg-blue-900/30'
                      : 'bg-purple-100 dark:bg-purple-900/30'
                  }`}
                >
                  {resource.type === 'document' ? (
                    <FileText
                      className={`w-6 h-6 ${
                        resource.type === 'document' ? 'text-blue-600' : 'text-purple-600'
                      }`}
                    />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-purple-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{resource.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{resource.description}</p>
                  <Button size="sm" variant="outline" leftIcon={<Download />}>
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Educational Resources */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Educational Resources</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {educationalResources.map((resource) => (
            <Card key={resource.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <FileText className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{resource.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{resource.description}</p>
                  <Button size="sm" variant="ghost" leftIcon={<Download />}>
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Share Tools */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Share</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Share your referral link on social media
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() => {
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`,
                '_blank'
              )
            }}
          >
            Share on Facebook
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              window.open(
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(
                  'Get expert tax help with BestUSTax!'
                )}`,
                '_blank'
              )
            }}
          >
            Share on Twitter
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              window.open(
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`,
                '_blank'
              )
            }}
          >
            Share on LinkedIn
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              window.open(
                `mailto:?subject=${encodeURIComponent('Check out BestUSTax!')}&body=${encodeURIComponent(
                  `I recommend BestUSTax for professional tax services: ${referralLink}`
                )}`,
                '_blank'
              )
            }}
            leftIcon={<EnvelopeSimple />}
          >
            Share via Email
          </Button>
        </div>
      </Card>
    </div>
  )
}
