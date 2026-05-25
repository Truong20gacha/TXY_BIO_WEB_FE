import { Link } from 'react-router-dom'

import { SEO } from '@/components/common/SEO'

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      <SEO title="404 · Page not found" description="The page you're looking for doesn't exist." />
      <p className="text-eyebrow text-ink-tertiary">404 / NOT FOUND</p>
      <h1 className="mt-6 text-display-md text-ink-primary">Page not found.</h1>
      <p className="mt-4 max-w-md text-body-lg text-ink-secondary">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 text-body-sm font-medium text-accent-primary border-b border-accent-primary pb-0.5 hover:text-accent-hover hover:border-accent-hover transition-colors duration-200"
      >
        ← Back to home
      </Link>
    </div>
  )
}
