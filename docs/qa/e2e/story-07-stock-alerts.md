# E2E Test Scenarios: Sprint5-Story-07 - Stock Tracking & Alerts

**Story:** Sprint5-Story-07
**Feature:** Stock Tracking & Alerts
**Created:** October 9, 2025 - 3:25 PM
**Test File:** `frontend/tests/e2e/sprint5-story-07.spec.js`
**Total Test Cases:** 21

---

## Test Coverage Overview

| Acceptance Criteria | Test Cases | Priority |
|---------------------|------------|----------|
| AC2: Dashboard Notification | 4 | P0 |
| AC3: Low Stock Report | 6 | P0 |
| AC4: Out of Stock Report | 6 | P0 |
| RBAC Protection | 3 | P0 |
| Integration Tests | 2 | P1 |

---

## AC2: Dashboard Notification Banners (4 Tests)

### TC 2.1: Display Low Stock Alert Banner
**Priority:** P0
**Type:** UI Validation

**Preconditions:**
- User logged in as admin (Tony)
- At least one product with stock <= lowStockThreshold exists

**Steps:**
1. Navigate to `/shop/admin/inventory`
2. Wait for page load
3. Check Low Stock Items stat card for count > 0

**Expected Results:**
- ✅ Orange alert banner visible with "low on stock" text
- ✅ Banner shows count of low stock products
- ✅ "Click to view low stock products" message displayed
- ✅ "View Report" button visible
- ✅ Banner has orange background with left border

**Actual Results:**
- [To be filled during QA]

---

### TC 2.2: Display Out of Stock Alert Banner
**Priority:** P0
**Type:** UI Validation

**Preconditions:**
- User logged in as admin
- At least one product with stock = 0 exists

**Steps:**
1. Navigate to `/shop/admin/inventory`
2. Wait for page load
3. Check Out of Stock stat card for count > 0

**Expected Results:**
- ✅ Red alert banner visible with "out of stock" text
- ✅ Banner shows count of out of stock products
- ✅ "restock immediately" message displayed
- ✅ "View Report" button visible
- ✅ Banner has red background with left border

**Actual Results:**
- [To be filled during QA]

---

### TC 2.3: Navigate to Low Stock Report via Banner
**Priority:** P0
**Type:** Navigation

**Preconditions:**
- User logged in as admin
- Low stock alert banner visible

**Steps:**
1. Navigate to `/shop/admin/inventory`
2. Click anywhere on low stock alert banner

**Expected Results:**
- ✅ URL changes to `/shop/admin/inventory/low-stock`
- ✅ Low Stock Alert page loads
- ✅ Page header shows "Low Stock Alert"

**Actual Results:**
- [To be filled during QA]

---

### TC 2.4: Navigate to Out of Stock Report via Banner
**Priority:** P0
**Type:** Navigation

**Preconditions:**
- User logged in as admin
- Out of stock alert banner visible

**Steps:**
1. Navigate to `/shop/admin/inventory`
2. Click anywhere on out of stock alert banner

**Expected Results:**
- ✅ URL changes to `/shop/admin/inventory/out-of-stock`
- ✅ Out of Stock page loads
- ✅ Page header shows "Out of Stock"

**Actual Results:**
- [To be filled during QA]

---

## AC3: Low Stock Report (6 Tests)

### TC 3.1: Low Stock Report Page Structure
**Priority:** P0
**Type:** UI Validation

**Preconditions:**
- User logged in as admin

**Steps:**
1. Navigate to `/shop/admin/inventory/low-stock`
2. Wait for page load

**Expected Results:**
- ✅ Page header shows "Low Stock Alert" with AlertTriangle icon
- ✅ Back button visible (arrow icon)
- ✅ Refresh button visible with "Refresh" text
- ✅ Description text: "Products with stock at or below threshold"

**Actual Results:**
- [To be filled during QA]

---

### TC 3.2: Low Stock Products Table Display
**Priority:** P0
**Type:** Data Display

