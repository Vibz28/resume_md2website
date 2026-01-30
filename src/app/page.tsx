import { HeroSimple } from '@/components/HeroSimple';
import { AboutSection } from '@/components/AboutSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ContactForm } from '@/components/ContactForm';
import { parseResumeMarkdown } from '@/lib/parseResumeMarkdown';

export default function Home() {
  const { profile, experience, projects } = parseResumeMarkdown();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <HeroSimple profile={profile} />

      {/* About Section */}
      <AboutSection profile={profile} />

      {/* Experience Section */}
      <ExperienceSection experience={experience} />

      {/* Projects Section */}
      <ProjectsSection projects={projects} />

      {/* Skills Section */}
      <SkillsSection skills={profile.skills} />

      {/* Contact Section */}
      <ContactForm />
    </div>
  );
}
