# Story 01: FR Complete Rebuild with @vladmandic/human

**Story ID:** epic-02-story-01
**Epic:** Epic 02 - Facial Recognition System Rebuild
**Sprint:** 1.1 - Foundation Fixes
**Status:** Draft
**Priority:** P0 - Critical
**Estimated Effort:** 12-15 days
**Created:** 2025-10-18 20:51:03
**Branch:** `feature/sprint-1.1-fr-rebuild`

---

## Story Description

As a **System Administrator**, I need to **completely rebuild the facial recognition system using @vladmandic/human library**, so that **face recognition is accurate (≥95%), secure (liveness detection), performant (<10 sec for class photo), and reliable with manual override always available**.

**User Feedback:**
> "I don't think it's salvageable. It's actually very badly executed."

**Critical Issues to Fix:**
- Current face-api.js is deprecated and archived (Feb 2025)
- Models never loaded (system would fail on first run)
- No liveness detection (vulnerable to photo spoofing)
- Inefficient architecture (O(n) complexity, no caching)
- No user guidance or feedback during capture
- Hardcoded threshold with no tuning

**Decision:** Complete rebuild from scratch (non-negotiable)

---

## Acceptance Criteria

### AC1: Old FR System Completely Removed
**Given** the deprecated face-api.js system exists
**When** the old system is removed
**Then** all face-api.js dependencies should be uninstalled
**And** old FR model files should be deleted
**And** old FR routes and utilities should be removed
**And** codebase should have no references to face-api.js

### AC2: @vladmandic/human Successfully Installed and Configured
**Given** @vladmandic/human is the new FR library
**When** the library is installed and configured
**Then** models should load successfully on server startup
**And** GPU acceleration should work (if available)
**And** TensorFlow.js backend should be properly configured
**And** model warmup should complete within 10 seconds

### AC3: Face Registration Accuracy ≥95%
**Given** a clear photo of a student's face
**When** the face is registered in the system
**Then** face detection should succeed ≥95% of the time
**And** 128-d embedding should be extracted and stored
**And** embedding should be encrypted in database
**And** registration should complete within 5 seconds

### AC4: Face Recognition Accuracy ≥95%
**Given** a registered student attempts facial login
**When** their photo is captured and submitted
**Then** correct student should be recognized ≥95% of the time
**And** false positive rate should be <1% (wrong person matched)
**And** false negative rate should be <5% (correct person rejected)
**And** confidence score should be ≥0.5 (configurable threshold)
**And** recognition should complete within 3 seconds

### AC5: Liveness Detection Prevents Spoofing
**Given** someone attempts to spoof with a printed photo
**When** liveness detection is performed
**Then** printed photo should fail liveness check
**And** photo displayed on phone screen should fail
**And** real person should pass liveness check
**And** liveness confidence score should be clear

### AC6: Manual Override Always Available
**Given** facial recognition fails or is unavailable
**When** manual attendance marking is used
**Then** attendance should be successfully recorded
**And** manual override should be logged in audit trail
**And** In-Charge should be able to mark attendance manually
**And** FR failure should not block attendance workflow

### AC7: Performance Targets Met
**Given** various face recognition scenarios
**When** performance is measured
**Then** single face detection should complete <1 second
**And** single face recognition should complete <2 seconds
**And** 30-student class photo should process <10 seconds
**And** cache hit rate should be >95%
**And** GPU should provide 3-5x speedup over CPU

### AC8: UI Provides Real-Time Feedback
**Given** a user is capturing their face for registration/login
**When** the camera preview is active
**Then** real-time face detection bounding box should be visible
**And** alignment guide overlay should help positioning
**And** lighting indicator should show if lighting is adequate
**And** quality score should be shown before submission
**And** clear error messages should guide user on failures

### AC9: Mobile Integration Ready
**Given** Sprint 3 will require mobile FR integration
**When** mobile image uploads are tested
**Then** base64 image format should be supported
**And** multipart form data should be supported
**And** mobile camera resolution (1920x1080) should work
**And** CORS should allow mobile app requests
**And** API latency over mobile network should be acceptable

### AC10: Security Requirements Met
**Given** face data is sensitive biometric information
**When** security audit is performed
**Then** face embeddings should be encrypted at rest
**And** no face data should appear in logs or error messages
**And** liveness detection should prevent spoofing attacks
**And** audit logging should track all FR operations
**And** no security vulnerabilities should exist

