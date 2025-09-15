/**
 * Comprehensive End-to-End Tests
 * 
 * Tests all functionality fixes implemented:
 * - Resume parsing with all 4 experience entries
 * - Navigation working in development mode
 * - Content rendering correctly
 * - No 404 errors on homepage
 */

import { test, expect } from '@playwright/test';

test.describe('Comprehensive Website Validation', () => {
  
  test('Homepage loads without 404 error and displays correct content', async ({ page }) => {
    // Navigate to homepage - should not be 404
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    
    // Check hero section
    await expect(page.locator('h1')).toContainText('Vibhor Janey');
    await expect(page.locator('h1 + p')).toContainText('AI Solution Architect');
    
    // Check navigation links work
    await expect(page.locator('nav a[href*="experience"]')).toBeVisible();
    await expect(page.locator('nav a[href*="about"]')).toBeVisible();
    await expect(page.locator('nav a[href*="projects"]')).toBeVisible();
    
    // Check current role section exists (validates parsing)
    await expect(page.locator('text=Current Role')).toBeVisible();
    await expect(page.locator('text=Bristol Myers Squibb')).toBeVisible();
  });

  test('Experience page displays all 4 experience entries correctly', async ({ page }) => {
    await page.goto('/experience/');
    
    // Page loads successfully
    await expect(page.locator('h1')).toContainText('Experience');
    
    // Should NOT show "No experience entries found"
    await expect(page.locator('text=No experience entries found')).not.toBeVisible();
    
    // Validate all 4 positions are present
    const experienceEntries = page.locator('article');
    await expect(experienceEntries).toHaveCount(4);
    
    // Validate Bristol Myers Squibb positions (2 entries)
    await expect(page.locator('text=Bristol Myers Squibb').first()).toBeVisible();
    await expect(page.locator('text=Senior Manager, AI Solution Architect')).toBeVisible();
    await expect(page.locator('text=Manager, Data Architecture')).toBeVisible();
    
    // Validate other companies
    await expect(page.locator('text=Formulatrix')).toBeVisible();
    await expect(page.locator('text=Machine Learning Specialist')).toBeVisible();
    await expect(page.locator('text=Zebra Technologies')).toBeVisible();
    await expect(page.locator('text=Software Engineer')).toBeVisible();
    
    // Validate summaries are displaying (not just first bullet point)
    await expect(page.locator('text=Leading AI solution architecture')).toBeVisible();
    await expect(page.locator('text=Architected comprehensive data solutions')).toBeVisible();
    await expect(page.locator('text=Developed high-accuracy computer vision')).toBeVisible();
    await expect(page.locator('text=Led front-end development and UX design')).toBeVisible();
    
    // Validate timeframes
    await expect(page.locator('text=Jul 2025 – Present')).toBeVisible();
    await expect(page.locator('text=Jul 2023 – Jul 2025')).toBeVisible();
    await expect(page.locator('text=Jun 2022 – Aug 2022')).toBeVisible();
    await expect(page.locator('text=Oct 2019 – Jun 2021')).toBeVisible();
  });

  test('Navigation works correctly between all pages', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation to Experience
    await page.click('a[href*="experience"]');
    await page.waitForURL('**/experience/**');
    await expect(page.locator('h1')).toContainText('Experience');
    
    // Navigate back to home
    await page.click('text=Vibhor Janey');
    await page.waitForURL('/');
    await expect(page.locator('h1')).toContainText('Vibhor Janey');
    
    // Test navigation to About
    await page.click('a[href*="about"]');
    await page.waitForURL('**/about/**');
    await expect(page.locator('h1')).toContainText('About');
    
    // Test navigation to Projects
    await page.click('a[href*="projects"]');
    await page.waitForURL('**/projects/**');
    await expect(page.locator('h1')).toContainText('Projects');
  });

  test('All pages load without errors and have proper structure', async ({ page }) => {
    const pages = ['/', '/experience/', '/about/', '/projects/'];
    
    for (const path of pages) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      
      // Check basic structure exists
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
      
      // Check navigation (should include logo + 4 main nav links = 5 total)
      await expect(page.locator('nav a')).toHaveCount(5);
    }
  });

  test('Resume parsing works correctly in production build', async ({ page }) => {
    // This test validates that the parsing fixes work in the actual build
    await page.goto('/experience/');
    
    // Count experience articles
    const articles = await page.locator('article').count();
    expect(articles).toBe(4);
    
    // Verify parsing didn't break with "Summary:" entries
    const summaryText = await page.locator('article').first().textContent();
    expect(summaryText).toContain('Leading AI solution architecture');
    expect(summaryText).not.toContain('Summary: role at'); // Should not show fallback text
    
    // Verify company names are correct (not showing "Summary:" as company)
    const companyNames = await page.locator('h3.text-blue-600').allTextContents();
    expect(companyNames).toEqual([
      'Bristol Myers Squibb',
      'Bristol Myers Squibb', 
      'Formulatrix',
      'Zebra Technologies'
    ]);
  });

  test('Responsive design works on mobile viewports', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile viewport
    
    await page.goto('/');
    
    // Hero section should be visible and readable
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1 + p')).toContainText('AI Solution Architect');
    
    // Navigation should work on mobile
    await expect(page.locator('nav')).toBeVisible();
    
    // Experience page mobile test
    await page.goto('/experience/');
    const articles = page.locator('article');
    await expect(articles).toHaveCount(4);
    
    // Content should be readable on mobile
    await expect(page.locator('h2').first()).toBeVisible();
  });
  
});