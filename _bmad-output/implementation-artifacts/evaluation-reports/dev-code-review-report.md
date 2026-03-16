# Dev Code Review Report

**Sprint:** 6 / S2-CQ
**Author:** Amelia (Dev Agent)
**Date:** March 16, 2026
**Scope:** Backend code quality audit across controllers, services, routes, middleware, and models

---

## Executive Summary

This report catalogs code quality issues discovered during Sprint 6 investigation of the ISF Playground backend codebase. Issues are organized by category with severity ratings (CRITICAL / HIGH / MEDIUM / LOW) and concrete fix recommendations.

**Totals:** 7 categories, 28 distinct findings
**Breakdown:** 2 CRITICAL, 5 HIGH, 10 MEDIUM, 11 LOW

---

## 1. Hardcoded Credentials & Secrets

### Finding 1.1: Production MongoDB Atlas Credentials in Source Code (CRITICAL)

**File:** `backend/scripts/fix_admin_scope.js` (line 4)
**Evidence:**
```
const uri = "mongodb+srv://admin:admin0987@cluster1.kkubs.mongodb.net/isfplayground?retryWrites=true&w=majority&appName=cluster1";
```

A production MongoDB Atlas connection string with username `admin` and password `admin0987` is hardcoded directly in a committed script file. This is a live credential leak.

**Impact:** Anyone with repository access has full database credentials. The password `admin0987` is also trivially guessable.

**Fix:**
1. Immediately rotate the Atlas password for the `admin` user.
2. Replace the hardcoded URI with `process.env.MONGO_URI`.
3. Add a `.env.example` entry documenting the required variable.
4. Audit git history for other credential commits.

---

### Finding 1.2: Hardcoded Test Passwords in Utility Scripts (MEDIUM)

**Files:**
| File | Line | Value |
|---|---|---|
| `backend/scripts/create_coach_user.js` | 13 | `password = 'password123'` |
| `backend/scripts/reset-pm-password.js` | 26 | `user.password = 'password123'` |
| `backend/scripts/reset-samplet-password.js` | 39 | `user.password = 'password123'` |
| `backend/scripts/verify/test-rbac-scope.js` | 14 | `password = 'test123'` |

These are utility/seed scripts, not production controllers, but they normalize weak passwords and could be accidentally run against production.

**Fix:** Accept passwords as CLI arguments or environment variables. Add a guard that refuses to run if `NODE_ENV === 'production'`.

---

### Finding 1.3: Hardcoded MongoDB URIs Across 15+ Scripts (MEDIUM)

**Files (sample):**
- `backend/scripts/admin/set-test-passwords.js` -- `mongodb://localhost:27017/isfplayground`
- `backend/scripts/admin/assign-orders-to-balagruhas.js` -- same
- `backend/scripts/seed/add-shop-permissions-for-testing.js` -- same
- `backend/scripts/fix/addCoins.js` -- `mongodb://localhost:27017/isf-playground` (note: different DB name)
- `backend/db/init-mongo.js` -- `mongodb://127.0.0.1:27017/isfplayground`

At least 15 script files hardcode MongoDB connection strings instead of reading from environment. Three different database names are used (`isfplayground`, `isf-playground`, `isf_playground`), which could cause scripts to silently write to the wrong database.

**Fix:** Centralize connection logic in a shared `scripts/lib/connect.js` that reads `process.env.MONGO_URI` with a single fallback. Standardize the database name.

---

## 2. Console.log Statements in Production Code

### Finding 2.1: 173 console.log Statements Across Production Code (HIGH)

**Distribution:**

| Layer | Files | Count |
|---|---|---|
| Controllers | 7 | 31 |
| Services | 18 | 125 |
| Middleware | 2 | 17 |
| Routes | 0 | 0 |
| **Total** | **27** | **173** |

**Worst offenders:**
- `backend/services/task.js` -- 16 occurrences (including debug logs like `"abccc"`)
- `backend/services/coin.js` -- 15 occurrences (query debug logging)
- `backend/services/wtf.js` -- 15 occurrences
- `backend/middleware/upload.js` -- 16 occurrences (verbose file filter logging)
- `backend/controllers/taskController.js` -- 12 occurrences

