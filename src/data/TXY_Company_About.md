# TXY Biotech — Company / About Page Canonical Data

> **Nguồn:** `TXY group company brief introduction.pptx` (6 slides) + cross-reference các PDF brochure (`Heath-care Food Materials`, `Yeast Extract Food Ingredient`, `Yeast for Feed 2025`) + website `www.txybio.com`.
>
> **Mục đích:** Single source of truth cho trang **About**. Khi update từng phần thì lấy từ file này.
>
> **Ký hiệu:** 🔴 = critical fact (FE đang BỊA, phải sửa) · 🟢 = enhancement (FE chưa có, thêm để credible hơn) · ⏸️ = giữ nguyên

---

## 1. 🏢 Company Identity

| Field | Canonical (PPT/Web) | FE hiện tại |
|---|---|---|
| **Brand (EN)** | **TXY** (TianXiangYuan) | "TXYbio" 🔴 |
| **Brand (CN)** | **天香苑** (TianXiangYuan) | (không có) 🟢 |
| **Legal name (EN)** | **ZHUHAI TXY BIOTECH HOLDING CO., LTD** | "TXYbio Co., Ltd" 🔴 |
| **Legal name (CN)** | 珠海天香苑生物科技发展股份有限公司 | (không có) 🟢 |
| **Tagline (EN)** | **"Focus on Yeast Industry 30 Years"** | "Yeast biotech for nutrition and fermentation." 🔴 |
| **Tagline (CN)** | 专注酵母产业 30年 | (không có) 🟢 |
| **Founded** | **2010** (Zhuhai TXY founded) | "2003" 🔴 |
| **Years in business** | 30+ (TianXiangYuan brand has been in yeast industry 30 years) | "30+" ✅ |
| **Industry position** | "Pioneer in the yeast fermentation industry" | giữ ⏸️ |
| **Website** | http://www.txybio.com | ⏸️ |
| **Hotline** | 4006-0756-16 | 🟢 thêm vào Footer |

---

## 2. 📍 Headquarters & Locations

| Field | Canonical | FE hiện tại |
|---|---|---|
| **HQ City** | **Zhuhai, Guangdong** (Doumen District, Baijiao Industrial Development Zone) | "Shanghai" 🔴 |
| **HQ Address** | No. 8 Jingwei Road, Baijiao Industrial Development Zone, Doumen District, Zhuhai City, Guangdong Province | (chưa có) 🟢 |
| **HQ Tel** | +86-756-3929005 · +86-756-5230386 | (chưa verify) |
| **HQ Email** | txyxhr@txybio.com | (chưa verify) |
| **Country** | China | ✅ |

---

## 3. 🏗️ Company Structure (3 entity REAL, không phải 3 fictional)

PPT Slide 2 vẽ org chart rõ ràng:

```
                Zhuhai TXY Biotech Holding Co., Ltd
                (parent / holding entity)
                          │
        ┌─────────────────┼─────────────────────┐
        │                 │                     │
   Holds 80%         Wholly-owned         Wholly-owned
   shares of         subsidiary           subsidiary
        │                 │                     │
   Guangdong         Zhanjiang            Zhuhai
   Wuzhou            Wuzhou Biology       WanFuKang
   Pharmaceutical    Engineering Co.      Biotechnology Co.
   Co., Ltd          Ltd                  Ltd
                     (acquired 2015)
```

### Schema đề xuất

```ts
subsidiaries: [
  {
    name: "Guangdong Wuzhou Pharmaceutical Co., Ltd",
    type: "Pharmaceutical / yeast medical applications",
    location: "Guangdong, China",
    ownership: "80%",         // ← field mới
    acquired: null            // ← field mới
  },
  {
    name: "Zhanjiang Wuzhou Biology Engineering Co., Ltd",
    type: "Production & Fermentation (8000 tons/year)",
    location: "Zhanjiang, China",
    ownership: "100%",
    acquired: "2015"
  },
  {
    name: "Zhuhai WanFuKang Biotechnology Co., Ltd",
    type: "Animal feed biotech (Wan Fu Kang brand)",
    location: "Zhuhai, China",
    ownership: "100%",
    acquired: null
  }
]
```

