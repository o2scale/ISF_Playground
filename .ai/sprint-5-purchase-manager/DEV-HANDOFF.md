# Sprint 5 Purchase Manager Developer Handoff - START HERE

**Created:** 2025-10-29 16:44:54
**Sprint:** Sprint 5 - Purchase Manager Workflow (Epic 05)
**Total Stories:** 3 stories (17, 18, 19)
**Your Mission:** Implement Sprint 5 Purchase Manager stories following BMAD workflow

---

## 🚀 Quick Start (3 Steps)

### Step 1: Load Essential Context (Auto-loaded by BMAD)
Your BMAD agent will automatically load:
- `.ai/developer-onboarding-guide.md` - General workflow
- `.ai/workflow-quick-reference.md` - BMAD workflow rules
- `.bmad-core/agents/dev.md` - Your agent instructions

### Step 2: Read Sprint 5 Context (REQUIRED - Read Now)
```
📖 MUST READ (in order):
1. .ai/sprint-5-purchase-manager/sprint-5-overview.md (10 min)
   → Understand Purchase Manager workflow architecture

2. .ai/sprint-5-purchase-manager/technical-patterns.md (10 min)
   → Atomic transactions, frontend filtering patterns

3. docs/epics/sprint5/sprint5-epic-05-purchase-manager-workflow.md (5 min)
   → Epic overview, API endpoints, component structure
```

### Step 3: Find Your First Story
```bash
# All Sprint 5 Purchase Manager stories are in:
ls docs/stories/sprint5/sprint5-story-*.md

# Stories MUST be done in this order:
# Story 17: sprint5-story-17-purchase-request-creation.md (1.5 days)
# Story 18: sprint5-story-18-admin-approval-workflow.md (1 day)
# Story 19: sprint5-story-19-stock-update-audit-trail.md (1 day)

# RECOMMENDED START: Story 17 (Purchase Request Creation)
# Stories 18 and 19 depend on this
```

---

## 📋 Your Workflow for EACH Story

```
1. Read story file: docs/stories/sprint5/sprint5-story-XX-{name}.md
   → Read ALL acceptance criteria (ACs)
   → Review technical implementation sections
   → Understand backend and frontend requirements

2. Implement feature
   → Backend: Create models, controllers, validation, routes
   → Frontend: Create React components, modals, filtering logic
   → Follow technical patterns from technical-patterns.md

3. Write E2E test scenarios (MARKDOWN, not code)
   → File: docs/qa/e2e/sprint5-story-XX-{name}.md
   → Minimum 1 test case per AC (typically 2-3 per AC)
   → Format: TC 1.1, TC 1.2, TC 1.3, etc.
   → Include: Preconditions, Steps, Expected Results, Screenshots

4. Create quality gate YAML file
   → File: docs/qa/gates/sprint-5-story-XX-{slug}.yml
   → Define pass/fail criteria
   → Include test coverage requirement (>80%)
   → Specify critical ACs
   → Reference E2E test scenarios

5. Update Dev Agent Record section in story file
   → File List: List all files created/modified
   → Change Log: Document your changes
   → Completion Notes: Summary of implementation

6. Set status to "✅ READY FOR QA"

7. HALT - Wait for QA Agent to review
```

---

## 🎯 Sprint 5 Purchase Manager Overview

### Problem Statement
Currently, only Admins can adjust shop inventory. Purchase Managers need a formal workflow to:
- Request inventory replenishment for low-stock items
- Get approval from Admin before purchasing
- Record purchase details and update inventory after approval
- Track purchase history with full audit trails

### Solution: Request-Approval-Update Workflow
```
Purchase Manager creates request
    ↓
Admin approves/rejects
    ↓
Purchase Manager updates stock (after approval)
    ↓
Full audit trail via InventoryTransaction
```

### Architecture Overview
**Dropdown-based UI** in existing `/purchase` page:
```
/purchase page
├── Dropdown: [Machine Repairs ▼] [Shop Inventory ▼]
├── Machine Repairs View (existing - DO NOT MODIFY)
└── Shop Inventory View (NEW - YOU BUILD)
    ├── Purchase requests table
    ├── Role-based action buttons:
    │   ├── Purchase Manager: [+ New Request], [Update Stock]
    │   └── Admin: [Approve], [Reject]
    └── Frontend filtering by user.balagruhaIds
```

---

## 📊 Story Dependencies (CRITICAL - Development Order)

### MUST FOLLOW THIS ORDER:

**1. Story 17: Purchase Request Creation (1.5 days) - START HERE**
```
Creates:
- PurchaseRequest model
- purchaseRequestController (create, getMyRequests, cancel)
- Refactored PurchaseManagement.jsx with dropdown structure
- ShopInventoryView component with frontend filtering
- CreatePurchaseRequestModal

Dependencies: None (foundation story)
```

