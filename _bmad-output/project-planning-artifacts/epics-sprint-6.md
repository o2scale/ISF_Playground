---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
status: complete
completedAt: '2026-03-16'
inputDocuments:
  - _bmad-output/project-planning-artifacts/prd.md
  - _bmad-output/architecture.md
  - _bmad-output/ux-design-specification.md
---

# ISF_Playground - Sprint 6 Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for ISF_Playground Sprint 6 (Stabilization & Documentation), decomposing the requirements from the PRD, Architecture, and UX Design into implementable stories.

## Requirements Inventory

### Functional Requirements

- FR1: Dev can identify all legacy failing test suites and classify each as stale, regression, or configuration issue
- FR2: Dev can fix failing tests where the underlying code is correct but the test is outdated
- FR3: Dev can fix code regressions where the test correctly identifies broken behavior
- FR4: Dev can delete stale tests where the tested code no longer exists, with documented justification
- FR5: Dev can run the complete backend test suite with zero pre-existing failures
- FR6: Dev can measure test coverage before and after triage to verify coverage did not decrease
- FR7: Dev can audit all controllers to identify which ones lack `getScopeFilter()` enforcement
- FR8: Dev can add scope filter enforcement to every controller that serves role-scoped data
- FR9: The system enforces Balagruha-level data isolation — a coach at Balagruha A cannot access data belonging to Balagruha B through any controller
- FR10: Dev can verify RBAC enforcement by running E2E tests across all roles without breaking legitimate access
- FR11: Dev can remove all TODO comments from FR (facial recognition) routes and replace them with actual permission checks
- FR12: The system applies `checkPermission` middleware on all FR route endpoints
- FR13: Admin can view a list of all registered machines with their status, Balagruha assignment, and MAC address
- FR14: Admin can register a new machine by entering its MAC address, serial number, and description
- FR15: Admin can assign a machine to a specific Balagruha
- FR16: Admin can reassign a machine from one Balagruha to another
- FR17: Admin can deactivate a machine that has been retired
- FR18: Admin can view machine usage logs (active log history) for any registered machine
- FR19: Admin can filter and search the machine list by Balagruha, status, or identifier
- FR20: Dev can produce a complete schema map of all 45 Mongoose models including field names, types, refs, indexes, virtuals, and validation rules
- FR21: Dev can document relationships between models (which models reference which other models via ObjectId refs)
- FR22: Dev can map data flows for key workflows: purchase lifecycle, coin economy, LMS grading, medical check-ins
- FR23: Dev can produce a controller-to-model dependency map showing which controllers read/write which models
- FR24: Dev can identify schema inconsistencies, missing indexes, or redundant fields as documented findings
- FR25: Dev can produce a system overview diagram showing all major components and their interactions
- FR26: Dev can produce a data flow diagram showing how data moves between models in key workflows
- FR27: Dev can produce a component relationship diagram showing frontend-to-backend-to-database layers
- FR28: Dev can output documentation as `database-architecture.md` if too large for the existing `architecture.md`
- FR29: Dev can verify that all 45 models follow the S2-CQ standardization patterns (timestamps, virtuals, model export pattern)
- FR30: Dev can identify any models that were missed or incorrectly standardized during S2-CQ
- FR31: Dev can document audit findings and corrections made
- FR32: Dev can add backend tests for controllers currently at 0% coverage, prioritizing controllers with the most endpoints (target: at least 5 previously untested controllers)
- FR33: Dev can measure and report test coverage percentage (target: trending toward 70%)

### NonFunctional Requirements

