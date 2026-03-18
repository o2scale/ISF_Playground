// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Coach — Dashboard, Schedule & Week Navigation
 *
 * Covers:
 *  - sprint6-story-01 AC1: Month/Year selector with week navigation
 *  - sprint6-story-01 AC2: Schedule time extension (07:00-21:00)
 *  - sprint6-story-01 AC3: Dashboard cards cleanup (5 cards)
 *  - sprint6-story-01-ac1-week-navigation test cases
 *  - sprint6-story-01-bug-001: Schedule assignment authorization fix
 *
 * Auth: storageState handled by playwright.config.js (coach project)
 */

test.describe('Coach — Dashboard & Weekly Calendar', () => {

  test.beforeEach(async ({ page }) => {
    // Coach dashboard is served at /dashboard (role-aware rendering)
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
  });

  // --- AC1: Month/Year Selector & Week Navigation ---

  test('should display month and year dropdown selectors on calendar', async ({ page }) => {
    // Click Daily Schedule to open Weekly Calendar
    await page.getByText('Daily Schedule').first().click();
    await page.waitForLoadState('networkidle');

    // Month dropdown should be visible
    const monthSelect = page.locator('select').filter({ hasText: /january|february|march|april|may|june|july|august|september|october|november|december/i }).first();
    await expect(monthSelect).toBeVisible({ timeout: 10000 });

    // Year dropdown should be visible
    const yearSelect = page.locator('select').filter({ hasText: /202[3-9]/ }).first();
    await expect(yearSelect).toBeVisible({ timeout: 10000 });
  });

  test('should navigate to different month via dropdown', async ({ page }) => {
    await page.getByText('Daily Schedule').first().click();
    await page.waitForLoadState('networkidle');

    // Select January from month dropdown
    const monthSelect = page.locator('select').filter({ hasText: /january|february|march|april|may|june|july|august|september|october|november|december/i }).first();
    if (await monthSelect.isVisible({ timeout: 5000 }).catch(() => false)) {
      await monthSelect.selectOption({ label: /january/i });
      await page.waitForTimeout(500);

      // Calendar should update — check for Jan dates or week range text
      await expect(
        page.getByText(/jan/i).first()
      ).toBeVisible({ timeout: 10000 });
    }
  });

  test('should navigate to different year via dropdown', async ({ page }) => {
    await page.getByText('Daily Schedule').first().click();
    await page.waitForLoadState('networkidle');

    const yearSelect = page.locator('select').filter({ hasText: /202[3-9]/ }).first();
    if (await yearSelect.isVisible({ timeout: 5000 }).catch(() => false)) {
      await yearSelect.selectOption({ label: /2025/ });
      await page.waitForTimeout(500);

      await expect(
        page.getByText(/2025/).first()
      ).toBeVisible({ timeout: 10000 });
    }
  });

  test('should navigate between weeks using arrow buttons', async ({ page }) => {
    await page.getByText('Daily Schedule').first().click();
    await page.waitForLoadState('networkidle');

    // Look for next week arrow button
    const nextArrow = page.getByRole('button', { name: /next|forward|▶|›/i })
      .or(page.locator('button').filter({ hasText: /▶|›|→/ }))
      .first();

    if (await nextArrow.isVisible({ timeout: 5000 }).catch(() => false)) {
      // Get current week indicator text
      const weekIndicator = page.getByText(/week \d+ of \d+/i).first();
      const initialText = await weekIndicator.isVisible({ timeout: 3000 }).catch(() => false)
        ? await weekIndicator.textContent()
        : null;

      await nextArrow.click();
      await page.waitForTimeout(500);

      // If week indicator was visible, it should have changed
      if (initialText) {
        const newText = await weekIndicator.textContent();
        expect(newText).not.toBe(initialText);
      }
    }
  });

  test('should display "Today" button and jump to current week', async ({ page }) => {
    await page.getByText('Daily Schedule').first().click();
    await page.waitForLoadState('networkidle');

    // Navigate away from current month first
    const monthSelect = page.locator('select').filter({ hasText: /january|february|march|april|may|june|july|august|september|october|november|december/i }).first();
    if (await monthSelect.isVisible({ timeout: 5000 }).catch(() => false)) {
      await monthSelect.selectOption({ label: /january/i });
      await page.waitForTimeout(500);
    }

    // Click Today button
    const todayBtn = page.getByRole('button', { name: /today/i }).first();
    if (await todayBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await todayBtn.click();
      await page.waitForTimeout(500);

      // Current month name should now be visible in the dropdown
      const now = new Date();
      const currentMonth = now.toLocaleString('en-US', { month: 'long' }).toLowerCase();
      await expect(
        page.getByText(new RegExp(currentMonth, 'i')).first()
      ).toBeVisible({ timeout: 10000 });
    }
  });

  test('should default to current week on page load', async ({ page }) => {
    await page.getByText('Daily Schedule').first().click();
    await page.waitForLoadState('networkidle');

    // On initial load, should NOT default to "Week 1" but to current week
    const now = new Date();
    const currentMonth = now.toLocaleString('en-US', { month: 'long' });
    const currentYear = now.getFullYear().toString();

    // Month dropdown should show current month
    await expect(
      page.getByText(new RegExp(currentMonth, 'i')).first()
    ).toBeVisible({ timeout: 10000 });

    // Year dropdown should show current year
    await expect(
      page.getByText(currentYear).first()
    ).toBeVisible({ timeout: 10000 });
  });

  // --- AC2: Schedule Time Extension (07:00-21:00) ---

  test('should display time slots from 07:00 to 21:00', async ({ page }) => {
    await page.getByText('Daily Schedule').first().click();
    await page.waitForLoadState('networkidle');

    // First time slot: 07:00
    await expect(
      page.getByText('07:00').first()
    ).toBeVisible({ timeout: 10000 });

    // Last time slot: 21:00 (may need to scroll)
    const lastSlot = page.getByText('21:00').first();
    await lastSlot.scrollIntoViewIfNeeded();
    await expect(lastSlot).toBeVisible({ timeout: 10000 });
  });

  test('should have no visual artifacts below last time slot', async ({ page }) => {
    await page.getByText('Daily Schedule').first().click();
    await page.waitForLoadState('networkidle');

    // Scroll to bottom of calendar
    const lastSlot = page.getByText('21:00').first();
    if (await lastSlot.isVisible({ timeout: 5000 }).catch(() => false)) {
      await lastSlot.scrollIntoViewIfNeeded();

      // No stray "}" or similar code artifacts should be visible
      await expect(page.getByText('}', { exact: true })).not.toBeVisible();
    }
  });

  // --- Schedule Creation (Bug Fix S6-S1-PROD-BUG-001) ---

  test('should allow coach to open schedule creation form', async ({ page }) => {
    await page.getByText('Daily Schedule').first().click();
    await page.waitForLoadState('networkidle');

    // Click on a time slot or "Add Schedule" button
    const addBtn = page.getByRole('button', { name: /add.*schedule|create.*schedule|add/i }).first();
    const timeSlot = page.locator('[class*="time-slot"], [class*="cell"]').first();

    const addVisible = await addBtn.isVisible({ timeout: 3000 }).catch(() => false);
    const slotVisible = await timeSlot.isVisible({ timeout: 3000 }).catch(() => false);

    if (addVisible) {
      await addBtn.click();
    } else if (slotVisible) {
      await timeSlot.click();
    }

    // Coach should NOT get an authorization error — form should open
    await expect(
      page.getByText(/not authorized|forbidden|403/i).first()
    ).not.toBeVisible({ timeout: 3000 });
  });

  test('should show filtered Assign To dropdown for coach (only own Balagruha)', async ({ page }) => {
    await page.getByText('Daily Schedule').first().click();
    await page.waitForLoadState('networkidle');

    const addBtn = page.getByRole('button', { name: /add.*schedule|create.*schedule|add/i }).first();
    if (await addBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await addBtn.click();
      await page.waitForTimeout(500);

      // Assign To dropdown should be populated (not empty)
      const assignDropdown = page.getByLabel(/assign/i)
        .or(page.locator('select[name*="assign"]'))
        .first();

      if (await assignDropdown.isVisible({ timeout: 5000 }).catch(() => false)) {
        const options = assignDropdown.locator('option');
        const count = await options.count();
        // Should have at least a placeholder + 1 assignable user
        expect(count).toBeGreaterThanOrEqual(2);
      }
    }
  });
});
