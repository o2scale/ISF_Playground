# INTERNAL DOCUMENT: RBAC & Facial Recognition System Rebuilds

**Status:** CONFIDENTIAL - Internal Technical Planning
**Purpose:** Technical analysis and implementation strategy for prerequisite system rebuilds
**Date:** October 17, 2025
**Owner:** Development Team

---

## Document Control

| **Attribute** | **Details** |
|---------------|-------------|
| **Project** | ISF Playground - Sprint 3+4 Prerequisites |
| **Audience** | Internal Development Team Only |
| **Classification** | Technical Strategy - NOT for Client Distribution |
| **Related Docs** | Sprint 3+4 Combined MPSD (Client Version) |

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [RBAC System Analysis](#2-rbac-system-analysis)
   - 2.1. [Current State Assessment](#21-current-state-assessment)
   - 2.2. [Option A: Refactor Existing System](#22-option-a-refactor-existing-system)
   - 2.3. [Option B: Complete Rebuild](#23-option-b-complete-rebuild)
   - 2.4. [Decision Framework & Recommendation](#24-decision-framework--recommendation)
3. [Facial Recognition System](#3-facial-recognition-system)
   - 3.1. [Current State Assessment](#31-current-state-assessment)
   - 3.2. [Complete Rebuild Strategy](#32-complete-rebuild-strategy)
4. [Implementation Roadmap](#4-implementation-roadmap)
5. [Risk Assessment](#5-risk-assessment)

---

## 1. Executive Summary

**Impact on Sprint 3+4:**
Two critical systems require attention before Sprint 3+4 can proceed at full capacity:

1. **RBAC (Role-Based Access Control)** - Sprint 2 incomplete, inadequate implementation
2. **Facial Recognition** - Sprint 1 fundamentally broken, unsalvageable

**Team Preference:**
- **RBAC:** Leaning towards **refactoring** existing system (Options A & B presented below)
- **FR:** Definitive **complete rebuild** required

**Timeline Impact:**
- RBAC Refactor: 5-7 days
- RBAC Rebuild: 8-10 days
- FR Rebuild: 12-15 days (non-negotiable)

**Recommended Approach:**
- **Parallel execution** if resources available (saves 10+ days)
- **Temporary mitigations** during development (open access for RBAC, manual attendance for FR)

---

## 2. RBAC System Analysis

### 2.1. Current State Assessment

#### Quality Score: 5/10 (Foundational but Inadequate)

**Critical Issues Identified:**

1. **Development Bypass Enabled** (SECURITY RISK)
   - File: `backend/middleware/auth.js`
   - ALL permission checks skipped in dev mode
   - Must be removed before production

2. **MAC Address Authentication Disabled**
   - Original security feature completely turned off
   - Unclear if still needed per requirements

3. **❌ CRITICAL: No Balagruh-Level Data Filtering**
   - Coach A can currently access Balagruh B student data
   - Missing `balagruhId` scoping in queries
   - Violates data isolation requirements

4. **Permission Granularity Too Coarse**
   - Current: Module + Action only (e.g., "User Management", "Read")
   - Missing: Scope dimension (own/balagruh/all)
   - Cannot differentiate between "read own courses" vs "read all courses"

5. **Frontend Doesn't Enforce Permissions**
   - File: `frontend/src/contexts/AuthContext.js`
   - Only checks `user.role`, not actual permissions
   - No `usePermission` hook or guards
   - UI elements not hidden based on permissions

**Files Analyzed:**
```
backend/
├── middleware/
│   ├── auth.js (dev bypass, MAC auth disabled)
│   └── checkPermission.js (missing scope filtering)
├── models/
│   └── role.js (no scope field in schema)
frontend/
└── src/contexts/
    └── AuthContext.js (role-only checks)
```

**User Feedback:**
> "RBAC inadequate area, again, it's all helter-skelter... such huge permissions and all that crap things. Literally nonsense."

---

### 2.2. Option A: Refactor Existing System

**🔧 Refactor Strategy: Enhance & Fix Current Implementation**

#### Pros ✅
- **Faster timeline**: 5-7 days (vs 8-10 for rebuild)
- **Lower risk**: Incremental changes, existing tests remain valid
- **Team knowledge**: Developers already familiar with current structure
- **Less disruption**: Can be done in smaller PR increments
- **Migration easier**: No wholesale database schema changes

#### Cons ❌
- **Technical debt remains**: Core architecture flaws persist
- **Complexity accumulates**: Adding scope on top of existing module/action system
- **Limited extensibility**: Hard to add future permission types
- **Partial solution**: May require another refactor in 6-12 months

---

#### Refactor Implementation Plan (5-7 Days)

**Phase 1: Add Scope Dimension (2 days)**

**Day 1: Backend - Add Scope Field**
- [ ] Update `backend/models/role.js` schema
  ```javascript
  const RoleSchema = new mongoose.Schema({
    roleName: String,
    permissions: [{
      module: String,
      actions: [String],
      scope: { type: String, enum: ['own', 'balagruh', 'all'], default: 'own' } // NEW
    }]
  });
  ```
- [ ] Migration script to add `scope: 'all'` to existing Admin permissions
- [ ] Migration script to add `scope: 'balagruh'` to Coach/In-Charge permissions
- [ ] Update `checkPermission.js` middleware to read scope

**Day 2: Backend - Implement Scope Filtering**
- [ ] Add query filter injection in `checkPermission.js`
  ```javascript
  const checkPermission = (module, action) => {
    return async (req, res, next) => {
      const user = req.user;
      const permission = await getUserPermission(user, module, action);

      if (!permission) {
        return res.status(403).json({ message: 'No permission' });
      }

      // NEW: Inject scope-based filter
      req.scopeFilter = getScopeFilter(user, permission.scope);
      next();
    };
  };

  function getScopeFilter(user, scope) {
    if (scope === 'all') return {}; // Admin sees all
    if (scope === 'balagruh') return { balagruhId: { $in: user.balagruhIds || [user.balagruhId] } };
    if (scope === 'own') return { userId: user._id };
  }
  ```
- [ ] Update ALL controller methods to use `req.scopeFilter`
  ```javascript
  // Before
  const students = await Student.find({});

  // After
  const students = await Student.find(req.scopeFilter);
  ```

---

**Phase 2: Update Controllers (2 days)**

**Day 3: High-Priority Controllers**
- [ ] `studentController.js` - Add balagruhId filtering
- [ ] `attendanceController.js` - Add balagruhId filtering
- [ ] `healthController.js` - Add balagruhId filtering
- [ ] `sosController.js` - Add balagruhId filtering
- [ ] Test each controller with Coach/Admin roles

**Day 4: Remaining Controllers**
- [ ] `courseController.js` - Add userId/"own" filtering
- [ ] `shopController.js` - Add userId filtering for students
- [ ] `reportController.js` - Add balagruhId filtering
- [ ] `messagingController.js` - No filtering (scope: 'all' for all roles)

---

**Phase 3: Frontend Enhancements (1 day)**

**Day 5: Permission Hooks & Guards**
- [ ] Create `usePermission(module, action)` hook
  ```typescript
  export const usePermission = (module: string, action: string): boolean => {
    const { user } = useAuthStore();
    if (!user) return false;

    return user.permissions.some(p =>
      p.module === module && p.actions.includes(action)
    );
  };
  ```
- [ ] Create `<PermissionGuard>` component
- [ ] Update navigation to hide unavailable tabs
- [ ] Hide/disable buttons based on permissions (e.g., "Edit Student" for Coach)

---

**Phase 4: Testing & Security (1-2 days)**

**Day 6: Security Testing**
- [ ] Remove development bypass completely
- [ ] Test Coach A cannot access Balagruh B data
- [ ] Test Student cannot access other students' data
- [ ] Penetration testing for privilege escalation
- [ ] Performance testing (ensure filters don't slow queries)

**Day 7: Final QA (if needed)**
- [ ] E2E tests for all roles
- [ ] Migration validation on staging
- [ ] Rollback plan documented

---

#### Refactor Success Criteria

**✅ Must Achieve:**
- Balagruh-level data isolation working (Coach A ≠ Balagruh B)
- Development bypass removed
- Frontend permission guards functional
- Zero permission escalation vulnerabilities
- Performance degradation < 10%

**⚠️ Known Limitations After Refactor:**
- Module/Action model still somewhat coarse
- May require another refactor in future if permissions grow more complex
- Technical debt from original implementation remains

---

### 2.3. Option B: Complete Rebuild

**🏗️ Rebuild Strategy: Fresh Start with Modern Permission Model**

#### Pros ✅
- **Clean architecture**: No legacy technical debt
- **Highly extensible**: Easy to add new permission types in future
- **Simplified model**: Resource + Action + Scope (easier to understand)
- **Long-term solution**: Won't need another refactor for years
- **Better testing**: Fresh test suite with modern patterns

#### Cons ❌
- **Longer timeline**: 8-10 days (vs 5-7 for refactor)
- **Higher risk**: Complete replacement, more can go wrong
- **Migration complexity**: Database schema changes for all users/roles
- **Team learning curve**: New patterns to learn (though simpler)

---

#### Rebuild Implementation Plan (8-10 Days)

**Phase 1: Design & Planning (1 day)**

**Day 1: Architecture Design**
- [ ] Review approved permission-based design
- [ ] Define all resources (students, courses, attendance, shop, health, sos, messaging, reports, users, roles)
- [ ] Define all actions (create, read, update, delete, manage)
- [ ] Define scopes (own, balagruh, all)
- [ ] Map existing roles to new permission structure
- [ ] Create migration strategy for existing role data

**New Design (User Approved):**
```typescript
interface Permission {
  resource: string;      // 'students', 'courses', 'attendance', 'shop', 'health', 'sos'
  action: string;        // 'create', 'read', 'update', 'delete', 'manage'
  scope: 'own' | 'balagruh' | 'all'; // Data access scope
}

const ROLE_PERMISSIONS = {
  'Admin': [
    { resource: '*', action: '*', scope: 'all' }, // Full access to all Balagruhs
  ],

  'Coach': [
    { resource: 'students', action: 'read', scope: 'balagruh' }, // Assigned Balagruhs only
    { resource: 'courses', action: '*', scope: 'own' }, // Own courses only
    { resource: 'attendance', action: 'read', scope: 'balagruh' },
    { resource: 'sos', action: 'read', scope: 'balagruh' }, // Receive SOS from assigned Balagruhs
    { resource: 'messaging', action: '*', scope: 'all' }, // Message anyone
  ],

  'Balagruh In-Charge': [
    { resource: 'students', action: 'read', scope: 'balagruh' },
    { resource: 'attendance', action: '*', scope: 'balagruh' }, // Mark attendance for own Balagruh
    { resource: 'health', action: '*', scope: 'balagruh' }, // Manage health records
    { resource: 'sos', action: 'read', scope: 'balagruh' },
    { resource: 'messaging', action: '*', scope: 'all' },
  ],

  'Student': [
    { resource: 'courses', action: 'read', scope: 'own' },
    { resource: 'shop', action: '*', scope: 'own' },
    { resource: 'wallet', action: 'read', scope: 'own' },
    { resource: 'sos', action: 'create', scope: 'own' }, // Trigger SOS
  ],
};
```

---

**Phase 2: Backend Implementation (4 days)**

**Day 2: Database Models**
- [ ] Create new Permission model
  ```javascript
  const PermissionSchema = new mongoose.Schema({
    resource: { type: String, required: true, enum: ['students', 'courses', ...] },
    action: { type: String, required: true, enum: ['create', 'read', 'update', 'delete', 'manage'] },
    scope: { type: String, required: true, enum: ['own', 'balagruh', 'all'], default: 'own' }
  });
  ```
- [ ] Create RolePermission schema
  ```javascript
  const RolePermissionSchema = new mongoose.Schema({
    roleName: { type: String, required: true },
    permissions: [{ resource: String, action: String, scope: String }]
  });
  ```
- [ ] Create migration script to convert old roles to new format
- [ ] Create UserBalagruhAccess schema for many-to-many Coach-Balagruh relationship

**Day 3: Authorization Middleware**
- [ ] Build new `checkPermission(resource, action)` middleware
- [ ] Build query filter injection middleware
- [ ] Automatic Balagruh scoping based on user's assignments
- [ ] Remove development mode bypass completely
- [ ] Re-enable MAC address checks (if required)

**Day 4: Update API Endpoints**
- [ ] Replace old `authorize(module, action)` with `checkPermission(resource, action)` across all routes
- [ ] Add query filters for Balagruh scoping in controllers
- [ ] Test each endpoint with different roles

**Day 5: Testing & Refinement**
- [ ] Test all roles (Admin, Coach, Balagruh In-Charge, Student)
- [ ] Verify Balagruh scoping (Coach A cannot see Balagruh B data)
- [ ] Verify permission inheritance and wildcards
- [ ] Add comprehensive error messages
- [ ] Add audit logging for permission denials

---

**Phase 3: Frontend Implementation (2 days)**

**Day 6: Permission Hooks & Guards**
- [ ] Create `usePermission(resource, action)` hook
- [ ] Create `<PermissionGuard>` component
- [ ] Navigation filtering based on permissions
- [ ] Hide/disable UI elements based on permissions

**Day 7: Update RBAC Management UI**
- [ ] Update `RBACManagement.js` component to work with new permission structure
- [ ] Add scope selection UI (dropdown: own/balagruh/all)
- [ ] Update permission toggles to include scope
- [ ] Test all permission CRUD operations
- [ ] Add visual indicators for scope level

---

**Phase 4: Testing & Migration (2 days)**

**Day 8: Comprehensive Testing**
- [ ] Unit tests for permission checking logic
- [ ] Integration tests for API endpoints with different roles
- [ ] E2E tests for permission-based UI visibility
- [ ] Test multi-Balagruh Coach access
- [ ] Test Admin global access
- [ ] Test Student own-data-only access
- [ ] Performance testing (ensure query filters don't slow down queries)

**Day 9: Data Migration**
- [ ] Backup production database
- [ ] Run migration script to convert old roles to new permission format
- [ ] Verify all users have correct permissions
- [ ] Smoke test production with all roles
- [ ] Monitor for permission errors in logs

---

**Phase 5: Deployment (1 day)**

**Day 10: Staged Rollout**
- [ ] Deploy backend to staging environment
- [ ] Deploy frontend to staging environment
- [ ] QA verification on staging
- [ ] Deploy to production during low-traffic window
- [ ] Monitor error logs and user reports
- [ ] Quick rollback plan if critical issues arise

---

#### Rebuild Success Criteria

**✅ Must Achieve:**
- All roles have correct permissions as per approved design
- Balagruh-level data filtering works correctly (Coach A cannot access Balagruh B)
- Multi-Balagruh Coach access works (Coach assigned to multiple Balagruhs sees all)
- Admin has global access across all Balagruhs
- Frontend UI elements hidden/disabled based on permissions
- Navigation tabs filtered by role permissions
- API endpoints return 403 for unauthorized access
- Permission check latency < 50ms
- Query filters don't degrade database performance (< 100ms p95)
- No N+1 query issues
- No development bypasses in production
- All API endpoints protected with permission checks
- Audit logging for permission denials
- No permission escalation vulnerabilities
- All existing users migrated to new permission structure
- Zero downtime during migration
- Rollback plan tested and available

---

### 2.4. Decision Framework & Recommendation

#### Comparison Matrix

| **Criteria** | **Refactor (Option A)** | **Rebuild (Option B)** | **Winner** |
|--------------|-------------------------|------------------------|------------|
| **Timeline** | 5-7 days ⚡ | 8-10 days | **Refactor** |
| **Risk Level** | Lower (incremental) ✅ | Higher (complete replacement) | **Refactor** |
| **Long-term Maintainability** | Technical debt remains ⚠️ | Clean architecture ✅ | **Rebuild** |
| **Extensibility** | Limited | Highly extensible | **Rebuild** |
| **Team Familiarity** | High ✅ | Learning curve | **Refactor** |
| **Migration Complexity** | Lower | Higher | **Refactor** |
| **Code Quality** | Mediocre | Excellent | **Rebuild** |
| **Future Refactor Needed?** | Likely (6-12 months) ⚠️ | Unlikely (years) ✅ | **Rebuild** |

---

#### Team Preference: **REFACTOR (Option A)**

**Rationale for Refactoring:**
1. **Faster delivery**: Sprint 3+4 can start sooner (2-3 days saved)
2. **Lower risk**: Incremental changes less likely to cause production issues
3. **Adequate for current needs**: Solves critical Balagruh scoping issue
4. **Resource constraints**: Allows parallel FR rebuild (more critical)
5. **Can revisit later**: If permissions grow complex, can rebuild in Sprint 6+

**When to Pivot to Rebuild:**
- If refactoring reveals deeper structural issues during Day 1-2
- If performance testing shows query filter impact > 15%
- If migration complexity exceeds estimates
- If team consensus shifts during implementation

---

## 3. Facial Recognition System

### 3.1. Current State Assessment

#### Quality Score: 2.5/10 (Fundamentally Broken)

**Critical Issues - System is UNSALVAGEABLE:**

1. **❌ Models Never Loaded**
   - File: `backend/services/student.js` (faceLogin function, lines 581-761)
   - No model loading logic - code would fail on first run
   - Cannot be fixed with simple patch

2. **❌ Using Deprecated Library**
   - Library: face-api.js (original)
   - **ARCHIVED February 2025** - read-only, unmaintained
   - Security vulnerabilities, no updates

3. **❌ No Liveness Detection** (SECURITY RISK)
   - Can be spoofed with printed photos
   - Can be spoofed with phone screen photos
   - Vulnerable to deep fakes
   - **Critical security flaw** - cannot be added retroactively to face-api.js

4. **❌ Hardcoded Threshold (0.6)**
   - No tuning or testing
   - Likely causes false positives/negatives
   - No confidence scoring

5. **❌ Poor Error Handling**
   - No user guidance on failures
   - No retry logic
   - No feedback during capture

6. **❌ Inefficient Architecture**
   - Loads ALL students from DB on EVERY login (O(n) complexity)
   - No caching (Redis not utilized)
   - Scales poorly

7. **❌ No Image Preprocessing**
   - No validation, normalization, quality checks
   - Affects accuracy

8. **❌ Frontend Provides No Feedback**
   - Files: `frontend/src/components/faceidlogin/FaceIdLogin.js`, `FaceCapture.js`
   - No face detection preview
   - No alignment guide
   - No lighting indicator

**Files Analyzed:**
```
backend/
├── services/
│   └── student.js (faceLogin - broken, lines 581-761)
└── controllers/
    └── userController.js (facialLogin - pass-through)

frontend/
└── src/components/
    ├── faceidlogin/FaceIdLogin.js (no validation)
    └── usermanagement/FaceCapture.js (no feedback)
```

**User Feedback:**
> "I don't think it's salvageable. It's actually very badly executed."

**DECISION: COMPLETE REBUILD FROM SCRATCH (Non-Negotiable)**

---

### 3.2. Complete Rebuild Strategy

#### Recommended Library: @vladmandic/human

**Why @vladmandic/human:**
- ✅ **Successor to face-api.js** - Same developer, modern implementation
- ✅ **All-in-one solution** - Face detection, recognition, landmarks, liveness detection
- ✅ **Latest TensorFlow.js** - Compatible with tfjs 4.x, GPU support (CUDA)
- ✅ **Liveness detection built-in** - Anti-spoofing, 3D face analysis
- ✅ **Active maintenance** - Latest: 3.3.6 (published 2 days ago)
- ✅ **99.2% accuracy** - LFW benchmark (industry-leading)
- ✅ **Production-ready** - Excellent documentation, battle-tested
- ✅ **Performance** - 45-80ms total (detection + recognition with GPU)

**Alternatives Considered:**
1. **face-recognition** (dlib wrapper) - 99.38% accuracy, but native dependencies (node-gyp) and no liveness detection
2. **@vladmandic/face-api** (maintained fork) - Drop-in replacement, but author recommends Human instead

**Final Choice:** @vladmandic/human - Best balance of accuracy, features, and maintainability

---

#### FR Rebuild Implementation Plan (12-15 Days)

**Phase 1: Setup & Model Loading (2 days)**

**Day 1: Install @vladmandic/human**
```bash
npm install @vladmandic/human
npm install canvas  # For Node.js image processing
```
- [ ] Install dependencies in backend
- [ ] Configure package.json scripts
- [ ] Download Human models from GitHub releases
- [ ] Create `/models/human` directory structure
- [ ] Test basic import and initialization

**Day 2: Model Loading & Server Startup**
- [ ] Implement model loading on server startup
  ```javascript
  const Human = require('@vladmandic/human').default;
  const human = new Human({
    backend: 'tensorflow',
    modelBasePath: './models/human',
    face: {
      enabled: true,
      detector: { rotation: true, maxDetected: 1 },
      mesh: { enabled: true },
      description: { enabled: true }, // 128-d embeddings
    },
  });

  async function initializeFR() {
    await human.load();
    await human.warmup(); // Warm up models for faster inference
    console.log('✅ Human library loaded and ready');
  }
  ```
- [ ] Add to server initialization
- [ ] Test basic face detection with sample image
- [ ] Verify GPU acceleration working (if available)

---

**Phase 2: Backend Implementation (5 days)**

**Day 3: Face Registration (Student Creation/Update)**
- [ ] Image preprocessing service
- [ ] Face detection with quality checks
- [ ] Extract 128-d embedding
- [ ] Store embedding in database
- [ ] Cache in Redis for fast lookup
- [ ] Unit tests for registration

**Day 4: Face Recognition (Login)**
- [ ] Load image from upload
- [ ] Detect face
- [ ] Extract embedding
- [ ] Compare against cached descriptors (Redis)
- [ ] Return best match with confidence score
- [ ] Configurable threshold (default 0.5, tunable)

**Day 5: Caching Layer (Performance Optimization)**
- [ ] Implement Redis caching for face descriptors
- [ ] Cache invalidation on student update/delete
- [ ] Warm cache on server startup
- [ ] Performance testing (target: <100ms total for recognition)
- [ ] Add cache hit/miss metrics

**Day 6: Liveness Detection**
- [ ] Implement blink detection
- [ ] Implement head movement detection (future: requires video stream)
- [ ] Add liveness score to validation
- [ ] Test with printed photos (should fail liveness)
- [ ] Test with phone screen photos (should fail liveness)

**Day 7: Error Handling & Logging**
- [ ] Add detailed error messages for each failure mode
- [ ] Implement retry logic with user guidance
- [ ] Add Prometheus metrics (recognition attempts, success rate, latency, cache hit rate)
- [ ] Add comprehensive logging (info, warn, error levels)
- [ ] Integration with Sentry for error tracking

---

**Phase 3: Frontend Implementation (3 days)**

**Day 8: Face Capture UI Improvements**
- [ ] Add real-time face detection preview
- [ ] Show bounding box around detected face
- [ ] Add alignment guide (oval overlay)
- [ ] Add lighting indicator
- [ ] Add distance guidance (move closer/further)

**Day 9: User Feedback & Guidance**
- [ ] Show capture quality score before submission
- [ ] Add retry mechanism with specific guidance
- [ ] Add success/failure animations
- [ ] Add "Switch to password login" fallback button
- [ ] Loading indicators during processing

**Day 10: Error States & Help**
- [ ] Add help modal with photo examples
- [ ] Add troubleshooting guide
- [ ] Add "Report Issue" button (sends logs to support)
- [ ] Add Admin override for debugging

---

**Phase 4: Data Migration (2 days)**

**Day 11: Re-register Existing Faces**
- [ ] Script to re-process all existing facial data
- [ ] Extract new embeddings with Human library
- [ ] Migrate to new descriptor format (128-d float array)
- [ ] Validate migration (test logins with migrated students)
- [ ] Handle failures gracefully (log and notify)

**Day 12: Fallback & Rollback Plan**
- [ ] Keep old descriptors for rollback
- [ ] A/B test (50% old system, 50% new system)
- [ ] Monitor accuracy and performance
- [ ] Full cutover if successful (disable legacy system)
- [ ] Rollback procedure documented

---

**Phase 5: Testing & Optimization (2 days)**

**Day 13: Accuracy Testing**
- [ ] Test with 100+ students
- [ ] Measure false positive rate (wrong student recognized) - Target: <1%
- [ ] Measure false negative rate (correct student rejected) - Target: <5%
- [ ] Tune confidence threshold for 95%+ accuracy
- [ ] Test various lighting conditions (bright, dim, natural, artificial)
- [ ] Test various angles (frontal, slight tilt, profile - should reject)
- [ ] Test with glasses, masks (should handle glasses, reject masks)

**Day 14: Performance Testing**
- [ ] Load test (100 concurrent login attempts)
- [ ] Measure latency (target: <100ms p95 for recognition)
- [ ] Optimize cache hit rate (target: >95%)
- [ ] Optimize image preprocessing (resize, normalize)
- [ ] GPU vs CPU performance comparison
- [ ] Memory usage profiling

**Day 15: Security Testing**
- [ ] Test with printed photos (should fail liveness check)
- [ ] Test with phone screen displaying photo (should fail liveness check)
- [ ] Test with deep fakes (if possible)
- [ ] Penetration testing (attempt spoofing attacks)
- [ ] Review security audit logs

---

**Phase 6: Deployment (1 day)**

**Day 16: Production Deployment**
- [ ] Deploy to staging environment
- [ ] Smoke test with real users
- [ ] Deploy to production during maintenance window
- [ ] Monitor error logs and performance metrics for 24 hours
- [ ] Collect user feedback
- [ ] Address any critical issues immediately

---

#### FR Rebuild Success Criteria

**✅ Functional Requirements:**
- Face registration accuracy ≥ 95% (95% of clear photos successfully registered)
- Face recognition accuracy ≥ 95% (95% of authorized users correctly recognized)
- False positive rate < 1% (wrong person recognized)
- False negative rate < 5% (correct person rejected)
- Liveness detection prevents photo spoofing
- Real-time face detection preview works on mobile
- Alignment guide and lighting feedback functional

**✅ Performance Requirements:**
- Face registration: < 5 seconds total
- Face recognition: < 3 seconds total (including network)
- Real-time face detection preview: < 500ms latency
- Cache hit rate: > 95%
- GPU acceleration working (if available)

**✅ Security Requirements:**
- Liveness detection prevents printed photo spoofing
- Liveness detection prevents screen-based spoofing
- Embeddings encrypted at rest
- No face data leakage in logs or error messages
- Audit logging for all FR operations

**✅ User Experience:**
- Clear error messages with actionable guidance
- Visual feedback during capture (bounding box, alignment guide)
- Quality score shown before submission
- Fallback to password login always available
- Help modal with examples

---

## 4. Implementation Roadmap

### Recommended Strategy: Parallel Execution

**If 2 Developers Available:**
- **Developer 1:** RBAC Refactor (5-7 days)
- **Developer 2:** FR Rebuild (12-15 days)
- **Total Timeline:** 12-15 days (vs 20+ days sequential)
- **Saves:** ~10 days

**Sprint 3+4 Integration:**
```
Weeks -2 to 0: Prerequisites (Parallel)
├── RBAC Refactor (Dev 1)
│   └── Complete by Day 7
└── FR Rebuild (Dev 2)
    └── Complete by Day 15

Week 1: Sprint 3+4 Kickoff
├── Mobile foundation
└── Both systems operational
```

---

### Temporary Mitigations (During Development)

**RBAC Temporary Solution (User Approved):**
> "We can entirely chuck the entire RBAC module and make everything open for everybody for a while. And then create the RBAC again."

- Implement "open access" mode
- All users can access all resources (no permission checks)
- **Duration:** Until refactor complete (5-7 days)
- **Acceptable:** Per user approval
- **Revert:** Immediately after refactor deployment

**FR Temporary Solution:**
- Use manual attendance marking (In-Charge enters student IDs)
- **Duration:** Until rebuild complete (12-15 days)
- **Fallback:** Always available even after FR deployment

---

## 5. Risk Assessment

### RBAC Risks

**RISK 1: Refactor Reveals Deeper Issues**
- **Probability:** Medium (30%)
- **Impact:** High (may require pivot to rebuild)
- **Mitigation:** Thorough code review on Day 1-2, pivot decision by Day 3
- **Contingency:** Switch to rebuild option (adds 3-4 days)

**RISK 2: Performance Degradation from Filters**
- **Probability:** Low (20%)
- **Impact:** Medium (slower queries)
- **Mitigation:** Performance testing on Day 6, optimize indexes
- **Contingency:** Add database indexes, implement query caching

**RISK 3: Migration Breaks Existing Permissions**
- **Probability:** Medium (25%)
- **Impact:** High (users lose access)
- **Mitigation:** Comprehensive testing, rollback plan ready
- **Contingency:** Rollback to old system, fix migration script

---

### FR Risks

**RISK 1: FR Accuracy Below 95%**
- **Probability:** Low (15%) - Human library is battle-tested
- **Impact:** High (attendance feature unusable)
- **Mitigation:** Tune threshold during testing phase, extensive testing
- **Contingency:** Manual attendance marking as fallback

**RISK 2: Liveness Detection False Positives**
- **Probability:** Medium (30%)
- **Impact:** Medium (real users rejected)
- **Mitigation:** Tune liveness threshold, provide clear guidance
- **Contingency:** Allow liveness check bypass with password fallback

**RISK 3: Migration Data Loss**
- **Probability:** Low (10%)
- **Impact:** Critical (students need re-registration)
- **Mitigation:** Backup old descriptors, gradual rollout (A/B test)
- **Contingency:** Rollback to old system, keep old descriptors

---

## Appendix A: Decision Checklist

### RBAC Decision Checklist

**Choose REFACTOR if:**
- [x] Timeline is critical (Sprint 3+4 start date fixed)
- [x] Team bandwidth limited
- [x] Risk tolerance low
- [x] Permission complexity likely won't grow significantly
- [x] User approved temporary "open access"

**Choose REBUILD if:**
- [ ] During refactor, structural issues discovered
- [ ] Performance impact from filters > 15%
- [ ] Team consensus for long-term investment
- [ ] Timeline flexibility allows extra 3-4 days
- [ ] Client requests future-proof solution

**Current Recommendation:** ✅ **REFACTOR** (Option A)

---

### FR Decision Checklist

**Choose REBUILD:** ✅ **Always** (No other option - current system unsalvageable)

**Key Checkpoints:**
- [ ] Day 2: Models loading successfully
- [ ] Day 7: Liveness detection working
- [ ] Day 13: Accuracy testing passes (≥95%)
- [ ] Day 14: Performance testing passes (<3s total)
- [ ] Day 15: Security testing passes (spoofing blocked)

---

## Appendix B: New API Endpoints

### RBAC API Endpoints (Refactor)

```yaml
# No new endpoints required - existing endpoints enhanced with scope filtering
GET /api/students
  Description: Get all students (filtered by scope)
  Authorization: Bearer token
  Permission: module='User Management', action='Read'
  Scope Filtering: Applied automatically based on user's balagruhIds
  Response:
    200 OK:
      students: Student[] (filtered)
```

### RBAC API Endpoints (Rebuild)

```yaml
POST /api/rbac/check-permission
  Description: Check if user has permission for resource and action
  Request:
    Headers:
      Authorization: Bearer <token>
    Body:
      resource: string (e.g., 'students', 'courses')
      action: string (e.g., 'read', 'create')
  Response:
    200 OK:
      hasPermission: boolean
      scope: 'own' | 'balagruh' | 'all'
    403 Forbidden:
      message: "Permission denied"

GET /api/rbac/user-permissions
  Description: Get all permissions for current user
  Request:
    Headers:
      Authorization: Bearer <token>
  Response:
    200 OK:
      permissions: [
        { resource: string, action: string, scope: string }
      ]
```

### FR API Endpoints

```yaml
POST /api/fr/register
  Description: Register face for a student (extract and store embedding)
  Request:
    Headers:
      Authorization: Bearer <admin-token>
    Body (multipart/form-data):
      studentId: string
      photo: file (JPEG/PNG, max 5MB)
  Response:
    200 OK:
      success: boolean
      confidence: number (0-1)
      message: "Face registered successfully"
    400 Bad Request:
      message: "No face detected" | "Multiple faces detected" | "Low quality"

POST /api/fr/recognize
  Description: Recognize face for login
  Request:
    Body (multipart/form-data):
      photo: file (JPEG/PNG, max 5MB)
  Response:
    200 OK:
      success: boolean
      studentId: string
      confidence: number (0-1)
      token: string (JWT)
    400 Bad Request:
      message: "No face detected" | "Face not recognized"
    403 Forbidden:
      message: "Liveness check failed"
```

---

## Document Status

**Status:** ✅ READY FOR TEAM REVIEW
**Next Steps:**
1. Team review of RBAC options (refactor vs rebuild)
2. Finalize decision on RBAC approach
3. Assign developers (parallel execution recommended)
4. Begin prerequisite development

**Last Updated:** October 17, 2025
**Classification:** Internal Technical Document
**Distribution:** Development Team Only

---

*END OF INTERNAL RBAC & FR REBUILD DOCUMENT*
