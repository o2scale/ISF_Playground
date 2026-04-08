# E2E User Flow Testing — Status

**Last Updated:** 2026-04-08  
**Branch:** `stable`  
**Round:** 2 (re-test after S3 upload fix + admin purchase actions fix)
**Resume Point:** Admin — Flow 1 (Dashboard)

---

## Quick Resume

Round 2 started. Test all users fresh. Verify new fixes work (S3 thumbnail upload, admin Mark Ordered button).

---

## Overall Progress — Round 2

| User | Status | Flows Done | Bugs Found | Bugs Fixed | Commit |
|------|--------|-----------|-----------|-----------|--------|
| Admin | ✅ DONE | 11/11 | 1 | 1 | b523237d |
| Coach | ✅ DONE | 11/11 | 1 | 1 | db5b4043 |
| Purchase Manager | ✅ DONE | 5/5 | 1 | 1 | pending commit |
| Medical Incharge | ⏳ PENDING | 0 | — | — | — |
| Student | ⏳ PENDING | 0 | — | — | — |

## Round 1 Results (reference)

| User | Status | Flows Done | Bugs Found | Bugs Fixed | Commit |
|------|--------|-----------|-----------|-----------|--------|
| Admin | ✅ DONE R1 | prior session | — | — | — |
| Coach | ✅ DONE R1 | 11/11 | 4 | 4 | 86fa4f8a |
| Purchase Manager | ✅ DONE R1 | 5/5 | 1 | 1 | f993e9bd |
| Medical Incharge | ✅ DONE R1 | 7/7 | 5 | 5 | 8551118f |
| Student | ✅ DONE R1 | 15/15 | 1 | 1 | 487c8211 |

---

## User 1: Admin

Tested in a prior session before this workflow was created. All admin flows confirmed working.

---

## User 1: Admin — Round 2

**Status: ✅ DONE — Commit: `b523237d`**  
**Login URL:** `http://localhost:3000/admin/login`  
**Nav items:** Dashboard | Users | Machines | Tasks | Attendance | Balagruhas | Courses | Access | Repairs | Purchases (badge) | Shop | WTF | Translations | Assignments

| # | Flow | URL | Result | Notes |
|---|------|-----|--------|-------|
| 1 | Dashboard | /dashboard | ✅ PASS | Welcome banner, balagruha list, nav loads. All 25 balagruhas show |
| 2 | Users | /users | ✅ PASS | User list loads with filters (balagruha, role, status). Edit opens user form with full detail |
| 3 | Machines | /machines | ✅ PASS | 9 machines listed, balagruha filter works |
| 4 | Tasks | /task | ✅ PASS | Kanban board renders (3 columns: Waiting/Working/Done) |
| 5 | Attendance | /attendance | ✅ PASS | All 25 balagruhas listed; select-to-view prompt shown |
| 6 | Balagruhas | /balagruha | ✅ PASS | 25 balagruhas listed with stats (9 machines, 9 assigned) |
| 7 | Courses | /admin/courses | ✅ PASS | 26 courses listed across categories (note: `/courses` 404s, nav goes to `/admin/courses`) |
| 8 | Repairs | /repair | ✅ PASS | 6 repair requests listed with filters |
| 9 | Purchases | /purchase | ✅ FIXED | "Mark Ordered" and "Mark Received at Store" buttons visible (prior fix confirmed). Clicking "Mark Ordered" now succeeds — B12 fixed |
| 10 | Shop | /shop | ✅ PASS | Shop Admin panel loads with Stock Alerts, Quick Stats, Products/Vendors/Inventory tabs, 16 products |
| 11 | WTF | /wtf | ✅ PASS | Admin Controls panel loads with Create New Pin, Full Management, pending suggestions, font/background settings |

**Bonus flows checked:**
- Access (RBAC) → `/rbac` — role list loads (Admin: 67/79 permissions)
- Translations → `/admin/translations` — Translation Management loads (English → Telugu)
- Assignments → `/coach/assignments` — Course Assignments (Admin view) loads

