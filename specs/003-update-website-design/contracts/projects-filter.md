# Contract: Projects Filter & List Batching

## Purpose
Allow users to filter projects by category and reveal more items in batches.

## Acceptance Criteria
- Category controls include: All + known categories
- Default state: All
- Selecting a category updates the visible projects immediately
- Initial render shows up to 12 items; a "Show more" control reveals +12 more (retain filter)
- When no items match the filter, display a friendly empty state
- Keyboard users can operate filters and "Show more" with visible focus
