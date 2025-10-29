# Story 19: Stock Update & Audit Trail (Purchase Manager)

**Story ID:** Sprint5-Story-19
**Epic:** Sprint5-Epic-05 (Purchase Manager Workflow)
**Priority:** High
**Status:** Ready for Development
**Estimate:** 1 day
**Created:** 2025-10-29 16:37:42
**Last Updated:** 2025-10-29 16:37:42

---

## User Story

**As a** Purchase Manager
**I want to** update inventory stock after receiving purchased items
**So that** the system reflects accurate stock levels with complete audit trail linking to the purchase request

---

## Business Context

After Admin approves a purchase request, the Purchase Manager:
1. Places order with supplier
2. Receives the items
3. Needs to update the system to reflect new stock

This story completes the purchase workflow by allowing Purchase Managers to:
- Record supplier and purchase details (invoice, cost, date)
- Update shop inventory stock
- Create complete audit trail linking purchase request → inventory transaction
- Mark request as completed

This ensures every inventory change is traceable back to its original purchase request and approval.

---

## Acceptance Criteria

### AC1: View Approved Requests
- ✅ Purchase Manager sees approved requests in Shop Inventory view
- ✅ Approved requests show:
  - ✅ Approved status badge
  - Approved by: [Admin name]
  - Approved on: [Date/time]
  - Admin notes (if any)
  - [📦 Update Stock] button visible
- ✅ Cannot update stock for pending/rejected/cancelled/completed requests
- ✅ Only own approved requests are visible (frontend filtered)

### AC2: Update Stock Modal
- ✅ Purchase Manager clicks [📦 Update Stock] button
- ✅ Modal opens with two sections:
  - **Part 1: Purchase Details** (supplier, invoice, cost)
  - **Part 2: Stock Update** (quantity received, notes)
- ✅ Form fields:
  - Supplier Name (text, required, max 100 chars)
  - Invoice Number (text, required, max 50 chars)
  - Purchase Date (date, required, cannot be future date)
  - Actual Cost (number, optional, min 0)
  - Quantity Received (number, required, min 1, defaults to requested quantity)
  - Receipt Notes (textarea, optional, max 500 chars)
- ✅ Shows stock projection:
  - Current Stock: [X]
  - Quantity Received: [Y]
  - New Stock: [X + Y]
- ✅ Confirmation message before submitting

### AC3: Stock Update Processing
- ✅ On submit:
  - POST /api/v2/shop/admin/purchase-requests/:id/complete
  - Backend performs atomic transaction:
    1. Updates ShopItem.stock (add received quantity)
    2. Creates InventoryTransaction record
    3. Updates PurchaseRequest (status → 'completed', links inventoryTransactionId)
  - Success toast: "Stock updated successfully"
  - Modal closes
  - Request status changes to "✅ Completed"

### AC4: Inventory Transaction Creation
- ✅ System creates InventoryTransaction with:
  - productId: [from request]
  - transactionType: 'purchase_request'
  - quantity: [quantity received]
  - previousStock: [stock before update]
  - newStock: [stock after update]
  - reference.type: 'purchase_request'
  - reference.id: [purchase request ID]
  - reason: "Purchase Request #{requestId} - {supplier name}"
  - notes: [receipt notes from form]
  - performedBy: [Purchase Manager user ID]
- ✅ Transaction appears in Inventory Management audit trail

### AC5: Completed Request View
- ✅ Completed requests show:
  - ✅ Completed status badge
  - Completed by: [Purchase Manager name]
  - Completed on: [Date/time]
  - Supplier: [Name]
  - Invoice: [Number]
  - Purchase Date: [Date]
  - Actual Cost: [₹Amount]
  - Quantity Received: [X units]
  - Final Stock: [New stock level]
- ✅ [View Details] button shows full workflow timeline:
  - Created by [PM] on [Date]
  - Approved by [Admin] on [Date] - [Notes]
  - Completed by [PM] on [Date] - [Supplier, Invoice]
  - Stock Updated: [X] → [Y] units
  - Inventory Transaction: [Link to audit trail]

### AC6: Validation & Error Handling
- ✅ Cannot update stock twice (idempotency check)
- ✅ If request already completed, show error: "This request has already been completed"
- ✅ Validate received quantity > 0
- ✅ Validate supplier name not empty
- ✅ Validate invoice number not empty
- ✅ Validate purchase date not in future
- ✅ Atomic transaction - if any step fails, rollback all changes

