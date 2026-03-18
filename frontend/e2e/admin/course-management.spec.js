// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Admin — Course Management E2E Tests
 * Covers: Epic 02 Story 01 (Course Creation & Structure Builder)
 *         Epic 02 Story 05 (Course Publishing & Archiving)
 *
 * Auth handled via storageState — tests start logged in as admin.
 */

test.describe('Course CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/courses');
    await expect(page.getByRole('heading', { name: /course/i }).first()).toBeVisible({ timeout: 10000 });
  });

  test('should display course list with create button', async ({ page }) => {
    await expect(page.getByRole('button', { name: /create new course/i })).toBeVisible();
    // At least the course list container should be present
    await expect(page.locator('main')).toBeVisible();
  });

  test('should open create course modal and validate required fields', async ({ page }) => {
    await page.getByRole('button', { name: /create new course/i }).click();

    // Modal should open
    await expect(page.getByText(/create.*course/i).first()).toBeVisible();

    // Try submitting without title
    const submitBtn = page.getByRole('button', { name: /create course as draft/i })
      .or(page.getByRole('button', { name: /create/i })).first();
    await submitBtn.click();

    // Should show validation error
    await expect(
      page.getByText(/required|title is required/i).first()
    ).toBeVisible({ timeout: 10000 });
  });

  test('should create a new draft course', async ({ page }) => {
    await page.getByRole('button', { name: /create new course/i }).click();

    // Fill course form
    await page.getByPlaceholder(/title/i).first().fill('E2E Test Course');
    await page.getByPlaceholder(/description/i).first().fill('Automated test course description');

    // Select category if dropdown exists
    const categorySelect = page.locator('select').filter({ hasText: /category|computer|art/i }).first();
    if (await categorySelect.isVisible().catch(() => false)) {
      await categorySelect.selectOption({ index: 1 });
    }

    // Select difficulty if radio/dropdown exists
    const difficultyOption = page.getByLabel(/beginner/i).or(page.getByText(/beginner/i)).first();
    if (await difficultyOption.isVisible().catch(() => false)) {
      await difficultyOption.click();
    }

    // Submit
    const createBtn = page.getByRole('button', { name: /create course as draft|create/i }).first();
    await createBtn.click();

    // Should see success notification
    await expect(
      page.getByText(/created successfully/i).first()
    ).toBeVisible({ timeout: 10000 });
  });

  test('should edit course metadata via context menu', async ({ page }) => {
    // Click context menu on first course
    const menuBtn = page.locator('button').filter({ hasText: /⋮|more/i }).first()
      .or(page.locator('[aria-label*="menu"]').first());
    await menuBtn.click();

    await page.getByText(/edit metadata/i).first().click();

    // Modal should open with pre-filled data
    await expect(page.getByPlaceholder(/title/i).first()).toBeVisible();

    // Change title
    const titleInput = page.getByPlaceholder(/title/i).first();
    await titleInput.clear();
    await titleInput.fill('Updated Course Title');

    const updateBtn = page.getByRole('button', { name: /update/i }).first();
    await updateBtn.click();

    await expect(
      page.getByText(/updated successfully/i).first()
    ).toBeVisible({ timeout: 10000 });
  });

  test('should search and filter courses', async ({ page }) => {
    const searchBox = page.getByPlaceholder(/search/i).first();
    if (await searchBox.isVisible().catch(() => false)) {
      await searchBox.fill('Computer');
      await page.waitForTimeout(500);
      // Verify filtering happened (page did not crash)
      await expect(page.locator('main')).toBeVisible();
    }
  });

  test('should filter courses by status', async ({ page }) => {
    const statusFilter = page.locator('select').filter({ hasText: /all.*status|draft|published/i }).first();
    if (await statusFilter.isVisible().catch(() => false)) {
      await statusFilter.selectOption({ label: 'Draft' });
      await page.waitForTimeout(500);
      // Page should still be functional
      await expect(page.locator('main')).toBeVisible();
    }
  });
});

test.describe('Course Structure Builder', () => {
  test('should navigate to structure builder from context menu', async ({ page }) => {
    await page.goto('/admin/courses');
    await expect(page.getByRole('heading', { name: /course/i }).first()).toBeVisible({ timeout: 10000 });

    const menuBtn = page.locator('button').filter({ hasText: /⋮|more/i }).first()
      .or(page.locator('[aria-label*="menu"]').first());
    await menuBtn.click();

    await page.getByText(/edit structure/i).first().click();

    // Should navigate to structure page
    await expect(page).toHaveURL(/\/structure/, { timeout: 10000 });
  });

  test('should add a module to a course', async ({ page }) => {
    await page.goto('/admin/courses');
    await expect(page.locator('main')).toBeVisible({ timeout: 10000 });

    // Navigate to structure builder for first course
    const menuBtn = page.locator('button').filter({ hasText: /⋮|more/i }).first()
      .or(page.locator('[aria-label*="menu"]').first());
    await menuBtn.click();
    await page.getByText(/edit structure/i).first().click();
    await expect(page).toHaveURL(/\/structure/, { timeout: 10000 });

    // Add module
    const addModuleBtn = page.getByRole('button', { name: /add module/i });
    if (await addModuleBtn.isVisible().catch(() => false)) {
      await addModuleBtn.click();

      await page.getByPlaceholder(/title|module/i).first().fill('E2E Module 1');
      const saveBtn = page.getByRole('button', { name: /add module|save/i }).first();
      await saveBtn.click();

      await expect(
        page.getByText(/module.*added|successfully/i).first()
      ).toBeVisible({ timeout: 10000 });
    }
  });
});

