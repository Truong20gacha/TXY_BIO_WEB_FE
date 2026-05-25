import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, User, Building2, Banknote, FileCheck } from 'lucide-react'

import {
  COUNTRY_OPTIONS,
  BUSINESS_TYPE_OPTIONS,
  INCOTERMS_OPTIONS,
  PAYMENT_TERMS_OPTIONS,
  ANNUAL_VOLUME_OPTIONS,
  FIRST_ORDER_VOLUME_OPTIONS,
  ORDER_TIMING_OPTIONS,
  CURRENCY_OPTIONS,
  CERTIFICATION_OPTIONS,
} from '@/data/ctaPanelDefaults'

import type { ReactNode } from 'react'
import type { Product } from '@/types/information'

const PHONE_REGEX = /^\+?[\d\s\-()]{7,}$/

const salesSchema = z.object({
  // Contact
  fullName: z.string().min(2, 'Full name is required'),
  workEmail: z.string().email('Enter a valid work email'),
  phone: z
    .string()
    .optional()
    .refine(v => !v || PHONE_REGEX.test(v), 'Enter a valid phone (include country code, e.g. +84 …)'),
  jobTitle: z.string().optional(),

  // Company
  companyName: z.string().min(2, 'Company name is required'),
  companyWebsite: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  businessType: z.string().min(1, 'Business type is required'),

  // Commercial
  targetMarket: z.string().min(1, 'Target market is required'),
  destinationPort: z.string().optional(),
  annualVolume: z.string().min(1, 'Estimated annual volume is required'),
  firstOrderVolume: z.string().min(1, 'First order quantity is required'),
  incoterms: z.string().optional(),
  paymentTerms: z.string().optional(),
  orderTiming: z.string().min(1, 'Order timing is required'),
  currency: z.string().optional(),

  // Product requirements
  certifications: z.array(z.string()).optional(),
  specRequirements: z.string().optional(),
  currentlyUsing: z.string().optional(),
  additionalNotes: z.string().optional(),
})

type SalesFormData = z.infer<typeof salesSchema>

