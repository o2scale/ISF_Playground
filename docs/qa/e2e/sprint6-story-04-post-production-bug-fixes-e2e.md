# Sprint 6 Story 4 - E2E Test Cases: Post-Production Bug Fixes

**Story:** Sprint6-Story-04 - Post-Production Bug Fixes
**Created:** 2025-11-13 18:18:00
**Last Updated:** 2025-11-13 19:44:50
**Test Type:** End-to-End Manual Testing
**Priority:** HIGH
**Bugs Covered:** 3 bugs (Task Assignment, Purchase Dashboard, WTF UI Cleanup)

---

## 📋 Test Overview

This document contains comprehensive E2E test cases for verifying the fixes for three post-production bugs:
1. **Bug 1:** Task assignment restricted to students only
2. **Bug 2:** Purchase dashboard showing all requests to all users
3. **Bug 3:** WTF UI cleanup - Remove sidebar, categories, and hamburger menu from functionality

**Total Test Cases:** 18 test cases across 3 bug fixes

---

## 🎯 Test Execution Summary Template

| Test ID | Test Name | Status | Tester | Date | Notes |
|---------|-----------|--------|--------|------|-------|
| TC-B1-01 | Coach task assignment - Non-students visible | ⏳ | | | |
| TC-B1-02 | Coach task assignment - Students not visible | ⏳ | | | |
| TC-B1-03 | Coach task assignment - Create task success | ⏳ | | | |
| TC-B1-04 | Coach task assignment - Multiple Balagruhas | ⏳ | | | |
| TC-B1-05 | Admin task assignment - Global access | ⏳ | | | |
| TC-B1-06 | Sports/Music coach task assignment | ⏳ | | | |
| TC-B2-01 | Purchase dashboard - Regular user sees own only | ⏳ | | | |
| TC-B2-02 | Purchase dashboard - Regular user cannot see others | ⏳ | | | |
| TC-B2-03 | Purchase dashboard - Admin sees all | ⏳ | | | |
| TC-B2-04 | Purchase dashboard - Purchase manager sees all | ⏳ | | | |
| TC-B2-05 | Purchase dashboard - Filter by status works | ⏳ | | | |
| TC-B2-06 | Purchase dashboard - API security test | ⏳ | | | |
| TC-B3-01 | WTF UI - Left sidebar NOT visible | ⏳ | | | |
| TC-B3-02 | WTF UI - Categories section NOT visible | ⏳ | | | |
| TC-B3-03 | WTF UI - Hamburger menu NOT visible | ⏳ | | | |
| TC-B3-04 | WTF UI - No console errors | ⏳ | | | |
| TC-B3-05 | WTF UI - All roles see clean page | ⏳ | | | |
| TC-B3-06 | WTF UI - Page functionality intact | ⏳ | | | |

---

## 🧪 Bug 1: Task Assignment - Test Cases

### TC-B1-01: Coach Task Assignment - Non-Students Visible

**Priority:** P0 (Critical)
**Preconditions:**
- Coach user account exists (e.g., Logan)
- Coach has at least one assigned Balagruha
- Multiple non-student users exist in coach's Balagruha (coaches, staff, admins)

**Test Steps:**
1. Login as coach user (e.g., coach1@test.com)
2. Navigate to "Task Management" or relevant task creation page
3. Click "Create New Task" or similar button
4. Locate the "Assign To" dropdown field
5. Click to open the dropdown
6. Observe the list of users shown

**Expected Results:**
- ✅ Dropdown opens successfully
- ✅ Dropdown shows coaches from assigned Balagruha(s)
- ✅ Dropdown shows sports-coaches from assigned Balagruha(s)
- ✅ Dropdown shows music-coaches from assigned Balagruha(s)
- ✅ Dropdown shows staff members from assigned Balagruha(s)
- ✅ Dropdown shows admins
- ✅ Each user shows name and role (e.g., "John Doe (coach)")

**Pass Criteria:** All non-student users from coach's assigned Balagruha(s) are visible in dropdown

