# Story 17: Multi-Product Purchase Request Creation with File Upload

**Story ID:** Sprint5-Story-17
**Epic:** [Sprint5-Epic-05 (Purchase Manager Workflow)](../../epics/sprint5/sprint5-epic-05-purchase-manager-workflow.md)
**Priority:** High
**Status:** In Progress
**Estimate:** 1.5-2 days
**Created:** 2025-10-30 00:46:43
**Last Updated:** 2025-10-30 00:46:43

---

## User Story

**As a** Purchase Manager
**I want to** create purchase requests for **MULTIPLE products at once** with file attachments
**So that** I can efficiently request inventory replenishment for several low-stock items in a single request with supporting documentation

---

## Context

This story **REPLACES** the obsolete single-product purchase request implementation (sprint5-story-17-purchase-request-creation-OBSOLETE.md) with an enhanced version supporting:

1. **Multi-Product Selection**: Select and add multiple products to a single purchase request
2. **File Upload Support**: Attach up to 5 supporting documents (quotations, invoices, specifications) per request
3. **Enhanced UI**: Checkbox-based product selection with cost table input
4. **Bulk Justification**: Single reason/justification applies to all products in the request

This approach significantly improves efficiency by allowing Purchase Managers to:
- Bundle related products into one request (e.g., all stationery items)
- Reduce approval overhead for Admin reviewers
- Attach vendor quotations and specifications upfront
- Track total estimated costs across multiple items

---

## Acceptance Criteria

### AC1: Multi-Product Selection Interface (Replaces Single Dropdown)

**CHANGED FROM OBSOLETE VERSION:** Single dropdown → Checkbox list with product table

- ✅ Purchase Manager can select **multiple products** via checkboxes
- ✅ Product selection shows:
  - Product name
  - SKU
  - Current stock vs threshold (e.g., "Stock: 5/10")
  - Stock status indicator (🔴 Out of Stock, ⚠️ Low Stock)
- ✅ Toggle filter: "Show all products" vs "Show only low-stock products" (default: low-stock)
- ✅ Selected products appear in **editable table** below checkbox list
- ✅ Table columns:
  - Product Name
  - SKU
  - Requested Quantity (editable number input)
  - Estimated Unit Cost (editable currency input)
  - Estimated Total Cost (calculated: quantity × unit cost)
  - Remove action (uncheck product)
- ✅ Footer row shows **Total Estimated Cost** across all products
- ✅ Can add/remove products dynamically before submitting

### AC2: Quantity and Cost Input for Each Selected Product

- ✅ Each selected product has **independent** quantity and cost fields
- ✅ Quantity validation:
  - Must be at least 1
  - Number input with increment/decrement controls
- ✅ Estimated unit cost validation:
  - Must be ≥ 0 (zero allowed for free items)
  - Currency input with 2 decimal places
  - Placeholder: "0.00"
- ✅ Real-time calculation of total cost per product
- ✅ Real-time calculation of grand total across all products
- ✅ Cannot submit if any product has:
  - Quantity < 1
  - Empty or invalid cost field

### AC3: File Upload Support (NEW - Not in Obsolete Version)

**IMPLEMENTATION:** Reuse existing file upload code from MachineRepairsView.jsx

- ✅ File upload section in modal with drag-and-drop or file picker
- ✅ Maximum **5 files** per request
- ✅ Supported file types: PDF, JPG, PNG, DOCX
- ✅ Maximum file size: **5MB per file**
- ✅ File preview:
  - Images show thumbnail preview
  - PDFs/documents show file icon with filename
- ✅ Remove individual files before submission
- ✅ Files display in grid layout with remove (×) button
- ✅ File validation errors shown as toast notifications
- ✅ Uploaded files stored in `uploads/` directory
- ✅ File metadata saved in PurchaseRequest.attachments array

### AC4: Submit Creates Request with Items Array and Attachments

**CHANGED FROM OBSOLETE VERSION:** Single product object → items array + attachments array

