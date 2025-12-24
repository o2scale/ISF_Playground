# Story 3.2: Coach "My Requests" & Child Orders View

**Epic:** Epic 3: Operational Dashboards & Analytics  
**Story:** 3.2  
**Role:** Coach  
**Goal:** Provide a single place for Coaches to see (a) their own purchase requests and (b) students’ digital orders/deliveries.

## User Story

As a Coach,  
I want to see my own requests and what my students are buying,  
so that I have a complete picture of incoming supplies.

## Acceptance Criteria

**Given** I am a Coach assigned to a Balagruha  
**When** I open my dashboard  
**Then** I see a list of **My Purchase Requests** with current status.

**Given** I am a Coach assigned to a Balagruha  
**When** I open my dashboard  
**Then** I see a separate list of **Digital Orders** placed by children in my Balagruha.

**Given** I need to know what to pick up / deliver  
**When** I filter Digital Orders by “Pending Delivery”  
**Then** I see only orders requiring delivery action.

## Tasks/Subtasks

- [x] **Task 1: Create/extend Coach dashboard page in Shop flow**
  - [x] Add a new page: `frontend/src/pages/CoachRequestsDashboard.jsx`
  - [x] Use existing `ShopNavigation` + `Breadcrumbs` for consistent shop UX

- [x] **Task 2: "My Purchase Requests" section**
  - [x] Fetch data via existing API helper `getMyPurchaseRequests(params)`
  - [x] Render a compact table/list:
    - [x] Request ID, created date, balagruha/`STOCK`, items count, status, (priority if detectable)
  - [x] Basic filters: status + date range (reuse existing date-range conventions)

- [x] **Task 3: "Digital Orders" section (child orders)**
  - [x] Fetch data via existing API helper `getCoachDeliveries(params)`
  - [x] Provide status filter options matching backend: `pending_delivery`, `delivered_today`, `delivered_last_7_days`, `all_delivered`
  - [x] Reuse UI patterns from `frontend/src/pages/CoachDeliveries.jsx` (avoid duplicating complex layout where possible)

- [x] **Task 4: Navigation / entry point**
  - [x] Add a Coach-visible nav entry (label: "My Requests")
    - [x] Option A: Add to `frontend/src/components/shop/ShopNavigation.jsx` (coach role)
  - [x] Add route in `frontend/src/App.js` for `/coach/requests` (protected)

- [x] **Task 5: Tests**
  - [x] Add a unit test to verify the page renders both sections and calls both APIs
  - [x] Add a test for the “Pending Delivery” filter behavior (UI-level)

## Dev Notes

### What already exists

- **Digital Orders UI:** `frontend/src/pages/CoachDeliveries.jsx`
- **Coach deliveries API:** `GET /api/v2/shop/coach/deliveries` (see `backend/controllers/coachDeliveryController.js#getCoachDeliveries`)
- **My purchase requests API:** `GET /api/v2/shop/admin/purchase-requests/my` (see `backend/controllers/purchaseRequestController.js#getMyPurchaseRequests`)

### Pitfalls

- Keep Coach scope tight: purchase requests should be **only their own** (backend already enforces this for non-admin/PM roles).
- Avoid heavy duplicated UI: prefer composing/reusing existing CoachDeliveries pieces.

## References

- Epic definitions: `_bmad-output/sprint-5-purchase-manager/epics.md#Story-32-Coach-My-Requests--Child-Orders-View`
- Frontend: `frontend/src/pages/CoachDeliveries.jsx`, `frontend/src/components/shop/ShopNavigation.jsx`
- Backend: `backend/controllers/coachDeliveryController.js`, `backend/controllers/purchaseRequestController.js#getMyPurchaseRequests`

## Dev Agent Record

### Agent Model Used

OpenAI GPT-5.2

### Completion Notes

- Added Coach "My Requests" dashboard page with two sections: My Purchase Requests + Digital Orders.
- My Purchase Requests supports status + date range filters and shows High Priority marker when detectable.
- Digital Orders supports backend-aligned status filtering including "Pending Delivery".

## File List

- `frontend/src/pages/CoachRequestsDashboard.jsx`
- `frontend/src/components/shop/ShopNavigation.jsx`
- `frontend/src/App.js`
- `frontend/src/__tests__/pages/CoachRequestsDashboard.test.js`

## Change Log

- 2025-12-24: Story file created
- 2025-12-24: Implemented Coach Requests dashboard (page + navigation + tests)

## Status

review
