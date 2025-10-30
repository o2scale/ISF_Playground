# 🚀 Dev Agent Handoff - Story 17 Enhancement: Multi-Product Purchase Requests

**Handoff Date:** 2025-10-29 20:09:07
**From:** QA Agent (Quinn)
**To:** Dev Agent (James)
**Priority:** 🔴 HIGH - Major Feature Enhancement
**Estimated Effort:** 2-3 days development

---

## 📋 Executive Summary

After initial QA testing, stakeholder requested **major enhancement** to Story 17:

**Current State:** Single product per purchase request
**Requested:** Multiple products per request + manual cost entry + file uploads

**Impact:** Stories 17, 18, and 19 require significant rework

---

## 🎯 What You Need to Build

### 1. Multi-Product Selection (Checkbox List)
```
Current: Dropdown - select ONE product
New:     Checkbox list - select MULTIPLE products
         Toggle: "Show All Products" / "Low Stock Only"
```

### 2. Cost Entry Table
```
Table format:
Product Name | Quantity | Unit Cost (₹) | Total (₹) | Actions
Notebook     | [100]    | [450]         | 45,000    | [Remove]
Pen          | [50]     | [20]          | 1,000     | [Remove]
                                Total: ₹46,000
```

### 3. File Upload
```
Support: PDF, JPG, PNG (max 10MB, max 5 files)
Display: File name, size, remove button
Backend: Save to /uploads/purchase-requests/:requestId/
```

### 4. Data Model Change
```
PurchaseRequest:
  - Remove: productId, productName, requestedQuantity (single)
  - Add: items[] (array of products)
  - Add: attachments[] (array of files)
  - Add: totalEstimatedCost (calculated)
```

---

## 📂 Files You Need to Modify

### Backend (7 files)
```
✏️ backend/models/purchaseRequest.js - Complete model rewrite
✏️ backend/controllers/purchaseRequestController.js - Update all functions
✏️ backend/routes/v2/purchase-requests.js - No changes needed
🆕 backend/routes/v2/purchase-request-files.js - NEW file upload route
✏️ backend/middleware/validation/purchaseRequestValidation.js - Update validation
✏️ backend/server.js - Register file upload route
📦 backend/package.json - Add multer dependency
```

### Frontend (4 files)
```
✏️ frontend/src/components/purchaseManagement/modals/CreatePurchaseRequestModal.jsx - Complete redesign
✏️ frontend/src/components/purchaseManagement/modals/ApproveRequestModal.jsx - Show multi-product
✏️ frontend/src/components/purchaseManagement/modals/UpdateStockModal.jsx - Atomic multi-update
✏️ frontend/src/api.js - Add file upload function
```

### Documentation (2 files)
```
✏️ docs/stories/sprint5/sprint5-story-17-purchase-request-creation.md - Update ACs
✏️ docs/qa/e2e/sprint5-story-17-purchase-request-creation.md - Add 30 new test cases
```

---

## 🏗️ Implementation Steps (In Order)

### STEP 1: Install Dependencies (5 min)
```bash
cd backend
npm install multer --save

# Verify installation
npm list multer
```

### STEP 2: Update PurchaseRequest Model (30 min)

**File:** `backend/models/purchaseRequest.js`

**Action:** Complete rewrite - see detailed spec in `.ai/sprint-5-purchase-manager/STORY-17-ENHANCEMENT-PLAN.md` section "Data Model Changes"

**Key Changes:**
```javascript
// Remove these fields:
productId, productName, productSKU,
requestedQuantity, currentStock, lowStockThreshold

// Add these:
items: [
  {
    productId, productName, productSKU,
    requestedQuantity, currentStock, lowStockThreshold,
    estimatedUnitCost, estimatedTotalCost
  }
],

attachments: [
  {
    filename, filepath, fileType, fileSize,
    uploadedAt, uploadedBy
  }
]

// Add virtuals:
totalItems, totalQuantity, totalEstimatedCost
```

**⚠️ CRITICAL:** Validate items array has at least 1 item

---

### STEP 3: Create File Upload Route (45 min)

**File:** `backend/routes/v2/purchase-request-files.js` (NEW FILE)

**Copy from:** `.ai/sprint-5-purchase-manager/STORY-17-ENHANCEMENT-PLAN.md` section "File Upload Infrastructure"

