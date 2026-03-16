# Frontend Test Baseline Report

**Story:** 7.2 — Frontend Test Baseline
**Date:** 2026-03-16
**Author:** Quinn (QA Engineer)
**Status:** Complete

---

## 1. Unit Test Framework Status

### Framework: Jest + React Testing Library (configured and functional)

| Dependency | Version | Location |
|---|---|---|
| `@testing-library/react` | ^16.2.0 | dependencies |
| `@testing-library/jest-dom` | ^6.6.3 | dependencies |
| `@testing-library/user-event` | ^13.5.0 | dependencies |
| `@testing-library/dom` | ^10.4.0 | dependencies |
| `react-scripts` (includes Jest) | 5.0.1 | dependencies |

**Test runner command:** `npx react-scripts test` (Jest via CRA)

**Jest configuration** in `frontend/package.json`:
- Custom `moduleNameMapper` for react-router-dom v7 compatibility
- `transformIgnorePatterns` to transpile axios, axios-retry, react-router

### Unit Test Results (run 2026-03-16)

| Metric | Value |
|---|---|
| **Test Suites** | 11 total (8 passed, 3 failed) |
| **Tests** | 35 total (24 passed, 11 failed) |
| **Execution Time** | ~17-25 seconds |
| **Snapshots** | 0 |

### Test File Inventory (11 files)

| # | Test File | Tests | Status |
|---|---|---|---|
| 1 | `src/App.test.js` | 1 | FAIL |
| 2 | `src/__tests__/pages/MasterInventoryReport.test.js` | 1 | PASS |
| 3 | `src/__tests__/pages/CoachRequestsDashboard.test.js` | 3 | PASS |
| 4 | `src/__tests__/components/shop/ProductGrid.test.js` | 1 | PASS |
| 5 | `src/__tests__/components/shop/RequestItemModal.test.js` | 5 | FAIL (1/5) |
| 6 | `src/__tests__/components/shop/StockAdjustmentModal.test.js` | 1 | PASS |
| 7 | `src/__tests__/components/purchaseManagement/CreatePurchaseRequestModal.test.js` | 2 | PASS |
| 8 | `src/__tests__/components/purchaseManagement/ViewRequestModal.test.js` | 2 | PASS |
| 9 | `src/__tests__/components/purchaseManagement/PurchaseManagementStockReconciliation.test.js` | 1 | PASS |
| 10 | `src/__tests__/components/purchaseManagement/ShopInventoryView.test.js` | 15 | FAIL (10/15) |
| 11 | `src/__tests__/components/admin/inventory/NewItemForm.test.js` | 4 | PASS |

### Failing Test Analysis

**App.test.js (1 test, import error)**
- Root cause: `@vladmandic/human` module fails to resolve in Jest (native Node module incompatibility via FaceIdLogin -> logincard -> App)
- The test itself (`renders student login form`) never executes
- Fix: Add a jest mock for `@vladmandic/human` or the FaceIdLogin component

**RequestItemModal.test.js (1 of 5 failing)**
- `submits valid request` — async assertion timeout (likely mock API timing issue)

**ShopInventoryView.test.js (10 of 15 failing)**
- All failures are `findByText` timeouts waiting for `PR-SHOP` text
- Root cause: Tests expect tab-based UI rendering (category tabs, status bucket tabs) but the component's async data fetching or rendering path has changed
- These appear to be regression failures from recent UI refactoring

---

## 2. E2E Test Inventory (Playwright)

### Framework: Playwright (configured)

| Config Item | Value |
|---|---|
| Package | `@playwright/test` ^1.56.0 (devDependencies) |
| Config file | `frontend/playwright.config.js` |
| Test directory | `frontend/e2e/` |
| Browser | Chromium only |
| Base URL | `http://localhost:3000` (configurable via `E2E_BASE_URL`) |
| Reporter | HTML |
| Timeout | 30 seconds per test |
| Web server auto-start | **Commented out** (manual server start required) |

### E2E Test Files and Tests (9 total)

**File 1: `e2e/login.spec.js` — Admin Login Flow (5 tests)**

| Test | User Flow Covered |
|---|---|
| should display login form | Login page rendering |
| should show error for invalid credentials | Auth error handling |
| should redirect to dashboard on successful login | Successful auth + redirect |
| should not submit with empty fields | Form validation |
| should have link to student login | Navigation between login types |

**File 2: `e2e/purchase-lifecycle.spec.js` — Purchase Request Lifecycle (4 tests)**

