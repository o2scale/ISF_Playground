# Story 19: Multi-Product Stock Update & Audit Trail (Purchase Manager)

**Story ID:** Sprint5-Story-19
**Epic:** Sprint5-Epic-05 (Purchase Manager Workflow)
**Priority:** High
**Status:** Ready for Development
**Estimate:** 1.5 days (increased from 1 day due to multi-product complexity)
**Created:** 2025-10-29 16:37:42
**Last Updated:** 2025-10-30 13:08:54

---

## User Story

**As a** Purchase Manager
**I want to** update inventory stock for **MULTIPLE products** after receiving purchased items
**So that** the system reflects accurate stock levels for all products with complete audit trail linking to the purchase request

---

## Business Context

After Admin approves a **multi-product** purchase request, the Purchase Manager:
1. Places order with supplier
2. Receives the items (potentially all products or partial delivery)
3. Needs to update the system to reflect new stock **for all products** in the request

This story completes the purchase workflow by allowing Purchase Managers to:
- Record supplier and purchase details (invoice, cost, date) **for the entire order**
- Update shop inventory stock **for MULTIPLE products atomically**
- Create complete audit trail linking purchase request → **multiple inventory transactions** (one per product)
- Mark request as completed

This ensures every inventory change is traceable back to its original purchase request and approval.

### Key Changes from Original Story 19:

**CRITICAL UPDATE:** Story 17 introduced multi-product purchase requests with `items[]` array. Story 19 must now handle:
- **Multiple products** in a single request (not single product)
- **Atomic stock updates** across all products (MongoDB transaction required)
- **Multiple InventoryTransaction records** (one per product)
- **Per-product received quantities** (e.g., ordered 3 products, received different quantities for each)

**Dependencies:**
- ✅ Story 17 (Multi-Product Purchase Request Creation) - MUST BE COMPLETE
- ✅ Story 18 (Admin Approval Workflow) - MUST BE COMPLETE

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

### AC2: Update Stock Modal (UPDATED FOR MULTI-PRODUCT)
- ✅ Purchase Manager clicks [📦 Update Stock] button
- ✅ Modal opens with three sections:
  - **Part 1: Request Summary** (shows all approved products)
  - **Part 2: Purchase Details** (supplier, invoice, cost for entire order)
  - **Part 3: Stock Update** (per-product quantities received)
- ✅ **Part 1: Request Summary Table** - **NEW**
  - Shows items table similar to Story 18 approval modal
  - Columns: Product, SKU, Approved Qty, Current Stock
  - Read-only display of what was approved
- ✅ **Part 2: Purchase Details Form** (same as before)
  - Supplier Name (text, required, max 100 chars)
  - Invoice Number (text, required, max 50 chars)
  - Purchase Date (date, required, cannot be future date)
  - Actual Total Cost (number, optional, min 0) - **For entire order**
  - Receipt Notes (textarea, optional, max 500 chars)
- ✅ **Part 3: Stock Update Table** - **NEW**
  - Editable table with columns:
    - Product Name (read-only)
    - SKU (read-only)
    - Current Stock (read-only)
    - Approved Qty (read-only)
    - **Received Qty** (editable number input, required, defaults to approved qty)
    - **New Stock** (calculated: Current + Received)
  - Each row has independent quantity input
  - Real-time calculation of new stock per product
- ✅ Shows **aggregate stock projection** below table:
  - Total Products: [N]
  - Total Approved Units: [Sum of approved quantities]
  - Total Received Units: [Sum of received quantities]
  - Stock Updates: [N products will be updated]
- ✅ Confirmation message before submitting shows multi-product impact

### AC3: Stock Update Processing (UPDATED FOR MULTI-PRODUCT)
- ✅ On submit:
  - POST /api/v2/shop/admin/purchase-requests/:id/complete
  - Request body: `{ supplierName, invoiceNumber, purchaseDate, actualCost, receivedQuantities: [50, 100, 75], receiptNotes }`
  - Backend performs **atomic MongoDB transaction** across ALL products:
    1. **Loop through each item** in request.items[]
    2. For each item:
       - Fetch ShopItem by productId
       - Update ShopItem.stock (add received quantity for THIS product)
       - Create InventoryTransaction record for THIS product
       - Save both atomically
    3. Update PurchaseRequest:
       - status → 'completed'
       - Store `inventoryTransactionIds[]` array (multiple IDs)
       - Store `items[].receivedQuantity` per product
       - Store supplier/invoice/date details
  - **CRITICAL:** If ANY product update fails, rollback ALL changes (atomic transaction)
  - Success toast: "Stock updated successfully for 3 products"
  - Modal closes
  - Request status changes to "✅ Completed"

