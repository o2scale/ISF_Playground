# Epic 12 & 13 Autonomous Orchestrator

You are the Epic 12/13 Orchestrator for ISF_Playground. Your job is to execute all 45 fix stories across Epics 12 (LMS & Coin Economy) and 13 (Shop & Purchase Workflow) by spawning subagents with the appropriate BMAD agent persona for each story.

## Critical Rules

1. **Run stories in the priority-ordered sequence below** — CRITICAL first, then HIGH, MEDIUM, LOW
2. **Each subagent gets a fresh context** — provide the story details, agent persona, and project-context
3. **Update sprint-status.yaml after EACH story** — mark completed stories as `done`
4. **If a story fails, log the blocker and continue** — return to blocked stories after the wave completes. If retry also fails, STOP and report to the user.
5. **Commit after each story completion** — so the next subagent sees the changes
6. **Never force-push, never amend commits** — always create new commits
7. **CHECK sprint-status.yaml FIRST** — skip any story already marked `done`

## Agent Mapping

All stories in Epics 12 and 13 are code fixes — they use Amelia (Dev) as the primary agent. Stories that are test-only use Quinn (QA).

| Stories | Agent File | Agent Name |
|---------|-----------|------------|
| All code fix stories | `_bmad/bmm/agents/dev.md` | Amelia (Dev) |
| 12.4 (test coverage) | `_bmad/bmm/agents/qa.md` | Quinn (QA) |
| 13.26 (test warnings) | `_bmad/bmm/agents/qa.md` | Quinn (QA) |

## Story Reference Files

| File | Content |
|------|---------|
| `_bmad-output/implementation-artifacts/sprint-6/epic-12-lms-coin-fixes.md` | Epic 12 story details (19 stories) |
| `_bmad-output/implementation-artifacts/sprint-6/epic-13-shop-purchase-fixes.md` | Epic 13 story details (26 stories) |
| `_bmad-output/implementation-artifacts/qa-validation/fix-stories-consolidated.md` | Original findings with full scope/description/AC |
| `_bmad-output/implementation-artifacts/sprint-status.yaml` | Sprint tracking (update after each story) |
| `project-context.md` | Full project conventions |

## Per-Story Execution Protocol

For EACH story below, do the following:

1. **Read** `_bmad-output/implementation-artifacts/sprint-status.yaml` — check the story status
   - If `done` → **SKIP** this story, move to next
   - If `backlog` or `in-progress` → proceed with execution
2. **Read** the agent file listed in the Agent Mapping table above
3. **Read** the story details from the appropriate epic file (`epic-12-lms-coin-fixes.md` or `epic-13-shop-purchase-fixes.md`) — locate by story number
4. **Read** the full finding from `_bmad-output/implementation-artifacts/qa-validation/fix-stories-consolidated.md` — match by Fix ID for complete scope, description, and AC
5. **Read** `project-context.md` for coding rules and conventions
6. **Spawn a subagent** with this prompt template (fill in the variables):

```
You are {agent_name}, the {agent_role} for ISF_Playground.

Load and embody the full agent persona from: {agent_file_path}

YOUR MISSION: Implement fix story {story_number} ({fix_id}) completely.

STORY DETAILS:
{paste the story details section from the epic file}

FULL FINDING (from fix-stories-consolidated.md):
{paste the complete finding entry including Description, Scope, and AC}

PROJECT RULES: Read project-context.md for all coding conventions, test patterns, and mandatory rules.

EXECUTION RULES:
- Follow every acceptance criterion exactly
- Backend uses CommonJS (require/module.exports) — NEVER ES6 imports
- Frontend uses ES6 modules (import/export) — NEVER CommonJS
- All controller responses use { success, data, message } format
- All protected routes use authenticate + checkPermission middleware
- Use errorLogger (pino) — never console.log or console.error in production code
- Frontend API calls use the centralized api/ modules — never raw axios
- Run tests after any code changes: cd backend && npx jest --verbose
- Write tests for your changes (backend: backend/tests/controllers/, frontend: frontend/src/__tests__/)
- Do NOT modify files outside the scope of this story
- Do NOT commit — the orchestrator handles commits

When ALL acceptance criteria are met, output your final summary of:
- Files created/modified
- Tests run and results
- Any issues or notes for the next story
```

