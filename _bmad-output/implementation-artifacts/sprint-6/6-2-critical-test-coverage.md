# Story 6.2: Critical Test Coverage

Status: ready-for-dev

## Story

As a Dev,
I want to write tests for the three most critical untested code paths (FR controller, medical records, coin service),
so that the primary student auth, health data, and financial logic have test coverage.

## Acceptance Criteria

1. **Given** `frController.js` handles biometric data (face embeddings) with zero test coverage
   **When** Dev writes integration tests for FR register, recognize, and delete flows
   **Then** frController test file exists with tests covering success and error paths for each endpoint

2. **Given** `medicalRecordController.js` handles PHI-equivalent data with zero test coverage
   **When** Dev writes controller tests for CRUD operations
   **Then** medicalRecordController test file exists with tests covering create, read, update operations and RBAC scope filtering

3. **Given** coin service (`backend/services/coin.js`) has 894 lines at 2.71% coverage handling earn, spend, and refund logic
   **When** Dev writes integration tests for coin earn, spend, and refund paths
   **Then** coin service test file exists with tests covering: coin earning (quiz pass, grading), coin spending (shop checkout), coin refund (order cancellation), and edge cases (insufficient balance, concurrent transactions)

4. **Given** all new tests are written
   **When** Dev runs `npx jest --verbose`
   **Then** all new tests pass AND all existing 711 tests continue to pass

## Tasks / Subtasks

- [ ] Task 1: FR Controller tests (AC: #1)
  - [ ] Create `backend/tests/controllers/frController.test.js`
  - [ ] Test face registration (success, no face detected, multiple faces, invalid image)
  - [ ] Test face recognition (success, unknown face, low confidence)
  - [ ] Test embedding deletion/management
  - [ ] Mock @vladmandic/human for unit testing
  - [ ] Use mongodb-memory-server for DB isolation

- [ ] Task 2: Medical Records Controller tests (AC: #2)
  - [ ] Create `backend/tests/controllers/medicalRecordController.test.js`
  - [ ] Test CRUD operations (create, read, update medical records)
  - [ ] Test RBAC scope filtering (coach sees only their balagruha's records)
  - [ ] Test validation (required fields, data format)

- [ ] Task 3: Coin Service tests (AC: #3)
  - [ ] Create `backend/tests/services/coin.test.js`
  - [ ] Test coin earning paths: quiz completion award, grading award, manual award
  - [ ] Test coin spending: checkout deduction, balance check, insufficient funds rejection
  - [ ] Test coin refund: order cancellation refund, atomic transaction integrity
  - [ ] Test edge cases: concurrent earn/spend, zero balance operations

- [ ] Task 4: Verify full suite (AC: #4)
  - [ ] Run `cd backend && npx jest --verbose`
  - [ ] Verify zero regressions in existing 711 tests
  - [ ] Record new coverage percentage

## Dev Notes

### Test Patterns

- Follow existing patterns: Jest + mongodb-memory-server, AAA structure, `jest.clearAllMocks()` in beforeEach
- Reference: `purchaseRequestController.test.js` (46 tests), `userController.test.js` (25 tests)
- Mock external services: @vladmandic/human (FR), S3 (medical file uploads)
- Use MongoDB sessions for coin transaction tests

### Critical Constraints

- **FR tests must mock @vladmandic/human** — don't load actual ML models in tests
- **Coin tests must verify atomic transactions** — use MongoDB sessions
- **Medical tests must verify RBAC scope** — create data across balagruhas, verify isolation
- **All new tests must pass on first run**

### References

- [Source: sprint-6-evaluation-summary.md#C2, C3, C4]
- [Source: qa-evaluation-report.md — coverage gap analysis]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List
