# Story 8.6: Dead Code Removal

Status: ready-for-dev

## Story

As a Dev,
I want to remove the 61 dead component files (16 application-level + 45 unused shadcn/ui primitives) from the frontend,
so that the codebase only contains actively used code and bundle size is reduced.

## Acceptance Criteria

1. **Given** 16 application-level components are dead (never imported, 1,903 lines total)
   **When** Dev verifies each is truly unused and removes them
   **Then** all 16 dead application components are removed
   **And** no page or component breaks after removal

2. **Given** 45 shadcn/ui primitive components are installed but never used (0% adoption)
   **When** Dev removes the unused shadcn/ui files
   **Then** the `components/ui/` directory contains only actively imported primitives (if any)
   **And** no component breaks after removal

3. **Given** dead code is removed
   **When** Dev runs frontend tests
   **Then** all tests still pass

## Tasks / Subtasks

- [ ] Task 1: Verify and remove dead application components (AC: #1)
  - [ ] For each of the 16 dead components from the inventory report:
    - [ ] `grep -rn "import.*ComponentName\|from.*component-path" frontend/src/` — confirm zero imports
    - [ ] Remove the file
  - [ ] Run frontend tests after each batch removal
  - [ ] Document removed files

- [ ] Task 2: Remove unused shadcn/ui components (AC: #2)
  - [ ] Check which shadcn/ui components in `components/ui/` are imported anywhere
  - [ ] Remove all unimported ui components
  - [ ] If NONE are used, consider removing the entire `components/ui/` directory

- [ ] Task 3: Verify (AC: #3)
  - [ ] Run frontend tests — zero regressions
  - [ ] Verify the app builds without errors: `cd frontend && npm run build` (if build script exists)

## Dev Notes

### Dead Component List (from Story 7.1)

The frontend-component-inventory.md has the complete list of 16 application-level and 45 shadcn/ui dead components with file paths.

### Critical Constraints

- **Verify before deleting** — grep for imports across ENTIRE `frontend/src/`
- **Check for dynamic imports** — `React.lazy(() => import(...))` may hide usage
- **Remove in batches** — test after each batch, not all at once
- **shadcn/ui may be planned** — if there's a migration plan to shadcn, keep the directory but document

### References

- [Source: frontend-evaluation-summary.md#FH4, FH8]
- [Source: frontend-component-inventory.md — dead component list]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List