**Key Points:**
- Use multer for multipart uploads
- Max 5 files per request
- Max 10MB per file
- Allowed: PDF, JPG, JPEG, PNG
- Save to: `/uploads/purchase-requests/:requestId/`
- Validate ownership (only requester can upload)

**Endpoint:**
```
POST /api/v2/shop/admin/purchase-requests/:id/files
Authorization: Bearer <token>
Content-Type: multipart/form-data
Body: files[] (array of files)
```

**Register in server.js:**
```javascript
const purchaseRequestFilesRoutes = require('./routes/v2/purchase-request-files');
app.use('/api/v2/shop/admin/purchase-requests', purchaseRequestFilesRoutes);
```

---

### STEP 4: Update createPurchaseRequest Controller (90 min)

**File:** `backend/controllers/purchaseRequestController.js`

**Function:** `createPurchaseRequest()`

**Changes:**
1. Accept `items[]` array instead of single product
2. Validate each item
3. Fetch product snapshots for each item
4. Calculate `estimatedTotalCost` per item
5. Validate balagruha access for each product
6. Create request with items array
7. Files are uploaded separately (not in this function)

**Pseudo-code:**
```javascript
exports.createPurchaseRequest = async (req, res) => {
  const { balagruhaId, items, reason, justification } = req.body;

  // Validate items
  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'At least one product required' });
  }

  // Validate and snapshot each item
  const validatedItems = [];
  for (const item of items) {
    const product = await ShopItem.findById(item.productId);
    if (!product) {
      return res.status(404).json({ message: `Product ${item.productId} not found` });
    }

    // Check balagruha access
    if (user.role === 'purchase-manager') {
      if (product.balagruhaId && !user.balagruhaIds.includes(product.balagruhaId)) {
        return res.status(403).json({ message: `No access to ${product.name}` });
      }
    }

    validatedItems.push({
      productId: product._id,
      productName: product.name,
      productSKU: product.sku,
      requestedQuantity: item.requestedQuantity,
      currentStock: product.stock,
      lowStockThreshold: product.lowStockThreshold,
      estimatedUnitCost: item.estimatedUnitCost,
      estimatedTotalCost: item.requestedQuantity * item.estimatedUnitCost
    });
  }

  // Create request
  const purchaseRequest = new PurchaseRequest({
    balagruhaId,
    items: validatedItems,
    reason,
    justification,
    requestedBy: user._id,
    status: 'pending_approval',
    attachments: []
  });

  await purchaseRequest.save();

  res.status(201).json({
    success: true,
    data: { purchaseRequest }
  });
};
```

---

### STEP 5: Update Validation Middleware (15 min)

**File:** `backend/middleware/validation/purchaseRequestValidation.js`

**Function:** `validateCreateRequest()`

**Changes:**
```javascript
exports.validateCreateRequest = (req, res, next) => {
  const { balagruhaId, items, reason } = req.body;

  // Validate balagruhaId
  if (!balagruhaId || !mongoose.Types.ObjectId.isValid(balagruhaId)) {
    return res.status(400).json({ message: 'Valid balagruha ID required' });
  }

  // Validate items array
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'At least one item required' });
  }

  // Validate each item
  for (const item of items) {
    if (!item.productId || !mongoose.Types.ObjectId.isValid(item.productId)) {
      return res.status(400).json({ message: 'Valid product ID required for all items' });
    }

    if (!item.requestedQuantity || item.requestedQuantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1 for all items' });
    }

    if (!item.estimatedUnitCost || item.estimatedUnitCost < 0) {
      return res.status(400).json({ message: 'Unit cost must be >= 0 for all items' });
    }
  }

  // Validate reason
  if (!reason || reason.trim().length === 0) {
    return res.status(400).json({ message: 'Reason is required' });
  }

  next();
};
```

---

### STEP 6: Frontend - Redesign CreatePurchaseRequestModal (3-4 hours)

**File:** `frontend/src/components/purchaseManagement/modals/CreatePurchaseRequestModal.jsx`

**Changes:** COMPLETE REDESIGN

**New State Structure:**
```javascript
const [formData, setFormData] = useState({
  balagruhaId: '',
  items: [],  // { productId, productName, requestedQuantity, estimatedUnitCost }
  reason: '',
  justification: ''
});

const [products, setProducts] = useState([]);
const [selectedProducts, setSelectedProducts] = useState(new Set());
const [showAllProducts, setShowAllProducts] = useState(false);
const [files, setFiles] = useState([]);
```

**UI Components:**

