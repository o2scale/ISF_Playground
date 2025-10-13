# Story: Transaction Reports

**Story ID:** Sprint5-Story-12
**Epic:** Sprint5-Epic-04 - Reporting & Analytics
**Sprint:** Sprint 5 - ISF Shop
**Date Created:** October 7, 2025
**Status:** ✅ COMPLETE - Ready for QA
**Priority:** P2 (Medium)
**Estimate:** 1 day
**Actual Time:** 4 hours
**Assigned To:** Claude Code (AI Agent)
**Completed Date:** October 13, 2025
**Acceptance Criteria**: 7/7 (100%)

---

## User Story

**As an** admin
**I need** detailed transaction reports and student leaderboards
**So that** I can track coin economy health and student engagement

---

## Acceptance Criteria

### AC1: Transaction Log
**Given** I navigate to "Transaction Reports"
**When** the page loads
**Then** I see a complete log of all shop purchases
**And** each shows: order number, student name, date, total coins, status
**And** I can filter by student, date range, status

### AC2: Top Coin Earners Leaderboard
**Given** I view the leaderboards
**When** I click "Top Earners"
**Then** I see the top 10 students by total coins earned
**And** each shows: rank, name, total earned, last earned date
**And** I can export this list

### AC3: Top Coin Spenders Leaderboard
**Given** I view the leaderboards
**When** I click "Top Spenders"
**Then** I see the top 10 students by total coins spent
**And** each shows: rank, name, total spent, purchase count
**And** I can export this list

### AC4: Students with Zero Purchases
**Given** I view engagement reports
**When** I click "Zero Purchases"
**Then** I see all students who have never made a purchase
**And** each shows: name, coin balance, last activity date
**And** this helps identify students needing engagement

### AC5: Transaction Drill-Down
**Given** I click on a transaction
**When** the detail modal opens
**Then** I see: complete order details, items, student info, coin transaction
**And** I can navigate to the full order

### AC6: Export Reports
**Given** I am viewing any report
**When** I click "Export"
**Then** I can download as CSV or PDF
**And** the export includes all visible columns and filters

### AC7: Coin Circulation Metrics
**Given** I view the coin economy health dashboard
**When** the page loads
**Then** I see: total coins in circulation, earned vs spent ratio, average balance
**And** a trend line shows circulation over time
**And** warnings appear if economy is imbalanced

---

## Technical Specification

### Backend Implementation

#### API Endpoints
```javascript
// Transaction Report
GET /api/v2/shop/admin/reports/transactions
Query: ?startDate&endDate&studentId&status&page&limit
Response: { "transactions": [...], "pagination": {...} }

// Student Leaderboard
GET /api/v2/shop/admin/analytics/student-leaderboard
Query: ?type=earners|spenders&limit=10
Response:
{
  "leaderboard": [
    {
      "rank": 1,
      "userId": "user123",
      "studentName": "Rajesh Kumar",
      "totalEarned": 1250,
      "totalSpent": 800,
      "currentBalance": 450,
      "purchaseCount": 12
    }
  ]
}

// Zero Purchase Students
GET /api/v2/shop/admin/analytics/zero-purchases
Response:
{
  "students": [
    {
      "userId": "user456",
      "name": "Priya Sharma",
      "balance": 320,
      "lastActivity": "2025-10-05T14:30:00Z"
    }
  ]
}

// Coin Economy Health
GET /api/v2/shop/admin/analytics/coin-economy
Response:
{
  "totalInCirculation": 45800,
  "totalEarned": 125000,
  "totalSpent": 79200,
  "earnedVsSpentRatio": 1.58,
  "avgBalance": 229,
  "warnings": [
    "Earned/Spent ratio is high - consider more attractive products"
  ]
}

// Export
GET /api/v2/shop/admin/reports/export
Query: ?type=transactions|leaderboard&format=csv|pdf&...filters
Response: File download
```

