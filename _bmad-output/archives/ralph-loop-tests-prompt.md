# Ralph Loop Prompt: Test Coverage + Quick Fixes

## Mission
Build automated test coverage for critical untested code and execute quick fixes. Track progress in `_bmad-output/ralph-loop-tests-progress.md`.

## Instructions

1. Read `_bmad-output/ralph-loop-tests-progress.md` for current progress
2. Execute the NEXT unchecked task
3. After completing each task, check it off in the progress file
4. Run tests after writing them: `cd backend && npx jest --testPathPattern="<test-file>" --verbose`
5. If tests fail, fix them in the SAME iteration
6. Commit after each major milestone (test suite passing, quick fix complete)
7. When ALL tasks are checked off, output: <promise>ALL TESTS AND FIXES COMPLETE</promise>

## Task Order

### Phase 1: Backend Controller Tests (Priority)
Write Jest tests using the existing test infrastructure (backend/tests/setup.js has mockRequest, mockResponse, generateTestUser helpers, MongoDB Memory Server).

1. `backend/tests/controllers/purchaseRequestController.test.js` — Test the state machine transitions (pending→ordered→delivered_store→delivered_balagruha), RBAC access, create/approve/reject/complete flows. This is the most critical controller (51KB).

2. `backend/tests/controllers/userController.test.js` — Test user CRUD, role assignment, balagruha assignment, profile operations. Second largest controller (37KB).

3. `backend/tests/controllers/inventoryController.test.js` — Test stock updates, adjustment validation, no-negative-stock rule. Third largest (29KB).

### Phase 2: Playwright E2E Setup
4. Set up Playwright config (`frontend/playwright.config.js`) — Playwright is already in package.json
5. Write first E2E test: `frontend/e2e/login.spec.js` — Test admin PIN login flow
6. Write second E2E: `frontend/e2e/purchase-lifecycle.spec.js` — Create request → approve → complete

### Phase 3: Quick Fixes
7. Split `frontend/src/api.js` (2,198 lines) into feature modules under `frontend/src/api/` — maintain backward compatibility with re-exports from `frontend/src/api.js`
8. Add global error boundary component (`frontend/src/components/ErrorBoundary.jsx`)

## Rules
- Read existing test files first to match patterns (backend/tests/setup.js, backend/tests/wtf/unit/)
- Use the jcodemunch MCP (repo: "local/ISF_Playground-c46a7683") for code lookups
- DO NOT modify application logic — only add tests and the specified quick fixes
- For api.js split: create new files, update imports, keep old api.js as re-export barrel
- Run `cd backend && npx jest --verbose 2>&1 | tail -30` to verify tests pass
- Commit messages should follow: "test: ..." or "refactor: ..."
