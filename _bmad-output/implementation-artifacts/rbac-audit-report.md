# RBAC Controller Audit Report

**Auditor:** Amelia (Dev Agent)
**Date:** 2026-03-16
**Story:** 2.1 — Controller RBAC Audit
**Status:** COMPLETE

---

## Executive Summary

- **Total controllers audited:** 42
- **Controllers using `getScopeFilter` / `req.scopeFilter`:** 2
- **Controllers with `authorize` or `checkPermission` on routes:** 24
- **Controllers with `authenticate` only (no authorize):** 12
- **Controllers with NO authentication at all on routes:** 6
- **Critical gaps (sensitive data, no scope filtering):** 15

### Key Finding

`getScopeFilter()` is defined in `backend/middleware/checkPermission.js` and is automatically called by both `authorize()` (auth.js) and `checkPermission()` (checkPermission.js) middleware. It sets `req.scopeFilter` on the request. However, **only 2 out of 42 controllers actually use `req.scopeFilter`** in their queries. This means even when the middleware correctly computes the scope filter, almost no controller applies it to restrict data access.

---

## RBAC Architecture Reference

| Component | File | Purpose |
|-----------|------|---------|
| `authenticate` | `backend/middleware/auth.js` | JWT verification, sets `req.user` |
| `authorize(module, action)` | `backend/middleware/auth.js` | Permission check + sets `req.scopeFilter` via `getScopeFilter()` |
| `checkPermission(module, action)` | `backend/middleware/checkPermission.js` | Same as authorize (duplicate) + sets `req.scopeFilter` |
| `getScopeFilter(user, scope)` | `backend/middleware/checkPermission.js` | Returns MongoDB filter: `{}` (all), `{balagruhaId: {$in: [...]}}` (balagruh), `{_id: userId}` (own) |
| `validateBalagruhaAccess` | `backend/middleware/checkPermission.js` | URL param validator for `:balagruhaId` routes |
| `checkPurchaseRequestAccess` | `backend/middleware/checkPurchaseRequestAccess.js` | Multi-role access for purchase requests |

**Scope Levels:**
- `all` — Admin: no filter applied (returns `{}`)
- `balagruh` — Coach/BIC: filter by assigned Balagruha(s) (returns `{balagruhaId: {$in: [...]}}`)
- `own` — Student: filter by user ID (returns `{_id: user._id}`)

---

## Controller Audit Table

### Legend
- **Has authenticate:** Route file uses `authenticate` middleware
- **Has authorize/checkPermission:** Route file uses `authorize()` or `checkPermission()` for permission checking
- **Uses req.scopeFilter:** Controller code actually reads and applies `req.scopeFilter` to queries
- **Scope Level Needed:** What scope level SHOULD be enforced based on data sensitivity
- **Gap Status:** `enforced` | `missing` | `partial` | `not-applicable`

---

### Core User & Access Management

| Controller | Route File | Has authenticate | Has authorize/checkPermission | Uses req.scopeFilter | Scope Level Needed | Gap Status |
|------------|-----------|:---:|:---:|:---:|---|---|
| `userController.js` | `userRoutes.js`, `v1/user.js` | Yes | Yes (`authorize`) | **YES** | balagruh/all | **enforced** |
| `roleController.js` | `roleRoutes.js` | Yes | Yes (`authorize`) | No | all (admin only) | not-applicable |
| `profileController.js` | (inline in auth.js) | Yes | No | No | own | missing |
| `balagruha.js` | `v1/balagruha.js` | Yes | Yes (`authorize`) | **YES** | balagruh/all | **enforced** |

### Medical Domain (SENSITIVE)

| Controller | Route File | Has authenticate | Has authorize/checkPermission | Uses req.scopeFilter | Scope Level Needed | Gap Status |
|------------|-----------|:---:|:---:|:---:|---|---|
| `medicalCheckInsController.js` | `medicalCheckInsRoutes.js` | Yes | No | No | balagruh/all | **missing** |
| `medicalRecordController.js` | `medicalRecordsRoutes.js` | Yes | No | No | own/balagruh | **missing** |
| `doctorController.js` | `doctorRoutes.js` | Yes | Yes (`authorize`) | No | balagruh/all | **partial** |
| `hospitalController.js` | `hospitalRoutes.js` | Yes | Yes (`authorize`) | No | all (admin) | not-applicable |

### Shop & E-Commerce

