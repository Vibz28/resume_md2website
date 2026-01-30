import fs from 'fs';
import path from 'path';
import type { ParsedContent, Profile, ExperienceEntry, Project, Publication } from './models';

// Cache for parsed markdown text to avoid re-processing
const markdownCache = new Map<string, string>();

// Helper function to parse markdown formatting
function parseMarkdownText(text: string): string {
  if (!text) return '';
  
  // Check cache first
  if (markdownCache.has(text)) {
    return markdownCache.get(text)!;
  }
  
  let result = text;
  
  // Convert **bold** to <strong>
  result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  // Convert *italic* to <em>
  result = result.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  // Convert `code` to <code>
  result = result.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Cache the result (limit cache size to prevent memory leaks)
  if (markdownCache.size > 1000) {
    const firstKey = markdownCache.keys().next().value;
    if (firstKey !== undefined) {
      markdownCache.delete(firstKey);
    }
  }
  markdownCache.set(text, result);
  
  return result;
}

// Cache for parsed content to avoid re-parsing the entire resume
const contentCache = new Map<string, ParsedContent>();

function parseWorkExperience(content: string): ExperienceEntry[] {
  const experience: ExperienceEntry[] = [];
  
  // Validate input
  if (!content || typeof content !== 'string') {
    console.warn('Invalid content provided to parseWorkExperience');
    return experience;
  }
  
  // Extract work experience section with more flexible pattern matching
  const workSection = content.match(/## (?:WORK )?EXPERIENCE\s*([\s\S]*?)(?=\n---|\n##|$)/i);
  if (!workSection || !workSection[1]) {
    console.warn('No work experience section found');
    return experience;
  }
  
  const workText = workSection[1].trim();
  if (!workText) {
    console.warn('Work experience section is empty');
    return experience;
  }
  
  // Split by company entries - look for **Company Name** pattern at start of line
  const companyBlocks = workText.split(/(?=^\*\*[^*]+\*\*\s*$)/gm).filter(block => block.trim());
  
  for (const companyBlock of companyBlocks) {
    try {
      const lines = companyBlock.trim().split('\n');
      
      // Extract company name from first line with validation
      const companyMatch = lines[0]?.match(/^\*\*([^*]+)\*\*\s*$/);
      if (!companyMatch || !companyMatch[1]) {
        console.warn('Invalid company format in block:', lines[0]);
        continue;
      }
      const employer = companyMatch[1].trim();
      
      // Validate employer name
      if (!employer || employer.length < 2) {
        console.warn('Invalid employer name:', employer);
        continue;
      }
      
      // Find all positions within this company
      let currentPosition: Partial<ExperienceEntry> | null = null;
      let bulletPoints: string[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue; // Skip empty lines
        
        // Check if this is a position title line (format: _**Title**_)
        if (line.match(/^_\*\*([^*]+)\*\*_$/)) {
          // Save previous position if exists and is valid
          if (currentPosition && isValidPosition(currentPosition, bulletPoints)) {
            currentPosition.achievements = bulletPoints
              .filter(bullet => bullet.trim())
              .map(bullet => parseMarkdownText(bullet));
            experience.push(currentPosition as ExperienceEntry);
            bulletPoints = [];
          }
          
          // Start new position
          const titleMatch = line.match(/^_\*\*([^*]+)\*\*_$/);
          if (titleMatch && titleMatch[1]?.trim()) {
            currentPosition = {
              employer,
              title: titleMatch[1].trim(),
              timeframe: '',
              location: '',
              summary: '',
              achievements: []
            };
          }
        }
        // Check if this is a date/location line (format: *Date | Location*)
        else if (line.match(/^\*([^*]+)\*$/)) {
          if (currentPosition) {
            const dateLocationMatch = line.match(/^\*([^*]+)\*$/);
            if (dateLocationMatch && dateLocationMatch[1]) {
              const dateLocationStr = dateLocationMatch[1].trim();
              const parts = dateLocationStr.split('|').map(p => p.trim());
              currentPosition.timeframe = parts[0] || '';
              currentPosition.location = parts[1] || '';
              
              // Validate timeframe format
              if (currentPosition.timeframe && !isValidTimeframe(currentPosition.timeframe)) {
                console.warn('Invalid timeframe format:', currentPosition.timeframe);
              }
            }
          }
        }
        // Check if this is a summary line (format: **Summary:** text)
        else if (line.match(/^\*\*Summary:\*\*\s*(.+)$/)) {
          if (currentPosition) {
            const summaryMatch = line.match(/^\*\*Summary:\*\*\s*(.+)$/);
            if (summaryMatch && summaryMatch[1]?.trim()) {
              currentPosition.summary = parseMarkdownText(summaryMatch[1].trim());
            }
          }
        }
        // Check if this is a bullet point (format: - text)
        else if (line.startsWith('- ')) {
          let bulletText = line.substring(2).trim();
          
          // Handle multi-line bullet points with improved logic
          let j = i + 1;
          while (j < lines.length && lines[j]?.trim()) {
            const nextLine = lines[j].trim();
            
            // Stop if we hit another bullet point or section marker
            if (nextLine.startsWith('- ') || 
                nextLine.match(/^_\*\*([^*]+)\*\*_$/) ||
                nextLine.match(/^\*([^*]+)\*$/) ||
                nextLine.match(/^\*\*Summary:\*\*/)) {
              break;
            }
            
            bulletText += ' ' + nextLine;
            j++;
          }
          i = j - 1; // Skip processed lines
          
          // Validate bullet point content
          if (bulletText.trim() && bulletText.length >= 10) {
            bulletPoints.push(bulletText);
          } else if (bulletText.trim()) {
            console.warn('Bullet point too short, may be invalid:', bulletText);
          }
        }
      }
      
      // Don't forget the last position in the company
      if (currentPosition && isValidPosition(currentPosition, bulletPoints)) {
        if (bulletPoints.length > 0) {
          currentPosition.achievements = bulletPoints
            .filter(bullet => bullet.trim())
            .map(bullet => parseMarkdownText(bullet));
        }
        
        // Ensure summary is set with improved logic
        if (!currentPosition.summary || currentPosition.summary.trim() === '') {
          if (currentPosition.achievements && currentPosition.achievements.length > 0) {
            const rawSummary = currentPosition.achievements[0].replace(/<[^>]+>/g, '').trim();
            if (rawSummary.length > 150) {
              // Find a good break point (sentence end or word boundary)
              const breakPoint = rawSummary.indexOf('.', 120);
              const cutoff = breakPoint > 0 ? breakPoint + 1 : 150;
              currentPosition.summary = parseMarkdownText(rawSummary.substring(0, cutoff).trim() + '...');
            } else {
              currentPosition.summary = currentPosition.achievements[0];
            }
          } else {
            currentPosition.summary = `${currentPosition.title} role at ${employer}.`;
          }
        }
        
        experience.push(currentPosition as ExperienceEntry);
      }
    } catch (error) {
      console.warn('Error parsing company block:', error);
      continue; // Skip this block but continue with others
    }
  }
  
  return experience;
}

// Helper function to validate position data
function isValidPosition(position: Partial<ExperienceEntry>, bulletPoints: string[]): boolean {
  return !!(
    position &&
    position.employer &&
    position.title &&
    position.employer.trim().length >= 2 &&
    position.title.trim().length >= 2 &&
    (bulletPoints.length > 0 || position.summary)
  );
}

// Helper function to validate timeframe format
function isValidTimeframe(timeframe: string): boolean {
  if (!timeframe) return false;
  
  // Check for common patterns like:
  // "Jan 2020 – Present", "2020 – 2021", "Jul 2020 – Dec 2021"
  const patterns = [
    /^\w{3} \d{4} – Present$/i,
    /^\d{4} – \d{4}$/,
    /^\w{3} \d{4} – \w{3} \d{4}$/i,
    /^Present$/i
  ];
  
  return patterns.some(pattern => pattern.test(timeframe.trim()));
}

function parseProjects(content: string): Project[] {
  const projects: Project[] = [];
  
  const projectsSection = content.match(/## PROJECTS\s*\n\n?([\s\S]*?)(?=\n---|\n##|$)/);
  if (!projectsSection) return projects;
  
  const projectText = projectsSection[1];
  
  // Split by double newlines to get individual project blocks
  const projectBlocks = projectText.split(/\n\n+/).filter(block => block.trim());
  
  for (const block of projectBlocks) {
    // Match **[Title](Link)** pattern
    const titleMatch = block.match(/\*\*\[([^\]]+)\]\(([^)]+)\)\*\*/);
    if (!titleMatch) continue;
    
    const title = titleMatch[1].trim();
    const link = titleMatch[2].trim();
    
    // Get description - lines starting with -
    const lines = block.split('\n');
    let description = '';
    
    for (const line of lines) {
      if (line.trim().startsWith('- ')) {
        description = line.trim().substring(2).trim();
        break;
      }
    }
    
    if (title && description) {
      projects.push({
        title,
        description,
        link
      });
    }
  }
  
  return projects;
}

