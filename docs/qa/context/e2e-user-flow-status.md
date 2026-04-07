# E2E User Flow Testing — Status

**Last Updated:** 2026-04-08  
**Branch:** `stable`  
**Resume Point:** Student — Flow 1 (Login + Dashboard)

---

## Quick Resume

1. Read `e2e-user-flow-workflow.md` for techniques
2. Next user: Student (User ID: 123)
3. Login at http://localhost:3000/login (student tab — default)
4. Check nav items, then test all flows

---

## Overall Progress

| User | Status | Flows Done | Bugs Found | Bugs Fixed | Commit |
|------|--------|-----------|-----------|-----------|--------|
| Admin | ✅ DONE | prior session | — | — | — |
| Coach | ✅ DONE | 11/11 | 4 | 4 | 86fa4f8a |
| Purchase Manager | ✅ DONE | 5/5 | 1 | 1 | f993e9bd |
| Medical Incharge | ✅ DONE | 7/7 | 5 | 5 | 8551118f |
| Student | ⏳ PENDING | 0/? | — | — | — |

---

## User 1: Admin

Tested in a prior session before this workflow was created. All admin flows confirmed working.

---

## User 2: Coach (`coach@gmail.com / password123`)

**Status: ✅ DONE — Commit: `86fa4f8a`**

| # | Flow | URL | Result |
|---|------|-----|--------|
| 1 | Dashboard | /dashboard | ✅ PASS |
| 2 | Attendance | /attendance | ✅ PASS |
| 3 | Tasks | /task | ✅ PASS |
| 4 | Machines | /machines | ✅ PASS |
| 5 | Purchases | /purchase | ✅ PASS |
| 6 | Schedule | /schedule | ✅ PASS |
| 7 | Daily Schedule | /daily-schedule | ✅ PASS |
| 8 | WTF | /wtf | ✅ PASS |
| 9 | LMS / Course Assignment | /coach/grading | ✅ PASS |
| 10 | Repair | /repair | ✅ PASS |
| 11 | Profile | /profile | ✅ PASS |

**Bugs fixed:**
- B1: `updateRolePermissions` API silently drops `scope` — fixed `roleController.js`
- B2: ProtectedRoute race with empty permissions — fixed `ProtectedRoute.js`
- B3: MachineManagement blocked non-admin with Read permission — fixed `MachineManagement.jsx`
- B4: Coach role `scope:'own'` blocked balagruha-level routes — fixed via MongoDB script

---

## User 3: Purchase Manager (`purchase@gmail.com / password123`)

**Status: ✅ DONE**  
**Login URL:** `http://localhost:3000/admin/login`

**Nav items:** Dashboard | Machines | Repairs | Purchases (badge:1) | Low Stock

| # | Flow | URL | Result | Notes |
|---|------|-----|--------|-------|
| 1 | Dashboard | /dashboard | ✅ PASS | 0 Active Repairs, 0 Pending Orders, 8 Low Stock |
| 2 | Machines | /machines | ✅ PASS | 9 machines listed, table renders |
| 3 | Repairs | /repair | ✅ PASS | Balagruha dropdown populated (B5 fixed). Form submitted, "Repair request created successfully" |
| 4 | Purchases | /purchase | ✅ PASS | Purchase requests listed, "Mark Ordered" action works ("Request marked as ordered") |
| 5 | Low Stock | /purchase-manager/low-stock | ✅ PASS | 2 low stock items listed with Reorder buttons. Note: correct URL is /purchase-manager/low-stock not /low-stock |

**Bugs found:**

| ID | Flow | Description | Root Cause | Fix | Status |
|----|------|-------------|-----------|-----|--------|
| B5 | Repairs (Flow 3) | Balagruha dropdown empty in New Repair form | PM role `scope:'own'` causes `{ _id: user._id }` filter on Balagruha query — matches nothing | MongoDB: updated all PM modules `own` → `balagruh` via Node.js script | ✅ Fixed, not yet committed |

---

## User 4: Medical Incharge (`medin@gmail.com / password123`)

**Status: ✅ DONE — Commit: `8551118f`**  
**Login URL:** `http://localhost:3000/admin/login`

**Nav items (internal dashboard):** Dashboard | Students | Check Ins | Tasks | Purchases | Shop  
**Nav items (outer layout, off-dashboard):** Dashboard | Students | Check Ins | Tasks | Machines | Purchases | Shop

| # | Flow | URL | Result | Notes |
|---|------|-----|--------|-------|
| 1 | Login + Dashboard | /dashboard | ✅ PASS | Health Overview loaded: 2 Closed cases, Yeshaswani BG shown |
| 2 | Students tab | /dashboard (state: activeTab=students) | ✅ PASS | UserManagement renders with 24 students; balagruha filter populated (after B6+B7 fix) |
| 3 | Check Ins tab | /dashboard (state: activeTab=checkins) | ✅ PASS | 2 check-ins listed; "Record New Check-in" form works — student dropdown populates (after B8 fix); record created successfully |
| 4 | Tasks tab | /dashboard (state: activeTab=tasks) | ✅ PASS | TaskManagement renders inline; tasks load (after B9+B10 fix) |
| 5 | Machines | /machines | ✅ PASS | 9 machines listed; balagruha filter shows Yeshaswani |
| 6 | Purchases | /purchase | ✅ PASS | Purchase Management page loads; New Purchase Request button visible |
| 7 | Shop | /shop | ✅ PASS | ISF Shop loads with product categories |