**Bugs found and fixed:**

| ID | Flow | Description | Root Cause | Fix | Status |
|----|------|-------------|-----------|-----|--------|
| B12 | Purchases | Admin "Mark Ordered" button visible but clicking returns 403 "Transition from pending to ordered not allowed for your role" | `purchaseRequestController.js` transition guards only allowed `purchase-manager` role for `pending→ordered`, `ordered→delivered_store`, and `pending→rejected/on_hold` transitions. Admin excluded. | Added `|| userRole === 'admin'` to all three transition guards | ✅ Fixed — b523237d |

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

## User 2: Coach — Round 2

**Status: ✅ DONE — Commit: `db5b4043`**
**Login URL:** `http://localhost:3000/admin/login`
**Nav items:** Dashboard | Users | Machines | Tasks | Attendance | Repairs | Purchases | Shop | WTF | Courses | Assignments

| # | Flow | URL | Result | Notes |
|---|------|-----|--------|-------|
| 1 | Dashboard | /dashboard | ✅ PASS | "Hi coach" heading, 4 balagruhas with stats, Weekly Calendar loads |
| 2 | Attendance | /attendance | ✅ PASS | 4 balagruhas listed; clicking Sadashraya shows 27 students with Present/Absent buttons |
| 3 | Tasks | /task | ✅ PASS | Kanban board renders (Waiting/Working/Done columns) with tasks |
| 4 | Machines | /machines | ✅ PASS | 9 machines listed; balagruha filter shows coach's 4 balagruhas |
| 5 | Purchases | /purchase | ✅ PASS | Purchase requests listed; new purchase form opens as modal; created successfully ("Purchase request created successfully") |
| 6 | Schedule | /schedule | ✅ PASS (INFO) | /schedule 404s — no dedicated route; schedule (Weekly Calendar) is embedded in /dashboard. Content fully functional. |
| 7 | Daily Schedule | /daily-schedule | ✅ PASS (INFO) | /daily-schedule 404s — no dedicated route; Daily Schedule tab in /dashboard renders Weekly Calendar. Functional. |
| 8 | WTF | /wtf | ✅ PASS | Filter tabs (All/Images/Videos/Audio/Text), Suggest Pin button visible |
| 9 | Courses/Grading | /coach/grading | ✅ PASS | "Syllabus Tracker & Grading" loads; Assign Courses button visible; stats show 0 submissions |
| 10 | Repairs | /repair | ✅ PASS | Repair requests listed; new repair form submitted ("Repair request created successfully") |
| 11 | Profile | /profile | ✅ FIXED | Was: "You do not have permission to view this profile" (403). B13 fixed. Now: coach name, email, balagruhas, coin wallet all load |

**Bugs found and fixed:**

| ID | Flow | Description | Root Cause | Fix | Status |
|----|------|-------------|-----------|-----|--------|
| B13 | Profile | Coach gets 403 "You do not have permission to view this profile" on /profile | `checkProfileAccess` in `profileController.js` allows coaches to view students only (line 37: `if (targetUser.role !== 'student') return false`). No self-access check — coach's own profile (role=coach) fails the student guard. | Added self-access check before the student guard: `if (requestingUser._id.toString() === targetUserId.toString()) return true` | ✅ Fixed — db5b4043 |

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

## User 3: Purchase Manager — Round 2

**Status: ✅ DONE — Commit: pending**
**Login URL:** `http://localhost:3000/admin/login`
**Nav items:** Dashboard | Machines | Repairs | Purchases (badge:1) | Low Stock