### AC7: Audit Trail Integration
- ✅ Inventory Management page shows updated stock immediately
- ✅ Audit trail in Inventory Management shows:
  - Type: "Purchase Request"
  - Reason: "Purchase Request #PR-001 - StatCo Suppliers"
  - Reference: Link to purchase request details
  - Performed by: [Purchase Manager]
  - Quantity: +50 units
  - Stock: 5 → 55
- ✅ Can click reference link to view full purchase request

---

## Technical Specifications

### Backend Implementation

#### 1. Controller Method (Add to purchaseRequestController.js)

**File:** `backend/controllers/purchaseRequestController.js`

```javascript
const InventoryTransaction = require('../models/inventoryTransaction');
const mongoose = require('mongoose');

/**
 * @route   POST /api/v2/shop/admin/purchase-requests/:id/complete
 * @desc    Complete purchase request and update stock (Purchase Manager)
 * @access  Private (Purchase Management:Update)
 */
exports.completePurchaseRequest = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const {
      supplierName,
      invoiceNumber,
      purchaseDate,
      actualCost,
      receivedQuantity,
      receiptNotes
    } = req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!supplierName?.trim()) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Supplier name is required'
      });
    }

    if (!invoiceNumber?.trim()) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Invoice number is required'
      });
    }

    if (!purchaseDate) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Purchase date is required'
      });
    }

    if (!receivedQuantity || receivedQuantity < 1) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Received quantity must be at least 1'
      });
    }

    // Validate purchase date not in future
    if (new Date(purchaseDate) > new Date()) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Purchase date cannot be in the future'
      });
    }

    // Get purchase request
    const request = await PurchaseRequest.findById(id).session(session);

    if (!request) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: 'Purchase request not found'
      });
    }

    // 🔥 VALIDATION: Can only complete approved requests
    if (request.status !== 'approved') {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: `Cannot complete ${request.status} request. Only approved requests can be completed.`
      });
    }

    // 🔥 VALIDATION: Only requester can complete
    if (request.requestedBy.toString() !== userId.toString()) {
      await session.abortTransaction();
      return res.status(403).json({
        success: false,
        message: 'You can only complete your own requests'
      });
    }

    // 🔥 IDEMPOTENCY: Check if already completed
    if (request.inventoryTransactionId) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'This request has already been completed and stock updated'
      });
    }

    // Get product
    const product = await ShopItem.findById(request.productId).session(session);

    if (!product) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Store previous stock
    const previousStock = product.stock;
    const newStock = previousStock + receivedQuantity;

    // 🔥 STEP 1: Update product stock
    product.stock = newStock;
    await product.save({ session });

    // 🔥 STEP 2: Create inventory transaction
    const transaction = new InventoryTransaction({
      productId: product._id,
      transactionType: 'purchase_request',
      quantity: receivedQuantity,
      previousStock: previousStock,
      newStock: newStock,
      reference: {
        type: 'purchase_request',
        id: request._id
      },
      reason: `Purchase Request ${request.requestId} - ${supplierName.trim()}`,
      notes: receiptNotes?.trim() || `Invoice: ${invoiceNumber.trim()}`,
      performedBy: userId
    });

    await transaction.save({ session });

    // 🔥 STEP 3: Update purchase request
    request.status = 'completed';
    request.completedBy = userId;
    request.completedAt = new Date();
    request.supplierName = supplierName.trim();
    request.invoiceNumber = invoiceNumber.trim();
    request.purchaseDate = new Date(purchaseDate);
    request.actualCost = actualCost || 0;
    request.receivedQuantity = receivedQuantity;
    request.inventoryTransactionId = transaction._id;

    await request.save({ session });

    // Commit transaction
    await session.commitTransaction();

    // Populate for response
    await request.populate('requestedBy', 'name email');
    await request.populate('reviewedBy', 'name email');
    await request.populate('completedBy', 'name email');
    await request.populate('productId', 'name sku stock');
    await request.populate('inventoryTransactionId');

    res.json({
      success: true,
      message: 'Stock updated successfully',
      data: {
        request,
        previousStock,
        newStock,
        transactionId: transaction._id
      }
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

module.exports = exports;
```

---

