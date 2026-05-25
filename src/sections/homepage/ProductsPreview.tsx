import { Link } from 'react-router-dom'

import { FadeInSection } from '@/components/common/FadeInSection'
import { ProductCard } from '@/components/ui/ProductCard'
import data from '@/data/information.json'
import { formatCopy } from '@/lib/formatCopy'

import type { Product } from '@/types/information'

const products = data.products as Product[]
const heroData = data.heroes.products

export function ProductsPreview() {
  return (
    <FadeInSection className="border-t border-line-divider">
      <div className="container-x py-32 md:py-48">

        <div className="flex items-baseline justify-between flex-wrap gap-4">
          <p className="text-eyebrow text-accent-primary">003 / Products</p>
          <Link
            to="/products"
            className="text-body-sm font-medium text-accent-primary border-b border-accent-primary pb-0.5 hover:text-accent-hover hover:border-accent-hover transition-colors duration-200"
          >
            View all products →
          </Link>
        </div>

        <h2 className="mt-6 text-display-lg text-ink-primary leading-tight">
          {formatCopy(heroData.headlineLine1)}
          <br />
          <span className="text-ink-secondary">{formatCopy(heroData.headlineLine2)}</span>
        </h2>
        <p className="mt-6 max-w-prose text-body-lg text-ink-secondary">
          {formatCopy(heroData.description)}
        </p>

        <div className="grid grid-cols-1 gap-4 mt-16 md:grid-cols-2 md:gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index + 1} />
          ))}
        </div>

      </div>
    </FadeInSection>
  )
}
