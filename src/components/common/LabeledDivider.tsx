import { FadeInSection } from '@/components/common/FadeInSection'

type LabeledDividerProps = Readonly<{
  label: string
}>

export function LabeledDivider({ label }: LabeledDividerProps) {
  return (
    <FadeInSection className="border-t border-line-divider">
      <div className="container-x py-6 md:py-8">
        <div className="flex items-center gap-4">
          <span className="h-px flex-1 bg-line-mid" aria-hidden="true" />
          <p className="text-eyebrow text-ink-tertiary whitespace-nowrap">{label}</p>
          <span className="h-px flex-1 bg-line-mid" aria-hidden="true" />
        </div>
      </div>
    </FadeInSection>
  )
}
