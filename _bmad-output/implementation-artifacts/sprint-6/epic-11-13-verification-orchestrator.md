# Epic 11-13 Verification Orchestrator

You are the Epic 11-13 Verification Orchestrator for ISF_Playground. Your job is to systematically verify that all 45 fix stories across Epics 12 and 13 were correctly implemented, and that Epic 11's QA findings are fully addressed.

## Mission

This is a VERIFICATION pass, not a re-implementation. For each story:
1. Read the acceptance criteria
2. Check the codebase to confirm each AC item is met
3. Run relevant tests
4. Report PASS or FAIL with specifics

Only write code if a story genuinely FAILED verification — i.e., the fix is missing, incomplete, or broken.

## Critical Rules

1. **Speed over ceremony** — don't read agent persona files, don't embody characters. Just verify.
2. **Parallelize aggressively** — spawn multiple verification subagents concurrently for independent stories
3. **Each subagent verifies a wave** — not individual stories. One subagent per wave.
4. **Run backend tests ONCE per wave** — not per story. `cd backend && npx jest --verbose 2>&1 | tail -20`
5. **Run frontend build ONCE per wave** — `cd frontend && npx react-scripts build 2>&1 | tail -5`
6. **If a story FAILS:** log it with specifics, continue verification, fix all failures at the end
7. **Never force-push, never amend commits** — if fixes are needed, create new commits
8. **Update sprint-status.yaml ONLY if you find and fix a broken story**

## Context Files

| File | Purpose |
|------|---------|
| `project-context.md` | Project conventions and coding rules |
| `_bmad-output/implementation-artifacts/sprint-6/epic-12-lms-coin-fixes.md` | Epic 12 story details + AC (19 stories) |
| `_bmad-output/implementation-artifacts/sprint-6/epic-13-shop-purchase-fixes.md` | Epic 13 story details + AC (26 stories) |
| `_bmad-output/implementation-artifacts/qa-validation/fix-stories-consolidated.md` | Original QA findings with full scope/description/AC |
| `_bmad-output/implementation-artifacts/sprint-status.yaml` | Sprint tracking |

## Per-Story Verification Protocol

For each story, check ALL acceptance criteria by reading the relevant source files. Do NOT just check if a file exists — verify the actual logic matches the AC.

**Verification methods by AC type:**
- "X replaced with Y" → `grep` for old pattern (should be gone) + `grep` for new pattern (should exist)
- "Unit test exists" → find the test file, confirm test names cover the AC
- "Endpoint added" → check route file for the endpoint + controller method exists
- "Field added to model" → read the model schema definition
- "Frontend component created" → check file exists + has expected imports/exports
- "Validation added" → read the controller/middleware for the validation logic

---

## Verification Waves

### Wave 1: CRITICAL Stories (8 stories) — PARALLEL BATCH A

Spawn ONE subagent for this entire wave. It verifies all 8 stories sequentially within its context.

**Stories to verify:**

#### 12.3 — FIX-003: Remove Debug Logging and Data Leaks
- [ ] Zero `fs.appendFileSync` in `backend/controllers/lms/student/computerAppsController.js`
- [ ] Zero `fs.appendFileSync` in `backend/controllers/lms/student/lifeSkillsController.js`
- [ ] Zero `debug` properties in API responses across all student controllers
- [ ] Duplicate `passed` property fixed in lifeSkillsController

#### 12.11 — FIX-022: Fix bulkGrade const Counter Bug
- [ ] `let gradedCount` (not `const`) in `backend/controllers/lms/coach/coachGradingController.js`
- [ ] Unit test exists for bulk grading counter in `backend/tests/controllers/coachGradingController.test.js`

#### 12.1 — FIX-001: Rewrite LMS Grading Coin Award Logic
- [ ] `submitGrade()` uses `Coin.findOrCreateForUser()` + `addCoins()` pattern
- [ ] `bulkGrade()` uses same corrected pattern
- [ ] Source value valid in Coin model enum (check `backend/models/coin.js` for enum)
- [ ] Zero writes to `User.coins` field (grep for `User.findByIdAndUpdate.*coins`)
- [ ] Integration test exists for grade → coin award flow