#### 1. Product Checklist
```jsx
<div className="product-selection">
  <label>
    <input
      type="checkbox"
      checked={showAllProducts}
      onChange={(e) => setShowAllProducts(e.target.checked)}
    />
    Show all products (not just low stock)
  </label>

  <div className="product-checklist">
    {products
      .filter(p => showAllProducts || p.stock <= p.lowStockThreshold)
      .map(product => (
        <label key={product._id} className="product-checkbox">
          <input
            type="checkbox"
            checked={selectedProducts.has(product._id)}
            onChange={() => handleProductToggle(product)}
          />
          <span className="product-info">
            {product.name} ({product.sku})
          </span>
          <span className="stock-info">
            Stock: {product.stock}/{product.lowStockThreshold}
            {product.stock === 0 && <span className="badge out">🔴 Out</span>}
            {product.stock > 0 && product.stock <= product.lowStockThreshold && (
              <span className="badge low">⚠️ Low</span>
            )}
          </span>
        </label>
      ))}
  </div>
</div>
```

#### 2. Selected Products Table
```jsx
{formData.items.length > 0 && (
  <div className="selected-products">
    <h4>Selected Products ({formData.items.length})</h4>
    <table className="items-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Unit Cost (₹)</th>
          <th>Total (₹)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {formData.items.map((item, index) => (
          <tr key={item.productId}>
            <td>{item.productName}</td>
            <td>
              <input
                type="number"
                value={item.requestedQuantity}
                onChange={(e) => updateItemQuantity(index, parseInt(e.target.value))}
                min="1"
                required
              />
            </td>
            <td>
              <input
                type="number"
                value={item.estimatedUnitCost}
                onChange={(e) => updateItemCost(index, parseFloat(e.target.value))}
                min="0"
                step="0.01"
                required
              />
            </td>
            <td className="total">
              ₹{(item.requestedQuantity * item.estimatedUnitCost).toFixed(2)}
            </td>
            <td>
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeItem(index)}
              >
                ✖
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="total-row">
          <td colSpan="3"><strong>Total Estimated Cost:</strong></td>
          <td colSpan="2">
            <strong className="total-amount">
              ₹{calculateTotalCost().toFixed(2)}
            </strong>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
)}
```

#### 3. File Upload Widget
```jsx
<div className="file-upload-section">
  <label>Upload Supporting Documents (Optional)</label>
  <input
    type="file"
    multiple
    accept=".pdf,.jpg,.jpeg,.png"
    onChange={handleFileChange}
    ref={fileInputRef}
  />
  <p className="help-text">
    PDF or images only. Max 5 files, 10MB each.
  </p>

  {files.length > 0 && (
    <ul className="file-list">
      {files.map((file, index) => (
        <li key={index} className="file-item">
          <span className="file-icon">📎</span>
          <span className="file-name">{file.name}</span>
          <span className="file-size">({(file.size / 1024).toFixed(2)} KB)</span>
          <button
            type="button"
            className="remove-file-btn"
            onClick={() => removeFile(index)}
          >
            ✖
          </button>
        </li>
      ))}
    </ul>
  )}
</div>
```

**Key Functions:**

```javascript
const handleProductToggle = (product) => {
  const newSelected = new Set(selectedProducts);

  if (newSelected.has(product._id)) {
    // Remove from selection
    newSelected.delete(product._id);
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.productId !== product._id)
    }));
  } else {
    // Add to selection
    newSelected.add(product._id);
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, {
        productId: product._id,
        productName: product.name,
        requestedQuantity: 1,  // Default quantity
        estimatedUnitCost: 0   // User must fill
      }]
    }));
  }

  setSelectedProducts(newSelected);
};

const calculateTotalCost = () => {
  return formData.items.reduce((sum, item) => {
    return sum + (item.requestedQuantity * item.estimatedUnitCost);
  }, 0);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate
  if (!formData.balagruhaId) {
    showToast('Please select a balagruha', 'error');
    return;
  }

  if (formData.items.length === 0) {
    showToast('Please select at least one product', 'error');
    return;
  }

  // Validate all items have quantity and cost
  const invalidItems = formData.items.filter(
    item => !item.requestedQuantity || item.requestedQuantity < 1 ||
            item.estimatedUnitCost === 0 || item.estimatedUnitCost < 0
  );

  if (invalidItems.length > 0) {
    showToast('Please enter quantity and cost for all selected products', 'error');
    return;
  }

  if (!formData.reason.trim()) {
    showToast('Please provide a reason', 'error');
    return;
  }

  try {
    setLoading(true);

    // Create purchase request
    const response = await createPurchaseRequest({
      balagruhaId: formData.balagruhaId,
      items: formData.items,
      reason: formData.reason.trim(),
      justification: formData.justification.trim()
    });

    if (response.success) {
      const requestId = response.data.purchaseRequest._id;

      // Upload files if any
      if (files.length > 0) {
        const fileFormData = new FormData();
        files.forEach(file => fileFormData.append('files', file));

        const uploadResponse = await uploadRequestFiles(requestId, fileFormData);
        if (!uploadResponse.success) {
          showToast('Warning: Files upload failed', 'warning');
        }
      }

      showToast('Purchase request created successfully', 'success');
      onSuccess();
    } else {
      showToast(response.message || 'Error creating request', 'error');
    }
  } catch (error) {
    console.error('Error creating request:', error);
    showToast('Error creating request', 'error');
  } finally {
    setLoading(false);
  }
};
```