function parseSkills(content: string): string[] {
  const skills: string[] = [];
  
  const skillsSection = content.match(/## SKILLS\s*\n\n?([\s\S]*?)(?=\n---|\n##|$)/);
  if (!skillsSection) return skills;
  
  const skillsText = skillsSection[1];
  const skillLines = skillsText.split('\n').filter(line => line.startsWith('**'));
  
  skillLines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const skillsInLine = line.substring(colonIndex + 1).split(',');
      skills.push(...skillsInLine.map(s => s.trim()).filter(s => s && !s.startsWith('**')));
    }
  });
  
  return skills;
}

function parsePublications(content: string): Publication[] {
  const publications: Publication[] = [];
  
  const publicationsSection = content.match(/## PUBLICATIONS\s*\n\n?([\s\S]*?)(?=\n---|\n##|$)/);
  if (!publicationsSection) return publications;
  
  const publicationsText = publicationsSection[1];
  
  // Look for publication patterns:
  // **Title** - Authors (Year). *Venue*. [Link](URL)
  // or simpler: **Title** - Description/Authors/Venue info
  const publicationLines = publicationsText.split('\n').filter(line => line.trim() && line.startsWith('**'));
  
  for (const line of publicationLines) {
    // Extract title from **Title** 
    const titleMatch = line.match(/^\*\*([^*]+)\*\*/);
    if (!titleMatch) continue;
    
    const title = titleMatch[1].trim();
    let authors = '';
    let venue = '';
    let year: number | undefined = undefined;
    let link: string | undefined = undefined;
    
    // Extract link if present: [text](url)
    const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      link = linkMatch[2];
    }
    
    // Extract year if present (4 digits)
    const yearMatch = line.match(/\b(19|20)\d{2}\b/);
    if (yearMatch) {
      year = parseInt(yearMatch[0]);
    }
    
    // Extract venue from italic text *venue*
    const venueMatch = line.match(/\*([^*]+)\*/);
    if (venueMatch) {
      venue = venueMatch[1].trim();
    }
    
    // The remaining text after title could be authors/venue info
    const remainingText = line.replace(/^\*\*[^*]+\*\*/, '').replace(/\[([^\]]+)\]\(([^)]+)\)/, '').replace(/\*([^*]+)\*/, '').trim();
    if (remainingText.startsWith(' - ')) {
      authors = remainingText.substring(3).trim();
    }
    
    publications.push({
      title,
      authors: authors || undefined,
      venue: venue || undefined,
      year,
      link
    });
  }
  
  return publications;
}

