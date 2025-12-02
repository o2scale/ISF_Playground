# E2E Test Plan: Sprint5-Story-13 - Coach Order Delivery Management

**Story:** Coach Order Delivery Management
**Test Date:** _______________
**Tester:** _______________
**Environment:** http://localhost:3000
**Backend:** http://localhost:5001

---

## Test Environment Setup

### Prerequisites
- ✅ Backend server running on port 5001
- ✅ Frontend server running on port 3000
- ✅ MongoDB connected with test data
- ✅ Test users created:
  - **Student:** Role='student', assigned to Balagruha A
  - **Coach:** Role='coach', assigned to Balagruha A
  - **Admin:** Role='admin'
- ✅ Test products in shop with stock available
- ✅ Student has sufficient coin balance (at least 100 coins)

---

## Test Scenarios

### **Scenario 1: Order Creation with Delivery Status**

**Objective:** Verify new orders start with correct delivery status

**Test Steps:**

1. **Login as Student**
   - Navigate to http://localhost:3000/login
   - Login with student credentials
   - Expected: Login successful, redirected to dashboard

2. **Place an Order**
   - Navigate to /shop
   - Add 1-2 products to cart
   - Go to checkout
   - Complete order purchase
   - Expected:
     - ✅ Order confirmation shown
     - ✅ Order number displayed (format: ORD-YYYYMMDD-XXXXX)
     - ✅ Coins deducted from balance
     - ✅ Success message displayed

3. **Verify Order Status (Student View)**
   - Navigate to /shop/orders (Order History)
   - Find the newly created order
   - Check order status badge
   - Expected:
     - ✅ Status shows "Awaiting Confirmation" (yellow badge)
     - ✅ Order appears in history immediately
     - ✅ Cancellation button is visible and enabled

**Result:** ☐ PASS | ☐ FAIL
**Notes:** _______________________________________________

---

### **Scenario 2: 5-Minute Smart Confirmation Window**

**Objective:** Verify orders remain hidden from coaches for 5 minutes

**Test Steps:**

1. **Verify Coach Does NOT See Order Yet**
   - Logout student
   - Login as Coach
   - Navigate to /coach/deliveries
   - Expected:
     - ✅ Page loads successfully
     - ✅ Stats show "Pending Deliveries: 0"
     - ✅ Empty state message: "All caught up! No pending deliveries"
     - ✅ The order placed by student is NOT visible

2. **Student Can Still Cancel (Within 5 Minutes)**
   - Logout coach
   - Login as Student
   - Navigate to /shop/orders
   - Click on the recent order
   - Click "Cancel Order" button
   - Expected:
     - ✅ Cancellation modal appears
     - ✅ Can provide cancellation reason
     - ✅ Order cancelled successfully
     - ✅ Status changes to "Cancelled" (red badge)
     - ✅ Coins refunded to balance
     - ✅ Stock restored

3. **Place Another Order (For 5-Minute Test)**
   - Go back to /shop
   - Add product(s) to cart
   - Complete checkout
   - Note the time: _______________
   - Expected: Order created successfully

4. **Wait 5 Minutes and Verify Confirmation**
   - Wait exactly 5 minutes after order placement
   - As student, navigate to /shop/orders
   - Refresh the page
   - Expected:
     - ✅ Status changes from "Awaiting Confirmation" to "Pending Delivery" (orange badge)
     - ✅ Cancellation button becomes disabled
     - ✅ Message: "Order cannot be cancelled after confirmation"

5. **Verify Coach NOW Sees Order**
   - Logout student
   - Login as Coach
   - Navigate to /coach/deliveries
   - Expected:
     - ✅ Stats show "Pending Deliveries: 1"
     - ✅ Order appears in delivery queue
     - ✅ Order details visible (student name, products, amount)

**Result:** ☐ PASS | ☐ FAIL
**Notes:** _______________________________________________

---

### **Scenario 3: Coach Delivery Dashboard - Stats and Queue**

**Objective:** Verify coach can view pending deliveries and statistics

**Test Steps:**

1. **Login as Coach**
   - Navigate to http://localhost:3000/login
   - Login with coach credentials
   - Expected: Login successful

2. **Navigate to Delivery Dashboard**
   - Click on floating deliveries button (bottom-right corner)
   - OR navigate to /coach/deliveries
   - Expected:
     - ✅ Page loads successfully
     - ✅ Page title: "Delivery Management"
     - ✅ Subtitle: "Manage student orders waiting for delivery"

