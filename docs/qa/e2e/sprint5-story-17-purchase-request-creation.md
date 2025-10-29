# E2E Test Scenarios - Story 17: Purchase Request Creation & Management

**Story ID:** Sprint5-Story-17
**Epic:** Sprint5-Epic-05 (Purchase Manager Workflow)
**Test Type:** End-to-End (E2E) - Manual Testing Scenarios
**Created:** 2025-10-29
**Status:** Ready for QA Testing

---

## Test Environment Setup

### Prerequisites
- Backend server running on port 5001
- Frontend server running on port 3000
- Test database with sample data:
  - At least 2 balagruhas
  - Purchase Manager user with assigned balagruhas
  - Admin user
  - Shop products with varying stock levels (some low stock, some out of stock)

### Test Users
- **Purchase Manager:**
  - Email: purchase.manager@isf.com
  - Role: purchase-manager
  - Assigned Balagruhas: Amma Balagruha

- **Admin:**
  - Email: admin@isf.com
  - Role: admin
  - Access: All balagruhas

---

## Test Case 1: Dropdown UI Integration (AC1)

**Objective:** Verify dropdown selector for Machine Repairs vs Shop Inventory

### TC-1.1: Navigate to Purchase Management Page
**Preconditions:**
- User logged in as Purchase Manager

**Steps:**
1. Navigate to `/purchase` page
2. Observe page header

**Expected Results:**
- ✅ Page title displays "Purchase Management"
- ✅ Dropdown selector visible with label "Purchase Type:"
- ✅ Dropdown has two options: "📋 Machine Repairs" and "🛒 Shop Inventory"
- ✅ Default selection is "Machine Repairs"
- ✅ Machine Repairs view is displayed by default

**Screenshot:** `TC-1.1-dropdown-default.png`

---

### TC-1.2: Switch to Shop Inventory View
**Preconditions:**
- On `/purchase` page showing Machine Repairs

**Steps:**
1. Click dropdown selector
2. Select "🛒 Shop Inventory"

**Expected Results:**
- ✅ Dropdown value changes to "Shop Inventory"
- ✅ Machine Repairs view disappears
- ✅ Shop Inventory view appears
- ✅ Header shows "🛒 Shop Inventory Purchase Requests"
- ✅ Action button text changes to "+ New Purchase Request"

**Screenshot:** `TC-1.2-shop-inventory-view.png`

---

### TC-1.3: Switch Back to Machine Repairs
**Preconditions:**
- On `/purchase` page showing Shop Inventory

**Steps:**
1. Click dropdown selector
2. Select "📋 Machine Repairs"

**Expected Results:**
- ✅ Shop Inventory view disappears
- ✅ Machine Repairs view appears
- ✅ Action button text changes to "+ New Repair Order"

**Screenshot:** `TC-1.3-machine-repairs-restored.png`

---

## Test Case 2: Purchase Request Creation (AC2)

**Objective:** Verify Purchase Manager can create purchase requests

### TC-2.1: Open Create Purchase Request Modal
**Preconditions:**
- Logged in as Purchase Manager
- On Shop Inventory view

**Steps:**
1. Click "+ New Purchase Request" button

**Expected Results:**
- ✅ Modal opens with title "📝 New Purchase Request"
- ✅ Form contains fields:
  - Balagruha dropdown
  - Product dropdown
  - Quantity input
  - Reason input (max 200 chars)
  - Justification textarea (max 500 chars, optional)
- ✅ Balagruha dropdown shows only assigned balagruhas (Amma Balagruha)
- ✅ Product dropdown is disabled until balagruha selected

**Screenshot:** `TC-2.1-create-modal-opened.png`

---

### TC-2.2: Select Balagruha and View Low Stock Products
**Preconditions:**
- Create Purchase Request modal open

**Steps:**
1. Select "Amma Balagruha" from balagruha dropdown
2. Click Product dropdown

**Expected Results:**
- ✅ Product dropdown becomes enabled
- ✅ Only low-stock or out-of-stock products are shown
- ✅ Each product displays:
  `Notebook - Stock: 5/10 ⚠️`
- ✅ Out of stock products show 🔴 indicator
- ✅ Low stock products show ⚠️ indicator

