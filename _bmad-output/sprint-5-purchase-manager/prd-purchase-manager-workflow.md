---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
inputDocuments:
  - "_bmad-output/index.md"
  - "_bmad-output/docs/project-overview.md"
  - "_bmad-output/docs/integration-architecture.md"
  - "_bmad-output/docs/source-tree-analysis.md"
  - "_bmad-output/docs/development-guide.md"
  - "_bmad-output/docs/architecture-backend.md"
  - "_bmad-output/docs/api-contracts-backend.md"
  - "_bmad-output/docs/data-models-backend.md"
  - "_bmad-output/docs/architecture-frontend.md"
  - "_bmad-output/docs/component-inventory-frontend.md"
  - "backend/BACKEND_DOCUMENTATION.md"
  - "README.md"
documentCounts:
  briefs: 0
  research: 0
  brainstorming: 0
  projectDocs: 12
workflowType: 'prd'
lastStep: 0
project_name: 'ISF_Playground'
user_name: 'Dev'
date: '2025-12-22'
---

# Product Requirements Document - ISF_Playground

**Author:** Dev
## Executive Summary

This PRD defines the **Purchase Manager Workflow Enhancement** for the ISF Playground. The goal is to formalize and digitize the procurement process, ensuring strict control over inventory data and clear accountability for every purchase.

The system currently supports a 3-step process. This enhancement expands it to a **4-step lifecycle**:
1.  **Purchase Request:** Raised by Coaches (selecting from an approved catalog).
2.  **Order Placed:** Executed by the Purchase Manager.
3.  **Delivered to Store:** Confirmed by the Purchase Manager upon receipt from Vendor.
4.  **Delivered to Balagruha:** Confirmed by the Coach upon receipt from the Store.

### What Makes This Special

*   **Strict Master Data Control:** Unlike typical systems where users can create items on the fly, this system strictly enforces that **ONLY Admins** can introduce new items.
*   **Integrated Vendor & Price Controls:** The "New Purchase Item" form (Admin only) requires defining:
    *   **3 Approved Vendors:** Admin pre-selects up to 3 suppliers with contact details at the item creation stage.
    *   **Price Target:** A "Maximum Price Target" is set upfront to guide Purchase Managers.
*   **Granular Accountability:** The split of "Delivery" into "Delivered to Store" and "Delivered to Balagruha" solves the specific problem of tracking items that have arrived at the facility but haven't yet reached the end beneficiary.
*   **Role-Specific Views:**
    *   **Admins/Purchase Managers:** Global view of all requests and statuses.
    *   **Coaches:** Focused view of *their* requests and available stock.

## Project Classification

**Technical Type:** web_app (Feature Module)
**Domain:** general (Procurement/Inventory)
**Complexity:** medium
**Project Context:** Brownfield - extending existing Shop/Inventory system

**Key Technical Constraints:**
*   **New Item UI:** Must match the provided design but backed by structured data (Type, Category, Description, Max Price, Media).
*   **Vendor Architecture:** Implement a relational `Vendor` model (not free text). The "New Item" form's vendor slots must function as "Select Existing or Create New" to ensure data consistency (e.g., updating a vendor's phone number updates it globally).
*   **Data Model:** `ShopItem` extends to store `approvedVendors` (references) and `maxPrice`.

## Success Criteria

### User Success

*   **Admins:** Successfully maintain a clean master catalog with zero duplicate or junk items, ensuring high data quality.
*   **Coaches:** Gain full transparency into their request status AND digital orders placed by children in their Balagruhas.
*   **Purchase Managers:** Track the flow of info and material with clear Priority Levels, and have authority to reconcile physical vs. digital stock.

### Business Success

*   **Inventory Accuracy:** Achieve near 100% alignment between system records and physical stock through granular 4-step tracking and manual reconciliation authority.
*   **Accountability:** Eliminate ambiguity in asset custody; every item is explicitly owned by a specific role at every stage.
*   **Operational Efficiency:** PM can edit physical stock counts to match reality during audits (essential for Go-Live).

### Technical Success

*   **Data Integrity:** Maintain strict referential integrity between `ShopItem`, `Vendor`, and `PurchaseRequest` collections.
*   **Role Enforcement:** Zero incidents of unauthorized item creation.
*   **System Performance:** Dashboards render instantly (<200ms) for all roles.

### Measurable Outcomes

*   **Catalog Hygiene:** 0% duplicate SKUs.
*   **Request Resolution:** 100% of purchase requests have a definitive terminal status.
*   **Adoption:** 100% of procurement activities flow through the system.

## Product Scope

### Core Procurement & Inventory System

