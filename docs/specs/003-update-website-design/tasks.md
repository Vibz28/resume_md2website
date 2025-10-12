# Tasks: Update Website Design (003)

Input: `/specs/003-update-website-design/` (plan.md, research.md, data-model.md, contracts/)
Prerequisites: Next.js + Tailwind already present; static export to `docs/`

## Phase 3.1: Setup
- [ ] T001 [P] Add UI deps: `shadcn/ui` (components), `class-variance-authority`, `tailwind-merge`, `lucide-react`, `framer-motion`
- [ ] T002 [P] Verify Tailwind + PostCSS configured (`tailwind.config.js`, `postcss.config.js`, `src/app/globals.css`)
- [ ] T003 [P] Ensure path handling via `src/lib/paths.ts`: dev uses plain `/`, export build uses basePath `/resume_md2website`

## Phase 3.2: Tests First (TDD)
- [ ] T004 [P] Contract test: SPA section nav/anchors per `contracts/navigation.md` in `tests/contract/navigation-spa.test.ts`
- [ ] T005 [P] Contract test: Projects filter + batching per `contracts/projects-filter.md` in `tests/contract/projects-filter.test.ts`
- [ ] T006 [P] Contract test: Publications filter per `contracts/publications-filter.md` in `tests/contract/publications-filter.test.ts`
- [ ] T007 [P] Contract test: Contact form per `contracts/contact-form.md` in `tests/contract/contact.test.ts`
- [ ] T008 Integration test: Experience achievements visibility (3 default desktop, 2 mobile) in `tests/experience-content.test.ts`

## Phase 3.3: Core Implementation
- [ ] T009 Base layout: sticky header with section links + active highlight; footer unchanged (`src/app/layout.tsx`, `src/components/Nav.tsx`)
- [ ] T010 Theme toggle (light/dark) with prefers-color-scheme fallback (`src/components/ThemeToggle.tsx`)
- [ ] T011 Home as SPA shell: add section anchors and skeletons for About, Experience, Projects, Publications, Contact (`src/app/page.tsx`)
- [ ] T012 Projects filtering + “Show more” batching (12 per batch) (`src/components/ProjectsSection.tsx`)
- [ ] T013 Publications list + filters, newest-first sort (`src/components/PublicationsSection.tsx`; extend parser)
- [ ] T014 Contact form with client-side validation and mailto submission (`src/components/ContactForm.tsx`)
- [ ] T015 Accessibility: focus management, skip-to-content, reduced-motion guards across interactive components

### Core Implementation (continued)
- [ ] T016 Mobile navigation (hamburger + drawer/sheet) with keyboard/focus trap and aria attributes (`src/components/MobileNav.tsx`, update `src/app/layout.tsx`)
- [ ] T017 Experience section: collapsible achievements (default 3 desktop, 2 mobile; expand up to 6) and reuse logic on `/experience/` page (`src/components/ExperienceSection.tsx`, update `src/app/experience/page.tsx`)

## Phase 3.4: Data/Parsing
- [ ] T018 Extend `parseResumeMarkdown` to extract Publications and any categories; update `src/lib/models.ts`
- [ ] T019 Validate Experience parsing retains achievements and summaries; add defensive fallbacks

## Phase 3.5: Polish and Docs
- [ ] T020 [P] Unit tests for helpers (mailto body encode, filtering utils) in `tests/unit/utils.test.ts`
- [ ] T021 [P] Lighthouse/perf pass locally (≥95), verify reduced-motion behavior
- [ ] T022 [P] Update docs: `specs/003-update-website-design/quickstart.md` and root `README.md` summary of SPA migration

## Dependencies
- T004–T008 before T009–T019 (tests before implementation)
- T018 blocks T013 (parser before publications UI)
- T009 before T011 (layout before SPA shell)
- Docs/polish (T020–T022) after core

## Parallel Examples
- Run in parallel: T004, T005, T006, T007 [different test files]
- Implement in parallel after tests: T010, T012 [unrelated files]

## Validation Checklist
- [ ] All contract files have matching tests
- [ ] Entities defined in `data-model.md` have model updates
- [ ] All new behavior tested prior to implementation
- [ ] No [P] tasks touch the same file
