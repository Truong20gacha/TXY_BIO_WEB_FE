import { Link, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { FadeInSection } from '@/components/common/FadeInSection'
import { SEO } from '@/components/common/SEO'
import { DosageTable } from '@/components/ui/DosageTable'
import { SpecificationList } from '@/components/ui/SpecificationList'
import { CompositionDonut } from '@/components/ui/CompositionDonut'
import { ModeOfActionDiagram } from '@/components/ui/ModeOfActionDiagram'
import { CertificationBadges } from '@/components/ui/CertificationBadges'
import { ZoomableImage } from '@/components/ui/ZoomableImage'
import { RelatedProducts } from '@/sections/product/RelatedProducts'
import { getFunctionIcon } from '@/lib/functionIcon'
import { getSpeciesIcon } from '@/lib/speciesIcon'
import { getProductCode } from '@/lib/productCode'
import data from '@/data/information.json'

import type { Product } from '@/types/information'

const products = data.products as Product[]

const DATASHEETS_READY: boolean = false
const IMAGES_READY: boolean = true

const MAX_FUNCTIONS_PREVIEW = 4

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()

  const product = products.find(p => p.slug === slug)

  if (!product) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center">
        <p className="text-eyebrow text-ink-tertiary">404 / NOT FOUND</p>
        <h1 className="mt-4 text-display-md text-ink-primary">Product not found.</h1>
        <Link
          to="/products"
          className="mt-8 text-body-sm font-medium text-accent-primary border-b border-accent-primary pb-0.5 hover:text-accent-hover hover:border-accent-hover transition-colors duration-200"
        >
          ← Back to products
        </Link>
      </div>
    )
  }

  const productIndex = products.findIndex(p => p.slug === product.slug) + 1
  const productCode = getProductCode(product.slug)

  return (
    <>
      <SEO
        title={`${product.name} · Yeast biotech for shrimp and poultry`}
        description={product.shortDescription}
        ogType="product"
      />

      {/* Breadcrumb */}
      <nav className="border-t border-line-divider">
        <div className="container-x py-4">
          <div className="flex items-center gap-2 text-caption">
            <Link to="/" className="text-accent-primary hover:underline">Home</Link>
            <span className="text-line-mid">/</span>
            <Link to="/products" className="text-accent-primary hover:underline">Products</Link>
            <span className="text-line-mid">/</span>
            <span className="text-ink-secondary">{product.name}</span>
          </div>
        </div>
      </nav>

      {/* Hero: 2-column */}
      <section className="border-t border-line-divider">
        <div className="container-x py-16 md:py-24">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">

            {/* Gallery */}
            {IMAGES_READY ? (
              (() => {
                const slides = product.gallery.length > 0 ? product.gallery : [product.image]
                const multi = slides.length > 1
                return (
                  <div className="relative aspect-[3/4] overflow-hidden bg-surface-alt">
                    {multi ? (
                      <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        simulateTouch={false}
                        className="absolute inset-0 h-full w-full"
                      >
                        {slides.map((src, i) => (
                          <SwiperSlide key={src}>
                            <ZoomableImage
                              src={src}
                              alt={`${product.name} — view ${i + 1}`}
                              loading={i === 0 ? 'eager' : 'lazy'}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    ) : (
                      <div className="absolute inset-0 h-full w-full">
                        <ZoomableImage
                          src={slides[0]}
                          alt={product.name}
                          loading="eager"
                        />
                      </div>
                    )}
                  </div>
                )
              })()
            ) : (
              <div className="relative aspect-[3/4] overflow-hidden bg-surface-alt border border-line-divider">
                <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center select-none">
                  <span className="font-display font-light text-[64px] leading-none text-ink-primary/15 md:text-[100px]">
                    {productCode}
                  </span>
                  <span className="mt-2 font-mono text-caption text-ink-tertiary">
                    {product.slug} · #{String(productIndex).padStart(3, '0')}
                  </span>
                  <div className="mt-10 flex items-center gap-3">
                    <span className="h-px w-8 bg-line-mid" aria-hidden="true" />
                    <span className="text-eyebrow text-ink-tertiary whitespace-nowrap">
                      Specimen photography pending
                    </span>
                    <span className="h-px w-8 bg-line-mid" aria-hidden="true" />
                  </div>
                </div>
              </div>
            )}

            {/* Info */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center justify-between gap-4">
                <p className="text-eyebrow text-accent-primary">{product.tagline.toUpperCase()}</p>
                <p className="font-mono text-eyebrow text-ink-tertiary">
                  {productCode}.{String(productIndex).padStart(3, '0')}
                </p>
              </div>
              <h1 className="mt-4 text-display-md text-ink-primary">{product.name}</h1>
              <p className="mt-4 text-body-lg text-ink-secondary">{product.shortDescription}</p>

              <div className="flex flex-wrap gap-2 mt-6">
                {product.dosages.map(d => {
                  const Icon = getSpeciesIcon(d.species)
                  return (
                    <span
                      key={d.species}
                      className="inline-flex items-center gap-1.5 border border-line-mid px-3 py-1.5 text-eyebrow text-ink-secondary"
                    >
                      {Icon && (
                        <Icon
                          strokeWidth={1.25}
                          size={14}
                          className="text-ink-tertiary"
                          aria-hidden="true"
                        />
                      )}
                      {d.label.toUpperCase()}
                    </span>
                  )
                })}
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                {/* Primary: Request a sample (free trial — highest B2B intent) */}
                <Link
                  to={`/request-sample?product=${product.slug}`}
                  className="bg-accent-primary px-6 py-3 text-body-sm font-medium text-surface-white hover:bg-accent-hover transition-colors duration-200"
                >
                  Request a sample
                </Link>

                {/* Secondary: Talk to sales / quote */}
                <Link
                  to={`/request-quote?product=${product.slug}`}
                  className="border border-ink-primary px-6 py-3 text-body-sm font-medium text-ink-primary hover:bg-surface-alt transition-colors duration-200"
                >
                  Talk to sales
                </Link>

                {/* Tertiary: Datasheet (ghost link — when PDFs ready, direct download; else request) */}
                {DATASHEETS_READY ? (
                  <a
                    href={product.datasheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-sm font-medium text-accent-primary border-b border-accent-primary pb-0.5 hover:text-accent-hover hover:border-accent-hover transition-colors duration-200"
                  >
                    Download datasheet ↓
                  </a>
                ) : (
                  <Link
                    to={`/request-datasheet?product=${product.slug}`}
                    title="Technical datasheet pack — TDS, COA, MSDS"
                    className="text-body-sm font-medium text-ink-secondary border-b border-line-mid pb-0.5 hover:text-ink-primary hover:border-ink-primary transition-colors duration-200"
                  >
                    Request datasheet →
                  </Link>
                )}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Key functions tiles */}
      {product.functions.length > 0 && (
        <FadeInSection className="border-t border-line-divider bg-surface-alt">
          <div className="container-x py-16 md:py-24">
            <div className="flex items-center gap-3 mb-10">
              <span className="h-px w-8 bg-line-mid" aria-hidden="true" />
              <p className="text-eyebrow text-ink-tertiary">Key functions</p>
              <span className="h-px flex-1 bg-line-mid" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {product.functions.slice(0, MAX_FUNCTIONS_PREVIEW).map((fn, i) => {
                const Icon = getFunctionIcon(fn)
                return (
                  <div
                    key={fn}
                    className="bg-surface-white border border-line-divider p-6 md:p-8"
                  >
                    <Icon
                      strokeWidth={1.25}
                      size={32}
                      className="text-ink-tertiary"
                      aria-hidden="true"
                    />
                    <p className="mt-6 font-mono text-eyebrow text-accent-primary">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <p className="mt-3 text-body-sm leading-relaxed text-ink-primary">
                      {fn}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </FadeInSection>
      )}

      {/* Description section */}
      <FadeInSection className="border-t border-line-divider">
        <div className="container-x py-16 md:py-24 max-w-[960px]">
          <p className="mb-8 text-eyebrow text-ink-tertiary">Description</p>
          <p className="text-body-lg text-ink-secondary leading-relaxed">
            {product.fullDescription}
          </p>

          {/* Packaging + Shelf life — under description */}
          <div className="mt-12 grid grid-cols-2 gap-6 border-t border-line-hair pt-8">
            <div>
              <p className="text-eyebrow text-ink-tertiary">Packaging</p>
              <p className="mt-2 text-body-sm text-ink-secondary">{product.packaging}</p>
            </div>
            <div>
              <p className="text-eyebrow text-ink-tertiary">Shelf life</p>
              <p className="mt-2 text-body-sm text-ink-secondary">{product.shelfLife}</p>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Mode of action section */}
      {(() => {
        const moa = (product as typeof product & {
          modeOfAction?: { steps: ReadonlyArray<{ title: string; body: string }> }
        }).modeOfAction
        if (!moa || moa.steps.length === 0) return null
        return (
          <FadeInSection className="border-t border-line-divider bg-surface-alt">
            <div className="container-x py-16 md:py-24 max-w-3xl">
              <ModeOfActionDiagram steps={moa.steps} />
            </div>
          </FadeInSection>
        )
      })()}

      {/* Dosage section */}
      {product.dosages.length > 0 && (
        <FadeInSection className="border-t border-line-divider">
          <div className="container-x py-16 md:py-24 max-w-[960px]">
            <DosageTable dosages={product.dosages} />
          </div>
        </FadeInSection>
      )}

      {/* Specifications section — emphasized on surface-alt (datasheet feature) */}
      <FadeInSection className="border-t border-line-divider bg-surface-alt">
        <div className="container-x py-16 md:py-24 max-w-[960px]">
          {(() => {
            const composition = (product as typeof product & {
              composition?: ReadonlyArray<{ label: string; value: number }>
            }).composition
            if (composition && composition.length > 0) {
              return (
                <div className="grid grid-cols-1 gap-12 md:grid-cols-[220px_1fr] md:gap-16 md:items-start">
                  <div>
                    <p className="mb-6 text-eyebrow text-ink-tertiary">Composition</p>
                    <CompositionDonut slices={composition} />
                  </div>
                  <div>
                    <SpecificationList specifications={product.specifications} />
                  </div>
                </div>
              )
            }
            return <SpecificationList specifications={product.specifications} />
          })()}
        </div>
      </FadeInSection>

      {/* Certifications + Storage section — combined */}
      <FadeInSection className="border-t border-line-divider">
        <div className="container-x py-16 md:py-24 max-w-[960px]">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <p className="mb-6 text-eyebrow text-ink-tertiary">Certifications</p>
              <CertificationBadges certificationIds={product.certifications} />
            </div>
            <div>
              <p className="mb-4 text-eyebrow text-ink-tertiary">Storage instructions</p>
              <p className="text-body-lg text-ink-secondary">{product.storage}</p>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Related products */}
      <RelatedProducts relatedProductIds={product.relatedProducts} />
    </>
  )
}
