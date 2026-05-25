import { Link } from 'react-router-dom'

import type { Dosage, Product } from '@/types/information'
import { getProductCode } from '@/lib/productCode'

type ProductCardProps = Readonly<{
  product: Product
  index: number
}>

const MAX_SPEC_PREVIEW = 3
const MAX_BENEFIT_TAGS = 3

function buildDosagePreview(dosages: ReadonlyArray<Dosage>): string {
  if (dosages.length === 0) return ''
  const first = dosages[0]
  const allSame = dosages.every(d => d.value === first.value && d.unit === first.unit)
  if (allSame) {
    return `${first.value} ${first.unit} · all species`
  }
  const allValues = dosages
    .flatMap(d => d.value.split(/[–-]/).map(v => parseFloat(v)))
    .filter(v => !Number.isNaN(v))
  if (allValues.length === 0) return 'varies by species'
  const min = Math.min(...allValues)
  const max = Math.max(...allValues)
  return min === max
    ? `${min} ${first.unit} · varies by species`
    : `${min}–${max} ${first.unit} · varies by species`
}

export function ProductCard({ product, index }: ProductCardProps) {
  const code = getProductCode(product.slug)
  const eyebrow = `${code}.${String(index).padStart(3, '0')}`
  const keySpecs = product.specifications
    .filter(s => s.label !== 'Appearance')
    .slice(0, MAX_SPEC_PREVIEW)

  const isFeed = product.category === 'animal-nutrition'
  const speciesLabels = product.dosages.map(d => d.label)
  const dosagePreview = buildDosagePreview(product.dosages)

  const extras = product as Product & {
    keyBenefits?: ReadonlyArray<string>
    form?: string
  }
  const benefitTags = (extras.keyBenefits ?? []).slice(0, MAX_BENEFIT_TAGS)
  const form = extras.form

  const angleShot = product.gallery.find(g => g.includes('3d-angle')) ?? null

  return (
    <article className="relative flex flex-col p-6 border border-line-divider hover:bg-surface-alt transition-colors duration-200 md:p-8">

      {angleShot && (
        <img
          src={angleShot}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute top-6 right-6 h-36 w-20 object-contain md:top-8 md:right-8"
        />
      )}

      <p className="font-mono text-eyebrow text-accent-primary">{eyebrow}</p>

      <h3 className="mt-4 text-h3 font-medium text-ink-primary leading-snug pr-28">{product.name}</h3>
      <p className="mt-1 text-body-sm text-ink-secondary pr-28">{product.tagline}</p>
      <p className="mt-3 text-caption text-ink-secondary line-clamp-3 pr-28">{product.shortDescription}</p>

      {keySpecs.length > 0 && (
        <div className="mt-5 pt-4 border-t border-line-hair">
          <p className="font-mono text-eyebrow text-ink-tertiary mb-3">Key composition</p>
          <ul className="space-y-1.5">
            {keySpecs.map(spec => (
              <li
                key={spec.label}
                className="flex items-baseline justify-between gap-2 text-caption"
              >
                <span className="text-ink-secondary">{spec.label}</span>
                <span className="font-mono font-medium text-ink-primary">{spec.value}</span>
              </li>
            ))}
          </ul>
          {isFeed && dosagePreview && (
            <p className="mt-4 flex items-baseline gap-2 text-caption">
              <span className="font-mono text-eyebrow text-ink-tertiary">Dosage</span>
              <span className="font-mono text-ink-secondary">{dosagePreview}</span>
            </p>
          )}
          {!isFeed && form && (
            <p className="mt-4 flex items-baseline gap-2 text-caption">
              <span className="font-mono text-eyebrow text-ink-tertiary">Form</span>
              <span className="font-mono text-ink-secondary">{form}</span>
            </p>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-5">
        {isFeed
          ? speciesLabels.map(label => (
              <span key={label} className="px-2 py-1 text-eyebrow text-ink-secondary border border-line-mid">
                {label.toUpperCase()}
              </span>
            ))
          : benefitTags.map(tag => (
              <span key={tag} className="px-2 py-1 text-eyebrow text-ink-secondary border border-line-mid">
                {tag.toUpperCase()}
              </span>
            ))}
      </div>
      <Link
        to={`/products/${product.slug}`}
        className="mt-6 self-start text-body-sm font-medium text-accent-primary border-b border-accent-primary pb-0.5 hover:text-accent-hover hover:border-accent-hover transition-colors duration-200"
      >
        View product →
      </Link>
    </article>
  )
}
