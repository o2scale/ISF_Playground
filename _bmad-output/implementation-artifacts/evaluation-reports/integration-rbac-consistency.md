# RBAC & Permission Consistency Report

**Story:** 9.2 — RBAC & Permission Consistency
**Date:** 2026-03-17
**Author:** Winston (Architect Agent)
**Status:** Discovery Complete

---

## 1. Backend Role Definitions (from seed data)

Source: `backend/scripts/setupDefaultRoles.js`

The seed script defines **5 roles**. The User model enum (`backend/models/user.js`) allows **9 role values**.

### 1a. Seed Role Permission Table

| Role | Module | Actions | Scope (if migrated) |
|------|--------|---------|---------------------|
| **admin** | User Management | Create, Read, Update, Delete | all |
| | Role Management | Create, Read, Update, Delete | all |
| | Task Management | Create, Read, Update, Delete | all |
| | Machine Management | Create, Read, Update, Delete | all |
| | WTF Management | Create, Read, Update, Delete | all |
| | WTF Interaction | Create, Read, Update, Delete | all |
| | WTF Submission | Create, Read, Update, Delete | all |
| | WTF Coach Suggestion | Create, Read, Update, Delete | all |
| | WTF Analytics | Create, Read, Update, Delete | all |
| | Coin Analytics | Create, Read, Update, Delete | all |
| | Shop Management | Manage | all |
| | notifications | Create, Read, Update, Delete | all |
| **purchase-manager** | Shop Management | Manage | own |
| **coach** | Task Management | Create, Read, Update | balagruh |
| | WTF Management | Read | balagruh |
| | WTF Interaction | Create, Read | balagruh |
| | WTF Submission | Read, Update | balagruh |
| | WTF Coach Suggestion | Create, Read | balagruh |
| **student** | WTF Interaction | Create, Read | own |
| | WTF Submission | Create, Read | own |
| **balagruha-incharge** | Task Management | Create, Read, Update | balagruh |
| | WTF Management | Read | balagruh |
| | WTF Interaction | Read | balagruh |
| | WTF Submission | Read | balagruh |

### 1b. User Model Role Enum vs. Seed Roles

| Role String (User model enum) | In Seed Data? | In Frontend UserTypes? |
|-------------------------------|---------------|----------------------|
| `admin` | YES | YES |
| `coach` | YES | YES |
| `balagruha-incharge` | YES | **MISMATCH** (frontend uses `balagruha in-charge`) |
| `student` | YES | YES |
| `purchase-manager` | YES | YES |
| `medical-incharge` | NO | YES |
| `sports-coach` | NO | YES |
| `music-coach` | NO | YES |
| `amma` | NO | YES |

**CRITICAL: 4 roles have NO seed permissions** (`medical-incharge`, `sports-coach`, `music-coach`, `amma`). These users would fail every `authorize()` / `checkPermission()` call because no Role document exists in MongoDB for them.

---

## 2. Role Name Inconsistency: `balagruha-incharge` vs `balagruha in-charge`

This is the single most impactful naming mismatch in the system.

| Location | Value Used |
|----------|-----------|
| User model enum (`backend/models/user.js`) | `balagruha-incharge` |
| Seed data (`setupDefaultRoles.js`) | `balagruha-incharge` |
| Backend constants (`constants/users.js` UserTypes.IN_CHARGE) | `balagruha in-charge` |
| Frontend constants (`constants/userTypes.js` UserTypes.IN_CHARGE) | `balagruha in-charge` |
| Frontend `App.js` ProtectedRoute requiredRoles | `balagruha in-charge` |
| Frontend Layout.js menu roles | `balagruha-incharge` |

**Impact:** The backend stores users with role `balagruha-incharge` (hyphenated). The frontend `constants/userTypes.js` defines it as `balagruha in-charge` (with space). The `App.js` ProtectedRoute for `/attendance` uses `balagruha in-charge`, which will **never match** the actual stored role because the DB stores the hyphenated version. However, `Layout.js` correctly uses `balagruha-incharge` for menu visibility.

The `normalizeUserRole()` function only does `.toLowerCase()` -- it does **not** normalize hyphens vs spaces, so this mismatch is live.

---

## 3. Frontend Route Guard Inventory

### 3a. Routes Using `requiredRoles` (role-string matching)

