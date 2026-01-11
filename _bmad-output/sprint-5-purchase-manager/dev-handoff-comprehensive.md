# Sprint 5 Purchase Manager - Developer Handoff Document

**Version:** 2.0 (Updated with Client Corrections)  
**Date:** January 5, 2026  
**Prepared By:** BMad Master  
**Status:** Ready for Implementation

---

## Executive Summary

This document provides everything a developer needs to implement the **Purchase Manager Workflow** feature for ISF Playground. The feature creates a 4-step procurement lifecycle with strict governance controls.

### Key Client Corrections Incorporated

| # | Correction | Status |
|---|------------|--------|
| 1 | 6 Purchase Categories (Medicines, ISF Shop, Repairs, Consumables, Infra, Others) | ✅ Added |
| 2 | PM Bunched View (same items grouped with total quantities) | ✅ Added |
| 3 | Priority Levels (High/Medium/Low) on requests | ✅ Added |
| 4 | Request Deadline field | ✅ Added |
| 5 | Category-filtered item dropdowns | ✅ Added |
| 6 | PM Navigation badge for high priority items | ✅ Added |

---

## Quick Start

### 1. Read These Documents First
1. `_bmad-output/sprint-5-purchase-manager/prd-purchase-manager-workflow.md` - Full requirements
2. `_bmad-output/sprint-5-purchase-manager/epics.md` - Stories breakdown

### 2. Implementation Order (Recommended)
```
Phase 1: Foundation
├── Story 1.1: Vendor Data Model
├── Story 1.2: ShopItem Schema Refactor  
└── Story 1.3: Admin New Item UI

Phase 2: Workflow Engine
├── Story 2.1: Purchase Request State Machine
├── Story 2.2: Staff Request UI
├── Story 2.3: PM Fulfillment Actions
├── Story 2.4: Priority & Deadline (NEW)
└── Story 2.5: Six Categories (NEW)

Phase 3: Dashboards
├── Story 3.1: PM Dashboard
├── Story 3.2: Coach Dashboard
├── Story 3.3: Admin Inventory Report
├── Story 3.4: PM Tabs & Buckets (NEW)
└── Story 3.5: PM Bunched View (NEW)

Phase 4: Audit
└── Story 4.1: Stock Reconciliation
```

---

## Architecture Overview

### Tech Stack
- **Backend:** Node.js + Express + MongoDB
- **Frontend:** React 19 + Zustand + Tailwind CSS
- **Auth:** JWT (existing Sprint 1 system)

### New Data Models

#### 1. Vendor Model (NEW)
```javascript
// backend/models/vendor.js
const VendorSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String },
  email: { type: String },
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
```

#### 2. ShopItem Extensions
```javascript
// Add to backend/models/shopItem.js
{
  // Existing fields...
  
  // NEW: Procurement fields
  approvedVendors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor'
  }], // Max 3
  maxPrice: { type: Number }, // In Rupees (procurement cost)
  sellingPrice: { type: Number }, // In Coins (ISF economy)
  
  // NEW: Category for filtering
  purchaseCategory: {
    type: String,
    enum: ['isf_shop', 'medicines', 'repairs', 'consumables', 'infra', 'others'],
    default: 'others'
  }
}
```

#### 3. PurchaseRequest Extensions
```javascript
// Add to backend/models/purchaseRequest.js
{
  // Existing fields...
  
  // NEW: Status enum update
  status: {
    type: String,
    enum: ['pending', 'ordered', 'delivered_store', 'delivered_balagruha', 'rejected', 'on_hold'],
    default: 'pending'
  },
  
  // NEW: Category
  category: {
    type: String,
    enum: ['isf_shop', 'medicines', 'repairs', 'consumables', 'infra', 'others'],
    required: true
  },
  
  // NEW: Priority
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium'
  },
  
  // NEW: Deadline
  deadline: { type: Date, required: true },
  
  // NEW: Status transition tracking
  statusHistory: [{
    status: String,
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    changedAt: { type: Date, default: Date.now },
    note: String
  }]
}
```

