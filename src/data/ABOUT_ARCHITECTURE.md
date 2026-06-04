# ABOUT PAGE — KIẾN TRÚC CHỐT (Trust Funnel cho B2B buyer)

> **Trạng thái:** 🔒 LOCKED — 2026-06-04
> **Mục tiêu:** Hiển thị đủ trụ uy tín để B2B buyer (food/feed, xuất khẩu) tin tưởng và chuyển sang xem/mua sản phẩm.
> **Nguồn data:** [[TXY_Company_About.md]] (canonical) + PDF brochures + folder ảnh `public/images/certs_image` (user curate).
>
> **Quyết định đã chốt:**
> - Độ dài: **10 section đầy đủ** (trust tối đa, không rút gọn).
> - Cao trào Certs: **Export Filing Cert No 4400/19061 + 9 authorised products làm anchor**, badge + 4 license doc ở dưới.
> - Pattern: componentize `src/sections/about/*` (thin composer `AboutPage.tsx`) — khớp convention homepage/contact.
> - Data: tập trung trong `information.json`. Thứ tự build JSON: an toàn (founder/licenses/applicationFields/certs additive) → rủi ro site-wide (company core) cuối.
> - Ảnh: lấy từ folder user curate, KHÔNG crop PDF (chỉ mine PDF lấy text). Xem [[asset-source-preference]].

---

## 1. Nguyên tắc trust

1. **Show, don't tell** — chìa giấy tờ/ảnh thật (license, cert, patent, nhà máy, mặt founder) thay vì chỉ tuyên bố.
2. **Front-load proof** — dồn mật độ uy tín lên đầu (badge strip trong hero + stats bar).
3. **Prove "manufacturer, not trader"** — capacity 8.000 tấn/năm + ảnh nhà máy + holding structure.
4. **Compliance = export-ready** — Export Filing Cert là tín hiệu mạnh nhất cho buyer quốc tế → làm anchor.
5. **Bridge trust → mua** — authorised products & application fields link thẳng sang catalogue.

---

## 2. Section flow (10 section)

```
HERO ─ identity + tagline + badge strip (mirror brochure cover)
01 ► TRUST STATS BAR        30+ năm · 8.000 tấn/năm · 3 pháp nhân · 6 chứng chỉ QT · xuất khẩu đa khu vực
02 ► COMPANY PROFILE        Founded 2010 · HQ Zhuhai Guangdong · national high-tech · German env. system
03 ► HOLDING STRUCTURE      org-chart 3 entity (chống nỗi sợ shell/trader)
04 ► PRODUCTION & FACILITIES 8.000 tấn/năm + ảnh nhà máy/silo (chứng minh tự sản xuất)
05 ► FOUNDER                Ye Zhi Li (ảnh + 9 credentials + message)
06 ► ⭐ CERTIFICATIONS & LICENSES — CAO TRÀO
       Export Filing No 4400/19061 (anchor) + 9 authorised products
       6 badge (BRC·ISO22000·CNAS·HALAL·Kosher·Sedex) + 4 license doc (lightbox)
07 ► R&D & RECOGNITION      5 patent + research centers + institutional honors
08 ► APPLICATION FIELDS → PRODUCTS  4 lĩnh vực link catalogue (cầu nối tin→mua)
09 ► MARKETS SERVED         domestic + overseas (social proof)
10 ► VALUES + CONTACT CTA   mission/vision + HQ address · hotline 4006-0756-16 · request quote/sample
```

---

## 3. Spec từng section

| # | Component (`src/sections/about/`) | Data (`information.json`) | Asset | Trust role | Status |
|---|---|---|---|---|---|
| Hero | `AboutHero.tsx` | `company` + `certifications` | badge strip | Identity + cert trong 3s | 🔴 fix |
| 01 | `AboutStatsBlock.tsx` | `stats` (+capacity) | — | Quét nhanh uy tín | 🔴 fix |
| 02 | `CompanyProfile.tsx` | `company` | HQ photo (opt) | Hợp pháp, có nền tảng | 🔴 fix |
| 03 | `HoldingStructure.tsx` 🟢 | `company.subsidiaries` | CSS diagram | "Tập đoàn thật" | 🟢 new |
| 04 | `ProductionFacilities.tsx` 🟢 | `facilities` + `stats` | plant photos | "Nhà sản xuất" | 🟢 new |
| 05 | `FounderSection.tsx` | `founder` ✅ + `chairmanMessage` | founder photo | Lãnh đạo thật | ✅ data done |
| 06 | `CertificationsLicenses.tsx` ⭐ | `certifications` + `licenses` 🟢 | cert + license imgs | #1 mua hàng food/feed | 🟢 rebuild |
| 07 | `InnovationRecognition.tsx` 🟢 | `honors` + patents + `rdResults` | patent imgs (opt) | Năng lực đổi mới | 🟢 new |
| 08 | `ApplicationFields.tsx` 🟢 | `applicationFields` 🟢 + `productCategories` | — | Cầu nối → mua | 🟢 new |
| 09 | `MarketsServed.tsx` 🟢 | `company.marketsServed` | — | Social proof | 🟢 new |
| 10 | `CulturalVision.tsx` + CTA | `mission/vision/philosophy` + `contact` | — | Brand + chốt liên hệ | ⏸️ keep |

