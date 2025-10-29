# Story 17: Purchase Request Creation & Management (Purchase Manager)

**Story ID:** Sprint5-Story-17
**Epic:** Sprint5-Epic-05 (Purchase Manager Workflow)
**Priority:** High
**Status:** ✅ READY FOR QA
**Estimate:** 1.5 days
**Created:** 2025-10-29 16:27:00
**Last Updated:** 2025-10-29 17:17:42

---

## User Story

**As a** Purchase Manager
**I want to** create purchase requests for low-stock shop items
**So that** I can formally request inventory replenishment with proper Admin approval

---

## Business Context

Purchase Managers are responsible for monitoring shop inventory levels in their assigned balagruhas. When stock runs low (at or below threshold), they need a formal way to request replenishment from suppliers. This story enables Purchase Managers to:
- View low-stock items in their assigned balagruhas
- Create structured purchase requests with justification
- Track request status (pending, approved, rejected, completed)
- Cancel requests that haven't been reviewed yet

This creates accountability and proper approval workflow for inventory purchases.

---

## Acceptance Criteria

### AC1: Dropdown UI Integration
- ✅ `/purchase` page has dropdown selector with options:
  - "📋 Machine Repairs" (existing)
  - "🛒 Shop Inventory" (NEW)
- ✅ Dropdown defaults to "Machine Repairs" for backward compatibility
- ✅ Action button text changes based on selection:
  - Machine Repairs → "+ New Repair Order"
  - Shop Inventory → "+ New Purchase Request"
- ✅ Both Admin and Purchase Manager can see both dropdown options
- ✅ Filters adapt based on selected view

### AC2: Purchase Request Creation
- ✅ Purchase Manager can click "+ New Purchase Request" button
- ✅ Modal opens with form fields:
  - Balagruha dropdown (shows ONLY assigned balagruhas)
  - Product dropdown (shows ONLY low-stock items from selected balagruha)
  - Quantity (number input, required)
  - Reason (text input, max 200 chars, required)
  - Justification (textarea, max 500 chars, optional)
- ✅ Product dropdown shows:
  - Product name
  - Current stock vs threshold (e.g., "Notebook - Stock: 5/10 ⚠️")
  - Low stock or Out of stock indicator
- ✅ Form validation:
  - All required fields must be filled
  - Quantity must be > 0
  - Reason cannot be empty
- ✅ On submit:
  - POST request to backend
  - Success toast message
  - Modal closes
  - Request appears in table with "Pending" status

### AC3: View Own Requests (Frontend Filtering)
- ✅ Purchase Manager sees table with columns:
  - Request ID (e.g., "PR-001")
  - Product (name + SKU)
  - Quantity
  - Reason
  - Status badge (🟡 Pending, ✅ Approved, ❌ Rejected, ✅ Completed)
  - Actions (buttons vary by status)
- ✅ Only requests created by this Purchase Manager are shown
- ✅ Only requests for products from assigned balagruhas are shown
- ✅ Frontend filtering applied before rendering:
  ```javascript
  filteredRequests = allRequests.filter(r =>
    user.balagruhaIds.includes(r.balagruhaId) &&
    r.requestedBy._id === user._id
  )
  ```

### AC4: Request Filtering & Search
- ✅ Purchase Manager can filter by:
  - Date range (All, Today, This Week, This Month, Custom)
  - Balagruha (dropdown shows only assigned balagruhas)
  - Status (All, Pending, Approved, Rejected, Completed)
  - Search (by product name, SKU, reason)
- ✅ Filters work in combination
- ✅ Search is case-insensitive
- ✅ Filters persist when switching between dropdown views

### AC5: Cancel Pending Request
- ✅ Purchase Manager can cancel own requests with status "Pending"
- ✅ [Cancel] button shows only on pending requests
- ✅ Confirmation modal appears: "Cancel this request?"
- ✅ On confirm:
  - PUT /api/v2/shop/admin/purchase-requests/:id/cancel
  - Request status → 'cancelled'
  - Row updates in real-time
- ✅ Cannot cancel approved/rejected/completed requests

### AC6: View Request Details
- ✅ Purchase Manager can click on any request row
- ✅ Modal shows full details:
  - Product info (name, SKU, current stock, threshold)
  - Requested quantity
  - Reason & justification
  - Status with timestamp
  - If approved: Admin name, approval date, admin notes
  - If rejected: Admin name, rejection date, rejection reason
  - If completed: Supplier, invoice, purchase date, stock updated
- ✅ Modal is read-only for completed/rejected requests
- ✅ Modal shows [Cancel] button for pending requests

### AC7: Export to PDF
- ✅ [Export PDF] button visible in Shop Inventory view
- ✅ PDF includes:
  - Title: "Shop Purchase Requests"
  - Date range filter applied
  - Table with all visible requests
  - Columns: Request ID, Product, Qty, Reason, Status, Date
  - Footer: Total requests, Pending count
- ✅ PDF filename: `Purchase_Requests_YYYY-MM-DD.pdf`

---

## Technical Specifications

### Backend Implementation

#### 1. Database Model: PurchaseRequest

**File:** `backend/models/purchaseRequest.js`

