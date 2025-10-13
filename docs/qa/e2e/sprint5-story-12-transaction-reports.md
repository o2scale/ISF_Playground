# Sprint5-Story-12: Transaction Reports - E2E Test Scenarios

**Story**: Transaction Reports
**Story ID**: Sprint5-Story-12
**Epic**: Sprint5-Epic-04 - Reporting & Analytics
**Test Date**: October 13, 2025
**Tester**: QA Team
**Environment**: Local Development (http://localhost:3000)

---

## Test Environment Setup

### Prerequisites
1. Backend server running on port 5001
2. Frontend server running on port 3000
3. MongoDB connected with test data
4. Admin user account with "Shop Management" + "Manage" permissions
5. Test data includes:
   - At least 20 completed orders
   - At least 10 students with purchases
   - At least 5 students without purchases
   - Students with varying coin balances
   - Orders spanning multiple dates

### Test Data Requirements
- **Orders**: Minimum 50 orders (varied statuses: completed, cancelled)
- **Students**: Minimum 20 students
- **Coin Transactions**: Mix of earned/spent transactions
- **Date Range**: Orders from last 30+ days

---

## Test Execution Summary

**Total Test Cases**: 45
- **Acceptance Criteria Tests**: 28 tests
- **Cross-Cutting Tests**: 10 tests
- **API Tests**: 4 tests
- **Security Tests**: 3 tests

---

## AC1: Transaction Log

### Test Case 1.1: View Transaction Log
**Priority**: P0 (Critical)
**Objective**: Verify transaction log displays correctly

**Steps**:
1. Login as admin user
2. Navigate to `/shop/admin/reports`
3. Observe transaction log section

**Expected Results**:
- ✅ Transaction log table visible
- ✅ Table shows: Order #, Student, Date/Time, Total Coins, Items, Status, Actions
- ✅ Transactions are sorted by date (newest first)
- ✅ Default 20 transactions per page displayed
- ✅ Pagination controls visible if > 20 transactions

**Test Data**:
- Admin credentials
- At least 25 orders in database

**Pass Criteria**: All table columns display, data is formatted correctly

---

### Test Case 1.2: Filter by Date Range
**Priority**: P0 (Critical)
**Objective**: Verify date range filter updates results

**Steps**:
1. On transaction log page, click "Filters" button
2. Set Start Date: 7 days ago
3. Set End Date: Today
4. Observe results

**Expected Results**:
- ✅ Only transactions within date range displayed
- ✅ Transaction count updates
- ✅ Pagination resets to page 1
- ✅ Date filter values persist

**Test Data**:
- Orders from 30 days ago and 5 days ago
- Expected: Only orders from last 7 days shown

**Pass Criteria**: Only transactions within selected date range display

---

### Test Case 1.3: Filter by Status
**Priority**: P1 (High)
**Objective**: Verify status filter works

**Steps**:
1. Open filters panel
2. Select "Completed" from Status dropdown
3. Observe results
4. Change to "Cancelled"
5. Observe results

**Expected Results**:
- ✅ Only completed orders shown after step 2
- ✅ Only cancelled orders shown after step 4
- ✅ Filter state updates in UI
- ✅ "All Statuses" shows all orders

**Test Data**:
- Mix of completed and cancelled orders

**Pass Criteria**: Filter correctly limits results by status

---

### Test Case 1.4: Search by Student Name
**Priority**: P1 (High)
**Objective**: Verify search functionality with debounce

**Steps**:
1. Type student name in search box: "Raj"
2. Wait 500ms
3. Observe results
4. Clear search
5. Observe results

**Expected Results**:
- ✅ Search debounces (doesn't search on every keystroke)
- ✅ Only transactions for "Raj*" students displayed
- ✅ Clearing search shows all transactions again
- ✅ Search is case-insensitive

**Test Data**:
- Student named "Rajesh Kumar"
- Student named "Priya Sharma"

**Pass Criteria**: Search filters transactions correctly

---

### Test Case 1.5: Pagination Navigation
**Priority**: P1 (High)
**Objective**: Verify pagination works correctly

**Steps**:
1. Ensure > 20 transactions exist
2. Note "Page 1 of X" indicator
3. Click "Next" button
4. Observe page 2 results
5. Click "Previous" button
6. Observe page 1 results

**Expected Results**:
- ✅ Page 2 shows transactions 21-40
- ✅ "Previous" button disabled on page 1
- ✅ "Next" button disabled on last page
- ✅ Page indicator updates correctly
- ✅ Results count shows "Showing X to Y of Z transactions"

**Test Data**:
- At least 45 transactions

**Pass Criteria**: Pagination navigates correctly through all pages

---

### Test Case 1.6: View Transaction Details
**Priority**: P0 (Critical)
**Objective**: Verify clicking transaction navigates to order detail

**Steps**:
1. Click on any transaction row
2. Observe navigation

**Alternative**:
1. Click "View Details" button in Actions column
2. Observe navigation

**Expected Results**:
- ✅ Navigates to `/shop/orders/{orderNumber}`
- ✅ Order detail page loads
- ✅ Correct order displayed

**Test Data**:
- Order number: ORD-20251013-00001

**Pass Criteria**: Clicking transaction opens correct order detail page

---

### Test Case 1.7: Empty State
**Priority**: P2 (Medium)
**Objective**: Verify empty state when no transactions match filters

**Steps**:
1. Apply date filter: 2 years ago to 1 year ago
2. Observe empty state

**Expected Results**:
- ✅ Empty state icon displayed
- ✅ Message: "No transactions found"
- ✅ Suggestion: "Try adjusting your filters"
- ✅ No error messages

**Pass Criteria**: Friendly empty state displayed

---

## AC2: Top Coin Earners Leaderboard

### Test Case 2.1: View Top Earners Tab
**Priority**: P0 (Critical)
**Objective**: Verify top earners leaderboard displays

**Steps**:
1. On reports page, find "Student Leaderboard" section
2. Click "Top Earners" tab
3. Observe leaderboard

**Expected Results**:
- ✅ Top 10 students by total earned displayed
- ✅ Columns: Rank, Student, Total Earned, Current Balance, Last Activity
- ✅ Rank badges displayed (🥇 gold, 🥈 silver, 🥉 bronze)
- ✅ Sorted by Total Earned descending
- ✅ Top 3 rows highlighted with colored left border

**Test Data**:
- At least 10 students with varied earned amounts

**Pass Criteria**: Leaderboard shows correct top 10 earners

---

### Test Case 2.2: Medal Badges Display
**Priority**: P2 (Medium)
**Objective**: Verify rank badges are correct

**Steps**:
1. View Top Earners tab
2. Check rank 1, 2, 3 badges

**Expected Results**:
- ✅ Rank 1: Gold medal icon, yellow badge
- ✅ Rank 2: Silver medal icon, gray badge
- ✅ Rank 3: Bronze medal icon, orange badge
- ✅ Ranks 4-10: Number only, no medal

**Pass Criteria**: Medal badges match rank correctly

---

### Test Case 2.3: Export Top Earners CSV
**Priority**: P1 (High)
**Objective**: Verify CSV export for top earners

**Steps**:
1. On Top Earners tab, click "Export CSV" button
2. Wait for download
3. Open CSV file

**Expected Results**:
- ✅ CSV file downloads with filename: `earners-leaderboard-YYYY-MM-DD.csv`
- ✅ CSV contains headers: Rank, Student Name, Email, Total Earned, Total Spent, Current Balance, Purchase Count, Avg Order Value
- ✅ CSV contains 10 rows (or fewer if < 10 students)
- ✅ Data matches displayed leaderboard

**Test Data**:
- Top 10 earners with known values

**Pass Criteria**: CSV exports correctly with all data

---

### Test Case 2.4: Leaderboard Sorting Accuracy
**Priority**: P0 (Critical)
**Objective**: Verify students are sorted by total earned

**Steps**:
1. View Top Earners tab
2. Note Total Earned values for each student
3. Verify descending order

**Expected Results**:
- ✅ Student at rank 1 has highest Total Earned
- ✅ Each subsequent student has equal or lower Total Earned
- ✅ Ties are handled consistently

**Test Data**:
- Known student earnings (e.g., Student A: 1500, Student B: 1200, Student C: 1200)

**Pass Criteria**: Leaderboard is correctly sorted

---

## AC3: Top Coin Spenders Leaderboard

### Test Case 3.1: View Top Spenders Tab
**Priority**: P0 (Critical)
**Objective**: Verify top spenders leaderboard displays

**Steps**:
1. On Student Leaderboard section, click "Top Spenders" tab
2. Observe leaderboard

**Expected Results**:
- ✅ Top 10 students by total spent displayed
- ✅ Columns: Rank, Student, Total Spent, Purchase Count, Avg Order Value
- ✅ Rank badges displayed (same as earners)
- ✅ Sorted by Total Spent descending
- ✅ Top 3 rows highlighted

**Test Data**:
- At least 10 students with purchases

**Pass Criteria**: Leaderboard shows correct top 10 spenders

---

### Test Case 3.2: Purchase Count Accuracy
**Priority**: P1 (High)
**Objective**: Verify purchase count is correct

**Steps**:
1. View Top Spenders tab
2. Note purchase count for top student
3. Navigate to that student's order history
4. Count completed orders
5. Compare counts

**Expected Results**:
- ✅ Purchase count matches actual completed orders
- ✅ Cancelled orders not counted
- ✅ Pending orders not counted

**Test Data**:
- Student with 5 completed, 2 cancelled orders
- Expected Purchase Count: 5

**Pass Criteria**: Purchase count is accurate

---

### Test Case 3.3: Average Order Value Calculation
**Priority**: P1 (High)
**Objective**: Verify avg order value is correct

**Steps**:
1. View Top Spenders tab
2. Note Total Spent and Purchase Count for a student
3. Calculate: Total Spent / Purchase Count
4. Compare to displayed Avg Order Value

**Expected Results**:
- ✅ Avg Order Value = Total Spent / Purchase Count
- ✅ Value rounded to 2 decimal places
- ✅ Displayed in "coins" format

**Test Data**:
- Student: Total Spent = 850, Purchase Count = 10
- Expected Avg: 85.00 coins

**Pass Criteria**: Average order value is calculated correctly

---

### Test Case 3.4: Export Top Spenders CSV
**Priority**: P1 (High)
**Objective**: Verify CSV export for top spenders

**Steps**:
1. On Top Spenders tab, click "Export CSV" button
2. Wait for download
3. Open CSV file

**Expected Results**:
- ✅ CSV file downloads with filename: `spenders-leaderboard-YYYY-MM-DD.csv`
- ✅ CSV contains appropriate headers
- ✅ CSV contains up to 10 rows
- ✅ Data matches displayed leaderboard

**Pass Criteria**: CSV exports correctly

---

### Test Case 3.5: Tab Switching
**Priority**: P1 (High)
**Objective**: Verify switching between earners and spenders tabs

**Steps**:
1. View Top Earners tab
2. Click Top Spenders tab
3. Click Top Earners tab again

**Expected Results**:
- ✅ Tab switches smoothly
- ✅ Correct data displayed for each tab
- ✅ Active tab indicator updates
- ✅ No loading delay

**Pass Criteria**: Tabs switch correctly

---

## AC4: Zero Purchases Report

### Test Case 4.1: View Zero Purchases Report
**Priority**: P0 (Critical)
**Objective**: Verify zero purchases report displays

**Steps**:
1. On reports page, find "Zero Purchases Report" section
2. Observe report

**Expected Results**:
- ✅ Red warning banner at top showing count
- ✅ Message: "{X} students have never made a purchase"
- ✅ Table shows: Student, Balance, Last Activity, Balagruha, Coach, Actions
- ✅ Students sorted by balance descending (high balances first)

**Test Data**:
- At least 5 students with zero purchases
- Mix of high and low balances

**Pass Criteria**: Report displays all students with zero purchases

---

### Test Case 4.2: High Balance Highlighting
**Priority**: P1 (High)
**Objective**: Verify students with balance > 100 are highlighted

**Steps**:
1. View Zero Purchases Report
2. Check students with balance > 100 coins

**Expected Results**:
- ✅ Row has yellow background (bg-yellow-50)
- ✅ Yellow left border (border-l-4 border-yellow-400)
- ✅ "High Balance" badge displayed with dollar icon
- ✅ Balance displayed in yellow color

**Test Data**:
- Student A: 150 coins (should be highlighted)
- Student B: 50 coins (should NOT be highlighted)

**Pass Criteria**: Students with balance > 100 are highlighted

---

### Test Case 4.3: Summary Cards
**Priority**: P2 (Medium)
**Objective**: Verify summary cards display correct metrics

**Steps**:
1. View Zero Purchases Report
2. Scroll to footer
3. Check 3 summary cards

**Expected Results**:
- ✅ Card 1: "Never Purchased" - Shows count of students
- ✅ Card 2: "Total Balance (Unused)" - Sum of all balances
- ✅ Card 3: "High Balance (>100)" - Count of students with balance > 100
- ✅ Icons: UserX, DollarSign, AlertTriangle

**Test Data**:
- 5 students: balances 150, 120, 80, 50, 30
- Expected: Card 2 shows 430 coins, Card 3 shows 2 students

**Pass Criteria**: Summary cards show correct calculated values

---

### Test Case 4.4: Export Zero Purchases CSV
**Priority**: P1 (High)
**Objective**: Verify CSV export

**Steps**:
1. On Zero Purchases Report, click "Export" button (top right)
2. Wait for download
3. Open CSV file

**Expected Results**:
- ✅ CSV downloads with filename: `zero-purchases-report-YYYY-MM-DD.csv`
- ✅ Headers: Student Name, Email, Balance, Last Activity, Balagruha, Coach
- ✅ All students with zero purchases included
- ✅ Data matches displayed report

**Pass Criteria**: CSV exports correctly

---

### Test Case 4.5: Empty State (All Students Purchased)
**Priority**: P2 (Medium)
**Objective**: Verify empty state when all students have purchased

**Setup**: Ensure all students have at least 1 completed order

**Steps**:
1. View Zero Purchases Report

**Expected Results**:
- ✅ Empty state icon displayed (UserX)
- ✅ Message: "All students have made purchases!"
- ✅ Subtext: "This is great news for shop engagement"
- ✅ No warning banner
- ✅ No table displayed

**Pass Criteria**: Friendly empty state when no zero-purchase students

---

## AC5: Transaction Drill-Down

### Test Case 5.1: Click Transaction Row
**Priority**: P0 (Critical)
**Objective**: Verify clicking transaction row opens order detail

**Steps**:
1. On transaction log, click any transaction row
2. Observe navigation

**Expected Results**:
- ✅ Navigates to `/shop/orders/{orderNumber}`
- ✅ Order detail page displays
- ✅ Correct order information shown
- ✅ Order number matches clicked transaction

**Test Data**:
- Order: ORD-20251013-00001

**Pass Criteria**: Correct order detail page opens

---

### Test Case 5.2: View Details Button
**Priority**: P1 (High)
**Objective**: Verify "View Details" button works

**Steps**:
1. Hover over transaction row
2. Click "View Details" button in Actions column
3. Observe navigation

**Expected Results**:
- ✅ Same behavior as clicking row
- ✅ Button is clearly visible
- ✅ Button changes color on hover

**Pass Criteria**: View Details button navigates correctly

---

## AC6: Export Reports

### Test Case 6.1: Export Transaction Log CSV
**Priority**: P1 (High)
**Objective**: Verify transaction log export

**Steps**:
1. Apply filters (date range, status)
2. Click export button (if available, or use API directly)
3. Wait for download
4. Open CSV

**Expected Results**:
- ✅ CSV downloads
- ✅ Contains only filtered transactions
- ✅ Headers: Order Number, Student Name, Student Email, Date, Total Amount (coins), Item Count, Status
- ✅ Up to 10,000 records

**Note**: UI export button may not be implemented yet (check story spec)

**Pass Criteria**: CSV export works with filters applied

---

### Test Case 6.2: Export with No Results
**Priority**: P2 (Medium)
**Objective**: Verify export behavior when no results match filters

**Steps**:
1. Apply filters that result in no transactions
2. Attempt to export

**Expected Results**:
- ✅ Export succeeds
- ✅ CSV contains only headers
- ✅ Or: Warning message "No data to export"

**Pass Criteria**: Graceful handling of empty export

---

### Test Case 6.3: Export Large Dataset
**Priority**: P1 (High)
**Objective**: Verify export handles large datasets

**Setup**: Ensure > 1000 transactions exist

**Steps**:
1. Export all transactions (no filters)
2. Wait for download
3. Open CSV and check row count

**Expected Results**:
- ✅ Export completes within 10 seconds
- ✅ CSV contains up to 10,000 records (backend limit)
- ✅ No timeout errors
- ✅ File is well-formed (no truncation)

**Pass Criteria**: Large exports work without errors

---

## AC7: Coin Circulation Metrics

### Test Case 7.1: View Coin Economy Health Dashboard
**Priority**: P0 (Critical)
**Objective**: Verify coin economy health displays

**Steps**:
1. On reports page, find "Coin Economy Health" section at top
2. Observe dashboard

**Expected Results**:
- ✅ Health status banner displayed (green/orange/red)
- ✅ 3 metric cards visible:
  - Total in Circulation (purple)
  - Earned/Spent Ratio (color-coded)
  - Average Balance (blue)
- ✅ Detailed metrics panel (Total Earned, Total Spent, Active Accounts)
- ✅ 30-day circulation trend chart (if data exists)
- ✅ Recommendations panel (if warnings exist)

**Pass Criteria**: All economy health components display

---

### Test Case 7.2: Health Status - Healthy (Green)
**Priority**: P1 (High)
**Objective**: Verify healthy status displays correctly

**Setup**: Ensure Earned/Spent ratio is 1.0-1.5

**Steps**:
1. View Coin Economy Health section
2. Check health status banner

**Expected Results**:
- ✅ Banner background: green (bg-green-50)
- ✅ Banner border: green (border-green-500)
- ✅ Icon: CheckCircle (green)
- ✅ Message: "Coin economy is healthy"
- ✅ Subtext: "Earned/Spent Ratio: X.XX (Ideal: 1.0-1.5)"

**Test Data**:
- Total Earned: 10,000 coins
- Total Spent: 8,000 coins
- Ratio: 1.25 (healthy)

**Pass Criteria**: Green healthy status displays

---

### Test Case 7.3: Health Status - Warning (Orange)
**Priority**: P1 (High)
**Objective**: Verify warning status for high ratio

**Setup**: Ensure Earned/Spent ratio > 1.5

**Steps**:
1. View Coin Economy Health section
2. Check health status banner

**Expected Results**:
- ✅ Banner background: orange (bg-orange-50)
- ✅ Banner border: orange (border-orange-500)
- ✅ Icon: AlertCircle (orange)
- ✅ Message: "Too many coins in circulation"
- ✅ Subtext shows ratio > 1.5

**Test Data**:
- Total Earned: 10,000 coins
- Total Spent: 6,000 coins
- Ratio: 1.67 (warning)

**Pass Criteria**: Orange warning status displays

---

### Test Case 7.4: Health Status - Critical (Red)
**Priority**: P1 (High)
**Objective**: Verify critical status for low ratio

**Setup**: Ensure Earned/Spent ratio < 0.8

**Steps**:
1. View Coin Economy Health section
2. Check health status banner

**Expected Results**:
- ✅ Banner background: red (bg-red-50)
- ✅ Banner border: red (border-red-500)
- ✅ Icon: XCircle (red)
- ✅ Message: "Coins being spent too quickly"
- ✅ Subtext shows ratio < 0.8

**Test Data**:
- Total Earned: 10,000 coins
- Total Spent: 13,000 coins
- Ratio: 0.77 (critical)

**Pass Criteria**: Red critical status displays

---

### Test Case 7.5: Metric Cards Values
**Priority**: P1 (High)
**Objective**: Verify metric cards show correct values

**Steps**:
1. View Coin Economy Health section
2. Note values in 3 metric cards
3. Verify calculations manually or via API

**Expected Results**:
- ✅ Total in Circulation = Sum of all student balances
- ✅ Earned/Spent Ratio = Total Earned / Total Spent
- ✅ Average Balance = Total in Circulation / Total Accounts
- ✅ Values rounded to 2 decimal places
- ✅ "coins" label displayed

**Test Data**:
- 10 students, balances: 100 each = 1000 total
- Total Earned: 5000, Total Spent: 4000
- Expected: Circulation=1000, Ratio=1.25, Avg=100

**Pass Criteria**: Metric cards show correct calculated values

---

### Test Case 7.6: 30-Day Circulation Trend Chart
**Priority**: P1 (High)
**Objective**: Verify trend chart displays correctly

**Steps**:
1. View Coin Economy Health section
2. Scroll to trend chart
3. Observe chart

**Expected Results**:
- ✅ Line chart displayed (Recharts)
- ✅ X-axis: Dates (last 30 days)
- ✅ Y-axis: Coin amounts
- ✅ Two lines: Earned (green), Spent (red)
- ✅ Tooltip shows values on hover
- ✅ Legend displays
- ✅ Chart is responsive

**Test Data**:
- Transactions spanning 30+ days

**Pass Criteria**: Chart renders and displays correct data

---

### Test Case 7.7: Recommendations/Warnings Display
**Priority**: P2 (Medium)
**Objective**: Verify warnings display when economy is imbalanced

**Setup**: Create conditions for warnings (e.g., ratio > 1.5, avgBalance > 500)

**Steps**:
1. View Coin Economy Health section
2. Scroll to recommendations panel

**Expected Results**:
- ✅ Recommendations panel visible
- ✅ Warning messages displayed:
  - "Earned/Spent ratio is high - consider adding more attractive products or reducing prices" (if ratio > 1.5)
  - "Average balance is high - students may be hoarding coins" (if avgBalance > 500)
- ✅ Each warning has AlertCircle icon (yellow)
- ✅ Yellow background (bg-yellow-50)

**Test Data**:
- Ratio: 2.0, Avg Balance: 600

**Pass Criteria**: Appropriate warnings display based on metrics

---

### Test Case 7.8: Detailed Metrics Panel
**Priority**: P2 (Medium)
**Objective**: Verify detailed metrics panel shows all data

**Steps**:
1. View Coin Economy Health section
2. Find detailed metrics panel (gray background)

**Expected Results**:
- ✅ 3 metrics displayed:
  - Total Earned (green)
  - Total Spent (red)
  - Active Accounts (gray)
- ✅ Values formatted correctly
- ✅ "coins" label on earned/spent

**Pass Criteria**: All detailed metrics display

---

## Cross-Cutting Tests

### Test Case CC-1: Page Load Performance
**Priority**: P1 (High)
**Objective**: Verify page loads within acceptable time

**Steps**:
1. Clear browser cache
2. Navigate to `/shop/admin/reports`
3. Measure load time

**Expected Results**:
- ✅ Page loads in < 3 seconds
- ✅ All components render
- ✅ No JavaScript errors in console

**Pass Criteria**: Page load time < 3s

---

### Test Case CC-2: Responsive Design
**Priority**: P2 (Medium)
**Objective**: Verify page works on different screen sizes

**Steps**:
1. Open reports page
2. Resize browser to mobile (375px)
3. Resize to tablet (768px)
4. Resize to desktop (1920px)

**Expected Results**:
- ✅ Mobile: Stacked layout, readable text, usable buttons
- ✅ Tablet: 2-column grid for cards
- ✅ Desktop: Full 3-4 column layout
- ✅ No horizontal scrolling
- ✅ All content accessible

**Pass Criteria**: Page is responsive and usable on all sizes

---

### Test Case CC-3: Loading States
**Priority**: P2 (Medium)
**Objective**: Verify loading spinner displays

**Steps**:
1. Throttle network to Slow 3G
2. Navigate to reports page
3. Observe loading state

**Expected Results**:
- ✅ Loading spinner displayed (Loader icon)
- ✅ Message: "Loading transaction reports..."
- ✅ Centered on screen
- ✅ No content flicker when data loads

**Pass Criteria**: Loading state displays during data fetch

---

### Test Case CC-4: Error State
**Priority**: P1 (High)
**Objective**: Verify error state displays on API failure

**Setup**: Stop backend server temporarily

**Steps**:
1. Navigate to reports page
2. Observe error state
3. Start backend server
4. Click "Retry" button

**Expected Results**:
- ✅ Error icon displayed (FileText red)
- ✅ Message: "Error loading reports"
- ✅ Error detail shown
- ✅ "Retry" button displayed
- ✅ Retry button reloads data successfully

**Pass Criteria**: Error state handles failures gracefully

---

### Test Case CC-5: Empty States
**Priority**: P2 (Medium)
**Objective**: Verify empty states for all components

**Setup**: Clear all orders/transactions from database

**Steps**:
1. View reports page with no data

**Expected Results**:
- ✅ Transaction log: "No transactions found"
- ✅ Leaderboards: "No data available"
- ✅ Zero purchases: "All students have made purchases!"
- ✅ Each empty state has appropriate icon and message

**Pass Criteria**: All empty states display correctly

---

### Test Case CC-6: Browser Compatibility
**Priority**: P1 (High)
**Objective**: Verify page works in different browsers

**Browsers**: Chrome, Firefox, Safari, Edge

**Steps**:
1. Open reports page in each browser
2. Test key functionality:
   - View all reports
   - Apply filters
   - Export CSV
   - Click transactions

**Expected Results**:
- ✅ Page renders correctly in all browsers
- ✅ All functionality works
- ✅ No console errors
- ✅ Charts render properly

**Pass Criteria**: Full compatibility with listed browsers

---

### Test Case CC-7: Keyboard Navigation
**Priority**: P2 (Medium)
**Objective**: Verify keyboard accessibility

**Steps**:
1. Navigate to reports page
2. Use Tab key to navigate through interactive elements
3. Use Enter key to activate buttons/links

**Expected Results**:
- ✅ All interactive elements focusable
- ✅ Focus indicator visible
- ✅ Logical tab order
- ✅ Enter key activates buttons
- ✅ Escape key closes modals (if any)

**Pass Criteria**: Full keyboard navigation support

---

### Test Case CC-8: Concurrent Filters
**Priority**: P1 (High)
**Objective**: Verify multiple filters work together

**Steps**:
1. Apply date range filter: Last 7 days
2. Apply status filter: Completed
3. Enter search: "Raj"
4. Observe results

**Expected Results**:
- ✅ Only transactions matching ALL filters displayed
- ✅ Results: Last 7 days AND completed AND student name contains "Raj"
- ✅ Filter state maintained
- ✅ Pagination resets

**Pass Criteria**: Multiple filters work correctly together

---

### Test Case CC-9: Session Persistence
**Priority**: P2 (Medium)
**Objective**: Verify filter state persists during session

**Steps**:
1. Apply filters to transaction log
2. Navigate to different page (e.g., /shop)
3. Navigate back to /shop/admin/reports
4. Check filter state

**Expected Results**:
- ⚠️ Filters may reset (session state not implemented)
- OR ✅ Filters persist if session storage used

**Pass Criteria**: Behavior is consistent and documented

---

### Test Case CC-10: Concurrent Users
**Priority**: P2 (Medium)
**Objective**: Verify multiple admins can use reports simultaneously

**Setup**: Open reports page in 2 different browsers

**Steps**:
1. Browser 1: View reports
2. Browser 2: View reports
3. Browser 1: Export CSV
4. Browser 2: Filter transactions

**Expected Results**:
- ✅ Both users can access reports independently
- ✅ No conflicts or errors
- ✅ Data is consistent across sessions

**Pass Criteria**: Multiple concurrent users work correctly

---

## API Tests

### Test Case API-1: Transaction Log Endpoint
**Priority**: P1 (High)
**Objective**: Verify transaction log API endpoint

**Request**:
```
GET /api/v2/shop/admin/reports/transactions?page=1&limit=20&status=completed
```

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "transactions": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 145,
      "pages": 8
    }
  }
}
```

**Validations**:
- ✅ Status code: 200
- ✅ Response matches schema
- ✅ Pagination is correct
- ✅ Transactions are filtered by status

**Pass Criteria**: API returns correct data and structure

---

### Test Case API-2: Leaderboard Endpoint
**Priority**: P1 (High)
**Objective**: Verify leaderboard API endpoint

**Request**:
```
GET /api/v2/shop/admin/reports/leaderboard?type=spenders&limit=10
```

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "type": "spenders",
    "leaderboard": [
      {
        "rank": 1,
        "userId": "...",
        "studentName": "...",
        "email": "...",
        "totalSpent": 850,
        "purchaseCount": 12,
        "avgOrderValue": 70.83,
        ...
      }
    ]
  }
}
```

