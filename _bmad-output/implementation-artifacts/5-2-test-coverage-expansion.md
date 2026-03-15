# Story 5.2: Test Coverage Expansion

Status: ready-for-dev

## Story

As a Dev,
I want to add backend tests for controllers currently at 0% coverage, prioritizing controllers with the most endpoints,
so that the test safety net covers more of the codebase and a measurable coverage baseline is established.

## Acceptance Criteria

1. **Given** the test suite is clean (Epic 1 complete) and controller-to-model dependencies are documented (Epic 4)
   **When** Dev identifies controllers with 0% test coverage by cross-referencing `backend/controllers/` against `backend/tests/`
   **Then** a prioritized list is produced ranking untested controllers by number of endpoints
2. **When** Dev writes tests for at least 5 previously untested controllers
   **Then** each new test file follows existing patterns: Jest + mongodb-memory-server, AAA structure, `jest.clearAllMocks()` in beforeEach (NFR15, NFR16)
   **And** each test file covers at minimum: one success path and one error/validation path per endpoint tested
   **And** new tests pass on first run
3. **When** Dev runs `npx jest --coverage`
   **Then** overall coverage percentage has increased from the baseline established in Story 1.1
   **And** the final coverage percentage is documented with a comparison to the Story 1.1 baseline (target: trending toward 70%)

## Tasks / Subtasks

- [ ] Task 1: Identify untested controllers (AC: #1)
  - [ ] List all controllers in `backend/controllers/` (including nested `lms/`)
  - [ ] Cross-reference with `backend/tests/` to find controllers with zero test files
  - [ ] Count endpoints per untested controller (read route files)
  - [ ] Rank by endpoint count (most endpoints = highest priority)
  - [ ] Select top 5+ for test creation
- [ ] Task 2: Write tests for priority controllers (AC: #2)
  - [ ] For each selected controller, create test file in appropriate directory:
    - `backend/tests/controllers/<controllerName>.test.js` for standard controllers
    - `backend/tests/` for route-level tests
  - [ ] Follow existing test patterns (reference: `purchaseRequestController.test.js`, `userController.test.js`)
  - [ ] Minimum coverage per controller: 1 success path + 1 error path per endpoint
  - [ ] Use `mongodb-memory-server` for DB isolation
  - [ ] Use `jest.clearAllMocks()` in `beforeEach`
  - [ ] Mock external services (S3, Redis) as needed
- [ ] Task 3: Verify all new tests pass (AC: #2)
  - [ ] Run each new test file individually: `cd backend && npx jest tests/<file>.test.js --verbose`
  - [ ] Fix any failing tests before proceeding
  - [ ] All tests must pass on first run
- [ ] Task 4: Measure and document coverage improvement (AC: #3)
  - [ ] Run `cd backend && npx jest --coverage`
  - [ ] Compare against Story 1.1 baseline
  - [ ] Document: before coverage, after coverage, delta, target (70%)
  - [ ] Create coverage improvement report

## Dev Notes

### Controllers Likely Needing Tests

Based on `backend/tests/` inventory, these controllers probably have NO tests:
- `orderController.js` — handles shop orders
- `cartController.js` — shopping cart
- `shopController.js` — product catalog
- `frController.js` — facial recognition
- `medicalCheckInsController.js` — health check-ins
- `notificationController.js` — notifications
- `taskController.js` — task management
- `scheduleController.js` — scheduling
- LMS controllers (12+ controllers in `lms/` subdirectories)

**Note:** Verify against actual test files — some may have tests under different naming conventions.

### Test Pattern Reference

```javascript
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

describe('ControllerName', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should do something successfully', async () => {
    // Arrange
    // Act
    // Assert
  });

  it('should handle error case', async () => {
    // Arrange
    // Act
    // Assert
  });
});
```

### Critical Constraints

- **Minimum 5 controllers** — more is better but 5 is the floor
- **Tests must pass on first run** — do not commit failing tests
- **Follow existing patterns** (NFR15) — reference purchaseRequestController.test.js (46 tests)
- **Coverage must increase** — if it doesn't, add more tests
- **Mock external services** — S3, Redis, etc. Do NOT make real external calls in tests

### References

- [Source: project-context.md#Section 9 — Test Maintenance Rules]
- [Source: _bmad-output/project-planning-artifacts/prd.md#FR32, FR33, NFR15, NFR16]
- [Source: _bmad-output/implementation-artifacts/1-1-baseline-coverage-measurement.md — baseline]
- [Source: _bmad-output/implementation-artifacts/4-3-controller-model-dependency-map-findings.md — controller inventory]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List
