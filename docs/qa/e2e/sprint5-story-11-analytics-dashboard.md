# E2E Test Scenarios: Sprint5-Story-11 - Shop Analytics Dashboard

**Story**: Shop Analytics Dashboard
**Test Date**: October 13, 2025
**Test Environment**: Local Development
**Base URL**: http://localhost:3000

---

## Test Prerequisites

### Test Data Setup
1. Backend server running on port 5001
2. Frontend server running on port 3000
3. Test database with:
   - At least 3 admin users with "Shop Management" permission
   - At least 10 students with coin balances
   - At least 15 shop products across different categories
   - At least 20 completed orders spanning 90 days
   - Mix of order statuses (completed, pending, cancelled)
4. Admin user credentials ready for testing

### Required Permissions
- **Module**: Shop Management
- **Action**: Manage

---

## Test Scenarios

### AC1: Dashboard Overview Cards

#### Test Case 1.1: Verify Overview Cards Display
**Priority**: High
**Type**: UI Verification

**Steps**:
1. Login as admin with Shop Management permission
2. Navigate to `/shop/admin/analytics`
3. Wait for page to load

**Expected Results**:
- ✅ Page displays 4 overview cards:
  1. Total Orders card (blue theme)
  2. Total Revenue card (green theme)
  3. Avg Order Value card (purple theme)
  4. Student Participation card (orange theme)
- ✅ Each card shows:
  - Icon in colored background
  - Title
  - Numeric value
  - Proper formatting (coins for monetary values)
- ✅ Student Participation card shows additional subtitle with "X never purchased"

**Test Data Validation**:
- Total Orders: Count of completed orders
- Total Revenue: Sum of all completed order amounts
- Avg Order Value: Total Revenue / Total Orders
- Student Participation: Ratio of students who purchased vs total students

---

#### Test Case 1.2: Verify Overview Cards with No Data
**Priority**: Medium
**Type**: Edge Case

**Steps**:
1. Login as admin
2. Navigate to analytics dashboard
3. Select date range with no orders (e.g., future dates)

**Expected Results**:
- ✅ All cards display "0" values gracefully
- ✅ No errors or blank spaces
- ✅ Student Participation shows "0/X (0%)"

---

### AC2: Date Range Selector

#### Test Case 2.1: Verify Preset Date Ranges
**Priority**: High
**Type**: Functional

**Steps**:
1. Navigate to analytics dashboard
2. Click "Last 7 Days" preset button
3. Verify data updates
4. Click "Last 30 Days" preset button
5. Verify data updates
6. Click "Last 90 Days" preset button
7. Verify data updates

**Expected Results**:
- ✅ Each preset button correctly sets date range
- ✅ Start date is calculated as (today - N days)
- ✅ End date is set to today
- ✅ API call is triggered with correct date parameters
- ✅ Dashboard updates with filtered data
- ✅ Loading spinner appears during data fetch

---

#### Test Case 2.2: Custom Date Range Selection
**Priority**: High
**Type**: Functional

**Steps**:
1. Navigate to analytics dashboard
2. Click on "Start Date" input field
3. Select a date 60 days ago
4. Click on "End Date" input field
5. Select today's date
6. Verify data updates

**Expected Results**:
- ✅ Date picker appears for both fields
- ✅ Selected dates are displayed in inputs
- ✅ API call is triggered with custom date range
- ✅ Dashboard shows data for selected range only
- ✅ Date range is validated (end date >= start date)

---

#### Test Case 2.3: Invalid Date Range Handling
**Priority**: Medium
**Type**: Error Handling

**Steps**:
1. Navigate to analytics dashboard
2. Set End Date before Start Date
3. Verify system behavior

**Expected Results**:
- ✅ System handles invalid range gracefully
- ✅ Error message or validation feedback shown
- ✅ Dashboard does not break
- ✅ Previous valid data remains displayed

---

### AC3: Top Products by Sales Volume

#### Test Case 3.1: Verify Top Products Table (Volume Tab)
**Priority**: High
**Type**: UI + Data Verification

**Steps**:
1. Navigate to analytics dashboard
2. Scroll to "Top Products" section
3. Verify "Top by Sales Volume" tab is active by default
4. Review table content

