import { FadeInSection } from '@/components/common/FadeInSection'

type MarqueeBandProps = Readonly<{
  text: string
  eyebrow?: string
}>

export function MarqueeBand({ text, eyebrow }: MarqueeBandProps) {
  return (
    <FadeInSection className="border-t border-line-divider bg-surface-alt overflow-hidden">
      <div className="container-x py-16 md:py-24">
        {eyebrow && (
          <p className="mb-6 text-eyebrow text-accent-primary">{eyebrow}</p>
        )}
        <p className="font-display font-light text-[44px] leading-[1.05] text-ink-primary tracking-tight md:text-[88px]">
          {text}
        </p>
      </div>
    </FadeInSection>
  )
}
