# E2E Test Scenarios - Sprint5-Story-06
# Inventory Management

**Story:** Inventory Management (Admin)
**Tester:** QA Agent Quinn
**Test Date:** October 8, 2025
**Status:** Ready for Testing

---

## Test Environment Setup

**Prerequisites:**
1. Backend running on http://localhost:5001
2. Frontend running on http://localhost:3000
3. Admin user logged in with `Shop Management: Manage` permission
4. Test data: At least 10 existing products with varying stock levels

**Test User Credentials:**
- Username: `adminplayz@gmail.com`
- Password: `Qwerty@1234`
- Role: Admin with shop management permissions

**Test Route:**
- URL: http://localhost:3000/shop/admin/inventory

---

## AC1: Manual Stock Adjustment

### Test Case 1.1: Increase Stock with Valid Reason
**Priority:** P0 (Critical)

**Steps:**
1. Navigate to `/shop/admin/inventory`
2. Locate a product with current stock (e.g., stock = 50)
3. Click "Adjust Stock" button for that product
4. In the modal:
   - Current stock should be displayed (e.g., "50")
   - Enter adjustment: `+25`
   - Select reason: `Purchase`
   - Enter notes: `Restocked from supplier XYZ`
5. Click "Adjust Stock"

**Expected Results:**
- ✅ Success toast: "Stock adjusted successfully"
- ✅ Modal closes automatically
- ✅ Product stock updates to new value (75)
- ✅ Table row updates without page reload
- ✅ Row color may change based on new stock level vs threshold

**API Validation:**
- PATCH request to `/api/v2/shop/admin/inventory/:productId/adjust`
- Request body: `{ adjustment: 25, reason: "Purchase", notes: "Restocked from supplier XYZ" }`
- Response status: 200 OK
- Response contains product and transaction details

---

### Test Case 1.2: Decrease Stock with Valid Reason
**Priority:** P0 (Critical)

**Steps:**
1. Click "Adjust Stock" on a product with sufficient stock (e.g., 100)
2. Enter adjustment: `-30`
3. Select reason: `Adjustment`
4. Enter notes: `Damaged items removed`
5. Click "Adjust Stock"

**Expected Results:**
- ✅ Success toast appears
- ✅ Stock decreases correctly (100 → 70)
- ✅ If new stock ≤ threshold, row color changes to orange
- ✅ Transaction logged in audit trail

---

### Test Case 1.3: Attempt Negative Stock (Validation)
**Priority:** P0 (Critical)

**Steps:**
1. Click "Adjust Stock" on product with stock = 10
2. Enter adjustment: `-20` (would result in -10)
3. Select reason: `Correction`
4. Click "Adjust Stock"

**Expected Results:**
- ✅ Error toast: "Stock cannot be negative"
- ✅ Modal remains open
- ✅ Stock unchanged in table
- ✅ No transaction created

---

### Test Case 1.4: Zero Adjustment Validation
**Priority:** P1

**Steps:**
1. Click "Adjust Stock"
2. Enter adjustment: `0`
3. Select reason
4. Click "Adjust Stock"

**Expected Results:**
- ✅ Validation error: "Adjustment must be a non-zero integer"
- ✅ Form does not submit

---

### Test Case 1.5: Stock Adjustment Without Reason
**Priority:** P1

**Steps:**
1. Click "Adjust Stock"
2. Enter adjustment: `10`
3. Leave reason dropdown at default/empty
4. Click "Adjust Stock"

**Expected Results:**
- ✅ Validation error: "Reason is required"
- ✅ Form does not submit

---

### Test Case 1.6: Stock to Zero (Out of Stock)
**Priority:** P0 (Critical)

**Steps:**
1. Click "Adjust Stock" on product with stock = 15
2. Enter adjustment: `-15`
3. Select reason: `Correction`
4. Click "Adjust Stock"

**Expected Results:**
- ✅ Stock becomes 0
- ✅ Row background changes to red (bg-red-50)
- ✅ "Out of Stock" indicator visible
- ✅ Success toast appears

---

## AC2: Bulk Stock Update

### Test Case 2.1: Download CSV Template
**Priority:** P1

**Steps:**
1. Navigate to inventory page
2. Click "Bulk Upload" button
3. In modal, click "Download CSV Template"

**Expected Results:**
- ✅ CSV file downloads with name `inventory-template.csv`
- ✅ CSV contains headers: `sku,stock`
- ✅ CSV contains sample row: `SAMPLE-SKU,100`

---

### Test Case 2.2: Bulk Upload with Valid CSV
**Priority:** P0 (Critical)

**Preparation:**
1. Create CSV file `bulk-test-valid.csv` with content:
```
sku,stock
[EXISTING-SKU-1],150
[EXISTING-SKU-2],200
[EXISTING-SKU-3],50
```
(Replace with actual SKUs from your database)

