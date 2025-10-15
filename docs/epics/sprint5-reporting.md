# Epic: Reporting & Analytics

**Epic ID:** Sprint5-Epic-04
**Sprint:** Sprint 5 - ISF Shop
**Date Created:** October 7, 2025
**Status:** Ready for Development
**Priority:** Medium

---

## Epic Overview

### Description
Build comprehensive analytics and reporting capabilities for the ISF Shop, providing admins with insights into coin economy health, product performance, student purchasing behavior, and transaction trends. This enables data-driven decision making for shop management and student engagement strategies.

### Business Value
- Provides visibility into coin circulation and economy health
- Identifies top-performing products for restocking decisions
- Reveals student purchasing patterns for catalog optimization
- Enables tracking of student engagement through spending metrics
- Supports data-driven reward strategy adjustments

### Success Criteria
- Shop analytics dashboard displays key metrics
- Transaction reports generate accurately
- Student leaderboards show top earners and spenders
- Product performance metrics available
- Reports exportable in PDF and CSV formats
- Dashboard load time < 2 seconds

---

## User Stories

### Story 11: Shop Analytics Dashboard
**Story ID:** Sprint5-Story-11
**File:** `docs/stories/sprint5-story-11-analytics-dashboard.md`
**Priority:** P2
**Estimate:** 2 days
**Dependencies:** Sprint5-Story-03, Sprint5-Story-05

**User Story:**
As an admin, I need a comprehensive analytics dashboard showing shop performance metrics so that I can make data-driven decisions about the shop.

**Key Features:**
- Total orders count (daily, weekly, monthly)
- Total revenue in coins (with trend chart)
- Top 10 products by sales volume
- Top 10 products by revenue
- Category performance breakdown
- Average order value
- Student participation rate (% who purchased)
- Stock turnover rate
- Date range selector (last 7/30/90 days, custom)

---

### Story 12: Transaction Reports
**Story ID:** Sprint5-Story-12
**File:** `docs/stories/sprint5-story-12-transaction-reports.md`
**Priority:** P2
**Estimate:** 1 day
**Dependencies:** Sprint5-Story-11

**User Story:**
As an admin, I need detailed transaction reports and student leaderboards so that I can track coin economy health and student engagement.

**Key Features:**
- Complete transaction log (all purchases)
- Filter by date range, student, product
- Top 10 coin earners leaderboard
- Top 10 coin spenders leaderboard
- Students with zero purchases (engagement)
- Export reports (PDF, CSV)
- Transaction drill-down (click for order details)
- Coin circulation metrics (earned vs spent ratio)

---

## Technical Overview

### Architecture Components

**Frontend:**
- `components/admin/shop/ShopAnalytics.jsx` - Main analytics dashboard
- `components/admin/shop/TransactionReport.jsx` - Transaction report view
- `components/admin/shop/charts/RevenueChart.jsx` - Chart.js revenue visualization
- `components/admin/shop/charts/TopProductsChart.jsx` - Product performance chart

**Backend:**
- `services/analyticsService.js` - Aggregation queries
- `controllers/shopController.js` - Analytics endpoints
- `routes/v2/shop.js` - Admin analytics routes

### Database Schema

**Analytics use existing collections:**
- `orders` - For revenue and sales metrics
- `coins` - For student leaderboards
- `shopItems` - For product performance
- `users` - For student participation

**Aggregation Indexes:**
```javascript
// Order indexes for analytics
OrderSchema.index({ placedAt: -1 });
OrderSchema.index({ status: 1, placedAt: -1 });
OrderSchema.index({ userId: 1, placedAt: -1 });

// Coin indexes for leaderboards
CoinSchema.index({ totalEarned: -1 });
CoinSchema.index({ totalSpent: -1 });
```

### API Endpoints

**Analytics Routes:**
- `GET /api/v2/shop/admin/analytics` - Dashboard metrics
  - Query params: `?startDate=2025-10-01&endDate=2025-10-07`
- `GET /api/v2/shop/admin/analytics/top-products` - Top products
- `GET /api/v2/shop/admin/analytics/revenue-trend` - Revenue over time
- `GET /api/v2/shop/admin/analytics/student-leaderboard` - Coin leaderboards
  - Query params: `?type=earners|spenders&limit=10`
- `GET /api/v2/shop/admin/reports/transactions` - Transaction report
  - Query params: `?startDate&endDate&studentId&productId`
- `GET /api/v2/shop/admin/reports/export` - Export report (CSV/PDF)

---

## Dependencies

### Internal Dependencies
- **Sprint 5 Orders:** Must have order data for analytics
- **Sprint 5 Products:** Must have product data for performance metrics
- **Sprint 1 Coins:** Must have coin transaction data for leaderboards

### Story Dependencies
- **Sprint5-Story-11 blocks Story-12:** Dashboard must exist before detailed reports

---

## Risks & Mitigations

**Risk 1: Analytics Query Performance (slow aggregations)**
**Mitigation:**
- Limit default date range to last 30 days
- Index all aggregation fields
- Cache analytics results (5 minutes)
- Run heavy queries asynchronously

**Risk 2: Large Dataset Export (CSV timeout)**
**Mitigation:**
- Limit exports to 10,000 records
- Implement streaming CSV generation
- Paginate large reports
- Provide date range filtering

**Risk 3: Real-time Dashboard Expectations**
**Mitigation:**
- Set expectation: Dashboard updates every 5 minutes
- Add "Last updated" timestamp
- Provide manual refresh button

---

## Testing Requirements

**Unit Tests:**
- Aggregation query logic
- Leaderboard calculation
- Revenue trend calculation
- CSV export generation

**Integration Tests:**
- Analytics endpoint with various date ranges
- Top products query with orders
- Student leaderboard with coin data
- Transaction report filtering

**E2E Tests:**
- Admin views analytics dashboard
- Admin exports transaction report
- Date range selector updates metrics

**Performance Tests:**
- Analytics query < 2s with 10,000 orders
- CSV export < 5s for 10,000 records
- Dashboard render < 1s

---

## Definition of Done

- [ ] All 2 stories in epic completed
- [ ] Analytics dashboard displays all metrics
- [ ] Transaction reports exportable
- [ ] Student leaderboards functional
- [ ] Tests passing (>70% coverage)
- [ ] Code reviewed (no critical issues)
- [ ] QA gate passed
- [ ] Dashboard load time < 2s
- [ ] Export works for large datasets
- [ ] Documentation updated

---

**Created:** October 7, 2025 - 6:20 PM
**Last Updated:** October 7, 2025 - 6:20 PM
