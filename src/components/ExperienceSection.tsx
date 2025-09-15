"use client";
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Building2, Calendar, MapPin } from 'lucide-react';

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
      technologies: ["LangGraph", "LangChain", "AWS Bedrock", "Docker", "MCP", "LangFuse"]
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
      technologies: ["SAP", "Oracle EBS", "AWS", "Graph Databases", "SQL", "Python"]
    },
    {
      title: "Machine Learning Specialist",
      company: "Formulatrix",
      location: "Bedford, MA",
      duration: "Jun 2022 - Aug 2022",
      type: "Contract",
      description: "Developed high-accuracy computer vision solutions for laboratory automation, achieving 98.59% classification accuracy while optimizing models for edge deployment and conducting analytical insights.",
      achievements: [
        "Built a computer vision model to classify microplates for the FAST Liquid Handler, achieving 98.59% accuracy",
        "Implemented in TensorFlow using Classification-by-Retrieval (CbR) methodology",
        "Created an API configuration for image capture and curated labeled datasets under varied conditions",
        "Tested inference on Raspberry Pi Zero & Coral Edge TPU for edge deployment optimization"
      ],
      technologies: ["TensorFlow", "Python", "OpenCV", "Raspberry Pi", "Edge TPU", "R"]
    },
    {
      title: "Software Engineer", 
      company: "Zebra Technologies",
      location: "Kennesaw, GA",
      duration: "Oct 2019 - Jun 2021",
      type: "Full-time",
      description: "Led front-end development and UX design for new product launches while contributing to advanced analytics solutions including anomaly detection models and banking branch management systems.",
      achievements: [
        "Led the front-end design team for a new product launch; redesigned UX in Figma/Adobe XD and implemented with React",
        "Collaborated to deploy an anomaly detection model in Python combining a boxplot method with FBProphet",
        "Contributed to the inception and design of a new banking branch management product",
        "Improved user experience and interface design across multiple product lines"
      ],
      technologies: ["React", "Python", "Figma", "Adobe XD", "FBProphet", "JavaScript"]
    }
  ];

  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My journey through the AI industry, from research to production-scale implementations
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-0.5"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className={`relative grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-2 md:-translate-x-2 border-4 border-background z-10"></div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                    <CardContent className="p-0 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{exp.duration}</span>
                          <Badge variant="outline" className="ml-2">{exp.type}</Badge>
                        </div>
                        
                        <h3 className="text-xl font-bold text-primary">{exp.title}</h3>
                        
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Building2 className="h-4 w-4" />
                          <span>{exp.company}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground">{exp.description}</p>

                      <div className="space-y-2">
                        <h4 className="font-semibold">Key Achievements:</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold">Technologies:</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Spacer for timeline alignment */}
                <div className={`hidden md:block ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}