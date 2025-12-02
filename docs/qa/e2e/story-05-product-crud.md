# E2E Test Scenarios - Sprint5-Story-05
# Product CRUD Operations

**Story:** Product CRUD Operations (Admin)
**Tester:** QA Agent Quinn
**Test Date:** October 8, 2025
**Status:** Ready for Testing

---

## Test Environment Setup

**Prerequisites:**
1. Backend running on http://localhost:5001
2. Frontend running on http://localhost:3000
3. Admin user logged in with `shop:manage` permission
4. Test data: At least 5 existing products in database

**Test User Credentials:**
- Username: `tony.loui.thomas@gmail.com`
- Password: `5322148`
- Role: Admin with shop management permissions

**Test Route:**
- URL: http://localhost:3000/shop/admin/products

---

## AC1: Product Creation

### Test Case 1.1: Create Product with All Fields
**Priority:** P0 (Critical)

**Steps:**
1. Navigate to `/shop/admin/products`
2. Click "Create Product" button (purple)
3. Fill in form:
   - SKU: `TEST-QA-001`
   - Name: `QA Test Product`
   - Description: `This is a test product created during QA testing for verification purposes`
   - Category: `stationery`
   - Price: `200`
   - Discount Price: `150`
   - Stock: `100`
   - Low Stock Threshold: `15`
   - Image URL: `https://via.placeholder.com/300x300?text=QA+Test`
   - Active: Checked
4. Click "Create Product"

**Expected Results:**
- ✅ Success toast message appears: "Product created successfully"
- ✅ Modal closes automatically
- ✅ New product appears in the product table (first row if sorted by newest)
- ✅ Product shows SKU: `TEST-QA-001`
- ✅ Product shows discount price (150 coins) with strikethrough original price (200 coins)
- ✅ Product status badge shows "Active" (green)
- ✅ Image preview displays correctly

**API Validation:**
- Backend receives POST to `/api/v2/shop/admin/products`
- Response status: 201 Created
- Response contains product object with all fields

---

### Test Case 1.2: Create Product with Minimum Fields
**Priority:** P0 (Critical)

**Steps:**
1. Click "Create Product"
2. Fill only required fields:
   - SKU: `MIN-TEST-001`
   - Name: `Minimal Test Product`
   - Description: `This product has only the minimum required fields for testing`
   - Category: `books`
   - Price: `50`
3. Leave optional fields empty
4. Click "Create Product"

**Expected Results:**
- ✅ Product created successfully
- ✅ Stock defaults to 0
- ✅ Low Stock Threshold defaults to 10
- ✅ isActive defaults to true
- ✅ No image placeholder shown (package icon)

---

### Test Case 1.3: SKU Uniqueness Validation
**Priority:** P0 (Critical)

**Steps:**
1. Click "Create Product"
2. Enter SKU that already exists: `TEST-QA-001`
3. Fill other required fields
4. Click "Create Product"

**Expected Results:**
- ✅ Error toast message: "SKU already exists"
- ✅ Form remains open
- ✅ User can correct the SKU
- ✅ No duplicate product created in database

---

### Test Case 1.4: Validation - Missing Required Fields
**Priority:** P1 (High)

**Steps:**
1. Click "Create Product"
2. Leave required fields empty
3. Click "Create Product"

**Expected Results:**
- ✅ SKU field shows error: "SKU is required"
- ✅ Name field shows error: "Product name is required"
- ✅ Description field shows error: "Description is required"
- ✅ Price field shows error: "Price must be a positive number"
- ✅ Form does not submit
- ✅ No API call made

---

### Test Case 1.5: Validation - Invalid SKU Format
**Priority:** P1 (High)

**Steps:**
1. Click "Create Product"
2. Enter SKU with lowercase: `test-qa-002`
3. Fill other required fields
4. Click "Create Product"

**Expected Results:**
- ✅ Error message: "SKU must contain only uppercase letters, numbers, and hyphens"
- ✅ Form does not submit

---

### Test Case 1.6: Validation - Discount Price >= Regular Price
**Priority:** P1 (High)

