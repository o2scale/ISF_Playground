# Story 1.3: Admin "New Item" UI Implementation

**Epic:** Epic 1: Inventory Governance & Vendor Management
**Story:** 1.3
**Role:** Admin
**Goal:** Provide a specific UI form for introducing new items that enforces strict data requirements (Vendors, Prices).

## User Story
As an Admin,
I want a specific UI form for introducing new items,
So that I can easily enforce the strict data requirements.

## Acceptance Criteria
- [x] **AC1:** **Given** I am on the Admin Inventory Dashboard **When** I click "Add New Master Item" **Then** I see a form with Name, Category, Description, Vendor Section (3 slots), Max Price (Rupees), Selling Price (Coins), and Image Upload.
- [x] **AC2:** **Given** I am filling the form **Then** I cannot submit without selecting at least 1 vendor and entering a valid `maxPrice`.
- [x] **AC3:** **Given** I submit the valid form **Then** it calls `POST /api/v2/shop/admin/products` with the correct payload structure (including `approvedVendors`).

## Tasks/Subtasks
- [x] **Task 1: Create UI Component**
    - [x] Create `frontend/src/components/admin/inventory/NewItemForm.jsx` with layout.
    - [x] Implement form fields (Name, SKU, Category, Unit, Description, Image).
- [x] **Task 2: Logic & Integration**
    - [x] Fetch vendors from `GET /api/v2/vendors` on mount.
    - [x] Implement Vendor Selection logic (3 slots).
    - [x] Implement Pricing fields (Max Price & Selling Price).
    - [x] Implement Validation (disable submit if invalid).
    - [x] Implement Submit handler (POST to `/api/v2/shop/admin/products`).
- [x] **Task 3: Testing**
    - [x] Create unit tests in `frontend/src/__tests__/components/admin/inventory/NewItemForm.test.js`.
    - [x] Verify ACs with tests.

## Dev Agent Record
### Implementation Plan
- Created `NewItemForm` using `react-hook-form` and Shadcn UI components.
- Integrated with `api.js` to fetch vendors and submit product.
- Enforced client-side validation for `maxPrice` and `approvedVendors`.
- Fixed environment issues with `api` import and UI component path aliases.
- Verified functionality with Jest tests covering rendering, validation, and submission.

### Completion Notes
- All ACs met.
- Component is ready for integration into the main Admin Dashboard router.
- Tests passing.

## File List
- frontend/src/components/admin/inventory/NewItemForm.jsx
- frontend/src/__tests__/components/admin/inventory/NewItemForm.test.js
- frontend/src/components/ui/*.tsx (Path alias fixes)
- frontend/src/components/ui/*.jsx (Path alias fixes)

## Change Log
- 2025-12-23: Implemented NewItemForm and tests.
- 2025-12-23: Fixed API import paths and UI component aliases.

## Status
review