3. **Verify Stats Cards**
   - Check all 4 stat cards displayed:
     1. Pending Deliveries: _____ (should be at least 1)
     2. Delivered Today: _____
     3. Delivered This Week: _____
     4. Total Delivered: _____
   - Expected:
     - ✅ All 4 cards visible
     - ✅ Numbers are accurate
     - ✅ Icons displayed correctly

4. **Verify Info Banner**
   - Check for blue info banner above delivery list
   - Expected:
     - ✅ Banner displays: "Smart Confirmation Window"
     - ✅ Explanation text visible: "Orders appear here 5 minutes after placement..."

5. **Verify Delivery Queue List**
   - Check pending orders list
   - Expected:
     - ✅ At least 1 order visible
     - ✅ Order card shows:
       - Order number
       - Student name with icon
       - Balagruha name with icon
       - Timestamp with icon
       - Product items with images
       - Quantities and prices
       - Total amount in coins
       - "Mark as Delivered" button (purple)
       - "Add Notes & Deliver" button (outline)

6. **Verify Auto-Refresh**
   - Note current pending count: _____
   - Wait 30 seconds
   - Expected:
     - ✅ Page auto-refreshes stats
     - ✅ No page reload occurs (seamless update)

**Result:** ☐ PASS | ☐ FAIL
**Notes:** _______________________________________________

---

### **Scenario 4: Floating Deliveries Button**

**Objective:** Verify floating button visibility and functionality

**Test Steps:**

1. **Verify Button Visibility (Coach)**
   - As coach, navigate to any page in the app
   - Check bottom-right corner
   - Expected:
     - ✅ Floating button visible on ALL pages
     - ✅ Button shows delivery box icon 📦
     - ✅ Button shows pending count badge (red)
     - ✅ Badge shows correct number

2. **Verify Button Animation**
   - Observe button when deliveries pending
   - Expected:
     - ✅ Button has pulse animation (purple background)
     - ✅ Badge is red with white text
     - ✅ Hover effect works (slight lift)

3. **Click Button to Navigate**
   - Click the floating button
   - Expected:
     - ✅ Navigates to /coach/deliveries
     - ✅ Page loads instantly

4. **Verify Button NOT Visible for Students**
   - Logout coach
   - Login as student
   - Navigate to /shop
   - Expected:
     - ✅ Floating deliveries button is NOT visible
     - ✅ Only cart icon visible for students

**Result:** ☐ PASS | ☐ FAIL
**Notes:** _______________________________________________

---

### **Scenario 5: Mark Order as Delivered (Quick Delivery)**

**Objective:** Verify coach can mark order as delivered without notes

**Test Steps:**

1. **Login as Coach**
   - Navigate to /coach/deliveries
   - Expected: At least 1 pending delivery visible

2. **Mark as Delivered (No Notes)**
   - Click "Mark as Delivered" button on first order
   - Expected:
     - ✅ Button shows "Delivering..." (disabled state)
     - ✅ Order disappears from list immediately
     - ✅ Success message: "Order {number} marked as delivered!"
     - ✅ Stats update: Pending count decreases by 1
     - ✅ "Delivered Today" count increases by 1

3. **Verify Order Removed from Queue**
   - Refresh page
   - Expected:
     - ✅ Delivered order no longer in pending list
     - ✅ Pending count remains updated

4. **Verify Student Notification**
   - Logout coach
   - Login as student
   - Check notifications (bell icon)
   - Expected:
     - ✅ New notification: "Order Delivered"
     - ✅ Message: "Your order {number} has been delivered by Coach {Name}!"
     - ✅ Clicking notification navigates to order details

5. **Verify Order Status (Student View)**
   - Navigate to /shop/orders
   - Find the delivered order
   - Expected:
     - ✅ Status shows "Delivered" (green badge)
     - ✅ Shows "Delivered by: Coach {Name}"
     - ✅ Shows delivery timestamp
     - ✅ Cancellation button not visible

**Result:** ☐ PASS | ☐ FAIL
**Notes:** _______________________________________________

---

### **Scenario 6: Mark Order as Delivered (With Notes)**

**Objective:** Verify coach can add delivery notes

**Test Steps:**

1. **Create Another Order (As Student)**
   - Login as student
   - Place a new order
   - Wait 5+ minutes for confirmation
   - Expected: Order confirmed

2. **Login as Coach**
   - Navigate to /coach/deliveries
   - Expected: New order visible in queue

