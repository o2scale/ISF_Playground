/**
 * E2E Tests for Sprint5-Story-01: Product Catalog & Browsing
 *
 * Test Coverage:
 * - AC1: Product Grid Display
 * - AC2: Category Filtering
 * - AC3: Price Range Filtering
 * - AC4: Text Search with Debounce
 * - AC5: Sorting Options
 * - AC6: Pagination
 * - AC7: Product Quick Preview (Hover)
 * - AC8: Empty State
 *
 * Additional Tests:
 * - Error states (network failures)
 * - Responsive behavior (mobile/tablet/desktop)
 * - Loading states
 */

import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';
const SHOP_URL = `${BASE_URL}/shop`;

// Test user credentials
const TEST_USER = {
  email: 'student@test.com',
  password: 'password123'
};

test.describe('Sprint5-Story-01: Product Catalog & Browsing', () => {

  // Login before each test
  test.beforeEach(async ({ page }) => {
    // Navigate to login page
    await page.goto(`${BASE_URL}/login`);

    // Fill in credentials
    await page.fill('input[name="email"]', TEST_USER.email);
    await page.fill('input[name="password"]', TEST_USER.password);

    // Submit login form
    await page.click('button[type="submit"]');

    // Wait for redirect to dashboard
    await page.waitForURL(/.*dashboard.*/);

    // Verify login success
    await expect(page).toHaveURL(/dashboard/);
  });

  /**
   * AC1: Product Grid Display
   * Resolution: 1366x768 (standard laptop)
   * Expected: 3-column grid layout
   */
  test('AC1: Product grid displays with 3 columns on 1366x768 resolution', async ({ page }) => {
    // Set viewport to 1366x768
    await page.setViewportSize({ width: 1366, height: 768 });

    // Navigate to shop
    await page.goto(SHOP_URL);

    // Wait for products to load
    await page.waitForSelector('.product-grid', { timeout: 10000 });

    // Check grid columns (should be 3 on this resolution)
    const gridColumns = await page.locator('.product-grid').evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.gridTemplateColumns.split(' ').length;
    });
    expect(gridColumns).toBe(3);

    // Verify at least one product card exists
    const productCards = page.locator('.product-card');
    await expect(productCards.first()).toBeVisible();

    // Verify product card contains required elements
    const firstCard = productCards.first();
    await expect(firstCard.locator('img')).toBeVisible(); // Product image
    await expect(firstCard.locator('.product-name')).toBeVisible(); // Product name
    await expect(firstCard.locator('.product-price')).toBeVisible(); // Product price
    await expect(firstCard.locator('.stock-status')).toBeVisible(); // Stock status

    // Take screenshot for visual verification
    await page.screenshot({
      path: 'qa/screenshots/sprint5-story-01/ac1-product-grid-3col.png',
      fullPage: true
    });
  });

  /**
   * AC1: Out of Stock Overlay
   * Verify that out-of-stock items show "Out of Stock" overlay
   */
  test('AC1: Out-of-stock items display overlay', async ({ page }) => {
    await page.goto(SHOP_URL);
    await page.waitForSelector('.product-grid');

    // Look for out-of-stock products
    const outOfStockProducts = page.locator('.product-card').filter({
      hasText: 'Out of Stock'
    });

    // If there are out-of-stock products, verify overlay
    const count = await outOfStockProducts.count();
    if (count > 0) {
      const firstOutOfStock = outOfStockProducts.first();
      await expect(firstOutOfStock.locator('.out-of-stock-overlay')).toBeVisible();

      // Screenshot
      await page.screenshot({
        path: 'qa/screenshots/sprint5-story-01/ac1-out-of-stock-overlay.png'
      });
    }
  });

  /**
   * AC2: Category Filtering
   * Test single category filter
   */
  test('AC2: Category filtering works - single category', async ({ page }) => {
    await page.goto(SHOP_URL);
    await page.waitForSelector('.product-grid');

    // Click on "books" category filter
    await page.click('input[value="books"]');

    // Wait for API response with category filter
    await page.waitForResponse(response =>
      response.url().includes('/api/v2/shop/products') &&
      response.url().includes('category=books')
    );

    // Wait for products to update
    await page.waitForTimeout(500);

    // Verify products are filtered
    const products = page.locator('.product-card');
    const productCount = await products.count();
    expect(productCount).toBeGreaterThan(0);

    // Verify active filter pill shows
    const filterPill = page.locator('.filter-pill').filter({ hasText: 'books' });
    await expect(filterPill).toBeVisible();

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint5-story-01/ac2-category-filter-single.png',
      fullPage: true
    });
  });

  /**
   * AC2: Multiple Category Filtering
   * Test selecting multiple categories
   */
  test('AC2: Category filtering works - multiple categories', async ({ page }) => {
    await page.goto(SHOP_URL);
    await page.waitForSelector('.product-grid');

    // Select multiple categories
    await page.click('input[value="books"]');
    await page.waitForTimeout(300);
    await page.click('input[value="stationery"]');

    // Wait for API response
    await page.waitForResponse(response =>
      response.url().includes('/api/v2/shop/products')
    );

    // Verify both filter pills are visible
    await expect(page.locator('.filter-pill').filter({ hasText: 'books' })).toBeVisible();
    await expect(page.locator('.filter-pill').filter({ hasText: 'stationery' })).toBeVisible();

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint5-story-01/ac2-category-filter-multiple.png'
    });
  });

  /**
   * AC2: Removable Filter Pills
   * Test removing active filters via pills
   */
  test('AC2: Active filters show as removable pills', async ({ page }) => {
    await page.goto(SHOP_URL);
    await page.waitForSelector('.product-grid');

    // Apply a category filter
    await page.click('input[value="sports"]');
    await page.waitForTimeout(500);

    // Verify filter pill appears
    const filterPill = page.locator('.filter-pill').filter({ hasText: 'sports' });
    await expect(filterPill).toBeVisible();

    // Click remove button on pill
    await filterPill.locator('.remove-filter').click();

    // Wait for products to reload
    await page.waitForTimeout(500);

    // Verify pill is removed
    await expect(filterPill).not.toBeVisible();

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint5-story-01/ac2-removable-filter-pills.png'
    });
  });

  /**
   * AC3: Price Range Filtering
   * Test price slider functionality
   */
  test('AC3: Price range filtering works', async ({ page }) => {
    await page.goto(SHOP_URL);
    await page.waitForSelector('.product-grid');

    // Locate price range slider
    const minPriceSlider = page.locator('input[name="minPrice"]');
    const maxPriceSlider = page.locator('input[name="maxPrice"]');

    // Set price range: 50-200 coins
    await minPriceSlider.fill('50');
    await maxPriceSlider.fill('200');

    // Wait for API response with price filter
    await page.waitForResponse(response =>
      response.url().includes('/api/v2/shop/products') &&
      response.url().includes('minPrice=50') &&
      response.url().includes('maxPrice=200')
    );

    // Wait for products to update
    await page.waitForTimeout(500);

    // Verify product count updates
    const productCountText = page.locator('.product-count');
    await expect(productCountText).toBeVisible();

    // Verify products are within price range
    const productPrices = await page.locator('.product-price').allTextContents();
    productPrices.forEach(priceText => {
      const price = parseInt(priceText.replace(/[^0-9]/g, ''));
      expect(price).toBeGreaterThanOrEqual(50);
      expect(price).toBeLessThanOrEqual(200);
    });

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint5-story-01/ac3-price-range-filter.png',
      fullPage: true
    });
  });

  /**
   * AC4: Text Search with Debounce
   * Test search functionality with debouncing
   */
  test('AC4: Text search works with 300ms debounce', async ({ page }) => {
    await page.goto(SHOP_URL);
    await page.waitForSelector('.product-grid');

    // Locate search input
    const searchInput = page.locator('input[placeholder*="Search"]');

    // Type search term (should debounce)
    await searchInput.fill('pen');

    // Wait for debounce delay (300ms) + network request
    await page.waitForTimeout(400);

    // Wait for API response with search query
    await page.waitForResponse(response =>
      response.url().includes('/api/v2/shop/products') &&
      response.url().includes('search=pen')
    );

    // Verify products match search term
    const products = page.locator('.product-card');
    const productCount = await products.count();

    if (productCount > 0) {
      // Verify first product contains search term
      const firstProductName = await products.first().locator('.product-name').textContent();
      expect(firstProductName.toLowerCase()).toContain('pen');
    }

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint5-story-01/ac4-text-search.png'
    });
  });

  /**
   * AC5: Sorting Options - Price Low to High
   * Test sorting by price ascending
   */
  test('AC5: Sorting by price (low to high) works', async ({ page }) => {
    await page.goto(SHOP_URL);
    await page.waitForSelector('.product-grid');

    // Select sort option
    await page.selectOption('select[name="sort"]', 'price');

    // Wait for API response with sort parameter
    await page.waitForResponse(response =>
      response.url().includes('/api/v2/shop/products') &&
      response.url().includes('sort=price')
    );

    // Wait for products to update
    await page.waitForTimeout(500);

    // Verify products are sorted by price (ascending)
    const productPrices = await page.locator('.product-price').allTextContents();
    const prices = productPrices.map(p => parseInt(p.replace(/[^0-9]/g, '')));

    // Check if prices are in ascending order
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
    }

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint5-story-01/ac5-sort-price-low-high.png'
    });
  });

  /**
   * AC5: Sorting Options - Price High to Low
   * Test sorting by price descending
   */
  test('AC5: Sorting by price (high to low) works', async ({ page }) => {
    await page.goto(SHOP_URL);
    await page.waitForSelector('.product-grid');

    // Select sort option
    await page.selectOption('select[name="sort"]', '-price');

    // Wait for API response
    await page.waitForResponse(response =>
      response.url().includes('/api/v2/shop/products') &&
      response.url().includes('sort=-price')
    );

    await page.waitForTimeout(500);

    // Verify products are sorted by price (descending)
    const productPrices = await page.locator('.product-price').allTextContents();
    const prices = productPrices.map(p => parseInt(p.replace(/[^0-9]/g, '')));

    // Check if prices are in descending order
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i - 1]);
    }

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint5-story-01/ac5-sort-price-high-low.png'
    });
  });

  /**
   * AC5: Pagination Resets on Sort
   * Verify pagination resets to page 1 when sorting changes
   */
  test('AC5: Pagination resets to page 1 when sort changes', async ({ page }) => {
    await page.goto(SHOP_URL);
    await page.waitForSelector('.product-grid');

    // Check if pagination exists (requires > 20 products)
    const paginationExists = await page.locator('.pagination').isVisible();

    if (paginationExists) {
      // Go to page 2
      await page.click('button:has-text("2")');
      await page.waitForTimeout(500);

      // Change sort order
      await page.selectOption('select[name="sort"]', 'price');
      await page.waitForTimeout(500);

      // Verify we're back on page 1
      const activePage = page.locator('.pagination .active');
      await expect(activePage).toHaveText('1');
    }

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint5-story-01/ac5-pagination-reset-on-sort.png'
    });
  });

  /**
   * AC6: Pagination Controls
   * Test pagination when there are > 20 products
   */
  test('AC6: Pagination controls work correctly', async ({ page }) => {
    await page.goto(SHOP_URL);
    await page.waitForSelector('.product-grid');

    // Check if pagination is visible (only if > 20 products)
    const paginationExists = await page.locator('.pagination').isVisible();

    if (paginationExists) {
      // Verify pagination controls exist
      await expect(page.locator('.pagination')).toBeVisible();

      // Verify page number is shown
      const pageIndicator = page.locator('.page-indicator');
      await expect(pageIndicator).toBeVisible();
      const pageText = await pageIndicator.textContent();
      expect(pageText).toMatch(/Page \d+ of \d+/);

      // Click next page
      await page.click('button[aria-label="Next page"]');
      await page.waitForTimeout(500);

      // Verify page number changed
      const newPageText = await pageIndicator.textContent();
      expect(newPageText).toContain('Page 2');

      // Click previous page
      await page.click('button[aria-label="Previous page"]');
      await page.waitForTimeout(500);

      // Verify back to page 1
      const finalPageText = await pageIndicator.textContent();
      expect(finalPageText).toContain('Page 1');

      // Screenshot
      await page.screenshot({
        path: 'qa/screenshots/sprint5-story-01/ac6-pagination.png'
      });
    } else {
      console.log('⚠️ Pagination not visible - likely fewer than 20 products in test data');
    }
  });

  /**
   * AC7: Product Quick Preview on Hover
   * Test hover state shows quick preview and Add to Cart button
   */
  test('AC7: Product hover shows quick preview and Add to Cart button', async ({ page }) => {
    await page.goto(SHOP_URL);
    await page.waitForSelector('.product-grid');

    // Get first product card
    const firstProduct = page.locator('.product-card').first();

    // Hover over product
    await firstProduct.hover();

    // Wait for hover animation
    await page.waitForTimeout(300);

    // Verify quick preview appears
    const quickPreview = firstProduct.locator('.quick-preview');
    await expect(quickPreview).toBeVisible();

    // Verify "Add to Cart" button appears
    const addToCartButton = firstProduct.locator('button:has-text("Add to Cart")');
    await expect(addToCartButton).toBeVisible();

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint5-story-01/ac7-product-hover-preview.png'
    });
  });

  /**
   * AC8: Empty State
   * Test empty state when no products match filters
   */
  test('AC8: Empty state shows when no products match filters', async ({ page }) => {
    await page.goto(SHOP_URL);
    await page.waitForSelector('.product-grid');

    // Apply a very restrictive filter that should return no results
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('xyznonexistentproduct12345');

    // Wait for debounce and API response
    await page.waitForTimeout(400);

    // Wait for empty state to appear
    await page.waitForSelector('.empty-state', { timeout: 5000 });

    // Verify empty state message
    const emptyStateHeading = page.locator('.empty-state h3');
    await expect(emptyStateHeading).toHaveText(/No products found/i);

    // Verify suggestions to adjust filters
    const emptySuggestion = page.locator('.empty-state p');
    await expect(emptySuggestion).toBeVisible();

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint5-story-01/ac8-empty-state.png'
    });
  });

  /**
   * ERROR STATE: Network Failure
   * Test error state when API fails
   */
  test('Error: Network failure shows error state', async ({ page }) => {
    await page.goto(SHOP_URL);

    // Intercept and abort API request to simulate network failure
    await page.route('**/api/v2/shop/products', route => route.abort());

    // Reload page to trigger error
    await page.reload();

    // Wait for error state
    await page.waitForSelector('.error-state', { timeout: 5000 });

    // Verify error message
    const errorMessage = page.locator('.error-state');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(/error/i);

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint5-story-01/error-network-failure.png'
    });
  });

  /**
   * RESPONSIVE: Mobile (375px) - 1 Column Grid
   * Test responsive behavior on mobile
   */
  test('Responsive: Mobile shows 1-column grid', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto(SHOP_URL);
    await page.waitForSelector('.product-grid');

    // Verify grid shows 1 column on mobile
    const gridColumns = await page.locator('.product-grid').evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.gridTemplateColumns.split(' ').length;
    });
    expect(gridColumns).toBe(1);

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint5-story-01/responsive-mobile-1col.png',
      fullPage: true
    });
  });

  /**
   * RESPONSIVE: Tablet (768px) - 2 Column Grid
   * Test responsive behavior on tablet
   */
  test('Responsive: Tablet shows 2-column grid', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });

    await page.goto(SHOP_URL);
    await page.waitForSelector('.product-grid');

    // Verify grid shows 2 columns on tablet
    const gridColumns = await page.locator('.product-grid').evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.gridTemplateColumns.split(' ').length;
    });
    expect(gridColumns).toBe(2);

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint5-story-01/responsive-tablet-2col.png',
      fullPage: true
    });
  });

  /**
   * RESPONSIVE: Desktop (1920px) - 4 Column Grid
   * Test responsive behavior on large desktop
   */
  test('Responsive: Desktop shows 4-column grid', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });

    await page.goto(SHOP_URL);
    await page.waitForSelector('.product-grid');

    // Verify grid shows 4 columns on desktop
    const gridColumns = await page.locator('.product-grid').evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.gridTemplateColumns.split(' ').length;
    });
    expect(gridColumns).toBe(4);

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint5-story-01/responsive-desktop-4col.png',
      fullPage: true
    });
  });

  /**
   * LOADING STATE: Initial Load
   * Test loading state appears during initial product fetch
   */
  test('Loading: Loading state shows during product fetch', async ({ page }) => {
    await page.goto(SHOP_URL);

    // Check if loading state appears (may be very quick)
    const loadingState = page.locator('.loading-state');

    // Wait for either loading state or products
    await Promise.race([
      loadingState.waitFor({ state: 'visible', timeout: 1000 }).catch(() => {}),
      page.locator('.product-grid').waitFor({ timeout: 5000 })
    ]);

    // Verify products eventually load
    await expect(page.locator('.product-grid')).toBeVisible();

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint5-story-01/loading-state.png'
    });
  });
});
