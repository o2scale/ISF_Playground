# Story 8.5: Fix Failing Frontend Tests

Status: ready-for-dev

## Story

As a Dev,
I want to fix the 11 failing frontend tests across 3 suites to establish a green baseline,
so that the frontend test suite is a reliable signal before adding new tests.

## Acceptance Criteria

1. **Given** 11 frontend tests are failing across 3 suites (68.6% pass rate)
   **When** Dev triages and fixes each failing test (same approach as backend Story 1.2/1.3)
   **Then** all frontend tests pass (100% pass rate)
   **And** no tests are deleted without documented justification

2. **Given** tests are fixed
   **When** Dev runs the full frontend test suite
   **Then** zero failures and clean exit

## Tasks / Subtasks

- [ ] Task 1: Identify failing tests (AC: #1)
  - [ ] Run `cd frontend && npx react-scripts test --watchAll=false --verbose 2>&1`
  - [ ] List all 11 failing tests with their suite names and error messages
  - [ ] Classify each: stale (tests code that changed), configuration, or regression

- [ ] Task 2: Fix each failing test (AC: #1)
  - [ ] For stale tests: update assertions to match current component behavior
  - [ ] For configuration: fix test setup, mocks, or imports
  - [ ] For regressions: fix the component if it's actually broken
  - [ ] Document each fix

- [ ] Task 3: Verify green baseline (AC: #2)
  - [ ] Run full frontend test suite — zero failures
  - [ ] Record pass count and execution time

## Dev Notes

### Known State

- 35 total tests, 24 passing, 11 failing
- 3 failing suites (specific suites from frontend-test-baseline.md)
- React Testing Library is the framework

### Critical Constraints

- **Fix tests, don't delete them** — unless the tested component is confirmed dead code
- **Same triage approach as backend Epic 1** — classify, then resolve
- **Run after Story 8.2** — permission system changes may fix some test failures

### References

- [Source: frontend-evaluation-summary.md#FH7]
- [Source: frontend-test-baseline.md — failing test details]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List
