# 🚀 UPDATED Dev Handoff - Multi-Product Purchase Requests (SIMPLIFIED)

**Handoff Date:** 2025-10-29 20:15:00
**Priority:** 🟡 MEDIUM COMPLEXITY (File upload code already exists!)
**Estimated Effort:** **1.5-2 days** (reduced from 2-3 days)

---

## ✅ GOOD NEWS - Code Reuse Opportunity!

**Multer already installed** ✅
**File upload middleware exists** ✅ (`backend/middleware/upload.js`)
**Machine Repairs already has file upload UI** ✅
**Just need to COPY and ADAPT existing code!** 🎉

---

## 📋 What Already Exists (REUSE THIS!)

### Backend - File Upload Middleware
**Location:** `backend/middleware/upload.js`

```javascript
const { upload } = require("../../middleware/upload");

// Already supports:
- upload.array("attachments", 5) // Max 5 files
- File types: PDF, DOCX, images, etc.
- Max size: 5MB per file
- Saves to: uploads/ directory
```

### Backend - Machine Repairs Route (REFERENCE)
**Location:** `backend/routes/v1/purchaseAndRepair.js`

```javascript
router.post(
  "/repair-requests",
  authenticate,
  authorize("Machine Management", "Read"),
  upload.array("attachments", 5), // ✅ REUSE THIS PATTERN
  repairRequestController.createRepairRequest
);
```

### Frontend - File Upload UI (COPY FROM HERE)
**Location:** `frontend/src/components/purchaseManagement/views/MachineRepairsView.jsx`

**Lines to copy:**
- Line 29-30: State → `attachments: [], existingAttachments: []`
- Line 87-131: `FilePreview` component (complete copy)
- Line 133-138: `handlePurchaseFileUpload` function (complete copy)
- Line 273-277: `removePurchaseFile` function (complete copy)
- Line 812-890: File upload JSX (complete copy, adapt for purchase requests)

---

## 🎯 Implementation Steps (SIMPLIFIED)

### STEP 1: Backend - Add File Upload to Purchase Request Route (15 min)

**File:** `backend/routes/v2/purchase-requests.js`

**Current:**
```javascript
router.post(
  '/',
  authenticate,
  authorize('Purchase Management', 'Create'),
  validateCreateRequest,
  purchaseRequestController.createPurchaseRequest
);
```

**CHANGE TO:**
```javascript
const { upload } = require('../../middleware/upload'); // ✅ ADD THIS IMPORT

router.post(
  '/',
  authenticate,
  authorize('Purchase Management', 'Create'),
  upload.array('attachments', 5), // ✅ ADD THIS LINE
  validateCreateRequest,
  purchaseRequestController.createPurchaseRequest
);
```

**That's it for the route!** Multer handles the rest automatically.

---

### STEP 2: Backend - Update PurchaseRequest Model (30 min)

**File:** `backend/models/purchaseRequest.js`

**ADD to schema:**
```javascript
// REMOVE single product fields:
// productId, productName, productSKU, requestedQuantity, currentStock, lowStockThreshold

// ADD items array:
items: [
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShopItem', required: true },
    productName: { type: String, required: true },
    productSKU: { type: String, required: true },
    requestedQuantity: { type: Number, required: true, min: 1 },
    currentStock: { type: Number, required: true },
    lowStockThreshold: { type: Number, required: true },
    estimatedUnitCost: { type: Number, required: true, min: 0 },
    estimatedTotalCost: { type: Number, required: true }
  }
],

// ADD attachments array (REUSE from machine repairs pattern):
attachments: [
  {
    filename: { type: String, required: true },
    fileUrl: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
  }
],

// ADD calculated totals:
totalEstimatedCost: { type: Number, default: 0 }
```