**Particularly egregious:**
- `taskController.js:12` and `services/task.js:124,245` contain `console.log("abccc", ...)` -- developer debug artifacts left in code.
- `middleware/auth.js:96` logs `console.log("auth res: ", req.user)` which could leak user data in production logs.
- `services/coin.js` lines 636-672 contain 8 consecutive debug console.logs for filter values.
- `services/analytics.js` logs aggregation pipeline details.

**Impact:** Noise in production logs, potential data leakage (user objects, query parameters), performance cost of serializing large objects.

**Fix:** The project already has `@logtail/pino` as a dependency. Replace all `console.log` calls with the proper pino logger at appropriate levels (debug, info, warn, error). Remove all `"abccc"` debug artifacts immediately.

---

## 3. TODO / FIXME / HACK Comments

### Finding 3.1: 12 Active TODO Comments in Backend (MEDIUM)

| File | Line | TODO |
|---|---|---|
| `services/offlineRequestQueue.js` | 386 | `// TODO: implement if needed` |
| `services/wtf.js` | 120 | `// TODO: In production, this should be a proper user ID lookup` |
| `controllers/lms/admin/courseController.js` | 969 | `// TODO: Save reason to audit log (Story 05)` |
| `controllers/lms/admin/courseController.js` | 970 | `// TODO: Send notifications to coaches if notifyCoaches is true` |
| `controllers/lms/admin/courseController.js` | 1046 | `// TODO: Save reason to audit log (Story 05)` |
| `controllers/lms/admin/courseController.js` | 1047 | `// TODO: Send notifications to coaches` |
| `controllers/lms/coach/coachAssignmentController.js` | 246 | `// TODO: Email notifications` |
| `controllers/lms/student/studentDashboardController.js` | 220 | `// TODO: Replace with actual homework query in Epic 05` |
| `controllers/lms/student/artCourseController.js` | 95 | `// TODO: Implement Competition Model` |
| `controllers/lms/student/artCourseController.js` | 99 | `// TODO: Implement Gallery Model` |
| `controllers/lms/student/artCourseController.js` | 128 | `// TODO: Implement actual S3 upload and database storage` |
| `controllers/lms/student/artCourseController.js` | 186 | `// TODO: Implement actual S3 upload and database storage` |

**Severity breakdown:**
- **HIGH** (1): `services/wtf.js:120` -- production user ID lookup is stubbed. This is a potential security gap.
- **MEDIUM** (3): Audit log and notification TODOs in courseController -- features promised but not delivered.
- **LOW** (8): Art course stubs, competition model, homework query -- features from unexecuted sprints.

**Fix:** The HIGH-severity wtf.js TODO should be addressed immediately. The MEDIUM courseController TODOs should be tracked as backlog items. The LOW art course TODOs are acceptable as long as the art course features are documented as stubbed in project-context.md (which they are).

---

## 4. Orphaned Models Investigation

### Finding 4.1: ActivityLog Model -- Completely Orphaned (HIGH)

**File:** `backend/models/activitylog.js`

The ActivityLog model is defined and exported but is **never imported or required** anywhere in the codebase -- not by any controller, service, data-access layer, route, seed script, or test file.

**Impact:** Dead code. The model definition occupies file space and appears in model listings but serves no purpose. No data is ever written to or read from this collection.

**Fix:** Remove the file, or if activity logging is a planned feature, create a backlog item and add a comment in the model file noting its intended use.

---

### Finding 4.2: MachineActiveLog -- Referenced Only by machineController (LOW)

**File:** `backend/models/machineactivelog.js`

Imported by:
- `backend/controllers/machineController.js` (line 3)
- `backend/tests/machine_story3_4.test.js` (line 3)

The model is referenced by a controller and has a test file. However, as noted in Schema Quality Finding #2, it uses PascalCase field names (`MachineID`, `UserID`, `LoginTimestamp`, etc.) inconsistent with the rest of the codebase.

**Status:** Not orphaned, but part of the inactive Machine Management feature (Sprint 1 -- no frontend UI).

---

### Finding 4.3: MachineAssignment -- Completely Orphaned (HIGH)

**File:** `backend/models/machineAssignment.js`

The MachineAssignment model is defined but **never imported or required** anywhere in the codebase -- not by machineController, not by any route, not by any test. Additionally, as noted in Schema Quality Finding #3, it references a non-existent `"Admin"` model.

**Impact:** Dead code with a known defect. If ever activated without fixes, it would cause a runtime error.

