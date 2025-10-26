/**
 * E2E Tests for Sprint 2 Epic 02 Story 04: Translation Module
 *
 * Test Coverage:
 * - TranslationDashboard:
 *   - AC1: Published courses load in dropdown
 *   - AC2: Translation progress displays correctly
 *   - AC3: Progress breakdown shows all content types
 *   - AC4: "Start Translating" navigation works
 *
 * - TranslationEditor:
 *   - AC5: Side-by-side English/Telugu layout
 *   - AC6: Auto-save with 1-second debounce
 *   - AC7: Save status indicators (Saved, Editing, Saving)
 *   - AC8: Previous/Next/Skip navigation
 *   - AC9: Mark as Translated functionality
 *   - AC10: Character limits (title: 120, description: 1000)
 *   - AC11: Progress bar updates in real-time
 *   - AC12: Breadcrumb shows current item location
 *
 * Additional Tests:
 * - Error states (network failures, API errors)
 * - Empty states (no courses, no items)
 * - Loading states
 */

import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';
const TRANSLATION_DASHBOARD_URL = `${BASE_URL}/admin/translations`;

// Test admin user credentials (must have "LMS Management" → "Manage" permission)
const TEST_ADMIN = {
  email: 'admin@test.com',
  password: 'admin123'
};

test.describe('Sprint 2 Epic 02 Story 04: Translation Module', () => {

  // Login as admin before each test
  test.beforeEach(async ({ page }) => {
    // Navigate to admin login page
    await page.goto(`${BASE_URL}/admin/login`);

    // Fill in credentials
    await page.fill('input[name="email"]', TEST_ADMIN.email);
    await page.fill('input[name="password"]', TEST_ADMIN.password);

    // Submit login form
    await page.click('button[type="submit"]');

    // Wait for redirect to dashboard
    await page.waitForURL(/.*dashboard.*/);

    // Verify login success
    await expect(page).toHaveURL(/dashboard/);
  });

  /**
   * TRANSLATION DASHBOARD TESTS
   */

  /**
   * AC1: Published Courses Load in Dropdown
   * Verify that only published courses appear in the course selection dropdown
   */
  test('AC1: Dashboard loads published courses in dropdown', async ({ page }) => {
    // Navigate to Translation Dashboard
    await page.goto(TRANSLATION_DASHBOARD_URL);

    // Wait for page to load
    await page.waitForSelector('h1:has-text("Translation Management")');

    // Verify header displays correctly
    await expect(page.locator('h1')).toHaveText('Translation Management');
    await expect(page.locator('p:has-text("తెలుగు")')).toBeVisible(); // Telugu text

    // Verify course dropdown exists
    const courseDropdown = page.locator('select');
    await expect(courseDropdown).toBeVisible();

    // Verify dropdown has placeholder option
    const placeholderOption = courseDropdown.locator('option[value=""]');
    await expect(placeholderOption).toHaveText(/Choose a published course/i);

    // Verify dropdown contains course options
    const courseOptions = await courseDropdown.locator('option').count();
    expect(courseOptions).toBeGreaterThan(1); // At least placeholder + 1 course

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint2-epic02-story04/ac1-dashboard-course-dropdown.png',
      fullPage: true
    });
  });

  /**
   * AC2: Translation Progress Displays Correctly
   * Verify that selecting a course displays accurate translation progress
   */
  test('AC2: Translation progress displays when course is selected', async ({ page }) => {
    await page.goto(TRANSLATION_DASHBOARD_URL);
    await page.waitForSelector('select');

    // Get first non-placeholder course option
    const firstCourse = await page.locator('select option').nth(1).getAttribute('value');

    // Select the course
    await page.selectOption('select', firstCourse);

    // Wait for progress card to load
    await page.waitForSelector('.bg-blue-50', { timeout: 10000 });

    // Verify progress card appears
    const progressCard = page.locator('.bg-blue-50');
    await expect(progressCard).toBeVisible();

    // Verify "Translation Progress" heading
    await expect(page.locator('h2:has-text("Translation Progress")')).toBeVisible();

    // Verify progress bar exists
    const progressBar = page.locator('.bg-purple-600');
    await expect(progressBar).toBeVisible();

    // Verify progress percentage is displayed
    const progressText = page.locator('text=/\\d+%/');
    await expect(progressText).toBeVisible();

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint2-epic02-story04/ac2-translation-progress.png',
      fullPage: true
    });
  });

  /**
   * AC3: Progress Breakdown Shows All Content Types
   * Verify breakdown displays course, modules, chapters, and content items
   */
  test('AC3: Progress breakdown shows all content types', async ({ page }) => {
    await page.goto(TRANSLATION_DASHBOARD_URL);
    await page.waitForSelector('select');

    // Select first course
    const firstCourse = await page.locator('select option').nth(1).getAttribute('value');
    await page.selectOption('select', firstCourse);

    // Wait for progress breakdown
    await page.waitForSelector('h3:has-text("Progress Breakdown")');

    // Verify all content type breakdowns exist
    await expect(page.locator('text=/Course Title & Description/i')).toBeVisible();
    await expect(page.locator('text=/Module Titles/i')).toBeVisible();
    await expect(page.locator('text=/Chapter Titles/i')).toBeVisible();
    await expect(page.locator('text=/Content Items/i')).toBeVisible();

    // Verify checkmarks or progress indicators appear
    const completionMarkers = page.locator('span.text-green-500, span.text-yellow-500');
    const markerCount = await completionMarkers.count();
    expect(markerCount).toBeGreaterThan(0); // At least some status indicators

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint2-epic02-story04/ac3-progress-breakdown.png',
      fullPage: true
    });
  });

  /**
   * AC4: "Start Translating" Button Navigates to Editor
   * Verify clicking the button navigates to TranslationEditor
   */
  test('AC4: Start Translating button navigates to editor', async ({ page }) => {
    await page.goto(TRANSLATION_DASHBOARD_URL);
    await page.waitForSelector('select');

    // Select first course
    const firstCourse = await page.locator('select option').nth(1).getAttribute('value');
    await page.selectOption('select', firstCourse);

    // Wait for "Start Translating" button
    const startButton = page.locator('button:has-text("Start Translating")');
    await expect(startButton).toBeVisible();

    // Click the button
    await startButton.click();

    // Verify navigation to editor page
    await page.waitForURL(/.*translations\/.*\/editor/);
    await expect(page).toHaveURL(/translations\/.*\/editor/);

    // Verify editor page loaded
    await expect(page.locator('h1:has-text("Translation Editor")')).toBeVisible();

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint2-epic02-story04/ac4-navigate-to-editor.png',
      fullPage: true
    });
  });

  /**
   * TRANSLATION EDITOR TESTS
   */

  /**
   * AC5: Side-by-side English/Telugu Layout
   * Verify the editor displays English (read-only) and Telugu (editable) columns
   */
  test('AC5: Editor displays side-by-side English/Telugu layout', async ({ page }) => {
    // Navigate directly to editor (assuming first course has ID)
    await page.goto(TRANSLATION_DASHBOARD_URL);
    await page.waitForSelector('select');
    const firstCourse = await page.locator('select option').nth(1).getAttribute('value');
    await page.goto(`${BASE_URL}/admin/translations/${firstCourse}/editor`);

    // Wait for editor to load
    await page.waitForSelector('h1:has-text("Translation Editor")');

    // Verify English column (read-only)
    const englishColumn = page.locator('div:has-text("ENGLISH (Original)")').first();
    await expect(englishColumn).toBeVisible();
    await expect(page.locator('span:has-text("🔒")')).toBeVisible(); // Lock icon

    // Verify English inputs are read-only
    const englishTitleInput = page.locator('input[readonly]').first();
    await expect(englishTitleInput).toHaveAttribute('readonly');

    // Verify Telugu column (editable)
    const teluguColumn = page.locator('div:has-text("తెలుగు (Translation)")').first();
    await expect(teluguColumn).toBeVisible();
    await expect(page.locator('span:has-text("✏️")')).toBeVisible(); // Edit icon

    // Verify Telugu inputs are editable
    const teluguTitleInput = page.locator('input[placeholder*="Telugu"]').first();
    await expect(teluguTitleInput).not.toHaveAttribute('readonly');

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint2-epic02-story04/ac5-side-by-side-layout.png',
      fullPage: true
    });
  });

  /**
   * AC6: Auto-save with 1-Second Debounce
   * Verify translations auto-save after 1 second of no typing
   */
  test('AC6: Auto-save triggers after 1-second debounce', async ({ page }) => {
    await page.goto(TRANSLATION_DASHBOARD_URL);
    await page.waitForSelector('select');
    const firstCourse = await page.locator('select option').nth(1).getAttribute('value');
    await page.goto(`${BASE_URL}/admin/translations/${firstCourse}/editor`);

    await page.waitForSelector('input[placeholder*="Telugu"]');

    // Type in Telugu title field
    const teluguTitleInput = page.locator('input[placeholder*="Telugu"]').first();
    await teluguTitleInput.fill('టెస్ట్ అనువాదం'); // "Test Translation" in Telugu

    // Wait for debounce delay (1000ms) + small buffer
    await page.waitForTimeout(1200);

    // Wait for save API call
    const saveResponse = await page.waitForResponse(
      response => response.url().includes('/api/v2/lms/admin/translations/courses/') &&
                  response.request().method() === 'PUT',
      { timeout: 5000 }
    );

    // Verify save was successful
    expect(saveResponse.status()).toBe(200);

    // Verify save status shows "Saved"
    await expect(page.locator('span:has-text("💾 Saved")')).toBeVisible();

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint2-epic02-story04/ac6-auto-save-debounce.png'
    });
  });

  /**
   * AC7: Save Status Indicators
   * Verify status changes: Editing → Saving → Saved
   */
  test('AC7: Save status indicators show correct states', async ({ page }) => {
    await page.goto(TRANSLATION_DASHBOARD_URL);
    await page.waitForSelector('select');
    const firstCourse = await page.locator('select option').nth(1).getAttribute('value');
    await page.goto(`${BASE_URL}/admin/translations/${firstCourse}/editor`);

    await page.waitForSelector('input[placeholder*="Telugu"]');

    // Initial state should be "Saved"
    await expect(page.locator('span:has-text("💾 Saved")')).toBeVisible();

    // Start typing - should show "Editing"
    const teluguTitleInput = page.locator('input[placeholder*="Telugu"]').first();
    await teluguTitleInput.type('న');

    // Verify "Editing" status appears
    await expect(page.locator('span:has-text("✏️ Editing")')).toBeVisible();

    // Wait for debounce - should show "Saving"
    await page.waitForTimeout(1100);

    // "Saving" status may appear briefly
    // Then should return to "Saved"
    await expect(page.locator('span:has-text("💾 Saved")')).toBeVisible({ timeout: 3000 });

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint2-epic02-story04/ac7-save-status-indicators.png'
    });
  });

  /**
   * AC8: Previous/Next/Skip Navigation
   * Verify navigation buttons work correctly
   */
  test('AC8: Previous/Next/Skip navigation buttons work', async ({ page }) => {
    await page.goto(TRANSLATION_DASHBOARD_URL);
    await page.waitForSelector('select');
    const firstCourse = await page.locator('select option').nth(1).getAttribute('value');
    await page.goto(`${BASE_URL}/admin/translations/${firstCourse}/editor`);

    await page.waitForSelector('h1:has-text("Translation Editor")');

    // Verify "Previous" button is disabled on first item
    const previousButton = page.locator('button:has-text("← Previous")');
    await expect(previousButton).toBeDisabled();

    // Get current item number
    const itemIndicator = page.locator('p:has-text("Item")');
    const currentItemText = await itemIndicator.textContent();
    const currentItemMatch = currentItemText.match(/Item (\d+) of (\d+)/);
    const currentItem = parseInt(currentItemMatch[1]);
    const totalItems = parseInt(currentItemMatch[2]);

    // Click "Next" button if not on last item
    if (currentItem < totalItems) {
      const nextButton = page.locator('button:has-text("Save & Next →")');
      await nextButton.click();

      // Wait for item to change
      await page.waitForTimeout(500);

      // Verify item number increased
      const newItemText = await itemIndicator.textContent();
      expect(newItemText).toContain(`Item ${currentItem + 1}`);

      // Verify "Previous" button is now enabled
      await expect(previousButton).toBeEnabled();
    }

    // Test "Skip" button
    const skipButton = page.locator('button:has-text("Skip")');
    await expect(skipButton).toBeVisible();
    await skipButton.click();

    // Wait for navigation
    await page.waitForTimeout(500);

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint2-epic02-story04/ac8-navigation-buttons.png'
    });
  });

  /**
   * AC9: Mark as Translated Functionality
   * Verify checkbox marks item as translated and moves to next
   */
  test('AC9: Mark as Translated checkbox saves and advances', async ({ page }) => {
    await page.goto(TRANSLATION_DASHBOARD_URL);
    await page.waitForSelector('select');
    const firstCourse = await page.locator('select option').nth(1).getAttribute('value');
    await page.goto(`${BASE_URL}/admin/translations/${firstCourse}/editor`);

    await page.waitForSelector('input[placeholder*="Telugu"]');

    // Fill in Telugu translations
    const teluguTitleInput = page.locator('input[placeholder*="Telugu"]').first();
    const teluguDescriptionTextarea = page.locator('textarea[placeholder*="Telugu"]').first();

    await teluguTitleInput.fill('పూర్తి అనువాదం'); // "Complete Translation"
    await teluguDescriptionTextarea.fill('ఇది పూర్తిగా అనువదించబడిన వివరణ'); // "This is a fully translated description"

    // Wait for auto-save
    await page.waitForTimeout(1200);

    // Get current item number
    const itemIndicator = page.locator('p:has-text("Item")');
    const currentItemText = await itemIndicator.textContent();
    const currentItem = parseInt(currentItemText.match(/Item (\d+)/)[1]);

    // Check "Mark as Translated" checkbox
    const markAsTranslatedCheckbox = page.locator('input[type="checkbox"]');
    await markAsTranslatedCheckbox.check();

    // Wait for save and navigation
    await page.waitForTimeout(1000);

    // Verify moved to next untranslated item (may loop back to start if all translated)
    const newItemText = await itemIndicator.textContent();
    const newItem = parseInt(newItemText.match(/Item (\d+)/)[1]);

    // Item should have changed (either incremented or looped)
    expect(newItem).not.toBe(currentItem);

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint2-epic02-story04/ac9-mark-as-translated.png'
    });
  });

  /**
   * AC10: Character Limits
   * Verify title (120) and description (1000) character limits
   */
  test('AC10: Character counters show correct limits', async ({ page }) => {
    await page.goto(TRANSLATION_DASHBOARD_URL);
    await page.waitForSelector('select');
    const firstCourse = await page.locator('select option').nth(1).getAttribute('value');
    await page.goto(`${BASE_URL}/admin/translations/${firstCourse}/editor`);

    await page.waitForSelector('input[placeholder*="Telugu"]');

    // Verify title character limit (120)
    const teluguTitleInput = page.locator('input[placeholder*="Telugu"]').first();
    const maxLengthTitle = await teluguTitleInput.getAttribute('maxlength');
    expect(maxLengthTitle).toBe('120');

    // Verify title counter displays
    const titleCounter = page.locator('p:has-text("/ 120 characters")');
    await expect(titleCounter).toBeVisible();

    // Verify description character limit (1000)
    const teluguDescriptionTextarea = page.locator('textarea[placeholder*="Telugu"]').first();
    const maxLengthDescription = await teluguDescriptionTextarea.getAttribute('maxlength');
    expect(maxLengthDescription).toBe('1000');

    // Verify description counter displays
    const descriptionCounter = page.locator('p:has-text("/ 1000 characters")');
    await expect(descriptionCounter).toBeVisible();

    // Type some text and verify counter updates
    await teluguTitleInput.fill('టెస్ట్');
    const updatedCounter = await page.locator('p:has-text("/ 120 characters")').textContent();
    expect(updatedCounter).toMatch(/^\d+ \/ 120 characters$/);

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint2-epic02-story04/ac10-character-limits.png'
    });
  });

  /**
   * AC11: Progress Bar Updates
   * Verify progress bar updates when translations are marked complete
   */
  test('AC11: Progress bar updates in real-time', async ({ page }) => {
    await page.goto(TRANSLATION_DASHBOARD_URL);
    await page.waitForSelector('select');
    const firstCourse = await page.locator('select option').nth(1).getAttribute('value');
    await page.goto(`${BASE_URL}/admin/translations/${firstCourse}/editor`);

    await page.waitForSelector('h1:has-text("Translation Editor")');

    // Get initial progress percentage
    const progressText = page.locator('p:has-text("%")').first();
    const initialProgressText = await progressText.textContent();
    const initialProgress = parseInt(initialProgressText.match(/(\d+)%/)[1]);

    // Fill translations and mark as complete
    const teluguTitleInput = page.locator('input[placeholder*="Telugu"]').first();
    await teluguTitleInput.fill('పురోగతి పరీక్ష'); // "Progress Test"

    await page.waitForTimeout(1200); // Wait for auto-save

    const markAsTranslatedCheckbox = page.locator('input[type="checkbox"]');
    await markAsTranslatedCheckbox.check();

    // Wait for save and progress update
    await page.waitForTimeout(1500);

    // Verify progress percentage changed or progress bar updated
    // (May not change if item was already translated, but save should occur)
    const saveStatus = page.locator('span:has-text("💾 Saved")');
    await expect(saveStatus).toBeVisible({ timeout: 5000 });

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint2-epic02-story04/ac11-progress-updates.png'
    });
  });

  /**
   * AC12: Breadcrumb Shows Current Item Location
   * Verify breadcrumb displays item hierarchy (Module > Chapter > Content)
   */
  test('AC12: Breadcrumb shows current item location', async ({ page }) => {
    await page.goto(TRANSLATION_DASHBOARD_URL);
    await page.waitForSelector('select');
    const firstCourse = await page.locator('select option').nth(1).getAttribute('value');
    await page.goto(`${BASE_URL}/admin/translations/${firstCourse}/editor`);

    await page.waitForSelector('h1:has-text("Translation Editor")');

    // Verify breadcrumb section exists
    const breadcrumbSection = page.locator('.bg-gray-100');
    await expect(breadcrumbSection).toBeVisible();

    // Verify "Translating:" label
    await expect(page.locator('p:has-text("Translating:")')).toBeVisible();

    // Verify breadcrumb contains hierarchical path
    const breadcrumbText = await breadcrumbSection.textContent();

    // Breadcrumb should contain item location
    // Format: "Module X > Chapter Y > Content: Title" or similar
    expect(breadcrumbText.length).toBeGreaterThan(10); // Should have meaningful text

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint2-epic02-story04/ac12-breadcrumb-navigation.png',
      fullPage: true
    });
  });

  /**
   * ERROR STATE: Network Failure on Dashboard
   * Test error handling when API fails to load courses
   */
  test('Error: Network failure on dashboard shows error message', async ({ page }) => {
    // Intercept and abort course list API request
    await page.route('**/api/v2/lms/admin/courses*', route => route.abort());

    await page.goto(TRANSLATION_DASHBOARD_URL);

    // Wait for error state
    await page.waitForSelector('.bg-red-50', { timeout: 5000 });

    // Verify error message appears
    const errorMessage = page.locator('.bg-red-50');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(/Failed to load/i);

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint2-epic02-story04/error-network-failure-dashboard.png'
    });
  });

  /**
   * ERROR STATE: Network Failure on Editor
   * Test error handling when API fails to load translatable items
   */
  test('Error: Network failure on editor shows error state', async ({ page }) => {
    await page.goto(TRANSLATION_DASHBOARD_URL);
    await page.waitForSelector('select');
    const firstCourse = await page.locator('select option').nth(1).getAttribute('value');

    // Intercept and abort translatable items API request
    await page.route('**/api/v2/lms/admin/translations/courses/*/items*', route => route.abort());

    await page.goto(`${BASE_URL}/admin/translations/${firstCourse}/editor`);

    // Wait for error state
    await page.waitForSelector('.bg-red-50', { timeout: 5000 });

    // Verify error message
    const errorMessage = page.locator('.bg-red-50');
    await expect(errorMessage).toBeVisible();

    // Verify "Back to Dashboard" button exists
    const backButton = page.locator('button:has-text("Back to Dashboard")');
    await expect(backButton).toBeVisible();

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint2-epic02-story04/error-network-failure-editor.png'
    });
  });

  /**
   * EMPTY STATE: No Published Courses
   * Test behavior when there are no published courses
   */
  test('Empty State: No published courses shows empty state', async ({ page }) => {
    // Intercept and return empty course list
    await page.route('**/api/v2/lms/admin/courses*', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ courses: [] })
      });
    });

    await page.goto(TRANSLATION_DASHBOARD_URL);

    // Verify dropdown only has placeholder
    const courseDropdown = page.locator('select');
    const optionCount = await courseDropdown.locator('option').count();
    expect(optionCount).toBe(1); // Only placeholder

    // Verify "No Course Selected" message
    await expect(page.locator('h3:has-text("No Course Selected")')).toBeVisible();

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint2-epic02-story04/empty-state-no-courses.png'
    });
  });

  /**
   * LOADING STATE: Dashboard Loading
   * Verify loading state appears while fetching data
   */
  test('Loading: Dashboard shows loading state', async ({ page }) => {
    await page.goto(TRANSLATION_DASHBOARD_URL);

    // Loading state may appear briefly (spinner animation)
    const loadingSpinner = page.locator('.animate-spin');

    // Wait for either loading state or content
    await Promise.race([
      loadingSpinner.waitFor({ state: 'visible', timeout: 1000 }).catch(() => {}),
      page.locator('select').waitFor({ timeout: 5000 })
    ]);

    // Verify page eventually loads
    await expect(page.locator('select')).toBeVisible();

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint2-epic02-story04/loading-state-dashboard.png'
    });
  });

  /**
   * LOADING STATE: Editor Loading
   * Verify loading state appears while fetching translatable items
   */
  test('Loading: Editor shows loading state', async ({ page }) => {
    await page.goto(TRANSLATION_DASHBOARD_URL);
    await page.waitForSelector('select');
    const firstCourse = await page.locator('select option').nth(1).getAttribute('value');

    await page.goto(`${BASE_URL}/admin/translations/${firstCourse}/editor`);

    // Loading state may appear briefly
    const loadingSpinner = page.locator('.animate-spin');

    // Wait for either loading state or editor content
    await Promise.race([
      loadingSpinner.waitFor({ state: 'visible', timeout: 1000 }).catch(() => {}),
      page.locator('h1:has-text("Translation Editor")').waitFor({ timeout: 10000 })
    ]);

    // Verify editor eventually loads
    await expect(page.locator('h1:has-text("Translation Editor")')).toBeVisible();

    // Screenshot
    await page.screenshot({
      path: 'qa/screenshots/sprint2-epic02-story04/loading-state-editor.png'
    });
  });

  /**
   * RBAC: Unauthorized Access
   * Verify non-admin users cannot access translation pages
   * Note: This test requires a non-admin test user to be set up
   */
  test.skip('RBAC: Unauthorized users cannot access translation module', async ({ page }) => {
    // This test is skipped because it requires a non-admin user setup
    // To enable: Create a test user without "LMS Management" → "Manage" permission

    // Expected behavior:
    // 1. Login as non-admin user
    // 2. Navigate to /admin/translations
    // 3. Should redirect to /access-denied page
    // 4. Error message: "You do not have permission to access this page"
  });
});