| Route | requiredRoles | Match with Backend? |
|-------|--------------|---------------------|
| `/balagruha` | `['admin']` | MATCH |
| `/attendance` | `['admin', 'coach', 'balagruha in-charge']` | **MISMATCH** — `balagruha in-charge` never matches DB value `balagruha-incharge` |
| `/course` | `['admin', 'coach', 'student']` | MATCH |
| `/repair` | `['admin', 'purchase-manager', 'coach']` | MATCH |
| `/purchase` | `['admin', 'purchase-manager', 'coach']` | MATCH |

### 3b. Routes Using `module` + `action` (RBAC permission check)

| Route | Module | Action | Module Exists in Seed? |
|-------|--------|--------|----------------------|
| `/users` | User Management | Read | YES |
| `/rbac` | Role Management | Read | YES |
| `/task` | Task Management | Read | YES |
| `/machines` | Machine Management | Read | YES |
| `/shop/admin/products` | Shop Management | Manage | YES |
| `/shop/admin/vendors` | Shop Management | Manage | YES |
| `/shop/admin/inventory` | Shop Management | Manage | YES |
| `/shop/admin/inventory/low-stock` | Shop Management | Manage | YES |
| `/shop/admin/inventory/out-of-stock` | Shop Management | Manage | YES |
| `/shop/admin/inventory/master-report` | Shop Management | Manage | YES |
| `/shop/admin/analytics` | Shop Management | Manage | YES |
| `/shop/admin/reports` | Shop Management | Manage | YES |
| `/admin/courses` | LMS Management | Manage | **NO** |
| `/admin/courses/:courseId/structure` | LMS Management | Manage | **NO** |
| `/admin/content` | LMS Management | Manage | **NO** |
| `/admin/quizzes` | LMS Management | Manage | **NO** |
| `/admin/quizzes/create` | LMS Management | Manage | **NO** |
| `/admin/quizzes/:quizId/edit` | LMS Management | Manage | **NO** |
| `/admin/courses/:courseId/quizzes/create` | LMS Management | Manage | **NO** |
| `/admin/translations` | LMS Management | Manage | **NO** |
| `/admin/translations/:courseId/queue` | LMS Management | Manage | **NO** |
| `/admin/translations/:courseId/editor` | LMS Management | Manage | **NO** |

### 3c. Routes with Authentication-Only (no role/permission check)

| Route | Component | Notes |
|-------|-----------|-------|
| `/student/*` (all) | Various student pages | Auth only — any authenticated user can access |
| `/dashboard` | Dashboard | Auth only |
| `/wtf` | WtfDashboard | Auth only |
| `/shop` | ShopHome | Auth only |
| `/shop/checkout` | Checkout | Auth only |
| `/shop/orders` | OrderHistory | Auth only |
| `/shop/orders/:orderNumber` | OrderDetail | Auth only |
| `/shop/orders/:orderNumber/receipt` | OrderReceipt | Auth only |
| `/coins/history` | TransactionHistory | Auth only |
| `/purchase-manager/low-stock` | PMLowStock | Auth only — **UX gap**: any role can navigate here |
| `/coach/deliveries` | CoachDeliveries | Auth only — **UX gap**: any role can navigate here |
| `/coach/requests` | CoachRequestsDashboard | Auth only + custom `CoachOrAdminRoute` guard |
| `/profile` | StudentProfile | Auth only |
| `/admin/students/:userId` | StudentProfile | Auth only — **Security gap**: no admin check |
| `/coach/assignments` | CoachAssignmentsPage | Auth only — **UX gap**: any role can navigate here |
| `/coach/grading` | GradingDashboard | Auth only — **UX gap**: any role can navigate here |

---

## 4. Backend Route Permission Modules (complete list)

Extracted from all `authorize()` and `checkPermission()` calls across backend routes:

| Module Name | Actions Used | In Seed? | Frontend References? |
|-------------|-------------|----------|---------------------|
| User Management | Create, Read, Update, Delete | YES | YES (usermanagement.js, ProtectedRoute) |
| Role Management | Create, Read, Update, Delete | YES | YES (App.js ProtectedRoute) |
| Task Management | Create, Read, Update, Delete | YES | YES (App.js ProtectedRoute) |
| Machine Management | Create, Read, Update, Delete | YES | YES (App.js ProtectedRoute, MachineManagement.jsx) |
| Shop Management | Manage | YES | YES (App.js, ShopAdminControls, various pages) |
| WTF Management | Create, Read, Update, Delete | YES | NO (frontend uses auth-only for /wtf) |
| WTF Interaction | Create, Read | YES | NO |
| WTF Submission | Create, Read, Update | YES | NO |
| WTF Coach Suggestion | Create, Read | YES | NO |
| WTF Analytics | Read | YES | NO |
| Coin Analytics | Read | YES | NO |
| notifications | Create, Read, Delete | YES | NO |
| LMS Management | Create, Read, Update, Delete, Manage | **NO** | YES |
| Purchase Management | Read, Update, Manage | **NO** | NO (frontend uses requiredRoles for /purchase) |
| Medical Check-in | Create, Read | **NO** | NO |
| Medical Management | Create, Read, Update, Delete | **NO** | NO |
| Schedule Management | Create, Read, Update, Delete | **NO** | NO |
| Daily Schedule | Read | **NO** | NO |
| Course Management | Create | **NO** | NO |
| Balagruha Management | — | **NO** (frontend-only) | YES (balagruhamanagement.js) |

