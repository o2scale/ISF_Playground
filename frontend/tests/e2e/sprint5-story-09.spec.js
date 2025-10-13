// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * E2E Tests for Sprint5-Story-09: Transaction Management
 *
 * Test Coverage:
 * - AC1: Transaction History Display
 * - AC2: Filter by Type
 * - AC3: Filter by Source
 * - AC4: Filter by Date Range
 * - AC5: Transaction Detail Modal
 * - AC6: Navigate to Order from Shop Transaction
 * - AC7: Export Transaction History (CSV)
 *
 * Prerequisites:
 * - Backend running on http://localhost:5001
 * - Frontend running on http://localhost:3000
 * - Test student user with username: test_student_001, password: [configured]
 * - User has mixed transaction history (earned/spent, various sources)
 */

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';
const STUDENT_USERNAME = process.env.TEST_STUDENT_USERNAME || 'test_student_001';
const STUDENT_PASSWORD = process.env.TEST_STUDENT_PASSWORD || 'password123';

test.describe('Sprint5-Story-09: Transaction Management', () => {

  test.beforeEach(async ({ page }) => {
    // Login as student before each test
    await page.goto(`${BASE_URL}/student-login`);
    await page.fill('input[name="username"]', STUDENT_USERNAME);
    await page.fill('input[name="password"]', STUDENT_PASSWORD);
    await page.click('button[type="submit"]');

    // Wait for navigation after login
    await page.waitForURL(`${BASE_URL}/student-dashboard`, { timeout: 10000 });
    await page.waitForTimeout(1000); // Allow time for data to load
  });

  // ==================== AC1: Transaction History Display ====================

  test('AC1.1: Should navigate to transaction history by clicking coin balance', async ({ page }) => {
    // Find and click the coin balance in the navigation
    await page.click('.coins');

    // Verify navigation to transaction history page
    await expect(page).toHaveURL(`${BASE_URL}/coins/history`);

    // Verify page header
    await expect(page.locator('h1')).toHaveText('Transaction History');
  });

  test('AC1.2: Should display all transaction elements correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/coins/history`);
    await page.waitForSelector('.transaction-list', { timeout: 10000 });

    // Verify summary cards exist
    await expect(page.locator('.transaction-summary')).toBeVisible();
    await expect(page.locator('.summary-card').nth(0)).toContainText('Current Balance');
    await expect(page.locator('.summary-card').nth(1)).toContainText('Total Earned');
    await expect(page.locator('.summary-card').nth(2)).toContainText('Total Spent');

    // Verify at least one transaction is displayed
    const transactions = page.locator('.transaction-item');
    await expect(transactions.first()).toBeVisible();

    // Verify transaction has required elements
    const firstTransaction = transactions.first();
    await expect(firstTransaction.locator('.transaction-icon')).toBeVisible();
    await expect(firstTransaction.locator('.transaction-description')).toBeVisible();
    await expect(firstTransaction.locator('.transaction-source')).toBeVisible();
    await expect(firstTransaction.locator('.transaction-date')).toBeVisible();
    await expect(firstTransaction.locator('.transaction-amount')).toBeVisible();
  });

  test('AC1.3: Should display transactions in reverse chronological order', async ({ page }) => {
    await page.goto(`${BASE_URL}/coins/history`);
    await page.waitForSelector('.transaction-list', { timeout: 10000 });

    // Get all transaction dates
    const transactionDates = await page.locator('.transaction-date').allTextContents();

    // Verify at least 2 transactions to compare
    expect(transactionDates.length).toBeGreaterThanOrEqual(2);

    // Parse dates and verify descending order
    for (let i = 0; i < transactionDates.length - 1; i++) {
      const date1 = new Date(transactionDates[i]);
      const date2 = new Date(transactionDates[i + 1]);
      expect(date1.getTime()).toBeGreaterThanOrEqual(date2.getTime());
    }
  });

  // ==================== AC2: Filter by Type ====================

  test('AC2.1: Should filter transactions by Earned type', async ({ page }) => {
    await page.goto(`${BASE_URL}/coins/history`);
    await page.waitForSelector('.transaction-filters', { timeout: 10000 });

    // Select "Earned" from type filter
    await page.selectOption('select[name="type"]', 'earned');
    await page.click('.apply-btn');

    // Wait for results to update
    await page.waitForTimeout(1000);

    // Verify only earned transactions are shown
    const transactions = page.locator('.transaction-item.earned');
    const count = await transactions.count();
    expect(count).toBeGreaterThan(0);

    // Verify no spent transactions
    const spentTransactions = page.locator('.transaction-item.spent');
    await expect(spentTransactions).toHaveCount(0);

    // Verify all amounts have + sign
    const amounts = await page.locator('.transaction-amount.earned').allTextContents();
    amounts.forEach(amount => {
      expect(amount).toContain('+');
    });
  });

  test('AC2.2: Should filter transactions by Spent type', async ({ page }) => {
    await page.goto(`${BASE_URL}/coins/history`);
    await page.waitForSelector('.transaction-filters', { timeout: 10000 });

    // Select "Spent" from type filter
    await page.selectOption('select[name="type"]', 'spent');
    await page.click('.apply-btn');

    // Wait for results to update
    await page.waitForTimeout(1000);

    // Verify only spent transactions are shown
    const transactions = page.locator('.transaction-item.spent');
    const count = await transactions.count();
    expect(count).toBeGreaterThan(0);

    // Verify no earned transactions
    const earnedTransactions = page.locator('.transaction-item.earned');
    await expect(earnedTransactions).toHaveCount(0);

    // Verify all amounts have - sign
    const amounts = await page.locator('.transaction-amount.spent').allTextContents();
    amounts.forEach(amount => {
      expect(amount).toContain('-');
    });
  });

  test('AC2.3: Should clear type filter', async ({ page }) => {
    await page.goto(`${BASE_URL}/coins/history`);
    await page.waitForSelector('.transaction-filters', { timeout: 10000 });

    // Apply filter first
    await page.selectOption('select[name="type"]', 'earned');
    await page.click('.apply-btn');
    await page.waitForTimeout(1000);

    const earnedCount = await page.locator('.transaction-item.earned').count();

    // Clear filters
    await page.click('.clear-btn');
    await page.waitForTimeout(1000);

    // Verify both earned and spent transactions now visible
    const totalCount = await page.locator('.transaction-item').count();
    expect(totalCount).toBeGreaterThan(earnedCount);
  });

  // ==================== AC3: Filter by Source ====================

  test('AC3.1: Should filter transactions by Shop source', async ({ page }) => {
    await page.goto(`${BASE_URL}/coins/history`);
    await page.waitForSelector('.transaction-filters', { timeout: 10000 });

    // Select "Shop" from source filter
    await page.selectOption('select[name="source"]', 'shop');
    await page.click('.apply-btn');

    // Wait for results to update
    await page.waitForTimeout(1000);

    // Verify shop transactions are shown
    const shopTransactions = page.locator('.transaction-item');
    const count = await shopTransactions.count();

    if (count > 0) {
      // Verify all transactions have SHOP source badge
      const sources = await page.locator('.transaction-source').allTextContents();
      sources.forEach(source => {
        expect(source.trim()).toBe('SHOP');
      });

      // Verify "View Order" link is visible
      await expect(page.locator('.view-order-link').first()).toBeVisible();
    } else {
      console.log('No shop transactions found for test user');
    }
  });

  test('AC3.2: Should filter transactions by WTF source', async ({ page }) => {
    await page.goto(`${BASE_URL}/coins/history`);
    await page.waitForSelector('.transaction-filters', { timeout: 10000 });

    // Select "WTF" from source filter
    await page.selectOption('select[name="source"]', 'wtf');
    await page.click('.apply-btn');

    // Wait for results to update
    await page.waitForTimeout(1000);

    // Verify WTF transactions are shown
    const wtfTransactions = page.locator('.transaction-item');
    const count = await wtfTransactions.count();

    if (count > 0) {
      // Verify all transactions have WTF source badge
      const sources = await page.locator('.transaction-source').allTextContents();
      sources.forEach(source => {
        expect(source.trim()).toBe('WTF');
      });
    } else {
      console.log('No WTF transactions found for test user');
    }
  });

  test('AC3.3: Should filter by multiple criteria (Type + Source)', async ({ page }) => {
    await page.goto(`${BASE_URL}/coins/history`);
    await page.waitForSelector('.transaction-filters', { timeout: 10000 });

    // Apply Type: Earned and Source: WTF
    await page.selectOption('select[name="type"]', 'earned');
    await page.selectOption('select[name="source"]', 'wtf');
    await page.click('.apply-btn');

    // Wait for results to update
    await page.waitForTimeout(1000);

    // Verify only earned WTF transactions
    const transactions = page.locator('.transaction-item.earned');
    const count = await transactions.count();

    if (count > 0) {
      // Verify all are earned (green/+)
      const amounts = await page.locator('.transaction-amount.earned').allTextContents();
      amounts.forEach(amount => {
        expect(amount).toContain('+');
      });

      // Verify all are WTF source
      const sources = await page.locator('.transaction-source').allTextContents();
      sources.forEach(source => {
        expect(source.trim()).toBe('WTF');
      });
    } else {
      console.log('No earned WTF transactions found for test user');
    }
  });

  // ==================== AC4: Filter by Date Range ====================

  test('AC4.1: Should filter transactions by start date', async ({ page }) => {
    await page.goto(`${BASE_URL}/coins/history`);
    await page.waitForSelector('.transaction-filters', { timeout: 10000 });

    // Set start date to 7 days ago
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    const startDateString = startDate.toISOString().split('T')[0];

    await page.fill('input[name="startDate"]', startDateString);
    await page.click('.apply-btn');

    // Wait for results to update
    await page.waitForTimeout(1000);

    // Verify transactions are from start date onwards
    const transactionDates = await page.locator('.transaction-date').allTextContents();

    transactionDates.forEach(dateText => {
      const transactionDate = new Date(dateText);
      expect(transactionDate.getTime()).toBeGreaterThanOrEqual(startDate.getTime());
    });
  });

  test('AC4.2: Should filter transactions by date range', async ({ page }) => {
    await page.goto(`${BASE_URL}/coins/history`);
    await page.waitForSelector('.transaction-filters', { timeout: 10000 });

    // Set date range: 10 days ago to 5 days ago
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 10);
    const startDateString = startDate.toISOString().split('T')[0];

    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 5);
    const endDateString = endDate.toISOString().split('T')[0];

    await page.fill('input[name="startDate"]', startDateString);
    await page.fill('input[name="endDate"]', endDateString);
    await page.click('.apply-btn');

    // Wait for results to update
    await page.waitForTimeout(1000);

    // Verify transactions are within date range
    const transactionDates = await page.locator('.transaction-date').allTextContents();

    transactionDates.forEach(dateText => {
      const transactionDate = new Date(dateText);
      expect(transactionDate.getTime()).toBeGreaterThanOrEqual(startDate.getTime());
      expect(transactionDate.getTime()).toBeLessThanOrEqual(endDate.getTime());
    });
  });

  // ==================== AC5: Transaction Detail Modal ====================

  test('AC5.1: Should open and close transaction detail modal', async ({ page }) => {
    await page.goto(`${BASE_URL}/coins/history`);
    await page.waitForSelector('.transaction-list', { timeout: 10000 });

    // Filter to non-shop transactions (e.g., WTF)
    await page.selectOption('select[name="source"]', 'wtf');
    await page.click('.apply-btn');
    await page.waitForTimeout(1000);

    const wtfCount = await page.locator('.transaction-item').count();

    if (wtfCount > 0) {
      // Click on first transaction
      await page.locator('.transaction-item').first().click();

      // Verify modal opens
      await expect(page.locator('.transaction-detail-modal')).toBeVisible();
      await expect(page.locator('.modal-header h2')).toHaveText('Transaction Details');

      // Verify detail rows exist
      await expect(page.locator('.detail-row').filter({ hasText: 'Type' })).toBeVisible();
      await expect(page.locator('.detail-row').filter({ hasText: 'Amount' })).toBeVisible();
      await expect(page.locator('.detail-row').filter({ hasText: 'Source' })).toBeVisible();

      // Close modal
      await page.click('.modal-close-btn');

      // Verify modal closed
      await expect(page.locator('.transaction-detail-modal')).not.toBeVisible();
    } else {
      console.log('No WTF transactions found to test modal');
    }
  });

  test('AC5.2: Should close modal by clicking overlay', async ({ page }) => {
    await page.goto(`${BASE_URL}/coins/history`);
    await page.waitForSelector('.transaction-list', { timeout: 10000 });

    // Filter to non-shop transactions
    await page.selectOption('select[name="source"]', 'wtf');
    await page.click('.apply-btn');
    await page.waitForTimeout(1000);

    const wtfCount = await page.locator('.transaction-item').count();

    if (wtfCount > 0) {
      // Open modal
      await page.locator('.transaction-item').first().click();
      await expect(page.locator('.transaction-detail-modal')).toBeVisible();

      // Click overlay
      await page.locator('.modal-overlay').click({ position: { x: 10, y: 10 } });

      // Verify modal closed
      await expect(page.locator('.transaction-detail-modal')).not.toBeVisible();
    }
  });

  test('AC5.3: Should display shop transaction metadata in modal', async ({ page }) => {
    await page.goto(`${BASE_URL}/coins/history`);
    await page.waitForSelector('.transaction-filters', { timeout: 10000 });

    // Filter to shop transactions
    await page.selectOption('select[name="source"]', 'shop');
    await page.click('.apply-btn');
    await page.waitForTimeout(1000);

    const shopCount = await page.locator('.transaction-item').count();

    if (shopCount > 0) {
      // Click on transaction description (not the "View Order" link)
      await page.locator('.transaction-description').first().click();

      // Verify modal opens
      await expect(page.locator('.transaction-detail-modal')).toBeVisible();

      // Verify shop-specific metadata fields
      await expect(page.locator('.detail-row').filter({ hasText: 'Order ID' })).toBeVisible();
      await expect(page.locator('.detail-row').filter({ hasText: 'Order Number' })).toBeVisible();
      await expect(page.locator('.detail-row').filter({ hasText: 'Items Purchased' })).toBeVisible();

      // Close modal
      await page.click('.modal-close-btn');
    } else {
      console.log('No shop transactions found to test shop metadata');
    }
  });

  // ==================== AC6: Navigate to Order from Shop Transaction ====================

  test('AC6.1: Should navigate to order history when clicking View Order link', async ({ page }) => {
    await page.goto(`${BASE_URL}/coins/history`);
    await page.waitForSelector('.transaction-filters', { timeout: 10000 });

    // Filter to shop transactions
    await page.selectOption('select[name="source"]', 'shop');
    await page.click('.apply-btn');
    await page.waitForTimeout(1000);

    const shopCount = await page.locator('.transaction-item').count();

    if (shopCount > 0) {
      // Verify "View Order" link exists
      await expect(page.locator('.view-order-link').first()).toBeVisible();

      // Click "View Order" link
      await page.locator('.transaction-item').first().click();

      // Verify navigation to order history page
      await expect(page).toHaveURL(/.*\/shop\/orders.*/);
    } else {
      console.log('No shop transactions found to test View Order navigation');
    }
  });

  // ==================== AC7: Export Transaction History ====================

  test('AC7.1: Should export transaction history as CSV', async ({ page }) => {
    await page.goto(`${BASE_URL}/coins/history`);
    await page.waitForSelector('.transaction-list', { timeout: 10000 });

    // Set up download listener
    const downloadPromise = page.waitForEvent('download');

    // Click Export CSV button
    await page.click('.export-btn');

    // Wait for download
    const download = await downloadPromise;

    // Verify filename pattern
    const filename = download.suggestedFilename();
    expect(filename).toMatch(/transaction-history-\d{4}-\d{2}-\d{2}\.csv/);

    // Save and read the file
    const path = await download.path();
    const fs = require('fs');
    const csvContent = fs.readFileSync(path, 'utf-8');

    // Verify CSV headers
    expect(csvContent).toContain('Date');
    expect(csvContent).toContain('Type');
    expect(csvContent).toContain('Source');
    expect(csvContent).toContain('Description');
    expect(csvContent).toContain('Amount');
    expect(csvContent).toContain('Balance After');

    // Verify CSV has data rows
    const rows = csvContent.split('\n');
    expect(rows.length).toBeGreaterThan(1); // Header + at least 1 data row
  });

  test('AC7.2: Should export filtered transactions only', async ({ page }) => {
    await page.goto(`${BASE_URL}/coins/history`);
    await page.waitForSelector('.transaction-filters', { timeout: 10000 });

    // Apply filter: Type = Spent
    await page.selectOption('select[name="type"]', 'spent');
    await page.click('.apply-btn');
    await page.waitForTimeout(1000);

    // Count filtered transactions
    const filteredCount = await page.locator('.transaction-item.spent').count();

    // Set up download listener
    const downloadPromise = page.waitForEvent('download');

    // Click Export CSV button
    await page.click('.export-btn');

    // Wait for download
    const download = await downloadPromise;
    const path = await download.path();
    const fs = require('fs');
    const csvContent = fs.readFileSync(path, 'utf-8');

    // Verify CSV rows match filtered count (header + data rows)
    const rows = csvContent.split('\n').filter(row => row.trim() !== '');
    expect(rows.length).toBe(filteredCount + 1); // +1 for header

    // Verify all amounts are negative (spent)
    rows.slice(1).forEach(row => {
      expect(row).toContain('-');
    });
  });

  // ==================== Pagination ====================

  test('AC8.1: Should display pagination when more than 50 transactions', async ({ page }) => {
    await page.goto(`${BASE_URL}/coins/history`);
    await page.waitForSelector('.transaction-list', { timeout: 10000 });

    // Check if pagination exists
    const paginationVisible = await page.locator('.pagination').isVisible();

    if (paginationVisible) {
      // Verify pagination elements
      await expect(page.locator('.pagination-btn').filter({ hasText: 'Previous' })).toBeVisible();
      await expect(page.locator('.pagination-btn').filter({ hasText: 'Next' })).toBeVisible();
      await expect(page.locator('.pagination-info')).toBeVisible();

      // Verify Previous is disabled on page 1
      await expect(page.locator('.pagination-btn').filter({ hasText: 'Previous' })).toBeDisabled();

      // Click Next if enabled
      const nextButton = page.locator('.pagination-btn').filter({ hasText: 'Next' });
      if (await nextButton.isEnabled()) {
        await nextButton.click();
        await page.waitForTimeout(1000);

        // Verify page 2 loaded
        await expect(page.locator('.pagination-info')).toContainText('Page 2');

        // Verify Previous now enabled
        await expect(page.locator('.pagination-btn').filter({ hasText: 'Previous' })).toBeEnabled();
      }
    } else {
      console.log('User has less than 50 transactions, pagination not shown');
    }
  });

  // ==================== Integration Test ====================

  test('AC9.1: Should show consistent balance across pages', async ({ page }) => {
    // Get balance from navigation bar
    await page.goto(`${BASE_URL}/student-dashboard`);
    const navBalance = await page.locator('.coins-circle').textContent();

    // Navigate to transaction history
    await page.click('.coins');
    await page.waitForSelector('.transaction-summary', { timeout: 10000 });

    // Get balance from summary
    const summaryBalance = await page.locator('.summary-card').filter({ hasText: 'Current Balance' }).locator('.summary-value').textContent();

    // Extract numeric values and compare
    const navBalanceNum = parseInt(navBalance?.trim() || '0');
    const summaryBalanceNum = parseInt(summaryBalance?.replace('coins', '').trim() || '0');

    expect(navBalanceNum).toBe(summaryBalanceNum);
  });

});
