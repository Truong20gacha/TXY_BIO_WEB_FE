# CTA Panel Build Spec — 3 Buttons on Product Detail Page

> **Mục đích:** Tài liệu spec đầy đủ để build 3 panel UX cho 3 nút CTA (`Request a sample` / `Talk to sales` / `Request datasheet`) trên trang chi tiết sản phẩm.
>
> **Đầu vào:** đã có panel JSON từ `generate_panel_json.py` (xem `datasheet-template/`)
>
> **Đầu ra mong muốn:** 3 React component + 1 shared layout, consume panel JSON theo intent.
>
> **Phạm vi:** Frontend only. Backend submit handler (gửi email, lưu DB) ngoài phạm vi.

---

## 🧭 Navigation

- [1. Design system thống nhất](#1-design-system-thống-nhất)
- [2. Layout chung — 2-column shell](#2-layout-chung--2-column-shell)
- [3. Spec từng panel](#3-spec-từng-panel)
  - [3.1 Request a sample](#31-request-a-sample)
  - [3.2 Talk to sales](#32-talk-to-sales)
  - [3.3 Request datasheet](#33-request-datasheet)
- [4. Component architecture](#4-component-architecture)
- [5. Behavior & validation](#5-behavior--validation)
- [6. Submit handling](#6-submit-handling)
- [7. Mapping JSON → UI](#7-mapping-json--ui)
- [8. Accessibility checklist](#8-accessibility-checklist)
- [9. Mobile responsive](#9-mobile-responsive)

---

## 1. Design system thống nhất

### Color tokens

| Token | Hex | Dùng cho |
|---|---|---|
| `--cta-sample` | `#0F6E56` (teal-700) | CTA button của nút Sample, dot indicator |
| `--cta-sample-hover` | `#085041` (teal-800) | Hover state |
| `--cta-sales` | `#185FA5` (blue-700) | CTA button của nút Sales, dot indicator |
| `--cta-sales-hover` | `#0C447C` (blue-800) | Hover state |
| `--cta-datasheet` | `#534AB7` (purple-700) | CTA button của nút Datasheet, dot indicator |
| `--cta-datasheet-hover` | `#3C3489` (purple-800) | Hover state |
| `--notice-amber-bg` | `#FAEEDA` | Notice "export control" / "confidential" |
| `--notice-amber-text` | `#633806` | Text trong notice amber |
| `--notice-info-bg` | `#E6F1FB` | Notice info (response time) |
| `--notice-info-text` | `#0C447C` | Text trong notice info |

**Quyết định màu CTA khác nhau theo intent (không thống nhất):**
- **Teal** cho Sample = action-commit (làm gì đó cụ thể: ship product)
- **Blue** cho Sales = trust-commit (cam kết thương mại)
- **Purple** cho Datasheet = info-commit (lấy tài liệu)
- → Mỗi màu có *meaning*, không phải decoration. User nhận diện ngay là loại request nào qua màu CTA.

### Typography

- Font: stack hiện có (Inter / system fonts)
- Headline left panel: 18px / weight 500
- Form title: 15px / weight 500
- Body text: 13px / weight 400 / line-height 1.6
- Label: 12px / weight 500 / color secondary
- Helper text (vd "— helps us qualify"): 11px / weight 400 / color tertiary
- Section divider: 11px / weight 500 / UPPERCASE / letter-spacing 0.4px

### Spacing & sizing

- Card padding: `20px`
- Card border: `0.5px solid var(--border-tertiary)`
- Card border radius: `var(--border-radius-lg)` (12px)
- Gap giữa 2 column: `20px` (desktop) / 0 stacked (mobile)
- Field margin-bottom: `14px`
- Section divider margin: `18px 0 10px`
- Input height: 36px standard

### Iconography

Dùng **Tabler outline icons** (font webfont) — không hand-draw SVG.

| Concept | Icon |
|---|---|
| Sample | `ti-package` |
| Sales | `ti-message-circle` |
| Datasheet | `ti-file-text` |
| Lead time | `ti-clock` |
| Shipping | `ti-truck` |
| Cost | `ti-coin` |
| Payment | `ti-credit-card` |
| Incoterms / shipping | `ti-ship` |
| Contact section | `ti-user` |
| Datasheet section | `ti-file-text` |
| Sample qualification section | `ti-package` |
| Quote details section | `ti-currency-dollar` |
| Confidential / lock | `ti-lock` |
| Info notice | `ti-info-circle` |
| Warning / export control | `ti-shield-check` |
| Checkmark (included items) | `ti-check` (color: teal-600 `#1D9E75`) |
| Bullet (sales deliverables) | `ti-circle-dot` (color: blue-700 `#185FA5`) |
| Bullet (datasheet contents) | `ti-clipboard-check` (color: amber-600 `#BA7517`) |
| Submit button | `ti-send` |

### Notice components

2 variants:
- **Amber** — dùng cho cảnh báo / điều kiện (export control, confidentiality)
- **Info (blue)** — dùng cho thông tin tích cực (response time, available terms)

Structure:
```html
<div class="notice notice--{variant}">
  <i class="ti ti-{icon}" aria-hidden="true"></i>
  <span>Notice text here</span>
</div>
```

---

## 2. Layout chung — 2-column shell

```
┌─────────────────────────────────────────────────┐
│  Page header / breadcrumb (outside panel)       │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌──────────────────┬──────────────────────┐    │
│  │  LEFT CARD       │  RIGHT CARD (FORM)   │    │
│  │                  │                       │    │
│  │  [Product pill]  │  Form title          │    │
│  │  Headline        │  Form sub            │    │
│  │  Summary         │                       │    │
│  │                  │  [Section: Contact]   │    │
│  │  [Highlights     │  • name, email       │    │
│  │   2×2 grid OR    │  • company, country  │    │
│  │   thumbnail PDF] │                       │    │
│  │                  │  [Section: Intent     │    │
│  │  [Section list]  │   specific]          │    │
│  │  • bullets       │  • dynamic fields    │    │
│  │                  │                       │    │
│  │  [Notice]        │  [CTA button]        │    │
│  └──────────────────┴──────────────────────┘    │
│                                                  │
└─────────────────────────────────────────────────┘
```

**Grid CSS:**
```css
.cta-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  gap: 20px;
}
```

Lý do tỉ lệ 1 : 1.15 — form bên phải cần thêm chút không gian cho field 2 cột.

---

## 3. Spec từng panel

### 3.1 Request a sample

**Intent slug:** `sample`
**URL:** `/contact?intent=sample&product={slug}`
**Data source:** `{slug}_panel_sample.json`

#### Left card content

```
[Pill] TXY-MOS-P · Yeast Cell Wall (Poultry)

Headline: "What you'll receive"
Sub: "A free 300g sample for lab evaluation, shipped via express courier with full documentation."

[Highlights 2×2]
┌─────────────┬──────────────┐
│ Sample size │ Cost         │
│ 300 g       │ Free product │
├─────────────┼──────────────┤
│ Shipping    │ Lead time    │
│ Buyer pays  │ 1–2 weeks    │
└─────────────┴──────────────┘

[Section: Documents included]
✓ Certificate of Analysis (COA)
✓ Material Safety Data Sheet (MSDS)
✓ Technical Data Sheet (TDS)

[Section: Next steps]
① Sample team reviews and confirms eligibility — within 1 business day
② Sample dispatched — 3–5 business days from approval
③ Delivered to your address — 3–10 days via express courier

[Notice amber]
🛡 Subject to export control screening.
   Cannot ship to US/EU/UN-sanctioned destinations.
```

**Source mapping (panel JSON → UI):**

| UI element | JSON path |
|---|---|
| Pill text | `product.item_code` + `product.name` |
| Headline | `headline` |
| Sub | derived: "A free {sample_size} sample for lab evaluation..." (or hard-code) |
| Highlights | `highlights[]` (already in shape) |
| Documents list | `documents_included[]` |
| Next steps | `next_steps[]` |
| Notice text | `restricted_note` |

#### Right card form

**Section 1 — Contact** (icon `ti-user`)
| Field | Type | Required | Notes |
|---|---|---|---|
| Full name | text | ✅ | placeholder "John Smith" |
| Work email | email | ✅ | placeholder "john@company.com" |
| Company name | text | ✅ | placeholder "Acme Feed Co." |
| Country | select | ✅ | dropdown list |

**Section 2 — Sample qualification** (icon `ti-package`)
| Field | Type | Required | Notes |
|---|---|---|---|
| Intended application | select | ✅ | options từ `form_fields_extra` panel JSON |
| Estimated annual volume | select | ✅ | helper: "— helps us qualify" |
| Shipping address | textarea (2 rows) | ✅ | placeholder "Full address with postal code" |
| Special requirements | textarea (2 rows) | ❌ | helper: "— optional", placeholder examples |

**CTA button:**
- Color: `--cta-sample` (teal)
- Icon: `ti-send`
- Label: "Request sample"
- onClick: submit handler (xem section 6)

---

### 3.2 Talk to sales

**Intent slug:** `quote`
**URL:** `/contact?intent=quote&product={slug}`
**Data source:** `{slug}_panel_sales.json`

#### Left card content

```
[Pill] TXY-MOS-P

Headline: "What sales will send back"
Sub: "A complete quotation package tailored to your market, volume, and preferred Incoterms — within 1 business day."

[Highlights 2×2]
┌─────────────┬──────────────────┐
│ MOQ         │ Production       │
│ 1,000 kg    │ 10–14 days       │
├─────────────┼──────────────────┤
│ Incoterms   │ Payment          │
│ FOB SH/QD   │ 30/70 T/T or L/C │
└─────────────┴──────────────────┘

[Section: You'll receive]
• Price quotation (FOB / CIF / CFR — your choice)
• Lead time estimate to your destination port
• Sample shipment arrangement if not already sent
• Draft sales contract for review
• Available certifications for your market

[Trust strip — secondary background]
20+ years in business · ISO 9001 & 22000 certified · Halal & Kosher
Serving feed manufacturers across APAC, EU, and MEA since 2003.

[Notice info]
ℹ Response time: within 1 business day.
  Net terms available for established partners after 3+ orders.
```

**Source mapping:**

| UI element | JSON path |
|---|---|
| Pill text | `product.item_code` |
| Highlights | `highlights[]` |
| Bullet list | `quote_deliverables[]` |
| Trust strip | `trust_strip.summary` (composed string) |
| Notice info | `response_sla` (composed string) |

#### Right card form

**Section 1 — Contact** (same as Sample form)

**Section 2 — Quote details** (icon `ti-currency-dollar`)
| Field | Type | Required | Notes |
|---|---|---|---|
| Target market | text | ✅ | placeholder "e.g., Vietnam" |
| Destination port | text | ❌ | helper: "— optional", placeholder "e.g., Hai Phong" |
| Estimated annual volume | select | ✅ | options "1–10 MT", "10–50 MT", "50–100 MT", "100–500 MT", "500+ MT" |
| Preferred Incoterms | select | ❌ | options từ panel JSON |
| First order timing | select | ❌ | options "Just exploring" → "Within 1 month" → "1–3 months" → "3–6 months" |
| Required certifications | multi-checkbox grid (2 cols) | ❌ | Halal / Kosher / Non-GMO / GMP+ / FAMI-QS / Other — helper: "— for your market" |

**CTA button:**
- Color: `--cta-sales` (blue)
- Icon: `ti-send`
- Label: "Get a quote"

---

### 3.3 Request datasheet

**Intent slug:** `datasheet`
**URL:** `/contact?intent=datasheet&product={slug}`
**Data source:** `{slug}_panel_datasheet.json`

#### Left card content

```
[Pill] TXY-MOS-P

Headline: "What's inside this datasheet"
Sub: "Full technical specs, microbiological & safety data, dosage, and compliance — sent within 1 business day after review."

[PDF thumbnail card — clickable to preview]
┌────┬────────────────────────┐
│📄  │ TXY-MOS-P_datasheet.pdf │
│PDF │ 4 pages · ~180 KB · A4 │
│mock│ View sample preview →  │
└────┴────────────────────────┘

[Section: Inside]
📋 Product description & manufacturing process
📋 Typical composition & key actives
📋 Microbiological specifications
📋 Heavy metals & mycotoxin limits
📋 Recommended dosage & target species
📋 Storage, packaging & certifications

[Notice amber]
🔒 Datasheets contain confidential composition data —
   sent to qualified buyers only.
```

**PDF thumbnail mock-up structure (placeholder until real preview):**
```html
<div class="pdf-thumb-mock" aria-hidden="true">
  <div class="pdf-thumb-bar"></div> <!-- amber bar simulating header -->
  <div class="pdf-thumb-line"></div>
  <div class="pdf-thumb-line pdf-thumb-line--short"></div>
  ... <!-- more lines -->
</div>
```

Khi có PDF thật, thay bằng `<img src="/datasheets/preview/{slug}.jpg" />` (render từ page 1).

**Source mapping:**

| UI element | JSON path |
|---|---|
| Pill text | `product.item_code` |
| Headline | `headline` |
| Sub | `summary` |
| PDF filename | `datasheet_pdf_filename` |
| PDF metadata | derived ("4 pages · ~180 KB · A4") — hardcode hoặc thêm field vào JSON |
| Contents bullets | `contents[]` |
| Notice text | `confidentiality_note` |

#### Right card form

**Section 1 — Contact** (same as above)

**Section 2 — Tailor your datasheet** (icon `ti-file-text`)
| Field | Type | Required | Notes |
|---|---|---|---|
| Target species | multi-checkbox grid (2 cols) | ✅ | Broilers / Layers / Breeders / Turkey / Duck / Other |
| Target market | text | ❌ | helper: "— optional", placeholder "e.g., EU, GCC" |
| Reason for request | select | ✅ | options từ `form_fields_extra` |
| Specs of interest | multi-checkbox grid (2 cols) | ❌ | helper: "— optional"; options: MOS/β-glucan content / Microbiology / Heavy metals & mycotoxins / Dosage rates / Shelf life / Packaging |
| Benchmarking against | text | ❌ | helper: "— optional", placeholder "e.g., Alltech Actigen, Phileo Safmannan" |

**CTA button:**
- Color: `--cta-datasheet` (purple)
- Icon: `ti-send`
- Label: "Request datasheet"

---

## 4. Component architecture

### File structure đề xuất

```
frontend/src/
├── pages/
│   └── ContactPage.tsx           # Route /contact, đọc query param ?intent=
├── sections/contact/
│   ├── CtaPanelLayout.tsx        # 2-column shell shared
│   ├── panels/
│   │   ├── SamplePanel.tsx       # Left card cho intent=sample
│   │   ├── SalesPanel.tsx        # Left card cho intent=quote
│   │   └── DatasheetPanel.tsx    # Left card cho intent=datasheet
│   ├── forms/
│   │   ├── SampleForm.tsx        # Right card form cho sample
│   │   ├── SalesForm.tsx         # Right card form cho quote
│   │   └── DatasheetForm.tsx     # Right card form cho datasheet
│   └── shared/
│       ├── ContactFieldset.tsx   # Section 1 chung (name/email/company/country)
│       ├── HighlightGrid.tsx     # 2×2 highlights grid
│       ├── BulletList.tsx        # ✓ / • / 📋 list với icon variant
│       ├── Notice.tsx            # Notice component (amber / info variant)
│       ├── SectionDivider.tsx    # Divider có icon
│       ├── CheckboxGrid.tsx      # Multi-checkbox 2-column grid
│       └── CtaButton.tsx         # Submit button có color theo intent
├── data/panels/
│   ├── txy-mos-p_panel_sample.json
│   ├── txy-mos-p_panel_sales.json
│   ├── txy-mos-p_panel_datasheet.json
│   └── ... (cho 11 SKU còn lại)
└── lib/
    └── panelLoader.ts            # Hàm load panel JSON theo (slug, intent)
```

### Routing logic

```tsx
// ContactPage.tsx
export function ContactPage() {
  const [searchParams] = useSearchParams();
  const intent = searchParams.get('intent') as 'sample' | 'quote' | 'datasheet';
  const productSlug = searchParams.get('product') ?? 'default';

  const panel = usePanel(productSlug, intent);

  if (!panel) return <LoadingState />;

  return (
    <CtaPanelLayout>
      {intent === 'sample' && (
        <>
          <SamplePanel panel={panel} />
          <SampleForm panel={panel} />
        </>
      )}
      {intent === 'quote' && (
        <>
          <SalesPanel panel={panel} />
          <SalesForm panel={panel} />
        </>
      )}
      {intent === 'datasheet' && (
        <>
          <DatasheetPanel panel={panel} />
          <DatasheetForm panel={panel} />
        </>
      )}
    </CtaPanelLayout>
  );
}
```

### Panel loader hook

```tsx
// lib/panelLoader.ts
const PANELS = import.meta.glob('/src/data/panels/*.json', { eager: true });

export function usePanel(slug: string, intent: string): PanelData | null {
  const key = `/src/data/panels/${slug}_panel_${intent}.json`;
  const mod = PANELS[key] as { default: PanelData } | undefined;
  return mod?.default ?? null;
}
```

(Vite-specific. Cho Next.js dùng `import()` dynamic.)

### Type definitions

```typescript
// types/panel.ts
type Intent = 'sample' | 'quote' | 'datasheet';

type FormField = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'textarea' | 'multi-check';
  required: boolean;
  options?: string[];
  max_length?: number;
};

type Highlight = {
  icon: string;       // tabler icon name without "ti-" prefix
  label: string;
  value: string;
};

type BasePanelData = {
  intent: Intent;
  product: { item_code: string; name: string };
  headline: string;
  form_fields_extra: FormField[];
};

type SamplePanelData = BasePanelData & {
  highlights: Highlight[];
  documents_included: string[];
  documents_on_request: string[];
  qualification_criteria: string[];
  restricted_note: string;
  review_time: string;
  next_steps: string[];
};

type SalesPanelData = BasePanelData & {
  highlights: Highlight[];
  response_sla: string;
  quote_deliverables: string[];
  trust_strip: {
    years_in_business: string;
    countries_served: string;
    established_year: number | string;
    summary: string;
  };
};

type DatasheetPanelData = BasePanelData & {
  summary: string;
  contents: string[];
  confidentiality_note: string;
  datasheet_pdf_url: string;
  datasheet_pdf_filename: string;
};

type PanelData = SamplePanelData | SalesPanelData | DatasheetPanelData;
```

---

## 5. Behavior & validation

### Client-side validation rules

| Field | Rule |
|---|---|
| Full name | Min 2 chars, max 100 chars |
| Work email | RFC 5322 format. **Block free providers** (gmail.com, yahoo.com, qq.com, 163.com) cho intent=quote (chỉ B2B). Warning soft (không block) cho intent=sample/datasheet |
| Company name | Min 2 chars, max 100 chars |
| Country | Must select (not placeholder) |
| Shipping address | Min 10 chars (sample only) |
| Target market | Min 2 chars (sales only) |
| Multi-checkbox required | At least 1 option checked (target species cho datasheet) |

### Inline errors

- Hiển thị error text dưới field, màu `--notice-amber-text` `#A32D2D`
- Error font-size: 11px
- Border field khi error: `0.5px solid #A32D2D`
- Trigger validation: `onBlur` (không validate khi user còn đang gõ)

### Success state

Sau khi submit thành công → navigate sang `/contact/success?intent={intent}` hoặc inline:

```
✓ Thank you!

[For sample]
Your sample request for TXY-MOS-P has been received.
Our sample team will review within 1 business day and email you confirmation.

[For sales]
Your quote request has been received.
A sales representative will email you within 1 business day with a complete quotation package.

[For datasheet]
Your datasheet request has been received.
The PDF will be emailed to john@company.com within 1 business day after review.

[Return to product →]  [Browse more products →]
```

---

## 6. Submit handling

### Hiện trạng

Form hiện submit `console.log()` only (xem `InquiryForm.tsx:96-99`).

### Đề xuất submit flow

```typescript
async function handleSubmit(formData: FormData, intent: Intent, productSlug: string) {
  // 1. Validate
  const errors = validate(formData, intent);
  if (errors.length > 0) {
    showInlineErrors(errors);
    return;
  }

  // 2. Submit to backend
  try {
    const response = await fetch('/api/cta-submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intent,
        productSlug,
        formData: Object.fromEntries(formData),
        submittedAt: new Date().toISOString(),
        utm: getUtmParams(),
      }),
    });

    if (!response.ok) throw new Error('Submit failed');

    // 3. Analytics event
    trackEvent('cta_submit', { intent, productSlug });

    // 4. Navigate to success
    navigate(`/contact/success?intent=${intent}`);
  } catch (err) {
    showError("Submit failed. Please try again or email us directly at info@txybio.com");
  }
}
```

### Backend endpoint contract (out of scope but specified)

`POST /api/cta-submit`

Request body:
```json
{
  "intent": "sample" | "quote" | "datasheet",
  "productSlug": "txy-mos-p",
  "formData": {
    "full_name": "John Smith",
    "work_email": "john@company.com",
    "company_name": "Acme Feed Co.",
    "country": "Vietnam",
    // intent-specific fields...
  },
  "submittedAt": "2026-05-25T10:30:00Z",
  "utm": { "source": "google", "medium": "cpc", "campaign": "yeast-q2" }
}
```

Response:
```json
{ "ok": true, "ticketId": "REQ-2026-001234" }
```

Backend phải:
1. Validate lại server-side (đừng tin client)
2. Lưu vào DB hoặc CRM (HubSpot/Salesforce)
3. Gửi notification email cho sales team (`sales@txybio.com`)
4. Gửi confirmation email cho user
5. (Cho datasheet) — đính kèm PDF file trong email reply, hoặc redirect user đến signed S3 URL

---

## 7. Mapping JSON → UI

Tham khảo cụ thể từng intent ở [section 3](#3-spec-từng-panel). Tổng quan:

| Panel JSON field | UI position |
|---|---|
| `product.item_code` | Pill ở left card |
| `product.name` | (tùy chọn) bên cạnh item_code |
| `headline` | Heading lớn bên left card |
| `highlights[]` | 2×2 grid (sample + sales only) |
| `documents_included[]` | Bullet list với ✓ icon (sample) |
| `quote_deliverables[]` | Bullet list với • icon (sales) |
| `contents[]` | Bullet list với 📋 icon (datasheet) |
| `next_steps[]` | Numbered stepper (sample) |
| `trust_strip` | Secondary background block (sales) |
| `restricted_note` / `confidentiality_note` | Notice amber |
| `response_sla` | Notice info |
| `form_fields_extra[]` | Render dynamic trong Section 2 của form |

### Dynamic form field renderer

```tsx
function FormField({ field }: { field: FormField }) {
  switch (field.type) {
    case 'text':
    case 'email':
      return <input type={field.type} name={field.name} required={field.required} />;
    case 'select':
      return (
        <select name={field.name} required={field.required}>
          <option value="">Select {field.label.toLowerCase()}…</option>
          {field.options?.map(opt => <option key={opt}>{opt}</option>)}
        </select>
      );
    case 'textarea':
      return <textarea name={field.name} rows={2} required={field.required} />;
    case 'multi-check':
      return (
        <CheckboxGrid options={field.options ?? []} name={field.name} />
      );
  }
}
```

---

## 8. Accessibility checklist

- [ ] Mỗi `<input>` / `<select>` / `<textarea>` có `<label>` link đúng (`htmlFor` = `id`)
- [ ] Required field marker `*` có `aria-required="true"` trên input
- [ ] Icon decorative dùng `aria-hidden="true"` (đa số icon trong panel này)
- [ ] CTA button có text rõ ràng, không phải icon-only
- [ ] Form error messages link với field qua `aria-describedby`
- [ ] Notice / important content có role appropriate (`role="note"` cho notice info, `role="alert"` cho error)
- [ ] Color contrast text trong notice ≥ 4.5:1 (đã check: amber-800 trên amber-50 = 8.2:1 ✓)
- [ ] Tab order tự nhiên: contact → intent-specific → CTA
- [ ] Skip link / heading hierarchy đúng: page H1 → panel headline H2 → section divider không phải heading (dùng span styled)
- [ ] PDF thumbnail clickable phải có `aria-label="Preview datasheet sample"`
- [ ] Loading state có `aria-busy="true"` trong form submit

---

## 9. Mobile responsive

### Breakpoints

- `>= 768px` — desktop layout (2 column)
- `< 768px` — stacked (1 column), left card lên trên form

### Mobile adjustments

```css
@media (max-width: 768px) {
  .cta-layout { grid-template-columns: 1fr; gap: 16px; }
  .field-row { grid-template-columns: 1fr; }
  .checkbox-grid { grid-template-columns: 1fr; }
  .highlights { grid-template-columns: 1fr 1fr; } /* keep 2x2 even on mobile */
  .card { padding: 16px; }
}
```

### Mobile UX considerations

- **Form ngắn nhất có thể** — mobile users có patience thấp hơn
- **Sticky CTA** ở bottom of viewport khi scroll (optional enhancement)
- **Auto-focus** field đầu tiên khi page load (Full name)
- **Numeric keyboard** cho phone field (nếu có): `inputMode="tel"`
- **Email keyboard**: `inputMode="email"`

---

## 10. Snapshot trạng thái hiện tại

Trước khi build các component này, đối chiếu với file gốc `CTA-INVESTIGATION.md`:

- ✅ 3 nút đã có UI ở `frontend/src/pages/ProductDetailPage.tsx:171-207`
- ✅ Route `/contact?intent=X&product=Y` hoạt động, form pre-fill đúng
- ✅ Form copy đổi theo intent (`ContactPage.tsx:22-38`)
- ⚠️ Form submit chỉ `console.log()` (`InquiryForm.tsx:96-99`) — chưa có backend
- ⚠️ `DATASHEETS_READY = false` → nút Datasheet đang dùng Hướng B (form request)
- ✅ Panel JSON đã có (`datasheet-template/txy-mos-p_panel_{sample,sales,datasheet}.json`)
- ✅ PDF datasheet generator đã có (`datasheet-template/datasheet_generator.py`)
- ⏳ **3 React component theo spec này** — chưa build

## 11. Files liên quan

| File | Vai trò |
|---|---|
| `CTA-INVESTIGATION.md` | Yêu cầu UX ban đầu (file gốc của user) |
| `CTA-RESEARCH-FINDINGS.md` | Industry benchmark + smart defaults |
| `datasheet-template/README.md` | Hướng dẫn dùng PDF generator + panel extractor |
| `datasheet-template/product_data_template.json` | Schema JSON master |
| `datasheet-template/datasheet_generator.py` | Build PDF datasheet |
| `datasheet-template/generate_panel_json.py` | Extract panel JSON cho frontend |
| **`CTA-PANEL-BUILD-SPEC.md`** | **File này — spec UI build cho 3 panel** |

---

**Version:** 1.0
**Updated:** 2026-05-25
**Status:** Ready for implementation