**FE hiện tại có 3 subsidiaries BỊA:** Suzhou R&D / Shanghai Production / Sydney Distribution — 🔴 cần thay hết.

---

## 4. 📜 History Timeline

| Year | Event |
|---|---|
| 2010 | **Zhuhai TXY Biotech Holding Co., Ltd founded** |
| 2015 | Acquired 100% shares of **Zhanjiang Wuzhou Biology Engineering Co., Ltd** |
| 30 years | TianXiangYuan brand has been "Focus on Yeast Industry" |
| present | 3-entity holding structure operating in domestic + overseas markets |

Có thể bổ sung milestone từ web nếu có thêm dữ liệu.

---

## 5. 🎯 Application Fields (4 lĩnh vực)

PPT Slide 3 list rõ:

1. **Food seasoning** (Food Ingredient)
2. **Health-care food** (Human Nutrition)
3. **Animal nutrition** (Animal Nutrition)
4. **Culture medium** (Microbial Nutrition / Industrial fermentation)

→ **Khớp 100%** với 4 category catalogue đã chuẩn hoá. Có thể link trực tiếp từ About → Products.

---

## 6. 🏭 Production Capacity

| Entity | Capacity |
|---|---|
| **Zhanjiang Wuzhou** | **8000 tons/year** |
| Zhuhai TXY (HQ) | (PPT không nêu số cụ thể) |
| WanFuKang | (PPT không nêu) |

🟢 **Fact rất quý cho trust signal** — nên đưa vào hero stat block của About page.

Suggested presentation: "**8,000 tons** annual production capacity at our Zhanjiang facility — supporting global B2B distribution since 2015."

---

## 7. 🛡️ Certifications & Quality Management

### Đã verify (badge images trong PPT Slide 5)

| Cert | Authority | Note |
|---|---|---|
| **ISO 22000:2018** | Food Safety Management System | Có badge UCC |
| **HACCP** | — | Mentioned in PPT text |
| **BRC** | British Retail Consortium (European Supply Chain Quality Management) | |
| **HALAL** | ARA, Indonesia (REPUBLIK INDONESIA / Majelis Ulama Indonesia) | Image có badge "SERTIFIKAT HALAL" |
| **Kosher** | SKS Badatz Shatz (Jewish Clean Food) | |
| **IAF** | International Accreditation Forum — Member of Multilateral Recognition Arrangement | |
| **CNAS C024-M** | China National Accreditation Service — Management System certified | |
| Sedex member | (mentioned in YE PDF) | Confirm với business |

→ FE hiện có 8 cert items (iso-22000, haccp, brc, iso-9001, gmp-plus, bap, halal, kosher) — **thiếu** `sedex`, `iaf`, `cnas`.

### Licenses & Filing Docs (PPT Slide 5 — 4 doc thật)

- **Business License** (营业执照)
- **Food Production License** (食品生产许可证)
- **Food Production License — Product Catalogue** (食品生产许可可品种明细表)
- **Export Food Production Enterprise Filing Certificate** (出口食品生产企业备案证明)
  - Filing No: 4400/19061
  - Filed entity: 湛江五洲生物工程有限公司 (Zhanjiang Wuzhou Biology Engineering Co., Ltd)
  - Authorised products: 高活性干酵母 (Active Dry Yeast) · 食用酵母 (Edible Yeast) · 营养酵母 (Nutritional Yeast) · 酵母抽提物 (Yeast Extract) · 酵母自溶物 (Yeast Autolysate) · 培养基用酵母加工制品 (Yeast for Culture Medium) · 酵母细胞壁 (Yeast Cell Wall) · 酵母粉/酵母β-葡聚糖 (Yeast Powder / Yeast β-Glucan) · 富营养酵母 (Nutrient-rich Yeast)