**Preconditions:**
- User logged in as admin
- At least one product with stock <= lowStockThreshold exists

**Steps:**
1. Navigate to `/shop/admin/inventory/low-stock`
2. Wait for products to load

**Expected Results:**
- ✅ Table displayed with 6 columns:
  - Product (with image/placeholder, name, price)
  - SKU (monospace font)
  - Category (badge)
  - Current Stock (bold, colored)
  - Threshold
  - Actions (Adjust Stock button)
- ✅ All low stock products displayed
- ✅ Products sorted by stock level (lowest first)

**Empty State (if no low stock products):**
- ✅ Green checkmark icon displayed
- ✅ Message: "All Stock Levels Healthy"
- ✅ Subtext: "No products are currently below their low stock threshold"

**Actual Results:**
- [To be filled during QA]

---

### TC 3.3: Color-Coded Stock Levels
**Priority:** P0
**Type:** UI Validation

**Preconditions:**
- User logged in as admin
- Products with varying stock levels exist

**Steps:**
1. Navigate to `/shop/admin/inventory/low-stock`
2. Observe row background colors and stock text colors

**Expected Results:**
- ✅ Stock = 0: Red background (`bg-red-50`), red text
- ✅ Stock <= threshold * 0.5: Orange background (`bg-orange-50`), orange text
- ✅ Stock <= threshold: Yellow background (`bg-yellow-50`), yellow text
- ✅ AlertTriangle icon shown for stock = 0

**Actual Results:**
- [To be filled during QA]

---

### TC 3.4: Open Stock Adjustment Modal
**Priority:** P0
**Type:** Modal Interaction

**Preconditions:**
- User logged in as admin
- At least one low stock product visible

**Steps:**
1. Navigate to `/shop/admin/inventory/low-stock`
2. Click "Adjust Stock" button on any product

**Expected Results:**
- ✅ Modal overlay appears (dark background)
- ✅ Stock Adjustment Modal opens
- ✅ Modal shows product details
- ✅ Close button (X) visible
- ✅ Form fields for adjustment displayed

**Actual Results:**
- [To be filled during QA]

---

### TC 3.5: Refresh Data Functionality
**Priority:** P1
**Type:** Data Refresh

**Preconditions:**
- User logged in as admin
- On low stock report page

**Steps:**
1. Navigate to `/shop/admin/inventory/low-stock`
2. Click "Refresh" button

**Expected Results:**
- ✅ Loading spinner appears briefly
- ✅ Data reloads from API
- ✅ Table updates with current stock levels
- ✅ No errors in console

**Actual Results:**
- [To be filled during QA]

---

### TC 3.6: Back Button Navigation
**Priority:** P0
**Type:** Navigation

**Preconditions:**
- User logged in as admin
- On low stock report page

**Steps:**
1. Navigate to `/shop/admin/inventory/low-stock`
2. Click back button (arrow icon, top left)

**Expected Results:**
- ✅ URL changes to `/shop/admin/inventory`
- ✅ Inventory Management dashboard loads
- ✅ Stats and alert banners visible

**Actual Results:**
- [To be filled during QA]

---

## AC4: Out of Stock Report (6 Tests)

### TC 4.1: Out of Stock Report Page Structure
**Priority:** P0
**Type:** UI Validation

**Preconditions:**
- User logged in as admin

**Steps:**
1. Navigate to `/shop/admin/inventory/out-of-stock`
2. Wait for page load

**Expected Results:**
- ✅ Page header shows "Out of Stock" with XCircle icon
- ✅ Back button visible
- ✅ Refresh button visible with "Refresh" text
- ✅ Description text: "Products with zero inventory"

**Actual Results:**
- [To be filled during QA]

---

### TC 4.2: Out of Stock Products Table Display
**Priority:** P0
**Type:** Data Display

**Preconditions:**
- User logged in as admin
- At least one product with stock = 0 exists

**Steps:**
1. Navigate to `/shop/admin/inventory/out-of-stock`
2. Wait for products to load

