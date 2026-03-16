# QA Evaluation Report — Post-Sprint 6 Test Coverage & Quality Risks

**Date:** 2026-03-16
**Author:** Quinn (QA Engineer) — Claude Opus 4.6 (1M context)
**Sprint Evaluated:** Sprint 6 — Stabilization & Documentation (all 5 Epics complete)
**Baseline Reference:** Story 1.1 (29.77% stmts) -> Story 1.4 (32.40% stmts) -> Current (39.62% stmts)

---

## Executive Summary

Sprint 6 delivered meaningful stabilization: 12 failing test suites were repaired, 112 RBAC verification tests were added, and 6 new controller test files were created. However, coverage remains at **39.62% statements** — roughly half the 70% target. More critically, several controllers handling **sensitive data (medical, biometric, financial)** have zero test coverage, and the RBAC tests verify middleware wiring but not actual data isolation through the database layer. Story 5.2 (Test Coverage Expansion) was marked as an epic task but its implementation tasks remain unchecked — it appears the story was created but never executed by a dev agent.

**Overall Risk Rating: HIGH** — The system is deployed with sensitive-data controllers untested and integration test gaps in critical financial workflows.

---

## 1. Untested Critical Paths

### Controller Coverage Matrix

**Total controllers:** 51 (39 top-level + 12 LMS)
**Controllers with dedicated test files:** 15
**Controllers with zero test coverage:** 24+ (see below)

#### CRITICAL — Sensitive Data, Zero Tests

| Controller | Data Type | Sensitivity | Models Touched | Severity |
|---|---|---|---|---|
| `frController.js` | Biometric (face embeddings, FR sessions) | CRITICAL | FaceEmbedding, Student, FRSession | **CRITICAL** |
| `medicalRecordController.js` | Medical records (PHI equivalent) | CRITICAL | Medical, User | **CRITICAL** |
| `coinController.js` | Financial (virtual currency balances) | HIGH | Coin (via service) | **CRITICAL** |
| `doctorController.js` | Medical provider data | HIGH | Doctor (via service/DA) | **HIGH** |
| `hospitalController.js` | Medical facility data | HIGH | Hospital (via service/DA) | **HIGH** |
| `profileController.js` | PII (user profiles, aggregated data) | HIGH | User, Coin, Order | **HIGH** |
| `coachGradingController.js` (LMS) | Academic grades, coin awards | HIGH | Submission, User, Course, Notification, Coin | **HIGH** |
| `studentDashboardController.js` (LMS) | Student PII, emotions, progress | HIGH | User, Coin, Notification, EmotionTracking, Course, StudentProgress | **HIGH** |

#### HIGH — Business Logic, Zero Tests

| Controller | Function | Severity |
|---|---|---|
| `analyticsController.js` | Aggregation/reporting across orders, users, shop | **HIGH** |
| `contentController.js` | Content library CRUD | **MEDIUM** |
| `courseController.js` (top-level) | Course lifecycle | **MEDIUM** |
| `questionBankController.js` | Question bank CRUD + aggregations | **MEDIUM** |
| `quizController.js` | Quiz CRUD + grading logic | **HIGH** |
| `roleController.js` | Role CRUD (security-adjacent) | **HIGH** |
| `reportsController.js` | Cross-domain reporting | **MEDIUM** |
| `coachDeliveryController.js` | Order delivery workflow | **MEDIUM** |
| `purchaseAndRepair.js` | Purchase orders + repair requests | **HIGH** |
| `sports.js` | Sports task management | **LOW** |
| `music.js` | Music task management | **LOW** |
| `studentMoodTrackerController.js` | Student emotional data | **HIGH** |
| `schedulerController.js` | WTF pin scheduling | **MEDIUM** |
| `offlineRequestQueue.js` | Offline sync queue | **LOW** |

#### LMS Controllers — All 12 at Zero Coverage

