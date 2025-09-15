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
    <section id="skills" className="py-16 bg-background" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {isStandalone ? (
          <h1 id="skills-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8 text-center">
            Skills & Expertise
          </h1>
        ) : (
          <h2 id="skills-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8 text-center">
            Skills & Expertise
          </h2>
        )}
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-card rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-semibold text-card-foreground mb-4">{category.category}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="inline-block bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 px-3 py-1 rounded-full text-sm font-medium"
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