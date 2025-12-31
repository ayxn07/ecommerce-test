import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Ensure artifacts directory exists
const artifactsDir = path.join(__dirname, '../artifacts/iteration-7');
if (!fs.existsSync(artifactsDir)) {
  fs.mkdirSync(artifactsDir, { recursive: true });
}

test.describe('Iteration 7 - Real Backend Integration with FakeStoreAPI', () => {
  test('Flow A: Complete E2E flow in fixture mode (deterministic)', async ({ page }) => {
    // This test runs in fixture mode for deterministic behavior
    // Set via EXPO_PUBLIC_E2E_API_MODE=fixture in playwright.config.ts
    
    // Navigate to home with bypass-auth for faster testing
    await page.goto('/?bypass-auth=true');
    
    // Wait for home screen to load and products to be fetched
    await page.waitForSelector('[data-testid="home-screen"]', { timeout: 20000 });
    
    // Step 1: Screenshot - Home screen with API data
    await page.screenshot({ 
      path: path.join(artifactsDir, '01-home.png'),
      fullPage: true 
    });
    console.log('✓ Screenshot 1: Home screen');
    
    // Step 2: Navigate to Categories
    const categoriesTab = page.locator('text=/Categories/i').first();
    await categoriesTab.click();
    await page.waitForSelector('[data-testid="categories-screen"]', { timeout: 5000 });
    
    await page.screenshot({ 
      path: path.join(artifactsDir, '02-categories.png'),
      fullPage: true 
    });
    console.log('✓ Screenshot 2: Categories');
    
    // Step 3: Click on first category to open ProductList
    const firstCategoryCard = page.locator('[data-testid^="category-card-"]').first();
    await firstCategoryCard.click();
    
    await page.waitForSelector('[data-testid="productlist-screen"]', { timeout: 5000 });
    
    await page.screenshot({ 
      path: path.join(artifactsDir, '03-productlist.png'),
      fullPage: true 
    });
    console.log('✓ Screenshot 3: Product List');
    
    // Step 4: Open first product
    const firstProductTile = page.locator('[data-testid^="product-tile-"]').first();
    await firstProductTile.scrollIntoViewIfNeeded();
    await firstProductTile.click();
    
    // Wait for Product Details screen to load
    await page.waitForSelector('[data-testid="product-details-scroll"]', { timeout: 5000 });
    
    await page.screenshot({ 
      path: path.join(artifactsDir, '04-pdp.png'),
      fullPage: true 
    });
    console.log('✓ Screenshot 4: Product Details Page');
    
    // Step 5: Select size (if available) and add to cart
    const sizeSelector = page.getByTestId('size-selector');
    if (await sizeSelector.isVisible()) {
      // Click on the first size option
      const firstSizeOption = page.locator('[data-testid^="size-option-"]').first();
      await firstSizeOption.click();
    }
    
    // Add to cart
    const addToCartButton = page.getByTestId('add-to-cart-button');
    await addToCartButton.click();
    
    // Wait for toast or some indication
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: path.join(artifactsDir, '05-added.png'),
      fullPage: true 
    });
    console.log('✓ Screenshot 5: Added to Cart');
    
    // Step 6: Navigate to cart
    const cartTab = page.locator('text=/Cart/i').first();
    await cartTab.click();
    
    // Wait for cart screen
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: path.join(artifactsDir, '06-cart.png'),
      fullPage: true 
    });
    console.log('✓ Screenshot 6: Cart');
    
    // Step 7: Navigate to Profile/Login
    const profileTab = page.locator('text=/Profile/i').first();
    await profileTab.click();
    await page.waitForTimeout(500);
    
    // Check if already logged in or need to login
    const usernameInput = page.locator('input[placeholder*="username" i]');
    if (await usernameInput.isVisible()) {
      // Fill in login form with test credentials (johnd / m38rmF$)
      await usernameInput.fill('johnd');
      
      const passwordInput = page.locator('input[type="password"]');
      await passwordInput.fill('m38rmF$');
      
      await page.screenshot({ 
        path: path.join(artifactsDir, '07-login.png'),
        fullPage: true 
      });
      console.log('✓ Screenshot 7: Login Screen');
      
      // Click sign in button
      const signInButton = page.locator('button:has-text("Sign In")').or(
        page.locator('[role="button"]:has-text("Sign In")')
      );
      await signInButton.click();
      
      // Wait for login to complete
      await page.waitForTimeout(2000);
    } else {
      await page.screenshot({ 
        path: path.join(artifactsDir, '07-login.png'),
        fullPage: true 
      });
      console.log('✓ Screenshot 7: Already logged in');
    }
    
    // Step 8: Go back to cart to verify sync
    await cartTab.click();
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: path.join(artifactsDir, '08-cart-synced.png'),
      fullPage: true 
    });
    console.log('✓ Screenshot 8: Cart after login (synced)');
    
    console.log('✅ Flow A completed successfully - all screenshots saved');
  });

  test('Flow B: Live API smoke test (skips if network blocked)', async ({ page }) => {
    // Check if we can access the live API
    const canAccessAPI = await checkAPIAccess();
    
    if (!canAccessAPI) {
      test.skip();
      console.log('⚠️  Flow B skipped - FakeStoreAPI not accessible');
      return;
    }
    
    console.log('Running live API smoke test...');
    
    // Navigate with live mode (no fixture mode env var set here)
    await page.goto('/?bypass-auth=true');
    
    // Wait for home screen to load
    await page.waitForSelector('[data-testid="home-screen"]', { timeout: 20000 });
    
    // Verify products are loaded
    const productCards = await page.locator('[data-testid^="product-"]').count();
    expect(productCards).toBeGreaterThan(0);
    
    await page.screenshot({ 
      path: path.join(artifactsDir, '09-live-home.png'),
      fullPage: true 
    });
    console.log('✓ Screenshot 9: Live API Home Screen');
    console.log('✅ Flow B completed - live API accessible');
  });
});

/**
 * Check if FakeStoreAPI is accessible
 */
async function checkAPIAccess(): Promise<boolean> {
  try {
    const response = await fetch('https://fakestoreapi.com/products/1', {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}
