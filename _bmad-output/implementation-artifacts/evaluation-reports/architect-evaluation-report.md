# Architectural Evaluation Report — Sprint 6 Output Review

**Evaluator:** Winston (Architect)
**Date:** March 16, 2026
**Inputs:** database-architecture.md (Stories 4.1-4.4), architecture.md, project-context.md, codebase verification
**Scope:** Structural health assessment before next sprint planning

---

## 1. Data Access Pattern Fragmentation

**Severity: MEDIUM**

### Findings

The codebase uses three distinct data access patterns simultaneously:

| Pattern | Example | Count (approx.) |
|---|---|---|
| Controller -> Model (direct) | purchaseRequestController.js, adminProductController.js, vendorController.js, contentController.js, questionBankController.js, quizController.js, all 12 LMS controllers | ~25 controllers |
| Controller -> Service -> Model | coinController.js, shopController.js, wtfSettingsController.js | ~8 controllers |
| Controller -> Service -> Data-Access -> Model | doctorController.js, hospitalController.js, balagruha.js, sports.js, music.js, studentMoodTrackerController.js | ~18 controllers |

The three-tier pattern (Controller -> Service -> DA -> Model) exists in `backend/data-access/` with 20 DA files, but adoption is inconsistent. Newer Sprint 5 controllers (purchaseRequest, vendor, adminProduct, inventory) all bypass the service and DA layers entirely.

### Assessment

This is not yet a blocker, but it creates three problems:
1. **Inconsistent testing strategy** -- controllers with direct model access need integration tests; service-backed controllers can be unit-tested with mocked services.
2. **Refactoring cost amplifies over time** -- changing a model's field name requires checking all three patterns.
3. **No clear guidance for new development** -- new controllers copy whatever nearby file they reference, perpetuating the split.

### Recommended Actions

1. **Do NOT attempt a full migration now.** The codebase is stable and functional. Wholesale refactoring of 25+ controllers is high-risk, low-reward at this stage.
2. **Establish a forward-looking rule:** All NEW controllers and all controllers modified during future sprints MUST use the Controller -> Service -> DA pattern. Add this to project-context.md.
3. **Prioritize migration for "hub" controllers** that touch 4+ models: `purchaseRequestController.js` (4 models), `inventoryController.js` (4 models), `userController.js` (2 direct + many via service). These benefit most from service extraction.
4. **Estimated migration cost per controller:** 2-4 hours (create service file, create DA file, update controller imports, update tests). Full migration of all 25 direct-access controllers: ~60-100 hours.

---

## 2. User vs Student Model Redundancy

**Severity: HIGH**

### Findings

The `User` model (when `role === "student"`) and the `Student` model store overlapping data with critical inconsistencies:

| Field | User Model | Student Model | Conflict |
|---|---|---|---|
| age | Number (required if student) | Number (required) | Duplicate |
| gender | `"male", "female", "other"` | `"Male", "Female", "Other"` | **Enum casing mismatch** |
| balagruha | `balagruhaIds` (array) | `balagruhaId` (single) | **Structural mismatch** |
| parentalStatus | `"has both"` etc. + `""` | `"Has Both"` etc. (no empty) | **Enum casing mismatch** |
| guardianContact | Two fields (guardianContact1, guardianContact2) | Single field | Structural mismatch |
| attendanceRecords | Array of refs | Array of refs | Duplicate |
| medicalRecords | Array of refs | Array of refs | Duplicate |
| performanceReports | Array of refs | Array of refs | Duplicate |

The `Student` model is imported by exactly **one controller**: `frController.js` (facial recognition). Every other controller in the system uses the `User` model for student data.

### Is This a Blocker for Sprint 2 Features?

**Yes, partially.** If Amma role features (Sprint 2, Epic 4) need to query students by balagruha, the system will return different results depending on whether it queries `User.balagruhaIds` (array) or `Student.balagruhaId` (single). Any feature that touches student demographics must decide which model is authoritative.

### Consolidation Strategy

1. **Keep User as the source of truth.** It is already used by 25+ controllers.
2. **Migrate frController.js** to query `User` instead of `Student`. The FR system only needs `name` and `balagruhaId` from Student -- both exist on User.
3. **Deprecate the Student model** by:
   - Adding a `@deprecated` JSDoc comment
   - Creating a migration script that copies any Student-only data into User records
   - Removing the Student model import from frController.js
   - Keeping the Student collection in MongoDB but not importing the model
4. **Normalize enum casing** on User model to use title case (`"Male"`, `"Female"`, etc.) to match the broader convention, with a migration script for existing data.
5. **Estimated effort:** 4-6 hours (frController update, migration script, enum normalization, test updates).

---