---

## Tasks

### Task 1: Remove Old FR System
**Estimated:** 1-2 hours

#### Subtasks:
- [ ] Identify all face-api.js dependencies in package.json
- [ ] Remove face-api.js from backend/package.json
- [ ] Remove old FR model files from backend/models/fr/
- [ ] Remove old FR utility files (backend/utils/frHelper.js if exists)
- [ ] Remove old FR route handlers (backend/routes/facialRecognition.js)
- [ ] Search codebase for "face-api" references and remove
- [ ] Update any controllers that used old FR system
- [ ] Run `npm prune` to clean unused dependencies
- [ ] Document what was removed for rollback purposes

---

### Task 2: Install & Setup @vladmandic/human
**Estimated:** 2-3 hours

#### Subtasks:
- [ ] Install @vladmandic/human: `npm install @vladmandic/human`
- [ ] Install canvas for Node.js image processing: `npm install canvas`
- [ ] Download Human models from GitHub releases
- [ ] Create `/backend/models/human/` directory structure
- [ ] Copy model files to correct locations
- [ ] Create `backend/config/humanConfig.js` with Human configuration
- [ ] Configure TensorFlow.js backend (GPU if available, CPU fallback)
- [ ] Test basic import: `const Human = require('@vladmandic/human').default`
- [ ] Create initialization script in server startup
- [ ] Implement model warmup for faster inference
- [ ] Test basic face detection with sample image
- [ ] Verify GPU acceleration working (check logs for CUDA)
- [ ] Document configuration and setup process

---

### Task 3: Create FR Database Models
**Estimated:** 2 hours

#### Subtasks:
- [ ] Create `backend/models/FaceEmbedding.js` schema
- [ ] Fields: studentId (ref), embedding (encrypted), createdAt, updatedAt
- [ ] Add encryption middleware for embedding field
- [ ] Add indexes: studentId (unique), createdAt
- [ ] Create `backend/models/FRSession.js` schema
- [ ] Fields: studentId, sessionType (registration|login), success, confidence, livenessScore, timestamp
- [ ] Add indexes: studentId, timestamp, success
- [ ] Create `backend/utils/embeddingEncryption.js` utility
- [ ] Use crypto for AES-256-GCM encryption
- [ ] Write unit tests for encryption/decryption
- [ ] Test model creation and retrieval
- [ ] Document schema and relationships

---

### Task 4: Implement Face Detection & Recognition Services
**Estimated:** 4-5 hours

#### Subtasks:
- [ ] Create `backend/services/frService.js`
- [ ] Implement `detectFace(imageBuffer)` function
- [ ] Validate image quality (resolution, lighting, clarity)
- [ ] Return face bounding box, landmarks, quality score
- [ ] Implement `extractEmbedding(imageBuffer)` function
- [ ] Extract 128-d face descriptor using Human
- [ ] Normalize embedding for comparison
- [ ] Implement `registerFace(studentId, imageBuffer)` function
- [ ] Detect face, extract embedding, encrypt, store in DB
- [ ] Store in Redis cache for fast lookup
- [ ] Implement `recognizeFace(imageBuffer)` function
- [ ] Extract embedding from uploaded image
- [ ] Compare against cached embeddings (cosine similarity)
- [ ] Return best match with confidence score
- [ ] Implement configurable threshold (default 0.5)
- [ ] Add comprehensive error handling
- [ ] Write unit tests for each function
- [ ] Document API and usage

---

### Task 5: Implement Liveness Detection
**Estimated:** 2-3 hours

#### Subtasks:
- [ ] Research Human library liveness detection capabilities
- [ ] Implement `checkLiveness(imageBuffer)` function
- [ ] Use Human's anti-spoofing features
- [ ] Analyze face depth (3D face analysis)
- [ ] Detect blink patterns (if video stream available in future)
- [ ] Return liveness score (0-1)
- [ ] Set configurable liveness threshold (default 0.7)
- [ ] Test with printed photos (should fail)
- [ ] Test with phone screen photos (should fail)
- [ ] Test with real person (should pass)
- [ ] Add liveness to registration and recognition workflows
- [ ] Document liveness detection process
- [ ] Write tests for spoofing attempts

---

### Task 6: Create FR API Endpoints
**Estimated:** 3-4 hours

