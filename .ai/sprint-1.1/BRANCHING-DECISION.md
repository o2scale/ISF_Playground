# Git Branching Strategy Decision - FR from RBAC

**Date:** 2025-10-22 22:43:12
**Decision Made By:** Dev Team (User + Dev Agent James)
**Context:** Transitioning from RBAC work to FR (Facial Recognition) story

---

## 🔀 Decision: Branch FR FROM RBAC (Not from develop)

### Branch Structure

```
develop (production code - untouched)
└── feature/sprint-1.1-rbac-refactor (RBAC work - QA PASSED 95/100)
    └── feature/sprint-1.x-facial-recognition (FR work - NEW) ← We are here
```

---

## 🤔 Why This Approach?

### Problem Statement

**RBAC modified core infrastructure:**
- `backend/middleware/checkPermission.js` - Injects `req.scopeFilter` on all routes
- `backend/middleware/auth.js` - Updated authorization logic
- Multiple controllers - Now use `req.scopeFilter` for data filtering
- Multiple data-access files - Accept `scopeFilter` parameter

**Concern:** If FR branches from `develop` (without RBAC), FR won't have this infrastructure

---

## ✅ Advantages of This Approach

### 1. **FR Gets RBAC Infrastructure Automatically**
- All new FR endpoints will have `req.scopeFilter` available
- No need to retrofit FR with RBAC later
- Clean integration from day one

### 2. **Working Locally with RBAC**
- Local database already has RBAC migration applied
- Can test FR with RBAC-enabled environment
- Realistic testing scenario

### 3. **Cohesive Deployment Package**
- Deploy RBAC + FR together as Sprint 1.1
- Single merge to develop
- Single production deployment
- Easier rollback (one package vs two separate features)

### 4. **Simpler Git Workflow**
- Linear development path: RBAC → FR
- No intermediate merges to develop during development
- No complex syncing between parallel branches

### 5. **Avoid Integration Hell**
- No need to manually add RBAC to FR later
- No "missing scopeFilter" bugs
- No architectural mismatches

---

## ⚠️ Risks & Mitigation

### Risk 1: Long-Lived Feature Branch
**Problem:** If develop gets changes while working on FR (2-3 weeks), merge conflicts later

**Mitigation:**
```bash
# Periodically sync with develop (every 1-2 weeks)
git fetch origin develop
git merge origin/develop
# Resolve conflicts incrementally
# Test after merge
```

### Risk 2: Delayed RBAC Deployment
**Problem:** RBAC is production-ready now (QA: 95/100) but waits for FR

**Decision:** Acceptable - will deploy both together as cohesive package

### Risk 3: Testing Complexity
**Problem:** Testing two features together - harder to isolate issues

**Mitigation:**
- RBAC already tested (QA: 95/100) ✅
- Test FR separately on RBAC-enabled baseline
- Clear separation of concerns in code

---

## 📋 Workflow Going Forward

### Development Phase

```bash
# Current state: On feature/sprint-1.x-facial-recognition
git branch --show-current
# Output: feature/sprint-1.x-facial-recognition

# Work on FR normally
git add <files>
git commit -m "feat(fr): ..."

# Periodically sync with develop (every 1-2 weeks)
git fetch origin develop
git merge origin/develop
# Test after merge
```

### Deployment Phase (Later)

```bash
# Option 1: Deploy RBAC + FR together
git checkout develop
git merge feature/sprint-1.x-facial-recognition
# This brings in BOTH RBAC and FR changes
# Test everything together
# Deploy as Sprint 1.1 package

# Option 2: Deploy RBAC first (if needed urgently)
git checkout develop
git merge feature/sprint-1.1-rbac-refactor
# Deploy RBAC to production
# Later, merge FR when ready
```

---

## 🎯 Alternative Approaches Considered

### ❌ Option A: Branch FR from develop
```
develop
├── feature/sprint-1.1-rbac-refactor (RBAC)
└── feature/sprint-1.x-facial-recognition (FR) ← Without RBAC
```

**Rejected because:**
- FR won't have RBAC infrastructure
- Need to manually retrofit FR with RBAC later
- Integration hell when merging both
- Testing won't match final deployment state

### ❌ Option B: Merge RBAC to develop first
```
develop (now has RBAC)
├── feature/sprint-1.1-rbac-refactor (done)
└── feature/sprint-1.x-facial-recognition (from develop+RBAC)
```

**Rejected because:**
- Develop would be ahead of production (confusing)
- Production deployment pressure (RBAC merged but not deployed)
- No significant benefit over chosen approach
- More git operations (extra merge step)

---

## 📊 Comparison Matrix

| Aspect | FR from RBAC (Chosen) ✅ | FR from develop ❌ | Merge RBAC first ❌ |
|--------|--------------------------|-------------------|---------------------|
| RBAC infrastructure in FR | ✅ Yes | ❌ No | ✅ Yes |
| Integration complexity | 🟢 Low | 🔴 High | 🟡 Medium |
| Deployment flexibility | 🟢 High | 🟡 Medium | 🔴 Low (pressure) |
| Git workflow simplicity | 🟢 Simple | 🟢 Simple | 🟡 Complex |
| Testing accuracy | 🟢 High | 🔴 Low | 🟢 High |
| Merge conflicts risk | 🟡 Medium | 🟢 Low | 🟡 Medium |

---

## 📝 Key Learnings

### 1. Infrastructure Changes are Special
When a feature modifies **core infrastructure** (middleware, auth, data-access patterns), subsequent features should build on top of it, not alongside it.

### 2. Local Development Environment Alignment
Working locally with RBAC migration already applied → FR should also work in RBAC-enabled environment → Branch from RBAC makes sense.

### 3. Deployment as a Package
Sometimes deploying multiple features together is better than independent deployments:
- Cohesive user experience
- Single migration/deployment risk
- Easier rollback
- Tested together

### 4. Git Branch Strategy is Contextual
There's no one-size-fits-all. Consider:
- Feature dependencies
- Infrastructure changes
- Team workflow
- Deployment cadence
- Risk tolerance

---

## ✅ Decision Validation Checklist

- [x] FR needs RBAC infrastructure → Branch from RBAC ✅
- [x] Local DB has RBAC migration → Consistent with branching ✅
- [x] Team comfortable with long-lived branch → Acceptable ✅
- [x] Mitigation for merge conflicts → Periodic sync plan ✅
- [x] Clear deployment path → Package or sequential ✅
- [x] Rollback plan → Both features or neither ✅

---

## 🚀 Next Steps

1. ✅ **Create FR branch** - `feature/sprint-1.x-facial-recognition` (DONE)
2. ⏳ **Create FR context file** - `.ai/sprint-1.1/dev-fr-context.md`
3. ⏳ **Start FR story work** - Explore existing FR code, plan implementation
4. ⏳ **Periodic sync** - Set reminder to sync with develop every 1-2 weeks
5. ⏳ **Deployment prep** - When ready, prepare RBAC + FR package deployment

---

## 📞 Questions/Concerns?

If issues arise with this approach:
- Can still merge RBAC to develop separately if deployment urgency changes
- Can rebase FR onto develop if branching becomes problematic
- Flexibility maintained throughout development

---

**Status:** ✅ Decision executed - FR branch created
**Current Branch:** `feature/sprint-1.x-facial-recognition`
**Base Branch:** `feature/sprint-1.1-rbac-refactor` (commit: bf35360)
**Last Updated:** 2025-10-22 22:43:12