**2. Story 18: Admin Approval Workflow (1 day) - SECOND**
```
Creates:
- approvePurchaseRequest, rejectPurchaseRequest controllers
- ApproveRequestModal, RejectRequestModal components
- Self-approval prevention validation

Dependencies: Story 17 (needs PurchaseRequest model and UI structure)
```

**3. Story 19: Stock Update & Audit Trail (1 day) - THIRD**
```
Creates:
- completePurchaseRequest controller with atomic transaction
- UpdateStockModal component
- InventoryTransaction integration
- Idempotency checks

Dependencies: Story 18 (needs approval workflow to be complete)
```

---

## 🆕 Key Technical Requirements

### 1. RBAC Approach (MVP - OLD RBAC System)
```javascript
// Frontend filtering by user.balagruhaIds
const filteredRequests = allRequests.filter(request => {
  if (user.role === 'purchase-manager') {
    return user.balagruhaIds.includes(request.balagruhaId) &&
           request.requestedBy._id === user._id;
  }
  return true;  // Admin sees all
});

// Backend validation on write operations
if (req.user.role === 'purchase-manager') {
  if (product.balagruhaId && !req.user.balagruhaIds.includes(product.balagruhaId)) {
    return res.status(403).json({ message: 'No access to this balagruha' });
  }
}
```

**Why this approach?**
- Develop branch uses OLD RBAC (no scope field)
- NEW RBAC in feature/sprint-2 (not merged yet)
- MVP uses frontend filtering with light backend validation
- Designed for easy upgrade when NEW RBAC merges

### 2. Atomic Transactions (Story 19)
```javascript
const session = await mongoose.startSession();
session.startTransaction();

try {
  // Step 1: Update product stock
  product.stock = newStock;
  await product.save({ session });

  // Step 2: Create inventory transaction
  const transaction = new InventoryTransaction({
    transactionType: 'purchase_request',
    reference: { type: 'purchase_request', id: request._id },
    // ... other fields
  });
  await transaction.save({ session });

  // Step 3: Update purchase request
  request.status = 'completed';
  request.inventoryTransactionId = transaction._id;
  await request.save({ session });

  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
  throw error;
}
```

### 3. Idempotency Check (Story 19)
```javascript
// Prevent duplicate stock updates
if (request.inventoryTransactionId) {
  return res.status(400).json({
    success: false,
    message: 'This request has already been completed and stock updated'
  });
}
```

### 4. Self-Approval Prevention (Story 18)
```javascript
// Cannot approve own request
if (request.requestedBy.toString() === adminId.toString()) {
  return res.status(403).json({
    success: false,
    message: 'Cannot approve your own request. Another admin must approve.'
  });
}
```

---

## 📖 File Structure Reference

```
docs/epics/sprint5/
└── sprint5-epic-05-purchase-manager-workflow.md  # Epic document

docs/stories/sprint5/
├── sprint5-story-17-purchase-request-creation.md
├── sprint5-story-18-admin-approval-workflow.md
└── sprint5-story-19-stock-update-audit-trail.md

docs/qa/
├── e2e/
│   └── sprint5-story-XX-{name}.md     # E2E test scenarios YOU write
└── gates/
    └── sprint-5-story-XX-{slug}.yml   # Quality gate YOU create

backend/
├── models/
│   └── PurchaseRequest.js             # YOU CREATE (Story 17)
├── controllers/
│   └── shop/admin/
│       └── purchaseRequestController.js  # YOU CREATE (Story 17)
├── middleware/
│   └── purchaseRequestValidation.js   # YOU CREATE (Story 17)
└── routes/v2/shop/admin/
    └── purchaseRequests.js            # YOU CREATE (Story 17)

frontend/src/
├── components/purchaseManagement/
│   ├── PurchaseManagement.jsx         # YOU REFACTOR (Story 17)
│   ├── views/
│   │   ├── MachineRepairsView.jsx     # YOU EXTRACT (Story 17)
│   │   └── ShopInventoryView.jsx      # YOU CREATE (Story 17)
│   ├── modals/
│   │   ├── CreatePurchaseRequestModal.jsx   # YOU CREATE (Story 17)
│   │   ├── ApproveRequestModal.jsx          # YOU CREATE (Story 18)
│   │   ├── RejectRequestModal.jsx           # YOU CREATE (Story 18)
│   │   └── UpdateStockModal.jsx             # YOU CREATE (Story 19)
│   └── components/
│       ├── SharedFilters.jsx          # YOU CREATE (Story 17)
│       ├── PurchaseRequestCard.jsx    # YOU CREATE (Story 17)
│       └── StatusBadge.jsx            # YOU CREATE (Story 17)
└── api.js                             # YOU UPDATE (add API calls)
```

