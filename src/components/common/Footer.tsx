import { Link } from 'react-router-dom'

import data from '@/data/information.json'

const CERT_BADGES = ['BAP', 'HACCP', 'ISO 22000', 'GMP+']

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-line-divider bg-ink-primary">
      <div className="container-x py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/images/logo.webp"
                alt=""
                aria-hidden="true"
                className="block flex-shrink-0 h-7 w-auto bg-[#F0F4F1] mix-blend-multiply"
              />
              <span className="text-body-sm font-medium tracking-[0.12em] uppercase text-surface-white">
                TXYbio
              </span>
            </div>
            <p className="max-w-[220px] text-body-sm text-ink-muted">
              {data.company.tagline}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {CERT_BADGES.map(cert => (
                <span
                  key={cert}
                  className="px-2 py-1 text-eyebrow text-ink-muted border border-ink-secondary/40"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-eyebrow text-ink-tertiary">Products</p>
            <ul className="flex flex-col gap-3">
              {data.navigation.footer.products.map(item => (
                <li key={item.url}>
                  <Link
                    to={item.url}
                    className="text-body-sm text-ink-muted hover:text-surface-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-eyebrow text-ink-tertiary">Company</p>
            <ul className="flex flex-col gap-3">
              {data.navigation.footer.company.map(item => (
                <li key={item.url}>
                  <Link
                    to={item.url}
                    className="text-body-sm text-ink-muted hover:text-surface-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-eyebrow text-ink-tertiary">Contact</p>
            <div className="flex flex-col gap-3">
              <p className="text-body-sm text-ink-muted">
                {data.contact.address.displayFull}
              </p>
              {data.contact.phones.map(p => (
                <p key={p.label} className="text-body-sm text-ink-muted">
                  {p.label}: {p.display}
                </p>
              ))}
              <a
                href={`mailto:${data.contact.emails.general}`}
                className="inline-block text-body-sm text-surface-white border-b border-accent-bg pb-0.5 hover:text-accent-bg transition-colors duration-200 w-fit"
              >
                {data.contact.emails.general}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-secondary/30">
        <div className="container-x flex flex-col items-center gap-4 py-6 md:flex-row md:justify-between">
          <p className="text-caption text-ink-tertiary">
            © {currentYear} {data.company.shortName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {data.navigation.footer.legal.map(item => (
              <Link
                key={item.url}
                to={item.url}
                className="text-caption text-ink-muted hover:text-surface-white transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            <span className="text-caption text-ink-muted" aria-label="Language: English">
              EN
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
