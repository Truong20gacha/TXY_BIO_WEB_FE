import { Link } from 'react-router-dom'

import { FadeInSection } from '@/components/common/FadeInSection'
import { SEO } from '@/components/common/SEO'
import { SectionNumber } from '@/components/common/SectionNumber'
import data from '@/data/information.json'
import { CertificationsLicenses } from '@/sections/about/CertificationsLicenses'
import { HonorsGallery } from '@/sections/about/HonorsGallery'

const heroData = data.heroes.about
const seo = data.seo.about
const stats = data.stats.items
const applicationFields = data.applicationFields

const companyProfile = {
  name: 'Zhuhai TXY Biotech Holding Co., Ltd.',
  description:
    'TXY Biotech is a national high-tech enterprise focused on yeast derivatives, healthy food, nutritional seasoning, animal nutrition, and biochemical culture media. The company owns its fermentation base, has introduced German environmental treatment systems, and serves both domestic and international markets.',
  highlights: [
    'National High-Tech Enterprise',
    'Guangdong Yeast Derivative Products and Alternative Antibiotic Application Engineering Technology Research Center',
    'Zhuhai Private Enterprise Innovation and Industrialization Demonstration Base',
    'Guangdong Province Specialized and Unique Enterprise',
  ],
  brands: ['TXY', 'Wanfukang'],
  operations: [
    'Healthy food',
    'Nutritional seasoning',
    'Animal nutrition',
    'Biochemical culture media',
  ],
  markets: ['Australia', 'New Zealand', 'Europe', 'America', 'Southeast Asia', 'China'],
  subsidiaries: [
    'Zhanjiang Wuzhou Biology Engineering Co., Ltd.',
    'Zhuhai Wanfukang Biotechnology Co., Ltd.',
  ],
}

const founder = {
  name: 'Ye Zhi Li',
  title: 'Founder and Chairman',
  credentials: [
    "Master's degree from Peking University",
    'Founded Guangdong Wuzhou Pharmaceutical Co., Ltd. in April 2003 and served as Chairman',
    'Chairman of Zhuhai TXY Biotech Holding Co., Ltd.',
    'Over 30 years of expertise in the yeast fermentation industry',
    "Deputy to the 12th, 13th, 14th and 15th Zhanjiang Municipal People's Congress",
    "Standing Committee of the 17th Suixi County People's Congress",
    '8th and 9th CPPCC Standing Committee of Suixi County',
    'Executive Committee of Guangdong Federation of Industry and Commerce',
    'Vice Chairman of Zhanjiang Federation of Industry and Commerce',
    'Honorary Chairman of Suixi County Federation of Industry and Commerce',
  ],
}