**Steps:**
1. Click "Create Product"
2. Enter Price: `100`
3. Enter Discount Price: `100` (equal)
4. Fill other required fields
5. Click "Create Product"

**Expected Results:**
- ✅ Error message: "Discount price must be less than regular price"
- ✅ Form does not submit

**Repeat with Discount Price: `150` (greater)**
- ✅ Same error message
- ✅ Form does not submit

---

## AC2: Image Upload

### Test Case 2.1: Add Image URL
**Priority:** P1 (High)

**Steps:**
1. In product form, enter Image URL: `https://via.placeholder.com/400x300?text=Test+Image`
2. Observe image preview

**Expected Results:**
- ✅ Image preview displays in modal
- ✅ Preview shows 400x300 placeholder
- ✅ Remove button (X) appears in top-right corner
- ✅ "Change image URL" button appears below preview

---

### Test Case 2.2: Remove Image
**Priority:** P2 (Medium)

**Steps:**
1. Add image URL as in Test 2.1
2. Click remove button (X in top-right)

**Expected Results:**
- ✅ Image preview disappears
- ✅ Upload area reappears
- ✅ Image URL input field reappears
- ✅ Image URL value is cleared

---

### Test Case 2.3: Invalid Image URL
**Priority:** P2 (Medium)

**Steps:**
1. Enter invalid URL: `https://invalid.url/broken.jpg`
2. Observe preview

**Expected Results:**
- ✅ Preview shows placeholder: "Invalid Image URL"
- ✅ Product can still be created
- ✅ Invalid URL is saved to database

---

## AC3: Product Editing

### Test Case 3.1: Edit Existing Product
**Priority:** P0 (Critical)

**Steps:**
1. Find product `TEST-QA-001` in table
2. Click Edit button (blue pencil icon)
3. Observe form pre-fill
4. Change:
   - Name: `QA Test Product (Updated)`
   - Price: `250`
   - Stock: `75`
5. Click "Update Product"

**Expected Results:**
- ✅ Form pre-filled with current values
- ✅ SKU field is disabled (grayed out)
- ✅ Message below SKU: "SKU cannot be changed"
- ✅ Success toast: "Product updated successfully"
- ✅ Modal closes
- ✅ Table updates with new values
- ✅ Updated timestamp changes

**API Validation:**
- PUT request to `/api/v2/shop/admin/products/{productId}`
- Response status: 200 OK
- SKU not included in request body

---

### Test Case 3.2: Edit - Change Active Status
**Priority:** P1 (High)

**Steps:**
1. Edit product `TEST-QA-001`
2. Uncheck "Product is active" checkbox
3. Click "Update Product"

**Expected Results:**
- ✅ Product updated successfully
- ✅ Status badge changes from "Active" (green) to "Inactive" (gray)
- ✅ Product still visible in admin table
- ✅ Product hidden from student shop view (verify at `/shop`)

---

### Test Case 3.3: Edit - Update Image
**Priority:** P2 (Medium)

**Steps:**
1. Edit product without image
2. Add image URL
3. Save changes

**Expected Results:**
- ✅ Image appears in product table
- ✅ Image displayed correctly in row

---

## AC4: Soft Delete

### Test Case 4.1: Delete Product
**Priority:** P0 (Critical)

**Steps:**
1. Find product `MIN-TEST-001` in table
2. Click Delete button (red trash icon)
3. Observe confirmation modal

**Expected Results:**
- ✅ Modal title: "Delete Product"
- ✅ Warning icon (red triangle)
- ✅ Product preview shown (image, name, SKU)
- ✅ Message: "Are you sure you want to delete this product?"
- ✅ Note: "This is a soft delete. The product will be hidden from students but retained in the database."
- ✅ Two buttons: "Cancel" and "Delete Product" (red)

**Continue Steps:**
4. Click "Delete Product"

**Expected Results:**
- ✅ Success toast: "Product deleted successfully"
- ✅ Modal closes
- ✅ Product status changes to "Inactive" in table
- ✅ Product still appears in table (soft delete, not removed)
- ✅ Database record retained with `isActive: false`

