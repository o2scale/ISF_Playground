# Test Triage Report — Baseline & Classification

**Story 1.1:** Baseline Coverage Measurement
**Story 1.2:** Triage & Classify Failing Test Suites
**Date:** 2026-03-16
**Agent:** Quinn (QA Engineer) — Claude Opus 4.6 (1M context)
**Baseline Command:** `cd backend && npx jest --coverage --verbose`
**Isolation Command:** `cd backend && npx jest tests/<file>.test.js --verbose --no-coverage`

---

## Coverage Baseline (Story 1.1)

| Metric     | Actual   | Target (70%) | Gap      |
|------------|----------|--------------|----------|
| Statements | 29.77%   | 70%          | -40.23pp |
| Branches   | 22.55%   | 70%          | -47.45pp |
| Functions  | 25.74%   | 70%          | -44.26pp |
| Lines      | 30.21%   | 70%          | -39.79pp |

---

## Test Suite Summary (Story 1.1)

| Metric        | Count |
|---------------|-------|
| Total Suites  | 25    |
| Passing       | 13    |
| Failing       | 12    |
| Total Tests   | 389   |
| Tests Passed  | 320   |
| Tests Failed  | 68    |
| Tests Skipped | 1     |
| Execution Time| 32.511s |

> **Note:** The story file predicted 14 failing suites. The actual count is 12 failing suites. This may indicate 2 suites were fixed in recent commits or the original count was an estimate.

---

## Story 1.2: Triage Classification Table

Each of the 12 failing suites was examined by: (1) reading the test file, (2) verifying the tested source code still exists, (3) running the suite in isolation, (4) checking git blame for when it last changed.

### Master Classification Table

| # | Suite File | Classification | Root Cause | Recommended Action | Priority | NFR3 Protected |
|---|-----------|----------------|------------|-------------------|----------|----------------|
| 1 | `shopProduct_story2_5.test.js` | Outdated | Category enum changed; test fixtures use old values (`other`) | UPDATE TEST — replace old category values with current SHOP_CATEGORIES | P2 | No |
| 2 | `purchaseRequest_story2_1.test.js` | Outdated | Category enum changed; test fixtures use old value (`stationery`) | UPDATE TEST — replace old category values with current SHOP_CATEGORIES | P2 | No |
| 3 | `stockReconciliationRoutes.test.js` | Outdated | Category enum changed; test fixtures use old values (`other`, `books`, `stationery`) | UPDATE TEST — replace old category values with current SHOP_CATEGORIES | P2 | No |
| 4 | `inventoryMasterReportRoutes.test.js` | Outdated | Category enum changed; test fixture uses old value (`stationery`) | UPDATE TEST — replace old category values with current SHOP_CATEGORIES | P3 | No |
| 5 | `pm-dashboard.test.js` | Outdated | Category enum changed; test fixtures use old value (`other`) | UPDATE TEST — replace old category values with current SHOP_CATEGORIES | P2 | No |
| 6 | `shopItem.test.js` | Outdated | Category enum changed; 2 tests use `books`, 1 test expects `price` in required fields but validation fires on category first | UPDATE TEST — replace old category values with current SHOP_CATEGORIES | P2 | No |
| 7 | `shopItem_story1_2.test.js` | Outdated | Category enum changed; test fixtures use old value (`stationery`) | UPDATE TEST — replace old category values with current SHOP_CATEGORIES | P3 | No |
| 8 | `adminProductController_story1_2.test.js` | Outdated | 5 failures — all caused by category enum change: 2 tests get HTTP 400 (controller validation rejects invalid category before model), 3 tests fail at model ValidationError | UPDATE TEST — replace old category values with current SHOP_CATEGORIES | P2 | No |
| 9 | `checkPermission.test.js` | Outdated | `getScopeFilter()` for `scope="own"` now returns `{ _id: userId }` instead of `{ userId: userId }`. All 8 failures expect the old `userId` field name. | UPDATE TEST — change assertions from `userId` to `_id` | P1 | No |
| 10 | `security-rbac.test.js` | Outdated + Configuration | Mixed: 3 tests fail due to `getScopeFilter` returning `_id` instead of `userId`; 2 tests fail with ENOENT on `fs.readFileSync('backend/middleware/...')` — wrong relative path (Jest cwd is `backend/`, path should be `middleware/...`) | FIX ONLY — NEVER DELETE (NFR3). Update `userId` to `_id` in assertions + fix file paths to use `path.join(__dirname, '..')` or relative to `backend/` | P1 | **YES** |
| 11 | `migration-scope.test.js` | Configuration | `mongoose.connect()` called directly in `beforeAll` with hardcoded URI, conflicting with the shared `mongodb-memory-server` connection established by `tests/setup.js` | UPDATE TEST — remove direct `mongoose.connect()`, use shared connection from setup.js | P3 | No |
| 12 | `performance-rbac.test.js` | Configuration | 2 tests use `fs.readFileSync('backend/models/user.js')` and `fs.readFileSync('backend/middleware/checkPermission.js')` — wrong relative path (Jest cwd is `backend/`, so path should be `models/user.js`) | UPDATE TEST — fix file paths to be relative to `backend/` | P3 | No |