| Controller | Route File | Has authenticate | Has authorize/checkPermission | Uses req.scopeFilter | Scope Level Needed | Gap Status |
|------------|-----------|:---:|:---:|:---:|---|---|
| `shopController.js` | `v2/shop.js` | Mixed (public+private) | Yes (`authorize` on admin routes) | No | public (catalog) / balagruh (admin) | partial |
| `cartController.js` | `v2/cart.js` | Yes | No | No | own | **missing** |
| `orderController.js` | `v2/orders.js` | Yes | No | No | own/balagruh/all | **missing** |
| `adminProductController.js` | `v2/adminProducts.js` | Yes | Yes (`authorize`) | No | all (admin only) | not-applicable |
| `inventoryController.js` | `v2/inventory.js` | Yes | Yes (`authorize` on most) | No | all (admin only) | partial |
| `shopProductImageController.js` | `v2/shop.js` | Yes | Yes (`authorize`) | No | all (admin only) | not-applicable |

### Purchase & Vendor Management

| Controller | Route File | Has authenticate | Has authorize/checkPermission | Uses req.scopeFilter | Scope Level Needed | Gap Status |
|------------|-----------|:---:|:---:|:---:|---|---|
| `purchaseRequestController.js` | `v2/purchase-requests.js` | Yes | Yes (`checkPermission` + `checkPurchaseRequestAccess`) | No | balagruh/all | **partial** |
| `vendorController.js` | `v2/vendor.js` | Yes | No (custom `isAdmin` check) | No | all (admin only) | partial |
| `purchaseAndRepair.js` | `v1/purchaseAndRepair.js` | Yes | Yes (`authorize`) | No | balagruh/all | **missing** |
| `coachDeliveryController.js` | `v2/coachDelivery.js` | Yes | No (custom `coachOrAdmin`) | No | balagruh | **partial** |

### Task & Schedule Management

| Controller | Route File | Has authenticate | Has authorize/checkPermission | Uses req.scopeFilter | Scope Level Needed | Gap Status |
|------------|-----------|:---:|:---:|:---:|---|---|
| `taskController.js` | `taskRoutes.js` | Yes | Yes (`authorize`) | No | balagruh/all | **missing** |
| `scheduleController.js` | `scheduleRoutes.js` | Yes | Yes (`authorize` on some) | No | balagruh/all | **missing** |
| `schedulerController.js` | `v1/scheduler.js` | Yes | Yes (`authorize`) | No | all (admin) | not-applicable |

### WTF (What's The Feeling) System

| Controller | Route File | Has authenticate | Has authorize/checkPermission | Uses req.scopeFilter | Scope Level Needed | Gap Status |
|------------|-----------|:---:|:---:|:---:|---|---|
| `wtfController.js` | `v1/wtf.js` | Yes | Yes (`authorize`) | No | balagruh/all | **missing** |
| `wtfSettingsController.js` | `v1/wtfSettings.js` | Yes | Yes (`authorize`) | No | all (admin) | not-applicable |
| `wtfWebSocketController.js` | `v1/websocket.js` | Yes | Yes (`authorize`) | No | balagruh/all | **missing** |

### LMS Admin

| Controller | Route File | Has authenticate | Has authorize/checkPermission | Uses req.scopeFilter | Scope Level Needed | Gap Status |
|------------|-----------|:---:|:---:|:---:|---|---|
| `lms/admin/courseController.js` | `v2/lms/admin/courses.js` | Yes | Yes (`authorize`) | No | all (admin) | not-applicable |
| `lms/admin/adminAssignmentController.js` | `v2/lms/coach/assignments.js` | Yes | Yes (`authenticate`) | No | balagruh | **missing** |
| `lms/admin/translationController.js` | `v2/lms/admin/translations.js` | Yes | Yes (`authorize`) | No | all (admin) | not-applicable |
| `contentController.js` | `v2/lms/admin/content.js` | Yes | Yes (`authorize`) | No | all (admin) | not-applicable |
| `questionBankController.js` | `v2/lms/admin/quiz.js` | Yes | Yes (`authorize`) | No | all (admin) | not-applicable |
| `quizController.js` | `v2/lms/admin/quiz.js` | Yes | Yes (`authorize`) | No | all (admin) | not-applicable |

### LMS Coach

