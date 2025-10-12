# Implementation Plan: Modern Resume Website

**Branch**: `001-modern-resume-website` | **Date**: 2025-09-14 | **Spec**: C:\\Users\\Vibhor Janey\\OneDrive\\project_documents\\resume_md2website\\specs\\001-modern-resume-website\\spec.md
**Input**: Feature specification from `/specs/001-modern-resume-website/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context (web=frontend)
   → Set Structure Decision based on project type
3. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
4. Execute Phase 0 → research.md
   → Resolve unknowns and record decisions
5. Execute Phase 1 → contracts, data-model.md, quickstart.md
6. Re-evaluate Constitution Check section
   → Update Progress Tracking: Post-Design Constitution Check
7. Plan Phase 2 → Generate tasks.md from design (this plan generates it per repo prompt)
8. STOP - Ready for implementation
```

## Summary
Build a sleek, responsive, static personal website for a Data Scientist & AI Engineer with:
- Landing page featuring one highlighted episode
- Episodes page listing 20 episodes (from local markdown data)
- Episode detail view
- About and Projects pages
- No databases or external feeds; content embedded in `resume_vibhor_janey_updated_aug_2025.md` at repo root
- Static generation and hosting; mobile-ready

## Technical Context
**Language/Version**: JavaScript/TypeScript (site build tooling), Next.js (Static Export)  
**Primary Dependencies**: next, react, react-dom (framework-level; static export only)  
**Storage**: N/A (no runtime storage); content from repository markdown  
**Testing**: Manual acceptance (A11y/Perf checklists); automated tests TBD in tasks  
**Target Platform**: Static hosting (GitHub Pages or equivalent)  
**Project Type**: Web (frontend-only; static site)  
**Performance Goals**: Mobile Lighthouse ≥ 90; LCP < 2.5s; CLS < 0.1  
**Constraints**: Static-only, no server-side runtime; no external APIs; accessibility basics; deterministic episode ordering (newest-first)  
**Scale/Scope**: Single personal site; 20 episodes; low traffic; optimized for fast first load

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Simplicity**:
- Projects: 1 (frontend-only)
- Using framework directly? Yes (Next.js with static export)
- Single data model? Yes (content schemas for Profile, Episode, Project)
- Avoiding patterns? Yes (no client-only SPA frameworks beyond required Next.js routing)

**Architecture**:
- Libraries as separate packages: Not applicable (single site)
- CLI per library: N/A
- Library docs: N/A

**Testing (NON-NEGOTIABLE)**:
- TDD emphasis: Will add minimal tests in tasks; acceptance checks first
- Integration/E2E focus: Basic navigational checks and content rendering planned

**Observability**:
- Structured logging: N/A for static site; basic error handling only

**Versioning**:
- Document versioning via git; site has no runtime API

**Deviations from Constitution**:
- Zero-Build by Default vs. Next.js: Using a build framework (next, react, react-dom > 2 deps) → Documented below in Complexity Tracking with justification (static export, routing, templating convenience).

## Project Structure

### Documentation (this feature)
```
specs/001-modern-resume-website/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   ├── content-schemas.md
│   └── routes.md
└── tasks.md             # Phase 2 output (generated per repo prompt)
```

### Source Code (repository root)
```
# Web application (frontend-only static site)
frontend/ (or repository root for Next.js project)
├── app/ or pages/
├── public/
└── ...
```

**Structure Decision**: Web application (frontend-only) with static export

## Phase 0: Outline & Research
1. Unknowns/Topics to confirm:
   - Next.js static export on GitHub Pages (basePath/assetPrefix considerations)
   - Reliable parsing pattern from `resume_vibhor_janey_updated_aug_2025.md` into Episodes (20), About, Projects
   - SEO/meta and Open Graph strategy for static pages
   - Mobile-first, responsive layout patterns (simple grid, system fonts)
2. Findings consolidated in `research.md` with decisions and alternatives.

## Phase 1: Design & Contracts
1. Entities documented in `data-model.md` (Episode, Project, Profile) with fields and validation.
2. Content Contracts in `contracts/`:
   - `content-schemas.md`: markdown section structures and required/optional fields
   - `routes.md`: static routes and page-level data contracts
3. Quickstart steps in `quickstart.md` documenting build/export and manual checks.

## Phase 2: Task Planning Approach (executed per repo prompt)
Generate `tasks.md` enumerating work in TDD-friendly order: content extraction → schemas → pages → navigation → A11y → SEO → static export → basic smoke checks.

## Complexity Tracking
| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|---------------------------------------|
| Build framework (Next.js; >2 deps) | Static export, routing conventions, templating | Pure HTML/CSS/JS increases manual routing/templating; higher maintenance for multi-page site |

## Progress Tracking
**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS (with documented deviations)
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented

---
*Based on Constitution v1.0.0 - See `.specify/memory/constitution.md`*