*   **Admin Master Catalog:**
    *   "New Item" introduction UI (strict Admin-only access).
    *   Centralized Vendor/Supplier Management (CRUD) - Admin-only.
*   **Six Purchase Categories:**
    *   Items are organized into **6 distinct categories** to reduce list clutter:
        1. **Medicines** - All medical supplies and pharmaceuticals
        2. **ISF Shop** - Items for the student rewards shop
        3. **Repair** - Maintenance and repair materials
        4. **Infra** - Infrastructure and facility items
        5. **Consumables** - Daily-use items (hair oil, vaseline, socks, etc.)
        6. **Other** - Miscellaneous items
    *   When a coach selects a category, only items from that category appear in the dropdown.
    *   If a coach needs items from multiple categories, they create separate requests per category.
*   **Workflow Engine (4-Step Accountability Lifecycle):**
    *   **Requester:** Expanded to include Coaches, Medical, Sports, Music, Admin, and PM (Excludes Children/Balagruha-in-charge).
    *   **Step 1: Purchase Request:** Initiated by any authorized requester.
    *   **Step 2: Order Placed:** Transaction recorded by PM.
    *   **Step 3: Delivered to Store:** Logged by PM upon receipt.
    *   **Step 4: Delivered to Balagruha/Child:** Confirmed by Coach upon actual handover.
*   **Request Priority & Deadline:**
    *   Every purchase request has a **Priority Level**: High, Medium, or Low.
    *   PM dashboard displays requests sorted by priority first.
    *   High priority items are visually highlighted (red badge).
*   **Role-Based Dashboards:**
    *   **Admin & PM:** Full visibility, plus "Priority Level" tracking for purchases.
    *   **Coaches:** Visibility into their requests, available stock, AND orders placed by children in their Balagruha.
*   **PM Bunched/Grouped View:**
    *   **Critical Feature:** When PM views pending requests, same items across ALL requests are **bunched together**.
    *   Example: If 5 coaches request Paracetamol, PM sees "Paracetamol - Total: 150 tablets" with expandable details per requester.
    *   This eliminates manual counting across filters and enables bulk ordering.
    *   Grouping is available as a toggle view (List View vs. Bunched View).
*   **Inventory Control:**
    *   **Stock Reconciliation:** PM authority to manually edit stock counts to match physical reality (Audit Tool).

## User Journeys

### Journey 1: Admin Sandhya - The Introduction of "Winter Socks"
It's December, and for the first time, ISF needs to purchase heavy winter socks for the children. Sandhya opens the **"New Purchase Item"** form. She knows Tony (Coach) will try to add them himself if she doesn't. She carefully enters "Socks" in the Type, "Consumables" in Category, and adds a detailed description: "Winter Socks with thick base, Anti Slip." 

She then adds three pre-approved vendors she's vetted, along with their phone numbers, and sets a "Maximum Price Target" of 100 coins per pair. She uploads a reference image. Once she clicks **"Create Purchase Item"**, the item is now "unlocked" for the entire organization to request.

### Journey 2: Coach Tony - The Cold Feet Request
Tony is at his Balagruha and notices several children need new socks for the upcoming cold snap. He logs into his dashboard and sees a new item: "Winter Socks". He doesn't have to type anything—no spelling errors possible. He simply selects the item, enters the quantity needed for his specific Balagruha, and hits **"Request"**. 

Later, he checks his dashboard. The status has moved from `Requested` to `Order Placed`. He knows Mani (PM) has seen it and taken action.

### Journey 3: Purchase Manager Mani - The Fulfillment Cycle
Mani sees Tony's request for socks. He notices it is marked **"High Priority"**. 

**Scenario A: Item In Stock (Shortcut)**
Mani checks the inventory. "Winter Socks" are available in the "General Stock". He clicks **"Assign from Stock"**. The system instantly updates the status to **"Delivered to Store"** (skipping "Ordered"), notifying Tony that the items are ready for pickup.

**Scenario B: Procurement Needed**
If stock is zero, Mani sees the 3 approved vendors. He calls **all three** to compare terms. Vendor B offers the fastest delivery. He places the order with Vendor B and updates status to **"Order Placed"**.

### Journey 4: The Final Handoff - Tony Receives the Goods
Tony gets a notification: "Your socks have arrived at the ISF Store." On his next visit to the main facility, he picks up the bundle from Mani. Once he gets back to the Balagruha and physically hands them to the children, he opens the app and marks the request as **"Delivered to Balagruha"**. 

The lifecycle is complete. Mani earns points on his **"Performance Scorecard"** for the successful fulfillment.