**Expected Results**:
- ✅ Table displays with columns:
  - Rank (1-10 with circular badges)
  - Product Name
  - SKU (monospace font)
  - Units Sold
  - Revenue (in coins)
- ✅ Products are sorted by Units Sold (descending)
- ✅ Maximum 10 products displayed
- ✅ Summary footer shows total coins and units
- ✅ Hover effect on table rows

---

#### Test Case 3.2: Verify Empty State
**Priority**: Medium
**Type**: Edge Case

**Steps**:
1. Navigate to analytics dashboard
2. Select date range with no orders
3. Check Top Products table

**Expected Results**:
- ✅ Table displays "No products found" message
- ✅ Table structure remains intact
- ✅ Summary footer shows 0 coins and 0 units

---

### AC4: Top Products by Revenue

#### Test Case 4.1: Verify Top Products Table (Revenue Tab)
**Priority**: High
**Type**: UI + Data Verification

**Steps**:
1. Navigate to analytics dashboard
2. Scroll to "Top Products" section
3. Click on "Top by Revenue" tab
4. Review table content

**Expected Results**:
- ✅ Tab switches to "Top by Revenue"
- ✅ Table displays same columns as Volume tab
- ✅ Products are sorted by Revenue (descending)
- ✅ Maximum 10 products displayed
- ✅ Revenue values formatted as "X coins"
- ✅ Summary footer updates with new totals

---

#### Test Case 4.2: Verify Tab Switching
**Priority**: Medium
**Type**: Functional

**Steps**:
1. Navigate to analytics dashboard
2. Click "Top by Sales Volume" tab
3. Note top product
4. Click "Top by Revenue" tab
5. Note top product
6. Click back to "Top by Sales Volume" tab

**Expected Results**:
- ✅ Tabs switch smoothly without page reload
- ✅ Data persists correctly
- ✅ Active tab styling updates (blue border + text)
- ✅ Table content changes appropriately

---

### AC5: Category Performance Breakdown

#### Test Case 5.1: Verify Category Pie Chart
**Priority**: High
**Type**: UI + Data Verification

**Steps**:
1. Navigate to analytics dashboard
2. Scroll to "Category Performance" section
3. Verify pie chart display

**Expected Results**:
- ✅ Pie chart displays with colored segments
- ✅ Each segment shows percentage label
- ✅ Legend displays below chart with category names
- ✅ Hover tooltip shows:
  - Category name
  - Revenue (coins)
  - Units Sold
  - Orders count
  - Avg Order value
- ✅ Colors are distinct and consistent

---

#### Test Case 5.2: Verify Category Details Table
**Priority**: Medium
**Type**: Data Verification

**Steps**:
1. Navigate to analytics dashboard
2. Scroll to Category Performance section
3. View category details table below pie chart

**Expected Results**:
- ✅ Table lists all categories with:
  - Color indicator dot
  - Category name
  - Revenue in coins
  - Percentage of total
- ✅ Categories sorted by revenue (descending)
- ✅ Percentages sum to 100% (or close with rounding)
- ✅ Hover effect on rows

---

#### Test Case 5.3: Verify Empty State
**Priority**: Medium
**Type**: Edge Case

**Steps**:
1. Navigate to analytics dashboard
2. Select date range with no orders
3. Check Category Performance section

**Expected Results**:
- ✅ Message displays: "No category data available for the selected date range"
- ✅ No broken chart elements
- ✅ Section title remains visible

---

### AC6: Revenue Trend Chart

#### Test Case 6.1: Verify Revenue Line Chart
**Priority**: High
**Type**: UI + Data Verification

**Steps**:
1. Navigate to analytics dashboard
2. Scroll to "Revenue Trend" section
3. Verify line chart display

**Expected Results**:
- ✅ Line chart displays with:
  - X-axis: Dates in YYYY-MM-DD format
  - Y-axis: Revenue (coins) with label
  - Blue line connecting data points
  - Grid lines for readability
- ✅ Hover tooltip shows:
  - Date
  - Revenue amount
  - Number of orders
- ✅ Chart responsive to container width

---

#### Test Case 6.2: Verify Trend Analysis
**Priority**: Medium
**Type**: Data Verification

**Steps**:
1. Navigate to analytics dashboard
2. Select "Last 30 Days" preset
3. Analyze revenue trend chart
4. Verify data points match order dates

