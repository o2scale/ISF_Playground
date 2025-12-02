# Sprint 6 Story 2 - E2E Test Cases: Medical History Alignment

**Story:** Sprint6-Story-02 - Medical History Alignment (Check-in Replacement)
**Created:** 2025-11-13 20:40:33
**Last Updated:** 2025-11-13 20:40:33
**Test Type:** End-to-End Manual Testing
**Priority:** HIGH
**Changes Covered:** Medical history removal, Check-in integration in Users tab

---

## 📋 Test Overview

This document contains comprehensive E2E test cases for verifying the replacement of medical history functionality with medical check-ins in the Users tab.

**Key Changes:**
1. **Removal:** Medical history section completely removed from UserForm
2. **Replacement:** Medical check-ins now accessible from Users tab when editing students
3. **Integration:** CheckInModal component integrated into UserForm for creating check-ins
4. **Backend:** Medical history field removed from User model

**Total Test Cases:** 15 test cases across 3 functional areas

---

## 🎯 Test Execution Summary Template

| Test ID | Test Name | Status | Tester | Date | Notes |
|---------|-----------|--------|--------|------|-------|
| TC-S2-01 | Medical history section NOT visible (Add User) | ⏳ | | | |
| TC-S2-02 | Medical history section NOT visible (Edit User) | ⏳ | | | |
| TC-S2-03 | User form still accepts student data | ⏳ | | | |
| TC-S2-04 | Medical check-ins section visible (Edit Student) | ⏳ | | | |
| TC-S2-05 | Medical check-ins section NOT visible (Edit Non-Student) | ⏳ | | | |
| TC-S2-06 | Check-ins list loads automatically | ⏳ | | | |
| TC-S2-07 | Check-ins sorted by date (newest first) | ⏳ | | | |
| TC-S2-08 | Check-in details display correctly | ⏳ | | | |
| TC-S2-09 | "Create New Check-in" button functional | ⏳ | | | |
| TC-S2-10 | CheckInModal opens successfully | ⏳ | | | |
| TC-S2-11 | Create check-in from Users tab | ⏳ | | | |
| TC-S2-12 | Check-ins list refreshes after creation | ⏳ | | | |
| TC-S2-13 | Empty state message when no check-ins | ⏳ | | | |
| TC-S2-14 | Loading state displayed correctly | ⏳ | | | |
| TC-S2-15 | Multi-role access verification | ⏳ | | | |

---

## 🧪 Section 1: Medical History Removal - Test Cases

### TC-S2-01: Medical History Section NOT Visible (Add User)

**Priority:** P0 (Critical)
**Preconditions:**
- Coach or Admin user account
- Access to Users tab
- Multiple Balagruhas exist

**Test Steps:**
1. Login as coach or admin user
2. Navigate to "Users" tab
3. Click "Add User" button
4. Select "Student" role from dropdown
5. Scroll through entire form
6. Look for any section labeled "Medical History"
7. Look for fields related to medical conditions, prescriptions, etc.

**Expected Results:**
- ✅ No "Medical History" section visible anywhere in form
- ✅ No medical-related fields (condition name, diagnosis date, doctor name, etc.)
- ✅ No "+ Add Medical Record" button
- ✅ Form only shows: Name, Email, Password, Role, Status, Age, Gender, Balagruha, Parental Status, Guardian Contact, Facial Photo
- ✅ No medical history file upload fields

**Pass Criteria:** Medical history section completely absent from Add User form

---

### TC-S2-02: Medical History Section NOT Visible (Edit User)

**Priority:** P0 (Critical)
**Preconditions:**
- Existing student user in database
- Coach or Admin access to Users tab

**Test Steps:**
1. Login as coach or admin
2. Navigate to "Users" tab
3. Locate an existing student in the user list
4. Click the edit button (✏️) for that student
5. Scroll through entire edit form
6. Look for "Medical History" section
7. Look for old medical history data

**Expected Results:**
- ✅ No "Medical History" section visible in edit form
- ✅ Student's existing data loads correctly (name, email, age, etc.)
- ✅ No old medical history records displayed
- ✅ Form structure clean without medical history fields

**Pass Criteria:** Medical history section completely absent from Edit User form

---

### TC-S2-03: User Form Still Accepts Student Data

**Priority:** P0 (Critical)
**Preconditions:**
- Admin or coach user
- Access to Users tab
- At least one Balagruha exists

