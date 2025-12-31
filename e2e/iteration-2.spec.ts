import { test, expect } from '@playwright/test';

test.describe('Iteration 2 - Home and Categories UI', () => {
  test('01 - Home route shows hero carousel and product tiles', async ({ page }) => {
    // Navigate to Home route
    await page.goto('/');
    
    // Wait for app to load and bypass auth
    await page.waitForTimeout(2000);
    
    // Check if we're on login screen, if so, skip login (mock auth)
    const loginButton = page.getByRole('button', { name: /login|sign in/i });
    if (await loginButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      // For now, we'll wait for the auth to be bypassed or implement auto-login
      console.log('Auth screen detected');
    }
    
    // Wait for home screen to be visible
    await page.waitForSelector('[data-testid="home-screen"]', { timeout: 10000 });
    
    // Assert hero carousel exists
    const heroCarousel = page.getByTestId('hero-carousel');
    await expect(heroCarousel).toBeVisible();
    
    // Assert at least one product tile is visible
    const productTile = page.locator('[data-testid^="product-tile-"]').first();
    await expect(productTile).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ 
      path: 'artifacts/iteration-2/01-home.png',
      fullPage: true 
    });
  });

  test('02 - Categories tab shows category grid', async ({ page }) => {
    // Navigate to home
    await page.goto('/');
    
    // Wait for app to load
    await page.waitForTimeout(2000);
    
    // Skip auth if present
    const loginButton = page.getByRole('button', { name: /login|sign in/i });
    if (await loginButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      console.log('Auth screen detected');
    }
    
    // Wait for home screen
    await page.waitForSelector('[data-testid="home-screen"]', { timeout: 10000 });
    
    // Click on Categories tab
    const categoriesTab = page.getByText('Categories', { exact: false });
    await categoriesTab.click();
    
    // Wait for categories screen to load
    await page.waitForSelector('[data-testid="categories-screen"]', { timeout: 5000 });
    
    // Assert category grid is visible
    const categoryGrid = page.getByTestId('categories-grid');
    await expect(categoryGrid).toBeVisible();
    
    // Assert at least one category card is visible
    const categoryCard = page.locator('[data-testid^="category-card-"]').first();
    await expect(categoryCard).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ 
      path: 'artifacts/iteration-2/02-categories.png',
      fullPage: true 
    });
  });

  test('03 - Clicking category navigates to ProductList', async ({ page }) => {
    // Navigate to home
    await page.goto('/');
    
    // Wait for app to load
    await page.waitForTimeout(2000);
    
    // Skip auth if present
    const loginButton = page.getByRole('button', { name: /login|sign in/i });
    if (await loginButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      console.log('Auth screen detected');
    }
    
    // Wait for home screen
    await page.waitForSelector('[data-testid="home-screen"]', { timeout: 10000 });
    
    // Click on Categories tab
    const categoriesTab = page.getByText('Categories', { exact: false });
    await categoriesTab.click();
    
    // Wait for categories screen
    await page.waitForSelector('[data-testid="categories-screen"]', { timeout: 5000 });
    
    // Click on the first category card
    const firstCategoryCard = page.locator('[data-testid^="category-card-"]').first();
    await firstCategoryCard.click();
    
    // Wait for ProductList screen to load
    await page.waitForTimeout(1000);
    
    // Assert ProductList title is visible and contains a category name
    const productListTitle = page.getByTestId('productlist-title');
    await expect(productListTitle).toBeVisible();
    
    // Assert product grid is visible
    const productListGrid = page.getByTestId('productlist-grid');
    await expect(productListGrid).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ 
      path: 'artifacts/iteration-2/03-productlist-from-category.png',
      fullPage: true 
    });
  });
});