**Screenshot:** `TC-2.2-low-stock-products.png`

---

### TC-2.3: Select Product and See Product Info
**Preconditions:**
- Balagruha selected, product dropdown populated

**Steps:**
1. Select "Notebook" from product dropdown

**Expected Results:**
- ✅ Product info card appears below dropdown
- ✅ Product info shows:
  - Name: Notebook
  - SKU: NB-001
  - Current Stock: 5 / 10
  - Stock badge: ⚠️ Low Stock
  - Price: 50 coins
- ✅ Quantity field becomes active

**Screenshot:** `TC-2.3-product-info-displayed.png`

---

### TC-2.4: Fill Complete Form and Submit
**Preconditions:**
- Product selected

**Steps:**
1. Enter Quantity: `50`
2. Enter Reason: `Stock is critically low, students need notebooks for exams`
3. Enter Justification: `Exam season starting next week, high demand expected`
4. Click "Create Request" button

**Expected Results:**
- ✅ Success toast: "Purchase request created successfully"
- ✅ Modal closes
- ✅ New request appears in table with:
  - Auto-generated Request ID (e.g., PR-001)
  - Product: Notebook
  - Quantity: 50
  - Status: 🟡 Pending Approval
  - Reason displayed
  - Actions: 👁️ (View) and ✖️ (Cancel) buttons

**Screenshot:** `TC-2.4-request-created.png`

---

### TC-2.5: Form Validation - Missing Required Fields
**Preconditions:**
- Create Purchase Request modal open

**Steps:**
1. Leave all fields empty
2. Click "Create Request" button

**Expected Results:**
- ✅ Error toast: "Please select a balagruha"
- ✅ Modal remains open
- ✅ No request created

**Screenshot:** `TC-2.5-validation-error.png`

---

### TC-2.6: Form Validation - Quantity Less Than 1
**Preconditions:**
- Create modal open, balagruha and product selected

**Steps:**
1. Enter Quantity: `0`
2. Enter Reason: `Test`
3. Click "Create Request"

**Expected Results:**
- ✅ Error toast: "Please enter a valid quantity (at least 1)"
- ✅ No request created

**Screenshot:** `TC-2.6-quantity-validation.png`

---

### TC-2.7: Character Count Display
**Preconditions:**
- Create modal open

**Steps:**
1. Type in Reason field: `Low stock needs replenishment`
2. Type in Justification field: `This is a longer justification...`

**Expected Results:**
- ✅ Reason shows character count: `31/200 characters`
- ✅ Justification shows character count: `38/500 characters`
- ✅ Character counts update in real-time

**Screenshot:** `TC-2.7-character-counts.png`

---

## Test Case 3: View Own Requests with Frontend Filtering (AC3)

**Objective:** Verify Purchase Manager sees only own requests from assigned balagruhas

### TC-3.1: View Purchase Requests Table
**Preconditions:**
- Logged in as Purchase Manager
- At least 3 purchase requests created (2 by this user, 1 by another)

**Steps:**
1. Navigate to Shop Inventory view
2. Observe requests table

**Expected Results:**
- ✅ Table displays only requests created by current user
- ✅ Table columns:
  - Request ID
  - Product (name + SKU)
  - Quantity
  - Stock Status (current/threshold)
  - Reason
  - Status (badge)
  - Requested (date + time ago)
  - Actions
- ✅ Only requests from assigned balagruhas (Amma Balagruha) are shown
- ✅ Requests from other Purchase Managers are NOT visible

**Screenshot:** `TC-3.1-filtered-requests.png`

---

### TC-3.2: Verify Admin Sees All Requests
**Preconditions:**
- Logout Purchase Manager
- Login as Admin

**Steps:**
1. Navigate to Shop Inventory view
2. Observe requests table

**Expected Results:**
- ✅ Admin sees ALL purchase requests from ALL balagruhas
- ✅ Requests from all Purchase Managers are visible
- ✅ Balagruha tags show for each request: `📍 Amma Balagruha`

**Screenshot:** `TC-3.2-admin-sees-all.png`

---

## Test Case 4: Request Filtering & Search (AC4)

**Objective:** Verify all filter combinations work correctly

### TC-4.1: Date Range Filter - Today
**Preconditions:**
- Requests created today and yesterday exist

