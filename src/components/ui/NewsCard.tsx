import { Link } from 'react-router-dom'

import { formatDateEyebrow } from '@/lib/format'

import type { NewsArticle } from '@/types/news'

type NewsCardProps = Readonly<{
  article: NewsArticle
  articleNumber?: number
  isLatest?: boolean
}>

export function NewsCard({ article, articleNumber, isLatest = false }: NewsCardProps) {
  return (
    <article className="relative flex flex-col p-6 border border-line-divider md:p-8">
      {isLatest && (
        <span className="absolute top-4 right-4 px-2 py-1 font-mono text-eyebrow text-accent-primary border border-accent-primary bg-surface-white">
          Latest
        </span>
      )}
      <p className="text-eyebrow text-ink-tertiary">
        {articleNumber !== undefined && (
          <>
            <span className="font-mono text-accent-primary">N°{String(articleNumber).padStart(2, '0')}</span>
            <span className="mx-2 text-line-mid">·</span>
          </>
        )}
        {formatDateEyebrow(article.publishedAt, article.category)}
      </p>
      <h3 className="mt-4 text-body-lg font-normal leading-snug text-ink-primary">
        {article.title}
      </h3>
      <p className="mt-3 text-body-sm text-ink-secondary line-clamp-3">
        {article.excerpt}
      </p>
      <Link
        to={`/news/${article.slug}`}
        className="mt-6 self-start text-body-sm font-medium text-accent-primary border-b border-accent-primary pb-0.5 hover:text-accent-hover hover:border-accent-hover transition-colors duration-200"
      >
        Read article →
      </Link>
    </article>
  )
}
