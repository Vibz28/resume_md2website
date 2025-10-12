# Resume-to-Website Project

A modern, responsive personal website built from resume markdown data, featuring intelligent content parsing, professional timeline display, and automated GitHub Pages deployment.

## 🎯 Project Overview

This project transforms a structured resume markdown file into a professional website with automated content extraction and responsive design. The platform intelligently parses professional data and presents it across multiple sections:

- **Home**: Hero section with current role highlight and smooth scroll navigation
- **Experience**: Comprehensive professional timeline with detailed achievements  
- **Projects**: Technical projects showcase with conditional button rendering
- **About**: Personal bio, skills matrix, and contact information

## 🚀 Live Demo

**Production Website**: https://vibz28.github.io/resume_md2website

## 🛠 Technology Stack

- **Runtime**: Bun 1.3+ (JavaScript/TypeScript runtime & package manager)
- **Frontend Framework**: Next.js 14.2.7 with App Router
- **Language**: TypeScript 5+ with strict type checking
- **Styling**: Tailwind CSS 3.4+ with responsive utilities
- **UI Library**: Radix UI primitives with Lucide React icons  
- **Animation**: Framer Motion for smooth interactions
- **Testing**: Playwright for comprehensive end-to-end testing
- **Deployment**: GitHub Pages with automated CI/CD pipeline (Bun-powered)
- **Build System**: Static export optimized for GitHub Pages
- **Data Processing**: Custom markdown parser with regex extraction
- **Performance**: React optimizations with lazy loading

## 📁 Current Project Structure

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
│   │   ├── ContactForm.tsx   # Contact form with validation
│   │   ├── ExperienceSection.tsx # Timeline with achievements
│   │   ├── HeroSimple.tsx    # Hero/banner component
│   │   ├── MarkdownText.tsx  # Safe HTML rendering
│   │   ├── Nav.tsx           # Main navigation component
│   │   ├── NavSimple.tsx     # Simplified navigation
│   │   ├── ProjectsSection.tsx # Projects with conditional buttons
│   │   ├── PublicationsSection.tsx # Publications display
│   │   ├── SkillsSection.tsx # Skills matrix component
│   │   ├── SkipNavigation.tsx # Accessibility navigation
│   │   ├── ThemeToggle.tsx   # Dark/light mode toggle
│   │   ├── figma/            # Figma-generated components
│   │   └── ui/               # Radix UI component library
│   ├── hooks/                # Custom React hooks
│   └── lib/                  # Core utilities and data processing
│       ├── models.ts         # TypeScript interfaces
│       ├── parseResumeMarkdown.ts # Core parsing engine
│       ├── paths.ts          # Environment path utilities
│       └── pdfGenerator.ts   # PDF export functionality
├── docs/                     # Generated static build (GitHub Pages) + consolidated documentation
│   ├── specs/               # Project specifications and contracts
│   ├── BUN_MIGRATION.md     # Bun migration guide
│   ├── DEPLOYMENT_SUMMARY.md # Deployment documentation
│   └── manual-test-checklist.md # Testing documentation
├── out/                      # Next.js export output directory
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
```

### Component Architecture

**Section-Based Components**: Each major content area is encapsulated in dedicated components:
- `ExperienceSection.tsx` - Professional timeline with achievements
- `ProjectsSection.tsx` - Project showcase with conditional buttons  
- `AboutSection.tsx` - Bio, skills, and contact information
- `SkillsSection.tsx` - Skills matrix display

**Navigation Components**:
- `Nav.tsx` - Full-featured navigation with responsive design
- `NavSimple.tsx` - Simplified navigation for specific pages
- `SkipNavigation.tsx` - Accessibility-first skip-to-content

**Utility Components**:
- `MarkdownText.tsx` - Safe HTML rendering from parsed markdown
- `HeroSimple.tsx` - Hero section with current role highlight

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

### Projects Section (Optional)
```markdown
## PROJECTS