---

## 5. Permission Data Flow Analysis

### 5a. API Endpoint

**Endpoint:** `GET /api/roles/getAllRolePermissions`
**Controller:** `roleController.getAllRolePermissions`
**Auth:** NONE (no `authenticate` or `authorize` middleware) — **SECURITY GAP**

**Response shape:**
```json
{
  "success": true,
  "roles": [
    {
      "_id": "...",
      "roleName": "admin",
      "permissions": [
        { "module": "User Management", "actions": ["Create", "Read", "Update", "Delete"] }
      ]
    }
  ]
}
```

### 5b. RBACContext Processing

1. Fetches from `/api/roles/getAllRolePermissions`
2. Expects `response.data.success === true` and `response.data.roles` array
3. Finds matching role via: `role.roleName.toLowerCase() === user.role.toLowerCase()`
4. Transforms to: `{ "Module Name": ["Action1", "Action2"] }`
5. Stores in state as `permissions`

**Data shape consistency:** MATCH between API response and context expectations.

### 5c. usePermission Hook

Wraps `useRBAC()` and provides:
- `hasPermission(module, action)` — checks `permissions[module].includes(action)`
- `canCreate(mod)`, `canRead(mod)`, `canUpdate(mod)`, `canDelete(mod)` — convenience wrappers

**Note:** There is no `canManage()` convenience method, but "Manage" action is checked directly via `hasPermission('Shop Management', 'Manage')` in components.

### 5d. ProtectedRoute

Two modes:
1. `requiredRoles` — compares `normalizeUserRole(user.role)` against the array (lowercase match)
2. `module` + `action` — calls `hasPermission(module, action)`, with admin bypass (`isAdmin` always passes)

**Admin bypass in ProtectedRoute:** The admin safety-net bypass at line 64 means even if "LMS Management" does not exist in the admin's seed permissions, the admin can still access those routes on the frontend. However, **backend authorize() has no such bypass** — if "LMS Management" is not in the Role document, backend API calls will return 403.

---

## 6. Backend `authorize` vs `checkPermission` — Dual Middleware Issue

Two middleware functions do the same thing:
- `middleware/auth.js` exports `authorize(module, action)`
- `middleware/checkPermission.js` exports `checkPermission(module, action)`

Both look up the Role document and check `permission.module === module && permission.actions.includes(action)`. Both inject `req.scopeFilter`. This is redundant code. Some routes use `authorize`, others use `checkPermission`.

### 6a. WtfSettings `authorize` Misuse

In `routes/v1/wtfSettings.js`, `authorize` is called with an **array** as the first argument:
```js
authorize([WtfPermissions.WTF_ADMIN])
```
The `authorize` function expects `(module, action)` — two strings. When passed an array:
- `module` becomes `["WTF Management"]` (an array)
- `action` becomes `undefined`
- The `permission.module === module` check compares a string against an array — always false
- **Result:** These routes always return 403 for all users

Additionally, `WtfPermissions.WTF_READ` is referenced in `wtfSettings.js` but is **not defined** in `constants/users.js`.

---

## 7. Modules Missing from Seed Data (CRITICAL)

These modules are used in backend `authorize()` / `checkPermission()` calls but have **no entries in the seed data**. Unless these Role documents were manually created in the database, all these routes return 403:

| Missing Module | Used By |
|----------------|---------|
| **LMS Management** | 30+ routes in `routes/v2/lms/admin/*` and `routes/v2/lms/coach/*` |
| **Purchase Management** | `routes/v2/purchase-requests.js`, `routes/v2/shop.js` |
| **Medical Check-in** | `routes/hospitalRoutes.js`, `routes/doctorRoutes.js` |
| **Medical Management** | `routes/medicalCheckInsRoutes.js`, `routes/medicalRecordsRoutes.js` |
| **Schedule Management** | `routes/scheduleRoutes.js` |
| **Daily Schedule** | `routes/userRoutes.js` |
| **Course Management** | `routes/courseRoutes.js` |

