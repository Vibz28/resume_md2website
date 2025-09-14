import { parseResumeMarkdown } from '@/lib/parseResumeMarkdown';

export default function ExperiencePage() {
  const { experience, profile } = parseResumeMarkdown();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Experience
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Professional experience and career highlights
          </p>
        </div>

        <div className="mt-16">
          <div className="space-y-12">
            {experience.map((exp, index) => (
              <article
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      {exp.title}
                    </h2>
                    <h3 className="text-xl font-medium text-blue-600 mb-1">
                      {exp.employer}
                    </h3>
                    {exp.location && (
                      <p className="text-sm text-gray-500">{exp.location}</p>
                    )}
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      {exp.timeframe}
                    </span>
                  </div>
                </div>

                {exp.summary && (
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                    {exp.summary}
                  </p>
                )}

                {exp.achievements && exp.achievements.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>

        {experience.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-500">No experience entries found.</p>
          </div>
        )}
      </div>
    </div>
  );
}