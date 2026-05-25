import {
  Activity,
  Award,
  Ban,
  Building2,
  CheckCircle2,
  Droplet,
  Droplets,
  FlaskConical,
  Gauge,
  Heart,
  Hourglass,
  Layers,
  Leaf,
  Settings2,
  Shield,
  Soup,
  Sparkles,
  Sprout,
  TrendingUp,
  Zap,
  type LucideIcon,
} from 'lucide-react'

type Rule = { icon: LucideIcon; keywords: ReadonlyArray<string> }

// Order matters: more specific keywords listed first so they win over
// generic ones (e.g. "consistent batch-to-batch" should beat "biopharm").
const RULES: ReadonlyArray<Rule> = [
  { icon: Ban,           keywords: ['bind', 'pathogen', 'harmful', 'reduces pathogenic'] },
  { icon: CheckCircle2,  keywords: ['consistent', 'batch-to-batch', 'pharma-grade quality'] },
  { icon: Hourglass,     keywords: ['sustained', 'long ferment'] },
  { icon: Zap,           keywords: ['rapid', 'quick microbial', '24–48', '24-48', 'fast', 'high bioavailability'] },
  { icon: Building2,     keywords: ['large-scale', 'industrial bioreactor size'] },
  { icon: Settings2,     keywords: ['compatible', 'thermal processing', 'industrial cooking', 'continuous bioreactor', 'sterile filter'] },
  { icon: Gauge,         keywords: ['low inclusion', 'low-salt', 'efficient on-cost'] },
  { icon: Heart,         keywords: ['reproductive', 'breeders'] },
  { icon: Award,         keywords: ['meat quality', 'shelf life', 'premium', 'quality and shelf'] },
  { icon: Shield,        keywords: ['immune', 'immunity', 'disease resistance', 'immunoproph', 'antibod', 'defense', 'anti-infect'] },
  { icon: Sprout,        keywords: ['microflora', 'microbiome', 'beneficial gut', 'balance gut', 'gut flora'] },
  { icon: TrendingUp,    keywords: ['villus', 'villi', 'absorption', 'increase', 'growth and', 'intestinal development', 'weight gain'] },
  { icon: Droplets,      keywords: ['stress', 'oxidative', 'antioxidant'] },
  { icon: Soup,          keywords: ['umami', 'savoury', 'savour', 'kokumi', 'flavour', 'flavor', 'saltiness', 'mouthful'] },
  { icon: Leaf,          keywords: ['vegan', 'clean label', 'gluten-free', 'no added msg', 'no artificial', 'plant-based', 'natural source', 'natural umami'] },
  { icon: Sparkles,      keywords: ['vitamin', 'b-vitamin', 'nucleotide', 'peptide', 'amino acid', 'nucleic acid'] },
  { icon: Droplet,       keywords: ['soluble', 'dispersion', 'liquid form', 'easy disp'] },
  { icon: Layers,        keywords: ['universal', 'diverse microbes', 'different process', 'powder and paste'] },
  { icon: FlaskConical,  keywords: ['nitrogen', 'fermentation', 'biopharm', 'bioreactor', 'fed-batch'] },
]

export function getFunctionIcon(text: string): LucideIcon {
  const lower = text.toLowerCase()
  for (const rule of RULES) {
    if (rule.keywords.some(k => lower.includes(k))) return rule.icon
  }
  return Activity
}