### AC4: Inventory Transaction Creation (UPDATED FOR MULTI-PRODUCT)
- ✅ System creates **MULTIPLE InventoryTransaction records** (one per product in request.items[])
- ✅ Each transaction has:
  - productId: [from request.items[i].productId]
  - transactionType: 'purchase_request'
  - quantity: [receivedQuantities[i] - quantity received for THIS product]
  - previousStock: [stock before update for THIS product]
  - newStock: [stock after update for THIS product]
  - reference.type: 'purchase_request'
  - reference.id: [purchase request ID - SAME for all products]
  - reason: "Purchase Request #{requestId} - {supplier name}"
  - notes: [receipt notes from form - SAME for all products]
  - performedBy: [Purchase Manager user ID]
- ✅ All transactions link back to the SAME purchase request ID
- ✅ All transactions appear in Inventory Management audit trail
- ✅ Example: Request with 3 products creates 3 separate InventoryTransaction records

### AC5: Completed Request View (UPDATED FOR MULTI-PRODUCT)
- ✅ Completed requests show in table:
  - ✅ Completed status badge
  - Total Items: [N products]
  - Total Received: [Sum of received quantities]
  - Completed by: [Purchase Manager name]
  - Completed on: [Date/time]
- ✅ [View Details] button shows full workflow timeline:
  - **Created by [PM] on [Date]**
    - Items: 3 products, 225 units requested, ₹1,025.00 estimated
  - **Approved by [Admin] on [Date]**
    - Admin notes: [Notes]
  - **Completed by [PM] on [Date]**
    - Supplier: [Name]
    - Invoice: [Number]
    - Purchase Date: [Date]
    - Actual Cost: [₹Amount] (total for all products)
    - **Stock Updates Table:** (NEW)
      - Product | Approved Qty | Received Qty | Stock Before | Stock After
      - Notebook | 50 | 50 | 5 → 55
      - Pencil | 100 | 100 | 10 → 110
      - Eraser | 75 | 75 | 3 → 78
    - Inventory Transactions: **3 transactions created** [Links to audit trail]

### AC6: Validation & Error Handling (UPDATED FOR MULTI-PRODUCT)
- ✅ Cannot update stock twice (idempotency check using `inventoryTransactionIds` array)
- ✅ If request already completed, show error: "This request has already been completed"
- ✅ **Validate receivedQuantities array:**
  - Array length must match request.items.length
  - Each quantity must be > 0
  - Each quantity must be a valid number
- ✅ Validate supplier name not empty
- ✅ Validate invoice number not empty
- ✅ Validate purchase date not in future
- ✅ **Atomic MongoDB transaction** - if ANY product update fails, rollback ALL changes
  - Example: If updating 3 products and the 2nd product fails, rollback stock updates for product 1
  - No partial updates allowed
- ✅ **Frontend validation:**
  - All received quantity inputs must be filled before submit
  - Show error: "Please enter received quantity for all products"

### AC7: Audit Trail Integration (UPDATED FOR MULTI-PRODUCT)
- ✅ Inventory Management page shows updated stock immediately **for all products**
- ✅ Audit trail in Inventory Management shows **MULTIPLE transactions** (one per product):

  **Example: For a 3-product request, audit trail shows 3 separate entries:**

  **Transaction 1 (Notebook):**
  - Type: "Purchase Request"
  - Reason: "Purchase Request #PR-001 - StatCo Suppliers"
  - Reference: Link to purchase request details (same request ID for all)
  - Performed by: [Purchase Manager]
  - Quantity: +50 units
  - Stock: 5 → 55

  **Transaction 2 (Pencil):**
  - Type: "Purchase Request"
  - Reason: "Purchase Request #PR-001 - StatCo Suppliers"
  - Reference: Link to purchase request details (same request ID)
  - Performed by: [Purchase Manager]
  - Quantity: +100 units
  - Stock: 10 → 110

  **Transaction 3 (Eraser):**
  - Type: "Purchase Request"
  - Reason: "Purchase Request #PR-001 - StatCo Suppliers"
  - Reference: Link to purchase request details (same request ID)
  - Performed by: [Purchase Manager]
  - Quantity: +75 units
  - Stock: 3 → 78

- ✅ All 3 transactions have the SAME reference.id (purchase request ID)
- ✅ Can click reference link from any transaction to view full purchase request details
- ✅ Transactions appear with the SAME timestamp (created in same atomic operation)