#### Leaderboard Aggregation
```javascript
// Top Earners
Coin.aggregate([
  {
    $lookup: {
      from: 'users',
      localField: 'userId',
      foreignField: '_id',
      as: 'user'
    }
  },
  { $unwind: '$user' },
  { $sort: { totalEarned: -1 } },
  { $limit: 10 },
  {
    $project: {
      rank: { $add: [{ $indexOfArray: ['$_id', '$$ROOT._id'] }, 1] },
      userId: '$userId',
      studentName: '$user.name',
      totalEarned: 1,
      totalSpent: 1,
      currentBalance: '$balance'
    }
  }
]);

// Top Spenders
Coin.aggregate([
  {
    $lookup: {
      from: 'users',
      localField: 'userId',
      foreignField: '_id',
      as: 'user'
    }
  },
  { $unwind: '$user' },
  { $sort: { totalSpent: -1 } },
  { $limit: 10 },
  {
    $lookup: {
      from: 'orders',
      localField: 'userId',
      foreignField: 'userId',
      as: 'orders'
    }
  },
  {
    $project: {
      rank: { $add: [{ $indexOfArray: ['$_id', '$$ROOT._id'] }, 1] },
      userId: '$userId',
      studentName: '$user.name',
      totalSpent: 1,
      purchaseCount: { $size: '$orders' }
    }
  }
]);
```

### Frontend Implementation

#### Components
```
components/admin/shop/
  ├── TransactionReport.jsx          # Main transaction log
  ├── StudentLeaderboard.jsx         # Leaderboards
  ├── ZeroPurchases.jsx              # Engagement report
  ├── CoinEconomyHealth.jsx          # Economy metrics
  ├── ExportButton.jsx               # Export functionality
  └── TransactionDetail.jsx          # Detail modal
```

---

## Dependencies

### Technical Dependencies
- Order collection
- Coin collection with transaction history
- User collection for student names
- PDF generation library (optional)

### Story Dependencies
- **Blocks:** None
- **Blocked By:** Sprint5-Story-11 (analytics dashboard), Sprint5-Story-09 (transaction history)

---

## Testing Requirements

### Unit Tests
- [ ] Leaderboard calculation logic
- [ ] Coin economy ratio calculation
- [ ] CSV export generation
- [ ] Zero purchases query

### Integration Tests
- [ ] GET /reports/transactions with filters
- [ ] GET /leaderboard returns top 10
- [ ] GET /zero-purchases returns non-purchasers
- [ ] CSV export includes all fields

### E2E Tests
- [ ] Admin views transaction report
- [ ] Admin views top earners leaderboard
- [ ] Admin exports leaderboard as CSV
- [ ] Admin views zero-purchase students

---

## UI/UX Requirements

### Leaderboard Design
```
┌─────────────────────────────────────────────────┐
│ Top Coin Earners                                │
├─────────────────────────────────────────────────┤
│ Rank | Name         | Earned | Spent | Balance │
├─────────────────────────────────────────────────┤
│  1   | Rajesh Kumar | 1,250  | 800   | 450     │
│  2   | Priya Sharma | 1,100  | 500   | 600     │
│  3   | Amit Singh   | 980    | 320   | 660     │
└─────────────────────────────────────────────────┘
```

### Color Coding
- Rank 1: Gold badge
- Rank 2-3: Silver badge
- Rank 4-10: Bronze badge
- Zero purchases: Red warning icon

---

## Performance Requirements

- Transaction report query: < 1s for 10,000 records
- Leaderboard query: < 500ms
- CSV export: < 5s for 10,000 records
- PDF export: < 10s

---

## Detailed Frontend Specification

**Design System Reference:** ISF Playground Users Table + WTF Management patterns
**Last Updated:** October 7, 2025

### Components
- **TransactionReportsPage.jsx** - Main reports page (admin)
- **TransactionLogTable.jsx** - Complete transaction log
- **StudentLeaderboard.jsx** - Top earners/spenders leaderboard
- **ZeroPurchasesReport.jsx** - Non-purchasing students table
- **CoinEconomyHealth.jsx** - Economy health metrics dashboard
- **ReportExportButton.jsx** - CSV/PDF export functionality

### Key UI Elements
**Transaction Log Table:**
```jsx
- Columns: Order# | Student | Date/Time | Total Coins | Status | Actions
- Filters:
  * Student search (autocomplete)
  * Date range picker
  * Status dropdown (All, Completed, Cancelled)
- Pagination: 20 per page
- Row click: Opens transaction detail modal
- Export button: Top-right, downloads filtered results
```