7. **Review subagent output** — verify acceptance criteria were met
8. **If success:**
   - Stage and commit the changes: `git add -A && git commit -m "fix(sprint-6): complete story {story-key} — {short description}"`
   - Update `sprint-status.yaml`: change `{story-yaml-key}: backlog` to `{story-yaml-key}: done`
   - If this was the last story in an epic, also update `epic-{n}: backlog` to `epic-{n}: done`
   - Proceed to next story
9. **If failure:**
   - Log the failure and the subagent's output
   - Attempt ONE retry with additional context from the failure
   - If retry fails, log as blocked and continue to next story
   - Return to blocked stories after the wave completes

---

## Complete Story Sequence

### Wave 1: CRITICAL (8 stories)

**Rationale for ordering:**
- 12.3 and 12.11 are tiny fixes (1h, 0.5h) — quick wins that unblock other work
- 12.1 depends on understanding coin model patterns (read coin.js first)
- 12.5 is a security fix that should go before feature work
- 12.2 (atomic transactions) builds on 12.1's corrected coin patterns
- 13.2 and 13.3 are security fixes (small scope)
- 13.1 is the largest CRITICAL story — do last when patterns are warmed up

#### Story 12.3 — FIX-003: Remove Debug Logging and Data Leaks
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-12-lms-coin-fixes.md` → Story 12.3
- **Fix ID:** FIX-003
- **Scope:** `backend/controllers/lms/student/computerAppsController.js`; `backend/controllers/lms/student/lifeSkillsController.js`
- **Success check:** Zero `fs.appendFileSync` calls in student controllers AND zero `debug` properties in any API response AND `npx jest --verbose` passes
- **YAML key:** `12-3-remove-debug-logging-data-leaks`

#### Story 12.11 — FIX-022: Fix bulkGrade const Counter Bug
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-12-lms-coin-fixes.md` → Story 12.11
- **Fix ID:** FIX-022
- **Scope:** `backend/controllers/lms/coach/coachGradingController.js` line 275
- **Success check:** `const gradedCount` changed to `let gradedCount` AND unit test for bulk grading exercises the counter AND `npx jest --verbose` passes
- **YAML key:** `12-11-fix-bulkgrade-const-counter-bug`

#### Story 12.1 — FIX-001: Rewrite LMS Grading Coin Award Logic
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-12-lms-coin-fixes.md` → Story 12.1
- **Fix ID:** FIX-001
- **Scope:** `backend/controllers/lms/coach/coachGradingController.js` — `submitGrade()` and `bulkGrade()`
- **Success check:** Uses `Coin.findOrCreateForUser()` + `addCoins()` pattern AND source value valid in Coin enum AND no writes to `User.coins` AND integration test passes AND `npx jest --verbose` passes
- **YAML key:** `12-1-rewrite-lms-grading-coin-award`

#### Story 12.5 — FIX-010: RBAC Enforcement on Student-Scoped LMS Endpoints
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-12-lms-coin-fixes.md` → Story 12.5
- **Fix ID:** FIX-010
- **Scope:** `backend/routes/v2/lms/student/` — all `:studentId` routes
- **Success check:** Middleware verifies `req.user.id === req.params.studentId` AND 403 for cross-student access AND unit test passes AND `npx jest --verbose` passes
- **YAML key:** `12-5-rbac-student-scoped-lms-endpoints`

#### Story 12.2 — FIX-002: Atomic Coin Transactions
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-12-lms-coin-fixes.md` → Story 12.2
- **Fix ID:** FIX-002
- **Scope:** `backend/models/coin.js`; `computerAppsController.js`; `lifeSkillsController.js`
- **Success check:** `addCoins()` wrapped in `mongoose.startSession()` with transaction AND rollback on failure AND unit test for partial failure AND `npx jest --verbose` passes
- **YAML key:** `12-2-atomic-coin-transactions`

#### Story 13.2 — FIX-008: FR51 Route Guard Mismatch
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-13-shop-purchase-fixes.md` → Story 13.2
- **Fix ID:** FIX-008
- **Scope:** `frontend/src/App.js`; `frontend/src/components/Layout.js`; `backend/middleware/checkPurchaseRequestAccess.js`
- **Success check:** `/purchase` route includes all 8 non-student roles AND frontend builds AND `npx jest --verbose` passes
- **YAML key:** `13-2-fr51-route-guard-mismatch`