| # | Flow | URL | Result | Notes |
|---|------|-----|--------|-------|
| 1 | Dashboard | /dashboard | ✅ PASS | Stats load after async delay: 8 Active Repairs, 1 Pending Orders, 8 Low Stock Items, ₹61,598 Total Expenditure |
| 2 | Machines | /machines | ✅ PASS | 9 machines listed; balagruha filter dropdown populated with 15 balagruhas |
| 3 | Repairs | /repair | ✅ PASS | List loads (7 repairs); New Repair form opens with balagruha dropdown populated (B5 scope fix confirmed working); new repair created successfully ("Repair request created successfully") |
| 4a | Purchases — Mark Ordered | /purchase | ✅ PASS | 5 pending requests shown with "🛒 Mark Ordered" buttons; clicked Mark Ordered → "Request marked as ordered" toast; item removed from pending view |
| 4b | Purchases — Machine Repairs | /purchase | ✅ PASS | Switch to "📋 Machine Repairs" type loads 5 repair orders with filters |
| 4c | Purchases — Stock Reconciliation | /purchase | ✅ PASS | Switch to "🧾 Stock Reconciliation" loads 24 products with History/Adjust buttons |
| 5 | Low Stock | /purchase-manager/low-stock | ✅ PASS | 2 low stock items listed (Pearl Hair clip, Girls katewali watch) with Reorder buttons |

**Bugs found and fixed:**

| ID | Flow | Description | Root Cause | Fix | Status |
|----|------|-------------|-----------|-----|--------|
| B14 | Purchases | Stats footer shows "Pending: 0" despite pending items in the list | `ShopInventoryView.jsx` stats footer filtered on `PurchaseRequestStatuses.PENDING_APPROVAL` (`'pending_approval'`) instead of `PurchaseRequestStatuses.PENDING` (`'pending'`) | `frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx` line 1867: changed `PENDING_APPROVAL` to `PENDING` | ✅ Fixed — pending commit |

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

**Status: ✅ DONE — Commit: `487c8211`**  
**Login URL:** `http://localhost:3000/login` (student tab — default)

**Nav items:** Dashboard | My Courses | Shop | WTF  
**Floating buttons:** Mood (😊😢😡) | Chat with Amma | Homework | Help  
**Header buttons:** Coin Balance | Notifications 🔔 | Shopping Cart

| # | Flow | URL | Result | Notes |
|---|------|-----|--------|-------|
| 1 | Login + Dashboard | /student/dashboard | ✅ PASS | Welcome banner, 4 courses shown, progress stats (16 tasks, 0 streak) |
| 2 | My Courses (nav) | /student/dashboard | ✅ PASS | Links to same page as dashboard (courses embedded in dashboard) |
| 3 | Computer Apps course | /student/computer-apps | ✅ PASS | Shows 3 sub-courses with task counts |
| 4 | Course detail / tasks | /student/computer-apps/:courseId | ✅ PASS | Chapter sidebar + content cards (video/pdf/audio/quiz) |
| 5 | Start Quiz (Computer Apps) | /student/computer-apps/quiz/:quizId | ✅ FIXED | Was navigating to `/quiz/[object Object]` — B11 fixed |
| 6 | Life Skills course | /student/life-skills | ✅ PASS | Course page with video, PDF, quiz content items |
| 7 | Start Quiz (Life Skills) | /student/life-skills/quiz/:quizId | ✅ PASS | Navigates correctly, "max attempts exceeded" (expected) |
| 8 | Art course | /student/art | ✅ PASS | Workshops / Free Sketch / Art Stories / Competition tabs |
| 9 | Spoken English course | /student/spoken-english | ✅ PASS (INFO) | "Failed to load task data" shown — no tasks assigned for student 123 (data not seeded). Webcam access fails in headless. Expected. |
| 10 | Shop | /shop | ✅ PASS | 16 products, filters, categories, pagination |
| 11 | Add to Cart | /shop | ✅ PASS | "Product added to cart" toast, badge updates |
| 12 | Cart Drawer | /shop (cart icon) | ✅ PASS | Radix dialog opens, shows items and total; not captured by ARIA tree but JS confirms `role=dialog` present |
| 13 | Checkout | /shop/checkout | ✅ PASS | Shows balance, deductions; order placed (ORD-20260408-67723), coins deducted correctly |
| 14 | My Orders | /shop/orders | ✅ PASS | Order history page renders |
| 15 | Transactions / Coin History | /coins/history | ✅ PASS | Shows all transactions, balance, Export CSV |
| 16 | Product Detail | /shop/products/:id | ✅ PASS | Product image, price, description, breadcrumb |
| 17 | WTF (Wall of Fame) | /wtf | ✅ PASS | Media filter tabs, "No Pins Yet" state |
| 18 | Profile | /profile | ✅ PASS | Student name, email, age shown |
| 19 | Coin Balance Modal | (header button) | ✅ PASS | Transaction history modal with filters |
| 20 | Notifications Bell | (header button) | ✅ PASS (INFO) | Shows badge count but panel not implemented (Sprint 2 backlog) |
| 21 | Homework | /student/homework | ✅ PASS | "Coming Soon" placeholder page |
| 22 | Mood Buttons | (toolbar) | ✅ PASS | Posts to emotion API, shows toast |

