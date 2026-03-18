# Client Bug Reports

**Tracker:** Manual (client-reported)
**Last Updated:** 2026-03-18
**Status:** All known bugs resolved ✅

---

## Open Bugs

None currently open.

---

## Resolved Bugs

### Admin

| ID | Module / View | Problem Description | Reported Behavior | Status | Reported Date | Resolved | Comments |
|----|---------------|---------------------|-------------------|--------|---------------|----------|----------|
| A-1 | Admin (Course) | Assign course blank screen | Clicking "Assign Course" causes a blank screen | Fixed | 2026-03-09 | 2026-03-18 | CourseAssignmentModal routes to admin endpoint when isAdmin — commit 07980228 |
| A-2 | Admin (Purchase) | Missing Approval Action | No "Approve" button visible for PM on pending_approval requests | Fixed | 2026-03-09 | 2026-03-18 | Approve/Reject buttons restored to ViewRequestModal for PM role — commit 21908b22 |
| A-3 | Admin (Course) | Permission Error | Admin gets "Access Denied" when creating/adding courses | Fixed | 2026-03-09 | 2026-03-09 | Now able to add new courses |
| A-4 | Admin (Translation Mgmt) | Translation management not active | No courses available in published course dropdown | Fixed | 2026-03-06 | 2026-03-18 | Response key fixed to data.courses in TranslationDashboard — commit 07980228 |
| A-6 | Admin (ISF Shop) | Missing back button in Zero Purchases Report | No back button when viewing student profile from report | Fixed | 2026-03-06 | 2026-03-18 | Back button added to StudentProfile conditioned on !isOwnProfile — commit 07980228 |
| A-7 | Admin (Course) | Assign course blank screen (dup of A-1) | Same as A-1 | Fixed | — | 2026-03-18 | Duplicate of A-1 |
| A-8 | Admin (ISF Shop) | SKU Field Logic | SKU labeled "Optional" but was mandatory to proceed | Fixed | 2026-03-09 | 2026-03-09 | Now not mandatory |

### Coach

| ID | Module / View | Problem Description | Reported Behavior | Status | Reported Date | Resolved | Comments |
|----|---------------|---------------------|-------------------|--------|---------------|----------|----------|
| C-1 | Coach (Shop) | Shop request missing data | "Select Balagruha" dropdown empty | Fixed | — | — | user?._id → user?.id in RequestItemModal.jsx |
| C-2 | Coach (Courses) | Empty course folders | No content visible | Fixed | — | — | |
| C-3 | Coach (Shop) | Shop request missing data (dup of C-1) | Same as C-1 | Fixed | — | — | Root cause identified |
| C-4 | Coach (Assignment) | No progress in Assignment section | Progress stuck at 0% after assign | Fixed | 2026-03-06 | 2026-03-18 | Real progress computed from StudentProgress model in coachAssignmentController — commit 07980228 |
| C-5 | Coach (Courses) | Empty course folders (dup of C-2) | Same as C-2 | Fixed | — | — | |
| C-6 | Coach (Users) | Add New User tab missing | Coach cannot add new user | Fixed | 2026-03-04 | 2026-03-18 | User Management Create+Read added to coach role in setupDefaultRoles — commit 07980228 |
| C-7 | Coach (Dashboard > Schedule) | Schedule 24hr clock | Time needs to change to 12hr format | Fixed | 2026-03-04 | 2026-03-18 | toLocaleTimeString('en-US', { hour12: true }) in WeeklyCalendar — commit 07980228 |
| C-8 | Coach (Assignment) | No progress (dup of C-4) | Same as C-4 | Fixed | 2026-03-06 | 2026-03-18 | Duplicate of C-4 |

### Student