🟢 mới · ✅ xong · 🔴 fix data bịa · ⏸️ giữ

---

## 4. Section 06 — Certs & Licenses (layout cao trào)

```
┌─ 06 · Certified & Export-Ready ────────────────────────────┐
│ ANCHOR (top, nổi bật):                                      │
│   ┌──────────────────────────────────────────────┐         │
│   │ Export Food Production Enterprise Filing       │         │
│   │ Filing No. 4400/19061                          │ [doc ảnh]│
│   │ Entity: Zhanjiang Wuzhou Biology Eng. Co., Ltd │         │
│   │ → Authorised cho 9 product types ↓             │         │
│   └──────────────────────────────────────────────┘         │
│                                                             │
│ 9 AUTHORISED PRODUCTS (chip, cross-link sang /products):    │
│   Active Dry Yeast · Edible Yeast · Nutritional Yeast ·     │
│   Yeast Extract · Yeast Autolysate · Yeast for Culture      │
│   Medium · Yeast Cell Wall · Yeast Powder/β-Glucan ·        │
│   Nutrient-rich Yeast                                       │
│                                                             │
│ 6 BADGE (grid): BRC · ISO22000 · CNAS · HALAL · Kosher · Sedex │
│ 4 LICENSE DOC (lightbox/ZoomableImage):                     │
│   Business License · Food Production License ·              │
│   Production Catalogue · Export Filing                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Data layer changes (`information.json`)

| Key | Hành động | Blast radius |
|---|---|---|
| `founder` | ✅ DONE — Ye Zhi Li data thật | About only |
| `licenses` 🟢 | section mới — 4 doc + filingNo + authorised products | About only |
| `applicationFields` 🟢 | section mới — 4 field → productCategories | About only |
| `certifications.items` | **additive** — giữ 8 id cũ, +iaf/cnas/sedex, +badgeImage/authority/category/scope | ⚠️ products ref id → chỉ thêm |
| `stats.items` | fix "2003"→2010, +"8.000 tấn/năm" | About + homepage (content) |
| `company.subsidiaries` | thay 3 bịa → 3 thật (+ownership/acquired/capacity) | About + structure |
| `company` core (legalName/tagline/established/HQ/logo) | 🔴 P0 site-wide | **Header/Footer/SEO** → confirm riêng |

---

## 6. Asset cần (từ folder user curate `public/images/certs_image/`)

- Founder portrait → `public/images/about/founder-ye-zhi-li.jpg`
- 6 cert badge → `public/images/certs/`
- 4 license doc → `public/images/about/licenses/`
- Plant/HQ/subsidiary photos → `public/images/about/` (cho section 04)

---

## 7. Build order

**DATA LAYER — ✅ HOÀN TẤT (2026-06-04):**
1. ✅ `data.founder` (Ye Zhi Li thật)
2. ✅ Asset pipeline — 26 ảnh sạch trong `public/images/{about,certs}/` (founder/certs/licenses/facilities/honors)
3. ✅ `data.applicationFields` + `data.licenses` (Export Filing 4400/19061 + 9 authorised)
4. ✅ `data.certifications` additive (+CNAS +Sedex +badgeImage, 10 item)
5. ✅ `data.stats` (2010 + 8.000 tấn/năm) + `company.subsidiaries` (3 entity thật)
6. ✅ `company` core P0 — TXYbio→TXY toàn site (JSON + Header + Footer + SEO + copyright)

**UI LAYER — ⏳ CHƯA LÀM:**
7. ⏳ Cleanup: xoá `public/images/certs_image/` (folder nguồn 36 file tên tiếng Việt — đã copy xong)
8. ⏳ Build `src/sections/about/*` components (theo bảng §3) — 10 component
9. ⏳ Refactor `AboutPage.tsx` → thin composer

> Lưu ý markets: giữ highlight Australia/NZ (quyết định chiến lược, web nhắm thị trường Úc).

---

*Locked 2026-06-04 · Implement bám theo file này. Đổi kiến trúc → cập nhật file này trước.*
