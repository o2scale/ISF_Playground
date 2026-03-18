# Client Bug Reports

**Tracker:** Manual (client-reported)
**Last Updated:** 2026-03-18

---

## Admin Bugs

### Open

| ID | Module / View | Problem Description | Reported Behavior | Status | Reported Date | Comments |
|----|---------------|---------------------|-------------------|--------|---------------|----------|
| A-1 | Admin (Course) | Assign course failure | Clicking "Assign Course" causes a blank screen | Open | 2026-03-09 | Reported by San |
| A-2 | Admin (Purchase) | Missing Approval Action | No "Approve" button visible for purchase requests sent from PM | Regression | 2026-03-09 | Was working, now broken again — button not visible |
| A-4 | Admin (Translation Mgmt) | Translation management not active | No courses available in published course dropdown | Open | 2026-03-06 | |
| A-6 | Admin (ISF Shop) | Missing back button in Zero Purchases Report | ISF Shop > Reports > Zero Purchases Report > View Student Profile — no back button | Open | 2026-03-06 | |
| A-7 | Admin (Course) | Assign course failure (dup of A-1) | Same as A-1 — blank screen on assign course | Duplicate | | |

### Resolved

| ID | Module / View | Problem Description | Reported Behavior | Status | Reported Date | Comments |
|----|---------------|---------------------|-------------------|--------|---------------|----------|
| A-3 | Admin (Course) | Permission Error | Admin gets "Access Denied" when creating/adding courses | Fixed | 2026-03-09 | Now able to add new courses |
| A-8 | Admin (ISF Shop) | SKU Field Logic | SKU labeled "Optional" but was mandatory to proceed | Fixed | 2026-03-09 | Now not mandatory. Client suggests auto-generating SKU |

---

## Coach Bugs

### Open

| ID | Module / View | Problem Description | Reported Behavior | Status | Reported Date | Comments |
|----|---------------|---------------------|-------------------|--------|---------------|----------|
| C-4 | Coach (Assignment) | No progress in Assignment section | Clicked "Assign New Course" — progress stays at 0% | Open | 2026-03-06 | |
| C-6 | Coach (Users) | Add New User tab missing | Through coach view, not able to add new user | Open | 2026-03-04 | |
| C-7 | Coach (Dashboard > Schedule) | Schedule timing format | Time needs to change from 24hr clock to 12hr | Open | 2026-03-04 | |
| C-8 | Coach (Assignment) | No progress in Assignment section (dup of C-4) | Same as C-4 | Duplicate | 2026-03-06 | |

### Resolved

| ID | Module / View | Problem Description | Reported Behavior | Status | Reported Date | Comments |
|----|---------------|---------------------|-------------------|--------|---------------|----------|
| C-1 | Coach (Shop) | Shop request missing data | "Select Balagruha" dropdown empty, preventing item requests | Fixed | | Working — request goes to Purchase Manager |
| C-2 | Coach (Courses) | Empty course folders | Courses section incomplete, no content visible | Fixed | | Visible now |
| C-3 | Coach (Shop) | Shop request missing data (root cause) | Same as C-1 | Fixed | | Changed `user?._id` to `user?.id` in RequestItemModal.jsx to match AuthContext |
| C-5 | Coach (Courses) | Empty course folders (dup of C-2) | Same as C-2 | Fixed | | |

---

## Student Bugs

### Open

| ID | Module / View | Problem Description | Reported Behavior | Status | Reported Date | Comments |
|----|---------------|---------------------|-------------------|--------|---------------|----------|
| S-1 | Student (Course) | Admin-to-student course workflow broken | Published course + quiz via admin not available in student view | Open | 2026-02-26 | |
| S-2 | Student (ISF Shop) | Order workflow unclear | Made an order but unclear who receives it | Open | 2026-03-06 | |
| S-9 | Student (Quiz) | Reward error | Correct quiz answers occasionally result in "0 Coins Earned" | Open | | |
| S-10 | Student (Coins) | Duplicate rewards | Coin history shows multiple rewards for the same quiz attempt | Open | 2026-03-04 | |