**[Project Name](https://project-link.com)**  
- Project description with technologies used

**Project Without Link**
- Description for projects without external links
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
6. **Link Extraction**: Processes markdown links in project titles
7. **Skills Categorization**: Parses skills by category from `**Category:**` format

## 🚀 Development Setup

### Prerequisites
- **Bun**: Version 1.3.x or later (JavaScript runtime & package manager)
  - Install: `irm bun.com/install.ps1 | iex` (Windows PowerShell)
  - Verify: `bun --version`
- **Git**: For version control and deployment
- **Modern Browser**: Chrome, Firefox, Safari, or Edge for testing

### Local Development Installation

```bash
# 1. Clone the repository
git clone https://github.com/Vibz28/resume_md2website.git
cd resume_md2website

# 2. Install dependencies with Bun
bun install

# 3. Start development server
bun run dev

# 4. Open browser to http://localhost:3000
```

### Available Scripts

```bash
# Development
bun run dev          # Start development server (localhost:3000)
bun run build        # Production build
bun run start        # Start production server locally
bun run lint         # Run ESLint code analysis

# Static Export (GitHub Pages)
bun run export       # Build + copy to docs/ folder for GitHub Pages

# Testing
bun run test         # Run Playwright tests
bun run test:ui      # Interactive test runner
bun run test:report  # Generate HTML test report
```

## 📦 GitHub Actions Deployment

### Automated CI/CD Pipeline

The project uses GitHub Actions with **Bun runtime** for automated deployment to GitHub Pages. The workflow is defined in `.github/workflows/nextjs.yml`:

#### Workflow Configuration

```yaml
name: Deploy Next.js site to Pages

on:
  push:
    branches: ["main", "production-deploy"]  # Triggers on pushes to main/production-deploy
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
   - Bun 1.3.x with automatic dependency installation
   - Cache for Bun install cache and Next.js build cache

2. **Build Steps**:
   ```bash
   # Automatic dependency installation (bun install --frozen-lockfile)
   # Next.js build with static export (bun x --bun next build)
   # Artifact upload to GitHub Pages
   ```

3. **Deployment**:
   - Only deploys from `main` branch (security feature)
   - Automatic GitHub Pages environment configuration
   - Live URL: https://vibz28.github.io/resume_md2website

#### Branch Protection Strategy

- **`main` branch**: Production deployments only
- **Feature branches**: Development and testing
- **`production-deploy` branch**: Staging deployments (builds but doesn't deploy)

### Manual Deployment Process

For manual deployments or troubleshooting:

```bash
# 1. Generate static export
bun run export

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
   bun run build
   
   # Fix linting issues
   bun run lint
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
   bun run dev
   # Visit http://localhost:3000 to preview
   ```

3. **Deploy to production**:
   ```bash
   bun run export
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
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Add custom colors, fonts, spacing
    },
  },
  plugins: [],
}
```

**Component Styling Patterns**:
- **Navigation**: `bg-white border-b border-gray-200`
- **Hero Section**: `bg-gradient-to-r from-blue-600 to-purple-600`
- **Cards**: `bg-white rounded-lg shadow-sm hover:shadow-md`
- **Buttons**: `bg-blue-600 hover:bg-blue-700 text-white rounded-md`

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

## 🧪 Testing Framework

### Playwright Testing Suite

The project includes comprehensive end-to-end testing with Playwright:

```bash
# Run all tests
npm run test

# Interactive test runner
npm run test:ui

# Generate HTML report
npm run test:report
```

### Test Structure

**Page Contract Tests** (if present):
- `tests/contract/home.test.ts` - Home page functionality
- `tests/contract/experience.test.ts` - Experience section validation
- `tests/contract/projects.test.ts` - Project showcase testing
- `tests/contract/navigation.test.ts` - Navigation consistency

**Integration Tests**:
- Content parsing accuracy
- Cross-page navigation
- Responsive design validation
- Performance benchmarking

### Adding New Tests

```typescript
// tests/your-feature.test.ts
import { test, expect } from '@playwright/test';

test('should display your feature correctly', async ({ page }) => {
  await page.goto('/');
  
  // Test your feature
  await expect(page.locator('[data-testid="your-feature"]')).toBeVisible();
});
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
- **Prettier**: Consistent code formatting (if configured)
- **Testing**: Add tests for new features
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

**Phase 1: Content Expansion**
- [ ] Contact form with email integration
- [ ] PDF resume download functionality
- [ ] Publications section with filtering
- [ ] Case studies with detailed project breakdowns

**Phase 2: User Experience**
- [ ] Dark mode toggle with system preference detection
- [ ] Mobile navigation hamburger menu
- [ ] Search functionality across content
- [ ] Performance optimizations (lazy loading, caching)

**Phase 3: Advanced Features**
- [ ] CMS integration for non-technical updates
- [ ] Analytics dashboard for visitor insights
- [ ] Multi-language support (i18n)
- [ ] SEO enhancements with structured data

### Technical Debt

- [ ] Complete mobile navigation implementation
- [ ] Accessibility audit (WCAG 2.1 AA compliance)
- [ ] Performance optimization (target Lighthouse >95)
- [ ] Test coverage expansion
- [ ] Component documentation with Storybook

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

*This README provides comprehensive documentation for the current platform. For questions, issues, or contributions, please use the GitHub repository's issue tracker.*