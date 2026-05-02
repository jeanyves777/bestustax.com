'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  PaperPlaneTilt,
  Pen,
  SpinnerGap,
  X,
} from '@phosphor-icons/react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { cn } from '@/lib/cn'
import { FieldPlacer, PlacedField } from './FieldPlacer'

interface RequestSignatureModalProps {
  isOpen: boolean
  onClose: () => void
  document: {
    id: string
    fileName: string
    title: string
  }
  recipientId: string
  recipientName: string
  onSuccess?: () => void
}

export function RequestSignatureModal({
  isOpen,
  onClose,
  document,
  recipientId,
  recipientName,
  onSuccess,
}: RequestSignatureModalProps) {
  const [step, setStep] = useState(1)
  const [fields, setFields] = useState<PlacedField[]>([])
  const [message, setMessage] = useState('')
  const [expiresInDays, setExpiresInDays] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleClose = () => {
    setStep(1)
    setFields([])
    setMessage('')
    setExpiresInDays('')
    setError('')
    setIsSubmitting(false)
    onClose()
  }

  const handleSubmit = async () => {
    if (fields.length === 0) {
      setError('Place at least one signature field before sending.')
      return
    }

    try {
      setIsSubmitting(true)
      setError('')

      const body: Record<string, unknown> = {
        documentId: document.id,
        recipientId,
        fields,
        message: message || undefined,
      }

      if (expiresInDays && Number(expiresInDays) > 0) {
        const expiresAt = new Date()
        expiresAt.setDate(expiresAt.getDate() + Number(expiresInDays))
        body.expiresAt = expiresAt.toISOString()
      }

      const response = await fetch('/api/admin/signature-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send signature request')
      }

      onSuccess?.()
      handleClose()
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Failed to send request')
    } finally {
      setIsSubmitting(false)
    }
  }

  const signatureFieldCount = fields.filter((field) => field.type === 'signature').length
  const initialsFieldCount = fields.filter((field) => field.type === 'initials').length
  const dateFieldCount = fields.filter((field) => field.type === 'date').length

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={handleClose}
    >
      <Card
        className="max-h-[92vh] w-full max-w-5xl overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-gray-200 p-5 dark:border-gray-700">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <Pen className="h-5 w-5 text-light-accent-primary" weight="bold" />
              Request Signature
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {document.title || document.fileName} to {recipientName}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[calc(92vh-84px)] overflow-y-auto p-5">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <StepPill active={step === 1} done={step > 1} label="Place Fields" number={1} />
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <StepPill active={step === 2} done={step > 2} label="Options" number={2} />
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <StepPill active={step === 3} done={false} label="Confirm" number={3} />
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <FieldPlacer
                pdfUrl={`/api/admin/documents/${document.id}/download?inline=true`}
                fields={fields}
                onFieldsChange={setFields}
              />
              <div className="flex items-center justify-between">
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  disabled={fields.length === 0}
                  onClick={() => setStep(2)}
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message to signer
                </label>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={4}
                  placeholder="Please review and sign this document at your earliest convenience."
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:ring-2 focus:ring-light-accent-primary dark:border-gray-700 dark:bg-dark-bg-secondary dark:text-gray-100"
                />
              </div>
              <Input
                label="Expires in days"
                type="number"
                min="1"
                max="365"
                value={expiresInDays}
                onChange={(event) => setExpiresInDays(event.target.value)}
                placeholder="Optional"
                helperText="Leave blank if this request should not expire."
                className="max-w-xs"
              />
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  leftIcon={<ArrowLeft className="h-4 w-4" />}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={() => setStep(3)}
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-dark-bg-tertiary/40">
                <h3 className="mb-4 text-lg font-semibold">Review Signature Request</h3>
                <div className="grid gap-4 text-sm md:grid-cols-2">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Document</span>
                    <div className="mt-1 flex items-center gap-2 font-medium">
                      <FileText className="h-4 w-4" />
                      {document.title || document.fileName}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Send to</span>
                    <div className="mt-1 font-medium">{recipientName}</div>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Fields</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {signatureFieldCount > 0 && <MiniBadge>{signatureFieldCount} Signature</MiniBadge>}
                      {initialsFieldCount > 0 && <MiniBadge>{initialsFieldCount} Initials</MiniBadge>}
                      {dateFieldCount > 0 && <MiniBadge>{dateFieldCount} Date</MiniBadge>}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Expires</span>
                    <div className="mt-1 font-medium">
                      {expiresInDays ? `In ${expiresInDays} days` : 'No expiration'}
                    </div>
                  </div>
                </div>
                {message && (
                  <div className="mt-4 rounded-lg border border-gray-200 bg-white p-3 text-sm dark:border-gray-700 dark:bg-dark-bg-secondary">
                    {message}
                  </div>
                )}
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-200">
                The client will receive a secure signing link and a 4-digit verification code by email.
              </div>

              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                  leftIcon={<ArrowLeft className="h-4 w-4" />}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-green-700 hover:bg-green-800 dark:bg-green-700 dark:hover:bg-green-800"
                  leftIcon={
                    isSubmitting ? (
                      <SpinnerGap className="h-4 w-4 animate-spin" />
                    ) : (
                      <PaperPlaneTilt className="h-4 w-4" weight="bold" />
                    )
                  }
                >
                  {isSubmitting ? 'Sending...' : 'Send Signature Request'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

function StepPill({
  active,
  done,
  label,
  number,
}: {
  active: boolean
  done: boolean
  label: string
  number: number
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium',
        active
          ? 'bg-light-accent-primary text-white'
          : done
          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
          : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
      )}
    >
      {done ? <Check className="h-3.5 w-3.5" weight="bold" /> : number}
      {label}
    </span>
  )
}

function MiniBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200 dark:bg-dark-bg-secondary dark:text-gray-200 dark:ring-gray-700">
      {children}
    </span>
  )
}