**Test Steps:**
1. Login as admin or coach
2. Navigate to "Users" tab
3. Click "Add User"
4. Fill in student data:
   - Name: "Test Student"
   - Email: "test.student@test.com"
   - Password: "Test@2024"
   - Role: "student"
   - Age: 15
   - Gender: "Male"
   - Balagruha: Select any
   - Parental Status: "Has Both Parents"
   - Guardian Contact: "9876543210"
   - Upload facial photo
5. Click "Add User" or "Save" button
6. Verify success message

**Expected Results:**
- ✅ Form validates correctly
- ✅ User created successfully
- ✅ Success message displayed: "User added successfully!"
- ✅ No errors related to medical history
- ✅ User appears in users list
- ✅ Can edit newly created user

**Pass Criteria:** User creation works without medical history fields

---

## 🧪 Section 2: Check-ins Integration in Users Tab - Test Cases

### TC-S2-04: Medical Check-ins Section Visible (Edit Student)

**Priority:** P0 (Critical)
**Preconditions:**
- Existing student user in database
- Admin or coach user account
- Student has at least one check-in (optional, for comprehensive test)

**Test Steps:**
1. Login as admin or coach
2. Navigate to "Users" tab
3. Locate a student user in the list
4. Click edit button (✏️) for that student
5. Scroll down to find "Medical Check-ins" section
6. Observe the section layout and buttons

**Expected Results:**
- ✅ "Medical Check-ins" section visible below student information
- ✅ Section header displays "Medical Check-ins"
- ✅ "+ Create New Check-in" button present and visible
- ✅ Section layout clean and organized
- ✅ Check-ins list area present (may be empty or populated)

**Pass Criteria:** Medical Check-ins section appears when editing a student

---

### TC-S2-05: Medical Check-ins Section NOT Visible (Edit Non-Student)

**Priority:** P1 (High)
**Preconditions:**
- Existing non-student user (coach, admin, etc.)
- Admin user account

**Test Steps:**
1. Login as admin
2. Navigate to "Users" tab
3. Locate a non-student user (coach, admin, staff, etc.)
4. Click edit button for that user
5. Scroll through entire form
6. Look for "Medical Check-ins" section

**Expected Results:**
- ✅ No "Medical Check-ins" section visible
- ✅ Form shows only relevant fields for that role
- ✅ No check-in related buttons or UI elements

**Pass Criteria:** Medical Check-ins section only appears for students

---

### TC-S2-06: Check-ins List Loads Automatically

**Priority:** P0 (Critical)
**Preconditions:**
- Existing student with at least 3 check-ins in database
- Admin or coach user account

**Test Steps:**
1. Login as admin or coach
2. Navigate to "Users" tab
3. Click edit on student who has check-ins
4. Observe the Medical Check-ins section
5. Wait for data to load

**Expected Results:**
- ✅ Check-ins list starts loading immediately
- ✅ Loading indicator displays: "Loading check-ins..."
- ✅ Check-ins appear after loading completes
- ✅ All check-ins for that student are displayed
- ✅ No manual refresh needed

**Pass Criteria:** Check-ins load automatically when editing student

---

### TC-S2-07: Check-ins Sorted by Date (Newest First)

**Priority:** P1 (High)
**Preconditions:**
- Student with multiple check-ins from different dates
- Admin or coach access

**Test Steps:**
1. Login as admin or coach
2. Navigate to Users tab
3. Edit a student with multiple check-ins
4. Observe the order of check-ins in the list
5. Note the dates of each check-in

**Expected Results:**
- ✅ Check-ins displayed with newest date at the top
- ✅ Older check-ins appear below newer ones
- ✅ Date format clear and readable (e.g., "Nov 13, 2025")
- ✅ Consistent date sorting throughout the list

**Pass Criteria:** Check-ins are sorted by date, newest first

---

### TC-S2-08: Check-in Details Display Correctly

**Priority:** P1 (High)
**Preconditions:**
- Student with at least one detailed check-in (includes temperature, symptoms, notes, doctor visits, follow-ups)

**Test Steps:**
1. Login as admin or coach
2. Edit student with detailed check-ins
3. Observe each check-in card in the list
4. Verify all fields are displayed

**Expected Results:**
- ✅ Check-in date displayed prominently
- ✅ Health status badge visible (Healthy/Sick/Recovered/Critical)
- ✅ Temperature shown if present: "Temperature: 98.6°C"
- ✅ Symptoms listed if present: "Symptoms: Fever, Cough"
- ✅ Notes displayed if present: "Notes: Student reported feeling better"
- ✅ Doctor visits count shown: "Doctor Visits: 2"
- ✅ Follow-ups count shown: "Follow-ups: 1"
- ✅ All data formatted clearly and readable

