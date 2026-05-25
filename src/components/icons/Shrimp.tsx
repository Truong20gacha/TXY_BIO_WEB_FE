import type { SVGProps } from 'react'

type ShrimpProps = Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> & {
  size?: number | string
  strokeWidth?: number | string
}

export function Shrimp({
  size = 24,
  strokeWidth = 1.5,
  ...props
}: ShrimpProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Body — curved comma shape: head at right (~19,9), tail at left (~5,13) */}
      <path d="M19 9c0-3-5-4-9-3S4 11 5 13" />
      <path d="M5 13c1 3 6 5 11 3 3-1 4-4 3-7" />
      {/* Tail fan — three short lines flaring left */}
      <path d="M5 13l-3-1" />
      <path d="M5 13l-3 1" />
      <path d="M5 13l-2 3" />
      {/* Antennae from head */}
      <path d="M19 9l3-3" />
      <path d="M19 9l4 1" />
      {/* Eye */}
      <circle cx="17" cy="9" r="0.7" fill="currentColor" stroke="none" />
      {/* Belly segments — three small ticks */}
      <path d="M10 16v2" />
      <path d="M13 16.5v2" />
      <path d="M16 16v2" />
    </svg>
  )
}