## 3. Orphaned Models

**Severity: MEDIUM (corrected from Story 4.3 finding)**

### Verification Results

Story 4.3 flagged three models as orphaned. Codebase verification found:

| Model | File | Story 4.3 Finding | Verification Result |
|---|---|---|---|
| **ActivityLog** | `activitylog.js` | Orphaned | **CONFIRMED orphaned.** No `require` or `import` found anywhere in controllers, services, data-access, routes, or middleware. |
| **MachineActiveLog** | `machineactivelog.js` | Orphaned | **INCORRECT -- NOT orphaned.** Imported by `machineController.js` (line 3) as `MachineActivityStamp` and used in the `getMachineUsageLogs` endpoint (line 562). Also imported in `machine_story3_4.test.js`. |
| **MachineAssignment** | `machineAssignment.js` | Orphaned | **CONFIRMED orphaned.** No `require` or `import` found anywhere. Has the invalid `ref: "Admin"` defect. |

### Recommended Actions

1. **ActivityLog:** Safe to archive. Move to `backend/models/_archived/` or add a `@deprecated` comment. Do NOT delete yet -- it may be intentionally unused (audit logging was planned but not wired up). Before next sprint, confirm with stakeholders whether audit logging is a future requirement.
2. **MachineActiveLog:** Correct Story 4.3 finding. This model IS in use. However, it has PascalCase field names (`MachineID`, `UserID`, `LoginTimestamp`, etc.) that are inconsistent with the rest of the codebase. If machine management gets frontend UI (Sprint 1 gap), rename fields to camelCase first.
3. **MachineAssignment:** Safe to archive. The `ref: "Admin"` bug confirms this was never tested or used. If machine reassignment is needed (Story 3.3), write a new model from scratch following current conventions.

---

## 4. Layering Consistency

**Severity: HIGH**

### Expected Pattern
```
Routes -> Controllers -> Services -> Data-Access -> Models
```

### Violations Found

#### A. Business Logic in Route Files (Anti-pattern)

| Route File | Lines | Violation |
|---|---|---|
| `routes/auth.js` | 486 | Contains 7 route handlers with inline `async` functions that directly query `User` model. Registration, login, student login, profile CRUD, password change -- all implemented inline with JWT signing, bcrypt, and model queries. No controller delegation. |
| `routes/userRoutes.js` | 298 | Imports `User` and `Balagruha` models directly. Contains inline route handlers querying the database. |

The `auth.js` route file is the most significant violation -- it is effectively a 486-line controller embedded in a route file. This makes it untestable in isolation and mixes HTTP concerns with authentication business logic.

#### B. Controllers Bypassing Service Layer

Of 51 total controllers, approximately **25 import models directly** rather than going through a service layer. Notable examples:

- `purchaseRequestController.js` (1578 lines) -- imports 4 models directly, no service layer
- `inventoryController.js` (1033 lines) -- imports 4 models directly, inline imports inside functions
- `adminProductController.js` -- imports ShopItem and Vendor directly
- All 12 LMS controllers -- every one imports models directly with no service layer

#### C. Routes That Call Models Directly

Beyond auth.js and userRoutes.js, the middleware layer also accesses models directly (`auth.js` middleware imports User, Role, Machine; `checkPermission.js` imports Role). This is acceptable for middleware -- it is not a violation, as middleware needs fast model access for authentication and authorization checks.

### Recommended Actions

1. **CRITICAL: Extract auth.js business logic into an authController.js.** This is the single highest-value refactoring task. Create `backend/controllers/authController.js` and have `routes/auth.js` delegate to it. Estimated effort: 3-4 hours.
2. **Extract userRoutes.js inline logic** into the existing `userController.js`. Estimated effort: 1-2 hours.
3. **For controllers bypassing services:** Apply the forward-looking rule from Section 1. Do not bulk-refactor, but migrate as controllers are touched in future sprints.

---

## 5. Structural Anti-patterns

**Severity: Varies (see per-finding)**

### A. God Controllers (HIGH)

| Controller | Lines | Models Imported | Assessment |
|---|---|---|---|
| `wtfController.js` | 2,728 | Via wtf.js service (good) | Delegates to service, but the service itself (`wtf.js`) has 47 functions. The controller is large but mostly thin wrappers. **MEDIUM risk.** |
| `purchaseRequestController.js` | 1,578 | 4 direct | Contains full state machine logic, CRUD, and reporting inline. Should be split into service + controller. **HIGH risk.** |
| `userController.js` | 1,291 | 2 direct + many via service | Mixed pattern -- some methods use service, some query directly. **MEDIUM risk.** |
| `inventoryController.js` | 1,033 | 4 direct (some inline) | Full inventory logic inline. **HIGH risk.** |