**Validations**:
- ✅ Status code: 200
- ✅ Leaderboard is sorted correctly
- ✅ Ranks are 1-10
- ✅ All required fields present

**Pass Criteria**: API returns correct leaderboard data

---

### Test Case API-3: Zero Purchases Endpoint
**Priority**: P1 (High)
**Objective**: Verify zero purchases API endpoint

**Request**:
```
GET /api/v2/shop/admin/reports/zero-purchases
```

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "students": [...],
    "count": 5
  }
}
```

**Validations**:
- ✅ Status code: 200
- ✅ Only students with zero purchases included
- ✅ Count matches array length

**Pass Criteria**: API returns correct zero-purchase students

---

### Test Case API-4: Coin Economy Endpoint
**Priority**: P1 (High)
**Objective**: Verify coin economy health API endpoint

**Request**:
```
GET /api/v2/shop/admin/reports/coin-economy
```

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "totalInCirculation": 45800,
    "totalEarned": 125000,
    "totalSpent": 79200,
    "earnedVsSpentRatio": 1.58,
    "avgBalance": 229,
    "totalAccounts": 200,
    "warnings": [...],
    "circulationTrend": [...]
  }
}
```

**Validations**:
- ✅ Status code: 200
- ✅ All metrics present
- ✅ Calculations are correct
- ✅ Warnings array exists (may be empty)

