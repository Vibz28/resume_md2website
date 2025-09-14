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
  const workSection = content.match(/## WORK EXPERIENCE\s*([\s\S]*?)(?=\n---|\n##|$)/);
  if (!workSection) return experience;
  
  const workText = workSection[1];
  
  // Split by company entries - look for **Company Name** pattern (but not Summary:)
  const companyBlocks = workText.split(/(?=^\*\*(?!Summary:)[^*]+\*\*\s*)/gm).filter(block => block.trim());
  
  for (const companyBlock of companyBlocks) {
    const lines = companyBlock.trim().split('\n');
    
    // Extract company name from first line
    const companyMatch = lines[0]?.match(/^\*\*([^*]+)\*\*\s*/);
    if (!companyMatch) continue;
    const employer = companyMatch[1].trim();
    
    // Find all positions within this company
    let currentPosition: any = null;
    let bulletPoints: string[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Check if this is a position title line
      if (line.match(/^_\*\*([^*]+)\*\*_$/)) {
        // Save previous position if exists
        if (currentPosition) {
          currentPosition.achievements = bulletPoints.map(bullet => parseMarkdownText(bullet));
          
          // Use dedicated summary if available, otherwise create from first achievement
          if (!currentPosition.summary) {
            if (currentPosition.achievements.length > 0) {
              const rawSummary = currentPosition.achievements[0].replace(/<[^>]+>/g, '');
              currentPosition.summary = rawSummary.length > 150 
                ? parseMarkdownText(rawSummary.substring(0, 150) + '...')
                : currentPosition.achievements[0];
            } else {
              currentPosition.summary = `${currentPosition.title} role at ${employer} focused on advanced technology solutions.`;
            }
          }
          
          experience.push(currentPosition);
          bulletPoints = [];
        }
        
        // Start new position
        const titleMatch = line.match(/^_\*\*([^*]+)\*\*_$/);
        if (titleMatch) {
          currentPosition = {
            employer,
            title: titleMatch[1].trim(),
            timeframe: '',
            location: '',
            summary: '',
            achievements: []
          };
          bulletPoints = [];
        }
      }
      // Check if this is a date/location line
      else if (line.match(/^\*([^*]+)\*$/)) {
        if (currentPosition) {
          const dateLocationMatch = line.match(/^\*([^*]+)\*$/);
          if (dateLocationMatch) {
            const dateLocationStr = dateLocationMatch[1].trim();
            const parts = dateLocationStr.split('|').map(p => p.trim());
            currentPosition.timeframe = parts[0] || '';
            currentPosition.location = parts[1] || '';
          }
        }
      }
      // Check if this is a summary line
      else if (line.match(/^\*\*Summary:\*\*\s*(.+)$/)) {
        if (currentPosition) {
          const summaryMatch = line.match(/^\*\*Summary:\*\*\s*(.+)$/);
          if (summaryMatch) {
            currentPosition.summary = parseMarkdownText(summaryMatch[1].trim());
          }
        }
      }
      // Check if this is a bullet point
      else if (line.startsWith('- ')) {
        let bulletText = line.substring(2).trim();
        
        // Handle multi-line bullet points
        let j = i + 1;
        while (j < lines.length && lines[j].trim() && 
               !lines[j].trim().startsWith('- ') && 
               !lines[j].trim().match(/^_\*\*([^*]+)\*\*_$/) &&
               !lines[j].trim().match(/^\*([^*]+)\*$/)) {
          bulletText += ' ' + lines[j].trim();
          j++;
        }
        i = j - 1; // Skip processed lines
        
        bulletPoints.push(bulletText);
      }
    }
    
    // Don't forget the last position
    if (currentPosition) {
      currentPosition.achievements = bulletPoints.map(bullet => parseMarkdownText(bullet));
      
      // Use dedicated summary if available, otherwise create from first achievement
      if (!currentPosition.summary) {
        if (currentPosition.achievements.length > 0) {
          const rawSummary = currentPosition.achievements[0].replace(/<[^>]+>/g, '');
          currentPosition.summary = rawSummary.length > 150 
            ? parseMarkdownText(rawSummary.substring(0, 150) + '...')
            : currentPosition.achievements[0];
        } else {
          currentPosition.summary = `${currentPosition.title} role at ${employer} focused on advanced technology solutions.`;
        }
      }
      
      experience.push(currentPosition);
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