'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Lightning, Upload, CheckCircle, File, X, SpinnerGap, Warning } from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface UploadedFile {
  name: string
  size: number
  type: string
  status: 'uploading' | 'success' | 'error'
}

export default function RapidDocUploadPage() {
  const [step, setStep] = useState<'code' | 'upload' | 'complete'>('code')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [accessCode, setAccessCode] = useState('')
  const [email, setEmail] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [uploading, setUploading] = useState(false)

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/rapid-doc/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: accessCode, email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Invalid access code')
      }

      setSessionId(data.sessionId)
      setStep('upload')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    if (selectedFiles.length === 0) return

    setUploading(true)

    for (const file of selectedFiles) {
      // Add file to list with uploading status
      setFiles((prev) => [
        ...prev,
        { name: file.name, size: file.size, type: file.type, status: 'uploading' },
      ])

      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('sessionId', sessionId)

        const response = await fetch('/api/rapid-doc/upload', {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          setFiles((prev) =>
            prev.map((f) =>
              f.name === file.name ? { ...f, status: 'success' } : f
            )
          )
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.name === file.name ? { ...f, status: 'error' } : f
            )
          )
        }
      } catch (error) {
        setFiles((prev) =>
          prev.map((f) =>
            f.name === file.name ? { ...f, status: 'error' } : f
          )
        )
      }
    }

    setUploading(false)
  }

  const removeFile = (fileName: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== fileName))
  }

  const handleComplete = async () => {
    setLoading(true)
    try {
      await fetch('/api/rapid-doc/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })
      setStep('complete')
    } catch (error) {
      console.error('Error completing session:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-bg-primary to-light-bg-secondary dark:from-dark-bg-primary dark:to-dark-bg-secondary py-16">
      <div className="container-custom">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-light-accent-primary to-light-success flex items-center justify-center">
                <span className="text-white font-bold">BU</span>
              </div>
              <span className="text-xl font-bold">BestUsTax</span>
            </Link>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Lightning weight="fill" className="w-8 h-8 text-light-accent-primary" />
              <h1 className="text-3xl font-bold">Rapid Doc Upload</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Quickly upload your tax documents without logging in
            </p>
          </div>

          {/* Step: Enter Code */}
          {step === 'code' && (
            <Card className="p-6 lg:p-8">
              <form onSubmit={handleVerifyCode}>
                <h2 className="text-xl font-bold mb-6">Enter Your Access Code</h2>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                    <Warning weight="fill" className="w-5 h-5 flex-shrink-0" />
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <Input
                    label="Access Code"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    className="text-center text-2xl tracking-widest font-mono"
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    helperText="Enter the email address associated with this code"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full mt-6"
                  size="lg"
                  disabled={loading || accessCode.length !== 6 || !email}
                  glow
                >
                  {loading ? (
                    <>
                      <SpinnerGap className="w-4 h-4 animate-spin mr-2" />
                      Verifying...
                    </>
                  ) : (
                    'Continue'
                  )}
                </Button>
              </form>

              <p className="text-sm text-gray-500 text-center mt-6">
                Don't have an access code?{' '}
                <Link href="/contact" className="text-light-accent-primary hover:underline">
                  Contact us
                </Link>
              </p>
            </Card>
          )}

          {/* Step: Upload Documents */}
          {step === 'upload' && (
            <Card className="p-6 lg:p-8">
              <h2 className="text-xl font-bold mb-2">Upload Your Documents</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Select or drag files to upload. Accepted formats: PDF, JPG, PNG
              </p>

              {/* Upload Area */}
              <label className="block border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-light-accent-primary transition-colors">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={uploading}
                />
                <Upload weight="thin" className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="font-medium mb-1">Click to select files</p>
                <p className="text-sm text-gray-500">or drag and drop</p>
                <p className="text-xs text-gray-400 mt-2">Max 10MB per file</p>
              </label>

              {/* Uploaded Files List */}
              {files.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h3 className="font-medium">Uploaded Files ({files.length})</h3>
                  {files.map((file) => (
                    <div
                      key={file.name}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg"
                    >
                      <File weight="fill" className="w-8 h-8 text-light-accent-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                      {file.status === 'uploading' && (
                        <SpinnerGap className="w-5 h-5 animate-spin text-light-accent-primary" />
                      )}
                      {file.status === 'success' && (
                        <CheckCircle weight="fill" className="w-5 h-5 text-green-500" />
                      )}
                      {file.status === 'error' && (
                        <Warning weight="fill" className="w-5 h-5 text-red-500" />
                      )}
                      <button
                        onClick={() => removeFile(file.name)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <Button
                onClick={handleComplete}
                className="w-full mt-6"
                size="lg"
                disabled={loading || files.filter((f) => f.status === 'success').length === 0}
                glow
              >
                {loading ? (
                  <>
                    <SpinnerGap className="w-4 h-4 animate-spin mr-2" />
                    Completing...
                  </>
                ) : (
                  `Complete Upload (${files.filter((f) => f.status === 'success').length} files)`
                )}
              </Button>
            </Card>
          )}

          {/* Step: Complete */}
          {step === 'complete' && (
            <Card className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle weight="fill" className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Upload Complete!</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your documents have been securely uploaded. Our team will review them
                and contact you soon.
              </p>
              <div className="bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>{files.filter((f) => f.status === 'success').length}</strong> documents uploaded
                </p>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                A confirmation email has been sent to <strong>{email}</strong>
              </p>
              <Link href="/">
                <Button>Return to Homepage</Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