---

## API Endpoints

### Vendor Management (Admin Only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v2/shop/admin/vendors` | List all vendors |
| POST | `/api/v2/shop/admin/vendors` | Create vendor |
| PUT | `/api/v2/shop/admin/vendors/:id` | Update vendor |
| DELETE | `/api/v2/shop/admin/vendors/:id` | Soft delete vendor |

### Purchase Requests
| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/api/v2/shop/requests` | List requests (filtered by role) | All |
| POST | `/api/v2/shop/requests` | Create request | Staff |
| GET | `/api/v2/shop/requests/:id` | Get request detail | All |
| PATCH | `/api/v2/shop/requests/:id/status` | Update status | PM/Coach |
| GET | `/api/v2/shop/admin/requests/bunched` | Get bunched view | PM |

### Dashboard Analytics
| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/api/v2/shop/admin/requests/stats` | PM scorecard stats | PM |
| GET | `/api/v2/shop/admin/requests/priority-count` | High priority count | PM |

---

## Frontend Components

### New Components to Create

```
frontend/src/components/purchaseManagement/
├── modals/
│   ├── CreatePurchaseRequestModal.jsx  // UPDATE: Add priority, deadline, category
│   └── CreateVendorModal.jsx           // NEW
├── views/
│   ├── ShopInventoryView.jsx           // UPDATE: Add tabs, bunched view toggle
│   ├── BunchedItemsView.jsx            // NEW: Bunched/grouped view
│   ├── CoachRequestsDashboard.jsx      // UPDATE: Add priority, deadline columns
│   └── VendorManagementView.jsx        // NEW
├── components/
│   ├── PriorityBadge.jsx               // NEW: Colored priority indicator
│   ├── CategoryTabs.jsx                // NEW: 6 category tabs
│   ├── StatusBucketTabs.jsx            // NEW: 4 status bucket tabs
│   └── BunchedItemCard.jsx             // NEW: Expandable grouped item card
└── PurchaseManagement.css              // UPDATE: New styles
```

### Key UI Patterns

#### Priority Badge Component
```jsx
// frontend/src/components/purchaseManagement/components/PriorityBadge.jsx
const PriorityBadge = ({ priority }) => {
  const colors = {
    high: 'bg-red-500 text-white',
    medium: 'bg-yellow-500 text-black',
    low: 'bg-green-500 text-white'
  };
  
  return (
    <span className={`px-2 py-1 rounded text-xs font-bold ${colors[priority]}`}>
      {priority.toUpperCase()}
    </span>
  );
};
```

#### Category Tabs Component
```jsx
// frontend/src/components/purchaseManagement/components/CategoryTabs.jsx
const CATEGORIES = [
  { id: 'all', label: 'All Categories' },
  { id: 'isf_shop', label: 'ISF Shop' },
  { id: 'medicines', label: 'Medicines' },
  { id: 'consumables', label: 'Consumables' },
  { id: 'repairs', label: 'Repairs' },
  { id: 'infra', label: 'Infra' },
  { id: 'others', label: 'Others' }
];

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="flex space-x-2 border-b">
      {CATEGORIES.map(cat => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={`px-4 py-2 ${activeCategory === cat.id ? 'border-b-2 border-blue-500' : ''}`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};
```

---

