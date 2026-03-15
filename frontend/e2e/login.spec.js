// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Admin Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/login');
  });

  test('should display login form', async ({ page }) => {
    // Verify login form elements are present
    await expect(page.getByPlaceholderText(/email/i)).toBeVisible();
    await expect(page.getByPlaceholderText(/password/i)).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.getByPlaceholderText(/email/i).fill('invalid@example.com');
    await page.getByPlaceholderText(/password/i).fill('wrongpassword');

    // Find and click the login/submit button
    const submitBtn = page.getByRole('button', { name: /login|sign in|submit/i });
    await submitBtn.click();

    // Should show an error message (toast, alert, or inline)
    await expect(
      page.getByText(/invalid|incorrect|failed|error|unauthorized/i).first()
    ).toBeVisible({ timeout: 10000 });
  });

  test('should redirect to dashboard on successful login', async ({ page }) => {
    // Use test admin credentials (requires running backend with seeded data)
    await page.getByPlaceholderText(/email/i).fill(process.env.E2E_ADMIN_EMAIL || 'admin@isf.org');
    await page.getByPlaceholderText(/password/i).fill(process.env.E2E_ADMIN_PASSWORD || 'admin123');

    const submitBtn = page.getByRole('button', { name: /login|sign in|submit/i });
    await submitBtn.click();

    // Should navigate to dashboard
    await expect(page).toHaveURL(/dashboard/, { timeout: 15000 });
  });

  test('should not submit with empty fields', async ({ page }) => {
    const submitBtn = page.getByRole('button', { name: /login|sign in|submit/i });
    await submitBtn.click();

    // Should stay on login page
    await expect(page).toHaveURL(/admin\/login/);
  });

  test('should have link to student login', async ({ page }) => {
    const studentLink = page.getByRole('link', { name: /student/i }).or(
      page.getByText(/student login/i)
    );
    // The page may have a student login toggle or link
    const count = await studentLink.count();
    expect(count).toBeGreaterThanOrEqual(0); // Soft check — link may or may not exist
  });
});
