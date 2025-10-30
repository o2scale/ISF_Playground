# Story 17 Enhancement Plan - Multi-Product Purchase Requests

**Created:** 2025-10-29 20:09:07
**Created By:** QA Agent (Quinn) - Based on stakeholder feedback
**Epic:** Sprint5-Epic-05 (Purchase Manager Workflow)
**Scope:** MAJOR ENHANCEMENT - Complete redesign of purchase request structure

---

## Executive Summary

After initial QA review, stakeholder requested **significant enhancement** to Story 17 to support:
1. **Multi-product selection** (multiple products in one request)
2. **All products visibility** (toggle between low-stock and all products)
3. **Manual cost entry** (Purchase Manager enters unit cost per product)
4. **Cost totaling** (automatic sum of all product costs)
5. **File upload capability** (supporting documents like quotes/invoices)

**Impact Level:** 🔴 **CRITICAL** - This changes the fundamental architecture
**Estimated Effort:** 2-3 days dev + 1 day QA testing
**Stories Affected:** Story 17, Story 18, Story 19

---

## Business Justification

### Current Problem (Single Product Model):
```
❌ Purchase Manager needs 5 items → Must create 5 separate requests
❌ Admin reviews 5 requests separately → Inefficient workflow
❌ No cost information → Admin approves blind
❌ No supporting documents → No quotes/invoices attached
❌ Stock update for 5 requests → Complex tracking
```

### Proposed Solution (Multi-Product Model):
```
✅ Purchase Manager creates 1 request with 5 items → Efficient
✅ Admin reviews bulk order at once → Better decision making
✅ Cost per item visible → Informed approval with budget control
✅ Total cost calculated → Clear financial impact
✅ Supporting documents attached → Quotes/invoices for audit
✅ Stock update atomic → All items updated together
```

---

## Data Model Changes

### Current PurchaseRequest Model (Single Product)
```javascript
{
  _id: ObjectId,
  requestId: "PR-001",

  // SINGLE PRODUCT (1:1 relationship)
  productId: ObjectId,
  productName: "Notebook",
  productSKU: "NB-001",
  requestedQuantity: 100,
  currentStock: 5,
  lowStockThreshold: 10,

  // No cost information
  // No file attachments

  balagruhaId: ObjectId,
  requestedBy: ObjectId,
  reason: String,
  status: enum[...],
  // ... other fields
}
```

### Proposed PurchaseRequest Model (Multi-Product)
```javascript
{
  _id: ObjectId,
  requestId: "PR-001",

  // MULTIPLE PRODUCTS (1:many relationship)
  items: [
    {
      productId: ObjectId (ref: ShopItem),
      productName: String,           // Snapshot
      productSKU: String,             // Snapshot
      requestedQuantity: Number,
      currentStock: Number,           // Snapshot
      lowStockThreshold: Number,      // Snapshot
      estimatedUnitCost: Number,      // ⭐ NEW - Manual entry
      estimatedTotalCost: Number      // ⭐ Calculated: qty × unitCost
    },
    // ... more items
  ],

  // AGGREGATE TOTALS
  totalItems: Number,                 // Count of items
  totalQuantity: Number,              // Sum of all quantities
  totalEstimatedCost: Number,         // Sum of all item costs

  // FILE ATTACHMENTS
  attachments: [
    {
      filename: String,               // "quote.pdf"
      filepath: String,               // "/uploads/purchase-requests/PR-001/quote.pdf"
      fileType: String,               // "application/pdf"
      fileSize: Number,               // bytes
      uploadedAt: Date,
      uploadedBy: ObjectId (ref: User)
    }
  ],

  // EXISTING FIELDS
  balagruhaId: ObjectId,
  requestedBy: ObjectId,
  reason: String,
  justification: String,
  status: enum[...],

  // Approval fields
  reviewedBy: ObjectId,
  reviewedAt: Date,
  reviewNotes: String,

  // Completion fields (Story 19 - MORE COMPLEX NOW!)
  actualItems: [                      // ⭐ NEW - Actual received per item
    {
      productId: ObjectId,
      receivedQuantity: Number,
      actualUnitCost: Number,
      actualTotalCost: Number,
      inventoryTransactionId: ObjectId
    }
  ],
  totalActualCost: Number,            // Sum of all actual costs
  costVariance: Number,               // actualCost - estimatedCost
  costVariancePercentage: Number,     // (variance / estimated) × 100

  completedBy: ObjectId,
  completedAt: Date
}
```

