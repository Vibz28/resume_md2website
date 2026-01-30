"use client";

import { motion } from 'framer-motion';
import { Building2, Calendar, MapPin, ArrowUpRight } from 'lucide-react';

export function ExperienceSection() {
  const experiences = [
    {
      title: "Senior Manager, AI Solution Architect",
      company: "Bristol Myers Squibb",
      location: "New Brunswick, NJ",
      duration: "Jul 2025 - Present",
      type: "Full-time",
      description: "Leading AI solution architecture for manufacturing operations, delivering copilot experiences to 5,000+ users while implementing advanced LLM observability and agentic orchestration systems.",
      achievements: [
        "Delivering an AI copilot and decision-support experience targeting 5,000+ manufacturing and quality users",
        "Architecting an agentic orchestration layer with graph-based workflow engine, containerized for elastic deployment",
        "Building pipelines to identify, document, and perform RCA on deviations, auto-generate CAPA drafts (HITL)",
        "Implementing LLM observability and tracing layer for generation traceability, prompt versioning, and end-to-end visibility testing"
      ],
      technologies: ["LangGraph", "LangChain", "AWS Bedrock", "Docker", "MCP", "LangFuse"],
      highlight: true
    },
    {
      title: "Manager, Data Architecture",
      company: "Bristol Myers Squibb",
      location: "New Brunswick, NJ", 
      duration: "Jul 2023 - Jul 2025",
      type: "Full-time",
      description: "Architected comprehensive data solutions for manufacturing operations, creating unified batch genealogy systems that reduced processing time by 40% and improved release decision efficiency by 50%.",
      achievements: [
        "Led information and data architecture for manufacturing, including a Batch Genealogy graph data product unifying SAP, Oracle EBS, and CMO sources",
        "Reduced data processing time by >40% through unified batch genealogy systems",
        "Integrated BGDP with SAP Batch Release Hub under the APMC program, improved release decision efficiency by >50%",
        "Launched a metadata cataloging initiative for the manufacturing data lake, aligning business and technical metadata across 7+ source integrations"
      ],
      technologies: ["SAP", "Oracle EBS", "AWS", "Graph Databases", "SQL", "Python"],
      highlight: false
    },
    {
      title: "Machine Learning Specialist",
      company: "Formulatrix",
      location: "Bedford, MA",
      duration: "Jun 2022 - Aug 2022",
      type: "Contract",
      description: "Developed high-accuracy computer vision solutions for laboratory automation, achieving 98.59% classification accuracy while optimizing models for edge deployment.",
      achievements: [
        "Built a computer vision model to classify microplates for the FAST Liquid Handler, achieving 98.59% accuracy",
        "Implemented in TensorFlow using Classification-by-Retrieval (CbR) methodology",
        "Created an API configuration for image capture and curated labeled datasets under varied conditions",
        "Tested inference on Raspberry Pi Zero & Coral Edge TPU for edge deployment optimization"
      ],
      technologies: ["TensorFlow", "Python", "OpenCV", "Raspberry Pi", "Edge TPU", "R"],
      highlight: false
    },
    {
      title: "Software Engineer", 
      company: "Zebra Technologies",
      location: "Kennesaw, GA",
      duration: "Oct 2019 - Jun 2021",
      type: "Full-time",
      description: "Led front-end development and UX design for new product launches while contributing to advanced analytics solutions including anomaly detection models.",
      achievements: [
        "Led the front-end design team for a new product launch; redesigned UX in Figma/Adobe XD and implemented with React",
        "Collaborated to deploy an anomaly detection model in Python combining a boxplot method with FBProphet",
        "Contributed to the inception and design of a new banking branch management product"
      ],
      technologies: ["React", "Python", "Figma", "Adobe XD", "FBProphet", "JavaScript"],
      highlight: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  return (
    <section id="experience" className="py-24 bg-muted/30 relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-secondary/50 to-transparent" />
            <span className="font-mono text-sm text-secondary">02</span>
            <div className="h-px flex-1 bg-gradient-to-l from-secondary/50 to-transparent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center">Experience</h2>
          <p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto">
            A journey through AI architecture, from research prototypes to production systems serving thousands
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative grid md:grid-cols-2 gap-8 ${index % 2 === 0 ? '' : 'md:text-right'}`}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 z-10 ${
                  exp.highlight 
                    ? 'bg-primary shadow-lg shadow-primary/50' 
                    : 'bg-muted border-2 border-border'
                }`}>
                  {exp.highlight && (
                    <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
                  )}
                </div>

                {/* Content Card */}
                <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:order-1 md:pr-12' : 'md:order-2 md:pl-12'}`}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className={`p-6 rounded-2xl border transition-all duration-300 ${
                      exp.highlight 
                        ? 'bg-card border-primary/30 shadow-lg shadow-primary/5' 
                        : 'bg-card/50 border-border/50 hover:border-border'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="px-2 py-1 rounded bg-muted text-xs font-mono text-muted-foreground">
                        {exp.duration}
                      </span>
                      {exp.highlight && (
                        <span className="px-2 py-1 rounded bg-primary/10 text-xs font-mono text-primary">
                          Current
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {exp.title}
                    </h3>
                    
                    <div className={`flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4 ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="space-y-2 mb-4">
                      {exp.achievements.slice(0, 3).map((achievement, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <ArrowUpRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{achievement}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className={`flex flex-wrap gap-2 ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                      {exp.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-2 py-1 rounded-lg bg-muted text-xs font-mono border border-border/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Spacer for timeline alignment */}
                <div className={`hidden md:block ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
