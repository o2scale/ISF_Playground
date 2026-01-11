# E2E Test Cases: Sprint 5 Purchase Manager Corrections

**Document Version:** 2.0 (Enhanced with Priority/Time/Risk Metadata)  
**Created:** January 5, 2026  
**Last Updated:** January 5, 2026 - Added P0/P1/P2/P3 priorities, time estimates, risk classification  
**Test Scope:** Stories 3.10, 3.8, 3.9, 3.6, 3.5, 2.6  
**Total Test Cases:** 44 tests (8 P0, 15 P1, 18 P2, 3 P3)  
**Estimated Duration:** 
- **Full Suite:** 145-160 minutes (~2.5 hours)
- **P0 Critical Tests Only:** 45-50 minutes  
- **P0 + P1 Tests:** 100-110 minutes (~1.75 hours)  
**Prerequisites:** Backend server running, Frontend running, Test users configured

---

## Priority Distribution Summary

| Priority | Count | % of Total | Estimated Time | When to Run |
|----------|-------|------------|----------------|-------------|
| **P0 (Critical)** | 8 | 18% | 45-50 min | Every deploy - MUST PASS to ship |
| **P1 (High)** | 15 | 34% | 55-60 min | Every sprint release |
| **P2 (Medium)** | 18 | 41% | 40-45 min | Weekly regression |
| **P3 (Low)** | 3 | 7% | 5-7 min | As time allows |

**P0 Critical Tests** (Ship blockers):
- TC-2.6.1, TC-2.6.3, TC-2.6.8 (Repair technician validation - data integrity)
- TC-3.5.6 (Order All - core workflow)
- TC-3.9.3 (Badge updates - critical feedback)
- TC-INT-2 (Full delivery workflow)
- TC-REG-1, TC-REG-2 (Filter regression, role access)

---

## Risk Classification Summary

| Risk Level | Count | Description |
|------------|-------|-------------|
| 🟢 **Low** | 30 (68%) | Stable UI checks, no timing dependencies |
| 🟡 **Medium** | 13 (30%) | Data state, reactivity, filter combinations |
| 🔴 **High** | 1 (2%) | TC-2.6.8 (API testing, network timing) |

---

## Table of Contents

