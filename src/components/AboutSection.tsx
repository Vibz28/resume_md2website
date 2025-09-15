import type { Profile } from '@/lib/models';

interface AboutSectionProps {
  profile: Profile;
  isStandalone?: boolean;
}

export function AboutSection({ profile, isStandalone = false }: AboutSectionProps) {
  
  return (
    <section id="about" className="py-16 bg-muted/30" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {isStandalone ? (
          <h1 id="about-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">About</h1>
        ) : (
          <h2 id="about-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">About</h2>
        )}
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Background</h3>
            <div className="prose prose-lg text-muted-foreground">
              {profile.bio.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Skills & Expertise</h3>
            <div 
              className="flex flex-wrap gap-2"
              role="list"
              aria-label="Technical skills and areas of expertise"
            >
              {profile.skills.map((skill, index) => (
                <span 
                  key={index}
                  role="listitem"
                  className="px-3 py-1 bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Contact Information</h3>
              <div className="space-y-2" role="list" aria-label="Contact methods">
                {profile.contacts.map((contact, index) => (
                  <a 
                    key={index}
                    href={contact.url}
                    target={contact.url.startsWith('mailto:') ? '_self' : '_blank'}
                    rel={contact.url.startsWith('mailto:') ? '' : 'noopener noreferrer'}
                    className="flex items-center text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-md px-2 py-1 transition-colors"
                    aria-label={`Contact via ${contact.label}${contact.url.startsWith('mailto:') ? '' : ' (opens in new tab)'}`}
                    role="listitem"
                  >
                    {contact.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}