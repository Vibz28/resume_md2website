import jsPDF from 'jspdf';
import type { ParsedContent, Profile, ExperienceEntry, Education, Project, Course, SkillCategory } from './models';

export interface PDFOptions {
  filename?: string;
  format?: 'a4' | 'letter';
  orientation?: 'portrait' | 'landscape';
  resumeData?: ParsedContent;
}

function formatContactsForPDF(profile: Profile): string[] {
  const contacts: string[] = [];
  
  // Extract email
  const emailContact = profile.contacts.find(c => c.label.toLowerCase() === 'email');
  if (emailContact) {
    const email = emailContact.url.replace('mailto:', '');
    contacts.push(email);
  }
  
  // Extract LinkedIn
  const linkedInContact = profile.contacts.find(c => c.label.toLowerCase() === 'linkedin');
  if (linkedInContact) {
    const linkedinUrl = linkedInContact.url;
    const username = linkedinUrl.split('/in/')[1]?.replace('/', '') || linkedinUrl;
    contacts.push(`linkedin.com/in/${username}`);
  }
  
  return contacts;
}

export function generateResumePDF(options: PDFOptions = {}) {
  const {
    filename = 'Vibhor_Janey_Resume.pdf',
    format = 'a4',
    orientation = 'portrait',
    resumeData
  } = options;

  try {
    // Use provided resume data or fallback to static data
    const parsedData: ParsedContent = resumeData || getFallbackResumeData();
    const { profile, experience, education, projects, courses } = parsedData;
    
    // Format contacts for PDF display
    const contactStrings = formatContactsForPDF(profile);

    // Create new PDF document
    const doc = new jsPDF({
      orientation,
      unit: 'mm',
      format
    });

    // Set fonts and colors
    const primaryColor: [number, number, number] = [20, 184, 166]; // Teal-500
    const textColor: [number, number, number] = [55, 65, 81]; // Gray-700
    const lightGray: [number, number, number] = [156, 163, 175]; // Gray-400

    let currentY = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);

    // Helper function to add text with word wrapping
    const addWrappedText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number = 6) => {
      const lines = doc.splitTextToSize(text, maxWidth);
      for (let i = 0; i < lines.length; i++) {
        if (y + (i * lineHeight) > 280) { // Check if we need a new page
          doc.addPage();
          y = 20;
        }
        doc.text(lines[i], x, y + (i * lineHeight));
      }
      return y + (lines.length * lineHeight);
    };

    // Header Section
    doc.setFontSize(24);
    doc.setTextColor(...primaryColor);
    doc.text(profile.name, margin, currentY);
    
    currentY += 8;
    doc.setFontSize(14);
    doc.setTextColor(...textColor);
    doc.text(profile.title, margin, currentY);

    // Contact Information  
    currentY += 10;
    doc.setFontSize(10);
    doc.setTextColor(...lightGray);
    
    const contactText = contactStrings.join(' | ');
    currentY = addWrappedText(contactText, margin, currentY, contentWidth, 4);

    // Horizontal line
    currentY += 8;
    doc.setDrawColor(...lightGray);
    doc.line(margin, currentY, pageWidth - margin, currentY);

    // Experience Section
    currentY += 10;
    doc.setFontSize(14);
    doc.setTextColor(...primaryColor);
    doc.text('Professional Experience', margin, currentY);

    for (const exp of experience) {
      currentY += 10;
      
      // Company and Title
      doc.setFontSize(12);
      doc.setTextColor(...textColor);
      doc.text(exp.title, margin, currentY);
      
      currentY += 6;
      doc.setFontSize(10);
      doc.setTextColor(...lightGray);
      doc.text(`${exp.employer} | ${exp.timeframe} | ${exp.location}`, margin, currentY);

      // Achievements (full content, no summaries)
      if (exp.achievements && exp.achievements.length > 0) {
        currentY += 8;
        for (const achievement of exp.achievements) {
          currentY += 6;
          // Remove HTML tags and markdown formatting from achievement text
          const cleanText = achievement.replace(/<[^>]*>/g, '').replace(/\*\*/g, '');
          doc.setTextColor(...textColor);
          currentY = addWrappedText(`• ${cleanText}`, margin + 5, currentY, contentWidth - 10, 5);
          
          // Check for page break
          if (currentY > 270) {
            doc.addPage();
            currentY = 20;
          }
        }
      }
    }

    // Education Section
    if (education.length > 0) {
      currentY += 15;
      if (currentY > 250) {
        doc.addPage();
        currentY = 20;
      }
      
      doc.setFontSize(14);
      doc.setTextColor(...primaryColor);
      doc.text('Education', margin, currentY);

      for (const edu of education) {
        currentY += 10;
        
        // Institution and Degree
        doc.setFontSize(12);
        doc.setTextColor(...textColor);
        doc.text(`${edu.institution} — ${edu.degree}`, margin, currentY);
        
        currentY += 6;
        doc.setFontSize(10);
        doc.setTextColor(...lightGray);
        doc.text(`${edu.timeframe} | ${edu.location}`, margin, currentY);
      }
    }

    // Skills Section (Categorized)
    if (profile.skillCategories && profile.skillCategories.length > 0) {
      currentY += 15;
      if (currentY > 250) {
        doc.addPage();
        currentY = 20;
      }
      
      doc.setFontSize(14);
      doc.setTextColor(...primaryColor);
      doc.text('Skills', margin, currentY);

      currentY += 8;
      for (const category of profile.skillCategories) {
        currentY += 6;
        doc.setFontSize(10);
        doc.setTextColor(...primaryColor);
        doc.text(`${category.category}:`, margin, currentY);
        
        currentY += 4;
        doc.setTextColor(...textColor);
        doc.setFontSize(9);
        const skillsText = category.skills.join(', ');
        currentY = addWrappedText(skillsText, margin + 5, currentY, contentWidth - 10, 4);
        
        // Check for page break
        if (currentY > 270) {
          doc.addPage();
          currentY = 20;
        }
      }
    }

    // Projects Section
    if (projects.length > 0) {
      currentY += 15;
      if (currentY > 250) {
        doc.addPage();
        currentY = 20;
      }
      
      doc.setFontSize(14);
      doc.setTextColor(...primaryColor);
      doc.text('Projects', margin, currentY);

      for (const project of projects) {
        currentY += 10;
        
        doc.setFontSize(11);
        doc.setTextColor(...textColor);
        currentY = addWrappedText(project.title, margin, currentY, contentWidth);
        
        currentY += 6;
        doc.setFontSize(9);
        currentY = addWrappedText(project.description, margin, currentY, contentWidth, 4);
      }
    }

    // Courses Section
    if (courses.length > 0) {
      currentY += 15;
      if (currentY > 250) {
        doc.addPage();
        currentY = 20;
      }
      
      doc.setFontSize(14);
      doc.setTextColor(...primaryColor);
      doc.text('Courses', margin, currentY);

      for (const course of courses) {
        currentY += 8;
        
        doc.setFontSize(10);
        doc.setTextColor(...textColor);
        doc.text(`${course.title} — ${course.institution}`, margin, currentY);
        
        currentY += 4;
        doc.setTextColor(...lightGray);
        doc.text(course.date, margin, currentY);
      }
    }

    // Save the PDF
    doc.save(filename);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
}

