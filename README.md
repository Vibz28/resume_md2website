# Resume-to-Website Project

A modern, responsive personal website built from resume markdown data, featuring intelligent content parsing, professional timeline display, dark mode support, and automated GitHub Pages deployment.

## 🎯 Project Overview

This project transforms a structured resume markdown file into a professional website with automated content extraction and responsive design. The platform intelligently parses professional data and presents it across multiple sections:

- **Home**: Hero section with current role highlight and smooth scroll navigation
- **Experience**: Comprehensive professional timeline with detailed achievements
- **Projects**: Technical projects showcase with conditional button rendering
- **About**: Personal bio, skills matrix, and contact information
- **Publications**: Academic and professional publications display

## 🚀 Live Demo

**Production Website**: https://vibz28.github.io/resume_md2website

## ✨ Current Features

### Fully Implemented
- ✅ **Responsive Design**: Mobile-first approach with hamburger navigation
- ✅ **Dark Mode**: System preference detection with manual toggle and localStorage persistence
- ✅ **PDF Export**: Client-side PDF generation from resume data
- ✅ **Contact Form**: Client-side contact form with mailto integration
- ✅ **Publications Section**: Display of academic and professional publications
- ✅ **Accessibility**: Skip navigation, ARIA labels, and semantic HTML
- ✅ **Automated Deployment**: GitHub Actions CI/CD to GitHub Pages

## 🛠 Technology Stack

- **Frontend Framework**: Next.js 14.2.7 with App Router
- **Language**: TypeScript 5+ with strict type checking
- **Styling**: Tailwind CSS 3.4+ with responsive utilities and dark mode support
- **UI Library**: Radix UI primitives with Lucide React icons
- **Animation**: Framer Motion for smooth interactions
- **PDF Generation**: jsPDF with html2canvas for client-side PDF export
- **Deployment**: GitHub Pages with automated CI/CD pipeline
- **Build System**: Static export optimized for GitHub Pages
- **Data Processing**: Custom markdown parser with regex extraction
- **Performance**: React optimizations with efficient rendering

## 📁 Project Structure

```
resume_md2website/
├── .github/
│   └── workflows/
│       └── nextjs.yml         # CI/CD deployment pipeline
├── src/
│   ├── app/                   # Next.js App Router (v13+)
│   │   ├── page.tsx          # Home page with all sections
│   │   ├── layout.tsx        # Root layout with navigation
│   │   ├── globals.css       # Global styles and Tailwind
│   │   ├── about/
│   │   │   └── page.tsx      # Dedicated about page
│   │   ├── experience/
│   │   │   └── page.tsx      # Professional experience page
│   │   └── projects/
│   │       └── page.tsx      # Projects showcase page
│   ├── components/            # React component library
│   │   ├── AboutSection.tsx  # About content with skills
│   │   ├── ContactForm.tsx   # Contact form (mailto integration)
│   │   ├── ExperienceSection.tsx # Timeline with achievements
│   │   ├── HeroSimple.tsx    # Hero/banner component
│   │   ├── MarkdownText.tsx  # Safe HTML rendering
│   │   ├── NavSimple.tsx     # Main navigation with mobile menu
│   │   ├── ProjectsSection.tsx # Projects with conditional buttons
│   │   ├── PublicationsSection.tsx # Publications display
│   │   ├── SkillsSection.tsx # Skills matrix component
│   │   ├── SkipNavigation.tsx # Accessibility navigation
│   │   ├── ThemeToggle.tsx   # Dark/light mode toggle
│   │   ├── figma/            # Figma-generated utilities
│   │   │   └── ImageWithFallback.tsx
│   │   └── ui/               # Radix UI component library
│   ├── hooks/                # Custom React hooks
│   │   └── useActiveSection.ts # Active section detection
│   └── lib/                  # Core utilities and data processing
│       ├── models.ts         # TypeScript interfaces
│       ├── parseResumeMarkdown.ts # Core parsing engine
│       ├── paths.ts          # Environment path utilities
│       └── pdfGenerator.ts   # PDF export functionality
├── docs/                     # Static build output (GitHub Pages deployment)
├── next.config.js           # Next.js build configuration
├── package.json             # Dependencies and npm scripts
├── tailwind.config.js       # Tailwind CSS customization
├── tsconfig.json            # TypeScript compiler configuration
├── postcss.config.js        # PostCSS processing configuration
├── .gitignore               # Git ignore rules
├── .nojekyll                # GitHub Pages Jekyll bypass
└── resume_vibhor_janey_updated_aug_2025.md  # Source resume data
```

## 🏗 Architecture Overview

