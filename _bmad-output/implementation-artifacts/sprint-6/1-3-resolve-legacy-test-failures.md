# Story 1.3: Resolve All Legacy Test Failures

Status: ready-for-dev

## Story

As a Dev,
I want to resolve all 14 classified test suites by fixing outdated tests, fixing code regressions, and deleting stale tests with documented justification,
so that the test suite has zero pre-existing failures.

## Acceptance Criteria

1. **Given** the triage table from Story 1.2 with classifications and recommended actions
   **When** Dev resolves each suite according to its classification:
   - **Stale:** Delete test file with justification documented in triage report
   - **Regression:** Fix the underlying code so the test passes
   - **Configuration:** Fix test setup/mocks so the test runs correctly
   - **Outdated:** Update test assertions to match current correct behavior
   **Then** all 14 previously-failing suites are resolved
   **And** security-related test suites are fixed, never deleted (NFR3)
   **And** all new/modified tests follow existing patterns in `project-context.md` (NFR15)

## Tasks / Subtasks

- [ ] Task 1: Load triage classifications (AC: #1)
  - [ ] Read `_bmad-output/implementation-artifacts/test-triage-report.md` from Story 1.2
  - [ ] Get the classification and recommended action for each of the 14 suites
  - [ ] Sort by action type for efficient batch processing
- [ ] Task 2: Delete stale tests (AC: #1)
  - [ ] For each suite classified as "stale":
    - [ ] Verify the tested code truly no longer exists
    - [ ] Delete the test file
    - [ ] Document deletion in triage report with justification
  - [ ] NEVER delete `security-rbac.test.js` (NFR3)
- [ ] Task 3: Fix code regressions (AC: #1)
  - [ ] For each suite classified as "regression":
    - [ ] Read the test to understand expected behavior
    - [ ] Read the source code to understand current behavior
    - [ ] Fix the source code bug so the test passes
    - [ ] Run the specific test to verify: `cd backend && npx jest tests/<file>.test.js --verbose`
    - [ ] If the fix touches code with other tests, run those tests too
- [ ] Task 4: Fix configuration/outdated tests (AC: #1)
  - [ ] For each suite classified as "configuration" or "outdated":
    - [ ] Update mocks, setup, or assertions to match current code
    - [ ] Follow existing test patterns (Jest + mongodb-memory-server, AAA structure)
    - [ ] Run the specific test to verify passing
- [ ] Task 5: Verify all 14 resolved (AC: #1)
  - [ ] Run `cd backend && npx jest --verbose` to confirm all 14 previously-failing suites now pass
  - [ ] Update triage report with resolution status for each suite

## Dev Notes

### Critical Constraints

- **Process in priority order:** security tests first, then regressions (real bugs), then config/outdated, then stale deletions
- **`security-rbac.test.js` is PROTECTED** — fix only, never delete (NFR3)
- **Test maintenance rules apply** — when modifying source code, update corresponding tests (project-context.md Section 9)
- **Follow existing patterns** — Jest + mongodb-memory-server, `jest.clearAllMocks()` in beforeEach, AAA structure (NFR15)
- **Run affected tests after each fix** — don't batch all fixes then test at the end

### Architecture & Patterns

- Backend module system: CommonJS (`require`/`module.exports`)
- Error response format: `{ success: false, message: 'Error description', error: error.message }`
- Mongoose model pattern: `mongoose.models.ModelName || mongoose.model('ModelName', schema)`
- Mock pattern: `jest.mock('../../path', () => ({ method: jest.fn() }))`

### References

- [Source: project-context.md#Section 9 — Test Maintenance Rules]
- [Source: _bmad-output/project-planning-artifacts/prd.md#FR2, FR3, FR4]
- [Source: _bmad-output/project-planning-artifacts/prd.md#NFR3, NFR15]
- [Source: _bmad-output/implementation-artifacts/1-2-triage-classify-failing-test-suites.md — prerequisite]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List