**Expected Results:**
- ✅ Table displayed with 6 columns:
  - Product (with image/placeholder, name, price)
  - SKU (monospace font)
  - Category (badge)
  - Stock (shows "0" with XCircle icon)
  - Last Updated (clock icon + timestamp)
  - Actions (Restock Now button)
- ✅ All out of stock products displayed
- ✅ Products sorted by name alphabetically

**Empty State (if no out of stock products):**
- ✅ Green checkmark icon displayed
- ✅ Message: "All Products In Stock"
- ✅ Subtext: "No products are currently out of stock"

**Actual Results:**
- [To be filled during QA]

---

### TC 4.3: Red Background for All Products
**Priority:** P0
**Type:** UI Validation

**Preconditions:**
- User logged in as admin
- Out of stock products exist

**Steps:**
1. Navigate to `/shop/admin/inventory/out-of-stock`
2. Observe table row backgrounds

**Expected Results:**
- ✅ All rows have red background (`bg-red-50`)
- ✅ Hover effect changes to darker red (`hover:bg-red-100`)
- ✅ Stock column shows "0" in red text with XCircle icon

**Actual Results:**
- [To be filled during QA]

---

### TC 4.4: Open Restock Modal
**Priority:** P0
**Type:** Modal Interaction

**Preconditions:**
- User logged in as admin
- At least one out of stock product visible

**Steps:**
1. Navigate to `/shop/admin/inventory/out-of-stock`
2. Click "Restock Now" button on any product

**Expected Results:**
- ✅ Modal overlay appears
- ✅ Stock Adjustment Modal opens (same as low stock modal)
- ✅ Modal shows product with stock = 0
- ✅ Form allows positive adjustments to restock

**Actual Results:**
- [To be filled during QA]

---

### TC 4.5: Last Updated Timestamp Display
**Priority:** P1
**Type:** UI Validation

**Preconditions:**
- User logged in as admin
- Out of stock products exist

**Steps:**
1. Navigate to `/shop/admin/inventory/out-of-stock`
2. Check Last Updated column for each product

**Expected Results:**
- ✅ Clock icon visible
- ✅ Timestamp formatted as: "Mon DD, YYYY, HH:MM AM/PM"
- ✅ Timestamp reflects actual last update from database

**Actual Results:**
- [To be filled during QA]

---

### TC 4.6: Back Button Navigation
**Priority:** P0
**Type:** Navigation

**Preconditions:**
- User logged in as admin
- On out of stock report page

**Steps:**
1. Navigate to `/shop/admin/inventory/out-of-stock`
2. Click back button (arrow icon, top left)

**Expected Results:**
- ✅ URL changes to `/shop/admin/inventory`
- ✅ Inventory Management dashboard loads
- ✅ Stats and alert banners visible

**Actual Results:**
- [To be filled during QA]

---

## RBAC Protection (3 Tests)

### TC 5.1: Low Stock Report Authentication Required
**Priority:** P0
**Type:** Security

**Preconditions:**
- User logged out

**Steps:**
1. Navigate directly to `/shop/admin/inventory/low-stock`

**Expected Results:**
- ✅ User redirected to `/login` or `/access-denied`
- ✅ Cannot view low stock report without authentication

**Actual Results:**
- [To be filled during QA]

---

### TC 5.2: Out of Stock Report Authentication Required
**Priority:** P0
**Type:** Security

**Preconditions:**
- User logged out

**Steps:**
1. Navigate directly to `/shop/admin/inventory/out-of-stock`

**Expected Results:**
- ✅ User redirected to `/login` or `/access-denied`
- ✅ Cannot view out of stock report without authentication

**Actual Results:**
- [To be filled during QA]

---

### TC 5.3: Shop Management Permission Required
**Priority:** P0
**Type:** Authorization

**Preconditions:**
- User logged in with "Shop Management: Manage" permission

**Steps:**
1. Navigate to `/shop/admin/inventory/low-stock`
2. Navigate to `/shop/admin/inventory/out-of-stock`

