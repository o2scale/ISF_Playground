# E2E Test Scenarios: Sprint5-Story-08 - Coin Spending Integration

**Story:** Coin Spending Integration
**Test Date:** October 9, 2025
**Test Environment:** Development
**Browser:** Chromium, Firefox, WebKit
**Test Framework:** Playwright

---

## Test Setup

### Prerequisites
1. Backend server running on `http://localhost:5001`
2. Frontend server running on `http://localhost:3000`
3. Test student user with known coin balance
4. Shop with test products available
5. Cart functionality working (Story-02)
6. Checkout functionality working (Story-03)

### Test Data Requirements
- **Test Student:**
  - Username: `test_student_001`
  - Initial Balance: 1000 coins
- **Test Products:**
  - Product 1: "Test Notebook" - Price: 50 coins, Stock: 10
  - Product 2: "Test Pen Set" - Price: 30 coins, Stock: 5
  - Product 3: "Test Backpack" - Price: 200 coins, Stock: 3

---

## AC1: Coin Model Extension

### TC 1.1: Verify 'shop' source in Coin model (Backend)
**Priority:** P0
**Type:** Unit Test
**Steps:**
1. Query coin transaction with source='shop'
2. Verify MongoDB accepts the value
3. Check no validation errors

**Expected Result:**
- 'shop' source accepted without errors
- Transaction saved successfully

---

## AC2: Coin Deduction on Purchase

### TC 2.1: Complete purchase and verify coin deduction
**Priority:** P0
**Type:** E2E
**Steps:**
1. Login as student with 1000 coins
2. Note initial balance
3. Add "Test Notebook" (50 coins) to cart
4. Proceed to checkout
5. Confirm order

**Expected Result:**
- Order placed successfully
- Coins deducted: 50
- New balance: 950 coins
- Balance updates immediately in navigation bar

### TC 2.2: Verify source='shop' in coin transaction
**Priority:** P0
**Type:** Integration
**Steps:**
1. Complete a purchase
2. Query user's coin transactions
3. Find the latest transaction

**Expected Result:**
- Transaction found with source='shop'
- Amount matches order total
- Description includes order number

---

## AC3: Transaction History Entry

### TC 3.1: Verify transaction history entry format
**Priority:** P0
**Type:** Integration
**Steps:**
1. Complete purchase for 80 coins (50 + 30)
2. Fetch user's coin transaction history
3. Find the shop purchase transaction

**Expected Result:**
Transaction contains:
- `type`: "spent"
- `amount`: 80 (positive value, deducted as negative in balance calculation)
- `source`: "shop"
- `description`: "Shop purchase - Order ORD-YYYYMMDD-XXXXX"
- `metadata.orderId`: Valid ObjectId
- `metadata.orderNumber`: Matches order
- `metadata.itemCount`: 2

### TC 3.2: Verify transaction timestamp
**Priority:** P1
**Type:** Integration
**Steps:**
1. Note current time
2. Complete a purchase
3. Check transaction timestamp

**Expected Result:**
- Timestamp within 5 seconds of purchase time
- Timezone correct

---

## AC4: Real-time Balance Update

### TC 4.1: Verify balance updates in navigation bar after purchase
**Priority:** P0
**Type:** E2E
**Steps:**
1. Login and note balance in navigation bar (1000 coins)
2. Add product (50 coins) to cart
3. Complete checkout
4. Observe balance in navigation bar

**Expected Result:**
- Balance changes from 1000 to 950
- Update happens within 2 seconds of order confirmation
- No page refresh required

### TC 4.2: Verify balance matches server after page refresh
**Priority:** P1
**Type:** E2E
**Steps:**
1. Complete purchase (deduct 50 coins)
2. Note displayed balance (950)
3. Refresh page
4. Check balance again

**Expected Result:**
- Balance still shows 950 after refresh
- Matches server value

---

## AC5: Insufficient Funds Validation

### TC 5.1: Block checkout when balance < cart total
**Priority:** P0
**Type:** E2E
**Steps:**
1. Login as student with 100 coins
2. Add "Test Backpack" (200 coins) to cart
3. Proceed to checkout
4. Attempt to place order

**Expected Result:**
- Checkout blocked
- Error message: "Insufficient coin balance. Required: 200, Available: 100"
- No coins deducted
- Balance remains 100

### TC 5.2: Display insufficient funds error message
**Priority:** P0
**Type:** E2E
**Steps:**
1. Attempt checkout with insufficient balance
2. Observe error display

**Expected Result:**
- Red error banner displayed
- Clear message about insufficient funds
- Shows required amount and available balance
- Button/link to earn more coins visible

