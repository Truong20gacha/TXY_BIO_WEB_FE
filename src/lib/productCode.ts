// Semantic catalog codes shown in product card eyebrows.
// The numeric suffix (.001, .002, ...) is appended at render time
// based on the product's position in the catalogue.
export const PRODUCT_CODES: Record<string, string> = {
  'yeast-cell-wall-mos':    'Y.MOS',
  'yeast-beta-glucan':      'Y.BG',
  'selenium-yeast':         'Y.SE',
  'autolyzed-yeast':        'Y.AY',
  'ye-standard-powder':     'Y.STD',
  'ye-standard-paste':      'Y.STP',
  'ye-umami':               'Y.UMI',
  'ye-kokumi':              'Y.KOK',
  'ye-ce-powder':           'Y.CEP',
  'ye-fa-paste':            'Y.FAP',
  'ye-microbial-nutrition': 'Y.MN',
  'ye-ce-paste':            'Y.CEL',
}

export function getProductCode(slug: string): string {
  return PRODUCT_CODES[slug] ?? 'Y.XX'
}
