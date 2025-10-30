# Epic 05: Purchase Manager Workflow - Shop Inventory Replenishment

**Epic ID:** Sprint5-Epic-05
**Sprint:** Sprint 5 (Enhancement)
**Priority:** High
**Status:** In Progress
**Created:** 2025-10-29 16:27:00
**Last Updated:** 2025-10-29 16:27:00
**Created By:** Orchestrator (BMad)

---

## Epic Overview

### Business Goal
Enable Purchase Managers to efficiently manage shop inventory replenishment through a structured request-approval-update workflow, reducing stock-outs and ensuring proper audit trails for all inventory purchases.

### Problem Statement
Currently, only Admins can adjust shop inventory stock levels. When inventory runs low, there is no formal workflow for Purchase Managers to:
- Request inventory replenishment for low-stock items
- Get approval from Admin before purchasing
- Record purchase details and update inventory
- Track purchase history with full audit trails

This creates bottlenecks as Admins must handle all inventory purchases, and there's no clear separation of duties between requesting and approving purchases.

### Solution Summary
Build a **Purchase Manager Workflow** integrated into the existing `/purchase` page using a **dropdown-based UI** that allows:
- Purchase Managers to create purchase requests for low-stock shop items
- Admins to approve/reject purchase requests
- Purchase Managers to update inventory after approval with supplier/invoice details
- Full audit trail linking purchase requests to inventory transactions

---

## Epic Scope

### In Scope
✅ Purchase request creation (Purchase Manager)
✅ Admin approval/rejection workflow
✅ Inventory stock update after approval (Purchase Manager)
✅ Frontend filtering by user's assigned balagruhas (MVP - no backend scope)
✅ Audit trail integration with existing InventoryTransaction model
✅ Dropdown-based UI in existing `/purchase` page (Machine Repairs + Shop Inventory)
✅ Role-based permissions using existing OLD RBAC system
✅ Export to PDF functionality

### Out of Scope
❌ Backend scope-based filtering (deferred to future RBAC upgrade)
❌ Supplier master data management
❌ Purchase order tracking (in-transit, delivery dates)
❌ Cost analytics and budgeting
❌ Automated low-stock notifications
❌ Multi-level approval workflows

---

## User Roles

### Purchase Manager
**Permissions Required:**
- `Purchase Management:Create` - Create purchase requests
- `Purchase Management:Update` - Update stock after approval
- `Purchase Management:Read` - View own requests

**Responsibilities:**
1. Monitor low-stock items in assigned balagruhas
2. Create purchase requests with justification
3. After approval: record supplier details and update inventory
4. Maintain accurate purchase records

**Access:**
- ✅ Can see requests for products from assigned balagruhas only (frontend filtered)
- ✅ Can see only their own requests
- ❌ Cannot approve own requests
- ❌ Cannot see other Purchase Managers' requests

### Admin
**Permissions Required:**
- `Purchase Management:Manage` - Full access to all purchase requests

**Responsibilities:**
1. Review purchase requests from all Purchase Managers
2. Approve or reject requests with notes
3. Monitor purchase request trends
4. Ensure budget compliance