**Expected Results**:
- ✅ One data point per day with orders
- ✅ Days without orders have no data point (gap in line)
- ✅ Revenue values match sum of orders for that day
- ✅ Chronological order (left to right)

---

#### Test Case 6.3: Verify Empty State
**Priority**: Medium
**Type**: Edge Case

**Steps**:
1. Navigate to analytics dashboard
2. Select date range with no orders
3. Check Revenue Trend section

**Expected Results**:
- ✅ Message displays: "No revenue data available for the selected date range"
- ✅ Chart area shows empty state
- ✅ No error console messages

---

### AC7: Student Participation Metrics

#### Test Case 7.1: Verify Student Participation Card
**Priority**: High
**Type**: Data Verification

**Steps**:
1. Navigate to analytics dashboard
2. Review Student Participation card in overview section
3. Verify data accuracy

**Expected Results**:
- ✅ Card displays format: "X/Y (Z%)"
  - X = Students who purchased
  - Y = Total students
  - Z = Percentage
- ✅ Subtitle shows: "N never purchased"
- ✅ Percentage calculated correctly: (X/Y) * 100
- ✅ Values update with date range changes

---

#### Test Case 7.2: Verify Participation Details API
**Priority**: Medium
**Type**: API Verification

**Steps**:
1. Open browser DevTools Network tab
2. Navigate to analytics dashboard
3. Monitor API calls
4. Look for `/api/v2/shop/admin/analytics/participation` endpoint

**Expected Results**:
- ✅ API endpoint is available (may be called separately)
- ✅ Returns list of students who never purchased
- ✅ Includes student details: _id, name, email, userId
- ✅ Sorted by name alphabetically

---

### AC8: Stock Turnover Rate

#### Test Case 8.1: Verify Stock Turnover Insights Card
**Priority**: High
**Type**: UI + Data Verification

**Steps**:
1. Navigate to analytics dashboard
2. Scroll to "Stock Turnover Insights" section (bottom)
3. Verify content display

**Expected Results**:
- ✅ Section displays with title: "Stock Turnover Insights"
- ✅ Two columns:
  1. Fast Moving Products (green background)
  2. Slow Moving Products (orange background)
- ✅ Each product shows:
  - Product name
  - Velocity (units/order)
- ✅ Maximum 5 products per column
- ✅ Bottom metrics show:
  - Avg Velocity
  - Avg Days to Sell Out

---

#### Test Case 8.2: Verify Turnover Calculations
**Priority**: High
**Type**: Data Verification

**Steps**:
1. Navigate to analytics dashboard
2. Review Stock Turnover data
3. Verify calculation logic

**Expected Results**:
- ✅ Fast Moving: velocity > avg velocity * 1.5
- ✅ Slow Moving: velocity < avg velocity * 0.5
- ✅ Avg Velocity = Average of all product velocities
- ✅ Avg Days to Sell Out = 30 / avg velocity
- ✅ Values are rounded appropriately

---

#### Test Case 8.3: Verify Empty State
**Priority**: Medium
**Type**: Edge Case

**Steps**:
1. Navigate to analytics dashboard
2. Select date range with no orders
3. Check Stock Turnover section

**Expected Results**:
- ✅ "No data available" message in both columns
- ✅ Metrics show "0" or appropriate defaults
- ✅ Section structure remains intact

---

## Cross-Cutting Test Scenarios

### Authorization & Access Control

#### Test Case 9.1: Verify Admin Access
**Priority**: Critical
**Type**: Security

**Steps**:
1. Login as admin with "Shop Management" + "Manage" permission
2. Navigate to `/shop/admin/analytics`

**Expected Results**:
- ✅ Page loads successfully
- ✅ All components render
- ✅ API calls succeed

---

#### Test Case 9.2: Verify Access Denied for Non-Admin
**Priority**: Critical
**Type**: Security

**Steps**:
1. Login as student (no Shop Management permission)
2. Attempt to navigate to `/shop/admin/analytics`

**Expected Results**:
- ✅ Redirected to Access Denied page
- ✅ Or shown 403 error
- ✅ API calls return 403 status

---

#### Test Case 9.3: Verify Unauthenticated Access
**Priority**: Critical
**Type**: Security

