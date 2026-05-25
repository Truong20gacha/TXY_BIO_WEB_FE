import { Link } from 'react-router-dom'

import data from '@/data/homepage.json'

const hero = data.hero

export function HeroManifesto() {
  const hasBackground = Boolean(hero.backgroundImage)

  return (
    <section className="relative overflow-hidden">

      {/* Background image with overlay — only when URL provided */}
      {hasBackground && (
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <img
            src={hero.backgroundImage}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-surface-white/90" />
        </div>
      )}

      <div className="container-x relative z-10 pt-32 pb-24 md:pt-40 md:pb-32">

        <p className="text-eyebrow text-accent-primary">{hero.eyebrow}</p>

        <h1 className="mt-6">
          <span className="block text-display-lg text-ink-primary md:text-display-xl">
            {hero.headlineLine1}
          </span>
          <span className="block text-display-lg text-ink-secondary md:text-display-xl">
            {hero.headlineLine2}
          </span>
        </h1>

        <p className="mt-6 max-w-[480px] text-body-lg text-ink-secondary">
          {hero.description}
        </p>

        {/* Trust signals row */}
        <div className="flex items-center gap-3 mt-12">
          <span className="h-px w-8 bg-line-mid" aria-hidden="true" />
          <p className="text-eyebrow text-ink-tertiary">Trust signals</p>
          <span className="h-px flex-1 bg-line-mid max-w-[120px]" aria-hidden="true" />
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {hero.trustBadges.map(code => (
            <span
              key={code}
              className="px-2 py-1 text-eyebrow text-ink-secondary border border-line-mid bg-surface-white"
            >
              {code}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-6 mt-10">
          <Link
            to={hero.primaryCta.url}
            className="px-6 py-3 text-body-sm font-medium text-white bg-accent-primary rounded-xs hover:bg-accent-hover transition-colors duration-200"
          >
            {hero.primaryCta.label}
          </Link>
          <Link
            to={hero.secondaryCta.url}
            className="text-body-sm font-medium text-accent-primary border-b border-accent-primary pb-0.5 hover:text-accent-hover hover:border-accent-hover transition-colors duration-200"
          >
            {hero.secondaryCta.label} →
          </Link>
        </div>

      </div>
    </section>
  )
}
