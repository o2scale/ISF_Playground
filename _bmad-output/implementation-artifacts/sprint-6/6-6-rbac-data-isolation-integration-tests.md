# Story 6.6: RBAC Data Isolation Integration Tests

Status: ready-for-dev

## Story

As a Dev,
I want to write integration tests that verify actual data isolation across Balagruhas (not just middleware wiring),
so that we have proof that a coach at Balagruha A truly cannot see Balagruha B's data at the database query level.

## Acceptance Criteria

1. **Given** the existing 112 RBAC tests verify `getScopeFilter()` returns correct filter objects but don't verify controllers actually apply those filters to DB queries
   **When** Dev writes integration tests that create data across multiple Balagruhas and verify query isolation
   **Then** tests prove: Coach A querying students returns ONLY Balagruha A students, zero Balagruha B students
   **And** tests cover at least 5 high-risk controllers (medical, tasks, schedules, purchase requests, LMS assignments)

2. **Given** integration tests are written
   **When** Dev runs the full test suite
   **Then** all new tests pass AND all existing tests pass

## Tasks / Subtasks

- [ ] Task 1: Design test scenarios (AC: #1)
  - [ ] Create test setup: 2 Balagruhas (A, B), 1 coach per Balagruha, 2 students per Balagruha, 1 admin
  - [ ] Seed data: medical records, tasks, schedules, purchase requests, LMS assignments for BOTH Balagruhas
  - [ ] Test pattern: authenticate as Coach A → query endpoint → assert ONLY Balagruha A data returned

- [ ] Task 2: Write integration tests (AC: #1)
  - [ ] Create `backend/tests/integration/rbac-data-isolation.test.js`
  - [ ] Test medicalCheckInsController: Coach A sees only Balagruha A check-ins
  - [ ] Test taskController: Coach A sees only Balagruha A tasks
  - [ ] Test scheduleController: Coach A sees only Balagruha A schedules
  - [ ] Test purchaseRequestController: Coach A sees only Balagruha A requests
  - [ ] Test LMS: Coach A sees only assignments for Balagruha A students
  - [ ] Test admin: Admin sees ALL data across both Balagruhas
  - [ ] Test student: Student sees ONLY own data

- [ ] Task 3: Verify (AC: #2)
  - [ ] Run `cd backend && npx jest --verbose`
  - [ ] Ensure zero regressions

## Dev Notes

### Test Architecture

These are TRUE integration tests — they hit real controllers with real MongoDB (via memory-server), not just unit-testing the middleware. The flow is:
1. Seed 2 Balagruhas with distinct data
2. Simulate authenticated request with Coach A's JWT context
3. Call actual controller method
4. Assert response contains ONLY Balagruha A data
5. Repeat with Coach B — assert ONLY Balagruha B data

### Critical Constraints

- **Must use mongodb-memory-server** — real DB queries, not mocks
- **Must test actual controller methods** — not just getScopeFilter()
- **Must verify absence** — assert Balagruha B records are NOT in Coach A's results
- **Cover the 5 highest-risk controllers** — medical, tasks, schedules, purchase requests, LMS

### References

- [Source: sprint-6-evaluation-summary.md#H3]
- [Source: qa-evaluation-report.md — RBAC test gap analysis]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List
