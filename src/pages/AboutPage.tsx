import { FadeInSection } from '@/components/common/FadeInSection'
import { SEO } from '@/components/common/SEO'
import { SectionNumber } from '@/components/common/SectionNumber'
import data from '@/data/information.json'

const heroData = data.heroes.about
const seo = data.seo.about
const { company, mission } = data
const stats = data.stats.items
const principles = data.corePrinciples.items
const honors = data.honors.items

export function AboutPage() {
  return (
    <>
      <SEO title={seo.title} description={seo.description} ogImage={seo.ogImage} />

      {/* Page hero */}
      <section className="border-t border-line-divider">
        <div className="container-x pt-20 pb-12 md:pt-24 md:pb-16">
          <p className="text-eyebrow text-accent-primary">{heroData.eyebrow}</p>
          <h1 className="mt-4 text-display-md text-ink-primary leading-tight">
            {heroData.headlineLine1}
            <br />
            <span className="text-ink-secondary">{heroData.headlineLine2}</span>
          </h1>
          <p className="mt-4 max-w-prose text-body-lg text-ink-secondary">{heroData.description}</p>
        </div>
      </section>

      {/* Mission + long about */}
      <FadeInSection className="relative overflow-hidden border-t border-line-divider">
        <SectionNumber number="01" position="top-right" />
        <div className="container-x py-32 md:py-48">
          <p className="text-eyebrow text-ink-tertiary">Mission</p>
          <p className="mt-8 max-w-prose text-h2 leading-snug text-ink-primary">
            {mission.description}
          </p>
          <p className="mt-8 max-w-prose text-body-lg leading-relaxed text-ink-secondary">
            {company.fullDescription}
          </p>
        </div>
      </FadeInSection>

      {/* Stats */}
      <FadeInSection className="relative overflow-hidden border-t border-line-divider bg-surface-alt">
        <SectionNumber number="02" position="top-right" />
        <div className="container-x py-24 md:py-32">
          <p className="text-eyebrow text-ink-tertiary">By the numbers</p>
          <div className="grid grid-cols-2 gap-8 mt-10 md:grid-cols-3 lg:grid-cols-5">
            {stats.map(stat => (
              <div key={stat.id} className="border-t border-line-hair pt-4">
                <p className="font-mono text-[40px] font-medium leading-none text-accent-primary">
                  {stat.value}
                </p>
                <p className="mt-3 text-eyebrow text-ink-tertiary">{stat.label.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* Philosophy callout */}
      <FadeInSection className="relative overflow-hidden border-t border-line-divider">
        <SectionNumber number="03" position="top-right" />
        <div className="container-x py-32 md:py-48">
          <p className="text-eyebrow text-accent-primary">Philosophy</p>
          <p className="mt-8 max-w-prose text-display-md leading-tight text-ink-primary">
            {mission.statement}
          </p>
        </div>
      </FadeInSection>

      {/* Values */}
      <FadeInSection className="relative overflow-hidden border-t border-line-divider bg-surface-alt">
        <SectionNumber number="04" position="top-right" />
        <div className="container-x py-32 md:py-48">
          <p className="text-eyebrow text-ink-tertiary">Core principles</p>
          <div className="grid grid-cols-1 gap-10 mt-10 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {principles.map((principle, i) => (
              <div key={principle.id} className="bg-surface-white border border-line-divider p-6 md:p-8">
                <p className="font-mono text-caption text-accent-primary">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 text-h3 font-medium text-ink-primary">{principle.title}</h3>
                <p className="mt-3 text-body-sm leading-relaxed text-ink-secondary">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* Achievements */}
      <FadeInSection className="relative overflow-hidden border-t border-line-divider">
        <SectionNumber number="05" position="top-right" />
        <div className="container-x py-32 md:py-48">
          <p className="text-eyebrow text-ink-tertiary">Honors &amp; recognition</p>
          <ul className="mt-10 max-w-prose space-y-6">
            {honors.map((honor, i) => (
              <li key={honor.id} className="flex gap-4 text-body-lg text-ink-primary">
                <span className="mt-2 flex-shrink-0 font-mono text-caption text-accent-primary">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p>{honor.title}</p>
                  <p className="mt-1 text-caption text-ink-tertiary">
                    {honor.issuer}
                    {honor.year !== '[REPLACE]' && ` · ${honor.year}`}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </FadeInSection>
    </>
  )
}