**Breaking Changes:**
- ❌ `productId` field removed (now in items array)
- ❌ `productName` field removed (now in items array)
- ❌ `productSKU` field removed (now in items array)
- ❌ `requestedQuantity` field removed (now in items array)
- ❌ `currentStock` field removed (now in items array)
- ❌ `lowStockThreshold` field removed (now in items array)
- ❌ `actualCost` field removed (replaced by actualItems array)
- ❌ `receivedQuantity` field removed (now in actualItems array)
- ❌ `inventoryTransactionId` field removed (now multiple in actualItems)

---

## Backend Implementation

### 1. Database Model Changes

**File:** `backend/models/purchaseRequest.js`

**Changes Required:**
1. Remove single product fields
2. Add `items` array schema
3. Add `attachments` array schema
4. Add calculated virtual fields for totals
5. Add validation for items array (min 1 item)
6. Update indexes to support items queries
7. Add file path cleanup on delete

**New Schema Structure:**
```javascript
const purchaseRequestItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShopItem',
    required: true
  },
  productName: { type: String, required: true },
  productSKU: { type: String, required: true },
  requestedQuantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1']
  },
  currentStock: { type: Number, required: true },
  lowStockThreshold: { type: Number, required: true },
  estimatedUnitCost: {
    type: Number,
    required: true,
    min: [0, 'Unit cost cannot be negative']
  },
  estimatedTotalCost: {
    type: Number,
    required: true,
    min: [0, 'Total cost cannot be negative']
  }
}, { _id: true });

const purchaseRequestAttachmentSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  filepath: { type: String, required: true },
  fileType: { type: String, required: true },
  fileSize: { type: Number, required: true },
  uploadedAt: { type: Date, default: Date.now },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { _id: true });

const purchaseRequestSchema = new mongoose.Schema({
  // ... existing fields ...

  items: {
    type: [purchaseRequestItemSchema],
    required: true,
    validate: {
      validator: function(items) {
        return items && items.length > 0;
      },
      message: 'At least one item is required'
    }
  },

  attachments: [purchaseRequestAttachmentSchema],

  // Calculated fields (virtuals)
  // totalItems, totalQuantity, totalEstimatedCost
});

// Virtual: totalItems
purchaseRequestSchema.virtual('totalItems').get(function() {
  return this.items ? this.items.length : 0;
});

// Virtual: totalQuantity
purchaseRequestSchema.virtual('totalQuantity').get(function() {
  return this.items ? this.items.reduce((sum, item) => sum + item.requestedQuantity, 0) : 0;
});

// Virtual: totalEstimatedCost
purchaseRequestSchema.virtual('totalEstimatedCost').get(function() {
  return this.items ? this.items.reduce((sum, item) => sum + item.estimatedTotalCost, 0) : 0;
});
```

---

### 2. Controller Changes

**File:** `backend/controllers/purchaseRequestController.js`

**Changes Required:**

