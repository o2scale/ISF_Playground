# E2E Test Scenarios - Bug Fix: Schedule Assignment Authorization (S6-S1-PROD-BUG-001)

**Bug ID:** S6-S1-PROD-BUG-001
**Story ID:** Sprint6-Story-01
**Epic:** Sprint 6 - Coach View Corrections & Medical History Alignment
**Test Type:** End-to-End (E2E) - Manual Testing Scenarios
**Created:** 2025-11-13 17:20:52
**Status:** Ready for QA Testing
**Last Updated:** 2025-11-13 17:20:52 (via `date '+%Y-%m-%d %H:%M:%S'`)
**Updated By:** Dev Agent

---

## Executive Summary

**Bug Description:**
Coaches were unable to create schedules due to backend authorization blocking all non-ADMIN roles. Additionally, the "Assign To" dropdown showed ALL users (including users from other Balagruhas) instead of only showing users from the coach's assigned Balagruhas.

**Fix Implemented:**
- Backend authorization updated to allow both ADMIN and COACH roles
- New API endpoint created that returns filtered users based on role and Balagruha assignments
- ADMIN can assign to any coach/staff (excludes students)
- COACH can only assign to coaches/staff in their assigned Balagruhas (excludes students)

**Files Modified:**
- `backend/controllers/userController.js` (new API endpoint)
- `backend/routes/userRoutes.js` (route registration)
- `backend/services/schedule.js` (authorization logic)
- `frontend/src/api.js` (new API function)
- `frontend/src/components/dashboard/coach.js` (use new API)
- `frontend/src/components/dashboard/WeeklyCalendar.js` (remove frontend filtering)

---

## Test Environment Setup

### Prerequisites
- Backend server running on port 5001
- Frontend server running on port 3000
- Test database with the following data:
  - **Multiple Balagruhas** (at least 3: Balagruha A, B, C)
  - **Multiple user roles** across different Balagruhas
  - **Schedule creation permissions** enabled

### Test Users

#### Coach Account 1 (Single Balagruha)
- **Email:** coach1@test.com
- **Password:** Coach@2024
- **Role:** coach
- **Assigned Balagruhas:** Balagruha A only
- **Purpose:** Test coach can only see/assign users from assigned Balagruha

#### Coach Account 2 (Multiple Balagruhas)
- **Email:** coach2@test.com
- **Password:** Coach@2024
- **Role:** coach
- **Assigned Balagruhas:** Balagruha A, Balagruha B
- **Purpose:** Test coach can see/assign users from multiple assigned Balagruhas

#### Sports Coach Account
- **Email:** sportscoach@test.com
- **Password:** Coach@2024
- **Role:** sports-coach
- **Assigned Balagruhas:** Balagruha B
- **Purpose:** Test sports-coach role has same permissions as coach

#### Admin Account
- **Email:** admin@test.com
- **Password:** Admin@2024
- **Role:** admin
- **Purpose:** Test admin can assign to any coach/staff globally

### Test Data Requirements

**Balagruha A:**
- 2 coaches (coach1, coach3)
- 2 students (student1, student2)
- 1 sports-coach (sportscoach1)

**Balagruha B:**
- 2 coaches (coach2, coach4)
- 2 students (student3, student4)
- 1 music-coach (musiccoach1)

**Balagruha C:**
- 2 coaches (coach5, coach6)
- 2 students (student5, student6)
- 1 sports-coach (sportscoach2)

**Global Users (No Balagruha or Multi-Balagruha):**
- 1 admin (adminuser)
- 1 coach with multiple Balagruhas (coach2 assigned to A and B)

---

## Test Execution Guide

### 🔴 CRITICAL: Pre-Test Verification

Before running test cases, verify the bug fix is in place:

**Backend Verification:**
1. Check `backend/services/schedule.js` line ~25: Should allow both ADMIN and COACH roles
2. Check `backend/controllers/userController.js` line ~1045: New `getAssignableUsersForSchedule` function exists
3. Check `backend/routes/userRoutes.js` line ~250: Route `/assignable-for-schedule` exists

**Frontend Verification:**
1. Check `frontend/src/api.js` line ~118: `getAssignableUsersForSchedule` function exists
2. Check `frontend/src/components/dashboard/coach.js` line ~96: Uses `getAssignableUsersForSchedule()`

---

## Test Cases

## Test Case 1: Coach Can Create Schedules (Authorization Fix)

**Objective:** Verify coaches are no longer blocked from creating schedules

