# Tasks: Resume Experience Website

**Input**: Design documents from `/specs/002-revise-spec-to/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
1. Load plan.md from feature directory → PASS
2. Load optional design documents → PASS
3. Generate tasks by category → below
4. Apply task rules → tests first, models before pages, independent tasks marked [P]
5. Number tasks sequentially (T001…)
6. Create parallel execution examples → see Parallel groups
7. Validate task completeness → see Validation Checklist

## Phase 3.1: Setup
- [ ] T001 Confirm Node/NPM PATH on Windows PowerShell for this repo session (see quickstart.md). Document one-liners in README.
- [ ] T002 Create `docs/` publish folder (ignored by Next) and add to .gitignore if necessary.
- [ ] T003 [P] Add a script `"export": "next build && xcopy /E /I /Y out docs"` to package.json or a platform-neutral equivalent. Verify `npm run build` + export step.

## Phase 3.2: Tests First (TDD)
- [ ] T004 [P] Contract test for Home per `contracts/home.md`: verify presence of hero, quick links, optional Resume link.
- [ ] T005 [P] Contract test for Experience per `contracts/experience.md`: verify reverse-chronological order; each role shows employer, title, timeframe, location, summary, 3 default achievements with expand control.
- [ ] T006 [P] Contract test for Projects per `contracts/projects.md`: verify each card has title/desc and link behavior (new tab or no dead link).
- [ ] T007 [P] Contract test for About per `contracts/about.md`: verify bio, skills groups, contact links, Education/Courses sections, and Resume PDF link.
- [ ] T008 [P] Integration scenario from spec user stories: navigation works from Home to Experience/Projects/About and back; header/footer consistent across pages.

## Phase 3.3: Core Implementation
- [ ] T009 [P] Update `src/lib/parseResumeMarkdown.ts` to output ExperienceEntry[] and Profile, removing episode-specific logic. Ensure reverse-chronological sorting.
- [ ] T010 [P] Update `src/lib/models.ts` to match `data-model.md` (Profile, ExperienceEntry, Project) and remove Episode interfaces.
- [ ] T011 Replace Episodes routes with Experience page:
  - Remove `src/app/episodes/` folder and linked nav items.
  - Create `src/app/experience/page.tsx` implementing `contracts/experience.md` (default 3 achievements; 2 on small screens; expand/collapse to 6).
- [ ] T012 Update Home page (`src/app/page.tsx`) to remove featured episode and instead highlight Experience/Projects/About + optional Resume link.
- [ ] T013 Update About page (`src/app/about/page.tsx`) to include Bio, Skills, Location, Email (mailto), LinkedIn (new tab), Education and Courses sections, and Resume PDF link.
- [ ] T014 Update Projects page (`src/app/projects/page.tsx`) to read Projects from resume and render cards; hide link element when absent.
- [ ] T015 Update global layout/nav (`src/app/layout.tsx`) to use new menu: Home, Experience, Projects, About.

## Phase 3.4: Integration & Export
- [ ] T016 Build static site and verify 0 type errors and clean console. Ensure `out/` contains pages: /, /experience, /projects, /about.
- [ ] T017 Copy `out/` to `docs/` (or adjust GitHub Pages to serve from `out/` if preferred). Validate relative paths.
- [ ] T018 Add note to README on deploying to GitHub Pages via `docs/`.

## Phase 3.5: Polish
- [ ] T019 [P] Accessibility pass: keyboard nav across pages; alt text; focus states; color contrast.
- [ ] T020 [P] Performance pass: Lighthouse mobile ≥ 90; ensure images lazy-load; remove unused JS; verify bundle size.
- [ ] T021 [P] Content QA: Verify role bullets (3 default/6 max), dates formatting, contact links behavior.
- [ ] T022 [P] Add basic unit tests for parsing functions to ensure stability when resume changes.
- [ ] T023 Update `quickstart.md` with any deltas discovered during execution.

## Dependencies
- T001 before any dev tasks in this session.
- T004–T008 (tests) before T009–T015 (implementation).
- T009 and T010 unblock T011–T015.
- T016 before T017–T018.
- Polish tasks can run in parallel after core integration.

## Parallel groups
- [P] Group A (contract tests): T004, T005, T006, T007
- [P] Group B (integration test): T008
- [P] Group C (models & parsing): T009, T010
- [P] Group D (pages): T011, T012, T013, T014, T015 (separate files; mind shared components)
- [P] Group E (polish): T019, T020, T021, T022, T023

## Validation Checklist
- [ ] All contract tests exist for each page
- [ ] Entities implemented per data-model
- [ ] Tests precede implementation
- [ ] Each task references exact file paths
- [ ] Independent tasks marked [P]
- [ ] Export to `docs/` validated for GitHub Pages