- ✅ Backend model updated:
  ```javascript
  // REMOVED (obsolete single-product fields):
  // productId, productName, productSKU, requestedQuantity, currentStock, lowStockThreshold

  // NEW multi-product structure:
  items: [
    {
      productId: ObjectId,
      productName: String,
      productSKU: String,
      requestedQuantity: Number,
      currentStock: Number (snapshot),
      lowStockThreshold: Number (snapshot),
      estimatedUnitCost: Number,
      estimatedTotalCost: Number (calculated)
    }
  ],
  attachments: [
    {
      filename: String,
      fileUrl: String,
      uploadedAt: Date
    }
  ],
  totalEstimatedCost: Number (sum of all items)
  ```
- ✅ Frontend sends FormData (required for file upload):
  ```javascript
  FormData:
    - balagruhaId: String
    - items: JSON.stringify([...items]) // ⚠️ Stringify array for multipart
    - reason: String
    - justification: String
    - attachments: File[] (via .append('attachments', file) for each)
  ```
- ✅ Backend parses `items` from JSON string
- ✅ Backend validates each product in items array
- ✅ Backend snapshots stock levels for each product at request time
- ✅ Backend stores file metadata in attachments array
- ✅ Files saved to `uploads/` directory with unique filenames
- ✅ Response includes populated items array with product details
- ✅ Request status set to `pending_approval`

### AC5: View Own Requests (Adapted for Multi-Product)

**CHANGED FROM OBSOLETE VERSION:** Table displays multi-product summaries

- ✅ Table shows:
  - Request ID (e.g., "PR-001")
  - **Total Items** (e.g., "3 products") - NEW
  - **Total Quantity** (sum across all products) - NEW
  - **Total Estimated Cost** (₹ formatted) - NEW
  - Reason (truncated with tooltip)
  - Attachments count (e.g., "📎 2 files") - NEW
  - Status badge (🟡 Pending, ✅ Approved, ❌ Rejected, ✅ Completed)
  - Actions (View Details, Cancel if pending)
- ✅ Click row → Opens ViewRequestModal with:
  - **Items table** showing all products in request
  - Individual product quantities and costs
  - Grand total
  - Attachment previews/downloads
  - Request reason/justification
  - Status history
- ✅ Only shows requests created by logged-in Purchase Manager
- ✅ Only shows requests for products from assigned balagruhas (frontend filtered)

### AC6: Cancel Pending Requests

- ✅ [Cancel] button visible only on `pending_approval` requests
- ✅ Confirmation modal: "Cancel this purchase request?"
- ✅ On confirm:
  - PUT /api/v2/shop/admin/purchase-requests/:id/cancel
  - Request status → `cancelled`
  - Row updates in real-time
  - Success toast notification
- ✅ Cannot cancel approved/rejected/completed requests
- ✅ Error handling for failed cancellations

### AC7: Export to PDF (Adapted for Multi-Product)

- ✅ [Export PDF] button visible in Shop Inventory view
- ✅ PDF includes:
  - Title: "Shop Purchase Requests"
  - Date range filter applied
  - Table columns:
    - Request ID
    - Total Items (count)
    - Total Quantity (sum)
    - Total Cost (₹)
    - Reason
    - Status
    - Date Created
  - Footer summary:
    - Total Requests: N
    - Pending Count: N
    - Total Estimated Value: ₹X,XXX.XX (across all displayed requests)
- ✅ PDF filename: `Purchase_Requests_YYYY-MM-DD.pdf`
- ✅ PDF generated using jsPDF + autoTable

---

## Technical Requirements

### Backend Implementation

#### 1. Model Refactoring: PurchaseRequest.js

**File:** `backend/models/purchaseRequest.js`

**Changes Required:**

```javascript
// ❌ REMOVE single-product fields:
// productId, productName, productSKU, requestedQuantity, currentStock, lowStockThreshold

// ✅ ADD items array:
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

// ✅ ADD attachments array:
attachments: [
  {
    filename: { type: String, required: true },
    fileUrl: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
  }
],

// ✅ ADD calculated total:
totalEstimatedCost: { type: Number, default: 0 }
```