**API Validation:**
- DELETE request to `/api/v2/shop/admin/products/{productId}`
- Response status: 200 OK
- Response contains product with `isActive: false`

---

### Test Case 4.2: Cancel Delete
**Priority:** P2 (Medium)

**Steps:**
1. Click Delete on any product
2. Click "Cancel" button

**Expected Results:**
- ✅ Modal closes
- ✅ No changes made to product
- ✅ No API call made

---

## AC5: Filtering and Search

### Test Case 5.1: Search by SKU
**Priority:** P1 (High)

**Steps:**
1. Enter in search box: `TEST-QA`
2. Press Enter or click search

**Expected Results:**
- ✅ Table shows only products with SKU containing "TEST-QA"
- ✅ Results count updates
- ✅ Pagination resets to page 1

---

### Test Case 5.2: Search by Name
**Priority:** P1 (High)

**Steps:**
1. Enter in search box: `Notebook`
2. Press Enter

**Expected Results:**
- ✅ Table shows products with "Notebook" in name
- ✅ Results count updates

---

### Test Case 5.3: Filter by Category
**Priority:** P1 (High)

**Steps:**
1. Select category: `stationery`
2. Observe table

**Expected Results:**
- ✅ Only stationery products shown
- ✅ Results count updates
- ✅ Page resets to 1

---

### Test Case 5.4: Filter by Status (Active)
**Priority:** P1 (High)

**Steps:**
1. Select status filter: `Active`

**Expected Results:**
- ✅ Only active products shown (green badges)
- ✅ Inactive products hidden

---

### Test Case 5.5: Filter by Status (Inactive)
**Priority:** P1 (High)

**Steps:**
1. Select status filter: `Inactive`

**Expected Results:**
- ✅ Only inactive products shown (gray badges)
- ✅ Active products hidden

---

### Test Case 5.6: Combined Filters
**Priority:** P2 (Medium)

**Steps:**
1. Search: `Test`
2. Category: `stationery`
3. Status: `Active`

**Expected Results:**
- ✅ Results match ALL filters (AND logic)
- ✅ Only active stationery products with "Test" in name/SKU/description

---

## AC6: Pagination

### Test Case 6.1: Navigate Pages
**Priority:** P1 (High)

**Prerequisites:** Database has >20 products

**Steps:**
1. Navigate to `/shop/admin/products`
2. Observe pagination controls at bottom
3. Click "Next"

**Expected Results:**
- ✅ Shows "Page 2 of X"
- ✅ Different set of products displayed
- ✅ "Previous" button enabled
- ✅ 20 products per page

**Continue:**
4. Click "Previous"

**Expected Results:**
- ✅ Returns to page 1
- ✅ Original products shown
- ✅ "Previous" button disabled

---

### Test Case 6.2: Last Page
**Priority:** P2 (Medium)

**Steps:**
1. Navigate to last page
2. Observe "Next" button

**Expected Results:**
- ✅ "Next" button disabled
- ✅ Shows remaining products (may be <20)

---

## AC7: Stock Level Indicators

### Test Case 7.1: Low Stock Warning
**Priority:** P1 (High)

**Steps:**
1. Edit a product
2. Set Stock: `5`
3. Set Low Stock Threshold: `10`
4. Save

**Expected Results:**
- ✅ Stock column shows "5"
- ✅ Warning text below: "Low stock" (amber color)

---

### Test Case 7.2: Out of Stock
**Priority:** P1 (High)

**Steps:**
1. Edit a product
2. Set Stock: `0`
3. Save

**Expected Results:**
- ✅ Stock column shows "0"
- ✅ Warning text: "Out of stock" (red color)

---

## AC8: Permission Protection

### Test Case 8.1: Admin Access
**Priority:** P0 (Critical)

**Steps:**
1. Login as admin user (has `shop:manage` permission)
2. Navigate to `/shop/admin/products`