**Access:**
- ✅ Can see all purchase requests (all balagruhas, all users)
- ✅ Can approve/reject any request
- ❌ Cannot create purchase requests (Purchase Manager's role)
- ❌ Cannot update stock (Purchase Manager's role after approval)

---

## User Stories

### Story 1: Purchase Request Creation & Management
**As a** Purchase Manager
**I want to** create purchase requests for low-stock shop items
**So that** I can formally request inventory replenishment with proper approval

**Acceptance Criteria:**
- Purchase Manager can access dropdown "Shop Inventory" option in `/purchase` page
- Can create new purchase request for products with low stock
- Request includes: product, quantity, reason, justification
- Balagruha dropdown shows only assigned balagruhas (frontend filtered)
- Product dropdown shows only low-stock items from selected balagruha
- Can view own pending/approved/rejected/completed requests
- Can cancel pending requests (before admin approval)
- Requests are filtered by user's balagruhaIds (frontend filtering)

**Estimate:** 1.5 days

---

### Story 2: Admin Approval Workflow
**As an** Admin
**I want to** review and approve/reject purchase requests
**So that** I can control inventory purchasing and ensure budget compliance

**Acceptance Criteria:**
- Admin can see all purchase requests (all balagruhas, all purchase managers)
- Can filter by status, balagruha, date range
- Can view request details (product, stock levels, reason)
- Can approve with admin notes
- Can reject with rejection reason
- Purchase Manager receives updated status (approved/rejected)
- Approved requests enable "Update Stock" action for Purchase Manager

**Estimate:** 1 day

---

### Story 3: Stock Update & Audit Trail
**As a** Purchase Manager
**I want to** update inventory stock after admin approval
**So that** purchased items are reflected in the system with full audit trail

**Acceptance Criteria:**
- After approval, Purchase Manager can click "Update Stock" button
- Can enter supplier name, invoice number, purchase date, actual cost
- System updates ShopItem stock quantity
- System creates InventoryTransaction record (type: 'purchase_request')
- Transaction links to PurchaseRequest for full audit trail
- Request status changes to "Completed"
- Inventory Management page shows updated stock
- Full workflow visible in audit trail (request → approval → stock update)

**Estimate:** 1 day

---

## Technical Architecture

### New Database Models

#### PurchaseRequest Model
```javascript
{
  _id: ObjectId,
  requestId: String,  // Auto-generated (e.g., "PR-001")

  // Product Info
  productId: ObjectId (ref: ShopItem),
  productName: String (snapshot),
  productSKU: String (snapshot),
  requestedQuantity: Number,
  currentStock: Number (snapshot at request time),
  lowStockThreshold: Number (snapshot),

  // Request Info
  requestedBy: ObjectId (ref: User, role: purchase-manager),
  balagruhaId: ObjectId (ref: Balagruha),  // Derived from product
  reason: String (required, max 200 chars),
  justification: String (max 500 chars),

  // Status
  status: enum['pending_approval', 'approved', 'rejected', 'completed', 'cancelled'],

  // Approval
  reviewedBy: ObjectId (ref: User, role: admin),
  reviewedAt: Date,
  reviewNotes: String,

  // Purchase (filled after approval)
  supplierName: String,
  invoiceNumber: String,
  purchaseDate: Date,
  actualCost: Number,
  receivedQuantity: Number,

  // Completion
  completedBy: ObjectId (ref: User),
  completedAt: Date,
  inventoryTransactionId: ObjectId (ref: InventoryTransaction),

  timestamps: true
}
```

### Modified Models

#### InventoryTransaction Model (Add new enum values)
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
  id: ObjectId
}
```

---

## API Endpoints

### Backend Routes: `/api/v2/shop/admin/purchase-requests`

#### Purchase Manager Endpoints
```javascript
POST   /api/v2/shop/admin/purchase-requests
       - Create new purchase request
       - Auth: Purchase Manager
       - Permission: Purchase Management:Create
       - Body: { productId, quantity, reason, justification }

GET    /api/v2/shop/admin/purchase-requests/my
       - Get own requests (filtered by requestedBy)
       - Auth: Purchase Manager
       - Permission: Purchase Management:Read

PUT    /api/v2/shop/admin/purchase-requests/:id/cancel
       - Cancel pending request (before approval)
       - Auth: Purchase Manager
       - Permission: Purchase Management:Update

POST   /api/v2/shop/admin/purchase-requests/:id/complete
       - Update stock after approval
       - Auth: Purchase Manager
       - Permission: Purchase Management:Update
       - Body: { supplierName, invoiceNumber, purchaseDate, actualCost, receivedQuantity }
```

#### Admin Endpoints
```javascript
GET    /api/v2/shop/admin/purchase-requests
       - Get all purchase requests
       - Auth: Admin
       - Permission: Purchase Management:Manage

POST   /api/v2/shop/admin/purchase-requests/:id/approve
       - Approve purchase request
       - Auth: Admin
       - Permission: Purchase Management:Manage
       - Body: { reviewNotes }

POST   /api/v2/shop/admin/purchase-requests/:id/reject
       - Reject purchase request
       - Auth: Admin
       - Permission: Purchase Management:Manage
       - Body: { reviewNotes }

GET    /api/v2/shop/admin/purchase-requests/:id/audit
       - Get full audit trail for request
       - Auth: Admin or Purchase Manager (own requests)
```

---

## Frontend Architecture

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
│   ├── CreatePurchaseRequestModal.jsx   // NEW
│   ├── ApproveRequestModal.jsx          // NEW (Admin)
│   ├── RejectRequestModal.jsx           // NEW (Admin)
│   └── UpdateStockModal.jsx             // NEW (Purchase Manager)
│
└── components/
    ├── SharedFilters.jsx           // Date, Balagruha, Status
    ├── PurchaseRequestCard.jsx     // Request display
    └── StatusBadge.jsx             // Status indicators
```

### UI Flow
```
/purchase page
├── Dropdown: [Machine Repairs ▼] [Shop Inventory]
├── Filters: Date, Balagruha (filtered by role), Status, Search
│
├── Machine Repairs View (existing - refactored)
│   └── Repair orders table
│
└── Shop Inventory View (NEW)
    ├── Purchase requests table
    ├── Role-based action buttons:
    │   ├── Purchase Manager: [+ New Request], [Update Stock]
    │   └── Admin: [Approve], [Reject]
    └── Frontend filtering by user.balagruhaIds
```

---

## Data Flow Diagrams

### Request Creation Flow
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
Backend: Creates PurchaseRequest (status: pending_approval)
    ↓
Frontend: Shows request in table (🟡 Pending)
```

### Approval Flow
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
POST /api/v2/shop/admin/purchase-requests/:id/approve
    ↓
Backend: Updates status → 'approved', records reviewedBy/reviewedAt
    ↓
Frontend: Purchase Manager sees ✅ Approved, [Update Stock] button enabled
```

### Stock Update Flow
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
Backend:
  1. Updates ShopItem.stock
  2. Creates InventoryTransaction (type: purchase_request, ref: requestId)
  3. Updates PurchaseRequest (status: completed, links inventoryTransactionId)
    ↓
Frontend: Request shows ✅ Completed
```

---

## RBAC Integration (MVP Approach)

### Using OLD RBAC System (develop branch)

**Permission Module:** `Purchase Management`

**Actions:**
- `Create` - Purchase Manager creates requests
- `Read` - Purchase Manager views own requests
- `Update` - Purchase Manager updates stock, cancels requests
- `Manage` - Admin approves/rejects, views all

**Backend Validation:**
```javascript
// Light balagruha validation on write operations
exports.createPurchaseRequest = async (req, res) => {
  const { productId } = req.body;
  const product = await ShopItem.findById(productId);

  // Validate Purchase Manager has access to product's balagruha
  if (req.user.role === 'purchase-manager') {
    if (product.balagruhaId && !req.user.balagruhaIds.includes(product.balagruhaId)) {
      return res.status(403).json({ message: 'No access to this balagruha' });
    }
  }

  // Continue...
};
```

**Frontend Filtering:**
```javascript
// Purchase Manager sees only own requests from assigned balagruhas
const filteredRequests = allRequests.filter(request => {
  if (user.role === 'purchase-manager') {
    return user.balagruhaIds.includes(request.balagruhaId) &&
           request.requestedBy._id === user._id;
  }
  return true;  // Admin sees all
});
```

---

## Success Metrics

### Functional Metrics
- ✅ Purchase Manager can create requests in <2 minutes
- ✅ Admin can approve/reject in <1 minute
- ✅ Stock updates complete in <3 minutes
- ✅ Full audit trail visible for all requests
- ✅ Zero duplicate stock updates (idempotency)

### Quality Metrics
- ✅ 100% test coverage for backend controllers
- ✅ E2E tests for complete workflow
- ✅ No permission bypass vulnerabilities
- ✅ All requests linked to inventory transactions

---

## Dependencies

### Technical Dependencies
- ✅ Existing ShopItem model (Sprint 5 Story 05)
- ✅ Existing InventoryTransaction model (Sprint 5 Story 06)
- ✅ Existing inventory controllers (Sprint 5 Story 06)
- ✅ Existing purchase page UI (Machine Repairs)
- ✅ OLD RBAC system (develop branch)

### User Dependencies
- ✅ Purchase Manager users must be created in system
- ✅ Purchase Manager users must be assigned balagruhaIds
- ✅ Purchase Manager role must have Purchase Management permissions

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Frontend filtering bypassed via API | Medium | High | Add backend validation on write operations |
| Duplicate stock updates | Low | High | Add idempotency check (requestId already completed) |
| Permission confusion with machine repairs | Low | Medium | Clear UI separation via dropdown |
| Purchase Manager approves own request | Low | High | Backend validation: requestedBy !== reviewedBy |
| RBAC upgrade breaks frontend filtering | Medium | Medium | Design for easy upgrade to backend scope filtering |

---

## Testing Strategy

### Unit Tests
- PurchaseRequest model validation
- Controller permission checks
- Balagruha access validation
- Stock update calculations

### Integration Tests
- Full workflow: create → approve → complete
- Permission enforcement (Purchase Manager vs Admin)
- Inventory transaction creation
- Audit trail linkage

### E2E Tests (Playwright)
- Purchase Manager creates request
- Admin approves request
- Purchase Manager updates stock
- Verify stock updated in Inventory Management
- Verify audit trail complete

---

## Rollout Plan

### Phase 1: Backend Implementation (Day 1)
- Create PurchaseRequest model
- Build purchase request controllers
- Add validation middleware
- Create API routes

### Phase 2: Frontend Refactor (Day 2)
- Refactor PurchaseManagement.jsx to dropdown structure
- Extract MachineRepairsView component
- Build shared filters component
- Test role-based dropdown visibility

### Phase 3: Shop Inventory View (Day 3)
- Build ShopInventoryView component
- Create purchase request modals (create, approve, reject, update)
- Implement frontend filtering
- Add export to PDF

### Phase 4: Testing & QA (Day 4)
- Unit tests
- Integration tests
- E2E tests
- Bug fixes

### Phase 5: Deployment (Day 5)
- Deploy to staging
- User acceptance testing
- Deploy to production
- Monitor for issues

---

## Future Enhancements (Out of Scope)

### Phase 2: Advanced Features
- Purchase order tracking (in-transit, received statuses)
- Supplier master data management
- Cost vs budget analytics
- Multi-level approval workflows
- Automated low-stock email notifications

### Phase 3: RBAC Upgrade Integration
- Backend scope-based filtering (when NEW RBAC merges)
- Remove frontend filtering workaround
- Add scope: 'balagruh' to Purchase Management permissions
- Automatic query filtering via middleware

---

## Documentation

### For Developers
- API documentation in Swagger/Postman
- Component architecture diagram
- State management flow
- Database schema changes

### For Users
- Purchase Manager user guide
- Admin approval workflow guide
- Video tutorial (screen recording)
- FAQ document

---

## Approval

**Epic Owner:** Product Owner
**Technical Lead:** Dev Agent (James)
**QA Lead:** QA Agent (Quinn)
**Stakeholder:** Client (ISF Foundation)

**Status:** Pending Approval

---

**Last Updated:** 2025-10-29 16:33:25 (via `date '+%Y-%m-%d %H:%M:%S'`)
**Updated By:** Orchestrator (BMad) - Corrected to Epic 05
