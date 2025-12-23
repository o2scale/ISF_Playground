# Story 2.1: Purchase Request Schema & State Machine

**Epic:** Epic 2: Purchase Request Workflow Engine
**Story:** 2.1
**Role:** Developer (Backend)
**Goal:** Update the Purchase Request data model and controller to support the strict 4-step lifecycle and "In-Stock" shortcuts.

## User Story
As a Developer,
I want to update the Purchase Request data model and controller,
So that it supports the strict 4-step lifecycle and "In-Stock" shortcuts.

## Acceptance Criteria

**Given** A Purchase Request is created
**When** A user attempts to change status
**Then** The system validates their role against the allowed transitions:
  - `pending` -> `ordered`: **Purchase Manager** only
  - `ordered` -> `delivered_store`: **Purchase Manager** only
  - `delivered_store` -> `delivered_balagruha`: **Coach/Requester** only
**And** Invalid transitions return a 403 Forbidden error
**And** Each transition logs the `userId` and `timestamp` in a `statusHistory` array
**And** If the shortcut "Assign from Stock" is used, the status jumps directly to `delivered_store` and stock is decremented immediately

## Implementation Notes
*   **Schema:** Update `PurchaseRequest` in `backend/models/purchaseRequest.js`:
    *   Enum: `['pending', 'ordered', 'delivered_store', 'delivered_balagruha', 'rejected', 'on_hold']`
    *   `statusHistory`: Array of `{ status, changedBy, changedAt, notes }`
*   **Controller:** Update `purchaseRequestController.js`:
    *   `updateStatus` endpoint with strict role guards.
    *   `assignFromStock` endpoint (New) -> Transactional decrement of `ShopItem` stock.
*   **Service:** Consider moving complex logic to `backend/services/purchaseRequestService.js`.

## Dependencies
*   Story 1.2 (ShopItem) must be ready (for stock decrement logic).
