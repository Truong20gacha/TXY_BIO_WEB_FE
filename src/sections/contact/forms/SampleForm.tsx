import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, User, Package } from 'lucide-react'

import {
  COUNTRY_OPTIONS,
  SAMPLE_APPLICATION_OPTIONS,
  SAMPLE_VOLUME_OPTIONS,
} from '@/data/ctaPanelDefaults'

import type { ReactNode } from 'react'
import type { Product } from '@/types/information'

const sampleSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  workEmail: z.string().email('Enter a valid work email'),
  companyName: z.string().min(2, 'Company name is required'),
  country: z.string().min(1, 'Country is required'),
  intendedApplication: z.string().min(1, 'Please select an application'),
  estimatedVolume: z.string().min(1, 'Please select an estimated volume'),
  shippingAddress: z.string().min(10, 'Full address with postal code is required'),
  specialRequirements: z.string().optional(),
})

type SampleFormData = z.infer<typeof sampleSchema>

type SampleFormProps = Readonly<{
  product: Product
}>

const inputClass =
  'w-full h-10 bg-transparent border-b border-line-divider text-body-sm text-ink-primary focus:outline-none focus:border-b-2 focus:border-accent-primary transition-colors duration-200'

const textareaClass =
  'w-full bg-transparent border-b border-line-divider text-body-sm text-ink-primary focus:outline-none focus:border-b-2 focus:border-accent-primary transition-colors duration-200 resize-none py-2'

type FieldProps = Readonly<{
  label: string
  required?: boolean
  helper?: string
  error?: string
  children: (ids: { fieldId: string; errorId: string }) => ReactNode
}>

function Field({ label, required, helper, error, children }: FieldProps) {
  const fieldId = useId()
  const errorId = `${fieldId}-error`
  return (
    <div className="mb-5">
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

export function SampleForm({ product }: SampleFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SampleFormData>({
    resolver: zodResolver(sampleSchema),
    defaultValues: {
      country: 'Australia',
    },
  })

  function onSubmit(formData: SampleFormData) {
    console.info('[SampleForm] submit:', { product: product.slug, ...formData })
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="py-12 text-center" role="status">
        <p className="text-eyebrow text-accent-primary">REQUEST RECEIVED</p>
        <h3 className="mt-4 text-h2 font-medium text-ink-primary">Thank you.</h3>
        <p className="mt-4 text-body-sm text-ink-secondary max-w-prose mx-auto">
          Your sample request for <span className="font-medium text-ink-primary">{product.name}</span> has been received.
          Our sample team will review within 1 business day and email you confirmation.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-6">
        <p className="text-eyebrow text-accent-primary">SAMPLE REQUEST</p>
        <h3 className="mt-2 text-h3 font-medium text-ink-primary">Request a free sample</h3>
        <p className="mt-2 text-caption text-ink-secondary">Required fields marked with *.</p>
      </div>

      {/* Section 1 — Contact */}
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

      <Field label="Country" required error={errors.country?.message}>
        {({ fieldId, errorId }) => (
          <select
            id={fieldId}
            aria-invalid={!!errors.country}
            aria-describedby={errors.country ? errorId : undefined}
            className={inputClass}
            {...register('country')}
          >
            {COUNTRY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        )}
      </Field>

      {/* Section 2 — Sample qualification */}
      <div className="mt-8">
        <SectionHeading icon={<Package size={14} strokeWidth={1.5} />}>SAMPLE QUALIFICATION</SectionHeading>
      </div>

      <Field label="Intended application" required error={errors.intendedApplication?.message}>
        {({ fieldId, errorId }) => (
          <select
            id={fieldId}
            aria-invalid={!!errors.intendedApplication}
            aria-describedby={errors.intendedApplication ? errorId : undefined}
            defaultValue=""
            className={inputClass}
            {...register('intendedApplication')}
          >
            <option value="" disabled>Select an application…</option>
            {SAMPLE_APPLICATION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        )}
      </Field>

      <Field
        label="Estimated annual volume"
        required
        helper="helps us qualify"
        error={errors.estimatedVolume?.message}
      >
        {({ fieldId, errorId }) => (
          <select
            id={fieldId}
            aria-invalid={!!errors.estimatedVolume}
            aria-describedby={errors.estimatedVolume ? errorId : undefined}
            defaultValue=""
            className={inputClass}
            {...register('estimatedVolume')}
          >
            <option value="" disabled>Select estimated volume…</option>
            {SAMPLE_VOLUME_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        )}
      </Field>

      <Field label="Shipping address" required error={errors.shippingAddress?.message}>
        {({ fieldId, errorId }) => (
          <textarea
            id={fieldId}
            rows={2}
            placeholder="Full address with postal code"
            aria-invalid={!!errors.shippingAddress}
            aria-describedby={errors.shippingAddress ? errorId : undefined}
            className={textareaClass}
            {...register('shippingAddress')}
          />
        )}
      </Field>

      <Field
        label="Special requirements"
        helper="optional"
        error={errors.specialRequirements?.message}
      >
        {({ fieldId }) => (
          <textarea
            id={fieldId}
            rows={2}
            placeholder="e.g., specific batch number, parallel testing, packaging preferences"
            className={textareaClass}
            {...register('specialRequirements')}
          />
        )}
      </Field>

      {/* CTA */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex items-center gap-2 bg-accent-hover px-6 py-3 text-body-sm font-medium text-surface-white hover:bg-accent-emphasis disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <Send size={16} strokeWidth={1.75} aria-hidden="true" />
        {isSubmitting ? 'Submitting…' : 'Request sample'}
      </button>
    </form>
  )
}