---

### STEP 7: Frontend - Update API Functions (15 min)

**File:** `frontend/src/api.js`

**Add new function:**
```javascript
// Upload files to purchase request
export const uploadRequestFiles = async (requestId, formData) => {
  try {
    const response = await axios.post(
      `/api/v2/shop/admin/purchase-requests/${requestId}/files`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
};

// Update existing createPurchaseRequest to accept items array
export const createPurchaseRequest = async (requestData) => {
  try {
    // requestData now contains: { balagruhaId, items[], reason, justification }
    const response = await axios.post(
      '/api/v2/shop/admin/purchase-requests',
      requestData
    );
    return response.data;
  } catch (error) {
    console.error('Error creating purchase request:', error);
    throw error;
  }
};
```

---

### STEP 8: Story 18 - Update Admin Approval Modal (2 hours)

**File:** `frontend/src/components/purchaseManagement/modals/ApproveRequestModal.jsx`

**Changes:**
- Display **table of items** instead of single product info
- Show **total estimated cost** prominently
- Display **attached files** with download links

**Add to modal:**
```jsx
{/* Items Table */}
<div className="request-items">
  <h4>Products Requested ({request.totalItems})</h4>
  <table className="items-table">
    <thead>
      <tr>
        <th>Product</th>
        <th>SKU</th>
        <th>Quantity</th>
        <th>Unit Cost</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {request.items.map(item => (
        <tr key={item.productId}>
          <td>{item.productName}</td>
          <td>{item.productSKU}</td>
          <td>{item.requestedQuantity}</td>
          <td>₹{item.estimatedUnitCost.toFixed(2)}</td>
          <td>₹{item.estimatedTotalCost.toFixed(2)}</td>
        </tr>
      ))}
    </tbody>
    <tfoot>
      <tr className="total-row">
        <td colSpan="4"><strong>Total Estimated Cost:</strong></td>
        <td><strong>₹{request.totalEstimatedCost.toFixed(2)}</strong></td>
      </tr>
    </tfoot>
  </table>
</div>

{/* Attachments */}
{request.attachments && request.attachments.length > 0 && (
  <div className="attachments">
    <h4>Supporting Documents ({request.attachments.length})</h4>
    <ul className="attachment-list">
      {request.attachments.map(file => (
        <li key={file._id}>
          <a href={`/api/v2/shop/admin/purchase-requests/${request._id}/files/${file._id}`} target="_blank">
            📎 {file.filename} ({(file.fileSize / 1024).toFixed(2)} KB)
          </a>
        </li>
      ))}
    </ul>
  </div>
)}
```

---

### STEP 9: Story 19 - Update Stock Modal (4-5 hours) ⚠️ MOST COMPLEX

**File:** `frontend/src/components/purchaseManagement/modals/UpdateStockModal.jsx`

**Changes:** MAJOR - Must handle multiple products atomically

**New State:**
```javascript
const [actualItems, setActualItems] = useState(
  request.items.map(item => ({
    productId: item.productId,
    productName: item.productName,
    requestedQuantity: item.requestedQuantity,
    receivedQuantity: item.requestedQuantity,  // Default to requested
    estimatedUnitCost: item.estimatedUnitCost,
    actualUnitCost: item.estimatedUnitCost,    // Default to estimated
    actualTotalCost: item.requestedQuantity * item.estimatedUnitCost
  }))
);
```

