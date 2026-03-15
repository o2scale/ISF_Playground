# ISF Playground — Action Plan: Documentation, Tests & Alignment

**Date:** 2026-03-15
**Prepared by:** BMad Master (Post-Reorganization Audit)

---

## Situation Assessment

Three parallel audits were conducted covering test coverage, doc-code alignment, and sprint planning artifacts. The findings reveal significant gaps that need structured attention.

### Key Numbers

| Dimension | Current State | Target |
|-----------|--------------|--------|
| Backend test coverage | 19.5% (30/154 files) | 70%+ |
| Frontend test coverage | ~16% (10/60+ files) | 50%+ |
| E2E test coverage | 0% | Critical paths covered |
| Documentation accuracy | ~60% | 95%+ |
| Sprint documentation | 2 of 5 sprints | All sprints |
| Features with BMAD docs | ~40% | 100% |

---

## Part 1: Test Coverage — Critical Gaps

### Backend Test Coverage by Layer

| Layer | Total | Tested | Coverage | Priority |
|-------|-------|--------|----------|----------|
| Controllers | 38 | 3 | 7.9% | CRITICAL |
| Services | 32 | 1 | 3.1% | CRITICAL |
| Models | 45 | 17 | 37.8% | MEDIUM |
| Routes | 13+ | 4 | 30.8% | HIGH |
| Middleware | 6 | 2 | 33.3% | HIGH |
| Data-Access | 20 | 3 | 15% | MEDIUM |

### Backend: What IS Well-Tested

| System | Test Lines | Grade |
|--------|-----------|-------|
| WTF (Wall of Fame) | 5,885 lines | EXCELLENT |
| RBAC/Permissions | 517 lines | GOOD |
| Purchase Request State Machine | 530 lines | GOOD |
| Vendor Management | 389 lines | GOOD |

### Backend: CRITICAL Untested Controllers (by file size = complexity)

| Controller | Size | Business Impact | Priority |
|------------|------|----------------|----------|
| purchaseRequestController.js | 51KB | Financial transactions, procurement lifecycle | P0 |
| userController.js | 37KB | Auth, user management, security | P0 |
| inventoryController.js | 29KB | Stock management, reporting | P0 |
| orderController.js | ~15KB | E-commerce orders | P1 |
| shopController.js | ~14KB | Shop operations | P1 |
| coinController.js | ~10KB | Virtual currency | P1 |
| courseController.js | ~12KB | LMS courses | P1 |
| frController.js | ~10KB | Facial recognition | P2 |
| quizController.js | ~10KB | Assessments | P2 |

### Frontend Test Coverage

| Area | Files | Tested | Coverage |
|------|-------|--------|----------|
| Pages | 35+ | 2 | 5.7% |
| Component directories | 24 | 3 | 12.5% |
| E2E tests | N/A | 0 | 0% |

**What IS tested (frontend):** Purchase Management components (ShopInventoryView has 604 lines of tests — best-tested area)

**What is NOT tested at all:**
- All admin pages
- All student pages
- All coach pages
- Authentication/login flows
- Cart & checkout
- Dashboard components
- Navigation & routing
- RBAC UI components

### Test Infrastructure Assessment

| Capability | Backend | Frontend |
|------------|---------|----------|
| Unit tests | Jest + MongoDB Memory Server | Jest + React Testing Library |
| Mock utilities | Well-developed (mockRequest, mockResponse, generators) | Basic API mocking |
| Integration tests | Partial (routes hit mock DB) | None |
| E2E tests | None | None (Playwright dep exists but no tests) |
| CI/CD integration | None documented | None documented |
| Coverage reporting | Configured (70% threshold) | Not configured |

---

## Part 2: Documentation — Alignment Issues

### Document-by-Document Assessment

| Document | Status | Key Issues |
|----------|--------|-----------|
| `project-context.md` | MOSTLY ACCURATE | Sprint 2 status unclear; Sprint 5 status contradicts sprint-status.yaml; missing models |
| `backend/BACKEND_DOCUMENTATION.md` | SIGNIFICANTLY STALE | Missing v2 endpoints, missing 20+ models/controllers, falsely claims "no tests" |
| `backend/CONTROLLER-SCOPE-FILTER-GUIDE.md` | ACCURATE | No changes needed |
| `frontend/FRONTEND-RBAC-INTEGRATION.md` | ACCURATE | No changes needed |
| `_bmad-output/architecture.md` | MOSTLY ACCURATE | Route paths don't match actual implementation |
| `_bmad-output/bmm-workflow-status.yaml` | INCOMPLETE | Only tracks Sprint 5, no overall project status |
| `_bmad-output/index.md` | STALE | Needs regeneration after reorganization |

### Specific Discrepancies Found

**1. Sprint Status Contradictions**
- `project-context.md` claims Sprint 5 "100% COMPLETE"
- `sprint-status.yaml` shows stories 1.2, 2.2 as "backlog" and 3.1-3.3, 4.1 as "review"
- These need reconciliation — which is the truth?

