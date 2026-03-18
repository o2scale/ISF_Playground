# E2E Playwright CLI Test Orchestrator

You are the E2E Test Generation Orchestrator for ISF_Playground. Your job is to set up Playwright CLI, authenticate as each role, walk through every critical user flow, and produce automated `.spec.js` files that run via `npx playwright test`.

## Mission

Convert the 35+ existing E2E test scenario markdown docs (`docs/qa/e2e/`) into runnable Playwright spec files, organized by role. Also cover the 13 open client bugs as explicit test cases.

## Critical Rules

1. **Use `playwright-cli` commands via Bash** — NOT the Playwright MCP server tools
2. **Parallelize by role** — spawn one subagent per role, each handles its own auth + specs
3. **Every spec must be runnable headlessly** — `npx playwright test` must work unattended
4. **Use `state-save`/`state-load`** for auth persistence per role
5. **Auto-generated code from CLI interactions → copy into spec files**
6. **Never hardcode passwords in spec files** — use `process.env` with defaults
7. **Test against `http://localhost:3000`** (frontend) and `http://localhost:5001` (backend API)

---

## Phase 0: Setup

### 0.1 Install Playwright CLI

```bash
cd /data/home/dev/Desktop/dev/ISF_Playground
npm install -g @playwright/cli@latest
playwright-cli install-browser
```

### 0.2 Update Playwright Config

Update `frontend/playwright.config.js` to use role-based projects with `storageState`:

```javascript
const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

module.exports = defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 3,
  reporter: [['html'], ['list']],
  timeout: 30000,
  expect: { timeout: 10000 },

  use: {
    baseURL: process.env.E2E_BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },

  projects: [
    // Auth setup — runs first, saves state per role
    { name: 'auth-setup', testMatch: /.*\.setup\.js/ },

    // Role-based test suites
    {
      name: 'admin',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'e2e/.auth/admin.json',
      },
      testMatch: /admin\/.*\.spec\.js/,
      dependencies: ['auth-setup'],
    },
    {
      name: 'coach',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'e2e/.auth/coach.json',
      },
      testMatch: /coach\/.*\.spec\.js/,
      dependencies: ['auth-setup'],
    },
    {
      name: 'student',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'e2e/.auth/student.json',
      },
      testMatch: /student\/.*\.spec\.js/,
      dependencies: ['auth-setup'],
    },
    {
      name: 'purchase-manager',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'e2e/.auth/pm.json',
      },
      testMatch: /pm\/.*\.spec\.js/,
      dependencies: ['auth-setup'],
    },
    {
      name: 'medical',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'e2e/.auth/medical.json',
      },
      testMatch: /medical\/.*\.spec\.js/,
      dependencies: ['auth-setup'],
    },
  ],

  webServer: {
    command: 'npm start',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120000,
  },
});
```

### 0.3 Create Directory Structure

```bash
cd frontend
mkdir -p e2e/.auth
mkdir -p e2e/auth
mkdir -p e2e/admin
mkdir -p e2e/coach
mkdir -p e2e/student
mkdir -p e2e/pm
mkdir -p e2e/medical
```

### 0.4 Create Auth Setup File

Create `frontend/e2e/auth/global.setup.js`:

```javascript
const { test: setup, expect } = require('@playwright/test');
const path = require('path');

const roles = [
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
    email: process.env.E2E_COACH_EMAIL || 'isfinbengaluru@gmail.com',
    password: process.env.E2E_COACH_PASSWORD || 'test123',
    file: path.join(__dirname, '../.auth/coach.json'),
    loginPath: '/admin/login',
    dashboardPattern: /dashboard/,
  },
  {
    name: 'student',
    email: process.env.E2E_STUDENT_EMAIL || 'vis@gmail.com',
    password: process.env.E2E_STUDENT_PASSWORD || 'test123',
    file: path.join(__dirname, '../.auth/student.json'),
    loginPath: '/',
    dashboardPattern: /dashboard|home/,
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

for (const role of roles) {
  setup(`authenticate as ${role.name}`, async ({ page }) => {
    await page.goto(role.loginPath);
    await page.getByPlaceholderText(/email/i).fill(role.email);
    await page.getByPlaceholderText(/password/i).fill(role.password);
    await page.getByRole('button', { name: /login|sign in|submit/i }).click();
    await expect(page).toHaveURL(role.dashboardPattern, { timeout: 15000 });
    await page.context().storageState({ path: role.file });
  });
}
```

### 0.5 Add .gitignore Entry

Append to `frontend/.gitignore`:
```
e2e/.auth/
```

---

## Phase 1: Generate Specs by Role (PARALLEL)

Spawn **5 subagents in parallel** — one per role. Each subagent:

1. Reads the relevant E2E scenario docs from `docs/qa/e2e/`
2. Reads the client bugs for its role from `_bmad-output/implementation-artifacts/client-bugs.md`
3. Uses `playwright-cli` to walk through flows interactively (generates code)
4. Saves the generated + hand-crafted specs into `frontend/e2e/{role}/`

