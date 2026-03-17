# Infrastructure Integration Report

**Story:** 9.5 -- Infrastructure Integration (WebSocket, Config, Uploads)
**Date:** 2026-03-17
**Author:** Winston (Architect Agent)
**Status:** Discovery Complete (no code changes)

---

## Table of Contents

1. [WebSocket / Real-Time Audit](#1-websocket--real-time-audit)
2. [Environment & Configuration Alignment](#2-environment--configuration-alignment)
3. [File Upload Flow Trace](#3-file-upload-flow-trace)
4. [Offline Request Queue](#4-offline-request-queue)
5. [Summary of Findings](#5-summary-of-findings)

---

## 1. WebSocket / Real-Time Audit

### 1a. Library & Protocol

- **Backend:** Uses the native `ws` (WebSocket) library v8.18.3 -- NOT socket.io
- **Package:** `"ws": "^8.18.3"` in `backend/package.json`
- **Frontend:** No socket.io or ws client library in `frontend/package.json`
- **No frontend WebSocket client implementation exists.** The frontend only has one REST call related to WebSocket: `getWebSocketStatus()` in `frontend/src/api/wtf.js` which calls `GET /api/v1/websocket/status`

### 1b. Backend WebSocket Setup

**Service:** `backend/services/wtfWebSocket.js` -- a singleton `WtfWebSocketService` class

**Initialization:** Called in `server.js` line 283:
```
wtfWebSocketService.initialize(server);
```
This creates a `WebSocket.Server` attached to the HTTP server (shared port with Express).

**Authentication:** JWT-based. Token extracted from:
1. Query parameter: `?token=<jwt>`
2. Authorization header: `Authorization: Bearer <jwt>`

Token is verified via `jwt.verify(token, process.env.JWT_SECRET)`. Decoded `id` and `role` are stored on the connection.

**Connection is NOT rejected on auth failure** -- the server sends an `authentication_error` message but keeps the connection open. This means unauthenticated clients can maintain WebSocket connections.

### 1c. Event Types Defined

| Event Type | Direction | Method | Description |
|-----------|-----------|--------|-------------|
| `connection_established` | Server -> Client | `handleConnection` | Welcome message on connect |
| `authentication_success` | Server -> Client | `authenticateConnection` | JWT verified |
| `authentication_error` | Server -> Client | `authenticateConnection` | JWT missing/invalid |
| `subscribe` | Client -> Server | `handleSubscribe` | Subscribe to a room |
| `unsubscribe` | Client -> Server | `handleUnsubscribe` | Unsubscribe from room |
| `subscription_success` | Server -> Client | `handleSubscribe` | Subscription confirmed |
| `ping` / `pong` | Bidirectional | `handleMessage` | Keep-alive |
| `pin_created` | Server -> Client | `handlePinCreated` | WTF pin created |
| `pin_liked` | Server -> Client | `handlePinLiked` | WTF pin liked |
| `pin_seen` | Server -> Client | `handlePinSeen` | WTF pin viewed |
| `submission_created` | Server -> Client | `handleSubmissionCreated` | WTF submission |
| `submission_reviewed` | Server -> Client | `handleSubmissionReviewed` | WTF submission reviewed |

### 1d. Room System

The WebSocket service supports room-based subscriptions:
- `wtf_general` -- general WTF updates
- `wtf_pin_<pinId>` -- per-pin updates (likes, views)

### 1e. REST Trigger Routes

`backend/routes/v1/websocket.js` exposes admin-only REST endpoints to trigger WebSocket events:
- `GET /api/v1/websocket/status` -- connection stats
- `POST /api/v1/websocket/initialize` -- re-initialize
- `POST /api/v1/websocket/close-all` -- disconnect all
- `POST /api/v1/websocket/events/pin-created` -- trigger events manually
- `POST /api/v1/websocket/broadcast` -- broadcast to all

All protected with `authenticate` + `authorize("WTF Management", ...)`.

### 1f. Bugs in WebSocket Service

1. **`handlePinLiked` references undefined `pinData`** (line 476): The method signature is `handlePinLiked(pinId, userId, likeData)` but the body references `pinData.author` which is not in scope. This would throw a `ReferenceError` at runtime.

2. **`handleSubmissionReviewed` references undefined `submissionData`** (line 525): The method signature is `handleSubmissionReviewed(submissionId, reviewData)` but the body references `submissionData.studentId` which is not in scope. Same `ReferenceError` issue.

### 1g. Frontend WebSocket Consumer: NONE

**The frontend does NOT have any WebSocket client code.** There is:
- No `new WebSocket()` call anywhere in the frontend
- No socket.io-client import
- No custom hook for WebSocket connections
- No component that subscribes to real-time WTF updates

The WTF dashboard and related components use standard REST polling or manual refresh to fetch data. The WebSocket infrastructure is fully backend-only with no frontend consumer.

**Verdict:** The WebSocket system is **built but disconnected**. The backend has a complete implementation, but no frontend code consumes it. Additionally, two critical methods have reference errors that would crash at runtime.

---

## 2. Environment & Configuration Alignment

### 2a. Frontend Config

**File:** `frontend/src/config.js`

```javascript
API_BASE_URL: process.env.REACT_APP_API_BASE_URL
  || (window.location.origin.includes('localhost')
      ? 'http://localhost:5001'
      : window.location.origin + '/server'),
API_TIMEOUT: 30000,
MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
```

**Frontend `.env`:**
```
REACT_APP_API_BASE_URL=http://localhost:5001
```

**Production fallback:** `window.location.origin + '/server'` -- assumes a reverse proxy at `/server`.

### 2b. Backend Config

**Port:** `process.env.PORT || 5001`
**CORS Origins:**
- `http://localhost:3000` (React dev server)
- `http://localhost:5001` (backend itself)
- `http://localhost:5173` (Vite dev server)
- `process.env.FRONTEND_URL` (production)
- `process.env.MOBILE_APP_URL` (mobile)

**Development mode:** CORS allows ALL origins when `NODE_ENV === 'development'`.

### 2c. Port Alignment

| Component | Port | Source |
|-----------|------|--------|
| Backend API | 5001 | `process.env.PORT \|\| 5001` |
| Frontend dev (react-scripts) | 3000 | Default CRA port |
| Frontend `.env` API target | 5001 | `REACT_APP_API_BASE_URL=http://localhost:5001` |

**Status:** ALIGNED for development.

### 2d. Hardcoded URLs

| Location | URL | Status |
|----------|-----|--------|
| `frontend/src/config.js` | `http://localhost:5001` | Fallback, acceptable |
| `frontend/src/components/pinlogin/UserIdLogin.js` | `https://playground.initiativesewafoundation.com/server/api/auth/login` | **COMMENTED OUT** -- safe |
| `frontend/src/components/pinlogin/PinLogin.jsx` | `https://playground.initiativesewafoundation.com/server/api/auth/login` | **COMMENTED OUT** -- safe |
| `backend/server.js` CORS | `http://localhost:3000`, `http://localhost:5001`, `http://localhost:5173` | Dev convenience, acceptable |

**No active hardcoded production URLs found.** The commented-out references are legacy code.

### 2e. Missing Environment Variables

The `.env.example` is **incomplete**. The following env vars are referenced in code but missing from `.env.example`:

| Variable | Used In | Purpose |
|----------|---------|---------|
| `FRONTEND_URL` | `server.js` CORS | Production frontend origin |
| `MOBILE_APP_URL` | `server.js` CORS | Mobile app origin |
| `AWS_S3_BUCKET_NAME_SHOP_PRODUCTS` | `services/aws/s3.js` | Shop product image bucket |
| `AWS_S3_BUCKET_NAME_LMS_CONTENT` | `services/aws/s3.js` | LMS content bucket |
| `JWT_SECRET` | Listed twice in `.env.example` | Duplicate entry |

### 2f. `mode: "no-cors"` in Axios Headers

Both `api` and `apiWithoutContentType` in `frontend/src/api/client.js` include:
```javascript
headers: { mode: "no-cors" }
```

This is **incorrect**. The `mode` option is a `fetch()` API property, not an HTTP header. When set as a header:
- It gets sent to the server as a custom HTTP header `mode: no-cors`
- It has NO effect on CORS behavior (that is controlled by the browser, not headers)
- The backend CORS config does not reference this header
- Since `allowedHeaders` is commented out in the backend CORS config, this header is implicitly allowed

**Impact:** No functional harm (it is silently ignored), but it reveals a misunderstanding of CORS. It should be removed.

### 2g. Body Size Limits

**Backend:** `express.json({ limit: "100mb" })` and `express.urlencoded({ limit: "100mb" })`

This is an extremely large JSON body limit (100MB). Most requests should be well under 1MB. This could enable denial-of-service via large payload attacks.

---

## 3. File Upload Flow Trace

### 3a. Upload Middleware Configurations

| Multer Config | Max File Size | Max Files | Field Name(s) | Used For |
|--------------|--------------|-----------|---------------|----------|
| `upload` (default) | 5MB | 1 (single) or 5 (array) | varies (`attachments`, `image`, `facialData`) | Tasks, medical, repairs, shop images, FR photos |
| `wtfUpload` | 100MB | 1 | `file` | WTF pin media (images, video, audio) |
| `fontUpload` | 1MB | 1 | `font` | WTF custom fonts |
| `lmsUpload` | 500MB | 10 | `files` | LMS content (videos, PDFs, audio, images) |

### 3b. S3 Bucket Configuration

| Bucket Env Var | In `.env.example`? | Used For |
|---------------|-------------------|----------|
| `AWS_S3_BUCKET_NAME_TASK_ATTACHMENTS` | YES | Task file attachments |
| `AWS_S3_BUCKET_NAME_MEDICAL_RECORDS` | YES | Medical record files |
| `AWS_S3_BUCKET_NAME_SPORTS_TASK_ATTACHMENTS` | YES | Sports task files |
| `AWS_S3_BUCKET_NAME_REPAIR_REQUEST_ATTACHMENTS` | YES | Repair request files |
| `AWS_S3_BUCKET_NAME_PURCHASE_ORDER_ATTACHMENTS` | YES | Purchase order files |
| `AWS_S3_WTF_BUCKET_NAME` | YES | WTF media + LMS fallback |
| `AWS_S3_BUCKET_NAME_SHOP_PRODUCTS` | **NO** | Shop product images |
| `AWS_S3_BUCKET_NAME_LMS_CONTENT` | **NO** | LMS content (falls back to WTF bucket) |

### 3c. Upload Flow: LMS Content (useFileUpload hook)

```
Frontend: useFileUpload.js
  |  Creates FormData, appends file as 'files'
  |  POST /api/v2/lms/admin/content/upload
  |  Uses `api` instance (Content-Type: application/json by default)
  |  BUT overrides with headers: { 'Content-Type': 'multipart/form-data' }
  v
Backend: routes/v2/lms/admin/content.js
  |  lmsUploadWithErrorHandling middleware
  |  lmsUpload.array('files', 10) -- field name 'files'
  v
Backend: controllers (processes files, uploads to S3)
  |  Returns { success, files: [{ id, fileUrl, s3Key }] }
  v
Frontend: expects response.data.files[0].fileUrl, .id, .s3Key
```

**Issue:** `useFileUpload` uses the `api` instance which has `Content-Type: application/json` as default. It manually overrides this with `'Content-Type': 'multipart/form-data'` in the request config. This works BUT the manually set Content-Type will NOT include the multipart boundary string. Axios is smart enough to detect FormData and set the correct Content-Type with boundary when no Content-Type is explicitly set. By explicitly setting it, the boundary may be missing, which would cause the backend multer to fail to parse the upload.

**This is a potential bug** -- the explicit `Content-Type: multipart/form-data` header should be REMOVED and let Axios auto-detect from the FormData object. The `apiWithoutContentType` instance should be used instead.

### 3d. Upload Flow: WTF Media

```
Frontend: api/wtf.js
  |  Creates FormData, appends file as 'file'
  |  POST /api/v1/wtf/submissions/voice (or /media)
  |  Uses `apiWithoutContentType` -- CORRECT (lets Axios set boundary)
  |  Also sets headers: { "Content-Type": "multipart/form-data" } -- RISKY
  v
Backend: routes/v1/wtf.js
  |  wtfUploadWithErrorHandling -> wtfUpload.single('file')
  v
Backend: uploads to S3 via s3.uploadWtfMedia / s3.uploadWtfVoiceNote
```

**Mixed pattern:** WTF uploads use `apiWithoutContentType` (correct base) but also explicitly set `Content-Type: multipart/form-data` (risky -- same boundary issue as above).

### 3e. Upload Flow: Shop Product Images

```
Frontend: (calls POST /api/v2/upload/image)
  |  Field name: 'image'
  v
Backend: routes/v2/upload.js
  |  upload.single('image') -- default multer, 5MB max
  v
Backend: shopProductImageController.uploadGenericImage
  |  Uploads to S3 via s3.uploadShopProductImage
```

### 3f. Upload Flow: Task/Repair/Medical Attachments

Multiple routes use `upload.array('attachments', 5)` or `upload.fields([...])`. Frontend components like `RepairManagement.js` create FormData and use `apiWithoutContentType` or direct calls.

### 3g. Frontend MAX_FILE_SIZE Mismatch

| Component | Frontend Max | Backend Max | Match? |
|-----------|-------------|-------------|--------|
| `config.js` global | 5MB | -- | Reference only |
| Default upload (tasks, medical, shop) | -- | 5MB | -- |
| WTF media | -- | 100MB | Frontend has no WTF size validation |
| LMS content | -- | 500MB | Frontend has no LMS size validation |

**Frontend does not enforce file size limits before upload.** The `config.MAX_FILE_SIZE` (5MB) is defined but not referenced by any upload component. Size validation only happens server-side via multer, resulting in poor UX (upload starts, transfers data, then fails).

### 3h. Presigned URL Upload (LMS Alternate Path)

`backend/services/aws/s3.js` exports `generateLMSContentUploadUrl()` which creates presigned S3 URLs for direct browser-to-S3 uploads. However, the frontend `useFileUpload` hook does NOT use presigned URLs -- it uploads through the backend proxy pattern. The presigned URL method is available but unused.

---

## 4. Offline Request Queue

### 4a. Purpose

The `OfflineRequestQueue` model (`backend/models/offlineReqQueue.js`) stores API requests that were made while offline, for later synchronization.

**Schema fields:**
- `operation`, `apiPath`, `method`, `payload` -- the original request
- `attachments` -- file references
- `status` -- `pending` by default
- `token` -- stored JWT for replay
- `generatedId` -- ID assigned to the offline-created resource

### 4b. API Routes

| Method | Path | Auth | Localhost-only? |
|--------|------|------|----------------|
| POST | `/api/offline-requests` | None | No |
| GET | `/api/offline-requests/:requestId` | None | No |
| POST | `/api/offline-requests/sync` | None | **Yes** |
| POST | `/api/offline-requests/sync/db/remote` | None | **Yes** |

**Security concerns:**
- No `authenticate` middleware on any route
- The create and get routes are completely unprotected
- Sync routes use `isRequestFromLocalhost()` as the only guard

### 4c. Frontend Integration: NONE

No frontend code references offline requests, offline queue, or sync functionality. There is no:
- Service worker for offline support
- IndexedDB or localStorage queue
- Offline detection or retry logic tied to the queue

The offline request queue appears to be a backend-only mechanism, possibly intended for a mobile app or local deployment scenario where the backend runs offline and syncs later. It is not integrated with the React frontend.

### 4d. Sync Mechanism

The `syncOfflineRequestToServer` replays queued requests against the main server. The `syncRemoteDBToLocalDB` copies the remote database to the local MongoDB. Both are restricted to localhost requests. The `copyDatabase` function is called after sync.

---

## 5. Summary of Findings

### CRITICAL

| # | Issue | Impact |
|---|-------|--------|
| C1 | WebSocket `handlePinLiked` references undefined `pinData` variable | Runtime crash when any pin is liked while WS clients connected |
| C2 | WebSocket `handleSubmissionReviewed` references undefined `submissionData` variable | Runtime crash when a submission is reviewed while WS clients connected |
| C3 | `useFileUpload` explicitly sets `Content-Type: multipart/form-data` without boundary | May cause multer to fail parsing LMS file uploads; should use `apiWithoutContentType` or remove explicit header |

### HIGH

| # | Issue | Impact |
|---|-------|--------|
| H1 | WebSocket has no frontend consumer | Entire WS system is backend-only dead infrastructure; WTF real-time features are not functional |
| H2 | Unauthenticated WS connections not disconnected | Auth failure sends error message but keeps connection open; potential resource exhaustion |
| H3 | Offline request queue routes have no authentication | Any client can create/read offline requests without a token |
| H4 | `express.json` limit set to 100MB | Enables large-payload DoS attacks; should be reduced to 1-5MB |
| H5 | `AWS_S3_BUCKET_NAME_SHOP_PRODUCTS` and `AWS_S3_BUCKET_NAME_LMS_CONTENT` missing from `.env.example` | New deployments will have undefined bucket names; LMS falls back to WTF bucket silently |

### MEDIUM

| # | Issue | Impact |
|---|-------|--------|
| M1 | `mode: "no-cors"` set as HTTP header in axios instances | No functional impact but reveals CORS misunderstanding; cosmetic noise in requests |
| M2 | WTF API calls also explicitly set `Content-Type: multipart/form-data` alongside `apiWithoutContentType` | Redundant and risky -- boundary may be missing; currently works because Axios is forgiving |
| M3 | Frontend has no client-side file size validation | Users upload files that exceed server limits, wasting bandwidth before getting error |
| M4 | `.env.example` has duplicate `JWT_SECRET` entry | Minor confusion for developers |
| M5 | Presigned URL upload path exists but is unused | Wasted capability; direct S3 uploads would be faster for large LMS videos |
| M6 | Offline request queue has no frontend integration | Backend feature with no consumer; maintenance burden |

### LOW

| # | Issue | Impact |
|---|-------|--------|
| L1 | No WebSocket reconnection logic (no frontend client anyway) | N/A until frontend consumer is built |
| L2 | Commented-out production URLs in PinLogin/UserIdLogin | Dead code; cosmetic |
| L3 | `FRONTEND_URL` and `MOBILE_APP_URL` not in `.env.example` | Dev convenience only; CORS allows all in dev mode |

---

## Key Files Referenced

| File | Purpose |
|------|---------|
| `backend/server.js` | CORS config, body limits, WS initialization, routes |
| `backend/services/wtfWebSocket.js` | WebSocket service (ws library) |
| `backend/routes/v1/websocket.js` | WebSocket admin REST routes |
| `backend/middleware/upload.js` | Multer configs (default, WTF, LMS, font) |
| `backend/services/aws/s3.js` | S3 upload/download/presign service |
| `backend/routes/v2/upload.js` | Generic image upload route |
| `backend/models/offlineReqQueue.js` | Offline request queue model |
| `backend/controllers/offlineRequestQueue.js` | Offline queue controller |
| `backend/routes/offlineRequestQueue.js` | Offline queue routes |
| `frontend/src/config.js` | API base URL, timeouts, file size |
| `frontend/src/api/client.js` | Axios instances (api, apiWithoutContentType) |
| `frontend/src/hooks/useFileUpload.js` | LMS file upload hook |
| `frontend/src/api/wtf.js` | WTF API calls including uploads |
| `frontend/.env` | Frontend env vars |
| `backend/.env.example` | Backend env template |