#### `createPurchaseRequest()` - MAJOR REWRITE
```javascript
exports.createPurchaseRequest = async (req, res) => {
  try {
    const { balagruhaId, items, reason, justification } = req.body;
    const userId = req.user._id;

    // Validate items array
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one product is required'
      });
    }

    // Validate each item and fetch product snapshots
    const validatedItems = [];
    for (const item of items) {
      const product = await ShopItem.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product ${item.productId} not found`
        });
      }

      // Validate balagruha access
      if (req.user.role === 'purchase-manager') {
        if (product.balagruhaId &&
            !req.user.balagruhaIds.includes(product.balagruhaId.toString())) {
          return res.status(403).json({
            success: false,
            message: `No access to product: ${product.name}`
          });
        }
      }

      // Calculate estimated total cost
      const estimatedTotalCost = item.requestedQuantity * item.estimatedUnitCost;

      validatedItems.push({
        productId: product._id,
        productName: product.name,
        productSKU: product.sku,
        requestedQuantity: item.requestedQuantity,
        currentStock: product.stock,
        lowStockThreshold: product.lowStockThreshold,
        estimatedUnitCost: item.estimatedUnitCost,
        estimatedTotalCost
      });
    }

    // Create purchase request with multiple items
    const purchaseRequest = new PurchaseRequest({
      balagruhaId,
      items: validatedItems,
      reason: reason.trim(),
      justification: justification?.trim() || '',
      requestedBy: userId,
      status: 'pending_approval',
      attachments: []  // Files handled separately via multipart upload
    });

    await purchaseRequest.save();

    // Populate for response
    await purchaseRequest.populate('requestedBy', 'name email role');
    await purchaseRequest.populate('items.productId', 'name sku stock');

    res.status(201).json({
      success: true,
      message: 'Purchase request created successfully',
      data: { purchaseRequest }
    });
  } catch (error) {
    console.error('Error creating purchase request:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating purchase request',
      error: error.message
    });
  }
};
```

---

### 3. File Upload Infrastructure

**New File:** `backend/routes/v2/purchase-request-files.js`

```javascript
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { authenticate, authorize } = require('../../middleware/auth');
const PurchaseRequest = require('../../models/purchaseRequest');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads/purchase-requests', req.params.id);
    await fs.mkdir(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024  // 10MB max
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and images allowed.'));
    }
  }
});

// Upload files to existing request
router.post(
  '/:id/files',
  authenticate,
  authorize('Purchase Management', 'Create'),
  upload.array('files', 5),  // Max 5 files
  async (req, res) => {
    try {
      const request = await PurchaseRequest.findById(req.params.id);

      if (!request) {
        return res.status(404).json({
          success: false,
          message: 'Purchase request not found'
        });
      }

      // Verify ownership
      if (request.requestedBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Can only upload files to own requests'
        });
      }

      // Add attachments
      const attachments = req.files.map(file => ({
        filename: file.originalname,
        filepath: file.path,
        fileType: file.mimetype,
        fileSize: file.size,
        uploadedBy: req.user._id
      }));

      request.attachments.push(...attachments);
      await request.save();

      res.json({
        success: true,
        message: `${attachments.length} file(s) uploaded successfully`,
        data: { attachments }
      });
    } catch (error) {
      console.error('Error uploading files:', error);
      res.status(500).json({
        success: false,
        message: 'Error uploading files',
        error: error.message
      });
    }
  }
);

module.exports = router;
```

**Register Route in server.js:**
```javascript
const purchaseRequestFilesRoutes = require('./routes/v2/purchase-request-files');
app.use('/api/v2/shop/admin/purchase-requests', purchaseRequestFilesRoutes);
```

---

## Frontend Implementation

### 1. CreatePurchaseRequestModal - COMPLETE REDESIGN

**File:** `frontend/src/components/purchaseManagement/modals/CreatePurchaseRequestModal.jsx`

**New State Structure:**
```javascript
const [formData, setFormData] = useState({
  balagruhaId: '',
  items: [],  // Array of { productId, quantity, unitCost }
  reason: '',
  justification: ''
});

