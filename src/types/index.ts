// Common Types
export interface NavLink {
  label: string
  href: string
  description?: string
  icon?: React.ComponentType
  subLinks?: NavLink[]
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  href: string
  features: string[]
  price?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  content: string
  rating: number
  avatar?: string
}

export interface Calculator {
  id: string
  title: string
  description: string
  icon: string
  href: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  category: string
  tags: string[]
  slug: string
  image?: string
}

export interface TaxForm {
  id: string
  name: string
  description: string
  year: number
  pdfUrl: string
  category: string
}

// Form Types
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface TaxCalculatorInput {
  filingStatus: 'single' | 'married-joint' | 'married-separate' | 'head-of-household'
  income: number
  deductions: number
  credits: number
  withheld: number
}

export interface TaxCalculatorResult {
  taxableIncome: number
  federalTax: number
  effectiveRate: number
  marginalRate: number
  refund: number
  taxBracket: string
}

// Client Portal Types
export interface Client {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  status: 'active' | 'inactive' | 'pending'
  accountType: 'individual' | 'business'
}

export interface Document {
  id: string
  clientId: string
  name: string
  type: string
  size: number
  uploadedAt: string
  url: string
  status: 'pending' | 'reviewed' | 'approved'
}

export interface TaxReturn {
  id: string
  clientId: string
  year: number
  status: 'draft' | 'in-review' | 'completed' | 'filed'
  filingDeadline: string
  estimatedRefund?: number
  documents: Document[]
  createdAt: string
  updatedAt: string
}

// Animation Types
export interface AnimationConfig {
  duration?: number
  delay?: number
  ease?: string
  repeat?: number
  yoyo?: boolean
}

export interface ScrollAnimationConfig extends AnimationConfig {
  threshold?: number
  triggerOnce?: boolean
}
