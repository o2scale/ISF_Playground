# E2E Test Cases: Sprint5-Story-16 - Student Profile Page

**Story:** Student Profile Page
**Created:** 2025-10-19 17:34:45
**Created By:** Dev Agent
**Test Environment:** http://localhost:3000

---

## Test Environment Setup

### Prerequisites
- Backend server running on http://localhost:8000
- Frontend server running on http://localhost:3000
- Database populated with test users (students, coaches, admins)
- At least one student with:
  - Coin balance and transaction history
  - Shop orders (completed and pending)
  - WTF pins created
  - Mood tracking records
  - Guardian contact information
  - Assigned machine

### Test User Credentials

**Student Test User:**
- Role: Student
- Login: Use student facial recognition or credentials
- Expected to view: Own profile only

**Coach Test User:**
- Role: Coach
- Login: Use coach credentials
- Expected to view: Students from assigned Balagruhas only

**Admin Test User:**
- Role: Admin
- Login: Use admin credentials from /admin/login
- Expected to view: Any student profile

---

## AC1: Profile Header Display

### TC 1.1: Student Views Own Profile
**Priority:** P0
**Preconditions:**
- Logged in as student
- Student has complete profile data (name, email, age, gender, balagruha, last login)

**Steps:**
1. Navigate to `/profile`
2. Verify profile header displays correctly

**Expected Results:**
- [ ] Purple gradient header background displays
- [ ] Profile picture placeholder with user icon displays
- [ ] Student name displayed prominently
- [ ] "Your Profile" badge appears (blue background)
- [ ] Active status badge displays (green)
- [ ] Email address displays if available
- [ ] Age displays with "years" label
- [ ] Gender displays (capitalized)
- [ ] Balagruha name displays
- [ ] Last login date displays in correct format (e.g., "Oct 19, 2025")

**API Validation:**
- GET /api/v1/users/{userId}/profile returns 200
- Response contains complete user object

**Screenshots Required:**
- Full profile header showing all fields populated

---

### TC 1.2: Admin Views Student Profile
**Priority:** P0
**Preconditions:**
- Logged in as admin
- Have a valid student userId

**Steps:**
1. Navigate to Admin Reports → Zero Purchases Report
2. Click "View Profile" button for a student
3. Verify redirects to `/admin/students/{userId}`

**Expected Results:**
- [ ] Profile loads successfully
- [ ] No "Your Profile" badge appears
- [ ] All student data displays correctly
- [ ] Admin can view full profile information

**API Validation:**
- GET /api/v1/users/{userId}/profile with admin auth returns 200
- Response contains complete aggregated data

**Screenshots Required:**
- Admin viewing student profile

---

## AC2: Coin Wallet Dashboard

### TC 2.1: Coin Balance and Statistics Display
**Priority:** P0
**Preconditions:**
- Student has coin transactions (earned and spent)
- Student has WTF earnings

**Steps:**
1. Navigate to student profile
2. Locate Coin Wallet Card
3. Verify all coin statistics

**Expected Results:**
- [ ] Current balance displays prominently in purple gradient box
- [ ] Total Earned displays in green box with trending-up icon
- [ ] Total Spent displays in red box with trending-down icon
- [ ] Weekly Earned displays in blue box
- [ ] Monthly Earned displays in purple box
- [ ] "View History →" link navigates to `/shop/transactions`
- [ ] WTF Stats section displays:
  - Pins Created count
  - Submissions Approved count
  - Interactions count
  - Total WTF Coins earned

**API Validation:**
- Coins data in profile response matches actual coin records
- weeklyStats, monthlyStats, wtfStats all populated correctly

**Screenshots Required:**
- Full Coin Wallet Card with all stats visible

---

## AC3: Shopping Summary

### TC 3.1: Order History Display
**Priority:** P0
**Preconditions:**
- Student has completed and pending orders

**Steps:**
1. Navigate to student profile
2. Locate Shopping Summary Card
3. Review order statistics and recent orders

**Expected Results:**
- [ ] Total Orders count displays correctly
- [ ] Total Coins Spent displays correctly
- [ ] Pending Deliveries count displays correctly
- [ ] Recent Orders section shows up to 5 orders
- [ ] Each order displays:
  - Order number
  - Placement date
  - Item count
  - Status badge (colored: green for completed, yellow for pending)
  - Total amount in coins
- [ ] Clicking order navigates to `/shop/orders/{orderNumber}`
- [ ] "View All Orders →" link navigates to `/shop/orders`

**API Validation:**
- shop.totalOrders matches database count
- shop.recentOrders array contains correct orders

**Screenshots Required:**
- Shopping Card with orders displayed

---

### TC 3.2: No Orders Empty State
**Priority:** P1
**Preconditions:**
- Student has never made a purchase

**Steps:**
1. Navigate to profile of student with zero orders
2. Locate Shopping Summary Card

**Expected Results:**
- [ ] Shopping bag icon displays in center
- [ ] "No orders yet" message displays
- [ ] "Start shopping to see your order history!" subtitle displays
- [ ] "Browse Shop" button displays
- [ ] Button navigates to `/shop`

