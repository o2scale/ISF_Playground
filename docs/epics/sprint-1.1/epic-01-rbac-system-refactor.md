# Epic 01: RBAC System Refactor

**Epic ID:** epic-01
**Sprint:** 1.1 - Foundation Fixes
**Status:** Draft
**Created:** 2025-10-18 20:50:15
**Owner:** Development Team
**Approach:** Option A - Refactor (5-7 days)

---

## Overview

Refactor the existing Role-Based Access Control (RBAC) system to add proper scope-based data filtering and fix critical security issues. The current RBAC implementation is inadequate and missing Balagruh-level data isolation, which allows users to access data they shouldn't see.

**Critical Issues to Fix:**
- ❌ No Balagruh-level data filtering (Coach A can access Balagruh B data)
- ❌ Development bypass enabled (security risk)
- ❌ Permission granularity too coarse (missing scope dimension)
- ❌ Frontend doesn't enforce permissions (only checks role)
- ❌ MAC address authentication disabled

**Reference Document:** `docs/INTERNAL - RBAC and FR System Rebuild.md` (Section 2.2 - Option A)

---

## Goals

1. **Add scope dimension** to permissions (own/balagruh/all)
2. **Implement Balagruh-level data filtering** to prevent unauthorized access
3. **Remove development bypass** for production security
4. **Create frontend permission guards** for UI visibility
5. **Enable multi-Balagruh coach access** via UserBalagruhMapping
6. **Maintain backward compatibility** during migration

---

## User Stories

### Story 01: RBAC Refactor - Add Scope Filtering & Fix Data Isolation
**File:** `docs/stories/sprint-1.1/epic-01-story-01-rbac-refactor.md`
**Estimated:** 5-7 days
**Priority:** P0 - Critical (Blocks Sprint 2)

Refactor RBAC system to add scope-based permissions and implement proper data filtering at the Balagruh level.

---

## Success Criteria

**Must Achieve:**
- ✅ Balagruh-level data isolation working (Coach A cannot access Balagruh B data)
- ✅ Development bypass removed from production
- ✅ Frontend permission guards functional (hide/show UI elements)
- ✅ Zero permission escalation vulnerabilities
- ✅ Performance degradation < 10%
- ✅ All existing users migrated successfully
- ✅ Backward compatibility maintained during transition

**Quality Gates:**
- ✅ Security audit passes (penetration testing)
- ✅ Performance testing passes (query impact < 10%)
- ✅ E2E tests pass for all roles (Admin, Coach, In-Charge, Student)
- ✅ Zero production incidents during rollout

---

## Timeline

**Total Duration:** 5-7 days

**Phase 1:** Add Scope Dimension (2 days)
**Phase 2:** Update Controllers (2 days)
**Phase 3:** Frontend Enhancements (1 day)
**Phase 4:** Testing & Security (1-2 days)

**Critical Path:** Backend scope implementation → Controller updates → Testing

---

## Dependencies

**Prerequisites:**
- None (can start immediately)

**Blocks:**
- Sprint 2 development (RBAC must be functional)
- Sprint 3+4 mobile features (require proper RBAC)

**Related:**
- Epic 02: Facial Recognition Rebuild (can run in parallel)

---

## Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Refactor reveals deeper structural issues | Medium (30%) | High | Thorough code review Days 1-2, pivot to rebuild by Day 3 if needed |
| Performance degradation from filters | Low (20%) | Medium | Performance testing Day 6, optimize indexes |
| Migration breaks existing permissions | Medium (25%) | High | Comprehensive testing, rollback plan ready |

---

## Technical Notes

**Approach:** Refactor (not rebuild) for faster delivery
**Timeline Benefit:** 2-3 days faster than rebuild
**Trade-off:** Some technical debt remains, may require another refactor in 6-12 months
**User Approved Temporary Solution:** "Open access mode" acceptable during development

**When to Pivot to Rebuild:**
- If refactoring reveals deeper structural issues during Days 1-2
- If performance testing shows query filter impact > 15%
- If migration complexity exceeds estimates
- If team consensus shifts during implementation

---

**Created:** 2025-10-18 20:50:15
**Last Updated:** 2025-10-18 20:50:15 (via bash `date '+%Y-%m-%d %H:%M:%S'`)
**Status:** Ready for story creation