**IMPORTANT:** If both frontend AND backend servers are not running, skip the interactive `playwright-cli` walk-through and write specs directly from the scenario docs. The specs should be written to work when servers ARE running.

### Subagent A: Admin Specs

**Source scenario docs:**
- `docs/qa/e2e/epic-02-story-01-course-creation.md`
- `docs/qa/e2e/epic-02-story-02-content-management.md`
- `docs/qa/e2e/epic-02-story-03-quiz-assessment-builder.md`
- `docs/qa/e2e/epic-02-story-04-translation.md`
- `docs/qa/e2e/epic-02-story-05-course-publishing-archiving.md`
- `docs/qa/e2e/sprint5-story-14-product-image-upload.md`
- `docs/qa/e2e/sprint5-story-18-admin-approval-workflow.md`
- `docs/qa/e2e/sprint5-story-25-inline-product-addition.md`
- `docs/qa/e2e/story-05-product-crud.md`
- `docs/qa/e2e/story-06-inventory-management.md`
- `docs/qa/e2e/story-07-stock-alerts.md`

**Client bugs to cover:** A-1, A-2, A-4, A-6

**Output files:**
```
frontend/e2e/admin/
├── course-management.spec.js    # Create, publish, assign, archive courses
├── content-quiz.spec.js         # Content upload, quiz builder, translation
├── shop-products.spec.js        # CRUD products, image upload, inventory
├── purchase-approval.spec.js    # Approve/reject purchase requests
├── reports.spec.js              # Zero purchases report, analytics
└── client-bugs.spec.js          # A-1 assign crash, A-2 approve button, A-4 translation, A-6 back button
```

### Subagent B: Coach Specs

**Source scenario docs:**
- `docs/qa/e2e/epic-03-story-02-grading-interface.md`
- `docs/qa/e2e/sprint5-story-13-coach-delivery-management.md`
- `docs/qa/e2e/sprint6-story-01-coach-view-corrections.md`
- `docs/qa/e2e/sprint6-story-01-ac1-week-navigation.md`
- `docs/qa/e2e/sprint6-story-01-bug-001-schedule-assignment-fix.md`

**Client bugs to cover:** C-4, C-6, C-7

**Output files:**
```
frontend/e2e/coach/
├── courses-assignments.spec.js  # View courses, assign work, track progress
├── grading.spec.js              # Grade submissions, bulk grade, coin awards
├── shop-requests.spec.js        # Create purchase requests, select Balagruha
├── dashboard.spec.js            # Schedule, week navigation
└── client-bugs.spec.js          # C-4 assignment progress, C-6 add user, C-7 12hr clock
```

### Subagent C: Student Specs

**Source scenario docs:**
- `docs/qa/e2e/epic-01-story-01-student-homepage.md`
- `docs/qa/e2e/epic-01-story-02-computer-apps.md`
- `docs/qa/e2e/epic-01-story-03-art-course.md`
- `docs/qa/e2e/epic-01-story-04-spoken-english.md`
- `docs/qa/e2e/epic-01-story-05-life-skills.md`
- `docs/qa/e2e/epic-01-story-06-isf-coin-wallet.md`
- `docs/qa/e2e/sprint5-story-16-student-profile-page.md`
- `docs/qa/e2e/story-08-coin-spending.md`
- `docs/qa/e2e/story-09-transaction-management.md`
- `docs/qa/e2e/story-10-order-cancellation.md`

**Client bugs to cover:** S-1, S-2, S-9, S-10

**Output files:**
```
frontend/e2e/student/
├── homepage-navigation.spec.js  # Dashboard, course list, resume activity
├── courses-quiz.spec.js         # Computer apps, spoken english, life skills quizzes
├── art-course.spec.js           # Art course, canvas, gallery
├── coin-economy.spec.js         # Earn coins, balance display, transaction history
├── shop-orders.spec.js          # Browse shop, add to cart, place order, cancel
└── client-bugs.spec.js          # S-1 course visibility, S-2 order workflow, S-9 zero coins, S-10 duplicates
```

### Subagent D: Purchase Manager Specs

**Source scenario docs:**
- `docs/qa/e2e/sprint5-story-17-purchase-request-creation.md`
- `docs/qa/e2e/sprint5-story-18-admin-approval-workflow.md`
- `docs/qa/e2e/sprint5-story-11-analytics-dashboard.md`
- `docs/qa/e2e/sprint5-story-12-transaction-reports.md`

**Client bugs to cover:** PM-1

**Output files:**
```
frontend/e2e/pm/
├── purchase-lifecycle.spec.js   # Create, order, deliver_store, deliver_balagruha (4-step)
├── suppliers-vendors.spec.js    # Vendor list, supplier data at ordering
├── analytics.spec.js            # Dashboard, transaction reports
└── client-bugs.spec.js          # PM-1 missing vendor data
```

### Subagent E: Medical Specs

**Client bugs to cover:** M-2