---

### TC-B1-02: Coach Task Assignment - Students NOT Visible

**Priority:** P0 (Critical)
**Preconditions:**
- Coach user account exists
- Coach has assigned Balagruha with students
- Multiple student users exist in the Balagruha

**Test Steps:**
1. Login as coach user
2. Navigate to task creation page
3. Open "Assign To" dropdown
4. Scroll through entire user list
5. Search for known student names (if search exists)
6. Verify student role is not present

**Expected Results:**
- ✅ NO students appear in the dropdown
- ✅ Student role is completely absent from the list
- ✅ Dropdown shows "0 students" or students not listed
- ✅ Search for student names returns no results

**Pass Criteria:** Zero students visible in task assignment dropdown

---

### TC-B1-03: Coach Task Assignment - Create Task Success

**Priority:** P0 (Critical)
**Preconditions:**
- Coach user logged in
- Non-student users available in dropdown

**Test Steps:**
1. Login as coach user
2. Navigate to task creation page
3. Fill in task details:
   - Title: "Test Task - Coach Assignment"
   - Description: "E2E test for bug fix verification"
   - Priority: "High"
   - Deadline: Tomorrow's date
4. Open "Assign To" dropdown
5. Select a coach user from the list
6. Click "Create Task" or "Submit"
7. Wait for response
8. Navigate to task list
9. Verify task appears

**Expected Results:**
- ✅ Task form submits successfully
- ✅ Success message appears (e.g., "Task created successfully")
- ✅ No authorization errors
- ✅ Task appears in task list
- ✅ Assigned user shows correct name
- ✅ Task details are correct

**Pass Criteria:** Coach can successfully create task assigned to non-student user

---

### TC-B1-04: Coach Task Assignment - Multiple Balagruhas

**Priority:** P1 (High)
**Preconditions:**
- Coach user assigned to multiple Balagruhas (e.g., Balagruha A and B)
- Different users exist in each Balagruha

**Test Steps:**
1. Login as multi-Balagruha coach
2. Navigate to task creation
3. Open "Assign To" dropdown
4. Note all visible users
5. Verify users from BOTH assigned Balagruhas are visible
6. Verify users from UNASSIGNED Balagruhas are NOT visible

**Expected Results:**
- ✅ Users from Balagruha A are visible
- ✅ Users from Balagruha B are visible
- ✅ Users from Balagruha C (unassigned) are NOT visible
- ✅ No duplicate users in dropdown

**Pass Criteria:** Dropdown shows users from all assigned Balagruhas, none from unassigned

---

### TC-B1-05: Admin Task Assignment - Global Access

**Priority:** P1 (High)
**Preconditions:**
- Admin user account exists
- Users exist across multiple Balagruhas

**Test Steps:**
1. Login as admin user
2. Navigate to task creation
3. Open "Assign To" dropdown
4. Note all visible users

**Expected Results:**
- ✅ Users from ALL Balagruhas are visible
- ✅ Coaches from all Balagruhas shown
- ✅ Staff from all Balagruhas shown
- ✅ NO students from any Balagruha shown
- ✅ Admin can assign to any coach/staff globally

**Pass Criteria:** Admin sees all coaches/staff globally (no students)

---

### TC-B1-06: Sports/Music Coach Task Assignment

**Priority:** P1 (High)
**Preconditions:**
- Sports-coach or music-coach user account exists
- Users exist in assigned Balagruha

**Test Steps:**
1. Login as sports-coach user
2. Navigate to task creation
3. Open "Assign To" dropdown
4. Verify behavior matches regular coach

**Expected Results:**
- ✅ Dropdown shows users from assigned Balagruha(s)
- ✅ No students visible
- ✅ Can create task successfully

**Pass Criteria:** Sports-coach and music-coach roles work identically to coach role

---

## 🧪 Bug 2: Purchase Dashboard - Test Cases

### TC-B2-01: Purchase Dashboard - Regular User Sees Own Only

