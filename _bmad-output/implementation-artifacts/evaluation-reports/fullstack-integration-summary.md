# Full-Stack Integration Summary

**Epic:** 9 -- Full-Stack Integration Audit
**Date:** 2026-03-17
**Author:** Winston (Architect Agent)
**Status:** Complete

---

## Source Reports

| Story | Report | Status |
|-------|--------|--------|
| 9.1 | [integration-api-alignment.md](integration-api-alignment.md) | Complete |
| 9.2 | [integration-rbac-consistency.md](integration-rbac-consistency.md) | Complete |
| 9.3 | [integration-auth-flow.md](integration-auth-flow.md) | Complete |
| 9.4 | integration-data-shapes.md | **NOT FOUND** -- story may still be in progress |
| 9.5 | [integration-infrastructure.md](integration-infrastructure.md) | Complete |

**Note:** Story 9.4 (Data Shape Alignment) report was not found. Findings from that story are not included below. Once that report is available, its findings should be merged into this summary.

---

## Prioritized Finding List

### CRITICAL -- Must fix before next production deploy

| # | Source | Finding | Impact | Recommended Action |
|---|--------|---------|--------|--------------------|
| C1 | 9.2 | **7 permission modules missing from seed data** (LMS Management, Purchase Management, Medical Check-in, Medical Management, Schedule Management, Daily Schedule, Course Management) | Backend returns 403 for all routes using these modules. Entire LMS admin, medical, scheduling features are inaccessible to all roles. | Add all missing modules to `setupDefaultRoles.js` with correct actions per role. Run seed script. **Fix in Epic 10.** |
| C2 | 9.2 | **4 roles missing from seed data** (medical-incharge, sports-coach, music-coach, amma) | Users with these roles fail every `authorize()` call. They cannot access any protected endpoint. | Create Role documents for all 4 roles with appropriate permissions. **Fix in Epic 10.** |
| C3 | 9.3 | **Facial Recognition login is completely broken** | Legacy `Student.faceLogin()` is a 503 stub. V2 `/api/v2/fr/recognize` does not return a JWT. Frontend calls the legacy route. Face ID login is non-functional for all students. | Wire FaceIdLogin to V2 recognize endpoint and add JWT creation to the V2 response flow. **Fix in Sprint 2 (FR epic).** |
| C4 | 9.3 | **`balagruhaIds` missing from student login response** | `authController.studentLogin()` omits `balagruhaIds`. Students logging in via userId have empty balagruhaIds in AuthContext, breaking balagruha-scoped features. | Add `balagruhaIds: user.balagruhaIds || []` to the studentLogin response object. **Fix in Epic 10.** |
| C5 | 9.2 | **`balagruha-incharge` vs `balagruha in-charge` naming split** | Frontend constants and App.js ProtectedRoute use `balagruha in-charge` (with space). Backend and User model use `balagruha-incharge` (hyphenated). Attendance route guard never matches. | Normalize to one canonical form (`balagruha-incharge`) across all files. **Fix in Epic 10.** |
| C6 | 9.5 | **WebSocket `handlePinLiked` references undefined `pinData`** | Runtime ReferenceError crash when any pin is liked while WS clients are connected. | Fix variable reference in `wtfWebSocket.js` -- use the `likeData` parameter or look up pin data. **Fix in Epic 10.** |
| C7 | 9.5 | **WebSocket `handleSubmissionReviewed` references undefined `submissionData`** | Runtime ReferenceError crash when a submission review is broadcast via WS. | Fix variable reference -- use `reviewData` parameter or look up submission. **Fix in Epic 10.** |
| C8 | 9.5 | **`useFileUpload` explicitly sets `Content-Type: multipart/form-data` without boundary** | The hook uses `api` (which defaults to JSON) and overrides with an explicit Content-Type that lacks the multipart boundary string. Multer may fail to parse the upload. | Switch to `apiWithoutContentType` and remove the explicit header, letting Axios auto-detect from FormData. **Fix in Epic 10.** |

### HIGH -- Fix soon; functional impact but workarounds exist

