import { Drumstick, Egg, type LucideIcon } from 'lucide-react'
import { Shrimp } from '@/components/icons/Shrimp'

// Lucide doesn't ship a shrimp icon, so we use a custom SVG that follows
// the same stroke / API conventions.
type IconComponent = LucideIcon | typeof Shrimp

const ICON_BY_SPECIES: Record<string, IconComponent> = {
  shrimp: Shrimp,
  broiler: Drumstick,
  layer: Egg,
}

export function getSpeciesIcon(speciesSlug: string): IconComponent | null {
  return ICON_BY_SPECIES[speciesSlug] ?? null
}
