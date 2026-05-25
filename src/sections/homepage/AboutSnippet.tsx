import { Link } from 'react-router-dom'

import { FadeInSection } from '@/components/common/FadeInSection'
import data from '@/data/information.json'

const STAT_IDS = ['established', 'facilities', 'employees', 'countries']

export function AboutSnippet() {
  const stats = data.stats.items.filter(s => STAT_IDS.includes(s.id))

  return (
    <FadeInSection className="border-t border-line-divider">
      <div className="container-x py-32 md:py-48">
        <p className="text-eyebrow text-accent-primary">002 / COMPANY</p>
        <h2 className="mt-6">
          <span className="block text-display-lg text-ink-primary">Vietnamese biotech.</span>
          <span className="block text-display-lg text-ink-secondary">Australian standards.</span>
        </h2>
        <div className="grid grid-cols-2 gap-8 mt-16 md:grid-cols-4">
          {stats.map(stat => (
            <div key={stat.id} className="pt-4 border-t border-line-hair">
              <p className="font-mono text-[40px] leading-none font-medium text-accent-primary">
                {stat.value}
              </p>
              <p className="mt-2 text-eyebrow text-ink-tertiary">{stat.label}</p>
            </div>
          ))}
        </div>
        <Link
          to="/about"
          className="inline-block mt-12 text-body-sm font-medium text-accent-primary border-b border-accent-primary pb-0.5 hover:text-accent-hover hover:border-accent-hover transition-colors duration-200"
        >
          Learn more about us →
        </Link>
      </div>
    </FadeInSection>
  )
}