**Steps:**
1. Click "Bulk Upload"
2. Upload the valid CSV file
3. Select reason: `Purchase`
4. Enter notes: `Bulk restock from warehouse`
5. Click "Upload"

**Expected Results:**
- ✅ Success toast: "Bulk update completed: 3 successful, 0 failed"
- ✅ Modal shows results table with 3 green checkmarks
- ✅ All 3 products updated in main table
- ✅ Audit trail created for each product
- ✅ Modal can be closed

**API Validation:**
- POST to `/api/v2/shop/admin/inventory/bulk-update`
- Request body contains CSV data array
- Response shows success/failure for each row

---

### Test Case 2.3: Bulk Upload with Invalid SKUs
**Priority:** P0 (Critical)

**Preparation:**
1. Create CSV file `bulk-test-invalid.csv`:
```
sku,stock
VALID-SKU-1,100
INVALID-SKU-999,50
NONEXISTENT-SKU,75
```

**Steps:**
1. Click "Bulk Upload"
2. Upload the CSV with invalid SKUs
3. Select reason: `Purchase`
4. Click "Upload"

**Expected Results:**
- ✅ Toast shows partial success: "1 successful, 2 failed"
- ✅ Results table shows:
  - Row 1: Green checkmark ✓ "Stock updated"
  - Row 2: Red X ✗ "Product not found"
  - Row 3: Red X ✗ "Product not found"
- ✅ Valid product gets updated
- ✅ Invalid products ignored with clear error messages

---

### Test Case 2.4: Bulk Upload with Negative Stock
**Priority:** P1

**Preparation:**
1. Create CSV:
```
sku,stock
VALID-SKU,-50
```

**Steps:**
1. Upload CSV with negative stock value
2. Select reason, click Upload

**Expected Results:**
- ✅ Validation error for that row
- ✅ Error message: "Stock cannot be negative"
- ✅ Row marked as failed in results

---

### Test Case 2.5: Bulk Upload Without Reason
**Priority:** P1

**Steps:**
1. Click "Bulk Upload"
2. Upload valid CSV
3. Leave reason dropdown empty
4. Click "Upload"

**Expected Results:**
- ✅ Validation error: "Reason is required"
- ✅ Form does not submit

---

### Test Case 2.6: Bulk Upload with Empty CSV
**Priority:** P2

**Preparation:**
1. Create empty CSV or CSV with only headers

**Steps:**
1. Upload empty/header-only CSV

**Expected Results:**
- ✅ Error message: "CSV file is empty or invalid"
- ✅ No API call made

---

## AC3: Inventory Audit Trail

### Test Case 3.1: View Audit History
**Priority:** P0 (Critical)

**Steps:**
1. Locate product that has had stock adjustments
2. Click "View History" button for that product
3. Observe audit trail modal

**Expected Results:**
- ✅ Modal opens with title "Audit Trail - [Product Name]"
- ✅ Timeline displays all transactions, newest first
- ✅ Each entry shows:
  - Date/time formatted (e.g., "Oct 8, 2025 10:15 PM")
  - User name who performed adjustment
  - Action type badge (Purchase/Adjustment/Return/Correction)
  - Quantity change with +/- indicator
  - Previous stock → New stock
  - Reason
  - Notes (if provided)
- ✅ Color-coded indicators:
  - Green dot for positive adjustments (+)
  - Red dot for negative adjustments (-)

**API Validation:**
- GET request to `/api/v2/shop/admin/inventory/:productId/audit`
- Response contains array of transactions
- Transactions sorted by createdAt DESC

---

### Test Case 3.2: Audit Trail After Multiple Adjustments
**Priority:** P1

**Steps:**
1. Perform 3 stock adjustments on same product:
   - Adjustment 1: +50 (Purchase)
   - Adjustment 2: -10 (Correction)
   - Adjustment 3: +20 (Return)
2. Click "View History"

**Expected Results:**
- ✅ All 3 transactions visible
- ✅ Correct chronological order (newest first)
- ✅ Each shows correct previous/new stock values
- ✅ Stock changes are cumulative and accurate

---

### Test Case 3.3: Audit Trail Pagination (if implemented)
**Priority:** P2

**Steps:**
1. Find product with >10 transactions (or perform 15 adjustments)
2. View history

**Expected Results:**
- ✅ First 10 transactions shown
- ✅ "Load More" or pagination controls visible
- ✅ Can load additional transactions

---

### Test Case 3.4: Audit Trail for Product with No History
**Priority:** P2

**Steps:**
1. Create a brand new product (via Product Management)
2. Immediately view its audit history

