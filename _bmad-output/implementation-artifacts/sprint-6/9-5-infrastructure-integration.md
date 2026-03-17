# Story 9.5: Infrastructure Integration (WebSocket, Config, Uploads)

Status: ready-for-dev

## Story

As a Dev,
I want to verify WebSocket/real-time setup, environment config alignment, and file upload integration between frontend and backend,
so that infrastructure-level integrations work correctly.

## Acceptance Criteria

1. **Given** the platform may use WebSocket or Socket.IO for real-time features (WTF/Wall of Fame)
   **When** Dev checks both frontend and backend for WebSocket setup
   **Then** all real-time infrastructure is documented: what library, what events, what components consume them
   **And** disconnected/unused WebSocket setup is flagged
   **And** features claiming real-time that actually use polling are documented

2. **Given** frontend config points to a backend URL and backend has CORS configuration
   **When** Dev checks alignment
   **Then** `frontend/src/config.js` API_BASE_URL matches what backend serves on
   **And** backend CORS configuration allows the frontend origin
   **And** any hardcoded localhost/production URLs in either codebase are listed

3. **Given** S3 file uploads exist (content management, product images, voice recordings)
   **When** Dev traces the upload flow frontend→backend→S3
   **Then** the upload chain is documented: frontend form/component → FormData construction → API call with correct headers → backend multer/S3 handler → response with file URL
   **And** `apiWithoutContentType` is used correctly for multipart uploads (not the JSON default client)
   **And** any upload endpoint where frontend and backend disagree on field names or format is flagged

4. **Given** all 3 infrastructure checks are complete
   **When** Dev compiles findings
   **Then** a combined Epic 9 integration summary is produced alongside this story's report, merging findings from all 5 stories into a prioritized action list

## Tasks / Subtasks

- [ ] Task 1: WebSocket / real-time audit (AC: #1)
  - [ ] `grep -rn "socket.io\|Socket\|WebSocket\|io(" backend/ --include="*.js" | head -20`
  - [ ] `grep -rn "socket.io\|Socket\|WebSocket\|io(" frontend/src/ --include="*.js" --include="*.jsx" | head -20`
  - [ ] If found: document what events are emitted/listened, which components consume them
  - [ ] Check WTF system specifically — product brief mentioned "WebSocket for WTF updates"
  - [ ] Flag unused setup or broken connections

- [ ] Task 2: Environment & config alignment (AC: #2)
  - [ ] Read `frontend/src/config.js` — what's the API_BASE_URL?
  - [ ] Read backend server startup — what port, what CORS origins?
  - [ ] `grep -rn "localhost\|127.0.0.1\|playground.initiativesewafoundation" frontend/src/ backend/ --include="*.js" --include="*.jsx" | grep -v node_modules | grep -v ".env"` — find hardcoded URLs
  - [ ] Verify CORS allows frontend origin

- [ ] Task 3: File upload flow (AC: #3)
  - [ ] Find all frontend components that do file uploads (content management, product images, profile photos, voice recordings)
  - [ ] For each: check Content-Type header, FormData construction, field names
  - [ ] Find all backend upload endpoints (multer middleware, S3 service)
  - [ ] Cross-reference: do field names match? Does frontend use `apiWithoutContentType`?
  - [ ] Check: does backend return the file URL in the expected field?

- [ ] Task 4: Produce story report (AC: #1, #2, #3)
  - [ ] Save to `_bmad-output/implementation-artifacts/evaluation-reports/integration-infrastructure.md`

- [ ] Task 5: Compile Epic 9 combined summary (AC: #4)
  - [ ] Read all 5 integration reports (from Stories 9.1-9.5)
  - [ ] Compile into `_bmad-output/implementation-artifacts/evaluation-reports/fullstack-integration-summary.md`
  - [ ] Prioritize: CRITICAL > HIGH > MEDIUM > LOW
  - [ ] For each finding, recommend: fix in Epic 10 or defer to Sprint 2

## Dev Notes

### DO NOT modify any files — discovery only (except producing reports)
### Key files
- Frontend: `config.js`, `api/client.js` (apiWithoutContentType), upload components
- Backend: `server.js` (CORS, port), `services/s3Service.js`, multer middleware, Socket.IO setup

### After this story completes, the orchestrator should:
1. Read `fullstack-integration-summary.md`
2. Create Epic 10 fix stories for CRITICAL and HIGH findings
3. Update sprint-status.yaml with Epic 10
4. Execute Epic 10

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List
