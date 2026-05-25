import { Link } from 'react-router-dom'

import { FadeInSection } from '@/components/common/FadeInSection'
import data from '@/data/homepage.json'

const { eyebrow, title, featured, compact, ctaLabel, ctaUrl } = data.news

export function NewsTeaser() {
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

        {/* Asymmetric: 1 featured large left + 2 compact stack right */}
        <div className="grid grid-cols-1 gap-6 mt-12 lg:grid-cols-3 lg:gap-8">

          {/* Featured — 2/3 width. Image renders only when URL provided. */}
          <Link
            to={`/news/${featured.slug}`}
            className="lg:col-span-2 flex flex-col border border-line-divider hover:border-ink-primary transition-colors duration-200 group"
          >
            {featured.image && (
              <div className="aspect-[16/9] overflow-hidden bg-surface-alt">
                <img
                  src={featured.image}
                  alt={featured.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-swiss"
                />
              </div>
            )}
            <div className={`flex flex-col p-6 md:p-8 ${featured.image ? '' : 'md:p-12'}`}>
              <p className="text-eyebrow text-ink-tertiary">
                <span className="font-mono">{featured.date}</span>
                <span className="mx-2 text-line-mid">·</span>
                <span className="text-accent-primary">{featured.category}</span>
                <span className="mx-2 text-line-mid">·</span>
                <span className="font-mono text-accent-primary">FEATURED</span>
              </p>
              <h3 className={`mt-4 font-medium text-ink-primary leading-snug ${featured.image ? 'text-h2' : 'text-display-md md:text-display-lg font-normal mt-6'}`}>
                {featured.title}
              </h3>
              <p className={`mt-3 text-ink-secondary line-clamp-3 leading-relaxed ${featured.image ? 'text-body' : 'text-body-lg mt-6 max-w-prose'}`}>
                {featured.excerpt}
              </p>
              <span className={`self-start text-body-sm font-medium text-accent-primary border-b border-accent-primary pb-0.5 ${featured.image ? 'mt-6' : 'mt-auto pt-10'}`}>
                Read article →
              </span>
            </div>
          </Link>

          {/* 2 compact — stacked right */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {compact.map(article => (
              <Link
                key={article.slug}
                to={`/news/${article.slug}`}
                className="flex flex-col flex-1 p-6 border border-line-divider hover:border-ink-primary transition-colors duration-200"
              >
                <p className="text-eyebrow text-ink-tertiary">
                  <span className="font-mono">{article.date}</span>
                  <span className="mx-2 text-line-mid">·</span>
                  <span className="text-accent-primary">{article.category}</span>
                </p>
                <h3 className="mt-4 text-body-lg font-normal leading-snug text-ink-primary line-clamp-3">
                  {article.title}
                </h3>
                <span className="mt-auto pt-6 text-body-sm font-medium text-accent-primary border-b border-accent-primary pb-0.5 self-start">
                  Read article →
                </span>
              </Link>
            ))}
          </div>

        </div>

      </div>
    </FadeInSection>
  )
}
