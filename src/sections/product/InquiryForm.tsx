import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import clsx from 'clsx'

import data from '@/data/information.json'

import type { ReactNode } from 'react'

const PHONE_REGEX = /^\+?[\d\s\-()]{7,}$/

const inquirySchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  email: z.string().email('Enter a valid email address'),
  phone: z
    .string()
    .optional()
    .refine(
      val => !val || PHONE_REGEX.test(val),
      'Enter a valid phone number (include country code, e.g. +61 …)',
    ),
  country: z.string().min(1, 'Country is required'),
  businessType: z.string().min(1, 'Business type is required'),
  productOfInterest: z.string().optional(),
  estimatedQuantity: z.string().optional(),
  portOfDestination: z.string().optional(),
  additionalNotes: z.string().optional(),
})

type InquiryFormData = z.infer<typeof inquirySchema>

export type InquiryIntent = 'quote' | 'datasheet' | 'sample'

type InquiryFormProps = Readonly<{
  preselectedProduct?: string
  preselectedIntent?: InquiryIntent
}>

const INTENT_NOTES_PREFILL: Record<InquiryIntent, string> = {
  quote: '',
  datasheet: 'I would like to request the technical datasheet for the selected product, including full composition, dosage table, and certificates.',
  sample: 'I would like to request a free sample of the selected product for technical evaluation. Please advise on available quantities, lead time, and any qualification requirements.',
}

const inputClass =
  'w-full h-12 bg-transparent border-b border-line-divider text-body-sm text-ink-primary focus:outline-none focus:border-b-2 focus:border-accent-primary transition-colors duration-200'

type FormFieldProps = Readonly<{
  label: string
  required?: boolean
  error?: string
  children: (ids: { fieldId: string; errorId: string }) => ReactNode
  className?: string
}>

function FormField({ label, required = false, error, children, className }: FormFieldProps) {
  const fieldId = useId()
  const errorId = `${fieldId}-error`
  return (
    <div className={className}>
      <label htmlFor={fieldId} className="block mb-2 text-eyebrow text-ink-tertiary">
        {label.toUpperCase()}
        {required && <span className="ml-1 text-accent-primary" aria-hidden="true">*</span>}
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

export function InquiryForm({
  preselectedProduct = '',
  preselectedIntent = 'quote',
}: InquiryFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      country: 'Australia',
      productOfInterest: preselectedProduct,
      additionalNotes: INTENT_NOTES_PREFILL[preselectedIntent],
    },
  })

  function onSubmit(formData: InquiryFormData) {
    console.info('[InquiryForm] submit:', formData)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="py-16 text-center" role="status">
        <p className="text-eyebrow text-accent-primary">Request received</p>
        <h3 className="mt-4 text-h1 font-medium text-ink-primary">Thank you.</h3>
        <p className="mt-4 text-body-lg text-ink-secondary max-w-prose mx-auto">
          We'll review your request and get back to you within 48 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <FormField label="Company name" required error={errors.companyName?.message}>
          {({ fieldId, errorId }) => (
            <input
              {...register('companyName')}
              id={fieldId}
              aria-invalid={errors.companyName ? 'true' : 'false'}
              aria-describedby={errors.companyName ? errorId : undefined}
              className={inputClass}
              autoComplete="organization"
            />
          )}
        </FormField>

        <FormField label="Contact name" required error={errors.contactName?.message}>
          {({ fieldId, errorId }) => (
            <input
              {...register('contactName')}
              id={fieldId}
              aria-invalid={errors.contactName ? 'true' : 'false'}
              aria-describedby={errors.contactName ? errorId : undefined}
              className={inputClass}
              autoComplete="name"
            />
          )}
        </FormField>

        <FormField label="Email" required error={errors.email?.message}>
          {({ fieldId, errorId }) => (
            <input
              {...register('email')}
              id={fieldId}
              type="email"
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? errorId : undefined}
              className={inputClass}
              autoComplete="email"
            />
          )}
        </FormField>

        <FormField label="Phone" error={errors.phone?.message}>
          {({ fieldId, errorId }) => (
            <input
              {...register('phone')}
              id={fieldId}
              type="tel"
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? errorId : undefined}
              className={inputClass}
              autoComplete="tel"
            />
          )}
        </FormField>

        <FormField label="Country" required error={errors.country?.message}>
          {({ fieldId, errorId }) => (
            <input
              {...register('country')}
              id={fieldId}
              aria-invalid={errors.country ? 'true' : 'false'}
              aria-describedby={errors.country ? errorId : undefined}
              className={inputClass}
              autoComplete="country-name"
            />
          )}
        </FormField>

        <FormField label="Business type" required error={errors.businessType?.message}>
          {({ fieldId, errorId }) => (
            <select
              {...register('businessType')}
              id={fieldId}
              aria-invalid={errors.businessType ? 'true' : 'false'}
              aria-describedby={errors.businessType ? errorId : undefined}
              className={clsx(inputClass, 'cursor-pointer')}
            >
              <option value="">Select type</option>
              {data.contact.businessTypes.map(bt => (
                <option key={bt.id} value={bt.id}>{bt.label}</option>
              ))}
            </select>
          )}
        </FormField>

        <FormField label="Product of interest" error={errors.productOfInterest?.message}>
          {({ fieldId }) => (
            <select
              {...register('productOfInterest')}
              id={fieldId}
              className={clsx(inputClass, 'cursor-pointer')}
            >
              <option value="">Select product (optional)</option>
              {data.products.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          )}
        </FormField>

        <FormField
          label="Estimated annual quantity (tonnes)"
          error={errors.estimatedQuantity?.message}
        >
          {({ fieldId }) => (
            <input
              {...register('estimatedQuantity')}
              id={fieldId}
              type="number"
              min="0"
              className={inputClass}
            />
          )}
        </FormField>

        <FormField label="Port of destination" error={errors.portOfDestination?.message}>
          {({ fieldId }) => (
            <input
              {...register('portOfDestination')}
              id={fieldId}
              className={inputClass}
            />
          )}
        </FormField>
      </div>

      <FormField label="Additional notes" error={errors.additionalNotes?.message} className="mt-8">
        {({ fieldId }) => (
          <textarea
            {...register('additionalNotes')}
            id={fieldId}
            rows={4}
            className={clsx(inputClass, 'h-auto resize-none py-2')}
          />
        )}
      </FormField>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-10 w-full bg-accent-primary px-8 py-3 text-body-sm font-medium text-surface-white hover:bg-accent-hover transition-colors duration-200 disabled:opacity-50 md:w-auto"
      >
        {isSubmitting ? 'Submitting…' : data.ctaTexts.submitForm}
      </button>
    </form>
  )
}