### Classification Definitions Used

- **Stale:** The code being tested was removed or completely refactored — the test targets something that no longer exists. Action: DELETE with documented justification.
- **Regression:** The test correctly identifies broken behavior — the code has a real bug. Action: FIX THE CODE.
- **Configuration:** The test itself is correct but the test setup/mocks/infrastructure is broken. Action: FIX TEST SETUP.
- **Outdated:** The code was intentionally changed but the test wasn't updated to match. Action: UPDATE TEST ASSERTIONS.

### Classification Summary

| Classification | Suites | Tests Failed | Recommended Action |
|---------------|--------|-------------|-------------------|
| Outdated | 9 | 55 | Update test assertions/fixtures to match current code |
| Configuration | 2 | 8 | Fix test setup (connection handling, file paths) |
| Outdated + Configuration | 1 | 7 | Fix both assertions and file paths (NFR3 protected) |
| Stale | 0 | 0 | N/A — no suites target deleted code |
| Regression | 0 | 0 | N/A — no real bugs found in source code |
| **Total** | **12** | **70** | |

> **Note on test counts:** Running suites in isolation produces slightly different totals than the full-suite run (70 vs 68 failures). This is due to test discovery differences: `checkPermission.test.js` shows 8/16 in isolation vs 7/12 in full run; `migration-scope.test.js` shows 6/7 vs 4/4; `security-rbac.test.js` shows 7/13 vs 7/12; `performance-rbac.test.js` shows 2/7 vs 2/6. The full-suite run numbers (68 failures) are the canonical baseline from Story 1.1.

---

## Failure Pattern Analysis (Story 1.2 — Task 4)

### Pattern 1: ShopItem Category Enum Change (8 suites, 55 failures)

**Cause:** Commit `b2ae8b96` ("feat(shop): synchronize categories across shop and purchase requests") changed the ShopItem model's `category` enum from old values (`stationery`, `books`, `sports`, `other`) to new values (`ISF Shop`, `Medicines`, `Consumables`, `Repairs`, `Infra`, `Others`) via the shared `backend/constants/shopCategories.js` constant. No test files were updated to match.

**Affected suites:** #1-#8 (all Category A + Category B suites)

**Single fix strategy for Story 1.3:** Search-and-replace old category values in test fixture data across all 8 files:
- `stationery` -> `ISF Shop`
- `books` -> `Medicines`
- `sports` -> `Consumables`
- `other` -> `Others`

**Source files verified present:**
- `backend/models/shopItem.js` — exists, uses `SHOP_CATEGORIES` from constants
- `backend/constants/shopCategories.js` — exists, defines 6 categories
- `backend/controllers/adminProductController.js` — exists, validates category
- `backend/models/purchaseRequest.js` — exists, uses same categories

### Pattern 2: getScopeFilter API Change (2 suites, 15 failures)

**Cause:** The `getScopeFilter()` function in `backend/middleware/checkPermission.js` was intentionally changed (commit `d88419d1` or `d2c8730e`) so that `scope="own"` returns `{ _id: user._id }` instead of the previous `{ userId: user._id }`. This is an intentional API design decision — using `_id` is more correct for MongoDB user document lookups. Tests were not updated.

**Affected suites:** #9 (`checkPermission.test.js`), #10 (`security-rbac.test.js`)

**Single fix strategy for Story 1.3:** Update all assertions that reference `filter.userId` to `filter._id` in both test files. For `security-rbac.test.js`, also fix the `fs.readFileSync` file paths.

**CRITICAL — NFR3:** `security-rbac.test.js` is a security test suite and MUST NEVER be deleted. It must be fixed/updated only.

**Source files verified present:**
- `backend/middleware/checkPermission.js` — exists, `getScopeFilter` function at line 9

### Pattern 3: File Path Resolution Issues (3 suites, shared infrastructure problem)