const [selectedProducts, setSelectedProducts] = useState(new Set());
const [showAllProducts, setShowAllProducts] = useState(false);
const [files, setFiles] = useState([]);
```

**New UI Components Needed:**
1. Product Selection Checklist (with checkbox per product)
2. Selected Products Table (Product | Qty | Unit Cost | Total)
3. Auto-calculating Total Cost display
4. File Upload widget with preview
5. Toggle: "Show All Products" / "Low Stock Only"

**Pseudo-code for Modal:**
```jsx
<div className="modal-container">
  <h3>Create Purchase Request</h3>

  {/* Balagruha Selection */}
  <select value={formData.balagruhaId} onChange={handleBalagruhaChange}>
    {/* ... */}
  </select>

  {/* Show All Products Toggle */}
  <label>
    <input
      type="checkbox"
      checked={showAllProducts}
      onChange={(e) => setShowAllProducts(e.target.checked)}
    />
    Show all products (not just low stock)
  </label>

  {/* Product Selection Checklist */}
  <div className="product-checklist">
    {products
      .filter(p => showAllProducts || p.stock <= p.lowStockThreshold)
      .map(product => (
        <label key={product._id}>
          <input
            type="checkbox"
            checked={selectedProducts.has(product._id)}
            onChange={() => handleProductToggle(product)}
          />
          {product.name} ({product.sku}) - Stock: {product.stock}/{product.lowStockThreshold}
          {product.stock === 0 && <span>🔴 Out of Stock</span>}
          {product.stock > 0 && product.stock <= product.lowStockThreshold && (
            <span>⚠️ Low Stock</span>
          )}
        </label>
      ))}
  </div>

  {/* Selected Products Table */}
  {formData.items.length > 0 && (
    <table className="selected-products-table">
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
                onChange={(e) => updateItemQuantity(index, e.target.value)}
                min="1"
              />
            </td>
            <td>
              <input
                type="number"
                value={item.estimatedUnitCost}
                onChange={(e) => updateItemCost(index, e.target.value)}
                min="0"
                step="0.01"
              />
            </td>
            <td className="total-cost">
              ₹{(item.requestedQuantity * item.estimatedUnitCost).toFixed(2)}
            </td>
            <td>
              <button onClick={() => removeItem(index)}>Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="total-row">
          <td colSpan="3"><strong>Total Estimated Cost:</strong></td>
          <td colSpan="2">
            <strong>₹{calculateTotalCost().toFixed(2)}</strong>
          </td>
        </tr>
      </tfoot>
    </table>
  )}

  {/* File Upload */}
  <div className="file-upload-section">
    <label>Upload Supporting Documents (Optional)</label>
    <input
      type="file"
      multiple
      accept=".pdf,.jpg,.jpeg,.png"
      onChange={handleFileChange}
    />
    {files.length > 0 && (
      <ul className="file-list">
        {files.map((file, index) => (
          <li key={index}>
            📎 {file.name} ({(file.size / 1024).toFixed(2)} KB)
            <button onClick={() => removeFile(index)}>✖</button>
          </li>
        ))}
      </ul>
    )}
  </div>

  {/* Reason & Justification */}
  <input
    type="text"
    placeholder="Reason (required)"
    value={formData.reason}
    onChange={(e) => setFormData({...formData, reason: e.target.value})}
    maxLength={200}
  />

  <textarea
    placeholder="Justification (optional)"
    value={formData.justification}
    onChange={(e) => setFormData({...formData, justification: e.target.value})}
    maxLength={500}
  />

  {/* Submit */}
  <button onClick={handleSubmit}>Create Request</button>
