import { SEO } from '@/components/common/SEO'

const LAST_UPDATED = '2026-05-19'

export function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacy policy"
        description="How we collect, use, and protect your information when you contact us or browse our site."
      />

      <section className="border-t border-line-divider">
        <div className="container-x pt-20 pb-12 md:pt-24 md:pb-16">
          <p className="text-eyebrow text-accent-primary">Legal</p>
          <h1 className="mt-4 text-display-md text-ink-primary leading-tight">Privacy policy.</h1>
          <p className="mt-4 text-caption text-ink-tertiary">Last updated {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="border-t border-line-divider">
        <div className="container-x py-24 md:py-32">
          <article className="max-w-prose space-y-10 text-body text-ink-primary leading-relaxed">

            <div>
              <h2 className="text-h2 font-medium text-ink-primary">Information we collect</h2>
              <p className="mt-4">
                When you submit an inquiry through this site, we collect the information you provide
                voluntarily: company name, contact name, email address, phone number, country,
                business type, product of interest, estimated annual quantity, port of destination,
                and any additional notes.
              </p>
            </div>

            <div>
              <h2 className="text-h2 font-medium text-ink-primary">How we use it</h2>
              <p className="mt-4">
                We use the information you submit solely to respond to your inquiry and prepare a
                quote. We do not sell, rent, or share your contact details with third parties for
                marketing purposes.
              </p>
            </div>

            <div>
              <h2 className="text-h2 font-medium text-ink-primary">Cookies and analytics</h2>
              <p className="mt-4">
                This site uses minimal first-party storage for session functionality only. We do not
                use third-party tracking cookies or behavioural advertising pixels.
              </p>
            </div>

            <div>
              <h2 className="text-h2 font-medium text-ink-primary">Data retention</h2>
              <p className="mt-4">
                Inquiry submissions are retained for the duration of our commercial relationship
                with you, or for seven years following the last contact, whichever is shorter, in
                accordance with Vietnamese business record-keeping requirements.
              </p>
            </div>

            <div>
              <h2 className="text-h2 font-medium text-ink-primary">Contact</h2>
              <p className="mt-4">
                Questions about this policy can be directed to our general contact email.
              </p>
            </div>

            <p className="text-caption text-ink-tertiary border-t border-line-hair pt-6">
              This is a placeholder template. Replace with content reviewed by Australian and
              Vietnamese legal counsel before production use.
            </p>

          </article>
        </div>
      </section>
    </>
  )
}
