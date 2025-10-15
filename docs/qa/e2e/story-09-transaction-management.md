# E2E Test Scenarios: Sprint5-Story-09 - Transaction Management

**Story:** Transaction Management
**Test Date:** October 9, 2025
**Test Environment:** Development
**Browser:** Chromium, Firefox, WebKit
**Test Framework:** Playwright

---

## Test Setup

### Prerequisites
1. Backend server running on `http://localhost:5001`
2. Frontend server running on `http://localhost:3000`
3. Test student user with transaction history
4. Various coin transactions (earned and spent) in database
5. Shop orders (from Story-08) for shop transactions

### Test Data Requirements
- **Test Student:**
  - Username: `test_student_001`
  - Has at least 20 transactions
  - Mix of earned and spent transactions
  - Transactions from multiple sources (shop, wtf, task, attendance, etc.)
  - Transactions spanning multiple days
- **Transaction Types:**
  - Earned: WTF pins, task completion, attendance, bonuses
  - Spent: Shop purchases with order references

---

## AC1: Transaction History Display

### TC 1.1: Display all transactions with complete information
**Priority:** P0
**Type:** E2E
**Steps:**
1. Login as student
2. Click on coin balance in navigation bar
3. Verify redirect to `/coins/history`
4. Observe transaction list

**Expected Result:**
- All transactions displayed in reverse chronological order (newest first)
- Each transaction shows:
  - Date and time
  - Type (Earned/Spent) with color coding (green/red)
  - Source (WTF, SHOP, TASK, etc.)
  - Description
  - Amount with +/- sign
- Pagination shown if more than 50 transactions

### TC 1.2: Verify transaction card UI elements
**Priority:** P1
**Type:** E2E
**Steps:**
1. Navigate to transaction history
2. Inspect first transaction card

**Expected Result:**
- Icon showing +/- based on type
- Description is readable and descriptive
- Source badge clearly visible
- Date formatted as "MMM DD, YYYY, HH:MM AM/PM"
- Amount displayed prominently

### TC 1.3: Verify summary cards display
**Priority:** P0
**Type:** E2E
**Steps:**
1. Navigate to transaction history
2. Check summary section at top

**Expected Result:**
- Three summary cards visible:
  - Current Balance (blue)
  - Total Earned (green)
  - Total Spent (red)
- Values match actual transaction totals
- Balance matches navigation bar

---

## AC2: Filter Transactions by Type

### TC 2.1: Filter by "Earned" transactions only
**Priority:** P0
**Type:** E2E
**Steps:**
1. Navigate to transaction history
2. Select "Earned" from Type filter dropdown
3. Click "Apply Filters"

**Expected Result:**
- Only earned transactions displayed
- All transactions show green + icon
- No spent transactions visible
- Summary "Total Spent" shows 0 or filtered total
- Transaction count updates

### TC 2.2: Filter by "Spent" transactions only
**Priority:** P0
**Type:** E2E
**Steps:**
1. Navigate to transaction history
2. Select "Spent" from Type filter dropdown
3. Click "Apply Filters"

**Expected Result:**
- Only spent transactions displayed
- All transactions show red - icon
- No earned transactions visible
- Summary "Total Earned" shows 0 or filtered total
- Transaction count updates

### TC 2.3: Clear type filter
**Priority:** P1
**Type:** E2E
**Steps:**
1. Apply type filter (Earned)
2. Click "Clear Filters"

**Expected Result:**
- All transactions displayed again
- Type dropdown resets to "All Types"
- Summary values recalculated for all transactions

---

## AC3: Filter Transactions by Source

### TC 3.1: Filter by Shop source
**Priority:** P0
**Type:** E2E
**Steps:**
1. Navigate to transaction history
2. Select "Shop" from Source filter dropdown
3. Click "Apply Filters"

**Expected Result:**
- Only shop transactions displayed
- All transactions show "SHOP" source badge
- Transactions include order number in description
- "View Order" link visible on each transaction

### TC 3.2: Filter by WTF source
**Priority:** P0
**Type:** E2E
**Steps:**
1. Navigate to transaction history
2. Select "WTF" from Source filter dropdown
3. Click "Apply Filters"

