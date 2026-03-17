# Epic 13: Shop & Purchase Workflow Fixes (Sprint 5 Domain)

**Status:** backlog
**Sprint:** 6
**Stories:** 20 core + 6 low-priority
**Estimated Effort:** ~46h core + ~5h low-priority
**Source:** Epic 11 QA validation (fix-stories-consolidated.md)

## Summary

All Sprint 5 shop storefront, cart, orders, admin product management, inventory, vendor, purchase request state machine, PM dashboard, and client corrections.

## Stories

### CRITICAL

| Story | Fix ID | Title | Effort | Status |
|-------|--------|-------|--------|--------|
| 13.1 | FIX-007 | Unify purchase request inventory update with 4-step state machine | 4h | backlog |
| 13.2 | FIX-008 | FR51 route guard mismatch — 5 roles blocked from purchase requests | 1h | backlog |
| 13.3 | FIX-009 | Order routes missing RBAC authorization | 2h | backlog |

### HIGH

| Story | Fix ID | Title | Effort | Status |
|-------|--------|-------|--------|--------|
| 13.4 | FIX-016 | Build product detail page (FR4) | 4h | backlog |
| 13.5 | FIX-017 | Fuzzy duplicate product name detection (FR18) | 3h | backlog |
| 13.6 | FIX-018 | Master inventory report per-Balagruha breakdown (FR24) | 4h | backlog |
| 13.7 | FIX-019 | Capture supplier/invoice at 'ordered' transition (FR33) | 2h | backlog |
| 13.8 | FIX-020 | Add priority and coach filters to purchase request API | 2h | backlog |
| 13.9 | FIX-024 | Verify/complete coin economy health metrics (FR48) | 2h | backlog |

### MEDIUM

| Story | Fix ID | Title | Effort | Status |
|-------|--------|-------|--------|--------|
| 13.10 | FIX-029 | Dead placeholder code in ShopHome.jsx | 0.5h | backlog |
| 13.11 | FIX-030 | Double response in shopController.getVendorsWithProductCount | 0.5h | backlog |
| 13.12 | FIX-031 | Backend console.error cleanup (all controllers) | 3h | backlog |
| 13.13 | FIX-032 | Enforce max 3 approved vendors per product (FR16/FR28) | 1h | backlog |
| 13.14 | FIX-033 | Fix InventoryTransaction transactionType enum for bulk import | 1h | backlog |
| 13.15 | FIX-035 | PM navigation badge not shown for admin role (FR44) | 0.5h | backlog |
| 13.16 | FIX-036 | Priority detection fragility — use model field only | 2h | backlog |
| 13.17 | FIX-037 | Coach filter — move to backend endpoint | 2h | backlog |
| 13.18 | FIX-038 | "Order All" — batch API instead of sequential updates | 2h | backlog |
| 13.19 | FIX-039 | Purchase request stats endpoint missing new statuses | 1h | backlog |
| 13.20 | FIX-043 | Category filter multi-select enhancement | 2h | backlog |

### LOW (can be appended or deferred)

| Story | Fix ID | Title | Effort | Status |
|-------|--------|-------|--------|--------|
| 13.21 | FIX-044 | Correct cancel window comments (24h vs 5min) | 0.25h | backlog |
| 13.22 | FIX-045 | Migrate cart/order console.error to pino | 1h | backlog |
| 13.23 | FIX-046 | Dedicated vendor deactivation endpoint | 1h | backlog |
| 13.24 | FIX-047 | requestId generation race condition | 2h | backlog |
| 13.25 | FIX-048 | Update story 3.3 status file | 0.1h | backlog |
| 13.26 | FIX-049 | act() warnings in CreatePurchaseRequestModal tests | 1h | backlog |

---

## Story Details