#### Subtasks:
- [ ] Create `backend/controllers/frController.js`
- [ ] Implement POST `/api/v2/fr/register` endpoint
- [ ] Accept multipart/form-data (studentId, photo)
- [ ] Validate admin/in-charge authorization
- [ ] Call frService.registerFace()
- [ ] Return success, confidence, message
- [ ] Handle errors (no face, multiple faces, low quality)
- [ ] Implement POST `/api/v2/fr/recognize` endpoint
- [ ] Accept multipart/form-data (photo)
- [ ] Call frService.recognizeFace()
- [ ] Perform liveness check
- [ ] Return studentId, confidence, JWT token on success
- [ ] Handle errors (no face, not recognized, liveness failed)
- [ ] Implement GET `/api/v2/fr/status/:studentId` endpoint
- [ ] Check if student has face registered
- [ ] Return registration status
- [ ] Create `backend/routes/v2/facialRecognition.js`
- [ ] Register all FR routes with proper middleware
- [ ] Add authentication middleware (JWT)
- [ ] Add permission checks (admin/in-charge for registration)
- [ ] Add rate limiting to prevent brute force
- [ ] Write integration tests for each endpoint
- [ ] Document API with Swagger/OpenAPI

---

### Task 7: Implement Caching Layer (Performance)
**Estimated:** 2-3 hours

#### Subtasks:
- [ ] Create `backend/services/frCacheService.js`
- [ ] Implement Redis caching for face embeddings
- [ ] Cache key format: `fr:embedding:${studentId}`
- [ ] Cache TTL: 24 hours (configurable)
- [ ] Implement `warmCache()` function
- [ ] Load all face embeddings from DB on server startup
- [ ] Store in Redis for fast comparison
- [ ] Implement `invalidateCache(studentId)` function
- [ ] Call on student update/delete
- [ ] Remove from Redis cache
- [ ] Implement `getCachedEmbedding(studentId)` function
- [ ] Check Redis first, fallback to DB
- [ ] Add cache hit/miss metrics
- [ ] Test cache performance (target >95% hit rate)
- [ ] Implement cache warming schedule (daily)
- [ ] Monitor cache memory usage
- [ ] Document caching strategy

---

### Task 8: Update Frontend Face Capture UI
**Estimated:** 4-5 hours

#### Subtasks:
- [ ] Update `frontend/src/components/faceidlogin/FaceCapture.js`
- [ ] Add real-time face detection preview
- [ ] Show bounding box around detected face
- [ ] Add alignment guide (oval overlay)
- [ ] Show "Face Detected" indicator when face found
- [ ] Add lighting indicator (green=good, yellow=acceptable, red=poor)
- [ ] Add distance guidance ("Move closer" / "Move back")
- [ ] Show capture quality score before submission
- [ ] Add retry mechanism with specific guidance
- [ ] Update `frontend/src/components/faceidlogin/FaceIdLogin.js`
- [ ] Add success/failure animations
- [ ] Add "Switch to password login" fallback button
- [ ] Show loading indicators during processing
- [ ] Display confidence score after recognition
- [ ] Add comprehensive error handling with user-friendly messages
- [ ] Create help modal with photo examples
- [ ] Add troubleshooting guide
- [ ] Test UI on different devices (desktop, tablet, mobile)
- [ ] Ensure responsive design works properly
- [ ] Document UI components and usage

---

### Task 9: Implement Manual Override Workflow
**Estimated:** 2-3 hours

#### Subtasks:
- [ ] Update `backend/controllers/attendanceController.js`
- [ ] Add `markAttendanceManual()` endpoint
- [ ] Accept studentId, balagruhId, timestamp
- [ ] Require in-charge authorization
- [ ] Create attendance record with isManualOverride=true
- [ ] Link to FR session if FR was attempted
- [ ] Log manual override in audit trail
- [ ] Update `backend/models/Attendance.js` schema
- [ ] Add isManualOverride field (boolean, default false)
- [ ] Add frSessionId field (reference to FRSession)
- [ ] Add overrideReason field (optional text)
- [ ] Update frontend attendance marking UI
- [ ] Add "Manual Override" button always visible
- [ ] Show modal for manual student selection
- [ ] Require reason selection (FR failed, technical issue, etc.)
- [ ] Test manual override workflow
- [ ] Verify attendance always works (FR is enhancement, not blocker)
- [ ] Document manual override process