**Bugs fixed:**

| ID | Flow | Description | Root Cause | Fix | Status |
|----|------|-------------|-----------|-----|--------|
| B6 | All | Medical-incharge role `scope:'own'` blocked all balagruha-level data | Same scope bug pattern as B4/B5; all modules set to 'own' | MongoDB: updated all medical-incharge modules `own` → `balagruh` | ✅ Fixed — 8551118f |
| B7 | Students | Students tab showed 0 users; balagruha filter empty | Missing `User Management Read` permission — `/api/v1/balagruha/user/:id` returns 403 | MongoDB: added User Management Read (balagruh scope) to role | ✅ Fixed — 8551118f |
| B8 | Check Ins | Student dropdown in New Check-in form always empty after balagruha selected | `getAnyUserBasedonRoleandBalagruha` called `/role/${role}/balagruha/${id}` (non-existent route) instead of `/role/${role}?balagruhaId=${id}` | `frontend/src/api/users.js`: corrected URL pattern | ✅ Fixed — 8551118f |
| B9 | Tasks | Tasks nav navigated to `/task` (ProtectedRoute redirect) instead of opening tasks tab | Internal dashboard `sportCoachMenu` had `link: "/task"` override; click handler takes link over activeTab | `medicalIncharge.js`: removed `link: "/task"` from Tasks menu entry so `setActiveTab("tasks")` fires | ✅ Fixed — 8551118f |
| B10 | Tasks/Machines | `/task` and `/machines` routes redirected to `/dashboard` for medical-incharge | Missing Task Management Read and Machine Management Read permissions in role | MongoDB: added Task Management Read, Machine Management Read, Purchase Management Create+Read (all balagruh scope) | ✅ Fixed — 8551118f |

---

## User 5: Student (User ID: 123)

**Status: ⏳ PENDING**  
**Login URL:** `http://localhost:3000/login` (student tab — default)

| # | Flow | URL | Result | Notes |
|---|------|-----|--------|-------|
| 1 | Login + Dashboard | /student/dashboard | ⏳ | |
| 2 | TBD after checking nav | TBD | ⏳ | |

---

## All Bugs Found

| ID | User | Flow | Description | Status | Fix Commit |
|----|------|------|-------------|--------|-----------|
| B1 | Coach | All | `updateRolePermissions` API drops `scope` field | ✅ Fixed | 86fa4f8a |
| B2 | Coach | Machines | ProtectedRoute race: empty permissions → redirect | ✅ Fixed | 86fa4f8a |
| B3 | Coach | Machines | `MachineManagement.jsx` blocks non-admin with Read permission | ✅ Fixed | 86fa4f8a |
| B4 | Coach | Attendance | Coach role `scope:'own'` blocks balagruha-level routes | ✅ Fixed | 86fa4f8a |
| B5 | PM | Repairs | PM role `scope:'own'` → balagruha dropdown empty in forms | ✅ Fixed | f993e9bd |
| B6 | MedIn | All | Medical-incharge role `scope:'own'` blocks all balagruha-level data | ✅ Fixed | 8551118f |
| B7 | MedIn | Students | Missing User Management Read → students page empty | ✅ Fixed | 8551118f |
| B8 | MedIn | Check Ins | `getAnyUserBasedonRoleandBalagruha` wrong URL `/role/role/balagruha/id` → 404 | ✅ Fixed | 8551118f |
| B9 | MedIn | Tasks | Internal dashboard Tasks menu has `link:"/task"` → bypasses tab, causes ProtectedRoute redirect | ✅ Fixed | 8551118f |
| B10 | MedIn | Tasks/Machines | Missing Task Management Read + Machine Management Read permissions | ✅ Fixed | 8551118f |

---

## Gotchas for Future Agents

- **Nav plural vs singular**: `/tasks`, `/repairs`, `/purchases` in links but routes are `/task`, `/repair`, `/purchase`
- **Role-prefixed routes**: Some PM pages use `/purchase-manager/low-stock` not `/low-stock` — always click the nav link to discover the actual URL
- **React selects**: use `__reactProps.onChange({target:{value:...}})` — `$B select` doesn't work
- **Scope bug pattern**: If any role shows empty dropdowns for balagruha selects, check `scope` in MongoDB roles collection. Run fix script from `backend/` dir
- **Server no-restart**: Backend is `node server.js` without nodemon. Fix DB directly via script, or restart the server if code changes are needed
- **Admin token**: `POST /api/auth/login` with admin creds → extract `.data.token`
- **Student login**: default `/login` page is student login; staff login is at `/admin/login`
- **Medical-incharge custom dashboard**: Has an internal nav (sportCoachMenu) that overrides Layout nav on /dashboard. The internal menu uses `setActiveTab()` for tabs and `navigate(link)` for external pages. Any item with a `link` property skips the tab — must remove `link` for tabs to work.
- **Permission gaps on new roles**: Medical-incharge (and likely other specialist roles) were missing common module permissions (User Management, Task Management, Machine Management). Check with `/api/roles` if pages redirect unexpectedly.
- **getAnyUserBasedonRoleandBalagruha API**: Correct URL is `/api/v1/users/role/${role}?balagruhaId=${id}` (query param), NOT a path segment pattern.
