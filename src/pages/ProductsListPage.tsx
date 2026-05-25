import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import clsx from 'clsx'

import { FadeInSection } from '@/components/common/FadeInSection'
import { SEO } from '@/components/common/SEO'
import { EmptyState } from '@/components/ui/EmptyState'
import { ProductCard } from '@/components/ui/ProductCard'
import { SpeciesFilterChip } from '@/components/ui/SpeciesFilterChip'
import data from '@/data/information.json'
import { formatCopy } from '@/lib/formatCopy'

import type { Product } from '@/types/information'

const products = data.products as Product[]
const species = data.species.items
const categories = data.productCategories.items
const certifications = data.certifications.items
const heroData = data.heroes.products

type SectionConfig = Readonly<{
  id: string
  eyebrow: string
  name: string
  intro: string
  categoryIds: ReadonlyArray<string>
  certIds: ReadonlyArray<string>
}>

const SECTIONS: ReadonlyArray<SectionConfig> = [
  {
    id: 'animal-nutrition',
    eyebrow: 'Section 001',
    name: 'Animal nutrition',
    intro: 'Yeast-derived additives for shrimp and poultry — gut health, immunity, organic minerals, and digestible protein.',
    categoryIds: ['animal-nutrition'],
    certIds: ['iso-9001', 'gmp-plus'],
  },
  {
    id: 'food',
    eyebrow: 'Section 002',
    name: 'Food ingredients',
    intro: 'Natural savoury yeast extracts and premium I+G / kokumi specialty — for soups, plant-based meat, gourmet seasoning, and vegan dairy.',
    categoryIds: ['food-ingredient', 'food-premium'],
    certIds: ['iso-22000', 'brc', 'halal', 'kosher'],
  },
  {
    id: 'industrial',
    eyebrow: 'Section 003',
    name: 'Industrial fermentation',
    intro: 'Pharma-grade yeast extracts for antibiotic, vaccine, enzyme, and recombinant protein production — sustained-release and fast-acting options.',
    categoryIds: ['industrial'],
    certIds: ['iso-22000', 'brc', 'halal', 'kosher'],
  },
]

const chipBase =
  'px-4 py-2 text-body-sm font-medium transition-colors duration-200'
const chipActive = 'bg-ink-primary text-surface-white'
const chipInactive =
  'border border-line-mid text-ink-secondary hover:border-ink-primary hover:text-ink-primary'

function getCertCodes(ids: ReadonlyArray<string>): string {
  return ids
    .map(id => certifications.find(c => c.id === id)?.code)
    .filter((c): c is string => Boolean(c))
    .join(' · ')
}

