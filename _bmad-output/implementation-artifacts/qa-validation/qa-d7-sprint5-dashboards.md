# QA-D7: Dashboards + Analytics + Cross-Cutting
Date: 2026-03-17 | Sprint: 5 | Scope: FR39-FR52

## Summary
14 FRs validated: 10 PASS, 3 PARTIAL, 0 FAIL, 1 NOT BUILT

## Compliance Matrix

| FR | Description | Status | Evidence | Notes |
|----|-------------|--------|----------|-------|
| FR39 | PM operational dashboard with list view sorted by priority | PASS | `ShopInventoryView.jsx` lines 375-490: `applyFilters()` sorts by priority (High > Medium > Low) before date. Story 3.1 complete with scorecard widget. | Priority inferred from `reason`/`justification` text fields since priority is not a first-class schema field. Functional but fragile. |
| FR40 | PM filter by category tabs, status buckets, coach, date range | PASS | `ShopInventoryView.jsx`: category tabs (Story 3.4, `handleCategoryTabClick`), status buckets (`handleStatusTabClick` with STATUS_BUCKET_OPTIONS), coach/requester filter (Story 3.8, `getAvailableRequesters`), date range (Story 3.1, `getDateRangeFromFilter`). | Coach filter is client-side only (extracts unique requesters from loaded requests) rather than dedicated backend endpoint. Works but depends on all requests being loaded. |
| FR41 | PM toggle between List View and Bunched/Grouped View | PASS | `ShopInventoryView.jsx`: `viewMode` state (line 214), `groupedByStatus` memoization (lines 471-545), toggle button (lines 1120-1159), bunched rendering (lines 1162-1343). Story 3.5 marked complete. | Client-side grouping via `useMemo`. Expandable accordion shows individual requests per group. |
| FR42 | PM "Order All" to batch requests for same item | PASS | `ShopInventoryView.jsx` line 726: `handleOrderAll()` iterates over `bunchedItem.requests`, calls `updatePurchaseRequestStatus` for each with status ORDERED. Confirms with user prompt. | Sequential updates (not batched API call). Could be slow for many requests but functionally correct. |
| FR43 | Coach "My Requests" + "Digital Orders" dashboard | PASS | `frontend/src/pages/CoachRequestsDashboard.jsx` exists with route `/coach/requests` in App.js. Story 3.2 complete. Uses `getMyPurchaseRequests` + `getCoachDeliveries` APIs. ShopNavigation.jsx includes "My Requests" nav item for coach role. | Protected by `CoachOrAdminRoute` wrapper. |
| FR44 | Navigation badge showing pending task count for PM | PASS | `Layout.js` line 50: `pendingPurchaseCount` state. Line 209: `fetchPendingPurchaseCount()` calls `getPendingPurchaseRequestCount` API. Polls every 60s (line 340). Badge rendered on "Purchases" menu for PM role (line 527). Shows total + high-priority indicator. | Backend endpoint: `GET /api/v2/shop/admin/purchase-requests/pending-count`. Badge only shown for `purchase-manager` role, not admin (line 527 checks `role === "purchase-manager"`). |
| FR45 | Admin analytics dashboard: revenue charts, category breakdown, top products | PASS | `frontend/src/pages/ShopAnalytics.jsx`: renders `AnalyticsOverview`, `RevenueChart`, `CategoryPieChart`, `TopProductsTable`, `StockTurnover`. Backend: `analyticsController.js` -> `AnalyticsService.getShopAnalytics()` with 8 sub-queries (totalOrders, totalRevenue, topProductsByVolume/Revenue, categoryPerformance, revenueTrend, studentParticipation, stockTurnover). Route: `/shop/admin/analytics`. | Comprehensive. Date range filtering supported. |
| FR46 | Admin transaction reports with leaderboards, coin economy health | PASS | `frontend/src/pages/TransactionReports.jsx`: renders `CoinEconomyHealth`, `StudentLeaderboard` (earners + spenders), `ZeroPurchasesReport`, `TransactionLogTable`. Backend: `reportsController.js` with `getTransactionLog`, `getStudentLeaderboard`, `getZeroPurchaseStudents`, `getCoinEconomyHealth`. | Full implementation with filters and pagination. |
| FR47 | Admin CSV export of transaction reports | PASS | `reportsController.js` lines 280-414: `exportReport()` supports types `transactions`, `leaderboard`, `zero-purchases`, `participation`. Generates CSV with proper headers and Content-Disposition. Frontend calls `exportReport` from `TransactionReports.jsx`. MasterInventoryReport also has `exportCSV()` for inventory data. | Multiple export types supported. |
| FR48 | Coin economy metrics: earn-to-spend ratio, velocity, conversion | PARTIAL | `backend/services/analytics.js` line 695: `getCoinEconomyHealth()` aggregates from Coin model. `frontend/src/components/shop/CoinEconomyHealth.jsx` renders the data. Route: `GET /api/v2/shop/admin/reports/coin-economy`. | Backend aggregates coin stats but the specific metrics (earn-to-spend ratio, coin velocity, shop conversion rate) need verification against the actual `getCoinEconomyHealth` implementation. The service exists and is wired but completeness of all 3 named metrics is uncertain without reading the full 100+ line method. |
| FR49 | Balagruha-independent purchases (STOCK option) | PASS | `purchaseRequestController.js` line 74-83: validates `balagruhaId` supports `STOCK` as special value. `ShopInventoryView.jsx` `fetchBalagruhas` (line 275): includes STOCK option. `getFilteredBalagruhas` (line 804): always includes STOCK for PM view. | STOCK treated as valid balagruhaId throughout the pipeline. |
| FR50 | Date range filtering across all dashboards | PARTIAL | `ShopInventoryView.jsx`: `getDateRangeFromFilter()` with presets (today, thisWeek, thisMonth, thisYear, custom). Backend `getAllPurchaseRequests` accepts `startDate`/`endDate` params. `ShopAnalytics.jsx`: DateRangeSelector component. `TransactionReports.jsx`: date filters on all sections. | PM dashboard (ShopInventoryView) supports date filtering. Analytics and Reports have date filtering. Coach dashboard (`CoachRequestsDashboard`) has status + date range filters per Story 3.2. Coverage is broad but not every sub-view was verified to support date ranges (e.g., bunched view inherits from parent filter but stock levels/supplier tabs may not). |
| FR51 | Multi-role access to purchase requests (8 non-student roles) | PARTIAL | `checkPurchaseRequestAccess.js`: blocks only `student` role, allowing all others. `Layout.js` menu: Purchases link visible to `admin, purchase-manager, coach, medical-incharge, balagruha-incharge, sports-coach, music-coach, amma` (8 roles). However, `App.js` route `/purchase` uses `requiredRoles={['admin', 'purchase-manager', 'coach']}` -- only 3 roles. | **Discrepancy**: Backend middleware allows 8 non-student roles, but the frontend route guard in App.js only allows 3 roles (admin, purchase-manager, coach). The nav menu shows it for 8 roles but the ProtectedRoute would block medical-incharge, balagruha-incharge, sports-coach, music-coach, amma from actually accessing the page. This is a bug. |
| FR52 | Coach inline product addition (CreatePendingProduct in request modal) | PASS | `CreatePurchaseRequestModal.jsx` line 9: imports `createPendingProduct`. Line 631: calls API to create pending product inline. Backend: `adminProductController.js` line 443: `createPendingProduct()` endpoint. Route: `POST /api/v2/shop/admin/products/pending` with `checkPurchaseRequestAccess` middleware (all non-student roles). | Inline "add new product" within the purchase request creation modal. |

