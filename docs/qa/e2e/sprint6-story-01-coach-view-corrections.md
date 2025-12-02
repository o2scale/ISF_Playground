# E2E Test Scenarios - Story 01: Coach View Corrections & UI Enhancements

**Story ID:** Sprint6-Story-01
**Epic:** Sprint 6 - Coach View Corrections & Medical History Alignment
**Test Type:** End-to-End (E2E) - Manual Testing Scenarios
**Created:** 2025-11-11
**Status:** Ready for QA Testing
**Last Updated:** 2025-11-11 14:50:00

---

## Test Environment Setup

### Prerequisites
- Backend server running on port 5000
- Frontend server running on port 3000
- Test database with sample data:
  - At least one Balagruha with assigned students
  - Coach user with balagruha assignment
  - Admin user for user management tests
  - At least one student profile
  - At least one task created

### Test Users
- **Coach Account:**
  - Email: coachjoe
  - Password: Coach@2024
  - Role: coach
  - Access: Coach dashboard, Weekly Calendar, Task Management

- **Admin Account:**
  - Email: admintest
  - Password: Admin@2024
  - Role: admin
  - Access: User Management, Full access

### Test Data Requirements
- At least 1 schedule created for Daily Schedule card count
- At least 1 task created for Task Tracker card count
- At least 1 student user for task assignment dropdown testing
- Webcam/camera access enabled in browser for photo capture testing

---

## Test Case 1: AC1 - Month/Year Selector Navigation

**Objective:** Verify Month/Year dropdown selectors replace arrow navigation and navigate correctly

### TC-1.1: Month/Year Selectors Visibility
**Test ID:** `tc-1-1-month-year-selectors-visible`

**Preconditions:**
- User logged in as coach (coachjoe / Coach@2024)
- Navigated to Coach Dashboard
- Clicked "Daily Schedule" card to open Weekly Calendar

**Steps:**
1. Observe calendar header area
2. Look for Month dropdown selector
3. Look for Year dropdown selector
4. Verify no arrow buttons (< >) are present

**Expected Results:**
- ✅ Month dropdown visible with current month selected
- ✅ Year dropdown visible with current year selected
- ✅ Both dropdowns positioned at top of calendar
- ✅ No left/right arrow navigation buttons visible
- ✅ Week range text displayed below selectors showing current week

**Screenshot:** `S6-S1-TC-1.1-month-year-selectors.png`

---

### TC-1.2: Month Dropdown Functionality
**Test ID:** `tc-1-2-month-dropdown-options`

**Preconditions:**
- On Weekly Calendar view

**Steps:**
1. Click on Month dropdown
2. Observe available options
3. Count number of month options
4. Verify all months from January to December are listed

**Expected Results:**
- ✅ Dropdown opens showing all 12 months
- ✅ Months listed: January, February, March, April, May, June, July, August, September, October, November, December
- ✅ Current month is pre-selected
- ✅ Dropdown is styled correctly (readable, proper sizing)

**Screenshot:** `S6-S1-TC-1.2-month-dropdown-open.png`

---

### TC-1.3: Year Dropdown Functionality
**Test ID:** `tc-1-3-year-dropdown-options`

**Preconditions:**
- On Weekly Calendar view

**Steps:**
1. Click on Year dropdown
2. Observe available options
3. Count number of year options
4. Verify year range spans current year ± 2 years

**Expected Results:**
- ✅ Dropdown opens showing 5 years
- ✅ Year range: 2023, 2024, 2025, 2026, 2027 (if current year is 2025)
- ✅ Current year is pre-selected
- ✅ Years listed in ascending order

**Screenshot:** `S6-S1-TC-1.3-year-dropdown-open.png`

---

### TC-1.4: Month Navigation
**Test ID:** `tc-1-4-month-navigation`

**Preconditions:**
- On Weekly Calendar view
- Current month is November 2025

**Steps:**
1. Note current week range displayed (e.g., "Nov 10 - 16, 2025")
2. Click Month dropdown
3. Select "January"
4. Observe calendar updates
5. Verify week range text changes
6. Verify calendar shows first week of January

**Expected Results:**
- ✅ Calendar navigates to first week of January 2025
- ✅ Week range text updates (e.g., "Dec 30, 2024 - Jan 5, 2025" for first week of Jan)
- ✅ Calendar grid displays correct dates
- ✅ Month dropdown now shows "January" selected
- ✅ Year dropdown remains at 2025