export function ProductsListPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category')
  const activeSpecies = searchParams.get('species')

  let filteredProducts: Product[] = products
  if (activeCategory) {
    filteredProducts = filteredProducts.filter(p => p.category === activeCategory)
  }
  if (activeSpecies) {
    filteredProducts = filteredProducts.filter(p =>
      (p.primaryFor as ReadonlyArray<string>).includes(activeSpecies),
    )
  }

  function handleCategorySelect(categoryId: string | null) {
    const params = new URLSearchParams(searchParams)
    if (categoryId === null) {
      params.delete('category')
      params.delete('species')
    } else {
      params.set('category', categoryId)
      if (categoryId !== 'animal-nutrition') params.delete('species')
    }
    setSearchParams(params)
  }

  function handleSpeciesSelect(speciesId: string | null) {
    const params = new URLSearchParams(searchParams)
    if (speciesId === null) {
      params.delete('species')
    } else {
      params.set('species', speciesId)
    }
    setSearchParams(params)
  }

  const showSpeciesFilter = activeCategory === 'animal-nutrition'

  const activeCategoryLabel = activeCategory
    ? categories.find(c => c.id === activeCategory)?.name ?? 'All'
    : 'All categories'

  return (
    <>
      <SEO
        title={data.seo.products.title}
        description={data.seo.products.description}
        ogImage={data.seo.products.ogImage}
      />

      {/* Page hero */}
      <section className="border-t border-line-divider">
        <div className="container-x pt-20 pb-12 md:pt-24 md:pb-16">
          <p className="text-eyebrow text-accent-primary">{heroData.eyebrow}</p>
          <h1 className="mt-4 text-display-md text-ink-primary">{formatCopy(heroData.headlineLine1)}</h1>
          <p className="mt-4 text-body-lg text-ink-secondary max-w-prose">{formatCopy(heroData.description)}</p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="border-t border-line-divider">
        <div className="container-x py-10 md:py-12">

          {/* Catalogue masthead */}
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-8 bg-line-mid" aria-hidden="true" />
            <p className="font-mono text-eyebrow text-ink-tertiary">
              Yeast catalogue · {String(products.length).padStart(2, '0')} products
            </p>
            <span className="h-px flex-1 bg-line-mid" aria-hidden="true" />
          </div>

          {/* Category filter row */}
          <div>
            <p className="font-mono text-eyebrow text-ink-tertiary mb-3">Category</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleCategorySelect(null)}
                className={clsx(chipBase, activeCategory === null ? chipActive : chipInactive)}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.id)}
                  className={clsx(chipBase, activeCategory === cat.id ? chipActive : chipInactive)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Species filter — only when animal-nutrition selected */}
          {showSpeciesFilter && (
            <div className="mt-6">
              <p className="font-mono text-eyebrow text-ink-tertiary mb-3">Species</p>
              <SpeciesFilterChip
                species={species}
                activeSpecies={activeSpecies}
                onSelect={handleSpeciesSelect}
              />
            </div>
          )}

          {/* Result count */}
          <div className="flex flex-wrap items-center justify-end gap-4 mt-6 pt-4 border-t border-line-hair">
            <p className="font-mono text-eyebrow text-ink-tertiary">
              {String(filteredProducts.length).padStart(2, '0')} / {String(products.length).padStart(2, '0')} Products
              <span className="mx-2 text-line-mid">·</span>
              {activeCategoryLabel}
              {activeSpecies && (
                <>
                  <span className="mx-2 text-line-mid">·</span>
                  {species.find(s => s.id === activeSpecies)?.label}
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Empty state when nothing matches */}
      {filteredProducts.length === 0 && (
        <section className="border-t border-line-divider">
          <div className="container-x py-20">
            <EmptyState
              icon={SlidersHorizontal}
              title="No products match your filters."
              description="Try a different category or species, or reset to view all products."
              actionLabel="Reset filters"
              onAction={() => handleCategorySelect(null)}
            />
          </div>
        </section>
      )}

      {/* Sections — render only when at least one matching product */}
      {SECTIONS.map(section => {
        const productsInSection = filteredProducts.filter(p =>
          section.categoryIds.includes(p.category),
        )
        if (productsInSection.length === 0) return null

        const certLine = getCertCodes(section.certIds)

        return (
          <FadeInSection key={section.id} className="border-t border-line-divider">
            <div className="container-x py-16 md:py-24">

              {/* Section header */}
              <header className="mb-12 md:mb-16">
                <p className="font-mono text-eyebrow text-accent-primary">{section.eyebrow}</p>
                <h2 className="mt-4 text-h1 text-ink-primary">{section.name}</h2>
                <p className="mt-4 max-w-prose text-body-lg text-ink-secondary">{section.intro}</p>

                {/* Cert banner — dedupe from per-card */}
                {certLine && (
                  <div className="mt-6 pt-4 border-t border-line-hair flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-eyebrow text-ink-tertiary">Certified</span>
                    <span className="font-mono text-caption text-ink-secondary">{certLine}</span>
                  </div>
                )}
              </header>

              {/* Product grid */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                {productsInSection.map(product => {
                  const globalIndex = products.findIndex(p => p.id === product.id) + 1
                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={globalIndex}
                    />
                  )
                })}
              </div>
            </div>
          </FadeInSection>
        )
      })}
    </>
  )
}
