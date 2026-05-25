import { SEO } from '@/components/common/SEO'

const LAST_UPDATED = '2026-05-19'

export function TermsPage() {
  return (
    <>
      <SEO
        title="Terms of use"
        description="Terms governing the use of this website and any inquiries you submit."
      />

      <section className="border-t border-line-divider">
        <div className="container-x pt-20 pb-12 md:pt-24 md:pb-16">
          <p className="text-eyebrow text-accent-primary">Legal</p>
          <h1 className="mt-4 text-display-md text-ink-primary leading-tight">Terms of use.</h1>
          <p className="mt-4 text-caption text-ink-tertiary">Last updated {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="border-t border-line-divider">
        <div className="container-x py-24 md:py-32">
          <article className="max-w-prose space-y-10 text-body text-ink-primary leading-relaxed">

            <div>
              <h2 className="text-h2 font-medium text-ink-primary">Use of this site</h2>
              <p className="mt-4">
                This site is provided for informational purposes to assist business buyers
                evaluating our yeast-derived feed additive product range. Content is intended for
                qualified commercial buyers, distributors, and feed industry professionals.
              </p>
            </div>

            <div>
              <h2 className="text-h2 font-medium text-ink-primary">Product information</h2>
              <p className="mt-4">
                Specifications, dosage recommendations, and certifications described on this site
                are current at the time of publication and subject to change. Final purchasing
                decisions should be based on the current technical datasheet supplied with each
                quotation.
              </p>
            </div>

            <div>
              <h2 className="text-h2 font-medium text-ink-primary">Inquiries and quotations</h2>
              <p className="mt-4">
                Submitting an inquiry through this site does not create a binding commercial
                agreement. Pricing, lead time, and terms of sale will be confirmed in a written
                quotation issued by our sales team within 48 hours of inquiry receipt.
              </p>
            </div>

            <div>
              <h2 className="text-h2 font-medium text-ink-primary">Intellectual property</h2>
              <p className="mt-4">
                All content on this site — including text, product photography, technical
                specifications, and graphic design — is the property of the operating company and
                may not be reproduced without written permission.
              </p>
            </div>

            <div>
              <h2 className="text-h2 font-medium text-ink-primary">Governing law</h2>
              <p className="mt-4">
                Use of this site is governed by the laws of the Socialist Republic of Vietnam. Any
                commercial transaction arising from inquiries submitted through this site is
                governed by the terms specified in the corresponding quotation and sales contract.
              </p>
            </div>

            <p className="text-caption text-ink-tertiary border-t border-line-hair pt-6">
              This is a placeholder template. Replace with content reviewed by qualified legal
              counsel before production use.
            </p>

          </article>
        </div>
      </section>
    </>
  )
}
