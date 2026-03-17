# Story 9.1: API Route Alignment & Stale References

Status: ready-for-dev

## Story

As a Dev,
I want to cross-reference all frontend API functions against backend route definitions and verify no stale references remain from Epic 6 changes,
so that every frontend API call hits a real backend endpoint and no dead references exist.

## Acceptance Criteria

1. **Given** 17+ frontend API modules exist in `frontend/src/api/*.js` and backend routes exist in `backend/routes/v2/*.js` and `backend/routes/auth.js`
   **When** Dev lists all frontend API functions and all backend route definitions
   **Then** a complete cross-reference table is produced showing: every frontend function → the backend endpoint it calls → whether that endpoint exists

2. **Given** the cross-reference table exists
   **When** Dev identifies mismatches
   **Then** all frontend API calls pointing to non-existent backend endpoints are listed (orphaned frontend calls)
   **And** all backend endpoints with no corresponding frontend API function are listed (unused backend endpoints)
   **And** URL mismatches are flagged (wrong version prefix v1 vs v2, typos, wrong path segments)

3. **Given** Epic 6 made significant backend changes (authController extraction, Student model deprecation, orphan model removal)
   **When** Dev checks frontend code for stale references
   **Then** any frontend code referencing old auth route paths (pre-refactor) is flagged
   **And** any frontend code referencing Student-specific endpoints is flagged
   **And** any frontend code referencing removed models (ActivityLog, MachineAssignment) is flagged

## Tasks / Subtasks

- [ ] Task 1: Inventory all frontend API functions (AC: #1)
  - [ ] For each of the 17+ modules in `frontend/src/api/`, list every exported function with the HTTP method and URL it calls
  - [ ] Include the barrel export in `frontend/src/api/index.js` — verify all modules are re-exported

- [ ] Task 2: Inventory all backend routes (AC: #1)
  - [ ] List all route files in `backend/routes/v2/` and `backend/routes/auth.js`
  - [ ] For each route file, list every endpoint (METHOD /path) and the controller function it maps to
  - [ ] Note middleware chain (authenticate, checkPermission, etc.)

- [ ] Task 3: Cross-reference and identify mismatches (AC: #2)
  - [ ] Match frontend functions to backend endpoints by URL and method
  - [ ] Flag: frontend calls with no matching backend endpoint
  - [ ] Flag: backend endpoints with no frontend caller
  - [ ] Flag: v1 vs v2 mismatches, path segment discrepancies

- [ ] Task 4: Check for stale Epic 6 references (AC: #3)
  - [ ] `grep -rn "Student\|student.*model\|/api.*student" frontend/src/ --include="*.js" --include="*.jsx" | grep -v "role.*student\|student/dashboard\|StudentDashboard\|StudentLogin\|studentMood"` — find Student model references
  - [ ] Check if auth API paths match the new authController routes
  - [ ] `grep -rn "ActivityLog\|activitylog\|MachineAssignment\|machineAssignment" frontend/src/ --include="*.js" --include="*.jsx"` — find removed model references

- [ ] Task 5: Produce report (AC: #1, #2, #3)
  - [ ] Save to `_bmad-output/implementation-artifacts/evaluation-reports/integration-api-alignment.md`
  - [ ] Include: complete cross-reference table, orphaned calls, unused endpoints, stale references

## Dev Notes

### DO NOT modify any files — discovery only
### Key directories
- Frontend API: `frontend/src/api/` (17+ modules)
- Backend routes: `backend/routes/v2/` + `backend/routes/auth.js`
- Backend controllers: `backend/controllers/` (including new `authController.js`)

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List
