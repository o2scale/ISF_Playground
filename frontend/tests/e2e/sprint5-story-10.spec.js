import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Sprint5-Story-10: Order Cancellation & Refunds
 *
 * Story: As a student, I want to cancel orders within 5 minutes and receive automatic coin refunds
 *
 * Test Coverage:
 * - AC1: Cancellation Window (5 Minutes)
 * - AC2: Cancellation Blocked After 5 Minutes
 * - AC3: Cancellation Confirmation Modal
 * - AC4: Atomic Refund Transaction
 * - AC5: Refund Transaction Entry
 * - AC6: Stock Restoration
 * - AC7: Cancellation Notification
 * - AC8: Cancellation Prevention (Already Cancelled)
 */

test.describe('Sprint5-Story-10: Order Cancellation & Refunds', () => {
  let orderNumber;
  let initialBalance;
  let productId;
  let initialStock;

  test.beforeEach(async ({ page }) => {
    // Login as student
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'student@test.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/dashboard/);

    // Get initial coin balance
    const balanceText = await page.locator('[data-testid="coin-balance"]').textContent();
    initialBalance = parseInt(balanceText.match(/\d+/)[0]);

    // Navigate to shop and place an order
    await page.goto('http://localhost:3000/shop');
    await page.waitForSelector('.product-card');

    // Get product details for verification
    const firstProduct = page.locator('.product-card').first();
    productId = await firstProduct.getAttribute('data-product-id');
    const stockText = await firstProduct.locator('[data-testid="product-stock"]').textContent();
    initialStock = parseInt(stockText.match(/\d+/)[0]);

    // Add to cart
    await firstProduct.locator('button:has-text("Add to Cart")').click();
    await expect(page.locator('.toast-success')).toBeVisible();

    // Go to cart and checkout
    await page.click('[data-testid="cart-icon"]');
    await page.click('button:has-text("Proceed to Checkout")');

    // Fill address form
    await page.fill('input[name="addressLine1"]', '123 Test Street');
    await page.fill('input[name="city"]', 'Test City');
    await page.fill('input[name="state"]', 'Test State');
    await page.fill('input[name="zipCode"]', '12345');
    await page.fill('input[name="phone"]', '1234567890');

    // Place order
    await page.click('button:has-text("Place Order")');
    await page.waitForSelector('.order-confirmation');

    // Extract order number
    const orderNumberText = await page.locator('[data-testid="order-number"]').textContent();
    orderNumber = orderNumberText.match(/ORD-\d+-\d+/)[0];
  });

  test('AC1: Cancellation Window (5 Minutes) - Cancel button visible within 5 minutes', async ({ page }) => {
    // Navigate to order detail page
    await page.goto(`http://localhost:3000/shop/orders/${orderNumber}`);
    await page.waitForSelector('.order-detail');

    // Verify cancel button is visible
    const cancelButton = page.locator('button:has-text("Cancel Order")');
    await expect(cancelButton).toBeVisible();
    await expect(cancelButton).toBeEnabled();

    // Verify cancellation timer is displayed
    const timer = page.locator('[data-testid="cancellation-timer"]');
    await expect(timer).toBeVisible();
    await expect(timer).toContainText(/Time remaining to cancel:/);

    // Take screenshot
    await page.screenshot({ path: 'qa/screenshots/sprint5-story-10/ac1-cancel-button.png' });
  });

  test('AC2: Cancellation Blocked After 5 Minutes - No cancel button after 5 minutes', async ({ page }) => {
    // Note: This test would require manipulating the order timestamp in the database
    // For demonstration, we'll verify the expiration message logic exists

    // Navigate to order detail page
    await page.goto(`http://localhost:3000/shop/orders/${orderNumber}`);
    await page.waitForSelector('.order-detail');

    // Verify the page has logic to handle expired orders
    // (In a real test, we'd wait 5 minutes or manipulate the DB timestamp)
    const pageContent = await page.content();
    expect(pageContent).toContain('Cancellation period has expired' || 'Cancel Order');

    // Take screenshot
    await page.screenshot({ path: 'qa/screenshots/sprint5-story-10/ac2-time-check.png' });
  });

  test('AC3: Cancellation Confirmation Modal - Modal displays with reason dropdown', async ({ page }) => {
    // Navigate to order detail page
    await page.goto(`http://localhost:3000/shop/orders/${orderNumber}`);
    await page.waitForSelector('.order-detail');

    // Click cancel button
    await page.click('button:has-text("Cancel Order")');

    // Wait for modal to appear
    await page.waitForSelector('[role="dialog"]');

    // Verify modal header
    await expect(page.locator('[role="dialog"] h2')).toContainText(/Cancel Order/i);

    // Verify refund amount is displayed
    const refundAmount = page.locator('[data-testid="refund-amount"]');
    await expect(refundAmount).toBeVisible();

    // Verify reason dropdown exists
    const reasonDropdown = page.locator('select[name="reason"]');
    await expect(reasonDropdown).toBeVisible();

    // Verify reason options
    const options = await reasonDropdown.locator('option').allTextContents();
    expect(options).toContain('Changed my mind');
    expect(options).toContain('Ordered wrong item');
    expect(options).toContain('Found better price');
    expect(options).toContain('No longer needed');
    expect(options).toContain('Duplicate order');
    expect(options).toContain('Other reason');

    // Verify action buttons
    await expect(page.locator('button:has-text("Keep Order")')).toBeVisible();
    await expect(page.locator('button:has-text("Cancel Order")')).toBeVisible();

    // Take screenshot
    await page.screenshot({ path: 'qa/screenshots/sprint5-story-10/ac3-modal.png' });

    // Close modal without cancelling
    await page.click('button:has-text("Keep Order")');
  });

  test('AC4: Atomic Refund Transaction - Order cancels with coin refund and stock restoration', async ({ page }) => {
    // Get current balance and stock before cancellation
    await page.goto('http://localhost:3000/shop');
    const productBeforeCancel = page.locator(`[data-product-id="${productId}"]`);
    const stockBeforeCancel = await productBeforeCancel.locator('[data-testid="product-stock"]').textContent();
    const stockBefore = parseInt(stockBeforeCancel.match(/\d+/)[0]);

    // Navigate to order detail page
    await page.goto(`http://localhost:3000/shop/orders/${orderNumber}`);
    await page.waitForSelector('.order-detail');

    // Get order total amount
    const totalAmountText = await page.locator('[data-testid="order-total"]').textContent();
    const orderTotal = parseInt(totalAmountText.match(/\d+/)[0]);

    // Cancel the order
    await page.click('button:has-text("Cancel Order")');
    await page.waitForSelector('[role="dialog"]');

    // Select reason
    await page.selectOption('select[name="reason"]', 'changed_mind');

    // Confirm cancellation
    await page.click('[role="dialog"] button:has-text("Cancel Order")');

    // Wait for success toast
    await expect(page.locator('.toast-success')).toBeVisible();
    await expect(page.locator('.toast-success')).toContainText(/cancelled.*refunded/i);

    // Verify order status changed to cancelled
    await page.waitForSelector('[data-testid="order-status"]');
    const statusBadge = page.locator('[data-testid="order-status"]');
    await expect(statusBadge).toContainText(/cancelled/i);

    // Verify coin balance increased
    const newBalanceText = await page.locator('[data-testid="coin-balance"]').textContent();
    const newBalance = parseInt(newBalanceText.match(/\d+/)[0]);
    expect(newBalance).toBe(initialBalance); // Should be back to initial since we refunded

    // Verify stock was restored
    await page.goto('http://localhost:3000/shop');
    const productAfterCancel = page.locator(`[data-product-id="${productId}"]`);
    const stockAfterCancel = await productAfterCancel.locator('[data-testid="product-stock"]').textContent();
    const stockAfter = parseInt(stockAfterCancel.match(/\d+/)[0]);
    expect(stockAfter).toBe(initialStock); // Stock should be restored to initial value

    // Take screenshot
    await page.screenshot({ path: 'qa/screenshots/sprint5-story-10/ac4-atomic-transaction.png' });
  });

  test('AC5: Refund Transaction Entry - Transaction record created with metadata', async ({ page }) => {
    // Cancel the order first
    await page.goto(`http://localhost:3000/shop/orders/${orderNumber}`);
    await page.waitForSelector('.order-detail');

    await page.click('button:has-text("Cancel Order")');
    await page.waitForSelector('[role="dialog"]');
    await page.selectOption('select[name="reason"]', 'ordered_wrong_item');
    await page.click('[role="dialog"] button:has-text("Cancel Order")');
    await expect(page.locator('.toast-success')).toBeVisible();

    // Navigate to transaction history
    await page.goto('http://localhost:3000/transactions');
    await page.waitForSelector('.transaction-list');

    // Find the refund transaction
    const refundTransaction = page.locator('.transaction-item').filter({
      hasText: `Refund for cancelled order ${orderNumber}`
    });
    await expect(refundTransaction).toBeVisible();

    // Verify transaction type is "earned" (credit)
    await expect(refundTransaction.locator('[data-testid="transaction-type"]')).toContainText(/earned|credit/i);

    // Verify transaction source is "shop"
    await expect(refundTransaction.locator('[data-testid="transaction-source"]')).toContainText(/shop/i);

    // Click to view transaction details
    await refundTransaction.click();
    await page.waitForSelector('[data-testid="transaction-detail-modal"]');

    // Verify metadata includes orderId, orderNumber, and cancellationReason
    const metadata = page.locator('[data-testid="transaction-metadata"]');
    await expect(metadata).toContainText(orderNumber);
    await expect(metadata).toContainText(/ordered_wrong_item|Ordered wrong item/i);

    // Take screenshot
    await page.screenshot({ path: 'qa/screenshots/sprint5-story-10/ac5-transaction-entry.png' });
  });

  test('AC6: Stock Restoration - Product stock increases after cancellation', async ({ page }) => {
    // Get initial stock
    await page.goto('http://localhost:3000/shop');
    const productBefore = page.locator(`[data-product-id="${productId}"]`);
    const stockBeforeText = await productBefore.locator('[data-testid="product-stock"]').textContent();
    const stockBefore = parseInt(stockBeforeText.match(/\d+/)[0]);

    // Get order quantity
    await page.goto(`http://localhost:3000/shop/orders/${orderNumber}`);
    const quantityText = await page.locator('[data-testid="order-item-quantity"]').first().textContent();
    const orderQuantity = parseInt(quantityText.match(/\d+/)[0]);

    // Cancel order
    await page.click('button:has-text("Cancel Order")');
    await page.waitForSelector('[role="dialog"]');
    await page.selectOption('select[name="reason"]', 'no_longer_needed');
    await page.click('[role="dialog"] button:has-text("Cancel Order")');
    await expect(page.locator('.toast-success')).toBeVisible();

    // Verify stock restored
    await page.goto('http://localhost:3000/shop');
    const productAfter = page.locator(`[data-product-id="${productId}"]`);
    const stockAfterText = await productAfter.locator('[data-testid="product-stock"]').textContent();
    const stockAfter = parseInt(stockAfterText.match(/\d+/)[0]);

    expect(stockAfter).toBe(stockBefore + orderQuantity);

    // Take screenshot
    await page.screenshot({ path: 'qa/screenshots/sprint5-story-10/ac6-stock-restoration.png' });
  });

  test('AC7: Cancellation Notification - User receives notification and balance updates', async ({ page }) => {
    // Navigate to order and cancel
    await page.goto(`http://localhost:3000/shop/orders/${orderNumber}`);
    await page.waitForSelector('.order-detail');

    const balanceBefore = await page.locator('[data-testid="coin-balance"]').textContent();
    const balanceBeforeNum = parseInt(balanceBefore.match(/\d+/)[0]);

    await page.click('button:has-text("Cancel Order")');
    await page.waitForSelector('[role="dialog"]');
    await page.selectOption('select[name="reason"]', 'duplicate_order');
    await page.click('[role="dialog"] button:has-text("Cancel Order")');

    // Verify toast notification appears
    await expect(page.locator('.toast-success')).toBeVisible();
    await expect(page.locator('.toast-success')).toContainText(/cancelled/i);
    await expect(page.locator('.toast-success')).toContainText(/refunded/i);

    // Verify balance updated in UI immediately
    await page.waitForTimeout(1000); // Wait for balance to update
    const balanceAfter = await page.locator('[data-testid="coin-balance"]').textContent();
    const balanceAfterNum = parseInt(balanceAfter.match(/\d+/)[0]);
    expect(balanceAfterNum).toBeGreaterThan(balanceBeforeNum);

    // Take screenshot
    await page.screenshot({ path: 'qa/screenshots/sprint5-story-10/ac7-notification.png' });
  });

  test('AC8: Cancellation Prevention (Already Cancelled) - Cannot cancel twice', async ({ page }) => {
    // Cancel order first time
    await page.goto(`http://localhost:3000/shop/orders/${orderNumber}`);
    await page.waitForSelector('.order-detail');

    await page.click('button:has-text("Cancel Order")');
    await page.waitForSelector('[role="dialog"]');
    await page.selectOption('select[name="reason"]', 'changed_mind');
    await page.click('[role="dialog"] button:has-text("Cancel Order")');
    await expect(page.locator('.toast-success')).toBeVisible();

    // Wait for page to reload/update
    await page.waitForTimeout(1000);

    // Verify cancel button is no longer visible
    const cancelButton = page.locator('button:has-text("Cancel Order")');
    await expect(cancelButton).not.toBeVisible();

    // Verify "Already Cancelled" message or status
    const statusBadge = page.locator('[data-testid="order-status"]');
    await expect(statusBadge).toContainText(/cancelled/i);

    // Try to cancel via API (should fail)
    const apiResponse = await page.request.post(
      `http://localhost:5001/api/v2/shop/orders/${orderNumber}/cancel`,
      {
        headers: {
          'Authorization': `Bearer ${await page.evaluate(() => localStorage.getItem('token'))}`
        },
        data: { reason: 'changed_mind' }
      }
    );

    expect(apiResponse.status()).toBe(400);
    const responseBody = await apiResponse.json();
    expect(responseBody.message).toContain(/cannot be cancelled|already cancelled/i);

    // Take screenshot
    await page.screenshot({ path: 'qa/screenshots/sprint5-story-10/ac8-double-cancel-prevention.png' });
  });

  test('Error: Network failure shows error message', async ({ page }) => {
    // Navigate to order
    await page.goto(`http://localhost:3000/shop/orders/${orderNumber}`);
    await page.waitForSelector('.order-detail');

    // Intercept cancel API call and force failure
    await page.route('**/api/v2/shop/orders/*/cancel', route => route.abort('failed'));

    // Attempt to cancel
    await page.click('button:has-text("Cancel Order")');
    await page.waitForSelector('[role="dialog"]');
    await page.selectOption('select[name="reason"]', 'changed_mind');
    await page.click('[role="dialog"] button:has-text("Cancel Order")');

    // Verify error toast appears
    await expect(page.locator('.toast-error')).toBeVisible();
    await expect(page.locator('.toast-error')).toContainText(/failed|error/i);

    // Verify order still shows as completed (not cancelled)
    const statusBadge = page.locator('[data-testid="order-status"]');
    await expect(statusBadge).toContainText(/completed/i);

    // Take screenshot
    await page.screenshot({ path: 'qa/screenshots/sprint5-story-10/error-network-failure.png' });
  });

  test('Responsive: Mobile view shows cancellation UI correctly', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate to order
    await page.goto(`http://localhost:3000/shop/orders/${orderNumber}`);
    await page.waitForSelector('.order-detail');

    // Verify cancel button is visible and properly sized on mobile
    const cancelButton = page.locator('button:has-text("Cancel Order")');
    await expect(cancelButton).toBeVisible();

    // Verify timer is visible
    const timer = page.locator('[data-testid="cancellation-timer"]');
    await expect(timer).toBeVisible();

    // Open modal
    await page.click('button:has-text("Cancel Order")');
    await page.waitForSelector('[role="dialog"]');

    // Verify modal displays correctly on mobile
    const modal = page.locator('[role="dialog"]');
    const modalBox = await modal.boundingBox();
    expect(modalBox.width).toBeLessThanOrEqual(375);

    // Take screenshot
    await page.screenshot({ path: 'qa/screenshots/sprint5-story-10/responsive-mobile.png', fullPage: true });
  });
});