### Data Flow Pipeline
```
Resume Markdown → parseResumeMarkdown.ts → TypeScript Interfaces → React Components → Static HTML → GitHub Pages
```

### Core Data Models

The project uses strongly-typed interfaces defined in `src/lib/models.ts`:

```typescript
interface Profile {
  name: string;           // Full name from markdown header
  title: string;          // Professional title/current role
  bio: string;           // Generated professional summary
  skills: string[];      // Technical skills array
  contacts: Array<{      // Contact information
    label: string;
    url: string;
  }>;
}

interface ExperienceEntry {
  employer: string;      // Company name
  title: string;         // Job title/position
  timeframe: string;     // Employment duration
  location: string;      // Geographic location
  summary: string;       // Role overview
  achievements: string[]; // Key accomplishments
}

interface Project {
  title: string;         // Project name
  description: string;   // Project description
  link?: string;        // Optional external link
}

interface Publication {
  title: string;         // Publication title
  authors?: string;      // Author list
  venue?: string;        // Publication venue
  year?: number;         // Publication year
  link?: string;         // Optional external link
  category?: string;     // Publication category
}
```

### Component Architecture

**Page Components**: Each route has dedicated page components:
- `app/page.tsx` - Home page with all sections
- `app/about/page.tsx` - Dedicated about page
- `app/experience/page.tsx` - Professional experience page
- `app/projects/page.tsx` - Projects showcase page

**Section Components**: Major content areas are encapsulated in dedicated components:
- `ExperienceSection.tsx` - Professional timeline with achievements
- `ProjectsSection.tsx` - Project showcase with conditional buttons
- `AboutSection.tsx` - Bio, skills, and contact information
- `SkillsSection.tsx` - Skills matrix display
- `PublicationsSection.tsx` - Publications with categorization

**Layout Components**:
- `NavSimple.tsx` - Responsive navigation with mobile hamburger menu and dark mode toggle
- `SkipNavigation.tsx` - Accessibility-first skip-to-content
- `HeroSimple.tsx` - Hero section with current role highlight

**Utility Components**:
- `MarkdownText.tsx` - Safe HTML rendering from parsed markdown
- `ThemeToggle.tsx` - Dark/light mode toggle with system preference detection
- `ContactForm.tsx` - Contact form with client-side mailto integration

## 📋 Resume Markdown Structure Requirements

The resume markdown file must follow this specific structure for optimal parsing by `parseResumeMarkdown.ts`:

### Required Header Format
```markdown
# Full Name
**Professional Title**

[email](mailto:email@domain.com) | phone | [LinkedIn](url) | Location

---
```

### Work Experience Section
```markdown
## WORK EXPERIENCE

**Company Name**
_**Position Title**_
*Date Range | Location*

**Summary:** Role overview and key responsibilities.

- Achievement with **bold formatting** for emphasis
- Multi-line achievement that continues
  seamlessly on the next line
- Quantified accomplishment with metrics

_**Second Position** (if multiple roles at same company)_
*Date Range | Location*

**Summary:** Second role description.

- Additional achievements
- More accomplishments with **formatting**
```

### Projects Section
```markdown
## PROJECTS

**[Project Name](https://project-link.com)**
- Project description with technologies used

**Project Without Link**
- Description for projects without external links
```

### Publications Section
```markdown
## PUBLICATIONS

**[Publication Title](https://link-to-paper.com)**
*Authors | Venue | Year*

**Publication Without Link**
*Authors | Venue | Year*
```

### Skills Section
```markdown
## SKILLS

**Technical Category:** Skill1, Skill2, Skill3
**Another Category:** Framework1, Framework2, Tool1
```

### Key Parsing Rules

1. **Company Detection**: Uses `**Company Name**` pattern
2. **Position Extraction**: Looks for `_**Title**_` format
3. **Timeline Parsing**: Extracts from `*Date | Location*` format
4. **Summary Recognition**: Identifies `**Summary:**` lines
5. **Achievement Processing**: Handles multi-line bullet points
6. **Link Extraction**: Processes markdown links in project and publication titles
7. **Skills Categorization**: Parses skills by category from `**Category:**` format

## 🚀 Development Setup

### Prerequisites
- **Node.js**: Version 20.x or later (recommended for optimal performance)
- **npm**: Package manager (included with Node.js)
- **Git**: For version control and deployment
- **Modern Browser**: Chrome, Firefox, Safari, or Edge for testing

### Local Development Installation