3. **Open Delivery Notes Modal**
   - Click "Add Notes & Deliver" button
   - Expected:
     - ✅ Modal opens with white background
     - ✅ Modal title: "Add Delivery Notes"
     - ✅ Shows order number
     - ✅ Textarea visible (4 rows)
     - ✅ Placeholder text: "Optional delivery notes..."
     - ✅ Character counter: "0/500 characters"
     - ✅ Two buttons: "Cancel" and "Confirm Delivery"

4. **Add Delivery Notes**
   - Type notes: "Delivered to coach office. Student picked up in person."
   - Expected:
     - ✅ Character counter updates: "62/500 characters"
     - ✅ Text wraps correctly in textarea

5. **Confirm Delivery with Notes**
   - Click "Confirm Delivery" button
   - Expected:
     - ✅ Modal closes
     - ✅ Order disappears from queue
     - ✅ Success message shown
     - ✅ Stats update correctly

6. **Verify Delivery Notes Saved**
   - Logout coach
   - Login as student
   - Navigate to /shop/orders
   - Click on the delivered order
   - Expected:
     - ✅ Delivery notes visible in order details
     - ✅ Notes text matches what was entered

7. **Test Notes Length Validation**
   - Login as coach
   - Create new order as student (wait 5+ min)
   - Click "Add Notes & Deliver"
   - Try to type 501+ characters
   - Expected:
     - ✅ Textarea limits input to 500 chars
     - ✅ Error if trying to submit >500 chars

**Result:** ☐ PASS | ☐ FAIL
**Notes:** _______________________________________________

---

### **Scenario 7: Balagruha-Based Authorization**

**Objective:** Verify coaches can only deliver orders for their assigned Balagruhas

**Test Steps:**

1. **Setup: Create Multiple Balagruhas**
   - Ensure 2 Balagruhas exist: Balagruha A and Balagruha B
   - Student1 assigned to Balagruha A
   - Student2 assigned to Balagruha B
   - Coach1 assigned to Balagruha A only
   - Coach2 assigned to Balagruha B only

2. **Place Orders from Both Students**
   - Login as Student1, place order
   - Login as Student2, place order
   - Wait 5+ minutes for both orders to confirm
   - Expected: Both orders confirmed

3. **Login as Coach1 (Balagruha A Only)**
   - Navigate to /coach/deliveries
   - Expected:
     - ✅ Sees ONLY Student1's order
     - ✅ Does NOT see Student2's order
     - ✅ Stats show correct count for Balagruha A only

4. **Attempt Unauthorized Delivery (API Test)**
   - As Coach1, try to mark Student2's order as delivered
   - (Use browser DevTools to send API request directly)
   - Expected:
     - ✅ API returns 403 Forbidden
     - ✅ Error message: "You are not authorized to deliver orders for this student's Balagruha"
     - ✅ Order status remains unchanged

5. **Login as Coach2 (Balagruha B Only)**
   - Navigate to /coach/deliveries
   - Expected:
     - ✅ Sees ONLY Student2's order
     - ✅ Does NOT see Student1's order
     - ✅ Can successfully mark Student2's order as delivered

**Result:** ☐ PASS | ☐ FAIL
**Notes:** _______________________________________________

---

### **Scenario 8: Multi-Balagruha Coach**

**Objective:** Verify coach assigned to multiple Balagruhas sees all orders

**Test Steps:**

1. **Setup: Coach with Multiple Balagruhas**
   - Create Coach3 assigned to BOTH Balagruha A and B
   - Student1 in Balagruha A
   - Student2 in Balagruha B
   - Both students place orders
   - Wait 5+ minutes

2. **Login as Coach3**
   - Navigate to /coach/deliveries
   - Expected:
     - ✅ Sees orders from BOTH Balagruha A and B
     - ✅ Each order card shows Balagruha name
     - ✅ Stats combine counts from both Balagruhas
     - ✅ Pending count = Student1's orders + Student2's orders

3. **Verify Balagruha Names Displayed**
   - Check each order card
   - Expected:
     - ✅ Student1's order shows "Balagruha A"
     - ✅ Student2's order shows "Balagruha B"
     - ✅ Names displayed with house icon 🏠

4. **Deliver Orders from Both Balagruhas**
   - Mark Student1's order as delivered
   - Mark Student2's order as delivered
   - Expected:
     - ✅ Both orders delivered successfully
     - ✅ Stats update for both Balagruhas
     - ✅ Both students receive notifications

**Result:** ☐ PASS | ☐ FAIL
**Notes:** _______________________________________________

---