type SalesFormProps = Readonly<{
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

export function SalesForm({ product }: SalesFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SalesFormData>({
    resolver: zodResolver(salesSchema),
    defaultValues: {
      country: 'Australia',
      currency: 'USD',
    },
  })

  function onSubmit(formData: SalesFormData) {
    console.info('[SalesForm] submit:', { product: product.slug, ...formData })
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="py-12 text-center" role="status">
        <p className="text-eyebrow text-accent-primary">QUOTE REQUEST RECEIVED</p>
        <h3 className="mt-4 text-h2 font-medium text-ink-primary">Thank you.</h3>
        <p className="mt-4 text-body-sm text-ink-secondary max-w-prose mx-auto">
          Your quote request for <span className="font-medium text-ink-primary">{product.name}</span> has been received.
          A sales representative will email you within 1 business day with a complete quotation package including price, lead time, and contract terms.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-6">
        <p className="text-eyebrow text-accent-primary">QUOTE REQUEST</p>
        <h3 className="mt-2 text-h3 font-medium text-ink-primary">Tell us about your operation</h3>
        <p className="mt-2 text-caption text-ink-secondary">
          The more detail you share, the better we can tailor a quote. Required fields marked with *.
        </p>
      </div>

      {/* === Section 1: Contact === */}
      <SectionHeading icon={<User size={14} strokeWidth={1.5} />}>CONTACT</SectionHeading>

      <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
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

        <Field label="Job title" helper="optional" error={errors.jobTitle?.message}>
          {({ fieldId }) => (
            <input
              id={fieldId}
              type="text"
              placeholder="Procurement Manager"
              className={inputClass}
              {...register('jobTitle')}
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

        <Field label="Phone" helper="with country code" error={errors.phone?.message}>
          {({ fieldId, errorId }) => (
            <input
              id={fieldId}
              type="tel"
              inputMode="tel"
              placeholder="+84 90 123 4567"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? errorId : undefined}
              className={inputClass}
              {...register('phone')}
            />
          )}
        </Field>
      </div>

      {/* === Section 2: Company === */}
      <div className="mt-8">
        <SectionHeading icon={<Building2 size={14} strokeWidth={1.5} />}>COMPANY</SectionHeading>
      </div>

      <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
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

        <Field label="Company website" helper="optional" error={errors.companyWebsite?.message}>
          {({ fieldId }) => (
            <input
              id={fieldId}
              type="text"
              placeholder="acmefeed.com"
              className={inputClass}
              {...register('companyWebsite')}
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

        <Field label="Business type" required error={errors.businessType?.message}>
          {({ fieldId, errorId }) => (
            <select
              id={fieldId}
              defaultValue=""
              aria-invalid={!!errors.businessType}
              aria-describedby={errors.businessType ? errorId : undefined}
              className={inputClass}
              {...register('businessType')}
            >
              <option value="" disabled>Select business type…</option>
              {BUSINESS_TYPE_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          )}
        </Field>
      </div>

      {/* === Section 3: Commercial details === */}
      <div className="mt-8">
        <SectionHeading icon={<Banknote size={14} strokeWidth={1.5} />}>COMMERCIAL DETAILS</SectionHeading>
      </div>

      <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
        <Field label="Target market" required helper="ship to country" error={errors.targetMarket?.message}>
          {({ fieldId, errorId }) => (
            <input
              id={fieldId}
              type="text"
              placeholder="e.g., Vietnam, EU, GCC"
              aria-invalid={!!errors.targetMarket}
              aria-describedby={errors.targetMarket ? errorId : undefined}
              className={inputClass}
              {...register('targetMarket')}
            />
          )}
        </Field>

        <Field label="Destination port" helper="optional" error={errors.destinationPort?.message}>
          {({ fieldId }) => (
            <input
              id={fieldId}
              type="text"
              placeholder="e.g., Hai Phong, Sydney"
              className={inputClass}
              {...register('destinationPort')}
            />
          )}
        </Field>

        <Field
          label="Estimated annual volume"
          required
          helper="helps us tier pricing"
          error={errors.annualVolume?.message}
        >
          {({ fieldId, errorId }) => (
            <select
              id={fieldId}
              defaultValue=""
              aria-invalid={!!errors.annualVolume}
              aria-describedby={errors.annualVolume ? errorId : undefined}
              className={inputClass}
              {...register('annualVolume')}
            >
              <option value="" disabled>Select annual volume…</option>
              {ANNUAL_VOLUME_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          )}
        </Field>

        <Field label="First order quantity" required error={errors.firstOrderVolume?.message}>
          {({ fieldId, errorId }) => (
            <select
              id={fieldId}
              defaultValue=""
              aria-invalid={!!errors.firstOrderVolume}
              aria-describedby={errors.firstOrderVolume ? errorId : undefined}
              className={inputClass}
              {...register('firstOrderVolume')}
            >
              <option value="" disabled>Select first order…</option>
              {FIRST_ORDER_VOLUME_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          )}
        </Field>

        <Field label="Preferred Incoterms" helper="optional" error={errors.incoterms?.message}>
          {({ fieldId }) => (
            <select
              id={fieldId}
              defaultValue=""
              className={inputClass}
              {...register('incoterms')}
            >
              <option value="">No preference</option>
              {INCOTERMS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          )}
        </Field>

        <Field label="Preferred payment terms" helper="optional" error={errors.paymentTerms?.message}>
          {({ fieldId }) => (
            <select
              id={fieldId}
              defaultValue=""
              className={inputClass}
              {...register('paymentTerms')}
            >
              <option value="">No preference</option>
              {PAYMENT_TERMS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          )}
        </Field>

        <Field label="Order timing" required error={errors.orderTiming?.message}>
          {({ fieldId, errorId }) => (
            <select
              id={fieldId}
              defaultValue=""
              aria-invalid={!!errors.orderTiming}
              aria-describedby={errors.orderTiming ? errorId : undefined}
              className={inputClass}
              {...register('orderTiming')}
            >
              <option value="" disabled>Select timing…</option>
              {ORDER_TIMING_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          )}
        </Field>

        <Field label="Currency preference" helper="optional" error={errors.currency?.message}>
          {({ fieldId }) => (
            <select id={fieldId} className={inputClass} {...register('currency')}>
              {CURRENCY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          )}
        </Field>
      </div>

      {/* === Section 4: Product requirements === */}
      <div className="mt-8">
        <SectionHeading icon={<FileCheck size={14} strokeWidth={1.5} />}>PRODUCT REQUIREMENTS</SectionHeading>
      </div>

      <Field label="Required certifications" helper="for your market — check all that apply">
        {() => (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {CERTIFICATION_OPTIONS.map(cert => (
              <label key={cert} className="flex items-center gap-2 text-body-sm text-ink-secondary cursor-pointer">
                <input
                  type="checkbox"
                  value={cert}
                  className="h-4 w-4 accent-accent-primary"
                  {...register('certifications')}
                />
                {cert}
              </label>
            ))}
          </div>
        )}
      </Field>

      <Field
        label="Specific spec requirements"
        helper="optional"
        error={errors.specRequirements?.message}
      >
        {({ fieldId }) => (
          <textarea
            id={fieldId}
            rows={3}
            placeholder="e.g., β-glucan ≥ 30%, moisture ≤ 5%, particle size <500µm"
            className={textareaClass}
            {...register('specRequirements')}
          />
        )}
      </Field>

      <Field
        label="Currently using"
        helper="competitor product — helps us position"
        error={errors.currentlyUsing?.message}
      >
        {({ fieldId }) => (
          <input
            id={fieldId}
            type="text"
            placeholder="e.g., Alltech Actigen, Phileo Safmannan, in-house"
            className={inputClass}
            {...register('currentlyUsing')}
          />
        )}
      </Field>

      <Field
        label="Additional notes"
        helper="optional"
        error={errors.additionalNotes?.message}
      >
        {({ fieldId }) => (
          <textarea
            id={fieldId}
            rows={3}
            placeholder="Anything else our sales team should know — timing constraints, decision-making process, etc."
            className={textareaClass}
            {...register('additionalNotes')}
          />
        )}
      </Field>

      {/* CTA */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex items-center gap-2 bg-accent-primary px-6 py-3 text-body-sm font-medium text-surface-white hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <Send size={16} strokeWidth={1.75} aria-hidden="true" />
        {isSubmitting ? 'Submitting…' : 'Get a quote'}
      </button>
    </form>
  )
}
