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
  skills: string[];
  isStandalone?: boolean;
}

export function SkillsSection({ skills, isStandalone = false }: SkillsSectionProps) {
  // Define skill categories with their keywords
  const skillCategories = [
    {
      category: "AI & ML",
      icon: Brain,
      color: "text-primary",
      bgColor: "bg-primary/10",
      keywords: ['python', 'tensorflow', 'pytorch', 'scikit-learn', 'computer vision', 'nlp', 'langgraph', 'langchain', 'machine learning', 'deep learning', 'ml', 'ai']
    },
    {
      category: "Data & Architecture",
      icon: Database,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      keywords: ['graph', 'aws', 'azure', 'sql', 'nosql', 'etl', 'data lake', 'sap', 'database', 'data architecture', 'vector', 'knowledge base']
    },
    {
      category: "Development",
      icon: Code2,
      color: "text-accent",
      bgColor: "bg-accent/10",
      keywords: ['javascript', 'typescript', 'react', 'node.js', 'next.js', 'rest', 'fastapi', 'api', 'frontend']
    },
    {
      category: "Infrastructure",
      icon: Server,
      color: "text-primary",
      bgColor: "bg-primary/10",
      keywords: ['docker', 'kubernetes', 'git', 'ci/cd', 'terraform', 'bedrock', 'mcp', 'container', 'serverless', 'ecs']
    }
  ];

  // Categorize skills dynamically based on keywords
  const categorizedSkills = skillCategories.map(cat => ({
    ...cat,
    skills: skills.filter(skill => 
      cat.keywords.some(keyword => skill.toLowerCase().includes(keyword))
    )
  }));

  // Get uncategorized skills
  const categorizedSkillNames = categorizedSkills.flatMap(cat => cat.skills);
  const additionalSkills = skills.filter(skill => !categorizedSkillNames.includes(skill)).slice(0, 8);

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
    <section id="skills" className="py-24 bg-background relative">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-20" />
      
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
          {categorizedSkills.map((category, index) => {
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
                  {category.skills.length > 0 ? (
                    category.skills.map((skill, skillIndex) => (
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
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground italic">No skills in this category</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Skills */}
        {additionalSkills.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-lg font-semibold mb-6 text-muted-foreground">Additional Expertise</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {additionalSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/30 hover:border-secondary/50 hover:text-secondary transition-all cursor-default"
                >
                  <span className="text-sm font-medium">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
