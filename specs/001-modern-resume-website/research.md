# Research: Modern Resume Website

## Topics & Decisions

### Static Export (Next.js)
- Decision: Use Next.js static export (no server functions). Prefer App Router with `output: 'export'` or Pages Router with `next export`.
- Rationale: Built-in routing, templating, SEO helpers, and static page generation.
- Alternatives: Pure HTML/CSS/JS (manual routing/templating); Astro (static-first but adds learning curve).

### Hosting
- Decision: GitHub Pages or equivalent static host. If using a subpath, set `basePath`/`assetPrefix` appropriately.
- Alternatives: Netlify/Vercel (simpler deploy) but still static-only.

### Content Parsing from Markdown
- Decision: Parse Episodes, About, Projects from `resume_vibhor_janey_updated_aug_2025.md` by section headings.
- Rationale: Single source of truth; no external feeds.
- Alternatives: Split files per episode (cleaner diffs) but outside current constraint.

### SEO & Social Meta
- Decision: Each page includes `<title>`, meta description, and Open Graph tags (title, description, image). A default OG image is acceptable.

### Accessibility & Performance
- Decision: Keyboard navigable; semantic landmarks; visible focus; color contrast ≥ 4.5:1. Keep JS/CSS lean; lazy-load images.

## Resolved Unknowns (Assumptions)
- Episode ordering: newest-first by date; ties: slug.
- Thumbnails: optional; 16:9 visual; placeholder when absent.
- Contact: links only; no form.
