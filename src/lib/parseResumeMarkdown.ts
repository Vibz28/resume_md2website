import fs from 'fs';
import path from 'path';
import type { ParsedContent, Profile, ExperienceEntry, Project } from './models';

// Helper function to parse markdown formatting
function parseMarkdownText(text: string): string {
  if (!text) return '';
  
  // Convert **bold** to <strong>
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  // Convert *italic* to <em>
  text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  // Convert `code` to <code>
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  return text;
}

function parseWorkExperience(content: string): ExperienceEntry[] {
  const experience: ExperienceEntry[] = [];
  
  // Extract work experience section
  const workSection = content.match(/## WORK EXPERIENCE\n\n([\s\S]*?)(?=\n---|\n##|$)/);
  if (!workSection) return experience;
  
  const workText = workSection[1];
  
  // Split by company entries - look for **Company Name** followed by job titles
  const companyMatches = workText.match(/\*\*([^*]+)\*\*[\s\S]*?(?=\*\*[^*]+\*\*(?!\s*_)|$)/g);
  
  if (companyMatches) {
    for (const companyEntry of companyMatches) {
      const employer = companyEntry.match(/\*\*([^*]+)\*\*/)?.[1]?.trim();
      if (!employer) continue;
      
      // Find all positions within this company
      const positionMatches = companyEntry.match(/_\*\*([^*]+)\*\*_\s*\n\*([^*]+)\*[\s\S]*?(?=_\*\*|$)/g);
      
      if (positionMatches) {
        for (const position of positionMatches) {
          const titleMatch = position.match(/_\*\*([^*]+)\*\*_/);
          const dateLocationMatch = position.match(/\*([^*]+)\*/);
          
          if (!titleMatch || !dateLocationMatch) continue;
          
          const title = titleMatch[1].trim();
          const dateLocationStr = dateLocationMatch[1].trim();
          
          // Split timeframe and location
          const parts = dateLocationStr.split('|').map(p => p.trim());
          const timeframe = parts[0] || '';
          const location = parts[1] || '';
          
          // Extract bullet points
          const bulletMatches = position.match(/^- (.+)$/gm);
          const achievements: string[] = bulletMatches ? bulletMatches.map(bullet => parseMarkdownText(bullet.substring(2).trim())) : [];
          
          // Create summary from first achievement
          let summary = '';
          if (achievements.length > 0) {
            const rawSummary = achievements[0].replace(/<[^>]+>/g, ''); // Strip HTML for length check
            summary = rawSummary.length > 150 
              ? parseMarkdownText(rawSummary.substring(0, 150) + '...')
              : achievements[0]; // Use the formatted version
          } else {
            summary = `${title} role at ${employer} focused on advanced technology solutions.`;
          }
          
          experience.push({
            employer,
            title,
            timeframe,
            location,
            summary,
            achievements
          });
        }
      }
    }
  }
  
  return experience;
}

function parseProjects(content: string): Project[] {
  const projects: Project[] = [];
  
  const projectsSection = content.match(/## PROJECTS\n\n([\s\S]*?)(?=\n---|\n##|$)/);
  if (!projectsSection) return projects;
  
  const projectText = projectsSection[1];
  
  // Look for **[Title](Link)** pattern
  const projectMatches = projectText.match(/\*\*\[([^\]]+)\]\(([^)]+)\)\*\*\s*\n-\s*([^\n]+)/g);
  
  if (projectMatches) {
    for (const match of projectMatches) {
      const parsed = match.match(/\*\*\[([^\]]+)\]\(([^)]+)\)\*\*\s*\n-\s*([^\n]+)/);
      if (parsed) {
        projects.push({
          title: parsed[1].trim(),
          description: parsed[3].trim(),
          link: parsed[2].trim()
        });
      }
    }
  }
  
  return projects;
}

function parseSkills(content: string): string[] {
  const skills: string[] = [];
  
  const skillsSection = content.match(/## SKILLS\n\n([\s\S]*?)(?=\n---|\n##|$)/);
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

export function parseResumeMarkdown(): ParsedContent {
  try {
    const resumePath = path.join(process.cwd(), 'resume_vibhor_janey_updated_aug_2025.md');
    const content = fs.readFileSync(resumePath, 'utf-8');

    // Parse profile information
    const lines = content.split('\n');
    const name = lines[0].replace('# ', '').trim();
    const title = lines[1].replace(/\*\*/g, '').trim();
    
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



    // Parse skills
    const skills = parseSkills(content);

    // Create bio
    let bio = `${name} is an experienced ${title} with expertise in AI solution architecture, data engineering, and machine learning applications.`;
    bio += '\n\nCurrently serving as Senior Manager of AI Solution Architect at Bristol Myers Squibb, leading development of AI copilot experiences for manufacturing operations and building advanced data architecture solutions.';

    const profile: Profile = {
      name,
      title,
      bio,
      skills: skills.slice(0, 15), // Get more skills for better display
      contacts
    };

    // Parse experience and projects
    const experience = parseWorkExperience(content);
    const projects = parseProjects(content);

    return {
      profile,
      experience,
      projects
    };
  } catch (error) {
    console.error('Error parsing resume:', error);
    
    // Fallback data
    return {
      profile: {
        name: 'Vibhor Janey',
        title: 'AI Solution Architect',
        bio: 'Experienced AI Solution Architect specializing in manufacturing and healthcare AI applications.\n\nCurrently serving as Senior Manager of AI Solution Architect at Bristol Myers Squibb, leading development of AI copilot experiences for manufacturing operations.',
        skills: ['AI Architecture', 'Machine Learning', 'Data Engineering', 'Python', 'Next.js', 'React'],
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
      ]
    };
  }
}