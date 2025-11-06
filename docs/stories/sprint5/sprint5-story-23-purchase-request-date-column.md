# Story 23: Purchase Request Date Column Addition

**Story ID:** Sprint5-Story-23
**Epic:** [Sprint5-Epic-05 (Purchase Manager Workflow)](../../epics/sprint5/sprint5-epic-05-purchase-manager-workflow.md)
**Priority:** Low
**Status:** Draft
**Estimate:** 0.5 days
**Created:** 2025-11-06 14:03:01
**Last Updated:** 2025-11-06 14:03:01

---

## User Story

**As a** Purchase Manager
**I want to** see the creation date of each purchase request displayed as a column in the list view
**So that** I can quickly identify when each request was submitted without opening the details

---

## Context

This story adds a **date column** to the purchase request list view based on client feedback. Currently, the purchase request table shows various information but does not prominently display the creation date of each request.

### Client Feedback (Tony):
> "Add a date column to the purchase request list showing when the request was created in dd/mm/yy format."

### Current Table Columns:
1. Request ID
2. Balagruha
3. Status
4. Category (from Story 20)
5. Total Cost
6. Actions

### New Table Columns (After This Story):
1. Request ID
2. Balagruha
3. Status
4. Category
5. **Created Date** ← NEW COLUMN
6. Total Cost
7. Actions

### Date Format Requirements:
- **Format**: dd/mm/yy (e.g., "06/11/25" for November 6, 2025)
- **Locale**: Should respect user's locale if possible, but default to dd/mm/yy
- **Sorting**: Column should be sortable (most recent first by default)
- **Responsive**: Date column should be visible on desktop, hidden on mobile (shown in expanded row)

---

## Acceptance Criteria

### AC1: Date Column Added to Purchase Request Table

- ✅ New "Created Date" column added to purchase request table
- ✅ Column placement: After "Category" column, before "Total Cost" column
- ✅ Column header: "Created Date"
- ✅ Date format: dd/mm/yy (e.g., "06/11/25")
- ✅ Date displayed for all purchase requests in the list
- ✅ Column width: Fixed at 120px (enough for dd/mm/yy format)
- ✅ Column alignment: Center-aligned

### AC2: Date Formatting Function

- ✅ Create reusable date formatting utility function
- ✅ Function signature: `formatDate(dateString, format = 'dd/mm/yy')`
- ✅ Input: ISO date string (e.g., "2025-11-06T14:03:01.000Z")
- ✅ Output: Formatted date string (e.g., "06/11/25")
- ✅ Handle invalid dates gracefully (return "N/A" or "Invalid Date")
- ✅ Support multiple formats (for future extensibility):
  - `'dd/mm/yy'`: 06/11/25
  - `'dd/mm/yyyy'`: 06/11/2025
  - `'mm/dd/yy'`: 11/06/25 (US format)
  - `'yyyy-mm-dd'`: 2025-11-06 (ISO format)

### AC3: Sorting by Date Column

- ✅ Date column is sortable (click header to sort)
- ✅ Default sort order: Descending (most recent first)
- ✅ First click: Sort descending (newest to oldest)
- ✅ Second click: Sort ascending (oldest to newest)
- ✅ Third click: Remove sort (revert to default)
- ✅ Sort icon indicator shown in column header
- ✅ Only one column sorted at a time (remove sort from other columns when date sorting applied)

### AC4: Responsive Design for Date Column

- ✅ **Desktop (≥ 768px)**: Date column visible in table
- ✅ **Mobile (< 768px)**: Date column hidden, shown in expanded row details
- ✅ Mobile expanded row format:
  ```
  Created: 06/11/25
  ```
- ✅ Consistent date formatting across desktop and mobile views

### AC5: Date Display in Request Details Modal

- ✅ Date shown in request details modal with full format
- ✅ Format: "Created on: DD/MM/YYYY at HH:MM" (e.g., "Created on: 06/11/2025 at 14:03")
- ✅ Placement: In request metadata section, below Request ID
- ✅ Includes both date and time for detailed view