#### 2. Update InventoryTransaction Model

**File:** `backend/models/inventoryTransaction.js`

Add new enum value to existing model:

```javascript
// Add to transactionType enum
transactionType: {
  type: String,
  enum: ['purchase', 'sale', 'adjustment', 'return', 'correction', 'purchase_request'],  // Added 'purchase_request'
  required: true
},

// Add to reference.type enum
reference: {
  type: {
    type: String,
    enum: ['order', 'purchase', 'manual', 'bulk_import', 'purchase_request'],  // Added 'purchase_request'
    required: true
  },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
}
```

---

#### 3. Routes (Add to purchase-requests.js)

**File:** `backend/routes/v2/purchase-requests.js`

```javascript
// Complete purchase request and update stock
router.post(
  '/:id/complete',
  authenticate,
  authorize('Purchase Management', 'Update'),
  validateRequestId,
  validateStockUpdate,
  purchaseRequestController.completePurchaseRequest
);

module.exports = router;
```

---

#### 4. Validation Middleware

**File:** `backend/middleware/validation/purchaseRequestValidation.js`

```javascript
exports.validateStockUpdate = (req, res, next) => {
  const {
    supplierName,
    invoiceNumber,
    purchaseDate,
    actualCost,
    receivedQuantity
  } = req.body;

  // Validate supplier name
  if (!supplierName || typeof supplierName !== 'string' || supplierName.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Supplier name is required'
    });
  }

  if (supplierName.length > 100) {
    return res.status(400).json({
      success: false,
      message: 'Supplier name cannot exceed 100 characters'
    });
  }

  // Validate invoice number
  if (!invoiceNumber || typeof invoiceNumber !== 'string' || invoiceNumber.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Invoice number is required'
    });
  }

  if (invoiceNumber.length > 50) {
    return res.status(400).json({
      success: false,
      message: 'Invoice number cannot exceed 50 characters'
    });
  }

  // Validate purchase date
  if (!purchaseDate) {
    return res.status(400).json({
      success: false,
      message: 'Purchase date is required'
    });
  }

  const purchaseDateObj = new Date(purchaseDate);
  if (isNaN(purchaseDateObj.getTime())) {
    return res.status(400).json({
      success: false,
      message: 'Invalid purchase date'
    });
  }

  if (purchaseDateObj > new Date()) {
    return res.status(400).json({
      success: false,
      message: 'Purchase date cannot be in the future'
    });
  }

  // Validate actual cost (optional)
  if (actualCost !== undefined && actualCost !== null) {
    if (typeof actualCost !== 'number' || actualCost < 0) {
      return res.status(400).json({
        success: false,
        message: 'Actual cost must be a non-negative number'
      });
    }
  }

  // Validate received quantity
  if (!receivedQuantity || typeof receivedQuantity !== 'number' || receivedQuantity < 1) {
    return res.status(400).json({
      success: false,
      message: 'Received quantity must be at least 1'
    });
  }

  // Validate receipt notes (optional)
  if (req.body.receiptNotes && req.body.receiptNotes.length > 500) {
    return res.status(400).json({
      success: false,
      message: 'Receipt notes cannot exceed 500 characters'
    });
  }

  next();
};

module.exports = exports;
```

---

### Frontend Implementation

#### 1. Update Stock Modal

**File:** `frontend/src/components/purchaseManagement/modals/UpdateStockModal.jsx`