**2. Missing Feature Documentation**
Features that exist in code but have NO BMAD planning docs:
- LMS system (courses, quizzes, assignments, grading) — 15+ route files, 10+ controllers
- WTF system (Wall of Fame) — 7 models, well-tested but undocumented in BMAD
- Medical/Health system — check-ins, mood tracking, doctor visits
- Facial Recognition — check-in system
- Sports & Music modules
- Offline queue system
- Notification system
- Attendance system
- Balagruha (facility) management

**3. Route Path Documentation Mismatch**
- Docs reference: `/api/v2/shop/admin/vendors`
- Actual code: `/api/v2/vendor`
- Docs reference: `/api/v2/shop/admin/purchase-requests`
- Actual code: `/api/v2/purchase-requests`

**4. Backend Documentation Claims "No Tests"**
`BACKEND_DOCUMENTATION.md` states "Currently no automated tests are implemented" — this is FALSE. There are 22 backend test files with 7,890 lines of test code.

---

## Part 3: Sprint Planning — Gaps

### Sprint Coverage

| Sprint | BMAD Docs | Status | Notes |
|--------|-----------|--------|-------|
| Sprint 1 (Foundation) | NONE | Claimed COMPLETE | Auth, RBAC, FR, user mgmt — no planning artifacts exist |
| Sprint 2 (Code Quality) | COMPLETE | COMPLETE | 3 stories, all completion reports |
| Sprint 3 | NONE | UNKNOWN | No artifacts found |
| Sprint 4 | NONE | UNKNOWN | No artifacts found |
| Sprint 5 (Purchase Manager) | COMPLETE | IN PROGRESS | 20 stories, PRD, architecture, test plans |

### Missing Planning Artifacts

| Artifact | Status | Impact |
|----------|--------|--------|
| Product Brief / Vision | MISSING | No master vision document for the overall product |
| Product Roadmap | MISSING | No future sprint planning beyond Sprint 5 |
| Sprint 1 retrospective | MISSING | Foundation sprint has no docs |
| Sprint 3-4 artifacts | MISSING | Unknown if these sprints happened |
| Go-live criteria | MISSING | No definition of MVP or launch readiness |
| LMS PRD | MISSING | Major feature module undocumented |
| WTF PRD | MISSING | Well-built feature with no planning docs |
| Medical/Health PRD | MISSING | Feature exists but no specs |

### Sprint 5 Status Clarification Needed

Stories with unclear status:
- **1.2 ShopItem Refactor** — sprint-status.yaml says "backlog" but `approvedVendors` field exists in code
- **2.2 Staff Request UI** — "backlog" but CreatePurchaseRequestModal exists
- **3.1-3.3 Dashboards** — "review" status — are they implemented or not?
- **4.1 Stock Reconciliation** — "review" — StockReconciliationView.jsx exists in frontend

---

## Action Plan — Prioritized

### Tier 1: IMMEDIATE (This Week)

#### A1. Reconcile Sprint 5 Status
**Owner:** Dev (with SM agent)
**Action:** Walk through each Sprint 5 story and update sprint-status.yaml to reflect actual implementation state. Many "backlog"/"review" items appear to be implemented.
**Command:** `/bmad-bmm-sprint-status`

#### A2. Regenerate project-context.md
**Owner:** Dev (with generate-project-context workflow)
**Action:** Regenerate to reflect reorganized structure, accurate sprint statuses, and current file paths.
**Command:** `/bmad-bmm-generate-project-context`

#### A3. Rewrite BACKEND_DOCUMENTATION.md
**Owner:** Dev (with tech-writer or document-project workflow)
**Action:** Complete rewrite — current version is dangerously stale. Must include:
- All v2 routes and LMS routes
- All 38 controllers
- All 45 models
- Correct test coverage information
- Updated project structure post-reorganization
**Command:** `/bmad-bmm-document-project`

### Tier 2: HIGH PRIORITY (Next 1-2 Weeks)

#### A4. Backend Test Coverage — P0 Controllers
**Owner:** Dev (with QA agent)
**Action:** Write tests for the 3 critical untested controllers:
1. `purchaseRequestController.js` (51KB) — state machine, RBAC, financial
2. `userController.js` (37KB) — auth, profiles, security
3. `inventoryController.js` (29KB) — stock management
**Estimated effort:** 1,200-1,500 lines of tests
**Command:** `/bmad-bmm-qa-generate-e2e-tests` for each

#### A5. Frontend E2E Test Foundation
**Owner:** Dev (with QA agent)
**Action:** Set up Playwright (dependency already exists) and write E2E tests for critical flows:
1. Login flow (admin, coach, student)
2. Purchase request lifecycle (create → approve → deliver)
3. Shop checkout flow
4. Dashboard loading and navigation
**Estimated effort:** 500-800 lines