### AC6: Accessibility and Internationalization

- ✅ Date column has proper ARIA label: `aria-label="Created Date"`
- ✅ Screen reader announces date in readable format: "Created on November 6, 2025"
- ✅ Date format configurable via environment variable (future i18n support)
- ✅ Tooltip on hover shows full date and time: "Created on: 06/11/2025 at 14:03:01"

---

## Technical Requirements

### Frontend Implementation

#### 1. Create Date Formatting Utility

**File:** `frontend/src/utils/dateFormatter.js` (new file)

```javascript
/**
 * Format date string to specified format
 * @param {string|Date} date - Date string or Date object
 * @param {string} format - Desired format ('dd/mm/yy', 'dd/mm/yyyy', etc.)
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'dd/mm/yy') => {
  if (!date) return 'N/A';

  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    // Check for invalid date
    if (isNaN(dateObj.getTime())) {
      return 'Invalid Date';
    }

    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    const shortYear = String(year).slice(-2);

    switch (format) {
      case 'dd/mm/yy':
        return `${day}/${month}/${shortYear}`;

      case 'dd/mm/yyyy':
        return `${day}/${month}/${year}`;

      case 'mm/dd/yy':
        return `${month}/${day}/${shortYear}`;

      case 'mm/dd/yyyy':
        return `${month}/${day}/${year}`;

      case 'yyyy-mm-dd':
        return `${year}-${month}-${day}`;

      default:
        return `${day}/${month}/${shortYear}`;
    }
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'N/A';
  }
};

/**
 * Format date with time (for detailed views)
 * @param {string|Date} date - Date string or Date object
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (date) => {
  if (!date) return 'N/A';

  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
      return 'Invalid Date';
    }

    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} at ${hours}:${minutes}`;
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'N/A';
  }
};

/**
 * Get human-readable date for screen readers
 * @param {string|Date} date - Date string or Date object
 * @returns {string} Human-readable date
 */
