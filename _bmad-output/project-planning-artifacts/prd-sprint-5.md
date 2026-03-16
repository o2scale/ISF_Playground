---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation-skipped
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
  - step-12-complete
status: complete
completedAt: '2026-03-16'
inputDocuments:
  - docs/Sprint 5 MPSD.md
  - docs/epics/sprint5/sprint5-shop-storefront.md
  - docs/epics/sprint5/sprint5-shop-management.md
  - docs/epics/sprint5/sprint5-coin-economy.md
  - docs/epics/sprint5/sprint5-reporting.md
  - docs/epics/sprint5/sprint5-epic-05-purchase-manager-workflow.md
  - _bmad-output/project-planning-artifacts/product-brief-ISF_Playground-2026-03-15.md
  - _bmad-output/sprint-reconciliation-report.md
  - _bmad-output/database-architecture.md
  - project-context.md
documentCounts:
  briefs: 1
  research: 0
  brainstorming: 0
  projectDocs: 9
classification:
  projectType: web_app
  domain: edtech
  complexity: medium
  projectContext: brownfield
workflowType: 'prd'
sprintScope: 'Sprint 5 — E-Commerce & Shop + Purchase Manager Workflow'
retroactive: true
implementationStatus: 'Complete (46 stories: 24/26 original shop + 20/20 PM extension + 2 partial)'
---

# Product Requirements Document - ISF_Playground

**Author:** Dev
**Date:** 2026-03-16
**Sprint:** 5 — E-Commerce & Shop + Purchase Manager Workflow (Retroactive)
**MPSD Reference:** `docs/Sprint 5 MPSD.md` (Version 1.0, August 19, 2025)

## Executive Summary

Sprint 5 closed the loop on ISF Playground's virtual economy by delivering the ISF Shop (student storefront, cart, checkout, order history) and extending it with a comprehensive Purchase Manager workflow (vendor management, purchase request lifecycle, inventory governance, operational dashboards). This sprint connected the coin economy (earn in LMS → spend in Shop) and added the procurement infrastructure (request → order → deliver → stock reconciliation) that ISF needs to manage supplies across Balagruhas.

**Two phases:**
1. **Original Sprint 5 (Shop):** 26 stories — product catalog, shopping cart (Zustand), checkout with atomic coin transactions, order history with 5-minute cancellation, admin product CRUD, inventory management, stock alerts, analytics dashboard, transaction reports with CSV export. **92% complete (24/26), quality score 97.25/100.**
2. **Sprint 5-PM (Purchase Manager extension, BMAD-driven):** 20 stories across 4 epics — vendor data model + CRUD, ShopItem schema refactor (approvedVendors, purchaseCategory), purchase request 4-step state machine (pending → ordered → delivered_store → delivered_balagruha), PM operational dashboard with tabs/filters/bunched view, coach dashboard, admin inventory report, stock reconciliation, navigation badge, shortened request IDs. **All 20 stories implemented.**

**Combined:** 46 stories, 34 fully implemented, 8 mostly done, 4 in backlog per sprint-status.yaml (stale — actually implemented per reconciliation).

## What Makes This Special

Sprint 5 completed the **closed-loop virtual economy** that makes ISF Playground unique among children's education platforms:

```
EARN (LMS/Sprint 2) → SPEND (Shop/Sprint 5) → MANAGE (PM/Sprint 5)
Quiz completion    →  Browse catalog        →  Request supplies
Coach grading      →  Add to cart           →  PM approves order
WTF participation  →  Checkout (coins)      →  Track delivery
                   →  5-min cancel + refund →  Stock reconciliation
```

No other platform combines LMS gamification with procurement workflow in a single system. The Purchase Manager extension added ISF's real operational need: managing physical supplies (medicines, stationery, repairs, consumables, infrastructure) alongside the digital reward economy.

## Project Classification

| Dimension | Value |
|-----------|-------|
| **Project Type** | Web Application (MERN stack SPA) |
| **Domain** | EdTech + E-Commerce + Procurement |
| **Complexity** | High (e-commerce with virtual currency + procurement state machine + multi-role dashboards) |
| **Project Context** | Brownfield — retroactive documentation, fully implemented |
| **Sprint Scope** | ISF Shop + Purchase Manager (46 stories across 2 phases) |
| **Sprint Status** | Complete (verified March 2026) |