---

## ⚠️ Critical Rules (Must Follow!)

### Brownfield Approach
```
✅ DO: Build on develop branch (production code)
✅ DO: Use /api/v2/shop/admin/ namespace for new endpoints
✅ DO: Reference existing ShopItem, InventoryTransaction models
✅ DO: Integrate into existing /purchase page (dropdown approach)
❌ DON'T: Modify existing machine repair purchase code
❌ DON'T: Change existing Sprint 5 Shop inventory code
❌ DON'T: Create new standalone page (integrate into existing)
```

### Testing
```
✅ DO: Write E2E test scenarios (markdown)
✅ DO: Create quality gate YAML file
✅ DO: One test case per AC minimum
✅ DO: Test role-based access (Purchase Manager vs Admin)
✅ DO: Test frontend filtering behavior
❌ DON'T: Write .spec.js test code
❌ DON'T: Run npx playwright test
```

### Workflow
```
✅ DO: Stories in sequential order (17 → 18 → 19)
✅ DO: HALT after "READY FOR QA"
✅ DO: Use OLD RBAC approach (frontend filtering)
✅ DO: Add backend validation on writes
❌ DON'T: Start next story before current is DONE
❌ DON'T: Skip atomic transactions for stock updates
❌ DON'T: Allow self-approval of requests
```

---

## 🔧 Common Patterns (Copy-Paste Ready)

### MongoDB PurchaseRequest Model
```javascript
const purchaseRequestSchema = new mongoose.Schema({
  requestId: { type: String, required: true, unique: true },

  // Product Info
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShopItem', required: true },
  productName: String,
  productSKU: String,
  requestedQuantity: { type: Number, required: true },
  currentStock: Number,
  lowStockThreshold: Number,

  // Request Info
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  balagruhaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Balagruha', required: true },
  reason: { type: String, required: true, maxlength: 200 },
  justification: { type: String, maxlength: 500 },

  // Status
  status: {
    type: String,
    enum: ['pending_approval', 'approved', 'rejected', 'completed', 'cancelled'],
    default: 'pending_approval'
  },

  // Approval
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviewedAt: Date,
  reviewNotes: String,

  // Purchase (filled after approval)
  supplierName: String,
  invoiceNumber: String,
  purchaseDate: Date,
  actualCost: Number,
  receivedQuantity: Number,

  // Completion
  completedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  completedAt: Date,
  inventoryTransactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryTransaction' }
}, { timestamps: true });
```

### React Component with Frontend Filtering
```jsx
import React, { useState, useEffect } from 'react';
import { getPurchaseRequests } from '../../api';
import { useAuth } from '../../contexts/AuthContext';

const ShopInventoryView = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    // Frontend filtering by user role and balagruhaIds
    const filtered = requests.filter(request => {
      if (user.role === 'purchase-manager') {
        return user.balagruhaIds.includes(request.balagruhaId) &&
               request.requestedBy._id === user._id;
      }
      return true;  // Admin sees all
    });
    setFilteredRequests(filtered);
  }, [requests, user]);

  const fetchRequests = async () => {
    try {
      const data = await getPurchaseRequests();
      setRequests(data);
    } catch (error) {
      console.error('Failed to load requests:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Shop Inventory Purchase Requests</h1>
      {/* Component content */}
    </div>
  );
};

export default ShopInventoryView;
```

### Controller with Backend Validation
```javascript
exports.createPurchaseRequest = async (req, res) => {
  try {
    const { productId, requestedQuantity, reason, justification } = req.body;
    const userId = req.user._id;

    // Get product
    const product = await ShopItem.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Backend validation: Check balagruha access
    if (req.user.role === 'purchase-manager') {
      if (product.balagruhaId && !req.user.balagruhaIds.includes(product.balagruhaId.toString())) {
        return res.status(403).json({ success: false, message: 'No access to this balagruha' });
      }
    }

    // Generate requestId
    const requestId = await generateRequestId();

    // Create purchase request
    const purchaseRequest = new PurchaseRequest({
      requestId,
      productId,
      productName: product.name,
      productSKU: product.sku,
      requestedQuantity,
      currentStock: product.stock,
      lowStockThreshold: product.lowStockThreshold,
      requestedBy: userId,
      balagruhaId: product.balagruhaId,
      reason,
      justification,
      status: 'pending_approval'
    });

    await purchaseRequest.save();

    return res.status(201).json({ success: true, data: purchaseRequest });
  } catch (error) {
    console.error('Error creating purchase request:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
```

---

## 📝 Example: Complete Story Workflow

**Story:** Story 17 - Purchase Request Creation

### 1. Read Story
```bash
cat docs/stories/sprint5/sprint5-story-17-purchase-request-creation.md
# Read all 7 acceptance criteria
# Review backend implementation section
# Review frontend implementation section
# Study technical details
```