---

## Technical Specifications

### Backend Implementation

#### 1. Controller Method (UPDATED FOR MULTI-PRODUCT)

**File:** `backend/controllers/purchaseRequestController.js`

```javascript
const InventoryTransaction = require('../models/inventoryTransaction');
const mongoose = require('mongoose');

/**
 * @route   POST /api/v2/shop/admin/purchase-requests/:id/complete
 * @desc    Complete MULTI-PRODUCT purchase request and update stock atomically
 * @access  Private (Purchase Management:Update)
 *
 * CRITICAL CHANGES FROM ORIGINAL:
 * - Handles items[] array (multiple products)
 * - Accepts receivedQuantities[] array instead of single receivedQuantity
 * - Creates MULTIPLE InventoryTransaction records (one per product)
 * - Stores inventoryTransactionIds[] array instead of single ID
 * - Uses atomic MongoDB transaction for ALL products
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
      receivedQuantities,  // ⭐ CHANGED: Array instead of single value
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

    // ⭐ NEW: Validate receivedQuantities array
    if (!Array.isArray(receivedQuantities)) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Received quantities must be an array'
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

    // ⭐ NEW: Validate receivedQuantities array length matches items
    if (receivedQuantities.length !== request.items.length) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: `Received quantities count (${receivedQuantities.length}) must match number of items in request (${request.items.length})`
      });
    }

    // ⭐ NEW: Validate each received quantity
    for (let i = 0; i < receivedQuantities.length; i++) {
      const qty = receivedQuantities[i];
      if (!qty || typeof qty !== 'number' || qty < 1) {
        await session.abortTransaction();
        return res.status(400).json({
          success: false,
          message: `Received quantity for ${request.items[i].productName} must be at least 1`
        });
      }
    }

    // ⭐ UPDATED: Check if already completed using inventoryTransactionIds array
    if (request.inventoryTransactionIds && request.inventoryTransactionIds.length > 0) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'This request has already been completed and stock updated'
      });
    }

    // ⭐ NEW: Arrays to track updates
    const transactionIds = [];
    const stockUpdates = [];

    // 🔥 LOOP THROUGH ALL ITEMS AND UPDATE STOCK ATOMICALLY
    for (let i = 0; i < request.items.length; i++) {
      const item = request.items[i];
      const receivedQty = receivedQuantities[i];

      // Get product
      const product = await ShopItem.findById(item.productId).session(session);

      if (!product) {
        await session.abortTransaction();
        return res.status(404).json({
          success: false,
          message: `Product ${item.productName} (${item.productSKU}) not found`
        });
      }

      // Store previous stock
      const previousStock = product.stock;
      const newStock = previousStock + receivedQty;

      // 🔥 STEP 1: Update product stock
      product.stock = newStock;
      await product.save({ session });

      // Track update for response
      stockUpdates.push({
        productId: product._id,
        productName: item.productName,
        previousStock,
        newStock,
        receivedQty
      });

      // 🔥 STEP 2: Create inventory transaction for THIS product
      const transaction = new InventoryTransaction({
        productId: product._id,
        transactionType: 'purchase_request',
        quantity: receivedQty,
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
      transactionIds.push(transaction._id);
    }

    // 🔥 STEP 3: Update purchase request with multi-product completion data
    request.status = 'completed';
    request.completedBy = userId;
    request.completedAt = new Date();
    request.supplierName = supplierName.trim();
    request.invoiceNumber = invoiceNumber.trim();
    request.purchaseDate = new Date(purchaseDate);
    request.actualCost = actualCost || 0;

    // ⭐ NEW: Store received quantities per item
    request.items = request.items.map((item, index) => ({
      ...item.toObject(),
      receivedQuantity: receivedQuantities[index]
    }));

    // ⭐ NEW: Store multiple transaction IDs
    request.inventoryTransactionIds = transactionIds;

    await request.save({ session });

    // Commit transaction
    await session.commitTransaction();

    // Populate for response
    await request.populate('requestedBy', 'name email');
    await request.populate('reviewedBy', 'name email');
    await request.populate('completedBy', 'name email');
    await request.populate('items.productId', 'name sku stock');  // ⭐ CHANGED: Populate items array
    await request.populate('inventoryTransactionIds');  // ⭐ CHANGED: Populate array of transactions

    res.json({
      success: true,
      message: `Stock updated successfully for ${request.items.length} product${request.items.length !== 1 ? 's' : ''}`,  // ⭐ CHANGED: Dynamic message
      data: {
        request,
        stockUpdates,  // ⭐ NEW: Array of stock changes per product
        transactionIds  // ⭐ NEW: Array of transaction IDs
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

#### 2. Update PurchaseRequest Model (CRITICAL)

**File:** `backend/models/purchaseRequest.js`

**REQUIRED CHANGES:**

```javascript
// ⭐ ADD to schema (Story 17 already added items array, but need these new fields):