**ADD virtuals:**
```javascript
// Virtual: totalItems
purchaseRequestSchema.virtual('totalItems').get(function() {
  return this.items ? this.items.length : 0;
});

// Virtual: totalQuantity
purchaseRequestSchema.virtual('totalQuantity').get(function() {
  return this.items ? this.items.reduce((sum, item) => sum + item.requestedQuantity, 0) : 0;
});

// Calculate totalEstimatedCost before save
purchaseRequestSchema.pre('save', function(next) {
  if (this.items && this.items.length > 0) {
    this.totalEstimatedCost = this.items.reduce((sum, item) => sum + item.estimatedTotalCost, 0);
  }
  next();
});
```

---

### STEP 3: Backend - Update Controller to Handle Files (45 min)

**File:** `backend/controllers/purchaseRequestController.js`

**Function:** `createPurchaseRequest()`

**UPDATE to handle items array + files:**
```javascript
exports.createPurchaseRequest = async (req, res) => {
  try {
    const { balagruhaId, items, reason, justification } = req.body;
    const userId = req.user._id;

    // Files are in req.files (uploaded by multer automatically!)
    const uploadedFiles = req.files || [];

    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one product is required'
      });
    }

    // Parse items (comes as JSON string in multipart form)
    const parsedItems = typeof items === 'string' ? JSON.parse(items) : items;

    // Validate and snapshot each item
    const validatedItems = [];
    for (const item of parsedItems) {
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

      validatedItems.push({
        productId: product._id,
        productName: product.name,
        productSKU: product.sku,
        requestedQuantity: parseInt(item.requestedQuantity),
        currentStock: product.stock,
        lowStockThreshold: product.lowStockThreshold,
        estimatedUnitCost: parseFloat(item.estimatedUnitCost),
        estimatedTotalCost: parseInt(item.requestedQuantity) * parseFloat(item.estimatedUnitCost)
      });
    }

    // Process uploaded files (REUSE pattern from machine repairs)
    const attachments = uploadedFiles.map(file => ({
      filename: file.originalname,
      fileUrl: `/uploads/${file.filename}`, // Relative path for frontend
      uploadedAt: new Date()
    }));

    // Create purchase request
    const purchaseRequest = new PurchaseRequest({
      balagruhaId,
      items: validatedItems,
      attachments,
      reason: reason.trim(),
      justification: justification?.trim() || '',
      requestedBy: userId,
      status: 'pending_approval'
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

**KEY POINT:** When sending multipart data, `items` will be a JSON string, so parse it!

---

### STEP 4: Frontend - Copy File Upload Code from MachineRepairsView (1 hour)

**File:** `frontend/src/components/purchaseManagement/modals/CreatePurchaseRequestModal.jsx`

#### 4A. Copy FilePreview Component

**COPY lines 87-131 from MachineRepairsView.jsx:**

```javascript
const FilePreview = ({ file }) => {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (file) {
      if (file instanceof File) {
        // For new files
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        // For existing files from server
        setPreview(file.fileUrl || file.url);
      }
    }
  }, [file]);

  const isImage = (file) => {
    const extension = file.name
      ? file.name.split(".").pop().toLowerCase()
      : (file.fileUrl || file.url)?.split(".").pop().toLowerCase();
    return ["jpg", "jpeg", "png", "gif", "webp"].includes(extension);
  };

  return (
    <div className="file-preview">
      {isImage(file) ? (
        <img src={preview} alt="Preview" />
      ) : (
        <div className="file-icon">
          <i className="fas fa-file-pdf"></i>
          <span>{file.name || "Document"}</span>
        </div>
      )}
    </div>
  );
};
```

#### 4B. Update State

```javascript
const [formData, setFormData] = useState({
  balagruhaId: '',
  items: [],  // Array of { productId, productName, requestedQuantity, estimatedUnitCost }
  reason: '',
  justification: '',
  attachments: []  // ✅ ADD THIS
});
```

#### 4C. Copy File Handlers

```javascript
// COPY from MachineRepairsView line 133-138
const handleFileUpload = (e) => {
  const files = Array.from(e.target.files);
  setFormData(prev => ({
    ...prev,
    attachments: [...prev.attachments, ...files]
  }));
};

