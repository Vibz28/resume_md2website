import { parseResumeMarkdown } from '@/lib/parseResumeMarkdown';

export const metadata = {
  title: 'About | Vibhor Janey',
  description: 'Learn about Vibhor Janey\'s background, expertise, and professional journey in AI and data science.',
};

export default function AboutPage() {
  const { profile } = parseResumeMarkdown();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            About {profile.name}
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            {profile.title}
          </p>
        </div>

        {/* Bio Section */}
        <section className="mb-16">
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {profile.bio}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        {profile.skills && profile.skills.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Key Skills & Expertise</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {profile.skills.map((skill) => (
                <div
                  key={skill}
                  className="bg-gray-50 rounded-lg px-4 py-3 text-center text-sm font-medium text-gray-700 border border-gray-200"
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Section */}
        {profile.contacts && profile.contacts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Get In Touch</h2>
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {profile.contacts.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.url}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    target={contact.url.startsWith('mailto:') ? undefined : '_blank'}
                    rel={contact.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  >
                    {contact.label}
                    {contact.url.startsWith('mailto:') ? (
                      <svg className="ml-2 -mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ) : (
                      <svg className="ml-2 -mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Background Highlights */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Professional Highlights</h2>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Role</h3>
                <p className="text-gray-700">
                  Senior Manager, AI Solution Architect at Bristol Myers Squibb, leading AI copilot development 
                  for 5,000+ manufacturing users and building advanced agentic orchestration systems.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
                <p className="text-gray-700">
                  MS in Data Science from Tufts University and B.Sc. in Computer Graphics Technology 
                  from Purdue University.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Specialization</h3>
                <p className="text-gray-700">
                  AI solution architecture, manufacturing data systems, graph-based workflows, 
                  and LLM orchestration for enterprise applications.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Impact</h3>
                <p className="text-gray-700">
                  Delivered solutions reducing data processing time by 40%+ and improving 
                  manufacturing release decision efficiency by 50%+.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}