**UI - Items Table with Editable Fields:**
```jsx
<table className="stock-update-table">
  <thead>
    <tr>
      <th>Product</th>
      <th>Requested Qty</th>
      <th>Received Qty</th>
      <th>Est. Cost</th>
      <th>Actual Cost</th>
      <th>Variance</th>
    </tr>
  </thead>
  <tbody>
    {actualItems.map((item, index) => (
      <tr key={item.productId}>
        <td>{item.productName}</td>
        <td>{item.requestedQuantity}</td>
        <td>
          <input
            type="number"
            value={item.receivedQuantity}
            onChange={(e) => updateReceivedQty(index, parseInt(e.target.value))}
            min="0"
            max={item.requestedQuantity}
          />
        </td>
        <td>₹{item.estimatedUnitCost.toFixed(2)}</td>
        <td>
          <input
            type="number"
            value={item.actualUnitCost}
            onChange={(e) => updateActualCost(index, parseFloat(e.target.value))}
            min="0"
            step="0.01"
          />
        </td>
        <td className={getVarianceClass(item)}>
          {calculateItemVariance(item)}
        </td>
      </tr>
    ))}
  </tbody>
  <tfoot>
    <tr>
      <td colSpan="4"><strong>Total:</strong></td>
      <td><strong>₹{calculateTotalActualCost().toFixed(2)}</strong></td>
      <td className={getTotalVarianceClass()}>
        <strong>{calculateTotalVariance()}</strong>
      </td>
    </tr>
  </tfoot>
</table>
```

**Backend Controller for Stock Update (ATOMIC):**

**File:** `backend/controllers/purchaseRequestController.js`

**Function:** `completePurchaseRequest()` - Must be rewritten

```javascript
exports.completePurchaseRequest = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const { actualItems, supplierName, invoiceNumber, purchaseDate } = req.body;

    const request = await PurchaseRequest.findById(id).session(session);

    if (!request) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Request not found' });
    }

    // Validate status
    if (request.status !== 'approved') {
      await session.abortTransaction();
      return res.status(400).json({ message: 'Can only complete approved requests' });
    }

    // Validate ownership
    if (request.requestedBy.toString() !== req.user._id.toString()) {
      await session.abortTransaction();
      return res.status(403).json({ message: 'Can only complete own requests' });
    }

    // Process each item atomically
    const processedItems = [];

    for (const actualItem of actualItems) {
      // Find product
      const product = await ShopItem.findById(actualItem.productId).session(session);

      if (!product) {
        await session.abortTransaction();
        return res.status(404).json({ message: `Product ${actualItem.productId} not found` });
      }

      // Update stock
      product.stock += actualItem.receivedQuantity;
      await product.save({ session });

      // Create inventory transaction
      const transaction = await InventoryTransaction.create([{
        productId: actualItem.productId,
        quantity: actualItem.receivedQuantity,
        transactionType: 'purchase_request',
        reference: {
          type: 'purchase_request',
          id: request._id
        },
        performedBy: req.user._id,
        notes: `Purchase request ${request.requestId} - ${supplierName}`
      }], { session });

      processedItems.push({
        productId: actualItem.productId,
        receivedQuantity: actualItem.receivedQuantity,
        actualUnitCost: actualItem.actualUnitCost,
        actualTotalCost: actualItem.receivedQuantity * actualItem.actualUnitCost,
        inventoryTransactionId: transaction[0]._id
      });
    }

    // Update request with completion data
    request.actualItems = processedItems;
    request.totalActualCost = processedItems.reduce((sum, item) => sum + item.actualTotalCost, 0);
    request.supplierName = supplierName;
    request.invoiceNumber = invoiceNumber;
    request.purchaseDate = purchaseDate;
    request.status = 'completed';
    request.completedBy = req.user._id;
    request.completedAt = new Date();

    await request.save({ session });

    // Commit transaction
    await session.commitTransaction();

    res.json({
      success: true,
      message: 'Stock updated successfully for all items',
      data: { request }
    });

  } catch (error) {
    await session.abortTransaction();
    console.error('Error completing purchase request:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating stock',
      error: error.message
    });
  } finally {
    session.endSession();
  }
};
```

---

## 🧪 Testing Checklist

After implementation, test these scenarios:

