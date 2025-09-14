# Quickstart

## Prerequisites
- Node.js LTS installed (ensure `node` and `npm` in PATH)

## Local Development
- Start dev server
  - Windows PowerShell:
    - `$env:PATH = "C:\\Program Files\\nodejs;" + $env:PATH; & "C:\\Program Files\\nodejs\\npm.cmd" run dev`
- Open http://localhost:3000

## Build & Export
- Build static site:
  - Windows PowerShell:
    - `$env:PATH = "C:\\Program Files\\nodejs;" + $env:PATH; & "C:\\Program Files\\nodejs\\npm.cmd" run build`
- After build, copy `out/` to `docs/` for GitHub Pages publish root.

## Update Content
- Edit `resume_vibhor_janey_updated_aug_2025.md`.
- Rebuild to reflect changes.

## Performance Check
- Run Lighthouse (mobile) on Home. Targets: Perf ≥ 90, LCP < 2.5s, CLS < 0.1.

## Accessibility Check
- Keyboard through header, main, footer.
- Ensure alt text for images and visible focus states.
