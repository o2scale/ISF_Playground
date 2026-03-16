# Story 6.4: Auth Route Refactoring

Status: ready-for-dev

## Story

As a Dev,
I want to extract the inline controller logic from `routes/auth.js` (486 lines) into a dedicated `authController.js`,
so that the authentication code follows the project's routes→controllers→services layering pattern.

## Acceptance Criteria

1. **Given** `backend/routes/auth.js` is a 486-line god route containing inline controllers, direct model queries, JWT signing, and bcrypt operations
   **When** Dev extracts the logic into `backend/controllers/authController.js`
   **Then** `routes/auth.js` contains only route definitions with middleware and controller method references
   **And** `authController.js` contains all authentication business logic
   **And** all auth endpoints (login, register, password reset, FR login, PIN login) continue to work

2. **Given** the refactoring is complete
   **When** Dev runs all tests
   **Then** all existing tests pass with zero regressions
   **And** existing E2E login tests (if runnable) pass

## Tasks / Subtasks

- [ ] Task 1: Analyze auth.js (AC: #1)
  - [ ] Read `backend/routes/auth.js` completely
  - [ ] Identify all route handlers and their inline logic
  - [ ] Map each handler to a controller method name

- [ ] Task 2: Create authController.js (AC: #1)
  - [ ] Create `backend/controllers/authController.js`
  - [ ] Extract each inline handler into a named controller method
  - [ ] Maintain exact same request/response behavior
  - [ ] Keep error handling patterns consistent with other controllers

- [ ] Task 3: Refactor routes/auth.js (AC: #1)
  - [ ] Replace inline handlers with `authController.methodName` references
  - [ ] Keep middleware chain (authenticate, checkPermission, validation) in routes
  - [ ] Result: routes file should be ~50-80 lines (route definitions only)

- [ ] Task 4: Verify (AC: #2)
  - [ ] Run `cd backend && npx jest --verbose` — zero regressions
  - [ ] Verify login, register, password reset endpoints work
  - [ ] Verify FR and PIN login endpoints work

## Dev Notes

### Expected auth.js Endpoints

Likely includes: POST /login, POST /register, POST /forgot-password, POST /reset-password, POST /fr-login, POST /pin-login, GET /me, POST /logout

### Refactoring Pattern

```javascript
// BEFORE (routes/auth.js - god route)
router.post('/login', async (req, res) => {
  // 50+ lines of inline logic
});

// AFTER (routes/auth.js - clean)
const authController = require('../controllers/authController');
router.post('/login', authController.login);

// AFTER (controllers/authController.js)
exports.login = async (req, res) => {
  // Same logic, properly located
};
```

### Critical Constraints

- **Exact same behavior** — this is a refactor, not a rewrite
- **Do NOT change any auth logic** — just move it
- **Do NOT change middleware order** — security-critical
- **Run tests after** — auth is the most critical path

### References

- [Source: sprint-6-evaluation-summary.md#H4]
- [Source: architect-evaluation-report.md — god route analysis]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List