**Screenshot:** `S6-S1-TC-1.4-month-navigation-january.png`

---

### TC-1.5: Year Navigation
**Test ID:** `tc-1-5-year-navigation`

**Preconditions:**
- On Weekly Calendar view
- Currently at January 2025

**Steps:**
1. Note current week range
2. Click Year dropdown
3. Select "2024"
4. Observe calendar updates
5. Verify week range updates to January 2024

**Expected Results:**
- ✅ Calendar navigates to first week of January 2024
- ✅ Week range text shows 2024 dates
- ✅ Month dropdown still shows "January"
- ✅ Year dropdown now shows "2024" selected
- ✅ Calendar displays correct week for January 2024

**Screenshot:** `S6-S1-TC-1.5-year-navigation-2024.png`

---

### TC-1.6: Combined Month/Year Navigation
**Test ID:** `tc-1-6-combined-navigation`

**Preconditions:**
- On Weekly Calendar view at any month/year

**Steps:**
1. Select "June" from Month dropdown
2. Select "2024" from Year dropdown
3. Verify calendar navigates to June 2024
4. Select "December" from Month dropdown (keep year at 2024)
5. Verify calendar navigates to December 2024

**Expected Results:**
- ✅ Calendar correctly navigates to June 2024 first week
- ✅ Then navigates to December 2024 first week
- ✅ Week range text accurately reflects selected month/year
- ✅ Both dropdowns maintain selected values
- ✅ No console errors during navigation

**Screenshot:** `S6-S1-TC-1.6-combined-navigation-dec-2024.png`

---

## Test Case 2: AC2 - Schedule Time Extension to 9 PM

**Objective:** Verify calendar displays 15 hours (07:00-21:00) with grid cells extending through all time slots

### TC-2.1: Time Column Extension
**Test ID:** `tc-2-1-time-column-15-hours`

**Preconditions:**
- Logged in as coach
- On Weekly Calendar view

**Steps:**
1. Observe left-side time column
2. Verify first time slot shows "07:00"
3. Scroll down to bottom of calendar
4. Verify last time slot shows "21:00"
5. Count total number of time slots

**Expected Results:**
- ✅ First time slot: 07:00
- ✅ Last time slot: 21:00
- ✅ Total time slots: 15 (07:00, 08:00, 09:00, ..., 20:00, 21:00)
- ✅ All hours displayed with proper formatting (e.g., "07:00", not "7:00")
- ✅ Time column visible and aligned with grid

**Screenshot:** `S6-S1-TC-2.1-time-column-07-to-21.png`

---

### TC-2.2: Grid Cells Alignment with Time Slots
**Test ID:** `tc-2-2-grid-cells-aligned`

**Preconditions:**
- On Weekly Calendar view

**Steps:**
1. Scroll to time slot 07:00
2. Verify grid cells present for all 7 days at 07:00
3. Scroll down through each hour (08:00, 09:00, ..., 21:00)
4. For each hour, verify grid cells exist for all 7 days
5. Specifically check 19:00, 20:00, 21:00 time slots

**Expected Results:**
- ✅ Grid cells present for all 15 hours across all 7 days
- ✅ Times 19:00, 20:00, 21:00 have corresponding grid cells
- ✅ Grid cells show "No events" text or actual scheduled events
- ✅ Grid cells are properly sized and aligned with time slots
- ✅ No missing or blank cells

**Screenshot:** `S6-S1-TC-2.2-grid-cells-19-20-21.png`

---

### TC-2.3: No Visual Artifacts
**Test ID:** `tc-2-3-no-visual-artifacts`

**Preconditions:**
- On Weekly Calendar view

**Steps:**
1. Scroll to bottom of calendar (after 21:00 time slot)
2. Look for any stray characters, brackets, or visual errors
3. Verify clean page bottom with no code artifacts
4. Check browser console for any JavaScript errors

**Expected Results:**
- ✅ No stray "}" or other characters visible below 21:00
- ✅ Clean visual appearance at page bottom
- ✅ No console errors or warnings related to calendar rendering
- ✅ Page ends cleanly after last time slot

**Screenshot:** `S6-S1-TC-2.3-clean-bottom-no-artifacts.png`

---

