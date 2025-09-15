import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';


export function About() {


  const technologies = [
    "Python", "LangGraph", "LangChain", "AWS Bedrock", "SageMaker", "Docker",
    "FastAPI", "Streamlit", "SQL", "React", "Kubernetes", "Terraform",
    "MLflow", "LangFuse", "ClickHouse", "SAP", "Oracle EBS", "Pydantic"
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate about leveraging artificial intelligence to create meaningful impact in manufacturing and healthcare. 
            I specialize in building production-ready AI solutions that meet strict regulatory requirements.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                My journey in AI began with a focus on computer graphics technology at Purdue University, 
                followed by advanced data science studies at Tufts University. This foundation led me to 
                specialize in building practical AI solutions for complex manufacturing and healthcare environments.
              </p>
              <p>
                Currently at Bristol Myers Squibb, I architect AI copilot experiences serving 5,000+ users 
                while implementing advanced LLM observability and agentic orchestration systems. My work spans 
                from semantic knowledge bases and automated CAPA generation to building unified data platforms 
                that reduce processing times by 40%+.
              </p>
              <p>
                I'm passionate about bridging the gap between cutting-edge AI research and production-ready 
                systems that meet strict regulatory requirements. My expertise includes implementing MCP tool 
                declarations, graph-based workflows, and GxP-compliant AI governance frameworks.
              </p>
            </div>

            {/* Technologies */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Technologies & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 bg-gradient-to-r from-slate-50 to-emerald-50 dark:from-slate-950/20 dark:to-emerald-950/20 border-2">
                <CardContent className="p-0">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-emerald-600">5,000+</div>
                      <div className="text-sm text-muted-foreground">Users Served</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-amber-600">40%+</div>
                      <div className="text-sm text-muted-foreground">Processing Time Reduction</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-600">7+</div>
                      <div className="text-sm text-muted-foreground">Manufacturing Integrations</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">6+</div>
                      <div className="text-sm text-muted-foreground">Years Experience</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}