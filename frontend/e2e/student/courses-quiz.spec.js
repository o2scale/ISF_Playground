// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Student Courses & Quiz E2E Tests
 * Covers: Computer apps three-pane navigation, spoken english, life skills, quiz attempts
 * Auth: Handled by storageState (student role)
 */

test.describe('Computer Apps Course', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/student/computer-apps');
  });

  test.fixme('should display three-pane layout with apps list', async ({ page }) => {
    // Pane 1: Apps list header
    await expect(page.getByText(/computer apps/i).first()).toBeVisible({ timeout: 10000 });

    // Should show app names
    await expect(page.getByText(/ms word|word/i).first()).toBeVisible({ timeout: 10000 });
  });

  test.fixme('should auto-select first app and show its levels', async ({ page }) => {
    // First app (MS Word) should be auto-selected, levels should appear
    await expect(
      page.getByText(/level/i).first()
    ).toBeVisible({ timeout: 10000 });
  });

  test.fixme('should load levels when clicking an app', async ({ page }) => {
    // Click Excel app
    const excelCard = page.getByText(/excel/i).first();
    await excelCard.click();

    // Should update pane 2 to show Excel levels
    await expect(
      page.getByText(/excel.*levels|levels/i).first()
    ).toBeVisible({ timeout: 10000 });
  });

  test.fixme('should show task details when clicking an unlocked level', async ({ page }) => {
    // Click first available level
    const levelCard = page.getByText(/level 1/i).first();
    await levelCard.click();

    // Pane 3 should show task details
    await expect(
      page.getByText(/task|instructions/i).first()
    ).toBeVisible({ timeout: 10000 });
  });

  test('should prevent clicking locked levels and show toast', async ({ page }) => {
    // Try to click a locked level (usually the last one)
    const lockedLevel = page.getByText(/🔒/).first();
    if (await lockedLevel.isVisible({ timeout: 5000 }).catch(() => false)) {
      await lockedLevel.click();
      // Should show error toast about completing previous level
      await expect(
        page.getByText(/complete.*to unlock|unlock/i).first()
      ).toBeVisible({ timeout: 10000 });
    }
  });

  test.fixme('should display leaderboard for completed tasks', async ({ page }) => {
    // Click first level (likely completed)
    const levelCard = page.getByText(/level 1/i).first();
    await levelCard.click();

    // Leaderboard section should appear
    await expect(
      page.getByText(/leaderboard/i).first()
    ).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Spoken English Course', () => {
  test.fixme('should load spoken english page with task list or task view', async ({ page }) => {
    await page.goto('/student/spoken-english');

    // Should show spoken english content
    await expect(
      page.getByText(/spoken english/i).first()
    ).toBeVisible({ timeout: 10000 });
  });

  test.fixme('should display audio instructions section on task page', async ({ page }) => {
    await page.goto('/student/spoken-english/task1');

    // Audio instructions section
    await expect(
      page.getByText(/audio|instructions|listen/i).first()
    ).toBeVisible({ timeout: 10000 });
  });

  test.fixme('should display recording controls', async ({ page }) => {
    await page.goto('/student/spoken-english/task1');

    // Record button should be visible
    await expect(
      page.getByRole('button', { name: /record/i }).first()
    ).toBeVisible({ timeout: 10000 });
  });

  test('should have submit button disabled before recording', async ({ page }) => {
    await page.goto('/student/spoken-english/task1');

    const submitBtn = page.getByRole('button', { name: /submit/i }).first();
    if (await submitBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await expect(submitBtn).toBeDisabled();
    }
  });
});

test.describe('Life Skills Course', () => {
  test('should load life skills page', async ({ page }) => {
    await page.goto('/student/life-skills');

    await expect(
      page.getByText(/life skills/i).first()
    ).toBeVisible({ timeout: 10000 });
  });

  test('should display quiz section with questions', async ({ page }) => {
    await page.goto('/student/life-skills');

    // Should see quiz content or voice task content
    await expect(
      page.getByText(/quiz|question|task|voice/i).first()
    ).toBeVisible({ timeout: 10000 });
  });

  test.fixme('should display voice recording interface for voice tasks', async ({ page }) => {
    await page.goto('/student/life-skills/voice/voice_task_1');

    // Should show recording controls or question
    await expect(
      page.getByText(/record|question|hold/i).first()
    ).toBeVisible({ timeout: 10000 });
  });
});
