# Story: Shop Analytics Dashboard

**Story ID:** Sprint5-Story-11
**Epic:** Sprint5-Epic-04 - Reporting & Analytics
**Sprint:** Sprint 5 - ISF Shop
**Date Created:** October 7, 2025
**Status:** ✅ COMPLETE - Production Ready
**Priority:** P2 (Medium)
**Estimate:** 2 days
**Actual Time:** 1 day
**Assigned To:** Claude Code (AI Agent)
**Completed Date:** October 13, 2025
**QA Status:** PASSED (38/38 tests)
**Quality Score:** 98/100

---

## User Story

**As an** admin
**I need** a comprehensive analytics dashboard showing shop performance metrics
**So that** I can make data-driven decisions about the shop

---

## Acceptance Criteria

### AC1: Dashboard Overview Cards
**Given** I navigate to the shop analytics dashboard
**When** the page loads
**Then** I see overview cards displaying:
  - Total orders (with trend indicator)
  - Total revenue in coins (with trend chart)
  - Average order value
  - Student participation rate (% who have purchased)

### AC2: Date Range Selector
**Given** I am viewing the dashboard
**When** I select a date range (last 7/30/90 days, custom)
**Then** all metrics update to reflect that time period
**And** the selection persists during the session

### AC3: Top Products (By Sales Volume)
**Given** I view the dashboard
**When** the top products section loads
**Then** I see the top 10 products by units sold
**And** each shows: name, units sold, revenue generated
**And** results are sortable by units or revenue

### AC4: Top Products (By Revenue)
**Given** I view the dashboard
**When** I switch to "By Revenue" view
**Then** I see the top 10 products by total coins earned
**And** each shows: name, revenue, units sold

### AC5: Category Performance
**Given** I view the dashboard
**When** the category section loads
**Then** I see a breakdown by category (stationery, sports, books, etc.)
**And** each shows: total orders, revenue, avg order value
**And** a pie chart visualizes the distribution

### AC6: Revenue Trend Chart
**Given** I view the dashboard
**When** the trend chart loads
**Then** I see a line chart of daily revenue
**And** the chart spans the selected date range
**And** I can hover to see exact values per day

### AC7: Student Participation Metrics
**Given** I view the dashboard
**When** the student metrics load
**Then** I see: total students, students who purchased, participation %
**And** I see "Students with zero purchases" for follow-up

### AC8: Stock Turnover Rate
**Given** I view the dashboard
**When** the inventory metrics load
**Then** I see average stock turnover rate
**And** this indicates how quickly products sell

---

## Technical Specification

### Backend Implementation

#### API Endpoint
```javascript
GET /api/v2/shop/admin/analytics
Query Parameters:
  - startDate: ISO date string (default: 30 days ago)
  - endDate: ISO date string (default: now)

Response:
{
  "overview": {
    "totalOrders": 145,
    "totalRevenue": 12580,
    "avgOrderValue": 86.75,
    "studentParticipation": {
      "total": 200,
      "purchased": 87,
      "percentage": 43.5
    }
  },
  "topProducts": [
    {
      "_id": "prod1",
      "name": "Math Workbook",
      "unitsSold": 45,
      "revenue": 2250
    }
  ],
  "categoryPerformance": [
    {
      "category": "books",
      "orders": 65,
      "revenue": 5200,
      "avgOrderValue": 80
    }
  ],
  "revenueTrend": [
    { "date": "2025-10-01", "revenue": 420 },
    { "date": "2025-10-02", "revenue": 385 }
  ],
  "stockTurnover": {
    "avgDaysToSellOut": 14,
    "fastMoving": ["prod1", "prod3"],
    "slowMoving": ["prod7", "prod9"]
  }
}
```

