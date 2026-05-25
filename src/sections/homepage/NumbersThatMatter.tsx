import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

import { FadeInSection } from '@/components/common/FadeInSection'
import data from '@/data/homepage.json'

import type { StatItem } from '@/types/homepage'

const ANIMATION_DURATION_MS = 1200
const EASE_SWISS = [0.4, 0, 0.2, 1] as const

const { eyebrow, items } = data.stats

type AnimatedNumberProps = Readonly<{
  to: number
  suffix?: string | null
  isYear?: boolean
}>

function AnimatedNumber({ to, suffix, isYear = false }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState<string>('0')

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, to, {
      duration: ANIMATION_DURATION_MS / 1000,
      ease: EASE_SWISS as unknown as [number, number, number, number],
      onUpdate(latest) {
        const rounded = Math.round(latest)
        const base = isYear ? String(rounded) : rounded.toLocaleString('en-US')
        setDisplay(suffix ? `${base}${suffix}` : base)
      },
    })
    return () => controls.stop()
  }, [isInView, to, isYear, suffix])

  return <span ref={ref}>{display}</span>
}

type StatCardProps = Readonly<{ stat: StatItem }>

function StatCard({ stat }: StatCardProps) {
  return (
    <div className="flex flex-col items-start pt-4 border-t border-line-hair">
      <span className="block font-mono text-[40px] leading-none font-medium text-accent-primary md:text-[56px]">
        <AnimatedNumber to={stat.value} suffix={stat.suffix} isYear={stat.isYear} />
      </span>
      <span className="mt-3 block text-eyebrow text-ink-tertiary">
        {stat.label.toUpperCase()}
      </span>
    </div>
  )
}

export function NumbersThatMatter() {
  return (
    <FadeInSection className="border-t border-line-divider">
      <div className="container-x py-32 md:py-48">
        <p className="text-eyebrow text-accent-primary">{eyebrow}</p>
        <h2 className="mt-6 text-display-md text-ink-primary leading-tight max-w-prose">
          The numbers that built our work.
        </h2>

        <div className="grid grid-cols-2 gap-8 mt-12 md:grid-cols-3 lg:grid-cols-6 md:gap-6">
          {items.map(stat => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </FadeInSection>
  )
}
