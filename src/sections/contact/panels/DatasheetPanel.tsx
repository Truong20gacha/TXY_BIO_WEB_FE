import { ClipboardCheck, FileText, Lock, Download } from 'lucide-react'

import { datasheetPanelDefaults } from '@/data/ctaPanelDefaults'
import { getProductCode } from '@/lib/productCode'

import type { Product } from '@/types/information'

type DatasheetPanelProps = Readonly<{
  product: Product
}>

export function DatasheetPanel({ product }: DatasheetPanelProps) {
  const code = getProductCode(product.slug)
  const { headline, sub, gatedFiles, publicFile, contents, confidentialityNote } = datasheetPanelDefaults

  const publicUrl = `/datasheets/${product.slug}/${publicFile.key}.pdf`

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

      {/* Gated file pack */}
      <div className="mt-8">
        <p className="text-eyebrow text-ink-tertiary mb-4">FULL PACK (FORM REQUIRED)</p>
        <ul className="space-y-3">
          {gatedFiles.map(file => (
            <li
              key={file.key}
              className="flex items-start gap-3 border border-line-divider p-4"
            >
              <FileText size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-ink-tertiary" aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <p className="text-body-sm font-medium text-ink-primary">{file.label}</p>
                <p className="mt-1 text-caption text-ink-secondary">{file.description}</p>
                <p className="mt-2 font-mono text-eyebrow text-ink-tertiary">
                  {file.pages.toUpperCase()} · {file.size.toUpperCase()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Public summary download */}
      <div className="mt-8">
        <p className="text-eyebrow text-ink-tertiary mb-4">FREE SUMMARY (NO FORM)</p>
        <div className="flex items-center gap-3 border border-line-divider bg-surface-alt p-4">
          <FileText size={20} strokeWidth={1.5} className="shrink-0 text-accent-primary" aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <p className="text-body-sm font-medium text-ink-primary">{publicFile.label}</p>
            <p className="mt-1 text-caption text-ink-secondary">{publicFile.description}</p>
          </div>
          <a
            href={publicUrl}
            download
            className="inline-flex items-center gap-1.5 bg-accent-primary px-3 py-2 text-caption font-medium text-surface-white hover:bg-accent-hover transition-colors duration-200"
          >
            <Download size={14} strokeWidth={1.75} aria-hidden="true" />
            Download
          </a>
        </div>
      </div>

      {/* Inside this pack */}
      <div className="mt-8">
        <p className="text-eyebrow text-ink-tertiary mb-4">INSIDE THE FULL PACK</p>
        <ul className="space-y-2">
          {contents.map(item => (
            <li key={item} className="flex items-start gap-2 text-body-sm text-ink-secondary">
              <ClipboardCheck size={14} strokeWidth={2} className="mt-1 shrink-0 text-warning" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Confidentiality notice */}
      <div className="mt-8 flex items-start gap-3 border border-warning/30 bg-warning/5 p-4">
        <Lock size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-warning" aria-hidden="true" />
        <p className="text-caption text-ink-secondary leading-relaxed">{confidentialityNote}</p>
      </div>
    </div>
  )
}
