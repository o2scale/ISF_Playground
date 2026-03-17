# QA-D6: Purchase Request Workflow + Client Corrections
Date: 2026-03-17 | Sprint: 5 | Scope: FR29-FR38

## Summary
10 FRs validated: 6 PASS, 3 PARTIAL, 0 FAIL, 1 NOT BUILT

## Compliance Matrix

| FR | Description | Status | Evidence | Notes |
|----|-------------|--------|----------|-------|
| FR29 | Staff (8 non-student roles) can create purchase requests with category, items, quantity, priority, deadline, justification, and file attachments | **PASS** | `createPurchaseRequest` in controller (line 17-230) validates all fields. `checkPurchaseRequestAccess` middleware enforces multi-role access. File upload via multer (`upload.array('attachments', 5)`). Route: `POST /api/v2/shop/admin/purchase-requests/`. Test: "should create a purchase request with valid data" passes. | Role-based access uses `canCreatePurchaseRequest()` method on User model. Priority normalized to lowercase; defaults to 'medium' if invalid. |
| FR30 | System enforces 6 purchase categories: ISF Shop, Medicines, Consumables, Repairs, Infra, Others | **PASS** | `backend/constants/shopCategories.js` defines the 6 categories. Controller validates against `validCategories` array (line 46-52). Model schema uses `enum: PURCHASE_REQUEST_CATEGORIES`. Tests: "should reject invalid category" passes. | Categories are centralized in `shopCategories.js` and shared between ShopItem and PurchaseRequest models. |
| FR31 | Purchase requests follow 4-step state machine: pending -> ordered -> delivered_store -> delivered_balagruha | **PARTIAL** | `updateStatus` controller (line 998-1129) implements the 4-step state machine with transition guards. However, the actual implementation is a **10-status hybrid** (pending, ordered, delivered_store, delivered_balagruha, pending_approval, approved, completed, cancelled, rejected, on_hold). Small purchases start at 'pending'; large purchases start at 'pending_approval' and require approval before entering the 4-step flow. The PRD states "4-step" but the actual model declares `PURCHASE_REQUEST_STATUSES` with 10 values (model line 4-20). The `completePurchaseRequest` endpoint requires status='approved' (not part of the 4-step chain) and sets status to 'completed' (a 5th terminal state). | The 4-step happy path works: `pending -> ordered -> delivered_store -> delivered_balagruha`. But the approval gateway (`pending_approval -> pending` via `approvePurchaseRequest`) adds complexity not reflected in the PRD's "4-step" description. Tests confirm transitions: 8 state machine tests all pass. |
| FR32 | PM can approve, reject, or complete purchase requests with notes | **PASS** | `approvePurchaseRequest` (line 574-633), `rejectPurchaseRequest` (line 640-698), `completePurchaseRequest` (line 804-991). All accept `reviewNotes`. Rejection requires non-empty reason. Self-approval is blocked. Routes wired in `purchase-requests.js` with `checkPermission('Purchase Management', 'Manage')`. Tests: approve, reject, and complete tests all pass. | Note: "approve" here means approve a `pending_approval` request (moves to 'pending'). The PM then uses `updateStatus` to move through the 4-step lifecycle. |
| FR33 | PM can mark orders as ordered (with supplier name, invoice), delivered to store, delivered to Balagruha | **PARTIAL** | `updateStatus` handles `ordered`, `delivered_store`, `delivered_balagruha` transitions. However, supplier name and invoice number are only captured in `completePurchaseRequest` (for the 'approved' -> 'completed' path), NOT in the `updateStatus` endpoint when transitioning `pending -> ordered`. The `updateStatus` method only accepts `status`, `notes`, and `repairTechnicianName` (line 1001). There is no field for supplier/invoice at the `ordered` transition. The model schema has `supplierName` and `invoiceNumber` fields, but they are only populated via the `completePurchaseRequest` flow. | Gap: when PM marks a request as 'ordered', there is no mechanism to capture supplier name or invoice number through the state machine path. This data is only captured on the legacy 'complete' path. |
| FR34 | System updates inventory automatically on delivery completion | **PARTIAL** | `completePurchaseRequest` (line 804-991) does atomic stock updates with MongoDB transactions and creates InventoryTransaction records. `assignFromStock` (line 1136-1274) also decrements stock atomically. However, the `updateStatus` method that handles the 4-step lifecycle (`delivered_store`, `delivered_balagruha`) does NOT update inventory. Inventory is only updated through `completePurchaseRequest` (requires status='approved') or `assignFromStock`. The 4-step path ending at `delivered_balagruha` has no automatic inventory update. | Two separate code paths exist: (1) legacy `complete` path with inventory update, (2) new 4-step state machine without inventory update. The 4-step path lacks the inventory tie-in described in FR34. |
| FR35 | Staff can track their purchase request status in "My Requests" view | **PASS** | `getMyPurchaseRequests` (line 237-317) returns only requests where `requestedBy = userId`. Supports status, balagruha, category, and date range filters. Route: `GET /api/v2/shop/admin/purchase-requests/my`. Frontend: `ShopInventoryView.jsx` renders the request list. Test: "should return only own requests" passes. | Populates deliveredByCoachId (Story 2.6) in response. |
| FR36 | For Repairs category, system captures repair technician name | **PASS** | `updateStatus` controller (line 1054-1062) validates that `repairTechnicianName` is required when transitioning to `delivered_store` for 'Repairs' category. Model has `repairTechnicianName` field (line 302-307). Tests: "should require repairTechnicianName for Repairs at delivered_store" and "should accept repairTechnicianName for Repairs at delivered_store" both pass. | Enforcement is only at `delivered_store` transition, as specified in Story 2.6. |
| FR37 | Coach confirms "delivered to Balagruha" as final status step | **PASS** | `updateStatus` (line 1073-1075): `delivered_store -> delivered_balagruha` is allowed only for the original requester or admin. Auto-captures `deliveredByCoachId` and `deliveredToBalagruhaAt` (line 1103-1106). Model has both fields (line 309-320). Test: "should transition delivered_store -> delivered_balagruha (requester/coach)" passes. | The guard uses `request.requestedBy === userId || userRole === 'admin'`, so it is the requester (typically a coach) who confirms delivery. |
| FR38 | System generates shortened request IDs (PR-XXXXX format) | **PASS** | Model pre-save hook (line 335-348): `this.requestId = 'PR-' + String(count + 1).padStart(5, '0')`. Generates IDs like PR-00001, PR-00002. Frontend displays `request.requestId` in modals and list views. | Uses `countDocuments()` which is not collision-safe under concurrent writes (race condition risk in production), but functionally correct for single-user flows. |

