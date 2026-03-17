# QA-D8: Sprint 6 Regression + Cross-Sprint Integration
Date: 2026-03-17 | Sprint: 6 | Scope: Regression

## Summary
Backend and frontend test suites both pass with zero failures. However, code tracing reveals a **critical coin flow breakage** in the LMS grading controller -- grading-earned coins never actually reach the student's Coin wallet. Additionally, order routes lack RBAC `authorize` middleware, and the `getAllOrders` admin endpoint is unprotected beyond basic authentication.

## Backend Test Results
```
Test Suites: 38 passed, 38 total
Tests:       1 skipped, 828 passed, 829 total
Snapshots:   0 total
Time:        41.724 s
```
All 38 suites pass. 1 test skipped (not a failure). No regressions detected.

## Frontend Test Results
```
Test Suites: 10 passed, 10 total
Tests:       32 passed, 32 total
Snapshots:   0 total
Time:        8.428 s
```
All 10 suites pass. Some `act(...)` warnings in CreatePurchaseRequestModal tests (non-blocking).

## Coin Flow Trace

### Earn Path 1: LMS Grading (BROKEN)
1. **Frontend**: `ArtGradingInterface.handleGrade()` / `AudioGradingInterface.handleGrade()` / `VideoGradingInterface.handleGrade()` POST to `/api/v2/lms/coach/grading/submissions/:id/grade` with `{ coinsAwarded, quality, feedback }`.
2. **Route**: `backend/routes/v2/lms/coach/grading.js:29-33` -> `coachGradingController.submitGrade`.
3. **Controller**: `backend/controllers/lms/coach/coachGradingController.js:113-234` -> `submitGrade()`:
   - Line 178: Creates `new Coin({ userId, amount, type: "earned", source: "submission_grade", ... })` -- a **standalone document**.
   - Line 190: `await coinTransaction.save()` -- this creates a **new Coin document** rather than appending to the user's existing Coin record's `transactions` array.
   - Line 193-195: `User.findByIdAndUpdate(studentId, { $inc: { coins: coinsAwarded } })` -- increments `User.coins`, a field that **does not exist** in the User model schema.

   **CRITICAL BUGS**:
   - `source: "submission_grade"` is NOT in the Coin model's `source` enum (valid: wtf, attendance, task, medical, sports, music, general, shop). Mongoose validation will **reject** this save, causing the entire grade submission to fail with a 500 error.
   - Even if source were valid, `new Coin()` creates a separate document instead of appending to the existing user's Coin record. The order/spend system reads from `Coin.findOne({ userId })` which expects a single document per user.
   - `User.coins` field does not exist in the User schema, so `$inc: { coins }` silently creates an orphan field.

4. **Bulk grading** (`bulkGrade` at line 242) has the same three bugs.

### Earn Path 2: Manual Award (CORRECT)
- `backend/controllers/lms/coach/manualAwardController.js:14` -> `awardCoins()`
- Uses `Coin.findOrCreateForUser(studentId)` then `coinRecord.addCoins()` -- correctly appends to the existing Coin document's transactions array and updates balance.

### Earn Path 3: WTF Coins (CORRECT)
- `backend/services/coin.js::CoinService` methods (awardPinCreationCoins, awardSubmissionApprovalCoins, awardInteractionCoins)
- All use `Coin.awardWtfCoins()` which correctly updates the single Coin document.

### Balance Check (CORRECT)
- Frontend: `CoinBalanceContext` -> `getUserCoinBalance()` -> `GET /api/v1/coin/balance`
- Backend: `coinController.getUserBalance()` -> `CoinService.getUserBalance()` -> `Coin.getUserBalance(userId)`
- Reads from `Coin.balance` on the single Coin document per user.

### Spend Path: Shop Orders (CORRECT)
- `orderController.createOrder()` -> `orderService.createOrder(userId)`
- `backend/services/order.js:25-205`: Atomic transaction that:
  1. Finds `Coin.findOne({ userId })` (the single Coin document)
  2. Validates `coinRecord.balance >= totalAmount`
  3. Deducts from `coinRecord.balance`
  4. Pushes `{ type: 'spent', source: 'shop', ... }` to `coinRecord.transactions`
  5. Saves within MongoDB session

