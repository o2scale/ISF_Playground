// @ts-check
const { test: setup, expect } = require('@playwright/test');
const path = require('path');

const adminRoles = [
  {
    name: 'admin',
    email: process.env.E2E_ADMIN_EMAIL || 'admin@gmail.com',
    password: process.env.E2E_ADMIN_PASSWORD || 'test123',
    file: path.join(__dirname, '../.auth/admin.json'),
    loginPath: '/admin/login',
    dashboardPattern: /dashboard/,
  },
  {
    name: 'coach',
    email: process.env.E2E_COACH_EMAIL || 'coach@gmail.com',
    password: process.env.E2E_COACH_PASSWORD || 'test123',
    file: path.join(__dirname, '../.auth/coach.json'),
    loginPath: '/admin/login',
    dashboardPattern: /dashboard/,
  },
  {
    name: 'pm',
    email: process.env.E2E_PM_EMAIL || 'purchase@gmail.com',
    password: process.env.E2E_PM_PASSWORD || 'password123',
    file: path.join(__dirname, '../.auth/pm.json'),
    loginPath: '/admin/login',
    dashboardPattern: /dashboard/,
  },
  {
    name: 'medical',
    email: process.env.E2E_MEDICAL_EMAIL || 'samplet@gmail.com',
    password: process.env.E2E_MEDICAL_PASSWORD || 'password123',
    file: path.join(__dirname, '../.auth/medical.json'),
    loginPath: '/admin/login',
    dashboardPattern: /dashboard/,
  },
];

// Admin/coach/pm/medical: email + password login at /admin/login
for (const role of adminRoles) {
  setup(`authenticate as ${role.name}`, async ({ page }) => {
    await page.goto(role.loginPath);
    await page.getByPlaceholder(/email/i).fill(role.email);
    await page.getByPlaceholder(/password/i).fill(role.password);
    await page.getByRole('button', { name: /login|sign in|submit/i }).click();
    await expect(page).toHaveURL(role.dashboardPattern, { timeout: 15000 });
    await page.context().storageState({ path: role.file });
  });
}

// Student: PIN/userId-based login at /login (no password field)
setup('authenticate as student', async ({ page }) => {
  const userId = process.env.E2E_STUDENT_USERID || '1234';
  const file = path.join(__dirname, '../.auth/student.json');

  await page.goto('/login');
  await page.getByPlaceholder('userId').fill(userId);
  await page.getByRole('button', { name: /login/i }).click();
  await expect(page).toHaveURL(/student\/dashboard|dashboard|home/, { timeout: 15000 });
  await page.context().storageState({ path: file });
});