🟢 **Use case**: trang About có thể có 1 block "Export-licensed for these product categories" — show 9 product types với link cross-sell.

---

## 8. 🌐 Markets Served

PPT Slide 3 ngắn gọn: "Self produced and sold in both **domestic and overseas markets**."

PPT không khẳng định Australia là target chính → FE đang highlight "Australia · NZ" có thể là giả định marketing, không phải fact từ TXY.

| Region | FE hiện tại | PPT canonical |
|---|---|---|
| Domestic (China) | (không list) | ✅ confirmed |
| Overseas (global) | Australia + NZ + Europe + Americas + SE Asia | PPT chỉ nói "overseas" chung chung |

🔴 Cân nhắc: bỏ "Australia highlight" hoặc giữ làm strategic positioning cho website hướng Úc.

---

## 9. 🖼️ Asset Map — 17 ảnh từ PPT có thể dùng

| Image | Slide | Nội dung | Suggested use cho About |
|---|---|---|---|
| `image1.png` | 1 | Cover background (logo + brand) | — (template, không reusable) |
| `image2.jpeg` | 3 | **Zhuhai HQ building** (pink/teal exterior) | Hero or Subsidiary block: TXY Holding |
| `image3.jpeg` | 3 | TXY building front (clearer view) | Alt for HQ block |
| `image4.jpeg` | 4 | **Zhanjiang Wuzhou gate signage** | Subsidiary block: Zhanjiang Wuzhou |
| `image5.jpeg` | 4 | Zhanjiang Wuzhou main building aerial | Production capacity block |
| `image6.jpeg` | 4 | Zhanjiang Wuzhou modern HQ | Alt for Zhanjiang block |
| `image7.png` | 5 | ISO 22000 + IAF + CNAS badges | Cert showcase |
| `image8.png` | 5 | Kosher SKS Badatz badge | Cert showcase |
| `image9.png` | 5 | Halal Indonesia (MUI) badge | Cert showcase |
| `image10.png` | 5 | Business License (营业执照) doc | License gallery |
| `image11.png` | 5 | Food Production License | License gallery |
| `image12.png` | 5 | Food Production License catalogue | License gallery |
| `image13.jpeg` | 5 | Export Food Enterprise Filing Cert | License gallery (high impact for B2B) |
| `image14.png` | 5 | Halal Republik Indonesia full cert | Cert showcase |
| `image15.png` | 6 | Production plant — fermentation tower | Plant gallery |
| `image16.png` | 6 | Production plant — silo aerial | Plant gallery |
| `image17.jpeg` | 6 | Production plant — long building | Plant gallery |

📁 **Asset location for extraction**: `/tmp/txy-ppt/ppt/media/`

→ Cần move những ảnh dùng vào `/public/images/about/` với naming chuẩn (vd. `hq-zhuhai.jpeg`, `plant-zhanjiang-aerial.jpeg`, `cert-iso22000.png`...).

---

## 10. 📋 Đề xuất About page structure (rebuild)

Dựa trên canonical, đề xuất section:

1. **Hero** — Tagline "Focus on Yeast Industry 30 Years" + brand TXY/TianXiangYuan + short intro
2. **Company Profile** — Founded 2010, headquartered in Zhuhai Guangdong, holding company with 3 entities
3. **Holding Structure diagram** — 3-entity org chart (TXY parent + 80% Guangdong Wuzhou Pharma + 100% Zhanjiang Wuzhou + 100% WanFuKang)
4. **Production Capacity stat** — "**8,000 tons/year**" highlight + Zhanjiang facility image
5. **Application Fields grid** — 4 nhóm (Food Seasoning · Health-care Food · Animal Nutrition · Culture Medium) link tới Products
6. **Certifications & Licenses** — Badge grid (ISO/HACCP/BRC/Halal/Kosher/IAF/CNAS/Sedex) + 4 license docs as gallery
7. **Production Facilities** — Plant photo gallery (3-4 ảnh từ image2, 5, 15, 17)
8. **Markets** — Domestic + Overseas (cân nhắc giữ Australia highlight tuỳ strategy)
9. **Contact** — HQ address + tel + email + hotline