**Pass Criteria:** All check-in fields display correctly in the list

---

### TC-S2-09: "Create New Check-in" Button Functional

**Priority:** P0 (Critical)
**Preconditions:**
- Student user exists
- Admin or coach access

**Test Steps:**
1. Login as admin or coach
2. Navigate to Users tab
3. Edit any student
4. Locate "+ Create New Check-in" button in Medical Check-ins section
5. Click the button

**Expected Results:**
- ✅ Button is clickable and responsive
- ✅ No errors displayed
- ✅ CheckInModal opens after clicking

**Pass Criteria:** Button triggers modal opening successfully

---

### TC-S2-10: CheckInModal Opens Successfully

**Priority:** P0 (Critical)
**Preconditions:**
- Student user exists
- Admin or coach access

**Test Steps:**
1. Login as admin or coach
2. Edit a student
3. Click "+ Create New Check-in" button
4. Observe the modal that appears

**Expected Results:**
- ✅ CheckInModal opens as overlay on top of UserForm
- ✅ Modal header displays "Medical Check-in" or similar title
- ✅ Modal contains all check-in form fields
- ✅ Student's name pre-populated
- ✅ Student's Balagruha pre-selected
- ✅ Close button (X) visible in top-right
- ✅ Cancel and Submit buttons visible at bottom

**Pass Criteria:** CheckInModal opens with correct pre-populated data

---

### TC-S2-11: Create Check-in from Users Tab

**Priority:** P0 (Critical)
**Preconditions:**
- Student user exists
- Admin or coach access

**Test Steps:**
1. Login as admin or coach
2. Navigate to Users tab
3. Edit a student
4. Click "+ Create New Check-in"
5. Fill in check-in form:
   - Date: Today's date
   - Health Status: "Healthy"
   - Temperature: "98.6"
   - Symptoms: "None"
   - Notes: "Routine check-in from Users tab"
6. Click "Submit" or "Create Check-in"
7. Wait for submission

**Expected Results:**
- ✅ Form validates correctly
- ✅ Submission successful
- ✅ Success message displayed
- ✅ Modal closes automatically
- ✅ No errors in console

**Pass Criteria:** Check-in created successfully from Users tab

---

### TC-S2-12: Check-ins List Refreshes After Creation

**Priority:** P0 (Critical)
**Preconditions:**
- Student user exists
- Admin or coach access
- Completed TC-S2-11 (check-in creation)

**Test Steps:**
1. Continue from TC-S2-11 (after successful check-in creation)
2. Observe the Medical Check-ins section
3. Look for the newly created check-in
4. Verify it appears at the top of the list

**Expected Results:**
- ✅ Check-ins list refreshes automatically
- ✅ Newly created check-in appears at the top (newest first)
- ✅ Check-in displays with correct data (date, status, notes, etc.)
- ✅ List sorted correctly with new check-in first
- ✅ No page refresh needed

**Pass Criteria:** Check-ins list updates automatically after creation

---

### TC-S2-13: Empty State Message When No Check-ins

**Priority:** P1 (High)
**Preconditions:**
- Student user with NO check-ins in database
- Admin or coach access

**Test Steps:**
1. Login as admin or coach
2. Navigate to Users tab
3. Edit a student who has no check-ins
4. Scroll to Medical Check-ins section
5. Observe the message displayed

**Expected Results:**
- ✅ Empty state message displayed
- ✅ Message text: "No medical check-ins found for this student."
- ✅ Message centered and clearly visible
- ✅ "+ Create New Check-in" button still available
- ✅ No loading errors

**Pass Criteria:** Empty state message appears when student has no check-ins

---

### TC-S2-14: Loading State Displayed Correctly

**Priority:** P1 (High)
**Preconditions:**
- Student user exists
- Admin or coach access
- Network throttling enabled (optional, to slow down loading)

**Test Steps:**
1. Login as admin or coach
2. Navigate to Users tab
3. Click edit on a student
4. Immediately observe the Medical Check-ins section
5. Watch the loading transition

**Expected Results:**
- ✅ Initial loading state displays: "Loading check-ins..."
- ✅ Loading message styled consistently
- ✅ No error messages during loading
- ✅ Loading state transitions to either:
  - Check-ins list (if data exists)
  - Empty state message (if no data)
- ✅ Loading completes within reasonable time (< 3 seconds normally)

**Pass Criteria:** Loading state displays correctly before data loads

---

### TC-S2-15: Multi-role Access Verification