export const getReadableDate = (date) => {
  if (!date) return 'No date';

  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
      return 'Invalid date';
    }

    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return 'No date';
  }
};
```

#### 2. Update PurchaseManagerView Component

**File:** `frontend/src/views/PurchaseManagerView.jsx`

**Import Date Formatter:**
```javascript
import { formatDate, formatDateTime, getReadableDate } from '../utils/dateFormatter';
```

**Add Sorting State:**
```javascript
const [sortConfig, setSortConfig] = useState({
  key: 'createdAt',
  direction: 'desc' // Default: most recent first
});
```

**Sorting Function:**
```javascript
const handleSort = (key) => {
  let direction = 'asc';

  if (sortConfig.key === key) {
    // Cycle through: desc → asc → null (remove sort)
    if (sortConfig.direction === 'desc') {
      direction = 'asc';
    } else if (sortConfig.direction === 'asc') {
      direction = null; // Remove sort
    } else {
      direction = 'desc';
    }
  } else {
    direction = 'desc'; // Default for new column
  }

  setSortConfig({ key, direction });

  // Sort requests
  if (direction) {
    const sorted = [...purchaseRequests].sort((a, b) => {
      const aValue = key === 'createdAt' ? new Date(a[key]) : a[key];
      const bValue = key === 'createdAt' ? new Date(b[key]) : b[key];

      if (direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    setPurchaseRequests(sorted);
  } else {
    // Reset to default sort (most recent first)
    fetchPurchaseRequests();
  }
};
```

**Updated Table Header with Date Column:**
```jsx
<TableHead>
  <TableRow>
    <TableCell>Request ID</TableCell>
    <TableCell>Balagruha</TableCell>
    <TableCell>Status</TableCell>
    <TableCell>Category</TableCell>

    {/* NEW: Created Date Column */}
    <TableCell
      align="center"
      sx={{ minWidth: 120, cursor: 'pointer' }}
      onClick={() => handleSort('createdAt')}
      aria-label="Created Date"
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
        Created Date
        {sortConfig.key === 'createdAt' && (
          sortConfig.direction === 'desc' ? (
            <ArrowDownwardIcon fontSize="small" />
          ) : sortConfig.direction === 'asc' ? (
            <ArrowUpwardIcon fontSize="small" />
          ) : null
        )}
      </Box>
    </TableCell>

    <TableCell>Total Cost</TableCell>
    <TableCell>Actions</TableCell>
  </TableRow>
</TableHead>
```

**Updated Table Body with Date Cell:**
```jsx
<TableBody>
  {purchaseRequests.map((request) => (
    <TableRow key={request._id}>
      <TableCell>{request.requestId || 'N/A'}</TableCell>

      <TableCell>
        {request.balagruhaId === 'STOCK' ? (
          <Chip label="STOCK" size="small" color="primary" icon={<InventoryIcon />} />
        ) : (
          request.balagruhaId?.name || 'N/A'
        )}
      </TableCell>

      <TableCell>
        <Chip
          label={request.status}
          color={getStatusColor(request.status)}
          size="small"
        />
      </TableCell>

      <TableCell>{request.category}</TableCell>

      {/* NEW: Created Date Cell */}
      <TableCell
        align="center"
        sx={{ minWidth: 120 }}
        aria-label={`Created on ${getReadableDate(request.createdAt)}`}
      >
        <Tooltip title={`Created on: ${formatDateTime(request.createdAt)}`} arrow>
          <Typography variant="body2">
            {formatDate(request.createdAt, 'dd/mm/yy')}
          </Typography>
        </Tooltip>
      </TableCell>

      <TableCell>₹{calculateTotalCost(request.items)}</TableCell>

      <TableCell>
        <IconButton onClick={() => handleViewDetails(request)}>
          <VisibilityIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  ))}
</TableBody>
```

**Mobile Responsive (Hidden on Small Screens):**
```jsx
<TableCell
  align="center"
  sx={{
    minWidth: 120,
    display: { xs: 'none', md: 'table-cell' } // Hide on mobile (< 768px)
  }}
>
  {/* ... date cell content ... */}
</TableCell>
```

**Mobile Expanded Row Details:**
```jsx
<TableRow>
  <TableCell colSpan={7} sx={{ display: { xs: 'table-cell', md: 'none' } }}>
    <Box sx={{ p: 2, backgroundColor: 'grey.50' }}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Typography variant="caption" color="text.secondary">
            Created
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {formatDate(request.createdAt, 'dd/mm/yy')}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption" color="text.secondary">
            Total Cost
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            ₹{calculateTotalCost(request.items)}
          </Typography>
        </Grid>
        {/* ... other mobile details ... */}
      </Grid>
    </Box>
  </TableCell>
</TableRow>
```

#### 3. Update PurchaseRequestDetailsModal Component

**File:** `frontend/src/components/PurchaseRequestDetailsModal.jsx`

**Add Created Date Display:**
```jsx
<Grid container spacing={2}>
  <Grid item xs={12} sm={6}>
    <Typography variant="body2" color="text.secondary">
      Request ID
    </Typography>
    <Typography variant="body1" fontWeight={500}>
      {request.requestId}
    </Typography>
  </Grid>

  {/* NEW: Created Date */}
  <Grid item xs={12} sm={6}>
    <Typography variant="body2" color="text.secondary">
      Created On
    </Typography>
    <Typography variant="body1" fontWeight={500}>
      {formatDateTime(request.createdAt)}
    </Typography>
  </Grid>

  <Grid item xs={12} sm={6}>
    <Typography variant="body2" color="text.secondary">
      Balagruha
    </Typography>
    {/* ... Balagruha display ... */}
  </Grid>

  {/* ... rest of details ... */}
</Grid>
```

---

## Implementation Notes

### Code Reuse
- Date formatting utility can be reused across other views (Medical Check-ins, Task Management, etc.)
- Sorting logic follows existing table patterns
- Tooltip component already used elsewhere in the app

### Date Format Configuration
- Default format hardcoded as `'dd/mm/yy'` (as per client requirement)
- Future enhancement: Add environment variable `REACT_APP_DATE_FORMAT` for configurability
- Easy to extend for internationalization (i18n) in future sprints

### Performance Considerations
- Date formatting is lightweight (no performance impact)
- Sorting performed on client side (acceptable for current data volume)
- If data volume grows, implement server-side sorting

### Accessibility
- ARIA labels added for screen readers
- Tooltip provides full date/time context
- Keyboard navigation supported for sorting

---

## Testing Strategy

### Unit Tests

#### Date Formatter Tests
**File:** `frontend/src/utils/dateFormatter.test.js`

```javascript
import { formatDate, formatDateTime, getReadableDate } from './dateFormatter';

describe('Date Formatter Utility', () => {
  const testDate = new Date('2025-11-06T14:03:01.000Z');

  describe('formatDate', () => {
    test('Should format date as dd/mm/yy', () => {
      expect(formatDate(testDate, 'dd/mm/yy')).toBe('06/11/25');
    });

    test('Should format date as dd/mm/yyyy', () => {
      expect(formatDate(testDate, 'dd/mm/yyyy')).toBe('06/11/2025');
    });

    test('Should format date as mm/dd/yy (US format)', () => {
      expect(formatDate(testDate, 'mm/dd/yy')).toBe('11/06/25');
    });

    test('Should format date as yyyy-mm-dd (ISO format)', () => {
      expect(formatDate(testDate, 'yyyy-mm-dd')).toBe('2025-11-06');
    });

    test('Should default to dd/mm/yy when no format specified', () => {
      expect(formatDate(testDate)).toBe('06/11/25');
    });

    test('Should handle date strings', () => {
      expect(formatDate('2025-11-06T14:03:01.000Z', 'dd/mm/yy')).toBe('06/11/25');
    });

    test('Should return "N/A" for null date', () => {
      expect(formatDate(null)).toBe('N/A');
    });

    test('Should return "Invalid Date" for invalid date', () => {
      expect(formatDate('invalid-date')).toBe('Invalid Date');
    });
  });

  describe('formatDateTime', () => {
    test('Should format date with time', () => {
      const result = formatDateTime(testDate);
      expect(result).toMatch(/06\/11\/2025 at \d{2}:\d{2}/);
    });

    test('Should return "N/A" for null date', () => {
      expect(formatDateTime(null)).toBe('N/A');
    });
  });

  describe('getReadableDate', () => {
    test('Should return human-readable date', () => {
      const result = getReadableDate(testDate);
      expect(result).toBe('November 6, 2025');
    });

    test('Should return "No date" for null', () => {
      expect(getReadableDate(null)).toBe('No date');
    });
  });
});
```

#### Component Tests
**File:** `frontend/src/views/PurchaseManagerView.test.js`

```javascript
describe('PurchaseManagerView - Date Column', () => {
  const mockRequests = [
    {
      _id: '1',
      requestId: 'PR-001',
      createdAt: '2025-11-06T14:03:01.000Z',
      // ... other fields ...
    },
    {
      _id: '2',
      requestId: 'PR-002',
      createdAt: '2025-11-05T10:00:00.000Z',
      // ... other fields ...
    }
  ];

  test('Should display date column in table', () => {
    render(<PurchaseManagerView />);
    expect(screen.getByText('Created Date')).toBeInTheDocument();
  });

  test('Should format dates as dd/mm/yy', () => {
    axios.get.mockResolvedValue({ data: mockRequests });

    render(<PurchaseManagerView />);

    waitFor(() => {
      expect(screen.getByText('06/11/25')).toBeInTheDocument();
      expect(screen.getByText('05/11/25')).toBeInTheDocument();
    });
  });

  test('Should sort by date descending on first click', async () => {
    axios.get.mockResolvedValue({ data: mockRequests });

    render(<PurchaseManagerView />);

    const dateHeader = screen.getByText('Created Date');
    fireEvent.click(dateHeader);

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent('PR-001'); // Most recent first
    });
  });

  test('Should sort by date ascending on second click', async () => {
    axios.get.mockResolvedValue({ data: mockRequests });

    render(<PurchaseManagerView />);

    const dateHeader = screen.getByText('Created Date');

    fireEvent.click(dateHeader); // First click: desc
    fireEvent.click(dateHeader); // Second click: asc

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent('PR-002'); // Oldest first
    });
  });

  test('Should show tooltip with full date/time on hover', async () => {
    axios.get.mockResolvedValue({ data: mockRequests });

    render(<PurchaseManagerView />);

    const dateCell = screen.getByText('06/11/25');
    fireEvent.mouseOver(dateCell);

    await waitFor(() => {
      expect(screen.getByText(/Created on: 06\/11\/2025 at \d{2}:\d{2}/)).toBeInTheDocument();
    });
  });

  test('Should hide date column on mobile screens', () => {
    // Mock window.innerWidth to simulate mobile
    global.innerWidth = 500;

    render(<PurchaseManagerView />);

    const dateColumn = screen.getByText('Created Date').closest('th');
    expect(dateColumn).toHaveStyle({ display: 'none' });
  });
});
```

### E2E Tests

**File:** `frontend/cypress/e2e/purchase-request-date-column.cy.js`

```javascript
describe('Purchase Request Date Column', () => {
  beforeEach(() => {
    cy.login('purchasemanager');
    cy.visit('/purchase-manager');
  });

  it('Should display date column in table', () => {
    cy.get('table thead').within(() => {
      cy.contains('Created Date').should('be.visible');
    });
  });

  it('Should display dates in dd/mm/yy format', () => {
    cy.get('[data-testid="purchase-request-row"]').first().within(() => {
      cy.get('[data-testid="created-date-cell"]')
        .invoke('text')
        .should('match', /\d{2}\/\d{2}\/\d{2}/);
    });
  });

  it('Should sort by date when clicking column header', () => {
    cy.contains('Created Date').click();

    // Verify sort icon appears
    cy.contains('Created Date').parent().find('svg').should('exist');

    // Verify sorting order (most recent first by default)
    cy.get('[data-testid="created-date-cell"]').first().invoke('text').as('firstDate');
    cy.get('[data-testid="created-date-cell"]').last().invoke('text').as('lastDate');

    cy.get('@firstDate').then(first => {
      cy.get('@lastDate').then(last => {
        const firstDate = new Date(first.split('/').reverse().join('-'));
        const lastDate = new Date(last.split('/').reverse().join('-'));
        expect(firstDate.getTime()).to.be.greaterThan(lastDate.getTime());
      });
    });
  });

  it('Should toggle sort order on multiple clicks', () => {
    cy.contains('Created Date').click(); // First click: desc
    cy.wait(500);

    cy.contains('Created Date').click(); // Second click: asc
    cy.wait(500);

    // Verify sort icon direction changed
    cy.contains('Created Date').parent().find('svg').should('exist');
  });

  it('Should show tooltip with full date on hover', () => {
    cy.get('[data-testid="created-date-cell"]').first().trigger('mouseover');

    cy.get('[role="tooltip"]').should('be.visible').and('contain', 'Created on:');
  });

  it('Should display date in request details modal', () => {
    cy.get('[data-testid="purchase-request-row"]').first().click();

    cy.get('[data-testid="request-details-modal"]').within(() => {
      cy.contains('Created On').should('be.visible');
      cy.get('[data-testid="created-date-value"]')
        .invoke('text')
        .should('match', /\d{2}\/\d{2}\/\d{4} at \d{2}:\d{2}/);
    });
  });

  it('Should hide date column on mobile screens', () => {
    cy.viewport(375, 667); // iPhone SE dimensions

    cy.get('table thead').within(() => {
      cy.contains('Created Date').should('not.be.visible');
    });

    // Verify date shown in expanded row on mobile
    cy.get('[data-testid="purchase-request-row"]').first().click();
    cy.contains('Created').should('be.visible');
  });
});
```

---

## Dependencies

### Technical Dependencies
- **Material-UI**: Tooltip, Typography components
- **React**: State management for sorting
- **Date-fns** (optional): If date-fns library is already in project, can be used for formatting

### Story Dependencies
- **Story 17-22**: Date column applies to all purchase requests created

### Related Stories
- **Story 22**: Date filter bug fix makes date filtering more useful with visible date column

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
[Timestamp] - Created Story 23 markdown file
[Timestamp] - Frontend: Created dateFormatter.js utility file
[Timestamp] - Frontend: Implemented formatDate function with multiple formats
[Timestamp] - Frontend: Implemented formatDateTime function
[Timestamp] - Frontend: Implemented getReadableDate for accessibility
[Timestamp] - Frontend: Added Created Date column to PurchaseManagerView table
[Timestamp] - Frontend: Implemented date column sorting functionality
[Timestamp] - Frontend: Added tooltip with full date/time on hover
[Timestamp] - Frontend: Implemented responsive design (hide on mobile)
[Timestamp] - Frontend: Added date to mobile expanded row view
[Timestamp] - Frontend: Updated PurchaseRequestDetailsModal with created date
[Timestamp] - Tests: Created unit tests for date formatter
[Timestamp] - Tests: Created component tests for date column
[Timestamp] - Tests: Created E2E tests for sorting and display
[Timestamp] - Manual Testing: Verified date display and sorting
[Timestamp] - Manual Testing: Verified responsive behavior on mobile
[Timestamp] - Code Review: Passed
[Timestamp] - Ready for QA
```