**Output files:**
```
frontend/e2e/medical/
├── role-access.spec.js          # Dashboard access, nav items visible
└── client-bugs.spec.js          # M-2 cart crash (negative test — should NOT have add-to-cart)
```

---

## Phase 2: Spec Writing Guidelines

Each spec file must follow these patterns:

### Pattern: Basic test structure

```javascript
// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Feature Name', () => {
  test('should do expected behavior', async ({ page }) => {
    await page.goto('/target-page');

    // Interact
    await page.getByRole('button', { name: /action/i }).click();

    // Assert
    await expect(page.getByText(/success/i)).toBeVisible({ timeout: 10000 });
  });

  test('should handle error case', async ({ page }) => {
    await page.goto('/target-page');

    // Trigger error condition
    // ...

    // Assert error is shown (NOT a blank screen or crash)
    await expect(page.getByText(/error|denied|invalid/i).first()).toBeVisible();
  });
});
```

### Pattern: Client bug regression test

```javascript
test.describe('Client Bug Regressions', () => {
  test('A-1: Assign course should NOT blank screen', async ({ page }) => {
    await page.goto('/dashboard/courses');
    // Navigate to assign
    const assignBtn = page.getByRole('button', { name: /assign/i }).first();
    if (await assignBtn.isVisible({ timeout: 5000 })) {
      await assignBtn.click();
      // Page should NOT be blank — verify content still exists
      await expect(page.locator('body')).not.toBeEmpty();
      await expect(page.getByText(/assign|course|student/i).first()).toBeVisible({ timeout: 5000 });
    }
  });
});
```

### Pattern: Navigation and role access

```javascript
test('should access purchase requests page', async ({ page }) => {
  await page.goto('/dashboard/purchase-requests');
  // Should NOT get access denied
  await expect(page.getByText(/access denied|unauthorized/i)).not.toBeVisible();
  // Should see content
  await expect(page.getByText(/purchase|request/i).first()).toBeVisible();
});
```

### Guidelines

- Use `page.getByRole()`, `page.getByText()`, `page.getByPlaceholderText()`, `page.getByLabel()` — prefer accessible locators
- Use `{ timeout: 10000 }` for assertions that depend on API calls
- Use `.first()` when multiple elements might match
- Use `test.slow()` for long flows (purchase lifecycle, grading)
- Add `test.describe.configure({ mode: 'serial' })` for flows that depend on prior state
- Every client bug gets a regression test with the bug ID in the test name

---

## Phase 3: Run & Validate

After all specs are written:

```bash
cd frontend

# Run auth setup first
npx playwright test --project=auth-setup

# Run all role suites
npx playwright test

# Run specific role
npx playwright test --project=admin
npx playwright test --project=student

# Run with UI for debugging
npx playwright test --ui

# Show HTML report
npx playwright show-report
```

### Expected Output

```
E2E TEST SUITE REPORT
=====================

Auth Setup:     5/5 roles authenticated
Admin Suite:    X tests — Y passed, Z failed
Coach Suite:    X tests — Y passed, Z failed
Student Suite:  X tests — Y passed, Z failed
PM Suite:       X tests — Y passed, Z failed
Medical Suite:  X tests — Y passed, Z failed

Client Bug Regressions: X/13 covered
Total: X tests, Y passed, Z failed

Failures (if any):
- [role] test-name: description of failure
```

---

## Test Credentials

| Role | Email | Password | Login Path |
|------|-------|----------|------------|
| Admin | `admin@gmail.com` | `test123` | `/admin/login` |
| Coach | `isfinbengaluru@gmail.com` | `test123` | `/admin/login` |
| Student | `vis@gmail.com` | `test123` | `/` |
| Purchase Manager | `purchase@gmail.com` | `password123` | `/admin/login` |
| Medical | `samplet@gmail.com` | `password123` | `/admin/login` |

**Override via env vars:** `E2E_ADMIN_EMAIL`, `E2E_ADMIN_PASSWORD`, etc.

**Missing roles:** If any role lacks a test account (e.g., `balagruha-incharge`, `sports-coach`, `music-coach`, `amma`), create one using the existing seed script pattern:

```bash
cd backend
node -e "
const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcryptjs');
require('dotenv').config();

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const hash = await bcrypt.hash('test123', 10);
  await User.findOneAndUpdate(
    { email: 'e2e-{role}@test.com' },
    { email: 'e2e-{role}@test.com', password: hash, role: '{role}', name: 'E2E {Role}', isActive: true },
    { upsert: true, new: true }
  );
  console.log('Created e2e-{role}@test.com');
  await mongoose.disconnect();
})();
"
```

You are authorized to create test accounts as needed for any role.

---

## Fix Protocol

If tests FAIL because of actual bugs (not test issues):

1. Log the failure with role, test name, and screenshot
2. Cross-reference with client-bugs.md — is this already known?
3. If new bug: add to client-bugs.md
4. Do NOT fix bugs in this pass — the goal is to generate the test suite
5. Mark failing tests with `test.fixme()` and a comment explaining the known issue