**Screenshots Required:**
- Empty state for Shopping Card

---

## AC4: WTF Activity Display

### TC 4.1: WTF Engagement Metrics
**Priority:** P0
**Preconditions:**
- Student has created WTF pins
- Student has WTF interactions

**Steps:**
1. Navigate to student profile
2. Locate WTF Activity Card
3. Verify activity metrics

**Expected Results:**
- [ ] Pins Created count displays in yellow box
- [ ] Total Interactions count displays in orange box
- [ ] Total WTF Coins Earned displays in green box
- [ ] Recent Pins section displays up to 3 pins with:
  - Pin title
  - Content type
  - Creation date
- [ ] Pending submissions count displays if > 0

**API Validation:**
- wtf.featuredContent array populated correctly
- wtf.totalInteractions matches database
- wtf.totalWtfEarnings matches coin records

**Screenshots Required:**
- WTF Activity Card with pins displayed

---

### TC 4.2: No WTF Activity Empty State
**Priority:** P1
**Preconditions:**
- Student has not created any WTF pins

**Steps:**
1. Navigate to profile of student with no WTF activity
2. Locate WTF Activity Card

**Expected Results:**
- [ ] Lightbulb icon displays in center
- [ ] "No WTF pins created yet" message displays
- [ ] "Start creating pins to earn coins!" subtitle displays
- [ ] Statistics boxes all show 0

**Screenshots Required:**
- Empty state for WTF Activity Card

---

## AC5: Learning Progress

### TC 5.1: Learning Stats Display
**Priority:** P0
**Preconditions:**
- Student has session time recorded
- Student has assigned machine

**Steps:**
1. Navigate to student profile
2. Locate Learning Progress Card
3. Verify learning statistics

**Expected Results:**
- [ ] Session Time Today displays in green box (format: "Xh Ym" or "Ym")
- [ ] Session Time This Week displays in blue box
- [ ] Assigned Machine name displays
- [ ] Active Modules count displays

**API Validation:**
- learning.sessionTimeToday/Week match expected values
- learning.assignedMachine populated from user.assignedMachines

**Screenshots Required:**
- Learning Card with stats populated

---

## AC6: Health & Wellness

### TC 6.1: Mood Tracking Display
**Priority:** P0
**Preconditions:**
- Student has recorded mood today
- Student has mood history for past week

**Steps:**
1. Navigate to student profile
2. Locate Health & Wellness Card
3. Verify mood data

**Expected Results:**
- [ ] Today's Mood displays with emoji and text
- [ ] Mood badge colored correctly (green for very-happy, blue for happy, etc.)
- [ ] Week mood history shows up to 7 days
- [ ] Each day shows emoji and date
- [ ] Guardian Contacts section displays if available:
  - Guardian Name 1 with phone
  - Guardian Name 2 with phone
  - Parental Status

**API Validation:**
- wellness.todayMood matches latest mood record
- wellness.weekMoodHistory array contains 7 days

**Screenshots Required:**
- Wellness Card with mood and guardian info

---

## AC7: Quick Actions Panel (Students Only)

### TC 7.1: Quick Actions Navigation
**Priority:** P0
**Preconditions:**
- Logged in as student
- Viewing own profile

**Steps:**
1. Navigate to `/profile`
2. Locate Quick Actions Panel in right sidebar
3. Test each action button

**Expected Results:**
- [ ] 4 action buttons display:
  1. Browse Shop → /shop (purple)
  2. Transactions → /shop/transactions (blue)
  3. WTF System → /wtf (yellow)
  4. My Orders → /shop/orders (green)
- [ ] Each button has icon, label, description, and arrow
- [ ] Clicking each button navigates correctly

**Screenshots Required:**
- Quick Actions Panel fully visible

---

### TC 7.2: Quick Actions Not Shown for Admin/Coach
**Priority:** P1
**Preconditions:**
- Logged in as admin or coach
- Viewing a student's profile

**Steps:**
1. Navigate to `/admin/students/{userId}` as admin
2. Check right sidebar

**Expected Results:**
- [ ] Quick Actions Panel does NOT display
- [ ] Only Wellness Card displays in right sidebar

**Screenshots Required:**
- Admin view showing no Quick Actions

---

## AC8: Authorization and Access Control

### TC 8.1: Student Can Only View Own Profile
**Priority:** P0
**Preconditions:**
- Logged in as student
- Have another student's userId

**Steps:**
1. Attempt to navigate to `/admin/students/{otherStudentId}`
2. Verify access denied

**Expected Results:**
- [ ] 403 Forbidden or error message displays
- [ ] OR "You do not have permission to view this profile" message
- [ ] Student cannot view other students' profiles

**API Validation:**
- GET /api/v1/users/{otherStudentId}/profile returns 403

**Screenshots Required:**
- Error state when accessing unauthorized profile

---

### TC 8.2: Coach Can View Students from Assigned Balagruhas
**Priority:** P0
**Preconditions:**
- Logged in as coach
- Coach assigned to specific Balagruha(s)
- Have student from assigned Balagruha
- Have student from NON-assigned Balagruha

