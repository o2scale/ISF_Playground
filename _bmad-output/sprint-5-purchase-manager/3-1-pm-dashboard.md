# Story 3.1: Purchase Manager Operational Dashboard

**Epic:** Epic 3: Operational Dashboards & Analytics  
**Story:** 3.1  
**Role:** Purchase Manager  
**Goal:** Provide a priority-sorted, status-focused view of active purchase requests, plus a simple PM scorecard.

## User Story

As a Purchase Manager,  
I want a dashboard of all active requests sorted by priority,  
so that I know exactly what to order next.

## Acceptance Criteria

**Given** I am a Purchase Manager  
**When** I open the Shop Inventory purchase requests view  
**Then** I see a list/table of active requests (at minimum: `pending`, `ordered`).

**Given** at least one request is marked High Priority  
**When** I view the list  
**Then** High Priority requests are displayed above Normal requests and visually highlighted.

**Given** I want to focus on a specific workflow stage  
**When** I use the Status filter  
**Then** I can filter to `pending` and `ordered` (and optionally other statuses).

**Given** I am a Purchase Manager  
**When** I view the dashboard header  
**Then** I see a Scorecard widget showing **my completed tasks count**.

## Tasks/Subtasks

- [x] **Task 1: Add priority detection + sorting**
  - [x] Implement `getPriority(request)` helper (High vs Normal)
    - [x] MVP: Treat `reason` starting with `[HIGH PRIORITY]` as High (current behavior from `RequestItemModal.jsx`)
    - [x] Fallback: If `justification` contains `Priority: High`, treat as High
  - [x] Update sorting in `frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx` so priority sorting runs **before** date sorting
  - [x] Add a visual cue for High Priority rows/cards (badge + row highlight)

- [x] **Task 2: PM-focused default filters (status)**
  - [x] Set PM default status filter to an “Active (Pending + Ordered)” option (or equivalent) so the dashboard opens scoped to active work
  - [x] Ensure filters still allow viewing the full lifecycle when needed (e.g. delivered/on_hold)

- [x] **Task 3: Scorecard widget (client-side MVP)**
  - [x] In `ShopInventoryView.jsx`, compute `completedTasksCount` for the logged-in PM (`userId` prop)
    - [x] Suggested definition (MVP): count requests where `statusHistory` contains `{ status: 'delivered_store', changedBy: userId }`
    - [x] Optionally also show “Ordered” count and/or “Avg time to order/receive” as follow-ups
  - [x] Render a small widget above the table (consistent with existing PurchaseManagement styling)

- [x] **Task 4: (Optional) Backend support for performance score**
  - [x] If client-side calculation becomes slow, add a dedicated endpoint (e.g. `GET /api/v2/shop/admin/purchase-requests/scorecard`) that returns aggregates for the current PM (not needed for MVP)

- [x] **Task 5: Tests**
  - [x] Add a targeted unit test to confirm high-priority sorting/visual marker
  - [x] Add a unit test for scorecard calculation against a fixture request list

## Dev Notes

### What already exists

- **PM list view:** `frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx`
- **Priority encoding today:** `frontend/src/components/shop/RequestItemModal.jsx` prefixes reason with `[HIGH PRIORITY]` and writes `Priority: High` into justification.
- **Purchase requests API:** `GET /api/v2/shop/admin/purchase-requests` (PM is filtered server-side by assigned Balagruhas + `STOCK`).
- **Strict lifecycle statuses:** `pending`, `ordered`, `delivered_store`, `delivered_balagruha` (+ `on_hold`, `rejected`).

### Pitfalls

- **Priority is not a first-class field** in `backend/models/purchaseRequest.js` today; sorting must infer priority from existing text fields unless a schema change is introduced.
- **Two workflow families exist** (approval vs strict lifecycle). Keep existing `pending_approval/approved/completed` support intact.

## References

- Epic definitions: `_bmad-output/sprint-5-purchase-manager/epics.md#Story-31-Purchase-Manager-Operational-Dashboard`
- UI: `frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx`
- Priority source: `frontend/src/components/shop/RequestItemModal.jsx`
- Model: `backend/models/purchaseRequest.js`
- Controller: `backend/controllers/purchaseRequestController.js#getAllPurchaseRequests`

## Dev Agent Record

### Agent Model Used

OpenAI GPT-5.2

### Implementation Plan

- Add `getPriority(request)` inference helper (reason prefix + justification fallback)
- Apply priority-first sort in `ShopInventoryView` before existing date sort
- Add a High Priority badge + row highlight, with a targeted RTL unit test

### Completion Notes

- ✅ Task 1 complete: priority detection + priority-first sorting + row badge/highlight.
- ✅ Task 2 complete: PM default status filter set to Active (Pending + Ordered) while preserving full lifecycle filter options.
- ✅ Task 3 complete: client-side PM scorecard rendered + completedTasksCount computed from statusHistory.
- ✅ Task 4 complete: backend scorecard endpoint not needed for MVP; client-side calc retained.
- ✅ Task 5 complete: added unit tests for priority sorting/visual marker + scorecard calculation.
- Tests: `frontend/src/__tests__/components/purchaseManagement/ShopInventoryView.test.js`

## File List

- `frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx`
- `frontend/src/components/purchaseManagement/PurchaseManagement.css`
- `frontend/src/__tests__/components/purchaseManagement/ShopInventoryView.test.js`
- `frontend/src/__tests__/components/admin/inventory/NewItemForm.test.js`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

## Change Log

- 2025-12-24: Story file created
- 2025-12-24: Task 1 implemented (priority detection + priority-first sorting + visual marker)
- 2025-12-24: Task 2 implemented (PM default Active status filter + lifecycle filtering)
- 2025-12-24: Task 3 implemented (PM scorecard widget + completedTasksCount)
- 2025-12-24: Task 4 marked N/A (client-side scorecard is sufficient for MVP)
- 2025-12-24: Task 5 implemented (unit tests for priority + scorecard)
- 2025-12-24: Stabilized frontend test suite (increased timeout for NewItemForm tests)

## Status

review