---

### Task 10: Mobile Integration Preparation
**Estimated:** 2-3 hours

#### Subtasks:
- [ ] Test image upload from mobile formats (base64, multipart)
- [ ] Verify API accepts base64-encoded images
- [ ] Verify API accepts multipart/form-data from mobile
- [ ] Test with mobile camera resolution (1920x1080, 1280x720)
- [ ] Optimize image preprocessing for mobile images
- [ ] Update CORS configuration for mobile app
- [ ] Add mobile app origin to allowed origins
- [ ] Test API latency over mobile network (3G, 4G, 5G)
- [ ] Optimize image compression for mobile upload
- [ ] Test with various mobile devices (iOS, Android)
- [ ] Document mobile API usage
- [ ] Create mobile integration guide for Sprint 3
- [ ] Test offline photo queue (upload when online) - prep for Sprint 3

---

### Task 11: Testing & Accuracy Validation
**Estimated:** 3-4 hours

#### Subtasks:
- [ ] Create test dataset (20-30 sample faces)
- [ ] Include various lighting conditions, angles, expressions
- [ ] Test face registration with dataset
- [ ] Measure registration success rate (target ≥95%)
- [ ] Test face recognition with dataset
- [ ] Measure recognition accuracy (target ≥95%)
- [ ] Calculate false positive rate (target <1%)
- [ ] Calculate false negative rate (target <5%)
- [ ] Test with various lighting conditions
- [ ] Bright, dim, natural, artificial
- [ ] Test with various angles
- [ ] Frontal (should pass), tilted (should handle), profile (should reject)
- [ ] Test with obstacles
- [ ] Glasses (should handle), masks (should reject), hats (depends)
- [ ] Test liveness detection with spoofing attempts
- [ ] Printed photo (should fail)
- [ ] Phone screen photo (should fail)
- [ ] Real person (should pass)
- [ ] Tune confidence threshold for optimal accuracy
- [ ] Tune liveness threshold for optimal security
- [ ] Document accuracy metrics and test results

---

### Task 12: Performance Testing & Optimization
**Estimated:** 2-3 hours

#### Subtasks:
- [ ] Test single face detection time (target <1 sec)
- [ ] Test single face recognition time (target <2 sec)
- [ ] Test 30-student class photo processing (target <10 sec)
- [ ] Implement batch processing for class photos
- [ ] Process multiple faces in parallel
- [ ] Test with GPU vs CPU performance
- [ ] Document GPU speedup (target 3-5x)
- [ ] Test with different image resolutions
- [ ] Optimize for 1920x1080 (recommended)
- [ ] Test with different image formats (JPEG, PNG)
- [ ] Load test with 100 concurrent requests
- [ ] Measure API latency (target <3 sec p95)
- [ ] Optimize image preprocessing (resize, normalize)
- [ ] Profile memory usage
- [ ] Optimize cache hit rate (target >95%)
- [ ] Document performance metrics and optimizations

---

### Task 13: Security Testing & Audit
**Estimated:** 2-3 hours

#### Subtasks:
- [ ] Verify face embeddings encrypted at rest
- [ ] Check encryption key management
- [ ] Test decryption and comparison still work
- [ ] Verify no face data in logs
- [ ] Review all log statements
- [ ] Ensure no embedding data or image data logged
- [ ] Test liveness detection against spoofing
- [ ] Try printed photo attacks
- [ ] Try screen-based attacks
- [ ] Try deep fakes (if possible)
- [ ] Penetration testing for FR endpoints
- [ ] Test brute force protection (rate limiting)
- [ ] Test unauthorized access attempts
- [ ] Review security audit logs
- [ ] Verify all FR operations logged
- [ ] Check audit trail completeness
- [ ] Test GDPR compliance (data deletion on request)
- [ ] Document security measures and test results

---

### Task 14: Data Migration from Old System
**Estimated:** 3-4 hours

#### Subtasks:
- [ ] Backup existing face data from old system
- [ ] Export old face descriptors (if any exist)
- [ ] Create migration script: `backend/migrations/migrate-fr.js`
- [ ] Re-process all existing facial data with Human library
- [ ] Extract new 128-d embeddings
- [ ] Encrypt embeddings
- [ ] Store in FaceEmbedding collection
- [ ] Warm Redis cache with migrated embeddings
- [ ] Validate migration (test logins with migrated students)
- [ ] Handle migration failures gracefully
- [ ] Log students that need re-registration
- [ ] Notify administrators of failed migrations
- [ ] Create rollback script: `backend/migrations/rollback-fr.js`
- [ ] Keep old descriptors for rollback safety
- [ ] Test rollback procedure
- [ ] Document migration process and results

