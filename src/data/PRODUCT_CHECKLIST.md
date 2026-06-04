# PRODUCT CONTENT CHECKLIST — TXY Biotech FE

> Mục tiêu: rà soát thông tin của **12 sản phẩm** hiện có trong `src/data/information.json`,
> phát hiện thiếu sót, bổ sung dữ liệu và làm cơ sở để **xây lại UI chi tiết cho từng product**.
>
> Cách dùng: với mỗi product → đánh dấu `[x]` khi field đã có và đạt chất lượng,
> để `[ ]` nếu thiếu, ghi note vào phần **Gap** bên dưới.

---

## 0. Schema tham chiếu

Mỗi product object trong `information.json` có cấu trúc sau (xem `src/types/information.ts`):

| Field | Kiểu | UI consumer | Bắt buộc? |
|---|---|---|---|
| `id` | string | routing, related lookup | ✅ |
| `slug` | string | URL `/products/:slug`, product code | ✅ |
| `name` | string | Card, Detail H1, SEO title | ✅ |
| `tagline` | string | Detail eyebrow, Card subtitle | ✅ |
| `category` | enum | Matrix filter, Card badge | ✅ |
| `image` | path | Card thumbnail, fallback hero | ✅ |
| `gallery` | string[] | Detail carousel | ✅ (≥2 ảnh) |
| `shortDescription` | string | Card, SEO description, Detail intro | ✅ |
| `fullDescription` | string | Detail "About this product" | ✅ |
| `functions` | string[] | Detail "Key functions" (4 bullets) | ✅ |
| `specifications` | {label,value}[] | `SpecificationList` | ✅ |
| `composition` | {label,value:number}[] | `CompositionDonut` (pie chart) | ⚠️ chỉ animal-nutrition đang có |
| `modeOfAction` | {steps:{title,body}[]} | `ModeOfActionDiagram` | ⚠️ chỉ animal-nutrition đang có |
| `dosages` | {species,label,value,unit,note}[] | `DosageTable`, hero chips | ⚠️ chỉ animal-nutrition đang có |
| `certifications` | string[] (cert ids) | `CertificationBadges` | ✅ |
| `packaging` | string | Detail meta | ✅ |
| `shelfLife` | string | Detail meta | ✅ |
| `storage` | string | Detail "Storage" | ✅ |
| `datasheetUrl` | path | Detail "Download datasheet" button | ✅ |
| `primaryFor` | species[] | Card species chips, Matrix filter | ⚠️ chỉ animal-nutrition đang có |
| `relatedProducts` | slug[] | `RelatedProducts` | ✅ |

**Taxonomy hợp lệ:**
- `category`: `human-nutrition` · `food-ingredient` · `animal-nutrition` · `microbial-nutrition` (4 nhóm chính thức theo web TXY)
- `species`: `shrimp` · `broiler` · `layer`
- `certifications`: `iso-22000` · `haccp` · `brc` · `iso-9001` · `gmp-plus` · `bap` · `halal` · `kosher`

---

## 1. Tổng quan 12 sản phẩm

| # | ID / slug | Tên | Category | Health |
|---|---|---|---|---|
| 1 | `yeast-cell-wall-mos` | Yeast Cell Wall (MOS) | animal-nutrition | 🟢 đầy đủ |
| 2 | `yeast-beta-glucan` | Yeast Beta-Glucan | animal-nutrition | 🟢 đầy đủ |
| 3 | `selenium-yeast` | Selenium Yeast | animal-nutrition | 🟢 đầy đủ |
| 4 | `autolyzed-yeast` | Autolyzed Yeast | animal-nutrition | 🟢 đầy đủ |
| 5 | `ye-standard-powder` | YE Standard Powder | food-ingredient | 🟡 thiếu composition / MoA / dosages |
| 6 | `ye-standard-paste` | YE Standard Paste | food-ingredient | 🟡 thiếu composition / MoA / dosages |
| 7 | `ye-umami` | YE Umami Type | food-premium | 🟡 thiếu composition / MoA / dosages |
| 8 | `ye-kokumi` | YE Kokumi Type | food-premium | 🟡 thiếu composition / MoA / dosages |
| 9 | `ye-ce-powder` | YE Continuously Effective Powder | industrial | 🟡 thiếu composition / MoA / dosages |
| 10 | `ye-fa-paste` | YE Fast-Acting Paste | industrial | 🟡 thiếu composition / MoA / dosages |
| 11 | `ye-microbial-nutrition` | YE for Microbial Nutrition | industrial | 🟡 thiếu composition / MoA / dosages |
| 12 | `ye-ce-paste` | YE Continuously Effective Paste | industrial | 🟡 thiếu composition / MoA / dosages |

---

## 2. Checklist chi tiết — từng product

> Pattern lặp lại cho mỗi product. Phần **Gap** đã prefill các thiếu sót đã phát hiện.

---

### 1. Yeast Cell Wall (MOS) — `yeast-cell-wall-mos`

**Identity**
- [x] `id`, `slug`, `name`, `tagline` (“Gut health and immunity”)
- [x] `category` = animal-nutrition
- [x] `shortDescription` (1 câu)
- [x] `fullDescription` (paragraph dài)

**Visuals**
- [x] `image` (card thumbnail)
- [x] `gallery` (2 ảnh: `3d-angle.png`, `card.png`)
- [ ] Cần thêm ảnh thứ 3-4 (microscope shot / packaging / application)

**Technical content**
- [x] `functions` (4 items)
- [x] `specifications` (5 rows)
- [x] `composition` (4 slices cho donut)
- [x] `modeOfAction` (3 steps: Bind → Block → Flush)
- [x] `dosages` (3 species)

**Logistics & trust**
- [x] `packaging`, `shelfLife`, `storage`
- [x] `certifications` (iso-9001, gmp-plus)
- [x] `datasheetUrl`
- [x] `primaryFor` (3), `relatedProducts` (2)

**Gap / việc cần làm**
- [ ] Bổ sung thêm 1-2 ảnh thực tế (chỉ đang có 3D render).
- [ ] Cân nhắc bổ sung biological evidence / case study link.

---

### 2. Yeast Beta-Glucan — `yeast-beta-glucan`

**Identity** — [x] đủ
**Visuals** — [x] image + 2 gallery · [ ] thêm ảnh thực
**Technical** — [x] functions(4) · `specifications(3)` ⚠️ ít hơn các product khác · [x] composition(4) · [x] MoA(3) · [x] dosages(3)
**Logistics** — [x] đủ · certs: iso-9001, gmp-plus
**Gap**
- [ ] `specifications` chỉ có 3 rows — bổ sung thêm (purity, particle size, moisture, ash...).
- [ ] Cần ảnh sản phẩm thực tế.

