# Data Model: Modern Resume Website

## Entities

### Profile
- name: string (required)
- title: string (required)
- bio: markdown (required)
- skills: list<string> (optional)
- contacts: list<{ label: string, url: string }> (optional)

### Episode
- slug: string (required, unique)
- title: string (required)
- date: ISO date (required)
- summary: string (optional)
- body: markdown (required)
- image: url/path (optional)
- tags: list<string> (optional)

### Project
- slug: string (required, unique)
- title: string (required)
- description: string (required)
- links: list<{ label: string, url: string }> (optional)
- image: url/path (optional)

## Relationships
- Profile has many Projects (display list)
- Episodes are independent; ordered newest-first

## Validation Rules
- Episode.date must parse as valid date; if invalid, entry is skipped or flagged and not featured
- Slug derived from title (lowercase, hyphenated); must be deterministic
- Image fields optional; when missing, use placeholder
- Ensure exactly 20 episodes are listed if at least 20 exist; else list available count