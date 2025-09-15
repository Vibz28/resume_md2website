# Quickstart: Update Website Design (003)

This feature aligns the site with the new Figma design while preserving content and static export to GitHub Pages.

## Prerequisites
- Node.js 18+ and npm
- Windows PowerShell or your preferred shell

## Install
```powershell
npm ci
```

## Run locally
```powershell
npm run dev
# Open http://localhost:3000
```

## Run tests
```powershell
npm test
# For UI mode
npm run test:ui
```

## Build and static export (for GitHub Pages)
```powershell
npm run export
# Output copied to docs/ with .nojekyll to avoid Jekyll processing
```

Notes:
- Paths in production are served under the repository name. The helper `getPath()` in `src/lib/paths.ts` prepends `/resume_md2website` automatically during export.
- Keep routes working during migration to the single-page layout; we’ll wire section anchors while preserving `/experience`, `/projects`, and `/about` pages as fallbacks to avoid breaking links.

## What’s changing in this feature
- Single-page sections with smooth (reduced-motion aware) scrolling
- Filters for Projects and Publications with “Show more” batching
- Contact form using `mailto:` with client-side validation
- Dark mode theme toggle, accessible nav and focus management

## Verify
- Contract tests in `tests/contract/*.test.ts` should cover navigation, filters, contact, and experience achievements visibility.
- Manual check with keyboard navigation and `prefers-reduced-motion` enabled.

## Troubleshooting
- If links look broken on GitHub Pages, confirm `docs/` contains `.nojekyll` and the exported HTML uses `/resume_md2website` base. Ensure `NEXT_EXPORT=true` is set by the `export` script.
- On Windows, if long paths cause issues, enable Windows long paths or run from a shorter workspace path.