---

## 10b. 🔍 Đối chiếu THỰC TẾ với `AboutPage.tsx` + JSON

> Trước khi đọc Action items, cần biết: **AboutPage.tsx đã có inline data ĐÚNG** cho phần lớn nội dung. Vấn đề BỊA chỉ nằm ở `data.company` (Header/Footer/SEO consume), KHÔNG ở phần body About.

### A. `AboutPage.tsx` inline data — kết quả audit

| Variable trong AboutPage.tsx | Khớp canonical PPT? | Note |
|---|---|---|
| `companyProfile.name` = "Zhuhai TXY Biotech Holding Co., Ltd." | ✅ ĐÚNG | Match PPT slide 1+2 |
| `companyProfile.description` (national high-tech, German env. system, yeast derivatives, 4 fields, domestic+intl) | ✅ ĐÚNG | Match PPT slide 3 |
| `companyProfile.highlights` (4 awards: High-tech Enterprise, R&D Center, Innovation Demo Base, Specialized Enterprise) | ✅ ĐÚNG | Match YE PDF p7 Certificate of Honor |
| `companyProfile.brands` = ["TXY", "Wanfukang"] | ✅ ĐÚNG | Match PPT |
| `companyProfile.operations` (4 fields) | ✅ ĐÚNG | Match PPT |
| `companyProfile.markets` = ["Europe", "America", "SE Asia", "Domestic China"] | ✅ Reasonable | PPT chỉ nói "domestic + overseas" — FE refine cụ thể OK |
| `companyProfile.subsidiaries` = ["Zhanjiang Wuzhou", "Zhuhai Wanfukang"] | ⚠️ **THIẾU** Guangdong Wuzhou Pharma (80%) | PPT slide 2 có 3 entity, FE chỉ list 2 wholly-owned |
| `founder` = Ye Zhi Li · 9 credentials | ✅ ĐÚNG | Match YE PDF p5 Chairman of Introduction |
| `patents` = 5 patents 2013-2017 | ✅ ĐÚNG | Match PPT Honor section |
| `institutionalTitles` = 8 items | ✅ ĐÚNG | Match PPT slide 5 |
| `visionSectors` (4 sectors) | ✅ ĐÚNG | Match application fields |
| `productRange` (4 categories) — mentions products like Yeast Hydrolysate, Yeast Protein/Peptide Powder | ⚠️ Catalogue mismatch | Liệt kê product KHÔNG có trong 15-SKU hiện tại — cần align với catalogue thật |

### B. JSON sections consumed by AboutPage

| Section | Status | Note |
|---|---|---|
| `data.mission.statement` "Biotechnology for the benefit of agriculture" | ⏸️ Generic, hard verify | Giữ |
| `data.vision.statement` "Build internationally leading biotechnology enterprise" | ⏸️ Generic | Giữ |
| `data.philosophy.items` (3: Talent education / Work-life balance / Integrity) | ⏸️ Generic | Giữ |
| `data.corePrinciples.items` (4: Sustainability / Innovation / Integrity / Quality) | ⏸️ Generic | Giữ |
| `data.stats.items` — **"Established 2003"** | 🔴 **GÂY HIỂU NHẦM** | 2003 là năm Founder thành lập **Guangdong Wuzhou Pharma** (cty đầu tay). **Zhuhai TXY Biotech founded 2010** per PPT. Cần đổi nghĩa hoặc value |
| `data.stats.items` Facilities=3, Years=30+, Countries=12, Employees=130+, Core products=4 | 🟡 Verify | 30+ năm khớp tagline "Focus on Yeast Industry 30 Years". Facilities=3 khớp 3 subsidiary. Countries=12 và Employees=130+ chưa có nguồn xác thực |
| `data.certifications.items` (filtered iso-22000/brc/halal/kosher) | ✅ | PPT có thêm IAF, CNAS, ISO 9001, GMP+ → có thể bổ sung |