### TC-1.1: Coach Can Access Schedule Creation UI
**Test ID:** `S6-S1-BUG001-TC-1.1`
**Priority:** P0 - Critical
**Bug Fix Verification:** Root Cause #1 - Backend authorization

**Preconditions:**
- Logged in as **coach1@test.com** (Coach@2024)
- Navigated to Coach Dashboard

**Steps:**
1. Click "Daily Schedule" card on dashboard
2. Observe Weekly Calendar opens
3. Click on any time slot (e.g., Monday 9:00 AM)
4. Observe if "Create Schedule" modal/form opens
5. Fill in schedule details:
   - Title: "Team Meeting"
   - Description: "Weekly team sync"
   - Select Balagruha: "Balagruha A"
   - Click "Assign To" dropdown

**Expected Results:**
- ✅ Weekly Calendar opens without errors
- ✅ Time slot is clickable
- ✅ Create Schedule modal/form opens
- ✅ "Assign To" dropdown shows users (not empty)
- ✅ NO authorization error message displayed
- ✅ Console shows no 403 Forbidden errors

**Previous Behavior (Bug):**
- ❌ Got authorization error: "You are not authorized to create a schedule"
- ❌ Backend returned 403 or schedule creation failed
- ❌ Console showed authorization rejection

**Screenshot Required:** `S6-S1-BUG001-TC-1.1-coach-can-create.png`

---

### TC-1.2: Coach Can Successfully Submit Schedule
**Test ID:** `S6-S1-BUG001-TC-1.2`
**Priority:** P0 - Critical

**Preconditions:**
- TC-1.1 completed successfully
- Schedule creation form is open
- "Assign To" dropdown populated with users

**Steps:**
1. In the schedule creation form:
   - Title: "Morning Training"
   - Start Time: 09:00 AM
   - End Time: 10:00 AM
   - Balagruha: "Balagruha A"
   - Assign To: Select "coach3" (who is in Balagruha A)
2. Click "Save" or "Create Schedule" button
3. Observe response
4. Check if schedule appears in calendar

**Expected Results:**
- ✅ Form submission succeeds (no errors)
- ✅ Success message displayed (e.g., "Schedule created successfully")
- ✅ Schedule appears in Weekly Calendar at correct time slot
- ✅ Schedule shows assigned user: "coach3"
- ✅ Modal closes after successful creation

**Screenshot Required:**
- `S6-S1-BUG001-TC-1.2-schedule-created.png`
- `S6-S1-BUG001-TC-1.2-calendar-with-schedule.png`

---

### TC-1.3: Sports-Coach and Music-Coach Can Create Schedules
**Test ID:** `S6-S1-BUG001-TC-1.3`
**Priority:** P1 - High

**Preconditions:**
- Logged out from coach1 account
- Logged in as **sportscoach@test.com** (Coach@2024)

**Steps:**
1. Navigate to Dashboard
2. Click "Daily Schedule" card
3. Click any time slot to create schedule
4. Fill schedule details and submit
5. Verify schedule is created

**Expected Results:**
- ✅ Sports-coach can access schedule creation
- ✅ Sports-coach can successfully create schedules
- ✅ No authorization errors

**Repeat for Music-Coach:**
- Logout and login as music-coach
- Verify same functionality works

**Screenshot Required:** `S6-S1-BUG001-TC-1.3-sports-coach-success.png`

---

## Test Case 2: Coach Sees Only Assigned Balagruha Users (Filtered Dropdown)

**Objective:** Verify coaches only see users from their assigned Balagruhas in "Assign To" dropdown

### TC-2.1: Single Balagruha Coach - Filtered User List
**Test ID:** `S6-S1-BUG001-TC-2.1`
**Priority:** P0 - Critical
**Bug Fix Verification:** Root Cause #2 - Frontend filtering insufficient

**Preconditions:**
- Logged in as **coach1@test.com** (assigned only to Balagruha A)
- On Weekly Calendar view
- Schedule creation modal open

**Steps:**
1. Click "Assign To" dropdown
2. Observe list of users displayed
3. Count total users in dropdown
4. Verify which Balagruhas the displayed users belong to
5. Check if any students appear in the list
6. Check if admin users appear in the list

**Expected Results:**
- ✅ Dropdown shows ONLY users from Balagruha A
- ✅ Visible users should be:
  - coach3 (Balagruha A)
  - sportscoach1 (Balagruha A)