### Resolved

| ID | Module / View | Problem Description | Reported Behavior | Status | Reported Date | Comments |
|----|---------------|---------------------|-------------------|--------|---------------|----------|
| S-7 | Student | Missing logout option | No "Log out" option in Student view | Fixed | | |
| S-8 | Student (Quiz) | Quiz logic failure | Students can exceed max 3 quiz attempts | Fixed | 2026-03-06 | |
| S-11 | Student (ISF Shop) | Missing shopping cart | Products can be "Added to Cart" but no cart icon/page visible | Fixed | 2026-03-04 | |

---

## Purchase Manager Bugs

### Open

| ID | Module / View | Problem Description | Reported Behavior | Status | Reported Date | Comments |
|----|---------------|---------------------|-------------------|--------|---------------|----------|
| PM-1 | PM (ISF Shop) | Missing supplier data | Vendors added via Admin not appearing in purchase supplier list | Open | | |

---

## Medical Bugs

### Open

| ID | Module / View | Problem Description | Reported Behavior | Status | Reported Date | Comments |
|----|---------------|---------------------|-------------------|--------|---------------|----------|
| M-1 | Medical | Missing UI — doctors data bank | Need doctors data bank — UI shared by S mam | Pending | 2025-03-10 | |
| M-2 | Medical (Shop) | Add to Cart crashes app | "Add to Cart" button should not exist for medical incharge. Clicking it blanks the screen and app stops opening | Critical | | App-breaking crash |

---

## Backend / Frontend Fixes (Historical — 2026-02-24)

All resolved during Sprint 5 development session.

| ID | Module / View | Problem Description | Status | Resolved Date | Comments |
|----|---------------|---------------------|--------|---------------|----------|
| BF-1 | Backend / purchase-requests.js | `/pending-count` returning 400 — matched as `:id` param | Fixed | 2026-02-24 | Moved static routes before dynamic `/:id` |
| BF-2 | Backend / shop.js | Products not showing when purchaseCategory doesn't match | Fixed | 2026-02-24 | Added fallback to check category field |
| BF-3 | Backend / api.js | Out of stock products hidden from purchase request | Fixed | 2026-02-24 | Added `inStock=false` parameter |
| BF-4 | Frontend / ProductManagement.jsx | Category filter mismatch with product creation | Fixed | 2026-02-24 | Updated filter categories to match |
| BF-5 | Frontend / CreatePurchaseRequestModal.jsx | Missing estimated unit cost input | Fixed | 2026-02-24 | Added cost input with grand total calculation |
| BF-6 | Frontend / ShopInventoryView.jsx | PM not seeing pending_approval requests | Fixed | 2026-02-24 | Changed default filter to 'active', added Pending Approval tab |
| BF-7 | Backend / purchaseRequestController.js | Approval workflow skipping fulfillment | Fixed | 2026-02-24 | Changed approval status from 'approved' to 'pending' |
| BF-8 | Frontend / CreatePurchaseRequestModal.jsx | Edit modal not pre-filling data | In Progress | 2026-02-24 | Added key prop for remount, added estimated costs |

---

## Client Suggestions

- **Auto-generate SKU:** Client suggests Playground should automatically create a new SKU for every product (raised with A-8)
- **Doctors Data Bank UI:** S mam shared UI design for medical data bank (M-1)

---

## Summary

| Role | Open | Regression | Resolved | Duplicate |
|------|------|------------|----------|-----------|
| Admin | 3 | 1 | 2 | 1 |
| Coach | 3 | 0 | 4 | 1 |
| Student | 4 | 0 | 3 | 0 |
| Purchase Manager | 1 | 0 | 0 | 0 |
| Medical | 2 | 0 | 0 | 0 |
| Backend/Frontend | 0 | 0 | 7 | 0 |
| **Total** | **13** | **1** | **16** | **2** |