**Add virtuals and pre-save hooks:**

```javascript
// Virtual: totalItems
purchaseRequestSchema.virtual('totalItems').get(function() {
  return this.items ? this.items.length : 0;
});

// Virtual: totalQuantity
purchaseRequestSchema.virtual('totalQuantity').get(function() {
  return this.items ? this.items.reduce((sum, item) => sum + item.requestedQuantity, 0) : 0;
});

// Pre-save: Calculate totalEstimatedCost
purchaseRequestSchema.pre('save', function(next) {
  if (this.items && this.items.length > 0) {
    this.totalEstimatedCost = this.items.reduce((sum, item) => sum + item.estimatedTotalCost, 0);
  }
  next();
});
```

#### 2. Route Update: Add File Upload Middleware

**File:** `backend/routes/v2/purchase-requests.js`

**Change:**

```javascript
const { upload } = require('../../middleware/upload'); // ✅ ADD THIS IMPORT

// CHANGE THIS ROUTE:
router.post(
  '/',
  authenticate,
  authorize('Purchase Management', 'Create'),
  upload.array('attachments', 5), // ✅ ADD THIS LINE (multer middleware)
  validateCreateRequest,
  purchaseRequestController.createPurchaseRequest
);
```

**That's it for the route!** Multer handles file uploads automatically.

#### 3. Controller Update: Handle Multi-Product + Files

**File:** `backend/controllers/purchaseRequestController.js`

**Update `createPurchaseRequest()` function:**

```javascript
exports.createPurchaseRequest = async (req, res) => {
  try {
    const { balagruhaId, items, reason, justification } = req.body;
    const userId = req.user._id;

    // ✅ Files are in req.files (uploaded by multer automatically)
    const uploadedFiles = req.files || [];

    // Validate items array
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one product is required'
      });
    }

    // ⚠️ Parse items (comes as JSON string in multipart form)
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

      // Validate balagruha access (Purchase Manager only)
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

    // ✅ Process uploaded files (REUSE pattern from machine repairs)
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

#### 4. Validation Update

**File:** `backend/middleware/validation/purchaseRequestValidation.js`

**Update validation for items array:**

```javascript
exports.validateCreateRequest = (req, res, next) => {
  const { items, reason } = req.body;

  // Parse items if it's a JSON string (multipart form data)
  let parsedItems;
  try {
    parsedItems = typeof items === 'string' ? JSON.parse(items) : items;
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Invalid items format'
    });
  }

  // Validate items array exists and not empty
  if (!parsedItems || !Array.isArray(parsedItems) || parsedItems.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'At least one product is required'
    });
  }

  // Validate each item
  for (const item of parsedItems) {
    if (!item.productId || !mongoose.Types.ObjectId.isValid(item.productId)) {
      return res.status(400).json({
        success: false,
        message: 'Valid product ID is required for all items'
      });
    }

    if (!item.requestedQuantity || item.requestedQuantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1 for all items'
      });
    }

    if (item.estimatedUnitCost === undefined || item.estimatedUnitCost < 0) {
      return res.status(400).json({
        success: false,
        message: 'Estimated unit cost must be provided for all items'
      });
    }
  }

  // Validate reason
  if (!reason || typeof reason !== 'string' || reason.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Reason is required'
    });
  }

  if (reason.length > 200) {
    return res.status(400).json({
      success: false,
      message: 'Reason cannot exceed 200 characters'
    });
  }

  // Validate justification (optional)
  if (req.body.justification && req.body.justification.length > 500) {
    return res.status(400).json({
      success: false,
      message: 'Justification cannot exceed 500 characters'
    });
  }

  next();
};
```

---

### Frontend Implementation

#### 1. Copy FilePreview Component from MachineRepairsView.jsx

**File:** `frontend/src/components/purchaseManagement/modals/CreatePurchaseRequestModal.jsx`

**Copy lines 87-131 from MachineRepairsView.jsx:**

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

#### 2. Update Modal State Structure

```javascript
const [formData, setFormData] = useState({
  balagruhaId: '',
  items: [],  // Array of { productId, productName, productSKU, requestedQuantity, estimatedUnitCost }
  reason: '',
  justification: '',
  attachments: []  // ✅ NEW
});