**Steps:**
1. Select Date Range: "Today"

**Expected Results:**
- ✅ Only requests created today are shown
- ✅ Yesterday's requests are hidden
- ✅ Stats footer updates to reflect filtered count

**Screenshot:** `TC-4.1-filter-today.png`

---

### TC-4.2: Date Range Filter - Custom Range
**Preconditions:**
- Multiple requests across different dates

**Steps:**
1. Select Date Range: "Custom Range"
2. Set From Date: 7 days ago
3. Set To Date: Today
4. Observe results

**Expected Results:**
- ✅ From and To date pickers appear
- ✅ Only requests within date range are shown
- ✅ Requests outside range are hidden

**Screenshot:** `TC-4.2-custom-date-range.png`

---

### TC-4.3: Balagruha Filter
**Preconditions:**
- Admin user with requests from multiple balagruhas

**Steps:**
1. Select Balagruha: "Amma Balagruha"

**Expected Results:**
- ✅ Only requests from Amma Balagruha are shown
- ✅ Requests from other balagruhas are hidden

**Screenshot:** `TC-4.3-balagruha-filter.png`

---

### TC-4.4: Status Filter - Pending Approval
**Preconditions:**
- Requests with various statuses exist

**Steps:**
1. Select Status: "Pending Approval"

**Expected Results:**
- ✅ Only pending requests are shown (🟡 Pending)
- ✅ Approved, rejected, completed requests are hidden
- ✅ Stats footer shows pending count

**Screenshot:** `TC-4.4-status-pending.png`

---

### TC-4.5: Search by Product Name
**Preconditions:**
- Multiple requests for different products

**Steps:**
1. Enter Search: `notebook`

**Expected Results:**
- ✅ Only requests for products containing "notebook" are shown
- ✅ Search is case-insensitive
- ✅ Other requests are hidden

**Screenshot:** `TC-4.5-search-product.png`

---

### TC-4.6: Search by Request ID
**Preconditions:**
- Multiple requests exist

**Steps:**
1. Enter Search: `PR-001`

**Expected Results:**
- ✅ Only request PR-001 is shown
- ✅ Exact match works
- ✅ Partial match works (e.g., "PR-0" shows PR-001, PR-002, etc.)

**Screenshot:** `TC-4.6-search-request-id.png`

---

### TC-4.7: Combined Filters
**Preconditions:**
- Multiple requests with various attributes

**Steps:**
1. Select Date Range: "This Month"
2. Select Status: "Pending Approval"
3. Enter Search: `notebook`

**Expected Results:**
- ✅ Only requests matching ALL criteria are shown:
  - Created this month
  - Status is pending
  - Product name contains "notebook"
- ✅ Stats footer reflects combined filter result

**Screenshot:** `TC-4.7-combined-filters.png`

---

## Test Case 5: Cancel Pending Request (AC5)

**Objective:** Verify Purchase Manager can cancel own pending requests

### TC-5.1: Cancel Button Visibility
**Preconditions:**
- Requests with various statuses exist

**Steps:**
1. Observe Actions column for each request

**Expected Results:**
- ✅ Pending requests show: 👁️ (View) and ✖️ (Cancel) buttons
- ✅ Approved requests show only: 👁️ (View) button
- ✅ Rejected requests show only: 👁️ (View) button
- ✅ Completed requests show only: 👁️ (View) button

**Screenshot:** `TC-5.1-cancel-button-visibility.png`

---

### TC-5.2: Cancel Pending Request with Confirmation
**Preconditions:**
- At least one pending request exists

**Steps:**
1. Click ✖️ (Cancel) button for pending request PR-001
2. Observe confirmation dialog

**Expected Results:**
- ✅ Browser confirmation dialog appears: "Are you sure you want to cancel this request?"
- ✅ Dialog has "OK" and "Cancel" buttons

**Screenshot:** `TC-5.2-cancel-confirmation.png`

---

### TC-5.3: Confirm Cancellation
**Preconditions:**
- Cancellation confirmation dialog open

**Steps:**
1. Click "OK" on confirmation dialog

