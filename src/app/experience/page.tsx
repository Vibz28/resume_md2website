import { parseResumeMarkdown } from '@/lib/parseResumeMarkdown';
import { ExperienceSection } from '@/components/ExperienceSection';

export const metadata = {
  title: 'Experience | Vibhor Janey',
  description: 'View Vibhor Janey\'s professional experience in AI architecture and data engineering.',
};

export default function ExperiencePage() {
  const { experience } = parseResumeMarkdown();
  
  return (
    <div className="bg-background text-foreground">
      <ExperienceSection experience={experience} />
    </div>
  );
}