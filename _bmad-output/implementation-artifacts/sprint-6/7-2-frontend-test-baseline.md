# Story 7.2: Frontend Test Baseline

Status: ready-for-dev

## Story

As a Dev,
I want to measure the current frontend test coverage baseline and assess Playwright E2E runnability,
so that we know the starting point for frontend test improvements.

## Acceptance Criteria

1. **Given** frontend component tests exist in `frontend/src/__tests__/`
   **When** Dev runs the existing component tests
   **Then** a test results report shows: total tests, passing, failing, execution time
   **And** coverage percentages (statements, branches, functions, lines) are recorded if measurable

2. **Given** 9 Playwright E2E tests exist in `frontend/e2e/`
   **When** Dev assesses Playwright test runnability
   **Then** a report documents: whether tests can run (server dependencies), which tests exist, what user flows they cover
   **And** if runnable, test results are captured

3. **Given** test baseline is established
   **When** Dev cross-references tested components against the inventory from Story 7.1
   **Then** the percentage of components with test coverage is reported
   **And** untested high-risk components are identified (auth, shop checkout, RBAC-gated pages)

## Tasks / Subtasks

- [ ] Task 1: Run component tests (AC: #1)
  - [ ] Run `cd frontend && npx react-scripts test --watchAll=false --verbose 2>&1 | tail -30` (or equivalent)
  - [ ] If coverage flag available: `--coverage`
  - [ ] Record: test count, pass/fail, execution time, coverage
  - [ ] List which test files exist in `__tests__/`

- [ ] Task 2: Assess Playwright E2E (AC: #2)
  - [ ] List all test files in `frontend/e2e/`
  - [ ] Read test files to understand what flows they cover
  - [ ] Check if servers need to be running (frontend + backend)
  - [ ] Attempt to run if possible: `cd frontend && npx playwright test --list`
  - [ ] Document: test names, user flows covered, server dependencies

- [ ] Task 3: Coverage gap analysis (AC: #3)
  - [ ] Cross-reference `__tests__/` files against `components/` and `pages/`
  - [ ] Calculate: X test files / Y total component+page files = Z% coverage ratio
  - [ ] Identify untested high-risk components: auth flows, shop checkout, RBAC-gated admin pages, Machine Management UI
  - [ ] Prioritize: which components should get tests first?

- [ ] Task 4: Produce baseline report (AC: #1, #2, #3)
  - [ ] Save to `_bmad-output/implementation-artifacts/evaluation-reports/frontend-test-baseline.md`

## Dev Notes

### Known Frontend Test Files

- Component tests: `frontend/src/__tests__/` — approximately 10 files
- E2E tests: `frontend/e2e/` — 9 tests (5 login + 4 purchase lifecycle)
- Config: `frontend/playwright.config.js`

### Critical Constraints

- **DO NOT write any new tests** — this is measurement only
- **Playwright may not run without servers** — document this, don't try to start servers
- **React Testing Library is the framework** — `@testing-library/react`

### References

- [Source: project-context.md#Section 7 — Testing Status]
- [Source: _bmad-output/implementation-artifacts/sprint-6/7-1-component-page-inventory.md — prerequisite for AC #3]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List
