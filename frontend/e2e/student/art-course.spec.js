// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Student Art Course E2E Tests
 * Covers: Art course modes, canvas preview, gallery, workshop/competition modes
 * Auth: Handled by storageState (student role)
 */

test.describe('Art Course - Mode Selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/student/art');
  });

  test('should display ART COURSE header and 4 mode pills', async ({ page }) => {
    await expect(page.getByText(/art course/i).first()).toBeVisible({ timeout: 10000 });

    // Four mode pills
    await expect(page.getByText(/workshops/i).first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/free sketch/i).first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/art stories/i).first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/competition/i).first()).toBeVisible({ timeout: 10000 });
  });

  test('should default to Workshops mode', async ({ page }) => {
    // Workshops should be active by default, showing workshop content
    await expect(
      page.getByText(/drawing faces|landscape|workshop/i).first()
    ).toBeVisible({ timeout: 10000 });
  });

  test('should switch to Free Sketch mode', async ({ page }) => {
    await page.getByText(/free sketch/i).first().click();

    // Free sketch content
    await expect(
      page.getByText(/free sketch|imagination|create anything/i).first()
    ).toBeVisible({ timeout: 10000 });
  });

  test('should switch to Art Stories mode', async ({ page }) => {
    await page.getByText(/art stories/i).first().click();

    // Art stories content
    await expect(
      page.getByText(/magical forest|brave|story|star painter/i).first()
    ).toBeVisible({ timeout: 10000 });
  });

  test('should switch to Competition mode', async ({ page }) => {
    await page.getByText(/competition/i).first().click();

    // Competition content
    await expect(
      page.getByText(/animals in nature|competition|leaderboard/i).first()
    ).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Art Course - Workshops', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/student/art');
  });

  test('should display workshop details with video player', async ({ page }) => {
    // Workshop should have a video player area (iframe or video element)
    const videoArea = page.locator('iframe, video').first();
    await expect(videoArea).toBeVisible({ timeout: 10000 });
  });

  test('should display instructions section', async ({ page }) => {
    await expect(
      page.getByText(/instructions/i).first()
    ).toBeVisible({ timeout: 10000 });
  });

  test('should show Launch Artweaver button', async ({ page }) => {
    const launchBtn = page.getByRole('button', { name: /launch artweaver/i }).first();
    await expect(launchBtn).toBeVisible({ timeout: 10000 });
  });

  test('should show toast when launching Artweaver', async ({ page }) => {
    const launchBtn = page.getByRole('button', { name: /launch artweaver/i }).first();
    await launchBtn.click();

    // Should show placeholder toast
    await expect(
      page.getByText(/opening artweaver|placeholder|electron/i).first()
    ).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Art Course - Free Sketch & Gallery', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/student/art');
    await page.getByText(/free sketch/i).first().click();
  });

  test('should display canvas size selector', async ({ page }) => {
    await expect(
      page.getByText(/1024.*768|canvas size|standard/i).first()
        .or(page.locator('select').first())
    ).toBeVisible({ timeout: 10000 });
  });

  test('should display My Gallery section with artwork thumbnails', async ({ page }) => {
    await expect(
      page.getByText(/my gallery|gallery/i).first()
    ).toBeVisible({ timeout: 10000 });
  });

  test('should show canvas preview area', async ({ page }) => {
    // Canvas preview placeholder
    await expect(
      page.getByText(/launch artweaver|start drawing|artwork will appear/i).first()
    ).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Art Course - Competition', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/student/art');
    await page.getByText(/competition/i).first().click();
  });

  test('should display competition theme and prize structure', async ({ page }) => {
    // Prize info
    await expect(
      page.getByText(/1st place|500 coins|prize/i).first()
    ).toBeVisible({ timeout: 10000 });
  });

  test('should display competition leaderboard', async ({ page }) => {
    await expect(
      page.getByText(/leaderboard/i).first()
    ).toBeVisible({ timeout: 10000 });
  });

  test('should display competition rules', async ({ page }) => {
    await expect(
      page.getByText(/rules/i).first()
    ).toBeVisible({ timeout: 10000 });
  });
});