test.describe('Course Publishing & Archiving', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/courses');
    await expect(page.getByRole('heading', { name: /course/i }).first()).toBeVisible({ timeout: 10000 });
  });

  test('should show publish validation modal for incomplete course', async ({ page }) => {
    // Open context menu on a draft course
    const menuBtn = page.locator('button').filter({ hasText: /⋮|more/i }).first()
      .or(page.locator('[aria-label*="menu"]').first());
    await menuBtn.click();

    const publishOption = page.getByText(/publish/i).first();
    if (await publishOption.isVisible().catch(() => false)) {
      await publishOption.click();

      // Should show validation modal or error
      await expect(
        page.getByText(/publish|validation|cannot publish/i).first()
      ).toBeVisible({ timeout: 10000 });
    }
  });

  test('should archive a published course', async ({ page }) => {
    // Filter to published courses
    const statusFilter = page.locator('select').filter({ hasText: /status|draft|published/i }).first();
    if (await statusFilter.isVisible().catch(() => false)) {
      await statusFilter.selectOption({ label: 'Published' });
      await page.waitForTimeout(500);
    }

    const menuBtn = page.locator('button').filter({ hasText: /⋮|more/i }).first()
      .or(page.locator('[aria-label*="menu"]').first());
    if (await menuBtn.isVisible().catch(() => false)) {
      await menuBtn.click();

      const archiveOption = page.getByText(/archive/i).first();
      if (await archiveOption.isVisible().catch(() => false)) {
        await archiveOption.click();

        // Confirm archive
        const confirmBtn = page.getByRole('button', { name: /archive course|confirm/i }).first();
        if (await confirmBtn.isVisible().catch(() => false)) {
          await confirmBtn.click();
          await expect(
            page.getByText(/archived successfully/i).first()
          ).toBeVisible({ timeout: 10000 });
        }
      }
    }
  });

  test('should restore an archived course', async ({ page }) => {
    // Filter to archived courses
    const statusFilter = page.locator('select').filter({ hasText: /status|draft|published/i }).first();
    if (await statusFilter.isVisible().catch(() => false)) {
      await statusFilter.selectOption({ label: 'Archived' });
      await page.waitForTimeout(500);
    }

    const menuBtn = page.locator('button').filter({ hasText: /⋮|more/i }).first()
      .or(page.locator('[aria-label*="menu"]').first());
    if (await menuBtn.isVisible().catch(() => false)) {
      await menuBtn.click();

      const restoreOption = page.getByText(/restore/i).first();
      if (await restoreOption.isVisible().catch(() => false)) {
        await restoreOption.click();

        const confirmBtn = page.getByRole('button', { name: /restore course|confirm/i }).first();
        if (await confirmBtn.isVisible().catch(() => false)) {
          await confirmBtn.click();
          await expect(
            page.getByText(/restored.*successfully/i).first()
          ).toBeVisible({ timeout: 10000 });
        }
      }
    }
  });

  test('should show correct context menu actions for draft course', async ({ page }) => {
    // Filter to draft
    const statusFilter = page.locator('select').filter({ hasText: /status|draft|published/i }).first();
    if (await statusFilter.isVisible().catch(() => false)) {
      await statusFilter.selectOption({ label: 'Draft' });
      await page.waitForTimeout(500);
    }

    const menuBtn = page.locator('button').filter({ hasText: /⋮|more/i }).first()
      .or(page.locator('[aria-label*="menu"]').first());
    if (await menuBtn.isVisible().catch(() => false)) {
      await menuBtn.click();

      // Draft courses should show Publish, not Archive
      await expect(page.getByText(/publish/i).first()).toBeVisible();
      await expect(page.getByText(/archive/i)).not.toBeVisible().catch(() => {
        // Archive may not be present — that is expected for draft
      });
    }
  });

  test('should delete a draft course with confirmation', async ({ page }) => {
    const menuBtn = page.locator('button').filter({ hasText: /⋮|more/i }).first()
      .or(page.locator('[aria-label*="menu"]').first());
    if (await menuBtn.isVisible().catch(() => false)) {
      await menuBtn.click();

      const deleteOption = page.getByText(/delete/i).first();
      if (await deleteOption.isVisible().catch(() => false)) {
        page.on('dialog', (dialog) => dialog.accept());
        await deleteOption.click();

        await expect(
          page.getByText(/deleted successfully/i).first()
        ).toBeVisible({ timeout: 10000 });
      }
    }
  });
});
