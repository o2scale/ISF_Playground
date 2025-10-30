# Sprint 5 Purchase Manager Workflow - Architecture Overview

**Created:** 2025-10-29 16:44:54
**Sprint:** Sprint 5 Enhancement - Epic 05
**Total Stories:** 3 stories (17, 18, 19)
**Estimated Duration:** 3.5 days

---

## 📋 Table of Contents

1. [Business Context](#business-context)
2. [Solution Overview](#solution-overview)
3. [User Roles & Permissions](#user-roles--permissions)
4. [Workflow Diagrams](#workflow-diagrams)
5. [Technical Architecture](#technical-architecture)
6. [Database Models](#database-models)
7. [API Endpoints](#api-endpoints)
8. [Frontend Components](#frontend-components)
9. [RBAC Strategy](#rbac-strategy-mvp-approach)
10. [Dependencies](#dependencies)

---

## Business Context

### Problem Statement

Currently, only Admins can adjust shop inventory stock levels. When inventory runs low, there is no formal workflow for Purchase Managers to:
- Request inventory replenishment for low-stock items
- Get approval from Admin before purchasing
- Record purchase details and update inventory
- Track purchase history with full audit trails

This creates bottlenecks as Admins must handle all inventory purchases, and there's no clear separation of duties between requesting and approving purchases.

### Business Goals

1. **Reduce Admin bottleneck** - Enable Purchase Managers to initiate inventory replenishment
2. **Ensure accountability** - Require Admin approval before purchases
3. **Maintain audit trails** - Track full workflow from request to stock update
4. **Scope by balagruha** - Purchase Managers see only their assigned organizational units
5. **Prevent fraud** - No self-approval of requests

---

## Solution Overview

### High-Level Workflow

```
┌─────────────────────┐
│  Purchase Manager   │
│ Monitors low stock  │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│   Create Request    │
│  - Product          │
│  - Quantity         │
│  - Reason           │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│  Status: Pending    │
│   Approval          │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│       Admin         │
│  Reviews Request    │
└──────────┬──────────┘
           │
     ┌─────┴─────┐
     │           │
     ↓           ↓
┌─────────┐ ┌─────────┐
│ Approve │ │ Reject  │
└────┬────┘ └────┬────┘
     │           │
     ↓           ↓
┌─────────┐ ┌─────────┐
│ Status: │ │ Status: │
│Approved │ │Rejected │
└────┬────┘ └─────────┘
     │
     ↓
┌─────────────────────┐
│  Purchase Manager   │
│  Purchases Item     │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│   Update Stock      │
│  - Supplier         │
│  - Invoice          │
│  - Actual Cost      │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│ Status: Completed   │
│ Stock Updated       │
│ Audit Trail Created │
└─────────────────────┘
```

### Key Features

1. **Request Creation (Story 17)**
   - Purchase Managers create requests for low-stock items
   - Frontend filtering by assigned balagruhas
   - Validation and snapshot of current stock levels

2. **Admin Approval (Story 18)**
   - Admins review and approve/reject requests
   - Self-approval prevention
   - Admin notes for decisions

3. **Stock Update (Story 19)**
   - Purchase Managers update inventory after purchasing
   - Atomic transactions (all-or-nothing)
   - Full audit trail via InventoryTransaction
   - Idempotency checks (prevent duplicate updates)

---

## User Roles & Permissions

### Purchase Manager

**Permissions Required:**
- `Purchase Management:Create` - Create purchase requests
- `Purchase Management:Update` - Update stock after approval
- `Purchase Management:Read` - View own requests

**Access:**
- ✅ Can see requests for products from assigned balagruhas only (frontend filtered)
- ✅ Can see only their own requests
- ✅ Can create purchase requests
- ✅ Can cancel own pending requests
- ✅ Can update stock after approval
- ❌ Cannot approve own requests
- ❌ Cannot see other Purchase Managers' requests

**User Properties:**
```javascript
{
  role: 'purchase-manager',
  balagruhaIds: [ObjectId, ObjectId, ...],  // Assigned balagruhas
  permissions: [
    { module: 'Purchase Management', action: 'Create' },
    { module: 'Purchase Management', action: 'Read' },
    { module: 'Purchase Management', action: 'Update' }
  ]
}
```

### Admin

**Permissions Required:**
- `Purchase Management:Manage` - Full access to all purchase requests

**Access:**
- ✅ Can see all purchase requests (all balagruhas, all users)
- ✅ Can approve/reject any request
- ✅ Can view full audit trail
- ❌ Cannot create purchase requests (Purchase Manager's role)
- ❌ Cannot update stock (Purchase Manager's role after approval)

**User Properties:**
```javascript
{
  role: 'admin',
  balagruhaIds: [],  // Admin sees all, no filtering
  permissions: [
    { module: 'Purchase Management', action: 'Manage' }
  ]
}
```

---

## Workflow Diagrams

### Request Creation Flow (Story 17)

```
Purchase Manager
    ↓
Selects Balagruha (filtered to assigned only)
    ↓
Views Low Stock Products (frontend filtered)
    ↓
Fills Form: Product, Quantity, Reason
    ↓
POST /api/v2/shop/admin/purchase-requests
    ↓
Backend:
  - Validates balagruha access
  - Creates PurchaseRequest (status: pending_approval)
  - Snapshots current stock levels
    ↓
Frontend: Shows request in table (🟡 Pending Approval)
```

### Approval Flow (Story 18)

```
Admin
    ↓
Views All Requests (no filtering)
    ↓
Clicks Request → Modal Opens
    ↓
Reviews: Product, Stock, Reason, Requested By
    ↓
Adds Admin Notes
    ↓
Clicks [Approve] or [Reject]
    ↓
POST /api/v2/shop/admin/purchase-requests/:id/approve
  OR
POST /api/v2/shop/admin/purchase-requests/:id/reject
    ↓
Backend:
  - Validates not self-approval
  - Updates status → 'approved' or 'rejected'
  - Records reviewedBy, reviewedAt, reviewNotes
    ↓
Frontend:
  - Purchase Manager sees ✅ Approved or ❌ Rejected
  - [Update Stock] button enabled if approved
```

### Stock Update Flow (Story 19)

```
Purchase Manager
    ↓
Sees Approved Request
    ↓
Clicks [Update Stock] → Modal Opens
    ↓
Enters: Supplier, Invoice, Date, Cost, Received Qty
    ↓
POST /api/v2/shop/admin/purchase-requests/:id/complete
    ↓
Backend (Atomic Transaction):
  1. Check idempotency (already completed?)
  2. Update ShopItem.stock (+receivedQuantity)
  3. Create InventoryTransaction (type: purchase_request, ref: requestId)
  4. Update PurchaseRequest (status: completed, link inventoryTransactionId)
  5. Commit transaction (all-or-nothing)
    ↓
Frontend:
  - Request shows ✅ Completed
  - Stock reflected in Inventory Management
  - Audit trail visible
```

---

## Technical Architecture

### System Components

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend (React)                     │
├─────────────────────────────────────────────────────────┤
│  /purchase page                                          │
│  ├── Dropdown: [Machine Repairs ▼] [Shop Inventory ▼]  │
│  ├── Machine Repairs View (existing, no changes)        │
│  └── Shop Inventory View (NEW)                          │
│      ├── Purchase requests table                         │
│      ├── Filters (Date, Balagruha, Status, Search)      │
│      ├── Purchase Manager Actions:                       │
│      │   ├── [+ New Request] → CreatePurchaseRequestModal│
│      │   └── [Update Stock] → UpdateStockModal          │
│      └── Admin Actions:                                  │
│          ├── [Approve] → ApproveRequestModal            │
│          └── [Reject] → RejectRequestModal              │
└─────────────────────────────────────────────────────────┘
                           │
                           │ REST API
                           ↓
┌─────────────────────────────────────────────────────────┐
│                Backend (Node.js + Express)               │
├─────────────────────────────────────────────────────────┤
│  /api/v2/shop/admin/purchase-requests                   │
│  ├── POST   / (create request)                          │
│  ├── GET    /my (get own requests)                      │
│  ├── PUT    /:id/cancel (cancel request)                │
│  ├── POST   /:id/approve (admin approves)               │
│  ├── POST   /:id/reject (admin rejects)                 │
│  └── POST   /:id/complete (update stock)                │
└─────────────────────────────────────────────────────────┘
                           │
                           │ Mongoose
                           ↓
┌─────────────────────────────────────────────────────────┐
│                   MongoDB Database                       │
├─────────────────────────────────────────────────────────┤
│  Collections:                                            │
│  ├── purchaserequests (NEW)                             │
│  ├── shopitems (existing)                               │
│  ├── inventorytransactions (existing, add enum value)   │
│  ├── users (existing)                                   │
│  └── balagruhas (existing)                              │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

**Backend:**
- Node.js 18 LTS
- Express.js
- MongoDB + Mongoose (with sessions for transactions)
- API namespace: `/api/v2/shop/admin/`

**Frontend:**
- React (existing version)
- TailwindCSS
- Dropdown-based UI (not tabs)
- React Hot Toast for notifications

**Authentication:**
- Existing JWT-based auth
- Role-based permissions (OLD RBAC system)

---

## Database Models

### PurchaseRequest Model (NEW)

```javascript
{
  _id: ObjectId,
  requestId: String,  // Auto-generated (e.g., "PR-001")

  // Product Info (snapshot at request time)
  productId: ObjectId (ref: ShopItem),
  productName: String,
  productSKU: String,
  requestedQuantity: Number,
  currentStock: Number,
  lowStockThreshold: Number,

  // Request Info
  requestedBy: ObjectId (ref: User, role: purchase-manager),
  balagruhaId: ObjectId (ref: Balagruha),  // Derived from product
  reason: String (required, max 200 chars),
  justification: String (max 500 chars),

  // Status
  status: enum[
    'pending_approval',
    'approved',
    'rejected',
    'completed',
    'cancelled'
  ],

  // Approval (filled by Admin)
  reviewedBy: ObjectId (ref: User, role: admin),
  reviewedAt: Date,
  reviewNotes: String,

  // Purchase (filled by Purchase Manager after approval)
  supplierName: String,
  invoiceNumber: String,
  purchaseDate: Date,
  actualCost: Number,
  receivedQuantity: Number,

  // Completion (filled after stock update)
  completedBy: ObjectId (ref: User),
  completedAt: Date,
  inventoryTransactionId: ObjectId (ref: InventoryTransaction),

  createdAt: Date,
  updatedAt: Date
}
```

### InventoryTransaction Model (MODIFIED)

**Add new enum values:**

```javascript
// Add to transactionType enum
transactionType: enum[
  'purchase',
  'sale',
  'adjustment',
  'return',
  'correction',
  'purchase_request'  // ⭐ NEW
]

// Add to reference.type enum
reference: {
  type: enum[
    'order',
    'purchase',
    'manual',
    'bulk_import',
    'purchase_request'  // ⭐ NEW
  ],
  id: ObjectId  // Links to PurchaseRequest._id
}
```

---

## API Endpoints

### Purchase Manager Endpoints

**POST /api/v2/shop/admin/purchase-requests**
- **Purpose:** Create new purchase request
- **Auth:** Purchase Manager
- **Permission:** `Purchase Management:Create`
- **Body:**
  ```json
  {
    "productId": "ObjectId",
    "requestedQuantity": 10,
    "reason": "Low stock, needed for operations",
    "justification": "Current stock: 2, threshold: 5"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "_id": "ObjectId",
      "requestId": "PR-001",
      "status": "pending_approval",
      ...
    }
  }
  ```

**GET /api/v2/shop/admin/purchase-requests/my**
- **Purpose:** Get own requests (filtered by requestedBy)
- **Auth:** Purchase Manager
- **Permission:** `Purchase Management:Read`
- **Response:** Array of purchase requests

**PUT /api/v2/shop/admin/purchase-requests/:id/cancel**
- **Purpose:** Cancel pending request (before approval)
- **Auth:** Purchase Manager
- **Permission:** `Purchase Management:Update`
- **Validation:** Only own requests, only pending status

**POST /api/v2/shop/admin/purchase-requests/:id/complete**
- **Purpose:** Update stock after approval
- **Auth:** Purchase Manager
- **Permission:** `Purchase Management:Update`
- **Body:**
  ```json
  {
    "supplierName": "ABC Suppliers",
    "invoiceNumber": "INV-12345",
    "purchaseDate": "2025-10-29",
    "actualCost": 5000,
    "receivedQuantity": 10
  }
  ```

### Admin Endpoints

**GET /api/v2/shop/admin/purchase-requests**
- **Purpose:** Get all purchase requests
- **Auth:** Admin
- **Permission:** `Purchase Management:Manage`
- **Query Params:** status, balagruhaId, dateFrom, dateTo
- **Response:** Array of all purchase requests (no filtering)

**POST /api/v2/shop/admin/purchase-requests/:id/approve**
- **Purpose:** Approve purchase request
- **Auth:** Admin
- **Permission:** `Purchase Management:Manage`
- **Body:**
  ```json
  {
    "reviewNotes": "Approved for purchase, budget available"
  }
  ```
- **Validation:** Cannot approve own request

**POST /api/v2/shop/admin/purchase-requests/:id/reject**
- **Purpose:** Reject purchase request
- **Auth:** Admin
- **Permission:** `Purchase Management:Manage`
- **Body:**
  ```json
  {
    "reviewNotes": "Rejected, insufficient budget"
  }
  ```

---

## Frontend Components

### Component Structure

```
frontend/src/components/purchaseManagement/
├── PurchaseManagement.jsx          // Main component (dropdown UI)
├── PurchaseManagement.css
│
├── views/
│   ├── MachineRepairsView.jsx      // Refactored existing code
│   └── ShopInventoryView.jsx       // NEW - Purchase requests
│
├── modals/
│   ├── CreateRepairOrderModal.jsx  // Existing
│   ├── CreatePurchaseRequestModal.jsx   // NEW (Story 17)
│   ├── ApproveRequestModal.jsx          // NEW (Story 18)
│   ├── RejectRequestModal.jsx           // NEW (Story 18)
│   └── UpdateStockModal.jsx             // NEW (Story 19)
│
└── components/
    ├── SharedFilters.jsx           // Date, Balagruha, Status
    ├── PurchaseRequestCard.jsx     // Request display
    └── StatusBadge.jsx             // Status indicators
```

### Dropdown UI Pattern

```jsx
<div className="mb-6">
  <select
    value={selectedView}
    onChange={(e) => setSelectedView(e.target.value)}
    className="px-4 py-2 border rounded-lg"
  >
    <option value="machine-repairs">Machine Repairs</option>
    <option value="shop-inventory">Shop Inventory</option>
  </select>
</div>

{selectedView === 'machine-repairs' && <MachineRepairsView />}
{selectedView === 'shop-inventory' && <ShopInventoryView />}
```

---

## RBAC Strategy (MVP Approach)

### Why MVP Approach?

- **develop branch** uses OLD RBAC (no scope field)
- **feature/sprint-2 branch** has NEW RBAC (with scope field, not merged yet)
- MVP uses **frontend filtering** with **light backend validation**
- Designed for **easy upgrade** when NEW RBAC merges

### Frontend Filtering

```javascript
// In ShopInventoryView.jsx
useEffect(() => {
  const filtered = allRequests.filter(request => {
    if (user.role === 'purchase-manager') {
      // Purchase Manager sees only:
      // 1. Own requests (requestedBy matches user._id)
      // 2. From assigned balagruhas
      return user.balagruhaIds.includes(request.balagruhaId) &&
             request.requestedBy._id === user._id;
    }
    return true;  // Admin sees all
  });
  setFilteredRequests(filtered);
}, [allRequests, user]);
```

### Backend Validation (Light)

```javascript
// In purchaseRequestController.js
exports.createPurchaseRequest = async (req, res) => {
  const { productId } = req.body;
  const product = await ShopItem.findById(productId);

  // Validate Purchase Manager has access to product's balagruha
  if (req.user.role === 'purchase-manager') {
    if (product.balagruhaId &&
        !req.user.balagruhaIds.includes(product.balagruhaId.toString())) {
      return res.status(403).json({
        success: false,
        message: 'No access to this balagruha'
      });
    }
  }

  // Continue with request creation...
};
```

### Future Upgrade Path

When NEW RBAC merges:
1. Remove frontend filtering logic
2. Add backend scope-based query filtering
3. Add `scope: 'balagruh'` to Purchase Management permissions
4. Automatic query filtering via middleware

---

## Dependencies

### Technical Dependencies

- ✅ Existing ShopItem model (Sprint 5 Story 05)
- ✅ Existing InventoryTransaction model (Sprint 5 Story 06)
- ✅ Existing inventory controllers (Sprint 5 Story 06)
- ✅ Existing purchase page UI (Machine Repairs)
- ✅ OLD RBAC system (develop branch)

### Story Dependencies

- **Story 17:** No dependencies (foundation story)
- **Story 18:** Depends on Story 17 (needs PurchaseRequest model and UI structure)
- **Story 19:** Depends on Story 18 (needs approval workflow to be complete)

---

## Key Design Decisions

### 1. Dropdown vs Tabs
**Decision:** Dropdown
**Reason:** Cleaner UI, single page, role-based views

### 2. Frontend Filtering vs Backend Scope
**Decision:** Frontend filtering (MVP)
**Reason:** OLD RBAC doesn't support scope, easy upgrade path

### 3. Atomic Transactions
**Decision:** Use Mongoose sessions
**Reason:** Ensure all-or-nothing stock updates (product + transaction + request)

### 4. Idempotency
**Decision:** Check `inventoryTransactionId` before update
**Reason:** Prevent duplicate stock updates

### 5. Self-Approval Prevention
**Decision:** Backend validation `requestedBy !== reviewedBy`
**Reason:** Business rule to prevent fraud

---

## Success Metrics

### Functional Metrics
- ✅ Purchase Manager can create requests in <2 minutes
- ✅ Admin can approve/reject in <1 minute
- ✅ Stock updates complete in <3 minutes
- ✅ Full audit trail visible for all requests
- ✅ Zero duplicate stock updates (idempotency)

### Quality Metrics
- ✅ 80%+ test coverage for backend controllers
- ✅ E2E tests for complete workflow
- ✅ No permission bypass vulnerabilities
- ✅ All requests linked to inventory transactions

---

**End of Overview**

**Version:** 1.0
**Created:** 2025-10-29 16:44:54
**For:** Sprint 5 Purchase Manager Workflow