---

### Task 15: Deployment & Monitoring
**Estimated:** 2-3 hours

#### Subtasks:
- [ ] Create deployment checklist
- [ ] Verify all environment variables set
- [ ] Verify Human models deployed
- [ ] Verify Redis cache configured
- [ ] Deploy to staging environment
- [ ] Run smoke tests on staging
- [ ] Test registration workflow
- [ ] Test recognition workflow
- [ ] Test liveness detection
- [ ] Test manual override
- [ ] Monitor error logs for 24 hours on staging
- [ ] Create production deployment plan
- [ ] Schedule deployment during low-traffic window
- [ ] Deploy backend to production
- [ ] Deploy frontend to production
- [ ] Run post-deployment smoke tests
- [ ] Monitor error logs and performance metrics for 48 hours
- [ ] Set up alerting for FR failures
- [ ] Slack/email alerts for >10% failure rate
- [ ] Monitor cache hit rate
- [ ] Monitor API latency (target <3 sec p95)
- [ ] Collect user feedback
- [ ] Document deployment process and results

---

## Dev Notes

### Reference Documents:
- **Internal Spec:** `docs/INTERNAL - RBAC and FR System Rebuild.md` (Section 3.2)
- **Context File:** `.ai/sprint-1.1/dev-fr-context.md`
- **Human Library Docs:** https://github.com/vladmandic/human

### Key Files to Create:
```
backend/
├── config/
│   └── humanConfig.js (NEW - Human library configuration)
├── models/
│   ├── FaceEmbedding.js (NEW - encrypted embeddings)
│   └── FRSession.js (NEW - session tracking)
├── services/
│   ├── frService.js (NEW - core FR logic)
│   └── frCacheService.js (NEW - Redis caching)
├── controllers/
│   └── frController.js (NEW - API endpoints)
├── routes/v2/
│   └── facialRecognition.js (NEW - FR routes)
├── utils/
│   └── embeddingEncryption.js (NEW - encryption utility)
├── migrations/
│   ├── migrate-fr.js (NEW - migration script)
│   └── rollback-fr.js (NEW - rollback script)
└── models/human/ (NEW - Human model files)
frontend/
├── src/components/faceidlogin/
│   ├── FaceCapture.js (UPDATE - add real-time feedback)
│   └── FaceIdLogin.js (UPDATE - improve UI/UX)
```

### Human Configuration Example:
```javascript
const Human = require('@vladmandic/human').default;

const humanConfig = {
  backend: 'tensorflow',
  modelBasePath: './models/human',
  face: {
    enabled: true,
    detector: { rotation: true, maxDetected: 1 },
    mesh: { enabled: true },
    description: { enabled: true }, // 128-d embeddings
    liveness: { enabled: true }, // Anti-spoofing
  },
  async: true,
  warmup: 'full',
};

const human = new Human(humanConfig);

async function initializeFR() {
  await human.load();
  await human.warmup();
  console.log('✅ Human library loaded and ready');
}
```

### Embedding Comparison Example:
```javascript
function compareEmbeddings(embedding1, embedding2) {
  // Cosine similarity
  const dotProduct = embedding1.reduce((sum, val, i) => sum + val * embedding2[i], 0);
  const magnitude1 = Math.sqrt(embedding1.reduce((sum, val) => sum + val * val, 0));
  const magnitude2 = Math.sqrt(embedding2.reduce((sum, val) => sum + val * val, 0));
  const similarity = dotProduct / (magnitude1 * magnitude2);
  return similarity; // 0-1 (higher = more similar)
}

function recognizeFace(uploadedEmbedding, cachedEmbeddings, threshold = 0.5) {
  let bestMatch = { studentId: null, confidence: 0 };

  for (const [studentId, cachedEmbedding] of Object.entries(cachedEmbeddings)) {
    const similarity = compareEmbeddings(uploadedEmbedding, cachedEmbedding);
    if (similarity > bestMatch.confidence) {
      bestMatch = { studentId, confidence: similarity };
    }
  }

  if (bestMatch.confidence >= threshold) {
    return bestMatch; // Success
  }
  return null; // Not recognized
}
```

