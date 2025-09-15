export interface Profile {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  contacts: Array<{
    label: string;
    url: string;
  }>;
}

export interface ExperienceEntry {
  employer: string;
  title: string;
  timeframe: string;
  location: string;
  summary: string;
  achievements: string[];
}

export interface Project {
  title: string;
  description: string;
  link?: string;
}

export interface Publication {
  title: string;
  authors?: string;
  venue?: string;
  year?: number;
  link?: string;
  category?: string;
}

export interface ParsedContent {
  profile: Profile;
  experience: ExperienceEntry[];
  projects: Project[];
  publications: Publication[];
}