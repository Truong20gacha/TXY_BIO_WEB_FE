import { Link } from 'react-router-dom'

import type { LucideIcon } from 'lucide-react'

type EmptyStateProps = Readonly<{
  icon?: LucideIcon
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  actionHref?: string
}>

const actionClass =
  'mt-6 text-body-sm font-medium text-accent-primary border-b border-accent-primary pb-0.5 hover:text-accent-hover hover:border-accent-hover transition-colors duration-200'

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center px-6 py-24 text-center md:py-32">
      {Icon && <Icon size={48} strokeWidth={1.5} className="mb-6 text-ink-tertiary" />}
      <p className="text-body-lg text-ink-primary">{title}</p>
      {description && (
        <p className="mt-2 max-w-[320px] text-body-sm text-ink-tertiary">{description}</p>
      )}
      {actionLabel && onAction && (
        <button type="button" onClick={onAction} className={actionClass}>
          {actionLabel}
        </button>
      )}
      {actionLabel && actionHref && !onAction && (
        <Link to={actionHref} className={actionClass}>
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