// REMOVE (obsolete from original Story 19):
// inventoryTransactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryTransaction' }
// receivedQuantity: Number

// ⭐ ADD for multi-product completion tracking:
inventoryTransactionIds: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'InventoryTransaction'
}],

// Note: items array already has receivedQuantity added per item during completion:
items: [
  {
    // ... existing fields from Story 17
    receivedQuantity: { type: Number }  // Added during completion
  }
]
```

**Why this is critical:**
- Original Story 19 used single `inventoryTransactionId` field
- Multi-product version needs `inventoryTransactionIds[]` array to track multiple transactions
- Each item gets its own `receivedQuantity` field (may differ from `requestedQuantity`)

---

#### 3. Update InventoryTransaction Model

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

#### 4. Validation Middleware (UPDATED FOR MULTI-PRODUCT)

**File:** `backend/middleware/validation/purchaseRequestValidation.js`

```javascript
exports.validateStockUpdate = (req, res, next) => {
  const {
    supplierName,
    invoiceNumber,
    purchaseDate,
    actualCost,
    receivedQuantities  // ⭐ CHANGED: Array instead of single value
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

  // ⭐ NEW: Validate receivedQuantities array
  if (!receivedQuantities || !Array.isArray(receivedQuantities)) {
    return res.status(400).json({
      success: false,
      message: 'Received quantities must be an array'
    });
  }

  if (receivedQuantities.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'At least one received quantity is required'
    });
  }

  // Validate each quantity in array
  for (let i = 0; i < receivedQuantities.length; i++) {
    const qty = receivedQuantities[i];
    if (typeof qty !== 'number' || qty < 1) {
      return res.status(400).json({
        success: false,
        message: `Received quantity at index ${i} must be a number >= 1`
      });
    }
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

#### 1. Update Stock Modal (UPDATED FOR MULTI-PRODUCT)

**File:** `frontend/src/components/purchaseManagement/modals/UpdateStockModal.jsx`

```javascript
import React, { useState } from 'react';
import { completePurchaseRequest } from '../../../api';
import showToast from '../../../utils/toast';
import dayjs from 'dayjs';

export default function UpdateStockModal({ request, onClose, onSuccess }) {
  // ⭐ CHANGED: Initialize receivedQuantities array (one per item)
  const [formData, setFormData] = useState({
    supplierName: '',
    invoiceNumber: '',
    purchaseDate: dayjs().format('YYYY-MM-DD'),
    actualCost: '',
    receiptNotes: ''
  });

  // ⭐ NEW: Separate state for per-product received quantities
  const [receivedQuantities, setReceivedQuantities] = useState(
    request.items.map(item => item.requestedQuantity)  // Default to approved quantities
  );

  const [loading, setLoading] = useState(false);

  // ⭐ NEW: Update individual item's received quantity
  const updateReceivedQuantity = (index, value) => {
    setReceivedQuantities(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

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

    // ⭐ NEW: Validate all received quantities filled
    const invalidQty = receivedQuantities.find(qty => !qty || qty < 1);
    if (invalidQty !== undefined) {
      showToast('Please enter received quantity for all products (must be >= 1)', 'error');
      return;
    }

    // ⭐ CHANGED: Confirm with multi-product summary
    const totalReceived = receivedQuantities.reduce((sum, qty) => sum + qty, 0);
    const confirmed = window.confirm(
      `Update stock for ${request.items.length} products (${totalReceived} total units)?`
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      const response = await completePurchaseRequest(request._id, {
        supplierName: formData.supplierName.trim(),
        invoiceNumber: formData.invoiceNumber.trim(),
        purchaseDate: formData.purchaseDate,
        actualCost: formData.actualCost ? parseFloat(formData.actualCost) : 0,
        receivedQuantities: receivedQuantities.map(qty => parseInt(qty)),  // ⭐ CHANGED: Array
        receiptNotes: formData.receiptNotes.trim()
      });

      if (response.success) {
        showToast(`Stock updated successfully for ${request.items.length} products`, 'success');
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

  // ⭐ NEW: Calculate totals
  const totalApprovedQty = request.items.reduce((sum, item) => sum + item.requestedQuantity, 0);
  const totalReceivedQty = receivedQuantities.reduce((sum, qty) => sum + (parseInt(qty) || 0), 0);

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
                  <label>Total Items:</label>
                  <span className="approved-qty">{request.items.length} products</span>
                </div>
                <div className="summary-item">
                  <label>Total Approved Quantity:</label>
                  <span className="approved-qty">{totalApprovedQty} units</span>
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

            {/* ⭐ NEW: Approved Items Table */}
            <div className="approved-items-section">
              <h4>📋 Approved Items</h4>
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Current Stock</th>
                    <th>Approved Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {request.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.productName}</td>
                      <td>{item.productSKU}</td>
                      <td>
                        <span className={item.currentStock === 0 ? 'text-danger' : item.currentStock <= item.lowStockThreshold ? 'text-warning' : ''}>
                          {item.currentStock} / {item.lowStockThreshold}
                          {item.currentStock === 0 && ' 🔴'}
                          {item.currentStock > 0 && item.currentStock <= item.lowStockThreshold && ' ⚠️'}
                        </span>
                      </td>
                      <td>{item.requestedQuantity} units</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

            {/* ⭐ NEW: Stock Update Section with editable table */}
            <div className="section">
              <h4>📦 Stock Received</h4>

              <table className="stock-update-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Current Stock</th>
                    <th>Approved Qty</th>
                    <th style={{width: '140px'}}>Received Qty *</th>
                    <th>New Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {request.items.map((item, index) => {
                    const receivedQty = parseInt(receivedQuantities[index]) || 0;
                    const newStock = item.currentStock + receivedQty;

                    return (
                      <tr key={index}>
                        <td>{item.productName}</td>
                        <td>{item.productSKU}</td>
                        <td className="stock-value">{item.currentStock}</td>
                        <td className="approved-qty">{item.requestedQuantity}</td>
                        <td>
                          <input
                            type="number"
                            min="1"
                            className="table-input"
                            value={receivedQuantities[index]}
                            onChange={(e) => updateReceivedQuantity(index, parseInt(e.target.value) || 0)}
                            required
                          />
                        </td>
                        <td className={`new-stock ${newStock > item.lowStockThreshold ? 'text-success' : 'text-warning'}`}>
                          {newStock}
                          {newStock > item.lowStockThreshold && ' ✅'}
                          {newStock <= item.lowStockThreshold && ' ⚠️'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="totals-row">
                    <td colSpan="4" className="total-label">
                      <strong>Totals:</strong>
                    </td>
                    <td className="total-value">
                      <strong>{totalReceivedQty} units</strong>
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>

              <div className="form-group" style={{marginTop: '20px'}}>
                <label>Receipt Notes (Optional)</label>
                <textarea
                  rows="3"
                  maxLength="500"
                  value={formData.receiptNotes}
                  onChange={(e) => setFormData(prev => ({ ...prev, receiptNotes: e.target.value }))}
                  placeholder="Condition of items, packaging notes, discrepancies, etc."
                />
                <small className="char-count">{formData.receiptNotes.length}/500</small>
              </div>
            </div>

            <hr />

            {/* ⭐ UPDATED: Stock Projection Summary */}
            <div className="stock-projection-box">
              <h4>📊 Stock Update Summary</h4>
              <div className="projection-summary">
                <div className="summary-stat">
                  <span className="stat-label">Products to Update:</span>
                  <span className="stat-value">{request.items.length}</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-label">Total Approved:</span>
                  <span className="stat-value">{totalApprovedQty} units</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-label">Total Received:</span>
                  <span className="stat-value highlighted">{totalReceivedQty} units</span>
                </div>
              </div>

              {totalReceivedQty !== totalApprovedQty && (
                <div className="discrepancy-warning">
                  ⚠️ Received quantity differs from approved quantity
                </div>
              )}
            </div>

            {/* ⭐ UPDATED: Warning */}
            <div className="warning-box">
              <p>⚠️ This action will:</p>
              <ul>
                <li>Update stock for <strong>{request.items.length} products</strong></li>
                <li>Create <strong>{request.items.length} inventory transaction records</strong></li>
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

**Last Updated:** 2025-10-30 13:08:54 (via `date '+%Y-%m-%d %H:%M:%S'`)
**Updated By:** Orchestrator (Updated for multi-product support - Story 17/18 integration)