```bash
# 1. Clone the repository
git clone https://github.com/Vibz28/resume_md2website.git
cd resume_md2website

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser to http://localhost:3000
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server locally
npm run lint         # Run ESLint code analysis

# Static Export (GitHub Pages)
npm run export       # Build + copy to docs/ folder for GitHub Pages
```

**Note**: Playwright is installed for future testing implementation, but test files are not currently included in the repository.

## 📦 GitHub Actions Deployment

### Automated CI/CD Pipeline

The project uses GitHub Actions for automated deployment to GitHub Pages. The workflow is defined in `.github/workflows/nextjs.yml`:

#### Workflow Configuration

```yaml
name: Deploy Next.js site to Pages

on:
  push:
    branches: ["main", "production-deploy"]  # Triggers on pushes to main
  workflow_dispatch:                         # Manual trigger support

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false
```

#### Build Process

1. **Environment Setup**:
   - Ubuntu latest runner
   - Node.js 20.x with automatic package manager detection
   - Dependency caching for faster builds

2. **Build Steps**:
   ```bash
   # Automatic dependency installation (npm ci)
   # Next.js build with static export to 'out/' directory
   # Artifact upload from 'out/' to GitHub Pages
   ```

3. **Deployment**:
   - Only deploys from `main` branch (security feature)
   - Automatic GitHub Pages environment configuration
   - Live URL: https://vibz28.github.io/resume_md2website

#### Build Output Directories

- **`out/`**: Temporary build output directory (generated during builds, gitignored)
- **`docs/`**: Committed static files for reference (created via `npm run export`)
- **GitHub Pages**: Deploys from the `out/` directory uploaded as an artifact

### Manual Deployment Process

For manual deployments or troubleshooting:

```bash
# 1. Generate static export
npm run export

# 2. Verify build output
ls -la docs/         # Check generated files

# 3. Commit and push (triggers auto-deployment)
git add docs/
git commit -m "Update static export"
git push origin main

# 4. Monitor deployment
# Visit: https://github.com/Vibz28/resume_md2website/actions
```

### Next.js Configuration for GitHub Pages

The `next.config.js` is optimized for GitHub Pages deployment:

```javascript
const isProd = process.env.NODE_ENV === 'production';
const isExport = process.env.NEXT_EXPORT === 'true';

const nextConfig = {
  output: isExport ? 'export' : undefined,  // Static export for GitHub Pages
  trailingSlash: true,                      // GitHub Pages compatibility
  images: {
    unoptimized: true                       // Required for static export
  }
}
```

### Troubleshooting Deployment Issues

**Common Issues and Solutions:**

1. **Build Failures**:
   ```bash
   # Check for TypeScript errors
   npm run build

   # Fix linting issues
   npm run lint
   ```

2. **404 Errors on GitHub Pages**:
   - Ensure `trailingSlash: true` in next.config.js
   - Verify `.nojekyll` file exists in root
   - Check GitHub Pages source is set to "GitHub Actions"

3. **Assets Not Loading**:
   - Confirm `images: { unoptimized: true }` in config
   - Verify all assets are in `public/` directory

## 🔄 Content Management

### Updating Resume Content

1. **Edit the resume file**:
   ```bash
   # Open the markdown file
   code resume_vibhor_janey_updated_aug_2025.md

   # Make your changes following the structure requirements
   ```

2. **Test changes locally**:
   ```bash
   npm run dev
   # Visit http://localhost:3000 to preview
   ```

3. **Deploy to production**:
   ```bash
   npm run export
   git add -A
   git commit -m "Update professional experience"
   git push origin main
   ```

### Automatic Content Processing

The `parseResumeMarkdown.ts` engine automatically:

- **Extracts** company names, job titles, and employment timeframes
- **Processes** markdown formatting (bold, italic, links)
- **Generates** professional bio from current role summary
- **Organizes** achievements into structured bullet points
- **Creates** skills matrix from categorized skills
- **Handles** multi-line content with proper formatting
- **Provides** graceful fallbacks for missing data

### Content Validation

The parser includes robust error handling:
- Try-catch blocks for safe parsing
- Console warnings for malformed content
- Fallback data for missing sections
- Type safety through TypeScript interfaces

## 🎨 Customization Guide

### Visual Styling

**Tailwind CSS Configuration** (`tailwind.config.js`):
```javascript
module.exports = {
  darkMode: 'class',  // Enable class-based dark mode
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom colors, fonts, spacing defined here
    },
  },
  plugins: [],
}
```

**Dark Mode Implementation**:
- Toggle component in navigation bar
- System preference detection on first visit
- localStorage persistence across sessions
- CSS custom properties for theme colors

### Adding New Sections

