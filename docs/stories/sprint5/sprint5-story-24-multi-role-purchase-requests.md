# Story 24: Multi-Role Purchase Request Creation with Approval Thresholds

**Story ID:** Sprint5-Story-24
**Epic:** [Sprint5-Epic-05 (Purchase Manager Workflow)](../../epics/sprint5/sprint5-epic-05-purchase-manager-workflow.md)
**Priority:** High
**Status:** Draft
**Estimate:** 2 days
**Created:** 2025-11-06 14:05:17
**Last Updated:** 2025-11-06 14:05:17

---

## User Story

**As a** Coach, Medical Incharge, or Admin
**I want to** create purchase requests for items needed at my assigned Balagruha(s)
**So that** I can initiate the procurement process without relying solely on the Purchase Manager

---

## Context

This story **extends purchase request creation access** to multiple roles based on client feedback. Currently, only the Purchase Manager role can create purchase requests. This creates bottlenecks and inefficiencies in the procurement workflow.

### Client Feedback (Tony):
> "Allow Coach, Medical Incharge, and Admin to create purchase requests. Currently only Purchase Manager can do this."

### Key Requirements from Client Clarifications:

**1. Multi-Role Access:**
- **Current**: Only Purchase Manager can create purchase requests
- **New**: Coach, Medical Incharge, Admin, and Purchase Manager can all create requests

**2. Approval Workflow with Thresholds:**
- **Small Purchases** (≤ Rs 1,000/item **AND** ≤ Rs 25,000 total order):
  - Skip Admin approval step
  - Go directly to Purchase Manager for fulfillment
  - Status flow: `pending_fulfillment` (yellow) → `fulfilled` (green)

- **Large Purchases** (> Rs 1,000/item **OR** > Rs 25,000 total order):
  - Require Admin approval first
  - Then proceed to Purchase Manager for fulfillment
  - Status flow: `pending_approval` (orange) → `approved` (blue) → `fulfilled` (green)

**3. Visibility and Filtering:**
- **Requests filtered by user's assigned Balagruhas**: Users only see requests for Balagruhas they're assigned to
- **STOCK requests visible to ALL**: Regardless of Balagruha assignment (from Story 21)
- **Purchase Manager sees all assigned**: PMs see all requests for their assigned Balagruhas

**4. Simplicity Requirement:**
- **No role-based approval workflows**: Don't over-complicate with different approval chains per role
- **Single workflow for all**: Same approval logic applies regardless of who creates the request

---

## Acceptance Criteria

### AC1: Multi-Role Access to Purchase Request Creation

- ✅ **Coach** role can access "Create Purchase Request" button in their dashboard
- ✅ **Medical Incharge** role can access "Create Purchase Request" button
- ✅ **Admin** role can access "Create Purchase Request" button
- ✅ **Purchase Manager** role retains existing access (no regression)
- ✅ Button appears in appropriate location for each role:
  - Coach: In Inventory or Dashboard view
  - Medical Incharge: In Inventory or Dashboard view
  - Admin: In Purchase Requests admin panel
  - Purchase Manager: In Purchase Manager view (existing)
- ✅ Users without these roles do NOT see the button (e.g., regular staff)

### AC2: Balagruha Dropdown Filtered by User Assignment

- ✅ Balagruha dropdown shows ONLY Balagruhas assigned to the current user
- ✅ "STOCK" option always available (regardless of Balagruha assignment)
- ✅ Example:
  - Coach assigned to Balagruha 1 sees: [STOCK, Balagruha 1]
  - Coach assigned to Balagruha 1 and 2 sees: [STOCK, Balagruha 1, Balagruha 2]
  - Admin assigned to all Balagruhas sees: [STOCK, Balagruha 1, Balagruha 2, ...]
- ✅ User cannot select Balagruhas they're not assigned to
- ✅ If user has no Balagruha assignments, only STOCK option is available

### AC3: Automatic Status Assignment Based on Thresholds

**Backend Logic:**

- ✅ When purchase request is created, backend calculates:
  ```javascript
  const maxItemCost = Math.max(...items.map(i => i.estimatedUnitCost));
  const totalOrderCost = items.reduce((sum, i) => sum + i.estimatedTotalCost, 0);

  const isSmallPurchase = (maxItemCost <= 1000) && (totalOrderCost <= 25000);

  const initialStatus = isSmallPurchase ? 'pending_fulfillment' : 'pending_approval';
  ```

- ✅ Small purchase status: `'pending_fulfillment'`
  - Badge color: Yellow/Orange
  - Next step: Purchase Manager fulfillment
  - No admin approval required

- ✅ Large purchase status: `'pending_approval'`
  - Badge color: Red/Orange
  - Next step: Admin approval
  - Requires admin to approve before fulfillment

- ✅ Status stored in database with request
- ✅ Status cannot be manually overridden by user (automatic calculation only)

### AC4: Small Purchase Workflow (Direct to Fulfillment)

**Workflow for Small Purchases:**
1. User creates request (any role)
2. Backend calculates: ≤ Rs 1,000/item AND ≤ Rs 25,000 total
3. Status set to: `'pending_fulfillment'`
4. Admin does NOT see this request in "Pending Approval" queue
5. Purchase Manager sees request in "Pending Fulfillment" queue
6. Purchase Manager fulfills request
7. Status changes to: `'fulfilled'`