#### Story 13.3 — FIX-009: Order Routes Missing RBAC Authorization
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-13-shop-purchase-fixes.md` → Story 13.3
- **Fix ID:** FIX-009
- **Scope:** `backend/routes/v2/orders.js`
- **Success check:** `authorize()` middleware on admin-only endpoints AND student ownership check AND unit tests AND `npx jest --verbose` passes
- **YAML key:** `13-3-order-routes-missing-rbac`

#### Story 13.1 — FIX-007: Unify Purchase Request Inventory with State Machine
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-13-shop-purchase-fixes.md` → Story 13.1
- **Fix ID:** FIX-007
- **Scope:** `backend/controllers/purchaseRequestController.js` — `updateStatus()` and `completePurchaseRequest()`
- **Success check:** `delivered_store` triggers inventory stock increase AND `delivered_balagruha` triggers deployed tracking AND integration test for 4-step workflow AND `npx jest --verbose` passes
- **YAML key:** `13-1-unify-purchase-request-inventory-state-machine`

**After Wave 1:** Output wave summary, verify all backend tests pass, verify frontend builds.

---

### Wave 2: HIGH (13 stories)

**Note:** Story 12.17 (FIX-040, MEDIUM) promoted here as prerequisite for 12.6 (coach reports).

#### Story 12.17 — FIX-040: coachReportsController Missing Import
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-12-lms-coin-fixes.md` → Story 12.17
- **Fix ID:** FIX-040
- **Scope:** `backend/controllers/lms/coach/coachReportsController.js`
- **Success check:** CourseAssignment model imported AND `activeAssignments` count computed and included AND `npx jest --verbose` passes
- **YAML key:** `12-17-coach-reports-missing-import`

#### Story 12.7 — FIX-012: Auto-Calculated Coin Awards from Rubric
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-12-lms-coin-fixes.md` → Story 12.7
- **Fix ID:** FIX-012
- **Scope:** `backend/controllers/lms/coach/coachGradingController.js`
- **Success check:** Quality-to-coin mapping defined AND `coinsAwarded` auto-calculated AND coach override allowed AND unit test AND `npx jest --verbose` passes
- **YAML key:** `12-7-auto-calculated-coin-awards-fr22`

#### Story 12.8 — FIX-013: Balagruha Authorization for Manual Coin Award
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-12-lms-coin-fixes.md` → Story 12.8
- **Fix ID:** FIX-013
- **Scope:** `backend/controllers/lms/coach/manualAwardController.js`
- **Success check:** Each studentId validated against coach's Balagruha AND 403 for unauthorized AND unit test AND `npx jest --verbose` passes
- **YAML key:** `12-8-balagruha-auth-manual-coin-award-fr23`

#### Story 12.6 — FIX-011: Coach Reports Dashboard (FR21)
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-12-lms-coin-fixes.md` → Story 12.6
- **Fix ID:** FIX-011
- **Scope:** `backend/controllers/lms/coach/coachReportsController.js`
- **Success check:** Queries scoped to coach's Balagruha AND per-course completion endpoints AND slow learner endpoint AND unit tests AND `npx jest --verbose` passes
- **YAML key:** `12-6-coach-reports-dashboard-fr21`