### **Scenario 9: Edge Cases and Validations**

**Objective:** Test error handling and edge cases

**Test Steps:**

1. **Test Empty Queue**
   - Login as coach with no pending deliveries
   - Navigate to /coach/deliveries
   - Expected:
     - ✅ Empty state shows green checkmark icon
     - ✅ Message: "All caught up! No pending deliveries"
     - ✅ Stats all show 0
     - ✅ No error or loading issues

2. **Test Already Delivered Order**
   - Attempt to mark same order as delivered twice
   - (Use API directly or fast double-click)
   - Expected:
     - ✅ Second attempt fails
     - ✅ Error: "Order is not pending delivery"
     - ✅ Current status shown in error

3. **Test Cancelled Order**
   - Student cancels order (within 5 min)
   - Coach tries to mark as delivered after 5 min
   - Expected:
     - ✅ Order NOT visible in coach queue
     - ✅ If attempted via API: 400 error

4. **Test Network Error Handling**
   - Stop backend server
   - Try to load /coach/deliveries
   - Expected:
     - ✅ Error state displayed
     - ✅ Red error icon shown
     - ✅ Message: "Failed to load deliveries"
     - ✅ "Try Again" button visible
   - Restart backend and click "Try Again"
   - Expected:
     - ✅ Page loads successfully

5. **Test Coach with No Balagruha Assigned**
   - Create coach4 with no balagruhaIds
   - Login as coach4
   - Navigate to /coach/deliveries
   - Expected:
     - ✅ Stats show all zeros
     - ✅ Empty state message shown
     - ✅ No errors thrown

**Result:** ☐ PASS | ☐ FAIL
**Notes:** _______________________________________________

---

### **Scenario 10: On-Demand Confirmation Trigger Points**

**Objective:** Verify confirmation checks happen at correct trigger points

**Test Steps:**

1. **Create Order (As Student)**
   - Place order, note time: _______________
   - Expected: Order in "Awaiting Confirmation"

2. **Trigger 1: Student Views Order History (Before 5 Min)**
   - Wait 2 minutes
   - As student, navigate to /shop/orders
   - Expected:
     - ✅ Still shows "Awaiting Confirmation"
     - ✅ Status NOT changed yet (< 5 minutes)

3. **Trigger 2: Coach Opens Dashboard (After 5 Min)**
   - Wait until 5+ minutes have passed
   - As coach, navigate to /coach/deliveries
   - Expected:
     - ✅ Order automatically confirmed
     - ✅ Order visible in coach queue
     - ✅ Stats updated

4. **Trigger 3: Student Views Order History (After 5 Min)**
   - Create another order
   - Wait 5+ minutes
   - As student, navigate to /shop/orders
   - Expected:
     - ✅ Status changes to "Pending Delivery"
     - ✅ Cancellation disabled

5. **Verify No Cron Job Running**
   - Check backend console logs
   - Expected:
     - ✅ No scheduled jobs running
     - ✅ No cron-related messages
     - ✅ Confirmation happens only on page access

**Result:** ☐ PASS | ☐ FAIL
**Notes:** _______________________________________________

---

### **Scenario 11: Delivery Stats Accuracy**

**Objective:** Verify all stat cards show accurate numbers

**Test Steps:**

1. **Reset Stats (As Coach)**
   - Login as coach
   - Navigate to /coach/deliveries
   - Note current stats:
     - Pending: _____
     - Today: _____
     - This Week: _____
     - Total: _____

2. **Create and Deliver 3 Orders**
   - As student, place 3 orders
   - Wait 5+ minutes for confirmation
   - As coach, deliver all 3 orders
   - Expected after each delivery:
     - ✅ Pending count decreases by 1
     - ✅ Delivered Today increases by 1
     - ✅ Delivered This Week increases by 1
     - ✅ Total Delivered increases by 1

3. **Verify Stats Persist on Refresh**
   - Refresh page
   - Expected:
     - ✅ All stats remain accurate
     - ✅ Numbers don't reset

4. **Test "Delivered Today" Resets at Midnight**
   - (Manual verification or check database)
   - Expected:
     - ✅ Only counts deliveries from today (after 00:00)

5. **Test "Delivered This Week" Calculation**
   - Check "This Week" stat
   - Expected:
     - ✅ Counts from Sunday 00:00 to now
     - ✅ Includes "Delivered Today" count

**Result:** ☐ PASS | ☐ FAIL
**Notes:** _______________________________________________

---

### **Scenario 12: UI/UX Polish**