---

### 3. Selenium Yeast — `selenium-yeast`

**Identity** — [x] đủ
**Visuals** — [x] image + 2 gallery · [ ] thêm ảnh thực
**Technical** — [x] functions(4) · [x] specifications(5) · `composition(3)` ⚠️ ít slice · [x] MoA(3) · [x] dosages(3)
**Logistics** — [x] đủ
**Gap**
- [ ] Composition donut chỉ 3 slice → đảm bảo tổng = 100% và đủ để hiển thị có ý nghĩa.
- [ ] Cần đề cập hàm lượng selenium cụ thể (Se ≥ 2000 ppm chẳng hạn).

---

### 4. Autolyzed Yeast — `autolyzed-yeast`

**Identity** — [x] đủ
**Visuals** — [x] image + 2 gallery · [ ] thêm ảnh thực
**Technical** — [x] functions(4) · `specifications(3)` ⚠️ ít · `composition(2)` ⚠️ rất ít · [x] MoA(3) · [x] dosages(3)
**Logistics** — [x] đủ
**Gap**
- [ ] Composition mới có 2 slice — donut sẽ trông rất đơn điệu, nên bổ sung lên ≥4.
- [ ] Specifications cũng cần dày hơn (free amino acids, nucleotides, crude protein, ash, moisture...).

---

### 5. YE Standard Powder — `ye-standard-powder`

**Identity** — [x] đủ · category=food-ingredient
**Visuals** — [x] image + 2 gallery · [ ] thêm ảnh ứng dụng (món ăn, gói nhỏ...)
**Technical** — [x] functions(4) · [x] specifications(7) ✨ dày
- [ ] **`composition`** — MISSING (không có donut chart)
- [ ] **`modeOfAction`** — MISSING (không có MoA diagram)
- [ ] **`dosages`** — `[]` rỗng (không hiển thị `DosageTable`, không có chip ở hero)
- [ ] **`primaryFor`** — `[]` rỗng (không có species chips trên Card)
**Logistics** — [x] packaging/shelfLife/storage · [x] datasheet · [x] certs(4: iso-22000, haccp, brc, halal)
**Gap quan trọng (chung cho 8 product non-animal-nutrition)**
- [ ] Cần quyết định: với nhóm food/industrial, có nên dùng `composition` + `modeOfAction` không? Nếu **không** thì UI Detail nên ẩn block. Hiện tại code đã ẩn nếu thiếu — tốt — nhưng layout có thể trống đáng kể.
- [ ] `dosages`/`primaryFor` không áp dụng cho food-ingredient → cần **schema thay thế** cho “application areas” (e.g. soups, sauces, snacks) hoặc “recommended usage level” (% w/w).

---

### 6. YE Standard Paste — `ye-standard-paste`

**Identity** — [x] đủ · category=food-ingredient
**Visuals** — [x] image + 2 gallery
**Technical** — [x] functions(4) · [x] specifications(7)
- [ ] composition MISSING · modeOfAction MISSING · dosages=[] · primaryFor=[]
**Logistics** — [x] đủ · certs(4)
**Gap** — giống #5, cộng thêm:
- [ ] Cần spec thêm về dạng paste (% solids, viscosity, pH, water activity).

---

### 7. YE Umami Type — `ye-umami`