| Controller | Severity |
|---|---|
| `lms/admin/adminAssignmentController.js` | HIGH |
| `lms/admin/courseController.js` | MEDIUM |
| `lms/admin/translationController.js` | LOW |
| `lms/coach/coachAssignmentController.js` | HIGH |
| `lms/coach/coachGradingController.js` | HIGH |
| `lms/coach/coachReportsController.js` | MEDIUM |
| `lms/coach/manualAwardController.js` | HIGH (financial) |
| `lms/student/artCourseController.js` | LOW |
| `lms/student/computerAppsController.js` | MEDIUM |
| `lms/student/lifeSkillsController.js` | MEDIUM |
| `lms/student/spokenEnglishController.js` | LOW |
| `lms/student/studentDashboardController.js` | HIGH |

**Finding 1.1 [CRITICAL]:** `frController.js` handles AES-256-GCM encrypted biometric data (face embeddings) and has zero tests. A regression in encryption/decryption logic would silently corrupt biometric data with no test to catch it.

**Finding 1.2 [CRITICAL]:** `medicalRecordController.js` handles medical records and has zero tests. Any data leak or RBAC bypass here affects PHI-equivalent data for minors.

**Finding 1.3 [CRITICAL]:** `coinController.js` manages virtual currency. The service layer (`services/coin.js`) is at 2.71% coverage. Financial logic bugs (double-spend, negative balances, incorrect awards) would go undetected.

---

## 2. RBAC Test Sufficiency

### What the 112 Tests Cover

The `rbac-verification-e2e.test.js` file contains 112 tests organized into 10 sections:

| Section | Tests | What It Verifies |
|---|---|---|
| 1. Scope Filter Generation | ~18 | `getScopeFilter()` returns correct filter objects for all 9 roles |
| 2. Cross-Balagruha Isolation | ~6 | Non-overlapping filters, null filter for unassigned users |
| 3. Escalation Prevention | ~13 | Invalid/null/undefined scopes default to restrictive `{_id}` |
| 4. Route Middleware (Static) | ~20 | `authenticate`/`authorize` keywords present in route files via regex |
| 5. Controller Scope Filter Usage | ~12 | `req.scopeFilter` string present in 9 controller files |
| 6. Security Audit | ~5 | No bypass keywords in auth.js/checkPermission.js |
| 7. validateBalagruhaAccess | ~6 | Middleware unit tests for Balagruha access validation |
| 8-10. Additional scenarios | ~32 | Edge cases, multi-balagruha, role combinations |

### What Is NOT Covered

**Finding 2.1 [HIGH]:** Tests verify that `getScopeFilter()` **returns the correct filter object** but never verify that controllers **actually apply** that filter to database queries and return filtered results. There are no tests that:
- Insert data for Balagruha A and Balagruha B
- Make an API call as a Coach assigned to Balagruha A
- Assert that only Balagruha A data is returned

This is the difference between testing "the lock exists" vs. "the lock works." The scope filter could be generated correctly but ignored in a controller's query, and these tests would still pass.

**Finding 2.2 [HIGH]:** Route middleware verification uses **static regex analysis** (`fs.readFileSync` + pattern matching). This confirms the string `authenticate` appears in the file, but does not verify:
- The middleware is correctly ordered in the chain
- The middleware is applied to ALL routes in the file (not just some)
- The middleware parameters (module name, action) are correct

**Finding 2.3 [MEDIUM]:** Controller scope filter tests check `req.scopeFilter` string presence but only cover 9 of 51 controllers. The remaining 42 controllers are not checked. While many are admin-only (3 are explicitly listed), controllers like `inventoryController.js`, `purchaseRequestController.js`, `shopController.js`, and the 12 LMS controllers are not verified.

**Finding 2.4 [MEDIUM]:** The following role combinations are NOT tested end-to-end:
- `amma` role accessing any actual controller endpoint
- `medical-incharge` accessing medical records via the controller layer
- `purchase-manager` accessing purchase requests with scope filtering
- Multi-balagruha coach accessing data from each assigned balagruha individually

**Finding 2.5 [LOW]:** Playwright E2E tests (the true end-to-end verification) were not executed during Story 2.4 because they require running servers. The 9 Playwright tests (5 login + 4 purchase lifecycle) exist but their last successful run is unknown.

### Recommendation

The RBAC tests are a good **unit test foundation** for the middleware layer. To achieve actual data isolation verification, the project needs **integration tests** that:
1. Seed a database with multi-balagruha data
2. Make authenticated HTTP requests as different roles
3. Assert response payloads contain only in-scope data
4. Assert cross-scope requests return 403

