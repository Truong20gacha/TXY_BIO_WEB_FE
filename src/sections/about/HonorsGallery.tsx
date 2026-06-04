import { FadeInSection } from '@/components/common/FadeInSection'
import { SectionNumber } from '@/components/common/SectionNumber'
import { ZoomableImage } from '@/components/ui/ZoomableImage'
import data from '@/data/information.json'

const { eyebrow, title, intro, items } = data.honorsGallery

export function HonorsGallery() {
  return (
    <FadeInSection className="relative overflow-hidden border-t border-line-divider bg-surface-alt">
      <SectionNumber number="07" position="top-right" />
      <div className="container-x py-24 md:py-32">
        <p className="text-eyebrow text-accent-primary">{eyebrow}</p>
        <h2 className="mt-6 max-w-3xl text-display-md leading-tight text-ink-primary">{title}</h2>
        <p className="mt-6 max-w-2xl text-body-lg text-ink-secondary">{intro}</p>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5">
          {items.map(honor => (
            <figure
              key={honor.image}
              className="flex flex-col border border-line-divider bg-surface-white"
            >
              <div className="aspect-[3/4] border-b border-line-hair">
                <ZoomableImage src={honor.image} alt={honor.title} />
              </div>
              <figcaption className="p-3 text-caption leading-snug text-ink-secondary">
                {honor.title}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-8 text-caption text-ink-tertiary">
          {items.length} certificates · hover any to zoom in.
        </p>
      </div>
    </FadeInSection>
  )
}
