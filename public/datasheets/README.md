# Datasheet PDFs

Mỗi sản phẩm cần **4 file PDF** trong folder của nó:

```
<slug>/
├── summary.pdf   # Public 1-pager  (~120 KB, 1 page)  — download trực tiếp không cần form
├── tds.pdf       # Technical Data Sheet  (~180 KB, 2–4 pages)  — gated qua form
├── coa.pdf       # Certificate of Analysis  (~80 KB, 1–2 pages)  — gated qua form
└── msds.pdf      # Material Safety Data Sheet  (~350 KB, 5–10 pages)  — gated qua form
```

## 12 slug cần phủ

- autolyzed-yeast
- selenium-yeast
- ye-ce-paste
- ye-ce-powder
- ye-fa-paste
- ye-kokumi
- ye-microbial-nutrition
- ye-standard-paste
- ye-standard-powder
- ye-umami
- yeast-beta-glucan
- yeast-cell-wall-mos

Tổng: **12 × 4 = 48 file PDF**

## URL serving

- Public summary: `/datasheets/<slug>/summary.pdf` (download button trên trang `/request-datasheet`)
- Gated pack: `/datasheets/<slug>/{tds,coa,msds}.pdf` (3 nút download sau khi submit form)

## Phase placeholder

Cho demo, có thể tạo 4 file PDF "Lorem ipsum" cùng nội dung dùng cho cả 12 SP rồi copy paste. Sau khi có nội dung thật thì swap từng file.