export function downloadResumePDF(resumeData?: ParsedContent) {
  const success = generateResumePDF({
    filename: 'Vibhor_Janey_Resume.pdf',
    format: 'a4',
    orientation: 'portrait',
    resumeData
  });
  
  if (!success) {
    // Fallback: try to open a pre-existing PDF or show an error
    console.error('Failed to generate PDF. Please try again.');
    
    // As a fallback, we could link to a pre-generated PDF
    // For now, we'll just show an alert
    alert('Unable to generate PDF at this time. Please contact me directly at vibhor.janey@gmail.com for a copy of my resume.');
  }
}

function getFallbackResumeData(): ParsedContent {
  return {
    profile: {
      name: 'Vibhor Janey',
      title: 'Full Stack Developer',
      headline: 'Building scalable web applications with modern technologies',
      bio: 'Experienced full-stack developer passionate about creating efficient, user-friendly applications. Specialized in React, Node.js, and cloud technologies.',
      skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL', 'PostgreSQL', 'MongoDB'],
      skillCategories: [
        {
          category: 'Frontend',
          skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux', 'HTML/CSS']
        },
        {
          category: 'Backend',
          skills: ['Node.js', 'Python', 'Express', 'FastAPI', 'GraphQL', 'REST APIs']
        },
        {
          category: 'Cloud & DevOps',
          skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'GitHub Actions']
        },
        {
          category: 'Databases',
          skills: ['PostgreSQL', 'MongoDB', 'Redis', 'DynamoDB', 'Elasticsearch']
        }
      ],
      highlights: [
        { value: '5+', label: 'Years Experience' },
        { value: '20+', label: 'Projects Delivered' },
        { value: '99%', label: 'Client Satisfaction' }
      ],
      contacts: [
        { label: 'Email', url: 'mailto:vibhor.janey@gmail.com' },
        { label: 'LinkedIn', url: 'https://linkedin.com/in/vibhorjaney' },
        { label: 'GitHub', url: 'https://github.com/vibhorjaney' },
        { label: 'Website', url: 'https://vibhorjaney.dev' }
      ]
    },
    experience: [
      {
        employer: 'TechCorp Solutions',
        title: 'Senior Full Stack Developer',
        timeframe: 'Jan 2022 - Present',
        location: 'San Francisco, CA (Remote)',
        summary: 'Leading development of enterprise-scale SaaS applications',
        achievements: [
          'Architected and deployed microservices-based platform serving 100K+ daily active users',
          'Reduced API response times by 60% through caching strategies and query optimization',
          'Led a team of 5 developers in migrating legacy monolith to modern cloud-native architecture',
          'Implemented CI/CD pipelines reducing deployment time from hours to minutes'
        ]
      },
      {
        employer: 'StartupXYZ',
        title: 'Full Stack Developer',
        timeframe: 'Jun 2020 - Dec 2021',
        location: 'New York, NY',
        summary: 'Built features for fintech platform from ground up',
        achievements: [
          'Developed real-time payment processing system handling $10M+ monthly transactions',
          'Created responsive dashboard with data visualization using D3.js and React',
          'Implemented OAuth 2.0 and JWT-based authentication for secure API access',
          'Collaborated with product team to deliver features 20% faster than projected timelines'
        ]
      },
      {
        employer: 'Digital Agency Pro',
        title: 'Junior Developer',
        timeframe: 'Aug 2019 - May 2020',
        location: 'Austin, TX',
        summary: 'Developed websites and web applications for diverse clients',
        achievements: [
          'Built 15+ responsive websites for clients across various industries',
          'Optimized website performance achieving 90+ Lighthouse scores consistently',
          'Integrated third-party APIs including Stripe, SendGrid, and Google Maps'
        ]
      }
    ],
    education: [
      {
        institution: 'University of Technology',
        degree: 'Bachelor of Science in Computer Science',
        timeframe: '2015 - 2019',
        location: 'Austin, TX'
      }
    ],
    projects: [
      {
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with React frontend, Node.js backend, and Stripe integration. Features include real-time inventory management, user authentication, and admin dashboard.',
        link: 'https://github.com/vibhorjaney/ecommerce-platform'
      },
      {
        title: 'Task Management App',
        description: 'Collaborative project management tool built with Next.js and PostgreSQL. Includes real-time updates via WebSockets, drag-and-drop interface, and team collaboration features.',
        link: 'https://github.com/vibhorjaney/task-manager'
      },
      {
        title: 'Data Visualization Dashboard',
        description: 'Interactive analytics dashboard using D3.js and React. Processes large datasets and renders interactive charts, graphs, and geographic visualizations.',
        link: 'https://github.com/vibhorjaney/data-viz-dashboard'
      }
    ],
    courses: [
      {
        title: 'AWS Certified Solutions Architect',
        institution: 'Amazon Web Services',
        date: '2023'
      },
      {
        title: 'Advanced React Patterns',
        institution: 'Frontend Masters',
        date: '2022'
      },
      {
        title: 'System Design Fundamentals',
        institution: 'Educative',
        date: '2022'
      },
      {
        title: 'Machine Learning Specialization',
        institution: 'Coursera (Stanford)',
        date: '2021'
      }
    ],
    publications: []
  };
}
