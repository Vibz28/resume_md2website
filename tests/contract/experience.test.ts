// T005: Contract test for Experience page per contracts/experience.md  
// Manual validation checklist - run after implementation

/**
 * Experience Page Contract Validation
 * 
 * Navigate to /experience and verify:
 * 
 * ✓ Roles are in reverse-chronological order (most recent first)
 * ✓ Each role displays:
 *   - Employer name 
 *   - Job title
 *   - Timeframe (human readable, e.g., "Jul 2025 – Present")
 *   - Location
 *   - Summary (1-3 sentences)
 *   - 3 achievements by default (2 on mobile)
 * ✓ Expand/collapse control shows up to 6 achievements total
 * ✓ All roles match resume content exactly
 * 
 * Expected roles in order:
 * 1. Bristol Myers Squibb — Senior Manager, AI Solution Architect (Jul 2025 – Present, New Brunswick, NJ)
 * 2. Bristol Myers Squibb — Manager, Data Architecture (Jul 2023 – Jul 2025, New Brunswick, NJ)  
 * 3. Formulatrix — Machine Learning Specialist (Jun 2022 – Aug 2022, Bedford, MA)
 * 4. Zebra Technologies — Software Engineer (Oct 2019 – Jun 2021, Kennesaw, GA)
 */

export const experienceContractChecklist = {
  roles: [
    {
      employer: "Bristol Myers Squibb",
      title: "Senior Manager, AI Solution Architect",
      timeframe: "Jul 2025 – Present", 
      location: "New Brunswick, NJ",
      minAchievements: 3
    },
    {
      employer: "Bristol Myers Squibb",
      title: "Manager, Data Architecture", 
      timeframe: "Jul 2023 – Jul 2025",
      location: "New Brunswick, NJ", 
      minAchievements: 3
    },
    {
      employer: "Formulatrix",
      title: "Machine Learning Specialist",
      timeframe: "Jun 2022 – Aug 2022",
      location: "Bedford, MA",
      minAchievements: 3
    },
    {
      employer: "Zebra Technologies", 
      title: "Software Engineer",
      timeframe: "Oct 2019 – Jun 2021",
      location: "Kennesaw, GA",
      minAchievements: 3
    }
  ]
};