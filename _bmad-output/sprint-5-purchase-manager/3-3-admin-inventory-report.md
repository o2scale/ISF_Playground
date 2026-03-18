# Story 3.3: Admin Master Inventory Report

**Epic:** Epic 3: Operational Dashboards & Analytics  
**Story:** 3.3  
**Role:** Admin  
**Goal:** Provide a master inventory view showing "In Store" stock vs "Deployed" stock derived from delivery history.

## User Story

As an Admin,  
I want to see a holistic view of inventory across the organization,  
so that I can spot shortages or anomalies.

## Acceptance Criteria

**Given** I am an Admin  
**When** I open the Master Inventory Report  
**Then** I see each active ShopItem with:
  - **In Store** (current stock)
  - **Deployed** (calculated from delivery history)

**Given** I am not an Admin  
**When** I attempt to access the report  
**Then** I am denied (RBAC enforced at the API + route level).

## Tasks/Subtasks

- [ ] **Task 1: Backend report endpoint**
  - [ ] Add an admin-only endpoint (suggested): `GET /api/v2/shop/admin/inventory/master-report`
  - [ ] Define "Deployed" calculation (MVP): sum of delivered order quantities per product
    - [ ] Aggregate from `Order` where `status = 'completed'` and `deliveryStatus = 'delivered'`
    - [ ] Group by `items.shopItemId` and sum `items.quantity`
  - [ ] Join with `ShopItem` to return `sku`, `name`, `category`, `stock` (In Store) + `deployed`
  - [ ] Consider optional query params: `startDate`, `endDate`, `category`, `sku/name search`

- [ ] **Task 2: Frontend report page**
  - [ ] Add a new page (suggested): `frontend/src/pages/MasterInventoryReport.jsx`
  - [ ] Protect route with `ProtectedRoute module="Shop Management" action="Manage"`
  - [ ] UI should include: search, category filter, and a sortable table
  - [ ] Optional: export CSV

- [ ] **Task 3: Navigation**
  - [ ] Add an entry point from existing admin inventory tooling:
    - Option A: link from `frontend/src/pages/InventoryManagement.jsx`
    - Option B: add a new button in `frontend/src/components/shop/ShopAdminControls.jsx`
    - Option C: add under `/shop/admin/reports` (if reports hub exists)
  - [ ] Add breadcrumb mapping in `frontend/src/components/shop/Breadcrumbs.jsx`

- [ ] **Task 4: Tests**
  - [ ] Backend: add an integration test validating deployed aggregation for at least 2 products
  - [ ] Backend: verify non-admin receives 403
  - [ ] Frontend: smoke test for rendering rows from API response

## Dev Notes

### What already exists

- Admin inventory management UI: `frontend/src/pages/InventoryManagement.jsx` (`/shop/admin/inventory`)
- Orders + delivery lifecycle:
  - `backend/models/order.js` (fields: `deliveryStatus`, `deliveredAt`)
  - `backend/controllers/coachDeliveryController.js` (delivery management)

### Pitfalls

- The shop checkout flow deducts `ShopItem.stock` at order placement; "Deployed" should be computed from **delivered** orders (not merely placed) to match “delivery history”.
- Ensure aggregation remains performant (add/confirm indexes if needed on `Order.deliveryStatus`, `Order.status`, and `items.shopItemId`).

## References

- Epic definitions: `_bmad-output/sprint-5-purchase-manager/epics.md#Story-33-Admin-Master-Inventory-Report`
- Frontend inventory: `frontend/src/pages/InventoryManagement.jsx`
- Backend inventory: `backend/controllers/inventoryController.js`
- Orders: `backend/models/order.js`, `backend/services/order.js`

## Dev Agent Record

### Agent Model Used

OpenAI GPT-5.2

## Change Log

- 2025-12-24: Story file created

## Status

done