## The 4-Step Workflow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        PURCHASE REQUEST LIFECYCLE                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Step 1: PENDING          Step 2: ORDERED        Step 3: DELIVERED_STORE│
│  ┌─────────────┐         ┌─────────────┐        ┌─────────────┐         │
│  │   Coach     │ ──────► │     PM      │ ─────► │     PM      │         │
│  │  Requests   │         │   Orders    │        │  Receives   │         │
│  └─────────────┘         └─────────────┘        └─────────────┘         │
│        │                                               │                 │
│        │ (If in stock)                                 │                 │
│        └───────────────────────────────────────────────┤                 │
│                        SHORTCUT                        │                 │
│                                                        ▼                 │
│                                               ┌─────────────┐           │
│                        Step 4:                │   Coach     │           │
│                        DELIVERED_BALAGRUHA    │  Delivers   │           │
│                                               └─────────────┘           │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### In-Stock Shortcut Logic
```javascript
// If item has sufficient stock, skip steps 2 & 3
async function assignFromStock(requestId, pmUserId) {
  const request = await PurchaseRequest.findById(requestId).populate('shopItemId');
  
  if (request.shopItemId.stock >= request.quantity) {
    // Decrement stock
    await ShopItem.findByIdAndUpdate(request.shopItemId._id, {
      $inc: { stock: -request.quantity }
    });
    
    // Jump to delivered_store (step 3)
    request.status = 'delivered_store';
    request.statusHistory.push({
      status: 'delivered_store',
      changedBy: pmUserId,
      note: 'Assigned from existing stock'
    });
    
    await request.save();
  }
}
```

---

## Bunched View Implementation

### Backend Aggregation
```javascript
// GET /api/v2/shop/admin/requests/bunched
exports.getBunchedRequests = async (req, res) => {
  const { category, status } = req.query;
  
  const matchStage = { status: status || 'pending' };
  if (category && category !== 'all') {
    matchStage.category = category;
  }
  
  const result = await PurchaseRequest.aggregate([
    { $match: matchStage },
    { $group: {
      _id: '$shopItemId',
      totalQuantity: { $sum: '$quantity' },
      requestCount: { $sum: 1 },
      highestPriority: { 
        $max: { 
          $switch: {
            branches: [
              { case: { $eq: ['$priority', 'high'] }, then: 3 },
              { case: { $eq: ['$priority', 'medium'] }, then: 2 }
            ],
            default: 1
          }
        }
      },
      requests: { $push: {
        _id: '$_id',
        requesterId: '$requesterId',
        quantity: '$quantity',
        priority: '$priority',
        deadline: '$deadline',
        balagruhaId: '$balagruhaId',
        createdAt: '$createdAt'
      }}
    }},
    { $lookup: {
      from: 'shopitems',
      localField: '_id',
      foreignField: '_id',
      as: 'item'
    }},
    { $unwind: '$item' },
    { $lookup: {
      from: 'users',
      localField: 'requests.requesterId',
      foreignField: '_id',
      as: 'requesters'
    }},
    { $project: {
      itemId: '$_id',
      itemName: '$item.name',
      itemSku: '$item.sku',
      totalQuantity: 1,
      requestCount: 1,
      highestPriority: {
        $switch: {
          branches: [
            { case: { $eq: ['$highestPriority', 3] }, then: 'high' },
            { case: { $eq: ['$highestPriority', 2] }, then: 'medium' }
          ],
          default: 'low'
        }
      },
      requests: 1
    }},
    { $sort: { highestPriority: -1, totalQuantity: -1 } }
  ]);
  
  res.json({ success: true, data: result });
};
```

### Frontend Bunched View
```jsx
// frontend/src/components/purchaseManagement/views/BunchedItemsView.jsx
const BunchedItemsView = ({ data, onOrderAll }) => {
  const [expanded, setExpanded] = useState({});
  
  return (
    <div className="space-y-4">
      {data.map(item => (
        <div key={item.itemId} className="border rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold">{item.itemName}</h3>
              <p className="text-sm text-gray-600">SKU: {item.itemSku}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{item.totalQuantity}</p>
              <p className="text-sm">{item.requestCount} requests</p>
            </div>
            <PriorityBadge priority={item.highestPriority} />
            <button
              onClick={() => onOrderAll(item.itemId)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Order All
            </button>
          </div>
          
          {/* Expandable section */}
          <button onClick={() => setExpanded(e => ({...e, [item.itemId]: !e[item.itemId]}))}>
            {expanded[item.itemId] ? '▼ Hide Details' : '▶ Show Details'}
          </button>
          
          {expanded[item.itemId] && (
            <table className="w-full mt-4">
              <thead>
                <tr>
                  <th>Requester</th>
                  <th>Quantity</th>
                  <th>Priority</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                {item.requests.map(req => (
                  <tr key={req._id}>
                    <td>{req.requesterName}</td>
                    <td>{req.quantity}</td>
                    <td><PriorityBadge priority={req.priority} /></td>
                    <td>{new Date(req.deadline).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
};
```