### TC 5.3: Prevent checkout button when insufficient balance
**Priority:** P1
**Type:** E2E
**Steps:**
1. Login with 50 coins
2. Add product worth 100 coins to cart
3. Go to checkout page
4. Check "Place Order" button state

**Expected Result:**
- Place Order button disabled
- Tooltip/message explains insufficient balance
- User cannot proceed

---

## AC6: Atomic Transaction

### TC 6.1: Rollback coin deduction on order failure
**Priority:** P0
**Type:** Integration
**Steps:**
1. Note initial balance (1000 coins)
2. Add product to cart
3. Simulate order creation failure (e.g., out of stock during checkout)
4. Check balance after error

**Expected Result:**
- Order creation fails with error
- Balance remains 1000 (no deduction)
- No coin transaction created
- Cart still contains items

### TC 6.2: Rollback on stock deduction failure
**Priority:** P0
**Type:** Integration
**Steps:**
1. User A and User B both have item in cart (only 1 stock available)
2. User A completes checkout first
3. User B attempts checkout (stock now 0)
4. Check User B's coin balance

**Expected Result:**
- User B's checkout fails
- User B's coins NOT deducted
- Error message about stock unavailable
- Atomic transaction rolled back successfully

---

## Integration Tests

### TC 7.1: Complete purchase flow end-to-end
**Priority:** P0
**Type:** E2E Full Flow
**Steps:**
1. Login as student (1000 coins)
2. Browse shop
3. Add 2 products to cart (50 + 30 = 80 coins)
4. View cart
5. Proceed to checkout
6. Review order
7. Place order
8. View order confirmation

**Expected Result:**
- All steps succeed
- Balance updates: 1000 → 920
- Transaction logged with source='shop'
- Order confirmation shows coins spent and remaining balance
- Navigation bar balance updates immediately

### TC 7.2: Verify balance display consistency across pages
**Priority:** P1
**Type:** E2E
**Steps:**
1. Complete purchase (deduct 50 coins)
2. Navigate to Shop page
3. Navigate to Orders page
4. Navigate to Dashboard
5. Check balance display on each page

**Expected Result:**
- Balance consistent across all pages (950 coins)
- No discrepancies

---

## Regression Tests

### TC 8.1: Verify existing coin earning still works
**Priority:** P0
**Type:** Regression
**Steps:**
1. Complete a task (earn coins via WTF, tasks, etc.)
2. Check balance increase
3. Check transaction source

**Expected Result:**
- Coins earned successfully
- Balance increases
- Transaction source shows original value (e.g., 'wtf', 'task')
- NOT 'shop'

### TC 8.2: Verify WTF coin rewards unaffected
**Priority:** P0
**Type:** Regression
**Steps:**
1. Create WTF pin (earn coins)
2. Check coin transaction
3. Verify source and amount

**Expected Result:**
- WTF coins awarded correctly
- Source: 'wtf'
- Amount matches WTF reward rules
- No interference from shop changes

---

## Performance Tests

### TC 9.1: Balance fetch performance
**Priority:** P1
**Type:** Performance
**Steps:**
1. Measure time to fetch coin balance API
2. Repeat 10 times
3. Calculate average

**Expected Result:**
- Average response time < 100ms
- All responses < 200ms

### TC 9.2: Coin deduction performance
**Priority:** P1
**Type:** Performance
**Steps:**
1. Complete checkout
2. Measure time from "Place Order" click to confirmation page

**Expected Result:**
- Total checkout time < 3 seconds
- Coin deduction part < 200ms
- Within acceptable transaction time

---

## Security Tests

### TC 10.1: Verify server-side balance validation
**Priority:** P0
**Type:** Security
**Steps:**
1. Attempt to bypass frontend validation
2. Send direct API request with tampered balance
3. Try to place order

**Expected Result:**
- Server rejects tampered request
- Balance validated server-side
- Order not created

### TC 10.2: Prevent negative balance
**Priority:** P0
**Type:** Security
**Steps:**
1. User with 50 coins
2. Attempt to purchase 100 coin item via API manipulation

**Expected Result:**
- Request rejected
- Balance remains 50
- Error logged
- No negative balance allowed

---

## Test Execution Summary

**Total Test Cases:** 22
- Priority P0 (Critical): 15
- Priority P1 (High): 7

**Test Types:**
- E2E: 9 tests
- Integration: 6 tests
- Regression: 2 tests
- Unit: 1 test
- Performance: 2 tests
- Security: 2 tests

**Estimated Execution Time:** ~45 minutes

---

## Test Execution Notes

1. Run backend tests first (coin model validation)
2. Then run E2E tests in order
3. Run regression tests last
4. Check all logs for errors
5. Verify database state after each test

**Test Data Cleanup:**
- Restore student balance after each test
- Clear test orders
- Reset product stock levels
