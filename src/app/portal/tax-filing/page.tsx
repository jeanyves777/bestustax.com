'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, IdentificationCard, CurrencyDollar, UsersThree, Bank,
  FileText, Handshake, CheckSquare, FileArrowUp, ArrowRight,
  ArrowLeft, SpinnerGap, CheckCircle, Warning
} from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const steps = [
  { id: 1, title: 'Personal Information', icon: User },
  { id: 2, title: 'Identity Verification', icon: IdentificationCard },
  { id: 3, title: 'Income Information', icon: CurrencyDollar },
  { id: 4, title: 'Household Information', icon: UsersThree },
  { id: 5, title: 'Bank Information', icon: Bank },
  { id: 6, title: 'Document Checklist', icon: FileText },
  { id: 7, title: 'Engagement Letter', icon: Handshake },
  { id: 8, title: 'Declarations', icon: CheckSquare },
  { id: 9, title: 'Form 8879', icon: FileArrowUp },
]

const filingStatuses = [
  { value: 'single', label: 'Single' },
  { value: 'married-joint', label: 'Married Filing Jointly' },
  { value: 'married-separate', label: 'Married Filing Separately' },
  { value: 'head-of-household', label: 'Head of Household' },
  { value: 'widow', label: 'Qualifying Widow(er)' },
]

