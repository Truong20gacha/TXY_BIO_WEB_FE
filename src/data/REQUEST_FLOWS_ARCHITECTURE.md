# REQUEST FLOWS — KIẾN TRÚC BÊN TRONG 3 FLOW (Sample / Quote / Datasheet)

> **Trạng thái:** 🟡 DRAFT — 2026-06-09 (chờ chốt 5 quyết định ở mục cuối)
> **Mục tiêu:** Chuẩn hoá nội dung *bên trong* 3 nút trên product page (`/request-sample`, `/request-quote`, `/request-datasheet`) cho đúng cách ngành men/feed B2B giao dịch, đồng thời tái dùng tối đa data yeast đã có trong `information.json`.
> **Phạm vi:** Chỉ nội dung/field bên trong flow. Vỏ ngoài (kiểu nút, hierarchy trên `ProductDetailPage.tsx`) GIỮ NGUYÊN — đã OK.
> **Nguồn data sản phẩm:** [[information.json]] (`products[]`) + [[ctaPanelDefaults]] (panel + option lists).
>
> **Phát hiện cốt lõi:**
> - ~90% thứ 3 flow cần thì product ĐÃ CÓ sẵn (spec, composition, dosage theo loài, certs, packaging, shelf life, productCode, datasheetUrl, primaryFor).
> - Chỉ thiếu vài field thương mại: **HS code (per-product)** + **MOQ**.
> - Kiến trúc xoay quanh: tự động kéo data sẵn có vào VÙNG CONTEXT, khách gõ càng ít càng tốt.

---

## 0. Nguồn tham khảo ngành (research 2026-06-09)

| Nguồn | Loại | Rút ra |
|---|---|---|
| Knowde (sàn nguyên liệu) | best-practice form | 4 request: Sample / Quote(RFQ) / Document / Access. **Cắt field thừa, giữ field "Market"** để route báo giá. |
| Made-in-China — listing MOS90 (Tessin) | listing men thật | MOQ 1kg · giá bậc thang $22→$18.70/kg · sample $1/kg khách trả cước · HS 391390 · CTA: Send Inquiry/Chat/Request Sample |
| nutritionyeast — Yeast Cell Wall w/ MOS | supplier TQ | Bảng spec công khai (β-glucan ≥25%, MOS ≥15%, protein/ash/moisture) · MOQ 1 tấn · certs ISO/HALAL/GMP+/Kosher |
| Alltech Bio-Mos | đối thủ premium | Giấu giá, chỉ "Product Inquiry" theo vùng · mạnh về proof (734 trials, 114 peer-reviewed) |
| Angel Yeast (YeaMOS) | TQ, giống TXY | MOS + β-glucan; chỉ "Contact Us", không lộ form RFQ |

**2 trường phái → TXY đứng giữa:**
- China/Alibaba = minh bạch spec + giá bậc thang.
- Alltech = giấu hết, "contact for your region".
- **TXY-Úc:** minh bạch **spec + tài liệu** (tạo niềm tin hàng thật) NHƯNG **giá gated** (chỉ qua quote) — vì định vị "rẻ hơn Bio-Mos 18–28%" cần khách hỏi giá mới thấy chênh.

---

## 1. Nguyên tắc: mỗi flow = 3 vùng

```
┌─ VÙNG 1: CONTEXT (auto từ product — khách KHÔNG gõ) ──────┐
│  Kéo từ ?product=slug: tên, mã, spec, loài, certs...       │
├─ VÙNG 2: ASK (khách điền — ngắn nhất, ưu tiên "Market") ───┤
│  Chỉ hỏi cái buộc phải hỏi; phần còn lại để thương lượng   │
├─ VÙNG 3: RECEIVE (panel "bạn sẽ nhận được gì") ───────────┤
│  Từ ctaPanelDefaults — trấn an trước khi khách bấm gửi     │
└────────────────────────────────────────────────────────────┘
```

**"Market" field = Quốc gia + Bang/Tiểu bang + Loài vật.** Đây là field Knowde nhấn mạnh nhất — phải xuất hiện sớm ở cả 3 flow để route đúng.

---

## 2. Tầng dữ liệu — ĐÃ CÓ vs THÊM

