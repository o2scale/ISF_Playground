# QA-D5: Admin Product + Inventory + Vendor
Date: 2026-03-17 | Sprint: 5 | Scope: FR14-FR28

## Summary
15 FRs validated: 10 PASS, 4 PARTIAL, 1 NOT BUILT

## Compliance Matrix

| FR | Description | Status | Evidence | Notes |
|----|-------------|--------|----------|-------|
| FR14 | Admin can create products with name, description, category, price, stock, images (S3 upload) | **PASS** | `adminProductController.js::createProduct` accepts all fields; `shopItem.js` model has all fields; `shopProductImageController.js` handles S3 upload; images array in model | Full CRUD with S3 image support implemented |
| FR15 | Admin can edit and deactivate products | **PASS** | `adminProductController.js::updateProduct` (line 262) and `deleteProduct` (line 369, soft-delete sets isActive:false); `restoreProduct` (line 406) also exists | Soft-delete pattern confirmed |
| FR16 | Admin can assign up to 3 approved vendors per product | **PARTIAL** | `shopItem.js` has `approvedVendors[{vendorId, rank}]`; `createProduct` and `updateProduct` validate vendor IDs exist and check for duplicates | **No enforcement of max 3 vendors.** Controller validates vendors exist and checks for duplicates but never limits array length to 3. PRD says "up to 3" but code accepts any number. |
| FR17 | Admin can set maxPrice (rupees), sellingPrice (coins), purchaseCategory | **PASS** | `shopItem.js` has `maxPrice`, `sellingPrice`, `purchaseCategory` fields; `createProduct` requires `maxPrice` and `approvedVendors` for new items (Story 1.2 strict policy); purchaseCategory has 6-value enum | All three fields present with validation |
| FR18 | System prevents duplicate product names via fuzzy matching | **NOT BUILT** | Searched entire codebase for "fuzzy" and "duplicate product name" -- zero matches. Only SKU uniqueness is enforced (duplicate key on `sku` field). | SKU uniqueness exists but fuzzy name duplicate detection is completely absent |
| FR19 | Admin can upload product images to S3 with base64 support | **PARTIAL** | `shopProductImageController.js` handles multipart/form-data upload to S3 via `uploadShopProductImage` in `s3.js` (line 444); ShopItem model has `images[]` array with isPrimary, url, uploadedAt | S3 upload works via multipart. **No base64 support** -- controller expects `req.files` from multer, not base64 encoded data. Story-14 documents the implementation. |
| FR20 | Admin can view inventory levels for all products | **PASS** | `inventoryController.js::getInventoryDashboard` (line 506) returns products with stock, lowStockThreshold; supports search, category filter, stockStatus filter; calculates statistics (totalProducts, outOfStock, lowStock, totalValue) | Full dashboard with filtering and stats |
| FR21 | System generates low stock and out-of-stock alerts based on configurable thresholds | **PASS** | `inventoryController.js::getLowStockProducts` and `getOutOfStockProducts` endpoints; `shopItem.js` has `lowStockThreshold` (default 10) and `lowStock` virtual; frontend has LowStockReport.jsx and OutOfStockReport.jsx pages with alert banners on inventory dashboard | Alert banners + dedicated report pages |
| FR22 | Admin can perform stock adjustments with reason codes and notes | **PASS** | `inventoryController.js::adjustStock` (line 18) supports reason codes: 'Purchase / Restock', 'Inventory Adjustment', 'Student Return', 'Stock Correction', 'Damaged Items', 'Other'; maps to transactionType enum; `notes` field accepted; creates InventoryTransaction record | 6 reason codes, notes field, audit record per adjustment |
| FR23 | System maintains audit trail for all stock movements | **PASS** | `inventoryTransaction.js` model tracks: productId, transactionType (purchase/sale/adjustment/return/correction/purchase_request), quantity, previousStock, newStock, reference, reason, notes, performedBy; `getAuditTrail` endpoint (line 422) returns paginated history | Full audit trail with 6 transaction types |
| FR24 | Admin can view Master Inventory Report showing "In Store" vs "Deployed" stock per Balagruha | **PARTIAL** | `inventoryController.js::getMasterInventoryReport` (line 638) returns stock (in-store) and deployed (from completed+delivered orders); frontend at `MasterInventoryReport.jsx` | Shows In Store vs Deployed globally but **does NOT break down by Balagruha**. Aggregation groups by shopItemId without Balagruha segmentation. PRD says "per Balagruha". |
| FR25 | Admin can create vendors with name, phone (Indian format), address, active status | **PASS** | `vendorController.js::createVendor` (line 9); `vendor.js` model has name (required), phone (required, Indian format regex `/^(\+91[\-\s]?)?[6789]\d{9}$/`), address (required), active (boolean, default true) | Indian phone validation confirmed |
| FR26 | Admin can view vendor list with search, pagination, product count aggregation | **PASS** | `vendorController.js::getAllVendors` (line 43) supports search (name/phone/address regex), pagination (page/limit, cap at 100), `includeProductCount=true` query param triggers ShopItem aggregation on approvedVendors | Product count aggregation via `$unwind` + `$group` pipeline |
| FR27 | Admin can edit and deactivate vendors | **PARTIAL** | `vendorController.js::updateVendor` (line 153) uses `findByIdAndUpdate` with `runValidators: true` -- can set `active: false` to deactivate | No dedicated deactivate endpoint (uses generic update). Functionally works but no explicit soft-delete pattern like products have. Acceptable. |
| FR28 | System links vendors to products via approvedVendors array (up to 3 per product) | **PASS** | `shopItem.js` has `approvedVendors[{vendorId: ObjectId ref Vendor, rank: Number}]`; createProduct/updateProduct validate vendor IDs exist in Vendor collection; vendorController aggregates product counts per vendor | Bidirectional linkage works. Same max-3 gap as FR16 but linkage itself is solid. |