### 13.1 — FIX-007: Unify Purchase Request Inventory Update with State Machine
- **Priority:** CRITICAL
- **Source:** QA-D6 (Finding #1)
- **Scope:** `purchaseRequestController.js` — `updateStatus()` and `completePurchaseRequest()`
- **Description:** Two disconnected completion paths. Standard 4-step workflow never triggers inventory updates.
- **AC:**
  - [ ] `delivered_store` transition triggers inventory stock increase
  - [ ] `delivered_balagruha` triggers deployed-stock tracking
  - [ ] Legacy `completePurchaseRequest` deprecated or documented
  - [ ] All 10 statuses documented in API docs
  - [ ] Integration test: 4-step workflow creates InventoryTransaction records

### 13.2 — FIX-008: FR51 Route Guard Mismatch
- **Priority:** CRITICAL
- **Source:** QA-D7 (Finding #1)
- **Scope:** `App.js`, `Layout.js`, `checkPurchaseRequestAccess.js`
- **Description:** `/purchase` route restricts to 3 roles while backend supports 8 non-student roles.
- **AC:**
  - [ ] `/purchase` route updated to include all 8 non-student roles
  - [ ] All 8 roles can access purchase request pages
  - [ ] E2E test: non-coach staff role can create a purchase request

### 13.3 — FIX-009: Order Routes Missing RBAC Authorization
- **Priority:** CRITICAL
- **Source:** QA-D8 (Finding #4)
- **Scope:** `backend/routes/v2/orders.js`
- **Description:** All order endpoints use only `authenticate` without `authorize()`. Admin-only `/all` endpoint accessible to any authenticated user.
- **AC:**
  - [ ] `authorize('Shop Management', 'Manage')` on admin-only endpoints
  - [ ] Student order endpoints verify `req.user.id === order.userId`
  - [ ] Unit tests for authorization enforcement

### 13.4 — FIX-016: Build Product Detail Page (FR4)
- **Priority:** HIGH
- **Source:** QA-D4 (Finding M1)
- **Scope:** Missing `ProductDetail.jsx`; `App.js` route
- **Description:** Backend API exists but no frontend product detail page.
- **AC:**
  - [ ] `ProductDetail.jsx` at route `/shop/products/:id`
  - [ ] Full description, image gallery, stock info, add-to-cart
  - [ ] Navigation from ProductCard
  - [ ] Back button to catalog

### 13.5 — FIX-017: Fuzzy Duplicate Product Name Detection (FR18)
- **Priority:** HIGH
- **Source:** QA-D5 (Finding #1)
- **Scope:** `adminProductController.js`
- **Description:** Only SKU uniqueness enforced. Identical product names allowed.
- **AC:**
  - [ ] Fuzzy name matching on creation (case-insensitive, trimmed)
  - [ ] Warning/rejection for similar names
  - [ ] Unit test: "Blue Pen" vs "blue pen" detected

### 13.6 — FIX-018: Master Inventory Report Per-Balagruha Breakdown (FR24)
- **Priority:** HIGH
- **Source:** QA-D5 (Finding #2)
- **Scope:** `inventoryController.js`; `MasterInventoryReport.jsx`
- **Description:** Report shows global totals but no per-Balagruha breakdown.
- **AC:**
  - [ ] Aggregation groups deployed stock by Balagruha
  - [ ] Frontend per-Balagruha columns or expandable rows
  - [ ] CSV export includes Balagruha breakdown

### 13.7 — FIX-019: Capture Supplier/Invoice at 'ordered' Transition (FR33)
- **Priority:** HIGH
- **Source:** QA-D6 (Finding #3)
- **Scope:** `purchaseRequestController.js` — `updateStatus()`
- **Description:** No mechanism to capture `supplierName`/`invoiceNumber` at ordering step.
- **AC:**
  - [ ] `updateStatus` accepts `supplierName` and `invoiceNumber` when transitioning to 'ordered'
  - [ ] Fields saved to model
  - [ ] Unit test

### 13.8 — FIX-020: Priority and Coach Filters for Purchase Request API
- **Priority:** HIGH
- **Source:** QA-D6 (Findings #4, #5)
- **Scope:** `purchaseRequestController.js` — `getAllPurchaseRequests()`
- **Description:** No `priority` or `requestedBy` filter parameters. No priority-first sorting.
- **AC:**
  - [ ] `priority` and `requestedBy` query parameters added
  - [ ] `sort=priority` option (High > Medium > Low)
  - [ ] Default sort: priority-first, then date

### 13.9 — FIX-024: Coin Economy Health Metrics (FR48)
- **Priority:** HIGH
- **Source:** QA-D7 (Finding #3)
- **Scope:** `analytics.js` — `getCoinEconomyHealth()`
- **Description:** Completeness of earn-to-spend ratio, coin velocity, and shop conversion rate uncertain.
- **AC:**
  - [ ] All 3 metrics computed and returned
  - [ ] Frontend `CoinEconomyHealth.jsx` displays all 3

### 13.10 — FIX-029: Dead Placeholder Code in ShopHome.jsx
- **Priority:** MEDIUM
- **Source:** QA-D4 (Finding M2)
- **Scope:** `ShopHome.jsx` line 114
- **Description:** `handleAddToCart` shows alert placeholder, never called.
- **AC:**
  - [ ] `handleAddToCart` and `onAddToCart` prop removed

### 13.11 — FIX-030: Double Response in shopController
- **Priority:** MEDIUM
- **Source:** QA-D4 (Finding m3)
- **Scope:** `shopController.js` lines 193-194
- **Description:** `res.status(200).json()` called twice in sequence.
- **AC:**
  - [ ] Duplicate response line removed
  - [ ] Unit test verifies single response

### 13.12 — FIX-031: Backend console.error Cleanup
- **Priority:** MEDIUM
- **Source:** QA-D2, QA-D4, QA-D6
- **Scope:** All backend controllers
- **Description:** `console.error` used instead of structured pino logging.
- **AC:**
  - [ ] All `console.error` replaced with pino/errorLogger
  - [ ] Structured log format with correlation IDs

### 13.13 — FIX-032: Max 3 Approved Vendors Per Product (FR16/FR28)
- **Priority:** MEDIUM
- **Source:** QA-D5 (Finding minor #1)
- **Scope:** `adminProductController.js`
- **Description:** No validation limits `approvedVendors.length`.
- **AC:**
  - [ ] Validation rejects `approvedVendors.length > 3`
  - [ ] Unit test: creation with 4 vendors rejected

### 13.14 — FIX-033: InventoryTransaction transactionType Enum
- **Priority:** MEDIUM
- **Source:** QA-D5 (Finding minor #4)
- **Scope:** `inventoryTransaction.js`
- **Description:** `bulk_import` not in `transactionType` enum, causing bulk upload failures.
- **AC:**
  - [ ] `bulk_import` added to enum or mapped to `adjustment`
  - [ ] Bulk stock update completes without enum errors

### 13.15 — FIX-035: PM Navigation Badge for Admin Role (FR44)
- **Priority:** MEDIUM
- **Source:** QA-D7 (Finding #2)
- **Scope:** `Layout.js` line 527
- **Description:** Badge only shows for `purchase-manager`, not `admin`.
- **AC:**
  - [ ] Badge condition includes `admin` role

### 13.16 — FIX-036: Priority Detection — Use Model Field Only
- **Priority:** MEDIUM
- **Source:** QA-D7 (Finding minor #4)
- **Scope:** `ShopInventoryView.jsx` line 56
- **Description:** Priority parsed from text fields instead of model's `priority` field.
- **AC:**
  - [ ] Priority sourced exclusively from model field
  - [ ] Text-based parsing removed
  - [ ] Migration for existing records

### 13.17 — FIX-037: Coach Filter — Move to Backend
- **Priority:** MEDIUM
- **Source:** QA-D7 (Finding minor #5)
- **Scope:** `ShopInventoryView.jsx` line 837
- **Description:** Coach filter extracts from loaded data instead of backend endpoint.
- **AC:**
  - [ ] Backend endpoint `GET /api/v2/shop/admin/requests/coaches`
  - [ ] Frontend fetches from backend

### 13.18 — FIX-038: "Order All" Batch API
- **Priority:** MEDIUM
- **Source:** QA-D7 (Finding minor #6)
- **Scope:** `ShopInventoryView.jsx` line 726
- **Description:** Sequential status updates instead of batch.
- **AC:**
  - [ ] Batch endpoint `PUT /api/v2/shop/admin/purchase-requests/bulk-status`
  - [ ] Frontend calls batch endpoint
  - [ ] Atomic: all succeed or all fail

### 13.19 — FIX-039: Purchase Request Stats Missing Statuses
- **Priority:** MEDIUM
- **Source:** QA-D6 (Finding #8)
- **Scope:** `purchaseRequestController.js` — `getPurchaseRequestStats()`
- **Description:** Only 5 of 10 valid statuses initialized in stats response.
- **AC:**
  - [ ] All 10 statuses initialized with zero defaults
  - [ ] Frontend handles all status keys

### 13.20 — FIX-043: Category Filter Multi-Select
- **Priority:** MEDIUM
- **Source:** QA-D4 (Finding m2)
- **Scope:** `FilterPanel.jsx`
- **Description:** Radio buttons (single-select) instead of checkboxes with removable pills.
- **AC:**
  - [ ] Checkboxes for multi-select
  - [ ] Removable pills for selected categories
  - [ ] Backend extended to accept comma-separated categories

### 13.21 — FIX-044: Correct Cancel Window Comments
- **Priority:** LOW | **Effort:** 0.25h
- Comments say "24 hours" but implementation is 5 minutes. Update comments.

### 13.22 — FIX-045: Cart/Order console.error to Pino
- **Priority:** LOW | **Effort:** 1h
- Replace `console.error` in `cartController.js` (6 calls) and `orderController.js` (5 calls) with `errorLogger`.

### 13.23 — FIX-046: Vendor Deactivation Endpoint
- **Priority:** LOW | **Effort:** 1h
- Dedicated `DELETE /api/v2/shop/admin/vendors/:id` for soft-delete.

### 13.24 — FIX-047: requestId Race Condition
- **Priority:** LOW | **Effort:** 2h
- Counter collection with atomic increment instead of `countDocuments()`.

### 13.25 — FIX-048: Update Story 3.3 Status File
- **Priority:** LOW | **Effort:** 0.1h
- Story file shows `ready-for-dev` but code is fully implemented.

### 13.26 — FIX-049: act() Warnings in Tests
- **Priority:** LOW | **Effort:** 1h
- Wrap async state updates in `act()` in CreatePurchaseRequestModal tests.
