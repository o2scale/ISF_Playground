# Story 21: STOCK Balagruha-Independent Purchase Requests

**Story ID:** Sprint5-Story-21
**Epic:** [Sprint5-Epic-05 (Purchase Manager Workflow)](../../epics/sprint5/sprint5-epic-05-purchase-manager-workflow.md)
**Priority:** High
**Status:** Draft
**Estimate:** 1.5 days
**Created:** 2025-11-06 13:57:15
**Last Updated:** 2025-11-06 13:57:15

---

## User Story

**As a** Purchase Manager
**I want to** create purchase requests for "STOCK" inventory that is not specific to any Balagruha
**So that** I can efficiently purchase shared resources (e.g., "Pee proof Pants") that can be allocated to Balagruhas as needed later

---

## Context

This story implements a **STOCK option** for purchase requests based on client feedback. Currently, ALL purchase requests must be assigned to a specific Balagruha, which creates challenges for:

1. **Shared Resources**: Items like "Pee proof Pants" that are used across multiple Balagruhas
2. **Bulk Purchasing**: Buying in bulk for general inventory without immediate allocation
3. **Flexible Allocation**: Allowing inventory to be allocated to Balagruhas based on need rather than at purchase time
4. **Central Inventory Management**: Maintaining a central stock that can be distributed later

### Key Requirements from Client (Tony):
- "Add 'STOCK' option besides Balagruha for purchases that don't need to be assigned to a specific Balagruha"
- Example: "Pee proof Pants"
- **Visibility Rule**: "All users can see the STOCK request regardless of their assigned Balagruha"
- **Allocation Strategy**: "Just leave it as STOCK and can be allocated to Balagruhas later"

### Current vs New Behavior:

**Current:**
```
Purchase Request Form:
- Balagruha: [Dropdown with Balagruha 1, Balagruha 2, ...]
- (Required field - must select a Balagruha)
```

**New:**
```
Purchase Request Form:
- Balagruha: [Dropdown with STOCK, Balagruha 1, Balagruha 2, ...]
- (Can select "STOCK" for non-specific purchases)
```

### Impact on Visibility:
- **Regular Balagruha Requests**: Visible only to users assigned to that specific Balagruha
- **STOCK Requests**: Visible to ALL users regardless of their Balagruha assignments

---

## Acceptance Criteria

### AC1: STOCK Option in Balagruha Dropdown

- ✅ Balagruha dropdown in CreatePurchaseRequestModal includes "STOCK" option
- ✅ "STOCK" appears as the **first option** in the dropdown (above Balagruha list)
- ✅ Dropdown options order:
  1. STOCK
  2. [Divider]
  3. Balagruha 1
  4. Balagruha 2
  5. ...
- ✅ "STOCK" option has distinct visual styling (optional icon/badge)
- ✅ Selecting "STOCK" bypasses Balagruha-specific validation
- ✅ Field remains required (must select either STOCK or a Balagruha)

### AC2: Backend Support for STOCK as Special Balagruha Value

- ✅ PurchaseRequest model accepts `balagruhaId: 'STOCK'` as valid value
- ✅ Schema validation:
  ```javascript
  balagruhaId: {
    type: mongoose.Schema.Types.Mixed, // Allow ObjectId or String 'STOCK'
    required: true,
    validate: {
      validator: function(v) {
        return v === 'STOCK' || mongoose.Types.ObjectId.isValid(v);
      },
      message: 'balagruhaId must be either "STOCK" or a valid Balagruha ID'
    }
  }
  ```
- ✅ API accepts `balagruhaId: 'STOCK'` in POST requests
- ✅ Database stores 'STOCK' as a string literal (not as ObjectId)
- ✅ Populate logic handles STOCK gracefully (no populate attempt for string 'STOCK')

### AC3: STOCK Requests Visible to All Users

- ✅ `getPurchaseRequests` controller includes STOCK requests for all users
- ✅ Filtering logic:
  ```javascript
  // Existing logic: Filter by user's assigned Balagruhas
  const userBalagruhas = await getUserBalagruhas(req.user.id);
  filter.balagruhaId = { $in: [...userBalagruhas, 'STOCK'] };
  // NEW: Always include 'STOCK' in filter regardless of user's assignments
  ```
