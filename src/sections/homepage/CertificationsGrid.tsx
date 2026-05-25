import { Link } from 'react-router-dom'

import { FadeInSection } from '@/components/common/FadeInSection'
import data from '@/data/homepage.json'

const { eyebrow, title, items, ctaLabel, ctaUrl } = data.certifications

export function CertificationsGrid() {
  return (
    <FadeInSection className="border-t border-line-divider">
      <div className="container-x py-32 md:py-48">

        <div className="flex items-baseline justify-between flex-wrap gap-4">
          <p className="text-eyebrow text-accent-primary">{eyebrow}</p>
          <Link
            to={ctaUrl}
            className="text-body-sm font-medium text-accent-primary border-b border-accent-primary pb-0.5 hover:text-accent-hover hover:border-accent-hover transition-colors duration-200"
          >
            {ctaLabel} →
          </Link>
        </div>
        <h2 className="mt-6 text-display-md text-ink-primary leading-tight max-w-prose">
          {title}
        </h2>

        <div className="grid grid-cols-2 gap-3 mt-12 md:grid-cols-4 md:gap-4">
          {items.map(cert => (
            <div
              key={cert.code}
              className="flex flex-col p-5 border border-line-divider md:p-6 hover:bg-surface-alt transition-colors duration-200"
            >
              <p className="font-mono text-eyebrow text-accent-primary">{cert.code}</p>
              <p className="mt-3 text-caption text-ink-tertiary">{cert.category.toUpperCase()}</p>
              <p className="mt-4 text-body-sm text-ink-secondary leading-relaxed">
                {cert.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </FadeInSection>
  )
}
