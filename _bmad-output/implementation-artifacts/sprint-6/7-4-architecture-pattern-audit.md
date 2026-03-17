# Story 7.4: Frontend Architecture Pattern Audit

Status: ready-for-dev

## Story

As a Dev,
I want to audit frontend architecture patterns (state management, API usage, RBAC enforcement) for consistency,
so that we know which patterns need standardization before building Sprint 2 features.

## Acceptance Criteria

1. **Given** project-context.md says "use Zustand for global state, do NOT use Context API for global state"
   **When** Dev audits all state management usage across the frontend
   **Then** a report lists: all Zustand stores, all Context providers, all components using local state for data that should be global
   **And** violations of the Zustand-only rule are flagged

2. **Given** `usePermission` hook exists for frontend RBAC enforcement
   **When** Dev audits all admin/coach/role-gated pages and components
   **Then** a report lists: which pages use usePermission, which pages check role directly, which pages have NO permission check
   **And** pages accessible to roles that shouldn't see them are flagged as security gaps

3. **Given** 17 API modules exist in `frontend/src/api/`
   **When** Dev audits API module usage patterns
   **Then** a report lists: which modules are imported by which components, which modules have zero imports (unused), and whether error handling is consistent (toast notifications vs silent failures)

## Tasks / Subtasks

- [ ] Task 1: State management audit (AC: #1)
  - [ ] List all Zustand stores in `frontend/src/store/`
  - [ ] `grep -rn "useContext\|createContext\|Context.Provider" frontend/src/ --include="*.js" --include="*.jsx"` — find all Context usage
  - [ ] Classify each: legitimate exception (RBACContext) vs violation of Zustand rule
  - [ ] Find components using `useState` for data that multiple components need (should be Zustand)

- [ ] Task 2: RBAC/permission audit (AC: #2)
  - [ ] `grep -rn "usePermission" frontend/src/ --include="*.js" --include="*.jsx"` — find all usePermission usage
  - [ ] List all pages in `frontend/src/pages/` and their role guards
  - [ ] Check `App.js` route definitions for role-based route guards
  - [ ] Identify admin/coach pages that lack usePermission checks
  - [ ] Check if Machine Management UI (new in Sprint 6) uses usePermission

- [ ] Task 3: API module usage audit (AC: #3)
  - [ ] For each of the 17 modules in `frontend/src/api/`, grep for imports
  - [ ] Identify unused API modules (zero imports)
  - [ ] Check error handling patterns: do API calls use toast notifications consistently?
  - [ ] Check for direct axios usage bypassing the API modules

- [ ] Task 4: Produce architecture report (AC: #1, #2, #3)
  - [ ] Save to `_bmad-output/implementation-artifacts/evaluation-reports/frontend-architecture-audit.md`
  - [ ] Flag security gaps (missing permission checks) as HIGH priority

## Dev Notes

### Known State Management

- **Zustand stores:** `shopStore.js` (at minimum), possibly others
- **Context providers:** RBACContext (documented exception), AuthContext (may exist from Sprint 1)
- **Rule:** Zustand for global state, Context only for theme/auth providers

### Known RBAC Frontend

- `usePermission` hook in `frontend/src/hooks/usePermission.js`
- `RBACContext` — provides permission data to components
- Route guards in `App.js` — role-based route protection

### Critical Constraints

- **DO NOT modify any files** — audit only
- **Security gaps are HIGH priority** — pages without permission checks
- **Check the new Machine Management UI** — was it built with proper RBAC?

### References

- [Source: project-context.md#Section 2 — React Patterns, RBAC Pattern]
- [Source: _bmad-output/ux-design-specification.md — Layout vs StudentLayout]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List