- ✅ STOCK requests appear in Purchase Manager view for ALL roles
- ✅ STOCK requests NOT filtered by user's Balagruha assignments
- ✅ Existing Balagruha-specific filters still work correctly

### AC4: STOCK Display in Purchase Request List

- ✅ "Balagruha" column shows "STOCK" for STOCK requests
- ✅ STOCK value displayed with distinct styling:
  - Badge/chip format
  - Different color (e.g., blue/purple vs regular green)
  - Optional icon (📦 or similar)
- ✅ Example display:
  ```
  | Request ID | Balagruha | Category | Status |
  |------------|-----------|----------|--------|
  | PR-001     | 📦 STOCK  | Consumables | Pending |
  | PR-002     | Balagruha 1 | New Equipment | Approved |
  ```
- ✅ Sorting by Balagruha column places STOCK requests at top or bottom (consistent ordering)
- ✅ STOCK requests visible even when user filters by specific Balagruha

### AC5: STOCK Filtering Options

- ✅ Balagruha filter dropdown includes "STOCK" option
- ✅ Filter options:
  - "All Balagruhas" (default, includes STOCK)
  - "STOCK"
  - [Divider]
  - Balagruha 1
  - Balagruha 2
  - ...
- ✅ Selecting "STOCK" filter shows ONLY STOCK requests
- ✅ Selecting specific Balagruha shows ONLY that Balagruha's requests (excludes STOCK)
- ✅ "All Balagruhas" filter shows both STOCK and Balagruha-specific requests
- ✅ Backend filtering: `GET /api/purchaseRequests?balagruhaId=STOCK`

### AC6: STOCK Display in Request Details

- ✅ Request details modal shows "STOCK" for Balagruha field
- ✅ Display format:
  ```
  Balagruha: 📦 STOCK (Not assigned to specific Balagruha)
  ```
- ✅ Tooltip/info text explains STOCK concept: "This purchase is for general inventory and can be allocated to Balagruhas later"
- ✅ No validation errors or warnings for STOCK value
- ✅ STOCK requests can proceed through approval and fulfillment workflow normally

### AC7: Future Allocation Placeholder (Out of Scope for This Story)

**Note:** This story does NOT implement the allocation feature. This AC documents the future integration point.

- ✅ Database schema supports future allocation tracking
- ✅ Comment in code indicating where allocation logic will be added
- ✅ STOCK requests remain in STOCK status after fulfillment (not auto-allocated)
- ✅ Manual allocation to be implemented in future story (Sprint 6+)

---

## Technical Requirements

### Backend Implementation

#### 1. Update PurchaseRequest Model

**File:** `backend/models/PurchaseRequest.js`

**Changes:**
```javascript
const purchaseRequestSchema = new mongoose.Schema({
  balagruhaId: {
    type: mongoose.Schema.Types.Mixed, // Allow both ObjectId and String 'STOCK'
    required: true,
    validate: {
      validator: function(v) {
        // Accept 'STOCK' string or valid ObjectId
        return v === 'STOCK' || mongoose.Types.ObjectId.isValid(v);
      },
      message: 'balagruhaId must be either "STOCK" or a valid Balagruha ID'
    }
  },

  // NEW: Optional field for future allocation tracking
  allocatedToBalagruhas: [{
    balagruhaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Balagruha'
    },
    quantity: Number,
    allocatedAt: Date,
    allocatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],

  category: {
    type: String,
    required: true,
    enum: ['New Equipment', 'Consumables (Including medicines)', 'Others']
  },

  // ... rest of schema ...
}, { timestamps: true });

// Custom populate method that handles STOCK gracefully
purchaseRequestSchema.methods.populateBalagruha = async function() {
  if (this.balagruhaId === 'STOCK') {
    return this; // Don't populate if STOCK
  }
  return this.populate('balagruhaId', 'name location');
};

module.exports = mongoose.model('PurchaseRequest', purchaseRequestSchema);
```

#### 2. Update Purchase Request Controller

**File:** `backend/controllers/purchaseRequestController.js`