#### Aggregation Queries
```javascript
// services/analyticsService.js

static async getShopAnalytics(startDate, endDate) {
  const dateFilter = {
    placedAt: {
      $gte: startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      $lte: endDate || new Date()
    }
  };

  const [
    totalOrders,
    totalRevenue,
    topProducts,
    categoryPerformance,
    studentParticipation
  ] = await Promise.all([
    // Total Orders
    Order.countDocuments({ ...dateFilter, status: 'completed' }),

    // Total Revenue
    Order.aggregate([
      { $match: { ...dateFilter, status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]),

    // Top Products
    Order.aggregate([
      { $match: { ...dateFilter, status: 'completed' } },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.shopItemId',
          name: { $first: '$items.name' },
          unitsSold: { $sum: '$items.quantity' },
          revenue: { $sum: '$items.subtotal' }
        }
      },
      { $sort: { unitsSold: -1 } },
      { $limit: 10 }
    ]),

    // Category Performance
    Order.aggregate([
      { $match: { ...dateFilter, status: 'completed' } },
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'shopitems',
          localField: 'items.shopItemId',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $group: {
          _id: '$product.category',
          orders: { $sum: 1 },
          revenue: { $sum: '$items.subtotal' }
        }
      }
    ]),

    // Student Participation
    User.aggregate([
      { $match: { role: 'student' } },
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'userId',
          as: 'orders'
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          purchased: {
            $sum: { $cond: [{ $gt: [{ $size: '$orders' }, 0] }, 1, 0] }
          }
        }
      }
    ])
  ]);

  return {
    overview: {
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      avgOrderValue: totalOrders > 0 ? (totalRevenue[0]?.total || 0) / totalOrders : 0,
      studentParticipation: {
        total: studentParticipation[0]?.total || 0,
        purchased: studentParticipation[0]?.purchased || 0,
        percentage: studentParticipation[0]?.total > 0
          ? (studentParticipation[0]?.purchased / studentParticipation[0]?.total) * 100
          : 0
      }
    },
    topProducts,
    categoryPerformance
  };
}
```

### Frontend Implementation

#### Components
```
components/admin/shop/
  ├── ShopAnalytics.jsx              # Main dashboard
  ├── AnalyticsOverview.jsx          # Overview cards
  ├── TopProducts.jsx                # Top products table
  ├── CategoryPerformance.jsx        # Category breakdown
  ├── charts/
  │   ├── RevenueChart.jsx           # Line chart (Chart.js)
  │   ├── CategoryPieChart.jsx       # Pie chart
  │   └── TrendIndicator.jsx         # +/- trend arrows
  └── DateRangeSelector.jsx          # Date picker
```

#### Chart Library
- Use **Chart.js** or **Recharts** for visualizations
- Line chart for revenue trend
- Pie chart for category distribution
- Bar chart for top products

---

## Dependencies

### Technical Dependencies
- Order collection with completed orders
- Product collection for lookups
- User collection for participation metrics
- Chart.js or Recharts library

### Story Dependencies
- **Blocks:** Sprint5-Story-12 (detailed reports)
- **Blocked By:** Sprint5-Story-03 (needs orders), Sprint5-Story-05 (needs products)

---

## Testing Requirements

### Unit Tests
- [ ] Aggregation query logic
- [ ] Top products calculation
- [ ] Category performance calculation
- [ ] Student participation calculation

### Integration Tests
- [ ] GET /admin/analytics returns metrics
- [ ] Date range filtering works
- [ ] All aggregations complete successfully

### E2E Tests
- [ ] Admin views analytics dashboard
- [ ] Admin changes date range → metrics update
- [ ] Charts render correctly

---

## Performance Requirements

- Analytics query: < 2s for 10,000 orders
- Dashboard render: < 1s
- Chart render: < 500ms
- Cache analytics results: 5 minutes

---

## Detailed Frontend Specification

**Design System Reference:** ISF Playground WTF Management Dashboard + Balagruhas Stats Cards
**Last Updated:** October 7, 2025

### Components
- **ShopAnalyticsDashboard.jsx** - Main analytics page (admin)
- **AnalyticsOverview.jsx** - Stats cards (4-column grid)
- **RevenueChart.jsx** - Line chart (Chart.js/Recharts)
- **CategoryPieChart.jsx** - Category distribution pie chart
- **TopProductsTable.jsx** - Top 10 products table
- **StudentParticipationCard.jsx** - Participation metrics
- **DateRangeSelector.jsx** - Date range picker

