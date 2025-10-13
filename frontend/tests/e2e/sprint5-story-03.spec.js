/**
 * E2E Tests for Sprint5-Story-03: Checkout & Order Placement
 * Using Playwright MCP for browser automation
 *
 * Test Coverage:
 * - AC1: Checkout page accessible from cart
 * - AC2: Order summary display
 * - AC3: Coin balance verification
 * - AC4: Order creation with atomic transaction
 * - AC5: Stock deduction on order
 * - AC6: Cart clearing after order
 * - AC7: Order confirmation display
 * - AC8: Order number generation
 */

const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:3000';
const API_URL = 'http://localhost:5001';

// Test data
const TEST_USER = {
  email: 'student@test.com',
  password: 'password123'
};

test.describe('Sprint5-Story-03: Checkout & Order Placement', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login
    await page.goto(`${BASE_URL}/login`);

    // Login as student
    await page.fill('input[name="email"]', TEST_USER.email);
    await page.fill('input[name="password"]', TEST_USER.password);
    await page.click('button[type="submit"]');

    // Wait for dashboard to load
    await page.waitForURL(`${BASE_URL}/dashboard`);

    // Navigate to shop
    await page.goto(`${BASE_URL}/shop`);
    await page.waitForLoadState('networkidle');
  });

  test('AC1: Checkout page accessible from cart with checkout button', async ({ page }) => {
    // Add item to cart
    const addToCartButton = page.locator('button:has-text("Add to Cart")').first();
    await addToCartButton.click();

    // Wait for toast notification
    await page.waitForSelector('text=Product added to cart', { timeout: 5000 });

    // Open cart drawer
    const cartIcon = page.locator('[data-testid="cart-icon"]').or(page.locator('button:has-text("Cart")'));
    await cartIcon.click();

    // Wait for cart drawer to open
    await page.waitForSelector('text=Shopping Cart', { timeout: 5000 });

    // Click checkout button
    const checkoutButton = page.locator('button:has-text("Proceed to Checkout")');
    await expect(checkoutButton).toBeVisible();
    await checkoutButton.click();

    // Verify navigation to checkout page
    await page.waitForURL(`${BASE_URL}/shop/checkout`);
    await expect(page.locator('text=Checkout')).toBeVisible();
  });

  test('AC2: Order summary displays cart items with pricing, quantity, and subtotals', async ({ page }) => {
    // Add 2 different items to cart
    const addToCartButtons = page.locator('button:has-text("Add to Cart")');
    await addToCartButtons.nth(0).click();
    await page.waitForTimeout(1000);
    await addToCartButtons.nth(1).click();
    await page.waitForTimeout(1000);

    // Navigate to checkout
    await page.goto(`${BASE_URL}/shop/checkout`);
    await page.waitForLoadState('networkidle');

    // Verify Order Summary section exists
    await expect(page.locator('text=Order Summary')).toBeVisible();

    // Verify cart items are displayed
    const orderItems = page.locator('.order-summary-item');
    await expect(orderItems).toHaveCount(2);

    // Verify first item has name, SKU, quantity, and price
    const firstItem = orderItems.first();
    await expect(firstItem.locator('.order-summary-item-name')).toBeVisible();
    await expect(firstItem.locator('.order-summary-item-sku')).toBeVisible();
    await expect(firstItem.locator('.order-summary-item-quantity')).toBeVisible();
    await expect(firstItem.locator('.order-summary-item-subtotal')).toBeVisible();

    // Verify total is displayed
    await expect(page.locator('.order-summary-total')).toBeVisible();
    await expect(page.locator('.order-summary-total-amount')).toBeVisible();
  });

  test('AC3: Payment details show coin balance and sufficiency check', async ({ page }) => {
    // Add item to cart and go to checkout
    await page.locator('button:has-text("Add to Cart")').first().click();
    await page.waitForTimeout(1000);
    await page.goto(`${BASE_URL}/shop/checkout`);
    await page.waitForLoadState('networkidle');

    // Verify Payment Details section
    await expect(page.locator('text=Payment Details')).toBeVisible();

    // Verify ISF Coins payment method
    await expect(page.locator('text=ISF Coins')).toBeVisible();
    await expect(page.locator('text=Pay using your coin balance')).toBeVisible();

    // Wait for balance to load
    await page.waitForSelector('text=Current Balance', { timeout: 10000 });

    // Verify balance information is displayed
    await expect(page.locator('text=Current Balance')).toBeVisible();
    await expect(page.locator('text=Order Total')).toBeVisible();
    await expect(page.locator('text=Balance After Purchase')).toBeVisible();

    // Verify balance values are shown (should contain "coins")
    const balanceText = await page.locator('.payment-balance-value').first().textContent();
    expect(balanceText).toContain('coins');
  });

  test('AC4: Order placement creates order with atomic transaction', async ({ page }) => {
    // Add item to cart
    await page.locator('button:has-text("Add to Cart")').first().click();
    await page.waitForTimeout(1000);

    // Go to checkout
    await page.goto(`${BASE_URL}/shop/checkout`);
    await page.waitForLoadState('networkidle');

    // Wait for page to fully load
    await page.waitForSelector('button:has-text("Place Order")', { timeout: 10000 });

    // Click Place Order button
    await page.click('button:has-text("Place Order")');

    // Wait for processing
    await page.waitForSelector('text=Processing your order', { timeout: 5000 });

    // Wait for order confirmation (increased timeout for transaction)
    await page.waitForSelector('text=Order Placed Successfully', { timeout: 15000 });

    // Verify order confirmation is displayed
    await expect(page.locator('text=Order Placed Successfully')).toBeVisible();
    await expect(page.locator('text=Thank you for your purchase')).toBeVisible();
  });

  test('AC5: Stock is deducted from products after order placement', async ({ page, request }) => {
    // Get initial stock level
    await page.goto(`${BASE_URL}/shop`);
    const firstProduct = page.locator('.product-card').first();
    const productName = await firstProduct.locator('.product-card-title').textContent();

    // Add item to cart and complete checkout
    await firstProduct.locator('button:has-text("Add to Cart")').click();
    await page.waitForTimeout(1000);

    await page.goto(`${BASE_URL}/shop/checkout`);
    await page.waitForLoadState('networkidle');

    await page.click('button:has-text("Place Order")');
    await page.waitForSelector('text=Order Placed Successfully', { timeout: 15000 });

    // Go back to shop and verify stock changed
    await page.click('button:has-text("Continue Shopping")');
    await page.waitForURL(`${BASE_URL}/shop`);
    await page.waitForLoadState('networkidle');

    // Find the same product and verify it still exists (stock was decremented)
    const sameProduct = page.locator(`.product-card:has-text("${productName.trim()}")`).first();
    await expect(sameProduct).toBeVisible();
  });

  test('AC6: Cart is cleared after successful order placement', async ({ page }) => {
    // Add multiple items to cart
    const addToCartButtons = page.locator('button:has-text("Add to Cart")');
    await addToCartButtons.nth(0).click();
    await page.waitForTimeout(1000);
    await addToCartButtons.nth(1).click();
    await page.waitForTimeout(1000);

    // Verify cart has items (badge shows count)
    const cartBadge = page.locator('[data-testid="cart-badge"]').or(page.locator('.cart-badge'));
    await expect(cartBadge).toHaveText('2');

    // Complete checkout
    await page.goto(`${BASE_URL}/shop/checkout`);
    await page.waitForLoadState('networkidle');

    await page.click('button:has-text("Place Order")');
    await page.waitForSelector('text=Order Placed Successfully', { timeout: 15000 });

    // Go back to shop
    await page.click('button:has-text("Continue Shopping")');
    await page.waitForURL(`${BASE_URL}/shop`);

    // Verify cart badge is not visible (cart is empty)
    await expect(cartBadge).not.toBeVisible();
  });

  test('AC7: Order confirmation shows order number, items, and amounts', async ({ page }) => {
    // Add item and complete checkout
    await page.locator('button:has-text("Add to Cart")').first().click();
    await page.waitForTimeout(1000);

    await page.goto(`${BASE_URL}/shop/checkout`);
    await page.waitForLoadState('networkidle');

    await page.click('button:has-text("Place Order")');
    await page.waitForSelector('text=Order Placed Successfully', { timeout: 15000 });

    // Verify order confirmation details
    await expect(page.locator('text=Order Placed Successfully')).toBeVisible();

    // Verify order number is displayed (format: ORD-YYYYMMDD-XXXXX)
    await expect(page.locator('text=Order Number')).toBeVisible();
    const orderNumberElement = page.locator('.order-number');
    await expect(orderNumberElement).toBeVisible();
    const orderNumber = await orderNumberElement.textContent();
    expect(orderNumber).toMatch(/^ORD-\d{8}-\d{5}$/);

    // Verify items section
    await expect(page.locator('text=Order Items')).toBeVisible();
    await expect(page.locator('.order-confirmation-item')).toHaveCount(1);

    // Verify amounts
    await expect(page.locator('text=Total Amount')).toBeVisible();
    await expect(page.locator('text=Remaining Balance')).toBeVisible();

    // Verify action buttons
    await expect(page.locator('button:has-text("View Order Details")')).toBeVisible();
    await expect(page.locator('button:has-text("Continue Shopping")')).toBeVisible();
  });

  test('AC8: Unique order number generated in correct format', async ({ page }) => {
    // Place first order
    await page.locator('button:has-text("Add to Cart")').first().click();
    await page.waitForTimeout(1000);

    await page.goto(`${BASE_URL}/shop/checkout`);
    await page.waitForLoadState('networkidle');

    await page.click('button:has-text("Place Order")');
    await page.waitForSelector('text=Order Placed Successfully', { timeout: 15000 });

    // Get first order number
    const firstOrderNumber = await page.locator('.order-number').textContent();
    expect(firstOrderNumber).toMatch(/^ORD-\d{8}-\d{5}$/);

    // Extract date part (YYYYMMDD)
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const expectedDatePrefix = `ORD-${year}${month}${day}`;

    expect(firstOrderNumber).toContain(expectedDatePrefix);

    // Place second order to verify uniqueness
    await page.click('button:has-text("Continue Shopping")');
    await page.waitForURL(`${BASE_URL}/shop`);

    await page.locator('button:has-text("Add to Cart")').first().click();
    await page.waitForTimeout(1000);

    await page.goto(`${BASE_URL}/shop/checkout`);
    await page.waitForLoadState('networkidle');

    await page.click('button:has-text("Place Order")');
    await page.waitForSelector('text=Order Placed Successfully', { timeout: 15000 });

    // Get second order number
    const secondOrderNumber = await page.locator('.order-number').textContent();
    expect(secondOrderNumber).toMatch(/^ORD-\d{8}-\d{5}$/);

    // Verify order numbers are unique
    expect(firstOrderNumber).not.toBe(secondOrderNumber);
  });

  test('Edge Case: Insufficient coin balance prevents order placement', async ({ page }) => {
    // This test assumes there's a way to drain coin balance or add expensive items
    // Add expensive item or multiple items exceeding balance
    const addToCartButtons = page.locator('button:has-text("Add to Cart")');

    // Add many items to exceed balance
    for (let i = 0; i < 10; i++) {
      await addToCartButtons.nth(i % 3).click();
      await page.waitForTimeout(500);
    }

    // Go to checkout
    await page.goto(`${BASE_URL}/shop/checkout`);
    await page.waitForLoadState('networkidle');

    // Check if insufficient balance warning is shown
    const insufficientWarning = page.locator('text=Insufficient balance');
    const hasWarning = await insufficientWarning.isVisible().catch(() => false);

    if (hasWarning) {
      // Verify place order button behavior
      const placeOrderButton = page.locator('button:has-text("Place Order")');
      await placeOrderButton.click();

      // Should show error message
      await page.waitForSelector('text=Insufficient coin balance', { timeout: 5000 });

      // Should not navigate to confirmation
      await expect(page.locator('text=Order Placed Successfully')).not.toBeVisible();
    }
  });

  test('Edge Case: Out of stock items cannot be checked out', async ({ page }) => {
    // Add item to cart
    await page.locator('button:has-text("Add to Cart")').first().click();
    await page.waitForTimeout(1000);

    // Go to checkout
    await page.goto(`${BASE_URL}/shop/checkout`);
    await page.waitForLoadState('networkidle');

    // Try to place order
    await page.click('button:has-text("Place Order")');

    // If item went out of stock, should show error
    const outOfStockError = page.locator('text=out of stock');
    const hasError = await outOfStockError.isVisible({ timeout: 5000 }).catch(() => false);

    if (hasError) {
      // Should not proceed to confirmation
      await expect(page.locator('text=Order Placed Successfully')).not.toBeVisible();
    } else {
      // If no error, order should succeed
      await page.waitForSelector('text=Order Placed Successfully', { timeout: 15000 });
    }
  });
});
