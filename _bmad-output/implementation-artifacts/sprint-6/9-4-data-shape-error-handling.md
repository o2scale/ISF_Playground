# Story 9.4: Data Shape & Error Handling Consistency

Status: ready-for-dev

## Story

As a Dev,
I want to verify that the data shapes returned by the top 5 most complex APIs match what frontend components expect, and that error handling is consistent across the stack,
so that no frontend component crashes from unexpected response shapes or mishandled errors.

## Acceptance Criteria

1. **Given** the 5 most complex API interactions are: user CRUD, course management, shop/orders, purchase requests, and tasks
   **When** Dev reads each backend controller's response shape and the frontend component that consumes it
   **Then** for each API: backend response fields are documented alongside frontend expected fields
   **And** mismatches are flagged (frontend accessing fields backend doesn't send, or field naming differences)

2. **Given** the backend standard response format is `{ success: boolean, data: any, message: string }`
   **When** Dev checks the 5 API interactions
   **Then** all backend responses follow the standard format (or deviations are documented)
   **And** frontend error handling checks the correct fields (`response.data.message` vs `error.message` vs `error.response.data.error`)

3. **Given** the centralized API client has error interceptors
   **When** Dev checks 5 critical error paths
   **Then** backend error shapes are consistent with what the frontend interceptor expects
   **And** user-facing error messages are displayed (toast notifications, not silent failures)
   **And** no error path results in a blank screen or unhandled exception

## Tasks / Subtasks

- [ ] Task 1: User CRUD data shape (AC: #1)
  - [ ] Backend: read userController response for getAllUsers, createUser, updateUser, deleteUser
  - [ ] Frontend: read the admin user management page — what fields does it destructure from the response?
  - [ ] Flag mismatches

- [ ] Task 2: Course/LMS data shape (AC: #1)
  - [ ] Backend: read LMS controller responses (course list, course detail, student progress)
  - [ ] Frontend: read the relevant LMS pages — what fields do they expect?
  - [ ] Flag mismatches

- [ ] Task 3: Shop/Orders data shape (AC: #1)
  - [ ] Backend: read shopController responses (product list, cart, checkout, order history)
  - [ ] Frontend: read shop pages and Zustand store — what fields do they expect?
  - [ ] Flag mismatches

- [ ] Task 4: Purchase requests data shape (AC: #1)
  - [ ] Backend: read purchaseRequestController responses
  - [ ] Frontend: read PM dashboard and coach request pages — what fields do they expect?
  - [ ] Flag mismatches

- [ ] Task 5: Tasks data shape (AC: #1)
  - [ ] Backend: read taskController responses
  - [ ] Frontend: read TaskManagement page (4,150 lines) — what fields does it destructure?
  - [ ] Flag mismatches

- [ ] Task 6: Error handling consistency (AC: #2, #3)
  - [ ] For each of the 5 APIs, trace: backend error → response shape → frontend catch → user feedback
  - [ ] Check: does frontend check `error.response.data.message` or `error.message` or something else?
  - [ ] Check: does each error path show a toast or UI message (not just console.log)?
  - [ ] Flag silent error paths

- [ ] Task 7: Produce report (AC: #1, #2, #3)
  - [ ] Save to `_bmad-output/implementation-artifacts/evaluation-reports/integration-data-shapes.md`
  - [ ] Include tables: API → backend shape → frontend expectation → match?

## Dev Notes

### DO NOT modify any files — discovery only
### Standard response format (from project-context.md)
```json
{ "success": true, "data": {...}, "message": "..." }
```
### Focus on the TOP 5 by complexity — don't audit all 40+ endpoints

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List