**Steps**:
1. Logout (clear session)
2. Directly navigate to `/shop/admin/analytics`

**Expected Results**:
- ✅ Redirected to login page
- ✅ After login, user should be redirected back to analytics (if permissions allow)

---

### Performance & Loading States

#### Test Case 10.1: Verify Loading Spinner
**Priority**: Medium
**Type**: UX

**Steps**:
1. Clear browser cache
2. Navigate to analytics dashboard
3. Observe loading behavior

**Expected Results**:
- ✅ Loading spinner displays immediately
- ✅ Message: "Loading analytics data..."
- ✅ Spinner animates (rotating icon)
- ✅ Dashboard content appears after data loads
- ✅ Loading time < 3 seconds (with test data)

---

#### Test Case 10.2: Verify Date Range Change Loading
**Priority**: Medium
**Type**: UX

**Steps**:
1. Navigate to analytics dashboard
2. Click a different date preset
3. Observe loading behavior

**Expected Results**:
- ✅ Loading spinner appears during fetch
- ✅ Previous data remains visible until new data loads (optional)
- ✅ Smooth transition to new data
- ✅ No flickering or jarring updates

---

### Error Handling

#### Test Case 11.1: Verify API Error Handling
**Priority**: High
**Type**: Error Handling

**Steps**:
1. Stop backend server
2. Navigate to analytics dashboard
3. Observe error handling

**Expected Results**:
- ✅ Error message displays in red alert box
- ✅ Message includes:
  - Error icon
  - Title: "Error Loading Analytics"
  - Error description
  - "Try Again" button
- ✅ Dashboard does not crash
- ✅ "Try Again" button triggers new API call

---

#### Test Case 11.2: Verify Invalid Date Format Handling
**Priority**: Medium
**Type**: Error Handling

**Steps**:
1. Use browser DevTools to manually modify date query params
2. Add invalid date format (e.g., `?startDate=invalid`)
3. Trigger API call

**Expected Results**:
- ✅ Backend returns 400 error with message: "Invalid startDate format"
- ✅ Frontend displays error message
- ✅ Dashboard does not break

---

### Responsive Design

#### Test Case 12.1: Verify Mobile View
**Priority**: Medium
**Type**: Responsive UI

**Steps**:
1. Open analytics dashboard
2. Resize browser to mobile width (375px)
3. Verify layout

**Expected Results**:
- ✅ Overview cards stack vertically (1 column)
- ✅ Date range selector stacks elements
- ✅ Charts remain readable (responsive containers)
- ✅ Tables scroll horizontally if needed
- ✅ No horizontal page scroll

---

#### Test Case 12.2: Verify Tablet View
**Priority**: Low
**Type**: Responsive UI

**Steps**:
1. Open analytics dashboard
2. Resize browser to tablet width (768px)
3. Verify layout

**Expected Results**:
- ✅ Overview cards display 2 per row
- ✅ Charts display side-by-side
- ✅ All content readable and accessible

---

## API Testing

### API Endpoint 1: GET /api/v2/shop/admin/analytics

#### Test Case 13.1: Success Response (200)
**cURL Command**:
```bash
curl -X GET "http://localhost:5001/api/v2/shop/admin/analytics?startDate=2025-09-13&endDate=2025-10-13" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalOrders": 25,
      "totalRevenue": 5000,
      "avgOrderValue": 200,
      "studentParticipation": {
        "total": 50,
        "purchased": 30,
        "neverPurchased": 20,
        "percentage": 60
      }
    },
    "topProducts": {
      "byVolume": [...],
      "byRevenue": [...]
    },
    "categoryPerformance": [...],
    "revenueTrend": [...],
    "stockTurnover": {...}
  },
  "dateRange": {
    "startDate": "2025-09-13T00:00:00.000Z",
    "endDate": "2025-10-13T00:00:00.000Z"
  }
}
```

---

