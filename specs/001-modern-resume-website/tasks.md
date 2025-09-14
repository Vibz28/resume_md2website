# Tasks: Modern Resume Website

**Input**: Design documents from `/specs/001-modern-resume-website/`  
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
Refer to `.github/prompts/tasks.prompt.md`. Tasks below follow TDD and dependency ordering.

## Phase 3.1: Setup
- [ ] T001 Create Next.js project skeleton at repository root (or `frontend/`) per plan.md; ensure static export configuration file exists (path will be confirmed in implementation step)
- [ ] T002 Initialize project dependencies (next, react, react-dom) and scripts for build/export; add TypeScript config if desired
- [ ] T003 [P] Configure linting/formatting (ESLint + Prettier) and basic GitHub Pages static output folder (e.g., `out/` or `/docs`)

## Phase 3.2: Tests First (TDD)
Integration tests derived from user stories and contracts. Create test placeholders first; they should fail until implementation exists.
- [ ] T004 [P] Integration test: Landing shows name/title and featured episode in `tests/integration/landing.test.md`
- [ ] T005 [P] Integration test: Episodes list shows up to 20 items in `tests/integration/episodes-list.test.md`
- [ ] T006 [P] Integration test: Episode detail renders full content by slug in `tests/integration/episode-detail.test.md`
- [ ] T007 [P] Integration test: About displays bio and contacts in `tests/integration/about.test.md`
- [ ] T008 [P] Integration test: Projects list renders items with links in `tests/integration/projects.test.md`
- [ ] T009 [P] Contract test: Content schemas conformance for Episodes in `tests/contract/content-schemas-episodes.test.md` (based on `contracts/content-schemas.md`)
- [ ] T010 [P] Contract test: Routes presence and data shape in `tests/contract/routes.test.md` (based on `contracts/routes.md`)

## Phase 3.3: Core Implementation
- [ ] T011 Create content parser for `resume_vibhor_janey_updated_aug_2025.md` at `src/lib/parseResumeMarkdown.ts` to output Profile, Episodes, Projects
- [ ] T012 [P] Implement data model types/interfaces at `src/lib/models.ts` per `data-model.md`
- [ ] T013 Implement ordering and capping logic (newest-first, max 20) at `src/lib/episodes.ts`
- [ ] T014 Create Landing page route with featured episode at `app/page.tsx` (or `pages/index.tsx`)
- [ ] T015 Create Episodes list page at `app/episodes/page.tsx` (or `pages/episodes/index.tsx`)
- [ ] T016 Create Episode detail page at `app/episodes/[slug]/page.tsx` (or `pages/episodes/[slug].tsx`)
- [ ] T017 Create About page at `app/about/page.tsx` (or `pages/about.tsx`)
- [ ] T018 Create Projects page at `app/projects/page.tsx` (or `pages/projects.tsx`)
- [ ] T019 [P] Implement site-wide layout/navigation and footer at `app/layout.tsx` (or `_app.tsx` and layout components)
- [ ] T020 [P] Add image handling with placeholders and alt text at `src/components/Image.tsx` and use across pages
- [ ] T021 Add SEO metadata defaults and per-page titles/descriptions at `app/` metadata files or `<Head>` usage
- [ ] T022 Ensure keyboard navigation, focus styles, and basic color contrast in `src/styles/globals.css`
- [ ] T023 Make layout responsive (mobile-first) using CSS; verify small screens

## Phase 3.4: Integration
- [ ] T024 Configure static export (`next.config.js` with `output: 'export'` or export script) and verify output to `out/`
- [ ] T025 Add GitHub Pages config (if using Pages): ensure correct base path/asset prefix (document in README)
- [ ] T026 Run tests from Phase 3.2 and ensure they pass; fix any defects uncovered

## Phase 3.5: Polish
- [ ] T027 [P] Lighthouse mobile run and address performance issues to reach ≥90
- [ ] T028 [P] Final copy polish and OG/social meta image setup (default image)
- [ ] T029 [P] Update `specs/001-modern-resume-website/quickstart.md` with any deviations
- [ ] T030 Clean up and prepare for publish (check console free of errors)

## Dependencies
- T001 → T002 → T024 (project/build pipeline)
- T004–T010 must exist and fail before T011–T023 (TDD)
- T011 (parser) blocks T014–T018 (pages consuming data)
- T012 types can be done in parallel with T011
- T019–T023 can proceed after at least one page exists; prefer after T014–T018
- T024 must precede T027 (perf run on exported site)

## Parallel Example
```
# After setup:
Run in parallel: T004, T005, T006, T007, T008, T009, T010

# During core implementation:
Run in parallel: T012 (types) and T019 (layout) while T011 (parser) progresses
```

## Notes
- Paths assume Next.js App Router; if using Pages Router, use the alternative paths noted next to each route.
- Keep tasks confined to unique files for [P] items to avoid conflicts.
- Commit after each task; ensure tests fail first, then implement to pass.