## Success Criteria

### User Success

- **Student (Ravi)** can browse the shop catalog, add items to cart, checkout using ISF Coins, view order history, and cancel orders within 5 minutes for automatic coin refund.
- **Coach (Priya)** can create purchase requests for supplies (6 categories), track request status, manage deliveries to Balagruha, and view her requests dashboard.
- **Admin (Amit)** can manage products (CRUD with vendor assignment, images via S3), manage inventory (stock levels, adjustments, reconciliation), view analytics (revenue, categories, top products), and generate transaction reports with CSV export.
- **Purchase Manager (Suresh)** can review/approve/reject purchase requests, mark orders as ordered/delivered, manage vendors, view bunched/grouped views, filter by category/status/coach, and track pending tasks via navigation badge.

### Business Success

- **Virtual economy operational** — students spend earned coins in the shop, creating tangible motivation for learning
- **Procurement digitized** — 4-step lifecycle replaces informal paper-based supply requests
- **Inventory visible** — stock levels, low stock alerts, reconciliation tools give ISF leadership procurement visibility
- **Multi-category procurement** — 6 categories (ISF Shop, Medicines, Repairs, Consumables, Infra, Others) cover all operational supply needs

### Technical Success

| Metric | Target | Actual Status |
|--------|--------|---------------|
| Product catalog | Grid layout, filtering, search | Complete |
| Shopping cart | Multi-item, stock validation | Complete (Zustand store) |
| Checkout | Atomic coin deduction, order creation | Complete (MongoDB sessions) |
| Order cancellation | 5-minute window, automatic refund | Complete |
| Purchase request lifecycle | 4-step state machine | Complete (10-status machine) |
| Vendor management | CRUD with product linkage | Complete |
| Inventory management | Stock tracking, adjustments, audit trail | Complete |
| Analytics & reports | Dashboard, leaderboards, CSV export | Complete |
| Quality score | >90% | 97.25/100 |

## User Journeys

### Journey 1: Ravi — Shopping with ISF Coins

**Opening Scene:** Ravi has earned 150 ISF Coins through quiz completions and coach grading. He clicks the "ISF Shop" button on his dashboard.

**Rising Action:** Ravi browses the product catalog — stationery, small toys, treats. He filters by category and price range. He adds a notebook (30 coins) and a pen set (20 coins) to his cart. The cart shows his balance (150) minus cart total (50) = 100 remaining.

**Climax:** Ravi checks out. The system atomically deducts 50 coins from his balance, creates an order, and generates a digital receipt. His coin balance updates to 100 in the Title Bar.

**Resolution:** Two minutes later, Ravi realizes he wanted a different color. He opens "My Purchases", finds the order (within 5-minute window), and cancels. 50 coins refunded automatically. He reorders the correct items.

---

### Journey 2: Priya — Requesting Supplies for Her Balagruha

**Opening Scene:** Priya's Balagruha needs medical supplies and stationery. Previously she'd call the office informally. Now she opens the Purchase Request form.

**Rising Action:** Priya creates a purchase request: category "Medicines", selects items from the product list, sets priority "High", deadline next week, adds a justification note. She creates a second request for "Consumables" — stationery items. Both requests appear in her "My Requests" dashboard with status "pending".

**Climax:** Purchase Manager Suresh sees both requests in his dashboard (sorted by priority). He approves the high-priority medicine request, marks it "ordered" with supplier details. When items arrive at the ISF store, he marks "delivered to store". Priya then confirms "delivered to Balagruha" when she receives them.

**Resolution:** Stock levels update automatically at each step. The full procurement lifecycle is tracked with audit trail. Priya can see all her requests and their status at any time.

---

### Journey 3: Suresh — Managing Procurement Operations

**Opening Scene:** Suresh (Purchase Manager) opens his PM dashboard. The navigation badge shows 8 pending requests. His dashboard has category tabs (6 categories) and status buckets (Purchase Requests, On Going Order, Reached ISF Store, Delivered).