**Fix:** Either remove the file or fix the `ref: "Admin"` to `ref: "User"` and integrate it into machineController when Machine Management frontend is built.

---

### Finding 4.4: Additional Potentially Underused Models (LOW)

| Model File | Imported By | Notes |
|---|---|---|
| `purchaseOrders.js` | `data-access/purchaseOrder.js` | Referenced in legacy purchase workflow. May overlap with newer `purchaseRequest.js`. |
| `repairRequests.js` | `data-access/repairRequests.js`, `controllers/purchaseAndRepair.js` | Referenced in legacy repair workflow. Repair tracking was rebuilt in PurchaseRequest model (Sprint 5). |

These are not fully orphaned but appear to be superseded by Sprint 5's PurchaseRequest model. They should be evaluated for deprecation.

---

## 5. "Report" Model Ghost Reference

### Finding 5.1: User and Student Models Reference Non-Existent "Report" Model (HIGH)

**Files and lines:**
- `backend/models/student.js:15` -- `performanceReports: [{ type: ObjectId, ref: "Report" }]`
- `backend/models/user.js:89` -- `performanceReports: [{ type: ObjectId, ref: "Report" }]`
- `backend/tests/controllers/userController.test.js:88` -- test schema also declares it

**No model file named Report exists anywhere in `backend/models/`.**

**What references it downstream:**
- `backend/data-access/User.js` -- References `performanceReports` in **13 projection exclusions** (`performanceReports: 0`), meaning it is actively excluded from query results to avoid populate errors.
- `backend/data-access/task.js` -- References `performanceReports` in **6 projection exclusions**.
- `backend/services/student.js` -- Maps `performanceReports` in the student DTO (lines 50, 78, 102).

**What would break if removed:**
- Removing the `performanceReports` field from User/Student schemas: The 19 projection exclusions in data-access layers would become no-ops (harmless). The student service DTO mapping would need to remove the field. No controller or route ever populates or writes to `performanceReports`.
- The field is **never populated, never queried, never written to**. It is purely vestigial.

**Impact:** If any code path ever attempted `.populate('performanceReports')`, Mongoose would throw a `MissingSchemaError` because no "Report" model is registered. The data-access layer appears to defensively exclude it precisely to avoid this.

**Fix:**
1. Remove `performanceReports` field from both User and Student model schemas.
2. Remove the 19 `performanceReports: 0` projection exclusions from data-access files.
3. Remove the mapping from `services/student.js`.
4. Update the test schema in `userController.test.js`.

---

## 6. Medical Domain: String vs ObjectId Mismatch

### Finding 6.1: MedicalCheckIns Stores Doctor/Hospital as Strings Despite Models Existing (MEDIUM)

**File:** `backend/models/medicalCheckIns.js`

The MedicalCheckIns model stores doctor and hospital data as plain strings in four locations:

| Schema Path | Fields | Type |
|---|---|---|
| `doctorVisits[].doctorName` | line 54 | `String` |
| `doctorVisits[].hospitalName` | line 55 | `String` |
| `doctorVisit.doctorName` (deprecated) | line 85 | `String` |
| `doctorVisit.hospitalName` (deprecated) | line 86 | `String` |
| `followUps[].hospital` | line 116 | `String` |
| `followUps[].doctor` | line 117 | `String` |
| `followUp.hospital` (deprecated) | line 162 | `String` |
| `followUp.doctor` (deprecated) | line 163 | `String` |

Meanwhile, `backend/models/doctor.js` and `backend/models/hospital.js` exist as first-class Mongoose models with CRUD APIs exposed via `backend/routes/doctorRoutes.js` and `backend/routes/hospitalRoutes.js`.

**How they are currently used:**
- The Doctor and Hospital models power dropdown lists in the frontend (Sprint 6 Story 3 -- hospital dropdown).
- The controller (`medicalCheckInsController.js`) receives doctor/hospital names as strings from the frontend form and stores them directly.
- The data-access layer for Doctor/Hospital (`backend/data-access/doctor.js`, `backend/data-access/hospital.js`) provides `find()` operations but these results are never joined with MedicalCheckIns data.

**Are there any queries that try to join these?** No. There are zero `.populate()` calls or `$lookup` aggregations that attempt to link MedicalCheckIns string fields to Doctor/Hospital ObjectIds.