#### Story 12.12 — FIX-023: Coin Earning Velocity Analytics
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-12-lms-coin-fixes.md` → Story 12.12
- **Fix ID:** FIX-023
- **Scope:** `backend/controllers/analyticsController.js`; `backend/services/analytics.js`
- **Success check:** Velocity metric endpoint AND historical totals AND admin API AND `npx jest --verbose` passes
- **YAML key:** `12-12-coin-earning-velocity-analytics-fr35`

#### Story 12.10 — FIX-015: Wire S3 Upload for Student Submissions
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-12-lms-coin-fixes.md` → Story 12.10
- **Fix ID:** FIX-015
- **Scope:** `spokenEnglishController.js`; `lifeSkillsController.js`; `artCourseController.js`; `SpokenEnglishPage.jsx`
- **Success check:** Real S3 upload calls (not mock URLs) AND artificial delay removed AND `npx jest --verbose` passes
- **YAML key:** `12-10-wire-s3-upload-student-submissions`

#### Story 12.9 — FIX-014: Art Course Real Implementation
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-12-lms-coin-fixes.md` → Story 12.9
- **Fix ID:** FIX-014
- **Scope:** `backend/controllers/lms/student/artCourseController.js`; `frontend/src/pages/student/ArtCoursePage.jsx`
- **Success check:** Canvas/drawing interface AND real S3 upload AND Competition/Gallery models AND frontend builds AND `npx jest --verbose` passes
- **YAML key:** `12-9-art-course-real-implementation-fr11`

#### Story 13.7 — FIX-019: Capture Supplier/Invoice at 'ordered' Transition
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-13-shop-purchase-fixes.md` → Story 13.7
- **Fix ID:** FIX-019
- **Scope:** `backend/controllers/purchaseRequestController.js` — `updateStatus()`
- **Success check:** `updateStatus` accepts `supplierName`/`invoiceNumber` at 'ordered' AND fields saved AND unit test AND `npx jest --verbose` passes
- **YAML key:** `13-7-capture-supplier-invoice-ordered-fr33`

#### Story 13.8 — FIX-020: Priority and Coach Filters
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-13-shop-purchase-fixes.md` → Story 13.8
- **Fix ID:** FIX-020
- **Scope:** `backend/controllers/purchaseRequestController.js` — `getAllPurchaseRequests()`
- **Success check:** `priority` and `requestedBy` query params AND priority-first sort AND `npx jest --verbose` passes
- **YAML key:** `13-8-priority-coach-filters-purchase-request`

#### Story 13.9 — FIX-024: Coin Economy Health Metrics
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-13-shop-purchase-fixes.md` → Story 13.9
- **Fix ID:** FIX-024
- **Scope:** `backend/services/analytics.js` — `getCoinEconomyHealth()`
- **Success check:** All 3 metrics (earn-to-spend, velocity, shop conversion) computed AND `npx jest --verbose` passes
- **YAML key:** `13-9-coin-economy-health-metrics-fr48`

#### Story 13.4 — FIX-016: Build Product Detail Page
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-13-shop-purchase-fixes.md` → Story 13.4
- **Fix ID:** FIX-016
- **Scope:** `frontend/src/pages/ProductDetail.jsx`; `frontend/src/App.js`
- **Success check:** `ProductDetail.jsx` exists at route `/shop/products/:id` AND full description/gallery/stock/add-to-cart AND navigation from ProductCard AND frontend builds
- **YAML key:** `13-4-build-product-detail-page-fr4`

#### Story 13.5 — FIX-017: Fuzzy Duplicate Product Name Detection
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-13-shop-purchase-fixes.md` → Story 13.5
- **Fix ID:** FIX-017
- **Scope:** `backend/controllers/adminProductController.js`
- **Success check:** Fuzzy name matching on creation AND warning/rejection for similar names AND unit test AND `npx jest --verbose` passes
- **YAML key:** `13-5-fuzzy-duplicate-product-name-fr18`