#### A6. Create Product Brief for Undocumented Features
**Owner:** Dev (with PM/Analyst agent)
**Action:** Create retroactive product brief covering the full ISF Playground scope, including LMS, WTF, Medical, Sports, Music — features that were built without BMAD but need documentation for future maintenance.
**Command:** `/bmad-bmm-create-product-brief`

### Tier 3: MEDIUM PRIORITY (Next 2-4 Weeks)

#### A7. Backend Test Coverage — P1 Controllers
**Action:** Tests for orderController, shopController, coinController, courseController
**Estimated effort:** 800-1,200 lines

#### A8. Split frontend/src/api.js
**Action:** Break 2,198-line monolith into feature modules:
```
src/api/ → auth.js, users.js, courses.js, shop.js, inventory.js,
           purchaseRequests.js, medical.js, wtf.js, coins.js, etc.
```
**Create as BMAD story:** `/bmad-bmm-create-story`

#### A9. Frontend Test Coverage — Critical Pages
**Action:** Tests for login pages, dashboard, admin pages, student pages
**Estimated effort:** 600-1,000 lines

#### A10. Update Architecture Document
**Action:** Fix route path references, add LMS/WTF architecture, update structure post-reorg

### Tier 4: ONGOING

#### A11. Establish CI/CD Test Pipeline
**Action:** Configure GitHub Actions or equivalent to run tests on PR
**Coverage gates:** Backend 70%, Frontend 50%

#### A12. Create Product Roadmap
**Action:** Plan Sprint 6+ with proper BMAD workflow
**Command:** `/bmad-bmm-sprint-planning`

#### A13. Consolidate Dual Dependencies
**Action:** Choose one drag-and-drop library (@dnd-kit vs @hello-pangea/dnd) and one icon library (FontAwesome vs Lucide)

---

## Test Coverage Action Matrix

### Backend — What to Test First (Ordered by Risk)

| # | File | Size | Risk Area | Est. Lines | Sprint |
|---|------|------|-----------|-----------|--------|
| 1 | purchaseRequestController.js | 51KB | Financial, state machine | 500 | Next |
| 2 | userController.js | 37KB | Auth, security | 400 | Next |
| 3 | inventoryController.js | 29KB | Stock management | 350 | Next |
| 4 | auth.js (middleware) | ~5KB | Authentication | 200 | Next |
| 5 | orderController.js | ~15KB | E-commerce | 300 | Next+1 |
| 6 | shopController.js | ~14KB | Shop operations | 250 | Next+1 |
| 7 | coinController.js | ~10KB | Virtual currency | 200 | Next+1 |
| 8 | courseController.js | ~12KB | LMS courses | 250 | Next+2 |
| 9 | frController.js | ~10KB | Facial recognition | 200 | Next+2 |
| 10 | quizController.js | ~10KB | Assessments | 200 | Next+2 |

### Frontend — What to Test First (Ordered by User Impact)

| # | Area | Components | Est. Lines | Sprint |
|---|------|-----------|-----------|--------|
| 1 | E2E: Login flows | FaceIdLogin, StudentLogin, logincard | 300 | Next |
| 2 | E2E: Purchase lifecycle | CreateRequest → Approve → Deliver | 400 | Next |
| 3 | Dashboard components | admin, coach, student dashboards | 300 | Next+1 |
| 4 | Cart & Checkout | Cart, Checkout, OrderHistory | 250 | Next+1 |
| 5 | Student course pages | ComputerApps, Art, SpokenEnglish | 200 | Next+2 |
| 6 | Admin management | UserManagement, RBAC, CourseManagement | 250 | Next+2 |

---

## Documentation Update Checklist

### Must Update Now
- [ ] Reconcile Sprint 5 story statuses (sprint-status.yaml vs reality)
- [ ] Regenerate project-context.md (post-reorganization)
- [ ] Rewrite BACKEND_DOCUMENTATION.md (significantly stale)
- [ ] Regenerate _bmad-output/index.md (post-reorganization)

### Should Update Soon
- [ ] Update architecture.md route paths
- [ ] Update bmm-workflow-status.yaml with full project status
- [ ] Create retroactive product brief for full product scope
- [ ] Document LMS module (routes, controllers, models)
- [ ] Document WTF module architecture

### Nice to Have
- [ ] Create Sprint 1 retrospective documentation
- [ ] Clarify Sprint 3-4 existence/status
- [ ] Create go-live readiness criteria
- [ ] Create product roadmap
- [ ] Add API contract documentation for all v2 endpoints

---

## Recommended Execution Order

```
Week 1:  A1 (Sprint 5 status) + A2 (project-context) + A3 (backend docs)
Week 2:  A4 (P0 controller tests) — start with purchaseRequestController
Week 3:  A4 continued (userController, inventoryController) + A5 (E2E setup)
Week 4:  A6 (product brief) + A7 (P1 controller tests)
Ongoing: A8-A13 as capacity allows
```

Each action item can be executed as a BMAD workflow or story using the installed agents and commands.
