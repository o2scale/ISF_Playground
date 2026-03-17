# Consolidated Fix Stories — Sprint 2 + Sprint 5 QA Validation

Generated: 2026-03-17 | Source: QA-D1 through QA-D8

## Summary

Total findings: 52 across 8 reports
Breakdown: 10 CRITICAL, 14 HIGH, 19 MEDIUM, 9 LOW

---

## CRITICAL Priority

### FIX-001: Rewrite LMS Grading Coin Award Logic (Broken Earn Path)
- **Source:** QA-D8 (CRIT-01, CRIT-02, CRIT-03)
- **Scope:** `backend/controllers/lms/coach/coachGradingController.js` — `submitGrade()` (lines 178-195) and `bulkGrade()` (lines 305-321)
- **Sprint:** 2
- **Effort:** 3 hours
- **Description:** Three compounding bugs make LMS grading coin awards completely non-functional: (1) `source: "submission_grade"` is not in the Coin model's `source` enum, causing Mongoose validation failure and 500 errors on every grade submission. (2) `new Coin({...}).save()` creates orphan Coin documents instead of using `Coin.findOrCreateForUser()` + `addCoins()` — coins are invisible to balance/spend logic. (3) `User.findByIdAndUpdate(studentId, { $inc: { coins: coinsAwarded } })` writes to a non-existent `User.coins` field. This is the primary coin-earning mechanism for students.
- **AC:**
  - [ ] `submitGrade` uses `Coin.findOrCreateForUser(studentId)` then `coinRecord.addCoins()` pattern (matching manualAwardController)
  - [ ] `bulkGrade` uses the same corrected pattern
  - [ ] Source value is valid within Coin model enum (add `submission_grade` to enum or use existing `task`)
  - [ ] No writes to `User.coins` field
  - [ ] Integration test: grade submission awards coins visible in `Coin.findOne({ userId }).balance`
  - [ ] Integration test: graded coins are spendable in Shop checkout