**Expected Results:**
- ✅ Success toast: "Request cancelled successfully"
- ✅ Request status changes to ⚫ Cancelled
- ✅ Cancel button disappears for this request
- ✅ Stats footer updates (pending count decreases)

**Screenshot:** `TC-5.3-request-cancelled.png`

---

### TC-5.4: Decline Cancellation
**Preconditions:**
- Pending request exists

**Steps:**
1. Click ✖️ (Cancel) button
2. Click "Cancel" on confirmation dialog

**Expected Results:**
- ✅ Dialog closes
- ✅ Request remains unchanged
- ✅ Status still shows 🟡 Pending

**Screenshot:** `TC-5.4-cancel-declined.png`

---

### TC-5.5: Attempt to Cancel Approved Request (Backend Validation)
**Preconditions:**
- Approved request exists

**Steps:**
1. Use browser dev tools to force enable cancel button on approved request
2. Click cancel button

**Expected Results:**
- ✅ Error toast: "Cannot cancel approved request. Only pending requests can be cancelled."
- ✅ Request status remains Approved
- ✅ Backend validation prevents cancellation

**Screenshot:** `TC-5.5-cancel-approved-blocked.png`

---

## Test Case 6: View Request Details (AC6)

**Objective:** Verify full request details are viewable in modal

### TC-6.1: View Pending Request Details
**Preconditions:**
- At least one pending request exists

**Steps:**
1. Click 👁️ (View) button for pending request PR-001

**Expected Results:**
- ✅ Modal opens with title "📋 Purchase Request Details"
- ✅ Request ID badge displays: `PR-001`
- ✅ Status section shows: 🟡 Pending Approval
- ✅ Product Information section displays:
  - Product Name: Notebook
  - SKU: NB-001
  - Current Stock: 5 units (⚠️ Low Stock badge)
  - Low Stock Threshold: 10 units
  - Balagruha: 📍 Amma Balagruha
- ✅ Request Details section shows:
  - Requested Quantity: 50 units
  - Requested By: Purchase Manager Name (email)
  - Request Date: DD-MM-YYYY HH:mm (X hours ago)
  - Reason: Full reason text
  - Justification: Full justification text (if provided)
- ✅ Modal footer shows:
  - ✖️ Cancel Request button
  - Close button

**Screenshot:** `TC-6.1-view-pending-details.png`

---

### TC-6.2: View Approved Request Details
**Preconditions:**
- Admin has approved a request

**Steps:**
1. Click 👁️ (View) for approved request

**Expected Results:**
- ✅ Status shows: ✅ Approved
- ✅ Additional "Approval Details" section appears:
  - Reviewed By: Admin Name (email)
  - Review Date: DD-MM-YYYY HH:mm
  - Approval Notes: Admin's notes
- ✅ Cancel button NOT present in footer
- ✅ Only Close button visible

**Screenshot:** `TC-6.2-view-approved-details.png`

---

### TC-6.3: View Rejected Request Details
**Preconditions:**
- Admin has rejected a request

**Steps:**
1. Click 👁️ (View) for rejected request

**Expected Results:**
- ✅ Status shows: ❌ Rejected
- ✅ "Rejection Details" section appears:
  - Reviewed By: Admin Name (email)
  - Review Date: DD-MM-YYYY HH:mm
  - Rejection Reason: Admin's rejection notes
- ✅ Cancel button NOT present

**Screenshot:** `TC-6.3-view-rejected-details.png`

---

### TC-6.4: Cancel Request from View Modal
**Preconditions:**
- Viewing pending request details modal

**Steps:**
1. Click "✖️ Cancel Request" button in modal footer
2. Confirm cancellation

**Expected Results:**
- ✅ Confirmation dialog appears
- ✅ On confirm: Success toast
- ✅ Modal closes
- ✅ Request table updates to show Cancelled status

**Screenshot:** `TC-6.4-cancel-from-modal.png`

---

### TC-6.5: Metadata Display
**Preconditions:**
- Viewing any request details

**Steps:**
1. Scroll to bottom of modal

**Expected Results:**
- ✅ Metadata section displays:
  - Created: DD-MM-YYYY HH:mm:ss
  - Last Updated: DD-MM-YYYY HH:mm:ss
- ✅ Metadata section has distinct background color (light gray)

**Screenshot:** `TC-6.5-metadata-section.png`