Estimated effort: 2-3 days for the 9 scope-filtered controllers.

---

## 3. Path to 70% Coverage

### Current State

| Layer | Current Stmts | Current Lines | Files | Key Blockers |
|---|---|---|---|---|
| controllers/ | 57.47% | 57.61% | 15 files covered of ~39 | 24 controllers at 0% |
| models/ | 58.38% | 59.40% | Most simple models at 100% | `user.js` model at 34% |
| data-access/ | 27.31% | 27.86% | 20 files, most at 0-25% | Nearly all DA functions untested |
| services/ | 19.33% | 19.73% | 32 files, most at 0-10% | `coin.js` 2.71%, `student.js` 6%, `user.js` 12% |
| services/aws/ | 9.95% | 10.04% | S3 integration | Needs mocking |
| **Overall** | **39.62%** | **39.92%** | | **Gap to 70%: -30.38pp** |

### Highest-ROI Files for Coverage Gains

Ranked by estimated statement coverage gain per unit of effort:

| Priority | Target | Current | Estimated Gain | Effort | Rationale |
|---|---|---|---|---|---|
| 1 | `services/wtf.js` | 32.34% | +3-4pp overall | Medium | 2953 lines, largest service file. WTF tests already exist; extending them covers massive line count |
| 2 | `controllers/wtfController.js` | 46.63% | +2-3pp | Medium | 2724 lines. Paired with wtf.js, these two files alone could shift overall coverage significantly |
| 3 | `controllers/userController.js` | 40.33% | +1.5pp | Medium | 1286 lines, existing test file (25 tests) needs expansion |
| 4 | `controllers/purchaseRequestController.js` | 48.68% | +1pp | Low | Existing test file (46 tests) needs gap-filling |
| 5 | `data-access/User.js` | 12.5% | +2pp | Medium | 1644 lines, foundational DA layer used by 25+ controllers |
| 6 | `services/student.js` | 6.08% | +1.5pp | Medium | 914 lines, student data management |
| 7 | `controllers/inventoryController.js` | 47.31% | +1pp | Low | Existing test file (19 tests) needs expansion |
| 8 | `data-access/wtfSubmission.js` | 25.18% | +1pp | Medium | 1525 lines |
| 9 | `services/coin.js` | 2.71% | +1.5pp | Medium | 894 lines, financial logic |
| 10 | `controllers/frController.js` | 0% | +1pp | High | Requires mocking FR services, but critical for safety |

### Realistic Coverage Trajectory

| Phase | Target Coverage | Effort | Strategy |
|---|---|---|---|
| Phase 1: Extend existing tests | 48-50% | 3-4 days | Expand userController, purchaseRequestController, inventoryController, wtfController tests to cover uncovered branches |
| Phase 2: New controller tests (top 10) | 55-58% | 5-7 days | Add tests for coinController, frController, medicalRecordController, profileController, roleController, quizController, analyticsController, purchaseAndRepair, coachGradingController, studentDashboardController |
| Phase 3: Service + DA layer | 62-65% | 5-7 days | Test services/coin.js, services/wtf.js, services/user.js, services/student.js, data-access/User.js |
| Phase 4: LMS + remaining | 68-72% | 5-7 days | LMS controllers (12), remaining services, AWS mocks |

**Total estimated effort to reach 70%: 18-25 developer-days**

**Finding 3.1 [HIGH]:** Story 5.2 (Test Coverage Expansion) has status `ready-for-dev` in the sprint status file with all tasks unchecked, but Epic 5 is marked `done`. This is a tracking discrepancy — the story was never implemented but the epic was closed.

---

## 4. Integration Test Gaps

### Missing End-to-End Workflows

