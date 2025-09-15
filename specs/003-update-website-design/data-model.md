# Data Model: Update Website Design to Align with Figma Designs

## Entities

### Experience
- title: string (required)
- company: string (required)
- location: string (optional)
- duration: string (required)
- type: string (optional)
- description: string (optional)
- achievements: string[] (required; ≥1 if description present)
- technologies: string[] (optional)

### Project
- title: string (required)
- description: string (required)
- image: string (optional)
- technologies: string[] (optional)
- category: string (required; one of known categories)
- status: string (optional)
- metrics: string[] (optional)
- links: { github?: string; demo?: string; live?: string; paper?: string } (optional)

### Publication
- title: string (required)
- authors: string[] (required; ≥1)
- venue: string (required)
- year: string (required; YYYY)
- type: string (optional)
- status: string (optional)
- citations: number (optional; ≥0)
- abstract: string (optional)
- keywords: string[] (optional)
- links: { paper?: string; arxiv?: string; code?: string } (optional)
- impact: string (optional)
- category: string (required; one of known categories)

### Skills (Summary)
- categories: Array<{ name: string; items: string[] }>

### Contact
- name: string (required at submit)
- email: string (required, valid email)
- subject: string (optional)
- message: string (required)

## Validation Rules
- Title fields must be non-empty strings
- Publication year must match YYYY
- Categories must be from controlled vocabularies
- Achievements, if present, should be well-formed bullet items (non-empty)

## Controlled Vocabularies
- Project Categories: ["Agricultural AI","Manufacturing AI","Data Architecture","Laboratory Automation","Financial Technology","Predictive Analytics"]
- Publication Categories: ["AI/ML","Privacy","Quantum","Healthcare"]