### Journey 5: Stock Audit - Mani Reconciles Reality
It's the end of the quarter. Mani counts the physical stock of "Notebooks" and finds 150, but the system says 148. Using his special **"Stock Reconciliation"** tool, he updates the system count to 150, adding a note: "Found 2 extra notebooks in back shelf during Q1 Audit." The system logs this adjustment for Admin review.

### Journey Requirements Summary

These journeys reveal critical capabilities:
*   **Expanded Access:** Request capability for all staff roles (not just Coaches).
*   **Smart Workflow:** "In-Stock" logic must auto-skip procurement steps.
*   **Priority Tracking:** PM dashboard must highlight high-priority requests.
*   **Performance Metrics:** System must track PM efficiency (Scorecard).
*   **Child Order Visibility:** Coaches need to see what their kids are buying digitally.
*   **Audit Tool:** PM needs a specific UI to override stock counts with reason codes.

## Innovation Focus

### The "Strict Introduction" Governance Model
Most inventory systems are designed for flexibility, allowing users to create items on the fly to unblock work. ISF_Playground inverts this paradigm to prioritize **Data Hygiene** over speed.
*   **The Innovation:** A "Zero-Trust" item creation policy where *only* Admins can introduce new entities (Items/Vendors).
*   **The Benefit:** Eliminates the "15 versions of 'Socks'" problem common in distributed teams, ensuring analytics and inventory counts are always accurate.

### Smart Logic & Accountability
We move beyond simple status tracking to intelligent workflow automation.
*   **The Innovation:** **"In-Stock Shortcuts"** automatically detect available inventory and bypass the procurement phase, streamlining the 4-step process into a 2-step "Pickup" flow when possible.
*   **Dual Currency Handling:** Explicitly manages "Procurement Cost" (Rupees) vs "Internal Price" (Coins), solving the disconnect between real-world budget and the gamified economy.

### Pre-Vetted Vendor Slots
Instead of free-text vendor details, the system enforces a "Pre-Approved" model.
*   **The Innovation:** The Admin defines the "Supply Chain" (3 vendors) at the moment of Item Creation.
*   **The Benefit:** Purchase Managers don't have to hunt for suppliers or guess who is approved. The path of least resistance is also the path of compliance.

## Web App Specific Requirements

### Project-Type Overview
This feature is built as a responsive Web Application module embedded within the existing Electron/React hybrid shell. It functions primarily as an internal B2B SaaS tool for organizational workflow management.

### Technical Architecture Considerations

*   **Platform Support:**
    *   **Primary:** Electron Desktop App (Windows/Mac) - "Online Only" mode.
    *   **Secondary:** Modern Web Browsers (Chrome/Edge) for potential future access, though MVP is optimized for the Desktop wrapper.
*   **Connectivity:**
    *   **Mode:** Online-Only.
    *   **Behavior:** System must detect network loss and block critical actions (e.g., "Request Item") with a clear "No Internet" warning to prevent data desync.
*   **Real-Time Updates:**
    *   Status changes (e.g., "Order Placed") should reflect near-instantly on dashboards using optimistic UI updates or polling (every 30-60s) to keep Admins and PMs aligned.

### Responsive Design Strategy
*   **Desktop First:** Admin and Purchase Manager views (tables, charts) are optimized for Desktop resolution (1280px+).
*   **Tablet/Laptop Compatible:** Coach views ("My Requests", "Catalog") must be usable on smaller laptop screens or tablets (1024px) often used in Balagruhas.

### Access Control (RBAC) Matrix

| Role | New Item | Vendor Mgmt | Request Item | Place Order | Mark In-Store | Mark Delivered |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Admin** | ✅ | ✅ | ❌ | 👁️ | 👁️ | 👁️ |
| **Purchase Manager** | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ |
| **Coach** | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ |

*   *Key: ✅ = Create/Edit, 👁️ = View Only, ❌ = No Access*

### Implementation Considerations

## Functional Requirements (Refactoring Focus)

### Data Model Enhancements
*   **FR1:** Create new `Vendor` model (Name, Phone, Address).
*   **FR2:** Update `ShopItem` schema to include `approvedVendors` (array of Vendor refs) and `maxPrice` (in Rupees).
*   **FR2a:** Add `sellingPrice` (in Coins) to `ShopItem` to separate internal economy from procurement cost.
*   **FR3:** Update `PurchaseRequest` schema status enum to include `delivered_to_store` and `delivered_to_balagruha`.
*   **FR3a:** Add `purchaseCategory` enum to `ShopItem`: `medicines`, `isf_shop`, `repair`, `infra`, `consumables`, `other`.
*   **FR3b:** Add `priority` field to `PurchaseRequest`: `high`, `medium`, `low` (default: `medium`).

