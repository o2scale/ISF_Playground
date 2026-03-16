---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation-skipped
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
  - step-12-complete
status: complete
completedAt: '2026-03-16'
lastEdited: '2026-03-16'
editHistory:
  - date: '2026-03-16'
    changes: 'Post-validation improvements: tightened FR32 specificity, quantified NFR8 accessibility, added Growth feature rationale'
inputDocuments:
  - _bmad-output/project-planning-artifacts/product-brief-ISF_Playground-2026-03-15.md
  - project-context.md
  - _bmad-output/sprint-reconciliation-report.md
  - _bmad-output/architecture.md
documentCounts:
  briefs: 1
  research: 0
  brainstorming: 0
  projectDocs: 3
classification:
  projectType: web_app
  domain: edtech
  complexity: medium
  projectContext: brownfield
workflowType: 'prd'
---

# Product Requirements Document - ISF_Playground

**Author:** Dev
**Date:** 2026-03-16
**Sprint:** 6 (NEW) — Stabilization & Documentation

## Executive Summary

ISF Playground is a brownfield MERN stack web application serving the Initiative Sewa Foundation's network of Balagruhas (children's homes) across India. The platform digitizes education delivery (LMS), student engagement (ISF Coins + Wall of Fame), procurement (4-step purchase lifecycle), health tracking, and facility operations — serving 9 distinct user roles through a browser-based interface.

**Current state:** 3 planned sprints executed (1, 2, 5) plus 3 unplanned efforts (Sprint 1.1 RBAC/FR rebuild, Sprint 6 bug fixes, S2-CQ code quality initiative). Sprint 2 remains 64% complete (Amma role and WhatsApp unbuilt). Sprints 3 (Mobile) and 4 (Emergency/SOS) have not been started. The codebase contains 45 Mongoose models, 28 route mounts, 90+ backend tests, and 9 Playwright E2E tests.

**This PRD defines Sprint 6 (NEW) — the Stabilization Sprint.** Rather than adding user-facing features, Sprint 6 fortifies the existing foundation through two parallel tracks:

1. **Quality & Code** — Fix 14 legacy failing test suites, complete RBAC scope filter enforcement across all controllers, remove FR route permission TODOs, build Machine Management frontend UI (backend exists with zero frontend), audit ORM quality, and expand test coverage.

2. **Database & Architecture Documentation** — Full schema mapping of all 45 Mongoose models (fields, types, refs, indexes, virtuals, validation), data flow documentation between models, controller-to-model dependency mapping, and architecture diagrams. This documentation is a **prerequisite** for safely executing Sprints 2, 3, and 4.

**Execution order:** Sprint 6 (Stabilize) FIRST → Sprint 2 (Complete remaining) → Sprint 3 (Mobile) → Sprint 4 (Emergency).

## What Makes This Special

Sprint 6 is an architectural reckoning. ISF Playground has grown organically across multiple sprint efforts — but 21 features remain partial, RBAC enforcement is inconsistent across controllers, and 14 test suites have pre-existing failures. The risk is not missing features — it is building MORE features on an undocumented, inconsistently enforced foundation.

The database schema documentation is the critical output. No unified map exists of how the 45 models relate, which controllers touch which models, or where data flows cross boundaries. Without this map, Sprint 2 (Amma role touches User, Student, Notification models), Sprint 3 (Mobile needs offline-aware data access), and Sprint 4 (Emergency/SOS needs health + notification integration) all risk creating redundant schemas or breaking existing data flows.

## Project Classification

| Dimension | Value |
|-----------|-------|
| **Project Type** | Web Application (MERN stack SPA) |
| **Domain** | EdTech — Integrated Children's Welfare & Education Platform |
| **Complexity** | Medium (multi-domain business logic, 9 roles, 45 models) |
| **Project Context** | Brownfield — active codebase, 3 completed sprints |
| **Sprint Scope** | Sprint 6 (NEW) — Stabilization & Documentation |
| **Sprint Priority** | Foundation hardening before feature expansion |

## Success Criteria

### User Success

Sprint 6 is primarily an infrastructure sprint — direct user-facing changes are limited to Machine Management UI. User success is measured indirectly:

- **Machine Management UI** — Admins can register machines, assign them to Balagruhas, and view machine usage logs through the browser. No backend changes needed (API already exists). Success: admin can complete full machine CRUD workflow end-to-end.
- **Zero regressions** — No existing user-facing feature breaks as a result of RBAC enforcement completion or test fixes. All current workflows (LMS, Shop, Purchase Management, Medical) continue functioning.