**Cause:** Three test files use `fs.readFileSync()` with paths relative to the project root (e.g., `'backend/middleware/auth.js'`), but Jest is configured to run from `backend/` as the working directory. This means the correct path should be `'middleware/auth.js'` or use `path.join(__dirname, '..', 'middleware', 'auth.js')`.

**Affected suites:** #10 (`security-rbac.test.js` — 2 of 7 failures), #12 (`performance-rbac.test.js` — 2 of 2 failures)

**Single fix strategy for Story 1.3:** Replace hardcoded `'backend/...'` paths with paths relative to the Jest cwd (`backend/`), or use `path.resolve(__dirname, '..', ...)` for robustness.

### Pattern 4: Mongoose Connection Conflict (1 suite, isolated issue)

**Cause:** `migration-scope.test.js` was written before the shared `tests/setup.js` was established. It calls `mongoose.connect()` in its own `beforeAll` with a hardcoded URI (`mongodb://localhost:27017/isf-test`), which conflicts with the already-active connection from `setup.js` (which uses `MongoMemoryServer`).

**Affected suite:** #11 (`migration-scope.test.js`)

**Fix strategy for Story 1.3:** Remove the manual `mongoose.connect()` / `mongoose.connection.close()` from the test's `beforeAll`/`afterAll` hooks. The test should rely on the shared setup.js connection. The test's 1 passing test ("should map role names to correct default scopes") passes because it doesn't touch the database.

---

## Recommended Fix Priority Order for Story 1.3

| Priority | Action | Suites Resolved | Failures Resolved | Effort |
|----------|--------|----------------|-------------------|--------|
| P1 | Fix `getScopeFilter` assertions (`userId` -> `_id`) + fix file paths in security-rbac.test.js | 2 (checkPermission, security-rbac) | ~15 | Low |
| P2 | Replace old category enum values in test fixtures | 6 (shopProduct, purchaseRequest, stockReconciliation, pm-dashboard, shopItem, adminProductController) | ~43 | Low |
| P3 | Fix remaining config issues (migration-scope connection, performance-rbac paths, inventoryMasterReport + shopItem_story1_2 categories) | 4 | ~12 | Low-Medium |

**Total estimated effort:** Low — all failures have clear, mechanical fixes. No code logic changes needed. No suites need deletion.

---

## Failing Test Suites — Detailed Breakdown (Story 1.1)

### Category A: ShopItem Category Enum Mismatch (7 suites, 40 failures)

These suites all fail because test data uses old category values (`stationery`, `books`, `sports`, `other`) that are no longer valid in the ShopItem model's `category` enum. The model schema was updated (commit `b2ae8b96`) but the test fixtures were not.

| # | Suite File | Path | Failures | Total Tests |
|---|-----------|------|----------|-------------|
| 1 | `shopProduct_story2_5.test.js` | `backend/tests/shopProduct_story2_5.test.js` | 8/8 | 8 |
| 2 | `purchaseRequest_story2_1.test.js` | `backend/tests/purchaseRequest_story2_1.test.js` | 18/18 | 18 |
| 3 | `stockReconciliationRoutes.test.js` | `backend/tests/routes/stockReconciliationRoutes.test.js` | 5/5 | 5 |
| 4 | `inventoryMasterReportRoutes.test.js` | `backend/tests/routes/inventoryMasterReportRoutes.test.js` | 1/2 | 2 |
| 5 | `pm-dashboard.test.js` | `backend/tests/epic3/pm-dashboard.test.js` | 3/4 | 4 |
| 6 | `shopItem.test.js` | `backend/tests/shopItem.test.js` | 3/9 | 9 |
| 7 | `shopItem_story1_2.test.js` | `backend/tests/shopItem_story1_2.test.js` | 2/2 | 2 |

**Root cause:** `ValidationError: ShopItem validation failed: category: <value> is not a valid category`
**Valid categories (current):** `ISF Shop`, `Medicines`, `Consumables`, `Repairs`, `Infra`, `Others`
**Invalid categories (in tests):** `stationery`, `books`, `sports`, `other`

---

### Category B: Controller Validation + Category Enum (1 suite, 5 failures)

| # | Suite File | Path | Failures | Total Tests |
|---|-----------|------|----------|-------------|
| 8 | `adminProductController_story1_2.test.js` | `backend/tests/controllers/adminProductController_story1_2.test.js` | 5/10 | 10 |

