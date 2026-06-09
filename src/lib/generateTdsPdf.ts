import type { jsPDF as JsPdfDoc } from 'jspdf'
import type { Product } from '@/types/information'

/**
 * Client-side Technical Data Sheet (TDS) generator.
 *
 * Builds a structured, document-controlled TDS PDF from a product's catalogue
 * data — the legitimately data-driven document (typical specification, NOT a
 * batch certificate). COA/MSDS are controlled documents and are NOT generated
 * here. See src/data/REQUEST_FLOWS_ARCHITECTURE.md §8.
 *
 * ⚠️ Several trust fields below are PLACEHOLDERS marked `TODO`. They render so
 * the full credible layout is visible, but a DRAFT banner is printed and the
 * values MUST be replaced with real data before publishing.
 */

// ── Brand palette (mirrors tailwind.config.js) ──────────────────────────────
type RGB = [number, number, number]
const C = {
  accent: [31, 77, 61] as RGB, // #1F4D3D
  accentDark: [4, 52, 44] as RGB, // #04342C
  ink: [26, 26, 26] as RGB, // #1A1A1A
  sub: [107, 107, 104] as RGB, // #6B6B68
  line: [229, 229, 224] as RGB, // #E5E5E0
  altBg: [250, 250, 248] as RGB, // #FAFAF8
  warn: [186, 117, 23] as RGB, // #BA7517
  white: [255, 255, 255] as RGB,
}

// ── Issuer / document-control config — TODO replace placeholders ────────────
const TDS = {
  // The document is issued by the AUSTRALIAN supplier; TXY (China) is the
  // manufacturer. The chain is shown transparently (the playbook's QA rule:
  // never hide China origin behind an intermediary).
  supplierName: 'TXY Biotech AU', // display name; add the registered Pty Ltd + ABN later for invoices
  supplierTagline: 'Australian supplier of TXY yeast ingredients',
  manufacturerLine: 'Manufactured by TXY Biotech Co., Ltd. (China)',
  addressLine: 'Australia — full address available on request', // TODO: real AU address
  website: 'www.txybio.com', // TODO: Australian site domain
  verifyEmail: 'support@txybio.com', // TODO: Australian contact email
  qaSignatory: 'Quality Assurance Manager · TXY Biotech', // TODO: real name + title
  qmsStatement:
    "Manufactured under TXY's quality management system (ISO 9001 / GMP+); imported into Australia under DAFF/BICON permit.", // TODO: verify permit & cite number
  docVersion: 'v1.0', // TODO: document-control version scheme
  issueDate: '2026-06-09', // TODO: real issue date per version
  defaultHsCode: '391390', // TODO: verify HS code per product
  defaultOrigin: 'China',
  isDraft: true, // prints a DRAFT placeholder banner
}

// Placeholder certificate registry — TODO replace numbers + issuing bodies.
const CERT_REGISTRY: Record<string, { name: string; number: string; body: string }> = {
  'iso-9001': { name: 'ISO 9001', number: 'No. TODO', body: 'TODO' },
  'iso-22000': { name: 'ISO 22000', number: 'No. TODO', body: 'TODO' },
  'gmp-plus': { name: 'GMP+ B2', number: 'No. TODO', body: 'TODO' },
  haccp: { name: 'HACCP', number: 'No. TODO', body: 'TODO' },
  brc: { name: 'BRC', number: 'No. TODO', body: 'TODO' },
  halal: { name: 'HALAL', number: 'No. TODO', body: 'TODO' },
  kosher: { name: 'KOSHER', number: 'No. TODO', body: 'TODO' },
  'fami-qs': { name: 'FAMI-QS', number: 'No. TODO', body: 'TODO' },
  bap: { name: 'BAP', number: 'No. TODO', body: 'TODO' },
  sedex: { name: 'SEDEX', number: 'No. TODO', body: 'TODO' },
  cnas: { name: 'CNAS', number: 'No. TODO', body: 'TODO' },
}

// Placeholder test-method mapping by spec label — TODO confirm real methods.
function methodFor(label: string): string {
  const l = label.toLowerCase()
  if (l.includes('glucan') || l.includes('mos') || l.includes('mannan')) return 'HPLC'
  if (l.includes('protein')) return 'Kjeldahl (ISO 5983)'
  if (l.includes('moisture') || l.includes('water')) return 'Oven drying'
  if (l.includes('ash')) return 'Gravimetric'
  if (l.includes('selenium') || l.includes('metal')) return 'ICP-MS'
  if (l.includes('appearance') || l.includes('colour') || l.includes('color')) return 'Visual'
  return 'Per internal SOP' // TODO
}

function certLabel(code: string): string {
  const c = CERT_REGISTRY[code]
  if (!c) return code.toUpperCase()
  return `${c.name} — ${c.number} (${c.body})`
}

