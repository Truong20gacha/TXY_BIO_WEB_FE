import clsx from 'clsx'

type Position = 'top-right' | 'bottom-left' | 'top-left' | 'bottom-right'

type SectionNumberProps = Readonly<{
  number: string
  position?: Position
  className?: string
}>

const POSITION_CLASSES: Record<Position, string> = {
  'top-right':    'top-0 right-0 md:-top-6 md:-right-4',
  'bottom-left':  'bottom-0 left-0 md:-bottom-12 md:-left-4',
  'top-left':     'top-0 left-0 md:-top-6 md:-left-4',
  'bottom-right': 'bottom-0 right-0 md:-bottom-12 md:-right-4',
}

export function SectionNumber({ number, position = 'top-right', className }: SectionNumberProps) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        'absolute pointer-events-none select-none font-display font-light text-[140px] leading-none text-ink-primary/[0.04] md:text-[240px]',
        POSITION_CLASSES[position],
        className,
      )}
    >
      {number}
    </span>
  )
}
