import { FadeInSection } from '@/components/common/FadeInSection'
import { ProductCardCompact } from '@/components/ui/ProductCardCompact'
import data from '@/data/information.json'

import type { Product } from '@/types/information'

const ALL_PRODUCTS = data.products as Product[]

const MAX_RELATED = 3

type RelatedProductsProps = Readonly<{
  relatedProductIds: ReadonlyArray<string>
}>

export function RelatedProducts({ relatedProductIds }: RelatedProductsProps) {
  const relatedProducts = relatedProductIds
    .map(id => ALL_PRODUCTS.find(p => p.id === id || p.slug === id))
    .filter((p): p is Product => p !== undefined)
    .slice(0, MAX_RELATED)

  if (relatedProducts.length === 0) return null

  return (
    <FadeInSection className="border-t border-line-divider">
      <div className="container-x py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="text-eyebrow text-ink-tertiary">Related products</p>
          <div className="mt-8 flex flex-col gap-3 md:gap-4">
            {relatedProducts.map((product, index) => (
              <ProductCardCompact
                key={product.id}
                product={product}
                index={index + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </FadeInSection>
  )
}
