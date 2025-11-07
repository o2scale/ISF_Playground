# E2E Test Scenarios - Story 25: Inline Product Addition for Purchase Requests

**Story ID:** Sprint5-Story-25
**Epic:** Sprint5-Epic-05 (Purchase Manager Workflow)
**Test Type:** End-to-End (E2E) - Playwright Automated + Manual Testing Scenarios
**Created:** 2025-11-07
**Status:** Ready for QA Testing

---

## Test Environment Setup

### Prerequisites
- Backend server running on port 5001
- Frontend server running on port 3000
- Test database with sample data:
  - At least 2 balagruhas (Amma Balagruha, Appa Balagruha)
  - Purchase Manager user with assigned balagruhas
  - Coach user with balagruha assignment
  - Admin user
  - Medical Incharge user
  - Shop products with varying stock levels
  - STOCK inventory category configured

### Test Users
- **Purchase Manager:**
  - Email: purchase.manager@isf.com
  - Role: purchase-manager
  - Access: Can create purchase requests and add products

- **Coach:**
  - Email: coach@isf.com
  - Role: coach
  - Assigned Balagruha: Amma Balagruha
  - Access: Can create purchase requests and add products

- **Medical Incharge:**
  - Email: medical@isf.com
  - Role: medical
  - Access: Can create purchase requests and add products

- **Admin:**
  - Email: admin@isf.com
  - Role: admin
  - Access: Full access, can create and approve requests

### Test Data Requirements
- Existing products in various categories
- STOCK balagruha/location configured
- Sample SKUs: "STAT-001", "SPORTS-005", "BOOK-010"

---

## Test Case 1: "+ Add New Product" Button Visibility (AC1)

**Objective:** Verify "+ Add New Product" button appears and functions correctly

### TC-1.1: Button Visibility After Balagruha Selection
**Playwright Test ID:** `tc-1-1-button-visible-after-balagruha`

**Preconditions:**
- User logged in as Purchase Manager
- On `/purchase` page in Shop Inventory view

**Steps:**
1. Click "+ New Purchase Request" button
2. Create Purchase Request modal opens
3. Do NOT select a balagruha yet
4. Observe product selection area

**Expected Results:**
- ✅ "+ Add New Product" button is NOT visible (balagruha not selected)
- ✅ Product dropdown is disabled

**Steps (continued):**
5. Select "Amma Balagruha" from balagruha dropdown
6. Observe product selection area

