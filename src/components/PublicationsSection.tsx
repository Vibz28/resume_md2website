"use client";
import { useState, useMemo } from 'react';

type PublicationSortBy = 'newest' | 'oldest' | 'alphabetical';

import type { Publication } from '@/lib/models';

type PublicationsSectionProps = {
  publications: Publication[];
};

export function PublicationsSection({ publications }: PublicationsSectionProps) {
  const [sortBy, setSortBy] = useState<PublicationSortBy>('newest');

  const sortedPublications = useMemo(() => {
    if (!publications?.length) return [];

    const sorted = [...publications];
    
    switch (sortBy) {
      case 'newest':
        // Sort by year in descending order (newest first)
        return sorted.sort((a, b) => {
          const yearA = getPublicationYear(a);
          const yearB = getPublicationYear(b);
          return yearB - yearA;
        });
      case 'oldest':
        // Sort by year in ascending order (oldest first)
        return sorted.sort((a, b) => {
          const yearA = getPublicationYear(a);
          const yearB = getPublicationYear(b);
          return yearA - yearB;
        });
      case 'alphabetical':
        // Sort by title alphabetically
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sorted;
    }
  }, [publications, sortBy]);

  // Helper function to extract year from publication
  function getPublicationYear(publication: Publication): number {
    // Use the year field if available, otherwise try to extract from venue or title
    if (publication.year) return publication.year;
    
    const yearFromVenue = extractYear(publication.venue);
    if (yearFromVenue) return yearFromVenue;
    
    const yearFromTitle = extractYear(publication.title);
    return yearFromTitle || 0;
  }

  // Helper function to extract year from text
  function extractYear(text: string | undefined): number | null {
    if (!text) return null;
    const yearMatch = text.match(/\b(19|20)\d{2}\b/);
    return yearMatch ? parseInt(yearMatch[0]) : null;
  }

  return (
    <section id="publications" className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center mb-12">
          Publications & Research
        </h2>

        {/* Sort Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <label htmlFor="publication-sort" className="sr-only">
            Sort publications by
          </label>
          <select
            id="publication-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as PublicationSortBy)}
            className="px-4 py-2 border border-input rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>

        {/* Publications List */}
        {sortedPublications.length > 0 ? (
          <div className="space-y-6">
            {sortedPublications.map((publication, index) => (
              <article key={index} className="publication-item bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-card-foreground mb-3 leading-tight">
                  {publication.title}
                </h3>
                
                {publication.authors && (
                  <p className="text-foreground mb-2 font-medium">
                    {publication.authors}
                  </p>
                )}
                
                {publication.venue && (
                  <p className="text-muted-foreground mb-4 italic">
                    {publication.venue}
                  </p>
                )}
                
                {publication.link && (
                  <a 
                    href={publication.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                  >
                    Read Publication
                    <span className="ml-1" aria-hidden="true">→</span>
                  </a>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No publications available.</p>
          </div>
        )}
      </div>
    </section>
  );
}
