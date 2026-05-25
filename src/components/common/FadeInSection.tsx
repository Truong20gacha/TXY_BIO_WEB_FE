import { motion } from 'framer-motion'

import type { ReactNode } from 'react'

type FadeInSectionProps = Readonly<{
  children: ReactNode
  className?: string
  delay?: number
}>

const EASE_SWISS = [0.4, 0, 0.2, 1] as const
const DURATION_SLOW = 0.8

export function FadeInSection({ children, className, delay = 0 }: FadeInSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION_SLOW, ease: EASE_SWISS, delay }}
      viewport={{ once: true, margin: '-80px' }}
      className={className}
    >
      {children}
    </motion.section>
  )
}
