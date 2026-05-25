import type { ReactNode } from 'react'

type CtaPanelLayoutProps = Readonly<{
  left: ReactNode
  right: ReactNode
}>

export function CtaPanelLayout({ left, right }: CtaPanelLayoutProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-8">
      <div className="border border-line-divider p-6 md:p-8">{left}</div>
      <div className="border border-line-divider p-6 md:p-8">{right}</div>
    </div>
  )
}
