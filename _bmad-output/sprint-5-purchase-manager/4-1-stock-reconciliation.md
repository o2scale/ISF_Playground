# Story 4.1: Stock Reconciliation Tool

**Epic:** Epic 4: Inventory Control & Audit  \
**Story:** 4.1  \
**Role:** Purchase Manager  \
**Goal:** Allow Purchase Managers to reconcile physical stock with system stock using mandatory reason codes and a complete audit trail.

## User Story

As a Purchase Manager,  \
I want to manually adjust the system stock count to match my physical count,  \
so that inventory data remains accurate for planning and procurement.

## Acceptance Criteria

**Given** I am a Purchase Manager  \
**When** I open the Stock Reconciliation (Audit Tool)  \
**Then** I can find a product and view its current stock.

**Given** I am adjusting stock for an item  \
**When** I enter a new physical count (or an adjustment amount)  \
**Then** I must select a **Reason Code** (e.g., Audit Correction, Damage) before I can submit.

**Given** I submit a valid stock adjustment  \
**Then** the system updates `ShopItem.stock` and prevents negative stock.

**Given** a stock adjustment is made  \
**Then** an `InventoryTransaction` is created that records:
- `transactionType` = `adjustment` (or `correction` when applicable)
- `previousStock`, `newStock`, and `quantity` (delta)
- `reason` (reason code) and optional `notes`
- `performedBy` (the user)

## Tasks/Subtasks

- [x] **Task 1: Backend — stock adjustment with audit trail (FR21/FR22)**
  - [x] Ensure an authenticated PM can adjust stock via a dedicated endpoint (reused):
    - [x] `PATCH /api/v2/shop/admin/inventory/:productId/adjust`
  - [x] Validate request:
    - [x] `adjustment` or `newStock` is provided and results in `newStock >= 0`
    - [x] `reason` is required and maps to the `InventoryTransaction.transactionType` enum
  - [x] Create `InventoryTransaction` entry linked to the product and `performedBy`

- [x] **Task 2: Backend — audit log retrieval (optional but recommended)**
  - [x] Provide/read an endpoint to view the audit trail per product:
    - [x] `GET /api/v2/shop/admin/inventory/:productId/audit`
  - [x] Support basic paging (existing)

- [x] **Task 3: Frontend — PM entry point + reconciliation UI**
  - [x] Provide a PM-accessible entry point to the Audit Tool (Purchase Management dropdown)
  - [x] Implement a reconciliation UI that supports:
    - [x] search/filter products
    - [x] opening an “Adjust Stock” modal
    - [x] mandatory reason code selection + optional notes
    - [x] viewing audit history for a product (timeline)

- [x] **Task 4: RBAC / Permissions (production behavior)**
  - [x] Ensure Purchase Manager role is authorized in non-dev environments:
    - [x] Grant `Shop Management: Manage` for `purchase-manager` in role setup

- [x] **Task 5: Tests**
  - [x] Backend:
    - [x] PM can adjust stock; negative stock is rejected
    - [x] `reason` required; `InventoryTransaction` is created with correct fields
    - [x] unauthorized roles receive 403 (when `NODE_ENV` is not dev/local)
  - [x] Frontend:
    - [x] PM can access the reconciliation UI
    - [x] “Adjust Stock” cannot submit without a reason code

## Dev Notes

### What already exists (likely reusable)

- `backend/models/inventoryTransaction.js`
- `backend/controllers/inventoryController.js#adjustStock`
- `backend/routes/v2/inventory.js` (inventory endpoints)
- `frontend/src/pages/InventoryManagement.jsx`
- `frontend/src/components/shop/StockAdjustmentModal.jsx`
- `frontend/src/components/shop/AuditTrailModal.jsx`

### Pitfalls

- In production, `authorize(...)` is enforced; ensure PM has the correct permission(s).
- Keep the audit trail accurate: always record `previousStock`, `newStock`, and delta.

## References

- PRD: `_bmad-output/sprint-5-purchase-manager/prd-purchase-manager-workflow.md` (FR21, FR22)
- Epic definitions: `_bmad-output/sprint-5-purchase-manager/epics.md#Story-41-Stock-Reconciliation-Tool`
- Backend: `backend/controllers/inventoryController.js`, `backend/models/inventoryTransaction.js`
- Frontend: `frontend/src/pages/InventoryManagement.jsx`, `frontend/src/components/shop/StockAdjustmentModal.jsx`

## Dev Agent Record

### Agent Model Used

OpenAI GPT-5.2

### Implementation Plan

- Extend existing inventory adjustment endpoint to support `newStock` (physical count) as well as `adjustment` delta
- Enforce reason selection in the UI and backend validation
- Add a PM-facing reconciliation view (search/filter + adjust + audit history)
- Ensure `purchase-manager` has `Shop Management: Manage` in role setup for production auth
- Add backend + frontend tests

### Completion Notes

- Added `newStock` support to `PATCH /api/v2/shop/admin/inventory/:productId/adjust` while preserving delta adjustments
- Added PM Stock Reconciliation UI under Purchase Management with audit trail viewing
- Updated stock adjustment modal to require explicit reason selection and support physical count entry
- Tests added; backend + frontend suites pass

## File List

- `backend/controllers/inventoryController.js`
- `backend/middleware/validation/inventoryValidation.js`
- `backend/scripts/setupDefaultRoles.js`
- `backend/tests/routes/stockReconciliationRoutes.test.js`
- `frontend/src/components/purchaseManagement/PurchaseManagement.jsx`
- `frontend/src/components/purchaseManagement/views/StockReconciliationView.jsx`
- `frontend/src/components/shop/StockAdjustmentModal.jsx`
- `frontend/src/components/shop/AuditTrailModal.jsx`
- `frontend/src/__tests__/components/purchaseManagement/PurchaseManagementStockReconciliation.test.js`
- `frontend/src/__tests__/components/shop/StockAdjustmentModal.test.js`

## Change Log

- 2025-12-24: Story file created
- 2025-12-24: Implemented stock reconciliation (backend + frontend + tests)

## Status

review
ready-for-dev
