import { Helmet } from 'react-helmet-async'

import { formatCopy } from '@/lib/formatCopy'

const SITE_NAME = 'TXYbio'

type SEOProps = Readonly<{
  title: string
  description?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'product'
}>

export function SEO({ title, description, ogImage, ogType = 'website' }: SEOProps) {
  const resolvedTitle = formatCopy(title)
  const resolvedDescription = description ? formatCopy(description) : undefined
  const fullTitle = resolvedTitle.includes(SITE_NAME) ? resolvedTitle : `${resolvedTitle} · ${SITE_NAME}`
  return (
    <Helmet>
      <title>{fullTitle}</title>
      {resolvedDescription && <meta name="description" content={resolvedDescription} />}

      <meta property="og:title" content={fullTitle} />
      {resolvedDescription && <meta property="og:description" content={resolvedDescription} />}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      <meta name="twitter:card" content={ogImage ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      {resolvedDescription && <meta name="twitter:description" content={resolvedDescription} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Helmet>
  )
}