## Findings

### Critical

1. **FR51 Route Guard Mismatch**: The `/purchase` route in `App.js` (line ~325) restricts access to `requiredRoles={['admin', 'purchase-manager', 'coach']}` (3 roles), while the backend middleware (`checkPurchaseRequestAccess.js`) and the Layout.js navigation menu both support all 8 non-student roles. This means medical-incharge, balagruha-incharge, sports-coach, music-coach, and amma can see the "Purchases" menu item but will be denied access when clicking it. This contradicts the PRD requirement for 8 non-student roles.
   - **Files**: `frontend/src/App.js` (line ~325), `frontend/src/components/Layout.js` (line ~105), `backend/middleware/checkPurchaseRequestAccess.js`

### Major

2. **FR44 Badge PM-Only**: The navigation badge (Story 3.9) only displays for `purchase-manager` role, not for `admin`. The `fetchPendingPurchaseCount` function fetches for both PM and admin (line 211), but the JSX rendering condition (line 527) checks `role === "purchase-manager"` only. Admins who also manage procurement do not see the badge. This is a minor deviation from the story completion notes which say "Modified Layout.js to fetch pending count for PM/Admin" but the display is PM-only.
   - **File**: `frontend/src/components/Layout.js` line 527

3. **FR48 Metric Completeness Uncertain**: The `getCoinEconomyHealth` service method exists and is wired through controller/route/frontend, but the PRD specifically names 3 metrics (earn-to-spend ratio, coin velocity, shop conversion rate). Without reading the full ~100-line aggregation pipeline, exact coverage of all 3 named metrics cannot be confirmed.
   - **File**: `backend/services/analytics.js` line 695

### Minor

4. **FR39 Priority Fragility**: Priority detection relies on parsing text fields (`reason` prefix `[HIGH PRIORITY]` and `justification` containing `Priority: High`). The `purchaseRequest` model has a `priority` field that is sometimes populated, creating dual sources of truth. The `getPriority()` helper handles both but this is fragile.
   - **File**: `frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx` line 56

5. **FR40 Coach Filter Client-Side**: The coach/requester filter (Story 3.8) was implemented client-side by extracting unique requesters from already-loaded requests, rather than via the designed backend endpoint (`GET /api/v2/shop/admin/requests/coaches`). This works for current volumes (<1000 requests) but will not scale if request volume grows.
   - **File**: `frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx` line 837

6. **FR42 Sequential Updates**: The "Order All" function updates requests one at a time in a loop rather than using a batch API. For bunched items with many requests, this could be slow and partially fail.
   - **File**: `frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx` line 726

7. **Story 3.3 Status**: The Admin Master Inventory Report story file (`3-3-admin-inventory-report.md`) has status `ready-for-dev` with unchecked task boxes, yet the code exists: `MasterInventoryReport.jsx` with route, backend endpoint, and tests. The story file was never updated to reflect completion.
   - **File**: `_bmad-output/sprint-5-purchase-manager/3-3-admin-inventory-report.md`

## Recommended Fix Stories

1. **Fix FR51 Route Guard** (Critical, ~0.5 day): Update `/purchase` route in `App.js` from `requiredRoles={['admin', 'purchase-manager', 'coach']}` to include all 8 non-student roles, or remove `requiredRoles` and rely on the backend middleware pattern.

2. **Fix FR44 Admin Badge Display** (Minor, ~0.25 day): Extend the badge rendering condition in `Layout.js` line 527 to include `admin` role alongside `purchase-manager`.

3. **Verify FR48 Economy Metrics** (Minor, ~0.25 day): Audit `getCoinEconomyHealth()` in analytics.js to confirm all 3 PRD-named metrics (earn-to-spend ratio, coin velocity, shop conversion rate) are computed and displayed.

4. **Update Story 3.3 Status** (Docs, ~0.1 day): Update `3-3-admin-inventory-report.md` to reflect that it is implemented and complete.