---

## Testing

### Unit Tests Required:
- [ ] Face detection logic
- [ ] Embedding extraction
- [ ] Embedding comparison (cosine similarity)
- [ ] Liveness detection
- [ ] Encryption/decryption
- [ ] Cache operations

### Integration Tests Required:
- [ ] POST /api/v2/fr/register endpoint
- [ ] POST /api/v2/fr/recognize endpoint
- [ ] Manual override workflow
- [ ] Cache warming on startup
- [ ] Redis cache hit/miss

### E2E Tests Required:
- [ ] Face registration with photo upload
- [ ] Face recognition with photo upload
- [ ] Liveness detection with real person
- [ ] Liveness detection with printed photo (should fail)
- [ ] Manual attendance marking
- [ ] UI real-time face detection preview

---

## Security Considerations

**Critical:**
- ✅ Encrypt face embeddings at rest (AES-256-GCM)
- ✅ No face data in logs or error messages
- ✅ Liveness detection to prevent spoofing
- ✅ Audit logging for all FR operations
- ✅ Rate limiting on FR endpoints
- ✅ GDPR compliance (data deletion on request)

**Important:**
- ✅ Secure key management for encryption
- ✅ No embedding data in API responses (only success/failure)
- ✅ Authorization checks on all FR endpoints
- ✅ Input validation on image uploads

---

## Performance Considerations

**Target Metrics:**
- Face registration: < 5 seconds
- Face recognition: < 3 seconds
- 30-student class photo: < 10 seconds
- Real-time preview: < 500ms latency
- Cache hit rate: > 95%
- API response (p95): < 3 seconds

**Optimization Strategies:**
- Redis caching for face embeddings
- GPU acceleration (3-5x speedup)
- Image preprocessing (resize to 640x480 for detection)
- Batch processing for class photos
- Cache warming on server startup

---

## Rollback Plan

**If Issues Occur:**
1. Revert to manual attendance only (FR disabled)
2. Keep new endpoints but return "FR unavailable" error
3. Investigate and fix issues
4. Redeploy when ready
5. Old face-api.js system NOT recoverable (was broken)

**Rollback Steps:**
```bash
git checkout feature/sprint-1.1-fr-rebuild
git revert <commit-hash>
git push origin feature/sprint-1.1-fr-rebuild

# Disable FR endpoints temporarily
export FR_ENABLED=false

# Manual attendance remains functional
```

---

## Definition of Done

- [ ] All 15 tasks completed and tested
- [ ] All acceptance criteria met
- [ ] Face recognition accuracy ≥95% (LFW benchmark)
- [ ] Liveness detection working (prevents photo spoofing)
- [ ] Performance targets met (<10 sec for 30 students)
- [ ] Manual override always available (FR is enhancement, not blocker)
- [ ] All unit tests passing
- [ ] All integration tests passing
- [ ] E2E test scenarios written and executed
- [ ] Security audit passed (embeddings encrypted, no spoofing)
- [ ] Code reviewed and approved
- [ ] Documentation updated (API docs, migration guide)
- [ ] Mobile integration tested (ready for Sprint 3)
- [ ] QA gate status: PASS
- [ ] Deployed to staging successfully
- [ ] Smoke tested in production
- [ ] No critical bugs in first 48 hours
- [ ] User feedback collected and positive

---

## Dev Agent Record

### Agent Model Used
- Model: claude-sonnet-4-5-20250929
- Sessions: 0 (not started yet)

### File List
_Will be populated by Dev Agent during implementation_

### Change Log
_Will be populated by Dev Agent during implementation_

### Completion Notes
_Will be populated by Dev Agent upon completion_

### Debug Log References
_Will be populated if issues encountered_

---

## QA Results

_Will be populated by QA Agent after review_

---

**Created:** 2025-10-18 20:51:03 (via bash `date '+%Y-%m-%d %H:%M:%S'`)
**Last Updated:** 2025-10-18 20:51:03
**Status:** Draft - Ready for development (after RBAC complete)
**Approach:** Complete Rebuild with @vladmandic/human (12-15 days)
**Reference:** `docs/INTERNAL - RBAC and FR System Rebuild.md` Section 3.2
**Prerequisites:** RBAC refactor recommended to complete first