| # | Source | Finding | Impact | Recommended Action |
|---|--------|---------|--------|--------------------|
| H1 | 9.2 | **`/api/roles/getAllRolePermissions` has no authentication** | Any unauthenticated user can read the entire role/permission matrix. Information disclosure. | Add `authenticate` middleware to this route. **Fix in Epic 10.** |
| H2 | 9.2 | **`wtfSettings.js` passes array to `authorize()` -- always returns 403** | WTF settings routes are completely inaccessible to all users including admins. `authorize([WtfPermissions.WTF_ADMIN])` is called with wrong argument types. | Change to `authorize("WTF Management", "Update")` or equivalent two-string form. **Fix in Epic 10.** |
| H3 | 9.3 | **401 interceptor incomplete localStorage cleanup** | On token expiry, interceptor removes `"token"` and `"user"` (which was never set), but leaves `name`, `role`, `userId`, `balagruhaIds` in localStorage. Stale auth state persists after forced logout. | Update interceptor to remove all auth keys, matching `AuthContext.logout()`. **Fix in Epic 10.** |
| H4 | 9.3 | **No rate limiting on FR endpoints** | `POST /api/auth/student/facial/login` and `POST /api/v2/fr/recognize` lack rate limiting, unlike email/password login. | Add `authLimiter` or dedicated FR limiter to both routes. **Fix in Epic 10.** |
| H5 | 9.3 | **`studentPinLogin` returns different shape than `pinLogin`** | `pinLogin()` returns `response.data`; `studentPinLogin()` returns full `response`. Forces inconsistent destructuring in consuming components. | Normalize both to return `response.data`. **Fix in Epic 10.** |
| H6 | 9.5 | **WebSocket has no frontend consumer** | Entire WS infrastructure is backend-only. WTF real-time features (pin updates, submission notifications) are not functional. No frontend code connects to the WebSocket server. | Either build frontend WS client or remove/defer WS infrastructure. **Defer to Sprint 2 or later.** |
| H7 | 9.5 | **Unauthenticated WS connections not disconnected** | Auth failure sends error message but keeps connection open. Potential resource exhaustion vector. | Close WebSocket connection after authentication failure (with brief delay for error message delivery). **Fix in Epic 10.** |
| H8 | 9.5 | **Offline request queue routes have no authentication** | `POST /api/offline-requests` and `GET /api/offline-requests/:id` are completely unprotected. Any client can create or read queued requests. | Add `authenticate` middleware or restrict all routes to localhost. **Fix in Epic 10.** |
| H9 | 9.5 | **`express.json` body limit set to 100MB** | Enables large-payload DoS attacks. Standard REST endpoints should not accept 100MB JSON bodies. | Reduce to 5MB default; apply higher limits selectively where needed (e.g., FR base64 uploads). **Fix in Epic 10.** |
| H10 | 9.5 | **S3 bucket env vars missing from `.env.example`** | `AWS_S3_BUCKET_NAME_SHOP_PRODUCTS` and `AWS_S3_BUCKET_NAME_LMS_CONTENT` are not in `.env.example`. New deployments will silently have undefined bucket names. LMS content silently falls back to WTF bucket. | Add all S3 bucket vars to `.env.example`. **Fix in Epic 10.** |
| H11 | 9.2 | **Admin bypass only on frontend ProtectedRoute, not on backend** | Frontend admin bypass masks missing permissions. Admin sees LMS/medical pages but backend API calls may return 403 because the modules are not in seed data. Misleading UX. | Root cause is C1 (missing seed modules). Once seed data is fixed, this is resolved. |
| H12 | 9.1 | **Stale API references in frontend** | (From API alignment report) Frontend may call endpoints that have been moved or renamed across API versions. | Audit and update all frontend API calls to match current backend routes. **Fix in Epic 10.** |

### MEDIUM -- Should fix; maintainability or minor functional impact

