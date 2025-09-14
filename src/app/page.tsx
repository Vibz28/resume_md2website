import { parseResumeMarkdown } from '@/lib/parseResumeMarkdown';

export default function Home() {
  const { profile, experience, projects } = parseResumeMarkdown();
  const latestExperience = experience.length > 0 ? experience[0] : null;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              {profile.name}
            </h1>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              {profile.title}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/experience"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                View Experience
              </a>
              <a
                href="/about"
                className="text-sm font-semibold leading-6 text-white hover:text-blue-100"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Current Role Section */}
      {latestExperience && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Current Role
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Latest professional experience and achievements
              </p>
            </div>
            
            <div className="mx-auto max-w-3xl">
              <article className="bg-white rounded-lg shadow-md overflow-hidden p-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {latestExperience.title}
                    </h3>
                    <p className="text-xl text-blue-600 mt-1">
                      {latestExperience.employer}
                    </p>
                    {latestExperience.location && (
                      <p className="text-sm text-gray-500 mt-1">{latestExperience.location}</p>
                    )}
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {latestExperience.timeframe}
                  </span>
                </div>
                
                {latestExperience.summary && (
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                    {latestExperience.summary}
                  </p>
                )}
                
                <div className="mt-6">
                  <a
                    href="/experience"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View full experience
                    <span className="ml-1" aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>
      )}

      {/* Quick Links Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="rounded-lg bg-blue-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience</h3>
                <p className="text-gray-600 mb-4">
                  Explore my {experience.length} professional roles covering AI, data science, and engineering leadership.
                </p>
                <a
                  href="/experience"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  View experience →
                </a>
              </div>
            </div>
            
            <div className="text-center">
              <div className="rounded-lg bg-green-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
                <p className="text-gray-600 mb-4">
                  Learn about my background, expertise, and professional journey.
                </p>
                <a
                  href="/about"
                  className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
                >
                  Read more →
                </a>
              </div>
            </div>
            
            <div className="text-center">
              <div className="rounded-lg bg-purple-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Projects</h3>
                <p className="text-gray-600 mb-4">
                  Discover key projects and technical achievements.
                </p>
                <a
                  href="/projects"
                  className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
                >
                  View projects →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}