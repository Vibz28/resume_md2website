# Feature Specification: Resume-based Experience Website Structure

**Feature Branch**: `002-revise-spec-to`
**Created**: 2025-09-14  
**Status**: Draft  
**Input**: User description: "Revise spec to replace podcast episodes with resume-based Experience content. Page structure: Home, Experience, Projects, About. Use resume details (BMS roles in 2025/2023, Formulatrix 2022, Zebra 2019–2021) and projects from resume. Emphasize achievements and contact visibility."

## Execution Flow (main)
```
1. Parse user description from Input
	→ If empty: ERROR "No feature description provided"
2. Extract key concepts from description
	→ Identify: actors (site visitor, site owner), actions (browse, filter, contact), data (experience entries, projects, profile), constraints (resume-sourced content, four pages)
3. For each unclear aspect:
	→ Mark with [NEEDS CLARIFICATION: specific question]
4. Fill User Scenarios & Testing section
	→ If no clear user flow: ERROR "Cannot determine user scenarios"
5. Generate Functional Requirements
	→ Each requirement must be testable
	→ Mark ambiguous requirements
6. Identify Key Entities (data involved)
7. Run Review Checklist
	→ If any [NEEDS CLARIFICATION]: WARN "Spec has uncertainties"
	→ If implementation details found: ERROR "Remove tech details"
8. Return: SUCCESS (spec ready for planning)
```

---

## ⚡ Quick Guidelines
- ✅ Focus on WHAT users need and WHY
- ❌ Avoid HOW to implement (no tech stack, APIs, code structure)
- 👥 Written for business stakeholders, not developers

### Section Requirements
- Mandatory sections completed
- Optional sections omitted when not relevant

### For AI Generation
1. Mark ambiguities with [NEEDS CLARIFICATION]
2. Do not guess unstated details
3. Make requirements testable
4. Typical gaps: user roles/permissions, performance targets, error behaviors, integrations

---

## User Scenarios & Testing (mandatory)

### Primary User Story
As a visitor, I want to quickly understand Vibhor Janey’s experience, key achievements, and projects, and have clear ways to contact or connect, so I can assess fit for collaboration or hiring.

### Acceptance Scenarios
1. Given a visitor lands on Home, When they scan the hero and highlights, Then they can navigate to Experience, Projects, or About in one click.
2. Given a visitor opens Experience, When they view roles (BMS 2025/2023, Formulatrix 2022, Zebra 2019–2021), Then they can read concise summaries and selected achievements for each role.
3. Given a visitor opens Projects, When they browse project cards, Then they see a title, brief description, and link (if available) for each project, including Cotton Pest Classification.
4. Given a visitor opens About, When they read the profile and skills, Then they see contact methods (email, LinkedIn) clearly and can click to initiate contact.
5. Given a visitor on any page, When they resize to mobile, Then all sections are legible, accessible, and navigable with consistent header/footer.

### Edge Cases
- If a project has no public link, it should still display title and description without broken links.
- If some roles have many achievements, show the first 3 by default (2 on small screens), with a Show more/Show less control to reveal up to 6 total.
- If contact methods are unavailable, About should not show empty placeholders.

## Requirements (mandatory)

### Functional Requirements
- **FR-001**: The site MUST comprise four top-level pages: Home, Experience, Projects, About.
- **FR-002**: Home MUST present a concise value proposition and highlight links to Experience, Projects, and About.
- **FR-003**: Experience MUST present resume-sourced roles with employer, title, timeframe, location, a short summary, and 3–6 notable achievements per role.
- **FR-004**: Experience content MUST reflect the resume details for:
  - Bristol Myers Squibb — Senior Manager, AI Solution Architect (Jul 2025 – Present, New Brunswick, NJ)
  - Bristol Myers Squibb — Manager, Data Architecture (Jul 2023 – Jul 2025, New Brunswick, NJ)
  - Formulatrix — Machine Learning Specialist (Jun 2022 – Aug 2022, Bedford, MA)
  - Zebra Technologies — Software Engineer (Oct 2019 – Jun 2021, Kennesaw, GA)
- **FR-005**: Projects MUST list at least one resume project (e.g., Cotton Pest Classification — Few-Shot Prototypical Networks) with a brief description and external link if provided.
- **FR-006**: About MUST include a short professional bio/summary, key skills categories, location, and contact links (email, LinkedIn).
- **FR-007**: Navigation MUST provide direct access to all four pages from a consistent header and footer.
- **FR-008**: The site MUST be accessible on mobile and desktop with readable typography and clear section hierarchy.
- **FR-009**: Contact methods MUST initiate the appropriate action (e.g., mailto for email, open LinkedIn profile in a new tab).
- **FR-010**: The content MUST be sourced from the current resume text to avoid discrepancies; wording can be condensed for readability.
- **FR-011**: Pages MUST avoid references to "episodes" or podcast constructs.
- **FR-012**: The site MUST display employment dates in human-friendly format as specified in the resume.

*Clarified decisions:*
- **FR-013**: Experience page MUST present roles in reverse-chronological order (most recent first). Do not group by company; each role lists its employer explicitly.
- **FR-014**: Education and Courses MUST appear on the About page as dedicated sections positioned below Skills.
- **FR-015**: A downloadable Resume (PDF) link MUST be available on the About page and MAY be highlighted on the Home page hero. The link MUST point to the current resume file in the site content.

### Key Entities
- **Experience Entry**: employer, title, timeframe, location, summary, achievements (list of bullet points)
- **Project**: title, brief description, optional external link
- **Profile**: name, headline, location, contact methods, skills (categories)

---

## Review & Acceptance Checklist

### Content Quality
- [x] No implementation details (languages, frameworks, APIs)
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] All mandatory sections completed

### Requirement Completeness
- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous  
- [x] Success criteria are measurable
- [x] Scope is clearly bounded
- [x] Dependencies and assumptions identified

---

## Execution Status

- [x] User description parsed
- [x] Key concepts extracted
- [x] Ambiguities marked
- [x] User scenarios defined
- [x] Requirements generated
- [x] Entities identified
- [x] Review checklist passed