**Bugs found:**

| ID | Flow | Description | Root Cause | Fix | Status |
|----|------|-------------|-----------|-----|--------|
| B11 | Course Quiz | Quiz URL renders as `/quiz/[object Object]` — server error | `getCourseHierarchy` does `.populate('quizRef')` then assigns full Quiz object as `quizId`. Template string serializes to `[object Object]` | `computerAppsController.js`: changed `item.quizRef` to `item.quizRef?._id?.toString() || item.quizRef?.toString() || null` | ✅ Fixed — 487c8211 |

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
| B11 | Student | Computer Apps Quiz | Quiz URL `/quiz/[object Object]` — populated quizRef object serialized to string instead of ID | ✅ Fixed | 487c8211 |
| B12 | Admin | Purchases | Admin "Mark Ordered" button returns 403 "Transition from pending to ordered not allowed for your role" | ✅ Fixed | b523237d |
| B13 | Coach | Profile | Coach /profile returns 403 "You do not have permission to view this profile" — self-access blocked by student-only guard | ✅ Fixed | db5b4043 |
| B14 | PM | Purchases | Purchase stats footer shows "Pending: 0" while pending items visible in list | `ShopInventoryView.jsx` stats footer filtered on `PENDING_APPROVAL` (`'pending_approval'`) instead of `PENDING` (`'pending'`) | ✅ Fixed — pending commit |

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
- **Populated MongoDB refs in API responses**: When using `.populate()` on a ref field, always extract `.toString()` or `._id.toString()` before sending to frontend. Raw ObjectId objects serialize as `[object Object]` in template strings. Affects: `computerAppsController.getCourseHierarchy` quizRef field (fixed B11).
- **Student cart drawer**: Uses Radix UI Dialog portal — not captured by gstack ARIA snapshot. Use `document.querySelector('[role=dialog]').innerText` to verify content.
- **Spoken English no tasks**: Student 123 has no spoken-english tasks assigned. Error state is expected behavior, not a bug. Route `/student/spoken-english/task1` returns `Invalid Task ID`.
- **Notification panel not implemented**: TitleBar bell click is a no-op by design (`// Sprint 2 Epic 5 backlog`). Badge count works; panel does not.
- **Profile self-access for non-student roles**: `profileController.checkProfileAccess` gates non-students via a student-role guard. Any non-student, non-admin role viewing their own profile was blocked. Fixed B13 (coach). Other specialist roles (purchase-manager, medical-incharge) should be verified similarly.
- **Coach schedule/daily-schedule routes**: No separate /schedule or /daily-schedule routes exist. The coach dashboard (/dashboard) embeds the Weekly Calendar and Daily Schedule tab inline. These 404 if navigated directly.
