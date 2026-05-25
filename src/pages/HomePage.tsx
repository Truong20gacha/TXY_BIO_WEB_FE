import { SEO } from '@/components/common/SEO'
import { HeroManifesto } from '@/sections/homepage/HeroManifesto'
import { NumbersThatMatter } from '@/sections/homepage/NumbersThatMatter'
import { ProductMatrix } from '@/sections/homepage/ProductMatrix'
import { CertificationsGrid } from '@/sections/homepage/CertificationsGrid'
import { NewsTeaser } from '@/sections/homepage/NewsTeaser'
import { InquiryCTABanner } from '@/sections/homepage/InquiryCTABanner'
import data from '@/data/information.json'

const seo = data.seo.homepage

export function HomePage() {
  return (
    <>
      <SEO title={seo.title} description={seo.description} ogImage={seo.ogImage} />

      {/* Phase A — 6 sections */}
      <HeroManifesto />
      <NumbersThatMatter />
      {/* TODO Phase B: <ScienceBehind /> */}
      {/* TODO Phase C: <SpeciesSelector /> ⭐ */}
      <ProductMatrix />
      {/* TODO Phase C: <GlobalReach /> ⭐ */}
      <CertificationsGrid />
      <NewsTeaser />
      <InquiryCTABanner />
    </>
  )
}
