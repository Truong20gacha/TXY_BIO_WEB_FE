import { useSearchParams } from 'react-router-dom'

import { FadeInSection } from '@/components/common/FadeInSection'
import { SEO } from '@/components/common/SEO'
import { InquiryForm } from '@/sections/product/InquiryForm'
import data from '@/data/information.json'

import type { InquiryIntent } from '@/sections/product/InquiryForm'

const heroData = data.heroes.contact
const { contact } = data

const SEO_TITLE = 'Contact · Yeast biotech for shrimp and poultry'
const SEO_DESCRIPTION = 'Request a quote from our sales team. Lead time 4-6 weeks port-to-port. MOQ 1 tonne. Response within 48 hours.'

const HIGHLIGHTS: ReadonlyArray<{ label: string; value: string }> = [
  { label: 'Response time', value: contact.exportInfo.responseTime },
  { label: 'Lead time', value: contact.exportInfo.leadTime },
  { label: 'Minimum order', value: contact.exportInfo.minOrderQty },
]

const FORM_COPY: Record<InquiryIntent, { eyebrow: string; heading: string; description: string }> = {
  quote: {
    eyebrow: 'Inquiry',
    heading: 'Tell us about your operation.',
    description: 'The more detail you share, the better we can tailor a quote. Required fields marked with *.',
  },
  datasheet: {
    eyebrow: 'Datasheet request',
    heading: 'Request a technical datasheet.',
    description: "Share your contact details and we'll send the full technical datasheet within 48 hours. Required fields marked with *.",
  },
  sample: {
    eyebrow: 'Sample request',
    heading: 'Request a free sample.',
    description: "Tell us a bit about your evaluation needs and we'll arrange a sample under our qualified-buyer policy. Required fields marked with *.",
  },
}

function parseIntent(raw: string | null): InquiryIntent {
  if (raw === 'datasheet') return 'datasheet'
  if (raw === 'sample')    return 'sample'
  return 'quote'
}

export function ContactPage() {
  const [searchParams] = useSearchParams()
  const intent = parseIntent(searchParams.get('intent'))
  const preselectedProduct = searchParams.get('product') ?? ''
  const formCopy = FORM_COPY[intent]

  return (
    <>
      <SEO title={SEO_TITLE} description={SEO_DESCRIPTION} />

      {/* Page hero */}
      <section className="border-t border-line-divider">
        <div className="container-x pt-20 pb-12 md:pt-24 md:pb-16">
          <p className="text-eyebrow text-accent-primary">{heroData.eyebrow}</p>
          <h1 className="mt-4 text-display-md text-ink-primary leading-tight">
            {heroData.headlineLine1}
            <br />
            <span className="text-ink-secondary">{heroData.headlineLine2}</span>
          </h1>
          <p className="mt-4 max-w-prose text-body-lg text-ink-secondary">{heroData.description}</p>

          {/* Highlight stats */}
          <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3 md:gap-12">
            {HIGHLIGHTS.map(item => (
              <div key={item.label} className="border-t border-line-hair pt-4">
                <p className="text-h3 font-medium text-ink-primary">{item.value}</p>
                <p className="mt-2 text-eyebrow text-ink-tertiary">{item.label.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Contact info */}
      <FadeInSection className="border-t border-line-divider">
        <div className="container-x py-24 md:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3 lg:gap-12">

            {/* Form (2/3) */}
            <div className="lg:col-span-2">
              <p className="text-eyebrow text-accent-primary">{formCopy.eyebrow}</p>
              <h2 className="mt-4 text-h1 font-medium text-ink-primary">
                {formCopy.heading}
              </h2>
              <p className="mt-4 max-w-prose text-body-sm text-ink-secondary">
                {formCopy.description}
              </p>
              <div className="mt-12">
                <InquiryForm
                  preselectedProduct={preselectedProduct}
                  preselectedIntent={intent}
                />
              </div>
            </div>

            {/* Direct contact (1/3) */}
            <aside className="lg:col-span-1">
              <p className="text-eyebrow text-ink-tertiary">Direct contact</p>

              <div className="mt-8 space-y-10">

                <div>
                  <p className="text-eyebrow text-ink-tertiary">Address</p>
                  <address className="mt-3 not-italic text-body-sm leading-relaxed text-ink-secondary">
                    {contact.address.line1}<br />
                    {contact.address.line2}<br />
                    {contact.address.city}, {contact.address.country}
                  </address>
                </div>

                <div>
                  <p className="text-eyebrow text-ink-tertiary">Phone</p>
                  <ul className="mt-3 space-y-2">
                    {contact.phones.map(p => (
                      <li key={p.label} className="text-body-sm text-ink-secondary">
                        <span className="text-caption text-ink-tertiary">{p.label}: </span>
                        <a
                          href={`tel:${p.number.replace(/\s/g, '')}`}
                          className="font-mono text-ink-primary hover:text-accent-primary transition-colors duration-200"
                        >
                          {p.display}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-eyebrow text-ink-tertiary">Email</p>
                  <ul className="mt-3 space-y-2">
                    <li className="text-body-sm">
                      <span className="text-caption text-ink-tertiary">Sales: </span>
                      <a
                        href={`mailto:${contact.emails.sales}`}
                        className="text-accent-primary hover:text-accent-hover transition-colors duration-200"
                      >
                        {contact.emails.sales}
                      </a>
                    </li>
                    <li className="text-body-sm">
                      <span className="text-caption text-ink-tertiary">Support: </span>
                      <a
                        href={`mailto:${contact.emails.support}`}
                        className="text-accent-primary hover:text-accent-hover transition-colors duration-200"
                      >
                        {contact.emails.support}
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-eyebrow text-ink-tertiary">Business hours</p>
                  <div className="mt-3 space-y-1 text-body-sm text-ink-secondary">
                    <p>{contact.businessHours.weekdaysLocal}</p>
                    <p>{contact.businessHours.weekend}</p>
                  </div>
                  <p className="mt-3 text-caption text-accent-primary">
                    {contact.businessHours.noteForAustralia}
                  </p>
                </div>

              </div>
            </aside>

          </div>
        </div>
      </FadeInSection>
    </>
  )
}
