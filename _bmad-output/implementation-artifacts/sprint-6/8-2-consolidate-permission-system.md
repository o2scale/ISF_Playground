# Story 8.2: Consolidate Permission System

Status: ready-for-dev

## Story

As a Dev,
I want to consolidate the dual permission systems (usePermission vs useRBAC) into a single working system and fix the broken destructuring in 3 key pages,
so that permission checks are reliable and consistent across the frontend.

## Acceptance Criteria

1. **Given** `usePermission` reads empty localStorage and `useRBAC` fetches from API, producing different results
   **When** Dev consolidates to a single permission source (useRBAC preferred as it uses real API data)
   **Then** a single permission hook is used consistently across all components
   **And** the deprecated hook is marked with `@deprecated` or removed

2. **Given** 3 pages (`usermanagement.js`, `balagruhamanagement.js`, `Layout.js`) destructure `{canCreate, canRead}` from `usePermission()` but the hook only returns `{can}`
   **When** Dev fixes the destructuring to match the actual hook API
   **Then** permission variables (`canCreate`, `canRead`, `canUpdate`, `canDelete`) resolve to correct boolean values
   **And** UI elements are properly hidden/shown based on permissions

3. **Given** duplicate `usePermission` hook exists at two paths
   **When** Dev consolidates to a single file and updates all imports
   **Then** only one permission hook file exists
   **And** all imports point to the canonical location

## Tasks / Subtasks

- [ ] Task 1: Analyze both permission systems (AC: #1)
  - [ ] Read `usePermission` hook — understand what it returns, where it reads from
  - [ ] Read `useRBAC` hook — understand what it returns, where it fetches from
  - [ ] Determine which provides accurate permission data (likely useRBAC with API)
  - [ ] Document the migration plan: which to keep, which to deprecate

- [ ] Task 2: Fix broken destructuring (AC: #2)
  - [ ] Fix `usermanagement.js` — align destructuring with actual hook return shape
  - [ ] Fix `balagruhamanagement.js` — same
  - [ ] Fix `Layout.js` — same
  - [ ] Search for other components with same broken pattern: `grep -rn "canCreate\|canRead\|canUpdate\|canDelete" frontend/src/`

- [ ] Task 3: Consolidate to single hook (AC: #1, #3)
  - [ ] Choose canonical hook (useRBAC or enhanced usePermission)
  - [ ] Update all imports to use the canonical hook
  - [ ] Remove or deprecate the other hook
  - [ ] Remove duplicate hook file at second path

- [ ] Task 4: Verify (AC: #1, #2, #3)
  - [ ] Test permission-gated UI elements show/hide correctly
  - [ ] Run frontend tests
  - [ ] Verify with admin, coach, student roles

## Dev Notes

### Current State (from FC2, FC3, FM9)

- **usePermission** — reads from localStorage, returns `{can}` function. Used in some components.
- **useRBAC** — fetches from API, returns richer permission data. Used in other components.
- **Broken destructuring** — 3 pages expect `{canCreate, canRead}` but get `{can}` → all permission vars are `undefined`
- **Duplicate hook** — usePermission exists at 2 different file paths

### Critical Constraints

- **Pick ONE system and commit** — don't try to make both work
- **Fix the destructuring FIRST** — this is causing undefined permission vars right now
- **Test with real permissions** — login as coach, verify coach-only UI shows, admin-only UI hidden

### References

- [Source: frontend-evaluation-summary.md#FC2, FC3, FM9]
- [Source: frontend-architecture-audit.md — permission system analysis]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List