```javascript
const mongoose = require('mongoose');

const purchaseRequestSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      unique: true,
      required: true,
      // Auto-generated: "PR-" + counter (e.g., PR-001, PR-002)
    },

    // Product Information (snapshot at request time)
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ShopItem',
      required: true,
      index: true
    },
    productName: {
      type: String,
      required: true
    },
    productSKU: {
      type: String,
      required: true
    },
    balagruhaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Balagruha',
      required: true,
      index: true
      // Derived from product's balagruhaId
    },

    // Request Details
    requestedQuantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    currentStock: {
      type: Number,
      required: true
      // Snapshot of stock at request time
    },
    lowStockThreshold: {
      type: Number,
      required: true
      // Snapshot of threshold at request time
    },
    reason: {
      type: String,
      required: [true, 'Reason is required'],
      maxlength: [200, 'Reason cannot exceed 200 characters'],
      trim: true
    },
    justification: {
      type: String,
      maxlength: [500, 'Justification cannot exceed 500 characters'],
      trim: true
    },

    // Request Metadata
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },

    // Status Management
    status: {
      type: String,
      enum: ['pending_approval', 'approved', 'rejected', 'completed', 'cancelled'],
      default: 'pending_approval',
      index: true
    },

    // Approval/Rejection
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reviewedAt: {
      type: Date
    },
    reviewNotes: {
      type: String,
      maxlength: [500, 'Review notes cannot exceed 500 characters']
    },

    // Purchase Details (filled after approval during stock update)
    supplierName: {
      type: String,
      trim: true
    },
    invoiceNumber: {
      type: String,
      trim: true
    },
    purchaseDate: {
      type: Date
    },
    actualCost: {
      type: Number,
      min: [0, 'Cost cannot be negative']
    },
    receivedQuantity: {
      type: Number,
      min: [0, 'Received quantity cannot be negative']
    },

    // Completion
    completedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    completedAt: {
      type: Date
    },
    inventoryTransactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InventoryTransaction'
      // Linked after stock update
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for performance
purchaseRequestSchema.index({ requestedBy: 1, status: 1 });
purchaseRequestSchema.index({ balagruhaId: 1, status: 1 });
purchaseRequestSchema.index({ createdAt: -1 });

// Auto-generate requestId
purchaseRequestSchema.pre('save', async function(next) {
  if (this.isNew && !this.requestId) {
    const count = await mongoose.model('PurchaseRequest').countDocuments();
    this.requestId = `PR-${String(count + 1).padStart(3, '0')}`;
  }
  next();
});

// Virtual: requestAge (in hours)
purchaseRequestSchema.virtual('requestAge').get(function() {
  const now = new Date();
  const diffMs = now - this.createdAt;
  return Math.floor(diffMs / (1000 * 60 * 60));  // hours
});

const PurchaseRequest = mongoose.model('PurchaseRequest', purchaseRequestSchema);

module.exports = PurchaseRequest;
```

---

#### 2. Controller: purchaseRequestController.js

**File:** `backend/controllers/purchaseRequestController.js`

```javascript
const PurchaseRequest = require('../models/purchaseRequest');
const ShopItem = require('../models/shopItem');
const User = require('../models/user');

/**
 * @route   POST /api/v2/shop/admin/purchase-requests
 * @desc    Create new purchase request (Purchase Manager only)
 * @access  Private (Purchase Management:Create)
 */
exports.createPurchaseRequest = async (req, res) => {
  try {
    const { productId, requestedQuantity, reason, justification } = req.body;
    const userId = req.user._id;

    // Validate product exists
    const product = await ShopItem.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // 🔥 VALIDATION: Purchase Manager can only request for assigned balagruhas
    if (req.user.role === 'purchase-manager') {
      const userBalagruhas = req.user.balagruhaIds || [];

      if (product.balagruhaId && !userBalagruhas.includes(product.balagruhaId.toString())) {
        return res.status(403).json({
          success: false,
          message: 'You do not have access to request purchases for this balagruha'
        });
      }
    }

    // Validate quantity
    if (!requestedQuantity || requestedQuantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Requested quantity must be at least 1'
      });
    }

    // Create purchase request
    const purchaseRequest = new PurchaseRequest({
      productId: product._id,
      productName: product.name,
      productSKU: product.sku,
      balagruhaId: product.balagruhaId,
      requestedQuantity,
      currentStock: product.stock,
      lowStockThreshold: product.lowStockThreshold,
      reason: reason.trim(),
      justification: justification?.trim() || '',
      requestedBy: userId,
      status: 'pending_approval'
    });

    await purchaseRequest.save();

    // Populate user info for response
    await purchaseRequest.populate('requestedBy', 'name email role');
    await purchaseRequest.populate('productId', 'name sku stock lowStockThreshold');

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

/**
 * @route   GET /api/v2/shop/admin/purchase-requests/my
 * @desc    Get own purchase requests (Purchase Manager)
 * @access  Private (Purchase Management:Read)
 */
exports.getMyPurchaseRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const { status, balagruhaId, startDate, endDate } = req.query;

    // Build query
    const query = { requestedBy: userId };

    if (status && status !== 'all') {
      query.status = status;
    }

    if (balagruhaId && balagruhaId !== 'all') {
      query.balagruhaId = balagruhaId;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const requests = await PurchaseRequest.find(query)
      .populate('requestedBy', 'name email role')
      .populate('reviewedBy', 'name email')
      .populate('productId', 'name sku stock lowStockThreshold images')
      .populate('balagruhaId', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { requests, count: requests.length }
    });
  } catch (error) {
    console.error('Error fetching purchase requests:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching purchase requests',
      error: error.message
    });
  }
};

/**
 * @route   PUT /api/v2/shop/admin/purchase-requests/:id/cancel
 * @desc    Cancel pending purchase request
 * @access  Private (Purchase Management:Update)
 */
exports.cancelPurchaseRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const request = await PurchaseRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Purchase request not found'
      });
    }

    // Validate: Only requester can cancel
    if (request.requestedBy.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only cancel your own requests'
      });
    }

    // Validate: Can only cancel pending requests
    if (request.status !== 'pending_approval') {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel ${request.status} request. Only pending requests can be cancelled.`
      });
    }

    request.status = 'cancelled';
    await request.save();

    res.json({
      success: true,
      message: 'Purchase request cancelled successfully',
      data: { request }
    });
  } catch (error) {
    console.error('Error cancelling purchase request:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling purchase request',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/v2/shop/admin/purchase-requests/:id
 * @desc    Get single purchase request details
 * @access  Private
 */
exports.getPurchaseRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const userRole = req.user.role;

    const request = await PurchaseRequest.findById(id)
      .populate('requestedBy', 'name email role')
      .populate('reviewedBy', 'name email')
      .populate('completedBy', 'name email')
      .populate('productId', 'name sku stock lowStockThreshold images')
      .populate('balagruhaId', 'name')
      .populate('inventoryTransactionId');

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Purchase request not found'
      });
    }

    // Authorization: Purchase Manager can only view own requests
    if (userRole === 'purchase-manager' && request.requestedBy._id.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only view your own requests'
      });
    }

    res.json({
      success: true,
      data: { request }
    });
  } catch (error) {
    console.error('Error fetching purchase request:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching purchase request',
      error: error.message
    });
  }
};