---

## 8. Frontend Module Names Not in Seed

| Frontend Module Reference | File | In Seed? |
|--------------------------|------|----------|
| `Balagruha Management` | balagruhamanagement.js | NO |
| `LMS Management` | App.js, AdminCourseDashboard.jsx, CourseStructureBuilder.jsx | NO |

These will fail `hasPermission()` checks unless the Role documents in the database include them. The admin bypass in `ProtectedRoute` masks this for admin users on the frontend, but components that call `hasPermission()` directly (like `AdminCourseDashboard.jsx` line 52) will get `false`.

---

## 9. Summary of Findings

### CRITICAL Issues

| # | Issue | Impact | Severity |
|---|-------|--------|----------|
| C1 | `balagruha-incharge` vs `balagruha in-charge` naming split | Attendance route ProtectedRoute never matches for balagruha-incharge users; backend constants use wrong name | HIGH |
| C2 | 4 roles missing from seed data (medical-incharge, sports-coach, music-coach, amma) | These users fail all authorize/checkPermission calls — 403 on every protected endpoint | HIGH |
| C3 | 7 permission modules missing from seed data (LMS Management, Purchase Management, etc.) | Backend returns 403 for these routes unless DB was manually updated | HIGH |
| C4 | `/api/roles/getAllRolePermissions` has no authentication | Any unauthenticated user can read all roles and permissions | HIGH |
| C5 | `wtfSettings.js` passes arrays to `authorize()` — always returns 403 | WTF settings routes are completely inaccessible | MEDIUM |

### MODERATE Issues

| # | Issue | Impact | Severity |
|---|-------|--------|----------|
| M1 | Duplicate middleware: `authorize` and `checkPermission` do the same thing | Maintenance burden, divergence risk | MEDIUM |
| M2 | Admin bypass only on frontend ProtectedRoute, not on backend | Misleading: admin sees pages but backend API calls may fail | MEDIUM |
| M3 | `WtfPermissions.WTF_READ` referenced but not defined | Runtime error if that code path executes | MEDIUM |
| M4 | Frontend coach/grading/assignments routes have no role guard | Any authenticated user (including students) can navigate there | LOW |
| M5 | `/admin/students/:userId` has no admin role check | Any authenticated user can view any student profile by ID | MEDIUM |

### UX Gaps (Frontend allows, backend may reject)

| Route | Frontend Guard | Backend Guard | Gap |
|-------|---------------|--------------|-----|
| `/coach/assignments` | Auth only | LMS Management / Read | Student navigates to page, gets 403 on API |
| `/coach/grading` | Auth only | LMS Management / Read | Student navigates to page, gets 403 on API |
| `/coach/deliveries` | Auth only | Authenticate only | No gap (both auth-only) |
| `/purchase-manager/low-stock` | Auth only | Shop Management / Manage? | Unclear backend protection |

---

## 10. Recommendations

1. **Normalize role name:** Pick ONE canonical form for balagruha-incharge. The User model enum uses `balagruha-incharge` — update `constants/users.js`, `frontend/src/constants/userTypes.js`, and `App.js` ProtectedRoute to match.

2. **Add missing roles to seed data:** Create Role documents for `medical-incharge`, `sports-coach`, `music-coach`, and `amma` with appropriate permissions.

3. **Add missing modules to seed data:** Add `LMS Management`, `Purchase Management`, `Medical Check-in`, `Medical Management`, `Schedule Management`, `Daily Schedule`, `Course Management`, and `Balagruha Management` to the appropriate Role documents.

4. **Secure `/api/roles/getAllRolePermissions`:** Add `authenticate` middleware. Currently unauthenticated access exposes the entire permission matrix.

5. **Fix `wtfSettings.js` authorize calls:** Change from `authorize([WtfPermissions.WTF_ADMIN])` to `authorize("WTF Management", "Admin")` or similar valid two-argument form.

6. **Add `WTF_READ` to WtfPermissions:** Or remove the reference in `wtfSettings.js`.

7. **Consolidate `authorize` and `checkPermission`:** They are functionally identical. Pick one and migrate all routes.

8. **Add frontend route guards for coach pages:** `/coach/assignments`, `/coach/grading` should use `requiredRoles={['coach', 'admin']}` or `module="LMS Management" action="Read"`.

9. **Add admin guard to `/admin/students/:userId`:** This route allows any authenticated user to view student profiles by ID.

10. **Consider adding `canManage()` to usePermission:** The "Manage" action is used frequently but has no convenience wrapper.
