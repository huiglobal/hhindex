import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to all main routes', async ({ page }) => {
    // Start at home page
    await page.goto('/');
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toContainText('Hindu Hate Index');

    // Navigate to Dashboard
    await page.click('text=Dashboard');
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard');

    // Navigate to Heatmap
    await page.click('text=Heatmap');
    await expect(page).toHaveURL('/heatmap');
    await expect(page.locator('h1')).toContainText('Heatmap');

    // Navigate to Leaderboards
    await page.click('text=Leaderboards');
    await expect(page).toHaveURL('/leaderboards');
    await expect(page.locator('h1')).toContainText('Leaderboards');

    // Navigate to Data Explorer
    await page.click('text=Data Explorer');
    await expect(page).toHaveURL('/data-explorer');
    await expect(page.locator('h1')).toContainText('Data Explorer');

    // Navigate to Articles
    await page.click('text=Articles');
    await expect(page).toHaveURL('/articles');
    await expect(page.locator('h1')).toContainText('Articles');

    // Navigate to About
    await page.click('text=About');
    await expect(page).toHaveURL('/about');
    await expect(page.locator('h1')).toContainText('About');

    // Navigate to Alerts
    await page.click('text=Alerts');
    await expect(page).toHaveURL('/alerts');
    await expect(page.locator('h1')).toContainText('Alerts');
  });

  test('should display 404 page for invalid routes', async ({ page }) => {
    await page.goto('/invalid-route-that-does-not-exist');
    await expect(page.locator('h1')).toContainText('404');
    await expect(page.locator('h2')).toContainText('Page Not Found');
  });

  test('should handle browser back/forward navigation', async ({ page }) => {
    // Navigate through several pages
    await page.goto('/');
    await page.click('text=Dashboard');
    await page.click('text=Heatmap');
    
    // Go back
    await page.goBack();
    await expect(page).toHaveURL('/dashboard');
    
    // Go back again
    await page.goBack();
    await expect(page).toHaveURL('/');
    
    // Go forward
    await page.goForward();
    await expect(page).toHaveURL('/dashboard');
  });

  test('should navigate to detail pages with parameters', async ({ page }) => {
    // Test article detail page
    await page.goto('/articles/test-article-123');
    await expect(page).toHaveURL('/articles/test-article-123');
    
    // Test region detail page
    await page.goto('/regions/india');
    await expect(page).toHaveURL('/regions/india');
    
    // Test incident detail page
    await page.goto('/incidents/incident-456');
    await expect(page).toHaveURL('/incidents/incident-456');
    
    // Test offender profile page
    await page.goto('/offenders/offender-789');
    await expect(page).toHaveURL('/offenders/offender-789');
  });

  test('should highlight active navigation link', async ({ page }) => {
    await page.goto('/');
    
    // Check home link is active
    const homeLink = page.locator('nav a[href="/"]');
    await expect(homeLink).toHaveClass(/text-primary-600/);
    
    // Navigate to dashboard
    await page.click('text=Dashboard');
    const dashboardLink = page.locator('nav a[href="/dashboard"]');
    await expect(dashboardLink).toHaveClass(/text-primary-600/);
  });

  test('should scroll to top on navigation', async ({ page }) => {
    await page.goto('/');
    
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));
    
    // Navigate to another page
    await page.click('text=Dashboard');
    
    // Check scroll position is at top
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBe(0);
  });
});
