# Story 8.4: Frontend Console.log Cleanup

Status: ready-for-dev

## Story

As a Dev,
I want to remove all 319 console.log statements from 60 frontend production code files,
so that the browser console is clean, performance improves, and no sensitive data leaks to client-side logs.

## Acceptance Criteria

1. **Given** 319 console.log statements exist across 60 frontend source files including debug artifacts ("usdsds", "SSSSSSSSSSSSSS") and security-sensitive permission logs in RBACContext
   **When** Dev removes all console.log/warn/error from production components and pages
   **Then** `grep -rn "console.log" frontend/src/components/ frontend/src/pages/ frontend/src/hooks/ frontend/src/store/ --include="*.js" --include="*.jsx"` returns zero results
   **And** RBACContext specifically has no permission data logging
   **And** API error handlers use toast notifications instead of console.log

2. **Given** console.logs are removed
   **When** Dev runs existing frontend tests
   **Then** all previously passing tests still pass

## Tasks / Subtasks

- [ ] Task 1: Remove console.logs from components and pages (AC: #1)
  - [ ] Process all 60 files with console.log statements
  - [ ] Remove debug artifacts ("usdsds", "SSSSSSSSSSSSSS", etc.)
  - [ ] Remove RBACContext permission logging (SECURITY)
  - [ ] Replace legitimate error logging with toast notifications where appropriate
  - [ ] Keep console.error in ErrorBoundary (that's appropriate for error boundaries)

- [ ] Task 2: Verify (AC: #2)
  - [ ] Run frontend tests
  - [ ] Grep verify: zero console.logs in production code paths

## Dev Notes

### Priority Files (security-sensitive)

- **RBACContext** — logs permission data to console. Remove immediately.
- **Auth-related files** — may log tokens or user data. Remove.

### Critical Constraints

- **DO NOT remove from test files** — `__tests__/` can keep console.log
- **Replace error logging with toast** where user-facing error feedback is needed
- **Keep console.error in ErrorBoundary** — that's the appropriate error reporting channel
- **Batch by directory** for efficiency — components/, pages/, hooks/, store/ in order

### References

- [Source: frontend-evaluation-summary.md#FH1]
- [Source: frontend-code-quality.md — full file list]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List
