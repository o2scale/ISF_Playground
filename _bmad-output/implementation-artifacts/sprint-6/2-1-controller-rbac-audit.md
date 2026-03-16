# Story 2.1: Controller RBAC Audit

Status: ready-for-dev

## Story

As a Dev,
I want to audit all controllers and identify which ones lack `getScopeFilter()` enforcement,
so that I have a complete gap list to systematically close.

## Acceptance Criteria

1. **Given** the backend has controllers across multiple domains (shop, LMS, medical, WTF, user management, etc.)
   **When** Dev examines each controller that serves role-scoped data
   **Then** an audit report is produced listing every controller, whether it applies `getScopeFilter()`, and the gap status
   **And** controllers are categorized as: enforced, missing enforcement, or not applicable (e.g., public endpoints)
   **And** the audit identifies which scope levels (own/balagruha/all) each controller should enforce based on the data it serves

## Tasks / Subtasks

- [ ] Task 1: Inventory all controllers (AC: #1)
  - [ ] List all files in `backend/controllers/` including nested `lms/` subdirectories
  - [ ] List all route files in `backend/routes/` and `backend/routes/v1/` and `backend/routes/v2/`
  - [ ] Map each route file to its controller(s)
- [ ] Task 2: Check each controller for scope enforcement (AC: #1)
  - [ ] For each controller, search for `getScopeFilter` usage
  - [ ] For each route, search for `checkPermission` middleware
  - [ ] Identify controllers that serve Balagruha-scoped data but don't filter
  - [ ] Identify controllers that serve user-scoped data (own) but don't filter
- [ ] Task 3: Classify and produce audit report (AC: #1)
  - [ ] Create `_bmad-output/implementation-artifacts/rbac-audit-report.md` with:
    | Controller | Route | Has getScopeFilter | Has checkPermission | Scope Level Needed | Gap Status |
  - [ ] Categorize each as: enforced / missing / not-applicable
  - [ ] Identify recommended scope level for each gap (own/balagruha/all)
- [ ] Task 4: Prioritize gaps (AC: #1)
  - [ ] Flag controllers that handle sensitive data (student, medical, financial)
  - [ ] Order gaps by risk: data sensitivity × number of endpoints

## Dev Notes

### RBAC Architecture

- **Middleware:** `backend/middleware/auth.js` — `authenticate` function
- **Permission check:** `backend/middleware/checkPermission.js` — `checkPermission('Resource', 'Action')`
- **Scope filter:** `getScopeFilter()` — returns query filter based on user's role scope (own/balagruha/all)
- **Scope levels:**
  - `own` — user sees only their own data
  - `balagruha` — user sees data for their assigned Balagruha(s)
  - `all` — admin sees everything
- **9 roles:** admin, coach, student, balagruha-incharge, purchase-manager, medical-incharge, sports-coach, music-coach, amma

### Controller Locations

```
backend/controllers/
├── vendorController.js
├── purchaseRequestController.js
├── adminProductController.js
├── inventoryController.js
├── orderController.js, cartController.js, shopController.js
├── frController.js
├── wtfController.js, wtfSettingsController.js
├── medicalCheckInsController.js, medicalRecordController.js
├── doctorController.js, hospitalController.js
├── userController.js, roleController.js, profileController.js
├── notificationController.js, scheduleController.js
├── taskController.js, studentMoodTrackerController.js
├── questionBankController.js, quizController.js, contentController.js
└── lms/
    ├── admin/ (courseController, adminAssignmentController, translationController)
    ├── coach/ (coachAssignmentController, coachGradingController, coachReportsController, manualAwardController)
    └── student/ (studentDashboardController, computerAppsController, artCourseController, spokenEnglishController, lifeSkillsController)
```

### Critical Constraints

- **DO NOT modify any controllers** — this is audit only
- **DO NOT modify any route files** — fixes are Story 2.2
- **Be thorough** — missing a controller in the audit means it won't get fixed

### References

- [Source: _bmad-output/architecture.md#Architectural Boundaries — API Boundaries table]
- [Source: project-context.md#Section 2 — RBAC Pattern]
- [Source: _bmad-output/project-planning-artifacts/prd.md#FR7]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List
