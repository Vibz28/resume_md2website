"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Play, ArrowUpRight, Sparkles, Zap, Database, Eye } from 'lucide-react';
import { Project } from '@/lib/models';

interface ProjectsSectionProps {
  projects?: Project[];
}

interface EnhancedProject {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  status: "Research" | "Production" | "Beta";
  metrics: string[];
  links: {
    github?: string;
    demo?: string;
    paper?: string;
  };
}

export function ProjectsSection({ projects: markdownProjects }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const enhancedProjects: EnhancedProject[] = [
    ...(markdownProjects && markdownProjects.length > 0 ? markdownProjects.map(proj => ({
      title: proj.title.replace(/\([^)]*\)$/, '').trim(),
      description: proj.description,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMHZpc3VhbGl6YXRpb258ZW58MXx8fHwxNzU3ODI2OTc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["PyTorch", "Few-Shot Learning", "Prototypical Networks", "Computer Vision", "Python"],
      category: "Agricultural AI",
      status: "Research" as const,
      metrics: ["Few-shot learning", "Agricultural application", "Published research"],
      links: {
        paper: proj.link
      }
    })) : []),
    {
      title: "AI Copilot for Manufacturing",
      description: "Leading the development of an AI copilot experience targeting 5,000+ manufacturing and quality users at Bristol Myers Squibb. Features agentic orchestration and graph-based workflow engines.",
      image: "https://images.unsplash.com/photo-1717501219263-9aa2d6a768d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBuZXVyYWwlMjBuZXR3b3JrfGVufDF8fHx8MTc1Nzg3NDcyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["LangGraph", "LangChain", "AWS Bedrock", "Docker", "MCP", "Graph Workflows"],
      category: "Manufacturing AI",
      status: "Production" as const,
      metrics: ["5,000+ users", "Agentic orchestration", "GxP compliance"],
      links: {}
    },
    {
      title: "Batch Genealogy Data Product",
      description: "Architected a unified batch genealogy system integrating SAP, Oracle EBS, and CMO sources. Reduced data processing time by 40%+ and improved release decision efficiency by 50%.",
      image: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTc3OTYzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["SAP", "Oracle EBS", "Graph Databases", "AWS", "Python", "SQL"],
      category: "Data Architecture",
      status: "Production" as const,
      metrics: ["40%+ time reduction", "50% efficiency improvement", "7+ integrations"],
      links: {}
    },
    {
      title: "Microplate Classification System",
      description: "Built a computer vision model to classify microplates for the FAST Liquid Handler at Formulatrix, achieving 98.59% accuracy using Classification-by-Retrieval methodology.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMHZpc3VhbGl6YXRpb258ZW58MXx8fHwxNzU3ODI2OTc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["TensorFlow", "Computer Vision", "OpenCV", "Raspberry Pi", "Edge TPU", "Python"],
      category: "Laboratory Automation",
      status: "Production" as const,
      metrics: ["98.59% accuracy", "Edge deployment", "Lab automation"],
      links: {}
    },
    {
      title: "Anomaly Detection Engine",
      description: "Collaborated to deploy an anomaly detection model combining boxplot methodology with FBProphet for time series forecasting and outlier identification.",
      image: "https://images.unsplash.com/photo-1717501219263-9aa2d6a768d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBuZXVyYWwlMjBuZXR3b3JrfGVufDF8fHx8MTc1Nzg3NDcyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["Python", "FBProphet", "Statistical Analysis", "Time Series", "Anomaly Detection"],
      category: "Predictive Analytics",
      status: "Production" as const,
      metrics: ["Time series forecasting", "Statistical analysis", "Production deployment"],
      links: {}
    }
  ];

  const categories = ["All", "Manufacturing AI", "Data Architecture", "Laboratory Automation", "Predictive Analytics", "Agricultural AI"];

  const filteredProjects = selectedCategory === "All" 
    ? enhancedProjects 
    : enhancedProjects.filter((project) => project.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Production": return "bg-primary/20 text-primary border-primary/30";
      case "Beta": return "bg-secondary/20 text-secondary border-secondary/30";
      case "Research": return "bg-accent/20 text-accent border-accent/30";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Manufacturing AI": return <Zap className="w-4 h-4" />;
      case "Data Architecture": return <Database className="w-4 h-4" />;
      case "Laboratory Automation": return <Eye className="w-4 h-4" />;
      case "Predictive Analytics": return <Sparkles className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <section id="projects" className="py-24 bg-muted/30 relative">
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
            <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
            <span className="font-mono text-sm text-primary">03</span>
            <div className="h-px flex-1 bg-gradient-to-l from-primary/50 to-transparent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center">Featured Projects</h2>
          <p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto">
            From research prototypes to production systems serving thousands
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="h-full bg-card rounded-2xl border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted/80 backdrop-blur-sm border border-border/30 flex items-center gap-1">
                        {getCategoryIcon(project.category)}
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Metrics */}
                    <div className="flex flex-wrap gap-2">
                      {project.metrics.slice(0, 2).map((metric) => (
                        <span 
                          key={metric} 
                          className="inline-flex items-center gap-1 px-2 py-1 rounded bg-muted text-xs font-mono"
                        >
                          <ArrowUpRight className="w-3 h-3 text-primary" />
                          {metric}
                        </span>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-1 rounded-md bg-muted/50 text-xs border border-border/30"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 rounded-md bg-muted/50 text-xs border border-border/30">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-2 pt-2">
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-sm transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </a>
                      )}
                      {project.links.paper && (
                        <a
                          href={project.links.paper}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Paper
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