### FIX-002: Atomic Coin Transactions (NFR14 Violation)
- **Source:** QA-D1 (Finding #3)
- **Scope:** `backend/models/coin.js` `addCoins()` method; `backend/controllers/lms/student/computerAppsController.js`; `backend/controllers/lms/student/lifeSkillsController.js`
- **Sprint:** 2
- **Effort:** 4 hours
- **Description:** The `addCoins()` method uses `this.save()` without MongoDB sessions/transactions. Quiz submit controllers also call `User.findByIdAndUpdate` to increment coins separately. If either fails, Coin record and User record become inconsistent. PRD NFR14 requires atomic transactions for earn/spend operations.
- **AC:**
  - [ ] `addCoins()` wrapped in `mongoose.startSession()` with transaction
  - [ ] Rollback on failure of any step
  - [ ] Applied to `computerAppsController.submitQuiz` and `lifeSkillsController.submitQuiz`
  - [ ] Unit test: partial failure rolls back all changes

### FIX-003: Remove Debug Logging and Data Leaks from Production Code
- **Source:** QA-D1 (Findings #2, #8, #9)
- **Scope:** `backend/controllers/lms/student/computerAppsController.js`; `backend/controllers/lms/student/lifeSkillsController.js`
- **Sprint:** 2
- **Effort:** 1 hour
- **Description:** `computerAppsController.submitQuiz` writes to `quiz_debug.log` and `quiz_crash.log` via `fs.appendFileSync` (lines 243-248, 455-458) — unbounded file growth, disk fill risk, information leak. `getComputerApps` returns `debug: progressRecords` in response (line 61). `submitQuiz` returns `debug: debugInfo` (line 452). `lifeSkillsController.submitQuiz` has duplicate `passed` property (line 584).
- **AC:**
  - [ ] All `fs.appendFileSync` calls to debug/crash log files removed
  - [ ] `debug` properties removed from all API responses
  - [ ] Duplicate `passed` property fixed in lifeSkillsController
  - [ ] No debug data in any API response across all student controllers

### FIX-004: Backend Test Coverage for Student LMS Controllers
- **Source:** QA-D1 (Finding #1), QA-D2 (Finding minor #1)
- **Scope:** `backend/controllers/lms/student/` (5 controllers); `backend/controllers/lms/admin/` (4 controllers); `backend/controllers/lms/coach/` (3 controllers); `backend/models/coin.js`
- **Sprint:** 2
- **Effort:** 16 hours
- **Description:** Zero backend test files exist for any Sprint 2 LMS controller — studentDashboardController, computerAppsController, artCourseController, spokenEnglishController, lifeSkillsController, courseController, contentController, quizController, translationController, coachAssignmentController, coachGradingController, coachReportsController, manualAwardController. All functionality is untested at unit/integration level. Target: 80% coverage per Quality Gate 7.3.
- **AC:**
  - [ ] Unit tests for all 12 LMS controllers (student + admin + coach)
  - [ ] Unit tests for Coin model methods (`addCoins`, `spendCoins`, `findOrCreateForUser`)
  - [ ] Integration tests for quiz submission + coin award flow
  - [ ] Integration tests for grading + coin award flow
  - [ ] 80% line coverage achieved per controller

### FIX-005: Epic 04 (Amma Role Enhancement) — 100% Not Built
- **Source:** QA-D3 (Finding #1)
- **Scope:** FR28-FR31 — Amma self-registration, query management, SLA auto-reassignment, Amma dashboard
- **Sprint:** 2
- **Effort:** 24 hours (4 stories)
- **Description:** Zero Amma-specific code exists. No controllers, routes, models, or frontend components. The `amma` role exists in RBAC but has no dedicated functionality. This covers 4 PRD functional requirements (FR28-FR31).
- **AC (Story A — Self-Registration, 6h):**
  - [ ] `POST /api/v2/amma/register` endpoint with admin approval flow
  - [ ] `RegistrationRequest` model with status lifecycle
  - [ ] Admin approval/rejection endpoints
  - [ ] Frontend registration form and admin approval UI
- **AC (Story B — Query Management, 8h):**
  - [ ] `Query` model with categorization, tagging, escalation fields
  - [ ] CRUD endpoints: create, reclassify, reassign, close
  - [ ] Frontend query submission and tracking UI
- **AC (Story C — SLA Auto-Reassignment, 8h):**
  - [ ] SLA timer fields on Query model
  - [ ] `slaMonitorJob` cron job for overdue detection
  - [ ] Round-robin reassignment logic
  - [ ] SLA breach notifications
- **AC (Story D — Amma Dashboard, 4h):**
  - [ ] `AmmaDashboard.jsx` page with query list, well-being insights
  - [ ] SLA timer display, priority queue

### FIX-006: WhatsApp Integration — 100% Not Built
- **Source:** QA-D3 (Finding #2)
- **Scope:** FR27 — WhatsApp notifications when Admin publishes daily schedule
- **Sprint:** 2
- **Effort:** 8 hours
- **Description:** Zero WhatsApp integration exists. No Business API integration, no group number storage per Balagruha, no schedule auto-send, no retry queue.
- **AC:**
  - [ ] WhatsApp Business API integration (Twilio or 360dialog)
  - [ ] Balagruha WhatsApp group number storage in settings
  - [ ] Auto-send schedule on admin publish (Monday 8:00 AM)
  - [ ] Retry queue for failed sends
  - [ ] Success/failure logging

### FIX-007: Unify Purchase Request Inventory Update with 4-Step State Machine
- **Source:** QA-D6 (Finding #1)
- **Scope:** `backend/controllers/purchaseRequestController.js` — `updateStatus()` and `completePurchaseRequest()`
- **Sprint:** 5
- **Effort:** 4 hours
- **Description:** Two disconnected completion paths exist: (1) Legacy `completePurchaseRequest` requires `status='approved'` and does inventory update; (2) 4-step state machine `updateStatus` handles `pending -> ordered -> delivered_store -> delivered_balagruha` with NO inventory update. Requests following the standard 4-step workflow never trigger inventory updates. The state machine also has 10 statuses vs. the documented 4.
- **AC:**
  - [ ] `delivered_store` transition in `updateStatus` triggers inventory stock increase (items arrive at warehouse)
  - [ ] `delivered_balagruha` triggers deployed-stock tracking
  - [ ] Legacy `completePurchaseRequest` either deprecated or clearly documented for specific use cases
  - [ ] All 10 statuses documented in API docs
  - [ ] Integration test: 4-step workflow creates InventoryTransaction records

### FIX-008: FR51 Route Guard Mismatch — 5 Roles Blocked from Purchase Requests
- **Source:** QA-D7 (Finding #1)
- **Scope:** `frontend/src/App.js` (line ~325), `frontend/src/components/Layout.js`, `backend/middleware/checkPurchaseRequestAccess.js`
- **Sprint:** 5
- **Effort:** 1 hour
- **Description:** The `/purchase` route in `App.js` restricts access to only 3 roles (`admin`, `purchase-manager`, `coach`) while backend middleware and nav menu support all 8 non-student roles. Medical-incharge, balagruha-incharge, sports-coach, music-coach, and amma can see the "Purchases" menu but are denied access when clicking it.
- **AC:**
  - [ ] `/purchase` route `requiredRoles` updated to include all 8 non-student roles (or removed to rely on backend middleware)
  - [ ] All 8 non-student roles can access the purchase request pages
  - [ ] E2E test: non-coach staff role can create a purchase request

### FIX-009: Order Routes Missing RBAC Authorization
- **Source:** QA-D8 (Finding #4)
- **Scope:** `backend/routes/v2/orders.js` (lines 55-95)
- **Sprint:** 5
- **Effort:** 2 hours
- **Description:** All order endpoints use only `authenticate` without `authorize()` middleware. The `GET /api/v2/shop/orders/all` admin-only endpoint is accessible to any authenticated user, including students and coaches.
- **AC:**
  - [ ] `authorize('Shop Management', 'Manage')` added to admin-only order endpoints (`/all`, etc.)
  - [ ] Student order endpoints verify `req.user.id === order.userId`
  - [ ] Unit test: non-admin receives 403 on `/all` endpoint
  - [ ] Unit test: student cannot access another student's order

### FIX-010: RBAC Enforcement on Student-Scoped LMS Endpoints
- **Source:** QA-D1 (Finding #11)
- **Scope:** `backend/routes/v2/lms/student/` — all student-scoped routes using `:studentId` parameter
- **Sprint:** 2
- **Effort:** 2 hours
- **Description:** Dashboard routes use `authenticate` middleware but do not verify that the authenticated user's ID matches the `:studentId` parameter. A student could query another student's dashboard, coin balance, or progress data.
- **AC:**
  - [ ] Middleware added to verify `req.user.id === req.params.studentId` (or refactor to use `req.user.id` directly)
  - [ ] 403 returned for unauthorized cross-student access
  - [ ] Unit test: student A cannot access student B's dashboard/coins/progress

---

## HIGH Priority

### FIX-011: Coach Reports Dashboard is Skeletal (FR21)
- **Source:** QA-D2 (Finding #1)
- **Scope:** `backend/controllers/lms/coach/coachReportsController.js`
- **Sprint:** 2
- **Effort:** 5 hours
- **Description:** Only 2 endpoints exist (overview stats and leaderboard). Both query globally instead of scoping to coach's Balagruha students. No per-course/assignment completion rates. No slow learner identification. `activeAssignments` count is commented out.
- **AC:**
  - [ ] All queries scoped to coach's Balagruha students
  - [ ] Per-course and per-assignment completion rate endpoints added
  - [ ] Slow learner identification endpoint (students below threshold progress)
  - [ ] `activeAssignments` count uncommented and wired
  - [ ] Unit tests for all new endpoints

### FIX-012: Implement Auto-Calculated Coin Awards from Rubric (FR22)
- **Source:** QA-D2 (Finding #2)
- **Scope:** `backend/controllers/lms/coach/coachGradingController.js`
- **Sprint:** 2
- **Effort:** 3 hours
- **Description:** The `coinsAwarded` value is manually set by the coach rather than auto-calculated from the quality/rubric score. PRD says "System auto-awards ISF Coins based on grading scores." Leads to inconsistent awards across coaches.
- **AC:**
  - [ ] Quality-to-coin mapping configuration defined (e.g., Excellent=10, Good=7, Fair=4, Poor=1)
  - [ ] `coinsAwarded` auto-calculated from quality rating in `submitGrade`
  - [ ] Coach override allowed with admin-configurable max
  - [ ] Unit test: quality rating maps to correct coin amount

### FIX-013: Add Balagruha Authorization to Manual Coin Award (FR23)
- **Source:** QA-D2 (Finding #3)
- **Scope:** `backend/controllers/lms/coach/manualAwardController.js`
- **Sprint:** 2
- **Effort:** 2 hours
- **Description:** `awardCoins` processes any studentIds without verifying the coach has authority over those students via Balagruha membership. A coach could award coins to students outside their Balagruha — an RBAC bypass.
- **AC:**
  - [ ] Each studentId validated against coach's Balagruha membership
  - [ ] 403 returned for unauthorized student awards
  - [ ] Unit test: coach cannot award coins to students in another Balagruha

### FIX-014: Art Course Real Implementation (FR11)
- **Source:** QA-D1 (Finding #4)
- **Scope:** `backend/controllers/lms/student/artCourseController.js`; `frontend/src/pages/student/ArtCoursePage.jsx`
- **Sprint:** 2
- **Effort:** 10 hours
- **Description:** Art course is a MOCK implementation. `submitArtwork` and `saveToGallery` return hardcoded mock S3 URLs. No actual canvas/drawing interface exists — only mode selection pills. Competition and Gallery models are marked "not yet implemented." Free Sketch and Competition modes are empty shells.
- **AC:**
  - [ ] HTML5 Canvas or fabric.js drawing interface for Free Sketch mode
  - [ ] Artwork upload wired to real S3 (replace mock URLs)
  - [ ] Competition and Gallery data models implemented
  - [ ] Workshops and Art Stories modes fully functional with course data

### FIX-015: Wire S3 Upload for All Student Submissions (FR5, FR6, FR11)
- **Source:** QA-D1 (Finding #5)
- **Scope:** `backend/controllers/lms/student/spokenEnglishController.js`; `backend/controllers/lms/student/lifeSkillsController.js`; `backend/controllers/lms/student/artCourseController.js`; `frontend/src/pages/student/SpokenEnglishPage.jsx`
- **Sprint:** 2
- **Effort:** 5 hours
- **Description:** S3 upload is mocked across ALL student submission endpoints. Video, audio, and art submissions generate mock S3 URLs. SpokenEnglishPage.jsx adds a fake 2-second delay to simulate upload time. Existing S3 upload infrastructure from admin content management could be reused.
- **AC:**
  - [ ] `spokenEnglishController.submitVideoRecording` performs real S3 upload
  - [ ] `lifeSkillsController.submitVoiceRecording` performs real S3 upload
  - [ ] `artCourseController.submitArtwork` performs real S3 upload
  - [ ] Artificial upload delay removed from SpokenEnglishPage.jsx
  - [ ] Uploaded files retrievable via S3 URLs

### FIX-016: Build Product Detail Page (FR4)
- **Source:** QA-D4 (Finding M1)
- **Scope:** Missing `frontend/src/pages/ProductDetail.jsx`; `frontend/src/App.js` (route)
- **Sprint:** 5
- **Effort:** 4 hours
- **Description:** Backend API `GET /api/v2/shop/products/:id` exists and is tested, but no frontend product detail page renders. Students can only see truncated 2-line descriptions and a single image on ProductCard. No way to view full description, multiple images, or detailed stock info.
- **AC:**
  - [ ] `ProductDetail.jsx` page created at route `/shop/products/:id`
  - [ ] Full description, image gallery, stock info, and add-to-cart with quantity selector
  - [ ] Navigation from ProductCard to detail page
  - [ ] Back button to return to catalog

### FIX-017: Fuzzy Duplicate Product Name Detection (FR18)
- **Source:** QA-D5 (Finding #1)
- **Scope:** `backend/controllers/adminProductController.js`
- **Sprint:** 5
- **Effort:** 3 hours
- **Description:** Only SKU uniqueness is enforced. Two products with identical or near-identical names can be created freely. PRD explicitly requires fuzzy matching to prevent duplicates.
- **AC:**
  - [ ] Fuzzy name matching on product creation (case-insensitive, trimmed)
  - [ ] Warning or rejection when similar product name exists
  - [ ] Unit test: "Blue Pen" vs "blue pen" detected as duplicate

### FIX-018: Master Inventory Report Per-Balagruha Breakdown (FR24)
- **Source:** QA-D5 (Finding #2)
- **Scope:** `backend/controllers/inventoryController.js` — `getMasterInventoryReport()`; `frontend/src/pages/MasterInventoryReport.jsx`
- **Sprint:** 5
- **Effort:** 4 hours
- **Description:** Report shows global "In Store" vs "Deployed" counts but does not segment deployed quantities by Balagruha. PRD states "per Balagruha" breakdown is required.
- **AC:**
  - [ ] Aggregation groups deployed stock by Balagruha destination
  - [ ] Frontend displays per-Balagruha columns or expandable rows
  - [ ] CSV export includes Balagruha breakdown

### FIX-019: Capture Supplier/Invoice at 'ordered' Transition (FR33)
- **Source:** QA-D6 (Finding #3)
- **Scope:** `backend/controllers/purchaseRequestController.js` — `updateStatus()`
- **Sprint:** 5
- **Effort:** 2 hours
- **Description:** When PM marks a request as 'ordered' via `updateStatus`, only `status`, `notes`, and `repairTechnicianName` are accepted. No mechanism to capture `supplierName` or `invoiceNumber` at ordering step. These fields exist on the model but are only populated via the legacy `completePurchaseRequest` path.
- **AC:**
  - [ ] `updateStatus` accepts `supplierName` and `invoiceNumber` when transitioning to 'ordered'
  - [ ] Fields saved to model on transition
  - [ ] Unit test: ordered transition captures supplier data

### FIX-020: Add Priority and Coach Filters to Purchase Request API (Client Issue A3/B5)
- **Source:** QA-D6 (Findings #4, #5)
- **Scope:** `backend/controllers/purchaseRequestController.js` — `getAllPurchaseRequests()`
- **Sprint:** 5
- **Effort:** 2 hours
- **Description:** Backend query lacks `priority` and `requestedBy` (coach) filter parameters. Default sort is `createdAt: -1` but client requested priority-first sorting.
- **AC:**
  - [ ] `priority` query parameter added to `getAllPurchaseRequests`
  - [ ] `requestedBy` (coach) query parameter added
  - [ ] `sort=priority` option added (High > Medium > Low)
  - [ ] Default sort changed to priority-first, then date

### FIX-021: Voice Communication — Extract Reusable Component (FR26)
- **Source:** QA-D3 (Finding #3)
- **Scope:** `frontend/src/components/wtf/CreateNewPinModal.js`; `frontend/src/pages/student/LifeSkillsVoiceTaskPage.jsx`
- **Sprint:** 2
- **Effort:** 5 hours
- **Description:** Voice recording works but is embedded in WTF and Life Skills pages. No standalone reusable `VoiceRecorder.jsx` component. No dedicated `/api/v2/voice-notes/*` endpoints. No `VoiceNote` model. No cross-role voice communication support.
- **AC:**
  - [ ] `VoiceRecorder.jsx` reusable component extracted
  - [ ] Dedicated `/api/v2/voice-notes/*` endpoints (upload URL, create record)
  - [ ] `VoiceNote` MongoDB model
  - [ ] WTF and Life Skills refactored to use shared component

### FIX-022: Fix bulkGrade const Counter Bug (Runtime Crash)
- **Source:** QA-D2 (Finding #4), QA-D8 (MIN-01)
- **Scope:** `backend/controllers/lms/coach/coachGradingController.js` line 275
- **Sprint:** 2
- **Effort:** 0.5 hours
- **Description:** `const gradedCount = 0` is declared with `const`, then `gradedCount++` on line 343 would throw a TypeError at runtime since you cannot increment a const. Bulk grading endpoint will crash on first successful grade.
- **AC:**
  - [ ] `const gradedCount = 0` changed to `let gradedCount = 0`
  - [ ] Unit test for bulk grading that exercises the counter

### FIX-023: Coin Earning Velocity Analytics (FR35)
- **Source:** QA-D1 (Finding implied by FR35 PARTIAL), QA-D3 (Finding #4)
- **Scope:** `backend/controllers/analyticsController.js` (empty stub); `backend/services/analytics.js`
- **Sprint:** 2
- **Effort:** 4 hours
- **Description:** `analyticsController.js` is an empty stub. No earning velocity metric (coins/day, coins/week trend). Weekly/monthly stats reset on period boundary rather than accumulating history. No admin-facing engagement dashboard for coin trends.
- **AC:**
  - [ ] Velocity metric computation: coins earned per day/week over configurable time window
  - [ ] Historical weekly totals persisted (or derived from transaction timestamps)
  - [ ] Admin-facing API endpoint for coin earning velocity across students/Balagruhas
  - [ ] Frontend visualization in admin analytics dashboard

### FIX-024: Verify/Complete Coin Economy Health Metrics (FR48)
- **Source:** QA-D7 (Finding #3)
- **Scope:** `backend/services/analytics.js` — `getCoinEconomyHealth()` (line 695)
- **Sprint:** 5
- **Effort:** 2 hours
- **Description:** PRD names 3 specific metrics: earn-to-spend ratio, coin velocity, shop conversion rate. The `getCoinEconomyHealth` service exists but completeness of all 3 named metrics is uncertain.
- **AC:**
  - [ ] Earn-to-spend ratio computed and returned
  - [ ] Coin velocity (earning rate over time) computed and returned
  - [ ] Shop conversion rate (% of earned coins spent in shop) computed and returned
  - [ ] Frontend `CoinEconomyHealth.jsx` displays all 3 metrics

---

## MEDIUM Priority

### FIX-025: Homework Count is Hardcoded
- **Source:** QA-D1 (Finding #6)
- **Scope:** `backend/controllers/lms/student/studentDashboardController.js` — `getPendingHomeworkCount()` (line 222)
- **Sprint:** 2
- **Effort:** 2 hours
- **Description:** Returns hardcoded `count: 3` with comment "Placeholder homework count (Epic 05 not yet implemented)."
- **AC:**
  - [ ] Homework count derived from actual pending assignments for the student
  - [ ] Placeholder comment removed

### FIX-026: Dual Coin Balance Sources (TitleBar vs CoinBalanceContext)
- **Source:** QA-D1 (Finding #10)
- **Scope:** `frontend/src/components/student/TitleBar.jsx`; `frontend/src/contexts/CoinBalanceContext.js`
- **Sprint:** 2
- **Effort:** 2 hours
- **Description:** TitleBar has its own 2-second polling loop for coin balance while CoinBalanceContext fetches once on mount and relies on manual `refreshBalance()`. These two sources can show different values.
- **AC:**
  - [ ] Single source of truth for coin balance (consolidate into CoinBalanceContext with polling)
  - [ ] TitleBar reads from CoinBalanceContext instead of maintaining its own fetch loop

### FIX-027: Transaction Source Granularity (FR34)
- **Source:** QA-D1 (Finding implied by FR34 PARTIAL), QA-D3 (Finding #5)
- **Scope:** `backend/models/coin.js` — source enum; `backend/controllers/lms/student/computerAppsController.js`; `backend/controllers/lms/coach/coachGradingController.js`
- **Sprint:** 2
- **Effort:** 2 hours
- **Description:** Quiz pass coins recorded as generic `earned` type with `source: 'task'` rather than distinct `quiz_pass`. Grading coins lack a specific `grading` source. Makes it impossible to filter/analyze earn sources as PRD intended.
- **AC:**
  - [ ] Coin model source enum expanded: add `quiz_pass`, `grading`, `manual_award`
  - [ ] Quiz controllers use `source: 'quiz_pass'`
  - [ ] Grading controller uses `source: 'grading'`
  - [ ] Manual award uses `source: 'manual_award'`
  - [ ] Transaction history API supports filtering by new source types

### FIX-028: Toast Notification UI Missing (FR24 gap)
- **Source:** QA-D3 (Finding #6)
- **Scope:** Missing `frontend/src/components/Toast.jsx`, `ToastContainer.jsx`, `ToastContext.js`
- **Sprint:** 2
- **Effort:** 3 hours
- **Description:** Backend notification system is comprehensive, and TitleBar has bell icon with unread count. However, no Toast/ToastContainer components for temporary auto-dismiss notifications as specified in Epic 05 Story 01. No ToastContext/useToast hook.
- **AC:**
  - [ ] `Toast.jsx` and `ToastContainer.jsx` components created
  - [ ] `ToastContext` / `useToast` hook for programmatic toast triggers
  - [ ] Auto-dismiss after configurable timeout
  - [ ] Integrates with existing notification system

### FIX-029: Dead Placeholder Code in ShopHome.jsx
- **Source:** QA-D4 (Finding M2)
- **Scope:** `frontend/src/components/shop/ShopHome.jsx` line 114
- **Sprint:** 5
- **Effort:** 0.5 hours
- **Description:** `handleAddToCart` shows `alert("...will be added to cart in Story-02")`. Function passed to ProductGrid as `onAddToCart` but never called. Dead code confuses maintainers.
- **AC:**
  - [ ] `handleAddToCart` and `onAddToCart` prop removed from ShopHome.jsx and ProductGrid

### FIX-030: Double Response in shopController.getVendorsWithProductCount
- **Source:** QA-D4 (Finding m3)
- **Scope:** `backend/controllers/shopController.js` lines 193-194
- **Sprint:** 5
- **Effort:** 0.5 hours
- **Description:** `res.status(200).json(result.data)` called twice in sequence. Second call fails silently (headers already sent).
- **AC:**
  - [ ] Duplicate response line removed
  - [ ] Unit test verifies single response

### FIX-031: Backend console.error Cleanup (Multiple Controllers)
- **Source:** QA-D2 (Finding minor #2), QA-D4 (Finding m4), QA-D6 (Finding #6)
- **Scope:** All backend controllers in `backend/controllers/` — specifically `cartController.js` (6 calls), `orderController.js` (5 calls), `purchaseRequestController.js` (15 calls), all LMS coach/admin controllers
- **Sprint:** 2 + 5
- **Effort:** 3 hours
- **Description:** Sprint 6 Story 8.4 addressed frontend console.log cleanup but backend controllers still rely on `console.error` for error logging. No structured logging in production; difficult to correlate errors.
- **AC:**
  - [ ] All `console.error` calls in backend controllers replaced with pino/errorLogger
  - [ ] Structured log format with correlation IDs where applicable

### FIX-032: Enforce Max 3 Approved Vendors Per Product (FR16/FR28)
- **Source:** QA-D5 (Finding minor #1)
- **Scope:** `backend/controllers/adminProductController.js` — `createProduct()`, `updateProduct()`
- **Sprint:** 5
- **Effort:** 1 hour
- **Description:** PRD says "up to 3 approved vendors per product" but no validation limits `approvedVendors.length`. Any number of vendors can be assigned.
- **AC:**
  - [ ] Validation rejects `approvedVendors.length > 3` with descriptive error
  - [ ] Unit test: creation with 4 vendors is rejected

### FIX-033: Fix InventoryTransaction transactionType Enum for Bulk Import
- **Source:** QA-D5 (Finding minor #4)
- **Scope:** `backend/models/inventoryTransaction.js`
- **Sprint:** 5
- **Effort:** 1 hour
- **Description:** The `bulk_import` reason type used by bulk upload is not in the `transactionType` enum (`purchase`, `sale`, `adjustment`, `return`, `correction`, `purchase_request`). Bulk updates fail due to enum mismatch.
- **AC:**
  - [ ] `bulk_import` added to `transactionType` enum (or bulk upload maps to `adjustment`)
  - [ ] Bulk stock update completes without enum validation errors

### FIX-034: Implement Audit Trail for Course Lifecycle Changes
- **Source:** QA-D2 (Finding minor #3)
- **Scope:** `backend/controllers/lms/admin/courseController.js`
- **Sprint:** 2
- **Effort:** 3 hours
- **Description:** `archiveCourse` and `unpublishCourse` have comments noting "Audit trail and coach notifications not yet implemented (Sprint 2 backlog)." `notifyCoaches` parameter is accepted but not acted upon.
- **AC:**
  - [ ] Audit log entries created for archive, unpublish, and publish actions
  - [ ] Coach notification sent when course is archived or unpublished
  - [ ] Audit log queryable by admin

### FIX-035: PM Navigation Badge Not Shown for Admin Role (FR44)
- **Source:** QA-D7 (Finding #2)
- **Scope:** `frontend/src/components/Layout.js` line 527
- **Sprint:** 5
- **Effort:** 0.5 hours
- **Description:** Navigation badge only displays for `purchase-manager` role, not for `admin`. Admins who manage procurement do not see pending count badge.
- **AC:**
  - [ ] Badge rendering condition includes `admin` role alongside `purchase-manager`

### FIX-036: Priority Detection Fragility in PM Dashboard (FR39)
- **Source:** QA-D7 (Finding minor #4)
- **Scope:** `frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx` line 56
- **Sprint:** 5
- **Effort:** 2 hours
- **Description:** Priority detection relies on parsing text fields (`[HIGH PRIORITY]` prefix in reason, `Priority: High` in justification). The model has a `priority` field that is sometimes populated, creating dual sources of truth.
- **AC:**
  - [ ] Priority sourced exclusively from the `priority` model field
  - [ ] Text-based priority parsing removed
  - [ ] Migration to populate `priority` field for existing records that only have text-based priority

### FIX-037: Coach Filter is Client-Side Only (FR40)
- **Source:** QA-D7 (Finding minor #5)
- **Scope:** `frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx` line 837
- **Sprint:** 5
- **Effort:** 2 hours
- **Description:** Coach/requester filter extracts unique requesters from already-loaded requests rather than using a backend endpoint. Works for current volumes but won't scale.
- **AC:**
  - [ ] Backend endpoint `GET /api/v2/shop/admin/requests/coaches` returning coach list
  - [ ] Frontend fetches coach list from backend instead of extracting from loaded requests

### FIX-038: "Order All" Uses Sequential Updates Instead of Batch API (FR42)
- **Source:** QA-D7 (Finding minor #6)
- **Scope:** `frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx` line 726
- **Sprint:** 5
- **Effort:** 2 hours
- **Description:** "Order All" iterates over requests and calls `updatePurchaseRequestStatus` for each one sequentially. Could be slow and partially fail for large bunches.
- **AC:**
  - [ ] Batch API endpoint `PUT /api/v2/shop/admin/purchase-requests/bulk-status` accepting array of request IDs
  - [ ] Frontend calls batch endpoint instead of sequential updates
  - [ ] Atomic: all succeed or all fail

### FIX-039: Purchase Request Stats Endpoint Missing New Statuses
- **Source:** QA-D6 (Finding #8)
- **Scope:** `backend/controllers/purchaseRequestController.js` — `getPurchaseRequestStats()` (lines 705-743)
- **Sprint:** 5
- **Effort:** 1 hour
- **Description:** Stats endpoint initializes only 5 statuses (`pending_approval, approved, rejected, completed, cancelled`), missing `pending, ordered, delivered_store, delivered_balagruha, on_hold`. Responses have inconsistent shape.
- **AC:**
  - [ ] All 10 valid statuses initialized in stats response with zero defaults
  - [ ] Frontend handles all status keys

### FIX-040: coachReportsController Missing CourseAssignment Import
- **Source:** QA-D2 (Finding minor #5)
- **Scope:** `backend/controllers/lms/coach/coachReportsController.js`
- **Sprint:** 2
- **Effort:** 0.5 hours
- **Description:** Lines 33-35 have commented-out code referencing Assignment model. `activeAssignments` stat is never returned.
- **AC:**
  - [ ] CourseAssignment model imported
  - [ ] `activeAssignments` count computed and included in overview stats

### FIX-041: Fix Resume Activity Deep-Link (FR10)
- **Source:** QA-D1 (Finding #7)
- **Scope:** `backend/controllers/lms/student/studentDashboardController.js` — `getDashboard()`
- **Sprint:** 2
- **Effort:** 2 hours
- **Description:** `lastActivity.taskId` is always null with comment "Could find actual last item if needed." The `ResumeActivityCard` cannot deep-link to the last incomplete task.
- **AC:**
  - [ ] `taskId` resolved from most recent `completedItems` entry or progress record
  - [ ] `ResumeActivityCard` navigates to the actual last incomplete task

### FIX-042: Base64 Image Upload Support (FR19)
- **Source:** QA-D5 (Finding minor #2)
- **Scope:** `backend/controllers/shopProductImageController.js`
- **Sprint:** 5
- **Effort:** 2 hours
- **Description:** Controller only handles multipart/form-data via multer. Base64 encoded images in JSON body are not accepted. PRD mentions base64 support.
- **AC:**
  - [ ] Controller accepts base64-encoded image data in JSON body as alternative to multipart
  - [ ] Base64 decoded and uploaded to S3
  - [ ] Unit test: base64 image upload succeeds

### FIX-043: Category Filter Multi-Select Enhancement
- **Source:** QA-D4 (Finding m2)
- **Scope:** `frontend/src/components/shop/FilterPanel.jsx`
- **Sprint:** 5
- **Effort:** 2 hours
- **Description:** Story-01 AC2 specified multiple category selection with removable pills. FilterPanel uses radio buttons (single-select). FR3 is met but story AC is partially unmet.
- **AC:**
  - [ ] FilterPanel uses checkboxes for multi-select categories
  - [ ] Selected categories shown as removable pills
  - [ ] Backend already supports single category filter; extend to accept comma-separated categories

---

## LOW Priority

### FIX-044: Correct Cancel Window Comments (24h vs 5min)
- **Source:** QA-D4 (Finding m1)
- **Scope:** `backend/routes/v2/orders.js` line 91; `frontend/src/store/shopStore.js` line 407
- **Sprint:** 5
- **Effort:** 0.25 hours
- **Description:** Route comment says "Cancel order (within 24 hours)" but implementation enforces 5-minute window. Documentation-only inaccuracy.
- **AC:**
  - [ ] Comments updated to say "within 5 minutes" in both files

### FIX-045: Migrate cart/order Console.error to Pino Logger
- **Source:** QA-D4 (Finding m4)
- **Scope:** `backend/controllers/cartController.js`; `backend/controllers/orderController.js`
- **Sprint:** 5
- **Effort:** 1 hour
- **Description:** `cartController.js` has 6 `console.error` calls and `orderController.js` has 5. Should use project's pino logger (`errorLogger`).
- **AC:**
  - [ ] All `console.error` replaced with `errorLogger.error()` per project convention

### FIX-046: No Dedicated Vendor Deactivation Endpoint (FR27)
- **Source:** QA-D5 (Finding minor #3)
- **Scope:** `backend/controllers/vendorController.js`; `backend/routes/v2/shop.js`
- **Sprint:** 5
- **Effort:** 1 hour
- **Description:** Deactivation works via generic `updateVendor` (setting `active: false`) but there is no dedicated DELETE/deactivate route. Inconsistent with product soft-delete pattern.
- **AC:**
  - [ ] Dedicated `DELETE /api/v2/shop/admin/vendors/:id` endpoint for soft-delete
  - [ ] Mirrors product deactivation pattern

### FIX-047: requestId Generation Race Condition (FR38)
- **Source:** QA-D6 (Finding #7)
- **Scope:** `backend/models/purchaseRequest.js` — pre-save hook (lines 335-348)
- **Sprint:** 5
- **Effort:** 2 hours
- **Description:** `requestId` pre-save hook uses `countDocuments()` for sequential IDs. Under concurrent writes, two requests could get the same count. The `unique: true` index would cause one to fail. Low risk currently but not production-safe.
- **AC:**
  - [ ] Counter collection with atomic increment (or retry-on-duplicate logic)
  - [ ] Unit test: concurrent creates generate unique IDs

### FIX-048: Update Story 3.3 Status File (Docs)
- **Source:** QA-D7 (Finding minor #7)
- **Scope:** `_bmad-output/sprint-5-purchase-manager/3-3-admin-inventory-report.md`
- **Sprint:** 5
- **Effort:** 0.1 hours
- **Description:** Story file has status `ready-for-dev` with unchecked task boxes, yet code is fully implemented with route, backend endpoint, and tests.
- **AC:**
  - [ ] Story file updated to reflect completion status

### FIX-049: act() Warnings in CreatePurchaseRequestModal Tests
- **Source:** QA-D8 (MIN-02)
- **Scope:** `frontend/src/__tests__/` — CreatePurchaseRequestModal test file
- **Sprint:** 5
- **Effort:** 1 hour
- **Description:** State updates in `fetchProducts` not wrapped in `act()`. Non-blocking but indicates test hygiene issue.
- **AC:**
  - [ ] All async state updates wrapped in `act()` — no console warnings during test run

### FIX-050: Notification Badge Badge Inconsistency (TitleBar 2s Polling vs FR8)
- **Source:** QA-D1 (FR8 notes)
- **Scope:** `frontend/src/components/student/TitleBar.jsx`
- **Sprint:** 2
- **Effort:** 1 hour
- **Description:** TitleBar polls coin balance every 2 seconds which is aggressive. Consider WebSocket push or longer polling interval for production to reduce server load.
- **AC:**
  - [ ] Polling interval configurable (env variable)
  - [ ] Default increased to 30 seconds or WebSocket push implemented

### FIX-051: S3 Upload Offline Queue Not Implemented (FR10)
- **Source:** QA-D1 (FR10 notes)
- **Scope:** Frontend student submission pages
- **Sprint:** 2
- **Effort:** 4 hours
- **Description:** Offline caching is browser-based localStorage, not SQLite as specified. No offline submission queue for student work submitted during connectivity loss.
- **AC:**
  - [ ] Offline submission queue implemented (IndexedDB or Service Worker)
  - [ ] Submissions auto-retry when connectivity restored
  - [ ] Visual indicator for queued submissions

### FIX-052: Coin Balance Polling (No WebSocket Push)
- **Source:** QA-D3 (FR33 notes)
- **Scope:** `frontend/src/components/student/TitleBar.jsx`
- **Sprint:** 2
- **Effort:** 3 hours
- **Description:** Coin balance relies on fetch-on-mount and online/offline events rather than WebSocket real-time push. Acceptable for current scale but not real-time as PRD implies.
- **AC:**
  - [ ] WebSocket channel for coin balance updates (or SSE)
  - [ ] TitleBar subscribes to push updates instead of polling

---

## Deferred / Out of Scope

### DEF-001: External Tool Launch via Electron IPC (FR4)
- **Source:** QA-D1 (FR4 note)
- **Description:** Launching Tux Typing, GCompris, and other external tools requires Electron desktop wrapper. Not applicable to current web SPA deployment. Defer to Electron milestone.

### DEF-002: SQLite Offline Caching (FR10)
- **Source:** QA-D1 (FR10 note)
- **Description:** MPSD specifies SQLite for offline caching. Current implementation uses localStorage. SQLite requires Electron or WebAssembly SQLite. Defer to Electron milestone or evaluate sql.js.

### DEF-003: Artweaver IPC Integration (FR11)
- **Source:** QA-D1 (FR11 note)
- **Description:** Real-time canvas mirroring with Artweaver desktop app requires Electron IPC. Defer to Electron milestone.

### DEF-004: Live Calling Infrastructure (FR26)
- **Source:** QA-D3 (FR26 note)
- **Description:** Voice recording/upload works but no live calling (WebRTC peer-to-peer or SFU). Defer to future communication sprint.
