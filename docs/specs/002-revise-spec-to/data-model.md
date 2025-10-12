# Data Model

## Entities

### Profile
- name: string
- headline: string
- location: string
- email: string
- linkedinUrl: string
- skills: array<string | {category: string, items: string[]}> (display only)

### ExperienceEntry
- employer: string
- title: string
- timeframe: string (human-readable)
- location: string
- summary: string (1–3 sentences)
- achievements: string[] (target 3–6)

### Project
- title: string
- description: string (1–3 sentences)
- link?: string (optional external URL)

## Relationships
- Profile 1..1 → has many ExperienceEntry
- Profile 1..1 → has many Project

## Validation Rules
- timeframe must be present and human-readable (e.g., "Jul 2025 – Present").
- achievements should not exceed 6 per role in the primary view.
- links must be valid URLs when present.
