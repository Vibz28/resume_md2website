# Research: Update Website Design to Align with Figma Designs

## Decisions & Rationale

### Single-Page Structure vs. Paginated
- Decision: Single-page structure with section anchors and smooth navigation
- Rationale: Matches Figma comps; improves flow and scanning; maintains content continuity
- Alternatives: Keep paginated pages — rejected for fragmented UX and duplicate navigation

### Item Volume Handling (Projects/Publications)
- Decision: No pagination in v1; support ≥12 items; “Show more” reveals +12 while retaining filters
- Rationale: Keeps interaction simple; avoids URL/state complexity in v1
- Alternatives: Pagination or infinite scroll — deferred to future; increased complexity and SEO considerations

### Contact Form Behavior
- Decision: Client-side validated form that opens prefilled mailto and shows success confirmation
- Rationale: No backend; respects static hosting; ensures a clear path to contact
- Alternatives: Backend or third-party service — outside static-only scope and adds dependencies

### Filters and Sorting
- Decision: Projects filter by category; Publications filter by category with default sorting by year desc
- Rationale: Matches provided categories in comps; supports scanning recency
- Alternatives: Year filter for Projects — not needed initially; can add later

### Accessibility & Reduced Motion
- Decision: Respect prefers-reduced-motion; keep keyboard navigation first-class; maintain focus visible
- Rationale: Consistent with accessibility objectives and constitution
- Alternatives: Heavy animations — avoided for performance and accessibility

## Best Practices Notes
- Section navigation: Ensure skip links and visible focus states; update active state based on viewport
- Filters: Use buttons/controls with ARIA roles as needed; maintain tab order and visible state
- Mailto: Pre-encode subject/body; provide fallback link; validate required fields before triggering

## Open Questions (Resolved in Spec)
- URL deep-linking for filters: Deferred in v1; no URL state required
- Large lists: “Show more” batching instead of pagination/infinite

## References
- Internal: README.md platform architecture and testing
- Design: figma_design components (About, Experience, Projects, Skills, Publications, Contact)