- NFR1: After RBAC enforcement completion, no API endpoint returns data outside the requesting user's scope (own/balagruha/all) — verified by E2E tests across all 9 roles
- NFR2: All facial recognition route endpoints enforce `checkPermission` middleware — zero TODO placeholders remaining
- NFR3: Security-related test suites (`security-rbac.test.js` and equivalent) must pass — these are never deleted during test triage, only fixed
- NFR4: Machine Management UI enforces admin-only access through existing `authenticate` + `checkPermission` middleware
- NFR5: Full backend test suite (`npx jest`) completes in under 120 seconds after all 14 legacy suites are resolved
- NFR6: Machine Management UI page load time does not exceed existing admin page benchmarks (< 3s authenticated)
- NFR7: RBAC scope filter additions do not measurably increase API response times (< 500ms for CRUD operations)
- NFR8: Machine Management UI is fully keyboard-navigable and screen-reader-compatible — all interactive elements (buttons, inputs, dropdowns, tables) are accessible via keyboard tab order and have appropriate ARIA labels, consistent with existing admin pages
- NFR9: Database schema documentation covers 100% of the 45 Mongoose models — no model omitted
- NFR10: Every model-to-model relationship (ObjectId ref) is documented with direction and cardinality
- NFR11: Architecture diagrams use standard notation (Mermaid or equivalent) and are renderable in markdown viewers
- NFR12: Controller-to-model dependency map is complete — every controller's model dependencies are listed
- NFR13: Documentation is accurate against actual model files at time of writing — verified by cross-referencing source code
- NFR14: Test coverage percentage does not decrease after legacy test triage — measured before and after
- NFR15: All new tests added during Sprint 6 follow existing patterns documented in `project-context.md` (Jest + mongodb-memory-server, Arrange/Act/Assert structure)
- NFR16: Test maintenance rules in `project-context.md` are followed for all code changes made during Sprint 6

### Additional Requirements

**From Architecture:**
- Machine Management backend exists at `/api/v1/machines` — frontend consumes v1 routes (not v2)
- No starter template needed — brownfield extension of existing codebase
- Admin pages use `Layout` component with full sidebar navigation
- State management: Zustand stores — Machine Management may need a new store or extend existing admin state
- API response format: `{ success, data, message }` standard wrapper
- MongoDB sessions required for any transaction-sensitive operations