export default function TaxFilingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [taxReturn, setTaxReturn] = useState<any>(null)

  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    ssn: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    filingStatus: 'single',

    // Income
    wageIncome: 0,
    interestIncome: 0,
    dividendIncome: 0,
    businessIncome: 0,
    capitalGains: 0,
    otherIncome: 0,

    // Banking
    bankRouting: '',
    bankAccount: '',
    bankAccountType: 'checking',

    // Signatures
    engagementSigned: false,
    declarationsSigned: false,
    form8879Signed: false,
  })

  useEffect(() => {
    fetchTaxReturn()
  }, [])

  const fetchTaxReturn = async () => {
    try {
      const response = await fetch('/api/portal/tax-filing')
      const data = await response.json()

      if (data.taxReturn) {
        setTaxReturn(data.taxReturn)
        setCurrentStep(data.taxReturn.currentStep || 1)
        // Populate form data from existing tax return
        if (data.taxReturn.personalInfo) {
          const personalInfo = JSON.parse(data.taxReturn.personalInfo)
          setFormData((prev) => ({ ...prev, ...personalInfo }))
        }
        setFormData((prev) => ({
          ...prev,
          filingStatus: data.taxReturn.filingStatus || 'single',
          wageIncome: data.taxReturn.wageIncome || 0,
          interestIncome: data.taxReturn.interestIncome || 0,
          dividendIncome: data.taxReturn.dividendIncome || 0,
          businessIncome: data.taxReturn.businessIncome || 0,
          capitalGains: data.taxReturn.capitalGains || 0,
          otherIncome: data.taxReturn.otherIncome || 0,
          bankRouting: data.taxReturn.bankRouting || '',
          bankAccount: data.taxReturn.bankAccount || '',
          bankAccountType: data.taxReturn.bankAccountType || 'checking',
          engagementSigned: data.taxReturn.engagementSigned || false,
          form8879Signed: data.taxReturn.form8879Signed || false,
        }))
      }
    } catch (error) {
      console.error('Error fetching tax return:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveProgress = async (nextStep?: number) => {
    setSaving(true)
    try {
      const response = await fetch('/api/portal/tax-filing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          currentStep: nextStep || currentStep,
          year: new Date().getFullYear(),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setTaxReturn(data.taxReturn)
        if (nextStep) {
          setCurrentStep(nextStep)
        }
      }
    } catch (error) {
      console.error('Error saving progress:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleNext = () => {
    if (currentStep < 9) {
      saveProgress(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/portal/tax-filing/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taxReturnId: taxReturn?.id }),
      })

      if (response.ok) {
        router.push('/portal?submitted=true')
      }
    } catch (error) {
      console.error('Error submitting tax return:', error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <SpinnerGap className="w-8 h-8 animate-spin text-light-accent-primary" />
      </div>
    )
  }

  const totalIncome =
    formData.wageIncome +
    formData.interestIncome +
    formData.dividendIncome +
    formData.businessIncome +
    formData.capitalGains +
    formData.otherIncome

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tax Filing Wizard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Complete your {new Date().getFullYear()} tax return step by step
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8 overflow-x-auto pb-4">
        <div className="flex gap-2 min-w-max">
          {steps.map((step) => {
            const isCompleted = currentStep > step.id
            const isCurrent = currentStep === step.id

            return (
              <button
                key={step.id}
                onClick={() => isCompleted && setCurrentStep(step.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isCurrent
                    ? 'bg-light-accent-primary text-white'
                    : isCompleted
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 cursor-pointer'
                    : 'bg-gray-100 text-gray-400 dark:bg-gray-800 cursor-not-allowed'
                }`}
                disabled={!isCompleted && !isCurrent}
              >
                {isCompleted ? (
                  <CheckCircle weight="fill" className="w-4 h-4" />
                ) : (
                  <step.icon weight={isCurrent ? 'fill' : 'regular'} className="w-4 h-4" />
                )}
                <span className="hidden md:inline">{step.title}</span>
                <span className="md:hidden">{step.id}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Step Content */}
      <Card className="p-6 lg:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                  <Input
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <Input
                    label="Date of Birth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    required
                  />
                  <Input
                    label="Social Security Number"
                    value={formData.ssn}
                    onChange={(e) => setFormData({ ...formData, ssn: e.target.value })}
                    placeholder="XXX-XX-XXXX"
                    required
                  />
                  <div className="md:col-span-2">
                    <Input
                      label="Street Address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                    />
                  </div>
                  <Input
                    label="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="State"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      required
                    />
                    <Input
                      label="ZIP Code"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Filing Status</label>
                    <select
                      value={formData.filingStatus}
                      onChange={(e) => setFormData({ ...formData, filingStatus: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary"
                    >
                      {filingStatuses.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Identity Verification */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Identity Verification</h2>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                  <div className="flex gap-3">
                    <Warning weight="fill" className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-yellow-800 dark:text-yellow-200">
                        Identity Verification Required
                      </h3>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                        Please upload a government-issued photo ID to verify your identity.
                        This helps protect your tax information.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                  <FileArrowUp weight="thin" className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Upload a photo of your driver's license or passport
                  </p>
                  <Button variant="outline">Choose File</Button>
                  <p className="text-xs text-gray-500 mt-4">
                    Accepted formats: JPG, PNG, PDF (max 10MB)
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Income Information */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Income Information</h2>
                <div className="space-y-6">
                  <Input
                    label="Wages & Salaries (W-2 Income)"
                    type="number"
                    value={formData.wageIncome}
                    onChange={(e) => setFormData({ ...formData, wageIncome: parseFloat(e.target.value) || 0 })}
                    leftIcon={<span className="text-gray-600">$</span>}
                    helperText="Total from all W-2 forms"
                  />
                  <Input
                    label="Interest Income"
                    type="number"
                    value={formData.interestIncome}
                    onChange={(e) => setFormData({ ...formData, interestIncome: parseFloat(e.target.value) || 0 })}
                    leftIcon={<span className="text-gray-600">$</span>}
                    helperText="From bank accounts, bonds, etc."
                  />
                  <Input
                    label="Dividend Income"
                    type="number"
                    value={formData.dividendIncome}
                    onChange={(e) => setFormData({ ...formData, dividendIncome: parseFloat(e.target.value) || 0 })}
                    leftIcon={<span className="text-gray-600">$</span>}
                  />
                  <Input
                    label="Business Income (Self-Employment)"
                    type="number"
                    value={formData.businessIncome}
                    onChange={(e) => setFormData({ ...formData, businessIncome: parseFloat(e.target.value) || 0 })}
                    leftIcon={<span className="text-gray-600">$</span>}
                    helperText="Net income from Schedule C"
                  />
                  <Input
                    label="Capital Gains"
                    type="number"
                    value={formData.capitalGains}
                    onChange={(e) => setFormData({ ...formData, capitalGains: parseFloat(e.target.value) || 0 })}
                    leftIcon={<span className="text-gray-600">$</span>}
                  />
                  <Input
                    label="Other Income"
                    type="number"
                    value={formData.otherIncome}
                    onChange={(e) => setFormData({ ...formData, otherIncome: parseFloat(e.target.value) || 0 })}
                    leftIcon={<span className="text-gray-600">$</span>}
                    helperText="Rental income, alimony, etc."
                  />

                  <div className="p-4 bg-light-accent-primary/10 dark:bg-dark-accent-primary/10 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Total Income</span>
                      <span className="text-2xl font-bold text-light-accent-primary dark:text-dark-accent-primary">
                        ${totalIncome.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Household Information */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Household Information</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Add any dependents you will claim on your tax return.
                </p>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                  <UsersThree weight="thin" className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    No dependents added yet
                  </p>
                  <Button variant="outline">Add Dependent</Button>
                </div>
              </div>
            )}

            {/* Step 5: Bank Information */}
            {currentStep === 5 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Bank Information</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  For direct deposit of your refund or direct debit for any amount owed.
                </p>
                <div className="space-y-6">
                  <Input
                    label="Bank Routing Number"
                    value={formData.bankRouting}
                    onChange={(e) => setFormData({ ...formData, bankRouting: e.target.value })}
                    placeholder="9 digits"
                    maxLength={9}
                  />
                  <Input
                    label="Account Number"
                    value={formData.bankAccount}
                    onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                  />
                  <div>
                    <label className="block text-sm font-medium mb-2">Account Type</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="accountType"
                          value="checking"
                          checked={formData.bankAccountType === 'checking'}
                          onChange={(e) => setFormData({ ...formData, bankAccountType: e.target.value })}
                          className="w-4 h-4 text-light-accent-primary"
                        />
                        Checking
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="accountType"
                          value="savings"
                          checked={formData.bankAccountType === 'savings'}
                          onChange={(e) => setFormData({ ...formData, bankAccountType: e.target.value })}
                          className="w-4 h-4 text-light-accent-primary"
                        />
                        Savings
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Document Checklist */}
            {currentStep === 6 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Document Checklist</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Upload the following documents to complete your tax return.
                </p>
                <div className="space-y-4">
                  {[
                    { name: 'W-2 Forms', description: 'From all employers', required: true },
                    { name: '1099 Forms', description: 'Interest, dividends, freelance income', required: false },
                    { name: 'Mortgage Interest (1098)', description: 'If you own a home', required: false },
                    { name: 'Property Tax Statements', description: 'If you own property', required: false },
                    { name: 'Charitable Donation Receipts', description: 'If itemizing deductions', required: false },
                  ].map((doc) => (
                    <div
                      key={doc.name}
                      className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <div>
                        <div className="font-medium">
                          {doc.name}
                          {doc.required && <span className="text-red-500 ml-1">*</span>}
                        </div>
                        <div className="text-sm text-gray-500">{doc.description}</div>
                      </div>
                      <Button variant="outline" size="sm">Upload</Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 7: Engagement Letter */}
            {currentStep === 7 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Engagement Letter</h2>
                <div className="bg-gray-50 dark:bg-dark-bg-tertiary p-6 rounded-lg mb-6 max-h-96 overflow-y-auto text-sm">
                  <h3 className="font-bold mb-4">TAX PREPARATION ENGAGEMENT LETTER</h3>
                  <p className="mb-4">
                    This letter confirms the terms of our engagement and the nature and limitations
                    of the services we will provide.
                  </p>
                  <p className="mb-4">
                    We will prepare your {new Date().getFullYear()} federal and applicable state income tax
                    returns based on the information you provide to us. We will not audit or otherwise
                    verify the data you submit.
                  </p>
                  <p className="mb-4">
                    Our work will not include any procedures to discover defalcations or other
                    irregularities. The accuracy of the information provided is your responsibility.
                  </p>
                  <p>
                    By signing below, you acknowledge that you have read, understand, and agree to
                    the terms of this engagement letter.
                  </p>
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.engagementSigned}
                    onChange={(e) => setFormData({ ...formData, engagementSigned: e.target.checked })}
                    className="w-5 h-5 mt-0.5 rounded border-gray-300 text-light-accent-primary focus:ring-light-accent-primary"
                  />
                  <span>
                    I have read and agree to the terms of this engagement letter.
                    I understand that by checking this box, I am electronically signing this document.
                  </span>
                </label>
              </div>
            )}

            {/* Step 8: Declarations */}
            {currentStep === 8 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Declarations</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Please review and confirm the following declarations.
                </p>
                <div className="space-y-4">
                  {[
                    'All information provided is true, correct, and complete to the best of my knowledge.',
                    'I have disclosed all sources of income for the tax year.',
                    'I have provided accurate documentation for all claimed deductions and credits.',
                    'I understand that I am responsible for the accuracy of the information on my tax return.',
                    'I authorize BestUsTax to electronically file my tax return with the IRS.',
                  ].map((declaration, index) => (
                    <label key={index} className="flex items-start gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-light-accent-primary transition-colors">
                      <input
                        type="checkbox"
                        className="w-5 h-5 mt-0.5 rounded border-gray-300 text-light-accent-primary focus:ring-light-accent-primary"
                      />
                      <span>{declaration}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 9: Form 8879 */}
            {currentStep === 9 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Form 8879 - E-file Authorization</h2>
                <div className="bg-gray-50 dark:bg-dark-bg-tertiary p-6 rounded-lg mb-6">
                  <h3 className="font-bold mb-4">IRS E-file Signature Authorization</h3>
                  <p className="text-sm mb-4">
                    By signing Form 8879, you authorize the electronic filing of your tax return
                    and agree that the information entered is accurate.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Taxpayer Name:</span>
                      <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Tax Year:</span>
                      <p className="font-medium">{new Date().getFullYear()}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Filing Status:</span>
                      <p className="font-medium capitalize">{formData.filingStatus.replace('-', ' ')}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Total Income:</span>
                      <p className="font-medium">${totalIncome.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.form8879Signed}
                    onChange={(e) => setFormData({ ...formData, form8879Signed: e.target.checked })}
                    className="w-5 h-5 mt-0.5 rounded border-gray-300 text-light-accent-primary focus:ring-light-accent-primary"
                  />
                  <span>
                    I authorize the electronic filing of this tax return to the IRS and applicable
                    state agencies. I understand that my signature on this form is equivalent to my
                    handwritten signature.
                  </span>
                </label>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            leftIcon={<ArrowLeft />}
          >
            Previous
          </Button>

          {saving && (
            <span className="text-sm text-gray-500 flex items-center gap-2">
              <SpinnerGap className="w-4 h-4 animate-spin" />
              Saving...
            </span>
          )}

          {currentStep < 9 ? (
            <Button onClick={handleNext} rightIcon={<ArrowRight />} disabled={saving}>
              Save & Continue
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={saving || !formData.form8879Signed}
              glow
            >
              {saving ? (
                <>
                  <SpinnerGap className="w-4 h-4 animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                'Submit Tax Return'
              )}
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