1. [Test Environment Setup](#test-environment-setup)
2. [Test Data Requirements](#test-data-requirements)
3. [Test Case 1: Story 3.10 - Column Reorder & UI Cleanup](#test-case-1-story-310---column-reorder--ui-cleanup)
4. [Test Case 2: Story 3.8 - Coach Filter](#test-case-2-story-38---coach-filter)
5. [Test Case 3: Story 3.9 - PM Navigation Badge](#test-case-3-story-39---pm-navigation-badge)
6. [Test Case 4: Story 3.6 - Additional Status Tabs](#test-case-4-story-36---additional-status-tabs)
7. [Test Case 5: Story 3.5 - Enhanced Bunched View](#test-case-5-story-35---enhanced-bunched-view)
8. [Test Case 6: Story 2.6 - Repair Technician & Delivery Tracking](#test-case-6-story-26---repair-technician--delivery-tracking)
9. [Cross-Story Integration Tests](#cross-story-integration-tests)
10. [Regression Tests](#regression-tests)

---

## Test Environment Setup

### URLs
- **Frontend:** `http://localhost:3000` (or production URL)
- **Backend API:** `http://localhost:5001` (or production URL)

### Test Users Required

| Role | Username/Email | Password | Balagruhas Assigned |
|------|---------------|----------|---------------------|
| Purchase Manager | `pm@isf.org` | `test123` | Multiple Balagruhas + STOCK |
| Coach | `coach@isf.org` | `test123` | At least 1 Balagruha |
| Admin | `admin@isf.org` | `test123` | All access |
| Medical In Charge | `medical@isf.org` | `test123` | At least 1 Balagruha |

### Browser Requirements
- Chrome (latest) or Firefox (latest)
- Screen resolution: 1920x1080 recommended
- DevTools Network tab accessible for API verification

---

## Test Data Requirements

### Pre-requisite: Create Test Purchase Requests

Before running these tests, ensure the following test data exists:

#### Required Purchase Requests (create if not present):

1. **5 PENDING requests** with category "ISF Shop"
   - At least 2 from Coach user
   - At least 2 from Medical In Charge user
   - At least 1 with HIGH priority
   - Include same product across multiple requests (e.g., "Paracetamol 500mg")

2. **3 ORDERED requests** with mixed categories
   - 1 with category "Repairs" (IMPORTANT for Story 2.6)
   - 1 with category "Medicines"
   - 1 with category "ISF Shop"

3. **2 DELIVERED_STORE requests**
   - Ready for Coach to mark as delivered to Balagruha

4. **2 DELIVERED_BALAGRUHA (completed) requests**
   - Already fully delivered

5. **Products in inventory**
   - At least 3 products with stock > 10 (in_stock)
   - At least 2 products with stock 1-5 (low_stock)
   - At least 1 product with stock = 0 (out_of_stock)

6. **Vendors**
   - At least 3 vendors with products assigned

---

## Test Case 1: Story 3.10 - Column Reorder & UI Cleanup

### TC-3.10.1: Verify Header Title Change

**Objective:** Verify the PM dashboard header shows "Purchase Requests" instead of old title  
**Priority:** P2 (Medium) - UI polish, doesn't affect functionality  
**Estimated Time:** 1 minute  
**Flakiness Risk:** 🟢 Low - Simple text verification, no timing dependencies  

**Preconditions:**
- Logged in as Purchase Manager

**Steps:**
1. Navigate to Purchase Management section
2. Observe the main header/title of the dashboard

**Expected Results:**
- [ ] Header displays "📋 Purchase Requests" (not "🛒 Shop Inventory Purchase Requests")
- [ ] No emoji overload or redundant text

**Screenshot Required:** Yes - capture header area

---

### TC-3.10.2: Verify Column Order in Request Table

**Objective:** Verify table columns are in the correct order per client feedback  
**Priority:** P1 (High) - Affects usability and user workflow  
**Estimated Time:** 3 minutes  
**Flakiness Risk:** 🟢 Low - Stable UI check, no dynamic elements  

**Preconditions:**
- Logged in as Purchase Manager
- At least 1 purchase request exists
- View mode set to "List" view

**Steps:**
1. Navigate to Purchase Management
2. Ensure you're on a workflow tab (e.g., "Purchase Requests")
3. Ensure View Mode is "List" (not "Bunched")
4. Examine the table header columns from left to right

**Expected Results:**
- [ ] Column order is exactly: Request ID → Date → Products → Qty → Priority → Balagruha → Status → Actions
- [ ] Total columns: 8 (for PM view)
- [ ] No "Category" or "Reason" columns visible in main table
- [ ] Date column shows both date and "time ago" (e.g., "05/01/26" and "2 hours ago")

**Screenshot Required:** Yes - capture full table header

---

### TC-3.10.3: Verify PM Scorecard Label

**Objective:** Verify scorecard shows "Delivered to Store" instead of "Completed Tasks"  
**Priority:** P3 (Low) - Cosmetic label change, minimal impact  
**Estimated Time:** 1 minute  
**Flakiness Risk:** 🟢 Low - Simple label verification  

**Preconditions:**
- Logged in as Purchase Manager

**Steps:**
1. Navigate to Purchase Management
2. Look for the scorecard/stats card at the top of the dashboard

**Expected Results:**
- [ ] Scorecard label reads "Delivered to Store" (not "Completed Tasks")
- [ ] Count displays correctly based on requests PM has marked as delivered_store
- [ ] Card is visually prominent and easy to read

**Screenshot Required:** Yes - capture scorecard

---

### TC-3.10.4: Verify Date Column Sorting

**Objective:** Verify date column is sortable with visual indicators  
**Priority:** P1 (High) - Core table functionality for PM workflow  
**Estimated Time:** 4 minutes  
**Flakiness Risk:** 🟢 Low - Straightforward click and verify pattern  

**Steps:**
1. Navigate to Purchase Management as PM
2. Click on the "Date" column header
3. Observe sort indicator
4. Click again to toggle sort direction
5. Click a third time to remove sort

**Expected Results:**
- [ ] First click: Shows ▲ (ascending - oldest first)
- [ ] Second click: Shows ▼ (descending - newest first)
- [ ] Third click: Removes sort indicator
- [ ] Data actually reorders correctly with each click
- [ ] Cursor changes to pointer on hover over Date header

---

## Test Case 2: Story 3.8 - Coach Filter

### TC-3.8.1: Verify "Requested By" Filter Appears for PM

**Objective:** Verify the Coach/Requester filter dropdown is visible for Purchase Manager  
**Priority:** P2 (Medium) - Filter visibility check, core feature  
**Estimated Time:** 2 minutes  
**Flakiness Risk:** 🟢 Low - Static UI element check  

**Preconditions:**
- Logged in as Purchase Manager
- At least 2 different users have created purchase requests

**Steps:**
1. Navigate to Purchase Management
2. Look at the filter row/area
3. Find the "Requested By" dropdown

**Expected Results:**
- [ ] "Requested By:" label is visible
- [ ] Dropdown shows "All Requesters" as default option
- [ ] Dropdown lists all unique requesters who have made requests
- [ ] Requesters are sorted alphabetically by name

**Screenshot Required:** Yes - capture filter area with dropdown open

---

### TC-3.8.2: Verify Filter Functionality

**Objective:** Verify selecting a requester filters the results correctly  
**Priority:** P1 (High) - Core filter functionality for PM workflow  
**Estimated Time:** 5 minutes  
**Flakiness Risk:** 🟡 Medium - Depends on data state and filter reactivity  

**Preconditions:**
- At least 2 different users have created requests
- One user is "Coach User" with 2+ requests
- Another user is "Medical User" with 1+ request

**Steps:**
1. Note the total count of visible requests
2. Select "Coach User" from "Requested By" dropdown
3. Observe the filtered results
4. Select "Medical User" from dropdown
5. Observe the filtered results
6. Select "All Requesters" to reset

**Expected Results:**
- [ ] Selecting "Coach User" shows ONLY requests made by Coach User
- [ ] Request count updates to reflect filtered number
- [ ] Selecting "Medical User" shows ONLY requests made by Medical User
- [ ] Selecting "All Requesters" shows all requests again
- [ ] Filter works in combination with other filters (Balagruha, Priority, etc.)

---

### TC-3.8.3: Verify Filter Resets on Balagruha Change

**Objective:** Verify requester filter resets when Balagruha filter changes  
**Priority:** P2 (Medium) - Edge case for filter interaction  
**Estimated Time:** 3 minutes  
**Flakiness Risk:** 🟡 Medium - Multiple filter interactions, state dependencies  

**Steps:**
1. Select a specific Balagruha from Balagruha dropdown
2. Select a specific requester from "Requested By" dropdown
3. Change the Balagruha dropdown to a different value
4. Observe the "Requested By" dropdown

**Expected Results:**
- [ ] "Requested By" dropdown resets to "All Requesters"
- [ ] The requester list updates to show only requesters relevant to new Balagruha
- [ ] No stale data shown

---

### TC-3.8.4: Verify Filter NOT Visible for Non-PM Roles

**Objective:** Verify the requester filter is PM-only  
**Priority:** P2 (Medium) - Role-based access validation  
**Estimated Time:** 2 minutes  
**Flakiness Risk:** 🟢 Low - Simple role-based UI check  

**Steps:**
1. Log out
2. Log in as Coach
3. Navigate to Purchase Management
4. Look for "Requested By" filter

**Expected Results:**
- [ ] "Requested By" filter is NOT visible for Coach
- [ ] Coach only sees their own requests (no need for this filter)

---

## Test Case 3: Story 3.9 - PM Navigation Badge

### TC-3.9.1: Verify Badge Appears in Sidebar

**Objective:** Verify pending count badge shows in navigation for PM  
**Priority:** P1 (High) - Critical visual feedback mechanism for PM  
**Estimated Time:** 2 minutes  
**Flakiness Risk:** 🟡 Medium - Badge rendering depends on data query timing  

**Preconditions:**
- At least 1 purchase request in PENDING status
- Logged in as Purchase Manager

**Steps:**
1. Look at the left sidebar/navigation
2. Find "Purchase Management" menu item
3. Observe if there's a badge/counter

**Expected Results:**
- [ ] Red/colored badge appears next to "Purchase Management" menu item
- [ ] Badge shows the count of PENDING requests
- [ ] Badge is clearly visible and readable

**Screenshot Required:** Yes - capture sidebar with badge

---

### TC-3.9.2: Verify Badge Count Accuracy

**Objective:** Verify badge count matches actual pending requests  
**Priority:** P1 (High) - Data accuracy critical for PM decision-making  
**Estimated Time:** 3 minutes  
**Flakiness Risk:** 🟡 Medium - Count accuracy depends on data sync  

**Steps:**
1. Note the badge count in sidebar
2. Click on Purchase Management
3. Select "Purchase Requests" tab (pending status)
4. Count the total pending requests shown

**Expected Results:**
- [ ] Badge count matches the number of pending requests
- [ ] If 0 pending requests, badge either shows "0" or is hidden

---

### TC-3.9.3: Verify Badge Updates After Status Change

**Objective:** Verify badge count updates when requests are processed  
**Priority:** P0 (Critical) - Real-time updates are core to PM workflow  
**Estimated Time:** 4 minutes  
**Flakiness Risk:** 🟡 Medium - Reactivity timing, WebSocket/polling dependencies  

**Steps:**
1. Note current badge count (e.g., "5")
2. Navigate to Purchase Management
3. Mark one PENDING request as "Ordered"
4. Observe the sidebar badge

**Expected Results:**
- [ ] Badge count decrements by 1 (e.g., "5" → "4")
- [ ] Update happens without page refresh (or after returning to sidebar)

---

### TC-3.9.4: Verify Badge NOT Visible for Non-PM Roles

**Objective:** Verify the pending count badge is PM-specific  
**Priority:** P2 (Medium) - Role-based access validation  
**Estimated Time:** 2 minutes  
**Flakiness Risk:** 🟢 Low - Simple role-based UI check  

**Steps:**
1. Log out and log in as Coach
2. Look at sidebar navigation

**Expected Results:**
- [ ] No pending count badge visible for Coach role
- [ ] Badge is PM-specific feature

---

## Test Case 4: Story 3.6 - Additional Status Tabs

### TC-3.6.1: Verify All 7 Tabs Are Present

**Objective:** Verify PM sees all 7 tabs (4 workflow + 3 inventory/analytics)  
**Priority:** P2 (Medium) - Tab structure validation  
**Estimated Time:** 2 minutes  
**Flakiness Risk:** 🟢 Low - Static UI structure check  

**Preconditions:**
- Logged in as Purchase Manager

**Steps:**
1. Navigate to Purchase Management
2. Look at the status tabs row

**Expected Results:**
- [ ] 7 tabs visible in this order:
  1. "Purchase Requests" (pending - workflow)
  2. "On Going Order" (ordered - workflow)
  3. "Reached ISF Store" (delivered_store - workflow)
  4. "Delivered" (delivered_balagruha - workflow)
  5. "Present Stock" (inventory)
  6. "Supplier List" (inventory)
  7. "Most Consumed" (analytics)
- [ ] Active tab is highlighted
- [ ] Tabs are horizontally scrollable if needed on smaller screens

**Screenshot Required:** Yes - capture all tabs

---

### TC-3.6.2: Present Stock Tab - View and Data

**Objective:** Verify Present Stock tab shows inventory with stock status  
**Priority:** P1 (High) - Core inventory management feature  
**Estimated Time:** 5 minutes  
**Flakiness Risk:** 🟡 Medium - Data loading timing, stock level calculations  

**Steps:**
1. Click on "Present Stock" tab
2. Wait for data to load
3. Examine the table and summary

**Expected Results:**
- [ ] Header shows "📦 Present Stock"
- [ ] Summary bar shows counts: "✓ In Stock: X", "⚠ Low Stock: Y", "✗ Out of Stock: Z"
- [ ] Table columns: Product Name, SKU, Category, Current Stock, Min Stock Level, Status
- [ ] Status badges show correctly:
  - Green "In Stock" for stock > minStockLevel
  - Yellow/Orange "Low Stock" for 0 < stock <= minStockLevel
  - Red "Out of Stock" for stock = 0
- [ ] Products are listed (not empty)

**Screenshot Required:** Yes - capture full Present Stock view

---

### TC-3.6.3: Present Stock Tab - Loading State

**Objective:** Verify loading indicator while fetching stock data  
**Priority:** P3 (Low) - Cosmetic loading state  
**Estimated Time:** 2 minutes  
**Flakiness Risk:** 🟡 Medium - Timing-dependent, may load too fast to observe  

**Steps:**
1. Clear browser cache/hard refresh
2. Click on "Present Stock" tab
3. Observe loading state

**Expected Results:**
- [ ] Loading spinner appears with "Loading stock levels..." text
- [ ] Spinner disappears when data loads
- [ ] No flash of incorrect content

---

### TC-3.6.4: Supplier List Tab - View and Data

**Objective:** Verify Supplier List tab shows vendors with product counts  
**Priority:** P2 (Medium) - Supplier management feature  
**Estimated Time:** 4 minutes  
**Flakiness Risk:** 🟢 Low - Static data display  

**Steps:**
1. Click on "Supplier List" tab
2. Wait for data to load
3. Examine the table

**Expected Results:**
- [ ] Header shows "🏪 Supplier List"
- [ ] Summary shows "Total Vendors: X"
- [ ] Table columns: Vendor Name, Contact Person, Phone, Email, Products Supplied, Status
- [ ] "Products Supplied" shows count badge (e.g., "5 products")
- [ ] Status shows "Active" (green) or "Inactive" (gray)
- [ ] Vendors are listed (not empty if vendors exist)

**Screenshot Required:** Yes - capture Supplier List view

---

### TC-3.6.5: Most Consumed Tab - View and Period Filter

**Objective:** Verify Most Consumed tab shows ranked products with period filter  
**Priority:** P1 (High) - Analytics feature critical for procurement decisions  
**Estimated Time:** 6 minutes  
**Flakiness Risk:** 🟡 Medium - Data aggregation timing, filter reactivity  

**Steps:**
1. Click on "Most Consumed" tab
2. Wait for data to load
3. Examine the table and period dropdown
4. Change period filter to "This Month"
5. Observe data update

**Expected Results:**
- [ ] Header shows "📊 Most Consumed Products"
- [ ] Period dropdown with options: All Time, This Week, This Month, This Quarter, This Year
- [ ] Default period is "All Time"
- [ ] Table columns: Rank, Product Name, SKU, Total Quantity Requested, Number of Requests, Avg Qty per Request
- [ ] Rank column shows medals: Gold (#1), Silver (#2), Bronze (#3), Gray (4+)
- [ ] Changing period filter updates the data
- [ ] Products are ranked by total quantity (highest first)

**Screenshot Required:** Yes - capture Most Consumed view with period dropdown

---

### TC-3.6.6: Tab Switching - Content Changes Correctly

**Objective:** Verify switching between tabs shows correct content  
**Priority:** P2 (Medium) - Tab navigation validation  
**Estimated Time:** 5 minutes  
**Flakiness Risk:** 🟡 Medium - Multiple tab switches, content loading timing  

**Steps:**
1. Click "Purchase Requests" tab - verify request list shows
2. Click "Present Stock" tab - verify stock table shows
3. Click "Supplier List" tab - verify vendor table shows
4. Click "Most Consumed" tab - verify analytics table shows
5. Click back to "On Going Order" tab - verify ordered requests show

**Expected Results:**
- [ ] Each tab shows its unique content
- [ ] No content bleed between tabs
- [ ] View toggle (List/Bunched) only appears for workflow tabs
- [ ] Filters area adjusts appropriately per tab type

---

### TC-3.6.7: Non-Workflow Tabs - No Request Table

**Objective:** Verify inventory/analytics tabs don't show request table  
**Priority:** P2 (Medium) - UI isolation validation  
**Estimated Time:** 3 minutes  
**Flakiness Risk:** 🟢 Low - Simple content verification  

**Steps:**
1. Click "Present Stock" tab
2. Scroll down to check for request table
3. Repeat for "Supplier List" and "Most Consumed"

**Expected Results:**
- [ ] Request table (with Request ID, Products, etc.) is NOT visible
- [ ] Stats footer is NOT visible
- [ ] Only the tab-specific content is shown

---

## Test Case 5: Story 3.5 - Enhanced Bunched View

### TC-3.5.1: Verify View Mode Toggle Exists

**Objective:** Verify List/Bunched toggle buttons are present  
**Priority:** P2 (Medium) - View toggle UI check  
**Estimated Time:** 2 minutes  
**Flakiness Risk:** 🟢 Low - Static UI element  

**Preconditions:**
- Logged in as Purchase Manager
- On a workflow tab (e.g., "Purchase Requests")

**Steps:**
1. Navigate to Purchase Management
2. Click on "Purchase Requests" tab
3. Look for view mode toggle buttons

**Expected Results:**
- [ ] Toggle buttons visible with "📋 List" and "📦 Bunched" options
- [ ] One button is highlighted (active state) - default is "List"
- [ ] Buttons are styled distinctly (active = purple/blue, inactive = gray)

**Screenshot Required:** Yes - capture toggle buttons

---

### TC-3.5.2: Verify Bunched View Display

**Objective:** Verify bunched view groups same items correctly  
**Priority:** P1 (High) - Core bunched view feature  
**Estimated Time:** 5 minutes  
**Flakiness Risk:** 🟡 Medium - Data grouping logic, state dependencies  

**Preconditions:**
- At least 2 pending requests contain the same product (e.g., "Paracetamol 500mg")

**Steps:**
1. Click "📦 Bunched" button to activate Bunched View
2. Observe the grouped display
3. Find the product that appears in multiple requests

**Expected Results:**
- [ ] View switches from table to card-based grouped view
- [ ] Items grouped by product within each status bucket
- [ ] Each card shows:
  - Product Name
  - SKU (if available)
  - Total Quantity (sum across all requests)
  - Number of Requests
  - Priority badge (if HIGH priority in any request)
  - Expand arrow (▼)
- [ ] Status bucket header shows status badge and item count

**Screenshot Required:** Yes - capture Bunched View

---

### TC-3.5.3: Verify Expandable Details

**Objective:** Verify clicking a bunched item expands to show individual requests  
**Priority:** P1 (High) - Core bunched view interaction  
**Estimated Time:** 4 minutes  
**Flakiness Risk:** 🟢 Low - Simple expand/collapse interaction  

**Steps:**
1. In Bunched View, click on a grouped item card
2. Observe the expansion
3. Click again to collapse

**Expected Results:**
- [ ] Card expands to show detailed table of individual requests
- [ ] Expanded section shows columns: Request ID, Requester, Balagruha, Qty, Priority, Date
- [ ] Each row represents one request containing that product
- [ ] Arrow rotates (▼ → ▲) when expanded
- [ ] Clicking again collapses the section
- [ ] Multiple items can be expanded simultaneously

**Screenshot Required:** Yes - capture expanded item

---

### TC-3.5.4: Verify Priority Aggregation

**Objective:** Verify highest priority is shown for bunched items  
**Priority:** P2 (Medium) - Priority visual indicator  
**Estimated Time:** 3 minutes  
**Flakiness Risk:** 🟢 Low - Data aggregation logic  

**Preconditions:**
- Create 2 requests for same product: one HIGH priority, one MEDIUM priority

**Steps:**
1. In Bunched View, find the product that has mixed priorities
2. Check the priority indicator on the bunched card

**Expected Results:**
- [ ] Card shows "HIGH PRIORITY" badge (red) because one of the requests is high priority
- [ ] Card may have red/pink background tint for high priority items
- [ ] Expanded details show individual request priorities

---

### TC-3.5.5: Verify "Order All" Button - Visibility

**Objective:** Verify Order All button appears only for PENDING status bucket  
**Priority:** P2 (Medium) - Button visibility validation  
**Estimated Time:** 3 minutes  
**Flakiness Risk:** 🟢 Low - Static UI check  

**Steps:**
1. In Bunched View, look at PENDING status bucket items
2. Look at ORDERED status bucket items (if any)

**Expected Results:**
- [ ] "🛒 Order All" button visible on each card in PENDING bucket
- [ ] "Order All" button NOT visible in ORDERED, DELIVERED_STORE, or DELIVERED_BALAGRUHA buckets
- [ ] Button is green and clearly clickable

---

### TC-3.5.6: Verify "Order All" Functionality

**Objective:** Verify Order All marks all grouped requests as ordered  
**Priority:** P0 (Critical) - Core PM workflow action, batch processing  
**Estimated Time:** 7 minutes  
**Flakiness Risk:** 🟡 Medium - Multi-request state transition, badge update timing  

**Preconditions:**
- At least 2 PENDING requests for the same product

**Steps:**
1. Note the Request IDs of 2+ requests for the same product
2. Click "🛒 Order All" on that bunched item
3. Confirm the action in the confirmation dialog
4. Wait for success toast
5. Switch to "On Going Order" tab

**Expected Results:**
- [ ] Confirmation dialog appears: "Mark all X request(s) for 'Product Name' as Ordered?"
- [ ] After confirmation, success toast appears
- [ ] All the grouped requests move from PENDING to ORDERED status
- [ ] Badge count in sidebar decrements by number of requests processed
- [ ] Requests appear in "On Going Order" tab

---

### TC-3.5.7: Verify Toggle Back to List View

**Objective:** Verify switching back to List view works correctly  
**Priority:** P2 (Medium) - View toggle interaction  
**Estimated Time:** 2 minutes  
**Flakiness Risk:** 🟢 Low - Simple toggle action  

**Steps:**
1. While in Bunched View, click "📋 List" button
2. Observe the display change

**Expected Results:**
- [ ] View switches back to traditional table format
- [ ] All requests shown as individual rows
- [ ] Request table with columns visible again
- [ ] Stats footer reappears

---

### TC-3.5.8: Verify View Mode Only on Workflow Tabs

**Objective:** Verify toggle is hidden for non-workflow tabs  
**Priority:** P2 (Medium) - UI context validation  
**Estimated Time:** 3 minutes  
**Flakiness Risk:** 🟢 Low - Static UI check across tabs  

**Steps:**
1. Click "Present Stock" tab
2. Look for view mode toggle
3. Repeat for "Supplier List" and "Most Consumed"

**Expected Results:**
- [ ] View mode toggle (List/Bunched) is NOT visible on inventory/analytics tabs
- [ ] These tabs have their own fixed layouts

---

## Test Case 6: Story 2.6 - Repair Technician & Delivery Tracking

### TC-2.6.1: Verify Technician Name Prompt for Repairs Category

**Objective:** Verify PM must enter technician name when marking Repairs as delivered to store  
**Priority:** P0 (Critical) - Data integrity for repair tracking  
**Estimated Time:** 4 minutes  
**Flakiness Risk:** 🟢 Low - Modal/prompt interaction  

**Preconditions:**
- At least 1 purchase request with:
  - Status: ORDERED
  - Category: "Repairs"

**Steps:**
1. Find an ORDERED request with "Repairs" category
2. Click "📦 Mark Received at Store" button
3. Observe the prompt/modal

**Expected Results:**
- [ ] Prompt appears asking for "Repair Technician Name"
- [ ] Field is clearly marked as required
- [ ] Submit and Cancel buttons are visible

**Screenshot Required:** Yes - capture technician prompt

---

### TC-2.6.2: Verify Technician Name Validation

**Objective:** Verify empty technician name is rejected  
**Priority:** P2 (Medium) - Input validation edge case  
**Estimated Time:** 3 minutes  
**Flakiness Risk:** 🟢 Low - Form validation logic  

**Steps:**
1. On the technician name prompt, leave field empty
2. Click Submit
3. Try entering only spaces and submit

**Expected Results:**
- [ ] Error message appears: "Technician name is required for repair items"
- [ ] Request status does NOT change
- [ ] Field remains focused for input

---

### TC-2.6.3: Verify Technician Name Saved Successfully

**Objective:** Verify technician name is saved with the request  
**Priority:** P0 (Critical) - Data persistence for repair tracking  
**Estimated Time:** 5 minutes  
**Flakiness Risk:** 🟡 Medium - Database save timing, modal interactions  

**Steps:**
1. Enter a technician name: "John Smith - Plumber"
2. Click Submit
3. Wait for success toast
4. Open the request details (View modal)
5. Look for tracking information

**Expected Results:**
- [ ] Success toast: "Request marked as received at store"
- [ ] Request status changes to DELIVERED_STORE
- [ ] In View modal, "Delivery Tracking" section appears
- [ ] "Repair Technician: 🔧 John Smith - Plumber" is displayed

**Screenshot Required:** Yes - capture View modal with technician name

---

### TC-2.6.4: Verify Non-Repairs Skip Technician Prompt

**Objective:** Verify non-Repair categories don't require technician name  
**Priority:** P2 (Medium) - Business logic validation  
**Estimated Time:** 3 minutes  
**Flakiness Risk:** 🟢 Low - Conditional logic check  

**Preconditions:**
- At least 1 ORDERED request with category "ISF Shop" or "Medicines"

**Steps:**
1. Find an ORDERED request that is NOT "Repairs" category
2. Click "📦 Mark Received at Store"
3. Observe behavior

**Expected Results:**
- [ ] No technician name prompt appears
- [ ] Request immediately updates to DELIVERED_STORE
- [ ] Success toast appears

---

### TC-2.6.5: Verify Coach Delivery Auto-Capture

**Objective:** Verify when Coach marks delivered to Balagruha, their info is captured  
**Priority:** P1 (High) - Audit trail for delivery tracking  
**Estimated Time:** 6 minutes  
**Flakiness Risk:** 🟡 Medium - Multi-user workflow, role switching, data capture timing  

**Preconditions:**
- At least 1 request with status DELIVERED_STORE
- Request was originally made by the Coach user

**Steps:**
1. Log in as Coach
2. Navigate to Purchase Management / Coach Deliveries
3. Find the DELIVERED_STORE request
4. Click "🏠 Mark Delivered" or equivalent
5. Log in as Purchase Manager
6. Open the request details (View modal)

**Expected Results:**
- [ ] Request status changes to DELIVERED_BALAGRUHA
- [ ] In View modal, "Delivery Tracking" section shows:
  - "Delivered to Balagruha By: 👤 Coach Name (coach@email.com)"
  - "Delivered At: 📅 05/01/2026 14:30 (just now)"
- [ ] Coach info is auto-captured (not manually entered)

**Screenshot Required:** Yes - capture delivery tracking section

---

### TC-2.6.6: Verify Delivery Tracking Section Display

**Objective:** Verify the delivery tracking section appears with all info  
**Priority:** P1 (High) - Complete delivery tracking display  
**Estimated Time:** 4 minutes  
**Flakiness Risk:** 🟢 Low - Static data display verification  

**Preconditions:**
- A completed request (DELIVERED_BALAGRUHA) exists with:
  - Repair Technician Name (if Repairs category)
  - Delivered By Coach info

**Steps:**
1. Open View modal for a completed request
2. Scroll to find "Delivery Tracking" section

**Expected Results:**
- [ ] Section has green background (#e8f5e9)
- [ ] Section title: "🚚 Delivery Tracking"
- [ ] Shows Repair Technician (if applicable)
- [ ] Shows Delivered By Coach name and email
- [ ] Shows Delivered At timestamp with "time ago" format
- [ ] Section only appears if delivery info exists

---

### TC-2.6.7: Verify Technician Prompt in View Modal

**Objective:** Verify View Modal also prompts for technician for Repairs  
**Priority:** P2 (Medium) - Alternative workflow validation  
**Estimated Time:** 4 minutes  
**Flakiness Risk:** 🟢 Low - Modal inline form interaction  

**Steps:**
1. Open View modal for an ORDERED request with "Repairs" category
2. Click "📦 Mark Received at Store" button in modal footer
3. Observe the inline technician input

**Expected Results:**
- [ ] Inline input appears in modal footer with orange/yellow background
- [ ] Label: "🔧 Technician Name:"
- [ ] Input field with placeholder
- [ ] Submit (✓) and Cancel (✕) buttons
- [ ] Submitting with valid name updates status

**Screenshot Required:** Yes - capture modal with inline technician input

---

### TC-2.6.8: Backend Validation - API Level

**Objective:** Verify backend rejects missing technician name for Repairs  
**Priority:** P0 (Critical) - Backend data integrity validation (defense in depth)  
**Estimated Time:** 5 minutes  
**Flakiness Risk:** 🔴 High - API testing, network timing, requires DevTools  

**Steps:**
1. Open browser DevTools → Network tab
2. Attempt to update a Repairs request to delivered_store without technician name (via direct API or bypassing frontend)
3. Check API response

**Expected Results:**
- [ ] API returns 400 Bad Request
- [ ] Error message: "Repair Technician Name is required for repair items"
- [ ] Request status unchanged

---

## Cross-Story Integration Tests

### TC-INT-1: Full PM Workflow with All Features

**Objective:** Test complete workflow using all new features  
**Priority:** P1 (High) - Cross-feature integration smoke test  
**Estimated Time:** 12 minutes  
**Flakiness Risk:** 🟡 Medium - Long test, multiple features, data dependencies  

**Steps:**
1. Log in as PM
2. Note badge count in sidebar (Story 3.9)
3. Navigate to Purchase Management
4. Verify header shows "📋 Purchase Requests" (Story 3.10)
5. Use "Requested By" filter to find specific coach's requests (Story 3.8)
6. Switch to Bunched View (Story 3.5)
7. Expand a bunched item to see details
8. Click "Order All" on a pending item
9. Click "Present Stock" tab (Story 3.6)
10. Verify stock levels display
11. Click "Most Consumed" tab
12. Change period to "This Month"
13. Go back to "On Going Order" tab
14. Find a "Repairs" order and mark as delivered to store (Story 2.6)
15. Enter technician name when prompted
16. Verify sidebar badge updated

**Expected Results:**
- [ ] All features work together seamlessly
- [ ] No console errors
- [ ] Data remains consistent across tabs
- [ ] Status changes reflect immediately

---

### TC-INT-2: Coach End-to-End Delivery

**Objective:** Test coach delivery flow and tracking  
**Priority:** P0 (Critical) - End-to-end delivery workflow validation  
**Estimated Time:** 10 minutes  
**Flakiness Risk:** 🟡 Medium - Multi-role workflow, state transitions, timing  

**Steps:**
1. As PM: Mark a request as ORDERED
2. As PM: Mark request as DELIVERED_STORE (with technician if Repairs)
3. Log out
4. Log in as Coach
5. Navigate to deliveries
6. Find the DELIVERED_STORE request
7. Mark as Delivered to Balagruha
8. Log back in as PM
9. View the request details
10. Verify delivery tracking shows Coach info

**Expected Results:**
- [ ] Full workflow completes
- [ ] Coach info captured automatically
- [ ] Timestamps are accurate
- [ ] Tracking section displays all info

---

## Regression Tests

### TC-REG-1: Existing Filters Still Work

**Objective:** Verify existing filters (Date, Priority, Balagruha) still function  
**Priority:** P0 (Critical) - Regression validation for modified filter system  
**Estimated Time:** 6 minutes  
**Flakiness Risk:** 🟡 Medium - Multiple filter combinations, data dependencies  

**Steps:**
1. Test Date Range filter with "This Week"
2. Test Priority filter with "High"
3. Test Balagruha filter with specific Balagruha
4. Test combination of filters
5. Test Search filter

**Expected Results:**
- [ ] All existing filters work correctly
- [ ] Filters combine properly
- [ ] No regressions from new features

---

### TC-REG-2: Non-PM Roles Unaffected

**Objective:** Verify Coach and Admin views work correctly  
**Priority:** P0 (Critical) - Role-based access security regression  
**Estimated Time:** 5 minutes  
**Flakiness Risk:** 🟢 Low - Role switching, static access checks  

**Steps:**
1. Log in as Coach
2. Verify can see own requests only
3. Verify can mark DELIVERED_STORE requests as delivered
4. Log in as Admin
5. Verify can see all requests
6. Verify Requester column visible (Admin-only)

**Expected Results:**
- [ ] Coach functionality unchanged
- [ ] Admin functionality unchanged
- [ ] New PM features don't break other roles

---

### TC-REG-3: Create Purchase Request Still Works

**Objective:** Verify request creation is unaffected  
**Priority:** P1 (High) - Core feature regression  
**Estimated Time:** 5 minutes  
**Flakiness Risk:** 🟢 Low - Standard CRUD operation  

**Steps:**
1. Click "+ New Purchase Request"
2. Fill out all fields including category
3. Add products
4. Submit request
5. Verify appears in list

**Expected Results:**
- [ ] Modal opens correctly
- [ ] All fields work
- [ ] Request created successfully
- [ ] Appears in list immediately

---

### TC-REG-4: PDF Export Still Works

**Objective:** Verify export functionality unaffected  
**Priority:** P1 (High) - Report generation regression  
**Estimated Time:** 4 minutes  
**Flakiness Risk:** 🟢 Low - File download verification  

**Steps:**
1. Filter some requests
2. Click "📄 Export PDF"
3. Open downloaded PDF

**Expected Results:**
- [ ] PDF generates successfully
- [ ] Contains filtered data
- [ ] Formatting is correct

---

## Test Results Summary Template

| Test Case | Pass/Fail | Notes | Screenshot |
|-----------|-----------|-------|------------|
| TC-3.10.1 | | | |
| TC-3.10.2 | | | |
| TC-3.10.3 | | | |
| TC-3.10.4 | | | |
| TC-3.8.1 | | | |
| TC-3.8.2 | | | |
| TC-3.8.3 | | | |
| TC-3.8.4 | | | |
| TC-3.9.1 | | | |
| TC-3.9.2 | | | |
| TC-3.9.3 | | | |
| TC-3.9.4 | | | |
| TC-3.6.1 | | | |
| TC-3.6.2 | | | |
| TC-3.6.3 | | | |
| TC-3.6.4 | | | |
| TC-3.6.5 | | | |
| TC-3.6.6 | | | |
| TC-3.6.7 | | | |
| TC-3.5.1 | | | |
| TC-3.5.2 | | | |
| TC-3.5.3 | | | |
| TC-3.5.4 | | | |
| TC-3.5.5 | | | |
| TC-3.5.6 | | | |
| TC-3.5.7 | | | |
| TC-3.5.8 | | | |
| TC-2.6.1 | | | |
| TC-2.6.2 | | | |
| TC-2.6.3 | | | |
| TC-2.6.4 | | | |
| TC-2.6.5 | | | |
| TC-2.6.6 | | | |
| TC-2.6.7 | | | |
| TC-2.6.8 | | | |
| TC-INT-1 | | | |
| TC-INT-2 | | | |
| TC-REG-1 | | | |
| TC-REG-2 | | | |
| TC-REG-3 | | | |
| TC-REG-4 | | | |

---

## Defect Reporting Template

**Defect ID:** DEF-SPRINT5-XXX  
**Test Case:** TC-X.X.X  
**Severity:** Critical / High / Medium / Low  
**Environment:** [Browser, OS, Screen resolution]  

**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Result:**

**Actual Result:**

**Screenshots/Videos:**

**Console Errors (if any):**

---

## Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| QA Tester | | | |
| Developer | | | |
| Product Owner | | | |

---

**Document End**