## Test Results

```
Test Suites: 3 passed, 3 total
Tests:       39 passed, 39 total
Snapshots:   0 total
Time:        4.853 s

PASS tests/controllers/adminProductController_story1_2.test.js (10 tests)
  Admin Product Controller - Story 1.2
    createProduct
      ✓ should create product with valid constraints
      ✓ should fail if maxPrice is missing
      ✓ should fail if approvedVendors is missing
      ✓ should fail if vendor ID is invalid
      ✓ should fail if duplicate vendor IDs are provided
    createPendingProduct
      ✓ should allow admin to create pending product
      ✓ should deny non-admin
    updateProduct
      ✓ should validate maxPrice during update
      ✓ should validate approvedVendors during update
      ✓ should validate vendor IDs during update

PASS tests/controllers/vendorController.test.js (10 tests)
  Vendor Controller - Story 1.1
    createVendor
      ✓ should create a new vendor
      ✓ should fail validation
    getAllVendors
      ✓ should get all vendors
      ✓ should cap limit to 100
      ✓ should filter by active status
      ✓ should filter by search term
    updateVendor
      ✓ should update a vendor
      ✓ should return 404 for non-existent vendor
    getVendorById
      ✓ should get vendor by id
      ✓ should return 404 for non-existent vendor

PASS tests/controllers/inventoryController.test.js (19 tests)
  Inventory Controller
    adjustStock
      ✓ should increase stock with positive adjustment
      ✓ should decrease stock with negative adjustment
      ✓ should set stock directly with newStock parameter
      ✓ should reject negative resulting stock
      ✓ should reject negative newStock value
      ✓ should reject zero adjustment
      ✓ should reject non-numeric adjustment
      ✓ should return 404 for non-existent product
      ✓ should create audit trail transaction
      ✓ should reject newStock same as current stock
    bulkUpdateStock
      ✓ should reject non-array csvData
      ✓ should reject missing csvData
    getLowStockProducts
      ✓ should return products at or below low stock threshold
      ✓ should not include out-of-stock products (stock=0)
      ✓ should not include inactive products
    getOutOfStockProducts
      ✓ should return products with stock=0
    getStockAlerts
      ✓ should return combined alert counts
    getQuickStats
      ✓ should return product and order counts
    getAuditTrail
      ✓ should return audit trail for a product
```

## Findings

### Critical
None.

### Major
1. **FR18 — Fuzzy duplicate product name detection not implemented.** Only SKU uniqueness is enforced. Two products with identical or near-identical names (e.g., "Blue Pen" and "blue pen") can be created freely. The PRD explicitly requires fuzzy matching to prevent duplicates.

2. **FR24 — Master Inventory Report lacks per-Balagruha breakdown.** The report shows global "In Store" vs "Deployed" counts but does not segment deployed quantities by Balagruha. The PRD states "showing 'In Store' vs 'Deployed' stock per Balagruha" which requires Order aggregation grouped by Balagruha destination.

### Minor
1. **FR16/FR28 — No max-3 vendor limit enforced.** The PRD says "up to 3 approved vendors per product" but neither `createProduct` nor `updateProduct` validates that `approvedVendors.length <= 3`. Any number of vendors can be assigned.

2. **FR19 — No base64 image upload support.** The PRD mentions "base64 support" but the controller only handles multipart/form-data via multer. Base64 encoded images in JSON body are not accepted.

3. **FR27 — No dedicated vendor deactivation endpoint.** Deactivation works via the generic `updateVendor` (setting `active: false`) but there is no dedicated DELETE or deactivate route. This is functionally adequate but inconsistent with the product soft-delete pattern.

4. **InventoryTransaction transactionType enum mismatch for bulk imports.** The `bulk_import` reason type used by the bulk upload feature is not in the `transactionType` enum (`purchase`, `sale`, `adjustment`, `return`, `correction`, `purchase_request`). This was noted in QA Re-Test #5 of Story-06 causing failed bulk updates. The enum needs `bulk_import` added or the bulk upload should map to `adjustment`.

## Recommended Fix Stories

| # | Title | Priority | FRs | Effort |
|---|-------|----------|-----|--------|
| 1 | Implement fuzzy product name duplicate detection | P2 | FR18 | 2 pts |
| 2 | Add per-Balagruha breakdown to Master Inventory Report | P2 | FR24 | 3 pts |
| 3 | Enforce max 3 approved vendors per product | P3 | FR16, FR28 | 1 pt |
| 4 | Fix InventoryTransaction transactionType enum for bulk_import | P1 | FR22, FR23 | 1 pt |
| 5 | Add base64 image upload support (optional) | P3 | FR19 | 2 pts |