**Root cause:** All 5 failures trace back to the category enum change. 2 tests (`createProduct`, `createPendingProduct`) get HTTP 400 because the controller's express-validator middleware rejects the invalid `stationery` category before the request reaches the model. 3 tests (`updateProduct` group) fail at the Mongoose model ValidationError level because the update path bypasses express-validator.

---

### Category C: getScopeFilter API Changed (`_id` vs `userId`) + File Path Issues (2 suites, ~15 failures)

| # | Suite File | Path | Failures (isolation) | Total Tests (isolation) |
|---|-----------|------|----------|-------------|
| 9 | `checkPermission.test.js` | `backend/tests/checkPermission.test.js` | 8/16 | 16 |
| 10 | `security-rbac.test.js` | `backend/tests/security-rbac.test.js` | 7/13 | 13 |

**Root cause (scope filter):** `getScopeFilter()` for `scope="own"` returns `{ _id: user._id }`. Tests assert `filter.userId` which is now `undefined`. This is an intentional code change — the function was corrected to use `_id` (the actual MongoDB document ID field) rather than `userId` (a non-standard field).

**Root cause (file paths in security-rbac.test.js):** 2 of the 7 failures are `ENOENT` errors from `fs.readFileSync('backend/middleware/checkPermission.js')` and `fs.readFileSync('backend/middleware/auth.js')`. Jest cwd is `backend/`, so the path `backend/middleware/...` resolves to `backend/backend/middleware/...` which does not exist.

**NFR3:** `security-rbac.test.js` is PROTECTED — fix only, never delete.

---

### Category D: Mongoose Connection Conflict (1 suite, 6 failures in isolation)

| # | Suite File | Path | Failures (isolation) | Total Tests (isolation) |
|---|-----------|------|----------|-------------|
| 11 | `migration-scope.test.js` | `backend/tests/migration-scope.test.js` | 6/7 | 7 |

**Root cause:** `MongooseError: Can't call openUri() on an active connection with different connection strings.` The test's `beforeAll` calls `mongoose.connect(mongoUri)` with a hardcoded URI or `process.env.MONGO_URI_TEST`, but `tests/setup.js` has already connected mongoose to the MongoMemoryServer instance. The 1 passing test ("should map role names to correct default scopes") works because it is pure logic with no DB access.

---

### Category E: File Path Resolution (ENOENT) (1 suite, 2 failures)

| # | Suite File | Path | Failures | Total Tests (isolation) |
|---|-----------|------|----------|-------------|
| 12 | `performance-rbac.test.js` | `backend/tests/performance-rbac.test.js` | 2/7 | 7 |

**Root cause:** `ENOENT: no such file or directory, open 'backend/models/user.js'` and `'backend/middleware/checkPermission.js'`. Same file path issue as in security-rbac.test.js — tests use paths prefixed with `backend/` but Jest cwd is already `backend/`.

---

## Coverage Breakdown by Directory (Story 1.1)

| Directory | Statements | Branches | Functions | Lines |
|-----------|-----------|----------|-----------|-------|
| controllers | 39.65% | 33.85% | 41.80% | 40.07% |
| data-access | 26.96% | 12.05% | 16.83% | 27.50% |
| models | 55.86% | 42.68% | 43.26% | 56.88% |
| services | 16.86% | 16.65% | 14.14% | 17.21% |
| services/aws | 9.95% | 0% | 0% | 10.04% |

### Notable Coverage Highlights

**100% covered models:** attendance.js, balagruha.js, machine.js, medical.js, role.js, vendor.js
**Well-covered controllers:** vendorController.js (71.69% stmts, 74.5% lines)
**Lowest coverage:** shopController.js (12.16% stmts), shopProductImageController.js (7.27% stmts), services/coin.js (2.71% stmts), services/shop.js (3.3% stmts)

---

## Test Infrastructure Verification (Story 1.1)

| Check | Status | Notes |
|-------|--------|-------|
| mongodb-memory-server | WORKING | Version ^10.2.0 installed and functional |
| Jest config | VALID | Located at `backend/jest.config.js` (not in package.json) |
| Jest version | ^30.0.5 | As expected |
| Test root | `backend/tests/` | Configured in jest.config.js `roots` |
| Setup file | `backend/tests/setup.js` | Configured via `setupFilesAfterEnv` |
| Test timeout | 30000ms | 30s per test |
| `forceExit: true` | SET in jest.config.js | Note: story says "DO NOT run with --forceExit" but it is baked into the config |
| Coverage reporters | text, lcov, html | Output to `backend/coverage/` |
| Coverage threshold | 70% global | Currently failing threshold check |

### Infrastructure Issues

