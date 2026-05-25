type Slice = Readonly<{ label: string; value: number }>

type CompositionDonutProps = Readonly<{
  slices: ReadonlyArray<Slice>
  size?: number
}>

// Editorial palette: emphasis green → ink dark → mid gray → light gray (Others)
const PALETTE = ['#1F4D3D', '#1A1A1A', '#9B9B96', '#D4D4CE', '#6B6B68'] as const

export function CompositionDonut({ slices, size = 200 }: CompositionDonutProps) {
  const total = slices.reduce((s, x) => s + x.value, 0)
  if (total === 0) return null

  const cx = 50
  const cy = 50
  const r = 38
  const strokeWidth = 14
  const circumference = 2 * Math.PI * r

  let cumulative = 0

  return (
    <div className="flex flex-col items-center gap-6 md:items-start">
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="block flex-shrink-0"
        role="img"
        aria-label="Composition breakdown"
      >
        {/* Track ring (subtle) */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#EFEFEC"
          strokeWidth={strokeWidth}
        />
        {/* Slices */}
        {slices.map((slice, i) => {
          const fraction = slice.value / total
          const arcLength = fraction * circumference
          const dashOffset = -cumulative * circumference
          cumulative += fraction
          return (
            <circle
              key={slice.label}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={PALETTE[i % PALETTE.length]}
              strokeWidth={strokeWidth}
              strokeDasharray={`${arcLength} ${circumference - arcLength}`}
              strokeDashoffset={dashOffset}
              transform={`rotate(-90 ${cx} ${cy})`}
            />
          )
        })}
      </svg>

      {/* Legend */}
      <ul className="flex w-full max-w-[220px] flex-col gap-2">
        {slices.map((slice, i) => (
          <li
            key={slice.label}
            className="flex items-center gap-3 text-caption"
          >
            <span
              className="block h-2 w-2 flex-shrink-0"
              style={{ backgroundColor: PALETTE[i % PALETTE.length] }}
              aria-hidden="true"
            />
            <span className="flex-1 text-ink-secondary truncate">{slice.label}</span>
            <span className="font-mono text-ink-primary">{slice.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