**Rising Action:** Suresh switches to "Bunched View" — items from multiple requests are grouped by product. He sees that 3 different coaches requested the same medicine across 3 Balagruhas. He uses "Order All" to batch these into a single order. He adds supplier name, invoice number, and marks ordered.

**Climax:** Items arrive. Suresh switches to "Reached ISF Store" tab, marks items as delivered to store. For repair items, he enters the repair technician name. He runs the stock reconciliation tool — adjusting stock levels where physical count differs from system count.

**Resolution:** Admin Amit opens the Master Inventory Report — sees "In Store" vs "Deployed" stock across all Balagruhas. Low stock alerts flag items needing reorder. The procurement system runs without paper.

---

### Journey Requirements Summary

| Journey | Primary Capability | Status |
|---------|-------------------|--------|
| Student Shopping | Catalog, cart, checkout, orders, cancellation | Complete |
| Coach Procurement | Purchase requests, status tracking, deliveries | Complete |
| PM Operations | Dashboards, approvals, ordering, reconciliation | Complete |

## Functional Requirements

### ISF Shop — Student Experience

- **FR1:** Student can access ISF Shop from main navigation
- **FR2:** Student can browse product catalog in grid layout with product images, names, and ISF Coin prices
- **FR3:** Student can filter products by category and sort by price
- **FR4:** Student can view detailed product page with description, images, and stock availability
- **FR5:** Student can add products to shopping cart with quantity selection
- **FR6:** System validates stock availability before adding to cart
- **FR7:** Student can view cart with item list, quantities, unit prices, and total in ISF Coins
- **FR8:** Student can modify cart (change quantity, remove items)
- **FR9:** Student can checkout — system atomically deducts coins and creates order (MongoDB session)
- **FR10:** System blocks checkout if coin balance is insufficient
- **FR11:** Student can view order history with order details, timeline, and digital receipt
- **FR12:** Student can cancel order within 5-minute window with automatic coin refund
- **FR13:** System automatically refunds coins on cancellation within window

### ISF Shop — Admin Product Management

- **FR14:** Admin can create products with name, description, category, price (coins), stock, images (S3 upload)
- **FR15:** Admin can edit and deactivate products
- **FR16:** Admin can assign up to 3 approved vendors per product (approvedVendors array)
- **FR17:** Admin can set maxPrice (rupees), sellingPrice (coins), and purchaseCategory per product
- **FR18:** System prevents duplicate product names via fuzzy matching
- **FR19:** Admin can upload product images to S3 with base64 support

### Inventory Management

- **FR20:** Admin can view inventory levels for all products (stock counts, low stock thresholds)
- **FR21:** System generates low stock and out-of-stock alerts based on configurable thresholds
- **FR22:** Admin can perform stock adjustments with reason codes and notes (InventoryTransaction)
- **FR23:** System maintains audit trail for all stock movements (purchases, sales, adjustments, returns, corrections)
- **FR24:** Admin can view Master Inventory Report showing "In Store" vs "Deployed" stock per Balagruha

### Vendor Management

- **FR25:** Admin can create vendors with name, phone (Indian format validation), address, active status
- **FR26:** Admin can view vendor list with search, pagination, and product count aggregation
- **FR27:** Admin can edit and deactivate vendors
- **FR28:** System links vendors to products via approvedVendors array (up to 3 per product)

### Purchase Request Workflow

- **FR29:** Staff (8 non-student roles) can create purchase requests with category, items, quantity, priority, deadline, justification, and file attachments
- **FR30:** System enforces 6 purchase categories: ISF Shop, Medicines, Repairs, Consumables, Infra, Others
- **FR31:** Purchase requests follow 4-step state machine: pending → ordered → delivered_store → delivered_balagruha
- **FR32:** PM can approve, reject, or complete purchase requests with notes
- **FR33:** PM can mark orders as ordered (with supplier name, invoice), delivered to store, delivered to Balagruha
- **FR34:** System updates inventory automatically on delivery completion
- **FR35:** Staff can track their purchase request status in "My Requests" view
- **FR36:** For Repairs category, system captures repair technician name
- **FR37:** Coach confirms "delivered to Balagruha" as final status step
- **FR38:** System generates shortened request IDs (PR-XXXXX format)

