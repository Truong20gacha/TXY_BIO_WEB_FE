import { Link, useParams } from 'react-router-dom'
import clsx from 'clsx'

import { FadeInSection } from '@/components/common/FadeInSection'
import { ScrollProgress } from '@/components/common/ScrollProgress'
import { SEO } from '@/components/common/SEO'
import { NewsCard } from '@/components/ui/NewsCard'
import { formatDateEyebrow, formatDateLong } from '@/lib/format'
import newsData from '@/data/news-mock.json'

import type { NewsArticle } from '@/types/news'

const articles = newsData as NewsArticle[]

const MAX_RELATED = 3
const WORDS_PER_MINUTE = 200

function estimateReadingMinutes(body: ReadonlyArray<string>): number {
  const totalWords = body.join(' ').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(totalWords / WORDS_PER_MINUTE))
}

export function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const article = articles.find(a => a.slug === slug)

  if (!article) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
        <SEO title="Article not found" />
        <p className="text-eyebrow text-ink-tertiary">404 / NOT FOUND</p>
        <h1 className="mt-4 text-display-md text-ink-primary">Article not found.</h1>
        <Link
          to="/news"
          className="mt-8 text-body-sm font-medium text-accent-primary border-b border-accent-primary pb-0.5 hover:text-accent-hover hover:border-accent-hover transition-colors duration-200"
        >
          ← Back to news
        </Link>
      </div>
    )
  }

  const relatedArticles = articles
    .filter(a => a.slug !== article.slug)
    .slice(0, MAX_RELATED)

  const readingMinutes = estimateReadingMinutes(article.body)

  return (
    <>
      <SEO
        title={article.title}
        description={article.excerpt}
        ogType="article"
      />
      <ScrollProgress />

      {/* Breadcrumb */}
      <nav className="border-t border-line-divider">
        <div className="container-x py-4">
          <div className="flex items-center gap-2 text-caption">
            <Link to="/" className="text-accent-primary hover:underline">Home</Link>
            <span className="text-line-mid">/</span>
            <Link to="/news" className="text-accent-primary hover:underline">News</Link>
            <span className="text-line-mid">/</span>
            <span className="text-ink-secondary line-clamp-1">{article.title}</span>
          </div>
        </div>
      </nav>

      {/* Article */}
      <section className="border-t border-line-divider">
        <div className="container-x py-16 md:py-24">
          <article className="max-w-prose">
            <p className="text-eyebrow text-ink-tertiary">
              {formatDateEyebrow(article.publishedAt, article.category)}
              <span className="mx-2 text-line-mid">·</span>
              <span className="font-mono">~{readingMinutes} min read</span>
            </p>
            <h1 className="mt-6 text-display-md text-ink-primary leading-tight">
              {article.title}
            </h1>
            <p className="mt-6 text-body-lg text-ink-secondary leading-relaxed">
              {article.excerpt}
            </p>
            <div className="mt-12 space-y-6">
              {article.body.map((paragraph, i) => (
                <p
                  key={i}
                  className={clsx(
                    'text-body leading-relaxed text-ink-primary',
                    i === 0 && 'first-letter:font-display first-letter:text-[72px] first-letter:leading-[0.8] first-letter:float-left first-letter:mr-3 first-letter:mt-2 first-letter:text-ink-primary',
                  )}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <p className="mt-12 text-caption text-ink-tertiary">
              Published {formatDateLong(article.publishedAt)}
            </p>
            <Link
              to="/news"
              className="inline-block mt-8 text-body-sm font-medium text-accent-primary border-b border-accent-primary pb-0.5 hover:text-accent-hover hover:border-accent-hover transition-colors duration-200"
            >
              ← Back to all news
            </Link>
          </article>
        </div>
      </section>

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <FadeInSection className="border-t border-line-divider">
          <div className="container-x py-32 md:py-48">
            <p className="text-eyebrow text-ink-tertiary">More news</p>
            <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3 md:gap-6">
              {relatedArticles.map(related => (
                <NewsCard key={related.id} article={related} />
              ))}
            </div>
          </div>
        </FadeInSection>
      )}
    </>
  )
}
