import { parseResumeMarkdown } from '@/lib/parseResumeMarkdown';
import { ProjectsSection } from '@/components/ProjectsSection';

export const metadata = {
  title: 'Projects | Vibhor Janey',
  description: 'Explore key projects and technical achievements by Vibhor Janey.',
};

export default function ProjectsPage() {
  const { projects } = parseResumeMarkdown();
  
  return (
    <div className="bg-background text-foreground">
      <ProjectsSection projects={projects} />
    </div>
  );
}