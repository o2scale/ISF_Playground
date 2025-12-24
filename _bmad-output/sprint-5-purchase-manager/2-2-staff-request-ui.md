# Story 2.2: Staff Purchase Request UI

**Epic:** Epic 2: Purchase Request Workflow Engine
**Story:** 2.2
**Role:** Staff (Coach/Medical/Admin/PM)
**Goal:** Allow authorized staff to create purchase requests from the Master Catalog.

## User Story
As a Staff Member (Coach, Medical, etc.),
I want to request items from the Master Catalog,
So that I can get the supplies I need for my department/balagruha.

## Acceptance Criteria

**Given** I am a logged-in Staff member (Coach, Medical, Admin, or PM)
**When** I view the "Shop" or "Catalog" page
**Then** I see a list of active Master Items
**And** I can select an item and click "Request Item"
**And** A modal/form appears asking for:
  - Quantity
  - Priority Level (Normal/High)
  - Reason (Optional)
**And** I cannot enter a custom item name (must pick from catalog)
**And** When I submit, a `PurchaseRequest` is created with status `pending`
**And** If I am a Purchase Manager, I see an option to "Assign from Stock" immediately (if stock > 0)

## Tasks/Subtasks
- [x] **Task 1: Store & API Update**
    - [x] Update `frontend/src/store/shopStore.js`
    - [x] Add `createPurchaseRequest` action
    - [x] Add `assignFromStock` action

- [x] **Task 2: UI Components**
    - [x] Create `frontend/src/components/shop/RequestItemModal.jsx`
    - [x] Implement form with Quantity, Priority, Reason, Balagruha Selection
    - [x] Implement PM Shortcut "Assign from Stock"

- [x] **Task 3: Integration**
    - [x] Update `frontend/src/components/shop/ProductCard.jsx` to show "Request Item" button for Staff
    - [x] Integrate Modal into `frontend/src/components/shop/ShopHome.jsx`
    - [x] Connect button to Modal trigger

- [x] **Task 4: Testing**
    - [x] Create unit tests for `RequestItemModal`
    - [x] Verify flow manually

## Dev Agent Record
### Implementation Plan
- Added `createPurchaseRequest` and `assignFromStock` actions to `shopStore.js` for Staff/PM workflows.
- Created `RequestItemModal.jsx` to handle the single-item request flow from the catalog.
- Updated `ProductCard.jsx` to detect staff roles and show "Request Item" instead of "Add to Cart".
- Integrated the modal into `ShopHome.jsx`.
- Verified the component with comprehensive unit tests.

### Completion Notes
- Staff members (Coach, PM, Admin, Medical) now see a "Request Item" button on all catalog items.
- Clicking the button opens a modal to specify quantity, priority, and reason.
- Purchase Managers have an additional "Assign from Stock" shortcut which performs both request creation and stock decrement in sequence.
- Tests cover role-based rendering, validation, and submission logic.

## File List
- frontend/src/store/shopStore.js
- frontend/src/components/shop/RequestItemModal.jsx
- frontend/src/components/shop/ProductCard.jsx
- frontend/src/components/shop/ShopHome.jsx
- frontend/src/components/shop/ProductGrid.jsx
- frontend/src/__tests__/components/shop/RequestItemModal.test.js

## Change Log
- 2025-12-23: Implemented Story 2.2 (Staff Request UI and Store integration).

## Status
review