import clsx from 'clsx'

type SpeciesItem = Readonly<{
  id: string
  label: string
}>

type SpeciesFilterChipProps = Readonly<{
  species: ReadonlyArray<SpeciesItem>
  activeSpecies: string | null
  onSelect: (speciesId: string | null) => void
}>

const chipBase =
  'px-4 py-2 text-body-sm font-medium transition-colors duration-200'
const chipActive = 'bg-ink-primary text-surface-white'
const chipInactive =
  'border border-line-mid text-ink-secondary hover:border-ink-primary hover:text-ink-primary'

export function SpeciesFilterChip({ species, activeSpecies, onSelect }: SpeciesFilterChipProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={clsx(chipBase, activeSpecies === null ? chipActive : chipInactive)}
      >
        All
      </button>
      {species.map(s => (
        <button
          key={s.id}
          type="button"
          onClick={() => onSelect(s.id)}
          className={clsx(chipBase, activeSpecies === s.id ? chipActive : chipInactive)}
        >
          {s.label}
        </button>
      ))}
    </div>
  )
}