| Dữ liệu | Trạng thái | Dùng ở flow |
|---|---|---|
| `name`, `productCode` (vd PG6893976) | ✅ có sẵn | cả 3 (header context) |
| `specifications[]` (β-glucan ≥20%, MOS ≥20%, protein, appearance) | ✅ có sẵn | Datasheet, Quote |
| `composition[]` (chart %) | ✅ có sẵn | Datasheet |
| `dosages[]` theo loài (shrimp/broiler/layer/piglet) | ✅ có sẵn | **pre-fill species** Sample/Quote |
| `functions[]`, `modeOfAction` (Bind/Block/Flush) | ✅ có sẵn | Datasheet summary |
| `certifications[]` (iso-9001, gmp-plus) | ✅ có sẵn | cả 3 (trust) |
| `packaging` (25kg paper bag w/ PE liner) | ✅ có sẵn | Quote, Sample, Datasheet |
| `shelfLife` (24 months), `storage` | ✅ có sẵn | Datasheet |
| `datasheetUrl` (PDF) | ✅ có sẵn | Datasheet |
| `primaryFor[]` (loài chính) | ✅ có sẵn | pre-fill dropdown |
| Lead time, Incoterms, Origin, Payment, sample policy | ✅ có global trong `ctaPanelDefaults` | Quote, Sample |
| **MOQ** (1kg mẫu / 1 tấn sỉ) | ➕ THÊM | Quote, Sample |
| **HS Code** (vd 391390) | ➕ THÊM per-product | Quote (chống lưng AANZFTA duty) |
| Giá / giá bậc thang | 🔒 KHÔNG show — chỉ qua quote | — |

→ Lượng data phải thêm rất ít: chỉ **HS code (per-product)** + **MOQ**. Còn lại tái dùng 100%.

---

## 3. FLOW 1 — SAMPLE 🧪 (`/request-sample`)