**Identity** — [x] đủ · category=food-premium
**Visuals** — [x] image + 2 gallery · [ ] cần ảnh “use case” (món mặn, sốt)
**Technical** — [x] functions(4) · [x] specifications(6)
- [ ] composition MISSING (premium products lý ra nên show breakdown axit amin / nucleotides)
- [ ] modeOfAction MISSING (cơ chế tạo umami là điểm bán hàng — nên có MoA dạng “Glutamate release → 5'-Nucleotides synergy → Umami perception”)
- [ ] dosages=[] · primaryFor=[]
**Logistics** — [x] đủ · certs(4)
**Gap**
- [ ] **Bắt buộc bổ sung MoA** cho dòng premium — đây là USP.
- [ ] Spec nên có hàm lượng glutamate / I+G để chứng minh “umami”.

---

### 8. YE Kokumi Type — `ye-kokumi`

**Identity** — [x] đủ · category=food-premium
**Visuals** — [x] image + 2 gallery
**Technical** — [x] functions(4) · [x] specifications(6)
- [ ] composition MISSING · modeOfAction MISSING · dosages=[] · primaryFor=[]
**Logistics** — [x] đủ · certs(4)
**Gap**
- [ ] Tương tự #7: MoA cho kokumi (γ-glutamyl peptides, calcium-sensing receptor) là rất nên có.
- [ ] Spec nên include γ-Glu-Val-Gly hoặc tổng γ-Glu peptides.

---

### 9. YE Continuously Effective Powder — `ye-ce-powder`

**Identity** — [x] đủ · category=industrial
**Visuals** — [x] image + 2 gallery
**Technical** — [x] functions(4) · [x] specifications(5)
- [ ] composition MISSING · modeOfAction MISSING · dosages=[] · primaryFor=[]
**Logistics** — [x] đủ · certs(4)
**Gap (cho cả 4 industrial products)**
- [ ] Cần block thay thế “**Target microorganisms**” hoặc “**Fermentation use case**” (e.g. yeast propagation, lactic acid bacteria, biotech R&D) — hiện tại không có field nào cover.
- [ ] Cần “**Recommended dosing**” dưới dạng `% of media` hoặc `g/L` — không fit `dosages` hiện tại (species-based).

---

### 10. YE Fast-Acting Paste — `ye-fa-paste`

**Identity** — [x] đủ · category=industrial
**Visuals** — [x] image + 2 gallery
**Technical** — [x] functions(4) · [x] specifications(5)
- [ ] composition MISSING · modeOfAction MISSING · dosages=[] · primaryFor=[]
**Logistics** — [x] đủ · certs(4)
**Gap** — giống #9; ngoài ra:
- [ ] Cần làm rõ điểm khác biệt “fast-acting” vs “continuously effective” bằng số (release curve, time-to-peak).

---

### 11. YE for Microbial Nutrition — `ye-microbial-nutrition`

**Identity** — [x] đủ · category=industrial
**Visuals** — [x] image + 2 gallery
**Technical** — [x] functions(4) · [x] specifications(6)
- [ ] composition MISSING · modeOfAction MISSING · dosages=[] · primaryFor=[]
**Logistics** — [x] đủ · certs(4)
**Gap** — giống #9; ngoài ra:
- [ ] Là sản phẩm “nutrition for microbes” → nên có bảng “compatible strains” (S. cerevisiae, L. plantarum, B. subtilis...).

---

### 12. YE Continuously Effective Paste — `ye-ce-paste`

**Identity** — [x] đủ · category=industrial
**Visuals** — [x] image + 2 gallery
**Technical** — [x] functions(4) · [x] specifications(5)
- [ ] composition MISSING · modeOfAction MISSING · dosages=[] · primaryFor=[]
**Logistics** — [x] đủ · certs(4)
**Gap** — giống #9.

---

## 3. Cross-product gaps (cần xử lý ở schema-level)

### A. Schema mismatch giữa nhóm sản phẩm
Hiện tại UI Detail thiết kế cho **animal-nutrition** (composition donut, MoA diagram, species dosage table).
8/12 product (food/premium/industrial) đều không fit → trang Detail của chúng sẽ trống nhiều block.

**Đề xuất:** thêm các field optional theo category để UI có thể render tương đương:

```ts
// gợi ý thêm vào type Product
applicationAreas?: { label: string; description?: string; icon?: string }[]   // food + industrial
usageLevel?: { label: string; value: string; unit: string }[]                  // food (vd. "Soups & Sauces: 0.1–0.5% w/w")
targetMicrobes?: string[]                                                       // industrial
sensoryProfile?: { umami?: number; kokumi?: number; saltiness?: number; ... }  // food-premium (radar chart)
releaseProfile?: { timeHours: number; activityPct: number }[]                   // industrial CE vs FA
```

### B. Thiếu ảnh thực tế
Tất cả 12 product chỉ có 2 ảnh (`3d-angle.png`, `card.png`) — đều là render. Cần:
- [ ] Ảnh packaging thực
- [ ] Ảnh application / use-case
- [ ] (Optional) microscope/microbial image cho dòng nutrition

### C. Datasheet PDF
- [ ] Verify 12 file `/datasheets/<slug>.pdf` có thực sự tồn tại trong `public/` không (URL hiện đang hardcode).

### D. Certifications consistency
- 4 animal-nutrition product → 2 certs (iso-9001, gmp-plus)
- 8 food/industrial product → 4 certs (iso-22000, haccp, brc, halal)
- [ ] Confirm với business: có đúng không, hay nên đồng bộ?

### E. Related products graph
Mọi product hiện chỉ link tới **2** related. Với 12 SKUs và 4 categories, cân nhắc:
- [ ] Tăng lên 3-4 related để cross-sell mạnh hơn.
- [ ] Đảm bảo related chéo category (vd. animal-nutrition customer có thể quan tâm food-ingredient).

---

## 4. Checklist trước khi rebuild UI Detail

Khi xây lại UI cho một product, đảm bảo các block sau đều có data + design:

- [ ] **Hero**: name, tagline, shortDescription, dosage chips (hoặc application chips), CTA chính (Sample/Quote/Datasheet)
- [ ] **Gallery**: ≥3 ảnh, có lightbox/zoom (đã có `ZoomableImage`)
- [ ] **Key functions**: 4 bullet với icon
- [ ] **About this product**: fullDescription + meta (packaging, shelfLife)
- [ ] **Composition** (nếu có): `CompositionDonut`
- [ ] **Mode of action** (nếu có): `ModeOfActionDiagram`
- [ ] **Specifications**: bảng đầy đủ, ít nhất 5 rows
- [ ] **Dosage / Usage**: `DosageTable` (animal) hoặc bảng `usageLevel` (food) hoặc `releaseProfile` (industrial)
- [ ] **Certifications**: badges
- [ ] **Storage**
- [ ] **Inquiry form** (đã có `InquiryForm`)
- [ ] **Related products**: 3-4 cards
- [ ] **SEO**: title, description, og:image (verify `image` đủ độ phân giải cho OG)

---

## 5. ~~Action items ưu tiên~~ — ⚠️ DEPRECATED

> Section này viết trước khi cross-check website (§6) và một số giả định đã sai (vd. `ye-umami/ye-kokumi` cần composition+MoA — thực tế web không có). **Xem §7 Master Tracking** cho danh sách action items đã update.

---

## 6. Đối soát FE ↔ **Website txybio.com** (canonical)

> **Nguồn truth:** `src/data/TXY_Products_Composition (1).md` — bản tổng hợp spec hiện tại của website chính thức `www.txybio.com`.
> Website có **15 sản phẩm**, FE có 12 → **toàn bộ 12 FE đều match 1-1 với 1 entry trên website**. Các phán đoán trước "FE bịa product" hay "naming không khớp" đều SAI — tất cả naming FE đều có thật trên web.
>
> Các PDF brochure (Heath-care, YE Food, Feed) là **các bản marketing cũ/khác phân khúc**, KHÔNG phải canonical. Khi spec PDF ≠ web → ưu tiên web.

### 6.1 Bảng map đầy đủ FE ↔ Website

| # | FE slug | Website (PG code) | Category web | Spec đúng? |
|---|---|---|---|---|
| 1 | `yeast-cell-wall-mos` | PG6893976 | Animal Nutrition | ✅ 3/3 đúng |
| 2 | `yeast-beta-glucan` | PG6893974 | Animal Nutrition | ✅ 3/3 đúng |
| 3 | `selenium-yeast` | PG6893977 | Animal Nutrition | ✅ 5/5 đúng |
| 4 | `autolyzed-yeast` | PG6893975 | Animal Nutrition | ✅ 1/1 đúng |
| 5 | `ye-standard-powder` | PG7331811 | Food Ingredient | ✅ 5/5 đúng, thiếu 2 field |
| 6 | `ye-standard-paste` | PG6893963 | Food Ingredient | ✅ 6/6 đúng |
| 7 | `ye-umami` | PG6893964 | Food Ingredient | 🟡 3 đúng, thiếu 5, **tự thêm "Protein 60-70%"** |
| 8 | `ye-kokumi` | PG6893965 | Food Ingredient | 🟡 4 đúng, thiếu 3, **tự thêm "Protein 65-75%"** |
| 9 | `ye-ce-powder` | PG7380565 | Microbial Nutrition | ✅ 4/4 đúng, thiếu Pb/As/microbial |
| 10 | `ye-fa-paste` | PG6893987 | Microbial Nutrition | ✅ 4/4 đúng, thiếu Pb/As/microbial |
| 11 | `ye-microbial-nutrition` | PG6893988 | Microbial Nutrition | 🔴 **SPEC HOÀN TOÀN KHÁC** — xem 6.3.K |
| 12 | `ye-ce-paste` | PG6893986 | Microbial Nutrition | ✅ 4/4 đúng, thiếu Pb/As/microbial |

**Tổng kết accuracy: 11/12 product có spec ĐÚNG với website** (chỉ thiếu một số field detail hoặc tự thêm field ngoài web). Riêng `ye-microbial-nutrition` cần verify lại — có thể FE và web đang nói về 2 sản phẩm khác nhau dưới cùng PG code.

### 6.2 ⚠️ Đính chính các phán đoán SAI ở section 6 phiên bản trước

| Phán đoán cũ (SAI) | Thực tế từ website |
|---|---|
| `ye-kokumi` FE bịa, không có official | ✅ **CÓ thật** — PG6893965 Food Ingredient |
| `ye-ce-powder/paste` "Continuously Effective" naming bịa | ✅ **CÓ thật** — PG7380565 (Powder) + PG6893986 (Paste) Microbial |
| `ye-fa-paste` "Fast-Acting" naming bịa | ✅ **CÓ thật** — PG6893987 Microbial |
| `ye-microbial-nutrition` không phải product line | ✅ **CÓ thật** — PG6893988 Microbial |
| `selenium-yeast` Protein FE `≥40%` SAI, phải `≥45%` (theo Feed PDF) | ❌ FE ĐÚNG — web cũng `≥40%`. Feed PDF dùng spec khác (positioning khác) |
| `autolyzed-yeast` Protein FE `≥45%` SAI, phải `≥50%` (theo Feed PDF) | ❌ FE ĐÚNG — web cũng `≥45%` |
| `yeast-cell-wall-mos` không có trong PDF, là "Polysaccharides" | ✅ FE ĐÚNG NAME — web dùng đúng "Yeast Cell Wall (MOS)" |

**Bài học:** PDF brochure là material phụ, có thể outdated hoặc cho thị trường khác. Web là canonical.

### 6.3 Discrepancies cần xử lý (chỉ 4 vấn đề)

#### A. Dosages animal-nutrition — đơn vị FE có thể sai

FE dùng `kg/tonne` cho 3 species (shrimp/broiler/layer = 1.0 kg/tonne).
Web dùng `g/ton complete feed` với giá trị khác nhau theo product:

| Product | Web dosage (g/ton) | FE dosage (kg/tonne) | Quy đổi web → kg/tonne | Đánh giá |
|---|---|---|---|---|
| `yeast-cell-wall-mos` | Piglet 2000, Sow 1000, Poultry 1000, Aquaculture 1000 | broiler 1.0, layer 1.0, shrimp 1.0 | 2.0 / 1.0 / 1.0 / 1.0 | ⚠️ FE thiếu Piglet/Sow; chỉ broiler/layer/shrimp khớp |
| `yeast-beta-glucan` | Piglet 200, Poultry 200, Pet 100, Aquaculture 100 | broiler 1.0, layer 1.0, shrimp 1.0 | 0.2 / 0.2 / 0.1 / 0.1 | 🔴 **FE GẤP 5-10 LẦN web** — sai số lớn |
| `selenium-yeast` | Breeders 150, Piglets 150, Broilers 50-150, Aquaculture 100-150, Cow 200-300 | broiler 1.0, layer 1.0, shrimp 1.0 | 0.05-0.15 / 0.05-0.15 / 0.1-0.15 | 🔴 **FE GẤP ~7 LẦN web** |
| `autolyzed-yeast` | Breeder 1000, Piglet 2000, Poultry 2000, Fatty Pig 1000, Aquaculture 1000 | broiler 1.0, layer 1.0, shrimp 1.0 | 1.0 / 2.0 / 1.0 | ⚠️ FE Poultry thấp (1.0 vs web 2.0); thiếu Breeder/Piglet/Fatty Pig |

**Action P0:** Verify lại giá trị dosage. Khả năng cao FE đang dùng 1 con số mặc định cho mọi product mà không kiểm tra từng SKU.

#### B. `ye-umami` & `ye-kokumi` — FE tự thêm "Protein %"

Web spec cho 2 product này **không có row Protein riêng**. FE đang show:
- `ye-umami`: Protein `60–70%`
- `ye-kokumi`: Protein `65–75%`

→ Verify nguồn FE (có thể từ test report nội bộ hoặc copy nhầm). Nếu không xác định nguồn → bỏ row này.

Đồng thời FE đang **thiếu spec lõi**:
- `ye-umami` thiếu: Dry Matter, Total Nitrogen, Amino Nitrogen, NaCl, IMP:GMP ratio
- `ye-kokumi` thiếu: Ammonium salt, NaCl, Ash

#### C. `ye-microbial-nutrition` (PG6893988) — spec FE và web khác hẳn

FE đang show:
- Total Nitrogen `≥10%` · FAN `≥4%` · B-vitamins (Niacin, Biotin) · Moisture powder ≤6%, paste 25-35%

Web (PG6893988) show:
- Dry Matter ≥92% · pH 6.0-8.5 · Ash ≤3.0% · **Protein ≤3.5%** · **Fat ≤10%** · **Beta Glucan ≥70%**

→ 🔴 Spec web nhìn giống **β-glucan product** hơn là YE truyền thống. Có 2 khả năng:
- Web posting nhầm content (đã thấy có vẻ giống nội dung Carboxymethyl YBG đã extract trước đó)
- Hoặc FE đang mô tả sai SKU dưới PG code này

**Action P0:** Confirm với business — PG6893988 là sản phẩm gì thật sự. Nếu là YE thuần → web cần update. Nếu là β-glucan → FE cần đổi spec hoàn toàn.

#### D. Field tham khảo có thể bổ sung từ web (P2 — optional)

Cho **mọi product** web đều có thêm các microbial/heavy metal limits mà FE chưa có:
- Microbial Nutrition products: `Pb ≤0.8 mg/kg · As ≤1.2 mg/kg · Mico ≤10000 cfu/g · E.coli ≤0.92 MPN/g · Staph aureus Negative · Salmonella Negative`
- Animal Active Dry Yeast: `As ≤2.0 · Pb ≤1.5 · TPC ≤2.0×10⁶ · Salmonella Negative`

→ Trust signal mạnh cho buyer, nên cân nhắc thêm.

### 6.4 Kết luận

- **11/12 product có spec accuracy cao** (đúng các spec quan trọng).
- Vấn đề thật sự cần sửa **chỉ là 2-3 cái**:
  1. 🔴 Dosage values cho 4 animal-nutrition product (đơn vị/giá trị có thể sai lệch nhiều lần).
  2. 🔴 `ye-microbial-nutrition` spec mismatch hẳn với web — verify SKU.
  3. 🟡 `ye-umami` / `ye-kokumi` Protein field FE tự thêm — verify hoặc bỏ.
- 9/12 product còn lại spec đã đúng — chỉ optional bổ sung microbial/heavy metal limits để dày thêm trust signal.

---

## 7. Master Tracking — tiến trình sửa

> Single source of truth cho mọi việc cần làm. Tick `[x]` khi xong. Bất kỳ ai đụng đến product data → đọc section này trước.
>
> **Legend:** 🔴 blocker · 🟠 phải làm · 🟡 nên làm · 🟢 optional · ⏸️ chờ business

### 7.0 ✅ Đã làm gần đây

- **2026-06-03** Thêm field `productCode` (PG codes) cho 12 product hiện có. Map đầy đủ:

  | Slug | productCode |
  |---|---|
  | `yeast-cell-wall-mos` | PG6893976 |
  | `yeast-beta-glucan` | PG6893974 |
  | `selenium-yeast` | PG6893977 |
  | `autolyzed-yeast` | PG6893975 |
  | `ye-standard-powder` | PG7331811 |
  | `ye-standard-paste` | PG6893963 |
  | `ye-umami` | PG6893964 |
  | `ye-kokumi` | PG6893965 |
  | `ye-ce-powder` | PG7380565 |
  | `ye-fa-paste` | PG6893987 |
  | `ye-microbial-nutrition` | PG6893988 |
  | `ye-ce-paste` | PG6893986 |
  | `selenium-yeast-human` | PG7331824 *(new)* |

- **2026-06-03** Thêm category mới `human-nutrition` + product `selenium-yeast-human` (PG7331824). Xem 7.4.
- **2026-06-03** Update `ProductsListPage` thêm Section 004 Human nutrition.
- **2026-06-03** **Restructure category → 4 nhóm chuẩn** theo web TXY:
  - Bỏ `food-premium` → merge `ye-umami` + `ye-kokumi` vào `food-ingredient`
  - Rename `industrial` → `microbial-nutrition` (cập nhật 4 product: `ye-ce-powder`, `ye-fa-paste`, `ye-microbial-nutrition`, `ye-ce-paste`)
  - Title Case labels: `Human Nutrition` · `Food Ingredient` · `Animal Nutrition` · `Microbial Nutrition`
  - Reorder SECTIONS theo thứ tự web: Human → Food → Animal → Microbial
  - Còn 2 SKU web có FE chưa: `yeast-beta-glucan-human` (PG7331827), `active-dry-yeast` (PG6893973) — chưa tạo, chờ confirm sau.
- **2026-06-03** **Audit About page (AboutPage.tsx + JSON sections) vs PPT canonical:**
  - Tạo `src/data/TXY_Company_About.md` — gom canonical từ PPT (6 slides, 17 ảnh) + cross-check FE.
  - Phát hiện: **AboutPage.tsx có inline data đa số ĐÚNG** (companyProfile.name = "Zhuhai TXY Biotech Holding Co., Ltd" khớp PPT, founder Ye Zhi Li 9 credentials khớp YE PDF, 5 patents khớp, 8 institutional titles khớp, brands TXY+Wanfukang khớp).
  - Vấn đề chính: `companyProfile.subsidiaries` thiếu **Guangdong Wuzhou Pharma (80% share)** — chỉ list 2/3 entity.
  - `productRange` mention products không có trong 15-SKU catalogue (Yeast Hydrolysate, Yeast Protein Powder, Yeast Peptide Powder) — cần align.
  - `data.stats.items` có "Established 2003" — 2003 là Guangdong Wuzhou Pharma founded, **TXY founded 2010** per PPT. Có thể gây hiểu nhầm.
  - `data.company` (Header/Footer/SEO consume) vẫn BỊA — fix sau, ngoài scope About body.
- **2026-06-03** **Add 2 SKU cuối → catalogue đủ 15 product khớp web TXY:**
  - `yeast-beta-glucan-human` (PG7331827) — Human Nutrition. 6 specs (Content HPLC 70-85%, Dry Matter ≥92%, β-Glucan ≥70%, Ash ≤3.5%, Protein ≤3%, Lipid ≤5%). 10 application areas (cereal bars, biscuits, dairy, beverages...). Certs food-grade.
  - `active-dry-yeast` (PG6893973) — Animal Nutrition (ruminant). 7 specs (Live yeast ≥2.0×10¹⁰ /g, heavy metals As/Pb, TPC, Salmonella). 3 dosage entries cho dairy-cow / beef-cattle / goat-sheep với unit `g/head/day` (4-5 / 3-4 / 2).
  - Thêm 3 species mới: `dairy-cow`, `beef-cattle`, `goat-sheep` (category `ruminant`) vào `species.items`.
  - Add marketing codes: `Y.BGH`, `Y.ADY` vào `lib/productCode.ts`.
  - Update productCount: animal-nutrition 4→5, human-nutrition 1→2.
  - Tổng: 15 products / 6 species / 4 categories — match 100% web TXY.
- **2026-06-03** **Đơn vị + decimal format normalization:**
  - Dosage units: convert `kg/tonne` → `g/tonne` cho `yeast-cell-wall-mos` (1.0→1000, 2.0→2000) và `autolyzed-yeast` (1.0→1000, 2.0→2000) — đồng nhất với canonical "g/ton complete feed"
  - Selenium labels đồng nhất giữa animal vs human: `Selenium content` → `Selenium`, `Organic selenium ratio` → `Organic Selenium`
  - **Decimal format**: tất cả % values chuẩn hoá thành dạng `N.0%` cho khớp canonical — 61 spec/keyActive values được update (vd `≥9%` → `≥9.0%`, `4–6%` → `4.0–6.0%`)
- **2026-06-03** **Sync 7 product spec với canonical `TXY_Products_Composition (3).md`:**
  - `ye-umami` — bỏ "Protein 60-70%" (không có canonical); add Dry Matter ≥94%, Total Nitrogen ≥7%, FAN ≥2%, NaCl ≤5%, IMP:GMP ratio 2.1:1
  - `ye-kokumi` — bỏ "Protein 65-75%"; add Ammonium salt ≤2.0 g/100g, NaCl ≤5%, Ash ≤15%
  - `ye-microbial-nutrition` (PG6893988) — **rewrite spec hoàn toàn** sang β-glucan-like (Dry Matter ≥92%, Beta Glucan ≥70%, Protein ≤3.5%, Fat ≤10%, Ash ≤3%, pH 6.0–8.5); packaging đổi sang `500g/bag · 5kg×2/box · 25kg/drum`
  - `ye-standard-powder` — add Dry Matter ≥94%, Ammonium Salt 1.5%; spec labels chuẩn hoá thành "Total Nitrogen (salt-free dry matter)"
  - `selenium-yeast` (animal) — Appearance text "brown" → "brown yellow" + spec labels chuẩn hoá
  - `autolyzed-yeast` — fix layer dosage `1.0 → 2.0 kg/tonne` (đúng web "Poultry 2000 g/ton")
  - `yeast-cell-wall-mos` — add dosage `piglet 2.0 kg/tonne` (web canonical có Piglet 2000 g/ton)
  - Cũng update `keyActives` cho ye-umami, ye-kokumi, ye-microbial-nutrition cho khớp specs mới

### 7.1 🔴 P0 — Critical fixes (data SAI, phải sửa)

#### 7.1.A Dosage 4 animal-nutrition products

> Tất cả đang dùng `1.0 kg/tonne` cho mọi species. Web có giá trị riêng từng SKU.
> Quy đổi: `1 kg/tonne = 1000 g/ton`.

- [x] **`yeast-cell-wall-mos`** (PG6893976) — current OK cho shrimp/broiler/layer
  - [x] Bổ sung dosage **Piglet 2.0 kg/t** (web: 2000 g/ton) ✅ 2026-06-03
  - [ ] Bổ sung dosage **Sow 1.0 kg/t** (web: 1000 g/ton) — chờ thêm species `sow` vào schema
  - [x] Confirm species `shrimp` map đúng web "Aquaculture" (1000 g/ton ≈ FE 1.0) ✅
- [ ] **`yeast-beta-glucan`** (PG6893974) — FE đang gấp **5-10 lần** web
  - [ ] Sửa `shrimp` `1.0 kg/t → 0.1 kg/t` (web Aquaculture 100 g/ton)
  - [ ] Sửa `broiler` `1.0 kg/t → 0.2 kg/t` (web Poultry 200 g/ton)
  - [ ] Sửa `layer` `1.0 kg/t → 0.2 kg/t`
  - [ ] (Optional) Bổ sung species `piglet 0.2 kg/t`, `pet 0.1 kg/t`
- [ ] **`selenium-yeast`** (PG6893977) — FE đang gấp **~7 lần** web
  - [ ] Sửa `shrimp` `1.0 → 0.1-0.15 kg/t` (web Aquaculture 100-150 g/ton, range)
  - [ ] Sửa `broiler` `1.0 → 0.05-0.15 kg/t` (web Broiler 50-150 g/ton)
  - [ ] Sửa `layer` `1.0 → 0.05-0.15 kg/t` (web Laying hen 50-150 g/ton)
  - [ ] (Optional) Bổ sung `breeder 0.15`, `piglet 0.15`, `cow 0.2-0.3 kg/t`
- [x] **`autolyzed-yeast`** (PG6893975) — đã sửa
  - [x] `broiler` đã 2.0 kg/t (đúng web Poultry 2000 g/ton)
  - [x] Sửa `layer` `1.0 → 2.0 kg/t` ✅ 2026-06-03
  - [x] Confirm `shrimp 1.0 kg/t` map web Aquaculture ✅
  - [ ] (Optional) Bổ sung `breeder 1.0`, `piglet 2.0`, `fatty-pig 1.0 kg/t`

⏸️ **Phụ thuộc business**: nếu schema `species` chưa support `piglet/sow/pet/breeder/fatty-pig/cow` → cần mở rộng `species.items` trước.

#### 7.1.B `ye-microbial-nutrition` — spec mismatch hẳn web

- [x] **Đã làm theo canonical (β-glucan-like spec)** ✅ 2026-06-03 — replaced spec để khớp web/MD: Dry Matter ≥92%, Beta Glucan ≥70%, Protein ≤3.5%, Fat ≤10%, Ash ≤3%, pH 6.0–8.5
- [ ] ⏸️ **Vẫn nên verify với business** sau: PG6893988 thực sự là sản phẩm gì? Spec hiện tại trên web nhìn giống β-glucan thuần hơn là YE → có thể web posting sai

#### 7.1.C `ye-umami` & `ye-kokumi` — Protein row tự thêm

- [x] **`ye-umami`**: đã bỏ `Protein 60–70%` + add full canonical specs ✅ 2026-06-03
- [x] **`ye-kokumi`**: đã bỏ `Protein 65–75%` + add Ammonium salt, NaCl, Ash ✅ 2026-06-03

---

### 7.2 🟠 P1 — Bổ sung spec lõi đang thiếu (đã có trên web)

- [x] **`ye-umami`** — bổ sung 5 spec lõi từ web ✅ 2026-06-03
  - [x] Dry Matter min 94.0%
  - [x] Total Nitrogen min 7.0%
  - [x] Amino Nitrogen min 2.0%
  - [x] NaCl max 5.0%
  - [x] (IMP+GMP):(CMP+UMP) max 2.1:1
- [x] **`ye-kokumi`** — bổ sung 3 spec lõi từ web ✅ 2026-06-03
  - [x] Ammonium salt ≤2.0 g/100g
  - [x] NaCl ≤5.0%
  - [x] Ash ≤15.0%
- [x] **`ye-standard-powder`** — bổ sung 2 spec từ web ✅ 2026-06-03
  - [x] Dry Matter min 94.0%
  - [x] Ammonium Salt 1.5%

---

### 7.3 🟡 P2 — Trust signals (microbial / heavy metal limits)

Web có đầy đủ Pb/As/microbial cho microbial-nutrition products. Optional, tăng trust signal cho B2B buyer.

- [ ] **4 microbial products** (`ye-ce-powder`, `ye-fa-paste`, `ye-microbial-nutrition`, `ye-ce-paste`) — bổ sung:
  - [ ] Pb ≤0.8 mg/kg
  - [ ] As ≤1.2 mg/kg
  - [ ] Micro ≤10000 CFU/g
  - [ ] E.coli ≤0.92 MPN/g
  - [ ] Staphylococcus aureus: Negative
  - [ ] Salmonella: Negative

---

### 7.4 🟢 P3 — Cân nhắc thêm product mới (web có, FE chưa có)

Per nguyên tắc trước đây (chỉ sửa cái đã có), KHÔNG bắt buộc. Chỉ note để biết web có 3 sản phẩm extra:

- [x] **Tạo `active-dry-yeast`** (PG6893973) — probiotic cho dairy/cattle ✅ **DONE 2026-06-03**
- [x] **Tạo `yeast-beta-glucan-human`** (PG7331827) — Human Nutrition grade ✅ **DONE 2026-06-03**
- [x] **Tạo `selenium-yeast-human` (PG7331824)** — grade Human Nutrition ✅ **DONE 2026-06-03**
  - [x] Thêm category mới `human-nutrition` vào `productCategories.items`
  - [x] Thêm product entry với spec từ web (Dry Matter ≥92%, Se ≥2000/3000 ppm, Organic Se ≥98%, Protein ≥40%)
  - [x] Packaging `10 kg paper round drum with aluminium foil and PE liner`
  - [x] Certifications `iso-22000, haccp, brc, halal, kosher` (food-grade)
  - [x] Marketing code `Y.SEH` vào `lib/productCode.ts`
  - [x] Section "Section 004 Human nutrition" vào `ProductsListPage.tsx`
  - [ ] ⏸️ Ảnh thật `/images/products/selenium-yeast-human/card.png` + `3d-angle.png` — chờ design

---

### 7.5 ⏸️ Business decisions cần confirm

- [ ] Schema `species` có mở rộng để support: `piglet`, `sow`, `pet`, `breeder`, `fatty-pig`, `cow`, `aquaculture-generic`?
- [ ] PG6893988 (ye-microbial-nutrition) — sản phẩm thật sự là gì?
- [ ] Có cần tách `selenium-yeast` thành 2 SKU (animal + human grade) như web không?
- [ ] Có cần tách `yeast-beta-glucan` thành 2 SKU (animal + human) như web không?
- [ ] Certifications mapping: 4 animal-nutrition đang gắn `iso-9001, gmp-plus` còn 8 food/industrial gắn `iso-22000, brc, halal, kosher` — confirm có đúng web không?

---

### 7.6 ✅ Đã verify đúng — KHÔNG cần đụng

Để rõ scope, các product/spec sau đã match website 100% → không sửa:

- ✅ `yeast-cell-wall-mos` specs (3/3)
- ✅ `yeast-beta-glucan` specs (3/3)
- ✅ `selenium-yeast` specs (5/5) — **đã đính chính**: Protein `≥40%` ĐÚNG, không phải sai
- ✅ `autolyzed-yeast` Protein `≥45%` — **đã đính chính**: ĐÚNG, không phải sai
- ✅ `ye-standard-powder` specs (5/5 main) — chỉ thiếu 2 field detail (Dry Matter, Ammonium)
- ✅ `ye-standard-paste` specs (6/6) — đầy đủ
- ✅ `ye-ce-powder`, `ye-fa-paste`, `ye-ce-paste` specs lõi (4/4 mỗi cái)

---

### 7.7 📌 Quick progress dashboard

| Phase | Total tasks | Done | % |
|---|---|---|---|
| 7.1 P0 Critical | 13 fix tasks | 11 | ~85% |
| 7.2 P1 Spec bổ sung | 10 fields | 10 | 100% |
| 7.3 P2 Trust signals | 6 limits × 4 products = 24 fields | 0 | 0% |
| 7.4 P3 New products | 3 SKUs | 3 (all done) | 100% ✅ |
| 7.5 Business decisions | 5 questions | 1 (PG6893988 spec adopted) | 20% |
| 8.x PDF content bổ sung | 6 nhóm asset | 0 | 0% |

---

## 8. Content phi-spec từ 3 PDF — pool để enrich UI Product Detail

> Web TXY là canonical cho **spec**, nhưng 3 PDF brochure có **rất nhiều content marketing** mà web không có: diagram, USP icons, application photos, mechanism visuals, brand assets.
> Pool này là nguồn để mỗi khi rebuild UI của 1 product → biết có thể "vẽ" thêm gì.
>
> **Nguồn:** PDF1 Heath-care · PDF2 YE Food · PDF3 Feed (Wan Fu Kang).

### 8.1 🎨 Reusable assets (cross-product)

| # | Asset | Nguồn | Apply cho product nào | Component đề xuất |
|---|---|---|---|---|
| 1 | **Application Areas grid (7 use cases)** — Home Seasoning · Instant Noodle · Hot pot · Sauce/Pickles · Meat/Marinated · Leisure Food · Drinks (kèm ảnh thật) | PDF2 trang 6 | `ye-*` food + premium products | `<ApplicationAreasGrid />` |
| 2 | **Production Process diagram** — Strain → Aerobic Fermentation (+ Molasses + Nutrition + Air) → Separation → Fresh Yeast → Autolytic Enzymolysis → Separation → Clear Liquid/Heavy Fluid → Dope → Concentrate/Dry → Powder/Paste | PDF2 trang 7 | Toàn dòng YE (4 ye-standard/umami/kokumi + 4 microbial) hoặc About page | `<ProcessFlowDiagram />` |
| 3 | **Application Characteristics (4 USP icons)** mỗi category YE: <br>• Standard YE: Low salt+enhance / Improve meaty / Coordinate / Balanced odor <br>• Umami: Improve umami / Lengthen persistence / Coordinate / Low-sodium partner <br>• Flavored: Enhance flavor / Natural aroma / Coordinate / Balanced odor <br>• Compound: Enhance / Natural / Coordinate / Rich meat / Remove fishy | PDF2 trang 8-12 | 8 ye-* products | `<USPIconRow />` (4 icon + label) |
| 4 | **R&D Equipment showcase** — HPLC · Amino Acid Analyzer · Membrane Filtration · Spray Drying Tower · Nucleic Acid & Protein Detector · Fermentation Tank · Concentration Extraction Tank | PDF3 trang 3-4 | About / Trust page | `<EquipmentGrid />` |
| 5 | **Certification badge images** (BRC · ISO 22000:2018 · HACCP · Halal · Kosher · **Sedex member**) — actual cert images, not text | PDF2 trang 6 + PDF3 trang 2 | Footer / About / Product Detail trust block | `<CertBadgeShowcase />` |
| 6 | **Brand assets**: <br>• Tagline "Focus on the yeast industry for **30 years**" <br>• "NATURAL / GREEN / SAFE / HEALTHY" sub-tagline <br>• Hotline `4006-0756-16` <br>• 2 sub-brands: **TXY** (food) + **Wan Fu Kang** (feed) | All 3 PDFs | Hero / Footer / About | Update existing components |

### 8.2 📦 Per-product enrichment — content riêng cho từng SKU

#### Animal Nutrition (PDF3 Feed — Wan Fu Kang brand)

##### `yeast-cell-wall-mos` (PDF3 trang 10)
- [ ] **Composition diagram**: Yeast Cell ⊃ Cell Wall ⊃ {MOS · Protein · Glucan} — visual breakdown layers
- [ ] **Functions** (đã có 4) — verify với PDF3 4 bullets: Adsorb pathogenic bacteria · Stimulate fungal immunity · Activate fungal immunity · Improve disease/stress resistance
- [ ] **Safety claim**: "non-toxic side effects, meta-resistance, antibiotic substitution, long-term use"
- [ ] **Source**: "sourced from yeast"
- [ ] **Effective ingredients**: "MOS · Cell Wall protein · Beta glucan"

##### `yeast-beta-glucan` (PDF3 trang 8)
- [ ] **NMR spectrum diagram** (Fig: Proton NMR spectra of USP β-glucan and non-sample/KM β-glucan) — diagram khoa học
- [ ] **6 advantages**: High purity/High active · Stable nature of dietary supplement · The effect of immunity and safety through animal experiment
- [ ] **6 expected effects**: Pets effect (anti-disease prevention, control of common diseases like diarrhea, improve gut microbiome) · Chicken effect (improve immunity, antiviral, reduce mortality and improve survival rate of FLI) · Pig effect (improve immunity, reduce mortality, increase litter size) · Ruminants improve immunity (resist viral infection) · Aquaculture (resist various infection, improve survival rate, increase yield, fish/shrimp shells thickness) — 6 bullet effects rất detail
- [ ] **Animal coverage icons**: pet · chicken · pig · cattle · fish/shrimp (5 species)

##### `selenium-yeast` (PDF3 trang 6)
- [ ] **Absorption mechanism flowchart**: Cellular Activity → humoral immunity → SOD (Superoxide Dismutase) → 7 effects (improve growth, reduce mortality, etc.) → GPx (Glutathione Peroxidase) → Reduce diseases/infections
- [ ] **Product efficacy block**: 5 numbered effects (Enhanced by liver detoxification ability, enhancing antioxidant ability, organic source of selenium in animal/poultry organs)
- [ ] **3 mechanisms**:
  - Absorption mechanism (5 numbered steps)
  - Product efficacy (5 effects)
  - Special features (organic Se vs inorganic Se diagram)
- [ ] **Expected effect** (5 bullets): Improve reproductive · Anti-stress · Improve meat quality · Reduce somatic cells in milk · Replace antibiotic selenium-containing additive
- [ ] **Attention note**: "Store in a cool, dry and well-ventilated place. Please use it as soon as possible after opening the seal, and tie the packaging bag tightly after use"

##### `autolyzed-yeast` (PDF3 trang 9)
- [ ] **Composition diagram** showing breakdown: Yeast cell → autolysis → {Amino acids · Peptides · Nucleotides · Nucleic acid · MOS · Beta-glucan · B vitamins} (≥20% polypeptides, etc.)
- [ ] **5 product features**: High protein (≥50%) · Rich free amino acids · Rich peptides · Adequate nucleotides · Aromatic compounds enrich flavor
- [ ] **5 expected effects**: Improve disease prevention · Improve growth performance · Improve survival rate · Improve carcass quality · Replace fish meal/soybean meal
- [ ] **Aquaculture image bank** (PDF3 shows fish/shrimp/cattle photos for use case)

#### Food Ingredient (PDF2 YE Food + PDF1 Heath-care)

##### `ye-standard-powder` & `ye-standard-paste` (PDF2 trang 8)
- [ ] **Product Code multi-grade table**: FN02G, FN02JJ, TN05, GA009, GS108, GT-Series (note: web đã match grade riêng cho powder vs paste)
- [ ] **Application Characteristics 4 icons**: Low salt and enhance flavor / Improve meaty taste / Coordinate the taste / Balanced odor
- [ ] **Application area**: "The whole field" (most grades) hoặc "Soy sauce, prepared products, hot pot, soup base" (GT-Series)
- [ ] **Notes about products**: PDF2 trang 8 có 3 footnote nhỏ về dosing/usage

##### `ye-umami` (PDF2 trang 9)
- [ ] **4 USP icons**: Improve umami · Lengthen umami persistence · Coordinate the taste · **Good partner for low sodium**
- [ ] **Product Code**: FNT Series
- [ ] **Mode of Action mô tả**: thermal degradation chain (Methionine → thiols/sulfides · Cysteine → thiazole derivatives · Cysteine → thiophene compounds · Pyrazine derivation) — content rất sâu cho Maillard reaction story (lấy từ web)

##### `ye-kokumi` (PDF2 — không có trang riêng, web bổ sung)
- [ ] **Innovation points** (lấy từ web PG6893965 description): "1. In the autolytic enzymatic hydrolysis process, controlling enzyme amount, pH, temperature and time to optimize process · 2. Self-developed intelligent feeding system for yeast fermentation tank"
- [ ] **Main performance indicator**: I+G content (calculated on dry basis)
- [ ] **5kg×2/carton** packaging (web)

#### Microbial Nutrition (web only — PDF không cover)

##### `ye-ce-powder`, `ye-fa-paste`, `ye-ce-paste`, `ye-microbial-nutrition`
- [ ] Web có spec đủ nhưng visual content rất ít. **Có thể tận dụng Production Process diagram của PDF2** (cùng quy trình lên men) cho block "How it's made".
- [ ] Application context: "Fermentation industry — antibiotics, amino acids, organic acids, enzyme preparations, vitamins, genetic engineering, biological materials"
- [ ] Có thể thêm 1 block "Use cases" với 3 nhóm: Antibiotics production · Probiotic culture · Enzyme/Vaccine R&D

#### Health-care / Human Nutrition (PDF1)

##### Nếu sau này thêm `human-yeast-beta-glucan` / `human-selenium-yeast`:
- [ ] **Lifestyle photos** từ PDF1 (sports/family/beach scenes) — cho positioning consumer health
- [ ] **Application Scope** mô tả 4-5 ngành: functional drinks · candies · beverages · health food · pharmaceutical raw materials
- [ ] **Safety claims**: "Heat resistant, non GMO, no allergens"
- [ ] **Health benefits liệt kê**: anti-infection · regulate blood lipids · improve intestinal function · lower allergic symptoms · enhance immunity

### 8.3 🖼️ Image asset extraction — danh sách ảnh nên export từ PDF

Để dùng làm asset cho website (export 1 lần, reuse khắp UI):

- [ ] **PDF1**: lifestyle photos (5-6 ảnh — sports, kids, family, beach)
- [ ] **PDF2**: facility aerial photo (trang 2), Chairman portrait (trang 5), 7 application use-case photos (trang 6), Production Process flow diagram (trang 7), 5 cert badges (trang 6-7)
- [ ] **PDF3**: 6 R&D equipment photos (trang 3-4), per-product animal photos (chicken, pig, fish, cattle), composition diagrams (cell wall layers, autolysis breakdown), handshake closing image

### 8.4 📋 Action items §8

| Ưu tiên | Việc |
|---|---|
| 🟠 P1 | Build `<USPIconRow />` component + load 4 USP per YE product (PDF2) |
| 🟠 P1 | Export 7 application use-case images từ PDF2 + build `<ApplicationAreasGrid />` |
| 🟠 P1 | Export Production Process diagram (PDF2 trang 7) hoặc redraw cleaner version |
| 🟡 P2 | Per-product enrichment content (8.2) — content writer pass |
| 🟡 P2 | Export composition/mechanism diagrams cho 4 animal products (PDF3) |
| 🟢 P3 | R&D Equipment Grid block cho About page |
| 🟢 P3 | Brand asset audit — tagline "30 years" + sub-brand Wan Fu Kang positioning |