| # | Source | Finding | Impact | Recommended Action |
|---|--------|---------|--------|--------------------|
| M1 | 9.2 | **Duplicate middleware: `authorize` and `checkPermission`** | Both do the same thing. Routes inconsistently use one or the other. Maintenance burden and divergence risk. | Consolidate to one middleware; migrate all routes. **Backlog.** |
| M2 | 9.2 | **`WtfPermissions.WTF_READ` referenced but not defined** | Runtime error if the WTF settings read code path executes. | Define the constant or remove the reference. **Fix in Epic 10.** |
| M3 | 9.2 | **Frontend coach/grading/assignments routes have no role guard** | Any authenticated user (including students) can navigate to coach pages. Backend APIs will reject with 403, but poor UX. | Add `requiredRoles={['coach', 'admin']}` to these routes in App.js. **Fix in Epic 10.** |
| M4 | 9.2 | **`/admin/students/:userId` has no admin role check** | Any authenticated user can view any student profile by ID. | Add admin guard to this route. **Fix in Epic 10.** |
| M5 | 9.3 | **No inactive account check in `studentLogin` backend** | `login()` checks `user.status === "inactive"` server-side but `studentLogin()` does not. Client-side check is bypassable. | Add server-side inactive check to `authController.studentLogin()`. **Fix in Epic 10.** |
| M6 | 9.3 | **No login attempt tracking for student login** | Email/password login has lockout mechanism; student login has none beyond rate limiting. Wider attack surface with flexible lookup chain. | Add failed attempt tracking to `studentLogin`. **Backlog.** |
| M7 | 9.3 | **`initializeAuth` rebuilds user differently from login** | On page reload, `email` and `status` fields are lost from AuthContext. Only `name`, `role`, `id`, `balagruhaIds` survive. | Store full user object in localStorage as JSON. **Backlog.** |
| M8 | 9.5 | **`mode: "no-cors"` set as HTTP header in axios instances** | No functional impact but sends meaningless custom header on every request. Reveals CORS misunderstanding. | Remove `mode: "no-cors"` from axios headers config. **Fix in Epic 10.** |
| M9 | 9.5 | **WTF API calls set explicit `Content-Type: multipart/form-data`** | Redundant alongside `apiWithoutContentType`. Risk of missing boundary, though Axios currently handles it. | Remove explicit Content-Type headers from WTF upload calls. **Fix in Epic 10.** |
| M10 | 9.5 | **Frontend has no client-side file size validation** | Users upload files exceeding server limits, wasting bandwidth before multer rejects. | Add pre-upload size checks using `config.MAX_FILE_SIZE` and per-context limits. **Backlog.** |
| M11 | 9.5 | **Presigned URL upload path exists but is unused** | `generateLMSContentUploadUrl()` is implemented but never called. Large LMS video uploads go through backend proxy unnecessarily. | Consider adopting presigned URLs for LMS content. **Backlog.** |
| M12 | 9.5 | **Offline request queue has no frontend integration** | Backend feature with no consumer. Maintenance burden with no user value. | Document intended use case; remove if not needed, or build frontend integration if required for offline deployment. **Backlog.** |

### LOW -- Cosmetic, informational, or deferred

| # | Source | Finding | Impact | Recommended Action |
|---|--------|---------|--------|--------------------|
| L1 | 9.3 | **JWT payload is minimal (`{ id }` only)** | Every authenticated request requires DB lookup for user data. Design choice with performance implications. | Consider embedding `role` in JWT payload. **Backlog.** |
| L2 | 9.5 | **`.env.example` has duplicate `JWT_SECRET`** | Minor developer confusion. | Remove duplicate. **Fix in Epic 10.** |
| L3 | 9.5 | **`FRONTEND_URL` and `MOBILE_APP_URL` not in `.env.example`** | Dev convenience; CORS allows all in dev mode. Only affects production setup. | Add to `.env.example` with comments. **Fix in Epic 10.** |
| L4 | 9.5 | **Commented-out production URLs in PinLogin/UserIdLogin** | Dead code. No functional impact. | Remove commented code. **Backlog.** |
| L5 | 9.2 | **No `canManage()` convenience method in usePermission hook** | Developers use `hasPermission('Shop Management', 'Manage')` directly. Minor DX issue. | Add `canManage(module)` wrapper. **Backlog.** |

---

## Statistics

| Severity | Count |
|----------|-------|
| CRITICAL | 8 |
| HIGH | 12 |
| MEDIUM | 12 |
| LOW | 5 |
| **Total** | **37** |

### By Source Report

| Report | CRITICAL | HIGH | MEDIUM | LOW | Total |
|--------|----------|------|--------|-----|-------|
| 9.1 API Alignment | 0 | 1 | 0 | 0 | 1 |
| 9.2 RBAC Consistency | 3 | 3 | 4 | 1 | 11 |
| 9.3 Auth Flow | 2 | 3 | 3 | 1 | 9 |
| 9.4 Data Shapes | -- | -- | -- | -- | NOT AVAILABLE |
| 9.5 Infrastructure | 3 | 5 | 5 | 3 | 16 |