**From UX Design:**
- Admin UI uses `Layout` wrapper (sidebar + header), not `StudentLayout`
- Color system: `--primary` (#4361ee) for actions, status colors for machine state indicators
- Typography: System default font stack for admin pages
- Existing admin pages (VendorManagement, InventoryManagement) serve as reference patterns for Machine Management UI
- Responsive: Desktop-first design, Tailwind responsive breakpoints

### FR Coverage Map

```
FR1:  Epic 1 — Identify and classify legacy failing test suites
FR2:  Epic 1 — Fix outdated tests
FR3:  Epic 1 — Fix code regressions
FR4:  Epic 1 — Delete stale tests with justification
FR5:  Epic 1 — Run full suite with zero failures
FR6:  Epic 1 — Measure coverage before/after triage
FR7:  Epic 2 — Audit controllers for scope filter gaps
FR8:  Epic 2 — Add scope filter enforcement
FR9:  Epic 2 — Enforce Balagruha-level data isolation
FR10: Epic 2 — Verify RBAC with E2E tests
FR11: Epic 2 — Remove FR route TODOs
FR12: Epic 2 — Apply checkPermission to FR routes
FR13: Epic 3 — View machine list
FR14: Epic 3 — Register new machine
FR15: Epic 3 — Assign machine to Balagruha
FR16: Epic 3 — Reassign machine
FR17: Epic 3 — Deactivate machine
FR18: Epic 3 — View machine usage logs
FR19: Epic 3 — Filter/search machine list
FR20: Epic 4 — Schema map of all 45 models
FR21: Epic 4 — Document model relationships
FR22: Epic 4 — Map data flows for key workflows
FR23: Epic 4 — Controller-to-model dependency map
FR24: Epic 4 — Identify schema inconsistencies
FR25: Epic 4 — System overview diagram
FR26: Epic 4 — Data flow diagram
FR27: Epic 4 — Component relationship diagram
FR28: Epic 4 — Output as database-architecture.md
FR29: Epic 5 — Verify S2-CQ standardization patterns
FR30: Epic 5 — Identify missed/incorrect models
FR31: Epic 5 — Document audit findings
FR32: Epic 5 — Add tests for 0% coverage controllers
FR33: Epic 5 — Measure and report coverage percentage
```

## Epic List

### Epic 1: Test Suite Reliability
Dev can trust the test suite as a reliable signal — if tests pass, the code works; if tests fail, something is actually broken. CI becomes meaningful.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6
**NFRs addressed:** NFR3, NFR5, NFR14, NFR15

### Epic 2: RBAC Security Enforcement
The system enforces complete Balagruha-level data isolation across all controllers. No role can access data outside its scope. FR routes have real permission checks instead of TODOs.
**FRs covered:** FR7, FR8, FR9, FR10, FR11, FR12
**NFRs addressed:** NFR1, NFR2, NFR7

### Epic 3: Machine Management UI
Admins can register, assign, reassign, deactivate, and monitor machines through the browser — no developer intervention needed.
**FRs covered:** FR13, FR14, FR15, FR16, FR17, FR18, FR19
**NFRs addressed:** NFR4, NFR6, NFR8

### Epic 4: Database & Architecture Documentation
Dev has a complete map of all 45 models, their relationships, data flows, and controller dependencies — enabling informed planning for Sprints 2/3/4.
**FRs covered:** FR20, FR21, FR22, FR23, FR24, FR25, FR26, FR27, FR28
**NFRs addressed:** NFR9, NFR10, NFR11, NFR12, NFR13

### Epic 5: ORM Quality Audit & Test Coverage Expansion
Dev has verified that all 45 models follow standardization patterns, expanded test coverage to previously untested controllers, and established a measurable coverage baseline.
**FRs covered:** FR29, FR30, FR31, FR32, FR33
**NFRs addressed:** NFR16

---

## Epic 1: Test Suite Reliability

Dev can trust the test suite as a reliable signal — if tests pass, the code works; if tests fail, something is actually broken. CI becomes meaningful.

### Story 1.1: Baseline Coverage Measurement

As a Dev,
I want to measure and record the current test coverage baseline before any triage work begins,
So that I can verify coverage does not decrease after resolving legacy failures.

**Acceptance Criteria:**

**Given** the backend test suite exists with 14 known failing suites
**When** Dev runs `npx jest --coverage`
**Then** a coverage report is generated showing branches, functions, lines, and statements percentages
**And** the baseline numbers are recorded in a triage document for comparison after completion

### Story 1.2: Triage & Classify All 14 Failing Test Suites

As a Dev,
I want to identify and classify each of the 14 legacy failing test suites as stale, regression, or configuration issue,
So that I know the correct resolution action for each suite.

**Acceptance Criteria:**

**Given** 14 test suites have pre-existing failures
**When** Dev examines each failing suite (reads test, checks if tested code exists, runs in isolation, checks git blame)
**Then** each suite is classified as one of: stale (code removed/refactored), regression (real bug), or configuration (setup issue)
**And** a triage table is produced listing each suite, its classification, and the recommended action (fix test / fix code / delete)
**And** security-related suites (e.g., `security-rbac.test.js`) are marked as "fix only — never delete" per NFR3

### Story 1.3: Resolve All Legacy Test Failures

As a Dev,
I want to resolve all 14 classified test suites by fixing outdated tests, fixing code regressions, and deleting stale tests with documented justification,
So that the test suite has zero pre-existing failures.

**Acceptance Criteria:**

**Given** the triage table from Story 1.2 with classifications and recommended actions
**When** Dev resolves each suite according to its classification:
- **Stale:** Delete test file with justification documented in triage report
- **Regression:** Fix the underlying code so the test passes
- **Configuration:** Fix test setup/mocks so the test runs correctly
- **Outdated:** Update test assertions to match current correct behavior
**Then** all 14 previously-failing suites are resolved
**And** security-related test suites are fixed, never deleted (NFR3)
**And** all new/modified tests follow existing patterns in `project-context.md` (NFR15)

### Story 1.4: Verify Clean Suite & Coverage Maintained

As a Dev,
I want to run the complete backend test suite and verify zero pre-existing failures with coverage maintained,
So that the test suite is a reliable CI signal going forward.

**Acceptance Criteria:**

**Given** all 14 legacy suites have been resolved in Story 1.3
**When** Dev runs `npx jest --verbose`
**Then** zero test failures from pre-existing issues (new code changes may introduce new failures which must also be fixed)
**And** full suite completes in under 120 seconds (NFR5)
**When** Dev runs `npx jest --coverage`
**Then** coverage percentage is equal to or greater than the baseline recorded in Story 1.1 (NFR14)
**And** results are documented in the triage report as final verification

---

## Epic 2: RBAC Security Enforcement

The system enforces complete Balagruha-level data isolation across all controllers. No role can access data outside its scope. FR routes have real permission checks instead of TODOs.

### Story 2.1: Controller RBAC Audit

As a Dev,
I want to audit all controllers and identify which ones lack `getScopeFilter()` enforcement,
So that I have a complete gap list to systematically close.

**Acceptance Criteria:**

**Given** the backend has controllers across multiple domains (shop, LMS, medical, WTF, user management, etc.)
**When** Dev examines each controller that serves role-scoped data
**Then** an audit report is produced listing every controller, whether it applies `getScopeFilter()`, and the gap status
**And** controllers are categorized as: enforced, missing enforcement, or not applicable (e.g., public endpoints)
**And** the audit identifies which scope levels (own/balagruha/all) each controller should enforce based on the data it serves

### Story 2.2: Scope Filter Enforcement Across All Controllers

As a Dev,
I want to add `getScopeFilter()` enforcement to every controller that serves role-scoped data,
So that a coach at Balagruha A cannot access data belonging to Balagruha B through any endpoint.

**Acceptance Criteria:**

**Given** the audit report from Story 2.1 identifying controllers missing scope enforcement
**When** Dev adds `getScopeFilter()` to each identified controller
**Then** every controller that serves role-scoped data applies the appropriate scope filter (own/balagruha/all)
**And** RBAC scope filter additions do not measurably increase API response times (< 500ms for CRUD operations, NFR7)
**And** existing tests that pass before changes continue to pass after changes
**And** test maintenance rules in `project-context.md` are followed — any modified controller with existing tests has those tests updated (NFR16)

### Story 2.3: FR Route Permission Enforcement

As a Dev,
I want to remove all TODO comments from facial recognition routes and replace them with actual `checkPermission` middleware,
So that FR endpoints have real authorization instead of placeholder comments.

**Acceptance Criteria:**

**Given** FR routes in `v2/facialRecognition.js` contain TODO comments where permission checks should be
**When** Dev replaces each TODO with the appropriate `checkPermission('Resource', 'Action')` middleware call
**Then** zero TODO placeholders remain in FR route files (NFR2)
**And** all FR route endpoints enforce `checkPermission` middleware
**And** the permission checks are appropriate for each endpoint (e.g., register requires admin, recognize requires student/auth)
**And** existing FR functionality (registration, recognition) continues to work correctly after adding permissions

### Story 2.4: RBAC Verification & E2E Testing

As a Dev,
I want to verify RBAC enforcement by running E2E tests across all roles without breaking legitimate access,
So that I can confirm data isolation works correctly and no valid workflows are blocked.

**Acceptance Criteria:**

**Given** scope filter enforcement (Story 2.2) and FR route permissions (Story 2.3) are complete
**When** Dev runs the existing Playwright E2E test suite
**Then** all existing E2E tests pass (no legitimate access blocked)
**And** no API endpoint returns data outside the requesting user's scope (own/balagruha/all) as verified across all 9 roles (NFR1)
**When** Dev performs manual smoke testing with each role type (admin, coach, student, PM, medical, sports, music, BIC, amma)
**Then** each role can only access data within its assigned scope
**And** cross-Balagruha data access attempts are blocked with appropriate error responses

---

## Epic 3: Machine Management UI

Admins can register, assign, reassign, deactivate, and monitor machines through the browser — no developer intervention needed.

### Story 3.1: Machine List View with Filtering

As an Admin,
I want to view a list of all registered machines with their status, Balagruha assignment, and MAC address, and filter/search the list,
So that I can see the current state of all machines across Balagruhas at a glance.

**Acceptance Criteria:**

**Given** the admin is authenticated and has admin role permissions
**When** the admin navigates to the Machine Management page
**Then** a table displays all registered machines with columns: MAC address, serial number, description, assigned Balagruha, status (active/inactive)
**And** the page uses the `Layout` wrapper with sidebar navigation (not `StudentLayout`)
**And** the page is added to the admin sidebar navigation
**And** the admin can filter machines by Balagruha (dropdown), status (active/inactive), or search by MAC address/serial number/description
**And** the page enforces admin-only access via `authenticate` + `checkPermission` middleware (NFR4)
**And** page load time does not exceed 3 seconds (NFR6)
**And** the table is keyboard-navigable with appropriate ARIA labels (NFR8)
**And** the frontend consumes existing `/api/v1/machines` endpoints

### Story 3.2: Machine Registration & Balagruha Assignment

As an Admin,
I want to register a new machine by entering its MAC address, serial number, and description, and assign it to a specific Balagruha,
So that new hardware is tracked in the system and linked to the correct facility.

**Acceptance Criteria:**

**Given** the admin is on the Machine Management page
**When** the admin clicks "Register Machine" and fills in MAC address, serial number, description, and selects a Balagruha from a dropdown
**Then** the machine is created via the existing `/api/v1/machines` API
**And** the machine appears in the machine list with its assigned Balagruha
**And** validation prevents duplicate MAC addresses or serial numbers
**And** the Balagruha dropdown is populated from the existing Balagruha API
**And** all form inputs have appropriate ARIA labels and are keyboard-accessible (NFR8)
**And** the form follows existing admin page patterns (VendorManagement, InventoryManagement as reference)
**And** success/error feedback uses existing toast notification patterns

### Story 3.3: Machine Reassignment & Deactivation

As an Admin,
I want to reassign a machine from one Balagruha to another and deactivate retired machines,
So that machine assignments stay current as hardware moves between facilities or is retired.

**Acceptance Criteria:**

**Given** the admin views an existing machine in the machine list
**When** the admin selects "Edit" on a machine and changes the Balagruha assignment
**Then** the machine's Balagruha assignment is updated via the API
**And** the machine list reflects the new assignment immediately
**When** the admin selects "Deactivate" on a machine
**Then** the machine status changes to inactive
**And** inactive machines remain visible in the list (filtered by status) but are clearly marked as inactive
**And** deactivation requires confirmation (modal or inline confirm) to prevent accidental deactivation
**And** all actions are keyboard-accessible (NFR8)

### Story 3.4: Machine Usage Logs

As an Admin,
I want to view machine usage logs (active log history) for any registered machine,
So that I can monitor which machines are being used, when, and by whom.

**Acceptance Criteria:**

**Given** the admin is on the Machine Management page and selects a specific machine
**When** the admin clicks "View Logs" or expands the machine row
**Then** a usage log view displays the machine's active log history from the `machineactivelog` model
**And** logs show timestamp, user (if available), and session duration
**And** logs are sorted by most recent first
**And** the log view supports pagination for machines with extensive history
**And** the log view is keyboard-navigable with appropriate ARIA labels (NFR8)

---

## Epic 4: Database & Architecture Documentation

Dev has a complete map of all 45 models, their relationships, data flows, and controller dependencies — enabling informed planning for Sprints 2/3/4.

### Story 4.1: Complete Model Schema Mapping

As a Dev,
I want to produce a complete schema map of all 45 Mongoose models including field names, types, refs, indexes, virtuals, and validation rules,
So that every model's structure is documented and discoverable without reading source files.

**Acceptance Criteria:**

**Given** 45 Mongoose models exist in `backend/models/`
**When** Dev reads each model file and documents its schema
**Then** a `database-architecture.md` file is created in `_bmad-output/` containing a schema entry for every model
**And** each model entry includes: collection name, all fields with types, required/optional status, default values, enum values, refs to other models, indexes (single and compound), virtuals, validation rules, and hooks
**And** 100% of the 45 models are documented — no model omitted (NFR9)
**And** documentation is verified accurate against actual model files (NFR13)
**And** models are organized by domain: Core Platform, Shop/Procurement, LMS, WTF/Gamification, Facial Recognition, Medical/Health

### Story 4.2: Model Relationship & Data Flow Documentation

As a Dev,
I want to document all relationships between models and map data flows for key workflows,
So that Sprint 2/3/4 planning knows how models connect and where data moves across boundaries.

**Acceptance Criteria:**

**Given** the schema map from Story 4.1 documents all 45 models with their ObjectId refs
**When** Dev traces every ObjectId ref between models
**Then** every model-to-model relationship is documented with direction and cardinality (one-to-one, one-to-many, many-to-many) (NFR10)
**And** a relationship summary table shows: source model → ref field → target model → cardinality
**When** Dev traces data flows for key workflows
**Then** the following workflow data flows are documented:
- Purchase lifecycle: PurchaseRequest → InventoryTransaction → ShopItem stock updates
- Coin economy: Quiz/Assignment completion → Coin creation → Shop purchase → Coin deduction
- LMS grading: Submission → Coach grading → StudentProgress update → Coin award
- Medical check-ins: MedicalCheckIns → Student health records → Doctor visit tracking
**And** each flow documents which models are read, written, and in what order

### Story 4.3: Controller-to-Model Dependency Map & Findings

As a Dev,
I want to produce a controller-to-model dependency map and identify schema inconsistencies,
So that the blast radius of any code change is known and schema issues are surfaced.

**Acceptance Criteria:**

**Given** the schema map and relationship documentation from Stories 4.1 and 4.2
**When** Dev traces `require()` / model imports from each controller to the models it uses
**Then** a dependency map is produced showing every controller and the models it reads/writes (NFR12)
**And** the map covers all controllers in `backend/controllers/` including nested LMS controllers
**And** each entry shows: controller name → models used → operations (read/write/both)
**When** Dev analyzes the schema map for quality issues
**Then** findings are documented including: missing indexes on frequently queried fields, redundant fields across models, inconsistent naming patterns, fields without validation that should have it, and any orphaned models (defined but never referenced by controllers)

### Story 4.4: Architecture Diagrams

As a Dev,
I want to produce system overview, data flow, and component relationship diagrams,
So that the system architecture is visually understandable for both humans and AI agents planning future sprints.

**Acceptance Criteria:**

**Given** the complete schema map, relationships, data flows, and controller dependencies from Stories 4.1-4.3
**When** Dev creates architecture diagrams
**Then** a system overview diagram shows all major components (React frontend, Express API, MongoDB, Redis, S3, WebSocket) and their interactions
**And** a data flow diagram shows how data moves between models in the key workflows documented in Story 4.2
**And** a component relationship diagram shows the frontend → API routes → controllers → services → models → database layers
**And** all diagrams use Mermaid notation and are renderable in markdown viewers (NFR11)
**And** diagrams are included in `database-architecture.md` (or `architecture.md` if size permits, per FR28)
**And** the existing `_bmad-output/architecture.md` is updated with a reference to the new database architecture document

---

## Epic 5: ORM Quality Audit & Test Coverage Expansion

Dev has verified that all 45 models follow standardization patterns, expanded test coverage to previously untested controllers, and established a measurable coverage baseline.

### Story 5.1: ORM Standardization Audit

As a Dev,
I want to verify that all 45 models follow the S2-CQ standardization patterns and document any deviations,
So that the ORM layer is confirmed consistent and any remaining issues are surfaced for correction.

**Acceptance Criteria:**

**Given** the S2-CQ sprint standardized all 45 models with: `timestamps: true`, `toJSON/toObject: { virtuals: true }`, and the `mongoose.models.ModelName || mongoose.model()` export pattern
**When** Dev audits each of the 45 models against these patterns
**Then** each model is classified as: compliant, non-compliant, or partially compliant
**And** non-compliant or partially compliant models are listed with the specific deviation (missing timestamps, missing virtual config, wrong export pattern)
**When** Dev finds non-compliant models
**Then** the models are corrected to match the standardization patterns
**And** corrections are verified by running existing tests for those models (if tests exist)
**And** all findings and corrections are documented in an audit report
**And** test maintenance rules in `project-context.md` are followed for any code changes (NFR16)

### Story 5.2: Test Coverage Expansion

As a Dev,
I want to add backend tests for controllers currently at 0% coverage, prioritizing controllers with the most endpoints,
So that the test safety net covers more of the codebase and a measurable coverage baseline is established.

**Acceptance Criteria:**

**Given** the test suite is clean (Epic 1 complete) and controller-to-model dependencies are documented (Epic 4)
**When** Dev identifies controllers with 0% test coverage by cross-referencing `backend/controllers/` against `backend/tests/`
**Then** a prioritized list is produced ranking untested controllers by number of endpoints (most endpoints = highest priority)
**When** Dev writes tests for at least 5 previously untested controllers
**Then** each new test file follows existing patterns: Jest + mongodb-memory-server, Arrange/Act/Assert structure, `jest.clearAllMocks()` in beforeEach (NFR15, NFR16)
**And** each test file covers at minimum: one success path and one error/validation path per endpoint tested
**And** new tests pass on first run
**When** Dev runs `npx jest --coverage`
**Then** overall coverage percentage has increased from the baseline established in Story 1.1
**And** the final coverage percentage is documented with a comparison to the Story 1.1 baseline (target: trending toward 70%)
