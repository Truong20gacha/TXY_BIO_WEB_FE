import { Check, ShieldCheck } from 'lucide-react'

import { samplePanelDefaults } from '@/data/ctaPanelDefaults'
import { getProductCode } from '@/lib/productCode'

import type { Product } from '@/types/information'

type SamplePanelProps = Readonly<{
  product: Product
}>

export function SamplePanel({ product }: SamplePanelProps) {
  const code = getProductCode(product.slug)
  const { headline, sub, highlights, documents, nextSteps, restrictedNote } = samplePanelDefaults

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

      {/* Documents included */}
      <div className="mt-8">
        <p className="text-eyebrow text-ink-tertiary mb-4">DOCUMENTS INCLUDED</p>
        <ul className="space-y-2">
          {documents.map(doc => (
            <li key={doc} className="flex items-start gap-2 text-body-sm text-ink-secondary">
              <Check size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
              <span>{doc}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Next steps */}
      <div className="mt-8">
        <p className="text-eyebrow text-ink-tertiary mb-4">NEXT STEPS</p>
        <ol className="space-y-3">
          {nextSteps.map((step, i) => (
            <li key={step} className="flex items-start gap-3 text-body-sm text-ink-secondary">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-accent-bg font-mono text-caption text-accent-primary">
                {i + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Notice amber */}
      <div className="mt-8 flex items-start gap-3 border border-warning/30 bg-warning/5 p-4">
        <ShieldCheck size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-warning" aria-hidden="true" />
        <p className="text-caption text-ink-secondary leading-relaxed">{restrictedNote}</p>
      </div>
    </div>
  )
}
