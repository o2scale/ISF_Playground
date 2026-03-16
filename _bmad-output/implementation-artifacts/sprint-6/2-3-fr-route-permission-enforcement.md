# Story 2.3: FR Route Permission Enforcement

Status: ready-for-dev

## Story

As a Dev,
I want to remove all TODO comments from facial recognition routes and replace them with actual `checkPermission` middleware,
so that FR endpoints have real authorization instead of placeholder comments.

## Acceptance Criteria

1. **Given** FR routes in `v2/facialRecognition.js` contain TODO comments where permission checks should be
   **When** Dev replaces each TODO with the appropriate `checkPermission('Resource', 'Action')` middleware call
   **Then** zero TODO placeholders remain in FR route files (NFR2)
   **And** all FR route endpoints enforce `checkPermission` middleware
   **And** the permission checks are appropriate for each endpoint (e.g., register requires admin, recognize requires student/auth)
   **And** existing FR functionality (registration, recognition) continues to work correctly after adding permissions

## Tasks / Subtasks

- [ ] Task 1: Identify all FR route TODOs (AC: #1)
  - [ ] Read `backend/routes/v2/facialRecognition.js`
  - [ ] Find all TODO comments related to permission checks
  - [ ] List each endpoint and what permission it needs
- [ ] Task 2: Determine correct permissions per endpoint (AC: #1)
  - [ ] FR registration (enroll face) — likely Admin or Coach permission
  - [ ] FR recognition (identify student) — authenticated users with appropriate role
  - [ ] FR embedding management — Admin only
  - [ ] Consult `backend/middleware/checkPermission.js` for available Resource/Action pairs
- [ ] Task 3: Replace TODOs with real permissions (AC: #1)
  - [ ] Add `checkPermission('FacialRecognition', 'Action')` to each route
  - [ ] Remove all TODO comments
  - [ ] Verify with grep: `grep -r "TODO" backend/routes/v2/facialRecognition.js` returns empty
- [ ] Task 4: Test FR functionality (AC: #1)
  - [ ] Run any existing FR-related tests
  - [ ] Verify FR registration endpoint works with correct role
  - [ ] Verify FR recognition endpoint works with correct role
  - [ ] Verify unauthorized roles are blocked

## Dev Notes

### FR Route Location

- Routes: `backend/routes/v2/facialRecognition.js` → mounted at `/api/v2/fr`
- Controller: `backend/controllers/frController.js`
- Service: `backend/services/frService.js`, `backend/services/frCacheService.js`
- Models: `backend/models/FaceEmbedding.js`, `backend/models/FRSession.js`

### Permission Pattern

```javascript
const { authenticate } = require('../../middleware/auth');
const checkPermission = require('../../middleware/checkPermission');

router.post('/register', authenticate, checkPermission('FacialRecognition', 'Create'), controller.register);
router.post('/recognize', authenticate, checkPermission('FacialRecognition', 'Read'), controller.recognize);
```

### Critical Constraints

- **FR is the student login mechanism** — do NOT break facial recognition login flow
- **PIN fallback must still work** — permission changes should not affect PIN-based student login
- **Zero TODOs remaining** — verified by grep (NFR2)

### References

- [Source: _bmad-output/architecture.md#Facial Recognition System]
- [Source: project-context.md#Sprint 1.1 — FR RBAC TODOs]
- [Source: _bmad-output/project-planning-artifacts/prd.md#FR11, FR12, NFR2]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List