---

## RBAC Matrix

| Action | Admin | PM | Coach | Medical | Sports | Music |
|--------|:-----:|:--:|:-----:|:-------:|:------:|:-----:|
| Create Vendor | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Create Master Item | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Create Purchase Request | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Mark Ordered | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Mark Delivered to Store | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Mark Delivered to Balagruha | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| Stock Reconciliation | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| View All Requests | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| View Own Requests | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Testing Requirements

### Critical Test Cases

1. **Category Filtering**
   - Verify item dropdown only shows items matching selected category
   - Verify PM can filter requests by category

2. **Priority Sorting**
   - Verify PM dashboard sorts by priority (High → Medium → Low)
   - Verify priority badge displays correct color

3. **Bunched View**
   - Verify same items are grouped correctly
   - Verify total quantity is calculated correctly
   - Verify "Order All" marks all grouped requests

4. **In-Stock Shortcut**
   - Verify stock is decremented
   - Verify status jumps to `delivered_store`

5. **Status Transitions**
   - Verify only PM can mark `ordered` and `delivered_store`
   - Verify only Coach can mark `delivered_balagruha`

---

## Migration Script

```javascript
// backend/scripts/migrate-purchase-categories.js
const mongoose = require('mongoose');
const ShopItem = require('../models/shopItem');

async function migratePurchaseCategories() {
  // Assign default category to existing items
  await ShopItem.updateMany(
    { purchaseCategory: { $exists: false } },
    { $set: { purchaseCategory: 'others' } }
  );
  
  console.log('Migration complete: All existing items assigned to "others" category');
}

migratePurchaseCategories();
```

---

## Story Files Reference

| Story | File | Status |
|-------|------|--------|
| 1.1 Vendor Model | `1-1-vendor-data-model.md` | Review |
| 1.2 ShopItem Refactor | `1-2-shopitem-refactor.md` | Review |
| 1.3 Admin UI | `1-3-admin-ui.md` | Review |
| 2.1 Workflow Engine | `2-1-workflow-engine.md` | Review |
| 2.2 Staff Request UI | `2-2-staff-request-ui.md` | Review |
| 2.3 PM Fulfillment | `2-3-fulfillment-actions.md` | Review |
| 2.4 Priority & Deadline | `2-4-request-priority-deadline.md` | **NEW** |
| 2.5 Six Categories | `2-5-six-purchase-categories-enhanced.md` | **NEW** |
| 3.1 PM Dashboard | `3-1-pm-dashboard.md` | Review |
| 3.2 Coach Dashboard | `3-2-coach-dashboard.md` | Review |
| 3.3 Admin Report | `3-3-admin-inventory-report.md` | Review |
| 3.4 PM Tabs | `3-4-pm-tabs-and-buckets.md` | Review |
| 3.5 Bunched View | `3-5-pm-bunched-view.md` | **NEW** |
| 4.1 Stock Reconciliation | `4-1-stock-reconciliation.md` | Review |

---

## Definition of Done

- [ ] All backend endpoints implemented and tested
- [ ] All frontend components implemented
- [ ] RBAC enforced at API level
- [ ] Unit tests written (>80% coverage)
- [ ] E2E tests for critical paths
- [ ] Migration script tested on staging
- [ ] Code reviewed
- [ ] QA passed

---

**Document End**
