import { Link } from 'react-router-dom'

import { FadeInSection } from '@/components/common/FadeInSection'
import { SectionNumber } from '@/components/common/SectionNumber'
import { ZoomableImage } from '@/components/ui/ZoomableImage'
import data from '@/data/information.json'

type CertItem = {
  id: string
  code: string
  fullName: string
  category: string
  iconUrl: string | null
  badgeImage?: string | null
  authority?: string
  scope?: string
  description: string
}

const { eyebrow, title, intro, filingHighlight, items: licenseItems } = data.licenses

// Six public food-safety certifications, in display order
const CERT_IDS = ['brc', 'iso-22000', 'cnas', 'halal', 'kosher', 'sedex']
const allCerts = data.certifications.items as unknown as CertItem[]
const certs = CERT_IDS
  .map(id => allCerts.find(c => c.id === id))
  .filter((c): c is CertItem => Boolean(c))

// Government licenses gallery (Export Filing is featured separately as the anchor)
const galleryLicenses = licenseItems.filter(l => l.id !== 'export-filing-cert')

export function CertificationsLicenses() {
  return (
    <FadeInSection className="relative overflow-hidden border-t border-line-divider">
      <SectionNumber number="05" position="top-right" />
      <div className="container-x py-24 md:py-32">
        <p className="text-eyebrow text-accent-primary">{eyebrow}</p>
        <h2 className="mt-6 max-w-3xl text-display-md leading-tight text-ink-primary">{title}</h2>
        <p className="mt-6 max-w-2xl text-body-lg text-ink-secondary">{intro}</p>

        {/* Anchor — Export Food Production Enterprise Filing */}
        <div className="mt-12 grid grid-cols-1 gap-8 border border-line-divider bg-surface-alt p-6 md:grid-cols-[300px_1fr] md:gap-12 md:p-10">
          <div className="aspect-[3/4] border border-line-hair bg-surface-white">
            <ZoomableImage src={filingHighlight.image} alt={filingHighlight.titleEn} />
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-mono text-eyebrow text-accent-primary">
              Export-ready · Filing No. {filingHighlight.filingNo}
            </p>
            <h3 className="mt-4 text-h3 font-medium text-ink-primary">{filingHighlight.titleEn}</h3>
            <p className="mt-1 text-body-sm text-ink-tertiary">{filingHighlight.titleCn}</p>
            <p className="mt-4 text-body-sm text-ink-secondary">
              {filingHighlight.entity} · {filingHighlight.issuer}
            </p>
            <p className="mt-4 max-w-prose text-body-sm leading-relaxed text-ink-secondary">
              {filingHighlight.note}
            </p>

            <p className="mt-6 text-eyebrow text-ink-tertiary">Authorised product categories</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {filingHighlight.authorisedProducts.map(p =>
                p.slug ? (
                  <Link
                    key={p.en}
                    to={`/products/${p.slug}`}
                    className="border border-line-mid px-3 py-1.5 text-caption text-ink-secondary transition-colors duration-200 hover:border-accent-primary hover:text-accent-primary"
                  >
                    {p.en}
                  </Link>
                ) : (
                  <span
                    key={p.en}
                    className="border border-line-hair px-3 py-1.5 text-caption text-ink-tertiary"
                  >
                    {p.en}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        {/* International certifications */}
        <p className="mt-16 text-eyebrow text-ink-tertiary">International certifications</p>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {certs.map(cert => (
            <div key={cert.id} className="flex flex-col border border-line-divider bg-surface-white">
              <div className="aspect-[3/4] border-b border-line-hair">
                {cert.badgeImage ? (
                  <ZoomableImage src={cert.badgeImage} alt={cert.fullName} />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
                    <p className="font-mono text-h3 text-accent-primary">{cert.code}</p>
                    {cert.authority && (
                      <p className="mt-2 text-caption leading-snug text-ink-tertiary">{cert.authority}</p>
                    )}
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="font-mono text-caption text-accent-primary">{cert.code}</p>
                <p className="mt-1 text-caption leading-snug text-ink-secondary">{cert.scope ?? cert.fullName}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Government licenses */}
        <p className="mt-16 text-eyebrow text-ink-tertiary">Government licenses</p>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          {galleryLicenses.map(lic => (
            <div key={lic.id} className="flex flex-col border border-line-divider bg-surface-white">
              <div className="aspect-[4/3] border-b border-line-hair">
                <ZoomableImage src={lic.image} alt={lic.titleEn} />
              </div>
              <div className="p-4">
                <p className="text-body-sm font-medium text-ink-primary">{lic.titleEn}</p>
                <p className="mt-1 text-caption text-ink-tertiary">{lic.titleCn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FadeInSection>
  )
}