</div>
```

**Submit Logic:**
```javascript
const handleSubmit = async () => {
  // Validate
  if (!formData.balagruhaId) {
    showToast('Please select a balagruha', 'error');
    return;
  }

  if (formData.items.length === 0) {
    showToast('Please select at least one product', 'error');
    return;
  }

  // Check all items have quantity and cost
  const invalidItems = formData.items.filter(
    item => !item.requestedQuantity || item.requestedQuantity < 1 ||
            !item.estimatedUnitCost || item.estimatedUnitCost < 0
  );

  if (invalidItems.length > 0) {
    showToast('Please fill quantity and cost for all products', 'error');
    return;
  }

  try {
    // Create request
    const response = await createPurchaseRequest({
      balagruhaId: formData.balagruhaId,
      items: formData.items,
      reason: formData.reason,
      justification: formData.justification
    });

    if (response.success) {
      const requestId = response.data.purchaseRequest._id;

      // Upload files if any
      if (files.length > 0) {
        const formData = new FormData();
        files.forEach(file => formData.append('files', file));

        await uploadRequestFiles(requestId, formData);
      }

      showToast('Purchase request created successfully', 'success');
      onSuccess();
    }
  } catch (error) {
    showToast('Error creating request', 'error');
  }
};
```

---

### 2. Admin Approval Modal (Story 18) - Updates Required

**File:** `frontend/src/components/purchaseManagement/modals/ApproveRequestModal.jsx`

**Changes:**
- Display **table of items** instead of single product
- Show **total estimated cost** prominently
- Display **attached files** with download links
- Show cost breakdown per item

---

### 3. Stock Update Modal (Story 19) - MAJOR CHANGES

**File:** `frontend/src/components/purchaseManagement/modals/UpdateStockModal.jsx`

**Critical Changes:**
- Must handle **multiple products** in one atomic transaction
- Allow editing received quantity per product
- Allow editing actual cost per product
- Calculate cost variance automatically
- Update ALL products or NONE (atomic transaction)

---

## Story 18 & 19 Impact

### Story 18: Admin Approval Workflow
**Impact:** 🟡 MEDIUM

**Changes Required:**
1. Approval modal shows table of items (not single product)
2. Display total estimated cost
3. Show attached files with download capability
4. Admin notes apply to entire request (not per item)

**Estimated Effort:** 4-6 hours

---

### Story 19: Stock Update & Audit Trail
**Impact:** 🔴 CRITICAL

**Changes Required:**
1. **ATOMIC TRANSACTION** - Update multiple products together
2. Create **multiple InventoryTransactions** (one per product)
3. Handle partial fulfillment (requested 100, received 98)
4. Cost variance calculation per item
5. Rollback mechanism if ANY product fails

**Technical Challenge:**
```javascript
// Must use MongoDB transactions
const session = await mongoose.startSession();
session.startTransaction();

try {
  for (const item of request.items) {
    // Update product stock
    await ShopItem.findByIdAndUpdate(
      item.productId,
      { $inc: { stock: item.receivedQuantity } },
      { session }
    );

    // Create inventory transaction
    const transaction = await InventoryTransaction.create([{
      productId: item.productId,
      quantity: item.receivedQuantity,
      transactionType: 'purchase_request',
      reference: { type: 'purchase_request', id: request._id }
    }], { session });

    // Link transaction to request
    request.actualItems.push({
      productId: item.productId,
      receivedQuantity: item.receivedQuantity,
      actualUnitCost: item.actualUnitCost,
      inventoryTransactionId: transaction[0]._id
    });
  }

  request.status = 'completed';
  await request.save({ session });

  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}
