import type { Specification } from '@/types/information'

type SpecificationListProps = Readonly<{
  specifications: ReadonlyArray<Specification>
}>

export function SpecificationList({ specifications }: SpecificationListProps) {
  return (
    <div>
      <p className="mb-6 text-eyebrow text-ink-tertiary">Specifications</p>
      <dl>
        {specifications.map(spec => (
          <div key={spec.label} className="flex items-baseline gap-3 py-3 border-b border-line-hair">
            <dt className="text-body-sm text-ink-secondary whitespace-nowrap">{spec.label}</dt>
            <span
              className="flex-1 border-b border-dotted border-line-mid mb-1"
              aria-hidden="true"
            />
            <dd className="font-mono text-body-sm font-medium text-ink-primary text-right whitespace-nowrap">
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