**Expected Result:**
- Only WTF transactions displayed
- All transactions show "WTF" source badge
- Descriptions reference WTF pins

### TC 3.3: Filter by multiple criteria (Type + Source)
**Priority:** P1
**Type:** E2E
**Steps:**
1. Select Type: "Earned"
2. Select Source: "WTF"
3. Click "Apply Filters"

**Expected Result:**
- Only earned transactions from WTF displayed
- No spent transactions shown
- No transactions from other sources
- Filters work cumulatively

---

## AC4: Filter Transactions by Date Range

### TC 4.1: Filter by start date only
**Priority:** P0
**Type:** E2E
**Steps:**
1. Navigate to transaction history
2. Select start date (e.g., 7 days ago)
3. Leave end date empty
4. Click "Apply Filters"

**Expected Result:**
- Only transactions from start date onwards displayed
- Transactions before start date excluded
- Most recent transactions shown

### TC 4.2: Filter by end date only
**Priority:** P0
**Type:** E2E
**Steps:**
1. Navigate to transaction history
2. Leave start date empty
3. Select end date (e.g., 3 days ago)
4. Click "Apply Filters"

**Expected Result:**
- Only transactions up to end date displayed
- Transactions after end date excluded
- Older transactions shown

### TC 4.3: Filter by date range (start and end)
**Priority:** P0
**Type:** E2E
**Steps:**
1. Navigate to transaction history
2. Select start date (e.g., 10 days ago)
3. Select end date (e.g., 5 days ago)
4. Click "Apply Filters"

**Expected Result:**
- Only transactions within date range displayed
- Transactions outside range excluded
- Date range shown correctly

### TC 4.4: Invalid date range (end before start)
**Priority:** P1
**Type:** E2E
**Steps:**
1. Select start date: Today
2. Select end date: Yesterday
3. Click "Apply Filters"

**Expected Result:**
- Error message or validation warning
- OR: No results shown (empty list)
- User notified of invalid range

---

## AC5: Transaction Detail Modal

### TC 5.1: Open transaction detail modal (non-shop transaction)
**Priority:** P0
**Type:** E2E
**Steps:**
1. Navigate to transaction history
2. Filter by Source: "WTF"
3. Click on a WTF transaction

**Expected Result:**
- Modal opens with transaction details
- Shows:
  - Type badge (Earned/Spent)
  - Amount with proper sign
  - Source badge
  - Full description
  - Complete date/time with weekday
  - Additional metadata if available
- Close button visible

### TC 5.2: Open transaction detail modal (shop transaction)
**Priority:** P0
**Type:** E2E
**Steps:**
1. Navigate to transaction history
2. Filter by Source: "Shop"
3. Click on a shop transaction (NOT on "View Order" link)

**Expected Result:**
- Modal opens with shop transaction details
- Shows:
  - Order ID (ObjectId format)
  - Order Number (ORD-YYYYMMDD-XXXXX)
  - Item Count
  - All standard transaction fields
- Close button visible

### TC 5.3: Close transaction detail modal
**Priority:** P1
**Type:** E2E
**Steps:**
1. Open transaction detail modal
2. Click "Close" button

**Expected Result:**
- Modal closes
- Transaction list still visible
- No navigation occurs

### TC 5.4: Close modal by clicking overlay
**Priority:** P1
**Type:** E2E
**Steps:**
1. Open transaction detail modal
2. Click outside modal (on dark overlay)

**Expected Result:**
- Modal closes
- Returns to transaction list

---

## AC6: Navigate to Order from Shop Transaction

### TC 6.1: Click "View Order" link from shop transaction
**Priority:** P0
**Type:** E2E
**Steps:**
1. Navigate to transaction history
2. Filter by Source: "Shop"
3. Click "View Order →" link on a shop transaction

**Expected Result:**
- Navigate to `/shop/orders` (Order History page)
- Order history page displays
- Can locate the specific order by order number

### TC 6.2: Shop transactions show "View Order" link
**Priority:** P0
**Type:** E2E
**Steps:**
1. Filter transactions by Source: "Shop"
2. Inspect transaction cards