| Test | User Flow Covered |
|---|---|
| should navigate to purchase requests page | Sidebar navigation |
| should create a new purchase request | Full create flow (category, balagruha, submit) |
| should view purchase request details | List -> detail view |
| should approve a pending purchase request | Approval workflow |

### E2E Server Dependencies
- Requires **both frontend (port 3000) and backend** running
- Requires **seeded admin user** (env vars: `E2E_ADMIN_EMAIL`, `E2E_ADMIN_PASSWORD`, defaults to `admin@isf.org` / `admin123`)
- Requires at least one product in the shop for purchase lifecycle tests
- `npx playwright test --list` succeeds (9 tests listed), but actual execution requires live servers

### E2E Runnability Assessment
- Tests can be listed without servers: **YES**
- Tests can run without servers: **NO** (all tests navigate to `localhost:3000`)
- Tests use defensive patterns (`.catch(() => false)` on visibility checks), so some may "pass" vacuously even with missing data

---

## 3. Coverage Tooling Status

| Item | Status |
|---|---|
| Jest `--coverage` flag | Available (CRA built-in) but **not configured as a script** |
| Istanbul/nyc | Not installed |
| Playwright coverage | Not configured |
| CI coverage gates | None |
| Coverage thresholds in jest config | None defined |

**Note:** Running `npx react-scripts test --coverage --watchAll=false` should work out of the box (CRA includes Istanbul via Jest). No dedicated coverage script exists in `package.json`.

---

## 4. Gap Analysis

### Source File Counts

| Category | File Count |
|---|---|
| Components (`src/components/`) | 206 files |
| Pages (`src/pages/`) | 36 files |
| Hooks (`src/hooks/`) | 6 files (+ hooks inside components/) |
| API modules (`src/api/`) | ~20 files |
| Test files (unit) | 11 files (10 in `__tests__/`, 1 App.test.js) |
| Test files (E2E) | 2 files |
| **Total source files** | ~268 |

### Component Directories WITH Test Coverage (3 of 24)

| Directory | Test Files | Coverage |
|---|---|---|
| `components/shop/` (44 files) | 3 test files | Partial — ProductGrid, RequestItemModal, StockAdjustmentModal |
| `components/purchaseManagement/` (9 files) | 4 test files | Good — ShopInventoryView, CreatePurchaseRequestModal, ViewRequestModal, StockReconciliation |
| `components/admin/inventory/` (1 file) | 1 test file | NewItemForm covered |

### Page Directories WITH Test Coverage (2 of 36 pages)

| Page | Test File |
|---|---|
| MasterInventoryReport | `__tests__/pages/MasterInventoryReport.test.js` |
| CoachRequestsDashboard | `__tests__/pages/CoachRequestsDashboard.test.js` |

### Component Directories with ZERO Test Coverage (21 of 24)

| Directory | File Count | Risk Level | Notes |
|---|---|---|---|
| `components/login/` | 2 | **HIGH** | Admin login — auth entry point |
| `components/pinlogin/` | 2 | **HIGH** | Student login (PIN + UserID) |
| `components/faceidlogin/` | 1 | **HIGH** | Face ID auth |
| `components/RBAC/` | 1 | **HIGH** | Role-based access control management |
| `components/ProtectedRoute.js` | 1 | **HIGH** | Route guard — enforces auth |
| `components/PermissionGuard.jsx` | 1 | **HIGH** | Permission-based UI gating |
| `components/RoleBasedNavigation.js` | 1 | **HIGH** | Navigation by role |
| `components/machineManagement/` | 1 | **MEDIUM** | Machine registration/management |
| `components/dashboard/` | 7 | **MEDIUM** | Admin + balagruha dashboards |
| `components/admin/` (non-inventory) | ~40 | **MEDIUM** | Course builder, bulk ops, modals |
| `components/student/` | ~25 | **MEDIUM** | Student UI (courses, coins, art) |
| `components/coach/` | 7 | **MEDIUM** | Coach assignments, grading |
| `components/courseManagement/` | 2 | **MEDIUM** | Course management |
| `components/balagruhaManagement/` | ? | **MEDIUM** | Balagruha management |
| `components/Attendance/` | ? | **LOW** | Attendance tracking |
| `components/cards/` | 1 | **LOW** | Generic card component |
| `components/header/` | 1 | **LOW** | App header |
| `components/sidebar/` | ? | **LOW** | Sidebar navigation |
| `components/profile/` | ? | **LOW** | User profile |
| `components/repairManagement/` | ? | **LOW** | Repair tracking |
| `components/ui/` | ? | **LOW** | Shared UI primitives (Radix wrappers) |