### TC-2.4: Schedule Creation in Evening Slots
**Test ID:** `tc-2-4-schedule-creation-20-00`

**Preconditions:**
- On Weekly Calendar view
- Permission to create schedules

**Steps:**
1. Click "Add Schedule" button
2. Fill in schedule details:
   - Task name: "Evening Study Session"
   - Start time: 20:00 (8 PM)
   - End time: 21:00 (9 PM)
   - Date: Tomorrow's date
3. Save schedule
4. Verify schedule appears in 20:00 time slot
5. Verify schedule is clickable and details can be viewed

**Expected Results:**
- ✅ Can successfully create schedule for 20:00-21:00 time slot
- ✅ Schedule appears correctly in calendar grid at 20:00
- ✅ Schedule displays in correct day column
- ✅ No errors when creating evening schedules
- ✅ Schedule persists and is visible on page refresh

**Screenshot:** `S6-S1-TC-2.4-evening-schedule-20-00.png`

---

## Test Case 3: AC3 - Dashboard Cards Cleanup

**Objective:** Verify only 5 cards displayed, 6 unused cards removed, and counts are correct

### TC-3.1: Card Count Verification
**Test ID:** `tc-3-1-card-count-five`

**Preconditions:**
- Logged in as coach
- On Coach Dashboard main view (not in any specific card view)

**Steps:**
1. Observe dashboard cards area
2. Count total number of cards displayed
3. List out card names visible

**Expected Results:**
- ✅ Exactly 5 cards visible
- ✅ Cards are: Daily Schedule, Task Tracker, Medical, Purchase, ISF Shop
- ✅ Cards displayed in grid/row format
- ✅ All cards are clickable

**Screenshot:** `S6-S1-TC-3.1-five-cards-displayed.png`

---

### TC-3.2: Removed Cards Verification
**Test ID:** `tc-3-2-removed-cards-not-present`

**Preconditions:**
- On Coach Dashboard main view

**Steps:**
1. Scan entire dashboard for following card names:
   - Syllabus Tracker
   - Slow Learners
   - Repairs
   - Suggestion
   - Activities
   - Events
2. Verify none of these 6 cards are visible

**Expected Results:**
- ✅ "Syllabus Tracker" card NOT present
- ✅ "Slow Learners" card NOT present
- ✅ "Repairs" card NOT present
- ✅ "Suggestion" card NOT present
- ✅ "Activities" card NOT present
- ✅ "Events" card NOT present
- ✅ Dashboard shows only 5 cards (as verified in TC-3.1)

**Screenshot:** `S6-S1-TC-3.2-removed-cards-verification.png`

---

### TC-3.3: Daily Schedule Card Count
**Test ID:** `tc-3-3-daily-schedule-count`

**Preconditions:**
- On Coach Dashboard
- At least 1 schedule created in system

**Steps:**
1. Locate "Daily Schedule" card
2. Observe count displayed on card
3. Click "Daily Schedule" card to open Weekly Calendar
4. Count number of schedules visible in calendar
5. Compare count on card vs actual schedules in calendar

**Expected Results:**
- ✅ "Daily Schedule" card shows count (e.g., "3" if 3 schedules exist)
- ✅ Count matches actual number of schedules visible in Weekly Calendar
- ✅ Count updates when new schedule is created
- ✅ Count updates when schedule is deleted

**Screenshot:** `S6-S1-TC-3.3-daily-schedule-count.png`

---

### TC-3.4: Task Tracker Card Count
**Test ID:** `tc-3-4-task-tracker-count`

**Preconditions:**
- On Coach Dashboard
- At least 1 task created in system

**Steps:**
1. Locate "Task Tracker" card
2. Observe count displayed on card
3. Click "Task Tracker" card to open Task Management
4. Count number of tasks visible in task list
5. Compare count on card vs actual tasks in list

**Expected Results:**
- ✅ "Task Tracker" card shows count (e.g., "5" if 5 tasks exist)
- ✅ Count matches actual number of tasks in Task Management view
- ✅ Count updates when new task is created
- ✅ Count updates when task is deleted

**Screenshot:** `S6-S1-TC-3.4-task-tracker-count.png`

---

### TC-3.5: Placeholder Card Counts
**Test ID:** `tc-3-5-placeholder-counts-zero`

**Preconditions:**
- On Coach Dashboard