### 2. Implement
```bash
# Backend
touch backend/models/PurchaseRequest.js
touch backend/controllers/shop/admin/purchaseRequestController.js
touch backend/middleware/purchaseRequestValidation.js
touch backend/routes/v2/shop/admin/purchaseRequests.js

# Frontend
# Refactor existing file: frontend/src/components/purchaseManagement/PurchaseManagement.jsx
touch frontend/src/components/purchaseManagement/views/MachineRepairsView.jsx
touch frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx
touch frontend/src/components/purchaseManagement/modals/CreatePurchaseRequestModal.jsx
touch frontend/src/components/purchaseManagement/components/SharedFilters.jsx
touch frontend/src/components/purchaseManagement/components/PurchaseRequestCard.jsx
touch frontend/src/components/purchaseManagement/components/StatusBadge.jsx

# Update API service
# Modify: frontend/src/api.js (add API calls)
```

### 3. Write E2E Test Scenarios
```bash
# Create: docs/qa/e2e/sprint5-story-17-purchase-request-creation.md
# Include 7+ test cases (1 per AC minimum)
# Format: TC 1.1, TC 1.2, etc.
# Each test case: Preconditions, Steps, Expected Results, Screenshots
```

### 4. Create Quality Gate YAML
```bash
# Create: docs/qa/gates/sprint-5-story-17-purchase-request-creation.yml
# Define critical ACs: [1, 2, 3, 4, 5]
# Set test coverage: 80%
# Map all ACs to test cases
```

### 5. Update Story File
```markdown
## Dev Agent Record

### Files Created/Modified
- backend/models/PurchaseRequest.js
- backend/controllers/shop/admin/purchaseRequestController.js
- frontend/src/components/purchaseManagement/PurchaseManagement.jsx (refactored)
- frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx
- docs/qa/e2e/sprint5-story-17-purchase-request-creation.md
- docs/qa/gates/sprint-5-story-17-purchase-request-creation.yml

### Change Log
- Created PurchaseRequest MongoDB schema with auto-generated requestId
- Implemented purchase request creation API endpoints
- Refactored PurchaseManagement.jsx to dropdown structure
- Built ShopInventoryView component with frontend filtering
- Wrote 8 E2E test scenarios covering all ACs
- Created quality gate YAML with 80% coverage requirement

### Completion Notes
All 7 acceptance criteria implemented. Purchase request creation workflow complete with frontend filtering by user.balagruhaIds.

## Status
✅ READY FOR QA

**Last Updated:** 2025-10-29 16:45:00 (via `date '+%Y-%m-%d %H:%M:%S'`)
**Updated By:** Dev Agent (James)
```

---

## 🆘 Need Help?

### Quick References (Already Loaded)
- `.ai/developer-onboarding-guide.md` - General workflow
- `.ai/workflow-quick-reference.md` - BMAD rules

### Sprint 5 Specific (Read These!)
- `.ai/sprint-5-purchase-manager/sprint-5-overview.md` - Architecture & workflow
- `.ai/sprint-5-purchase-manager/technical-patterns.md` - Code patterns
- `docs/epics/sprint5/sprint5-epic-05-purchase-manager-workflow.md` - Epic details

### Story Documentation
- `docs/stories/sprint5/` - Story requirements (17, 18, 19)

---

## ✅ Pre-Flight Checklist

Before starting your first story:

```
□ Read sprint-5-overview.md (10 min)
□ Read technical-patterns.md (10 min)
□ Read Epic 05 document (5 min)
□ Understand Request-Approval-Update workflow
□ Understand OLD RBAC approach (frontend filtering)
□ Know atomic transactions required for stock updates
□ Know to prevent self-approval
□ Servers running (backend:5001, frontend:3000)
□ Git on sprint5/purchase-manager branch
□ Ready to start with Story 17
```

---

## 🎯 Success Criteria

You're successful when:
1. Story fully implements all ACs
2. E2E test scenarios written (markdown, 1+ per AC)
3. Quality gate YAML file created with criteria
4. Frontend filtering works correctly (Purchase Manager sees only own requests)
5. Backend validation prevents unauthorized access
6. Atomic transactions used for stock updates (Story 19)
7. Self-approval prevented (Story 18)
8. Dev Agent Record updated with timestamp
9. Status set to "READY FOR QA"

---

**Now activate your Dev agent and start with Story 17!**

```bash
# Transform to Dev Agent
/transform dev

# Or if using CLI:
claude --agent dev
```

**Good luck! 🚀**

---

**Version:** 1.0
**Created:** 2025-10-29 16:44:54
**For:** Sprint 5 Purchase Manager Developer Onboarding
