# Content Contracts: Markdown Schemas

Source: `resume_vibhor_janey_updated_aug_2025.md`

## Sections
- `# <Name>`: Profile identity and headline
- `## About`: Biography content (markdown)
- `## Projects`: Project entries
- `## Episodes`: Episode entries (20 expected)

## Episode Entry Format (under `## Episodes`)
Each episode is a level-3 heading with structured lines:

```
### <Title>
Date: YYYY-MM-DD
Summary: <one or two sentences>
Image: <relative-path-or-URL> (optional)

<Body markdown content...>
---
```

- Separator `---` ends the episode block.
- Slug = kebab-case of Title.
- Date is required; malformed dates cause the entry to be ignored.

## Project Entry Format (under `## Projects`)
```
### <Title>
Description: <one or two sentences>
Link: <URL> (optional, repeatable)
Image: <relative-path-or-URL> (optional)
---
```

## Profile/Contacts (top or `## About`)
- Name and Title must be present near the top of the file.
- Contact links may be provided as a list of markdown links under a `## Contact` or within `## About`.

## Flexibility
- If Summary/Image lines are omitted, render without them.
- Body content can include markdown (lists, code blocks, images).