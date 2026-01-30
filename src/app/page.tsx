import { HeroSimple } from '@/components/HeroSimple';
import { AboutSection } from '@/components/AboutSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ContactForm } from '@/components/ContactForm';
import { parseResumeMarkdown } from '@/lib/parseResumeMarkdown';

export default function Home() {
  const { profile, projects } = parseResumeMarkdown();

  return (
    <div className="min-h-screen bg-charcoal text-foreground">
      {/* Hero Section */}
      <HeroSimple />

      {/* About Section */}
      <AboutSection profile={profile} />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Projects Section */}
      <ProjectsSection projects={projects} />

      {/* Skills Section */}
      <SkillsSection />

      {/* Contact Section */}
      <ContactForm />
    </div>
  );
}