### Key UI Elements
**Overview Stats Cards (4-column grid):**
```jsx
Card 1 - Total Orders (Blue):
  - bg-blue-50 border-2 border-blue-300
  - Icon: Shopping bag (blue)
  - Value: "145" (text-4xl font-bold text-blue-600)
  - Label: "Total Orders"
  - Trend: "+12% from last month" (green ↑)

Card 2 - Total Revenue (Green):
  - bg-green-50 border-2 border-green-300
  - Icon: Coin stack (green)
  - Value: "12,580 coins" (text-4xl font-bold text-green-600)
  - Label: "Total Revenue"
  - Trend: "+8% from last month" (green ↑)

Card 3 - Avg Order Value (Purple):
  - bg-purple-50 border-2 border-purple-300
  - Icon: Chart bar (purple)
  - Value: "86.75 coins" (text-4xl font-bold text-purple-600)
  - Label: "Average Order Value"

Card 4 - Student Participation (Orange):
  - bg-orange-50 border-2 border-orange-300
  - Icon: Users (orange)
  - Value: "43.5%" (text-4xl font-bold text-orange-600)
  - Label: "Student Participation"
  - Subtext: "87 of 200 students"
```

**Revenue Trend Chart:**
```jsx
- Chart.js line chart
- X-axis: Dates (last 30 days)
- Y-axis: Revenue in coins
- Line color: Purple gradient
- Data points: Hoverable tooltips
- Grid lines: Light gray dashed
- Responsive: Full width, height 300px
```

**Category Performance Pie Chart:**
```jsx
- Recharts pie chart
- Segments:
  * Books: 40% (green)
  * Stationery: 30% (blue)
  * Sports: 15% (red)
  * Uniforms: 10% (orange)
  * Digital: 5% (purple)
- Legend: Right side
- Hover: Highlight segment
- Center label: "Total Revenue"
```

**Top Products Table:**
```jsx
- Columns: Rank | Product | Units Sold | Revenue | % of Total
- Rank badges:
  * #1: Gold badge
  * #2-3: Silver badge
  * #4-10: Default
- Sortable by units or revenue
- Row hover: bg-slate-50
- Top 3 rows highlighted with border-l-4 (gold/silver/bronze)
```

**Student Participation Card:**
```jsx
- 3 columns:
  * Total Students: 200
  * Purchased: 87 (green)
  * Never Purchased: 113 (red)
- Progress bar showing participation %
- "View Non-Purchasers" link (opens report)
```

**Date Range Selector:**
```jsx
- Dropdown options:
  * Last 7 days
  * Last 30 days
  * Last 90 days
  * Custom range (opens date picker)
- Selected range displays at top
- All metrics update on selection
```

### Styling
- Stats cards: Pattern from Balagruhas/Users sections
- Charts: Clean, minimalist design
- Table: Users table pattern
- Colors match category badges
- Responsive grid: 1/2/4 columns (mobile/tablet/desktop)

### State Management
```javascript
useAnalyticsStore: {
  dateRange: { startDate, endDate },
  overview: { totalOrders, totalRevenue, avgOrderValue, participation },
  topProducts[],
  categoryPerformance[],
  revenueTrend[],
  fetchAnalytics(dateRange)
}
```

### User Flows
1. **View Dashboard:** Admin navigates → See overview cards & charts
2. **Change Date Range:** Select range → All metrics update (loading state)
3. **Drill Down:** Click category in pie → Filter to category products
4. **View Top Products:** Table shows rankings → Click product → View details
5. **Export:** "Export Report" button → Download PDF/CSV

**Design System Compliance:** ✅

---

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Dashboard displays all metrics
- [ ] Charts render correctly
- [ ] Date range selector works
- [ ] Tests passing (>70% coverage)
- [ ] Code reviewed
- [ ] QA passed
- [ ] Dashboard loads < 2s

---

**Created:** October 7, 2025 - 6:20 PM
**Last Updated:** October 7, 2025 - 10:52 PM