**Expected Result:**
- All shop transactions have "View Order →" link
- Link styled in blue with arrow icon
- Non-shop transactions do NOT have this link

---

## AC7: Export Transaction History

### TC 7.1: Export all transactions as CSV
**Priority:** P0
**Type:** E2E
**Steps:**
1. Navigate to transaction history
2. Click "Export CSV" button
3. Wait for download

**Expected Result:**
- CSV file downloaded
- Filename: `transaction-history-YYYY-MM-DD.csv`
- Contains all transactions
- Columns: Date, Type, Source, Description, Amount, Balance After
- Data matches displayed transactions

### TC 7.2: Export filtered transactions as CSV
**Priority:** P0
**Type:** E2E
**Steps:**
1. Apply filters (Type: Spent, Source: Shop, Date Range: Last 7 days)
2. Click "Export CSV"
3. Download file

**Expected Result:**
- CSV contains only filtered transactions
- All rows match applied filters
- Headers included
- Amounts show negative sign for spent

### TC 7.3: Verify CSV balance calculation
**Priority:** P1
**Type:** Integration
**Steps:**
1. Export transaction history
2. Open CSV in spreadsheet
3. Check "Balance After" column

**Expected Result:**
- Balance After column shows running balance
- Each row's balance reflects cumulative total
- Final balance matches current balance
- Earned transactions increase balance
- Spent transactions decrease balance

### TC 7.4: Export button disabled when no transactions
**Priority:** P1
**Type:** E2E
**Steps:**
1. Apply filters that result in 0 transactions
2. Check "Export CSV" button state

**Expected Result:**
- Export button disabled
- Button styled as disabled (grayed out)
- Tooltip or visual indication

---

## AC8: Pagination

### TC 8.1: Navigate through pages
**Priority:** P0
**Type:** E2E
**Steps:**
1. Ensure test user has >50 transactions
2. Navigate to transaction history
3. Check page 1
4. Click "Next"

**Expected Result:**
- Page 2 loads with next 50 transactions
- Page indicator updates: "Page 2 of N"
- "Previous" button enabled
- Transaction list refreshes

### TC 8.2: Navigate to previous page
**Priority:** P0
**Type:** E2E
**Steps:**
1. Navigate to page 2
2. Click "Previous"

**Expected Result:**
- Page 1 displays
- First 50 transactions shown
- "Previous" button disabled on page 1
- Page indicator: "Page 1 of N"

### TC 8.3: Pagination resets when filters change
**Priority:** P1
**Type:** E2E
**Steps:**
1. Navigate to page 3
2. Apply new filter
3. Check page indicator

**Expected Result:**
- Returns to page 1
- Shows first page of filtered results
- Total pages recalculated based on filter

---

## Integration Tests

### TC 9.1: End-to-end transaction history flow
**Priority:** P0
**Type:** E2E Full Flow
**Steps:**
1. Login as student
2. Complete a shop purchase (spend coins)
3. Earn coins via WTF pin
4. Navigate to transaction history
5. Verify both transactions appear

**Expected Result:**
- Both new transactions visible
- Shop transaction shows at top (most recent)
- WTF transaction below
- Summary cards updated
- Balance reflects both transactions

### TC 9.2: Transaction history consistency with coin balance
**Priority:** P0
**Type:** Integration
**Steps:**
1. Navigate to transaction history
2. Note current balance in summary
3. Navigate to Dashboard
4. Check coin balance in navigation bar

**Expected Result:**
- Both balances match exactly
- No discrepancies
- Real-time sync

### TC 9.3: Filter persistence on page refresh (optional)
**Priority:** P2
**Type:** E2E
**Steps:**
1. Apply filters
2. Refresh page
3. Check filters

**Expected Result:**
- EITHER filters cleared (acceptable)
- OR filters persisted (enhanced UX)
- Page functions normally

---

## Regression Tests

### TC 10.1: Verify existing coin features still work
**Priority:** P0
**Type:** Regression
**Steps:**
1. Complete task and earn coins
2. Make shop purchase
3. Check transactions appear correctly

**Expected Result:**
- Coins earned/spent successfully
- Transactions logged correctly
- Balance updates in real-time
- No broken functionality

