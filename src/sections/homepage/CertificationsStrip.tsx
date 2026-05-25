import { FadeInSection } from '@/components/common/FadeInSection'
import data from '@/data/information.json'

export function CertificationsStrip() {
  return (
    <FadeInSection className="border-t border-line-divider">
      <div className="container-x py-24 md:py-32">
        <p className="text-eyebrow text-ink-tertiary">Certifications</p>
        <div className="grid grid-cols-2 gap-3 mt-8 md:grid-cols-4">
          {data.certifications.items.map(cert => (
            <div key={cert.id} className="p-4 border border-line-divider md:p-6">
              <p className="text-eyebrow text-accent-primary">{cert.code}</p>
              <p className="mt-3 text-body-sm text-ink-secondary">{cert.fullName}</p>
            </div>
          ))}
        </div>
      </div>
    </FadeInSection>
  )
}
