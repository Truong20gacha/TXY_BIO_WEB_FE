import { CircleDot, Info } from 'lucide-react'

import { salesPanelDefaults } from '@/data/ctaPanelDefaults'
import { getProductCode } from '@/lib/productCode'

import type { Product } from '@/types/information'

type SalesPanelProps = Readonly<{
  product: Product
}>

export function SalesPanel({ product }: SalesPanelProps) {
  const code = getProductCode(product.slug)
  const { headline, sub, highlights, deliverables, trustStrip, responseSla } = salesPanelDefaults

  return (
    <div className="flex flex-col">
      {/* Pill */}
      <div className="inline-flex w-fit items-center gap-2 border border-line-mid px-3 py-1.5">
        <span className="font-mono text-eyebrow text-accent-primary">{code}</span>
        <span className="text-line-mid" aria-hidden="true">·</span>
        <span className="text-eyebrow text-ink-secondary">{product.name}</span>
      </div>

      {/* Headline + sub */}
      <h2 className="mt-6 text-h2 font-medium text-ink-primary">{headline}</h2>
      <p className="mt-3 text-body-sm text-ink-secondary leading-relaxed">{sub}</p>

      {/* Highlights 2x2 */}
      <div className="mt-8 grid grid-cols-2 gap-px bg-line-divider border border-line-divider">
        {highlights.map(h => (
          <div key={h.label} className="bg-surface-white p-4">
            <p className="text-eyebrow text-ink-tertiary">{h.label.toUpperCase()}</p>
            <p className="mt-2 text-body-sm font-medium text-ink-primary">{h.value}</p>
          </div>
        ))}
      </div>

      {/* You'll receive */}
      <div className="mt-8">
        <p className="text-eyebrow text-ink-tertiary mb-4">YOU'LL RECEIVE</p>
        <ul className="space-y-2">
          {deliverables.map(item => (
            <li key={item} className="flex items-start gap-2 text-body-sm text-ink-secondary">
              <CircleDot size={14} strokeWidth={2} className="mt-1 shrink-0 text-accent-primary" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Trust strip */}
      <div className="mt-8 bg-surface-alt p-4 border-l-2 border-accent-primary">
        <p className="text-caption font-medium text-ink-primary">{trustStrip.line1}</p>
        <p className="mt-1 text-caption text-ink-secondary leading-relaxed">{trustStrip.line2}</p>
      </div>

      {/* Notice info */}
      <div className="mt-6 flex items-start gap-3 border border-accent-primary/20 bg-accent-bg p-4">
        <Info size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-accent-primary" aria-hidden="true" />
        <p className="text-caption text-ink-secondary leading-relaxed">{responseSla}</p>
      </div>
    </div>
  )
}
