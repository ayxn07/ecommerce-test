import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Ensure artifacts directory exists
const artifactsDir = path.join(__dirname, '../artifacts/iteration-3');
if (!fs.existsSync(artifactsDir)) {
  fs.mkdirSync(artifactsDir, { recursive: true });
}

test.describe('Iteration 3 - ProductList, Wishlist & E2E', () => {
  test('Complete wishlist flow: add, view, and remove items', async ({ page }) => {
    // Navigate to home with auth bypass
    await page.goto('/?bypass-auth=true');
    
    // Wait for home screen to load
    await page.waitForSelector('[data-testid="home-screen"]', { timeout: 15000 });
    
    // Step 1: Navigate to Categories to show ProductList
    const categoriesTab = page.getByText('Categories', { exact: false });
    await categoriesTab.click();
    
    // Wait for categories screen
    await page.waitForSelector('[data-testid="categories-screen"]', { timeout: 5000 });
    
    // Click on the first category card
    const firstCategoryCard = page.locator('[data-testid^="category-card-"]').first();
    await firstCategoryCard.click();
    
    // Wait for ProductList screen to load
    await page.waitForSelector('[data-testid="productlist-screen"]', { timeout: 5000 });
    
    // Step 2: Take screenshot of ProductList
    await page.screenshot({ 
      path: 'artifacts/iteration-3/01-productlist.png',
      fullPage: true 
    });
    
    // Step 3: Click wishlist heart on first product tile
    const firstProductHeart = page.locator('[data-testid^="wishlist-heart-"]').first();
    await expect(firstProductHeart).toBeVisible();
    
    // Get the product ID from the heart test ID
    const productHeartTestId = await firstProductHeart.getAttribute('data-testid');
    console.log('Adding product to wishlist:', productHeartTestId);
    
    await firstProductHeart.click();
    
    // Wait a moment for state update
    await page.waitForTimeout(500);
    
    // Verify the heart changed (now filled)
    const heartText = await firstProductHeart.textContent();
    console.log('Heart icon after click:', heartText);
    
    // Step 4: Navigate to Wishlist by clicking the wishlist tab
    // Go back twice to get to tabs
    await page.goBack(); // Back to Categories
    await page.waitForTimeout(300);
    await page.goBack(); // Back to Home
    await page.waitForTimeout(500);
    
    // Now we're on Home tab where all tabs are visible
    // Click on Wishlist tab
    const wishlistTab = page.getByText('Wishlist', { exact: false });
    await expect(wishlistTab).toBeVisible({ timeout: 5000 });
    await wishlistTab.click();
    
    // Wait for wishlist screen to load
    await page.waitForTimeout(1000);
    
    // Step 5: Assert at least one item visible (not empty state)
    const wishlistScreen = page.getByTestId('wishlist-screen');
    const emptyState = page.getByTestId('wishlist-empty-state');
    
    // Check which one is visible
    const screenVisible = await wishlistScreen.isVisible().catch(() => false);
    const emptyVisible = await emptyState.isVisible().catch(() => false);
    
    console.log('Wishlist screen visible:', screenVisible, 'Empty state visible:', emptyVisible);
    
    if (screenVisible) {
      const wishlistGrid = page.getByTestId('wishlist-grid');
      await expect(wishlistGrid).toBeVisible({ timeout: 5000 });
      
      // Verify at least one product tile is present
      const productTile = page.locator('[data-testid^="product-tile-"]').first();
      await expect(productTile).toBeVisible();
      
      // Step 6: Take screenshot of filled wishlist
      await page.screenshot({ 
        path: 'artifacts/iteration-3/02-wishlist-filled.png',
        fullPage: true 
      });
      
      // Step 7: Toggle heart to remove item
      const wishlistHeart = page.locator('[data-testid^="wishlist-heart-"]').first();
      await expect(wishlistHeart).toBeVisible();
      await wishlistHeart.click();
      
      // Wait for state update
      await page.waitForTimeout(500);
      
      // Step 8: Assert empty state is visible
      const emptyStateAfter = page.getByTestId('wishlist-empty-state');
      await expect(emptyStateAfter).toBeVisible({ timeout: 5000 });
      
      // Verify empty state message
      await expect(page.getByText('Wishlist is empty')).toBeVisible();
      await expect(page.getByText('Add products to your wishlist to see them here')).toBeVisible();
      
      // Step 9: Take screenshot of empty wishlist
      await page.screenshot({ 
        path: 'artifacts/iteration-3/03-wishlist-empty.png',
        fullPage: true 
      });
    } else if (emptyVisible) {
      // Wishlist is empty - state was lost
      console.log('Warning: Wishlist is empty after navigation - Redux state may have been lost');
      
      // Take screenshot
      await page.screenshot({ 
        path: 'artifacts/iteration-3/02-wishlist-filled.png',
        fullPage: true 
      });
      await page.screenshot({ 
        path: 'artifacts/iteration-3/03-wishlist-empty.png',
        fullPage: true 
      });
      
      throw new Error('Wishlist state was lost during navigation - Redux state not persisted across SPA navigation');
    } else {
      throw new Error('Neither wishlist screen nor empty state is visible');
    }
  });

  test('ProductList screen shows filter/sort bar and 2-column grid', async ({ page }) => {
    // Navigate to home with auth bypass
    await page.goto('/?bypass-auth=true');
    
    // Wait for home screen
    await page.waitForSelector('[data-testid="home-screen"]', { timeout: 15000 });
    
    // Navigate to Categories
    const categoriesTab = page.getByText('Categories', { exact: false });
    await categoriesTab.click();
    
    // Wait for categories screen
    await page.waitForSelector('[data-testid="categories-screen"]', { timeout: 5000 });
    
    // Click on a category
    const categoryCard = page.locator('[data-testid^="category-card-"]').first();
    await categoryCard.click();
    
    // Wait for ProductList screen
    await page.waitForSelector('[data-testid="productlist-screen"]', { timeout: 5000 });
    
    // Assert filter/sort bar is visible
    const filterButton = page.getByTestId('filter-button');
    await expect(filterButton).toBeVisible();
    
    const sortButton = page.getByTestId('sort-button');
    await expect(sortButton).toBeVisible();
    
    const sizeButton = page.getByTestId('size-button');
    await expect(sizeButton).toBeVisible();
    
    // Assert product grid is visible with products
    const productGrid = page.getByTestId('productlist-grid');
    await expect(productGrid).toBeVisible();
    
    // Verify at least 2 product tiles are visible (2-column grid)
    const productTiles = page.locator('[data-testid^="product-tile-"]');
    const count = await productTiles.count();
    expect(count).toBeGreaterThanOrEqual(2);
    
    // Verify load more button
    const loadMoreButton = page.getByTestId('load-more-button');
    await expect(loadMoreButton).toBeVisible();
  });

  test('Wishlist heart toggles correctly on product tiles', async ({ page }) => {
    // Navigate to home with auth bypass
    await page.goto('/?bypass-auth=true');
    
    // Wait for home screen
    await page.waitForSelector('[data-testid="home-screen"]', { timeout: 15000 });
    
    // Navigate to Categories -> ProductList
    const categoriesTab = page.getByText('Categories', { exact: false });
    await categoriesTab.click();
    
    await page.waitForSelector('[data-testid="categories-screen"]', { timeout: 5000 });
    
    const categoryCard = page.locator('[data-testid^="category-card-"]').first();
    await categoryCard.click();
    
    await page.waitForSelector('[data-testid="productlist-screen"]', { timeout: 5000 });
    
    // Get the first product's heart icon
    const firstHeart = page.locator('[data-testid^="wishlist-heart-"]').first();
    await expect(firstHeart).toBeVisible();
    
    // Get initial text (should be empty heart 🤍)
    const initialText = await firstHeart.textContent();
    
    // Click to add to wishlist
    await firstHeart.click();
    await page.waitForTimeout(500);
    
    // Verify heart changed to filled (❤️)
    const afterAddText = await firstHeart.textContent();
    expect(afterAddText).not.toBe(initialText);
    
    // Click again to remove
    await firstHeart.click();
    await page.waitForTimeout(500);
    
    // Verify heart changed back to empty
    const afterRemoveText = await firstHeart.textContent();
    expect(afterRemoveText).toBe(initialText);
  });
});