/**
 * jsPDF's built-in Helvetica renders WinAnsi / Latin-1 only. Scientific Unicode
 * (β, ≥, ≤, en/em dashes, subscripts, smart quotes) gets mangled — and a single
 * unsupported char can swallow neighbouring text (e.g. "≥70% (HPLC 70–85%), it
 * is a well-documented immunomodulator" collapsed to "conator"). Transliterate
 * to safe equivalents, then drop anything still outside Latin-1 as a final guard.
 */
const PDF_CHAR_MAP: Record<string, string> = {
  α: 'alpha', β: 'beta', γ: 'gamma', δ: 'delta', μ: 'u', ω: 'omega', Δ: 'delta',
  '≥': '>=', '≤': '<=', '≈': '~', '≠': '!=', '±': '+/-',
  '–': '-', '—': '-', '‐': '-', '‑': '-', '−': '-',
  '’': "'", '‘': "'", '“': '"', '”': '"', '′': "'", '″': '"',
  '•': '-', '…': '...', '™': '(TM)', '→': '->', '←': '<-', '×': 'x',
  '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
  '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9',
}

function sanitizePdfText(input: string): string {
  let out = ''
  for (const ch of String(input)) {
    if (PDF_CHAR_MAP[ch] !== undefined) out += PDF_CHAR_MAP[ch]
    else if (ch.charCodeAt(0) <= 0xff) out += ch
    // else: drop unknown non-Latin-1 char to avoid mangling its neighbours
  }
  return out
}

/**
 * Embed a subset of DejaVu Sans (Latin + Greek + math) so β, ≥, ≤, en-dashes
 * render as real glyphs. Lazy-fetched from /public/fonts (~92 KB total) only
 * when a PDF is generated. Returns false if the fetch/registration fails, so
 * the caller can fall back to Helvetica + Latin-1 transliteration.
 */
async function loadUnicodeFont(doc: JsPdfDoc): Promise<boolean> {
  try {
    const toBase64 = async (url: string): Promise<string> => {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`${url} ${res.status}`)
      const bytes = new Uint8Array(await res.arrayBuffer())
      let binary = ''
      for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
      return btoa(binary)
    }
    const [regular, bold] = await Promise.all([
      toBase64('/fonts/DejaVuSans-subset.ttf'),
      toBase64('/fonts/DejaVuSans-Bold-subset.ttf'),
    ])
    doc.addFileToVFS('DejaVuSans.ttf', regular)
    doc.addFont('DejaVuSans.ttf', 'DejaVuSans', 'normal')
    doc.addFileToVFS('DejaVuSans-Bold.ttf', bold)
    doc.addFont('DejaVuSans-Bold.ttf', 'DejaVuSans', 'bold')
    return true
  } catch {
    return false
  }
}