**Priority:** P0 (Critical)
**Preconditions:**
- Regular user account exists (not admin, not purchase-manager)
- User has created at least 2 purchase requests
- Other users have also created purchase requests

**Test Steps:**
1. Login as regular user (e.g., coach1@test.com)
2. Navigate to Purchase Dashboard
3. Wait for purchase requests to load
4. Note all visible purchase requests
5. Check "Created By" field for each request
6. Count total requests shown

**Expected Results:**
- ✅ Only requests created by logged-in user are visible
- ✅ "Created By" field shows only logged-in user's name
- ✅ Count matches user's own requests only
- ✅ NO requests from other users visible

**Pass Criteria:** Regular user sees ONLY their own purchase requests

---

### TC-B2-02: Purchase Dashboard - Regular User Cannot See Others

**Priority:** P0 (Critical)
**Preconditions:**
- Regular user logged in
- Another user (User B) has created purchase requests
- User B's requests are known (e.g., PR-001, PR-002)

**Test Steps:**
1. Login as regular user (User A)
2. Navigate to Purchase Dashboard
3. Search for User B's request ID (if search exists)
4. Scroll through all pages of requests
5. Check filters (All, Pending, Approved, etc.)
6. Try direct URL access to User B's request (if applicable)

**Expected Results:**
- ✅ User B's requests do NOT appear in list
- ✅ Search for User B's request ID returns no results
- ✅ Filtering does not reveal other users' requests
- ✅ Direct URL access to other user's request returns 403/404

**Pass Criteria:** Regular user CANNOT see other users' purchase requests by any means

---

### TC-B2-03: Purchase Dashboard - Admin Sees All

**Priority:** P0 (Critical)
**Preconditions:**
- Admin user account exists
- Multiple users have created purchase requests
- At least 5+ purchase requests exist from different users

**Test Steps:**
1. Login as admin user
2. Navigate to Purchase Dashboard
3. Note all visible purchase requests
4. Check "Created By" field for requests
5. Verify requests from multiple users are visible

**Expected Results:**
- ✅ Requests from ALL users are visible
- ✅ "Created By" field shows different user names
- ✅ Admin can see global view of all purchase requests
- ✅ Count includes requests from all users

**Pass Criteria:** Admin sees ALL purchase requests from all users

---

### TC-B2-04: Purchase Dashboard - Purchase Manager Sees All

**Priority:** P0 (Critical)
**Preconditions:**
- Purchase-manager user account exists
- Multiple purchase requests exist from different users

**Test Steps:**
1. Login as purchase-manager user
2. Navigate to Purchase Dashboard
3. Note all visible purchase requests
4. Verify global access like admin

**Expected Results:**
- ✅ Requests from ALL users are visible
- ✅ Purchase manager has same global view as admin
- ✅ Can see and manage all purchase requests

**Pass Criteria:** Purchase-manager sees ALL purchase requests (same as admin)

---

### TC-B2-05: Purchase Dashboard - Filter by Status Works

**Priority:** P1 (High)
**Preconditions:**
- User has purchase requests in different statuses (Pending, Approved, Rejected)

