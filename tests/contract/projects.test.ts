// T006: Contract test for Projects page per contracts/projects.md
// Manual validation checklist - run after implementation

/**
 * Projects Page Contract Validation
 * 
 * Navigate to /projects and verify:
 * 
 * ✓ Project cards are readable on mobile and desktop
 * ✓ Each card displays:
 *   - Title
 *   - Brief description (1-3 sentences) 
 *   - External link (when available) opens in new tab
 *   - No dead links when link is absent
 * ✓ At minimum includes "Cotton Pest Classification" project from resume
 * 
 * Expected projects from resume:
 * 1. Cotton Pest Classification — Few-Shot Prototypical Networks (PyTorch)
 *    - Link: https://1drv.ms/b/s!AuN5d6BNlVtfg6tVg6HA8sfAXcIulg?e=krITgi
 *    - Description should mention few-shot learning, cotton crop pests, limited samples
 */

export const projectsContractChecklist = {
  requiredProjects: [
    {
      title: "Cotton Pest Classification — Few-Shot Prototypical Networks (PyTorch)",
      hasDescription: true,
      hasExternalLink: true,
      linkUrl: "https://1drv.ms/b/s!AuN5d6BNlVtfg6tVg6HA8sfAXcIulg?e=krITgi",
      shouldMentionKeywords: ["few-shot", "cotton", "pest", "PyTorch"]
    }
  ],
  validationSteps: [
    "Verify card layout is responsive",
    "Check external links open in new tab (target='_blank')",
    "Ensure no broken link elements for projects without URLs",
    "Confirm descriptions are concise (1-3 sentences)"
  ]
};