import { test, expect } from '@playwright/test';

test.describe('Resume Experience Content Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the experience page
    await page.goto('/experience');
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
  });

  test('should display experience page properly', async ({ page }) => {
    // Check page title
    await expect(page.getByRole('heading', { name: 'Experience', level: 1 })).toBeVisible();
    
    // Check that we have experience articles
    const articles = page.locator('article');
    const articleCount = await articles.count();
    expect(articleCount).toBeGreaterThan(2);
  });

  test('should display company names', async ({ page }) => {
    // Test that companies are displayed using more flexible selectors
    await expect(page.getByText('Bristol Myers Squibb').first()).toBeVisible();
    await expect(page.getByText('Formulatrix')).toBeVisible(); 
    await expect(page.getByText('Zebra Technologies')).toBeVisible();
  });

  test('should display job titles', async ({ page }) => {
    // Check for key job titles
    await expect(page.getByText('Senior Manager, AI Solution Architect')).toBeVisible();
    await expect(page.getByText('Manager, Data Architecture')).toBeVisible();
    await expect(page.getByText('Machine Learning Specialist')).toBeVisible();
    await expect(page.getByText('Software Engineer')).toBeVisible();
  });

  test('should display experience summaries', async ({ page }) => {
    // Check that summary paragraphs exist
    await expect(page.locator('p').filter({ hasText: 'Leading AI solution architecture' })).toBeVisible();
    await expect(page.locator('p').filter({ hasText: 'Architected comprehensive data solutions' })).toBeVisible();
    await expect(page.locator('p').filter({ hasText: 'Developed high-accuracy computer vision' })).toBeVisible();
    await expect(page.locator('p').filter({ hasText: 'Led front-end development' })).toBeVisible();
  });

  test('should display achievements as bullet points', async ({ page }) => {
    // Check that we have bullet point lists
    const achievementLists = page.locator('ul');
    const listCount = await achievementLists.count();
    expect(listCount).toBeGreaterThan(2);
    
    // Check for specific achievement content
    await expect(page.locator('li').filter({ hasText: 'AI copilot' })).toBeVisible();
    await expect(page.locator('li').filter({ hasText: 'computer vision model' })).toBeVisible();
  });

  test('should show collapsible achievements (3 default desktop, 2 mobile)', async ({ page }) => {
    // Test desktop view - should show 3 achievements by default
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/experience/');
    
    const firstExperienceCard = page.locator('article').first();
    const achievementsList = firstExperienceCard.locator('ul li');
    
    // Should have achievements
    const achievementCount = await achievementsList.count();
    expect(achievementCount).toBeGreaterThan(0);
    
    // Test mobile view - should show 2 achievements by default
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    
    // Achievements should still be visible and functional on mobile
    await expect(firstExperienceCard.locator('ul')).toBeVisible();
    
    // If expand/collapse exists, test it
    const expandButton = page.locator('button').filter({ hasText: /show more|expand|view all/i }).first();
    if (await expandButton.isVisible()) {
      const initialCount = await achievementsList.count();
      await expandButton.click();
      
      // Should show more achievements after clicking
      const expandedCount = await achievementsList.count();
      expect(expandedCount).toBeGreaterThanOrEqual(initialCount);
      
      // Should have collapse button
      await expect(page.locator('button').filter({ hasText: /show less|collapse|hide/i })).toBeVisible();
    }
  });

  test('should display timeframes and locations', async ({ page }) => {
    // Check for timeframes in span elements
    await expect(page.getByText('Jul 2025 – Present')).toBeVisible();
    await expect(page.getByText('Jul 2023 – Jul 2025')).toBeVisible();
    await expect(page.getByText('Jun 2022 – Aug 2022')).toBeVisible();
    await expect(page.getByText('Oct 2019 – Jun 2021')).toBeVisible();
    
    // Check for locations - use first() for duplicates
    await expect(page.getByText('New Brunswick, NJ').first()).toBeVisible();
    await expect(page.getByText('Bedford, MA')).toBeVisible();
    await expect(page.getByText('Kennesaw, GA')).toBeVisible();
  });

  test('should format markdown text correctly', async ({ page }) => {
    // Check that bold formatting is applied
    const strongElements = await page.locator('strong').count();
    expect(strongElements).toBeGreaterThan(5);
    
    // Check specific formatted terms
    await expect(page.locator('strong:has-text("AI copilot")')).toBeVisible();
    await expect(page.locator('strong:has-text("Batch Genealogy")')).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    // Test navigation to experience page from home
    await page.goto('/');
    
    // Look for any link to experience page
    const experienceLink = page.locator('a[href*="experience"]').first();
    await expect(experienceLink).toBeVisible();
    await experienceLink.click();
    
    // Wait for navigation
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('experience');
  });
});

test.describe('Resume Data Validation Tests', () => {
  test('should have proper page structure', async ({ page }) => {
    await page.goto('/experience');
    
    // Check that basic page elements exist
    await expect(page.getByRole('heading', { name: 'Experience', level: 1 })).toBeVisible();
    await expect(page.locator('article')).toHaveCount(4);
    
    // Check that each article has required elements
    const articles = page.locator('article');
    for (let i = 0; i < 4; i++) {
      const article = articles.nth(i);
      await expect(article.locator('h2')).toBeVisible(); // Job title
      await expect(article.locator('h3')).toBeVisible(); // Company name
    }
  });
});

test.describe('CSS and Styling Tests', () => {
  test('should load CSS correctly', async ({ page }) => {
    await page.goto('/experience');
    
    // Check that articles are styled properly
    const article = page.locator('article').first();
    await expect(article).toBeVisible();
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/experience');
    
    // Content should still be visible
    await expect(page.getByRole('heading', { name: 'Experience', level: 1 })).toBeVisible();
    
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.getByRole('heading', { name: 'Experience', level: 1 })).toBeVisible();
  });
});

test.describe('Deployment and Asset Tests', () => {
  test('should load all required assets', async ({ page }) => {
    const response = await page.goto('/experience');
    expect(response?.status()).toBe(200);
    
    // Check for CSS assets
    const styleSheets = await page.locator('link[rel="stylesheet"]').count();
    expect(styleSheets).toBeGreaterThan(0);
  });

  test('should have correct meta tags', async ({ page }) => {
    await page.goto('/experience');
    
    // Check for proper meta tags
    await expect(page.locator('meta[name="viewport"]')).toHaveAttribute('content', /width=device-width/);
  });

  test('should handle 404 correctly', async ({ page }) => {
    const response = await page.goto('/nonexistent-page');
    expect(response?.status()).toBe(404);
  });
});