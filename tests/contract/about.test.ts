// T007: Contract test for About page per contracts/about.md
// Manual validation checklist - run after implementation

/**
 * About Page Contract Validation
 * 
 * Navigate to /about and verify:
 * 
 * ✓ Bio/summary section present
 * ✓ Skills grouped by category (as per resume)
 * ✓ Location displayed  
 * ✓ Contact links functional:
 *   - Email uses mailto: protocol
 *   - LinkedIn opens in new tab
 * ✓ Education section appears below Skills
 * ✓ Courses section appears below Skills  
 * ✓ Downloadable Resume (PDF) link present and functional
 * 
 * Expected content from resume:
 * - Location: East Brunswick, NJ
 * - Email: vibhor.janey@gmail.com
 * - LinkedIn: linkedin.com/in/vibhorjaney
 * - Education: Tufts University (MS, Data Science), Purdue University (B.Sc., Computer Graphics Technology)
 * - Courses: Steve Hoberman's Live Online Data Modeling Master Class
 * - Skills categories: Architectures, LLMOps, Data and Knowledge, Cloud Platforms (AWS), Programming, ML/Analytics
 */

export const aboutContractChecklist = {
  requiredSections: [
    "Bio/Summary",
    "Skills (by category)", 
    "Location",
    "Contact (Email + LinkedIn)",
    "Education", 
    "Courses",
    "Resume Download"
  ],
  contactValidation: {
    email: "vibhor.janey@gmail.com",
    emailProtocol: "mailto:",
    linkedin: "linkedin.com/in/vibhorjaney",
    linkedinTarget: "_blank"
  },
  educationItems: [
    "Tufts University — MS, Data Science",
    "Purdue University — B.Sc., Computer Graphics Technology"
  ],
  courseItems: [
    "Steve Hoberman's Live Online Data Modeling Master Class"
  ],
  skillsCategories: [
    "Architectures",
    "LLMOps", 
    "Data and Knowledge",
    "Cloud Platforms (AWS)",
    "Programming",
    "ML/Analytics"
  ],
  location: "East Brunswick, NJ"
};