### Flow Verdict
The earn-to-spend flow is **broken at the LMS grading step**. Coins earned through LMS grading (the primary earn mechanism for students) will:
1. Fail Mongoose validation due to invalid `source` enum value
2. Even if fixed, would create orphan Coin documents not visible to balance/spend logic
3. Would write to a non-existent `User.coins` field

The WTF earn path and manual award path are correctly connected to the spend path.

## Dead Code Removal Verification

### Deleted files with NO remaining broken imports (clean):
- `frontend/src/components/Navigation.js` -- no imports found
- `frontend/src/components/PermissionGuard.jsx` -- no imports found
- `frontend/src/components/RoleBasedNavigation.js` -- no imports found
- `frontend/src/components/cards/cards.js` / `cards.css` -- no imports found
- `frontend/src/components/header/header.js` / `header.css` -- no imports found
- `frontend/src/components/sidebar/sidebar.js` / `sidebar.css` -- no imports found
- `frontend/src/components/dashboard/DoctorVisitsSection.js` -- no imports found (MultipleDoctorVisitsSection still exists separately)
- `frontend/src/components/dashboard/FollowUpSection.js` -- no imports found
- `frontend/src/components/student/coins/CoinAnimation.jsx` -- no imports found
- `frontend/src/components/student/computer-apps/LevelCard.jsx` -- no imports found
- `frontend/src/components/student/computer-apps/TaskDetails.jsx` -- no imports found
- `frontend/src/components/wtf/LevelIndicators.js` -- no imports found
- `frontend/src/utils/apiInstance.js` -- no imports found
- `frontend/src/hooks/use-mobile.tsx` -- no imports found
- `frontend/src/hooks/use-toast.ts` -- no imports found
- `frontend/src/components/usermanagement/form.js` -- deleted, but `usermanagement.js` still exists and is the actual import target

### Shadcn/UI components (`frontend/src/components/ui/*.tsx`) -- all deleted:
- accordion, alert-dialog, alert, aspect-ratio, avatar, breadcrumb, button.tsx, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, drawer, dropdown-menu, form, hover-card, input-otp, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, separator, sheet, sidebar, skeleton, slider, sonner, switch, table, tabs, textarea, toast, toaster, toggle-group, toggle, tooltip, use-toast
- **No remaining imports** to any of these `.tsx` files. Clean removal.

### Surviving `frontend/src/components/ui/` files (NOT deleted):
- `badge.jsx`, `button.jsx`, `dialog.jsx`, `input.jsx`, `select.tsx` -- these remain and are actively imported by WTF components.

### `frontend/src/ui/` directory:
- `frontend/src/ui/badge.jsx` and `frontend/src/ui/button.jsx` -- these were listed as deleted in git status. The entire `frontend/src/ui/` directory no longer exists. However, imports reference `../ui/badge.jsx` and `../ui/button.jsx` from within `frontend/src/components/wtf/` -- these resolve to `frontend/src/components/ui/badge.jsx` (which still exists). **No breakage.**

### console.log cleanup (Story 8.4):
- Frontend `src/` has only 1 file with `console.log`: `frontend/src/index.js` (standard React bootstrap). Cleanup was thorough.

## Cross-Sprint Integration

### ORM Standardization (Sprint 6 Story 5.1) vs LMS Controllers
- All LMS controllers reference correct model paths:
  - `require('../../../models/user')` -- correct
  - `require('../../../models/course')` -- correct
  - `require('../../../models/Submission')` -- correct (capitalized, matches file)
  - `require('../../../models/coin')` -- correct
  - `require('../../../models/notification')` -- correct
- No stale model references found.