### Code Commit References
- Utility: `frontend/src/utils/dateFormatter.js` [Commit Hash]
- View: `frontend/src/views/PurchaseManagerView.jsx` [Commit Hash]
- Modal: `frontend/src/components/PurchaseRequestDetailsModal.jsx` [Commit Hash]

### Notes
- Date formatting utility is reusable across the application
- All unit tests passing (XX/XX)
- All E2E tests passing (XX/XX)
- Manual testing completed on desktop and mobile
- Date format configurable for future internationalization

---

## QA Results

**QA Agent:** [QA Agent Name]
**Tested:** [Date/Time]
**Status:** [Pass/Fail]

### Test Results Summary
| Test Category | Total | Passed | Failed | Skipped |
|---------------|-------|--------|--------|---------|
| Unit Tests | X | X | X | X |
| Component Tests | X | X | X | X |
| E2E Tests | X | X | X | X |
| Manual Tests | X | X | X | X |

### Acceptance Criteria Validation
- [ ] AC1: Date column added to table ✅/❌
- [ ] AC2: Date formatting function ✅/❌
- [ ] AC3: Sorting by date column ✅/❌
- [ ] AC4: Responsive design ✅/❌
- [ ] AC5: Date in details modal ✅/❌
- [ ] AC6: Accessibility and internationalization ✅/❌

### Visual Testing
- [ ] Date column displays correctly in all browsers
- [ ] Date format is consistent (dd/mm/yy)
- [ ] Sort icons display correctly
- [ ] Tooltip appears on hover with correct formatting
- [ ] Mobile responsive design works as expected

### Performance Testing
- Date formatting: [X]ms
- Sorting performance: [X]ms
- No performance degradation observed

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### QA Notes
[Observations about date display and sorting functionality]

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

**Last Updated:** 2025-11-06 14:03:01 (via `date '+%Y-%m-%d %H:%M:%S'`)
**Updated By:** Dev Agent (Story Creation)