**UI Display:**
- ✅ Badge shows "Pending Fulfillment" (yellow/orange color)
- ✅ Tooltip explains: "This request is under the approval threshold and can be fulfilled directly by the Purchase Manager"
- ✅ Request visible to Purchase Manager immediately (no waiting for admin)

### AC5: Large Purchase Workflow (Admin Approval Required)

**Workflow for Large Purchases:**
1. User creates request (any role)
2. Backend calculates: > Rs 1,000/item OR > Rs 25,000 total
3. Status set to: `'pending_approval'`
4. Admin sees request in "Pending Approval" queue
5. Admin reviews and approves request
6. Status changes to: `'approved'`
7. Purchase Manager sees request in "Approved" queue
8. Purchase Manager fulfills request
9. Status changes to: `'fulfilled'`

**UI Display:**
- ✅ Badge shows "Pending Approval" (red/orange color)
- ✅ Tooltip explains: "This request exceeds the approval threshold (Rs 1,000/item or Rs 25,000 total) and requires admin approval"
- ✅ Threshold values displayed in request details:
  ```
  Max Item Cost: Rs 1,500 (Threshold: Rs 1,000)
  Total Order Cost: Rs 30,000 (Threshold: Rs 25,000)
  Status: Pending Admin Approval
  ```

### AC6: Purchase Request List Filtering by User Role

- ✅ **Coach/Medical/Admin (Non-PM users)**:
  - See requests they created
  - See requests for their assigned Balagruhas (created by others)
  - See all STOCK requests (regardless of who created)
  - Cannot see requests for Balagruhas they're not assigned to

- ✅ **Purchase Manager**:
  - See all requests for their assigned Balagruhas
  - See requests in "pending_fulfillment" and "approved" status (ready for fulfillment)
  - See all STOCK requests
  - Cannot see requests for Balagruhas they're not assigned to

- ✅ **Admin**:
  - See all requests requiring approval ("pending_approval" status)
  - See all requests they've approved
  - See requests for their assigned Balagruhas
  - See all STOCK requests

### AC7: Status Badge Updates and Colors

**New Status Values:**