// COPY from MachineRepairsView line 273-277
const removeFile = (index) => {
  setFormData(prev => ({
    ...prev,
    attachments: prev.attachments.filter((_, i) => i !== index)
  }));
};
```

#### 4D. Copy File Upload JSX

**COPY from MachineRepairsView lines 812-890 and adapt:**

```jsx
<div className="form-group">
  <label>Attachments (Optional):</label>
  <div className="file-upload-container">
    <input
      type="file"
      id="purchase-request-file-upload"
      onChange={handleFileUpload}
      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
      multiple
    />
    <label
      htmlFor="purchase-request-file-upload"
      className="file-upload-label"
    >
      <i className="fas fa-cloud-upload-alt"></i>
      Choose Files (PDF, Images)
    </label>
  </div>

  {/* New Attachments */}
  {formData.attachments.length > 0 && (
    <div className="new-attachments">
      <h4>Selected Files ({formData.attachments.length}):</h4>
      <div className="attachments-grid">
        {formData.attachments.map((file, index) => (
          <div key={`new-${index}`} className="attachment-item">
            <FilePreview file={file} />
            <div className="attachment-actions">
              <button
                type="button"
                className="remove-file"
                onClick={() => removeFile(index)}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
</div>
```

---

### STEP 5: Frontend - Update Submit to Send FormData (30 min)

**File:** `frontend/src/components/purchaseManagement/modals/CreatePurchaseRequestModal.jsx`

**CHANGE handleSubmit to use FormData (REQUIRED for file upload):**

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate...
  if (formData.items.length === 0) {
    showToast('Please select at least one product', 'error');
    return;
  }

  try {
    setLoading(true);

    // Create FormData (required for file upload)
    const submitData = new FormData();

    // Add regular fields
    submitData.append('balagruhaId', formData.balagruhaId);
    submitData.append('items', JSON.stringify(formData.items)); // ⚠️ Stringify items array
    submitData.append('reason', formData.reason.trim());
    submitData.append('justification', formData.justification.trim());

    // Add files (REUSE pattern from machine repairs)
    formData.attachments.forEach(file => {
      submitData.append('attachments', file);
    });

    // Send request
    const response = await createPurchaseRequest(submitData);

    if (response.success) {
      showToast('Purchase request created successfully', 'success');
      onSuccess();
    } else {
      showToast(response.message || 'Error creating request', 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showToast('Error creating request', 'error');
  } finally {
    setLoading(false);
  }
};
```

---

### STEP 6: Frontend - Multi-Product UI (2-3 hours)

**File:** `frontend/src/components/purchaseManagement/modals/CreatePurchaseRequestModal.jsx`

#### 6A. Update State Structure

```javascript
const [formData, setFormData] = useState({
  balagruhaId: '',
  items: [],  // Array of { productId, productName, requestedQuantity, estimatedUnitCost }
  reason: '',
  justification: '',
  attachments: []  // Added in STEP 4
});

const [products, setProducts] = useState([]);
const [lowStockProducts, setLowStockProducts] = useState([]);
const [selectedProducts, setSelectedProducts] = useState(new Set());  // Track selected product IDs
const [showAllProducts, setShowAllProducts] = useState(false);  // Toggle for filtering
```

#### 6B. Add Helper Functions

```javascript
// Toggle product selection
const handleProductToggle = (product) => {
  const newSelected = new Set(selectedProducts);

  if (newSelected.has(product._id)) {
    // Uncheck - remove from selection
    newSelected.delete(product._id);
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.productId !== product._id)
    }));
  } else {
    // Check - add to selection
    newSelected.add(product._id);
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, {
        productId: product._id,
        productName: product.name,
        productSKU: product.sku,
        requestedQuantity: 1,  // Default quantity
        estimatedUnitCost: 0   // User must fill in
      }]
    }));
  }

  setSelectedProducts(newSelected);
};

// Update quantity for a selected product
const updateItemQuantity = (index, quantity) => {
  setFormData(prev => ({
    ...prev,
    items: prev.items.map((item, i) =>
      i === index ? { ...item, requestedQuantity: quantity } : item
    )
  }));
};

// Update cost for a selected product
const updateItemCost = (index, cost) => {
  setFormData(prev => ({
    ...prev,
    items: prev.items.map((item, i) =>
      i === index ? { ...item, estimatedUnitCost: cost } : item
    )
  }));
};

// Remove item from selection
const removeItem = (index) => {
  const removedProductId = formData.items[index].productId;

  setFormData(prev => ({
    ...prev,
    items: prev.items.filter((_, i) => i !== index)
  }));

  setSelectedProducts(prev => {
    const newSet = new Set(prev);
    newSet.delete(removedProductId);
    return newSet;
  });
};

// Calculate total estimated cost
const calculateTotalCost = () => {
  return formData.items.reduce((sum, item) => {
    return sum + (item.requestedQuantity * item.estimatedUnitCost);
  }, 0);
};
```

#### 6C. Replace Product Dropdown with Checkbox List

**REMOVE the existing dropdown (lines 171-201):**
```javascript
// ❌ REMOVE THIS:
<select value={formData.productId} ...>
  <option>Select Product</option>
  ...
</select>
```

**REPLACE with checkbox list:**
```jsx
<div className="form-group">
  <label className="form-label">
    Select Products <span className="required">*</span>
  </label>

  {/* Toggle: Show All Products */}
  <div className="product-filter">
    <label className="checkbox-label">
      <input
        type="checkbox"
        checked={showAllProducts}
        onChange={(e) => setShowAllProducts(e.target.checked)}
      />
      Show all products (not just low stock)
    </label>
  </div>

  {/* Product Checkbox List */}
  {formData.balagruhaId && (
    <div className="product-checklist">
      {(showAllProducts ? products : lowStockProducts)
        .map(product => (
          <label key={product._id} className="product-checkbox-item">
            <input
              type="checkbox"
              checked={selectedProducts.has(product._id)}
              onChange={() => handleProductToggle(product)}
            />
            <span className="product-details">
              <span className="product-name">{product.name}</span>
              <span className="product-meta">
                {product.sku} · Stock: {product.stock}/{product.lowStockThreshold}
                {product.stock === 0 && <span className="badge-out">🔴</span>}
                {product.stock > 0 && product.stock <= product.lowStockThreshold && (
                  <span className="badge-low">⚠️</span>
                )}
              </span>
            </span>
          </label>
        ))}
    </div>
  )}

  {!formData.balagruhaId && (
    <p className="form-hint">Please select a balagruha first</p>
  )}
</div>
```

#### 6D. Add Selected Products Table

**INSERT after the product checklist:**
```jsx
{/* Selected Products Table */}
{formData.items.length > 0 && (
  <div className="selected-products-section">
    <h4>Selected Products ({formData.items.length})</h4>
    <div className="table-responsive">
      <table className="selected-items-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>SKU</th>
            <th style={{width: '120px'}}>Quantity *</th>
            <th style={{width: '140px'}}>Unit Cost (₹) *</th>
            <th style={{width: '120px'}}>Total (₹)</th>
            <th style={{width: '60px'}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {formData.items.map((item, index) => (
            <tr key={item.productId}>
              <td>{item.productName}</td>
              <td className="sku-cell">{item.productSKU}</td>
              <td>
                <input
                  type="number"
                  className="table-input"
                  value={item.requestedQuantity}
                  onChange={(e) => updateItemQuantity(index, parseInt(e.target.value) || 1)}
                  min="1"
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  className="table-input"
                  value={item.estimatedUnitCost}
                  onChange={(e) => updateItemCost(index, parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  required
                />
              </td>
              <td className="total-cell">
                ₹{(item.requestedQuantity * item.estimatedUnitCost).toFixed(2)}
              </td>
              <td>
                <button
                  type="button"
                  className="btn-icon-remove"
                  onClick={() => removeItem(index)}
                  title="Remove product"
                >
                  ✖
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="total-row">
            <td colSpan="4" className="total-label">
              <strong>Total Estimated Cost:</strong>
            </td>
            <td colSpan="2" className="total-amount">
              <strong>₹{calculateTotalCost().toFixed(2)}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <p className="form-hint">
      * Fill in quantity and estimated unit cost for all products before submitting
    </p>
  </div>
)}
```

#### 6E. Update Validation in handleSubmit

**ADD validation for multi-product data:**
```javascript
// Existing validation...
if (formData.items.length === 0) {
  showToast('Please select at least one product', 'error');
  return;
}

// NEW: Validate all items have quantity and cost filled
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

// Continue with FormData submission...
```

---

## 🧪 Testing Checklist (SIMPLIFIED)

### File Upload Testing
- [ ] Select 1 file → Works
- [ ] Select 3 files → Works
- [ ] Select 6 files → Should fail (max 5)
- [ ] Upload 10MB file → Should fail (max 5MB)
- [ ] Upload .exe file → Should fail (only PDF/images/docs)
- [ ] Preview shows correctly for images
- [ ] Preview shows icon for PDFs
- [ ] Remove file → Removes from list
- [ ] Submit with files → Files saved to uploads/

### Backend
- [ ] req.files contains uploaded files
- [ ] Files saved to uploads/ directory
- [ ] File paths stored in attachments array
- [ ] Can retrieve files via URL

---

## ⏱️ UPDATED Effort Estimate

| Task | OLD Estimate | NEW Estimate | Savings |
|------|-------------|--------------|---------|
| Install multer | 5 min | **0 min** ✅ | -5 min |
| Create file upload route | 45 min | **0 min** ✅ | -45 min |
| Create upload middleware | 60 min | **0 min** ✅ | -60 min |
| Backend file handling | 90 min | **45 min** 📉 | -45 min |
| Frontend file upload UI | 4 hours | **1 hour** 📉 | -3 hours |
| **TOTAL SAVINGS** | | | **~5 hours!** |

**NEW TOTAL:** ~15-17 hours (~2 days) instead of 20 hours (2.5 days)

---

## 📂 Files Modified Summary

### Backend (4 files - reduced from 7)
```
✏️ backend/models/purchaseRequest.js
✏️ backend/controllers/purchaseRequestController.js
✏️ backend/routes/v2/purchase-requests.js (ADD 1 line!)
✏️ backend/middleware/validation/purchaseRequestValidation.js

❌ DON'T CREATE: purchase-request-files.js (not needed!)
❌ DON'T MODIFY: upload.js (already works!)
❌ DON'T MODIFY: package.json (multer installed!)
```

### Frontend (4 files - same)
```
✏️ CreatePurchaseRequestModal.jsx (COPY file upload code)
✏️ ApproveRequestModal.jsx (show items table)
✏️ UpdateStockModal.jsx (atomic multi-update)
✏️ api.js (ensure FormData support)
```

---

## 🎯 Key Differences from Original Plan

| Aspect | Original Plan | Simplified Plan |
|--------|--------------|-----------------|
| **Multer** | Install new | ✅ Already installed |
| **Upload Middleware** | Create new file | ✅ Reuse existing |
| **Upload Route** | Create separate route | ✅ Add 1 line to existing |
| **Frontend UI** | Build from scratch | ✅ Copy from MachineRepairsView |
| **File Preview** | Design new | ✅ Copy FilePreview component |
| **Effort** | 20 hours | **15 hours** |

---

## ✅ Quick Start Checklist

1. [ ] Read this document
2. [ ] Open `MachineRepairsView.jsx` in split screen (for reference)
3. [ ] Start with STEP 1 (add `upload.array` to route)
4. [ ] STEP 2 (update model)
5. [ ] STEP 3 (update controller)
6. [ ] STEP 4 (copy file upload UI)
7. [ ] STEP 5 (update submit with FormData)
8. [ ] STEP 6 (add multi-product UI)
9. [ ] Test everything
10. [ ] Notify QA

---

**Much simpler now with code reuse!** 🎉

**Updated:** 2025-10-29 20:24:10
**By:** Orchestrator (Updated STEP 6 with complete multi-product UI implementation)
