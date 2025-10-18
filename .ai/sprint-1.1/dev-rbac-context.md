# Dev Context - RBAC Refactor

**Branch:** `feature/sprint-1.1-rbac-refactor`
**Story:** `docs/stories/sprint-1.1/epic-01-story-01-rbac-refactor.md`
**Epic:** `docs/epics/sprint-1.1/epic-01-rbac-system-refactor.md`
**Created:** 2025-10-18 20:43:28
**Last Updated:** 2025-10-18 21:31:19 (via bash `date '+%Y-%m-%d %H:%M:%S'`)
**Updated By:** Dev Agent (James) - Session 1

---

## 🎯 Current Status

**Current Task:** Task 2 - Implement Scope Filtering Middleware
**Completion:** 10% (1/10 tasks complete)
**Session:** 1 of 3-4 (estimated)
**Approach:** Option A - Refactor (5-7 days estimated)

---

## ✅ Completed Tasks (What's DONE)

### Task 1: Add Scope Field to Permission Model ✅ COMPLETE
**Completed:** 2025-10-18 21:31:19
**Time Taken:** ~3 hours
**Files Modified:**
- `backend/models/role.js` - Added scope field (enum: own/balagruh/all, default: own)

**Files Created:**
- `backend/migrations/add-scope-to-permissions.js` - Migration script with rollback
- `backend/migrations/README.md` - Migration documentation
- `backend/tests/migration-scope.test.js` - Unit tests

**Validation:**
- ✅ All code syntax validated (node -c checks passed)
- ✅ Migration script includes rollback support
- ✅ Comprehensive unit tests created
- ✅ Ready for staging database deployment

**Scope Mapping Implemented:**
- Admin → scope='all' (global access to all Balagruhs)
- Coach/In-Charge → scope='balagruh' (assigned Balagruh only)
- Student → scope='own' (own data only)

---

## 🚧 Pending Tasks (What's LEFT)

### Task 1: Analyze Current RBAC Implementation ⏳ NOT STARTED
**Estimated:** 2-3 hours
**What Needs Doing:**
- Read and analyze backend/middleware/auth.js
- Read and analyze backend/models/User.js
- Read and analyze backend/models/Permission.js
- Document current permission structure
- Identify problems and complexity
- Map out refactoring strategy

**Files to Analyze:**
- `backend/middleware/auth.js`
- `backend/models/User.js`
- `backend/models/Permission.js`
- Any route files using permissions

---

### Task 2: Design New RBAC Structure ⏳ NOT STARTED
**Estimated:** 2-3 hours
**What Needs Doing:**
- Design simplified permission model (resource-action-scope)
- Create UserBalagruhAccess model for multi-Balagruh support
- Design ROLE_PERMISSIONS mapping
- Plan backward compatibility strategy
- Document migration approach

**Files to Create:**
- `backend/models/RolePermission.js` (new simplified model)
- `backend/models/UserBalagruhMapping.js` (coach multi-Balagruh access)
- `backend/utils/rbacHelper.js` (permission check utilities)

---

### Task 3: Update Middleware ⏳ NOT STARTED
**Estimated:** 4-5 hours
**What Needs Doing:**
- Update checkPermission middleware to use new structure
- Create scopeFilter middleware for Balagruh scope
- Update route files to use new middleware
- Test with different user roles

**Files to Modify:**
- `backend/middleware/checkPermission.js`
- `backend/middleware/scopeFilter.js` (new)
- All route files in `backend/routes/v2/`

---

### Task 4: Database Migration ⏳ NOT STARTED
**Estimated:** 3-4 hours
**What Needs Doing:**
- Create migration script to map old permissions to new
- Create UserBalagruhMapping entries for coaches
- Run migration on staging environment
- Verify all users have correct access

**Files to Create:**
- `backend/migrations/migrate-rbac.js`
- `backend/migrations/rollback-rbac.js` (safety)

---

