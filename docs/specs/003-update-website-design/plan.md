# Implementation Plan: Update Website Design to Align with Figma Designs

**Branch**: `003-update-website-design` | **Date**: 2025-09-14 | **Spec**: C:\\Users\\Vibhor Janey\\OneDrive\\project_documents\\resume_md2website\\specs\\003-update-website-design\\spec.md
**Input**: Feature specification from `/specs/003-update-website-design/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
4. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
5. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file
6. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
7. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
8. STOP - Ready for /tasks command
```

## Summary
Update the existing resume-to-website to a single-page structure matching the Figma designs while preserving current content structure and authoring flow. The site must support section navigation, filters (Projects, Publications), achievements visibility in Experience, a validated Contact form that uses the user’s email client, dark mode, and responsive/mobile readiness.

## Technical Context
**Language/Version**: TypeScript (Next.js project), CSS via Tailwind
**Primary Dependencies**: ShadCN components (UI), animation library (per Figma comps), icon set, Playwright (tests)
**Storage**: N/A (static content derived from markdown)
**Testing**: Playwright contract + integration tests
**Target Platform**: Static GitHub Pages (docs/)
**Project Type**: Web (single project repo with app and tests)
**Performance Goals**: LCP < 2.5s, Lighthouse Perf ≥ 95, responsive 60fps interactions
**Constraints**: Static export compatible; reduced-motion preference respected; mobile-first responsiveness
**Scale/Scope**: Personal site scale; content volume up to ~12+ items per section with “Show more” batching

## Constitution Check
Simplicity
- Projects: 1 (site + tests in single repo)
- Using framework directly: Yes (no wrappers beyond UI components)
- Single content model: Yes; content structure unchanged

Architecture
- Features are part of the site app; no extra libraries beyond UI components
- Libraries: UI (ShadCN), icons, animation; purpose is presentation only
- No CLIs or libraries beyond scope; docs will be provided in quickstart.md

Testing (NON-NEGOTIABLE)
- Maintain RED→GREEN→Refactor through Playwright tests where applicable
- Contract and integration tests precede full implementation for new behavior (filters, nav, contact)

Observability
- N/A (static site); ensure meaningful console errors are avoided

Versioning
- Feature branch level; no semantic versioning required for this content site

Initial Constitution Check: PASS

## Project Structure

### Documentation (this feature)
```
specs/003-update-website-design/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md (created by /tasks, not now)
```

### Source Code (repository root)
```
src/
├── app/
├── components/
├── lib/
└── tests/
```

Structure Decision: Web application (single project) aligning to existing repo layout

## Phase 0: Outline & Research
- Unknowns: None blocking; decisions made in spec (contact form via mailto, list batching, filters scope)
- Technology best practices to confirm:
  - ShadCN integration patterns for section components
  - Accessible section navigation and focus management
  - Filter UX for Projects/Publications with keyboard support
- Consolidate in research.md:
  - Decision, Rationale, Alternatives for SPA vs. paginated
  - Decision on batching vs. pagination vs. infinite scroll
  - Decision on mailto vs. backend form

Output: research.md

## Phase 1: Design & Contracts
1. Data Model (data-model.md)
   - Mirror existing content structures (Experience, Projects, Publications, Skills, Contact)
   - Validation rules (non-empty titles, achievements array presence, allowed categories)
2. Contracts (contracts/)
   - Navigation contract: section anchors, active highlight behavior
   - Projects filter contract: categories, visible subset, “Show more” batching
   - Publications filter contract: categories + sort by year desc
   - Contact form contract: required fields, validation messages, mailto format
3. Quickstart (quickstart.md)
   - How to run, test, export; how to verify the SPA flows
4. Agent context update (optional in this repo): keep within 150 lines if added

Re-check Constitution: PASS

## Phase 2: Task Planning Approach (describe only)
- Each contract → a contract test (Playwright) [P]
- Each entity validation → integration test asserting rendering & fallbacks
- Implementation tasks in TDD order: contracts → integration → UI wiring → enhancements
- Parallelization: Independent section tests (Projects vs Publications) can run in parallel

## Complexity Tracking
| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | — | — |

## Progress Tracking
Phase Status:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

Gate Status:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [ ] Complexity deviations documented

---
*Based on Constitution v1.0.0 - See `/memory/constitution.md`*