**Steps:**
1. Locate "Medical" card
2. Observe count displayed
3. Locate "Purchase" card
4. Observe count displayed
5. Locate "ISF Shop" card
6. Observe count displayed

**Expected Results:**
- ✅ "Medical" card shows count = 0 (or actual count if API is available)
- ✅ "Purchase" card shows count = 0 (or actual count if API is available)
- ✅ "ISF Shop" card shows count = 0 (or actual count if API is available)
- ✅ Cards are still clickable even with 0 count
- ✅ No errors when clicking cards with 0 count

**Screenshot:** `S6-S1-TC-3.5-placeholder-cards-zero.png`

---

## Test Case 4: AC4 - Photo Capture Persistence Bug Fix

**Objective:** Verify webcam-captured photos persist after save and display correctly when viewing user profile

### TC-4.1: New User Creation with Photo Capture
**Test ID:** `tc-4-1-new-user-photo-capture`

**Preconditions:**
- Logged in as admin (admintest / Admin@2024)
- Navigate to User Management section
- Browser has webcam access permission granted

**Steps:**
1. Click "Add New User" or "Register Student" button
2. Fill in required fields:
   - Name: "Test Student QA"
   - Email: "teststudent.qa@test.com"
   - Role: Student
   - Balagruha: Select any Balagruha
3. Locate "Capture Photo" or similar button
4. Click to activate webcam
5. Verify webcam live preview shows
6. Click "Capture" to take photo
7. Verify photo preview displays captured image
8. Click "Save" or "Submit" to create user
9. Wait for success confirmation

**Expected Results:**
- ✅ Webcam activates and shows live video preview
- ✅ Photo capture works successfully
- ✅ Captured photo preview displays correctly
- ✅ User creation succeeds with confirmation message
- ✅ No errors in browser console during photo capture/upload

**Screenshot:** `S6-S1-TC-4.1-photo-captured-preview.png`

---

### TC-4.2: Photo Persistence Verification
**Test ID:** `tc-4-2-photo-persists-after-save`

**Preconditions:**
- User "Test Student QA" created in TC-4.1 with photo
- Currently on User Management view

**Steps:**
1. Navigate away from User Management (e.g., go to Dashboard)
2. Return to User Management
3. Find "Test Student QA" in user list
4. Click to view user profile details
5. Observe photo display area

**Expected Results:**
- ✅ **CRITICAL:** Photo is displayed in user profile
- ✅ Photo shows the same image captured in TC-4.1
- ✅ Photo is NOT a broken image icon
- ✅ Photo is NOT blank or empty
- ✅ Photo loads from valid URL (S3 or local storage)

**Screenshot:** `S6-S1-TC-4.2-photo-persists-displayed.png`

---

### TC-4.3: Photo Persistence After Page Refresh
**Test ID:** `tc-4-3-photo-persists-refresh`

**Preconditions:**
- Viewing "Test Student QA" profile with photo displayed

**Steps:**
1. Note current photo displayed
2. Press F5 or click browser refresh button
3. Wait for page to reload
4. Observe photo display area after reload

**Expected Results:**
- ✅ **CRITICAL:** Photo still displays after page refresh
- ✅ Photo URL remains valid
- ✅ Same photo loads (not a different/random image)
- ✅ No broken image icon after refresh

**Screenshot:** `S6-S1-TC-4.3-photo-after-refresh.png`

---

### TC-4.4: Photo URL Verification (Technical)
**Test ID:** `tc-4-4-photo-url-verification`

**Preconditions:**
- Viewing "Test Student QA" profile with photo displayed

