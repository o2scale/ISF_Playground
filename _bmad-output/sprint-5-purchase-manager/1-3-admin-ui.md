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

**Given** I am on the Admin Inventory Dashboard
**When** I click "Add New Master Item"
**Then** I see a form matching the design:
  - **Type/Name:** Text Input
  - **Category:** Dropdown
  - **Description:** Text Area
  - **Vendor Section:** 3 Slots (Dropdowns populated from Vendor API)
  - **Pricing:** "Max Price Target" (Rupees) AND "Selling Price" (Coins)
  - **Media:** Image Upload
**And** I cannot submit the form without selecting at least 1 vendor
**And** I cannot submit without a valid `maxPrice`
**And** On submission, it calls `POST /api/v2/shop/admin/products` with the structured data

## Implementation Notes
*   **Component:** Create `frontend/src/components/admin/inventory/NewItemForm.jsx`.
*   **State:** Use a local form state (or `react-hook-form`).
*   **Integration:**
    *   Fetch vendors on mount: `GET /api/v2/shop/admin/vendors`.
    *   Submit payload must match the updated `ShopItem` schema from Story 1.2.
*   **Validation:** Client-side validation for required fields before API call.

## Dependencies
*   Story 1.1 (Vendor API) must be ready (to fetch vendors).
*   Story 1.2 (ShopItem Schema) must be ready (to accept the payload).
