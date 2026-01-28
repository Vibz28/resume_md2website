interface SkillsSectionProps {
  isStandalone?: boolean;
}

export function SkillsSection({ isStandalone = false }: SkillsSectionProps) {
  const skillCategories = [
    {
      category: "AI & Machine Learning",
      skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Computer Vision", "NLP", "MLOps"]
    },
    {
      category: "Data Engineering & Architecture", 
      skills: ["Apache Spark", "Databricks", "AWS", "Azure", "SQL", "NoSQL", "ETL Pipelines", "Data Lakes"]
    },
    {
      category: "Software Development",
      skills: ["JavaScript", "TypeScript", "React", "Node.js", "Next.js", "REST APIs", "GraphQL"]
    },
    {
      category: "Tools & Platforms",
      skills: ["Docker", "Kubernetes", "Git", "CI/CD", "Terraform", "Jupyter", "Power BI", "Tableau"]
    }
  ];

  return (
    <section id="skills" className="py-24" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {isStandalone ? (
          <div className="text-center mb-10">
            <div className="section-kicker text-muted-foreground mb-3">Toolbox</div>
            <h1 id="skills-heading" className="section-title text-3xl sm:text-4xl">
              Skills & Expertise
            </h1>
          </div>
        ) : (
          <div className="text-center mb-10">
            <div className="section-kicker text-muted-foreground mb-3">Toolbox</div>
            <h2 id="skills-heading" className="section-title text-3xl sm:text-4xl">
              Skills & Expertise
            </h2>
          </div>
        )}
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="card-surface rounded-3xl p-6 border-2 hover:border-primary/40 transition-transform duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-card-foreground mb-4">{category.category}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="pill bg-secondary text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