1. **`forceExit: true` in jest.config.js** — This masks open handle issues. A worker process warning was emitted: "A worker process has failed to exit gracefully and has been force exited." This indicates async teardown issues in some test suites.
2. **Duplicate schema index warning** — Mongoose warns about duplicate index on `{"orderNumber":1}` (likely in the Order model). Not a test failure but indicates a code issue.
3. **Coverage threshold set at 70%** — Jest will report the run as failed even when all tests pass, until coverage reaches 70%. This may interfere with CI if enabled.

---

## Passing Test Suites (13) (Story 1.1)

| # | Suite File | Path | Tests |
|---|-----------|------|-------|
| 1 | `userBalagruhasRoutes.test.js` | `backend/tests/routes/userBalagruhasRoutes.test.js` | 2 |
| 2 | `vendorRoutes.test.js` | `backend/tests/routes/vendorRoutes.test.js` | 6 |
| 3 | `models.test.js` | `backend/tests/wtf/unit/models.test.js` | - |
| 4 | `dataAccess.test.js` | `backend/tests/wtf/unit/dataAccess.test.js` | - |
| 5 | `integration.test.js` | `backend/tests/wtf/unit/integration.test.js` | - |
| 6 | `purchaseRequestController.test.js` | `backend/tests/controllers/purchaseRequestController.test.js` | - |
| 7 | `controllers.test.js` | `backend/tests/wtf/unit/controllers.test.js` | - |
| 8 | `services.test.js` | `backend/tests/wtf/unit/services.test.js` | - |
| 9 | `coin-controllers.test.js` | `backend/tests/wtf/unit/coin-controllers.test.js` | - |
| 10 | `inventoryController.test.js` | `backend/tests/controllers/inventoryController.test.js` | - |
| 11 | `vendor.test.js` | `backend/tests/vendor.test.js` | - |
| 12 | `userController.test.js` | `backend/tests/controllers/userController.test.js` | - |
| 13 | `vendorController.test.js` | `backend/tests/controllers/vendorController.test.js` | - |

---

## Source Code Existence Verification (Story 1.2)

All source files referenced by failing tests were verified to still exist:

| Source File | Exists | Referenced By |
|------------|--------|---------------|
| `backend/models/shopItem.js` | YES | Suites #1-#8 |
| `backend/constants/shopCategories.js` | YES | Suites #1-#8 (defines valid categories) |
| `backend/controllers/adminProductController.js` | YES | Suite #8 |
| `backend/models/purchaseRequest.js` | YES | Suite #2 |
| `backend/middleware/checkPermission.js` | YES | Suites #9, #10, #12 |
| `backend/middleware/auth.js` | YES | Suite #10 |
| `backend/models/user.js` | YES | Suite #12 |
| `backend/models/role.js` | YES | Suite #11 |

**No stale suites found.** All 12 failing test files target code that still exists in the codebase. No suites need deletion.

---

## Git History Analysis (Story 1.2)

### Breaking Commits Identified

| Commit | Description | Suites Broken |
|--------|------------|---------------|
| `b2ae8b96` | feat(shop): synchronize categories across shop and purchase requests | #1-#8 (category enum change) |
| `d88419d1` / `d2c8730e` | fix(rbac): Fix field naming bug + scope values | #9, #10 (getScopeFilter API) |

### Test File Last Modified

| Suite | Last Modified Commit | Date Relative |
|-------|---------------------|---------------|
| `shopProduct_story2_5.test.js` | `5081af8f` (before category sync) | Stale since `b2ae8b96` |
| `purchaseRequest_story2_1.test.js` | `5081af8f` | Stale since `b2ae8b96` |
| `stockReconciliationRoutes.test.js` | `b54138d2` | Stale since `b2ae8b96` |
| `inventoryMasterReportRoutes.test.js` | `b54138d2` | Stale since `b2ae8b96` |
| `pm-dashboard.test.js` | `fd1f8e36` | Stale since `b2ae8b96` |
| `shopItem.test.js` | `b435d8a7` | Stale since `b2ae8b96` |
| `shopItem_story1_2.test.js` | `eb6cbe63` | Stale since `b2ae8b96` |
| `adminProductController_story1_2.test.js` | `a2658b04` | Stale since `b2ae8b96` |
| `checkPermission.test.js` | `d88419d1` | Written before final scope fix |
| `security-rbac.test.js` | `4f368072` | Written before scope fix + always had path bug |
| `migration-scope.test.js` | `5a467012` | Written before shared setup.js existed |
| `performance-rbac.test.js` | `4f368072` | Always had path bug |
