---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - "_bmad-output/sprint-5-purchase-manager/prd-purchase-manager-workflow.md"
  - "_bmad-output/architecture.md"
workflowType: 'epics-and-stories'
lastStep: 0
project_name: 'ISF_Playground'
user_name: 'Dev'
date: '2025-12-22'
---

# Epics and User Stories - ISF_Playground

## 1. Requirements Inventory

### Functional Requirements
*   **FR1:** Admins can create new "Master Items" in the global catalog.
*   **FR2:** Admins can assign up to 3 pre-approved vendors to a Master Item.
*   **FR2a:** Admins can set `sellingPrice` (Coins) separate from `maxPrice` (Rupees).
*   **FR3:** Admins can set a "Maximum Price Target" (Rupees) for each Master Item.
*   **FR4:** Admins can upload a reference image for each Master Item.
*   **FR5:** Admins can edit or deactivate Master Items to prevent further requests.
*   **FR6:** The system must prevent duplicate item creation based on fuzzy matching of names.
*   **FR7:** Admins can create new Vendor profiles with contact details (Name, Phone, Address).
*   **FR8:** Admins can update Vendor contact details, which automatically reflects in future views.
*   **FR9:** Admins can search and select existing Vendors when configuring a Master Item.
*   **FR10:** Authorized users (Coach, Medical, Sports, Music, Admin, PM) can view the catalog of active Master Items available to them.
*   **FR11:** Authorized users can create a "Purchase Request" for a specific quantity of a Master Item.
*   **FR12:** Purchase Managers can view a global list of all "Requested" items, sorted by "Priority Level".
*   **FR13:** Purchase Managers can transition a request status to "Order Placed" after confirming with a vendor.
*   **FR14:** Purchase Managers can transition a request status to "Delivered to Store" upon physical receipt.
*   **FR15:** Coaches/Requesters can transition a request status to "Delivered to Balagruha" upon final receipt.
*   **FR16:** Purchase Managers can flag a request as "Rejected" or "On Hold" with a mandatory reason note.
*   **FR17:** Admins can view a "Master Inventory" report showing stock levels (In Store vs. Deployed).
*   **FR18:** Purchase Managers can view an "Operational Dashboard" filtered by status and Priority Level.
*   **FR18a:** (NEW) Purchase Managers can toggle between "List View" and "Bunched View" where same items are grouped across all requests with total quantities.
*   **FR18b:** (NEW) In Bunched View, PM sees aggregated totals (e.g., "Paracetamol - 150 tablets from 5 requests") with expandable details.
*   **FR19:** Coaches can view a "My Requests" dashboard showing their requisitions AND "Digital Orders" placed by children in their Balagruha.
*   **FR20:** The system must restrict "New Item" and "New Vendor" actions to Admin users only.
*   **FR21:** Purchase Managers can access a "Stock Reconciliation" tool to manually override physical stock counts.
*   **FR22:** All manual stock overrides must require a reason code and be logged.
*   **FR23:** (Smart Shortcut) If `PurchaseRequest` item has sufficient `ShopItem.stock`, PM can "Assign from Stock" to skip procurement steps.
*   **FR24:** System calculates "Performance Score" for Purchase Managers based on completed requests.
*   **FR25:** (NEW) Staff must select a Purchase Category before viewing items (Medicines, ISF Shop, Repairs, Infra, Consumables, Others).
*   **FR26:** (NEW) Item dropdown is filtered by selected category to reduce list size.
*   **FR27:** (NEW) Multiple category requests require separate purchase request submissions.
*   **FR28:** (NEW) Category badges are displayed on PM dashboard for quick visual identification.
*   **FR29:** (NEW) Purchase requests must include a Priority Level (High/Medium/Low).

### Non-Functional Requirements
*   **NFR1:** Dashboard data tables must load in under 500ms.
*   **NFR2:** Search latency for items/vendors must be under 200ms.
*   **NFR3:** Optimistic UI updates for state transitions.
*   **NFR4:** Strict RBAC enforcement at API endpoint level.
*   **NFR5:** Audit logging for all critical actions (Creation, Status Change).
*   **NFR6:** Network resilience detection (Online-only enforcement).
*   **NFR7:** Transactional data consistency for stock updates.

### Additional Requirements
*   **AR1:** Backend: Refactor `ShopItem` to include `approvedVendors` and `maxPrice`.
*   **AR2:** Backend: Create `Vendor` model and CRUD controller.
*   **AR3:** Backend: Update `PurchaseRequest` state machine logic in controller.
*   **AR4:** Frontend: Implement Admin components in `src/components/admin/inventory/`.
*   **AR5:** Frontend: Implement PM components in `src/components/purchase-manager/`.
*   **AR6:** Data: Migration script for existing legacy items.

