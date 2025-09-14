// T008: Integration test for navigation per spec user stories
// Manual validation checklist - run after implementation

/**
 * Navigation Integration Test
 * 
 * Verify consistent navigation and user flow across all pages:
 * 
 * ✓ Header navigation is consistent across all pages
 * ✓ Footer is consistent across all pages
 * ✓ All navigation links work bidirectionally:
 *   - Home → Experience/Projects/About
 *   - Experience/Projects/About → Home
 *   - Between Experience/Projects/About pages
 * ✓ Mobile responsive navigation (hamburger menu or similar)
 * ✓ Current page indication in navigation
 * ✓ Keyboard navigation works through all links
 * ✓ Focus states are visible
 * 
 * User Story Validation:
 * 1. "Given a visitor lands on Home, When they scan the hero and highlights, 
 *    Then they can navigate to Experience, Projects, or About in one click."
 * 2. "Given a visitor on any page, When they resize to mobile, 
 *    Then all sections are legible, accessible, and navigable with consistent header/footer."
 */

export const navigationContractChecklist = {
  pages: ["Home (/)", "Experience (/experience)", "Projects (/projects)", "About (/about)"],
  
  navigationTests: [
    {
      from: "Home",
      to: ["Experience", "Projects", "About"],
      maxClicks: 1
    },
    {
      from: "Experience", 
      to: ["Home", "Projects", "About"],
      maxClicks: 1
    },
    {
      from: "Projects",
      to: ["Home", "Experience", "About"], 
      maxClicks: 1
    },
    {
      from: "About",
      to: ["Home", "Experience", "Projects"],
      maxClicks: 1
    }
  ],

  responsiveTests: [
    "Header navigation works on mobile (≤768px)",
    "Footer remains functional on mobile", 
    "All text remains legible on mobile",
    "Touch targets are adequate (≥44px)"
  ],

  accessibilityTests: [
    "Tab through all navigation links",
    "Focus states are visible on all interactive elements",
    "Header uses proper semantic landmarks",
    "Main content area properly marked",
    "Footer uses proper semantic landmarks"
  ]
};