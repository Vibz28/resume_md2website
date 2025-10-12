# Quickstart: Modern Resume Website

This project is a static site. Example steps if using Next.js (informational):

```powershell
# 1) Create project (if starting fresh)
# npm create next-app@latest .

# 2) Configure static export
# - App Router: set output: 'export' in next.config.js
# - Or Pages Router: use `next build` then `next export`

# 3) Build & export
# npm run build; npm run export

# 4) Preview static output
# npx serve out

# 5) Deploy to GitHub Pages (if using Pages)
# - Publish the `out/` folder to the gh-pages branch or /docs
```

Manual Acceptance Checks:
- Landing shows name/title and featured episode
- Episodes page lists up to 20 items
- Episode detail renders full content
- About and Projects pages display correctly
- Keyboard navigation works; images have alt text; visible focus
- Lighthouse mobile performance ≥ 90