import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, User, FileText, Download, CheckCircle2 } from 'lucide-react'

import {
  COUNTRY_OPTIONS,
  TARGET_SPECIES_OPTIONS,
  DATASHEET_REASON_OPTIONS,
  SPEC_INTEREST_OPTIONS,
  datasheetPanelDefaults,
} from '@/data/ctaPanelDefaults'

import type { ReactNode } from 'react'
import type { Product } from '@/types/information'

const datasheetSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  workEmail: z.string().email('Enter a valid work email'),
  companyName: z.string().min(2, 'Company name is required'),
  targetMarket: z.string().min(1, 'Target market is required'),
  reason: z.string().min(1, 'Please select a reason'),
  targetSpecies: z.array(z.string()).min(1, 'Select at least one target species'),
  specsOfInterest: z.array(z.string()).optional(),
  benchmarkingAgainst: z.string().optional(),
  confidentiality: z.literal(true, {
    message: 'You must agree to the confidentiality terms',
  }),
})

type DatasheetFormData = z.infer<typeof datasheetSchema>

type DatasheetFormProps = Readonly<{
  product: Product
}>

const inputClass =
  'w-full h-10 bg-transparent border-b border-line-divider text-body-sm text-ink-primary focus:outline-none focus:border-b-2 focus:border-accent-primary transition-colors duration-200'

type FieldProps = Readonly<{
  label: string
  required?: boolean
  helper?: string
  error?: string
  children: (ids: { fieldId: string; errorId: string }) => ReactNode
  className?: string
}>