**Expected Results:**
- ✅ Both pages load successfully
- ✅ User can view and interact with reports
- ✅ No access denied errors

**Future Test (Non-Admin User):**
- User without "Shop Management: Manage" permission should be redirected to `/access-denied`

**Actual Results:**
- [To be filled during QA]

---

## Integration Tests (2 Tests)

### TC 6.1: Alert Banners Update After Stock Adjustment
**Priority:** P1
**Type:** End-to-End Integration

**Preconditions:**
- User logged in as admin
- At least one low stock product exists

**Steps:**
1. Navigate to `/shop/admin/inventory`
2. Note low stock count in stats card
3. Navigate to `/shop/admin/inventory/low-stock`
4. Click "Adjust Stock" on a product
5. Increase stock above threshold
6. Save adjustment
7. Navigate back to `/shop/admin/inventory`

**Expected Results:**
- ✅ Low stock count decreases by 1
- ✅ Alert banner updates automatically
- ✅ If count reaches 0, banner disappears

**Actual Results:**
- [To be filled during QA]

---

### TC 6.2: Summary Banner Count Matches Table Rows
**Priority:** P0
**Type:** Data Consistency

**Preconditions:**
- User logged in as admin
- Low stock products exist

**Steps:**
1. Navigate to `/shop/admin/inventory/low-stock`
2. Read count from orange summary banner
3. Count visible rows in table

**Expected Results:**
- ✅ Banner count matches table row count exactly
- ✅ Count format: "X product(s) need attention"

**Repeat for Out of Stock:**
1. Navigate to `/shop/admin/inventory/out-of-stock`
2. Read count from red summary banner
3. Count visible rows in table

**Expected Results:**
- ✅ Banner count matches table row count exactly
- ✅ Count format: "X product(s) out of stock"

**Actual Results:**
- [To be filled during QA]

---

## Test Execution Summary

**Total Test Cases:** 21
**Automated:** 21
**Manual:** 0

**By Priority:**
- P0 (Critical): 18 tests
- P1 (High): 3 tests

**By Type:**
- UI Validation: 8 tests
- Navigation: 4 tests
- Data Display: 2 tests
- Modal Interaction: 2 tests
- Security/RBAC: 3 tests
- Integration: 2 tests

---

## Running the Tests

```bash
# Run all Story-07 tests
cd frontend
npx playwright test tests/e2e/sprint5-story-07.spec.js

# Run specific test suite
npx playwright test tests/e2e/sprint5-story-07.spec.js -g "AC2: Dashboard Notification"

# Run with headed browser
npx playwright test tests/e2e/sprint5-story-07.spec.js --headed

# Run with debugging
npx playwright test tests/e2e/sprint5-story-07.spec.js --debug
```

---

## Notes for QA

1. **Test Data Requirements:**
   - Ensure database has products with varying stock levels:
     - At least 2-3 products with stock = 0
     - At least 2-3 products with stock <= lowStockThreshold
     - At least 2-3 products with stock > lowStockThreshold

2. **Color Coding Verification:**
   - Red: stock = 0
   - Orange: stock <= threshold * 0.5
   - Yellow: stock <= threshold but > threshold * 0.5

3. **API Endpoints to Monitor:**
   - `GET /api/v2/shop/admin/inventory` - Dashboard stats
   - `GET /api/v2/shop/admin/inventory/low-stock` - Low stock products
   - `GET /api/v2/shop/admin/inventory/out-of-stock` - Out of stock products
   - `PATCH /api/v2/shop/admin/inventory/:id/adjust` - Stock adjustments

4. **Performance:**
   - Report pages should load within 2 seconds
   - Refresh should complete within 1 second
   - Modal should open within 500ms

5. **Browser Compatibility:**
   - Chrome (primary)
   - Firefox
   - Safari
   - Edge

---

**Test Plan Created:** October 9, 2025 - 3:25 PM
**Created By:** Dev Agent James
**Status:** Ready for QA Execution