**Test Steps:**
1. Login as regular user
2. Navigate to Purchase Dashboard
3. Note total requests shown (should be user's own only)
4. Apply "Pending" filter
5. Verify only pending requests shown (user's own)
6. Apply "Approved" filter
7. Verify only approved requests shown (user's own)

**Expected Results:**
- ✅ Filters work correctly
- ✅ Filtered results still show ONLY user's own requests
- ✅ Other users' requests do not appear in filtered results

**Pass Criteria:** Status filtering works AND respects user-level filtering

---

### TC-B2-06: Purchase Dashboard - API Security Test

**Priority:** P1 (High)
**Preconditions:**
- Regular user logged in
- Developer tools available (Chrome DevTools, Postman)
- Another user's purchase request ID is known

**Test Steps:**
1. Login as regular user (User A)
2. Open browser DevTools → Network tab
3. Navigate to Purchase Dashboard
4. Observe API request: `GET /api/v1/purchase-repair/purchase-orders`
5. Copy the API request
6. Modify query parameters to try accessing all requests
7. Try direct API call to get other user's request by ID

**Expected Results:**
- ✅ API request includes user authentication
- ✅ Response contains only logged-in user's requests
- ✅ Modified API call still returns only user's own requests
- ✅ Direct access to other user's request returns 403 Forbidden

**Pass Criteria:** Backend API enforces user-level filtering (cannot be bypassed)

**Note:** This test requires technical knowledge. Can be performed by QA with dev support.

---

## 🧪 Bug 3: WTF UI Cleanup - Test Cases

**Client Request:** Remove sidebar, categories, and hamburger menu from functionality (code preserved for restoration)

### TC-B3-01: WTF UI - Left Sidebar NOT Visible

**Priority:** P0 (Critical)
**Preconditions:**
- Any user account (student, coach, admin)
- Browser cache cleared (or use incognito mode)

**Test Steps:**
1. Login as any user
2. Navigate to WTF section (Wall of Fame / Work Time Flow)
3. Look for left sidebar navigation
4. Inspect the page layout
5. Verify no sidebar element is rendered

**Expected Results:**
- ✅ NO left sidebar visible
- ✅ Page takes full width (no sidebar space reserved)
- ✅ Main content area starts at left edge
- ✅ No white border or sidebar outline visible
- ✅ Page layout is clean and uncluttered

**Pass Criteria:** Left sidebar is completely removed from functionality (not visible)

**Screenshot:** Capture WTF page showing no left sidebar

---

### TC-B3-02: WTF UI - Categories Section NOT Visible

**Priority:** P0 (Critical)
**Preconditions:**
- Any user account
- On WTF section

**Test Steps:**
1. Navigate to WTF section
2. Look for Categories section (Medical, Life Skills, Spoken Eng, Comp Apps, etc.)
3. Scroll through the entire page
4. Search page for "Medical", "Life Skills", "Categories" (Ctrl+F)

**Expected Results:**
- ✅ NO Categories section visible
- ✅ NO category buttons (Medical, Life Skills, Spoken Eng, Comp Apps, Art Therapy, Sports)
- ✅ Search finds no category buttons in UI
- ✅ Page header is clean
- ✅ Only type filter buttons visible (All, Images, Videos, Audio, Text)

**Pass Criteria:** Categories section is completely removed from functionality (not visible)

**Screenshot:** Capture WTF page showing no categories section

---

### TC-B3-03: WTF UI - Hamburger Menu NOT Visible

**Priority:** P0 (Critical)
**Preconditions:**
- Any user account
- On WTF section

**Test Steps:**
1. Navigate to WTF section
2. Look for hamburger menu icon (☰) in top left
3. Check header area thoroughly
4. Verify no toggle button present

**Expected Results:**
- ✅ NO hamburger menu icon (☰) visible
- ✅ Top left area is clean
- ✅ No sidebar toggle button anywhere on page
- ✅ Header renders without hamburger menu

**Pass Criteria:** Hamburger menu button is completely removed from functionality (not visible)

**Screenshot:** Capture top left area showing no hamburger menu

---

### TC-B3-04: WTF UI - No Console Errors

**Priority:** P1 (High)
**Preconditions:**
- Browser DevTools available

**Test Steps:**
1. Open browser DevTools → Console tab
2. Clear console
3. Login as user
4. Navigate to WTF section
5. Observe console for errors
6. Interact with page (scroll, click filters, etc.)

**Expected Results:**
- ✅ No JavaScript errors in console
- ✅ No "Cannot read property" errors
- ✅ No "Component not found" errors
- ✅ No warnings about missing imports
- ✅ No React rendering errors

**Pass Criteria:** Zero console errors related to WTF UI rendering

**Screenshot:** Capture clean console with no errors

---

### TC-B3-05: WTF UI - All Roles See Clean Page

**Priority:** P1 (High)
**Preconditions:**
- Multiple user accounts with different roles (student, coach, admin)

**Test Steps:**
1. Login as student user
2. Navigate to WTF section
3. Verify no sidebar, no categories, no hamburger menu
4. Logout
5. Login as coach user
6. Navigate to WTF section
7. Verify no sidebar, no categories, no hamburger menu
8. Logout
9. Login as admin user
10. Navigate to WTF section
11. Verify no sidebar, no categories, no hamburger menu

**Expected Results:**
- ✅ Student sees clean WTF page (no sidebar, categories, or hamburger)
- ✅ Coach sees clean WTF page (no sidebar, categories, or hamburger)
- ✅ Admin sees clean WTF page (no sidebar, categories, or hamburger)
- ✅ All roles have consistent clean UI
- ✅ Admin controls still visible for admins (separate from sidebar)

**Pass Criteria:** All user roles see clean WTF page with hidden UI elements

**Screenshot:** Capture WTF page for each role showing clean UI

---

### TC-B3-06: WTF UI - Page Functionality Intact

**Priority:** P1 (High)
**Preconditions:**
- User on WTF section
- WTF features are known (pins, submissions, etc.)

**Test Steps:**
1. Navigate to WTF section
2. Test core WTF features:
   - Create a new pin (if admin)
   - View existing pins
   - Filter by type (All, Images, Videos, Audio, Text)
   - Interact with WTF content
   - Use admin controls (if admin user)
3. Verify all features work as expected

**Expected Results:**
- ✅ All WTF features work correctly
- ✅ No functionality broken by UI cleanup
- ✅ Pin creation works (for admins)
- ✅ Content display works
- ✅ Type filters work (All, Images, Videos, Audio, Text)
- ✅ Admin controls panel visible and functional (for admins)
- ✅ Pins can be viewed, clicked, interacted with
- ✅ Navigation between WTF sections works

**Pass Criteria:** All WTF functionality remains intact after removing courses menu

---

## 📊 Test Data Requirements

### User Accounts Needed

| Role | Email | Password | Balagruha(s) | Purpose |
|------|-------|----------|--------------|---------|
| Coach 1 | coach1@test.com | Coach@2024 | Balagruha A | Single Balagruha testing |
| Coach 2 | coach2@test.com | Coach@2024 | Balagruha A, B | Multiple Balagruha testing |
| Sports Coach | sportscoach@test.com | Coach@2024 | Balagruha B | Sports-coach role testing |
| Music Coach | musiccoach@test.com | Coach@2024 | Balagruha C | Music-coach role testing |
| Admin | admin@test.com | Admin@2024 | All (global) | Admin global access testing |
| Purchase Manager | pm@test.com | PM@2024 | N/A | Purchase manager testing |
| Regular User 1 | user1@test.com | User@2024 | Balagruha A | Purchase filtering testing |
| Regular User 2 | user2@test.com | User@2024 | Balagruha B | Purchase filtering testing |
| Student 1 | student1@test.com | Student@2024 | Balagruha A | Verify not in task dropdown |
| Student 2 | student2@test.com | Student@2024 | Balagruha B | Verify not in task dropdown |

### Test Data

**Balagruha A:**
- 2 coaches
- 2 students (should NOT appear in task assignment)
- 1 sports-coach

**Balagruha B:**
- 2 coaches
- 2 students (should NOT appear in task assignment)
- 1 music-coach

**Balagruha C:**
- 2 coaches (should NOT appear to Coach 1)
- 2 students

**Purchase Requests:**
- User 1: 3 purchase requests (PR-001, PR-002, PR-003)
- User 2: 2 purchase requests (PR-004, PR-005)
- Admin: 1 purchase request (PR-006)
- Coach 1: 2 purchase requests (PR-007, PR-008)

---

## ⚡ Quick Verification Script (30 Minutes)

For rapid verification of all 3 bugs:

### Quick Test 1: Task Assignment (10 min)
```
1. Login as coach1@test.com
2. Create task → Open "Assign To" dropdown
3. ✅ Verify: Coaches/staff visible, NO students
4. Assign to a coach → Submit
5. ✅ Verify: Task created successfully
```

### Quick Test 2: Purchase Dashboard (10 min)
```
1. Login as user1@test.com
2. Go to Purchase Dashboard
3. ✅ Verify: Only user1's requests visible (PR-001, PR-002, PR-003)
4. Logout → Login as admin@test.com
5. Go to Purchase Dashboard
6. ✅ Verify: ALL requests visible (PR-001 through PR-008)
```

### Quick Test 3: WTF Navigation (10 min)
```
1. Login as any user
2. Navigate to WTF section
3. Look at left sidebar
4. ✅ Verify: NO "Courses" menu item
5. ✅ Verify: Sidebar looks clean
6. ✅ Verify: No console errors
```

**Total Time:** 30 minutes for quick verification of all 3 bugs

---

## 🐛 Bug Reporting Template

If any test fails, use this template to report the bug:

```markdown
**Bug Title:** [Short description]
**Story:** Sprint6-Story-04
**Test Case:** TC-BX-XX
**Priority:** P0/P1/P2
**Environment:** Development/Staging/Production

**Steps to Reproduce:**
1.
2.
3.

**Expected Result:**
[What should happen]

**Actual Result:**
[What actually happened]

**Screenshots:**
[Attach screenshots]

**Console Errors:**
[Any JavaScript errors]

**Additional Notes:**
[Any other relevant information]
```

---

## ✅ Test Completion Checklist

Before marking story as "QA Complete":

### Bug 1: Task Assignment
- [ ] TC-B1-01: Non-students visible in dropdown
- [ ] TC-B1-02: Students NOT visible in dropdown
- [ ] TC-B1-03: Task creation success
- [ ] TC-B1-04: Multiple Balagruhas work correctly
- [ ] TC-B1-05: Admin global access verified
- [ ] TC-B1-06: Sports/Music coach roles work

### Bug 2: Purchase Dashboard
- [ ] TC-B2-01: Regular user sees own only
- [ ] TC-B2-02: Regular user cannot see others
- [ ] TC-B2-03: Admin sees all requests
- [ ] TC-B2-04: Purchase manager sees all
- [ ] TC-B2-05: Filters work with user filtering
- [ ] TC-B2-06: API security verified

### Bug 3: WTF Navigation
- [ ] TC-B3-01: Courses menu removed
- [ ] TC-B3-02: Sidebar renders correctly
- [ ] TC-B3-03: No console errors
- [ ] TC-B3-04: Collapse/expand works
- [ ] TC-B3-05: All roles see clean nav
- [ ] TC-B3-06: WTF functionality intact

### Documentation
- [ ] All test cases executed
- [ ] Test results recorded
- [ ] Bugs reported (if any)
- [ ] Screenshots captured
- [ ] QA sign-off obtained

---

## 📈 Expected Test Results

### Pass Criteria for Story Sign-Off

| Bug | Must Pass | Should Pass | Can Defer |
|-----|-----------|-------------|-----------|
| **Bug 1** | TC-B1-01, TC-B1-02, TC-B1-03 | TC-B1-04, TC-B1-05 | TC-B1-06 |
| **Bug 2** | TC-B2-01, TC-B2-02, TC-B2-03 | TC-B2-04, TC-B2-05 | TC-B2-06 |
| **Bug 3** | TC-B3-01, TC-B3-02 | TC-B3-03, TC-B3-05 | TC-B3-04, TC-B3-06 |

**Minimum Pass Rate:** 80% (15 out of 18 test cases)
**Critical Pass Rate:** 100% (All P0 test cases must pass)

---

## 🔗 Related Documentation

- **Story Document:** `docs/stories/sprint6/sprint6-story-04-post-production-bug-fixes.md`
- **QA Handoff:** `docs/qa/QA-HANDOFF-S6-S4.md`
- **Bug Fix Commit:** `6b7256a`

---

**End of E2E Test Cases**

*For questions or clarifications, contact the development team.*
