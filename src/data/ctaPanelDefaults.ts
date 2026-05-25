export type SamplePanelDefaults = {
  headline: string
  sub: string
  highlights: ReadonlyArray<{ label: string; value: string }>
  documents: ReadonlyArray<string>
  nextSteps: ReadonlyArray<string>
  restrictedNote: string
}

export const samplePanelDefaults: SamplePanelDefaults = {
  headline: "What you'll receive",
  sub: 'A free 100g sample for lab evaluation, shipped via express courier with full documentation.',
  highlights: [
    { label: 'Sample size', value: '100 g' },
    { label: 'Cost',        value: 'Free product' },
    { label: 'Shipping',    value: 'Buyer pays' },
    { label: 'Lead time',   value: '1–2 weeks' },
  ],
  documents: [
    'Certificate of Analysis (COA)',
    'Material Safety Data Sheet (MSDS)',
    'Technical Data Sheet (TDS)',
  ],
  nextSteps: [
    'Sample team reviews and confirms eligibility — within 1 business day',
    'Sample dispatched — 3–5 business days from approval',
    'Delivered to your address — 3–10 days via express courier',
  ],
  restrictedNote:
    'Subject to export control screening. Cannot ship to US/EU/UN-sanctioned destinations.',
}

export const SAMPLE_APPLICATION_OPTIONS = [
  'Shrimp feed',
  'Poultry feed (broiler)',
  'Poultry feed (layer)',
  'Food umami / seasoning',
  'R&D / lab study',
  'Other',
] as const

export const SAMPLE_VOLUME_OPTIONS = [
  'Just evaluating',
  '< 1 tonne / year',
  '1–10 tonnes / year',
  '10–50 tonnes / year',
  '50+ tonnes / year',
] as const

export const COUNTRY_OPTIONS = [
  'Australia',
  'Vietnam',
  'China',
  'India',
  'Indonesia',
  'Thailand',
  'Malaysia',
  'Singapore',
  'Philippines',
  'Japan',
  'South Korea',
  'United States',
  'Other',
] as const

// === Sales / Talk-to-sales panel ===

export type SalesPanelDefaults = {
  headline: string
  sub: string
  highlights: ReadonlyArray<{ label: string; value: string }>
  deliverables: ReadonlyArray<string>
  trustStrip: { line1: string; line2: string }
  responseSla: string
}

export const salesPanelDefaults: SalesPanelDefaults = {
  headline: 'What sales will send back',
  sub: 'A complete quotation package tailored to your market, volume, and preferred Incoterms — within 1 business day.',
  highlights: [
    { label: 'MOQ',         value: '1 tonne' },
    { label: 'Production',  value: '10–14 days' },
    { label: 'Incoterms',   value: 'FOB / CIF / EXW' },
    { label: 'Payment',     value: '30/70 T/T or L/C' },
  ],
  deliverables: [
    'Price quotation PDF (FOB / CIF / CFR — your choice)',
    'Lead time estimate to your destination port',
    'Sample shipment arrangement if not already sent',
    'Draft sales contract for review',
    'Available certifications for your market',
    'Reference customer list (on request, NDA may apply)',
  ],
  trustStrip: {
    line1: '20+ years in business · ISO 22000 · BAP · GMP+ certified',
    line2: 'Serving feed manufacturers and food brands across APAC, EU, MEA since 2003.',
  },
  responseSla: 'Response within 1 business day. Net 30 terms available for established partners after 3+ orders.',
}

export const BUSINESS_TYPE_OPTIONS = [
  'Feed manufacturer',
  'Food brand / processor',
  'Distributor / Importer',
  'Trading company',
  'Research / Academic',
  'Other',
] as const

export const INCOTERMS_OPTIONS = [
  'FOB (Free on Board)',
  'CIF (Cost, Insurance, Freight)',
  'CFR (Cost & Freight)',
  'EXW (Ex Works)',
  'DDP (Delivered Duty Paid)',
  'Not sure — please advise',
] as const