**Objective:** Verify UI elements, styling, and user experience

**Test Steps:**

1. **Check Loading States**
   - Refresh /coach/deliveries page
   - Expected:
     - ✅ Skeleton loading for stats cards
     - ✅ Skeleton loading for order cards
     - ✅ Smooth transition to loaded state

2. **Check Responsive Design**
   - Resize browser window (mobile, tablet, desktop)
   - Expected:
     - ✅ Stats cards stack on mobile (1 column)
     - ✅ Stats show 2 columns on tablet
     - ✅ Stats show 4 columns on desktop
     - ✅ Floating button always visible
     - ✅ Order cards remain readable on mobile

3. **Check Button States**
   - Hover over "Mark as Delivered" button
   - Expected:
     - ✅ Hover effect (darker purple)
     - ✅ Cursor changes to pointer
     - ✅ Transition smooth (0.3s)
   - Click button
   - Expected:
     - ✅ Shows "Delivering..." text
     - ✅ Button disabled (no double-click)

4. **Check Icons and Colors**
   - Verify all icons render correctly:
     - ✅ Delivery box icon (📦)
     - ✅ Student icon
     - ✅ House/Balagruha icon
     - ✅ Clock icon
     - ✅ Checkmark icons in stats
   - Verify color scheme:
     - ✅ Purple for primary actions
     - ✅ Green for delivered status
     - ✅ Orange for pending delivery
     - ✅ Yellow for awaiting confirmation
     - ✅ Red for cancelled

5. **Check Accessibility**
   - Tab through interactive elements
   - Expected:
     - ✅ Focus visible on buttons
     - ✅ Can navigate with keyboard
     - ✅ Buttons have title/aria-label

**Result:** ☐ PASS | ☐ FAIL
**Notes:** _______________________________________________

---

## Summary of Test Results

### Overall Test Status
☐ **ALL TESTS PASSED**
☐ **PARTIAL PASS** (see failed scenarios below)
☐ **FAILED** (critical issues found)

### Passed Scenarios
- ☐ Scenario 1: Order Creation with Delivery Status
- ☐ Scenario 2: 5-Minute Smart Confirmation Window
- ☐ Scenario 3: Coach Delivery Dashboard
- ☐ Scenario 4: Floating Deliveries Button
- ☐ Scenario 5: Mark as Delivered (Quick)
- ☐ Scenario 6: Mark as Delivered (With Notes)
- ☐ Scenario 7: Balagruha Authorization
- ☐ Scenario 8: Multi-Balagruha Coach
- ☐ Scenario 9: Edge Cases
- ☐ Scenario 10: On-Demand Confirmation
- ☐ Scenario 11: Stats Accuracy
- ☐ Scenario 12: UI/UX Polish

### Failed Scenarios (if any)
_List failed scenarios with brief description:_

1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

### Critical Bugs Found
_List any critical bugs that block functionality:_

1. _______________________________________________
2. _______________________________________________

### Minor Issues Found
_List UI/UX issues that don't block core functionality:_

1. _______________________________________________
2. _______________________________________________

---

## Sign-Off

**QA Tester:** _____________________
**Date:** _____________________
**Signature:** _____________________

**Developer:** _____________________
**Date:** _____________________
**Signature:** _____________________

**Product Owner:** _____________________
**Date:** _____________________
**Signature:** _____________________

---

## Notes for QA Tester

### Tips for Testing
1. **Use Browser DevTools** to inspect API calls (Network tab)
2. **Check Console** for any JavaScript errors
3. **Test with different browsers** (Chrome, Firefox, Edge)
4. **Clear localStorage** between test runs if needed
5. **Take screenshots** of any bugs found
6. **Note exact steps** to reproduce any issues

### Common Issues to Watch For
- Floating button not appearing for coaches
- Stats not updating after delivery
- Orders appearing before 5-minute window
- Authorization bypass attempts
- Race conditions with fast clicks
- Network timeout handling

### Database Verification Queries
If needed, verify data directly in MongoDB:

```javascript
// Check order delivery status
db.orders.find({ orderNumber: "ORD-20251013-00001" })

// Check if coaches notified
db.notifications.find({
  type: "ISF_SHOP_UPDATE",
  title: "New Delivery"
})

// Verify delivery timestamps
db.orders.find({
  deliveryStatus: "delivered",
  deliveredBy: { $exists: true }
})
```

---

**Document Version:** 1.0
**Last Updated:** October 13, 2025
**Test Plan Status:** ✅ READY FOR QA TESTING