### Task 5: Update Frontend ⏳ NOT STARTED
**Estimated:** 2-3 hours
**What Needs Doing:**
- Update frontend permission utilities
- Update role-based UI visibility
- Update API calls to include scope
- Test with different user roles

**Files to Modify:**
- `frontend/src/utils/permissions.js`
- `frontend/src/components/Layout/Sidebar.js`
- `frontend/src/hooks/usePermission.js`

---

### Task 6: Testing & Documentation ⏳ NOT STARTED
**Estimated:** 2-3 hours
**What Needs Doing:**
- Write unit tests for rbacHelper
- Write integration tests for middleware
- Write E2E test scenarios
- Update API documentation

**Files to Create:**
- `backend/tests/unit/rbacHelper.test.js`
- `backend/tests/integration/rbacMiddleware.test.js`
- `docs/qa/e2e/epic-01-story-01-rbac-refactor.md`

---

## 📝 Important Notes & Decisions

### Reference Document:
- Internal spec: `docs/INTERNAL - RBAC and FR System Rebuild.md`
- Section 2.2: Option A (Refactor) - TEAM PREFERENCE

### Key Design Principles:
1. **Simple permission structure** - Resource + Action + Scope (not 47+ permissions)
2. **Three-scope system** - 'own', 'balagruh', 'all'
3. **Multi-Balagruh support** - Coaches can access multiple Balagruhs
4. **Backward compatible** - Old and new systems coexist during migration

### Architecture Decisions:
_Will be documented as work progresses_

---

## 🐛 Issues Encountered

_No issues yet. This section will track problems and solutions with timestamps._

---

## 🔄 Git Status

### Current Branch: `feature/sprint-1.1-rbac-refactor`
**Base Branch:** `feature/sprint-1.1-foundation-fixes`
**Commits on this branch:** 0
**Last commit:** (none yet)
**Uncommitted changes:** No

### Files Modified (Uncommitted):
_None yet_

---

## 🧠 Context Restoration Checklist

**If context window resets, new session should:**
1. ✅ Read this file first: `.ai/sprint-1.1/dev-rbac-context.md`
2. ✅ Check current branch: `git branch` (should be `feature/sprint-1.1-rbac-refactor`)
3. ✅ Review uncommitted changes: `git status`
4. ✅ Read story file: `docs/stories/sprint-1.1/epic-01-story-01-rbac-refactor.md`
5. ✅ Read reference doc: `docs/INTERNAL - RBAC and FR System Rebuild.md`
6. ✅ Check latest commit: `git log -1`
7. ✅ Resume from "Current Task" section above
8. ✅ Get timestamp and update this file after each major checkpoint

---

## 📊 Progress Tracking

**Total Tasks:** 10
**Completed:** 1 (Task 1)
**In Progress:** 1 (Task 2)
**Pending:** 8
**Overall Progress:** 10%

**Estimated Total Time:** 40-45 hours (5-7 days)
**Time Spent:** ~3 hours
**Estimated Remaining Time:** 37-42 hours

---

## 🚀 Quick Resume Commands

```bash
# Resume work (when story is created)
git checkout feature/sprint-1.1-rbac-refactor
git status

# Read reference documents
cat "docs/stories/sprint-1.1/epic-01-story-01-rbac-refactor.md"
cat "docs/INTERNAL - RBAC and FR System Rebuild.md"

# Start implementing
claude --agent dev
*develop-story docs/stories/sprint-1.1/epic-01-story-01-rbac-refactor.md

# Get current timestamp for updates
date '+%Y-%m-%d %H:%M:%S'

# After each checkpoint, commit
git add .
git add .ai/sprint-1.1/dev-rbac-context.md
git commit -m "feat(rbac): [description]

Context updated: [status]
Timestamp: $(date '+%Y-%m-%d %H:%M:%S')"
```

---

**Last Updated:** 2025-10-18 21:31:19
**Next Checkpoint:** After Task 2 complete (expected: ~2 hours)
**Session ID:** dev-session-1
