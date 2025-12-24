# Story 2.3: Purchase Manager Fulfillment Actions

Status: ready-for-dev

## Story

As a Purchase Manager,
I want to process pending requests,
so that items are ordered and received into the store.

## Acceptance Criteria

1. **Given** I am viewing a purchase request with status `pending`
   **When** I click **Mark Ordered**
   **Then** the request status updates to `ordered`.
2. **Given** I am viewing a purchase request with status `ordered`
   **When** I click **Mark Received at Store**
   **Then** the request status updates to `delivered_store`.

## Tasks / Subtasks

- [ ] Add a frontend API helper to update purchase-request status via the state-machine endpoint (AC: 1, 2)
  - [ ] Add `updatePurchaseRequestStatus(requestId, { status, notes })` in `frontend/src/api.js` using `PATCH /api/v2/shop/admin/purchase-requests/:id/status`
  - [ ] Ensure errors are surfaced via existing UI toast patterns (`showToast` in PurchaseManagement views)

- [ ] Add Purchase Manager fulfillment actions in the Shop Inventory requests UI (AC: 1, 2)
  - [ ] In `frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx`, add action buttons for PM:
    - [ ] If `request.status === 'pending'` show **Mark Ordered**
    - [ ] If `request.status === 'ordered'` show **Mark Received at Store**
  - [ ] On click, call `updatePurchaseRequestStatus(...)`, then refresh the list (`fetchPurchaseRequests`) and show a success toast.
  - [ ] Disable buttons while the request update is in-flight to prevent double submits.

- [ ] Align status labels/badges with the strict lifecycle statuses used by Story 2.1 (AC: 1, 2)
  - [ ] Extend `getStatusBadge()` in `ShopInventoryView.jsx` (and `ViewRequestModal.jsx` if status is displayed there) to recognize:
    - `pending`, `ordered`, `delivered_store`, `delivered_balagruha`, `rejected`, `on_hold`
  - [ ] Keep existing legacy/approval statuses intact (`pending_approval`, `approved`, `completed`, etc.) to avoid regressions in the older flow.

- [ ] Backend verification / guardrails (AC: 1, 2)
  - [ ] Confirm `backend/routes/v2/purchase-requests.js` exposes `PATCH /:id/status` and that it is reachable under `/api/v2/shop/admin/purchase-requests/:id/status`.
  - [ ] Confirm `backend/controllers/purchaseRequestController.js#updateStatus` allows only:
    - `pending -> ordered` (PM only)
    - `ordered -> delivered_store` (PM only)
  - [ ] Confirm response shape matches frontend expectations: `{ success, message, data: { request } }`.

- [ ] Tests (recommended)
  - [ ] Add/update frontend tests to verify:
    - correct button visibility for `pending` vs `ordered`
    - clicking the button calls the status endpoint with the correct status
    - error states show a toast and do not update UI optimistically on failure

## Dev Notes

### What already exists

- **State machine endpoint (Story 2.1):**
  - `PATCH /api/v2/shop/admin/purchase-requests/:id/status` with body `{ status, notes }`
  - Allowed statuses include: `pending`, `ordered`, `delivered_store`, `delivered_balagruha`, `rejected`, `on_hold`.
  - Transition guards are enforced server-side in `purchaseRequestController.updateStatus`.

### Key guardrails / pitfalls

1. **Two workflow families exist in the codebase**
   - Strict lifecycle: `pending -> ordered -> delivered_store -> delivered_balagruha` (this story)
   - Approval workflow: `pending_approval -> approved -> completed` (existing PurchaseManagement UI)
   Keep both working: do not “simplify” statuses without checking existing screens.

2. **Where to implement the UI**
   - Current PM-facing list is `frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx`.
   - That view currently has actions for `pending_approval` + `approved`.
   Add the new actions for `pending`/`ordered` without removing the old ones.

3. **Permissions to list requests**
   - `ShopInventoryView` currently calls `getAllPurchaseRequests()` (GET `/api/v2/shop/admin/purchase-requests`).
   - Backend route is protected by `checkPermission('Purchase Management','Manage')`.
   Verify in your environment that the `purchase-manager` role can access this endpoint; if not, add a PM-safe listing route (do **not** widen access for non-PM roles).

### Project Structure Notes

- Architecture docs mention a `purchase-manager/` component folder, but current implementation uses `purchaseManagement/`.
- Follow existing module conventions:
  - views: `frontend/src/components/purchaseManagement/views/*`
  - modal actions live in `frontend/src/components/purchaseManagement/modals/*`
  - shared API functions live in `frontend/src/api.js`

### References

- Story definition: `_bmad-output/sprint-5-purchase-manager/epics.md#Story 2.3: Purchase Manager Fulfillment Actions`
- Architecture: `_bmad-output/architecture.md#Workflow & State Management`
- Backend route: `backend/routes/v2/purchase-requests.js` ("Update Status (State Machine Transitions)")
- Backend controller: `backend/controllers/purchaseRequestController.js#updateStatus`
- Backend model: `backend/models/purchaseRequest.js#PURCHASE_REQUEST_STATUSES`
- Current PM list UI: `frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx`

## Dev Agent Record

### Agent Model Used

OpenAI GPT-5.2

### Debug Log References

### Completion Notes List

### File List
