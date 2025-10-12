# Route Contracts

## Static Pages
- `/` (Landing): Shows name/title and a single featured episode
- `/episodes` (Episodes List): Lists up to 20 episodes, newest-first
- `/episodes/[slug]` (Episode Detail): Renders full markdown body for the selected episode
- `/about` (About): Renders profile bio and contacts
- `/projects` (Projects): Lists projects with descriptions and links

## Page Data Contracts

### Landing (`/`)
- profile: { name, title }
- featuredEpisode: Episode (selected as the most recent valid entry)

### Episodes List (`/episodes`)
- episodes: Episode[] (max 20, sorted newest-first)

### Episode Detail (`/episodes/[slug]`)
- episode: Episode (by slug)

### About (`/about`)
- profile: { name, title, bio, contacts }

### Projects (`/projects`)
- projects: Project[]

## Error Handling
- Missing or invalid episodes must not break page rendering; omit invalid entries and continue.
- Non-existent slug → render a friendly not-found page.