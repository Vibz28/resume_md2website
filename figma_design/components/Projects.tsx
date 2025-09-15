import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Github, Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Projects() {
  const projects = [
    {
      title: "Cotton Pest Classification — Few-Shot Prototypical Networks",
      description: "Proposed and implemented a few-shot prototypical network to identify cotton crop pests with limited annotated samples. Trained on data from Li et al., 'Crop pest recognition in natural scenes using convolutional neural networks'.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMHZpc3VhbGl6YXRpb258ZW58MXx8fHwxNzU3ODI2OTc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["PyTorch", "Few-Shot Learning", "Prototypical Networks", "Computer Vision", "Python"],
      category: "Agricultural AI",
      status: "Research",
      metrics: ["Few-shot learning", "Agricultural application", "Published research"],
      links: {
        github: "#",
        paper: "https://1drv.ms/b/s!AuN5d6BNlVtfg6tVg6HA8sfAXcIulg?e=krITgi"
      }
    },
    {
      title: "AI Copilot for Manufacturing Operations",
      description: "Leading the development of an AI copilot experience targeting 5,000+ manufacturing and quality users at Bristol Myers Squibb. Features agentic orchestration and graph-based workflow engines.",
      image: "https://images.unsplash.com/photo-1717501219263-9aa2d6a768d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBuZXVyYWwlMjBuZXR3b3JrfGVufDF8fHx8MTc1Nzg3NDcyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["LangGraph", "LangChain", "AWS Bedrock", "Docker", "MCP Tool Declarations", "Graph Workflows"],
      category: "Manufacturing AI",
      status: "Production",
      metrics: ["5,000+ users", "Agentic orchestration", "GxP compliance"],
      links: {
        demo: "#"
      }
    },
    {
      title: "Batch Genealogy Data Product (BGDP)",
      description: "Architected a unified batch genealogy system integrating SAP, Oracle EBS, and CMO sources. Reduced data processing time by 40%+ and improved release decision efficiency by 50%.",
      image: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTc3OTYzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["SAP", "Oracle EBS", "Graph Databases", "AWS", "Python", "SQL"],
      category: "Data Architecture",
      status: "Production",
      metrics: ["40%+ time reduction", "50% efficiency improvement", "7+ integrations"],
      links: {
        demo: "#"
      }
    },
    {
      title: "Microplate Classification System",
      description: "Built a computer vision model to classify microplates for the FAST Liquid Handler at Formulatrix, achieving 98.59% accuracy across datasets using Classification-by-Retrieval methodology.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMHZpc3VhbGl6YXRpb258ZW58MXx8fHwxNzU3ODI2OTc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["TensorFlow", "Computer Vision", "OpenCV", "Raspberry Pi", "Edge TPU", "Python"],
      category: "Laboratory Automation",
      status: "Production",
      metrics: ["98.59% accuracy", "Edge deployment", "Laboratory automation"],
      links: {
        demo: "#"
      }
    },
    {
      title: "Banking Branch Management System",
      description: "Contributed to the inception and design of a new banking branch management product at Zebra Technologies, focusing on UX design and front-end implementation.",
      image: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTc3OTYzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["React", "Figma", "Adobe XD", "JavaScript", "UX Design", "Front-end"],
      category: "Financial Technology",
      status: "Production",
      metrics: ["New product launch", "UX redesign", "React implementation"],
      links: {
        demo: "#"
      }
    },
    {
      title: "Anomaly Detection Model",
      description: "Collaborated to deploy an anomaly detection model combining boxplot methodology with FBProphet for time series forecasting and outlier identification.",
      image: "https://images.unsplash.com/photo-1717501219263-9aa2d6a768d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBuZXVyYWwlMjBuZXR3b3JrfGVufDF8fHx8MTc1Nzg3NDcyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["Python", "FBProphet", "Statistical Analysis", "Time Series", "Anomaly Detection"],
      category: "Predictive Analytics",
      status: "Production",
      metrics: ["Time series forecasting", "Statistical analysis", "Production deployment"],
      links: {
        demo: "#"
      }
    }
  ];

  const categories = ["All", "Agricultural AI", "Manufacturing AI", "Data Architecture", "Laboratory Automation", "Financial Technology", "Predictive Analytics"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of AI solutions I've built, from research prototypes to production systems
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-200"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                      {project.category}
                    </Badge>
                    <Badge 
                      variant={project.status === "Production" ? "default" : project.status === "Beta" ? "secondary" : "outline"}
                      className="bg-background/80 backdrop-blur-sm"
                    >
                      {project.status}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Key Metrics:</h4>
                        <div className="flex flex-wrap gap-1">
                          {project.metrics.map((metric) => (
                            <Badge key={metric} variant="outline" className="text-xs">
                              {metric}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                              +{project.technologies.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      {project.links.github && (
                        <Button size="sm" variant="outline" className="flex-1">
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </Button>
                      )}
                      {project.links.demo && (
                        <Button size="sm" variant="outline" className="flex-1">
                          <Play className="mr-2 h-4 w-4" />
                          Demo
                        </Button>
                      )}
                      {project.links.live && (
                        <Button size="sm" variant="default" className="flex-1">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

