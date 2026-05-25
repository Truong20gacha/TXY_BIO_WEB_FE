import { Link } from 'react-router-dom'

import type { Dosage, Product } from '@/types/information'
import { getProductCode } from '@/lib/productCode'

function compactDosage(dosages: ReadonlyArray<Dosage>): string {
  if (dosages.length === 0) return ''
  const first = dosages[0]
  const allSame = dosages.every(d => d.value === first.value && d.unit === first.unit)
  if (allSame) return `${first.value} ${first.unit}`
  const allValues = dosages
    .flatMap(d => d.value.split(/[–-]/).map(v => parseFloat(v)))
    .filter(v => !Number.isNaN(v))
  if (allValues.length === 0) return first.unit
  const min = Math.min(...allValues)
  const max = Math.max(...allValues)
  return min === max ? `${min} ${first.unit}` : `${min}–${max} ${first.unit}`
}

type ProductCardCompactProps = Readonly<{
  product: Product
  index: number
}>

export function ProductCardCompact({ product, index }: ProductCardCompactProps) {
  const code = getProductCode(product.slug)
  const eyebrow = `${code}.${String(index).padStart(3, '0')}`
  const dosagePreview = compactDosage(product.dosages)
  const meta = dosagePreview ? `${eyebrow} · ${dosagePreview}` : eyebrow

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group flex items-stretch border border-line-divider hover:bg-surface-alt transition-colors duration-200"
    >
      {/* Thumb */}
      <div className="relative aspect-square w-[100px] flex-shrink-0 bg-surface-alt md:w-[120px]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain p-3"
        />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between py-4 px-5 md:py-5 md:px-6 min-w-0">
        <div className="min-w-0">
          <p className="font-mono text-eyebrow text-accent-primary truncate">{meta}</p>
          <h3 className="mt-2 text-body-lg font-medium text-ink-primary leading-snug line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-1 text-caption text-ink-secondary line-clamp-2">
            {product.shortDescription}
          </p>
        </div>
        <span className="self-end mt-3 text-caption font-medium text-accent-primary group-hover:text-accent-hover transition-colors duration-200">
          View product →
        </span>
      </div>
    </Link>
  )
}