#### 12.5 — FIX-010: RBAC Enforcement on Student-Scoped LMS Endpoints
- [ ] Middleware in `backend/routes/v2/lms/student/` verifies user matches `:studentId`
- [ ] OR routes refactored to use `req.user.id` directly instead of `:studentId`
- [ ] Unit test for cross-student access denial

#### 12.2 — FIX-002: Atomic Coin Transactions
- [ ] `addCoins()` in `backend/models/coin.js` supports session parameter
- [ ] Quiz submit controllers use sessions/transactions
- [ ] Unit test for rollback on partial failure

#### 13.2 — FIX-008: FR51 Route Guard Mismatch
- [ ] `/purchase` route in `frontend/src/App.js` includes all 8 non-student roles (or relies on backend only)
- [ ] All non-student roles can reach purchase request pages

#### 13.3 — FIX-009: Order Routes Missing RBAC
- [ ] `authorize()` on admin-only endpoints in `backend/routes/v2/orders.js`
- [ ] Student ownership check for order endpoints
- [ ] Unit test for non-admin 403

#### 13.1 — FIX-007: Unify Purchase Request Inventory with State Machine
- [ ] `delivered_store` transition in `updateStatus()` triggers stock increase
- [ ] `delivered_balagruha` transition triggers deployed-stock tracking
- [ ] InventoryTransaction records created in 4-step workflow
- [ ] Integration test exists

**After verifying all 8:** Run `cd backend && npx jest --verbose 2>&1 | tail -30` to confirm tests pass.

---

### Wave 2: HIGH Stories (13 stories) — PARALLEL BATCH B

Spawn ONE subagent. Verify all 13 sequentially.

#### 12.17 — FIX-040: coachReportsController Missing Import
- [ ] CourseAssignment model imported in `coachReportsController.js`
- [ ] `activeAssignments` count computed and included in overview stats

#### 12.7 — FIX-012: Auto-Calculated Coin Awards from Rubric
- [ ] Quality-to-coin mapping exists (config or constants)
- [ ] `coinsAwarded` auto-calculated from quality rating in `submitGrade`
- [ ] Coach override mechanism exists
- [ ] Unit test for quality → coin mapping

#### 12.8 — FIX-013: Balagruha Authorization for Manual Coin Award
- [ ] `manualAwardController.js` validates studentIds against coach's Balagruha
- [ ] 403 returned for unauthorized student awards
- [ ] Unit test exists

#### 12.6 — FIX-011: Coach Reports Dashboard (FR21)
- [ ] Queries scoped to coach's Balagruha students (not global)
- [ ] Per-course/assignment completion rate endpoints exist
- [ ] Slow learner identification endpoint exists
- [ ] Unit tests exist

#### 12.12 — FIX-023: Coin Earning Velocity Analytics
- [ ] Velocity metric endpoint in `analyticsController.js` (not empty stub)
- [ ] Admin API endpoint for velocity across students/Balagruhas
- [ ] Frontend visualization exists

#### 12.10 — FIX-015: Wire S3 Upload for Student Submissions
- [ ] `spokenEnglishController.js` — real S3 upload (no mock URLs)
- [ ] `lifeSkillsController.js` — real S3 upload
- [ ] `artCourseController.js` — real S3 upload
- [ ] Artificial upload delay removed from `SpokenEnglishPage.jsx`

#### 12.9 — FIX-014: Art Course Real Implementation
- [ ] Canvas/drawing interface in `ArtCoursePage.jsx`
- [ ] Real S3 upload (not hardcoded URLs)
- [ ] Competition and Gallery models exist
- [ ] Workshops and Art Stories modes functional

#### 13.7 — FIX-019: Capture Supplier/Invoice at 'ordered'
- [ ] `updateStatus` accepts `supplierName`/`invoiceNumber` at 'ordered' transition
- [ ] Fields persisted to model
- [ ] Unit test exists

#### 13.8 — FIX-020: Priority and Coach Filters
- [ ] `priority` query param on `getAllPurchaseRequests`
- [ ] `requestedBy` query param on `getAllPurchaseRequests`
- [ ] Priority-first sort option
- [ ] Unit test exists