const [products, setProducts] = useState([]);
const [lowStockProducts, setLowStockProducts] = useState([]);
const [selectedProducts, setSelectedProducts] = useState(new Set());  // Track selected product IDs
const [showAllProducts, setShowAllProducts] = useState(false);  // Toggle filter
```

#### 3. Add Multi-Product Helper Functions

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

#### 4. Add File Upload Handlers

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

#### 5. Replace Dropdown with Checkbox List

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

#### 6. Add Selected Products Table

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

#### 7. Add File Upload JSX

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

#### 8. Update Submit to Use FormData

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate items
  if (formData.items.length === 0) {
    showToast('Please select at least one product', 'error');
    return;
  }

  // Validate all items have quantity and cost filled
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

    // ✅ Create FormData (required for file upload)
    const submitData = new FormData();

    // Add regular fields
    submitData.append('balagruhaId', formData.balagruhaId);
    submitData.append('items', JSON.stringify(formData.items)); // ⚠️ Stringify items array
    submitData.append('reason', formData.reason.trim());
    submitData.append('justification', formData.justification.trim());

    // Add files
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

## Implementation Notes

### Code Reuse Strategy

**GOOD NEWS:** File upload functionality already exists! No need to build from scratch.

**Reuse from:**
- `backend/middleware/upload.js` - Multer middleware (already installed)
- `backend/routes/v1/purchaseAndRepair.js` - Reference for `upload.array()` pattern
- `frontend/src/components/purchaseManagement/views/MachineRepairsView.jsx` - FilePreview component and file handlers

**Implementation Steps:**
1. Add `upload.array('attachments', 5)` to route (1 line!)
2. Copy FilePreview component (complete)
3. Copy file handlers (handleFileUpload, removeFile)
4. Copy file upload JSX section
5. Update submit to use FormData

**Estimated Savings:** ~5 hours (no need to install multer, create middleware, design UI)

### Multi-Product Architecture

**Key Design Decisions:**

1. **Items Array vs Single Product:**
   - Single request can contain 1-50 products (no hard limit)
   - Each item has independent quantity/cost
   - Total cost calculated across all items

2. **Frontend State Management:**
   - `selectedProducts` Set tracks which products are checked
   - `formData.items` array syncs with checkboxes
   - Table rows map directly to items array

3. **Backend Data Flow:**
   - Frontend sends items as JSON string in FormData
   - Backend parses and validates each product
   - Each product validated for balagruha access
   - Stock levels snapshotted at request time

### Validation Strategy

**Frontend Validation:**
- At least 1 product selected
- All products have quantity ≥ 1
- All products have cost filled (≥ 0)
- Reason not empty
- Justification ≤ 500 chars
- File count ≤ 5
- File sizes ≤ 5MB each

**Backend Validation:**
- Items array exists and not empty
- Each product ID valid and exists in DB
- Each product accessible by user's balagruhaIds
- Quantities and costs valid numbers
- Reason/justification length limits
- File types valid (handled by multer)

---

## Testing Strategy

### Unit Tests (Backend)

```javascript
describe('PurchaseRequest Model - Multi-Product', () => {
  it('should calculate totalEstimatedCost from items array', () => {
    const request = new PurchaseRequest({
      items: [
        { requestedQuantity: 10, estimatedUnitCost: 50, estimatedTotalCost: 500 },
        { requestedQuantity: 5, estimatedUnitCost: 100, estimatedTotalCost: 500 }
      ]
    });
    request.save();
    expect(request.totalEstimatedCost).toBe(1000);
  });

  it('should calculate totalItems virtual', () => {
    const request = new PurchaseRequest({ items: [{}, {}, {}] });
    expect(request.totalItems).toBe(3);
  });

  it('should calculate totalQuantity virtual', () => {
    const request = new PurchaseRequest({
      items: [
        { requestedQuantity: 10 },
        { requestedQuantity: 20 }
      ]
    });
    expect(request.totalQuantity).toBe(30);
  });
});
```

### Integration Tests (Backend)

```javascript
describe('POST /api/v2/shop/admin/purchase-requests - Multi-Product', () => {
  it('should create request with multiple products', async () => {
    const formData = new FormData();
    formData.append('items', JSON.stringify([
      { productId: prod1._id, requestedQuantity: 10, estimatedUnitCost: 50 },
      { productId: prod2._id, requestedQuantity: 5, estimatedUnitCost: 100 }
    ]));
    formData.append('reason', 'Low stock on multiple items');

    const response = await request(app)
      .post('/api/v2/shop/admin/purchase-requests')
      .set('Authorization', `Bearer ${token}`)
      .send(formData);

    expect(response.status).toBe(201);
    expect(response.body.data.purchaseRequest.items).toHaveLength(2);
    expect(response.body.data.purchaseRequest.totalEstimatedCost).toBe(1000);
  });

  it('should accept request with file attachments', async () => {
    const formData = new FormData();
    formData.append('items', JSON.stringify([...]));
    formData.append('attachments', fs.createReadStream('test/fixtures/quotation.pdf'));

    const response = await request(app)
      .post('/api/v2/shop/admin/purchase-requests')
      .set('Authorization', `Bearer ${token}`)
      .send(formData);

    expect(response.status).toBe(201);
    expect(response.body.data.purchaseRequest.attachments).toHaveLength(1);
    expect(response.body.data.purchaseRequest.attachments[0].filename).toBe('quotation.pdf');
  });
});
```

### E2E Tests (Playwright)

```javascript
test('TC-17.1: Create multi-product purchase request with files', async ({ page }) => {
  // Login as Purchase Manager
  await loginAsPurchaseManager(page);
  await page.goto('/purchase');

  // Select Shop Inventory view
  await page.selectOption('.purchase-type-dropdown', 'shop-inventory');

  // Click New Purchase Request
  await page.click('button:has-text("+ New Purchase Request")');

  // Wait for modal
  await page.waitForSelector('.modal-container');

  // Select balagruha
  await page.selectOption('select[name="balagruhaId"]', { index: 1 });

  // Select multiple products via checkboxes
  await page.check('input[type="checkbox"][data-product="notebook"]');
  await page.check('input[type="checkbox"][data-product="pencil"]');
  await page.check('input[type="checkbox"][data-product="eraser"]');

  // Wait for selected products table
  await expect(page.locator('.selected-items-table tbody tr')).toHaveCount(3);

  // Fill quantities and costs
  await page.fill('.selected-items-table tbody tr:nth-child(1) input[type="number"]:nth-child(1)', '50'); // qty
  await page.fill('.selected-items-table tbody tr:nth-child(1) input[type="number"]:nth-child(2)', '10'); // cost

  await page.fill('.selected-items-table tbody tr:nth-child(2) input[type="number"]:nth-child(1)', '100');
  await page.fill('.selected-items-table tbody tr:nth-child(2) input[type="number"]:nth-child(2)', '5');

  await page.fill('.selected-items-table tbody tr:nth-child(3) input[type="number"]:nth-child(1)', '75');
  await page.fill('.selected-items-table tbody tr:nth-child(3) input[type="number"]:nth-child(2)', '3');

  // Verify total cost calculated
  await expect(page.locator('.total-amount')).toContainText('₹1,025.00');

  // Upload file
  await page.setInputFiles('#purchase-request-file-upload', 'test-files/quotation.pdf');

  // Verify file preview
  await expect(page.locator('.attachment-item')).toHaveCount(1);

  // Fill reason
  await page.fill('input[placeholder*="Why"]', 'Stationery stock critically low');

  // Submit
  await page.click('button:has-text("Create Request")');

  // Verify success
  await expect(page.locator('.toast-success')).toContainText('created successfully');

  // Verify request appears in table
  await expect(page.locator('table tbody tr').first()).toContainText('3 products');
  await expect(page.locator('table tbody tr').first()).toContainText('225'); // total qty
  await expect(page.locator('table tbody tr').first()).toContainText('₹1,025.00');
  await expect(page.locator('table tbody tr').first()).toContainText('📎 1 file');
});
```

---

## Dependencies

### Technical Dependencies

✅ **Already Complete:**
- ShopItem model with balagruhaId field
- Multer middleware (`backend/middleware/upload.js`)
- File upload route pattern (machine repairs)
- FilePreview component (MachineRepairsView)
- OLD RBAC permissions system

⚠️ **Requires:**
- Story 18: Admin Approval Workflow (dependent - uses same model)
- Story 19: Stock Update & Audit Trail (dependent - completes workflow)

### Story Relationship

**Story 17 (This Story):**
- Purchase Manager creates multi-product requests with files
- Status: `pending_approval`
- No approval or stock update functionality

**Story 18 (Dependent):**
- Admin approves/rejects requests
- Status changes: `pending_approval` → `approved` / `rejected`

**Story 19 (Dependent):**
- Purchase Manager updates stock after approval
- Status changes: `approved` → `completed`
- Creates InventoryTransaction records

**All 3 stories use the same PurchaseRequest model.**

---

## Key Differences from Obsolete Version

| Aspect | Obsolete Version | New Version (This Story) |
|--------|-----------------|-------------------------|
| **Product Selection** | Single dropdown | Multi-select checkboxes |
| **Data Model** | Single product fields | Items array |
| **Cost Input** | Single field | Per-product table input |
| **Total Calculation** | N/A | Real-time grand total |
| **File Upload** | ❌ Not supported | ✅ Up to 5 files (PDF, images) |
| **File Preview** | N/A | Image thumbnails, PDF icons |
| **Request View** | Single product display | Items table with totals |
| **Export PDF** | Single-line per request | Shows total items/quantity/cost |
| **Backend Model** | productId, quantity fields | items[], attachments[] |
| **Validation** | Single product validation | Array validation per item |
| **Submit Method** | JSON POST | FormData POST (multipart) |

---

## Dev Agent Record

**Developer:** Claude (Anthropic AI Assistant)
**Development Start:** 2025-10-30 (continued from previous session)
**Development Complete:** 2025-10-30 19:34:23
**Agent Model Used:** Claude 3.5 Sonnet (claude-sonnet-4-5-20250929)

### Bug Fixes Completed

**BUG-S17-PRODUCT-FILTER - Double Filtering Issue**
- **Problem:** Products weren't displaying due to redundant filtering logic
- **Root Cause:** Products filtered twice - once in `fetchProducts()` and again in render
- **Fix:** Removed redundant `.filter()` call on line 398 in CreatePurchaseRequestModal.jsx
- **File:** `frontend/src/components/purchaseManagement/modals/CreatePurchaseRequestModal.jsx:398`

**BUG-S17-API-ENDPOINT - Wrong API URL**
- **Problem:** API call returning 400 Bad Request error
- **Error:** `Failed to load resource: 400 (Bad Request) @ http://localhost:5001/api/v2/shop/admin/products`
- **Root Cause:** Calling non-existent `/api/v2/shop/admin/products` endpoint
- **Fix:** Changed to correct public endpoint `/api/v2/shop/products`
- **File:** `frontend/src/api.js:1916`
- **Verification:** Tested with curl - endpoint works, returns 42 products

