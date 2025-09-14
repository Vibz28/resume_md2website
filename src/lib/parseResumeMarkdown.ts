import fs from 'fs';
import path from 'path';
import type { ParsedContent, Profile, ExperienceEntry, Project } from './models';

function parseWorkExperience(content: string): ExperienceEntry[] {
  const experience: ExperienceEntry[] = [];
  
  // Extract work experience section
  const workSection = content.match(/## WORK EXPERIENCE\n\n([\s\S]*?)(?=\n---|\n##|$)/);
  if (!workSection) return experience;
  
  const workText = workSection[1];
  
  // Split by company entries (look for **Company Name** pattern)
  const entries = workText.split(/(?=\*\*[^*]+\*\*\s*\n_)/);
  
  for (const entry of entries) {
    if (entry.trim().length === 0) continue;
    
    const lines = entry.trim().split('\n');
    
    // Extract company name
    const companyMatch = lines[0]?.match(/\*\*([^*]+)\*\*/);
    if (!companyMatch) continue;
    const employer = companyMatch[1].trim();
    
    // Extract title and dates
    const titleLine = lines.find(line => line.startsWith('_**'));
    if (!titleLine) continue;
    
    const titleMatch = titleLine.match(/_\*\*([^*]+)\*\*/);
    const dateMatch = titleLine.match(/\*([^*]+)\*/);
    
    if (!titleMatch || !dateMatch) continue;
    
    const title = titleMatch[1].trim();
    const timeframe = dateMatch[1].trim();
    
    // Extract location (usually after the pipe |)
    const locationMatch = titleLine.match(/\|\s*([^|]+)$/);
    const location = locationMatch ? locationMatch[1].trim() : '';
    
    // Extract bullet points as achievements
    const achievements: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('- ')) {
        achievements.push(line.substring(2).trim());
      }
    }
    
    // Create summary from first achievement or generic text
    let summary = '';
    if (achievements.length > 0) {
      summary = achievements[0].length > 100 
        ? achievements[0].substring(0, 100) + '...'
        : achievements[0];
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