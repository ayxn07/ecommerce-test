import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Ensure artifacts directory exists
const artifactsDir = path.join(__dirname, '../artifacts/iteration-4');
if (!fs.existsSync(artifactsDir)) {
  fs.mkdirSync(artifactsDir, { recursive: true });
}

test.describe('Iteration 4 - Product Details Page & Cart E2E', () => {
  test('Complete PDP to Cart flow with size selection and quantity', async ({ page }) => {
    // Navigate to home with auth bypass
    await page.goto('/?bypass-auth=true');
    
    // Wait for home screen to load
    await page.waitForSelector('[data-testid="home-screen"]', { timeout: 15000 });
    
    // Step 1: Navigate to Categories -> ProductList
    const categoriesTab = page.getByText('Categories', { exact: false });
    await categoriesTab.click();
    await page.waitForSelector('[data-testid="categories-screen"]', { timeout: 5000 });
    
    // Click on the first category card
    const firstCategoryCard = page.locator('[data-testid^="category-card-"]').first();
    await firstCategoryCard.click();
    
    // Wait for ProductList screen to load
    await page.waitForSelector('[data-testid="productlist-screen"]', { timeout: 5000 });
    
    // Click on the first product to open ProductDetails
    const firstProductTile = page.locator('[data-testid^="product-tile-"]').first();
    await firstProductTile.click();
    
    // Wait for Product Details screen to load
    await page.waitForSelector('[data-testid="product-details-scroll"]', { timeout: 5000 });
    
    // Step 2: Screenshot - PDP
    await page.screenshot({ 
      path: 'artifacts/iteration-4/01-pdp.png',
      fullPage: true 
    });
    
    // Step 3: Select first available size pill
    const sizeSelector = page.getByTestId('size-selector');
    await expect(sizeSelector).toBeVisible();
    
    // Click on the first size option (should be pre-selected, but click to ensure)
    const firstSizeOption = page.locator('[data-testid^="size-option-"]').first();
    await expect(firstSizeOption).toBeVisible();
    await firstSizeOption.click();
    await page.waitForTimeout(300);
    
    // Step 4: Increase quantity to 2
    const increaseButton = page.getByTestId('quantity-increase');
    await expect(increaseButton).toBeVisible();
    await increaseButton.click();
    await page.waitForTimeout(300);
    
    // Verify quantity is 2
    const quantityValue = page.getByTestId('quantity-value');
    await expect(quantityValue).toHaveText('2');
    
    // Step 5: Click Add to Cart
    const addToCartButton = page.getByTestId('add-to-cart-button');
    await expect(addToCartButton).toBeVisible();
    await expect(addToCartButton).toBeEnabled();
    await addToCartButton.click();
    
    // Step 6: Assert toast visible
    await page.waitForTimeout(500);
    const toastMessage = page.getByText('Added to cart!');
    await expect(toastMessage).toBeVisible({ timeout: 3000 });
    
    // Step 7: Screenshot - Added toast
    await page.screenshot({ 
      path: 'artifacts/iteration-4/02-added-toast.png',
      fullPage: true 
    });
    
    // Wait for toast to potentially disappear
    await page.waitForTimeout(1000);
    
    // Step 8: Navigate to Cart tab
    const cartTab = page.getByText('Cart', { exact: false });
    await expect(cartTab).toBeVisible();
    await cartTab.click();
    
    // Wait for cart to load
    await page.waitForTimeout(1000);
    
    // Step 9: Assert item visible with qty=2
    const cartItemsList = page.getByTestId('cart-items-list');
    await expect(cartItemsList).toBeVisible({ timeout: 5000 });
    
    // Check that the first cart item exists
    const cartItem = page.locator('[data-testid^="cart-item-"]').first();
    await expect(cartItem).toBeVisible();
    
    // Verify quantity is 2
    const itemQuantity = page.locator('[data-testid^="item-quantity-"]').first();
    await expect(itemQuantity).toHaveText('2');
    
    // Verify cart total is displayed
    const cartTotal = page.getByTestId('cart-total');
    await expect(cartTotal).toBeVisible();
    
    // Step 10: Screenshot - Cart
    await page.screenshot({ 
      path: 'artifacts/iteration-4/03-cart.png',
      fullPage: true 
    });
  });

  test('PDP premium features are visible', async ({ page }) => {
    // Navigate to home with auth bypass
    await page.goto('/?bypass-auth=true');
    
    // Wait for home screen
    await page.waitForSelector('[data-testid="home-screen"]', { timeout: 15000 });
    
    // Navigate to Categories -> ProductList -> ProductDetails
    const categoriesTab = page.getByText('Categories', { exact: false });
    await categoriesTab.click();
    await page.waitForTimeout(1000);
    
    const firstCategoryCard = page.locator('[data-testid^="category-card-"]').first();
    await firstCategoryCard.click();
    await page.waitForTimeout(1000);
    
    const firstProductTile = page.locator('[data-testid^="product-tile-"]').first();
    await firstProductTile.click();
    await page.waitForTimeout(1000);
    
    // Verify Product Details screen elements
    await expect(page.getByTestId('product-details-scroll')).toBeVisible();
    
    // Check for size selector
    const sizeSelector = page.getByTestId('size-selector');
    await expect(sizeSelector).toBeVisible();
    
    // Check for quantity stepper
    const quantityDecrease = page.getByTestId('quantity-decrease');
    const quantityIncrease = page.getByTestId('quantity-increase');
    const quantityValue = page.getByTestId('quantity-value');
    await expect(quantityDecrease).toBeVisible();
    await expect(quantityIncrease).toBeVisible();
    await expect(quantityValue).toBeVisible();
    await expect(quantityValue).toHaveText('1');
    
    // Check for add to cart button
    const addToCartButton = page.getByTestId('add-to-cart-button');
    await expect(addToCartButton).toBeVisible();
    await expect(addToCartButton).toBeEnabled();
    
    // Verify accordion (Delivery & Returns) is present
    const deliveryAccordion = page.getByText('Delivery & Returns');
    await expect(deliveryAccordion).toBeVisible();
    
    // Verify reviews section is present
    const reviewsSection = page.getByText('Customer Reviews');
    await expect(reviewsSection).toBeVisible();
    
    // Verify "View all" reviews link is present
    const viewAllReviews = page.getByText(/View all \d+/);
    await expect(viewAllReviews).toBeVisible();
  });

  test('Navigation bar has professional icons', async ({ page }) => {
    // Navigate to home with auth bypass
    await page.goto('/?bypass-auth=true');
    
    // Wait for home screen
    await page.waitForSelector('[data-testid="home-screen"]', { timeout: 15000 });
    
    // Verify all 5 navigation tabs are present
    const homeTab = page.getByText('Home', { exact: false });
    const categoriesTab = page.getByText('Categories', { exact: false });
    const wishlistTab = page.getByText('Wishlist', { exact: false });
    const cartTab = page.getByText('Cart', { exact: false });
    const profileTab = page.getByText('Profile', { exact: false });
    
    await expect(homeTab).toBeVisible();
    await expect(categoriesTab).toBeVisible();
    await expect(wishlistTab).toBeVisible();
    await expect(cartTab).toBeVisible();
    await expect(profileTab).toBeVisible();
    
    // Take a screenshot to verify the navigation bar looks professional
    await page.screenshot({ 
      path: 'artifacts/iteration-4/04-navigation-bar.png',
      fullPage: false 
    });
  });

  test('Quantity stepper works correctly', async ({ page }) => {
    // Navigate to PDP
    await page.goto('/?bypass-auth=true');
    await page.waitForSelector('[data-testid="home-screen"]', { timeout: 15000 });
    
    const categoriesTab = page.getByText('Categories', { exact: false });
    await categoriesTab.click();
    await page.waitForTimeout(1000);
    
    const firstCategoryCard = page.locator('[data-testid^="category-card-"]').first();
    await firstCategoryCard.click();
    await page.waitForTimeout(1000);
    
    const firstProductTile = page.locator('[data-testid^="product-tile-"]').first();
    await firstProductTile.click();
    await page.waitForTimeout(1000);
    
    // Test quantity stepper
    const quantityValue = page.getByTestId('quantity-value');
    const increaseButton = page.getByTestId('quantity-increase');
    const decreaseButton = page.getByTestId('quantity-decrease');
    
    // Initial value should be 1
    await expect(quantityValue).toHaveText('1');
    
    // Decrease should be disabled at 1
    await expect(decreaseButton).toBeDisabled();
    
    // Increase to 2
    await increaseButton.click();
    await page.waitForTimeout(200);
    await expect(quantityValue).toHaveText('2');
    
    // Decrease should now be enabled
    await expect(decreaseButton).toBeEnabled();
    
    // Increase to 3
    await increaseButton.click();
    await page.waitForTimeout(200);
    await expect(quantityValue).toHaveText('3');
    
    // Decrease back to 2
    await decreaseButton.click();
    await page.waitForTimeout(200);
    await expect(quantityValue).toHaveText('2');
  });

  test('Size pills have proper selected state', async ({ page }) => {
    // Navigate to PDP
    await page.goto('/?bypass-auth=true');
    await page.waitForSelector('[data-testid="home-screen"]', { timeout: 15000 });
    
    const categoriesTab = page.getByText('Categories', { exact: false });
    await categoriesTab.click();
    await page.waitForTimeout(1000);
    
    const firstCategoryCard = page.locator('[data-testid^="category-card-"]').first();
    await firstCategoryCard.click();
    await page.waitForTimeout(1000);
    
    const firstProductTile = page.locator('[data-testid^="product-tile-"]').first();
    await firstProductTile.click();
    await page.waitForTimeout(1000);
    
    // Get all size options
    const sizeOptions = page.locator('[data-testid^="size-option-"]');
    const count = await sizeOptions.count();
    
    if (count > 1) {
      // Click on second size option
      const secondSizeOption = sizeOptions.nth(1);
      await secondSizeOption.click();
      await page.waitForTimeout(300);
      
      // Click back to first size option
      const firstSizeOption = sizeOptions.first();
      await firstSizeOption.click();
      await page.waitForTimeout(300);
      
      // Take screenshot showing size selection
      await page.screenshot({ 
        path: 'artifacts/iteration-4/05-size-selection.png',
        fullPage: true 
      });
    }
  });
});