module.exports = exports;
```

---

#### 3. Routes: purchase-requests.js

**File:** `backend/routes/v2/purchase-requests.js`

```javascript
const express = require('express');
const router = express.Router();
const purchaseRequestController = require('../../controllers/purchaseRequestController');
const { authenticate, authorize } = require('../../middleware/auth');
const {
  validateCreateRequest,
  validateRequestId
} = require('../../middleware/validation/purchaseRequestValidation');

/**
 * Purchase Manager Routes
 */

// Create new purchase request
router.post(
  '/',
  authenticate,
  authorize('Purchase Management', 'Create'),
  validateCreateRequest,
  purchaseRequestController.createPurchaseRequest
);

// Get own purchase requests
router.get(
  '/my',
  authenticate,
  authorize('Purchase Management', 'Read'),
  purchaseRequestController.getMyPurchaseRequests
);

// Cancel pending request
router.put(
  '/:id/cancel',
  authenticate,
  authorize('Purchase Management', 'Update'),
  validateRequestId,
  purchaseRequestController.cancelPurchaseRequest
);

// Get single request details
router.get(
  '/:id',
  authenticate,
  authorize('Purchase Management', 'Read'),
  validateRequestId,
  purchaseRequestController.getPurchaseRequestById
);

module.exports = router;
```

---

#### 4. Validation Middleware

**File:** `backend/middleware/validation/purchaseRequestValidation.js`

```javascript
const mongoose = require('mongoose');

exports.validateCreateRequest = (req, res, next) => {
  const { productId, requestedQuantity, reason } = req.body;

  // Validate productId
  if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({
      success: false,
      message: 'Valid product ID is required'
    });
  }

  // Validate quantity
  if (!requestedQuantity || typeof requestedQuantity !== 'number' || requestedQuantity < 1) {
    return res.status(400).json({
      success: false,
      message: 'Requested quantity must be a positive number'
    });
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

exports.validateRequestId = (req, res, next) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Valid request ID is required'
    });
  }

  next();
};

module.exports = exports;
```

---

#### 5. Register Routes in server.js

**File:** `backend/server.js` (add this line)

```javascript
// Existing routes
const shopRoutes = require('./routes/v2/shop');
const inventoryRoutes = require('./routes/v2/inventory');

// NEW: Purchase request routes
const purchaseRequestRoutes = require('./routes/v2/purchase-requests');

// Register routes
app.use('/api/v2/shop', shopRoutes);
app.use('/api/v2/shop/admin/inventory', inventoryRoutes);
app.use('/api/v2/shop/admin/purchase-requests', purchaseRequestRoutes);  // NEW
```

---

### Frontend Implementation

#### 1. Refactor PurchaseManagement.jsx (Dropdown Structure)

**File:** `frontend/src/components/purchaseManagement/PurchaseManagement.js`

```javascript
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getBalagruha } from '../../api';
import MachineRepairsView from './views/MachineRepairsView';
import ShopInventoryView from './views/ShopInventoryView';
import SharedFilters from './components/SharedFilters';
import './PurchaseManagement.css';