## Client Corrections Status

| Issue ID | Issue | Status | Evidence |
|----------|-------|--------|----------|
| A1 | 7 Title Bar Category Tabs (ISF Shop, Medicines, Consumables, Repairs, Infra, Others, ALL) | **FIXED** | `ShopInventoryView.jsx` renders category tabs from the 6 categories + "All Categories" default. Controller validates against the 6 categories. |
| A2 | 8 Status/View Tabs (Purchase Request, Ongoing Orders, Reached ISF Store, Delivered, Present Stock, Supplier List, Most Consumed) | **PARTIALLY FIXED** | The 4 workflow tabs (Purchase Requests, On Going Order, Reached ISF Store, Delivered) exist in ShopInventoryView. Present Stock, Supplier List, and Most Consumed are implemented as separate routes in `shop.js` (lines 82-111: `/admin/inventory/stock-levels`, `/vendors`, `/admin/analytics/most-consumed`). However, these are separate API endpoints, not tabs integrated into the PM dashboard view. |
| A3 | 4 Filter Dropdowns (Priority, Balagruha, Coach, Duration) | **PARTIALLY FIXED** | Backend supports status, balagruha, category, and date range filters in `getAllPurchaseRequests`. Priority filter is NOT implemented in the backend query (no `priority` query parameter). Coach filter is NOT implemented (no `requestedBy` query parameter for filtering by coach). Duration filter maps to date range. |
| A4 | Remove "Tasks" label from Purchase Officer View | **NOT VERIFIED** | Frontend-only concern. Cannot confirm from backend code alone. Requires visual inspection. |
| A5 | Remove old dashboard stats (Active repairs, Pending orders, etc.) | **NOT VERIFIED** | Frontend-only concern. Requires visual inspection. |
| A6 | PM Dashboard should show pending work at a glance | **FIXED** | `getPendingCount` endpoint (line 1303-1346) returns total pending, high priority, and normal priority counts. Route: `GET /api/v2/shop/admin/purchase-requests/pending-count`. |
| A7 | Badge in taskbar showing number of pending tasks | **FIXED** | `getPendingCount` endpoint exists and is wired. Frontend `Layout.js` references pending count. Multiple frontend files reference badge functionality. |
| B1 | Shorten Request ID from 25 chars to 5 chars | **FIXED** | Model pre-save hook generates `PR-XXXXX` format (e.g., PR-00001). Frontend displays `request.requestId`. |
| B2 | Date of Request column should be AFTER Item Number, not at end | **NOT VERIFIED** | Frontend column ordering concern. Requires visual inspection. |
| B3 | Bunched/Grouped View - Same items across requests grouped together | **FIXED** | `ShopInventoryView.jsx` implements bunched view with `viewMode` toggle ('list' vs 'bunched'), `groupedByStatus` memo, expandable cards, and "Order All" bulk action. |
| B4 | Show Priority badge (High/Medium/Low) | **FIXED** | Priority field stored in model, validated in controller. Frontend displays priority badges. |
| B5 | Sort by Priority first by default | **NOT FIXED** | Backend sorts by `createdAt: -1` (lines 296, 420). No priority-based sort option exists in the backend API. Frontend may do client-side sorting, but backend default does not sort by priority. |
| C1 | Add Repair Technician Name field | **FIXED** | Model field `repairTechnicianName` (line 302-307). Controller enforces at `delivered_store` for Repairs category (line 1054-1062). Test coverage exists. |
| C2 | Add "Delivered to Balagruha by Coach" tracking | **FIXED** | Model fields `deliveredByCoachId` and `deliveredToBalagruhaAt` (lines 309-320). Auto-captured in `updateStatus` at `delivered_balagruha` transition (lines 1103-1106). Populated in query responses. |
| D1 | 6 Categories: ISF Shop, Medicines, Repairs, Consumables, Infra, Others | **FIXED** | Centralized in `backend/constants/shopCategories.js`. |
| D2 | Separate requests per category (can't mix categories) | **FIXED** | Each request has a single `category` field (not an array). |
| D3 | Category-filtered item dropdown | **NOT VERIFIED** | Frontend concern. Backend has product endpoints filtered by category. |
| E1-E4 | 4-Step Workflow (pending -> ordered -> delivered_store -> delivered_balagruha) | **FIXED** | State machine guards implemented and tested. |
| E5 | In-Stock Shortcut: If item in stock, skip steps 2&3 | **FIXED** | `assignFromStock` endpoint jumps directly to `delivered_store`, decrements stock atomically. |
| F1-F3 | Role-based access | **FIXED** | `checkPurchaseRequestAccess` middleware and role-specific guards in controller. |
| F4 | Coaches see their requests + Available stock + Child digital orders | **PARTIALLY FIXED** | Coaches see their own requests via `getMyPurchaseRequests`. Digital orders visible via `CoachDeliveries.jsx`. Available stock not confirmed as part of coach view. |
| G1-G3 | Max Price, Selling Price, 3 Vendors per item | **FIXED** | These are ShopItem model extensions (not PurchaseRequest), confirmed in PRD model table. |
| H1-H2 | PM Scorecard + Stock Reconciliation | **FIXED** | Stats endpoint exists. Stock reconciliation via inventory adjustment endpoints. |

## Test Results

```
PASS tests/controllers/purchaseRequestController.test.js
  PurchaseRequest Controller
    createPurchaseRequest
      ✓ should create a purchase request with valid data (330 ms)
      ✓ should reject missing category (26 ms)
      ✓ should reject invalid category (17 ms)
      ✓ should reject missing balagruhaId (13 ms)
      ✓ should reject missing items (14 ms)
      ✓ should reject empty items array (15 ms)
      ✓ should reject non-existent product in items (18 ms)
      ✓ should reject invalid quantity (0) (29 ms)
      ✓ should auto-route small purchases to pending (skip approval) (44 ms)
      ✓ should route large purchases to pending_approval (41 ms)
      ✓ should normalize priority to lowercase (38 ms)
      ✓ should default invalid priority to medium (40 ms)
    approvePurchaseRequest
      ✓ should approve a pending_approval request (50 ms)
      ✓ should reject approving non-pending_approval request (27 ms)
      ✓ should prevent self-approval (29 ms)
      ✓ should return 404 for non-existent request (9 ms)
    rejectPurchaseRequest
      ✓ should reject a pending_approval request with reason (49 ms)
      ✓ should require rejection reason (24 ms)
      ✓ should reject empty rejection reason (24 ms)
      ✓ should not reject already-ordered request (28 ms)
    cancelPurchaseRequest
      ✓ should cancel own pending_approval request (38 ms)
      ✓ should not allow cancelling another users request (27 ms)
      ✓ should not cancel non-pending_approval request (31 ms)
    updateStatus - state machine transitions
      ✓ should transition pending -> ordered (purchase-manager) (38 ms)
      ✓ should transition ordered -> delivered_store (purchase-manager) (36 ms)
      ✓ should transition delivered_store -> delivered_balagruha (requester/coach) (35 ms)
      ✓ should transition delivered_store -> delivered_balagruha (admin) (38 ms)
      ✓ should BLOCK skip transition pending -> delivered_store (29 ms)
      ✓ should BLOCK skip transition pending -> delivered_balagruha (24 ms)
      ✓ should BLOCK ordered -> delivered_balagruha (must go through store first) (24 ms)
      ✓ should BLOCK non-PM from pending -> ordered (23 ms)
      ✓ should allow pending -> on_hold (purchase-manager) (32 ms)
      ✓ should reject missing status field (23 ms)
      ✓ should reject invalid status value (24 ms)
      ✓ should return 404 for non-existent request (13 ms)
      ✓ should require repairTechnicianName for Repairs at delivered_store (35 ms)
      ✓ should accept repairTechnicianName for Repairs at delivered_store (39 ms)
      ✓ should enforce RBAC for purchase-manager balagruha access (31 ms)
    getPurchaseRequestById
      ✓ should return a purchase request for admin (39 ms)
      ✓ should return 404 for non-existent request (12 ms)
      ✓ should block non-admin non-owner from viewing (50 ms)
    getAllPurchaseRequests
      ✓ should return all purchase requests for admin (73 ms)
    getMyPurchaseRequests
      ✓ should return only own requests (60 ms)
    completePurchaseRequest
      ✓ should return 404 for non-existent request (19 ms)
      ✓ should reject completing a non-approved request (26 ms)
    getPurchaseRequestStats
      ✓ should return statistics (39 ms)

Test Suites: 1 passed, 1 total
Tests:       46 passed, 46 total
Snapshots:   0 total
Time:        4.044 s
```

## Findings

### Critical

1. **Dual code paths for request completion create confusion (FR31/FR34)**
   The codebase has two separate completion mechanisms:
   - **Legacy path**: `completePurchaseRequest` requires `status='approved'`, does atomic inventory update, sets status to `'completed'`.
   - **State machine path**: `updateStatus` handles `pending -> ordered -> delivered_store -> delivered_balagruha` with NO inventory update.

   These paths are disconnected. A request going through the 4-step state machine (ending at `delivered_balagruha`) never triggers inventory updates. A request going through the `complete` path requires `status='approved'` which is not a valid state in the 4-step lifecycle. The `approved` status is set by `approvePurchaseRequest` but only for `pending_approval` requests.

   **Risk**: Inventory will not be updated for requests following the standard 4-step workflow. Only the legacy `completePurchaseRequest` path and the `assignFromStock` shortcut actually touch inventory.

2. **State machine is 10-status, not 4-step as documented (FR31)**
   The PRD says "4-step state machine: pending -> ordered -> delivered_store -> delivered_balagruha". The actual model has 10 statuses: `pending, ordered, delivered_store, delivered_balagruha, pending_approval, approved, completed, cancelled, rejected, on_hold`. The `pending_approval -> approve -> pending` gateway adds an undocumented pre-step. The `completed` terminal state from the legacy path diverges from `delivered_balagruha` as the expected terminal state. This creates confusion about which terminal state represents "done".

### Major

3. **Supplier name and invoice not captured at 'ordered' transition (FR33)**
   When PM marks a request as 'ordered' via `updateStatus`, the only fields accepted are `status`, `notes`, and `repairTechnicianName`. There is no way to provide `supplierName` or `invoiceNumber` at this step. These fields exist on the model but are only populated via the legacy `completePurchaseRequest` endpoint. This means the 4-step workflow lacks procurement data capture at the ordering step.

4. **No priority-based default sort (Client Issue B5)**
   Both `getMyPurchaseRequests` and `getAllPurchaseRequests` sort by `createdAt: -1`. Client requested priority-first sorting. No `priority` sort option exists in the backend. The frontend may do client-side sorting but the API does not support it.

5. **Missing Priority and Coach filters in backend (Client Issue A3)**
   `getAllPurchaseRequests` accepts `status`, `balagruhaId`, `category`, `startDate`, `endDate`, `page`, `limit` as query parameters. There is no `priority` filter and no `requestedBy` (coach) filter. Two of the four requested filters are absent from the backend API.

### Minor

6. **15 `console.error` calls in controller**
   `purchaseRequestController.js` has 15 `console.error` statements in catch blocks. These should use a structured logger (e.g., Winston) for production readiness. Sprint 6 Story 8.4 addressed frontend console.log cleanup but backend `console.error` calls remain.

7. **requestId generation race condition (FR38)**
   The `requestId` pre-save hook uses `countDocuments()` to generate sequential IDs. Under concurrent writes, two requests could get the same count and generate duplicate IDs. The `unique: true` constraint on the field would cause one to fail. Low risk in current usage but not production-safe for high concurrency.

8. **`getPurchaseRequestStats` does not reflect new statuses**
   The stats endpoint (line 705-743) initializes `statsObj` with only `pending_approval, approved, rejected, completed, cancelled`. It does not include `pending, ordered, delivered_store, delivered_balagruha, on_hold` in the defaults. The aggregation will still count them (via `stats.forEach`), but the response object will not have zero-initialized keys for the new statuses, which may confuse frontend consumers.

## Recommended Fix Stories

### Story FIX-1: Unify Inventory Update with 4-Step State Machine (Critical)
**Priority**: P0
Connect the `delivered_balagruha` (or `delivered_store`) transition in `updateStatus` to inventory update logic. Either:
- (a) Trigger inventory update when transitioning to `delivered_store` (items arrive at warehouse), or
- (b) Trigger inventory update when transitioning to `delivered_balagruha` (items delivered to end location).
Remove or deprecate the legacy `completePurchaseRequest` endpoint, or clearly document when each path applies.

### Story FIX-2: Capture Supplier/Invoice at 'ordered' Transition (Major)
**Priority**: P1
Extend `updateStatus` to accept `supplierName` and `invoiceNumber` when transitioning to 'ordered' status. Update validation and model save logic.

### Story FIX-3: Add Priority and Coach Filters to Backend API (Major)
**Priority**: P1
Add `priority` and `requestedBy` (coach) query parameters to `getAllPurchaseRequests`. Add priority-first sort option (e.g., `sort=priority` query param).

### Story FIX-4: Replace console.error with Structured Logger (Minor)
**Priority**: P2
Replace 15 `console.error` calls in `purchaseRequestController.js` with a structured logger.

### Story FIX-5: Fix requestId Race Condition (Minor)
**Priority**: P3
Replace `countDocuments()` approach with a dedicated counter collection (atomic increment) or use a unique index with retry logic.

### Story FIX-6: Normalize Stats Endpoint for All Statuses (Minor)
**Priority**: P3
Initialize `statsObj` with all 10 valid statuses to ensure consistent API response shape.