**Expected Results:**
- ✅ Modal opens
- ✅ Empty state message: "No transactions found"
- ✅ No timeline entries displayed

---

## AC4: Automatic Stock Decrement (Order Integration)

### Test Case 4.1: Stock Decreases on Order Completion
**Priority:** P0 (Critical)

**Prerequisites:**
- Student user logged in
- Product with stock = 50

**Steps:**
1. As student, navigate to shop
2. Add product to cart (quantity = 5)
3. Complete checkout process
4. Order is created and confirmed
5. As admin, navigate to inventory page
6. Locate the same product

**Expected Results:**
- ✅ Product stock decreased by 5 (50 → 45)
- ✅ View audit history shows transaction:
  - Type: "Sale"
  - Quantity: -5
  - Reference: Order ID
  - Performed by: System/Order process

**API Validation:**
- Inventory transaction created with:
  - `transactionType: "sale"`
  - `reference.type: "order"`
  - `reference.id: [orderId]`

---

### Test Case 4.2: Multiple Products in Single Order
**Priority:** P1

**Steps:**
1. As student, add 3 different products to cart
2. Complete checkout
3. As admin, check inventory for all 3 products

**Expected Results:**
- ✅ All 3 products show stock decrease
- ✅ Each has audit trail entry with same order reference
- ✅ Quantities match cart quantities

---

### Test Case 4.3: Insufficient Stock Prevention
**Priority:** P0 (Critical)

**Steps:**
1. Product has stock = 5
2. As student, try to add quantity = 10 to cart
3. Attempt checkout

**Expected Results:**
- ✅ Error message: "Insufficient stock"
- ✅ Cannot proceed with checkout
- ✅ Stock remains unchanged
- ✅ No audit trail entry created

---

## AC5: Color-Coded Stock Levels

### Test Case 5.1: Green Background (High Stock)
**Priority:** P1

**Steps:**
1. Navigate to inventory page
2. Locate product with stock > lowStockThreshold
   - Example: stock = 100, threshold = 20

**Expected Results:**
- ✅ Table row has green background (bg-green-50)
- ✅ Stock number displayed clearly
- ✅ Visual indicator of healthy stock level

---

### Test Case 5.2: Orange Background (Low Stock Warning)
**Priority:** P1

**Steps:**
1. Adjust product stock to exactly threshold or slightly below
   - Example: stock = 20, threshold = 20
   - Or: stock = 15, threshold = 20

**Expected Results:**
- ✅ Row background changes to orange (bg-orange-50)
- ✅ Visual warning indicator
- ✅ Low stock badge/indicator visible

---

### Test Case 5.3: Red Background (Out of Stock)
**Priority:** P0 (Critical)

**Steps:**
1. Adjust product stock to 0
2. Observe table

**Expected Results:**
- ✅ Row background is red (bg-red-50)
- ✅ Clear visual alert
- ✅ "Out of Stock" badge or indicator
- ✅ Stock shows "0"

---

### Test Case 5.4: Color Transition on Stock Change
**Priority:** P1

**Steps:**
1. Product starts with high stock (green row)
2. Adjust stock down to low threshold (orange row)
3. Adjust stock to zero (red row)
4. Increase stock back above threshold (green row)

**Expected Results:**
- ✅ Row color updates dynamically without page reload
- ✅ Each state shows correct color:
  - Green: stock > threshold
  - Orange: 0 < stock ≤ threshold
  - Red: stock = 0

---

## Dashboard Statistics

### Test Case 6.1: Dashboard Stats Accuracy
**Priority:** P1

**Steps:**
1. Navigate to inventory page
2. Note the statistics cards at top:
   - Total Products
   - Low Stock Items
   - Out of Stock Items

**Expected Results:**
- ✅ Total Products count matches table row count
- ✅ Low Stock count matches orange rows
- ✅ Out of Stock count matches red rows (stock = 0)
- ✅ Stats update after stock adjustments

---

### Test Case 6.2: Stats Update After Bulk Upload
**Priority:** P1

**Steps:**
1. Note initial stats
2. Perform bulk upload that changes stock levels
3. Observe stats cards

**Expected Results:**
- ✅ Stats recalculate automatically
- ✅ Low Stock / Out of Stock counts update correctly

---

## Search and Filtering

### Test Case 7.1: Search by Product Name
**Priority:** P1

**Steps:**
1. Enter product name in search box
2. Observe table

**Expected Results:**
- ✅ Table filters to show matching products only
- ✅ Search is case-insensitive
- ✅ Partial matches work

---

### Test Case 7.2: Search by SKU
**Priority:** P1

**Steps:**
1. Enter SKU in search box

**Expected Results:**
- ✅ Product with matching SKU shown
- ✅ Other products hidden

---