**Pass Criteria**: API returns complete economy health data

---

## Security Tests

### Test Case SEC-1: Authentication Required
**Priority**: P0 (Critical)
**Objective**: Verify unauthenticated users cannot access reports

**Steps**:
1. Logout
2. Navigate to `/shop/admin/reports`

**Expected Results**:
- ✅ Redirects to `/login`
- ✅ Or displays "Access Denied" message
- ✅ No report data exposed

**Pass Criteria**: Unauthenticated access is blocked

---

### Test Case SEC-2: Admin-Only Authorization
**Priority**: P0 (Critical)
**Objective**: Verify non-admin users cannot access reports

**Setup**: Login as student or coach (non-admin)

**Steps**:
1. Navigate to `/shop/admin/reports`

**Expected Results**:
- ✅ Redirects to `/access-denied`
- ✅ Or displays "You don't have permission" message
- ✅ No report data exposed

**Pass Criteria**: Non-admin access is blocked

---

### Test Case SEC-3: API Authorization
**Priority**: P0 (Critical)
**Objective**: Verify API endpoints require admin authorization

**Request**:
```
GET /api/v2/shop/admin/reports/transactions
Authorization: Bearer <student-token>
```

**Expected Response**:
```json
{
  "success": false,
  "message": "Insufficient permissions"
}
```