### Admin Governance (Strict Mode)
*   **FR4:** **RESTRICT** `createPendingProduct` endpoint to Admin role only (disable for Coach/PM).
*   **FR5:** Update Admin "Create Product" UI to include Vendor selection (from new Vendor model) and Max Price field (Rupees).

### Workflow Logic Updates
*   **FR6:** Update `purchaseRequestController` to handle the new `delivered_to_store` transition (PM action).
*   **FR7:** Add endpoint for `delivered_to_balagruha` transition (Coach action).
*   **FR23 (Smart Shortcut):** If `PurchaseRequest` item has sufficient `ShopItem.stock`, allow PM to "Assign from Stock", automatically setting status to `delivered_to_store` and decrementing inventory.

### Purchase Request Workflow
*   **FR10:** Authorized users (Coach, Medical, Sports, Music, Admin, PM) can view the catalog of active Master Items available to them.
*   **FR11:** Authorized users can create a "Purchase Request" for a specific quantity of a Master Item.
*   **FR12:** Purchase Managers can view a global list of all "Requested" items, sorted by "Priority Level".
*   **FR13:** Purchase Managers can transition a request status to "Order Placed" after confirming with a vendor.
*   **FR14:** Purchase Managers can transition a request status to "Delivered to Store" upon physical receipt.
*   **FR15:** Coaches/Requesters can transition a request status to "Delivered to Balagruha" upon final receipt.
*   **FR16:** Purchase Managers can flag a request as "Rejected" or "On Hold" with a mandatory reason note.

### Role-Based Dashboards
*   **FR17:** Admins can view a "Master Inventory" report showing stock levels (In Store vs. Deployed).
*   **FR18:** Purchase Managers can view an "Operational Dashboard" filtered by status and Priority Level.
*   **FR18a:** Purchase Managers can toggle between "List View" and "Bunched View" where same items are grouped across all requests with total quantities.
*   **FR18b:** In Bunched View, PM sees aggregated totals (e.g., "Paracetamol - 150 tablets from 5 requests") with expandable details.
*   **FR19:** Coaches can view a "My Requests" dashboard showing their requisitions AND "Digital Orders" placed by children in their Balagruha.
*   **FR20:** The system must restrict "New Item" and "New Vendor" actions to Admin users only.
*   **FR24 (Scorecard):** System must calculate and display a "Performance Score" for Purchase Managers based on completed requests.

### Purchase Request Categories
*   **FR25:** Staff must select a Purchase Category before viewing items (Medicines, ISF Shop, Repair, Infra, Consumables, Other).
*   **FR26:** Item dropdown is filtered by selected category to reduce list size and prevent overwhelm.
*   **FR27:** Multiple category requests require separate purchase request submissions.
*   **FR28:** Category badges are displayed on PM dashboard for quick visual identification.

### Inventory Control
*   **FR21:** Purchase Managers can access a "Stock Reconciliation" tool to manually override physical stock counts.
*   **FR22:** All manual stock overrides must require a reason code (e.g., "Found in Audit", "Damaged") and be logged for Admin review.

## Project Scoping & Phased Development

### Execution Strategy
**Strategy:** One-Shot Delivery (Complete Feature Set)
**Rationale:** The "Purchase Manager Workflow" is a cohesive loop; partial implementation (e.g., leaving out the "Delivered to Balagruha" step) would defeat the primary goal of end-to-end accountability. Therefore, the entire scope defined in "Product Scope" is the MVP.

### Implementation Phases (Logical Sequence)

**Phase 1: Foundation (Data & Admin)**
*   **Vendor Model:** Create schema and CRUD.
*   **ShopItem Refactor:** Add `approvedVendors` and `maxPrice`.
*   **Admin UI:** Build the "New Item" form with vendor lookup/creation.

**Phase 2: Workflow Engine (State Machine)**
*   **Status Logic:** Implement the 4-step state transitions (`Requested` -> `Ordered` -> `InStore` -> `Delivered`).
*   **Purchase Request Model:** Update schema to support tracking of *who* performed each transition.

**Phase 3: User Dashboards (The Experience)**
*   **Coach View:** "My Requests" and "Catalog Search".
*   **PM View:** "Pending Orders" and "Incoming Deliveries".
*   **Inventory View:** "In Store" vs "Deployed" stock counts.

### Risk Mitigation Strategy

*   **Adoption Risk (Bottlenecking):**
    *   *Risk:* Coaches blocked because Admin hasn't added an item yet.
    *   *Mitigation:* SLA agreement that Admins must process "New Item Requests" (offline channel initially) within 24 hours.
*   **Data Migration Risk:**
    *   *Risk:* Existing `ShopItem` records lack vendor/price data.
    *   *Mitigation:* Create a migration script to set default/placeholder vendor data for legacy items so they don't break the new UI.