# Story 1.1: Baseline Coverage Measurement

Status: ready-for-dev

## Story

As a Dev,
I want to measure and record the current test coverage baseline before any triage work begins,
so that I can verify coverage does not decrease after resolving legacy failures.

## Acceptance Criteria

1. **Given** the backend test suite exists with 14 known failing suites
   **When** Dev runs `npx jest --coverage`
   **Then** a coverage report is generated showing branches, functions, lines, and statements percentages
   **And** the baseline numbers are recorded in a triage document for comparison after completion

## Tasks / Subtasks

- [ ] Task 1: Run full test suite with coverage (AC: #1)
  - [ ] Navigate to `backend/` directory
  - [ ] Run `npx jest --coverage --verbose 2>&1 | tee coverage-baseline.txt` to capture output
  - [ ] Record which 14 suites fail (names, error categories)
  - [ ] Note total test count, pass count, fail count
- [ ] Task 2: Record coverage baseline (AC: #1)
  - [ ] Create `_bmad-output/implementation-artifacts/test-triage-report.md` with:
    - Coverage percentages: branches, functions, lines, statements
    - Date of measurement
    - Total test suites: X passing, 14 failing
    - List of all 14 failing suites with file paths
  - [ ] Classify each failing suite preliminarily (stale/regression/config/unknown — full triage is Story 1.2)
- [ ] Task 3: Verify test infrastructure (AC: #1)
  - [ ] Confirm `mongodb-memory-server` is functioning (required for isolated DB tests)
  - [ ] Confirm Jest config is correct in `backend/package.json`
  - [ ] Note any test infrastructure issues that may affect triage

## Dev Notes

### Architecture & Patterns

- **Test framework:** Jest 30.0.5 with `mongodb-memory-server` 10.2.0
- **Test location:** `backend/tests/` with subdirectories: `controllers/`, `routes/`, `wtf/unit/`, `epic3/`
- **Test naming:** `<feature>.test.js` or `<feature>_story<X>_<Y>.test.js`
- **Run command:** `cd backend && npx jest --coverage --verbose`
- **Coverage target:** Establish baseline now; target trending toward 70% by end of Sprint 6

### Existing Test Files (25 files found)

```
backend/tests/
├── checkPermission.test.js
├── migration-scope.test.js
├── performance-rbac.test.js
├── purchaseRequest_story2_1.test.js
├── security-rbac.test.js
├── shopItem.test.js
├── shopItem_story1_2.test.js
├── shopProduct_story2_5.test.js
├── vendor.test.js
├── controllers/
│   ├── adminProductController_story1_2.test.js
│   ├── inventoryController.test.js
│   ├── purchaseRequestController.test.js
│   ├── userController.test.js
│   └── vendorController.test.js
├── routes/
│   ├── inventoryMasterReportRoutes.test.js
│   ├── stockReconciliationRoutes.test.js
│   ├── userBalagruhasRoutes.test.js
│   └── vendorRoutes.test.js
├── epic3/
│   └── pm-dashboard.test.js
└── wtf/unit/
    ├── coin-controllers.test.js
    ├── controllers.test.js
    ├── dataAccess.test.js
    ├── integration.test.js
    ├── models.test.js
    └── services.test.js
```

### Known Context

- **14 legacy failures** are pre-existing (before 2026-03-15 changes) — NOT caused by recent work
- **90+ backend tests** exist across these 25 files (purchaseRequest 46, user 25, inventory 19 + others)
- **9 Playwright E2E tests** exist in `frontend/e2e/` (not part of this story's scope)
- **Security test `security-rbac.test.js`** — per NFR3, this must NEVER be deleted, only fixed (Story 1.3)
- Test maintenance rules are mandatory per `project-context.md` Section 9

### Critical Constraints

- **DO NOT fix any tests in this story** — this is measurement only
- **DO NOT modify any test files** — baseline must reflect current state
- **DO NOT run tests with `--forceExit`** — need accurate failure reporting
- **Record ALL output** — the triage report is the primary deliverable
- **Note test execution time** — NFR5 requires < 120s after all fixes (need baseline to compare)

### Project Structure Notes

- Backend root: `backend/`
- Test config: `backend/package.json` (Jest configuration)
- Output location: `_bmad-output/implementation-artifacts/test-triage-report.md`
- All paths relative to project root `/data/home/dev/Desktop/dev/ISF_Playground/`

### References

- [Source: project-context.md#Section 9 — Test Maintenance Rules]
- [Source: _bmad-output/project-planning-artifacts/prd.md#Functional Requirements — FR6]
- [Source: _bmad-output/project-planning-artifacts/prd.md#Non-Functional Requirements — NFR5, NFR14]
- [Source: _bmad-output/project-planning-artifacts/epics.md#Story 1.1]

## Dev Agent Record

### Agent Model Used

(to be filled by dev agent)

### Debug Log References

### Completion Notes List

### Change Log

### File List
