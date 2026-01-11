# Story 2.5: Six Purchase Categories

**Epic:** Epic 2: Purchase Request Workflow Engine  
**Story:** 2.5  
**Role:** Staff + Purchase Manager  
**Goal:** Split purchase requests into 6 categories to keep item lists manageable.

## User Story

As a requester (Coach/Medical/etc.),  
I want to choose a purchase type/category before selecting items,  
so that I don't have to scroll through a massive combined item list.

## Client Requirements (from C3)

> "We have listed 6 types of purchases: Medicines, ISF shop, Repair items, Infra items, Consumables."
> "If a coach needs some medicines, some isf shop items and some consumables like hair oil or vaseline, he will create 3 different tasks even though balgruh is same."
> "The point of splitting purchases into 6 categories... is that he doesn't have a thousand items list. Which will be very cumbersome."
> "Once a coach selects medical purchase for his balgruh, a drop down menu of all meds purchased so far will appear allowing him to simply select and type in the quantity."

## Acceptance Criteria

### AC1: Category Selection on Request Creation
**Given** I am creating a purchase request  
**When** I open the category dropdown  
**Then** I see exactly these 6 options:
  1. **ISF Shop** - Items for student rewards shop
  2. **Medicines** - Medical supplies and pharmaceuticals
  3. **Repairs** - Maintenance and repair materials
  4. **Consumables** - Daily-use items (hair oil, vaseline, socks, etc.)
  5. **Infra** - Infrastructure and facility items
  6. **Others** - Miscellaneous items

### AC2: Category-Filtered Item Selection
**Given** I have selected a category (e.g., "Medicines")  
**When** I open the item dropdown  
**Then** I only see items that belong to that category  
**And** the list is manageable (not 1000+ items).

### AC3: One Category Per Request
**Given** I need items from multiple categories  
**When** I create purchase requests  
**Then** I must create **separate requests** for each category.

### AC4: Category Display in PM Dashboard
**Given** I am a Purchase Manager viewing requests  
**When** I look at the requests table  
**Then** I see a **category badge** on each request for quick identification.

### AC5: Category Filtering in PM Dashboard
**Given** I am viewing purchase requests lists  
**When** I filter by category  
**Then** results are limited to that category.

## Tasks/Subtasks

- [x] **Task 1: Backend schema update**
  - [x] Update `PurchaseRequest.category` enum to the 6 categories:
    - `isf_shop`, `medicines`, `repairs`, `consumables`, `infra`, `others`
  - [x] Add `purchaseCategory` field to `ShopItem` model for categorization

- [x] **Task 2: Backend validation**
  - [x] Update controller validation for create (require category)
  - [x] Update list filters to support category filtering

- [x] **Task 3: Frontend create modal**
  - [x] Update `CreatePurchaseRequestModal` category select with 6 options
  - [x] Make category required before showing item dropdown

- [ ] **Task 4: Category-based product filtering**
  - [ ] Add `purchaseCategory` to ShopItem model if not present
  - [ ] Filter product picker dropdown based on selected category
  - [ ] Ensure legacy items have default category assigned

- [x] **Task 5: PM dashboard category display**
  - [x] Add category badge to requests table
  - [x] Update `ShopInventoryView` category filter with 6 options

## Data Model

### ShopItem.purchaseCategory Enum
```javascript
purchaseCategory: {
  type: String,
  enum: ['isf_shop', 'medicines', 'repairs', 'consumables', 'infra', 'others'],
  default: 'others'
}
```

### PurchaseRequest.category Enum
```javascript
category: {
  type: String,
  enum: ['isf_shop', 'medicines', 'repairs', 'consumables', 'infra', 'others'],
  required: true
}
```

## Dev Agent Record

### Agent Model Used

Claude (BMad Master)

### Completion Notes

- Category list updated across backend + create/list UIs.
- Follow-up pending: filter product picker dropdown by category.
- Migration needed: assign default category to existing ShopItems.

## File List

- `backend/models/purchaseRequest.js`
- `backend/models/shopItem.js`
- `backend/controllers/purchaseRequestController.js`
- `frontend/src/components/purchaseManagement/modals/CreatePurchaseRequestModal.jsx`
- `frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx`

## Status

in_progress