**Expected Results:**
- ✅ "+ Add New Product" button becomes visible
- ✅ Button has green background (#28a745)
- ✅ Button text: "+ Add New Product"
- ✅ Button is positioned above "Show all products" checkbox
- ✅ Product dropdown becomes enabled

**Screenshot:** `TC-1.1-button-visible.png`

**Playwright Assertions:**
```javascript
await expect(page.locator('[data-testid="add-new-product-btn"]')).not.toBeVisible();
await page.selectOption('[data-testid="balagruha-select"]', 'Amma Balagruha');
await expect(page.locator('[data-testid="add-new-product-btn"]')).toBeVisible();
await expect(page.locator('[data-testid="add-new-product-btn"]')).toHaveText('+ Add New Product');
```

---

### TC-1.2: Button Click Opens Inline Form
**Playwright Test ID:** `tc-1-2-button-opens-form`

**Preconditions:**
- Create Purchase Request modal open
- Balagruha selected
- "+ Add New Product" button visible

**Steps:**
1. Click "+ Add New Product" button
2. Observe modal content

**Expected Results:**
- ✅ Inline form appears below button
- ✅ Button disappears (replaced by form)
- ✅ Form has blue border (#007bff)
- ✅ Form title: "Add New Product"
- ✅ Form contains 5 fields visible

**Screenshot:** `TC-1.2-inline-form-opened.png`

**Playwright Assertions:**
```javascript
await page.click('[data-testid="add-new-product-btn"]');
await expect(page.locator('[data-testid="inline-product-form"]')).toBeVisible();
await expect(page.locator('[data-testid="add-new-product-btn"]')).not.toBeVisible();
await expect(page.locator('[data-testid="inline-form-title"]')).toHaveText('Add New Product');
```

---

### TC-1.3: Multi-Role Access Verification
**Playwright Test ID:** `tc-1-3-multi-role-access`

**Preconditions:**
- Test across all authorized roles

**Test Matrix:**
| Role | Can See Button | Can Add Product |
|------|---------------|-----------------|
| Purchase Manager | ✅ Yes | ✅ Yes |
| Coach | ✅ Yes | ✅ Yes |
| Medical Incharge | ✅ Yes | ✅ Yes |
| Admin | ✅ Yes | ✅ Yes |
| Student | ❌ No Access | ❌ No Access |

**Steps (for each role):**
1. Login as role
2. Navigate to Purchase Management → Shop Inventory
3. Click "+ New Purchase Request"
4. Select balagruha
5. Verify "+ Add New Product" button visibility

**Expected Results:**
- ✅ All authorized roles see button
- ✅ Unauthorized roles cannot access page

**Screenshot:** `TC-1.3-[role]-button-access.png` (per role)

---

## Test Case 2: Inline Product Addition Form (AC2)

**Objective:** Verify inline form fields, validation, and behavior

### TC-2.1: Form Field Rendering
**Playwright Test ID:** `tc-2-1-form-fields`

**Preconditions:**
- Inline form open

**Steps:**
1. Observe all form fields

**Expected Results:**
- ✅ **Product Name** field:
  - Label: "Product Name *" (asterisk for required)
  - Type: Text input
  - Placeholder: "Enter product name"

- ✅ **Category** field:
  - Label: "Category *"
  - Type: Dropdown
  - Options: stationery, sports, books, uniforms, digital, other
  - Default: stationery

- ✅ **Unit** field:
  - Label: "Unit *"
  - Type: Dropdown
  - Options: pieces, packets, boxes, kg, liters, meters, units, grams, ml, sets, pairs, dozen
  - Default: pieces

- ✅ **SKU** field:
  - Label: "SKU (Optional)"
  - Type: Text input
  - Placeholder: "Leave blank for auto-generation"
  - Helper text: "If left blank, SKU will be auto-generated (NEW-{timestamp})"

- ✅ **Description** field:
  - Label: "Description (Optional)"
  - Type: Textarea
  - Placeholder: "Enter product description"
  - Rows: 2

- ✅ **Action Buttons:**
  - "Create & Add Product" button (blue #007bff)
  - "Cancel" button (gray #6c757d)

**Screenshot:** `TC-2.1-form-all-fields.png`

**Playwright Assertions:**
```javascript
await expect(page.locator('[data-testid="product-name-input"]')).toBeVisible();
await expect(page.locator('[data-testid="category-select"]')).toBeVisible();
await expect(page.locator('[data-testid="unit-select"]')).toBeVisible();
await expect(page.locator('[data-testid="sku-input"]')).toBeVisible();
await expect(page.locator('[data-testid="description-textarea"]')).toBeVisible();
await expect(page.locator('[data-testid="create-product-btn"]')).toHaveText('Create & Add Product');
await expect(page.locator('[data-testid="cancel-product-btn"]')).toHaveText('Cancel');
```

---

### TC-2.2: Form Validation - Empty Required Fields
**Playwright Test ID:** `tc-2-2-validation-required`

**Preconditions:**
- Inline form open

**Steps:**
1. Leave Product Name blank
2. Click "Create & Add Product" button
3. Observe validation

**Expected Results:**
- ✅ Error message appears below Product Name: "Product name is required"
- ✅ Error text in red color
- ✅ Form does NOT close
- ✅ Product NOT added to request

**Steps (continued):**
4. Enter product name: "Pee proof Pants"
5. Keep Category and Unit at defaults
6. Click "Create & Add Product"

**Expected Results:**
- ✅ No validation errors (Category and Unit have defaults)
- ✅ Product created successfully

**Screenshot:** `TC-2.2-validation-errors.png`

**Playwright Assertions:**
```javascript
await page.click('[data-testid="create-product-btn"]');
await expect(page.locator('[data-testid="name-error"]')).toHaveText('Product name is required');
await expect(page.locator('[data-testid="inline-product-form"]')).toBeVisible(); // Form still open
```

---

### TC-2.3: SKU Auto-Generation
**Playwright Test ID:** `tc-2-3-sku-auto-generation`

**Preconditions:**
- Inline form open

**Steps:**
1. Fill Product Name: "Test Auto SKU Product"
2. Select Category: "other"
3. Select Unit: "pieces"
4. Leave SKU field BLANK
5. Click "Create & Add Product"
6. Observe created product in selected items table

**Expected Results:**
- ✅ Product created successfully
- ✅ SKU auto-generated in format: `NEW-{timestamp}`
- ✅ Timestamp is current (13 digits, e.g., NEW-1699264824)
- ✅ Product appears in selected items with generated SKU

**Screenshot:** `TC-2.3-auto-sku.png`

**Playwright Assertions:**
```javascript
await page.fill('[data-testid="product-name-input"]', 'Test Auto SKU Product');
await page.selectOption('[data-testid="category-select"]', 'other');
await page.click('[data-testid="create-product-btn"]');

// Verify SKU matches pattern NEW-{13 digits}
const skuText = await page.locator('[data-testid="product-sku"]').last().textContent();
expect(skuText).toMatch(/^NEW-\d{13}$/);
```

---

### TC-2.4: Manual SKU Entry
**Playwright Test ID:** `tc-2-4-manual-sku`

**Preconditions:**
- Inline form open

**Steps:**
1. Fill Product Name: "Test Manual SKU Product"
2. Select Category: "stationery"
3. Select Unit: "packets"
4. Enter SKU: "CUSTOM-SKU-001"
5. Enter Description: "Custom product for testing"
6. Click "Create & Add Product"

**Expected Results:**
- ✅ Product created with custom SKU: "CUSTOM-SKU-001"
- ✅ Description saved correctly
- ✅ Product appears in selected items table

**Screenshot:** `TC-2.4-manual-sku.png`

**Playwright Assertions:**
```javascript
await page.fill('[data-testid="sku-input"]', 'CUSTOM-SKU-001');
await page.click('[data-testid="create-product-btn"]');

const skuText = await page.locator('[data-testid="product-sku"]').last().textContent();
expect(skuText).toBe('CUSTOM-SKU-001');
```

---

### TC-2.5: Duplicate SKU Validation
**Playwright Test ID:** `tc-2-5-duplicate-sku`

**Preconditions:**
- Existing product with SKU "STAT-001" in database
- Inline form open

**Steps:**
1. Fill Product Name: "Duplicate SKU Test"
2. Enter SKU: "STAT-001" (existing SKU)
3. Click "Create & Add Product"

**Expected Results:**
- ✅ Error alert appears: "SKU already exists. Please use a different SKU."
- ✅ Form remains open
- ✅ Product NOT created
- ✅ Product NOT added to request

**Screenshot:** `TC-2.5-duplicate-sku-error.png`

**Playwright Assertions:**
```javascript
await page.fill('[data-testid="sku-input"]', 'STAT-001');
await page.click('[data-testid="create-product-btn"]');

// Wait for error alert
await page.waitForSelector('.alert-error');
await expect(page.locator('.alert-error')).toContainText('SKU already exists');
```

---

### TC-2.6: Cancel Button Behavior
**Playwright Test ID:** `tc-2-6-cancel-button`

**Preconditions:**
- Inline form open
- Some fields partially filled

**Steps:**
1. Fill Product Name: "Test Cancel"
2. Select Category: "sports"
3. Click "Cancel" button

**Expected Results:**
- ✅ Inline form closes/hides
- ✅ "+ Add New Product" button reappears
- ✅ Form data is cleared (not saved)
- ✅ No product added to request

**Screenshot:** `TC-2.6-cancel-form.png`

**Playwright Assertions:**
```javascript
await page.fill('[data-testid="product-name-input"]', 'Test Cancel');
await page.click('[data-testid="cancel-product-btn"]');

await expect(page.locator('[data-testid="inline-product-form"]')).not.toBeVisible();
await expect(page.locator('[data-testid="add-new-product-btn"]')).toBeVisible();
```

---

## Test Case 3: Product Added to Request Selection (AC3)

**Objective:** Verify new product appears in selected items with badge

### TC-3.1: Product Auto-Add After Creation
**Playwright Test ID:** `tc-3-1-auto-add-product`

**Preconditions:**
- Create Purchase Request modal open
- Balagruha selected
- No products selected yet

**Steps:**
1. Click "+ Add New Product"
2. Fill form:
   - Product Name: "Pee proof Pants"
   - Category: "uniforms"
   - Unit: "pieces"
   - SKU: (leave blank)
   - Description: "For general STOCK inventory"
3. Click "Create & Add Product"
4. Wait for success
5. Observe selected products table

**Expected Results:**
- ✅ Success alert: "New product created successfully! Please fill in quantity and estimated cost."
- ✅ Inline form closes
- ✅ "+ Add New Product" button reappears
- ✅ Product appears in "Selected Products" table
- ✅ Product has orange "NEW PRODUCT" badge next to name
- ✅ Badge color: #ff9800 (orange)
- ✅ Quantity field: 1 (default)
- ✅ Estimated Cost field: 0 (default)
- ✅ Remove button (✖) visible

**Screenshot:** `TC-3.1-product-auto-added.png`

**Playwright Assertions:**
```javascript
await page.fill('[data-testid="product-name-input"]', 'Pee proof Pants');
await page.selectOption('[data-testid="category-select"]', 'uniforms');
await page.click('[data-testid="create-product-btn"]');

// Verify success alert
await expect(page.locator('.alert-success')).toContainText('New product created successfully');

// Verify product in table
await expect(page.locator('[data-testid="selected-product"]').last()).toContainText('Pee proof Pants');
await expect(page.locator('[data-testid="pending-badge"]').last()).toBeVisible();
await expect(page.locator('[data-testid="pending-badge"]').last()).toHaveText('NEW PRODUCT');
```

---

### TC-3.2: Badge Display in Selected Products Table
**Playwright Test ID:** `tc-3-2-badge-in-table`

**Preconditions:**
- Purchase request with both regular and pending products

**Steps:**
1. Create pending product: "New Product A"
2. Add existing product: "Notebook" (existing SKU)
3. Create another pending product: "New Product B"
4. Observe selected products table

**Expected Results:**
- ✅ "New Product A" has "NEW PRODUCT" badge (orange)
- ✅ "Notebook" has NO badge (regular product)
- ✅ "New Product B" has "NEW PRODUCT" badge (orange)
- ✅ Badge styling consistent across all pending products
- ✅ Badge positioned to right of product name

**Screenshot:** `TC-3.2-mixed-products-badges.png`

**Playwright Assertions:**
```javascript
const productRows = await page.locator('[data-testid="selected-product"]').all();
expect(productRows.length).toBe(3);

// First product: pending
await expect(productRows[0].locator('[data-testid="pending-badge"]')).toBeVisible();

// Second product: regular (no badge)
await expect(productRows[1].locator('[data-testid="pending-badge"]')).not.toBeVisible();

// Third product: pending
await expect(productRows[2].locator('[data-testid="pending-badge"]')).toBeVisible();
```

---

### TC-3.3: Remove Pending Product from Selection
**Playwright Test ID:** `tc-3-3-remove-pending-product`

**Preconditions:**
- Purchase request with pending product added

**Steps:**
1. Add pending product: "Test Remove Product"
2. Verify product appears in table with badge
3. Click ✖ remove button for that product
4. Observe table

**Expected Results:**
- ✅ Product removed from selected items table
- ✅ Product count decreases
- ✅ Product still exists in database (not deleted)
- ✅ Can re-add same product via dropdown if needed

**Screenshot:** `TC-3.3-remove-pending.png`

**Playwright Assertions:**
```javascript
const initialCount = await page.locator('[data-testid="selected-product"]').count();
await page.click('[data-testid="remove-product-btn"]').last();
const finalCount = await page.locator('[data-testid="selected-product"]').count();
expect(finalCount).toBe(initialCount - 1);
```

---

### TC-3.4: Multiple Pending Products in Same Request
**Playwright Test ID:** `tc-3-4-multiple-pending-products`

**Preconditions:**
- Create Purchase Request modal open

**Steps:**
1. Click "+ Add New Product"
2. Create product: "Pending Product 1"
3. Click "+ Add New Product" again
4. Create product: "Pending Product 2"
5. Click "+ Add New Product" again
6. Create product: "Pending Product 3"
7. Observe selected products table

**Expected Results:**
- ✅ All 3 products appear in table
- ✅ All 3 have "NEW PRODUCT" badges
- ✅ Each has unique auto-generated SKU
- ✅ Can set quantity/cost independently for each
- ✅ All pending products tracked in request

**Screenshot:** `TC-3.4-multiple-pending.png`

**Playwright Assertions:**
```javascript
const pendingBadges = await page.locator('[data-testid="pending-badge"]').count();
expect(pendingBadges).toBe(3);

// Verify unique SKUs
const skus = await page.locator('[data-testid="product-sku"]').allTextContents();
const uniqueSkus = new Set(skus);
expect(uniqueSkus.size).toBe(skus.length); // All unique
```

---

## Test Case 4: Backend API - Pending Product Creation (AC4)

**Objective:** Verify backend creates pending products correctly

### TC-4.1: API Request Structure
**Playwright Test ID:** `tc-4-1-api-request`

**Preconditions:**
- Network tab open in DevTools

**Steps:**
1. Create pending product via inline form
2. Intercept API request to `POST /api/v2/shop/admin/products/pending`
3. Inspect request payload

**Expected Results:**
- ✅ Request URL: `/api/v2/shop/admin/products/pending`
- ✅ Method: POST
- ✅ Headers include: `Authorization: Bearer {token}`
- ✅ Request body contains:
  ```json
  {
    "name": "Product Name",
    "category": "stationery",
    "unit": "pieces",
    "sku": "CUSTOM-001" // or undefined
    "description": "Description text" // or undefined
  }
  ```

**Playwright Assertions:**
```javascript
await page.route('**/api/v2/shop/admin/products/pending', async route => {
  const request = route.request();
  expect(request.method()).toBe('POST');

  const postData = JSON.parse(request.postData());
  expect(postData).toHaveProperty('name');
  expect(postData).toHaveProperty('category');
  expect(postData).toHaveProperty('unit');

  await route.continue();
});
```

---

### TC-4.2: API Response Structure
**Playwright Test ID:** `tc-4-2-api-response`

**Preconditions:**
- Create pending product

**Steps:**
1. Create product via form
2. Inspect API response

**Expected Results:**
- ✅ Status: 201 Created
- ✅ Response body:
  ```json
  {
    "success": true,
    "message": "Pending product created successfully",
    "product": {
      "_id": "ObjectId",
      "name": "Product Name",
      "sku": "NEW-1699264824",
      "category": "stationery",
      "unit": "pieces",
      "description": "Description",
      "isPendingProduct": true,
      "isActive": false,
      "stock": 0,
      "lowStockThreshold": 0,
      "price": 0,
      "balagruhaId": null,
      "createdBy": "userId",
      "createdInRequest": null,
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
  ```

**Playwright Assertions:**
```javascript
const response = await page.waitForResponse(response =>
  response.url().includes('/api/v2/shop/admin/products/pending') && response.request().method() === 'POST'
);

const json = await response.json();
expect(json.success).toBe(true);
expect(json.product.isPendingProduct).toBe(true);
expect(json.product.isActive).toBe(false);
expect(json.product.stock).toBe(0);
```

---

### TC-4.3: Database Verification
**Playwright Test ID:** `tc-4-3-database-check` (Manual)

**Preconditions:**
- Access to MongoDB

**Steps:**
1. Create pending product: "DB Test Product"
2. Connect to MongoDB
3. Query: `db.shopitems.findOne({ name: "DB Test Product" })`

**Expected Results:**
- ✅ Product exists in database
- ✅ Fields match:
  - `isPendingProduct: true`
  - `isActive: false`
  - `stock: 0`
  - `price: 0`
  - `createdBy: ObjectId (user who created it)`
  - `createdInRequest: null` (not yet added to request)

**Screenshot:** `TC-4.3-database-record.png`

---

## Test Case 5: Purchase Request Linking (AC5)

**Objective:** Verify pending products link to purchase requests

### TC-5.1: Create Request with Pending Product
**Playwright Test ID:** `tc-5-1-request-with-pending`

**Preconditions:**
- Create Purchase Request modal open

**Steps:**
1. Select balagruha: "STOCK"
2. Select category: "Consumables (Including medicines)"
3. Add pending product: "Pee proof Pants"
4. Set quantity: 50
5. Set estimated cost: 150
6. Fill justification: "Required for general STOCK inventory"
7. Click "Create Request"
8. Observe request creation

**Expected Results:**
- ✅ Request created successfully
- ✅ Request ID generated (e.g., "PR001")
- ✅ Success message displayed
- ✅ Modal closes
- ✅ Request appears in purchase requests list

**Screenshot:** `TC-5.1-request-created.png`

**Playwright Assertions:**
```javascript
await page.fill('[data-testid="quantity-input"]', '50');
await page.fill('[data-testid="cost-input"]', '150');
await page.fill('[data-testid="justification-textarea"]', 'Required for general STOCK inventory');
await page.click('[data-testid="create-request-btn"]');

await expect(page.locator('.alert-success')).toContainText('Purchase request created successfully');
```

---

### TC-5.2: Verify Backend Linking
**Playwright Test ID:** `tc-5-2-backend-linking` (Manual)

**Preconditions:**
- Request created with pending product

**Steps:**
1. Note request ID: "PR001"
2. Connect to MongoDB
3. Query pending product: `db.shopitems.findOne({ isPendingProduct: true, name: "Pee proof Pants" })`
4. Check `createdInRequest` field

**Expected Results:**
- ✅ `createdInRequest` field contains ObjectId of "PR001"
- ✅ Link established between product and request

**Screenshot:** `TC-5.2-database-linking.png`

---

### TC-5.3: Request Item Metadata
**Playwright Test ID:** `tc-5-3-request-metadata`

**Preconditions:**
- Request created with pending product

**Steps:**
1. Query purchase request in database
2. Inspect items array

**Expected Results:**
- ✅ Request items array contains:
  ```json
  {
    "productId": "ObjectId",
    "productName": "Pee proof Pants",
    "productSKU": "NEW-1699264824",
    "requestedQuantity": 50,
    "currentStock": 0,
    "lowStockThreshold": 0,
    "estimatedUnitCost": 150,
    "estimatedTotalCost": 7500,
    "isPendingProduct": true  // ← Key flag
  }
  ```

**Screenshot:** `TC-5.3-request-item-metadata.png`

---

## Test Case 6: Product Activation on Fulfillment (AC6)

**Objective:** Verify pending products activate when request is fulfilled

### TC-6.1: Fulfill Request with Pending Product
**Playwright Test ID:** `tc-6-1-fulfill-activation`

**Preconditions:**
- Purchase request "PR001" exists with pending product "Pee proof Pants"
- Request status: "Pending Approval" or "Approved"
- Logged in as Admin/Purchase Manager

**Steps:**
1. Navigate to purchase request "PR001" details
2. Click "Fulfill Request" or equivalent action
3. Enter fulfillment details:
   - Received quantity: 50
   - Actual unit cost: 145
   - Invoice number: "INV-2025-001"
4. Submit fulfillment

**Expected Results:**
- ✅ Request status changes to "Fulfilled" or "Completed"
- ✅ Success message displayed
- ✅ Pending product "Pee proof Pants" activated

**Screenshot:** `TC-6.1-request-fulfilled.png`

**Playwright Assertions:**
```javascript
await page.click('[data-testid="fulfill-request-btn"]');
await page.fill('[data-testid="received-qty-input"]', '50');
await page.fill('[data-testid="actual-cost-input"]', '145');
await page.fill('[data-testid="invoice-input"]', 'INV-2025-001');
await page.click('[data-testid="submit-fulfillment-btn"]');

await expect(page.locator('.alert-success')).toContainText('Request fulfilled successfully');
```

---

### TC-6.2: Verify Product Activation
**Playwright Test ID:** `tc-6-2-product-activated` (Manual)

**Preconditions:**
- Request fulfilled in TC-6.1

**Steps:**
1. Connect to MongoDB
2. Query product: `db.shopitems.findOne({ name: "Pee proof Pants" })`
3. Inspect fields

**Expected Results:**
- ✅ `isPendingProduct: false` (changed from true)
- ✅ `isActive: true` (changed from false)
- ✅ `stock: 50` (set to received quantity)
- ✅ `price: 145` (set to actual unit cost)
- ✅ `lowStockThreshold: 10` (set based on category default)
- ✅ `balagruhaId: ObjectId or "STOCK"` (if not STOCK, set to request's balagruhaId)

**Screenshot:** `TC-6.2-activated-product.png`

---

### TC-6.3: Product Appears in Inventory
**Playwright Test ID:** `tc-6-3-in-inventory`

**Preconditions:**
- Product activated in TC-6.2

**Steps:**
1. Navigate to Inventory Management page
2. Search for "Pee proof Pants"
3. Observe product

**Expected Results:**
- ✅ Product appears in inventory list
- ✅ Product name: "Pee proof Pants"
- ✅ SKU: "NEW-1699264824"
- ✅ Stock: 50
- ✅ Status: Active
- ✅ Category: "uniforms"
- ✅ No "Pending" or "NEW" badge (now regular product)

**Screenshot:** `TC-6.3-product-in-inventory.png`

**Playwright Assertions:**
```javascript
await page.goto('/inventory');
await page.fill('[data-testid="search-input"]', 'Pee proof Pants');

await expect(page.locator('[data-testid="product-row"]')).toContainText('Pee proof Pants');
await expect(page.locator('[data-testid="product-stock"]')).toContainText('50');
await expect(page.locator('[data-testid="product-status"]')).toContainText('Active');
```

---

### TC-6.4: Product Available in Future Requests
**Playwright Test ID:** `tc-6-4-reuse-activated-product`

**Preconditions:**
- Product activated

**Steps:**
1. Create new purchase request
2. Select same balagruha: "STOCK"
3. Open product dropdown
4. Search for "Pee proof Pants"

**Expected Results:**
- ✅ Product appears in dropdown
- ✅ No "NEW" badge (regular product now)
- ✅ Current stock: 50
- ✅ Can select and add to new request

**Screenshot:** `TC-6.4-reuse-product.png`

**Playwright Assertions:**
```javascript
await page.click('[data-testid="product-dropdown"]');
await page.fill('[data-testid="product-search"]', 'Pee proof Pants');

await expect(page.locator('[data-testid="product-option"]')).toContainText('Pee proof Pants');
await expect(page.locator('[data-testid="product-option"] [data-testid="pending-badge"]')).not.toBeVisible();
```

---

## Test Case 7: Pending Products in Dropdown (AC8)

**Objective:** Verify pending products show in product selection with badges

### TC-7.1: Pending Product in Dropdown List
**Playwright Test ID:** `tc-7-1-pending-in-dropdown`

**Preconditions:**
- Pending product "Test Pending A" exists (created but not fulfilled)
- Regular product "Notebook" exists (active)

**Steps:**
1. Create new purchase request
2. Select balagruha
3. Click product dropdown
4. Toggle "Show all products" ON
5. Observe product list

**Expected Results:**
- ✅ "Test Pending A" appears in list
- ✅ "Test Pending A" has small orange "NEW" badge (10px font)
- ✅ Badge positioned next to product name
- ✅ "Notebook" appears WITHOUT badge
- ✅ Both products selectable

**Screenshot:** `TC-7.1-dropdown-badges.png`

**Playwright Assertions:**
```javascript
await page.click('[data-testid="product-dropdown"]');
await page.check('[data-testid="show-all-products"]');

const pendingProduct = page.locator('[data-testid="product-option"]:has-text("Test Pending A")');
await expect(pendingProduct.locator('[data-testid="new-badge"]')).toBeVisible();
await expect(pendingProduct.locator('[data-testid="new-badge"]')).toHaveText('NEW');

const regularProduct = page.locator('[data-testid="product-option"]:has-text("Notebook")');
await expect(regularProduct.locator('[data-testid="new-badge"]')).not.toBeVisible();
```

---

### TC-7.2: Filter Behavior with Pending Products
**Playwright Test ID:** `tc-7-2-filter-pending`

**Preconditions:**
- Pending products exist

**Steps:**
1. Create purchase request for "Amma Balagruha"
2. Open product dropdown
3. Toggle "Show all products" OFF (only low stock)
4. Observe pending products

**Expected Results:**
- ✅ Pending products NOT shown in low stock filter (stock is 0)
- ✅ Toggle "Show all products" ON
- ✅ Pending products appear in full list

**Screenshot:** `TC-7.2-filter-pending.png`

---

### TC-7.3: Search for Pending Products
**Playwright Test ID:** `tc-7-3-search-pending`

**Preconditions:**
- Pending product "Pee proof Pants" exists

**Steps:**
1. Open product dropdown
2. Type in search: "Pee proof"
3. Observe results

**Expected Results:**
- ✅ "Pee proof Pants" appears in search results
- ✅ "NEW" badge visible
- ✅ Can select and add to request

**Screenshot:** `TC-7.3-search-pending.png`

**Playwright Assertions:**
```javascript
await page.fill('[data-testid="product-search"]', 'Pee proof');

const searchResult = page.locator('[data-testid="product-option"]:has-text("Pee proof Pants")');
await expect(searchResult).toBeVisible();
await expect(searchResult.locator('[data-testid="new-badge"]')).toBeVisible();
```

---

## Test Case 8: Edge Cases & Error Handling

**Objective:** Verify system handles edge cases gracefully

### TC-8.1: Rejected Request with Pending Product
**Playwright Test ID:** `tc-8-1-rejected-request`

**Preconditions:**
- Purchase request created with pending product "Rejected Test Product"

**Steps:**
1. Admin/PM rejects the request
2. Query pending product in database

**Expected Results:**
- ✅ Pending product still exists in database
- ✅ `isPendingProduct: true` (unchanged)
- ✅ `isActive: false` (unchanged)
- ✅ `createdInRequest` still points to rejected request
- ✅ Product available for future requests

**Screenshot:** `TC-8.1-rejected-request.png`

---

### TC-8.2: Network Error During Creation
**Playwright Test ID:** `tc-8-2-network-error`

**Preconditions:**
- Simulate network failure

**Steps:**
1. Open inline form
2. Fill product details
3. Disconnect network/simulate 500 error
4. Click "Create & Add Product"

**Expected Results:**
- ✅ Error alert displayed
- ✅ Form remains open
- ✅ User can retry after fixing network

**Playwright Assertions:**
```javascript
await page.route('**/api/v2/shop/admin/products/pending', route =>
  route.abort('failed')
);

await page.click('[data-testid="create-product-btn"]');
await expect(page.locator('.alert-error')).toContainText('Failed to create product');
```

---

### TC-8.3: Concurrent Product Creation
**Playwright Test ID:** `tc-8-3-concurrent-creation`

**Preconditions:**
- Two users creating products simultaneously

**Steps:**
1. User A creates product "Concurrent Test" with SKU "CONC-001"
2. User B simultaneously creates product with SKU "CONC-001"
3. Observe results

**Expected Results:**
- ✅ One user succeeds (first to commit)
- ✅ Other user gets duplicate SKU error
- ✅ Only one product created in database

---

### TC-8.4: Long Product Name
**Playwright Test ID:** `tc-8-4-long-name`

**Preconditions:**
- Inline form open

**Steps:**
1. Enter product name with 101 characters (exceeds 100 char limit)
2. Attempt to create product

**Expected Results:**
- ✅ Validation error or truncation
- ✅ Product name limited to 100 characters

---

### TC-8.5: Special Characters in Product Name
**Playwright Test ID:** `tc-8-5-special-characters`

**Preconditions:**
- Inline form open

**Steps:**
1. Enter product name: "Test & Product <special> "characters""
2. Create product

**Expected Results:**
- ✅ Product created with special characters
- ✅ No XSS vulnerabilities
- ✅ Characters properly escaped in display

---

## Test Case 9: Complete E2E Workflow

**Objective:** Test entire workflow from creation to fulfillment

### TC-9.1: Full Story Workflow
**Playwright Test ID:** `tc-9-1-complete-workflow`

**Preconditions:**
- Clean test environment
- Logged in as Purchase Manager

**Steps:**
1. Navigate to Purchase Management → Shop Inventory
2. Click "+ New Purchase Request"
3. Select balagruha: "STOCK"
4. Select category: "Consumables (Including medicines)"
5. Click "+ Add New Product"
6. Fill inline form:
   - Name: "Complete Workflow Test Product"
   - Category: "other"
   - Unit: "packets"
   - SKU: (leave blank for auto-generation)
   - Description: "E2E test product"
7. Click "Create & Add Product"
8. Verify product added with "NEW PRODUCT" badge
9. Set quantity: 100
10. Set estimated cost: 75
11. Fill justification: "Complete workflow test"
12. Click "Create Request"
13. Verify request created (PR###)
14. Switch to Admin user
15. Navigate to purchase requests
16. Approve request PR###
17. Fulfill request:
    - Received qty: 100
    - Actual cost: 72
    - Invoice: "E2E-TEST-001"
18. Verify product activated
19. Navigate to Inventory Management
20. Search for "Complete Workflow Test Product"
21. Verify product appears as active with stock 100

**Expected Results:**
- ✅ All steps complete without errors
- ✅ Product lifecycle: Pending → Active
- ✅ Request lifecycle: Created → Approved → Fulfilled
- ✅ Product available for future use

**Screenshot:** `TC-9.1-complete-workflow-[step].png` (multiple screenshots)

**Estimated Time:** 5 minutes

---

## Playwright Test Suite Structure

### File Organization
```
tests/
├── e2e/
│   ├── story-25-inline-product-addition/
│   │   ├── 01-button-visibility.spec.js
│   │   ├── 02-inline-form.spec.js
│   │   ├── 03-product-selection.spec.js
│   │   ├── 04-backend-api.spec.js
│   │   ├── 05-request-linking.spec.js
│   │   ├── 06-product-activation.spec.js
│   │   ├── 07-dropdown-badges.spec.js
│   │   ├── 08-edge-cases.spec.js
│   │   └── 09-complete-workflow.spec.js
│   └── fixtures/
│       └── test-users.json
└── playwright.config.js
```

### Example Playwright Test
```javascript
// tests/e2e/story-25-inline-product-addition/01-button-visibility.spec.js
import { test, expect } from '@playwright/test';

test.describe('Story 25 - AC1: "+ Add New Product" Button', () => {
  test.beforeEach(async ({ page }) => {
    // Login as Purchase Manager
    await page.goto('http://localhost:3000/login');
    await page.fill('[data-testid="email-input"]', 'purchase.manager@isf.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-btn"]');

    // Navigate to Purchase Management
    await page.goto('http://localhost:3000/purchase');

    // Switch to Shop Inventory view
    await page.selectOption('[data-testid="purchase-type-dropdown"]', 'shop-inventory');

    // Open Create Purchase Request modal
    await page.click('[data-testid="new-purchase-request-btn"]');
  });

  test('TC-1.1: Button visible after balagruha selection', async ({ page }) => {
    // Button should not be visible initially
    await expect(page.locator('[data-testid="add-new-product-btn"]')).not.toBeVisible();

    // Select balagruha
    await page.selectOption('[data-testid="balagruha-select"]', 'Amma Balagruha');

    // Button should now be visible
    await expect(page.locator('[data-testid="add-new-product-btn"]')).toBeVisible();
    await expect(page.locator('[data-testid="add-new-product-btn"]')).toHaveText('+ Add New Product');

    // Take screenshot
    await page.screenshot({ path: 'screenshots/TC-1.1-button-visible.png' });
  });

  test('TC-1.2: Button click opens inline form', async ({ page }) => {
    // Setup
    await page.selectOption('[data-testid="balagruha-select"]', 'Amma Balagruha');

    // Click button
    await page.click('[data-testid="add-new-product-btn"]');

    // Verify form opens
    await expect(page.locator('[data-testid="inline-product-form"]')).toBeVisible();
    await expect(page.locator('[data-testid="add-new-product-btn"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="inline-form-title"]')).toHaveText('Add New Product');

    // Take screenshot
    await page.screenshot({ path: 'screenshots/TC-1.2-inline-form-opened.png' });
  });
});
```

---

## Test Execution Instructions

### Automated Tests (Playwright)
```bash
# Install Playwright
npm install -D @playwright/test

# Run all Story 25 tests
npx playwright test tests/e2e/story-25-inline-product-addition/

# Run specific test file
npx playwright test tests/e2e/story-25-inline-product-addition/01-button-visibility.spec.js

# Run with UI mode (interactive)
npx playwright test --ui

# Generate HTML report
npx playwright show-report
```

### Manual Tests
- TC-4.3: Database Verification
- TC-5.2: Backend Linking Verification
- TC-6.2: Product Activation Verification
- TC-8.1: Rejected Request Handling

---

## Test Results Summary Template

| Test Case | Status | Pass/Fail | Notes |
|-----------|--------|-----------|-------|
| TC-1.1 | ⏳ Pending | - | Button visibility |
| TC-1.2 | ⏳ Pending | - | Form opens |
| TC-1.3 | ⏳ Pending | - | Multi-role access |
| TC-2.1 | ⏳ Pending | - | Form fields |
| TC-2.2 | ⏳ Pending | - | Validation |
| TC-2.3 | ⏳ Pending | - | Auto SKU |
| TC-2.4 | ⏳ Pending | - | Manual SKU |
| TC-2.5 | ⏳ Pending | - | Duplicate SKU |
| TC-2.6 | ⏳ Pending | - | Cancel button |
| TC-3.1 | ⏳ Pending | - | Auto-add product |
| TC-3.2 | ⏳ Pending | - | Badge display |
| TC-3.3 | ⏳ Pending | - | Remove product |
| TC-3.4 | ⏳ Pending | - | Multiple pending |
| TC-4.1 | ⏳ Pending | - | API request |
| TC-4.2 | ⏳ Pending | - | API response |
| TC-4.3 | ⏳ Pending | - | Database check |
| TC-5.1 | ⏳ Pending | - | Request creation |
| TC-5.2 | ⏳ Pending | - | Backend linking |
| TC-5.3 | ⏳ Pending | - | Request metadata |
| TC-6.1 | ⏳ Pending | - | Fulfillment |
| TC-6.2 | ⏳ Pending | - | Activation |
| TC-6.3 | ⏳ Pending | - | In inventory |
| TC-6.4 | ⏳ Pending | - | Reuse product |
| TC-7.1 | ⏳ Pending | - | Dropdown badges |
| TC-7.2 | ⏳ Pending | - | Filter behavior |
| TC-7.3 | ⏳ Pending | - | Search pending |
| TC-8.1 | ⏳ Pending | - | Rejected request |
| TC-8.2 | ⏳ Pending | - | Network error |
| TC-8.3 | ⏳ Pending | - | Concurrent |
| TC-8.4 | ⏳ Pending | - | Long name |
| TC-8.5 | ⏳ Pending | - | Special chars |
| TC-9.1 | ⏳ Pending | - | Complete workflow |

**Total:** 30 test cases
**Automated:** 27 test cases
**Manual:** 3 test cases

---

## Known Issues & Limitations

### Implementation Gaps
- [ ] No data-testid attributes added to components yet (required for Playwright selectors)
- [ ] Backend validation may need strengthening for edge cases
- [ ] No rate limiting on product creation endpoint

### Testing Gaps
- [ ] Load testing not included (concurrent users)
- [ ] Security testing (XSS, injection) limited
- [ ] Performance testing (response times) not specified

---

## Sign-off

**Test Cases Created By:** Dev Agent (James)
**Date:** 2025-11-07
**Story Status:** Implementation Complete - Ready for QA Testing

**Next Steps:**
1. Add data-testid attributes to components
2. Execute automated Playwright tests
3. Execute manual tests
4. Document bugs in QA Results section
5. Update Story 25 with QA sign-off
