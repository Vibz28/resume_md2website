// T004: Contract test for Home page per contracts/home.md
// Test should verify: hero section, quick links to Experience/Projects/About, optional Resume link

import { test, expect } from '@playwright/test';

test.describe('Home Page Contract', () => {
  test('should display hero with name and headline', async ({ page }) => {
    await page.goto('/');
    
    // Verify hero section exists
    const hero = page.locator('main').first();
    await expect(hero).toBeVisible();
    
    // Should contain name (Vibhor Janey) - use main content heading to avoid nav conflict
    await expect(page.locator('main h1:has-text("Vibhor Janey")')).toBeVisible();
    
    // Should contain headline/title - use first occurrence to avoid strict mode
    await expect(page.getByText('AI Solution Architect').first()).toBeVisible();
  });

  test('should have navigation links to all main pages', async ({ page }) => {
    await page.goto('/');
    
    // Check for SPA navigation buttons and links to main pages
    await expect(page.locator('nav button:has-text("Experience"), nav a[href*="experience"]').first()).toBeVisible();
    await expect(page.locator('nav button:has-text("Projects"), nav a[href*="projects"]').first()).toBeVisible(); 
    await expect(page.locator('nav button:has-text("About"), nav a[href*="about"]').first()).toBeVisible();
  });

  test('should allow navigation to sections and pages in one click', async ({ page }) => {
    await page.goto('/');
    
    // Test SPA section navigation (on home page, use buttons)
    await page.click('nav button:has-text("Experience")');
    await expect(page.locator('#experience')).toBeInViewport();
    
    // Test SPA section navigation (projects) 
    await page.click('nav button:has-text("Projects")');
    await expect(page.locator('#projects')).toBeInViewport();
    
    // Test SPA section navigation (about)
    await page.click('nav button:has-text("About")');
    await expect(page.locator('#about')).toBeInViewport();
  });

  test('should optionally display resume download link', async ({ page }) => {
    await page.goto('/');
    
    // Resume link is optional, but if present should be functional
    const resumeLink = page.locator('text=Resume').or(page.locator('text=Download')).or(page.locator('text=CV')).first();
    if (await resumeLink.isVisible()) {
      await expect(resumeLink).toHaveAttribute('href', /.*\.(pdf|doc|docx)$/i);
    }
  });
});