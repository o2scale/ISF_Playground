# Story 3.9: PM Navigation Pending Badge

**Epic:** Epic 3: Operational Dashboards & Analytics  
**Story:** 3.9  
**Priority:** 🟡 P1 - High  
**Effort:** 0.5 day  
**Role:** Purchase Manager  

## User Story

As a Purchase Manager,  
I want to see a badge in my navigation showing the number of pending tasks,  
So that I can quickly know how much work is waiting without opening the dashboard.

## Client Requirement (from c3)

> "On his task bar, a badge should tell him quickly the number of tasks pending."

**Current State:** No badge in navigation  
**Required State:** Badge showing count of high-priority or all pending tasks

---

## Acceptance Criteria

### AC1: Badge Display
**Given** I am logged in as a Purchase Manager  
**When** I view the sidebar/navigation  
**Then** I see a badge next to "Purchase Requests" or "PM Dashboard" menu item  
**And** the badge shows the count of pending tasks  

### AC2: Badge Count
**Given** there are pending purchase requests  
**When** the badge count is calculated  
**Then** it shows the total number of requests with status `pending`  
**And** optionally highlights high-priority count separately  

### AC3: Real-time Update (Nice to Have)
**Given** a new request is created or a request is fulfilled  
**When** the count changes  
**Then** the badge updates without page refresh (polling every 60s)  

### AC4: Badge Styling
**Given** I am viewing the badge  
**When** there are pending tasks  
**Then** the badge is red/orange and clearly visible  
**When** there are no pending tasks  
**Then** the badge is hidden or shows "0" in green  

---

## Technical Design

### Backend Endpoint
```javascript
// GET /api/v2/shop/admin/requests/pending-count
exports.getPendingCount = async (req, res) => {
  const userId = req.user._id;
  const userRole = req.user.role;
  
  let query = { status: 'pending' };
  
  // PM sees only their assigned balagruhas
  if (userRole === 'purchase-manager') {
    const user = await User.findById(userId).select('balagruhaIds');
    query.$or = [
      { balagruhaId: { $in: user.balagruhaIds } },
      { balagruhaId: 'STOCK' }
    ];
  }
  
  const total = await PurchaseRequest.countDocuments(query);
  
  const highPriority = await PurchaseRequest.countDocuments({
    ...query,
    priority: 'high'
  });
  
  res.json({
    success: true,
    data: {
      total,
      highPriority,
      mediumPriority: total - highPriority // simplified
    }
  });
};
```

### Frontend Implementation

```jsx
// Sidebar.jsx or Navigation component

const [pendingCount, setPendingCount] = useState({ total: 0, highPriority: 0 });

useEffect(() => {
  if (userRole === 'purchase-manager') {
    fetchPendingCount();
    // Poll every 60 seconds
    const interval = setInterval(fetchPendingCount, 60000);
    return () => clearInterval(interval);
  }
}, [userRole]);

const fetchPendingCount = async () => {
  const response = await api.get('/api/v2/shop/admin/requests/pending-count');
  if (response.data.success) {
    setPendingCount(response.data.data);
  }
};

// In JSX:
<NavItem to="/shop/purchase-requests">
  Purchase Requests
  {pendingCount.total > 0 && (
    <span className="nav-badge">
      {pendingCount.total}
      {pendingCount.highPriority > 0 && (
        <span className="high-priority-indicator">!</span>
      )}
    </span>
  )}
</NavItem>
```

### CSS Styling
```css
.nav-badge {
  background-color: #dc3545;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: bold;
  margin-left: 8px;
  min-width: 20px;
  text-align: center;
}

.nav-badge.no-pending {
  background-color: #28a745;
}

.high-priority-indicator {
  color: #ffc107;
  font-weight: bold;
}
```

---

## Tasks/Subtasks

- [ ] **Task 1: Backend endpoint**
  - [ ] Create `GET /api/v2/shop/admin/requests/pending-count`
  - [ ] Return total and high-priority counts
  - [ ] Respect PM balagruha filtering

- [ ] **Task 2: Frontend badge component**
  - [ ] Create reusable `NavBadge` component
  - [ ] Fetch count on mount
  - [ ] Set up polling (60s interval)

- [ ] **Task 3: Navigation integration**
  - [ ] Find navigation component (Sidebar.jsx or similar)
  - [ ] Add badge next to PM menu item
  - [ ] Style the badge

- [ ] **Task 4: Styling**
  - [ ] Red badge for pending
  - [ ] Yellow indicator for high priority
  - [ ] Green/hidden for zero

---

## File Changes

| File | Change |
|------|--------|
| `backend/controllers/purchaseRequestController.js` | Add getPendingCount endpoint |
| `backend/routes/v2/shop.js` | Add route |
| `frontend/src/components/Sidebar.jsx` (or equivalent) | Add badge |
| `frontend/src/components/common/NavBadge.jsx` | NEW - Badge component |
| `frontend/src/components/Sidebar.css` | Badge styles |

---

## Definition of Done

- [ ] Badge visible in PM navigation
- [ ] Count is accurate
- [ ] Updates periodically
- [ ] Styled appropriately
- [ ] High priority indicator works

## Status

**Status:** `completed`

**Completed:** Jan 5, 2026

### Implementation Notes:
- Added `getPendingCount` endpoint in `purchaseRequestController.js`
- Added route `/api/v2/shop/admin/purchase-requests/pending-count`
- Added `getPendingPurchaseRequestCount` API function in `api.js`
- Modified `Layout.js` to fetch pending count for PM/Admin
- Polls every 60 seconds for updates
- Badge shows total pending count with high-priority indicator (!)