### Operational Dashboards

- **FR39:** PM can view operational dashboard with list view of all active requests sorted by priority
- **FR40:** PM can filter requests by category tabs (6 categories), status buckets, coach, and date range
- **FR41:** PM can toggle between List View and Bunched/Grouped View (items aggregated across requests)
- **FR42:** PM can use "Order All" to batch multiple requests for same item
- **FR43:** Coach can view "My Requests" + "Digital Orders" (student purchases) dashboard
- **FR44:** System displays pending task count as navigation badge for PM role

### Analytics & Reporting

- **FR45:** Admin can view analytics dashboard with revenue charts, category breakdown, top products
- **FR46:** Admin can view transaction reports with leaderboards, coin economy health indicators
- **FR47:** Admin can export transaction reports as CSV
- **FR48:** System tracks coin economy metrics: earn-to-spend ratio, coin velocity, shop conversion rate

### Cross-Cutting Features

- **FR49:** System supports Balagruha-independent purchases (STOCK option for central warehouse)
- **FR50:** System supports date range filtering across all dashboards
- **FR51:** System supports multi-role access to purchase requests (8 non-student roles)
- **FR52:** Coach can create purchase requests with inline product addition (CreatePendingProduct in request modal)

## Non-Functional Requirements

### Performance

- **NFR1:** Product catalog page loads within 2 seconds with pagination (20 items default)
- **NFR2:** Cart operations (add, remove, modify) respond within 500ms
- **NFR3:** Checkout transaction completes within 3 seconds (including coin deduction + order creation)
- **NFR4:** PM dashboard loads with filter application within 2 seconds

### Security

- **NFR5:** Checkout uses MongoDB sessions for atomic coin deduction — no double-spending
- **NFR6:** Student can only see and purchase from active products with stock > 0
- **NFR7:** Purchase request approval restricted to PM and Admin roles
- **NFR8:** Vendor management restricted to Admin role
- **NFR9:** S3 upload URLs are signed and time-limited

### Data Integrity

- **NFR10:** Every stock movement creates an InventoryTransaction record (audit trail)
- **NFR11:** Order cancellation refund is atomic — if refund fails, order remains active
- **NFR12:** Purchase request status transitions enforce state machine rules — invalid transitions rejected
- **NFR13:** Stock reconciliation requires reason codes for all adjustments

### Architecture

- **NFR14:** Shop routes: `/api/v2/shop/*` (products, cart, orders, admin, inventory, analytics, reports, purchase-requests, coach deliveries)
- **NFR15:** Vendor routes: `/api/v2/vendors/*`
- **NFR16:** Frontend uses Zustand store for cart state management
- **NFR17:** Standard API response format: `{ success, data, message }`

## Sprint 5 Models Created/Extended

| Model | File | Purpose | Sprint 5 Additions |
|-------|------|---------|-------------------|
| Vendor | `vendor.js` | NEW — Vendor entity | Full model (name, phone, address, active) |
| ShopItem | `shopItem.js` | EXTENDED — Products | approvedVendors[], maxPrice, sellingPrice, purchaseCategory, isPendingProduct |
| PurchaseRequest | `purchaseRequest.js` | NEW — Procurement workflow | Full model (4-step state machine, multi-item, statusHistory, thresholdAnalysis) |
| InventoryTransaction | `inventoryTransaction.js` | NEW — Stock audit trail | Full model (transactionType, quantity, previousStock, newStock, reference) |
| Cart | `cart.js` | NEW — Shopping cart | Full model |
| Order | `order.js` | NEW — Checkout orders | Full model (items, coinTotal, status, cancellation) |
| PurchaseOrders | `purchaseOrders.js` | Existing — Legacy purchase orders | |
| RepairRequests | `repairRequests.js` | Existing — Repair tracking | |

**Full schema details:** See `_bmad-output/database-architecture.md` — Shop/Procurement section (8 models).
