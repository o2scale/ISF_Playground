# Story 2.5: Six Purchase Categories (C3)

**Epic:** Epic 2: Purchase Request Workflow Engine  
**Story:** 2.5  
**Role:** Staff + Purchase Manager  
**Goal:** Split purchase requests into 6 categories to keep item lists manageable.

## User Story

As a requester (Coach/Medical/etc.),  
I want to choose a purchase type/category before selecting items,  
so that I don’t have to scroll through a massive combined item list.

## Acceptance Criteria

**Given** I am creating a purchase request  
**When** I open the category dropdown  
**Then** I see exactly these options:

- ISF Shop
- Medicines
- Repairs
- Consumables
- Infra
- Others

**Given** I am viewing purchase requests lists  
**When** I filter by category  
**Then** results are limited to that category.

## Tasks/Subtasks

- [x] **Task 1: Backend validation + schema enum**
  - [x] Update `PurchaseRequest.category` enum to the 6 categories
  - [x] Update controller validation for create and list filters

- [x] **Task 2: Frontend create + list filter**
  - [x] Update `CreatePurchaseRequestModal` category select
  - [x] Update `ShopInventoryView` category filter

- [ ] **Task 3 (Follow-up): Category-based product filtering**
  - [ ] Decide mapping source (ShopItem.purchaseType vs static mapping)
  - [ ] Filter product picker based on selected category

## Dev Agent Record

### Agent Model Used

OpenAI GPT-5.2

### Completion Notes

- Category list updated across backend + create/list UIs.
- Follow-up pending: actually filtering the product picker by category.

### File List

- `backend/models/purchaseRequest.js`
- `backend/controllers/purchaseRequestController.js`
- `backend/tests/purchaseRequest_story2_1.test.js`
- `frontend/src/components/purchaseManagement/modals/CreatePurchaseRequestModal.jsx`
- `frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx`
- `frontend/src/components/shop/RequestItemModal.jsx`
- `frontend/src/api.js`

## Status

review
