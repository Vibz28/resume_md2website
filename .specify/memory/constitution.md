# resume_md2website Constitution
<!-- Minimal, practical rules for a static website project. -->

## Core Principles

### I. Static-Only Delivery
- No server-side runtime or databases. Deliver HTML, CSS, and client-side JS from static hosting/CDN.
- Avoid third-party runtime dependencies and trackers by default; any external script must be justified.

### II. Zero-Build by Default
- Prefer plain HTML/CSS/ES modules with no build step. If a build is introduced, it must:
	- Produce static assets to `dist/` (or `docs/` if using GitHub Pages).
	- Be reproducible with a single command and ≤ 2 direct dependencies, pinned.

### III. Accessibility & Semantics First
- Use semantic landmarks (header, nav, main, footer), labels, and alt text; keyboard navigation must work.
- Maintain visible focus styles and color contrast ≥ 4.5:1; avoid ARIA unless necessary.

### IV. Performance Budget
- Targets (mobile): Lighthouse Performance ≥ 90; LCP < 2.5s; CLS < 0.1.
- Total JS ≤ 50 KiB gzipped; CSS ≤ 50 KiB gzipped. Optimize and lazy-load images.

### V. Simplicity & Maintainability
- Prefer system fonts and no client-side routing framework. Keep URLs stable; minimize global state.
- Keep content readable without JavaScript; progressive enhancement only.

## Stack and Constraints

- Tech stack: HTML5, CSS3, and vanilla JS (ES6+). Small helper libraries allowed if ≤ 10 KiB each and justified.
- Project layout (recommended):
	- `src/index.html`, `src/styles.css`, `src/script.js`, `src/assets/`
	- Output: `dist/` (or `docs/` for GitHub Pages). Single entry `index.html` at the output root.
- Meta & SEO: Provide `<title>`, meta description, viewport, favicon, and Open Graph tags (title/description/image). `robots.txt` and `sitemap.xml` are optional.
- Images: Use modern formats (AVIF/WebP) with fallbacks; set width/height; apply `loading="lazy"` and `decoding="async"`.
- Fonts: Use system fonts by default; if loading web fonts, use `font-display: swap` and preload.
- Security/Privacy: No analytics or third-party scripts by default. If added, must be privacy-friendly (no PII) and documented.
- Hosting: Static hosting only. Default: GitHub Pages (serve from `docs/`), or any equivalent static host (Netlify/Vercel) serving the build output folder.
- Caching: If hashed filenames are available, set long cache for assets; otherwise keep assets small and immutable.
- Browser support: Evergreen browsers; graceful degradation for older ones.

## Development Workflow and Quality Gates

- Authoring: Content changes can commit directly to `main`. Structural/tooling changes require a PR.
- Required checks before publish/merge:
	1) Page loads without console errors.
	2) Quick accessibility pass (keyboard only; labels; focus visible; alt text present).
	3) Performance spot-check (Lighthouse or PageSpeed): Perf ≥ 90 on mobile for the home page.
	4) HTML validity (W3C validator) for `index.html` and any new pages.
- Deploy: Publish the static output folder (`docs/` or `dist/`) to hosting. For GitHub Pages, ensure `index.html` exists at the selected publishing root.

## Governance
<!-- Constitution supersedes preferences. Keep it short and enforceable. -->

- This constitution supersedes other practices for this project. Deviations require an issue titled "Deviation: <summary>" and explicit approval.
- Amendments require a PR updating this file with rationale and any migration notes. Bump the version and update dates below.
- Reviews should verify compliance with principles and quality gates.

**Version**: 1.0.0 | **Ratified**: 2025-09-14 | **Last Amended**: 2025-09-14
<!-- Keep versioning MAJOR.MINOR.PATCH for this document only. -->