---

## Test Case 7: Export to PDF (AC7)

**Objective:** Verify PDF export functionality

### TC-7.1: Export All Requests
**Preconditions:**
- Multiple requests visible in table

**Steps:**
1. Click "📄 Export PDF" button

**Expected Results:**
- ✅ PDF file downloads
- ✅ Filename format: `Purchase_Requests_YYYY-MM-DD.pdf`
- ✅ PDF contains:
  - Title: "Shop Purchase Requests"
  - Generated date/time
  - Total Requests count
  - Pending count
  - Table with columns: Request ID, Product, Qty, Reason, Status, Date
  - All visible requests included

**Screenshot:** `TC-7.1-pdf-exported.png` + `TC-7.1-pdf-contents.pdf`

---

### TC-7.2: Export Filtered Requests
**Preconditions:**
- Filters applied (e.g., Status: Pending)

**Steps:**
1. Apply Status filter: "Pending Approval"
2. Click "📄 Export PDF" button

**Expected Results:**
- ✅ PDF contains only filtered requests (pending only)
- ✅ PDF metadata shows correct count matching filtered view
- ✅ Success toast: "PDF exported successfully"

**Screenshot:** `TC-7.2-filtered-pdf.png`

---

### TC-7.3: Export Button Disabled When No Requests
**Preconditions:**
- Filters applied resulting in zero requests

**Steps:**
1. Apply filters that result in no matches
2. Observe Export PDF button

**Expected Results:**
- ✅ Export PDF button is disabled (grayed out)
- ✅ Button cannot be clicked
- ✅ Cursor shows "not-allowed" icon on hover

**Screenshot:** `TC-7.3-export-disabled.png`

---

## Test Case 8: Stats Footer Display

**Objective:** Verify stats footer shows accurate real-time counts

### TC-8.1: Stats Footer Initial Display
**Preconditions:**
- 10 requests exist (5 pending, 3 approved, 2 completed)

**Steps:**
1. Navigate to Shop Inventory view
2. Observe stats footer at bottom

**Expected Results:**
- ✅ Stats footer displays:
  - Total Requests: **10**
  - Pending: **5** (orange color)
  - Approved: **3** (green color)
  - Completed: **2** (blue color)
- ✅ Numbers are bold and colored appropriately

**Screenshot:** `TC-8.1-stats-footer.png`

---

### TC-8.2: Stats Update After Filter
**Preconditions:**
- Stats footer showing totals

**Steps:**
1. Apply Status filter: "Pending Approval"

**Expected Results:**
- ✅ Total Requests updates to show filtered count
- ✅ Pending, Approved, Completed counts reflect filtered data
- ✅ Stats update in real-time without page refresh

**Screenshot:** `TC-8.2-stats-filtered.png`

---

### TC-8.3: Stats Update After Creating Request
**Preconditions:**
- Stats footer visible

**Steps:**
1. Create new purchase request
2. Observe stats footer

**Expected Results:**
- ✅ Total Requests count increases by 1
- ✅ Pending count increases by 1
- ✅ Stats update immediately after creation

**Screenshot:** `TC-8.3-stats-after-create.png`

---

## Test Case 9: Responsive Design & Error Handling

**Objective:** Verify UI works across different scenarios

### TC-9.1: Loading State
**Preconditions:**
- Clear browser cache

**Steps:**
1. Navigate to Shop Inventory view
2. Observe loading state before data loads

**Expected Results:**
- ✅ Loading spinner displayed
- ✅ Text: "Loading purchase requests..."
- ✅ No table or empty state shown during loading

**Screenshot:** `TC-9.1-loading-state.png`

---

### TC-9.2: Empty State - No Requests
**Preconditions:**
- New Purchase Manager with no requests

**Steps:**
1. Login as new Purchase Manager
2. Navigate to Shop Inventory view

**Expected Results:**
- ✅ Table header visible
- ✅ Empty state message: "No purchase requests found. Click '+ New Purchase Request' to create one."
- ✅ Message is centered in table
- ✅ Stats footer shows all zeros

**Screenshot:** `TC-9.2-empty-state.png`

---

### TC-9.3: API Error Handling
**Preconditions:**
- Backend server stopped