| Status | Display Text | Badge Color | Who Sees It | Next Action |
|--------|--------------|-------------|-------------|-------------|
| `pending_approval` | Pending Approval | Red/Orange (#ff9800) | Admin | Admin approval |
| `pending_fulfillment` | Pending Fulfillment | Yellow (#fbc02d) | Purchase Manager | PM fulfillment |
| `approved` | Approved | Blue (#2196f3) | Purchase Manager | PM fulfillment |
| `fulfilled` | Fulfilled | Green (#4caf50) | All | Complete |
| `rejected` | Rejected | Red (#f44336) | All | Complete (rejected) |

- ✅ Status badge component updated with new status values
- ✅ Color mapping updated in `getStatusColor()` function
- ✅ Tooltips explain threshold logic for each status

### AC8: Request Details Show Threshold Calculation

- ✅ Request details modal/page includes "Approval Threshold" section
- ✅ Display format:
  ```
  Approval Threshold Analysis:
  ────────────────────────────────
  Max Item Cost:       Rs 1,500 (Threshold: Rs 1,000) ❌ Exceeds
  Total Order Cost:    Rs 15,000 (Threshold: Rs 25,000) ✅ Within

  Result: Admin approval required (exceeds item cost threshold)
  ```

- ✅ Visual indicators:
  - ✅ Green checkmark if within threshold
  - ❌ Red X if exceeds threshold
- ✅ Clear explanation of why admin approval is/isn't required

---

## Technical Requirements

### Backend Implementation

#### 1. Update User Model (Add Role Check Helper)

**File:** `backend/models/User.js`

**Add Helper Method:**
```javascript
// Add to User schema methods
userSchema.methods.canCreatePurchaseRequest = function() {
  const allowedRoles = ['coach', 'medical_incharge', 'admin', 'purchase_manager'];
  return allowedRoles.includes(this.role.toLowerCase());
};

module.exports = mongoose.model('User', userSchema);
```

#### 2. Update PurchaseRequest Controller - Create Function

**File:** `backend/controllers/purchaseRequestController.js`

**Updated createPurchaseRequest:**
```javascript
exports.createPurchaseRequest = async (req, res) => {
  try {
    const { balagruhaId, category, reason, items, attachments } = req.body;
    const userId = req.user.id;

    // 1. Role-based access control
    const user = await User.findById(userId);
    if (!user.canCreatePurchaseRequest()) {
      return res.status(403).json({
        error: 'You do not have permission to create purchase requests'
      });
    }

    // 2. Validate balagruhaId
    if (!balagruhaId) {
      return res.status(400).json({ error: 'Balagruha or STOCK selection is required' });
    }

    // 3. If not STOCK, verify user is assigned to the Balagruha
    if (balagruhaId !== 'STOCK') {
      const userBalagruhas = user.assignedBalagruhas.map(b => b.toString());

      if (!userBalagruhas.includes(balagruhaId)) {
        return res.status(403).json({
          error: 'You can only create requests for Balagruhas you are assigned to'
        });
      }

      // Verify Balagruha exists
      const balagruha = await Balagruha.findById(balagruhaId);
      if (!balagruha) {
        return res.status(404).json({ error: 'Balagruha not found' });
      }
    }

    // 4. Validate category, reason, items
    if (!category || !reason || !items || items.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 5. Calculate approval threshold
    const maxItemCost = Math.max(...items.map(item => item.estimatedUnitCost));
    const totalOrderCost = items.reduce((sum, item) => sum + item.estimatedTotalCost, 0);

    const ITEM_THRESHOLD = 1000; // Rs 1,000 per item
    const ORDER_THRESHOLD = 25000; // Rs 25,000 total order

    const isSmallPurchase = (maxItemCost <= ITEM_THRESHOLD) && (totalOrderCost <= ORDER_THRESHOLD);

    // 6. Set initial status based on threshold
    const initialStatus = isSmallPurchase ? 'pending_fulfillment' : 'pending_approval';

    // 7. Create purchase request
    const newRequest = new PurchaseRequest({
      balagruhaId,
      category,
      reason,
      items,
      attachments,
      createdBy: userId,
      status: initialStatus,
      thresholdAnalysis: {
        maxItemCost,
        totalOrderCost,
        itemThreshold: ITEM_THRESHOLD,
        orderThreshold: ORDER_THRESHOLD,
        requiresApproval: !isSmallPurchase
      }
    });

    await newRequest.save();

    // 8. Populate and return
    await newRequest.populate('balagruhaId', 'name location');
    await newRequest.populate('createdBy', 'username role');
    await newRequest.populate('items.productId', 'name sku');

    res.status(201).json(newRequest);
  } catch (error) {
    console.error('Error creating purchase request:', error);
    res.status(500).json({ error: error.message });
  }
};
```

#### 3. Update PurchaseRequest Model Schema

**File:** `backend/models/PurchaseRequest.js`

**Add New Fields:**
```javascript
const purchaseRequestSchema = new mongoose.Schema({
  // ... existing fields ...

  status: {
    type: String,
    required: true,
    enum: ['pending_approval', 'pending_fulfillment', 'approved', 'fulfilled', 'rejected'],
    default: 'pending_approval'
  },

  // NEW: Threshold analysis data
  thresholdAnalysis: {
    maxItemCost: Number,
    totalOrderCost: Number,
    itemThreshold: { type: Number, default: 1000 },
    orderThreshold: { type: Number, default: 25000 },
    requiresApproval: { type: Boolean, default: true }
  },

  // ... rest of schema ...
}, { timestamps: true });
```

#### 4. Update Get Requests Endpoint with Role-Based Filtering

**File:** `backend/controllers/purchaseRequestController.js`

**Updated getPurchaseRequests:**
```javascript
exports.getPurchaseRequests = async (req, res) => {
  try {
    const { status, balagruhaId, category, startDate, endDate } = req.query;
    const userId = req.user.id;

    const user = await User.findById(userId).populate('assignedBalagruhas');

    const filter = {};

    // 1. Status filter
    if (status && status !== 'all') {
      filter.status = status;
    }

    // 2. Role-based filtering
    const userRole = user.role.toLowerCase();

    if (userRole === 'admin') {
      // Admin sees:
      // - All pending_approval requests (for review)
      // - All requests for their assigned Balagruhas
      // - All STOCK requests
      if (!status || status === 'all') {
        // Show all requests for assigned Balagruhas + pending_approval + STOCK
        const userBalagruhaIds = user.assignedBalagruhas.map(b => b._id.toString());
        filter.$or = [
          { status: 'pending_approval' },
          { balagruhaId: { $in: [...userBalagruhaIds, 'STOCK'] } }
        ];
      } else {
        const userBalagruhaIds = user.assignedBalagruhas.map(b => b._id.toString());
        filter.balagruhaId = { $in: [...userBalagruhaIds, 'STOCK'] };
      }
    } else if (userRole === 'purchase_manager') {
      // PM sees:
      // - All pending_fulfillment and approved requests (ready for fulfillment)
      // - All requests for their assigned Balagruhas
      // - All STOCK requests
      const userBalagruhaIds = user.assignedBalagruhas.map(b => b._id.toString());

      if (!status || status === 'all') {
        filter.$or = [
          { status: { $in: ['pending_fulfillment', 'approved'] } },
          { balagruhaId: { $in: [...userBalagruhaIds, 'STOCK'] } }
        ];
      } else {
        filter.balagruhaId = { $in: [...userBalagruhaIds, 'STOCK'] };
      }
    } else {
      // Coach, Medical Incharge see:
      // - Requests they created
      // - Requests for their assigned Balagruhas
      // - All STOCK requests
      const userBalagruhaIds = user.assignedBalagruhas.map(b => b._id.toString());
      filter.$or = [
        { createdBy: userId },
        { balagruhaId: { $in: [...userBalagruhaIds, 'STOCK'] } }
      ];
    }

    // 3. Balagruha filter (if specified)
    if (balagruhaId && balagruhaId !== 'all') {
      if (balagruhaId === 'STOCK') {
        filter.balagruhaId = 'STOCK';
        delete filter.$or; // Override $or filter
      } else {
        const userBalagruhaIds = user.assignedBalagruhas.map(b => b._id.toString());
        if (!userBalagruhaIds.includes(balagruhaId)) {
          return res.status(403).json({
            error: 'You cannot view requests for Balagruhas you are not assigned to'
          });
        }
        filter.balagruhaId = balagruhaId;
        delete filter.$or;
      }
    }

    // 4. Category filter
    if (category && category !== 'All Categories') {
      filter.category = category;
    }

    // 5. Date filter
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = getStartOfDay(startDate);
      if (endDate) filter.createdAt.$lte = getEndOfDay(endDate);
    }

    console.log('Filter applied:', JSON.stringify(filter, null, 2));

    // 6. Fetch requests
    const requests = await PurchaseRequest.find(filter)
      .populate('createdBy', 'username role')
      .populate('items.productId', 'name sku')
      .sort({ createdAt: -1 });

    // 7. Manual populate for Balagruha (skip if STOCK)
    for (let request of requests) {
      if (request.balagruhaId !== 'STOCK') {
        await request.populate('balagruhaId', 'name location');
      }
    }

    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching purchase requests:', error);
    res.status(500).json({ error: error.message });
  }
};
```

#### 5. Add Balagruha Filtering Endpoint

**File:** `backend/routes/userRoutes.js`

**New Endpoint:**
```javascript
// GET /api/users/me/balagruhas - Get current user's assigned Balagruhas
router.get('/me/balagruhas', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('assignedBalagruhas', 'name location');

    const balagruhas = [
      { _id: 'STOCK', name: 'STOCK', isStock: true },
      ...user.assignedBalagruhas.map(b => ({ ...b.toObject(), isStock: false }))
    ];

    res.status(200).json(balagruhas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

---

### Frontend Implementation

#### 1. Add "Create Purchase Request" Button to Multiple Views

**Files to Update:**
- `frontend/src/views/CoachDashboard.jsx`
- `frontend/src/views/MedicalInchargeDashboard.jsx`
- `frontend/src/views/AdminDashboard.jsx`

**Example (CoachDashboard.jsx):**
```jsx
import { useState } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreatePurchaseRequestModal from '../components/CreatePurchaseRequestModal';

const CoachDashboard = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <Box>
      {/* ... existing dashboard content ... */}

      {/* NEW: Create Purchase Request Button */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenCreateModal(true)}
        >
          Create Purchase Request
        </Button>
      </Box>

      {/* ... rest of dashboard ... */}

      {/* Create Purchase Request Modal */}
      <CreatePurchaseRequestModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onSuccess={() => {
          setOpenCreateModal(false);
          // Refresh data if needed
        }}
      />
    </Box>
  );
};
```

#### 2. Update CreatePurchaseRequestModal - Fetch User's Balagruhas

**File:** `frontend/src/components/CreatePurchaseRequestModal.jsx`

**Fetch User-Specific Balagruhas:**
```javascript
const [balagruhaOptions, setBalagruhaOptions] = useState([]);

useEffect(() => {
  const fetchUserBalagruhas = async () => {
    try {
      // NEW: Fetch only user's assigned Balagruhas
      const response = await axios.get('/api/users/me/balagruhas');
      setBalagruhaOptions(response.data);
    } catch (error) {
      toast.error('Failed to load Balagruhas');
    }
  };

  if (open) {
    fetchUserBalagruhas();
  }
}, [open]);
```

#### 3. Update Status Badge Component

**File:** `frontend/src/components/StatusBadge.jsx` (or in parent component)

**Updated getStatusColor Function:**
```javascript
const getStatusColor = (status) => {
  switch (status) {
    case 'pending_approval':
      return 'warning'; // Orange/Red
    case 'pending_fulfillment':
      return 'info'; // Yellow/Blue
    case 'approved':
      return 'primary'; // Blue
    case 'fulfilled':
      return 'success'; // Green
    case 'rejected':
      return 'error'; // Red
    default:
      return 'default';
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case 'pending_approval':
      return 'Pending Approval';
    case 'pending_fulfillment':
      return 'Pending Fulfillment';
    case 'approved':
      return 'Approved';
    case 'fulfilled':
      return 'Fulfilled';
    case 'rejected':
      return 'Rejected';
    default:
      return status;
  }
};
```

**Status Badge with Tooltip:**
```jsx
<Tooltip
  title={getStatusTooltip(request.status, request.thresholdAnalysis)}
  arrow
>
  <Chip
    label={getStatusLabel(request.status)}
    color={getStatusColor(request.status)}
    size="small"
  />
</Tooltip>
```

**Tooltip Helper:**
```javascript
const getStatusTooltip = (status, threshold) => {
  if (!threshold) return '';

  if (status === 'pending_fulfillment') {
    return `This request is under the approval threshold (≤ Rs ${threshold.itemThreshold}/item and ≤ Rs ${threshold.orderThreshold} total) and can be fulfilled directly.`;
  }

  if (status === 'pending_approval') {
    const reasons = [];
    if (threshold.maxItemCost > threshold.itemThreshold) {
      reasons.push(`Max item cost Rs ${threshold.maxItemCost} exceeds threshold Rs ${threshold.itemThreshold}`);
    }
    if (threshold.totalOrderCost > threshold.orderThreshold) {
      reasons.push(`Total cost Rs ${threshold.totalOrderCost} exceeds threshold Rs ${threshold.orderThreshold}`);
    }
    return `Admin approval required: ${reasons.join(', ')}`;
  }

  return '';
};
```

#### 4. Add Threshold Analysis Section to Request Details

**File:** `frontend/src/components/PurchaseRequestDetailsModal.jsx`

**Add Threshold Analysis Display:**
```jsx
{/* Threshold Analysis Section */}
{request.thresholdAnalysis && (
  <Box sx={{ mb: 3, p: 2, backgroundColor: 'grey.100', borderRadius: 1 }}>
    <Typography variant="h6" gutterBottom>
      Approval Threshold Analysis
    </Typography>
    <Divider sx={{ mb: 2 }} />

    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {request.thresholdAnalysis.maxItemCost <= request.thresholdAnalysis.itemThreshold ? (
            <CheckCircleIcon color="success" />
          ) : (
            <CancelIcon color="error" />
          )}
          <Box>
            <Typography variant="body2" color="text.secondary">
              Max Item Cost
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              ₹{request.thresholdAnalysis.maxItemCost.toLocaleString()}
              <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                (Threshold: ₹{request.thresholdAnalysis.itemThreshold.toLocaleString()})
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {request.thresholdAnalysis.totalOrderCost <= request.thresholdAnalysis.orderThreshold ? (
            <CheckCircleIcon color="success" />
          ) : (
            <CancelIcon color="error" />
          )}
          <Box>
            <Typography variant="body2" color="text.secondary">
              Total Order Cost
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              ₹{request.thresholdAnalysis.totalOrderCost.toLocaleString()}
              <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                (Threshold: ₹{request.thresholdAnalysis.orderThreshold.toLocaleString()})
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Alert
          severity={request.thresholdAnalysis.requiresApproval ? 'warning' : 'success'}
          sx={{ mt: 1 }}
        >
          {request.thresholdAnalysis.requiresApproval
            ? 'Admin approval required (exceeds threshold)'
            : 'No admin approval required (within threshold)'}
        </Alert>
      </Grid>
    </Grid>
  </Box>
)}
```

#### 5. Update Purchase Request List Views

**File:** `frontend/src/views/PurchaseManagerView.jsx` (and other role views)

**Status Filter Updated:**
```jsx
<FormControl sx={{ minWidth: 200 }}>
  <InputLabel>Status</InputLabel>
  <Select
    value={filters.status}
    label="Status"
    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
  >
    <MenuItem value="all">All Statuses</MenuItem>
    <MenuItem value="pending_approval">Pending Approval</MenuItem>
    <MenuItem value="pending_fulfillment">Pending Fulfillment</MenuItem>
    <MenuItem value="approved">Approved</MenuItem>
    <MenuItem value="fulfilled">Fulfilled</MenuItem>
    <MenuItem value="rejected">Rejected</MenuItem>
  </Select>
</FormControl>
```

---

## Implementation Notes

### Threshold Constants Configuration
- **Current**: Hardcoded in controller (Rs 1,000 / Rs 25,000)
- **Future Enhancement**: Move to environment variables or database configuration
- **Example**:
  ```javascript
  const ITEM_THRESHOLD = process.env.PURCHASE_ITEM_THRESHOLD || 1000;
  const ORDER_THRESHOLD = process.env.PURCHASE_ORDER_THRESHOLD || 25000;
  ```

### Role-Based Access Control (RBAC)
- Middleware checks user role before allowing purchase request creation
- Frontend also hides/shows buttons based on user role
- Backend validation is primary security layer (frontend is convenience)

### Approval Workflow Simplicity
- Single workflow for all roles (no complex role-based chains)
- Binary decision: Admin approval required or not (based on threshold)
- Purchase Manager always handles fulfillment (final step)

### Testing Focus
- **Multi-role access**: Verify each role can create requests
- **Threshold logic**: Test boundary conditions (exactly Rs 1,000, Rs 25,000)
- **Filtering**: Verify users only see appropriate requests
- **Permissions**: Verify users cannot create requests for unassigned Balagruhas

---

## Testing Strategy

### Unit Tests

#### Backend Tests
**File:** `backend/tests/unit/purchaseRequest-threshold.test.js`

```javascript
describe('Purchase Request Threshold Logic', () => {
  test('Should set status to pending_fulfillment for small purchase', () => {
    const items = [
      { estimatedUnitCost: 500, estimatedTotalCost: 5000 },
      { estimatedUnitCost: 800, estimatedTotalCost: 8000 }
    ];

    const maxItemCost = Math.max(...items.map(i => i.estimatedUnitCost)); // 800
    const totalCost = items.reduce((sum, i) => sum + i.estimatedTotalCost, 0); // 13000

    const isSmall = (maxItemCost <= 1000) && (totalCost <= 25000);
    expect(isSmall).toBe(true);

    const status = isSmall ? 'pending_fulfillment' : 'pending_approval';
    expect(status).toBe('pending_fulfillment');
  });

  test('Should set status to pending_approval if item cost exceeds threshold', () => {
    const items = [
      { estimatedUnitCost: 1500, estimatedTotalCost: 15000 }
    ];

    const maxItemCost = Math.max(...items.map(i => i.estimatedUnitCost)); // 1500
    const totalCost = items.reduce((sum, i) => sum + i.estimatedTotalCost, 0); // 15000

    const isSmall = (maxItemCost <= 1000) && (totalCost <= 25000);
    expect(isSmall).toBe(false); // Item cost exceeds

    const status = isSmall ? 'pending_fulfillment' : 'pending_approval';
    expect(status).toBe('pending_approval');
  });

  test('Should set status to pending_approval if total cost exceeds threshold', () => {
    const items = [
      { estimatedUnitCost: 500, estimatedTotalCost: 15000 },
      { estimatedUnitCost: 600, estimatedTotalCost: 12000 }
    ];

    const maxItemCost = Math.max(...items.map(i => i.estimatedUnitCost)); // 600
    const totalCost = items.reduce((sum, i) => sum + i.estimatedTotalCost, 0); // 27000

    const isSmall = (maxItemCost <= 1000) && (totalCost <= 25000);
    expect(isSmall).toBe(false); // Total cost exceeds

    const status = isSmall ? 'pending_fulfillment' : 'pending_approval';
    expect(status).toBe('pending_approval');
  });

  test('Boundary: Exactly Rs 1000/item and Rs 25000 total should be small purchase', () => {
    const items = [
      { estimatedUnitCost: 1000, estimatedTotalCost: 25000 }
    ];

    const maxItemCost = 1000;
    const totalCost = 25000;

    const isSmall = (maxItemCost <= 1000) && (totalCost <= 25000);
    expect(isSmall).toBe(true); // Exactly at threshold = small purchase
  });

  test('Boundary: Rs 1001/item should require approval', () => {
    const items = [
      { estimatedUnitCost: 1001, estimatedTotalCost: 1001 }
    ];

    const maxItemCost = 1001;
    const totalCost = 1001;

    const isSmall = (maxItemCost <= 1000) && (totalCost <= 25000);
    expect(isSmall).toBe(false); // Just over item threshold
  });

  test('Boundary: Rs 25001 total should require approval', () => {
    const items = [
      { estimatedUnitCost: 500, estimatedTotalCost: 25001 }
    ];

    const maxItemCost = 500;
    const totalCost = 25001;

    const isSmall = (maxItemCost <= 1000) && (totalCost <= 25000);
    expect(isSmall).toBe(false); // Just over total threshold
  });
});
```

### Integration Tests

**File:** `backend/tests/integration/purchaseRequest-multiRole.integration.test.js`

```javascript
describe('Multi-Role Purchase Request Creation', () => {
  let coachToken, medicalToken, adminToken, pmToken;

  beforeEach(async () => {
    // Login as different roles
    coachToken = await loginAs('coach');
    medicalToken = await loginAs('medical_incharge');
    adminToken = await loginAs('admin');
    pmToken = await loginAs('purchase_manager');
  });

  test('Coach should be able to create purchase request', async () => {
    const requestData = {
      balagruhaId: 'assigned-balagruha-id',
      category: 'Consumables (Including medicines)',
      reason: 'Medical supplies needed',
      items: [{ productId: 'product-id', requestedQuantity: 10, estimatedUnitCost: 50, estimatedTotalCost: 500 }]
    };

    const response = await request(app)
      .post('/api/purchaseRequests')
      .set('Authorization', `Bearer ${coachToken}`)
      .send(requestData);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('pending_fulfillment'); // Small purchase
  });

  test('Should reject request for unassigned Balagruha', async () => {
    const requestData = {
      balagruhaId: 'unassigned-balagruha-id',
      category: 'Others',
      reason: 'Test',
      items: [{ productId: 'product-id', requestedQuantity: 1, estimatedUnitCost: 100, estimatedTotalCost: 100 }]
    };

    const response = await request(app)
      .post('/api/purchaseRequests')
      .set('Authorization', `Bearer ${coachToken}`)
      .send(requestData);

    expect(response.status).toBe(403);
    expect(response.body.error).toContain('not assigned');
  });

  test('Should allow STOCK requests regardless of Balagruha assignment', async () => {
    const requestData = {
      balagruhaId: 'STOCK',
      category: 'Consumables (Including medicines)',
      reason: 'Pee proof pants',
      items: [{ productId: 'product-id', requestedQuantity: 100, estimatedUnitCost: 50, estimatedTotalCost: 5000 }]
    };

    const response = await request(app)
      .post('/api/purchaseRequests')
      .set('Authorization', `Bearer ${coachToken}`)
      .send(requestData);

    expect(response.status).toBe(201);
    expect(response.body.balagruhaId).toBe('STOCK');
  });

  test('Large purchase should set status to pending_approval', async () => {
    const requestData = {
      balagruhaId: 'assigned-balagruha-id',
      category: 'New Equipment',
      reason: 'New laptops',
      items: [{ productId: 'product-id', requestedQuantity: 5, estimatedUnitCost: 50000, estimatedTotalCost: 250000 }]
    };

    const response = await request(app)
      .post('/api/purchaseRequests')
      .set('Authorization', `Bearer ${coachToken}`)
      .send(requestData);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('pending_approval'); // Large purchase
    expect(response.body.thresholdAnalysis.requiresApproval).toBe(true);
  });

  test('GET requests should filter by user assigned Balagruhas', async () => {
    // Coach assigned to Balagruha 1
    const response = await request(app)
      .get('/api/purchaseRequests')
      .set('Authorization', `Bearer ${coachToken}`);

    expect(response.status).toBe(200);
    response.body.forEach(req => {
      // Should only see requests for assigned Balagruha or STOCK
      expect(['assigned-balagruha-id', 'STOCK']).toContain(req.balagruhaId);
    });
  });
});
```

### E2E Tests

**File:** `frontend/cypress/e2e/multi-role-purchase-requests.cy.js`

```javascript
describe('Multi-Role Purchase Request Creation', () => {
  it('Coach should be able to create purchase request', () => {
    cy.login('coach');
    cy.visit('/coach-dashboard');

    cy.get('[data-testid="create-purchase-request-btn"]').click();

    // Fill form
    cy.get('[data-testid="balagruha-select"]').click();
    cy.contains('Balagruha 1').click(); // Coach's assigned Balagruha

    cy.get('[data-testid="category-select"]').click();
    cy.contains('Consumables (Including medicines)').click();

    cy.get('[data-testid="reason-input"]').type('Medical supplies needed');

    // Select products
    cy.get('[data-testid="product-checkbox-0"]').check();
    cy.get('[data-testid="quantity-input-0"]').type('10');
    cy.get('[data-testid="unit-cost-input-0"]').type('50');

    cy.get('[data-testid="submit-btn"]').click();

    cy.contains('Purchase request created successfully').should('be.visible');
  });

  it('Should show pending_fulfillment status for small purchases', () => {
    cy.login('coach');
    cy.visit('/coach-dashboard');

    // Create small purchase
    cy.createPurchaseRequest({
      balagruhaId: 'assigned-balagruha-id',
      category: 'Others',
      items: [{ cost: 500, quantity: 10, total: 5000 }]
    });

    // Verify status badge
    cy.get('[data-testid="status-badge"]').should('contain', 'Pending Fulfillment');
    cy.get('[data-testid="status-badge"]').should('have.class', 'MuiChip-colorInfo');
  });

  it('Should show pending_approval status for large purchases', () => {
    cy.login('coach');
    cy.visit('/coach-dashboard');

    // Create large purchase
    cy.createPurchaseRequest({
      balagruhaId: 'assigned-balagruha-id',
      category: 'New Equipment',
      items: [{ cost: 50000, quantity: 5, total: 250000 }]
    });

    // Verify status badge
    cy.get('[data-testid="status-badge"]').should('contain', 'Pending Approval');
    cy.get('[data-testid="status-badge"]').should('have.class', 'MuiChip-colorWarning');
  });

  it('Should display threshold analysis in request details', () => {
    cy.login('admin');
    cy.visit('/purchase-requests');

    cy.get('[data-testid="purchase-request-row"]').first().click();

    cy.get('[data-testid="threshold-analysis"]').within(() => {
      cy.contains('Approval Threshold Analysis').should('be.visible');
      cy.contains('Max Item Cost').should('be.visible');
      cy.contains('Total Order Cost').should('be.visible');
    });
  });

  it('Should only show assigned Balagruhas in dropdown', () => {
    cy.login('coach'); // Coach assigned to Balagruha 1 only
    cy.visit('/coach-dashboard');

    cy.get('[data-testid="create-purchase-request-btn"]').click();

    cy.get('[data-testid="balagruha-select"]').click();

    // Should see STOCK and Balagruha 1, not other Balagruhas
    cy.contains('STOCK').should('exist');
    cy.contains('Balagruha 1').should('exist');
    cy.contains('Balagruha 2').should('not.exist');
  });

  it('Admin should see pending_approval requests', () => {
    cy.login('admin');
    cy.visit('/admin/purchase-requests');

    cy.get('[data-testid="status-filter"]').click();
    cy.contains('Pending Approval').click();

    // Should only show large purchases requiring approval
    cy.get('[data-testid="purchase-request-row"]').each($row => {
      cy.wrap($row).find('[data-testid="status-badge"]').should('contain', 'Pending Approval');
    });
  });

  it('Purchase Manager should see pending_fulfillment requests', () => {
    cy.login('purchase_manager');
    cy.visit('/purchase-manager');

    cy.get('[data-testid="status-filter"]').click();
    cy.contains('Pending Fulfillment').click();

    // Should show small purchases ready for fulfillment
    cy.get('[data-testid="purchase-request-row"]').each($row => {
      cy.wrap($row).find('[data-testid="status-badge"]').should('contain', 'Pending Fulfillment');
    });
  });
});
```

---

## Dependencies

### Technical Dependencies
- **Mongoose**: Schema updates for thresholdAnalysis field
- **Material-UI**: Chip, Alert, Icons for status display
- **React**: State management across multiple views

### Story Dependencies
- **Story 17**: Uses same multi-product request structure
- **Story 20**: Requires category selection
- **Story 21**: STOCK option applies to all roles
- **Story 18-19**: Approval and fulfillment workflows extended with thresholds

### Related Stories
- **Future Story**: Admin approval workflow UI (approve/reject actions)
- **Future Story**: Purchase Manager fulfillment UI with threshold awareness

### External Dependencies
- None (uses existing tech stack)

---

## Dev Agent Record

**Assigned To:** [Dev Agent Name]
**Started:** [Date/Time]
**Completed:** [Date/Time]
**Total Time:** [Duration]

### Implementation Log
```
[Timestamp] - Created Story 24 markdown file
[Timestamp] - Backend: Updated User model with canCreatePurchaseRequest helper
[Timestamp] - Backend: Updated PurchaseRequest model with status enum and thresholdAnalysis field
[Timestamp] - Backend: Implemented threshold calculation logic in createPurchaseRequest
[Timestamp] - Backend: Implemented role-based filtering in getPurchaseRequests
[Timestamp] - Backend: Created /api/users/me/balagruhas endpoint
[Timestamp] - Frontend: Added Create Purchase Request button to Coach dashboard
[Timestamp] - Frontend: Added Create Purchase Request button to Medical dashboard
[Timestamp] - Frontend: Added Create Purchase Request button to Admin dashboard
[Timestamp] - Frontend: Updated CreatePurchaseRequestModal to fetch user Balagruhas
[Timestamp] - Frontend: Updated status badge component with new statuses
[Timestamp] - Frontend: Added threshold analysis section to request details
[Timestamp] - Frontend: Updated status filter with new status values
[Timestamp] - Tests: Created unit tests for threshold logic
[Timestamp] - Tests: Created integration tests for multi-role access
[Timestamp] - Tests: Created E2E tests for all roles
[Timestamp] - Manual Testing: Verified threshold calculations
[Timestamp] - Manual Testing: Verified role-based access
[Timestamp] - Manual Testing: Verified filtering logic
[Timestamp] - Code Review: Passed
[Timestamp] - Ready for QA
```

### Code Commit References
- Backend Model: `backend/models/User.js` [Commit Hash]
- Backend Model: `backend/models/PurchaseRequest.js` [Commit Hash]
- Backend Controller: `backend/controllers/purchaseRequestController.js` [Commit Hash]
- Backend Routes: `backend/routes/userRoutes.js` [Commit Hash]
- Frontend Dashboard: `frontend/src/views/CoachDashboard.jsx` [Commit Hash]
- Frontend Dashboard: `frontend/src/views/MedicalInchargeDashboard.jsx` [Commit Hash]
- Frontend Dashboard: `frontend/src/views/AdminDashboard.jsx` [Commit Hash]
- Frontend Modal: `frontend/src/components/CreatePurchaseRequestModal.jsx` [Commit Hash]
- Frontend Details: `frontend/src/components/PurchaseRequestDetailsModal.jsx` [Commit Hash]

### Notes
- Threshold logic correctly calculates small vs large purchases
- All roles can create purchase requests for assigned Balagruhas
- STOCK option available to all roles regardless of assignments
- All unit tests passing (XX/XX)
- All integration tests passing (XX/XX)
- All E2E tests passing (XX/XX)
- Manual testing completed for all 4 roles
- Boundary testing completed (Rs 1,000 and Rs 25,000 thresholds)

---

## QA Results

**QA Agent:** [QA Agent Name]
**Tested:** [Date/Time]
**Status:** [Pass/Fail]

### Test Results Summary
| Test Category | Total | Passed | Failed | Skipped |
|---------------|-------|--------|--------|---------|
| Unit Tests (Backend) | X | X | X | X |
| Unit Tests (Frontend) | X | X | X | X |
| Integration Tests | X | X | X | X |
| E2E Tests | X | X | X | X |
| Manual Tests | X | X | X | X |

### Acceptance Criteria Validation
- [ ] AC1: Multi-role access to purchase request creation ✅/❌
- [ ] AC2: Balagruha dropdown filtered by user assignment ✅/❌
- [ ] AC3: Automatic status assignment based on thresholds ✅/❌
- [ ] AC4: Small purchase workflow (direct to fulfillment) ✅/❌
- [ ] AC5: Large purchase workflow (admin approval required) ✅/❌
- [ ] AC6: Purchase request list filtering by user role ✅/❌
- [ ] AC7: Status badge updates and colors ✅/❌
- [ ] AC8: Request details show threshold calculation ✅/❌

### Role-Based Testing
**Coach:**
- [ ] Can create purchase requests
- [ ] Only sees assigned Balagruhas in dropdown
- [ ] Can create STOCK requests
- [ ] Cannot access unassigned Balagruhas

**Medical Incharge:**
- [ ] Can create purchase requests
- [ ] Only sees assigned Balagruhas in dropdown
- [ ] Can create STOCK requests
- [ ] Cannot access unassigned Balagruhas

**Admin:**
- [ ] Can create purchase requests
- [ ] Sees pending_approval requests for review
- [ ] Can approve/reject large purchases
- [ ] Sees all requests for assigned Balagruhas

**Purchase Manager:**
- [ ] Retains existing create access (no regression)
- [ ] Sees pending_fulfillment and approved requests
- [ ] Can fulfill all ready requests
- [ ] Sees all requests for assigned Balagruhas

### Threshold Testing
- [ ] Small purchase (Rs 500/item, Rs 5,000 total) → pending_fulfillment
- [ ] Boundary: Exactly Rs 1,000/item, Rs 25,000 total → pending_fulfillment
- [ ] Large purchase: Rs 1,001/item → pending_approval
- [ ] Large purchase: Rs 25,001 total → pending_approval
- [ ] Large purchase: Rs 50,000/item, Rs 250,000 total → pending_approval

### Performance Testing
- Role-based filtering: [X]ms
- Threshold calculation: [X]ms
- No performance degradation observed

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### QA Notes
[Observations about multi-role access and threshold logic]

### QA Sign-off
- [ ] All acceptance criteria met
- [ ] All tests passing
- [ ] No critical bugs
- [ ] Performance acceptable
- [ ] Ready for production

**QA Approved By:** [Name]
**Date:** [Date/Time]

---

**Story Status:** Draft → Ready for Development → In Progress → Code Review → QA Testing → Done

**Last Updated:** 2025-11-06 14:05:17 (via `date '+%Y-%m-%d %H:%M:%S'`)
**Updated By:** Dev Agent (Story Creation)