### RBAC Middleware (Sprint 6 Story 2.2) on LMS and Shop Routes
- **LMS grading routes** (`backend/routes/v2/lms/coach/grading.js`): Correctly use `authenticate` + `authorize("LMS Management", "Read"/"Update")` on all endpoints. Properly configured.
- **Shop product routes** (`backend/routes/v2/shop.js`): Use `authenticate` + `authorize('Shop Management', 'Manage')` and `authorize('Purchase Management', 'Read')`. Properly configured.
- **Order routes** (`backend/routes/v2/orders.js`): Use ONLY `authenticate` -- **NO `authorize` middleware**. The `GET /all` endpoint (admin-only per comments) has no RBAC check, meaning any authenticated user can retrieve all orders.

### Auth Refactoring (Sprint 6 Story 6.4)
- `frontend/src/contexts/AuthContext.js`: Imports `api` from `../api` (centralized after Story 8.7). Initializes from localStorage, sets Bearer token on axios instance. Looks correct.
- `frontend/src/contexts/RBACContext.js`: Imports `api` from `../api`. Consistent with auth context.
- `backend/middleware/auth.js`: `authenticate` verifies JWT, looks up User by decoded ID, checks active status. `authorize` defers to `checkPermission` module. Standard and correct.
- No breakage detected in login flows.

## Findings

### Critical
1. **CRIT-01: LMS Grading Coin Award is Broken** -- `coachGradingController.submitGrade()` and `bulkGrade()` use `source: "submission_grade"` which is not in the Coin model's `source` enum. Mongoose validation will throw, causing grade submissions to return 500 errors. Students cannot earn coins through LMS grading.
   - Files: `backend/controllers/lms/coach/coachGradingController.js:178-190` (submitGrade), lines 305-317 (bulkGrade)
   - Impact: Primary coin-earning mechanism for students is non-functional

2. **CRIT-02: LMS Grading Creates Orphan Coin Documents** -- Even if the enum issue were fixed, `new Coin({...}).save()` creates a separate Coin document instead of appending to the user's existing Coin record via `Coin.findOrCreateForUser()` + `addCoins()`. The balance/spend system reads only the original document, so these coins would be invisible.
   - Files: `backend/controllers/lms/coach/coachGradingController.js:178-190, 305-317`

3. **CRIT-03: LMS Grading Writes to Non-Existent User.coins Field** -- `User.findByIdAndUpdate(studentId, { $inc: { coins: coinsAwarded } })` increments a field that doesn't exist in the User schema. The actual balance lives in `Coin.balance`. This creates an orphan field in MongoDB.
   - Files: `backend/controllers/lms/coach/coachGradingController.js:193-195, 319-321`

### Major
4. **MAJ-01: Order Routes Missing RBAC Authorization** -- All order endpoints use only `authenticate` without `authorize()`. The `GET /api/v2/shop/orders/all` endpoint (admin-only per JSDoc) is accessible to any authenticated user (students, coaches).
   - File: `backend/routes/v2/orders.js:55-95`

### Minor
5. **MIN-01: bulkGrade gradedCount Never Increments** -- `const gradedCount = 0` (line 275) is declared with `const`, so `gradedCount++` (line 343) will throw a runtime error. Should be `let`.
   - File: `backend/controllers/lms/coach/coachGradingController.js:275`

6. **MIN-02: act() Warnings in CreatePurchaseRequestModal Tests** -- State updates in `fetchProducts` not wrapped in `act()`. Non-blocking but indicates test hygiene issue.

## Recommended Fix Stories

| ID | Priority | Title | Effort |
|----|----------|-------|--------|
| FIX-01 | P0-Critical | Rewrite coachGradingController coin logic to use Coin.findOrCreateForUser + addCoins pattern | 2 SP |
| FIX-02 | P1-Major | Add authorize middleware to all order routes (Shop Management for admin, own-data for students) | 1 SP |
| FIX-03 | P2-Minor | Fix const->let for gradedCount in bulkGrade | 0.5 SP |
| FIX-04 | P2-Minor | Wrap CreatePurchaseRequestModal test state updates in act() | 0.5 SP |