**BUG-S17-API-RESPONSE-FORMAT - Response Format Mismatch**
- **Problem:** Products still not appearing even after endpoint fix
- **Root Cause:** API returns `{products: [...], pagination: {...}}` but modal expected `{success: true, data: [...]}`
- **Fix:** Wrapped API response to match expected format
- **File:** `frontend/src/api.js:1918-1921`
- **Code Change:**
  ```javascript
  return {
    success: true,
    data: response.data.products || []
  };
  ```

### UI Enhancement - Multi-Select Dropdown with Search

**Motivation:** User feedback that long vertical checkbox list was "visually very unappealing"

**Implementation Details:**
- Replaced long vertical checkbox list with professional dropdown component
- Added dropdown trigger button showing selection count (e.g., "3 products selected")
- Implemented search bar at top for filtering by product name or SKU
- Scrollable panel with max-height: 400px for better usability
- Checkboxes on left with product details (name, SKU, stock info)
- Real-time case-insensitive search filtering
- Professional hover effects and styling

**Features:**
- Click dropdown to expand/collapse product list
- Search bar filters products in real-time
- Select multiple products via checkboxes
- Visual feedback for selection count
- Responsive design with smooth transitions

**Testing:**
- Tested with 42 products loading correctly
- Search functionality verified with "umbrella" query - correctly filtered to 1 result
- Dropdown open/close functionality verified
- Product selection state management verified
- Screenshot saved: `.playwright-mcp/story17-dropdown-ui-enhancement.png`