**Steps:**
1. Navigate to `/admin/students/{assignedStudentId}`
2. Verify profile loads successfully
3. Navigate to `/admin/students/{nonAssignedStudentId}`
4. Verify access denied

**Expected Results:**
- [ ] Assigned student profile loads successfully
- [ ] Non-assigned student profile shows error
- [ ] Authorization logic respects Balagruha filtering

**API Validation:**
- API correctly validates coach's Balagruha assignments

**Screenshots Required:**
- Coach viewing assigned student (success)
- Coach viewing non-assigned student (error)

---

### TC 8.3: Admin Can View Any Student Profile
**Priority:** P0
**Preconditions:**
- Logged in as admin
- Have multiple student userIds from different Balagruhas

**Steps:**
1. Navigate to `/admin/students/{studentId1}`
2. Verify profile loads
3. Navigate to `/admin/students/{studentId2}` (different Balagruha)
4. Verify profile loads

**Expected Results:**
- [ ] All student profiles load successfully
- [ ] No Balagruha restrictions apply
- [ ] Full admin access confirmed

**Screenshots Required:**
- Admin viewing different students' profiles

---

## AC9: Responsive Design

### TC 9.1: Mobile View (375px width)
**Priority:** P1
**Preconditions:**
- Access profile page on mobile device or browser DevTools

**Steps:**
1. Set viewport to 375px width
2. Navigate to student profile
3. Verify layout

**Expected Results:**
- [ ] Profile header stacks vertically
- [ ] All cards stack in single column
- [ ] Stats grids adapt to smaller screen (2 columns instead of 4)
- [ ] All content readable and accessible
- [ ] No horizontal scroll

**Screenshots Required:**
- Mobile view of profile page

---

### TC 9.2: Tablet View (768px width)
**Priority:** P1
**Preconditions:**
- Access profile page on tablet device or browser DevTools

**Steps:**
1. Set viewport to 768px width
2. Navigate to student profile
3. Verify layout

**Expected Results:**
- [ ] 2-column layout (main content + sidebar)
- [ ] Cards display in appropriate grid
- [ ] All content accessible

**Screenshots Required:**
- Tablet view of profile page

---

### TC 9.3: Desktop View (1920px width)
**Priority:** P1
**Preconditions:**
- Access profile page on desktop

**Steps:**
1. Set viewport to 1920px width
2. Navigate to student profile
3. Verify layout

**Expected Results:**
- [ ] 3-column grid (2/3 main + 1/3 sidebar)
- [ ] Optimal spacing and readability
- [ ] All stats display in 4-column grid

**Screenshots Required:**
- Desktop view of profile page

---

## AC10: Error Handling

### TC 10.1: Profile Load Error
**Priority:** P0
**Preconditions:**
- Backend server stopped or userId does not exist

**Steps:**
1. Stop backend server (or use invalid userId)
2. Navigate to `/profile`
3. Verify error handling

**Expected Results:**
- [ ] Error icon displays
- [ ] "Unable to Load Profile" message displays
- [ ] Error message shows reason
- [ ] "Try Again" button displays
- [ ] Clicking "Try Again" re-fetches profile

**Screenshots Required:**
- Error state when profile fails to load

---

### TC 10.2: Invalid User ID (404)
**Priority:** P1
**Preconditions:**
- Using non-existent userId

**Steps:**
1. Navigate to `/admin/students/000000000000000000000000` (invalid ID)
2. Verify 404 handling

**Expected Results:**
- [ ] "User not found" or similar error displays
- [ ] API returns 404 status

**Screenshots Required:**
- 404 error state

---

## AC11: Data Aggregation Accuracy

### TC 11.1: All Data Sources Integrated
**Priority:** P0
**Preconditions:**
- Student has data across all systems (user, coins, shop, wtf, learning, wellness)

**Steps:**
1. Navigate to student profile
2. Manually verify each data point against database/API

**Expected Results:**
- [ ] User data matches User model
- [ ] Coin data matches Coin transactions
- [ ] Shop data matches Order records
- [ ] WTF data matches WTF pins/submissions
- [ ] Learning data matches assigned machines
- [ ] Wellness data matches mood tracker records
- [ ] All aggregated data is accurate

**API Validation:**
- Single profile API call returns all data
- No data inconsistencies

---

## Test Execution Notes

- All tests should be executed using Playwright MCP
- Screenshots should be saved to `.playwright-mcp/` directory
- Test execution order: AC1 → AC11
- Priority P0 tests must pass before release
- Priority P1 tests are important but not blocking

---

## Test Sign-Off

**QA Agent:** [To be filled by QA]
**Test Date:** [To be filled by QA]
**Test Status:** ⏳ PENDING
**Pass Rate:** [X/Y tests passed]
**Notes:** [Any issues or observations]

---

**Last Updated:** 2025-10-19 17:34:45 (via `date '+%Y-%m-%d %H:%M:%S'`)
