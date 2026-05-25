import { Link } from 'react-router-dom'

import { FadeInSection } from '@/components/common/FadeInSection'
import data from '@/data/homepage.json'

const { eyebrow, title, intro, items, ctaLabel, ctaUrl } = data.products

export function ProductMatrix() {
  return (
    <FadeInSection className="border-t border-line-divider bg-surface-alt">
      <div className="container-x py-32 md:py-48">

        {/* Section header */}
        <div className="flex items-baseline justify-between flex-wrap gap-4">
          <p className="text-eyebrow text-accent-primary">{eyebrow}</p>
          <Link
            to={ctaUrl}
            className="text-body-sm font-medium text-accent-primary border-b border-accent-primary pb-0.5 hover:text-accent-hover hover:border-accent-hover transition-colors duration-200"
          >
            {ctaLabel} →
          </Link>
        </div>
        <h2 className="mt-6 text-display-md text-ink-primary leading-tight max-w-prose md:text-display-lg">
          {title}
        </h2>
        <p className="mt-6 max-w-prose text-body-lg text-ink-secondary leading-relaxed">
          {intro}
        </p>

        {/* Editorial product list — each product is 2-col block separated by hairline */}
        <div className="mt-16">
          {items.map(item => (
            <article
              key={item.slug}
              className="grid grid-cols-1 gap-8 py-12 border-t border-line-divider md:grid-cols-3 md:gap-12 md:py-16"
            >

              {/* Left col (1/3) — code + name + tagline + species */}
              <div className="md:col-span-1">
                <p className="font-mono text-eyebrow text-accent-primary">{item.code}</p>
                <h3 className="mt-4 text-h2 font-medium text-ink-primary leading-snug">
                  {item.name}
                </h3>
                <p className="mt-2 text-body-sm text-ink-secondary">{item.tagline}</p>

                <div className="flex flex-wrap gap-2 mt-6">
                  {item.species.map(label => (
                    <span
                      key={label}
                      className="border border-line-mid px-2 py-1 text-eyebrow text-ink-secondary bg-surface-white"
                    >
                      {label.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right col (2/3) — description paragraph + view link */}
              <div className="md:col-span-2">
                <p className="text-body-lg text-ink-secondary leading-relaxed">
                  {item.description}
                </p>
                <Link
                  to={`/products/${item.slug}`}
                  className="inline-block mt-8 text-body-sm font-medium text-accent-primary border-b border-accent-primary pb-0.5 hover:text-accent-hover hover:border-accent-hover transition-colors duration-200"
                >
                  View product →
                </Link>
              </div>

            </article>
          ))}
        </div>

      </div>
    </FadeInSection>
  )
}