**Student Leaderboard Tabs:**
```jsx
Tab 1 - Top Earners:
  - Rank | Name | Total Earned | Current Balance | Last Activity
  - Rank badges:
    * #1: 🥇 Gold medal icon
    * #2: 🥈 Silver medal icon
    * #3: 🥉 Bronze medal icon
  - Top 10 students
  - Sortable columns
  - Export to CSV

Tab 2 - Top Spenders:
  - Rank | Name | Total Spent | Purchase Count | Avg Order Value
  - Same rank badges as earners
  - Top 10 students
  - Click name → View purchase history
  - Export to CSV
```

**Leaderboard Cards:**
```jsx
Card style (Users stats cards pattern):
- bg-gradient-to-br from-purple-50 to-pink-50
- border-2 border-purple-300
- Large number (text-5xl font-bold)
- Trophy emoji for #1
- Profile avatar placeholder
- Hover: scale effect
```

**Zero Purchases Report:**
```jsx
- Red warning banner at top:
  * "⚠ 113 students have never made a purchase"
  * "Engage these students to increase shop participation"
- Table columns: Student | Balance | Last Login | Balagruha | Coach
- Highlight: Students with high balances (>100 coins)
- Actions:
  * "Send Reminder" button (per student)
  * "View Profile" link
- Export button
```

**Coin Economy Health Dashboard:**
```jsx
- Metrics cards (3-column):
  Card 1: Total Coins in Circulation
  Card 2: Earned vs Spent Ratio
  Card 3: Average Student Balance

- Warning indicators:
  * Green: Healthy ratio (1.0-1.5)
  * Orange: High ratio (>1.5) - "Too many coins, add products"
  * Red: Low ratio (<0.8) - "Coins scarce, increase rewards"

- Circulation trend chart (line graph):
  * X-axis: Last 30 days
  * Y-axis: Coins in circulation
  * Shows earned (green) vs spent (red) lines

- Recommendations panel:
  * AI-generated suggestions based on metrics
  * "Consider adding more premium products"
  * "Increase coin rewards for WTF submissions"
```

**Export Options Modal:**
```jsx
- Radio buttons:
  * CSV (default)
  * PDF (formatted report)
- Include options (checkboxes):
  * Transaction details
  * Student names
  * Order summaries
- Date range selector
- "Generate Report" button (purple)
- Download link appears after generation
```

### Styling
- Leaderboard ranks:
  * Gold: `text-yellow-500 bg-yellow-50`
  * Silver: `text-gray-400 bg-gray-50`
  * Bronze: `text-orange-600 bg-orange-50`
- Warning banner: `bg-red-50 border-l-4 border-red-500`
- Health metrics:
  * Healthy: `bg-green-100 text-green-800`
  * Warning: `bg-orange-100 text-orange-800`
  * Critical: `bg-red-100 text-red-800`
- Export button: `bg-purple-600 hover:bg-purple-700`

### State Management
```javascript
useReportStore: {
  transactionLog[],
  leaderboards: { earners[], spenders[] },
  zeroPurchases[],
  economyHealth: { circulation, ratio, avgBalance },
  filters: { student, dateRange, status },
  exportReport(type, format)
}
```

### User Flows
1. **View Transaction Log:** Admin navigates → See all transactions → Filter/search
2. **View Leaderboard:** Click "Leaderboards" tab → See top earners → Export CSV
3. **Review Non-Purchasers:** Click "Zero Purchases" → See list → Send reminders
4. **Check Economy Health:** View metrics → See warnings → Take action
5. **Export Report:** Click Export → Select format → Download

**Design System Compliance:** ✅

---

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Transaction report displays correctly
- [ ] Leaderboards accurate
- [ ] Zero purchase report works
- [ ] Coin economy metrics display
- [ ] Export works (CSV/PDF)
- [ ] Tests passing (>70% coverage)
- [ ] Code reviewed
- [ ] QA passed

---

**Created:** October 7, 2025 - 6:20 PM
**Last Updated:** October 7, 2025 - 10:55 PM
