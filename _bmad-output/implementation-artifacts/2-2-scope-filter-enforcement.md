# Story 2.2: Scope Filter Enforcement Across All Controllers

Status: complete

## Story

As a Dev,
I want to add `getScopeFilter()` enforcement to every controller that serves role-scoped data,
so that a coach at Balagruha A cannot access data belonging to Balagruha B through any endpoint.

## Acceptance Criteria

1. **Given** the audit report from Story 2.1 identifying controllers missing scope enforcement
   **When** Dev adds `getScopeFilter()` to each identified controller
   **Then** every controller that serves role-scoped data applies the appropriate scope filter (own/balagruha/all)
   **And** RBAC scope filter additions do not measurably increase API response times (< 500ms for CRUD operations, NFR7)
   **And** existing tests that pass before changes continue to pass after changes
   **And** test maintenance rules in `project-context.md` are followed — any modified controller with existing tests has those tests updated (NFR16)

## Tasks / Subtasks

- [x] Task 1: Load audit report (AC: #1)
  - [x] Read `_bmad-output/implementation-artifacts/rbac-audit-report.md` from Story 2.1
  - [x] Get list of controllers needing scope filter enforcement
- [x] Task 2: Add scope filters to each gap controller (AC: #1)
  - [x] For each controller identified as "missing enforcement":
    - [x] Read the controller file
    - [x] Identify query methods that should be scoped (find, findOne, aggregate, etc.)
    - [x] Add `getScopeFilter(req.user)` to query conditions
    - [x] Ensure the scope level matches the audit recommendation (own/balagruha/all)
  - [x] Follow existing scope filter patterns from controllers that already enforce correctly
- [x] Task 3: Update affected tests (AC: #1)
  - [x] For each modified controller, check if a test file exists in `backend/tests/`
  - [x] No modified controllers have existing test files — no test updates required
  - [x] Full test suite passes (388 tests, 0 failures)
- [x] Task 4: Verify no regressions (AC: #1)
  - [x] Run full test suite: `cd backend && npx jest --verbose`
  - [x] Verified zero new failures — 25 suites, 388 passed, 0 failures

## Dev Notes

### Scope Filter Pattern

```javascript
// Example pattern for adding scope filter to a controller method
const getScopeFilter = require('../middleware/getScopeFilter');

const listItems = async (req, res) => {
  try {
    const scopeFilter = getScopeFilter(req.user);
    const items = await Model.find({ ...scopeFilter, ...otherFilters });
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
```

### Critical Constraints

- **Do NOT break existing functionality** — scope filter should narrow results, not block access entirely
- **Admin role should see ALL data** — getScopeFilter returns empty filter `{}` for admin
- **Test every change** — run affected test files after each controller modification
- **Performance:** < 500ms for CRUD operations (NFR7) — scope filter adds a query condition, should be negligible

### References

- [Source: project-context.md#Section 2 — RBAC Pattern]
- [Source: _bmad-output/project-planning-artifacts/prd.md#FR8, FR9, NFR7]
- [Source: _bmad-output/implementation-artifacts/2-1-controller-rbac-audit.md — prerequisite]

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6 (1M context)

### Debug Log References
N/A

### Completion Notes List
- All 23 gap controllers from audit report addressed
- Added `authorize` middleware to routes missing it (medical, schedule, FR, LMS coach, LMS student, mood tracker, notifications)
- Added `req.scopeFilter` enforcement to controller query methods (task, medical, schedule, sports, music, mood tracker, purchase & repair)
- Added `authenticate` middleware to LMS student routes that had NO auth (computerApps, art, spokenEnglish, lifeSkills)
- Re-enabled FR route permission checks (un-commented TODOs)
- Standardized purchaseAndRepair inline role checks to use `req.scopeFilter`
- Cart and coin controllers use `req.user._id`/`req.user?.id` for own-data (no scope filter needed)
- Coach delivery controller has inline balagruha validation (already correct pattern)
- WTF pins are global content; student submissions already filter by `req.user?.id`
- Tests: 25 suites, 388 passed, 0 failures (no regressions)

### Change Log
1. **Routes — Added `authorize` middleware:**
   - `medicalCheckInsRoutes.js` — All 8 routes now have `authorize("Medical Management", action)`
   - `medicalRecordsRoutes.js` — Both routes now have `authorize("Medical Management", action)`
   - `scheduleRoutes.js` — 5 routes added `authorize("Schedule Management", action)`
   - `studentMoodTrackerRoutes.js` — 6 routes added `authenticate` + `authorize("User Management", action)`
   - `v2/facialRecognition.js` — 3 routes enabled `authorize("User Management", action)` (was TODO)
   - `v2/lms/coach/assignments.js` — All 8 routes added `authorize("LMS Management", action)`
   - `v2/lms/coach/grading.js` — All 7 routes added `authorize("LMS Management", action)`
   - `v2/lms/coach.js` — All 4 routes added `authorize("LMS Management", action)`
   - `notificationRoutes.js` — Re-enabled `checkPermission` on sendAdminPersonalNotification

2. **Routes — Added `authenticate` middleware:**
   - `v2/lms/student/computerApps.js` — All 6 routes
   - `v2/lms/student/art.js` — All 3 routes
   - `v2/lms/student/spokenEnglish.js` — All 4 routes
   - `v2/lms/student/lifeSkills.js` — All 7 routes

3. **Controllers — Applied `req.scopeFilter` to queries:**
   - `medicalCheckInsController.js` — `getAllMedicalCheckIns` + `getMedicalCheckInsByBalagruhaIds`
   - `taskController.js` — `getAllTasks` + `getTaskListByBalagruhaIdAndFilter`
   - `scheduleController.js` — `getSchedules` + `getSchedulesForAdmin` + `getSchedulesForCoach`
   - `sports.js` — `getSportsTasks` + `getStudentsWithSportsTask` + `getSportsInsights` + `getAllTrainingSessions`
   - `music.js` — `getSportsTasks` + `getStudentsWithSportsTask`
   - `studentMoodTrackerController.js` — `getLatestMoodEntry`
   - `purchaseAndRepair.js` — `getAllRepairRequests` + `getAllPurchaseOrders` (replaced inline role checks)

### File List
- `backend/controllers/medicalCheckInsController.js`
- `backend/controllers/music.js`
- `backend/controllers/orderController.js`
- `backend/controllers/purchaseAndRepair.js`
- `backend/controllers/scheduleController.js`
- `backend/controllers/sports.js`
- `backend/controllers/studentMoodTrackerController.js`
- `backend/controllers/taskController.js`
- `backend/routes/medicalCheckInsRoutes.js`
- `backend/routes/medicalRecordsRoutes.js`
- `backend/routes/notificationRoutes.js`
- `backend/routes/scheduleRoutes.js`
- `backend/routes/studentMoodTrackerRoutes.js`
- `backend/routes/v1/coin.js`
- `backend/routes/v2/facialRecognition.js`
- `backend/routes/v2/lms/coach.js`
- `backend/routes/v2/lms/coach/assignments.js`
- `backend/routes/v2/lms/coach/grading.js`
- `backend/routes/v2/lms/student/art.js`
- `backend/routes/v2/lms/student/computerApps.js`
- `backend/routes/v2/lms/student/lifeSkills.js`
- `backend/routes/v2/lms/student/spokenEnglish.js`
