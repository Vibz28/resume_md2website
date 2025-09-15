import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Brain, Code, Database, Cloud, GitBranch, Zap } from 'lucide-react';

export function Skills() {
  const skillCategories = [
    {
      title: "AI & Architecture",
      icon: Brain,
      color: "from-teal-500 to-green-600",
      skills: [
        { name: "Agentic Orchestration", level: 95, frameworks: ["LangGraph", "LangChain", "MCP"] },
        { name: "LLM Observability", level: 90, frameworks: ["LangFuse", "ClickHouse", "Tracing"] },
        { name: "Semantic Knowledge Bases", level: 88, frameworks: ["Vector Indexing", "RAG", "Text-to-SQL"] },
        { name: "Computer Vision", level: 85, frameworks: ["TensorFlow", "OpenCV", "Classification-by-Retrieval"] },
        { name: "GxP Validation", level: 92, frameworks: ["FDA Guidelines", "Audit Trails", "RBAC"] }
      ]
    },
    {
      title: "Programming & Development",
      icon: Code,
      color: "from-green-500 to-emerald-600",
      skills: [
        { name: "Python", level: 98, frameworks: ["FastAPI", "Pydantic", "Streamlit"] },
        { name: "SQL", level: 90, frameworks: ["PostgreSQL", "Oracle", "BigQuery"] },
        { name: "React", level: 85, frameworks: ["JavaScript", "TypeScript", "Next.js"] },
        { name: "Data Modeling", level: 88, frameworks: ["Graph Analytics", "Mermaid", "ERD"] },
        { name: "APIs", level: 90, frameworks: ["REST", "FastAPI", "boto3"] }
      ]
    },
    {
      title: "Cloud & Infrastructure",
      icon: Cloud,
      color: "from-orange-500 to-amber-600",
      skills: [
        { name: "AWS", level: 92, frameworks: ["Bedrock", "SageMaker AI", "S3"] },
        { name: "Containerization", level: 88, frameworks: ["Docker", "ECS", "Kubernetes"] },
        { name: "Data Lake Technologies", level: 85, frameworks: ["Athena", "Glue", "S3"] },
        { name: "Infrastructure as Code", level: 80, frameworks: ["Terraform", "CloudFormation"] },
        { name: "Serverless", level: 82, frameworks: ["Lambda", "API Gateway", "Step Functions"] }
      ]
    },
    {
      title: "Data Architecture",
      icon: Database,
      color: "from-amber-500 to-orange-600",
      skills: [
        { name: "Graph Databases", level: 88, frameworks: ["Neo4j", "Amazon Neptune", "Batch Genealogy"] },
        { name: "Enterprise Systems", level: 90, frameworks: ["SAP", "Oracle EBS", "CMO Integration"] },
        { name: "Data Engineering", level: 85, frameworks: ["ETL/ELT", "Data Lineage", "Metadata"] },
        { name: "Manufacturing Data", level: 92, frameworks: ["Batch Records", "CoA/CoC", "SOPs"] },
        { name: "Statistical Modeling", level: 80, frameworks: ["R", "Python", "Time Series"] }
      ]
    },
    {
      title: "Manufacturing & Compliance",
      icon: GitBranch,
      color: "from-emerald-500 to-teal-600",
      skills: [
        { name: "Manufacturing Operations", level: 90, frameworks: ["Batch Release", "Quality Systems", "Deviation Management"] },
        { name: "RCA/CAPA Automation", level: 88, frameworks: ["Root Cause Analysis", "HITL Review", "Workflow"] },
        { name: "Document Processing", level: 85, frameworks: ["NLP", "OCR", "Document Lineage"] },
        { name: "Regulatory Compliance", level: 87, frameworks: ["GxP", "FDA", "Pharmaceutical"] },
        { name: "Process Optimization", level: 82, frameworks: ["Lean Six Sigma", "Process Mining"] }
      ]
    },
    {
      title: "Analytics & Visualization",
      icon: Zap,
      color: "from-purple-500 to-indigo-600",
      skills: [
        { name: "Machine Learning", level: 85, frameworks: ["scikit-learn", "PyTorch", "TensorFlow"] },
        { name: "Time Series Analysis", level: 80, frameworks: ["FBProphet", "ARIMA", "Anomaly Detection"] },
        { name: "Data Visualization", level: 82, frameworks: ["Matplotlib", "Plotly", "Tableau"] },
        { name: "Business Intelligence", level: 78, frameworks: ["Power BI", "Looker", "Dashboard Design"] },
        { name: "Edge Deployment", level: 75, frameworks: ["Raspberry Pi", "Coral TPU", "Edge Optimization"] }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive overview of my technical skills, tools, and frameworks across the AI and software development ecosystem
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="h-full p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                  <CardContent className="p-0 space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold">{category.title}</h3>
                    </div>

                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05), duration: 0.4 }}
                          viewport={{ once: true }}
                          className="space-y-2"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          </div>
                          
                          <Progress 
                            value={skill.level} 
                            className="h-2"
                          />
                          
                          <div className="flex flex-wrap gap-1 mt-2">
                            {skill.frameworks.map((framework) => (
                              <Badge 
                                key={framework} 
                                variant="outline" 
                                className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                              >
                                {framework}
                              </Badge>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-2">
            <CardContent className="p-0 text-center space-y-6">
              <h3 className="text-2xl font-bold">Professional Highlights</h3>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-teal-600">6+</div>
                  <div className="text-sm text-muted-foreground">Years of Experience</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-green-600">5,000+</div>
                  <div className="text-sm text-muted-foreground">Users Impacted</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-amber-600">40%+</div>
                  <div className="text-sm text-muted-foreground">Efficiency Improvement</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-orange-600">7+</div>
                  <div className="text-sm text-muted-foreground">System Integrations</div>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-muted-foreground max-w-4xl mx-auto">
                  Continuously learning and adapting to emerging technologies in AI and manufacturing operations. 
                  Strong advocate for responsible AI deployment in regulated environments and knowledge sharing across teams.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}