export function parseResumeMarkdown(): ParsedContent {
  try {
    const resumePath = path.join(process.cwd(), 'resume_vibhor_janey_updated_aug_2025.md');
    const content = fs.readFileSync(resumePath, 'utf-8');
    
    // Check cache first (use file content as cache key)
    const cacheKey = content.length + '_' + content.substring(0, 100).replace(/\s/g, '');
    if (contentCache.has(cacheKey)) {
      return contentCache.get(cacheKey)!;
    }

    // Parse profile information
    const lines = content.split('\n');
    const name = lines[0].replace('# ', '').trim();
    const title = lines[1].replace(/\*\*/g, '').trim();
    
    // Extract headline
    const headlineLine = lines.find(line => line.startsWith('**Headline:**'));
    const headline = headlineLine ? headlineLine.replace('**Headline:**', '').trim() : `${name} — ${title}`;
    
    // Extract contact information
    const contactLine = lines.find(line => line.includes('mailto:'));
    const contacts = [];
    if (contactLine) {
      const emailMatch = contactLine.match(/\[([^\]]+)\]\(mailto:([^)]+)\)/);
      if (emailMatch) {
        contacts.push({ label: 'Email', url: `mailto:${emailMatch[2]}` });
      }
      
      const linkedinMatch = contactLine.match(/\[([^\]]+)\]\(https:\/\/[^)]*linkedin[^)]*\)/);
      if (linkedinMatch) {
        contacts.push({ label: 'LinkedIn', url: linkedinMatch[0].match(/https:\/\/[^)]*/)?.[0] || '' });
      }
    }

    // Parse highlights
    const highlights: Array<{value: string, label: string}> = [];
    const highlightsSection = content.match(/## HIGHLIGHTS\s*\n\n?([\s\S]*?)(?=\n---|\n##|$)/);
    if (highlightsSection) {
      const highlightLines = highlightsSection[1].split('\n').filter(line => line.trim().startsWith('- '));
      highlightLines.forEach(line => {
        const match = line.match(/- \*\*([^*]+)\*\*\s*(.+)/);
        if (match) {
          highlights.push({
            value: match[1].trim(),
            label: match[2].trim()
          });
        }
      });
    }

    // Parse skills
    const skills = parseSkills(content);

    // Create bio
    let bio = `${name} is an experienced ${title} with expertise in AI solution architecture, data engineering, and machine learning applications.`;
    bio += '\n\nCurrently serving as Senior Manager of AI Solution Architect at Bristol Myers Squibb, leading development of AI copilot experiences for manufacturing operations and building advanced data architecture solutions.';

    const profile: Profile = {
      name,
      title,
      headline,
      bio,
      skills: skills.slice(0, 15), // Get more skills for better display
      highlights,
      contacts
    };

    // Parse experience, projects, and publications
    const experience = parseWorkExperience(content);
    const projects = parseProjects(content);
    const publications = parsePublications(content);

    const result = {
      profile,
      experience,
      projects,
      publications
    };

    // Cache the result (limit cache size to prevent memory leaks)
    if (contentCache.size > 50) {
      const firstKey = contentCache.keys().next().value;
      if (firstKey !== undefined) {
        contentCache.delete(firstKey);
      }
    }
    contentCache.set(cacheKey, result);

    return result;
  } catch (error) {
    console.error('Error parsing resume:', error);
    
    // Fallback data
    return {
      profile: {
        name: 'Vibhor Janey',
        title: 'AI Solution Architect',
        headline: 'Architecting Intelligent Systems — delivering production-scale ML systems and agentic orchestration for manufacturing and healthcare.',
        bio: 'Experienced AI Solution Architect specializing in manufacturing and healthcare AI applications.\n\nCurrently serving as Senior Manager of AI Solution Architect at Bristol Myers Squibb, leading development of AI copilot experiences for manufacturing operations.',
        skills: ['AI Architecture', 'Machine Learning', 'Data Engineering', 'Python', 'Next.js', 'React'],
        highlights: [
          { value: '5,000+', label: 'Active Users' },
          { value: '6+', label: 'Years Experience' },
          { value: '40%', label: 'Efficiency Gain' },
          { value: '98.59%', label: 'CV Accuracy' }
        ],
        contacts: [
          { label: 'Email', url: 'mailto:vibhor.janey@gmail.com' },
          { label: 'LinkedIn', url: 'https://www.linkedin.com/in/vibhorjaney/' }
        ]
      },
      experience: [
        {
          employer: 'Bristol Myers Squibb',
          title: 'Senior Manager, AI Solution Architect',
          timeframe: 'Jul 2025 – Present',
          location: 'New Brunswick, NJ',
          summary: 'Delivering AI copilot and decision-support experience targeting 5,000+ manufacturing users.',
          achievements: [
            'Architecting agentic orchestration layer with graph-based workflow engine',
            'Building pipelines for RCA on deviations and auto-generating CAPA drafts',
            'Implementing LLM observability and tracing layer for generation traceability'
          ]
        }
      ],
      projects: [
        {
          title: 'Cotton Pest Classification — Few-Shot Prototypical Networks (PyTorch)',
          description: 'Proposed and implemented a few-shot prototypical network to identify cotton crop pests with limited annotated samples.',
          link: 'https://1drv.ms/b/s!AuN5d6BNlVtfg6tVg6HA8sfAXcIulg?e=krITgi'
        }
      ],
      publications: []
    };
  }
}
