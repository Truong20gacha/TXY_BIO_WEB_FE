import { useState } from 'react'

import data from '@/data/information.json'

import type { Certification } from '@/types/information'

const ALL_CERTS = data.certifications.items as Certification[]

type CertificationBadgesProps = Readonly<{
  certificationIds: ReadonlyArray<string>
}>

export function CertificationBadges({ certificationIds }: CertificationBadgesProps) {
  const certs = certificationIds
    .map(id => ALL_CERTS.find(c => c.id === id))
    .filter((c): c is Certification => c !== undefined)

  return (
    <div className="flex flex-wrap gap-3">
      {certs.map(cert => (
        <CertBadge key={cert.id} cert={cert} />
      ))}
    </div>
  )
}

type CertBadgeProps = Readonly<{ cert: Certification }>

function CertBadge({ cert }: CertBadgeProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        className="border border-line-mid px-3 py-2 text-eyebrow text-ink-secondary hover:border-accent-primary hover:text-accent-primary transition-colors duration-200"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
      >
        {cert.code}
      </button>
      {isVisible && (
        <div className="absolute bottom-full left-0 z-20 mb-2 w-64 bg-ink-primary p-3 pointer-events-none">
          <p className="text-body-sm font-medium text-surface-white">{cert.fullName}</p>
          <p className="mt-1 text-caption text-ink-muted">{cert.description}</p>
        </div>
      )}
    </div>
  )
}
