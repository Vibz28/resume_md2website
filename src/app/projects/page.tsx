import { parseResumeMarkdown } from '@/lib/parseResumeMarkdown';
import type { Project } from '@/lib/models';

export const metadata = {
  title: 'Projects | Vibhor Janey',
  description: 'Explore key projects and technical achievements by Vibhor Janey.',
};

export default function ProjectsPage() {
  const { projects } = parseResumeMarkdown();

  // Add some additional projects for a more comprehensive display
  const additionalProjects: Project[] = [
    {
      title: 'AI Copilot for Manufacturing Operations',
      description: 'Architecting an agentic orchestration layer for 5,000+ manufacturing users with graph-based workflows, MCP tool declarations, and LLM observability.'
    },
    {
      title: 'Batch Genealogy Graph Data Product',
      description: 'Unified manufacturing data across SAP, Oracle EBS, and 7 CMOs, reducing data processing time by 40% and improving release decisions by 50%.'
    },
    {
      title: 'Computer Vision for Laboratory Automation',
      description: 'Built 98.59% accurate microplate classification model using TensorFlow and Classification-by-Retrieval, deployed on Raspberry Pi and Coral Edge TPU.'
    },
    {
      title: 'Financial Anomaly Detection System',
      description: 'Deployed hybrid anomaly detection combining boxplot methods with FBProphet for time-series analysis in financial operations monitoring.'
    }
  ];

  const allProjects = [...projects, ...additionalProjects];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Projects
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Key projects and technical achievements
          </p>
        </div>

        {allProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects available at this time.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {allProjects.map((project) => (
              <div
                key={project.title}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {project.title}
                </h2>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {project.link && (
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 border border-blue-200 text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      View Project
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
                
                {!project.link && (
                  <div className="text-sm text-gray-500 italic">
                    Project details available upon request
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills & Technologies */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Technologies & Methodologies
          </h2>
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI & ML</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>Agentic Orchestration</div>
                  <div>LLM Fine-tuning</div>
                  <div>Computer Vision</div>
                  <div>Graph Neural Networks</div>
                  <div>Time Series Analysis</div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Architecture</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>Graph Databases</div>
                  <div>Data Lake Design</div>
                  <div>Batch Genealogy Systems</div>
                  <div>ETL/ELT Pipelines</div>
                  <div>Metadata Cataloging</div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cloud & DevOps</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>AWS Services</div>
                  <div>Docker & Kubernetes</div>
                  <div>CI/CD Pipelines</div>
                  <div>Infrastructure as Code</div>
                  <div>Monitoring & Observability</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}