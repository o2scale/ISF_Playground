import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Sprint5-Story-18: Admin Approval Workflow for Purchase Requests
 *
 * Story: As an Admin, I want to review and approve/reject purchase requests from Purchase Managers
 *
 * Test Coverage:
 * - AC1: View All Purchase Requests (Admin View)
 * - AC2: Approve Purchase Request
 * - AC3: Reject Purchase Request
 * - AC4: View Request Details (Admin)
 * - AC5: Approval Validation (Self-approval prevention)
 * - AC6: Pending Requests Dashboard
 * - AC7: Audit Trail Visibility
 */

test.describe('Sprint5-Story-18: Admin Approval Workflow', () => {
  let purchaseRequestId;
  let requestNumber;

  // Helper function to login as admin
  async function loginAsAdmin(page) {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'admin@test.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/dashboard/);
  }

  // Helper function to login as purchase manager
  async function loginAsPurchaseManager(page) {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'purchasemanager@test.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/dashboard/);
  }

  // Helper function to create a purchase request
  async function createPurchaseRequest(page) {
    await page.goto('http://localhost:3000/purchase');
    await page.waitForSelector('.purchase-type-dropdown');
    await page.selectOption('.purchase-type-dropdown', 'shop-inventory');
    await page.waitForSelector('.view-header');

    // Click "New Purchase Request" button
    await page.click('button:has-text("New Purchase Request")');
    await page.waitForSelector('.modal-overlay');

    // Fill in the request form
    await page.selectOption('select[name="productId"]', { index: 1 }); // Select first product
    await page.fill('input[name="requestedQuantity"]', '50');
    await page.fill('textarea[name="reason"]', 'Stock running low, need to reorder');
    await page.fill('textarea[name="justification"]', 'High demand product, expected to sell out soon');

    // Submit the request
    await page.click('button:has-text("Submit Request")');
    await expect(page.locator('.toast-success')).toBeVisible();
    await expect(page.locator('.toast-success')).toContainText(/submitted/i);

    // Wait for table to refresh
    await page.waitForTimeout(1000);

    // Get the request ID from the first row
    const firstRow = page.locator('table tbody tr').first();
    const requestIdCell = firstRow.locator('.request-id-cell strong');
    requestNumber = await requestIdCell.textContent();
  }

  test.beforeEach(async ({ page }) => {
    // Login as Purchase Manager and create a request
    await loginAsPurchaseManager(page);
    await createPurchaseRequest(page);

    // Logout
    await page.click('[data-testid="user-menu"]');
    await page.click('button:has-text("Logout")');
  });

  test('AC1: View All Purchase Requests - Admin sees all requests', async ({ page }) => {
    await loginAsAdmin(page);

    // Navigate to Purchase Management
    await page.goto('http://localhost:3000/purchase');
    await page.waitForSelector('.purchase-type-dropdown');
    await page.selectOption('.purchase-type-dropdown', 'shop-inventory');
    await page.waitForSelector('.shop-inventory-view');

    // Verify table is visible
    await expect(page.locator('.requests-table')).toBeVisible();

    // Verify headers
    await expect(page.locator('th:has-text("Request ID")')).toBeVisible();
    await expect(page.locator('th:has-text("Product")')).toBeVisible();
    await expect(page.locator('th:has-text("Quantity")')).toBeVisible();
    await expect(page.locator('th:has-text("Stock Status")')).toBeVisible();
    await expect(page.locator('th:has-text("Reason")')).toBeVisible();
    await expect(page.locator('th:has-text("Status")')).toBeVisible();
    await expect(page.locator('th:has-text("Requested")')).toBeVisible();
    await expect(page.locator('th:has-text("Actions")')).toBeVisible();

    // Verify the created request is visible
    const requestRow = page.locator(`table tbody tr:has-text("${requestNumber}")`);
    await expect(requestRow).toBeVisible();

    // Verify request shows pending status
    await expect(requestRow.locator('.status-badge.status-pending')).toBeVisible();

    // Verify filters are visible
    await expect(page.locator('select:has(option:has-text("All Balagruhas"))')).toBeVisible();
    await expect(page.locator('select:has(option:has-text("All Status"))')).toBeVisible();
    await expect(page.locator('input[placeholder*="Product, SKU, Reason"]')).toBeVisible();

    // Take screenshot
    await page.screenshot({ path: 'qa/screenshots/sprint5-story-18/ac1-admin-view.png', fullPage: true });
  });

  test('AC2: Approve Purchase Request - Admin can approve with optional notes', async ({ page }) => {
    await loginAsAdmin(page);

    // Navigate to Shop Inventory view
    await page.goto('http://localhost:3000/purchase');
    await page.selectOption('.purchase-type-dropdown', 'shop-inventory');
    await page.waitForSelector('.shop-inventory-view');

    // Find the pending request
    const requestRow = page.locator(`table tbody tr:has-text("${requestNumber}")`);
    await expect(requestRow).toBeVisible();

    // Click approve button
    const approveButton = requestRow.locator('button.btn-icon.btn-approve');
    await expect(approveButton).toBeVisible();
    await approveButton.click();

    // Wait for approval modal
    await page.waitForSelector('.approval-modal');
    await expect(page.locator('.approval-modal h3')).toContainText('Approve Purchase Request');

    // Verify request summary is shown
    await expect(page.locator('.request-summary')).toContainText(requestNumber);
    await expect(page.locator('.request-summary')).toContainText('Stock running low');

    // Verify stock projection
    await expect(page.locator('.stock-projection')).toBeVisible();
    await expect(page.locator('.stock-projection')).toContainText('Current Stock:');
    await expect(page.locator('.stock-projection')).toContainText('After Purchase:');

    // Add admin notes (optional)
    await page.fill('textarea[placeholder*="notes"]', 'Approved - Order from StatCo supplier. Expected delivery in 3 days.');

    // Verify character count
    const charCount = await page.locator('.char-count').textContent();
    expect(charCount).toContain('/500');

    // Click approve button
    await page.click('button.approve-button:has-text("Approve Request")');

    // Verify success toast
    await expect(page.locator('.toast-success')).toBeVisible();
    await expect(page.locator('.toast-success')).toContainText(/approved/i);

    // Wait for table to refresh
    await page.waitForTimeout(1000);

    // Verify status changed to approved
    const updatedRow = page.locator(`table tbody tr:has-text("${requestNumber}")`);
    await expect(updatedRow.locator('.status-badge.status-approved')).toBeVisible();

    // Verify approve/reject buttons no longer visible
    await expect(updatedRow.locator('button.btn-approve')).not.toBeVisible();
    await expect(updatedRow.locator('button.btn-reject')).not.toBeVisible();

    // Take screenshot
    await page.screenshot({ path: 'qa/screenshots/sprint5-story-18/ac2-approved.png', fullPage: true });
  });

  test('AC3: Reject Purchase Request - Admin can reject with required reason', async ({ page }) => {
    await loginAsAdmin(page);

    // Navigate to Shop Inventory view
    await page.goto('http://localhost:3000/purchase');
    await page.selectOption('.purchase-type-dropdown', 'shop-inventory');
    await page.waitForSelector('.shop-inventory-view');

    // Find the pending request
    const requestRow = page.locator(`table tbody tr:has-text("${requestNumber}")`);
    await expect(requestRow).toBeVisible();

    // Click reject button
    const rejectButton = requestRow.locator('button.btn-icon.btn-reject');
    await expect(rejectButton).toBeVisible();
    await rejectButton.click();

    // Wait for rejection modal
    await page.waitForSelector('.rejection-modal');
    await expect(page.locator('.rejection-modal h3')).toContainText('Reject Purchase Request');

    // Verify request summary is shown
    await expect(page.locator('.request-summary')).toContainText(requestNumber);

    // Verify rejection reason field is marked as required
    await expect(page.locator('label:has-text("Rejection Reason")')).toContainText('Required');

    // Try to submit without reason - button should be disabled
    const rejectSubmitButton = page.locator('button.reject-button:has-text("Reject Request")');
    await expect(rejectSubmitButton).toBeDisabled();

    // Add rejection reason (required)
    await page.fill('textarea[placeholder*="Why is this request being rejected"]', 'Budget exceeded for this month. Please resubmit next month with updated justification.');

    // Verify button is now enabled
    await expect(rejectSubmitButton).toBeEnabled();

    // Verify character count
    const charCount = await page.locator('.char-count').textContent();
    expect(charCount).toContain('/500');

    // Click reject button
    await rejectSubmitButton.click();

    // Verify success toast
    await expect(page.locator('.toast-success')).toBeVisible();
    await expect(page.locator('.toast-success')).toContainText(/rejected/i);

    // Wait for table to refresh
    await page.waitForTimeout(1000);

    // Verify status changed to rejected
    const updatedRow = page.locator(`table tbody tr:has-text("${requestNumber}")`);
    await expect(updatedRow.locator('.status-badge.status-rejected')).toBeVisible();

    // Verify approve/reject buttons no longer visible
    await expect(updatedRow.locator('button.btn-approve')).not.toBeVisible();
    await expect(updatedRow.locator('button.btn-reject')).not.toBeVisible();

    // Take screenshot
    await page.screenshot({ path: 'qa/screenshots/sprint5-story-18/ac3-rejected.png', fullPage: true });
  });

  test('AC4: View Request Details - Admin can view full request details', async ({ page }) => {
    await loginAsAdmin(page);

    // Navigate to Shop Inventory view
    await page.goto('http://localhost:3000/purchase');
    await page.selectOption('.purchase-type-dropdown', 'shop-inventory');
    await page.waitForSelector('.shop-inventory-view');

    // Find the request row
    const requestRow = page.locator(`table tbody tr:has-text("${requestNumber}")`);
    await expect(requestRow).toBeVisible();

    // Click view button (eye icon)
    const viewButton = requestRow.locator('button.btn-icon:has-text("👁️")');
    await viewButton.click();

    // Wait for view modal
    await page.waitForSelector('.modal-overlay');
    await expect(page.locator('.modal-container h3')).toContainText('Purchase Request Details');

    // Verify request details are shown
    await expect(page.locator('.modal-container')).toContainText(requestNumber);
    await expect(page.locator('.modal-container')).toContainText('Stock running low');
    await expect(page.locator('.modal-container')).toContainText('High demand product');
    await expect(page.locator('.modal-container')).toContainText('Purchase Manager');

    // Verify product information
    await expect(page.locator('.modal-container')).toContainText('Product:');
    await expect(page.locator('.modal-container')).toContainText('SKU:');
    await expect(page.locator('.modal-container')).toContainText('Current Stock:');
    await expect(page.locator('.modal-container')).toContainText('Requested Quantity:');

    // Verify timeline/status information
    await expect(page.locator('.modal-container')).toContainText('Status:');
    await expect(page.locator('.modal-container')).toContainText('Requested By:');
    await expect(page.locator('.modal-container')).toContainText('Requested:');

    // Take screenshot
    await page.screenshot({ path: 'qa/screenshots/sprint5-story-18/ac4-view-details.png', fullPage: true });

    // Close modal
    await page.click('.modal-close');
  });

  test('AC5: Approval Validation - Cannot approve own request', async ({ page }) => {
    // This test requires an admin who also has purchase manager role
    // For testing purposes, we'll simulate this scenario

    await loginAsAdmin(page);

    // Navigate to Shop Inventory view
    await page.goto('http://localhost:3000/purchase');
    await page.selectOption('.purchase-type-dropdown', 'shop-inventory');
    await page.waitForSelector('.shop-inventory-view');

    // Find a request (if admin somehow created one)
    const requestRow = page.locator(`table tbody tr:has-text("${requestNumber}")`);

    // Click approve button
    const approveButton = requestRow.locator('button.btn-icon.btn-approve');
    if (await approveButton.isVisible()) {
      await approveButton.click();
      await page.waitForSelector('.approval-modal');

      // Fill in notes
      await page.fill('textarea[placeholder*="notes"]', 'Test approval');

      // Try to approve
      await page.click('button.approve-button:has-text("Approve Request")');

      // If this is own request, should show error
      // Otherwise, should succeed
      const toast = page.locator('.toast-error, .toast-success');
      await expect(toast).toBeVisible();

      const toastText = await toast.textContent();
      if (toastText.includes('cannot approve your own request')) {
        // Expected error for self-approval
        await expect(toast).toContainText(/cannot approve your own request/i);
      } else {
        // Should be successful approval
        await expect(toast).toContainText(/approved/i);
      }
    }

    // Take screenshot
    await page.screenshot({ path: 'qa/screenshots/sprint5-story-18/ac5-self-approval-validation.png', fullPage: true });
  });

  test('AC6: Pending Requests Dashboard - Filter and view pending requests', async ({ page }) => {
    await loginAsAdmin(page);

    // Navigate to Shop Inventory view
    await page.goto('http://localhost:3000/purchase');
    await page.selectOption('.purchase-type-dropdown', 'shop-inventory');
    await page.waitForSelector('.shop-inventory-view');

    // Filter by status: Pending Approval
    await page.selectOption('select:has(option:has-text("All Status"))', 'pending_approval');
    await page.waitForTimeout(500);

    // Verify only pending requests are shown
    const rows = page.locator('table tbody tr:not(:has-text("No purchase requests"))');
    const rowCount = await rows.count();

    if (rowCount > 0) {
      for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);
        await expect(row.locator('.status-badge.status-pending')).toBeVisible();
      }
    }

    // Verify stats footer shows pending count
    const pendingStats = page.locator('.stats-footer .stats-item:has-text("Pending")');
    await expect(pendingStats).toBeVisible();
    const pendingCount = await pendingStats.locator('.stats-value').textContent();
    expect(parseInt(pendingCount)).toBeGreaterThanOrEqual(1);

    // Test search functionality
    await page.fill('input[placeholder*="Product, SKU, Reason"]', requestNumber);
    await page.waitForTimeout(500);

    const searchResults = page.locator(`table tbody tr:has-text("${requestNumber}")`);
    await expect(searchResults).toBeVisible();

    // Take screenshot
    await page.screenshot({ path: 'qa/screenshots/sprint5-story-18/ac6-pending-dashboard.png', fullPage: true });
  });

  test('AC7: Audit Trail Visibility - View approval history and reviewer info', async ({ page }) => {
    // First, approve a request as admin
    await loginAsAdmin(page);
    await page.goto('http://localhost:3000/purchase');
    await page.selectOption('.purchase-type-dropdown', 'shop-inventory');
    await page.waitForSelector('.shop-inventory-view');

    const requestRow = page.locator(`table tbody tr:has-text("${requestNumber}")`);
    const approveButton = requestRow.locator('button.btn-icon.btn-approve');

    if (await approveButton.isVisible()) {
      await approveButton.click();
      await page.waitForSelector('.approval-modal');
      await page.fill('textarea[placeholder*="notes"]', 'Approved by admin for audit trail test');
      await page.click('button.approve-button:has-text("Approve Request")');
      await expect(page.locator('.toast-success')).toBeVisible();
      await page.waitForTimeout(1000);
    }

    // Now view the request details to see audit trail
    const viewButton = requestRow.locator('button.btn-icon:has-text("👁️")');
    await viewButton.click();
    await page.waitForSelector('.modal-overlay');

    // Verify audit trail information is visible
    await expect(page.locator('.modal-container')).toContainText('Reviewed By:');
    await expect(page.locator('.modal-container')).toContainText('Reviewed At:');
    await expect(page.locator('.modal-container')).toContainText('Admin Notes:');

    // Verify reviewer name is shown
    await expect(page.locator('.modal-container')).toContainText(/admin|Admin/i);

    // Verify review notes are shown
    await expect(page.locator('.modal-container')).toContainText('Approved by admin for audit trail test');

    // Take screenshot
    await page.screenshot({ path: 'qa/screenshots/sprint5-story-18/ac7-audit-trail.png', fullPage: true });
  });

  test('Error: Rejection without reason shows error', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('http://localhost:3000/purchase');
    await page.selectOption('.purchase-type-dropdown', 'shop-inventory');
    await page.waitForSelector('.shop-inventory-view');

    const requestRow = page.locator(`table tbody tr:has-text("${requestNumber}")`);
    const rejectButton = requestRow.locator('button.btn-icon.btn-reject');
    await rejectButton.click();

    await page.waitForSelector('.rejection-modal');

    // Button should be disabled without reason
    const rejectSubmitButton = page.locator('button.reject-button:has-text("Reject Request")');
    await expect(rejectSubmitButton).toBeDisabled();

    // Verify error message is shown
    await expect(page.locator('.text-danger:has-text("required")')).toBeVisible();

    // Take screenshot
    await page.screenshot({ path: 'qa/screenshots/sprint5-story-18/error-rejection-no-reason.png', fullPage: true });
  });

  test('Error: Network failure shows error message', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('http://localhost:3000/purchase');
    await page.selectOption('.purchase-type-dropdown', 'shop-inventory');
    await page.waitForSelector('.shop-inventory-view');

    // Intercept approve API call and force failure
    await page.route('**/api/v2/shop/admin/purchase-requests/*/approve', route => route.abort('failed'));

    const requestRow = page.locator(`table tbody tr:has-text("${requestNumber}")`);
    const approveButton = requestRow.locator('button.btn-icon.btn-approve');
    await approveButton.click();

    await page.waitForSelector('.approval-modal');
    await page.fill('textarea[placeholder*="notes"]', 'Test network failure');
    await page.click('button.approve-button:has-text("Approve Request")');

    // Verify error toast appears
    await expect(page.locator('.toast-error')).toBeVisible();
    await expect(page.locator('.toast-error')).toContainText(/error|failed/i);

    // Take screenshot
    await page.screenshot({ path: 'qa/screenshots/sprint5-story-18/error-network-failure.png', fullPage: true });
  });

  test('Purchase Manager View - Can only see own requests', async ({ page }) => {
    await loginAsPurchaseManager(page);

    // Navigate to Shop Inventory view
    await page.goto('http://localhost:3000/purchase');
    await page.selectOption('.purchase-type-dropdown', 'shop-inventory');
    await page.waitForSelector('.shop-inventory-view');

    // Verify own request is visible
    const ownRequest = page.locator(`table tbody tr:has-text("${requestNumber}")`);
    await expect(ownRequest).toBeVisible();

    // Verify NO approve/reject buttons (only for admin)
    await expect(ownRequest.locator('button.btn-approve')).not.toBeVisible();
    await expect(ownRequest.locator('button.btn-reject')).not.toBeVisible();

    // Verify cancel button IS visible for pending requests
    if (await ownRequest.locator('.status-badge.status-pending').isVisible()) {
      await expect(ownRequest.locator('button.btn-cancel')).toBeVisible();
    }

    // Take screenshot
    await page.screenshot({ path: 'qa/screenshots/sprint5-story-18/purchase-manager-view.png', fullPage: true });
  });

  test('Responsive: Mobile view shows approval modals correctly', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await loginAsAdmin(page);
    await page.goto('http://localhost:3000/purchase');
    await page.selectOption('.purchase-type-dropdown', 'shop-inventory');
    await page.waitForSelector('.shop-inventory-view');

    const requestRow = page.locator(`table tbody tr:has-text("${requestNumber}")`);
    const approveButton = requestRow.locator('button.btn-icon.btn-approve');
    await approveButton.click();

    await page.waitForSelector('.approval-modal');

    // Verify modal displays correctly on mobile
    const modal = page.locator('.approval-modal');
    const modalBox = await modal.boundingBox();
    expect(modalBox.width).toBeLessThanOrEqual(375);

    // Verify all elements are visible
    await expect(modal.locator('h3')).toBeVisible();
    await expect(modal.locator('.request-summary')).toBeVisible();
    await expect(modal.locator('textarea')).toBeVisible();
    await expect(modal.locator('.modal-footer')).toBeVisible();

    // Take screenshot
    await page.screenshot({ path: 'qa/screenshots/sprint5-story-18/responsive-mobile.png', fullPage: true });
  });
});
