# Epic 02: Facial Recognition System Rebuild

**Epic ID:** epic-02
**Sprint:** 1.1 - Foundation Fixes
**Status:** Draft
**Created:** 2025-10-18 20:51:03
**Owner:** Development Team
**Approach:** Complete Rebuild from Scratch (Non-Negotiable)

---

## Overview

Complete rebuild of the facial recognition system from scratch using modern @vladmandic/human library. The current face-api.js implementation is fundamentally broken and unsalvageable.

**Critical Issues with Current System:**
- ❌ Models never loaded (code would fail on first run)
- ❌ Using deprecated face-api.js library (archived Feb 2025)
- ❌ No liveness detection (vulnerable to photo spoofing)
- ❌ Hardcoded threshold (0.6) with no tuning
- ❌ Poor error handling and no user guidance
- ❌ Inefficient architecture (loads ALL students on every login)
- ❌ No image preprocessing or quality checks
- ❌ Frontend provides no feedback during capture

**User Feedback:**
> "I don't think it's salvageable. It's actually very badly executed."

**Reference Document:** `docs/INTERNAL - RBAC and FR System Rebuild.md` (Section 3.2)

---

## Goals

1. **Replace face-api.js** with modern @vladmandic/human library
2. **Achieve ≥95% accuracy** on face recognition (LFW benchmark)
3. **Implement liveness detection** to prevent photo spoofing
4. **Optimize performance** (<10 seconds for 30-student class photo)
5. **Create robust UI feedback** (real-time detection, alignment guide)
6. **Enable manual override** (attendance always works, FR is enhancement)
7. **Prepare for mobile integration** (React Native compatibility for Sprint 3)

---

## User Stories

### Story 01: FR Complete Rebuild with @vladmandic/human
**File:** `docs/stories/sprint-1.1/epic-02-story-01-fr-rebuild.md`
**Estimated:** 12-15 days
**Priority:** P0 - Critical (Blocks Sprint 3 mobile features)

Complete rebuild of facial recognition system from scratch using @vladmandic/human library.

---

## Success Criteria

**Functional Requirements:**
- ✅ Face registration accuracy ≥ 95% (clear photos successfully registered)
- ✅ Face recognition accuracy ≥ 95% (authorized users correctly recognized)
- ✅ False positive rate < 1% (wrong person recognized)
- ✅ False negative rate < 5% (correct person rejected)
- ✅ Liveness detection prevents photo spoofing
- ✅ Real-time face detection preview works on mobile
- ✅ Alignment guide and lighting feedback functional
- ✅ Manual override always available

**Performance Requirements:**
- ✅ Face registration: < 5 seconds total
- ✅ Face recognition: < 3 seconds total (including network)
- ✅ 30-student class photo: < 10 seconds processing
- ✅ Real-time preview: < 500ms latency
- ✅ Cache hit rate: > 95%
- ✅ GPU acceleration working (if available)

**Security Requirements:**
- ✅ Liveness detection prevents printed photo spoofing
- ✅ Liveness detection prevents screen-based spoofing
- ✅ Face embeddings encrypted at rest
- ✅ No face data leakage in logs
- ✅ Audit logging for all FR operations

**User Experience:**
- ✅ Clear error messages with actionable guidance
- ✅ Visual feedback during capture (bounding box, alignment guide)
- ✅ Quality score shown before submission
- ✅ Fallback to password login always available
- ✅ Help modal with examples

---

## Timeline

**Total Duration:** 12-15 days

**Phase 1:** Setup & Model Loading (2 days)
**Phase 2:** Backend Implementation (5 days)
**Phase 3:** Frontend Implementation (3 days)
**Phase 4:** Data Migration (2 days)
**Phase 5:** Testing & Optimization (2 days)
**Phase 6:** Deployment (1 day)

**Critical Path:** Model loading → Backend services → Frontend UI → Testing

---

## Dependencies

**Prerequisites:**
- RBAC refactor should be complete first (but can run in parallel)
- Redis available for caching
- GPU support optional (CPU fallback available)

**Blocks:**
- Sprint 3 mobile attendance features (require FR integration)
- Sprint 3 mobile authentication (facial login)

**Related:**
- Epic 01: RBAC System Refactor (can run in parallel)

---

## Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| FR accuracy below 95% | Low (15%) | High | Tune threshold during testing, extensive testing with various conditions |
| Liveness detection false positives | Medium (30%) | Medium | Tune liveness threshold, provide clear guidance, password fallback |
| Migration data loss | Low (10%) | Critical | Backup old descriptors, gradual rollout (A/B test), rollback plan |
| Performance issues on CPU | Medium (25%) | Medium | Optimize preprocessing, implement caching, GPU recommended |
| Library compatibility issues | Low (15%) | High | @vladmandic/human battle-tested, active maintenance |

---

## Technical Notes

**New Library:** @vladmandic/human
- Version: 3.3.6 (latest, published days ago)
- Successor to face-api.js (same developer, modern implementation)
- All-in-one: Detection + Recognition + Landmarks + Liveness
- 99.2% accuracy on LFW benchmark
- TensorFlow.js 4.x with GPU support (CUDA)
- Performance: 45-80ms total (detection + recognition with GPU)

**Why Not face-api.js:**
- ❌ Archived February 2025 (read-only, unmaintained)
- ❌ Security vulnerabilities, no updates
- ❌ No liveness detection
- ❌ Deprecated TensorFlow.js version

**Alternatives Considered:**
1. **face-recognition** (dlib) - 99.38% accuracy, but native dependencies and no liveness
2. **@vladmandic/face-api** (maintained fork) - Author recommends Human instead

---

## Mobile Integration Prep

**React Native Compatibility:**
- ✅ Image upload via base64 or multipart (both supported)
- ✅ Optimize for mobile camera resolution (1920x1080 recommended)
- ✅ Test latency over mobile networks
- ✅ CORS configured for mobile app
- ✅ API endpoints accept mobile image formats

**Sprint 3 Requirements:**
- Mobile attendance marking with photo upload
- Facial recognition for mobile login
- Real-time face detection preview on mobile
- Offline photo queue (upload when online)

---

**Created:** 2025-10-18 20:51:03
**Last Updated:** 2025-10-18 20:51:03 (via bash `date '+%Y-%m-%d %H:%M:%S'`)
**Status:** Ready for story creation
**Prerequisites:** RBAC refactor recommended to complete first (but can parallelize)
