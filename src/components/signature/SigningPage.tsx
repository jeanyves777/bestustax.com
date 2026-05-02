'use client'

import { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import {
  CalendarBlank,
  CaretLeft,
  CaretRight,
  Check,
  CheckCircle,
  Pen,
  ShieldCheck,
  SpinnerGap,
  TextT,
  X,
  ArrowCounterClockwise,
} from '@phosphor-icons/react'
import SignaturePad from 'signature_pad'
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface SigningField {
  id: string
  type: 'signature' | 'initials' | 'date'
  label: string
  page: number
  x: number
  y: number
  width: number
  height: number
  required: boolean
}

interface SigningData {
  request: {
    id: string
    message?: string
    status: string
  }
  document: {
    id: string
    title: string
    fileName: string
  }
  fields: SigningField[]
  recipient: {
    name: string | null
    email: string
  }
}

const FIELD_COLORS = {
  signature: {
    bg: 'bg-blue-500/20',
    border: 'border-blue-500',
    text: 'text-blue-700 dark:text-blue-200',
  },
  initials: {
    bg: 'bg-purple-500/20',
    border: 'border-purple-500',
    text: 'text-purple-700 dark:text-purple-200',
  },
  date: {
    bg: 'bg-green-500/20',
    border: 'border-green-500',
    text: 'text-green-700 dark:text-green-200',
  },
}

export function SigningPage({ token }: { token: string }) {
  const [signingData, setSigningData] = useState<SigningData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [numPages, setNumPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({})
  const [activeField, setActiveField] = useState<string | null>(null)
  const [showSignaturePad, setShowSignaturePad] = useState(false)
  const [consentChecked, setConsentChecked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [containerWidth, setContainerWidth] = useState(600)
  const [requiresVerification, setRequiresVerification] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [verifyError, setVerifyError] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(Math.min(containerRef.current.offsetWidth - 2, 820))
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  useEffect(() => {
    fetchSigningData()
  }, [token])

  const fetchSigningData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch(`/api/signing/${token}`)
      const data = await response.json()

      if (data.requiresVerification) {
        setRequiresVerification(true)
        return
      }

      if (data.alreadySigned) {
        setError('This document has already been signed.')
        return
      }

      if (!response.ok || !data.signatureRequest) {
        setError(data.error || 'Failed to load signing session')
        return
      }

      const signatureRequest = data.signatureRequest
      const mappedData: SigningData = {
        request: {
          id: signatureRequest.id,
          message: signatureRequest.message,
          status: signatureRequest.status,
        },
        document: signatureRequest.document,
        fields: signatureRequest.fields || [],
        recipient: signatureRequest.recipient,
      }

      setSigningData(mappedData)

      const dateValues: Record<string, string> = {}
      mappedData.fields.forEach((field) => {
        if (field.type === 'date') {
          dateValues[field.id] = new Date().toLocaleDateString('en-US')
        }
      })
      setFieldValues(dateValues)
    } catch {
      setError('Failed to connect to the signing service.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async () => {
    if (verificationCode.length !== 4) {
      setVerifyError('Enter the 4-digit code from your email.')
      return
    }

    try {
      setIsVerifying(true)
      setVerifyError(null)
      const response = await fetch(`/api/signing/${token}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: verificationCode }),
      })
      const data = await response.json()

      if (!response.ok || !data.verified) {
        setVerifyError(data.error || 'Invalid code. Please try again.')
        return
      }

      setRequiresVerification(false)
      await fetchSigningData()
    } catch {
      setVerifyError('Failed to verify code. Please try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  const handleFieldClick = (field: SigningField) => {
    if (field.type === 'date') {
      setFieldValues((previous) => ({
        ...previous,
        [field.id]: new Date().toLocaleDateString('en-US'),
      }))
      return
    }

    setActiveField(field.id)
    setShowSignaturePad(true)
  }

  const handleSubmit = async () => {
    if (!signingData || !consentChecked) return

    const missingFields = signingData.fields
      .filter((field) => field.required !== false)
      .filter((field) => !fieldValues[field.id])

    if (missingFields.length > 0) {
      setError('Please complete all required fields before submitting.')
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      const submissionValues = signingData.fields.map((field) => ({
        fieldId: field.id,
        value: fieldValues[field.id] || '',
      }))

      const response = await fetch(`/api/signing/${token}/sign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fieldValues: submissionValues }),
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to submit signatures.')
        return
      }

      setIsComplete(true)
    } catch {
      setError('Failed to submit signatures.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const filledCount = signingData
    ? signingData.fields.filter((field) => fieldValues[field.id]).length
    : 0
  const totalFields = signingData?.fields.length || 0
  const allRequiredFilled = signingData
    ? signingData.fields
        .filter((field) => field.required !== false)
        .every((field) => fieldValues[field.id])
    : false

  if (isLoading) {
    return (
      <SigningShell>
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <SpinnerGap className="mx-auto mb-4 h-12 w-12 animate-spin text-light-accent-primary" />
            <p className="text-gray-600 dark:text-gray-400">Loading document...</p>
          </div>
        </div>
      </SigningShell>
    )
  }

  if (error && !signingData) {
    return (
      <SigningShell>
        <div className="flex min-h-[70vh] items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                <ShieldCheck className="h-8 w-8 text-amber-700 dark:text-amber-300" weight="bold" />
              </div>
              <h1 className="mb-2 text-xl font-bold">Unable to Load Document</h1>
              <p className="text-gray-600 dark:text-gray-400">{error}</p>
            </CardContent>
          </Card>
        </div>
      </SigningShell>
    )
  }

  if (isComplete) {
    return (
      <SigningShell>
        <div className="flex min-h-[70vh] items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircle className="h-11 w-11 text-green-700 dark:text-green-300" weight="bold" />
              </div>
              <h1 className="mb-2 text-2xl font-bold">Document Signed</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Thank you, {signingData?.recipient.name || signingData?.recipient.email}. Your
                signature has been recorded successfully.
              </p>
            </CardContent>
          </Card>
        </div>
      </SigningShell>
    )
  }

  if (requiresVerification) {
    return (
      <SigningShell>
        <div className="flex min-h-[70vh] items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold/20">
                <ShieldCheck className="h-8 w-8 text-light-accent-primary" weight="bold" />
              </div>
              <CardTitle className="text-xl">Verification Required</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6 pt-0">
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Enter the 4-digit code from your email to access this document.
              </p>
              <Input
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder="0000"
                value={verificationCode}
                onChange={(event) => {
                  setVerificationCode(event.target.value.replace(/\D/g, '').slice(0, 4))
                  setVerifyError(null)
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') handleVerifyCode()
                }}
                className="h-14 text-center font-mono text-2xl tracking-[0.5em]"
                autoFocus
              />
              {verifyError && <p className="text-center text-sm text-amber-700">{verifyError}</p>}
              <Button
                type="button"
                onClick={handleVerifyCode}
                disabled={isVerifying || verificationCode.length !== 4}
                className="w-full"
                leftIcon={
                  isVerifying ? (
                    <SpinnerGap className="h-4 w-4 animate-spin" />
                  ) : (
                    <ShieldCheck className="h-4 w-4" weight="bold" />
                  )
                }
              >
                {isVerifying ? 'Verifying...' : 'Verify and Continue'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </SigningShell>
    )
  }

  if (!signingData) return null

  const currentPageFields = signingData.fields.filter((field) => field.page === currentPage)

  return (
    <SigningShell signer={signingData.recipient.name || signingData.recipient.email}>
      <main className="mx-auto max-w-5xl space-y-4 p-4 md:p-6">
        <Card>
          <CardHeader className="p-5">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Pen className="h-5 w-5 text-light-accent-primary" weight="bold" />
              {signingData.document.title || signingData.document.fileName}
            </CardTitle>
            {signingData.request.message && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {signingData.request.message}
              </p>
            )}
          </CardHeader>
        </Card>

        <div className="flex items-center gap-3 px-1">
          <div className="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-2 rounded-full bg-green-600 transition-all"
              style={{ width: `${totalFields > 0 ? (filledCount / totalFields) * 100 : 0}%` }}
            />
          </div>
          <span className="whitespace-nowrap text-sm font-medium text-gray-600 dark:text-gray-400">
            {filledCount} of {totalFields} fields
          </span>
        </div>

        {error && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">
            {error}
          </div>
        )}

        <div
          ref={containerRef}
          className="overflow-hidden rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-900"
        >
          <div className="relative mx-auto" style={{ width: containerWidth }}>
            <Document
              file={`/api/signing/${token}/pdf`}
              onLoadSuccess={({ numPages: pages }) => setNumPages(pages)}
              loading={
                <div className="flex h-[620px] items-center justify-center">
                  <SpinnerGap className="h-8 w-8 animate-spin text-light-accent-primary" />
                </div>
              }
            >
              <Page
                pageNumber={currentPage}
                width={containerWidth}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            </Document>

            {currentPageFields.map((field) => {
              const colors = FIELD_COLORS[field.type]
              const isFilled = !!fieldValues[field.id]
              const Icon =
                field.type === 'signature' ? Pen : field.type === 'initials' ? TextT : CalendarBlank

              return (
                <button
                  type="button"
                  key={field.id}
                  className={`absolute rounded border-2 transition ${
                    isFilled
                      ? 'border-green-600 bg-green-500/10'
                      : `${colors.border} ${colors.bg} animate-pulse`
                  }`}
                  style={{
                    left: `${field.x}%`,
                    top: `${field.y}%`,
                    width: `${field.width}%`,
                    height: `${field.height}%`,
                  }}
                  onClick={() => handleFieldClick(field)}
                >
                  {isFilled ? (
                    field.type === 'date' ? (
                      <span className="px-1 text-[10px] font-semibold text-green-800">
                        {fieldValues[field.id]}
                      </span>
                    ) : (
                      <span className="flex h-full w-full items-center justify-center">
                        <img
                          src={fieldValues[field.id]}
                          alt={field.label}
                          className="max-h-full max-w-full object-contain"
                        />
                      </span>
                    )
                  ) : (
                    <span
                      className={`flex h-full items-center justify-center gap-1 text-xs font-medium ${colors.text}`}
                    >
                      <Icon className="h-3 w-3" weight="bold" />
                      {field.label}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {numPages > 1 && (
            <div className="flex items-center justify-center gap-4 border-t border-gray-200 bg-white py-2 dark:border-gray-700 dark:bg-dark-bg-secondary">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage <= 1}
              >
                <CaretLeft className="h-4 w-4" weight="bold" />
              </Button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage} of {numPages}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((page) => Math.min(numPages, page + 1))}
                disabled={currentPage >= numPages}
              >
                <CaretRight className="h-4 w-4" weight="bold" />
              </Button>
            </div>
          )}
        </div>

        <Card>
          <CardContent className="space-y-4 p-5">
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
              <input
                type="checkbox"
                checked={consentChecked}
                onChange={(event) => setConsentChecked(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-light-accent-primary"
              />
              <span>
                I agree that my electronic signature is the legal equivalent of my manual
                signature. I consent to be legally bound by this document.
              </span>
            </label>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!allRequiredFilled || !consentChecked || isSubmitting}
              className="w-full bg-green-700 hover:bg-green-800 dark:bg-green-700 dark:hover:bg-green-800"
              leftIcon={
                isSubmitting ? (
                  <SpinnerGap className="h-5 w-5 animate-spin" />
                ) : (
                  <Check className="h-5 w-5" weight="bold" />
                )
              }
            >
              {isSubmitting ? 'Submitting...' : 'Complete Signing'}
            </Button>
            {!allRequiredFilled && (
              <p className="text-center text-sm text-amber-700">
                Complete all required fields before submitting.
              </p>
            )}
          </CardContent>
        </Card>
      </main>

      {showSignaturePad && (
        <SignatureCapture
          onCancel={() => {
            setShowSignaturePad(false)
            setActiveField(null)
          }}
          onSave={(signatureDataUrl) => {
            if (activeField) {
              setFieldValues((previous) => ({
                ...previous,
                [activeField]: signatureDataUrl,
              }))
            }
            setShowSignaturePad(false)
            setActiveField(null)
          }}
        />
      )}
    </SigningShell>
  )
}

function SigningShell({
  children,
  signer,
}: {
  children: React.ReactNode
  signer?: string
}) {
  return (
    <div className="min-h-screen bg-light-bg-secondary text-gray-900 dark:bg-dark-bg-primary dark:text-gray-100">
      <header className="bg-gradient-to-r from-light-accent-primary to-brand-slate px-6 py-4 text-white shadow-lg">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div>
            <div className="text-lg font-bold">BestUSTax</div>
            <div className="text-sm text-white/80">Secure Document Signing</div>
          </div>
          {signer && (
            <div className="text-right">
              <div className="text-sm text-white/80">Signing as</div>
              <div className="font-medium">{signer}</div>
            </div>
          )}
        </div>
      </header>
      {children}
    </div>
  )
}

function SignatureCapture({
  onSave,
  onCancel,
}: {
  onSave: (dataUrl: string) => void
  onCancel: () => void
}) {
  const [activeTab, setActiveTab] = useState<'draw' | 'type'>('draw')
  const [typedName, setTypedName] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const padRef = useRef<SignaturePad | null>(null)

  useEffect(() => {
    if (activeTab !== 'draw' || !canvasRef.current) return

    const canvas = canvasRef.current
    const ratio = Math.max(window.devicePixelRatio || 1, 1)
    canvas.width = canvas.offsetWidth * ratio
    canvas.height = canvas.offsetHeight * ratio
    const context = canvas.getContext('2d')
    if (context) context.scale(ratio, ratio)

    padRef.current = new SignaturePad(canvas, {
      backgroundColor: 'rgb(255, 255, 255)',
      penColor: 'rgb(0, 0, 0)',
    })

    return () => {
      padRef.current?.off()
    }
  }, [activeTab])

  const handleClear = () => {
    if (activeTab === 'draw') {
      padRef.current?.clear()
    } else {
      setTypedName('')
    }
  }

  const handleSave = () => {
    if (activeTab === 'draw') {
      if (padRef.current?.isEmpty()) return
      onSave(padRef.current?.toDataURL() || '')
      return
    }

    if (!typedName.trim()) return

    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = 500
    tempCanvas.height = 120
    const context = tempCanvas.getContext('2d')
    if (!context) return

    context.fillStyle = 'white'
    context.fillRect(0, 0, 500, 120)
    context.fillStyle = 'black'
    context.font = '52px cursive'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(typedName, 250, 60)
    onSave(tempCanvas.toDataURL())
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <Card className="w-full max-w-lg" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
          <h2 className="text-lg font-semibold">Sign Here</h2>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4 p-4">
          <div className="grid grid-cols-2 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
            <button
              type="button"
              onClick={() => setActiveTab('draw')}
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                activeTab === 'draw'
                  ? 'bg-white text-light-accent-primary shadow-sm dark:bg-dark-bg-secondary'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              Draw
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('type')}
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                activeTab === 'type'
                  ? 'bg-white text-light-accent-primary shadow-sm dark:bg-dark-bg-secondary'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              Type
            </button>
          </div>

          {activeTab === 'draw' ? (
            <div>
              <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white dark:border-gray-700">
                <canvas
                  ref={canvasRef}
                  className="w-full touch-none"
                  style={{ height: '180px', touchAction: 'none' }}
                />
              </div>
              <p className="mt-2 text-center text-xs text-gray-500">Draw your signature above.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <Input
                label="Type your full name"
                value={typedName}
                onChange={(event) => setTypedName(event.target.value)}
                placeholder="John Doe"
                autoFocus
              />
              {typedName && (
                <div className="flex min-h-[120px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-6 dark:border-gray-700">
                  <span className="text-5xl text-black" style={{ fontFamily: 'cursive' }}>
                    {typedName}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClear}
              leftIcon={<ArrowCounterClockwise className="h-4 w-4" />}
            >
              Clear
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              className="bg-green-700 hover:bg-green-800 dark:bg-green-700 dark:hover:bg-green-800"
              leftIcon={<Check className="h-4 w-4" weight="bold" />}
            >
              Save Signature
            </Button>
          </div>
          <p className="text-center text-xs text-gray-500">
            By signing, you agree this is your legal electronic signature.
          </p>
        </div>
      </Card>
    </div>
  )
}