| Controller | Route File | Has authenticate | Has authorize/checkPermission | Uses req.scopeFilter | Scope Level Needed | Gap Status |
|------------|-----------|:---:|:---:|:---:|---|---|
| `lms/coach/coachAssignmentController.js` | `v2/lms/coach/assignments.js` | Yes | No (authenticate only) | No | balagruh | **missing** |
| `lms/coach/coachGradingController.js` | `v2/lms/coach/grading.js` | Yes | No (authenticate only) | No | balagruh | **missing** |
| `lms/coach/coachReportsController.js` | `v2/lms/coach.js` | Yes | No (authenticate only) | No | balagruh | **missing** |
| `lms/coach/manualAwardController.js` | `v2/lms/coach.js` | Yes | No (authenticate only) | No | balagruh | **missing** |

### LMS Student

| Controller | Route File | Has authenticate | Has authorize/checkPermission | Uses req.scopeFilter | Scope Level Needed | Gap Status |
|------------|-----------|:---:|:---:|:---:|---|---|
| `lms/student/studentDashboardController.js` | `v2/lms/student/dashboard.js` | Yes | No (authenticate only) | No | own | **missing** |
| `lms/student/computerAppsController.js` | `v2/lms/student/computerApps.js` | **NO** | No | No | own | **missing** |
| `lms/student/artCourseController.js` | `v2/lms/student/art.js` | **NO** | No | No | own | **missing** |
| `lms/student/spokenEnglishController.js` | `v2/lms/student/spokenEnglish.js` | **NO** | No | No | own | **missing** |
| `lms/student/lifeSkillsController.js` | `v2/lms/student/lifeSkills.js` | **NO** | No | No | own | **missing** |

### Facial Recognition

| Controller | Route File | Has authenticate | Has authorize/checkPermission | Uses req.scopeFilter | Scope Level Needed | Gap Status |
|------------|-----------|:---:|:---:|:---:|---|---|
| `frController.js` | `v2/facialRecognition.js` | Mixed (recognize=public) | **No** (TODOs commented out) | No | all (admin) for register/delete | **missing** |

### Notification & Communication

| Controller | Route File | Has authenticate | Has authorize/checkPermission | Uses req.scopeFilter | Scope Level Needed | Gap Status |
|------------|-----------|:---:|:---:|:---:|---|---|
| `notificationController.js` | `notificationRoutes.js` | Yes | Yes (`checkPermission` on some) | No | own/all | partial |

### Student Well-being

| Controller | Route File | Has authenticate | Has authorize/checkPermission | Uses req.scopeFilter | Scope Level Needed | Gap Status |
|------------|-----------|:---:|:---:|:---:|---|---|
| `studentMoodTrackerController.js` | `studentMoodTrackerRoutes.js` | Yes | Yes (`authorize`) | No | balagruh/all | **missing** |

### Sports & Music

| Controller | Route File | Has authenticate | Has authorize/checkPermission | Uses req.scopeFilter | Scope Level Needed | Gap Status |
|------------|-----------|:---:|:---:|:---:|---|---|
| `sports.js` | `v1/sports.js` | Yes | Yes (`authorize`) | No | balagruh/all | **missing** |
| `music.js` | `v1/music.js` | Yes | Yes (`authorize`) | No | balagruh/all | **missing** |

### Machine Management

| Controller | Route File | Has authenticate | Has authorize/checkPermission | Uses req.scopeFilter | Scope Level Needed | Gap Status |
|------------|-----------|:---:|:---:|:---:|---|---|
| `machineController.js` | `v1/machines.js` | Yes | Yes (`authorize`) | No | all (admin) | not-applicable |

### Other

| Controller | Route File | Has authenticate | Has authorize/checkPermission | Uses req.scopeFilter | Scope Level Needed | Gap Status |
|------------|-----------|:---:|:---:|:---:|---|---|
| `courseController.js` | `courseRoutes.js` | Yes | Yes (`authorize`) | No | all (admin) | not-applicable |
| `offlineRequestQueue.js` | `offlineRequestQueue.js` | **NO** | No | No | N/A (local sync) | not-applicable |
| `coinController.js` | `v1/coin.js` | Yes | Yes (`authorize` on some) | No | own | **missing** |
| `analyticsController.js` | `v2/analytics.js` | Yes | Yes (`authorize`) | No | all (admin) | not-applicable |
| `reportsController.js` | `v2/reports.js` | Yes | Yes (`authorize`) | No | all (admin) | not-applicable |

---

## Gap Summary by Priority

### CRITICAL (Sensitive Data + Missing Enforcement)

These controllers handle sensitive data and lack scope filtering. A coach or lower-privilege user could potentially access data outside their assigned Balagruha(s).