export default function PurchaseManagement() {
  const { user } = useAuth();
  const [purchaseType, setPurchaseType] = useState('machine-repairs');
  const [balagruhas, setBalagruhas] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: null,
    fromDate: '',
    toDate: '',
    balagruha: 'all',
    status: 'all',
    search: ''
  });

  useEffect(() => {
    fetchBalagruhas();
  }, []);

  const fetchBalagruhas = async () => {
    try {
      const response = await getBalagruha();
      if (response.success) {
        setBalagruhas(response.data.balagruhas || []);
      }
    } catch (error) {
      console.error('Error fetching balagruhas:', error);
    }
  };

  // Get balagruha options based on role
  const getFilteredBalagruhas = () => {
    if (user.role === 'admin') {
      return balagruhas;  // Admin sees all
    }
    // Purchase Manager sees only assigned
    return balagruhas.filter(bg =>
      user.balagruhaIds?.includes(bg._id)
    );
  };

  // Get status options based on purchase type
  const getStatusOptions = () => {
    if (purchaseType === 'machine-repairs') {
      return [
        { value: 'all', label: 'All Status' },
        { value: 'pending', label: 'Pending' },
        { value: 'in-progress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' }
      ];
    } else {
      return [
        { value: 'all', label: 'All Status' },
        { value: 'pending_approval', label: 'Pending Approval' },
        { value: 'approved', label: 'Approved' },
        { value: 'rejected', label: 'Rejected' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' }
      ];
    }
  };

  return (
    <div className="purchase-management">
      {/* Header with Dropdown */}
      <div className="purchase-header">
        <h1>Purchase Management</h1>

        <div className="header-controls">
          <select
            value={purchaseType}
            onChange={(e) => setPurchaseType(e.target.value)}
            className="purchase-type-dropdown"
          >
            <option value="machine-repairs">📋 Machine Repairs</option>
            <option value="shop-inventory">🛒 Shop Inventory</option>
          </select>
        </div>
      </div>

      {/* Shared Filters */}
      <SharedFilters
        filters={filters}
        setFilters={setFilters}
        balagruhas={getFilteredBalagruhas()}
        statusOptions={getStatusOptions()}
        purchaseType={purchaseType}
      />

      {/* Content View */}
      <div className="content-view">
        {purchaseType === 'machine-repairs' && (
          <MachineRepairsView
            filters={filters}
            balagruhas={balagruhas}
            userRole={user.role}
            userBalagruhas={user.balagruhaIds || []}
          />
        )}

        {purchaseType === 'shop-inventory' && (
          <ShopInventoryView
            filters={filters}
            balagruhas={balagruhas}
            userRole={user.role}
            userId={user._id}
            userBalagruhas={user.balagruhaIds || []}
          />
        )}
      </div>
    </div>
  );
}
```

---

#### 2. Shop Inventory View Component

**File:** `frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import {
  getMyPurchaseRequests,
  getAllShopItems
} from '../../../api';
import showToast from '../../../utils/toast';
import CreatePurchaseRequestModal from '../modals/CreatePurchaseRequestModal';
import ViewRequestModal from '../modals/ViewRequestModal';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function ShopInventoryView({
  filters,
  balagruhas,
  userRole,
  userId,
  userBalagruhas
}) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    fetchPurchaseRequests();
  }, []);

  const fetchPurchaseRequests = async () => {
    try {
      setLoading(true);
      const response = await getMyPurchaseRequests();

      if (response.success) {
        let data = response.data.requests;

        // 🔥 FRONTEND FILTERING for Purchase Manager
        if (userRole === 'purchase-manager') {
          data = data.filter(request => {
            // Only show requests from assigned balagruhas
            const matchesBalagruha = userBalagruhas.includes(request.balagruhaId?._id);
            // Only show own requests
            const isOwnRequest = request.requestedBy._id === userId;
            return matchesBalagruha && isOwnRequest;
          });
        }

        setRequests(data);
      } else {
        showToast('Error fetching purchase requests', 'error');
      }
    } catch (error) {
      console.error('Error fetching purchase requests:', error);
      showToast('Error fetching purchase requests', 'error');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (request) => {
    // Date filter
    if (filters.dateRange && request.createdAt) {
      const createdDate = dayjs(request.createdAt);

      if (filters.dateRange === 'today') {
        if (!createdDate.isSame(dayjs(), 'day')) return false;
      } else if (filters.dateRange === 'thisWeek') {
        const startOfWeek = dayjs().startOf('week');
        const endOfWeek = dayjs().endOf('week');
        if (!createdDate.isBetween(startOfWeek, endOfWeek, null, '[]')) return false;
      } else if (filters.dateRange === 'thisMonth') {
        if (!createdDate.isSame(dayjs(), 'month')) return false;
      } else if (filters.dateRange === 'custom' && filters.fromDate && filters.toDate) {
        if (!createdDate.isBetween(dayjs(filters.fromDate), dayjs(filters.toDate).endOf('day'), null, '[]')) {
          return false;
        }
      }
    }

    // Balagruha filter
    if (filters.balagruha !== 'all' && request.balagruhaId?._id !== filters.balagruha) {
      return false;
    }

    // Status filter
    if (filters.status !== 'all' && request.status !== filters.status) {
      return false;
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesProduct = request.productName?.toLowerCase().includes(searchLower);
      const matchesSKU = request.productSKU?.toLowerCase().includes(searchLower);
      const matchesReason = request.reason?.toLowerCase().includes(searchLower);

      if (!matchesProduct && !matchesSKU && !matchesReason) {
        return false;
      }
    }

    return true;
  };

  const filteredRequests = requests.filter(applyFilters);

  const getStatusBadge = (status) => {
    const badges = {
      pending_approval: { icon: '🟡', label: 'Pending', class: 'status-pending' },
      approved: { icon: '✅', label: 'Approved', class: 'status-approved' },
      rejected: { icon: '❌', label: 'Rejected', class: 'status-rejected' },
      completed: { icon: '✅', label: 'Completed', class: 'status-completed' },
      cancelled: { icon: '⚫', label: 'Cancelled', class: 'status-cancelled' }
    };

    const badge = badges[status] || badges.pending_approval;
    return (
      <span className={`status-badge ${badge.class}`}>
        {badge.icon} {badge.label}
      </span>
    );
  };

  const handleCancelRequest = async (requestId) => {
    if (!window.confirm('Are you sure you want to cancel this request?')) {
      return;
    }

    try {
      const response = await cancelPurchaseRequest(requestId);
      if (response.success) {
        showToast('Request cancelled successfully', 'success');
        fetchPurchaseRequests();
      } else {
        showToast(response.message || 'Error cancelling request', 'error');
      }
    } catch (error) {
      console.error('Error cancelling request:', error);
      showToast('Error cancelling request', 'error');
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text('Shop Purchase Requests', 14, 15);

    doc.setFontSize(10);
    doc.text(`Generated: ${dayjs().format('DD-MM-YYYY HH:mm')}`, 14, 22);
    doc.text(`Total Requests: ${filteredRequests.length}`, 14, 28);

    const tableColumn = ['Request ID', 'Product', 'Qty', 'Reason', 'Status', 'Date'];
    const tableRows = filteredRequests.map(req => [
      req.requestId,
      req.productName,
      req.requestedQuantity,
      req.reason,
      req.status.replace('_', ' ').toUpperCase(),
      dayjs(req.createdAt).format('DD-MM-YYYY')
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [120, 153, 248] }
    });

    doc.save(`Purchase_Requests_${dayjs().format('YYYY-MM-DD')}.pdf`);
  };

  return (
    <div className="shop-inventory-view">
      <div className="view-header">
        <h2>🛒 Shop Inventory Purchase Requests</h2>
        <div className="header-actions">
          <button
            className="action-button primary"
            onClick={() => setShowCreateModal(true)}
          >
            + New Purchase Request
          </button>
          <button
            className="action-button secondary"
            onClick={exportToPDF}
            disabled={filteredRequests.length === 0}
          >
            📄 Export PDF
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <>
          <div className="requests-table">
            <table>
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Current Stock</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Requested</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map(request => (
                  <tr key={request._id} className={`request-row status-${request.status}`}>
                    <td className="request-id">
                      <strong>{request.requestId}</strong>
                      <div className="balagruha-tag">
                        📍 {request.balagruhaId?.name || 'N/A'}
                      </div>
                    </td>
                    <td>
                      <div className="product-cell">
                        <div className="product-name">{request.productName}</div>
                        <div className="product-sku">SKU: {request.productSKU}</div>
                      </div>
                    </td>
                    <td className="quantity">{request.requestedQuantity}</td>
                    <td className="stock-info">
                      <div className="stock-value">
                        {request.currentStock} / {request.lowStockThreshold}
                      </div>
                      {request.currentStock === 0 && <span className="stock-badge out">Out of Stock</span>}
                      {request.currentStock > 0 && request.currentStock <= request.lowStockThreshold && (
                        <span className="stock-badge low">Low Stock</span>
                      )}
                    </td>
                    <td className="reason">{request.reason}</td>
                    <td>{getStatusBadge(request.status)}</td>
                    <td className="timestamp">
                      <div>{dayjs(request.createdAt).format('DD-MM-YYYY')}</div>
                      <div className="time-ago">{dayjs(request.createdAt).fromNow()}</div>
                    </td>
                    <td className="actions">
                      <button
                        className="icon-button view"
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowViewModal(true);
                        }}
                        title="View Details"
                      >
                        👁️
                      </button>

                      {request.status === 'pending_approval' && (
                        <button
                          className="icon-button cancel"
                          onClick={() => handleCancelRequest(request._id)}
                          title="Cancel Request"
                        >
                          ✖️
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredRequests.length === 0 && (
                  <tr>
                    <td colSpan="8" className="no-data">
                      No purchase requests found. Click "+ New Purchase Request" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="stats-footer">
            <div className="stats">
              <span>Total Requests: <strong>{filteredRequests.length}</strong></span>
              <span>Pending: <strong>{filteredRequests.filter(r => r.status === 'pending_approval').length}</strong></span>
              <span>Approved: <strong>{filteredRequests.filter(r => r.status === 'approved').length}</strong></span>
              <span>Completed: <strong>{filteredRequests.filter(r => r.status === 'completed').length}</strong></span>
            </div>
          </div>
        </>
      )}

      {/* Modals */}
      {showCreateModal && (
        <CreatePurchaseRequestModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchPurchaseRequests();
          }}
          userBalagruhas={userBalagruhas}
          balagruhas={balagruhas}
        />
      )}

      {showViewModal && selectedRequest && (
        <ViewRequestModal
          request={selectedRequest}
          onClose={() => {
            setShowViewModal(false);
            setSelectedRequest(null);
          }}
          userRole={userRole}
        />
      )}
    </div>
  );
}
```

---

#### 3. Create Purchase Request Modal

**File:** `frontend/src/components/purchaseManagement/modals/CreatePurchaseRequestModal.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import {
  createPurchaseRequest,
  getAllShopItems
} from '../../../api';
import showToast from '../../../utils/toast';

