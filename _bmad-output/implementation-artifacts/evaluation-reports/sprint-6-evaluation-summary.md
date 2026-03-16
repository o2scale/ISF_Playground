# Sprint 6 Evaluation Summary

**Date:** March 16, 2026
**Evaluators:** Winston (Architect), Quinn (QA), Amelia (Dev)
**Source Reports:**
- [architect-evaluation-report.md](architect-evaluation-report.md)
- [qa-evaluation-report.md](qa-evaluation-report.md)
- [dev-code-review-report.md](dev-code-review-report.md)

---

## Consolidated Findings by Severity

### CRITICAL (Immediate Action Required)

| # | Finding | Source | Recommended Action |
|---|---------|--------|--------------------|
| C1 | **Production MongoDB Atlas credentials hardcoded** in `backend/scripts/fix_admin_scope.js` — username `admin`, password `admin0987` in committed source | Dev | Rotate password immediately. Replace with `process.env.MONGO_URI`. Audit git history. |
| C2 | **FR controller (biometric data) has zero tests** — primary student auth path entirely untested | QA | Write integration tests for register/recognize/delete flows before next sprint |
| C3 | **Medical records controller has zero tests** — PHI-equivalent data with no coverage | QA | Write controller tests for medicalRecordController.js |
| C4 | **Coin service at 2.71% coverage** — 894 lines of financial logic (earning, spending, refunds) virtually untested | QA | Create coin service integration tests covering earn/spend/refund paths |

### HIGH (Address Before Next Sprint)

| # | Finding | Source | Recommended Action |
|---|---------|--------|--------------------|
| H1 | **User vs Student model redundancy** — enum casing mismatch (`"male"` vs `"Male"`), Student used by only `frController.js`. Blocks reliable cross-querying. | Architect | Migrate frController to use User model, deprecate Student. Est: 4-6 hours. |
| H2 | **173 console.log statements in production code** — includes debug artifacts (`"abccc"` in taskController) and user data logging in auth middleware | Dev | Bulk remove or replace with structured logger. Security risk in auth middleware logging. |
| H3 | **RBAC tests verify middleware wiring but not data isolation** — 112 tests check `getScopeFilter()` returns correct objects, don't verify controllers actually apply filters to DB queries | QA | Add integration tests that create data across balagruhas and verify query isolation |
| H4 | **`routes/auth.js` is a 486-line god route** with inline controllers, direct model queries, JWT signing, bcrypt — no separation of concerns | Architect | Extract `authController.js`. Highest-value single refactoring task. |
| H5 | **ActivityLog model completely orphaned** — imported nowhere in the codebase | Dev | Archive or remove. Safe to delete. |
| H6 | **MachineAssignment model orphaned with broken `ref: "Admin"`** — references non-existent Admin model | Dev | Archive or remove. The `ref: "Admin"` would throw on populate. |
| H7 | **Ghost "Report" model** referenced by User.performanceReports and Student.performanceReports — model doesn't exist. Defensively excluded in 19 DA projection objects. | Dev | Remove the `performanceReports` field from both schemas. Clean up DA projections. |
| H8 | **forceExit: true in jest.config.js** masks resource leaks — worker force-exit warnings appear on every run | QA | Investigate open handles, remove forceExit. |

### MEDIUM (Next Sprint Backlog)

| # | Finding | Source | Recommended Action |
|---|---------|--------|--------------------|
| M1 | **3 data access patterns coexist** — ~25 controllers use direct model access, ~8 use services, ~18 use full DA stack | Architect | Establish forward rule: new/modified controllers must use Service→DA pattern. Add to project-context.md. |
| M2 | **15+ scripts with hardcoded MongoDB URIs** using 3 different database names | Dev | Centralize to env vars. Add to .env.example. |
| M3 | **Medical domain stores doctor/hospital as strings** despite Doctor/Hospital models existing with full CRUD APIs | Dev/Architect | Plan migration: add ObjectId refs, write data migration script, update controller queries. |
| M4 | **Missing indexes on 15+ frequently queried reference fields** (balagruhaId, userId, studentId on various models) | Architect | Add compound indexes on high-traffic query patterns. |
| M5 | **12 TODO/FIXME comments remain** — 1 security-relevant in wtf.js | Dev | Triage and resolve or convert to backlog items. |
| M6 | **purchaseRequestController.js (1,578 lines)** and **inventoryController.js (1,033 lines)** are god controllers | Architect | Extract service layers in next sprint when touching these files. |
| M7 | **24+ controllers have zero test coverage** including analytics, quiz, role, content, all 12 LMS controllers | QA | Prioritize by data sensitivity. Target 5 more controller test files next sprint. |
| M8 | **Playwright E2E tests not runnable in CI** — require frontend+backend servers | QA | Set up CI pipeline with server startup or Docker compose. |
| M9 | **Inline `require()` calls in 9 files** indicate circular dependency pressure | Architect | Investigate and restructure imports where possible. |
| M10 | **7 models with minimal/no validation** — Medical model has zero required fields | Architect | Add validation to models handling sensitive data first. |

### LOW (Future Improvement)

| # | Finding | Source | Recommended Action |
|---|---------|--------|--------------------|
| L1 | PascalCase field names in MachineAssignment and MachineActiveLog | Dev | Fix when touching these models (if not archived). |
| L2 | 3 different file naming conventions for model files | Dev | Standardize on camelCase when files are modified. |
| L3 | Potentially superseded legacy models (purchaseOrders, repairRequests) | Dev | Verify usage, consolidate if confirmed. |
| L4 | Mixed model export patterns (some cached, some not) — mostly resolved in Story 5.1 | Dev | All 45 now use cached pattern. Monitor for regressions. |
| L5 | Test password `password123` hardcoded in utility scripts | Dev | Use env vars for test credentials. |

---

## Sprint 6 Metrics

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Test Suites | 13 passing / 12 failing | 34 passing / 0 failing | +21 passing, -12 failing |
| Tests | 320 passing / 68 failing | 711 passing / 0 failing | +391 passing, -68 failing |
| Statement Coverage | 29.77% | 39.62% | +9.85pp |
| Branch Coverage | 22.55% | 30.47% | +7.92pp |
| Function Coverage | 25.74% | 34.49% | +8.75pp |
| Line Coverage | 30.21% | 39.92% | +9.71pp |
| Models Documented | 0 | 45/45 | Complete |
| RBAC Gaps | 23 | 0 | All resolved |
| FR TODOs | 3 | 0 | All resolved |
| ORM Compliant Models | 8/45 | 45/45 | Complete |

---

## Recommended Priority for Next Sprint

1. **Rotate leaked credentials** (C1) — do this today
2. **Write tests for FR and medical controllers** (C2, C3) — highest risk untested paths
3. **Consolidate User/Student models** (H1) — blocks clean data access
4. **Extract authController.js from routes/auth.js** (H4) — highest-value refactor
5. **Remove console.logs from production code** (H2) — security + noise reduction
6. **Add RBAC data isolation integration tests** (H3) — current tests are surface-level