### FR Coverage Map

*   **FR1-FR9, FR20:** Epic 1 (Inventory Governance & Vendor Management)

*   **FR10, FR11, FR13-FR16, FR23, FR25-FR27, FR29:** Epic 2 (Purchase Request Workflow Engine)

*   **FR12, FR17-FR19, FR18a, FR18b, FR24, FR28:** Epic 3 (Operational Dashboards & Analytics)

*   **FR21-FR22:** Epic 4 (Inventory Control & Audit)



## Epic List



### Epic 1: Inventory Governance & Vendor Management

**Goal:** Empower Admins to establish a clean, controlled master catalog with vetted vendors, preventing bad data from entering the system.

**FRs covered:** FR1, FR2, FR2a, FR3, FR4, FR5, FR6, FR7, FR8, FR9, FR20



### Epic 2: Purchase Request Workflow Engine

**Goal:** Enable a transparent, role-based 4-step procurement lifecycle that tracks every item from request to final handoff.

**FRs covered:** FR10, FR11, FR13, FR14, FR15, FR16, FR23



### Epic 3: Operational Dashboards & Analytics

**Goal:** Provide specialized views for Admins, PMs, and Coaches to track priorities, status, and performance metrics.

**FRs covered:** FR12, FR17, FR18, FR19, FR24



### Epic 4: Inventory Control & Audit

**Goal:** Allow Purchase Managers to reconcile physical stock with digital records, ensuring system accuracy.

## Epic 1: Inventory Governance & Vendor Management
**Goal:** Empower Admins to establish a clean, controlled master catalog with vetted vendors, preventing bad data from entering the system.
**FRs covered:** FR1, FR2, FR2a, FR3, FR4, FR5, FR6, FR7, FR8, FR9, FR20

### Story 1.1: Vendor Data Model & Management API
As an Admin,
I want to create and manage a centralized list of Vendors,
So that purchase managers have a reliable, vetted list of suppliers to contact.

**Acceptance Criteria:**
**Given** I am an authenticated Admin
**When** I access the Vendor Management API
**Then** I can Create, Read, and Update vendor records (Name, Phone, Address, Active Status)
**And** Non-admin users receive a 403 Forbidden error

### Story 1.2: ShopItem Schema Refactor & Governance
As an Admin,
I want to define Master Items with price caps and approved vendors,
So that the organization adheres to budget and quality standards.

**Acceptance Criteria:**
**Given** I am an authenticated Admin
**When** I create a new Shop Item
**Then** I must be able to select up to 3 vendors from the Vendor list
**And** I must set a "Maximum Price Target" (Rupees) and "Selling Price" (Coins)
**And** The system blocks creation if these fields are missing
**And** The `createPendingProduct` endpoint is disabled for non-Admins

### Story 1.3: Admin "New Item" UI Implementation
As an Admin,
I want a specific UI form for introducing new items,
So that I can easily enforce the strict data requirements.

**Acceptance Criteria:**
**Given** I am on the Admin Inventory Dashboard
**When** I click "Add New Master Item"
**Then** I see a form matching the design (Type, Category, Desc, 3 Vendor Slots, Max Price, Media)
**And** The Vendor slots are dropdowns populated from the Vendor API
## Epic 2: Purchase Request Workflow Engine
**Goal:** Enable a transparent, role-based 4-step procurement lifecycle that tracks every item from request to final handoff.
**FRs covered:** FR10, FR11, FR13, FR14, FR15, FR16, FR23, FR25-FR27, FR29

### Story 2.1: Purchase Request Schema & State Machine
As a Developer,
I want to update the Purchase Request data model and controller,
So that it supports the strict 4-step lifecycle and "In-Stock" shortcuts.

**Acceptance Criteria:**
**Given** A Purchase Request is created
**When** A user attempts to change status
**Then** The system validates their role:
  - `pending` -> `ordered`: PM only
  - `ordered` -> `delivered_store`: PM only
  - `delivered_store` -> `delivered_balagruha`: Coach/Requester only
**And** If the shortcut "Assign from Stock" is used, status jumps to `delivered_store` and stock is decremented

### Story 2.2: Staff Purchase Request UI
As a Staff Member (Coach, Medical, etc.),
I want to request items from the Master Catalog,
So that I can get the supplies I need for my department/balagruha.

**Acceptance Criteria:**
**Given** I am a logged-in Staff member
**When** I view the Catalog
**Then** I can select an item and enter a quantity
**And** I cannot enter a custom item name (must pick from catalog)
**And** My request is created with status `pending`

