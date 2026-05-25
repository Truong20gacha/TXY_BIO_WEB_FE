import { Newspaper } from 'lucide-react'

import { FadeInSection } from '@/components/common/FadeInSection'
import { SEO } from '@/components/common/SEO'
import { EmptyState } from '@/components/ui/EmptyState'
import { NewsCard } from '@/components/ui/NewsCard'
import data from '@/data/information.json'
import newsData from '@/data/news-mock.json'

import type { NewsArticle } from '@/types/news'

const heroData = data.heroes.news
const articles = newsData as NewsArticle[]

const SEO_TITLE = 'News · Yeast biotech for shrimp and poultry'
const SEO_DESCRIPTION = 'Product certifications, industry insights, and company announcements from our Vietnamese fermentation facilities.'

function formatMasthead(): string {
  if (articles.length === 0) return ''
  const latest = new Date(articles[0].publishedAt)
  const monthYear = latest.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })
  const issue = String(articles.length).padStart(2, '0')
  return `Vol. 1 · Issue ${issue} · ${monthYear}`
}

export function NewsListPage() {
  const masthead = formatMasthead()
  const total = articles.length

  return (
    <>
      <SEO title={SEO_TITLE} description={SEO_DESCRIPTION} />

      {/* Page hero */}
      <section className="border-t border-line-divider">
        <div className="container-x pt-20 pb-12 md:pt-24 md:pb-16">
          <p className="text-eyebrow text-accent-primary">{heroData.eyebrow}</p>
          <h1 className="mt-4 text-display-md text-ink-primary leading-tight">
            {heroData.headlineLine1}
            <br />
            <span className="text-ink-secondary">{heroData.headlineLine2}</span>
          </h1>
          <p className="mt-4 max-w-prose text-body-lg text-ink-secondary">{heroData.description}</p>
        </div>
      </section>

      {/* Articles */}
      <FadeInSection className="border-t border-line-divider">
        <div className="container-x py-16 md:py-24">
          {articles.length > 0 ? (
            <>
              {/* Masthead */}
              <div className="flex items-center justify-between flex-wrap gap-3 pb-6 mb-10 border-b border-line-divider">
                <p className="font-mono text-eyebrow text-ink-tertiary">{masthead}</p>
                <p className="font-mono text-eyebrow text-ink-tertiary">
                  {String(total).padStart(2, '0')} {total === 1 ? 'article' : 'articles'}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                {articles.map((article, i) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    articleNumber={total - i}
                    isLatest={i === 0}
                  />
                ))}
              </div>
            </>
          ) : (
            <EmptyState
              icon={Newspaper}
              title="No news yet."
              description="Check back soon for product certifications, industry insights, and company announcements."
            />
          )}
        </div>
      </FadeInSection>
    </>
  )
}