**Changes to createPurchaseRequest:**
```javascript
exports.createPurchaseRequest = async (req, res) => {
  try {
    const { balagruhaId, category, reason, items, attachments } = req.body;

    // Validation
    if (!balagruhaId) {
      return res.status(400).json({ error: 'Balagruha or STOCK selection is required' });
    }

    // Validate balagruhaId is either 'STOCK' or valid ObjectId
    if (balagruhaId !== 'STOCK' && !mongoose.Types.ObjectId.isValid(balagruhaId)) {
      return res.status(400).json({ error: 'Invalid Balagruha ID' });
    }

    // If not STOCK, verify Balagruha exists
    if (balagruhaId !== 'STOCK') {
      const balagruha = await Balagruha.findById(balagruhaId);
      if (!balagruha) {
        return res.status(404).json({ error: 'Balagruha not found' });
      }
    }

    const newRequest = new PurchaseRequest({
      balagruhaId, // Can be 'STOCK' or ObjectId
      category,
      reason,
      items,
      attachments,
      createdBy: req.user.id,
      status: 'pending'
    });

    await newRequest.save();

    // Populate Balagruha only if not STOCK
    if (balagruhaId !== 'STOCK') {
      await newRequest.populate('balagruhaId', 'name location');
    }

    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

**Changes to getPurchaseRequests (visibility logic):**
```javascript
exports.getPurchaseRequests = async (req, res) => {
  try {
    const { status, balagruhaId, category, startDate, endDate } = req.query;

    const filter = {};

    // Status filter
    if (status && status !== 'all') {
      filter.status = status;
    }

    // Category filter
    if (category && category !== 'All Categories') {
      filter.category = category;
    }

    // Date filters
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    // MODIFIED: Balagruha filter with STOCK visibility logic
    if (balagruhaId) {
      if (balagruhaId === 'STOCK') {
        // Show only STOCK requests
        filter.balagruhaId = 'STOCK';
      } else if (balagruhaId !== 'all') {
        // Show only specific Balagruha requests (excludes STOCK)
        filter.balagruhaId = balagruhaId;
      } else {
        // "All Balagruhas" - include both STOCK and user's assigned Balagruhas
        const userBalagruhas = await getUserAssignedBalagruhas(req.user.id);
        filter.balagruhaId = { $in: [...userBalagruhas, 'STOCK'] };
      }
    } else {
      // No filter specified - default to user's assigned Balagruhas + STOCK
      const userBalagruhas = await getUserAssignedBalagruhas(req.user.id);
      filter.balagruhaId = { $in: [...userBalagruhas, 'STOCK'] };
    }

    const requests = await PurchaseRequest.find(filter)
      .populate('createdBy', 'username role')
      .populate('items.productId', 'name sku')
      .sort({ createdAt: -1 });

    // Manual populate for Balagruha (skip if STOCK)
    for (let request of requests) {
      if (request.balagruhaId !== 'STOCK') {
        await request.populate('balagruhaId', 'name location');
      }
    }

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to get user's assigned Balagruhas
async function getUserAssignedBalagruhas(userId) {
  const user = await User.findById(userId).populate('assignedBalagruhas');
  return user.assignedBalagruhas.map(b => b._id.toString());
}
```

#### 3. Update Balagruha Routes

**File:** `backend/routes/balagruhaRoutes.js`

**Add endpoint to fetch Balagruhas with STOCK option:**
```javascript
// GET /api/balagruhas/with-stock - Returns Balagruhas + STOCK option
router.get('/with-stock', authMiddleware, async (req, res) => {
  try {
    const balagruhas = await Balagruha.find({ isActive: true })
      .select('name location')
      .sort({ name: 1 });

    // Add STOCK as first option
    const options = [
      { _id: 'STOCK', name: 'STOCK', isStock: true },
      ...balagruhas.map(b => ({ ...b.toObject(), isStock: false }))
    ];

    res.status(200).json(options);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

---

### Frontend Implementation

#### 1. Update CreatePurchaseRequestModal Component

**File:** `frontend/src/components/CreatePurchaseRequestModal.jsx`

**Fetch Balagruhas with STOCK option:**
```javascript
const [balagruhaOptions, setBalagruhaOptions] = useState([]);

useEffect(() => {
  const fetchBalagruhas = async () => {
    try {
      const response = await axios.get('/api/balagruhas/with-stock');
      setBalagruhaOptions(response.data);
    } catch (error) {
      toast.error('Failed to load Balagruhas');
    }
  };
  fetchBalagruhas();
}, []);
```

**Updated Balagruha Dropdown JSX:**
```jsx
<Box sx={{ mb: 2 }}>
  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
    Balagruha <span style={{ color: 'red' }}>*</span>
  </Typography>
  <FormControl fullWidth error={errors.balagruhaId}>
    <Select
      value={formData.balagruhaId}
      onChange={(e) => {
        setFormData({ ...formData, balagruhaId: e.target.value });
        setErrors({ ...errors, balagruhaId: false });
      }}
      displayEmpty
    >
      <MenuItem value="" disabled>
        Select Balagruha or STOCK...
      </MenuItem>

      {/* STOCK Option - First in list */}
      <MenuItem value="STOCK">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label="STOCK"
            size="small"
            color="primary"
            icon={<InventoryIcon />}
          />
          <Typography variant="caption" color="text.secondary">
            (General inventory - not specific to Balagruha)
          </Typography>
        </Box>
      </MenuItem>

      <Divider sx={{ my: 1 }} />

      {/* Balagruha Options */}
      {balagruhaOptions
        .filter(option => option._id !== 'STOCK')
        .map(option => (
          <MenuItem key={option._id} value={option._id}>
            {option.name}
            {option.location && (
              <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                ({option.location})
              </Typography>
            )}
          </MenuItem>
        ))}
    </Select>
    {errors.balagruhaId && (
      <FormHelperText>Please select a Balagruha or STOCK</FormHelperText>
    )}
  </FormControl>
</Box>
```

#### 2. Update PurchaseManagerView Component

**File:** `frontend/src/views/PurchaseManagerView.jsx`

**Add STOCK to Balagruha Filter:**
```javascript
const [balagruhaOptions, setBalagruhaOptions] = useState([]);

useEffect(() => {
  const fetchBalagruhas = async () => {
    try {
      const response = await axios.get('/api/balagruhas/with-stock');
      setBalagruhaOptions(response.data);
    } catch (error) {
      toast.error('Failed to load Balagruhas');
    }
  };
  fetchBalagruhas();
}, []);
```

**Updated Balagruha Filter Dropdown:**
```jsx
<FormControl sx={{ minWidth: 200 }}>
  <InputLabel>Balagruha</InputLabel>
  <Select
    value={filters.balagruhaId}
    label="Balagruha"
    onChange={(e) => setFilters({ ...filters, balagruhaId: e.target.value })}
  >
    <MenuItem value="all">All Balagruhas</MenuItem>

    {/* STOCK Filter Option */}
    <MenuItem value="STOCK">
      <Chip label="STOCK" size="small" color="primary" icon={<InventoryIcon />} />
    </MenuItem>

    <Divider sx={{ my: 1 }} />

    {balagruhaOptions
      .filter(option => option._id !== 'STOCK')
      .map(option => (
        <MenuItem key={option._id} value={option._id}>
          {option.name}
        </MenuItem>
      ))}
  </Select>
</FormControl>
```

**Updated Table Cell Display:**
```jsx
<TableCell>
  {request.balagruhaId === 'STOCK' ? (
    <Chip
      label="STOCK"
      size="small"
      color="primary"
      icon={<InventoryIcon />}
      sx={{
        fontWeight: 600,
        backgroundColor: '#e3f2fd',
        color: '#1976d2'
      }}
    />
  ) : (
    <Typography variant="body2">
      {request.balagruhaId?.name || 'N/A'}
    </Typography>
  )}
</TableCell>
```

#### 3. Update PurchaseRequestDetailsModal Component

**File:** `frontend/src/components/PurchaseRequestDetailsModal.jsx`

**Display STOCK with Info Tooltip:**
```jsx
<Grid item xs={12} sm={6}>
  <Typography variant="body2" color="text.secondary">
    Balagruha
  </Typography>
  {request.balagruhaId === 'STOCK' ? (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Chip
        label="STOCK"
        size="small"
        color="primary"
        icon={<InventoryIcon />}
      />
      <Tooltip title="This purchase is for general inventory and can be allocated to Balagruhas later">
        <InfoIcon fontSize="small" color="action" />
      </Tooltip>
    </Box>
  ) : (
    <Typography variant="body1" fontWeight={500}>
      {request.balagruhaId?.name || 'N/A'}
      {request.balagruhaId?.location && (
        <Typography variant="caption" color="text.secondary" display="block">
          {request.balagruhaId.location}
        </Typography>
      )}
    </Typography>
  )}
</Grid>
```

---

## Implementation Notes

### Code Reuse
- Reuse existing Balagruha dropdown component structure
- Reuse Material-UI Chip component for STOCK badge
- Reuse existing filter logic with minor modifications for STOCK inclusion

### Database Migration
- **No migration needed**: Existing requests already have valid Balagruha ObjectIds
- New STOCK requests will coexist with existing Balagruha-specific requests
- Mixed type (ObjectId or String) supported by Mongoose Schema.Types.Mixed

### STOCK Visibility Logic
- **Key Rule**: STOCK requests are ALWAYS included in user's request view
- Implementation: Add 'STOCK' to user's Balagruha filter array
- Example: `userBalagruhas = ['balagruha-1-id', 'balagruha-2-id', 'STOCK']`

### Future Allocation Feature
- **Out of Scope**: This story does NOT implement allocation UI
- **Database Ready**: `allocatedToBalagruhas` array field prepared for future use
- **Placeholder Comment**: Code includes TODO comment for future allocation integration
- **Future Story** (Sprint 6+):
  - Admin/Purchase Manager can allocate STOCK items to specific Balagruhas
  - Partial allocation supported (split quantities across multiple Balagruhas)
  - Allocation history tracking

### Edge Cases Handled
1. **Populate Logic**: Skip populate() when balagruhaId === 'STOCK'
2. **Sorting**: STOCK requests consistently appear at top of sorted lists
3. **Filtering**: "All Balagruhas" includes STOCK, specific Balagruha filters exclude STOCK
4. **Validation**: Backend validates 'STOCK' string OR valid ObjectId

---

## Testing Strategy

### Unit Tests

#### Backend Tests
**File:** `backend/tests/unit/purchaseRequest.test.js`

```javascript
describe('PurchaseRequest Model - STOCK Support', () => {
  test('Should accept "STOCK" as valid balagruhaId', async () => {
    const requestData = {
      balagruhaId: 'STOCK',
      category: 'Consumables (Including medicines)',
      reason: 'Pee proof pants for general inventory',
      items: [/* ... */]
    };
    const request = new PurchaseRequest(requestData);
    await request.validate();
    expect(request.balagruhaId).toBe('STOCK');
  });

  test('Should accept valid ObjectId as balagruhaId', async () => {
    const validId = new mongoose.Types.ObjectId();
    const requestData = {
      balagruhaId: validId,
      category: 'New Equipment',
      reason: 'Equipment for Balagruha 1',
      items: [/* ... */]
    };
    const request = new PurchaseRequest(requestData);
    await request.validate();
    expect(request.balagruhaId).toEqual(validId);
  });

  test('Should reject invalid balagruhaId (not STOCK or ObjectId)', async () => {
    const requestData = {
      balagruhaId: 'invalid-value',
      category: 'Others',
      reason: 'Test',
      items: [/* ... */]
    };
    const request = new PurchaseRequest(requestData);
    await expect(request.validate()).rejects.toThrow();
  });

  test('Should store allocatedToBalagruhas array', async () => {
    const requestData = {
      balagruhaId: 'STOCK',
      category: 'Consumables (Including medicines)',
      reason: 'General stock',
      items: [/* ... */],
      allocatedToBalagruhas: [
        {
          balagruhaId: new mongoose.Types.ObjectId(),
          quantity: 50,
          allocatedAt: new Date()
        }
      ]
    };
    const request = new PurchaseRequest(requestData);
    await request.validate();
    expect(request.allocatedToBalagruhas).toHaveLength(1);
  });
});
```

#### Frontend Tests
**File:** `frontend/src/components/CreatePurchaseRequestModal.test.js`

```javascript
describe('CreatePurchaseRequestModal - STOCK Support', () => {
  test('Should display STOCK as first option in Balagruha dropdown', async () => {
    const balagruhas = [
      { _id: 'STOCK', name: 'STOCK', isStock: true },
      { _id: '1', name: 'Balagruha 1', isStock: false },
      { _id: '2', name: 'Balagruha 2', isStock: false }
    ];

    axios.get.mockResolvedValue({ data: balagruhas });

    render(<CreatePurchaseRequestModal open={true} />);

    await waitFor(() => {
      const dropdown = screen.getByLabelText('Balagruha');
      fireEvent.mouseDown(dropdown);
    });

    const options = screen.getAllByRole('option');
    expect(options[1]).toHaveTextContent('STOCK'); // Index 1 (0 is placeholder)
  });

  test('Should submit form successfully with STOCK selected', async () => {
    axios.get.mockResolvedValue({
      data: [{ _id: 'STOCK', name: 'STOCK', isStock: true }]
    });
    axios.post.mockResolvedValue({ data: { _id: 'new-request-id' } });

    render(<CreatePurchaseRequestModal open={true} onSuccess={jest.fn()} />);

    await waitFor(() => screen.getByLabelText('Balagruha'));

    fireEvent.change(screen.getByLabelText('Balagruha'), {
      target: { value: 'STOCK' }
    });
    fireEvent.change(screen.getByLabelText('Category'), {
      target: { value: 'Consumables (Including medicines)' }
    });
    fireEvent.change(screen.getByLabelText('Reason'), {
      target: { value: 'Pee proof pants' }
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        '/api/purchaseRequests',
        expect.objectContaining({ balagruhaId: 'STOCK' })
      );
    });
  });

  test('Should display STOCK with icon and description', () => {
    render(<CreatePurchaseRequestModal open={true} />);

    const stockOption = screen.getByText('STOCK');
    expect(stockOption).toBeInTheDocument();
    expect(screen.getByText(/General inventory/i)).toBeInTheDocument();
  });
});
```

### Integration Tests

**File:** `backend/tests/integration/purchaseRequest-stock.integration.test.js`

```javascript
describe('Purchase Request API - STOCK Support', () => {
  let authToken;

  beforeEach(async () => {
    // Login and get auth token
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ username: 'purchasemanager', password: 'password123' });
    authToken = loginRes.body.token;
  });

  test('POST /api/purchaseRequests with STOCK should create request', async () => {
    const requestData = {
      balagruhaId: 'STOCK',
      category: 'Consumables (Including medicines)',
      reason: 'Pee proof pants for general stock',
      items: [
        {
          productId: 'product-id-1',
          requestedQuantity: 100,
          estimatedUnitCost: 50,
          estimatedTotalCost: 5000
        }
      ]
    };

    const response = await request(app)
      .post('/api/purchaseRequests')
      .set('Authorization', `Bearer ${authToken}`)
      .send(requestData);

    expect(response.status).toBe(201);
    expect(response.body.balagruhaId).toBe('STOCK');
    expect(response.body.category).toBe('Consumables (Including medicines)');
  });

  test('GET /api/purchaseRequests should include STOCK requests for all users', async () => {
    // Create STOCK request
    await PurchaseRequest.create({
      balagruhaId: 'STOCK',
      category: 'Others',
      reason: 'Test STOCK request',
      items: [/* ... */],
      createdBy: 'user-id'
    });

    // Create Balagruha-specific request
    await PurchaseRequest.create({
      balagruhaId: 'balagruha-1-id',
      category: 'New Equipment',
      reason: 'Test Balagruha request',
      items: [/* ... */],
      createdBy: 'user-id'
    });

    const response = await request(app)
      .get('/api/purchaseRequests')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    const stockRequests = response.body.filter(r => r.balagruhaId === 'STOCK');
    expect(stockRequests.length).toBeGreaterThan(0);
  });

  test('GET /api/purchaseRequests?balagruhaId=STOCK should return only STOCK requests', async () => {
    // Seed STOCK and Balagruha requests
    await PurchaseRequest.create([
      { balagruhaId: 'STOCK', category: 'Others', reason: 'STOCK', items: [/* ... */], createdBy: 'user-id' },
      { balagruhaId: 'balagruha-1-id', category: 'Others', reason: 'B1', items: [/* ... */], createdBy: 'user-id' }
    ]);

    const response = await request(app)
      .get('/api/purchaseRequests?balagruhaId=STOCK')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    response.body.forEach(request => {
      expect(request.balagruhaId).toBe('STOCK');
    });
  });

  test('GET /api/balagruhas/with-stock should return Balagruhas with STOCK option', async () => {
    const response = await request(app)
      .get('/api/balagruhas/with-stock')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body[0]._id).toBe('STOCK');
    expect(response.body[0].name).toBe('STOCK');
    expect(response.body[0].isStock).toBe(true);
  });
});
```

### E2E Tests

**File:** `frontend/cypress/e2e/purchase-request-stock.cy.js`

```javascript
describe('Purchase Request - STOCK Feature', () => {
  beforeEach(() => {
    cy.login('purchasemanager');
    cy.visit('/purchase-manager');
  });

  it('Should create STOCK purchase request', () => {
    cy.get('[data-testid="create-purchase-request-btn"]').click();

    // Select STOCK
    cy.get('[data-testid="balagruha-select"]').click();
    cy.contains('STOCK').click();

    // Verify STOCK chip is displayed
    cy.get('[data-testid="balagruha-select"]').should('contain', 'STOCK');

    // Fill rest of form
    cy.get('[data-testid="category-select"]').click();
    cy.contains('Consumables (Including medicines)').click();

    cy.get('[data-testid="reason-input"]').type('Pee proof pants for general inventory');

    // Select products
    cy.get('[data-testid="product-checkbox-0"]').check();
    cy.get('[data-testid="quantity-input-0"]').type('100');
    cy.get('[data-testid="unit-cost-input-0"]').type('50');

    cy.get('[data-testid="submit-btn"]').click();

    // Verify success
    cy.contains('Purchase request created successfully').should('be.visible');
  });

  it('Should display STOCK requests in list', () => {
    // Verify STOCK chip appears in table
    cy.get('[data-testid="purchase-request-row"]').first().within(() => {
      cy.get('[data-testid="balagruha-cell"]').should('contain', 'STOCK');
    });
  });

  it('Should filter STOCK requests', () => {
    cy.get('[data-testid="balagruha-filter"]').click();
    cy.contains('STOCK').click();

    // Verify all displayed requests are STOCK
    cy.get('[data-testid="purchase-request-row"]').each($row => {
      cy.wrap($row).find('[data-testid="balagruha-cell"]').should('contain', 'STOCK');
    });
  });

  it('Should display STOCK in request details with tooltip', () => {
    cy.get('[data-testid="purchase-request-row"]').first().click();

    cy.get('[data-testid="request-details-modal"]').within(() => {
      cy.contains('Balagruha').should('be.visible');
      cy.contains('STOCK').should('be.visible');

      // Hover info icon to see tooltip
      cy.get('[data-testid="stock-info-icon"]').trigger('mouseover');
      cy.contains('can be allocated to Balagruhas later').should('be.visible');
    });
  });

  it('Should show STOCK requests regardless of user Balagruha assignment', () => {
    // User assigned to Balagruha 1 should still see STOCK requests
    cy.get('[data-testid="balagruha-filter"]').click();
    cy.contains('All Balagruhas').click();

    // Verify both STOCK and Balagruha-specific requests are visible
    const balagruhaTypes = new Set();
    cy.get('[data-testid="purchase-request-row"]').each($row => {
      cy.wrap($row).find('[data-testid="balagruha-cell"]').invoke('text').then(text => {
        balagruhaTypes.add(text.includes('STOCK') ? 'STOCK' : 'Balagruha');
      });
    }).then(() => {
      expect(balagruhaTypes.size).to.be.greaterThan(1); // Both types present
    });
  });
});
```

---

## Dependencies

### Technical Dependencies
- **Mongoose**: Schema.Types.Mixed for flexible balagruhaId field
- **Material-UI**: Chip, Divider, Tooltip components
- **React**: State management for dropdown options

### Story Dependencies
- **Story 17**: STOCK requests use the same multi-product request structure
- **Story 20**: STOCK requests require category selection
- **Story 18**: Admin approval workflow applies to STOCK requests
- **Story 19**: Purchase Manager fulfillment applies to STOCK requests

### Related Stories
- **Story 24**: Multi-role request creation includes STOCK option for all roles
- **Future Story (Sprint 6+)**: STOCK allocation feature (allocate STOCK items to specific Balagruhas)

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
[Timestamp] - Created Story 21 markdown file
[Timestamp] - Backend: Updated PurchaseRequest model with Mixed type for balagruhaId
[Timestamp] - Backend: Added validation for 'STOCK' string
[Timestamp] - Backend: Added allocatedToBalagruhas field (future use)
[Timestamp] - Backend: Updated createPurchaseRequest controller
[Timestamp] - Backend: Updated getPurchaseRequests with STOCK visibility logic
[Timestamp] - Backend: Created /api/balagruhas/with-stock endpoint
[Timestamp] - Frontend: Updated CreatePurchaseRequestModal with STOCK option
[Timestamp] - Frontend: Added STOCK chip styling and icon
[Timestamp] - Frontend: Updated PurchaseManagerView with STOCK filter
[Timestamp] - Frontend: Updated table display for STOCK badge
[Timestamp] - Frontend: Updated PurchaseRequestDetailsModal with STOCK tooltip
[Timestamp] - Tests: Created unit tests for backend model
[Timestamp] - Tests: Created unit tests for frontend component
[Timestamp] - Tests: Created integration tests for API
[Timestamp] - Tests: Created E2E tests
[Timestamp] - Testing: Manual testing completed
[Timestamp] - Code Review: Passed
[Timestamp] - Ready for QA
```

### Code Commit References
- Backend Model: `backend/models/PurchaseRequest.js` [Commit Hash]
- Backend Controller: `backend/controllers/purchaseRequestController.js` [Commit Hash]
- Backend Routes: `backend/routes/balagruhaRoutes.js` [Commit Hash]
- Frontend Modal: `frontend/src/components/CreatePurchaseRequestModal.jsx` [Commit Hash]
- Frontend View: `frontend/src/views/PurchaseManagerView.jsx` [Commit Hash]
- Frontend Details: `frontend/src/components/PurchaseRequestDetailsModal.jsx` [Commit Hash]

### Notes
- STOCK requests successfully created and displayed
- Visibility logic confirmed: STOCK visible to all users
- All unit tests passing (XX/XX)
- All integration tests passing (XX/XX)
- All E2E tests passing (XX/XX)
- Manual testing completed across Chrome, Firefox, Safari
- Responsive design verified on mobile devices
- Future allocation feature placeholder added (database ready)

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
- [ ] AC1: STOCK option in Balagruha dropdown ✅/❌
- [ ] AC2: Backend support for STOCK as special value ✅/❌
- [ ] AC3: STOCK requests visible to all users ✅/❌
- [ ] AC4: STOCK display in purchase request list ✅/❌
- [ ] AC5: STOCK filtering options ✅/❌
- [ ] AC6: STOCK display in request details ✅/❌
- [ ] AC7: Future allocation placeholder ✅/❌

### Bug Reports
| Bug ID | Severity | Description | Status |
|--------|----------|-------------|--------|
| [ID] | [High/Med/Low] | [Description] | [Open/Fixed] |

### Performance Testing
- Page load time: [X]ms
- Filter response time: [X]ms
- Form submission time: [X]ms

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### QA Notes
[Additional observations, recommendations, or concerns]

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

**Last Updated:** 2025-11-06 13:57:15 (via `date '+%Y-%m-%d %H:%M:%S'`)
**Updated By:** Dev Agent (Story Creation)