export const PAYMENT_TERMS_OPTIONS = [
  'T/T 30/70 (30% advance, 70% on B/L)',
  'T/T 50/50',
  'L/C at sight',
  'L/C 30 days',
  'Net 30 (existing partners)',
  'Open to negotiation',
] as const

export const ANNUAL_VOLUME_OPTIONS = [
  '1–10 tonnes',
  '10–50 tonnes',
  '50–100 tonnes',
  '100–500 tonnes',
  '500+ tonnes',
] as const

export const FIRST_ORDER_VOLUME_OPTIONS = [
  '1 tonne (MOQ)',
  '2–5 tonnes',
  '5–10 tonnes',
  '10–20 tonnes',
  '20+ tonnes',
] as const

export const ORDER_TIMING_OPTIONS = [
  'Just exploring',
  'Within 1 month',
  '1–3 months',
  '3–6 months',
  '6+ months',
] as const

export const CURRENCY_OPTIONS = ['USD', 'EUR', 'CNY', 'AUD', 'Other'] as const

export const CERTIFICATION_OPTIONS = [
  'Halal',
  'Kosher',
  'Non-GMO',
  'Organic',
  'GMP+',
  'FAMI-QS',
  'ISO 22000',
  'BAP',
] as const

// === Datasheet panel ===

export type DatasheetFile = {
  key: 'tds' | 'coa' | 'msds' | 'summary'
  label: string
  description: string
  pages: string
  size: string
}

export type DatasheetPanelDefaults = {
  headline: string
  sub: string
  gatedFiles: ReadonlyArray<DatasheetFile>
  publicFile: DatasheetFile
  contents: ReadonlyArray<string>
  confidentialityNote: string
}

export const datasheetPanelDefaults: DatasheetPanelDefaults = {
  headline: "What's inside this pack",
  sub: 'Three documents: technical specs, batch analysis, and safety data — covering everything your QA, regulatory, and procurement teams need.',
  gatedFiles: [
    {
      key:  'tds',
      label: 'Technical Data Sheet (TDS)',
      description: 'Product description, composition, dosage, applications',
      pages: '2–4 pages',
      size:  '~180 KB',
    },
    {
      key:  'coa',
      label: 'Certificate of Analysis (COA)',
      description: 'Lab test results for current production batch',
      pages: '1–2 pages',
      size:  '~80 KB',
    },
    {
      key:  'msds',
      label: 'Material Safety Data Sheet (MSDS)',
      description: 'Safety, handling, regulatory compliance',
      pages: '5–10 pages',
      size:  '~350 KB',
    },
  ],
  publicFile: {
    key:  'summary',
    label: 'Product Summary',
    description: 'Public 1-pager — composition basics, applications, contact info',
    pages: '1 page',
    size:  '~120 KB',
  },
  contents: [
    'Product description & manufacturing process',
    'Typical composition & key actives (β-glucan, MOS, protein, ash)',
    'Microbiological specifications (TPC, Yeast & Mold, E.coli, Salmonella)',
    'Heavy metals & mycotoxin limits (Pb, As, Cd, Hg, Aflatoxin B1)',
    'Recommended dosage by target species',
    'Storage, packaging & shelf life',
    'Available certifications (Halal, Kosher, GMP+, ISO, BAP)',
    'Regulatory compliance notes per market',
  ],
  confidentialityNote:
    'Datasheets contain confidential composition data and lab results. For evaluation purposes only — please do not redistribute without written consent.',
}

export const TARGET_SPECIES_OPTIONS = [
  'Shrimp',
  'Broilers',
  'Layers',
  'Breeders',
  'Turkey',
  'Duck',
  'Swine',
  'Other',
] as const

export const DATASHEET_REASON_OPTIONS = [
  'R&D screening',
  'Regulatory review',
  'Vendor qualification',
  'Internal documentation',
  'Academic / research',
  'Other',
] as const

export const SPEC_INTEREST_OPTIONS = [
  'Composition / Active ingredients',
  'Microbiology',
  'Heavy metals & Mycotoxins',
  'Dosage rates',
  'Shelf life & Storage',
  'Packaging options',
  'Regulatory compliance',
] as const