### Commits
- `d23177c` - fix(story-17): Fix product loading bugs and implement dropdown UI enhancement

### Files Created/Modified

1. **frontend/src/api.js** (lines 1914-1926)
   - Fixed API endpoint from `/api/v2/shop/admin/products` to `/api/v2/shop/products`
   - Wrapped API response to match expected format `{success: true, data: products}`

2. **frontend/src/components/purchaseManagement/modals/CreatePurchaseRequestModal.jsx**
   - Lines 33-40: Added dropdown state (`productDropdownOpen`, `productSearchQuery`)
   - Lines 383-481: Replaced checkbox list with multi-select dropdown UI
   - Added dropdown trigger button, search bar, scrollable options panel

3. **frontend/src/components/purchaseManagement/PurchaseManagement.css**
   - Added 150+ lines of dropdown styling
   - Styles for `.multi-select-dropdown`, `.dropdown-trigger`, `.dropdown-panel`
   - Search input, dropdown options, hover effects
   - Responsive and accessible design

### Change Log

**2025-10-30 - Bug Fixes and UI Enhancement**
- Fixed three critical bugs preventing product display in create purchase request modal
- Implemented professional multi-select dropdown with search functionality
- Improved user experience with better visual design
- All 42 shop products now load and display correctly
- Search filtering works on both product name and SKU
- Tested end-to-end with Playwright MCP - all functionality verified

### Completion Notes

**Implementation Status:** ✅ COMPLETE

**Testing Results:**
- All three bugs successfully fixed
- Products now loading correctly (42 products verified)
- Dropdown UI enhancement fully functional
- Search feature working as expected
- No console errors
- End-to-end testing completed with Playwright MCP

**User Acceptance:**
- User manually tested the flow
- Identified the bugs that were preventing product display
- Requested the dropdown UI enhancement for better usability
- All requested features have been implemented and verified

**Known Issues:** None

**Next Steps:**
- Documentation complete
- Ready for commit and push to git
- Ready for QA testing

---

## QA Results

**QA Agent:** (To be filled by QA Agent)
**Testing Start:** (Timestamp)
**Testing Complete:** (Timestamp)

### Test Execution Summary
- (Test results)

### Acceptance Criteria Validation
- (AC pass/fail status)

### Quality Gate Decision
- (PASS/FAIL with score)

### Bugs Found
- (Bug reports)

---

**Last Updated:** 2025-10-30 19:34:23 (via `date '+%Y-%m-%d %H:%M:%S'`)
**Created By:** Documentation Agent (Task: Create comprehensive Story 17 document)
**Updated By:** Dev Agent (Task: Document bug fixes and UI enhancement)
