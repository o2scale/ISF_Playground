# Story 2.3: Purchase Manager Fulfillment Actions

**Epic:** Epic 2: Purchase Request Workflow Engine
**Story:** 2.3
**Role:** Purchase Manager
**Goal:** Enable Purchase Managers to move requests through `pending -> ordered -> delivered_store` via simple UI actions.

## User Story

As a Purchase Manager,
I want to process pending requests,
so that items are ordered and received into the store.

## Acceptance Criteria

**Given** I am viewing a purchase request with status `pending`
**When** I click **Mark Ordered**
**Then** the request status updates to `ordered`.

**Given** I am viewing a purchase request with status `ordered`
**When** I click **Mark Received at Store**
**Then** the request status updates to `delivered_store`.

## Tasks/Subtasks

- [x] **Task 1: Frontend API helper for state-machine status updates**
  - [x] Add `updatePurchaseRequestStatus(requestId, { status, notes })` in `frontend/src/api.js`
  - [x] Surface errors via existing UI toast patterns (`showToast`)

- [x] **Task 2: PM fulfillment actions in Shop Inventory requests UI**
  - [x] In `frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx` add:
    - [x] **Mark Ordered** action for `pending` requests
    - [x] **Mark Received at Store** action for `ordered` requests
  - [x] Call `updatePurchaseRequestStatus(...)`, refresh list, show success toast
  - [x] Disable buttons while update is in-flight

- [x] **Task 3: PM fulfillment actions in Request Details modal**
  - [x] In `frontend/src/components/purchaseManagement/modals/ViewRequestModal.jsx`, add matching actions for `pending` / `ordered`

- [x] **Task 4: Align status labels/badges with strict lifecycle (Story 2.1)**
  - [x] Update `getStatusBadge()` to recognize: `pending`, `ordered`, `delivered_store`, `delivered_balagruha`, `on_hold`
  - [x] Add missing status badge styles in `PurchaseManagement.css`
  - [x] Preserve legacy approval statuses (`pending_approval`, `approved`, `completed`, etc.)

- [x] **Task 5: Backend verification / guardrails**
  - [x] Use `PATCH /api/v2/shop/admin/purchase-requests/:id/status` for transitions
  - [x] Keep server-side role guards in `purchaseRequestController.updateStatus`
  - [x] Ensure PM can list requests (route now uses multi-role access middleware)

## Tests

- [x] Add targeted UI tests for the new status-transition buttons (recommended)
- [x] Regression: backend tests pass
- [x] Regression: frontend tests pass

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
   - Backend route uses `checkPurchaseRequestAccess()` and `getAllPurchaseRequests` applies role-based filtering.

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

- PMs can now mark `pending -> ordered` and `ordered -> delivered_store` from both the list view and the details modal.
- Enforced resource-scoped RBAC for Purchase Managers on status transitions and request details access.
- Status badges now display strict lifecycle statuses with appropriate styling.
- Added targeted frontend + backend tests covering the new actions and RBAC rules.

### File List

- backend/routes/v2/purchase-requests.js
- backend/controllers/purchaseRequestController.js
- backend/tests/purchaseRequest_story2_1.test.js
- frontend/src/api.js
- frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx
- frontend/src/components/purchaseManagement/modals/ViewRequestModal.jsx
- frontend/src/components/purchaseManagement/PurchaseManagement.css
- frontend/src/__tests__/components/purchaseManagement/ShopInventoryView.test.js
- _bmad-output/implementation-artifacts/sprint-status.yaml

## Change Log

- 2025-12-24: Implemented Story 2.3 (PM fulfillment actions + status UI support)

## Status

done
