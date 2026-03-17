# Epic 12: LMS & Coin Economy Fixes (Sprint 2 Domain)

**Status:** backlog
**Sprint:** 6
**Stories:** 19
**Estimated Effort:** ~68 hours
**Source:** Epic 11 QA validation (fix-stories-consolidated.md)

## Summary

All Sprint 2 LMS controller fixes, coin award logic, student submissions, coach grading/reports, and security gaps found in student-scoped routes.

## Stories

### CRITICAL

| Story | Fix ID | Title | Effort | Status |
|-------|--------|-------|--------|--------|
| 12.1 | FIX-001 | Rewrite LMS grading coin award logic (broken earn path) | 3h | backlog |
| 12.2 | FIX-002 | Atomic coin transactions (NFR14 violation) | 4h | backlog |
| 12.3 | FIX-003 | Remove debug logging and data leaks from student controllers | 1h | backlog |
| 12.4 | FIX-004 | Backend test coverage for all 12 LMS controllers + Coin model | 16h | backlog |
| 12.5 | FIX-010 | RBAC enforcement on student-scoped LMS endpoints | 2h | backlog |

### HIGH

| Story | Fix ID | Title | Effort | Status |
|-------|--------|-------|--------|--------|
| 12.6 | FIX-011 | Coach reports dashboard — complete FR21 implementation | 5h | backlog |
| 12.7 | FIX-012 | Implement auto-calculated coin awards from rubric (FR22) | 3h | backlog |
| 12.8 | FIX-013 | Add Balagruha authorization to manual coin award (FR23) | 2h | backlog |
| 12.9 | FIX-014 | Art course real implementation (FR11) | 10h | backlog |
| 12.10 | FIX-015 | Wire S3 upload for all student submissions (FR5/6/11) | 5h | backlog |
| 12.11 | FIX-022 | Fix bulkGrade const counter bug (runtime crash) | 0.5h | backlog |
| 12.12 | FIX-023 | Coin earning velocity analytics (FR35) | 4h | backlog |

### MEDIUM

| Story | Fix ID | Title | Effort | Status |
|-------|--------|-------|--------|--------|
| 12.13 | FIX-025 | Homework count — replace hardcode with real query | 2h | backlog |
| 12.14 | FIX-026 | Dual coin balance sources — consolidate | 2h | backlog |
| 12.15 | FIX-027 | Transaction source granularity (FR34) | 2h | backlog |
| 12.16 | FIX-034 | Audit trail for course lifecycle changes | 3h | backlog |
| 12.17 | FIX-040 | coachReportsController missing CourseAssignment import | 0.5h | backlog |
| 12.18 | FIX-041 | Fix resume activity deep-link (FR10) | 2h | backlog |

### LOW

| Story | Fix ID | Title | Effort | Status |
|-------|--------|-------|--------|--------|
| 12.19 | FIX-050 | Notification badge polling interval — reduce to 30s | 1h | backlog |

---

## Story Details

### 12.1 — FIX-001: Rewrite LMS Grading Coin Award Logic
- **Priority:** CRITICAL
- **Source:** QA-D8 (CRIT-01, CRIT-02, CRIT-03)
- **Scope:** `backend/controllers/lms/coach/coachGradingController.js` — `submitGrade()` and `bulkGrade()`
- **Description:** Three compounding bugs make LMS grading coin awards completely non-functional: (1) `source: "submission_grade"` not in Coin model enum. (2) `new Coin({...}).save()` creates orphan docs instead of using `findOrCreateForUser()` + `addCoins()`. (3) Writes to non-existent `User.coins` field.
- **AC:**
  - [ ] `submitGrade` uses `Coin.findOrCreateForUser(studentId)` then `coinRecord.addCoins()` pattern
  - [ ] `bulkGrade` uses the same corrected pattern
  - [ ] Source value is valid within Coin model enum
  - [ ] No writes to `User.coins` field
  - [ ] Integration test: grade submission awards coins visible in `Coin.findOne({ userId }).balance`
  - [ ] Integration test: graded coins are spendable in Shop checkout