function Field({ label, required, helper, error, children, className = 'mb-5' }: FieldProps) {
  const fieldId = useId()
  const errorId = `${fieldId}-error`
  return (
    <div className={className}>
      <label htmlFor={fieldId} className="block mb-2 text-eyebrow text-ink-tertiary">
        {label.toUpperCase()}
        {required && <span className="ml-1 text-accent-primary" aria-hidden="true">*</span>}
        {helper && <span className="ml-2 normal-case tracking-normal text-ink-muted">— {helper}</span>}
      </label>
      {children({ fieldId, errorId })}
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-caption text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

function SectionHeading({ icon, children }: Readonly<{ icon: ReactNode; children: ReactNode }>) {
  return (
    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-line-hair">
      <span className="text-ink-tertiary" aria-hidden="true">{icon}</span>
      <p className="text-eyebrow text-ink-secondary">{children}</p>
    </div>
  )
}

export function DatasheetForm({ product }: DatasheetFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { gatedFiles } = datasheetPanelDefaults

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DatasheetFormData>({
    resolver: zodResolver(datasheetSchema),
    defaultValues: {
      targetSpecies: [],
      specsOfInterest: [],
    },
  })

  function onSubmit(formData: DatasheetFormData) {
    console.info('[DatasheetForm] submit:', { product: product.slug, ...formData })
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="py-8" role="status">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 size={20} strokeWidth={2} className="text-success" aria-hidden="true" />
          <p className="text-eyebrow text-accent-primary">REQUEST APPROVED</p>
        </div>
        <h3 className="mt-2 text-h2 font-medium text-ink-primary">Thank you.</h3>
        <p className="mt-3 text-body-sm text-ink-secondary">
          Your datasheet pack for <span className="font-medium text-ink-primary">{product.name}</span> is ready.
        </p>
        <p className="mt-2 text-caption text-ink-tertiary">
          Note: in production, our sales team reviews each request before delivering documents.
          For this demo, downloads are immediate.
        </p>

        <div className="mt-8 space-y-3">
          {gatedFiles.map(file => (
            <a
              key={file.key}
              href={`/datasheets/${product.slug}/${file.key}.pdf`}
              download
              className="flex items-center gap-3 border border-line-divider p-4 hover:bg-surface-alt transition-colors duration-200 group"
            >
              <FileText size={20} strokeWidth={1.5} className="shrink-0 text-ink-tertiary group-hover:text-accent-primary" aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <p className="text-body-sm font-medium text-ink-primary">{file.label}</p>
                <p className="mt-1 font-mono text-eyebrow text-ink-tertiary">
                  {file.pages.toUpperCase()} · {file.size.toUpperCase()}
                </p>
              </div>
              <Download size={18} strokeWidth={1.5} className="shrink-0 text-accent-primary" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-6">
        <p className="text-eyebrow text-accent-primary">DATASHEET REQUEST</p>
        <h3 className="mt-2 text-h3 font-medium text-ink-primary">Request the full datasheet pack</h3>
        <p className="mt-2 text-caption text-ink-secondary">
          Help us tailor the pack to your market and use case. Required fields marked with *.
        </p>
      </div>

      {/* === Section 1: Contact (slim) === */}
      <SectionHeading icon={<User size={14} strokeWidth={1.5} />}>CONTACT</SectionHeading>

      <Field label="Full name" required error={errors.fullName?.message}>
        {({ fieldId, errorId }) => (
          <input
            id={fieldId}
            type="text"
            placeholder="John Smith"
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? errorId : undefined}
            className={inputClass}
            {...register('fullName')}
          />
        )}
      </Field>

      <Field label="Work email" required error={errors.workEmail?.message}>
        {({ fieldId, errorId }) => (
          <input
            id={fieldId}
            type="email"
            inputMode="email"
            placeholder="john@company.com"
            aria-invalid={!!errors.workEmail}
            aria-describedby={errors.workEmail ? errorId : undefined}
            className={inputClass}
            {...register('workEmail')}
          />
        )}
      </Field>

      <Field label="Company name" required error={errors.companyName?.message}>
        {({ fieldId, errorId }) => (
          <input
            id={fieldId}
            type="text"
            placeholder="Acme Feed Co."
            aria-invalid={!!errors.companyName}
            aria-describedby={errors.companyName ? errorId : undefined}
            className={inputClass}
            {...register('companyName')}
          />
        )}
      </Field>

      {/* === Section 2: Tailor your datasheet === */}
      <div className="mt-8">
        <SectionHeading icon={<FileText size={14} strokeWidth={1.5} />}>TAILOR YOUR DATASHEET</SectionHeading>
      </div>

      <Field
        label="Target species"
        required
        helper="check all that apply"
        error={errors.targetSpecies?.message}
      >
        {() => (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {TARGET_SPECIES_OPTIONS.map(species => (
              <label key={species} className="flex items-center gap-2 text-body-sm text-ink-secondary cursor-pointer">
                <input
                  type="checkbox"
                  value={species}
                  className="h-4 w-4 accent-accent-primary"
                  {...register('targetSpecies')}
                />
                {species}
              </label>
            ))}
          </div>
        )}
      </Field>

      <Field
        label="Target market"
        required
        helper="affects regulatory section"
        error={errors.targetMarket?.message}
      >
        {({ fieldId, errorId }) => (
          <select
            id={fieldId}
            aria-invalid={!!errors.targetMarket}
            aria-describedby={errors.targetMarket ? errorId : undefined}
            className={inputClass}
            {...register('targetMarket')}
          >
            <option value="">Select target market…</option>
            {COUNTRY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        )}
      </Field>

      <Field
        label="Reason for request"
        required
        error={errors.reason?.message}
      >
        {({ fieldId, errorId }) => (
          <select
            id={fieldId}
            defaultValue=""
            aria-invalid={!!errors.reason}
            aria-describedby={errors.reason ? errorId : undefined}
            className={inputClass}
            {...register('reason')}
          >
            <option value="" disabled>Select reason…</option>
            {DATASHEET_REASON_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        )}
      </Field>

      <Field
        label="Specs of most interest"
        helper="optional — check all that apply"
      >
        {() => (
          <div className="grid grid-cols-1 gap-2 mt-2 md:grid-cols-2">
            {SPEC_INTEREST_OPTIONS.map(spec => (
              <label key={spec} className="flex items-center gap-2 text-body-sm text-ink-secondary cursor-pointer">
                <input
                  type="checkbox"
                  value={spec}
                  className="h-4 w-4 accent-accent-primary"
                  {...register('specsOfInterest')}
                />
                {spec}
              </label>
            ))}
          </div>
        )}
      </Field>

      <Field
        label="Benchmarking against"
        helper="optional — competitor product"
        error={errors.benchmarkingAgainst?.message}
      >
        {({ fieldId }) => (
          <input
            id={fieldId}
            type="text"
            placeholder="e.g., Alltech Actigen, Phileo Safmannan"
            className={inputClass}
            {...register('benchmarkingAgainst')}
          />
        )}
      </Field>

      {/* === Confidentiality === */}
      <div className="mt-6 border border-warning/30 bg-warning/5 p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 accent-warning"
            {...register('confidentiality')}
          />
          <span className="text-caption text-ink-secondary leading-relaxed">
            <span className="font-medium text-ink-primary">I confirm</span> that I will use this datasheet for
            evaluation purposes only and will not redistribute it without written consent from TXY Bio.
            <span className="ml-1 text-accent-primary" aria-hidden="true">*</span>
          </span>
        </label>
        {errors.confidentiality && (
          <p role="alert" className="mt-2 ml-7 text-caption text-danger">
            {errors.confidentiality.message}
          </p>
        )}
      </div>

      {/* CTA */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex items-center gap-2 bg-accent-primary px-6 py-3 text-body-sm font-medium text-surface-white hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <Send size={16} strokeWidth={1.75} aria-hidden="true" />
        {isSubmitting ? 'Submitting…' : 'Request datasheet pack'}
      </button>
    </form>
  )
}