#### 13.9 — FIX-024: Coin Economy Health Metrics
- [ ] `getCoinEconomyHealth()` computes earn-to-spend ratio
- [ ] Computes coin velocity
- [ ] Computes shop conversion rate
- [ ] Frontend `CoinEconomyHealth.jsx` exists

#### 13.4 — FIX-016: Build Product Detail Page
- [ ] `frontend/src/pages/ProductDetail.jsx` exists
- [ ] Route `/shop/products/:id` in App.js
- [ ] Full description, image gallery, stock info, add-to-cart
- [ ] Navigation from ProductCard to detail

#### 13.5 — FIX-017: Fuzzy Duplicate Product Name Detection
- [ ] `adminProductController.js` has fuzzy/case-insensitive name check on create
- [ ] Warning or rejection for similar names
- [ ] Unit test for "Blue Pen" vs "blue pen"

#### 13.6 — FIX-018: Master Inventory Per-Balagruha Breakdown
- [ ] Aggregation groups deployed stock by Balagruha in `inventoryController.js`
- [ ] Frontend `MasterInventoryReport.jsx` displays per-Balagruha data
- [ ] CSV export includes breakdown

**After verifying all 13:** Run `cd backend && npx jest --verbose 2>&1 | tail -30`

---

### Wave 3: MEDIUM Stories (17 stories) — PARALLEL BATCH C

Spawn ONE subagent. Verify all 17 sequentially.

#### 12.13 — FIX-025: Homework Count Replace Hardcode
- [ ] `getPendingHomeworkCount()` queries real data (no hardcoded `count: 3`)
- [ ] Placeholder comment removed

#### 12.14 — FIX-026: Dual Coin Balance Consolidate
- [ ] `TitleBar.jsx` reads from CoinBalanceContext (no own fetch loop)
- [ ] Single source of truth for coin balance

#### 12.15 — FIX-027: Transaction Source Granularity
- [ ] Coin model enum includes `quiz_pass`, `grading`, `manual_award`
- [ ] Controllers use appropriate source values
- [ ] Transaction history supports filtering by source

#### 12.16 — FIX-034: Audit Trail for Course Lifecycle
- [ ] Audit log entries for archive/unpublish/publish in `courseController.js`
- [ ] Coach notification on archive/unpublish
- [ ] Admin-queryable audit log

#### 12.18 — FIX-041: Resume Activity Deep-Link
- [ ] `taskId` resolved from progress records (not null)
- [ ] `ResumeActivityCard` navigates to actual task

#### 13.10 — FIX-029: Dead Placeholder Code in ShopHome
- [ ] `handleAddToCart` removed from `ShopHome.jsx`
- [ ] `onAddToCart` prop removed from ProductGrid usage

#### 13.11 — FIX-030: Double Response in shopController
- [ ] Only one `res.status(200).json()` call in `getVendorsWithProductCount`

#### 13.13 — FIX-032: Max 3 Vendors Per Product
- [ ] Validation rejects `approvedVendors.length > 3` in `adminProductController.js`
- [ ] Unit test exists

#### 13.14 — FIX-033: InventoryTransaction Enum
- [ ] `bulk_import` in `transactionType` enum OR mapped to `adjustment`

#### 13.15 — FIX-035: PM Nav Badge for Admin Role
- [ ] Badge condition in `Layout.js` includes `admin` role

#### 13.19 — FIX-039: Purchase Request Stats Missing Statuses
- [ ] All 10 statuses initialized in `getPurchaseRequestStats()`

#### 13.20 — FIX-043: Category Filter Multi-Select
- [ ] `FilterPanel.jsx` uses checkboxes (not radio buttons)
- [ ] Removable pills for selected categories

#### 13.12 — FIX-031: Backend console.error Cleanup
- [ ] Zero `console.error` in `backend/controllers/` (grep check)
- [ ] Replaced with pino/errorLogger

#### 13.16 — FIX-036: Priority Detection Model Field Only
- [ ] `ShopInventoryView.jsx` uses `priority` model field
- [ ] Text-based parsing (`[HIGH PRIORITY]`, `Priority: High`) removed