### C. `data.company` (BỊA — KHÔNG consume by About body)

Nhắc lại để rõ: `data.company` (legalName="TXYbio Co., Ltd", HQ=Shanghai, established=2003, 3 fictional subsidiaries) **không ảnh hưởng nội dung trang About**. Nó ảnh hưởng **Header logo+brand text, Footer, HomeHero tagline, AboutHero hero body, SEO og:site_name**. Cần fix nhưng SCOPE khác.

---

## 11. ⚠️ Action items khi update About FE

| Ưu tiên | Việc |
|---|---|
| 🔴 P0 | Fix `company.legalName`, `shortName`, `tagline`, `established`, `headquarters` |
| 🔴 P0 | Replace 3 fictional `subsidiaries` với 3 real entity + add `ownership` + `acquired` fields |
| 🟠 P1 | Add `annualCapacity: "8000 tons/year"` field cho Zhanjiang Wuzhou subsidiary |
| 🟠 P1 | Add `hotline: "4006-0756-16"` vào company hoặc contact |
| 🟠 P1 | Extract + commit 6-8 ảnh từ PPT vào `/public/images/about/` |
| 🟡 P2 | Bổ sung cert items `sedex`, `iaf`, `cnas` vào `certifications.items` |
| 🟡 P2 | Update `_meta.audience` và `_meta.focus` cho đúng phạm vi 4 application fields |
| 🟡 P2 | Verify HQ Tel/Email/Fax với business (PPT có nhiều số liệu, brochure có số khác) |
| 🟢 P3 | Build org chart component cho Holding Structure (3-entity diagram) |
| 🟢 P3 | Build license gallery component (4 doc images như trust signal) |

---

## 12. 🛡️ Certificate Block — Spec chi tiết cho About page

> Section riêng cho **Certificates** trên trang About. Mục tiêu: tạo trust signal mạnh cho B2B buyer bằng badge + license documents có thật.

### 12.1 Items cần hiển thị

#### A. Quality / Safety Certifications (8 items)

| # | Cert | Issuer / Authority | PPT image | Note |
|---|---|---|---|---|
| 1 | **ISO 22000:2018** | Food Safety Management System (UCC) | `image7.png` | Đã có trong `certifications.items` |
| 2 | **HACCP** | Hazard Analysis Critical Control Point | — | Đã có; PPT slide 3 mention text |
| 3 | **BRC** | British Retail Consortium (European Supply Chain Quality) | — | Đã có |
| 4 | **HALAL** | Republik Indonesia (Majelis Ulama Indonesia — MUI) | `image9.png`, `image14.png` | Đã có; image14 là full cert |
| 5 | **Kosher** | SKS Badatz Shatz (Jewish Clean Food) | `image8.png` | Đã có |
| 6 | **IAF** | International Accreditation Forum — Multilateral Recognition | `image7.png` (chung badge) | 🟢 **CHƯA có trong FE** `certifications.items` |
| 7 | **CNAS C024-M** | China National Accreditation Service for Conformity Assessment — Management System | `image7.png` (chung badge) | 🟢 **CHƯA có trong FE** |
| 8 | **Sedex** | Supplier Ethical Data Exchange — Member | — (logo có ở YE PDF p6) | 🟢 **CHƯA có trong FE** |

→ FE hiện có 8 certs: `iso-22000, haccp, brc, iso-9001, gmp-plus, bap, halal, kosher`. **Bổ sung 3**: `iaf`, `cnas`, `sedex`. Có thể giữ `iso-9001, gmp-plus, bap` cho dòng animal-nutrition.

#### B. Government Licenses / Filing Docs (4 documents)

