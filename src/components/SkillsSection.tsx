"use client";

import { motion } from 'framer-motion';
import { 
  Cpu, 
  Database, 
  Code2, 
  Cloud, 
  Brain, 
  GitBranch,
  Terminal,
  Server,
  Workflow
} from 'lucide-react';

interface SkillsSectionProps {
  isStandalone?: boolean;
}

export function SkillsSection({ isStandalone = false }: SkillsSectionProps) {
  const skillCategories = [
    {
      category: "AI & ML",
      icon: Brain,
      color: "text-primary",
      bgColor: "bg-primary/10",
      skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Computer Vision", "NLP", "LangGraph", "LangChain"]
    },
    {
      category: "Data & Architecture",
      icon: Database,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      skills: ["Graph Databases", "AWS", "Azure", "SQL", "NoSQL", "ETL Pipelines", "Data Lakes", "SAP"]
    },
    {
      category: "Development",
      icon: Code2,
      color: "text-accent",
      bgColor: "bg-accent/10",
      skills: ["JavaScript", "TypeScript", "React", "Node.js", "Next.js", "REST APIs", "FastAPI"]
    },
    {
      category: "Infrastructure",
      icon: Server,
      color: "text-primary",
      bgColor: "bg-primary/10",
      skills: ["Docker", "Kubernetes", "Git", "CI/CD", "Terraform", "AWS Bedrock", "MCP"]
    }
  ];

  const additionalSkills = [
    { name: "LLM Orchestration", icon: Workflow },
    { name: "Agentic Systems", icon: Brain },
    { name: "Vector DBs", icon: Database },
    { name: "Cloud Architecture", icon: Cloud },
    { name: "Edge Deployment", icon: Cpu },
    { name: "GitOps", icon: GitBranch },
    { name: "LLM Observability", icon: Terminal },
    { name: "RAG Systems", icon: Brain },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  };

  return (
    <section id="skills" className="py-24 bg-charcoal relative">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
            <span className="font-mono text-sm text-accent">04</span>
            <div className="h-px flex-1 bg-gradient-to-l from-accent/50 to-transparent" />
          </div>
          {isStandalone ? (
            <h1 className="text-4xl md:text-5xl font-bold text-center">Skills & Expertise</h1>
          ) : (
            <h2 className="text-4xl md:text-5xl font-bold text-center">Skills & Expertise</h2>
          )}
          <p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto">
            A comprehensive toolkit spanning AI/ML, data architecture, and production engineering
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 mb-16"
        >
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl ${category.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <h3 className="text-xl font-bold">{category.category}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: skillIndex * 0.05 }}
                      viewport={{ once: true }}
                      className="px-3 py-1.5 rounded-lg bg-muted text-sm font-medium border border-border/30 hover:border-primary/30 hover:text-primary transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Skills */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-lg font-semibold mb-6 text-muted-foreground">Additional Expertise</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {additionalSkills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/30 hover:border-secondary/50 hover:text-secondary transition-all cursor-default"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{skill.name}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="text-center p-6 rounded-2xl bg-card border border-border/30">
            <div className="text-4xl font-bold text-primary font-mono mb-2">6+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-card border border-border/30">
            <div className="text-4xl font-bold text-secondary font-mono mb-2">5K+</div>
            <div className="text-sm text-muted-foreground">Users Impacted</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-card border border-border/30">
            <div className="text-4xl font-bold text-accent font-mono mb-2">40%</div>
            <div className="text-sm text-muted-foreground">Efficiency Gain</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-card border border-border/30">
            <div className="text-4xl font-bold text-primary font-mono mb-2">98%</div>
            <div className="text-sm text-muted-foreground">CV Accuracy</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
