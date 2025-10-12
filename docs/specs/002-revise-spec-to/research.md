# Phase 0 Research

## Decisions
- Use Next.js with Static Export (App Router) to generate a fully static website.
- Source of truth for content is `resume_vibhor_janey_updated_aug_2025.md`; Projects draw from resume; no podcast episodes.
- Pages: Home, Experience, Projects, About.
- Accessibility: semantic landmarks, keyboard nav, alt text, visible focus.
- Performance targets (mobile): Lighthouse ≥ 90, LCP < 2.5s, CLS < 0.1.
- JS/CSS budgets (gzipped): JS ≤ 50 KiB, CSS ≤ 50 KiB.
- No analytics/third-party scripts by default.
- Static hosting: GitHub Pages. Publish the static folder at `docs/` (copy from Next.js `out/`).

## Rationale
- Next.js static export provides templating and MD parsing while delivering a static site for GitHub Pages.
- Resume-as-content ensures single-source consistency; avoids backend/databases.
- Budgets align with project constitution to keep the site fast and simple.

## Alternatives Considered
- Plain HTML + minimal JS: Simpler toolchain but slower iteration on content parsing and templating.
- Astro or Eleventy: Good static-site options, but project already uses Next.js; switching would delay delivery.

## Open Items (Resolved)
- Grouping of roles: reverse-chronological only, no company grouping.
- Education/Courses location: About page below Skills.
- Downloadable resume: PDF link on About; optional highlight on Home.

## Risks & Mitigations
- Risk: Next.js shared chunk size could push JS budget. Mitigation: remove unused libs, keep components minimal, no client-heavy interactivity; verify Lighthouse.
- Risk: GitHub Pages pathing. Mitigation: publish to `docs/` root, ensure relative asset paths.
