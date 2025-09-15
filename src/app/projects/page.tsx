import { ProjectsSection } from '@/components/ProjectsSection';

export const metadata = {
  title: 'Projects | Vibhor Janey',
  description: 'Explore key projects and technical achievements by Vibhor Janey.',
};

export default function ProjectsPage() {
  return (
    <div className="bg-background text-foreground">
      <ProjectsSection />
    </div>
  );
}