| # | Controller | Data Type | Risk | Recommended Fix |
|---|-----------|-----------|------|-----------------|
| 1 | `medicalCheckInsController.js` | Medical records (HIPAA-adjacent) | Any authenticated user can see ALL check-ins | Add `authorize`, apply `req.scopeFilter` to queries |
| 2 | `medicalRecordController.js` | Medical history | Any authenticated user can modify ANY user's records | Add `authorize`, validate ownership |
| 3 | `orderController.js` | Financial (purchases, coins) | Missing role checks on `getAllOrders` (admin-only via inline check, but no scope filter) | Apply `req.scopeFilter` to all list queries |
| 4 | `cartController.js` | Student purchases | No scope validation; relies on `req.user._id` in controller but no middleware check | Add `authorize('Shop Management', 'Read')` |
| 5 | `coinController.js` | Financial (ISF Coins) | Most routes are own-data but no scopeFilter enforcement | Apply `req.scopeFilter` to balance/transaction queries |
| 6 | `frController.js` | Biometric data | No permission check on register/delete endpoints (TODOs only) | Enable commented-out `checkPermission` calls |

### HIGH (Balagruha-Scoped Data Without Scope Filtering)

These controllers serve data that should be restricted by Balagruha but do NOT apply `req.scopeFilter`.

| # | Controller | Data Type | Recommended Scope |
|---|-----------|-----------|-------------------|
| 7 | `taskController.js` | Student tasks | balagruh |
| 8 | `scheduleController.js` | Schedules | balagruh |
| 9 | `wtfController.js` | WTF pins/interactions | balagruh |
| 10 | `wtfWebSocketController.js` | Real-time WTF data | balagruh |
| 11 | `sports.js` | Sports tasks | balagruh |
| 12 | `music.js` | Music tasks | balagruh |
| 13 | `studentMoodTrackerController.js` | Student mood data | balagruh |
| 14 | `purchaseAndRepair.js` | Legacy purchase data | balagruh |

### MEDIUM (LMS Controllers Without Scope Filtering)

These controllers serve LMS data that should be filtered by Balagruha (coach) or student identity.

| # | Controller | Recommended Scope | Notes |
|---|-----------|-------------------|-------|
| 15 | `lms/coach/coachAssignmentController.js` | balagruh | Has inline balagruha filtering in code but no middleware |
| 16 | `lms/coach/coachGradingController.js` | balagruh | No authorize middleware at all |
| 17 | `lms/coach/coachReportsController.js` | balagruh | No authorize middleware |
| 18 | `lms/coach/manualAwardController.js` | balagruh | No authorize middleware |
| 19 | `lms/student/studentDashboardController.js` | own | Has authenticate but no authorize |
| 20 | `lms/student/computerAppsController.js` | own | **NO authenticate at all** |
| 21 | `lms/student/artCourseController.js` | own | **NO authenticate at all** |
| 22 | `lms/student/spokenEnglishController.js` | own | **NO authenticate at all** |
| 23 | `lms/student/lifeSkillsController.js` | own | **NO authenticate at all** |

### LOW (Partial Enforcement or Admin-Only)

| # | Controller | Notes |
|---|-----------|-------|
| 24 | `purchaseRequestController.js` | Has `checkPermission` + `checkPurchaseRequestAccess` + inline role checks, but does NOT use `req.scopeFilter` |
| 25 | `coachDeliveryController.js` | Has custom `coachOrAdmin` middleware + inline balagruha filtering, but no `req.scopeFilter` |
| 26 | `vendorController.js` | Has custom `isAdmin` check, but no `authorize` middleware |
| 27 | `inventoryController.js` | Most routes have `authorize`, but 2 routes (stock-levels, most-consumed) lack it |
| 28 | `notificationController.js` | Some routes have `checkPermission`, others don't |

### NOT APPLICABLE (Public or Admin-Only)

These controllers are either public endpoints or admin-only and do not need Balagruha/user scope filtering.

| Controller | Reason |
|-----------|--------|
| `roleController.js` | Admin-only role management |
| `adminProductController.js` | Admin-only product CRUD |
| `shopProductImageController.js` | Admin-only image management |
| `machineController.js` | Admin-only machine management |
| `schedulerController.js` | Admin-only WTF scheduler |
| `wtfSettingsController.js` | Admin-only WTF settings |
| `lms/admin/courseController.js` | Admin-only LMS management |
| `lms/admin/translationController.js` | Admin-only translations |
| `contentController.js` | Admin-only content management |
| `questionBankController.js` | Admin-only question bank |
| `quizController.js` | Admin-only quiz management |
| `courseController.js` | Admin-only legacy course creation |
| `analyticsController.js` | Admin-only analytics |
| `reportsController.js` | Admin-only reports |
| `hospitalController.js` | Admin-only hospital CRUD |
| `offlineRequestQueue.js` | Local sync utility (no auth by design) |
| `shopController.js` (public routes) | Product catalog is public |

