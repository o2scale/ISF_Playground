# Story 9.2: RBAC & Permission Consistency

Status: ready-for-dev

## Story

As a Dev,
I want to verify that frontend route guards (ProtectedRoute requiredRoles) are consistent with backend permission middleware (checkPermission), and that the permission data shape flowing from API to usePermission hook is correct,
so that the frontend and backend agree on who can access what.

## Acceptance Criteria

1. **Given** App.js defines ProtectedRoute with requiredRoles for each route, and backend routes use checkPermission middleware
   **When** Dev extracts both and cross-references
   **Then** a table shows: each route → frontend role requirement → backend role requirement → MATCH/MISMATCH
   **And** any route where frontend allows a role that backend rejects is flagged as a security gap
   **And** any route where backend allows a role that frontend blocks is flagged as a UX gap

2. **Given** Story 8.2 consolidated usePermission to wrap useRBAC which fetches from the backend RBAC API
   **When** Dev traces the permission data flow: backend API → RBACContext → usePermission → component
   **Then** the data shape at each step is documented
   **And** any field name mismatches between API response and hook expectations are flagged
   **And** permission module names are consistent (e.g., "User Management" matches between frontend and backend)

3. **Given** the RBAC API endpoint serves permission data
   **When** Dev reads the backend RBAC controller response shape
   **Then** it matches what `RBACContext` expects to receive
   **And** all permission module names used in frontend `usePermission('Module Name', 'Action')` calls exist in backend Role model permissions

## Tasks / Subtasks

- [ ] Task 1: Extract frontend route guards (AC: #1)
  - [ ] Read `frontend/src/App.js` — list every route with its ProtectedRoute props (requiredRoles, module, action)
  - [ ] Include routes without ProtectedRoute (should be zero after Story 8.1)

- [ ] Task 2: Extract backend route permissions (AC: #1)
  - [ ] For each route file, list the checkPermission/authenticate middleware requirements
  - [ ] Map: route path → required role/permission

- [ ] Task 3: Cross-reference roles (AC: #1)
  - [ ] Build comparison table: route → frontend roles → backend roles → match?
  - [ ] Flag mismatches in both directions

- [ ] Task 4: Trace permission data flow (AC: #2)
  - [ ] Read the RBAC API endpoint (backend) — what does it return?
  - [ ] Read `RBACContext.js` (frontend) — what does it store from the API response?
  - [ ] Read `usePermission.js` (frontend) — what does it expose to components?
  - [ ] Verify data shape consistency at each step

- [ ] Task 5: Verify module name consistency (AC: #3)
  - [ ] `grep -rn "usePermission\|hasPermission\|canCreate\|canRead\|canUpdate\|canDelete" frontend/src/ --include="*.js" --include="*.jsx"` — find all permission checks with module names
  - [ ] Cross-reference module names against backend Role model permission entries
  - [ ] Flag any module name used in frontend that doesn't exist in backend

- [ ] Task 6: Produce report (AC: #1, #2, #3)
  - [ ] Save to `_bmad-output/implementation-artifacts/evaluation-reports/integration-rbac-consistency.md`

## Dev Notes

### DO NOT modify any files — discovery only
### Key files
- Frontend: `App.js`, `ProtectedRoute.js`, `RBACContext.js`, `usePermission.js`
- Backend: `routes/v2/*.js`, `middleware/checkPermission.js`, `models/role.js`, RBAC API endpoint

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List