| Vùng | Nội dung | Nguồn |
|---|---|---|
| **CONTEXT** | "Sample of **{name}** · {productCode}" + snapshot spec (β-glucan, MOS) + 3 doc kèm (COA·MSDS·TDS) | auto từ product |
| **ASK** | Market (Country + State) · **Target species** (pre-fill `primaryFor`) · **Intended use** (Lab eval / Feed trial) ➕ · **Sample size** (100g lab / 2–5kg trial) ➕ · Volume intent · Company · Email · Shipping address | form |
| **RECEIVE** | 100g free *(hoặc paid — chốt #1)*, buyer pays freight, 1–2 tuần, kèm COA+MSDS+TDS, export-control note | `samplePanelDefaults` |

**Form hiện tại (8 field):** companyName, country, estimatedVolume, fullName, intendedApplication, shippingAddress, specialRequirements, workEmail.
**Thêm:** `targetSpecies` (auto pre-fill) · `intendedUse` (lab/trial) · `sampleSize`.

---

## 4. FLOW 2 — QUOTE / RFQ 💬 (`/request-quote`)

| Vùng | Nội dung | Nguồn |
|---|---|---|
| **CONTEXT** | "Quote for **{name}**" + MOQ + packaging (25kg) + HS code (391390) | auto + ➕ |
| **ASK (rút gọn)** | Market (Country + State) · Application/species · First-order volume + Annual volume · Incoterms + Destination port · Company + Email | form |
| **RECEIVE** | Quote PDF (FOB/CIF), lead time tới cảng, sắp xếp sample, draft contract, certs cho thị trường. SLA 1 ngày làm việc + ghi chú "giá giảm theo volume" | `salesPanelDefaults` |

**⚠ Vấn đề lớn nhất — form đang 19 field:** additionalNotes, annualVolume, businessType, certifications, companyName, companyWebsite, country, currency, currentlyUsing, destinationPort, firstOrderVolume, fullName, incoterms, jobTitle, orderTiming, paymentTerms, phone, specRequirements, targetMarket, workEmail.
**Knowde: cắt field thuộc thương lượng sau.** Đề xuất **trim còn ~8 field** (chốt #5), đẩy currency/paymentTerms/jobTitle/companyWebsite/orderTiming/certifications sang bước trao đổi sau.

---

## 5. FLOW 3 — DATASHEET / DOCUMENTS 📄 (`/request-datasheet`)

| Vùng | Nội dung | Nguồn |
|---|---|---|
| **PUBLIC (không gated)** | 1-pager tự dựng: `shortDescription` + bảng `specifications` + `dosages` theo loài + certs | auto từ product |
| **GATED (form ngắn)** | Pack 3 file: TDS · COA · MSDS | `datasheetUrl` + defaults |
| **ASK (tối thiểu)** | Market (Country) · Company · Email · Reason (R&D/Regulatory/Vendor qual) · giữ `benchmarkingAgainst` (bắt "đang dùng Bio-Mos" = vàng cho sales) | form |

**Form hiện tại (9 field):** benchmarkingAgainst, companyName, confidentiality, fullName, reason, specsOfInterest, targetMarket, targetSpecies, workEmail → đã ổn, chỉ nên nhẹ bớt.

---

## 6. QUYẾT ĐỊNH CẦN CHỐT (lock như ABOUT_ARCHITECTURE)

| # | Quyết định | Lựa chọn | Khuyến nghị | Trạng thái |
|---|---|---|---|---|
| 1 | Sample free hay paid? | free 100g / paid $X/kg + khách trả cước | giữ free 100g cho lab, paid cho trial-size | ⬜ chờ chốt |
| 2 | MOQ để đâu? | global (1 tấn animal-nutrition) / per-product | global default + override khi cần | ⬜ chờ chốt |
| 3 | Thêm HS code per-product? | có / không | **có** — cần cho câu chuyện AANZFTA duty | ⬜ chờ chốt |
| 4 | Giá gated hoàn toàn? | gated / show | **gated** (chỉ qua quote) | ⬜ chờ chốt |
| 5 | Trim quote form 19 → ~8 field? | có / không | **có** | ⬜ chờ chốt |

---

## 7. Files liên quan khi implement

| File | Vai trò |
|---|---|
| `src/data/ctaPanelDefaults.ts` | Panel "bạn nhận được gì" + option lists (sửa nhiều nhất) |
| `src/data/information.json` (`products[]`) | Thêm `hsCode`, `moq` per-product (nếu chốt #2/#3) |
| `src/sections/contact/forms/SampleForm.tsx` | Thêm targetSpecies/intendedUse/sampleSize |
| `src/sections/contact/forms/SalesForm.tsx` | Trim field (chốt #5) |
| `src/sections/contact/forms/DatasheetForm.tsx` | Nhẹ bớt |
| `src/pages/RequestSamplePage.tsx` / `RequestQuotePage.tsx` / `RequestDatasheetPage.tsx` | Vùng CONTEXT auto pre-fill từ `?product=slug` |

---

## 8. PDF BUILD — KIẾN TRÚC UY TÍN (download datasheet) 🔒 trust-first

> **Nguyên tắc vàng:** Uy tín = **KHÔNG giả tài liệu kiểm soát**. QA của khách được huấn luyện soi COA giả (xem red flags 8.4). Tự sinh COA "đẹp" từ data marketing = tự bắn vào chân + rủi ro pháp lý. Trust đến từ việc *thành thật* phân biệt "spec điển hình" vs "chứng nhận theo lô".
>
> **Hiện trạng:** 48 file placeholder ~945 bytes (1 dòng "placeholder for demo"). Cần build lại.

### 8.1 Phân loại 4 file theo bản chất → cách build

| File | Bản chất | Cách build | Lý do |
|---|---|---|---|
| `summary.pdf` | spec điển hình + marketing | ✅ Generate từ `product` data | không gắn lô → hợp lệ |
| `tds.pdf` | spec kỹ thuật điển hình | ✅ Generate từ data **+ document-control đầy đủ** | data-driven chính danh, luôn khớp catalogue |
| `coa.pdf` | chứng nhận **theo lô thật** | ❌ KHÔNG generate — file lab thật / cấp theo lô khi có đơn | fake = mất uy tín + rủi ro pháp lý |
| `msds.pdf` | tài liệu GHS 16 mục kiểm soát | ❌ File thật theo template | controlled document |

### 8.2 Bộ tín hiệu uy tín BẮT BUỘC trên file generate (TDS/summary)

Từ chuẩn ISO/IEC 17025, FAMI-QS, COA guides:

1. **Header pháp nhân** — legal entity name + địa chỉ đầy đủ + registration + logo + tiêu đề tài liệu
2. **Document control block** — Doc No. (`TDS-{productCode}-EN`) · Version/Rev No. · Issue date · Supersedes · Page X of Y · dòng "Controlled document"
3. **Product identity** — name · productCode · HS code · origin · appearance
4. **Spec table CÓ CỘT METHOD** — `Parameter | Specification | Method | Unit` (đây là điểm research nhấn mạnh nhất: mọi chỉ tiêu phải có test method, vd HPLC/Kjeldahl/AOAC)
5. **Certifications KÈM SỐ + cơ quan cấp** — không chỉ logo (vd "ISO 9001 No. XXXX — issued by SGS")
6. **Disclaimer "typical values"** — "Values represent typical specification, not a batch certificate. For batch-specific results, request a Certificate of Analysis (COA)."
7. **Câu QMS** — "Issued under TXY's quality management system (ISO 9001 / GMP+)"
8. **Liên hệ verify** — email/phone xác thực tài liệu + (tùy chọn) QR/verify link
9. **Footer** — confidentiality · copyright · "uncontrolled when printed" · revision date

### 8.3 Data cần bổ sung để đủ uy tín (gap hiện tại)

| Cần thêm | Hiện trạng | Đặt ở đâu |
|---|---|---|
| `method` cho mỗi spec (HPLC, Kjeldahl...) | `specifications[]` chỉ có label+value | per-product |
| Số chứng chỉ + cơ quan cấp | `certifications[]` chỉ có code (iso-9001...) | global cert registry |
| `hsCode`, `origin` | chưa có | per-product / global |
| Doc version + issue-date scheme | chưa có | global |
| Legal entity block + QA signatory (tên, chức danh) | chưa có | global |

### 8.4 Red flags PHẢI tránh (từ research — đây là thứ QA khách soi)

- Kết quả **đúng y chang spec limit** ở mọi dòng → trông bịa
- **Batch number generic/thiếu** → không truy xuất
- **Không ghi test method**
- Tự test không có lab bên thứ 3 (ISO 17025) cho COA
- Bỏ qua chỉ tiêu rủi ro cao (aflatoxin, heavy metals)
- Ngày phân tích cách xa ngày sản xuất

### 8.5 Luồng download đề xuất

| File | Gating | Hành vi |
|---|---|---|
| `summary.pdf` | Public | 1-click generate + tải ngay |
| `tds.pdf` | Gated nhẹ (email) | generate sau khi submit form |
| `coa.pdf` | Sales-mediated | "Request batch-specific COA" → sales gửi file lô thật |
| `msds.pdf` | Public/gated | tải file thật |

### 8.6 Method build (khuyến nghị)

- **TDS + summary:** sinh client-side bằng **jsPDF** (1-click ra `.pdf` thật, luôn khớp data). _Chờ anh chốt._
- **COA + MSDS:** file tĩnh thật, swap khi có.

### 8.7 Nguồn research (2026-06-09)

- COA components: [Contract Laboratory](https://contractlaboratory.com/certificate-of-analysis-coa-understanding-its-importance-and-key-components/) · [Nutrada – How to read a COA](https://nutrada.com/blog/how-to-read-coa) · [Certificate of Analysis – Wikipedia](https://en.wikipedia.org/wiki/Certificate_of_analysis)
- Feed-additive TDS params (CFU, heavy metals, mycotoxins, dusting): [EFSA Yea-Sacc dossier](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11986435/)
- Document control: [FAMI-QS Code of Practice](https://fami-qs.org/scheme-documents/)

---

## Những điều cần tránh

- Không show giá lên product page (phá định vị "hỏi quote mới thấy rẻ hơn Bio-Mos").
- **Không generate COA/MSDS từ data marketing** — giả tài liệu kiểm soát = mất uy tín + rủi ro pháp lý (xem Mục 8).
- **Không show spec mà thiếu cột test method** — research nói đây là tín hiệu yếu/giả.
- Không bắt khách gõ lại thứ product đã có (species, spec, packaging) — phải auto pre-fill.
- Không claim HS code / AANZFTA 0% duty nếu chưa verify origin + HS thật (xem [[TXY_AU_FIX_NOTES]]).
- Không để quote form dài lê thê — mỗi field thừa = một khách bỏ đi.