| ID | Module / View | Problem Description | Reported Behavior | Status | Reported Date | Resolved | Comments |
|----|---------------|---------------------|-------------------|--------|---------------|----------|----------|
| S-1 | Student (Course) | Admin-published course not visible | Published course+quiz not in student view | Fixed | 2026-02-26 | 2026-03-18 | Populate syntax fixed for contentItems.quizRef in lifeSkills/computerApps controllers — commit 07980228 |
| S-2 | Student (ISF Shop) | Order workflow unclear | Unclear who receives order | Fixed | 2026-03-06 | 2026-03-18 | "Sent to Purchase Manager" message added to OrderConfirmation — commit 07980228 |
| S-7 | Student | Missing logout option | No "Log out" in Student view | Fixed | — | — | |
| S-8 | Student (Quiz) | Quiz logic failure | Students can exceed 3 attempts | Fixed | 2026-03-06 | — | |
| S-9 | Student (Quiz) | Reward error — 0 coins on correct | Correct answers give 0 coins | Fixed | — | 2026-03-18 | Score check added: (passed && !alreadyPassed) ? baseCoins : 0 — commit 07980228 |
| S-10 | Student (Coins) | Duplicate coin rewards | Coin history shows multiple rewards for same attempt | Fixed | 2026-03-04 | 2026-03-18 | alreadyPassed check via StudentProgress model normalised to quiz._id — commit 07980228 |
| S-11 | Student (ISF Shop) | Missing shopping cart | No cart icon/page visible | Fixed | 2026-03-04 | — | |

### Purchase Manager

| ID | Module / View | Problem Description | Reported Behavior | Status | Reported Date | Resolved | Comments |
|----|---------------|---------------------|-------------------|--------|---------------|----------|----------|
| PM-1 | PM (ISF Shop) | Missing supplier data | Vendors added via Admin not in supplier list | Fixed | — | 2026-03-18 | Vendor route filter corrected to match product approvedVendors — commit 07980228 |

### Medical

| ID | Module / View | Problem Description | Reported Behavior | Status | Reported Date | Resolved | Comments |
|----|---------------|---------------------|-------------------|--------|---------------|----------|----------|
| M-1 | Medical | Missing UI — doctors data bank | Need doctors data bank (UI shared by S mam) | Pending | 2025-03-10 | — | Net-new feature — belongs in future sprint |
| M-2 | Medical (Shop) | Add to Cart crashes app | Cart button crashes entire app for medical role | Fixed | — | 2026-03-18 | Cart button hidden for medical-incharge in ProductCard/ProductDetail — commit 07980228 |

---

## Backend / Frontend Fixes (Historical — 2026-02-24)

All resolved during Sprint 5 development session.

| ID | Module / View | Problem Description | Status | Resolved Date |
|----|---------------|---------------------|--------|---------------|
| BF-1 | Backend / purchase-requests.js | `/pending-count` returning 400 | Fixed | 2026-02-24 |
| BF-2 | Backend / shop.js | Products not showing on category filter | Fixed | 2026-02-24 |
| BF-3 | Backend / api.js | Out of stock products hidden from PM | Fixed | 2026-02-24 |
| BF-4 | Frontend / ProductManagement.jsx | Category filter mismatch | Fixed | 2026-02-24 |
| BF-5 | Frontend / CreatePurchaseRequestModal.jsx | Missing estimated unit cost field | Fixed | 2026-02-24 |
| BF-6 | Frontend / ShopInventoryView.jsx | PM not seeing pending_approval requests | Fixed | 2026-02-24 |
| BF-7 | Backend / purchaseRequestController.js | Approval workflow skipping fulfillment | Fixed | 2026-02-24 |
| BF-8 | Frontend / CreatePurchaseRequestModal.jsx | Edit modal not pre-filling data | Fixed | 2026-02-24 |

---

## Client Suggestions (Pending)

- **Auto-generate SKU:** Client suggests Playground should automatically create a new SKU for every product (raised with A-8) — backlog
- **Doctors Data Bank UI:** S mam shared UI design for medical data bank (M-1) — future sprint

---

## Summary

| Role | Fixed | Pending Feature |
|------|-------|----------------|
| Admin | 7 | 0 |
| Coach | 5 | 0 |
| Student | 6 | 0 |
| Purchase Manager | 1 | 0 |
| Medical | 1 | 1 (M-1 net-new) |
| Backend/Frontend | 8 | 0 |
| **Total** | **28** | **1** |