### Story 2.3: Purchase Manager Fulfillment Actions
As a Purchase Manager,
I want to process pending requests,
So that items are ordered and received into the store.

**Acceptance Criteria:**
**Given** I am viewing a pending request
**When** I click "Mark Ordered"
**Then** The status updates to `ordered`
**When** I click "Mark Received at Store"
**Then** The status updates to `delivered_store`

### Story 2.4: Request Priority & Deadline (NEW - Client Correction)
As a Staff member creating a purchase request,
I want to set a priority level (High/Medium/Low) and deadline,
So that the Purchase Manager can prioritize and fulfill on time.

**Acceptance Criteria:**
**Given** I am creating a purchase request
**When** I fill the form
**Then** I must select a **Priority Level** (High, Medium, Low - default: Medium)
**And** I must provide a **Deadline** (date) for the request
**And** PM dashboard shows requests sorted by priority (High first)
**And** Priority is displayed as colored badge (Red=High, Yellow=Medium, Green=Low)

**File:** `_bmad-output/sprint-5-purchase-manager/2-4-request-priority-deadline.md`

### Story 2.5: Six Purchase Categories (NEW - Client Correction)
As a requester (Coach/Medical/etc.),
I want to choose a purchase category before selecting items,
So that I don't have to scroll through a massive combined item list.

**Acceptance Criteria:**
**Given** I am creating a purchase request
**When** I open the category dropdown
**Then** I see exactly 6 options: ISF Shop, Medicines, Repairs, Consumables, Infra, Others
**And** Item dropdown is filtered to only show items from selected category
**And** I must create separate requests if I need items from multiple categories

**File:** `_bmad-output/sprint-5-purchase-manager/2-5-six-purchase-categories-enhanced.md`
## Epic 3: Operational Dashboards & Analytics
**Goal:** Provide specialized views for Admins, PMs, and Coaches to track priorities, status, and performance metrics.
**FRs covered:** FR12, FR17, FR18, FR18a, FR18b, FR19, FR24, FR28

### Story 3.1: Purchase Manager Operational Dashboard
As a Purchase Manager,
I want a dashboard of all active requests sorted by priority,
So that I know exactly what to order next.

**Acceptance Criteria:**
**Given** I am a Purchase Manager
**When** I view my dashboard
**Then** I see a table of requests filtered by status (Pending, Ordered)
**And** High priority requests are visually highlighted at the top
**And** I can see a "Scorecard" widget showing my completed tasks count

### Story 3.2: Coach "My Requests" & Child Orders View
As a Coach,
I want to see my own requests and what my students are buying,
So that I have a complete picture of incoming supplies.

**Acceptance Criteria:**
**Given** I am a Coach assigned to a Balagruha
**When** I view my dashboard
**Then** I see a list of "My Purchase Requests" with their current status
**And** I see a separate list of "Digital Orders" placed by children in my Balagruha
**And** I can filter by "Pending Delivery" to know what to pick up

### Story 3.3: Admin Master Inventory Report
As an Admin,
I want to see a holistic view of inventory across the organization,
So that I can spot shortages or anomalies.

**Acceptance Criteria:**
**Given** I am an Admin
**When** I view the Inventory Report
**Then** I see "In Store" stock vs "Deployed" stock (calculated from delivery history)

### Story 3.4: PM Category Tabs & Status Buckets (NEW - Client Correction)
As a Purchase Manager,
I want to switch between purchase categories and workflow buckets using tabs,
So that I can see pending work quickly with minimal filters.

**Acceptance Criteria:**
**Given** I am on the Purchase Manager dashboard
**When** I select a category tab (ISF Shop / Medicines / Repairs / Consumables / Infra / Others)
**Then** The list is filtered to that category
**When** I select a status bucket tab (Purchase Requests / On Going Order / Reached ISF Store / Delivered)
**Then** I see only requests in that status bucket

**File:** `_bmad-output/sprint-5-purchase-manager/3-4-pm-tabs-and-buckets.md`

### Story 3.5: PM Bunched/Grouped View (NEW - Client Correction)
As a Purchase Manager,
I want to see the same items bunched together across all pending requests,
So that I can quickly know the total quantity needed and make bulk orders efficiently.

**Acceptance Criteria:**
**Given** I am a Purchase Manager on the dashboard
**When** I toggle to "Bunched View"
**Then** I see items grouped with total quantities (e.g., "Paracetamol - 150 tablets from 5 requests")
**And** I can expand each group to see individual requests with requester details
**And** The highest priority among grouped requests is displayed
**And** I can "Order All" to mark all requests for an item as ordered at once