### Business Success

- **Sprint 2/3/4 unblocked** — The database architecture documentation enables confident planning for remaining sprints. ISF leadership can see a clear technical roadmap.
- **Reduced technical risk** — 14 failing test suites resolved (either fixed or triaged as stale/deleted). RBAC gaps closed. FR permission TODOs removed. The codebase is demonstrably more reliable than before Sprint 6.
- **Documentation for onboarding** — Database schema map and architecture diagrams allow new developers (or AI agents) to understand the system without archaeology.

### Technical Success

| Metric | Target | Measurement |
|--------|--------|-------------|
| Legacy test suites fixed | 14/14 resolved (fix or triage-delete) | `npx jest --verbose` — zero pre-existing failures |
| RBAC scope filter coverage | 100% of controllers apply getScopeFilter() | Audit all controllers against checkPermission middleware |
| FR route RBAC TODOs | 0 remaining | Grep for TODO in FR routes returns empty |
| Machine Management frontend | Full CRUD UI operational | Admin can register, edit, assign, view machines |
| ORM quality audit | 45/45 models verified | S2-CQ standardization confirmed complete and correct |
| Database schema documentation | All 45 models mapped | `database-architecture.md` with fields, refs, indexes, data flows |
| Architecture diagrams | System overview + data flow + components | Included in architecture docs |
| Test coverage trend | Increasing from current baseline | `npx jest --coverage` shows improvement |

### Measurable Outcomes

- **Before Sprint 6:** 14 failing test suites, inconsistent RBAC, undocumented model relationships, no Machine Management UI
- **After Sprint 6:** Zero legacy test failures, uniform RBAC enforcement, complete 45-model schema map with data flow documentation, Machine Management UI live, architecture diagrams produced

## User Journeys

### Journey 1: Dev — The AI Agent Fixing Legacy Test Suites

**Opening Scene:** Dev opens the test runner and sees 14 test suites failing — failures that predate all recent work. Some are stale tests for refactored code, some are regressions nobody caught, some are configuration issues. Dev doesn't know which are which.

