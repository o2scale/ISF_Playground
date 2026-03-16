# Story 6.8: Jest Config & CI Health

Status: ready-for-dev

## Story

As a Dev,
I want to fix the Jest `forceExit: true` configuration that masks resource leaks and investigate open handle warnings,
so that the test suite exits cleanly without force-killing worker processes.

## Acceptance Criteria

1. **Given** `jest.config.js` has `forceExit: true` which masks open database connections, timers, or other resource leaks
   **When** Dev removes `forceExit: true` and investigates the open handle warnings
   **Then** the test suite exits cleanly without forceExit
   **And** any open handles are properly closed (MongoDB connections, timers, intervals)

2. **Given** worker force-exit warnings appear on every test run
   **When** Dev runs `npx jest --detectOpenHandles`
   **Then** all open handles are identified and fixed
   **And** the test suite completes and exits within 120 seconds without force

## Tasks / Subtasks

- [ ] Task 1: Identify open handles (AC: #1)
  - [ ] Run `cd backend && npx jest --detectOpenHandles --verbose` to identify what's keeping the process alive
  - [ ] Common culprits: unclosed MongoDB connections, setTimeout/setInterval, unclosed Redis connections
  - [ ] Document all open handles found

- [ ] Task 2: Fix open handles (AC: #2)
  - [ ] For each open handle:
    - MongoDB connections: ensure `mongoose.disconnect()` in afterAll
    - Timers: ensure `clearTimeout`/`clearInterval` in afterAll or afterEach
    - Redis: ensure `redis.quit()` in afterAll
    - Server instances: ensure `server.close()` in afterAll
  - [ ] Add global setup/teardown if needed (`jest.setup.js`)

- [ ] Task 3: Remove forceExit (AC: #1)
  - [ ] Edit `backend/jest.config.js` (or `package.json` jest config)
  - [ ] Remove `forceExit: true`
  - [ ] Run `cd backend && npx jest --verbose`
  - [ ] Verify clean exit (exit code 0, no force-exit warnings)

- [ ] Task 4: Verify timing (AC: #2)
  - [ ] Run full suite and record execution time
  - [ ] Must complete within 120 seconds (NFR5)
  - [ ] No hanging processes after test completion

## Dev Notes

### Common Open Handle Patterns in Node.js/Jest

```javascript
// PROBLEM: MongoDB connection stays open
afterAll(async () => {
  await mongoose.disconnect(); // ADD THIS
  await mongoServer.stop();    // AND THIS
});

// PROBLEM: Timer keeps process alive
afterAll(() => {
  clearInterval(pollTimer); // ADD THIS
});
```

### Critical Constraints

- **Fix handles, don't just suppress warnings** — the goal is clean resource management
- **If a handle can't be fixed easily, document it** — don't spend hours on edge cases
- **Suite must still complete < 120 seconds** — fixing handles shouldn't slow tests
- **If removing forceExit causes hanging, add --forceExit back and document why** — pragmatic approach

### References

- [Source: sprint-6-evaluation-summary.md#H8]
- [Source: qa-evaluation-report.md — Jest configuration analysis]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List