**Priority:** P1 (High)
**Preconditions:**
- Test accounts for: admin, coach, medical-incharge
- Student user exists

**Test Steps:**
1. Test as Admin:
   - Login as admin
   - Edit student
   - Verify Medical Check-ins section visible
   - Verify "+ Create New Check-in" button works
2. Test as Coach:
   - Logout and login as coach
   - Edit student from coach's Balagruha
   - Verify Medical Check-ins section visible
   - Verify check-in creation works
3. Test as Medical-Incharge:
   - Logout and login as medical-incharge
   - Edit student
   - Verify Medical Check-ins section visible

**Expected Results:**
- ✅ Admin: Full access to Medical Check-ins section
- ✅ Coach: Full access for students in assigned Balagruha
- ✅ Medical-Incharge: Full access to Medical Check-ins section
- ✅ All roles can create check-ins successfully
- ✅ No permission errors

**Pass Criteria:** Medical Check-ins accessible to authorized roles

---

## 🧪 Section 3: Regression Testing - Test Cases

### TC-S2-R01: Existing Check-ins Still Accessible via Dashboard

**Priority:** P1 (High)
**Test Steps:**
1. Login as student
2. Navigate to Dashboard
3. Verify medical check-ins section visible
4. Verify existing check-ins display correctly

**Expected Results:**
- ✅ Dashboard check-ins section unaffected by UserForm changes
- ✅ All check-ins still visible on Dashboard
- ✅ Check-in creation from Dashboard still works

---

### TC-S2-R02: User Creation/Editing Backward Compatible

**Priority:** P0 (Critical)
**Test Steps:**
1. Login as admin
2. Edit users created before Story 2 implementation
3. Verify no errors loading old users
4. Update user data and save
5. Verify save successful

**Expected Results:**
- ✅ Old users load correctly
- ✅ No errors related to missing medical history
- ✅ Can edit and save old users successfully

---

## 📊 Test Data Requirements

### User Accounts Needed

| Role | Email | Password | Balagruha | Purpose |
|------|-------|----------|-----------|---------|
| Admin | admin@test.com | Admin@2024 | All | Full access testing |
| Coach | coach1@test.com | Coach@2024 | Balagruha A | Coach access testing |
| Medical-Incharge | medical@test.com | Medical@2024 | N/A | Medical role testing |
| Student (with check-ins) | student1@test.com | Student@2024 | Balagruha A | Check-ins list testing |
| Student (no check-ins) | student2@test.com | Student@2024 | Balagruha A | Empty state testing |

### Check-ins Data Needed

Create test check-ins for student1@test.com:
- Check-in 1: Date: 2025-11-13, Status: Healthy, Temp: 98.6
- Check-in 2: Date: 2025-11-10, Status: Sick, Symptoms: Fever, Cough
- Check-in 3: Date: 2025-11-05, Status: Recovered, Doctor visits: 2

---

## 🐛 Bug Reporting Template

If any test case fails, report using this template:

```
**Bug ID:** S2-BUG-[number]
**Test Case:** TC-S2-[number]
**Severity:** Critical/High/Medium/Low
**Environment:** Windows/Mac/Linux, Browser: Chrome/Firefox/Edge

**Steps to Reproduce:**
1.
2.
3.

**Expected Result:**
[What should happen]

**Actual Result:**
[What actually happened]

**Screenshot:** [Attach screenshot]
**Console Errors:** [Copy any console errors]
**Additional Notes:**
```

---

## ✅ Sign-Off Criteria

**Story 2 can be marked as QA Complete when:**

1. ✅ All P0 (Critical) test cases pass (100%)
2. ✅ At least 80% of P1 (High) test cases pass
3. ✅ No critical bugs blocking functionality
4. ✅ Regression tests pass
5. ✅ All roles tested successfully
6. ✅ Screenshots captured for evidence
7. ✅ Test execution summary completed

---

## 📝 Test Execution Notes

### Session 1: [Date]
**Tester:** [Name]
**Test Cases Executed:** TC-S2-01 through TC-S2-05
**Results:**
- Passed:
- Failed:
- Blocked:
**Issues Found:**
**Next Steps:**

### Session 2: [Date]
**Tester:** [Name]
**Test Cases Executed:**
**Results:**
**Issues Found:**
**Next Steps:**

---

## 📞 Contact & Support

**Developer:** Dev Agent (Claude)
**Story Document:** `docs/stories/sprint6/sprint6-story-02-medical-history-alignment.md`
**Last Updated:** 2025-11-13 20:40:33

---

**End of E2E Test Document**