| Workflow | Risk | Current Coverage | Severity |
|---|---|---|---|
| **Purchase Request Lifecycle** (create -> approve -> fulfill -> close) | State machine corruption, invalid transitions | Unit tests for individual actions exist; no test covers the full lifecycle through all states | **HIGH** |
| **Coin Economy** (award -> spend -> balance check) | Double-spend, negative balance, incorrect totals | `services/coin.js` at 2.71%. No integration test covers award-then-spend-then-verify-balance | **CRITICAL** |
| **Order Lifecycle** (cart -> checkout -> payment -> delivery) | `orderController.js` at 100% but `services/order.js` at 23.28%, `services/cart.js` untested | Controller tests mock the service; service logic itself is barely tested | **HIGH** |
| **LMS Grading Flow** (assignment -> submission -> grading -> coin award) | Grade corruption, incorrect coin awards | Zero tests across 4 LMS controllers involved | **HIGH** |
| **FR Login Flow** (face capture -> recognize -> session create -> JWT issue) | Authentication bypass, session hijack | Zero tests for frController; frService/frCacheService untested | **CRITICAL** |
| **Medical Check-In Flow** (check-in -> record create -> history query) | PHI data integrity | `medicalCheckInsController` at 94% but `medicalRecordController` at 0% | **MEDIUM** |
| **Student Registration Flow** (user create -> balagruha assign -> machine assign) | Orphaned records, missing associations | `userController` at 40%, `balagruha` service at 24% | **HIGH** |
| **WTF Pin Lifecycle** (create -> publish -> interact -> grade -> award) | Pin state corruption, incorrect grading | `wtfController` at 46%, `services/wtf.js` at 32% — partially covered but critical paths missing | **MEDIUM** |
| **Inventory Reconciliation** (stock count -> adjustment -> report) | Incorrect inventory, financial reporting errors | `inventoryController` at 47%, stock reconciliation route tests exist but minimal | **MEDIUM** |

**Finding 4.1 [CRITICAL]:** The coin economy has no integration test. `services/coin.js` (894 lines, 2.71% coverage) implements award, deduct, transfer, and balance operations. A bug here affects every student's virtual wallet. The `manualAwardController.js` (LMS coach manual awards) is also untested.

**Finding 4.2 [CRITICAL]:** The FR login flow is the primary student authentication mechanism. Zero test coverage on `frController.js`, `frService.js`, and `frCacheService.js` means a regression in face recognition could lock out all students.

**Finding 4.3 [HIGH]:** The Playwright E2E tests (9 tests: 5 login + 4 purchase lifecycle) are the only tests that exercise the full stack. They require running frontend+backend servers, which means they cannot run in a standard `jest` CI pipeline. There is no evidence they have been executed recently.

---

## 5. Test Infrastructure Concerns

### 5.1 `forceExit: true` in jest.config.js [HIGH]

**Status:** Present since initial setup, still active.
**Impact:** Masks open handle issues. The warning "A worker process has failed to exit gracefully and has been force exited" appears on every test run.
**Risk:** Tests may have resource leaks (unclosed DB connections, dangling timers) that are hidden. This can cause:
- Flaky tests in CI environments
- Memory growth on long test runs
- Silent data corruption if teardown is incomplete

**Recommendation:** Run `npx jest --detectOpenHandles` to identify the leaking tests. Fix the root cause, then remove `forceExit: true`. Estimated effort: 1-2 days.

### 5.2 mongodb-memory-server Reliability [MEDIUM]

**Status:** Working correctly (v10.2.0). Shared setup via `tests/setup.js`.
**Concern:** One test (`migration-scope.test.js`) was previously calling `mongoose.connect()` directly, conflicting with the shared connection. This was fixed in Story 1.3, but no guard prevents future tests from doing the same.
**Recommendation:** Add a setup hook that fails fast if a test tries to create a second mongoose connection.

### 5.3 Test Isolation [MEDIUM]

**Status:** `clearMocks: true`, `resetMocks: true`, `restoreMocks: true` are all set in jest.config.js. Good.
**Concern:** Database state isolation between tests relies on each test properly cleaning up. There is no global `afterEach` that drops collections or resets the database between tests. Tests that insert data may leak state to subsequent tests.
**Recommendation:** Add a global `afterEach` in `tests/setup.js` that drops all collections. This prevents cross-test contamination.

### 5.4 Coverage Threshold Mismatch [LOW]

**Status:** `jest.config.js` sets `coverageThreshold` at 70% globally. Current coverage is 39.62%.
**Impact:** Every `npx jest --coverage` run exits with code 1 (failure) even when all tests pass. This makes the coverage check useless as a CI gate — it always fails, so it gets ignored.
**Recommendation:** Lower the threshold to 40% (current level) and increment it by 5pp each sprint as coverage improves. This creates a meaningful ratchet that prevents regression.