### TC 10.2: Verify WTF coin rewards work
**Priority:** P0
**Type:** Regression
**Steps:**
1. Create WTF pin
2. Earn coins
3. Check transaction history

**Expected Result:**
- WTF transaction appears
- Source: "WTF"
- Type: "Earned"
- Amount correct

---

## Performance Tests

### TC 11.1: Load time for transaction history page
**Priority:** P1
**Type:** Performance
**Steps:**
1. Navigate to `/coins/history`
2. Measure page load time

**Expected Result:**
- Page loads in < 2 seconds
- Transactions visible quickly
- No lag or freezing

### TC 11.2: Filter application speed
**Priority:** P1
**Type:** Performance
**Steps:**
1. Apply filter with many results
2. Measure response time

**Expected Result:**
- Filters apply in < 500ms
- Results update smoothly
- No UI blocking

### TC 11.3: CSV export for large dataset
**Priority:** P1
**Type:** Performance
**Steps:**
1. User with 1000+ transactions
2. Export CSV
3. Measure time

**Expected Result:**
- Export completes in < 5 seconds
- File downloads successfully
- No timeout errors

---

## Security Tests

### TC 12.1: Verify authentication required
**Priority:** P0
**Type:** Security
**Steps:**
1. Logout
2. Navigate to `/coins/history` directly

**Expected Result:**
- Redirect to login page
- No transaction data exposed
- Proper authentication check

### TC 12.2: Verify user can only see own transactions
**Priority:** P0
**Type:** Security
**Steps:**
1. Login as Student A
2. View transaction history
3. Logout and login as Student B
4. View transaction history

**Expected Result:**
- Student A sees only their transactions
- Student B sees only their transactions
- No cross-user data leakage

### TC 12.3: Verify CSV export security
**Priority:** P0
**Type:** Security
**Steps:**
1. Attempt to access export endpoint without token
2. Check response

**Expected Result:**
- Request rejected (401 Unauthorized)
- No data returned
- Proper authentication enforced

---

## Error Handling Tests

### TC 13.1: Handle API failure gracefully
**Priority:** P1
**Type:** Error Handling
**Steps:**
1. Stop backend server
2. Navigate to transaction history
3. Observe behavior

**Expected Result:**
- Error message displayed
- "Failed to fetch transaction history"
- No crash or infinite loading
- Retry option or guidance

### TC 13.2: Handle empty transaction history
**Priority:** P1
**Type:** Error Handling
**Steps:**
1. New user with 0 transactions
2. Navigate to transaction history

**Expected Result:**
- Empty state message: "No transactions found"
- Summary cards show 0 values
- No errors
- UI still functional

---

## Accessibility Tests

### TC 14.1: Keyboard navigation
**Priority:** P2
**Type:** Accessibility
**Steps:**
1. Navigate to transaction history using keyboard only
2. Tab through filters, buttons, and transactions

**Expected Result:**
- All interactive elements focusable
- Focus indicators visible
- Can apply filters with keyboard
- Can navigate pagination

### TC 14.2: Screen reader compatibility
**Priority:** P2
**Type:** Accessibility
**Steps:**
1. Use screen reader to navigate page
2. Listen to transaction information

**Expected Result:**
- Transaction details read aloud correctly
- Filter labels announced
- Button purposes clear
- Semantic HTML used

---

## Test Execution Summary

**Total Test Cases:** 50
- Priority P0 (Critical): 30
- Priority P1 (High): 16
- Priority P2 (Nice-to-have): 4

**Test Types:**
- E2E: 38 tests
- Integration: 4 tests
- Regression: 2 tests
- Performance: 3 tests
- Security: 3 tests
- Error Handling: 2 tests
- Accessibility: 2 tests

**Estimated Execution Time:** ~90 minutes

---

## Test Execution Notes

1. Run tests in order (ACs 1-7)
2. Verify backend API working before frontend tests
3. Check database has sufficient test data
4. Clear browser cache between test runs
5. Test on all three browsers (Chromium, Firefox, WebKit)
6. Capture screenshots for failures

**Test Data Cleanup:**
- Backup test transactions
- Can restore original state after tests
- No cleanup required (read-only operations except CSV export)