**Note:** The 9.1 API Alignment report contains extensive route tables and stale reference analysis. Only the highest-impact finding is elevated here. Additional detailed findings exist in that report for reference during fix implementation.

---

## Recommended Epic 10 Fix Priorities

### Batch 1: Permission & Auth Fixes (Highest Impact, Lowest Risk)

These fixes unblock major features with minimal code change:

1. **Update seed data** -- Add all missing modules and roles to `setupDefaultRoles.js` (fixes C1, C2, H11)
2. **Normalize `balagruha-incharge`** -- Standardize naming across all files (fixes C5)
3. **Add `balagruhaIds` to studentLogin** -- One-line addition (fixes C4)
4. **Secure unprotected routes** -- Add `authenticate` to `/api/roles/getAllRolePermissions` and offline queue routes (fixes H1, H8)
5. **Fix `wtfSettings.js` authorize calls** -- Change array argument to two-string form (fixes H2)

### Batch 2: Client-Side Auth & API Fixes

6. **Fix 401 interceptor cleanup** -- Remove all auth keys on forced logout (fixes H3)
7. **Normalize API return shapes** -- Make `studentPinLogin` return `response.data` (fixes H5)
8. **Fix `useFileUpload` Content-Type** -- Switch to `apiWithoutContentType`, remove explicit header (fixes C8)
9. **Remove `mode: "no-cors"` from axios** -- Clean up headers (fixes M8)
10. **Remove explicit Content-Type from WTF uploads** -- Let Axios handle boundary (fixes M9)

### Batch 3: Security Hardening

11. **Add rate limiting to FR endpoints** (fixes H4)
12. **Add inactive check to studentLogin** (fixes M5)
13. **Reduce `express.json` limit to 5MB** (fixes H9)
14. **Close unauthenticated WS connections** (fixes H7)
15. **Add route guards to coach pages** (fixes M3, M4)

### Batch 4: Infrastructure Cleanup

16. **Fix WebSocket variable references** (fixes C6, C7)
17. **Update `.env.example`** with all missing vars (fixes H10, L2, L3)
18. **Define `WtfPermissions.WTF_READ`** (fixes M2)

### Deferred to Sprint 2+

- FR login end-to-end wiring (C3) -- Part of FR rebuild epic
- Frontend WebSocket client (H6) -- Part of WTF real-time epic
- Offline queue frontend integration (M12) -- Requires product decision
- Presigned URL adoption for LMS (M11) -- Performance optimization
- Dual middleware consolidation (M1) -- Refactoring task
- Login attempt tracking for students (M6) -- Security hardening
- Full user object in localStorage (M7) -- Auth refactoring

---

## Missing Report: Story 9.4 (Data Shapes)

The `integration-data-shapes.md` report was not found at the expected path. When this report becomes available, its findings should be:
1. Read and categorized by severity
2. Merged into this summary
3. Assigned to appropriate Epic 10 batches or deferred

---

## Key Files Referenced (Across All Reports)

| Area | Key Files |
|------|-----------|
| **Auth** | `backend/controllers/authController.js`, `frontend/src/contexts/AuthContext.js`, `frontend/src/api/auth.js`, `frontend/src/api/client.js` |
| **RBAC** | `backend/scripts/setupDefaultRoles.js`, `backend/middleware/auth.js`, `backend/middleware/checkPermission.js`, `frontend/src/contexts/RBACContext.js`, `frontend/src/hooks/usePermission.js` |
| **Routing** | `frontend/src/App.js`, `backend/server.js`, all route files under `backend/routes/` |
| **Upload** | `backend/middleware/upload.js`, `backend/services/aws/s3.js`, `frontend/src/hooks/useFileUpload.js`, `frontend/src/api/wtf.js` |
| **WebSocket** | `backend/services/wtfWebSocket.js`, `backend/routes/v1/websocket.js` |
| **Config** | `frontend/src/config.js`, `frontend/.env`, `backend/.env.example`, `backend/server.js` (CORS) |
| **Offline** | `backend/models/offlineReqQueue.js`, `backend/controllers/offlineRequestQueue.js` |