const patents = [
  {
    date: '2013.03.20',
    title: 'Chicken-flavored powdered yeast extract and its production method',
  },
  {
    date: '2015.06.08',
    title: 'Salt-tolerant and acid-tolerant yeast extract and its preparation method',
  },
  {
    date: '2017.08.01',
    title: 'Yeast extract composite seasoning for soy sauce and its preparation method',
  },
  {
    date: '2017.12.22',
    title: 'A yeast extract and its preparation method',
  },
  {
    date: '2017.12.22',
    title: 'Method for co-production of Glucan and Mannoprotein from yeast cell wall',
  },
]

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

      {/* Company profile */}
      <FadeInSection className="relative overflow-hidden border-t border-line-divider">
        <SectionNumber number="01" position="top-right" />
        <div className="container-x py-24 md:py-32">
          <p className="text-eyebrow text-ink-tertiary">Company profile</p>
          <h2 className="mt-6 max-w-4xl text-display-md leading-tight text-ink-primary">
            {companyProfile.name}
          </h2>
          <p className="mt-8 max-w-3xl text-body-lg leading-relaxed text-ink-secondary">
            {companyProfile.description}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {companyProfile.highlights.map(highlight => (
              <div key={highlight} className="border border-line-divider bg-surface-white p-6">
                <p className="text-body-sm leading-relaxed text-ink-primary">{highlight}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 border-t border-line-hair pt-8 md:grid-cols-3">
            <div>
              <p className="text-eyebrow text-ink-tertiary">Brands</p>
              <p className="mt-3 text-body-lg text-ink-primary">{companyProfile.brands.join(' / ')}</p>
            </div>
            <div>
              <p className="text-eyebrow text-ink-tertiary">Markets</p>
              <p className="mt-3 text-body-sm leading-relaxed text-ink-secondary">
                {companyProfile.markets.join(', ')}
              </p>
            </div>
            <div>
              <p className="text-eyebrow text-ink-tertiary">Operations</p>
              <p className="mt-3 text-body-sm leading-relaxed text-ink-secondary">
                {companyProfile.operations.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Product range */}
      <FadeInSection className="relative overflow-hidden border-t border-line-divider bg-surface-alt">
        <SectionNumber number="02" position="top-right" />
        <div className="container-x py-24 md:py-32">
          <p className="text-eyebrow text-ink-tertiary">{applicationFields.eyebrow}</p>
          <h2 className="mt-6 max-w-3xl text-display-md leading-tight text-ink-primary">
            {applicationFields.title}
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg leading-relaxed text-ink-secondary">
            {applicationFields.intro}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {applicationFields.items.map(field => (
              <Link
                key={field.id}
                to={`/products#${field.categorySlug}`}
                className="group flex flex-col border border-line-divider bg-surface-white p-6 transition-colors duration-200 hover:border-accent-primary md:p-8"
              >
                <h3 className="text-h3 font-medium text-ink-primary">{field.name}</h3>
                <p className="mt-4 text-body-sm leading-relaxed text-ink-secondary">{field.description}</p>
                <span className="mt-6 text-body-sm font-medium text-accent-primary">
                  View {field.categoryName} products →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* Stats */}
      <FadeInSection className="relative overflow-hidden border-t border-line-divider">
        <SectionNumber number="03" position="top-right" />
        <div className="container-x py-24 md:py-32">
          <p className="text-eyebrow text-ink-tertiary">By the numbers</p>
          <div className="grid grid-cols-2 gap-8 mt-10 md:grid-cols-3 lg:grid-cols-5">
            {stats.map(stat => (
              <div key={stat.id} className="border-t border-line-hair pt-4">
                <p className="font-mono text-[40px] font-medium leading-none text-accent-primary">
                  {stat.value}{stat.suffix}
                </p>
                <p className="mt-3 text-eyebrow text-ink-tertiary">{stat.label.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* Founder */}
      <FadeInSection className="relative overflow-hidden border-t border-line-divider bg-surface-alt">
        <SectionNumber number="04" position="top-right" />
        <div className="container-x py-24 md:py-32">
          <p className="text-eyebrow text-accent-primary">Founder</p>
          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[320px_1fr] lg:gap-16">
            <div>
              <div className="mb-6 aspect-[3/4] max-w-[280px] overflow-hidden border border-line-hair bg-surface-white">
                <img
                  src={data.founder.photo}
                  alt={data.founder.photoAlt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="text-display-md leading-tight text-ink-primary">{founder.name}</h2>
              <p className="mt-4 text-body-lg text-ink-secondary">{founder.title}</p>
            </div>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {founder.credentials.map((credential, i) => (
                <li key={credential} className="border-t border-line-hair pt-4 text-body-sm leading-relaxed text-ink-secondary">
                  <span className="mb-3 block font-mono text-caption text-accent-primary">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {credential}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </FadeInSection>

      {/* Certifications & licenses */}
      <CertificationsLicenses />

      {/* Patents */}
      <FadeInSection className="relative overflow-hidden border-t border-line-divider">
        <SectionNumber number="06" position="top-right" />
        <div className="container-x py-24 md:py-32">
          <p className="text-eyebrow text-ink-tertiary">Patents</p>
          <h2 className="mt-6 max-w-3xl text-display-md leading-tight text-ink-primary">
            Proprietary yeast extract technology
          </h2>
          <ul className="mt-10 grid grid-cols-1 gap-x-12 gap-y-5 md:grid-cols-2">
            {patents.map(patent => (
              <li key={`${patent.date}-${patent.title}`} className="border-t border-line-hair pt-4">
                <p className="font-mono text-caption text-accent-primary">{patent.date}</p>
                <p className="mt-2 text-body-sm leading-relaxed text-ink-primary">{patent.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </FadeInSection>

      {/* Honours & recognition gallery */}
      <HonorsGallery />
    </>
  )
}
