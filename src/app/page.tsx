import { HeroSimple } from '@/components/HeroSimple';
import { AboutSection } from '@/components/AboutSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { PublicationsSection } from '@/components/PublicationsSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ContactForm } from '@/components/ContactForm';
import { parseResumeMarkdown } from '@/lib/parseResumeMarkdown';

export default function Home() {
  const { profile, experience, projects, publications } = parseResumeMarkdown();

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <HeroSimple />

      {/* Current Role Section */}
      {experience.length > 0 && (
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="section-kicker text-muted-foreground mb-3">Now</div>
              <h2 className="section-title text-3xl sm:text-4xl">
                Current Role
              </h2>
              <div className="mt-6 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-primary">
                  {experience[0].title}
                </h3>
                <p className="text-lg text-muted-foreground mt-2">
                  {experience[0].employer} • {experience[0].timeframe}
                </p>
                {experience[0].summary && (
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {experience[0].summary}
                  </p>
                )}
                <div className="mt-6">
                  <a
                    href="#experience"
                    className="inline-flex items-center px-5 py-2 text-sm font-medium rounded-full btn-spark text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
                  >
                    View Full Experience
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SPA Sections */}
      <AboutSection profile={profile} />
      <ExperienceSection />
      <ProjectsSection projects={projects} />
      <SkillsSection />
      {publications.length > 0 && <PublicationsSection publications={publications} />}
      <ContactForm />
    </div>
  );
}
