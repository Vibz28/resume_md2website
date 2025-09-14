# Implementation Plan: Resume Experience Website

**Branch**: `002-revise-spec-to` | **Date**: 2025-09-14 | **Spec**: specs/002-revise-spec-to/spec.md
**Input**: Feature specification from `/specs/002-revise-spec-to/spec.md`

## Execution Flow (/plan command scope)
1. Load feature spec from Input path → PASS
2. Fill Technical Context (scan for NEEDS CLARIFICATION) → PASS (none remain)
3. Evaluate Constitution Check section below → PASS
4. Execute Phase 0 → research.md generated
5. Execute Phase 1 → data-model.md, contracts/, quickstart.md generated
6. Re-evaluate Constitution Check → PASS
7. Plan Phase 2 → Describe task generation approach below

## Summary
Create a static, mobile-responsive personal site with four pages (Home, Experience, Projects, About) populated directly from the resume markdown. Emphasize achievements and clear contact paths. No podcast episodes.

## Technical Context
**Language/Version**: TypeScript (for Next.js project already present)  
**Primary Dependencies**: Next.js, React, Tailwind CSS (site already scaffolded)  
**Storage**: None (content embedded in markdown file)  
**Testing**: Manual verification + Lighthouse + accessibility pass (constitution)  
**Target Platform**: Static hosting (GitHub Pages)  
**Project Type**: web (single static site)  
**Performance Goals**: Lighthouse ≥ 90 (mobile), LCP < 2.5s, CLS < 0.1  
**Constraints**: No server, no databases; static export only  
**Scale/Scope**: Single-user portfolio site

## Constitution Check
**Simplicity**
- Projects: 1 (single static site)
- Using framework directly? Yes (Next.js minimal pages)
- Single data model? Yes (Profile, ExperienceEntry, Project)
- Avoiding patterns? Yes (no unnecessary abstractions)

**Architecture**
- Libraries as needed; no wrappers
- No separate CLI/backends

**Testing (NON-NEGOTIABLE)**
- Manual checks: page loads, a11y, Lighthouse; basic link checks

**Observability**
- N/A for static site; ensure console clean

**Versioning**
- Version via git; not applicable for runtime

Result: PASS. No deviations.

## Project Structure

### Documentation (this feature)
```
specs/002-revise-spec-to/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/
    ├── home.md
    ├── experience.md
    ├── projects.md
    └── about.md
```

### Source Code
Existing Next.js project under `src/` with static export to `out/`.

**Structure Decision**: Web application (existing), no backend.

## Phase 0: Outline & Research
See `research.md` (decisions, rationale, alternatives, risks, resolved items).

## Phase 1: Design & Contracts
- Entities defined in `data-model.md`.
- Page contracts under `contracts/` directory.
- Quickstart includes Windows-friendly commands to build/dev and publish to GitHub Pages.

## Phase 2: Task Planning Approach
- Use tasks template later to generate tasks mapping contracts to implementation (navigation, parsing resume into experience entries, pages replacing episodes, about with skills/contact, projects from resume, PDF link).
- TDD-ish ordering: Validate links and content rendering first; then polish a11y and performance.

## Complexity Tracking
None.

## Progress Tracking
**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [ ] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [ ] Complexity deviations documented