#### Story 13.6 — FIX-018: Master Inventory Per-Balagruha Breakdown
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-13-shop-purchase-fixes.md` → Story 13.6
- **Fix ID:** FIX-018
- **Scope:** `backend/controllers/inventoryController.js`; `frontend/src/pages/MasterInventoryReport.jsx`
- **Success check:** Aggregation by Balagruha AND frontend per-Balagruha display AND CSV export AND `npx jest --verbose` passes AND frontend builds
- **YAML key:** `13-6-master-inventory-per-balagruha-fr24`

**After Wave 2:** Output wave summary, verify all backend tests pass, verify frontend builds.

---

### Wave 3: MEDIUM (17 stories)

**Note:** Story 12.4 (FIX-004, CRITICAL priority) placed last in this wave because it's 16h of pure test-writing — tests should cover the corrected code from Waves 1-2, not the buggy original.

#### Story 12.13 — FIX-025: Homework Count Replace Hardcode
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-12-lms-coin-fixes.md` → Story 12.13
- **Fix ID:** FIX-025
- **Scope:** `backend/controllers/lms/student/studentDashboardController.js` — `getPendingHomeworkCount()`
- **Success check:** Count from actual pending assignments AND placeholder comment removed AND `npx jest --verbose` passes
- **YAML key:** `12-13-homework-count-replace-hardcode`

#### Story 12.14 — FIX-026: Dual Coin Balance Consolidate
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-12-lms-coin-fixes.md` → Story 12.14
- **Fix ID:** FIX-026
- **Scope:** `frontend/src/components/student/TitleBar.jsx`; `frontend/src/contexts/CoinBalanceContext.js`
- **Success check:** Single source of truth via CoinBalanceContext AND TitleBar reads from context AND frontend builds
- **YAML key:** `12-14-dual-coin-balance-consolidate`

#### Story 12.15 — FIX-027: Transaction Source Granularity
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-12-lms-coin-fixes.md` → Story 12.15
- **Fix ID:** FIX-027
- **Scope:** `backend/models/coin.js`; quiz controllers; grading controller
- **Success check:** Enum expanded with `quiz_pass`, `grading`, `manual_award` AND controllers use correct sources AND `npx jest --verbose` passes
- **YAML key:** `12-15-transaction-source-granularity-fr34`

#### Story 12.16 — FIX-034: Audit Trail for Course Lifecycle
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-12-lms-coin-fixes.md` → Story 12.16
- **Fix ID:** FIX-034
- **Scope:** `backend/controllers/lms/admin/courseController.js`
- **Success check:** Audit log entries for archive/unpublish/publish AND coach notification AND admin queryable AND `npx jest --verbose` passes
- **YAML key:** `12-16-audit-trail-course-lifecycle`

#### Story 12.18 — FIX-041: Fix Resume Activity Deep-Link
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-12-lms-coin-fixes.md` → Story 12.18
- **Fix ID:** FIX-041
- **Scope:** `backend/controllers/lms/student/studentDashboardController.js`
- **Success check:** `taskId` resolved from progress records AND `ResumeActivityCard` navigates correctly AND `npx jest --verbose` passes
- **YAML key:** `12-18-fix-resume-activity-deep-link-fr10`

#### Story 13.10 — FIX-029: Dead Placeholder Code in ShopHome
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-13-shop-purchase-fixes.md` → Story 13.10
- **Fix ID:** FIX-029
- **Scope:** `frontend/src/components/shop/ShopHome.jsx`
- **Success check:** `handleAddToCart` and `onAddToCart` prop removed AND frontend builds
- **YAML key:** `13-10-dead-placeholder-code-shophome`

#### Story 13.11 — FIX-030: Double Response in shopController
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-13-shop-purchase-fixes.md` → Story 13.11
- **Fix ID:** FIX-030
- **Scope:** `backend/controllers/shopController.js` lines 193-194
- **Success check:** Duplicate `res.status(200).json()` removed AND unit test AND `npx jest --verbose` passes
- **YAML key:** `13-11-double-response-shopcontroller`

#### Story 13.13 — FIX-032: Enforce Max 3 Vendors Per Product
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-13-shop-purchase-fixes.md` → Story 13.13
- **Fix ID:** FIX-032
- **Scope:** `backend/controllers/adminProductController.js`
- **Success check:** Validation rejects `approvedVendors.length > 3` AND unit test AND `npx jest --verbose` passes
- **YAML key:** `13-13-enforce-max-3-vendors-per-product`

#### Story 13.14 — FIX-033: InventoryTransaction Enum for Bulk Import
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-13-shop-purchase-fixes.md` → Story 13.14
- **Fix ID:** FIX-033
- **Scope:** `backend/models/inventoryTransaction.js`
- **Success check:** `bulk_import` in enum or mapped to `adjustment` AND bulk update works AND `npx jest --verbose` passes
- **YAML key:** `13-14-inventory-transaction-enum-bulk-import`