### 12.2 — FIX-002: Atomic Coin Transactions
- **Priority:** CRITICAL
- **Source:** QA-D1 (Finding #3)
- **Scope:** `backend/models/coin.js` `addCoins()`; `computerAppsController.js`; `lifeSkillsController.js`
- **Description:** `addCoins()` uses `this.save()` without MongoDB sessions/transactions. Quiz submit controllers call `User.findByIdAndUpdate` separately. NFR14 requires atomic transactions.
- **AC:**
  - [ ] `addCoins()` wrapped in `mongoose.startSession()` with transaction
  - [ ] Rollback on failure of any step
  - [ ] Applied to `computerAppsController.submitQuiz` and `lifeSkillsController.submitQuiz`
  - [ ] Unit test: partial failure rolls back all changes

### 12.3 — FIX-003: Remove Debug Logging and Data Leaks
- **Priority:** CRITICAL
- **Source:** QA-D1 (Findings #2, #8, #9)
- **Scope:** `computerAppsController.js`; `lifeSkillsController.js`
- **Description:** `fs.appendFileSync` debug/crash logs, `debug` properties in API responses, duplicate `passed` property.
- **AC:**
  - [ ] All `fs.appendFileSync` calls to debug/crash log files removed
  - [ ] `debug` properties removed from all API responses
  - [ ] Duplicate `passed` property fixed in lifeSkillsController
  - [ ] No debug data in any API response across all student controllers

### 12.4 — FIX-004: Backend Test Coverage for LMS Controllers
- **Priority:** CRITICAL
- **Source:** QA-D1 (Finding #1), QA-D2 (Finding minor #1)
- **Scope:** All 12 LMS controllers + Coin model
- **Description:** Zero backend test files exist for any Sprint 2 LMS controller. Target: 80% coverage.
- **AC:**
  - [ ] Unit tests for all 12 LMS controllers (student + admin + coach)
  - [ ] Unit tests for Coin model methods
  - [ ] Integration tests for quiz submission + coin award flow
  - [ ] Integration tests for grading + coin award flow
  - [ ] 80% line coverage achieved per controller

### 12.5 — FIX-010: RBAC Enforcement on Student-Scoped LMS Endpoints
- **Priority:** CRITICAL
- **Source:** QA-D1 (Finding #11)
- **Scope:** `backend/routes/v2/lms/student/` — all `:studentId` routes
- **Description:** No verification that authenticated user matches `:studentId` parameter. Cross-student data access possible.
- **AC:**
  - [ ] Middleware verifies `req.user.id === req.params.studentId` (or refactor to use `req.user.id`)
  - [ ] 403 returned for unauthorized cross-student access
  - [ ] Unit test: student A cannot access student B's data

### 12.6 — FIX-011: Coach Reports Dashboard (FR21)
- **Priority:** HIGH
- **Source:** QA-D2 (Finding #1)
- **Scope:** `coachReportsController.js`
- **Description:** Only 2 endpoints exist, both query globally instead of scoping to coach's Balagruha. No per-course completion rates or slow learner identification.
- **AC:**
  - [ ] All queries scoped to coach's Balagruha students
  - [ ] Per-course and per-assignment completion rate endpoints
  - [ ] Slow learner identification endpoint
  - [ ] `activeAssignments` count wired
  - [ ] Unit tests for all new endpoints

### 12.7 — FIX-012: Auto-Calculated Coin Awards from Rubric (FR22)
- **Priority:** HIGH
- **Source:** QA-D2 (Finding #2)
- **Scope:** `coachGradingController.js`
- **Description:** `coinsAwarded` manually set by coach instead of auto-calculated from quality/rubric score.
- **AC:**
  - [ ] Quality-to-coin mapping configuration defined
  - [ ] `coinsAwarded` auto-calculated from quality rating in `submitGrade`
  - [ ] Coach override allowed with admin-configurable max
  - [ ] Unit test: quality rating maps to correct coin amount

### 12.8 — FIX-013: Balagruha Authorization for Manual Coin Award (FR23)
- **Priority:** HIGH
- **Source:** QA-D2 (Finding #3)
- **Scope:** `manualAwardController.js`
- **Description:** No verification that coach has authority over target students via Balagruha membership.
- **AC:**
  - [ ] Each studentId validated against coach's Balagruha membership
  - [ ] 403 returned for unauthorized student awards
  - [ ] Unit test: coach cannot award coins to students in another Balagruha

### 12.9 — FIX-014: Art Course Real Implementation (FR11)
- **Priority:** HIGH
- **Source:** QA-D1 (Finding #4)
- **Scope:** `artCourseController.js`; `ArtCoursePage.jsx`
- **Description:** Entire art course is MOCK — hardcoded S3 URLs, no canvas interface, empty Competition/Gallery models.
- **AC:**
  - [ ] HTML5 Canvas or fabric.js drawing interface for Free Sketch mode
  - [ ] Artwork upload wired to real S3
  - [ ] Competition and Gallery data models implemented
  - [ ] Workshops and Art Stories modes functional

### 12.10 — FIX-015: Wire S3 Upload for All Student Submissions (FR5/6/11)
- **Priority:** HIGH
- **Source:** QA-D1 (Finding #5)
- **Scope:** `spokenEnglishController.js`; `lifeSkillsController.js`; `artCourseController.js`; `SpokenEnglishPage.jsx`
- **Description:** S3 upload mocked across ALL student submission endpoints with fake delays.
- **AC:**
  - [ ] Real S3 upload for spoken English video, life skills voice, and art submissions
  - [ ] Artificial upload delay removed
  - [ ] Uploaded files retrievable via S3 URLs

### 12.11 — FIX-022: Fix bulkGrade const Counter Bug
- **Priority:** HIGH
- **Source:** QA-D2 (Finding #4), QA-D8 (MIN-01)
- **Scope:** `coachGradingController.js` line 275
- **Description:** `const gradedCount = 0` then `gradedCount++` throws TypeError at runtime.
- **AC:**
  - [ ] Changed to `let gradedCount = 0`
  - [ ] Unit test for bulk grading that exercises the counter

### 12.12 — FIX-023: Coin Earning Velocity Analytics (FR35)
- **Priority:** HIGH
- **Source:** QA-D1, QA-D3 (Finding #4)
- **Scope:** `analyticsController.js` (empty stub); `analytics.js`
- **Description:** No earning velocity metric, no historical weekly totals, no admin engagement dashboard.
- **AC:**
  - [ ] Velocity metric: coins earned per day/week over configurable window
  - [ ] Historical weekly totals persisted or derived from timestamps
  - [ ] Admin API endpoint for velocity across students/Balagruhas
  - [ ] Frontend visualization in admin analytics dashboard

### 12.13 — FIX-025: Homework Count — Replace Hardcode
- **Priority:** MEDIUM
- **Source:** QA-D1 (Finding #6)
- **Scope:** `studentDashboardController.js` — `getPendingHomeworkCount()`
- **Description:** Returns hardcoded `count: 3`.
- **AC:**
  - [ ] Count derived from actual pending assignments
  - [ ] Placeholder comment removed

### 12.14 — FIX-026: Dual Coin Balance Sources — Consolidate
- **Priority:** MEDIUM
- **Source:** QA-D1 (Finding #10)
- **Scope:** `TitleBar.jsx`; `CoinBalanceContext.js`
- **Description:** TitleBar has own 2s polling loop while CoinBalanceContext fetches once. Values can diverge.
- **AC:**
  - [ ] Single source of truth via CoinBalanceContext with polling
  - [ ] TitleBar reads from context instead of own fetch loop

### 12.15 — FIX-027: Transaction Source Granularity (FR34)
- **Priority:** MEDIUM
- **Source:** QA-D1, QA-D3 (Finding #5)
- **Scope:** `coin.js` source enum; quiz controllers; grading controller
- **Description:** All coin awards use generic `source: 'task'` — no `quiz_pass`, `grading`, or `manual_award` distinctions.
- **AC:**
  - [ ] Coin model source enum expanded with `quiz_pass`, `grading`, `manual_award`
  - [ ] Controllers use appropriate source values
  - [ ] Transaction history API supports filtering by source

### 12.16 — FIX-034: Audit Trail for Course Lifecycle Changes
- **Priority:** MEDIUM
- **Source:** QA-D2 (Finding minor #3)
- **Scope:** `courseController.js`
- **Description:** Archive/unpublish actions lack audit logging and coach notifications.
- **AC:**
  - [ ] Audit log entries for archive, unpublish, publish actions
  - [ ] Coach notification on course archive/unpublish
  - [ ] Audit log queryable by admin

### 12.17 — FIX-040: coachReportsController Missing CourseAssignment Import
- **Priority:** MEDIUM
- **Source:** QA-D2 (Finding minor #5)
- **Scope:** `coachReportsController.js`
- **Description:** Commented-out Assignment model reference; `activeAssignments` stat never returned.
- **AC:**
  - [ ] CourseAssignment model imported
  - [ ] `activeAssignments` count computed and included in overview stats

### 12.18 — FIX-041: Fix Resume Activity Deep-Link (FR10)
- **Priority:** MEDIUM
- **Source:** QA-D1 (Finding #7)
- **Scope:** `studentDashboardController.js` — `getDashboard()`
- **Description:** `lastActivity.taskId` always null — cannot deep-link to last incomplete task.
- **AC:**
  - [ ] `taskId` resolved from most recent progress record
  - [ ] `ResumeActivityCard` navigates to actual last incomplete task

### 12.19 — FIX-050: Notification Badge Polling Interval
- **Priority:** LOW
- **Source:** QA-D1 (FR8 notes)
- **Scope:** `TitleBar.jsx`
- **Description:** 2-second polling is aggressive for production.
- **AC:**
  - [ ] Polling interval configurable (env variable)
  - [ ] Default increased to 30 seconds
