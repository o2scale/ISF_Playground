# Test Triage Report — Baseline Coverage Measurement

**Story:** 1.1 — Baseline Coverage Measurement
**Date:** 2026-03-16
**Agent:** Quinn (QA Engineer) — Claude Opus 4.6 (1M context)
**Command:** `cd backend && npx jest --coverage --verbose`

---

## Coverage Baseline

| Metric     | Actual   | Target (70%) | Gap      |
|------------|----------|--------------|----------|
| Statements | 29.77%   | 70%          | -40.23pp |
| Branches   | 22.55%   | 70%          | -47.45pp |
| Functions  | 25.74%   | 70%          | -44.26pp |
| Lines      | 30.21%   | 70%          | -39.79pp |

---

## Test Suite Summary

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

## Failing Test Suites (12)

### Category A: ShopItem Category Enum Mismatch (7 suites, 47 failures)

These suites all fail because test data uses old category values (`stationery`, `books`, `sports`, `other`) that are no longer valid in the ShopItem model's `category` enum. This is a **stale test data** issue — the model schema was updated but the test fixtures were not.

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
**Fix approach (Story 1.3):** Update test fixture data to use current valid category enum values from the ShopItem model.

---

### Category B: Controller Response Mismatch (1 suite, 5 failures)

| # | Suite File | Path | Failures | Total Tests |
|---|-----------|------|----------|-------------|
| 8 | `adminProductController_story1_2.test.js` | `backend/tests/controllers/adminProductController_story1_2.test.js` | 5/10 | 10 |

**Root cause:** Mixed — 2 tests expect HTTP 201 but receive 400 (controller validation logic changed); 3 tests fail from `ValidationError: category: stationery is not a valid category` (same as Category A).
**Classification:** Stale — controller behavior or validation rules updated, tests not aligned.

---

### Category C: getScopeFilter API Changed (`_id` vs `userId`) (2 suites, 12 failures)

| # | Suite File | Path | Failures | Total Tests |
|---|-----------|------|----------|-------------|
| 9 | `checkPermission.test.js` | `backend/tests/checkPermission.test.js` | 7/12 | 12 |
| 10 | `security-rbac.test.js` | `backend/tests/security-rbac.test.js` | 7/12 | 12 |

**Root cause:** `getScopeFilter()` now returns `{ _id: userId }` instead of `{ userId: userId }` for `scope="own"`. Tests expect the old field name. Additionally, `security-rbac.test.js` has 4 tests that use `fs.readFileSync('backend/middleware/auth.js')` with a relative path that fails because Jest runs from `backend/` (should be `middleware/auth.js` or use `__dirname`).
**Classification:** Regression — `getScopeFilter` behavior changed, tests not updated. Config issue for file path tests.

---

### Category D: Mongoose Connection Conflict (1 suite, 4 failures)

| # | Suite File | Path | Failures | Total Tests |
|---|-----------|------|----------|-------------|
| 11 | `migration-scope.test.js` | `backend/tests/migration-scope.test.js` | 4/4 | 4 |

**Root cause:** `MongooseError: Can't call openUri() on an active connection with different connection strings.` The test calls `mongoose.connect()` directly, conflicting with the shared mongodb-memory-server setup in `tests/setup.js`.
**Classification:** Config — test manages its own connection instead of using the shared setup.

---

### Category E: File Path Resolution (ENOENT) (1 suite, 2 failures)

| # | Suite File | Path | Failures | Total Tests |
|---|-----------|------|----------|-------------|
| 12 | `performance-rbac.test.js` | `backend/tests/performance-rbac.test.js` | 2/6 | 6 |

**Root cause:** `ENOENT: no such file or directory, open 'backend/models/user.js'` and `'backend/middleware/checkPermission.js'` — tests use relative paths from project root but Jest cwd is `backend/`.
**Classification:** Config — relative file paths incorrect for Jest execution context.

---

## Coverage Breakdown by Directory

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

## Test Infrastructure Verification

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

## Passing Test Suites (13)

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

## Failure Classification Summary

| Category | Suites | Failures | Classification | Fix Complexity |
|----------|--------|----------|----------------|----------------|
| A: ShopItem category enum mismatch | 7 | 47 | Stale test data | Low — update fixture categories |
| B: Controller response mismatch | 1 | 5 | Stale / Regression | Low-Medium — align test expectations |
| C: getScopeFilter API change | 2 | 12 | Regression | Low — change `userId` to `_id` in assertions |
| D: Mongoose connection conflict | 1 | 4 | Config | Medium — refactor to use shared setup |
| E: File path ENOENT | 1 | 2 | Config | Low — fix relative paths |
| **Total** | **12** | **68** | | |

---

## Notes for Story 1.2 (Triage & Classification)

- The dominant failure pattern (Category A, 7 suites) is a single root cause: ShopItem model `category` enum was updated but test fixtures still use old values. Fixing the test data in these files should resolve ~47 of 68 failures.
- Category C (scope filter) affects 2 critical security test files. The `security-rbac.test.js` file must NEVER be deleted per NFR3 — it must be updated.
- The actual failing suite count is 12, not the predicted 14. The 2 suites that were expected to fail but pass may have been fixed in recent commits.
- Test execution time of 32.5s is well within the NFR5 target of < 120s.
- The `forceExit: true` config option should be noted — it may mask genuine async leak issues.
