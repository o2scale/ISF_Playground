# Story 3.8: Add Coach Filter to PM Dashboard

**Epic:** Epic 3: Operational Dashboards & Analytics  
**Story:** 3.8  
**Priority:** 🟡 P1 - High  
**Effort:** 0.5 day  
**Role:** Purchase Manager  

## User Story

As a Purchase Manager,  
I want to filter purchase requests by the requesting Coach,  
So that I can see all requests from a specific coach at a glance.

## Client Requirement (from PDF Feedback Jan 2, 2026)

> "There are 4 filters which is pending - Priority, Balagruha, Coach, Duration"

**Current State:** Priority ✅, Balagruha ✅, Duration ✅, Coach ❌  
**Required State:** Add Coach filter dropdown

---

## Acceptance Criteria

### AC1: Coach Filter Dropdown
**Given** I am a Purchase Manager on the dashboard  
**When** I look at the filter row  
**Then** I see a "Coach" dropdown filter  
**And** it lists all coaches who have created purchase requests  

### AC2: Filter by Coach
**Given** I select a specific coach from the filter  
**When** the filter is applied  
**Then** I only see requests created by that coach  
**And** all other filters (Priority, Balagruha, Duration) still work in combination  

### AC3: "All Coaches" Default
**Given** I load the PM dashboard  
**When** I view the Coach filter  
**Then** "All Coaches" is selected by default  
**And** all requests are shown  

### AC4: Coach Name Display
**Given** I am viewing the Coach filter dropdown  
**When** I open it  
**Then** I see coach names (not IDs or emails)  
**And** coaches are sorted alphabetically  

---

## Technical Design

### Backend Changes

The backend already supports filtering by `requestedBy`. We just need to:
1. Fetch list of unique coaches who have created requests
2. Frontend sends `requestedBy` filter param

```javascript
// New endpoint: GET /api/v2/shop/admin/requests/coaches
// Returns list of unique coaches with request counts
exports.getRequestingCoaches = async (req, res) => {
  const coaches = await PurchaseRequest.aggregate([
    { $group: {
      _id: '$requestedBy',
      requestCount: { $sum: 1 }
    }},
    { $lookup: {
      from: 'users',
      localField: '_id',
      foreignField: '_id',
      as: 'coach'
    }},
    { $unwind: '$coach' },
    { $project: {
      _id: '$coach._id',
      name: '$coach.name',
      email: '$coach.email',
      role: '$coach.role',
      requestCount: 1
    }},
    { $sort: { name: 1 } }
  ]);
  
  res.json({ success: true, coaches });
};
```

### Frontend Changes

```jsx
// ShopInventoryView.jsx - Add Coach filter

// State
const [coachOptions, setCoachOptions] = useState([]);

// Fetch coaches on mount
useEffect(() => {
  fetchCoachOptions();
}, []);

const fetchCoachOptions = async () => {
  const response = await api.get('/api/v2/shop/admin/requests/coaches');
  if (response.data.success) {
    setCoachOptions(response.data.coaches);
  }
};

// In filter row:
<div className="filter-group">
  <label>Coach:</label>
  <select
    value={filters.coach}
    onChange={(e) => setFilters({ ...filters, coach: e.target.value })}
    className="filter-select"
  >
    <option value="all">All Coaches</option>
    {coachOptions.map(coach => (
      <option key={coach._id} value={coach._id}>
        {coach.name} ({coach.requestCount})
      </option>
    ))}
  </select>
</div>
```

---

## Tasks/Subtasks

- [ ] **Task 1: Backend endpoint**
  - [ ] Create `GET /api/v2/shop/admin/requests/coaches` endpoint
  - [ ] Return unique coaches with request counts
  - [ ] Add route to shop routes

- [ ] **Task 2: Frontend filter**
  - [ ] Add `coach` to filter state (default: 'all')
  - [ ] Fetch coach options on component mount
  - [ ] Add Coach dropdown to filter row
  - [ ] Apply filter in `applyFilters()` function

- [ ] **Task 3: Backend filter support**
  - [ ] Ensure `getAllPurchaseRequests` accepts `requestedBy` query param
  - [ ] Test filtering works correctly

---

## File Changes

| File | Change |
|------|--------|
| `backend/controllers/purchaseRequestController.js` | Add getRequestingCoaches endpoint |
| `backend/routes/v2/shop.js` | Add route for coaches endpoint |
| `frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx` | Add Coach filter dropdown |

---

## Definition of Done

- [ ] Coach filter dropdown visible in PM dashboard
- [ ] Dropdown lists all coaches who have requests
- [ ] Filtering by coach works correctly
- [ ] Combines with other filters
- [ ] Coach names sorted alphabetically

## Status

**Status:** `completed`

**Completed:** Jan 5, 2026

### Implementation Notes:
- Added `requester` to filter state (default: 'all')
- Created `getAvailableRequesters()` function that:
  - Extracts unique requesters from loaded requests
  - Filters by selected balagruha if applicable
  - Sorts alphabetically by name
- Added "Requested By" dropdown filter (visible only for PM role)
- Filter resets when balagruha changes
- Uses client-side filtering (no backend changes needed)