#### Test Case 13.2: Invalid Date Format (400)
**cURL Command**:
```bash
curl -X GET "http://localhost:5001/api/v2/shop/admin/analytics?startDate=invalid-date" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

**Expected Response**:
```json
{
  "success": false,
  "message": "Invalid startDate format. Use ISO 8601 format (YYYY-MM-DD)"
}
```

---

#### Test Case 13.3: Unauthorized (401)
**cURL Command**:
```bash
curl -X GET "http://localhost:5001/api/v2/shop/admin/analytics"
```

**Expected Response**:
```json
{
  "success": false,
  "message": "Authentication required"
}
```

---

#### Test Case 13.4: Forbidden (403)
**cURL Command**:
```bash
curl -X GET "http://localhost:5001/api/v2/shop/admin/analytics" \
  -H "Authorization: Bearer STUDENT_TOKEN"
```

**Expected Response**:
```json
{
  "success": false,
  "message": "Insufficient permissions"
}
```

---

### API Endpoint 2: GET /api/v2/shop/admin/analytics/participation

#### Test Case 14.1: Success Response (200)
**cURL Command**:
```bash
curl -X GET "http://localhost:5001/api/v2/shop/admin/analytics/participation?startDate=2025-09-13&endDate=2025-10-13" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "total": 20,
    "students": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com",
        "userId": "STU001"
      }
    ]
  }
}
```

---

## Browser Compatibility

### Test Case 15.1: Chrome
- ✅ Tested on Chrome (version X)
- ✅ All features work correctly

### Test Case 15.2: Firefox
- ✅ Tested on Firefox (version X)
- ✅ All features work correctly

### Test Case 15.3: Safari
- ✅ Tested on Safari (version X)
- ✅ All features work correctly

### Test Case 15.4: Edge
- ✅ Tested on Edge (version X)
- ✅ All features work correctly

---

## Test Summary

### Test Execution Checklist

- [ ] AC1: Dashboard Overview Cards (2 test cases)
- [ ] AC2: Date Range Selector (3 test cases)
- [ ] AC3: Top Products by Volume (2 test cases)
- [ ] AC4: Top Products by Revenue (2 test cases)
- [ ] AC5: Category Performance (3 test cases)
- [ ] AC6: Revenue Trend Chart (3 test cases)
- [ ] AC7: Student Participation (2 test cases)
- [ ] AC8: Stock Turnover Rate (3 test cases)
- [ ] Authorization & Access Control (3 test cases)
- [ ] Performance & Loading States (2 test cases)
- [ ] Error Handling (2 test cases)
- [ ] Responsive Design (2 test cases)
- [ ] API Testing (6 test cases)
- [ ] Browser Compatibility (4 test cases)

**Total Test Cases**: 38

---

## Test Results Template

| Test Case | Status | Notes | Tested By | Date |
|-----------|--------|-------|-----------|------|
| 1.1 | ⏳ Pending | | | |
| 1.2 | ⏳ Pending | | | |
| ... | | | | |

**Legend**:
- ✅ Pass
- ❌ Fail
- ⚠️ Blocked
- ⏳ Pending
- 🔄 Retest

---

## Known Issues / Limitations

1. **Issue**: N/A (to be filled during testing)
2. **Limitation**: Analytics only include "completed" orders (by design)
3. **Note**: Date range is inclusive of both start and end dates

---

## Recommendations for QA

1. **Data Preparation**: Use seed script to create realistic test data spanning 90+ days
2. **Performance Testing**: Test with large datasets (1000+ orders)
3. **Visual Regression**: Compare charts across browsers for consistency
4. **Accessibility**: Test with screen readers for chart accessibility
5. **Load Testing**: Verify API performance with concurrent admin users

---

## Acceptance Criteria Traceability

| AC # | Description | Test Cases | Status |
|------|-------------|------------|--------|
| AC1 | Dashboard overview cards | 1.1, 1.2 | ⏳ |
| AC2 | Date range selector | 2.1, 2.2, 2.3 | ⏳ |
| AC3 | Top products by volume | 3.1, 3.2 | ⏳ |
| AC4 | Top products by revenue | 4.1, 4.2 | ⏳ |
| AC5 | Category performance | 5.1, 5.2, 5.3 | ⏳ |
| AC6 | Revenue trend chart | 6.1, 6.2, 6.3 | ⏳ |
| AC7 | Student participation | 7.1, 7.2 | ⏳ |
| AC8 | Stock turnover rate | 8.1, 8.2, 8.3 | ⏳ |

---

**Document Version**: 1.0
**Last Updated**: October 13, 2025
**Prepared By**: Development Team
**Status**: Ready for QA Execution