| # | License | CN name | PPT image | Use case |
|---|---|---|---|---|
| 1 | **Business License** | 营业执照 | `image10.png` | Tính pháp lý cơ bản — show entity tồn tại hợp pháp |
| 2 | **Food Production License** | 食品生产许可证 | `image11.png` | Cho phép sản xuất food-grade products |
| 3 | **Food Production License — Product Catalogue** | 食品生产许可可品种明细表 | `image12.png` | List 9 product types được phép sản xuất |
| 4 | **Export Food Production Enterprise Filing Certificate** | 出口食品生产企业备案证明 | `image13.jpeg` | **Trust signal MẠNH NHẤT** cho B2B buyer quốc tế — filing No 4400/19061, entity Zhanjiang Wuzhou |

→ 9 product types được license trên doc #3 + #4:
1. 高活性干酵母 — Active Dry Yeast (PG6893973)
2. 食用酵母 — Edible Yeast
3. 营养酵母 — Nutritional Yeast
4. 酵母抽提物 — Yeast Extract
5. 酵母自溶物 — Yeast Autolysate
6. 培养基用酵母加工制品 — Yeast for Culture Medium (Microbial Nutrition)
7. 酵母细胞壁 — Yeast Cell Wall (PG6893976)
8. 酵母粉 / 酵母β-葡聚糖 — Yeast Powder / Yeast β-Glucan
9. 富营养酵母 — Nutrient-rich Yeast

### 12.2 Layout đề xuất

```
┌─ Section 07 ──────────────────────────────────────┐
│  Honor and certifications                          │
│                                                    │
│  Quality & Safety Certifications                   │
│  ┌──────────┬──────────┬──────────┬──────────┐    │
│  │ ISO22000 │ HACCP    │ BRC      │ HALAL    │    │  ← badge images
│  │ [logo]   │ [logo]   │ [logo]   │ [logo]   │    │
│  └──────────┴──────────┴──────────┴──────────┘    │
│  ┌──────────┬──────────┬──────────┬──────────┐    │
│  │ Kosher   │ IAF      │ CNAS     │ Sedex    │    │
│  │ [logo]   │ [logo]   │ [logo]   │ [logo]   │    │
│  └──────────┴──────────┴──────────┴──────────┘    │
│                                                    │
│  Government Licenses                               │
│  ┌──────────┬──────────┬──────────┬──────────┐    │
│  │ Business │ Food     │ Catalogue│ Export   │    │  ← document thumbnails
│  │ License  │ Prod Lic │ List     │ Filing   │    │     (clickable to view full)
│  │ [doc img]│ [doc img]│ [doc img]│ [doc img]│    │
│  └──────────┴──────────┴──────────┴──────────┘    │
│                                                    │
│  Authorised product categories (per Export Filing) │
│  • Active Dry Yeast    • Edible Yeast              │
│  • Nutritional Yeast   • Yeast Extract             │
│  • ... (9 items)                                   │
└────────────────────────────────────────────────────┘
```

### 12.3 Asset extraction needed

Move từ `/tmp/txy-ppt/ppt/media/` vào `/public/images/about/certs/`:

```
/public/images/about/certs/
  ├─ iso22000-iaf-cnas.png  ← image7.png (3 badges combined)
  ├─ kosher-sks.png          ← image8.png
  ├─ halal-mui.png            ← image9.png
  ├─ halal-indonesia-full.png ← image14.png (full cert)

/public/images/about/licenses/
  ├─ business-license.png       ← image10.png
  ├─ food-production-license.png ← image11.png
  ├─ food-production-catalogue.png ← image12.png
  └─ export-filing-cert.jpeg     ← image13.jpeg
```

Recommend WebP-convert + responsive sizes (thumb 200x · full 800x).

### 12.4 Component design

3 components mới cần build cho cert block:

