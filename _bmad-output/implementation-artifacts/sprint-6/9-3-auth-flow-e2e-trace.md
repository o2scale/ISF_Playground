# Story 9.3: Auth Flow End-to-End Trace

Status: ready-for-dev

## Story

As a Dev,
I want to trace all three authentication flows (email/password, facial recognition, PIN) end-to-end from frontend form to backend JWT creation to frontend token storage to subsequent authenticated API calls,
so that we verify the auth chain is complete and consistent.

## Acceptance Criteria

1. **Given** three login methods exist (email/password, FR, PIN)
   **When** Dev traces each flow end-to-end
   **Then** for each flow, a complete trace is documented: frontend component → API function called → backend route → controller method → JWT creation → response shape → frontend token storage → how token is used in subsequent calls

2. **Given** the auth flows are traced
   **When** Dev checks for consistency
   **Then** all three flows store the same user fields in the same format in localStorage/AuthContext
   **And** the JWT payload contains the fields the frontend expects (role, userId, balagruhaIds)
   **And** field names match between backend response and frontend storage (no `user.id` vs `user._id` mismatches)

3. **Given** tokens can expire
   **When** Dev checks 401 handling
   **Then** the centralized API client's response interceptor handles 401 appropriately (redirect to login or refresh)
   **And** no API module bypasses this interceptor

## Tasks / Subtasks

- [ ] Task 1: Trace email/password login (AC: #1)
  - [ ] Frontend: find the login form component → which API function does it call?
  - [ ] API module: what URL and method does it use?
  - [ ] Backend: which route handles it → which controller method?
  - [ ] Controller: how is JWT created? What payload fields?
  - [ ] Response: what shape does the backend return?
  - [ ] Frontend: how does AuthContext.login() store the data? What goes in localStorage?

- [ ] Task 2: Trace FR login (AC: #1)
  - [ ] Frontend: find the FR login component → webcam capture → which API function?
  - [ ] Backend: which route → which frController method?
  - [ ] Controller: how does recognition work → JWT creation → response shape
  - [ ] Frontend: same storage path as email/password?

- [ ] Task 3: Trace PIN login (AC: #1)
  - [ ] Frontend: find the PIN login component → which API function?
  - [ ] Backend: which route → which controller method?
  - [ ] Response shape → frontend storage

- [ ] Task 4: Check consistency across flows (AC: #2)
  - [ ] Compare: do all 3 flows return the same response shape?
  - [ ] Compare: do all 3 flows store the same fields in localStorage?
  - [ ] Compare: JWT payload fields across all 3 flows
  - [ ] Flag: `user.id` vs `user._id`, `balagruhaId` vs `balagruhaIds`, role format differences

- [ ] Task 5: Check 401 handling (AC: #3)
  - [ ] Read `frontend/src/api/client.js` — response interceptor for 401
  - [ ] Does it redirect to login? Does it attempt token refresh?
  - [ ] Are there any API modules that create their own axios instance (bypassing the interceptor)?

- [ ] Task 6: Produce report (AC: #1, #2, #3)
  - [ ] Save to `_bmad-output/implementation-artifacts/evaluation-reports/integration-auth-flow.md`
  - [ ] Include flow diagrams (text-based) for each auth method

## Dev Notes

### DO NOT modify any files — discovery only
### Key files
- Frontend: login components, `AuthContext.js`, `api/auth.js`, `api/client.js`
- Backend: `routes/auth.js`, `controllers/authController.js`, `controllers/frController.js`
- JWT: `jsonwebtoken` usage in authController

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List
