import { Link, useSearchParams } from 'react-router-dom'

import { FadeInSection } from '@/components/common/FadeInSection'
import { SEO } from '@/components/common/SEO'
import { CtaPanelLayout } from '@/sections/contact/CtaPanelLayout'
import { DatasheetPanel } from '@/sections/contact/panels/DatasheetPanel'
import { DatasheetForm } from '@/sections/contact/forms/DatasheetForm'
import data from '@/data/information.json'

import type { Product } from '@/types/information'

const products = data.products as Product[]

const SEO_TITLE = 'Request datasheet · Yeast biotech'
const SEO_DESCRIPTION =
  'Get the full technical datasheet pack — TDS, COA, and MSDS — covering composition, microbiology, heavy metals, dosage, and regulatory compliance.'

export function RequestDatasheetPage() {
  const [searchParams] = useSearchParams()
  const slug = searchParams.get('product') ?? ''
  const product = products.find(p => p.slug === slug)

  if (!product) {
    return (
      <>
        <SEO title={SEO_TITLE} description={SEO_DESCRIPTION} />
        <section className="border-t border-line-divider">
          <div className="container-x py-24 md:py-32 text-center">
            <p className="text-eyebrow text-ink-tertiary">DATASHEET REQUEST</p>
            <h1 className="mt-4 text-display-md text-ink-primary">Choose a product first.</h1>
            <p className="mt-4 text-body-lg text-ink-secondary max-w-prose mx-auto">
              Browse our catalogue and request the datasheet pack for the product you'd like to review.
            </p>
            <Link
              to="/products"
              className="mt-8 inline-block text-body-sm font-medium text-accent-primary border-b border-accent-primary pb-0.5 hover:text-accent-hover hover:border-accent-hover transition-colors duration-200"
            >
              Browse products →
            </Link>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <SEO
        title={`Request datasheet for ${product.name} · Yeast biotech`}
        description={SEO_DESCRIPTION}
      />

      {/* Breadcrumb */}
      <nav className="border-t border-line-divider">
        <div className="container-x py-4">
          <div className="flex items-center gap-2 text-caption">
            <Link to="/" className="text-accent-primary hover:underline">Home</Link>
            <span className="text-line-mid">/</span>
            <Link to="/products" className="text-accent-primary hover:underline">Products</Link>
            <span className="text-line-mid">/</span>
            <Link to={`/products/${product.slug}`} className="text-accent-primary hover:underline">
              {product.name}
            </Link>
            <span className="text-line-mid">/</span>
            <span className="text-ink-secondary">Request datasheet</span>
          </div>
        </div>
      </nav>

      {/* Page header */}
      <section className="border-t border-line-divider">
        <div className="container-x pt-16 pb-8 md:pt-20 md:pb-12">
          <p className="text-eyebrow text-accent-primary">DATASHEET REQUEST</p>
          <h1 className="mt-4 text-display-md text-ink-primary leading-tight">
            Technical datasheet pack.
          </h1>
          <p className="mt-4 max-w-prose text-body-lg text-ink-secondary">
            Get the complete documentation set for {product.name} — TDS, COA, and MSDS.
            Free 1-page summary available without a form.
          </p>
        </div>
      </section>

      {/* Panel + Form */}
      <FadeInSection className="border-t border-line-divider">
        <div className="container-x py-12 md:py-16">
          <CtaPanelLayout
            left={<DatasheetPanel product={product} />}
            right={<DatasheetForm product={product} />}
          />
        </div>
      </FadeInSection>
    </>
  )
}