export default function CreatePurchaseRequestModal({
  onClose,
  onSuccess,
  userBalagruhas,
  balagruhas
}) {
  const [formData, setFormData] = useState({
    balagruhaId: '',
    productId: '',
    requestedQuantity: '',
    reason: '',
    justification: ''
  });
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set default balagruha if only one assigned
    if (userBalagruhas.length === 1) {
      const defaultBalagruha = balagruhas.find(bg => bg._id === userBalagruhas[0]);
      if (defaultBalagruha) {
        setFormData(prev => ({ ...prev, balagruhaId: defaultBalagruha._id }));
        fetchLowStockProducts(defaultBalagruha._id);
      }
    }
  }, []);

  const fetchLowStockProducts = async (balagruhaId) => {
    try {
      const response = await getAllShopItems();
      if (response.success) {
        // Filter products: low stock + from selected balagruha
        const filtered = response.data.items.filter(item => {
          const isLowStock = item.stock <= item.lowStockThreshold;
          const matchesBalagruha = !item.balagruhaId || item.balagruhaId === balagruhaId;
          return isLowStock && matchesBalagruha && item.isActive;
        });

        setLowStockProducts(filtered);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      showToast('Error loading products', 'error');
    }
  };

  const handleBalagruhaChange = (e) => {
    const balagruhaId = e.target.value;
    setFormData(prev => ({
      ...prev,
      balagruhaId,
      productId: ''  // Reset product when balagruha changes
    }));

    if (balagruhaId) {
      fetchLowStockProducts(balagruhaId);
    } else {
      setLowStockProducts([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.balagruhaId) {
      showToast('Please select a balagruha', 'error');
      return;
    }
    if (!formData.productId) {
      showToast('Please select a product', 'error');
      return;
    }
    if (!formData.requestedQuantity || formData.requestedQuantity < 1) {
      showToast('Please enter a valid quantity (at least 1)', 'error');
      return;
    }
    if (!formData.reason.trim()) {
      showToast('Please provide a reason', 'error');
      return;
    }

    try {
      setLoading(true);
      const response = await createPurchaseRequest({
        productId: formData.productId,
        requestedQuantity: parseInt(formData.requestedQuantity),
        reason: formData.reason.trim(),
        justification: formData.justification.trim()
      });

      if (response.success) {
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

  const getStockIndicator = (product) => {
    if (product.stock === 0) {
      return <span className="stock-indicator out-of-stock">🔴 Out of Stock</span>;
    } else if (product.stock <= product.lowStockThreshold) {
      return <span className="stock-indicator low-stock">⚠️ Low Stock</span>;
    }
    return null;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>New Purchase Request</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Balagruha Selection */}
            <div className="form-group">
              <label>Balagruha *</label>
              <select
                value={formData.balagruhaId}
                onChange={handleBalagruhaChange}
                required
                disabled={userBalagruhas.length === 1}
              >
                <option value="">Select Balagruha</option>
                {balagruhas
                  .filter(bg => userBalagruhas.includes(bg._id))
                  .map(bg => (
                    <option key={bg._id} value={bg._id}>
                      {bg.name}
                    </option>
                  ))}
              </select>
              {userBalagruhas.length === 1 && (
                <small className="form-hint">Only one balagruha assigned to you</small>
              )}
            </div>

            {/* Product Selection */}
            <div className="form-group">
              <label>Product (Low Stock Items) *</label>
              <select
                value={formData.productId}
                onChange={(e) => setFormData(prev => ({ ...prev, productId: e.target.value }))}
                required
                disabled={!formData.balagruhaId}
              >
                <option value="">
                  {formData.balagruhaId
                    ? 'Select Product'
                    : 'Select Balagruha first'}
                </option>
                {lowStockProducts.map(product => (
                  <option key={product._id} value={product._id}>
                    {product.name} - Stock: {product.stock}/{product.lowStockThreshold}
                    {product.stock === 0 ? ' 🔴' : ' ⚠️'}
                  </option>
                ))}
              </select>
              {lowStockProducts.length === 0 && formData.balagruhaId && (
                <small className="form-hint text-success">
                  ✅ No low-stock items in this balagruha!
                </small>
              )}
            </div>

            {/* Quantity */}
            <div className="form-group">
              <label>Quantity Requested *</label>
              <input
                type="number"
                min="1"
                value={formData.requestedQuantity}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  requestedQuantity: e.target.value
                }))}
                placeholder="Enter quantity"
                required
              />
            </div>

            {/* Reason */}
            <div className="form-group">
              <label>Reason *</label>
              <input
                type="text"
                maxLength="200"
                value={formData.reason}
                onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                placeholder="Why is this purchase needed?"
                required
              />
              <small className="char-count">{formData.reason.length}/200</small>
            </div>

            {/* Justification */}
            <div className="form-group">
              <label>Justification (Optional)</label>
              <textarea
                maxLength="500"
                rows="3"
                value={formData.justification}
                onChange={(e) => setFormData(prev => ({ ...prev, justification: e.target.value }))}
                placeholder="Additional details or context"
              />
              <small className="char-count">{formData.justification.length}/500</small>
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
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

---

## E2E Test Scenarios (Playwright)

### Test Case 1: Purchase Manager Creates Request
```javascript
test('TC-17.1: Purchase Manager can create purchase request', async ({ page }) => {
  // Login as Purchase Manager
  await page.goto('/admin/login');
  await page.fill('input[name="email"]', 'ramesh@isf.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  // Navigate to Purchase page
  await page.goto('/purchase');

  // Select Shop Inventory from dropdown
  await page.selectOption('select.purchase-type-dropdown', 'shop-inventory');

  // Click New Purchase Request
  await page.click('button:has-text("+ New Purchase Request")');

  // Wait for modal
  await page.waitForSelector('.modal-container');

  // Balagruha should be pre-selected (only one assigned)
  const balagruha = await page.$eval('select[name="balagruhaId"]', el => el.value);
  expect(balagruha).toBeTruthy();

  // Select low-stock product
  await page.selectOption('select[name="productId"]', { index: 1 });

  // Fill form
  await page.fill('input[type="number"]', '50');
  await page.fill('input[placeholder*="Why"]', 'Stock critically low');
  await page.fill('textarea', 'Students requesting notebooks for exams');

  // Submit
  await page.click('button:has-text("Create Request")');

  // Verify success
  await expect(page.locator('.toast-success')).toContainText('created successfully');

  // Verify request appears in table
  await expect(page.locator('table tbody tr')).toContainText('PR-');
  await expect(page.locator('.status-badge.status-pending')).toBeVisible();
});
```

### Test Case 2: Purchase Manager Sees Only Own Requests
```javascript
test('TC-17.2: Purchase Manager sees only own requests from assigned balagruhas', async ({ page }) => {
  // Login as Purchase Manager (Ramesh - assigned to Amma Balagruha)
  await loginAsPurchaseManager(page, 'ramesh@isf.com');

  // Navigate to Shop Inventory view
  await page.goto('/purchase');
  await page.selectOption('.purchase-type-dropdown', 'shop-inventory');

  // Get all request rows
  const rows = await page.locator('table tbody tr').all();

  // Verify all requests are from Amma Balagruha
  for (const row of rows) {
    const balagruhaTag = await row.locator('.balagruha-tag').textContent();
    expect(balagruhaTag).toContain('Amma Balagruha');
  }

  // Login as different Purchase Manager (Suresh - assigned to Veda Balagruha)
  await loginAsPurchaseManager(page, 'suresh@isf.com');
  await page.goto('/purchase');
  await page.selectOption('.purchase-type-dropdown', 'shop-inventory');

  // Verify Ramesh's requests are NOT visible
  const sureshRows = await page.locator('table tbody tr').all();
  for (const row of sureshRows) {
    const balagruhaTag = await row.locator('.balagruha-tag').textContent();
    expect(balagruhaTag).not.toContain('Amma Balagruha');
    expect(balagruhaTag).toContain('Veda Balagruha');
  }
});
```

---

## Dev Agent Record

**Developer:** Dev Agent (James)
**Development Start:** 2025-10-29 16:44:00
**Development Complete:** 2025-10-29 17:14:16
**Agent Model Used:** claude-sonnet-4-5-20250929

**Commits:**
- `6cd9b3a` - Feat: Backend implementation for Purchase Request Creation (Story 17)
- `544fa60` - Feat: Frontend implementation for Purchase Request Creation (Story 17)

### Files Created/Modified

#### Backend Files Created:
- `backend/models/purchaseRequest.js` - PurchaseRequest MongoDB model with auto-generated requestId
- `backend/controllers/purchaseRequestController.js` - Full CRUD operations for purchase requests
- `backend/middleware/validation/purchaseRequestValidation.js` - Request validation middleware
- `backend/routes/v2/purchase-requests.js` - RESTful API routes

#### Backend Files Modified:
- `backend/models/inventoryTransaction.js` - Added 'purchase_request' to transactionType and reference.type enums
- `backend/models/shopItem.js` - Added optional balagruhaId field for balagruha-specific products
- `backend/server.js` - Registered purchase-requests routes
- `frontend/src/api.js` - Added 6 purchase request API methods

#### Frontend Files Created:
- `frontend/src/components/purchaseManagement/PurchaseManagement.jsx` - Refactored wrapper with dropdown UI
- `frontend/src/components/purchaseManagement/views/MachineRepairsView.jsx` - Extracted existing machine repairs code
- `frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx` - Main purchase requests view with frontend filtering
- `frontend/src/components/purchaseManagement/modals/CreatePurchaseRequestModal.jsx` - Create request modal
- `frontend/src/components/purchaseManagement/modals/ViewRequestModal.jsx` - View request details modal

#### Frontend Files Modified:
- `frontend/src/components/purchaseManagement/PurchaseManagement.css` - Added 710 lines of new styles

#### Documentation Files Created:
- `docs/qa/e2e/sprint5-story-17-purchase-request-creation.md` - 48 E2E test scenarios
- `docs/qa/gates/sprint-5-story-17-purchase-request-creation.yml` - Quality gate criteria

### Change Log

#### Backend Changes:
1. **PurchaseRequest Model**:
   - Auto-generated requestId (PR-001, PR-002, etc.)
   - Product snapshot fields (name, SKU, current stock, threshold)
   - Request fields (quantity, reason, justification)
   - Status workflow (pending_approval, approved, rejected, completed, cancelled)
   - Approval fields (reviewedBy, reviewedAt, reviewNotes)
   - Purchase completion fields (supplier, invoice, cost, receivedQuantity)
   - Audit trail linking (inventoryTransactionId)

2. **Purchase Request Controller**:
   - `createPurchaseRequest` - Create new request with balagruha validation
   - `getMyPurchaseRequests` - Get own requests (Purchase Manager)
   - `getAllPurchaseRequests` - Get all requests (Admin)
   - `getPurchaseRequestById` - Get single request details
   - `cancelPurchaseRequest` - Cancel pending request

3. **Validation Middleware**:
   - Product ID validation
   - Quantity validation (min: 1)
   - Reason validation (max 200 chars, required)
   - Justification validation (max 500 chars, optional)

4. **API Routes** (`/api/v2/shop/admin/purchase-requests`):
   - POST `/` - Create request (Purchase Manager)
   - GET `/my` - Get own requests (Purchase Manager)
   - GET `/:id` - Get single request
   - PUT `/:id/cancel` - Cancel request (Purchase Manager)
   - GET `/` - Get all requests (Admin)

#### Frontend Changes:
1. **Dropdown UI Structure**:
   - Refactored PurchaseManagement to dropdown-based selector
   - Extracted MachineRepairsView from existing 926-line component
   - Created modular view architecture

2. **Shop Inventory View**:
   - Purchase requests table with 8 columns
   - Frontend filtering by user.balagruhaIds (OLD RBAC MVP)
   - Comprehensive filters: date range, balagruha, status, search
   - Real-time stats footer (total, pending, approved, completed)
   - PDF export functionality
   - Loading states and error handling

3. **Create Purchase Request Modal**:
   - Balagruha selection (filtered by user assignment)
   - Product dropdown (shows only low-stock items)
   - Product info card with stock details
   - Form validation with character counts
   - Estimated cost calculation

4. **View Request Modal**:
   - Full request lifecycle details display
   - Status-based sections (pending, approved, rejected, completed)
   - Cancel functionality for pending requests
   - Metadata section with timestamps
   - Audit trail linking display

5. **CSS Styling**:
   - 710 lines of comprehensive styles
   - Tailwind-inspired design system
   - Responsive grid layouts
   - Status badge color coding
   - Loading animations
   - Accessible form styling

### Completion Notes

**Implementation Status:** ✅ Complete

All 7 acceptance criteria fully implemented:
- ✅ AC1: Dropdown UI integration with Machine Repairs and Shop Inventory options
- ✅ AC2: Purchase request creation with product selection and validation
- ✅ AC3: View own requests with frontend filtering by balagruhaIds
- ✅ AC4: Comprehensive filters (date, balagruha, status, search) working in combination
- ✅ AC5: Cancel pending requests with confirmation
- ✅ AC6: View request details modal with full lifecycle information
- ✅ AC7: Export to PDF with filtered data support

**Technical Approach:**
- Used OLD RBAC MVP approach (frontend filtering + backend validation on writes)
- Designed for easy upgrade when NEW RBAC with scope-based filtering merges
- Backend balagruha validation prevents unauthorized request creation
- Frontend filtering provides smooth UX for Purchase Managers

**Testing:**
- Created 48 comprehensive E2E test scenarios covering all ACs
- Quality gate YAML with pass/fail criteria defined
- Local smoke testing performed on all features
- No console errors in development mode

**Code Quality:**
- Followed existing project patterns and conventions
- Component modularity for maintainability
- Comprehensive error handling and loading states
- Accessibility-focused form labels and structure
- Responsive design with mobile considerations

**Debug Log References:** None (clean implementation, no blocking issues)

**Known Limitations (MVP):**
- Frontend filtering for balagruha access (will be replaced with backend scope filtering)
- No real-time updates (manual refresh required)
- Basic PDF export format (can be enhanced in future)

All limitations documented and have clear upgrade paths when NEW RBAC merges.

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

**Last Updated:** 2025-10-29 16:33:25 (via `date '+%Y-%m-%d %H:%M:%S'`)
**Updated By:** Orchestrator (BMad) - Updated Epic reference to Epic 05