1. **Create Component** (`src/components/NewSection.tsx`):
   ```tsx
   interface NewSectionProps {
     data: YourDataType[];
   }

   export default function NewSection({ data }: NewSectionProps) {
     return (
       <section className="py-16">
         {/* Your content */}
       </section>
     );
   }
   ```

2. **Update Data Model** (`src/lib/models.ts`):
   ```typescript
   export interface YourDataType {
     // Define your data structure
   }

   export interface ParsedContent {
     // Add your new section
     yourSection: YourDataType[];
   }
   ```

3. **Extend Parser** (`src/lib/parseResumeMarkdown.ts`):
   ```typescript
   // Add parsing logic for your markdown section
   ```

4. **Add to Pages** (`src/app/page.tsx`):
   ```tsx
   import NewSection from '@/components/NewSection';

   // Include in your page component
   <NewSection data={parsedContent.yourSection} />
   ```

## 📈 Performance Optimization

### Build Optimizations

- **Static Export**: Pre-rendered HTML for fastest initial load
- **Bundle Splitting**: Automatic code splitting via Next.js
- **CSS Optimization**: Tailwind CSS purging removes unused styles
- **Image Optimization**: Disabled for static export compatibility

### Runtime Performance

- **React Optimizations**: Proper component memoization where needed
- **Lazy Loading**: Components load as needed
- **Efficient Parsing**: Cached markdown processing
- **Minimal JavaScript**: Static-first approach with progressive enhancement

### Monitoring

Use these tools to monitor performance:
- **Lighthouse**: Built into Chrome DevTools
- **Core Web Vitals**: Monitor LCP, FID, CLS metrics
- **Bundle Analyzer**: Analyze build output size

## 🤝 Contributing

### Development Workflow

```bash
# 1. Fork the repository on GitHub
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/resume_md2website.git

# 3. Create feature branch
git checkout -b feature/your-feature-name

# 4. Make changes and test
npm run dev                    # Test locally
npm run build                  # Verify build
npm run export                # Test static export

# 5. Commit with descriptive message
git commit -m "feat: add new feature description"

# 6. Push and create Pull Request
git push origin feature/your-feature-name
```

### Code Standards

- **TypeScript**: Strict mode enabled, proper type definitions required
- **ESLint**: Follow Next.js recommended configuration
- **Accessibility**: WCAG 2.1 AA compliance guidelines
- **Documentation**: Update README for significant changes

### Commit Message Convention

```bash
feat: add new feature
fix: resolve bug description
docs: update documentation
style: formatting changes
refactor: code improvements
test: add or update tests
chore: maintenance tasks
```

## 🗺️ Future Roadmap

### Planned Enhancements

**Phase 1: Content & Analytics**
- [ ] Server-side email integration for contact form (currently uses mailto)
- [ ] Advanced filtering for publications section
- [ ] Case studies with detailed project breakdowns
- [ ] Analytics integration for visitor insights

**Phase 2: Developer Experience**
- [ ] Comprehensive test suite with Playwright
- [ ] Component documentation with Storybook
- [ ] Automated accessibility testing
- [ ] Performance benchmarking

**Phase 3: Advanced Features**
- [ ] CMS integration for non-technical updates
- [ ] Multi-language support (i18n)
- [ ] Advanced SEO enhancements with structured data
- [ ] Blog section for articles and insights

### Known Limitations

- **Contact Form**: Uses mailto links (client-side) instead of server-side email integration
- **Testing**: Playwright is installed but test suite not yet implemented
- **Publications Filtering**: Display works but advanced filtering not implemented

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

**Usage Rights:**
- ✅ Commercial and personal use
- ✅ Modification and distribution
- ✅ Private use
- ❌ Liability or warranty

## 🔗 Links & Resources

- **Live Website**: https://vibz28.github.io/resume_md2website
- **Repository**: https://github.com/Vibz28/resume_md2website
- **Issues**: https://github.com/Vibz28/resume_md2website/issues
- **Author**: [Vibhor Janey](https://www.linkedin.com/in/vibhorjaney/)

---

## 👨‍💼 About the Author

**Built by [Vibhor Janey](https://www.linkedin.com/in/vibhorjaney/)**
*Senior Manager, AI Solution Architect @ Bristol Myers Squibb*

**Expertise:**
AI solution architecture, manufacturing operations optimization, agentic orchestration systems, and enterprise data architecture.

**Contact:**
- 📧 [vibhor.janey@gmail.com](mailto:vibhor.janey@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/vibhorjaney/)
- 🌐 [Portfolio](https://vibz28.github.io/resume_md2website)

---

*Last Updated: January 2025*
