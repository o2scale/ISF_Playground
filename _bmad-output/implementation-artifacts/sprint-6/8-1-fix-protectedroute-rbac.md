# Story 8.1: Fix ProtectedRoute RBAC Denial

Status: ready-for-dev

## Story

As a Dev,
I want to re-enable the ProtectedRoute RBAC denial logic that is currently commented out,
so that unauthorized users are redirected away from pages they shouldn't access.

## Acceptance Criteria

1. **Given** ProtectedRoute's RBAC denial logic is commented out (any authenticated user can access any route)
   **When** Dev un-comments and fixes the denial logic
   **Then** users without the required role/permission for a route are redirected to their appropriate dashboard
   **And** admin pages are only accessible to admin role
   **And** coach pages are only accessible to coach role
   **And** student pages are only accessible to student role

2. **Given** 5 routes lack ProtectedRoute wrapper entirely (`/balagruha`, `/attendance`, `/course`, `/repair`, `/purchase`)
   **When** Dev wraps these routes with ProtectedRoute in App.js
   **Then** all 36 page routes are protected by ProtectedRoute with appropriate role requirements

3. **Given** RBAC is re-enabled
   **When** Dev tests by logging in as different roles
   **Then** each role can only navigate to their authorized pages
   **And** unauthorized navigation attempts redirect gracefully (not crash or blank screen)

## Tasks / Subtasks

- [ ] Task 1: Fix ProtectedRoute denial (AC: #1)
  - [ ] Read ProtectedRoute component — find the commented-out denial logic
  - [ ] Un-comment the role/permission check
  - [ ] Verify it checks against the correct permission source (useRBAC preferred per FC2)
  - [ ] Test: admin user can access admin pages, gets redirected from student pages
  - [ ] Test: student user can access student pages, gets redirected from admin pages

- [ ] Task 2: Wrap unprotected routes (AC: #2)
  - [ ] Read App.js — find the 5 routes without ProtectedRoute
  - [ ] Add ProtectedRoute wrapper with correct role requirements:
    - `/balagruha` → admin
    - `/attendance` → admin, coach, balagruha-incharge
    - `/course` → admin, coach, student (different permissions per role)
    - `/repair` → admin, purchase-manager, coach
    - `/purchase` → admin, purchase-manager, coach
  - [ ] Verify all 36 routes now have ProtectedRoute

- [ ] Task 3: Verify no crashes (AC: #3)
  - [ ] Test redirect behavior for unauthorized access
  - [ ] Ensure redirect goes to role-appropriate dashboard (not blank page)
  - [ ] Check that the redirect doesn't cause infinite loops
  - [ ] Run existing frontend tests to verify no regressions

## Dev Notes

### CRITICAL SECURITY FIX

This is the highest priority frontend fix. The backend RBAC (Epic 2 + Epic 6) blocks unauthorized DATA access, but the frontend currently shows ALL pages to ALL authenticated users. Users see admin dashboards, management interfaces, and configuration pages they shouldn't.

### ProtectedRoute Pattern

```jsx
// Expected pattern after fix
<ProtectedRoute requiredRoles={['admin']}>
  <AdminDashboard />
</ProtectedRoute>
```

### Critical Constraints

- **DO NOT break existing working pages** — only add restrictions
- **Redirect gracefully** — unauthorized access → role-appropriate dashboard, not blank screen
- **Test with multiple roles** — admin, coach, student at minimum
- **This must work with the current auth system** — don't refactor auth, just fix the route guard

### References

- [Source: frontend-evaluation-summary.md#FC1, FH3]
- [Source: frontend-architecture-audit.md — ProtectedRoute analysis]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List