#### 13.17 — FIX-037: Coach Filter Move to Backend
- [ ] Backend endpoint for coach list exists
- [ ] Frontend fetches from backend (not client-side extraction)

#### 13.18 — FIX-038: Order All Batch API
- [ ] Batch endpoint `PUT /api/v2/shop/admin/purchase-requests/bulk-status` exists
- [ ] Frontend uses batch endpoint (not sequential)

#### 12.4 — FIX-004: Backend Test Coverage for LMS Controllers
- [ ] Test files exist for all 12 LMS controllers
- [ ] Coin model method tests exist
- [ ] Integration tests for quiz+grading coin flows
- [ ] Run: `cd backend && npx jest --testPathPattern="controllers/lms" --verbose 2>&1 | tail -30`

**After verifying all 17:** Run `cd backend && npx jest --verbose 2>&1 | tail -30`

---

### Wave 4: LOW Stories (7 stories) — PARALLEL BATCH D

Spawn ONE subagent. Verify all 7 sequentially.

#### 12.19 — FIX-050: Notification Badge Polling Interval
- [ ] Polling interval configurable in `TitleBar.jsx`
- [ ] Default >= 30 seconds (not 2 seconds)

#### 13.21 — FIX-044: Correct Cancel Window Comments
- [ ] `backend/routes/v2/orders.js` comment says "5 minutes" (not "24 hours")
- [ ] `frontend/src/store/shopStore.js` comment says "5 minutes"

#### 13.22 — FIX-045: Cart/Order console.error to Pino
- [ ] Zero `console.error` in `cartController.js`
- [ ] Zero `console.error` in `orderController.js`
- [ ] Uses `errorLogger.error()` instead

#### 13.23 — FIX-046: Vendor Deactivation Endpoint
- [ ] Dedicated DELETE endpoint in vendor routes
- [ ] Soft-delete behavior (sets `active: false`)

#### 13.24 — FIX-047: requestId Race Condition
- [ ] Atomic counter or retry-on-duplicate in `purchaseRequest.js` pre-save hook
- [ ] Not using bare `countDocuments()` for ID generation

#### 13.25 — FIX-048: Update Story 3.3 Status File
- [ ] `_bmad-output/sprint-5-purchase-manager/3-3-admin-inventory-report.md` reflects completion

#### 13.26 — FIX-049: act() Warnings in Tests
- [ ] Async state updates wrapped in `act()` in CreatePurchaseRequestModal tests
- [ ] Run: `cd frontend && npx react-scripts test --watchAll=false --testPathPattern="CreatePurchaseRequestModal" 2>&1 | tail -20`

**After verifying all 7:** Run full test suite one final time.

---

## Final Verification

After all 4 waves complete, the orchestrator compiles results:

1. Run `cd backend && npx jest --coverage --verbose 2>&1 | tail -40`
2. Run `cd frontend && npx react-scripts build 2>&1 | tail -10`
3. Compile the verification report

### Output Format

```
EPIC 12-13 VERIFICATION REPORT
===============================

Wave 1 (CRITICAL — 8 stories): X/8 PASS
Wave 2 (HIGH — 13 stories):    X/13 PASS
Wave 3 (MEDIUM — 17 stories):  X/17 PASS
Wave 4 (LOW — 7 stories):      X/7 PASS

TOTAL: X/45 PASS

Backend tests: X passed, Y failed
Frontend build: PASS/FAIL
Coverage: X%

FAILURES (if any):
- Story X.Y (FIX-NNN): [what failed] → [file:line]
  - AC item: "..."
  - Expected: ...
  - Found: ...

FIXES APPLIED (if any):
- Story X.Y: [what was fixed] — committed as [hash]
```

## Fix Protocol (only if failures found)

If any stories FAIL verification:
1. Group failures by file to minimize context switches
2. Fix all failures in the same file together
3. Run tests after each fix
4. Commit: `git add <specific files> && git commit -m "fix(sprint-6): verification fix — {description}"`
5. Append fix details to the verification report