- ✅ Total users shown: 2 (only coaches/staff from Balagruha A)
- ✅ NO students visible (student1, student2 should NOT appear)
- ✅ NO admin users visible
- ✅ NO users from Balagruha B or C visible (coach2, coach4, coach5, coach6, etc.)

**Previous Behavior (Bug):**
- ❌ Dropdown showed ALL users from ALL Balagruhas
- ❌ coach2, coach4, coach5, coach6 (from other Balagruhas) were visible
- ❌ Students were visible (though frontend filtered them, backend didn't)

**Screenshot Required:** `S6-S1-BUG001-TC-2.1-coach1-dropdown-filtered.png`

---

### TC-2.2: Multiple Balagruha Coach - Shows Users from All Assigned Balagruhas
**Test ID:** `S6-S1-BUG001-TC-2.2`
**Priority:** P0 - Critical

**Preconditions:**
- Logged out from coach1 account
- Logged in as **coach2@test.com** (assigned to both Balagruha A and B)
- Schedule creation modal open

**Steps:**
1. Click "Assign To" dropdown
2. Observe list of users
3. Verify users from both Balagruha A and B are visible
4. Verify users from Balagruha C are NOT visible

**Expected Results:**
- ✅ Dropdown shows users from BOTH Balagruha A and B
- ✅ Visible users should include:
  - coach1 (Balagruha A)
  - coach3 (Balagruha A)
  - sportscoach1 (Balagruha A)
  - coach4 (Balagruha B)
  - musiccoach1 (Balagruha B)
- ✅ Users from Balagruha C NOT visible (coach5, coach6, sportscoach2)
- ✅ NO students visible from any Balagruha
- ✅ Total users shown: ~5 users (coaches/staff from A and B)

**Screenshot Required:** `S6-S1-BUG001-TC-2.2-coach2-multi-balagruha.png`

---

### TC-2.3: Students Never Appear in Dropdown
**Test ID:** `S6-S1-BUG001-TC-2.3`
**Priority:** P0 - Critical

**Preconditions:**
- Logged in as any coach account
- Schedule creation modal open

**Steps:**
1. Open "Assign To" dropdown
2. Scroll through entire user list
3. Search for student names (student1, student2, student3, etc.)
4. Verify no users with role "student" appear

**Expected Results:**
- ✅ NO students visible in dropdown
- ✅ All visible users have role: coach, sports-coach, or music-coach
- ✅ Specifically verify these students are NOT visible:
  - student1, student2 (Balagruha A)
  - student3, student4 (Balagruha B)
  - student5, student6 (Balagruha C)

**Screenshot Required:** `S6-S1-BUG001-TC-2.3-no-students.png`

---

## Test Case 3: Admin Can Assign to Any Coach/Staff (Global Access)

**Objective:** Verify admin users can see and assign schedules to any coach/staff across all Balagruhas

### TC-3.1: Admin Sees All Coaches/Staff Globally
**Test ID:** `S6-S1-BUG001-TC-3.1`
**Priority:** P0 - Critical

**Preconditions:**
- Logged out from coach account
- Logged in as **admin@test.com** (Admin@2024)
- Navigated to Coach Dashboard (if accessible) or Admin Dashboard
- Schedule creation modal open

**Steps:**
1. Navigate to Weekly Calendar or Schedule Management
2. Open schedule creation form
3. Click "Assign To" dropdown
4. Observe all users displayed
5. Count total users
6. Verify users from all Balagruhas are visible

**Expected Results:**
- ✅ Dropdown shows coaches/staff from ALL Balagruhas
- ✅ Visible users should include:
  - All coaches from Balagruha A (coach1, coach3, sportscoach1)
  - All coaches from Balagruha B (coach2, coach4, musiccoach1)
  - All coaches from Balagruha C (coach5, coach6, sportscoach2)
- ✅ Total users shown: All coaches/staff across system (~8-10 users)
- ✅ NO students visible (students excluded for admin too)
- ✅ NO admin users visible in dropdown (admins don't assign to admins)

**Previous Behavior (Same):**
- Admin always had global access (this should remain unchanged)

**Screenshot Required:** `S6-S1-BUG001-TC-3.1-admin-global-access.png`

---

### TC-3.2: Admin Cannot Assign to Students
**Test ID:** `S6-S1-BUG001-TC-3.2`
**Priority:** P0 - Critical

**Preconditions:**
- Logged in as admin
- Schedule creation modal open

**Steps:**
1. Open "Assign To" dropdown
2. Search for any student user
3. Attempt to find students in the dropdown list

**Expected Results:**
- ✅ NO students appear in admin's dropdown either
- ✅ Admin can only assign to coaches/staff roles
- ✅ This is intentional design: schedules are for staff, not students

**Screenshot Required:** `S6-S1-BUG001-TC-3.2-admin-no-students.png`

---

## Test Case 4: Backend Validation - Coach Cannot Bypass Frontend Restrictions

**Objective:** Verify backend validates coach's Balagruha restrictions even if frontend is bypassed

### TC-4.1: Coach Cannot Create Schedule for Non-Assigned Balagruha (Backend Validation)
**Test ID:** `S6-S1-BUG001-TC-4.1`
**Priority:** P1 - High
**Test Type:** Backend Security Test (API)

**Preconditions:**
- Logged in as **coach1@test.com** (assigned only to Balagruha A)
- Obtained authentication token from browser (DevTools > Application > Local Storage)

**Steps (API Test using Postman/curl):**
1. Open browser DevTools > Network tab
2. Create a valid schedule for Balagruha A (capture the API request)
3. Modify the request to try creating schedule for Balagruha C
4. Send modified request:
   ```json
   POST /api/schedules/new
   Headers: { Authorization: "Bearer <coach1_token>" }
   Body: {
     "balagruhaIds": ["<balagruha_c_id>"],
     "assignedTo": ["<coach5_id>"],
     "schedules": [{ ... }],
     "createdBy": "<coach1_id>",
     "userRole": "coach"
   }
   ```
5. Observe response

**Expected Results:**
- ✅ Request is REJECTED by backend
- ✅ HTTP Status: 400 Bad Request or 403 Forbidden
- ✅ Error message: "You are not authorized to create schedules for Balagruha <id>. You can only assign schedules for your assigned Balagruhas."
- ✅ Schedule is NOT created in database

**Screenshot Required:**
- `S6-S1-BUG001-TC-4.1-backend-validation-rejection.png` (Postman/API response)

---

### TC-4.2: Coach Cannot Assign Schedule to Student (Backend Validation)
**Test ID:** `S6-S1-BUG001-TC-4.2`
**Priority:** P1 - High
**Test Type:** Backend Security Test (API)

**Preconditions:**
- Logged in as coach1
- Has coach1's authentication token

**Steps (API Test):**
1. Attempt to create schedule with student assigned:
   ```json
   POST /api/schedules/new
   Body: {
     "balagruhaIds": ["<balagruha_a_id>"],
     "assignedTo": ["<student1_id>"],
     "schedules": [{ ... }],
     "createdBy": "<coach1_id>",
     "userRole": "coach"
   }
   ```
2. Observe response

**Expected Results:**
- ✅ Request is REJECTED
- ✅ Error message: "Cannot assign schedule to students"
- ✅ Schedule is NOT created

**Screenshot Required:** `S6-S1-BUG001-TC-4.2-student-assignment-blocked.png`

---

### TC-4.3: Coach Cannot Assign to User from Non-Assigned Balagruha (Backend Validation)
**Test ID:** `S6-S1-BUG001-TC-4.3`
**Priority:** P1 - High
**Test Type:** Backend Security Test (API)

**Preconditions:**
- Logged in as coach1 (assigned to Balagruha A only)
- Attempting to assign to coach5 (who is in Balagruha C)

**Steps (API Test):**
1. Create schedule request assigning to user from non-assigned Balagruha:
   ```json
   POST /api/schedules/new
   Body: {
     "balagruhaIds": ["<balagruha_a_id>"],
     "assignedTo": ["<coach5_id>"],
     "schedules": [{ ... }],
     "createdBy": "<coach1_id>",
     "userRole": "coach"
   }
   ```
2. Observe response

**Expected Results:**
- ✅ Request is REJECTED
- ✅ Error message: "You can only assign schedules to users in your assigned Balagruhas"
- ✅ Schedule is NOT created

**Screenshot Required:** `S6-S1-BUG001-TC-4.3-cross-balagruha-blocked.png`

---

## Test Case 5: Regression Testing - Existing Functionality Still Works

**Objective:** Verify the bug fix didn't break existing schedule functionality

### TC-5.1: Admin Can Still Create Schedules (No Regression)
**Test ID:** `S6-S1-BUG001-TC-5.1`
**Priority:** P0 - Critical

**Preconditions:**
- Logged in as admin

**Steps:**
1. Navigate to schedule creation
2. Create schedule for any Balagruha
3. Assign to any coach/staff
4. Submit schedule

**Expected Results:**
- ✅ Admin schedule creation still works as before
- ✅ No new restrictions applied to admin
- ✅ Schedule created successfully

---

### TC-5.2: Schedule Appears in Calendar After Creation
**Test ID:** `S6-S1-BUG001-TC-5.2`
**Priority:** P1 - High

**Preconditions:**
- Schedule created by coach or admin

**Steps:**
1. After schedule creation, close modal
2. Observe Weekly Calendar
3. Navigate to the date/time of created schedule
4. Verify schedule is visible

**Expected Results:**
- ✅ Schedule appears in calendar at correct date/time
- ✅ Schedule shows correct title and assigned user
- ✅ Clicking schedule shows details

---

### TC-5.3: Schedule Overlapping Detection Still Works
**Test ID:** `S6-S1-BUG001-TC-5.3`
**Priority:** P1 - High

**Preconditions:**
- One schedule already exists: Monday 9:00-10:00 AM assigned to coach3

**Steps:**
1. Attempt to create another schedule:
   - Same date: Monday
   - Same time: 9:00-10:00 AM
   - Same user: coach3
2. Submit schedule

**Expected Results:**
- ✅ System detects overlap
- ✅ Error message shown: "Found overlapping schedules"
- ✅ Schedule is NOT created (prevents double-booking)

---

## Test Case 6: Edge Cases and Error Scenarios

### TC-6.1: Coach with No Assigned Balagruha Sees Empty Dropdown
**Test ID:** `S6-S1-BUG001-TC-6.1`
**Priority:** P2 - Medium

**Preconditions:**
- Create a coach user with NO Balagruha assignments
- Login as this coach

**Steps:**
1. Navigate to schedule creation
2. Open "Assign To" dropdown

**Expected Results:**
- ✅ Dropdown is empty (no users to assign)
- ✅ Message displayed: "No assignable users" or dropdown shows empty state
- ✅ Schedule creation may be disabled or shows validation error

---

### TC-6.2: New Backend API Endpoint Returns Correct Data
**Test ID:** `S6-S1-BUG001-TC-6.2`
**Priority:** P1 - High
**Test Type:** API Test

**Preconditions:**
- Authentication token obtained

**Steps:**
1. Make API call to new endpoint:
   ```
   GET /api/users/assignable-for-schedule
   Headers: { Authorization: "Bearer <token>" }
   ```
2. Verify response structure
3. Verify response contains only expected users

**Expected Results for Coach1 (Balagruha A):**
- ✅ HTTP Status: 200 OK
- ✅ Response structure:
   ```json
   {
     "success": true,
     "data": [
       {
         "_id": "...",
         "name": "coach3",
         "email": "coach3@test.com",
         "role": "coach",
         "balagruhaIds": [...]
       },
       {
         "_id": "...",
         "name": "sportscoach1",
         "email": "sportscoach1@test.com",
         "role": "sports-coach",
         "balagruhaIds": [...]
       }
     ]
   }
   ```
- ✅ Only users from Balagruha A returned
- ✅ No students in response

**Expected Results for Admin:**
- ✅ Response contains ALL coaches/staff from ALL Balagruhas

**Screenshot Required:**
- `S6-S1-BUG001-TC-6.2-api-response-coach.png`
- `S6-S1-BUG001-TC-6.2-api-response-admin.png`

---

## Test Summary Checklist

**Before submitting QA results, verify all P0 and P1 test cases passed:**

### Critical (P0) Test Cases - Must Pass:
- [ ] TC-1.1: Coach can access schedule creation UI
- [ ] TC-1.2: Coach can successfully submit schedule
- [ ] TC-2.1: Single Balagruha coach sees filtered user list
- [ ] TC-2.2: Multiple Balagruha coach sees users from all assigned Balagruhas
- [ ] TC-2.3: Students never appear in dropdown
- [ ] TC-3.1: Admin sees all coaches/staff globally
- [ ] TC-3.2: Admin cannot assign to students
- [ ] TC-5.1: Admin schedule creation still works (no regression)

### High Priority (P1) Test Cases - Should Pass:
- [ ] TC-1.3: Sports-coach and music-coach can create schedules
- [ ] TC-4.1: Backend validates coach Balagruha restrictions
- [ ] TC-4.2: Backend blocks assignment to students
- [ ] TC-4.3: Backend blocks cross-Balagruha assignment
- [ ] TC-5.2: Schedule appears in calendar after creation
- [ ] TC-5.3: Schedule overlapping detection still works
- [ ] TC-6.2: New API endpoint returns correct data

### Medium Priority (P2) Test Cases - Nice to Have:
- [ ] TC-6.1: Coach with no assigned Balagruha sees empty dropdown

---

## Known Issues / Expected Behavior

1. **Students Excluded by Design:** Students do NOT appear in "Assign To" dropdown for BOTH admin and coach. This is intentional - schedules are assigned to staff members, not students.

2. **Admin Users Not Assignable:** Admin users also do not appear in the dropdown. Admins create/manage schedules but are not assigned schedules themselves.

3. **Empty Dropdown for New Coaches:** If a coach has just been created and has no Balagruha assignments yet, the "Assign To" dropdown will be empty. This is expected behavior.

---

## Reporting Bugs

If any test case fails, please report with the following information:

**Bug Report Template:**
```
Test Case ID: [e.g., S6-S1-BUG001-TC-2.1]
Test Case Name: [e.g., Single Balagruha Coach - Filtered User List]
Priority: [P0/P1/P2]

Expected Result:
[What should happen]

Actual Result:
[What actually happened]

Steps to Reproduce:
1. [Step 1]
2. [Step 2]
...

Screenshots:
[Attach screenshots]

Console Errors:
[Copy any console errors from browser DevTools]

Environment:
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
- Backend Version: [commit hash]
- Frontend Version: [commit hash]
```

---

## Test Execution Results

**QA Engineer:** _________________________
**Test Date:** _________________________
**Test Duration:** _________________________

**Overall Status:** [ ] PASS [ ] FAIL [ ] BLOCKED

**Test Results Summary:**

| Test Case ID | Test Name | Status | Notes |
|--------------|-----------|--------|-------|
| TC-1.1 | Coach can access schedule creation | [ ] Pass [ ] Fail | |
| TC-1.2 | Coach can submit schedule | [ ] Pass [ ] Fail | |
| TC-1.3 | Sports/Music coach can create | [ ] Pass [ ] Fail | |
| TC-2.1 | Single Balagruha filtered | [ ] Pass [ ] Fail | |
| TC-2.2 | Multiple Balagruha filtered | [ ] Pass [ ] Fail | |
| TC-2.3 | No students in dropdown | [ ] Pass [ ] Fail | |
| TC-3.1 | Admin sees all coaches | [ ] Pass [ ] Fail | |
| TC-3.2 | Admin no students | [ ] Pass [ ] Fail | |
| TC-4.1 | Backend validates Balagruha | [ ] Pass [ ] Fail | |
| TC-4.2 | Backend blocks students | [ ] Pass [ ] Fail | |
| TC-4.3 | Backend blocks cross-Balagruha | [ ] Pass [ ] Fail | |
| TC-5.1 | Admin regression test | [ ] Pass [ ] Fail | |
| TC-5.2 | Schedule appears in calendar | [ ] Pass [ ] Fail | |
| TC-5.3 | Overlap detection works | [ ] Pass [ ] Fail | |
| TC-6.1 | Empty Balagruha coach | [ ] Pass [ ] Fail | |
| TC-6.2 | API endpoint correct | [ ] Pass [ ] Fail | |

**Total Test Cases:** 16
**Passed:** ____
**Failed:** ____
**Pass Rate:** ____%

**Sign-off:**

Developer: _________________________
QA Engineer: _________________________
Date: _________________________

---

## Appendix: Quick Test Script for Manual Testing

**30-Minute Quick Verification Script:**

1. **Login as coach1** (5 min)
   - Create schedule ✓
   - Verify dropdown shows only Balagruha A users ✓
   - Verify no students ✓

2. **Login as coach2** (5 min)
   - Verify dropdown shows Balagruha A + B users ✓
   - Verify no Balagruha C users ✓

3. **Login as admin** (5 min)
   - Verify dropdown shows ALL coaches globally ✓
   - Create schedule ✓

4. **Backend API Test** (5 min)
   - Test new endpoint with Postman ✓

5. **Negative Tests** (10 min)
   - Try to bypass validation via API ✓
   - Verify backend rejects invalid requests ✓

**Total Time:** ~30 minutes for comprehensive verification

---

**End of E2E Test Cases Document**

*For questions or clarifications, contact the development team.*
