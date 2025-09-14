// T004: Contract test for Home page per contracts/home.md
// Test should verify: hero section, quick links to Experience/Projects/About, optional Resume link

import { test, expect } from '@playwright/test';

test.describe('Home Page Contract', () => {
  test('should display hero with name and headline', async ({ page }) => {
    await page.goto('/');
    
    // Verify hero section exists
    const hero = page.locator('main').first();
    await expect(hero).toBeVisible();
    
    // Should contain name (Vibhor Janey)
    await expect(page.locator('text=Vibhor Janey')).toBeVisible();
    
    // Should contain headline/title
    await expect(page.locator('text=AI Solution Architect')).toBeVisible();
  });

  test('should have navigation links to all main pages', async ({ page }) => {
    await page.goto('/');
    
    // Check for navigation links
    await expect(page.locator('a[href="/experience"], a[href*="experience"]')).toBeVisible();
    await expect(page.locator('a[href="/projects"], a[href*="projects"]')).toBeVisible(); 
    await expect(page.locator('a[href="/about"], a[href*="about"]')).toBeVisible();
  });

  test('should allow navigation to each main page in one click', async ({ page }) => {
    await page.goto('/');
    
    // Test Experience link
    await page.click('a[href="/experience"], a[href*="experience"]');
    await expect(page.url()).toContain('experience');
    
    // Go back and test Projects
    await page.goto('/');
    await page.click('a[href="/projects"], a[href*="projects"]');
    await expect(page.url()).toContain('projects');
    
    // Go back and test About
    await page.goto('/');
    await page.click('a[href="/about"], a[href*="about"]');
    await expect(page.url()).toContain('about');
  });

  test('should optionally display resume download link', async ({ page }) => {
    await page.goto('/');
    
    // Resume link is optional, but if present should be functional
    const resumeLink = page.locator('text=Resume', 'text=Download', 'text=CV').first();
    if (await resumeLink.isVisible()) {
      await expect(resumeLink).toHaveAttribute('href', /.*\.(pdf|doc|docx)$/i);
    }
  });
});