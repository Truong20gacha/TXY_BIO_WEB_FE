# Image assets

Drop image files into the folder that matches the **section** (or page) where they appear in the UI.
Files in `public/` are served at the root URL — e.g. `public/images/homepage/hero.jpg` → `/images/homepage/hero.jpg`.

---

## Folder structure (by section)

```
public/images/
├── shared/        Logo, favicon, generic fallback
├── og/            Open Graph social meta (1200×630)
├── certs/         Certification badge logos (reused across Footer, CertificationsStrip, ProductDetail)
├── homepage/      sections/homepage/* (HomeHero, AboutSnippet)
├── products/      Per-product folders (one per slug)
│   ├── yeast-cell-wall-mos/
│   ├── yeast-beta-glucan/
│   ├── selenium-yeast/
│   └── autolyzed-yeast/
├── about/         pages/AboutPage + sections/about/*
├── contact/       pages/ContactPage
└── news/          pages/NewsListPage + NewsCard articles
```

---

## Naming conventions

- **kebab-case** filenames: `hero.jpg`, `facility-1.jpg`, `team-portrait.jpg` (never `Hero.JPG` or `Team_Portrait.jpg`)
- **JPG** for photos, **SVG** for logos/icons, **PNG** only when transparency on a photo is needed
- **OG images**: always 1200×630 px, JPG, < 300 KB
- **Product gallery**: number sequentially — `gallery-01.jpg`, `gallery-02.jpg`, `gallery-03.jpg`
- **Hero images**: always `hero.jpg` inside the section folder

---

## Where the code reads these paths

| Section folder | Referenced by | Path source |
|---|---|---|
| `products/[slug]/card.jpg` | `ProductCard` (future) + OG meta | `information.json` → `products[].image` |
| `products/[slug]/gallery-*.jpg` | `ProductDetailPage` Swiper | `information.json` → `products[].gallery` |
| `certs/*.svg` | `CertificationsStrip`, `Footer`, `CertificationBadges` | `information.json` → `certifications[].icon` |
| `og/*.jpg` | `<meta property="og:image">` (Phase 7 SEO) | `information.json` → `seo.*.ogImage` |
| `homepage/hero.jpg` | `sections/homepage/HomeHero` | hard-coded in component (when added) |
| `about/*.jpg` | `sections/about/*` (Phase 5) | hard-coded in component (when added) |
| `news/articles/*.jpg` | `NewsCard` (optional, image-led variant) | `news-mock.json` → `articles[].imageUrl` (when added) |

---

## When real images arrive

1. Drop the file into the matching section folder
2. Verify the path in `information.json` (or component) matches the filename
3. Run `npm run dev` and check the section — image should appear immediately (no rebuild needed for `public/`)

If you change a path in `information.json`, the TypeScript types regenerate automatically from `typeof data` — no type-file edit needed.