### Pages with ZERO Test Coverage (34 of 36)

**HIGH risk untested pages:**
- `Checkout.jsx` — Shop checkout flow (money handling)
- `MachineManagement.jsx` — Machine admin page
- `ProductManagement.jsx` — Product CRUD
- `VendorManagement.jsx` — Vendor CRUD
- `InventoryManagement.jsx` — Inventory operations
- `ShopAnalytics.jsx` — Financial reporting
- `TransactionHistory.jsx` / `TransactionReports.jsx` — Transaction audit
- All `pages/admin/*` (7 pages) — Course builder, quiz builder, translations
- All `pages/student/*` (7 pages) — Student learning experiences
- All `pages/coach/*` (2 pages) — Coach grading dashboard

### Hooks with ZERO Test Coverage (6 of 6)

- `usePermission.js` — **HIGH risk** (RBAC enforcement)
- `useUserRole.js` — **HIGH risk** (role detection)
- `useAutoSave.js`, `useDebounce.js`, `useFileUpload.js`, `useMilestones.js` — Medium risk

### Coverage Ratio Summary

| Metric | Value |
|---|---|
| Component directories with any test | 3 / 24 = **12.5%** |
| Pages with any test | 2 / 36 = **5.6%** |
| Hooks with any test | 0 / 6 = **0%** |
| Total test files / total source files | 11 / ~268 = **4.1%** |
| Individual tests passing | 24 / 35 = **68.6%** |

---

## 5. E2E Coverage Mapping

| User Flow | E2E Coverage | Unit Test Coverage |
|---|---|---|
| Admin login | YES (5 tests) | NO |
| Student login (PIN/UserID) | NO | NO |
| Face ID login | NO | NO |
| Purchase request create | YES (1 test) | YES (CreatePurchaseRequestModal) |
| Purchase request approve | YES (1 test) | YES (ViewRequestModal) |
| Purchase request lifecycle | YES (4 tests) | Partial |
| Shop browse + cart + checkout | NO | Partial (ProductGrid, RequestItemModal) |
| Student course experience | NO | NO |
| Coach grading | NO | NO |
| RBAC / permissions | NO | NO |
| Machine management | NO | NO |
| Inventory / stock management | NO | YES (MasterInventoryReport, StockAdjustmentModal) |

---

## 6. Recommended Test Strategy

### Immediate Priorities (fix before expanding)

1. **Fix App.test.js** — Add jest mock for `@vladmandic/human` so the root smoke test passes
2. **Fix ShopInventoryView.test.js** — 10 failing tests from tab UI changes; update selectors/assertions to match current component output
3. **Fix RequestItemModal.test.js** — 1 async timeout; likely needs mock timer or async assertion adjustment

### High-Priority New Tests (auth and money flows)

| Priority | Component/Page | Rationale |
|---|---|---|
| P0 | `usePermission.js` + `useUserRole.js` | RBAC hooks — unit testable, high impact |
| P0 | `ProtectedRoute.js` + `PermissionGuard.jsx` | Auth gates — unit testable, prevents unauthorized access |
| P0 | `Checkout.jsx` | Money flow — must not have regressions |
| P1 | `components/login/logincard.js` | Admin auth entry point |
| P1 | `components/pinlogin/` | Student auth entry point |
| P1 | `MachineManagement.jsx` | New feature, RBAC-gated |
| P1 | `RBACManagement.js` | Role management admin page |

### E2E Expansion Priorities

| Priority | Flow | Notes |
|---|---|---|
| P0 | Student login (PIN + UserID) | Currently zero coverage |
| P0 | Shop checkout end-to-end | Money flow, currently no E2E |
| P1 | RBAC enforcement | Verify role-gated pages reject unauthorized users |
| P1 | Machine management | New feature |
| P2 | Student course experience | Large surface area but lower risk |
| P2 | Coach grading workflow | Depends on student submissions |

### Infrastructure Recommendations

1. **Add `"test:coverage"` script** to `package.json`: `"react-scripts test --coverage --watchAll=false"`
2. **Set coverage thresholds** in jest config to prevent regression
3. **Enable Playwright webServer** config (currently commented out) for CI
4. **Add `"test:e2e"` script** to `package.json`: `"npx playwright test"`
5. **Consider adding `jest.setup.js`** with global mocks for problematic modules (`@vladmandic/human`)
