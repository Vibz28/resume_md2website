import { HeroSimple } from '@/components/HeroSimple';
import { AboutSection } from '@/components/AboutSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ContactForm } from '@/components/ContactForm';
import { parseResumeMarkdown } from '@/lib/parseResumeMarkdown';

export default function Home() {
  const resumeData = parseResumeMarkdown();
  const { profile, experience, projects, education } = resumeData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <HeroSimple profile={profile} resumeData={resumeData} />

      {/* About Section */}
      <AboutSection profile={profile} education={education} />

      {/* Experience Section */}
      <ExperienceSection experience={experience} />

      {/* Projects Section */}
      <ProjectsSection projects={projects} />

      {/* Skills Section */}
      <SkillsSection skillCategories={profile.skillCategories} />

      {/* Contact Section */}
      <ContactForm profile={profile} />
    </div>
  );
}