```

**Estimated Effort:** 8-12 hours (complex transaction logic)

---

## Testing Impact

### E2E Test Scenarios

**New Test Cases Required:**
1. Select multiple products via checkboxes
2. Toggle "Show All Products" filter
3. Edit quantity/cost in table
4. Remove item from selection
5. Upload multiple files
6. Calculate total cost correctly
7. Admin approval with multiple items
8. Stock update for multiple products (atomic)
9. Partial fulfillment scenarios
10. Cost variance reporting

**Updated Test Count:** 48 → **78 test cases** (+30 new scenarios)

**Testing Duration:** 2.5 hours → **4-5 hours** (nearly doubled)

---

## Implementation Checklist

### Phase 1: Backend (Day 1)
- [ ] Update PurchaseRequest model with items array
- [ ] Add attachments schema
- [ ] Update createPurchaseRequest controller
- [ ] Create file upload endpoint
- [ ] Add multer middleware
- [ ] Create uploads directory structure
- [ ] Update validation middleware
- [ ] Test backend API with Postman

### Phase 2: Frontend (Day 2)
- [ ] Redesign CreatePurchaseRequestModal
- [ ] Add product checkbox list component
- [ ] Build selected products table
- [ ] Implement file upload widget
- [ ] Add "Show All Products" toggle
- [ ] Wire up API calls
- [ ] Test modal functionality

### Phase 3: Story 18 Updates (Day 2 PM)
- [ ] Update ApproveRequestModal for multi-product
- [ ] Display items table in approval UI
- [ ] Show attached files with download
- [ ] Test approval workflow

### Phase 4: Story 19 Updates (Day 3)
- [ ] Update UpdateStockModal for multi-product
- [ ] Implement atomic transaction logic
- [ ] Handle multiple InventoryTransactions
- [ ] Add cost variance calculations
- [ ] Add rollback error handling
- [ ] Test stock update workflow

### Phase 5: Testing (Day 3 PM + Day 4)
- [ ] Update E2E test scenarios (+30 tests)
- [ ] Execute full test suite
- [ ] Bug fixes
- [ ] Final QA review

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Atomic transaction failure | Medium | Critical | Comprehensive error handling, rollback logic |
| File upload security | Medium | High | Validate file types, limit size, sanitize names |
| UI complexity overwhelming | High | Medium | Clear UX design, progressive disclosure |
| Data migration issues | Low | High | No migration needed (new feature) |
| Performance with many items | Medium | Medium | Limit items per request (e.g., max 20) |
| Story 19 becomes too complex | High | Critical | Break into sub-tasks, thorough testing |

---

## Rollback Plan

If enhancement is too complex or time-consuming:

**Option 1:** Ship Stories 17-19 as-is (single product)
**Option 2:** Add multi-product in Sprint 6 (separate epic)
**Option 3:** Keep multi-product but remove file upload (reduce scope)

---

## Dependencies

**NPM Packages Required:**
- `multer` - File upload handling (backend)
- `multer-storage-cloudinary` - Optional: Cloud storage

**File System:**
- Create `/uploads/purchase-requests/` directory
- Add to .gitignore
- Configure file permissions

---

## Success Criteria

### Functional
- ✅ Can select multiple products in one request
- ✅ Can toggle between low-stock and all products
- ✅ Can enter cost per product manually
- ✅ Total cost calculates automatically
- ✅ Can upload PDF/image files
- ✅ Admin sees all items in approval
- ✅ Stock update works atomically for all items

### Technical
- ✅ Atomic transactions prevent partial updates
- ✅ File uploads secured and validated
- ✅ No breaking changes to existing code
- ✅ Backward compatible (no data migration)

### Quality
- ✅ All 78 E2E tests pass
- ✅ No console errors
- ✅ Performance acceptable (< 3s page load)

---

## Estimated Timeline

| Phase | Duration | Owner |
|-------|----------|-------|
| Backend Implementation | 8 hours | Dev Agent |
| Frontend Modal Redesign | 10 hours | Dev Agent |
| Story 18 Updates | 4 hours | Dev Agent |
| Story 19 Atomic Transactions | 10 hours | Dev Agent |
| E2E Test Scenario Updates | 4 hours | QA Agent |
| Testing Execution | 8 hours | QA Agent |
| Bug Fixes & Polish | 6 hours | Dev Agent |
| **Total** | **50 hours (~2.5 days)** | |

---

## Next Steps

1. **Review this plan** with stakeholder
2. **Approve scope** (confirm go-ahead)
3. **Create Dev Agent handoff** document
4. **Update Story 17 acceptance criteria** in story file
5. **Dev Agent implements** changes
6. **QA Agent retests** with new scenarios

---

**Document Status:** ✅ READY FOR REVIEW
**Last Updated:** 2025-10-29 20:09:07
**Created By:** QA Agent (Quinn)