export async function generateTdsPdf(
  product: Product,
  kind: 'tds' | 'summary' = 'tds',
): Promise<void> {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })

  // Embed a Unicode font so β / ≥ / ≤ / en-dashes render as real glyphs.
  // If it fails, fall back to Helvetica + Latin-1 transliteration (fmt).
  const useUnicode = await loadUnicodeFont(doc)
  const FONT = useUnicode ? 'DejaVuSans' : 'helvetica'
  const fmt = useUnicode ? (s: string) => String(s) : sanitizePdfText
  doc.setFont(FONT, 'normal')

  const isSummary = kind === 'summary'
  const W = doc.internal.pageSize.getWidth()
  const H = doc.internal.pageSize.getHeight()
  const M = 48
  const right = W - M
  const docNo = `${isSummary ? 'SUM' : 'TDS'}-${product.productCode}-EN`
  let y = 0

  const setFill = (c: RGB) => doc.setFillColor(c[0], c[1], c[2])
  const setText = (c: RGB) => doc.setTextColor(c[0], c[1], c[2])
  const setDraw = (c: RGB) => doc.setDrawColor(c[0], c[1], c[2])

  // Pagination: content must never enter the footer zone. When a block would
  // cross FOOT, start a fresh page with a slim running header.
  const FOOT = H - 56
  function newPage() {
    doc.addPage()
    y = 56
    setText(C.sub)
    doc.setFont(FONT, 'normal')
    doc.setFontSize(7.5)
    doc.text(fmt(`${product.name} — ${isSummary ? 'Product Summary' : 'Technical Data Sheet'}`), M, y)
    doc.text(docNo, right, y, { align: 'right' })
    y += 8
    setDraw(C.line)
    doc.setLineWidth(0.5)
    doc.line(M, y, right, y)
    y += 24
  }
  function ensureSpace(needed: number) {
    if (y + needed > FOOT) newPage()
  }

  // ── Header band ───────────────────────────────────────────────────────────
  setFill(C.accentDark)
  doc.rect(0, 0, W, 92, 'F')
  setText(C.white)
  doc.setFont(FONT, 'bold')
  doc.setFontSize(15)
  doc.text(fmt(TDS.supplierName), M, 32)
  doc.setFont(FONT, 'normal')
  doc.setFontSize(8)
  doc.text(fmt(`${TDS.supplierTagline} · ${TDS.addressLine}`), M, 47)
  doc.text(fmt(TDS.manufacturerLine), M, 59)
  doc.text(fmt(`${TDS.website} · ${TDS.verifyEmail}`), M, 71)
  // right-aligned doc control
  doc.setFont(FONT,'bold')
  doc.setFontSize(11)
  doc.text(isSummary ? 'PRODUCT SUMMARY' : 'TECHNICAL DATA SHEET', right, 36, { align: 'right' })
  doc.setFont(FONT,'normal')
  doc.setFontSize(8)
  doc.text(`Doc No.  ${docNo}`, right, 52, { align: 'right' })
  doc.text(`Version  ${TDS.docVersion}   ·   Issued  ${TDS.issueDate}`, right, 64, { align: 'right' })
  doc.text('Controlled document', right, 76, { align: 'right' })

  y = 92

  // ── DRAFT placeholder banner (wraps within margins so nothing is clipped) ──
  if (TDS.isDraft) {
    doc.setFont(FONT, 'bold')
    doc.setFontSize(7.5)
    const draftRaw =
      'DRAFT — contains placeholder values (cert numbers, test methods, HS code, signatory). Replace with verified data before publishing.'
    const draftLines = doc.splitTextToSize(draftRaw, right - M)
    const bannerH = draftLines.length * 10 + 8
    setFill([252, 246, 234])
    doc.rect(0, y, W, bannerH, 'F')
    setText(C.warn)
    doc.text(draftRaw, M, y + 11, { align: 'justify', maxWidth: right - M })
    y += bannerH
  }

  // ── Product title ─────────────────────────────────────────────────────────
  y += 26
  setText(C.ink)
  doc.setFont(FONT,'bold')
  doc.setFontSize(20)
  doc.text(fmt(product.name), M, y)
  y += 16
  setText(C.sub)
  doc.setFont(FONT,'normal')
  doc.setFontSize(10)
  doc.text(fmt(product.tagline ?? ''), M, y)

  // ── Section helper ────────────────────────────────────────────────────────
  function section(title: string) {
    ensureSpace(58)
    y += 24
    setText(C.accent)
    doc.setFont(FONT,'bold')
    doc.setFontSize(10)
    doc.text(title.toUpperCase(), M, y)
    y += 6
    setDraw(C.line)
    doc.setLineWidth(0.8)
    doc.line(M, y, right, y)
    y += 16
  }

  function table(headers: string[], rows: string[][], colW: number[]) {
    const colX: number[] = []
    let acc = M
    colW.forEach(w => {
      colX.push(acc)
      acc += w
    })
    const render = (cells: string[], head: boolean) => {
      doc.setFont(FONT,head ? 'bold' : 'normal')
      doc.setFontSize(head ? 8 : 9)
      setText(head ? C.sub : C.ink)
      const wrapped = cells.map((c, i) => doc.splitTextToSize(fmt(c), colW[i] - 10))
      const nLines = Math.max(...wrapped.map(w => w.length))
      const rowH = nLines * 11 + 8
      if (head) {
        setFill(C.altBg)
        doc.rect(M, y - 2, right - M, rowH, 'F')
      }
      wrapped.forEach((w, i) => doc.text(w, colX[i] + 3, y + 8))
      y += rowH
      setDraw(C.line)
      doc.setLineWidth(0.5)
      doc.line(M, y, right, y)
    }
    const rowHeight = (cells: string[]) => {
      const n = Math.max(...cells.map((c, i) => doc.splitTextToSize(fmt(c), colW[i] - 10).length))
      return n * 11 + 8
    }
    render(headers, true)
    rows.forEach(r => {
      // Break before a row that would cross the footer, repeating the header.
      if (y + rowHeight(r) > FOOT) {
        newPage()
        render(headers, true)
      }
      render(r, false)
    })
  }

  // ── Description ───────────────────────────────────────────────────────────
  section('Product description')
  setText(C.ink)
  doc.setFont(FONT,'normal')
  doc.setFontSize(9.5)
  const descRaw = fmt(product.fullDescription ?? product.shortDescription ?? '')
  const descLines = doc.splitTextToSize(descRaw, right - M)
  ensureSpace(descLines.length * 12)
  doc.text(descRaw, M, y, { align: 'justify', maxWidth: right - M })
  y += descLines.length * 12

  // ── Identity grid (stacked label/value, value wraps within its column) ────
  section('Product identity')
  const identity: [string, string][] = [
    ['Product code', product.productCode],
    ['HS code', `${TDS.defaultHsCode}  (TODO verify)`],
    ['Origin', TDS.defaultOrigin],
    ['Category', String(product.category).replace(/-/g, ' ')],
    ['Packaging', product.packaging ?? '-'],
    ['Shelf life', product.shelfLife ?? '-'],
  ]
  const colW2 = (right - M) / 2
  for (let i = 0; i < identity.length; i += 2) {
    const pair = [identity[i], identity[i + 1]].filter(Boolean) as [string, string][]
    const cells = pair.map(kv => ({
      label: kv[0],
      vlines: doc.splitTextToSize(fmt(kv[1]), colW2 - 14) as string[],
    }))
    const rowLines = Math.max(...cells.map(c => c.vlines.length))
    cells.forEach((c, ci) => {
      const x = M + ci * colW2
      setText(C.sub)
      doc.setFont(FONT, 'normal')
      doc.setFontSize(7.5)
      doc.text(c.label.toUpperCase(), x, y)
      setText(C.ink)
      doc.setFont(FONT, 'bold')
      doc.setFontSize(9)
      doc.text(c.vlines, x, y + 12)
    })
    y += 12 + rowLines * 11 + 12
  }

  // ── Specifications (with Method column — key trust signal) ────────────────
  section('Specifications')
  table(
    ['Parameter', 'Specification', 'Test method'],
    product.specifications.map(s => [s.label, String(s.value), methodFor(s.label)]),
    [200, 160, right - M - 360],
  )

  // ── Recommended dosage ────────────────────────────────────────────────────
  if (product.dosages?.length) {
    section('Recommended inclusion rate')
    table(
      ['Target species', 'Inclusion rate', 'Notes'],
      product.dosages.map(d => [d.label, `${d.value} ${d.unit}`, d.note ?? '—']),
      [180, 150, right - M - 330],
    )
  }

  // ── Certifications ────────────────────────────────────────────────────────
  if (product.certifications?.length) {
    section('Certifications')
    setText(C.ink)
    doc.setFont(FONT,'normal')
    doc.setFontSize(9)
    product.certifications.forEach(code => {
      ensureSpace(14)
      doc.text(fmt(`- ${certLabel(code)}`), M, y)
      y += 14
    })
  }

  // ── Disclaimer + QMS statement ────────────────────────────────────────────
  doc.setFont(FONT, 'normal')
  doc.setFontSize(8)
  const discRaw = fmt(
    'Values represent the typical product specification and are NOT a batch certificate. ' +
      'For batch-specific analytical results, request a Certificate of Analysis (COA) for the relevant lot. ' +
      TDS.qmsStatement +
      ' To verify the authenticity of this document, contact ' +
      TDS.verifyEmail +
      '.',
  )
  const discLines = doc.splitTextToSize(discRaw, right - M - 24)
  const boxH = discLines.length * 11 + 20
  ensureSpace(boxH + 16)
  y += 12
  setFill(C.altBg)
  setDraw(C.line)
  doc.setLineWidth(0.8)
  const boxTop = y
  doc.rect(M, boxTop, right - M, boxH, 'FD')
  setText(C.sub)
  doc.text(discRaw, M + 12, boxTop + 14, { align: 'justify', maxWidth: right - M - 24 })
  y = boxTop + boxH

  // ── Signature block (TDS only — summaries are not QA-signed) ──────────────
  if (!isSummary) {
    ensureSpace(50)
    y += 26
    setDraw(C.ink)
    doc.setLineWidth(0.8)
    doc.line(M, y, M + 180, y)
    y += 12
    setText(C.ink)
    doc.setFont(FONT,'bold')
    doc.setFontSize(9)
    doc.text(fmt(TDS.qaSignatory), M, y)
    setText(C.sub)
    doc.setFont(FONT, 'normal')
    doc.setFontSize(8)
    doc.text(fmt('Product specification approved by the manufacturer'), M, y + 11)
  }

  // ── Footer (every page) ───────────────────────────────────────────────────
  const pageCount = doc.getNumberOfPages()
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p)
    setDraw(C.line)
    doc.setLineWidth(0.5)
    doc.line(M, H - 38, right, H - 38)
    setText(C.sub)
    doc.setFont(FONT,'normal')
    doc.setFontSize(7)
    doc.text(
      `${docNo} · ${TDS.docVersion} · Confidential — for evaluation only, do not redistribute · Uncontrolled when printed`,
      M,
      H - 24,
    )
    doc.text(`Page ${p} of ${pageCount}`, right, H - 24, { align: 'right' })
    doc.text(fmt(`© ${TDS.supplierName}`), right, H - 14, { align: 'right' })
  }

  doc.save(`${product.slug}-${isSummary ? 'Summary' : 'TDS'}-${TDS.docVersion}.pdf`)
}