---

## Route-to-Controller Mapping

### Routes without `authenticate`

| Route File | Controller(s) | Endpoint Base |
|-----------|--------------|---------------|
| `v2/lms/student/computerApps.js` | `computerAppsController` | `/api/v2/lms/student/:studentId/courses/computer-apps` |
| `v2/lms/student/art.js` | `artCourseController` | `/api/v2/lms/student/:studentId/courses/art` |
| `v2/lms/student/spokenEnglish.js` | `spokenEnglishController` | `/api/v2/lms/student/:studentId/courses/spoken-english` |
| `v2/lms/student/lifeSkills.js` | `lifeSkillsController` | `/api/v2/lms/student/:studentId/courses/life-skills` |
| `offlineRequestQueue.js` | `offlineRequestQueueController` | `/api/offline-requests` |
| `v2/shop.js` (GET /products, /categories) | `shopController` | `/api/v2/shop` (public catalog) |

### Routes with `authenticate` only (no `authorize`/`checkPermission`)

| Route File | Controller(s) | Endpoint Base |
|-----------|--------------|---------------|
| `medicalCheckInsRoutes.js` | `medicalCheckInsController` | `/api/medical-check-ins` |
| `medicalRecordsRoutes.js` | `medicalRecordController` | `/api/medical-records` |
| `v2/cart.js` | `cartController` | `/api/v2/shop/cart` |
| `v2/orders.js` | `orderController` | `/api/v2/shop/orders` |
| `v2/facialRecognition.js` | `frController` | `/api/v2/fr` |
| `v2/lms/student/dashboard.js` | `studentDashboardController` | `/api/v2/lms/student` |
| `v2/lms/coach/grading.js` | `coachGradingController` | `/api/v2/lms/coach/grading` |
| `v2/lms/coach.js` | `manualAwardController`, `coachReportsController` | `/api/v2/lms/coach` |

### Routes with `authenticate` + `authorize`/`checkPermission` (but controller ignores `req.scopeFilter`)

All remaining routes — the middleware sets `req.scopeFilter` but controllers do not use it.

---

## Recommendations for Story 2.2 (Scope Filter Enforcement)

### Implementation Order (by risk)

1. **Medical controllers** — Add `authorize` middleware + apply `req.scopeFilter` to all queries
2. **FR controller** — Un-comment the `checkPermission` TODOs
3. **LMS student routes** — Add `authenticate` middleware (currently completely open)
4. **Order/Cart controllers** — Add `authorize` + scope filtering
5. **LMS coach controllers** — Add `authorize` middleware + apply `req.scopeFilter`
6. **Task/Schedule/WTF controllers** — Apply `req.scopeFilter` to existing queries (middleware already sets it)
7. **Sports/Music controllers** — Apply `req.scopeFilter` to existing queries
8. **Coin controller** — Ensure own-data filtering
9. **Remaining partial controllers** — Standardize all inline role checks to use `req.scopeFilter`

### Pattern for Fix

Controllers that already have `authorize` middleware need one change: use `req.scopeFilter` in their MongoDB queries.

```javascript
// BEFORE (ignores scope)
const items = await Model.find({});

// AFTER (applies scope filter)
const items = await Model.find({ ...req.scopeFilter, ...otherFilters });
```

Controllers without `authorize` need two changes:
1. Add `authorize('Module', 'Action')` to the route
2. Use `req.scopeFilter` in controller queries

---

## Notes

1. **Duplicate RBAC middleware:** Both `authorize` (auth.js) and `checkPermission` (checkPermission.js) perform identical logic. Story 2.2 should consider consolidating these.
2. **Inline role checks:** Several controllers (purchaseRequestController, orderController, coachDeliveryController) perform manual `req.user.role` checks and balagruha filtering instead of using `req.scopeFilter`. These work but are inconsistent and error-prone.
3. **LMS student routes rely on `:studentId` URL param:** The student course routes (computerApps, art, spokenEnglish, lifeSkills) use `:studentId` from the URL but have NO authentication — anyone could access any student's course data by guessing the URL.
4. **The `offlineRequestQueue` routes have no auth by design** — they handle local Electron-to-server sync.