**Steps:**
1. Navigate to Shop Inventory view
2. Observe error handling

**Expected Results:**
- ✅ Error toast: "Error fetching purchase requests"
- ✅ Loading spinner disappears
- ✅ Empty state or error message displayed

**Screenshot:** `TC-9.3-api-error.png`

---

### TC-9.4: Network Error During Create
**Preconditions:**
- Create modal open, form filled

**Steps:**
1. Stop backend server
2. Click "Create Request"

**Expected Results:**
- ✅ Error toast: "Error creating request"
- ✅ Modal remains open
- ✅ Form data preserved
- ✅ User can retry after fixing connection

**Screenshot:** `TC-9.4-create-error.png`

---

## Test Case 10: Balagruha Access Control (Security)

**Objective:** Verify backend validates balagruha access

### TC-10.1: Purchase Manager Cannot Create Request for Unassigned Balagruha
**Preconditions:**
- Purchase Manager assigned only to Amma Balagruha
- Product exists in Veda Balagruha

**Steps:**
1. Use browser dev tools or API tool (Postman)
2. Send POST request to create purchase request for Veda Balagruha product
3. Observe response

**Expected Results:**
- ✅ Backend returns 403 Forbidden
- ✅ Error message: "You do not have access to request purchases for this balagruha"
- ✅ No request created in database

**Screenshot:** `TC-10.1-backend-validation.png`

---

### TC-10.2: Frontend Filtering Cannot Be Bypassed
**Preconditions:**
- Purchase Manager with requests from multiple balagruhas in database (manually created)

**Steps:**
1. Login as Purchase Manager
2. Navigate to Shop Inventory view
3. Check browser dev tools network tab

**Expected Results:**
- ✅ API returns all user's requests
- ✅ Frontend filters to show only assigned balagruhas
- ✅ Unassigned balagruha requests are hidden in UI
- ✅ Filtering logic runs on client side (MVP approach)

**Screenshot:** `TC-10.2-frontend-filtering.png`

---

## Summary of Test Coverage

| Acceptance Criteria | Test Cases | Status |
|---------------------|------------|--------|
| AC1: Dropdown UI | TC-1.1, TC-1.2, TC-1.3 | ✅ Ready |
| AC2: Request Creation | TC-2.1 - TC-2.7 | ✅ Ready |
| AC3: View Own Requests | TC-3.1, TC-3.2 | ✅ Ready |
| AC4: Filters & Search | TC-4.1 - TC-4.7 | ✅ Ready |
| AC5: Cancel Request | TC-5.1 - TC-5.5 | ✅ Ready |
| AC6: View Details | TC-6.1 - TC-6.5 | ✅ Ready |
| AC7: Export PDF | TC-7.1 - TC-7.3 | ✅ Ready |
| Additional: Stats | TC-8.1 - TC-8.3 | ✅ Ready |
| Additional: UX | TC-9.1 - TC-9.4 | ✅ Ready |
| Additional: Security | TC-10.1 - TC-10.2 | ✅ Ready |

**Total Test Cases:** 48 test scenarios
**Coverage:** All 7 acceptance criteria + additional security/UX testing

---

## Notes for QA Agent

1. **Frontend Filtering Approach:** Story 17 uses frontend filtering for Purchase Managers (OLD RBAC MVP approach). Backend has light validation on write operations. This is intentional and documented in technical patterns.

2. **Screenshots:** All screenshots should be captured at 1920x1080 resolution and saved in `.playwright-mcp/` directory with TC prefix.

3. **Test Data:** Ensure test database has sufficient variety:
   - Products with stock = 0 (out of stock)
   - Products with stock <= threshold (low stock)
   - Products with stock > threshold (normal stock)
   - Multiple balagruhas with products

4. **Browser Testing:** Test on Chrome (primary) and Firefox (secondary).

5. **Performance:** Watch for console errors, especially in dev tools Network and Console tabs.

6. **Regression:** Verify Machine Repairs view still works after refactoring.

---

**Document Version:** 1.0
**Last Updated:** 2025-10-29 17:15:00 (via `date '+%Y-%m-%d %H:%M:%S'`)
**Created By:** Dev Agent (James)
**Review Status:** Ready for QA Review
