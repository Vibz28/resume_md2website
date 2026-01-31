import { parseResumeMarkdown } from '@/lib/parseResumeMarkdown';
import { AboutSection } from '@/components/AboutSection';

export const metadata = {
  title: 'About | Vibhor Janey',
  description: 'Learn about Vibhor Janey\'s background, expertise, and professional journey in AI and data science.',
};

export default function AboutPage() {
  const { profile, education } = parseResumeMarkdown();

  return (
    <div className="bg-background text-foreground">
      <AboutSection profile={profile} education={education} isStandalone={true} />
    </div>
  );
}