**Steps:**
1. Open browser Developer Tools (F12)
2. Inspect the photo element (right-click photo → Inspect)
3. Look for `<img>` tag with `src` attribute
4. Verify `src` attribute contains valid URL
5. Check if URL is S3 URL (starts with https://...) or local path

**Expected Results:**
- ✅ Photo element has valid `src` attribute
- ✅ URL is either:
   - S3 URL: `https://isf-bucket.s3.amazonaws.com/...` OR
   - Local path: `/uploads/...` or full local path
- ✅ `facialDataUrl` field is populated in database (check backend logs or DB)
- ✅ Both `facialData.faceDescriptor` AND `facialDataUrl` fields exist in user record

**Screenshot:** `S6-S1-TC-4.4-photo-url-inspector.png`

---

### TC-4.5: Existing User Photo Update
**Test ID:** `tc-4-5-existing-user-photo-update`

**Preconditions:**
- Find existing user without photo OR use "Test Student QA" from previous tests
- On User Management view

**Steps:**
1. Click on user to edit profile
2. Locate "Capture Photo" button
3. Click to activate webcam
4. Capture a NEW photo (different from previous if updating)
5. Verify new photo preview displays
6. Click "Save" to update profile
7. Navigate away and return to user profile
8. Verify updated photo displays

**Expected Results:**
- ✅ Can successfully update existing user's photo
- ✅ New photo captures correctly
- ✅ New photo saves successfully
- ✅ **CRITICAL:** Updated photo persists after save
- ✅ Updated photo displays when viewing profile again
- ✅ Old photo is replaced by new photo (not both showing)

**Screenshot:** `S6-S1-TC-4.5-updated-photo-displayed.png`

---

### TC-4.6: Backend S3 Upload Verification
**Test ID:** `tc-4-6-backend-s3-upload`

**Preconditions:**
- Access to backend server logs
- Photo capture performed in previous test cases

**Steps:**
1. Check backend terminal/logs during photo upload
2. Look for S3 upload success messages
3. Verify file upload to S3 bucket succeeded
4. Check for any upload errors in logs

**Expected Results:**
- ✅ Backend logs show successful S3 upload messages
- ✅ No S3 upload errors in logs
- ✅ File uploads to correct S3 bucket (AWS_S3_BUCKET_NAME_USER_PHOTOS)
- ✅ For offline mode: File saves to local /uploads/ directory
- ✅ Face detection succeeds (face descriptor generated)

**Log Example:**
```
[INFO] S3 Upload: File uploaded successfully to user-photos/1234567890.jpg
[INFO] Face detection: Face descriptor generated (128 dimensions)
```

**Screenshot:** `S6-S1-TC-4.6-backend-s3-logs.png`

---

## Test Case 5: AC8 - Task Assignment Dropdown Bug Fix

**Objective:** Verify task assignment dropdown shows students and is NOT empty when creating/editing tasks

### TC-5.1: Task Assignment Dropdown Visibility
**Test ID:** `tc-5-1-dropdown-opens`

**Preconditions:**
- Logged in as coach
- Navigated to Task Tracker
- At least one student exists in assigned Balagruha

**Steps:**
1. Click "Add Task" or "Create Task" button
2. Task creation modal/form opens
3. Fill in task name: "QA Test Task"
4. Locate "Assign To" dropdown field
5. Click on "Assign To" dropdown

**Expected Results:**
- ✅ "Assign To" dropdown is present in form
- ✅ Dropdown opens when clicked
- ✅ Dropdown is NOT disabled or grayed out
- ✅ Dropdown shows list of users

**Screenshot:** `S6-S1-TC-5.1-assign-to-dropdown.png`

---

### TC-5.2: Students Visible in Dropdown
**Test ID:** `tc-5-2-students-visible`

**Preconditions:**
- Task creation form open
- "Assign To" dropdown opened

**Steps:**
1. Observe list of users in dropdown
2. Look for student users in the list
3. Verify students from coach's assigned Balagruha(s) are present
4. Count total number of users in dropdown

**Expected Results:**
- ✅ **CRITICAL:** Students ARE visible in dropdown
- ✅ Students from coach's assigned Balagruha(s) displayed
- ✅ Dropdown is NOT empty
- ✅ Dropdown shows users with different roles (students, coaches, staff)
- ✅ User names are readable and properly formatted

**Screenshot:** `S6-S1-TC-5.2-students-visible-in-dropdown.png`

---

### TC-5.3: Dropdown Not Empty
**Test ID:** `tc-5-3-dropdown-not-empty`

**Preconditions:**
- Task creation form open
- "Assign To" dropdown opened

**Steps:**
1. Verify dropdown contains at least one user
2. Count number of users visible in dropdown
3. Verify dropdown shows actual user data (not placeholder text)

**Expected Results:**
- ✅ **CRITICAL:** Dropdown is NOT empty
- ✅ At least 1 user visible in dropdown (should be more if Balagruha has multiple users)
- ✅ User list shows actual names (not "No users available")
- ✅ Dropdown allows selection of users

**Screenshot:** `S6-S1-TC-5.3-dropdown-populated.png`

---

### TC-5.4: Student Selection and Task Creation
**Test ID:** `tc-5-4-select-student-create-task`

**Preconditions:**
- Task creation form open
- "Assign To" dropdown opened with students visible

**Steps:**
1. Select a student from dropdown (e.g., "Test Student QA")
2. Verify student name appears in "Assign To" field
3. Fill in remaining task details:
   - Task type: "Academic"
   - Description: "Complete homework assignment"
   - Due date: Tomorrow's date
4. Click "Save" or "Create Task" button
5. Wait for success confirmation

**Expected Results:**
- ✅ Can successfully select student from dropdown
- ✅ Selected student name displays in "Assign To" field
- ✅ Task creates successfully with student assignment
- ✅ Success message displays after creation
- ✅ No errors in console during task creation

**Screenshot:** `S6-S1-TC-5.4-student-selected-task-created.png`

---

### TC-5.5: Task Assignment Verification
**Test ID:** `tc-5-5-task-assignment-persists`

**Preconditions:**
- Task "QA Test Task" created in TC-5.4 and assigned to student

**Steps:**
1. Navigate to task list in Task Tracker
2. Find "QA Test Task" in the list
3. Click to view task details
4. Observe "Assigned To" field

**Expected Results:**
- ✅ Task appears in task list
- ✅ Task shows assigned student name
- ✅ "Assigned To" field displays correct student name
- ✅ Student assignment persisted correctly

**Screenshot:** `S6-S1-TC-5.5-task-shows-assigned-student.png`

---

### TC-5.6: Edit Task Assignment
**Test ID:** `tc-5-6-edit-task-reassign`

**Preconditions:**
- Task "QA Test Task" exists with student assigned

**Steps:**
1. Click to edit "QA Test Task"
2. Task edit form opens
3. Click on "Assign To" dropdown
4. Verify dropdown shows all available users including students
5. Select a different student from dropdown
6. Click "Save" to update task
7. View task details again

**Expected Results:**
- ✅ Can edit existing task
- ✅ "Assign To" dropdown in edit mode shows all users including students
- ✅ Can reassign task to different student
- ✅ Task update succeeds
- ✅ Updated assignment persists and displays correctly

**Screenshot:** `S6-S1-TC-5.6-task-reassigned.png`

---

### TC-5.7: User List Scope Verification
**Test ID:** `tc-5-7-user-list-scope`

**Preconditions:**
- Logged in as coach with specific Balagruha assignments
- Task creation form open with "Assign To" dropdown

**Steps:**
1. Open "Assign To" dropdown
2. List out all users visible in dropdown
3. Verify users are from coach's assigned Balagruha(s) only
4. Verify dropdown includes:
   - Students from assigned Balagruha(s)
   - Coaches from assigned Balagruha(s)
   - Other staff (medical, admin, etc.) from assigned Balagruha(s)

**Expected Results:**
- ✅ All users in dropdown are from coach's assigned Balagruha(s)
- ✅ Dropdown shows users of all roles (students + staff)
- ✅ No users from non-assigned Balagruhas appear
- ✅ Backend properly filters users by Balagruha assignment

**Screenshot:** `S6-S1-TC-5.7-user-list-filtered-by-balagruha.png`

---

## Test Case 6: Full-Width Calendar Display (UI Enhancement)

**Objective:** Verify calendar uses full available screen width without excessive side margins

### TC-6.1: Full-Width Display on Large Screen
**Test ID:** `tc-6-1-full-width-large-screen`

**Preconditions:**
- Logged in as coach
- On Weekly Calendar view
- Browser window maximized or in full-screen mode

**Steps:**
1. Maximize browser window (1920x1080 or larger)
2. Observe calendar width
3. Check for white space on left and right sides of calendar
4. Compare calendar width to dashboard width above it

**Expected Results:**
- ✅ Calendar extends to full available width
- ✅ Minimal white space on left/right sides (only normal padding)
- ✅ Calendar width matches dashboard container width
- ✅ Calendar doesn't appear centered with large side margins

**Screenshot:** `S6-S1-TC-6.1-full-width-large-screen.png`

---

### TC-6.2: Responsive Width on Medium Screen
**Test ID:** `tc-6-2-responsive-width-medium`

**Preconditions:**
- On Weekly Calendar view

**Steps:**
1. Resize browser window to ~1280px width
2. Observe calendar adjusts to new width
3. Verify calendar still uses available width
4. Check that content doesn't overflow or get cut off

**Expected Results:**
- ✅ Calendar adjusts responsively to medium screen size
- ✅ Calendar still uses full available width (not fixed width)
- ✅ Grid cells adjust size proportionally
- ✅ All calendar content visible without horizontal scrolling

**Screenshot:** `S6-S1-TC-6.2-responsive-medium-1280px.png`

---

### TC-6.3: CSS Width Properties
**Test ID:** `tc-6-3-css-width-properties`

**Preconditions:**
- On Weekly Calendar view

**Steps:**
1. Open browser Developer Tools (F12)
2. Inspect calendar container element
3. Check CSS styles applied to calendar:
   - `.full-calendar` class
   - `.calendar-container` class
4. Verify `width: 100%` is set
5. Verify `flex: 1` is set

**Expected Results:**
- ✅ `.full-calendar` has `width: 100%` CSS property
- ✅ `.calendar-container` has `width: 100%` CSS property
- ✅ Container uses flexbox with `flex: 1` where appropriate
- ✅ No fixed `max-width` constraints limiting calendar width

**Screenshot:** `S6-S1-TC-6.3-css-width-inspector.png`

---

### TC-6.4: Comparison with Dashboard Cards
**Test ID:** `tc-6-4-width-matches-dashboard`

**Preconditions:**
- On Coach Dashboard with both cards and calendar visible
- Viewing Daily Schedule (Weekly Calendar)

**Steps:**
1. Observe width of dashboard cards at top
2. Scroll down to observe calendar width
3. Visually compare alignment of:
   - Dashboard cards left edge
   - Calendar left edge
   - Dashboard cards right edge
   - Calendar right edge

**Expected Results:**
- ✅ Calendar left edge aligns with dashboard cards left edge
- ✅ Calendar right edge aligns with dashboard cards right edge
- ✅ Calendar uses same container width as dashboard
- ✅ Consistent visual alignment throughout page

**Screenshot:** `S6-S1-TC-6.4-width-matches-dashboard.png`

---

## Overall QA Summary Template

**Total Test Cases:** 30+ test cases (TC-1.1 through TC-6.4)
**Test Categories:**
- AC1: Month/Year Selector (6 test cases)
- AC2: Schedule Time Extension (4 test cases)
- AC3: Dashboard Cards Cleanup (5 test cases)
- AC4: Photo Capture Persistence (6 test cases)
- AC5: Task Assignment Dropdown (7 test cases)
- UI Enhancement: Full-Width Calendar (4 test cases)

**Critical Test Cases:**
- TC-4.2: Photo persistence after save (CRITICAL)
- TC-4.3: Photo persistence after refresh (CRITICAL)
- TC-5.2: Students visible in dropdown (CRITICAL)
- TC-5.3: Dropdown not empty (CRITICAL)

**Execution Tracking:**
- [ ] All test cases executed
- [ ] Screenshots captured for all test cases
- [ ] Console errors documented
- [ ] Bugs reported with severity levels
- [ ] Regression testing completed

**Expected Outcomes:**
- ✅ All 5 acceptance criteria validated
- ✅ Zero critical bugs remaining
- ✅ UI enhancements working as designed
- ✅ User experience improvements verified

---

## Notes for QA Agent

### Browser Compatibility
Test on at least:
- Chrome (primary)
- Firefox (secondary)
- Edge (if time permits)

### Screenshot Naming Convention
Use format: `S6-S1-TC-X.Y-description.png`
- S6 = Sprint 6
- S1 = Story 1
- TC-X.Y = Test Case number
- description = Brief description

### Bug Reporting
If bugs found, create bug tickets with:
- Bug ID: `S6-S1-BUG-XXX`
- Severity: Critical/High/Medium/Low
- Test Case Reference: TC number where bug was found
- Screenshots: Attach evidence
- Steps to Reproduce: Clear steps
- Expected vs Actual: What should happen vs what happened

### Test Data Cleanup
After testing:
- Delete test user "Test Student QA" if created
- Delete test task "QA Test Task" if created
- Delete test schedules created during testing
- Reset any modified data to original state

---

**End of E2E Test Scenarios**
**Ready for QA Execution**
**Last Updated:** 2025-11-11 14:50:00