**Validations**:
- ✅ Status code: 403 (Forbidden)
- ✅ Error message is clear
- ✅ No data leaked

**Pass Criteria**: API blocks non-admin access

---

## Test Execution Checklist

### Pre-Testing
- [ ] Backend server running (port 5001)
- [ ] Frontend server running (port 3000)
- [ ] Test data loaded in database
- [ ] Admin user credentials available
- [ ] Browser console open for error monitoring

### During Testing
- [ ] Document any bugs found
- [ ] Take screenshots of failures
- [ ] Note browser/environment for each test
- [ ] Record actual vs expected results

### Post-Testing
- [ ] Compile test results
- [ ] Calculate pass/fail rate
- [ ] Create bug tickets for failures
- [ ] Generate QA report

---

## Test Results Template

**Test Date**: ___________
**Tester**: ___________
**Environment**: Local/Dev/Staging

**Summary**:
- Total Tests: 45
- Passed: ___
- Failed: ___
- Blocked: ___
- Skipped: ___

**Pass Rate**: ___%

**Critical Issues**:
1. ...
2. ...

**Recommendations**:
- ...

---

**Document Version**: 1.0
**Last Updated**: October 13, 2025
**Status**: Ready for Test Execution

---

**END OF E2E TEST SCENARIOS**