### B. Inline Model Imports (LOW)

9 occurrences of `require()` calls inside function bodies rather than at module top-level. This is typically done to avoid circular dependencies. While it works, it makes dependency tracing harder. The most concerning cases are in `computerAppsController.js` and `lifeSkillsController.js`, where 4 models are imported inline deep inside functions.

### C. Circular Dependency Risk (LOW)

The inline imports in 9 files suggest circular dependency pressure exists. No actual circular dependency crashes were reported, but the pattern indicates the codebase is approaching the threshold where adding new cross-model queries could trigger circular `require()` issues. The DA layer was likely introduced partly to address this.

### D. Missing Error Boundaries in Backend (MEDIUM)

The frontend has an `ErrorBoundary` component (Sprint S2-CQ). However, the backend lacks a global error handler middleware. Individual controllers use try-catch blocks, but there is no safety net for unhandled rejections in async route handlers. Express does not catch async errors by default.

### Recommended Actions

1. **Split purchaseRequestController.js** into a service + controller. Extract the state machine logic, validation, and stock update logic into `services/purchaseRequest.js`. Keep HTTP parsing and response formatting in the controller. Estimated effort: 6-8 hours.
2. **Add express-async-errors** or a wrapper middleware to catch unhandled async rejections globally. Estimated effort: 1 hour.
3. **Defer inline import cleanup** -- the risk is low and the cost of untangling is not justified unless circular dependencies actually manifest.

---

## 6. Schema Quality Findings — Priority Assessment

### Findings Ranked by Sprint Readiness Impact

| Priority | # | Finding | Severity | Action Before Next Sprint? |
|---|---|---|---|---|
| 1 | F1 | User vs Student redundancy + enum casing | HIGH | **YES** -- blocks any student-facing feature work |
| 2 | F3 | MachineAssignment refs non-existent "Admin" model | HIGH | **NO** -- model is orphaned, no runtime impact. Fix only if activating machine management. |
| 3 | F4 | Missing indexes on 15+ reference fields | MEDIUM | **YES** -- add indexes for Coin.userId, Attendance.studentId, Task.assignedUser, Schedules.balagruhaId, MedicalCheckIns.studentId. These are the most queried. Estimated effort: 1-2 hours. |
| 4 | F8 | Mixed data access patterns | MEDIUM | **NO** -- establish forward rule only, do not bulk-migrate |
| 5 | F9 | Student model redundancy | MEDIUM | **YES** -- addressed by F1 resolution |
| 6 | F2 | PascalCase fields in machine models | MEDIUM | **NO** -- fix when machine management gets frontend UI |
| 7 | F5 | Models with no validation (Medical has 0 required fields) | LOW | **YES for Medical model only** -- a medical record with zero required fields is a data integrity risk. Add `required: true` to `studentId` and `createdBy` at minimum. Estimated effort: 30 minutes. |
| 8 | F6 | Inconsistent file naming | LOW | **NO** -- cosmetic, high churn risk for renames |
| 9 | F7 | Inline model imports | LOW | **NO** -- working workaround for circular deps |

### Critical Actions Before Next Sprint

1. **Resolve User/Student redundancy (F1+F9):** Migrate frController.js to use User model. Deprecate Student model. Normalize enum casing. (4-6 hours)
2. **Add missing indexes (F4):** Top 5 fields only. (1-2 hours)
3. **Add Medical model validation (F5):** Required fields for studentId and createdBy. (30 minutes)
4. **Extract auth.js business logic (Section 4):** Create authController.js. (3-4 hours)

**Total estimated effort for critical items: 9-13 hours (1.5-2 dev days)**

---

## Summary

| Concern | Severity | Status | Action |
|---|---|---|---|
| Data Access Pattern Fragmentation | MEDIUM | Known debt | Forward rule only; migrate on touch |
| User vs Student Redundancy | HIGH | Blocker for student features | Consolidate before next sprint |
| Orphaned Models | MEDIUM | 2 confirmed, 1 corrected | Archive ActivityLog + MachineAssignment |
| Layering Consistency | HIGH | auth.js is worst offender | Extract authController.js |
| Structural Anti-patterns | HIGH | God controllers exist | Split purchaseRequestController.js |
| Schema Quality (9 findings) | Mixed | 4 need pre-sprint action | Index, validate, consolidate |

The codebase is functional and delivering features, but architectural debt is accumulating in predictable ways. The recommended actions above are scoped to what can realistically be addressed in 2-3 dev days, prioritizing items that would block or complicate upcoming feature work.

---

**Report generated by:** Winston (Architect)
**Next review:** After next sprint planning, or if new domain modules are added