**File:** `_bmad-output/sprint-5-purchase-manager/3-5-pm-bunched-view.md`

### Story 3.6: Additional PM Dashboard Status Tabs (NEW - Client Correction Jan 2026)
As a Purchase Manager,
I want additional status tabs beyond the 4 workflow statuses (Present Stock, Supplier List, Most Consumed),
So that I can quickly access inventory insights and vendor information without navigating away.

**Acceptance Criteria:**
**Given** I am a Purchase Manager on the dashboard
**When** I click the "Present Stock" tab
**Then** I see a list of all products with their current stock levels
**When** I click the "Supplier List" tab
**Then** I see a list of all approved vendors with product counts
**When** I click the "Most Consumed" tab
**Then** I see a ranked list of products by consumption frequency

**File:** `_bmad-output/sprint-5-purchase-manager/3-6-additional-status-tabs.md`

### Story 3.7: Shorten Request ID to 5 Digits (NEW - Client Correction Jan 2026)
As a user viewing purchase requests,
I want to see a short, human-readable Request ID (5 digits),
So that I can easily reference and communicate about specific requests.

**Acceptance Criteria:**
**Given** a new purchase request is created
**When** it is saved to the database
**Then** a unique 5-digit shortId is generated (e.g., PR-00001)
**And** the short ID is displayed everywhere instead of MongoDB ObjectId

**File:** `_bmad-output/sprint-5-purchase-manager/3-7-shorten-request-id.md`

### Story 3.8: Add Coach Filter to PM Dashboard (NEW - Client Correction Jan 2026)
As a Purchase Manager,
I want to filter purchase requests by the requesting Coach,
So that I can see all requests from a specific coach at a glance.

**Acceptance Criteria:**
**Given** I am a Purchase Manager on the dashboard
**When** I look at the filter row
**Then** I see a "Coach" dropdown filter listing all coaches who have created requests
**And** filtering by coach shows only their requests

**File:** `_bmad-output/sprint-5-purchase-manager/3-8-coach-filter.md`

### Story 3.9: PM Navigation Pending Badge (NEW - Client Correction Jan 2026)
As a Purchase Manager,
I want to see a badge in my navigation showing the number of pending tasks,
So that I can quickly know how much work is waiting without opening the dashboard.

**Acceptance Criteria:**
**Given** I am logged in as a Purchase Manager
**When** I view the sidebar/navigation
**Then** I see a badge next to the PM menu item showing pending task count
**And** the badge is red/orange and clearly visible

**File:** `_bmad-output/sprint-5-purchase-manager/3-9-pm-navigation-badge.md`

### Story 3.10: Column Reorder & UI Cleanup (NEW - Client Correction Jan 2026)
As a Purchase Manager,
I want the table columns in a logical order and old dashboard elements removed,
So that the interface is clean and information is easy to scan.

**Acceptance Criteria:**
**Given** I am viewing the purchase requests table
**When** I look at the columns
**Then** Date of Request is in position 2 (after ID, not at end)
**And** "Tasks" label is removed
**And** Old stat cards (Active repairs, Pending orders, etc.) are removed

**File:** `_bmad-output/sprint-5-purchase-manager/3-10-column-reorder-cleanup.md`

## Epic 2 Additions

### Story 2.6: Repair Technician & Delivered By Coach Tracking (NEW - Client Correction Jan 2026)
As an organization,
We want to track the Repair Technician name for repair items AND which Coach delivered items to Balagruha,
So that we have accountability and can reference this information if anything goes wrong.

**Acceptance Criteria:**
**Given** a purchase request is in the "Repairs" category
**When** the PM marks it as "Delivered to Store"
**Then** the PM must enter the Repair Technician Name
**Given** a Coach marks request as "Delivered to Balagruha"
**Then** the system automatically captures which Coach made the delivery

**File:** `_bmad-output/sprint-5-purchase-manager/2-6-repair-technician-tracking.md`

## Epic 4: Inventory Control & Audit
**Goal:** Allow Purchase Managers to reconcile physical stock with digital records, ensuring system accuracy.
**FRs covered:** FR21, FR22

### Story 4.1: Stock Reconciliation Tool
As a Purchase Manager,
I want to manually adjust the system stock count to match my physical count,
So that the inventory data remains accurate for planning.

**Acceptance Criteria:**
**Given** I am a Purchase Manager using the Audit Tool
**When** I enter a new stock count for an item
**Then** I must select a "Reason Code" (e.g., Audit Correction, Damage)
**And** The system updates the `ShopItem` stock
**And** An `InventoryTransaction` record is created with type `adjustment` logging the change
