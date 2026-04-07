# E2E User Flow Testing — Status

**Last Updated:** 2026-04-08  
**Branch:** `stable`  
**Resume Point:** Medical Incharge — Flow 1 (Login + Dashboard)

---

## Quick Resume

1. Read `e2e-user-flow-workflow.md` for techniques
2. Next user: Medical Incharge (medin@gmail.com / password123)
3. Login at http://localhost:3000/admin/login
4. Check nav items, then test all flows

---

## Overall Progress

| User | Status | Flows Done | Bugs Found | Bugs Fixed | Commit |
|------|--------|-----------|-----------|-----------|--------|
| Admin | ✅ DONE | prior session | — | — | — |
| Coach | ✅ DONE | 11/11 | 4 | 4 | 86fa4f8a |
| Purchase Manager | ✅ DONE | 5/5 | 1 | 1 | pending commit |
| Medical Incharge | ⏳ PENDING | 0/? | — | — | — |
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

**Status: ⏳ PENDING**  
**Login URL:** `http://localhost:3000/admin/login`

First, check nav items after login to determine which flows to test.

| # | Flow | URL | Result | Notes |
|---|------|-----|--------|-------|
| 1 | Login + Dashboard | /dashboard | ⏳ | |
| 2 | TBD after checking nav | TBD | ⏳ | |

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
| B5 | PM | Repairs | PM role `scope:'own'` → balagruha dropdown empty in forms | ✅ Fixed | pending commit |

---

## Gotchas for Future Agents

- **Nav plural vs singular**: `/tasks`, `/repairs`, `/purchases` in links but routes are `/task`, `/repair`, `/purchase`
- **Role-prefixed routes**: Some PM pages use `/purchase-manager/low-stock` not `/low-stock` — always click the nav link to discover the actual URL
- **React selects**: use `__reactProps.onChange({target:{value:...}})` — `$B select` doesn't work
- **Scope bug pattern**: If any role shows empty dropdowns for balagruha selects, check `scope` in MongoDB roles collection. Run fix script from `backend/` dir
- **Server no-restart**: Backend is `node server.js` without nodemon. Fix DB directly via script, or restart the server if code changes are needed
- **Admin token**: `POST /api/auth/login` with admin creds → extract `.data.token`
- **Student login**: default `/login` page is student login; staff login is at `/admin/login`