**Rising Action:** Dev triages each failing suite: reads the test, checks if the tested code still exists, runs it in isolation, checks git blame for when it last passed. For each suite, Dev decides: fix the test (if the code works but the test is wrong), fix the code (if there's a real regression), or delete the test (if the code was removed/refactored and the test is stale).

**Climax:** `npx jest --verbose` runs clean — zero pre-existing failures. The test suite is now a reliable signal: if something fails, it means something is actually broken.

**Resolution:** Future sprints can trust the test suite. CI becomes meaningful. Regressions get caught before they ship.

**Requirements revealed:** Test triage tooling, understanding of all 14 failing suites, decision framework for fix vs. delete.

---

### Journey 2: Dev — The AI Agent Enforcing RBAC Scope Filters

**Opening Scene:** Dev audits the controllers and discovers that `getScopeFilter()` — the middleware that ensures coaches only see their own Balagruha's data — is applied inconsistently. Some controllers use it, others don't. A coach at Balagruha A could potentially see data from Balagruha B.

**Rising Action:** Dev systematically audits every controller, checking which ones use `checkPermission` but skip scope filtering. For each gap, Dev adds the appropriate `getScopeFilter()` call, ensuring the data isolation matches the role's scope (own/balagruha/all). Dev also removes TODO comments from FR routes and replaces them with actual permission checks.

**Climax:** Every controller that serves role-scoped data now enforces scope filtering. A coach sees only their Balagruha's students, purchase requests, and medical records — no cross-Balagruha data leakage.

**Resolution:** RBAC is trustworthy. Sprint 2's Amma role can be built with confidence that scope isolation works system-wide.

**Requirements revealed:** Controller audit checklist, scope filter patterns per controller type, FR route permission mapping.

---

### Journey 3: Amit — The Admin Managing Machines

**Opening Scene:** Amit (Admin) needs to register new computers that arrived at a Balagruha. He knows the backend API exists — machines were set up during Sprint 1 — but there's no UI. He's been asking Dev to run scripts manually.

**Rising Action:** Amit navigates to the new Machine Management page in the admin panel. He registers a machine by entering its MAC address and serial number, assigns it to a specific Balagruha, and sees it appear in the machine list. He can edit assignments, view usage logs, and deactivate machines that are retired.

**Climax:** Amit assigns 5 machines across 2 Balagruhas in 10 minutes — something that previously required developer intervention for each one.

**Resolution:** Machine management is self-service for admins. When MAC address validation is re-enabled for production, Amit already has all machines registered.

**Requirements revealed:** Machine CRUD UI, Balagruha assignment UI, machine list with status/filters, usage log view.

---

### Journey 4: Dev — The AI Agent Mapping Database Architecture

**Opening Scene:** Dev is asked to plan the Amma role (Sprint 2). The first question: "What models does the Amma role need to interact with?" Nobody knows. There are 45 Mongoose models spread across `backend/models/` but no documentation of how they relate, which controllers use which models, or how data flows between them.

**Rising Action:** Dev reads every model file, documents fields/types/refs/indexes/virtuals/validation for each one. Dev traces `require()` statements from controllers to models, building a dependency graph. Dev maps data flows — how a PurchaseRequest triggers InventoryTransaction updates which modify ShopItem stock levels.

**Climax:** A complete `database-architecture.md` exists with: full schema for all 45 models, relationship diagram, controller-to-model dependency map, and data flow documentation for key workflows (purchase lifecycle, coin economy, LMS grading, medical check-ins).

**Resolution:** Sprint 2 planning can start from knowledge instead of archaeology. The Amma role design knows exactly which existing models to extend vs. which new models to create.

**Requirements revealed:** Model documentation format, relationship mapping methodology, data flow tracing, output document structure.

---

### Journey Requirements Summary

| Journey | Primary Capability | Sprint 6 Deliverable |
|---------|-------------------|---------------------|
| Legacy Test Fixes | Test triage & repair | 14/14 suites resolved |
| RBAC Enforcement | Security audit & fix | 100% controller coverage |
| Machine Management | Admin UI | Full CRUD frontend |
| Database Architecture | Documentation | 45-model schema map + diagrams |

## Domain-Specific Requirements

### Compliance & Regulatory

- **Student data privacy (COPPA/FERPA awareness):** RBAC scope filter enforcement (Sprint 6 deliverable) directly improves data isolation between Balagruhas. After Sprint 6, no controller should allow cross-Balagruha data access for scoped roles. This is a privacy improvement, not a new risk.
- **No new student data collection:** Sprint 6 does not introduce new PII fields or data collection mechanisms. Database schema documentation is read-only analysis of existing models.

### Technical Constraints

- **Machine Management UI must use existing auth/RBAC patterns:** New frontend pages must use `authenticate` middleware and `checkPermission` for all routes, consistent with existing admin pages.
- **Test fixes must not weaken security tests:** When triaging the 14 failing suites, security-related tests (e.g., `security-rbac.test.js`) must be fixed, never deleted.
- **Database documentation must be accurate:** Schema mapping is derived from actual model files, not assumptions. Any discrepancies found between models and documentation become Sprint 6 findings.

## Web Application Specific Requirements

### Project-Type Overview

ISF Playground is a **Single Page Application (SPA)** — React 19 frontend served via Nginx, communicating with an Express.js 4.21 backend API. Sprint 6 does not change the application type, deployment model, or architecture.

### Technical Architecture Considerations

| Aspect | Current State | Sprint 6 Impact |
|--------|--------------|-----------------|
| **SPA/MPA** | SPA (React Router 7.2) | No change |
| **Browser Support** | Modern browsers (Chrome, Firefox, Edge, Safari) | Machine Management UI must work across same matrix |
| **SEO** | Not applicable (authenticated internal platform) | No change |
| **Real-time** | WebSocket for WTF (Wall of Fame) updates | No change |
| **Accessibility** | Baseline via Radix UI primitives + Tailwind | Machine Management UI must follow existing patterns |
| **Responsive Design** | Desktop-first, mobile-usable | Machine Management UI follows existing patterns |
| **State Management** | Zustand stores | Machine Management may need a new store or extend existing admin state |

### Implementation Considerations

- **Machine Management UI** — The only new frontend feature. Must follow existing patterns: Radix UI components, Tailwind styling, `authenticate` + `checkPermission` middleware on all API calls, existing admin page layout structure.
- **No new API endpoints** — Machine Management backend already exists at `/api/v1/machines`. Frontend consumes existing endpoints.
- **RBAC enforcement changes** — Backend-only. Scope filter enforcement is transparent to the UI — it only changes what data is returned, not how the UI works.
- **Test fixes** — Backend-only. No frontend test changes unless legacy frontend test suites are among the 14 failing.

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Problem-Solving MVP — deliver the minimum stabilization work that makes Sprints 2/3/4 safe to execute.
**Resource Requirements:** Single AI agent (Dev) executing stories sequentially. No team coordination overhead. Each deliverable is independently valuable.

### Must-Have Capabilities (Phase 1 — Sprint 6 Core)

| # | Deliverable | Without this, what fails? | Can it wait? |
|---|------------|--------------------------|--------------|
| 1 | Fix 14 legacy failing test suites | Test suite is unreliable — CI provides no signal | No — compounds with every sprint |
| 2 | RBAC scope filter enforcement | Cross-Balagruha data leakage risk | No — security gap |
| 3 | FR route RBAC TODOs | FR routes lack permission checks | No — security gap |
| 4 | Machine Management frontend UI | Admins can't self-serve machine registration | Could wait, but blocks MAC validation re-enable |
| 5 | Database schema mapping (45 models) | Sprint 2/3/4 planning is guesswork | No — prerequisite for all future sprints |
| 6 | Data flow documentation | Model relationships undocumented | No — part of schema mapping |
| 7 | Controller-to-model dependency map | Unknown blast radius for code changes | No — part of schema mapping |
| 8 | Architecture diagrams | No visual system understanding | No — part of schema mapping |

**All 8 deliverables are Must-Have.** This sprint was scoped specifically as "the minimum to stabilize" — there's no fat to cut.

### Growth Features (Post-Sprint 6)

- ORM quality audit (verify S2-CQ completeness) — deferred because schema documentation (MVP) must complete first to reveal what needs auditing
- Expand test coverage beyond fixing legacy failures — deferred because fixing 14 failing suites (MVP) establishes the baseline; expansion builds on that baseline
- Identify missing indexes, redundant fields, or schema inconsistencies — deferred because these emerge as findings from the schema mapping work (MVP), not as upfront tasks
- Controller optimization story 1.3 completion (API response standardization) — carried from S2-CQ, lower priority than security and documentation work

### Post-Sprint 6 Roadmap

**Phase 2 — Sprint 2 Completion:**
- Amma role: query management, SLA tasks, dashboard
- WhatsApp API integration
- Explicit manual coin award API for coaches
- Comprehensive course reporting/analytics
- Live voice communication (beyond upload)

**Phase 3 — Sprints 3 & 4:**
- Mobile app (PWA or native) for Coaches/Admins/BICs
- FR-based attendance via photo upload
- Push notifications (FCM)
- SOS emergency alert system
- Internal messaging between staff roles
- Advanced donor reporting dashboard

### Risk Mitigation Strategy

**Technical Risks:**
- *RBAC enforcement could block legitimate access* — Run existing E2E suite + manual smoke test of each role after enforcement changes. Fix any false negatives before merging.
- *Test triage could delete tests that matter* — Record coverage baseline before triage. Coverage must not decrease. Security tests are never deleted, only fixed.
- *Schema documentation could be inaccurate* — Cross-reference model files with actual MongoDB collections. Document discrepancies as findings.

**Resource Risks:**
- *Sprint 6 scope is too large for one sprint cycle* — Deliverables are independent. If time-constrained, prioritize: (1) RBAC enforcement, (2) database schema mapping, (3) test triage, (4) Machine Management UI. The first two are prerequisites; the latter two are high-value but not blocking.

## Functional Requirements

### Test Suite Stabilization

- **FR1:** Dev can identify all legacy failing test suites and classify each as stale, regression, or configuration issue
- **FR2:** Dev can fix failing tests where the underlying code is correct but the test is outdated
- **FR3:** Dev can fix code regressions where the test correctly identifies broken behavior
- **FR4:** Dev can delete stale tests where the tested code no longer exists, with documented justification
- **FR5:** Dev can run the complete backend test suite with zero pre-existing failures
- **FR6:** Dev can measure test coverage before and after triage to verify coverage did not decrease

### RBAC Scope Enforcement

- **FR7:** Dev can audit all controllers to identify which ones lack `getScopeFilter()` enforcement
- **FR8:** Dev can add scope filter enforcement to every controller that serves role-scoped data
- **FR9:** The system enforces Balagruha-level data isolation — a coach at Balagruha A cannot access data belonging to Balagruha B through any controller
- **FR10:** Dev can verify RBAC enforcement by running E2E tests across all roles without breaking legitimate access
- **FR11:** Dev can remove all TODO comments from FR (facial recognition) routes and replace them with actual permission checks
- **FR12:** The system applies `checkPermission` middleware on all FR route endpoints

### Machine Management UI

- **FR13:** Admin can view a list of all registered machines with their status, Balagruha assignment, and MAC address
- **FR14:** Admin can register a new machine by entering its MAC address, serial number, and description
- **FR15:** Admin can assign a machine to a specific Balagruha
- **FR16:** Admin can reassign a machine from one Balagruha to another
- **FR17:** Admin can deactivate a machine that has been retired
- **FR18:** Admin can view machine usage logs (active log history) for any registered machine
- **FR19:** Admin can filter and search the machine list by Balagruha, status, or identifier

### Database Schema Documentation

- **FR20:** Dev can produce a complete schema map of all 45 Mongoose models including field names, types, refs, indexes, virtuals, and validation rules
- **FR21:** Dev can document relationships between models (which models reference which other models via ObjectId refs)
- **FR22:** Dev can map data flows for key workflows: purchase lifecycle, coin economy, LMS grading, medical check-ins
- **FR23:** Dev can produce a controller-to-model dependency map showing which controllers read/write which models
- **FR24:** Dev can identify schema inconsistencies, missing indexes, or redundant fields as documented findings

### Architecture Documentation

- **FR25:** Dev can produce a system overview diagram showing all major components and their interactions
- **FR26:** Dev can produce a data flow diagram showing how data moves between models in key workflows
- **FR27:** Dev can produce a component relationship diagram showing frontend-to-backend-to-database layers
- **FR28:** Dev can output documentation as `database-architecture.md` if too large for the existing `architecture.md`

### ORM Quality Audit

- **FR29:** Dev can verify that all 45 models follow the S2-CQ standardization patterns (timestamps, virtuals, model export pattern)
- **FR30:** Dev can identify any models that were missed or incorrectly standardized during S2-CQ
- **FR31:** Dev can document audit findings and corrections made

### Test Coverage Expansion

- **FR32:** Dev can add backend tests for controllers currently at 0% coverage, prioritizing controllers with the most endpoints (target: at least 5 previously untested controllers)
- **FR33:** Dev can measure and report test coverage percentage (target: trending toward 70%)

## Non-Functional Requirements

### Security

- **NFR1:** After RBAC enforcement completion, no API endpoint returns data outside the requesting user's scope (own/balagruha/all) — verified by E2E tests across all 9 roles
- **NFR2:** All facial recognition route endpoints enforce `checkPermission` middleware — zero TODO placeholders remaining
- **NFR3:** Security-related test suites (`security-rbac.test.js` and equivalent) must pass — these are never deleted during test triage, only fixed
- **NFR4:** Machine Management UI enforces admin-only access through existing `authenticate` + `checkPermission` middleware

### Performance

- **NFR5:** Full backend test suite (`npx jest`) completes in under 120 seconds after all 14 legacy suites are resolved
- **NFR6:** Machine Management UI page load time does not exceed existing admin page benchmarks (< 3s authenticated)
- **NFR7:** RBAC scope filter additions do not measurably increase API response times (< 500ms for CRUD operations)

### Accessibility

- **NFR8:** Machine Management UI is fully keyboard-navigable and screen-reader-compatible — all interactive elements (buttons, inputs, dropdowns, tables) are accessible via keyboard tab order and have appropriate ARIA labels, consistent with existing admin pages

### Documentation Quality

- **NFR9:** Database schema documentation covers 100% of the 45 Mongoose models — no model omitted
- **NFR10:** Every model-to-model relationship (ObjectId ref) is documented with direction and cardinality
- **NFR11:** Architecture diagrams use standard notation (Mermaid or equivalent) and are renderable in markdown viewers
- **NFR12:** Controller-to-model dependency map is complete — every controller's model dependencies are listed
- **NFR13:** Documentation is accurate against actual model files at time of writing — verified by cross-referencing source code

### Test Maintenance

- **NFR14:** Test coverage percentage does not decrease after legacy test triage — measured before and after
- **NFR15:** All new tests added during Sprint 6 follow existing patterns documented in `project-context.md` (Jest + mongodb-memory-server, Arrange/Act/Assert structure)
- **NFR16:** Test maintenance rules in `project-context.md` are followed for all code changes made during Sprint 6