#### Story 13.15 — FIX-035: PM Nav Badge for Admin Role
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-13-shop-purchase-fixes.md` → Story 13.15
- **Fix ID:** FIX-035
- **Scope:** `frontend/src/components/Layout.js` line 527
- **Success check:** Badge condition includes `admin` AND frontend builds
- **YAML key:** `13-15-pm-nav-badge-admin-role-fr44`

#### Story 13.19 — FIX-039: Purchase Request Stats Missing Statuses
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-13-shop-purchase-fixes.md` → Story 13.19
- **Fix ID:** FIX-039
- **Scope:** `backend/controllers/purchaseRequestController.js` — `getPurchaseRequestStats()`
- **Success check:** All 10 statuses initialized AND `npx jest --verbose` passes
- **YAML key:** `13-19-purchase-request-stats-missing-statuses`

#### Story 13.20 — FIX-043: Category Filter Multi-Select
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-13-shop-purchase-fixes.md` → Story 13.20
- **Fix ID:** FIX-043
- **Scope:** `frontend/src/components/shop/FilterPanel.jsx`
- **Success check:** Checkboxes for multi-select AND removable pills AND backend comma-separated support AND frontend builds
- **YAML key:** `13-20-category-filter-multi-select`

#### Story 13.12 — FIX-031: Backend console.error Cleanup
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-13-shop-purchase-fixes.md` → Story 13.12
- **Fix ID:** FIX-031
- **Scope:** All backend controllers
- **Success check:** Zero `console.error` in backend controllers AND replaced with pino/errorLogger AND `npx jest --verbose` passes
- **YAML key:** `13-12-backend-console-error-cleanup`

#### Story 13.16 — FIX-036: Priority Detection Model Field Only
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-13-shop-purchase-fixes.md` → Story 13.16
- **Fix ID:** FIX-036
- **Scope:** `frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx`
- **Success check:** Priority from model field only AND text parsing removed AND frontend builds
- **YAML key:** `13-16-priority-detection-model-field-only`

#### Story 13.17 — FIX-037: Coach Filter Move to Backend
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-13-shop-purchase-fixes.md` → Story 13.17
- **Fix ID:** FIX-037
- **Scope:** `ShopInventoryView.jsx`; new backend endpoint
- **Success check:** Backend endpoint returns coach list AND frontend fetches from it AND `npx jest --verbose` passes AND frontend builds
- **YAML key:** `13-17-coach-filter-move-to-backend`

#### Story 13.18 — FIX-038: "Order All" Batch API
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-13-shop-purchase-fixes.md` → Story 13.18
- **Fix ID:** FIX-038
- **Scope:** `ShopInventoryView.jsx`; new backend batch endpoint
- **Success check:** Batch endpoint exists AND frontend calls it AND atomic operation AND `npx jest --verbose` passes AND frontend builds
- **YAML key:** `13-18-order-all-batch-api`

#### Story 12.4 — FIX-004: Backend Test Coverage for LMS Controllers
- **Agent:** Quinn (QA) — `_bmad/bmm/agents/qa.md`
- **Epic file:** `epic-12-lms-coin-fixes.md` → Story 12.4
- **Fix ID:** FIX-004
- **Scope:** All 12 LMS controllers + Coin model
- **Success check:** Unit tests for all 12 controllers AND Coin model tests AND integration tests for quiz+grading coin flows AND 80% line coverage AND `npx jest --verbose` passes
- **YAML key:** `12-4-backend-test-coverage-lms-controllers`

**After Wave 3:** Output wave summary, verify all backend tests pass, verify frontend builds.

---

### Wave 4: LOW (7 stories)

#### Story 12.19 — FIX-050: Notification Badge Polling Interval
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-12-lms-coin-fixes.md` → Story 12.19
- **Fix ID:** FIX-050
- **Scope:** `frontend/src/components/student/TitleBar.jsx`
- **Success check:** Polling interval configurable AND default 30s AND frontend builds
- **YAML key:** `12-19-notification-badge-polling-interval`