```javascript
import React, { useState } from 'react';
import { completePurchaseRequest } from '../../../api';
import showToast from '../../../utils/toast';
import dayjs from 'dayjs';

export default function UpdateStockModal({ request, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    supplierName: '',
    invoiceNumber: '',
    purchaseDate: dayjs().format('YYYY-MM-DD'),
    actualCost: '',
    receivedQuantity: request.requestedQuantity,
    receiptNotes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.supplierName.trim()) {
      showToast('Supplier name is required', 'error');
      return;
    }

    if (!formData.invoiceNumber.trim()) {
      showToast('Invoice number is required', 'error');
      return;
    }

    if (!formData.purchaseDate) {
      showToast('Purchase date is required', 'error');
      return;
    }

    if (formData.receivedQuantity < 1) {
      showToast('Received quantity must be at least 1', 'error');
      return;
    }

    // Confirm before updating
    const confirmed = window.confirm(
      `Update stock from ${request.currentStock} to ${request.currentStock + formData.receivedQuantity} units?`
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      const response = await completePurchaseRequest(request._id, {
        supplierName: formData.supplierName.trim(),
        invoiceNumber: formData.invoiceNumber.trim(),
        purchaseDate: formData.purchaseDate,
        actualCost: formData.actualCost ? parseFloat(formData.actualCost) : 0,
        receivedQuantity: parseInt(formData.receivedQuantity),
        receiptNotes: formData.receiptNotes.trim()
      });

      if (response.success) {
        showToast('Stock updated successfully', 'success');
        onSuccess();
      } else {
        showToast(response.message || 'Error updating stock', 'error');
      }
    } catch (error) {
      console.error('Error updating stock:', error);
      showToast(error.message || 'Error updating stock', 'error');
    } finally {
      setLoading(false);
    }
  };

  const projectedStock = request.currentStock + parseInt(formData.receivedQuantity || 0);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container update-stock-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>📦 Update Inventory Stock</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Request Summary */}
            <div className="request-summary">
              <div className="summary-header">
                <h4>✅ Approved Purchase Request</h4>
                <span className="request-id">{request.requestId}</span>
              </div>

              <div className="summary-grid">
                <div className="summary-item">
                  <label>Product:</label>
                  <span>{request.productName} ({request.productSKU})</span>
                </div>
                <div className="summary-item">
                  <label>Current Stock:</label>
                  <span className="stock-value">{request.currentStock} units</span>
                </div>
                <div className="summary-item">
                  <label>Approved Quantity:</label>
                  <span className="approved-qty">{request.requestedQuantity} units</span>
                </div>
                <div className="summary-item">
                  <label>Approved By:</label>
                  <span>{request.reviewedBy?.name} on {dayjs(request.reviewedAt).format('DD-MM-YYYY')}</span>
                </div>
              </div>

              {request.reviewNotes && (
                <div className="admin-notes">
                  <label>Admin Notes:</label>
                  <p>{request.reviewNotes}</p>
                </div>
              )}
            </div>

            <hr />

            {/* Purchase Details Section */}
            <div className="section">
              <h4>📝 Purchase Details</h4>

              <div className="form-row">
                <div className="form-group">
                  <label>Supplier Name *</label>
                  <input
                    type="text"
                    maxLength="100"
                    value={formData.supplierName}
                    onChange={(e) => setFormData(prev => ({ ...prev, supplierName: e.target.value }))}
                    placeholder="Enter supplier/vendor name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Invoice Number *</label>
                  <input
                    type="text"
                    maxLength="50"
                    value={formData.invoiceNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                    placeholder="INV-2025-001"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Purchase Date *</label>
                  <input
                    type="date"
                    max={dayjs().format('YYYY-MM-DD')}
                    value={formData.purchaseDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, purchaseDate: e.target.value }))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Actual Cost (Optional)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.actualCost}
                    onChange={(e) => setFormData(prev => ({ ...prev, actualCost: e.target.value }))}
                    placeholder="₹ 0.00"
                  />
                </div>
              </div>
            </div>

            <hr />

            {/* Stock Update Section */}
            <div className="section">
              <h4>📦 Stock Received</h4>

              <div className="form-group">
                <label>Quantity Received *</label>
                <input
                  type="number"
                  min="1"
                  value={formData.receivedQuantity}
                  onChange={(e) => setFormData(prev => ({ ...prev, receivedQuantity: e.target.value }))}
                  required
                />
                <small className="form-hint">
                  Approved: {request.requestedQuantity} units
                </small>
              </div>

              <div className="form-group">
                <label>Receipt Notes (Optional)</label>
                <textarea
                  rows="3"
                  maxLength="500"
                  value={formData.receiptNotes}
                  onChange={(e) => setFormData(prev => ({ ...prev, receiptNotes: e.target.value }))}
                  placeholder="Condition of items, packaging notes, etc."
                />
                <small className="char-count">{formData.receiptNotes.length}/500</small>
              </div>
            </div>

            <hr />

            {/* Stock Projection */}
            <div className="stock-projection-box">
              <h4>📊 Stock Update Summary</h4>
              <div className="projection-display">
                <div className="projection-item">
                  <span className="label">Current Stock:</span>
                  <span className="value current">{request.currentStock}</span>
                </div>
                <div className="projection-arrow">+</div>
                <div className="projection-item">
                  <span className="label">Quantity Received:</span>
                  <span className="value received">{formData.receivedQuantity}</span>
                </div>
                <div className="projection-arrow">=</div>
                <div className="projection-item">
                  <span className="label">New Stock:</span>
                  <span className="value new">{projectedStock}</span>
                </div>
              </div>

              {projectedStock > request.lowStockThreshold && (
                <div className="success-message">
                  ✅ Stock will be above threshold ({request.lowStockThreshold} units)
                </div>
              )}
            </div>

            {/* Warning */}
            <div className="warning-box">
              <p>⚠️ This action will:</p>
              <ul>
                <li>Update {request.productName} stock to <strong>{projectedStock} units</strong></li>
                <li>Create inventory transaction record</li>
                <li>Mark this purchase request as completed</li>
                <li><strong>This action cannot be undone</strong></li>
              </ul>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button primary"
              disabled={loading}
            >
              {loading ? 'Updating Stock...' : '✅ Update Stock & Complete'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

---

#### 2. Add API Function

**File:** `frontend/src/api.js`

```javascript
export const completePurchaseRequest = async (id, data) => {
  try {
    const response = await api.post(`/api/v2/shop/admin/purchase-requests/${id}/complete`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
```

---

#### 3. Update ShopInventoryView.jsx

Add Update Stock modal integration:

```javascript
import UpdateStockModal from '../modals/UpdateStockModal';

// Add to state
const [showUpdateStockModal, setShowUpdateStockModal] = useState(false);

// Add handler
const handleUpdateStock = (request) => {
  setSelectedRequest(request);
  setShowUpdateStockModal(true);
};

// Update table actions column (already shown in Story 18)
{userRole === 'purchase-manager' && request.status === 'approved' && (
  <button
    className="action-button primary"
    onClick={() => handleUpdateStock(request)}
    title="Update Stock"
  >
    📦 Update Stock
  </button>
)}

// Add modal at the end
{showUpdateStockModal && selectedRequest && (
  <UpdateStockModal
    request={selectedRequest}
    onClose={() => {
      setShowUpdateStockModal(false);
      setSelectedRequest(null);
    }}
    onSuccess={() => {
      setShowUpdateStockModal(false);
      setSelectedRequest(null);
      fetchPurchaseRequests();
    }}
  />
)}
```

---

## E2E Test Scenarios (Playwright)

### Test Case 1: Complete Purchase Request Flow
```javascript
test('TC-19.1: Purchase Manager can update stock after approval', async ({ page }) => {
  // Login as Purchase Manager
  await loginAsPurchaseManager(page, 'ramesh@isf.com');

  // Navigate to Shop Inventory
  await page.goto('/purchase');
  await page.selectOption('.purchase-type-dropdown', 'shop-inventory');

  // Find approved request
  const approvedRow = page.locator('table tbody tr').filter({ hasText: 'Approved' }).first();
  await expect(approvedRow).toBeVisible();

  // Get current stock value
  const currentStockText = await approvedRow.locator('.stock-info .stock-value').textContent();
  const currentStock = parseInt(currentStockText.split('/')[0].trim());

  // Click Update Stock button
  await approvedRow.locator('button:has-text("Update Stock")').click();

  // Modal opens
  await expect(page.locator('.update-stock-modal')).toBeVisible();

  // Verify approved request details shown
  await expect(page.locator('.request-summary')).toContainText(request.productName);
  await expect(page.locator('.request-summary')).toContainText('Approved By');

  // Fill purchase details
  await page.fill('input[placeholder*="supplier"]', 'StatCo Suppliers');
  await page.fill('input[placeholder*="INV"]', 'INV-2025-001');
  await page.fill('input[type="date"]', dayjs().format('YYYY-MM-DD'));
  await page.fill('input[placeholder*="₹"]', '5000');

  // Verify quantity pre-filled
  const receivedQty = await page.inputValue('input[type="number"][min="1"]');
  expect(parseInt(receivedQty)).toBeGreaterThan(0);

  // Add receipt notes
  await page.fill('textarea', 'Items received in good condition');

  // Verify stock projection
  const projectedStock = currentStock + parseInt(receivedQty);
  await expect(page.locator('.projection-display .value.new')).toContainText(projectedStock.toString());

  // Submit
  page.on('dialog', dialog => dialog.accept());  // Auto-confirm
  await page.click('button:has-text("Update Stock & Complete")');

  // Verify success
  await expect(page.locator('.toast-success')).toContainText('Stock updated successfully');

  // Verify status changed to Completed
  await expect(approvedRow).toContainText('Completed');
  await expect(approvedRow.locator('.status-badge.status-completed')).toBeVisible();

  // Verify Update Stock button gone
  await expect(approvedRow.locator('button:has-text("Update Stock")')).not.toBeVisible();
});
```

### Test Case 2: Audit Trail Created
```javascript
test('TC-19.2: Inventory transaction created with full audit trail', async ({ page }) => {
  // Complete purchase request (using helper)
  const request = await completePurchaseRequest(page, {
    supplier: 'StatCo',
    invoice: 'INV-001',
    quantity: 50
  });

  // Navigate to Inventory Management
  await page.goto('/shop/admin/inventory');

  // Find the product
  const productRow = page.locator(`table tbody tr:has-text("${request.productName}")`);

  // Click audit trail button
  await productRow.locator('button[title*="audit"]').click();

  // Audit trail modal opens
  await expect(page.locator('.audit-trail-modal')).toBeVisible();

  // Find the purchase request transaction
  const transaction = page.locator('.transaction-row').filter({ hasText: 'Purchase Request' }).first();
  await expect(transaction).toBeVisible();

  // Verify transaction details
  await expect(transaction).toContainText(`Purchase Request ${request.requestId}`);
  await expect(transaction).toContainText('StatCo');
  await expect(transaction).toContainText('+50 units');
  await expect(transaction).toContainText(request.requesterName);

  // Click to view full details
  await transaction.click();

  // Should show link to purchase request
  await expect(page.locator('.transaction-details')).toContainText('View Purchase Request');

  // Click link
  await page.click('a:has-text("View Purchase Request")');

  // Should navigate to purchase request details
  await expect(page.locator('.purchase-request-details')).toContainText(request.requestId);
  await expect(page.locator('.workflow-timeline')).toContainText('Created');
  await expect(page.locator('.workflow-timeline')).toContainText('Approved');
  await expect(page.locator('.workflow-timeline')).toContainText('Completed');
});
```

### Test Case 3: Cannot Complete Twice (Idempotency)
```javascript
test('TC-19.3: Cannot update stock twice for same request', async ({ page }) => {
  // Complete request once
  await completePurchaseRequest(page, {
    supplier: 'StatCo',
    invoice: 'INV-001',
    quantity: 50
  });

  // Verify status is Completed
  const completedRow = page.locator('table tbody tr').filter({ hasText: 'Completed' }).first();
  await expect(completedRow).toBeVisible();

  // Update Stock button should not be visible
  await expect(completedRow.locator('button:has-text("Update Stock")')).not.toBeVisible();

  // Try to directly call API (simulate bypass attempt)
  const response = await page.evaluate(async (requestId) => {
    const res = await fetch(`/api/v2/shop/admin/purchase-requests/${requestId}/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        supplierName: 'Test',
        invoiceNumber: 'TEST-002',
        purchaseDate: new Date(),
        receivedQuantity: 10
      })
    });
    return res.json();
  }, request._id);

  // Should get error
  expect(response.success).toBe(false);
  expect(response.message).toContain('already been completed');
});
```

---

## Dev Agent Record

**Developer:** [TBD - Will be filled by Dev Agent]
**Development Start:** [TBD]
**Development Complete:** [TBD]
**Commits:**
- [TBD]

**Notes:**
- [TBD]

---

## QA Results

**QA Agent:** [TBD - Will be filled by QA Agent]
**Testing Start:** [TBD]
**Testing Complete:** [TBD]

**Test Summary:**
- Unit Tests: [TBD] / [TBD] passed
- Integration Tests: [TBD] / [TBD] passed
- E2E Tests: [TBD] / [TBD] passed

**Bugs Found:** [TBD]

**Quality Score:** [TBD] / 100

**Status:** [TBD - PASS/FAIL]

---

**Last Updated:** 2025-10-29 16:37:42 (via `date '+%Y-%m-%d %H:%M:%S'`)
**Updated By:** Orchestrator (BMad)