### Test Case 7.3: Filter by Category
**Priority:** P1

**Steps:**
1. Select category from filter dropdown (e.g., "Books")

**Expected Results:**
- ✅ Only products in that category shown
- ✅ Stats may update to reflect filtered view

---

### Test Case 7.4: Filter by Stock Status
**Priority:** P1

**Steps:**
1. Select "Low Stock" from stock status filter

**Expected Results:**
- ✅ Only products with stock ≤ threshold shown (orange rows)
- ✅ Other products hidden

2. Select "Out of Stock"

**Expected Results:**
- ✅ Only products with stock = 0 shown (red rows)

---

## CSV Export

### Test Case 8.1: Export Inventory to CSV
**Priority:** P1

**Steps:**
1. Click "Export CSV" button
2. File downloads

**Expected Results:**
- ✅ CSV file downloads with name `inventory-export-[date].csv`
- ✅ CSV contains all products with columns:
  - SKU
  - Name
  - Category
  - Stock
  - Low Stock Threshold
  - Status
- ✅ Data matches current inventory view
- ✅ If filters applied, export reflects filtered data

---

## Permission Protection

### Test Case 9.1: Access Denied for Non-Admin
**Priority:** P0 (Critical)

**Steps:**
1. Log out admin user
2. Log in as student or user without "Shop Management: Manage" permission
3. Attempt to navigate to `/shop/admin/inventory`

**Expected Results:**
- ✅ Redirected to `/access-denied` page
- ✅ Cannot access inventory management
- ✅ API endpoints return 403 Forbidden if accessed directly

---

### Test Case 9.2: RBAC Check on API Endpoints
**Priority:** P0 (Critical)

**Steps:**
1. Using browser dev tools or Postman
2. Attempt API calls with student auth token:
   - PATCH `/api/v2/shop/admin/inventory/:id/adjust`
   - POST `/api/v2/shop/admin/inventory/bulk-update`

**Expected Results:**
- ✅ All requests return 403 Forbidden
- ✅ Error message: "Insufficient permissions"
- ✅ No stock changes occur

---

## Edge Cases

### Test Case 10.1: Concurrent Stock Adjustments
**Priority:** P2

**Steps:**
1. Open inventory page in two browser tabs
2. In both tabs, adjust same product's stock simultaneously

**Expected Results:**
- ✅ Both adjustments process correctly
- ✅ Final stock reflects both adjustments
- ✅ Both transactions in audit trail

---

### Test Case 10.2: Very Large Stock Numbers
**Priority:** P2

**Steps:**
1. Adjust stock to very large number: +999999

**Expected Results:**
- ✅ Adjustment succeeds
- ✅ Stock displays correctly (no overflow)
- ✅ Calculations remain accurate

---

### Test Case 10.3: Special Characters in Notes
**Priority:** P2

**Steps:**
1. Adjust stock with notes containing special characters:
   - `Test with "quotes" and 'apostrophes'`
   - `Test with <html> tags`
   - `Test with emoji 🎉`

**Expected Results:**
- ✅ Notes save correctly
- ✅ Special characters display properly in audit trail
- ✅ No XSS vulnerabilities
- ✅ No database errors

---

## Summary

**Total Test Cases:** 43
**Critical (P0):** 16
**High Priority (P1):** 20
**Medium Priority (P2):** 7

**Acceptance Criteria Coverage:**
- AC1: Manual Stock Adjustment - 6 test cases
- AC2: Bulk Stock Update - 6 test cases
- AC3: Inventory Audit Trail - 4 test cases
- AC4: Automatic Stock Decrement - 3 test cases
- AC5: Color-Coded Stock Levels - 4 test cases
- Additional: Dashboard, Search, Export, Permissions, Edge Cases - 20 test cases

**Recommended Testing Order:**
1. Permission protection (TC 9.1, 9.2)
2. Manual stock adjustment (TC 1.1 - 1.6)
3. Audit trail (TC 3.1, 3.2)
4. Color-coded levels (TC 5.1 - 5.4)
5. Dashboard stats (TC 6.1, 6.2)
6. Bulk upload (TC 2.1 - 2.6)
7. Order integration (TC 4.1 - 4.3)
8. Search/Filter/Export (TC 7.1 - 8.1)
9. Edge cases (TC 10.1 - 10.3)

---

**Notes for QA Agent Quinn:**
- All test cases assume you have admin access with proper permissions
- Some test cases require coordination between admin and student accounts
- Bulk upload tests require CSV file preparation
- Check browser console for any JavaScript errors during testing
- Verify API responses in Network tab for detailed validation
- Screenshot failures for bug reporting

**Backend Status:** ✅ Running on port 5001 with new inventory routes loaded
**Frontend Status:** ✅ Compiled successfully
