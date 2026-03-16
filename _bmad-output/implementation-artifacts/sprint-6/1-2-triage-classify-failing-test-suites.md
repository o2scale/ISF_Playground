# Story 1.2: Triage & Classify All 14 Failing Test Suites

Status: complete

## Story

As a Dev,
I want to identify and classify each of the 14 legacy failing test suites as stale, regression, or configuration issue,
so that I know the correct resolution action for each suite.

## Acceptance Criteria

1. **Given** 14 test suites have pre-existing failures
   **When** Dev examines each failing suite (reads test, checks if tested code exists, runs in isolation, checks git blame)
   **Then** each suite is classified as one of: stale (code removed/refactored), regression (real bug), or configuration (setup issue)
   **And** a triage table is produced listing each suite, its classification, and the recommended action (fix test / fix code / delete)
   **And** security-related suites (e.g., `security-rbac.test.js`) are marked as "fix only — never delete" per NFR3

## Tasks / Subtasks

- [x] Task 1: Load baseline from Story 1.1 (AC: #1)
  - [x] Read `_bmad-output/implementation-artifacts/test-triage-report.md` from Story 1.1
  - [x] Get the list of 12 failing suites with file paths (actual count is 12, not 14)
- [x] Task 2: Examine each failing suite (AC: #1)
  - [x] For each of the 12 failing suites:
    - [x] Read the test file to understand what it tests
    - [x] Check if the tested code (controller/model/route) still exists
    - [x] Run the suite in isolation: `cd backend && npx jest tests/<file>.test.js --verbose`
    - [x] Check git blame for when the test last passed
    - [x] Classify as: stale / regression / configuration / outdated
- [x] Task 3: Produce triage table (AC: #1)
  - [x] Update `test-triage-report.md` with classification table:
    | Suite | Classification | Reason | Action | Priority |
  - [x] Mark `security-rbac.test.js` as "fix only — never delete" (NFR3)
  - [x] Recommend action for each: fix test / fix code / delete with justification
- [x] Task 4: Identify patterns (AC: #1)
  - [x] Group failures by common causes (e.g., missing mocks, changed APIs, deleted models)
  - [x] Note any shared infrastructure issues that affect multiple suites
  - [x] Document patterns to guide Story 1.3 resolution work

## Dev Notes

### Classification Definitions

- **Stale:** The code being tested was removed or completely refactored — the test targets something that no longer exists. Action: DELETE with documented justification.
- **Regression:** The test correctly identifies broken behavior — the code has a real bug. Action: FIX THE CODE.
- **Configuration:** The test itself is correct but the test setup/mocks/infrastructure is broken. Action: FIX TEST SETUP.
- **Outdated:** The code was intentionally changed but the test wasn't updated to match. Action: UPDATE TEST ASSERTIONS.

### Critical Constraints

- **DO NOT fix or modify any test files** — this is classification only
- **DO NOT modify any source code** — fixes are Story 1.3
- **`security-rbac.test.js` is PROTECTED** — always classify as "fix only" regardless of failure type (NFR3)
- **Run each suite in isolation** to distinguish suite-specific failures from cross-contamination

### Architecture & Patterns

- Test framework: Jest 30.0.5, mongodb-memory-server 10.2.0
- Test location: `backend/tests/` with subdirectories
- Run single suite: `cd backend && npx jest tests/<file>.test.js --verbose`
- Git blame: `git log --oneline tests/<file>.test.js` to find last changes

### References

- [Source: project-context.md#Section 9 — Test Maintenance Rules]
- [Source: _bmad-output/project-planning-artifacts/prd.md#FR1]
- [Source: _bmad-output/project-planning-artifacts/prd.md#NFR3]
- [Source: _bmad-output/implementation-artifacts/1-1-baseline-coverage-measurement.md — prerequisite]

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6 (1M context) as Quinn (QA Engineer)

### Debug Log References
- All 12 suites run in isolation with `--verbose --no-coverage`
- Git log checked for all 12 test files and 2 breaking source files
- Source code existence verified for all referenced modules

### Completion Notes List
1. Actual failing suite count is 12 (not 14 as story predicted). No suites need deletion — all target existing code.
2. All 12 suites classified: 9 Outdated, 2 Configuration, 1 mixed Outdated+Configuration.
3. Zero Stale suites (no code was deleted). Zero Regression suites (no real bugs found in source).
4. `security-rbac.test.js` marked as NFR3 protected (fix only, never delete).
5. 4 distinct failure patterns identified with single-fix strategies for each.
6. Two breaking commits identified: `b2ae8b96` (category enum) and `d88419d1`/`d2c8730e` (getScopeFilter).
7. Running suites in isolation vs full-suite run produces slightly different test counts (70 vs 68 failures) due to Jest discovery differences; full-suite counts from Story 1.1 remain canonical.
8. No test files or source code were modified (analysis only, per constraints).

### Change Log
- Updated `_bmad-output/implementation-artifacts/test-triage-report.md` with full Story 1.2 classification
- Updated `_bmad-output/implementation-artifacts/1-2-triage-classify-failing-test-suites.md` status to complete

### File List
- `_bmad-output/implementation-artifacts/test-triage-report.md` (modified — added classification table, pattern analysis, fix priority, git history, source verification)
- `_bmad-output/implementation-artifacts/1-2-triage-classify-failing-test-suites.md` (modified — tasks checked off, status updated, agent record filled)
