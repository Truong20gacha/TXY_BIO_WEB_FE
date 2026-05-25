import { Link } from 'react-router-dom'

import { FadeInSection } from '@/components/common/FadeInSection'
import data from '@/data/homepage.json'

const banner = data.inquiryBanner

export function InquiryCTABanner() {
  const hasBackground = Boolean(banner.backgroundImage)

  return (
    <FadeInSection className="relative border-t border-line-divider overflow-hidden bg-surface-alt">

      {/* Background image with overlay — only when URL provided */}
      {hasBackground && (
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <img
            src={banner.backgroundImage}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-surface-white/85" />
        </div>
      )}

      <div className="container-x relative z-10 py-32 md:py-48">
        <p className="text-eyebrow text-accent-primary">{banner.eyebrow}</p>
        <h2 className="mt-6 text-display-md text-ink-primary leading-tight md:text-display-lg max-w-prose">
          {banner.title}
        </h2>
        <p className="mt-4 text-body-lg text-ink-secondary max-w-prose">
          {banner.subtitle}
        </p>

        {/* Trust signals row */}
        <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3 md:gap-12">
          {banner.trustSignals.map(signal => (
            <div key={signal.label} className="border-t border-line-mid pt-4">
              <p className="font-mono text-h3 font-medium text-accent-primary">{signal.value}</p>
              <p className="mt-2 text-eyebrow text-ink-tertiary">{signal.label.toUpperCase()}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            to={banner.cta.url}
            className="inline-block bg-accent-primary px-8 py-4 text-body font-medium text-surface-white hover:bg-accent-hover transition-colors duration-200"
          >
            {banner.cta.label} →
          </Link>
        </div>
      </div>

    </FadeInSection>
  )
}