### 5.5 Duplicate Schema Index Warning [LOW]

**Status:** Mongoose warns about duplicate index on `{"orderNumber":1}` in the Order model.
**Impact:** No test failures, but indicates a schema definition issue that could cause problems at scale.
**Recommendation:** Audit the Order model for duplicate index definitions.

### 5.6 Test Timeout at 30s [LOW]

**Status:** 30-second timeout per test.
**Concern:** Adequate for unit tests but may be too short for integration tests that seed large datasets. Too long for tests that should be fast — a test that hangs for 29 seconds wastes CI time.
**Recommendation:** Keep 30s as default; use `jest.setTimeout()` explicitly in integration test files that need more.

---

## Summary of Findings by Severity

### CRITICAL (Immediate Action Required)

| # | Finding | Location |
|---|---|---|
| C1 | `frController.js` handles biometric data with zero tests | Section 1, Finding 1.1 |
| C2 | `medicalRecordController.js` handles PHI-equivalent data with zero tests | Section 1, Finding 1.2 |
| C3 | Coin economy (`services/coin.js` at 2.71%) lacks integration tests; financial logic entirely untested | Section 1, Finding 1.3 + Section 4, Finding 4.1 |
| C4 | FR login flow (primary student auth) has zero test coverage end-to-end | Section 4, Finding 4.2 |

### HIGH (Address in Next Sprint)

| # | Finding | Location |
|---|---|---|
| H1 | RBAC tests verify filter generation but not actual data isolation through DB queries | Section 2, Finding 2.1 |
| H2 | RBAC route middleware verification uses static regex, not runtime assertion | Section 2, Finding 2.2 |
| H3 | `forceExit: true` masks resource leaks and open handles | Section 5.1 |
| H4 | Story 5.2 (Test Coverage Expansion) marked done at epic level but never executed | Section 3, Finding 3.1 |
| H5 | 24+ controllers at zero coverage including roleController, quizController, analyticsController, profileController | Section 1 |
| H6 | All 12 LMS controllers at zero coverage including grading and coin award logic | Section 1 |
| H7 | Purchase lifecycle, order lifecycle, student registration lack integration tests | Section 4 |
| H8 | Playwright E2E tests not runnable in CI, last execution unknown | Section 4, Finding 4.3 |

### MEDIUM

| # | Finding | Location |
|---|---|---|
| M1 | Only 9 of 51 controllers verified for `req.scopeFilter` usage | Section 2, Finding 2.3 |
| M2 | Role combinations (amma, medical-incharge with actual data) not tested | Section 2, Finding 2.4 |
| M3 | No global database cleanup between tests (potential state leakage) | Section 5.3 |
| M4 | mongodb-memory-server has no guard against duplicate connections | Section 5.2 |
| M5 | services/ layer at 19.33% overall — business logic largely untested | Section 3 |
| M6 | data-access/ layer at 27.31% — database operations untested | Section 3 |

### LOW

| # | Finding | Location |
|---|---|---|
| L1 | Coverage threshold at 70% always fails, provides no CI value | Section 5.4 |
| L2 | Duplicate schema index warning on Order model | Section 5.5 |
| L3 | Playwright E2E tests not verified during Sprint 6 | Section 2, Finding 2.5 |

---

## Recommended Next Sprint Priorities

1. **Write tests for CRITICAL controllers** (frController, medicalRecordController, coinController) — 3-4 days
2. **Add RBAC data isolation integration tests** (seed DB, make scoped requests, verify filtered results) — 2-3 days
3. **Fix `forceExit: true`** by identifying and fixing open handles — 1-2 days
4. **Correct coverage threshold** to 40% and establish ratchet — 0.5 days
5. **Expand existing controller tests** (userController, purchaseRequestController, inventoryController) — 2-3 days
6. **Add coin economy integration test** (award -> spend -> verify balance) — 1 day

**Estimated Sprint Capacity Needed:** 10-14 days for the above priorities, yielding an estimated coverage of ~50-55%.

---

*Report generated by Quinn (QA Engineer) as post-sprint evaluation. No code changes made. No commits.*
