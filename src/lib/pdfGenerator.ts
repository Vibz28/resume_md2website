import jsPDF from 'jspdf';

export interface PDFOptions {
  filename?: string;
  format?: 'a4' | 'letter';
  orientation?: 'portrait' | 'landscape';
}

export function generateResumePDF(options: PDFOptions = {}) {
  const {
    filename = 'Vibhor_Janey_Resume.pdf',
    format = 'a4',
    orientation = 'portrait'
  } = options;

  try {
    // Static resume data from markdown file
    const profile = {
      name: 'Vibhor Janey',
      title: 'AI Solution Architect',
      contacts: [
        'vibhor.janey@gmail.com',
        '(765)-637-1295', 
        'linkedin.com/in/vibhorjaney',
        'East Brunswick, NJ'
      ]
    };

    const experience = [
      {
        employer: 'Bristol Myers Squibb',
        title: 'Senior Manager, AI Solution Architect, GPS Business Insights and Technology',
        timeframe: 'Jul 2025 – Present',
        location: 'New Brunswick, NJ',
        achievements: [
          'Delivering an AI copilot and decision-support experience targeting 5,000+ manufacturing and quality users. Architecting an agentic orchestration layer with a graph-based workflow engine, containerized for elastic deployment, leveraging data lake query engines over S3. Implementing MCP tool declarations to standardize capability exposure across agents and systems.',
          'Building pipelines to identify, document, and perform RCA on deviations, auto-generate CAPA drafts (HITL), and constructing semantic knowledge bases from historical deviation worklists and SOPs. Enabling text-to-SQL access to past deviations.',
          'Implementing an LLM observability and tracing layer for generation traceability, prompt versioning, and end-to-end visibility testing to support validation. Designing guardrails, RBAC, and audit trails aligned to GxP expectations.'
        ]
      },
      {
        employer: 'Bristol Myers Squibb',
        title: 'Manager, Data Architecture, Global Product Development and Supply',
        timeframe: 'Jul 2023 – Jul 2025',
        location: 'New Brunswick, NJ',
        achievements: [
          'Led information and data architecture for manufacturing, including a Batch Genealogy graph data product (BGDP) unifying SAP, Oracle EBS, and CMO sources, reducing data processing time by >40%. Architected and integrated 7 contract manufacturing organizations\' genealogy from CoA/CoC documents into BGDP, enabling traceability.',
          'Integrated BGDP with SAP Batch Release Hub (Component Check) under the APMC program, improved release decision efficiency by >50%.',
          'Launched a metadata cataloging initiative for the manufacturing data lake, aligning business and technical metadata across 7+ source integrations.'
        ]
      },
      {
        employer: 'Formulatrix',
        title: 'Machine Learning Specialist',
        timeframe: 'Jun 2022 – Aug 2022',
        location: 'Bedford, MA',
        achievements: [
          'Built a computer vision model to classify microplates for the FAST Liquid Handler, achieving 98.59% accuracy across datasets. Implemented in TensorFlow using Classification-by-Retrieval (CbR)',
          'Created an API configuration for image capture and curated labeled datasets under varied conditions. Tested inference on Raspberry Pi Zero & Coral Edge TPU.',
          'Conducted a salary analysis across multiple offices. Built a regression model in R to forecast increments and visualized results.'
        ]
      },
      {
        employer: 'Zebra Technologies',
        title: 'Software Engineer',
        timeframe: 'Oct 2019 – Jun 2021',
        location: 'Kennesaw, GA',
        achievements: [
          'Led the front-end design team for a new product launch; redesigned UX in Figma/Adobe XD and implemented with React.',
          'Collaborated to deploy an anomaly detection model in Python combining a boxplot method with FBProphet.',
          'Contributed to the inception and design of a new banking branch management product.'
        ]
      }
    ];

    const education = [
      {
        institution: 'Tufts University',
        degree: 'MS, Data Science',
        timeframe: 'Sep 2021 – Dec 2022',
        location: 'Medford, MA'
      },
      {
        institution: 'Purdue University',
        degree: 'B.Sc., Computer Graphics Technology',
        timeframe: 'Aug 2015 – May 2019',
        location: 'West Lafayette, IN'
      }
    ];

    const skillCategories = {
      'Architectures': 'Agentic Orchestration, Graph-based Workflows (LangGraph/LangChain), MCP Tool Declarations, RAG, Event-driven Pipelines, HITL Review, RCA/CAPA Automation, GxP Validation',
      'LLMOps': 'Prompt Versioning, Generation Tracing, Quality Metrics, LangFuse, ClickHouse',
      'Data and Knowledge': 'Semantic Knowledge Bases, Decision-logic Capture (Mermaid), Vector Indexing, Document Lineage, Text-to-SQL',
      'Cloud Platforms (AWS)': 'Managed LLM services (Bedrock, SageMaker AI), Guardrails, Containerization (Docker), Serverless/Workflow orchestration (ECS), Object Storage (S3), Data Lake Query Engines (Athena, Glue), Identity and Access (IAM)',
      'Programming': 'Python (NumPy, Pandas, scikit-learn, Pydantic, FastAPI, Matplotlib, boto3, strands-agents, Streamlit), SQL, React',
      'ML/Analytics': 'Data Modeling, Statistical Modeling, ML, Deep Learning, Graph Analytics, NLP, Computer Vision, Time-series Analysis'
    };

    const projects = [
      {
        title: 'Cotton Pest Classification — Few-Shot Prototypical Networks (PyTorch)',
        description: 'Proposed and implemented a few-shot prototypical network to identify cotton crop pests with limited annotated samples; trained on data from Li et al., Crop pest recognition in natural scenes using convolutional neural networks.',
        link: 'https://1drv.ms/b/s!AuN5d6BNlVtfg6tVg6HA8sfAXcIulg?e=krITgi'
      }
    ];

    const courses = [
      {
        title: 'Steve Hoberman\'s Live Online Data Modeling Master Class',
        institution: 'Technics Publications',
        date: 'Dec 2024'
      }
    ];

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
    
    const contactText = profile.contacts.join(' | ');
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

    // Skills Section (Categorized)
    currentY += 15;
    if (currentY > 250) {
      doc.addPage();
      currentY = 20;
    }
    
    doc.setFontSize(14);
    doc.setTextColor(...primaryColor);
    doc.text('Skills', margin, currentY);

    currentY += 8;
    for (const [category, skills] of Object.entries(skillCategories)) {
      currentY += 6;
      doc.setFontSize(10);
      doc.setTextColor(...primaryColor);
      doc.text(`${category}:`, margin, currentY);
      
      currentY += 4;
      doc.setTextColor(...textColor);
      doc.setFontSize(9);
      currentY = addWrappedText(skills, margin + 5, currentY, contentWidth - 10, 4);
      
      // Check for page break
      if (currentY > 270) {
        doc.addPage();
        currentY = 20;
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

export function downloadResumePDF() {
  const success = generateResumePDF({
    filename: 'Vibhor_Janey_Resume.pdf',
    format: 'a4',
    orientation: 'portrait'
  });
  
  if (!success) {
    // Fallback: try to open a pre-existing PDF or show an error
    console.error('Failed to generate PDF. Please try again.');
    
    // As a fallback, we could link to a pre-generated PDF
    // For now, we'll just show an alert
    alert('Unable to generate PDF at this time. Please contact me directly at vibhor.janey@gmail.com for a copy of my resume.');
  }
}