**Expected Results:**
- ✅ Page loads successfully
- ✅ All products displayed
- ✅ "Create Product" button visible
- ✅ Edit/Delete buttons visible

---

### Test Case 8.2: Non-Admin Access (Security Test)
**Priority:** P0 (Critical)

**Steps:**
1. Login as student user (no `shop:manage` permission)
2. Attempt to navigate to `/shop/admin/products`

**Expected Results:**
- ✅ Redirected to `/access-denied` page
- ✅ Or redirected to `/dashboard`
- ✅ No product management page shown
- ✅ No API calls made

**Direct API Test:**
3. Attempt direct API call: `POST /api/v2/shop/admin/products`

**Expected Results:**
- ✅ Response status: 403 Forbidden
- ✅ Error message about permissions
- ✅ No product created

---

## AC9: Error Handling

### Test Case 9.1: Network Error During Create
**Priority:** P2 (Medium)

**Steps:**
1. Open browser DevTools Network tab
2. Set throttling to "Offline"
3. Attempt to create product

**Expected Results:**
- ✅ Error toast appears
- ✅ Form remains open
- ✅ Data not lost
- ✅ User can retry

---

### Test Case 9.2: Network Error During Load
**Priority:** P2 (Medium)

**Steps:**
1. Navigate to page
2. Set network to offline before load completes

**Expected Results:**
- ✅ Error message displayed
- ✅ "Try again" button available
- ✅ Clicking retry refetches data

---

## AC10: UI/UX Compliance

### Test Case 10.1: Design System Compliance
**Priority:** P1 (High)

**Checklist:**
- ✅ Purple buttons for primary actions (`bg-purple-600`)
- ✅ White cards with slate borders
- ✅ Slate-50 background
- ✅ Proper spacing and padding
- ✅ Responsive on mobile (test at 375px width)
- ✅ Lucide React icons used
- ✅ Consistent font sizes and weights
- ✅ Hover states on buttons and table rows

---

### Test Case 10.2: Loading States
**Priority:** P1 (High)

**Steps:**
1. Navigate to `/shop/admin/products`
2. Observe loading state

**Expected Results:**
- ✅ Spinner displayed (purple)
- ✅ Message: "Loading products..."
- ✅ No flash of empty state

---

### Test Case 10.3: Empty State
**Priority:** P2 (Medium)

**Steps:**
1. Apply filters that return no results

**Expected Results:**
- ✅ Message: "No products found"
- ✅ Suggestion: "Try adjusting your filters or create a new product"
- ✅ "Create First Product" button shown

---

## Performance Tests

### Test Case P1: Page Load Time
**Priority:** P2 (Medium)

**Steps:**
1. Clear browser cache
2. Navigate to `/shop/admin/products`
3. Measure time to interactive

**Expected Results:**
- ✅ Page loads in <3 seconds
- ✅ API response time <500ms
- ✅ Smooth rendering (no jank)

---

### Test Case P2: Large Dataset
**Priority:** P2 (Medium)

**Prerequisites:** Database with >100 products

**Steps:**
1. Navigate to page
2. Test pagination
3. Test search

**Expected Results:**
- ✅ Pagination works smoothly
- ✅ Search returns results quickly
- ✅ No performance degradation

---

## Cleanup Test Data

**After Testing:**
1. Delete test products:
   - `TEST-QA-001`
   - `MIN-TEST-001`
2. Verify deletion successful
3. Restore any modified existing products

---

## Test Summary Template

**Total Test Cases:** 38
**Critical (P0):** 9
**High (P1):** 15
**Medium (P2):** 14

**Pass/Fail Criteria:**
- All P0 tests MUST pass
- ≥90% of P1 tests must pass
- ≥80% of P2 tests must pass

**Sign-off:**
- Tester: _________________
- Date: _________________
- Result: PASS / FAIL / BLOCKED

---

**Notes for Quinn:**
- Backend is running on port 5001
- Frontend is running on port 3000
- Use Playwright MCP for browser automation
- Take screenshots of failures
- Document any bugs in separate file
- Test user has shop:manage permission in development mode