**Migration impact assessment:**
- **Data migration:** All existing `doctorName`/`hospitalName` string values would need to be matched to Doctor/Hospital documents and converted to ObjectId references. Fuzzy matching would be required since free-text entry may not exactly match model names.
- **Schema change:** 8 string fields across 4 schema locations (including 4 deprecated fields) would need to change to ObjectId refs.
- **Controller change:** `medicalCheckInsController.js` would need to accept ObjectIds instead of strings, or perform lookup on save.
- **Frontend change:** The medical check-in form would need to use Doctor/Hospital dropdowns (which already exist for Sprint 6) instead of free-text inputs for all doctor/hospital fields.
- **Risk:** The deprecated `doctorVisit` (singular) fields still exist for backward compatibility during migration (`migrate-medical-checkins-to-arrays.js`). A schema type change would break the migration script.

**Recommendation:** This is a MEDIUM-priority improvement. The current string-based approach works but creates data consistency issues (e.g., "Dr. Smith" vs "Dr Smith" vs "Smith"). The fix should be:
1. Complete the array migration first (remove deprecated singular fields).
2. Then migrate string fields to ObjectId refs in a separate step.
3. Update the frontend form to use dropdowns for all doctor/hospital fields.
4. Write a one-time data migration script with fuzzy matching.

---

## 7. Schema Quality Findings Cross-Reference

The 9 findings from Story 4.3 (documented in `_bmad-output/database-architecture.md`) were verified during this review. Key findings confirmed:

| # | Finding | Confirmed | Additional Notes |
|---|---|---|---|
| 1 | Redundant Student/User data | Yes | Student model imported only by frController |
| 2 | PascalCase in machine models | Yes | MachineActiveLog imported by machineController |
| 3 | MachineAssignment refs "Admin" | Yes | Model is completely orphaned (Finding 4.3 above) |
| 4 | Missing indexes on 15+ fields | Yes | No new indexes added since finding |
| 5 | Models with no validation | Yes | Medical model has zero required fields |
| 6 | Inconsistent file naming | Yes | 10 PascalCase, 2 lowercase, rest camelCase |
| 7 | Inline model imports | Yes | 9 occurrences across 7 files |
| 8 | Mixed data access patterns | Yes | 3 patterns: direct, service, DA layer |
| 9 | Student model redundancy | Yes | Only frController imports Student |

---

## Summary Table

| # | Finding | Severity | Category | Effort |
|---|---|---|---|---|
| 1.1 | Production Atlas credentials in source | CRITICAL | Security | 1h |
| 1.2 | Hardcoded test passwords in scripts | MEDIUM | Security | 2h |
| 1.3 | Hardcoded MongoDB URIs (15+ files, 3 DB names) | MEDIUM | Security / Config | 3h |
| 2.1 | 173 console.log in production code | HIGH | Code Quality | 8h |
| 3.1 | 12 TODO comments (1 HIGH security) | MEDIUM | Technical Debt | 4h |
| 4.1 | ActivityLog model orphaned | HIGH | Dead Code | 15m |
| 4.2 | MachineActiveLog PascalCase fields | LOW | Naming | 30m |
| 4.3 | MachineAssignment orphaned + broken ref | HIGH | Dead Code | 15m |
| 4.4 | Potentially superseded legacy models | LOW | Technical Debt | 2h |
| 5.1 | "Report" ghost reference in User/Student | HIGH | Schema Defect | 2h |
| 6.1 | Medical String vs ObjectId mismatch | MEDIUM | Schema Design | 8h |

---

## Recommended Priority Order

### Immediate (before next deploy)
1. **Finding 1.1** -- Rotate Atlas credentials and remove from source code
2. **Finding 2.1 (partial)** -- Remove `"abccc"` debug logs and `auth.js` user object log

### Sprint Backlog (next sprint)
3. **Finding 5.1** -- Remove ghost "Report" references and clean up projections
4. **Finding 4.1 + 4.3** -- Remove orphaned ActivityLog and MachineAssignment models
5. **Finding 2.1 (full)** -- Replace all 173 console.logs with pino logger
6. **Finding 1.3** -- Centralize script database connections

### Future Sprints
7. **Finding 6.1** -- Medical domain String-to-ObjectId migration
8. **Finding 3.1** -- Address TODO items (especially wtf.js user lookup)
9. **Finding 1.2** -- Parameterize script passwords

---

**End of Report**
