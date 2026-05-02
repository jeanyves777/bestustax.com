'use client'

import { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import {
  CalendarBlank,
  CaretLeft,
  CaretRight,
  DotsSixVertical,
  Pen,
  SpinnerGap,
  TextT,
  Trash,
} from '@phosphor-icons/react'
import Button from '@/components/ui/Button'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

export interface PlacedField {
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

interface FieldPlacerProps {
  pdfUrl: string
  fields: PlacedField[]
  onFieldsChange: (fields: PlacedField[]) => void
  readOnly?: boolean
}

const FIELD_DEFAULTS = {
  signature: { width: 16, height: 4, label: 'Signature' },
  initials: { width: 8, height: 4, label: 'Initials' },
  date: { width: 12, height: 3, label: 'Date' },
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

export function FieldPlacer({
  pdfUrl,
  fields,
  onFieldsChange,
  readOnly = false,
}: FieldPlacerProps) {
  const [numPages, setNumPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeFieldType, setActiveFieldType] = useState<'signature' | 'initials' | 'date' | null>(
    null
  )
  const [draggingField, setDraggingField] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [containerWidth, setContainerWidth] = useState(600)
  const containerRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)

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

  const handlePageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!activeFieldType || readOnly) return

    const pageEl = pageRef.current
    if (!pageEl) return

    const rect = pageEl.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    const defaults = FIELD_DEFAULTS[activeFieldType]

    const newField: PlacedField = {
      id: `field_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      type: activeFieldType,
      label: defaults.label,
      page: currentPage,
      x: Math.max(0, Math.min(x - defaults.width / 2, 100 - defaults.width)),
      y: Math.max(0, Math.min(y - defaults.height / 2, 100 - defaults.height)),
      width: defaults.width,
      height: defaults.height,
      required: true,
    }

    onFieldsChange([...fields, newField])
    setActiveFieldType(null)
  }

  const handleFieldMouseDown = (event: React.MouseEvent, fieldId: string) => {
    if (readOnly) return
    event.stopPropagation()

    const pageEl = pageRef.current
    if (!pageEl) return

    const rect = pageEl.getBoundingClientRect()
    const field = fields.find((candidate) => candidate.id === fieldId)
    if (!field) return

    setDragOffset({
      x: event.clientX - rect.left - (field.x / 100) * rect.width,
      y: event.clientY - rect.top - (field.y / 100) * rect.height,
    })
    setDraggingField(fieldId)
  }

  useEffect(() => {
    if (!draggingField) return

    const handleMouseMove = (event: MouseEvent) => {
      const pageEl = pageRef.current
      if (!pageEl) return

      const rect = pageEl.getBoundingClientRect()
      const field = fields.find((candidate) => candidate.id === draggingField)
      if (!field) return

      const nextX = ((event.clientX - rect.left - dragOffset.x) / rect.width) * 100
      const nextY = ((event.clientY - rect.top - dragOffset.y) / rect.height) * 100

      onFieldsChange(
        fields.map((candidate) =>
          candidate.id === draggingField
            ? {
                ...candidate,
                x: Math.max(0, Math.min(nextX, 100 - field.width)),
                y: Math.max(0, Math.min(nextY, 100 - field.height)),
              }
            : candidate
        )
      )
    }

    const handleMouseUp = () => setDraggingField(null)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [dragOffset, draggingField, fields, onFieldsChange])

  const currentPageFields = fields.filter((field) => field.page === currentPage)

  return (
    <div ref={containerRef} className="space-y-3">
      {!readOnly && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-medium text-gray-600 dark:text-gray-400">
            Place field:
          </span>
          <Button
            type="button"
            variant={activeFieldType === 'signature' ? 'primary' : 'outline'}
            size="sm"
            onClick={() =>
              setActiveFieldType(activeFieldType === 'signature' ? null : 'signature')
            }
            leftIcon={<Pen className="h-4 w-4" />}
          >
            Signature
          </Button>
          <Button
            type="button"
            variant={activeFieldType === 'initials' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveFieldType(activeFieldType === 'initials' ? null : 'initials')}
            leftIcon={<TextT className="h-4 w-4" />}
          >
            Initials
          </Button>
          <Button
            type="button"
            variant={activeFieldType === 'date' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveFieldType(activeFieldType === 'date' ? null : 'date')}
            leftIcon={<CalendarBlank className="h-4 w-4" />}
          >
            Date
          </Button>
          <span className="ml-auto rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            {fields.length} field{fields.length === 1 ? '' : 's'}
          </span>
        </div>
      )}

      {activeFieldType && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-center text-sm text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-200">
          Click the PDF to place a {activeFieldType} field.
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-900">
        <div
          ref={pageRef}
          className={activeFieldType ? 'relative mx-auto cursor-crosshair' : 'relative mx-auto'}
          style={{ width: containerWidth }}
          onClick={handlePageClick}
        >
          <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages: pages }) => setNumPages(pages)}
            loading={
              <div className="flex h-[560px] items-center justify-center">
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

            return (
              <div
                key={field.id}
                className={`group absolute flex items-center justify-center rounded border-2 border-dashed ${colors.bg} ${colors.border} ${
                  draggingField === field.id ? 'opacity-70' : ''
                } ${readOnly ? '' : 'cursor-move'}`}
                style={{
                  left: `${field.x}%`,
                  top: `${field.y}%`,
                  width: `${field.width}%`,
                  height: `${field.height}%`,
                }}
                onMouseDown={(event) => handleFieldMouseDown(event, field.id)}
              >
                <div
                  className={`flex items-center gap-1 text-xs font-medium ${colors.text} pointer-events-none select-none`}
                >
                  {!readOnly && <DotsSixVertical className="h-3 w-3 opacity-70" />}
                  {field.label}
                </div>
                {!readOnly && (
                  <button
                    type="button"
                    className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={(event) => {
                      event.stopPropagation()
                      onFieldsChange(fields.filter((candidate) => candidate.id !== field.id))
                    }}
                  >
                    <Trash className="h-3 w-3" weight="bold" />
                  </button>
                )}
              </div>
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
    </div>
  )
}