#### Story 13.21 — FIX-044: Correct Cancel Window Comments
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-13-shop-purchase-fixes.md` → Story 13.21
- **Fix ID:** FIX-044
- **Scope:** `backend/routes/v2/orders.js`; `frontend/src/store/shopStore.js`
- **Success check:** Comments updated to "within 5 minutes"
- **YAML key:** `13-21-correct-cancel-window-comments`

#### Story 13.22 — FIX-045: Cart/Order console.error to Pino
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-13-shop-purchase-fixes.md` → Story 13.22
- **Fix ID:** FIX-045
- **Scope:** `backend/controllers/cartController.js`; `backend/controllers/orderController.js`
- **Success check:** All `console.error` replaced with `errorLogger.error()` AND `npx jest --verbose` passes
- **YAML key:** `13-22-migrate-cart-order-console-error-pino`

#### Story 13.23 — FIX-046: Vendor Deactivation Endpoint
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-13-shop-purchase-fixes.md` → Story 13.23
- **Fix ID:** FIX-046
- **Scope:** `backend/controllers/vendorController.js`; `backend/routes/v2/vendor.js`
- **Success check:** Dedicated DELETE endpoint for soft-delete AND mirrors product pattern AND `npx jest --verbose` passes
- **YAML key:** `13-23-vendor-deactivation-endpoint`

#### Story 13.24 — FIX-047: requestId Race Condition
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-13-shop-purchase-fixes.md` → Story 13.24
- **Fix ID:** FIX-047
- **Scope:** `backend/models/purchaseRequest.js` — pre-save hook
- **Success check:** Atomic counter or retry-on-duplicate AND unit test for concurrent creates AND `npx jest --verbose` passes
- **YAML key:** `13-24-request-id-race-condition`

#### Story 13.25 — FIX-048: Update Story 3.3 Status File
- **Agent:** Amelia (Dev) — `_bmad/bmm/agents/dev.md`
- **Epic file:** `epic-13-shop-purchase-fixes.md` → Story 13.25
- **Fix ID:** FIX-048
- **Scope:** `_bmad-output/sprint-5-purchase-manager/3-3-admin-inventory-report.md`
- **Success check:** Story file reflects completion status
- **YAML key:** `13-25-update-story-3-3-status-file`

#### Story 13.26 — FIX-049: act() Warnings in Tests
- **Agent:** Quinn (QA) — `_bmad/bmm/agents/qa.md`
- **Epic file:** `epic-13-shop-purchase-fixes.md` → Story 13.26
- **Fix ID:** FIX-049
- **Scope:** `frontend/src/__tests__/` — CreatePurchaseRequestModal tests
- **Success check:** All async state updates wrapped in `act()` AND zero console warnings AND frontend tests pass
- **YAML key:** `13-26-act-warnings-purchase-request-tests`

**After Wave 4:** Output wave summary, verify all backend tests pass, verify frontend builds.

---

## Completion

When all 45 stories are `done` and both epics are `done`:

1. Run final verification: `cd backend && npx jest --coverage --verbose`
2. Run frontend build: `cd frontend && npx react-scripts build`
3. Verify `sprint-status.yaml`: all Epic 12 and 13 entries are `done`
4. Create final commit: `git commit -m "fix(sprint-6): Epics 12 & 13 complete — 45 QA fix stories across LMS and Shop domains"`

Report to Dev:

```
EPICS 12 & 13 COMPLETE

Epic 12 (LMS & Coin Economy): 19/19 stories done
Epic 13 (Shop & Purchase Workflow): 26/26 stories done
Total: 45/45 stories done
Test suite: {X} tests, zero failures
Coverage: {X}% (up from {Y}%)
Frontend: builds clean
Blocked: {count} stories (if any) — {reasons}
```
