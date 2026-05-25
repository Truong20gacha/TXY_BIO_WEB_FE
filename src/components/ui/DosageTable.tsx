import type { Dosage } from '@/types/information'
import { getSpeciesIcon } from '@/lib/speciesIcon'

type DosageTableProps = Readonly<{
  dosages: ReadonlyArray<Dosage>
}>

export function DosageTable({ dosages }: DosageTableProps) {
  if (dosages.length === 0) return null

  return (
    <div>
      <p className="mb-8 text-eyebrow text-ink-tertiary">Dosage / per tonne of feed</p>

      <div className="grid grid-cols-1 gap-px bg-line-divider border border-line-divider md:grid-cols-3">
        {dosages.map(dosage => {
          const Icon = getSpeciesIcon(dosage.species)
          return (
            <div
              key={dosage.species}
              className="flex flex-col bg-surface-white p-6 md:p-8"
            >
              {Icon && (
                <Icon
                  strokeWidth={1.25}
                  size={32}
                  className="text-ink-tertiary"
                  aria-hidden="true"
                />
              )}
              <p className="mt-6 text-eyebrow text-ink-tertiary">
                {dosage.label.toUpperCase()}
              </p>
              <p className="mt-3 leading-none">
                <span className="font-mono text-[28px] font-medium text-accent-primary">
                  {dosage.value}
                </span>
                <span className="ml-2 text-body-sm text-ink-secondary">
                  {dosage.unit}
                </span>
              </p>
              {dosage.note && (
                <p className="mt-4 pt-4 border-t border-line-hair text-caption leading-relaxed text-ink-tertiary">
                  {dosage.note}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