### Backend API Testing (Postman)
- [ ] Create request with 1 item (works)
- [ ] Create request with 3 items (works)
- [ ] Create request with 0 items (fails with validation error)
- [ ] Upload file to request (works, creates file)
- [ ] Upload 6 files (fails, max 5)
- [ ] Upload 15MB file (fails, max 10MB)
- [ ] Upload .exe file (fails, only PDF/images)

### Frontend Testing (Manual)
- [ ] Select single product (works)
- [ ] Select multiple products (works)
- [ ] Toggle "Show All Products" (filters correctly)
- [ ] Edit quantity/cost in table (updates total)
- [ ] Remove item from table (removes correctly)
- [ ] Upload file (shows in list)
- [ ] Remove uploaded file (removes correctly)
- [ ] Submit with missing cost (shows error)
- [ ] Submit with valid data (creates successfully)

### Story 18 Testing
- [ ] Admin sees all items in table
- [ ] Total cost displayed correctly
- [ ] Attached files show with download links
- [ ] Approve multi-product request (works)

### Story 19 Testing (CRITICAL)
- [ ] Update stock for all items (atomic success)
- [ ] Partial fulfillment (received < requested, works)
- [ ] Cost variance calculated correctly
- [ ] If one item fails, ALL rollback (atomicity)
- [ ] Multiple inventory transactions created

---

## ⚠️ Critical Warnings

### 1. Data Migration
**NO DATA MIGRATION NEEDED** - This is a new feature, existing data unaffected

### 2. Backward Compatibility
**BREAKING CHANGE** - Old frontend will not work with new backend model
**Solution:** Deploy backend + frontend together, no staged rollout

### 3. File Storage
Create uploads directory:
```bash
mkdir -p backend/uploads/purchase-requests
chmod 755 backend/uploads
```

Add to `.gitignore`:
```
uploads/
*.pdf
*.jpg
*.jpeg
*.png
```

### 4. Transaction Handling
**CRITICAL:** Story 19 must use transactions
- If ANY product fails to update → ROLLBACK ALL
- Test rollback scenarios thoroughly
- Handle errors gracefully

---

## 📊 Effort Estimate by Task

| Task | Estimated Time | Actual Time | Status |
|------|---------------|-------------|--------|
| Install multer | 5 min | | ⏳ Pending |
| Update model | 30 min | | ⏳ Pending |
| Create file upload route | 45 min | | ⏳ Pending |
| Update controller | 90 min | | ⏳ Pending |
| Update validation | 15 min | | ⏳ Pending |
| Redesign create modal | 4 hours | | ⏳ Pending |
| Update API functions | 15 min | | ⏳ Pending |
| Story 18 changes | 2 hours | | ⏳ Pending |
| Story 19 changes | 5 hours | | ⏳ Pending |
| Testing | 4 hours | | ⏳ Pending |
| **Total** | **~17-20 hours** | | |

---

## 🎯 Success Criteria

### Functional
- ✅ Can select multiple products
- ✅ Can toggle show all/low stock
- ✅ Cost calculates automatically
- ✅ Files upload successfully
- ✅ Admin sees all items
- ✅ Stock update is atomic

### Technical
- ✅ Transactions work correctly
- ✅ Rollback on failure
- ✅ No console errors
- ✅ File upload secured

### Quality
- ✅ All E2E tests pass
- ✅ No breaking changes to existing features
- ✅ Performance acceptable

---

## 📞 Questions/Blockers

If you encounter issues:

1. **Model validation errors?** Check items array has at least 1 item
2. **File upload fails?** Verify multer installed and uploads dir exists
3. **Transaction errors?** Ensure MongoDB replica set configured
4. **Frontend not updating?** Clear browser cache, rebuild

---

## 📚 Reference Documents

- Full technical spec: `.ai/sprint-5-purchase-manager/STORY-17-ENHANCEMENT-PLAN.md`
- Original story: `docs/stories/sprint5/sprint5-story-17-purchase-request-creation.md`
- QA scenarios: `docs/qa/e2e/sprint5-story-17-purchase-request-creation.md`

---

## ✅ Ready to Start?

1. Read this handoff completely
2. Read the full enhancement plan
3. Set up your development environment
4. Start with STEP 1 (install multer)
5. Work through steps sequentially
6. Test after each step
7. Notify QA when complete for retesting

---

**Good luck! This is a complex enhancement but will significantly improve the purchase workflow.** 🚀

**Handoff Complete**
**Created:** 2025-10-29 20:09:07
**By:** QA Agent (Quinn)