```tsx
// 1. CertificationBadgeGrid — display 8 quality certs
<CertificationBadgeGrid
  certs={[
    { id: 'iso-22000', name: 'ISO 22000:2018', image: '/images/about/certs/iso22000-iaf-cnas.png' },
    { id: 'haccp', name: 'HACCP', ... },
    ...
  ]}
/>

// 2. LicenseDocumentGallery — show 4 government docs với lightbox
<LicenseDocumentGallery
  licenses={[
    {
      id: 'business-license',
      titleEn: 'Business License',
      titleCn: '营业执照',
      thumbnail: '/images/about/licenses/business-license-thumb.png',
      full: '/images/about/licenses/business-license.png'
    },
    ...
  ]}
/>

// 3. AuthorisedProductsList — 9 product types per Export Filing
<AuthorisedProductsList
  filingNo="4400/19061"
  entity="Zhanjiang Wuzhou Biology Engineering Co., Ltd"
  products={[
    { cn: '高活性干酵母', en: 'Active Dry Yeast', slug: 'active-dry-yeast' },
    { cn: '酵母细胞壁', en: 'Yeast Cell Wall', slug: 'yeast-cell-wall-mos' },
    ...
  ]}
/>
```

### 12.5 Schema changes cho JSON

Cần extend `data.certifications.items` để chứa image asset path:

```ts
// Before
{ id: 'iso-22000', code: 'ISO 22000', fullName: '...', description: '...' }

// After
{
  id: 'iso-22000',
  code: 'ISO 22000:2018',
  fullName: 'Food Safety Management System',
  description: 'Certified by UCC, recognised globally for food safety.',
  category: 'quality' | 'religious' | 'ethical' | 'accreditation',
  badgeImage: '/images/about/certs/iso22000.png',  // ← new
  authority: 'UCC',                                  // ← new
  scope: 'Food Safety Management'                    // ← new
}
```

Và thêm new section `data.licenses`:

```ts
licenses: {
  items: [
    {
      id: 'business-license',
      titleEn: 'Business License',
      titleCn: '营业执照',
      issuer: 'State Administration for Market Regulation',
      entity: 'Zhuhai TXY Biotech Holding Co., Ltd',
      filingNo: '91440400562613917Z',
      validUntil: null,  // perpetual
      thumbnail: '/images/about/licenses/business-license-thumb.png',
      fullImage: '/images/about/licenses/business-license.png'
    },
    {
      id: 'export-filing',
      titleEn: 'Export Food Production Enterprise Filing Certificate',
      titleCn: '出口食品生产企业备案证明',
      issuer: 'General Administration of Customs',
      entity: 'Zhanjiang Wuzhou Biology Engineering Co., Ltd',
      filingNo: '4400/19061',
      validUntil: 'Perpetual',
      authorisedProducts: ['active-dry-yeast', 'yeast-cell-wall-mos', ...],
      thumbnail: '/images/about/licenses/export-filing-thumb.jpeg',
      fullImage: '/images/about/licenses/export-filing.jpeg'
    },
    ...
  ]
}
```

### 12.6 Action items §12

| Ưu tiên | Việc |
|---|---|
| 🟠 P1 | Extract 8 ảnh từ `/tmp/txy-ppt/ppt/media/` → `/public/images/about/certs/` và `/licenses/` (kèm WebP convert) |
| 🟠 P1 | Add 3 cert items mới (`iaf`, `cnas`, `sedex`) vào `data.certifications.items` |
| 🟠 P1 | Extend cert schema thêm `badgeImage`, `category`, `authority`, `scope` |
| 🟠 P1 | Tạo new JSON section `data.licenses` với 4 doc items + filing numbers |
| 🟡 P2 | Build component `CertificationBadgeGrid` (8 quality certs grid) |
| 🟡 P2 | Build component `LicenseDocumentGallery` (4 docs with lightbox/zoom) |
| 🟡 P2 | Build component `AuthorisedProductsList` (9 products with cross-link tới Products page) |
| 🟡 P2 | Update `AboutPage.tsx` section "Honor and certifications" thay block hiện tại bằng 3 component mới |
| 🟢 P3 | Lightbox/zoom UX cho license documents (đã có `ZoomableImage` component sẵn) |

---

*Last updated: 2026-06-03 · Source: PPT "TXY group company brief introduction" (6 slides) — verified against 3 PDF brochures + www.txybio.com*
